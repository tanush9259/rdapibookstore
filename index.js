const express = require('express');
const cors = require('cors');
const connect = require('./connection');
const book = require('./routes/book');
const user = require('./routes/user');
const frontUser = require('./routes/user/user');
const discount = require('./routes/discount');
const availability = require('./routes/availability');
const createAdmin = require('./createAdmin');
const home = require('./routes/user/home');

const app = express();

app.use(cors());
app.use(express.json());

app.use(book);
app.use(user);
app.use(discount);
app.use(availability);
app.use(home);
app.use(frontUser);

connect();
createAdmin();

app.listen(3000, (err) => {

    if (err) {
        console.log(err);
    } else {
        console.log("Server is running on 3000");
    }

});