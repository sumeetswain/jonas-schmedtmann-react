import { useState } from "react";
import { Item } from "./Item";

export function PackingList({ items, onDeleteItem, onToggleItem, onClearItems }) {
    const [sortBy, SetSortBy] = useState("input");

    let sortedItems;

    if (sortBy === "input") sortedItems = items;
    if (sortBy === "description") sortedItems = items.slice().sort((a, b) => a.description.localeCompare(b.description));
    if (sortBy === "packed") sortedItems = items.slice().sort((a, b) => Number(a.packed - Number(b.packed)));



    return (

        <div className="list">
            <ul>
                {sortedItems.map(item => <Item item={item} onDeleteItem={onDeleteItem} onToggleItem={onToggleItem} key={item.id} />
                )}
            </ul>
            <div className="action">
                <select value={sortBy} onChange={e => SetSortBy(e.target.value)}>
                    <option value="input">Sort By Input Order</option>
                    <option value="description">Sort By Description</option>
                    <option value="packed">Sort By Packed Status</option>
                </select>
                <button onClick={onClearItems}>Clear</button>
            </div>
        </div>
    );
}
