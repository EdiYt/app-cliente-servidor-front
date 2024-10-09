const API_URL = 'http://localhost:3000/api';

// Cargar los libros
async function fetchBooks() {
    const response = await fetch(`${API_URL}/books`);
    const books = await response.json();

    const booksList = document.getElementById('books-list');
    booksList.innerHTML = ''; 

    books.forEach(book => {
        const listItem = document.createElement('li');
        listItem.textContent = `${book.nombre} - ${book.autor} (${book.genero})`;
        booksList.appendChild(listItem);
    });
}

// Cargar libros al cargar la página
window.onload = fetchBooks;
