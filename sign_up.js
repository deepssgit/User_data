const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
"use strict";
const nodemailer = require("nodemailer");

const app = express();

const ejs = require("ejs")

const _ = require("lodash");
const { delay } = require("lodash");

app.use(bodyParser.urlencoded({extended:true}))

app.use(express.static("public"));

app.set("view engine","ejs");

var MongoClient = require('mongodb').MongoClient;

mongoose.connect("mongodb://localhost:27017/userdataaDB",{useNewUrlParser: true},{useUnifiedTopology: true})

const userSchema = new mongoose.Schema({
    name:String,
    country: String,
    description: String,
    email: String,
    gender:String,
    password:String,
    projects:String,
    state:String,
    experience:String,
    mobile:String
});



const User = mongoose.model("User",userSchema);





app.get("/", (req, res) => {
  res.render("home");
});

app.get("/register", (req, res) => {
  res.render("sign_up");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/user",function(req,res){
  res.render("user")
})

// const verificationCode = Math.floor((Math.random() * 1000000) + 1);
// console.log(verificationCode);

app.post("/register",function(req,res){
  
  

    const nameUser = req.body.fullname
    const countryUser = req.body.c_name
    const descriptionUser =  req.body.description
    const emailUser = req.body.email
    const genderUser = req.body.gender
    const passwordUser=req.body.password
    const projectUser=req.body.project
    const stateUser=req.body.s_name
    const experienceUser=req.body.Experience
    const mobileUser=req.body.mobile
  
    const user = new User({
        name:nameUser,
        country: countryUser,
        description: descriptionUser,
        email: emailUser,
        gender:genderUser,
        password:passwordUser,
        projects:projectUser,
        state:stateUser,
        experience:experienceUser,
      mobile:mobileUser
    });
    
    user.save()
    console.log(user)
    res.redirect("/login")

  })

  app.post("/login",function(req,res){
  
    const emailloginUser = req.body.loginemail
   
    const passwordloginUser=req.body.loginpassword
    MongoClient.connect('mongodb://localhost:27017', function(err, client) {
       if(err) throw err;
       var db =client.db("userdataaDB")
       var collection = db.collection('users');

    collection.findOne({email:emailloginUser,password:passwordloginUser}, function(err,doc){
      if(doc){
        const clientName=doc.name
        const clientEmail=doc.email
        const clientNumber=doc.mobile
        const clientGender=doc.gender
        const clientcountry=doc.country
        const clientState=doc.state
        const clientProject = doc.project 
        const clientExp=doc.Experience 
        const clientDesc=doc.description
        const responseData = {
          Name:clientName,
        Email:clientEmail,
        Number:clientNumber,
        Gender:clientGender,
        Country:clientcountry,
        State:clientState,
        Project:clientProject,
        Experience:clientExp,
        Description:clientDesc
      }
        
      const jsonContent = JSON.stringify(responseData);
      res.end(jsonContent);
    };
      client.close();
      if(err){
       
      }
  });

})


  })

// app.get("/verification",function(req,res) {
//   res.sendFile(__dirname + "/registerd.html");
  
// })

// app.post("/verification",function(req,res){
//   vCode = req.body.verification
//   if(vCode === verificationCode){
//     res.sendFile(__dirname + "/loggedin.html");
//   }
//   else{
//     console.log(err)
//   }
// })  
     

    

    
  


   
// // async..await is not allowed in global scope, must use a wrapper
// async function main() {
//   // Generate test SMTP service account from ethereal.email
//   // Only needed if you don't have a real mail account for testing
//   let testAccount = await nodemailer.createTestAccount();

//   // create reusable transporter object using the default SMTP transport
//   const transporter = nodemailer.createTransport({
//     host: 'smtp.gmail.com',
//     port: 465,
//     secure: true, 
//     auth: {
//         user: '2019uce1120@mnit.ac.in',
//         pass: 'Zxdfg@#12%'
//     }
// });

//   // send mail with defined transport object
//   let info = await transporter.sendMail({
//     from: '2019uce1120@mnit.ac.in', // sender address
//     to:  emailUser, // list of receivers
//     subject: "confirmatiom email", // Subject line
//     text: `Please verify your email , enter verification code ${verificationCode}`
//     // html: <b>verificationCode</b>
//   });

//   console.log("Message sent: %s", info.messageId);
//   // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

//   // Preview only available when sending through an Ethereal account
//   console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
//   // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
// }

// main().catch(console.error);


let port = process.env.PORT;
if(port == null || port == ""){
    port ==3000
}

app.listen(port||3000, function () {
    console.log("server has started successfully");
})