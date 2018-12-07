// Define UI vars
//localStorage.clear();
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector("#task");

//load all event listners

loadEventListners();

function loadEventListners() {
    //DOM Load event
    document.addEventListener('DOMContentLoaded',getTasks);
    //add task
    form.addEventListener('submit' , addTask);
    //Remove Task Event
    taskList.addEventListener('click', deleteTask);
    //Clear all tasks
    clearBtn.addEventListener('click',clearTasks);
    //Filter tasks
    filter.addEventListener('keyup',filterTasks);
}

//getting tasks
function getTasks(){
    let tasks;

    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){
        //creating li for our task
    const li = document.createElement('li');
    //adding class
    li.className = 'collection-item';
    //create text node
    li.appendChild(document.createTextNode(task));

    //create new link element
    const link = document.createElement('a');
    //add class
    link.className = 'delete-item secondary-content';
    //adding delete symbol
    link.innerHTML = `<i class = "fa fa-remove"></i>`;
    
    //adding icon to out list item
    li.appendChild(link);

    //finally adding our list item to our ul
    taskList.appendChild(li);
   
    });
}

//Adding task
function addTask(e){
    //check empty
    if(taskInput.value === ''){
        alert('Add a task');
    }

    //creating li for our task
    const li = document.createElement('li');
    //adding class
    li.className = 'collection-item';
    //create text node
    li.appendChild(document.createTextNode(taskInput.value));

    //create new link element
    const link = document.createElement('a');
    //add class
    link.className = 'delete-item secondary-content';
    //adding delete symbol
    link.innerHTML = `<i class = "fa fa-remove"></i>`;
    
    //adding icon to out list item
    li.appendChild(link);

    //finally adding our list item to our ul
    taskList.appendChild(li);

    //store to local storage
    StoreToLocalStorage(taskInput.value);

    taskInput.value = '';

    e.preventDefault();
}

//Storing to local storage
function StoreToLocalStorage(task){
    let tasks;

    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);

    //saving to local storage
    localStorage.setItem('tasks',JSON.stringify(tasks));
    
}

//Deleting task
function deleteTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm("Are You Sure ? ...")){
            e.target.parentElement.parentElement.remove();
            deleteFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}

//Deleting form local storage
function deleteFromLocalStorage(taskItem){
    let tasks;

    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task,index){
        if(taskItem.textContent === task){
            tasks.splice(index,1);
        }
    });
    localStorage.setItem('tasks',JSON.stringify(tasks));
}

//clearing all tasks
function clearTasks(){
    if(confirm("Are You Sure To Delete All Tasks ???")){
        //taskList.innerHtml = '';

        //faster method
        while(taskList.firstChild){
            taskList.removeChild(taskList.firstChild);
        }
    }
    //clearing from local storage
    localStorage.clear();
}

//Filter tasks
function filterTasks(e){
    
    const text = e.target.value.toLowerCase();
    //console.log(text);
    //checking on all collection items
    document.querySelectorAll('.collection-item').forEach(
        function(task){
            const item = task.firstChild.textContent.toLowerCase();
            //console.log(item);
            if(item.indexOf(text) != -1){
                task.style.display = 'block';
            }else{
                task.style.display = 'none';
            }
        });
}

