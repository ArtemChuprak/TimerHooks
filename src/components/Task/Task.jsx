import React, { useState } from "react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import PropTypes from "prop-types";
import Timer from '../Timer/Timer';


const Task = ({ label, onDeleted, onToggleDone, done, time, min, sec, setSec, setMin, run, setRun }) => {
  const [isRedaction, setIsRedaction] = useState(false);
  const [inputText, setInputText] = useState(label);

  const redactingTask = () => {
    setIsRedaction(true);
  };

  const saveChange = (text) => {
    if (text.keyCode === 13 || text.keyCode === 27) {
      text.preventDefault();
      if (text.target.value !== '') {
        setInputText(text.target.value);
        setIsRedaction(false);
      }
    }
  };

 const blureChange = (text) => {
  setInputText(text.target.value);
  setIsRedaction(false);
  }

  let changed = '';
  if (done) {
    changed += 'completed';
  }
  if (isRedaction) {
    changed = 'editing';
  }

  return (
    <li className={changed}>
      <div className="view">
        <input className="toggle" type="checkbox" defaultChecked={done} onClick={onToggleDone} />
        <label>
          <span className="title">{inputText}</span>
          {(min === 0 && sec === 0) || min < 0 || sec < 0 ? null : 
           <Timer
           min={min}
           sec={sec}
           setSec={setSec}
           setMin={setMin}
           run={run}
           setRun={setRun}
         />}
          <span className="description">created {formatDistanceToNow(time, { includeSeconds: true })} ago</span>
        </label>
        <button type="button" label="edit" className="icon icon-edit" onClick={redactingTask} />
        <button type="button" label="destroy" className="icon icon-destroy" onClick={onDeleted} />
      </div>
      <input
        type="text"
        className="edit"
        defaultValue={label}
        onKeyDown={saveChange}
        ref={(input) => input && input.focus()}
        onBlur={blureChange}
      />
    </li>
  );
};

export default Task;
Task.defaultProps = {
  onDeleted: () => {},
  onToggleDone: () => {},
  label: {},
  done: false,
  time: '',
  min: 0,
  sec: 0,
  setSec: ()=> {},
  setMin: ()=> {},
  setRun: ()=> {},
  run:false
};

Task.propTypes = {
  label: PropTypes.string,
  done: PropTypes.bool,
  time: PropTypes.number,
  onDeleted: PropTypes.func,
  onToggleDone: PropTypes.func,
  min: PropTypes.number,
  sec: PropTypes.number,
  setSec: PropTypes.func,
  setMin: PropTypes.func,
  setRun: PropTypes.func,
  run:PropTypes.bool
};


