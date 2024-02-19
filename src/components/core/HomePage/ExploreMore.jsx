import React, { useState } from 'react'
import { HomePageExplore } from './../../../data/homepage-explore';
import HighlightText from './HighlightText';
import CourseCard from './CourseCard';

const tabsName = [
    "Free",
    "New to coding",
    "Most popular",
    "Skills paths",
    "Career paths",
];

const ExploreMore = () => {

    const [currentTab, setCurrentTab] = useState(tabsName[0]);
    const [courses, setCourses] = useState(HomePageExplore[0].courses);
    const [currentCard, setCurrentCard] = useState(HomePageExplore[0].courses[0].heading);

    const setMyCards = (value) => {
        setCurrentTab(value);
        const result = HomePageExplore.filter((course) => course.tag === value);
        setCourses(result[0].courses);
        setCurrentCard(result[0].courses[0].heading);
    }

  return (
    <div>

        <div className='text-4xl font-semibold text-center my-5'>
            Unlock the <HighlightText text={" Power of Code"}/>
        </div>

        <p className='text-center text-richblack-300 text-lg font-semibold mt-1 mb-10'>Learn to Build Anything You Can Imagine</p>

        {/* tabs */}
        <div className='hidden lg:flex gap-5 mt-5  mx-auto w-max bg-richblack-800 text-richblack-200 p-1 rounded-full font-medium drop-shadow-[0_1.5px_rgba(255,255,255,0.25)]'>
            {
                tabsName.map((element, index) => {
                    return (
                        <div className={`text-base flex items-center gap-2
                                        ${currentTab === element ? "bg-richblack-900 text-richblack-5 font-medium" : "text-richblack-200"} rounded-full transition-all duration-500 cursor-pointer hover:bg-richblack-900 hover:text-richblack-5 px-7 py-2`} key={index} onClick={() => setMyCards(element)}>
                            {element}
                        </div>
                    )
                })
            }
        </div>

        {/* cards  */}
        <div className='lg:h-[12.5rem] hidden lg:block'> </div>

        {/* course card ka div  */}
        <div className='lg:absolute flex gap-10 lg:justify-between justify-center lg:gap-0 flex-wrap lg:bottom-[0] lg:left-[50%] lg:translate-x-[-50%] lg:translate-y-[50%] text-black lg:mb-0 mb-7 lg:px-0 px-3 w-full'>
            {
                courses.map((element, index) => {
                    return (
                        <CourseCard key={index} cardData={element} currentCard={currentCard} setCurrentCard={setCurrentCard}/>
                    );
                })
            }
        </div>
    </div>
  );
};

export default ExploreMore