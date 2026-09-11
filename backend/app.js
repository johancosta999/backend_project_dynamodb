const express = require('express');
const { connectDB } = require('./config/db')
require('dotenv').config();

const app = express();
app.use(express.json());

//api routes
//app.use('api/user/', require())

const startServer = async() => {
    await connectDB();

    app.listen(process.env.PORT, () => {
        console.log(`Successfully running on port : ${process.env.PORT}`);
    })
}

startServer();