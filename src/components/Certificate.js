import React from "react";
import "./Certificate.css";

export default function Certificate() {
  return (
    <div className="certificateData">
      {" "}
      <h1 className="certificateInputs">META DATA:</h1>
      <div className="certificateDetails">
        <h3 className="certificateInputs">Model Name:</h3>
        <input type="text" />
      </div>
      <div className="certificateDetails">
        <h3 className="certificateInputs">Manufacturer:</h3>
        <input type="text" />
      </div>
      <div className="certificateDetails">
        <h3 className="certificateInputs">Purchase Date:</h3>
        <input type="date" />
      </div>
      <div className="certificateDetails">
        <h3 className="certificateInputs">Owner:</h3>
        <input type="text" />
      </div>
      <div className="certificateDetails">
        <h3 className="certificateInputs">License Number:</h3>
        <input type="text" />
      </div>
      <h1 className="certificateInputs">RECENT STATUS:</h1>
      <div className="certificateDetails">
        <h3 className="certificateInputs">Last Service Date:</h3>
        <input type="date" />
      </div>
      <div className="certificateDetails">
        <h3 className="certificateInputs">Next Service Date:</h3>
        <input type="date" />
      </div>
      <h1 className="certificateInputs">STATUS:</h1>
      <div className="certificateDetails">
        <h3 className="certificateInputs">Fit/unfit to serve</h3>
      </div>
    </div>
  );
}
