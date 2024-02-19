import React from 'react';
import Logo1 from '../../../assets/TimeLineLogo/Logo1.svg'
import Logo2 from '../../../assets/TimeLineLogo/Logo2.svg'
import Logo3 from '../../../assets/TimeLineLogo/Logo3.svg'
import Logo4 from '../../../assets/TimeLineLogo/Logo4.svg'
import timelineImage from '../../../assets/Images/TimelineImage.png'

const timeline = [
    {
        id:1,
        Logo: Logo1,
        Heading: "Leadership",
        Description: "Fully committed to the success company",
    },
    {
        id:2,
        Logo: Logo2,
        Heading: "Responsibility",
        Description: "Students will always be our top priority",
    },
    {
        id:3,
        Logo: Logo3,
        Heading: "Flexibility",
        Description: "The ability to switch is an important skills",
    },
    {
        id:4,
        Logo: Logo4,
        Heading: "Solve the problem",
        Description: "Code your way to a solution",
    },
];

const TimelineSection = () => {
  return (
    <div>
        <div className='lg:flex lg:flex-row flex-col  gap-15 items-center'>
            {/* left box */}
            <div className='lg:w-[45%] flex flex-col gap-5 relative'>
                {
                    timeline.map( (element) => {
                        return (
                            <div className='flex flex-row gap-x-6 mb-9 relative' key={element.id}>

                                <div className='w-14 h-14 bg-white flex items-center justify-center rounded-[50%] shadow-[0px_0px_62px_0px_rgb(0,0,0,0.12)]'>
                                    <img src={element.Logo} alt='logoSvg'/>
                                </div>

                                <div className='flex flex-col '>
                                    <h2 className='font-semibold text-[18px]'>{element.Heading}</h2>
                                    <p className='text-base'>{element.Description}</p>
                                </div>
                                {element.id !== timeline.length && (<div className='border-dashed border-richblack-100 border w-0 h-8 absolute translate-x-7 translate-y-[4.2rem]'></div>)}

                            </div>
                        )
                    })
                }
                
            </div>

            {/* right box */}
            <div className='relative'>
                {/* <div className='absolute bg-gradient-to-br from-[#1FA2FF] via-[#12D8FA] to-[#0052D4] blur-3xl top-[30%] h-[50%] w-full rounded-[50%] z-[1]'></div> */}
                <img src={timelineImage} alt='timelineImage' className='object-cover h-fit shadow-[20px_20px_0px_0px] shadow-white'/>

                <div className='absolute bg-caribbeangreen-700 flex w-fit text-white uppercase py-7 px-5 left-[50%] translate-x-[-50%] translate-y-[-50%]'>
                    <div className='flex gap-5 items-center border-r border-caribbeangreen-300 px-7'>
                        <p className='text-3xl font-bold'>10</p>
                        <p className='text-caribbeangreen-300 text-sm'>Years of Experiences</p>
                    </div>

                    <div className='flex gap-5 text-center px-7 items-center'>
                        <p className='text-3xl font-bold'>250</p>
                        <p className='text-caribbeangreen-300 text-sm'>Types of courses</p>
                    </div>
                </div>
            </div>

        </div>

    </div>
  )
}

export default TimelineSection;