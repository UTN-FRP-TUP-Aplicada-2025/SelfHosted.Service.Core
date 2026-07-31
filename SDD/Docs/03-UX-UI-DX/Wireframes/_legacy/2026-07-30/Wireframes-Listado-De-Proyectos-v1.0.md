# Wireframes — Listado de proyectos

**Proyecto:** SelfHosted Service
**Documento:** Wireframes-Listado-De-Proyectos.md
**Versión:** 1.0
**Estado:** Propuesto
**Fecha:** 2026-07-29
**Autor:** UX/UI Designer + Frontend Lead (AG-03)
**Variante:** UX/UI

---

## Tabla de contenido

- [1. Pantalla y propósito](#1-pantalla-y-propósito)
- [2. Layout](#2-layout)
- [3. Componentes principales](#3-componentes-principales)
  - [3.1 La orientación posterior y su derivación](#31-la-orientación-posterior-y-su-derivación)
- [4. Interacciones](#4-interacciones)
  - [4.1 La confirmación de eliminación y su brecha](#41-la-confirmación-de-eliminación-y-su-brecha)
- [5. Estados](#5-estados)
- [6. Versión responsive](#6-versión-responsive)
- [7. Notas de implementación](#7-notas-de-implementación)
- [8. Trazabilidad](#8-trazabilidad)
- [9. Control de cambios](#9-control-de-cambios)

---

## 1. Pantalla y propósito

**Nombre canónico de la superficie: `Listado de proyectos`** (`SUP-04`).

Es la portada del shell de trabajo y el destino al que aterriza el administrador al completar el aprovisionamiento inicial. Su tarea es doble: dar el estado agregado de todos los proyectos SelfHosted declarados y ser el punto desde el que se los crea, se los renombra, se los elimina y se abre su lienzo. Corresponde a la ruta `/proyectos` del mapa de navegación del anexo E-18.

Su estado vacío tiene un peso propio: es la primera pantalla que el administrador ve con el sistema ya operable, y es donde vive la **orientación posterior** que `Design-Rules-Primer-Arranque.md` §4.6 exige.

---

## 2. Layout

Shell de trabajo completo: barra lateral de navegación de módulos, barra superior con la barra de identidad, y área de contenido sobre el lienzo.

```text
+-----------------------------------------------------------------------+
| [=] <titulo del panel>      <identidad>  [Cambiar contrasena] [Salir] |
+---------+-------------------------------------------------------------+
| Lienzo  |  [ banda de confirmacion       rol de estado ]   cond.      |
| Logs    |                                                             |
| Metr.   |  Proyectos                          [ + Nuevo proyecto ]    |
| Ajustes |  <subtitulo de una linea>                 ^ unica primaria  |
|         |  ---------------------------------------------------------  |
|         |  [ buscar...                    ]  [ estado v ]             |
|         |  ---------------------------------------------------------  |
|         |  +---------------------+  +---------------------+           |
|         |  | (i) <nombre>        |  | (i) <nombre>        |           |
|         |  |     <identificador> |  |     <identificador> |           |
|         |  |     <n>/<N> activos |  |     <n>/<N> activos |           |
|         |  |     CPU <x>% RAM <y>|  |     CPU <x>% RAM <y>|           |
|         |  |     <modo de red>   |  |     <modo de red>   |           |
|         |  |  [Abrir lienzo] [..]|  |  [Abrir lienzo] [..]|           |
|         |  +---------------------+  +---------------------+           |
+---------+-------------------------------------------------------------+
```

Grilla responsiva de tarjetas, según el patrón §3.2 del documento base. Un único botón primario en la pantalla: «Nuevo proyecto».

La barra lateral realiza el patrón §4.1 del documento base y sus destinos son los del mapa de navegación del anexo E-18. La ley de Miller se respeta con holgura: cuatro destinos de primer nivel más la acción diferenciada de cierre de sesión, que vive en la barra de identidad.

---

## 3. Componentes principales

| Componente | Propósito | Datos que muestra | Comportamiento |
| --- | --- | --- | --- |
| Barra lateral de navegación | Da acceso a los módulos del sistema | Los destinos del mapa de navegación | Ítem activo destacado; ítems inactivos a opacidad reducida. Área de toque cómoda |
| Barra de identidad | Identidad activa y las dos acciones de identidad | Ver [`Wireframes-Cambio-De-Contrasena.md`](Wireframes-Cambio-De-Contrasena.md) §3.1 | Común a todas las superficies del shell de trabajo |
| Banda de resultado, variante de confirmación | Cierra el lazo del acto ocurrido en la superficie anterior | Texto del catálogo de códigos | Aparece al llegar desde el aprovisionamiento inicial, con `IDENTIDAD-CREADA`. Rol de estado |
| Encabezado de la sección | Nombra la superficie y aloja la única acción primaria | Título y subtítulo descriptivo | Patrón §4.3 del documento base |
| Barra de búsqueda y filtros | Acota el listado | — | La búsqueda filtra; un resultado vacío muestra el estado vacío de filtro, con acción siguiente |
| Tarjeta de proyecto SelfHosted | Es la unidad del listado | Nombre visible, identificador legible, estado agregado con su conteo de servicios activos sobre el total, consumo de procesador y memoria, y modo de red | Toda la tarjeta es el área clicleable hacia el lienzo. El foco se ve en el contenedor |
| Par de estado agregado | Comunica en qué situación está el conjunto | Ver [`Representacion-Lenguaje-Visual-De-Estados.md`](../Representaciones/Representacion-Lenguaje-Visual-De-Estados.md) §3.4 | El estado se **deriva de los despliegues por contenedor**, no de un estado propio |
| Acciones por tarjeta | Abrir el lienzo, renombrar, exportar, eliminar | — | La acción de abrir es explícita además del área clicleable, para que sea alcanzable por teclado sin ambigüedad. Las tres restantes viven en un menú por tarjeta, con la de eliminar diferenciada |
| Grilla de orientación posterior | Sugiere los pasos siguientes sin bloquear | Una tarjeta de acceso por paso recomendado | Sólo en el estado vacío. Ver §3.1 |

### 3.1 La orientación posterior y su derivación

`Design-Rules-Primer-Arranque.md` §4.6 exige una superficie de destino con una grilla de tarjetas de acceso, una por cada paso recomendado, que **oriente sin bloquear**: el sistema ya es operable, y estas tarjetas son el camino sugerido, no un asistente obligatorio ni una lista de tareas con progreso.

Ninguna fuente declara cuáles son esos pasos en esta solución. Los tres que la grilla propone se **derivan** de las capacidades que el intake declara para el primer alcance, y la derivación se declara como supuesto `S-UX-01` en [`Experiencia-De-Uso.md`](../Experiencia-De-Uso.md) §10.3:

| Tarjeta | Destino | Por qué se deriva |
| --- | --- | --- |
| Crear el primer proyecto SelfHosted | Alta de proyecto | Es la capacidad F-02 y el punto de entrada de todos los flujos del producto |
| Incorporar contenedores que ya corren en el servidor | Descubrimiento e incorporación | El intake declara que el disparador del producto es el parque existente y que la herramienta «tiene que ser adoptable sobre un servidor que ya está en producción» |
| Declarar el rango de direcciones gestionado | Configuración del sistema | Es precondición de todo servicio con dirección fija, que es el patrón mayoritario del parque real |

Las tres tarjetas **no bloquean nada**: el administrador puede ignorarlas y crear un proyecto SelfHosted directamente desde la acción primaria.

---

## 4. Interacciones

| Acción | Disparador | Resultado esperado | Precondición |
| --- | --- | --- | --- |
| Abrir el listado | Navegación desde la barra lateral, o aterrizaje desde el aprovisionamiento inicial | El sistema devuelve cada proyecto SelfHosted con su estado agregado, derivado de los estados de sus despliegues por contenedor | Sesión iniciada |
| Crear un proyecto SelfHosted | Acción primaria «Nuevo proyecto» | Se abre la superficie de alta, que pide nombre, identificador legible, descripción, modo de red y marca de autoarranque. El modo por defecto es el de red virtual del motor. Al confirmar, el sistema **abre el lienzo del proyecto recién creado, que es su vista por defecto** | Sesión iniciada |
| Elegir modo de red con dirección propia de la red local en el alta | Selección en el formulario | El formulario pide además la interfaz padre y los parámetros de la red local. Se advierte que el rango debe estar fuera del que reparte el servidor de direcciones de la red | El formulario de alta está abierto |
| Abandonar el alta | Cierre del formulario antes de confirmar | Se descarta lo declarado y no se crea nada. Retorno al listado sin cambios | El alta no se confirmó |
| Abrir el lienzo | Clic en la tarjeta o en su acción de abrir | Navegación a la superficie del lienzo del proyecto SelfHosted | Existe el proyecto |
| Renombrar | Acción del menú de la tarjeta | Se pide el nombre nuevo y se confirma. **Ninguna referencia se rompe y no aparece ningún cambio pendiente**, porque las relaciones se establecen por identidad y nunca por nombre | Existe el proyecto |
| Eliminar | Acción diferenciada del menú de la tarjeta | El sistema pide confirmación y la eliminación propaga a los servicios, variables, enlaces y reservas del proyecto SelfHosted. Ver la brecha `B-UX-14` | Existe el proyecto |
| No completar la confirmación de eliminación | Abandono del diálogo | **No se elimina nada.** Retorno al listado | El diálogo estaba abierto |
| Importar un proyecto SelfHosted | Acción del encabezado, secundaria | Se abre la superficie de exportación e importación en su modo de importación. Ver [`Wireframes-Exportacion-E-Importacion.md`](Wireframes-Exportacion-E-Importacion.md) | Sesión iniciada |
| Filtrar o buscar | Escritura en el campo o selección de filtro | El listado se acota. Un resultado vacío muestra su estado propio | Hay proyectos declarados |

### 4.1 La confirmación de eliminación y su brecha

El intake declara con precisión la forma de la confirmación al eliminar **un servicio**: se escribe el nombre del servicio y se ofrece conservar los volúmenes. **No declara la forma de la confirmación al eliminar un proyecto SelfHosted completo**, que es una operación de alcance mayor: propaga a todos sus servicios, variables, enlaces y reservas.

Este wireframe declara que la confirmación existe y que la eliminación propaga, y **no inventa su forma**. Es la brecha B-04 de `02-Especificacion-Funcional`, recogida acá como `B-UX-14`, con destinatario en el agente humano del proyecto.

---

## 5. Estados

| Estado | Condición que lo produce | Representación esperada |
| --- | --- | --- |
| Vacío, primer uso | No hay ningún proyecto SelfHosted declarado | Estado vacío con ilustración vectorial ligera, texto orientativo y la acción de alta, **más la grilla de orientación posterior de §3.1**. Es una invitación a actuar, no un adorno |
| Vacío por filtro | La búsqueda o el filtro no devuelven resultados | Estado vacío distinto del anterior, sin orientación posterior, con la acción de limpiar el filtro |
| Cargando | El listado se está trayendo | Esqueleto de tarjetas. Por encima de aproximadamente 400 ms de espera |
| Con datos | Hay proyectos SelfHosted declarados | Grilla de tarjetas con su estado agregado |
| Proyecto activo | Todos los servicios con despliegue están activos | Par de estado de éxito, con el conteo completo |
| Proyecto parcialmente activo | Al menos un servicio quedó fuera | Par de estado de atención más la etiqueta textual propia. **Es un estado legítimo del modelo**: no lleva tratamiento de error ni acción de reparar |
| Proyecto detenido | Ningún servicio tiene despliegue activo | Par de estado neutro, con el conteo en cero y **sin cifras de consumo**: mostrar cero afirmaría un consumo que no existe |
| Error | El listado no pudo traerse | Banda de error con causa y acción de recuperación |
| Éxito de una acción | Un alta, un renombrado o una eliminación se concretó | Confirmación sutil, con el verbo del acuse coincidiendo con el del botón |
| Confirmación entrante | Se llega desde el aprovisionamiento inicial | Banda de confirmación con `IDENTIDAD-CREADA` |
| Identificador legible en uso | El identificador declarado ya existe | Rechazo con el campo señalado, sin crear el proyecto SelfHosted. Ver la nota siguiente |
| Sin permiso | — | **No aplica.** Una sola identidad; tener sesión es tener todo el alcance |

**Nota sobre el rechazo por identificador duplicado.** `02-Especificacion-Funcional` declara como brecha B-02 que el intake no declara el código de respuesta concreto para ese caso, y como brecha B-03 que tampoco declara si el nombre visible exige unicidad. Este wireframe declara la representación —campo señalado, sin crear nada— y **no declara la unicidad del nombre visible**: la superficie no valida lo que ninguna fuente exige validar.

---

## 6. Versión responsive

La matriz de plataforma declara una única familia de navegador de escritorio y excluye navegadores móviles y pantallas pequeñas. Esta superficie **no tiene versión móvil especificada**.

Lo que rige por accesibilidad y por el patrón §8 del documento base:

- La grilla de tarjetas es fluida, con ajuste automático y ancho mínimo por tarjeta: reflúye de varias columnas a una sin punto de quiebre propio.
- Por debajo del punto de quiebre principal, alrededor de 768 píxeles, la barra lateral colapsa a navegación superior o a cajón.
- Reflujo conforme al criterio 1.4.10 a 320 píxeles de ancho, sin desplazamiento horizontal.
- La fila de acciones de la tarjeta no se comprime por debajo del objetivo de toque mínimo: si no entra, envuelve.

**Norma de diseño aplicada, no brecha.** El punto de quiebre principal alrededor de 768 px y el piso de 320 px sin desplazamiento horizontal los declara `Design-Rules-Web-Generico.md` §8, y esta superficie los aplica. Lo único delegado son los **anchos de verificación**: en cuáles comprueba la etapa `b` el comportamiento y lo registra en su informe de cierre, según `Compatibilidad-Plataformas.md` §4. La brecha `B-UX-15`, que declaraba ausente la norma, se retiró por falsa; ver [`Experiencia-De-Uso.md`](../Experiencia-De-Uso.md) §10.2.1.

---

## 7. Notas de implementación

**Accesibilidad.**

- Encabezado de primer nivel por vista; regiones de navegación y de contenido diferenciadas.
- El nombre accesible de la tarjeta incluye el estado agregado y el conteo, para que recorrer el listado por teclado no exija abrir cada uno.
- La acción de abrir es un control real además del área clicleable de la tarjeta, para que el destino sea alcanzable por teclado sin depender de la tarjeta entera.
- Las acciones del menú por tarjeta llevan etiqueta accesible; la de eliminar nombra el efecto completo.
- El estado vacío no depende de la ilustración: el texto orientativo porta la información.
- La banda de confirmación entrante lleva rol de estado y no roba el foco.

**Performance percibida.** Esqueleto de tarjetas por encima de aproximadamente 400 ms. El estado agregado se deriva de los despliegues y no exige consultar el motor de contenedores en la carga del listado.

**Internacionalización.** El identificador legible y el nombre visible son texto que el administrador escribe y se muestran literales. Las cifras de consumo llevan su unidad explícita y usan cifras tabulares.

---

## 8. Trazabilidad

| Dimensión | Referencia |
| --- | --- |
| Persona objetivo | Administrador único de la solución: [`Vision-Producto.md`](../../00-Contexto/Vision-Producto.md) §2.1 |
| CU origen | [CU-01](../../02-Especificacion-Funcional/Casos-De-Uso/CU-01-Alta-De-Proyecto.md), [CU-02](../../02-Especificacion-Funcional/Casos-De-Uso/CU-02-Listado-Renombrado-Y-Eliminacion-De-Proyectos.md), [CU-11](../../02-Especificacion-Funcional/Casos-De-Uso/CU-11-Importacion-Como-Proyecto-Nuevo.md) como punto de entrada |
| Reglas de negocio relevantes | RN-10, RN-17, RN-20, RN-31, RN-33, RN-35 |
| Insumo del intake | §4 capacidad F-02; §17.P.11 decisiones DA-03 y DA-04; anexos E-1 y E-18 |
| Marco de experiencia aplicado | [`Experiencia-De-Uso.md`](../Experiencia-De-Uso.md) §2.4 contrato del predicado, §3.3 flujo FL-03, §4.1 mapa de estados |
| Representaciones que invoca | [`Representacion-Lenguaje-Visual-De-Estados.md`](../Representaciones/Representacion-Lenguaje-Visual-De-Estados.md), [`Representacion-Banda-De-Resultado.md`](../Representaciones/Representacion-Banda-De-Resultado.md) |
| Catálogo de diseño aplicado | `Design-Rules-Web-Generico.md` §3.1, §3.2, §4.1, §4.2, §4.3, §4.9, §4.10, §5, §8; `Design-Rules-Primer-Arranque.md` §4.6 orientación posterior; `Design-Rules-Acceso-Monousuario.md` §3 shell de trabajo y §4.3 |
| US a generar en 06 | US-CU-01-1 a US-CU-01-3 y US-CU-02-1 a US-CU-02-3, provisionales |
| Tests previstos en 08 | Snapshot de los doce estados declarados; verificación de que renombrar un proyecto SelfHosted no produce ningún cambio pendiente; test de accesibilidad sobre el nombre accesible de la tarjeta |
| Brechas que declara | `B-UX-14`, forma de la confirmación de eliminación. Recoge además B-02 y B-03 de `02-Especificacion-Funcional` |
| Maqueta de la Fase B2 | Nombre canónico `Listado de proyectos`. Doce estados declarados en §5, de los cuales once son demostrables: las filas marcadas no aplicable no se maquetan. Incluye los dos estados vacíos distintos |
| Fuente de la correspondencia | La fila «CU origen» reproduce la fila de esta superficie en [`Experiencia-De-Uso.md`](../Experiencia-De-Uso.md) §9.2, que es la **fuente única** de la correspondencia entre superficie y caso de uso. Se reproduce, y no se referencia, porque `Rules-UX-UI-DX.md` §4.2.1 punto 8 la exige como sección obligatoria del wireframe |

---

## 9. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 1.0 | 2026-07-29 | Versión inicial. Especifica la portada del shell de trabajo con su grilla de tarjetas, su encabezado con acción primaria única y su barra de filtros; especifica el estado vacío del primer uso como sede de la orientación posterior que exige `Design-Rules-Primer-Arranque.md` §4.6, con las tres tarjetas derivadas y su derivación declarada como supuesto `S-UX-01`; declara doce estados, con dos estados vacíos distintos; declara la confirmación de eliminación de un proyecto SelfHosted sin inventar su forma, por la brecha `B-UX-14` |
| 1.0 | 2026-07-29 | Corrección del audit de la Fase B, absorbida dentro de la versión de emisión, sin subir versión y sin archivar, por la política de versionado de `Master-Prompt.md` §5: el documento está en estado `Propuesto` y la corrección proviene del audit de su propia fase. **H-06, P1:** Se suma a §8 la fila que declara la fuente única de la correspondencia entre superficie y caso de uso. **Brecha `B-UX-15` retirada por falsa:** §6 deja de declarar ausente el punto de quiebre y cita la norma que `Design-Rules-Web-Generico.md` §8 sí declara, acotando lo delegado a los anchos de verificación de la etapa `b`. Origen: informe [`Audit/B-02-03-r1.md`](../../Audit/B-02-03-r1.md) |
