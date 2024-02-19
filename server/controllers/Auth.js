const User = require('../models/User');
const OTP = require('../models/OTP');
const Profile = require('../models/Profile');
const otpGenerator = require('otp-generator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mailSender = require('../utils/mailSender');
const { passwordUpdated } = require('../mail/templates/passwordUpdate');
require('dotenv').config();

//signup controller for registering users
exports.signup = async (req, res) => {
    
    try {
        
        // data fetch from req ki body
        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            accountType,
            contactNumber,
            otp
        } = req.body;

        //validate data
        if(!firstName || !lastName || !email || !password || !confirmPassword || !otp) {
            return res.status(403).json({
                success:false,
                message:"All fields are required",
            });
        }

        //2 password ko match karo
        if(password !== confirmPassword) {
            return res.status(400).json({
                success:false,
                message:"Password and Confirm Password value does not match, please try again",
            });
        }

        //check user already exists or not
        const existingUser = await User.findOne({email});
        if(existingUser) {
            return res.status(400).json({
                success:false,
                message:"User already exists. Please sign in to continue.",
            });
        }

        //find most recent otp for user
        const response = await OTP.find({email}).sort({createdAt:-1}).limit(1);
        console.log(response);

        //validate otp
        if(response.length == 0) {
            //otp nahi mila
            return res.status(400).json({
                success:false,
                message:"The OTP is not Valid",
            });
        } else if(otp !== response[0].otp) {
            //invalid  oTP
            return res.status(400).json({
                success:false,
                message:"The OTP is not valid",
            });
        }

        //hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the user
		let approved = "";
		approved === "Instructor" ? (approved = false) : (approved = true);

        //entry create in DB
        const profileDetails = await Profile.create({
            gender:null,
            dateOfBirth:null,
            about:null,
            contactNumber:null,
        });

        const user = await User.create({
            firstName,
            lastName,
            email,
            contactNumber,
            password:hashedPassword,
            accountType: accountType,
            approved: approved,
            additionalDetails:profileDetails._id,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
        });

        //return res
        return res.status(200).json({
            success:true,
            user,
            message:"User registered Successfully",
        });

    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success:false,
            message:"User cannot be registered, please try again",
        });
    }
}


//login controller for authenticating users
exports.login = async (req, res) => {
    
    try {
        
        //get data from req body
        const {email, password} = req.body;
    
        //validate data
        if(!email || !password) {
			// Return 400 Bad Request status code with error message
			return res.status(400).json({
                success:false,
                message:"Please fill up all the Required Fields",
            });
        }
        //user check exists or not
        const user = await User.findOne({email}).populate('additionalDetails');
        if(!user) {
            return res.status(401).json({
                success:false,
                message:"User is not Registered with Us Please SignUp to Continue",
            });
        }
        //generate jwt, after password matching
        if(await bcrypt.compare(password, user.password)) {
            const token = jwt.sign(
				{ email: user.email, id: user._id, accountType: user.accountType },
				process.env.JWT_SECRET,
				{
					expiresIn: "72h",
				}
			);
            //yaha user ko to object me karna agar kuch error aaya toh-------------------------------------
            user.token = token;
            user.password = undefined;

            //create cookie and send response
            const options = {
				expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly:true,
            };

            res.cookie('token', token, options).status(200).json({
                success:true,
                token,
                user,
                message:"Logged in Successfully",
            });
        }
        else {
            return res.status(401).json({
                success:false,
                message:"Password is incorrect",
            });
        }
        

    } catch (error) {
        console.error(error)
        // Return 500 Internal Server Error status code with error message
        return res.status(500).json({
            success:false,
            message:"Login Failure, please try again",
        });
    }
};

//sendOTP fro Email verification
exports.sendotp = async (req, res) => {

    try {
     
         //fetch email from req ki body
         const {email} = req.body;
 
         //check if user already exists
         const checkUserPresent = await User.findOne({email});
 
         //if user already exist, then return a response
         if(checkUserPresent) {
             return res.status(401).json({
                 success:false,
                 message:"User already registered",
             });
         }
 
         //generate otp
         var otp = otpGenerator.generate(6, {
             upperCaseAlphabets:false,
             lowerCaseAlphabets:false,
             specialChars:false,
         });
 
         //check unique otp or not
         const result = await OTP.findOne({otp: otp});
         console.log("Result is Generate OTP Func", result);
         console.log("OTP", otp);
         console.log("Result", result);
         while(result) {
             otp = otpGenerator.generate(6, {
                 upperCaseAlphabets:false,
             });
             result = await OTP.findOne({otp: otp});
         }
 
         const otpPayload = {email, otp};
 
         //create an entry for otp
         const otpBody = await OTP.create(otpPayload);
         console.log("OTP Body", otpBody);
 
         //return response successful
         res.status(200).json({
             success:true,
             message:"OTP Sent Successfully",
             otp,
         });
 
    } catch (error) {
         console.log(error);
         return res.status(500).json({
             success:false,
             message:error.message,
         });
    }
 };



//TODO: ---------------------------pending------------------------------------------------------------------------------
//controller for changing Password
exports.changePassword = async (req, res) => {
    
    try {
        
        //get data from req.user
        const userDetails = await User.findById(req.user.id);

        //get oldPassowrd, newPassword, confirmNewPassword
        const {oldPassword, newPassword, confirmNewPassword} = req.body;

        //validate data
        const isPasswordMatch = await bcrypt.compare(oldPassword, userDetails.password);
        if(!isPasswordMatch) {
            return res.status(401).json({
                success: false,
                message: "The password is incorrect" })
        }

        // Match new password and confirm new password
		if (newPassword !== confirmNewPassword) {
			// If new password and confirm new password do not match, return a 400 (Bad Request) error
			return res.status(400).json({
				success: false,
				message: "The password and confirm password does not match",
			});
		}

        //update pass in database
        const encryptedPassword = await bcrypt.hash(newPassword, 10);
        const updatedUserDetails = await User.findByIdAndUpdate(req.user.id, {password:encryptedPassword}, {new: true});

        //send mail - password updated
        try {
            const emailResponse = await mailSender(updatedUserDetails.email,
                                                // "Password for your account has been updated",
                                                passwordUpdated(
                                                    updatedUserDetails.email,
                                                    `Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
                                                ));
            
            console.log("Email sent successfully:", emailResponse.response);

        } catch (error) {
            // If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
            console.error("Error occurred while sending email:", error)
            return res.status(500).json({
                success: false,
                message: "Error occurred while sending email",
                error: error.message,
            });
        }

        //return response
        return res.status(200).json({
            success: true,
            message: "Password updated successfully",
        });

    } catch (error) {
        console.error("Error occurred while updating password:", error)
        return res.status(500).json({
            success: false,
            message: "Error occurred while updating password",
            error: error.message,
        });
    }
};