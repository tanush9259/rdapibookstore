const Schema = mongoose.Schema;
const bookSchema = new Schema;
const bookAtPlaceSchema = new Schema({
    book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
    pinCode: { type: String },
    isAvailable: { type: Boolean, default: false }


},{ timestamps: true })
module.exports = mongoose.model('BookAtPlace', bookAtPlaceSchema)