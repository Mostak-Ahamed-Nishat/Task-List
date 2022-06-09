const input = document.querySelector('.todo-input');
const addButton = document.querySelector('.todo-button')
const todoList = document.querySelector('.todo-list')
const filterOption = document.querySelector('.filter-todo')
const todo = document.querySelector('.todo')


//Event Listener
addButton.addEventListener("click", createTodo)
document.addEventListener('DOMContentLoaded', getTodos)
filterOption.addEventListener("click", filterTodo)
todoList.addEventListener("click", removeFromList)

//Create Todo after click
function createTodo(e) {
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
    if (text.length > 0) {
        newTodo.innerText = text
            //append the list with the div
        todoDiv.appendChild(newTodo)
            //Add data to localStorage
        addLocalStorage(text)
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
    } else {
        alert("Todo should not be empty")
    }
}
//Store todo in the store
function addLocalStorage(todo) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos))
}
//Get All To the todos from local storage
function getTodos(e) {
    let todos;
    let completed
    if (localStorage.getItem('todos') === null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }

    if (localStorage.getItem('completed') === null) {
        completed = []
    } else {
        completed = JSON.parse(localStorage.getItem('completed'))
    }
    todos.forEach((todo) => {
        e.preventDefault();
        //create a div inside the ul
        const todoDiv = document.createElement('div')
        todoDiv.classList.add('todo')
            //Create a li
        const newTodo = document.createElement('li')
        newTodo.classList.add('todo-item')
            //Add the input text in the todolist
        newTodo.innerText = todo
        if (completed.includes(todo)) todoDiv.classList.toggle('completed')
            //append the list with the div
        todoDiv.appendChild(newTodo)
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
}
//Filter Todo as All & Complete or inComplete
function filterTodo(e) {
    const todos = todoList.childNodes
    todos.forEach((todo) => {
        if (e.target.value === "all") {
            todo.style.display = "flex";
        } else if (e.target.value === "completed") {
            if (todo.classList.contains('completed')) {
                todo.style.display = "flex";
            } else {
                todo.style.display = "none";
            }
        } else if (e.target.value === "uncompleted") {
            if (!todo.classList.contains('completed')) {
                todo.style.display = "flex";
            } else {
                todo.style.display = "none";
            }
        }
    })
}

//Set Todo as complete
function sendToComplete(todo) {
    let completed
    let isExist
    if (localStorage.getItem('completed') === null || localStorage.getItem('completed').length <= 0) {
        completed = []
        completed.push(todo)
    } else {
        completed = [...JSON.parse(localStorage.getItem('completed'))]
        isExist = completed.filter((singleTodo) => {
            if (singleTodo === todo) {
                return singleTodo
            }
        })
        if (isExist[0]) {
            let index = completed.indexOf(isExist[0])
            completed.splice(index, 1);
        } else {
            completed.push(todo)
        }
    }
    localStorage.setItem('completed', JSON.stringify(completed))
}

///Remove List and check 
function removeFromList(e) {
    const item = e.target;
    if (item.classList.contains('delete-button')) {
        const parent = item.parentElement
        parent.classList.add('slideAnimation')
        const firstChild = parent.children[0];
        setTimeout(() => {
            parent.remove()
        }, 500);
        deleteTodo(firstChild)
    }
    //CheckMark Item
    if (item.classList[0] === 'complete-button') {
        const todo = item.parentElement;
        todo.classList.toggle('completed')
        let currentTodo = item.previousElementSibling.innerText
        sendToComplete(currentTodo)
    }
}

//Delete Todo from Store
function deleteTodo(todo) {
    let item = todo.innerText
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    todos.splice(todos.indexOf(item), 1)
    localStorage.setItem('todos', JSON.stringify(todos))
}