import React, {useState} from "react";

import { createRoot } from "react-dom/client"
import NewTaskForm from "./components/NewTaskForm/NewTaskForm";
import TaskList from "./components/TaskList/TaskList";
import Footer from "./components/Footer/Footer";



 const App = () => {
  const [status, setStatus] = useState('all');
  const [todoData, setTodoData] = useState([]);
  const [min, setMin] = useState(0);
  const [sec, setSec] = useState(0);
  const [run, setRun] = useState(false);


  const onSetTime = (time, id, type) => {
    const idx = todoData.findIndex((el) => el.id === id);
    const oldItem = todoData[idx];
  
    const newItem = { ...oldItem, [type]: time };
  
    setTodoData([...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)]);
  };
  
  const onSetRun = (run, id) => {
    const idx = todoData.findIndex((el) => el.id === id);
    const oldItem = todoData[idx];
  
    const newItem = { ...oldItem, run };
  
    setTodoData([...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)]);
  };
  
  
  

  const createTodoItem = (text, minute, second) => ({
    label: text,
    done: false,
    id: Math.floor(Math.random() * 10000),
    status: 'all',
    time: Date.now(),
    min: +minute,
    sec: +second,
    run: false,
  });


  const addItem = (text, min, sec) => {
    const newItem = createTodoItem(text, min, sec);
    setTodoData([...todoData, newItem]);
    setMin(+min);
    setSec(+sec);
  };


  

  const onToggleDone = (id) => {
    const idx = todoData.findIndex((el) => el.id === id);
    const oldItem = todoData[idx];
    const newItem = { ...oldItem, done: !oldItem.done };
    setTodoData([...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)]);
  };

  const deletedItem = (id) => {
    const item = todoData.find((item) => item.id === id);
    if (!item.done) {
      setRun(false);
    }
    setTodoData(todoData.filter((el) => el.id !== id));
  };

  const clearCompleted = () => {
    setTodoData(todoData.filter((el) => !el.done));
  };

  const todoFilter = (value) => {
    setStatus(value);
  };

  const todos = todoData.filter((item) => {
    if (status === 'all') {
      return item;
    }
    if (status === 'active') {
      return !item.done;
    }
    if (status === 'completed') {
      return item.done;
    }
    return todoData;
  });

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm onItemAdded={addItem} />
      </header>
      <section className="main">
      <TaskList 
      todos={todos} 
      onDeleted={deletedItem} 
      onToggleDone={onToggleDone} 
      status={status} 
      min={min}
      sec={sec}
      setSec={setSec}
      setMin={setMin}
      run={run}
      setRun={setRun}
      onSetTime={onSetTime}
      onSetRun={onSetRun}
    />
        <Footer
          todoCount={todoData.length - todoData.filter((el) => el.done).length}
          todoFilter={todoFilter}
          clearCompleted={clearCompleted}
          status={status}
        />
      </section>
    </section>
  );
};

export default App

  createRoot(document.querySelector(".todoapp")).render(<App />)



