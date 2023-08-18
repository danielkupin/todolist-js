const button = document.querySelector('.button-add-task')
const input = document.querySelector('.input-task')
const fullList = document.querySelector('.list-tasks')

let listItems = []

function addNewTask(){
    if(input.value != ''){
        listItems.push({
            task: input.value,
            finished: false
        })
    } else {
        window.alert("Por favor, insira uma tarefa...")
    }
    
    input.value = ''
    showTasks()
}

function showTasks(){
    let newLi = ''
    listItems.forEach((item, index) => {
        newLi = newLi + `
            <li class="task ${item.finished && "done"}">
                <img src="./img/checked.png" alt="check-na-tarefa" onclick="finishTask(${index})">
                <p>${item.task}</p>
                <img src="./img/trash.png" alt="tarefa-para-o-lixo" onclick="deleteItem(${index})">
            </li>
        `
    })

    fullList.innerHTML = newLi

    localStorage.setItem('lista', JSON.stringify(listItems))
}

function finishTask(index){
    listItems[index].finished = !listItems[index].finished
    showTasks()
}

function deleteItem(index){
    listItems.splice(index, 1)
    showTasks()
}

function bringSavedTasks(){
    const tasksFromLocalStorage = localStorage.getItem('lista')

    if(tasksFromLocalStorage){
        listItems = JSON.parse(tasksFromLocalStorage)
    }

    showTasks()
}

bringSavedTasks()
button.addEventListener('click', addNewTask)