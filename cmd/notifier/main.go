package main

import (
	"fmt"
	"os"

	"github.com/joho/godotenv"
	notifier "github.com/tomekwlod/grg/libs/notifier"
)

var (
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
	godotenv.Load()

	emailUsername = os.Getenv("EMAIL_USERNAME")
	emailPassword = os.Getenv("EMAIL_PASSWORD")
	emailFrom = os.Getenv("EMAIL_FROM")
}

func main() {
	// this is just temporary
	_type := "email"
	_msg := "a message"
	_to := "some.email@gmail.com"

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
