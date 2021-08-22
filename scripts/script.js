const table = document.querySelector('table');
const addBookButton = document.querySelector('#addBook');
const main = document.querySelector('main');

let book1 = {
    title: 'War and Peace',
    author: 'Leo Tolstoy',
    pages: 123,
    isRead: true
}

let book2 = {
    title: 'Song of Solomon',
    author: 'Toni Morrison',
    pages: 456,
    isRead: false
}

let book3 = {
    title: 'Ulysses',
    author: 'James Joyce',
    pages: 789,
    isRead: true
}

// Array to store book objects
let myLibrary = [book1, book2, book3];
//let myLibrary = [];

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
    let form = document.createElement('form');
    form.setAttribute('onSubmit', 'return false');
    form.setAttribute('id', 'newBookForm');

    let titleName = document.createElement('p');
    titleName.innerHTML = 'Title';
    form.appendChild(titleName);    

    let title = document.createElement('input');
    title.setAttribute('type', 'text');
    title.required = true;
    form.appendChild(title);

    let authorName = document.createElement('p');
    authorName.innerHTML = 'Author';
    form.appendChild(authorName);

    let author = document.createElement('input');
    author.setAttribute('type', 'text');
    author.required = true;
    form.appendChild(author);

    let pagesName = document.createElement('p');
    pagesName.innerHTML = 'Pages';
    form.appendChild(pagesName);

    let pages = document.createElement('input');
    pages.setAttribute('type', 'number');
    pages.required = true;
    form.appendChild(pages);

    let isReadName = document.createElement('p');
    isReadName.innerHTML = 'Have you read this book?';
    form.appendChild(isReadName);

    let isRead = document.createElement('input');
    isRead.setAttribute('type', 'checkbox');
    form.appendChild(isRead);    

    let addButton = document.createElement('input');
    addButton.setAttribute('type', 'submit');    
    addButton.setAttribute('id', 'finishBookAdd');
    addButton.value = 'Add Book';  
    form.appendChild(addButton);

    main.appendChild(form);

    addButton.addEventListener('click', () => {    
        if((title.value !== '') && (author.value != '') && (pages.value !== '')){   
            addBookToLibrary(title.value, author.value, pages.value, isRead.checked)
            main.removeChild(form);
            readBooks();
        }
    });    
});

// Add book to the library array
function addBookToLibrary(title, author, pages, isRead){
    let newBook = new Book(title, author, pages, isRead);
    myLibrary.push(newBook);
}

// Loops and displays each book in the array
function readBooks(){
    for(let book of myLibrary){
        let row = table.insertRow(-1);
        let title = row.insertCell(0);
        let author = row.insertCell(1);
        let pages = row.insertCell(2);
        let isRead = row.insertCell(3);

        title.innerHTML = book.title;
        author.innerHTML = book.author;
        pages.innerHTML = book.pages;
        isRead.innerHTML = book.isRead;

        pages.style.textAlign = 'center';
        isRead.style.textAlign = 'center';
    }
}

document.addEventListener('keydown', function(event){
	if(event.key === 'Escape'){
        let form = document.getElementById('newBookForm');
        if(form !== null){
            main.removeChild(form);
        }        
	}
});