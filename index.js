const express = require('express');
const cors = require("cors");
const jwt = require('jsonwebtoken');


const app = express();
app.use(express.json());
app.use(cors({
    origin : "*"
}));

const { Connection } = require('./config/db.js');
const { UserModal } = require('./modal/modal.js')
const { UserRouter } = require('./routers/user.routr.js')

app.post('/register', UserRouter);
app.post('/login', UserRouter);

const middleware = (req, res, next) => {
    console.log(req.body);
    const { url, text, cat } = req.body;
    if (!url || !text || !cat) {
        res.status(401).send({ "msg": "Please fill all details" });
    } else {
        next();
    }
}

/* Authantication */
const validate = async (req, res, next) => {
    try {
        let token = req.headers?.authorization?.split(' ')[1];
        if (!token) return res.status(401).json({ 'msg': "Your are not authorized" })
        const data = jwt.verify(token, "Secret")
         console.log(data)
        if (data.email.toLowerCase().includes('neetesh')) {
            next()
        } else {
            res.status(401).send({ 'msg': "You are not authorized person to do this" })
        }
    }
    catch (err) {
        console.log("Error is coming from Validate middleware")
        console.error(err)
        res.status(500).json({ 'msg': "Something went wrong" })

    }
}

/* Get  */

app.get('/get',validate, async (req, res) => {
    try {


        const data = await UserModal.find({});
        res.status(200).json({ 'msg': "Data fetched successfully", "data": data });
    }
    catch (err) {
        console.log("Error in getting data ", err);
        res.status(500).send({ 'msg': 'Something went wrong' });
    }
})

/* Post */
app.post('/post', async (req, res) => {
    try {
        const payload = req.body;
        const data = new UserModal(payload);
        await data.save();
        res.status(200).json({ 'msg': "New data added successfully" })
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ 'msg': "Something went wrong" });
    }
})

/* Update */

app.patch('/update',validate, async (req, res) => {
    try {
        const text = req.body.text;
        const new_text = req.body.new_text;
        const new_cat = req.body.cat;
        if (text && new_cat) {
            await UserModal.findOneAndUpdate({ "text": text }, { "text": new_text, "cat": new_cat });
        } else {
            await UserModal.findOneAndUpdate({ "text": text }, { "text": new_text });
        }

        res.status(200).json({ 'msg': "Post updated successfully" })
    }
    catch (err) {
        console.log(err);
        res.status(500).send({ 'msg': "Something went wrong" });
    }
})


/* Delete */
app.delete('/delete', validate, async (req, res) => {
    try {
        const text = req.body.text;
        if (!text) return res.status(401).send({ 'msg': "Please provide all details" })
        await UserModal.deleteOne({ "text": text });
        res.status(200).send({ 'msg': "Post Deleted" });
    }
    catch (err) {
        console.log(err);
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

app.listen(2001, () => {
    try {
        Connection;
        console.log('Listening in port 2001')
    }
    catch (err) {
        console.error(err);
    }
})