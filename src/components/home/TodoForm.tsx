import { Todo } from '@/models/Todo';
import React, { useEffect, useState } from 'react';

interface TodoFormProps {
  onCreateTodo: (newTodo: { title: string; content: string; deadline: Date }) => void;
  onUpdateTodo: (updatedTodo: Todo) => void;
  onDeleteTodo: (id: number) => void;
  mode: 'create' | 'update' | 'delete';
  existingTodo?: Todo | null;
}

const TodoForm: React.FC<TodoFormProps> = ({ onCreateTodo, onUpdateTodo, onDeleteTodo, mode, existingTodo }) => {
  const [newTodo, setNewTodo] = useState({
    title: '',
    content: '',
    deadline: new Date()
  });
  const [dateInString, setDateInString] = useState("");

  useEffect(() => {
    if (existingTodo && mode === 'update') {
      const currdate = new Date(existingTodo.deadline);
      currdate.setDate(currdate.getDate() + 1);

      setNewTodo(existingTodo);
      setDateInString(currdate.toISOString().split('T')[0]);
    }
  }, [existingTodo, mode]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'deadline') {
      
      setDateInString(value);
      const date = new Date(value);

      setNewTodo(prevTodo => ({
        ...prevTodo,
        [name]: date
      }));
    } else {
      setNewTodo(prevTodo => ({
        ...prevTodo,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (mode === 'create') {
      onCreateTodo(newTodo);
    } else if (mode === 'update' && onUpdateTodo) {
      onUpdateTodo({ ...newTodo, id: existingTodo!.id });
    } 

    setNewTodo({
      title: '',
      content: '',
      deadline: new Date()
    });
  };

  const handleDelete = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      onDeleteTodo(existingTodo!.id);
    } catch (error) {
      console.error('Failed to delete todo');
    }

    setNewTodo({
      title: '',
      content: '',
      deadline: new Date()
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
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
          <input type="date" name="deadline" value={dateInString} onChange={handleInputChange} />
        </div>
        <button type="submit">{mode === 'create' ? 'Add Todo' : 'Update Todo'}</button>
      </form>
      <button type="submit" onClick={handleDelete}>Delete Todo</button>
    </>
  );
};

export default TodoForm;
