// Button to add new books
const addBookButton = document.querySelector('#addBook');

// Main div with the content
const main = document.querySelector('main');

// Local storage to store the array with book objects 
let localStorage = window.localStorage;

// Array to store book objects
let myLibrary = [];

loadLocalStorage();
readBooks();

// Constructor for the book object
class Book {
    constructor(title, author, pages, isRead) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.isRead = isRead;
        this.info = function () {
            return `${title} by ${author}, ${pages} pages, ${isRead ? 'read' : 'not read yet'}`;
        };
    }
}

// Add a DOM form for adding new books
addBookButton.addEventListener('click', () => {
    const form = document.createElement('form');
    form.setAttribute('onSubmit', 'return false');
    form.setAttribute('id', 'newBookForm');

    const titleName = document.createElement('p');
    titleName.innerHTML = 'Title';
    form.appendChild(titleName);

    const title = document.createElement('input');
    title.setAttribute('type', 'text');
    title.required = true;
    form.appendChild(title);

    const authorName = document.createElement('p');
    authorName.innerHTML = 'Author';
    form.appendChild(authorName);

    const author = document.createElement('input');
    author.setAttribute('type', 'text');
    author.required = true;
    form.appendChild(author);

    const pagesName = document.createElement('p');
    pagesName.innerHTML = 'Pages';
    form.appendChild(pagesName);

    const pages = document.createElement('input');
    pages.setAttribute('type', 'number');
    pages.required = true;
    form.appendChild(pages);

    const isReadName = document.createElement('p');
    isReadName.innerHTML = 'Have you read this book?';
    form.appendChild(isReadName);

    const isRead = document.createElement('input');
    isRead.setAttribute('type', 'checkbox');
    form.appendChild(isRead);

    const addButton = document.createElement('input');
    addButton.setAttribute('type', 'submit');
    addButton.setAttribute('id', 'finishBookAdd');
    addButton.value = 'Add Book';
    form.appendChild(addButton);

    main.appendChild(form);

    addButton.addEventListener('click', () => {
        if ((title.value !== '') && (author.value != '') && (pages.value !== '')) {
            addBookToLibrary(title.value, author.value, pages.value, isRead.checked)
            main.removeChild(form);
            readBooks();
        }
    });
});

// Add book to the library array
function addBookToLibrary(title, author, pages, isRead) {
    let newBook = new Book(title, author, pages, isRead);
    myLibrary.push(newBook);
}

// Loads local storage, creates it if null
function loadLocalStorage(){
    if(localStorage.getItem('library') === null){
        addArrayToStorage();
    } else {
        myLibrary = JSON.parse(localStorage.getItem('library'));
    }    
}

// Adds the book object array to the local storage
function addArrayToStorage(){
    localStorage.setItem('library', JSON.stringify(myLibrary));
}

// Loops and displays each book in the array
function readBooks() {
    const table = document.querySelector('table');
    removeTableRows(table);

    let index = 0;

    for (let book of myLibrary) {
        book.index = index;
        let row = table.insertRow(-1);
        let title = row.insertCell(0);
        let author = row.insertCell(1);
        let pages = row.insertCell(2);
        let isRead = row.insertCell(3);
        let action = row.insertCell(4);

        title.innerHTML = book.title;
        author.innerHTML = book.author;
        pages.innerHTML = book.pages;
        isRead.innerHTML = book.isRead;

        let removeButton = document.createElement('button');
        removeButton.setAttribute('class', 'removeButton');
        removeButton.setAttribute('index', index);
        removeButton.innerHTML = 'Remove';
        action.appendChild(removeButton);

        let readButton = document.createElement('button');
        readButton.setAttribute('class', 'readButton');
        readButton.setAttribute('index', index);
        readButton.innerHTML = 'Status';
        action.appendChild(readButton);

        index++;
        pages.style.textAlign = 'center';
        isRead.style.textAlign = 'center';
        action.style.textAlign = 'center';
        addArrayToStorage();
    }
}

// Button controller
document.addEventListener('click', function(event){
    let index = event.target.getAttribute('index');
    let eventClass = event.target.className;

    switch(eventClass){
        case 'removeButton':
            removeBook(index);
            break;
        case 'readButton':
            changeStatus(index);
            break;
    }
});

// Removes books when button is pressed
function removeBook(index){
    myLibrary.splice(index, 1);
    readBooks();
}

// Change book read status
function changeStatus(index){
    Book = myLibrary[index];
    Book.isRead === true ? Book.isRead = false : Book.isRead = true;
    readBooks();
}

// Remove all current books in the table
function removeTableRows(tableName) {
    let rowNumber = tableName.rows.length;
    for (let i = 1; i < rowNumber; i++) {
        tableName.deleteRow(1);
    }
}

// Removes the generated form if 'Esc" is pressed
document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
        let form = document.getElementById('newBookForm');
        if (form !== null) {
            main.removeChild(form);
        }
    }
});