const initialStateAccount = {
    balance: 0,
    loan: 0,
    loanPurpose: "",
}

// * Reducer Function

export default function accountReducer(currentState = initialStateAccount, action) {
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

// ? Action Creators
export function deposit(amount) {
    return {
        type: "account/deposit",
        payload: amount
    }
}
export function withdraw(amount) {
    return {
        type: "account/withdraw",
        payload: amount
    }
}
export function requestLoan(amount, purpose) {
    return {
        type: 'account/requestLoan', payload: {
            amount: amount,
            purpose: purpose
        }
    }
}
export function payLoan() {
    return {
        type: 'account/payLoan'
    }
}

// ! Dispatch Functions
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

