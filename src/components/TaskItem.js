import React from 'react';

const TaskItem = ({ task, toggleComplete, deleteTask }) => {
    return (
        <div className={`task-item ${task.completed ? 'completed' : ''}`}>
            <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleComplete(task.id)}
            />
            <span>{task.text}</span>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
        </div>
    );
};

export default TaskItem;
