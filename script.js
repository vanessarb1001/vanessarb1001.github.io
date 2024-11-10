const data = {
    datosPersonales: {},
    familiares: [],
    enfermedades: [],
    internamientos: []
};

function nextPage(page) {
    document.querySelectorAll('.form-page').forEach((form) => form.style.display = 'none');
    document.getElementById(`page${page}`).style.display = 'block';
    if (page === 5) mostrarResumen();
}

function prevPage(page) {
    nextPage(page);
}

function addFamiliar() {
    const nombre = document.getElementById('familiarNombre').value;
    const parentesco = document.getElementById('parentesco').value;
    const edad = document.getElementById('edad').value;

    if (nombre && parentesco && edad) {
        data.familiares.push({ nombre, parentesco, edad });
        document.getElementById('familiares-list').innerHTML += `<li>${nombre} - ${parentesco} - ${edad} años</li>`;
        document.getElementById('familiarNombre').value = '';
        document.getElementById('parentesco').value = '';
        document.getElementById('edad').value = '';
    }
}

function addEnfermedad() {
    const enfermedad = document.getElementById('enfermedad').value;
    const tiempo = document.getElementById('tiempo').value;

    if (enfermedad && tiempo) {
        data.enfermedades.push({ enfermedad, tiempo });
        document.getElementById('enfermedades-list').innerHTML += `<li>${enfermedad} - ${tiempo} años</li>`;
        document.getElementById('enfermedad').value = '';
        document.getElementById('tiempo').value = '';
    }
}

function addInternamiento() {
    const fecha = document.getElementById('fecha').value;
    const centroMedico = document.getElementById('centroMedico').value;
    const diagnostico = document.getElementById('diagnostico').value;

    if (fecha && centroMedico && diagnostico) {
        data.internamientos.push({ fecha, centroMedico, diagnostico });
        document.getElementById('internamientos-list').innerHTML += `<li>${fecha} - ${centroMedico} - ${diagnostico}</li>`;
        document.getElementById('fecha').value = '';
        document.getElementById('centroMedico').value = '';
        document.getElementById('diagnostico').value = '';
    }
}

function mostrarResumen() {
    const resumen = `
    Datos Personales:
    Nombre: ${data.datosPersonales.nombre || ''} 
    Dirección: ${data.datosPersonales.direccion || ''}
    
    Familiares: ${JSON.stringify(data.familiares, null, 2)}
    
    Enfermedades: ${JSON.stringify(data.enfermedades, null, 2)}
    
    Internamientos: ${JSON.stringify(data.internamientos, null, 2)}
    `;
    document.getElementById('data-summary').textContent = resumen;
}

function guardarDatos() {
    const nombre = document.getElementById('nombre').value;
    const direccion = document.getElementById('direccion').value;
    data.datosPersonales = { nombre, direccion };
    localStorage.setItem('formData', JSON.stringify(data));
    alert("Datos guardados exitosamente!");
}
