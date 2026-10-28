# Audit independiente — Fase B2, paso 6: re-audit del incremento de corrección del 2026-08-02

| Campo | Valor |
|---|---|
| Fase | B2, paso 6 (retroalimentación de la documentación), **ronda 2** de auditoría |
| Producto | SelfHosted Service |
| Proyecto de código | SelfHosted-Service (`tipo_proyecto_codigo`: `web-monolith`; caso degenerado, layout aplanado bajo `SDD/Docs/`) |
| Qué se audita | El **incremento de corrección del 2026-08-02**, emitido tras el veredicto RECHAZADO de [`B2-Retroalimentacion-Decisiones-2026-08-01-r1.md`](B2-Retroalimentacion-Decisiones-2026-08-01-r1.md) |
| Alcance | `SDD/Intake/PRODUCT-MANIFEST-SelfHosted-Service.md` v2.2 con su copia v2.1 archivada; `SDD/Intake/PRODUCT-INTAKE-SelfHosted-Service.md` v3.6 y v3.7 con sus dos copias archivadas del día; los **20** documentos vivos de `02-Especificacion-Funcional` y los **4** de `03-UX-UI-DX` con fila de control de cambios fechada 2026-08-02. 24 documentos vivos de `SDD/Docs/` más los 2 de `SDD/Intake/`, y 3 copias archivadas nuevas |
| Fuera de alcance | Todo documento que la ronda del 2026-08-02 no tocó, las categorías `00` y `01`, `SDD/Maquetas/`, y los informes de audit de rondas anteriores, que **no se modifican** |
| Normativa aplicada | `Master-Prompt.md` 5.2 §4, §5, §5.1, §10 y §13; `Deriva-Rules.md` 3.1 §1; `Rules-Especificacion-Funcional.md` 4.0 §6; `Rules-UX-UI-DX.md` 4.0 §6; `Intake-Rules.md` 3.2 §2, §5 y §6; `Vocabulario-Rules.md` 2.1 §9 y §10 |
| Auditor | Arquitecto de Soluciones + QA Senior, independiente. Invocado desde cero, sin contexto previo. **No participó de la generación ni de la corrección de este incremento** |
| Fecha | 2026-08-02 |
| Veredicto | **APROBADO CON OBSERVACIONES** |

---

## Tabla de contenido

