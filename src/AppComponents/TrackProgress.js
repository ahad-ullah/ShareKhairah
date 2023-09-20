import React from 'react'
import "./TrackProgress.css";
import { CountdownCircleTimer } from "react-countdown-circle-timer";


const renderTime = ({ remainingTime }) => {
    if (remainingTime === 0) {
      return <div className="timer">No Donee <br/> Available...</div>;
    }
  
    return (
      <div className="timer">
        <div className="text">Remaining</div>
        <div className="value">{remainingTime}</div>
        <div className="text">seconds</div>
      </div>
    );
  };

function TrackProgress() {
  return (
    <div className='mt-5' >
    <h1>
      Searching For Donee
    </h1>
    <h3 style={{textAlign:'center' , marginTop:'-20px'}}>
        Please Wait..
    </h3>
    <div className="timer-wrapper mt-5">
      <CountdownCircleTimer
        isPlaying
        duration={25}
        colors={['#d8363a', '#ee7724', '#dd3675', '#b44593', '#d8363a']}
        colorsTime={[20, 15, 10, 5,0]}
        onComplete={() => [true, 1000]}
      >
        {renderTime}
      </CountdownCircleTimer>
    </div>
    <p className="info">
     Matching best suitable donee for your donations,Stay Tuned.
    </p>
  </div>
  )
}

export default TrackProgress

