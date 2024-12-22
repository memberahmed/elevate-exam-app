import { getServerSession } from "next-auth"
import Image from "next/image"
import Link from "next/link"
import { options } from "./api/auth/[...nextauth]/route"
import { ResponseINterface , Subjects } from "./InterFaces/InterFaces";
import { signOut } from "next-auth/react";
import Logout from "@/components/logout/logout";
import LoadMore from "@/components/loadMore/loadmore";
import { fetchDiploma } from "./action";
import DiplomaCard from "@/components/diploma/diplomaCard";
import SideNav from "@/components/sideNav/SideNav";
import Header from "@/components/Header/Header";


export default async  function HomePage(){
  let errorMessage:string|null = null;
  let response:ResponseINterface|null = null
  const serverSession = await getServerSession(options);
  
  console.log('serversion from home' , serverSession);
 
   response =  await fetchDiploma('subjects', 1)
  return (<>
    
    <div className="container mx-auto bg-gray-200 bg-opacity-50 flex-col  md:flex-row gap-x-20  flex">
      <div className="side-nav  md:w-2/12   mt-10  ">
      <SideNav/>
      </div>
      

      <div className="  md:w-10/12 mt-10  ">
      {/* start of header */}
      <header className="header flex-col md:flex-row content-start   flex  md:items-center ">
      <Header/>
      </header>
        {/* end of header */}

        {/*start of stats  */}
        <section className=" bg-[#fff] rounded-xl ">
        <div className="stats mt-6 px-2 py-4 gap-8 max-md:gap-4 flex-col md:flex-row flex">
          <div className="stat-image" >
          <Image width={120} height={120}  className="w-full h-auto"  alt="profile photo" src={"/profileImage.jpeg"}/>
        </div>
        <div className="stat-content">
          <h2 className="text-3xl text-maincolor">Ahmed Mohamed</h2>
          <p className="text-muted my-2">Voluptatem aut</p>
          <div className="progress bg-[#F5F5F5] rounded-3xl roun h-3 w-full">
            <div style={{width:'50%'}} className="progress-bar rounded-3xl  h-3 bg-[var(--main-background)]"></div>
          </div>
          <div className="stats-icons mt-4 p-4 flex items-center justify-center">
            <div className="flag-icon flex items-center justify-center">
              <i className="fa-solid fa-flag text-maincolor text-3xl p-2 m-2"></i>
              <div>
                <span className="font-bold text-2xl">27</span>
                <p className="font-normal text-muted">Quiz Passed</p>
              </div>
            </div>
            <div className="check-icon mx-3 flex items-center justify-center">
              <i className="fa-solid fa-circle-check text-maincolor text-3xl  p-2 m-2 "></i>
              <div>
                <span className="font-bold text-2xl">27</span>
                <p className="font-normal text-muted">Quiz Passed</p>
              </div>
            </div>
            <div className="flag-icon  flex items-center justify-center">
              <i className="fa-solid  fa-clock text-maincolor text-3xl  p-2 m-2 "></i>
              <div>
              <span className="font-bold text-2xl">27</span>
                <p className="font-normal text-muted">Quiz Passed</p>
              </div>
            </div>
          </div>
        </div>
          
        </div>  
        </section>
         {/* end of stats */}
         {/* start of qiz */}
         <section className="bg-[#fff] mt-6 rounded-xl" >
          <div>
          <div className="qiz-header  flex p-3 justify-between">
            <span className="font-medium text-2xl text-[var(--font-color)]">Quizes</span>
            <span className="font-medium text-2xl text-[var(--font-color)]" >View All</span>
          </div>
          <div 
          
          className="qiz grid md:grid-cols-3  gap-3 mb-3 grid-cols-1 ">
          {response?.subjects?.map((subject: Subjects , index:number) => (
       
          <DiplomaCard item={subject} index = {index} key={subject._id} />
    
           ))}

          </div>
          </div>
          <LoadMore/>
         </section>
         {/* end of qiz */}
      
      </div>
    </div>
 

    
  </>
   


  )
}