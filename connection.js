const mongoose = require('mongoose')
async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/reactcurd2026');
        console.log("db Connected..")

    } catch (err) {
        console.log(err)
    }
}
module.exports = connect