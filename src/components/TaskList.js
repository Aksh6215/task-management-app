import React, { useState } from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, toggleComplete, deleteTask }) => {
    const [filter, setFilter] = useState('all'); // all | active | completed

    const filteredTasks = tasks.filter((task) => {
        if (filter === 'completed') return task.completed;
        if (filter === 'active') return !task.completed;
        return true;
    });

    return (
        <div>
            <div className="filter-buttons">
                <button onClick={() => setFilter('all')}>All</button>
                <button onClick={() => setFilter('active')}>Active</button>
                <button onClick={() => setFilter('completed')}>Completed</button>
            </div>
            <div className="task-list">
                {filteredTasks.map((task) => (
                    <TaskItem
                        key={task.id}
                        task={task}
                        toggleComplete={toggleComplete}
                        deleteTask={deleteTask}
                    />
                ))}
            </div>
        </div>
    );
};

export default TaskList;
