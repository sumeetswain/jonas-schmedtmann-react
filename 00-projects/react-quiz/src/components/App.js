import { useEffect, useReducer } from "react"
import Header from "./Header.js"
import Main from "./Main.js"
import Loader from "./Loader.js"
import Error from "./Error.js"
import StartScreen from "./StartScreen.js"
import Question from "./Question.js"
import NextButton from "./NextButton.js"
import Progress from "./Progress.js"
import FinishScreen from "./FinishScreen.js"
import Footer from "./Footer.js"
import Timer from "./Timer.js"

const SECONDS_PER_QUESTION = 30
const initialState = {
  questions: [],

  // "loading", "error", "ready","active", "finished"
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null
}

function reducer(state, action) {
  switch (action.type) {

    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready"
      }

    case "dataFailed":
      return {
        ...state, status: "error"
      }

    case "start":
      return {
        ...state, status: "active",
        secondsRemaining: state.questions.length * SECONDS_PER_QUESTION
      }

    case "newAnswer":
      const question = state.questions.at(state.index)
      return {
        ...state,
        answer: action.payload,
        points: action.payload === question.correctOption
          ? state.points + question.points : state.points
      }

    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null }

    case "finish":
      return { ...state, status: "finished", highscore: state.points > state.highscore ? state.points : state.highscore }

    case "restart":
      return { ...state, status: "active", index: 0, points: 0, answer: null }

    case "tick":
      return {
        ...state, secondsRemaining: state.secondsRemaining - 1
        , status: state.secondsRemaining === 0 ? "finished" : state.status
      }
    default: throw new Error("action unknown")


  }
}
export default function App(params) {

  const [{ questions, status, index, answer, points, highscore, secondsRemaining }, dispatch] = useReducer(reducer, initialState)
  const numQuestions = questions.length
  const maxPoints = questions.reduce((prev, cur) => prev + cur.points, 0)
  useEffect(function () {
    fetch("http://localhost:8000/questions")
      .then(res => res.json())
      .then(data => dispatch({ type: "dataReceived", payload: data }))
      .catch(e => dispatch({ type: "dataFailed" }));
  }, [])

  return (
    <div className="app">
      <Header />
      <Main >
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <StartScreen numQuestions={numQuestions} dispatch={dispatch} />}
        {status === "active" &&
          <>
            <Progress
              index={index}
              numQuestions={numQuestions}
              points={points}
              maxPoints={maxPoints}
              answer={answer}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer} />


            <Footer>
              <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />

              <NextButton
                dispatch={dispatch}
                answer={answer}
                index={index}
                numQuestions={numQuestions} />
            </Footer>

          </>

        }
        {status === "finished" &&
          <FinishScreen
            points={points}
            maxPoints={maxPoints}
            highscore={highscore}
            dispatch={dispatch}
          />}
      </Main>
    </div>)
};

