package rmq

import (
	"fmt"

	"github.com/streadway/amqp"
)

type AuthEmailMessage struct {
	To      []string
	BCC     []string
	Subject string
	Body    string
}

type Conn struct {
	*amqp.Channel
}

func (c *Conn) DeclareQueues() error {
	_, err := c.QueueDeclare(
		"auth", // queue name
		true,   // durable
		false,  // auto delete
		false,  // exclusive
		false,  // no wait
		nil,    // arguments
	)

	// if err != nil {
	// 	return err
	// }

	// _, err = c.QueueDeclare(
	// 	"auth.register", // queue name
	// 	true,            // durable
	// 	false,           // auto delete
	// 	false,           // exclusive
	// 	false,           // no wait
	// 	nil,             // arguments
	// )

	return err
}

func OpenChannel(amqpServerURL string) (*Conn, func(), error) {

	// Create a new RabbitMQ connection.
	connectRabbitMQ, err := amqp.Dial(amqpServerURL)
	if err != nil {
		return nil, nil, fmt.Errorf("error while connecting to rabbitmq: %v", err)
	}
	// defer connectRabbitMQ.Close()
	channelRabbitMQ, err := connectRabbitMQ.Channel()
	if err != nil {
		return nil, func() {
			connectRabbitMQ.Close()
		}, fmt.Errorf("error while creating rabbitmq channel: %v", err)
	}
	// defer channelRabbitMQ.Close()

	return &Conn{channelRabbitMQ}, func() {
		connectRabbitMQ.Close()
		channelRabbitMQ.Close()
	}, nil
}
