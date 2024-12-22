"use client";
import Image from "next/image";
import { signIn } from "next-auth/react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { usePathname  } from 'next/navigation'
import {  useContext, useState } from "react";
import VerfiyEmail from "../verfiyemail/verfiymail";
import SetNewPassword from "../setnewpassword/setNewPassword";
import { ForgetPasswordContext } from "@/context/forgetPasswordContext";

export default function ForgetPasswordForm() {

  const pathname = usePathname();
  const [errorMessage , setErrorMessage]  = useState('');
  let {
    forgetFormIsShown,
    setForgetFormIShown,
    verfiyForm,
    setVerfiyForm,
    PasswordForm,
    SetPasswordForm,
  } = useContext(ForgetPasswordContext)
  interface ForgetpasswordForm  {
    email : string, 
  }

  
  const handleSubmit = async (formValues: ForgetpasswordForm) => {
   
    try{
      const result = await fetch(`https://exam.elevateegy.com/api/v1/auth/forgotPassword`,{
        method : 'POST',
        headers : {
            "Content-Type": "application/json",
          },
        body:JSON.stringify(formValues)
    });
    const response =await result.json();
        if(response?.message === 'success'){
            console.log('sent');
            setForgetFormIShown(false);
            setVerfiyForm(true);
            SetPasswordForm(false);
            
        }
        else{
            setErrorMessage(response?.message)
        }
    }
    catch(error){
        console.log('error form forget', error)
    }
  };
  const validationSchema = Yup.object().shape({
    email : Yup.string().email('Email is invalid').required('Email  is required'), 
  })
  let formik = useFormik({
    initialValues : {
      email :'',
    }, 
    validationSchema : validationSchema ,

    onSubmit : handleSubmit
  })
 
  return (<>
  {forgetFormIsShown && <div className=" flex flex-col gap-8 justify-center items-center h-full ">
    <form onSubmit={formik.handleSubmit} className=" w-[50%]  flex flex-col gap-6  ">
      <p className="font-semibold text-lg">Froget your password?</p>

      <input
        type="email"
        className="w-full shadow-lg border-2 p-2 rounded-lg focus-visible:out"
        placeholder="email"
        
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        name="email"
      />
        {formik.errors.email && formik.values.email ? <div className="self-start px-2 text-red-500 "> <p>{formik.errors.email}</p></div> : null}

      
     
   
      <p className="text-sm text-end text-[#4461F2]  tracking-widest">
      Recover Password ?
      </p>
      <button
        type="submit"
        className="bg-[#4461F2] text-white font-light text-sm w-full p-3 rounded-2xl"
      >
        Sign In
      </button>
    </form>
    <div className=" flex gap-3 items-center">
      <div className="divider h-[1px] bg-[#E7E7E7] w-28"></div>
      <p> or Continue with</p>
      <div className="divider  h-[1px] bg-[#E7E7E7] w-28"></div>
    </div>
    <div className="social-login flex mb-7 gap-4">
      <div className="w-[45px] h-[45px] login-item flex justify-center hover:shadow-lg items-center border p-2 shadow-md rounded-lg cursor-pointer">
        <Image width={29} height={29} alt="facebook" src={"/Vector.png"} />
      </div>
      <div         
      onClick={()=> signIn('google'  , {callbackUrl : pathname === "/login" ? "/" : pathname})}
       className="w-[45px] h-[45px] login-item flex justify-center hover:shadow-lg items-center border p-2 shadow-md rounded-lg cursor-pointer">
        <Image width={29} height={29} alt="google logo" src={"/Logo Google.png"} />
      </div>
      <div 
        onClick={()=> signIn('t witter'  , {callbackUrl : pathname === "/login" ? "/" : pathname})}      className="w-[45px] h-[45px] login-item flex justify-center hover:shadow-lg items-center border p-2 shadow-md rounded-lg cursor-pointer">
        <Image width={29} height={29} alt="twitter logo" src={"/Logo.png"} />
      </div>
      <div
        className="w-[45px] h-[45px] login-item flex justify-center hover:shadow-lg items-center border p-2 shadow-md rounded-lg cursor-pointer">
        <Image  width={29} height={29} alt="apple logo" src={"/Logo (1).png"} />
      </div>
    </div>
  </div>}
  {verfiyForm && <VerfiyEmail/>}
  {PasswordForm && <SetNewPassword/>}
  </>
  
  );
}

