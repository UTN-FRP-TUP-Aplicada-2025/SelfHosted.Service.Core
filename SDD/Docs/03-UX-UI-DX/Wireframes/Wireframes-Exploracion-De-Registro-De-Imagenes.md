# Wireframes — Exploración de registro de imágenes

**Proyecto de código:** SelfHosted-Service
**Producto:** SelfHosted Service
**Documento:** Wireframes-Exploracion-De-Registro-De-Imagenes.md
**Versión:** 1.0
**Estado:** Propuesto
**Fecha:** 2026-07-30
**Autor:** UX/UI Designer + Frontend Lead (AG-03)
**Variante:** UX/UI

> **Superficie nueva, emitida por una decisión y no por un hallazgo.** `Q-27` preguntaba si existe alguna forma de explorar un registro de imágenes, o si conocer la dirección de la imagen es requisito del usuario. El agente humano del proyecto la decidió el 2026-07-30: **hay exploración**, y la decisión declara explícitamente que **es una superficie nueva con wireframe propio**. `02-Especificacion-Funcional` emitió [`CU-39`](../../02-Especificacion-Funcional/Casos-De-Uso/CU-39-Exploracion-Del-Registro-De-Imagenes.md) y **propuso el identificador `SUP-19` sin emitirlo**, porque emitirlo invadía esta categoría: es su brecha `B-25`, cuya destinataria es esta categoría. **Se emite acá.** Tres datos que esta superficie necesita **no están declarados por ninguna fuente** y no se inventan: se declaran como brecha `B-UX-29` en §5.1.

---

## Tabla de contenido

