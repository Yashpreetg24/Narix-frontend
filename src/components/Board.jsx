import React from 'react';
import { useTasks } from '../hooks/useTasks';
import Column from './Column';
import styles from './Board.module.css';

export default function Board() {
  const { tasks, loading, error } = useTasks();

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  if (loading) {
    return <div className={styles.loading}>Loading board...</div>;
  }

  return (
    <div className={styles.boardContainer}>
      <Column 
        title="To Do" 
        status="todo" 
        tasks={tasks.filter(t => t.status === 'todo')} 
      />
      <Column 
        title="In Progress" 
        status="in-progress" 
        tasks={tasks.filter(t => t.status === 'in-progress')} 
      />
      <Column 
        title="Done" 
        status="done" 
        tasks={tasks.filter(t => t.status === 'done')} 
      />
    </div>
  );
}
