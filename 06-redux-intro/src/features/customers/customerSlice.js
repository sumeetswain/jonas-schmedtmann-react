const initialStateCustomer = {
    fullName: "",
    nationalID: "",
    createdAt: ""
}
// * Reducer Function

export default function customerReducer(currentState = initialStateCustomer, action) {
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

// ? Action Creator
export function createCustomer(fullName, nationalID) {
    return {
        type: "customer/createCustomer", payload: {
            fullName,
            nationalID,
            createdAt: new Date().toISOString()
        }
    }
}
export function updateName(fullName) {
    return { type: 'customer/updateName', payload: fullName }
}
// ! Dispatch Functions
// store.dispatch(createCustomer("Sumeet Swain", crypto.randomUUID()))
// console.log(store.getState())


