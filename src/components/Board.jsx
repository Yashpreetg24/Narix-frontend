import React, { useState, useMemo } from 'react';
import { useTasks } from '../hooks/useTasks';
import { useDebounce } from '../hooks/useDebounce';
import Column from './Column';
import TaskForm from './TaskForm';
import FilterBar from './FilterBar';
import styles from './Board.module.css';

export default function Board() {
  const { tasks, loading, error, clearError, addTask, updateTask, deleteTask } = useTasks();
  const [isAddingTask, setIsAddingTask] = useState(false);
  
  // Filter states
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [assigneeFilter, setAssigneeFilter] = useState('all');
  const [search, setSearch] = useState('');
  
  const debouncedSearch = useDebounce(search, 300);

  // Compute unique assignees for the dropdown
  const uniqueAssignees = useMemo(() => {
    const assignees = new Set(tasks.map(t => t.assignee).filter(Boolean));
    return Array.from(assignees).sort();
  }, [tasks]);

  // Derive filtered tasks based on all active filters combined
  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter;
      const matchesAssignee = assigneeFilter === 'all' || task.assignee === assigneeFilter;
      const matchesSearch = !debouncedSearch || task.title.toLowerCase().includes(debouncedSearch.toLowerCase());
      
      return matchesPriority && matchesAssignee && matchesSearch;
    });
  }, [tasks, priorityFilter, assigneeFilter, debouncedSearch]);

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

      {error && (
        <div className={styles.errorBanner}>
          <span>{error}</span>
          <button className={styles.dismissBtn} onClick={clearError}>Dismiss</button>
        </div>
      )}

      {loading && (
        <div className={styles.loading}>Loading seed data...</div>
      )}

      <FilterBar 
        priority={priorityFilter}
        setPriority={setPriorityFilter}
        assignee={assigneeFilter}
        setAssignee={setAssigneeFilter}
        uniqueAssignees={uniqueAssignees}
        search={search}
        setSearch={setSearch}
      />

      <div className={styles.boardContainer}>
        {/* 
          Counts are derived naturally from tasks.filter().length passed to each Column.
          This ensures they are always in sync and not stored in separate state.
        */}
        <Column 
          title="To Do" 
          status="todo" 
          tasks={filteredTasks.filter(t => t.status === 'todo')}
          updateTask={updateTask}
          deleteTask={deleteTask}
        />
        <Column 
          title="In Progress" 
          status="in-progress" 
          tasks={filteredTasks.filter(t => t.status === 'in-progress')}
          updateTask={updateTask}
          deleteTask={deleteTask}
        />
        <Column 
          title="Done" 
          status="done" 
          tasks={filteredTasks.filter(t => t.status === 'done')}
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
