require('dotenv').config()
const app = require('express')();
const bodyParser = require('body-parser')
const {dbConnect, dbRegister, dbLogin} = require('./database')
const {dbSelectFav, dbInsertFav, dbDeleteFav} = require ('./favorites');

const PORT = process.env.PORT || 3000
let dbConnection = null

const log = (message) => {
    return console.log(`【 ${new Date().toLocaleString()} 】- ${message}`)
}

dbConnect((db) => {
    log('Database connected.')
    dbConnection = db
    return initServer()
})

const initServer = () => {
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json())

    app.post("/login", (req, res) => {
        dbLogin(dbConnection, req.body, (isSuccessful, id, username) => {
            if (isSuccessful) {
                log(`${id} successful login.`)
                return res.send(JSON.stringify({id, username}))
            }
            log(`Failed login.`)
            res.status(401).end()
        })
    })

    app.post("/register", (req, res) => {
        const {username, password} = req.body
        console.log(username, password)
        dbRegister(dbConnection, req.body, (isSuccessful) => {
            if (isSuccessful) {
                log(`New account created: ${username}`)
                return res.status(200).end()
            }
            res.status(400).end()
        })
    })

    app.post("/favorites", (req, res) => {
        dbSelectFav(dbConnection, req.body.userId, (isSuccessful, favs) => {
            if (isSuccessful) {
                log(`User ${req.body.userId} successfully retrieved favorites.`);
                return res.send(JSON.stringify(favs));
            } 
            res.status(400).end();
        })
    })

    app.post("/saveFavorites", (req, res) => {
        const {userId, movieId} = req.body;
        dbInsertFav(dbConnection, req.body, (isSuccessful) => {
            if (isSuccessful) {
                log(`Movie ID ${req.body.movieId} was added as a favorite for user with ID ${userId}`);
                return res.status(200).end();
            } 
            res.status(400).end();
        })
    })

    app.post("/deleteFavorites", (req, res) => {
        dbDeleteFav(dbConnection, req.body, (isSuccessful) => {
            if (isSuccessful) {
                log(`Deleted favorites with id ${req.params.id}`);
                return res.status(200).end();
            } 
            res.status(400).end();
        })
    })

    return app.listen(PORT, () => {
        log(`Server up on PORT ${PORT}.`)
    })
}