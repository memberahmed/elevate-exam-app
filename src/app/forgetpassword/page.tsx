
"use client";
import VerfiyEmail from "@/components/forgetpassword/forgetpassword";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext } from "react";

export default function ForgetPassword() {
  const pathname = usePathname();
  return (
    <div className="login grid grid-cols-1 md:grid-cols-3 gap-8 md:space-y-10 h-screen ">
    {/* Welcome Section */}
    <div className="welcome-elevate flex h-full flex-col justify-center bg-[#F0F4FC] md:col-span-1 py-8 px-6 shadow-lg rounded-tr-[40px] md:rounded-tr-[100px] rounded-br-[40px] md:rounded-br-[100px]">
      <h1 className="text-3xl md:text-5xl font-semibold leading-tight text-center md:text-left">
        Welcome to{" "}
        <span className="block text-[#122D9C] leading-loose">Elevate</span>
      </h1>
      <p className="text-base md:text-lg font-normal text-center md:text-left">
        Quidem autem voluptatibus qui quaerat aspernatur architecto natus
      </p>
      <div className="flex justify-center md:justify-start">
        <Image
          width={410}
          height={410}
          src={"/bro.png"}
          alt="elevate"
          className="hidden md:block lg:w-[410px] mt-4"
        />
      </div>
    </div>
  
    {/* Form Section */}
    <div className="form md:col-span-2 px-4 md:px-10">
      {/* Links */}
      <div className="links flex items-center flex-col md:flex-row gap-4 md:gap-6 justify-center md:justify-end mt-4 md:mt-0">
        <Link
          href={"/login"}
          className={`${pathname === '/login' ? 'active' : ''} px-4 py-2 font-light text-[#122D9C] rounded-xl cursor-pointer text-center `}
        >
          Sign in
        </Link>
        <Link
          href={"/register"}
          className={`${pathname === '/register' ? 'active' : ''}   px-4 py-2 font-light text-[#122D9C] rounded-xl cursor-pointer text-center`}
        >
          Sign up
        </Link>
      </div>
  
      {/* Register Form */}
      <div className="mt-6 md:mt-10">
        <VerfiyEmail />
      </div>
    </div>
  </div>
  );
}
