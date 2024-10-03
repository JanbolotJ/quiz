import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface QuizState {
  currentQuestionIndex: number;
  correctAnswers: number;
  timeLeft: number;
}

const initialState: QuizState = {
  currentQuestionIndex: 0,
  correctAnswers: 0,
  timeLeft: 70
};

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    nextQuestion(state) {
      if (state.currentQuestionIndex < 6) {
        state.currentQuestionIndex += 1;
      }
    },
    incrementCorrectAnswers(state) {
      state.correctAnswers += 1;
    },
    updateTime(state, action: PayloadAction<number>) {
      state.timeLeft = action.payload;
    },
    resetQuiz(state) {
      state.currentQuestionIndex = 0;
      state.correctAnswers = 0;
      state.timeLeft = 70;
    },
    stopButton(state) {
      state.currentQuestionIndex = 0;
      state.timeLeft = 70;
    }
  }
});

export const { nextQuestion, incrementCorrectAnswers, updateTime, resetQuiz, stopButton } = quizSlice.actions;

export default quizSlice.reducer;
