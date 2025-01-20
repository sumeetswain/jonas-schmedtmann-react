import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    balance: 0,
    loan: 0,
    loanPurpose: "",
    isLoading: false
}

// * Reducer Function

const accountSlice = createSlice({
    name: "account",
    initialState,
    reducers: {
        deposit(state, action) {
            state.balance = state.balance + action.payload
        },
        withdraw(state, action) {
            state.balance = state.balance - action.payload
        },
        requestLoan: {
            prepare(amount, purpose) {
                return {
                    payload: { amount, purpose },
                }
            },
            reducer(state, action) {
                if (state.loan > 0) return
                state.loan = action.payload.amount
                state.loanPurpose = action.payload.purpose
                state.balance = state.balance + action.payload.amount
            }
        },
        payLoan(state, action) {
            state.balance -= state.loan
            state.loanPurpose = ""
            state.loan = 0
        }
    }

})

export const { deposit, withdraw, requestLoan, payLoan } = accountSlice.actions
export default accountSlice.reducer
// export default function accountReducer(currentState = initialState, action) {
//     switch (action.type) {
//         case "account/deposit":
//             return {
//                 ...currentState,
//                 balance: currentState.balance + action.payload,
//                 isLoading: false
//             }
//         case "account/withdraw":
//             return {
//                 ...currentState,
//                 balance: currentState.balance - action.payload
//             }
//         case "account/requestLoan": {
//             if (currentState.loan > 0) return currentState
//             return {
//                 ...currentState,
//                 loan: action.payload.amount,
//                 loanPurpose: action.payload.purpose,
//                 balance: currentState.balance + action.payload.amount
//             }
//         }
//         case "account/payLoan": {
//             return {
//                 ...currentState,
//                 loan: 0,
//                 loanPurpose: "",
//                 balance: currentState.balance - currentState.loan
//             }
//         }
//         case 'account/convertingCurrency':
//             return { ...currentState, isLoading: true }

//         default:
//             return currentState
//     }

// }

// // ? Action Creators
// export function deposit(amount, currency) {
//     if (currency === "USD") return {
//         type: "account/deposit",
//         payload: amount
//     }
//     return async function (dispatch, getcurrentState) {
//         dispatch({ type: 'account/convertingCurrency' })

//         const res = await fetch(`https://api.frankfurter.dev/v1/latest?base=${currency}&symbols=USD`)

//         const data = await res.json()
//         const converted = (amount * data.rates.USD).toFixed(2)
//         console.log(converted)

//         dispatch({ type: "account/deposit", payload: Number(converted) }
//         )
//     }
// }
// export function withdraw(amount) {
//     return {
//         type: "account/withdraw",
//         payload: amount
//     }
// }
// export function requestLoan(amount, purpose) {
//     return {
//         type: 'account/requestLoan', payload: {
//             amount: amount,
//             purpose: purpose
//         }
//     }
// }
// export function payLoan() {
//     return {
//         type: 'account/payLoan'
//     }
// }

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

