import React, { useState, useEffect } from "react";
import { auth, provider, db } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import moment from "moment";

import "./HomePage.css";

function HomePage({ setIsAuth, isAuth }) {
  // const[userData,setUserData]=useState({});

  const [dataList, setDataList] = useState([]);
  const dataCollectionRef = collection(db, "nablApprovedData");

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
    if (result) {
      setIsAuth(true);
      localStorage.setItem("isAuth", true);
      // setUserData(result);
      navigate("/details");
    }
  };

  return (
    <div className="homeMain">
      
        <div>
          {dataList?.map((certificate) => {
            return (
              <>
                {certificate.status && (
                  <div className="certificateMain">
                    <h1 className="certificateHead">
                      <img
                        classname="logo"
                        src={require("../img/logo.png")}
                        width="80px"
                        height={"80px"}
                        alt="logo"
                      />
                      Certificate
                    </h1>
                    <div className="indi">
                      <h3 className="details">Manufacturer: </h3>
                      <h4>{certificate.nablData.sendData.manufacturer}</h4>
                    </div>
                    <div className="indi">
                      <h3 className="details">Liscense:</h3>
                      <h4> {certificate.nablData.sendData.liscense}</h4>
                    </div>
                    <div className="indi">
                      <h3 className="details">Model Number:</h3>
                      <h4> {certificate.nablData.sendData.model}</h4>
                    </div>
                    <div className="indi">
                      <h3 className="details">Owner:</h3>
                      <h4> {certificate.nablData.sendData.owner}</h4>
                    </div>
                    <div className="indi">
                      <h3 className="details">Purchase Date: </h3>
                      <h4>
                        {" "}
                        {moment(
                          certificate.nablData.sendData.purchaseDate
                        ).format("MMM Do YY")}
                      </h4>
                    </div>
                    <div className="indi">
                      <h3 className="details">Last Service Date: </h3>
                      <h4>
                        {moment(
                          certificate.nablData.sendData.lastService
                        ).format("MMM Do YY")}
                      </h4>
                    </div>
                    <div className="indi">
                      <h3 className="details">Next Service Date: </h3>
                      <h4>
                        {moment(
                          certificate.nablData.sendData.nextService
                        ).format("MMM Do YY")}
                      </h4>
                    </div>
                  </div>
                )}
              </>
            );
          })}
        </div>
     

      <div className="loginMain">
        <button className="loginEngineer" onClick={signInWithGoogle}>
          Login For Engineer!
        </button>
      </div>

      <div className="loginMain">
        <Link to="/approve" className="loginEngineer">
          Get Certified by NABL
        </Link>
      </div>

      <div className="loginMain">
        <Link to="/nabl" className="loginEngineer">
          NABL Site
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
