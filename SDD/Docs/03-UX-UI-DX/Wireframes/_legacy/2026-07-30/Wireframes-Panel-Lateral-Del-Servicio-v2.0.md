> **Documento archivado.** Estado: **Superado**. Es la copia completa del estado previo de `Wireframes-Panel-Lateral-Del-Servicio.md`, versión **2.0**, archivada el 2026-07-30 por la política de deprecación de `Master-Prompt.md` §5.1, al propagarse la retroalimentación del paso 6 de la Fase B2: las decisiones `Q-15`, `Q-17` y `Q-27` del agente humano del proyecto del 2026-07-30, que cierran la brecha `B-UX-30`. La versión vigente es [`Wireframes-Panel-Lateral-Del-Servicio.md`](../../Wireframes-Panel-Lateral-Del-Servicio.md). **El cuerpo que sigue no se modificó.**
>

---

# Wireframes — Panel lateral del servicio

**Proyecto de código:** SelfHosted-Service
**Producto:** SelfHosted Service
**Documento:** Wireframes-Panel-Lateral-Del-Servicio.md
**Versión:** 2.0
**Estado:** Propuesto
**Fecha:** 2026-07-30
**Autor:** UX/UI Designer + Frontend Lead (AG-03)
**Variante:** UX/UI

---

## Tabla de contenido

