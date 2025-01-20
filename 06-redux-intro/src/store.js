import { createStore } from "redux"
const initialState = {
    balance: 0,
    loan: 0,
    loanPurpose: "",
}
function reducer(currentState = initialState, action) {
    switch (action.type) {
        case "account/deposit":
            return {
                ...currentState,
                balance: currentState.balance + action.payload
            }
        case "account/withdraw":
            return {
                ...currentState,
                balance: currentState.balance - action.payload
            }
        case "account/requestLoan": {
            if (currentState.loan > 0) return currentState
            return {
                ...currentState,
                loan: action.payload.amount,
                loanPurpose: action.payload.purpose,
                balance: currentState.balance + action.payload.amount
            }
        }
        case "account/payLoan": {
            return {
                ...currentState,
                loan: 0,
                loanPurpose: "",
                balance: currentState.balance - currentState.loan
            }
        }
        default:
            return currentState
    }

}

const store = createStore(reducer)
// store.dispatch({
//     type: "account/deposit",
//     payload: 500
// })
// store.dispatch({
//     type: "account/withdraw",
//     payload: 200
// })
// console.log(store.getcurrentState())

// store.dispatch({
//     type: 'account/requestLoan', payload: {
//         amount: 1000,
//         purpose: "buy car"
//     }
// })
// console.log(store.getcurrentState())

// store.dispatch({
//     type: "account/payLoan"
// })
// console.log(store.getcurrentState())

function deposit(amount) {
    return {
        type: "account/deposit",
        payload: amount
    }
}
function withdraw(amount) {
    return {
        type: "account/withdraw",
        payload: amount
    }
}
function requestLoan(amount, purpose) {
    return {
        type: 'account/requestLoan', payload: {
            amount: amount,
            purpose: purpose
        }
    }
}
function payLoan() {
    return {
        type: 'account/payLoan'
    }
}
store.dispatch(deposit(500))
console.log(store.getState())

store.dispatch(withdraw(200))
console.log(store.getState())

store.dispatch(requestLoan(2000, "Buy House"))
console.log(store.getState())

store.dispatch(payLoan())
console.log(store.getState())