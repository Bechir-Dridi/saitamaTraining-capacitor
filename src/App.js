import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { useAuthContext } from "./hooks/useAuthContext";
import "./index.css"
//import scss:
import "./css/main.min.css"
//pages & components
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import AddWorkout from "./pages/AddWorkout";
import Training from "./components/Training";

function App() {
  //A.Protect the Route
  //A1.grab user
  const { user } = useAuthContext()
  return (
    //I change the bg in index.css 
    <div className="app-container bg-saiYellowBg">
      <BrowserRouter>
        {/* Navbar should be inside the BrowserRouter */}
        <Navbar />
        <Routes>

          {/* A2. */}
          <Route path="/" exact element={user ? <Home /> : <Navigate to="/training" />} />
          <Route path="/training" element={!user ? <Training /> : null} />
          <Route path="/add_workout" element={user ? <AddWorkout /> : <Navigate to="/login" />} />
          <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />} />
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
