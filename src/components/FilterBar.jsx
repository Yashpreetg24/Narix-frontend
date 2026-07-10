import React from 'react';
import styles from './FilterBar.module.css';

export default function FilterBar({ 
  priority, 
  setPriority, 
  assignee, 
  setAssignee, 
  uniqueAssignees,
  search,
  setSearch
}) {
  return (
    <div className={styles.filterBar}>
      <div className={styles.filterGroup}>
        <label htmlFor="search-filter" className={styles.label}>Search</label>
        <input 
          id="search-filter"
          type="text" 
          className={styles.input} 
          placeholder="Search by title..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className={styles.filterGroup}>
        <label htmlFor="priority-filter" className={styles.label}>Priority</label>
        <select 
          id="priority-filter"
          className={styles.select} 
          value={priority} 
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="all">All Priorities</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <div className={styles.filterGroup}>
        <label htmlFor="assignee-filter" className={styles.label}>Assignee</label>
        <select 
          id="assignee-filter"
          className={styles.select} 
          value={assignee} 
          onChange={(e) => setAssignee(e.target.value)}
        >
          <option value="all">All Assignees</option>
          {uniqueAssignees.map(a => (
            <option key={a} value={a}>{a}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
