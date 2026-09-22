##  __Página web de Nike__
# 1. Parte A - Reconstrucción cliente/servidor
<img width="905" height="668" alt="image" src="https://github.com/user-attachments/assets/ca9c3f5c-cf41-4347-9aec-e022bce8f1a1" />




```mermaid
flowchart TB
    A(["Start"]) --> B{"Mandar peticion"}
    B --> C["El navegador recibe la petición"]
    C --> n1["El navegador nos manda la respuesta"]
```

# 2. Parte B - Capacidades del navegador
En mi caso escogí las cookies que resuelve la persistencia de datos para mantener los productos en el carrito de compras, recordar sesiones  realizar seguimiento de cashback. Nos pone una notificación para aceptar o denegar el permiso, si se deniega se producen fallos técnicos como la pérdida de dicho carrito de compras, cierre sesión inmediato, etc. Y este mete riesgos de privacidad con el perfil sobre la publicidad. Como alternativa esta acceder desde la aplicación móvil. También usa LocalStorage para guardar archivos en el navegador local y también usa la geolocalización para buscar las tiendas cercanas.

# 3. Parte C - Lenguajes y Scripts
<img width="516" height="126" alt="image" src="https://github.com/user-attachments/assets/195159e6-452f-4d73-a283-58dbc386c7eb" />


En este ejemplo podemos comprobar el html que hace uso de mains para crear como cuadros de su catálogo, también tenemos el css para dar diseño y el javascript para hacer cosas como puede ser seleccionar métodos de pago

# 4. Parte D - Marcas y programación
<img width="437" height="208" alt="image" src="https://github.com/user-attachments/assets/0810719e-d5fd-4e6a-8821-822b1ab10a1b" />

Por lo general veo el código muy bien estructurado y simplificado sin necesidad de más cambios, pero escribiría el código en español en vez de inglés para mayor facilidad para nike españa, usa a su vez aparte de código en JavaScript, también usa React

# 5. Parte E - Herramientas y prueba
<br>
1. observación manual con DevTools;
 <br>
Realiza correctamente los cambios de tamaño correctamente redimensionando automáticamente.
   <br>
2. validación estática de HTML o CSS;
<br>
Algunos errores de escritura en el código por no cerrar bien las etiquetas, propiedad meta y propiedades escritas sin comillas.
<br>
3. recorrido funcional con resultado esperado;
   <br>
Actualiza correctamente el carrito de compra al agregar o reducir cantidades
<br>
4. comprobación básica con teclado;
   <br>
Cumple con los criterios de accesibilidad
<br>
5. simulación de red lenta o error, si la aplicación realiza peticiones.
<br>
La simulación es rapida no tarda ni da error aunque lo ponga en 3G
<br>
<img width="431" height="523" alt="image" src="https://github.com/user-attachments/assets/aada469d-d0b8-4342-bf6e-213dd907859a" />
<br>
(Ahora si lo pongo ofline claramente me va a dar error que no se puede cargar la página por no tener conexión a internet).


