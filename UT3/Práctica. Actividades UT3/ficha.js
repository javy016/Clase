const registros = [
  { id: "r1", zona: "entrada", texto: "La puerta se abrió a las 09:10." },
  { id: "r2", zona: "entrada", texto: "El lector registró una tarjeta." },
  { id: "r3", zona: "almacén", texto: "Falta una caja del inventario." },
  { id: "r4", zona: "oficina", texto: "Se imprimió una lista de salida." },
];

const registrosId = new Map(
  registros.map((registro) => [registro.id, registro]),
);

const parametros = new URLSearchParams(window.location.search);
const identificadorSolicitado = parametros.get("registro");

// Usa id si se encuentra, sino r1 defecto
const identificadorValido = registrosId.has(identificadorSolicitado)
  ? identificadorSolicitado
  : "r1";

const registro = registrosId.get(identificadorValido);
document.querySelector("#ficha-texto").textContent = registro.texto;
