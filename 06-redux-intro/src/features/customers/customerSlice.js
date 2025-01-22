import { createSlice } from "@reduxjs/toolkit"
const initialState = {
    fullName: "",
    nationalID: "",
    createdAt: ""
}
// * Reducer Function

const customerSlice = createSlice({
    name: "customer",
    initialState,
    reducers: {
        createCustomer: {
            prepare(fullName, nationalID,) {
                return {
                    payload: {
                        fullName,
                        nationalID,
                        createdAt: new Date().toISOString()
                    }
                }
            }
            , reducer(currentState, action) {
                currentState.fullName = action.payload.fullName
                currentState.nationalID = action.payload.nationalID
                currentState.createdAt = action.payload.createdAt
            },
        }, updateName(currentState, action) {
            currentState.fullName = action.payload
        }
    }
})
export const { createCustomer, updateName } = customerSlice.actions
export default customerSlice.reducer
// export default function customerReducer(currentState = initialStateCustomer, action) {
//     switch (action.type) {
//         case "customer/createCustomer": return {
//             ...currentState,
//             fullName: action.payload.fullName,
//             nationalID: action.payload.nationalID,
//             createdAt: action.payload.createdAt
//         }
//         case "customer/updateName": return {
//             ...currentState,
//             fullName: action.payload
//         }
//         default:
//             return currentState

//     }
// }

// ? Action Creator
// export function createCustomer(fullName, nationalID) {
//     return {
//         type: "customer/createCustomer", payload: {
//             fullName,
//             nationalID,
//             createdAt: new Date().toISOString()
//         }
//     }
// }
// export function updateName(fullName) {
//     return { type: 'customer/updateName', payload: fullName }
// }
// ! Dispatch Functions
// store.dispatch(createCustomer("Sumeet Swain", crypto.randomUUID()))
// console.log(store.getState())


