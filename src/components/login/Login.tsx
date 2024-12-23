"use client";
import Image from "next/image";
import {  useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { usePathname, useRouter  } from 'next/navigation'
import DotsLoader from "../loaders/dots-loader";

export default function LoginForm() {
  const pathname = usePathname()
  const router = useRouter()
  const [error, setError] = useState<string | null>(null);
  const [isReloading, setIsReloading] = useState<boolean>(false);
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const showPasswordVisible = () => setPasswordVisible(!passwordVisible)
  interface LoginForm  {
    email : string,
    password : string
  }

  
  const handleSubmit = async (formValues: LoginForm) => {
    try {
      setIsReloading(true);
      const result = await signIn("credentials", {
        email: formValues.email,
        password: formValues.password,
        callbackUrl : pathname ,
        redirect: false, // Avoid automatic redirection
      });
  
      if (result?.ok) {
        // Navigate to home or desired page
        setIsReloading(false);
        router.push(pathname === "/login" ? "/" : `http://localhost:3000/${pathname}`);
      } else {
        // Handle error
        setIsReloading(false);
        console.error(result?.error || "Sign-in failed");
        setError(result?.error || "Sign-in failed");
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
    }
  };
  const validationSchema = Yup.object().shape({
    email : Yup.string().email('Email is invalid').required('Email  is required'), 
    password : Yup.string().matches(/(?=.*[A-Z])(?=.*\d).{6,50}$/, 'Password must have upper case letter and number at least and minlength is 6 letters').required('Password name is required'), 
  })
  let formik = useFormik({
    initialValues : {
      email :'',
      password : '',

    }, 
    validationSchema : validationSchema ,

    onSubmit : handleSubmit
  })
 
  return (
    <div className=" flex flex-col gap-8 justify-center items-center h-full ">
    <form onSubmit={formik.handleSubmit} className=" w-[50%]  flex flex-col gap-6  ">
      <p className="font-semibold text-lg">Sign in</p>
      {error && <p className="text-red-500 text-center text-sm">{error}</p>}
      <input
        type="text"
        className={` ${formik.errors.email && formik.values.email ? 'border-red-400':''} w-full shadow-lg border-2 p-2 rounded-lg focus-visible:out`}
        placeholder="email"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        name="email"
      />
        {formik.errors.email && formik.values.email ? <div className="self-start px-2 text-red-500 "> <p>{formik.errors.email}</p></div> : null}

      
        <div className={ `${formik.errors.password && formik.values.password ? 'border-red-400':''} shadow-lg border-2 p-2 rounded-lg focus-visible:out flex justify-between items-center `}>
          <input
            type={passwordVisible ? "text" : "password"}
            className="w-full"
            placeholder="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="password"
          />
          <i onClick={showPasswordVisible} className={`fa-solid fa-eye ${passwordVisible?'text-green-500':''}`}></i>
        </div>
        {formik.errors.password && formik.values.password ? <div className="self-start px-2 text-red-500 "> <p>{formik.errors.password}</p></div> : null}

   
      <p className="text-sm text-center tracking-widest">
        Don't have an account? 
        <span className="text-[#4461F2] "> <Link href='/register'>Register</Link> </span>
      </p>
      <button
        type="submit"
        className="bg-[#4461F2] text-white font-light text-sm w-full p-3 rounded-2xl"
        
      >
        {!isReloading ? "Sign In" :  <span className="text-white flex items-center justify-center text-sm">  <DotsLoader /> </span> }
        
      </button>
      <p className="text-[#4461F2] mx-auto"><Link  href={'/forgetpassword'}>Forget your password</Link> </p>
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
        onClick={()=> signIn('twitter'  , {callbackUrl : pathname === "/login" ? "/" : pathname})}   className="w-[45px] h-[45px] login-item flex justify-center hover:shadow-lg items-center border p-2 shadow-md rounded-lg cursor-pointer">
        <Image width={29} height={29} alt="twitter logo" src={"/Logo.png"} />
      </div>
      <div
        className="w-[45px] h-[45px] login-item flex justify-center hover:shadow-lg items-center border p-2 shadow-md rounded-lg cursor-pointer">
        <Image  width={29} height={29} alt="apple logo" src={"/Logo (1).png"} />
      </div>
    </div>
  </div>
  );
}
