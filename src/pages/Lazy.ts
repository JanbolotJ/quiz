import React from "react";

export const Main = React.lazy(() => import("../apps/main/Main"));

export const Quiz = React.lazy(() => import("../apps/quiz/Quiz"));

export const Results = React.lazy((() => import("../apps/result/Results")));

export const AppsPages = {
    Main,
    Quiz,
    Results
}