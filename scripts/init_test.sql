CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE employees (
    id UUID NOT NULL DEFAULT uuid_generate_v4(),
    first_name VARCHAR(128) NOT NULL,
    last_name VARCHAR (128) NOT NULL,
    salary NUMERIC NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT pkey_item PRIMARY KEY(id)
);