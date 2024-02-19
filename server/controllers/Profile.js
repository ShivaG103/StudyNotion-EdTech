const Profile = require('../models/Profile');
const User = require('../models/User');
const Course = require('../models/Course');
const { uploadImageToCloudinary } = require('../utils/imageUploader');
const mongoose = require("mongoose");
const { convertSecondsToDuration } = require("../utils/secToDuration");
const CourseProgress = require("../models/CourseProgress");


exports.updateProfile = async (req, res) => {
    try {

        //get data
        const {firstName = "", lastName = "", dateOfBirth = "", about = "", contactNumber = "", gender = ""} = req.body;

        //get userID
        const id = req.user.id;

        // Find the profile by id
        const userDetails = await User.findById(id);
        const profile = await Profile.findById(userDetails.additionalDetails);

        const user = await User.findByIdAndUpdate(id, {
          firstName,
          lastName,
        })
        await user.save();

        //update profile 
        profile.dateOfBirth = dateOfBirth;
        profile.about = about;
        profile.contactNumber = contactNumber;
        profile.gender = gender;

        // Save the updated profile
        await profile.save();

        // Find the updated user details
        const updatedUserDetails = await User.findById(id)
        .populate("additionalDetails")
        .exec()

        // return response
        return res.json({
            success:true,
            message:"Profile Updated Successfully",
            updatedUserDetails,
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"Unable to Update Profile, please try again",
            error:error.message,
        });
    }
}


//delete account

exports.deleteAccount = async (req, res) => {
    try {

        //get id
        const id = req.user.id;

        //validation
        const user = await User.findById({_id: id});
        if(!user) {
            return res.status(404).json({
                success:false,
                message:"User not found",
            });
        }

        //delete profile
        await Profile.findByIdAndDelete({_id: new mongoose.Types.ObjectId(user.additionalDetails)});
        
        //TODO:-------unenroll user from all enrolled courses------------------------------------------
        for (const courseId of user.courses) {
            await Course.findByIdAndUpdate(
              courseId,
              { $pull: { studentsEnrolled: id } },
              { new: true }
            );
          }

        //--- using node-schedule librabry is can delete the user in few days 
        // node_schedule.scheduleJob(deletionDate, async function () { await User.findByIdAndDelete(userId);});

        //user delete
        await User.findByIdAndDelete({_id: id});

        // return response
        res.status(200).json({
            success:true,
            message:"User Deleted Successfully",
        })
        await CourseProgress.deleteMany({ userId: id })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success:false,
            message:"Unable to Delete User, please try again",
        });
    }
}



//get all users

exports.getAllUserDetails = async (req, res) => {
    try {

        //get id
        const id = req.user.id;

        //validation and get user details
        const userDetails = await User.findById(id).populate('additionalDetails').exec();

        console.log(userDetails);

        // return response
        res.status(200).json({
            success:true,
            message:"User Data fetched Successfully",
            data: userDetails,
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"Unable to get User Details, please try again",
            error:error.message,
        });
    }
};


exports.updateDisplayPicture = async (req, res) => {
    try {
      const displayPicture = req.files.displayPicture
      const userId = req.user.id
      const image = await uploadImageToCloudinary(
        displayPicture,
        process.env.FOLDER_NAME,
        1000,
        1000
      )
      console.log(image)
      const updatedProfile = await User.findByIdAndUpdate(
        { _id: userId },
        { image: image.secure_url },
        { new: true }
      )
      res.send({
        success: true,
        message: `Image Updated successfully`,
        data: updatedProfile,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
};
  
exports.getEnrolledCourses = async (req, res) => {
    try {
      const userId = req.user.id
      let userDetails = await User.findOne({
        _id: userId,
      })
        .populate({
          path: "courses",
          populate: {
            path: "courseContent",
            populate: {
              path: "subSection",
            },
          },
        })  
        .exec()

      userDetails = userDetails.toObject()
      var SubsectionLength = 0
      for (var i = 0; i < userDetails.courses.length; i++) {
        let totalDurationInSeconds = 0
        SubsectionLength = 0
        for (var j = 0; j < userDetails.courses[i].courseContent.length; j++) {
          totalDurationInSeconds += userDetails.courses[i].courseContent[
            j
          ].subSection.reduce((acc, curr) => acc + parseInt(curr.timeDuration), 0)
          userDetails.courses[i].totalDuration = convertSecondsToDuration(
            totalDurationInSeconds
          )
          SubsectionLength +=
            userDetails.courses[i].courseContent[j].subSection.length
        }
        let courseProgressCount = await CourseProgress.findOne({
          courseID: userDetails.courses[i]._id,
          userId: userId,
        })
        courseProgressCount = courseProgressCount?.completedVideos.length
        if (SubsectionLength === 0) {
          userDetails.courses[i].progressPercentage = 100
        } else {
          // To make it up to 2 decimal point
          const multiplier = Math.pow(10, 2)
          userDetails.courses[i].progressPercentage =
            Math.round(
              (courseProgressCount / SubsectionLength) * 100 * multiplier
            ) / multiplier
        }
      }


      if (!userDetails) {
        return res.status(400).json({
          success: false,
          message: `Could not find user with id: ${userDetails}`,
        })
      }
      return res.status(200).json({
        success: true,
        data: userDetails.courses,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
};


exports.instructorDashboard = async (req, res) => {
  try {
    const courseDetails = await Course.find({ instructor: req.user.id })

    const courseData = courseDetails.map((course) => {
      const totalStudentsEnrolled = course.studentsEnrolled.length
      const totalAmountGenerated = totalStudentsEnrolled * course.price

      // Create a new object with the additional fields
      const courseDataWithStats = {
        _id: course._id,
        courseName: course.courseName,
        courseDescription: course.courseDescription,
        // Include other course properties as needed
        totalStudentsEnrolled,
        totalAmountGenerated,
      }

      return courseDataWithStats
    })

    res.status(200).json({ courses: courseData })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server Error" })
  }
}