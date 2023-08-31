import { useState } from "react";

type Todo = {
  id: number;
  title: string;
  completed: boolean;
  editing: boolean;
};

interface TodoProps {
  todo: Todo;
  onToggle: (todo: Todo) => void;
  onRemove: (id: number) => void;
  onEdit: (todo: Todo) => void;
  onUpdate: (todo: Todo, event: React.ChangeEvent<HTMLInputElement>) => void;
  onSave: (todo: Todo) => void;
}

const Todo = ({
  todo,
  onToggle,
  onRemove,
  onEdit,
  onUpdate,
  onSave,
}: TodoProps) => {
  const handleChangeCheckbox = () => {
    onToggle(todo);
  };

  const handleClickRemoveButton = () => {
    onRemove(todo.id);
  };

  const handleClickEditButton = () => {
    onEdit(todo);
  };

  const handleChangeInputUpdate = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    onUpdate(todo, event);
  };

  const handleClickSaveButton = () => {
    onSave(todo);
  };

  return (
    <li>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={handleChangeCheckbox}
      />
      {todo.editing ? (
        <>
          <input
            type="text"
            value={todo.title}
            onChange={handleChangeInputUpdate}
          />
          <button type="button" onClick={handleClickSaveButton}>
            저장
          </button>
        </>
      ) : (
        <>
          <span>{todo.title}</span>
          <button type="button" onClick={handleClickEditButton}>
            수정
          </button>
        </>
      )}

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
      editing: false,
    },
    {
      id: 1,
      title: "2",
      completed: false,
      editing: false,
    },
    {
      id: 2,
      title: "3",
      completed: false,
      editing: false,
    },
  ]);
  const [title, setTitle] = useState<string>("");

  const createTodo = (title: string) => {
    const todo: Todo = {
      id: new Date().getTime(),
      title: title,
      completed: false,
      editing: false,
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

  const handleEditing = (todo: Todo) => {
    const newTodoList = todos.map((v) => {
      if (v.id === todo.id) {
        return {
          ...todo,
          editing: !v.editing,
        };
      }
      return v;
    });

    setTodos(newTodoList);
  };

  const handleUpdate = (
    todo: Todo,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newTodoList = todos.map((v) => {
      if (v.id === todo.id) {
        return {
          ...todo,
          title: event.target.value,
        };
      }

      return v;
    });

    setTodos(newTodoList);
  };

  const handleSave = (todo: Todo) => {
    const newTodoList = todos.map((v) => {
      if (v.id === todo.id) {
        return {
          ...todo,
          editing: !v.editing,
        };
      }
      return v;
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
            onEdit={handleEditing}
            onUpdate={handleUpdate}
            onSave={handleSave}
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
