import Header from "./components/Header";
import { Route ,Routes } from "react-router-dom";
import Home from "./pages/Home";
import Calendar from "./pages/Calendar";
import About from "./pages/About";
import Gym from "./pages/Gym";
import { useContext, useState } from "react";
import SigningPage from "./pages/SigningPage";
import DataContext from "./context/DataContext";
function App() {
  const {signedIn}=useContext(DataContext)
  return (
    <div className="App">
        {signedIn ? 
        <>
        <Header/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/gym" element={<Gym/>}/>
          <Route path="/calendar" element={<Calendar/>}/>
          <Route path="/about" element={<About/>}/>
        </Routes>
        </>
        : <SigningPage/>
      }
    </div>
  );
}

export default App;
