import { configureStore } from "@reduxjs/toolkit";
import quizReducer from "./quizSlice"

export const store = configureStore({
    reducer: {
        quiz: quizReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
        immutableCheck: false, 
        serializableCheck: false, 
        }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch