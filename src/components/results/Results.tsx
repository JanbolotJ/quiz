

import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { Link } from 'react-router-dom';
import { resetQuiz } from '../../redux/quizSlice';
import cls from "../../assets/styles/results/Results.module.scss";

export default function Results() {
    const dispatch = useDispatch();
    const correctAnswers = useSelector((state: RootState) => state.quiz.correctAnswers);

    const score = (correctAnswers/7) * 100;

    const handleHomeClick = () => {
        dispatch(resetQuiz());
    };
  return (
    <div className={cls.container}>
      <div className={cls.card}>
        <div className={cls.results}>
          <div className={cls.score}>
            {score.toFixed(1)}
          </div>
          <strong className={cls.yscore}>Your Score</strong>
        </div>
        <div className={cls.button}>
          <Link to={"/"} onClick={handleHomeClick} className={cls.homeButton}>GO TO HOME</Link>
        </div>
      </div>
    </div>
  )
}
