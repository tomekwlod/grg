BEGIN;

CREATE TABLE "resource"
(
    id SERIAL PRIMARY KEY,
    office_id INT NOT NULL,
    "name" VARCHAR(255) NOT NULL UNIQUE,
    "description" TEXT NULL,
    created_at timestamp with time zone NOT NULL default now(),
    updated_at timestamp with time zone NOT NULL default now(),
    -- one to many: office may have many resources
    FOREIGN KEY (office_id) REFERENCES office(id) ON DELETE CASCADE
);

COMMIT;