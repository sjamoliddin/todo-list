// Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

// Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);

// Functions
function createTodo(input) {
    // create new DIV
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    // create new LI
    const newItem = document.createElement('li');
    newItem.classList.add('todo-item');
    newItem.innerText = input;
    todoDiv.appendChild(newItem);
    // create CHECK BUTTON
    const completedButton = document.createElement('button');
    completedButton.classList.add('complete-btn');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    todoDiv.appendChild(completedButton);
    // create DELETE Button
    const trashButton = document.createElement('button');
    trashButton.classList.add('trash-btn');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    todoDiv.appendChild(trashButton);
    // add todoDiv to the actual list
    todoList.appendChild(todoDiv);
}

function addTodo(event) {
    // stopping form from submitting
    event.preventDefault();
    // adding todos
    createTodo(todoInput.value);
    // save todo in local storage
    saveLocalTodo(todoInput.value);
    // clear input value
    todoInput.value = '';
}

function deleteCheck(event) {
    const item = event.target;
    const todo = item.parentElement;

    if (item.classList.contains('trash-btn')) {
        todo.classList.add('fall');
        // deleting from local storage
        deleteLocalTodo(todo);
        todo.addEventListener('transitionend', () => {
            todo.remove();
        });
    } else {
        todo.classList.toggle('completed');
    }
}

function filterTodo(event) {
    // getting all todos 
    const todos = todoList.childNodes;
    // filtering according to option's value
    todos.forEach((todo) => {
        switch (event.target.value) {
            case 'completed':
                if (todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
            case 'uncompleted':
                if (todo.classList.contains('completed')) {
                    todo.style.display = 'none';
                } else {
                    todo.style.display = 'flex';
                }
                break;
            default:
                todo.style.display = 'flex';
                break;
        }
    });
}

function checkStorage() {
    // check if there is already data    
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    return todos;
}

function saveLocalTodo(todo) {
    let todos = checkStorage();
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
    let todos = checkStorage();
    todos.forEach((todo) => {
        createTodo(todo);
    });
}

function deleteLocalTodo(todo) {
    let todos = checkStorage();
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}