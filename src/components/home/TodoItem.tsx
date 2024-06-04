import React from 'react';
import { Todo } from '@/models/Todo';

interface TodoItemProps {
  todo: Todo;
  onClick: (todo: Todo) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onClick }) => {  
  return (
    <div onClick={() => onClick(todo)} style={{ margin: '20px 0' }}>
      <h3>{todo.title}</h3>
      <p>{todo.content}</p>
      <p>{new Date(todo.deadline).toLocaleDateString('en-GB')}</p>
    </div>
  );
};

export default TodoItem;
