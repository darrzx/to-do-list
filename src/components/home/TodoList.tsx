import React, { useState } from 'react';
import { Todo } from '@/models/Todo';
import TodoItem from './TodoItem';

interface TodoListProps {
  todos: Todo[];
  onTodoClick: (todo: Todo) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onTodoClick }) => {
  const [clickedTodo, setClickedTodo] = useState<Todo | null>(null);

  const handleTodoClick = (todo: Todo) => {
    onTodoClick(todo);
    setClickedTodo(todo);
  };
  
  return (
    <div>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onClick={handleTodoClick} clicked={clickedTodo === todo} />
      ))}
    </div>
  );
};

export default TodoList;
