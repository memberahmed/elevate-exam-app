import Image from 'next/image'
import React from 'react'

const Header = () => {
  return (<>
   <div className="form w-2/3">
         <form  >
          <div className="h-[45px] bg-[#fff] border rounded-3xl search-input items-center flex mb-3">
            <i><i className="text-[var(--font-color)] mx-3 fas fa-search"></i></i>
            <input className="w-full h-[40px]   rounded-3xl" type="text"  placeholder="Search Quiz"/>
          </div>
         </form>
         </div>
         <div >
          <button className=" mb-3 mx-4 py-2 px-8 rounded-2xl  bg-[var(--main-background)]">Start Quiz</button>
         </div>
  
         <div className="flex items-center ">
            <Image width={64} height={64} className="w-[64px] rounded-full h-[64px] mx-2"  alt="profile photo" src={"/profileImage.jpeg"}/>
          </div>
  </>
  )
}

export default Header