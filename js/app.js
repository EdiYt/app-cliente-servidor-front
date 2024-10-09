const API_URL = 'http://localhost:3000/api'; 

// Inicio de sesión
document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            alert('Inicio de sesión exitoso');
            // Redirigir a users.html
            window.location.href = 'users.html';
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
    }
});

// Registro de usuarios
document.getElementById('register-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;

    try {
        const response = await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nombre: name, email, password })
        });

        const data = await response.json();

        if (response.ok) {
            alert('Registro exitoso');
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error('Error al registrar usuario:', error);
    }
});
