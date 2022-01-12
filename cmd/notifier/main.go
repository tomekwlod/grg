package main

import (
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
	"github.com/streadway/amqp"
	notifier "github.com/tomekwlod/grg/libs/notifier"
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
	Send(to, message string) error
}

type User struct{}

func (u *User) notify(sender Sender, to, message string) error {
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
	// this is just temporary
	_type := "email"
	_msg := "a message"
	_to := "some.email@gmail.com"

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

	// Create a new RabbitMQ connection.
	connectRabbitMQ, err := amqp.Dial(amqpURL)
	if err != nil {
		fmt.Println("Couldn't connect to RabbitMQ")
		os.Exit(2)
	}
	defer connectRabbitMQ.Close()
	// Opening a channel to our RabbitMQ instance over
	// the connection we have already established.
	channelRabbitMQ, err := connectRabbitMQ.Channel()
	if err != nil {
		fmt.Println("Couldn't connect to RabbitMQ channel")
		os.Exit(2)
	}
	defer channelRabbitMQ.Close()
	// Subscribing to Login queue for getting messages
	messages, err := channelRabbitMQ.Consume(
		"Login", // queue name
		"",      // consumer
		true,    // auto-ack
		false,   // exclusive
		false,   // no local
		false,   // no wait
		nil,     // arguments
	)
	if err != nil {
		log.Println(err)
	}
	// Build a welcome message.
	log.Println("Successfully connected to RabbitMQ")
	log.Println("Waiting for messages")
	// Make a channel to receive messages into infinite loop.
	forever := make(chan bool)
	go func() {
		for message := range messages {
			// For example, show received message in a console.
			log.Printf(" > Received message: %s\n", message.Body)
		}
	}()
	<-forever
	return

	emailNotifier, err := notifier.NewEmailNotifier(emailFrom, emailPassword, emailHost, emailPort)
	if err != nil {
		fmt.Printf("Email notifier cannot be initialized, %v\n", err)
		os.Exit(2)
	}

	teamsNotifier, err := notifier.NewTeamsNotifier()
	if err != nil {
		fmt.Printf("Teams notifier cannot be initialized, %v", err)
		os.Exit(2)
	}

	user := &User{}

	switch _type {

	case "teams":

		err = user.notify(teamsNotifier, _to, _msg)
	default:
		err = user.notify(emailNotifier, _to, _msg)
	}

	if err != nil {
		fmt.Printf("An error occured when sending a message: %v\n", err)
	}
}
