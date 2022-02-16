package rmq

import (
	"fmt"

	"github.com/streadway/amqp"
)

type AuthMessage struct {
	Origin   string
	Project  string
	IP       string
	Email    string
	Fullname string
}

type Conn struct {
	*amqp.Channel
}

func (c *Conn) DeclareQueues() error {

	for _, q := range []string{"auth.login", "auth.register", "auth.forgot"} {
		_, err := c.QueueDeclare(
			q,     // queue name
			true,  // durable
			false, // auto delete
			false, // exclusive
			false, // no wait
			nil,   // arguments
		)

		if err != nil {
			return err
		}
	}

	return nil
}

func (c *Conn) PublishMessage(queueName string, msg []byte) error {
	message := amqp.Publishing{
		ContentType: "text/plain",
		Body:        msg,
	}

	// as well as the message above we would need such things as:
	// - from where the message is being sent (domain? hostname?)
	// - ip of the sender?

	// Attempt to publish a message to the queue.
	err := c.Publish(
		"",        // exchange
		queueName, // queue name
		false,     // mandatory
		false,     // immediate
		message,   // message to publish
	)

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
