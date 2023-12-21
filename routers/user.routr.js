const express = require('express');
const jwt = require('jsonwebtoken');

const UserRouter = express.Router();

const { UserModal } = require('../modal/user.modal');

UserRouter.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (name && email && name.toLowerCase().includes('neetesh') && email.toLowerCase().includes('neetesh')) {
            const user = new UserModal({ name, email, password })
            await user.save();
            res.status(200).send({ "msg": "Account created" })
        } else {
            res.status(401).send({ 'msg': "You are not authorized person to do this" })
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).send({ 'msg': "Something went wrong" });
    }
})

UserRouter.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        let data = await UserModal.findOne({ "email": email });
        console.log(data);
        if (data) {
            if (data.password == password) {
                const token = jwt.sign({ "email" : email,"password" : password}, "Secret")
                res.status(200).send({ 'msg': "Logic success", "token":token })
            } else {
                res.status(401).send({ 'msg': "Incorrect password" })
            }
        }
        else {
            res.status(401).send({ 'msg': "You are not authorized person to do this" })
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).send({ 'msg': "Something went wrong" });
    }
})


module.exports = { UserRouter }