// Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');

// Event Listeners
todoButton.addEventListener('click', addTodo);

// Functions
function addTodo(event){
    // stopping form from submitting
    event.preventDefault();
    // create new DIV
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    // create new LI
    const newItem = document.createElement('li');
    newItem.classList.add('todo-item');
    newItem.innerText = todoInput.value;
    todoDiv.appendChild(newItem);
    // create CHECK BUTTON
    const completedButton = document.createElement('button');
    completedButton.classList.add('completed-btn');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    todoDiv.appendChild(completedButton);
    // create DELETE Button
    const trashButton = document.createElement('button');
    trashButton.classList.add('trash-btn');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    todoDiv.appendChild(trashButton);
    // add todoDiv to the actual list
    todoList.appendChild(todoDiv);
    // clear input value
    todoInput.value = '';
}