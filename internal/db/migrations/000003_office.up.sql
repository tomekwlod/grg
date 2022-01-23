BEGIN;

CREATE TABLE office
(
    id SERIAL PRIMARY KEY,
    admin_id INT NOT NULL,
    max_people_pd INT NOT NULL default 10,
    "name" VARCHAR(255) NOT NULL UNIQUE,
    "address" VARCHAR(255) NULL,
    "telephone" VARCHAR(20) NULL,
    "description" TEXT NULL,
    created_at timestamp with time zone NOT NULL default now(),
    updated_at timestamp with time zone NOT NULL default now(),
    -- one to many: user may have many offices
    FOREIGN KEY (admin_id) REFERENCES users(id) ON DELETE CASCADE
);

COMMIT;