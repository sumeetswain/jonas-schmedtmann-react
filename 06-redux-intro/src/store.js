import { combineReducers, createStore } from "redux"
const initialStateAccount = {
    balance: 0,
    loan: 0,
    loanPurpose: "",
}
const initialStateCustomer = {
    fullName: "",
    nationalID: "",
    createdAt: ""
}
function accountReducer(currentState = initialStateAccount, action) {
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
function customerReducer(currentState = initialStateCustomer, action) {
    switch (action.type) {
        case "customer/createCustomer": return {
            ...currentState,
            fullName: action.payload.fullName,
            nationalID: action.payload.nationalID,
            createdAt: action.payload.createdAt
        }
        case "customer/updateName": return {
            ...currentState,
            fullName: action.payload
        }
        default:
            return currentState

    }
}
const rootReducer = combineReducers({
    account: accountReducer,
    customer: customerReducer
})
const store = createStore(rootReducer)
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
store.dispatch(withdraw(200))
store.dispatch(requestLoan(2000, "Buy House"))
store.dispatch(payLoan())

function createCustomer(fullName, nationalID) {
    return {
        type: "customer/createCustomer", payload: {
            fullName,
            nationalID,
            createdAt: new Date().toISOString()
        }
    }
}
function updateName(fullName) {
    return { type: 'customer/updateName', payload: fullName }
}
store.dispatch(createCustomer("Sumeet Swain", crypto.randomUUID()))
console.log(store.getState())
