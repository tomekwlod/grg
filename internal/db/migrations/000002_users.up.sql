BEGIN;

CREATE TABLE users
(
    id SERIAL PRIMARY KEY,
    "name" VARCHAR(255) NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    "password" TEXT NOT NULL,
    "description" TEXT NULL,
    "enabled" boolean NOT NULL DEFAULT false,
    created_at timestamp with time zone NOT NULL default now(),
    updated_at timestamp with time zone NOT NULL default now(),
    last_login timestamp with time zone
);

COMMIT;