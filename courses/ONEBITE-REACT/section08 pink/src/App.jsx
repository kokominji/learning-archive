import "./App.css";
import { useState, useRef } from "react";
import Header from "./components/Header";
import List from "./components/List";
import Editor from "./components/Editor";

// 리렌더링이 될때마다 다시 생성될 필요가 없기때문에 외부에 선언한다.
const mockData = [
  {
    id: 0,
    isDone: false,
    content: "딸기 먹기",
    date: new Date().getTime(),
  },
  {
    id: 1,
    isDone: false,
    content: "React 공부하기",
    date: new Date().getTime(),
  },
  {
    id: 2,
    isDone: false,
    content: "빨래 하기",
    date: new Date().getTime(),
  },
];

function App() {
  const [todos, setTodos] = useState(mockData); // 여러가지 값을 넣을것
  const idRef = useRef(3);

  const onCreate = (content) => {
    const newTodo = {
      id: idRef.current++,
      isDone: false,
      content: content,
      date: new Date().getTime(),
    };
    setTodos((prev) => [newTodo, ...prev]); // 리액트의 비동기적 특징때문에 todo/...todo로 넣는거보다
    // prev를 사용하는 것이 안전하다.
  };

  const onUpdate = (targetId) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === targetId) {
          return {
            ...todo,
            isDone: !todo.isDone,
          };
        }
        return todo;
      })
    );
  };

  const onDelete = (targetId) => {
    setTodos(todos.filter((todo) => todo.id !== targetId));
  };

  return (
    <div className="App">
      <Header />
      <Editor onCreate={onCreate} />
      <List todos={todos} onUpdate={onUpdate} onDelete={onDelete} />
    </div>
  );
}

export default App;
