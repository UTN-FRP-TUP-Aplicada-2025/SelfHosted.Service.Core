> **Documento archivado.** Estado: **Superado**. Es la copia completa del estado previo de `CU-39-Exploracion-Del-Registro-De-Imagenes.md`, versión **1.0**, archivada el 2026-07-30 por la política de deprecación de `Master-Prompt.md` §5.1 al corregirse el hallazgo **P1-1** del informe [`B2-Retroalimentacion-Decisiones-2026-07-30-r1.md`](../../../../Audit/B2-Retroalimentacion-Decisiones-2026-07-30-r1.md). La versión vigente es [`CU-39-Exploracion-Del-Registro-De-Imagenes.md`](../../CU-39-Exploracion-Del-Registro-De-Imagenes.md). **El cuerpo que sigue no se modificó.**
>

---

# CU-39 — Exploración del registro de imágenes

**Proyecto de código:** SelfHosted-Service
**Producto:** SelfHosted Service
**Documento:** CU-39-Exploracion-Del-Registro-De-Imagenes.md
**Versión:** 1.0
**Estado:** Propuesto
**Fecha:** 2026-07-30
**Autor:** Analista Funcional Senior (AG-02)

**Necesidad de negocio upstream:** [NB-04](../../01-Necesidades-Negocio/Necesidades-De-Negocio/NB-04-Alta-De-Servicio-Sin-Copiar-Y-Adaptar.md)
**Trazabilidad upstream:** PRODUCT-INTAKE-SelfHosted-Service **v3.2** §19, pendiente `Q-27` **decidida el 2026-07-30: hay exploración**; §4, nota de los dos ejes del alta y sus vías 3 y 4, imagen de registro público e imagen de registro privado, con `DI-18` confirmada; anexo E-2 §20.2.3, las cinco variantes discriminadas de origen; anexo E-23, la etiqueta como nombre reasignable frente al digesto como identidad real; E-16 RN-08, RN-15, RN-17

> **Caso de uso nuevo, emitido por una decisión y no por un hallazgo.** `Q-27` preguntaba si existe alguna forma de explorar un registro de imágenes, o si conocer la dirección de la imagen es requisito del usuario. El agente humano del proyecto la decidió el 2026-07-30: **hay exploración**, y conocer la dirección deja de ser requisito. Es la capacidad que resuelve el primer minuto de uso: el catálogo arranca vacío en una instalación nueva y el producto no se distribuye con contenido precargado, de modo que sin exploración quien no sabía la dirección de la imagen no tenía camino. **La decisión declara además una consecuencia: es una superficie nueva**, que `03-UX-UI-DX` debe especificar con wireframe propio, y que este caso de uso identifica como `SUP-19` sin emitirla.

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

Permitir que el administrador **encuentre la imagen que quiere desplegar explorando un registro de imágenes configurado**, en lugar de tener que escribir de memoria una dirección que quizá no conoce, y que vuelva del hallazgo con el origen del servicio ya declarado.

**Por qué existe este caso de uso.** El alta de servicio ofrece siete vías, y dos de ellas —imagen de registro público e imagen de registro privado— piden registro, imagen y etiqueta (RN-08). El catálogo, que es la vía que evitaría escribirlas, **arranca vacío en una instalación nueva**: el producto no se distribuye con contenido precargado. La combinación deja un hueco concreto en el primer minuto de uso, y es el hueco que `Q-27` nombraba: **sin catálogo de fábrica y sin exploración, quien no sabe la dirección de la imagen no tiene camino**. Este caso de uso lo cierra.

**Lo que no es.** No es el descubrimiento de contenedores adoptables (CU-06), que lee el motor de contenedores local y devuelve candidatos a incorporar. Acá se lee un **registro de imágenes remoto** y se devuelve una referencia, no un candidato: no hay nada corriendo del otro lado.

## 2. Actores

| Actor | Tipo | Rol |
| --- | --- | --- |
| Administrador del producto | Primario | Elige el registro, busca, elige la imagen y la etiqueta, y trae la referencia al alta |
| Explorador de registro de imágenes | Sistema | Consulta el registro configurado con la identidad que corresponda y devuelve los repositorios, las imágenes y sus etiquetas |

