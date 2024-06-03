import TodoList from '@/components/home/TodoList';
import useTodos from '@/hooks/UseTodos';

const Home = () => {
  const { todos, loading } = useTodos();

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Todo List</h1>
      <TodoList todos={todos} />
    </div>
  );
};

export default Home;
