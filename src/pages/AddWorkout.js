import { useState } from "react";
//A1. make access to the user:
import { useAuthContext } from '../hooks/useAuthContext'


const AddWorkout = () => {
    const [title, setTitle] = useState("")
    const [reps, setReps] = useState("")
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(null)

    // grab user from the Authcontext hook
    const { user } = useAuthContext()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)

        const workout = { title, reps }

        const response = await fetch("https://saitama-server.onrender.com/api/workouts",
            {
                method: "POST",
                body: JSON.stringify(workout),
                headers: {
                    "content-Type": "application/json",
                    'Authorization': `Bearer ${user.token}`
                }
            }
        )
        const json = await response.json()
        if (!response.ok) {
            setError(json.Post_error)
        }
        if (response.ok) {
            setTitle("")
            setReps("")
            setIsLoading(false)
            setError(null)
            console.log("new workout added", json)
        }
    }


    return (
        <div class="container-md">
            <div class="row g-5 justify-content-around align-items-center">
                <div class="col-md-6">
                    <form onSubmit={handleSubmit} className=" bg-workoutBg rounded border shadow">
                        <h3>Add a New Workout</h3>
                        <div class="mb-3">
                            <label for="myTitle" class="form-label">workout title</label>
                            <input type="text" class="form-control" id="myTitle" value={title} aria-describedby="textHelp"
                                onChange={(e) => setTitle(e.target.value)}
                            // value:if we change the value in the state,
                            //       it reflects back the change in the input here. 
                            />

                        </div>
                        <div class="mb-3">
                            <label for="myReps" class="form-label">reps/distance(klm)</label>
                            <input type="number" class="form-control" id="myReps" aria-describedby="textHelp"
                                onChange={(e) => setReps(e.target.value)}
                                value={reps} //make it hidden(black dots)
                            />
                        </div>

                        <button
                            disabled={isLoading}
                            type="submit" class="btn btn-danger">
                            Add workout
                        </button>

                        {error && <div className="text-danger py-1">{error}</div>}
                        {isLoading && <div className="text-success py-1"><p>Workout added successfully</p></div>}
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddWorkout;