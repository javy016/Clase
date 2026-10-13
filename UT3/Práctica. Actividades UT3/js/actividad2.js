const btn = document.getElementById("revelar");
const estado = document.getElementById("estado");
const lista = document.getElementById("registros");
const panel = document.getElementById("panel");


if (!(estado instanceof HTMLParagraphElement)
    || !(btn instanceof HTMLButtonElement)
    || !(lista instanceof HTMLUListElement)
    || !(panel instanceof HTMLElement)) {
  throw new Error("Falta un elemento de la pantalla de registros");
}

const TEXTO_PRUEBA = '<img src=x onerror=alert(1)>';
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