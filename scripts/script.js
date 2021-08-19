// Array to store book objects
let myLibrary = [];

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

