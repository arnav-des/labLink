import React, { useState, useEffect } from "react";
import { auth, provider, db } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import moment from "moment";

import "./HomePage.css";

function HomePage({ setIsAuth, isAuth }) {
  const [userData, setUserData] = useState({});

  const [dataList, setDataList] = useState([]);
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
    if (result) {
      setIsAuth(true);
      localStorage.setItem("isAuth", true);
      setUserData(result);
      navigate("/details");
    }
  };
  return (
    <div className="homeMain">
      <div className="certificateMain">
        <h1 className="certificateHead">
          {" "}
          <img
            classname="logo"
            src={require("../img/logo.png")}
            width="80px"
            height={"80px"}
          />
          Certificate{" "}
        </h1>

        <div>
          {dataList?.map((certificate) => {
            return (
              <>
                <div>
                  <div>
                    <h3 className="details">Manufacturer: </h3>
                    <h4>{certificate.manufacturer}</h4>
                  </div>
                  <div>
                    <h3 className="details">Liscense:</h3>
                    <h4> {certificate.liscense}</h4>
                  </div>
                  <div>
                    <h3 className="details">Model Number:</h3>
                    <h4> {certificate.model}</h4>
                  </div>
                  <div>
                    <h3 className="details">Owner:</h3>
                    <h4> {certificate.owner}</h4>
                  </div>
                  <div>
                    <h3 className="details">Purchase Date: </h3>
                    <h4>
                      {" "}
                      {moment(certificate.purchaseDate).format("MMM Do YY")}
                    </h4>
                  </div>
                  <div>
                    <h3 className="details">Last Service Date: </h3>
                    <h4>
                      {moment(certificate.lastService).format("MMM Do YY")}
                    </h4>
                  </div>
                  <div>
                    <h3 className="details">Next Service Date: </h3>
                    <h4>
                      {moment(certificate.nextService).format("MMM Do YY")}
                    </h4>
                  </div>
                </div>
              </>
            );
          })}
        </div>
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
    </div>
  );
}

export default HomePage;
