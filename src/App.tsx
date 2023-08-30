import { useState } from "react";

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

interface TodoProps {
  todo: Todo;
  onToggle: (todo: Todo) => void;
  onRemove: (id: number) => void;
}

const Todo = ({ todo, onToggle, onRemove }: TodoProps) => {
  const handleChangeCheckbox = () => {
    onToggle(todo);
  };

  const handleClickRemoveButton = () => {
    onRemove(todo.id);
  };

  return (
    <li>
      <span>{todo.title}</span>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={handleChangeCheckbox}
      />
      <button type="button" onClick={handleClickRemoveButton}>
        삭제
      </button>
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

  const handleToggle = (todo: Todo) => {
    const newTodoList = todos.map((v) => {
      if (v.id === todo.id) {
        return {
          ...todo,
          completed: !v.completed,
        };
      }
      return v;
    });

    setTodos(newTodoList);
  };

  const handleRemove = (id: number) => {
    const newTodoList = todos.filter((v) => {
      if (v.id !== id) return true;
      return false;
    });

    setTodos(newTodoList);
  };

  return (
    <>
      <ul>
        {todos.map((todo) => (
          <Todo
            key={JSON.stringify(todo)}
            todo={todo}
            onRemove={handleRemove}
            onToggle={handleToggle}
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
