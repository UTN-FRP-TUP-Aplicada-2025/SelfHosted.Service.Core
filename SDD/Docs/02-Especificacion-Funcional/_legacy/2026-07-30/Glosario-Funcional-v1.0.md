> **Documento archivado.** Estado: **Superado**. Es la copia completa del estado previo de `Glosario-Funcional.md`, versión **1.0**, archivada el 2026-07-30 por la política de deprecación de `Master-Prompt.md` §5.1 al incorporarse la ronda de decisiones del agente humano del proyecto del 2026-07-30 —`Q-15`, `Q-17`, `Q-27` y la confirmación de `DI-17` a `DI-19`—. La versión vigente es [`Glosario-Funcional.md`](../../Glosario-Funcional.md). **El cuerpo que sigue no se modificó.**
>

---

# Glosario funcional — SelfHosted Service

**Proyecto de código:** SelfHosted-Service
**Producto:** SelfHosted Service
**Documento:** Glosario-Funcional.md
**Versión:** 1.0
**Estado:** Propuesto
**Fecha:** 2026-07-30
**Autor:** Analista Funcional Senior (AG-02)

**Glosario raíz de la cadena:** [`Vision-Producto.md`](../00-Contexto/Vision-Producto.md) §9, glosario del dominio de la categoría 00. Todo término que ese glosario ya declara con la misma semántica se **referencia** en §4 de este documento y **no se redefine acá**, por la regla de no duplicación de `Rules-Especificacion-Funcional` 4.0 §3.3.
**Trazabilidad upstream:** [`Vision-Producto.md`](../00-Contexto/Vision-Producto.md) §9; `PRODUCT-INTAKE-SelfHosted-Service` §12 (glosario del dominio del cliente, con la desambiguación de la familia «proyecto» y sus tres referentes) y §20; el punto 6 heredado de [`Modelo-Datos/Modelo-Conceptual.md`](Modelo-Datos/Modelo-Conceptual.md), archivado íntegro en `Modelo-Datos/_legacy/2026-07-30/Modelo-Conceptual-v1.1.md` §6.
**Trazabilidad downstream:** `03-UX-UI-DX` (`Rules-UX-UI-DX` §3.3 obliga a `Glosario-UX.md` a referenciar estos términos en lugar de duplicarlos), `05-Arquitectura-Tecnica`, `06-Backlog-Tecnico`, `08-Calidad-Y-Pruebas`.

---

## Tabla de contenido

