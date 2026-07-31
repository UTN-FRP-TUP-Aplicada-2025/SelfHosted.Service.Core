# Wireframes — Cajón de cambios pendientes

**Proyecto:** SelfHosted Service
**Documento:** Wireframes-Cajon-De-Cambios-Pendientes.md
**Versión:** 1.1
**Estado:** Propuesto
**Fecha:** 2026-07-29
**Autor:** UX/UI Designer + Frontend Lead (AG-03)
**Variante:** UX/UI

---

## Tabla de contenido

- [1. Pantalla y propósito](#1-pantalla-y-propósito)
- [2. Layout](#2-layout)
- [3. Componentes principales](#3-componentes-principales)
  - [3.1 La frontera de propuesta, realizada](#31-la-frontera-de-propuesta-realizada)
  - [3.2 La advertencia de ventana de indisponibilidad](#32-la-advertencia-de-ventana-de-indisponibilidad)
  - [3.3 La ranura del asistente y su contradicción declarada](#33-la-ranura-del-asistente-y-su-contradicción-declarada)
  - [3.4 Las dos clases de cambio de configuración, distinguidas](#34-las-dos-clases-de-cambio-de-configuración-distinguidas)
  - [3.5 El servicio en borrador no aparece acá](#35-el-servicio-en-borrador-no-aparece-acá)
- [4. Interacciones](#4-interacciones)
- [5. Estados](#5-estados)
  - [5.1 Brecha `B-UX-18`, dependencia entre cambios](#51-brecha-b-ux-18-dependencia-entre-cambios)
- [6. Versión responsive](#6-versión-responsive)
- [7. Notas de implementación](#7-notas-de-implementación)
- [8. Trazabilidad](#8-trazabilidad)
- [9. Control de cambios](#9-control-de-cambios)

---

## 1. Pantalla y propósito

**Nombre canónico de la superficie: `Cajón de cambios pendientes`** (`SUP-07`).

Es donde se materializa la edición transaccional, que es el diferenciador DV-03 de la visión de producto. Su tarea es que el administrador revise los cambios acumulados con la consecuencia delante, descarte los que no van, y aplique el lote con un único redespliegue de lo afectado.

Corresponde al nodo «cajón de cambios pendientes» del mapa de navegación del anexo E-18 y se alcanza desde el banner fijo del lienzo. Es la superficie que realiza la **frontera de propuesta** de `Design-Rules-Config-Esquema.md` §6 en este producto.

---

## 2. Layout

Cajón superpuesto sobre el lienzo, anclado al costado, con flujo propio de dos vistas: la lista de cambios y el informe de impacto.

```text
Vista 1 — lista de cambios

+- Cambios pendientes (<n>) --------------------- X -+
|                                                    |
|  +----------------------------------------------+  |
|  | <clase>            <entidad>          [ x ]  |  |
|  | <resumen: clave: valor anterior -> nuevo>    |  |
|  | Redespliega: <servicio>, <servicio>          |  |
|  +----------------------------------------------+  |
|  +----------------------------------------------+  |
|  | <clase>            <entidad>          [ x ]  |  |
|  | <resumen>                                    |  |
|  | Referenciada por: <servicio> · <clave>       |  |
|  | Redespliega: <servicio>                      |  |
|  +----------------------------------------------+  |
|                                                    |
|  +- - - - - - - - - - - - - - - - - - - - - - -+   |
|  | Asistente de configuracion    [proximamente] |   |
|  +- - - - - - - - - - - - - - - - - - - - - - -+   |
|                                                    |
+----------------------------------------------------+
| [ Descartar todo ]        [ Revisar y aplicar ]    |
+----------------------------------------------------+


Vista 2 — informe de impacto, antes de ejecutar nada

+- Revisar y aplicar ---------------------------- X -+
|                                                    |
|  Se van a redesplegar                              |
|   · <servicio>                                     |
|   · <servicio>                                     |
|                                                    |
|  Quedan sin impacto                                |
|   · <servicio>                                     |
|                                                    |
|  Conflictos de direccion detectados                |
|   · <ninguno | detalle>                            |
|                                                    |
|  (!) <advertencia de ventana de indisponibilidad>  |
|                                                    |
|  Mensaje (opcional)                                |
|  [ campo                                        ]  |
|                                                    |
+----------------------------------------------------+
| [ Volver ]                    [ Aplicar cambios ]  |
+----------------------------------------------------+
```

La separación en dos vistas no es decorativa: **el informe se presenta antes de ejecutar nada**, y es lo que convierte la edición en transaccional y no en una sucesión de despliegues.

---

## 3. Componentes principales

| Componente | Propósito | Datos que muestra | Comportamiento |
| --- | --- | --- | --- |
| Cabecera del cajón | Nombra la superficie y da la cuenta | Cantidad de cambios acumulados | Cierra el cajón sin descartar nada |
| Fila de cambio | Es la unidad de revisión | Clase del cambio, entidad alcanzada, **resumen en palabras con el valor anterior y el posterior**, y los servicios que obliga a redesplegar | Descartable individualmente |
| Campo de referencias | Hace auditable la propagación de un valor compartido | Qué variable de qué servicio quedará obsoleta si el cambio se aplica | Sólo en los cambios cuya entidad es el proyecto SelfHosted. **No se deduce del grafo**: una referencia a una variable compartida no genera arista |
| Ranura del asistente | Hueco reservado para el futuro asistente de configuración | Título y distintivo de disponibilidad futura | Contenedor con borde discontinuo, **deshabilitado**, sin acción. Ver §3.3 |
| Acción de descarte total | Vuelve el proyecto SelfHosted a su configuración aplicada | — | Diferenciada como destructiva |
| Acción primaria de la vista 1 | Abre el informe de impacto | El verbo nombra la revisión, no la ejecución | Única acción primaria de la vista |
| Lista de servicios a redesplegar | Declara la consecuencia | Los servicios afectados | Se calcula antes de ejecutar |
| Lista de servicios sin impacto | Declara qué **no** se va a tocar | Los servicios no afectados | Es lo que hace auditable la otra mitad de la regla de redespliegue acotado |
| Lista de conflictos de dirección | Anticipa el bloqueo | Los conflictos detectados | Si hay conflictos, la aplicación deriva a la superficie de informe |
| Advertencia de indisponibilidad | Declara el costo antes de pagarlo | — | Ver §3.2 |
| Campo de mensaje | Deja constancia del motivo del lote | — | Opcional |
| Acción primaria de la vista 2 | Ejecuta el lote | El verbo nombra la aplicación | Se deshabilita durante la operación |

### 3.1 La frontera de propuesta, realizada

`Design-Rules-Config-Esquema.md` §6 exige cuatro cosas de toda propuesta de cambio. Tres se cumplen con lo que el intake ya declara, y la cuarta no tiene equivalente.

| Requisito de la frontera | Realización | Estado |
| --- | --- | --- |
| Toda propuesta se previsualiza: qué cambia y a qué afecta | Informe de impacto con sus tres listas | **Cumplido** |
| Toda propuesta se confirma explícitamente | Acción de aplicar, con mensaje opcional, como acto separado de cada edición | **Cumplido** |
| La interfaz nunca aplica directo | Guardar un cambio lo agrega al conjunto; el despliegue ocurre al aplicar el lote o al pulsar redesplegar | **Cumplido** |
| Existe un modo simulación como red de seguridad | **Sin equivalente declarado** | Contradicción `C-UX-02`, brecha `B-UX-08` |

La diferencia entre el informe de impacto y un modo simulación es real y no se disimula: el informe **calcula qué se va a redesplegar, no prueba qué va a pasar**. Este wireframe no especifica un indicador de modo simulación, porque especificarlo sería dibujar un modo que el sistema no tiene.

La explicación en lenguaje natural que §4.5 de esa extensión exige se realiza en el **resumen de cada cambio**, que el anexo E-5 declara ya redactado en palabras con la forma de servicio, clave, valor anterior y valor posterior. Se genera por plantilla a partir del cambio y de los descriptores, y no se escribe a mano por pantalla.

### 3.2 La advertencia de ventana de indisponibilidad

El intake es explícito: el reemplazo de una versión de un servicio es detener y arrancar, con ventana de indisponibilidad «que la interfaz debe advertir explícitamente al confirmar el redespliegue». Es consecuencia aceptada de que el producto no administre proxies inversos, y no un defecto a suavizar.

La advertencia vive **en la vista del informe, antes de la confirmación**, y no en un acuse posterior. Advertir después de aplicar es informar, no advertir.

### 3.3 La ranura del asistente y su contradicción declarada

`Rules-UX-UI-DX.md` §1.4 obliga a «reservar la ranura del asistente de IA (forward-compat) sin construirla» en todo proyecto que cargue la extensión de configuración por esquema, y `Design-Rules-Config-Esquema.md` §4.7 la especifica: contenedor con borde discontinuo, título y distintivo de disponibilidad futura, en estado deshabilitado, **sin ocupar un lugar central que compita con la configuración manual**.

Se ubica en esta superficie y no en el panel lateral del servicio porque es acá donde vive la frontera de propuesta: cuando se conecte, el asistente llenará una propuesta que pasará por la misma previsualización y la misma confirmación que una propuesta manual. Es la ubicación coherente con lo que la extensión declara.

**Contradicción declarada `C-UX-03`.** Ninguna fuente de esta solución declara asistencia de un modelo de lenguaje, y el alcance del intake no la enumera ni entre lo pospuesto. Se aplica la regla de la categoría por ser normativa y explícita, y se declara la tensión como brecha `B-UX-09`, con destinatario en el agente humano del proyecto, para que pueda retirarla si decide que no corresponde.

### 3.4 Las dos clases de cambio de configuración, distinguidas

El cajón declaraba que un cambio marca el servicio como pendiente de redespliegue, y **no distinguía cuáles además recrean el contenedor**. Es la distinción que importa, porque recrear es lo que hace perder el estado no persistido, y el cajón existe precisamente para poder revisar antes de provocar eso.

| Clase | Ejemplos | Cómo se distingue en el listado |
| --- | --- | --- |
| De configuración, **sin** recrear | Política de reinicio, límites de recursos, verificación de salud, réplicas | Marca de redespliegue, sin marca de recreación |
| De configuración, **recreando** | Variables, puertos, montajes, dispositivos, modo de red, dirección, comando de arranque | Marca de redespliegue **más marca de recreación**, con lo que implica dicho en el propio ítem del listado |
| De identidad | Nombre del servicio | Marca de redespliegue, con la aclaración de que **ninguna referencia se rompe** y que el alias de resolución de nombres cambia |
| Cosmético | Posición en el lienzo, notas | **No aparece.** Los cambios visuales no entran al conjunto de cambios pendientes |

**Dos criterios de composición que esta distinción impone:**

1. **La marca de recreación va en el ítem del cambio, no sólo en el resumen del lote.** Un resumen que dice «tres de cinco cambios recrean contenedores» no le dice al administrador **cuáles**, que es lo que necesita para decidir si descarta uno.
2. **El resumen del lote agrega el conteo**, para que la decisión de aplicar ahora o más tarde se pueda tomar sin abrir cada ítem.

**Por qué no se resuelve con la advertencia de ventana de indisponibilidad que §3.2 ya declara.** Esa advertencia es del lote y aparece al confirmar. Esto es **por cambio y aparece al revisar**, que es antes, y es lo que permite descartar el cambio individual en lugar de abandonar el lote entero.

### 3.5 El servicio en borrador no aparece acá

Un servicio en estado `borrador` **no entra al conjunto de cambios pendientes**, y el cajón no lo lista. Es lo que hace utilizable guardar a mitad de camino: sin esa exclusión, guardar un servicio incompleto metería algo inaplicable en el lote y **el lote entero dejaría de poder aplicarse**.

La consecuencia para esta superficie es una ausencia y conviene declararla para que no se lea como olvido: **no hay estado del cajón que represente un servicio incompleto**. Si el administrador busca ahí un servicio que dejó a medias, no lo va a encontrar, y el lugar donde lo encuentra es el lienzo (`SUP-05` §3.3).

---

## 4. Interacciones

| Acción | Disparador | Resultado esperado | Precondición |
| --- | --- | --- | --- |
| Abrir el cajón | Acción «Ver detalle» del banner del lienzo | Se abre la vista 1 con la lista de cambios | Hay cambios pendientes |
| Cerrar el cajón | Acción de cierre o tecla de escape | El cajón se cierra **sin descartar ni aplicar nada** | El cajón está abierto |
| Descartar un cambio | Acción de la fila | El cambio se retira del conjunto, **se restituye el estado anterior del elemento alcanzado** y el informe de impacto se recalcula sobre los que quedan. Los demás cambios no se alteran | Hay al menos un cambio |
| Descartar el último cambio | Acción de la fila sobre el único cambio | El conjunto queda vacío, el cajón se cierra y **el banner del lienzo desaparece** | Hay exactamente un cambio |
| Descartar todo | Acción diferenciada del pie | El conjunto pasa a descartado y el proyecto SelfHosted vuelve a su configuración aplicada. **Ningún servicio queda marcado para redespliegue** | Hay cambios |
| Revisar y aplicar | Acción primaria de la vista 1 | Se abre la vista 2 con el informe de impacto, **antes de ejecutar nada** | Hay cambios |
| Volver | Acción secundaria de la vista 2 | Retorno a la lista de cambios sin aplicar | Se está en la vista 2 |
| Aplicar los cambios | Acción primaria de la vista 2 | Se redespliegan **únicamente** los servicios que el informe declaró. El resultado se determina **por contenedor y no por operación** | Se leyó el informe |
| Cerrar el navegador durante la aplicación | Pérdida del canal | El despliegue **continúa del lado del servidor**. Al reabrir el proyecto SelfHosted, el estado real de cada contenedor se verifica contra el motor, y la operación se puede consultar para recuperar su resultado por contenedor | La aplicación está en curso |
| Descartar un cambio del que dependen otros | Acción de la fila | El sistema **declara la dependencia entre los cambios antes de descartar**. Ver la brecha `B-UX-18` de §5.1 | Existe la dependencia |
| Mover un nodo del lienzo con el cajón abierto | Gesto en el lienzo | El cambio visual se guarda al instante y **el contador no sube** | El cajón está abierto |

---

## 5. Estados

| Estado | Condición que lo produce | Representación esperada |
| --- | --- | --- |
| Vacío | El conjunto de cambios está vacío | **El cajón no se abre y el banner del lienzo no se muestra.** No hay estado vacío que dibujar: la superficie existe cuando hay cambios |
| Cargando | El informe de impacto se está calculando | Esqueleto de las tres listas |
| Con datos, lista de cambios | Hay cambios acumulados | Filas con clase, entidad, resumen en palabras, campo de referencias cuando corresponde, y servicios a redesplegar |
| Cambio de entidad proyecto SelfHosted | El cambio es sobre una variable compartida | La fila exhibe el campo de referencias, que enumera **qué variable de qué servicio quedará obsoleta** |
| Con datos, informe de impacto | Se abrió la vista 2 | Las tres listas, más la advertencia de indisponibilidad y el campo de mensaje |
| Informe sin servicios a redesplegar | El conjunto acumula sólo cambios que no obligan a redesplegar | La lista de servicios a redesplegar se declara vacía **explícitamente**, no se oculta |
| Informe con conflictos de dirección | La validación detectó conflictos | La lista de conflictos los declara. Al aplicar, se deriva a la superficie de informe de conflicto |
| Aplicando | El lote está en curso | Acción primaria deshabilitada con indicador de progreso. Previene el doble envío |
| Aplicado con éxito | Todos los contenedores alcanzados quedaron activos | Resultado **por contenedor**, con el conjunto marcado como aplicado y su momento |
| Aplicado parcialmente | Al menos un contenedor del lote falló | Resultado por contenedor: los que quedaron activos y los que fallaron **con su causa**, más los servicios **no alcanzados con su motivo**. **Es un estado legítimo del modelo, no un error de la operación** |
| Canal caído durante la aplicación | Se perdió la conexión | Aviso de reconexión. Al reconectar, el estado se recupera consultando la operación, **sin reconstruirlo y sin ofrecer un reintento que duplicaría el despliegue** |
| Rechazo de eliminación de variable referenciada | Se intentó acumular la eliminación de una variable compartida que otros referencian | Rechazo **con la lista de servicios y claves que la referencian**. El cambio **no entra al conjunto** |
| Error de referencia al aplicar | Una expresión no resuelve al crear el contenedor | Ese servicio se aborta con la causa identificada, **sin crear el contenedor y sin afectar a los demás** |
| Error de ámbito insuficiente | El lote se disparó con una credencial de máquina sin el ámbito requerido | Rechazo **indicando cuál ámbito falta** |
| Ranura del asistente deshabilitada | Siempre, en esta versión | Contenedor con borde discontinuo y distintivo de disponibilidad futura, con su estado **anunciado a tecnologías asistivas** y no sólo visual |
| Sin permiso | — | **No aplica** para el administrador. La única forma de que falte alcance es una credencial de máquina, y se resuelve como error de ámbito |

### 5.1 Brecha `B-UX-18`, dependencia entre cambios

`02-Especificacion-Funcional` declara como brecha B-11 que el intake no declara qué ocurre al descartar un cambio del que dependen otros cambios del mismo conjunto. En esta categoría la consecuencia es concreta: **no se puede especificar qué ve el administrador en ese momento**.

Lo que sí se declara: la dependencia se le declara **antes** de descartar, no después, porque descartar restituye el estado anterior del elemento alcanzado y eso puede dejar a otro cambio apuntando a algo que ya no existe. Lo que no se declara: si el descarte se bloquea, si arrastra a los dependientes, o si se ofrece elegir. Destinatario: agente humano del proyecto.

---

## 6. Versión responsive

La matriz de plataforma declara una única familia de navegador de escritorio y excluye navegadores móviles y pantallas pequeñas. Esta superficie **no tiene versión móvil especificada**.

- El cajón es superpuesto en todo ancho y por debajo del punto de quiebre principal ocupa el ancho completo.
- Las tres listas del informe reflúyen a una columna sin desplazamiento horizontal, conforme al criterio 1.4.10.
- El resumen en palabras de cada cambio envuelve en lugar de truncar: truncarlo perdería el valor anterior o el posterior, que es exactamente lo que la revisión necesita comparar.

**Norma de diseño aplicada, no brecha.** El punto de quiebre principal alrededor de 768 px y el piso de 320 px sin desplazamiento horizontal los declara `Design-Rules-Web-Generico.md` §8, y esta superficie los aplica. Lo único delegado son los **anchos de verificación**: en cuáles comprueba la etapa `b` el comportamiento y lo registra en su informe de cierre, según `Compatibilidad-Plataformas.md` §4. La brecha `B-UX-15`, que declaraba ausente la norma, se retiró por falsa; ver [`Experiencia-De-Uso.md`](../Experiencia-De-Uso.md) §10.2.1.

---

## 7. Notas de implementación

**Accesibilidad.**

- El cajón es un contenedor con nombre accesible que declara la cantidad de cambios, y su apertura mueve el foco a su encabezado.
- Cerrar con la tecla de escape sin descartar nada.
- Cada acción de descarte lleva etiqueta accesible que nombra **qué cambio** descarta, no sólo el verbo.
- La acción de descarte total es destructiva y se diferencia de la de descarte individual también por su etiqueta accesible.
- El resultado por contenedor se anuncia como región activa a medida que llega: es información que aparece sin acción del administrador.
- La ranura del asistente **expone su estado deshabilitado a tecnologías asistivas**, no sólo de forma visual.
- La advertencia de indisponibilidad se asocia a la acción primaria de la vista 2, para que se anuncie antes de confirmar.

**Performance percibida.** El cálculo del informe se resuelve sin acceder al motor de contenedores. La aplicación del lote es una operación larga: su progreso se informa por resultado por contenedor a medida que ocurre, y no como una barra única que no dice nada de qué falló.

**Internacionalización.** Los nombres de servicio y las claves de variable se muestran literales dentro del resumen en palabras. Los momentos de aplicación llevan formato de fecha y hora con desplazamiento horario explícito.

---

## 8. Trazabilidad

| Dimensión | Referencia |
| --- | --- |
| Persona objetivo | Administrador único de la solución: [`Vision-Producto.md`](../../00-Contexto/Vision-Producto.md) §2.1 |
| CU origen | [CU-22](../../02-Especificacion-Funcional/Casos-De-Uso/CU-22-Acumulacion-De-Cambios-Pendientes.md), [CU-23](../../02-Especificacion-Funcional/Casos-De-Uso/CU-23-Descarte-De-Un-Cambio-Individual.md), [CU-24](../../02-Especificacion-Funcional/Casos-De-Uso/CU-24-Aplicacion-En-Lote.md), [CU-25](../../02-Especificacion-Funcional/Casos-De-Uso/CU-25-Calculo-Del-Informe-De-Impacto.md) |
| Reglas de negocio relevantes | RN-03, RN-04, RN-09, RN-12, RN-13, RN-17, RN-20, RN-21, RN-22, RN-24, RN-27, RN-31, RN-33 |
| Insumo del intake | §4 capacidad F-07; §9 exclusión 2; §17.P.11 decisión DA-05; anexos E-5, E-13, E-18 |
| Marco de experiencia aplicado | [`Experiencia-De-Uso.md`](../Experiencia-De-Uso.md) §3.6 flujo FL-06, §4.3 frontera de propuesta, §10.1 contradicciones `C-UX-02` y `C-UX-03` |
| Representaciones que invoca | [`Representacion-Lenguaje-Visual-De-Estados.md`](../Representaciones/Representacion-Lenguaje-Visual-De-Estados.md), para el resultado por contenedor |
| Catálogo de diseño aplicado | `Design-Rules-Web-Generico.md` §4.9, §5; `Design-Rules-Config-Esquema.md` §4.5, §4.6, §4.7, §5, §6, §7, §8; `Design-Rules-Blazor-Mudblazor.md` §4.1 y §5 |
| US a generar en 06 | US-CU-22-1 a US-CU-22-3, US-CU-23-1 a US-CU-23-3, US-CU-24-1 a US-CU-24-4, US-CU-25-1 a US-CU-25-3, provisionales |
| Tests previstos en 08 | Snapshot de los dieciséis estados declarados; verificación de que un cambio visual no sube el contador; verificación de que el informe se presenta antes de ejecutar y de que ningún servicio fuera de él se toca; verificación del anuncio del estado de la ranura del asistente |
| Brechas que declara | `B-UX-08`, modo simulación sin equivalente; `B-UX-09`, ranura del asistente fuera del alcance declarado; `B-UX-18`, dependencia entre cambios (B-11 de `02-Especificacion-Funcional`) |
| Maqueta de la Fase B2 | Nombre canónico `Cajón de cambios pendientes`. Dieciséis estados declarados en §5, de los cuales quince son demostrables: las filas marcadas no aplicable no se maquetan. La superficie tiene dos vistas |
| Fuente de la correspondencia | La fila «CU origen» reproduce la fila de esta superficie en [`Experiencia-De-Uso.md`](../Experiencia-De-Uso.md) §9.2, que es la **fuente única** de la correspondencia entre superficie y caso de uso. Se reproduce, y no se referencia, porque `Rules-UX-UI-DX.md` §4.2.1 punto 8 la exige como sección obligatoria del wireframe |

---

## 9. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 1.1 | 2026-07-29 | **Se amplía para distinguir las dos clases de cambio de configuración.** §3.4 declara cuáles cambios **recrean el contenedor** y cuáles no, con los dos criterios de composición que la distinción impone —la marca va en el ítem del cambio y no sólo en el resumen del lote— y con el argumento de por qué la advertencia de ventana de indisponibilidad de §3.2 no la reemplaza: ésa es del lote y al confirmar, ésta es por cambio y al revisar. §3.5 declara que **un servicio en borrador no aparece en el cajón**, con el motivo —si apareciera, el lote entero dejaría de poder aplicarse— y con la remisión al lienzo, que es donde el administrador lo encuentra. La versión 1.0 queda archivada en `_legacy/2026-07-29/`. Origen: §22.5 del documento de trabajo `SDD/Estado/Redefinicion-Servicio.md` v2.0 |
| 1.0 | 2026-07-29 | Versión inicial. Especifica el cajón en dos vistas —lista de cambios e informe de impacto— con la separación que hace que el informe se presente antes de ejecutar nada; declara requisito por requisito qué parte de la frontera de propuesta de `Design-Rules-Config-Esquema.md` §6 se cumple y cuál no, con la contradicción `C-UX-02`; ubica la ranura del asistente en esta superficie con su justificación y declara la contradicción `C-UX-03` con el alcance del intake; declara dieciséis estados, incluidos los tres de resultado por contenedor y el de recuperación tras caída del canal; declara la brecha `B-UX-18` sobre la dependencia entre cambios |
| 1.0 | 2026-07-29 | Corrección del audit de la Fase B, absorbida dentro de la versión de emisión, sin subir versión y sin archivar, por la política de versionado de `Master-Prompt.md` §5: el documento está en estado `Propuesto` y la corrección proviene del audit de su propia fase. **H-06, P1:** Se suma a §8 la fila que declara la fuente única de la correspondencia entre superficie y caso de uso. **Brecha `B-UX-15` retirada por falsa:** §6 deja de declarar ausente el punto de quiebre y cita la norma que `Design-Rules-Web-Generico.md` §8 sí declara, acotando lo delegado a los anchos de verificación de la etapa `b`. Origen: informe [`Audit/B-02-03-r1.md`](../../Audit/B-02-03-r1.md) |
