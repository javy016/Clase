##  __Página web de Nike__
# 1. Parte A - Reconstrucción cliente/servidor
[![alt text](image.png)](https://github.com/javy016/Clase/blob/main/UT1/imagenes/image-1.png?raw=true)

```mermaid
flowchart TB
    A(["Start"]) --> B{"Mandar peticion"}
    B --> C["El navegador recibe la petición"]
    C --> n1["El navegador nos manda la respuesta"]
```

# 2. Parte B - Capacidades del navegador
En mi caso escogí las cookies que resuelve la persistencia de datos para mantener los productos en el carrito de compras, recordar sesiones  realizar seguimiento de cashback. Nos pone una notificación para aceptar o denegar el permiso, si se deniega se producen fallos técnicos como la pérdida de dicho carrito de compras, cierre sesión inmediato, etc. Y este mete riesgos de privacidad con el perfil sobre la publicidad. Como alternativa esta acceder desde la aplicación móvil.

# 3. Parte C - Lenguajes y Scripts
![alt text](image-1.png)
En este ejemplo podemos comprobar el html que hace uso de mains para crear como cuadros de su catálogo, también tenemos el css para dar diseño y el javascript para hacer cosas como puede ser seleccionar métodos de pago

# 4. Parte D - Marcas y programación
![alt text](image-2.png)

Por lo general veo el código muy bien estructurado y simplificado sin necesidad de más cambios, pero escribiria el código en español en vez de inglés para mayor facilidad para nike españa

# 5. Parte E - Herramientas y prueba
1. observación manual con DevTools;
Realiza correctamente los cambios de tamaño correctamente redimensionando automáticamente
   
2. validación estática de HTML o CSS;
Algunos errores de escritura en el código por no cerrar bien las etiquetas, propiedad meta y propiedades escritas sin comillas.

3. recorrido funcional con resultado esperado;
Actualiza correctamente el carrito de compra al agregar o reducir cantidades

4. comprobación básica con teclado;
Cumple con los criterios de accesibilidad

5. simulación de red lenta o error, si la aplicación realiza peticiones.
La simulación es rapida no tarda ni da error aunque lo ponga en 3G
![alt text](image-3.png)

(Ahora si lo pongo ofline claramente me va a dar error que no se puede cargar la página por no tener conexión a internet).


