BEGIN;

CREATE TABLE ping
(
    id SERIAL PRIMARY KEY,
    val BOOLEAN NOT NULL DEFAULT FALSE
);

COMMIT;