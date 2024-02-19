const User = require('../models/User');
const mailSender = require('../utils/mailSender');
const bcrypt = require('bcrypt');
const crypto = require('crypto');


//resetPasswordToken
exports.resetPasswordToken = async (req, res) => {

    try {
        
        //get email from req body
        const email = req.body.email;
        
        //check User fro this email, email validation
        const user = await User.findOne({email: email});
        if(!user) {
            return res.json({
                success:false,
                message:`This Email: ${email} is not Registered With Us Enter a Valid Email `,
            });
        }

        //generate token
		const token = crypto.randomBytes(20).toString("hex");

        //update user by adding token and expiration time
        const updatedDetails = await User.findOneAndUpdate({email: email},
                                                                {
                                                                    token: token,
                                                                    resetPasswordExpires: Date.now() + 3600000,
                                                                },
                                                                {new:true});

        console.log("DETAILS", updatedDetails);
                                                                
        //create url
        const url = `http://localhost:3000/update-password/${token}`;

        //send mail containing url
        await mailSender(email, "Password Reset", `Your Link for email verification is ${url}. Please click this url to reset your password.`);

        //return response
        res.json({
            success:true,
            message:"Email sent Successfully, please check Email to Continue Further",
        });

    } catch (error) {
		return res.json({
			error: error.message,
			success: false,
			message: `Some Error in Sending the Reset Message`,
		});
	}
}


//resetPassword
exports.resetPassword = async (req, res) => {

    try {
        
        //data fetch
        const {password, confirmPassword, token} = req.body;

        //validation
        if(password !== confirmPassword) {
            return res.json({
                success:false,
                message:"Password not matching",
            });
        }

        //get userDetails from db using token
        const userDetails = await User.findOne({token: token});
        //if no entry - invalid token
        if(!userDetails) {
            return res.json({
                success:false,
                message:"Token is Invalid",
            });
        }   

        //token time check
        if (!(userDetails.resetPasswordExpires > Date.now())) {
			return res.status(403).json({
				success: false,
				message: `Token is Expired, Please Regenerate Your Token`,
			});
		}

        //hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        //password update in db
        await User.findOneAndUpdate({token: token},
                                    {password: hashedPassword},
                                    {new:true});

        //return response
        return res.status(200).json({
            success:true,
            message:"Password reset successfull",
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            error: error.message,
            success:false,
			message: `Some Error in Updating the Password`,
        });
    }
};

