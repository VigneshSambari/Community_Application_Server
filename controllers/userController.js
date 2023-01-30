const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const config = require("config");
const path = require("path");

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
            user: config.get("AdminEmail"),
            pass: config.get("AdminPassword"),
        }    
});


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
<<<<<<< HEAD
const generateToken = ({id}) =>{
    return jwt.sign({
        id,
=======
const generateToken = ({email, id}) =>{
    return jwt.sign({
        email,
        id
>>>>>>> 8d5bfd096c55756115e3a4acea7425c3eec7df21
    }, config.get("JwtKey"))
}


//send verification mail
<<<<<<< HEAD
const sendVerificationMail = async (req, res) => {
    
    //Currently local host url but is actual url when hosted
    const email = req.body.email

    const userExists = await User.find({email});

    if(userExists.length > 0){
        return res.status(401).json({
            "message": "User with provided email already exists"
        })
    }
    
    const alreadySent = await UserVerification.find({email});

    console.log(alreadySent)

    

   //check if verification link is already sent and 
   //delete it and resend if it expired
    if(alreadySent.length > 0){
        console.log(alreadySent)
        const {expiresAt} = alreadySent[0];
        if(expiresAt < Date.now()){
            try{
                await UserVerification.deleteOne({email});
            }
            catch(err){
                res.json(400).json({"message": "Error in deleteing previous verification link credentials"})
            }
        }
        else{
            return res.status(400).json({
                message: "Verification link already sent!"
            })
        }   
    }

=======
const sendVerificationMail = async (email, res) =>{

    //Currently local host url but is actual url when hosted
>>>>>>> 8d5bfd096c55756115e3a4acea7425c3eec7df21
    const currentUrl= config.get("CurrentURL");

    const uniqueString = uuidv4() + email;

    const mailOptions = {
        from: config.get("AdminEmail"),
        to: email,
        subject: "Verify your Email to join community application",
        html: `<p>Verify your email address to complete signup and login into your account.</p><p>This link
<<<<<<< HEAD
         <b>expires in 6 hours</b>.</p><p>Press <a href=${currentUrl + "auth/verifyemail/" + email + "/" + uniqueString}> 
=======
         <b>expires in 6 hours</b>.</p><p>Press <a href=${currentUrl + "user/verify/" + email + "/" + uniqueString}> 
>>>>>>> 8d5bfd096c55756115e3a4acea7425c3eec7df21
         here </a> to proceed. </p>`
    };

    try{
<<<<<<< HEAD
        const saltRounds = 10;
=======
        const saltRounds =10;
>>>>>>> 8d5bfd096c55756115e3a4acea7425c3eec7df21
        const hashedUniqueString = await bcrypt.hash(uniqueString, saltRounds);
        const newVerification = new UserVerification({
            email,
            uniqueString: hashedUniqueString,
            createdAt: Date.now(),
            expiresAt: Date.now() + 21600000,
        });
        await newVerification.save();
    }
    catch(err){
        console.log(err);
    }

    try{
        await transporter.sendMail(mailOptions);
        res.json({
            status: "PENDING",
            message: "Verification email sent..."
        })
    }
    catch(err){
        console.log(err);
        res.json({
            status: "FAILED",
            message: "Email verification failed",
        });
    }
     
}


<<<<<<< HEAD
//Controller to verify mail 
const emailVerificationController = async (req,res) => {
    let { email, uniqueString } = req.params
    //console.log(email, uniqueString)
    try{
        const result = await UserVerification.find({email})

        if(result.length==0){
            return res.status(404).json({"message": "Verification details not found!"})
        }

        const hashedUniqueString = result[0].uniqueString
        console.log(result)
        if(result.length > 0){
            //User verification record exists so we proceed
            //check if link expired
            const {expiresAt} = result[0];
            if(expiresAt < Date.now()){
                try{
                    await UserVerification.deleteOne({email});
                    res.status(400).json({"message": "Verification link expired!"})
                }
                catch(err){
                    let message = "An error occured while clearfing user verification record";
                    res.redirect(`/auth/verified/error=true&message=${message}`)
                }
            }
            else{
                //valid record exists so we validate the user string
                //First compare the hashed unique string
                try{
                    const matched = await bcrypt.compare(uniqueString, hashedUniqueString);
                    if(matched){
                        console.log("Email Verified")
                        await UserVerification.deleteOne({email});
                        console.log("Deleted user verification model")
                        res.sendFile(path.join(__dirname,"./../views/verified.html"));
                        //return res.status(200).json({message:"Email Verified"});
                    }
                    else{
                        let message = "Invalid verification details passed";
                        res.redirect(`/auth/verified/error=true&message=${message}`)
                    }
                }
                catch(err){
                    let message = "An error occured while comparing unique string";
                    res.redirect(`/auth/verified/error=true&message=${message}`)
=======
const emailVerificationController = async (req,res) => {
    let { email, uniqueString} = req.params;

    try{
        const result = UserVerification.find({email})
        if(result.length > 0){
            //User verification record exists so we proceed

            const {expiresAt} = result[0];

            //check if link expired
            if(expiresAt < Date.now()){
                try{
                    await UserVerification.deleteOne({email});
                }
                catch(err){
                    let message = "An error occured while clearing user verification record";
                    res.redirect(`/verified/error=true&message=${message}`)
>>>>>>> 8d5bfd096c55756115e3a4acea7425c3eec7df21
                }
            }
        }
        else{
            //User verification record doesnot exist
            let message = "Account record doesn't exist or has already been verified. Please sign up or log in.";
<<<<<<< HEAD
            res.redirect(`/auth/verified/error=true&message=${message}`)
=======
            res.redirect(`/verified/error=true&message=${message}`)
>>>>>>> 8d5bfd096c55756115e3a4acea7425c3eec7df21
        }
    }
    catch(err){
        console.log(err);
        let message = "An error occured while checking for existing user verification record";
<<<<<<< HEAD
        res.redirect(`/auth/verified/error=true&message=${message}`)
    }
}


//Controller to show html after verification
=======
        res.redirect(`/verified/error=true&message=${message}`)
    }
}

>>>>>>> 8d5bfd096c55756115e3a4acea7425c3eec7df21
const verifiedEmailController = async (req,res) =>{
    res.sendFile(path.join(__dirname,"../views/verified.html"));
}


<<<<<<< HEAD

=======
>>>>>>> 8d5bfd096c55756115e3a4acea7425c3eec7df21
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

<<<<<<< HEAD
                const token = generateToken({id:result._id})
=======
                const token = generateToken({email: result.email,  id:result._id})
>>>>>>> 8d5bfd096c55756115e3a4acea7425c3eec7df21

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
<<<<<<< HEAD
            const token = generateToken({id: result._id})
=======
            const token = generateToken({email: result.email, id: result._id})
>>>>>>> 8d5bfd096c55756115e3a4acea7425c3eec7df21

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
<<<<<<< HEAD
const signinController = async (req, res) => {
=======
const signinController = async(req, res) => {
>>>>>>> 8d5bfd096c55756115e3a4acea7425c3eec7df21
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

<<<<<<< HEAD
                const token = generateToken({id: existingUser._id})
=======
                const token = generateToken({email: existingUser.email, id: existingUser._id})
>>>>>>> 8d5bfd096c55756115e3a4acea7425c3eec7df21
                
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
    
<<<<<<< HEAD
            const token = generateToken({id: existingUser._id})
=======
            const token = generateToken({email: existingUser.email, id: existingUser._id})
>>>>>>> 8d5bfd096c55756115e3a4acea7425c3eec7df21
            
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
    changePasswordController,
    sendVerificationMail,
<<<<<<< HEAD
    verifiedEmailController,
    emailVerificationController
=======
    verifiedEmailController
>>>>>>> 8d5bfd096c55756115e3a4acea7425c3eec7df21
}