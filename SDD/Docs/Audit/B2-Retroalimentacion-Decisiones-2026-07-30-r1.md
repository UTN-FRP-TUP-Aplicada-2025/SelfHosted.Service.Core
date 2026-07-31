# Audit — Fase B2, paso 6 · Retroalimentación de la ronda de decisiones del 2026-07-30 · r1

**Producto:** SelfHosted Service
**Proyecto de código:** SelfHosted-Service
**Documento:** B2-Retroalimentacion-Decisiones-2026-07-30-r1.md
**Versión:** 1.0
**Estado:** Emitido
**Fecha:** 2026-07-30
**Auditor:** Arquitecto de Soluciones + QA Senior, independiente, invocado desde cero y sin participación en la generación

**Alcance auditado (el incremento, no el árbol):**

| Conjunto | Artefactos |
|---|---|
| Intake | `SDD/Intake/PRODUCT-INTAKE-SelfHosted-Service.md` v3.2 y su snapshot `SDD/Intake/_legacy/2026-07-30/PRODUCT-INTAKE-SelfHosted-Service-v3.1.md` |
| 02-Especificacion-Funcional | 14 documentos actualizados a `2.1` / `3.1` / `1.1` y `CU-39` nuevo en `1.0` |
| 03-UX-UI-DX | 9 documentos actualizados en dos tandas y `Wireframes-Exploracion-De-Registro-De-Imagenes.md` (`SUP-19`) nuevo en `1.0` |

**Normativa aplicada:** `Master-Prompt.md` §5, §5.1, §10 y §13; `Intake-Rules.md` 3.2; `Rules-Especificacion-Funcional.md` 4.0 §3.3, §3.5, §4.1, §4.2, §4.3 y §6; `Rules-UX-UI-DX.md` 4.0 §3.3, §3.5, §4.1, §4.2, §4.2.1 y §6; `Deriva-Rules.md` §1; `Vocabulario-Rules.md` §9 y §10; `SDD-Development-Guide.md` §VI.2.

**Contra qué se contrastó:** el disco. Ninguna cifra, ningún estado de decisión y ningún conteo de este informe proviene de lo que un documento declara sobre sí mismo cuando era verificable de otro modo.

---

## Tabla de contenido

