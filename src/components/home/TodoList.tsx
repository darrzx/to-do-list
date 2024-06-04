import React from 'react';
import { Todo } from '@/models/Todo';
import TodoItem from './TodoItem';

interface TodoListProps {
  todos: Todo[];
  onTodoClick: (todo: Todo) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onTodoClick }) => {
  return (
    <div>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onClick={onTodoClick} />
      ))}
    </div>
  );
};

export default TodoList;
