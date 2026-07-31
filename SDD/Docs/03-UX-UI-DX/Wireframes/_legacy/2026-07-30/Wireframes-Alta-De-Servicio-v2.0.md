> **Documento archivado.** Estado: **Superado**. Es la copia completa del estado previo de `Wireframes-Alta-De-Servicio.md`, versión **2.0**, archivada el 2026-07-30 por la política de deprecación de `Master-Prompt.md` §5.1, al incorporarse la retroalimentación del paso 6 de la Fase B2: las decisiones `Q-15`, `Q-17`, `Q-27` y la resolución de `PA-15` del agente humano del proyecto del 2026-07-30. La versión vigente es [`Wireframes-Alta-De-Servicio.md`](../../Wireframes-Alta-De-Servicio.md). **El cuerpo que sigue no se modificó.**
>

---

# Wireframes — Alta de servicio

**Proyecto de código:** SelfHosted-Service
**Producto:** SelfHosted Service
**Documento:** Wireframes-Alta-De-Servicio.md
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
  - [3.1 El menú de las siete vías, que es el primer paso y no un campo](#31-el-menú-de-las-siete-vías-que-es-el-primer-paso-y-no-un-campo)
  - [3.2 Las dos verificaciones son dos operaciones con dos informes](#32-las-dos-verificaciones-son-dos-operaciones-con-dos-informes)
  - [3.3 Dato incorrecto y consulta imposible se ven distinto](#33-dato-incorrecto-y-consulta-imposible-se-ven-distinto)
  - [3.4 Guardar en cualquier punto, y qué queda cuando se guarda](#34-guardar-en-cualquier-punto-y-qué-queda-cuando-se-guarda)
  - [3.5 El delta de cada vía en el paso del origen](#35-el-delta-de-cada-vía-en-el-paso-del-origen)
  - [3.6 El primer minuto de uso, que es la brecha más grande de esta superficie](#36-el-primer-minuto-de-uso-que-es-la-brecha-más-grande-de-esta-superficie)
- [4. Interacciones](#4-interacciones)
- [5. Estados](#5-estados)
- [6. Versión responsive](#6-versión-responsive)
- [7. Notas de implementación](#7-notas-de-implementación)
- [8. Trazabilidad](#8-trazabilidad)
- [9. Control de cambios](#9-control-de-cambios)

---

## 1. Pantalla y propósito

**Nombre canónico de la superficie: `Alta de servicio`** (`SUP-17`).

Su tarea es que el administrador **declare un servicio completo dentro de un proyecto SelfHosted**, empezando por elegir **por dónde llegar** y no por completar un campo técnico. Se abre desde el menú de alta del lienzo del proyecto (`SUP-05` §3.1) y desde el catálogo (`SUP-11`).

**Por qué esta superficie existe como wireframe propio desde esta versión, y qué corrige.** Hasta la versión 1.0 de la categoría, el alta de servicio **no tenía wireframe**: vivía repartida entre el lienzo (`SUP-05`) y el panel lateral del servicio (`SUP-06`), y en la maqueta de la Fase B2 existía como archivo `Alta-De-Servicio.html` documentado como un estado de `SUP-06`. El resultado fue el defecto que el paso 5 de la Fase B2 destapó: **había disparador y no había destino**, el origen era un campo de valores técnicos, y nadie había decidido qué le ofrece el producto al administrador cuando agrega un servicio. Se le da número propio, `SUP-17`, que continúa la numeración sin renumerar nada.

**Una precisión sobre el número.** El documento de trabajo que originó esta corrección nombra la superficie `Alta-De-Servicio · SUP-17`, y ese número **no existía en ninguna parte**: la categoría declaraba dieciséis superficies y la maqueta documenta su archivo de alta como parte de `SUP-06`. El número coincide porque `SUP-17` es el siguiente libre, no porque estuviera asignado.

> **Conflicto declarado con una decisión anterior del mismo día, y cómo se resolvió.** El punto abierto `PA-15` del informe de avance registra, con fecha 2026-07-29, la decisión de resolver el alta de servicio como **estado nuevo de `SUP-06`, descartando explícitamente crear superficie propia**. El documento de trabajo `Redefinicion-Servicio.md` v2.0, de la misma fecha y **posterior**, la nombra en su §21.1 y su §22.5 como superficie `SUP-17` y manda **rehacerla**, lo que sólo tiene sentido si es una superficie.
>
> **Se aplicó la parte normativa del documento de trabajo**, que es la fuente de esta ejecución, y por lo tanto se le da superficie propia. **Se declara el conflicto en lugar de resolverlo en silencio**, porque `PA-15` es una decisión del agente humano del proyecto y esta ejecución no tiene mandato para revertirla.
>
> **Qué cambia si el agente humano prefiere sostener `PA-15`:** el contenido de este wireframe **no cambia nada** —los seis bloques de §3, las once interacciones y los dieciocho estados son los mismos—; lo único que cambia es dónde vive. Pasa a ser una sección de `SUP-06` y este archivo se retira, con `SUP-17` y `SUP-18` renumerando a `SUP-17` la superficie de imágenes. Es una operación mecánica y no un rediseño.
>
> **El argumento a favor de la superficie propia, para que la decisión se tome sobre algo:** `SUP-06` existe **sólo con un servicio seleccionado**, por su propia regla estructural, y el alta ocurre cuando el servicio todavía no existe. Alojar el alta ahí obliga a que la superficie contradiga su regla de existencia, que es exactamente lo que `PA-15` registra que ya estaba pasando.


---

## 2. Layout

Superficie de flujo por pasos dentro del shell de trabajo, con panel de origen variable según la vía elegida y dos zonas de informe.

```text
Paso 1 · eleccion de via

+-----------------------------------------------------------------------+
| [=] <titulo del panel>      <identidad>  [Cambiar contrasena] [Salir] |
+---------+-------------------------------------------------------------+
| Lienzo  |  Agregar un servicio a <proyecto SelfHosted>            [X] |
| Logs    |  <subtitulo: elegi por donde empezar>                       |
| Metr.   |  ---------------------------------------------------------  |
| Ajustes |  +-----------------------+  +-----------------------+        |
|         |  | [icono]               |  | [icono]               |       |
|         |  | Adoptar un contenedor |  | Desde el catalogo     |       |
|         |  | <que resuelve>        |  | <que resuelve>        |       |
|         |  +-----------------------+  +-----------------------+        |
|         |  +-----------------------+  +-----------------------+        |
|         |  | Imagen de registro    |  | Imagen de registro    |       |
|         |  | publico               |  | privado               |       |
|         |  +-----------------------+  +-----------------------+        |
|         |  +-----------------------+  +-----------------------+        |
|         |  | Repositorio remoto    |  | Archivo de            |       |
|         |  |                       |  | construccion en linea |       |
|         |  +-----------------------+  +-----------------------+        |
|         |  +-----------------------+                                  |
|         |  | Servicio sin origen   |  <-- separado de los seis        |
|         |  +-----------------------+                                  |
+---------+-------------------------------------------------------------+


Pasos 2 a 8 · el tronco, con el paso de origen variable

+-----------------------------------------------------------------------+
| Agregar un servicio · <via elegida>                    [ Guardar ] [X]|
|  (o) Nombre  (o) Origen  (o) Red  (o) Puertos  (o) Dimensiones        |
|   ^ indicador de avance, con lo incompleto visible                    |
+-----------------------------------------------------------------------+
|  Nombre del servicio                                                  |
|  [ campo                                          ]                   |
|  <alias de resolucion de nombres: el mismo>                           |
|  ------------------------------------------------------------------   |
|  Origen · <delta de la via elegida, ver 3.5>                          |
|  [ campos propios de la variante                   ]                  |
|                                     [ Verificar el origen ]           |
|  +- Informe de verificacion del origen --------------------------+    |
|  | <resultado>  <momento>                                        |    |
|  | Alcance: <que se consulto y que no>                           |    |
|  | [ok] <comprobacion>  <detalle>                                |    |
|  | [no] <comprobacion>  <detalle>          <accion sugerida>     |    |
|  +---------------------------------------------------------------+    |
|  ------------------------------------------------------------------   |
|  Red / Puertos / Variables / Montajes / Recursos / Comando ...        |
+-----------------------------------------------------------------------+
|  +- Informe de validacion de la configuracion -------------------+    |
|  | <resultado>  Alcance: <contra que se verifico y contra que no> |    |
|  | [ok] <regla>                                                  |    |
|  | [!!] <regla>  <detalle>            <bloqueante>               |    |
|  +---------------------------------------------------------------+    |
|  [ Guardar como borrador ]        [ Validar ]  [ Dejar pendiente ]    |
+-----------------------------------------------------------------------+
```

**Dos decisiones de composición que el layout materializa.** El paso 1 es una **grilla de tarjetas de acceso** y no un desplegable: siete opciones que hay que comparar antes de elegir necesitan verse juntas, y un desplegable las esconde. Y los **dos informes ocupan zonas distintas**: el del origen contiguo al bloque de origen, el de la configuración al pie del formulario completo, porque son dos operaciones con alcances distintos y compartir zona sugeriría que son una.

---

## 3. Componentes principales

| Componente | Propósito | Datos que muestra | Comportamiento |
| --- | --- | --- | --- |
| Menú de vías de alta | Es el primer paso del flujo | Las siete vías, con qué resuelve cada una | Ver §3.1 |
| Indicador de avance | Hace visible qué falta | Los pasos del tronco, con lo incompleto marcado | No bloquea el avance ni el guardado: informa |
| Campo de nombre | Declara el nombre y el alias de resolución de nombres | El nombre, con la nota de que es también el alias | Valida formato y unicidad en el proyecto |
| Bloque de origen | Recoge lo propio de la vía elegida | Los campos que la variante exige, **y ninguno de otra variante** | Ver §3.5 |
| Acción de verificar el origen | Consulta el sistema externo | — | Ver §3.2 |
| Informe de verificación del origen | Declara qué se verificó y con qué resultado | Resultado, momento, **alcance**, y comprobación por comprobación | Ver §3.2 y §3.3 |
| Bloque de dimensiones | Recoge red, puertos, variables, montajes, dispositivos, capacidades, recursos, política de reinicio, verificación de salud, efímero y **comando de arranque** | Los valores declarados | Los puertos se gatean por el modo de red |
| Acción de validar la configuración | Verifica contra el registro del sistema y contra el motor de contenedores | — | Ver §3.2 |
| Informe de validación de la configuración | Declara qué reglas se verificaron y contra qué **no** se verificó | Resultado, alcance y regla por regla, con el nivel de cada hallazgo | Ver §3.2 |
| Acción de guardar como borrador | Persiste lo declarado sin exigir nada | — | Ver §3.4 |
| Acción de dejar pendiente de aplicar | Pasa el servicio al conjunto de cambios | — | Habilitada sólo con las dos verificaciones en verde |

### 3.1 El menú de las siete vías, que es el primer paso y no un campo

**El eje que el administrador elige primero es la vía, no el origen.** Son dos ejes independientes: la vía es cómo llega y **no se persiste**; el origen es qué queda declarado y sí se persiste, como variante discriminada de cinco valores.

| Vía | Qué dice la tarjeta que resuelve | Origen resultante |
| --- | --- | --- |
| Adoptar un contenedor existente | «Ya tengo el contenedor corriendo y quiero administrarlo desde acá» | El que la traducción deduzca |
| Desde el catálogo | «Ya resolví esto antes y lo guardé como plantilla» | El que declare la plantilla |
| Imagen de registro público | «Sé qué imagen quiero y está publicada» | Imagen de registro público |
| Imagen de registro privado | «La imagen está en mi registro y necesita credencial» | Imagen de registro privado |
| Repositorio remoto | «Tengo el código en un repositorio y quiero que el panel construya» | Repositorio remoto |
| Archivo de construcción en línea | «Quiero tomar una imagen publicada y ajustarla» | Archivo de construcción en línea |
| Servicio sin origen | «Quiero el nodo en el lienzo y resolver el origen después» | Sin origen |

**Cuatro criterios que este menú tiene que cumplir:**

1. **Cada tarjeta dice qué resuelve, no cómo se llama la vía.** «Imagen de registro privado» no le dice nada a quien no sabe qué es un registro de imágenes; «la imagen está en mi registro y necesita credencial» sí.
2. **La adopción va primero.** Es la que resuelve el primer uso sobre un servidor que ya está en producción, que es el caso declarado del administrador de este producto, y la que no exige saber ninguna dirección de imagen.
3. **El servicio sin origen va separado de los seis.** No es una vía con mecánica propia: es el alta detenida en el paso del nombre. Ponerlo en la grilla con las otras seis lo presentaría como una alternativa equivalente, y no lo es.
4. **Imagen pública y privada son dos tarjetas y no una con una casilla.** Difieren en dos campos —el registro pasa de selector a dirección, y aparece la credencial— y separarlas evita un formulario que cambia de forma según una casilla.

**Estado:** el reparto es la especificación de integración `DI-17` del intake §19, con `DI-18` y `DI-19`, **las tres sin revisar**. Se consumen declarándolas revisables.

### 3.2 Las dos verificaciones son dos operaciones con dos informes

Es la distinción central de esta superficie y la que la versión anterior del producto no tenía: **había una sola noción de «validar» y no alcanzaba**.

| | Verificación del origen | Validación de la configuración |
| --- | --- | --- |
| Contra qué verifica | Un **sistema externo**: un registro de imágenes, un proveedor de repositorios, o el propio contenido del archivo de construcción | El **registro del sistema** y el **motor de contenedores** |
| Qué responde | Si lo declarado **existe y es alcanzable**, y con qué identidad | Si la configuración **cumple las reglas** del modelo y no colisiona con lo que ya hay |
| Cuándo corre | En el paso del origen, a pedido | Al confirmar, y a pedido |
| Puede fallar por causas ajenas | **Sí**: la red, el registro caído, la credencial vencida | **No**: todo lo que consulta es local |
| Bloquea guardar | **No** | **No** |
| Bloquea dejar pendiente de aplicar | **Sí** | **Sí** |
| Dónde vive su informe | Contiguo al bloque de origen | Al pie del formulario |

**Los dos informes declaran su propio alcance, y no es decorativo.** Un tilde sin decir qué se consultó es una afirmación sin evidencia. El informe de la configuración, en particular, **declara contra qué no verificó**: conoce los puertos de lo que el producto administra y los de los contenedores del motor, y **no** los de un proceso del sistema operativo que no corre en un contenedor. Afirmar «el puerto está libre en el host» sería falso un segundo después de emitirse.

### 3.3 Dato incorrecto y consulta imposible se ven distinto

Es la distinción que el administrador necesita para saber **qué hacer**, y presentarlas igual es el defecto que hay que no cometer: la acción es opuesta.

| Clase de fallo | Qué pasó | Qué muestra el informe | Acción que ofrece |
| --- | --- | --- | --- |
| **Dato incorrecto** | El sistema externo respondió, y lo declarado no existe | Resultado **fallido**, con la comprobación que falló y, cuando el sistema externo lo permite, **valores similares al declarado** | **Corregir el dato**, con el foco en el campo que lo produjo |
| **Consulta imposible** | El sistema externo no respondió | Resultado **indeterminado** y no fallido, con qué no se pudo consultar | **Reintentar**. No hay ningún campo que corregir y el formulario no marca ninguno |

**Tres consecuencias de composición:** el resultado indeterminado **no usa el lenguaje visual de error**, porque nada está mal; la acción primaria del informe es distinta en cada caso y no un genérico «volver a intentar»; y en el caso indeterminado **ningún campo del formulario queda marcado**, porque marcar uno afirmaría que ese dato es el problema.

### 3.4 Guardar en cualquier punto, y qué queda cuando se guarda

**Se puede guardar en cualquier punto del flujo**, desde que se eligió la vía hasta antes de dejar pendiente. Lo que queda es un servicio en estado `borrador`.

| Propiedad del borrador | Qué implica para la superficie |
| --- | --- |
| Existe y es visible en el lienzo | El nodo aparece desde que se eligió la vía, no desde que se completó el alta |
| Está **incompleto de forma visible** | El indicador de avance conserva qué falta, y el nodo del lienzo lo señala |
| **No entra al conjunto de cambios pendientes** | El cajón no lo lista, y por lo tanto el lote sigue siendo aplicable |
| **No es aplicable** | La acción de dejar pendiente está deshabilitada hasta que las dos verificaciones estén en verde |
| Se puede retomar donde se dejó | Reabrir el alta desde el nodo del lienzo restituye el paso en el que estaba |

**La acción de guardar nunca está deshabilitada, y es deliberado.** Un formulario que no deja guardar hasta estar completo obliga al administrador a resolver todo de una sentada o a perder lo escrito. Esta superficie hace lo contrario: guardar siempre puede, y lo que las validaciones controlan es el paso siguiente.

**Y hay dos acciones de salida, no una.** «Guardar como borrador» y «dejar pendiente de aplicar» son cosas distintas y la superficie no las presenta como un único botón cuyo efecto depende del estado: son dos, y la segunda declara por qué está deshabilitada cuando lo está.

### 3.5 El delta de cada vía en el paso del origen

Sólo el bloque de origen cambia según la vía. Los demás pasos del tronco son idénticos para las siete.

| Vía | Qué pide el bloque de origen | Qué verifica su verificación |
| --- | --- | --- |
| Adoptar un contenedor existente | Nada acá: se llega con el candidato ya elegido y confirmado desde `SUP-10` | Que el candidato siga existiendo y no haya sido incorporado por otro proyecto entretanto |
| Desde el catálogo | Nada acá: se llega con el ítem elegido y sus parámetros completos desde `SUP-11` | Lo que la vía del origen que la plantilla declara verifique |
| Imagen de registro público | Registro como **selector**, imagen, etiqueta y política de actualización | Que la imagen y la etiqueta existan; devuelve el **digesto** |
| Imagen de registro privado | Registro como **dirección**, imagen, etiqueta, política, y **credencial de registro** elegida por su nombre | Lo mismo, **más que la credencial autentique** |
| Repositorio remoto | Proveedor, dirección, **rama**, ruta del archivo de construcción, contexto y argumentos de construcción | Repositorio y rama alcanzables, y **que la ruta exista en esa rama**; devuelve el último commit |
| Archivo de construcción en línea | **Editor de contenido** del archivo de construcción, y argumentos de construcción | Que el contenido sea interpretable y **no lleve instrucciones de copia local** |
| Servicio sin origen | Nada | No aplica: la acción de verificar no está |

**Dos criterios que este bloque tiene que cumplir:**

1. **Nunca muestra campos de otra variante, ni deshabilitados.** Un campo de rama deshabilitado en la vía de imagen invita a preguntarse cómo habilitarlo. La variante determina qué campos existen.
2. **El límite del archivo de construcción en línea se declara antes de escribir, no al fallar.** Sin contexto de construcción no se pueden copiar archivos locales: la vía sirve para tomar una imagen publicada y ajustarla, y **no** para construir código fuente propio. Decirlo después de que el administrador escribió veinte líneas es tarde.

### 3.6 El primer minuto de uso, que es la brecha más grande de esta superficie

**Brecha declarada, `B-UX-23`.** Un administrador que abre el alta por primera vez, en una instalación nueva, se encuentra con esto: el catálogo está vacío porque el producto no trae contenido de fábrica —decisión D-16—, y **si no sabe la dirección de la imagen que quiere, ninguna de las siete vías lo lleva a ningún lado**. El producto no declara si existe alguna forma de **explorar un registro de imágenes**.

Es la pendiente `Q-27` del intake §19, y su consecuencia para esta categoría es directa: **si la respuesta es que sí, es una superficie nueva; si es que no, es una línea de ayuda en el bloque de origen**. Las dos respuestas son legítimas y la diferencia de trabajo es grande, por lo que la superficie no la presume.

Lo que esta versión sí hace, que mitiga sin resolver: la vía de **adoptar un contenedor existente va primera** y no exige saber ninguna dirección, y el estado vacío del catálogo deriva a las otras seis vías (`SUP-11` §3.8). Destinatario: agente humano del proyecto.

---

## 4. Interacciones

| Acción | Disparador | Resultado esperado | Precondición |
| --- | --- | --- | --- |
| Abrir el alta | Acción de agregar servicio en el lienzo | Se presenta el menú de las siete vías, con qué resuelve cada una | Existe el proyecto SelfHosted |
| Elegir una vía | Acción de una tarjeta | Se abre el tronco con el bloque de origen propio de la vía, y **el servicio existe como borrador desde ese momento**, visible en el lienzo | Ninguna |
| Declarar el nombre | Campo | Se valida formato y unicidad en el proyecto. Se declara que el nombre es también el alias de resolución de nombres | Vía elegida |
| Verificar el origen | Acción contigua al bloque de origen | Se emite el informe con su alcance declarado y su resultado. **No bloquea guardar** | El origen declara lo que su variante exige |
| Corregir tras un fallo de dato | Acción del informe | El foco va al campo que produjo el fallo | El informe declaró dato incorrecto |
| Reintentar tras una consulta imposible | Acción del informe | Se repite la consulta. **Ningún campo queda marcado** | El informe declaró consulta imposible |
| Declarar las dimensiones | Campos, incluido el **comando de arranque** | Los puertos se gatean por el modo de red | Ninguna |
| Validar la configuración | Acción del pie | Se emite el informe regla por regla, con su alcance y con el nivel de cada hallazgo | Ninguna |
| Guardar como borrador | Acción **siempre habilitada** | El servicio queda en borrador, visible e incompleto en el lienzo, **fuera del conjunto de cambios pendientes** | Vía elegida |
| Dejar pendiente de aplicar | Acción primaria | El servicio pasa a pendiente de aplicar y entra al conjunto de cambios | **Las dos verificaciones en verde** |
| Retomar un borrador | Acción del nodo del lienzo | Se reabre el alta en el paso en el que se dejó | El servicio está en borrador |
| Abandonar sin guardar | Cierre o acción secundaria | Se pide confirmación si hay algo declarado. Nada se persiste | Ninguna |

---

## 5. Estados

| Estado | Condición que lo produce | Representación esperada |
| --- | --- | --- |
| Elección de vía | El alta se abrió | Grilla de siete tarjetas, con la adopción primera y el servicio sin origen separado |
| Tronco, origen sin resolver | Vía elegida, origen incompleto | Indicador de avance con el paso de origen marcado como pendiente. La acción de verificar deshabilitada con su motivo |
| Origen sin verificar | El origen está completo y no se verificó | Acción de verificar habilitada. La de dejar pendiente **deshabilitada, declarando que falta verificar** |
| Origen verificado | La verificación devolvió resultado verificado | Informe con su alcance y sus comprobaciones en verde. Para las variantes de imagen, **el digesto obtenido** |
| Origen fallido por dato incorrecto | El sistema externo respondió y lo declarado no existe | Informe **fallido**, con la comprobación que falló, valores similares cuando los haya, y acción de corregir con foco en el campo |
| Origen indeterminado por consulta imposible | El sistema externo no respondió | Informe **indeterminado**, sin lenguaje visual de error, con acción de reintentar y **sin ningún campo marcado** |
| Configuración sin validar | El formulario tiene datos y no se validó | Informe ausente, con la acción de validar disponible |
| Configuración validada | Todas las reglas en verde | Informe con su alcance, **incluido contra qué no verificó** |
| Configuración con hallazgos bloqueantes | Alguna regla falló con nivel bloqueante | Informe con el hallazgo señalado, su detalle y su regla. La acción de dejar pendiente deshabilitada |
| Colisión de puerto de host | El puerto declarado ya lo publica otro servicio o un contenedor del parque | Hallazgo **bloqueante** con el servicio y el proyecto que lo ocupan, y el próximo puerto libre sugerido |
| Rechazo por campo ajeno a la variante | Llega por API un origen con un campo de otra variante | Rechazo con mensaje **distinto** del de campo faltante. En la interfaz no es alcanzable, porque el campo no existe |
| Borrador guardado | Se guardó sin completar | Confirmación que declara que el servicio quedó **visible en el lienzo, incompleto y fuera del conjunto de cambios** |
| Pendiente de aplicar | Se dejó pendiente con las dos verificaciones en verde | Confirmación que declara que el cambio entró al conjunto de cambios pendientes |
| Puertos deshabilitados por modo de red | El servicio está en macvlan | El bloque de puertos publicados **no está disponible**, con el motivo declarado |
| Vía de adopción o de catálogo | La vía elegida no tiene origen propio | El bloque de origen muestra **lo que la vía dedujo o la plantilla declaró**, en lectura, y el tronco sigue desde la red |
| Servicio sin origen guardado | Se guardó tras declarar sólo el nombre | Borrador con el origen declarado como no resuelto, y la acción de resolverlo disponible |
| Error | El formulario no pudo cargarse o persistirse | Banda de error con causa y acción de recuperación |
| Sin permiso | — | **No aplica** para el administrador. La única forma de que falte alcance es una credencial de máquina |

---

## 6. Versión responsive

La matriz de plataforma declara una única familia de navegador de escritorio y excluye navegadores móviles y pantallas pequeñas. Esta superficie **no tiene versión móvil especificada**.

- La grilla de vías del paso 1 es fluida, con ajuste automático y ancho mínimo por tarjeta.
- El tronco reflúye a una columna, con los dos informes conservando su posición relativa: el del origen contiguo a su bloque, el de la configuración al pie.
- El editor de contenido del archivo de construcción conserva su ancho mínimo y desplaza horizontalmente dentro de sí, sin producir desplazamiento de la página.

**Norma de diseño aplicada, no brecha.** El punto de quiebre principal alrededor de 768 px y el piso de 320 px sin desplazamiento horizontal los declara `Design-Rules-Web-Generico.md` §8, y esta superficie los aplica. Lo único delegado son los anchos de verificación de la etapa `b`.

---

## 7. Notas de implementación

**Accesibilidad.**

- Cada tarjeta de vía tiene nombre accesible que incluye **qué resuelve**, no sólo el nombre de la vía.
- El indicador de avance se expone como lista de pasos con su estado, no como decoración.
- Los dos informes son **regiones de estado**, anunciadas al completarse. El informe indeterminado **no se anuncia como alerta**: nada está mal.
- Cada hallazgo del informe de configuración declara la regla que lo produjo en su texto accesible, para que sea buscable.
- El digesto se expone completo al texto accesible aunque se muestre abreviado.
- La acción de dejar pendiente, cuando está deshabilitada, **declara por qué** en su descripción accesible.

**Performance percibida.** Las dos verificaciones consultan sistemas externos o el motor de contenedores y **pueden tardar**: se muestran como operación con progreso, con la acción deshabilitada mientras corre, y con un límite tras el cual el resultado pasa a indeterminado en lugar de quedar colgado.

**Internacionalización.** Nombres de imagen, etiquetas, digestos, ramas, rutas, contenido del archivo de construcción y argumentos de construcción se muestran **literales y no se traducen**. Los textos de las tarjetas de vía y de los informes sí se traducen.

---

## 8. Trazabilidad

| Dimensión | Referencia |
| --- | --- |
| Persona objetivo | Administrador único del producto: [`Vision-Producto.md`](../../00-Contexto/Vision-Producto.md) §2.1 |
| CU origen | [CU-03](../../02-Especificacion-Funcional/Casos-De-Uso/CU-03-Alta-Y-Configuracion-De-Servicio.md), [CU-13](../../02-Especificacion-Funcional/Casos-De-Uso/CU-13-Despliegue-Desde-Imagen-De-Registro.md), [CU-15](../../02-Especificacion-Funcional/Casos-De-Uso/CU-15-Despliegue-Construyendo-La-Imagen.md), [CU-16](../../02-Especificacion-Funcional/Casos-De-Uso/CU-16-Alta-Desde-Plantilla-Del-Catalogo.md) |
| Reglas de negocio relevantes | RN-01, RN-02, RN-06, RN-07, RN-08, RN-17, RN-19, RN-28, RN-32, RN-38. Regla conceptual RC-19 |
| Insumo del intake | §4 capacidad F-03 y la **nota de los dos ejes del alta**; anexo E-2 §20.2.1 a §20.2.5, con las cinco variantes, los campos nuevos y los dos informes de verificación; E-16 |
| Marco de experiencia aplicado | [`Experiencia-De-Uso.md`](../Experiencia-De-Uso.md) §3.3 flujo FL-03, §4.3 el modo pendiente y la frontera de propuesta, §8.1 taxonomía de errores |
| Representaciones que invoca | [`Representacion-Nodo-De-Servicio.md`](../Representaciones/Representacion-Nodo-De-Servicio.md) y [`Representacion-Lenguaje-Visual-De-Estados.md`](../Representaciones/Representacion-Lenguaje-Visual-De-Estados.md), para el nodo borrador que el alta crea desde el paso 1 |
| Catálogo de diseño aplicado | `Design-Rules-Web-Generico.md` §3.2, §4.2, §4.4, §4.6, §4.9, §4.10, §5, §8; `Design-Rules-Config-Esquema.md` §2, §4.1, §5; `Design-Rules-Blazor-Mudblazor.md` §4 |
| US a generar en 06 | US-CU-03-1 a US-CU-03-10, provisionales |
| Tests previstos en 08 | Snapshot de los dieciocho estados declarados; verificación de que el menú presenta siete vías y no un campo de origen; verificación de que guardar **nunca** está deshabilitado; verificación de que dejar pendiente lo está mientras falte una verificación; verificación de que el informe indeterminado **no** usa lenguaje visual de error y **no** marca ningún campo; verificación de que el bloque de origen no expone campos de otra variante |
| Brechas que declara | **`B-UX-23` nueva**, la exploración de un registro de imágenes (`Q-27`), que decide si hay una superficie nueva o una línea de ayuda. Recoge `B-UX-25` de `SUP-06`, el origen no editable (`Q-28`), y `B-UX-24` de `SUP-05`, la señal visual del nodo borrador |
| Maqueta de la Fase B2 | Nombre canónico `Alta de servicio`. La maqueta ya tiene un archivo con ese nombre, documentado como estado de `SUP-06`; **se rehace desde esta especificación** y pasa a ser la superficie `SUP-17`. Dieciocho estados declarados, diecisiete demostrables |
| Fuente de la correspondencia | La fila «CU origen» reproduce la fila de esta superficie en [`Experiencia-De-Uso.md`](../Experiencia-De-Uso.md) §9.2, que es la **fuente única** de la correspondencia entre superficie y caso de uso. Se reproduce, y no se referencia, porque `Rules-UX-UI-DX.md` §4.2.1 punto 8 la exige como sección obligatoria del wireframe |

---

## 9. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 2.0 | 2026-07-30 | **Migración normativa 4.1 → 6.0**, corte 4 de la fase M4, sobre el plan [`Plan-Migracion-4.1-a-6.0.md`](../../Audit/Plan-Migracion-4.1-a-6.0.md). Clasificación **regenerar contenido**, por el salto de `Rules-UX-UI-DX` 2.0 → 4.0. **Fuente de contenido: documento de origen**, más el [`PRODUCT-MANIFEST`](../../../Intake/PRODUCT-MANIFEST-SelfHosted-Service.md) §2 para el único campo de cabecera que se suma. Ninguna de las siete vías, ninguno de los dos informes, ninguna de las once interacciones ni ninguno de los dieciocho estados cambia de contenido: lo que cambia es la nomenclatura. Las nueve secciones obligatorias de `Rules-UX-UI-DX` 4.0 §4.2.1 ya estaban presentes y ninguna se agregó ni se reordenó. **Cabecera**: `**Proyecto:**` llevaba un valor del plano de negocio y pasa a `**Producto:**`, porque `Vocabulario-Rules.md` §3 prohíbe la etiqueta de un plano sobre el valor de otro; se suma `**Proyecto de código:** SelfHosted-Service`, que §4.1 de la regla vigente exige y que este documento no declaraba, con el valor **leído del manifiesto y no inferido**. **Vocabulario (`[5.0]`)**: «solución» pasa a «producto» en **2 ocurrencias** del referente de nivel superior —«el administrador de esta solución» en §3.1 y «Administrador único de la solución» en §8—, las dos con la concordancia de género corregida. Las **3 ocurrencias de «resolución»** —«alias de resolución de nombres» en §3, §4 y en el bloque ASCII de §2— **se contaron antes y después y siguen siendo 3**: no se tocaron, porque la cadena `soluci` vive dentro de la palabra y sustituirla produciría «reproducto». De las 11 ocurrencias de «proyecto», 1 era la etiqueta de cabecera y **10 no se tocaron**: 3 llevan la forma calificada «proyecto SelfHosted» (§1, §4 y el bloque ASCII del paso 1 de §2), 5 son «proyecto» a secas con referente de entidad del dominio y contexto ya fijado —«el lienzo del proyecto» en §1, «unicidad en el proyecto» en §3 y en §4, «incorporado por otro proyecto» en §3.5, «el servicio y el proyecto que lo ocupan» en §5— y 2 son «agente humano del proyecto», en §1 y en §3.6, que designa el emprendimiento. **Ninguna ocurrencia se promovió a «proyecto de código».** La sustitución se hizo por el procedimiento por ocurrencia de `Vocabulario-Rules.md` §9.5 y **nunca por reemplazo global de cadena**. Los dos bloques ASCII de §2 **conservan su ancho intacto**: la única palabra a migrar que contienen es «resolucion», que no se sustituye. Los nombres canónicos de superficie —`SUP-17` y `Alta de servicio`, y las referencias a `SUP-05`, `SUP-06`, `SUP-10` y `SUP-11`— se conservan textualmente, porque `Deriva-Rules.md` exige que coincidan término por término con la línea de base visual. **Glosario (`[5.1]`)**: `Glosario-UX.md` pasa de recomendado a obligatorio para los ocho tipos D8 y §6 verifica ahora su existencia y su completitud además de la no duplicación; lo emite un lote posterior de esta migración, y los términos que este wireframe acuña —vía de alta como grilla de tarjetas, informe de verificación del origen, informe de validación de la configuración, resultado indeterminado, indicador de avance— se devolvieron para que ese lote los consuma sin redefinir los que ya están en `Glosario-Funcional.md` de 02. Ninguna fila anterior de este control de cambios se reescribió (`SDD-Development-Guide.md` §VI.2) y el bloque de procedencia del destino no se tocó: sigue declarando 4.1, y cerrarlo es trabajo de M5 |
| 1.0 | 2026-07-29 | Versión inicial. **Superficie nueva `SUP-17`**, emitida por §22.5 del documento de trabajo `SDD/Estado/Redefinicion-Servicio.md` v2.0. Hasta esta versión el alta de servicio **no tenía wireframe**: vivía repartida entre `SUP-05` y `SUP-06`, y §1 declara que ese reparto es el origen del defecto que la Fase B2 destapó —había disparador y no había destino—. §1 declara además que el número `SUP-17` que el documento de trabajo usa **no existía en ninguna parte** y que coincide por ser el siguiente libre. Especifica el **menú de las siete vías como primer paso y no como campo**, con los cuatro criterios que tiene que cumplir; las **dos verificaciones como dos operaciones con dos informes**, con la tabla que las separa en siete dimensiones; la distinción entre **dato incorrecto y consulta imposible** con sus tres consecuencias de composición; el **guardado en cualquier punto** con las cinco propiedades del borrador y el criterio de que guardar nunca esté deshabilitado; el **delta de cada vía** en el bloque de origen, con la prohibición de exponer campos de otra variante aunque sea deshabilitados; y la brecha `B-UX-23`, que es el primer minuto de uso del producto. Declara dieciocho estados |
