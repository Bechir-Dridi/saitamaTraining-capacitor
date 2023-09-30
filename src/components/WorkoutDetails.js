import React, { useState } from 'react';
import { formatDistanceToNow } from 'date-fns'; // Import the specific function from date-fns
import "../index.css"

import bin from '../media/bin.svg';
import edit from '../media/edit.svg';

//import plugin:
import { CapacitorHttp } from '@capacitor/core';

//import Context
// import { useWorkoutContext } from "../hooks/useWorkoutContext"
//A------ Authorized req ------
//A1. make access to the user:
// import { useAuthContext } from '../hooks/useAuthContext'


const WorkoutDetails = ({ workout, index, user, dispatch }) => {
    //grab dispatch
    //const { dispatch } = useWorkoutContext()
    //A2. grab user from the hook
    // const { user } = useAuthContext()

    const handleClick = async () => {
        try {
            //A3. if we don't have user
            if (!user) {
                // setError("You must be logged in")
                return
            }

            const response = await CapacitorHttp.request({
                method: 'DELETE',
                url: `https://saitama-server.onrender.com/api/workouts/${workout._id}`,
                headers: {
                    //A4.send the authorization headers
                    'Authorization': `Bearer ${user.token}`
                }

            });
            //const json = await response.json();
            const json = await response.data
            //if (response.ok) {
            if (!json.error) {
                console.log('The deleted workout', json.workout);
                dispatch({ type: 'DELETE_WORKOUT', payload: json.workout })
                //window.location.reload();
            }
        } catch (error) {
            console.error('Error deleting workout:', error);
        }
    };

    const [title, setTitle] = useState(workout.title);
    const [reps, setReps] = useState(workout.reps);
    const [toggle, setToggle] = useState(true);

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            if (!user) {
                // setError("You must be logged in")
                return
            }


            const newData = { title, reps };

            const response = await CapacitorHttp.request({
                method: 'PUT', // Use "PUT" to update data
                url: `https://saitama-server.onrender.com/api/workouts/${workout._id}`,
                headers: {
                    'Content-Type': 'application/json',
                    //A4.send the authorization headers
                    'Authorization': `Bearer ${user.token}`
                },
                data: JSON.stringify(newData),
            });

            const json = await response.data

            if (!json.error) {
                const updatedWorkout = { ...workout, ...newData };
                dispatch({ type: 'UPDATE_WORKOUT', payload: { index, workout: updatedWorkout } });
                console.log("the new workout", updatedWorkout)
                setToggle(!toggle)
                //setTitle('')
                //setReps("")
                //window.location.reload();
            }
        } catch (error) {
            console.error('Error updating data:', error);
        }
    };



    const toggleHandler = () => {
        setToggle(!toggle)
    }

    return (
        <div className="workout-details">
            <section id="topics">
                <div className="container-md">
                    <div className="row my-2 g-2 justify-content-start bg-workoutBg rounded border shadow">
                        {toggle
                            ? <div className="row g-2">
                                <div className="col-6">
                                    <h4 className="text-saiRed">{workout.title}</h4>
                                    <p>
                                        <strong>reps/distance(klm)</strong> <span className="lead">{workout.reps}</span>
                                    </p>
                                    <p className="lead">
                                        {workout.updatedAt
                                            ? formatDistanceToNow(new Date(workout.updatedAt), { addSuffix: true })
                                            : formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}
                                    </p>
                                </div>
                                <div className="col-6 text-end">

                                    <span onClick={handleClick} className='hovro'>
                                        <img src={bin} width="22px" alt="Logo" className="img-fluid me-3" />
                                    </span>

                                    <span onClick={toggleHandler} className='hovro'>
                                        <img src={edit} width="22px" alt="Logo" className="img-fluid" />
                                    </span>

                                </div>
                            </div>
                            : <form onSubmit={handleSubmit} className=" row my-2 g-2 justify-content-start">
                                <div className="col-6">
                                    <div className="mb-3">
                                        <label htmlFor="TEXT" className="form-label">
                                            Workout title:
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="TEXT"
                                            aria-describedby="textHelp"
                                            onChange={(e) => setTitle(e.target.value)}
                                            value={title}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="REPS" className="form-label">
                                            Reps / distance(klm):
                                        </label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="REPS"
                                            aria-describedby="textHelp"
                                            onChange={(e) => setReps(e.target.value)}
                                            value={reps}
                                        />
                                    </div>

                                    <div className='d-flex justify-content-between'>
                                        <div>
                                            <button type="submit" className="btn btn-danger">
                                                Update
                                            </button>
                                        </div>
                                        <div>
                                            <button onClick={toggleHandler} className="btn btn-light btn-outline-danger">
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-6 text-end">

                                    <span onClick={handleClick} className='hovro'>
                                        <img src={bin} width="22px" alt="Logo" className="img-fluid me-3 white-text" />
                                    </span>

                                    <span onClick={toggleHandler} className='hovro'>
                                        <img src={edit} width="22px" alt="Logo" className="img-fluid " />
                                    </span>
                                </div>
                            </form>}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default WorkoutDetails;
