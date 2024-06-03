import { Todo } from "@/models/Todo";
  
const TodoItem: React.FC<{ todo: Todo }> = ({ todo }) => {
    
    return (
        <div>
        <h3>{todo.title}</h3>
        <p>{todo.content}</p>
        </div>
    );
};

export default TodoItem;
  