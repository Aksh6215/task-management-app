import React, { useState, useEffect } from 'react';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import ThemeSwitcher from './components/ThemeSwitcher';
import ThemeProvider from './contexts/ThemeContext';

const App = () => {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem('tasks')) || []
  );

  const addTask = (text) => {
    const newTask = { id: Date.now(), text, completed: false };
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const toggleComplete = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  return (
    <ThemeProvider>
      <div className="app">
        <h1>Task Manager</h1>
        <ThemeSwitcher />
        <TaskInput addTask={addTask} />
        <TaskList tasks={tasks} toggleComplete={toggleComplete} deleteTask={deleteTask} />
      </div>
    </ThemeProvider>
  );
};

export default App;
