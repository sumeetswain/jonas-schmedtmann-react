import React from "react"
import ReactDOM from "react-dom/client"
import { pizzaData } from "./data"
import "./index.css"
function App() {
    return (
        <div className="container">
            <Header />
            <Menu />
            <Footer />
        </div>
    )
}
function Header() {
    // const style =
    //     { color: "red", fontSize: "48px", textTransform: "uppercase" }
    const style =
        {}
    return (
        <header className="header">
            <h1 style={style} >Fast React Pizza Co.</h1>
        </header>
    )
}
const Menu = () => {
    return (
        <main className="menu">
            <h2>Our Menu</h2>
            <Pizza />
        </main>
    )
}
const Footer = () => {
    const hour = new Date().getHours()
    const openHour = 12
    const closeHour = 22
    const isOpen = hour >= openHour && hour <= closeHour
    isOpen ? console.log("we're currently open!") : console.log("sorry we are closed")
    console.log(hour)
    return (<footer>We are currently open</footer>)
}
function Pizza() {
    return <h2>Pizza</h2>
}
const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(<App />)