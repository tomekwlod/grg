BEGIN;

CREATE TABLE users
(
    id SERIAL PRIMARY KEY,
    "name" VARCHAR(255) NOT NULL,
    email VARCHAR NOT NULL,
    "password" TEXT NULL,
    "description" TEXT NULL,
    "enabled" boolean NOT NULL DEFAULT false,
    created_at timestamp with time zone NOT NULL default now(),
    updated_at timestamp with time zone NOT NULL default now(),
    last_login timestamp with time zone
);

COMMIT;