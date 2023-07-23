const express = require("express");
const cors = require ('cors');
const app = express();
const mongoose = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcryptjs');

//create hash for passowrd
const salt = bcrypt.genSaltSync(10);

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://ashish9six:VDaYJcZoGRM6SaBb@cluster0.lzmzkxp.mongodb.net/?retryWrites=true&w=majority');

//backend for register
app.post('/register', async (req, res) => {
    const {username, password} = req.body;
    // const userDoc = await User.create({username, password});
    try{
        const userDoc = await User.create({
            username, 
            password:bcrypt.hashSync(password, salt)});
        res.json(userDoc);
    }
    catch(e)
    {
        res.status(400).json(e.message);
    }

});

//backend for login
app.post('/login', async(req, res)=>{
    const {username, password} = req.body;
    const userDoc = await User.findOne({username});
    // console.log(userDoc);
    const passOk = bcrypt.compareSync(password, userDoc.password);
    res.json(passOk);
})

app.listen(4000);

//VDaYJcZoGRM6SaBb