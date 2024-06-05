import { Todo } from '@/models/Todo';
import { Button, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import styles from '@/styles/Home.module.css';

interface TodoFormProps {
  onCreateTodo: (newTodo: { title: string; content: string; deadline: Date }) => void;
  onUpdateTodo: (updatedTodo: Todo) => void;
  onDeleteTodo: (deletedTodo: {id: number}) => void;
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
      onDeleteTodo({ id: existingTodo!.id });
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
      <form onSubmit={handleSubmit} className={styles.home_form_container}>
          <TextField 
            required 
            type='text' 
            id="title" 
            label="Title" 
            value={newTodo.title}
            className={styles.home_form_input}
            onChange={(e) => setNewTodo((prevTodo) => ({ ...prevTodo, title: e.target.value }))}/>
          <TextField 
            required 
            type='text' 
            id="content" 
            label="Description" 
            value={newTodo.content}
            className={styles.home_form_input}
            onChange={(e) => setNewTodo((prevTodo) => ({ ...prevTodo, content: e.target.value }))}/>
        <div>
          <input type="date" name="deadline" value={dateInString} onChange={handleInputChange} className={styles.home_form_date_input}/>
        </div>

        <Button type="submit" variant="contained" color="primary" style={{ backgroundColor: '#1679AB', marginTop: '5%' }}>
          {mode === 'create' ? 'Add Task' : 'Update Task'}
        </Button>
        {mode !== 'create' ? (
          <Button type="submit" onClick={handleDelete} variant="contained" color="secondary">
            Delete
          </Button>
        ) : null}
      </form>
    </>
  );
};

export default TodoForm;
