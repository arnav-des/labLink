import React from "react";
import "./HomePage.css";
// import Certificate from "./components/Certificate";

function HomePage() {
  return (
    <div className="homeMain">
      <div className="certificateMain">Certificate:</div>

      <div className="loginMain">
        <button className="loginEngineer">Login For Engineer!</button>
      </div>
    </div>
  );
}

export default HomePage;
