BEGIN;

CREATE TABLE "order"
(
    id SERIAL PRIMARY KEY,
    office_id INT NOT NULL,
    resource_id INT NOT NULL,
    user_id INT NOT NULL,
    "created_by" INT NOT NULL,
    "minutes" INT NOT NULL,
    "people" INT NOT NULL,
    start_at timestamp with time zone NOT NULL,
    created_at timestamp with time zone NOT NULL default now(),
    updated_at timestamp with time zone NOT NULL default now(),
    -- one to many: office may have many resources
    FOREIGN KEY (office_id) REFERENCES office (id) ON DELETE CASCADE,
    FOREIGN KEY (resource_id) REFERENCES "resource" (id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES "users" (id) ON DELETE CASCADE,
    FOREIGN KEY (created_by) REFERENCES "users" (id) ON DELETE CASCADE
);

COMMIT;