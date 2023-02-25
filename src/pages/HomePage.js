
import React, { useState } from 'react'
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
// import { useNavigate } from "react-router-dom";

import "./HomePage.css"


function HomePage() {

    const[isAuth,setIsAuth]=useState(false);

    // const navigate = useNavigate();

    const signInWithGoogle = async () => {
      const result = await signInWithPopup(auth, provider);
      console.log(result);
      if(result){
        setIsAuth(true);
        localStorage.setItem("isAuth",true);
        // navigate("/");
        console.log(result);
      }
    }
  return (
    <div className="homeMain">
      <div className="certificateMain">Certificate:</div>

      <div className="loginMain">
        <button className="loginEngineer">Login For Engineer!</button>
      </div>
    </div>

    <div className='loginMain'>
        <button className='loginEngineer' onClick={signInWithGoogle}>
            Login For Engineer!
        </button>

    </div>

</div>

    )

}

export default HomePage;
