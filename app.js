const input = document.querySelector('.todo-input');
const addButton = document.querySelector('.todo-button')
const todoList = document.querySelector('.todo-list')
const filterOption = document.querySelector('.filter-todo')
const todo = document.querySelector('.todo')
console.log(todo);

//Event Listener
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
    if (text.length > 3) {
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
    } else {
        alert("Todo must be more than 3 character")
    }


    //Create the element and attaching the listener
})

///Delete List and check
todoList.addEventListener("click", function(e) {
    const item = e.target;
    //Delete Item
    console.log(item);
    if (item.classList[0] === 'delete-button') {
        const parentElement = item.parentElement;
        parentElement.classList.add('slideAnimation')
        parentElement.addEventListener('transitionend', () => {
            parentElement.remove()
        })
    }
    //CheckMark Item
    if (item.classList[0] === 'complete-button') {
        const todo = item.parentElement;
        todo.classList.toggle('completed')
    }
})

//FIlter Todos

// filterOption.addEventListener("click", function filterTodo(e) {
//     const todos = filterOption.children;
//     // console.log(typeof(todos));
//     todos.forEach((todo) => {
//         console.log(todo.target);
//     });

// })

// var val = filterOption.options[filterOption.selectedIndex].value;
// console.log(val);

filterOption.addEventListener("click", function(e) {

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

})

// if (allList.classList.contains("completed")) {
//     var data = allList.classList.contains("completed")
//     console.log(data);
// }