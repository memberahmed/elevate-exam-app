import Image from "next/image"
import Link from "next/link"
import {  Subjects } from "../../app/InterFaces/InterFaces";
import { MotionDiv } from "../MotionDiv/MotionDiv";

interface DiplomaCardProps {
  item: Subjects;
  index: number;
}

const DiplomaCard: React.FC<DiplomaCardProps>  = ({ item, index }) => {

   
   const variants = {
    hidden :{opacity : 0},
    visible : {opacity : 1},
   } 
  return ( <>
           <Link  href={`/exams`}>
            <MotionDiv
            variants={variants}
            initial = "hidden"
            animate = 'visible'
            transition={{
              delay : index * .25,
              ease :'easeInOut',
              duration : '0.5'
            }}
            viewport={{amount:0}}
            className="relative">
            <Image
                
                src={item.icon}
                width={330}
                height={292}
                alt={item.name}
          />
          <div className="diploma-info mx-2 p-4 rounded-2xl absolute bottom-9 text-white bg-[#1935CA66] ">
            <h3  className="font-bold  ">{item.name}</h3>
            <p className="font-normal">Voluptatem aut ut dignissimos blanditiis</p>
          </div>
            </MotionDiv>
          </Link>
  </>
  )
}

export default DiplomaCard