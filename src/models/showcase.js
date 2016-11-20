import mongoose from 'mongoose'

export let ShowcaseScheme = new mongoose.Schema({
  images: Array
})
// {
//     description: String,
//     description_en: String,
//     url: String
//   }
export let Mission = mongoose.model('Showcase', ShowcaseScheme)
