import React, { useState, useEffect } from "react";
import { auth, provider, db } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { addDoc, collection, getDocs } from "firebase/firestore";
import moment from "moment";
import "./NablSite.css";
function NablSite() {
  const navigate = useNavigate();
  const [dataList, setDataList] = useState([]);
  const approveDataRef = collection(db, "approveData");

  const nablApprovedData = collection(db, "nablApprovedData");
  useEffect(() => {
    const getList = async () => {
      const data = await getDocs(approveDataRef);
      setDataList(data.docs.map((elem) => ({ ...elem.data(), id: elem.id })));
    };

    getList();
  }, []);
  console.log("na", dataList);

  const approveFunc = async () => {
    // console.log("approve")
    const status = true;
    const nablData = dataList[0];
    await addDoc(nablApprovedData, {
      nablData,
      status,
    });

    navigate("/");
  };

  const denyFunc = async () => {
    const status = false;
    const nablData = dataList[0];
    await addDoc(nablApprovedData, {
      nablData,
      status,
    });

    navigate("/");
  };

  return (
    <div>
      {dataList?.map((certificate) => {
        return (
          <>
            <div className="certificateMain">
              <h1 className="certificateHead">Certificate</h1>
              <div>
                <div>
                  <h3>Manufacturer: {certificate.sendData.manufacturer}</h3>
                  <h3>Liscense: {certificate.sendData.liscense}</h3>
                  <h3>Model Number: {certificate.sendData.model}</h3>
                  <h3>Owner: {certificate.sendData.owner}</h3>
                  <h3>
                    Purchase Date:{" "}
                    {moment(certificate.sendData.purchaseDate).format(
                      "MMM Do YY"
                    )}
                  </h3>
                  <h3>
                    Last Service Date:{" "}
                    {moment(certificate.sendData.lastService).format(
                      "MMM Do YY"
                    )}
                  </h3>
                  <h3>
                    Next Service Date:{" "}
                    {moment(certificate.sendData.nextService).format(
                      "MMM Do YY"
                    )}
                  </h3>
                </div>
              </div>
              <div className="approveLink">
                <button className="approveBtn" onClick={approveFunc}>
                  Approve
                </button>
                <button className="denyBtn" onClick={denyFunc}>
                  Deny
                </button>
              </div>
            </div>
          </>
        );
      })}
    </div>
  );
}

export default NablSite;
