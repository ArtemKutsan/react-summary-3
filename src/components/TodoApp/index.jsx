// src/components/DogsGallery/index.jsx
import axios from 'axios';
import { useEffect, useState } from 'react';
import styles from './TodoApp.module.css';

const BASE_URL = 'https://jsonplaceholder.typicode.com';
const limit = 5;

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const url5Todos = `${BASE_URL}/todos?_limit=${limit}`;

  async function fetchTodos() {
    try {
      const response = await axios.get(url5Todos);

      console.log(response.data);
      setTodos(response.data);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchTodos();
  }, []);

  // const addTodo = async () => {
  //   const newTodo = {};
  //   setTodos((prev) => [...prev, newTodo]);
  // };

  return (
    <div>
      <ul>
        {isLoading && <p>Загрузка...</p>}

        {!isLoading && todos.map((todo) => <li key={todo.id}>{todo.title}</li>)}
      </ul>
    </div>
  );
}

export default TodoApp;
