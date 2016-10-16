import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import multer from 'multer'
import logger from 'morgan'
import session from 'express-session'

import userRoute from './routes/user.js'

import { db } from './db.js'

const PORT = 4000

const app = express()
const upload = multer()

app.set('trust proxy', 1) // trust first proxy

app.use(express.static(__dirname + '/../public'))
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded( { extended: true } ))
app.use(cookieParser())

// 注册路由
app.use('/api/user', userRoute)

app.listen(PORT, () => {
  console.log('server is listening @', PORT)
})
