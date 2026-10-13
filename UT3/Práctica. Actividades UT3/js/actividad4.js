const registros = [
  { id: "r1", zona: "entrada", texto: "La puerta se abrió a las 09:10.", fecha: "2026-10-07T09:10:00+02:00" },
  { id: "r2", zona: "entrada", texto: "El lector registró una tarjeta.", fecha: "2026-10-07T09:11:00+02:00" },
  { id: "r3", zona: "almacén", texto: "Falta una caja del inventario.", fecha: "2026-10-07T09:15:00+02:00" },
  { id: "r4", zona: "oficina", texto: "Se imprimió una lista de salida.", fecha: "2026-10-07T09:18:00+02:00" },
];

const porId = new Map();
for (const r of registros) if (!porId.has(r.id)) porId.set(r.id, r);
const idsValidos = new Set(porId.keys());

const CLAVE = "registros-ut3:v1:progreso";
const VERSION = 1;
const ID_INICIAL = "r1";

const info = document.getElementById("progreso-info");
const btnFicha = document.getElementById("btn-ficha");
const btnFallo = document.getElementById("btn-fallo");
const aviso = document.getElementById("aviso");
const fichaInline = document.getElementById("ficha-inline");

let falloSimulado = false;


const estadoInicial = () => ({ version: VERSION, registroActual: ID_INICIAL, vistos: [ID_INICIAL] });

function validar(o) {
  return o && typeof o === "object"
    && o.version === VERSION
    && idsValidos.has(o.registroActual)
    && Array.isArray(o.vistos)
    && o.vistos.every(v => idsValidos.has(v))
    && new Set(o.vistos).size === o.vistos.length;
}

function leer() {
  try {
    const raw = localStorage.getItem(CLAVE);
    if (!raw) return estadoInicial();
    const obj = JSON.parse(raw);
    return validar(obj) ? obj : estadoInicial();
  } catch { return estadoInicial(); }
}

function guardar(obj) {
  if (falloSimulado) throw new Error("escritura simulada fallida");
  localStorage.setItem(CLAVE, JSON.stringify(obj));   // JSON.stringify, sin Date/Set/Map
}

function render(obj, msg = "") {
  info.textContent = `actual=${obj.registroActual} · vistos=[${obj.vistos.join(", ")}]`;
  aviso.hidden = !msg;
  if (msg) aviso.textContent = msg;
}

// Arranque
const estado = leer();
try { guardar(estado); } catch {}
render(estado);


btnFicha.addEventListener("click", () => {
  const r = porId.get(estado.registroActual);
  const html = `<!DOCTYPE html><html lang="es"><head><meta charset="utf-8">
    <title>Ficha ${r.id}</title></head><body>
    <h1>Ficha ${r.id}</h1>
    <p>Zona: ${r.zona}</p>
    <p>Texto: ${r.texto}</p>
    <p>Fecha: ${r.fecha}</p>
    </body></html>`;

  const win = window.open("", "_blank", "width=400,height=300");
  if (win) {
    win.document.write(html);
    win.document.close();
  } else {
    fichaInline.hidden = false;
    fichaInline.textContent = `Ficha ${r.id} — ${r.zona} — ${r.texto} — ${r.fecha}`;
  }
});

btnFallo.addEventListener("click", () => {
  falloSimulado = !falloSimulado;
  const obj = leer();
  if (!obj.vistos.includes(obj.registroActual)) obj.vistos.push(obj.registroActual);
  try {
    guardar(obj);
    render(obj, "Guardado correcto.");
  } catch (e) {
    render(obj, `No se pudo guardar: ${e.message}. La pantalla sigue funcionando.`);
  }
});