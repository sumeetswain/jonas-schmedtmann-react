import { useState } from "react";
const messages = [
  "Learn React",
  "Apply for jobs",
  "Money",
]
export default function App() {
  const [step, setStep] = useState(1)
  const [isOpen, SetIsOpen] = useState(true)
  function next() {
    if (step < 3) setStep((curStep) => curStep + 1)
  }
  function previous() {
    if (step > 1) setStep((curStep) => curStep - 1)
  }
  return (
    <>
      <button className="close" onClick={() => SetIsOpen(!isOpen)}>&times;</button>
      {
        isOpen &&

        (

          <div className="steps">
            <div className="numbers">
              <div className={step === 1 ? "active" : ""}>1</div>
              <div className={step === 2 ? "active" : ""}>2</div>
              <div className={step === 3 ? "active" : ""}>3</div>
            </div>
            <p className="message">Step {step} : {messages[step - 1]}</p>
            <div className="buttons">
              <button
                style={{ backgroundColor: "#7950f2", color: "#fff" }}
                onClick={previous}
              >Previous</button>
              <button
                style={{ backgroundColor: "#7950f2", color: "#fff" }}
                onClick={next}
              >Next</button>
            </div>
          </div >

        )

      }
    </ >
  );
}


