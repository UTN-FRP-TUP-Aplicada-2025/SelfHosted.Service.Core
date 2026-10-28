# Representación — Lenguaje visual de estados

**Proyecto de código:** SelfHosted-Service
**Producto:** SelfHosted Service
**Documento:** Representacion-Lenguaje-Visual-De-Estados.md
**Versión:** 2.1
**Estado:** Propuesto
**Fecha:** 2026-08-01
**Autor:** UX/UI Designer + Frontend Lead (AG-03)
**Variante:** UX/UI

---

## Tabla de contenido

- [1. Concepto representado y propósito](#1-concepto-representado-y-propósito)
- [2. Apariencia esquemática](#2-apariencia-esquemática)
- [3. Variantes](#3-variantes)
  - [3.1 Los siete estados del contrato visual](#31-los-siete-estados-del-contrato-visual)
  - [3.2 Correspondencia con el estado que reporta el motor de contenedores](#32-correspondencia-con-el-estado-que-reporta-el-motor-de-contenedores)
  - [3.3 Las tres variantes que el contrato no cubre, y cómo se tratan mientras tanto](#33-las-tres-variantes-que-el-contrato-no-cubre-y-cómo-se-tratan-mientras-tanto)
  - [3.4 Estado agregado de un proyecto SelfHosted](#34-estado-agregado-de-un-proyecto-selfhosted)
  - [3.5 Los distintivos, que componen sobre el par y no lo reemplazan](#35-los-distintivos-que-componen-sobre-el-par-y-no-lo-reemplazan)
  - [3.6 El reposo del contenedor creado, que el contrato lee como transición](#36-el-reposo-del-contenedor-creado-que-el-contrato-lee-como-transición)
- [4. Datos que consume](#4-datos-que-consume)
- [5. Restricciones de accesibilidad](#5-restricciones-de-accesibilidad)
- [6. Reutilización](#6-reutilización)
- [7. Control de cambios](#7-control-de-cambios)

---

## 1. Concepto representado y propósito

El **par de estado** es la unidad mínima con la que el producto comunica en qué situación está un despliegue, un servicio o un proyecto SelfHosted. Se compone siempre de tres canales simultáneos: una insignia vectorial, una etiqueta textual y un tratamiento de borde o de superficie. Aparece en cinco superficies distintas y tiene que leerse igual en las cinco, que es la aplicación literal de la ley de Jakob que `Design-Rules-Web-Generico.md` §1 declara como principio 3.

Existe como representación centralizada por dos motivos. El primero es que el anexo E-18 del intake declara el lenguaje visual de estados como **contrato verificable**, contra el que se valida la fidelidad de la etapa `b`; centralizarlo evita que cada superficie lo reinterprete. El segundo es que la correspondencia entre los estados que el motor de contenedores reporta, los estados del despliegue del anexo E-17 y las filas del contrato visual de E-18 **no es uno a uno**, y esa traducción tiene que vivir en un solo lugar.

Lo que esta representación **no** hace: no fija valores de color, no nombra hexadecimales y no define tokens. Nombra los estados semánticos del catálogo base y deja que el theme los materialice, según la prohibición de tokens ad hoc de `Rules-UX-UI-DX.md` §4.4.

---

## 2. Apariencia esquemática

El par de estado en sus tres presentaciones. La composición es la misma; cambia la densidad.

```text
Presentación compacta, en la cabecera de un nodo o en una fila de tabla:

    (i) Activo
     ^   ^
     |   +-- etiqueta textual, siempre presente
     +------ insignia vectorial, heredada del color del contenedor


Presentación con antigüedad, en la cabecera del panel lateral:

    (i) Activo · desde hace 1 h 12 min


Presentación con causa, cuando el estado es de fallo:

    (i) Fallido
        La imagen no existe en el registro
        ^
        +-- causa identificable, tomada del último evento de la línea de tiempo


Tratamiento del borde del contenedor que aloja el par:

    +----------------------+     borde sólido      -> estado estable
    +- - - - - - - - - - - +     borde punteado    -> estado en transición o no aplicado
    +//////////////////////+     borde rayado      -> estado de deriva (huérfano)
```

El borde es un canal **redundante**, no portador único: un lector que no distinga el trazo obtiene la misma información de la insignia y de la etiqueta.

---

## 3. Variantes

### 3.1 Los siete estados del contrato visual

Transcriptos del anexo E-18 sin modificación, con la correspondencia al estado semántico del catálogo base que el theme materializa.

| Variante | Condición de uso | Estado semántico del catálogo base | Insignia | Borde |
| --- | --- | --- | --- | --- |
| Activo | El contenedor corre, sin verificación de salud o con verificación sana | Éxito | Círculo lleno | Sólido tenue |
| Activo degradado | El contenedor corre con la verificación de salud en mal estado. **No es una caída** | Atención | Círculo semilleno | Sólido |
| Creando o construyendo | El despliegue está en construcción de imagen o en creación de contenedor, o su verificación de salud todavía no confirmó | Informativo | Círculo en cuarto, animado | Punteado animado |
| Detenido o retirado | El contenedor fue eliminado por una parada o reemplazado por un despliegue nuevo | Neutro | Círculo vacío | Sólido |
| Caído o fallido | El proceso murió con código distinto de cero, la política de reinicio está actuando, o el despliegue nunca llegó a materializarse | Error | Cruz | Sólido |
| **Pendiente de aplicar** | El elemento existe en el conjunto de cambios pendientes y todavía no se aplicó | **Sin correspondencia.** Ver §3.3 | Rombo | Punteado |
| Huérfano | El despliegue está registrado como activo y su contenedor no existe en el motor de contenedores | Composición: neutro con contorno del par de error | Triángulo de advertencia | Rayado |

### 3.2 Correspondencia con el estado que reporta el motor de contenedores

Tabla del anexo E-17, transcripta sin reinterpretación, con la variante visual que le corresponde. Es lo que la interfaz consume: nunca lee el estado del motor directamente.

| Estado del contenedor | Estado del despliegue | Variante visual |
| --- | --- | --- |
| Creado, aún sin arrancar | Pendiente | Creando o construyendo |
| En ejecución, sin verificación de salud | Activo | Activo |
| En ejecución, verificación de salud iniciando | Creando | Creando o construyendo |
| En ejecución, verificación de salud sana | Activo | Activo |
| En ejecución, verificación de salud en mal estado | Activo degradado | Activo degradado |
| Reiniciando | Caído | Caído o fallido |
| Terminado con código cero | Finalizado | **Sin fila propia.** Ver §3.3 |
| Terminado con código distinto de cero | Caído | Caído o fallido |
| En pausa | Activo pausado | **Sin fila propia.** Ver §3.3 |
| Muerto o eliminado | Retirado | Detenido o retirado |
| No existe en el motor, con despliegue registrado como activo | Huérfano | Huérfano |

Todo despliegue se resuelve en un estado y **nunca en «no se sabe»**: el que nunca llegó a crearse queda fallido y el que existía y desapareció, huérfano. La reconciliación se ejecuta también en la apertura del proyecto SelfHosted, antes de pintar el lienzo.

### 3.3 Las tres variantes que el contrato no cubre, y cómo se tratan mientras tanto

| Situación | Qué falta | Tratamiento provisional | Brecha |
| --- | --- | --- | --- |
| Pendiente de aplicar | El estado tiene fila en el contrato visual de E-18, que le asigna un color exclusivo, y **no tiene estado semántico correspondiente en el catálogo base**. El catálogo prohíbe definir el token por proyecto de código | La variante se nombra por su nombre semántico, «pendiente de aplicar», y su insignia y su borde punteado ya la distinguen sin depender del color. Ningún otro elemento de la interfaz puede usar el color que E-18 le reserva | `B-UX-05` |
| Finalizado | El anexo E-17 exige que la interfaz lo distinga de una caída, y el contrato visual de E-18 no tiene fila para él | Se exhibe con la insignia y el borde de «detenido o retirado» sobre el par neutro, y con **etiqueta textual propia**: «Finalizado». La etiqueta es el canal que lo distingue hasta que el contrato se complete | `B-UX-12` |
| Activo pausado | Mismo caso | Se exhibe con la insignia y el borde de «detenido o retirado» sobre el par neutro, y con **etiqueta textual propia**: «Pausado» | `B-UX-12` |

El criterio del tratamiento provisional es el mismo en los tres casos: **no se inventa un color ni una insignia**, y la distinción se sostiene sobre el canal textual, que ya es obligatorio por accesibilidad. Es la opción que no compromete la resolución de la brecha.

### 3.4 Estado agregado de un proyecto SelfHosted

El estado de un proyecto SelfHosted **se deriva de los estados de sus despliegues por contenedor** y no es un estado propio de la operación. La variante que exhibe es la de sus despliegues, más una propia:

| Variante agregada | Condición | Presentación |
| --- | --- | --- |
| Activo | Todos los servicios con despliegue tienen despliegue activo | Par de estado «Activo», más el conteo de servicios activos sobre el total |
| Parcialmente activo | Al menos un servicio quedó fuera: falló, quedó excluido por conflicto o no se alcanzó | Par de estado «Activo degradado», más el conteo, más la etiqueta textual propia «Parcialmente activo» |
| Detenido | Ningún servicio tiene despliegue activo | Par de estado «Detenido o retirado», más el conteo en cero |

«Parcialmente activo» es un **estado legítimo del modelo**, no un accidente a resolver. Ninguna superficie lo presenta con el tratamiento de error, y ninguna ofrece una acción de «reparar» que las fuentes no declaran.

### 3.5 Los distintivos, que componen sobre el par y no lo reemplazan

Desde el 2026-08-01 el producto declara **dos propiedades del servicio que no son estados del despliegue** y que la interfaz tiene que exhibir junto al par de estado. Se tratan acá porque aparecen en más de una superficie y porque la tentación de resolverlas como una octava y una novena fila del contrato visual es exactamente el defecto que esta representación existe para evitar.

| Distintivo | Qué declara | De qué depende | Dónde aparece |
| --- | --- | --- | --- |
| **En cuarentena** | Que el despliegue nuevo del servicio no arrancó y que el anterior recuperado tampoco, con el proyecto SelfHosted siguiendo en marcha | Del resultado del último intento de arranque | Nodo del lienzo, cabecera del panel lateral, y la fila del tablero de estado |
| **No reproducible** | Que la imagen del servicio vive sólo en el almacén local de este servidor, y que al importar el proyecto en otra máquina no va a estar | **Del origen del servicio**, de forma derivada y no editable | Nodo del lienzo, cabecera y apartado de origen del panel lateral, alta de servicio, tarjeta del proyecto en el listado y resumen del proyecto en el lienzo |

**La regla que los gobierna a los dos, y es una sola:** el distintivo **compone sobre el par de estado, no lo reemplaza y no le cambia la variante**. Un servicio en cuarentena exhibe el par del despliegue que esté sirviendo; un servicio no reproducible exhibe el par que corresponda a su despliegue. **No se les asigna insignia, borde ni color propios**, y por lo tanto **no se agrega ninguna fila al contrato visual del anexo E-18**.

Es el mismo criterio que §3.3 aplica a «finalizado» y «pausado», y por la misma razón: no se inventa un token, y la distinción se sostiene sobre el **canal textual**, que ya es obligatorio por accesibilidad. La diferencia con §3.3 es que ahí el canal textual es un **tratamiento provisional** que espera que el contrato se complete, y acá **no lo es**: una propiedad del servicio no tiene por qué tener fila en un contrato de estados del despliegue. Se declara la diferencia para que una revisión posterior no lo lea como la misma deuda.

**Cuatro restricciones que cualquier materialización tiene que cumplir:**

1. **No pueden usar el color que el anexo E-18 reserva en exclusiva** para «pendiente de aplicar».
2. **No pueden usar el tratamiento de error ni el de atención.** «No reproducible» es una propiedad declarada de lo que el administrador eligió, y el intake declara que la deuda **se acepta a cambio de costo**. «En cuarentena» sí comunica un fallo, pero el fallo ya lo comunica el par de estado del despliegue: duplicarlo en el distintivo diría dos veces lo mismo.
3. **El nombre accesible del elemento que los aloja incluye el distintivo**, no sólo el estado. Un lector de pantalla que recorre treinta nodos tiene que poder distinguir el que está en cuarentena sin abrirlo.
4. **Su ausencia no se representa.** Un servicio reproducible y sin cuarentena no lleva ningún rótulo que lo declare: lo normal no se rotula.

**Lo que esta representación no resuelve.** Los tres puntos abiertos de la política de cuarentena —si la recuperación del despliegue anterior es automática u ofrecida, si la cuarentena apaga el autoarranque o la participación en el arranque, y **dónde se avisa**— son la brecha `B-UX-31` y **no se cierran acá**. Esta representación declara **cómo se ve** lo que ya está decidido, no qué debería ocurrir con lo que no lo está.

### 3.6 El reposo del contenedor creado, que el contrato lee como transición

**Una fila de la tabla de §3.2 dejó de decir la verdad, y se declara en lugar de corregirse en silencio.** El anexo E-17 asigna al contenedor «creado, aún sin arrancar» el estado de despliegue `Pendiente`, y esta representación lo venía mapeando a la variante visual **«creando o construyendo»**, que lleva insignia animada y borde punteado animado, es decir el lenguaje de **una operación en curso**.

Con la decisión del 2026-07-31, ese estado intermedio es **reposo legítimo y no un paso transitorio**: un despliegue puede terminar correctamente ahí cuando la intención de ejecución dice que no hay que arrancar. Una insignia animada afirmaría que algo está ocurriendo cuando no está ocurriendo nada, que es exactamente lo que el criterio de esta categoría llama mentir en silencio.

| Situación | Qué exhibía hasta la versión 2.0 | Qué exhibe desde esta versión |
| --- | --- | --- |
| Contenedor creado **mientras el despliegue está en curso** | «Creando o construyendo», animada | **Sin cambio.** Ahí sí hay una operación en curso |
| Contenedor creado **y el despliegue terminó sin arrancar** | «Creando o construyendo», animada | **Par neutro con etiqueta textual propia: «Desplegado, sin arrancar».** Sin animación y sin tratamiento de error |

**El criterio es el de §3.3 y no se inventa una fila.** El contrato visual del anexo E-18 no tiene fila para el reposo, porque el reposo no existía como desenlace cuando se declaró. Se exhibe con la insignia y el borde de «detenido o retirado» sobre el par neutro, y con **etiqueta textual propia**, que es el canal que lo distingue.

**Por qué el par neutro y no el informativo.** El informativo es el que el contrato asigna a lo que está en curso, y el reposo no lo está. El neutro es el que el contrato asigna a lo que existe y no corre, que es exactamente la situación: el contenedor existe, el proceso no.

**Brecha declarada, `B-UX-34`.** La tabla de correspondencia del anexo E-17 **no distingue las dos situaciones**: tiene una sola fila para «creado, aún sin arrancar», y qué campo del modelo permite distinguir el despliegue en curso del despliegue terminado en reposo no lo declara ninguna fuente. Esta representación **declara el tratamiento visual de las dos y no inventa el campo que las separa**. Destinatario: agente humano del proyecto, para que entre al intake; y `05-Arquitectura-Tecnica`, para el dato.

---

## 4. Datos que consume

| Dato | De dónde sale | Uso |
| --- | --- | --- |
| Estado del despliegue | Reconciliación del sincronizador contra el motor, con la tabla de correspondencia del anexo E-17 | Elige la variante |
| Marca de pertenencia al conjunto de cambios pendientes | Conjunto de cambios pendientes del proyecto SelfHosted | Impone la variante «pendiente de aplicar», que prevalece sobre la del despliegue |
| Momento de inicio del despliegue | Campo de inicio del despliegue | Compone la antigüedad de la presentación con antigüedad |
| Último evento de la línea de tiempo | Línea de tiempo de eventos del despliegue | Compone la causa de la presentación con causa |
| Conteo de servicios con despliegue activo sobre el total | Derivado de los despliegues del proyecto SelfHosted | Compone el estado agregado |
| Marca de cuarentena del servicio | Resultado del último intento de arranque, según la política ante un despliegue que no arranca | Enciende el distintivo de cuarentena. **No cambia la variante del par** |
| Variante de origen del servicio | Configuración del servicio | Enciende el distintivo de no reproducible cuando la variante es imagen del almacén local. **Derivado y no editable** |
| Marca de no reproducible del proyecto SelfHosted | Derivada: verdadera cuando **al menos uno** de sus servicios la lleva | Enciende el distintivo en la tarjeta del proyecto y en el resumen del lienzo |
| Situación del despliegue con el contenedor creado | Si el despliegue sigue en curso o terminó en reposo | Elige entre «creando o construyendo» y «desplegado, sin arrancar». **El campo que las separa no está declarado**: brecha `B-UX-34` |

Precedencia entre las tres clases de marca, declarada porque ahora son tres y no una:

1. **«Pendiente de aplicar» prevalece sobre el estado del despliegue** y elige la variante del par.
2. **Los distintivos de §3.5 no compiten con ninguna de las dos**: componen encima, con su propio canal textual, y por lo tanto no hay precedencia que resolver entre ellos y el par.
3. **Entre los dos distintivos no hay precedencia**: un servicio puede estar en cuarentena y ser no reproducible a la vez, y los dos rótulos se exhiben.

Precedencia entre marcas: **«pendiente de aplicar» prevalece sobre el estado del despliegue**. Un servicio ya desplegado y activo que tiene una edición sin aplicar se exhibe como pendiente de aplicar, porque lo que el administrador necesita saber en esa pantalla es que lo que ve no es lo que corre. El estado del despliegue subyacente sigue disponible en la cabecera del panel lateral del servicio.

---

## 5. Restricciones de accesibilidad

Piso WCAG 2.2 nivel AA, heredado de `Design-Rules-Web-Generico.md` §7.

- **El color nunca es el único canal.** Los tres canales —insignia, etiqueta y borde— acompañan siempre al color. Un par de estado sin etiqueta textual es un defecto, no una variante compacta.
- **Las insignias son SVG con herencia de color del contenedor**, de un único set vectorial por producto. No son glifos de texto ni emoji: el anti-patrón de `Design-Rules-Web-Generico.md` §10 lo prohíbe explícitamente porque no escalan, no heredan color y su lectura por tecnología asistiva es impredecible. Los caracteres que el anexo E-18 usa en su transcripción son notación del anexo.
- La insignia es decorativa cuando va acompañada de su etiqueta, y se marca como tal para que el lector de pantalla no la anuncie dos veces.
- **Contraste 3:1 para el borde y la insignia**, que son componentes gráficos; 4.5:1 para la etiqueta.
- El **borde punteado animado** del estado «creando o construyendo» se detiene cuando el entorno declara preferencia de movimiento reducido. El estado sigue siendo distinguible sin la animación, porque el trazo punteado permanece.
- Un cambio de estado que ocurre sin acción del administrador —una reconciliación que descubre un contenedor huérfano, un despliegue que termina— se anuncia como región activa. Un cambio visual silencioso en una pantalla que el administrador deja abierta y vuelve a mirar no se percibe.

---

## 6. Reutilización

| Superficie | Wireframe | Cómo la usa |
| --- | --- | --- |
| Listado de proyectos | [`Wireframes-Listado-De-Proyectos.md`](../Wireframes/Wireframes-Listado-De-Proyectos.md) | Estado agregado por proyecto SelfHosted, presentación compacta |
| Lienzo del proyecto | [`Wireframes-Lienzo-Del-Proyecto.md`](../Wireframes/Wireframes-Lienzo-Del-Proyecto.md) | Cabecera y borde de cada nodo, vía [`Representacion-Nodo-De-Servicio.md`](Representacion-Nodo-De-Servicio.md) |
| Panel lateral del servicio | [`Wireframes-Panel-Lateral-Del-Servicio.md`](../Wireframes/Wireframes-Panel-Lateral-Del-Servicio.md) | Cabecera con presentación con antigüedad; línea de tiempo con presentación con causa |
| Tablero de estado | [`Wireframes-Tablero-De-Estado.md`](../Wireframes/Wireframes-Tablero-De-Estado.md) | Estado agregado en la capa de proyectos; estado por contenedor en la tercera capa |
| Descubrimiento e incorporación | [`Wireframes-Descubrimiento-E-Incorporacion.md`](../Wireframes/Wireframes-Descubrimiento-E-Incorporacion.md) | Estado observado del contenedor candidato, en presentación compacta |
| Alta de servicio | [`Wireframes-Alta-De-Servicio.md`](../Wireframes/Wireframes-Alta-De-Servicio.md) | Distintivo de no reproducible en el apartado de origen, y el nodo borrador que el alta crea |

---

## 7. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 2.1 | 2026-08-01 | **Retroalimentación de la Fase B2: dos distintivos nuevos y una fila del contrato que dejó de decir la verdad.** Por la ronda de decisiones del agente humano del proyecto del 2026-07-31, consolidada en el `PRODUCT-INTAKE-SelfHosted-Service` **v3.5** §4 —tres fases del despliegue, política ante un despliegue que no arranca— y anexo E-2 §20.2.3. Sube **minor**: **ninguna de las siete filas del contrato visual del anexo E-18 cambia, ninguna de las once de la tabla de correspondencia del anexo E-17 se reescribe, y los tres tratamientos provisionales de §3.3 quedan idénticos**. **§3.5 nueva: los distintivos**, «en cuarentena» y «no reproducible», con la regla de que **componen sobre el par de estado, no lo reemplazan y no le cambian la variante**, y por lo tanto **no se agrega ninguna fila al contrato visual**. Se declara la diferencia con §3.3: ahí el canal textual es un **tratamiento provisional** que espera que el contrato se complete; acá **no lo es**, porque una propiedad del servicio no tiene por qué tener fila en un contrato de estados del despliegue. Cuatro restricciones declaradas, entre ellas que **no pueden usar el color reservado al modo pendiente** y que **su ausencia no se representa**. **§3.6 nueva: el reposo del contenedor creado.** Se declara que la fila «creado, aún sin arrancar» del anexo E-17 se venía mapeando a la variante **animada** «creando o construyendo», y que con el reposo reconocido como **desenlace legítimo** esa animación afirmaría una operación en curso que no existe. Se declara el tratamiento de las dos situaciones —**sin cambio** cuando el despliegue está en curso, y **par neutro con etiqueta textual propia «Desplegado, sin arrancar»** cuando terminó en reposo—, con el criterio de §3.3 y sin inventar una fila, y con el argumento de por qué el par neutro y no el informativo. **Brecha nueva `B-UX-34`**: la tabla del anexo E-17 **no distingue las dos situaciones** y ninguna fuente declara qué campo del modelo las separa; se declara el tratamiento visual de las dos y **no se inventa el campo**. Destinatario: agente humano del proyecto, y `05-Arquitectura-Tecnica` para el dato. **§4 suma cuatro filas de datos consumidos** y **declara la precedencia entre las tres clases de marca**, con la constancia de que entre los dos distintivos **no hay precedencia**: un servicio puede llevar los dos. **§6** suma el alta de servicio a las superficies que la invocan. **Ninguna decisión abierta se cerró acá**: `B-UX-05` y `B-UX-12` siguen abiertas, y los tres puntos de la política de cuarentena son `B-UX-31` y **no se cierran**. La versión 2.0 queda archivada en [`_legacy/2026-08-01/Representacion-Lenguaje-Visual-De-Estados-v2.0.md`](_legacy/2026-08-01/Representacion-Lenguaje-Visual-De-Estados-v2.0.md), con su bloque de archivado antepuesto y su cuerpo sin modificar. Ninguna fila anterior de este control de cambios se reescribió (`SDD-Development-Guide.md` §VI.2) |
| 2.0 | 2026-07-30 | Migración normativa del conjunto 4.1 al 6.0, fase M4 corte 4, bajo `Rules-UX-UI-DX` 4.0, `Vocabulario-Rules` 2.1 y `Migracion-Rules` 1.0. Clasificación **regenerar contenido** por el salto major 2.0 → 4.0 de la regla que gobierna la categoría; fuente de contenido: **el documento de origen**, archivado sin modificar en `_legacy/2026-07-30/Representacion-Lenguaje-Visual-De-Estados-v1.0.md`. Sube **major** porque la nomenclatura anterior deja de cumplir. **Cabecera:** se suma el campo `Proyecto de código` con el valor `SelfHosted-Service`, que §4.1 de la regla 4.0 exige por ser ésta una categoría de nivel proyecto de código (`Vocabulario-Rules` §4 R3), y la etiqueta `Proyecto` pasa a `Producto` sobre su valor de origen `SelfHosted Service`, porque `Vocabulario-Rules` §3 prohíbe la etiqueta de un plano de identidad sobre el valor de otro; los dos conviven porque §4.1 exige el primero y `Migracion-Rules` §4.2 prohíbe perder el segundo. Se conserva el campo `Variante`. **Sustitución léxica por ocurrencia** según `Vocabulario-Rules` §9.5 y el plan de migración §3.5, y nunca por reemplazo global de cadena: la única ocurrencia de «solución» designaba el nivel superior y pasa a «producto» —«de un único set vectorial por solución» a «por producto», en §5—; la única ocurrencia de la cadena `resoluci` —«no compromete la resolución de la brecha», en §3.3— quedó **intacta**, verificada por el barrido negativo que el plan §3.5 paso 4 exige. Las diecinueve ocurrencias de «proyecto» se clasificaron una por una: dieciséis designan la entidad del dominio —nueve con la forma calificada «proyecto SelfHosted» y siete en forma corta o como nombre de archivo de un wireframe del dominio, que no se renombra—, una era la etiqueta de cabecera, y **una sola se promovió a «proyecto de código»**: «el catálogo prohíbe definir el token por proyecto», en §3.3, donde el referente es la unidad D8 que hereda los tokens del catálogo de diseño, tal como `Rules-UX-UI-DX` 4.0 §1.4 y su anti-patrón de §4.4 lo escriben ahora completo. **Nombres canónicos de estado conservados textualmente**: las siete filas del contrato visual del anexo E-18 y las once de la tabla de correspondencia del anexo E-17 no cambiaron una palabra, porque `Deriva-Rules.md` exige que coincidan término por término con la línea de base visual. **Glosario:** desde la 4.0 `Glosario-UX.md` es artefacto obligatorio para los ocho tipos D8 y §6 verifica su existencia y su completitud; los términos que esta representación acuña —par de estado, insignia, presentación compacta, presentación con antigüedad, presentación con causa, tratamiento del borde, canal redundante, estado agregado, precedencia de la marca de pendiente— se devolvieron al lote que emite ese glosario y acá no se redefinen, y los que ya declaran [`Vision-Producto`](../../00-Contexto/Vision-Producto.md) §9 y [`Glosario-Funcional`](../../02-Especificacion-Funcional/Glosario-Funcional.md) se referencian sin duplicarse. **Ningún estado, correspondencia, tratamiento provisional, brecha, dato consumido ni restricción de accesibilidad cambió de contenido**: la migración es léxica y de forma de cabecera. El bloque ASCII de §2 no contenía ninguna palabra a migrar y quedó intacto, con su ancho de caja preservado. Las filas anteriores de este control de cambios no se reescribieron. El bloque de procedencia del destino sigue declarando la 4.1 y no se toca: es trabajo de M5. Origen: [`Plan-Migracion-4.1-a-6.0.md`](../../Audit/Plan-Migracion-4.1-a-6.0.md) §3.5 y §4 |
| 1.0 | 2026-07-29 | Versión inicial. Transcribe el contrato visual de estados del anexo E-18 sin modificarlo y declara su correspondencia con los estados semánticos de `Design-Rules-Web-Generico.md` §2.1; transcribe la tabla de correspondencia con el estado del motor de contenedores del anexo E-17; declara las tres variantes que ninguno de los dos contratos resuelve —pendiente de aplicar, finalizado y pausado— con su tratamiento provisional y su brecha; declara el estado agregado del proyecto SelfHosted como derivado y la precedencia de la marca de pendiente sobre el estado del despliegue |
