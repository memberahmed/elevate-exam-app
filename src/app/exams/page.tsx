import { getServerSession } from "next-auth";
import React from "react";
import { options } from "../api/auth/[...nextauth]/route";
import StartExams from "../../components/startExams/startExams.jsx";


const Exams = async () => {
  const serverSession = await getServerSession(options);
  const response = await fetch(`https://exam.elevateegy.com/api/v1/exams`, {
    method: "GET",
    headers: {
      token: serverSession?.token || "",
    },
  });
  const data = await response?.json();
  console.log("exams are here", data);
  return (
    <>
      {data?.exams?.map((exam: any) => (
        <div
          className="flex justify-between mb-7 shadow-sm bg-white p-2 rounded-lg mt-3"
          key={exam?._id}
        >
          <div className="exam-title  ">
            <h3 className="text-xl font-normal ">{exam?.title}</h3>
            <span className="text-muted  font-normal ">
              {exam?.numberOfQuestions} Questions
            </span>
          </div>
          <div className="start-exam ">
            <h5 className=" text-xl mb-1">{exam.duration} Minutes</h5>
            <StartExams item={exam} />
          </div>
        </div>
      ))}
    </>
  );
};

export default Exams;
