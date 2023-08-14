import React, { useReducer, createContext } from 'react';

export const WorkoutsContext = createContext();

//---------------
export const workoutsReducer = (state, action) => { //state the previous value
    switch (action.type) {
        case "SET_WORKOUTS": return { workouts: action.payload }
        case "CREATE_WORKOUTS": return { workouts: [action.payload, ...state.workouts] }
        case "DELETE_WORKOUT": return {
            workouts: state.workouts.filter((workout) =>
                workout._id !== action.payload._id
            )
        }
        case "UPDATE_WORKOUT": {
            const updatedWorkouts = state.workouts;
            updatedWorkouts[action.payload.index] = action.payload.workout;
            return { workouts: updatedWorkouts }
        }
        default: return state
    }
}
//---------------


export const WorkoutsContextProvider = ({ children }) => {

    //---------------
    //const [workouts, setWorkouts] = useState(null);
    const [state, dispatch] = useReducer(workoutsReducer, { workouts: null })
    //---------------

    return (
        <WorkoutsContext.Provider value={{ ...state, dispatch }}>
            {children}
        </WorkoutsContext.Provider>
    );
};

export default WorkoutsContextProvider;
