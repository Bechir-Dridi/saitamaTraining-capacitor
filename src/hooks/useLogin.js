import { useState } from "react"
import { useAuthContext } from "./useAuthContext"

export const useLogin = () => {
    //A1. set the error and loading
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()
    //A2. create the signUp fct
    const login = async (email, password) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch("https://saitama-server.onrender.com/api/user/login", {
            //I didn't mention localhost 3000 because in package.json,
            //I added this=>  "proxy": "http://localhost:4000",
            //It avoids also cors error
            method: "POST",
            headers: { "Content-Type": 'application/json', },
            body: JSON.stringify({ email, password })
        })
        const json = await response.json()

        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }

        if (response.ok) {
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

