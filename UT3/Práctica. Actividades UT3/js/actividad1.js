// Datos 
const registros = [
  { id: "r1", zona: "entrada", texto: "La puerta se abrio a las 09:10.", fecha: "2026-10-07T09:10:00+02:00" },
  { id: "r2", zona: "entrada", texto: "El lector registro una tarjeta.", fecha: "2026-10-07T09:11:00+02:00" },
  { id: "r3", zona: "almacén", texto: "Falta una caja del inventario.", fecha: "2026-10-07T09:15:00+02:00" },
  { id: "r4", zona: "oficina", texto: "Se imprimió una lista de salida.", fecha: "2026-10-07T09:18:00+02:00" },
  { id: "r4", zona: "oficina", texto: "Registro duplicado para la prueba.", fecha: "2026-10-07T09:18:00+02:00" },
];

// 1) Set de identificadores únicos
const setID  = new Set(registros.map(r => r.id));
console.log("Set de ids únicos:", setID);
console.log("Tamaño del Set:", setID.size);

// 2) Map que agrupa por zona.

const mapId = new Map();
for (const r of registros) {
  if (!mapId.has(r.id)) mapId.set(r.id, r); 
}
console.log("Map id - registro :", mapId);

const porZona = new Map();
for (const r of mapId.values()) {
  if (!porZona.has(r.zona)) porZona.set(r.zona, []);
  porZona.get(r.zona).push(r);
}
console.log("Map zona - registros:", porZona);

// 3) Cuántos registros distintos hay en cada zona
for (const [zona, lista] of porZona) {
  console.log(`Zona "${zona}": ${lista.length} registros distintos`);
}

// 5) Tres casos
console.log("Caso 1 (existe r2):", idsUnicos.has("r2"));                       
console.log("Caso 2 (duplicado r4 se guarda una vez):",
  mapId.get("r4").texto === "Se imprimió una lista de salida.");               
console.log("Caso 3 (no existe r99):", idsUnicos.has("r99"));                  