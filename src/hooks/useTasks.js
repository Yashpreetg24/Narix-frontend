import { useState, useEffect, useRef } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { mapApiTodoToTask } from '../utils/mapTask';

const STORAGE_KEY = 'sprintboard.tasks';
const SEED_URL = 'https://jsonplaceholder.typicode.com/todos?_limit=12';

export function useTasks() {
  const [tasks, setTasks] = useLocalStorage(STORAGE_KEY, null);
  const [loading, setLoading] = useState(!tasks);
  const [error, setError] = useState(null);

  // We use a ref to prevent strict mode from running the fetch twice
  const fetchedRef = useRef(false);

  useEffect(() => {
    // If we already have tasks in local storage, or if we already initiated the fetch, do nothing.
    if (tasks !== null || fetchedRef.current) {
      if (tasks !== null && loading) {
        setLoading(false);
      }
      return;
    }

    fetchedRef.current = true;

    const fetchSeedData = async () => {
      try {
        setLoading(true);
        const response = await fetch(SEED_URL);
        if (!response.ok) {
          throw new Error('Failed to fetch seed data');
        }
        
        const data = await response.json();
        const mappedTasks = data.map(mapApiTodoToTask);
        setTasks(mappedTasks);
      } catch (err) {
        console.error(err);
        setError(err.message || 'An error occurred fetching seed data.');
        setTasks([]); // Fallback to empty array on error
      } finally {
        setLoading(false);
      }
    };

    fetchSeedData();
  }, [tasks, setTasks, loading]);

  // If tasks is still null (during initial render before effect runs or while fetching), expose as empty array
  return {
    tasks: tasks || [],
    loading,
    error,
  };
}
