import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import WorkoutDetails from '../components/WorkoutDetails';
import { useAuthContext } from '../hooks/useAuthContext';
import { useWorkoutContext } from '../hooks/useWorkoutContext';

const Home = () => {
    const { user } = useAuthContext();
    const { workouts, dispatch } = useWorkoutContext();
    const navigate = useNavigate();

    const fetchWorkouts = async () => {
        try {
            const response = await fetch('https://saitama-server.onrender.com/api/workouts', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            });

            if (response.ok) {
                const json = await response.json();
                dispatch({ type: 'SET_WORKOUTS', payload: json.workouts });
            }
        } catch (error) {
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
        <div className="Home">
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
                                ) : null /* No need for Navigate here */}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
