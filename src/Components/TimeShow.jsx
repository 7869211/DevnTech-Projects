import React from 'react';
import '../Styles/Main.css'; 

const TimeShow=({time})=>{
  return (
    <div className="timeShow">
      <p>{time}</p>
    </div>
  );
}

export default TimeShow;
