import React, { useState, useEffect } from 'react';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import { fetchTasks, addTask as addTaskApi, updateTask as updateTaskApi, deleteTask as deleteTaskApi } from './services/taskService';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      setLoading(true);
      const data = await fetchTasks();
      setTasks(data);
      setError(null);
    } catch (err) {
      setError('Failed to load tasks. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (text) => {
    if (!text.trim()) {
      setError('Task title cannot be empty');
      return;
    }

    try {
      const newTask = { 
        title: text.trim(), 
        description: '', 
        dueDate: new Date().toISOString().split('T')[0], 
        status: 0, 
        priority: 0 
      };
      const createdTask = await addTaskApi(newTask);
      setTasks(prevTasks => [...prevTasks, createdTask]);
      setError(null);
    } catch (err) {
      const errorMessage = err.message || 'Failed to add task. Please try again.';
      setError(errorMessage);
      console.error('Error adding task:', err);
    }
  };

  const toggleComplete = async (id) => {
    try {
      const task = tasks.find(t => t.id === id);
      if (task) {
        const updatedTask = { 
          ...task, 
          status: task.status === 2 ? 0 : 2,
          completedAt: task.status === 2 ? null : new Date().toISOString()
        };
        await updateTaskApi(id, updatedTask);
        setTasks(tasks.map(t => t.id === id ? updatedTask : t));
        setError(null);
      }
    } catch (err) {
      setError('Failed to update task. Please try again.');
      console.error(err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await deleteTaskApi(id);
      setTasks(tasks.filter(task => task.id !== id));
      setError(null);
    } catch (err) {
      setError('Failed to delete task. Please try again.');
      console.error(err);
    }
  };

  const editTask = async (id, newText) => {
    if (!newText.trim()) {
      setError('Task title cannot be empty');
      return;
    }

    try {
      const task = tasks.find(t => t.id === id);
      if (task) {
        const updatedTask = { ...task, title: newText };
        await updateTaskApi(id, updatedTask);
        setTasks(tasks.map(t => t.id === id ? updatedTask : t));
        setError(null);
      }
    } catch (err) {
      setError('Failed to update task. Please try again.');
      console.error(err);
    }
  };

  return (
    <div className="app">
      <h1>Task Manager</h1>
      {error && <div className="error-message">{error}</div>}
      <TaskInput addTask={addTask} />
      {loading ? (
        <div className="loading">Loading tasks...</div>
      ) : (
        <TaskList 
          tasks={tasks} 
          toggleComplete={toggleComplete} 
          deleteTask={deleteTask}
          editTask={editTask}
        />
      )}
    </div>
  );
};

export default App;
