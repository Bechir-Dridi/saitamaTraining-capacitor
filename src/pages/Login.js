import { useState } from "react";
import { useLogin } from "../hooks/useLogin";

//A.------------------------ Login ------------------------
//B.------------------ add useLogin hook ------------------
const Login = () => {
    //A1. we gonna use useState to track what user typing
    const [email, setEmail] = useState('')//setEmail to update our value
    const [password, setPassword] = useState('')
    //B1.destructure the useSignup:
    const { login, isLoading, error } = useLogin()

    //A3. create handleSubmit
    const handleSubmit = async (e) => {
        //async:because we gonna do a request to the backend

        e.preventDefault() //prevent refersh

        //B2. 
        //console.log(email, password)
        await login(email, password)
    }


    return (
        //A2. set the form
        <div class="container-md mt-5 pt-3">
            <div class="row g-5 justify-content-around align-items-center">
                <div class="col-md-6">
                    <form onSubmit={handleSubmit} className=" bg-workoutBg rounded border shadow">
                        <h3>Login</h3>
                        <div class="mb-3">
                            <label for="myEmail" class="form-label">Email:</label>
                            <input type="email" class="form-control" id="myEmail" aria-describedby="textHelp"
                                onChange={(e) => setEmail(e.target.value)}
                            // value:if we change the value in the state,
                            //       it reflects back the change in the input here. 
                            />

                        </div>
                        <div class="mb-3">
                            <label for="myPassword" class="form-label">Password:</label>
                            <input type="password" class="form-control" id="myPassword" aria-describedby="textHelp"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password} //make it hidden(black dots)
                            />
                        </div>

                        <button
                            //B3. 
                            disabled={isLoading}
                            type="submit" class="btn btn-danger">
                            Login
                        </button>

                        {/* B3. */}
                        {isLoading && <div className="py-1 text-center">Loading...</div>}
                        {error && <div className="text-danger py-1">{error}</div>}
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;

//A4. Register route for the form
//--- src/pages/App.js ---
//<Route path="/login" element={<Login />} />


