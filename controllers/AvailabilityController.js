const Availability = require('../models/Availability');


// CREATE AVAILABILITY
async function createAvailability(req, res) {

    try {

        console.log(req.body);

        let availability = new Availability(req.body);

        await availability.save();

        res.status(200).send({
            success: true,
            message: 'Availability created successfully'
        });

    } catch (err) {

        console.log(err);

        res.status(400).send({
            success: false,
            message: 'Something went wrong'
        });

    }
}


// GET ALL AVAILABILITY
async function getAvailability(req, res) {

    try {

        let availability = await Availability
            .find({})
            .populate('book');

        res.status(200).send({
            success: true,
            data: availability
        });

    } catch (err) {

        console.log(err);

        res.status(400).send({
            success: false,
            message: err.message
        });

    }
}


// CREATE AVAILABILITY FOR ALL BOOKS
async function createAllAvailability(req, res) {

    try {

        const Book = require('../models/Book');

        let books = await Book.find({});

        let createdCount = 0;

        for (let book of books) {

            let existing = await Availability.findOne({
                book: book._id
            });

            if (!existing) {

                await Availability.create({
                    book: book._id,
                    quantity: 10,
                    status: "Available"
                });

                createdCount++;
            }
        }

        res.status(200).send({
            success: true,
            message: createdCount + " books availability created successfully"
        });

    } catch (err) {

        console.log(err);

        res.status(400).send({
            success: false,
            message: err.message
        });

    }
}


// DELETE AVAILABILITY
async function deleteAvailability(req, res) {

    try {

        let id = req.params.id;

        await Availability.deleteOne({
            _id: id
        });

        res.status(200).send({
            success: true,
            message: "Availability deleted successfully"
        });

    } catch (err) {

        console.log(err);

        res.status(400).send({
            success: false,
            message: err.message
        });

    }
}


// GET AVAILABILITY FOR EDIT
async function getAvailabilityForEdit(req, res) {

    try {

        let id = req.params.id;

        let availability = await Availability
            .findOne({
                _id: id
            })
            .populate("book");

        res.status(200).send({
            success: true,
            data: availability
        });

    } catch (err) {

        console.log(err);

        res.status(400).send({
            success: false,
            message: err.message
        });

    }
}


// EDIT AVAILABILITY
async function editAvailability(req, res) {

    try {

        let id = req.params.id;

        await Availability.updateOne(
            {
                _id: id
            },
            {
                quantity: req.body.quantity,
                status: req.body.status
            }
        );

        res.status(200).send({
            success: true,
            message: "Availability updated successfully"
        });

    } catch (err) {

        console.log(err);

        res.status(400).send({
            success: false,
            message: err.message
        });

    }
}


// EXPORT
module.exports = {
    createAvailability,
    getAvailability,
    createAllAvailability,
    deleteAvailability,
    getAvailabilityForEdit,
    editAvailability
};