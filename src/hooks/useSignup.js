import { useState } from "react"
import { useAuthContext } from "./useAuthContext"
//import plugin:
import { CapacitorHttp } from '@capacitor/core';


export const useSignup = () => {
    //A1. set the error and loading
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()
    //A2. create the signUp fct
    const signup = async (email, password) => {
        setIsLoading(true)
        setError(null)

        const response = await CapacitorHttp.request({

            method: "POST",
            url: "https://saitama-server.onrender.com/api/user/signup",
            headers: { "Content-Type": 'application/json' },
            //: JSON.stringify({ email, password })
            data: JSON.stringify({ email, password })
        })
        //const json = await response.json()
        const json = await response.data
        console.log("ohoSign:", json)

        //if (!response.ok) {
        if (json.error) {
            setIsLoading(false)
            setError(json.error)
        }

        //if (response.ok) {
        if (!json.error) {
            //save the user to local storage
            localStorage.setItem("user", JSON.stringify(json)) //json=>"email" and "token"
            //update the authContext(change the login state)
            dispatch({ type: "LOGIN", payload: json })

            setIsLoading(false)
            setError(null)

        }
    }
    return { signup, isLoading, error }

}

