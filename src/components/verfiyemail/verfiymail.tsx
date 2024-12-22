"use client";
import Image from "next/image";
import { signIn } from "next-auth/react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { usePathname } from 'next/navigation';
import { useContext, useState } from "react";
import { ForgetPasswordContext } from "@/context/forgetPasswordContext";

export default function VerifyEmail() {
  let { setVerfiyForm, setForgetFormIShown, SetPasswordForm } = useContext(ForgetPasswordContext);

  const pathname = usePathname();
  const [errorMessage, setErrorMessage] = useState('');

  interface verifyEmail {
    resetCode: string,
  }

  const handleSubmit = async (formValues: verifyEmail) => {
    try {
      const result = await fetch(`https://exam.elevateegy.com/api/v1/auth/verifyResetCode`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues)
      });
      const response = await result.json();
      if (response?.status === 'Success') {
        setForgetFormIShown(false);
        setVerfiyForm(false);
        SetPasswordForm(true);
      } else {
        setErrorMessage(response?.message);
        console.log('error form verify', response?.message);
      }
    } catch (error) {
      console.log('error form forget', error);
    }
  };

  const validationSchema = Yup.object().shape({
    resetCode: Yup.string()
      .length(6, 'Code must be exactly 6 digits')
      .matches(/^\d{6}$/, 'Code must be numeric')
      .required('This code is required'),
  });

  let formik = useFormik({
    initialValues: {
      resetCode: '',
    },
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <div className="flex flex-col gap-8 justify-center items-center h-full">
      <form onSubmit={formik.handleSubmit} className="w-[50%] flex flex-col gap-6">
        <p className="font-semibold text-lg">Verify code</p>

        <input
          type="text"
          className="w-full shadow-lg border-2 p-2 rounded-lg focus-visible:out"
          placeholder="Reset code"
          value={formik.values.resetCode}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name="resetCode"
        />
        {formik.errors.resetCode && formik.touched.resetCode && (
          <div className="self-start px-2 text-red-500">
            <p>{formik.errors.resetCode}</p>
          </div>
        )}

        <p className="text-sm text-end text-[#4461F2] tracking-widest">
          Didn’t receive a code?<span>Resend</span>
        </p>
        <button
          type="submit"
          disabled={formik.isSubmitting || !!formik.errors.resetCode}
          className="bg-[#4461F2] text-white font-light text-sm w-full p-3 rounded-2xl"
        >
          Verify
        </button>
      </form>

      <div className="flex gap-3 items-center">
        <div className="divider h-[1px] bg-[#E7E7E7] w-28"></div>
        <p>or Continue with</p>
        <div className="divider h-[1px] bg-[#E7E7E7] w-28"></div>
      </div>

      <div className="social-login flex mb-7 gap-4">
        <div className="w-[45px] h-[45px] login-item flex justify-center hover:shadow-lg items-center border p-2 shadow-md rounded-lg cursor-pointer">
          <Image width={29} height={29} alt="facebook" src={"/Vector.png"} />
        </div>
        <div
          onClick={() => signIn('google', { callbackUrl: pathname === "/login" ? "/" : pathname })}
          className="w-[45px] h-[45px] login-item flex justify-center hover:shadow-lg items-center border p-2 shadow-md rounded-lg cursor-pointer"
        >
          <Image width={29} height={29} alt="google logo" src={"/Logo Google.png"} />
        </div>
        <div
          onClick={() => signIn('twitter', { callbackUrl: pathname === "/login" ? "/" : pathname })}
          className="w-[45px] h-[45px] login-item flex justify-center hover:shadow-lg items-center border p-2 shadow-md rounded-lg cursor-pointer"
        >
          <Image width={29} height={29} alt="twitter logo" src={"/Logo.png"} />
        </div>
        <div className="w-[45px] h-[45px] login-item flex justify-center hover:shadow-lg items-center border p-2 shadow-md rounded-lg cursor-pointer">
          <Image width={29} height={29} alt="apple logo" src={"/Logo (1).png"} />
        </div>
      </div>
    </div>
  );
}
