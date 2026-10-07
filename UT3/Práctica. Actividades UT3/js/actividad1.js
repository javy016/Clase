// Datos de entrada (copiados tal cual)
const registros = [
  { id: "r1", zona: "entrada", texto: "La puerta se abrio a las 09:10.", fecha: "2026-10-07T09:10:00+02:00" },
  { id: "r2", zona: "entrada", texto: "El lector registro una tarjeta.", fecha: "2026-10-07T09:11:00+02:00" },
  { id: "r3", zona: "almacén", texto: "Falta una caja del inventario.", fecha: "2026-10-07T09:15:00+02:00" },
  { id: "r4", zona: "oficina", texto: "Se imprimió una lista de salida.", fecha: "2026-10-07T09:18:00+02:00" },
  { id: "r4", zona: "oficina", texto: "Registro duplicado para la prueba.", fecha: "2026-10-07T09:18:00+02:00" },
];

// 1) Set de identificadores únicos
const idsUnicos = new Set(registros.map(r => r.id));
console.log("Set de ids únicos:", idsUnicos);
console.log("Tamaño del Set:", idsUnicos.size);

// 2) Map que agrupa por zona.

const porId = new Map();
for (const r of registros) {
  if (!porId.has(r.id)) porId.set(r.id, r); // ignora el duplicado r4
}
console.log("Map id → registro (sin duplicados):", porId);

const porZona = new Map();
for (const r of porId.values()) {
  if (!porZona.has(r.zona)) porZona.set(r.zona, []);
  porZona.get(r.zona).push(r);
}
console.log("Map zona → registros:", porZona);

// 3) Cuántos registros distintos hay en cada zona
for (const [zona, lista] of porZona) {
  console.log(`Zona "${zona}": ${lista.length} registro(s) distinto(s)`);
}

// 4) Fecha con Date + Intl.DateTimeFormat en español
const fmt = new Intl.DateTimeFormat("es-ES", {
  dateStyle: "full",
  timeStyle: "short",
});
for (const r of porId.values()) {
  console.log(`${r.id} → ${fmt.format(new Date(r.fecha))}`);
}

// 5) Tres casos, incluido el duplicado
console.log("Caso 1 (existe r2):", idsUnicos.has("r2"));                       // true
console.log("Caso 2 (duplicado r4 se guarda una vez):",
  porId.get("r4").texto === "Se imprimió una lista de salida.");               // true
console.log("Caso 3 (no existe r99):", idsUnicos.has("r99"));                  // false