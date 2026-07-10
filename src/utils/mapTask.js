export const getPriorityAndAssignee = (id) => {
  const priorities = ['low', 'medium', 'high'];
  const assignees = ['Aditi', 'Rohan', 'Meera', 'Kabir', 'Sana'];

  return {
    priority: priorities[id % 3],
    assignee: assignees[id % 5]
  };
};

export const mapApiTodoToTask = (todo) => {
  const { priority, assignee } = getPriorityAndAssignee(todo.id);

  return {
    id: String(todo.id),
    title: todo.title,
    description: '',
    priority,
    assignee,
    status: todo.completed ? 'done' : 'todo'
  };
};
