import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WorkoutDetails from '../components/WorkoutDetails';
import { useAuthContext } from '../hooks/useAuthContext';
import { useWorkoutContext } from '../hooks/useWorkoutContext';
//import plugin:
//import plugin:
import { CapacitorHttp } from '@capacitor/core';


const Home = () => {
    const [isLoading, setIsLoading] = useState(null)

    const { user } = useAuthContext();
    const { workouts, dispatch } = useWorkoutContext();
    const navigate = useNavigate();

    const fetchWorkouts = async () => {
        setIsLoading(true)
        try {
            const response = await CapacitorHttp.request({
                method: 'GET',
                url: 'https://saitama-server.onrender.com/api/workouts',
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            });

            const json = await response.data
            if (!json.error) {
                setIsLoading(false)
                dispatch({ type: 'SET_WORKOUTS', payload: json.workouts });
            }
        } catch (error) {
            setIsLoading(false)
            console.error('Error fetching workouts:', error);
        }
    };

    useEffect(() => {
        if (user) {
            fetchWorkouts();
        }
    }, [user, dispatch]);

    console.log('Get Workouts', workouts);

    if (workouts && workouts.length === 0) {
        navigate('/add_workout');
    }

    return (
        <div className="Home mt-5 pt-3">
            {isLoading && <div className="py-1 display-5 text-center">Loading...</div>}

            <section id="topics">
                <div className="container-md">
                    <div className="row g-5 justify-content-around align-items-center">
                        <div className="col-md-6">
                            <div className="workouts">
                                {workouts ? (
                                    workouts.map((workout, index) => (
                                        <WorkoutDetails
                                            key={workout._id}
                                            workout={workout}
                                            index={index}
                                            user={user}
                                            dispatch={dispatch}
                                        />
                                    ))
                                ) : navigate("/add_workout")}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
