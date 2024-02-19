import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Banner from '../assets/Images/banner.mp4';
import Footer from '../components/common/Footer';
import CTAButton from '../components/core/HomePage/Button';
import CodeBlocks from '../components/core/HomePage/CodeBlocks';
import ExploreMore from '../components/core/HomePage/ExploreMore';
import HighlightText from '../components/core/HomePage/HighlightText';
import InstructorSection from '../components/core/HomePage/InstructorSection';
import LearningLanguageSection from '../components/core/HomePage/LearningLanguageSection';
import TimelineSection from '../components/core/HomePage/TimelineSection';
import ReviewSlider from '../components/common/ReviewSlider';

const Home = () => {
  return (
    <div>
        {/* Section 1 */}
        <div className='relative mx-auto flex flex-col w-11/12 items-center text-white justify-between max-w-maxContent'>

            <Link to={'/signup'}>

                <div className='group mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200 transition-all duration-200 hover:scale-95 w-fit shadow-[0px_1px_0px_0px] shadow-richblack-600'>
                    <div className='flex items-center gap-2 rounded-full px-5 py-[6px] transition-all duration-200 group-hover:bg-richblack-900'>
                        <p>Become an Instructor</p>
                        <FaArrowRight />
                    </div>
                </div>

            </Link>

            <div className='text-center text-4xl font-semibold mt-7'>
                Empower Your Future with 
                <HighlightText text={"Coding Skills"} />
            </div>

            <div className='mt-4 lg:w-[57rem] text-center text-lg font-medium text-richblack-300'>
            With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources including hands-on projects, quizzes, and personalized feedback from instructors. 
            </div>

            <div className='flex flex-row gap-6 mt-8'>
                <CTAButton active={true} linkto={'/signup'}>Learn More</CTAButton>
                <CTAButton active={false} linkto={'/login'}>Book a Demo</CTAButton>
            </div>
            
            <div className='mx-3 my-20 shadow-[20px_20px_0px_0px]'>
                <video muted loop autoPlay>
                    <source src={Banner} type='video/mp4' />
                </video>
            </div>

            {/* code section 1 */}

            <div>
                <CodeBlocks 
                    position={"lg:flex-row"}
                    heading={
                        <div className='text-4xl font-semibold'>
                            Unlock your
                            <HighlightText text={" coding potential "} />
                            with our online courses.
                        </div>
                    }
                    subheading={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."}
                    ctabtn1={
                        {
                            btnText: "Try it Yourself",
                            linkto: "/signup",
                            active: true,
                        }
                    }
                    ctabtn2={
                        {
                            btnText: "Learn More",
                            linkto: "/login",
                            active: false,
                        }
                    }
                    codeblock={`<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body>`}
                    codeColor={"text-[#E7BC5B]"}
                    backgroundGradient={`bg-gradient-to-br from-[#8A2BE2] via-[#FFA500] to-[#F8F8FF]`}
                    
                />
            </div>

            {/* code section 2 */}

            <div>
                <CodeBlocks 
                    position={"lg:flex-row-reverse"}
                    heading={
                        <div className='text-4xl font-semibold'>
                            Start
                            <HighlightText text={" coding in seconds "} />
                        </div>
                    }
                    subheading={"Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."}
                    ctabtn1={
                        {
                            btnText: "Continue Lesson",
                            linkto: "/login",
                            active: true,
                        }
                    }
                    ctabtn2={
                        {
                            btnText: "Learn More",
                            linkto: "/login",
                            active: false,
                        }
                    }
                    codeblock={`import React from "react";\n import CTAButton from "./Button";\nimport TypeAnimation from "react-type";\nimport { FaArrowRight } from "react-icons/fa";\n\nconst Home = () => {\nreturn (\n<div>Home</div>\n)\n}\nexport default Home;`}
                    codeColor={"text-[#1AB9FD]"}
                    backgroundGradient={`bg-gradient-to-br from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB]`}
                />
            </div>

            <ExploreMore />

        </div>


        {/* Section 2 */}
        <div className='bg-pure-greys-5 text-richblack-700'>
          
            <div className='homepage_bg h-[318px]'>

                <div className='w-11/12 max-w-maxContent flex flex-col justify-between items-center gap-5 mx-auto'>
                    <div className='h-[150px]'></div>
                    <div className='flex flex-row gap-7 text-white mt-10'>

                        <CTAButton active={true} linkto={'/signup'}>
                            <div className='flex items-center gap-3 font-semibold'>
                                Explore Full Catalog
                                <FiArrowRight />
                            </div>
                        </CTAButton>
                        <CTAButton active={false} linkto={'/signup'}>
                            <div className=' font-semibold'>Learn More</div>
                        </CTAButton>

                    </div>

                </div>


            </div>   


            <div className='mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-7'>

                <div className='flex gap-5 mb-10 mt-[6rem] justify-around'>
                    <div className='text-4xl font-semibold w-[45%]'>
                        Get the skills you need for a
                        <HighlightText text={" job that is in demand."} />
                    </div>

                    <div className='flex flex-col gap-10 w-[40%] items-start'>
                        <div className='text-[16px]'>The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.</div>
                        <CTAButton active={true} linkto={'/signup'}>
                            <div className='font-bold'>Learn More</div>
                        </CTAButton>
                    </div>
                </div>



                <TimelineSection />

                <LearningLanguageSection />

            </div>             


            
        </div>           

        {/* Section 3 */}
        <div className='w-11/12 mx-auto max-w-maxContent flex flex-col items-center justify-between gap-8 bg-richblack-900 text-white my-20'>

            <InstructorSection />

            <h2 className='text-center text-4xl font-semibold mt-8'>Reviews from other learners</h2>

            {/* Review slider here  */}
            <ReviewSlider />

        </div>


        {/* Footer */}
        <Footer />

    </div>
  )
}

export default Home;