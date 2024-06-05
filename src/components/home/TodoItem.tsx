import React from 'react';
import { Todo } from '@/models/Todo';
import styles from '@/styles/Home.module.css';

interface TodoItemProps {
  todo: Todo;
  onClick: (todo: Todo) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onClick }) => {  
  return (
    <div className={styles.home_content_todo_item} onClick={() => onClick(todo)}>
      <h3>{todo.title}</h3>
    </div>
  );
};

export default TodoItem;
