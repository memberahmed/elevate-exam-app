'use client'

import { signOut } from "next-auth/react"
import { useState } from "react"


const Logout = ()=>{
  const [showLightBox , setShowLightBox] = useState(false);
  const iniateLogout = () =>{
    document.body.style.overflow = 'hidden';
    setShowLightBox(true);
  }
  const removeLightBox = () => {
    setShowLightBox(false);
    document.body.style.overflow = 'auto';

  }

    const handleLogout = async(callback:Function) =>{
      
        try{
         let reuslt = await signOut({
           callbackUrl : 'http://localhost:3000/login',
         });
         callback()
        }
        catch(error){
         console.log(error)
        }
       }
       
       return (<>
        {showLightBox && <>
          <div className="light-box-container capitalize  bg-black bg-opacity-50 light-box absolute top-0 left-0 bottom-0 right-0 h-screen  flex items-center flex-col justify-center">
           <div className="light-box bg-white shadow-lg py-6 px-12 rounded-lg">
           <p > are you sure you want to logout ?</p>
            <div className="buttons flex gap-x-16 mt-7 justify-between ">
                <button onClick={()=>handleLogout(removeLightBox)} className="bg-maincolor px-8 py-3 rounded-full">Yes</button>
                <button onClick={removeLightBox} className="bg-maincolor px-8 py-3 rounded-full">No</button>
            </div>
           </div>
        </div>
        
        </>}
         <div  className="log-out ">
          <i className=" me-6 px-2 text-[var(--font-color)] fa-solid fa-arrow-right-from-bracket"></i>
            <span onClick={iniateLogout} className="cursor-pointer">Logout</span>
          </div>
        </>
       )

}

export default Logout