import { useState } from "react";


export default function App() {
  const [items, setItems] = useState([])
  function handleAddItems(item) {
    setItems(items => [...items, item])
  }
  function handleDeleteItem(id) {
    setItems(items => items.filter(item => item.id !== id))
  }
  return (
    <div className="App">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList items={items} onDeleteItem={handleDeleteItem} />
      <Stats numberItems={items.length} />
    </div>
  );
}

function Logo() {
  return (
    <div>
      <h1>🌴 Far Away 🥥</h1>
    </div>
  )
}
function Form({ onAddItems }) {
  const [description, setDescription] = useState('')
  const [quantity, setQuantity] = useState(1)


  function handleSubmit(e) {
    e.preventDefault()
    const newItem = { description, quantity, packed: false, id: Date.now() }
    onAddItems(newItem);
    setDescription("")
    setQuantity(1)
  }
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      What do you need for the trip?
      <select value={quantity} onChange={e => setQuantity(e.target.value)} >
        {Array.from({ length: 20 }, (_, i) => i + 1).map(num => <option value={num} key={num}>{num}</option>)}
      </select>
      <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
      <button>Add</button>
    </form>
  )
}
function PackingList({ items, onDeleteItem }) {
  return (
    <div className="list">
      <ul >
        {
          items.map(item =>
            <Item item={item} onDeleteItem={onDeleteItem} key={item.id} />
          )
        }
      </ul>
    </div >
  )
}
function Item({ item, onDeleteItem }) {
  return (
    <li>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>{item.quantity} {item.description}</span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>

  )
}
function Stats({ numberItems }) {
  return (
    <footer className="stats">
      <em>

        you have {numberItems} items in your list, you already have packed X
      </em>
    </footer>
  )
}


