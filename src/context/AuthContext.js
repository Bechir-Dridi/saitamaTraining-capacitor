import { createContext, useEffect, useReducer } from 'react'

//A.------------------------ Context ------------------------
//B.------------------------ useReducer ------------------------
//C.------------------------ update user ------------------------
//A1. create the context
export const AuthContext = createContext()

//B2. create the reducer fct: the bank
const authReducer = (state, action) => {
    //state: the initial amount
    //action: dispatch
    switch (action.type) {
        case "LOGIN":
            return { user: action.payload }
        case "LOGOUT":
            return { user: null }
        default:
            return state
    }
}

//A2. create custom component to wrap all my application in "App.js",
//and provide value from "AuthContext"
export const AuthContextProvider = ({ children }) => {
    //children represents the components wrapped in "App.js"

    //A3. Register the state
    //  const [workouts, setWorkouts] = useState(null);

    //B1. define the "amount of money" and "dispatch: the pigeon"
    const [state, dispatch] = useReducer(authReducer, { user: null })
    //reducer: the bank
    //{ user: null }: the initial amount
    //dispatch: gonna dispatch the payload to the "reducer: bank"

    //C1. if we refresh we check if there's token in ls so we stay logged in
    //    update "user" once "AuthContextProvider" renders.
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"))
        //parse:convert from json to obj

        //if we have a user in the storage, update with it the user value in the app.
        if (user) {
            dispatch({ type: "LOGIN", payload: user })
        }
    }, [])

    //B2.
    console.log("AuthContext state:", state)

    return (
        //A4.return the AuthContext
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {/*value to pass it to wrapped components .
              u can write only "state" because we have one property.*/}
            {children}
            {/*if we wrap 'App.js' component, so "children" is "App.js" */}
        </AuthContext.Provider>
    )
}

// A5. import the context in "index.js"
// import { AuthContextProvider } from './context/AuthContext';

// root.render(
//   <React.StrictMode>
//     <AuthContextProvider>
//       <WorkoutsContextProvider>
//         <App />
//       </WorkoutsContextProvider>
//     </AuthContextProvider>
//   </React.StrictMode>
// );


// A6.create a context hook:
// ---/frontend/src/hooks/useAuthContext.js
// import {AuthContext} from "../context/AuthContext"
// import {useContext} from "react"

// export const useAuthContext = ()=>{
// const context = useContext(AuthContext)

// if(!context){
// throw Error ("useAuthContext must be used inside an AuthContextProvider")
// }
// return context

// }
// ---
