const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');
const filterButtons = document.querySelectorAll('.filters button');
const countTotal = document.getElementById('count-total');
const countDone = document.getElementById('count-done');
const themeToggle = document.getElementById('theme-toggle');

let todos = JSON.parse(localStorage.getItem('todos')) || [];
let filter = 'all';

// Theme Toggle
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
});

// Filter buttons
filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('active'));
    button.classList.add('active');
    filter = button.dataset.filter;
    renderTodos();
  });
});

// Tambah Todo
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (text) {
    todos.push({ text, completed: false });
    input.value = '';
    saveAndRender();
  }
});

// Toggle selesai
function toggleTodo(index) {
  todos[index].completed = !todos[index].completed;
  saveAndRender();
}

// Hapus Todo
function deleteTodo(index) {
  todos.splice(index, 1);
  saveAndRender();
}

// Render
function renderTodos() {
  list.innerHTML = '';
  const filtered = todos.filter(todo => {
    if (filter === 'all') return true;
    if (filter === 'completed') return todo.completed;
    return !todo.completed;
  });

  filtered.forEach((todo, index) => {
    const li = document.createElement('li');
    li.className = todo.completed ? 'completed' : '';
    li.innerHTML = `
      <span onclick="toggleTodo(${todos.indexOf(todo)})">${todo.text}</span>
      <div class="actions">
        <button onclick="deleteTodo(${todos.indexOf(todo)})">🗑️</button>
      </div>
    `;
    list.appendChild(li);
  });

  countTotal.textContent = `Total: ${todos.length}`;
  countDone.textContent = `Selesai: ${todos.filter(t => t.completed).length}`;
}

// Simpan & Render
function saveAndRender() {
  localStorage.setItem('todos', JSON.stringify(todos));
  renderTodos();
}

// Inisialisasi
renderTodos();
