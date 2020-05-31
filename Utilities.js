//selectors
const todoInput = document.getElementById("textbox");
    //document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".myList");
const filterOption=document.getElementById("filter-todo")


//Event Listeners
todoButton.addEventListener("click", addToList);
todoList.addEventListener("click", deleteItem);
document.addEventListener('DOMContentLoaded', getTodos)
filterOption.addEventListener('click',filterToDo);
//but.addEventListener("click", sendmsg);

//Functions




function addToList(event) {
  
    //var a = document.getElementById("myList");
    //var t = document.getElementById("textbox").value;
    //prevent form from submitting
    event.preventDefault();

    //Todo-Div
if (todoInput.value=="")
{
alert("Sorry cannot read invisble text you just submitted, please try input visible text to proceed")
}
else{
    const todoDiv = document.createElement("DIV");
    todoDiv.classList.add("todo");
    //create the li
    const newTodo = document.createElement("LI");
    newTodo.classList.add("todo-item");
    newTodo.innerText = todoInput.value;

    todoDiv.appendChild(newTodo);
//adding li to local storage
saveLocalTodos(todoInput.value);

const completedButton = document.createElement('button');
completedButton.innerHTML = '<i class="fas fa-check"></i>';
completedButton.classList.add("completed");
todoDiv.appendChild(completedButton);

//Trash button
const trashButton = document.createElement('button');
trashButton.innerHTML = '<i class="fas fa-trash"></i>';
trashButton.classList.add("delete");
todoDiv.appendChild(trashButton);
   
    //append to list
    todoList.appendChild(todoDiv);

    //Clearing the textbox
    todoInput.value="";

}
    
}

function deleteItem(e) {

    const item=e.target
    console.log(item);
    if (item.classList[0] === "delete") {
        const todo = item.parentElement;
        removeLocalTodos(todo);
        todo.remove();
       
    }
    if (item.classList[0] === "completed") {
        const todo = item.parentElement;


        todo.classList.toggle("completed-task");
       
    }

}

//Adding a Filter
function filterToDo(e)
{
    const todos = todoList.getElementsByClassName("todo");
    
    for (i = 0; i < todos.length; i++) {
        
        switch(e.target.value)
        {
            case "all":
                todos[i].style.display = "flex";
                break;
            case "completed":
                if(todos[i].classList.contains("completed-task"))
                {
                    todos[i].style.display="flex"}
                else{
                    todos[i].style.display = "none";
                }
                break;
            case "notcompleted":
                if(!todos[i].classList.contains("completed-task"))
                {
                    todos[i].style.display="flex"}
                else{
                    todos[i].style.display = "none";
                }
                break;
        }
    }
}

//Adding to local storage
function saveLocalTodos(todo)
{
    //check do I already have a local todo storage?

    let todos;

    if  (localStorage.getItem('todos') === null)
    {
        todos= [];
    }else
    {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.push(todo);

    localStorage.setItem("todos",JSON.stringify(todos));
}


function getTodos()
{
    let todos;

    if  (localStorage.getItem('todos') === null)
    {
        todos= [];
    }else
    {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.forEach(function(todo)
    {

       //Todo-Div

    const todoDiv = document.createElement("DIV");
    todoDiv.classList.add("todo");
    //create the li
    const newTodo = document.createElement("LI");
    newTodo.classList.add("todo-item");
    newTodo.innerText = todo;

    todoDiv.appendChild(newTodo);

    //complete button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("completed");
    todoDiv.appendChild(completedButton);
    
    //Trash button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("delete");
    todoDiv.appendChild(trashButton);
   
    //append to list
    todoList.appendChild(todoDiv);

    });
}

function removeLocalTodos(todo){
    
    let todos;

    if  (localStorage.getItem('todos') === null)
    {
        todos= [];
    }else
    {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex),1);

    localStorage.setItem("todos",JSON.stringify(todos)); 

}



