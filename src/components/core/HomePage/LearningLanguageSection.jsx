import React from 'react'
import HighlightText from './HighlightText'
import know_your_progress from '../../../assets/Images/Know_your_progress.png'
import compare_with_others from '../../../assets/Images/Compare_with_others.png'
import plan_your_lessons from '../../../assets/Images/Plan_your_lessons.png'
import CTAButton from './Button';

const LearningLanguageSection = () => {
  return (
    <div className='mt-[8.125rem] mb-24'>
        <div className='flex flex-col gap-5 items-center'>

            <div className='text-4xl font-semibold text-center'>
                Your swiss knife for <HighlightText text={" learning any language"}/>
            </div>
            <div className='text-center text-richblack-600 mx-auto text-lg font-medium w-[70%]'>
                Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
            </div>

            <div className='lg:flex lg:flex-row flex flex-col items-center justify-center  mt-5'>
                <img src={know_your_progress} alt='KnowYourProgressImage' className='object-contain lg:-mr-32 lg:mb-12 -mb-12'/>
                <img src={compare_with_others} alt='CompareWithOthersImage' className='object-contain '/>
                <img src={plan_your_lessons} alt='PlanYourLessonsImage' className='object-contain lg:-ml-36 lg:mb-14 -mt-20'/>
            </div>

            <div className='w-fit'>
                <CTAButton active={true} linkto={'/signup'}>
                    <div className='font-bold'>Learn More</div>
                </CTAButton>
            </div>

        </div>
    </div>
  )
}

export default LearningLanguageSection