import Header from "./components/Header";
import { Route ,Routes } from "react-router-dom";
import Home from "./pages/Home";
import Calendar from "./pages/Calendar";
import About from "./pages/About";
import Gym from "./pages/Gym";
import { useContext, useState } from "react";
import SigningPage from "./pages/SigningPage";
import DataContext from "./context/DataContext";
import Footer from "./components/Footer";
function App() {
  const {user}=useContext(DataContext)
  return (
    <div className="App">
        {user.userEmail ? 
        <>
        <Header/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/gym" element={<Gym/>}/>
          <Route path="/calendar" element={<Calendar/>}/>
          <Route path="/about" element={<About/>}/>
        </Routes>
        <Footer/>
        </>
        : <SigningPage/>
      }
    </div>
  );
}

export default App;
