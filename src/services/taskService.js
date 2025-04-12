const API_URL = 'http://localhost:5000/api/tasks';

export const fetchTasks = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to fetch tasks');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
};

export const addTask = async (task) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    });

    const data = await response.json();

    if (!response.ok) {
      let errorMessage = 'Failed to add task';
      if (data.message) {
        errorMessage = data.message;
      } else if (data.errors) {
        // Handle validation errors
        const validationErrors = Object.values(data.errors).flat();
        errorMessage = validationErrors.join('. ');
      }
      throw new Error(errorMessage);
    }

    return data;
  } catch (error) {
    console.error('Error adding task:', error);
    throw error;
  }
};

export const updateTask = async (id, task) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to update task');
    }
    return true;
  } catch (error) {
    console.error('Error updating task:', error);
    throw error;
  }
};

export const deleteTask = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to delete task');
    }
    return true;
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error;
  }
}; 