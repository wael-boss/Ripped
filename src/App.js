import Header from "./components/Header";
import { Route ,Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Gym from "./pages/Gym";
import { useContext, useEffect } from "react";
import SigningPage from "./pages/SigningPage";
import DataContext from "./context/DataContext";
import Footer from "./components/Footer";
import Missing from "./pages/Missing";
import ErrorPopUp from "./components/ErrorPopUp";
import LoadingScreen from "./components/LoadingScreen";
import ExerciseFocus from "./pages/ExerciseFocus";
import User from "./pages/User";
import AddWorkout from "./components/AddWorkout";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import Peaple from "./pages/Peaple";
import EditProfile from "./components/Settings/EditProfile";
import EditSecondaryColor from "./components/Settings/EditSecondaryColor";
import ChangePassword from "./components/Settings/ChangePassword";
import DeleteAcount from "./components/Settings/DeleteAcount";
function App() {
  const {user}=useContext(DataContext)
  return (
    <div className="App">
      <ErrorPopUp/>
      <LoadingScreen/>
      <AddWorkout/>
        {user.userName ? 
        <>
        <Header/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/gym" element={<Gym/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/exercise_focus" element={<ExerciseFocus/>}/>
          <Route path="/user" element={<User/>}/>
          <Route path="/peaple" element={<Peaple/>}/>
          <Route path="/settings" element={<Settings/>}>
            <Route path="edit_profile" element={<EditProfile/>}/>
            <Route path="edit_color" element={<EditSecondaryColor/>}/>
            <Route path="change_password" element={<ChangePassword/>}/>
            <Route path="delete_acount" element={<DeleteAcount/>}/>
          </Route>
          <Route path="/profile" element={<Profile/>}/>
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
