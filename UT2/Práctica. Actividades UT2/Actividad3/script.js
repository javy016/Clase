function tarifar(consumo) {
  if (!Number.isInteger(consumo) || consumo < 0) {
    return { ok: false, error: "El consumo debe ser un entero no negativo" };
  }

  let costeTotal = 0;
  let consumoRestante = consumo;

  // Tramo 1
  const unidadesTramo1 = Math.min(consumoRestante, 100);
  costeTotal = costeTotal + (unidadesTramo1 * 12);
  consumoRestante = consumoRestante - unidadesTramo1;

  // Tramo 2
  const unidadesTramo2 = Math.min(consumoRestante, 100);
  costeTotal = costeTotal + (unidadesTramo2 * 18);
  consumoRestante = consumoRestante - unidadesTramo2;

  // Tramo 3
  costeTotal = costeTotal + (consumoRestante * 25);

  return { ok: true, valor: costeTotal };
}

// Casos 
console.log(tarifar(0));    // { ok: true, valor: 0 }
console.log(tarifar(1));    // { ok: true, valor: 12 }
console.log(tarifar(100));  // { ok: true, valor: 1200 }
console.log(tarifar(101));  // { ok: true, valor: 1218 }
console.log(tarifar(200));  // { ok: true, valor: 3000 }
console.log(tarifar(201));  // { ok: true, valor: 3025 }
console.log(tarifar(-1));   // { ok: false, error: "..." }
console.log(tarifar(1.5));  // { ok: false, error: "..." }