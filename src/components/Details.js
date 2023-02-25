import React, { useEffect, useState } from "react";
import "./Details.css";
import { useNavigate } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../firebase";
import { ToastContainer, toast } from 'react-toastify';
export default function Details({ isAuth }) {
  const navigate = useNavigate();
  const [model, setModel] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [purchaseDate, setPurchaseDate] = useState(new Date());
  const [owner, setOwner] = useState("");
  const [liscense, setLiscense] = useState("");
  const [lastService, setLastService] = useState(new Date());
  const [nextService, setNextService] = useState(new Date());




  const dataCollectionRef = collection(db, "machineData");


  const uploadData= async ()=>{
    await addDoc(dataCollectionRef, {
      model,
      manufacturer,
      purchaseDate,
      owner,
      liscense,
      lastService,
      nextService,
      author: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
    });
    toast("Data Added Successfully!")
    navigate("/");


  }

  useEffect(() => {
    if (!isAuth) {
      navigate("/");
    }
  }, []);

  return (
    <div className="certificateData">
      {" "}
      <h1 className="certificateInputs">META DATA:</h1>
      <div className="certificateDetails">
        <h3 className="certificateInputs">Model Name:</h3>
        <input
          type="text"
          onChange={(e) => {
            setModel(()=>(e.target.value));
          }}
        />
      </div>
      <div className="certificateDetails">
        <h3 className="certificateInputs">Manufacturer:</h3>
        <input
          type="text"
          onChange={(e) => {
            setManufacturer(()=> (e.target.value));
          }}
        />
      </div>
      <div className="certificateDetails">
        <h3 className="certificateInputs">Purchase Date:</h3>
        <input
          type="date"
          autoComplete="off"
          // value={
          //   purchaseDate.getFullYear().toString() +
          //   "-" +
          //   (purchaseDate.getMonth() + 1).toString().padStart(2, 0) +
          //   "-" +
          //   purchaseDate.getDate().toString().padStart(2, 0)
          // }
          onChange={(e) => {
            setPurchaseDate(()=>(e.target.value));
          }}
        />
      </div>
      <div className="certificateDetails">
        <h3 className="certificateInputs">Owner:</h3>
        <input
          type="text"
          onChange={(e) => {
            setOwner( ()=>(e.target.value));
          }}
        />
      </div>
      <div className="certificateDetails">
        <h3 className="certificateInputs">License Number:</h3>
        <input
          type="text"
          onChange={(e) => {
            setLiscense(()=>(e.target.value));
          }}
        />
      </div>
      <h1 className="certificateInputs">RECENT STATUS:</h1>
      <div className="certificateDetails">
        <h3 className="certificateInputs">Last Service Date:</h3>
        <input
          type="date"
          autoComplete="off"
          // value={
          //   lastService.getFullYear().toString() +
          //   "-" +
          //   (lastService.getMonth() + 1).toString().padStart(2, 0) +
          //   "-" +
          //   lastService.getDate().toString().padStart(2, 0)
          // }
          onChange={(e) => {
            setLastService(()=>(e.target.value));
          }}
        />
      </div>
      <div className="certificateDetails">
        <h3 className="certificateInputs">Next Service Date:</h3>
        <input
          type="date"
          autoComplete="off"
          // value={
          //   nextService.getFullYear().toString() +
          //   "-" +
          //   (nextService.getMonth() + 1).toString().padStart(2, 0) +
          //   "-" +
          //   nextService.getDate().toString().padStart(2, 0)
          // }
          onChange={(e) => {
            setNextService(()=>(e.target.value));
          }}
        />
      </div>
      <div>
        <button className="updateData "  onClick={uploadData}>Update</button>
      </div>
      <ToastContainer/>
    </div>
  );
}
