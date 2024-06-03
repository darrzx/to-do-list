import { Todo } from '@/models/Todo';
import { useEffect, useState } from 'react';

const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch('/api/HomeApi', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
        });
    
        if (!response.ok) {
            throw new Error('Response error');
        }
    
        const data = await response.json();
        setTodos(data);
      } catch (error) {
        console.error('Error fetching todos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  return { todos, loading };
};

export default useTodos;
