package user

import (
	"context"
	"fmt"
	"log"
	"testing"

	"github.com/golang-migrate/migrate/v4"
	_ "github.com/golang-migrate/migrate/v4/database/postgres"
	_ "github.com/golang-migrate/migrate/v4/source/file"
	_ "github.com/jackc/pgx/stdlib"
	"github.com/joho/godotenv"
	"github.com/tomekwlod/grg/core"
	"github.com/tomekwlod/grg/db"
	"github.com/tomekwlod/utils/env"
)

var noContext = context.TODO()

func TestUser(t *testing.T) {

	err := godotenv.Load("../../.env.test")

	if err != nil {
		log.Fatalf("No .env file detected")
	}

	cleanDB, err := prepare()

	if err != nil {
		t.Error(err)
	}

	defer cleanDB()

	dbURL := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=%s",
		env.Env("TEST_POSTGRES_HOST", "localhost"),
		env.Env("TEST_POSTGRES_PORT", "5432"),
		env.Env("TEST_POSTGRES_USER", "user"),
		env.Env("TEST_POSTGRES_PASSWORD", "password"),
		env.Env("TEST_POSTGRES_DB", "db"),
		env.Env("TEST_POSTGRES_SSLMODE", "disable"),
	)

	dbConn, err := db.PostgresConnection(dbURL)

	if err != nil {
		t.Error(err)
	}

	defer dbConn.Close()

	store := New(dbConn).(*userStore)

	t.Run("CREATE", func(t *testing.T) {
		users := []core.User{
			{
				Email:    "test1@email.com",
				Password: "password",
			},
			{
				Email:    "test2@email.com",
				Password: "password",
			},
		}

		for _, u := range users {
			err := store.Create(noContext, &u)

			if err != nil {
				t.Error(err)
			}
		}
	})
	t.Run("FIND ONE BY EMAIL", func(t *testing.T) {

		wantPassword := "password"

		user, err := store.FindByEmail(noContext, "test2@email.com")

		if err != nil {
			t.Error(err)
		}

		if user.Password != wantPassword {
			t.Errorf("Want user's password to be `%s`, got `%s`", wantPassword, user.Password)
		}
	})
	t.Run("FIND WRONG ONE BY EMAIL", func(t *testing.T) {

		user, err := store.FindByEmail(noContext, "not-existing@email.com")

		if err == nil {
			t.Errorf("Expected an error: `sql: no rows in result set`, got user: %v", user)
		}

		// if user.Password != wantPassword {
		// 	t.Errorf("Want user's password to be `%s`, got `%s`", wantPassword, user.Password)
		// }
	})
	t.Run("FIND", func(t *testing.T) {

		wantCount := 2

		users, err := store.List(noContext)

		if err != nil {
			t.Error(err)
		}

		if len(users) != wantCount {
			t.Errorf("Want users amount to be `%d`, got `%d`", wantCount, len(users))
		}
	})

}

func prepare() (func(), error) {
	m, err := migrate.New(
		"file://../../db/migrations",
		fmt.Sprintf(
			"postgres://%s:%s@%s:%s/%s?sslmode=%s",
			env.Env("TEST_POSTGRES_USER", "user"),
			env.Env("TEST_POSTGRES_PASSWORD", "password"),
			env.Env("TEST_POSTGRES_HOST", "localhost"),
			env.Env("TEST_POSTGRES_PORT", "5432"),
			env.Env("TEST_POSTGRES_DB", "db"),
			env.Env("TEST_POSTGRES_SSLMODE", "disable"),
		),
	)

	if err != nil {
		return nil, err
	}

	err = m.Down()

	if err != nil {
		if err.Error() == "no change" || err.Error() == "file does not exist" {
			log.Println("Database up to date")
		} else {
			return nil, err
		}
	}

	log.Println("MDOWN success")

	err = m.Up()

	if err != nil {
		if err.Error() == "no change" || err.Error() == "file does not exist" {
			log.Println("Database up to date")
		} else {
			return nil, err
		}
	}

	log.Println("MUP success")

	return func() { m.Down() }, nil
}