- [1. Pantalla y propósito](#1-pantalla-y-propósito)
- [2. Layout](#2-layout)
- [3. Componentes principales](#3-componentes-principales)
  - [3.1 Los tres pasos, y por qué no es un asistente](#31-los-tres-pasos-y-por-qué-no-es-un-asistente)
  - [3.2 La etiqueta se elige viendo a qué digesto apunta](#32-la-etiqueta-se-elige-viendo-a-qué-digesto-apunta)
  - [3.3 Tres desenlaces distintos, y ninguno es «cerrar»](#33-tres-desenlaces-distintos-y-ninguno-es-cerrar)
  - [3.4 Las tres formas de no encontrar nada se ven distinto](#34-las-tres-formas-de-no-encontrar-nada-se-ven-distinto)
- [4. Interacciones](#4-interacciones)
- [5. Estados](#5-estados)
  - [5.1 Qué no se especifica, y por qué](#51-qué-no-se-especifica-y-por-qué)
- [6. Versión responsive](#6-versión-responsive)
- [7. Notas de implementación](#7-notas-de-implementación)
- [8. Trazabilidad](#8-trazabilidad)
- [9. Control de cambios](#9-control-de-cambios)

---

## 1. Pantalla y propósito

**Nombre canónico de la superficie: `Exploración de registro de imágenes`** (`SUP-19`).

Su tarea es que el administrador **encuentre la imagen que quiere desplegar recorriendo un registro de imágenes configurado, en lugar de escribir de memoria una dirección que quizá no conoce**, y que vuelva del hallazgo con el origen del servicio ya declarado.

**Por qué esta superficie existe, y es el primer minuto de uso del producto.** El alta de servicio ofrece siete vías, y dos de ellas —imagen de registro público e imagen de registro privado— piden registro, imagen y etiqueta. El catálogo, que es la vía que evitaría escribirlas, **arranca vacío en toda instalación nueva** porque el producto no se distribuye con contenido precargado. La combinación dejaba un hueco concreto que esta categoría venía declarando como brecha `B-UX-23` desde su versión 1.1: **si el administrador no sabe la dirección de la imagen, ninguna de las siete vías lo lleva a ningún lado**. `Q-27` lo cierra, y esta superficie es la forma que la decisión toma.

**Qué no es.** No es el descubrimiento de contenedores adoptables (`SUP-10`), que lee el motor de contenedores local y devuelve candidatos a incorporar. Acá se lee un **registro de imágenes remoto** y se devuelve una **referencia**, no un candidato: no hay nada corriendo del otro lado, y por lo tanto no hay estado de ejecución que pintar. Es la razón por la que esta superficie **no invoca el lenguaje visual de estados**.

**Tampoco es una octava vía de alta.** `CU-03` lo declara con esas palabras: explorar es un **punto de entrada al paso del origen** de dos de las siete vías. No cambia el origen resultante, no agrega una variante y no deja huella en la procedencia. Las vías siguen siendo siete y las variantes de origen, cinco.

---

## 2. Layout

Superficie con flujo propio, superpuesta sobre la superficie que la invoca, con tres zonas: el selector de registro, la zona de búsqueda y resultados, y la zona de etiquetas de la imagen elegida.

```text
Paso 1 y 2 · registro elegido, busqueda sobre lo que publica

+- Explorar un registro de imagenes ---------------------- X -+
|  Registro:  [ <registro configurado>            v ]         |
|             <publico, consulta anonima | privado, con       |
|              la credencial <nombre>>                        |
|  ---------------------------------------------------------  |
|  [ buscar en el registro...                    ] [ Buscar ] |
|  ---------------------------------------------------------  |
|  Resultados                                                 |
|  +-------------------------------------------------------+  |
|  | <repositorio>/<imagen>                                |  |
|  |   <referencia legible completa>                       |  |
|  +-------------------------------------------------------+  |
|  | <repositorio>/<imagen>                                |  |
|  |   <referencia legible completa>                       |  |
|  +-------------------------------------------------------+  |
+-------------------------------------------------------------+
|                                        [ Cancelar ]         |
+-------------------------------------------------------------+


Paso 3 · etiquetas de la imagen elegida

+- Explorar un registro de imagenes ---------------------- X -+
|  [< volver a los resultados]                                |
|  <repositorio>/<imagen>                                     |
|  ---------------------------------------------------------  |
|  <la etiqueta es un nombre reasignable; el digesto es la    |
|   identidad real de lo que se va a desplegar>               |
|  ---------------------------------------------------------  |
|  Etiquetas                                                  |
|  +-------------------------------------------------------+  |
|  | ( ) <etiqueta>     publicada <momento>                |  |
|  |       apunta hoy a  <digesto abreviado>               |  |
|  +-------------------------------------------------------+  |
|  | ( ) <etiqueta>     publicada <momento>                |  |
|  |       apunta hoy a  <digesto abreviado>               |  |
|  +-------------------------------------------------------+  |
+-------------------------------------------------------------+
|                     [ Cancelar ]   [ Usar esta imagen ]     |
+-------------------------------------------------------------+


Ningun registro configurado

+- Explorar un registro de imagenes ---------------------- X -+
|  No hay ningun registro de imagenes configurado.            |
|  Sin uno, no hay nada que explorar.                         |
|  ---------------------------------------------------------  |
|  [ Configurar un registro ]                                 |
|  ---------------------------------------------------------  |
|  Otras vias que no dependen de un registro:                 |
|   - Repositorio remoto                                      |
|   - Archivo de construccion en linea                        |
+-------------------------------------------------------------+
|                                        [ Cancelar ]         |
+-------------------------------------------------------------+
```

**Tres decisiones de composición que el layout materializa.** El registro es un **selector persistente en la cabecera** y no un primer paso que se abandona: cambiar de registro es una corrección frecuente y esconder el control detrás de un «volver» la encarece. Las etiquetas ocupan la **superficie entera** y no una columna lateral, porque elegir etiqueta es una decisión con evidencia —el digesto— que no entra en una franja angosta. Y **no hay indicador de pasos**: ver §3.1.

---

## 3. Componentes principales

| Componente | Propósito | Datos que muestra | Comportamiento |
| --- | --- | --- | --- |
| Selector de registro | Elige contra qué se consulta | Los registros configurados, cada uno con su naturaleza —público con consulta anónima, o privado con el **nombre** de la credencial que lo autentica— | Persistente en la cabecera. Cambiarlo descarta los resultados en curso y **no** los mezcla con los del registro nuevo |
| Declaración de la identidad de la consulta | Dice con qué identidad se está consultando | Anónima, o el nombre de la credencial de registro | **Nunca el valor de la credencial.** Ver §7 |
| Campo de búsqueda | Acota lo que el registro publica | — | Patrón de búsqueda del catálogo base. El resultado vacío es un estado propio y no un error: ver §3.4 |
| Lista de resultados | Lo que el registro publica | Por resultado: repositorio, imagen y su **referencia legible completa** | Elegir uno abre sus etiquetas. **No despliega nada y no persiste nada** |
| Lista de etiquetas | Elige qué versión se va a usar | Por etiqueta: su nombre, su momento de publicación y el **digesto al que apunta hoy** | Selección única. Ver §3.2 |
| Nota sobre la etiqueta | Declara que la etiqueta no identifica | — | Texto fijo, contiguo a la lista y **antes** de elegir, no después |
| Acción de usar la imagen | Cierra el flujo devolviendo la referencia | — | Su desenlace depende de desde dónde se abrió: ver §3.3 |
| Zona de resultado de la consulta | Declara qué pasó cuando no hay resultados | Clase de resultado y acción sugerida | Tres clases distintas: ver §3.4 |
| Acción de configurar un registro | Salida del estado vacío | — | Sólo en el estado sin ningún registro configurado. Ver la brecha de §5.1: **a qué superficie lleva no está declarado** |

### 3.1 Los tres pasos, y por qué no es un asistente

El flujo tiene tres momentos —elegir el registro, encontrar la imagen, elegir la etiqueta— y **no se dibuja como asistente por pasos**. El catálogo base tiene el patrón de asistente disponible (`Design-Rules-Web-Generico.md` §4.5) y acá **no aplica**, por tres motivos que conviene dejar escritos:

1. **No hay estado parcial que preservar.** Un asistente existe para que un acto largo no se pierda a la mitad. Acá no se escribe nada: la exploración es de sólo lectura y abandonarla no deja nada a medias.
2. **El primer paso no se completa una vez.** El registro se cambia tantas veces como haga falta, y un asistente lo trataría como un paso ya superado.
3. **Los tres momentos no son simétricos.** El primero es un control persistente, el segundo es una búsqueda iterativa y el tercero es una elección con evidencia. Un contador de «paso X de 3» afirmaría una progresión lineal que el recorrido real no tiene.

Lo que sí se conserva del patrón es la **vuelta explícita**: desde las etiquetas se vuelve a los resultados con una acción declarada, no con el gesto de atrás del navegador.

### 3.2 La etiqueta se elige viendo a qué digesto apunta

Es la decisión de composición central de esta superficie y la que el intake obliga a tomar. El anexo E-23 declara que **la etiqueta es un nombre reasignable que no identifica nada de forma estable** y que el digesto es la identidad real; presentar la etiqueta sola reproduciría acá el mismo problema que ese anexo levanta en el despliegue.

| Dato de la fila de etiqueta | Qué aporta | Jerarquía |
| --- | --- | --- |
| **Etiqueta** | Es lo que el administrador reconoce y lo que va a quedar escrito en el origen | Prominente, en la línea principal |
| **Momento de publicación** | Es lo que permite distinguir la etiqueta vigente de una vieja cuando los nombres no lo dicen | Secundario, en la misma línea |
| **Digesto al que apunta hoy** | Es lo que responde **qué se va a desplegar**, y la palabra «hoy» es parte del dato | Secundario, en la segunda línea, abreviado, con la forma completa disponible al pedirla |

**La nota va antes de elegir y no después.** Que la etiqueta sea reasignable es una propiedad que cambia la elección, no una advertencia posterior. Es el mismo criterio con el que el alta declara el límite del archivo de construcción en línea antes de que el administrador escriba, y no al fallar.

**El digesto que se ve acá no es el digesto con el que se despliega, y la superficie no lo promete.** La verificación del origen de `SUP-17` corre igual después de volver, y es la que devuelve el digesto con el que el despliegue va a trabajar. `CU-39` lo declara en su paso 9: entre elegir y confirmar puede haber pasado cualquier cosa. Esta superficie **no muestra ningún tilde de verificado** y no ofrece ninguna acción que sugiera que lo elegido ya quedó comprobado.

### 3.3 Tres desenlaces distintos, y ninguno es «cerrar»

La superficie se abre desde dos lugares y su desenlace no es el mismo. Presentarlos con la misma etiqueta de acción sería afirmar un efecto que en un caso no ocurre.

| Desde dónde se abrió | Qué hace la acción primaria | Qué queda después |
| --- | --- | --- |
| **`SUP-17`, paso del origen, vía de imagen de registro público** | Devuelve registro, imagen y etiqueta al bloque de origen, que resuelve a la variante `imagen-publica` | El paso del origen queda completo y **sin verificar**. La acción de verificar el origen queda habilitada, y la de dejar pendiente de aplicar sigue deshabilitada hasta que las dos verificaciones estén en verde |
| **`SUP-17`, paso del origen, vía de imagen de registro privado** | Lo mismo, resolviendo a `imagen-privada`, con el registro como dirección y la credencial que la consulta ya usó | Igual que la anterior. **La credencial no se vuelve a pedir**: la que autenticó la exploración es la que queda declarada |
| **`SUP-18`, inventario de imágenes** | Presenta la referencia completa con su digesto para consultarla o llevarla a un alta posterior. **No crea ningún servicio y no declara ningún origen** | El inventario queda como estaba. Es el caso `FA-05` de `CU-39` |

**El etiquetado de la acción cambia con el desenlace.** Desde el alta la acción nombra lo que produce sobre el alta; desde el inventario nombra lo que produce sobre la consulta. Un botón único cuyo efecto depende de dónde se abrió es exactamente el defecto que `SUP-17` §3.4 evita al separar «guardar como borrador» de «dejar pendiente de aplicar».

**Cancelar no pierde nada.** Lo que el administrador ya escribió en el alta **no se toca**: el servicio sigue en `borrador` y el paso del origen queda como estaba. La superficie lo declara en lugar de pedir confirmación, porque no hay nada que confirmar.

### 3.4 Las tres formas de no encontrar nada se ven distinto

Es la distinción que el administrador necesita para saber **qué hacer**, y las tres acciones son distintas. `SUP-17` §3.3 ya separa dato incorrecto de consulta imposible; esta superficie hereda esa separación y agrega la tercera.

| Clase | Qué pasó | Qué muestra | Acción que ofrece |
| --- | --- | --- | --- |
| **Sin resultados** | La consulta se completó y no hay coincidencias | Resultado, **no error**, declarando qué registro se consultó y con qué criterio | Cambiar el criterio, o cambiar de registro. Es el estado vacío por filtro, no el de primer uso |
| **Consulta imposible** | El registro no respondió | Resultado **indeterminado**, sin lenguaje visual de error, con qué no se pudo consultar | **Reintentar.** No hay ningún dato que corregir y **ningún campo queda marcado** |
| **Credencial rechazada** | El registro privado no aceptó la identidad declarada | Resultado **fallido**, con clase propia, visiblemente distinta de las otras dos | **Corregir la credencial del registro.** El valor de la credencial **no aparece en el mensaje** |

**La cuarta forma no es un fallo y también se declara:** un registro que **no admite enumerar** lo que publica y sólo responde consultas por nombre. La superficie **declara la limitación** y ofrece la búsqueda por nombre exacto, en lugar de presentar una lista vacía que se leería como «no hay nada». Es `FA-04` de `CU-39`.

**Ninguna de las cuatro invalida lo que el administrador ya declaró en el alta.** Es la propiedad que hace que explorar sea barato de intentar.

---

## 4. Interacciones

| Acción | Disparador | Resultado esperado | Precondición |
| --- | --- | --- | --- |
| Abrir la exploración desde el alta | Acción contigua al bloque de origen, en las vías de imagen pública e imagen privada | Se abre la superficie con el registro por defecto de la vía elegida | Vía de imagen elegida en `SUP-17` |
| Abrir la exploración desde el inventario | Acción del encabezado de `SUP-18` | Se abre la superficie sin alta en curso. El desenlace es el de consulta: ver §3.3 | Sesión iniciada |
| Elegir un registro | Selector de la cabecera | Se declara la identidad con la que se va a consultar. Los resultados en curso **se descartan** y no se mezclan | Hay al menos un registro configurado |
| Buscar | Campo de búsqueda | Se consulta el registro y se listan las coincidencias con su referencia legible | Registro elegido |
| Recorrer lo que el registro publica | Apertura sin criterio de búsqueda | Se lista lo que el registro publica. Si el registro no admite enumerar, se declara la limitación | Registro elegido y que admita enumerar |
| Elegir una imagen | Acción de una fila de resultados | Se listan sus etiquetas, cada una con su momento de publicación y el digesto al que apunta hoy | Hay resultados |
| Ver el digesto completo | Acción sobre el digesto abreviado | Se muestra la forma completa, copiable | Ninguna |
| Volver a los resultados | Acción declarada de la cabecera | Se vuelve a la lista con el criterio de búsqueda conservado | Se está en la lista de etiquetas |
| Elegir una etiqueta | Selección única de la lista | La acción primaria se habilita | Hay etiquetas |
| Usar esta imagen | Acción primaria | Devuelve la referencia completa. El desenlace depende de desde dónde se abrió: ver §3.3 | Hay una etiqueta elegida |
| Reintentar tras una consulta imposible | Acción de la zona de resultado | Se repite la consulta. **Ningún campo queda marcado** | El resultado fue indeterminado |
| Corregir la credencial | Acción de la zona de resultado | Lleva a corregir la credencial del registro elegido | El resultado fue credencial rechazada |
| Configurar un registro | Acción del estado vacío | Lleva a configurar un registro de imágenes. **A qué superficie lleva no está declarado**: ver §5.1 | No hay ningún registro configurado |
| Cancelar | Acción secundaria o cierre | Se cierra sin devolver nada. **Nada se pierde**: el alta sigue en `borrador` con lo declarado | Ninguna |

---

## 5. Estados

| Estado | Condición que lo produce | Representación esperada |
| --- | --- | --- |
| Vacío, sin ningún registro configurado | No hay ningún registro de imágenes configurado | **El vacío se declara con su motivo**, con la acción de configurar uno y con las vías de alta que no dependen de un registro —repositorio remoto y archivo de construcción en línea—. **Nunca una lista vacía sin explicación** |
| Vacío, sin criterio todavía | Hay registro elegido y el administrador no buscó ni recorrió nada | Texto orientativo con la acción siguiente. Es un estado de invitación, no una anomalía |
| Cargando | La consulta al registro está en curso | Esqueleto de lista. La consulta cruza a un sistema externo y **puede tardar**: ver §7 |
| Con resultados | La consulta devolvió coincidencias | Lista con repositorio, imagen y referencia legible completa por fila |
| Sin resultados | La consulta se completó y no hay coincidencias | **Resultado y no error**, declarando qué registro se consultó y con qué criterio. Estado vacío por filtro, con la acción de cambiar el criterio |
| Error de alcance, consulta imposible | El registro no responde o es inalcanzable | Resultado **indeterminado**, **sin lenguaje visual de error**, con acción de reintentar y **sin ningún campo marcado** |
| Error de credencial, credencial rechazada | El registro privado rechaza la identidad declarada | Resultado **fallido**, con clase propia visiblemente distinta de la anterior, y acción de corregir la credencial. **El valor de la credencial no aparece** |
| Enumeración no admitida | El registro elegido no ofrece forma de listar su contenido | La limitación **declarada con esas palabras**, y la búsqueda por nombre exacto ofrecida en su lugar |
| Etiquetas de la imagen elegida | Se eligió una imagen y el registro devolvió sus etiquetas | Lista de etiquetas, cada una con su momento de publicación y el **digesto al que apunta hoy**, con la nota de que la etiqueta es reasignable **antes** de la lista |
| Imagen sin etiquetas resolubles | El registro no devuelve ninguna etiqueta para la imagen elegida | Se declara con esas palabras y se ofrece volver a los resultados. **No se presenta como error del administrador** |
| Etiqueta elegida | Hay una selección | La acción primaria habilitada, con el digesto de lo elegido a la vista |
| Devuelto al alta | Se usó la imagen desde `SUP-17` | La superficie se cierra y el paso del origen queda **completo y sin verificar**, con la acción de verificar el origen habilitada |
| Consultado fuera del alta | Se usó la imagen desde `SUP-18` | La referencia completa con su digesto, presentada para consultarla o copiarla. **No se creó ningún servicio y no se declaró ningún origen** |
| Sin permiso | — | **No aplica** para el administrador. Si explorar exige un ámbito de credencial propio es una decisión abierta: ver §5.1 |

**Catorce estados.** Los trece primeros son demostrables; el último no se maqueta, por la misma razón que en el resto de la categoría.

### 5.1 Qué no se especifica, y por qué

**Tres datos que esta superficie necesita no están declarados por ninguna fuente.** `CU-39` los devolvió como ambigüedad con destinatario en el agente humano del proyecto —es su brecha `B-27`—, y esta categoría **no los inventa**. Se declaran acá como **`B-UX-29`**, con lo que cada uno bloquea y con la restricción que cualquier resolución tiene que cumplir:

| Dato sin declarar | Qué bloquea en esta superficie | Restricción que cualquier resolución debe cumplir |
| --- | --- | --- |
| **Dónde se configura el conjunto de registros explorables**, y si el registro público de referencia viene configurado de fábrica | El contenido del selector de registro, el destino de la acción «configurar un registro» del estado vacío, y **si el estado vacío es alcanzable en una instalación nueva**. Si el registro público viene de fábrica, el estado vacío es un caso de borde; si no, es el primer estado que ve todo administrador nuevo | Si el conjunto es configuración de la instalación, su superficie es `SUP-12`; si es del proyecto SelfHosted, es una superficie del proyecto. **La acción del estado vacío tiene que llevar a un lugar que exista**, y hoy no se puede declarar cuál es sin elegir por el agente humano |
| **Si explorar exige un ámbito de credencial propio**, distinto del de desplegar | La fila «sin permiso» de §5, y si la exploración por interfaz programática existe siquiera | Es el mismo eje que `Q-18` abre para la limpieza de imágenes, aplicado a otra operación de lectura contra un sistema externo. Por el principio de ámbito mínimo del intake §17.P.5, **no se presume**: si se resuelve creando un ámbito, la superficie de emisión de credenciales de `SUP-12` lo enumera; si se resuelve declarando que es sólo de interfaz, la fila «sin permiso» se cierra como «no aplica» sin más |
| **Si hay exploración equivalente para el origen por repositorio remoto** | Si esta superficie es una de dos, o la única de su clase. La vía 5 del alta pide proveedor, dirección y **rama**, y recorrer las ramas de un repositorio es el análogo exacto de recorrer las etiquetas de una imagen | `Q-27` decidió sobre el **registro de imágenes** y no sobre el repositorio, y esta categoría **no lo asume por analogía**. Si la respuesta es que sí, es **otra superficie** y no un modo de ésta: el objeto que se recorre es distinto y su desenlace declara otra variante de origen |

**Destinatario de las tres: agente humano del proyecto.**

**Lo que sí queda especificado, y es la mayor parte.** El recorrido de tres momentos, la presentación de la etiqueta con su digesto, los tres desenlaces, las cuatro formas de no encontrar nada, las catorce filas de estado y las catorce interacciones **no dependen de ninguno de los tres datos** y se declaran completos.

**Consecuencia para la maqueta, declarada.** La superficie **se construye**. Los dos únicos puntos que la maqueta no puede resolver por sí sola son el **contenido del selector de registro** —que se demuestra con dato de ejemplo, como todo el resto— y el **destino de la acción de configurar un registro**, que en la maqueta queda como arista declarada sin destino hasta que la brecha se cierre. Ninguno de los dos impide demostrar los trece estados demostrables.

---

## 6. Versión responsive

La matriz de plataforma declara una única familia de navegador de escritorio y excluye navegadores móviles y pantallas pequeñas. Esta superficie **no tiene versión móvil especificada**.

- La superficie con flujo propio conserva un ancho máximo acotado y no ocupa el ancho completo de la ventana: la lista de resultados se lee peor cuanto más larga es la línea.
- La referencia legible completa de cada resultado y el digesto abreviado de cada etiqueta **no se truncan al angostar**: desplazan horizontalmente dentro de su propia fila, porque una referencia truncada deja de identificar, que es lo único para lo que sirve.
- La fila de etiqueta reflúye apilando el digesto debajo del nombre, **conservando los dos**.
- El selector de registro conserva su posición en la cabecera en todos los anchos: es el control que cambia el significado de todo lo demás.

**Norma de diseño aplicada, no brecha.** El punto de quiebre principal alrededor de 768 px y el piso de 320 px sin desplazamiento horizontal de la página los declara `Design-Rules-Web-Generico.md` §8, y esta superficie los aplica.

---

## 7. Notas de implementación

**Accesibilidad.**

- La superficie con flujo propio declara su nombre accesible, recibe el foco al abrirse y **lo devuelve al control que la invocó** al cerrarse, tanto al usar una imagen como al cancelar.
- El foco queda contenido mientras está abierta, y la acción de cancelar es alcanzable por teclado desde cualquier punto del recorrido.
- El nombre accesible de cada fila de resultado incluye la **referencia legible completa**, no sólo el nombre corto de la imagen.
- El nombre accesible de cada fila de etiqueta incluye la etiqueta, su momento de publicación y su digesto: es lo que permite elegir sin abrir cada fila.
- El digesto se expone completo al texto accesible aunque se muestre abreviado.
- La lista de etiquetas es un grupo de selección única con nombre accesible propio, y **la nota sobre la reasignabilidad de la etiqueta forma parte de la descripción del grupo**, no de una fila.
- La zona de resultado de la consulta es una **región de estado** y se anuncia al completarse. El resultado **indeterminado no se anuncia como alerta**: nada está mal.

**Performance percibida.** La consulta cruza a un sistema externo por red y **puede tardar**, con los mismos criterios que las dos verificaciones de `SUP-17`: se muestra como operación con progreso, con la acción deshabilitada mientras corre, y con un límite tras el cual el resultado pasa a **indeterminado** en lugar de quedar colgado. Los umbrales de lectura sin operación sobre el motor de contenedores del intake §17.P.10 **no aplican acá**: no es una lectura local.

**Secretos.** La credencial de registro se identifica **por su nombre** y su valor no se muestra, no se devuelve y no aparece en ningún mensaje de error, incluido el de credencial rechazada (RN-15). La superficie declara **con qué identidad consulta** —anónima, o el nombre de la credencial— porque es lo que explica por qué un registro devuelve una cosa y otro devuelve otra.

**Internacionalización.** Nombres de registro, de repositorio, de imagen, etiquetas y digestos se muestran **literales y no se traducen**. Los momentos de publicación se muestran en forma relativa legible, con la fecha completa disponible al pedirla, igual que en el resto de la categoría. La prosa de la superficie, las clases de resultado y las acciones sí se traducen.

**Lo que esta superficie no escribe.** La exploración es de **sólo lectura**: no crea servicios, no copia el catálogo remoto al registro del sistema y **no produce evento de auditoría por sí misma**. El evento lo produce el alta que consume el resultado, cuando escribe (RN-17). Es el mismo criterio con el que el descubrimiento de `SUP-10` no escribe.

---

## 8. Trazabilidad

| Dimensión | Referencia |
| --- | --- |
| Persona objetivo | Administrador único del producto: [`Vision-Producto.md`](../../00-Contexto/Vision-Producto.md) §2.1 |
| CU origen | [CU-39](../../02-Especificacion-Funcional/Casos-De-Uso/CU-39-Exploracion-Del-Registro-De-Imagenes.md), [CU-03](../../02-Especificacion-Funcional/Casos-De-Uso/CU-03-Alta-Y-Configuracion-De-Servicio.md) |
| Reglas de negocio relevantes | RN-08, los datos que cada variante de imagen exige y que la exploración completa; RN-15, la credencial de registro nunca se devuelve en claro; RN-17, la exploración no escribe y no produce evento. Reglas conceptuales: ninguna, porque la exploración **no persiste entidades** |
| Insumo del intake | **v3.2.** §19, la decisión `Q-27` con su consecuencia declarada de que es una superficie nueva; §4, nota de los dos ejes del alta, con las vías 3 y 4 y `DI-18` confirmada; anexo **E-2** §20.2.3, las cinco variantes discriminadas de origen y la diferencia de dos campos entre imagen pública y privada; anexo **E-23**, la etiqueta como nombre reasignable frente al digesto como identidad real |
| Marco de experiencia aplicado | [`Experiencia-De-Uso.md`](../Experiencia-De-Uso.md) §3.3 flujo FL-03, §8.1 taxonomía de errores, §10.3 supuesto `S-UX-03` sobre la superficie con flujo propio |
| Representaciones que invoca | Ninguna. La superficie **no exhibe estado de ejecución** —no hay nada corriendo del otro lado— y sus resultados no son códigos del catálogo de las superficies de identidad |
| Superficies con las que se coordina | `SUP-17`, alta de servicio, que la invoca desde el paso del origen en las vías 3 y 4 y recibe su resultado; `SUP-18`, inventario de imágenes, que la invoca como consulta; `SUP-12`, configuración del sistema, destino probable de la acción de configurar un registro, **sujeto a la brecha `B-UX-29`** |
| Catálogo de diseño aplicado | `Design-Rules-Web-Generico.md` §3.2, §4.3, §4.6, §4.9, §4.10, §5, §7, §8, y §4.5 **declarado no aplicable** con su motivo en §3.1; `Design-Rules-Blazor-Mudblazor.md` §4 |
| US a generar en 06 | US-CU-39-1 a US-CU-39-5, provisionales, más `US-CU-03-11` en su parte de superficie |
| Tests previstos en 08 | Snapshot de los **catorce** estados declarados; verificación de que **cada etiqueta se exhibe con el digesto al que apunta** y de que la nota de reasignabilidad aparece **antes** de la lista; verificación de que las tres clases de no-resultado —sin resultados, consulta imposible, credencial rechazada— **se ven distinto** y ofrecen acciones distintas; verificación de que el resultado indeterminado **no** usa lenguaje visual de error y **no** marca ningún campo; verificación de que el valor de la credencial **no aparece** en ningún mensaje; verificación de que volver del flujo **no marca el origen como verificado**; verificación de que cancelar **no pierde** lo declarado en el alta |
| Brechas que declara | **`B-UX-29` nueva**: los tres datos que ninguna fuente declara —dónde se configura el conjunto de registros explorables y si viene alguno de fábrica, si explorar exige ámbito de credencial propio, y si hay exploración equivalente para el origen por repositorio remoto—, enumerados en §5.1 con lo que cada uno bloquea y con la restricción que cualquier resolución debe cumplir. Destinatario: agente humano del proyecto. Es la misma ambigüedad que `02-Especificacion-Funcional` declara como `B-27`, vista desde la superficie. **Cierra `B-UX-23`**, el primer minuto de uso sin camino, que era la pendiente `Q-27` |
| Maqueta de la Fase B2 | Nombre canónico `Exploración de registro de imágenes`. **Superficie nueva: la maqueta la construye desde cero**, no la rehace. Catorce estados declarados, trece demostrables |
| Fuente de la correspondencia | La fila «CU origen» reproduce la fila de esta superficie en [`Experiencia-De-Uso.md`](../Experiencia-De-Uso.md) §9.2, que es la **fuente única** de la correspondencia entre superficie y caso de uso. Se reproduce, y no se referencia, porque `Rules-UX-UI-DX.md` §4.2.1 punto 8 la exige como sección obligatoria del wireframe |

---

## 9. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 1.0 | 2026-07-30 | **Versión inicial. Superficie nueva `SUP-19`**, emitida por la decisión `Q-27` del agente humano del proyecto del 2026-07-30, consolidada en el `PRODUCT-INTAKE-SelfHosted-Service` **v3.2** §19, cuya consecuencia declarada es explícitamente que la exploración de registro de imágenes **es una superficie nueva con wireframe propio**. Deriva de [`CU-39`](../../02-Especificacion-Funcional/Casos-De-Uso/CU-39-Exploracion-Del-Registro-De-Imagenes.md) 1.0, que **propuso el identificador y no lo emitió** para no invadir esta categoría, y lo dejó como su brecha `B-25` con destinataria acá. Toma el **siguiente identificador libre de la serie**, al final y sin renumerar: la categoría declaraba `SUP-01` a `SUP-18`. Especifica el **recorrido de tres momentos sin dibujarlo como asistente**, con los tres motivos por los que el patrón del catálogo no aplica; la **presentación de cada etiqueta con el digesto al que apunta hoy** y la nota de reasignabilidad **antes** de elegir y no después, derivada del anexo E-23; los **tres desenlaces distintos** según desde dónde se abrió —las dos vías de imagen del alta y el inventario—, con la regla de que el etiquetado de la acción cambia con el desenlace; y las **cuatro formas de no encontrar nada**, con la separación entre sin resultados, consulta imposible y credencial rechazada heredada de `SUP-17` §3.3 más la limitación del registro que no admite enumerar. Declara **catorce estados**, trece demostrables, incluidos los seis que el despacho exige —vacío, cargando, con resultados, sin resultados, error de alcance y error de credencial—, y **catorce interacciones**. Declara además que **explorar no es verificar**: la superficie no muestra ningún tilde de verificado y la verificación del origen de `SUP-17` corre igual al volver. **Tres datos que ninguna fuente declara se emiten como brecha `B-UX-29` y no se inventan**, cada uno con lo que bloquea y con la restricción que cualquier resolución debe cumplir; con su emisión, **`B-UX-23` queda cerrada** |
