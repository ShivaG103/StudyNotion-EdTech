import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { AiOutlineMenu, AiOutlineShoppingCart } from 'react-icons/ai';
import { BsChevronDown } from "react-icons/bs";
import { useSelector } from 'react-redux';
import { Link, matchPath, useLocation } from 'react-router-dom';
import logo from '../../assets/Logo/Logo-Full-Light.png';
import { NavbarLinks } from '../../data/navbar-links';
import { apiConnector } from "../../services/apiconnector";
import { categories } from "../../services/apis";
import { ACCOUNT_TYPE } from "../../utils/constants";
import ProfileDropdown from "../core/Auth/ProfileDropDown";
import useOnClickOutside from './../../hooks/useOnClickOutside';
import NavbarMobile from './NavbarMobile';


const Navbar = () => {

    const {token} = useSelector( (state) => state.auth);
    const {user} = useSelector( (state) => state.profile);
    const {totalItems} = useSelector( (state) => state.cart);
    const location = useLocation();

    const [subLinks, setSubLinks] = useState([]);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        ;(async () => {
            setLoading(true)
            try {
              const res = await apiConnector("GET", categories.CATEGORIES_API)
              setSubLinks(res.data.data)
            } catch (error) {
              console.log("Could not fetch Categories.", error)
            }
            setLoading(false)
          })()
    }, [])

    const matchRoute = (route) => {
        return matchPath({path:route}, location.pathname);
    }

    //Mobile navbar
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef(null);
    useOnClickOutside(ref, () => setIsOpen(false));

  return (
    <div className={`flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700 ${location.pathname !== "/" ? "bg-richblack-800" : "bg-richblack-900" } transition-all duration-200 ${location.pathname.split("/").includes("dashboard") ||
        location.pathname.split("/").includes("view-course")
          ? "" : "fixed top-0 w-screen z-50"}`}>
        <div className='flex w-11/12 max-w-maxContent items-center justify-between '>
            {/* logo image  */}
            <Link to={'/'}>
                <img src={logo} width={160} height={32} alt='Logo' loading="lazy" />
            </Link>

            {/* Nav Links  */}
            <nav className="hidden md:block">
                <ul className='flex gap-x-6 text-richblack-25'>
                    {
                        NavbarLinks.map((link, index) => (
                             <li key={index}>
                                {
                                    link.title === "Catalog" ? 
                                    (
                                        <div className={`group relative flex cursor-pointer items-center gap-1 ${matchRoute("/catalog/catalogName") ? "text-yellow-25" : "text-richblack-25" }`}>
                                            <p>{link.title}</p>
                                            <BsChevronDown />

                                            <div className={`z-[1000] invisible absolute left-[50%] translate-x-[-50%] translate-y-[3em] group-hover:translate-y-[1.65em] top-[50%] grid grid-flow-col grid-rows-3 rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-300 group-hover:visible group-hover:opacity-100 lg:w-max w-max text-center`}>

                                                <div className='absolute left-[50%] -z-10 translate-y-[-40%] translate-x-[80%] top-0 h-6 w-6 rotate-45 select-none rounded bg-richblack-5'></div>

                                                {loading ? (
                                                    <p className="text-center">Loading...</p>
                                                    ) : subLinks.length ? (
                                                    <>
                                                        {subLinks?.filter(
                                                            (subLink) => subLink?.courses?.length > 0
                                                        )?.map((subLink, i) => (
                                                            <Link
                                                            to={`/catalog/${subLink.name.split(/[\/ ]/).join("-").toLowerCase()}`}
                                                            className="rounded-lg bg-transparent p-4  hover:bg-richblack-50"
                                                            key={i} >
                                                                <p>{subLink.name}</p>
                                                            </Link>
                                                        ))}
                                                    </>
                                                    ) : (
                                                    <p className="text-center">No Courses Found</p>
                                                    )}
                                            </div>
                                        </div>
                                    ) : 
                                    (
                                        <Link to={link?.path}>
                                            <p className={`${matchRoute(link?.path) ? "text-yellow-25" : "text-richblack-25" }`}>
                                                {link?.title}
                                            </p>
                                        </Link> 
                                    )}
                            </li>
                        ))}
                </ul>
            </nav>

            {/* Login/SignUp/Dashboard */}
            <div className='hidden md:flex gap-x-4 items-center'>
                {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
                    <Link to='/dashboard/cart' className='relative'>
                        <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
                        {totalItems > 0 && (
                                <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">{totalItems}</span>
                        )}
                    </Link>
                )}

                {token === null && (
                    <Link to='/login'>
                        <button className='border border-richblack-700 bg-richblack-800 px-3 py-2 text-richblack-100 rounded-lg '>Log in</button>
                    </Link>
                    )
                }
                {token === null && (
                    <Link to='/signup'>
                        <button className='border border-richblack-700 bg-richblack-800 px-3 py-2 text-richblack-100 rounded-lg'>Sign Up</button>
                    </Link>
                    )
                }
                {
                    token != null && <ProfileDropdown /> 
                }
            </div>
            <button className="mr-4 md:hidden">
                {/* <AiOutlineMenu fontSize={24} fill="#AFB2BF" /> */}
                <NavbarMobile
                    loading={loading}
                    subLinks={subLinks}
                    matchRoute={matchRoute}
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                />
            </button>
        </div>
    </div>
  )
}

export default Navbar;