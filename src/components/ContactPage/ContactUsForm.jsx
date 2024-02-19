import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import CountryCode from '../../data/countrycode.json';
import { apiConnector } from '../../services/apiconnector';
import { contactusEndpoint } from '../../services/apis';

const ContactUsForm = () => {

    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors, isSubmitSuccessful}
        } = useForm();

    const submitContactForm = async(data) => {
        // console.log("Logging data: ", data);
        try {
            setLoading(true);
            const res = await apiConnector("POST", contactusEndpoint.CONTACT_US_API, data);
            // const response = {status: "OK"};
            // console.log("logging respone: ", response);
            setLoading(false);
        } catch (error) {
            console.log("Error: ", error.message);
            setLoading(false);
        }
    }

    useEffect( () => {
        if(isSubmitSuccessful) {
            reset({
                email: "",
                firstname: "",
                lastname: "",
                message: "",
                phoneNo: "",
            })
        }
    },[reset, isSubmitSuccessful]);

  return (
    <form onSubmit={handleSubmit(submitContactForm)} className="flex flex-col gap-7">

        <div className='flex flex-col gap-5'>
            <div className='flex flex-col lg:flex-row gap-5'>
                {/* firstname   */}
                <div className='flex flex-col gap-2 w-full'>
                    <label htmlFor='firstname' className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">First Name</label>
                    <input type='text' name='firstname' id='firstname' placeholder='Enter First Name' className="form-style" 
                    {...register("firstname", {required:true})}
                    />
                    {
                        errors.firstname && (
                            <span className="-mt-1 text-[12px] text-yellow-100">Please Enter your First Name</span>
                        )
                    }
                </div>

                {/* lastname  */}
                <div className='flex flex-col gap-2 w-full'>
                    <label htmlFor='lastname' className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">Last Name</label>
                    <input type='text' name='lastname' id='lastname' placeholder='Enter Last Name' className="form-style" 
                        {...register("lastname")}
                    />
                </div> 
            </div>

            {/* email  */}
            <div className='flex flex-col gap-2'>
                <label htmlFor='lastname' className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">Email Address</label>
                <input type='email' name='email' id='email' placeholder='Enter Email Address' className="form-style"
                    {...register("email", {required:true})}
                />
                {
                    errors.email && (
                        <span className="-mt-1 text-[12px] text-yellow-100">Please Enter your Email Address</span>
                    )
                }
            </div>

            {/* phone no  */}
            <div className='flex flex-col gap-2'>
                <label htmlFor='phonenumber' className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">Phone Number</label>

                <div className='flex gap-5'>
                    {/* dropdown  */}
                        <select name='dropdown' id='dropdown' {...register('countrycode', {required:true})} className="form-style w-[81px]">
                            {
                                CountryCode.map( (element, index) => {
                                    return (
                                        <option key={index} value={element.code} >
                                            {element.code +" - " + element.country }
                                        </option>
                                    )
                                })
                            }
                        </select>

                        <input type='number' name='phonenumber' id='phonenumber' placeholder='12345 67890' {...register('phoneNo', 
                        {
                            required:{value:true, message:"Please Enter Phone Number"},
                            maxLength:{value:10, message: "Invalid Phone Number"},
                            minLength:{value:8, message:"Invalid Phone Number"}
                        })}
                        className="form-style w-[calc(100%-90px)]"
                        />
                </div>
                {
                    errors.phoneNo && (
                        <span className="-mt-1 text-[12px] text-yellow-100">{errors.phoneNo.message}</span>
                    )
                }
            </div>

            {/* message box  */}
            <div className='flex flex-col'>
                <label htmlFor='message' className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">Message</label>
                <textarea name='message' id='message' placeholder='Enter your message' cols='30' rows='4' className='form-style'
                    {...register("message", {required:true})}
                />
                {
                    errors.message && (
                        <span className="mt-1 text-[12px] text-yellow-100">Please Enter your message</span>
                    )
                }
            </div>

            <button disabled={loading} type='submit' className={`px-6 py-3 rounded-lg font-semibold bg-yellow-50 text-black w-full
            ${
                !loading &&
                "transition-all duration-200 hover:scale-95 hover:shadow-none"
                }  disabled:bg-richblack-500 sm:text-[16px] 
            `}>
                    Send Message
            </button>
        </div>

    </form>
  )
}

export default ContactUsForm;