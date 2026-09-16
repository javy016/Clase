# Tarea 1
1. Impedir que un campo de correo vacío se envíe desde un formulario: Cliente ya que evita que se envíe vació al servidor
2. Comprobar que una entrada pertenece a la persona autenticada: Ambos ya que el cliente debe poder registrarse y el servidor aparte de autenticarlo tiene que comprobar que la entrada pertenezca a esa persona
3. Ordenar visualmente una tabla de 20 filas ya descargadas: Cliente ya que se encargara mediante alguna función ordenarlas como pueda ser alfabéticamente
4. Calcular el importe definitivo de una factura: Ambos ya que el cliente puede calcularlo por si mismo pero el servidor nos dirá el precio de cada producto si esa factura es un pago por internet
5. Conservar el tema claro u oscuro en un único dispositivo: Cliente ya que no depende de acceder a ninguna web ni servidor, solo depende del mismo dispositivo
6. Compartir el progreso de un curso entre móvil y portátil: Servidor ya que se encargará de calcular el tanto por ciento de lo que lleva recorrido dicho dispositivo haciendo de forma dinámica para cada uno
   
# Tarea 2 - Nike
1. Elements: localiza el encabezado principal y consulta su rol accesible.
   <img width="693" height="530" alt="image" src="https://github.com/user-attachments/assets/ced8283d-cf23-4160-9428-3db8acfef833" />

2. Network: recarga, identifica el documento y distingue su estado y tipo MIME.
   <img width="686" height="706" alt="image" src="https://github.com/user-attachments/assets/6efddd06-c61b-4f49-ae16-d63bd0a6e661" />

3. Application: comprueba qué mecanismos de almacenamiento utiliza, sin modificar datos ajenos.
   <img width="678" height="478" alt="image" src="https://github.com/user-attachments/assets/1fee5c29-abeb-44cb-a5d2-5063e06b18fd" />

4. Console: ejecuta 'geolocation' in navigator y explica qué demuestra y qué no.
   <img width="661" height="462" alt="image" src="https://github.com/user-attachments/assets/94340cac-03aa-4e42-b458-aa0622ea7bae" />

5. Device toolbar: simula un ancho estrecho; no confundas simulación visual con prueba en dispositivo real.
   <img width="1106" height="715" alt="image" src="https://github.com/user-attachments/assets/02c1bbef-88ce-43ff-8516-678456eb1a0e" />

6. Lighthouse o Accessibility: registra un aviso y verificalo manualmente antes de concluir.
   <img width="678" height="510" alt="image" src="https://github.com/user-attachments/assets/65d774b3-ce04-444c-9d7f-50c52d82c659" />

# Tarea 3
1. Abrir y cerrar información adicional: HTML
2. Validar que un correo tenga una forma básica: HTML
3. Consultar disponibilidad sin abandonar el formulario: JavaScript
4. Mostrar una cuadrícula en una columna en pantallas estrechas: HTML/CSS
5. Autorizar el acceso de una persona administradora: JavaScript
6. Calcular una previsualización no vinculante de una cuota: JavaScript



# Tarea 4
## 1. Diseño de capas
### 1.1 Capa arquitectura cliente/servidor
<br>
<img width="895" height="663" alt="image" src="https://github.com/user-attachments/assets/2b4d3a40-5e82-4260-a2fe-5fa7a91ec33d" />
<br>
</br>

### 1.2 Capa capacidades del navegador
<br>
<img width="893" height="703" alt="image" src="https://github.com/user-attachments/assets/7e225a9c-de84-469b-808d-5c4e4af302b1" />
<br>
</br>

### 1.3 Capa lenguajes de cliente y scripts
<br>
<img width="894" height="277" alt="image" src="https://github.com/user-attachments/assets/1ff7e205-d753-43d3-9c2a-04d1d82a01cd" />
<br>
</br>

### 1.4 Capa integración entre marcas y programación
<br>
<img width="659" height="778" alt="image" src="https://github.com/user-attachments/assets/368bd29f-8491-48e2-87e8-3d01f64f989d" />

### 2 Documento HTML + JavaScript
**HTML**
```
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
```
--------------------------------------------------
**JavaScript**
```
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
```
