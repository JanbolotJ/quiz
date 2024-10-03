

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { RootState } from '../../redux/store';
import { incrementCorrectAnswers, nextQuestion, stopButton, updateTime } from '../../redux/quizSlice';
import cls from "../../assets/styles/quiz/Quiz.module.scss";
interface QuizQuestion {
    question:string;
    answers:string[];
    correctAnswer:string;
};

const quizData: QuizQuestion[] = [
  {
    question: "Which one is the type of a javascript file?",
    answers: [".ts", ".js", ".jsx", ".j"],
    correctAnswer: ".js"
  },
  {
    question: "Inside which HTML element do we put the JavaScript?",
    answers: ["<scripting>", "<script>", "<js>", "<javascript>"],
    correctAnswer: "<script>"
  },
  {
    question: "Where is the correct place to insert a JavaScript?",
    answers: [
        "The <head> section", 
        "Both the <head> section and the <body> section are correct", 
        "The <body> sectino", 
        "Anywere in the HTML document"
    ],
    correctAnswer: "Both the <head> section and the <body> section are correct"
  },
  {
    question: "What is the correct syntax for referring to an external script called 'xxx.js' ?",
    answers: [
        "<script name='xxx.js'",
        "<script src='xxx.js'",
        "<script link='xxx.js'",
        "<script href='xxx.js'"
    ],
    correctAnswer: "<script src='xxx.js'"
  },
  {
    question: "How do you write 'Hello World' in an alert box?",
    answers: [
        "msg('Hello World');",
        "alert('Hello World');",
        "msgBox('Hello World');",
        "consoel.log('Hello World');"
    ],
    correctAnswer: "alert('Hello World');",
  },
  {
    question: "How do you create a normal function in JavaSctipt",
    answers: [
        "function:myFunction()",
        "function myFunction()",
        "function* myFunction()",
        "function = myFunction()"
    ],
    correctAnswer: "function myFunction()"
  },
  {
    question: "How do yo call a function named 'muFunction'",
    answers: [
        "call myFunction()",
        "myFunction()",
        "call:myFunction()",
        "alo myFunction()"
    ],
    correctAnswer: "myFunction()"
  }
];
export default function Quiz() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentQuestionIndex = useSelector((state: RootState) => state.quiz.currentQuestionIndex);
  const timeLeft = useSelector((state: RootState) => state.quiz.timeLeft)

  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [isAnsweredCorrectly, setIsAnsweredCorrectly] = useState<boolean | null>(null)
  const [times, setTimes] = useState<boolean>(true)

  const currentQuestion = quizData[currentQuestionIndex];

  const formatTime = (time:number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  
  useEffect(() => {
    const timer = setInterval(() => {
      dispatch(updateTime(timeLeft - 1));
      if(timeLeft <= 0) {
        setTimes(false)
      }
    }, 1000)
    return () => clearInterval(timer)
  },[timeLeft, dispatch, navigate]);

  const time = formatTime(timeLeft);
  
  const handleAnswerClick = (answer: string) => {
    setSelectedAnswer(answer); 
    if (answer === currentQuestion.correctAnswer) {
      setIsAnsweredCorrectly(true)
    } else {
      setIsAnsweredCorrectly(false)
    }
  };

  const handleStopClick = () => {
    dispatch(stopButton())
  }

  const handleNextQuestion = () => {
    if(isAnsweredCorrectly) {
      dispatch(incrementCorrectAnswers());
    }
    if (currentQuestionIndex < quizData.length - 1) {
      dispatch(nextQuestion());
      setIsAnsweredCorrectly(null)
      setSelectedAnswer(null);
    } else {
      navigate("/results");
    }
  };
  const timePercentage = (timeLeft / 70) * 100;  
  return (
    <div className={cls.navbar}>
      <div className={cls.ntime}>
        <p>
          Question {currentQuestionIndex+1}/7
        </p>
        {!times ? (
          <p>00:00</p>
        ): (  
          <p>
            {time}
          </p>
        )}
      </div>
      <div className={cls.timebar}>
          {times ? (
            <div style={{width: `${timePercentage}%` }} className={cls.progress}/>
          ): (
            <div></div>
          )}
      </div>
      <p className={cls.num}>Q {currentQuestionIndex+1}:</p>
      <h3 className={cls.quest}>{currentQuestion.question}</h3>

      <ul className={cls.answersList}>
        {currentQuestion.answers.map((answer, index) => (
          <li key={index} className={cls.answerItem} onClick={() => handleAnswerClick(answer)}>
            <span
              className={`${cls.answerSpan} ${selectedAnswer === answer ? cls.selected : ''}`}
            ></span>
            <span className={cls.answerText}>{answer}</span>
          </li>
        ))}
      </ul>
      <div className={cls.buttons}>
        <div className={cls.stop}>
          {times ? (
            <Link to={"/results"} className={cls.stopButton} onClick={handleStopClick}>STOP</Link>
          ): (
            <div></div>
          )}
        </div>
        <div className={cls.next}>
          {times? (
            <button className={cls.nextButton} onClick={handleNextQuestion}>
              NEXT
            </button>
          ): (
            <Link to={"/results"} className={cls.resultsButton}>SHOW RESULTS</Link>
          )}
        </div>
      </div>
    </div>
  )
}
