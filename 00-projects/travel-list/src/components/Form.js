import { useState } from "react"
export default function Form({ onAddItems }) {
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