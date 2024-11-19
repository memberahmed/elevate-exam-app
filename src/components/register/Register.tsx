"use client";

import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";

export default function RegisterForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
  };
  return (
    <div className=" flex flex-col gap-8 justify-center items-center h-full ">
      <form onSubmit={handleSubmit} className="  w-[35%] flex flex-col gap-6  ">
        <p className="font-semibold text-lg">Sign in</p>

        <input
          type="text"
          className="w-full shadow-lg border-2 p-2 rounded-lg focus-visible:out"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />

        <input
          type="text"
          className="w-full shadow-lg border-2 p-2 rounded-lg focus-visible:out"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />

        <input
          type="text"
          className="w-full shadow-lg border-2 p-2 rounded-lg focus-visible:out"
          placeholder="UserName"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />

        <input
          type="email"
          className="w-full shadow-lg border-2 p-2 rounded-lg focus-visible:out"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="w-full shadow-lg border-2 p-2 rounded-lg focus-visible:out"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="password"
          className="w-full shadow-lg border-2 p-2 rounded-lg focus-visible:out"
          placeholder="confirm Password"
          value={rePassword}
          onChange={(e) => setRePassword(e.target.value)}
        />
        <p className="text-sm text-center tracking-widest">
          Already have an account?{" "}
          <span className="text-[#4461F2] "> Login </span>
        </p>
        <button
          type="submit"
          className="bg-[#4461F2] text-white font-light text-sm w-full p-3 rounded-2xl"
        >
          Create Account
        </button>
      </form>
    </div>
  );
}
