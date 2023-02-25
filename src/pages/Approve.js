import React, { useState,useEffect } from 'react'
import { auth, provider,db } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { addDoc, collection, getDocs } from "firebase/firestore";
import moment from 'moment'
import "./Approve.css"
function Approve() {

  const navigate = useNavigate();
  const [dataList,setDataList]=useState([]);
  const dataCollectionRef = collection(db, "machineData");
 const approveDataRef =collection(db,"approveData");
  useEffect(() => {
    const getList = async () => {
      const data = await getDocs(dataCollectionRef);
      setDataList(data.docs.map((elem) => ({ ...elem.data(), id: elem.id })));
    };

  

    getList();
  }, []);


const approveFunc=async()=>{
  // console.log("approve")
  const sendData = dataList[0];
  await addDoc(approveDataRef, {
 sendData
    
  });

  navigate("/");
}


  return (
 <div>

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
    <div className='approveLink'>
      <button className='approveBtn' onClick={approveFunc}>
        Get Approve
      </button>
    </div>

      </div>


 </div>
  )
}

export default Approve