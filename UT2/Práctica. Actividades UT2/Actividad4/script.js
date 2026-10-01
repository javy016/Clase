function analizarRondas(rondas) {
  if (!Array.isArray(rondas)) {
    return { total: 0, media: null, maximo: 0, cantidad: 0 };
  }

  let totalAcumulado = 0;
  let puntuacionMaxima = -Infinity;
  let cantidadValidas = 0;

  for (const puntuacion of rondas) {
    if (
      typeof puntuacion !== "number" ||
      !Number.isFinite(puntuacion) ||
      puntuacion < 0
    ) {
      continue;
    }

    totalAcumulado = totalAcumulado + puntuacion;

    if (puntuacion > puntuacionMaxima) {
      puntuacionMaxima = puntuacion;
    }

    cantidadValidas = cantidadValidas + 1;
  }

  if (cantidadValidas === 0) {
    return { total: 0, media: null, maximo: 0, cantidad: 0 };
  }

  return {
    total: totalAcumulado,
    media: totalAcumulado / cantidadValidas,
    maximo: puntuacionMaxima,
    cantidad: cantidadValidas,
  };
}

// Versión con métodos de array (para comparar)
function analizarRondasFuncional(rondas) {
  if (!Array.isArray(rondas)) {
    return { total: 0, media: null, maximo: 0, cantidad: 0 };
  }

  const puntuacionesValidas = rondas.filter(
    (puntuacion) =>
      typeof puntuacion === "number" &&
      Number.isFinite(puntuacion) &&
      puntuacion >= 0
  );

  const cantidadValidas = puntuacionesValidas.length;

  if (cantidadValidas === 0) {
    return { total: 0, media: null, maximo: 0, cantidad: 0 };
  }

  const totalAcumulado = puntuacionesValidas.reduce(
    (acumulador, puntuacion) => acumulador + puntuacion,
    0
  );

  return {
    total: totalAcumulado,
    media: totalAcumulado / cantidadValidas,
    maximo: Math.max(...puntuacionesValidas),
    cantidad: cantidadValidas,
  };
}

// Prueba obligatoria
console.log(analizarRondas([10, 7, -2, Number.NaN, 5]));
// { total: 22, media: 7.333333333333333, maximo: 10, cantidad: 3 }