# CU-37 — Higiene de imágenes: listar, conservar y limpiar

**Proyecto de código:** SelfHosted-Service
**Producto:** SelfHosted Service
**Documento:** CU-37-Higiene-De-Imagenes.md
**Versión:** 2.1
**Estado:** Propuesto
**Fecha:** 2026-07-30
**Autor:** Analista Funcional Senior (AG-02)

**Necesidad de negocio upstream:** [NB-07](../../01-Necesidades-Negocio/Necesidades-De-Negocio/NB-07-Atribucion-Del-Consumo-Del-Servidor.md)
**Trazabilidad upstream:** PRODUCT-INTAKE **v3.2** anexo E-23 (la imagen como objeto con identidad, sus tres campos determinantes y su tabla de qué quedó decidido y qué queda abierto); anexo E-3 y §17.P.11 DA-07, la retención de despliegues por servicio; §17.P.10, requerimientos no funcionales de recursos del servidor; E-16 RN-17, RN-40

> **Dos de las decisiones que lo bloqueaban quedaron cerradas el 2026-07-30, y tres siguen abiertas.** `Q-15` decidida en positivo: **el despliegue registra el digesto**, de modo que el paso 5 tiene con qué resolver el uso de cada imagen y este caso de uso deja de ser inejecutable por falta de entidad sobre la que operar. `Q-17` decidida: **la limpieza es sugerida** —el sistema detecta espacio recuperable y lo propone, el usuario confirma—, de modo que el disparo deja de ser incógnita. **Siguen abiertas `Q-16`, `Q-18` y `Q-21`**, que condicionan la marca de pertenencia, el ámbito de credencial de la operación y quién puede marcar una imagen como conservada. **Los tramos que dependen de una decisión abierta siguen señalados fila por fila y no se completan con un valor plausible.**

---

## Tabla de contenido

