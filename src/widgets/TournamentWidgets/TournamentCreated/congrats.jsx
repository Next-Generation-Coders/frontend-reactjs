import React from 'react';
import './congrats.css'; // Import CSS file for styling
import { useNavigate } from 'react-router-dom';
const Congrats = () => {



   const  navigate=useNavigate();
  return (
    <div className="congrats-background">
      <div className="congrats-container">
        <div className="congrats-card">
          <h2>Congratulations!</h2>
          <br></br><br></br>
          <p>Your tournament has been successfully created under the status of pending </p>
    <p> An admin's response to your quest will be sent to your mail </p>

    <br></br>
    <p>in the moment, you can start adding the teams !</p>

    <div style={{margin :"15px"}}>
    <button className='btn' style={{backgroundColor :"#FDCA40",color:"black",width:"100%",marginBottom:"20px"}} onClick={() => navigate("/")}>Home</button><br></br>
        <button className='btn'  style={{backgroundColor :"#FDCA40",color:"black",width:"100%"}} onClick={() => navigate("/tournament-list")}>Pay</button>

</div>
        </div>
      </div>
    </div>
  );
};

export default Congrats;
