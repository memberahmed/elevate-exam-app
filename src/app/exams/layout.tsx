import Header from "@/components/Header/Header";
import SideNav from "@/components/sideNav/SideNav";
import {  ReactNode } from "react";


export default function Layout({children}:{children:ReactNode}){
    return <>
     <section>
         <div className="container mx-auto bg-gray-200 bg-opacity-50 flex-col  md:flex-row gap-x-20  flex">
         <div className="side-nav  md:w-2/12   mt-10  ">
             <SideNav/>
         </div>
         <div className="md:w-10/12 mt-10  ">
         {/* start of header */}
         <header className="header flex-col md:flex-row content-start   flex  md:items-center ">
            <Header/>
        </header>
        {/* end of header */}
          <div className=''>
          {children}
          </div>

         </div>
            
         </div>

        </section>
    
    
    </>
}