package user

import (
	"context"

	// _ "github.com/jackc/pgx/stdlib"
	"github.com/tomekwlod/grg/core"
	"github.com/tomekwlod/grg/internal/db"
	rolestore "github.com/tomekwlod/grg/store/role"
)

func New(db db.Dber) core.UserStore {
	return &userStore{db}
}

type userStore struct {
	db db.Dber
}

func (u *userStore) Create(ctx context.Context, user *core.User) error {
	return u.db.QueryRowContext(ctx, "INSERT INTO users (password, email, enabled) VALUES ($1,$2,false) RETURNING id", user.Password, user.Email).Scan(&user.ID)
}

func (u *userStore) FindByEmail(ctx context.Context, email string) (*core.User, error) {
	user := new(core.User)

	err := u.db.QueryRowxContext(ctx, "SELECT id, email, password FROM users WHERE email=$1 LIMIT 1", email).StructScan(user)

	if err != nil {
		return nil, err
	}

	err = rolestore.New(u.db).GetRolesForUser(ctx, user)

	if err != nil {
		return nil, err
	}

	return user, nil
}

func (u *userStore) List(ctx context.Context) ([]*core.User, error) {

	users := []*core.User{}

	rows, err := u.db.QueryxContext(ctx, "SELECT id, email, password FROM users")

	if err != nil {
		return nil, err
	}

	for rows.Next() {
		var u core.User

		rows.StructScan(&u)

		users = append(users, &u)
	}

	return users, nil
}
