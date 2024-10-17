document.addEventListener('DOMContentLoaded', () => {
    loadBooks();
});

function loadBooks() {
    fetch('http://localhost:3000/api/books')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar los libros');
            }
            return response.json();
        })
        .then(books => {
            const bookTable = document.querySelector('#bookTable tbody');
            bookTable.innerHTML = '';
            books.forEach(book => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${book.id}</td>
                    <td>${book.nombre}</td>
                    <td>${book.autor}</td>
                    <td>${book.genero}</td>
                    <td>
                        <button onclick="editBook(${book.id})">Actualizar</button>
                        <button onclick="viewPdf('${book.pdfUrl}')">Ver PDF</button>
                    </td>
                `;
                bookTable.appendChild(row);
            });
        })
        .catch(error => console.error('Error al cargar los libros:', error));
}

function editBook(bookId) {
    fetch(`http://localhost:3000/api/books/${bookId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Libro no encontrado');
            }
            return response.json();
        })
        .then(book => {
            document.getElementById('bookId').value = book.id;
            document.getElementById('name').value = book.nombre;
            document.getElementById('author').value = book.autor;
            document.getElementById('genre').value = book.genero;
            document.getElementById('status').checked = book.estatus;

            document.getElementById('updateBookForm').style.display = 'block';
        })
        .catch(error => console.error('Error al cargar el libro:', error));
}

document.getElementById('updateBookForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const bookId = document.getElementById('bookId').value;
    const name = document.getElementById('name').value;
    const author = document.getElementById('author').value;
    const genre = document.getElementById('genre').value;
    const status = document.getElementById('status').checked;

    fetch(`http://localhost:3000/api/books/${bookId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nombre: name,
            autor: author,
            genero: genre,
            estatus: status
        })
    })
    .then(response => {
        if (response.ok) {
            alert('Libro actualizado correctamente.');
            loadBooks();
            document.getElementById('updateBookForm').reset();
            document.getElementById('updateBookForm').style.display = 'none';
        } else {
            alert('Error al actualizar el libro.');
        }
    })
    .catch(error => console.error('Error al actualizar el libro:', error));
});

document.getElementById('registerBookForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const formData = new FormData();
formData.append('nombre', document.getElementById('registerName').value);
formData.append('autor', document.getElementById('registerAuthor').value);
formData.append('genero', document.getElementById('registerGenre').value);
formData.append('estatus', document.getElementById('registerStatus').checked);
formData.append('pdf', document.getElementById('registerPdf').files[0]); // Este debe ser correcto

fetch('http://localhost:3000/api/books', {
    method: 'POST',
    body: formData
})

    .then(response => {
        if (!response.ok) {
            return response.json().then(err => {
                throw new Error(err.message || 'Error desconocido al registrar el libro');
            });
        }
        return response.json();
    })
    .then(data => {
        alert('Libro registrado correctamente.');
        loadBooks();
        document.getElementById('registerBookForm').reset();
    })
    .catch(error => {
        console.error('Error al registrar el libro:', error);
        alert('Error al registrar el libro: ' + error.message);
    });
});

// Función para mostrar el PDF en un iframe
function viewPdf(pdfUrl) {
    const iframe = document.createElement('iframe');
    iframe.src = pdfUrl;
    iframe.style.width = '100%';
    iframe.style.height = '500px';
    document.body.appendChild(iframe);
}
