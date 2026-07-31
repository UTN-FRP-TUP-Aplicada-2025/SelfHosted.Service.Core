# Representación — Lenguaje visual de estados

**Proyecto:** SelfHosted Service
**Documento:** Representacion-Lenguaje-Visual-De-Estados.md
**Versión:** 1.0
**Estado:** Propuesto
**Fecha:** 2026-07-29
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
| Pendiente de aplicar | El estado tiene fila en el contrato visual de E-18, que le asigna un color exclusivo, y **no tiene estado semántico correspondiente en el catálogo base**. El catálogo prohíbe definir el token por proyecto | La variante se nombra por su nombre semántico, «pendiente de aplicar», y su insignia y su borde punteado ya la distinguen sin depender del color. Ningún otro elemento de la interfaz puede usar el color que E-18 le reserva | `B-UX-05` |
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

---

## 4. Datos que consume

| Dato | De dónde sale | Uso |
| --- | --- | --- |
| Estado del despliegue | Reconciliación del sincronizador contra el motor, con la tabla de correspondencia del anexo E-17 | Elige la variante |
| Marca de pertenencia al conjunto de cambios pendientes | Conjunto de cambios pendientes del proyecto SelfHosted | Impone la variante «pendiente de aplicar», que prevalece sobre la del despliegue |
| Momento de inicio del despliegue | Campo de inicio del despliegue | Compone la antigüedad de la presentación con antigüedad |
| Último evento de la línea de tiempo | Línea de tiempo de eventos del despliegue | Compone la causa de la presentación con causa |
| Conteo de servicios con despliegue activo sobre el total | Derivado de los despliegues del proyecto SelfHosted | Compone el estado agregado |

Precedencia entre marcas: **«pendiente de aplicar» prevalece sobre el estado del despliegue**. Un servicio ya desplegado y activo que tiene una edición sin aplicar se exhibe como pendiente de aplicar, porque lo que el administrador necesita saber en esa pantalla es que lo que ve no es lo que corre. El estado del despliegue subyacente sigue disponible en la cabecera del panel lateral del servicio.

---

## 5. Restricciones de accesibilidad

Piso WCAG 2.2 nivel AA, heredado de `Design-Rules-Web-Generico.md` §7.

- **El color nunca es el único canal.** Los tres canales —insignia, etiqueta y borde— acompañan siempre al color. Un par de estado sin etiqueta textual es un defecto, no una variante compacta.
- **Las insignias son SVG con herencia de color del contenedor**, de un único set vectorial por solución. No son glifos de texto ni emoji: el anti-patrón de `Design-Rules-Web-Generico.md` §10 lo prohíbe explícitamente porque no escalan, no heredan color y su lectura por tecnología asistiva es impredecible. Los caracteres que el anexo E-18 usa en su transcripción son notación del anexo.
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

---

## 7. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 1.0 | 2026-07-29 | Versión inicial. Transcribe el contrato visual de estados del anexo E-18 sin modificarlo y declara su correspondencia con los estados semánticos de `Design-Rules-Web-Generico.md` §2.1; transcribe la tabla de correspondencia con el estado del motor de contenedores del anexo E-17; declara las tres variantes que ninguno de los dos contratos resuelve —pendiente de aplicar, finalizado y pausado— con su tratamiento provisional y su brecha; declara el estado agregado del proyecto SelfHosted como derivado y la precedencia de la marca de pendiente sobre el estado del despliegue |
