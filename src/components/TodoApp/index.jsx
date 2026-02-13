// src/components/DogsGallery/index.jsx
import styles from './TodoApp.module.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import TodoCard from './TodoCard';
import { createTodo } from './createTodo';

const BASE_URL = 'https://jsonplaceholder.typicode.com';
const limit = 5;

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [todoTitle, setTodoTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const addTodo = (todo) => {
    setTodos((prev) => [...prev, todo]);
  };

  const getTodos = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/todos?_limit=${limit}`);
      setTodos(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const postTodo = async () => {
    setIsSending(true);
    try {
      const newTodo = createTodo(todos.length + 1, todoTitle);
      await axios.post(`${BASE_URL}/todos`, newTodo);
      addTodo(newTodo);
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
    postTodo();
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div>
      <form onSubmit={handleAddTodo} className={styles.form}>
        <input
          type="text"
          value={todoTitle}
          onChange={(event) => setTodoTitle(event.target.value)}
          placeholder="Введите задачу"
        />
        <button type="submit">Добавить todo</button>
        {isSending && <span>Задача добавляется...</span>}
      </form>

      {isLoading && <p>Загрузка списка задач...</p>}
      {!isLoading && (
        <ul className={styles.list}>
          {todos.map((todo) => (
            <TodoCard key={todo.id} {...todo} />
          ))}
        </ul>
      )}
    </div>
  );
}

export default TodoApp;
