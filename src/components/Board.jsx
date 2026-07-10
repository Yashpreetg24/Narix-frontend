import React, { useState } from 'react';
import { useTasks } from '../hooks/useTasks';
import Column from './Column';
import TaskForm from './TaskForm';
import styles from './Board.module.css';

export default function Board() {
  const { tasks, loading, error, addTask } = useTasks();
  const [isAddingTask, setIsAddingTask] = useState(false);

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  if (loading) {
    return <div className={styles.loading}>Loading board...</div>;
  }

  const handleAddTask = (taskData) => {
    addTask(taskData);
    setIsAddingTask(false);
  };

  return (
    <>
      <div className={styles.header}>
        <h2>Sprint Board</h2>
        <button className={styles.addBtn} onClick={() => setIsAddingTask(true)}>
          Add Task
        </button>
      </div>

      <div className={styles.boardContainer}>
        {/* 
          Counts are derived naturally from tasks.filter().length passed to each Column.
          This ensures they are always in sync and not stored in separate state.
        */}
        <Column 
          title="To Do" 
          status="todo" 
          tasks={tasks.filter(t => t.status === 'todo')}
          updateTask={updateTask}
          deleteTask={deleteTask}
        />
        <Column 
          title="In Progress" 
          status="in-progress" 
          tasks={tasks.filter(t => t.status === 'in-progress')}
          updateTask={updateTask}
          deleteTask={deleteTask}
        />
        <Column 
          title="Done" 
          status="done" 
          tasks={tasks.filter(t => t.status === 'done')}
          updateTask={updateTask}
          deleteTask={deleteTask}
        />
      </div>

      {isAddingTask && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <TaskForm 
              onSubmit={handleAddTask} 
              onCancel={() => setIsAddingTask(false)} 
            />
          </div>
        </div>
      )}
    </>
  );
}
