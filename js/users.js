const API_URL = 'http://localhost:3000/api'; 

// Cargar los usuarios
async function fetchUsers() {
    const response = await fetch(`${API_URL}/users`);
    const users = await response.json();

    const usersList = document.getElementById('users-list');
    usersList.innerHTML = ''; 

    users.forEach(user => {
        const listItem = document.createElement('li');
        listItem.textContent = `${user.nombre} - ${user.email}`;
        usersList.appendChild(listItem);
    });
}

// Cargar usuarios al cargar la página
window.onload = fetchUsers;
