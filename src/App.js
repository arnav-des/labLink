import { Route, Routes } from "react-router-dom";
import "./App.css";
// import Certificate from "./components/Certificate";
import HomePage from "./pages/HomePage";
import Details from "./components/Details"
import { useState } from "react";
import Approve from "./pages/Approve";
import NablSite from "./pages/NablSite";
function App() {
  const[isAuth,setIsAuth]=useState(false);

  return (
    <>
      {/* <Certificate /> */}
      <Routes>
        
        <Route path="/" element={<HomePage  setIsAuth={setIsAuth} isAuth={isAuth} />} />
        <Route path="/details" element={<Details  setIsAuth={setIsAuth} isAuth={isAuth}/>} />
        <Route path="/approve" element={<Approve />}/>
        <Route path="/nabl" element={<NablSite />}/>
      </Routes>
    </>
  );
}

export default App;
