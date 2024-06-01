import { React, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import "../index.css"
import twitter from "../media/twitter.svg"
import linkedin from "../media/linkedin.svg"
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {
    const { logout } = useLogout()
    const { user } = useAuthContext()
    const navigate = useNavigate(); // Get the navigate function from react-router-dom

    const handleLogout = () => {
        logout()
    }

    //show off canvas:
    const [showOffcanvas, setShowOffcanvas] = useState(false);
    const homeHandleClick = () => {
        setShowOffcanvas(false);
        console.log(showOffcanvas);
        navigate('/');
    };
    const addHandleClick = () => {
        setShowOffcanvas(false);
        console.log(showOffcanvas);
        navigate('/add_workout');
    };
    const signupHandleClick = () => {
        setShowOffcanvas(false);
        console.log(showOffcanvas);
        navigate('/signup');
    };
    const loginHandleClick = () => {
        setShowOffcanvas(false);
        // console.log(showOffcanvas);
        navigate('/login');
    };


    //copyrights date:
    // Get the current date:
    var currentDate = new Date();
    //Extract year:
    var year = currentDate.getFullYear();

    return (
        <header className="bg-saiYellow">
            <section id="topics">
                {/* tabs */}
                <nav class="navbar navbar-dark bg-saiYellow d-sm-block d-md-none ">
                    <div class="container-fluid">

                        <span> {user ? (
                            <li className="mb-2 d-flex justify-content-between">
                                <span className="text-dark">{user.email}</span>
                            </li>)
                            :
                            <Link to="/" class="text-danger ms-3 display-4 text-decoration-none fw-bold">Saitama Training</Link>
                        }
                        </span>{/* This creates a flexible space to push the button to the end */}
                        <button class="navbar-toggler bg-saiRed" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>

                        {/* showOffcanvas */}
                        <div className={`offcanvas offcanvas-start${showOffcanvas ? 'show' : ''}`} id="offcanvasDarkNavbar" tabIndex="-1" aria-labelledby="offcanvasDarkNavbarLabel">

                            <div class="offcanvas-header bg-saiYellowBg ">
                                <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                            </div>
                            <div class="offcanvas-body bg-saiYellowBg">
                                <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
                                    {user && (
                                        <li className="mb-2 d-flex justify-content-between">
                                            <span className="text-dark">{user.email}</span>
                                            <button className="btn btn-saiYellowBg btn-outline-saiRed" onClick={handleLogout}>Log out</button>
                                        </li>)
                                    }

                                    <li class="nav-item">
                                        <Link onClick={homeHandleClick} class="m-2 nav-link fw-bold text-light btn btn-danger" data-bs-dismiss="offcanvas" aria-current="page">Home</Link>
                                    </li>
                                    <li class="nav-item">
                                        <Link onClick={addHandleClick} class="m-2 nav-link fw-bold text-light text-saiRed btn btn-danger" data-bs-dismiss="offcanvas" aria-current="page">Add workout</Link>
                                    </li>
                                    <li class="nav-item mt-5">
                                        <Link onClick={signupHandleClick} class="m-2 nav-link fw-bold text-saiRed btn btn-outline-saiRed" data-bs-dismiss="offcanvas" aria-current="page">Signup</Link>
                                    </li>
                                    <li class="nav-item">
                                        <Link onClick={loginHandleClick} class="m-2 nav-link fw-bold text-saiRed btn btn-outline-saiRed" data-bs-dismiss="offcanvas" aria-current="page">Login</Link>
                                    </li>


                                </ul>

                                {/* copyrights footer */}
                                <footer className='mt-3 text-center border-top border-secondary '>
                                    <p className='mt-2 text-secondary'>Copyright © {year} Bdev. All Rights Reserved.</p>
                                    <p className='text-secondary'>Developed by:</p>
                                    <p className='fw-bold text-center'>
                                        <a className='text-muted text-decoration-none text-center' href='https://bechirdev.vercel.app' target="_blank" rel="noreferrer">bechirdev.vercel.app</a>
                                    </p>
                                    <div className='mx-5 d-flex justify-content-around'>
                                        <a className='border-outline-secondary text-decoration-none text-center' href="https://twitter.com/bechir7dridi" target="_blank" rel="noreferrer">
                                            <img src={twitter} width="44px" alt="twitter" className="img-fluid" />
                                        </a>
                                        <a className='text-decoration-none text-center' href='https://www.linkedin.com/in/bechir-dev' target="_blank" rel="noreferrer">
                                            <img src={linkedin} width="44px" alt="linkedin" className="img-fluid" />
                                        </a>
                                    </div>
                                </footer>
                            </div>
                        </div>
                    </div>
                </nav>



                <div className="tabs justify-content-center d-none d-md-flex">
                    <ul class="nav nav-tabs" id="myTab" role="tablist">
                        <div className="d-flex">
                            <Link to='/'>
                                <li>
                                    <button className="mx-1 btn btn-saiYellowBg btn-outline-saiRed" >Home</button>
                                </li>
                            </Link>
                            <Link to='/add_workout'>
                                <li>
                                    <button className="mx-1 btn btn-saiYellowBg btn-outline-saiRed" >Add workout</button>
                                </li>
                            </Link>
                        </div>
                    </ul>
                    <ul className="d-flex">
                        {!user && (
                            <div className="d-flex">
                                <li ><Link to="/signup"> <button className="btn btn-saiYellowBg btn-outline-saiRed">Signup</button></Link></li>
                                <li><Link to="/login"> <button className="mx-1 btn btn-saiYellowBg btn-outline-saiRed" >Login</button></Link></li>
                            </div>
                        )}

                        {user && (
                            <li>
                                <span>{user.email}</span>
                                <button className="btn btn-saiYellowBg btn-outline-saiRed" onClick={handleLogout}>Log out</button>
                            </li>)
                        }
                    </ul>
                </div>
            </section>
        </header >
    );
}

export default Navbar;