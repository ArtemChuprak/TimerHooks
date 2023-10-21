import React from "react";
import PropTypes from "prop-types";
import Task from "../Task/Task";






const TaskList = ({ todos, onDeleted, onToggleDone, onSetTime,onSetRun }) => {
  const elements = todos.map((item) => (
    <Task
      {...item}
      key={item.id}
      onDeleted={() => onDeleted(item.id)}
      onToggleDone={() => onToggleDone(item.id)}
      min={item.min} 
      sec={item.sec} 
      setSec={(sec) => onSetTime(sec, item.id, 'sec')} 
      setMin={(min) => onSetTime(min, item.id, 'min')} 
      run={item.run} 
      setRun={(run) => onSetRun(run, item.id)} 
    />
  ));
  return <ul className="todo-list">{elements}</ul>;
};

export default TaskList;

TaskList.defaultProps = {
  todos: [],
  onToggleDone: () => {},
  onDeleted: () => {},
  status: 'all',
  redactingTask: () => {},
  min: 0,
  sec: 0,
  onSetTime: () => {},
  onSetRun: () => {}
};

TaskList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({ text: PropTypes.string })),
  onToggleDone: PropTypes.func,
  onDeleted: PropTypes.func,
  status: PropTypes.string,
  redactingTask: PropTypes.func,
  min: PropTypes.number,
  sec: PropTypes.number,
  onSetTime: PropTypes.func,
  onSetRun: PropTypes.func
};