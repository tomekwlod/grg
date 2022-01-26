package notifier

import (
	"fmt"
	"net/smtp"
)

func NewEmailNotifier(from, password, smtpHost, smtpPort string) (EmailNotifier, error) {

	auth := smtp.PlainAuth("", from, password, smtpHost)

	return EmailNotifier{
		from:     from,
		password: password,
		smtpHost: smtpHost,
		smtpPort: smtpPort,
		auth:     auth,
	}, nil
}

type EmailNotifier struct {
	from     string
	password string
	smtpHost string
	smtpPort string
	auth     smtp.Auth
}

func (e EmailNotifier) Send(to []string, message string) error {
	return smtp.SendMail(e.smtpHost+":"+e.smtpPort, e.auth, e.from, to, []byte(message))
}

func (e EmailNotifier) Template(template string, to []string) (message string, err error) {
	switch template {

	case "register":
		message = fmt.Sprintf("From: %s\r\n"+
			"To: %s\r\n"+
			"Subject: %s\r\n\r\n"+
			"%s\r\n", e.from, to, "Welcome!", "Thanks for joining our portal!")

	case "login":
		message = fmt.Sprintf("From: %s\r\n"+
			"To: %s\r\n"+
			"Subject: %s\r\n\r\n"+
			"%s\r\n", e.from, to, "Welcome back!", "You have just logged in to our portal!")
	default:
		err = fmt.Errorf("Template `%s` not recognised", template)
	}

	if err != nil {
		return
	}

	return
}

func NewTeamsNotifier() (TeamsNotifier, error) {
	return TeamsNotifier{}, nil
}

type TeamsNotifier struct{}

func (notifier TeamsNotifier) Send(to []string, message string) error {
	_, err := fmt.Printf("sending teams message to %v with content %s\n", to, message)

	return err
}
