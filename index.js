const express = require('express');
const cors = require("cors");

const app = express();
app.use(express.json());
const { Connection } = require('./config/db.js');
const { UserModal } = require('./modal/modal.js')

const middleware = (req, res, next) => {
    console.log(req.body);
    const { url, text, cat } = req.body;
    if (!url || !text || !cat) {
        res.status(401).send({ "msg": "Please fill all details" });
    } else {
        next();
    }
}

/* Get  */

app.get('/get', async (req, res) => {
    try {
        const data = await UserModal.find({});
        res.status(200).json({ 'msg': "Data fetched successfully", "data": data });
    }
    catch (err) {
        console.log(err);
        res.status(500).send({ 'msg': 'Something went wrong' });
    }
})

/* Post */
app.post('/post', middleware, async (req, res) => {
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

app.patch('/update',async(req,res)=>{
    try {
        const text= req.body.text;
        const new_text = req.body.new_text;
        const new_cat = req.body.cat;
        if(text && new_cat){
            await UserModal.findOneAndUpdate({"text":text},{"text":new_text, "cat":new_cat});
        }else{
            await UserModal.findOneAndUpdate({"text":text},{"text":new_text});
        }
       
        res.status(200).json({ 'msg': "Post updated successfully" })
     }
     catch (err) {
         console.log(err);
         res.status(500).send({ 'msg': "Something went wrong" });
     }
})


/* Delete */
app.delete('/delete',async(req,res)=>{
    try {
       const text= req.body.text;
       if(!text) return res.status(401).send({'msg':"Please provide all details"})
       await UserModal.deleteOne({"text":text});
       res.status(200).send({'msg':"Post Deleted"});
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

app.listen(8080, () => {
    try {
        Connection;
        console.log('Listening in port 8080')
    }
    catch (err) {
        console.error(err);
    }
})