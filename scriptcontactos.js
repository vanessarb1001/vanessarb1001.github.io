// Selección de elementos del DOM
const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const contactsList = document.getElementById('contactsList');

// Obtener contactos guardados del LocalStorage
const getContacts = () => JSON.parse(localStorage.getItem('contacts')) || [];

// Guardar contacto en LocalStorage
const saveContact = (contact) => {
    const contacts = getContacts();
    contacts.push(contact);
    localStorage.setItem('contacts', JSON.stringify(contacts));
};

// Generar código QR
const generateQR = (text, element) => {
    new QRCode(element, {
        text: text,
        width: 120,
        height: 120,
    });
};

// Mostrar contactos y sus códigos QR
const renderContacts = () => {
    contactsList.innerHTML = '';
    const contacts = getContacts();
    
    contacts.forEach((contact, index) => {
        const contactItem = document.createElement('div');
        contactItem.classList.add('contact-item');
        
        const contactInfo = document.createElement('div');
        contactInfo.classList.add('contact-info');
        contactInfo.innerHTML = `
            <strong>Nombre:</strong> ${contact.name} <br>
            <strong>Teléfono:</strong> ${contact.phone} <br>
            <strong>Email:</strong> ${contact.email} <br>
            <strong>Dirección:</strong> ${contact.address}
        `;
        
        const qrCodeElement = document.createElement('div');
        qrCodeElement.classList.add('qrcode');
        
        // Crear formato vCard
        const vCard = `BEGIN:VCARD\nVERSION:3.0\nFN:${contact.name}\nTEL:${contact.phone}\nEMAIL:${contact.email}\nADR:${contact.address}\nEND:VCARD`;
        
        // Generar el código QR para cada contacto
        generateQR(vCard, qrCodeElement);
        
        contactItem.appendChild(contactInfo);
        contactItem.appendChild(qrCodeElement);
        contactsList.appendChild(contactItem);
    });
};

// Manejar el evento de envío del formulario
submitBtn.addEventListener('click', () => {
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;

    if (name && phone && email) {
        const newContact = { name, phone, email, address };
        saveContact(newContact);
        renderContacts();
        contactForm.reset(); // Limpiar formulario
    } else {
        alert('Por favor, complete todos los campos obligatorios.');
    }
});

// Renderizar contactos al cargar la página
document.addEventListener('DOMContentLoaded', renderContacts);

//limpiar lista de contactos

const clearBtn = document.getElementById('clearBtn');
clearBtn.addEventListener('click', () => {
    localStorage.removeItem('contacts');
    renderContacts();
});