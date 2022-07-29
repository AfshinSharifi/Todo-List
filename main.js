const mode = document.querySelector('.mode');
const modeIcon = document.querySelectorAll('.mode span');
const input = document.querySelector('.addTask');
const addTask = document.querySelector('.add');
const theme = document.querySelector('#theme');
const ul = document.querySelector('ul');
const buttonDays = document.querySelectorAll('.date span');
const days = document.querySelector('.date');
const day = new Date().getDay();
const fullDays = {
    1: 'Sunday',
    2: 'Monday',
    3: 'Tuesday',
    4: 'Wednesday',
    5: 'Thursday',
    6: 'Friday',
    7: 'Saturday'
};


//addEventListeners
document.addEventListener('DOMContentLoaded', getTodo);
document.addEventListener('DOMContentLoaded', () => {
    days.childNodes[1].innerText = `${fullDays[day]}`;
});

theme.addEventListener('click', ev => {
    document.querySelector('.container').classList.toggle('dark');
});

modeIcon.forEach(icon => {
    icon.addEventListener('click', ev => {
        days.childNodes[1].innerText = `${fullDays[day]}`;
        mode.classList.toggle('move');
        addMode(input.value, icon);
        input.value = '';
    });
});

addTask.addEventListener('click', ev => {
    if (input.value != '') {
        mode.classList.add('move');
    };
});

ul.addEventListener('click', ev => {
    const target = ev.target.parentNode.classList[0];
    switch (target) {
        case 'delete':
            ev.target.parentNode.parentNode.parentNode.remove();
            break;
        case 'edit':
            ev.target.parentNode.parentNode.parentNode.childNodes[2].toggleAttribute('contenteditable');
            ev.target.parentNode.parentNode.parentNode.childNodes[2].focus();
            break;
        case 'flex1':
            ev.target.classList.toggle('doney');
            break;
        default:
            break;
    };
});

buttonDays.forEach(button => {
    button.addEventListener('click', ev => {
        if (button.classList.contains('next')) {
            days.childNodes[1].innerText = `${fullDays[day + 1]}`;
        } else if (button.classList.contains('prev')) {
            days.childNodes[1].innerText = `${fullDays[day - 1]}`;
        };
    });
});

//Functions
function addMode(text, mode, isSave = true) {
    const task = document.createElement('li');
    task.innerHTML = `<span class="check"><i class="fa-solid fa-check"></i></span>
    <p class="done">${text}</p><input type="checkbox" id="checkbox"><label for="checkbox" class="mEdit">
    <i class="fa-solid fa-ellipsis"></i>
    </label>
    ${mode.outerHTML}
    <div class="tooltip flex">
                        <span class="delete">
                            <i class="fa-solid fa-trash"></i><span>Delete</span>
                        </span>
                        <span class="edit">
                            <i class="fa-solid fa-pen-to-square"></i><span>Edit</span>
                        </span>
                    </div>`;
    task.classList.add('flex1');
    task.childNodes[2].style.color = getComputedStyle(mode).backgroundColor;
    console.log(getComputedStyle(mode).backgroundColor);
    ul.insertBefore(task, ul.childNodes[0]);
    if (isSave) saveTodo(text, mode);
}

function saveTodo(text, model) {
    const todoList = localStorage.todo ? JSON.parse(localStorage.todo) : [];
    const todo = {
        day: fullDays[day],
        date: new Date().toUTCString(),
        text: text,
        color: getComputedStyle(model).backgroundColor,
        icon: model.classList[0]
    };
    todoList.push(todo);
    localStorage.todo = JSON.stringify(todoList);
}

function getTodo() {
    const todoList = localStorage.todo ? JSON.parse(localStorage.todo) : [];
    todoList.forEach(todo => {
        addMode(todo.text, todo.icon, false);
    });
}