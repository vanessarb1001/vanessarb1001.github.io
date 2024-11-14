document.addEventListener('DOMContentLoaded', () => {
    const generateButton = document.getElementById('generateButton');
    const clearButton = document.getElementById('clearButton');
    const contactListContainer = document.getElementById('contactList');

    // Cargar contactos al iniciar
    loadContacts();

    generateButton.addEventListener('click', () => {
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const email = document.getElementById('email').value;
        const address = document.getElementById('address').value;

        if (!name || !phone || !email) {
            alert("Por favor, completa los campos obligatorios.");
            return;
        }

        // Crear un objeto de contacto
        const contact = { name, phone, email, address };

        // Guardar contacto en almacenamiento local
        saveContact(contact);

        // Mostrar todos los contactos con sus códigos QR
        displayContacts();
    });

    clearButton.addEventListener('click', () => {
        if (confirm("¿Estás seguro de que deseas eliminar todos los contactos?")) {
            localStorage.removeItem('contacts');
            contactListContainer.innerHTML = '';
        }
    });

    function saveContact(contact) {
        let contacts = JSON.parse(localStorage.getItem('contacts')) || [];
        contacts.push(contact);
        localStorage.setItem('contacts', JSON.stringify(contacts));
    }

    function loadContacts() {
        displayContacts();
    }

    function displayContacts() {
        contactListContainer.innerHTML = ''; // Limpiar lista actual
        const contacts = JSON.parse(localStorage.getItem('contacts')) || [];

        contacts.forEach((contact, index) => {
            const qrContainer = document.createElement('div');
            qrContainer.classList.add('qr-container');

            const qrCodeDiv = document.createElement('div');
            const qrCode = new QRCode(qrCodeDiv, {
                text: formatVCard(contact),
                width: 128,
                height: 128,
            });

            const contactInfo = document.createElement('div');
            contactInfo.innerHTML = `
                <strong>${contact.name}</strong><br>
                Tel: ${contact.phone}<br>
                Email: ${contact.email}<br>
                Dirección: ${contact.address || 'N/A'}
            `;

            qrContainer.appendChild(qrCodeDiv);
            qrContainer.appendChild(contactInfo);
            contactListContainer.appendChild(qrContainer);
        });
    }

    function formatVCard(contact) {
        return `BEGIN:VCARD\nVERSION:3.0\nFN:${contact.name}\nTEL:${contact.phone}\nEMAIL:${contact.email}\nADR:${contact.address}\nEND:VCARD`;
    }
});
