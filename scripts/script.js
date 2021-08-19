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

// Constructor for the book object
function Book(title, author, pages, isRead){
    this.title = title
    this.author = author
    this.pages = pages
    this.isRead = isRead
    this.info = function(){
        return `${title} by ${author}, ${pages} pages, ${isRead ? 'read' : 'not read yet'}`;
    }
}

// Add book to the library array
function addBookToLibrary(){
    let title = prompt('Book name');
    let author = prompt('Book author');
    let pages = prompt('Pages number');
    let isRead = function() {
        if(confirm('Have you read this?')){
            return true;
        } else {
            return false;
        }
    }
    let newBook = new Book(title, author, pages, isRead());
    myLibrary.push(newBook);
}

// Loops and displays each book in the array
function readBooks(){
    for(let book of myLibrary){
        console.log(book);
    }
}