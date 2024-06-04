import React, { useState } from 'react';
import TodoList from '@/components/home/TodoList';
import useTodos from '@/hooks/UseTodos';
import TodoForm from '@/components/home/TodoForm';

const Home = () => {
  const { todos, loading } = useTodos();

  const handleCreateTodo = async (newTodo: { title: string; content: string; deadline: string }) => {
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
      <TodoForm onCreateTodo={handleCreateTodo} />
    </div>
  );
};

export default Home;