Los nombres de los actores no humanos son **denominaciones acuñadas por esta categoría**, salvo los seis que trazan a una fuente: `Motor de contenedores`, `Destino externo`, `Automatismo de integración continua`, `Sincronizador de estado`, `Módulo de descubrimiento` y `Resolutor de referencias`. `Explorador de registro de imágenes` es **acuñado acá** y no es un componente declarado: su correspondencia con los módulos que el intake §17.P.2 declara la fija 05-Arquitectura-Tecnica. La convención completa está en [Especificacion-Funcional.md](../Especificacion-Funcional.md) §8.

**El registro de imágenes no figura como actor**, con el mismo criterio con el que CU-03 no lo lista: es el sistema externo que el actor de sistema consulta, y nombrarlo como actor duplicaría la responsabilidad que `Explorador de registro de imágenes` ya declara.

## 3. Precondiciones

- El administrador tiene sesión iniciada (CU-30).
- Existe al menos un **registro de imágenes configurado**, con su dirección y, cuando es privado, con la credencial de registro que lo autentica (RN-08, `DI-18` confirmada).
- Cuando la exploración se abre desde el alta, existe el proyecto SelfHosted y el servicio está en curso en el paso del origen (CU-03 paso 4).

**Brecha declarada en la primera precondición:** ninguna fuente declara **dónde y cómo se configura el conjunto de registros explorables** —si es configuración de la instalación, del proyecto SelfHosted o del servicio, y si el registro público de referencia viene configurado de fábrica—. Ver §10.

## 4. Flujo principal

1. El administrador solicita explorar un registro de imágenes, desde el paso del origen del alta de servicio (CU-03 paso 4, vías de imagen de registro público y de registro privado) o desde el panel de imágenes.
2. El sistema presenta los registros de imágenes configurados y el administrador elige uno.
3. El administrador busca por texto o recorre lo que ese registro publica.
4. El sistema consulta el registro **con la identidad que la variante determina**: anónima para el registro público, y con la credencial de registro declarada para el privado (RN-08). La credencial nunca se muestra ni se devuelve en claro (RN-15).
5. El sistema devuelve los resultados con su **referencia legible** —registro, repositorio e imagen— y el administrador elige uno.
6. El sistema lista las **etiquetas disponibles** de esa imagen, cada una con su momento de publicación y con el **digesto** al que apunta hoy, declarando que la etiqueta es un nombre reasignable y el digesto es la identidad real.
7. El administrador elige una etiqueta.
8. El sistema **devuelve la referencia completa al paso del origen**: registro, imagen y etiqueta quedan declarados, y el origen resuelve a la variante `imagen-publica` o `imagen-privada` según el registro elegido (CU-03 FA-01).
9. **La verificación del origen corre igual** (CU-03 paso 5). Explorar no reemplaza verificar: entre elegir y confirmar puede haber pasado cualquier cosa, y la verificación es la que devuelve el digesto con el que el despliegue va a trabajar.

**La exploración es de sólo lectura y no escribe nada**, con el mismo criterio con el que el descubrimiento de CU-06 no escribe: no crea servicios, no copia el catálogo remoto al registro del sistema y no produce evento de auditoría por sí misma. El evento lo produce el alta que la consume, cuando escribe (RN-17).

## 5. Flujos alternativos

**FA-01 — Ningún registro de imágenes configurado.**
Disparador: en el paso 2 no hay ningún registro configurado.
Pasos: el sistema **declara el vacío explícitamente** en lugar de mostrar una lista vacía sin explicación, ofrece configurar un registro, y ofrece las otras vías de alta que no dependen de un registro —repositorio remoto y archivo de construcción en línea—. Es el mismo tratamiento que CU-17 le da al catálogo vacío de una instalación nueva.
Punto de retorno: paso 2, cuando haya un registro configurado; o el paso del origen del alta, si el administrador elige otra vía.

**FA-02 — El registro no responde.**
Disparador: en el paso 4 el registro de imágenes no responde o es inalcanzable.
Pasos: el sistema declara resultado **indeterminado** con clase «consulta imposible» y acción sugerida **reintentar**, con el mismo criterio con el que CU-03 FA-04 distingue no poder consultar de que el dato sea incorrecto. Lo que el administrador ya escribió en el alta **no se pierde**: el servicio sigue en `borrador`.
Punto de retorno: paso 4, para reintentar.

