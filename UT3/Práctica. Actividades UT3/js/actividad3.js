const registros = [
  { id: "r1", zona: "entrada", texto: "La puerta se abrió a las 09:10.", fecha: "2026-10-07T09:10:00+02:00" },
  { id: "r2", zona: "entrada", texto: "El lector registró una tarjeta.", fecha: "2026-10-07T09:11:00+02:00" },
  { id: "r3", zona: "almacén", texto: "Falta una caja del inventario.", fecha: "2026-10-07T09:15:00+02:00" },
  { id: "r4", zona: "oficina", texto: "Se imprimió una lista de salida.", fecha: "2026-10-07T09:18:00+02:00" },
];

const ids = new Set(["r1", "r2", "r3"]);
const parametros = new URLSearchParams(window.location.search);
const solicitado = parametros.get("registro");
let registroActual = ids.has(solicitado) ? solicitado : "r1";

function seleccionarRegistro(id) {
  if (!ids.has(id)) return;
  registroActual = id;
  const url = new URL(window.location.href);
  url.searchParams.set("registro", id);
  window.history.pushState({ registro: id }, "", url);
  mostrarRegistro(id);
}

window.addEventListener("popstate", () => {
  const id = new URLSearchParams(window.location.search).get("registro");
  registroActual = ids.has(id) ? id : "r1";
  mostrarRegistro(registroActual);
});