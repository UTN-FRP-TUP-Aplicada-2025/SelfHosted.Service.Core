# CU-37 — Higiene de imágenes: listar, conservar y limpiar

**Proyecto:** SelfHosted Service
**Documento:** CU-37-Higiene-De-Imagenes.md
**Versión:** 1.0
**Estado:** Propuesto
**Fecha:** 2026-07-29
**Autor:** Analista Funcional Senior (AG-02)

**Necesidad de negocio upstream:** [NB-07](../../01-Necesidades-Negocio/Necesidades-De-Negocio/NB-07-Atribucion-Del-Consumo-Del-Servidor.md)
**Trazabilidad upstream:** SOLUTION-INTAKE anexo E-23 (la imagen como objeto con identidad, sus tres campos determinantes y las siete decisiones que deja abiertas); anexo E-3 y §17.P.11 DA-07, la retención de despliegues por servicio; §17.P.10, requerimientos no funcionales de recursos del servidor; E-16 RN-17, RN-40

> **Este caso de uso depende de decisiones abiertas y lo declara.** Las pendientes `Q-15` a `Q-21` del intake §19 condicionan **el modo de disparo de la limpieza y el alcance de la marca de conservada**; ninguna está cerrada. Lo que este documento especifica es lo que **no depende** de ellas: qué se lista, qué está protegido y qué informa la operación. **Los tramos que dependen de una decisión abierta están señalados fila por fila y no se completan con un valor plausible.** No es implementable hasta que `Q-15` se cierre, porque sin el registro del digesto por despliegue no hay entidad imagen sobre la que operar.

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
| Administrador de la solución | Primario | Consulta el inventario de imágenes, marca las que quiere conservar y dispara la limpieza |
| Módulo de higiene de imágenes | Sistema | Reúne el inventario, resuelve la pertenencia y la referencia de cada imagen, y ejecuta la limpieza respetando las protecciones |
| Motor de contenedores | Sistema | Devuelve el inventario real del almacén de imágenes y ejecuta el borrado |

Los nombres de los actores no humanos son **denominaciones acuñadas por esta categoría**, salvo los seis que trazan a una fuente: `Motor de contenedores`, `Destino externo`, `Automatismo de integración continua`, `Sincronizador de estado`, `Módulo de descubrimiento` y `Resolutor de referencias`. `Módulo de higiene de imágenes` es acuñado acá y **no es un componente declarado**: su correspondencia con los módulos que el intake §17.P.2 declara la fija 05-Arquitectura-Tecnica. La convención completa está en [Especificacion-Funcional.md](../Especificacion-Funcional.md) §8.

## 3. Precondiciones

- El administrador tiene sesión iniciada (CU-30).
- El motor de contenedores es alcanzable por su punto de acceso local.
- **El despliegue registra el digesto de la imagen que usó.** Es la condición sin la cual el inventario no puede decir qué imagen está en uso. Depende de `Q-15`, abierta.

## 4. Flujo principal

1. El administrador abre el inventario de imágenes.
2. El sistema consulta el almacén de imágenes del motor de contenedores y toma, de cada imagen, su digesto, su referencia legible, su etiqueta, su tamaño y su fecha de creación.
3. El sistema resuelve la **procedencia** de cada imagen: descargada de un registro, construida por el producto, construida por un automatismo externo, o **ajena** —la que existe en el almacén y el producto no administra—.
4. El sistema resuelve la **pertenencia**: si la imagen lleva la marca del producto y, cuando la lleva, a qué proyecto SelfHosted y a qué servicio corresponde.
5. El sistema resuelve el **uso**: qué despliegues la referencian por su digesto, distinguiendo los despliegues activos de los que sólo viven en el historial.
6. El sistema presenta el inventario con esas cuatro dimensiones y con el espacio total que ocupa, separando lo que administra de lo que no.
7. El administrador **marca como conservada** una imagen que quiere proteger de la limpieza, o retira esa marca.
8. El administrador dispara la limpieza.
9. El sistema determina qué imágenes son descartables y **excluye** las protegidas: las marcadas como conservadas y las que no llevan la marca de pertenencia del producto (RN-40).
10. El sistema ejecuta el borrado de las descartables y emite el **informe de la limpieza**: qué borró, qué espacio liberó, y **qué dejó con el motivo de cada exclusión**.
11. El sistema registra el evento de auditoría de la operación (RN-17).

**Lo que este flujo deliberadamente no declara, porque está abierto:**

| Tramo del flujo | Qué falta decidir | Pendiente |
| --- | --- | --- |
| Paso 8, el disparo | Si la limpieza es **manual**, **sugerida** por el sistema cuando detecta presión de disco, o **programada** | `Q-17` |
| Paso 7, la marca | Si el administrador puede marcar como conservada cualquier imagen, sólo las del producto, o si la marca se pone sola al volver a un despliegue anterior | `Q-21` |
| Paso 9, el criterio de descarte | Qué hace descartable a una imagen del producto: no tener ningún despliegue activo que la referencie, no tener ninguno en absoluto, o una antigüedad | `Q-17` |
| Paso 4, la pertenencia | Si las imágenes construidas llevan efectivamente la marca de pertenencia, que es lo que hace resoluble el paso | `Q-16` |
| Toda operación por API | Si la limpieza tiene un **ámbito de credencial propio**, distinto del de desplegar | `Q-18` |

