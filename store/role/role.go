package role

import (
	"context"
	"errors"

	// _ "github.com/jackc/pgx/stdlib"
	"github.com/tomekwlod/grg/core"
	"github.com/tomekwlod/grg/internal/db"
)

func New(db db.Dber) core.RoleStore {
	return &roleStore{db}
}

type roleStore struct {
	db db.Dber
}

func (u *roleStore) GetRolesForUser(ctx context.Context, user *core.User) error {

	if user.ID == 0 {
		return errors.New("Cannot get roles for a user with no ID")
	}

	rows, err := u.db.QueryxContext(ctx, "SELECT name FROM roles r LEFT JOIN users_roles ur ON  ur.role_id = r.id WHERE ur.user_id=$1", user.ID)

	if err != nil {
		return err
	}

	for rows.Next() {
		var role core.Role

		rows.StructScan(&role)

		user.Roles = append(user.Roles, role)
	}

	return nil
}
