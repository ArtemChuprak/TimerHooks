import React, {  useEffect } from 'react';
import PropTypes from 'prop-types';

const Timer = ({ min, setMin, sec, setSec, run, setRun }) => {
  useEffect(() => {
    let interval = null;

    if (run) {
      interval = setInterval(() => {
        if (sec > 0) {
          setSec(sec - 1);
        }
        if (sec === 0) {
          if (min === 0) {
            clearInterval(interval);
            setRun(false);
          } else {
            setMin(min - 1);
            setSec(59);
          }
        } 
      }, 1000);
    } else if (!run && sec !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [run, min, sec, setSec, setMin, setRun]);

  const startTimer = () => setRun(true);
  const pauseTimer = () => setRun(false);

  return (
    <span className="description">
      <button type="button" className="icon icon-play" onClick={startTimer} />
      <button type="button" className="icon icon-pause" onClick={pauseTimer} />
      <span className="timer-display">{min}:{sec < 10 ? `0${sec}` : sec}</span>
    </span>
  );
};


export default Timer;

Timer.defaultProps = {
  min: 0,
  sec: 0,
  setSec: ()=> {},
  setMin: ()=> {},
  setRun: ()=> {},
  run:false
};

Timer.propTypes = {
  min: PropTypes.number,
  sec: PropTypes.number,
  setSec: PropTypes.func,
  setMin: PropTypes.func,
  setRun: PropTypes.func,
  run:PropTypes.bool
};