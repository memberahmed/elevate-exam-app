import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Logout from '../logout/logout'

const SideNav = () => {
  return (<>
  <div className="">
        <Image className="logo-elvate mb-6" width={151} height={39} src={"/Final Logo 1.png"} alt="logo photo"/>
        <ul>
          <li className="bg-green-300  mb-6" >
            
            <i className="me-6 px-2 text-[var(--font-color)] fa-solid fa-table-list"></i>
            <Link href='/dashboard'>Dashboard</Link>
           
            </li>
          <li className="mb-6">
          <i className ="me-6 px-2 text-[var(--font-color)] fa-solid  fa-clock-rotate-left"></i>
            <Link href='/history'>Quiz History</Link></li> 
        </ul>
         <Logout/>
      
      </div>
  
  </>
  )
}

export default SideNav