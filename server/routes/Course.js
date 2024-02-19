const express = require("express");
const router = express.Router();

const {createCourse, getAllCourses, getCourseDetails, getFullCourseDetails, editCourse, getInstructorCourses, deleteCourse} = require('../controllers/Course');

const {categoryPageDetails, createCategory, showAllCategories} = require('../controllers/Category');

const {createSection, deleteSection, updateSection} = require('../controllers/Section');

const {createSubSection, deleteSubSection, updateSubSection} = require('../controllers/SubSection');

const {createRating, getAverageRating, getAllRating} = require('../controllers/RatingAndReview');

const {auth, isAdmin, isInstructor, isStudent} = require('../middlewares/auth');

const {updateCourseProgress} = require('../controllers/courseProgress');


// course routes

// Courses can Only be Created by Instructors
router.post("/createCourse", auth, isInstructor, createCourse);
//Add a Section to a Course
router.post("/addSection", auth, isInstructor, createSection);
// Update a Section
router.post("/updateSection", auth, isInstructor, updateSection);
// Delete a Section
router.post("/deleteSection", auth, isInstructor, deleteSection);
// Edit Sub Section
router.post("/updateSubSection", auth, isInstructor, updateSubSection);
// Delete Sub Section
router.post("/deleteSubSection", auth, isInstructor, deleteSubSection);
// Add a Sub Section to a Section
router.post("/addSubSection", auth, isInstructor, createSubSection);
// Get all Registered Courses
router.get("/getAllCourses", getAllCourses);
// Get Details for a Specific Courses
router.post("/getCourseDetails", getCourseDetails);
// Get Details for a Specific Courses
router.post("/getFullCourseDetails", auth, getFullCourseDetails)
// Edit Course routes
router.post("/editCourse", auth, isInstructor, editCourse)
// Get all Courses Under a Specific Instructor
router.get("/getInstructorCourses", auth, isInstructor, getInstructorCourses)
// Delete a Course
router.delete("/deleteCourse", deleteCourse)

router.post("/updateCourseProgress", auth, isStudent, updateCourseProgress);




//category routes (Only by Admin)

router.post("/createCategory", auth, isAdmin, createCategory);
router.get("/showAllCategories", showAllCategories);
router.post("/getCategoryPageDetails", categoryPageDetails);

// rating and review

router.post("/createRating", auth, isStudent, createRating);
router.get("/getAverageRating", getAverageRating);
router.get("/getReviews", getAllRating);

module.exports = router;