- [1. Pantalla y propósito](#1-pantalla-y-propósito)
- [2. Layout](#2-layout)
- [3. Componentes principales](#3-componentes-principales)
  - [3.1 El contrato del descriptor y su brecha](#31-el-contrato-del-descriptor-y-su-brecha)
  - [3.2 «Guardar cambio» no despliega](#32-guardar-cambio-no-despliega)
  - [3.3 La ranura del asistente](#33-la-ranura-del-asistente)
  - [3.4 El origen en modo lectura, y la brecha que eso deja](#34-el-origen-en-modo-lectura-y-la-brecha-que-eso-deja)
  - [3.5 El digesto de la imagen en uso](#35-el-digesto-de-la-imagen-en-uso)
  - [3.6 La procedencia de plantilla, cuando existe](#36-la-procedencia-de-plantilla-cuando-existe)
  - [3.7 Qué cambio recrea el contenedor y qué cambio no](#37-qué-cambio-recrea-el-contenedor-y-qué-cambio-no)
- [4. Interacciones](#4-interacciones)
- [5. Estados](#5-estados)
- [6. Versión responsive](#6-versión-responsive)
- [7. Notas de implementación](#7-notas-de-implementación)
- [8. Trazabilidad](#8-trazabilidad)
- [9. Control de cambios](#9-control-de-cambios)

---

## 1. Pantalla y propósito

**Nombre canónico de la superficie: `Panel lateral del servicio`** (`SUP-06`).

Es la superficie de configuración más densa del producto: por ella pasan las ocho dimensiones que el parque real exige declarar en un servicio. Su tarea es que el administrador vea el estado del servicio seleccionado, opere sobre él y edite su configuración, con la garantía de que **guardar un cambio no lo despliega**.

Es el panel contextual derecho del lienzo en su modo servicio, y su disposición está transcripta del anexo E-18. Es además la superficie donde la extensión `Design-Rules-Config-Esquema.md` se aplica con más peso.

---

## 2. Layout

Disposición transcripta del anexo E-18, desprovista de los valores de ejemplo.

```text
+- <nombre del servicio> ---------------------- X -+
| (i) <estado> · desde hace <antiguedad>           |
| [ Reiniciar ] [ Redesplegar ] [ Parar ]          |
+--------------------------------------------------+
| General | Variables | Red | Recursos             |
| Montajes | Despliegues | Logs                     |
+--------------------------------------------------+
|                                                  |
|  Origen         > <tipo de origen>               |
|  Imagen           <imagen>                       |
|  Etiqueta         <etiqueta>   [politica v]      |
|  Reinicio         [politica v]                   |
|  Autoarranque     [ x ]                          |
|  Replicas         [ - <N> + ]                    |
|  Efimero          [   ]                          |
|                                                  |
|  > Opciones avanzadas                            |
|                                                  |
+--------------------------------------------------+
|              [ Cancelar ]  [ Guardar cambio ]    |
+--------------------------------------------------+
```

Siete pestañas, que son exactamente las que el anexo E-18 declara. **Está en el límite superior de la ley de Miller** —cinco a siete ítems de primer nivel por agrupación antes de subdividir—, no por encima: se conserva la agrupación de E-18 y se declara que agregar una octava pestaña obliga a subdividir.

El pie del panel sigue el patrón §4.4 del documento base: par de acciones a la derecha, secundaria y primaria.

---

## 3. Componentes principales

| Componente | Propósito | Datos que muestra | Comportamiento |
| --- | --- | --- | --- |
| Cabecera del panel | Identifica el servicio y su situación | Nombre del servicio, par de estado con antigüedad | Ver [`Representacion-Lenguaje-Visual-De-Estados.md`](../Representaciones/Representacion-Lenguaje-Visual-De-Estados.md), presentación con antigüedad |
| Acciones de ejecución | Operan sobre el despliegue, no sobre la configuración | — | **Reiniciar** reinicia el contenedor sin reconstruir la imagen ni alterar los montajes. **Redesplegar** reemplaza el despliegue y por lo tanto implica ventana de indisponibilidad, que se advierte al confirmar. **Parar** elimina el contenedor conservando definición, variables y datos de los montajes |
| Pestañas | Agrupan las dimensiones de configuración | Las siete de E-18 | Operables por teclado; declaran cuál está activa |
| Campo dirigido por descriptor | Recoge un parámetro configurable | Etiqueta, control según el tipo, y bajo el control el hint con el valor por defecto y los límites | Ver §3.1. **Ningún default, límite, leyenda ni ejemplo se escribe en la pantalla** |
| Ayuda contextual | Explica qué hace el parámetro, en palabras del administrador | Leyenda y ejemplos de valor con su consecuencia, tomados del descriptor | Se abre desde el ícono de información contiguo a la etiqueta; se cierra con la misma tecla o al perder el foco |
| Divulgación progresiva | Acota las opciones simultáneas | Las dimensiones avanzadas | Expansor «Opciones avanzadas», **colapsado por defecto**. La pertenencia a común o avanzado es propiedad del descriptor, no una decisión visual por pantalla |
| Acción secundaria | Descarta la edición en curso | — | Deja el servicio como estaba, sin tocar el conjunto de cambios |
| Acción primaria | Agrega el cambio al conjunto pendiente | El verbo nombra la acción exacta | Ver §3.2. **No despliega** |
| Línea de tiempo del despliegue | Da la secuencia de eventos de un intento concreto | Cada evento con su momento y su detalle; el evento de construcción con su duración; el evento de fallo con su **causa identificable** | En la pestaña de despliegues. Un despliegue por réplica, cada uno con su propia línea de tiempo |

### 3.1 El contrato del descriptor y su brecha

`Design-Rules-Config-Esquema.md` §2 declara que cada parámetro configurable se describe con un descriptor único que es su fuente de verdad: la etiqueta, la leyenda, el tipo, la unidad, el valor por defecto, los límites o el conjunto de valores admitidos, los ejemplos de valor con su consecuencia, y la condición de visibilidad. La pantalla **los lee, no los inventa**, y si el valor por defecto de un parámetro cambia, cambia en el descriptor y la pantalla lo refleja sin edición.

Este wireframe aplica el contrato y declara los campos que las fuentes sí declaran. Ninguna fuente declara **leyenda ni ejemplos de ningún parámetro**, y para la mayoría tampoco los límites:

| Parámetro | Tipo | Valor por defecto declarado | Valores admitidos o límites declarados | Leyenda y ejemplos |
| --- | --- | --- | --- | --- |
| Tipo de origen | Selección | — | Los tres orígenes del anexo E-2 | **Sin declarar** |
| Etiqueta de la imagen y política de actualización | Texto y selección | — | — | **Sin declarar** |
| Política de reinicio | Selección | — | El conjunto cerrado que el glosario del intake §12 declara | **Sin declarar** |
| Autoarranque | Booleano | — | — | **Sin declarar** |
| Réplicas | Numérico | — | Con dirección fija, exige **una dirección por réplica** | **Sin declarar** |
| Marca de efímero | Booleano | — | — | **Sin declarar** |
| Límite de memoria y de procesador | Numérico con unidad | — | Acotados a **los recursos declarados del host**; el rechazo informa el máximo admisible | **Sin declarar** |
| Modo de red del servicio | Selección | El modo de red virtual del motor, por decisión pre-tomada DA-03 a nivel de proyecto SelfHosted | Los dos modos que el intake declara | **Sin declarar** |
| Dirección fija | Texto | — | Debe pertenecer al rango gestionado y no estar excluida; el rechazo **sugiere la siguiente libre** | **Sin declarar** |

Es la brecha `B-UX-04`, con destinatario en el agente humano del proyecto y en `05-Arquitectura-Tecnica`. **El wireframe declara las ranuras y su regla de derivación, y no compone los textos que faltan.**

**Presets.** `Design-Rules-Config-Esquema.md` §4.4 admite presets cuando aplican, y exige que sus valores se compongan a partir de los ejemplos y los valores por defecto de los descriptores, nunca de literales escritos en la pantalla. Ninguna fuente de este producto declara presets de configuración de servicio, y sin ejemplos declarados en los descriptores no hay de dónde componerlos. **No se especifican presets en esta superficie**, y la ausencia se declara para que no se lea como omisión.

### 3.2 «Guardar cambio» no despliega

Es la advertencia más enfática del anexo E-18 y la única que declara como criterio de verificación de la etapa `b`: «"Guardar cambio" **no despliega**: agrega la modificación al changeset del proyecto. El despliegue ocurre al aplicar el changeset o al pulsar explícitamente "Redesplegar". Esta distinción debe quedar clara en las etiquetas de los botones, porque es la fuente más probable de confusión del modelo».

Tres consecuencias de diseño que este wireframe hace cumplir:

1. **Verbos distintos y no intercambiables** entre la acción primaria del pie —que agrega al conjunto pendiente— y la acción de ejecución de la cabecera —que despliega—. Las dos viven en zonas visualmente separadas del panel.
2. **Acuse explícito de que el cambio quedó pendiente y no aplicado.** Al guardar, el contador del banner del lienzo sube y el nodo pasa a la variante «pendiente de aplicar». El acuse no dice que algo se desplegó.
3. **La acción de redesplegar advierte la ventana de indisponibilidad al confirmar**, con esas palabras. El reemplazo de versión es detener y arrancar, porque el producto no administra proxies inversos.

### 3.3 La ranura del asistente

`Rules-UX-UI-DX.md` §1.4 obliga a reservar la ranura del asistente sin construirla. Esta superficie **no la aloja**: la ranura vive en el cajón de cambios pendientes, que es donde se materializa la frontera de propuesta de este producto. Ver [`Wireframes-Cajon-De-Cambios-Pendientes.md`](Wireframes-Cajon-De-Cambios-Pendientes.md) §3.3 y la contradicción `C-UX-03`.

### 3.4 El origen en modo lectura, y la brecha que eso deja

El panel presenta el origen del servicio —su variante y sus campos— **en modo lectura**. No es una decisión de esta categoría: es la consecuencia de que la reentrada de la configuración de `CU-03` `FA-05` arranque después del origen y lo excluya.

**Qué muestra, por variante:**

| Variante de origen | Qué exhibe el panel |
| --- | --- |
| Imagen de registro público | Registro, imagen, etiqueta y política de actualización |
| Imagen de registro privado | Lo mismo con la dirección del registro, más **qué credencial de registro usa**, por su nombre y nunca su valor |
| Repositorio remoto | Dirección, rama, ruta del archivo de construcción y contexto |
| Archivo de construcción en línea | El contenido, en un bloque de sólo lectura, y su fecha de modificación |
| Sin origen | Lo declara con esas palabras, y ofrece la acción de resolverlo |

**Brecha declarada, `B-UX-25`.** El modo lectura **no puede presentarse como una elección de diseño**, porque no lo es: es que **no hay camino** para cambiar el origen de un servicio existente. Corregir una etiqueta mal escrita no se puede hacer desde ninguna superficie. Es la pendiente `Q-28` del intake §19, abierta. Mientras lo esté, el panel **declara que el origen no es editable** en lugar de mostrar un control deshabilitado sin explicación, que dejaría al administrador buscando cómo habilitarlo. Destinatario: agente humano del proyecto.

### 3.5 El digesto de la imagen en uso

El panel muestra **qué imagen está corriendo exactamente**, por su digesto, y no sólo la etiqueta que el origen declara. Con política de actualización flotante son dos datos distintos: la etiqueta dice qué se pidió y el digesto dice qué se obtuvo.

**Cómo se presenta, con el criterio de no gritar un dato técnico:** la etiqueta es lo prominente, porque es lo que el administrador reconoce; el digesto es secundario, abreviado, con la forma completa disponible al pedirla. Lo que **no** se admite es que el digesto no esté: es el único dato que responde qué corre.

**Brecha declarada, `B-UX-26`.** Depende de la pendiente `Q-15`, si el despliegue registra el digesto. Está abierta, y **sin ella este componente no tiene qué mostrar**. Destinatario: agente humano del proyecto.

### 3.6 La procedencia de plantilla, cuando existe

Cuando el servicio se creó instanciando un ítem del catálogo, el panel responde **de dónde salió**: nombre del ítem y versión de contenido con la que se instanció.

**Tres cosas que este componente tiene que hacer y una que no puede hacer:**

| Qué | Por qué |
| --- | --- |
| Mostrar el nombre y la versión del ítem | Es para lo único que la procedencia sirve: responder de dónde salió una configuración |
| Seguir mostrándolo **aunque el ítem ya no exista** | Lo que se guarda es una copia y no una referencia. Un servicio huérfano de plantilla no es un servicio huérfano |
| Presentarlo como **dato histórico y no como vínculo vivo** | El vínculo es débil y sólo en calidad de origen |
| **No** avisar que hay una versión más nueva del ítem | Un aviso instalaría la expectativa de un botón para actualizar, que es precisamente lo que la decisión D-14 descarta. Informar de algo que no se puede hacer es peor que no informarlo |

### 3.7 Qué cambio recrea el contenedor y qué cambio no

Es el dato que el administrador necesita **antes** de aplicar, porque recrear el contenedor es lo que le hace perder el estado no persistido. El panel lo declara **por cambio, en el momento de hacerlo**, y el cajón de cambios pendientes lo repite en su listado.

| Clase de cambio | Ejemplos | Qué declara el panel |
| --- | --- | --- |
| Cosmético | Posición en el lienzo, notas | Nada: no es un cambio de configuración y no entra al cajón |
| De configuración, **sin** recrear | Política de reinicio, límites de recursos, verificación de salud, réplicas | Que el servicio queda pendiente de redespliegue |
| De configuración, **recreando** | Variables, puertos, montajes, dispositivos, modo de red, dirección, comando de arranque | Que además **el contenedor se recrea**, con lo que eso implica |
| De identidad | Nombre del servicio | Que el alias de resolución de nombres cambia, y que **ninguna referencia se rompe** |

**La distinción es del panel y del cajón, no sólo del cajón**, y conviene decir por qué: en el cajón el administrador ya decidió; en el panel todavía está decidiendo, y es ahí donde el dato cambia una decisión.

---

## 4. Interacciones

| Acción | Disparador | Resultado esperado | Precondición |
| --- | --- | --- | --- |
| Abrir el panel | Selección de un nodo en el lienzo | El panel contextual pasa al modo servicio, con la pestaña general activa | Existe el servicio |
| Cerrar el panel | Acción de cierre o tecla de escape | El panel vuelve al modo actividad | El panel está abierto |
| Recorrer las pestañas | Clic o teclas de dirección con el grupo de pestañas enfocado | Cambia el contenido sin recargar el panel | El panel está abierto |
| Abrir la ayuda contextual de un campo | Ícono de información contiguo a la etiqueta | Se despliega la tarjeta con la leyenda y los ejemplos del descriptor | El campo tiene descriptor |
| Expandir las opciones avanzadas | Acción del expansor | Se muestran las dimensiones avanzadas. El expansor declara su estado de apertura | El panel está abierto |
| Editar un campo | Foco y escritura | Validación inline contra los límites del descriptor. El mensaje de error **indica el rango admitido**, no sólo que el valor es inválido | El campo es editable |
| Elegir modo de red con dirección propia de la red local | Selección en la pestaña de red | **El campo de publicación de puertos se deshabilita**, no se ignora: en ese modo el contenedor tiene dirección propia y la publicación no aplica | La pestaña de red está activa |
| Declarar réplicas con dirección fija | Edición del campo de réplicas | El sistema **pide explícitamente una dirección por réplica** en lugar de fallar en el arranque | El servicio tiene dirección fija |
| Guardar el cambio | Acción primaria del pie | El cambio se agrega al conjunto pendiente, el contador del banner sube y el nodo pasa a «pendiente de aplicar». **No se despliega nada** | Hay una edición sin guardar |
| Cancelar la edición | Acción secundaria del pie | Se descarta la edición en curso sin tocar el conjunto pendiente | Hay una edición sin guardar |
| Reiniciar | Acción de la cabecera | El contenedor se reinicia **sin reconstruir la imagen ni alterar los montajes** | Hay despliegue activo |
| Redesplegar | Acción de la cabecera | Se advierte la ventana de indisponibilidad y, al confirmar, el despliegue anterior pasa a retirado y se crea uno nuevo | Hay servicio declarado |
| Redesplegar un servicio huérfano | Acción de la cabecera sobre un nodo huérfano | Se ofrece redesplegarlo desde la configuración importada, **con la advertencia de que ese primer redespliegue sí implica corte** | El servicio está huérfano |
| Parar | Acción de la cabecera | El contenedor se elimina **conservando la definición, las variables y los datos de los montajes** | Hay despliegue activo |
| Eliminar el servicio | Acción diferenciada de la pestaña general | Se pide confirmación **escribiendo el nombre del servicio** y se ofrece **conservar los volúmenes** | Existe el servicio |
| Ver los registros | Pestaña de registros, o su acción | Navegación a la superficie de registro del contenedor | Hay despliegue con contenedor |
| Escribir una referencia en una variable | Edición en la pestaña de variables | El valor se expresa como referencia en lugar de como literal, sola o interpolada dentro de un valor más largo. El sistema valida el ámbito y la existencia de lo apuntado **al validar y no sólo al desplegar** | La pestaña de variables está activa |

---

## 5. Estados

| Estado | Condición que lo produce | Representación esperada |
| --- | --- | --- |
| Cargando | El panel se está trayendo | Esqueleto de campos |
| Con datos | Hay un servicio seleccionado | Formulario dirigido por descriptor, con la pestaña general activa |
| Vacío | — | **No aplica.** El panel existe exactamente cuando hay un servicio seleccionado |
| Sin despliegue | El servicio nunca se desplegó, o su despliegue fue retirado | La cabecera exhibe el par de estado que corresponda **sin antigüedad**, y las acciones de reiniciar y parar quedan deshabilitadas por no tener sobre qué actuar |
| Campo válido | El valor está dentro de los límites del descriptor | Control normal, con el hint del valor por defecto y los límites |
| Campo en error | El valor viola los límites o el conjunto admitido | Borde de error, más mensaje inline que declara **qué límite se violó y el rango admitido** |
| Campo deshabilitado por incompatibilidad | Publicación de puertos con modo de red de dirección propia | Control **deshabilitado**, con el motivo disponible. No se oculta: el administrador tiene que entender por qué no puede |
| Ayuda desplegada | Se abrió la ayuda contextual de un campo | Tarjeta con estado semántico informativo, con leyenda y ejemplos del descriptor |
| Opciones avanzadas expandidas | Se abrió el expansor | Dimensiones avanzadas visibles; el expansor declara su estado |
| Con edición sin guardar | Hay cambios en el formulario | La acción primaria queda habilitada; la secundaria, disponible |
| Cambio guardado | Se guardó | Acuse de que el cambio **quedó pendiente y no aplicado**. El contador del banner sube |
| Requiere redespliegue | El servicio está marcado por un cambio propio o por un valor referenciado que cambió | Marca visible en la cabecera del panel y en el nodo |
| Enviando | Una acción de ejecución está en curso | Acción deshabilitada con indicador de progreso. Previene el doble envío |
| Error de dominio | Nombre duplicado o mal formado, dirección fuera de rango o excluida, límite por encima de los recursos del host, clave de variable duplicada o con prefijo reservado, origen de repositorio incompleto | Rechazo con **el campo señalado y la regla que lo produjo**. Para la dirección, la **siguiente libre sugerida**; para el límite, el **máximo admisible** |
| Error de referencia | La expresión apunta a algo inexistente, a un servicio de otro proyecto SelfHosted, o forma un ciclo de valor | Rechazo **señalando la expresión y la causa**; para el ciclo, **la cadena completa** |
| Despliegue fallido | El despliegue del servicio falló | Par de estado de fallo, con la **causa identificable** en el último evento de su línea de tiempo |
| Sin permiso | — | **No aplica.** Una sola identidad |

---

## 6. Versión responsive

La matriz de plataforma declara una única familia de navegador de escritorio y excluye navegadores móviles y pantallas pequeñas. Esta superficie **no tiene versión móvil especificada**.

- Por debajo del punto de quiebre principal, el panel se convierte en cajón superpuesto sobre el lienzo, con la misma composición interna.
- El grupo de siete pestañas envuelve a dos líneas antes que reducirse a un desplegable: un desplegable esconde la estructura y obliga a recordar en lugar de reconocer.
- Reflujo conforme al criterio 1.4.10 a 320 píxeles: la grilla de campos pasa a una columna.

**Norma de diseño aplicada, no brecha.** El punto de quiebre principal alrededor de 768 px y el piso de 320 px sin desplazamiento horizontal los declara `Design-Rules-Web-Generico.md` §8, y esta superficie los aplica. Lo único delegado son los **anchos de verificación**: en cuáles comprueba la etapa `b` el comportamiento y lo registra en su informe de cierre, según `Compatibilidad-Plataformas.md` §4. La brecha `B-UX-15`, que declaraba ausente la norma, se retiró por falsa; ver [`Experiencia-De-Uso.md`](../Experiencia-De-Uso.md) §10.2.1.

---

## 7. Notas de implementación

**Accesibilidad.**

- La ayuda contextual se asocia a su control, de modo que el lector de pantalla la anuncie con el campo.
- El ícono de información y el expansor de opciones avanzadas son operables por teclado y **declaran su estado de apertura**.
- El mensaje de error inline se asocia al campo y se anuncia, e indica el rango admitido.
- La etiqueta de cada campo es visible: **el marcador de posición nunca sustituye al rótulo**, porque se pierde al escribir.
- El campo deshabilitado por incompatibilidad expone su motivo, no sólo su estado.
- El grupo de pestañas declara cuál está activa y es operable por teclas de dirección.
- Las acciones de ejecución de la cabecera y la acción primaria del pie **no comparten verbo ni etiqueta accesible**: la distinción entre guardar y desplegar tiene que sostenerse también para quien no ve la separación visual.

**Performance percibida.** Cada acción de ejecución cruza el canal y se deshabilita durante la operación. La línea de tiempo del despliegue se actualiza por publicación desde el servidor y no por sondeo desde esta superficie.

**Internacionalización.** Las claves de variable, los nombres de imagen, las etiquetas, las rutas de montaje y las direcciones se muestran literales: son lo que el motor de contenedores interpreta. Las magnitudes llevan unidad explícita.

---

## 8. Trazabilidad

| Dimensión | Referencia |
| --- | --- |
| Persona objetivo | Administrador único del producto: [`Vision-Producto.md`](../../00-Contexto/Vision-Producto.md) §2.1 |
| CU origen | [CU-03](../../02-Especificacion-Funcional/Casos-De-Uso/CU-03-Alta-Y-Configuracion-De-Servicio.md) como origen principal; [CU-13](../../02-Especificacion-Funcional/Casos-De-Uso/CU-13-Despliegue-Desde-Imagen-De-Registro.md), [CU-15](../../02-Especificacion-Funcional/Casos-De-Uso/CU-15-Despliegue-Construyendo-La-Imagen.md), [CU-18](../../02-Especificacion-Funcional/Casos-De-Uso/CU-18-Arranque-Y-Parada-Con-Autoarranque.md), [CU-19](../../02-Especificacion-Funcional/Casos-De-Uso/CU-19-Rango-Gestionado-Y-Reserva-De-Direccion.md), [CU-35](../../02-Especificacion-Funcional/Casos-De-Uso/CU-35-Valor-Expresado-Como-Referencia.md) |
| Reglas de negocio relevantes | RN-01, RN-02, RN-06, RN-07, RN-08, RN-09, RN-10, RN-13, RN-17, RN-18, RN-19, RN-21, RN-22, RN-23, RN-24, RN-27, RN-28, RN-31, RN-32, RN-33 |
| Insumo del intake | §4 capacidades F-03, F-05, F-09, F-24; §17.P.12 restricciones de macvlan y de escalado; anexos E-2, E-3, E-4, E-17, E-18, E-19 |
| Marco de experiencia aplicado | [`Experiencia-De-Uso.md`](../Experiencia-De-Uso.md) §2.4 contrato del descriptor, §2.5 frontera aplicación y entorno, §3.3 flujo FL-03, §4.3 frontera de propuesta |
| Representaciones que invoca | [`Representacion-Lenguaje-Visual-De-Estados.md`](../Representaciones/Representacion-Lenguaje-Visual-De-Estados.md) |
| Catálogo de diseño aplicado | `Design-Rules-Web-Generico.md` §3.3, §4.4, §4.6, §4.7, §4.9, §5, §7; `Design-Rules-Config-Esquema.md` §1, §2, §2.1, §3, §4.1, §4.2, §4.3, §4.4, §5, §8; `Design-Rules-Blazor-Mudblazor.md` §4.1 |
| US a generar en 06 | US-CU-03-1 a US-CU-03-5, provisionales |
| Tests previstos en 08 | Snapshot de los diecisiete estados declarados; verificación de que guardar no despliega; verificación de que el campo de publicación de puertos queda deshabilitado en modo de dirección propia; test de accesibilidad sobre la ayuda contextual y el expansor |
| Brechas que declara | `B-UX-04`, descriptores sin leyenda ni ejemplos |
| Maqueta de la Fase B2 | Nombre canónico `Panel lateral del servicio`. Diecisiete estados declarados en §5, de los cuales quince son demostrables: las filas marcadas no aplicable no se maquetan |
| Fuente de la correspondencia | La fila «CU origen» reproduce la fila de esta superficie en [`Experiencia-De-Uso.md`](../Experiencia-De-Uso.md) §9.2, que es la **fuente única** de la correspondencia entre superficie y caso de uso. Se reproduce, y no se referencia, porque `Rules-UX-UI-DX.md` §4.2.1 punto 8 la exige como sección obligatoria del wireframe |

---

## 9. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 2.0 | 2026-07-30 | Migración normativa del conjunto 4.1 al 6.0, fase M4 corte 4, bajo `Rules-UX-UI-DX` 4.0, `Vocabulario-Rules` 2.1 y `Migracion-Rules` 1.0. Clasificación **regenerar contenido** por el salto major de la regla que lo gobierna; fuente de contenido: **el documento de origen** en su versión 1.1, archivado sin modificar en `_legacy/2026-07-30/Wireframes-Panel-Lateral-Del-Servicio-v1.1.md`. Sube **major** desde 1.1 porque la nomenclatura anterior deja de cumplir. **Cabecera:** se suma el campo `Proyecto de código` con el valor `SelfHosted-Service`, que §4.1 de la regla 4.0 exige como primer campo por ser ésta una categoría de nivel proyecto de código (`Vocabulario-Rules` §4 R3) y que el `PRODUCT-MANIFEST` §2 declara como `Nombre-Proyecto-Codigo`; la etiqueta `Proyecto` pasa a `Producto` sobre el mismo valor `SelfHosted Service`, porque `Vocabulario-Rules` §3 prohíbe la etiqueta de un plano de identidad sobre el valor de otro. Los dos campos conviven: el primero lo exige §4.1 y el segundo lo preserva `Migracion-Rules` §4.2. Los dos valores **difieren sólo por el guion** y no son intercambiables. **Sustitución léxica por ocurrencia** según `Vocabulario-Rules` §9.5 y el plan de migración §3.5, y nunca por reemplazo global de cadena: las **dos** ocurrencias de «solución» designaban el nivel superior y pasan a «producto» con su concordancia de género —«Administrador único de la solución» a «Administrador único **del** producto», y «Ninguna fuente de esta solución declara presets» a «de **este** producto» en §3.1—; no hay ninguna «solución de código», y la única ocurrencia de la cadena `soluci` restante —dentro de «resolución de nombres», en §3.7— quedó **intacta**. Las siete ocurrencias de «proyecto» se clasificaron una por una y **ninguna pasó a «proyecto de código»**: dos llevan la forma calificada «proyecto SelfHosted» —la decisión DA-03 del modo de red y el error de referencia a un servicio de otro proyecto—; tres son el emprendimiento —«agente humano del proyecto» como destinatario de `B-UX-04`, `B-UX-25` y `B-UX-26`—, que `Vocabulario-Rules` §4 R1 deja sin calificar; una nombra el changeset del proyecto dentro de la **cita literal del anexo E-18** de §3.2, que es transcripción de fuente y **no se reescribe**; y una era la etiqueta de cabecera. **El nombre canónico de la superficie `Panel lateral del servicio` y su identificador `SUP-06` se conservan textualmente**, porque `Deriva-Rules.md` exige que coincidan término por término con la línea de base visual. **El bloque ASCII de §2 no se tocó** y conserva su ancho. **Nada del contenido emitido por el fix de definiciones de servicio de la Fase B2 se alteró**: el origen en modo lectura de §3.4 con su brecha `B-UX-25`, el digesto de §3.5 con `B-UX-26`, la procedencia de plantilla de §3.6 y la clasificación de cambios de §3.7 quedan idénticos, y las filas 1.1 y 1.0 de este control de cambios no se reescribieron. **Se detectó y no se propagó una diferencia preexistente**: las cuatro subsecciones que el fix agregó —§3.4 a §3.7— no tienen fila correspondiente en la tabla de componentes de §3, que sigue con las nueve filas de la versión 1.0. Se declara como pendiente de confirmación humana y **no se corrige en esta migración**, por `Migracion-Rules` §4.2 regla 3. Origen: [`Plan-Migracion-4.1-a-6.0.md`](../../Audit/Plan-Migracion-4.1-a-6.0.md) §3.5 y §4 |
| 1.1 | 2026-07-29 | **Se amplía con las cuatro cosas que el panel no mostraba.** **§3.4** especifica el **origen en modo lectura** por variante, con la brecha `B-UX-25` y el criterio de **declarar que no es editable** en lugar de mostrar un control deshabilitado sin explicación. **§3.5** especifica el **digesto de la imagen en uso**, con el criterio de presentación —etiqueta prominente, digesto secundario y disponible— y la brecha `B-UX-26`, que depende de `Q-15`. **§3.6** especifica la **procedencia de plantilla**, con las tres cosas que tiene que hacer y la que no puede hacer: **no avisar que hay una versión más nueva**, porque instalaría la expectativa de un botón que la decisión D-14 descarta. **§3.7** especifica **qué cambio recrea el contenedor y qué cambio no**, con el argumento de por qué la distinción tiene que estar en el panel y no sólo en el cajón: en el panel el administrador todavía está decidiendo. La versión 1.0 queda archivada en `_legacy/2026-07-29/`. Origen: §22.5 del documento de trabajo `SDD/Estado/Redefinicion-Servicio.md` v2.0 |
| 1.0 | 2026-07-29 | Versión inicial. Transcribe la disposición del panel lateral del anexo E-18 con sus siete pestañas y declara que están en el límite de la ley de Miller; aplica el contrato del descriptor de `Design-Rules-Config-Esquema.md` §2 declarando parámetro por parámetro qué campo está declarado por las fuentes y cuál no, por la brecha `B-UX-04`; declara la ausencia de presets con su motivo; especifica las tres consecuencias de diseño de que guardar no despliegue, que es el criterio de verificación explícito del anexo E-18; declara diecisiete estados |
| 1.0 | 2026-07-29 | Corrección del audit de la Fase B, absorbida dentro de la versión de emisión, sin subir versión y sin archivar, por la política de versionado de `Master-Prompt.md` §5: el documento está en estado `Propuesto` y la corrección proviene del audit de su propia fase. **H-06, P1:** Se suma a §8 la fila que declara la fuente única de la correspondencia entre superficie y caso de uso. **Brecha `B-UX-15` retirada por falsa:** §6 deja de declarar ausente el punto de quiebre y cita la norma que `Design-Rules-Web-Generico.md` §8 sí declara, acotando lo delegado a los anchos de verificación de la etapa `b`. Origen: informe [`Audit/B-02-03-r1.md`](../../Audit/B-02-03-r1.md) |
