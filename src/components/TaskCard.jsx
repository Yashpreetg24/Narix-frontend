import React from 'react';
import styles from './TaskCard.module.css';

export default function TaskCard({ task }) {
  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'low': return styles.priorityLow;
      case 'medium': return styles.priorityMedium;
      case 'high': return styles.priorityHigh;
      default: return styles.priorityLow;
    }
  };

  const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : '?';
  };

  return (
    <div className={styles.card}>
      <div className={styles.title}>{task.title}</div>
      {task.description && (
        <div className={styles.description}>{task.description}</div>
      )}
      <div className={styles.footer}>
        <span className={`${styles.priority} ${getPriorityClass(task.priority)}`}>
          {task.priority}
        </span>
        <span className={styles.assignee} title={task.assignee}>
          {getInitial(task.assignee)}
        </span>
      </div>
    </div>
  );
}
