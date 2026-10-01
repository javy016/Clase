// Crear función
function normalizarParticipante (nombre, edadTexto, aceptaNormas) {
    const error= [];

// Validar nombre
const validarNombre = typeof nombre === 'string' ? nombre.trim() : '';
if (validarNombre === ''){
    error.push("El nombre no puede estar vacío");
}

// Validar edad
const validarEdad = Number(edadTexto);
if (!Number.isInteger(validarEdad) || validarEdad<14 || validarEdad > 99){
error.push("La edad debe ser un número entero entre 14 y 99");
}

// Validar normas
if(aceptaNormas !== true){
    error.push("Debes aceptar las nombras");
}

// Retornar resultado
if(error.length > 0) {
    return{
        valido:false,
        errores: errores
    };
}

return{
    valido: true,
    datos: {
        nombre: validarNombre,
        edad: validarEdad,
        normas: aceptaNormas
    }
};
}

// Mostrar un ejemplo

const resultado = normalizarParticipante(" Ada ", "17", true);
console.log(resultado);

const resultado2 = ("","17", true );
console.log(resultado2);

const resultado3 = ("María","100", true );
console.log(resultado3);

const resultado4 = ("Ana","13", true );
console.log(resultado4);

const resultado5 = ("Javier","23", false );
console.log(resultado5);