**FA-03 — La credencial del registro privado es rechazada.**
Disparador: en el paso 4 el registro privado rechaza la identidad declarada.
Pasos: el sistema declara resultado fallido con clase **«credencial rechazada»**, distinta de «consulta imposible» y de «no existe», porque la acción del administrador es otra: corregir la credencial. El valor de la credencial **no se devuelve ni se muestra** en el mensaje (RN-15).
Punto de retorno: paso 2, para corregir la credencial del registro.

**FA-04 — El registro no admite enumerar lo que publica.**
Disparador: en el paso 3 el registro elegido no ofrece forma de listar su contenido y sólo responde consultas por nombre.
Pasos: el sistema **declara la limitación** y ofrece la búsqueda por nombre exacto en lugar de presentar un listado vacío que se leería como «no hay nada». La exploración queda acotada y el administrador sabe por qué.
Punto de retorno: paso 3, con la búsqueda por nombre.

**FA-05 — Exploración fuera del alta.**
Disparador: el administrador explora desde el panel de imágenes sin tener un alta en curso.
Pasos: el flujo es el mismo hasta el paso 7, y el paso 8 **no se ejecuta**: el resultado es la referencia completa presentada para consultarla o llevarla a un alta posterior. **No se crea ningún servicio y no se declara ningún origen.**
Punto de retorno: el panel de imágenes.

**FA-06 — La búsqueda no devuelve resultados.**
Disparador: en el paso 5 la consulta se completa y no hay coincidencias.
Pasos: el sistema informa cero resultados **como resultado y no como error**, declarando qué registro consultó y con qué criterio, para que el administrador distinga «no existe» de «no pude consultar».
Punto de retorno: paso 3.

## 6. Excepciones y errores

| Código | Causa | Respuesta del sistema |
| --- | --- | --- |
| **Indeterminado**, sin código de rechazo | El registro de imágenes no responde | Clase «consulta imposible», acción sugerida reintentar. No es un rechazo de la operación de alta y no invalida lo declarado (FA-02) |
| **Credencial rechazada**, sin código de rechazo | El registro privado no acepta la credencial declarada | Clase propia, distinta de «consulta imposible» y de «no existe», con acción sugerida corregir la credencial. El valor de la credencial nunca aparece en el mensaje (RN-15, FA-03) |
| Resultado vacío | La consulta se completó y no hay coincidencias | Cero resultados informados como resultado, con el registro consultado y el criterio usado. **No es un error** (FA-06) |
| Enumeración no admitida | El registro no expone forma de listar su contenido | El sistema declara la limitación y ofrece la búsqueda por nombre (FA-04) |
| Etiqueta desaparecida entre la elección y la verificación | La etiqueta elegida en el paso 7 ya no existe cuando corre la verificación del origen | Lo resuelve la verificación del origen de CU-03, con clase «dato incorrecto» y acción corregir. **La exploración no garantiza la verificación**, y el paso 9 lo declara |

## 7. Postcondiciones

**En caso de éxito, desde el alta:** el origen del servicio queda declarado con su registro, su imagen y su etiqueta, en la variante `imagen-publica` o `imagen-privada` según el registro elegido; el servicio sigue en estado `borrador` hasta que las dos verificaciones de CU-03 estén en verde; **nada del catálogo del registro consultado queda persistido** en el registro del sistema.

**En caso de éxito, fuera del alta:** el administrador conoce la referencia completa de la imagen y su digesto vigente. No se creó ningún servicio y no se modificó ningún estado.

**En caso de fallo:** no queda ningún origen declarado a partir de esta operación, lo que el administrador ya había escrito en el alta **no se pierde**, y el informe declara la clase de fallo —consulta imposible, credencial rechazada o sin resultados— con la acción que corresponde a cada una.

## 8. Criterios de aceptación

