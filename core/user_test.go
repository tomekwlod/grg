package core

import (
	"context"
	"testing"
)

var noContext = context.Background()

func TestUserValidate(t *testing.T) {

	tests := []struct {
		user     *User
		password string
		expected bool
	}{
		{
			user:     &User{Password: "$2a$12$R.9O9MXnea6pYV1PaUtboezxjsu3yZVUOAKRk6PD5AULSN6xas0/q"},
			password: "password",
			expected: true,
		},
		{
			user:     &User{Password: "$2a$12$H2SEsg6EoruVpejq0stQIuavktEDsFV23rj4bLGOH34rRkvUHDIv."},
			password: "",
			expected: true,
		},
		{
			user:     &User{Password: "$2a$12$NQn2borAgS0Qr6H.pUEc8uPKmGZiNZV1H3dQCYdCs6Gz5Hy2zA/CG"},
			password: "iu89£sls99",
			expected: true,
		},
		{
			//correctandverylongandsecuredpassword
			user:     &User{Password: "$2a$12$HG1EUA/9zUu98KufiqmU5uU31I3OlR2wXMGgxk8zN6Z0yp4DurCOi"},
			password: "wrongandverylongandsecuredpassword",
			expected: false,
		},
	}
	for _, test := range tests {
		got := test.user.ValidatePassword(test.password)
		want := test.expected

		if got != want {
			t.Errorf("Comparing passwords `%s` =?= `%s` didn't pass the validation; expected `%t` got `%t`", test.user.Password, test.password, want, got)
		}
	}
}
