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
        console.log(req)
        dbLogin(dbConnection, req.body, (isSuccessful, id) => {
            isSuccessful ? res.send(JSON.stringify({id})) : res.status(401).end()
        })
    })

    app.post("/register", (req, res) => {
        const {username, password} = req.body
        console.log(username, password)
        dbRegister(dbConnection, req.body, (isSuccessful) => {
            isSuccessful ? res.status(200).end() : res.status(400).end()
        })
    })

    app.get("/favorites", (req, res) => {
        dbSelectFav(dbConnection, req.body.userId, (isSuccessful, favs) => {
            isSuccessful ? res.send(JSON.stringify(favs)) : res.status(401).end();
        })
    })

    app.post("/favorites", (req, res) => {
        dbInsertFav(dbConnection, req.body, (isSuccessful) => {
            isSuccessful ? res.status(200).end() : res.status(400).end();
        })
    })

    app.delete("/favorites/:id", (req, res) => {
        dbDeleteFav(dbConnection, req.params.id, (isSuccessful) => {
            isSuccessful ? res.status(200).end() : res.status(400).end();
        })
    })

    return app.listen(PORT, () => {
        log(`Server up on PORT ${PORT}.`)
    })
}