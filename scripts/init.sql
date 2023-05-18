CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE employees (
    id UUID NOT NULL DEFAULT uuid_generate_v4(),
    first_name VARCHAR(128) NOT NULL,
    last_name VARCHAR (128) NOT NULL,
    salary NUMERIC NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ,
    CONSTRAINT pkey_item PRIMARY KEY(id)
);


INSERT INTO employees (id, first_name, last_name, salary) VALUES
    ('e109f248-6724-4729-b498-fe873372e1b4','Ian', 'Malcolm',70000),
    ('0f81016b-9d71-4218-a2b8-df9f2615c07b','Ellie', 'Sattler',102000),
    ('59a67321-ff55-49ef-b357-ea5cc6b9e6fb','Dennis', 'Nedry',52000),
    ('13ed8ffe-0a9c-49d6-b6d3-61ff2fcbbc02','John', 'Hammond',89600),
    ('546a61ec-3619-4ffe-b2f4-5c96bd76e519','Ray','Arnold',45000),
    ('173ffe62-d807-4392-8ea1-4bbdc20bccd1','Laura','Burnett',80000);