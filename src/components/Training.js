import { React, useRef } from 'react';
import { Link } from 'react-router-dom';
import "../index.css"
//import media
import saiLogo from "../media/saiLogo.png"
import fitnessTest from '../media/fitnessTest.mp4'



const Training = () => {

    const videoRef = useRef(null);

    const handleVideoEnded = () => {
        videoRef.current.play();
    }


    return (
        <div className='training-container'>
            <section className='training mt-5'>

                <div class="container-md">
                    <div class="row g-5  align-items-center">
                        <div class="col-12 col-lg-12 justify-content-center d-flex align-items-center">
                            <img src={saiLogo} width="80px" alt="Logo" class="img-fluid" />
                            <Link to="/" class="text-muted fst-italic ms-3 display-5 text-center text-decoration-none">Go beyond your limits</Link>
                        </div>
                    </div>
                </div>

                <div className="vid justify-content-around align-items-center">
                    <div className="video-container">
                        <video
                            src={fitnessTest}
                            ref={videoRef} // Assign the ref to the video element
                            autoPlay
                            muted
                            playsInline // Add this attribute for mobile autoplay
                            preload="auto" // Preload the video
                            className="object-fit-sm-contain img-fluid"
                            alt="video"
                            // --- replay video ---
                            // method1:
                            onEnded={handleVideoEnded}
                        // method2:using video property: loop
                        />
                        <div className="video-text">
                            <h2>You wanna be like Saitama!</h2>
                            <h3>You are in the right place.</h3>
                        </div>
                    </div>
                </div>

                <div className="row justify-content-around align-items-center">

                    <div class="row mt-5 justify-content-around align-items-center">
                        <div class="col-8 col-lg-8">
                            <p class="lead text-muted text-center">This app is designed to help you track your journey to reach the goal of 100 pushups, 100 situps, 100 squats and an 8-kilometer jog.</p>
                        </div>
                    </div>

                    <div class="row my-1 justify-content-around align-items-center">
                        <div id="carouselExample" class="bg-dark col-8 col-lg-8 rounded carousel slide" data-bs-ride="carousel">

                            <div class="carousel-inner">
                                <div class="carousel-item active carousel-image bg-img-1" data-bs-interval="3000">
                                    {/* <img src={pushups} alt="pushups" /> */}
                                    <div class="carousel-caption d-none d-md-block">
                                        <h5>pushups</h5>
                                    </div>
                                </div>
                                <div class="carousel-item carousel-image bg-img-2" data-bs-interval="3000">
                                    {/* <img src={situps} alt="situps" /> */}
                                    <div class="carousel-caption d-none d-md-block">
                                        <h5>situps</h5>
                                    </div>
                                </div>
                                <div class="carousel-item carousel-image bg-img-3" data-bs-interval="3000">
                                    {/* <img src={situps} alt="situps" /> */}
                                    <div class="carousel-caption d-none d-md-block">
                                        <h5>squats</h5>
                                    </div>
                                </div>
                                <div class="carousel-item carousel-image bg-img-4" data-bs-interval="3000">
                                    <div class="carousel-caption d-none d-md-block">
                                        {/* <img src={jog} alt="jog" /> */}
                                        <h5>jog</h5>
                                    </div>
                                </div>
                            </div>

                            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Previous</span>
                            </button>
                            <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Next</span>
                            </button>
                        </div>
                    </div>

                </div>
            </section >

            <div class="row my-1 justify-content-around align-items-center">
                <div class="col-6 col-lg-4 text-center">
                    <Link to='/login' class="m-1 btn btn-lg btn-danger">Login</Link>
                    <Link to='/signup' class="m-1 btn btn-lg btn-outline-danger ">Signup</Link>
                </div>
            </div>
        </div >
    );
}

export default Training;
