import React, { useState } from 'react';

interface TodoFormProps {
    onCreateTodo: (newTodo: { title: string; content: string; deadline: string }) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ onCreateTodo }) => {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreateTodo(newTodo);
    setNewTodo({
      title: '',
      content: '',
      deadline: ''
    });
  };

  return (
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
        <input type="date" name="deadline" value={newTodo.deadline} onChange={handleInputChange} />
      </div>
      <button type="submit">Add Todo</button>
    </form>
  );
};

export default TodoForm;
