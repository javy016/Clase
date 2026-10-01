// Con errores:
/*
function calcularTotal(precios) {
  total = 0;                                  // Error 1: ámbito
  for (let i = 0; i <= precios.length; i++) { // Error 3: bucle
    total += precios[i];
  }
  return total;
}

function aplicarDescuento(total, esSocio) {
  if (esSocio = true) {                       // Error 2: coerción
    return total * 0.9;
  }
  return total;
}
  */

 // Corregido:
 function calcularTotal(precios) {
  let totalAcumulado = 0; // ámbito local

  for (let indice = 0; indice < precios.length; indice++) {
    const precio = precios[indice];
    if (typeof precio !== "number" || !Number.isFinite(precio)) {
      continue;
    }
    totalAcumulado = totalAcumulado + precio;
  }

  return totalAcumulado;
}

function aplicarDescuento(total, esSocio) {
  if (esSocio === true) {
    return total * 0.9;
  }
  return total;
}

// Pruebas de regresión
console.log(calcularTotal([10, 20]));      
console.log(aplicarDescuento(100, false)); 
console.log(aplicarDescuento(100, true));  