// Constantes
const readline = require("readline-sync");

const ACCIONES = {
  racionar: { coste: {}, efecto: {}, amenaza: 0 },
  explorar: {
    coste: { energia: 2 },
    efecto: { agua: 8, comida: 10, chatarra: 4 },
    amenaza: 15,
  },
  reparar: {
    coste: { chatarra: 3, energia: 4 },
    efecto: { energia: 8 },
    amenaza: -5,
  },
  cultivar: {
    coste: { energia: 2, agua: 1 },
    efecto: { comida: 12 },
    amenaza: 2,
  },
  animar: { coste: { comida: 1 }, efecto: { moral: 12 }, amenaza: 0 },
};

const ID_ACCIONES = Object.keys(ACCIONES);

const estrategiaDePrueba = [
  "explorar",
  "reparar",
  "cultivar",
  "explorar",
  "animar",
  "cultivar",
  "reparar",
  "explorar",
  "cultivar",
  "animar",
];

// Funciones
function crearEstadoInicial() {
  return {
    turno: 1,
    supervivientes: 5,
    recursos: { agua: 24, comida: 30, energia: 18, moral: 70, chatarra: 6 },
    capacidad: { agua: 40, comida: 50, energia: 30, chatarra: 20 },
    amenaza: 15,
    historial: [],
  };
}

function validarEstado(estado) {
  if (!estado) throw new Error("Estado vacío");
  if (estado.supervivientes < 0) throw new Error("Supervivientes negativos");
  if (estado.amenaza < 0 || estado.amenaza > 100)
    throw new Error("Amenaza fuera de rango");
  for (const recurs of ["agua", "comida", "energia", "moral", "chatarra"]) {
    if (estado.recursos[recurs] < 0)
      throw new Error("Recurso negativo: " + recurs);
  }
}

function puedeEjecutarse(estado, accion) {
  if (!ACCIONES[accion]) return false;
  for (const recurs in ACCIONES[accion].coste) {
    if (estado.recursos[recurs] < ACCIONES[accion].coste[recurs]) return false;
  }
  return true;
}

function aplicarAccion(estado, accion) {
  const nuevo = { ...estado, recursos: { ...estado.recursos } };
  const datos = ACCIONES[accion];

  for (const recurs in datos.coste)
    nuevo.recursos[recurs] = nuevo.recursos[recurs] - datos.coste[recurs];
  for (const recurs in datos.efecto)
    nuevo.recursos[recurs] = nuevo.recursos[recurs] + datos.efecto[recurs];
  nuevo.amenaza = nuevo.amenaza + datos.amenaza;

  return nuevo;
}

function limitar(estado) {
  const recurs = estado.recursos;
  if (recurs.agua < 0) recurs.agua = 0;
  if (recurs.agua > estado.capacidad.agua) recurs.agua = estado.capacidad.agua;

  if (recurs.comida < 0) recurs.comida = 0;
  if (recurs.comida > estado.capacidad.comida)
    recurs.comida = estado.capacidad.comida;

  if (recurs.energia < 0) recurs.energia = 0;
  if (recurs.energia > estado.capacidad.energia)
    recurs.energia = estado.capacidad.energia;

  if (recurs.chatarra < 0) recurs.chatarra = 0;
  if (recurs.chatarra > estado.capacidad.chatarra)
    recurs.chatarra = estado.capacidad.chatarra;

  if (recurs.moral < 0) recurs.moral = 0;
  if (recurs.moral > 100) recurs.moral = 100;

  if (estado.amenaza < 0) estado.amenaza = 0;
  if (estado.amenaza > 100) estado.amenaza = 100;
  if (estado.supervivientes < 0) estado.supervivientes = 0;
}

function resolverTurno(estado, accion) {
  let nuevo = aplicarAccion(estado, accion);

  // Consumo diario
  const newS = nuevo.supervivientes;
  let Cagua = newS;
  let Ccomida = newS * 2;
  let Cenergia = newS;
  if (accion === "racionar") {
    Cagua = Math.floor(Cagua / 2);
    Ccomida = Math.floor(Ccomida / 2);
  }
  nuevo.recursos.agua = nuevo.recursos.agua - Cagua;
  nuevo.recursos.comida = nuevo.recursos.comida - Ccomida;
  nuevo.recursos.energia = nuevo.recursos.energia - Cenergia;

  // Incidente
  let incidente = "Ninguno";
  if (nuevo.amenaza >= 70) {
    incidente = "Ataque zombi";
    nuevo.supervivientes = nuevo.supervivientes - 1;
    nuevo.recursos.moral = nuevo.recursos.moral - 10;
  } else if (nuevo.amenaza >= 40) {
    incidente = "Alarma exterior";
    nuevo.recursos.moral = nuevo.recursos.moral - 5;
  }

  // Ajustar a límites
  limitar(nuevo);

  // Resumen
  const resumen = {
    turno: estado.turno,
    accion: accion,
    incidente: incidente,
    recursos: { ...nuevo.recursos },
    amenaza: nuevo.amenaza,
    supervivientes: nuevo.supervivientes,
  };
  nuevo.historial = [...estado.historial, resumen];

  return { estado: nuevo, resumen: resumen };
}

