
import { useState } from 'react';
import './App.css';

function App() {
  const [step, setStep] = useState(0)
  const [count, setCount] = useState(0)
  const [days, setDays] = useState(0)
  const increaseStep = () => {
    return setStep(step + 1)
  }
  const decreaseStep = () => {
    return setStep(step - 1)
  }
  const increaseCount = () => {
    return setCount(count + step)
  }
  const decreaseCount = () => {
    return setCount(count - step)
  }
  return (

    <div className="App">
      <div>

        <button onClick={decreaseStep}>-</button>
        Step :{step}
        <button onClick={increaseStep}>+</button>
      </div>
      <div>
        <button onClick={decreaseCount}>-</button>
        Count: {count}
        <button onClick={increaseCount}>+</button>
      </div>

    </div>
  );
}

export default App;
