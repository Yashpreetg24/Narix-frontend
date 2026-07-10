import React, { useState } from 'react';
import styles from './TaskForm.module.css';

export default function TaskForm({ initialData, onSubmit, onCancel, defaultStatus = 'todo' }) {
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [priority, setPriority] = useState(initialData?.priority || 'medium');
  const [assignee, setAssignee] = useState(initialData?.assignee || '');

  const MAX_TITLE_LENGTH = 80;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSubmit({
      title: title.trim(),
      description: description.trim(),
      priority,
      assignee: assignee.trim(),
      status: initialData?.status || defaultStatus
    });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.formGroup}>
        <label htmlFor="task-title" className={styles.label}>
          Title
          <span className={styles.charCount}>
            {title.length}/{MAX_TITLE_LENGTH}
          </span>
        </label>
        <input
          id="task-title"
          type="text"
          className={styles.input}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={MAX_TITLE_LENGTH}
          required
          autoFocus
          placeholder="What needs to be done?"
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="task-desc" className={styles.label}>Description (optional)</label>
        <textarea
          id="task-desc"
          className={styles.textarea}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Add more details..."
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="task-priority" className={styles.label}>Priority</label>
        <select
          id="task-priority"
          className={styles.select}
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="task-assignee" className={styles.label}>Assignee</label>
        <input
          id="task-assignee"
          type="text"
          className={styles.input}
          value={assignee}
          onChange={(e) => setAssignee(e.target.value)}
          placeholder="e.g. Aditi"
        />
      </div>

      <div className={styles.actions}>
        <button type="button" className={`${styles.btn} ${styles.cancelBtn}`} onClick={onCancel}>
          Cancel
        </button>
        <button 
          type="submit" 
          className={`${styles.btn} ${styles.submitBtn}`}
          disabled={!title.trim() || title.length > MAX_TITLE_LENGTH}
        >
          {initialData ? 'Save Changes' : 'Add Task'}
        </button>
      </div>
    </form>
  );
}
