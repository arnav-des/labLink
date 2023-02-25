
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

          var t = new Date();
          t.setSeconds( certificate.purchaseDate );
          console.log(t);
          var purchaseDate = moment(t).format("dd.mm.yyyy hh:MM:ss");
          var t1 = new Date();
          t.setSeconds( certificate.lastService );
          console.log(t);
          var lastService = moment(t1).format("dd.mm.yyyy hh:MM:ss");
          var t2 = new Date();
          t.setSeconds( certificate.nextService );
          console.log(t);
          var nextService = moment(t2).format("dd.mm.yyyy");

          return(
          <>
         
              <div>
            <h3>Manufacturer: {certificate.manufacturer}</h3>
            <h3>Liscense: {certificate.liscense}</h3>
            <h3>Model Number: {certificate.model}</h3>
            <h3>Owner: {certificate.owner}</h3>
            <h3>Purchase Date: {purchaseDate}</h3>
            <h3>Last Service Date: {lastService}</h3>
            <h3>Next Service Date: {nextService}</h3>
            
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
