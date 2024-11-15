// Seleccionar el botón y el contenedor de información
const loadUserBtn = document.getElementById('loadUserBtn');
const userInfoDiv = document.getElementById('userInfo');

// Función para hacer la petición AJAX
function loadUserInfo() {
    const xhr = new XMLHttpRequest(); // Crear una nueva instancia de XMLHttpRequest

    xhr.open('GET', 'user.json', true); // Configurar el método y la URL

    xhr.onload = function() {
        if (xhr.status === 200) { // Verificar si la respuesta fue exitosa
            const user = JSON.parse(xhr.responseText); // Convertir JSON a objeto

            // Mostrar la información del usuario
            userInfoDiv.innerHTML = `
                <h2>${user.name}</h2>
                <p><strong>Email:</strong> ${user.email}</p>
                <p><strong>Teléfono:</strong> ${user.phone}</p>
            `;
        } else {
            userInfoDiv.innerHTML = `<p>Error al cargar la información del usuario</p>`;
        }
    };

    xhr.onerror = function() {
        userInfoDiv.innerHTML = `<p>Hubo un error en la solicitud</p>`;
    };

    xhr.send(); // Enviar la solicitud
}

// Añadir un evento al botón para cargar la información al hacer clic
loadUserBtn.addEventListener('click', loadUserInfo);
