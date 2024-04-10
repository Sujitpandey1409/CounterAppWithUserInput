import { useEffect, useRef, useState } from 'react';
import './App.css';
import Input from './components/Input';
import Button from './components/Button';
import TimerTamplate from './components/TimerTamplate';

function App() {
  const [targetDate, setTargetDate] = useState('');
  const [buttonState, setButtonState] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const inputDateTimeRef = useRef('')

  const handleInputChange = (e) => { setTargetDate(e.target.value) }

  const startCountdown = () => {
    const endDate = new Date(targetDate).getTime();
    if (isNaN(endDate)) {
      alert('Please enter a valid date and time.');
      return;
    }

    const now = new Date().getTime();
    const difference = endDate - now;
    if (difference <= 0) {
      alert('Please select a future date and time.');
      return;
    }

    const id = setInterval(() => {
      const currentTime = new Date().getTime();
      const remainingTime = endDate - currentTime;
      if (remainingTime <= 0) {
        clearInterval(id);
        setCountdown(0);
      } else {
        setCountdown(remainingTime);
      }
    }, 1000);

    setIntervalId(id);
  };

  const stopCountdown = () => {
    clearInterval(intervalId);
    setCountdown(0);
  };

  useEffect(() => {
    return () => clearInterval(intervalId);
  }, [intervalId]);

  const onClick = () => { 
    if(buttonState){
      stopCountdown()
      setButtonState(!buttonState)
    inputDateTimeRef.current=''} 
    else{startCountdown()
      setButtonState(!buttonState)}  
  }

  const formatTime = (time) => {
    const days = Math.floor(time / (1000 * 60 * 60 * 24));
    const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((time % (1000 * 60)) / 1000);

    return [{value:days, type:'Day(s)'},{value:hours, type:'Hour(s)'},{value:minutes, type:'Minute(s)'},{value:seconds, type:'Second(s)'}];
  };

  
  return (
    <div className="App">
      <div className='appContainer'>
        <h1>Countdown <span>Timer</span></h1>
        <Input ref={inputDateTimeRef} type="datetime-local" value={targetDate} onChange={handleInputChange} />
        <Button onClick={onClick} children={buttonState}/>
        <div className='timerTemplateContainer'>
          {formatTime(countdown).map((e,i)=>
          <TimerTamplate value={e.value} key={i} timeType={e.type} />
          )}</div>
      </div>
    </div>
  );
}

export default App;
