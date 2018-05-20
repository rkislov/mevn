const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const config = require('./config/config')
const mongoose = require('mongoose')
const auth = require('./routes/auth')

const app = express()
mongoose.Promise = global.Promise
mongoose.connect(config.dbUrl, config.dbOptions)

app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

app.use(require('./routes/posts'))

mongoose.connection
    .once('open', () => {
        console.log('оединение с БД успешно установленно....')
        app.listen(process.env.PORT || config.port ,
            ()=>console.log(`Сервер запущенн и слушает на порту ${config.port}....`))
    })
    .on('error', error => console.log(`Что-то пошло не так ${error}.....`))

