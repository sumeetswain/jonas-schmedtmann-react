import { useEffect, useReducer } from "react"
import Header from "./Header.js"
import Main from "./Main.js"
import Loader from "./Loader.js"
import Error from "./Error.js"
import StartScreen from "./StartScreen.js"
import Question from "./Question.js"

const initialState = {
  questions: [],

  // "loading", "error", "ready","active", "finished"
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
}

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state, questions: action.payload,
        status: "ready"
      }
    case "dataFailed":
      return {
        ...state, status: "error"
      }
    case "start":
      return {
        ...state, status: "active"
      }
    case "newAnswer":
      const question = state.questions.at(state.index)
      return {
        ...state,
        answer: action.payload,
        points: action.payload === question.correctOption
          ? state.points + question.points : state.points
      }
    default: throw new Error("action unknown")
  }
}
export default function App(params) {

  const [{ questions, status, index, answer }, dispatch] = useReducer(reducer, initialState)
  const numQuestions = questions.length
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
        {status === "active" && <Question question={questions[index]} dispatch={dispatch} answer={answer} />}
      </Main>
    </div>)
};

