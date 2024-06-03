import React, { useState } from 'react';
import TodoList from '@/components/home/TodoList';
import useTodos from '@/hooks/UseTodos';

const Home = () => {
  const { todos, loading } = useTodos();
  const [newTodo, setNewTodo] = useState({
    title: '',
    content: '',
    deadline: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewTodo(prevTodo => ({
      ...prevTodo,
      [name]: value
    }));
  };

  const handleInsertTodo = async () => {
    try {
      const response = await fetch('/api/HomeApi', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newTodo)
      });
      if (response.ok) {
        window.location.reload();
      } else {
        console.error('Failed to insert todo');
      }
    } catch (error) {
      console.error('Error inserting todo:', error);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Todo List</h1>
      <TodoList todos={todos} />
      <h2>Add New Todo</h2>
      <div>
        <label>Title:</label>
        <input type="text" name="title" value={newTodo.title} onChange={handleInputChange} />
      </div>
      <div>
        <label>Content:</label>
        <input type="text" name="content" value={newTodo.content} onChange={handleInputChange} />
      </div>
      <div>
        <label>Deadline:</label>
        <input type="date" name="deadline" value={newTodo.deadline} onChange={handleInputChange} />
      </div>
      <button onClick={handleInsertTodo}>Add Todo</button>
    </div>
  );
};

export default Home;
