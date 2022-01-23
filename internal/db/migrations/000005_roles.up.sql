BEGIN;

CREATE TABLE roles
(
    id SERIAL PRIMARY KEY,
    "name" VARCHAR(255) NULL,
    "description" TEXT NULL
);

CREATE TABLE users_roles (
  user_id int REFERENCES users (id) ON UPDATE CASCADE ON DELETE CASCADE,
  role_id int REFERENCES roles (id) ON UPDATE CASCADE,
  CONSTRAINT users_roles_pkey PRIMARY KEY (user_id, role_id)
);

INSERT INTO roles (id, "name") VALUES (1, 'admin');
INSERT INTO roles (id, "name") VALUES (2, 'user');

COMMIT;