| ID | Given | When | Then |
| --- | --- | --- | --- |
| CA-01 | Una instalación nueva, con el catálogo vacío y un registro de imágenes público configurado | El administrador abre el alta de servicio y elige la vía de imagen de registro público sin conocer ninguna dirección | El sistema le ofrece **explorar el registro configurado**, y conocer la dirección de la imagen **no** es requisito para avanzar |
| CA-02 | El mismo registro público, y una búsqueda que devuelve varias imágenes | El administrador elige una | El sistema lista sus etiquetas disponibles, cada una con su momento de publicación y con el **digesto** al que apunta, y declara que la etiqueta es reasignable |
| CA-03 | Una imagen y una etiqueta elegidas en la exploración | El administrador vuelve al alta | El origen queda declarado con registro, imagen y etiqueta, en la variante `imagen-publica`, y **la verificación del origen corre igual** en el paso 5 de CU-03 |
| CA-04 | Un registro de imágenes privado con una credencial de registro incorrecta | El administrador explora ese registro | El sistema declara clase «credencial rechazada» con acción corregir la credencial, **visiblemente distinta** de «consulta imposible», y el valor de la credencial no aparece en el mensaje |
| CA-05 | Un registro de imágenes configurado que no responde | El administrador explora ese registro | El sistema declara resultado **indeterminado** con acción reintentar, y el servicio en curso sigue en `borrador` con lo declarado sin perderse |
| CA-06 | Una instalación sin ningún registro de imágenes configurado | El administrador solicita explorar | El sistema declara el vacío con su motivo, ofrece configurar un registro y ofrece las vías de alta que no dependen de un registro. **No presenta una lista vacía sin explicación** |
| CA-07 | Una búsqueda por un texto que no coincide con nada del registro | El administrador la ejecuta | El sistema informa cero resultados **sin presentarlo como error**, declarando qué registro consultó y con qué criterio |

## 9. Trazabilidad

| Dimensión | Referencia |
| --- | --- |
| Necesidad de negocio | [NB-04](../../01-Necesidades-Negocio/Necesidades-De-Negocio/NB-04-Alta-De-Servicio-Sin-Copiar-Y-Adaptar.md). Es la necesidad de que el alta parta de un formulario y no de un archivo ajeno: conocer de memoria la dirección de una imagen es la última pieza del método manual que esa necesidad viene a sustituir |
| Reglas de negocio aplicables | RN-08 (los datos que cada variante de imagen exige, que es lo que la exploración completa), RN-15 (la credencial de registro nunca se devuelve en claro), RN-17 (la exploración no escribe y no produce evento; el alta que la consume sí). Reglas conceptuales: ninguna. La exploración **no persiste entidades**, de modo que ninguna restricción de integridad del modelo la alcanza |
| Historias de usuario a generar en 06 | US-CU-39-1 (explorar el registro configurado desde el paso del origen), US-CU-39-2 (buscar una imagen sin conocer su dirección), US-CU-39-3 (elegir una etiqueta viendo a qué digesto apunta), US-CU-39-4 (volver al alta con el origen ya declarado), US-CU-39-5 (distinguir la credencial rechazada del registro que no responde) |
| Componentes esperados en 05 | Capa `Web`, superficie de exploración de registro de imágenes y su controlador; capa `Application`, módulo de servicios y despliegues o módulo propio de exploración —la asignación la fija 05—; capa `Infrastructure`, el adaptador de consulta a registros de imágenes que CU-03 ya prevé para la verificación del origen. Referencia tentativa |
| Superficie prevista en 03 | `SUP-19`, exploración de registro de imágenes. **Es el siguiente identificador libre de la serie**: `03-UX-UI-DX` declara hoy `SUP-01` a `SUP-18`. El identificador se propone acá y **lo emite esa categoría**, con wireframe propio, tal como la decisión de `Q-27` declara. Ver §10 |
| Tests previstos en 08 | **Ninguno declarado en el anexo E-22**, que es anterior a esta decisión. 08-Calidad-Y-Pruebas debe derivar los siete criterios de aceptación de §8, con `CA-04` y `CA-05` como el par que verifica que las dos clases de fallo se distinguen |

Los identificadores de historia de usuario llevan la forma `US-CU-XX-n` y son **provisionales**: la numeración definitiva es potestad de 06-Backlog-Tecnico.

## 10. Notas y supuestos

