require('dotenv').config()
const app = require('express')();
const bodyParser = require('body-parser')
const {dbConnect, dbRegister, dbLogin} = require('./database')

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
            if (isSuccessful) {
                log(`${id} successful login.`)
                return res.send(JSON.stringify({id}))
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

    return app.listen(PORT, () => {
        log(`Server up on PORT ${PORT}.`)
    })
}