- [1. Alcance, criterio de inclusión y procedencia de este artefacto](#1-alcance-criterio-de-inclusión-y-procedencia-de-este-artefacto)
  - [1.1 Regla de inclusión aplicada](#11-regla-de-inclusión-aplicada)
  - [1.2 Regla de no duplicación aplicada](#12-regla-de-no-duplicación-aplicada)
  - [1.3 Criterio de desambiguación aplicado](#13-criterio-de-desambiguación-aplicado)
  - [1.4 De dónde sale este documento](#14-de-dónde-sale-este-documento)
- [2. Tabla de términos](#2-tabla-de-términos)
  - [2.1 Actores y objetos del registro del sistema](#21-actores-y-objetos-del-registro-del-sistema)
  - [2.2 Servicio, origen e imagen](#22-servicio-origen-e-imagen)
  - [2.3 Red, direcciones y arranque](#23-red-direcciones-y-arranque)
  - [2.4 Variables y referencias](#24-variables-y-referencias)
  - [2.5 Edición transaccional, exportación e importación](#25-edición-transaccional-exportación-e-importación)
  - [2.6 Catálogo y plantillas](#26-catálogo-y-plantillas)
  - [2.7 Incorporación del parque existente](#27-incorporación-del-parque-existente)
  - [2.8 Higiene de imágenes y vuelta atrás](#28-higiene-de-imágenes-y-vuelta-atrás)
  - [2.9 Identidad, credenciales y auditoría](#29-identidad-credenciales-y-auditoría)
  - [2.10 Términos de forma de las reglas](#210-términos-de-forma-de-las-reglas)
- [3. Términos con más de un referente](#3-términos-con-más-de-un-referente)
  - [3.1 «registro» — cinco referentes](#31-registro--cinco-referentes)
  - [3.2 «resolución» — dos referentes](#32-resolución--dos-referentes)
  - [3.3 «ámbito» — tres referentes](#33-ámbito--tres-referentes)
  - [3.4 «higiene» — dos referentes](#34-higiene--dos-referentes)
  - [3.5 «huérfano» — dos referentes](#35-huérfano--dos-referentes)
  - [3.6 «procedencia» — tres referentes](#36-procedencia--tres-referentes)
  - [3.7 «etiqueta» — dos referentes](#37-etiqueta--dos-referentes)
  - [3.8 «modo de red» — dos referentes](#38-modo-de-red--dos-referentes)
  - [3.9 Criterio negativo: polisemias verificadas que no se califican](#39-criterio-negativo-polisemias-verificadas-que-no-se-califican)
- [4. Términos referenciados y no redefinidos](#4-términos-referenciados-y-no-redefinidos)
  - [4.1 Términos del glosario raíz que esta categoría usa](#41-términos-del-glosario-raíz-que-esta-categoría-usa)
  - [4.2 Equivalencias de forma, que no son polisemias](#42-equivalencias-de-forma-que-no-son-polisemias)
- [5. Constancias del barrido](#5-constancias-del-barrido)
  - [5.1 Candidatos descartados por la regla de inclusión](#51-candidatos-descartados-por-la-regla-de-inclusión)
  - [5.2 Términos sin fuente, declarados pendientes](#52-términos-sin-fuente-declarados-pendientes)
- [6. Control de cambios](#6-control-de-cambios)

---

## 1. Alcance, criterio de inclusión y procedencia de este artefacto

Este documento declara el vocabulario que la categoría 02 **acuña o precisa** y que consumen las categorías aguas abajo. No es un glosario del dominio del cliente —ése es el del intake §12, transcripto y ampliado en [`Vision-Producto.md`](../00-Contexto/Vision-Producto.md) §9— ni un glosario de industria.

`Rules-Especificacion-Funcional` 4.0 §2.1 lo convierte en **artefacto propio y obligatorio para los ocho tipos D8**. Hasta la versión 3.0 de esa regla el glosario de la categoría era el punto 6 de `Modelo-Datos/Modelo-Conceptual.md`, documento **condicional a la persistencia**: el motivo declarado del cambio es que el vocabulario de 02 no puede depender de ese flag.

### 1.1 Regla de inclusión aplicada

`Rules-Especificacion-Funcional` 4.0 §3.3: **entra al glosario todo término del dominio que aparece en más de un artefacto de 02** —dos casos de uso, un caso de uso y una regla, el modelo y un caso de uso—. Un término que vive en un solo artefacto se define ahí y no entra.

La verificación se corrió **por ocurrencia sobre los cien archivos** de la categoría, sin las copias de `_legacy/`, el 2026-07-30. La columna «Artefactos de 02 donde aparece» de §2 es el resultado de ese barrido y no una estimación: cada identificador que figura ahí se verificó en disco. Cuando el barrido devolvió un conjunto que **tiene nombre** —los 38 CU, las 40 RN, los 19 RC—, la celda lo declara en lugar de enumerarlo y dice cuál es; en los demás casos enumera, por largo que sea el listado.

Los candidatos que el barrido devolvió con **un solo artefacto** están en §5.1, con su conteo, para que una ronda de auditoría posterior no los levante como omisión.

**La regla tiene dos direcciones y las dos están medidas.** La **inversa** —que ningún término declarado quede sin uso en el cuerpo— se verificó en la emisión: ninguno de los términos de §2 aparece en menos de dos artefactos. La **directa**, que es la que la regla enuncia —que ningún término usado falte—, se midió al cerrar el hallazgo `P1-r2-02` del informe de la ronda 2, y devolvió **veinticuatro términos que el cuerpo de la categoría usaba y este glosario no declaraba**: ni con fila propia, ni referenciados en §4, ni descartados en §5.1, ni pendientes en §5.2. Los veinticuatro entraron a §2 con su conteo verificado en disco, y §6 los enumera uno por uno. Medir una sola de las dos direcciones es exactamente lo que dejó pasar el hueco, y queda escrito acá para que una ronda posterior no repita la medición parcial.

**Qué cuenta como término del dominio y qué no.** El alcance declarado en el encabezado de §1 gobierna esta regla: entra lo que la categoría **acuña o precisa**. No entra el vocabulario de industria que el cuerpo usa con su sentido corriente —dispositivos, capacidades, subred, pasarela, contexto y argumentos de construcción— aunque aparezca en más de un artefacto, porque esta categoría no lo acuña ni lo precisa: lo usa. Esos casos **no quedan sin constancia**: §5.1 los declara con su conteo y con el motivo, que no es el conteo.

### 1.2 Regla de no duplicación aplicada

Misma sección de la regla: si un término ya está en el glosario raíz con la misma semántica, **se referencia y no se redefine**. Los términos alcanzados están en §4.1, con su puntero. Donde esta categoría le agrega una precisión a un término del glosario raíz, la precisión se declara como atributo del modelo o del caso de uso y **no como redefinición del término**.

Dos casos particulares, que §4.2 trata aparte: los términos del glosario raíz que el cuerpo de 02 nombra con **otra forma de lectura**. No son términos nuevos y no se redefinen: se declara la equivalencia.

### 1.3 Criterio de desambiguación aplicado

`Vocabulario-Rules` 2.1 §9. Los tres puntos que gobiernan §3 de este documento:

- **§9.1, regla de decisión.** Un término polisémico se desambigua **sólo cuando sus sentidos pueden aparecer en el mismo contexto de lectura**. Con contextos disjuntos no se califica: hacerlo carga el texto sin resolver nada, y es el falso positivo que el criterio negativo de §10 de esa regla declara defecto del informe de auditoría y no del documento auditado.
- **§9.2, qué es «mismo contexto de lectura».** El contexto de lectura de un subagente **es la sección, no el documento**. Los artefactos de 03 a 11 se generan leyendo secciones nombradas y no archivos completos. Consecuencia operativa: **la forma desnuda de una familia calificada es el caso que hay que resolver**, y las formas calificadas no lo son.
- **§9.3, escalera de costo.** Se usa la forma más barata que resuelva el caso. En esta categoría alcanzó el **primer escalón** —entrada de glosario que declara los referentes— para las ocho familias de §3, con una excepción histórica declarada: la forma desnuda «el registro» se calificó por ocurrencia en el corpus el 2026-07-29, antes de que este artefacto existiera, porque entonces el único lugar donde declarar la polisemia era el punto 6 del modelo conceptual y no estaba en el alcance de lectura de todos los consumidores.

**Ninguna invariante de desambiguación se declara acá sin su verificación de colisión** (§9.4). Cada subsección de §3 declara en qué artefactos vive cada referente, y ese dato es el resultado del barrido.

### 1.4 De dónde sale este documento

Tres fuentes, y no hay una cuarta:

| Fuente | Qué aporta |
| --- | --- |
| El **punto 6 heredado** de `Modelo-Conceptual.md`, íntegro en `Modelo-Datos/_legacy/2026-07-30/Modelo-Conceptual-v1.1.md` §6 | Las **treinta y dos** entradas de la versión anterior, el criterio de inclusión que ya aplicaba y la entrada polisémica de «registro». Se traslada completo y no se reinterpreta: **catorce** entradas pasan a la tabla de §2 y **dieciocho** a la lista de referenciados de §4.1 |
| Los **cien artefactos hermanos** de 02 —38 CU, 40 RN, 19 RC, el modelo conceptual, el índice maestro y el `README.md` de la sección— | Los términos que el cuerpo de la categoría usa. Cada definición de §2 sale de **cómo los artefactos usan el término**, no de una redacción nueva |
| El **upstream**: `Vision-Producto.md` §9, y el `PRODUCT-INTAKE-SelfHosted-Service` §12 y §20 | La semántica de los términos referenciados de §4.1; la de los términos que el intake declara y el glosario raíz no trasladó, que esta categoría transcribe sin reinterpretar; y la desambiguación de la familia «proyecto» que §3.9 no vuelve a calificar |

**Nada se redactó de cero.** Donde la regla exige un término y ninguna de las tres fuentes lo declara, el término se emite como pendiente en §5.2 en lugar de definirse con el valor razonable.

---

## 2. Tabla de términos

**Ciento seis términos.** Una fila por término: término canónico, definición operativa, artefactos de 02 donde aparece, y sinónimos o alias cuando los hay. Las diez subsecciones agrupan por área del dominio y **no alteran la regla**: la tabla es una sola y cada término tiene exactamente una fila. El reparto por subsección es 7 + 29 + 23 + 13 + 8 + 6 + 5 + 6 + 4 + 5.

Los **veinticuatro** términos que la versión 1.0 sumó al cerrar el hallazgo `P1-r2-02` llevan la marca **`[+P1-r2-02]`** en la primera columna, para que la fila del control de cambios sea localizable en la tabla y no sólo enumerable en §6.

Convención de la tercera columna: `CU-XX`, `RN-XX` y `RC-XX` son los artefactos de la categoría; **MC** es `Modelo-Datos/Modelo-Conceptual.md`; **IDX** es `Especificacion-Funcional.md`, el índice maestro; **RME** es el `README.md` de la sección.

### 2.1 Actores y objetos del registro del sistema

| Término | Definición operativa | Artefactos de 02 donde aparece | Sinónimos o alias |
| --- | --- | --- | --- |
| **Registro** | **Término polisémico con cinco referentes.** La entrada completa, con la forma calificada de cada uno y la evidencia de la colisión, está en [§3.1](#31-registro--cinco-referentes). La forma desnuda «el registro» se admite **sólo** para el registro del sistema y sólo cuando la sección en curso ya lo fijó | Ver §3.1 | — |
| **Registro del sistema** | El estado persistido del producto: proyectos SelfHosted, servicios, enlaces, despliegues, reservas de dirección, variables e ítems del catálogo. Es el **referente por defecto** de «registro» y el que las postcondiciones de fallo nombran al decir que queda «en el estado previo» | CU-01, CU-02, CU-03, CU-11, CU-20, CU-26, CU-36, MC, RN-38 | «el registro», sólo con el sentido fijado por la sección |
| **Administrador del producto** | Actor humano primario del producto: la persona que opera el panel, declara la arquitectura y confirma cada operación de escritura. Es actor primario en 33 casos de uso y secundario en 5 | Los **38 CU** | — |
| **Registro del producto** | Actor de sistema que persiste y devuelve el registro del sistema: escribe el estado, lo lee y mantiene el conjunto de cambios pendientes. Es **denominación acuñada por esta categoría** y no un componente declarado por ninguna fuente | CU-01, CU-02, CU-03, CU-04, CU-05, CU-20, CU-22, CU-23, CU-25, CU-29, CU-30, CU-31, CU-32, CU-34, CU-36 | — |
| **Identificador legible** | Identificador de un proyecto SelfHosted que el usuario declara y lee, único en la instalación, del que se derivan nombres de recursos. Es distinto del identificador de objeto, que es interno y no se muestra | CU-01, CU-02, CU-11, IDX, MC, RC-01 | — |
| **Nombre visible** `[+P1-r2-02]` | Denominación legible que el usuario elige para un elemento del registro del sistema y que la interfaz muestra. **No exige unicidad**, y eso es dato declarado y no brecha: la consecuencia 2 de D-12 cierra la lista de nombres únicos del modelo en dos lugares, y ninguno es éste. Dos elementos con el mismo nombre visible en el mismo ámbito son una de las cinco condiciones de higiene del modelo, que se advierte sin bloquear. **Es distinto del identificador legible**, que sí es único en la instalación | CU-01, CU-36, IDX, RN-37 | «nombre», donde el contexto ya fijó que no es el identificador legible |
| **Instalación** | El ámbito de unicidad más amplio del producto: un despliegue del sistema administrador sobre un host. Es el ámbito en el que el identificador legible y el puerto publicado son únicos, y el que arranca sin ningún proyecto SelfHosted y con el catálogo vacío | CU-01, CU-02, CU-17, CU-29, CU-30, CU-31, IDX, MC, RC-01, RC-19 | — |

### 2.2 Servicio, origen e imagen

| Término | Definición operativa | Artefactos de 02 donde aparece | Sinónimos o alias |
| --- | --- | --- | --- |
| **Vía de alta** | Cómo llega el usuario a crear un servicio. Son **siete** y **no se persisten**: son cómo se llegó, no qué quedó. Dos de ellas —incorporar un contenedor existente y tomar un ítem del catálogo— no tienen origen propio y dejan huella en la **procedencia** del servicio. **No confundir con origen** | CU-03, CU-16, CU-17, IDX, MC | — |
| **Origen** | Qué queda declarado como fuente de la imagen del contenedor. Es una **variante discriminada** de cinco valores: imagen de registro público, imagen de registro privado, repositorio remoto, archivo de construcción en línea, y sin origen. Cada valor exige sus campos y ninguno más. Es configuración del servicio y **se persiste**. **No confundir con vía de alta** | CU-03, CU-08, CU-11, CU-13, CU-15, CU-16, IDX, MC, RN-08 | — |
| **Variante de origen** | Cada uno de los cinco valores del origen, con su conjunto propio de campos obligatorios. El rechazo distingue «falta un dato que la variante exige» de «se declara un campo que pertenece a otra variante», porque la acción del usuario es distinta. Las cinco tienen fila propia en esta subsección | CU-03, CU-13, CU-15, CU-16, IDX, MC, RN-08 | — |
| **Imagen de registro público** `[+P1-r2-02]` | Variante de origen en la que la imagen se descarga de un registro de imágenes que no exige credencial. Exige **registro, imagen y etiqueta**; la verificación del origen comprueba que la imagen y la etiqueta existan y devuelve el digesto | CU-03, CU-08, MC, RN-08 | — |
| **Imagen de registro privado** `[+P1-r2-02]` | Variante de origen en la que la imagen se descarga de un registro de imágenes que exige autenticarse. Exige lo mismo que la pública, con el registro como dirección y **más la credencial de registro**; la verificación del origen comprueba además que la credencial autentique | CU-03, CU-08, MC, RN-08 | — |
| **Repositorio remoto** `[+P1-r2-02]` | Variante de origen en la que la imagen se construye desde un repositorio. Exige **dirección del repositorio, rama y ruta del archivo de construcción**, más el contexto de construcción; la verificación del origen comprueba que el repositorio y la rama sean alcanzables y que la ruta exista en esa rama, y devuelve el último commit. **En `CU-32` y `CU-33` la misma expresión nombra otra cosa** —el repositorio donde vive el automatismo y se guarda su token— y no la variante de origen: los contextos son disjuntos y [§3.9](#39-criterio-negativo-polisemias-verificadas-que-no-se-califican) declara por qué no se califica | CU-03, CU-13, CU-15, CU-32, CU-33, IDX, MC, RN-08 | — |
| **Sin origen** `[+P1-r2-02]` | Variante de origen del servicio que **no declara ninguna fuente de imagen**. No exige ningún dato y no hay origen que verificar. **No es una vía de alta con mecánica propia**: es el tronco del alta detenido antes de declarar el origen, y es lo que guardar ahí produce | CU-03, IDX, MC, RN-08 | «servicio sin origen» |
| **Variante discriminada** | Forma del modelo en la que un objeto declara un tipo y, según ese tipo, exige un conjunto cerrado de campos y ninguno más. Se adopta en lugar de un objeto con campos opcionales, porque un estado que declare a la vez campos de dos variantes no tiene significado y la regla lo rechaza | CU-03, CU-08, MC, RN-08 | — |
| **Verificación del origen** | Consulta que el sistema hace al sistema externo que la vía de alta determina, para comprobar que el origen declarado existe y es alcanzable. Distingue «el dato es incorrecto» de «no se pudo verificar», que son situaciones distintas para el usuario | CU-03, CU-15, MC, RN-08 | — |
| **Archivo de construcción en línea** | Variante de origen en la que el usuario provee el **contenido** del archivo de construcción en lugar de una referencia a un repositorio. No admite instrucciones de copia local, que sin contexto de construcción fallarían | CU-03, CU-08, CU-15, IDX, MC, RN-08 | — |
| **Estado de configuración** | Estado del servicio como **declaración**: `borrador`, `pendiente-de-aplicar` o `aplicado`. Es **ortogonal al estado del despliegue**, que es el estado del contenedor | CU-03, MC | — |
| **Borrador** | Estado de configuración de un servicio que existe, es visible en el lienzo y está incompleto **de forma visible**. **No entra al conjunto de cambios pendientes y no es aplicable.** Es lo que hace utilizable guardar a mitad de camino | CU-03, CU-09, IDX, MC, RN-38 | «nodo borrador» |
| **Servicio declarado** | Servicio que existe en el registro del sistema como configuración, con independencia de que tenga o no un contenedor corriendo. Se contrapone a **servicio activo**, que es el que tiene despliegue vigente | CU-03, CU-04, CU-05, CU-09, CU-13, CU-18, CU-22 | — |
| **Efímero** | Servicio pensado para reconstruirse en cada uso, sin estado persistente propio | CU-03, CU-08, CU-15, MC | «marca de efímero» |
| **Verificación de salud** | Comprobación periódica, declarada en la imagen o en el servicio, que determina si el contenedor está sano | CU-03, CU-08, CU-13, CU-17, CU-27, CU-28, MC, RN-31 | — |
| **Montaje** | Vínculo declarado entre una ruta del contenedor y un volumen o un directorio del host. Se conserva al detener y sobrevive al servicio eliminado; el objeto al que apunta es un objeto con identidad que el modelo declara y no diseña | CU-03, CU-06, CU-07, CU-08, CU-11, CU-13, CU-17, CU-18, CU-38, IDX, MC, RN-09 | — |
| **Volumen o directorio de montaje** `[+P1-r2-02]` | El recurso de almacenamiento al que apunta un montaje de un servicio, y que **sobrevive al servicio**. Es uno de los cuatro objetos con identidad que el modelo declara y no diseña | IDX, MC | «el objeto del montaje» |
| **Comando de arranque** `[+P1-r2-02]` | Comando con el que el contenedor arranca. **Nulo hereda el de la imagen.** Es una dimensión de configuración que el parque real usa, se declara en el alta y el servicio incorporado la conserva; cambiarla **recrea** el contenedor. Es donde va lo que necesita valores ya resueltos, porque las expresiones de referencia nunca son resolubles en tiempo de construcción | CU-03, CU-15, IDX, MC | «comando» |
| **Política de reinicio** `[+P1-r2-02]` | Regla que indica si el contenedor debe reiniciarse solo, con los cuatro valores que el intake §12 declara. Es dimensión de configuración del servicio y se **deriva** de lo observado al incorporar un contenedor existente; cambiarla entra al conjunto de cambios pendientes y **no recrea** el contenedor | CU-03, CU-08, CU-11, CU-17, MC | — |
| **Réplica** | Cada instancia paralela de un mismo servicio. Cada réplica tiene su propio contenedor, su propio registro del contenedor y su propio despliegue, y cuando el servicio tiene dirección fija exige **una dirección por réplica** | CU-03, CU-08, CU-13, CU-14, CU-19, CU-22, CU-27, CU-38, IDX, MC, RC-12, RN-18 | — |
| **Recursos declarados del host** | Los recursos de procesador y de memoria que el host declara disponibles, y que acotan por arriba el escalado vertical de un servicio | CU-03, IDX, RN-19 | — |
| **Imagen** | La imagen de contenedor tratada como **objeto con identidad**, y no como una cadena dentro del origen del servicio: se referencia desde el despliegue, sobrevive al servicio que la construyó y tiene ciclo de vida propio. Lleva **marca de pertenencia** y **marca de conservada** | CU-03, CU-06, CU-07, CU-08, CU-11, CU-13, CU-15, CU-16, CU-17, CU-18, CU-24, CU-37, CU-38, IDX, MC, RME, RN-08, RN-39, RN-40 | — |
| **Digesto** | Identidad real de una imagen, calculada sobre su contenido. Es lo que permite saber **qué corre exactamente**, incluso cuando la etiqueta es flotante y hoy apunta a algo distinto de lo que apuntaba ayer | CU-03, CU-13, CU-15, CU-37, CU-38, IDX, MC, RN-40 | — |
| **Etiqueta** | **Término polisémico con dos referentes.** Ver [§3.7](#37-etiqueta--dos-referentes). En el sentido del dominio: nombre reasignable de una imagen, que **no identifica nada de forma estable**; su contraparte estable es el digesto | CU-08, CU-16, CU-37, CU-38, RN-39 | — |
| **Línea de tiempo del despliegue** | Secuencia de instantes que el despliegue registra —creación, arranque, retiro— y que permite ordenar los despliegues de un servicio y elegir uno anterior | CU-13, CU-15, CU-38, RC-18, RN-40 | — |
| **Máquina de estados** `[+P1-r2-02]` | El conjunto de estados y transiciones en el que se resuelve el despliegue, declarado en el anexo E-17 del intake y transcripto sin reinterpretar. **Describe un contenedor y no una operación**, que es consecuencia directa del resultado por contenedor, y **se resuelve siempre en un estado, nunca en «no se sabe»**. La caída del circuito de la interfaz **no es un evento** suyo: el despliegue vive del lado del servidor y el circuito sólo lo observa | CU-13, CU-15, CU-18, CU-24, CU-28, CU-38, MC | «máquina de estados del despliegue» |
| **Resultado por contenedor** | El resultado de un despliegue se determina **por contenedor** y no por operación: cada contenedor tiene su propio estado, y el estado del servicio y del proyecto SelfHosted se **derivan** de ellos. Es lo que hace legítimo el arranque parcial | CU-02, CU-13, CU-15, CU-18, CU-24, CU-26, CU-27, CU-28, CU-33, CU-38, IDX, RC-18, RME, RN-31, RN-38 | «despliegue por contenedor» |
| **Estado agregado** | Estado que se **deriva** de los estados de los despliegues por contenedor de un proyecto SelfHosted o de un servicio, y no un estado propio de la operación. Un proyecto puede figurar como parcialmente activo, que es un estado legítimo | CU-02, CU-27 | — |
| **Ventana de indisponibilidad** | Intervalo en el que el servicio no responde porque su contenedor se reemplaza. Es **consecuencia declarada** de que el producto no administre proxies inversos, y la interfaz debe advertirla explícitamente al confirmar | CU-13, CU-22, CU-24, CU-38 | — |

### 2.3 Red, direcciones y arranque

| Término | Definición operativa | Artefactos de 02 donde aparece | Sinónimos o alias |
| --- | --- | --- | --- |
| **Bridge** | Red virtual del motor de contenedores con su propia subred privada; sus miembros se resuelven por nombre y publican puertos en el host | CU-01, CU-04, CU-06, CU-19, MC, RN-04, RN-38 | — |
| **Macvlan** | Modo de red en el que el contenedor obtiene una dirección propia de la red local y aparece como un equipo más. **El host no lo alcanza por la misma placa**, y por eso no admite puertos publicados | CU-01, CU-03, CU-04, CU-06, CU-08, CU-11, CU-18, CU-19, CU-26, IDX, MC, RC-12, RC-19, RN-04, RN-07, RN-18, RN-38 | — |
| **Red del proyecto** `[+P1-r2-02]` | La red en la que viven los servicios de un proyecto SelfHosted, con su modo, su subred, su pasarela y su interfaz padre cuando corresponde. Es **objeto con identidad** que el modelo declara y no diseña, porque la comparten todos los servicios del proyecto y se crea antes que los contenedores. Un proyecto puede crearla o consumir una que ya existe | CU-01, CU-03, CU-15, CU-19, IDX, MC, RC-02, RC-17, RN-01, RN-35 | «la red del proyecto» |
| **Modo de red** `[+P1-r2-02]` | **Término polisémico con dos referentes**, el de la red del proyecto y el del servicio: ver [§3.8](#38-modo-de-red--dos-referentes). En los dos casos el valor es `bridge` o `macvlan`, y en los dos gobierna qué se puede declarar: en macvlan no se publican puertos, y el canal alcanzable de una arista que referencia el host se decide comparando los modos de red de origen y destino | CU-01, CU-03, CU-04, CU-06, CU-18, CU-35, IDX, MC, RC-19, RME, RN-04, RN-07, RN-08, RN-38 | Ver §3.8 |
| **Alias DNS** | Nombre por el que un contenedor es resoluble dentro de la red del proyecto SelfHosted. Coincide con el nombre del servicio, y es **la razón** por la que ese nombre debe ser único dentro del proyecto | MC, RC-02, RN-01 | — |
| **Rango gestionado** | Conjunto de direcciones que el producto administra dentro de la red del proyecto SelfHosted, con sus exclusiones declaradas. Una dirección fuera del rango o declarada excluida se rechaza con la siguiente dirección libre sugerida | CU-01, CU-03, CU-18, CU-19, CU-20, CU-21, IDX, MC, RN-06, RN-38 | — |
| **Reserva de dirección** | Anotación que vincula una dirección del rango gestionado a una réplica de un servicio. Es por réplica y no por servicio, y depende existencialmente del servicio | CU-13, CU-19, CU-38, IDX, MC, RC-12, RC-15 | — |
| **Dirección fija** `[+P1-r2-02]` | Dirección de la red local que el servicio declara en lugar de recibir del motor de contenedores. Debe pertenecer al rango gestionado y no estar excluida, se declara junto al modo de red y a la interfaz padre, y obliga a **una dirección por réplica**. Un proyecto SelfHosted sin direcciones fijas no produce conflicto de dirección | CU-03, CU-08, CU-18, CU-19, CU-20, MC, RN-06, RN-18 | «dirección declarada» |
| **Interfaz padre** `[+P1-r2-02]` | La placa del host sobre la que se apoya una red macvlan. Es parámetro de la red del proyecto, del modo de red del servicio y de cada reserva de dirección, y se declara **sólo cuando el modo lo exige** | CU-01, CU-03, CU-08, CU-19, MC | — |
| **Dirección por réplica** | Regla de forma del escalado horizontal: un servicio con dirección fija exige **una dirección reservada por cada réplica**, y pedir más réplicas que direcciones se rechaza al declararlo en lugar de fallar en el arranque | CU-19, IDX, RC-12, RN-18 | — |
| **Puerto publicado en el host** | Puerto del host que un servicio en modo bridge expone hacia afuera. Es único por instalación, y su unicidad es exigible **de aplicación y no de esquema**, porque vive dentro del bloque de puertos del servicio y no en una tabla propia | CU-03, CU-04, CU-06, CU-08, IDX, MC, RC-19, RN-04, RN-07, RN-38 | «puerto del host» |
| **Servicio activo** | Servicio con despliegue vigente, es decir con contenedor creado y corriendo. Es el conjunto contra el que se valida el conflicto de dirección **sin acceder al motor de contenedores**, y se contrapone a servicio declarado | CU-13, CU-18, CU-19, CU-20, CU-21, CU-24, CU-33, IDX, RC-12, RC-19, RN-03, RN-38 | — |
| **Veredicto** | Salida del algoritmo de validación de conflicto de direcciones: si el arranque procede, y con qué conflictos. Es lo que el informe de conflicto le comunica al administrador | CU-01, CU-20, CU-21, IDX, MC | — |
| **Clase de conflicto** | Tipo al que pertenece un conflicto de dirección, de un conjunto de tres declarado por el algoritmo. Determina **qué resoluciones se ofrecen**: el sistema no ofrece una resolución que no corresponda a la clase | CU-20, CU-21 | — |
| **Informe de conflicto** | Salida que acompaña al arranque bloqueado, en el formato de detalle de problema declarado: qué conflictos hay, de qué clase es cada uno y qué resoluciones admite | CU-13, CU-18, CU-20, CU-21, CU-24, CU-33, IDX, RN-20 | — |
| **Grafo de arranque** | Subgrafo formado por las aristas que **declaran espera al destino**. Fija el orden topológico del arranque y no puede tener ciclos; un ciclo formado por aristas que no esperan no es un ciclo de arranque | CU-04, CU-11, CU-18, IDX, MC, RME, RN-05, RN-14, RN-22 | — |
| **Espera al destino** | Uno de los dos ejes independientes de una arista: propiedad **declarada** que indica que el origen debe esperar a que el destino esté disponible. Es lo que define el orden de arranque | CU-04, MC, RC-08, RN-05, RN-14, RN-34 | — |
| **Referencia el host** | El otro eje de una arista: se **deduce** de la clave referenciada y no se declara. Cuando la arista referencia el host del destino, exige canal alcanzable | CU-04, CU-16, CU-18, CU-24, CU-25, IDX, MC, RN-04, RN-14, RN-34 | — |
| **Canal alcanzable** | Condición que debe cumplir una arista que referencia el host: que el modo de red de los dos servicios permita efectivamente el tráfico. Se valida al aplicar los cambios y al arrancar, no al trazar la arista | CU-04, CU-18, CU-24, IDX, RN-04 | — |
| **Puerto de destino** `[+P1-r2-02]` | Puerto que una arista anota sobre el servicio de destino. Es **registro de dependencia y no mecanismo de resolución**: se persiste junto a la arista y a la referencia que la sostiene, y queda ausente cuando la arista no involucra puerto | CU-04, CU-16, CU-35, MC | — |
| **Enlace de espera sin variable** | Arista cuya única razón de ser es esperar al destino, sin par de claves de referencia. Entre dos servicios hay **como máximo uno** | IDX, MC, RC-10 | — |
| **Arranque parcial** | Estado **declarado y legítimo** del modelo: un proyecto SelfHosted en el que algunos contenedores arrancaron y otros no. No es un error ni un estado transitorio que haya que resolver | CU-02, CU-18, CU-20, CU-21, CU-24, CU-27, IDX, RN-20, RN-31 | «parcialmente activo» |
| **Servicio suelto** | Un servicio arrancado o detenido **de a uno**, fuera de la operación sobre el proyecto SelfHosted completo | CU-18, CU-20, RC-14 | — |

### 2.4 Variables y referencias

| Término | Definición operativa | Artefactos de 02 donde aparece | Sinónimos o alias |
| --- | --- | --- | --- |
| **Variable de servicio** `[+P1-r2-02]` | Par de clave y valor que el proceso del contenedor recibe. Su valor puede ser un literal o una **referencia sin resolver** a otra variable, y puede ser secreta. Su clave es única dentro de su servicio, y ésa es la unicidad que sí se exige porque es el contrato con el proceso. Es la tercera clase de variable, distinta de la **variable compartida del proyecto** y de la **variable provista por el sistema** | CU-01, CU-35, MC, RC-03, RC-05, RC-11, RC-15, RC-16, RC-17, RN-27, RN-28, RN-32 | «variable del servicio» |
| **Variable provista por el sistema** | Variable de sólo lectura que el sistema expone en cada servicio y que el usuario no declara ni edita. Son dos: su host interno y su nombre. Llevan **prefijo reservado**, y ninguna es secreta. **No hay variable de puerto** | CU-03, CU-04, CU-35, IDX, MC, RC-03, RN-23, RN-32 | — |
| **Prefijo reservado** | Prefijo que el sistema reserva para las variables que provee. Una clave declarada por el usuario con ese prefijo se rechaza | CU-03, CU-35, IDX, MC, RC-03, RN-32 | — |
| **Resolución de la referencia** | **Término polisémico dentro de la familia «resolución»**: ver [§3.2](#32-resolución--dos-referentes). Sustituir una expresión de referencia por el valor al que apunta, **inmediatamente antes de crear el contenedor**. El contenedor ve el valor, nunca la expresión | CU-35, IDX, MC, RC-11, RN-24 | — |
| **Momento de resolución** | Instante del ciclo de vida en el que la referencia se resuelve. Es un atributo de la referencia y debe ser coherente con la clase de variable a la que apunta | CU-35, IDX, MC, RC-11 | — |
| **Último valor resuelto** | Materialización de una referencia: el valor que la última resolución produjo. Se persiste junto a la expresión, que sigue siendo la **fuente de verdad** | CU-35, MC, RC-11 | — |
| **Forma vinculada** | Forma en la que una referencia a otro servicio se persiste: **vinculada al servicio y no a su nombre**, de modo que renombrar el destino no la rompe. Se contrapone a la forma legible, que es la que el usuario escribe y lee | CU-04, CU-10, CU-22, CU-35, MC, RN-33 | — |
| **Referencia vigente** | Referencia que todavía apunta a una variable existente. Mientras exista al menos una, la eliminación de la variable apuntada se rechaza devolviendo la lista de servicios y claves que la referencian | CU-25, CU-34, RN-27 | — |
| **Ciclo de valor** | Cadena de referencias que vuelve sobre sí misma. Se rechaza con la cadena completa del ciclo, y es distinto de un ciclo del grafo de arranque | CU-16, CU-35, IDX, RC-05, RN-05, RN-22 | — |
| **Secreto** `[+P1-r2-02]` | Material sensible que una variable **referencia en lugar de contenerlo**. Se comparte entre servicios, se rota y tiene historia, y es uno de los cuatro objetos con identidad que el modelo declara y no diseña. Nunca se devuelve en claro ni se escribe en una exportación: cuando la variable lleva marca de secreta, su valor en claro está ausente | CU-07, CU-09, CU-10, CU-12, CU-13, CU-14, CU-17, CU-32, CU-33, CU-34, CU-35, IDX, MC, RC-05, RC-16, RC-17, RME, RN-15, RN-22, RN-23, RN-24, RN-25, RN-29, RN-35 | «material secreto» |
| **Carácter de secreto y su propagación** | Marca que indica que una variable es secreta. **Se propaga por la referencia**: una variable que apunta a una secreta queda secreta, y el manifiesto preserva el carácter sin el valor | CU-10, CU-34, CU-35, IDX, RC-16, RN-15, RN-23 | «marca de secreta», que es el nombre del atributo en el modelo y el título de `RC-16` |
| **Marcador de variable** | Lo que la exportación emite **en lugar del valor** cuando el valor es secreto, con su entrada vacía en el archivo de variables. No es una expresión de referencia: la exportación nunca emite expresiones | CU-09, RN-25 | — |
| **Escape del signo peso** | Duplicación obligatoria de todo signo peso literal en la exportación, para que el archivo exportado levante sin que el motor interprete el literal como una expresión | RN-25, RN-26 | — |

### 2.5 Edición transaccional, exportación e importación

| Término | Definición operativa | Artefactos de 02 donde aparece | Sinónimos o alias |
| --- | --- | --- | --- |
| **Cambio visual** | Cambio de la disposición del lienzo, sin efecto sobre la configuración. **No entra al conjunto de cambios pendientes** y no marca ningún servicio para redespliegue | CU-04, CU-22, CU-25, IDX, MC, RN-12 | — |
| **Nodo del lienzo** `[+P1-r2-02]` | Cada bloque que el lienzo dibuja. **Un nodo es siempre un servicio**: el proyecto SelfHosted **no es un nodo del lienzo**, y por eso una referencia a una variable compartida del proyecto no materializa ninguna arista y su marcado de redespliegue se resuelve por enumeración. Moverlo es cambio visual y no entra al conjunto de cambios pendientes | CU-04, CU-05, CU-13, CU-22, CU-25, CU-27, CU-34, CU-35, CU-38, RN-12 | «nodo de servicio», «nodo» |
| **Disposición del lienzo** | Posición de cada nodo y trazado de cada arista en el lienzo. Se persiste en el proyecto SelfHosted, se restituye idéntica al reabrirlo, y es lo que el manifiesto propio preserva y el formato estándar de composición no | CU-05, CU-09, CU-10, CU-11, IDX, MC, RME, RN-12 | «disposición» |
| **Informe de impacto** | Cálculo previo a la aplicación en lote: qué servicios se redesplegarían, cuáles no y por qué. Se recalcula al descartar un cambio individual | CU-23, CU-24, CU-25, IDX, MC, RME, RN-13 | — |
| **Servicio afectado** | Servicio que el conjunto de cambios pendientes obliga a redesplegar. La aplicación en lote redespliega **únicamente** los afectados | CU-21, CU-24, CU-34, IDX, RN-13 | — |
| **Formato estándar de composición** | Formato de intercambio de la industria al que el producto exporta e importa. Es autosuficiente y **no preserva** la disposición del lienzo, el nivel de variable compartida ni la intención de cada referencia | CU-08, CU-09, CU-11, CU-16, IDX, RME, RN-15, RN-25, RN-26 | «formato de composición» |
| **Archivo de composición** `[+P1-r2-02]` | El archivo que el producto emite y admite en el formato estándar de composición. **Es autosuficiente por sí solo**: el manifiesto propio lo acompaña, agrega y no lo reemplaza. Es la entrada de la importación como proyecto SelfHosted nuevo y uno de los dos momentos en los que se evalúan la unicidad del nombre de servicio y el aporte obligatorio de la arista | CU-08, CU-09, CU-10, CU-11, RN-01, RN-26, RN-30, RN-34 | — |
| **Manifiesto propio** | Formato de exportación del producto, complementario al estándar: preserva la **disposición del lienzo**, el nivel de variable compartida y la intención de cada referencia, que el estándar pierde | CU-09, CU-10, CU-11, CU-35, IDX, RME, RN-25 | — |

### 2.6 Catálogo y plantillas

| Término | Definición operativa | Artefactos de 02 donde aparece | Sinónimos o alias |
| --- | --- | --- | --- |
| **Plantilla** | Un ítem del catálogo, visto desde lo que declara: **el alta de un servicio sin la cola de despliegue** —sin validar contra el motor, sin aplicar y sin desplegar—, con sus valores variables convertidos en parámetros. No se instancia, no se despliega y no ocupa dirección | CU-03, CU-16, CU-17, IDX, MC, RC-14, RME, RN-15, RN-37, RN-39 | «ítem del catálogo», desde el eje de lo que declara |
| **Versión de contenido** | Versión de lo que el usuario publicó de un ítem del catálogo. Se incrementa al editar un ítem ya publicado, y es lo que el servicio instanciado **copia** como procedencia. **No confundir con versión de formato** | CU-16, CU-17, MC, RN-39 | — |
| **Versión de formato** | Versión de la **forma del archivo** del catálogo, no de su contenido. Cambia cuando cambia el esquema, y es lo que permite convertir un catálogo importado sin adivinar su forma. **No confundir con versión de contenido** | CU-10, CU-11, CU-16, CU-17, MC | — |
| **Procedencia** | **Término polisémico con tres referentes**: ver [§3.6](#36-procedencia--tres-referentes). En el sentido del catálogo: copia que el servicio instanciado conserva del ítem y de la versión de contenido de los que salió, **desvinculada** del ítem original | CU-16, CU-17, CU-37, IDX, MC, RC-19, RN-39 | — |
| **Conversión con informe** | Tratamiento que reemplaza a un rechazo: la operación se completa transformando lo que no puede pasar tal cual, y **declara qué transformó**. Es lo que ocurre al guardar como plantilla un servicio con variables secretas | CU-17, RN-15 | — |
| **Aviso no bloqueante** | Salida que informa una condición y **no impide** la operación. Es la forma que toma toda condición de higiene, y también la colisión de identificador al importar un ítem, que se resuelve como copia | CU-16, CU-17, CU-34, RN-36 | — |

### 2.7 Incorporación del parque existente

| Término | Definición operativa | Artefactos de 02 donde aparece | Sinónimos o alias |
| --- | --- | --- | --- |
| **Descubrimiento** | Operación de sólo lectura que lista los contenedores que ya corren en el servidor como candidatos a incorporarse. **No escribe nada** | CU-03, CU-06, CU-07, CU-08, IDX, RC-19, RME, RN-02, RN-11, RN-38 | — |
| **Candidato** | Contenedor que el descubrimiento devuelve, con su configuración observada, su marca de incorporabilidad y la sugerencia de variables secretas. Un candidato puede dejar de serlo entre el descubrimiento y la confirmación | CU-03, CU-06, CU-07, CU-08, CU-37, RC-19, RME, RN-11, RN-38 | — |
| **Motivo de no incorporabilidad** | Razón escrita por la que un candidato **no puede** incorporarse. Se muestra junto al candidato en lugar de omitirlo del listado, para que el administrador sepa por qué | CU-06, CU-07, IDX, RME | — |
| **Configuración observada** `[+P1-r2-02]` | Lo que el descubrimiento lee del contenedor que ya corre, antes de traducirlo a servicio. Es el insumo de la traducción, que deriva de ella la red, el origen, los montajes, los dispositivos, las capacidades, los límites, las réplicas, la política de reinicio, la marca de efímero y la verificación de salud. El servicio incorporado queda **equivalente** a ella, y lo que el formato de origen interpole no produce ninguna expresión de referencia | CU-06, CU-07, CU-08, CU-11, IDX, RME | — |
| **Clasificación de variables** `[+P1-r2-02]` | Paso **obligatorio** de la incorporación: se presentan todas las variables importadas, con las que la heurística sugiere ya premarcadas como secretas, y el administrador confirma cuáles lo son. Sin ese paso la incorporación **no se completa** y el contenedor queda intacto | CU-07, IDX, MC, RN-15, RN-29 | «paso de clasificación de variables» |

### 2.8 Higiene de imágenes y vuelta atrás

| Término | Definición operativa | Artefactos de 02 donde aparece | Sinónimos o alias |
| --- | --- | --- | --- |
| **Almacén de imágenes** | El conjunto de imágenes que el motor de contenedores tiene en el host. Es la fuente del inventario, y el producto lo lee sin ser su dueño | CU-37, CU-38, MC, RN-40 | — |
| **Marca de pertenencia** | Marca que distingue **lo que el producto administra** de lo que sólo ve. Sin ella el producto no puede separar lo que construyó de lo ajeno | CU-15, CU-37, MC, RN-40 | «pertenencia del producto» |
| **Imagen ajena** | Imagen del almacén **que no lleva la marca de pertenencia del producto**. Está protegida de la limpieza y la protección **no admite excepción por solicitud explícita**: no es del producto y no hay confirmación que lo cambie | CU-37, IDX, MC, RN-40 | «ajena» |
| **Conservada** | Marca que el administrador pone sobre una imagen para protegerla de la limpieza, y que puede retirar | CU-37, CU-38, IDX, MC, RN-40 | «marca de conservada» |
| **Limpieza** | Borrado de las imágenes descartables del almacén, **excluyendo** las conservadas y las ajenas. Produce un informe de lo borrado y de lo protegido | CU-15, CU-37, CU-38, IDX, MC, RN-40 | — |
| **Volver a un despliegue anterior** | Operación que toma un despliegue anterior de la línea de tiempo de un servicio, resuelve la imagen que usó y crea un despliegue nuevo con ella. **No es implementable hoy**: depende de que el despliegue registre el digesto | CU-13, CU-38, IDX, RME, RN-40 | «vuelta a un despliegue anterior» |

### 2.9 Identidad, credenciales y auditoría

| Término | Definición operativa | Artefactos de 02 donde aparece | Sinónimos o alias |
| --- | --- | --- | --- |
| **Registro de auditoría** | Bitácora de **toda operación de escritura** con su resultado, incluido el intento rechazado. Es uno de los cinco referentes de «registro»: ver [§3.1](#31-registro--cinco-referentes). **Es la bitácora, no la anotación**: cada operación produce un evento de auditoría, que tiene su propia fila acá abajo | CU-01, CU-02, CU-16, CU-31, CU-33, IDX, RN-17 | — |
| **Evento de auditoría** `[+P1-r2-02]` | Registro de **una** operación con su momento, su actor, su acción, la entidad alcanzada, el detalle y el resultado. **Toda escritura genera uno**, incluido el intento rechazado, y el flujo de todo caso de uso de escritura lo emite como paso propio y lo declara en su postcondición de éxito. Es la anotación; el **registro de auditoría** es el conjunto que las contiene. Su retención está declarada aguas arriba y no la fija esta categoría | CU-01, CU-02, CU-03, CU-04, CU-07, CU-11, CU-13, CU-15, CU-16, CU-17, CU-18, CU-21, CU-23, CU-24, CU-29, CU-30, CU-31, CU-32, CU-33, CU-34, CU-37, CU-38, IDX, MC | — |
| **Resumen del token** | Lo único que el sistema persiste del valor de un token de API. El valor se exhibe **una sola vez** y no vuelve a mostrarse; el resumen es único | CU-32, IDX, MC, RC-13, RN-16 | «resumen del valor» |
| **Informe de validación de la configuración** | Salida única que la confirmación del alta o de la edición de un servicio emite, con el resultado de todas las validaciones de la configuración completa en lugar de un rechazo por vez | CU-03, RC-19, RN-38 | — |

### 2.10 Términos de forma de las reglas

| Término | Definición operativa | Artefactos de 02 donde aparece | Sinónimos o alias |
| --- | --- | --- | --- |
| **Momento de validación** | Sección de forma de toda regla de negocio: en qué instante del ciclo de vida se evalúa la regla. Se transcribe del anexo E-16 del intake y no se reinterpreta | Las **40 RN**, e IDX | — |
| **Entidades involucradas** `[+P1-r2-02]` | Sección de forma de toda regla conceptual de modelo: sobre qué entidades del modelo conceptual recae la invariante. Es el punto 2 de la estructura obligatoria de `Rules-Especificacion-Funcional` §4.2.3 | Las **19 RC** | — |
| **Tipo de restricción** `[+P1-r2-02]` | Sección de forma de toda regla conceptual de modelo: a qué clase pertenece la invariante. El corpus usa **cinco** clases —identidad, referencial, valor permitido, cardinalidad y derivación—, con calificaciones de ámbito o de propagación cuando corresponde. Es el punto 3 de la estructura obligatoria de §4.2.3, y la tercera columna del índice de RC del índice maestro | Las **19 RC**, e IDX | — |
| **Mecanismo de verificación conceptual** `[+P1-r2-02]` | Sección de forma de toda regla conceptual de modelo: cómo se comprueba la invariante sin bajar a esquema ni a tipos físicos. Es el punto 4 de la estructura obligatoria de §4.2.3 | Las **19 RC** | — |
| **Dependencia existencial** | Tipo de restricción referencial en la que un objeto no puede existir sin el objeto que lo contiene, con propagación en cascada al eliminarlo | IDX, RC-15 | — |

---

## 3. Términos con más de un referente

Esta sección **no se omite y no puede quedar vacía**: `Rules-Especificacion-Funcional` 4.0 §4.2.4 punto 3 obliga a declarar los referentes de cada término polisémico, la forma que corresponde a cada uno y la **evidencia de que los contextos colisionan**. Las ocho familias de abajo se verificaron por ocurrencia sobre los cien archivos de la categoría el 2026-07-30; §3.9 declara las que **no** se califican, por el criterio negativo de `Vocabulario-Rules` §9.1. La octava, «modo de red», salió del barrido en la dirección directa que cerró el hallazgo `P1-r2-02`: el término entró a §2.3 y su segundo referente apareció con él.

### 3.1 «registro» — cinco referentes

**Es la familia más cargada de la categoría y la que más consecuencias tiene aguas abajo.** La entrada heredada del punto 6 del modelo conceptual declaraba **cuatro** referentes; esta versión **suma el quinto**, porque la migración normativa al conjunto 6.0 renombró el actor de sistema que lo lleva.

| # | Referente | Forma calificada obligatoria | Dónde vive |
| --- | --- | --- | --- |
| R1 | El **estado persistido** del producto: proyectos, servicios, enlaces, despliegues, reservas, variables e ítems. Es el **referente por defecto** | `registro del sistema` | CU-01, CU-02, CU-03, CU-11, CU-20, CU-26, CU-36, MC, RN-38 |
| R2 | La **bitácora de operaciones de escritura**, con su resultado | `registro de auditoría` | RN-17, CU-01, CU-02, CU-16, CU-31, CU-33, IDX |
| R3 | La **salida que emite el contenedor**, que el administrador consulta y que admite flujo continuo | `registro del contenedor` | CU-14, IDX, RME |
| R4 | El **servidor externo de imágenes** del que se descarga una imagen, en sus dos variantes pública y privada | `registro de imágenes`, y `imagen de registro` cuando lo que se nombra es la variante de origen | CU-13, CU-37, CU-38, CU-03, CU-08, CU-17, MC, IDX, RME, RN-08 |
| R5 | El **actor de sistema** que persiste y devuelve el registro del sistema. **Referente nuevo de esta versión**: hasta la migración normativa se llamaba `Registro de la solución` | `Registro del producto` | Los 15 CU de §2.1, y la tabla de convención de actores de IDX §8 |

**Evidencia de la colisión.** R1 y R5 comparten contexto de lectura de forma estructural: en un mismo caso de uso, la tabla de actores de §2 nombra a R5 y la postcondición de §7 nombra a R1. Un subagente que reciba §7 suelta y lea «el registro queda en el estado previo» no puede decidir si se afirma algo sobre el estado persistido o sobre el actor. R2 y R1 colisionan en la misma postcondición, que nombra a los dos en la misma oración. Es exactamente el caso que `Vocabulario-Rules` §9.2 describe.

**Regla de uso.** Las cinco formas calificadas **no colisionan entre sí** y se usan tal cual; calificarlas más sería el falso positivo de §9.1. La forma desnuda «el registro» se admite **sólo** para R1, y sólo cuando la sección en curso ya lo fijó. El corpus aplicó esta regla por ocurrencia el 2026-07-29, antes de que este artefacto existiera.

### 3.2 «resolución» — dos referentes

| # | Referente | Forma calificada obligatoria | Dónde vive |
| --- | --- | --- | --- |
| R1 | Sustituir una **expresión de referencia** por el valor al que apunta | `resolución de la referencia`, `momento de resolución` | RN-24, RC-11, CU-35, MC, IDX |
| R2 | La **vía elegida** para resolver un conflicto de dirección, de las que la clase de conflicto admite | `resolución del conflicto`, `la resolución elegida` | CU-21, CU-20, IDX; el algoritmo y sus tres clases vienen del anexo E-8 del intake |

**Evidencia de la colisión.** Los dos referentes conviven en `CU-24`, la aplicación en lote: el flujo resuelve referencias de variable (R1) y valida conflictos de dirección cuya resolución el administrador elige (R2). Una sección que diga «antes de aplicar la resolución» admite las dos lecturas, y producen operaciones distintas.

**Por qué esta familia conviene tenerla escrita.** Es exactamente la que una **sustitución global de la cadena `soluci`** destruye, convirtiendo «resolución» en «reproducto». `Vocabulario-Rules` §9.5 documenta que esa sustitución produjo treinta ocurrencias de una palabra inexistente en el propio framework. **En esta categoría había 121 ocurrencias de «resolución» sobre los cien archivos al abrir este lote**, y las 121 se verificaron intactas al cerrarlo; el conteo sobre los mismos cien archivos pasa a **128** por las siete menciones nuevas que el índice maestro y el `README.md` agregan al declarar la sustitución, y a **151** contando este glosario.

### 3.3 «ámbito» — tres referentes

| # | Referente | Forma calificada obligatoria | Dónde vive |
| --- | --- | --- | --- |
| R1 | **Permiso** concreto asociado a un token de API | `ámbito del token`, y «ámbito mínimo» cuando se nombra el principio | CU-32, CU-33, CU-37, MC, IDX, RME. **Ya declarado en el glosario raíz**: ver §4.1 |
| R2 | **Alcance de visibilidad** de una variable o de una referencia: el propio servicio, otro servicio del mismo proyecto SelfHosted, o el proyecto SelfHosted | `ámbito de la variable`, `ámbito de una referencia` | RN-21, RN-27, RN-28, RN-37, CU-35, CU-36, RC-03, RC-04, IDX |
| R3 | **Título de sección** de toda regla de negocio: el punto 3 de la estructura obligatoria de `Rules-Especificacion-Funcional` §4.2.1 | `Ámbito de aplicación`, siempre completo y como título | Las **40 RN**, verificado una por una |

**Evidencia de la colisión.** R2 y R3 colisionan dentro de la misma regla: `RN-21` se titula «Validez del ámbito de una referencia» y su sección 3 se titula «Ámbito de aplicación». Un subagente que reciba «§3 de RN-21» lee dos veces la palabra con dos referentes distintos en el mismo despacho. R1 y R2 colisionan en `CU-33`, que dispara un despliegue con credencial de ámbito mínimo y resuelve referencias cuyo ámbito valida `RN-21`.

**Regla de uso.** La forma desnuda «el ámbito» **no se admite** en ninguno de los tres. R3 conserva su forma de título tal cual, porque es estructura obligatoria de la regla de la categoría y no vocabulario del dominio.

### 3.4 «higiene» — dos referentes

| # | Referente | Forma calificada obligatoria | Dónde vive |
| --- | --- | --- | --- |
| R1 | Conjunto de condiciones del **modelo** que el sistema detecta y advierte sin bloquear: variables compartidas huérfanas, nombres repetidos en el mismo ámbito, claves que ya existen al instanciar y referencias sin uso | `higiene del modelo` | CU-36, RN-37, RC-04, MC, IDX. **Ya declarado en el glosario raíz**: ver §4.1 |
| R2 | Administración del ciclo de vida de las **imágenes** del almacén: inventariar, conservar y limpiar | `higiene de imágenes` | CU-37, IDX |

**Evidencia de la colisión.** Los dos referentes son operaciones distintas con actores distintos, y el corpus tiene además una tercera forma calificada que los toca a los dos: **`higiene del registro`**, el nombre de `CU-36`, donde «registro» es R1 de §3.1 —el registro del sistema— y «higiene» es R1 de esta familia. Una sección suelta que diga «la revisión de higiene» no permite decidir si el objeto es el modelo o el almacén de imágenes, y las dos revisiones producen informes distintos.

**Regla de uso.** La forma desnuda «higiene» no se admite. Las tres formas calificadas —`higiene del modelo`, `higiene de imágenes`, `higiene del registro`— no colisionan entre sí y se usan tal cual.

### 3.5 «huérfano» — dos referentes

| # | Referente | Forma calificada obligatoria | Dónde vive |
| --- | --- | --- | --- |
| R1 | **Servicio** cuyo contenedor vinculado ya no existe en el motor de contenedores | `servicio huérfano` | CU-28, RN-39, IDX, RME. **Ya declarado en el glosario raíz**: ver §4.1 |
| R2 | **Variable compartida del proyecto** que no tiene ninguna referencia que la apunte. **Referente nuevo respecto del glosario raíz**, que sólo declara R1 como término y menciona R2 dentro de la definición de «higiene del modelo» | `variable compartida huérfana` | CU-34, CU-36, RN-37 |

**Evidencia de la colisión.** Los dos referentes conviven en `CU-36`, la revisión de higiene: el mismo caso de uso informa condiciones sobre variables compartidas huérfanas (R2) y el estado del registro del sistema, que incluye servicios cuyo contenedor no existe (R1). La forma desnuda «los huérfanos» en esa sección no es resoluble, y las dos condiciones tienen tratamientos distintos: R1 se reconcilia, R2 se advierte sin bloquear.

### 3.6 «procedencia» — tres referentes

| # | Referente | Forma calificada obligatoria | Dónde vive |
| --- | --- | --- | --- |
| R1 | Copia que el **servicio instanciado** conserva del ítem del catálogo y de la versión de contenido de los que salió, **desvinculada** del ítem original | `procedencia del servicio` | RN-39, CU-16, CU-17, MC, RC-19 |
| R2 | De dónde salió una **imagen** del almacén, que el inventario de higiene informa junto a su pertenencia, su uso y su tamaño | `procedencia de la imagen` | CU-37, RN-40 |
| R3 | El **bloque de procedencia del framework**: el registro de con qué versión del conjunto normativo se emitió un documento. **No es vocabulario del dominio**: es forma del artefacto | `bloque de procedencia` | RN-01 a RN-14, verificado en catorce artefactos |

**Evidencia de la colisión.** R1 y R2 colisionan en `CU-37`, que nombra la procedencia de cada imagen del inventario y opera sobre servicios que llevan procedencia del catálogo. R3 colisiona con los dos en cualquier lote de migración normativa que lea una regla completa: la sección de control de cambios nombra el bloque de procedencia y el enunciado nombra la procedencia del servicio.

**Regla de uso.** La forma desnuda «la procedencia» se admite **sólo** para R1, que es el referente por defecto en esta categoría, y sólo cuando la sección ya lo fijó.

### 3.7 «etiqueta» — dos referentes

| # | Referente | Forma calificada obligatoria | Dónde vive |
| --- | --- | --- | --- |
| R1 | **Nombre reasignable de una imagen**, que no identifica nada de forma estable. Su contraparte estable es el digesto | `etiqueta de la imagen`, «etiqueta flotante» cuando se nombra la propiedad | RN-39, CU-15, CU-16, CU-37, CU-38, CU-08 |
| R2 | **Nombre de un campo de la cabecera de metadatos** de un documento del framework: `**Producto:**`, `**Proyecto de código:**` | `etiqueta de cabecera` | Los 98 artefactos hermanos, en su sección de control de cambios |

**Evidencia de la colisión.** R2 nació con la migración normativa: la corrección de la cabecera que el plan §3.5 Paso 2.b ordena se registra en el control de cambios de cada artefacto con la expresión «la etiqueta `Proyecto` pasa a `Producto`». En `CU-15`, `CU-37` y `CU-38` el cuerpo habla de etiquetas de imagen y el control de cambios de etiquetas de cabecera, en el mismo archivo. La forma desnuda «la etiqueta» se admite **sólo** para R1.

### 3.8 «modo de red» — dos referentes

**Familia declarada en la versión 1.0 al cerrar `P1-r2-02`.** El término entró a la tabla de §2.3 por la regla de inclusión —catorce artefactos— y el barrido devolvió con él sus dos referentes.

| # | Referente | Forma calificada obligatoria | Dónde vive |
| --- | --- | --- | --- |
| R1 | El **modo de la red del proyecto SelfHosted**: bridge o macvlan, elegido en el alta del proyecto, con bridge como valor por defecto de un proyecto nuevo. Gobierna la red que todos los servicios del proyecto comparten | `modo de la red del proyecto` | CU-01, IDX, MC, RME |
| R2 | El **modo de red del servicio**: bridge o macvlan, declarado por servicio. Gobierna qué puede declarar ese servicio —en macvlan no publica puertos— y decide el canal alcanzable de una arista que referencia el host | `modo de red del servicio` | CU-03, CU-04, CU-06, CU-18, CU-35, MC, RC-19, RN-04, RN-07, RN-08, RN-38 |

**Evidencia de la colisión.** Los dos referentes conviven en la **misma sección** en dos lugares verificados. En `Modelo-Conceptual.md` §2, la tabla de atributos clave declara la fila `Red del proyecto — Modo` y la fila `Servicio — Modo de red y dirección` **dentro de la misma tabla**; y §6.1 del mismo documento escribe la distinción explícita al declarar dónde usa «macvlan»: «modo de la red del proyecto **y** modo de red del servicio». Y en `CU-08` §4 paso 4 la traducción deriva «la red: modo, alias, dirección fija, interfaz padre, subred y pasarela, distinguiendo el caso en que el proyecto crea la red del caso en que la consume»: el mismo paso toca los dos niveles y **usa la forma desnuda «modo»**, que es por lo que `CU-08` no figura en ninguna de las dos filas de arriba. Un subagente que reciba esa sección suelta y lea «el modo» no puede decidir si el sujeto es el proyecto o el servicio, y las dos declaraciones se validan con reglas distintas: la del proyecto fija la red que todos comparten, la del servicio gatea sus puertos y su canal alcanzable.

**Regla de uso.** La forma desnuda «el modo» **no se admite** en ninguno de los dos. La forma `modo de red` a secas se admite **sólo** para R2, que es el referente por defecto en esta categoría —once de los catorce artefactos—, y sólo cuando la sección ya lo fijó; para R1 se escribe siempre `modo de la red del proyecto`. Los valores `bridge` y `macvlan` no se califican: son los mismos dos valores en los dos referentes y no colisionan, y calificarlos sería el falso positivo de §9.1.

### 3.9 Criterio negativo: polisemias verificadas que no se califican

`Vocabulario-Rules` §9.1 y su criterio negativo de §10: **una polisemia con contextos disjuntos no se califica, y reportarla es un hallazgo del informe de auditoría y no del documento auditado.** Las cuatro constancias de abajo se dejan escritas para que una ronda posterior no las levante.

| Caso verificado | Por qué no se califica |
| --- | --- |
| **«registro» con el sentido corriente de «anotación»** | El lote del modelo conceptual verificó **cuatro ocurrencias** en `Modelo-Conceptual.md` con ese sentido —«Registro, no clase distinta de variable», «Registro de dependencia», «Registro del disparador» en §2, y «Registro de una operación» en §1.13— y **ninguna es ninguno de los cinco referentes de §3.1**. Es el verbo sustantivado del castellano corriente, no un objeto del dominio. Calificarlas sería el falso positivo que §9.1 describe |
| **La familia «proyecto», con sus tres referentes** | El intake §12 la declara con evidencia y decide **no calificar el tercero**, porque los tres contextos son disjuntos: producto (servicios, redes, lienzo), código (repositorio, capas, compilación) y proceso (etapas, alcance, plazos). `Vision-Producto.md` §9 transcribe la decisión. Esta categoría la respeta y **no la reabre**: «proyecto SelfHosted» y «proyecto de código» se escriben completos donde el otro está cerca, y «proyecto» a secas queda para el emprendimiento —«el agente humano del proyecto»— sin calificar |
| **«migración» dentro de las secciones de control de cambios** | Las filas de control de cambios de los 98 artefactos hermanos usan la forma calificada «migración normativa», que es la que `Vocabulario-Rules` §4 R6 exige. Las menciones históricas a intervenciones anteriores del framework **no se reescriben**, por `SDD-Development-Guide.md` §VI.2, y por eso el referente viejo sigue vivo sin que eso sea un defecto del documento |
| **«repositorio remoto», con sus dos usos** | Constancia agregada al cerrar `P1-r2-02`, con el término. En seis artefactos —`CU-03`, `CU-13`, `CU-15`, `IDX`, `MC` y `RN-08`— nombra la **variante de origen** del servicio; en `CU-32` y `CU-33` nombra el repositorio **donde vive el automatismo** y donde se guarda su token, en la única oración de cada uno que dice que ningún secreto entra al repositorio. Los dos contextos son **disjuntos**: el alta y la construcción de una imagen por un lado, la emisión de credenciales de máquina por el otro, y ninguna sección nombra los dos. **No se califica**: es el caso exacto que §9.1 describe, y la fila de §2.2 deja la constancia en lugar de cargar el texto |

---

## 4. Términos referenciados y no redefinidos

Materializa la regla de no duplicación de `Rules-Especificacion-Funcional` 4.0 §3.3: un término que el glosario del dominio de 00 ya declara con la misma semántica **se referencia y no se redefine**.

### 4.1 Términos del glosario raíz que esta categoría usa

Los **dieciocho** términos que el punto 6 heredado del modelo conceptual ya declaraba como referenciados, verificados uno por uno contra [`Vision-Producto.md`](../00-Contexto/Vision-Producto.md) §9. Cada fila apunta al glosario raíz; la columna de precisión declara **qué le agrega esta categoría sin redefinirlo**.

| Término | Puntero | Qué precisa esta categoría, sin redefinirlo |
| --- | --- | --- |
| Proyecto SelfHosted | [`Vision-Producto.md` §9](../00-Contexto/Vision-Producto.md#9-glosario-del-dominio) | Su modelo conceptual como entidad, su identificador legible y su red |
| Proyecto de código | [`Vision-Producto.md` §9](../00-Contexto/Vision-Producto.md#9-glosario-del-dominio) | Nada. Aparece **sólo** en el contraste de vocabulario de IDX §8: no es una entidad del modelo ni un objeto del dominio |
| Capa | [`Vision-Producto.md` §9](../00-Contexto/Vision-Producto.md#9-glosario-del-dominio) | Nada. Es el término que reemplaza a «proyecto de código» al hablar de una de las cuatro divisiones internas |
| Servicio | [`Vision-Producto.md` §9](../00-Contexto/Vision-Producto.md#9-glosario-del-dominio) | Su **estado de configuración**, que el glosario raíz no declara, y sus ocho dimensiones de configuración |
| Despliegue | [`Vision-Producto.md` §9](../00-Contexto/Vision-Producto.md#9-glosario-del-dominio) | Su **resultado por contenedor**, su línea de tiempo y su bloque de imagen |
| Arista o enlace | [`Vision-Producto.md` §9](../00-Contexto/Vision-Producto.md#9-glosario-del-dominio) | Sus dos ejes como términos propios: **espera al destino** y **referencia el host** |
| Changeset | [`Vision-Producto.md` §9](../00-Contexto/Vision-Producto.md#9-glosario-del-dominio) | Nada. El cuerpo de 02 lo nombra casi siempre con su forma de lectura: ver §4.2 |
| Adopción | [`Vision-Producto.md` §9](../00-Contexto/Vision-Producto.md#9-glosario-del-dominio) | La **traza de adopción** del servicio, y el vocabulario de la operación: candidato, motivo de no incorporabilidad, descubrimiento |
| Huérfano | [`Vision-Producto.md` §9](../00-Contexto/Vision-Producto.md#9-glosario-del-dominio) | **Un referente nuevo**, la variable compartida huérfana: ver [§3.5](#35-huérfano--dos-referentes) |
| Referencia de variable | [`Vision-Producto.md` §9](../00-Contexto/Vision-Producto.md#9-glosario-del-dominio) | Su **forma vinculada**, su **momento de resolución** y su **último valor resuelto** |
| Variable compartida del proyecto | [`Vision-Producto.md` §9](../00-Contexto/Vision-Producto.md#9-glosario-del-dominio) | La ausencia deliberada de unicidad de su clave, y la prohibición de que contenga referencias |
| Objeto con identidad | [`Vision-Producto.md` §9](../00-Contexto/Vision-Producto.md#9-glosario-del-dominio) | Los cuatro objetos que el modelo declara y no diseña: secreto, red del proyecto, imagen, y el volumen o directorio de un montaje |
| Catálogo | [`Vision-Producto.md` §9](../00-Contexto/Vision-Producto.md#9-glosario-del-dominio) | La **plantilla** y las dos versiones —de contenido y de formato— como términos propios |
| Subgrafo parametrizado | [`Vision-Producto.md` §9](../00-Contexto/Vision-Producto.md#9-glosario-del-dominio) | Su instanciación como N servicios y N contenedores, con su informe |
| Modo pendiente | [`Vision-Producto.md` §9](../00-Contexto/Vision-Producto.md#9-glosario-del-dominio) | Su relación con el estado de configuración `pendiente-de-aplicar` del servicio |
| Higiene del modelo | [`Vision-Producto.md` §9](../00-Contexto/Vision-Producto.md#9-glosario-del-dominio) | **Un referente hermano**, la higiene de imágenes: ver [§3.4](#34-higiene--dos-referentes) |
| Token de API | [`Vision-Producto.md` §9](../00-Contexto/Vision-Producto.md#9-glosario-del-dominio) | El **resumen del token** y su exhibición única |
| Ámbito | [`Vision-Producto.md` §9](../00-Contexto/Vision-Producto.md#9-glosario-del-dominio) | **Dos referentes nuevos**: el de una variable o referencia, y el título de sección de las reglas. Ver [§3.3](#33-ámbito--tres-referentes) |

**Ninguna entrada de este glosario contradice a `Vision-Producto.md` §9.** Los dieciocho términos se usan con la semántica que 00 les fija. Las precisiones de la tercera columna son atributos del modelo o del caso de uso, y viven ahí; no son redefiniciones.

**Los veinticuatro términos que la versión 1.0 sumó al cerrar `P1-r2-02` se cruzaron uno por uno contra los treinta y cuatro del glosario raíz, y ninguno está ahí**: los veinticuatro entran a §2 como término propio de esta categoría y **ninguno se agrega a esta lista**, porque referenciar un término que 00 no declara sería un puntero roto. Dos de ellos sí tienen fuente aguas arriba fuera del glosario raíz y se transcriben de ella sin reinterpretarla: **política de reinicio**, que el `PRODUCT-INTAKE` §12 declara con sus cuatro valores y que `Vision-Producto.md` §9 no trasladó, y **máquina de estados**, que el anexo E-17 del intake declara. El resto sale del cuerpo de los cien artefactos hermanos, y en particular de las entidades y los atributos de [`Modelo-Conceptual.md`](Modelo-Datos/Modelo-Conceptual.md) §1 y §2.

Las precisiones de la tercera columna que quedaban **implícitas** ahora tienen término propio y verificable: los cuatro objetos con identidad que la fila «Objeto con identidad» enumera —secreto, red del proyecto, imagen, y el volumen o directorio de un montaje— tienen los cuatro su fila en §2; y la fila «Referencia de variable» apunta a **variable de servicio**, que es la clase de variable sobre la que la referencia se escribe.

El glosario raíz declara además términos que esta categoría **no usa** porque pertenecen al eje de proceso —etapa, hito demostrable, hito interno, puerta técnica, informe de cierre, punto de control— y otros del dominio que el cuerpo de 02 usa sin precisar: canvas o lienzo, motor de contenedores, socket del motor de contenedores, escalado horizontal, escalado vertical, autoarranque, alcance y brecha. Todos se referencian ahí y ninguno se redefine acá.

### 4.2 Equivalencias de forma, que no son polisemias

Dos términos del glosario raíz que el cuerpo de 02 nombra con otra forma. **No son términos nuevos, no son referentes distintos y no se redefinen**: se declara la equivalencia, que es lo más barato de la escalera de `Vocabulario-Rules` §9.3.

| Forma que usa el cuerpo de 02 | Término del glosario raíz | Constancia |
| --- | --- | --- |
| **Conjunto de cambios pendientes**, o «el conjunto pendiente» | **Changeset**, [`Vision-Producto.md` §9](../00-Contexto/Vision-Producto.md#9-glosario-del-dominio) | Es la **forma de lectura en castellano** y la que el cuerpo de 02 usa casi siempre: verificada en 17 artefactos, contra 4 que conservan la forma «changeset», entre ellos el nombre de archivo de `RN-12`. Las dos formas designan lo mismo |
| **Conjunto de servicios**, o «el conjunto» | **Proyecto SelfHosted**, [`Vision-Producto.md` §9](../00-Contexto/Vision-Producto.md#9-glosario-del-dominio) | El glosario raíz **ya declaró** esta equivalencia y sus dos estados —el agrupamiento de hecho, antes del producto, y el proyecto SelfHosted declarado, dentro—. Es el denominador de los criterios medibles de `NB-01`. Verificada en CU-01 y CU-16 |

---

## 5. Constancias del barrido

### 5.1 Candidatos descartados por la regla de inclusión

El barrido devolvió estos candidatos con **un solo artefacto**, de modo que la regla de inclusión de §3.3 los deja fuera: se definen en su artefacto y no entran acá. Se enumeran con su conteo para que una ronda de auditoría posterior no los levante como omisión del glosario.

| Candidato descartado | Artefactos donde aparece | Conteo | Dónde queda definido |
| --- | --- | --- | --- |
| **Informe de verificación del origen** | `CU-03` | **1** | [CU-03](Casos-De-Uso/CU-03-Alta-Y-Configuracion-De-Servicio.md) §4 paso 5. El término más general, **verificación del origen**, sí entra: aparece en cuatro artefactos y tiene su fila en §2.2 |
| **Traza de adopción** | `MC` | **1** | [Modelo-Conceptual](Modelo-Datos/Modelo-Conceptual.md) §2, atributo del servicio. La precisión ya está declarada en la fila «Adopción» de §4.1 |
| **Forma de creación** | `MC` | **1** | `Modelo-Conceptual.md` §2, atributo de la variable de servicio, con sus cinco valores |
| **Disparo externo** | `MC` | **1** | `Modelo-Conceptual.md` §2, bloque opcional del servicio, declarado ahí como **propiedad transversal y no un origen** |
| **Identificador del contenedor** | `MC` | **1** | `Modelo-Conceptual.md` §2, atributo del despliegue |
| **Marca de incorporabilidad** | `CU-06` | **1** | [CU-06](Casos-De-Uso/CU-06-Descubrimiento-De-Contenedores-Adoptables.md). Su contraparte, **motivo de no incorporabilidad**, sí entra: aparece en cuatro artefactos y tiene su fila en §2.7 |
| **Informe de importación** | `CU-11` | **1** | [CU-11](Casos-De-Uso/CU-11-Importacion-Como-Proyecto-Nuevo.md). El `PRODUCT-INTAKE` §12 lo declara, pero en 02 vive en un solo artefacto y la regla de inclusión lo deja fuera |
| **Informe de instanciación** | `CU-16` | **1** | [CU-16](Casos-De-Uso/CU-16-Alta-Desde-Plantilla-Del-Catalogo.md) |
| **Dimensión de configuración** | `MC` | **1** | `Modelo-Conceptual.md` §2. La expresión que §2.2 y §4.1 de este glosario usan al enumerar sale de ahí; las dimensiones que sí viven en más de un artefacto —montaje, verificación de salud, réplica, comando de arranque, política de reinicio, modo de red— tienen cada una su fila |
| **Huecos parametrizables** | `MC` | **1** | `Modelo-Conceptual.md` §2. El término del que dependen, **subgrafo parametrizado**, ya está en el glosario raíz y se referencia en §4.1 |

Un segundo grupo de candidatos queda fuera por un motivo distinto, que **no es el conteo**. Los tres últimos aparecen en más de un artefacto y aun así no entran, y por eso se declaran acá con su conteo: la regla de inclusión de §3.3 alcanza al **término del dominio que esta categoría acuña o precisa**, según el alcance del encabezado de §1, y no al vocabulario que el cuerpo usa con su sentido corriente.

| Candidato | Conteo | Por qué no entra |
| --- | --- | --- |
| **Brecha declarada de cobertura** | **0 en cuerpo** | **No es vocabulario del dominio del producto**: es forma del artefacto. El barrido no encontró la expresión en ningún cuerpo; sus dos únicas ocurrencias, en `RN-02` y `RN-08`, están **dentro de filas históricas de control de cambios**, que no se reescriben. El término del que deriva, **brecha**, ya está declarado en [`Vision-Producto.md` §9](../00-Contexto/Vision-Producto.md#9-glosario-del-dominio) y se referencia ahí |
| **Vocabulario de industria del sustrato de contenedores**: dispositivos (**5**), subred (**3**), pasarela (**3**), límites de recursos (**3**), contexto de construcción (**3**), capacidades (**2**), argumentos de construcción (**2**) | del **2** al **5** | Esta categoría **los usa y no los acuña ni los precisa**: significan en 02 exactamente lo que significan fuera de 02, y ninguna regla ni ningún caso de uso les fija un sentido propio. Viven enumerados dentro de la entrada que los agrupa —dimensiones de configuración del servicio, parámetros de la red, datos obligatorios de la variante de origen— y no como término. Declararlos duplicaría el glosario de industria que §1 excluye por escrito |
| **Solicitante** | **4** | Dos usos, ninguno acuñado: en `Modelo-Conceptual.md` §2 es un atributo del despliegue con cuatro valores enumerados —interfaz, API, autoarranque o política—, y en `CU-20` y `CU-21` «el servicio solicitante» es el adjetivo corriente que nombra al servicio que pide la dirección frente al que la ocupa. Los contextos son disjuntos y ninguno de los dos es término del dominio |
| **Archivo de variables** | **3** | Es el archivo que acompaña al archivo de composición en la exportación. Ya está declarado **dentro** de la fila «Marcador de variable» de §2.4, que es donde tiene consecuencia: es ahí donde la exportación deja la entrada vacía cuando el valor es secreto |

### 5.2 Términos sin fuente, declarados pendientes

**Ninguno.** Los **ciento seis** términos de §2, las ocho familias de §3 y los dieciocho referenciados de §4.1 salieron todos de una de las tres fuentes de §1.4. No hubo ningún término que la regla exigiera y que ninguna fuente declarara, de modo que no hay ninguna definición emitida como pendiente ni ninguna redactada de cero.

**Esta declaración se rehizo al cerrar `P1-r2-02`, y no se heredó.** La versión que el hallazgo levantó decía «ninguno» sobre los ochenta y dos términos de entonces, y era cierta sobre lo que el barrido había medido: lo que faltaba no era fuente para un término declarado, sino la medición de la dirección directa de la regla de inclusión. Los **veinticuatro** términos que entraron después se rastrearon uno por uno a su fuente antes de escribirse —§1 de `Modelo-Conceptual.md` para las cinco entidades, §2 del mismo documento para los atributos, el enunciado de `RN-08` para las cuatro variantes de origen, el cuerpo de los casos de uso para el resto, el `PRODUCT-INTAKE` §12 para la política de reinicio y su anexo E-17 para la máquina de estados—, y **ninguno de los veinticuatro quedó sin fuente**, de modo que esta sección sigue declarando «ninguno» por la razón correcta.

Se deja constancia de un límite del artefacto, que **no es un pendiente de fuente sino una dependencia declarada aguas arriba**: siete entradas de §2.8 y de §2.2 —imagen, digesto, marca de pertenencia, conservada, limpieza, almacén de imágenes y volver a un despliegue anterior— describen vocabulario de dos casos de uso que **no son implementables hoy**, `CU-37` y `CU-38`, porque dependen de las decisiones abiertas `Q-15` a `Q-21` del intake §19. El vocabulario está declarado; su exigibilidad depende de esas decisiones, y las dos brechas que lo declaran son **B-23** y **B-24** del índice maestro. Ninguna de las siete definiciones se inventó: todas salen del punto 6 heredado o del cuerpo de esos dos casos de uso.

---

## 6. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 1.0 | 2026-07-30 | **Emisión inicial**, en la fase M4 corte 3 de la migración normativa del conjunto 4.1 al 6.0, sobre el plan [`Plan-Migracion-4.1-a-6.0.md`](../Audit/Plan-Migracion-4.1-a-6.0.md) y la fila de este documento en su §4. Clasificación **regenerar contenido · emisión inicial**: el artefacto **no existía** en el destino. `Rules-Especificacion-Funcional` 4.0 §2.1 lo declara obligatorio para los ocho tipos D8 y §4.2.4 fija sus cinco secciones; hasta la versión 3.0 de esa regla el glosario de la categoría era el punto 6 de `Modelo-Datos/Modelo-Conceptual.md`, documento condicional a la persistencia, y el motivo declarado del cambio es que el vocabulario de 02 no puede depender de ese flag. **Fuentes de contenido, sin una cuarta**: el punto 6 heredado, archivado íntegro en `Modelo-Datos/_legacy/2026-07-30/Modelo-Conceptual-v1.1.md` §6, con sus 32 entradas —14 a la tabla de §2 y 18 a los referenciados de §4.1—; los 98 artefactos hermanos de la categoría; y el upstream de `Vision-Producto.md` §9 y del `PRODUCT-INTAKE-SelfHosted-Service` §12 y §20. **Ninguna definición se redactó de cero** y §5.2 declara que no quedó ninguna sección pendiente por falta de fuente. **Regla de inclusión de §3.3 aplicada por ocurrencia** sobre los cien archivos de la categoría sin `_legacy/`: entraron a §2 los términos verificados en más de un artefacto, y §5.1 declara el único candidato descartado por vivir en uno solo, `Informe de verificación del origen` en `CU-03`, con su conteo. **Sección 3 no vacía**, como §4.2.4 punto 3 exige: siete familias polisémicas declaradas con sus referentes, su forma calificada y su evidencia de colisión por artefacto —«registro» con **cinco** referentes, uno más que los cuatro de la entrada heredada, porque esta migración renombró el actor `Registro de la solución` a **`Registro del producto`**; «resolución» con dos; «ámbito» con tres; «higiene» con dos, más la forma `higiene del registro` que toca a las dos familias; «huérfano» con dos, siendo la variable compartida huérfana referente nuevo respecto del glosario raíz; «procedencia» con tres; y «etiqueta» con dos, siendo la etiqueta de cabecera referente que nació con esta migración—. **§3.8 declara el criterio negativo** de `Vocabulario-Rules` §9.1 sobre tres casos verificados y no calificados: las cuatro ocurrencias de «registro» con el sentido corriente de «anotación» en el modelo conceptual, que no son ninguno de los cinco referentes; la familia «proyecto» con sus tres referentes de contextos disjuntos, que el intake §12 decidió no calificar y que esta categoría no reabre; y las menciones históricas de «migración» en las filas de control de cambios, que no se reescriben. **§4.2 declara dos equivalencias de forma en lugar de duplicar términos**: «conjunto de cambios pendientes» como forma de lectura de «changeset», verificada en 17 artefactos contra 4 que conservan la forma inglesa, y «conjunto de servicios» como forma de lectura de «proyecto SelfHosted», que el glosario raíz ya había declarado. **Cabecera** según §4.1 y la resolución del orquestador del plan §3.5 Paso 2.b: los dos campos conviven, `**Proyecto de código:** SelfHosted-Service` porque la categoría es de nivel proyecto de código, y `**Producto:** SelfHosted Service` porque `Migracion-Rules` §4.2 prohíbe perder el valor del origen; los dos difieren **sólo por el guion** y no son intercambiables. **Barrido negativo corrido** al cerrar: cero «reproducto», y las **121 ocurrencias de «resolución»** de la categoría verificadas intactas, que es la familia que la sustitución de la cadena `soluci` destruye. Ninguna sustitución se hizo por reemplazo global de cadena, según `Vocabulario-Rules` §9.5. Las **cuatro** ocurrencias de la cadena «reproducto» que el barrido devuelve en la categoría están todas **entrecomilladas y como cita del daño** que el procedimiento prohibido produce: una en §3.2 de este documento, dos en esta fila y una en el control de cambios del `README.md`. **Ninguna es daño real**, y el barrido sobre el cuerpo de los 101 archivos da cero. **No se editó ningún artefacto hermano**, y ninguna fila histórica de control de cambios se reescribió, por `SDD-Development-Guide.md` §VI.2: las diez filas de `RN-17`, `CU-01`, `CU-02`, `CU-11`, `CU-14`, `CU-20`, `CU-26`, `CU-31`, `CU-36` y del `README.md` que remiten a `Modelo-Datos/Modelo-Conceptual.md` §6 como lugar del glosario **quedan como están**, y el punto 6 de ese documento quedó como remisión navegable a este artefacto. Arranca en **1.0** por ser emisión inicial, en estado `Propuesto` como el resto de la categoría. — **Cierre de `P1-r2-02`, dentro de esta misma versión 1.0 y sin subirla ni archivar**, porque el documento se emitió hoy y ninguna categoría aguas abajo lo consumió todavía; ninguna fila histórica de control de cambios de este documento ni de ningún hermano se reescribió, por `SDD-Development-Guide.md` §VI.2. **Qué levantaba el hallazgo**: la regla de inclusión de `Rules-Especificacion-Funcional` 4.0 §3.3 estaba incumplida, y la ronda 1 la había dado por cumplida **midiendo sólo la dirección inversa** —que ningún término declarado sobrara— y no la directa que la regla enuncia. **Verificación propia antes de tocar nada**, por ocurrencia sobre los cien archivos sin `_legacy/` y sin contar este glosario: los cuatro conteos que el hallazgo enumera **reproducen los cuatro**, `Variable de servicio` **12**, `Nombre visible` **4** y `Comando de arranque` **4** exactos, y `Evento de auditoría` **24** contando la forma plural y **23** sin ella, de modo que el 24 del informe es el correcto y **ninguno de los cuatro resultó falso positivo**: los tres que podían serlo se leyeron ocurrencia por ocurrencia —«variable de servicio» nunca aparece dentro de «variable de servicio destino», «nombre visible» es el atributo del modelo en los cuatro artefactos y no prosa corriente, y las dos ocurrencias de `Comando de arranque` en `IDX` y `CU-15` son el atributo y no el sustantivo común—. Ninguno vive en un solo artefacto por referente y **ninguno de los cuatro fue a §5.1**. **El hueco se cerró entero y no sólo en los cuatro casos que el auditor alcanzó a nombrar**: el barrido en la dirección directa devolvió **veinticuatro** términos, los cuatro del hallazgo, los ocho que el hallazgo menciona sin numerar en su párrafo de cierre —`Modo de red` **14**, `Red del proyecto` **10**, `Dirección fija` **8**, `Configuración observada` **6**, y las cuatro variantes de origen sin fila propia, `Repositorio remoto` **8**, `Imagen de registro público` **4**, `Imagen de registro privado` **4** y `Sin origen` **4**— y **doce más que ninguna ronda había nombrado**: `Secreto` **24**, `Nodo del lienzo` **10**, `Archivo de composición` **8**, `Máquina de estados` **7**, `Política de reinicio` **5**, `Interfaz padre` **5**, `Clasificación de variables` **5**, `Puerto de destino` **4**, `Volumen o directorio de montaje` **2**, y las tres secciones de forma de la regla conceptual de modelo que §2.10 no declaraba junto a `Momento de validación`, `Tipo de restricción` **20**, `Entidades involucradas` **19** y `Mecanismo de verificación conceptual` **19**. Cinco de los veinticuatro son **entidades del modelo conceptual** que ni el punto 6 heredado ni el glosario raíz declaraban —`Evento de auditoría`, `Variable de servicio`, `Red del proyecto`, `Secreto` y `Volumen o directorio de montaje`—, con lo que las dieciséis entidades de `Modelo-Conceptual.md` §1 quedan las dieciséis cubiertas entre §2 y §4.1. **Los veinticuatro llevan la marca `[+P1-r2-02]` en la primera columna de §2.** **Conteos actualizados a mano, fila por fila, no por grep**: §2 pasa de **82** a **106** términos y su reparto de 6 + 21 + 18 + 11 + 6 + 6 + 3 + 6 + 3 + 2 a **7 + 29 + 23 + 13 + 8 + 6 + 5 + 6 + 4 + 5**; §5.2 pasa de «ochenta y dos» a «ciento seis» y de siete a **ocho** familias; §1.3 y §3 pasan de siete a **ocho** familias; §1.4 corrige la segunda fuente de **98** a **cien artefactos hermanos**, sumando el índice maestro y el `README.md`, que ya figuraban como fuente en la tercera columna de §2 y en la convención de §2 desde la emisión; y §1.1 reemplaza el criterio «más de doce artefactos» por el que la tabla venía aplicando —se declara el conjunto cuando **tiene nombre**, se enumera en los demás casos—, que es lo que ya hacían las filas de `Imagen` y `Registro del producto`. **Referenciados al glosario raíz: cero.** Los veinticuatro se cruzaron uno por uno contra los treinta y cuatro términos de `Vision-Producto.md` §9 y **ninguno está ahí**, de modo que §4.1 sigue con **dieciocho** filas y ninguno se agregó como referencia rota; §4.1 sí gana la constancia del cruce y la de que los cuatro objetos con identidad y la clase de variable que sus precisiones nombraban ahora tienen término propio. **Descartados: nueve nuevos por conteo de uno**, con su artefacto —`Traza de adopción`, `Forma de creación`, `Disparo externo`, `Identificador del contenedor`, `Dimensión de configuración` y `Huecos parametrizables` en `MC`; `Marca de incorporabilidad` en `CU-06`; `Informe de importación` en `CU-11`; `Informe de instanciación` en `CU-16`—, que llevan §5.1 de **1** a **10** filas de descarte por conteo; y **tres grupos nuevos descartados por motivo distinto del conteo**, declarados con su conteo aunque vivan en más de un artefacto porque el alcance de §1 los excluye: el vocabulario de industria del sustrato de contenedores —dispositivos **5**, subred **3**, pasarela **3**, límites de recursos **3**, contexto de construcción **3**, capacidades **2**, argumentos de construcción **2**—, `Solicitante` **4** y `Archivo de variables` **3**. **Polisemias nuevas: una.** §3 suma **§3.8, «modo de red» con dos referentes** —el de la red del proyecto y el del servicio—, con sus formas calificadas y la evidencia de colisión por sección y no por documento, que son la tabla de atributos clave de `Modelo-Conceptual.md` §2, su §6.1 y el paso 4 de `CU-08` §4; el criterio negativo pasa de §3.8 a **§3.9** y sus tres punteros internos se movieron con él. **Ninguna otra polisemia se declaró**, y §3.9 suma una cuarta constancia de **no** calificación por el criterio negativo de `Vocabulario-Rules` §9.1 y §10: los dos usos de «repositorio remoto», la variante de origen en seis artefactos y el repositorio del automatismo en `CU-32` y `CU-33`, cuyos contextos son disjuntos y a los que calificar sería el falso positivo. **Ninguna definición se redactó de cero, tampoco en este cierre**: las cinco entidades salen de `Modelo-Conceptual.md` §1, los atributos de su §2, las cuatro variantes de origen del enunciado y la tabla de `RN-08` y de la tabla de vías de alta de `CU-03`, las tres secciones de forma de la estructura obligatoria de `Rules-Especificacion-Funcional` §4.2.3 verificada en las 19 RC, `Política de reinicio` del `PRODUCT-INTAKE` §12 y `Máquina de estados` de su anexo E-17 vía `CU-28` y `MC`. **Barrido negativo del cierre**: cero ocurrencias nuevas de la palabra inexistente que la sustitución de la cadena `soluci` produce —la cuenta de la categoría **no se mueve** y sigue siendo la de cuatro entrecomilladas que esta misma fila enumera—, cero concordancias de género o de número rotas en las filas nuevas, cero filas históricas tocadas, y los enlaces internos nuevos y los movidos resuelven contra los anclas que existen. **No se editó ningún artefacto hermano**: el cierre es de este documento solo |
