const input = document.querySelector('.todo-input');
const addButton = document.querySelector('.todo-button')
const todoList = document.querySelector('.todo-list')




addButton.addEventListener("click", function(e) {
    e.preventDefault();
    //get the input box value
    var text = input.value;
    //create a div inside the ul
    const todoDiv = document.createElement('div')
    todoDiv.classList.add('todo')
        //Create a li
    const newTodo = document.createElement('li')
    newTodo.classList.add('todo-item')
        //Add the input text in the todolist
    newTodo.innerText = text
        //append the list with the div
    todoDiv.appendChild(newTodo)
        //clear the the input field
    input.value = ""
        //Checked button
    const selectButton = document.createElement('button');
    selectButton.innerHTML = '<i class="fa-solid fa-check"></i>'
    selectButton.classList.add('complete-button')
    todoDiv.appendChild(selectButton)
        //Trash button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fa-solid fa-trash"></i>'
    trashButton.classList.add('delete-button')
    todoDiv.appendChild(trashButton);
    //add the single list in the div
    todoList.appendChild(todoDiv)

})