import { useState } from "react";
function App() {
  let [amount, setAmount] = useState("")
  let [tip, setTip] = useState(0)
  let [friendTip, setFriendTip] = useState(0)
  const totalTip = amount * ((tip) + (friendTip)) / (2 * 100) // no need to create new state for total tip
  return (
    <div className="App">
      <Bill amount={amount} onSetAmount={setAmount} />
      <Tip tip={tip} onSetTip={setTip} >How did you like the service?</Tip>

      <Tip tip={friendTip} onSetTip={setFriendTip} >How did your friend like the service? </Tip>
      {/* we can use the same component for two different states, just use 2 different state functions like setTip and setFriendTip */}
      <Final amount={amount} totalTip={totalTip} />
      <Reset onSetAmount={setAmount} onSetTip={setTip} onSetFriendTip={setFriendTip} />
    </div>
  );
}
function Bill({ amount, onSetAmount }) {

  return (<p>
    How much was the bill?
    <input type="number" value={amount} onChange={(e) => onSetAmount(Number(e.target.value))} />
  </p>)
}
function Tip({ tip, onSetTip, children }) {
  return (
    <div>
      <label>{children}</label>
      <select value={tip} onChange={(e) => onSetTip(Number(e.target.value))}>
        <option value="0">Meh(0%)</option>
        <option value="5">Good(5%)</option>
        <option value="10">Great(10%)</option>
        <option value="20">Amazing(20%)</option>
      </select>
    </div>
  )
}

function Final({ amount, totalTip }) {
  return (
    <h1>
      You pay  ₹ {(amount) + totalTip} ( ₹ {amount} + ₹ {totalTip} Tip)
    </h1>
  )
}
function Reset({ onSetAmount, onSetFriendTip, onSetTip }) {

  return (
    <button onClick={() => { onSetAmount(""); onSetFriendTip(0); onSetTip(0) }}>Reset</button>
  )
}
export default App;
