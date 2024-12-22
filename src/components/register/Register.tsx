"use client";

import { FormEvent, useState } from "react";
import { signIn  } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from 'yup';
export default function RegisterForm() {
  const router = useRouter();
  const [isReloading , setIsReloading] = useState(false)
  const [error , setError] = useState('')
  interface RegisterForm {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    rePassword: string;
    phone: string;
  }
  const validationSchema = Yup.object().shape({
    firstName : Yup.string().min(2 , 'Minium length is two characters').max(25 , 'Maxium length is 25 characters').required('First name is required'), 
    lastName : Yup.string().min(2 , 'Minium length is two characters').max(25 , 'Maxium length is 25 characters').required('Last name is required'), 
    username : Yup.string().min(2 , 'Minium length is two characters').max(25 , 'Maxium length is 25 characters').required('User name is required'), 
    email : Yup.string().email('Email is invalid').required('Email  is required'), 
    password : Yup.string().matches(/(?=.*[A-Z])(?=.*\d).{6,50}$/
    , 'Password must have upper case letter and number at least and minlength is 6 letters').required('Password name is required'), 
    rePassword : Yup.string().oneOf([Yup.ref('password')] , 'Password and confirm password are not the same').required('confirm password  is required'), 
    phone : Yup.string().matches(/^01[0125][0-9]{8}$/ , 'Please enter a vild egyptian number').required('Phone number name is required'), 
  })
  async function handleRegister(formValues:RegisterForm){
    setIsReloading(true);
    let data = await fetch(`https://exam.elevateegy.com/api/v1/auth/signup`  , {
      method : 'POST',
      headers : {
        "Content-Type": "application/json",
      },
      body : JSON.stringify(formValues)
    });
    const response = await data.json();
    try {
      if(response.message === 'success'){
        console.log('response is here' , response);
        setIsReloading(false);

        router.push('/login');
      }
      else{
        console.log('error from try' , response)
        setError(response.message);
        setIsReloading(false);

      }
    }catch(error){
      console.error('error is here'  , error)
    }
  }
  const formik = useFormik({
    initialValues : {
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    rePassword: "",
    phone: "",
    },
    validationSchema : validationSchema,
    onSubmit : handleRegister ,
    
  })
  console.log(isReloading);
  // const [user , setUser] = useState({
  //   firstName : '',
  //   lastName : '' , 
  //   username : '',
  //   email : '' ,
  //   password : '',
  //   rePassword : '',
  //   phone : 0,
  // })
  // const getUser = (e: React.ChangeEvent<HTMLInputElement>) =>{
  
  //   setUser((prevUser) => ({
  //     ...prevUser,
  //     [e.target.name]: e.target.value,
  //   }));
  //   console.log(user);
  // }
  //  const sendUserData = async () => {
  //   try {
  //    let data = await fetch(`https://exam.elevateegy.com/api/v1/auth/signup` , {
  //     method : 'POST',
  //     headers : {
  //       "Content-Type": "application/json",
  //     },
  //     body : JSON.stringify(user)
  //    });
  //    const response = await data.json();
  //    console.log("response is here", response);
  //    router.push('/login');

  //   } catch (error) {
  //     console.error("Error sending user data:", error);
  //   }
  // };
  // const handleSubmit = async (e: FormEvent) => {
  //   e.preventDefault();
  //   sendUserData();
  // };
  return (
    <div className=" flex flex-col gap-8  items-center h-full ">
      
      {error && <div className="self-start px-48  mx-1 text-red-500 "> {error}</div>}
      <form onSubmit={formik.handleSubmit} className=" w-[50%]  flex flex-col gap-6  ">
        
        <p className="font-semibold text-lg">Sign Up</p>

        <input
          type="text"
          className="w-full md:w-full lg:w-[410px] shadow-lg border-2 p-2 rounded-lg focus-visible:out"
          placeholder="First Name"
          value={formik.values.firstName}
          name="firstName"
          onChange={formik.handleChange }
          onBlur={formik.handleBlur}
          
        />
        {formik.errors.firstName && formik.values.firstName ? <div className="self-start px-2   text-red-500 "> <p>{formik.errors.firstName}</p></div> : null}
        <input
          type="text"
          className="w-full shadow-lg border-2 p-2 rounded-lg focus-visible:out"
          placeholder="Last Name"
          name="lastName"
          value={formik.values.lastName}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange }
          />
          {formik.errors.lastName && formik.values.lastName  ? <div className="self-start px-2 text-red-500 "> {formik.errors.lastName}</div> : null}

        <input
          type="text"
          className="w-full shadow-lg border-2 p-2 rounded-lg focus-visible:out"
          placeholder="UserName"
          name="username"
          value={formik.values.username}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange }
        />
        {formik.errors.username && formik.values.username ? <div className="self-start px-2 text-red-500 "> <p>{formik.errors.username}</p></div> : null}

        <input
          type="email"
          className="w-full shadow-lg border-2 p-2 rounded-lg focus-visible:out"
          placeholder="Email"
          name="email"
          value={formik.values.email}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange }
        />
        {formik.errors.email && formik.values.email ? <div className="self-start px-2 text-red-500 "> <p>{formik.errors.email}</p></div> : null}

          <input
          type="tel"
          className="w-full shadow-lg border-2 p-2 rounded-lg focus-visible:out"
          placeholder="Phone number"
          name="phone"
          value={formik.values.phone}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange }
        />
        {formik.errors.phone && formik.values.phone ? <div className="self-start px-2   text-red-500 "> <p>{formik.errors.phone}</p></div> : null}

        <input
          type="password"
          className="w-full shadow-lg border-2 p-2 rounded-lg focus-visible:out"
          placeholder="Password"
          name="password"
          value={formik.values.password}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange }
        />
        {formik.errors.password && formik.values.password ? <div className="self-start px-2  mx-1 text-red-500 "> <p>{formik.errors.password}</p></div> : null}

        <input
          type="password"
          className="w-full shadow-lg border-2 p-2 rounded-lg focus-visible:out"
          placeholder="confirm Password"
          name="rePassword"
          value={formik.values.rePassword}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange }
        />
        {formik.errors.rePassword && formik.values.rePassword ? <div className="self-start px-2   text-red-500 "> <p>{formik.errors.rePassword}</p></div> : null}

        <p className="text-sm text-center tracking-widest">
          Already have an account? 
          <span className="text-[#4461F2] "><Link href='/login'>Log In</Link></span>
        </p>
        <button
          type="submit"
          className="bg-[#4461F2] text-white font-light text-sm w-full p-3 rounded-2xl"
        >
          {!isReloading ? 'Create Account' : '...'}
        </button>
      </form>
      <div className=" flex gap-3 items-center">
        <div className="divider h-[1px] bg-[#E7E7E7] w-28"></div>
        <p> or Continue with</p>
        <div className="divider  h-[1px] bg-[#E7E7E7] w-28"></div>
      </div>
      <div className="social-login flex mb-7 gap-4">
        <div className="w-[45px] h-[45px] login-item flex justify-center hover:shadow-lg items-center border p-2 shadow-md rounded-lg cursor-pointer">
          <Image width={29} height={29} alt="google" src={"/Vector.png"} />
        </div>
        <div className="w-[45px] h-[45px] login-item flex justify-center hover:shadow-lg items-center border p-2 shadow-md rounded-lg cursor-pointer">
          <Image width={29} height={29} alt="google" src={"/Logo Google.png"} />
        </div>
        <div className="w-[45px] h-[45px] login-item flex justify-center hover:shadow-lg items-center border p-2 shadow-md rounded-lg cursor-pointer">
          <Image width={29} height={29} alt="google" src={"/Logo.png"} />
        </div>
        <div
          onClick={() => signIn("github", { callbackUrl: "/client" })}
          className="w-[45px] h-[45px] login-item flex justify-center hover:shadow-lg items-center border p-2 shadow-md rounded-lg cursor-pointer"
        >
          <Image width={29} height={29} alt="google" src={"/Logo (1).png"} />
        </div>
      </div>
    </div>
  );
}