function comprobarFinal(estado) {
  const recurs = estado.recursos;
  if (estado.supervivientes <= 0)
    return { terminado: true, resultado: "derrota", motivo: "No quedan supervivientes" };
  if (recurs.agua <= 0)
    return { terminado: true, resultado: "derrota", motivo: "Se acabó el agua" };
  if (recurs.comida <= 0)
    return { terminado: true, resultado: "derrota", motivo: "Se acabó la comida" };
  if (recurs.energia <= 0)
    return { terminado: true, resultado: "derrota", motivo: "Se acabó la energía" };
  if (recurs.moral <= 0)
    return { terminado: true, resultado: "derrota", motivo: "La moral llegó a 0" };
  if (estado.turno >= 10)
    return { terminado: true, resultado: "victoria", motivo: "Se completó el turno 10 con supervivientes y moral mayor que 0" };
  return { terminado: false, resultado: null, motivo: null };
}

function mostrarEstado(estado) {
  const recurs = estado.recursos;
  console.log(`Turno: ${estado.turno}/10`);
  console.log(`Supervivientes: ${estado.supervivientes}`);
  console.log(`Recursos: Agua: ${recurs.agua}, Comida: ${recurs.comida}, Energía: ${recurs.energia}, Moral: ${recurs.moral}, Chatarra: ${recurs.chatarra}`);
  console.log(`Amenaza: ${estado.amenaza}`);
}

function mostrarResumen(resumen) {
  console.log(`Turno: ${resumen.turno}`);
  console.log(`Acción realizada: ${resumen.accion}`);
  console.log(`Incidente: ${resumen.incidente}`);
  console.log(`Recursos tras acción: Agua: ${resumen.recursos.agua}, Comida: ${resumen.recursos.comida}, Energía: ${resumen.recursos.energia}, Moral: ${resumen.recursos.moral}, Chatarra: ${resumen.recursos.chatarra}`);
  console.log(`Amenaza tras acción: ${resumen.amenaza}`);
  console.log(`Supervivientes tras acción: ${resumen.supervivientes}`);
}

function terminar(estado, final) {
  console.log(final.resultado.toUpperCase());
  console.log("Motivo:", final.motivo);
}

function jugar(estado) {
  validarEstado(estado);
  mostrarEstado(estado);

  const final = comprobarFinal(estado);
  if (final.terminado) return terminar(estado, final);

  console.log("Acciones:", ID_ACCIONES.join(", "));
  const accion = readline.question("Elige accion: ").trim().toLowerCase();

  if (!ACCIONES[accion]) {
    console.log("Esa acción no existe.");
    return jugar(estado);
  }
  if (!puedeEjecutarse(estado, accion)) {
    console.log("No tienes recursos suficientes.");
    return jugar(estado);
  }

  const { estado: nuevo, resumen } = resolverTurno(estado, accion);
  mostrarResumen(resumen);
  nuevo.turno = estado.turno + 1;

  const fin = comprobarFinal(nuevo);
  if (fin.terminado) return terminar(nuevo, fin);

  jugar(nuevo);
}

function demo() {
  let estado = crearEstadoInicial();

  for (const accion of estrategiaDePrueba) {
    mostrarEstado(estado);

    const final = comprobarFinal(estado);
    if (final.terminado) return terminar(estado, final);

    if (!puedeEjecutarse(estado, accion)) {
      console.log("Sin recursos para:", accion);
      return terminar(estado, {
        terminado: true,
        resultado: "derrota",
        motivo: "Sin recursos para " + accion,
      });
    }

    const { estado: nuevo, resumen } = resolverTurno(estado, accion);
    mostrarResumen(resumen);
    nuevo.turno = estado.turno + 1;
    estado = nuevo;
  }

  terminar(estado, comprobarFinal(estado));
}


jugar(crearEstadoInicial());
