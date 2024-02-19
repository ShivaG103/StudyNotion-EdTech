import React from 'react'
import { Link } from 'react-router-dom'

const Button = ({children, active, linkto}) => {
  return (
    <Link to={linkto}>
        <div className={`text-center text-[13px] sm:text-[16px] px-6 py-3 rounded-md font-bold 
        ${active ? "bg-yellow-50 text-black shadow-[2px_2px_0px_0px_rgb(255,235,135)]" : "bg-richblack-800 shadow-[2px_2px_0px_0px_rgb(64,70,80)]"}
        hover:shadow-none hover:scale-95 transition-all duration-200
        `}>
            {children}
        </div>
    </Link>
  )
}


export default Button