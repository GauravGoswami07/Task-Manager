let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let editingTaskId = null;

// DOM Elements
const taskForm = document.getElementById('taskForm');
const taskTitleInput = document.getElementById('taskTitle');
const taskCategorySelect = document.getElementById('taskCategory');
const taskListContainer = document.getElementById('taskList');
const searchInput = document.getElementById('searchInput');
const pendingCount = document.getElementById('pendingCount');
const completedCount = document.getElementById('completedCount');
const submitBtn = document.getElementById('submitBtn');


function renderTasks(filterText = '') {
    while (taskListContainer.firstChild) {
        taskListContainer.removeChild(taskListContainer.firstChild);
    }
    const filteredTasks = tasks.filter(task => 
        task.title.toLowerCase().includes(filterText.toLowerCase())
    );
 
    completedCount.textContent = tasks.filter(t => t.status === "completed").length;
    pendingCount.textContent = tasks.filter(t => t.status === "pending").length;

    filteredTasks.forEach(task => {
    
        const card = document.createElement('div');
        card.className = 'task-card';
        
       
        card.dataset.id = task.id; 
        card.setAttribute('data-status', task.status); 
        card.setAttribute('data-category', task.category);

        const titleText = document.createElement('h3');
        titleText.appendChild(document.createTextNode(task.title));

        const metaText = document.createElement('p');
        metaText.appendChild(document.createTextNode(`Category: ${task.category} | Status: ${task.status}`));

        const actionsDiv = document.createElement('div');
        actionsDiv.className = 'task-actions';

        const completeBtn = document.createElement('button');
        completeBtn.dataset.action = 'complete';
        completeBtn.appendChild(document.createTextNode('Complete'));

        const editBtn = document.createElement('button');
        editBtn.dataset.action = 'edit';
        editBtn.appendChild(document.createTextNode('Edit'));

        const deleteBtn = document.createElement('button');
        deleteBtn.dataset.action = 'delete';
        deleteBtn.appendChild(document.createTextNode('Delete'));

        actionsDiv.append(completeBtn, editBtn, deleteBtn);
        card.append(titleText, metaText, actionsDiv);
        
        taskListContainer.appendChild(card);
    });

    
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

taskForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = taskTitleInput.value;
    const category = taskCategorySelect.value;

    if (editingTaskId) {
        const taskIndex = tasks.findIndex(t => t.id === editingTaskId);
        if (taskIndex !== -1) {
            tasks[taskIndex].title = title;
            tasks[taskIndex].category = category;
        }
        editingTaskId = null;
        submitBtn.textContent = 'Add Task';
    } else {
        const newTask = {
            id: Date.now().toString(),
            title: title,
            category: category,
            status: "pending"
        };
        tasks.push(newTask);
    }

    taskForm.reset();
    renderTasks();
});

taskListContainer.addEventListener('click', (e) => {
    if (!e.target.dataset.action) return;

    const action = e.target.dataset.action;
    const card = e.target.closest('.task-card');
    const taskId = card.dataset.id;

    if (action === 'delete') {
        tasks = tasks.filter(t => t.id !== taskId);
        renderTasks(searchInput.value);
    } 
    else if (action === 'complete') {
        const task = tasks.find(t => t.id === taskId);
        task.status = task.status === 'pending' ? 'completed' : 'pending';
        renderTasks(searchInput.value);
    } 
    else if (action === 'edit') {
        const task = tasks.find(t => t.id === taskId);
        taskTitleInput.value = task.title;
        taskCategorySelect.value = task.category;
        editingTaskId = task.id;
        submitBtn.textContent = 'Update Task';
    }
});

searchInput.addEventListener('input', (e) => {
    renderTasks(e.target.value);
});

document.getElementById('themeBtn').addEventListener('click', () => {
    const body = document.body;
    const currentTheme = body.dataset.theme;
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    body.setAttribute('data-theme', newTheme);

    const icon = document.getElementById('themeIcon');
    const label = document.getElementById('themeBtnText');
    if (newTheme === 'dark') {
        icon.textContent = '☀️';
        label.textContent = 'Light Mode';
    } else {
        icon.textContent = '🌙';
        label.textContent = 'Dark Mode';
    }
});

document.getElementById('demoBtn').addEventListener('click', () => {
    const input = document.getElementById('demoInput');
    
    console.log("--- BEFORE JS CHANGE ---");
    console.log("Property (input.value):", input.value);
    console.log("Attribute (input.getAttribute('value')):", input.getAttribute('value'));

    input.value = "Modified by JavaScript!";

    console.log("--- AFTER JS CHANGE ---");
    console.log("Property (input.value):", input.value);
    console.log("Attribute (input.getAttribute('value')):", input.getAttribute('value')); 
    
    alert("Check the browser console to see the difference between Properties and Attributes!");
});

const gp = document.getElementById('grandparent');
const p = document.getElementById('parent');
const c = document.getElementById('child');

function setupPropagation(isCapturing) {
    const newGp = gp.cloneNode(true);
    gp.replaceWith(newGp);
    
    const newP = newGp.querySelector('#parent');
    const newC = newGp.querySelector('#child');

    console.clear();
    console.log(`Setting up listeners in ${isCapturing ? 'CAPTURING' : 'BUBBLING'} mode.`);

    newGp.addEventListener('click', () => console.log('Grandparent Clicked!'), isCapturing);
    newP.addEventListener('click', () => console.log('Parent Clicked!'), isCapturing);
    newC.addEventListener('click', () => console.log('Child Clicked!'), isCapturing);
}
setupPropagation(false);

document.querySelectorAll('input[name="propagation"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
        const isCapturing = e.target.value === 'capturing';
        setupPropagation(isCapturing);
    });
});

renderTasks();