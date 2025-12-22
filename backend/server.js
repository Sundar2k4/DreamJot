const mongoose = require('mongoose');
const express = require('express');
const Dream = require('./models/dream.js');
const bcrypt = require('bcrypt');
const Login = require('./models/login.js');
const Pub = require('./models/publicdream.js');
const Like = require('./models/like.js');
const cors = require('cors');
const jwt = require("jsonwebtoken");
require("dotenv").config();
const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT||6000;

mongoose.connect(process.env.MONGOURI,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{console.log("connected")}).catch(err=>console.log(err));

const authenticate = async (req, res, next) => {
  try {
    const authheader = req.get("authorization"); 

    if (!authheader || !authheader.startsWith("Bearer ")) { 
      return res
        .status(401)
        .json({ error: "authorization header is missing or invalid" });
    }

    const token = authheader.split(" ")[1]; 
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await Login.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error("Authentication error:", err);
    if (err.name === "JsonWebTokenError") {
      return res.status(401).json({ error: "Invalid token" });
    }
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Token expired" });
    }
    res.status(401).json({ error: "Authentication failed" });
  }
};



app.post('/adddream',authenticate, async (req, res) => {
    try {
      const { date, type, dream, characters, scenario } = req.body;
  
      const newDream = new Dream({
        userId:req.user._id,
        date,
        dream,
        type,
        characters,
        scenario,
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

  app.get("/finddreams",authenticate,async(req,res)=>{
    try
    {
    const data = await Dream.find({userId:req.user._id});
    res.status(200).json(data);
  }catch(err)
  {
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
  });

  app.get("/cdream/:id", authenticate, async (req, res) => {
    try {
      const dream = await Dream.findOne({
        _id: req.params.id,
        userId: req.user._id,
      });
  
      res.status(200).json(dream);
    } catch (err) {
      res.status(400).json(err);
    }
  });
  

  app.post("/deletedream", authenticate, async (req, res) => {
    try {
      const { id } = req.body;         
      const val = await Dream.findByIdAndDelete(id);
      if (!val) {
        return res.status(404).json({ error: "Dream not found" });
      }
      res.status(200).json(val);
    } catch (err) {
      res.status(400).json(err);
    }
  });
  
  app.post("/login", async (req,res)=>{
          try{

             const {name,password} = req.body;

             const user = await Login.findOne({name});

             if(!user)
             {
               return res.status(401).json("user not found");
             }

             const isuser = await bcrypt.compare(password,user.password);
             if(!isuser)
             {
                return res.status(400).json(
                  "invalid credentials"
                )
             }

             const token = jwt.sign(
               {id:user._id},
               process.env.JWT_SECRET,
               {expiresIn:"1d"},
             );

             res.status(200).json(token);

          }catch(err)
          {
            return res.status(400).json(err);
          }
  });

  app.get("/getname",authenticate, async (req,res)=>{
     try{
      return res.status(400).json({name:req.user.name});


     }catch(err){
      res.status(400).json(err);
     }
  })

  app.post("/post", authenticate, async (req, res) => {
    try {
      const dreamdata = req.body;
  
      const newpost = new Pub({
        userId: req.user._id,
        name:req.user.name,  
        date: dreamdata.date,
        type: dreamdata.type,
        dream: dreamdata.dream,
        characters: dreamdata.characters,
        scenario: dreamdata.scenario || "",
      });
  
      const postdream = await newpost.save();
      res.status(201).json(postdream);
    } catch (err) {
      console.error(err);
      res.status(400).json({ error: err.message });
    }
  });

  app.get("/getpub",authenticate,async (req,res)=>{
     try
     {

       const val = await Pub.find();
       return res.status(200).json(val);

     }catch(err)
     {
        res.status(400).json(err);
     }
  })


  app.post("/delpub/:id", authenticate, async (req, res) => {
    try {
      const id = req.params.id;
      const userId = req.user._id;
      

      const dream = await Pub.findById(id);
      
      if (!dream) {
        return res.status(404).json({ error: "Dream not found" });
      }
    
      if (dream.userId.toString() !== userId.toString()) {
        return res.status(403).json({ error: "Not authorized to delete this dream" });
      }

      const deleted = await Pub.findByIdAndDelete(id);
      res.status(200).json({ message: "Dream deleted successfully" });
      
    } catch (err) {
      console.error(err);
      res.status(400).json({ error: err.message });
    }
  });
  
app.get("/getpubinfo/:id", authenticate, async (req, res) => {
  try {
    const dream = await Pub.findById(req.params.id);
    if (!dream) {
      return res.status(404).json({ error: "Dream not found" });
    }
    res.json(dream);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.post("/likes/:id", authenticate, async (req, res) => {
  const { id } = req.params;
  const { like, dislike } = req.body;

  try {
    const data = await Like.findOneAndUpdate(
      { userid: id },       
      { $set: { like, dislike } }, 
      {
        upsert: true,        
        new: true,         
      }
    );

    return res.status(200).json({
      message: "Like data saved",
      data,
    });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

 
  
  
  
app.listen(port, () => {
    console.log("server connected on port " + port);
});