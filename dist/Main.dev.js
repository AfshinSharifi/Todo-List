"use strict";

var mode = document.querySelector('.mode');
var modeIcon = document.querySelectorAll('.mode span');
var input = document.querySelector('.addTask');
var addTask = document.querySelector('.add');
var theme = document.querySelector('#theme');
var ul = document.querySelector('ul');
var buttonDays = document.querySelectorAll('.date span');
var days = document.querySelector('.date');
var day = new Date().getDay();
var fullDays = {
  1: 'Monday',
  2: 'Tuesday',
  3: 'Wednesday',
  4: 'Thursday',
  5: 'Friday',
  6: 'Saturday',
  7: 'Sunday'
}; //addEventListeners

document.addEventListener('DOMContentLoaded', getTodo);
document.addEventListener('DOMContentLoaded', function () {
  days.childNodes[1].innerText = "".concat(fullDays[day]);
});
theme.addEventListener('click', function (ev) {
  document.querySelector('.container').classList.toggle('dark');
});
modeIcon.forEach(function (icon) {
  icon.addEventListener('click', function (ev) {
    days.childNodes[1].innerText = "".concat(fullDays[day]);
    mode.classList.toggle('move');
    addMode(input.value, icon);
    input.value = '';
  });
});
addTask.addEventListener('click', function (ev) {
  if (input.value != '') {
    mode.classList.add('move');
  }

  ;
});
ul.addEventListener('click', function (ev) {
  var target = ev.target.parentNode.classList[0];

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
  }

  ;
});
buttonDays.forEach(function (button) {
  button.addEventListener('click', function (ev) {
    if (button.classList.contains('next')) {
      days.childNodes[1].innerText = "".concat(fullDays[day + 1]);
    } else if (button.classList.contains('prev')) {
      days.childNodes[1].innerText = "".concat(fullDays[day - 1]);
    }

    ;
  });
}); //Functions

function addMode(text, mode) {
  var isSave = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  var task = document.createElement('li');
  task.innerHTML = "<span class=\"check\"><i class=\"fa-solid fa-check\"></i></span>\n    <p class=\"done\">".concat(text, "</p><input type=\"checkbox\" id=\"checkbox\"><label for=\"checkbox\" class=\"mEdit\">\n    <i class=\"fa-solid fa-ellipsis\"></i>\n    </label>\n    ").concat(mode.outerHTML, "\n    <div class=\"tooltip flex\">\n                        <span class=\"delete\">\n                            <i class=\"fa-solid fa-trash\"></i><span>Delete</span>\n                        </span>\n                        <span class=\"edit\">\n                            <i class=\"fa-solid fa-pen-to-square\"></i><span>Edit</span>\n                        </span>\n                    </div>");
  task.classList.add('flex1');
  task.childNodes[2].style.color = getComputedStyle(mode).backgroundColor;
  console.log(getComputedStyle(mode).backgroundColor);
  ul.insertBefore(task, ul.childNodes[0]);
  if (isSave) saveTodo(text, mode);
}

function saveTodo(text, model) {
  var todoList = localStorage.todo ? JSON.parse(localStorage.todo) : [];
  var todo = {
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
  var todoList = localStorage.todo ? JSON.parse(localStorage.todo) : [];
  todoList.forEach(function (todo) {
    addMode(todo.text, todo.icon, false);
  });
}