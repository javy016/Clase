const registros = [
  { id: "r1", zona: "entrada", texto: "Puerta abierta",       fecha: "2026-10-07T09:10:00+02:00" },
  { id: "r2", zona: "almacén", texto: "Caja ausente",         fecha: "2026-10-07T09:15:00+02:00" },
  { id: "r3", zona: "entrada", texto: "Tarjeta registrada",   fecha: "2026-10-07T09:18:00+02:00" },
  { id: "r2", zona: "almacén", texto: "Copia del registro",   fecha: "2026-10-07T09:15:00+02:00" },
];

// 1) Set: 
const ids = new Set(registros.map(({ id }) => id));
console.log("Set de ids únicos:", ids);
console.log("Tamaño del Set:", ids.size);        // 3

// 2) Map: 
const porId = new Map();
for (const registro of registros) {
  if (!porId.has(registro.id)) porId.set(registro.id, registro);
}
console.log("Map id - registro:", porId);
console.log("porId.get('r2').texto:", porId.get("r2").texto); 

// 3) Map agrupado por zona 
const porZona = new Map();
for (const registro of porId.values()) {
  if (!porZona.has(registro.zona)) porZona.set(registro.zona, []);
  porZona.get(registro.zona).push(registro);
}
console.log("Map zona - registros:", porZona);

for (const [zona, lista] of porZona) {
  console.log(`Zona "${zona}": ${lista.length} registro distinto`);
}
// 4) Fechas

// 5) Tres casos
console.log("Caso 1 (existe r2):", ids.has("r2"));                             
console.log("Caso 2 (duplicado r2 se conserva el primero):",
  porId.get("r2").texto === "Caja ausente");                                   
console.log("Caso 3 (no existe r99):", ids.has("r99"));                              