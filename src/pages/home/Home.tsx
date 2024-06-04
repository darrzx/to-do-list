import React, { useState } from 'react';
import TodoList from '@/components/home/TodoList';
import useTodos from '@/hooks/UseTodos';
import TodoForm from '@/components/home/TodoForm';
import { Todo } from '@/models/Todo';

const Home = () => {
  const { todos, loading } = useTodos();
  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null);

  const handleCreateTodo = async (newTodo: { title: string; content: string; deadline: Date }) => {
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

  const handleUpdateTodo = async (updatedTodo: { id: number; title: string; content: string; deadline: Date }) => {
    
    try {
      const response = await fetch(`/api/HomeApi`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedTodo)
      });
      if (response.ok) {
        window.location.reload();
      } else {
        console.error('Failed to update todo');
      }
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const handleDeleteTodo = async (deletedTodo: { id: number }) => {
    
    try {
      const response = await fetch(`/api/HomeApi`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(deletedTodo)
      });
      console.log(response);

      if (response.ok) {
        window.location.reload();
      } else {
        console.error('Failed to delete todo');
      }
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const handleTodoClick = (todo: Todo) => {
    setCurrentTodo(todo);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Todo List</h1>
      <TodoList todos={todos} onTodoClick={handleTodoClick} />
      <h2>{currentTodo ? 'Update Todo' : 'Add New Todo'}</h2>
      <TodoForm 
        onCreateTodo={handleCreateTodo} 
        onUpdateTodo={handleUpdateTodo} 
        onDeleteTodo={handleDeleteTodo}
        mode={currentTodo ? 'update' : 'create'} 
        existingTodo={currentTodo} 
      />
    </div>
  );
};

export default Home;
