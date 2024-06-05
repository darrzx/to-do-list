import React, { useState } from 'react';
import { Todo } from '@/models/Todo';
import styles from '@/styles/Home.module.css';

interface TodoItemProps {
  todo: Todo;
  onClick: (todo: Todo) => void;
  clicked: boolean;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onClick, clicked }) => {  

  const handleItemClick = () => {
    onClick(todo);
  };

  return (
    <div className={`${styles.home_content_todo_item} ${clicked ? styles.home_content_todo_item_clicked : ''}`}
      onClick={handleItemClick}>
      <h3>{todo.title}</h3>
    </div>
  );
};

export default TodoItem;