- [1. Veredicto y resumen ejecutivo](#1-veredicto-y-resumen-ejecutivo)
- [2. Método y muestreo declarado](#2-método-y-muestreo-declarado)
  - [2.1 Qué se leyó entero](#21-qué-se-leyó-entero)
  - [2.2 Qué se muestreó y con qué criterio](#22-qué-se-muestreó-y-con-qué-criterio)
  - [2.3 Qué se verificó por script sobre el corpus completo](#23-qué-se-verificó-por-script-sobre-el-corpus-completo)
- [3. Matriz D1-D9](#3-matriz-d1-d9)
  - [3.1 D9 en particular](#31-d9-en-particular)
- [4. Criterios de §6 por categoría](#4-criterios-de-6-por-categoría)
  - [4.1 Intake, `Intake-Rules.md` 3.2](#41-intake-intake-rulesmd-32)
  - [4.2 02, `Rules-Especificacion-Funcional.md` 4.0 §6](#42-02-rules-especificacion-funcionalmd-40-6)
  - [4.3 03, `Rules-UX-UI-DX.md` 4.0 §6](#43-03-rules-ux-ui-dxmd-40-6)
- [5. Verificación de que nada abierto se cerró por arrastre](#5-verificación-de-que-nada-abierto-se-cerró-por-arrastre)
- [6. Aritmética contada en disco](#6-aritmética-contada-en-disco)
  - [6.1 Los tres conteos del intake](#61-los-tres-conteos-del-intake)
  - [6.2 Conteos de 02](#62-conteos-de-02)
  - [6.3 Conteos de superficies y de estados de 03](#63-conteos-de-superficies-y-de-estados-de-03)
- [7. Trazabilidad D6 de `CU-39` y `SUP-19`](#7-trazabilidad-d6-de-cu-39-y-sup-19)
- [8. Coherencia cross-doc y gobierno del glosario](#8-coherencia-cross-doc-y-gobierno-del-glosario)
  - [8.1 Los cuatro puntos de contradicción posible entre 02 y 03](#81-los-cuatro-puntos-de-contradicción-posible-entre-02-y-03)
  - [8.2 Gobierno del glosario, los cuatro criterios](#82-gobierno-del-glosario-los-cuatro-criterios)
  - [8.3 Criterio negativo: polisemias evaluadas y descartadas](#83-criterio-negativo-polisemias-evaluadas-y-descartadas)
- [9. Política de deprecación y versionado](#9-política-de-deprecación-y-versionado)
- [10. §13 del master-prompt sobre el intake, y la desviación declarada](#10-13-del-master-prompt-sobre-el-intake-y-la-desviación-declarada)
- [11. Hallazgos](#11-hallazgos)
- [12. Lo que este audit no pudo verificar](#12-lo-que-este-audit-no-pudo-verificar)
- [13. Control de cambios](#13-control-de-cambios)

---

## 1. Veredicto y resumen ejecutivo

**APROBADO CON OBSERVACIONES. Cero P0.**

**1 P1, 4 P2 y 3 P3.** El incremento es de calidad alta y poco común en el eje que más importa acá: **ninguna decisión abierta se cerró por arrastre indebido**, y la disciplina con la que `Q-19` se mantiene abierta mientras `Q-15` la vuelve técnicamente posible es explícita en once lugares distintos de 02, sin una sola contaminación. La aritmética del intake cierra en sus tres declaraciones, los 109 términos del glosario funcional coinciden fila por fila con el reparto declarado, los cinco recuentos de estados de la tabla de reconstrucción de la maqueta coinciden con las tablas §5 de sus wireframes, y **los veintitrés documentos con historia previa agregaron exactamente una fila de control de cambios cada uno sin reescribir ni una sola fila anterior**, verificado por comparación contra sus snapshots.

El único P1 es de coherencia entre las dos categorías del mismo incremento: **02 declara en cuatro lugares que `SUP-19` no existe y que 03 tiene dieciocho superficies, cuando 03 emitió `SUP-19` cuarenta minutos después en la misma ronda**. No rompe trazabilidad —`CU-39` y `SUP-19` se apuntan en las dos direcciones— pero deja al índice maestro de 02 pidiendo un trabajo que ya está hecho, que es exactamente lo que el paso siguiente de la Fase B2 va a leer.

Los cuatro P2 son dos de aritmética declarada contra disco, uno de forma del control de cambios del intake y uno de tabla de contenido. Ninguno afecta contenido.

---

## 2. Método y muestreo declarado

Un audit que no declara su muestreo afirma una cobertura que no tuvo. Este es el mío.

### 2.1 Qué se leyó entero

| Artefacto | Motivo |
|---|---|
| `PRODUCT-INTAKE-SelfHosted-Service.md` §19 completo, «Lo que este intake no decide», la nota de los dos ejes del alta de §4, §20.2.1, §20.2.5, E-16 en sus tres reglas alcanzadas, E-23 y el control de cambios entero | Son las secciones que la ronda tocó, más las tres que declaran la aritmética |
| `CU-39-Exploracion-Del-Registro-De-Imagenes.md` | Documento nuevo. Se leyó íntegro, las once secciones |
| `Wireframes-Exploracion-De-Registro-De-Imagenes.md` | Documento nuevo. Se leyó íntegro, las nueve secciones |
| `Especificacion-Funcional.md` §7 a §10 y su control de cambios | Índice maestro: matrices, brechas y verificación de identificadores |
| `Glosario-Funcional.md` §1, §2 completo por conteo, §3 y §5 | Gobierno del glosario, criterio negativo y regla de inclusión |
| `03-UX-UI-DX/README.md` completo | Conteos de superficies, reparto por destinatario y tabla de reconstrucción de la maqueta |
| `Experiencia-De-Uso.md` §9.2, §9.3, §10.2 y control de cambios | Matriz CU→SUP en las dos direcciones y estado de las treinta brechas |
| `Glosario-UX.md` §1, sus fuentes y el diff completo contra `v2.1` | Método del barrido y no duplicación contra 02 |
| `CU-38-Vuelta-A-Un-Despliegue-Anterior.md` cabecera, §3, §10 y control de cambios | Es el caso de uso donde el arrastre indebido de `Q-19` habría sido más barato de cometer |

### 2.2 Qué se muestreó y con qué criterio

De los quince documentos de 02, **leí enteros cuatro** —`CU-39`, `Especificacion-Funcional.md`, `Glosario-Funcional.md` y `CU-38`— y **muestreé once**: `CU-03`, `CU-13`, `CU-15`, `CU-17`, `CU-37`, `RN-08`, `RN-38`, `RN-40`, `RC-19`, `Modelo-Conceptual.md` y el `README.md` de la sección. El criterio del muestreo fue **el delta**: en cada uno leí la cabecera, el bloque de nota que la ronda antepone, las secciones que el propio control de cambios declara alcanzadas, §10 completo —notas y supuestos, que es donde vive el tratamiento de las pendientes— y la fila nueva del control de cambios. No leí de punta a punta sus flujos principales, sus tablas de excepciones ni sus criterios de aceptación no alcanzados por la ronda: son contenido que este incremento no tocó y que auditó la Fase B en `B-02-03-r1.md` y la migración en `M4-02-Especificacion-Funcional-r2.md`.

De los diez documentos de 03, **leí enteros tres** —`SUP-19`, el `README.md` y las secciones nombradas de `Experiencia-De-Uso.md`— y **muestreé siete**: `SUP-17`, `SUP-18`, `SUP-09`, `SUP-12`, `SUP-06`, `SUP-11` y `Glosario-UX.md`, con el mismo criterio del delta, más la tabla §5 de estados de cada uno contada entera por script.

**Lo que no audité y por qué.** Los 24 casos de uso, las 37 reglas de negocio y los 18 wireframes que la ronda no tocó quedan fuera: el alcance es el incremento. Verifiqué por script que ninguno de ellos quedara con un enlace roto o un identificador colisionado por lo que el incremento agregó, y no quedó ninguno.

### 2.3 Qué se verificó por script sobre el corpus completo

Sobre los 25 documentos vivos del incremento, y sobre las 26 copias archivadas que la ronda escribió:

- Resolución de **todos** los enlaces relativos: cero rotos.
- Presencia de los seis campos de cabecera de §4.1 y de la sección `Control de cambios`.
- Ausencia de emojis y de caracteres del rango pictográfico: cero ocurrencias.
- Correspondencia entre tabla de contenido y secciones de primer y segundo nivel, documento por documento.
- Correspondencia entre el sufijo de versión de cada archivo de `_legacy/` y el campo `Versión` de su cabecera, y presencia del bloque de archivado: 26 de 26 correctos.
- Preservación literal de todas las filas de control de cambios previas, comparando cada documento vivo contra su snapshot inmediato anterior.
- Conteo de filas de las tablas de términos, de estados, de superficies y de brechas.

---

## 3. Matriz D1-D9

Evaluada sobre los 25 documentos vivos del incremento.

| Invariante | 02 (15 docs) | 03 (10 docs) | Intake v3.2 | Observaciones |
|---|---|---|---|---|
| D1 · Idioma y registro | Conforme | Conforme | Conforme | Español rioplatense neutro técnico, tildes y eñes en el cuerpo, filenames ASCII. Cero emojis en los 25 |
| D2 · Encoding y tablas | Conforme | Conforme | Conforme | UTF-8, LF. Ninguna tabla con encabezado incompleto ni fila `TBD` en lo emitido |
| D3 · Título-Con-Guiones | Conforme | Conforme | Conforme | `CU-39-Exploracion-Del-Registro-De-Imagenes.md` y `Wireframes-Exploracion-De-Registro-De-Imagenes.md` respetan el patrón, prefijo en mayúscula y sin acentos |
| D4 · Versionado con guion medio | Conforme | Conforme | Conforme | Cero archivos con sufijo de versión en carpeta viva; las 26 copias de `_legacy/` llevan `-vX.Y.md` y su cabecera declara esa misma versión |
| D5 · Deprecación y control de cambios | Conforme | Conforme | Conforme con P2-2 | Ver §9. Una fila nueva por documento, ninguna anterior reescrita |
| D6 · Trazabilidad | Conforme | Conforme | Conforme | Ver §7. `CU-39` traza a `NB-04` y a `SUP-19`; `SUP-19` traza de vuelta a `CU-39` y a `CU-03` |
| D7 · Vocabulario del dominio fuente | Conforme | Conforme | No aplica | Ningún stack concreto, producto comercial ni protocolo del dominio fuente en lo emitido. `Explorador de registro de imágenes` se declara acuñado y no trazado, con su convención en `Especificacion-Funcional.md` §8 |
| D8 · Conjunto cerrado | Conforme | Conforme | Conforme | `web-monolith`: mínimo 8 CU (hay 39), mínimo 4 wireframes (hay 19). §13 de los CU es sección opcional admitida para este tipo por §4.3 |
| D9 · Evidencia verificable | Conforme, con la observación de §3.1 | Conforme, con la observación de §3.1 | Conforme | Ver §3.1 |

### 3.1 D9 en particular

Estamos **antes del handoff a codificación**: el sistema no existe. La verificación que corresponde es que **ningún artefacto del incremento describa el sistema como existente**, y ninguno lo hace. Los 25 documentos hablan en modo imperativo o de especificación —«el sistema declara el vacío con su motivo», «el despliegue registra el digesto»— que la tabla de alcance de `Deriva-Rules.md` §1 clasifica explícitamente como fuera de D9. Cero afirmaciones en indicativo sobre capacidad construida. Cero citas de evidencia que no resuelvan, porque cero citas de evidencia, que es lo correcto en este tramo.

**Una clase de afirmación que sí verifiqué, y que dejo declarada como cuestión de alcance.** Varios artefactos afirman resultados de verificación **sobre el corpus documental**, no sobre el sistema: «veintiséis artefactos, todos en estado `Propuesto`, verificado en disco el 2026-07-30» (`03-UX-UI-DX/README.md` §4), «la verificación se corrió por ocurrencia sobre los archivos de la categoría» (`Glosario-Funcional.md` §1.1), «el reparto por subsección es 7 + 32 + 23 + …». Ninguna trae la cita `[EV-XX | tipo | ruta | ubicación | fecha]` que `Deriva-Rules.md` §1 exige cuando D9 aplica.

Mi lectura es que **D9 no las alcanza**: su alcance declarado son las afirmaciones sobre el estado del sistema, y el corpus de especificación no es el sistema. Por eso **no las levanto como P1**. Las reproduje una por una de todos modos —§6 de este informe— y todas resuelven salvo las dos del hallazgo P2-3 y P2-1. Dejo la cuestión de alcance como P3-2 para que el framework la resuelva y el auditor de la ronda siguiente no tenga que decidirla de nuevo.

---

## 4. Criterios de §6 por categoría

### 4.1 Intake, `Intake-Rules.md` 3.2

| Criterio | Resultado |
|---|---|
| Campos bloqueantes de §2.2 completos | Cumple. Ninguno de los campos bloqueantes se tocó ni quedó vacío |
| §3, patrones de placeholder que disparan pregunta | Cumple. Cero `TBD`, cero `por definir`, cero valor supuesto en las trece filas que siguen abiertas |
| §4, derivación del `PRODUCT-MANIFEST` | Cumple y **no se re-derivó, correctamente**. §13 no cambió: la ronda no agregó ni modificó proyecto de código, tipo ni dependencia. `PRODUCT-MANIFEST-SelfHosted-Service.md` conserva su mtime del 2026-07-30 12:34, anterior a la escritura del intake (16:33). La regla 7 de `Master-Prompt.md` §13 no se dispara |
| §5, completitud semántica | Cumple. Las cuatro pendientes que cerraron **conservan su fila con su resolución** en lugar de retirarse, con el motivo declarado —los artefactos aguas abajo las citan por identificador—. Es la decisión correcta y está argumentada |
| §6, batería de preguntas | No aplica a esta escritura: es consolidación de respuestas, no emisión de batería |
| §7, niveles de bloqueo | Cumple. Ninguna pendiente abierta se presume resuelta |

### 4.2 02, `Rules-Especificacion-Funcional.md` 4.0 §6

| Criterio | Resultado |
|---|---|
| `Especificacion-Funcional.md` con índice maestro y matriz NB→CU→RN→US | Cumple. `CU-39` está en el índice (§5), en la matriz (§6, fila NB-04) y en la verificación de identificadores (§8) |
| Mínimo de CU del tipo D8 | Cumple con holgura. `web-monolith` exige 8; hay **39** contados en disco |
| Once secciones obligatorias por CU | Cumple. `CU-39` las tiene las once, en orden, más §13 opcional ausente por no corresponder |
| Trazabilidad NB→CU→US y al menos tres Given/When/Then con valores concretos | Cumple. `CU-39` declara `NB-04` con el argumento de por qué no es `NB-01`, cinco US provisionales y **siete** criterios de aceptación con valores concretos |
| Siete secciones por RN y CU afectados explícitos | Cumple en las tres RN alcanzadas |
| Modelo conceptual y RC | Cumple. `Modelo-Conceptual.md` 2.1 y `RC-19` 2.1 |
| `Glosario-Funcional.md` con cinco secciones y tabla no vacía | Cumple. **109 términos**, contados |
| Todo término en más de un artefacto declarado, con sus referentes | Cumple. Ver §8.2 |
| Sin redefinir términos del glosario de 00 | Cumple. §4 los referencia |
| Ninguna forma desnuda polisémica sin resolver | Cumple. Ocho familias declaradas en §3, «registro» con cinco referentes |
| Ninguna polisemia de contextos disjuntos reportada ni corregida | Cumple. §3.9 las enumera con su descarte |
| Ningún archivo con sufijo de versión en carpeta viva | Cumple, verificado por script |
| Un solo archivo por nombre lógico; superadas en `_legacy/` | Cumple, verificado por script |
| Sin stacks, productos comerciales ni protocolos del dominio fuente | Cumple |
| Tabla de contenido en documentos con más de tres secciones de primer nivel | **Incumple en un documento del incremento**: `CU-15` omite §13 en su TOC. Ver P2-4 |

### 4.3 03, `Rules-UX-UI-DX.md` 4.0 §6

| Criterio | Resultado |
|---|---|
| Variante declarada en cabecera y coherente con D8 | Cumple. `Variante: UX/UI` en los diez |
| `Experiencia-De-Uso.md` con las once secciones | Cumple |
| Un wireframe por superficie clave, con las nueve secciones de §4.2.1 | Cumple. `SUP-19` tiene las nueve, en orden |
| WCAG 2.2 AA como piso | Cumple. `SUP-19` §7 lo declara sin mención a versiones anteriores |
| Cada wireframe enumera vacío, cargando, con datos y error | Cumple. `SUP-19` declara los seis del despacho más ocho propios: catorce |
| Trazabilidad upstream y downstream por artefacto | Cumple. `SUP-19` §8 declara persona objetivo, CU origen, RN, insumo del intake con versión, marco aplicado, US y tests |
| Sin sufijo de versión en carpeta viva; una versión por nombre lógico | Cumple, verificado por script |
| `Glosario-UX.md` con tabla no vacía y sin duplicar 02 con semántica distinta | Cumple. Los términos de 02 entran con puntero y no con definición |
| Ninguna polisemia de contextos disjuntos reportada | Cumple |
| Sin stacks ni productos comerciales | Cumple |
| Nombre canónico estable y tabla de estados como lista de lo que la maqueta demuestra | Cumple. `SUP-19`: nombre canónico `Exploración de registro de imágenes`, catorce estados, trece demostrables |
| `Linea-Base-Visual.md`, `Contrato-Datos-Maqueta.md` y `Bitacora-Validacion-Maqueta.md` | **No aplica todavía**, y el README lo declara explícitamente: los emite AG-03M al aprobarse la maqueta. La maqueta no está aprobada |
| Tabla de contenido completa | Cumple en los diez |

---

## 5. Verificación de que nada abierto se cerró por arrastre

Es el modo de falla más caro de esta ronda y el que verifiqué con más cuidado. **No ocurrió.**

| Decisión | Estado que debe tener | Estado que los artefactos le dan | Veredicto |
|---|---|---|---|
| `Q-5`, `Q-7`, `Q-8`, `Q-10`, `Q-11`, `Q-12`, `Q-13` | Abiertas | `B-24` del índice de 02 las enumera las siete como abiertas y declara que `Q-6` cerró **por arrastre de `Q-15`, tal como su propia fila lo anticipaba** | Correcto |
| `Q-16`, `Q-18`, `Q-21` | Abiertas | `RN-40` §1 y §5, `Modelo-Conceptual.md` §9, `B-23`, y `B-UX-27` acotada de cinco tramos a tres las conservan abiertas | Correcto |
| `Q-19` | Abierta | **Once ocurrencias** en 02 la declaran abierta. `CU-38` abre con «la operación pasó de imposible a posible, y sigue sin estar decidida», §3 la declara precondición incumplida, el índice §5 y el README de la sección declaran que `CU-38` **no es capacidad comprometida**, y `Glosario-Funcional.md` §5 la registra como «técnicamente posible y no ofrecida» | Correcto, y ejemplarmente explícito |
| `Q-20` | Abierta | `CU-38` §5 la declara dependiente de `Q-19` | Correcto |
| `Q-28` | Abierta | `B-21` del índice la conserva y **declara explícitamente que la exploración de `CU-39` no la resuelve**: explorar es punto de entrada al alta, no camino de edición del origen. `B-UX-25` de 03 hace lo mismo | Correcto, y es el descarte por analogía que más fácil habría sido cometer |
| `DI-20` a `DI-24` | `[D-i]` sin confirmar | `B-01` del índice las conserva y saca sólo `DI-17` a `DI-19`. `Glosario-UX.md` y el README de 03 bajan la advertencia de consumo de veintidós a **diecinueve** | Correcto |
| `Q-6` | Cerrada por arrastre de `Q-15` | Cerrada con el motivo declarado en la propia fila que ya lo anticipaba | Correcto |

**Una corrección de rumbo que el intake hace en lugar de arrastrar, y que conviene registrar como acierto.** La versión 2.4 declaraba en E-23 que «las siete se cierran con `Q-15`». La v3.2 la corrige: `Q-15` es **condición** de las otras seis, no su respuesta, y ninguna queda respondida por arrastre. Sin esa corrección, un lector de E-23 habría podido dar por cerradas `Q-16` y `Q-18` a `Q-21`. Es exactamente el arrastre indebido que había que evitar, y el intake lo desactiva de forma explícita.

**Cero decisiones abiertas tratadas como decididas en 02 y en 03.** Verificado por barrido de los diecisiete identificadores `Q-XX` y `DI-XX` sobre los 25 documentos del incremento.

---

## 6. Aritmética contada en disco

### 6.1 Los tres conteos del intake

| Lugar | Lo que declara | Lo que da el conteo | Veredicto |
|---|---|---|---|
| «Lo que este intake no decide» | 28 decisiones sobre 29 filas: **11 cerradas, 5 con propuesta sin confirmar (`DI-20` a `DI-24`), 13 abiertas** | 11 + 5 + 13 = 29 filas sobre 28 identificadores. Antes: 4 + 8 + 17 = 29. Cierran 3 `[D-i]` más `Q-15`, `Q-17`, `Q-27`, `Q-6`: 4 + 7 = 11; 8 − 3 = 5; 17 − 4 = 13 | **Cierra** |
| §19, tabla de tipos de marcador | Pendientes de decisión: **22 en total, 5 cerradas, 17 abiertas**. `[D-i]`: **24** | Bloque de Fase A: 5 filas contadas, 1 cerrada. Bloque de la v2.4: 17 filas contadas, 4 cerradas. Total 22, cerradas 5, abiertas 17. Tabla `[D-i]`: `DI-01` a `DI-24`, 24 filas | **Cierra** |
| §19, tabla de especificaciones de integración | **24, de las que 19 esperan confirmación** | 24 − (`DI-01`, `DI-03`, `DI-17`, `DI-18`, `DI-19`) = 19 | **Cierra** |
| Control de cambios, fila 3.2 | «pasan a `[D]` en sus **seis** ocurrencias de marcador —§4 nota, §20.2.1 en **tres** filas, §20.2.5 y E-16 en RN-08, RN-38 y RN-40—» | En disco el marcador cambió en **ocho** lugares: cuatro filas de §20.2.1 —`origen.tipo`, `estado`, `procedencia` y `verificaciones`—, §20.2.5, y las tres reglas de E-16. La enumeración de la propia fila lista ocho ubicaciones y las suma como seis | **No cierra.** Ver P2-1 |
| §19, checklist, «§12 define 46 términos» | 46 | 46 filas de la tabla principal de §12, contadas | **Cierra** |

### 6.2 Conteos de 02

| Declarado | En disco | Veredicto |
|---|---|---|
| 39 CU únicos y contiguos de `CU-01` a `CU-39` | 39 archivos, identificadores `01` a `39` sin hueco ni repetición | Cierra |
| 40 RN | 40 archivos, `RN-01` a `RN-40` | Cierra |
| 19 RC | 19 archivos | Cierra |
| `Glosario-Funcional.md`: **109 términos**, reparto `7 + 32 + 23 + 13 + 8 + 6 + 5 + 6 + 4 + 5` | 7, 32, 23, 13, 8, 6, 5, 6, 4, 5. Total 109 | Cierra, subsección por subsección |
| «El corpus pasó de cien a **ciento un** archivos con la emisión de `CU-39`» | 39 CU + 40 RN + 19 RC + modelo + índice + README = 101 | Cierra |
| §9: **28 brechas, dos cerradas** | `B-01` a `B-28`, 28 filas; `B-09` y `B-22` tachadas | Cierra |

### 6.3 Conteos de superficies y de estados de 03

| Declarado | En disco | Veredicto |
|---|---|---|
| **19 superficies**, `SUP-01` a `SUP-19` | 19 archivos en `Wireframes/`, 19 identificadores en el README y 19 en `Experiencia-De-Uso.md` | Cierra |
| **26 artefactos**: índice, marco, glosario, 19 wireframes y 4 representaciones | 26 | Cierra |
| Control de cambios 2.2: «tres en 2.2, seis en 2.1, uno en 1.0 y **dieciséis en 2.0**» | 3 + 6 + 1 + 16 = 26, y los 16 en 2.0 son 12 wireframes más 4 representaciones | Cierra |
| §4.2: «**Trece** están en versión 2.0; `SUP-06`, `SUP-09`, `SUP-11`, `SUP-12`, `SUP-17` y `SUP-18` en 2.1; y `SUP-19` en 1.0» | **12** wireframes en 2.0, 6 en 2.1, 1 en 1.0. 13 + 6 + 1 = 20 ≠ 19 | **No cierra.** Ver P2-3 |
| Corpus del barrido del glosario: **24 artefactos** = marco + 4 representaciones + 19 wireframes | 1 + 4 + 19 = 24 | Cierra |
| Tabla de reconstrucción: `SUP-19` 14/13, `SUP-18` 20/19, `SUP-17` 19/18, `SUP-09` 14/13, `SUP-12` 22/20 | Filas de la tabla §5 de cada wireframe: 14, 20, 19, 14, 22; filas «no aplica»: 1, 1, 1, 1, 2 | **Cierra en los cinco** |
| «Las **doce** superficies restantes no cambian» | 19 − 7 filas de la tabla = 12 | Cierra |
| §7: **25 vigentes sobre 30 identificadores** | `B-UX-01` a `B-UX-30`; no vigentes: `B-UX-15` retirada y `B-UX-09`, `B-UX-23`, `B-UX-26`, `B-UX-30` cerradas. 30 − 5 = 25 | Cierra |
| §7.3: «las **veintidós** restantes, por destinatario» | 11 + 5 + 1 + 2 + 1 + 1 + 1 = 22, y 25 − 22 = 3, que son las de §7.1 | Cierra |

---

## 7. Trazabilidad D6 de `CU-39` y `SUP-19`

Sin huecos en ninguna de las direcciones exigidas.

| Eslabón | Dónde | Resultado |
|---|---|---|
| `CU-39` → necesidad de negocio | Cabecera y §9 | `NB-04`, con el argumento explícito de por qué no es `NB-01` —el registro de imágenes remoto no es parte de la arquitectura que el lienzo representa—. El enlace resuelve |
| `CU-39` → `SUP-19` | §9, fila «Superficie prevista en 03» y §10 | Declara el identificador y **no emite la superficie**, para no invadir 03. Es la decisión correcta de frontera de categoría |
| Matriz NB→CU→RN del índice de 02 | `Especificacion-Funcional.md` §6 | Fila `NB-04 | CU-39 | RN-08, RN-15, RN-17 | US-CU-39-1 a US-CU-39-5`, con la nota de por qué `RN-17` figura sin que la exploración produzca eventos |
| Matriz CU→SUP de 03, directa | `Experiencia-De-Uso.md` §9.2 | Fila `SUP-19` con su wireframe y su descripción |
| Matriz CU→SUP de 03, inversa | `Experiencia-De-Uso.md` §9.3 | Fila `CU-39 → SUP-19`, y `CU-03` gana `SUP-19` como punto de entrada, con la nota de que las dos cosas son la misma decisión |
| `SUP-19` → `CU-39` | `Wireframes-Exploracion-De-Registro-De-Imagenes.md` §8 | `CU-39` y `CU-03` como CU origen, con enlaces que resuelven |
| `NB-04` → `CU-39` | `01-Necesidades-Negocio` | **Ausente, y correctamente declarado como brecha `B-20`**, ampliada de dos casos de uso a tres. 02 declara que no lo toca porque invertiría la dirección de la cadena, y `Master-Prompt.md` §6 exige detención y confirmación humana para tocar categorías de nivel producto. Tratamiento correcto |

---

## 8. Coherencia cross-doc y gobierno del glosario

**Enlaces relativos.** Los 25 documentos vivos del incremento y las 26 copias archivadas de la ronda: **cero enlaces rotos**. Los bloques de archivado apuntan a `../../<nombre>.md` desde `<carpeta>/_legacy/<fecha>/` y resuelven.

**Identificadores.** Sin duplicación ni colisión. `CU-39` y `SUP-19` toman el siguiente libre de su serie, al final y sin renumerar, que es la política de las series ya establecida. `B-25` a `B-28` en 02 y `B-UX-28` a `B-UX-30` en 03 tampoco colisionan.

### 8.1 Los cuatro puntos de contradicción posible entre 02 y 03

| Punto | Qué dice 02 | Qué dice 03 | Veredicto |
|---|---|---|---|
| **El disparo sugerido** (`Q-17`) | `CU-37` §4 paso 8 y §10: el sistema detecta y propone, el administrador confirma; **no corre sola ni espera sólo a que se la pida**. Delega umbral y ubicación a 03 y lo declara como delegación, no como brecha propia | `SUP-18` §3.5 aloja la banda en el encabezado; `SUP-09` la ubicación secundaria en el bloque del servidor; `SUP-12` los dos descriptores del umbral. `Glosario-UX.md` define «sugerencia de limpieza» como región de estado y no alerta | **Sin contradicción.** 02 declara qué, 03 declara dónde. La frontera está declarada en los dos lados con las mismas palabras |
| **El indicador de uso por digesto** (`Q-15`) | `Modelo-Conceptual.md` §5: el digesto es campo escrito por el despliegue. `CU-13` §10 cierra la brecha. `Glosario-Funcional.md` marca «Digesto» con `[+Q-27]` y declara que lo escriben `CU-13` y `CU-15` | `SUP-06` §3.5 pasa de componente sin dato a exigible; `SUP-18` resuelve el indicador de uso **por digesto y nunca por etiqueta**; `Glosario-UX.md` referencia el término a 02 sin redefinirlo | **Sin contradicción**, y la regla de resolución por digesto es la misma en los dos |
| **El punto de entrada a la exploración desde el alta** | `CU-03` §4 y FA-01: las vías 3 y 4 admiten explorar; §4 declara que **explorar no es una octava vía**, es punto de entrada al paso 4. `CA-15` lo verifica. `CU-39` paso 9: explorar no reemplaza verificar | `SUP-17` §3 y §4: acción de explorar sólo en las vías 3 y 4, estado «origen traído de la exploración», y la acción de verificar el origen queda **habilitada y no cumplida** al volver | **Sin contradicción.** Incluso el matiz fino coincide: volver de la exploración no marca el origen como verificado |
| **Los despliegues retenidos sin digesto** | `B-28`, brecha nueva: `Q-15` rige hacia adelante y ninguna fuente declara si se ocultan, se deshabilitan o se ignoran. Destinatario: agente humano, junto con `Q-19` | `SUP-18` declara el estado **«uso no atribuible»** con la cantidad de despliegues sin digesto, y la fila **no se presenta como descartable**. `SUP-18` §5.1 lo lista entre lo que no fija | **Sin contradicción, y son complementarios**: 02 declara el dato faltante como brecha de producto, 03 declara la representación conservadora que no presume la respuesta. Ninguno inventa |

**Una contradicción sí existe**, y no es sobre una decisión sino sobre el estado del propio corpus: el trato de `SUP-19`. Es el P1-1.

### 8.2 Gobierno del glosario, los cuatro criterios

| Criterio | 02 | 03 |
|---|---|---|
| **Sin contradicciones** | Cumple. Ningún término tiene dos definiciones incompatibles entre los quince artefactos | Cumple. Los términos que ya viven en 02 entran **con puntero y sin redefinición**, que es lo que §3.3 pide y lo que prohíbe |
| **Completitud** | Cumple. Los tres términos que la ronda acuña y que aparecen en más de un artefacto —«registro de imágenes», «exploración de registro de imágenes», «credencial de registro»— entran con la marca `[+Q-27]`, y siete filas preexistentes se actualizan por la misma decisión. El barrido declara su método y su fecha | Cumple. El corpus del barrido pasa de 23 a 24 artefactos con `SUP-19` y el glosario declara **por qué no rehizo el barrido entero**: hacerlo con un método distinto del de la versión 2.0 produciría cifras que contradirían las suyas sin que la diferencia signifique nada. Es la respuesta correcta y está argumentada |
| **Polisemia gobernada** | Cumple. Ocho familias en §3. La más cargada, «registro», con **cinco** referentes; `R4` se amplía porque desde el 2026-07-30 el registro de imágenes es además objeto de una operación propia, y por eso gana fila propia en §2.2. La forma desnuda «el registro» queda resuelta en todas las secciones donde colisiona | Cumple. «resolución» declarada como familia; el caso límite de «pendiente de aplicar» en el artefacto nuevo se mira de cerca y **no se incrementa el conteo**, porque ahí designa la acción y no la variante del par de estado. Es contar por referente, que es el criterio de `Vocabulario-Rules.md` §9.2 |
| **Criterio negativo** | Cumple. §3.9 enumera las polisemias verificadas que **no se califican** | Cumple. §9.2 remite a las polisemias del dominio que no vuelve a calificar |

**Conformidad con `Vocabulario-Rules.md` §10.** Los cuatro planos de identidad se distinguen en los artefactos nuevos: `CU-39` y `SUP-19` llevan `Proyecto de código: SelfHosted-Service` y `Producto: SelfHosted Service`, que difieren por el guion y no son intercambiables. «proyecto SelfHosted» se usa calificado en las dos categorías cuando designa la entidad del dominio. Ninguna ocurrencia de «solución» sobrevive en lo emitido.

### 8.3 Criterio negativo: polisemias evaluadas y descartadas

Se enumeran para que el auditor de la ronda siguiente no las vuelva a levantar. **Ninguna de estas es hallazgo**, y reportarlas lo sería.

| Término | Referentes que conviven | Por qué no es hallazgo |
|---|---|---|
| «registro» | Registro de imágenes (remoto), registro del contenedor (salida del proceso), registro de auditoría, registro del sistema (la base propia), y el actor de sistema renombrado por la migración | Contextos disjuntos por sección, y `Glosario-Funcional.md` §3.1 los declara los cinco. Las formas desnudas que colisionaban están calificadas |
| «higiene» | Higiene del registro del sistema (`CU-36`) e higiene de imágenes (`CU-37`) | Contextos disjuntos, declarados en §3.4 |
| «etiqueta» | Etiqueta de imagen (nombre reasignable) y etiqueta de campo de formulario | Contextos disjuntos, declarados en §3.7. `SUP-19` usa las dos en secciones distintas y ninguna forma desnuda colisiona |
| «procedencia» | Huella de auditoría de la vía de alta, bloque de procedencia del manifiesto, y procedencia del intake | Contextos disjuntos, declarados en §3.6 |
| «almacén de imágenes» frente a «registro de imágenes» | Local frente a remoto | No es polisemia: son dos términos distintos, y `Glosario-Funcional.md` §2.8 agrega la advertencia de no confundirlos, que es la corrección correcta |
| «exploración» y «descubrimiento» | `CU-39` lee un registro remoto; `CU-06` lee el motor local | No es polisemia: `CU-39` §1 declara la diferencia con la fórmula «no hay nada corriendo del otro lado» |
| «resolución» | Resolución de una referencia de variable y resolución de una brecha | Contextos disjuntos, declarados en `Glosario-UX.md` §8.1 |

---

## 9. Política de deprecación y versionado

**`Master-Prompt.md` §5.1, verificado en disco archivo por archivo.**

| Verificación | Resultado |
|---|---|
| Un solo archivo por nombre lógico en carpeta viva, sin sufijo de versión | **Cumple.** Cero archivos con `-vX.Y` fuera de `_legacy/` en 02 y en 03 |
| Archivado en el `_legacy/<fecha>/` **de la propia carpeta** | **Cumple.** `Casos-De-Uso/_legacy/`, `Reglas-De-Negocio/_legacy/`, `Modelo-Datos/_legacy/`, `reglas-conceptuales-de-modelo/_legacy/`, `Wireframes/_legacy/` y las raíces de categoría. Ninguna ruta de archivado centralizada |
| Sufijo de la copia igual al `Versión` de su cabecera | **Cumple, 26 de 26** |
| Bloque de archivado antepuesto con estado `Superado` y enlace a la versión vigente | **Cumple, 26 de 26.** El enlace resuelve en los 26 |
| Cuerpo del snapshot sin modificar | **Cumple** hasta donde es verificable. En el único caso con base de comparación —el intake— el diff contra el vivo muestra exactamente el bloque de archivado antepuesto y ninguna otra alteración del cuerpo de la 3.1 |
| **Ningún archivado pisó una copia previa del mismo día** | **Cumple, y el riesgo era real.** De los 23 nombres lógicos con historia, **diecinueve tienen dos copias fechadas 2026-07-30** y **tres tienen tres** —`Experiencia-De-Uso`, `README` de 03 y `Glosario-UX`, por las dos tandas de esa categoría—; sólo `Glosario-Funcional` tiene una. En todos los casos las copias conviven con sufijos distintos: `CU-03` en v2.0 y v3.0, los demás en v1.x o v1.0 y v2.0, y los tres de 03 en v2.0 y v2.1 además de su v1.x. **Cero sobrescrituras.** Verifiqué además que no falte ningún eslabón intermedio de ninguna cadena de versiones: las cadenas `1.0 → 1.1 → 2.0 → 2.1 → 2.2` de `Experiencia-De-Uso` y `README` de 03, y `1.0 → 2.0 → 3.0 → 3.1` de `CU-03`, están completas |

**Versionado, `Master-Prompt.md` §5 y `SDD-Development-Guide.md` §VI.2.**

- **Los 23 documentos con historia previa subieron minor**: `2.0 → 2.1`, `2.1 → 2.2`, `3.0 → 3.1`, `1.0 → 1.1`. Ninguno subió major, y ninguno debía: ninguna sección aprobada se reescribió. Los dos nuevos nacen en `1.0`.
- **Los 23 agregaron exactamente una fila** de control de cambios, ni cero ni dos.
- **Ninguna fila histórica se reescribió.** Verificado por comparación literal de cada tabla de control de cambios contra la de su snapshot inmediato anterior: **cero filas alteradas, cero filas perdidas, en 23 de 23**. Es el punto que la orden de trabajo pedía comprobar contra los snapshots, y cierra.
- El intake sube de `3.1` a `3.2`, minor, con su archivado previo escrito a las 16:28 y el vivo a las 16:33: **el archivado precede a la sobrescritura**, que es lo que la regla 6 de §13 exige.

---

## 10. §13 del master-prompt sobre el intake, y la desviación declarada

**El caso de escritura es el correcto.** La v3.2 consolida respuestas del agente humano a preguntas abiertas: es el **caso (a)** de la regla 2, «consolidación de una respuesta del humano», y el propio control de cambios lo cita por su nombre. No es el caso (b), no hubo cambio estructural de plantilla y no correspondía bump major. Reglas 1, 2, 4, 6 y 7: cumplidas.

**La regla 3 se cumple**: hay entrada en el control de cambios, con fecha, motivo y autor `Orquestador SDD`.

**La regla 5 no se cumple, y la desviación está declarada.** La regla dice, sin condicional: «La modificación es atómica: una sola sección por entrada de control de cambios». El orquestador emitió **una entrada única para seis decisiones** y declaró el motivo: leyó la regla 5 «sobre el evento y no sobre el archivo», porque las seis decisiones son una sola respuesta del humano y partirla en seis filas haría ilegible la traza de qué se contestó cuándo; y enumeró dentro de la entrada, una por una, las secciones alcanzadas.

**Evaluación: la declaración mitiga pero no alcanza, y es hallazgo P2.** Tres razones.

1. **La regla no admite lectura por evento.** Su formato canónico, en la regla 3, es `Actualización §<n>: …`, con un número de sección singular. Lo que la regla protege es que se pueda entrar por sección y saber qué le pasó, no que se pueda entrar por fecha.
2. **El propio documento tiene precedente en contra, de un día antes.** La ronda del 2026-07-29, que también fue una sola respuesta del humano y de alcance mayor que ésta, emitió **once filas** con fecha `2026-07-29`, una por sección: cabecera, sección nueva, §4, E-2, §20.2.2, E-6, E-7, E-23, E-16, §12 y §19. La v1.1 emitió seis y la v1.2 emitió diez, con el mismo criterio. La regla es operable en este documento: se operó tres veces.
3. **La mitigación es real, y es por eso que no es P1.** La entrada enumera las secciones alcanzadas una por una, de modo que la información que la regla 5 protege está toda presente. Lo que se pierde es la localizabilidad: quien busca qué le pasó a E-23 tiene que leer una fila de cuarenta líneas en lugar de una fila de tres.

**Una consecuencia colateral de haber comprimido seis filas en una**, que es el P2-1: la fila declara «seis ocurrencias de marcador» y su propia enumeración lista ocho ubicaciones. Con una fila por sección el error habría sido imposible de cometer, porque cada fila habría contado sus propias ocurrencias.

---

## 11. Hallazgos

### P1-1 · 02 declara en cuatro lugares que `SUP-19` no existe, y 03 la emitió en la misma ronda

**Nivel:** P1. Bloquea el avance de fase hasta corrección, no el veredicto.

**Archivos y secciones:**

| Path | Sección | Texto |
|---|---|---|
| `SDD/Docs/02-Especificacion-Funcional/Especificacion-Funcional.md` | §9, fila `B-25` | «**`SUP-19` no existe.** … Esa categoría declara hoy dieciocho superficies, `SUP-01` a `SUP-18`, y ninguna es la exploración». Destinatario: `03-UX-UI-DX` |
| `SDD/Docs/02-Especificacion-Funcional/Casos-De-Uso/CU-39-Exploracion-Del-Registro-De-Imagenes.md` | §10 | «**Brecha declarada: `SUP-19` no existe todavía.** `03-UX-UI-DX` declara hoy dieciocho superficies…» |
| `SDD/Docs/02-Especificacion-Funcional/Casos-De-Uso/CU-39-Exploracion-Del-Registro-De-Imagenes.md` | §9, fila «Superficie prevista en 03» | «`03-UX-UI-DX` declara hoy `SUP-01` a `SUP-18`. El identificador se propone acá y **lo emite esa categoría**» |
| `SDD/Docs/02-Especificacion-Funcional/README.md` | Tabla de casos de uso, fila `CU-39` | «lo que sigue abierto es … la superficie `SUP-19`, que `03-UX-UI-DX` debe emitir» |

**Evidencia.** `SDD/Docs/03-UX-UI-DX/Wireframes/Wireframes-Exploracion-De-Registro-De-Imagenes.md` existe en disco, versión `1.0`, estado `Propuesto`, fecha 2026-07-30, mtime 17:26:41. Los cuatro documentos de 02 tienen mtime entre 16:46 y 16:57 del mismo día. `03-UX-UI-DX` declara hoy **diecinueve** superficies: 19 archivos en `Wireframes/`, 19 identificadores en su README §4.2 y 19 en `Experiencia-De-Uso.md` §9.2. El wireframe de `SUP-19` **cita `B-25` por su identificador** y declara «Se emite acá», de modo que 03 sabe que cierra la brecha y 02 no se enteró.

**Por qué es P1 y no P2.** El índice maestro de 02 es lo que el paso siguiente de la Fase B2 y las categorías 05 a 08 leen para saber qué falta. `B-25` figura como brecha vigente con destinatario `03-UX-UI-DX` en una tabla que declara «veintiocho brechas, dos de ellas cerradas» —y son tres las que están cerradas de hecho—. Un agente que consuma §9 concluye que hay una superficie por emitir. La contradicción es entre dos artefactos del mismo incremento auditado, que es el criterio de coherencia cross-doc de `Master-Prompt.md` §10.

**Por qué no es P0.** No rompe trazabilidad: `CU-39` apunta a `SUP-19` y `SUP-19` apunta a `CU-39`, los dos enlaces resuelven, y las dos matrices los incluyen. Lo que está mal es el estado declarado de una brecha, no la cadena.

**Corrección propuesta.** Minor de los cuatro documentos de 02, en una sola operación:

1. `Especificacion-Funcional.md` §9: `B-25` pasa a **cerrada el 2026-07-30**, con su fila conservada y tachada, con el mismo criterio con el que se conservaron `B-09` y `B-22`, y citando `Wireframes-Exploracion-De-Registro-De-Imagenes.md` 1.0 como lo que la cierra. El recuento pasa a «veintiocho brechas, **tres** de ellas cerradas», y §10 lo acompaña.
2. `CU-39` §9 y §10: la fila «Superficie prevista en 03» pasa a superficie **emitida**, con enlace relativo a su wireframe; la brecha de §10 pasa a cerrada. Conviene notar que lo que sí queda abierto de esa brecha —los tres datos sin declarar— ya vive en `B-27` de 02 y en `B-UX-29` de 03, y no se toca.
3. `README.md` de 02: la fila de `CU-39` deja de listar `SUP-19` entre lo abierto.
4. Cada uno suma su fila de control de cambios citando este hallazgo, y archiva su estado previo en el `_legacy/2026-07-30/` de su carpeta con el sufijo que corresponda. Atención a que `CU-39` pasaría a `1.1` y su archivado sería el primero de ese nombre lógico.

**Nota de método para quien corrija.** El orden de despacho de esta ronda —02 primero, 03 después— hace que este desfase sea estructural y no accidental: la categoría destinataria de una brecha la cierra después de que la categoría que la declaró ya escribió. Vale la pena que el orquestador considere un paso de reconciliación de brechas al cierre de una retroalimentación que atraviesa dos categorías, en lugar de tratarlo como un defecto de este incremento en particular.

---

### P2-1 · La fila 3.2 del control de cambios del intake declara seis ocurrencias de marcador y son ocho

**Path:** `SDD/Intake/PRODUCT-INTAKE-SelfHosted-Service.md`, sección `Control de cambios`, fila `3.2`.

**Evidencia.** La fila dice: «Dejan de ser `[D-i]` revisables y pasan a `[D]` en sus **seis** ocurrencias de marcador —§4 nota de los dos ejes, §20.2.1 en **tres** filas, §20.2.5 y E-16 en RN-08, RN-38 y RN-40—». El diff contra `_legacy/2026-07-30/PRODUCT-INTAKE-SelfHosted-Service-v3.1.md` muestra que el marcador cambió en **ocho** lugares: las **cuatro** filas de §20.2.1 (`origen.tipo`, `estado`, `procedencia` y `verificaciones`), §20.2.5, y las tres reglas de E-16. Además, la enumeración de la propia fila lista ocho ubicaciones —1 + 3 + 1 + 3— y las suma como seis, de modo que la fila se contradice a sí misma sin necesidad de salir del documento.

**Consecuencia.** Ninguna sobre el contenido: los ocho marcadores **están correctamente cambiados**, verificado uno por uno. El defecto es del recuento declarado, en un documento cuyas cifras la cadena consume.

**Corrección propuesta.** En la próxima escritura del intake, corregir la fila a «ocho ocurrencias» y «§20.2.1 en cuatro filas». No amerita una versión propia: se absorbe en la próxima que se abra por otro motivo, con la corrección declarada, tal como el propio documento hizo con la corrección de conteo de §12 en la v2.4.

---

### P2-2 · Entrada única de control de cambios para seis decisiones, contra la regla 5 de `Master-Prompt.md` §13

**Path:** `SDD/Intake/PRODUCT-INTAKE-SelfHosted-Service.md`, sección `Control de cambios`, fila `3.2`.

**Evidencia y evaluación completas en §10 de este informe.** En síntesis: la regla 5 es incondicional, el propio documento la cumplió tres veces antes —once filas en la v2.4, diez en la v1.2, seis en la v1.1— y la declaración del orquestador reinterpreta la regla en lugar de escalar la excepción. La mitigación —enumerar las secciones dentro de la entrada— preserva la información pero no la localizabilidad, y es lo que mantiene el hallazgo en P2.

**Corrección propuesta.** Dos caminos, y el segundo es mejor:

1. Partir la fila 3.2 en las filas por sección que la regla pide. Tiene el costo de reescribir una fila de control de cambios ya emitida, que `SDD-Development-Guide.md` §VI.2 prohíbe. **Descartado por eso.**
2. **Dejar la fila 3.2 como está** —es historia y no se reescribe— y llevar la excepción al framework: o bien `Master-Prompt.md` §13 regla 5 incorpora la excepción de la respuesta múltiple del humano con su condición —«una fila por sección, salvo que la escritura consolide una única respuesta del humano que alcance más de tres secciones, en cuyo caso la fila única enumera las secciones alcanzadas»—, o bien se ratifica sin excepción y las rondas siguientes vuelven al patrón de la v2.4. Destinatario: agente humano del proyecto, sobre `IA.SDD`.

---

### P2-3 · El README de 03 declara trece wireframes en versión 2.0 y son doce

**Path:** `SDD/Docs/03-UX-UI-DX/README.md`, §4.2, primer párrafo.

**Evidencia.** El texto dice: «**Trece** están en versión 2.0; `SUP-06`, `SUP-09`, `SUP-11`, `SUP-12`, `SUP-17` y `SUP-18` en 2.1; y `SUP-19` en 1.0». Suma 13 + 6 + 1 = 20 sobre 19 superficies. El conteo de los campos `Versión` de los 19 archivos de `Wireframes/` da **12 en 2.0**, 6 en 2.1 y 1 en 1.0. Los seis en 2.1 son exactamente los seis que el texto nombra, de modo que el único número mal es el primero.

**Contradicción interna adicional.** La fila `2.2` del control de cambios del mismo documento declara «dieciséis en 2.0 sin tocar» para el total de la categoría, que son 12 wireframes más 4 representaciones. El propio documento tiene el número correcto en otra sección.

**Corrección propuesta.** Cambiar «Trece» por «Doce» en §4.2. Se absorbe en la próxima minor del índice, citando este hallazgo en su fila.

---

### P2-4 · `CU-15` omite su sección §13 en la tabla de contenido

**Path:** `SDD/Docs/02-Especificacion-Funcional/Casos-De-Uso/CU-15-Despliegue-Construyendo-La-Imagen.md`, tabla de contenido.

**Evidencia.** El documento tiene trece secciones de primer nivel; la última es `## 13. Interacción multiusuario y concurrencia`, sección opcional legítima para `web-monolith` por `Rules-Especificacion-Funcional.md` §4.3. La tabla de contenido enumera once entradas y no la incluye. El criterio de §6 exige tabla de contenido «con enlaces ancla a las secciones de primer y de segundo nivel».

**Alcance.** El defecto es **preexistente**: está en `_legacy/2026-07-30/CU-15-Despliegue-Construyendo-La-Imagen-v2.0.md`. Se levanta acá porque el incremento tocó el documento y lo llevó a `2.1` sin corregirlo, y porque §6 se evalúa sobre el documento emitido. Los otros catorce documentos del incremento tienen su tabla de contenido completa, verificado por script.

**Corrección propuesta.** Agregar la entrada `- [13. Interacción multiusuario y concurrencia](#13-interacción-multiusuario-y-concurrencia)` en la próxima minor. Ver P3-3 para el alcance completo fuera del incremento.

---

### P3-1 · La cabecera del índice de 02 usa tabla y no el bloque de metadatos de §4.1

**Path:** `SDD/Docs/02-Especificacion-Funcional/Especificacion-Funcional.md`, cabecera.

`Rules-Especificacion-Funcional.md` §4.1 modela la cabecera como bloque de líneas `**Campo:** valor`; el índice usa una tabla `| Campo | Valor |`. La regla prescribe el bloque para CU, RN, RC y modelo conceptual y no nombra al índice, de modo que la no conformidad es discutible. **Es preexistente** —viene de la migración normativa que produjo la v2.0— y no se introduce en este incremento. Se registra para que quede resuelto en alguna dirección y no vuelva a evaluarse cada ronda. Ningún otro documento del incremento usa esa forma.

---

### P3-2 · Alcance de D9 sobre las afirmaciones acerca del corpus documental

Varios artefactos del incremento afirman resultados de verificación sobre el propio corpus —«verificado en disco el 2026-07-30», «la verificación se corrió por ocurrencia sobre los archivos de la categoría»— sin la cita `[EV-XX | tipo | ruta | ubicación | fecha]` de `Deriva-Rules.md` §1. Este audit **no las levanta como P1** porque juzga que D9 alcanza al estado del sistema y no al del corpus de especificación, y porque las reproduje todas y resuelven salvo las dos de P2-1 y P2-3.

Es una zona gris del framework y conviene cerrarla: si el framework decide que sí las alcanza, hay una cantidad grande de afirmaciones de este tipo en 02 y 03 que habría que citar en formato, y sería una decisión con costo. Destinatario: agente humano del proyecto, sobre `Deriva-Rules.md` §1.

---

### P3-3 · Seis CU fuera del incremento también omiten §13 en su tabla de contenido

Fuera del alcance auditado, y se registra para que la corrección de P2-4 se haga de una sola vez. De los diecinueve CU que tienen la sección opcional §13, **siete no la enumeran en su tabla de contenido**: `CU-15` —dentro del incremento, P2-4— más `CU-18`, `CU-20`, `CU-21`, `CU-22`, `CU-24` y `CU-26`. Los otros doce sí la enumeran, de modo que la forma correcta ya está establecida en la categoría.

---

## 12. Lo que este audit no pudo verificar

Se declara para que no se lea como cobertura.

1. **Que el cuerpo de las 26 copias archivadas sea idéntico al estado previo.** No existe una segunda fuente contra la cual comparar salvo en el caso del intake, donde sí lo verifiqué. Para las 25 restantes verifiqué lo que es verificable: sufijo igual al `Versión` de cabecera, bloque de archivado presente y correcto, enlace que resuelve, y que las filas de control de cambios del snapshot estén todas presentes y literales en el documento vivo. Eso hace muy improbable una alteración del cuerpo, pero no la descarta.
2. **Si las decisiones que el intake atribuye al agente humano del proyecto fueron efectivamente tomadas por él.** No hay registro de la conversación en el repositorio. Este audit verifica la consistencia interna de la consolidación, no su fidelidad a lo que se dijo. Es la misma limitación que declaró `B2-Fix-Definiciones-Servicio-r1.md` §8 y sigue vigente.
3. **La corrección de las decisiones de diseño de `SUP-19` frente al catálogo `References/Design/`.** El wireframe cita `Design-Rules-Web-Generico.md` §3.2, §4.3, §4.6, §4.9, §4.10, §5, §7 y §8, y declara §4.5 no aplicable con su motivo. No leí el catálogo: está fuera del alcance declarado de esta orden de trabajo, que fija la normativa en `Rules/` y `Master-Prompt.md` §10.
4. **Los conteos de estados de los doce wireframes que el incremento no tocó.** Verifiqué los siete alcanzados. El README declara que la cifra de 227 estados sobre dieciséis superficies de su §8 es de la versión 1.0 y **no la recalculó**, con el motivo declarado de que ninguna fuente declara el recuento sobre las diecinueve y recalcularla sería inventar. Es la decisión correcta y la dejo registrada como tal, no como brecha de este audit.
5. **La categoría 01.** `B-20` declara que `CU-37`, `CU-38` y `CU-39` no figuran en el §7 de ninguna necesidad de negocio. No audité `01-Necesidades-Negocio` para confirmarlo: es categoría de nivel producto, está fuera del incremento, y tocarla exige la detención con confirmación humana de `Master-Prompt.md` §6. El tratamiento que 02 le da —declararla y no tocarla— es correcto.

---

## 13. Control de cambios

| Versión | Fecha | Cambios | Autor |
|---|---|---|---|
| 1.0 | 2026-07-30 | Emisión inicial. Ronda 1 del audit del paso 6 de la Fase B2 sobre la retroalimentación de la ronda de decisiones del agente humano del proyecto del 2026-07-30. Alcance: `PRODUCT-INTAKE` v3.2 con su snapshot, 15 documentos de `02-Especificacion-Funcional` y 10 de `03-UX-UI-DX`, más las 26 copias archivadas que la ronda escribió. Veredicto **APROBADO CON OBSERVACIONES**, cero P0, 1 P1, 4 P2 y 3 P3. Muestreo declarado en §2 | Auditor independiente de la corrida SDD |
