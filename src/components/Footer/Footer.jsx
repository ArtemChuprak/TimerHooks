import React from "react";
import PropTypes from "prop-types";
import TasksFilter from "../TasksFilter/TasksFilter";

import "./Footer.css"


const Footer = ({ todoCount, todoFilter, status, clearCompleted }) => (
  <footer className="footer">
    <span className="todo-count">{todoCount} items left</span>
    <TasksFilter todoFilter={todoFilter} status={status} />
    <button type="button" className="clear-completed" onClick={clearCompleted}>
      Clear completed
    </button>
  </footer>
);

export default Footer

Footer.defaultProps = {
  todoCount: 0,
  todoFilter: () => {},
  clearCompleted: () => {},
  status: 'all',
};

Footer.propTypes = {
  todoCount: PropTypes.number,
  todoFilter: PropTypes.func,
  clearCompleted: PropTypes.func,
  status: PropTypes.string,
};