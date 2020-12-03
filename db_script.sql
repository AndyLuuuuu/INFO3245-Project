DROP DATABASE IF EXISTS info3245;

CREATE DATABASE info3245
	WITH
	ENCODING = 'UTF8'
	CONNECTION LIMIT = -1;

\c info3245


CREATE TABLE accounts (
	id TEXT PRIMARY KEY,
	username TEXT UNIQUE NOT NULL,
	password TEXT UNIQUE NOT NULL
);

CREATE TABLE favorites (
    id BIGSERIAL PRIMARY KEY,
    user_id TEXT NOT NULL,
    movie_id BIGINT NOT NULL,
    movie_name TEXT,
    poster_url TEXT,

    CONSTRAINT fk_user
        FOREIGN KEY(user_id)
            REFERENCES accounts(id)
            ON DELETE CASCADE
);