const Book = require('../models/Book')
const cloudinary = require('cloudinary').v2

 async function addBook(req,res) {
    try {
         console.log(req.body)
      // console.log(req.file)
        cloudinary.config({
            cloud_name: "dtnj3vjad",
            api_key: "836243925894637",
            api_secret: "z0rnS46iWj8QmEKtGeux95BLEpo"
        })
        const upload = await cloudinary.uploader.upload(req.file.path)
        //console.log(upload)
        req.body.bookImage = upload.secure_url;
       
        let book = new Book(req.body)
         await book.save();
       // console.log("Data saved successfully...")
        res.status(200).send({ message: 'Data has been saved successfilly'})
    } catch (err) {
        //console.log(err)
        res.status(400).send({ message: 'Something went wrong' })

    }
}
 async function getBooks(req, res) {
    try {
       // let books = await Book.find({});
       // console.log(books)
       let totalBooks = await Book.countDocuments({});
      // console.log(totalBooks, 'totalbooks')
       
       let books = await Book.find({bookTitle: new RegExp(req.query.searchBook, "i") }).skip((req.query.pageNo - 1)*(req.query.booksPerPage)).limit(req.query.booksPerPage);
        res.status(200).send({ data: books, totalBooks: totalBooks })

    } catch(err) {
       // console.log(err)
        res.status(400).send({ message: err })

    }
}
async function deleteBook(req, res) {
    try {
        id = req.params.id;
        await Book.deleteOne({ _id: id });
        res.status(200).send({ success: true })
    } catch (err) {
         //console.log(err)
         res.status(400).send({ success: false })
        
    }
}
async function getBookForEdit(req,res) {
    try {
        let id = req.params.id;
        //console.log(id);
        let book = await Book.findOne({ _id: id });
       // console.log(book)
        res.status(200).send({ data: book })
    } catch (err) {
       // console.log(err)
        res.status(400).send({ data: err })
    }
}
async function editBook(req,res) {
    try {
        let id = req.params.id;
      //  console.log(id)
        let book = req.body;
        //console.log(book)
        await Book.updateOne({_id: id}, req.body)
       // console.log("Book updated successfully..")
        res.status(200).send({ success: true })

    } catch (err) {
       // console.log(err)
         res.status(400).send({ success: false })
    }
}
async function getBookById(req, res) {

    try {

        const book = await Book.findById(req.params.id)

        if (!book) {

            return res.status(404).send({
                success: false,
                message: "Book not found"
            })

        }

        res.status(200).send({
            success: true,
            data: book
        })

    } catch (err) {

        console.log(err)

        res.status(400).send({
            success: false,
            message: "Unable to get book",
            error: err.message
        })

    }

}
module.exports = {
    addBook,
    getBooks,
    deleteBook,
    getBookForEdit,
    editBook,
    getBookById
    

}