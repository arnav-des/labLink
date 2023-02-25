
import React, { useState,useEffect } from 'react'
import { auth, provider,db } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { collection, getDocs} from "firebase/firestore";
import moment from 'moment'
import "./HomePage.css"


function HomePage({setIsAuth,isAuth}) {
 
  const[userData,setUserData]=useState({});


  const [dataList,setDataList]=useState([]);
  const dataCollectionRef = collection(db, "machineData");
 
  useEffect(() => {
    const getList = async () => {
      const data = await getDocs(dataCollectionRef);
      setDataList(data.docs.map((elem) => ({ ...elem.data(), id: elem.id })));
    };

  

    getList();
  }, []);

 console.log(dataList);



    const navigate = useNavigate();

    const signInWithGoogle = async () => {
      const result = await signInWithPopup(auth, provider);
      console.log(result);
      if(result){
        setIsAuth(true);
        localStorage.setItem("isAuth",true);
        setUserData(result);
        navigate("/details");
      }
    }
  return (
    <div className="homeMain">
      <div className="certificateMain">

    <h1 className='certificateHead'>Certificate</h1>
    <div>
      {
        dataList?.map((certificate)=>{

          return(
          <>
         
              <div>
            <h3>Manufacturer: {certificate.manufacturer}</h3>
            <h3>Liscense: {certificate.liscense}</h3>
            <h3>Model Number: {certificate.model}</h3>
            <h3>Owner: {certificate.owner}</h3>
            <h3>Purchase Date: {moment(certificate.purchaseDate).format("MMM Do YY")}</h3>
            <h3>Last Service Date: {moment(certificate.lastService).format("MMM Do YY")}</h3>
            <h3>Next Service Date: {moment(certificate.nextService).format("MMM Do YY")}</h3>
            
              </div>
          
          
          </>
          );
        })
      }
    </div>

      </div>

      

    <div className='loginMain'>
        <button className='loginEngineer' onClick={signInWithGoogle}>
            Login For Engineer!
        </button>

    </div>
    
      

    <div className='loginMain'>
        <Link to="/approve" className='loginEngineer'  >

            Get Certified by NABL
        </Link>

    </div>
    

</div>

    )

}

export default HomePage;
