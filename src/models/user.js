import mongoose from 'mongoose'

export let UserScheme = new mongoose.Schema({
  name: {
    unique: true,
    type: String,
    require: true
  },
  email: String,
  password: {
    type: String,
    require: true
  },
  avatarUrl: String,
  gender: Boolean,
  role: String,
  created: Date
})

export let User = mongoose.model('User', UserScheme)
