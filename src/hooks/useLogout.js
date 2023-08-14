import { useAuthContext } from "./useAuthContext"
import { useWorkoutContext } from "./useWorkoutContext"


export const useLogout = () => {
    const { dispatch } = useAuthContext()
    const { dispatch: workoutsDispatch } = useWorkoutContext()
    const logout = () => {
        //remove token form the storage
        localStorage.removeItem("user")

        //dispatch logout action
        dispatch({ type: "LOGOUT" })

        //setWorkouts to null after logging out to avoid flashing
        workoutsDispatch({ type: "SET_WORKOUTS", payload: null })
    }

    return { logout }
}
