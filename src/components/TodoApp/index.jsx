// src/components/DogsGallery/index.jsx
import axios from 'axios';
import { useEffect, useState } from 'react';
import styles from './TodoApp.module.css';

const BASE_URL = 'https://jsonplaceholder.typicode.com';
const limit = 5;
const userId = 1;

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [todoTitle, setTodoTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const addTodo = (title) => {
    const newTodo = { id: todos.length + 1, title, completed: false, userId };
    setTodos((prev) => [...prev, newTodo]);
  };

  const getTodos = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/todos?_limit=${limit}`);
      setTodos(response.data);
      console.log(todos);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const postTodo = async () => {
    setIsSending(true);
    try {
      const response = await axios.post(
        `${BASE_URL}/todos`,
        { id: todos.length + 1, title: todoTitle, completed: false, userId: 1 },
        { headers: { 'Content-Type': 'application/json; charset=UTF-8' } },
      );
      console.log(response);
      addTodo(todoTitle.trim());
      setTodoTitle('');
    } catch (error) {
      console.log(error);
    } finally {
      setIsSending(false);
    }
  };

  const handleAddTodo = (event) => {
    event.preventDefault();

    if (!todoTitle.trim()) return;

    postTodo(todoTitle.trim());
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div>
      <ul style={{ listStyle: 'none' }}>
        {isLoading && <p>Загрузка...</p>}

        {!isLoading &&
          todos.map((todo) => (
            <li key={todo.id}>
              {todo.id}. {todo.title}
            </li>
          ))}
      </ul>

      <form onSubmit={handleAddTodo} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <input
          type="text"
          value={todoTitle}
          onChange={(event) => setTodoTitle(event.target.value)}
          placeholder="Введите задачу"
        />
        <button type="submit">Добавить todo</button>
        {isSending && <span>Добавляется...</span>}
      </form>
    </div>
  );
}

export default TodoApp;
