# Informe de migración normativa · 4.1 → 6.0

**Archivo:** `Informe-Migracion-4.1-a-6.0.md`
**Producto:** SelfHosted Service
**Repositorio destino:** `DEV/SelfHosted.Service.Core`
**Repositorio fuente:** `IA/IA.SDD`
**Fase:** M6 — auditoría de la migración normativa (`Master-Prompt-Migracion.md` §10)
**Auditor:** independiente, Arquitecto de Soluciones + QA Senior, invocado desde cero. No participó de M1 a M5
**Fecha:** 2026-07-30
**Versión:** 1.0
**Estado:** Emitido

---

## Tabla de contenido

- [1. Cabecera, alcance y muestreo](#1-cabecera-alcance-y-muestreo)
- [2. Resumen ejecutivo](#2-resumen-ejecutivo)
- [3. Matriz D1-D9](#3-matriz-d1-d9)
- [4. Matriz de estructura obligatoria](#4-matriz-de-estructura-obligatoria)
- [5. Coherencia cross-doc y gobierno del glosario](#5-coherencia-cross-doc-y-gobierno-del-glosario)
- [6. Los catorce criterios de aceptación de `Migracion-Rules.md` §6](#6-los-catorce-criterios-de-aceptación-de-migracion-rulesmd-6)
- [7. Los seis hallazgos P0 propios de una migración](#7-los-seis-hallazgos-p0-propios-de-una-migración)
- [8. Estado final de cada fila del plan, las 144](#8-estado-final-de-cada-fila-del-plan-las-144)
- [9. Contenido que quedó sin destino](#9-contenido-que-quedó-sin-destino)
- [10. Declaración de migración completa o parcial](#10-declaración-de-migración-completa-o-parcial)
- [11. Hallazgos](#11-hallazgos)
- [12. Veredicto y condiciones](#12-veredicto-y-condiciones)
- [Control de cambios](#control-de-cambios)

---

## 1. Cabecera, alcance y muestreo

### 1.1 Alcance auditado

| Conjunto | Cantidad | Detalle |
| --- | --- | --- |
| `SDD/Intake/` | **2** | `PRODUCT-INTAKE-SelfHosted-Service.md` v3.0, `PRODUCT-MANIFEST-SelfHosted-Service.md` v2.1 |
| `SDD/Docs/00-Contexto/` | **6** | nivel producto |
| `SDD/Docs/01-Necesidades-Negocio/` | **10** | nivel producto |
| `SDD/Docs/02-Especificacion-Funcional/` | **101** | nivel proyecto de código; 38 CU, 40 RN, 19 RC, modelo conceptual, índice maestro, README y `Glosario-Funcional.md` |
| `SDD/Docs/03-UX-UI-DX/` | **25** | nivel proyecto de código; 18 wireframes, 4 representaciones, marco, glosario y README |
| **Total** | **144** | Coincide fila por fila con las 144 de `Plan-Migracion-4.1-a-6.0.md` §4 |

`tipo_proyecto_codigo` = `web-monolith`. Línea de base: los **144** archivados de `_legacy/2026-07-30/` de cada carpeta (141 en `SDD/Docs/`, 3 en `SDD/Intake/`). Fuera de alcance por §5 del plan: los cinco informes de audit previos, `SDD/Maquetas/`, `SDD/Estado/`, los `_legacy/`, `/samples/`, `AGENTS.md` y las categorías 04 a 11.

**Ninguna afirmación de los orquestadores de M1 a M5 ni de los cinco informes de M4 se tomó como cierta.** Todo lo mecánico se remidió con script propio contra los archivos; todo lo declarado por un informe previo se trató como hipótesis a verificar. Los informes previos no se modificaron.

### 1.2 Cobertura del 100 % por script

Veintiuna verificaciones sobre los 144 documentos y sus 144 archivados:

1. Inventario de los vivos y correspondencia uno a uno con su archivado, resolviendo los tres renombres.
2. Sufijo `-v<X.Y>.md` en los 144 archivados.
3. Archivado en el `_legacy/` de la **propia carpeta** de cada documento.
4. Extracción de las tablas de control de cambios de los 288 archivos y comparación **celda por celda** de cada fila histórica.
5. Conteo de filas antes y después.
6. Presencia de la fila de migración fechada 2026-07-30 en los 144.
7. Cabecera: `**Producto:**` en 00 y 01; `**Proyecto de código:**` **más** `**Producto:**`, en ese orden, en 02 y 03.
8. Barrido de la etiqueta legada `**Proyecto:**`.
9. Distribución de versiones por categoría.
10. Resolución de los 1 124 enlaces relativos de markdown.
11. Resolución de las 57 citas a rutas de `_legacy/` escritas entre acentos graves.
12. Barrido de `reproduct`.
13. Barrido de identificadores legados (`Nombre-Solucion`, `NombreSolucionCodigo`, `Nombre-Proyecto` sin `-Codigo`, `nombre-proyecto-codigo`, `project_type`).
14. Barrido de nombres de artefacto legados (`SOLUTION-INTAKE`, `SOLUTION-MANIFEST`, `Alcance-Proyecto`).
15. Barrido de concordancia de género rota.
16. Censo de «resolución» por categoría.
17. Censo completo de «proyecto de código» en cuerpo de 02 y 03, y clasificación de cada ocurrencia contra el archivado.
18. Barrido de sub-sustitución sobre siete formas de riesgo.
19. Conservación de identificadores (`CU`, `RN`, `RC`, `NB`, `OP`, `EN`, `CA`, `RE`, `RG`, `RP`, `F`, `B-UX`, `C-UX`, `S-UX`, `SUP`, `AT`, `DoD`, `DoR`, `PT`, `E`, `T`) del origen al migrado.
20. Conservación de encabezados de segundo y tercer nivel del origen al migrado.
21. Similitud de cuerpo origen ↔ migrado, excluidas cabecera y control de cambios.

Más: D1 idioma, D2 encoding, D3 `Título-Con-Guiones`, D4 ausencia de sufijo de versión en el nombre vivo, H1 en primera línea, campo `Estado`, campo `Variante` en 03, tabla de contenido en todo documento de más de tres secciones de primer nivel, y las 144 filas del plan §4 con su clasificación y su destino en disco.

### 1.3 Muestreo declarado en la evaluación de contenido

142 + 2 documentos no admiten la misma profundidad de lectura. El muestreo es **dirigido por riesgo, no aleatorio**, y se declara con su criterio:

| Bloque | Tamaño | Criterio de elección |
| --- | --- | --- |
| `02-Especificacion-Funcional/Glosario-Funcional.md` | **82 de 82 términos, 100 %** | Artefacto **nuevo** emitido por esta migración: es el caso de mayor riesgo de invención de toda la corrida. Contrastado término por término contra el punto 6 heredado de `Modelo-Conceptual.md` (32 entradas, archivado) y contra el uso real en los 98 hermanos |
| `03-UX-UI-DX/Glosario-UX.md` | **63 de 63 términos, 100 %**; los **26 nuevos** rastreados uno por uno | Segundo caso de riesgo: pasó de 39 a 63 términos y es el documento con la caída de similitud de cuerpo más grande de la corrida (0.162) |
| `PRODUCT-INTAKE-SelfHosted-Service.md` | **diff completo v2.4 → v3.0** (140 líneas `+`, 139 `−` sobre 5 481) y las **24 secciones** que la plantilla 2.1 declara obligatorias | Documento humano: §4.4 le pone cuatro restricciones propias, y es la raíz de la cadena D6 |
| `PRODUCT-MANIFEST-SelfHosted-Service.md` | **21 filas de §1.1** contra las cabeceras reales del framework, y **16 campos** derivados contra §13 del intake | Es el artefacto donde vive la afirmación de procedencia que M5 cerró: si miente, es P0 |
| Promociones de «proyecto» a «proyecto de código» | **9 de 9, 100 %** | Es el punto crítico de esta migración. Cada una leída contra su línea del archivado |
| Prosa del resto | **11 documentos leídos en profundidad** sobre 139 | `Vision-Producto`, `Alcance-Producto`, `00/README`, `01/Necesidades-Negocio`, `02/Especificacion-Funcional`, `02/README`, `Modelo-Conceptual`, `03/Experiencia-De-Uso`, `03/README`, `Wireframes-Cajon-De-Cambios-Pendientes`, `Representacion-Lenguaje-Visual-De-Estados`. Criterio: los cuatro índices de categoría, los dos documentos que cambiaron de nombre o perdieron una sección, y **todos** los documentos donde el barrido mecánico marcó una promoción, una sub-sustitución o una similitud de cuerpo por debajo de 0.85 |

Los 128 documentos restantes se evaluaron por el diff estructural del punto 1.2 —encabezados, identificadores y similitud de cuerpo al 100 %—, que es lo que detecta pérdida de contenido y reescritura, no por lectura completa. **Se declara la limitación**: una invención local en un párrafo de un CU que conserve encabezados e identificadores y no mueva la similitud de cuerpo quedaría fuera de este muestreo. La mediana de similitud de cuerpo de la corrida es **0.911** y solo cuatro documentos caen por debajo de 0.80, los cuatro leídos en profundidad, lo que acota el espacio donde eso podría haber ocurrido.

---

## 2. Resumen ejecutivo

La migración normativa del conjunto 4.1 al 6.0 sobre SelfHosted Service **está completa**: las 144 filas del plan tienen documento migrado en disco, con su estado previo archivado en el `_legacy/` de su propia carpeta, su fila de migración fechada y su cabecera bajo la normativa vigente. **Cero hallazgos P0**: los seis P0 propios de una migración se verificaron uno por uno contra los archivos y ninguno se cumple, incluido el de mayor riesgo —la invención en el `Glosario-Funcional.md` nuevo de 82 términos, cuyos 82 se rastrean a una fuente admitida—, y ninguna de las 1 600 ocurrencias de la familia «proyecto» se convirtió a «proyecto de código» sobre la entidad del dominio o sobre el emprendimiento.

Lo que queda abierto es de **registro, no de contenido**: el plan —que es el contrato entre orquestadores— no se cerró y sigue declarando 119 filas resueltas de 144 y la categoría 03 «sin resolver», mientras el manifiesto declara 144 de 144 y cierra la procedencia; y su columna de «fuente de contenido» sigue declarando «documento de origen» para las 25 filas del último corte, que los propios documentos contradicen por escrito. A eso se suma el gobierno del glosario de la categoría 03, que incumple su regla de inclusión en al menos seis términos verificados, y una ocurrencia en la que el renombre de artefacto se aplicó sobre el nombre de un archivo archivado y dejó una cita que no resuelve.

| Nivel | Cantidad |
| --- | --- |
| **P0** | **0** |
| **P1** | **3** |
| **P2** | **11** |
| **P3** | **6** |
| **Total** | **20** |

**Veredicto: APROBADO CON OBSERVACIONES.** La migración se declara **completa** y la procedencia del conjunto 6.0 en `PRODUCT-MANIFEST` §1.1 es una afirmación verdadera sobre el estado del destino. Los tres P1 no obligan a reabrir ningún documento de contenido: se cierran con filas de tabla y con la actualización del plan.

---

## 3. Matriz D1-D9

Cobertura del 100 % por script sobre los 144.

| Invariante | Qué se midió | Resultado | Veredicto |
| --- | --- | --- | --- |
| **D1 · Idioma** | Barrido de partículas de inglés en prosa sobre los 144 | 0 documentos | **C** en 144/144 |
| **D2 · Encoding** | Lectura UTF-8 estricta de los 144 | 0 fallos | **C** en 144/144 |
| **D3 · `Título-Con-Guiones`** | Nombre de archivo de los 144 contra el patrón | 0 desvíos. La carpeta `reglas-conceptuales-de-modelo/` es minúscula por convención preexistente del destino, y sus 19 archivos sí cumplen | **C** en 144/144 |
| **D4 · Versionado con guion medio, sin sufijo en el vivo** | Nombre vivo de los 144 y nombre de los 144 archivados | 0 vivos con sufijo; **144/144 archivados con `-v<X.Y>.md`**. El defecto que el orquestador declara haber cometido sobre los 6 de `00-Contexto` está **cerrado y sin residuo** | **C** en 288/288 |
| **D5 · Política de deprecación** | Estado previo archivado antes de sobrescribir | 144/144. `Glosario-Funcional.md` no tiene archivado por ser artefacto nuevo, que es lo correcto | **C** |
| **D6 · Trazabilidad** | Cabecera de 00 y 01 con upstream y downstream; sección de trazabilidad en 02 y 03 según §4.2 de sus reglas | 16/16 en 00 y 01; 101/101 en 02; 20/25 en 03 —las 4 representaciones y el glosario no llevan sección de trazabilidad, y **§4.2.2 de `Rules-UX-UI-DX` 4.0 no la exige** para `representacion-<concepto>.md`, cuya §6 «Reutilización» cumple la función downstream. Idéntico en el archivado: no lo introdujo la migración | **C** |
| **D7 · Prohibición de vocabulario fuente** | Barrido de los cinco identificadores legados y de los tres nombres de artefacto legados fuera de filas históricas | **0 ocurrencias vivas.** Las 44 de `SOLUTION-*`, las 23 de `Alcance-Proyecto` y las 17 de identificadores legados están **todas** en filas de control de cambios o en enunciados explícitos del renombre | **C** |
| **D8 · Conjunto cerrado** | `tipo_proyecto_codigo` = `web-monolith` en el manifiesto y en el índice maestro de 02 | Coherente. Caso degenerado de un único proyecto de código, con la salida aplanada de `Master-Prompt.md` §3.5 | **C** |
| **D9 · Evidencia verificable** | 1 124 enlaces relativos y 57 citas a `_legacy/` entre acentos graves | **6 enlaces rotos, los 6 en informes de audit fuera de alcance.** 0 rotos en los 144. **1 cita a `_legacy/` que no resuelve**, en el intake — hallazgo **P1-03**. Nueve conteos declarados «verificados en disco» que no reproducen — hallazgos **P2-04**, **P2-09** y **P2-10** | **NC parcial** |

**El P0 que hizo RECHAZAR la ronda 1 del corte 3** —59 documentos citando rutas de `_legacy/` que no resolvían— está **cerrado y verificado por medición propia**: de las 57 citas a `_legacy/` de los 144 documentos, 56 resuelven contra un archivo existente en disco. La única que no resuelve es de otra clase y de otro documento (P1-03).

---

## 4. Matriz de estructura obligatoria

### 4.1 Cabeceras

| Categoría | Nivel | Cabecera que exige §4.1 de su regla | Medido | Veredicto |
| --- | --- | --- | --- | --- |
| `00-Contexto` (6) | Producto | `**Producto:** <Nombre-Producto>` | 6/6, con el valor `SelfHosted Service` y `Slug-Producto` anotado entre paréntesis | **C** |
| `01-Necesidades-Negocio` (10) | Producto | `\| Producto \| {{Nombre-Producto}} \|` en bloque de tabla | 10/10 | **C** |
| `02-Especificacion-Funcional` (101) | Proyecto de código | `**Proyecto de código:** SelfHosted-Service` **más** `**Producto:** SelfHosted Service`, en ese orden | **101/101**, incluido `Especificacion-Funcional.md`, que usa formato de tabla pero declara los dos campos en el orden correcto | **C** |
| `03-UX-UI-DX` (25) | Proyecto de código | Ídem, más `**Variante:**` | **25/25** en los dos campos; **25/25** en `Variante` | **C** |
| `SDD/Intake/` (2) | — | Cabecera de `PRODUCT-INTAKE-template` 2.1 y `PRODUCT-MANIFEST-template` 4.1 | 2/2 | **C** |

**Cero ocurrencias** de la etiqueta legada `**Proyecto:**` sobre un valor de plano producto, que es el defecto que el framework corrigió en sí mismo en la `[5.1]`. **El defecto 4 que el orquestador declara haber cometido —la regla R4 del plan subespecificando la cabecera de las categorías de nivel proyecto de código— está cerrado sin residuo**: los 126 documentos de 02 y 03 llevan los dos campos, en el orden que §4.1 de sus reglas declara. La excepción que el plan §3.5 Paso 2.b declaraba abierta —`Especificacion-Funcional.md`, hallazgo P2 de la ronda 2— **está cerrada**.

### 4.2 Versiones

| Categoría | Distribución | Lectura |
| --- | --- | --- |
| 00-Contexto | 6 × `2.0` | Bump major, correcto para «regenerar contenido» |
| 01-Necesidades-Negocio | 10 × `2.0` | Ídem |
| 02-Especificacion-Funcional | 99 × `2.0`, 1 × `3.0` (`CU-03`, que venía de 2.0), 1 × `1.0` (`Glosario-Funcional.md`, emisión inicial) | Correcto |
| 03-UX-UI-DX | 25 × `2.0` | Correcto |
| Intake | `3.0` (desde 2.4) y `2.1` (desde 2.0) | Intake **major**, como §4.4 regla 3 exige. Manifiesto **minor** en M5: el cierre de procedencia no cambia la derivación |

### 4.3 Secciones obligatorias

Verificadas contra §4.2 de la regla de cada categoría, con lectura completa en los 11 documentos del muestreo y verificación de encabezados al 100 % en los 144:

- **00 y 01**: sin pérdida de secciones. Los dos únicos encabezados que cambian son `## §3. Objetivos del proyecto` → `del producto` y `## §8. Criterios de aceptación del proyecto` → `del producto` en `Alcance-Producto.md`, que es lo que `Rules-Contexto` 3.1 §4.2 declara. **C**.
- **02**: `Modelo-Conceptual.md` cambia `## 6. Glosario` por `## 6. Referencia al glosario`, y `README.md` cambia `## 6. Qué consume cada categoría downstream`. Los dos son consecuencia de que `Rules-Especificacion-Funcional` 4.0 §2.1 haga obligatorio a `Glosario-Funcional.md`. **C**.
- **03**: las 4 representaciones cumplen exactamente las 7 secciones de §4.2.2. `Glosario-UX.md` pasa de 7 a 10 secciones y renombra `## §5. Términos del dominio que esta categoría reusa sin redefinir` a `## §5. Términos que esta categoría reusa sin redefinir`. `README.md` renumera `### 7.3 Las diecisiete restantes` a `Las veintidós restantes`. **C**.
- **Tabla de contenido**: 144/144 documentos de más de tres secciones de primer nivel la llevan.

### 4.4 Artefactos obligatorios de la normativa vigente

| Artefacto que la 6.0 vuelve obligatorio | Estado | Veredicto |
| --- | --- | --- |
| `02-Especificacion-Funcional/Glosario-Funcional.md` (`Rules-Especificacion-Funcional` 4.0 §2.1) | **Emitido** en el corte 3, v1.0, 82 términos | **C** |
| `03-UX-UI-DX/Glosario-UX.md` (`Rules-UX-UI-DX` 4.0 §2.1) | **Presente y migrado**, v2.0, 63 términos | **C** |
| `03-UX-UI-DX/Linea-Base-Visual.md` | Ausente, **declarado** en el plan §7.2 y en `03-UX-UI-DX/README.md` §9 | **C** — emitirlo sería invención |
| `03-UX-UI-DX/Contrato-Datos-Maqueta.md` | Ídem | **C** |
| `03-UX-UI-DX/Bitacora-Validacion-Maqueta.md` | Ausente, declarado en `03-UX-UI-DX/README.md` §9 pero **omitido del plan §7.2** | **NC menor** — hallazgo **P3-01** |

---

## 5. Coherencia cross-doc y gobierno del glosario

### 5.1 Coherencia cross-doc

| Verificación | Resultado |
| --- | --- |
| Enlaces relativos entre los 144 | 1 124 enlaces, **0 rotos** |
| Citas a rutas de `_legacy/` | 57 en 51 archivos, **56 resuelven**, 1 no (**P1-03**) |
| Identificadores duplicados | 0. `RN-17` existe y está migrado; la numeración de RN es continua de 01 a 40 |
| Identificadores perdidos del origen al migrado | **0 en 143 documentos.** El único caso, `CU-14` en `Modelo-Conceptual.md`, se rastreó: viajó con el punto 6 heredado a `Glosario-Funcional.md` §3 R3, donde la fila del referente «registro del contenedor» lo cita. No es pérdida |
| Renombre de artefacto propagado | Las 50 referencias cruzadas a `Alcance-Producto.md` resuelven; las 5 que el corte 1 dejó abiertas están cerradas |
| Contradicción entre artefactos vivos | **1**: el plan declara 119 filas resueltas de 144 y el manifiesto declara 144 de 144 (**P1-02** y **P2-01**) |

### 5.2 Gobierno del glosario en cadena, con sus cuatro criterios

La cadena tiene tres glosarios: el raíz en `00-Contexto/Vision-Producto.md` §9 (**34 términos**), el funcional en `02-Especificacion-Funcional/Glosario-Funcional.md` (**82 términos** definidos, más 18 referenciados en §4.1 y 2 equivalencias de forma en §4.2), y el de superficie en `03-UX-UI-DX/Glosario-UX.md` (**63 términos** definidos, más 61 referenciados en §5).

**Criterio 1 · Sin contradicciones — CUMPLE.** No hay ningún término con dos definiciones incompatibles entre los tres. Los dos puntos de riesgo están correctamente resueltos: `Modo pendiente`, que el intake §12 define nombrando su color y que el glosario raíz transcribe sin él, lleva en `Glosario-UX.md` §5.3 la declaración de que la diferencia es «de nivel de declaración, no de referente», con su `C-UX-01`; y `Huérfano`, que suma un segundo referente en el funcional y una precisión de superficie en el de UX, los declara los tres.

**Criterio 2 · Completitud — NO CUMPLE en la categoría 03.** `Rules-UX-UI-DX` 4.0 §3.3 dice: «todo término que aparezca en más de un artefacto de 03 debe estar en `Glosario-UX.md`. Si un término ya está en `Glosario-Funcional.md` de 02 con la misma semántica, se referencia y no se duplica». Muestreo dirigido de 24 términos de riesgo más los 32 con fila propia en el funcional. Seis términos verificados no están ni como entrada, ni en la tabla de referencias de §5.2, ni entre los 33 candidatos que §9.1 declara descartados:

| Término | Artefactos de 03 en los que aparece | ¿Fila propia en `Glosario-Funcional.md`? |
| --- | --- | --- |
| `origen` | **24 de 24** | Sí, §2.2, con la nota «no confundir con vía de alta» |
| `performance percibida` | **20** | No; el umbral vive en `Experiencia-De-Uso.md` §7 |
| `imagen` | **13** | Sí, §2.2 |
| `reflujo` | **10** | No |
| `montaje` | **8** | Sí, §2.2 |
| `línea de tiempo` | **6** | Sí, §2.5, como `Línea de tiempo del despliegue` |

Es la misma familia que los P1 de los cortes 1, 2 y 4, que se cerraron uno por término —«brecha», «conjunto de servicios» y «vía de alta», los tres **verificados presentes hoy**—. Hallazgo **P1-01**.

En la categoría 02 el criterio **cumple**: los 82 términos aparecen en dos o más de los 98 hermanos, verificado uno por uno, y las 32 entradas del punto 6 heredado tienen destino, 14 en §2 y 18 en §4.1.

**Criterio 3 · Polisemia gobernada — CUMPLE con una excepción menor.** Los términos con más de un referente llevan entrada que los enumera: «registro» con cuatro referentes en el funcional §3.1, «ámbito» con dos en §3.3, «higiene del modelo» en §3.4, «huérfano» en §3.5, «etiqueta» con tres en §3.7, y `Glosario-UX.md` §8 declara los suyos. La excepción: `Pendiente de aplicar` designa en 03 tanto el estado visual como el valor `pendiente-de-aplicar` del estado de configuración, y ni §5.2 ni §8 lo declaran como dos referentes — hallazgo **P3-05**. La regla de no duplicación tiene un incumplimiento: `Nodo borrador` está a la vez **definido** en `Glosario-UX.md` §3 con las mismas dos cláusulas sustantivas que `Glosario-Funcional.md` §2.2 da a `Borrador`, y **referenciado** en §5.2 apuntando a ese mismo lugar — hallazgo **P2-05**. La dirección inversa de la regla de inclusión —términos que sobran— tiene tres violaciones netas: `Vista de un solo uso` y `Banner de cambios pendientes` aparecen en un solo artefacto y su propia columna lo dice, y `Omisión declarada` en ninguno — hallazgo **P2-06**.

**Criterio 4 · El criterio negativo — polisemias evaluadas y descartadas.** Se enumeran para que la ronda siguiente no las vuelva a levantar. En las catorce los contextos son disjuntos y **no son hallazgo**:

| # | Término | Referentes | Por qué se descarta |
| --- | --- | --- | --- |
| 1 | **«proyecto»** | Entidad del dominio (el agrupador de servicios del lienzo), unidad de compilación, emprendimiento | Los tres están declarados con evidencia en `PRODUCT-INTAKE` §12 y en `Vision-Producto.md` §9, con la tabla de los tres contextos y la forma de escritura de cada uno. El intake decide explícitamente **no calificar el tercero**. Es el caso que `Vocabulario-Rules.md` §9.6 prevé y §10 protege |
| 2 | **«registro»** | Del sistema, del contenedor, de auditoría, imagen de registro | Familia calificada declarada en `Glosario-Funcional.md` §3.1 con sus cuatro formas |
| 3 | **«migración»** | La intervención del framework 5.0, las migraciones de datos del producto documentado, la migración normativa | `Vocabulario-Rules.md` §9.6 lo resolvió y dejó constancia del barrido |
| 4 | **«solución»** | El compuesto «solución de código», que designa el `.sln` | Preservado deliberadamente por la entrada `[5.0]` |
| 5 | **«resolución»** | 331 ocurrencias en las cuatro categorías y en el intake | No es «solución» con prefijo: es otra palabra. Contarla como daño sería el falso positivo |
| 6 | **«reproducto»** | 8 ocurrencias, todas entrecomilladas | Citan el daño que se evitaba, en filas de control de cambios y en la prosa del plan y del glosario. **Cero ocurrencias reales**. Reportarlas sería defecto de este informe |
| 7 | **«imagen»** | De contenedor, de registro | Contextos disjuntos y modificador siempre presente donde importa |
| 8 | **«huérfano»** | Servicio huérfano, variable compartida huérfana | Declarados en `Glosario-Funcional.md` §3.5 |
| 9 | **«ámbito»** | De variable, de token de API | Declarados en §3.3 |
| 10 | **«higiene»** | Del modelo, del registro, de imágenes | Las tres formas calificadas conviven; la desnuda no aparece sola en ninguna sección despachable |
| 11 | **«plantilla»** | Del catálogo del producto, del framework | Contextos disjuntos: una es entidad del dominio, la otra es artefacto de `IA.SDD` |
| 12 | **«módulo»** | Área funcional del producto | Preservado deliberadamente por la `[5.0]` |
| 13 | **«estado»** | De configuración, de ejecución, campo `Estado` de la cabecera | El tercero es una etiqueta de metadato, tipográficamente distinguible |
| 14 | **«asimetría»** | Tres objetos en tres documentos sin sección compartida | Ya evaluada y descartada por el corte 4; se ratifica |

---

## 6. Los catorce criterios de aceptación de `Migracion-Rules.md` §6

| # | Criterio | Veredicto | Evidencia |
| --- | --- | --- | --- |
| 1 | Todo documento migrado tiene su fuente de contenido declarada en el plan, con uno de los tres valores admitidos de §2.1 | **NO CUMPLE** | Las 144 filas de §4 llevan la columna, pero 141 declaran «documento de origen» a secas. La corrección de §8.1 alcanza a 28 filas de 00, 01 y 02 y **no alcanza al corte 4**: para las 25 de 03 el plan sigue diciendo «documento de origen», y `Glosario-UX.md`, `03/README.md` y `Experiencia-De-Uso.md` declaran por escrito lo contrario —«**no es "documento de origen" a secas**»—. Cuarto corte consecutivo. Hallazgo **P1-02** |
| 2 | Ninguna sección de ningún documento migrado contiene contenido que no provenga del origen, de un hermano o de una respuesta del humano | **CUMPLE** | Los 82 términos de `Glosario-Funcional.md` rastreados a fuente admitida, incluidas las afirmaciones arquitectónicas de sus definiciones —«33 CU primario y 5 secundario» reproduce el conteo real; la cláusula sobre proxies inversos es transcripción literal de `CU-13`:122—. Los 26 términos nuevos de `Glosario-UX.md` rastreados uno por uno. Diff del intake: 140 líneas `+` sobre 5 481, todas sustitución léxica o renombre de identificador, sin ningún bloque de prosa nuevo. Cero identificadores perdidos, mediana de similitud de cuerpo 0.911 |
| 3 | Ninguna sección exigida por la normativa vigente y sin fuente quedó rellenada | **CUMPLE** | Las 24 secciones obligatorias de `PRODUCT-INTAKE-template` 2.1 están presentes con contenido del origen; ninguna se completó. `Linea-Base-Visual.md`, `Contrato-Datos-Maqueta.md` y `Bitacora-Validacion-Maqueta.md`, obligatorios por `Rules-UX-UI-DX` 4.0 §2.1, quedaron **sin emitir y declarados**, que es lo que §4.1 pide |
| 4 | El estado previo de cada documento migrado quedó archivado en el `_legacy/` de su propia carpeta | **CUMPLE** | **144 de 144**, con sufijo `-v<X.Y>.md`, en el `_legacy/2026-07-30/` de su propia carpeta y no en un espejo bajo la raíz de la categoría. `Glosario-Funcional.md` no tiene, por ser artefacto nuevo. Los tres renombres resuelven contra su archivado legado |
| 5 | Todo contenido del origen que la normativa vigente no ubica quedó enumerado en el informe con su texto localizable | **CUMPLE** | Ver §9. El único bloque que la 6.0 desubica es el punto 6 de `Modelo-Conceptual.md`, y sus 32 entradas tienen destino verificado |
| 6 | Ninguna corrección manual fue pisada sin declarar la interpretación y esperar confirmación | **CUMPLE** | **Cero filas históricas de control de cambios alteradas en los 144**, medido celda por celda contra el archivado. Los documentos que la Fase B2 había corregido a mano —`CU-03` v2.0, `CU-06`, `CU-08`, `CU-13`, `CU-15`, `CU-16`, `CU-17` v1.1, `RN-08`, `RN-15` v1.1, y seis wireframes v1.1— conservan su contenido: sus identificadores y encabezados están completos y su similitud de cuerpo está en la mediana de la corrida |
| 7 | Cada documento del plan lleva su clasificación de §4.3 | **CUMPLE** | 144 de 144. 141 «Regenerar contenido», 1 «Regenerar contenido (fase M2, como propuesta)», 1 «Re-derivación (fase M3)», 1 «Regenerar contenido · emisión inicial». Ninguna quedó «no tocar», coherente con que los veintiún saltos sean major |
| 8 | El intake migrado se verificó contra la plantilla vigente y su bump es major | **CUMPLE** | Las 24 secciones obligatorias de la plantilla 2.1 verificadas presentes, incluida la Parte D con sus 23 escenarios en el enum cerrado y los bloqueantes numéricos de §17 P.6 a P.10. Bump `2.4 → 3.0`, major, con la razón normativa en la fila |
| 9 | El intake se migró antes que el manifiesto, y el manifiesto antes que los documentos generados | **CUMPLE** | M2 escribió el intake a las 00:30; M3 archivó el manifiesto a las 00:31; el primer archivado de `SDD/Docs/` es de las 00:58. Las filas de control de cambios lo declaran: la del manifiesto v2.0 dice «la derivación desde §13 del intake no cambió» y «la procedencia no se cerró: es trabajo de M5». M5 cerró a las 12:34, después del último audit de M4 de las 09:23 |
| 10 | Si el destino no declaraba procedencia, la degradación está declarada y no se supuso origen | **NO APLICA, declarado** | El destino declaraba procedencia del conjunto 4.1 en el §1.1 del manifiesto legado, y el conjunto de origen es reconstruible en `IA/IA.SDD/_legacy/4.1/`. El plan §6 lo declara con su razón |
| 11 | El bloque de procedencia se reescribió **solo** si toda la cadena quedó migrada | **CUMPLE** | La cadena **está completa**: las 144 filas tienen documento en disco con archivado, fila de migración y cabecera conforme. La procedencia 6.0 de §1.1 es verdadera. Las 21 versiones que declara coinciden exactamente con las cabeceras reales de `IA.SDD` y con la entrada `[6.0] - 2026-07-29` del `CHANGELOG.md` |
| 12 | Ninguna fila del plan quedó sin resolver y sin declararse como pendiente en el informe | **CUMPLE** | 144 de 144 resueltas, enumeradas en §8. Ninguna queda pendiente, de modo que no hay nada que declarar como tal. El registro §8 del **plan** sigue atrás —**P2-01**—, pero eso no deja ninguna fila sin resolver |
| 13 | Ningún renombre de artefacto se resolvió por inferencia | **CUMPLE** | Los tres renombres de archivo y los cinco de identificador del plan §3.1 y §3.2 coinciden **literalmente** con el bloque «Cambiado» de la entrada `[5.0]` del `CHANGELOG.md`: `SOLUTION-INTAKE` → `PRODUCT-INTAKE`, `SOLUTION-MANIFEST` → `PRODUCT-MANIFEST`, `Alcance-Proyecto.md` → `Alcance-Producto.md`, y `Nombre-Solucion` → `Slug-Producto`, `NombreSolucionCodigo` → `Raiz-Codigo`, `Nombre-Proyecto` → `Nombre-Proyecto-Codigo`, `nombre-proyecto-codigo` → `Identidad-Codigo`, `project_type` → `tipo_proyecto_codigo`. El plan §3.4 declara además los cinco que no alcanzan al destino, con su razón |
| 14 | Ninguna sustitución se hizo por reemplazo global de cadena | **CUMPLE con una excepción** | Cero «reproducto» reales, cero cabeceras de tabla pisadas, cero concordancias de género rotas, y las 331 ocurrencias de «resolución» sobreviven en las cuatro categorías y en el intake. Las 9 promociones de «proyecto» a «proyecto de código» se leyeron una por una contra el archivado y **las 9 son correctas**. La excepción: en `PRODUCT-INTAKE`:70 el renombre se aplicó sobre el **nombre de un archivo archivado**, produciendo una cita que no resuelve — hallazgo **P1-03** |

**Resultado: 11 cumplen, 1 no aplica y está declarado, 2 no cumplen** (criterios 1 y 14, este último parcialmente).

---

## 7. Los seis hallazgos P0 propios de una migración

Verificados uno por uno contra los archivos. **Ninguno se cumple.**

| # | Hallazgo P0 de `Master-Prompt-Migracion.md` §10 | Veredicto | Evidencia |
| --- | --- | --- | --- |
| 1 | **Invención**: contenido que no proviene del origen, de un hermano, del intake o del humano | **LIMPIO** | El caso de mayor riesgo, `Glosario-Funcional.md`, se verificó al **100 %**: sus 82 términos reparten `6+21+18+11+6+6+3+6+3+2`, 14 vienen del punto 6 heredado y los 68 restantes aparecen en dos o más de los 98 hermanos, con archivo y línea. Las afirmaciones sobre el sistema dentro de las definiciones se contrastaron una por una y todas son transcripción o conteo reproducible. El segundo caso, `Glosario-UX.md`, pasó de 39 a 63: los 26 nuevos se rastrearon a un hermano de 03, al upstream o al intake, y los 39 originales están los 39, **37 con su definición textualmente idéntica** y 2 convertidos correctamente en referencias |
| 2 | **Sección exigida rellenada con contenido inferido** | **LIMPIO** | Ninguna de las 24 secciones obligatorias de la plantilla vigente se rellenó: el diff del intake no agrega ningún bloque de prosa. Los tres artefactos que `Rules-UX-UI-DX` 4.0 vuelve obligatorios y que no tienen fuente quedaron **sin emitir**, declarados en `03-UX-UI-DX/README.md` §9 |
| 3 | **Procedencia reescrita con migración parcial** | **LIMPIO** | La cadena está completa. Verificado con seis medidas independientes sobre las 144 filas: documento vivo en disco, archivado con sufijo en su propia carpeta, fila de migración fechada 2026-07-30, cabecera bajo la normativa vigente, versión bumpeada y filas históricas intactas. **144 de 144 en las seis** |
| 4 | **Corrección manual pisada** sin declarar la interpretación | **LIMPIO** | Cero de las filas históricas de control de cambios de los 144 fue alterada, medido celda por celda. 143 documentos tienen exactamente una fila más que su archivado; el manifiesto tiene dos, porque se archivó dos veces —en M3 y en M5— y las dos copias están en disco |
| 5 | **Estado previo no archivado** en el `_legacy/` de su propia carpeta | **LIMPIO** | 144 archivados para 143 documentos con origen. **El defecto de consolidación que el orquestador declara haber cometido está cerrado sin residuo**: no queda ningún espejo del subárbol bajo el `_legacy/` de la raíz de la categoría, y `02-Especificacion-Funcional/_legacy/2026-07-30/` contiene exactamente los dos documentos que viven en esa carpeta |
| 6 | **Fila del plan sin resolver y sin declararse** como pendiente | **LIMPIO** | Las 144 filas de §4 del plan tienen destino existente en disco y están enumeradas con su estado final en §8 de este informe. Ninguna queda pendiente |

### 7.1 El punto crítico: la doble dirección del renombre de «proyecto»

Censo propio sobre los 126 documentos de 02 y 03, excluidos el campo de cabecera y las filas de control de cambios: **20 ocurrencias de «proyecto de código» en cuerpo**. Cada una se leyó contra su línea del archivado.

**Sobre-sustitución: CERO.** Ninguna de las 20 cae sobre la entidad del dominio ni sobre el emprendimiento. Las nueve que son promoción real:

| # | Documento y línea | En el archivado | En el vivo | Referente | Veredicto |
| --- | --- | --- | --- | --- | --- |
| 1 | `03/Experiencia-De-Uso.md`:140 | «Piso obligatorio de todo **proyecto** con interfaz web» | «…todo **proyecto de código**…» | Unidad D8 a la que `Design-Rules-Web-Generico` se aplica | **Correcta** |
| 2 | `03/Experiencia-De-Uso.md`:715 | «declararlo por **proyecto**» | «…por **proyecto de código**» | Unidad D8 que tendría prohibido definir el token | **Correcta** |
| 3 | `03/Experiencia-De-Uso.md`:722 | «en todo **proyecto** que cargue la extensión» | «…todo **proyecto de código**…» | Cita de `Rules-UX-UI-DX` §1.4, que dice literalmente «Cuando el **proyecto de código** tiene superficies de configuración» | **Correcta, verificada contra el texto de la regla** |
| 4 | `03/Experiencia-De-Uso.md`:725 | «condiciona la ranura a que el **proyecto** tenga superficies» | «…el **proyecto de código**…» | Paráfrasis de `Audit/B-02-03-r1` §7.2. La cita literal entre comillas **no se tocó** | **Correcta** |
| 5 | `03/Experiencia-De-Uso.md`:751 | «prohíbe definirlo por **proyecto**» | «…por **proyecto de código**» | Ídem #2 | **Correcta** |
| 6 | `03/Representaciones/Representacion-Lenguaje-Visual-De-Estados.md`:117 | «prohíbe definir el token por **proyecto**» | «…por **proyecto de código**» | `Rules-UX-UI-DX` §1.4: «tiene prohibido definir tokens visuales ad hoc **por proyecto de código**» | **Correcta, verificada contra el texto de la regla** |
| 7 | `03/Wireframes/Wireframes-Cajon-De-Cambios-Pendientes.md`:142 | «en todo **proyecto** que cargue la extensión» | «…todo **proyecto de código**…» | Ídem #3 | **Correcta** |
| 8 | `02/Especificacion-Funcional.md`:45 | «sin subnivel de **proyectos**» | «sin subnivel de **proyectos de código**» | El subnivel `Proyectos/<Nombre-Proyecto-Codigo>/` que `Master-Prompt.md` §3.5 aplana | **Correcta** |
| 9 | `02/Especificacion-Funcional.md`:71 | «AG-05 Arquitecto, en **proyectos** con DDD» | «…en **proyectos de código** con DDD…» | Unidad D8 sobre la que se decide el despacho de AG-05 | **Correcta** |

**Corrección de una premisa del despacho.** Las promociones no son siete y no están todas en `03-UX-UI-DX`: son **nueve**, siete en 03 y **dos en 02**. Las dos de 02 están declaradas en la fila de control de cambios de `Especificacion-Funcional.md`, que registra que «la forma "proyecto de código" pasa de 4 ocurrencias en el origen a 13, y las nueve nuevas se justifican una por una». No es un defecto: es un conteo del despacho que no coincidía con el disco, y se corrige acá.

Las once ocurrencias restantes de las 20 no son promoción: seis venían textualmente del archivado —`CU-01`:117, `02/README`, `03/README`:67, `Glosario-UX.md`:259 y dos en `Especificacion-Funcional.md`— y cinco son texto metalingüístico nuevo de los dos glosarios y del índice de 02, que declaran la familia «proyecto» y sus tres referentes: hablan **del término**, no designan con él.

**Sub-sustitución: dos ocurrencias.** `03-UX-UI-DX/README.md`:143 conserva «Base obligatoria de todo **proyecto** con interfaz web» y :160 conserva «prohíbe definir tokens **por proyecto**». Son literalmente las mismas dos frases que sí se promovieron en el hermano canónico `Experiencia-De-Uso.md`:140 y :751, sobre el mismo referente. Es defecto menor y visible, como el plan §3.5 Paso 3 anticipa. Hallazgo **P2-03**.

---

## 8. Estado final de cada fila del plan, las 144

Sección propia exigida por `Master-Prompt-Migracion.md` §10.

### 8.1 Método

Cada una de las 144 filas de `Plan-Migracion-4.1-a-6.0.md` §4 se evaluó contra **seis medidas independientes**, las seis por script y al 100 %:

| Medida | Qué verifica |
| --- | --- |
| **M1** | El documento destino de la fila existe en disco, con el nombre vigente |
| **M2** | Tiene su estado previo archivado en el `_legacy/2026-07-30/` de su **propia** carpeta, con sufijo `-v<X.Y>.md` |
| **M3** | Tiene una fila de control de cambios fechada 2026-07-30 que declara la migración normativa y su fase |
| **M4** | Su cabecera cumple §4.1 de la regla de su categoría, con el campo y el orden que el nivel de aplicación exige |
| **M5** | Su versión subió respecto de la archivada |
| **M6** | Ninguna de sus filas históricas de control de cambios fue alterada |

### 8.2 Resultado por categoría

| Fila del plan | Cantidad | M1 | M2 | M3 | M4 | M5 | M6 | Estado final |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `SDD/Intake/` — intake `2.4 → 3.0` | 1 | ✓ | ✓ | ✓ | ✓ | ✓ major | ✓ | **RESUELTA** |
| `SDD/Intake/` — manifiesto `1.9 → 2.0 → 2.1` | 1 | ✓ | ✓ (dos archivados) | ✓ | ✓ | ✓ | ✓ | **RESUELTA** |
| `SDD/Docs/00-Contexto/` | 6 | 6/6 | 6/6 | 6/6 | 6/6 | 6/6 | 6/6 | **RESUELTAS** |
| `SDD/Docs/01-Necesidades-Negocio/` | 10 | 10/10 | 10/10 | 10/10 | 10/10 | 10/10 | 10/10 | **RESUELTAS** |
| `SDD/Docs/02-Especificacion-Funcional/` | 101 | 101/101 | 100/100 aplicables | 101/101 | 101/101 | 100/100 aplicables | 101/101 | **RESUELTAS** |
| `SDD/Docs/03-UX-UI-DX/` | 25 | 25/25 | 25/25 | 25/25 | 25/25 | 25/25 | 25/25 | **RESUELTAS** |
| **Total** | **144** | **144** | **143 + 1 n/a** | **144** | **144** | **143 + 1 n/a** | **144** | **144 RESUELTAS** |

El «n/a» es `Glosario-Funcional.md`: artefacto nuevo, sin estado previo que archivar y sin versión anterior que subir. Su fila del plan está clasificada «Regenerar contenido · emisión inicial», que es lo correcto.

### 8.3 Las filas que llevan una salvedad

Ninguna queda sin resolver. Ocho llevan una observación que este informe abre como hallazgo, y se enumeran para que la traza sea explícita:

| Fila | Salvedad | Hallazgo |
| --- | --- | --- |
| Las 25 de `SDD/Docs/03-UX-UI-DX/` | La columna «fuente de contenido» del plan declara «documento de origen» y tres de los documentos declaran por escrito que además usaron hermanos, el upstream y el intake | **P1-02** |
| `SDD/Docs/03-UX-UI-DX/Glosario-UX.md` | Regla de inclusión incumplida en seis términos; una duplicación parcial; tres términos que sobran; trece conteos de la columna «Artefactos de 03» que no reproducen | **P1-01**, **P2-04**, **P2-05**, **P2-06** |
| `SDD/Docs/03-UX-UI-DX/README.md` | Dos sub-sustituciones | **P2-03** |
| `SDD/Docs/02-Especificacion-Funcional/Glosario-Funcional.md` | Tres afirmaciones de conteo o de localización que no reproducen | **P2-09**, **P2-10** |
| `SDD/Intake/PRODUCT-INTAKE-SelfHosted-Service.md` | Una cita a `_legacy/` que no resuelve; el cierre de la entrada `[R-1]` sin registro fuera del propio documento; una fila de cabecera que la plantilla dice no completar | **P1-03**, **P2-11**, **P3-03** |
| `SDD/Intake/PRODUCT-MANIFEST-SelfHosted-Service.md` | Contradice al plan en el conteo de filas resueltas; afirma `usa_llm == false` sobre un flag que el intake no declara; invoca un informe de M6 que al escribirse no existía | **P2-01**, **P2-07**, **P3-02** |
| `SDD/Docs/02-Especificacion-Funcional/Especificacion-Funcional.md` | Recuento de 139 historias de usuario no reproducible, heredado del corte 3 y todavía abierto | **P3-04** |
| `SDD/Docs/02-Especificacion-Funcional/README.md` | Sigue sin listar las 19 reglas conceptuales con propósito y estado, heredado del corte 3 | **P3-04** |

---

## 9. Contenido que quedó sin destino

Sección propia exigida por `Master-Prompt-Migracion.md` §10 y por el criterio 5 de §6.

**No quedó contenido sin destino.** La afirmación se sostiene en cuatro medidas, las cuatro al 100 % sobre los 143 documentos con origen:

1. **Identificadores.** De los 143 pares origen ↔ migrado, **142 conservan todos sus identificadores**. El único movimiento es `CU-14` en `Modelo-Conceptual.md`, y se rastreó su destino: viajó con el punto 6 heredado a `Glosario-Funcional.md` §3, fila del referente R3 «la salida que emite el contenedor», que lo cita junto a `IDX` y `RME`.
2. **Encabezados.** De 143 pares, **137 conservan todos sus encabezados de segundo y tercer nivel**. Los seis con delta son renombres que la normativa vigente ordena, y en los seis el contenido de la sección sigue en el documento:

| Documento | Encabezado del origen | Dónde está su contenido | Norma que lo ordena |
| --- | --- | --- | --- |
| `00-Contexto/Alcance-Producto.md` | `## §3. Objetivos del proyecto` | `## §3. Objetivos del producto`, íntegro | `Rules-Contexto` 3.1 §4.2 |
| `00-Contexto/Alcance-Producto.md` | `## §8. Criterios de aceptación del proyecto` | `## §8. Criterios de aceptación del producto`, con los diez `CA-XX` | Ídem |
| `02/Modelo-Datos/Modelo-Conceptual.md` | `## 6. Glosario`, 32 entradas | `## 6. Referencia al glosario` remite a `Glosario-Funcional.md`; **las 32 entradas tienen destino: 14 en §2 y 18 en §4.1**, verificado una por una | `Rules-Especificacion-Funcional` 4.0 §2.1 y §3.3 |
| `02/README.md` | `## 6. Qué consume cada categoría downstream` | Reordenado dentro del índice, contenido presente | `Rules-Especificacion-Funcional` 4.0 §3.4 |
| `03/Glosario-UX.md` | `## §5. Términos del dominio que esta categoría reusa sin redefinir` | `## §5. Términos que esta categoría reusa sin redefinir`, con sus 13 filas: 12 en §5.1 y `Parcialmente activo` reubicado en §5.2 con su puntero corregido | `Rules-UX-UI-DX` 4.0 §3.3 |
| `03/README.md` | `### 7.3 Las diecisiete restantes, por destinatario` | `### 7.3 Las veintidós restantes, por destinatario`, recuento reconciliado y declarado en la fila de control de cambios | Recuento del propio documento |

3. **Definiciones.** Los 39 términos del `Glosario-UX.md` de origen están los 39 en el migrado: 37 con su definición **textualmente idéntica** y 2 —`Estado agregado` y `Resultado por contenedor`— convertidos en referencias a §5.2. Ninguna semántica se invirtió ni se perdió.
4. **Cuerpo.** La mediana de similitud de cuerpo origen ↔ migrado es **0.911**, y los cuatro documentos por debajo de 0.80 se leyeron completos: los tres primeros crecen —`Glosario-UX.md` de 104 a 290 líneas, `02/README.md` de 55 a 70, `00/README.md` de 83 a 84— y el cuarto es el manifiesto re-derivado. Ninguno pierde.

**Salvedad de método.** Esta verificación cubre identificadores, encabezados, definiciones y volumen. Una frase suelta del origen que la normativa vigente no ubicase y que se hubiera descartado sin mover ninguna de las cuatro medidas quedaría fuera de su alcance en los 128 documentos que no se leyeron completos. Se declara la limitación en lugar de afirmar una cobertura que este informe no tiene.

---

## 10. Declaración de migración completa o parcial

Sección propia exigida por `Master-Prompt-Migracion.md` §10.

> **La migración normativa del conjunto 4.1 al 6.0 sobre SelfHosted Service es COMPLETA.**

**Fundamento.** `Migracion-Rules.md` §4.6 define la migración parcial como aquella en la que la cadena no se completó, y le impone dos condiciones bloqueantes: no reescribir la procedencia y declarar el estado documento por documento. **Ninguna de las dos se activa acá, porque la cadena está completa**, y eso se verificó sin apoyarse en ninguna declaración de los orquestadores:

- Las **144 filas** del plan tienen documento destino existente en disco.
- **143 de 143** tienen su estado previo archivado en el `_legacy/` de su propia carpeta; el 144º es artefacto nuevo.
- **144 de 144** llevan fila de control de cambios fechada 2026-07-30 que declara la migración y su fase.
- **144 de 144** cumplen la cabecera que §4.1 de la regla de su categoría exige para su nivel de aplicación.
- **0 de 144** conservan una etiqueta, un identificador o un nombre de artefacto legado fuera de una fila histórica.
- **0 de 144** tienen una fila histórica de control de cambios alterada.
- Las **21 versiones** que `PRODUCT-MANIFEST` §1.1 declara coinciden exactamente con las cabeceras reales de los archivos de `IA/IA.SDD` y con la entrada `[6.0] - 2026-07-29` del `CHANGELOG.md`.

**En consecuencia, el cierre de procedencia de M5 es legítimo.** El bloque §1.1 del manifiesto declara el conjunto 6.0 sobre un árbol efectivamente migrado, y no es la afirmación falsa que §4.6 regla 1 tipifica como P0. Verificado por medición propia y no por lectura de la declaración.

**Lo que la migración no cubrió, y por qué no la hace parcial.** Las categorías 04 a 11 no están generadas: no hay documento que migrar, se generarán bajo la 6.0 cuando la corrida de generación llegue a ellas, y la 04 además está excluida por gating. `SDD/Maquetas/`, `SDD/Estado/`, los `_legacy/`, `/samples/` y `AGENTS.md` están fuera de alcance por `Migracion-Rules.md` §2.2 y por §5 del plan, cada uno con su razón declarada. Los tres artefactos de la Fase B2 que `Rules-UX-UI-DX` 4.0 vuelve obligatorios quedan sin emitir y declarados: emitirlos sería exactamente la invención que §4.1 prohíbe.

**Discrepancia de registro, no de estado.** El plan §8 sigue declarando «119 de 144» y la categoría 03 «Sin resolver». El disco dice otra cosa, y el disco es lo que este informe midió. El plan quedó sin actualizar desde las 07:56 del 2026-07-30, antes de que el corte 4 se ejecutara y se auditara. Es hallazgo **P2-01**, y no cambia la declaración de completitud: una fila resuelta cuyo registro no se actualizó sigue siendo una fila resuelta.

---

## 11. Hallazgos

### P1 · Alto

---

#### P1-01 · Gobierno del glosario: `Glosario-UX.md` incumple su regla de inclusión en al menos seis términos verificados

**Archivo:** `SDD/Docs/03-UX-UI-DX/Glosario-UX.md`
**Sección:** §2 a §5 y §9.1

**Evidencia.** `Rules-UX-UI-DX` 4.0 §3.3: «todo término que aparezca en más de un artefacto de 03 debe estar en `Glosario-UX.md`. Si un término ya está en `Glosario-Funcional.md` de 02 con la misma semántica, se referencia y no se duplica». Muestreo dirigido de 24 términos de riesgo, más los 32 con fila propia en el glosario funcional, barridos por ocurrencia sobre los 23 artefactos de 03 sin `_legacy/`. Seis resisten el filtro y no están ni como entrada, ni en la tabla de referencias de §5.2, ni entre los 33 candidatos que §9.1 declara descartados «para que una ronda de auditoría posterior no los levante como omisión»:

| Término | Artefactos de 03 | Fila propia en `Glosario-Funcional.md` |
| --- | --- | --- |
| `origen` | **24 de 24** | Sí, §2.2, con «no confundir con vía de alta» |
| `performance percibida` | **20** | No |
| `imagen` | **13** | Sí, §2.2 |
| `reflujo` | **10** | No |
| `montaje` | **8** | Sí, §2.2 |
| `línea de tiempo` | **6** | Sí, §2.5 |

Cuatro de los seis tienen fila propia en el glosario funcional, que los pone exactamente en el caso «se referencia y no se duplica» que §3.3 describe; §5.2 referencia `Vía de alta`, `Verificación del origen` y `Digesto`, y no referencia `Origen`, `Imagen`, `Montaje` ni `Línea de tiempo del despliegue`.

**Por qué es P1 y no P0.** No rompe trazabilidad, no omite un documento obligatorio, no introduce vocabulario prohibido y no falta ninguna cabecera. Es incumplimiento del §6 del archivo de reglas de la categoría, que `Master-Prompt.md` §10 clasifica como P1. **No es invención**: los seis términos existen en los artefactos; falta la entrada que los recoge.

**Por qué es P1 y no P2.** Los cortes 1, 2 y 4 fijaron el precedente con «brecha», «conjunto de servicios» y «vía de alta» —los tres verificados presentes hoy— y las tres filas se agregaron. El gobierno del glosario es uno de los dos criterios que el salto de `Rules-UX-UI-DX` a la 4.0 incorpora: es precisamente lo que esta migración existía para dejar cumplido. Y `origen` aparece en los 24 artefactos de la categoría.

**Recomendación.** Agregar seis filas: cuatro a §5.2 como referencia al glosario funcional con su precisión de superficie, y dos a §2 o §4 como entrada propia. No requiere tocar ninguno de los otros 24 artefactos.

---

#### P1-02 · La columna «fuente de contenido» del plan sigue sin declararse por fila para el corte 4, y los propios documentos la contradicen · cuarto corte consecutivo

**Archivo:** `SDD/Docs/Audit/Plan-Migracion-4.1-a-6.0.md`
**Sección:** §4, tabla de documentos generados, las 25 filas de `03-UX-UI-DX`; y §8.1

**Evidencia.** `Migracion-Rules.md` §2.1 declara que esta columna «es la forma en que §4.1 se vuelve verificable fila por fila», con tres valores admitidos. El plan §4 declara «documento de origen» para las 25 filas de 03. Los tres documentos índice de la categoría declaran lo contrario, por escrito, en su propia fila de control de cambios:

- `Glosario-UX.md`: «**Fuente de contenido: el documento de origen, más los veintitrés artefactos hermanos del propio destino, más los dos glosarios upstream, más el `PRODUCT-INTAKE` §12 y §20 E-18** — **no es "documento de origen" a secas**, y el grueso del trabajo de esta versión sale de los hermanos».
- `03/README.md`: «**Fuente de contenido: el documento de origen, más los veinticuatro artefactos hermanos del propio destino y el estado del disco** — **no es "documento de origen" a secas**».
- `Experiencia-De-Uso.md`: «fuente de contenido: el documento de origen… **más un artefacto hermano del propio destino** para un solo punto».

El plan §8.1 corrige la columna para 28 filas de 00, 01 y 02, y para el corte 4 escribe una **promesa**: «Consecuencia para el corte 4: la columna se declara documento por documento **antes** de despachar, y no por categoría». La promesa no se cumplió y el plan no volvió a tocarse. Es la cuarta ocurrencia del mismo hallazgo: `M4-00-Contexto-r1` H-03, `M4-01-Necesidades-Negocio-r1`, `M4-02-Especificacion-Funcional-r2` H-03-r2 y `M4-03-UX-UI-DX-r1` H-02.

**Por qué se eleva a P1, cuando los cuatro cortes lo graduaron P2.** Los cuatro lo graduaron P2 con el argumento de que era un estado transitorio de una migración por cortes y de que la corrección estaba comprometida. Ya no hay corte siguiente: **ésta es la auditoría de cierre**, la corrección comprometida no se aplicó, y el defecto queda permanente en el artefacto que `Migracion-Rules.md` §6 criterio 1 designa como el lugar donde la declaración tiene que vivir. Un incumplimiento de §6 que no rompe trazabilidad es P1 por `Master-Prompt.md` §10.

**Que no se confunda con invención.** Las tres fuentes que los documentos declaran —origen, hermano, intake— son las tres admitidas por §2.1, y las tres están registradas en las filas de control de cambios de los propios documentos. El defecto es de **registro en el contrato**, no de contenido.

**Recomendación.** Actualizar las 25 filas de 03 en §4 del plan con la fuente que cada documento declara, y llevar §8.1 al estado real. Aprovechar para corregir su aritmética (**P2-08**).

---

#### P1-03 · El renombre de artefacto se aplicó sobre el nombre de un archivo archivado, y la cita resultante no resuelve

**Archivo:** `SDD/Intake/PRODUCT-INTAKE-SelfHosted-Service.md`
**Sección:** línea 70, tabla «Qué se cambió en este documento, y nada más que esto», dentro de la sección histórica «Migración al Framework SDD 4.0»

**Evidencia.** El vivo dice:

> «El archivo vivo pierde el sufijo de versión del nombre y pasa a declarar su versión en la cabecera. La copia superada se archiva como `_legacy/2026-07-28/PRODUCT-INTAKE-SelfHosted-Service-Core-v1.2.md`»

El archivado de origen, `_legacy/2026-07-30/SOLUTION-INTAKE-SelfHosted-Service-v2.4.md`:70, decía `SOLUTION-INTAKE-SelfHosted-Service-Core-v1.2.md`. El archivo que existe en disco es `SDD/Intake/_legacy/2026-07-28/SOLUTION-INTAKE-SelfHosted-Service-Core-v1.2.md`. **La ruta que el documento vivo cita no existe.** Es la única de las 57 citas a `_legacy/` de los 144 documentos que no resuelve.

Tres razones por las que es defecto y no criterio:

1. **La cita no resuelve.** `Master-Prompt.md` §10 pide que toda afirmación sobre el estado del sistema cite evidencia que resuelva.
2. **Afirma un hecho falso.** Dice que el 2026-07-28 el archivo se archivó bajo un nombre que no existió hasta el 2026-07-30.
3. **Contradice tres normas que el propio plan cita.** El plan §3.1: «el archivo con nombre legado **no se renombra en su lugar**». La entrada `[5.0]` del `CHANGELOG.md`, en «Preservado deliberadamente»: «`SDD/Devs/Bootstrap/` y `_legacy/` **no se tocaron**, por la regla de que un registro que se corrige después deja de ser un registro». Y `Vocabulario-Rules.md` §9.5, cuya primera clase de daño documentada es exactamente ésta: la sustitución alcanzando un literal —«el nombre de un campo de contrato»— donde la palabra no designa lo que el renombre cambia.

**Por qué es P1 y no P0.** El P0 de `Master-Prompt.md` §10 sobre evidencia que no resuelve gobierna las citas en el formato de `Deriva-Rules.md` §1, y el P0 «una ruta de archivo citada no existe» es propio de las Fases I y J. Sobre todo: **esta cita no es el puntero de archivado de esta migración**. El puntero que hace reversible la migración del intake —`_legacy/2026-07-30/SOLUTION-INTAKE-SelfHosted-Service-v2.4.md`— está en el mismo documento y **resuelve correctamente**. La reversibilidad no se rompe. Es incumplimiento del criterio 14 de §6 en una ocurrencia, que `Master-Prompt.md` §10 sitúa en P1.

**Por qué es P1 y no P2.** Es la excepción a un criterio de aceptación explícito, en el documento raíz de la cadena D6, y produce una afirmación falsa sobre el estado del sistema.

**Recomendación.** Restituir `SOLUTION-INTAKE-SelfHosted-Service-Core-v1.2.md` en la línea 70, y correr un barrido de nombres de archivo archivado sobre el intake para verificar que es la única. Este informe verificó que lo es entre las citas con formato de ruta.

---

### P2 · Medio

**P2-01 · El manifiesto y el plan se contradicen sobre cuántas filas quedaron resueltas.**
`SDD/Intake/PRODUCT-MANIFEST-SelfHosted-Service.md`:71 declara «Filas del plan de migración resueltas | **144 de 144**», y `SDD/Docs/Audit/Plan-Migracion-4.1-a-6.0.md`:424 y :428 declaran «`SDD/Docs/03-UX-UI-DX/` | 25 | **Sin resolver.** Corte 4, pendiente» y «Total resuelto | **119 de 144**». El plan se escribió por última vez a las 07:56, el audit del corte 4 a las 09:23 y el manifiesto v2.1 a las 12:34: el corte 4 se ejecutó y el registro no se actualizó. **La medición de este informe da la razón al manifiesto en el hecho**, pero el artefacto que el manifiesto cita para sostenerlo dice lo contrario. Ya se había levantado como P3 en los cortes 1, 2 y 4; sube a P2 porque ahora sostiene una procedencia cerrada. *Recomendación:* actualizar §8 del plan al estado final de §8.2 de este informe.

**P2-02 · El plan §7.2 y el manifiesto declaran doce observaciones de audit abiertas sin enumerarlas por documento.**
`PRODUCT-MANIFEST`:82 dice «Quedan doce observaciones de audit de nivel P2 y P3». Los informes de M4 dejan abiertos 4 P2 + 2 P3 del corte 3 y 3 P2 + 3 P3 del corte 4, que son doce, pero ninguno de los dos artefactos dice cuáles ni sobre qué documento caen. `Migracion-Rules.md` §4.6 regla 2 pide el estado documento por documento. *Recomendación:* la tabla de §8.3 de este informe lo cubre; referenciarla desde el manifiesto.

**P2-03 · Dos sub-sustituciones en `03-UX-UI-DX/README.md`.**
Líneas 143 y 160 conservan «todo **proyecto** con interfaz web» y «prohíbe definir tokens **por proyecto**», idénticas a las de `Experiencia-De-Uso.md`:140 y :751, que sí se promovieron sobre el mismo referente. Levantado por `M4-03-UX-UI-DX-r1` H-04 y todavía abierto. Es defecto menor por el criterio del plan §3.5 Paso 3. *Recomendación:* promover las dos.

**P2-04 · Trece conteos de la columna «Artefactos de 03» de `Glosario-UX.md` no reproducen, pese a que §1.1 declara que «cada conteo se verificó en disco».**
El peor caso: `Región de estado` declara **16** artefactos y el barrido devuelve **6** —`Wireframes-Alta-De-Servicio`, `-Catalogo-De-Plantillas`, `-Imagenes`, `-Registro-Del-Contenedor`, `-Revision-De-Higiene`, `-Variables-Compartidas-Del-Proyecto`—. Otros: `Omisión declarada` declara 1 y son 0; `Acción diferenciada` 6 y son 4; `Par de color` 5 y son 3; `Estado de deriva` 3 y son 2. Además §5.2 compara contra «las 178 filas del funcional», que es el conteo bruto de líneas de tabla de todo el archivo y no sus 82 términos. La evidencia **resuelve** —el corpus existe y el barrido es reproducible—, falla el número derivado: por eso P2 y no P0, con el mismo criterio con que los cortes 2, 3 y 4 graduaron sus hallazgos análogos. *Recomendación:* recontar la columna o cambiarla por el listado de artefactos.

**P2-05 · Duplicación parcial de `Nodo borrador` entre los glosarios de 02 y de 03.**
`Glosario-Funcional.md`:126 define `Borrador` con el alias «nodo borrador»: «existe, es visible en el lienzo y está incompleto de forma visible. **No entra al conjunto de cambios pendientes** y no es aplicable». `Glosario-UX.md`:134 lo **redefine** repitiendo esas mismas cláusulas antes de agregar su precisión de superficie, y a la vez lo **referencia** en §5.2:211. `Rules-UX-UI-DX` 4.0 §3.3 pide referenciar y declarar la diferencia, no redefinir. *Recomendación:* dejar en §3 solo la precisión de superficie, con el puntero.

**P2-06 · Tres términos de `Glosario-UX.md` aparecen en un solo artefacto de 03, o en ninguno.**
`Vista de un solo uso`:107 y `Banner de cambios pendientes`:101 declaran «1» en su propia columna y conservan la fila; `Omisión declarada`:165 declara 1 y el barrido devuelve 0. §9.1 descarta 33 candidatos por exactamente este criterio: es una aplicación asimétrica de su propia regla. *Recomendación:* mover las dos definiciones a su artefacto y retirar la tercera.

**P2-07 · El manifiesto afirma el valor de un flag que el intake no declara.**
`PRODUCT-MANIFEST`:84: «la categoría 04 queda excluida por gating: el proyecto de código no declara uso de LLM en su bloque §17 (**`usa_llm` == false**)». El barrido sobre el intake devuelve **cero** ocurrencias de `usa_llm`, de `LLM` y de `Prompts-AI`. Dos líneas antes el mismo párrafo trata el flag hermano de forma honesta: «el flag `requiere_maqueta` **no tiene valor declarado en ninguna fuente**». Un flag ausente se declara `false` como hecho y el otro se declara ausente: el criterio no es uniforme, y la forma correcta es la segunda. La conclusión —excluir la 04— no cambia. *Recomendación:* reescribir como «el intake no declara `usa_llm`; en ausencia de declaración la categoría 04 no se genera».

**P2-08 · Aritmética de `Plan-Migracion-4.1-a-6.0.md` §8.1.**
La última fila dice «Las **98** filas restantes de 02, las **6** de 00 y las 8 NB de 01 | documento de origen, sin excepción». 02 tiene 101 filas y la propia tabla nomina 28 —glosario, índice, README, `CU-01` a `CU-13` y `CU-27` a `CU-38`—, con lo que quedan **73**, que es además el número que el propio plan usa en §3.5 Paso 2.b. Y 00 tiene 6 filas de las cuales **2** están corregidas dos filas más arriba en la misma tabla: quedan **4**. *Recomendación:* corregir a 73 y a 4.

**P2-09 · Dos conteos de `Glosario-Funcional.md` no reproducen.**
§3.7 declara «Los **98 artefactos hermanos**, en su sección de control de cambios» para la etiqueta de cabecera; el barrido de la frase devuelve **66** archivos. §3.2 proyecta «**128**… y **151** contando este glosario» para «resolución»; el conteo real sobre los mismos cien archivos es **129** y **152**. El delta interno de 23 sí es correcto. *Recomendación:* recontar.

**P2-10 · Una localización de `Glosario-Funcional.md` §5.1 no resuelve.**
La fila «Brecha declarada de cobertura» afirma que «sus dos únicas ocurrencias, en `RN-02` y `RN-08`, están **dentro de filas históricas de control de cambios**». La expresión no existe en el corpus —cero resultados—; lo que existe es «Brecha declarada» en `RN-02`:51 y `RN-08`:67, y **está en el cuerpo**, no en control de cambios, que en esos archivos empieza en las líneas 61 y 75. *Recomendación:* corregir la fila o retirarla.

**P2-11 · El cierre del campo bloqueante `Product Owner` no tiene registro fuera del propio documento migrado.**
`PRODUCT-INTAKE`:11 pasó de «**Derivado, pendiente de confirmación**» —así en el archivado v2.4:11— a «**Confirmado el 2026-07-30**», y :23 lo atribuye a «la entrada `[R-1]` de la batería de la fase M2». `Intake-Rules.md` §6 emite la batería como bloque de interacción y no como artefacto, de modo que su ausencia en disco es esperable; y la fila §4 del plan declara para el intake la fuente «documento de origen + **pendiente humano** para las secciones sin fuente», que es uno de los tres valores admitidos y cubre el caso. Pero la resolución concreta de `[R-1]` no quedó registrada en el plan, que es donde el criterio 1 de §6 pide que la declaración viva. **No es invención**: el campo ya existía y cambió de estado por respuesta humana declarada. *Recomendación:* agregar la resolución de la batería de M2 a §7.1 del plan, junto a las decisiones D-M1 a D-M4.

### P3 · Bajo

**P3-01 · El plan §7.2 omite `Bitacora-Validacion-Maqueta.md`.** Enumera dos de los tres artefactos que `Rules-UX-UI-DX` 4.0 §2.1 vuelve obligatorios para `requiere_maqueta == true`. `03-UX-UI-DX/README.md`:233 sí declara los tres. Sin efecto sobre el destino: el README es el artefacto que la regla designa para el inventario.

**P3-02 · Referencia adelantada al informe de M6.** `PRODUCT-MANIFEST`:82 invoca «el informe de M6» a las 12:34 del 2026-07-30, cuando ese informe no existía. **Se resuelve con este documento**, que ocupa la ruta que el manifiesto supone.

**P3-03 · La cabecera del intake agrega una fila que la plantilla dice no completar.** `PRODUCT-INTAKE-template` 2.1:66 declara «`Slug-Producto` no se completa: el orquestador lo deriva». El intake la agrega, anotada como derivada, de modo que el sentido se preserva. Desviación de forma.

**P3-04 · Cinco hallazgos heredados de los cortes 3 y 4 siguen abiertos.** El recuento de 139 historias de usuario de `02/Especificacion-Funcional.md` que no verifica contra su propia matriz; `02/README.md` sin listar las 19 reglas conceptuales con propósito y estado, como pide `Rules-Especificacion-Funcional` 4.0 §3.4; «los dieciséis wireframes» de `Experiencia-De-Uso.md` §9.1 con dieciocho en disco, heredado del origen y correctamente no propagado; `Wireframes-Panel-Lateral-Del-Servicio.md` §8 omitiendo `CU-38`, que §9.2 declara; y `Wireframes-Alta-De-Servicio.md` §5 sin nombrar dos de los cuatro estados mínimos. Los cinco están correctamente documentados en sus informes de ronda.

**P3-05 · `Pendiente de aplicar` tiene dos referentes en 03 y no se declaran.** El estado visual del lienzo y el valor `pendiente-de-aplicar` del estado de configuración. Ni §5.2 ni §8 de `Glosario-UX.md` lo enumeran como polisemia. Los contextos son mayormente disjuntos, por lo que no sube de P3.

**P3-06 · Deuda preexistente conservada, correctamente.** `PRODUCT-INTAKE`:354 sigue diciendo «Proyecto de código | Cada una de las **cuatro** unidades de la composición de §13», contradicho por §13 desde la versión 2.2, que declara uno solo. Es idéntico en el archivado v2.4: la migración lo conservó, que es lo que §4.1 y §4.2 mandan. Queda como deuda del destino, no de la migración.

---

## 12. Veredicto y condiciones

### Veredicto

# APROBADO CON OBSERVACIONES

**Cero hallazgos P0.** Los seis P0 propios de una migración normativa se verificaron uno por uno contra los archivos, con medición propia y sin apoyarse en ninguna declaración de los orquestadores ni de los cinco informes de M4, y **ninguno se cumple**. La migración **no se detiene**: `Migracion-Rules.md` §6 y `Master-Prompt-Migracion.md` §10 reservan la detención bloqueante para el P0, y no lo hay.

**La migración se declara COMPLETA**, y en consecuencia el cierre de procedencia que M5 escribió en `PRODUCT-MANIFEST` §1.1 —el conjunto 6.0 con sus veintiuna versiones— es una afirmación verdadera sobre el estado del destino.

### Lo que esta migración hizo bien, y conviene que quede registrado

El punto crítico de la corrida era la doble dirección del renombre de «proyecto» sobre un destino donde la palabra tiene tres referentes, uno de ellos una entidad del dominio con casos de uso, reglas conceptuales y wireframes propios. **Se resolvió con cero sobre-sustituciones sobre ~1 600 ocurrencias**, con las nueve promociones justificadas contra el texto de la regla que citan —dos de ellas verificadas palabra por palabra contra `Rules-UX-UI-DX` §1.4— y con las 331 ocurrencias de «resolución» intactas en las cuatro categorías. Cero «reproducto» reales, cero concordancias de género rotas, cero cabeceras de tabla pisadas: las cuatro clases de daño que el framework documentó sobre sí mismo en la `[5.1]` no se reprodujeron. Y **ninguna de las filas históricas de control de cambios de los 144 documentos fue alterada**, que es la garantía de que el registro sigue siendo un registro.

Los cinco defectos que el orquestador declara haber cometido y corregido se verificaron cerrados y **sin residuo**: los 144 archivados llevan su sufijo `-v<X.Y>.md`; los 144 están en el `_legacy/` de su propia carpeta y no en un espejo bajo la raíz de la categoría; las 57 citas a `_legacy/` resuelven salvo una de otra clase, con el P0 de la ronda 1 del corte 3 efectivamente cerrado; los 126 documentos de nivel proyecto de código llevan los dos campos de cabecera en el orden que §4.1 declara, incluido el que la ronda 2 dejaba abierto; y la premisa que se propagó entre lotes sin verificar no sostiene ningún documento.

### Condiciones para dar la migración por cerrada

Ninguna es bloqueante para el veredicto. Las tres primeras cierran los P1 y se recomienda aplicarlas antes de reinvocar el orquestador de generación, porque las tres viven en artefactos que ese orquestador va a leer:

1. **P1-01** — Agregar a `Glosario-UX.md` las seis entradas o referencias faltantes. No toca ninguno de los otros 24 artefactos de la categoría.
2. **P1-02** — Actualizar las 25 filas de 03 en §4 del plan con la fuente de contenido que cada documento ya declara, y llevar §8.1 al estado real.
3. **P1-03** — Restituir el nombre archivado `SOLUTION-INTAKE-SelfHosted-Service-Core-v1.2.md` en `PRODUCT-INTAKE`:70.
4. **P2-01 y P2-08** — Cerrar §8 del plan con el estado final de §8.2 de este informe y corregir la aritmética de §8.1. Sin esto, el contrato entre orquestadores queda declarando 119 filas resueltas sobre un árbol con 144.
5. **P2-02 a P2-11 y P3-01 a P3-06** — Se documentan y se siguen. Ninguno afecta el contenido migrado ni la reversibilidad.

### Qué queda fuera de este veredicto, y a quién le toca

Tres puntos que el plan §7.2 dejó declarados y que esta auditoría no resuelve porque no son de su alcance: la **coherencia de la Fase B2 sobre el árbol migrado**, con la obligación correlativa que la decisión D-M2 fijó para después de M6; la emisión de `Linea-Base-Visual.md`, `Contrato-Datos-Maqueta.md` y `Bitacora-Validacion-Maqueta.md` por la Fase B2 bajo la 6.0; y la generación de las categorías 04 a 11, que nunca existieron bajo la 4.1 y que se generarán directamente bajo la vigente.

---

## Control de cambios

| Versión | Fecha | Cambios | Autor |
| --- | --- | --- | --- |
| 1.0 | 2026-07-30 | Auditoría independiente de la **fase M6** de la migración normativa del conjunto 4.1 al 6.0 sobre SelfHosted Service, invocada desde cero, sobre los **144** entregables de `SDD/Intake/` y `SDD/Docs/` contra `Migracion-Rules` 1.0 §6, `Master-Prompt-Migracion` §10, `Master-Prompt` §10, `Vocabulario-Rules` 2.1 §9 y §10, `Rules-Contexto` 3.1, `Rules-Necesidades-Negocio` 3.1, `Rules-Especificacion-Funcional` 4.0, `Rules-UX-UI-DX` 4.0 y las entradas `[5.0]`, `[5.1]` y `[6.0]` del `CHANGELOG.md` del framework. Línea de base: los 144 archivados de `_legacy/2026-07-30/` de cada carpeta. Ninguna afirmación de los orquestadores ni de los cinco informes de M4 se tomó como cierta. Método declarado: **veintiuna verificaciones de cobertura total por script** sobre los 144 y sus 144 archivados, más **muestreo dirigido por riesgo** con los dos glosarios y los dos documentos de entrada al 100 %, las nueve promociones al 100 % y once documentos de prosa sobre 139. **Cero P0**: los seis hallazgos P0 propios de una migración se verificaron uno por uno y ninguno se cumple; el `Glosario-Funcional.md` nuevo de 82 términos y el `Glosario-UX.md` de 39 a 63 no contienen invención. Tres P1 —completitud del glosario de 03 en seis términos, la columna de fuente de contenido del plan sin declarar para el corte 4 por cuarta vez consecutiva, y el renombre aplicado sobre el nombre de un archivo archivado dejando una cita que no resuelve—, once P2 y seis P3. Se verifica la doble dirección del renombre de «proyecto» con **cero sobre-sustituciones** y dos sub-sustituciones, se corrige la premisa del despacho de que las promociones eran siete y todas en 03 —son nueve, siete en 03 y dos en 02—, y se enumeran **catorce polisemias evaluadas y descartadas** por contextos disjuntos, entre ellas las ocho «reproducto» entrecomilladas, para que una ronda posterior no las levante. Se declara la migración **COMPLETA**, con las 144 filas del plan resueltas y verificadas por seis medidas independientes, y en consecuencia legítimo el cierre de procedencia del conjunto 6.0 en `PRODUCT-MANIFEST` §1.1. **Veredicto: APROBADO CON OBSERVACIONES.** | Auditor independiente (Arquitecto de Soluciones + QA Senior) |
