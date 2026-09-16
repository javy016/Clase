# Tarea 1
1. Impedir que un campo de correo vacío se envíe desde un formulario: Cliente ya que evita que se envíe vació al servidor
2. Comprobar que una entrada pertenece a la persona autenticada: Ambos ya que el cliente debe poder registrarse y el servidor aparte de autenticarlo tiene que comprobar que la entrada pertenezca a esa persona
3. Ordenar visualmente una tabla de 20 filas ya descargadas: Cliente ya que se encargara mediante alguna función ordenarlas como pueda ser alfabéticamente
4. Calcular el importe definitivo de una factura: Ambos ya que el cliente puede calcularlo por si mismo pero el servidor nos dirá el precio de cada producto si esa factura es un pago por internet
5. Conservar el tema claro u oscuro en un único dispositivo: Cliente ya que no depende de acceder a ninguna web ni servidor, solo depende del mismo dispositivo
6. Compartir el progreso de un curso entre móvil y portátil: Servidor ya que se encargará de calcular el tanto por ciento de lo que lleva recorrido dicho dispositivo haciendo de forma dinámica para cada uno
# Tarea 2

# Tarea 3




# Tarea 4
## 1. Diseño de capas
### 1.1 Capa arquitectura cliente/servidor
<img width="895" height="663" alt="image" src="https://github.com/user-attachments/assets/2b4d3a40-5e82-4260-a2fe-5fa7a91ec33d" />
### 1.2 Capa capacidades del navegador
<img width="893" height="703" alt="image" src="https://github.com/user-attachments/assets/7e225a9c-de84-469b-808d-5c4e4af302b1" />
### 1.3 Capa lenguajes de cliente y scripts
<img width="894" height="277" alt="image" src="https://github.com/user-attachments/assets/1ff7e205-d753-43d3-9c2a-04d1d82a01cd" />
### 1.4 Capa integración entre marcas y programación
<img width="659" height="778" alt="image" src="https://github.com/user-attachments/assets/368bd29f-8491-48e2-87e8-3d01f64f989d" />

### 2 Documento HTML + JavaScript
**HTML**
<section aria-labelledby="titulo-tareas">
  <h2 id="titulo-tareas">Tareas pendientes</h2>
  <form id="form-tarea">
    <label for="nombre-tarea">Nueva tarea</label>
    <input id="nombre-tarea" name="nombre" required />
    <button type="submit">Añadir</button>
  </form>
  <p id="estado" role="status" aria-live="polite"></p>
  <ul id="lista-tareas"></ul>
</section>
<script type="module" src="/js/tareas.js"></script>

--------------------------------------------------
**JavaScript**
const formulario = document.querySelector('#form-tarea');
const lista = document.querySelector('#lista-tareas');
const estado = document.querySelector('#estado');

if (formulario && lista && estado) {
  formulario.addEventListener('submit', (evento) => {
    evento.preventDefault();

    const datos = new FormData(formulario);
    const nombre = String(datos.get('nombre') ?? '').trim();
    if (!nombre) return;

    const elemento = document.createElement('li');
    elemento.textContent = nombre;
    lista.append(elemento);
    estado.textContent = `Tarea añadida: ${nombre}`;
    formulario.reset();
  });
}

