const uploadInput = document.getElementById('image-upload');
const leftGallery = document.getElementById('left-gallery');
const rightGallery = document.getElementById('right-gallery');
const preview = document.getElementById('preview');

uploadInput.addEventListener('change', () => {
    displayImages(uploadInput.files);
});

function displayImages(files) {
    leftGallery.innerHTML = '';
    rightGallery.innerHTML = '';

    for (let i = 0; i < files.length; i++) {
        const img = document.createElement('img');
        img.src = URL.createObjectURL(files[i]);
        img.style.maxWidth = '100%';
        img.style.maxHeight = '100%';

        if (i % 2 === 0) {
            rightGallery.appendChild(img);
        } else {
            leftGallery.appendChild(img);
        }
    }

    if (files.length === 0) {
        leftGallery.innerHTML = '';
        rightGallery.innerHTML = '';
    }
}
















function showTime() {
    var date = new Date();
    var h = date.getHours(); // 0 - 23
    var m = date.getMinutes(); // 0 - 59
    var s = date.getSeconds(); // 0 - 59
    var session = "am";
    
    if (h == 0) {
        h = 12;
    }
    
    if (h > 12) {
        h = h - 12;
        session = "pm";
    }
    
    h = (h < 10) ? "0" + h : h;
    m = (m < 10) ? "0" + m : m;
    s = (s < 10) ? "0" + s : s;
    
    var time = h+ ":" +m+session +" ";

    var months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    var day = date.getDate();
    var month = date.getMonth();
    var year = date.getFullYear().toString().slice(-2);
    
    var dateStr = day +"-" +months[month] +"-"+ year;
    
    var clockDisplay = document.getElementById("MyClockDisplay");
    clockDisplay.innerText = time + " " + dateStr;
    clockDisplay.textContent = time + " " + dateStr;
    
    setTimeout(showTime, 1000);
}

showTime();


const checkbox = document.getElementById("checkbox")
checkbox.addEventListener("change", () => {
  document.body.classList.toggle("dark")
})


const bookmarkInput = document.getElementById('bookmark-input');
const addBookmarkButton = document.getElementById('add-bookmark');
const bookmarkList = document.getElementById('bookmark-list');
let contextMenuTarget = null;
const existingBookmarks = new Set();

addBookmarkButton.addEventListener('click', () => {
    const url = bookmarkInput.value;

    if (isValidURL(url)) {
        if (!existingBookmarks.has(url)) {
            const favicon = `https://www.google.com/s2/favicons?domain=${url}`;
            const bookmarkItem = createBookmarkItem(url, favicon);
            bookmarkList.appendChild(bookmarkItem);
            existingBookmarks.add(url); // Add the URL to the Set
            bookmarkInput.value = ''; // Clear the input field
        } else {
            alert('This URL is already in your bookmarks.');
        }
    } else {
        alert('Please enter a valid URL.');
    }
});

bookmarkList.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    contextMenuTarget = e.target;
    showContextMenu(e.clientX, e.clientY);
});

document.addEventListener('click', () => {
    hideContextMenu();
});

function isValidURL(url) {
    const pattern = /^(https?:\/\/)?([\w\.-]+\.\w+)(\/.*)?$/;
    return pattern.test(url);
}

function createBookmarkItem(url, favicon) {
    const listItem = document.createElement('div');
    listItem.className = 'bookmark-item';

    const img = document.createElement('img');
    img.src = favicon;
    img.alt = 'Favicon';

    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.textContent = getWebsiteName(url);

    const removeButton = document.createElement('button');
    removeButton.textContent = 'X';
    removeButton.className = 'remove-button';
    removeButton.addEventListener('click', () => {
        bookmarkList.removeChild(listItem);
        existingBookmarks.delete(url); // Remove the URL from the Set
    });

    listItem.appendChild(img);
    listItem.appendChild(link);
    listItem.appendChild(removeButton);

    return listItem;
}

function getWebsiteName(url) {
    return url; // You can implement a function to extract the website name if needed
}

function showContextMenu(x, y) {
    const contextMenu = document.getElementById('context-menu');
    contextMenu.style.display = 'block';
    contextMenu.style.left = x + 'px';
    contextMenu.style.top = y + 'px';

    document.addEventListener('click', hideContextMenu);
}

function hideContextMenu() {
    const contextMenu = document.getElementById('context-menu');
    contextMenu.style.display = 'none';
}


//Selector
const todoInput = document.getElementById("todoinput");
const todoButton = document.getElementById("todobutton");
const todoList = document.getElementById("todolist");
const filterOption = document.getElementById("todoselect")

//Event Listener
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", todoFilter);

//Function
function addTodo(event){

    //prevent Default
    event.preventDefault();

    //todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    //todo list
    const todoItem = document.createElement("li");
    todoItem.classList.add("item")
    todoItem.innerText = todoInput.value;
    todoDiv.appendChild(todoItem);
    
    //todo trash button
    const todoTrash = document.createElement("button");
    todoTrash.classList.add("trash-btn");
    todoTrash.innerHTML = "<i class = 'fas fa-trash'></i> ";
    todoItem.appendChild(todoTrash);

    //todo check button
    const todoCheck = document.createElement("button");
    todoCheck.classList.add("check-btn");
    todoCheck.innerHTML = "<i class = 'fas fa-check'></i> ";
    todoItem.appendChild(todoCheck);

    //Append Div
    todoList.appendChild(todoDiv);
    todoInput.value = "";

}; 

//Delete Check Operation
function deleteCheck(e){
    //delete
    const targetList = e.target;
    if(targetList.classList[0] === 'trash-btn'){
        const parentList = targetList.parentElement;
        const todo = parentList.parentElement;
        todo.classList.add("fall");
        parentList.addEventListener("transitionend", function(){
            todo.remove();
        })
    }

    //Check
    if(targetList.classList[0] === 'check-btn'){
        const checkParent = targetList.parentElement;
        const todoParent = checkParent.parentElement;
        todoParent.classList.toggle("completed");
    }
};

//Filtering todo
function todoFilter(e){
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch(e.target.value){
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if(todo.classList.contains("completed")){
                    todo.style.display = "flex";
                }else{
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if(!todo.classList.contains("completed")){
                    todo.style.display = "flex";
                }else{
                    todo.style.display = "none";
                }
                break;
        }
    })
};

