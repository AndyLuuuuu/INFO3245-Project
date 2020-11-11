const { Client } = require('pg')
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt')

const dbQuery = {
    register: 'INSERT INTO accounts(id, username, password) VALUES ($1, $2, $3) RETURNING *',
    login: 'SELECT id, password FROM accounts WHERE username = $1'
}

const dbConnect = (callback) => {

    const db = new Client({
        user: process.env.PGUSER,
        host: process.env.PGHOST,
        database: process.env.PGDATABASE,
        password: process.env.PGPASSWORD,
        port: process.env.PGPORT,
    })

    db.connect().then(() => {
        db.query('SELECT NOW()', (err, res) => {
            if (res) {
                return callback(db)
            }
            return new Error("Cannot connect to database, please check credentials!")
          })
    })
}

const dbRegister = (db, userdata, callback) => {
    const {username, password} = userdata
    console.log(db)
    bcrypt.hash(password, 10, function(err, hash) {
        if (err) {
            return console.log(err)
        }
        db.query(dbQuery.register, [uuidv4(), username, hash], (err, res) => {
            if (err) {
                return callback(false)
            }
            callback(true)
        })
    });
}

const dbLogin = (db, userdata, callback) => {
    const {username, password} = userdata

    db.query(dbQuery.login, [username], (err, res) => {
        if (err) {
            return callback(false)
        }
        if (res.rows.length) {
            bcrypt.compare(password, res.rows[0]['password']).then(pass => {
                pass ? callback(pass, res.rows[0]['id']) : callback(false, null)
            })
        }
    })
}

module.exports = {dbConnect, dbRegister, dbLogin}


/* POSTGRESQL CREATE TABLES

CREATE TABLE accounts (
	id VARCHAR(36) PRIMARY KEY,
	username VARCHAR(20) UNIQUE NOT NULL,
	password VARCHAR(72) UNIQUE NOT NULL
)




*/