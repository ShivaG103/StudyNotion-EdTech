import React from 'react';
import {FiArrowRight} from 'react-icons/fi';
import CTAButton from './Button';
import { TypeAnimation } from 'react-type-animation';

const CodeBlocks = ({position, heading, subheading, ctabtn1, ctabtn2, codeblock, backgroundGradient, codeColor}) => {
  return (
    <div className={`flex ${position} flex-col my-20 justify-between lg:gap-10 gap-10`}>
        
        {/* section 1 */}
        <div className='lg:w-[50%] w-[100%] flex flex-col gap-8'>
            {heading}
            <div className='text-richblack-300 font-bold text-base w-[85%] -mt-3'>
            {subheading}
            </div>
            <div className='flex gap-7 mt-7'>
                <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>
                    <div className='flex gap-2 items-center'>
                        {ctabtn1.btnText}
                        <FiArrowRight />
                    </div>
                </CTAButton>
                <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>
                        {ctabtn2.btnText}
                </CTAButton>
            </div>
        </div>

        {/* section 2 */}
        <div className='lg:w-[40%] w-[200%]  relative flex  text-[10px] sm:text-sm leading-[18px] sm:leading-6'>
                <div className={`absolute lg:w-[73%] w-[50%]  h-[80%] ${backgroundGradient} rounded-[50%] opacity-[20%] blur-2xl shadow-2xl shadow-white`}>
                </div>

                <div className='h-fit flex w-[50%] py-4 lg:w-[31.25rem] z-20 bg-richblack-500 bg-opacity-10'>
                    <div className='text-center flex flex-col w-[10%] select-none text-richblack-400 font-inter font-bold'>
                        <p>1</p>
                        <p>2</p>
                        <p>3</p>
                        <p>4</p>
                        <p>5</p>
                        <p>6</p>
                        <p>7</p>
                        <p>8</p>
                        <p>9</p>
                        <p>10</p>
                        <p>11</p>
                    </div>
                    <div className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${codeColor} pr-1`}>
                        <TypeAnimation 
                            sequence={[codeblock, 2000, ""]}
                            repeat={Infinity}
                            cursor={true}
                            omitDeletionAnimation={true}
                            style={
                                {
                                    whiteSpace:"pre-line",
                                    display: "block",
                                }
                            }
                        />
                    </div>
                </div>
        </div>

    </div>
  )
}

export default CodeBlocks;