**Cada uno de esos cinco tramos queda como brecha declarada con su destinatario en §10, y ninguno se completa con un valor plausible.** Lo que sí queda especificado y no depende de ninguna decisión abierta es qué se lista, qué está protegido y qué informa la operación.

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
Disparador: el sistema detecta que el espacio disponible del almacén de imágenes cae por debajo de un umbral.
Pasos: **sin especificar.** Si la respuesta es sugerir la limpieza, avisar sin sugerir, o no hacer nada, es parte de `Q-17`. Lo que sí está declarado es que el tablero de estado del servidor ya expone el consumo de recursos (CU-26), de modo que el dato existe.
Punto de retorno: no aplica mientras `Q-17` esté abierta.

**FA-04 — Limpieza que no encuentra nada descartable.**
Disparador: todas las imágenes están en uso, conservadas o ajenas.
Pasos: el sistema emite el informe con cero borrados y con el motivo de cada exclusión. **No es un error**: es el resultado esperado en un servidor recién ordenado, y el informe tiene que dejarlo claro en lugar de parecer un fallo.
Punto de retorno: paso 11.

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

## 9. Trazabilidad

| Dimensión | Referencia |
| --- | --- |
| Necesidad de negocio | [NB-07](../../01-Necesidades-Negocio/Necesidades-De-Negocio/NB-07-Atribucion-Del-Consumo-Del-Servidor.md) |
| Reglas de negocio aplicables | RN-17, RN-40. Reglas conceptuales: RC-18, que conserva el historial de despliegues y es lo que obliga a que las imágenes de ese historial tengan una política |
| Historias de usuario a generar en 06 | US-CU-37-1 (ver qué imágenes ocupan el servidor y cuánto), US-CU-37-2 (distinguir lo que el producto administra de lo ajeno), US-CU-37-3 (marcar una imagen como conservada), US-CU-37-4 (liberar espacio con un informe de qué se borró y qué se dejó), US-CU-37-5 (saber qué imagen exacta usa cada despliegue) |
| Componentes esperados en 05 | Capa `Web`, superficie de imágenes y su controlador; capa `Application`, módulo de observabilidad o módulo propio de higiene de imágenes —la asignación la fija 05—; capa `Infrastructure`, `Contenedores`, detrás de la abstracción del motor. Referencia tentativa |
| Tests previstos en 08 | **Ninguno declarado en el anexo E-22**, que es anterior a este caso de uso. 08-Calidad-Y-Pruebas debe derivar los tres de RN-40 y los siete criterios de aceptación de §8. El anexo E-23 aporta las entradas |

Los identificadores de historia de usuario llevan la forma `US-CU-XX-n` y son **provisionales**: la numeración definitiva es potestad de 06-Backlog-Tecnico.

## 10. Notas y supuestos

- **Por qué la necesidad upstream es NB-07 y no otra.** NB-07 es la atribución del consumo del servidor: saber si la presión de recursos viene de un servicio concreto. Las imágenes son consumo de disco atribuible, y este caso de uso es el que lo vuelve atribuible y accionable. La alternativa evaluada fue NB-01, visibilidad unificada de la arquitectura, y se descartó porque las imágenes no son parte de la arquitectura que el lienzo representa.
- **Brecha declarada, `Q-15`:** el despliegue debe registrar el **digesto** de la imagen que usó. **Sin esta decisión este caso de uso no es implementable**, porque el paso 5 no tiene con qué resolver el uso de cada imagen. Es la pendiente de mayor palanca de las diecisiete que el intake §19 declara abiertas. Destinatario: agente humano del proyecto.
- **Brecha declarada, `Q-16`:** si las imágenes que el producto construye llevan **marca de pertenencia**. Sin ella el paso 4 no es resoluble y ninguna limpieza es segura. Destinatario: agente humano del proyecto.
- **Brecha declarada, `Q-17`:** si la limpieza es manual, sugerida o programada, y con qué criterio de descarte. Afecta a los pasos 8 y 9 y a FA-03. Destinatario: agente humano del proyecto, y luego 03-UX-UI-DX.
- **Brecha declarada, `Q-18`:** si la limpieza tiene un **ámbito de credencial propio**, distinto de `despliegues:ejecutar`. Por el principio de ámbito mínimo que el intake §17.P.5 declara, un automatismo que despliega no debería poder borrar. Destinatario: agente humano del proyecto.
- **Brecha declarada, `Q-21`:** si el administrador puede marcar una imagen como conservada, con qué alcance, y si la marca se pone sola al volver a un despliegue anterior. Afecta al paso 7. Destinatario: agente humano del proyecto.
- **La regla conservadora no es una preferencia: es lo único que hace segura la operación.** El motor de contenedores es uno y compartido entre el producto, el parque de contenedores no incorporado y el automatismo de integración continua que construye en el propio servidor. Sin la protección de lo ajeno, una limpieza es destrucción de datos de terceros y el producto no tiene forma de saber qué rompió.
- La presentación del inventario, del indicador de espacio y del informe pertenece a 03-UX-UI-DX, que emite para esto una superficie nueva.

## 11. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 1.0 | 2026-07-29 | Versión inicial. Caso de uso nuevo, emitido por §22.2 séptima fila del documento de trabajo `SDD/Estado/Redefinicion-Servicio.md` v2.0, que verificó que el intake no tenía **nada** sobre ciclo de vida de imágenes mientras retiene cincuenta despliegues por servicio cuyas imágenes nadie administra. Deriva del anexo E-23 del intake v2.4 y de la regla RN-40. **Especifica lo que no depende de decisiones abiertas** —qué se lista, qué está protegido y qué informa la operación— y **declara fila por fila los cinco tramos que sí dependen**, con su pendiente y su destinatario, en lugar de completarlos con un valor plausible. Declara además que no es implementable hasta que `Q-15` se cierre, y por qué |
