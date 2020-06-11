import React, { Fragment, useState, JSXElementConstructor } from "react";
import ReactDOM from "react-dom";

type FormElem = React.FormEvent<HTMLFormElement>;

interface ITodo {
  text: string;
  complete: boolean;
}

export default function TodoApp(): JSX.Element {
  let [value, setValue] = useState<string>("");

  let [todos, setTodos] = useCustomPersistedState("todos", "");

  const handleSubmit = (e: FormElem): void => {
    e.preventDefault();
    addTodo(value);
    setValue("");
  };

  const addTodo = (text: string): void => {
    const newTodos: ITodo[] = [...todos, { text, complete: false }];
    setTodos(newTodos);
  };
  const completeTodo = (index: number): void => {
    const newTodos: ITodo[] = [...todos];
    newTodos[index].complete = !newTodos[index].complete;
    setTodos(newTodos);
  };
  const removeTodo = (index: number): void => {
    const newTodos: ITodo[] = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  return (
    <div style={{ fontFamily: "Arial,Helvetica,sans-serif", fontSize: "20px" }}>
      <h1>Todo List</h1>
      <form onSubmit={handleSubmit} data-testid="todoform">
        <input
          type="text"
          value={value}
          name="todo_value"
          data-testid="todo_value"
          placeholder="Enter your todo here"
          onChange={(e) => setValue(e.target.value)}
          style={{
            margin: "10px",
            height: "30px",
            width: "300px",
            fontSize: "18px",
            backgroundColor: "lightblue",
          }}
          required
        />
        <button
          type="submit"
          name="add_todo"
          data-testid="add_todo"
          style={{
            height: "35px",
            width: "50px",
            fontSize: "18px",
            backgroundColor: "lightblue",
          }}
        >
          Add
        </button>
      </form>
      <section>
        <div style={{ margin: "20px", fontSize: "18px" }} data-testid="remTodos">
          {todos.length
            ? <>{`Total todos remaining : `}
            {<span data-testid="rem">{`${todos.filter((el:any) => !el.complete).length}`}</span>}
             {` out of `}
             {<span data-testid="total"> {`${todos.length}`}</span>}
             </>
            : ""}
        </div>
        <div data-testid="allTodos">
        {todos &&
          todos.map((todo: ITodo, index: number) => {
            return (
                <li key={index}>
                  <span
                    style={{
                      textDecoration: todo.complete ? "line-through" : "",
                      margin: "20px",
                    }}
                    onClick={() => completeTodo(index)}
                    data-testid={index}
                  >
                    {todo.text}
                  </span>
                  <span
                    style={{ verticalAlign: "middle" }}
                    onClick={() => removeTodo(index)}
                  >
                    {binSvg()}
                  </span>
                </li>
            );
          })}
          </div>
      </section>
    </div>
  );
}
function binSvg(): JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="20"
      viewBox="0 0 110 90"
      width="30"
    >
      <path
        d="m64.3025436 15h-18.6050834c-.9929047 0-1.79776.8048553-1.79776 1.7977581v7.9036846h3.790287v-6.2540951h14.6108818v6.2540951h3.799427v-7.9036846c0-.9929028-.8048553-1.7977581-1.7977524-1.7977581z"
        fill="#e56353"
      />
      <path
        d="m26.2549152 31.9276218 5.7795086 58.7816162c.2394982 2.4348355 2.2868843 4.290762 4.7332878 4.290762h36.4645729c2.4464035 0 4.4937973-1.8559265 4.7332916-4.2907639l5.7795105-58.7816162h-57.4901714z"
        fill="#e56353"
      />
      <g fill="#d15241">
        <path d="m43.1202087 88.9009781h-4.9270706l-3.3791008-47.3247986h5.9176827z" />
        <path d="m52.6824417 88.9009781h-4.9270706l-1.4565697-47.3247986h5.9176827z" />
        <path d="m62.2446747 88.9009781h-4.9270744l.4659614-47.3247986h5.9176827z" />
        <path d="m71.8069077 88.9009781h-4.9270707l2.3884888-47.3247986h5.9176788z" />
      </g>
      <path
        d="m86.2164917 27.2627449-5.1172028-2.7579441c-1.5614624-.8415394-3.3077698-1.2821941-5.0816269-1.2821941h-42.035324c-1.7738533 0-3.5201683.4406548-5.081625 1.2821941l-5.1172085 2.7579441c-.6603203.3558292-1.0720005 1.0454521-1.0720005 1.7956657v4.1007271c0 1.2029877.9751682 2.178154 2.178154 2.178154h60.2206879c1.2029877 0 2.178154-.9751663 2.178154-2.178154v-4.1007271c-.000002-.7502136-.4116841-1.4398365-1.0720082-1.7956657z"
        fill="#e56353"
      />
      <path
        d="m22.8195744 28.4333439c-.0648861.2001667-.1080704.4081554-.1080704.6250668v4.1007271c0 1.2029877.9751682 2.178154 2.178154 2.178154h60.2206879c1.2029877 0 2.178154-.9751663 2.178154-2.178154v-4.1007271c0-.2169113-.0431824-.4249001-.1080704-.6250668z"
        fill="#d15241"
      />
    </svg>
  );
}
const useCustomPersistedState = (key:any, defaultValue:any) => {
  const [state, setState] = React.useState(() => {
    const persistedStateLS = localStorage.getItem(key);
    return persistedStateLS ? JSON.parse(persistedStateLS) : defaultValue;
  });
  React.useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state));
  }, [state, key]);
  return [state, setState];
}