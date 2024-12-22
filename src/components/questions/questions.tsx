
import { useState  , useEffect} from "react";
const Questions = ({ item }: any) => {
  interface Answer {
    key: string;
    answer: string;
  }
  interface Question {
    _id: string;
    exam: {
      title: string;
      duration: number; 

    };
    question: string;
    answers: Answer[];
  }
  interface QuestionsProps {
    item: {
      questions: Question[];
    };
  }
  interface Answers {
    [key: string]: string;
  }

  console.log("props form question", item);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [timeLift , setTimeLift] = useState(item?.questions[0].exam.duration *60);
  const questions = item.questions;
  console.log("questions are here", questions);
  const handleAnswerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAnswers({
      ...answers,
      [questions[currentQuestionIndex]._id]: event.target.value,
    });
  };
  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };
  const handleSubmit = () => {
    console.log("Submitted Answers:", answers);
    alert("Your answers have been submitted!");
  };
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLift((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          alert("Time's up!");
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer); // Clean up on unmount
  }, []);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };


 
  return (
    <div className="question ">
      <div className="flex justify-between mb-4">
        <h3>
          Question {currentQuestionIndex + 1} of {questions?.length}
        </h3>
        <span className="text-green-500">
        {formatTime(timeLift)}
        </span>
      </div>
      <p className="font-medium text-xl">
        {questions[currentQuestionIndex].question}
      </p>
      <div>
        {questions[currentQuestionIndex].answers.map((answer: Answer) => (
          <section key={answer.key}>
            <div className="">
              <div
                 className={`label mt-4 px-2 py-4 rounded-lg ${
                    answers[questions[currentQuestionIndex]._id] === answer.key
                      ? 'bg-[#CCD7EB]' 
                      : 'bg-[#EDEFF3]' 
                  }`}
              >
                <label>
                  <input
                    className="mr-2 font-normal text-xl"
                    type="radio"
                    name={`question-${currentQuestionIndex}`}
                    value={answer.key}
                    checked={
                      answers[questions[currentQuestionIndex]._id] ===
                      answer.key
                    }
                    onChange={handleAnswerChange}
                  />
                  {answer.answer}
                </label>
              </div>
            </div>
          </section>
        ))}
      </div>
      <div className="flex justify-between mt-4 gap-2">
        <button
          className="text-maincolor bg-white  w-2/4 border border-maincolor  py-2 rounded-full"
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
        >
          Previous
        </button>
        {currentQuestionIndex < questions.length - 1 ? (
          <button
            disabled={!answers[questions[currentQuestionIndex]._id]}
            className="text-maincolor bg-white  w-2/4 border border-maincolor  py-2 rounded-full"
            onClick={handleNext}
          >
            Next
          </button>
        ) : (
          <button onClick={handleSubmit}>Submit</button>
        )}
      </div>
    </div>
  );
};

export default Questions;
