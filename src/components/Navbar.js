import { Link } from "react-router-dom";
import "../index.css"
import saiLogo from "../media/saiLogo.png"
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {
    const { logout } = useLogout()
    const { user } = useAuthContext()

    const handleLogout = () => {
        logout()
    }
    return (
        <header className=" bg-saiYellow">
            <section id="topics">
                <div class="container-md">
                    <div class="row  g-5 justify-content-start align-items-center">
                        <div class="col-12 col-lg-12 d-flex align-items-center">
                            <img src={saiLogo} width="80px" alt="Logo" class="img-fluid" />
                            <Link to="/" class="text-danger ms-3 display-4 text-decoration-none fw-bold">Saitama Training</Link>
                        </div>
                    </div>
                </div>

                {/* tabs */}
                <div className="tabs d-flex justify-content-center">
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
        </header>
    );
}

export default Navbar;