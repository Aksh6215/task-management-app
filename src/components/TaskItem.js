import React, { useState } from 'react';

const TaskItem = ({ task, toggleComplete, deleteTask, editTask }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(task.title);

    const handleEdit = () => {
        if (isEditing) {
            if (editText.trim()) {
                editTask(task.id, editText);
                setIsEditing(false);
            }
        } else {
            setIsEditing(true);
        }
    };

    const isCompleted = task.status === 2;

    return (
        <div className={`task-item ${isCompleted ? 'completed' : ''}`}>
            <input
                type="checkbox"
                checked={isCompleted}
                onChange={() => toggleComplete(task.id)}
            />
            {isEditing ? (
                <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="edit-input"
                    autoFocus
                />
            ) : (
                <span>{task.title}</span>
            )}
            <div className="task-buttons">
                <button onClick={handleEdit} className="edit-button">
                    {isEditing ? 'Save' : 'Edit'}
                </button>
                <button onClick={() => deleteTask(task.id)} className="delete-button">
                    Delete
                </button>
            </div>
        </div>
    );
};

export default TaskItem;
