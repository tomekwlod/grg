package office

import (
	"context"
	"fmt"
	"log"
	"testing"

	"github.com/golang-migrate/migrate/v4"
	_ "github.com/golang-migrate/migrate/v4/database/postgres"
	_ "github.com/golang-migrate/migrate/v4/source/file"
	_ "github.com/jackc/pgx/stdlib"
	"github.com/jmoiron/sqlx"
	"github.com/joho/godotenv"
	"github.com/tomekwlod/grg/core"
	"github.com/tomekwlod/grg/internal/db"
	us "github.com/tomekwlod/grg/store/user"
	"github.com/tomekwlod/utils/env"
)

var noContext = context.TODO()

func TestOffice(t *testing.T) {
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

	newOffice := core.Office{
		Name:            "Office 1",
		Description:     "Office 1 located in London",
		Address:         "1 Oxford Sreet",
		Telephone:       "0 788 993 03 98 67",
		MaxPeoplePerDay: 10,
	}

	t.Run("CREATE", func(t *testing.T) {
		user := core.User{
			Email:    "admin@email.com",
			Password: "password",
		}

		err := dbConn.Transact(func(tx *sqlx.Tx) error {
			officeStore := New(tx).(*officeStore)
			usersStore := us.New(tx)

			if err := usersStore.Create(noContext, &user); err != nil {
				return err
			}

			newOffice.AdminID = user.ID

			if err := officeStore.Create(noContext, &newOffice); err != nil {
				return err
			}

			if newOffice.ID <= 0 {
				return fmt.Errorf("Want newly created officeID to be greater than 0, got `%d`", newOffice.ID)
			}

			return nil
		})

		if err != nil {
			t.Error(err)
		}
	})
	t.Run("FIND ONE", func(t *testing.T) {
		officeStore := New(dbConn).(*officeStore)

		office, err := officeStore.FindOne(noContext, newOffice.Name)

		if err != nil {
			t.Errorf("Expected to find one office by its name: `%s`, but got en error instead: %+v", newOffice.Name, err)
		}

		if newOffice.Name != office.Name {
			t.Errorf("Expected an office name to be: `%s`, but got `%s`", newOffice.Name, office.Name)
		}

	})
	t.Run("FIND ALL", func(t *testing.T) {
		officeStore := New(dbConn).(*officeStore)

		offices, err := officeStore.Find(noContext, int64(1))

		if err != nil {
			t.Errorf("Expected to find one office, but got en error instead: %+v", err)
		}
		if len(offices) != 1 {
			t.Errorf("Expected to fetch `%d` office, but got `%d`", 1, len(offices))
		}

		if offices[0].Name != newOffice.Name {
			t.Errorf("Expected to find an office with the name `%s`, got: `%s` ", newOffice.Name, offices[0].Name)
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
