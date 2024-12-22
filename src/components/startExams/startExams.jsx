"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Questions from "../questions/questions";

export default function StartExams(props) {
  const userSession = useSession();
  const [showLightBox, setShowLightBox] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);
  const [examData, setExamData] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  // Lightbox Control
  const iniateLightBox = () => {
    document.body.style.overflow = "hidden";
    setShowLightBox(true);
  };

  const removeLightBox = () => {
    setShowLightBox(false);
    document.body.style.overflow = "auto";
  };

  // Fetch Exam Data
  const fetchExamData = async () => {
    try {
      const res = await fetch(
        `https://exam.elevateegy.com/api/v1/questions?exam=${props.item._id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            token: userSession?.data?.token,
          },
        }
      );
      const data = await res.json();
      setExamData(data);
      setShowInstructions(false);
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  // Handle Escape Key to Close Lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        removeLightBox();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [showLightBox]);

  return (
    <>
      <div className="start-exam">
        <button
          onClick={iniateLightBox}
          className="bg-maincolor text-white rounded-full px-8 py-2"
        >
          Start
        </button>
      </div>
      {errorMessage && (
        <div className="text-red-400 font-normal">{errorMessage}</div>
      )}
      {showLightBox && (
        <div className="light-box-container capitalize bg-black bg-opacity-50 light-box absolute top-0 left-0 bottom-0 right-0 h-screen flex items-center flex-col justify-center">
          {showInstructions && (
            <div className="bg-white shadow-lg py-6 px-5 rounded-lg">
              <h3 className="text-xl font-medium">Instructions</h3>
              <ul className="list-disc px-6 pe-32 mt-2">
                <li className="text-[#535353]">Lorem ipsum dolor sit amet consectetur.</li>
                <li className="text-[#535353]">Lorem ipsum dolor sit amet consectetur.</li>
                <li className="text-[#535353]">Lorem ipsum dolor sit amet consectetur.</li>
                <li className="text-[#535353]">Lorem ipsum dolor sit amet consectetur.</li>
              </ul>
              <div className="buttons mt-7">
                <button
                  onClick={fetchExamData}
                  className="bg-maincolor px-8 py-2 w-full text-white rounded-full"
                >
                  Start
                </button>
              </div>
            </div>
          )}
          {examData && (
            <div className="bg-white shadow-lg py-6 px-5 rounded-lg">
              {/* Render exam data */}
              <Questions item = {examData} />
              {/* Add your exam content rendering here */}
            </div>
          )}
        </div>
      )}
    </>
  );
}
