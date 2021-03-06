const express = require('express');
const http = require('http');
const connectDB = require("./db");
const app = express();
const router = require('./router/api');
const cors = require("cors");



//Global  middleware

app.use([express.json(),cors(),router])

// Global error handler
/**
 * @param {Error} err
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 *@returns {Response}
 *
 */
app.use((err, req, res, next) => {
    const message = err.message ? err.message : 'Server Error Occurred';
    const status = err.status ? err.status : 500;
    return res.status(status).json({
        message,
    });
});


connectDB('mongodb://localhost:27017/attendance-db').then(() => {
    console.log('Connected to DB');
    const server = http.createServer(app);
    server.listen(3000, () => {
        console.log('Server is running on port 3000');
    })
}).catch(e => {
    console.log(e);
});