- [1. Propósito](#1-propósito)
- [2. Actores](#2-actores)
- [3. Precondiciones](#3-precondiciones)
- [4. Flujo principal](#4-flujo-principal)
- [5. Flujos alternativos](#5-flujos-alternativos)
- [6. Excepciones y errores](#6-excepciones-y-errores)
- [7. Postcondiciones](#7-postcondiciones)
- [8. Criterios de aceptación](#8-criterios-de-aceptación)
- [9. Trazabilidad](#9-trazabilidad)
- [10. Notas y supuestos](#10-notas-y-supuestos)
- [11. Control de cambios](#11-control-de-cambios)

---

## 1. Propósito

Permitir que el administrador **vea qué imágenes de contenedor ocupan su servidor, cuáles administra el producto y cuáles no, cuáles están en uso, y libere espacio sin destruir nada que necesite** —ni lo suyo que quiere conservar, ni lo ajeno que el producto no administra—.

**Por qué existe este caso de uso.** El intake retiene cincuenta despliegues por servicio y **no tenía ninguna capacidad que administrara las imágenes que esos despliegues usaron**: verificado, cero menciones de limpieza, poda, espacio en disco o retención de imágenes antes de la versión 2.4. Llenar el disco es el modo de falla más probable de un servidor autoalojado de referencia, y era el único que el producto no ayudaba a evitar ni a diagnosticar.

## 2. Actores

| Actor | Tipo | Rol |
| --- | --- | --- |
| Administrador del producto | Primario | Consulta el inventario de imágenes, marca las que quiere conservar y dispara la limpieza |
| Módulo de higiene de imágenes | Sistema | Reúne el inventario, resuelve la pertenencia y la referencia de cada imagen, y ejecuta la limpieza respetando las protecciones |
| Motor de contenedores | Sistema | Devuelve el inventario real del almacén de imágenes y ejecuta el borrado |

Los nombres de los actores no humanos son **denominaciones acuñadas por esta categoría**, salvo los seis que trazan a una fuente: `Motor de contenedores`, `Destino externo`, `Automatismo de integración continua`, `Sincronizador de estado`, `Módulo de descubrimiento` y `Resolutor de referencias`. `Módulo de higiene de imágenes` es acuñado acá y **no es un componente declarado**: su correspondencia con los módulos que el intake §17.P.2 declara la fija 05-Arquitectura-Tecnica. La convención completa está en [Especificacion-Funcional.md](../Especificacion-Funcional.md) §8.

## 3. Precondiciones

- El administrador tiene sesión iniciada (CU-30).
- El motor de contenedores es alcanzable por su punto de acceso local.
- **El despliegue registra el digesto de la imagen que usó.** Es la condición sin la cual el inventario no puede decir qué imagen está en uso. Es dato decidido desde el 2026-07-30 (`Q-15`) y lo escribe el despliegue (CU-13 paso 5, CU-15 paso 6).

## 4. Flujo principal

1. El administrador abre el inventario de imágenes.
2. El sistema consulta el almacén de imágenes del motor de contenedores y toma, de cada imagen, su digesto, su referencia legible, su etiqueta, su tamaño y su fecha de creación.
3. El sistema resuelve la **procedencia** de cada imagen: descargada de un registro, construida por el producto, construida por un automatismo externo, o **ajena** —la que existe en el almacén y el producto no administra—.
4. El sistema resuelve la **pertenencia**: si la imagen lleva la marca del producto y, cuando la lleva, a qué proyecto SelfHosted y a qué servicio corresponde.
5. El sistema resuelve el **uso**: qué despliegues la referencian por su digesto, distinguiendo los despliegues activos de los que sólo viven en el historial.
6. El sistema presenta el inventario con esas cuatro dimensiones y con el espacio total que ocupa, separando lo que administra de lo que no.
7. El administrador **marca como conservada** una imagen que quiere proteger de la limpieza, o retira esa marca.
8. **El sistema detecta espacio recuperable y propone la limpieza**, declarando cuánto liberaría y sobre qué imágenes; **el administrador la confirma**. Sin confirmación no se borra nada, y sin propuesta del sistema el administrador no tiene que acordarse de pedirla (`Q-17`, decidida el 2026-07-30).
9. El sistema determina qué imágenes son descartables y **excluye** las protegidas: las marcadas como conservadas y las que no llevan la marca de pertenencia del producto (RN-40).
10. El sistema ejecuta el borrado de las descartables y emite el **informe de la limpieza**: qué borró, qué espacio liberó, y **qué dejó con el motivo de cada exclusión**.
11. El sistema registra el evento de auditoría de la operación (RN-17).

**El disparo es sugerido, y conviene precisar qué significa eso acá.** El sistema es el que detecta y el que propone; el administrador es el que decide. No hay borrado sin confirmación —lo que descarta la forma programada— y no hace falta que el administrador se acuerde de pedirla —lo que descarta la forma manual pura—. El argumento que la decisión declara es que llenar el disco es el modo de falla más probable del servidor de referencia, y la forma sugerida lo previene sin borrar por cuenta propia.

**Lo que este flujo deliberadamente no declara, porque sigue abierto:**

| Tramo del flujo | Qué falta decidir | Pendiente |
| --- | --- | --- |
| Paso 7, la marca | Si el administrador puede marcar como conservada cualquier imagen, sólo las del producto, o si la marca se pone sola al volver a un despliegue anterior | `Q-21` |
| Paso 4, la pertenencia | Si las imágenes construidas llevan efectivamente la marca de pertenencia, que es lo que hace resoluble el paso | `Q-16` |
| Toda operación por API | Si la limpieza tiene un **ámbito de credencial propio**, distinto del de desplegar | `Q-18` |
| Paso 9, el criterio de descarte | Qué hace descartable a una imagen del producto: no tener ningún despliegue activo que la referencie, no tener ninguno en absoluto, o una antigüedad | **Sin pendiente asignada.** `Q-17` decidió **el disparo** y no el criterio, y el intake no lo declara en ninguna otra parte. Brecha nueva: ver §10 |
| Paso 8, el umbral y el lugar de la sugerencia | A partir de qué presión de disco se sugiere y en qué superficie aparece la propuesta | **No es pendiente del intake.** El intake v3.2 lo delega explícitamente a `03-UX-UI-DX` |

**Cada uno de esos cinco tramos queda declarado con su destinatario en §10, y ninguno se completa con un valor plausible.** Lo que sí queda especificado es qué se lista, qué está protegido, cómo se dispara y qué informa la operación.

## 5. Flujos alternativos

**FA-01 — Imagen ajena en el inventario.**
Disparador: el almacén contiene una imagen sin la marca de pertenencia del producto, típicamente del parque de contenedores que nadie incorporó a un proyecto, o construida por un automatismo externo.
Pasos: el sistema la lista con procedencia **ajena**, informa su tamaño para que el administrador pueda atribuir el consumo, y la **excluye de toda operación de borrado** (RN-40). El motor de contenedores es uno y compartido: borrarla sería una operación destructiva sobre trabajo de otro.
Punto de retorno: paso 6. Nunca llega al paso 10 como candidata.

**FA-02 — Imagen conservada sin ningún despliegue que la referencie.**
Disparador: una imagen marcada como conservada no tiene ningún despliegue activo que la use.
Pasos: la limpieza **no la elimina**, y el informe declara el motivo. Es exactamente el caso que la marca existe para cubrir: la versión a la que el administrador quiere poder volver es, por definición, una que hoy no está corriendo (RN-40, CU-38).
Punto de retorno: paso 10, del lado de las exclusiones.

**FA-03 — Presión de espacio en el servidor.**
Disparador: el sistema detecta que el espacio recuperable del almacén de imágenes justifica proponer una limpieza.
Pasos: el sistema **sugiere la limpieza** con lo que liberaría y sobre qué imágenes, y el administrador confirma o la descarta. Es el disparo que `Q-17` decidió el 2026-07-30, y es la razón por la que el paso 8 no arranca en una acción del administrador. **No borra nada por su cuenta y no espera a que se la pidan.** El dato de consumo ya existe: el tablero de estado del servidor lo expone (CU-26).
Punto de retorno: paso 8. Si el administrador descarta la sugerencia, el inventario queda como estaba y no hay evento de borrado.
**Lo que este flujo alternativo no fija:** a partir de qué umbral se sugiere y en qué superficie aparece la sugerencia. El intake v3.2 lo delega explícitamente a `03-UX-UI-DX` y no lo deja como pendiente de decisión de producto.

**FA-04 — Limpieza que no encuentra nada descartable.**
Disparador: todas las imágenes están en uso, conservadas o ajenas.
Pasos: el sistema emite el informe con cero borrados y con el motivo de cada exclusión. **No es un error**: es el resultado esperado en un servidor recién ordenado, y el informe tiene que dejarlo claro en lugar de parecer un fallo. En este caso el sistema **no sugiere**: sin espacio recuperable no hay propuesta que hacer, y el administrador llega a la limpieza sólo si la pide desde el inventario.
Punto de retorno: paso 11.

**FA-05 — Imagen del producto sin ningún despliegue que la referencie y sin marca de conservada.**
Disparador: el inventario contiene una imagen con la marca de pertenencia del producto, sin marca de conservada y sin ningún despliegue del historial que la referencie por su digesto.
Pasos: es la candidata natural de la limpieza y el sistema la incluye en la propuesta del paso 8. **Qué la hace exactamente descartable —ningún despliegue activo, ninguno en absoluto, o una antigüedad— no está declarado en ninguna fuente**, y este flujo no lo elige: la propuesta del paso 8 sólo puede construirse cuando ese criterio esté fijado. Ver §10.
Punto de retorno: paso 8.

## 6. Excepciones y errores

| Código | Causa | Respuesta del sistema |
| --- | --- | --- |
| Motor inalcanzable | El punto de acceso del motor de contenedores no responde | El sistema informa el error traducido a una causa identificable propia, sin propagar el tipo del cliente del motor. El inventario **no se muestra parcial ni en caché sin declararlo**: un inventario de imágenes desactualizado invitaría a borrar lo que no corresponde |
| Borrado rechazado por el motor | El motor se niega a borrar una imagen, típicamente porque un contenedor la usa | El informe declara la imagen y el motivo que devolvió el motor, y la operación **continúa con el resto**: es el mismo criterio de resultado por elemento y no por operación de RN-31 |
| Imagen protegida en la solicitud | Se solicita explícitamente borrar una imagen conservada o ajena | Rechazo, con el motivo de la protección. RN-40 no admite excepción por solicitud explícita: una imagen ajena no es del producto y no hay confirmación que lo cambie |

## 7. Postcondiciones

**En caso de éxito:** el administrador conoce el inventario de imágenes con su procedencia, su pertenencia, su uso y su tamaño; las imágenes descartables ya no ocupan espacio; **ninguna imagen conservada y ninguna imagen ajena se modificó**; existe el informe con lo borrado y lo excluido con su motivo; existe el evento de auditoría.

**En caso de fallo:** el almacén de imágenes queda como estaba o con el subconjunto que sí se pudo borrar, y el informe declara cuál fue cada caso. **No hay estado intermedio silencioso**: toda imagen que no se borró aparece en el informe con su motivo.

## 8. Criterios de aceptación

| ID | Given | When | Then |
| --- | --- | --- | --- |
| CA-01 | Un servidor con imágenes del producto y del parque no incorporado | El administrador abre el inventario | Cada imagen aparece con su digesto, su tamaño, su procedencia y su pertenencia, y el inventario separa lo que el producto administra de lo que no |
| CA-02 | Una imagen con procedencia ajena, sin ningún despliegue que la referencie | El administrador dispara la limpieza | La imagen **no se toca**, y el informe declara que se excluyó por ser ajena |
| CA-03 | Una imagen del producto, marcada como conservada, sin ningún despliegue activo que la referencie | El administrador dispara la limpieza | La imagen **no se elimina**, y el informe declara que se excluyó por estar conservada |
| CA-04 | Una imagen del producto, sin marca de conservada y sin ningún despliegue que la referencie | El administrador dispara la limpieza | La imagen **se elimina** y el informe declara el espacio liberado. Es el caso positivo: sin él, CA-02 y CA-03 pasarían con una limpieza que no hace nada |
| CA-05 | Un servidor donde todas las imágenes están en uso, conservadas o ajenas | El administrador dispara la limpieza | El informe declara cero borrados **sin presentarlo como error**, con el motivo de cada exclusión |
| CA-06 | Un servicio con etiqueta flotante que se desplegó dos veces, y el registro de imágenes devolvió contenidos distintos | El administrador abre el inventario | Las dos imágenes aparecen como **distintas**, identificadas por su digesto, y cada despliegue queda asociado a la que usó |
| CA-07 | Una solicitud por API para borrar una imagen ajena | El automatismo la envía | Rechazo con el motivo de la protección. No hay confirmación explícita que lo permita |
| CA-08 | Un servidor donde el sistema detecta espacio recuperable | El administrador abre el panel sin haber pedido nada | El sistema **propone** la limpieza declarando cuánto liberaría y sobre qué imágenes, y **no borra nada** hasta que el administrador confirma |
| CA-09 | La misma sugerencia del caso anterior | El administrador la descarta en lugar de confirmarla | No se borra ninguna imagen, el inventario queda igual y no se registra ningún evento de borrado |

## 9. Trazabilidad

| Dimensión | Referencia |
| --- | --- |
| Necesidad de negocio | [NB-07](../../01-Necesidades-Negocio/Necesidades-De-Negocio/NB-07-Atribucion-Del-Consumo-Del-Servidor.md) |
| Reglas de negocio aplicables | RN-17, RN-40. Reglas conceptuales: RC-18, que conserva el historial de despliegues y es lo que obliga a que las imágenes de ese historial tengan una política |
| Historias de usuario a generar en 06 | US-CU-37-1 (ver qué imágenes ocupan el servidor y cuánto), US-CU-37-2 (distinguir lo que el producto administra de lo ajeno), US-CU-37-3 (marcar una imagen como conservada), US-CU-37-4 (liberar espacio con un informe de qué se borró y qué se dejó), US-CU-37-5 (saber qué imagen exacta usa cada despliegue), US-CU-37-6 (recibir la sugerencia de limpieza cuando hay espacio recuperable, y confirmarla o descartarla) |
| Componentes esperados en 05 | Capa `Web`, superficie de imágenes y su controlador; capa `Application`, módulo de observabilidad o módulo propio de higiene de imágenes —la asignación la fija 05—; capa `Infrastructure`, `Contenedores`, detrás de la abstracción del motor. Referencia tentativa |
| Tests previstos en 08 | **Ninguno declarado en el anexo E-22**, que es anterior a este caso de uso. 08-Calidad-Y-Pruebas debe derivar los tres de RN-40 y los **nueve** criterios de aceptación de §8, incluidos los dos del disparo sugerido. El anexo E-23 aporta las entradas |

Los identificadores de historia de usuario llevan la forma `US-CU-XX-n` y son **provisionales**: la numeración definitiva es potestad de 06-Backlog-Tecnico.

## 10. Notas y supuestos

- **Por qué la necesidad upstream es NB-07 y no otra.** NB-07 es la atribución del consumo del servidor: saber si la presión de recursos viene de un servicio concreto. Las imágenes son consumo de disco atribuible, y este caso de uso es el que lo vuelve atribuible y accionable. La alternativa evaluada fue NB-01, visibilidad unificada de la arquitectura, y se descartó porque las imágenes no son parte de la arquitectura que el lienzo representa.
- **Brecha cerrada, `Q-15`:** el despliegue **registra el digesto** de la imagen que usó. La versión 1.0 y la 2.0 de este caso de uso la declaraban abierta y afirmaban que sin ella el caso de uso no era implementable; quedó **decidida en positivo el 2026-07-30** y el paso 5 tiene con qué resolver el uso de cada imagen. La fila se conserva en lugar de borrarse porque otros artefactos citan el identificador.
- **Brecha cerrada, `Q-17`:** la limpieza es **sugerida**. La versión anterior dejaba el disparo sin especificar en el paso 8 y en FA-03; quedó decidida el 2026-07-30 y los dos tramos están escritos. Lo que la decisión **no** cubre está declarado abajo.
- **Brecha declarada, `Q-16`:** si las imágenes que el producto construye llevan **marca de pertenencia**. Sin ella el paso 4 no es resoluble y ninguna limpieza es segura. Sigue abierta. Destinatario: agente humano del proyecto.
- **Brecha declarada, `Q-18`:** si la limpieza tiene un **ámbito de credencial propio**, distinto de `despliegues:ejecutar`. Por el principio de ámbito mínimo que el intake §17.P.5 declara, un automatismo que despliega no debería poder borrar. Sigue abierta. Destinatario: agente humano del proyecto.
- **Brecha declarada, `Q-21`:** si el administrador puede marcar una imagen como conservada, con qué alcance, y si la marca se pone sola al volver a un despliegue anterior. Afecta al paso 7. Sigue abierta. Destinatario: agente humano del proyecto.
- **Brecha nueva, sin pendiente de decisión asignada: el criterio de descarte.** `Q-17` decidió **cómo se dispara** la limpieza y no **qué se considera descartable**. Ninguna fuente declara si una imagen del producto es descartable por no tener ningún despliegue activo que la referencie, por no tener ninguno en absoluto, o por antigüedad, y las tres respuestas producen propuestas distintas en el paso 8. No se elige acá. Destinatario: agente humano del proyecto, para que entre al intake §19 con identificador propio.
- **Delegación declarada, no brecha de esta categoría:** el **umbral** a partir del cual el sistema sugiere la limpieza y la superficie donde aparece la sugerencia. El intake v3.2 los delega explícitamente a `03-UX-UI-DX` al cerrar `Q-17`, de modo que no son dato faltante del producto sino trabajo de esa categoría. Destinatario: 03-UX-UI-DX.
- **La regla conservadora no es una preferencia: es lo único que hace segura la operación.** El motor de contenedores es uno y compartido entre el producto, el parque de contenedores no incorporado y el automatismo de integración continua que construye en el propio servidor. Sin la protección de lo ajeno, una limpieza es destrucción de datos de terceros y el producto no tiene forma de saber qué rompió.
- La presentación del inventario, del indicador de espacio y del informe pertenece a 03-UX-UI-DX, que emite para esto una superficie nueva.

## 11. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 2.1 | 2026-07-30 | **El disparo de la limpieza pasa de incógnita a dato cerrado**, por la ronda de decisiones del agente humano del proyecto del 2026-07-30 consolidada en el `PRODUCT-INTAKE-SelfHosted-Service` v3.2, §19 y anexo E-23. Sube **minor**: el propósito, los actores, las precondiciones, las excepciones y las postcondiciones no cambian, y **la numeración del flujo principal se conserva** —la confirmación del administrador entra dentro del paso 8 en lugar de abrir un paso nuevo, para no correr los pasos 9 a 11 que §10 y otros artefactos citan—. **`Q-17` decidida: sugerida.** El paso 8 pasa de «el administrador dispara la limpieza» a «el sistema detecta espacio recuperable y propone; el administrador confirma», con el párrafo que precisa qué descarta esa forma: sin confirmación no se borra, y sin propuesta el administrador no tiene que acordarse de pedirla. **FA-03** deja de decir «sin especificar» y declara el flujo de la sugerencia con su punto de retorno. **§8** suma `CA-08` y `CA-09`, el caso positivo de la sugerencia y el de la sugerencia descartada, con lo que los criterios pasan de siete a **nueve**. **`Q-15` decidida en positivo**: la precondición de §3 pasa de «depende de `Q-15`, abierta» a dato decidido con su escritor —CU-13 paso 5 y CU-15 paso 6—, y la nota de cabecera retira la afirmación de que este caso de uso no es implementable. **§9** suma `US-CU-37-6`, la sugerencia de limpieza. **Las tres pendientes que siguen abiertas se conservan una por una** —`Q-16`, `Q-18` y `Q-21`— y ninguna se completó con un valor plausible. **Se abre una brecha nueva y se declara que no tiene identificador**: el **criterio de descarte**, que la versión anterior atribuía a `Q-17` y que esa decisión **no cubre**, porque decidió el disparo y no qué se considera descartable; se agrega `FA-05` para que el hueco tenga dónde vivir en el flujo en lugar de quedar sólo en una nota. Se declara además, como **delegación y no como brecha de producto**, el umbral y el lugar de la sugerencia, que el intake v3.2 asigna a `03-UX-UI-DX`. La versión 2.0 queda archivada en `_legacy/2026-07-30/CU-37-Higiene-De-Imagenes-v2.0.md` |
| 2.0 | 2026-07-30 | **Migración normativa 4.1 → 6.0**, corte 3 de la fase M4, sobre el plan [`Plan-Migracion-4.1-a-6.0.md`](../../Audit/Plan-Migracion-4.1-a-6.0.md). Clasificación **regenerar contenido**, por el salto de `Rules-Especificacion-Funcional` 2.0 → 4.0. **Fuente de contenido: documento de origen**, más el [PRODUCT-MANIFEST](../../../Intake/PRODUCT-MANIFEST-SelfHosted-Service.md) §1.3 para el único campo de cabecera que se suma. **Las cinco brechas abiertas `Q-15` a `Q-18` y `Q-21` siguen abiertas y ninguna se completó con un valor plausible**: la migración no cierra decisiones, y la nota de cabecera que declara que este caso de uso no es implementable hasta que `Q-15` se cierre queda literal. Ningún flujo, actor, criterio de aceptación, excepción ni tramo declarado abierto cambia de contenido: lo que cambia es la nomenclatura. **Vocabulario (`[5.0]`)**: la etiqueta de cabecera `**Proyecto:**` llevaba un valor del plano de negocio y pasa a `**Producto:**`, porque `Vocabulario-Rules.md` §3 prohíbe la etiqueta de un plano sobre el valor de otro; se suma `**Proyecto de código:**` con el `Nombre-Proyecto-Codigo` declarado, que §4.1 de la regla vigente exige y que este documento no declaraba; `SOLUTION-INTAKE` pasa a `PRODUCT-INTAKE`; y «solución» pasa a «producto» en **1 ocurrencia**, la del nombre del actor primario. **Las 19 apariciones de «producto» que este documento ya tenía no se tocaron**: fueron escritas así desde su emisión, porque es posterior a la `[5.0]`. **Las 2 ocurrencias de «proyecto» del dominio no se tocaron** —el paso 4, que resuelve a qué proyecto SelfHosted pertenece una imagen, y FA-01, sobre el parque que nadie incorporó a un proyecto—, y las 5 de «agente humano del proyecto» de §10 quedan a secas, por su referente de emprendimiento. La sustitución se hizo por el procedimiento por ocurrencia de `Vocabulario-Rules.md` §9.5 y **nunca por reemplazo global de cadena**. **Glosario (`[5.1]`)**: por §2.1 y §4.2.4 de la regla vigente, `Glosario-Funcional.md` pasa a ser artefacto propio y obligatorio y deja de ser el punto 6 de `Modelo-Conceptual.md`; lo emite un lote posterior de esta migración. Este caso de uso es, junto con CU-38, **el que más vocabulario acuña del corte**: «imagen» como objeto con identidad, «digesto», «etiqueta» como nombre reasignable, «procedencia de la imagen», «pertenencia», «conservada», «ajena», «higiene de imágenes» e «informe de la limpieza» se devolvieron con su definición tal como este documento las usa, para que ese lote las consuma sin inventar. Ninguna fila anterior de este control de cambios se reescribió (`SDD-Development-Guide.md` §VI.2) y el bloque de procedencia del destino no se tocó: sigue declarando 4.1, y cerrarlo es trabajo de M5 |
| 1.0 | 2026-07-29 | Versión inicial. Caso de uso nuevo, emitido por §22.2 séptima fila del documento de trabajo `SDD/Estado/Redefinicion-Servicio.md` v2.0, que verificó que el intake no tenía **nada** sobre ciclo de vida de imágenes mientras retiene cincuenta despliegues por servicio cuyas imágenes nadie administra. Deriva del anexo E-23 del intake v2.4 y de la regla RN-40. **Especifica lo que no depende de decisiones abiertas** —qué se lista, qué está protegido y qué informa la operación— y **declara fila por fila los cinco tramos que sí dependen**, con su pendiente y su destinatario, en lugar de completarlos con un valor plausible. Declara además que no es implementable hasta que `Q-15` se cierre, y por qué |
