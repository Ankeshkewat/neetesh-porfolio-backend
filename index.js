const express = require('express');
const cors = require("cors");

const app = express();
const { Connection } = require('./config/db.js');
const {UserModal} = require('./modal/modal.js')

const middleware = (req, res, next) => {
    const { url, text } = req.body;
    if (!url || !text) {
        res.status(401).send({ "msg": "Please fill all details" });
    } else {
        next();
    }
}



/* Post */
app.post('/post', middleware, async (req, res) => {
    try {
       const payload = req.body;
       const data = new UserModal(payload);
       await data.save();
       res.status(200).json({'msg':"New data added successfully"})
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ 'msg': "Something went wrong" });
    }
})


app.get('/', async (req, res) => {
    try {
        res.status(200).send({ "msg": "Welcome to Neetesh Portfolio" });
    }
    catch (err) {
        console.log(err);
        res.status(500).send({ 'msg': "Something went wrong" });
    }
})

app.listen(8080, () => {
    try {
        Connection;
        console.log('Listening in port 8080')
    }
    catch (err) {
        console.error(err);
    }
})