- [1. Resumen ejecutivo](#1-resumen-ejecutivo)
- [2. Método y muestreo declarado](#2-método-y-muestreo-declarado)
  - [2.1 Qué se leyó entero](#21-qué-se-leyó-entero)
  - [2.2 Qué se muestreó y con qué criterio](#22-qué-se-muestreó-y-con-qué-criterio)
  - [2.3 Qué se verificó por script sobre el corpus completo](#23-qué-se-verificó-por-script-sobre-el-corpus-completo)
- [3. Estado de las cinco condiciones para promover del informe r1](#3-estado-de-las-cinco-condiciones-para-promover-del-informe-r1)
- [4. Matriz D1-D9](#4-matriz-d1-d9)
- [5. Matriz de estructura obligatoria](#5-matriz-de-estructura-obligatoria)
- [6. Los siete ejes de esta ronda](#6-los-siete-ejes-de-esta-ronda)
- [7. Coherencia cross-doc y gobierno del glosario](#7-coherencia-cross-doc-y-gobierno-del-glosario)
  - [7.1 Los cuatro criterios de gobierno del glosario](#71-los-cuatro-criterios-de-gobierno-del-glosario)
  - [7.2 Polisemias evaluadas y descartadas, para que la ronda siguiente no las levante](#72-polisemias-evaluadas-y-descartadas-para-que-la-ronda-siguiente-no-las-levante)
- [8. Hallazgos](#8-hallazgos)
- [9. Observaciones evaluadas y no elevadas a hallazgo](#9-observaciones-evaluadas-y-no-elevadas-a-hallazgo)
- [10. Veredicto y condiciones para promover](#10-veredicto-y-condiciones-para-promover)
- [11. Lo que este audit no pudo verificar](#11-lo-que-este-audit-no-pudo-verificar)

---

## 1. Resumen ejecutivo

**Las cinco condiciones para promover del informe r1 quedaron cerradas**, y las cinco se verificaron contra el disco y no contra lo que las filas de control de cambios declaran. Los dos P0 desaparecen: las citas de evidencia que la ronda del 2026-08-02 introduce —los barridos de `requiere_maqueta`, los `grep` contra el snapshot v3.4, el conteo de copias archivadas, la lectura del campo `Versión`— **reproducen todas, literal, incluido el número de línea**. Ninguna fila de control de cambios previa se reescribió: se contrastaron las 34 copias de `_legacy/2026-08-01/` contra sus archivos vivos, fila por fila, y las que existían están intactas.

Se reportan **nueve hallazgos: 0 P0, 1 P1, 3 P2 y 5 P3**. El P1 está en el bloque de flags nuevo del manifiesto: la salvedad de `tiene_observabilidad_critica` afirma que el umbral p99 «no está confirmado por la fuente», y la fuente que cita declara lo contrario en la misma sección. El valor del flag no cambia; lo que no se sostiene es la salvedad. Los tres P2 son conteos que un documento afirma sobre sí mismo y que no se sostienen al contarlos, la misma clase que el r1 tipificó como P2.

**Veredicto: APROBADO CON OBSERVACIONES.** Ningún hallazgo bloquea el avance a la Fase B2 paso 7 según `Master-Prompt.md` §10, y ninguno toca una decisión de producto, un identificador ni una brecha.

---

## 2. Método y muestreo declarado

Todo lo que sigue se verificó **contra el disco**. Cuando un documento afirma un comando, el comando se corrió; cuando afirma un conteo, se contó; cuando cita una versión archivada, se abrió el snapshot.

**Identificación del incremento.** `git status --short` no discrimina el delta del 2026-08-02 del delta del 2026-08-01: el último commit del repositorio es anterior a los dos y las 36 modificaciones aparecen juntas. El incremento del día se identificó por dos vías independientes que coinciden: las **filas de control de cambios fechadas 2026-08-02** —24 documentos vivos de `SDD/Docs/`— y las **carpetas `_legacy/2026-08-02/`**, que existen sólo en `SDD/Intake/` y contienen tres copias: intake v3.5, intake v3.6 y manifiesto v2.1. Que no haya ninguna `_legacy/2026-08-02/` bajo `SDD/Docs/` es coherente y correcto: las 24 correcciones de `02` y de `03` se absorbieron dentro de la versión en curso sin subirla, que es lo que `Master-Prompt.md` §5 admite para documentos en estado `Propuesto` y lo que el r1 recomendó explícitamente.

**Limitación estructural que conviene declarar.** El estado de los documentos de `02` y de `03` **al 2026-08-01** no existe en disco: los snapshots de `_legacy/2026-08-01/` preservan la versión **anterior** a esa emisión, y no hay commit intermedio. En consecuencia, el delta exacto del 2026-08-02 sobre esos 24 documentos **no es reconstruible por diferencia**; se reconstruyó por lo que las filas nuevas declaran y se verificó por contenido. Donde eso impide decidir si un defecto lo introdujo esta ronda o venía de la anterior, se dice.

### 2.1 Qué se leyó entero

| Artefacto | Motivo |
|---|---|
| [`B2-Retroalimentacion-Decisiones-2026-08-01-r1.md`](B2-Retroalimentacion-Decisiones-2026-08-01-r1.md) completo | Es el objeto del re-audit: sus once hallazgos y sus cinco condiciones |
| `Master-Prompt.md` §0 a §5.1, §10 y §13 | Flags, versionado, deprecación, estructura del informe y no-modificación del intake |
| `Deriva-Rules.md` §1 completo | D9, sus cuatro condiciones de evidencia y la distinción P1 / P0 |
| `Rules-Especificacion-Funcional.md` §6 y `Rules-UX-UI-DX.md` §6 | Criterios de aceptación para `web-monolith` |
| `Intake-Rules.md` §2, §4, §5 y §6 | Artefactos gobernados, derivación del manifiesto y completitud semántica |
| `Vocabulario-Rules.md` §9 completo y §10 | Desambiguación léxica y criterios de aceptación |
| `PRODUCT-MANIFEST-template.md`, índice de secciones | Para evaluar si el bloque de flags cabe en el formato de referencia |
| `PRODUCT-MANIFEST-SelfHosted-Service.md` v2.2 completo | Es el artefacto con más contenido nuevo del incremento |
| El **diff completo** v3.5 → v3.6 → v3.7 del intake | Es el modo de verificar qué cambió sin depender de lo que las filas declaran |
| `PRODUCT-INTAKE` §4 «Lo que este intake no decide», §17.P.10, §19 entero y anexo E-23 | Aritmética de pendientes, NFR del flag de observabilidad y estado de `Q-19` |
| `CU-38` desde §5 hasta §11, completo | Es donde vivía el `P1-01` del r1 |
| `02/Especificacion-Funcional.md` §8 y §9 completas, con sus 32 filas de brecha | Regla de cita de versión y `B-31` |
| `02/Glosario-Funcional.md` §1.1, §2 nota, §3.9, §3.10 y su control de cambios | Marcas de versión, criterio negativo y polisemia nueva |
| `03/README.md` completo | Regla de cita de versión, `requiere_maqueta` y las cinco subsecciones de §9 |
| `03/Glosario-UX.md` §8.2, §9.2 y su control de cambios | Polisemia «construir» y criterio negativo |

### 2.2 Qué se muestreó y con qué criterio

De los **20 documentos de `02`** con fila del 2026-08-02, leí enteros cinco —`CU-38`, `Especificacion-Funcional.md`, `Glosario-Funcional.md`, `CU-18` y `RN-20`— y muestreé quince. El criterio fue **el delta declarado**: en cada uno leí la cabecera con su bloque de trazabilidad upstream reescrito, la fila nueva del control de cambios, y las secciones que esa fila nombra. No releí flujos, tablas de excepciones ni criterios de aceptación que la fila no declara alcanzados; sí los barrí por script buscando el contenido de la 3.5 (ver §2.3).

De los **4 documentos de `03`** con fila del 2026-08-02 —`README.md`, `Glosario-UX.md`, `Experiencia-De-Uso.md` y `Wireframes-Alta-De-Servicio.md`— leí enteros los dos primeros y muestreé los otros dos por sus secciones alcanzadas. Los **22 artefactos restantes de `03`** están fuera del incremento; sobre ellos corrí únicamente las verificaciones de coherencia que el eje 4 exige (citas de versión y traza a `_legacy/`).

**Lo que deliberadamente no audité y por qué.** El contenido de producto que la ronda del 2026-08-01 emitió y que esta ronda no toca —flujos, wireframes, reglas conceptuales, el modelo— quedó fuera: el r1 ya lo evaluó y el alcance de este informe es el incremento de corrección. Lo que sí verifiqué es que ninguna de las 24 correcciones haya movido un identificador, un conteo de artefactos o una brecha.

### 2.3 Qué se verificó por script sobre el corpus completo

Sobre los **128 documentos vivos** de `02` y `03`, los 2 de `SDD/Intake/` y las 37 copias archivadas relevantes:

- **Filas de control de cambios previas.** Para cada una de las **34** copias de `_legacy/2026-08-01/` se extrajeron sus filas de control de cambios y se verificó, literal y carácter a carácter, que cada una siga existiendo en el archivo vivo correspondiente. Resultado: **34 de 34 documentos con todas sus filas previas intactas, cero alteradas**.
- **Enlaces.** Resolución de los **1369** enlaces relativos a archivo de los 128 documentos vivos: **cero rotos**. Resolución de las **1400** anclas verificables dentro del corpus, con la regla de slug de GitHub: **cero no resuelven**, incluida la que el r1 levantó como `P2-04`.
- **Versionado y deprecación.** Cero archivos con sufijo de versión en carpeta viva. Las tres copias de `SDD/Intake/_legacy/2026-08-02/` llevan sufijo correcto, bloque de archivado antepuesto y estado `Superado`. Integridad de cuerpo verificada por diff: la v3.6 difiere de la vigente sólo en el campo `Versión` y en los cuatro bloques que la fila 3.7 declara; la v2.1 del manifiesto difiere de la v2.2 sólo en cabecera, la nota de §1.1, el bloque de flags de §2 y la fila nueva.
- **Citas de versión del intake.** Conteo de ocurrencias de `v3.2` a `v3.7` en los 128 documentos vivos, uno por uno. Los **20** de `02` declaran `v3.7` como vigente; **ninguno** de los 128 declara vigente una versión superada.
- **Contenido de la 3.5 en documentos que citan sólo la 3.4.** Barrido cruzado sobre los 20 de `02`: se buscó «cuarentena», «tres fases» / «fases del despliegue» y «política de fallo al arrancar» en los documentos cuya cabecera cita sólo `v3.4`. Tres aparecieron y se inspeccionaron uno por uno (ver `P3-03`).
- **Reproducción de la evidencia nueva.** Los dos barridos de `requiere_maqueta` de `03/README.md` §9, el `grep` del campo `Versión` de §4, los cuatro `grep -c -i` contra el snapshot v3.4 y contra el intake vigente que citan `CU-13`, `CU-18`, `CU-38`, `RN-20` y `Glosario-Funcional.md`, el conteo de las tres carpetas `_legacy/2026-08-01/` de `03` y las tres afirmaciones de `README` §9.1 sobre la maqueta.
- **Las once filas del bloque de flags** contra la sección del intake que cada una cita, con el número de línea y la sección contenedora resueltos por script.
- **Estructura.** Un solo H1 por documento; tabla de contenido presente; las once secciones obligatorias en los 13 CU del incremento; las siete en las 3 RN; los 19 wireframes con su nombre canónico de superficie declarado.
- **Idioma y registro.** Cero emojis y cero caracteres del rango pictográfico en los 128 documentos de `02` y `03`.
- **Identificadores.** `CU-01` a `CU-39` sin huecos, `RN-01` a `RN-40`, `RC-01` a `RC-19`, `B-01` a `B-32`, `B-UX-01` a `B-UX-34`, `SUP-01` a `SUP-19`. Conteos en disco: 39 CU, 40 RN, 19 RC, 19 wireframes, 4 representaciones, 26 artefactos de `03`.

---

## 3. Estado de las cinco condiciones para promover del informe r1

Es el eje de este re-audit. Ninguna condición se dio por cerrada porque una fila de control de cambios lo diga: cada una se verificó en el contenido.

| # | Condición del r1 §7 | Estado | Evidencia que lo demuestra |
|---|---|---|---|
| 1 | Cerrar **P0-01**: re-apuntar a la versión vigente la trazabilidad upstream de los veinte documentos de `02`, corregir «El intake vigente es v3.4» del índice maestro y separar las marcas `[+3.4]` y `[+3.5]` en `Glosario-Funcional.md` | **CERRADA** | Los **20** documentos declaran «el intake vigente es **v3.7**, verificado en el campo `Versión` de su cabecera el 2026-08-02»; el barrido devuelve `v3.7` en los 20 y ninguna afirmación de vigencia sobre una versión superada en todo el árbol. `Especificacion-Funcional.md` cabecera ya no afirma v3.4. Las marcas se separaron: «Fases del despliegue», «Materializado y sin arrancar», «Cuarentena» y «Política de fallo al arrancar» pasaron a `[+3.5]` y su cita apunta a `_legacy/2026-08-02/…-v3.5.md`. Los términos que quedan en `[+3.4]` se verificaron uno por uno contra el snapshot y **todos resuelven**. Queda un residuo de conteo, `P2-01`, que no reabre el P0 |
| 2 | Cerrar **P0-02**: reescribir la evidencia del barrido de `requiere_maqueta` por lo que reproduce | **CERRADA** | Los dos barridos de `03/README.md` §9 se corrieron: `grep -c requiere_maqueta` devuelve `…MANIFEST…:10` y `…INTAKE…:0`, exactamente lo declarado; `grep -rnE "requiere_maqueta[[:space:]]*(==\|=\|:)[[:space:]]*(true\|false)" SDD/Intake/` devuelve **una** línea, `…MANIFEST…:162:- requiere_maqueta: true`, con el número de línea que el documento transcribe. El `grep` del campo `Versión` de §4 devuelve `16:\| Versión \| 3.7 \|`, también literal |
| 3 | Cerrar **P1-01**: retirar de `FA-05`, `CA-07`, `CA-09` y `US-CU-38-6` lo que decide, y ampliar `B-31` | **CERRADA** | `FA-05` dejó de titularse «Recuperación **automática**» y ahora es «Recuperación del despliegue anterior por fallo al arrancar», con una tabla que enumera los tres puntos abiertos de la fuente y qué queda sin especificar en cada uno. `CA-07` cierra con «**No se evalúa acá si el sistema la ejecuta solo o la ofrece**… el criterio se cumple con las dos lecturas». `CA-09` cierra con «**Qué levanta la cuarentena no se evalúa acá porque ninguna fuente lo declara**». `US-CU-38-6` conserva identificador y retira «y sacarlo de ahí», declarándolo. `B-31` pasó de tres puntos a **seis**, con los tres de la fuente y los tres propios discriminados |
| 4 | Cerrar **P1-02** y **P2-02** en una sola emisión v3.6 del intake | **CERRADA, en dos emisiones y no en una** | `P1-02`: el anexo E-23 pasa la fila de `Q-19` de «Abierta» a «**Decidida el 2026-07-31: sí**» y reformula la de `Q-20`, con un párrafo que declara por qué la tabla cambia sin que ninguna decisión nueva se haya tomado. `P2-02`: la 3.6 rehízo el agregado de §4 y **dejó el de §19 sin tocar**; la 3.7 lo completó. El propio control de cambios lo declara así en lugar de presentarlo como una sola operación. Verificado por diff v3.5→v3.6→v3.7. Queda un residuo de clasificación, `P3-05` |
| 5 | Los P2 y P3 restantes se documentan y no bloquean | **CERRADA, y con los seis efectivamente corregidos** | `P2-01`: `03/README.md` §4 declara **catorce** artefactos y «**cuatro** wireframes» a 2.1, y lo evidencia con las catorce copias de los tres `_legacy/2026-08-01/`, verificadas en disco. `P2-03`: las cinco ocurrencias de «autoarranque apagado» declaran el punto abierto —`CU-13` `FA-06`, `CU-18` `FA-06` y `CA-07`, `CU-38` `FA-05` y §10, `RN-20` §5 y la entrada del glosario—. `P2-04`: el ancla es `#39-criterio-negativo-…` y resuelve. `P3-01`: los bloques de `Experiencia-De-Uso.md` §10.2 quedan en orden 1.1, 2.1, 2.2, 2.4. `P3-02`: la nota de §4 del intake declara «**[D], agente humano del proyecto, 2026-08-01**». `P3-03`: `Glosario-UX.md` §8.2 cita v3.7 como vigente y traza la nota a la v3.4, y la corrección se aplicó además a una segunda ocurrencia que el r1 no había enumerado |

**Ninguna fila de control de cambios previa se reescribió.** Verificado por script sobre las 34 copias de `_legacy/2026-08-01/`: sus filas existen literal en el archivo vivo. La única fila que la ronda modificó es la **2.4 del 2026-08-01 de `03/README.md`**, que es la fila de la **versión en curso** y no una fila anterior; el documento lo declara explícitamente y acota qué dos cláusulas tocó. Se evaluó y no se eleva como violación de `Master-Prompt.md` §5.1, que prohíbe modificar el cuerpo de un snapshot y no la fila de la versión que se está emitiendo. Sí queda un residuo de esa reescritura, `P2-03` de este informe.

---

## 4. Matriz D1-D9

Evaluada sobre los 24 documentos vivos de `SDD/Docs/` y los 2 de `SDD/Intake/` que el incremento alcanza.

| Invariante | Intake v3.7 | Manifiesto v2.2 | 02 (20 docs) | 03 (4 docs) | Observación |
|---|---|---|---|---|---|
| D1 · Idioma y registro | Conforme | Conforme | Conforme en los 20 | Conforme en los 4 | Español rioplatense neutro técnico. Cero emojis y cero caracteres del rango pictográfico en los 128 documentos de `02` y `03`. Los once glifos del intake siguen confinados al arte ASCII de §20.18 y son anteriores a esta ronda |
| D2 · Encoding y tablas | Conforme | Conforme | Conforme | Conforme | UTF-8, LF. Ninguna tabla nueva con encabezado incompleto ni fila con placeholder sin cerrar |
| D3 · Título-Con-Guiones | No aplica | No aplica | Conforme | Conforme | Ningún archivo nuevo en la ronda |
| D4 · Versionado con guion medio | Conforme | Conforme | Conforme en los 20 | Conforme en los 4 | Cero sufijos de versión en carpeta viva. Las tres copias de `SDD/Intake/_legacy/2026-08-02/` llevan `-v<X.Y>.md` y su cabecera declara esa misma versión |
| D5 · Deprecación y control de cambios | Conforme, con `P3-04` | Conforme | Conforme en los 20 | Conforme en los 4 | Las 24 correcciones de `SDD/Docs/` se absorbieron dentro de la versión en curso sin archivar de nuevo, que es lo correcto en estado `Propuesto`. El intake y el manifiesto sí archivaron, por estar `Aprobado` y `Vigente`. La v3.6 se emitió **sin su fila** y la omisión se declara y se corrige en la 3.7: es `P3-04` |
| D6 · Trazabilidad | Conforme | Conforme | **Conforme**: el P0-01 del r1 quedó cerrado | Conforme, con `P3-02` | Las citas de `02` apuntan ahora a la versión que efectivamente contiene cada bloque, y el criterio que lo gobierna está declarado como regla en `Especificacion-Funcional.md` §8 |
| D7 · Vocabulario del dominio fuente | No aplica | No aplica | Conforme en los 20 | Conforme en los 4 | Ningún stack concreto, producto comercial ni protocolo del dominio fuente en lo que la ronda emite. El manifiesto sí los nombra, y corresponde: es artefacto de composición y no de categoría |
| D8 · Conjunto cerrado | Conforme | Conforme | Conforme | Conforme | `web-monolith` declarado en el manifiesto §2, en el índice maestro y en el bloque de flags nuevo |
| D9 · Evidencia verificable | Conforme | **No conforme**: `P1-01` | Conforme, con `P2-01` y `P2-02` | Conforme, con `P2-03` | **Toda la evidencia nueva del incremento reproduce**, incluidos los dos barridos que el r1 castigó y los cuatro `grep` contra el snapshot v3.4. Lo que no se sostiene son tres conteos que un documento afirma sobre sí mismo, y una salvedad del manifiesto que su propia fuente contradice |

**Nota sobre el alcance de D9.** Se aplicó únicamente a las afirmaciones sobre el estado del sistema, según la tabla de `Deriva-Rules.md` §1. Las afirmaciones de especificación no requieren evidencia y no se auditaron contra ella; lo que sí se auditó de ellas es si cierran una decisión que la fuente declara abierta, que es materia del eje 7 y no de D9.

---

## 5. Matriz de estructura obligatoria

Sobre los documentos del incremento. Ninguna corrección del 2026-08-02 renumeró ni retiró una sección.

| Clase de documento | Cuántos en el incremento | Cabecera | Secciones obligatorias | Tabla de contenido | Resultado |
|---|---|---|---|---|---|
| `CU-XX` (`Rules-Especificacion-Funcional` §4.2, once secciones) | 13 | Los 6 campos presentes en los 13 | Las **once** presentes en los 13, en orden, verificado por script | Presente en los 13 | Conforme. Seis suman §13, admitida por §4.3 para `web-monolith` |
| `RN-XX` (§4.2.1, siete secciones) | 3 | Presentes | Las **siete** presentes en los 3 | Presente | Conforme |
| `Modelo-Conceptual.md` (§4.2.2) | 1 | Presente | Sin cambio estructural | Presente | Conforme |
| `Glosario-Funcional.md` (§4.2.4, cinco secciones) | 1 | Presente | Las cinco; §3 declara nueve familias polisémicas y §3.9 el criterio negativo con sus cuatro constancias | Presente | Conforme |
| `Especificacion-Funcional.md` y `README.md` de `02` | 2 | Cabecera con los seis campos | Índice maestro con matriz NB→CU→RN→US, §8 de convenciones —donde entra la regla de cita de versión— y §9 con sus 32 brechas | Presente | Conforme |
| `README.md` de `03` (§3.4) | 1 | Presente | Artefacto, propósito, variante y estado de los 26; §9 con sus cinco subsecciones | Presente, con las cinco subsecciones | Conforme |
| `Glosario-UX.md` | 1 | Presente | Diez secciones, con §8 de polisemia y §9.2 de criterio negativo con once constancias | Presente | Conforme |
| `Experiencia-De-Uso.md` (§4.2, once secciones) | 1 | Presente | Las once | Presente | Conforme |
| `Wireframes-<Superficie>` (`Rules-UX-UI-DX` §4.2.1, nueve secciones) | 1 | Los 7 campos, incluida `Variante` | Las nueve | Presente | Conforme |
| `PRODUCT-INTAKE` v3.7 | 1 | Presente | Partes A a E, checklist de §19, control de cambios | Presente | Conforme |
| `PRODUCT-MANIFEST` v2.2 | 1 | Presente | §1 a §4 del formato de referencia, más el bloque de flags nuevo en §2 | No exigida por el formato | Conforme. El bloque de flags **extiende** el formato de `PRODUCT-MANIFEST-template.md`, que no lo prevé: ver §9 |

Ninguna sección obligatoria falta en ningún documento del incremento.

**Criterios de aceptación de `Rules-UX-UI-DX.md` §6 que la confirmación del flag activa.** Con `requiere_maqueta` == true confirmado, los dos criterios condicionados pasan a aplicar. El primero —«cada wireframe declara un nombre canónico de superficie estable, y su tabla de estados enumera todos los estados que la maqueta va a tener que demostrar»— **se cumple**: los 19 wireframes declaran nombre canónico, verificado por script. El segundo, que exige `Linea-Base-Visual.md`, `Contrato-Datos-Maqueta.md` y `Bitacora-Validacion-Maqueta.md`, **no aplica todavía**: está condicionado a «maqueta ya aprobada», y `03/README.md` §9.5 declara que los cuatro artefactos no existen y que son de los pasos 8 y 9 de la fase. La declaración es correcta y verificada en disco.

---

## 6. Los siete ejes de esta ronda

**Eje 1 — Las cinco condiciones del r1.** Cerradas las cinco. El detalle está en §3.

**Eje 2 — Ninguna fila de control de cambios previa reescrita.** Verificado por script sobre las 34 copias de `_legacy/2026-08-01/`: 34 de 34 con todas sus filas intactas. La única fila tocada es la de la versión en curso de `03/README.md`, declarada y acotada. Ver §3, párrafo final.

**Eje 3 — Las evidencias nuevas reproducen.** Se corrieron todas. La atención particular que el enunciado pide sobre los barridos de `SDD/Intake/` está justificada y el incremento la resolvió bien: la evidencia anterior de `03/README.md` §9 **dejó de reproducir el mismo día** al cambiar el manifiesto de 2.1 a 2.2, y el documento **lo declara y rehace el barrido entero** en lugar de conservar la cifra vieja. Los dos comandos devuelven hoy exactamente lo transcripto, incluida la línea 162. En la misma línea, la nota de `Glosario-Funcional.md` §2 apunta el snapshot de la v3.5 a `_legacy/2026-08-02/` y no a la ruta viva, que es donde estaba a la mañana: la cita habría dejado de resolver y no lo hace.

**Eje 4 — El criterio de cita de versión del intake.** La regla está declarada en dos lugares con la misma sustancia: `02/Especificacion-Funcional.md` §8, en tabla de dos filas, y `03/README.md` §4, en dos puntos numerados. Las dos mitades coinciden —cabecera, versión vigente; cuerpo y control de cambios, versión que originó el contenido, que no se re-apunta nunca— y las dos derivan la misma consecuencia: una cita del cuerpo tiene que resolver en el snapshot. **No rompe ninguna traza a `SDD/Intake/_legacy/`**: los 1369 enlaces relativos resuelven, las tres copias que `03/README.md` §4 nombra existen, y las citas `[+3.4]` que quedan en el glosario se verificaron una por una contra el snapshot. La **aplicación efectiva difiere entre las dos categorías**: `02` separa por bloque cuando un documento incorpora contenido de dos versiones, y `03` no lo hace en sus wireframes, donde además no hay campo de cabecera al que la primera mitad de la regla se aplique. Es `P3-02`, y no compromete la resolución porque la v3.5 contiene todo lo que la v3.4 contiene.

**Eje 5 — El bloque de flags de `Master-Prompt.md` §4.** Las **once filas** se verificaron contra la sección del intake que cada una cita, con la sección contenedora resuelta por línea. **Diez resuelven sin objeción**: `equipo_n` (§2 línea 455 «Dos desarrolladores **[E]**» y §10 «Equipo · 2 desarrolladores»), `usa_llm`, `tiene_ui_final` (§17.P.1, Blazor Interactive Server), `multi_tenant` (§17.P.4 «No aplica…»), `tiene_auth` (§17.P.5), `tiene_portal_developers`, `tiene_extensibilidad` (§18 «El punto de extensión del producto es el adaptador… detrás de `IContenedorEngine`» y `CP-05` en §22.5), `tiene_persistencia` (§17.P.4), `requiere_compliance` (§10 línea 715) y `requiere_maqueta`.

- **`equipo_n` = 2.** Se sostiene. La consecuencia que la fila deriva —07 produce sprint plan completo y no `Mini-Plan.md`— es la regla literal de §4, y `Rules-Plan-Sprint.md` la confirma: su tabla maestra declara `Mini-Plan.md` para proyectos de un dev y lo omite para equipos de más de uno. Ningún documento vivo del árbol declara lo contrario.
- **`tiene_observabilidad_critica` = true.** La **derivación se sostiene** contra la regla literal de §4, que activa el flag ante «SLO de disponibilidad >= 99.9 % **o** latencia p99 con métrica numérica»: no hay SLO —§17.P.10 lo declara ausente con marcador `[E]`— y sí hay p99 numérica de ≤ 300 ms. La fila cita las dos cosas correctamente y la disyunción se lee bien. Lo que **no está declarado con la precisión que D9 exige es la salvedad**: afirma que el umbral es «propuesto y **no confirmado por la fuente**», y la fuente que cita declara lo contrario en la misma sección. Es `P1-01`.

**Eje 6 — La confirmación de `requiere_maqueta` en `true`.** Está escrita donde el framework la busca: el bloque literal de `Master-Prompt.md` §4 vive en el manifiesto §2, con las once filas y su origen, y la fila del flag declara la fecha de la confirmación y el actor. **Ninguna afirmación viva del árbol declara que el flag no tiene valor**: el barrido sobre `SDD/Docs/` y `SDD/Intake/` devuelve once ocurrencias vivas y las once son coherentes con `true`. Las dos reglas de la Fase B2 pasan de previstas a aplicadas de forma coherente en los dos lados: el manifiesto §1.1 antepone la nota que las declara aplicadas, y `03` lo consume en dos lugares —`README.md` §9 y `Experiencia-De-Uso.md` §9.1, fila «Validación visual de maqueta»—. Las dos afirmaciones históricas del manifiesto que decían que el flag no tenía valor **no se reescriben y se declaran superadas con su fecha**, que es el tratamiento correcto para un registro fechado. Queda un residuo: la fila de la tabla de procedencia de §1.1 sigue diciendo «por la Fase B2 **prevista**» y la nota no la enumera entre las afirmaciones que supera. Es `P3-01`.

**Eje 7 — La ronda de corrección no decidió nada.** Verificado uno por uno contra los tres puntos que el intake §4 declara sin decidir:

| Punto que la fuente declara abierto | `CU-38` | `CU-13` / `CU-18` | `RN-20` | `Glosario-Funcional.md` |
|---|---|---|---|---|
| Recuperación del anterior: ¿automática u ofrecida? | **Abierto y declarado.** `FA-05` perdió el título «automática», su tabla enumera las dos lecturas con lo que cada una obliga, y `CA-07` excluye el punto de lo que evalúa | **Abierto y declarado** en el párrafo «Qué de este flujo alternativo está declarado por la fuente y qué no» de `FA-06` en los dos | No aplica: la regla no lo toca | **Abierto y declarado** en la entrada «Política de fallo al arrancar» |
| ¿Apaga el autoarranque o la participación? | **Abierto y declarado** en `FA-05`, en §10 y en `B-31` punto (b) | **Abierto y declarado**; `CU-18` `CA-07` lo excluye además del criterio | **Abierto y declarado** en §5, con la constancia de que el enunciado de §1 no depende de cuál sea | **Abierto y declarado**, con el punto (b) citado |
| ¿Dónde se avisa? | **Abierto y declarado**; se dice que el estado es observable y que el canal no está declarado | **Abierto y declarado** | No aplica | **Abierto y declarado** |
| ¿Qué levanta la cuarentena? (lo levanta `02`) | **Abierto y declarado**; `CA-09` lo excluye y `US-CU-38-6` acota su enunciado por ese motivo | — | — | La entrada «Cuarentena» cierra con «**Qué la levanta no está declarado**» |

`B-31` pasó de tres puntos a **seis**, con los tres de la fuente y los tres propios discriminados, en `Especificacion-Funcional.md` §9 y en `CU-38` §10 con la misma redacción. Las brechas `B-29` a `B-32` y `B-UX-31` a `B-UX-34` siguen **todas abiertas**: ninguna cerró, ninguna nueva se abrió y ninguna cambió de destinatario. El rango de identificadores no se movió. **La contradicción interna que el r1 señaló entre `B-31` y `FA-05` desapareció**, y desapareció por el lado correcto: retirando lo que decidía, no ampliando la decisión.

Del lado del intake, las versiones 3.6 y 3.7 **no toman ninguna decisión**: la 3.6 alinea el anexo E-23 con lo que §19 ya declaraba desde la 3.4 —verificado en el snapshot v3.4, línea 5225— y la 3.7 rehace conteos. La única escritura de decisión del día es la confirmación de `requiere_maqueta` por el agente humano del proyecto, que es el caso (a) de escritura de `Master-Prompt.md` §13 regla 2 y está declarada como tal.

---

## 7. Coherencia cross-doc y gobierno del glosario

**Referencias.** Los **1369** enlaces relativos a archivo de los 128 documentos vivos de `02` y `03` resuelven. Las **1400** anclas verificables dentro del corpus resuelven, incluida la que el r1 levantó. Los identificadores no colisionan y no se movieron.

**Trazabilidad D6 de lo que la ronda emite.** Ningún artefacto se agrega ni se retira. Hacia arriba, los 20 documentos de `02` declaran la versión vigente del intake y la versión de origen de cada bloque; los 4 de `03` que la ronda toca hacen lo propio en los lugares donde su formato lo admite. Hacia abajo, `03/README.md` §9 y `Experiencia-De-Uso.md` §9.1 consumen el flag del manifiesto citándolo por versión y sección. La cadena cierra en las dos direcciones.

### 7.1 Los cuatro criterios de gobierno del glosario

| Criterio | Resultado | Evidencia |
|---|---|---|
| **Sin contradicciones** | Conforme | El incremento no cambia ninguna definición de referente. `Glosario-Funcional.md` §2 conserva sus 120 términos con el mismo reparto; lo único que cambia en dos entradas —«Cuarentena» y «Política de fallo al arrancar»— es que declaran aparte los puntos que la fuente deja abiertos, sin alterar el referente. `Glosario-UX.md` §5.2 sigue referenciando sin redefinir. La familia «construir» se declara con **dos** referentes en `02` y **tres** en `03`, y la entrada de `03` explica por qué su categoría tiene el tercero: no es contradicción sino alcance distinto, y está declarado |
| **Completitud** | Conforme | La ronda del 2026-08-02 no acuña ningún término nuevo: corrige citas, conteos y declaraciones de apertura. Los once términos que la ronda anterior incorporó siguen en §2 y siguen apareciendo en más de un artefacto; se muestrearon tres —«cuarentena», «fases del despliegue» y «política de fallo al arrancar»— y los tres aparecen en `CU-13`, `CU-18`, `CU-38`, `RN-20` y el índice maestro |
| **Polisemia gobernada** | Conforme | Las nueve familias de `02` y las dos de `03` conservan su entrada con la verificación de colisión que `Vocabulario-Rules.md` §9.4 exige. `Glosario-UX.md` §8.2 declara la escalera de §9.3 y por qué adopta el segundo escalón acotado a R1. La forma desnuda de una familia calificada se buscó: «el registro» a secas no aparece designando ninguno de los cinco referentes en lo que la ronda emite, y «construir» sin complemento tiene su única ocurrencia declarada con su ubicación y su tratamiento |
| **Criterio negativo** | Conforme, y aplicado con rigor | `Glosario-Funcional.md` §3.9 deja **cuatro** constancias y `Glosario-UX.md` §9.2 deja **once**, con la sección de cada caso nombrada. Se revisaron las quince y ninguna se levanta en este informe |

### 7.2 Polisemias evaluadas y descartadas, para que la ronda siguiente no las levante

Se evaluaron y se descartaron por contextos disjuntos. Reportar cualquiera de ellas como defecto del documento auditado sería un defecto del informe, según `Vocabulario-Rules.md` §10 y `Master-Prompt.md` §10. Las nueve primeras filas **ya estaban descartadas en el informe r1 §5.2 y se ratifican**; las tres últimas se evalúan por primera vez acá, sobre el delta del 2026-08-02.

| Término | Referentes | Por qué no es hallazgo |
|---|---|---|
| **«cuarentena»** | Un solo referente en el corpus: la marca del servicio | No es polisemia. Ratificado |
| **«reposo»** | Estado del contenedor creado y sin arrancar; «reposo legítimo» como calificación del desenlace | Mismo referente visto como estado y como propiedad. Ratificado |
| **«recuperar»** | Recuperar el despliegue anterior; recuperar espacio en disco; recuperación ante error de la taxonomía UX | Tres contextos disjuntos, con la segunda siempre como «espacio recuperable» y la tercera como «vía de recuperación». Ratificado |
| **«distintivo»** | La zona de distintivos del nodo; el de cuarentena; el de no reproducible | Un referente de composición y dos instancias suyas. Ratificado |
| **«fase»** | Las tres fases del despliegue; las fases del framework; la fase de un plan de entrega | Contextos disjuntos: producto, proceso de generación y plan. Ratificado |
| **«disparador»** | El tercer eje del despliegue; el disparador de un flujo alternativo | El segundo es término de forma de las reglas, declarado en `Glosario-Funcional.md` §2.10. Ratificado |
| **«almacén»** | El almacén local de imágenes; el almacén de imágenes del motor | Mismo objeto con dos precisiones, una sola entrada de glosario. Ratificado |
| Las **once** constancias de `Glosario-UX.md` §9.2 | «esqueleto», «asimetría», «pertenencia», «zona», «etiqueta», la familia «proyecto», «registro», «higiene / ámbito / procedencia / huérfano», «credencial rechazada», «sugerencia» y «migración» | Verificadas por ocurrencia por la propia categoría, con la sección de cada una nombrada. Se revisó la verificación y se la encontró correcta. Ratificado |
| Las **cuatro** constancias de `Glosario-Funcional.md` §3.9 | «registro» como anotación corriente, la familia «proyecto», «migración» en las filas de control de cambios, «repositorio remoto» con sus dos usos | Igual que la anterior. Ratificado |
| **«construir», dos referentes en `02` y tres en `03`** | Construir la imagen; crear el contenedor —que la regla prohíbe escribir con este verbo—; y construir una superficie de la maqueta, que sólo existe en `03` | **No es contradicción entre glosarios sino alcance distinto de cada categoría**, y las dos entradas lo declaran. Levantar la diferencia de conteo entre `§3.10` de `02` y `§8.2` de `03` sería el falso positivo que `Vocabulario-Rules.md` §9.1 describe |
| **«aplicada» / «prevista»** sobre una regla del framework | Regla «prevista» en el bloque de procedencia; regla «aplicada» desde la confirmación del flag | Son dos estados sucesivos del mismo referente, no dos referentes. Lo que sí se reporta —y por otro motivo— es que una fila de la tabla no siguió al cambio de estado: `P3-01` |
| **«flag»** | El nombre del indicador de `Master-Prompt.md` §4; y el valor que toma | Un objeto y su valor, no dos objetos. Ninguna sección los confunde |

---

## 8. Hallazgos

### P1-01 · La salvedad de `tiene_observabilidad_critica` afirma que el umbral p99 no está confirmado por la fuente, y la fuente que cita declara lo contrario en la misma sección

**Nivel:** P1
**Archivo:** `SDD/Intake/PRODUCT-MANIFEST-SelfHosted-Service.md`
**Sección:** §2, bloque de flags, fila `tiene_observabilidad_critica`

**Evidencia.** La fila dice: «**Salvedad declarada**: ese umbral está marcado **[S]**, **propuesto y no confirmado por la fuente**, de modo que el flag queda en `true` por la regla y no por una exigencia dura del producto».

La fuente que la fila cita es `PRODUCT-INTAKE` §17.P.10. Su **primera línea**, inmediatamente debajo del título de la sección, dice: «Los umbrales de PT-01 son **[E]**… **El resto es [S] S-03, confirmado el 2026-07-27**, salvo lo marcado». El umbral p99 —«Percentil 99 de los endpoints de lectura… ≤ 300 ms **[S]**»— es parte de ese resto.

La tabla de supuestos del intake lo confirma dos veces más: la fila **S-03**, «§17 P.10 · Los umbrales numéricos de los NFR que no vienen de una puerta técnica», figura **Confirmado el 2026-07-27**, con la resolución «Los umbrales propuestos se adoptan sin cambios»; y el párrafo que sigue a la tabla declara que «donde el marcador **[S]** aparece acompañado de la nota "confirmado el 2026-07-27" —en §8 y en los cuatro bloques de §17— **señala el origen del dato… y no una pendiente: un artefacto downstream puede tratar esos valores como cerrados citando esta tabla**». El mismo documento agrega, unas líneas más abajo, que «desde esta versión **no queda ningún marcador `[S]` abierto** en el documento».

**Qué sí se sostiene y qué no.** El **valor del flag no está en discusión**: por la regla literal de `Master-Prompt.md` §4 basta una latencia p99 con métrica numérica, y la hay. La fila cita bien las dos mitades de la disyunción y declara correctamente que **no hay SLO**, con el marcador `[E]` de la fuente. Lo que no se sostiene es la caracterización del umbral como no confirmado, que es una afirmación sobre el estado de un artefacto del repositorio y por lo tanto cae bajo D9, y que la fila no evidencia: cita el marcador `[S]` y la palabra «Propuesto» de la columna `Origen` de esa fila del NFR, y omite la línea de encabezado de la misma sección y la fila S-03 que la cierran.

**Por qué es P1 y no P0.** `Deriva-Rules.md` §1 reserva P0 para la evidencia que **no resuelve** —ruta, identificador o comando inexistente—. Acá la ruta resuelve, la sección existe y el marcador `[S]` está literalmente en la fila citada: lo que falla es la conclusión que se extrae de ella, que ninguna evidencia respalda y que la propia sección contradice. Es el caso de «afirmación de las que requieren evidencia y no la trae», que la misma sección tipifica como P1.

**Consecuencia aguas abajo.** La salvedad debilita el flag —«queda en `true` por la regla y no por una exigencia dura del producto»— y su destinatario declarado son las categorías 08 y 09, que todavía no se generaron. Un subagente de 09 que la lea puede concluir que el umbral de 300 ms es negociable cuando el intake lo declara adoptado sin cambios desde el 2026-07-27.

**Recomendación.** Reescribir la salvedad por lo que la fuente declara: el umbral es **[S] S-03, confirmado el 2026-07-27**, es decir de origen propuesto por el intake y **cerrado** desde esa fecha, de modo que el flag queda en `true` por la regla literal **y con un umbral que la fuente trata como dato cerrado**; lo que sigue siendo cierto y conviene conservar es que **no hay SLO de disponibilidad**, que §17.P.10 declara ausente con `[E]`. Se corrige sin tocar el valor del flag ni ninguna otra fila. Como el manifiesto está `Vigente`, la corrección sube minor y archiva, por `Master-Prompt.md` §5.

---

### P2-01 · La nota de marcas de `Glosario-Funcional.md` §2 declara doce filas con `[+3.4]` y en disco son once: «Archivo de construcción en línea» quedó sin marca

**Nivel:** P2
**Archivo:** `SDD/Docs/02-Especificacion-Funcional/Glosario-Funcional.md`
**Secciones:** §2, tabla de las dos marcas; y las filas de §2.2

**Evidencia.** La nota que la ronda del 2026-08-02 reescribe declara que llevan `[+3.4]` «**Siete** de los once nuevos —"Disparador del despliegue", "Imagen del almacén local", "No reproducible", "Almacén local", "Construir la imagen", "Crear el contenedor" y "Volver a un despliegue anterior"— y **las cinco filas preexistentes reescritas**». Siete más cinco son doce.

Contadas en disco, las filas de término con `[+3.4]` son **once**: las siete enumeradas, más «Vía de alta», «Origen», «Variante de origen» y «Repositorio remoto». La quinta fila preexistente reescrita es **«Archivo de construcción en línea»**, que la fila 1.2 del control de cambios del 2026-08-01 enumera con nombre entre las cinco —«y **Archivo de construcción en línea**, que declara ser la única construcción de imagen conservada»— y que en §2.2 **no lleva ninguna marca**.

La misma aritmética falla desde el otro lado. La fila del 2026-08-01 declara «Las **dieciséis** llevan la marca `[+3.4]`» —once nuevas más cinco preexistentes—; cuatro pasaron a `[+3.5]`, de modo que deberían quedar doce. La fila del 2026-08-02 declara, correctamente respecto del disco, «Los **once** restantes se verificaron uno por uno contra la copia de la 3.4 y todos resuelven». Once y doce no pueden ser las dos ciertas.

**Qué no se ve afectado.** Los once términos que sí llevan `[+3.4]` se verificaron uno por uno contra el snapshot `_legacy/2026-08-01/PRODUCT-INTAKE-SelfHosted-Service-v3.4.md` y **todos resuelven**: «alta unificada» devuelve 3, `F-10` devuelve 10, «almacén local» 3, «no reproducible» 3, «disparador» 7, «crear el contenedor» 22 y «volver a un despliegue anterior» 4. Y «archivo de construcción en línea» devuelve **6** sobre esa misma copia, de modo que la marca que le falta **habría resuelto**: el defecto es la ausencia de la marca, no una cita falsa. Ninguna definición, ningún referente y ningún conteo de §2 cambian.

**Por qué P2.** Es una cifra que el documento afirma sobre sí mismo y que no se sostiene al contarla, exactamente la clase que el r1 tipificó como `P2-01` para el conteo de artefactos de `03/README.md`. No rompe trazabilidad y no simula verificación.

**No pude determinar** si la marca de esa fila se perdió en la corrección del 2026-08-02 o si nunca se puso el 2026-08-01: el estado del documento al 2026-08-01 no existe en disco. En los dos casos, hoy la nota y las filas no concuerdan.

**Recomendación.** Poner `[+3.4]` en la fila «Archivo de construcción en línea» de §2.2 y dejar la nota como está —queda en doce y coincide—, o bien corregir la nota a «cuatro filas preexistentes» y la fila del 2026-08-01 a quince. La primera opción es la que conserva lo que la fila del 2026-08-01 declaró y no la reescribe.

---

### P2-02 · `Glosario-Funcional.md` §1.1 declara que la ronda modificó catorce artefactos, y modificó veinte

**Nivel:** P2
**Archivo:** `SDD/Docs/02-Especificacion-Funcional/Glosario-Funcional.md`
**Sección:** §1.1, párrafo «El corpus sigue en ciento un archivos el 2026-08-01»

**Evidencia.** El párrafo dice: «La ronda de decisiones del 2026-07-31 y del 2026-08-01 **no emitió ni retiró ningún artefacto: modificó catorce**, y el vocabulario nuevo salió del cuerpo de esos **catorce**».

En disco, la ronda modificó **veinte** artefactos de `02`. Se verifica de tres formas independientes: los cuatro `_legacy/2026-08-01/` de la categoría tienen **20** copias —13 en `Casos-De-Uso/`, 3 en `Reglas-De-Negocio/`, 3 en la raíz y 1 en `Modelo-Datos/`—, una por artefacto que cambió de versión; `git status` lista 20 archivos modificados bajo `02-Especificacion-Funcional/`; y la **fila 1.2 del control de cambios de este mismo documento**, fechada 2026-08-01, dice «todos salidos del cuerpo de los **veinte artefactos** que la ronda modificó».

El documento se contradice consigo mismo, y la cifra correcta es la de la fila. «Catorce» es el número de artefactos que cambiaron de versión en `03-UX-UI-DX`, no en `02`.

**Qué no se ve afectado.** El corpus de ciento un archivos es correcto: `02` tiene 102 documentos vivos y el glosario se excluye a sí mismo. El criterio de no recalcular los conteos de las celdas que la ronda no alcanza tampoco cambia.

**Por qué P2 y por qué está en alcance.** Es la misma clase que `P2-01`. Está en alcance porque la ronda del 2026-08-02 **editó esa misma oración**: su cláusula final —«llevan la marca de la versión del intake que las origina, `[+3.4]` o `[+3.5]` según la entrega de la fuente»— es contenido del 2026-08-02, ya que la separación de marcas es la corrección de ese día. No puedo determinar si «catorce» ya estaba antes de esa edición.

**Recomendación.** Corregir a **veinte**, que es lo que la propia fila 1.2 declara y lo que las veinte copias archivadas evidencian. Se absorbe dentro de la versión 1.2 citando este hallazgo.

---

### P2-03 · La fila 2.4 de `03/README.md` remite a tres comandos transcriptos en §9, y §9 transcribe dos

**Nivel:** P2
**Archivo:** `SDD/Docs/03-UX-UI-DX/README.md`
**Secciones:** §10, fila 2.4 del 2026-08-01, cláusula final; contra §9, primer punto

**Evidencia.** La fila 2.4 del 2026-08-01 —cuya cláusula sobre `requiere_maqueta` la ronda del 2026-08-02 reescribió para cerrar `P0-02`— termina diciendo: «el nombre del flag aparece **cuatro veces en el manifiesto y ninguna en el intake**, y el barrido de la forma de asignación sobre `SDD/Intake/` **no devuelve ninguna línea**; **los tres comandos y su salida literal están transcriptos en §9**».

§9 transcribe hoy **dos** comandos: `grep -c requiere_maqueta …` y `grep -rnE "requiere_maqueta…" SDD/Intake/`. El tercero que la fila supone —la lectura del campo `Versión`— vive en **§4** y no en §9, y llegó ahí con la misma ronda.

La causa es una interferencia entre las dos correcciones del 2026-08-02 sobre el mismo documento: la primera reescribió la cláusula de la fila 2.4 dejándola apuntando a un §9 de tres comandos, y la segunda —la que registra la confirmación del flag— **rehizo §9 entero** y lo dejó en dos, sin volver sobre la fila.

**Qué no se ve afectado.** Las cifras históricas de la fila son correctas para el 2026-08-01: el manifiesto v2.1 tenía cuatro menciones y el barrido de asignación no devolvía ninguna línea. Y el estado presente está bien declarado en §9 y en la fila 2.4 del 2026-08-02, con la evidencia que reproduce. Lo que no resuelve es el puntero.

**Por qué P2 y no P0.** No es una evidencia que simule verificación: los comandos existen, sus salidas están transcriptas y reproducen, y la fila es un registro histórico que la fila siguiente declara superado. Lo que falla es un conteo interno que el documento afirma sobre sí mismo, que es la clase P2.

**Recomendación.** Cambiar «los tres comandos» por «los dos barridos» en la fila 2.4, o remitir a §4 y §9 si se quiere conservar el tercero en la cuenta. Se absorbe dentro de la versión 2.4.

---

### P3-01 · La tabla de procedencia del manifiesto §1.1 sigue declarando las dos reglas de la Fase B2 «por la Fase B2 prevista»

**Nivel:** P3
**Archivo:** `SDD/Intake/PRODUCT-MANIFEST-SelfHosted-Service.md`
**Sección:** §1.1, fila «Reglas transversales aplicadas» de la tabla de procedencia

**Evidencia.** La fila dice: «…`Maqueta-Rules` 3.1 y `Deriva-Rules` 3.1 **por la Fase B2 prevista**». La nota de actualización del 2026-08-02 declara que la Fase B2 «deja de estar prevista y pasa a estar aplicada» y que las dos reglas «se leen como **aplicadas** y no como sujetas a confirmación», pero al enumerar qué queda superado nombra sólo «las dos afirmaciones de esta sección que declaran que el flag no tiene valor en ninguna fuente —la del párrafo "Lo que sigue abierto" y la del párrafo anterior—». **La fila de la tabla no está entre las dos**, y es la que un agente aguas abajo lee cuando quiere saber bajo qué normativa se genera.

**Por qué P3 y no más.** La nota que precede a la tabla en la lectura declara explícitamente cómo se leen esas dos reglas, de modo que quien recorre §1.1 completa obtiene el dato correcto; y el valor operativo del flag vive en §2, que es lo que la nota indica. El defecto es de alcance de la enumeración, no de contenido.

**Recomendación.** Ampliar la enumeración de la nota para incluir la fila de la tabla, o cambiar «por la Fase B2 prevista» por «por la Fase B2, aplicada desde el 2026-08-02». La segunda opción toca una fila de una tabla que la nota declara vigente y no un registro fechado, de modo que no colisiona con el criterio de no reescribir lo ya registrado.

---

### P3-02 · La aplicación efectiva de la regla de cita de versión en `03` es más acotada que la regla declarada, y difiere de la de `02`

**Nivel:** P3
**Archivos:** `SDD/Docs/03-UX-UI-DX/README.md` §4; y la fila «Insumo del intake» de la §8 de los wireframes que la ronda del 2026-08-01 tocó
**Secciones:** §4, punto 1 y punto 2

**Evidencia.** La regla declara dos mitades. La primera —«la trazabilidad upstream de la **cabecera** cita siempre la versión vigente del intake»— **no tiene dónde aplicarse en 23 de los 26 artefactos de la categoría**: los 19 wireframes y las 4 representaciones no llevan campo de trazabilidad upstream en la cabecera, y su cita del intake vive en la fila «Insumo del intake» de la tabla de §8, que por la segunda mitad de la regla no se re-apunta. El `README` no declara esa asimetría, de modo que la regla se lee como si obligara a los 26.

La segunda mitad —«el cuerpo conserva la versión que **originó** cada contenido»— se aplica en `02` **separando por bloque** cuando un documento incorpora contenido de dos versiones: `CU-13`, `CU-18`, `CU-38`, `RN-20`, `Glosario-Funcional.md` y el índice maestro citan «de la v3.4… de la v3.5…» con lo que vino de cada una. En `03` no: `Wireframes-Panel-Lateral-Del-Servicio.md`, por ejemplo, declara «Insumo del intake · **v3.5**» y enumera bajo esa versión la nota del tercer eje y la de construir la imagen contra crear el contenedor, que **entraron en la v3.4**.

**Por qué P3.** Ninguna cita deja de resolver: la v3.5 completa a la v3.4 sin retirarle nada, y el snapshot de la v3.5 existe y contiene los cinco bloques que la fila enumera, verificado. El defecto es de precisión, no de localización, y es exactamente el que la regla dice querer evitar cuando la enuncia como «la versión que originó cada contenido».

**Recomendación.** Declarar en `README.md` §4 que la primera mitad de la regla aplica a los artefactos que llevan trazabilidad upstream en cabecera y que en los wireframes y las representaciones su equivalente es la fila «Insumo del intake», que por construcción se rige por la segunda mitad. Y, si se quiere alinear con `02`, separar por bloque las filas «Insumo del intake» que hoy citan v3.5 para contenido de la v3.4, en la ronda que toque esos artefactos y no antes.

---

### P3-03 · El `README.md` de `02` declara que lo que la ronda puso al día entró en la v3.4, y una de las filas que puso al día resume contenido de la v3.5

**Nivel:** P3
**Archivo:** `SDD/Docs/02-Especificacion-Funcional/README.md`
**Secciones:** cabecera, trazabilidad upstream; contra §3, fila de `CU-38`

**Evidencia.** La cabecera dice: «**Lo que la ronda del 2026-07-31 y del 2026-08-01 puso al día acá entró en la v3.4**, y se cita por esa versión en el control de cambios porque es la que permite localizarlo en el snapshot». La fila de `CU-38` de §3 dice: «`Q-19` quedó decidida en positivo: **la exige la política de fallo al arrancar**, que ante un despliegue que no arranca recupera el anterior y, si ése tampoco arranca, deja al proyecto corriendo y **manda al servicio a cuarentena**».

`Q-19` y la frase «la exige la política de fallo al arrancar» **sí** están en la v3.4: `grep -c -i "política de fallo al arrancar"` sobre el snapshot devuelve **2**, y la fila de `Q-19` de §19 los contiene. La cuarentena **no**: sobre el mismo snapshot `grep -c -i "cuarentena"` devuelve **0**.

**Por qué P3 y no más.** La misma cabecera declara, una oración antes, que «**este documento no deriva contenido del intake: indexa los artefactos de la categoría y toma de ellos su estado**». Bajo esa declaración, la fila de `CU-38` es un resumen de `CU-38`, que sí cita correctamente sus dos versiones de origen, y no una cita al intake. La imprecisión está en el alcance de la cláusula «entró en la v3.4», no en una traza rota.

Se verificaron por el mismo criterio los otros dos documentos de `02` que citan sólo la v3.4 y mencionan la política: `Modelo-Conceptual.md` §9 y `RN-40` §5 y §6 **resuelven los dos**, porque lo que afirman —que la política exige la operación y que recupera el despliegue anterior por su digesto— está textualmente en la fila de `Q-19` de la v3.4. No son hallazgo.

**Recomendación.** Acotar la cláusula de la cabecera a «lo que este índice cita del intake entró en la v3.4; los estados que toma de sus artefactos se rigen por la cita de cada uno», o citar las dos versiones como hacen los otros diecinueve documentos.

---

### P3-04 · La versión 3.6 del intake se emitió sin su fila de control de cambios, y el snapshot archivado preserva la omisión

**Nivel:** P3
**Archivos:** `SDD/Intake/PRODUCT-INTAKE-SelfHosted-Service.md` control de cambios; `SDD/Intake/_legacy/2026-08-02/PRODUCT-INTAKE-SelfHosted-Service-v3.6.md`
**Sección:** control de cambios

**Evidencia.** El snapshot de la v3.6 tiene el campo `Versión` en 3.6 y **no tiene fila 3.6** en su control de cambios: su tabla pasa de la fila 3.5 a la 3.4, verificado por barrido sobre el archivo. `Master-Prompt.md` §13 regla 3 obliga a que toda escritura agregue entrada al control de cambios.

La omisión **está declarada y corregida**: la fila 3.6 existe hoy en la versión vigente, con el texto «**Fila registrada el 2026-08-02 junto con la versión 3.7**: la emisión de la 3.6 subió el campo `Versión` de la cabecera, archivó la 3.5 y escribió los tres cambios, pero **no dejó su fila acá**, contra la regla 3 de `Master-Prompt.md` §13… Se registra en lugar de dejarse implícita, y se declara la omisión en lugar de escribir la fila como si hubiera estado desde el principio».

**Por qué P3.** La traza no se pierde: la fila vive en la versión vigente, que es la que la cadena consume, y el diff v3.5→v3.6 confirma que lo que la fila declara es exactamente lo que la 3.6 cambió. El costo residual es que quien abra el snapshot v3.6 aislado no encuentra ahí qué lo distingue de la v3.5. La declaración explícita es el tratamiento correcto y conviene que se conserve como precedente.

**Recomendación.** Ninguna corrección sobre el snapshot: `Master-Prompt.md` §5.1 prohíbe modificar el cuerpo archivado. Se registra para que la próxima emisión del intake escriba la fila en la misma operación que sube el campo `Versión`.

---

### P3-05 · El intake cuenta `Q-5` entre las pendientes resueltas en §19 y la cuenta aparte en §4, en dos agregados rehechos por la misma corrección

**Nivel:** P3
**Archivo:** `SDD/Intake/PRODUCT-INTAKE-SelfHosted-Service.md`
**Secciones:** §4, «Aritmética actualizada en la versión 3.6»; y §19, fila «Pendientes de decisión» de la tabla de los tres registros, y párrafo «Seis de las diecisiete están resueltas»

**Evidencia.** §4, reescrito por la v3.6, declara: «**doce cerradas**, **cinco con propuesta escrita y sin confirmar**, **once abiertas sin propuesta cerrada** y **una sin objeto**. **Una pendiente sin objeto no es una pendiente resuelta y por eso se cuenta aparte**: nadie decidió lo que preguntaba, dejó de haber qué decidir».

§19, reescrito por la v3.7, declara: «veintidós en total, de las cuales **siete están resueltas** —la matriz de navegadores…; `Q-15`, `Q-17`, `Q-27` y `Q-6` el 2026-07-30; `Q-19` el 2026-07-31; y **`Q-5` sin objeto**— y **quince siguen abiertas**»; y más abajo «**Seis de las diecisiete están resueltas**… `Q-19` decidida en positivo, y `Q-5` **sin objeto**».

Las dos aritméticas cierran sobre sus propios universos —12+5+11+1 = 29 filas en §4; 7+15 = 22 y 6+11 = 17 en §19— y no hay error de suma. Lo que difiere es la **clasificación de `Q-5`**: §4 la separa de las resueltas por un motivo que enuncia, y §19 la incluye entre ellas aunque la rotule «sin objeto» en la misma línea.

**Por qué P3.** Ningún lector se lleva una decisión que no se tomó: las tres menciones dicen «sin objeto» de forma explícita y la fila de `Q-5` de la tabla lo declara con su motivo. Y ninguna cifra es incorrecta dentro de su universo.

**Recomendación.** Alinear §19 con el criterio que §4 enuncia: «seis resueltas y una sin objeto» y «cinco de las diecisiete resueltas, una sin objeto y once abiertas», o declarar en §19 que agrupa las dos categorías a propósito. Se corrige en la próxima emisión del intake, con su fila.

---

## 9. Observaciones evaluadas y no elevadas a hallazgo

Se dejan escritas para que la ronda siguiente no las levante ni las vuelva a evaluar desde cero.

| Observación | Por qué no es hallazgo |
|---|---|
| **El bloque de flags extiende el formato de `PRODUCT-MANIFEST-template.md`**, que no tiene sección de flags, y `Intake-Rules.md` §4 no lo enumera entre los pasos de derivación | `Master-Prompt.md` §4 exige que cada flag se calcule «con reglas explícitas para que el resultado sea reproducible» y que el bloque se publique; no declara dónde persiste. Escribirlo en el destino, con el origen de cada fila, es lo que vuelve el requisito verificable, y el manifiesto declara la extensión y su motivo. La plantilla es «formato de referencia» y no esquema cerrado |
| **La fila 2.2 del manifiesto alcanza §1.1 y §2 en una sola entrada**, cuando `Master-Prompt.md` §13 regla 5 pide modificación atómica por sección | Es la misma situación que el r1 evaluó y no elevó para la fila 3.4 del intake, y con la misma justificación declarada: las dos secciones se mueven por un único acto —la confirmación del flag— y partirlo haría ilegible la traza. Se aplica el mismo criterio para no cambiar de vara entre rondas |
| **La fila 2.4 del 2026-08-01 de `03/README.md` fue parcialmente reescrita** por la corrección del día siguiente | Es la fila de la versión en curso y no una fila anterior; `Master-Prompt.md` §5.1 protege el cuerpo del snapshot, y el snapshot de la 2.3 está intacto. El documento acota qué dos cláusulas tocó. Lo que sí se reporta es un residuo de esa reescritura: `P2-03` |
| **`Glosario-Funcional.md` §3.9 habla de «los 98 artefactos hermanos»** y el corpus vivo de la categoría es de 101 más el propio glosario | La oración no está en el delta del 2026-08-02 y el r1 no la levantó. Queda fuera de alcance; se anota para la ronda que toque §3.9 |
| **`PRODUCT-INTAKE` §19 declara que de los dos marcadores `[S]` sin número «queda uno abierto»**, mientras la sección de supuestos declara que «desde esta versión no queda ningún marcador `[S]` abierto en el documento» | La contradicción es **anterior a este incremento**: está verbatim en el snapshot v3.5 y ni la 3.6 ni la 3.7 tocaron esa fila. Fuera de alcance. Se anota porque roza al `P1-01` de este informe y conviene resolverla en la misma emisión |
| **`Wireframes-Exploracion-De-Registro-De-Imagenes.md` y `Wireframes-Configuracion-Del-Sistema.md` citan v3.2** | El r1 dictaminó que no es defecto para la primera; la segunda está en la misma condición y `03/README.md` §4 lo declara con su evidencia —ninguna de las dos tiene copia en el `_legacy/2026-08-01/` de `Wireframes/`, que tiene nueve y son otras—, verificado. **No es hallazgo** |

---

## 10. Veredicto y condiciones para promover

**APROBADO CON OBSERVACIONES.** No hay hallazgos P0. `Master-Prompt.md` §10 admite este veredicto con P1, P2 y P3, y permite avanzar a la fase siguiente.

| Nivel | Cantidad | Identificadores |
|---|---|---|
| P0 | **0** | — |
| P1 | 1 | `P1-01` |
| P2 | 3 | `P2-01`, `P2-02`, `P2-03` |
| P3 | 5 | `P3-01`, `P3-02`, `P3-03`, `P3-04`, `P3-05` |
| **Total** | **9** | |

**Condiciones para promover, en orden.** Ninguna bloquea el avance; se enumeran por costo de corrección y por riesgo de que se arrastren.

1. Corregir **`P1-01`** antes de que las categorías 08 y 09 se generen, que son sus destinatarias declaradas. Sube minor el manifiesto y archiva, por estar `Vigente`. Es la única de las nueve que puede propagar un dato equivocado aguas abajo.
2. Corregir **`P2-01`** y **`P2-02`** dentro de la versión 1.2 de `Glosario-Funcional.md`, citando este informe: la marca de la fila «Archivo de construcción en línea» y el «catorce» que debería decir veinte.
3. Corregir **`P2-03`** dentro de la versión 2.4 de `03/README.md`, citando este informe.
4. Los cinco P3 se documentan y no bloquean. Conviene que `P3-01` y `P3-05` entren en la próxima emisión del manifiesto y del intake respectivamente, porque los dos viven en artefactos que suben versión y archivan, y dejarlos acumula deuda con costo creciente.

**Lo que este incremento hace bien y conviene que la ronda siguiente conserve.** Tres cosas, y las tres son de método. La primera: **la evidencia se rehízo cuando dejó de reproducir**, en lugar de conservarse. El barrido de `requiere_maqueta` era correcto a la mañana y falso a la tarde porque el manifiesto cambió el mismo día, y el documento lo detectó, lo declaró y lo volvió a correr; ése es exactamente el modo de falla que el enunciado de esta ronda pedía vigilar. La segunda: **el criterio de cita de versión se emitió como regla y no como corrección**, con su tabla de dos filas y sus tres consecuencias operativas, de modo que la próxima emisión del intake ya no invalida veinte cabeceras. La tercera: **la corrección de `P1-01` del r1 se hizo retirando lo que decidía y no ampliando la decisión** —`FA-05` perdió el adverbio, `CA-07` y `CA-09` declaran qué no evalúan, `US-CU-38-6` acotó su enunciado y `B-31` pasó de tres puntos a seis—, que es la dirección correcta cuando la fuente declara algo abierto. Y una cuarta, menor pero infrecuente: la emisión de la v3.6 **declaró su propia omisión de procedimiento** en lugar de escribir la fila como si hubiera estado desde el principio.

---

## 11. Lo que este audit no pudo verificar

| Punto | Por qué |
|---|---|
| El delta exacto del 2026-08-02 sobre los 24 documentos de `SDD/Docs/` | El estado de esos archivos al 2026-08-01 no existe en disco: los snapshots de `_legacy/2026-08-01/` preservan la versión anterior a esa emisión y no hay commit intermedio. El incremento se reconstruyó por lo que las filas nuevas declaran y se verificó por contenido, no por diferencia. Afecta a `P2-01` y `P2-02`, donde no pude determinar si el defecto lo introdujo esta ronda o la anterior |
| Si la confirmación de `requiere_maqueta` en `true` es efectivamente la que el agente humano del proyecto dio el 2026-08-02 | El registro de la conversación no vive en este repositorio. Se verificó la consolidación contra el manifiesto, que es la fuente que la cadena consume, y su coherencia con las tres afirmaciones que `03` hace sobre ella; no contra el acto original. `Deriva-Rules.md` §1 admite el tipo `humano` con aprobación registrada y fecha, y la fila lo declara así |
| Si el valor de los otros diez flags fue confirmado por el humano o derivado por el orquestador | El manifiesto declara el origen documental de cada uno en el intake, y los once resuelven contra la sección que citan. Lo que no consta es si el humano los revisó uno por uno al aprobar el plan de reanudación: la fila 2.2 declara la confirmación sólo de `requiere_maqueta` |
| Si la maqueta de `SDD/Maquetas/SelfHosted-Service/` materializa lo que los diecinueve wireframes especifican | Fuera del alcance del paso 6. Se verificaron las tres afirmaciones de `03/README.md` §9.1 sobre su estado —veinte archivos HTML, y último cambio el 2026-07-30 19:39— y las tres reproducen |
| Si los conteos de términos de `Glosario-UX.md` §9.3 y el reparto de 120 términos de `Glosario-Funcional.md` §2 se sostienen | Se verificó el reparto por subsección declarado y se muestrearon filas; no se recontó el total. El propio documento declara que las filas de §5 agrupan varios términos separados por punto medio, de modo que el conteo no es scriptable sin criterio |
| El estado de los hallazgos de rondas anteriores a la del 2026-08-01 | Fuera de alcance. Este informe audita el incremento del 2026-08-02 y el cierre de las cinco condiciones del r1 |
