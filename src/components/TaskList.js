import React, { useState } from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, toggleComplete, deleteTask, editTask }) => {
    const [filter, setFilter] = useState('all'); // all | active | completed

    const filteredTasks = tasks.filter((task) => {
        if (filter === 'completed') return task.status === 2;
        if (filter === 'active') return task.status !== 2;
        return true;
    });

    return (
        <div>
            <div className="filter-buttons">
                <button 
                    onClick={() => setFilter('all')}
                    className={filter === 'all' ? 'active' : ''}
                >
                    All
                </button>
                <button 
                    onClick={() => setFilter('active')}
                    className={filter === 'active' ? 'active' : ''}
                >
                    Active
                </button>
                <button 
                    onClick={() => setFilter('completed')}
                    className={filter === 'completed' ? 'active' : ''}
                >
                    Completed
                </button>
            </div>
            <div className="task-list">
                {filteredTasks.length === 0 ? (
                    <div className="no-tasks">No tasks found</div>
                ) : (
                    filteredTasks.map((task) => (
                        <TaskItem
                            key={task.id}
                            task={task}
                            toggleComplete={toggleComplete}
                            deleteTask={deleteTask}
                            editTask={editTask}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default TaskList;
