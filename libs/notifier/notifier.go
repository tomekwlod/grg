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

func (e EmailNotifier) Send(to, message string) error {
	_message := fmt.Sprintf("From: %s\r\n"+
		"To: %s\r\n"+
		"Subject: %s\r\n\r\n"+
		"%s\r\n", e.from, []string{to}, "Welcome", message)

	return smtp.SendMail(e.smtpHost+":"+e.smtpPort, e.auth, e.from, []string{to}, []byte(_message))
}

func NewTeamsNotifier() (TeamsNotifier, error) {
	return TeamsNotifier{}, nil
}

type TeamsNotifier struct{}

func (notifier TeamsNotifier) Send(to, message string) error {
	_, err := fmt.Printf("sending teams message to %s with content %s\n", to, message)

	return err
}
