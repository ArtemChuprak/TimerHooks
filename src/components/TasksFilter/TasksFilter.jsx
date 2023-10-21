import React from "react";
import PropTypes from "prop-types";

function TasksFilter({ todoFilter, status }) {

  const arr = ['all', 'active', 'completed'];

  return (
    <ul className="filters">
      
      <li>{arr.map((name) => <button key={Math.random()}  className={status === name ? "selected" : ""} onClick={() => todoFilter(name)} label={name}>{name} </button>)}</li>
    </ul>

  )
  }
  
  TasksFilter.defaultProps = {
    todoFilter: () => {},
    status: "all",
  };
  
  TasksFilter.propTypes = {
    status: PropTypes.string,
    todoFilter: PropTypes.func,
  };
  
  export default TasksFilter;
