import { useState } from "react"
import { useAuthContext } from "./useAuthContext"
//import plugin:
import { CapacitorHttp } from '@capacitor/core';

export const useLogin = () => {
    //A1. set the error and loading
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()
    //A2. create the signUp fct
    const login = async (email, password) => {
        setIsLoading(true)
        setError(null)

        const response = await CapacitorHttp.request({
            //I didn't mention localhost 3000 because in package.json,
            //I added this=>  "proxy": "http://localhost:4000",
            //It avoids also cors error

            method: "POST",
            url: "https://saitama-server.onrender.com/api/user/login",
            headers: { "Content-Type": 'application/json', },
            data: JSON.stringify({ email, password })
        })
        //const json = await response.json()
        const json = await response.data
        console.log("ohoLog:", json)

        if (json.error) {
            setIsLoading(false)
            setError(json.error)
        }

        if (!json.error) {
            //1.save the user to local storage
            localStorage.setItem("user", JSON.stringify(json)) //json=>"email" and "token"
            //2.update the authContext(change the login state)
            dispatch({ type: "LOGIN", payload: json })

            setIsLoading(false)
            setError(null)

        }
    }
    return { login, isLoading, error }

}

