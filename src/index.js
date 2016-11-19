import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import multer from 'multer'
import logger from 'morgan'
import session from 'express-session'
import wrench from 'wrench'

import { db } from './db'
import { auth } from './middlewares/auth'

const PORT = 4000

const app = express()
const upload = multer()

app.set('trust proxy', 1) // trust first proxy

app.use(express.static(__dirname + '/../public'))
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded( { extended: true } ))
app.use(cookieParser())

// session
app.use(session({
  secret: 'WV78o1Z3v4HjJ8SkPnOjAdC2',
  cookie: { maxAge: 60 * 1000 },
  resave: true,
  saveUninitialized: true
}))

app.use(auth)

// 注册路由
// auto load modules
wrench.readdirSyncRecursive(`${__dirname}/routes`)
  .filter((path) => (/\.(js|coffee)$/i)
  .test(path))
  .map((path) => {
    let routePrefix = path.substring(0, path.length - 3)
    console.log('Load', routePrefix, path)
    app.use(`/api/${routePrefix}`, require(`${__dirname}/routes/${path}`).default)
  })

app.listen(PORT, () => {
  console.log('server is listening @', PORT)
})
