import React from 'react';
import TaskCard from './TaskCard';
import styles from './Column.module.css';

export default function Column({ title, status, tasks }) {
  return (
    <div className={styles.column}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <span className={styles.count}>{tasks.length}</span>
      </div>
      <div className={styles.taskList}>
        {tasks.length === 0 ? (
          <div className={styles.emptyState}>No tasks here.</div>
        ) : (
          tasks.map(task => (
            <TaskCard key={task.id} task={task} />
          ))
        )}
      </div>
    </div>
  );
}
