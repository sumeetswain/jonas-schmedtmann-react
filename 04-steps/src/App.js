import { useState } from "react";
const messages = [
  "Learn React",
  "Apply for jobs",
  "Money",
]
export default function App() {
  const [step, setStep] = useState(1)
  const [isOpen, SetIsOpen] = useState(true)
  function handleNext() {
    if (step < 3) setStep((curStep) => curStep + 1)
  }
  function handlePrevious() {
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

            <StepMessage step={step}>{messages[step - 1]} </StepMessage>

            <div className="buttons">
              <Button textColor="#fff" bgColor="#7950f2" onClick={handlePrevious}>
                <span>🔙</span>
                Previous
              </Button>
              <Button textColor="#fff" bgColor="#7950f2" onClick={handleNext} >Next <span>✅</span>
              </Button>


            </div>
          </div >

        )

      }
    </ >
  );
}

function StepMessage({ step, children }) {
  return (
    <p className="message">Step {step} : {children}</p>
  )
}

function Button({ textColor, bgColor, onClick, children }) {
  return <button style={{ backgroundColor: bgColor, color: textColor }}
    onClick={onClick}>{children}</button>
}