- **Por qué la necesidad upstream es NB-04 y no otra.** NB-04 es la necesidad de que el alta de un servicio deje de ser copiar y adaptar, y de que parta de un formulario con las dimensiones que hacen falta. Conocer de memoria la dirección de una imagen es exactamente el resto de método manual que esa necesidad no había alcanzado. La alternativa evaluada fue NB-01, visibilidad unificada de la arquitectura, y se descartó porque el registro de imágenes remoto **no es parte de la arquitectura que el lienzo representa**.
- **Ninguna necesidad de negocio lo previó**, con el mismo motivo que CU-37 y CU-38: la decisión que lo origina es del 2026-07-30 y la categoría 01 se emitió antes. La verificación bidireccional cierra en la dirección CU → NB y no en la inversa. Es la brecha B-20 del índice maestro, ampliada a tres casos de uso.
- **Es la capacidad que resuelve el primer minuto de uso, y conviene que quede escrito por qué.** El catálogo arranca vacío por decisión declarada, el producto no trae contenido precargado, y dos de las siete vías de alta piden una dirección de imagen. Sin exploración, el único camino del administrador que no la sabe es salir del producto a buscarla.
- **Explorar no es verificar, y el paso 9 lo declara.** La exploración devuelve lo que el registro publica en el momento de la consulta; la verificación del origen de CU-03 es la que comprueba antes de aplicar y la que devuelve el digesto. Colapsarlas produciría el defecto de dar por verificado un dato elegido minutos antes.
- **La etiqueta se presenta con su digesto y no sola.** El anexo E-23 declara que la etiqueta es un nombre reasignable que no identifica nada de forma estable; presentarla sin el digesto al que apunta reproduciría en la exploración el mismo problema que ese anexo levanta en el despliegue.
- **Brecha declarada: dónde se configura el registro explorable.** Ninguna fuente declara si el conjunto de registros de imágenes es configuración de la instalación, del proyecto SelfHosted o del servicio, ni si el registro público de referencia viene configurado de fábrica. La precondición de §3 lo exige y no lo resuelve. Destinatario: agente humano del proyecto.
- **Brecha declarada: el ámbito de credencial de la exploración.** El intake no declara si explorar exige un ámbito propio del token de API o si es una operación de interfaz solamente. Es el mismo eje que `Q-18` abre para la limpieza de imágenes, aplicado a otra operación de lectura contra un sistema externo, y por el principio de ámbito mínimo de §17.P.5 conviene no presumirlo. Destinatario: agente humano del proyecto.
- **Brecha declarada: `SUP-19` no existe todavía.** `03-UX-UI-DX` declara hoy dieciocho superficies, `SUP-01` a `SUP-18`, y ninguna es la exploración de registro de imágenes. La decisión de `Q-27` declara explícitamente que es una superficie nueva con wireframe propio. **Esta categoría propone el identificador y no emite la superficie**: hacerlo invadiría 03. Destinatario: 03-UX-UI-DX.
- **Brecha declarada: la exploración no alcanza a las otras vías de imagen.** `Q-27` decidió que hay exploración **de registro de imágenes**. Nada declara si existe algo equivalente para el origen por repositorio remoto —recorrer las ramas de un repositorio, por ejemplo—, y este caso de uso **no lo asume ni por analogía**. Destinatario: agente humano del proyecto.
- El detalle visual de la superficie de exploración, de la presentación de las etiquetas con su digesto y de las dos clases de fallo pertenece a 03-UX-UI-DX.

## 11. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 1.0 | 2026-07-30 | **Versión inicial. Caso de uso nuevo, emitido por la decisión `Q-27` del agente humano del proyecto del 2026-07-30**, consolidada en el `PRODUCT-INTAKE-SelfHosted-Service` v3.2 §19: **hay exploración de registro de imágenes**, y conocer la dirección de la imagen deja de ser requisito del usuario. Toma el **siguiente identificador libre de la serie**, `CU-39`, al final y sin renumerar, con el mismo criterio con el que se agregaron `CU-34` a `CU-38`. Traza upstream a `NB-04` con el argumento de por qué no es `NB-01`, y declara que **ninguna necesidad de negocio lo previó** porque la decisión que lo origina es posterior a la emisión de la categoría 01, lo que amplía la brecha `B-20` del índice maestro de dos casos de uso a tres. Declara la superficie prevista `SUP-19` **sin emitirla**, porque emitirla invadiría `03-UX-UI-DX`, y la deja como brecha con esa categoría como destinataria. Consume `RN-08` y `DI-18` —confirmada en la misma ronda— para el reparto de la variante pública y la privada, y `RN-15` para el tratamiento de la credencial de registro. Declara **cuatro brechas** con su destinatario y no resuelve ninguna: dónde se configura el registro explorable, el ámbito de credencial de la exploración, la inexistencia de `SUP-19`, y si hay algo equivalente para el origen por repositorio remoto, que **no se asume por analogía** |
