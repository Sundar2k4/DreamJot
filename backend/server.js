const mongoose = require('mongoose');
const express = require('express');
const Dream = require('./models/dream.js');
const bcrypt = require('bcrypt');
const Login = require('./models/login.js');
const cors = require('cors');
require("dotenv").config();
const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT||6000;

mongoose.connect(process.env.MONGOURI,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{console.log("connected")}).catch(err=>console.log(err));

app.post('/adddream', async (req, res) => {
    try {
      const { date, type, dream, characters } = req.body;
  
      const newDream = new Dream({
        date,
        dream,
        type,
        characters,
      });
  
      const savedDream = await newDream.save();
  
      if (savedDream) {
        res.status(200).json(savedDream);
      } else {
        res.status(500).json({ error: "Failed to save dream" });
      }
    } catch (err) {
      res.status(400).json(err);
    }
  });
  

  app.post('/register',async (req,res)=>{
      try{
           const {name,password} = req.body;

           const existing = await Login.findOne({name});

           if(existing)
           {
             return res.status(400).json("error user already exists");
           }

           const newlogin = new Login({
             name,
             password,
           })

           await newlogin.save();
           res.status(200).json("created successfully");

      }catch(err)
      {
         res.status(400).json(err);
      }
  })

app.listen(port, () => {
    console.log("server connected on port " + port);
});