export function Stats({ items }) {
    if (!items.length) return (
        <p className="stats">
            <em>
                Start adding items to your list! 🚀
            </em>
        </p>
    );
    const numItems = items.length;
    const numPacked = items.filter(item => item.packed).length;
    const percentage = Math.round(numPacked * 100 / numItems);
    return (
        <footer className="stats">
            <em>
                {percentage === 100 ? "Ready to go! ✈" :
                    `you have ${numItems} items in your list, you already have packed ${numPacked} (${percentage}%)`}
            </em>
        </footer>
    );
}
