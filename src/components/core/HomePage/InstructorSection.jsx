import React from 'react'
import Instructor from '../../../assets/Images/Instructor.png';
import HighlightText from './HighlightText';
import CTAButton from './Button';
import { FiArrowRight } from 'react-icons/fi';

const InstructorSection = () => {
  return (
    <div className='mt-16'>
        <div className='lg:flex lg:flex-row gap-20 flex flex-col items-center'>

            <div className='lg:w-[50%]'>
                <img src={Instructor} alt='InstructorImage' className='shadow-[-20px_-20px_0px_0px]' />
            </div>

            <div className='lg:w-[50%] flex flex-col gap-10'>
                <div className='text-4xl font-semibold w-[50%]'>Become an<HighlightText text={" instructor"}/></div>

                <p className='font-medium text-base w-[80%] text-richblack-300'>Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.</p>

                <div className='w-fit'>
                    <CTAButton active={true} linkto={'/signup'} >
                        <div className='flex gap-2 items-center'>
                            Start Teaching Today
                            <FiArrowRight />
                        </div>
                    </CTAButton>
                </div>

            </div>

        </div>
    </div>
  )
}

export default InstructorSection;