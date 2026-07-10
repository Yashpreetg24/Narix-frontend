import React, { useState } from 'react';
import TaskForm from './TaskForm';
import styles from './TaskCard.module.css';

export default function TaskCard({ task, updateTask, deleteTask }) {
  const [isEditing, setIsEditing] = useState(false);

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

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTask(task.id);
    }
  };

  const handleUpdate = (updatedData) => {
    updateTask(task.id, updatedData);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <TaskForm 
        initialData={task}
        onSubmit={handleUpdate}
        onCancel={() => setIsEditing(false)}
      />
    );
  }

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
      <div className={styles.actions}>
        <button className={styles.iconBtn} onClick={() => setIsEditing(true)}>Edit</button>
        <button className={`${styles.iconBtn} ${styles.deleteBtn}`} onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
}
