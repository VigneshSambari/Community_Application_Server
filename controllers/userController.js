const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const config = require("config");

//email handler
const nodemailer = require("nodemailer");

//uuid unique string
const {v4: uuidv4} = require("uuid");

//Mongodb user model
const User = require("../models/User");

//env variables
require("dotenv").config();

//mongodb user verification model
const UserVerification = require("../models/UserVerification");

//nodemailer transporter
let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
        user: "communityapplication45@gmail.com",
        pass: "pnzxibhzokrthuli",
    }
})


//testing 
 transporter.verify((error, success) => {
    if(error){
        console.log("Inside transporter")
        console.log(error);
    }
    else{
        console.log("Ready for messages"),
        console.log(success)
    }
});

//Generate encryped password
const generateEncryptedPassword = async (password)=>{
    let salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
}


//Generate token from email and id
const generateToken = ({email, id}) =>{
    return jwt.sign({
        email,
        id
    }, config.get("JwtKey"))
}


//SignUp Controller -> Google Auth and Signin by Email
const signupController = async (req, res) => {
    if (req.body.googleAccessToken) {
        const {googleAccessToken} = req.body;

        axios
            .get("https://www.googleapis.com/oauth2/v3/userinfo", {
            headers: {
                "Authorization": `Bearer ${googleAccessToken}`
            }
        })
            .then(async response => {
                const firstName = response.data.given_name;
                const lastName = response.data.family_name;
                const email = response.data.email;
                const picture = response.data.picture;

                const existingUser = await User.findOne({email})

                if (existingUser) 
                    return res.status(400).json({message: "User already exist!"})

                const result = await User.create({verified:"true",email, firstName, lastName, profilePicture: picture})

                const token = generateToken({email: result.email,  id:result._id})

                console.log("Inside signup google auth");
                console.log(token);
                console.log(result);    

                return res.status(200).json({result, token})
            })
            .catch(err => {
                console.log("Inside signp google auth ");
                console.log(err);
                return res.status(400).json({message: "Invalid access token!"})
            })

    } else {
        // normal form signup
        const {email, password, confirmPassword, name} = req.body;

        try {
            // if (email === "" || password === "" || firstName === "" || lastName === "" && password === confirmPassword && password.length >= 4) 
            //     return res.status(400).json({message: "Invalid field!"})

            const existingUser = await User.findOne({email})

            if (existingUser) 
                return res.status(400).json({message: "User already exist!"})

           
            const hashedPassword = await generateEncryptedPassword(password);

            const result = await User.create({email, password: hashedPassword, name:name})
            const token = generateToken({email: result.email, id: result._id})

            console.log("Inside signup email and password ");
            console.log(token);
            console.log(result);

            return res.status(200).json({result, token})
        } catch (err) {
            console.log("Inside signup email and password ");
            console.log(err);
            return res.status(500).json({message: "Something went wrong!"})
        }

    }
}



//SignIn controller using Google Auth and email
const signinController = async(req, res) => {
    if(req.body.googleAccessToken){

        const {googleAccessToken} = req.body;

        axios
            .get("https://www.googleapis.com/oauth2/v3/userinfo", {
            headers: {
                "Authorization": `Bearer ${googleAccessToken}`
            }
        })
            .then(async (response) => {
                const firstName = response.data.given_name;
                const lastName = response.data.family_name;
                const email = response.data.email;
                const picture = response.data.picture;

                const existingUser = await User.findOne({email})

                if (!existingUser) 
                return res.status(404).json({message: "User don't exist!"})

                const token = generateToken({email: existingUser.email, id: existingUser._id})
                
                console.log("Inside signin google auth ");
                console.log(token);
                console.log(existingUser);

                return res.status(200).json({result: existingUser, token})
                    
            })
            .catch((err) => {
                console.log("Inside signin google auth ");
                console.log(err);
                return res.status(400).json({message: "Invalid access token!"})
            })
    }
    else{
        const {email, password} = req.body;

        if (email === "" || password === "") 
            return res.status(400).json({message: "Invalid field!"});
        try {
            const existingUser = await User.findOne({email})
    
            if (!existingUser) 
                return res.status(404).json({message: "User doesn't exist!"})
    
            const isPasswordOk = await bcrypt.compare(password, existingUser.password);
    
            if (!isPasswordOk) 
                return res.status(400).json({message: "Invalid credintials!"})
    
            const token = generateToken({email: existingUser.email, id: existingUser._id})
            
            console.log("Inside signin email and password ");
            console.log(token);
            console.log(existingUser);

            return res.status(200).json({result: existingUser, token})

        } catch (err) {
            console.log("Inside signin email and password ");
            console.log(err);
            return res.status(500).json({message: "Something went wrong!"})
        }
    }
  
}


//change password
const changePasswordController = async (req,res) => {
    const {email, newPassword, oldPassword} = req.body;

        if (email === "") 
            return res.status(400).json({message: "Email fiels is empty"});
        try {
            const existingUser = await User.findOne({email})
    
            if (!existingUser) 
                return res.status(404).json({message: "User doesn't exist!"})
    
            const isPasswordOk = await bcrypt.compare(oldPassword, existingUser.password);
            
             if (!isPasswordOk) 
                 return res.status(400).json({message: "Invalid credintials!"})
    
            
            const hashedPassword = await generateEncryptedPassword(newPassword);
            
            existingUser.password=hashedPassword

            existingUser.save()
            
            console.log("Inside signin email and password ");
            console.log(existingUser);

            return res.status(200).json({result: existingUser, message:"Succesfully changed password"})

        } catch (err) {
            console.log("Inside signin email and password ");
            console.log(err);
            return res.status(500).json({message: "Something went wrong!"})
        }
}



module.exports = {
    signinController,
    signupController,
    changePasswordController
}