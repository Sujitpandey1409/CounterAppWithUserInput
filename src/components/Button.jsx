import React from 'react';
import './Button.css'
const Button = ({onClick, children}) => {
    return ( <button onClick={onClick}>{children?'Stop Timer':'Start Timer'}</button> );
}
 
export default Button;