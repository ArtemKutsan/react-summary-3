export function createTodo(id, title, userId = 1) {
  return {
    id,
    title,
    completed: false,
    userId,
  };
}
