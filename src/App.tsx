import { useState } from "react";

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

interface TodoProps {
  todo: Todo;
  onToggle: () => void;
  onRemove: (todo: Todo) => void;
}

const Todo = ({ todo, onToggle, onRemove }: TodoProps) => {
  return (
    <li>
      <span>{todo.title}</span>
      <input type="checkbox" checked={todo.completed} />
      <button type="button">삭제</button>
    </li>
  );
};

function App() {
  const [todos, setTodos] = useState<Todo[]>([
    {
      id: 0,
      title: "1",
      completed: false,
    },
    {
      id: 1,
      title: "2",
      completed: false,
    },
    {
      id: 2,
      title: "3",
      completed: false,
    },
  ]);
  const [title, setTitle] = useState<string>("");

  const createTodo = (title: string) => {
    const todo: Todo = {
      id: new Date().getTime(),
      title: title,
      completed: false,
    };

    return todo;
  };

  const addTodo = (todo: Todo) => {
    setTodos([...todos, todo]);
  };

  const handleChangeTitleValue = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTitle(event.target.value);
  };

  const handleClickAddButton = () => {
    addTodo(createTodo(title));
  };

  return (
    <>
      <ul>
        {todos.map((todo) => (
          <Todo
            key={JSON.stringify(todo)}
            todo={todo}
            onRemove={() => {}}
            onToggle={() => {}}
          />
        ))}
      </ul>
      <div>
        <input type="text" value={title} onChange={handleChangeTitleValue} />
        <button type="button" onClick={handleClickAddButton}>
          추가
        </button>
      </div>
    </>
  );
}

export default App;
