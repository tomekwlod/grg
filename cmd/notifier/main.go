package main

import (
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
	"github.com/tomekwlod/grg/internal/rmq"
	notifier "github.com/tomekwlod/grg/libs/notifier"
	"github.com/tomekwlod/utils/env"
)

var (
	amqpURL       = ""
	emailHost     = "smtp.gmail.com"
	emailPort     = "587"
	emailUsername = ""
	emailPassword = ""
	emailFrom     = ""
)

type Sender interface {
	Send(to []string, template string) error
}

type User struct {
	Email    string
	Teams    string
	Fullname string
}

func (u *User) notify(sender Sender, message string) error {

	var to []string

	switch sender.(type) {
	case notifier.EmailNotifier:
		to = append(to, u.Email)
	case notifier.TeamsNotifier:
		to = append(to, u.Teams)
	default:
		return errors.New("Couldn't recognise Sender interface")
	}

	if len(to) == 0 {
		return errors.New("Expected at least one receiver of a message")
	}

	return sender.Send(to, message)
}

func init() {

	// on local machines there should be an .env file present with a valid url
	// on prod you need to inject either a file or the values itself
	godotenv.Load("../../.env")

	amqpURL = os.Getenv("AMQP_SERVER_URL")

	emailUsername = os.Getenv("EMAIL_USERNAME")
	emailPassword = os.Getenv("EMAIL_PASSWORD")
	emailFrom = os.Getenv("EMAIL_FROM")
}

func main() {

	if amqpURL == "" {
		fmt.Println("RabbitMQ URL is invalid. Double check the env variable AMQP_SERVER_URL")
		os.Exit(2)
	}

	if emailUsername == "" {
		fmt.Println("Email username cannot be blank")
		os.Exit(2)
	}
	if emailPassword == "" {
		fmt.Println("Email password cannot be blank")
		os.Exit(2)
	}
	if emailFrom == "" {
		fmt.Println("Email `from` cannot be blank")
		os.Exit(2)
	}

	amqpChannel, close, err := rmq.OpenChannel(env.Env("AMQP_SERVER_URL", "amqp://user:pass@127.0.0.1:5672"))

	if err != nil {
		if close != nil {
			// when connections is established but the channel cannot be opened
			close()
		}
		log.Fatal(err)
	}
	defer close()

	err = amqpChannel.DeclareQueues()

	if err != nil {
		log.Fatalf("error while declaring rabbitmq queues to db %v", err)
	}

	// Subscribing to Login queue for getting messages
	messages, err := amqpChannel.Consume(
		"auth", // queue name
		"",     // consumer
		true,   // auto-ack
		false,  // exclusive
		false,  // no local
		false,  // no wait
		nil,    // arguments
	)

	if err != nil {
		log.Println(err)
	}

	// Build a welcome message.
	log.Println("Successfully connected to RabbitMQ")
	log.Println("Waiting for messages")

	emailNotifier, err := notifier.NewEmailNotifier(emailFrom, emailPassword, emailHost, emailPort)
	if err != nil {
		fmt.Printf("Email notifier cannot be initialized, %v\n", err)
		os.Exit(2)
	}

	// teamsNotifier, err := notifier.NewTeamsNotifier()
	// if err != nil {
	// 	fmt.Printf("Teams notifier cannot be initialized, %v", err)
	// 	os.Exit(2)
	// }

	// Make a channel to receive messages into infinite loop.
	forever := make(chan bool)
	go func() {
		for message := range messages {
			msg := &rmq.AuthMessage{}

			err := json.Unmarshal(message.Body, msg)

			if err != nil {
				log.Printf("Error decoding JSON: %s", err)
			}

			// For example, show received message in a console.
			log.Printf(" > Received message: %+v\n", msg)

			user := &User{
				Email: msg.Email,
				// Teams:    msg.TeamsAccount,
				Fullname: msg.Fullname,
			}

			if msg.Email != "" {
				// message, err := emailNotifier.Template(msg.Template, []string{user.Email})
				message := "replace me with a proper text...."
				err = user.notify(emailNotifier, message)
				// err = user.notify(emailNotifier, message)

				if err != nil {
					fmt.Printf("An error occured when sending Email message: %v\n", err)
				}
			}

			// if msg.TeamsAccount != "" {
			// 	message := "replace me with a proper text...."
			// 	err = user.notify(teamsNotifier, message) // TEMPLATE JUST FOR NOW!!!!!!!!!!!!!!

			// 	if err != nil {
			// 		fmt.Printf("An error occured when sending Teams message: %v\n", err)
			// 	}
			// }
		}
	}()
	<-forever

}
