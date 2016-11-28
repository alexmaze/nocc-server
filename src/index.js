import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import multer from 'multer'
import logger from 'morgan'
import session from 'express-session'
import wrench from 'wrench'
import path from 'path'

import {
  db
} from './db'
import {
  auth
} from './middlewares/auth'
import fs from 'fs-extra'

const PORT = 4000

const app = express()
const upload = multer()

// trust first proxy
app.set('trust proxy', 1)

// 中间件
app.use('/upload', express.static(path.join(__dirname, '../public/upload')))
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(cookieParser())

// session 注入
app.use(session({
  secret: 'WV78o1Z3v4HjJ8SkPnOjAdC2',
  cookie: {
    maxAge: 60 * 1000 * 60 * 2
  },
  resave: true,
  saveUninitialized: true
}))

// 授权检测
app.use(auth)

// 注册路由
app.use('/api/event', require('./routes/event').default)
app.use('/api/faculty', require('./routes/faculty').default)
app.use('/api/file', require('./routes/file').default)
app.use('/api/lab', require('./routes/lab').default)
app.use('/api/mission', require('./routes/mission').default)
app.use('/api/session', require('./routes/session').default)
app.use('/api/showcase', require('./routes/showcase').default)
app.use('/api/user', require('./routes/user').default)

// 异常处理
// app.use(function (err, req, res, next) {
//   console.log('%%%%%%%%%%%%%%%%')
//   return res.status(500).json(err)
// })

// 启动
app.listen(PORT, () => {
  console.log('server is listening @', PORT)
})
