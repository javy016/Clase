# 1. Resumen Proyecto  
Este proyecto consiste en un simulador de bunker de 10 turnos(10 días) en que los supervivientes tienen varias acciones con recursos limitados, y también complejidades ya que existen amenazas aparte de restar ciertos recursos que esto hará que pierdas o ganes la partida.  

# 2. Acciones  
Las acciones son las siguientes:  
* Racionar (sin coste, sin efecto y sin amenaza).
* Explorar:
  * Coste:  
    * Energía: 2  
  * Efecto:  
    * Agua: 8  
    * Comida: 10  
    * Chatarra: 4
  * Amenaza: 15  
* Reparar:
  * Coste:
    * Chatarra: 3 
    * Energía: 4  
  * Efecto:  
    * Energía: 8
  * Amenaza: -5
 * Cultivar:
   * Coste:
     * Energía: 4
     * Agua: 1
   * Efecto:  
    * Comida: 12
   * Amenaza: 2  
* Animar:
  * Coste:
    * Comida: 1
  * Efecto:  
    * Moral: 12
  * Amenaza: 0
    
# 3. Reglas:  
## 3.1 Resultado:  
  * Victoria: Completar el turno 10 con algún superviviente y moral +0.  
  * Derrota: Si el agua, comida, energía o moral llegan a 0 o no queda ningún superviviente.
## 3.2 Estado:
Primero la partida comenzará siempre desde una función que nos dará un estado inicial para cuando comencemos la partida.
* Estado: nos mostrará el estado del bunker y acciones que se puedan realizar que son "racionar", "explorar", "reparar", "cultivar" o "animar", (Si no se escribe por texto genera un error y bucle para pedir de nuevo que digamos que acción queremos realizar).
Una vez elegida la acción realizará su funcionalidad y guardará un resumen del turno en historial que será un vector.  
## 3.3 Funciones:
* crearEstadoInicial: Nos da el estado inicial del juego.  
* validarEstado: Comprueba que existan datos y sino genera un error.  
* puedeEjecutarse: Usa un valor booleano.
  * True: Acción existe y se puede pagar costes.
  * False: No existe o no se puede pagar costes.   
* Aplicar acción: Aplica coste y efectos, y genera un estado nuevo.

    

  
