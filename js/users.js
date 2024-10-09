document.addEventListener('DOMContentLoaded', () => {
    loadUsers();
});

function loadUsers() {
    fetch('http://localhost:3000/api/users')
        .then(response => response.json())
        .then(users => {
            const userTable = document.querySelector('#userTable tbody');
            users.forEach(user => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${user.id}</td>
                    <td>${user.nombre}</td>
                    <td>${user.email}</td>
                    <td>
                        <button onclick="editUser(${user.id})">Actualizar</button>
                    </td>
                `;
                userTable.appendChild(row);
            });
        })
        .catch(error => console.error('Error al cargar los usuarios:', error));
}

function editUser(userId) {
    fetch(`http://localhost:3000/api/users/${userId}`)
        .then(response => response.json())
        .then(user => {
            document.getElementById('userId').value = user.id; 
            document.getElementById('name').value = user.nombre;
            document.getElementById('email').value = user.email;

            // Mostrar el formulario de actualización
            document.getElementById('updateSection').style.display = 'block';
        })
        .catch(error => console.error('Error al cargar el usuario:', error));
}

function hideUpdateForm() {
    // Ocultar el formulario de actualización
    document.getElementById('updateSection').style.display = 'none';
}

document.getElementById('updateUserForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const userId = document.getElementById('userId').value;
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    fetch(`http://localhost:3000/api/users/${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nombre: name, email: email })
    })
    .then(response => {
        if (response.ok) {
            alert('Usuario actualizado correctamente.');
            // Recargar la tabla de usuarios
            document.querySelector('#userTable tbody').innerHTML = '';
            loadUsers();
            // Ocultar el formulario después de la actualización
            hideUpdateForm();
        } else {
            alert('Error al actualizar el usuario.');
        }
    })
    .catch(error => console.error('Error al actualizar el usuario:', error));
});
