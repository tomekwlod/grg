package resource

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
	ofs "github.com/tomekwlod/grg/store/office"
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

	newResource := core.Resource{
		Name:        "Resource 1",
		Description: "Resource 1 description",
		OfficeID:    1,
	}

	t.Run("CREATE", func(t *testing.T) {
		user := core.User{
			Email:    "admin@email.com",
			Password: "password",
		}

		office := core.Office{
			Name:            "Office 1",
			Description:     "Office 1 description",
			MaxPeoplePerDay: 10,
		}

		err := dbConn.Transact(func(tx *sqlx.Tx) error {
			usersStore := us.New(tx)

			if err := usersStore.Create(noContext, &user); err != nil {
				return err
			}

			office.AdminID = user.ID

			officeStore := ofs.New(tx)

			if err := officeStore.Create(noContext, &office); err != nil {
				return err
			}

			resourceStore := New(tx).(*resourceStore)

			if err := resourceStore.Create(noContext, &newResource); err != nil {
				return err
			}

			if newResource.ID <= 0 {
				return fmt.Errorf("Want newly created resourceID to be greater than 0, got `%d`", newResource.ID)
			}

			return nil
		})

		if err != nil {
			t.Error(err)
		}
	})

	t.Run("FIND ALL", func(t *testing.T) {
		resourceStore := New(dbConn).(*resourceStore)

		resources, err := resourceStore.Find(noContext, int64(1))

		if err != nil {
			t.Errorf("Expected to find one resource, but got en error instead: %+v", err)
		}
		if len(resources) != 1 {
			t.Errorf("Expected to fetch `%d` resource, but got `%d`", 1, len(resources))
		}

		if resources[0].Name != newResource.Name {
			t.Errorf("Expected to find a resource with the name `%s`, got: `%s` ", newResource.Name, resources[0].Name)
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
