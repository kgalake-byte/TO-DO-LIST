document.addEventListener('DOMContentLoaded', () => {
  const taskInput = document.getElementById('taskInput');
  const addTaskBtn = document.getElementById('addTaskBtn');
  const taskList = document.getElementById('taskList');

  // Load tasks from localStorage
  loadTasks();

  // Add task
  addTaskBtn.addEventListener('click', addTask);
  taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
  });

  function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === '') return;

    const task = {
      id: Date.now(),
      text: taskText,
      completed: false
    };

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));

    renderTask(task);
    taskInput.value = '';
  }

  function renderTask(task) {
    const li = document.createElement('li');
    li.dataset.id = task.id;
    if (task.completed) li.classList.add('completed');

    li.innerHTML = `
      <span>${task.text}</span>
      <button class="delete-btn">Delete</button>
    `;

    li.querySelector('span').addEventListener('click', () => toggleComplete(task.id));
    li.querySelector('.delete-btn').addEventListener('click', () => deleteTask(task.id));

    taskList.appendChild(li);
  }

  function toggleComplete(id) {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks = tasks.map(task => {
      if (task.id === id) task.completed = !task.completed;
      return task;
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));

    const li = document.querySelector(`li[data-id="${id}"]`);
    li.classList.toggle('completed');
  }

  function deleteTask(id) {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks = tasks.filter(task => task.id !== id);
    localStorage.setItem('tasks', JSON.stringify(tasks));

    const li = document.querySelector(`li[data-id="${id}"]`);
    li.remove();
  }

  function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(renderTask);
  }
});
