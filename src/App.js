import Header from "./components/Header";
import { Route ,Routes } from "react-router-dom";
import Home from "./pages/Home";
import Calendar from "./pages/Calendar";
import About from "./pages/About";
import Gym from "./pages/Gym";
import { useContext } from "react";
import SigningPage from "./pages/SigningPage";
import DataContext from "./context/DataContext";
import Footer from "./components/Footer";
import Missing from "./pages/Missing";
import ErrorPopUp from "./components/ErrorPopUp";
import LoadingScreen from "./components/LoadingScreen";
import ExerciseFocus from "./pages/ExerciseFocus";
import User from "./pages/User";
import AddWorkout from "./components/AddWorkout";
function App() {
  const {user}=useContext(DataContext)
  return (
    <div className="App">
      <ErrorPopUp/>
      <LoadingScreen/>
      <AddWorkout/>
        {user.userEmail ? 
        <>
        <Header/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/gym" element={<Gym/>}/>
          <Route path="/calendar" element={<Calendar/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/exerciseFocus" element={<ExerciseFocus/>}/>
          <Route path="/user" element={<User/>}/>
          <Route path="*" element={<Missing/>}/>
        </Routes>
        <Footer/>
        </>
        : <SigningPage/>
      }
    </div>
  );
}

export default App;
