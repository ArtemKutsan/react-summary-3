import styles from './TodoCard.module.css';
import { memo } from 'react';

function TodoCard({ id, title, completed, iserId }) {
  // console.log('render:', id);
  return (
    <li className={styles.card}>
      <span className={styles.id}>{id}.</span>
      <span className={styles.title}>{title}</span>
    </li>
  );
}

export default memo(TodoCard);
