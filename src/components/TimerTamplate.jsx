import React from 'react';
import './TimerTamplate.css'
const TimerTamplate = ({value, timeType}) => {
    return ( <div className="timerTemplate">{value}<p>{timeType}</p></div> );
}
 
export default TimerTamplate;