import { submit } from "@/lib/actions";
import Image from "next/image";
import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";

export default function Home() {
  return (
    <>
      <nav className="bg-teal-800 text-xl flex justify-around py-6">
        <Link className="text-white hover:shadow-lg" href={"/"}>
          {" "}
          Home{" "}
        </Link>
        <Link className="text-white hover:shadow-lg" href={"/server"}>
          {" "}
          Server{" "}
        </Link>
        <Link className="text-white hover:shadow-lg" href={"/client"}>
          {" "}
          Client{" "}
        </Link>
        <Link className="text-white hover:shadow-lg" href={"/dashboard"}>
          {" "}
          Dashboard{" "}
        </Link>
      </nav>
    </>
  );
}
