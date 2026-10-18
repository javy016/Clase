// Actividad 1. Organizar los registros

const registros = [
  {
    id: "r1",
    zona: "entrada",
    texto: "La puerta se abrió a las 09:10.",
    fecha: "2026-10-07T09:10:00+02:00",
  },
  {
    id: "r2",
    zona: "entrada",
    texto: "El lector registró una tarjeta.",
    fecha: "2026-10-07T09:11:00+02:00",
  },
  {
    id: "r3",
    zona: "almacén",
    texto: "Falta una caja del inventario.",
    fecha: "2026-10-07T09:15:00+02:00",
  },
  {
    id: "r4",
    zona: "oficina",
    texto: "Se imprimió una lista de salida.",
    fecha: "2026-10-07T09:18:00+02:00",
  },
  {
    id: "r4",
    zona: "oficina",
    texto: "Registro duplicado para la prueba.",
    fecha: "2026-10-07T09:18:00+02:00",
  },
];

const identificadoresUnicos = new Set(registros.map((registro) => registro.id));

const registrosZona = new Map();
const idAgregados = new Set();

for (const registro of registros) {
  if (idAgregados.has(registro.id)) {
    continue;
  }

  idAgregados.add(registro.id);

  if (!registrosZona.has(registro.zona)) {
    registrosZona.set(registro.zona, []);
  }

  registrosZona.get(registro.zona).push(registro);
}

const registrosId = new Map(
  registros.map((registro) => [registro.id, registro]),
);

const salidaIdentificadores = document.querySelector("#salida-identificadores");
const salidaZonas = document.querySelector("#salida-zonas");
const salidaFecha = document.querySelector("#salida-fecha");

// Comprueba que los elementos existen
if (
  salidaIdentificadores instanceof HTMLParagraphElement &&
  salidaZonas instanceof HTMLUListElement &&
  salidaFecha instanceof HTMLParagraphElement
) {
  salidaIdentificadores.textContent = `Identificadores únicos: ${[
    ...identificadoresUnicos,
  ].join(", ")}. Total: ${identificadoresUnicos.size}.`;

  for (const [zona, registrosDeZona] of registrosZona) {
    const elemento = document.createElement("li");
    elemento.textContent = `Zona ${zona}: ${registrosDeZona.length} registros distintos`;
    salidaZonas.append(elemento);
  }

  const primeraFecha = new Date(registros[0].fecha);

  if (Number.isNaN(primeraFecha.getTime())) {
    throw new TypeError("Fecha inválida");
  }

  const formatearFecha = new Intl.DateTimeFormat("es-ES", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Europe/Madrid",
  });

  salidaFecha.textContent = formatearFecha.format(primeraFecha);
}

// Actividad 2. Mostrar un registro al pulsar

const panel = document.querySelector("#panel");
const estado = document.querySelector("#estado");
const revelar = document.querySelector("#revelar");
const registrosLista = document.querySelector("#registros");

if (
  !(panel instanceof HTMLElement) ||
  !(estado instanceof HTMLParagraphElement) ||
  !(revelar instanceof HTMLButtonElement) ||
  !(registrosLista instanceof HTMLUListElement)
) {
  throw new Error("Falta un elemento de la pantalla de registros");
}

let revelado = false;

revelar.addEventListener("click", () => {
  // Si ya se reveló, no hace nada para evitar duplicados
  if (revelado) {
    return;
  }

  revelado = true;
  estado.textContent = "Registro revelado";
  panel.classList.add("descubierta");

  const entrada = document.createElement("li");
  entrada.textContent = '<img src=x onerror="alert(1)">';
  registrosLista.append(entrada);
});




// Actividad 3. Elegir un registro desde la URL

const textoRegistroActual = document.querySelector("#registro-actual");
const textoFicha = document.querySelector("#ficha-texto");
const alternativaFicha = document.querySelector("#ficha-local");
const estadoProgreso = document.querySelector("#estado-progreso");
const fichaIdentificadorLocal = document.querySelector("#ficha-id-local");
const fichaZonaLocal = document.querySelector("#ficha-zona-local");
const fichaFechaLocal = document.querySelector("#ficha-fecha-local");

if (
  !(textoRegistroActual instanceof HTMLParagraphElement) ||
  !(textoFicha instanceof HTMLElement) ||
  !(alternativaFicha instanceof HTMLElement) ||
  !(estadoProgreso instanceof HTMLParagraphElement) ||
  !(fichaIdentificadorLocal instanceof HTMLElement) ||
  !(fichaZonaLocal instanceof HTMLElement) ||
  !(fichaFechaLocal instanceof HTMLElement)
) {
  throw new Error("Falta un elemento de la pantalla de progreso");
}

let registroActual = "r1";

