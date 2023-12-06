create TABLE person(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    surname VARCHAR(255),
    password VARCHAR(255),
    login VARCHAR(255),
);

create TABLE route(
    id SERIAL PRIMARY KEY,
    number VARCHAR(255),
    exit_date VARCHAR(255),
    enter_date VARCHAR(255),
    exit_city VARCHAR(255),
    enter_city VARCHAR(255),
    route_id INTEGER,
    FOREIGN KEY (route_id) REFERENCES person (id)
);