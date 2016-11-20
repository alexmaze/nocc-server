import mongoose from 'mongoose'

export let LabScheme = new mongoose.Schema({
  images: Array,
  text: String,
  text_en: String,
  circle1: {
    title: String,
    title_en: String,
    info: String,
    info_en: String,
    url: String
  },
  circle2: {
    title: String,
    title_en: String,
    info: String,
    info_en: String,
    url: String
  },
  circle3: {
    title: String,
    title_en: String,
    info: String,
    info_en: String,
    url: String
  },
  circle4: {
    title: String,
    title_en: String,
    info: String,
    info_en: String,
    url: String
  }
})
// {
//     description: String,
//     description_en: String,
//     url: String
//   }
export let Lab = mongoose.model('Lab', LabScheme)