function mostrarRegistro(identificador) {
  // Si el id no existe en el catálogo, muestra el r1
  if (!identificadoresUnicos.has(identificador)) {
    identificador = "r1";
  }

  registroActual = identificador;

  const registro = registrosId.get(identificador);

  textoRegistroActual.textContent = `Registro actual: ${registro.id} - ${registro.texto}`;
  textoFicha.textContent = registro.texto;
}

const parametros = new URLSearchParams(window.location.search);
const identificadorSolicitado = parametros.get("registro");

registroActual = identificadoresUnicos.has(identificadorSolicitado)
  ? identificadorSolicitado
  : "r1";

mostrarRegistro(registroActual);

// Actividad 4. Guardar el progreso y abrir una ficha

const CLAVE_PROGRESO = "{mal json registros-ut3:v1:progreso";

function crearProgresoInicial() {
  return {
    version: 1,
    registroActual: "r1",
    vistos: ["r1"],
  };
}

// Función de validación para el proceso
function esProgreso(valor) {
  return (
    valor != null &&
    typeof valor === "object" &&
    valor.version === 1 &&
    Array.isArray(valor.vistos) &&
    valor.vistos.every((identificador) =>
      identificadoresUnicos.has(identificador),
    ) &&
    new Set(valor.vistos).size === valor.vistos.length &&
    (valor.registroActual == null ||
      identificadoresUnicos.has(valor.registroActual)) &&
    (valor.registroActual == null ||
      valor.vistos.includes(valor.registroActual))
  );
}

function cargarProgreso(almacen) {
  try {
    const destino = almacen ?? window.localStorage;
    const texto = destino.getItem(CLAVE_PROGRESO);

    if (texto == null) {
      return crearProgresoInicial();
    }

    const valor = JSON.parse(texto);

    if (!esProgreso(valor)) {
      throw new TypeError("Progreso inválido");
    }

    return valor;
  } catch (error) {
    console.warn("No se pudo cargar el progreso", error);
    return crearProgresoInicial();
  }
}

function guardarProgreso(progreso, almacen) {
  try {
    if (!esProgreso(progreso)) {
      throw new TypeError("Progreso inválido");
    }

    const destino = almacen ?? window.localStorage;
    destino.setItem(CLAVE_PROGRESO, JSON.stringify(progreso));
    return true;
  } catch (error) {
    console.warn("No se pudo guardar el progreso", error);
    return false;
  }
}

let progreso = cargarProgreso();

function actualizarProgreso(identificador) {
  progreso.registroActual = identificador;

  if (!progreso.vistos.includes(identificador)) {
    progreso.vistos.push(identificador);
  }
}

function mostrarAvisoProgreso(mensaje) {
  estadoProgreso.textContent = mensaje;
}

// Guarda el progreso nada más cargar
actualizarProgreso(registroActual);
if (!guardarProgreso(progreso)) {
  mostrarAvisoProgreso("No se pudo guardar el progreso inicial.");
}

const botonSimularFalloEscritura = document.querySelector(
  "#simular-fallo-escritura",
);

const botonAbrirFicha = document.querySelector("#abrir-ficha");

if (botonSimularFalloEscritura instanceof HTMLButtonElement) {
  botonSimularFalloEscritura.addEventListener("click", () => {
    // Creo un almacén que lanza un error al intentar guardar
    const almacenQueFalla = {
      getItem() {
        return null;
      },
      setItem() {
        throw new Error("Fallo simulado de escritura");
      },
    };

    const guardadoCorrecto = guardarProgreso(progreso, almacenQueFalla);

    if (!guardadoCorrecto) {
      mostrarAvisoProgreso(
        "No se pudo guardar el progreso. La partida continuará sin guardado.",
      );
    }
  });
}

if (botonAbrirFicha instanceof HTMLButtonElement) {
  botonAbrirFicha.addEventListener("click", () => {
    const url = new URL("ficha.html", window.location.href);
    url.searchParams.set("registro", registroActual);

    const ventanaAuxiliar = window.open(
      url.href,
      "ficha-registro",
      "popup,width=640,height=520",
    );

    // Si el navegador bloquea las ventanas emergentes, mostramos la ficha en la misma página
    if (ventanaAuxiliar === null) {
      const registro = registrosId.get(registroActual);

      const instante = new Date(registro.fecha);

      if (Number.isNaN(instante.getTime())) {
        throw new TypeError("Fecha inválida");
      }

      const formateadorFecha = new Intl.DateTimeFormat("es-ES", {
        dateStyle: "medium",
        timeStyle: "short",
        timeZone: "Europe/Madrid",
      });

      fichaIdentificadorLocal.textContent = registro.id;
      fichaZonaLocal.textContent = registro.zona;
      textoFicha.textContent = registro.texto;
      fichaFechaLocal.textContent = formateadorFecha.format(instante);

      alternativaFicha.hidden = false;
      return;
    }

    ventanaAuxiliar.focus();
  });
}

// Actividad 5. Encontrar y corregir errores
//En el README.md
