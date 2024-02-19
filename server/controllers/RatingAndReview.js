const RatingAndReview = require('../models/RatingAndReview');
const Course = require('../models/Course');
const { default: mongoose } = require('mongoose');

//createRating
exports.createRating = async (req, res) => {
    try {
        //get user id
        const userId = req.user.id;

        //fetch data from req ki body
        const {rating, review, courseId} = req.body;

        //check if user is enrolled or not
        const courseDetails = await Course.findOne({
                                            _id: courseId,
                                            studentsEnrolled: {$elemMatch: {$eq: userId}},                           
        });

        if(!courseDetails) {
            return res.status(404).json({
                success:false,
                message:"Student is not enrolled in the Course",
            });
        }
        
        //check if user already reviewed course
        const alreadyReviewed = await RatingAndReview.findOne({
                                                    user: userId,
                                                    course: courseId,
        });

        if(alreadyReviewed) {
            return res.status(403).json({
                success:false,
                message:"Course is already reviewed by the user",
            });
        }

        //create rating and review 
        const ratingReview = await RatingAndReview.create({
            rating,
            review,
            course: courseId,
            user: userId,
        });

        //update course with rating/review
        const updatedCourseDetails = await Course.findByIdAndUpdate(
                                {_id: courseId},
                                {
                                    $push: {
                                        ratingAndReviews: ratingReview._id,
                                    }
                                },
                                {new: true}); 
        console.log(updatedCourseDetails);

        //return response
        return res.status(200).json({
            success:true,
            message:"Rated and Reviewed successfully",
            ratingReview,
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"Cannot rate and review",
            error:error.message,
        });
    }
};


//averageRating
exports.getAverageRating = async (req, res) => {
    try {
        //get course id
        const courseId = req.body.courseId;

        //calculate avg rating
        const result = await RatingAndReview.aggregate([
            {
                $match: {
                    course: new mongoose.Types.ObjectId(courseId),
                },
            },
            {
                $group: {
                    _id: null,
                    averageRating : {$avg: "$rating"},
                }
            }
        ]);

        //return rating
        if(result.length > 0) {
            return res.status(200).json({
                success:true,
                averageRating: result[0].averageRating,
                
            });
        }

        //if no rating review exists
            return res.status(200).json({
                success: true,
                message: "Average rating is 0, no rating is given till now",
                averageRating: 0,
                
            });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"Cannot get average rating",
            error:error.message,
        });
    }
};


//getAllRating and reviews
exports.getAllRating = async (req, res) => {
    try {
        
        const allReviews = await RatingAndReview.find({})
                                                .sort({rating: "desc"})
                                                .populate({
                                                    path:"user",
                                                    select:"firstName lastName email image",
                                                })
                                                .populate({
                                                    path:"course",
                                                    select:"courseName",
                                                })
                                                .exec();

            return res.status(200).json({
                success:true,
                message: "All Reviews fetched successfully",
                data: allReviews,
                
            });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
};