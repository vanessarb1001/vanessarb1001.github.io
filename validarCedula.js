//codigo de JavaScript para validar cédula dominicana por medio de un algoritmo específico de modulo de 10
function validarCedula(cedula) {
    // Convertir la cédula a un array de números
    const numeros = cedula.split('').map(Number);

    // Invertir el array para empezar por el último dígito
    numeros.reverse();

    // Multiplicacion de dígitos en posiciones impares por 2
    for (let i = 0; i < numeros.length - 1; i += 2) {
        numeros[i] *= 2;

        // Si el resultado es mayor a 11, restar 11
        if (numeros[i] > 11) {
            numeros[i] -= 11;
        }
    }

    // Suma de todos los dígitos
    const suma = numeros.reduce((total, num) => total + num, 0);

    // Si el módulo 10 de la suma es 0, la cédula es válida
    return suma % 10 === 0;
}
// Comprobar si la cedula es valida o no
const cedula = '1234567890';
if (validarCedula(cedula)) {
    console.log('La cédula es válida');
} else {
    console.log('La cédula es inválida');
}