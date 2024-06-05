import React, { useEffect, useState } from 'react';
import useTodos from '@/hooks/UseTodos';
import TodoList from '@/components/home/TodoList';
import TodoForm from '@/components/home/TodoForm';
import TodoDetail from '@/components/home/TodoDetail';
import { Todo } from '@/models/Todo';
import { useAuth } from '@/contexts/AuthContext';
import styles from '@/styles/Home.module.css';

const Home = () => {
  const { todos, loading } = useTodos();
  const [currentTodo, setCurrentTodo] = useState<Todo>({
    id: 0,
    title: '',
    content: '',
    deadline: new Date()
  });
  const { user } = useAuth();

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

  useEffect(() => {
    console.log('User state changed:', user?.username);
  }, [user]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className={styles.home_container}>
      <div className={styles.home_navbar_container}>
        <h1>Welcome, {user?.username || 'User'}!</h1>
      </div>
      <div className={styles.home_content_container}>
        
        <div className={styles.home_content_todo_list}>
          <h2>Tasks</h2>  
          <TodoList todos={todos} onTodoClick={handleTodoClick} />
        </div>

        <div className={styles.home_content_todo_detail}>
          <h2>Detail</h2>  
          <div className={styles.home_content_todo_detail_content_container}>
            {currentTodo.id ? (
              <TodoDetail key={currentTodo.id} todo={currentTodo} />
            ) : (
              <p className={styles.home_content_todo_detail_empty}>Click the task first.</p>
            )}
          </div>
        </div>
        
        <div className={styles.home_content_todo_form}> 
          <h2>{currentTodo.id ? 'Edit Task' : 'Add New Task'}</h2>
          <TodoForm 
            onCreateTodo={handleCreateTodo} 
            onUpdateTodo={handleUpdateTodo} 
            onDeleteTodo={handleDeleteTodo}
            mode={currentTodo.id ? 'update' : 'create'} 
            existingTodo={currentTodo} 
          /> 
        </div>
      </div>
    </div>
  );
};

export default Home;
