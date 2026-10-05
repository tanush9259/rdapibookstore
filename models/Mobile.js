const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const mobileSchema = new Schema({
    mobileName: { type: String },
    brandName: { type: String },
    price: { type: Number },
    ram: { type: String },
    rom: { type: String },
    mobileImage: { type: String }
   

   // publication: { type: String }

})
module.exports = mongoose.model('Mobile', mobileSchema)