const registros = [
  { id: "r1", zona: "entrada", texto: "La puerta se abrió a las 09:10.", fecha: "2026-10-07T09:10:00+02:00" },
  { id: "r2", zona: "entrada", texto: "El lector registró una tarjeta.", fecha: "2026-10-07T09:11:00+02:00" },
  { id: "r3", zona: "almacén", texto: "Falta una caja del inventario.", fecha: "2026-10-07T09:15:00+02:00" },
  { id: "r4", zona: "oficina", texto: "Se imprimió una lista de salida.", fecha: "2026-10-07T09:18:00+02:00" },
];

const porId = new Map();
for (const r of registros) if (!porId.has(r.id)) porId.set(r.id, r);
const idsValidos = new Set(porId.keys());

const salida = document.getElementById("registro-url");
const nav = document.querySelector("nav");
const ID_DEFECTO = "r1";


function leerRegistroDeURL() {
  const id = new URLSearchParams(location.search).get("registro");
  return id && idsValidos.has(id) ? id : ID_DEFECTO;
}

function pintar() {
  const reg = porId.get(leerRegistroDeURL());
  salida.textContent = `${reg.id} — ${reg.texto}`;
}


nav.addEventListener("click", (e) => {
  const btn = e.target.closest("button[data-ir]");
  if (!btn || !idsValidos.has(btn.dataset.ir)) return;
  const url = new URL(location.href);
  url.searchParams.set("registro", btn.dataset.ir);
  history.pushState({ id: btn.dataset.ir }, "", url);
  pintar();
});

window.addEventListener("popstate", pintar);


pintar();