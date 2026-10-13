
const registros = [
  { id: "r1", zona: "entrada", texto: "La puerta se abrió a las 09:10.", fecha: "2026-10-07T09:10:00+02:00" },
  { id: "r2", zona: "entrada", texto: "El lector registró una tarjeta.", fecha: "2026-10-07T09:11:00+02:00" },
  { id: "r3", zona: "almacén", texto: "Falta una caja del inventario.", fecha: "2026-10-07T09:15:00+02:00" },
  { id: "r4", zona: "oficina", texto: "Se imprimió una lista de salida.", fecha: "2026-10-07T09:18:00+02:00" },
];
const btn = document.getElementById("revelar");
const estado = document.getElementById("estado");
const lista = document.getElementById("registros");
const panel = document.getElementById("panel");

const TEXTO_PRUEBA = '<p onerror=alert(1)>';
let revelado = false;

btn.addEventListener("click", () => {
  if (revelado) return;
  revelado = true;
  estado.textContent = "Registros revelados.";
  panel.classList.add("descubierta");
  const li = document.createElement("li");
  li.textContent = TEXTO_PRUEBA;
  lista.appendChild(li);
});