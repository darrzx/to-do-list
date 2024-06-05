import React from 'react';
import { Todo } from '@/models/Todo';
import styles from '@/styles/Home.module.css';

interface TodoDetailProps {
  todo: Todo;
}

const TodoDetail: React.FC<TodoDetailProps> = ({ todo }) => {  
  return (
    <div className={styles.home_content_todo_detail_content}>
      <h3>{todo.title}</h3>
      <p>{todo.content}</p>
      <p>{new Date(todo.deadline).toLocaleDateString('en-GB')}</p>
    </div>
  );
};

export default TodoDetail;
