> **Bloque de archivado.** Estado: `Superado`. Copia completa y autocontenida de la versión 1.0 de `Wireframes-Lienzo-Del-Proyecto.md`, tomada el 2026-07-29 antes de incorporar a la especificación las definiciones de alta y configuración de servicios y de ítems del catálogo que `SDD/Estado/Redefinicion-Servicio.md` v2.0 establece en su parte normativa (§16 a §23). La versión vigente es `../../Wireframes-Lienzo-Del-Proyecto.md`. El cuerpo de este snapshot no se modifica.

# Wireframes — Lienzo del proyecto

**Proyecto:** SelfHosted Service
**Documento:** Wireframes-Lienzo-Del-Proyecto.md
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
  - [3.1 El menú de las cuatro vías de alta](#31-el-menú-de-las-cuatro-vías-de-alta)
- [4. Interacciones](#4-interacciones)
- [5. Estados](#5-estados)
  - [5.1 Pendencia declarada `B-UX-01`, distinción visual de las aristas](#51-pendencia-declarada-b-ux-01-distinción-visual-de-las-aristas)
- [6. Versión responsive](#6-versión-responsive)
- [7. Notas de implementación](#7-notas-de-implementación)
- [8. Trazabilidad](#8-trazabilidad)
- [9. Control de cambios](#9-control-de-cambios)

---

## 1. Pantalla y propósito

**Nombre canónico de la superficie: `Lienzo del proyecto`** (`SUP-05`).

Es la pantalla principal del producto y la vista por defecto de un proyecto SelfHosted, «porque la arquitectura *es* el proyecto». Su tarea es que el administrador lea de un vistazo la arquitectura completa de un conjunto de servicios, la edite, y arranque o detenga el conjunto. Corresponde a la ruta `/proyectos/{id}` del mapa de navegación del anexo E-18, cuya disposición este wireframe transcribe.

Es además la superficie sobre la que se mide la puerta técnica PT-01, y la que concentra el riesgo RG-01 de la matriz de riesgos.

---

## 2. Layout

Disposición transcripta del anexo E-18, desprovista de los valores de ejemplo. Tres zonas: navegación del proyecto SelfHosted a la izquierda, lienzo al centro con el banner fijo arriba, y panel contextual a la derecha.

```text
+-----------------------------------------------------------------------------+
| [=] <titulo del panel>   [> Arrancar] [# Detener]  <identidad> [..] [Salir] |
+-------+-------------------------------------------------+-------------------+
|       | (!) <n> cambios pendientes [Ver detalle][Aplicar]|  Actividad        |
|  [#]  |-------------------------------------------------|  ---------------  |
| Lienzo|                                                  |  (i) <evento>     |
|       |     +--------------+        +--------------+     |      <hace ...>   |
|  [=]  |     | (i) <nombre> |------->| (i) <nombre> |     |  (i) <evento>     |
|  Logs |     | <imagen>     |        | <imagen>     |     |      <hace ...>   |
|       |     | [==  ] <mem> |        | [=   ] <mem> |     |                   |
|  [~]  |     +------+-------+        +--------------+     |  ---------------  |
| Metr. |            |                                     |  Proyecto         |
|       |            v                                     |  <N> servicios    |
|  [*]  |     +--------------+                             |  <n> activos      |
| Ajus. |     | (o) <nombre> |  <- nodo pendiente          |  red: <modo>      |
|       |     | <imagen>     |                             |  autoarranque:    |
|       |     +--------------+                             |    <si | no>      |
|       |                                                  |                   |
|       |  [+ Nuevo servicio]  [Ajustar]  [Minimapa]        |                   |
+-------+-------------------------------------------------+-------------------+
```

Cinco decisiones de esta pantalla, transcriptas del anexo E-18:

1. El lienzo es la vista por defecto del proyecto SelfHosted.
2. El banner de cambios pendientes va **fijo arriba**, con contador, acceso al detalle y acción de aplicar, para hacer visible el estado transaccional del borrador.
3. El panel derecho es **contextual**: actividad cuando no hay selección, configuración del servicio cuando hay un nodo seleccionado.
4. Arrancar y detener el proyecto SelfHosted completo están **siempre visibles en la barra superior**, por ser las dos operaciones más frecuentes.
5. Hay **un único botón primario por pantalla**: «Nuevo servicio».

La navegación de la izquierda es la del proyecto SelfHosted abierto y sus cuatro destinos son los que el anexo E-18 declara. La ley de Miller se respeta con holgura.

---

## 3. Componentes principales

| Componente | Propósito | Datos que muestra | Comportamiento |
| --- | --- | --- | --- |
| Acciones de arranque y parada | Las dos operaciones más frecuentes sobre el conjunto | — | Siempre visibles en la barra superior. El arranque valida los conflictos de dirección **antes** de tocar el motor de contenedores y puede derivar en la superficie de informe de conflicto |
| Banner de cambios pendientes | Hace visible el estado transaccional del borrador | Contador de cambios acumulados | Fijo arriba del lienzo. **Sólo aparece si hay cambios pendientes.** Ofrece ver el detalle y aplicar |
| Lienzo | Espacio visual donde se lee y se edita la arquitectura | Un nodo por servicio y una arista visual por par de servicios | Desplazamiento, acercamiento, arrastre de nodos, agrupación y trazado de aristas |
| Nodo de servicio | Unidad de lectura del lienzo | Ver [`Representacion-Nodo-De-Servicio.md`](../Representaciones/Representacion-Nodo-De-Servicio.md) | Seleccionable; abre el panel lateral del servicio |
| Arista | Representa que un servicio depende de otro | Una por par de servicios, agrupando debajo las referencias que la sostienen | Ver la pendencia `B-UX-01` en §5.1 |
| Grupo | Agrupación visual de nodos | Título del grupo | Cambio puramente visual: se guarda al instante |
| Panel contextual, modo actividad | Da el pulso del proyecto SelfHosted cuando no hay selección | Eventos recientes con su antigüedad relativa; resumen del proyecto con cantidad de servicios, activos, modo de red y marca de autoarranque | Es el estado por defecto del panel |
| Panel contextual, modo servicio | Configuración del servicio seleccionado | Ver [`Wireframes-Panel-Lateral-Del-Servicio.md`](Wireframes-Panel-Lateral-Del-Servicio.md) | Aparece al seleccionar un nodo |
| Acción primaria | Da de alta un servicio | Abre el menú de las **cuatro vías de alta** | Única acción primaria de la pantalla. Ver §3.1 |
| Controles de encuadre | Ajustar el encuadre y abrir el minimapa | — | Cambios puramente visuales |

### 3.1 El menú de las cuatro vías de alta

El anexo E-10 declara que las cuatro vías de alta conviven en el mismo menú, y el intake es explícito en que **el catálogo es una cuarta vía de alta y no un cuarto origen**: un ítem del catálogo es una plantilla parametrizada que, al instanciarse, resuelve a uno de los tres orígenes reales.

| Vía | Qué abre | Origen al que resuelve |
| --- | --- | --- |
| Imagen de registro | Formulario de alta con origen de imagen | Imagen de registro |
| Repositorio remoto | Formulario de alta con origen de repositorio, que exige además la ruta del archivo de construcción y la rama | Repositorio remoto |
| Archivo de construcción local | Formulario de alta con origen local, con su contexto de construcción y sus argumentos | Archivo de construcción local |
| Desde el catálogo | Selección de un ítem y su formulario de parámetros | Resuelve a uno de los tres anteriores al instanciarse |

Las cuatro se presentan al mismo nivel del menú. Presentar el catálogo dentro de una de las otras tres contradiría la decisión declarada.

---

## 4. Interacciones

| Acción | Disparador | Resultado esperado | Precondición |
| --- | --- | --- | --- |
| Abrir el proyecto SelfHosted | Navegación desde el listado | El sistema **verifica el estado real de cada contenedor contra el motor antes de pintar el lienzo**, y restituye la disposición guardada. La primera pintura no muestra un estado caducado | Existe el proyecto |
| Arrastrar un nodo | Puntero sobre el nodo | El nodo se mueve **sin retraso perceptible**. Durante el gesto **no se escribe nada**. Al soltar, se escribe la disposición **una sola vez**, con antirrebote de 400 ms. **No entra al conjunto de cambios pendientes ni marca redespliegue** | El lienzo está abierto |
| Agrupar o acercar | Gesto sobre el lienzo | Mismo tratamiento: escritura única al finalizar el gesto, sin entrada al conjunto de cambios | El lienzo está abierto |
| Recargar o reabrir | Navegación | El sistema restituye la disposición guardada **antes de pintar el lienzo** | Hay disposición guardada |
| Agregar un servicio | Acción primaria y elección de vía | Se declara el servicio y el cambio entra al conjunto de cambios pendientes. **El nodo aparece en el lienzo en estado pendiente de aplicar** | Existe el proyecto |
| Trazar una arista | Arrastre desde el puerto de salida de un nodo al puerto de entrada de otro | El sistema **escribe en el origen una referencia** a las variables provistas del destino: trazar la flecha es azúcar de interfaz sobre la referencia de variable. Si el destino declara **más de un puerto de contenedor, el sistema pregunta cuál** antes de escribir la expresión, y lo escribe literal. El sistema **propone el valor de la espera** al destino, y el administrador acepta o cambia la propuesta | Hay al menos dos servicios |
| Desmarcar la espera de una arista | Edición de la arista | Los dos servicios pasan a arrancar en cualquier orden. **La arista sigue dibujándose**, sigue marcando redespliegue y sigue exigiendo canal alcanzable si referencia el host | Existe la arista |
| Crear una arista sin variable | Acción de la arista | Se crea la arista con espera declarada y sin variable. **Entre dos servicios no puede haber más de una** | Hay al menos dos servicios |
| Seleccionar un nodo | Clic o foco de teclado sobre el nodo | El panel contextual pasa al modo servicio | Existe el nodo |
| Deseleccionar | Clic en el lienzo vacío o tecla de escape | El panel contextual vuelve al modo actividad | Había selección |
| Arrancar el proyecto SelfHosted | Acción de la barra superior | El sistema valida los conflictos de dirección sin acceder al motor, calcula el orden topológico sobre el subgrafo de las aristas que declaran espera, y despliega en ese orden. Ante conflicto, deriva a la superficie de informe | Hay servicios declarados |
| Detener el proyecto SelfHosted | Acción de la barra superior | Los contenedores se eliminan **conservando intactos la definición, las variables y los datos de los montajes**. Detener no borra nada | Hay despliegues activos |
| Ver el detalle de los cambios | Acción del banner | Se abre el cajón de cambios pendientes | Hay cambios pendientes |
| Aplicar los cambios | Acción del banner | Se abre el informe de impacto del cajón, **antes de ejecutar nada** | Hay cambios pendientes |
| Abrir las variables compartidas | Navegación del proyecto SelfHosted | Se abre la superficie de variables compartidas | Existe el proyecto |
| Abrir la revisión de higiene | Navegación del proyecto SelfHosted | Se abre la superficie de revisión de higiene. **El lienzo no exhibe los avisos**: navega a la superficie que los consolida. Ninguna condición de higiene bloquea ninguna operación del lienzo | Existe el proyecto |
| Desplazar un nodo por teclado | Nodo enfocado y teclas de dirección | El nodo se desplaza en incrementos discretos. Al soltar el foco o tras una pausa, se escribe la disposición con el mismo antirrebote. **Es alternativa obligatoria al arrastre y no depende de la técnica que decida la puerta técnica PT-01** | El nodo está enfocado |
| Trazar una arista por teclado | Nodo enfocado y acción de conexión | Se elige el destino de una lista de los servicios del proyecto SelfHosted, y el flujo continúa igual que con puntero | Hay al menos dos servicios |

---

## 5. Estados

| Estado | Condición que lo produce | Representación esperada |
| --- | --- | --- |
| Vacío | El proyecto SelfHosted no tiene ningún servicio declarado | Lienzo vacío con texto orientativo y la acción primaria destacada. Es el estado en el que aterriza un alta recién creada |
| Cargando | El proyecto SelfHosted se está trayendo y reconciliando | Esqueleto del lienzo, más barra de progreso fina en la parte superior del contenido. La reconciliación previa a la primera pintura ocurre en este estado |
| Con datos | Hay servicios declarados | Nodos y aristas con su par de estado |
| Sin cambios pendientes | El conjunto de cambios está vacío | **El banner no se muestra** |
| Con cambios pendientes | Hay al menos un cambio acumulado | Banner fijo con el contador, el acceso al detalle y la acción de aplicar. Los nodos y aristas alcanzados exhiben la variante «pendiente de aplicar» |
| Nodo pendiente de aplicar | El servicio existe en el conjunto de cambios y no se aplicó | Variante «pendiente de aplicar» del lenguaje visual de estados, que **prevalece** sobre el estado del despliegue |
| Nodo huérfano | El despliegue está registrado como activo y su contenedor desapareció del motor | Variante «huérfano», con la acción de redesplegar desde la configuración importada disponible en el panel lateral, y su advertencia de corte |
| Proyecto parcialmente activo | Al menos un servicio quedó fuera del arranque | El resumen del panel contextual lo declara con su etiqueta textual. **Es un estado legítimo**, sin tratamiento de error |
| Arranque bloqueado | Hay conflicto de dirección | Se abre la superficie de informe de conflicto. Ver [`Wireframes-Informe-De-Conflicto-De-Direcciones.md`](Wireframes-Informe-De-Conflicto-De-Direcciones.md) |
| Arista inválida | Una arista referencia el host del destino y no hay canal alcanzable | La arista queda **marcada inválida y bloquea el arranque** |
| Ciclo de arranque rechazado | El trazado produce un ciclo en el subgrafo de aristas con espera | Rechazo **señalando el ciclo**, sin crear la arista |
| Arista sin aporte rechazada | La arista no aporta ni referencia ni espera | Rechazo: una arista tiene que aportar una de las dos |
| Arista de espera duplicada | Ya existe una arista de espera sin variable entre ese par | Rechazo |
| Error | El proyecto SelfHosted no pudo traerse, o una operación falló | Banda de error con causa y acción de recuperación. Un fallo por nodo se lee en el par de estado de ese nodo, con su causa |
| Canal caído | Se perdió la conexión con el servidor | Aviso de reconexión estilizado acorde a la marca, no el aspecto por omisión. **Ningún despliegue en curso se cancela, se pausa ni se altera: lo único que se pierde es la vista** |
| Sin permiso | — | **No aplica.** Una sola identidad |

### 5.1 Pendencia declarada `B-UX-01`, distinción visual de las aristas

El anexo E-18 registra como pendiente la distinción visual entre las aristas que declaran espera al destino y las que no, y `02-Especificacion-Funcional` la transfiere a esta categoría como brecha B-07.

**No se resuelve acá.** Ninguna regla del catálogo de diseño cubre la representación de aristas de un lienzo, de modo que no hay derivación posible, y el anexo E-18 pide explícitamente que sus pendencias «se resuelvan y no se inventen». Lo que sí se declara son las tres restricciones que cualquier resolución tiene que cumplir, en [`Representacion-Nodo-De-Servicio.md`](../Representaciones/Representacion-Nodo-De-Servicio.md) §3.3.

Consecuencia para la maqueta de la Fase B2: la distinción **no es un estado demostrable** de esta superficie hasta que la brecha se cierre. Lo que sí se demuestra es la arista con variable, la arista sin variable y la arista marcada inválida, que son tres situaciones declaradas por las fuentes.

---

## 6. Versión responsive

La matriz de plataforma declara una única familia de navegador de escritorio y excluye navegadores móviles y pantallas pequeñas. Esta superficie **no tiene versión móvil especificada**, y es la que menos sentido tendría tenerla: el lienzo es una superficie de trabajo bidimensional sobre un parque de hasta treinta nodos.

- **El lienzo se acoge a la excepción explícita del criterio 1.4.10 de WCAG 2.2** para las partes del contenido que requieren disposición bidimensional para su uso o su significado. La excepción alcanza al lienzo y **no al resto de la superficie**: el banner, el panel contextual y la navegación reflúyen sin desplazamiento horizontal.
- Por debajo del punto de quiebre principal, el panel contextual se convierte en cajón superpuesto en lugar de comprimir el lienzo, y la barra lateral colapsa.
- El banner de cambios pendientes **nunca se oculta por falta de ancho**: es el componente que hace visible el estado transaccional y su desaparición es información falsa.

**Norma de diseño aplicada, no brecha.** El punto de quiebre principal alrededor de 768 px y el piso de 320 px sin desplazamiento horizontal los declara `Design-Rules-Web-Generico.md` §8, y esta superficie los aplica. Lo único delegado son los **anchos de verificación**: en cuáles comprueba la etapa `b` el comportamiento y lo registra en su informe de cierre, según `Compatibilidad-Plataformas.md` §4. La brecha `B-UX-15`, que declaraba ausente la norma, se retiró por falsa; ver [`Experiencia-De-Uso.md`](../Experiencia-De-Uso.md) §10.2.1.

---

## 7. Notas de implementación

**Accesibilidad.**

- **Operación completa por teclado del lienzo.** Recorrer los nodos, seleccionarlos, desplazarlos, trazar una arista y abrir el panel lateral tienen que ser posibles sin puntero, con el orden de recorrido correspondiendo al orden de lectura y sin trampas de foco. La alternativa por teclado **no depende de la mitigación de arrastre que la puerta técnica PT-01 decida**.
- Los puertos laterales del nodo son el objetivo más chico de la interfaz y cumplen el mínimo de 24 × 24 píxeles del criterio 2.5.8, ampliando el área activa sin ampliar el dibujo si hace falta.
- El nombre accesible de cada nodo incluye su estado.
- Un cambio de estado que ocurre sin acción del administrador se anuncia como región activa: el patrón de uso incluye dejar el panel abierto y volver a mirarlo.
- La insignia animada del estado «creando o construyendo» se detiene con preferencia de movimiento reducido, y el estado sigue siendo distinguible.
- El banner de cambios pendientes es una región identificada, no un adorno flotante.

**Performance percibida.** Los umbrales de la puerta técnica PT-01 condicionan esta superficie más que ninguna otra:

| Umbral | Consecuencia de diseño |
| --- | --- |
| Sin retraso perceptible en el arrastre, con 30 nodos y 40 aristas con insignia de estado y métricas por nodo | El movimiento del nodo no puede esperar una ida y vuelta al servidor por evento |
| 30 nodos actualizando su estado cada 2 s sin degradar el arrastre | La actualización de estado es un flujo independiente del gesto y no lo interrumpe |
| Cero escrituras durante el gesto; una única escritura al finalizar, con antirrebote de 400 ms | El guardado de la disposición **no muestra indicador de progreso por gesto**: sería feedback de algo que no está ocurriendo |
| Memoria por canal estable tras 15 minutos de uso continuo | El patrón de dejar abierto y volver es de uso previsto |

**La interfaz optimista no se aplica a ninguna operación de despliegue.** Un despliegue no es reversible y su resultado se determina por contenedor: la superficie muestra el estado real y nunca lo anticipa. Sí se aplica a los cambios visuales, que son reversibles y no tienen consecuencia sobre ningún contenedor.

**Internacionalización.** Los nombres de servicio, imágenes, etiquetas, direcciones y modos de red se muestran literales. Las magnitudes llevan unidad explícita y cifras tabulares. La antigüedad de los eventos de actividad se expresa en forma relativa.

---

## 8. Trazabilidad

| Dimensión | Referencia |
| --- | --- |
| Persona objetivo | Administrador único de la solución: [`Vision-Producto.md`](../../00-Contexto/Vision-Producto.md) §2.1 |
| CU origen | [CU-04](../../02-Especificacion-Funcional/Casos-De-Uso/CU-04-Composicion-Del-Lienzo.md) y [CU-05](../../02-Especificacion-Funcional/Casos-De-Uso/CU-05-Persistencia-Y-Recuperacion-De-La-Disposicion.md) como origen principal; [CU-03](../../02-Especificacion-Funcional/Casos-De-Uso/CU-03-Alta-Y-Configuracion-De-Servicio.md), [CU-13](../../02-Especificacion-Funcional/Casos-De-Uso/CU-13-Despliegue-Desde-Imagen-De-Registro.md), [CU-15](../../02-Especificacion-Funcional/Casos-De-Uso/CU-15-Despliegue-Construyendo-La-Imagen.md), [CU-16](../../02-Especificacion-Funcional/Casos-De-Uso/CU-16-Alta-Desde-Plantilla-Del-Catalogo.md), [CU-18](../../02-Especificacion-Funcional/Casos-De-Uso/CU-18-Arranque-Y-Parada-Con-Autoarranque.md), [CU-22](../../02-Especificacion-Funcional/Casos-De-Uso/CU-22-Acumulacion-De-Cambios-Pendientes.md), [CU-28](../../02-Especificacion-Funcional/Casos-De-Uso/CU-28-Reconciliacion-Con-El-Motor-De-Contenedores.md) |
| Reglas de negocio relevantes | RN-03, RN-04, RN-05, RN-09, RN-12, RN-14, RN-17, RN-20, RN-21, RN-31, RN-32, RN-33, RN-34, RN-35 |
| Insumo del intake | §4 capacidades F-04, F-06; §5 historias 3 y 4; §6 flujo 1; §17.P.10 regla de oro del lienzo; §17.P.11 decisiones DA-05 y de disposición; anexos E-1, E-4, E-10, E-17, E-18 |
| Marco de experiencia aplicado | [`Experiencia-De-Uso.md`](../Experiencia-De-Uso.md) §3.3 flujo FL-03, §3.5 flujo FL-05, §3.6 flujo FL-06, §4.2 lenguaje visual, §7 performance percibida |
| Representaciones que invoca | [`Representacion-Nodo-De-Servicio.md`](../Representaciones/Representacion-Nodo-De-Servicio.md), [`Representacion-Lenguaje-Visual-De-Estados.md`](../Representaciones/Representacion-Lenguaje-Visual-De-Estados.md) |
| Catálogo de diseño aplicado | `Design-Rules-Web-Generico.md` §3.1, §3.3, §4.1, §4.9, §5, §6, §7, §8; `Design-Rules-Acceso-Monousuario.md` §3 y §4.3; `Design-Rules-Config-Esquema.md` §6 frontera de propuesta; `Design-Rules-Blazor-Mudblazor.md` §2 y §5 |
| US a generar en 06 | US-CU-04-1 a US-CU-04-4 y US-CU-05-1 a US-CU-05-3, provisionales |
| Tests previstos en 08 | Snapshot de los dieciséis estados declarados; verificación de cero escrituras durante el gesto y exactamente una al finalizar; test de accesibilidad sobre la operación completa por teclado del lienzo; medición de la puerta técnica PT-01 sobre esta superficie |
| Brechas que declara | `B-UX-01`, distinción visual de las aristas (B-07 de `02-Especificacion-Funcional`); `B-UX-05`, token del estado pendiente |
| Maqueta de la Fase B2 | Nombre canónico `Lienzo del proyecto`. Dieciséis estados declarados en §5, de los cuales quince son demostrables: las filas marcadas no aplicable no se maquetan |
| Fuente de la correspondencia | La fila «CU origen» reproduce la fila de esta superficie en [`Experiencia-De-Uso.md`](../Experiencia-De-Uso.md) §9.2, que es la **fuente única** de la correspondencia entre superficie y caso de uso. Se reproduce, y no se referencia, porque `Rules-UX-UI-DX.md` §4.2.1 punto 8 la exige como sección obligatoria del wireframe |

---

## 9. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 1.0 | 2026-07-29 | Versión inicial. Transcribe la disposición de la pantalla del lienzo del anexo E-18 con sus cinco decisiones; especifica el menú de las cuatro vías de alta con el catálogo al mismo nivel que los tres orígenes; especifica la interacción de trazado de arista con la pregunta de puerto y la propuesta de espera, y su alternativa completa por teclado, independiente de la mitigación que decida la puerta técnica PT-01; declara dieciséis estados; declara la excepción de reflujo del criterio 1.4.10 acotada al lienzo y no al resto de la superficie; declara la pendencia `B-UX-01` sin resolverla y su consecuencia para la maqueta |
| 1.0 | 2026-07-29 | Corrección del audit de la Fase B, absorbida dentro de la versión de emisión, sin subir versión y sin archivar, por la política de versionado de `Master-Prompt.md` §5: el documento está en estado `Propuesto` y la corrección proviene del audit de su propia fase. **H-06, P1:** la fila de casos de uso de §8 pierde CU-36 y §3 pierde el componente de avisos de higiene, porque el lienzo **navega** a la superficie que los consolida y no los exhibe; §4 suma la interacción de apertura que lo declara. Se suma la fila que declara la fuente única de la correspondencia. **Brecha `B-UX-15` retirada por falsa:** §6 deja de declarar ausente el punto de quiebre y cita la norma que `Design-Rules-Web-Generico.md` §8 sí declara, acotando lo delegado a los anchos de verificación de la etapa `b`. Origen: informe [`Audit/B-02-03-r1.md`](../../Audit/B-02-03-r1.md) |
