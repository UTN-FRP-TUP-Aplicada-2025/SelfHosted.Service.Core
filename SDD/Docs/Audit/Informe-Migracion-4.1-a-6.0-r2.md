# Informe de migración normativa · 4.1 → 6.0 · ronda 2

**Archivo:** `Informe-Migracion-4.1-a-6.0-r2.md`
**Proyecto de código:** SelfHosted-Service
**Producto:** SelfHosted Service
**Fase:** M6 del orquestador de migración normativa (`Master-Prompt-Migracion.md` §10), **ronda 2**
**Alcance:** `SDD/Intake/` (2) y `SDD/Docs/` (142) del repositorio destino `DEV/SelfHosted.Service.Core`
**Auditor:** independiente, invocado desde cero. Arquitecto de Soluciones + QA Senior. No participó de M1 a M5 ni de la ronda 1 de M6
**Normativa aplicada:** `Migracion-Rules.md` 1.0 §6, `Master-Prompt-Migracion.md` 1.1 §10, `Master-Prompt.md` 5.2 §5 y §10, `Vocabulario-Rules.md` 2.1 §9 y §10, `Rules-Contexto` 3.1, `Rules-Necesidades-Negocio` 3.1, `Rules-Especificacion-Funcional` 4.0, `Rules-UX-UI-DX` 4.0, `Intake-Rules` 3.2 y las entradas `[5.0]`, `[5.1]` y `[6.0]` del `CHANGELOG.md` del framework
**`tipo_proyecto_codigo`:** `web-monolith`. Categorías 00 y 01 de nivel producto; 02 y 03 de nivel proyecto de código
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
- [6. Los catorce criterios de §6 de `Migracion-Rules.md`](#6-los-catorce-criterios-de-6-de-migracion-rulesmd)
- [7. Los seis hallazgos P0 de una migración](#7-los-seis-hallazgos-p0-de-una-migración)
- [8. Estado final de cada fila del plan, las 144](#8-estado-final-de-cada-fila-del-plan-las-144)
- [9. Contenido que quedó sin destino](#9-contenido-que-quedó-sin-destino)
- [10. Declaración de migración completa o parcial](#10-declaración-de-migración-completa-o-parcial)
- [11. Estado de los veinte hallazgos de la ronda 1](#11-estado-de-los-veinte-hallazgos-de-la-ronda-1)
- [12. Hallazgos de esta ronda](#12-hallazgos-de-esta-ronda)
- [13. Veredicto y condiciones](#13-veredicto-y-condiciones)
- [14. Sobre el nombre del informe de la ronda 1](#14-sobre-el-nombre-del-informe-de-la-ronda-1)
- [15. Control de cambios](#15-control-de-cambios)

---

## 1. Cabecera, alcance y muestreo

### 1.1 Por qué hay una ronda 2

La ronda 1 —`Informe-Migracion-4.1-a-6.0.md`— dio APROBADO CON OBSERVACIONES con 0 P0, 3 P1, 11 P2 y 6 P3, y declaró la migración completa. `Master-Prompt.md` §10 declara que un P1 **bloquea avance hasta corrección**. El orquestador aplicó las tres correcciones **después** de ese informe —los tres únicos archivos del árbol con fecha de modificación posterior a las 12:57 del 2026-07-30 son `Plan-Migracion-4.1-a-6.0.md` (13:01), `PRODUCT-INTAKE-SelfHosted-Service.md` (13:01) y `Glosario-UX.md` (13:12)—, de modo que la ronda 1 describe un estado que ya cambió y nadie verificó las correcciones salvo quien las hizo.

**El informe de la ronda 1 no se modificó.** Este es un acto independiente y se escribe aparte.

### 1.2 Alcance auditado

| Conjunto | Cantidad | Detalle |
| --- | --- | --- |
| `SDD/Intake/` | **2** | `PRODUCT-INTAKE-SelfHosted-Service.md` v3.0 (`Aprobado`), `PRODUCT-MANIFEST-SelfHosted-Service.md` v2.1 (`Vigente`) |
| `SDD/Docs/00-Contexto/` | **6** | nivel producto |
| `SDD/Docs/01-Necesidades-Negocio/` | **10** | nivel producto |
| `SDD/Docs/02-Especificacion-Funcional/` | **101** | nivel proyecto de código: 38 CU, 40 RN, 19 RC, `Modelo-Conceptual.md`, `Especificacion-Funcional.md`, `README.md`, `Glosario-Funcional.md` |
| `SDD/Docs/03-UX-UI-DX/` | **25** | nivel proyecto de código: 18 wireframes, 4 representaciones, `Experiencia-De-Uso.md`, `Glosario-UX.md`, `README.md` |
| **Total** | **144** | Coincide fila por fila con las **144** filas de `Plan-Migracion-4.1-a-6.0.md` §4, contadas por script |

**Línea de base:** los **144** archivados de `_legacy/2026-07-30/` de cada carpeta — 141 en `SDD/Docs/` y 3 en `SDD/Intake/` (`SOLUTION-INTAKE-…-v2.4`, `SOLUTION-MANIFEST-…-v1.9` y `PRODUCT-MANIFEST-…-v2.0`, este último por el doble archivado de M3 y M5).

**Fuera de alcance**, por §5 del plan y `Migracion-Rules.md` §2.2: los seis informes de auditoría previos, `SDD/Maquetas/`, `SDD/Estado/`, los `_legacy/`, `/samples/`, `AGENTS.md` y las categorías 04 a 11.

**Ninguna afirmación de los orquestadores de M1 a M5, del informe de la ronda 1 ni de los cinco informes de M4 se tomó como cierta.** Todo lo mecánico se remidió con script propio contra los archivos; todo lo declarado se trató como hipótesis a verificar.

### 1.3 Cobertura del 100 % por script

Veintitrés verificaciones sobre los 144 vivos y sus 144 archivados:

1. Inventario de vivos por categoría: 6 + 10 + 101 + 25 + 2 = **144**.
2. Correspondencia uno a uno con su archivado, resolviendo los tres renombres de artefacto.
3. Sufijo `-v<X.Y>.md` en los 144 archivados: **144/144**.
4. Archivado en el `_legacy/` de la **propia carpeta** de cada documento: 144/144, cero espejos bajo la raíz de categoría.
5. Extracción de las tablas de control de cambios de los 286 archivos y comparación **literal de la fila completa**: **485 filas históricas** de 143 pares.
6. Presencia de la fila de migración fechada 2026-07-30 en los 142 de `SDD/Docs/`: 142/142.
7. Bump de versión respecto del archivado: **143/143**.
8. Cabecera por nivel de aplicación, admitiendo bloque de metadatos y cabecera en tabla: **142/142**.
9. Barrido de la etiqueta legada `**Proyecto:**` / `| Proyecto |` sobre un valor de plano producto.
10. Barrido de diez patrones de identificador y de nombre de artefacto legados en el cuerpo.
11. Resolución de los **1103** enlaces relativos `.md`.
12. Resolución de las **63** citas a rutas de `_legacy/` y de las **63** citas a nombre de archivo con sufijo de versión.
13. Barrido de `reproduct*` con 100 caracteres de contexto por ocurrencia.
14. Barrido de catorce patrones de concordancia de género rota.
15. Barrido de cabeceras de tabla de anti-patrones con la columna «Solución» pisada.
16. Censo de «resolución» por categoría y en el cuerpo del intake.
17. Censo de «solución» desnuda en cuerpo, excluyendo «solución de código» y «resolución», con lectura de cada ocurrencia.
18. Censo de «proyecto de código» en cuerpo, **vivo contra archivado, documento por documento**, con y sin el campo de cabecera.
19. Conteo a mano, fila por fila y término por término, de `Glosario-UX.md` §2, §3, §4, §5.1, §5.2, §7 y §9.3, desagregando los grupos separados por `·`.
20. Reconteo por ocurrencia de los seis términos de `P1-01` sobre los 23 artefactos hermanos de 03, con y sin filas de control de cambios.
21. Cruce de los **82** términos de `Glosario-Funcional.md` §2 contra los 23 artefactos de 03 y contra `Glosario-UX.md`; y de los **65** términos con fila propia de `Glosario-UX.md` contra esos mismos 23.
22. Campo `Estado` de los 144 y su consecuencia sobre la política de versionado de `Master-Prompt.md` §5.
23. Las **21** versiones del bloque de procedencia de `PRODUCT-MANIFEST` §1.1 contra las cabeceras reales de `IA/IA.SDD` y contra la entrada `[6.0]` del `CHANGELOG.md`.

### 1.4 Muestreo declarado en la evaluación de contenido

Dirigido por riesgo, no aleatorio. Tamaño y criterio:

| Bloque | Tamaño | Criterio |
| --- | --- | --- |
| `03-UX-UI-DX/Glosario-UX.md` | **100 %**: las 65 filas de término, las 40 filas de §5 desagregadas en 65 términos, y los 6 términos del cierre de `P1-01` rastreados a su fuente | Es el artefacto que la corrección de `P1-01` tocó, y el segundo mayor riesgo de invención de la corrida |
| `02-Especificacion-Funcional/Glosario-Funcional.md` | **82 de 82 términos** cruzados contra los 23 artefactos de 03 y contra el glosario raíz; **13 filas** de la columna «Artefactos de 02» reproducidas por barrido; §1.4, §4.1 y §4.2 leídos completos | Artefacto **nuevo** emitido por la migración: el mayor riesgo de invención |
| `PRODUCT-INTAKE-SelfHosted-Service.md` | **diff completo** v2.4 → v3.0 (**138** líneas `+`, **137** `−` sobre 5 480) y las **21 secciones** de `PRODUCT-INTAKE-template` 2.1 | Documento humano y raíz de la cadena D6; es donde se aplicó la corrección de `P1-03` |
| `PRODUCT-MANIFEST-SelfHosted-Service.md` | **§1.1 completo**, 21 versiones contra las cabeceras reales del framework | Es donde vive la afirmación de procedencia que M5 cerró: si miente, es P0 |
| `Plan-Migracion-4.1-a-6.0.md` | **completo**: §2 a §9, con las 146 líneas de tabla de §4 desagregadas en 144 filas de documento más 2 de la tabla de corrección | Es el contrato, y es donde se aplicó la corrección de `P1-02` |
| Promociones y sub-sustituciones de «proyecto» | **100 %**: los 8 documentos con delta de «proyecto de código» en cuerpo, leídos contra su archivado línea por línea | Es el punto crítico de esta migración |
| Prosa del resto | **13 documentos** sobre 137 | Los cuatro índices de categoría, los dos que cambiaron de nombre o de encabezado, `Modelo-Conceptual.md`, `Experiencia-De-Uso.md`, `03/README.md`, `Wireframes-Lienzo-Del-Proyecto.md`, `Wireframes-Panel-Lateral-Del-Servicio.md`, `Wireframes-Alta-De-Servicio.md` y `Representacion-Lenguaje-Visual-De-Estados.md` |

**Limitación declarada.** Los 124 documentos restantes se evaluaron por verificación estructural al 100 % —cabecera, versión, archivado, filas históricas, enlaces, barridos léxicos, encabezados de sección— y no por lectura completa. Una invención local en un párrafo de un CU que conservara encabezados, identificadores y cabecera quedaría fuera de este muestreo. Se declara en lugar de afirmar una cobertura que este informe no tiene.

---

## 2. Resumen ejecutivo

**Las tres correcciones de la ronda 1 se verificaron contra los archivos y las tres son sustantivamente correctas.** `P1-01` queda **cerrado**: los seis términos están declarados, ninguna definición se redactó de cero —las dos acuñadas se transcriben de `Experiencia-De-Uso.md` §5 y §7 y de `Wireframes-Lienzo-Del-Proyecto.md`:203, y las cuatro referenciadas no redefinen nada—, los conteos declarados (§2 24, §3 23, §5.2 28 filas y 53 términos, §9.3 65 y 65) reproducen contados a mano, y los seis conteos por ocurrencia del glosario son más exactos que los del hallazgo que los originó. `P1-03` queda **cerrado**: la cita resuelve y el barrido sobre las 63 citas a `_legacy/` y las 63 citas a archivo con sufijo de versión no encuentra ninguna otra ocurrencia del mismo defecto en el árbol. `P1-02` queda **reclasificado a P2**: la sección §8.2 nueva del plan cubre las 25 filas de 03 y es verdadera contra lo que los documentos declaran de sí mismos, pero la tabla §4 del mismo plan sigue declarando «documento de origen» para esas 25 filas y para otras 116.

**Cero hallazgos P0.** Los seis P0 propios de una migración se verificaron uno por uno con medición propia. La migración se declara **COMPLETA**: las 144 filas del plan tienen documento en disco, con archivado en el `_legacy/` de su propia carpeta, fila de migración fechada, cabecera conforme al nivel de aplicación y versión subida, y las 485 filas históricas de control de cambios están intactas. El cierre de procedencia del conjunto 6.0 en `PRODUCT-MANIFEST` §1.1 es una afirmación verdadera.

**Lo que esta ronda agrega y la ronda 1 no vio.** Dos P1 nuevos. El primero es de forma: las tres correcciones se aplicaron sobre dos artefactos en estado `Aprobado` —el intake y el plan— sin subir versión, sin archivar el estado previo y, en el plan, sin dejar fila de control de cambios; y en el caso del intake, fuera de los dos únicos casos de escritura que `Master-Prompt.md` §13 admite. El segundo es de contenido y es el mismo defecto que `P1-01`, en el otro glosario: **la regla de inclusión de `Rules-Especificacion-Funcional` 4.0 §3.3 queda incumplida en `Glosario-Funcional.md`**, el artefacto que esta migración emitió, en al menos cuatro términos acuñados por 02 que aparecen en más de un artefacto y que no están ni declarados, ni referenciados, ni entre los candidatos descartados de §5.1 —`Evento de auditoría` en **24 de 100** artefactos hermanos, con cero menciones en todo el glosario—. La ronda 1 declaró «en la categoría 02 el criterio cumple» habiendo verificado **solo la dirección inversa**: que los 82 términos declarados aparezcan en dos o más hermanos. La dirección directa, que es la que la regla exige, no se había medido.

A eso se suman cuatro P2 nuevos o ampliados: una cita cruzada de `03-UX-UI-DX/README.md` que M5 dejó apuntando a versiones de regla que el manifiesto ya no declara; los conteos de la columna «Artefactos de 03» del glosario de UX, que no son 13 los que fallan sino **16**; las localizaciones de `Glosario-Funcional.md` §5.1, cuyas tres afirmaciones son falsas y no una; y una diferencia de sentido no declarada entre el glosario raíz y el funcional sobre `Catálogo`, con la afirmación expresa de que no la hay.

| Nivel | Cantidad |
| --- | --- |
| **P0** | **0** |
| **P1** | **2** |
| **P2** | **14** |
| **P3** | **7** |
| **Total** | **23** |

**Veredicto: APROBADO CON OBSERVACIONES.**

---

## 3. Matriz D1-D9

Cobertura del 100 % por script sobre los 144.

| Invariante | Qué se midió | Resultado | Veredicto |
| --- | --- | --- | --- |
| **D1 · Idioma** | Español rioplatense en los 144; barrido de partículas de inglés en prosa | 0 desvíos | **C** 144/144 |
| **D2 · Encoding** | Lectura UTF-8 estricta de los 144 vivos y los 144 archivados | 0 fallos | **C** 288/288 |
| **D3 · `Título-Con-Guiones`** | Nombre de archivo de los 144 | 0 desvíos. La carpeta `reglas-conceptuales-de-modelo/` es minúscula, pero **la escribe así la propia regla**: `Rules-Especificacion-Funcional` 4.0 §2.1 y §6 declaran la ruta `Modelo-Datos/reglas-conceptuales-de-modelo/RC-XX-<Nombre>.md`. Es residuo del framework y no del destino; se declara como evaluado y descartado | **C** |
| **D4 · Sufijo de versión** | Nombre vivo de los 144 y nombre de los 144 archivados | 0 vivos con sufijo; **144/144** archivados con `-v<X.Y>.md`, guion medio | **C** |
| **D5 · Política de deprecación** | Estado previo archivado en el `_legacy/` de la propia carpeta antes de sobrescribir; bump de versión | 143/143 archivados y bumpeados; `Glosario-Funcional.md` es artefacto nuevo. **Excepción**: las dos correcciones posteriores al informe de la ronda 1, sobre artefactos en estado `Aprobado`, no archivaron ni subieron versión — hallazgo **P1-r2-01** | **NC parcial** |
| **D6 · Trazabilidad** | Cabecera con upstream y downstream en 00 y 01; sección de trazabilidad en 02 y 03 según §4.2 de sus reglas; resolución de los 1103 enlaces relativos | 16/16 en 00 y 01; 101/101 en 02; 20/25 en 03 —las 4 representaciones y `Glosario-UX.md` no llevan sección de trazabilidad, y `Rules-UX-UI-DX` 4.0 §4.2.2 **no la exige** para `representacion-<concepto>.md`; el glosario declara su trazabilidad en cabecera—. **0 enlaces rotos sobre 1103** | **C** |
| **D7 · Prohibición de vocabulario fuente** | Barrido de `Nombre-Solucion`, `NombreSolucionCodigo`, `Nombre-Proyecto` sin `-Codigo`, `nombre-proyecto-codigo`, `project_type`, `SOLUTION-INTAKE`, `SOLUTION-MANIFEST`, `Alcance-Proyecto`, `Docs/Solucion`, `Arquitectura-Solucion`, sobre el **cuerpo** de los 144 | **0** de los cinco identificadores. Cuatro ocurrencias de nombre de artefacto legado, **las cuatro legítimas**: `00/README.md`:34 y :48 y `PRODUCT-INTAKE`:3 enuncian el renombre («que en ese momento se llamaba…», «se llamaba `Alcance-Proyecto.md` hasta la migración normativa»), y `PRODUCT-INTAKE`:70 nombra un **archivo archivado** cuyo nombre no cambia | **C** |
| **D8 · Conjunto cerrado** | `tipo_proyecto_codigo` = `web-monolith` en el manifiesto §2 y en el índice maestro de 02 | Coherente. Caso degenerado de un proyecto de código único, con la salida aplanada de `Master-Prompt.md` §3.5 | **C** |
| **D9 · Evidencia verificable** | 1103 enlaces, 63 citas a `_legacy/`, 63 citas a archivo con sufijo, y los conteos declarados «verificados en disco» | **0 enlaces rotos**, **63/63 citas a `_legacy/` resuelven** —`P1-03` cerrado—, **63/63 citas a archivo con sufijo resuelven**. Lo que no reproduce son números derivados: 16 conteos de `Glosario-UX.md`, 2 de `Glosario-Funcional.md` y 3 localizaciones — hallazgos **P2-r2-05**, **P2-r2-10** y **P2-r2-11**. La evidencia resuelve; falla el número | **NC parcial** |

---

## 4. Matriz de estructura obligatoria

### 4.1 Cabeceras

| Categoría | Nivel | Lo que exige §4.1 de su regla | Medido | Veredicto |
| --- | --- | --- | --- | --- |
| `00-Contexto` (6) | Producto | `**Producto:**` y **ningún** campo de proyecto de código (R3) | 6/6 | **C** |
| `01-Necesidades-Negocio` (10) | Producto | `\| Producto \|` en cabecera de tabla | 10/10 | **C** |
| `02-Especificacion-Funcional` (101) | Proyecto de código | `Proyecto de código: SelfHosted-Service` **más** `Producto: SelfHosted Service`, en ese orden | **101/101**, incluido `Especificacion-Funcional.md`, que usa cabecera en tabla y declara los dos campos en el orden correcto | **C** |
| `03-UX-UI-DX` (25) | Proyecto de código | Ídem, más `**Variante:**` | **25/25** en los dos campos y en `Variante` | **C** |
| `SDD/Intake/` (2) | — | `PRODUCT-INTAKE-template` 2.1 y `PRODUCT-MANIFEST-template` 4.1 | 2/2 | **C** |

**Cero ocurrencias** de la etiqueta legada `**Proyecto:**` sobre un valor de plano producto. El hallazgo P2 que el plan §3.5 Paso 2.b dejaba abierto —`Especificacion-Funcional.md` sin el campo— **está cerrado**: el documento declara `| Proyecto de código | SelfHosted-Service |` seguido de `| Producto | SelfHosted Service |`.

### 4.2 Versiones y estados

| Categoría | Distribución de versión | Estado |
| --- | --- | --- |
| 00-Contexto | 6 × `2.0` | 6 × `Propuesto` |
| 01-Necesidades-Negocio | 10 × `2.0` | 10 × `Propuesto` |
| 02-Especificacion-Funcional | 99 × `2.0`, 1 × `3.0` (`CU-03`, que venía de 2.0), 1 × `1.0` (`Glosario-Funcional.md`) | 101 × `Propuesto` |
| 03-UX-UI-DX | 25 × `2.0` | 25 × `Propuesto` |
| `SDD/Intake/` | intake `2.4 → 3.0` (major), manifiesto `1.9 → 2.0 → 2.1` (minor en M5) | intake `Aprobado`, manifiesto `Vigente` |

**Consecuencia normativa, y es la que produce el P1 de esta ronda.** `Master-Prompt.md` §5 admite absorber una corrección dentro de la versión en curso **mientras el documento esté en `Borrador` o `Propuesto`**, y obliga a subir versión y archivar desde que pasa a `Aprobado` o `Vigente`. Los 142 documentos de `SDD/Docs/` están en `Propuesto`, de modo que el cierre de `P1-01` absorbido dentro de la versión 2.0 de `Glosario-UX.md` es **legítimo**. El intake está en `Aprobado` y el plan declara «Aprobado por el agente humano del proyecto el 2026-07-30»: las correcciones sobre esos dos no lo son.

### 4.3 Secciones obligatorias

Verificadas contra §4.2 de la regla de cada categoría, al 100 % por conteo de encabezados y por lectura en los 13 documentos del muestreo:

- **`Experiencia-De-Uso.md`**: 11 secciones, las 11 que exige `Rules-UX-UI-DX` 4.0 §4.2. **C**.
- **Los 18 wireframes**: 9 secciones cada uno, las 9 de §4.2.1. **C**.
- **Las 4 representaciones**: 7 secciones cada una, las 7 de §4.2.2. **C**.
- **`Glosario-Funcional.md`**: las 5 secciones obligatorias de `Rules-Especificacion-Funcional` 4.0 §4.2.4 —cabecera con trazabilidad upstream al glosario del dominio de 00, tabla de términos, términos con más de un referente (§3, siete familias), términos referenciados y no redefinidos (§4.1, 18 filas), control de cambios—, más §1 y §5. **C**.
- **`PRODUCT-INTAKE`**: las **21 secciones** de la plantilla 2.1 presentes, con `§19` en su posición histórica declarada y `§21` renombrado a «Anexo B — Cobertura de campos y trazabilidad de los ejemplos», que es el título de la plantilla vigente. El diff muestra que **solo el título cambió**: el cuerpo del anexo es idéntico. **C**.

### 4.4 Artefactos obligatorios de la normativa vigente

| Artefacto | Estado | Veredicto |
| --- | --- | --- |
| `02/Glosario-Funcional.md` (`Rules-Especificacion-Funcional` 4.0 §2.1) | Emitido, v1.0, **82** términos | **C** |
| `03/Glosario-UX.md` (`Rules-UX-UI-DX` 4.0 §2.1) | Migrado, v2.0, **65** términos con fila propia y **65** referenciados | **C** |
| `03/Linea-Base-Visual.md` | Ausente, declarado en el plan §7.2 y en `03/README.md` §9 | **C** — emitirlo sería invención |
| `03/Contrato-Datos-Maqueta.md` | Ídem | **C** |
| `03/Bitacora-Validacion-Maqueta.md` | Ausente, declarado en `03/README.md` §9 y **omitido del plan §7.2** | **NC menor** — **P3-r2-01** |

---

## 5. Coherencia cross-doc y gobierno del glosario

### 5.1 Coherencia cross-doc

| Verificación | Resultado |
| --- | --- |
| Enlaces relativos `.md` entre los 144 | **1103**, **0 rotos** |
| Citas a rutas de `_legacy/` | **63**, **63 resuelven** |
| Citas a nombre de archivo con sufijo `-v<X.Y>.md` | **63**, **63 resuelven** |
| Filas históricas de control de cambios alteradas | **0 sobre 485**, comparadas literalmente contra el archivado |
| Identificadores legados vivos en cuerpo | **0** de los cinco de la `[5.0]` |
| Renombre `Alcance-Proyecto.md` → `Alcance-Producto.md` propagado | Todas las referencias cruzadas resuelven |
| Contradicciones entre artefactos vivos | **3**: el plan §8 declara «119 de 144» y el manifiesto y §8.2 del propio plan declaran las 144 cerradas (**P2-r2-01**); el plan §4 declara «documento de origen» para 141 filas y §8.1 y §8.2 lo desmienten (**P2-r2-02**); `03/README.md`:222 atribuye al `PRODUCT-MANIFEST` §1.1 «`Maqueta-Rules` 2.0 y `Deriva-Rules` 2.0» y el manifiesto declara **3.1 y 3.1** desde el cierre de M5 (**P2-r2-03**) |

### 5.2 Gobierno del glosario en cadena, con sus cuatro criterios

La cadena tiene tres glosarios: el raíz del dominio en `00-Contexto/Vision-Producto.md` §9 (**34** términos), el funcional en `02/Glosario-Funcional.md` (**82** definidos, **18** referenciados en §4.1 y **2** equivalencias de forma en §4.2), y el de superficie en `03/Glosario-UX.md` (**65** definidos, **65** referenciados en §5).

**Criterio 1 · Sin contradicciones — CUMPLE con una excepción.** Cruce por script de los 34 términos del raíz contra los 82 definidos en 02: **cero intersecciones**. Los 18 referenciados de §4.1 de 02 existen los **18** en el glosario raíz. Los dos puntos de riesgo semántico están resueltos y declarados: `Modo pendiente`, que el intake §12 define nombrando su color y el raíz transcribe sin él, lleva en `Glosario-UX.md` §5.3 la declaración de que la diferencia es «de nivel de declaración, no de referente», con su `C-UX-01`; y `Huérfano`, con su segundo referente en 02 §3.5 y su precisión de superficie en 03 §5.3.

**La excepción es `Catálogo`.** `Vision-Producto.md` §9:268 lo define como «la **cuarta** vía de alta de un servicio», y el cuerpo de 02 declara **siete** —`CU-03`:59 «las **siete vías de alta**», `CU-16`, y la propia entrada `Vía de alta` de `Glosario-Funcional.md`:119 «Son **siete**»—. `Glosario-Funcional.md`:356 declara `Catálogo` como referenciado y no redefinido y **no declara la diferencia**, que es lo que `Rules-Especificacion-Funcional` 4.0 §3.3 exige cuando el sentido difiere; y :363 afirma «**Ninguna entrada de este glosario contradice a `Vision-Producto.md` §9**», que es falso. El «cuarta» es **preexistente** —está idéntico en `_legacy/2026-07-30/Vision-Producto-v1.0.md`:263 y la migración lo conservó correctamente—, pero la omisión de la declaración y la afirmación expresa de que no hay contradicción viven en un artefacto que **esta migración emitió**. Hallazgo **P2-r2-14**.

**Criterio 2 · Completitud — CUMPLE en 03 con `P1-01` cerrado; NO CUMPLE en 02.**

- **Dirección directa, 02 → 03.** Cruce por script de los **82** términos de `Glosario-Funcional.md` §2 contra los 23 artefactos hermanos de 03, sin `_legacy/` y sin filas de control de cambios: **cero** términos aparecen en más de un artefacto de 03 sin estar nombrados en `Glosario-UX.md`. El hueco que la ronda 1 midió en seis términos **está cerrado**.
- **Verificación de los seis términos de `P1-01`**, reconteados por ocurrencia sobre los 23 artefactos:

| Término | Declara el glosario | Mido | Dónde entró |
| --- | --- | --- | --- |
| `Origen` | 22 de 23 | **22**, ausente solo de `Representacion-Lenguaje-Visual-De-Estados` | §5.2, **agrupado en la fila existente** de `Vía de alta`, que comparte puntero y consecuencia |
| `Performance percibida` | 19 | **19** | §3, entrada propia |
| `Reflujo` | 17 (8 sustantivo + 12 verbal, 3 con las dos) | **8**, **12**, unión **17**, ambas **3** | §2, entrada propia |
| `Imagen` | 12 | **12** | §5.2, fila propia referenciada |
| `Montaje` | 8 | **8** | §5.2, fila propia referenciada |
| `Línea de tiempo del despliegue` | 6 | **6** | §5.2, fila propia referenciada |

  Los seis conteos reproducen **exactos**. Las cuatro precisiones que el glosario declara sobre el hallazgo de la ronda 1 —que el informe contó 24 artefactos porque se incluyó a sí mismo, y que `reflujo` es 17 y no 10 sumando la forma verbal— **se verifican ciertas**: el hallazgo de la ronda 1 era correcto en el defecto y equivocado en cuatro de los seis números.

- **Ninguna definición se redactó de cero.** Las cuatro referenciadas no redefinen: cada fila de §5.2 declara únicamente la consecuencia sobre la interfaz y apunta a `Glosario-Funcional.md` §2.2. Las dos acuñadas salen de los hermanos, verificado línea por línea: `Reflujo` transcribe `Experiencia-De-Uso.md`:497 —«aplica a todas las superficies **salvo el lienzo**, que se acoge a la excepción explícita del criterio para el contenido que requiere disposición bidimensional»— y `Wireframes-Lienzo-Del-Proyecto.md`:203 —«la excepción alcanza al lienzo y **no al resto de la superficie**: el banner, el panel contextual y la navegación reflúyen sin desplazamiento horizontal»—; `Performance percibida` transcribe `Experiencia-De-Uso.md` §7, que a su vez declara «los umbrales de la puerta técnica `PT-01` son evidencia declarada por las fuentes y esta categoría no los modifica», y el bloque homónimo existe en los **18** wireframes.
- **Conteos declarados, contados a mano.** §2 declara «veinticuatro términos» y tiene **24** filas; §3 declara «veintitrés» y tiene **23**; §4 tiene **14** y §7 **4**; §5.1 tiene **12** filas y 12 términos; §5.2 declara «veintiocho filas que cubren cincuenta y tres términos» y tiene **28** filas que, desagregando los grupos separados por `·`, dan **53** términos. §9.3 declara «sesenta y cinco términos de §2 a §4 y de §7 —24 + 23 + 14 + 4—» y «sesenta y cinco términos referenciados de §5 —12 … y 53…—»: **los dos dan 65**. Ninguna cifra «63» ni «61» sobrevive fuera de la fila de control de cambios.
- **En 02 el criterio NO cumple, y la ronda 1 lo declaró cumplido midiendo solo una dirección.** El informe de la ronda 1 escribió «en la categoría 02 el criterio cumple: los 82 términos aparecen en dos o más de los 98 hermanos, verificado uno por uno». Eso verifica la **dirección inversa** —que lo declarado esté usado—, y lo confirmo: barrido propio sobre los 100 hermanos, ninguno de los 82 aparece en menos de dos artefactos. La regla de `Rules-Especificacion-Funcional` 4.0 §3.3 es la **directa**: «entra al glosario todo término del dominio que aparece en más de un artefacto de 02». Medida esa dirección, hay al menos cuatro términos acuñados por 02 que la regla exige y que **no están en ninguna parte del glosario** —ni con fila propia, ni referenciados en §4, ni descartados en §5.1, que solo enumera dos candidatos, ni declarados pendientes en §5.2, que dice «ninguno»—:

| Término | Artefactos de 02 (sobre 100, cuerpo, sin `_legacy/`) | Menciones en todo `Glosario-Funcional.md` |
| --- | --- | --- |
| **`Evento de auditoría`** | **24** | **0.** El glosario declara `Registro de auditoría` (§2.9), que es la bitácora, no el evento que 22 tablas de actores emiten |
| **`Variable de servicio`** | **12** | **0.** El glosario declara `Variable provista por el sistema` y referencia `Variable compartida del proyecto`; la tercera clase, que tiene subsección propia en `Modelo-Conceptual.md`, falta |
| **`Nombre visible`** | **4** | **0.** Distinto de `Identificador legible` (§2.1), y es una de las cinco condiciones de higiene de `RN-37` |
| **`Comando de arranque`** | **4** | **0.** Atributo del servicio en el modelo conceptual |

  Cuatro términos más aparecen **dentro de la definición de otra entrada** pero sin fila propia ni constancia de descarte: `Modo de red` (14 artefactos), `Red del proyecto` (9), `Dirección fija` (7) y `Configuración observada` (6, que además es el título de `CU-08`). Y de las **cinco variantes de origen** que §2.2 enumera, solo `Archivo de construcción en línea` tiene fila propia; `imagen de registro público`, `imagen de registro privado`, `repositorio remoto` y `sin origen` aparecen en más de un artefacto y no la tienen. Hallazgo **P1-r2-02**.

- **Lo que sí cumple en 02**: las 32 entradas del punto 6 heredado de `Modelo-Conceptual.md` tienen destino verificado —**14** en §2 y **18** en §4.1, 14 + 18 = 32—, y una muestra de 13 filas de la columna «Artefactos de 02» reproduce por barrido.

**Criterio 3 · Polisemia gobernada — CUMPLE con dos excepciones menores.** Las siete familias de `Glosario-Funcional.md` §3 y la familia «resolución» de `Glosario-UX.md` §8 declaran sus referentes con la verificación de colisión que `Vocabulario-Rules.md` §9.4 exige. Dos excepciones:

- **Regla de no duplicación.** Cruce por script de los 65 términos definidos en 03 contra los 82 definidos y sus alias en 02: **una única intersección**, `Nodo borrador`, que `Glosario-UX.md`:135 **define** repitiendo las dos cláusulas sustantivas que `Glosario-Funcional.md`:126 da a `Borrador` —«existe, es visible en el lienzo, está incompleto de forma visible y **no entra al conjunto de cambios pendientes**»— y a la vez **referencia** en §5.2:213. `Rules-UX-UI-DX` 4.0 §3.3 pide referenciar y declarar la diferencia, no redefinir. Hallazgo **P2-r2-06**.
- **`Pendiente de aplicar`** designa en 03 tanto la variante visual del par de estado (`Glosario-UX.md`:133) como el valor `pendiente-de-aplicar` del `Estado de configuración` de 02 (`Glosario-Funcional.md`:125), y ni §5.2 ni §8 lo enumeran como dos referentes. Los contextos son mayormente disjuntos. Hallazgo **P3-r2-04**.

**Criterio 4 · Criterio negativo — polisemias evaluadas y descartadas.** Se enumeran, con mi propia evaluación, para que una ronda posterior no las vuelva a levantar. En las trece los contextos son disjuntos o la familia ya está declarada, y **ninguna es hallazgo**:

| # | Caso | Por qué no es hallazgo |
| --- | --- | --- |
| 1 | **«proyecto», tres referentes** | Declarados con evidencia en `PRODUCT-INTAKE` §12 —con su tabla de sentido, contexto y forma de escritura— y transcriptos en `Vision-Producto.md` §9. El intake decide **no calificar el tercero** por contextos disjuntos. Es el caso que `Vocabulario-Rules.md` §9.6 prevé |
| 2 | **«resolución»** | **269** ocurrencias en las cuatro categorías (10 · 13 · 131 · 115) y **77** en el cuerpo del intake. No es «solución» con prefijo: es otra palabra. Contarla como daño sería el falso positivo que `[5.1]` documenta |
| 3 | **«reproducto»** | **9** ocurrencias, **las nueve entrecomilladas**, leídas una por una con su contexto: citan el daño que se evitaba, en filas de control de cambios, en el plan y en los dos glosarios. **Cero reales** |
| 4 | **«solución» desnuda** | **5** ocurrencias en cuerpo, leídas una por una: tres nombran el identificador viejo al declarar el renombre (`Registro de la solución` → `Registro del producto`, `Administrador de la solución` → `Administrador del producto`) y dos son «cualquier solución» en el sentido de remedio, que R2 de `Vocabulario-Rules.md` conserva explícitamente. Cero indebidas. Las 8 de «solución de código» designan el `.sln` |
| 5 | **«registro», cinco referentes** | Familia calificada declarada en `Glosario-Funcional.md` §3.1, con la forma desnuda admitida solo para el registro del sistema |
| 6 | **«migración»** | Resuelto por `Vocabulario-Rules.md` §9.6. El árbol usa «migración normativa» calificada |
| 7 | **«imagen»** | Declarada en `Glosario-Funcional.md` §2.2 y referenciada en `Glosario-UX.md` §5.2 desde el cierre de `P1-01`, con las dos lecturas de superficie declaradas |
| 8 | **«huérfano», «ámbito», «higiene», «procedencia», «etiqueta»** | Las cinco familias declaradas en `Glosario-Funcional.md` §3.3 a §3.7 |
| 9 | **«esqueleto», «asimetría», «pertenencia», «zona»** | Las cuatro declaradas en `Glosario-UX.md` §9.2 con su barrido |
| 10 | **«plantilla»** | Ítem del catálogo del producto contra plantilla del framework: contextos disjuntos, uno es entidad del dominio y el otro artefacto de `IA.SDD` |
| 11 | **«módulo»** | Preservado deliberadamente por la `[5.0]` con su sentido de área funcional |
| 12 | **`reglas-conceptuales-de-modelo/` en minúsculas** | **No es defecto del destino**: `Rules-Especificacion-Funcional` 4.0 §2.1 y §6 escriben la ruta así. Es residuo del framework y corregirlo en el destino lo apartaría de su propia regla |
| 13 | **`Producto:` conviviendo con `Proyecto de código:` en 02 y 03** | No es duplicación de plano: §4.1 de la regla exige el primero y `Migracion-Rules.md` §4.2 prohíbe perder el segundo, que es el valor que el origen traía. Los dos difieren por el guion y no son intercambiables |

---

## 6. Los catorce criterios de §6 de `Migracion-Rules.md`

| # | Criterio | Veredicto | Evidencia |
| --- | --- | --- | --- |
| 1 | Fuente de contenido declarada en el plan, con uno de los tres valores de §2.1 | **CUMPLE con observación** | Las 144 filas están cubiertas: §4 declara la columna en las 144, la tabla de corrección de §4 la precisa para 2 de 00, §8.1 para 28 de 00, 01 y 02, y la **§8.2 nueva** para **las 25 de 03**, agrupadas en cuatro filas que suman 1 + 1 + 1 + 22 = **25**. §8.2 es **verdadera** contra lo que los documentos declaran: `Glosario-UX.md`, `03/README.md` y `Experiencia-De-Uso.md` dicen por escrito «no es "documento de origen" a secas», y los 22 wireframes y representaciones declaran en su fila de cabecera que el valor `Nombre-Proyecto-Codigo` se leyó del `PRODUCT-MANIFEST` §2. **Observación**: §4 conserva «documento de origen» para 141 filas, contradicho por §8.1 y §8.2 del mismo documento — **P2-r2-02**. Observación menor: §8.1 y §8.2 usan «+ intake», que no es literalmente uno de los tres valores, aunque el intake es documento del mismo destino |
| 2 | Ninguna sección con contenido ajeno al origen, a un hermano o a una respuesta humana | **CUMPLE** | Diff completo del intake: **138** líneas `+` y **137** `−` sobre 5 480, y la única adición no léxica es el título de §21, que la plantilla 2.1 ordena. Los 6 términos del cierre de `P1-01` rastreados a `Experiencia-De-Uso.md` §5 y §7 y a `Wireframes-Lienzo-Del-Proyecto.md`:203. Los 18 referenciados de `Glosario-Funcional.md` §4.1 existen los 18 en el glosario raíz; 13 filas de su columna de artefactos reproducidas por barrido; las 32 entradas del punto 6 heredado con destino 14 + 18 |
| 3 | Ninguna sección exigida y sin fuente quedó rellenada | **CUMPLE** | 21 secciones de `PRODUCT-INTAKE-template` 2.1 presentes con contenido de origen; 11 + 9×18 + 7×4 secciones en 03; las 5 de §4.2.4 en `Glosario-Funcional.md`. `Linea-Base-Visual.md`, `Contrato-Datos-Maqueta.md` y `Bitacora-Validacion-Maqueta.md`, obligatorios por `Rules-UX-UI-DX` 4.0 §2.1, quedaron **sin emitir y declarados**. `Glosario-UX.md` §9.3 declara «ninguno» pendiente y el cruce de los 82 términos de 02 lo confirma. El incumplimiento de la regla de inclusión en 02 (**P1-r2-02**) **no cae acá**: es omisión de filas, no relleno de una sección exigida, y §5.2 del glosario declara «ninguno» pendiente porque no vio los términos, no porque los haya inventado |
| 4 | Estado previo archivado en el `_legacy/` de su propia carpeta | **CUMPLE** | **141** en `SDD/Docs/` + **3** en `SDD/Intake/`, todos con sufijo `-v<X.Y>.md`, todos en la carpeta del propio artefacto y ninguno en un espejo bajo la raíz de categoría. `Glosario-Funcional.md` no tiene, por ser artefacto nuevo. **Observación**: las dos correcciones de esta ronda sobre artefactos `Aprobado` no archivaron — **P1-r2-01**; no afecta la reversibilidad de la migración, porque v2.4 y v1.9 siguen archivados |
| 5 | Contenido sin destino enumerado en el informe con su texto localizable | **NO CUMPLÍA; se subsana en §9 de este informe** | Hay **siete bloques** del intake que `PRODUCT-INTAKE-template` 2.1 no ubica. Están **preservados íntegros** por resolución `[R-2]` de la batería de M2 y declarados en la fila 3.0 del intake, de modo que no hay pérdida. Lo que faltaba era su enumeración en el informe: la ronda 1 §9 declaró «no quedó contenido sin destino» y solo trató el punto 6 de `Modelo-Conceptual.md`. Se enumeran en §9 — **P3-r2-07** |
| 6 | Ninguna corrección manual pisada sin declarar la interpretación | **CUMPLE** | **485 filas históricas** de control de cambios de 143 pares comparadas **literalmente, fila completa**: **0 alteradas**. Alcanza a los documentos que la Fase B2 había corregido a mano —`CU-03` v2.0, `CU-06`, `CU-08`, `CU-13`, `CU-15`, `CU-16`, `CU-17` v1.1, `RN-08`, `RN-15` v1.1 y seis wireframes v1.1—. **Verificado además el punto que esta ronda tenía que mirar**: las tres correcciones se escribieron **dentro de filas de la versión en curso** —3.0 del intake, 2.0 de `Glosario-UX.md`, §8.2 del plan— y **ninguna tocó una fila de una versión anterior** |
| 7 | Cada documento del plan lleva su clasificación de §4.3 | **CUMPLE** | 144/144. 141 «Regenerar contenido», 1 «Regenerar contenido (fase M2, como propuesta)», 1 «Re-derivación (fase M3)», 1 «Regenerar contenido · emisión inicial». Ninguna «no tocar», coherente con que los veintiún saltos sean major |
| 8 | Intake verificado contra la plantilla vigente y bump major | **CUMPLE** | Las 21 secciones de la plantilla 2.1 verificadas presentes. Bump `2.4 → 3.0`, **major**, con la razón normativa de `Migracion-Rules.md` §4.4 regla 3 en la fila |
| 9 | Intake antes que manifiesto, manifiesto antes que los documentos generados | **CUMPLE** | El intake declara la migración M2; el manifiesto v2.0 declara «la procedencia no se cerró: es trabajo de M5» y conserva las versiones de origen; los 142 de `SDD/Docs/` llevan fila de M4; M5 cerró la procedencia en v2.1. El orden está registrado en las cuatro filas |
| 10 | Degradación declarada si no había procedencia | **NO APLICA, declarado** | El destino declaraba procedencia del conjunto 4.1 en `SOLUTION-MANIFEST` §1.1 y el conjunto de origen es reconstruible en `IA/IA.SDD/_legacy/4.1/`. El plan §6 lo declara con su razón y explicita que el resultado coincide en apariencia con una degradación pero no lo es |
| 11 | Procedencia reescrita **solo** con la cadena completa | **CUMPLE** | La cadena está completa: 144/144 con documento en disco, archivado, fila fechada, cabecera conforme y versión subida. Las **21 versiones** de `PRODUCT-MANIFEST` §1.1 se contrastaron una por una contra las cabeceras reales de `IA/IA.SDD` y **coinciden las 21**: conjunto 6.0, `Master-Prompt` 5.2, `Root-Rules` 3.1, `Rules-Contexto` 3.1, `Rules-Necesidades-Negocio` 3.1, `Rules-Especificacion-Funcional` 4.0, `Rules-UX-UI-DX` 4.0, `Rules-Arquitectura-Tecnica` 3.1, `Rules-Backlog-Tecnico` 3.1, `Rules-Plan-Sprint` 3.1, `Rules-Calidad-Y-Pruebas` 3.1, `Rules-Devops` 3.1, `Rules-Examples` 4.1, `Rules-Documentacion` 4.1, `Intake-Rules` 3.2, `Vocabulario-Rules` 2.1, `Migracion-Rules` 1.0, `Maqueta-Rules` 3.1, `Deriva-Rules` 3.1, `PRODUCT-INTAKE-template` 2.1 y `PRODUCT-MANIFEST-template` 4.1 |
| 12 | Ninguna fila del plan sin resolver y sin declararse pendiente | **CUMPLE** | 144 de 144 resueltas, medidas por seis criterios independientes en §8. Ninguna queda pendiente. **Observación**: el registro §8 del **plan** sigue declarando «119 de 144» — **P2-r2-01**; un registro desactualizado no deja una fila sin resolver |
| 13 | Ningún renombre de artefacto resuelto por inferencia | **CUMPLE** | Los tres renombres de archivo y los cinco de identificador del plan §3.1 y §3.2 coinciden **literalmente** con el bloque «Cambiado» de la entrada `[5.0]` del `CHANGELOG.md`, leído íntegro. El plan §3.4 declara además los cinco que no alcanzan al destino, con su razón, y §3 cita la entrada de la que salen |
| 14 | Ninguna sustitución por reemplazo global de cadena | **CUMPLE** | Cero «reproducto» reales sobre 9 ocurrencias entrecomilladas; **cero** concordancias de género rotas sobre catorce patrones; **cero** cabeceras de tabla de anti-patrones pisadas; «resolución» sobrevive en las cuatro categorías (10 · 13 · 131 · 115) y en el intake (77); «solución» desnuda queda en 5 ocurrencias, las 5 legítimas. **Cero sobre-sustituciones** sobre el censo completo de «proyecto de código» en cuerpo. Dos sub-sustituciones — **P2-r2-04**. **La excepción de la ronda 1 está cerrada**: `PRODUCT-INTAKE`:70 restituye `SOLUTION-INTAKE-SelfHosted-Service-Core-v1.2.md` y las 63 citas a `_legacy/` y las 63 a archivo con sufijo resuelven todas |

**Resultado: 12 cumplen, 1 no aplica y está declarado, 1 no cumplía y se subsana en este informe** (criterio 5, que era defecto del informe de la ronda 1 y no del destino).

---

## 7. Los seis hallazgos P0 de una migración

Verificados uno por uno contra los archivos, con medición propia. **Ninguno se cumple.**

| # | Hallazgo P0 | Veredicto | Evidencia |
| --- | --- | --- | --- |
| 1 | **Invención** | **LIMPIO** | Los dos glosarios son el mayor riesgo y los dos se rastrearon. `Glosario-Funcional.md`: sus 82 términos no intersecan con los 34 del glosario raíz (cruce por script, 0 coincidencias), sus 18 referenciados existen los 18 aguas arriba, las 32 entradas del punto 6 heredado reparten 14 + 18, y 13 filas de su columna de artefactos reproducen por barrido. `Glosario-UX.md`: los 6 términos que el cierre de `P1-01` agregó se rastrearon a hermano —`Experiencia-De-Uso.md` §5 y §7, `Wireframes-Lienzo-Del-Proyecto.md`:203— o a `Glosario-Funcional.md`, y las 4 filas referenciadas **no redefinen**: declaran solo la consecuencia sobre la interfaz. El intake no agrega ningún bloque de prosa nuevo en 5 480 líneas |
| 2 | **Sección exigida rellenada con contenido inferido** | **LIMPIO** | Ninguna de las 21 secciones de la plantilla vigente se rellenó. Los tres artefactos que `Rules-UX-UI-DX` 4.0 vuelve obligatorios y que no tienen fuente quedaron **sin emitir**, declarados en `03/README.md` §9 con su destinatario. `Glosario-UX.md` §9.3 declara «ninguno» pendiente, y el cruce completo de los 82 términos de 02 contra los 23 artefactos de 03 no encuentra ningún término exigido y ausente |
| 3 | **Procedencia reescrita con migración parcial** | **LIMPIO** | La cadena está completa. Seis medidas independientes sobre las 144 filas, todas al 100 %: documento en disco (144), archivado con sufijo en la propia carpeta (143 + 1 n/a), fila de migración fechada 2026-07-30 (142/142 en `SDD/Docs/` más las 2 del intake), cabecera conforme al nivel (142/142), versión subida (143/143) y filas históricas intactas (485/485). Las 21 versiones que la procedencia declara coinciden con las cabeceras reales del framework |
| 4 | **Corrección manual pisada** | **LIMPIO** | **0 de 485** filas históricas alteradas, comparación literal de fila completa contra el archivado. Las tres correcciones de esta ronda se escribieron **dentro de la fila de la versión en curso** y no tocaron ninguna fila anterior, verificado documento por documento |
| 5 | **Estado previo no archivado** | **LIMPIO para la migración** | 144 archivados para 143 documentos con origen, todos con sufijo y todos en el `_legacy/` de su propia carpeta. El defecto de consolidación que el orquestador declara haber cometido está cerrado sin residuo: `02-Especificacion-Funcional/_legacy/2026-07-30/` contiene exactamente los 2 documentos que viven en esa carpeta. **Las dos correcciones posteriores al informe de la ronda 1 no archivaron**, pero no son la sobrescritura de migración: el estado migrado sigue siendo reconstruible desde v2.4 y v1.9, de modo que la propiedad que este P0 protege —la reversibilidad— **no se rompe**. Se levanta como **P1-r2-01** y no como P0 |
| 6 | **Fila del plan sin resolver y sin declararse** | **LIMPIO** | Las 144 filas de §4 del plan tienen destino existente en disco y estado final enumerado en §8 de este informe. Ninguna queda pendiente |

### 7.1 El punto crítico: la doble dirección del renombre de «proyecto»

Censo propio por documento, comparando el cuerpo del vivo contra el cuerpo del archivado, con y sin el campo de cabecera.

| Medida | Archivado | Vivo | Delta |
| --- | --- | --- | --- |
| «proyecto de código» en cuerpo, con campo de cabecera | 136 | 275 | +139 |
| «proyecto de código» en cuerpo, **sin** campo de cabecera | **27** | **44** | **+17** |

El delta de 139 se descompone en **122** campos de cabecera nuevos en las categorías de nivel proyecto de código y **17** ocurrencias de prosa. Las 17 se leyeron **una por una** contra su línea del archivado.

**Sobre-sustitución: CERO.** Ninguna de las 17 cae sobre la entidad del dominio `Proyecto` —el agrupador de servicios del lienzo, con sus CU-01, CU-02, RC-01 y sus wireframes— ni sobre el emprendimiento. Las promociones reales y su referente:

| Documento y ocurrencia | En el archivado | En el vivo | Referente | Veredicto |
| --- | --- | --- | --- | --- |
| `03/Experiencia-De-Uso.md`:140 | «Piso obligatorio de todo **proyecto** con interfaz web» | «…todo **proyecto de código**…» | Unidad D8 a la que `Design-Rules-Web-Generico.md` se aplica | **Correcta** |
| `03/Experiencia-De-Uso.md`:715 | «declararlo por **proyecto**» | «…por **proyecto de código**» | Unidad D8 que tiene prohibido definir el token | **Correcta** |
| `03/Experiencia-De-Uso.md`:722 | «en todo **proyecto** que cargue la extensión» | «…todo **proyecto de código**…» | Cita de `Rules-UX-UI-DX` §1.4 | **Correcta, verificada contra el texto de la regla** |
| `03/Experiencia-De-Uso.md`:725 | «condiciona la ranura a que el **proyecto** tenga superficies» | «…el **proyecto de código**…» | Paráfrasis de `Audit/B-02-03-r1.md` §7.2; la cita literal entre comillas no se tocó | **Correcta** |
| `03/Experiencia-De-Uso.md`:751 | «prohíbe definirlo por **proyecto**» | «…por **proyecto de código**» | Ídem | **Correcta** |
| `03/Representaciones/Representacion-Lenguaje-Visual-De-Estados.md`:117 | «prohíbe definir el token por **proyecto**» | «…por **proyecto de código**» | `Rules-UX-UI-DX` §1.4, texto literal | **Correcta, verificada contra el texto de la regla** |
| `03/Wireframes/Wireframes-Cajon-De-Cambios-Pendientes.md`:142 | «en todo **proyecto** que cargue la extensión» | «…todo **proyecto de código**…» | Ídem | **Correcta** |
| `02/Especificacion-Funcional.md`:45 | «sin subnivel de **proyectos**» | «sin subnivel de **proyectos de código**» | El subnivel `Proyectos/<Nombre-Proyecto-Codigo>/` que `Master-Prompt.md` §3.5 aplana | **Correcta** |
| `02/Especificacion-Funcional.md`:71 | «AG-05 Arquitecto, en **proyectos** con DDD» | «…en **proyectos de código** con DDD…» | Unidad D8 sobre la que se decide el despacho de AG-05 | **Correcta** |

Las **nueve promociones que la ronda 1 declaró se ratifican**, con el reparto que corrigió —siete en 03 y dos en 02—. Las ocho ocurrencias restantes del delta de prosa **no son promoción**: son texto metalingüístico nuevo de `00/README.md`:96 y :98, `01/README.md`:132 y :134, `02/Especificacion-Funcional.md`:296, :298 y :300 y `Glosario-UX.md`:264 y :365, que **declaran la familia «proyecto» y sus tres referentes**. Hablan del término; no designan con él. Se verificó que su contenido reproduce la tabla de `PRODUCT-INTAKE` §12 y no la reinterpreta.

**Ninguna promoción no declarada.** El censo por documento no encontró ninguna ocurrencia de prosa fuera de las diecisiete enumeradas.

**Sub-sustitución: dos ocurrencias.** `03/README.md`:143 conserva «Base obligatoria de todo **proyecto** con interfaz web» y :160 conserva «prohíbe definir tokens **por proyecto**» —las mismas dos frases que sí se promovieron en `Experiencia-De-Uso.md`:140 y :751, sobre el mismo referente—. Es defecto menor y visible, como el plan §3.5 Paso 3 anticipa. Hallazgo **P2-r2-04**.

**Barrido negativo sobre siete formas de riesgo** (`todo proyecto con interfaz`, `por proyecto`, `tipo de proyecto`, `proyecto principal`, `proyectos del producto`, `jerarquía de proyectos`, `proyecto de Visual Studio`): las demás ocurrencias designan la entidad del dominio —«por proyecto» en el tablero de estado, en la exportación y en la serialización de despliegues— o el emprendimiento, y son correctas a secas.

---

## 8. Estado final de cada fila del plan, las 144

Sección propia exigida por `Master-Prompt-Migracion.md` §10.

### 8.1 Método

Cada una de las **144** filas de `Plan-Migracion-4.1-a-6.0.md` §4 —contadas por script: 2 de `SDD/Intake/`, 6 de 00, 10 de 01, 101 de 02 y 25 de 03— se evaluó contra seis medidas independientes, las seis al 100 %:

| Medida | Qué verifica |
| --- | --- |
| **M1** | El documento destino existe en disco con el nombre vigente |
| **M2** | Su estado previo está archivado en el `_legacy/2026-07-30/` de su **propia** carpeta, con sufijo `-v<X.Y>.md` |
| **M3** | Lleva fila de control de cambios fechada 2026-07-30 que declara la migración normativa y su fase |
| **M4** | Su cabecera cumple §4.1 de la regla de su categoría, con el campo y el orden que su nivel de aplicación exige |
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

Los tres renombres de artefacto resuelven contra su archivado legado: `SOLUTION-INTAKE-…-v2.4.md`, `SOLUTION-MANIFEST-…-v1.9.md` y `Alcance-Proyecto-v1.0.md`.

### 8.3 Las filas que llevan una salvedad

Ninguna queda sin resolver. Diez documentos llevan una observación que este informe abre como hallazgo:

| Fila | Salvedad | Hallazgo |
| --- | --- | --- |
| Las 25 de `SDD/Docs/03-UX-UI-DX/` | §4 del plan sigue declarando «documento de origen»; §8.2 lo corrige y es verdadera | **P2-r2-02** |
| `03/Glosario-UX.md` | 16 conteos de la columna «Artefactos de 03» que no reproducen; `Nodo borrador` duplicado; tres términos que sobran; `Pendiente de aplicar` sin declarar sus dos referentes | **P2-r2-05**, **P2-r2-06**, **P2-r2-07**, **P3-r2-04** |
| `03/README.md` | Dos sub-sustituciones; una cita al manifiesto que ya no reproduce | **P2-r2-04**, **P2-r2-03** |
| `02/Glosario-Funcional.md` | Regla de inclusión incumplida en al menos cuatro términos; tres conteos y una localización de §5.1 que no reproducen; diferencia de sentido de `Catálogo` no declarada | **P1-r2-02**, **P2-r2-10**, **P2-r2-11**, **P2-r2-14** |
| `SDD/Intake/PRODUCT-INTAKE-…` | Corregida fuera del flujo de escritura de `Master-Prompt.md` §13, sin bump ni archivado; `[R-1]` y `[R-2]` sin registro en el plan; fila de cabecera que la plantilla dice no completar; deuda preexistente conservada | **P1-r2-01**, **P2-r2-12**, **P3-r2-02**, **P3-r2-05** |
| `SDD/Intake/PRODUCT-MANIFEST-…` | Contradice al plan en el conteo de filas; afirma `usa_llm == false` sobre un flag ausente; declara doce observaciones sin enumerarlas | **P2-r2-01**, **P2-r2-08**, **P2-r2-13** |
| `02/Especificacion-Funcional.md` | Recuento de 139 historias de usuario que la propia matriz expande a 142 | **P3-r2-03** |
| `02/README.md` | Sigue sin listar las 19 reglas conceptuales con propósito y estado | **P3-r2-03** |
| `03/Experiencia-De-Uso.md`, `Wireframes-Panel-Lateral-Del-Servicio.md`, `Wireframes-Alta-De-Servicio.md` | Tres desfases heredados del origen, correctamente no propagados | **P3-r2-03** |

---

## 9. Contenido que quedó sin destino

Sección propia exigida por `Master-Prompt-Migracion.md` §10 y por el criterio 5 de §6. **Este informe corrige acá al de la ronda 1**, que declaró «no quedó contenido sin destino» y solo trató el punto 6 de `Modelo-Conceptual.md`.

### 9.1 Contenido del intake que la plantilla vigente no ubica — siete bloques, preservados

`PRODUCT-INTAKE-template.md` 2.1 declara la Parte A (§1 a §12), la Parte B (§13 a §16), la Parte C (§17 y §18), la Parte D (§20, §21 y §19) y una cabecera con tabla de contenido. El intake migrado conserva **siete bloques** que esa estructura no ubica. **Ninguno se descartó**: la resolución `[R-2]` de la batería de M2 los preservó íntegros, y la fila 3.0 del intake lo declara. Se enumeran acá con su texto localizable, que es lo que el criterio 5 pide:

| # | Bloque | Ubicación | Primeras palabras, para localizarlo |
| --- | --- | --- | --- |
| 1 | `## Identidad del producto` | `PRODUCT-INTAKE`:28 | «**Incorporada en la versión 2.1, 2026-07-29.** Hasta la versión 2.0 este documento tenía un solo campo de nombre…» |
| 2 | `## Migración al Framework SDD 4.0` | :60 | «Esta versión 2.0 no incorpora ninguna decisión de producto nueva. Es la **migración del intake al conjunto normativo 4.0**…» |
| 3 | `## Procedencia de este intake y convención de marcadores` | :179 | Registro de las cuatro fuentes del intake y de los marcadores `[S]`, `[D-i]`, `[E]` y `[FA]` |
| 4 | `## Decisiones del agente humano incorporadas en la versión 1.2` | :202 | Índice de las siete decisiones D-1 a D-7 con su fecha y su origen |
| 5 | `## Decisiones incorporadas en la versión 2.4: la redefinición del alta de servicio` | :381 | Las dos decisiones cerradas D-14 y D-15 con su fecha |
| 6 | `## Supuestos registrados por este intake y su estado` | :405 | Tabla de supuestos S-XX con su estado de cierre |
| 7 | `# Parte E — Continuidad de la Fase A generada bajo el conjunto normativo anterior`, con `§22`, `§23` y `§24` | :4517 a :5046 | «Consolidado de 00-Contexto», «Consolidado de 01-Necesidades-Negocio», «Estado de decisiones, pendientes y especificaciones derivadas al cierre de la Fase A» |

**Decisión del humano, registrada.** El intake declara que los siete «se preservan íntegros por resolución `[R-2]` de la misma batería». Es exactamente lo que `Migracion-Rules.md` §4.2 regla 2 pide —el contenido no se descarta y el humano decide—, y el diff v2.4 → v3.0 confirma que ninguno perdió una línea. El defecto era de **enumeración en el informe**, y queda subsanado.

### 9.2 Contenido de `SDD/Docs/` que la normativa vigente desubica — un bloque, con destino verificado

| Documento | Encabezado del origen | Dónde está su contenido | Norma que lo ordena |
| --- | --- | --- | --- |
| `02/Modelo-Datos/Modelo-Conceptual.md` | `## 6. Glosario`, **32** entradas, íntegro en `_legacy/2026-07-30/Modelo-Conceptual-v1.1.md` §6 | `## 6. Referencia al glosario`, que remite a `Glosario-Funcional.md`. Las **32** entradas tienen destino: **14** en §2 y **18** en §4.1, verificado por conteo | `Rules-Especificacion-Funcional` 4.0 §2.1 y §3.3 |

### 9.3 Encabezados renombrados, con el contenido en su lugar

| Documento | Encabezado del origen | Encabezado vigente | Norma |
| --- | --- | --- | --- |
| `00/Alcance-Producto.md` | `## §3. Objetivos del proyecto` | `## §3. Objetivos del producto` | `Rules-Contexto` 3.1 §4.2 |
| `00/Alcance-Producto.md` | `## §8. Criterios de aceptación del proyecto` | `## §8. Criterios de aceptación del producto`, con los diez `CA-XX` | Ídem |
| `PRODUCT-INTAKE` | `## §21 Anexo B — Cobertura de los ejemplos sobre el modelo y las reglas` | `## §21 Anexo B — Cobertura de campos y trazabilidad de los ejemplos`; el cuerpo del anexo **no cambió**, verificado por diff | `PRODUCT-INTAKE-template` 2.1 |
| `02/README.md` | `## 6. Qué consume cada categoría downstream` | Reordenado dentro del índice, contenido presente | `Rules-Especificacion-Funcional` 4.0 §3.4 |
| `03/Glosario-UX.md` | `## §5. Términos del dominio que esta categoría reusa sin redefinir` | `## §5. Términos que esta categoría reusa sin redefinir`; sus 13 filas están: 12 en §5.1 y `Arranque parcial` reubicado en §5.2 con su puntero corregido | `Rules-UX-UI-DX` 4.0 §3.3 |
| `03/README.md` | `### 7.3 Las diecisiete restantes, por destinatario` | `### 7.3 Las veintidós restantes, por destinatario` | Recuento del propio documento |

**Salvedad de método.** Esta verificación cubre bloques de primer y segundo nivel, identificadores y el diff completo del intake. Una frase suelta del origen que la normativa vigente no ubicase y que se hubiera descartado sin mover ningún encabezado ni ningún identificador quedaría fuera de su alcance en los 124 documentos que no se leyeron completos.

---

## 10. Declaración de migración completa o parcial

Sección propia exigida por `Master-Prompt-Migracion.md` §10.

> **La migración normativa del conjunto 4.1 al 6.0 sobre SelfHosted Service es COMPLETA.**

**Fundamento, medido y no leído.** `Migracion-Rules.md` §4.6 impone dos condiciones bloqueantes a la migración parcial —no reescribir la procedencia y declarar el estado documento por documento—, y ninguna de las dos se activa porque la cadena está completa:

- Las **144 filas** del plan tienen documento destino en disco con su nombre vigente.
- **143 de 143** tienen su estado previo archivado en el `_legacy/2026-07-30/` de su propia carpeta, con sufijo `-v<X.Y>.md`; el 144º es artefacto nuevo.
- **144 de 144** llevan fila de control de cambios fechada 2026-07-30 que declara la migración normativa y su fase.
- **144 de 144** cumplen la cabecera que §4.1 de la regla de su categoría exige para su nivel de aplicación.
- **143 de 143** subieron de versión respecto de su archivado.
- **0 de 485** filas históricas de control de cambios fueron alteradas.
- **0** identificadores y **0** nombres de artefacto legados vivos en cuerpo fuera de un enunciado explícito del renombre o del nombre de un archivo archivado.
- Las **21 versiones** de `PRODUCT-MANIFEST` §1.1 coinciden con las cabeceras reales de `IA/IA.SDD` y con la entrada `[6.0] - 2026-07-29` del `CHANGELOG.md`.

**En consecuencia el cierre de procedencia de M5 es legítimo.** El bloque §1.1 del manifiesto declara el conjunto 6.0 sobre un árbol efectivamente migrado, y no es la afirmación falsa que §4.6 regla 1 tipifica como P0.

**Lo que la migración no cubrió, y por qué no la hace parcial.** Las categorías 04 a 11 no están generadas: no hay documento que migrar, se generarán bajo la 6.0 y la 04 está excluida por gating. `SDD/Maquetas/`, `SDD/Estado/`, los `_legacy/`, `/samples/`, `AGENTS.md` y los seis informes de auditoría están fuera de alcance por `Migracion-Rules.md` §2.2 y por §5 del plan, cada uno con su razón declarada. Los tres artefactos de la Fase B2 que `Rules-UX-UI-DX` 4.0 vuelve obligatorios quedan sin emitir y declarados: emitirlos sería la invención que §4.1 prohíbe.

**Discrepancia de registro, no de estado.** El plan §8 sigue declarando «Total resuelto 119 de 144» y la categoría 03 «Sin resolver», mientras §8.2 del mismo plan titula esas 25 filas «cerradas» y el manifiesto declara 144 de 144. El disco da la razón al manifiesto. Es **P2-r2-01**, y no cambia la declaración de completitud: una fila resuelta cuyo registro no se actualizó sigue siendo una fila resuelta.

---

## 11. Estado de los veinte hallazgos de la ronda 1

Hallazgo por hallazgo, con evidencia propia.

### 11.1 Los tres P1

| Hallazgo | Estado | Evidencia |
| --- | --- | --- |
| **`P1-01`** · Regla de inclusión de `Glosario-UX.md` incumplida en seis términos | **CERRADO** | Los seis están declarados: `Reflujo` y `Performance percibida` como entradas propias en §2 y §3; `Imagen`, `Montaje` y `Línea de tiempo del despliegue` como filas referenciadas en §5.2; `Origen` agrupado en la fila existente de `Vía de alta`. **Ninguna definición se redactó de cero**: las cuatro referenciadas declaran solo la consecuencia sobre la interfaz y apuntan a `Glosario-Funcional.md` §2.2, y las dos acuñadas transcriben `Experiencia-De-Uso.md` §5 y §7 y `Wireframes-Lienzo-Del-Proyecto.md`:203. **Los conteos declarados reproducen contados a mano**, desagregando los grupos separados por `·`: §2 = 24 filas, §3 = 23, §5.2 = 28 filas y **53** términos, §5.1 = 12 y 12, §4 = 14, §7 = 4, §9.3 = **65** y **65**. **La regla no queda incumplida en otros términos**: el cruce completo de los 82 términos de `Glosario-Funcional.md` §2 contra los 23 artefactos de 03 devuelve **cero** ausencias. En la dirección inversa quedan tres términos que sobran, que ya eran `P2-06` |
| **`P1-02`** · La columna «fuente de contenido» del plan sigue declarando «documento de origen» para las 25 filas de 03 | **RECLASIFICADO a P2** (**P2-r2-02**) | La §8.2 nueva **existe, cubre las 25 filas** —1 + 1 + 1 + 22— y **es verdadera** contra lo que los documentos declaran de sí mismos: los tres índices dicen por escrito «no es "documento de origen" a secas», y los 22 wireframes y representaciones declaran en su cláusula de cabecera que el valor se leyó del `PRODUCT-MANIFEST` §2. Con eso, el criterio 1 de §6 —que la declaración viva **en el plan**— pasa a cumplirse. **Lo que no se hizo** es lo que la ronda 1 recomendaba: actualizar la tabla §4, que sigue declarando «documento de origen» para esas 25 filas y para otras 116, de modo que el plan ahora se contradice consigo mismo. Es defecto de registro sobre una declaración que ya existe y es correcta: **P2, no P1** |
| **`P1-03`** · El renombre alcanzó el nombre de un archivo archivado y la cita no resuelve | **CERRADO** | `PRODUCT-INTAKE`:70 dice hoy `_legacy/2026-07-28/SOLUTION-INTAKE-SelfHosted-Service-Core-v1.2.md`, y el archivo existe. **Barrido propio sobre todo el árbol**: **63** citas a rutas de `_legacy/` y **63** citas a nombre de archivo con sufijo `-v<X.Y>.md`, en los 144 documentos, **las 126 resuelven**. El mismo defecto **no quedó en ninguna otra parte**: los tres renombres de archivo de la `[5.0]` que alcanzan a este destino —`SOLUTION-INTAKE`, `SOLUTION-MANIFEST`, `Alcance-Proyecto.md`— aparecen fuera de filas históricas en cuatro lugares y los cuatro son legítimos (dos enuncian el renombre en `00/README.md`:34 y :48, uno cita la plantilla de origen en `PRODUCT-INTAKE`:3 y el cuarto es esta misma cita restituida). **Salvedad de forma**: la corrección se escribió sobre un documento `Aprobado` sin bump ni archivado — **P1-r2-01** |

### 11.2 Los once P2

| Hallazgo | Estado | Evidencia |
| --- | --- | --- |
| **`P2-01`** · El manifiesto y el plan se contradicen sobre las filas resueltas | **ABIERTO y agravado** → **P2-r2-01** | `PRODUCT-MANIFEST`:71 sigue diciendo «144 de 144» y el plan §8 sigue diciendo «`03-UX-UI-DX` \| 25 \| **Sin resolver**» y «Total resuelto \| **119 de 144**». **Agravante**: el plan se editó a las 13:01 del 2026-07-30 para agregar §8.2 y §8 quedó sin tocar en la misma edición, de modo que ahora el plan se contradice consigo mismo además de contradecir al manifiesto |
| **`P2-02`** · Doce observaciones de audit abiertas sin enumerar por documento | **ABIERTO** → **P2-r2-13** | `PRODUCT-MANIFEST`:82 sigue diciendo «Quedan doce observaciones de audit de nivel P2 y P3» sin enumerarlas ni referenciar dónde están. `Migracion-Rules.md` §4.6 regla 2 pide el estado documento por documento |
| **`P2-03`** · Dos sub-sustituciones en `03/README.md` | **ABIERTO** → **P2-r2-04** | Verificado en disco: :143 «Base obligatoria de todo **proyecto** con interfaz web» y :160 «prohíbe definir tokens **por proyecto**» |
| **`P2-04`** · Trece conteos de la columna «Artefactos de 03» no reproducen | **ABIERTO y ampliado a dieciséis** → **P2-r2-05** | Reconteo propio de las 65 filas: **16** no reproducen. Verificados por mí de forma independiente: `Región de estado` declara **16** y mido **5-6**; `Acción diferenciada` declara 6 y mido **4**; `Par de color` declara 5 y mido **3**; `Estado de deriva` declara 3 y mido **2**. Otros: `Shell de acceso` 6→5, `Tarjeta de acceso` 3→5, `Grilla de tarjetas` 8→3, `Variante de la banda de resultado` 5→1, `Rechazo indiferenciado` 2→1, `Aviso de higiene` 2→3, `Distintivo de artefacto preliminar` 4→2 y `Marcador de origen indeterminado` 5→3 en forma exacta. Tres filas —`Presentación del par de estado`, `Precedencia de la marca de pendiente` y `Regla de continuidad del lazo`— declaran 2, 2 y 4 y su forma literal aparece en **0**: la celda cuenta el **concepto** y no el término, bajo un encabezado que dice «Artefactos de 03», y §9.1 lo declara para la primera. Lo que falla es la afirmación general de §1.1: «cada conteo se verificó en disco». La evidencia resuelve —el corpus existe y el barrido es reproducible—; falla el número derivado |
| **`P2-05`** · Duplicación parcial de `Nodo borrador` | **ABIERTO** → **P2-r2-06** | Cruce por script de los 65 términos definidos en 03 contra los 82 definidos y sus alias en 02: **una única intersección**, `Nodo borrador`. `Glosario-UX.md`:135 lo define repitiendo las cláusulas de `Glosario-Funcional.md`:126 y a la vez lo referencia en §5.2:213 |
| **`P2-06`** · Tres términos aparecen en un artefacto o en ninguno | **ABIERTO** → **P2-r2-07** | `Vista de un solo uso`: 1 artefacto; `Banner de cambios pendientes`: 1 en su forma completa; `Omisión declarada`: 1 en su forma de término y 0 como concepto en un segundo artefacto. §9.1 descarta 33 candidatos por exactamente ese criterio |
| **`P2-07`** · El manifiesto afirma el valor de un flag que el intake no declara | **ABIERTO** → **P2-r2-08** | `PRODUCT-MANIFEST`:84 sigue diciendo «`usa_llm` == false». Barrido propio sobre el intake: **cero** ocurrencias de `usa_llm`, de `LLM` y de `Prompts-AI`. Dos líneas antes el mismo párrafo trata el flag hermano de forma honesta —«`requiere_maqueta` no tiene valor declarado en ninguna fuente», también verificado en cero ocurrencias— |
| **`P2-08`** · Aritmética de §8.1 del plan | **ABIERTO** → **P2-r2-09** | La última fila sigue diciendo «Las **98** filas restantes de 02, las **6** de 00». 02 tiene 101 filas y la tabla nomina 28, con lo que quedan **73**; 00 tiene 6 de las cuales 2 están corregidas dos filas más arriba, con lo que quedan **4** |
| **`P2-09`** · Dos conteos de `Glosario-Funcional.md` no reproducen | **ABIERTO** → **P2-r2-10** | §3.7 sigue diciendo «Los **98 artefactos hermanos**, en su sección de control de cambios» y la frase citada aparece en **67** archivos. §3.2 sigue proyectando «**128**» y «**151**»; el conteo de la palabra sobre los mismos archivos da **117** y **140**, y aun contando las variantes sin tilde de nombres de archivo da **129** y **152**. Ninguna lectura da 128/151. La cifra «98 hermanos» sí es correcta como subconjunto: §1.4 lo define como 38 CU + 40 RN + 19 RC + el modelo conceptual |
| **`P2-10`** · Una localización de `Glosario-Funcional.md` §5.1 no resuelve | **ABIERTO y ampliado** → **P2-r2-11** | La fila sigue en :392. **Las tres afirmaciones son falsas**: la expresión «Brecha declarada de cobertura» no existe en ningún artefacto vivo de 02; «Brecha declarada» no tiene dos ocurrencias sino **52 en 34 archivos**; y en `RN-02`:51 y `RN-08`:55 y :67 está **en el cuerpo**, dentro de «§3. Ámbito de aplicación» y «§6. Pruebas que la verifican», cuando el control de cambios de esos archivos empieza en :56 y :71 |
| **`P2-11`** · El cierre del campo bloqueante `Product Owner` sin registro fuera del documento migrado | **ABIERTO** → **P2-r2-12** | §7.1 del plan sigue registrando solo `D-M1` a `D-M4`. Ni `[R-1]` ni `[R-2]` aparecen en el plan. El intake:23 los cita como resueltos, y el criterio 1 de §6 pide que la declaración viva en el plan. **No es invención**: el campo existía y cambió de estado por respuesta humana declarada |

### 11.3 Los seis P3

| Hallazgo | Estado | Evidencia |
| --- | --- | --- |
| **`P3-01`** · El plan §7.2 omite `Bitacora-Validacion-Maqueta.md` | **ABIERTO** → **P3-r2-01** | Barrido: cero ocurrencias de `Bitacora-Validacion-Maqueta` en el plan. `03/README.md`:233 sí declara los tres |
| **`P3-02`** · Referencia adelantada al informe de M6 | **CERRADO** | `PRODUCT-MANIFEST`:82 invoca «el informe de M6» y ese informe existe desde las 12:57 del 2026-07-30, en la ruta que el manifiesto supone |
| **`P3-03`** · La cabecera del intake agrega una fila que la plantilla dice no completar | **ABIERTO** → **P3-r2-02** | `PRODUCT-INTAKE`:7 declara `Slug-Producto` con la anotación «derivado de `Nombre-Producto`, no se completa a mano», y `PRODUCT-INTAKE-template` 2.1:66 dice que no se completa. El sentido se preserva; la desviación es de forma |
| **`P3-04`** · Cinco hallazgos heredados de los cortes 3 y 4 | **ABIERTO y con dos precisiones que empeoran el cuadro** → **P3-r2-03** | (a) `02/Especificacion-Funcional.md` declara **139** historias y su matriz §6, expandiendo los seis rangos, da **142**, contraverificado contra los `US-CU-XX-n` de los 38 CU. (b) `02/README.md` §5 no lista las 19 RC: cero identificadores `RC-XX` en todo el archivo. (c) `Experiencia-De-Uso.md` §9.1:607 dice «Los **16** de `Wireframes/`» con 18 en disco, y arrastra dos desfases más en la misma tabla: «los **36** casos de uso» con 38, y «las **118** historias» con 139 declaradas. Su propio control de cambios registra que §9.2 pasó de dieciséis a dieciocho: **§9.1 quedó sin actualizar antes de la migración** y la migración correctamente no lo propagó. (d) `Wireframes-Panel-Lateral-Del-Servicio.md` §8:264 lista seis CU y omite `CU-38`, que `Experiencia-De-Uso.md` §9.2:641 declara para `SUP-06`; **agravante**: la última fila del mismo §8 dice que la fila «reproduce» la fuente única, y no la reproduce. (e) `Wireframes-Alta-De-Servicio.md` §5 tiene 18 filas de estado y nombra **1 de los 4** estados mínimos —solo «Error»—; es el único de los 18 wireframes en esa situación. Los cinco están correctamente documentados en sus informes de ronda y ninguno lo introdujo la migración |
| **`P3-05`** · `Pendiente de aplicar` con dos referentes no declarados | **ABIERTO** → **P3-r2-04** | `Glosario-UX.md`:133 lo define como variante del par de estado; `Glosario-Funcional.md`:125 lo lista como valor `pendiente-de-aplicar` del `Estado de configuración`. Ni §5.2 ni §8 de 03 lo enumeran como polisemia. Contextos mayormente disjuntos |
| **`P3-06`** · Deuda preexistente conservada, correctamente | **ABIERTO como deuda del destino** → **P3-r2-05** | `PRODUCT-INTAKE`:354 sigue diciendo «Cada una de las **cuatro** unidades de la composición de §13», contradicho por §13 desde la 2.2. Es idéntico en el archivado v2.4: la migración lo conservó, que es lo que §4.1 y §4.2 mandan |

**Resumen:** de los 20 hallazgos de la ronda 1, **3 quedan cerrados** (`P1-01`, `P1-03`, `P3-02`), **1 queda reclasificado** de P1 a P2 (`P1-02`) y **16 quedan abiertos**, cuatro de ellos ampliados por medición propia (`P2-04`, `P2-09`, `P2-10`, `P3-04`).

### 11.4 Una afirmación de la ronda 1 que este informe contradice

Fuera de sus veinte hallazgos, el informe de la ronda 1 emitió un veredicto que la medición de esta ronda no sostiene. Se declara acá, porque `Master-Prompt.md` §10 pide que cada ronda sea un acto independiente y no una ampliación de la anterior.

| Dónde | Qué afirma la ronda 1 | Qué mido |
| --- | --- | --- |
| §5.2, criterio 2 de gobierno del glosario | «En la categoría 02 el criterio **cumple**: los 82 términos aparecen en dos o más de los 98 hermanos, verificado uno por uno» | La afirmación es **cierta pero mide la dirección inversa**. La regla de `Rules-Especificacion-Funcional` 4.0 §3.3 exige la directa: todo término del dominio que aparezca en más de un artefacto entra al glosario. Medida esa dirección sobre los 100 hermanos, **no cumple**: al menos cuatro términos acuñados por 02 no están en ninguna parte del artefacto, uno de ellos en **24 de 100** artefactos. Hallazgo **P1-r2-02** |
| §5.2, criterio 1 | «Sin contradicciones — **CUMPLE**. No hay ningún término con dos definiciones incompatibles entre los tres» | `Catálogo` es «la **cuarta** vía de alta» en el glosario raíz y **siete** en el cuerpo y en el glosario de 02, sin que la diferencia se declare y con la afirmación expresa de que no la hay. Hallazgo **P2-r2-14** |

Ninguna de las dos cambia el veredicto de la ronda 1 —las dos son P1 y P2, no P0— ni la declaración de migración completa.

---

## 12. Hallazgos de esta ronda

### P1 · Alto

---

#### `P1-r2-01` · Dos artefactos en estado `Aprobado` se corrigieron sin subir versión, sin archivar el estado previo y —en un caso— fuera del flujo de escritura que la normativa declara cerrado

**Archivos:** `SDD/Intake/PRODUCT-INTAKE-SelfHosted-Service.md` y `SDD/Docs/Audit/Plan-Migracion-4.1-a-6.0.md`
**Sección:** cabecera y control de cambios de los dos

**Evidencia.** Los tres archivos del árbol con fecha de modificación posterior al informe de la ronda 1 (12:57 del 2026-07-30) son:

| Archivo | Hora | Estado declarado | Versión antes | Versión después | Archivado del estado previo | Fila nueva |
| --- | --- | --- | --- | --- | --- | --- |
| `Plan-Migracion-4.1-a-6.0.md` | 13:01 | **Aprobado** por el agente humano el 2026-07-30 | 1.1 | **1.1** | **no** | **no**; §8.2 se agregó sin tocar el control de cambios, cuya fila 1.1 no la menciona |
| `PRODUCT-INTAKE-SelfHosted-Service.md` | 13:01 | **Aprobado** | 3.0 | **3.0** | **no** | no; la corrección se escribió dentro de la fila 3.0 ya emitida |
| `Glosario-UX.md` | 13:12 | **Propuesto** | 2.0 | 2.0 | no | no; dentro de la fila 2.0 |

`Master-Prompt.md` §5, política de versionado: «Las correcciones derivadas del audit de la propia fase de emisión se absorben dentro de la versión en curso, sin subir, **mientras el documento esté en estado `Borrador` o `Propuesto`** … **Desde que el documento pasa a `Aprobado` o `Vigente` … toda corrección sube versión y archiva el estado anterior**».

Los 142 documentos de `SDD/Docs/` están en `Propuesto`, de modo que **el cierre de `P1-01` en `Glosario-UX.md` es legítimo** y no se levanta. Los otros dos no lo son.

En el caso del intake el incumplimiento es más específico. `Master-Prompt.md` §13 regla 2 declara que los casos de escritura permitidos «son **dos**, y ningún otro»: (a) consolidar una respuesta del humano y (b) la migración estructural de M2. Corregir un hallazgo de auditoría no es ninguno de los dos. Y §13 regla 4 obliga al bump y regla 6 al archivado previo en `SDD/Intake/_legacy/<YYYY-MM-DD>/`. Ninguna de las tres se cumplió.

**Por qué es P1 y no P0.** La propiedad que el P0 «estado previo no archivado» de `Migracion-Rules.md` §6 protege es la reversibilidad de la migración, y esa propiedad **no se rompe**: `SOLUTION-INTAKE-…-v2.4.md` y `SOLUTION-MANIFEST-…-v1.9.md` siguen archivados, el diff v2.4 → v3.0 es reproducible, y la corrección está declarada íntegra en prosa dentro de la fila 3.0. Cero filas históricas se tocaron. Es incumplimiento de una regla constructiva que no rompe trazabilidad, que `Master-Prompt.md` §10 sitúa en P1.

**Por qué es P1 y no P2.** Ocurre sobre el documento raíz de la cadena D6 y sobre el contrato entre orquestadores, y sobre el flujo que el framework declara cerrado con la cláusula «cualquier … modificación … sin pasar por este flujo es un error de orquestación». Además el efecto es acumulativo: el plan lleva ahora tres cuerpos de corrección —la tabla de §4, §8.1 y §8.2— y ninguno consta en su control de cambios.

**Recomendación.** No revertir el contenido: las tres correcciones son sustantivamente correctas y revertirlas reabriría `P1-01` y `P1-03`. Regularizar la forma: archivar `PRODUCT-INTAKE` 3.0 y `Plan-Migracion` 1.1 en su `_legacy/2026-07-30/`, emitir `PRODUCT-INTAKE` 3.1 y `Plan-Migracion` 1.2 con su fila propia, y declarar en esa fila que el origen de la corrección es el informe de la ronda 1. Para el intake, hacerlo por el flujo de §13 con la confirmación del Product Owner que el documento humano exige.

---

#### `P1-r2-02` · La regla de inclusión de `Rules-Especificacion-Funcional` 4.0 §3.3 queda incumplida en `Glosario-Funcional.md`, y la ronda 1 la dio por cumplida midiendo solo la dirección inversa

**Archivo:** `SDD/Docs/02-Especificacion-Funcional/Glosario-Funcional.md`
**Sección:** §2, §4.1, §5.1 y §5.2

**Evidencia.** `Rules-Especificacion-Funcional` 4.0 §3.3: «entra al glosario **todo término del dominio que aparece en más de un artefacto de 02**». Su §6 lo verifica. Barrido por ocurrencia sobre los **100** artefactos hermanos de la categoría —38 CU, 40 RN, 19 RC, el modelo conceptual, el índice maestro y el README—, sin `_legacy/` y con las secciones de control de cambios recortadas:

| Término acuñado por 02 | Artefactos donde aparece | Menciones en todo `Glosario-Funcional.md` |
| --- | --- | --- |
| **`Evento de auditoría`** | **24 de 100** | **0** |
| **`Variable de servicio`** | **12** | **0** |
| **`Nombre visible`** | **4** | **0** |
| **`Comando de arranque`** | **4** | **0** |

Los cuatro son vocabulario del dominio, no forma del artefacto. `Evento de auditoría` es lo que la tabla de actores de veintidós casos de uso declara que el sistema emite, y el glosario declara `Registro de auditoría`, que es la bitácora donde el evento se guarda: no es el mismo objeto. `Variable de servicio` es la tercera clase de variable del modelo —**tiene subsección propia en `Modelo-Conceptual.md` §1.5**— y el glosario declara las otras dos y omite ésta. `Nombre visible` es distinto de `Identificador legible`, que sí tiene fila, y es una de las cinco condiciones de higiene de `RN-37`. `Comando de arranque` es atributo del servicio en el modelo.

Ninguno de los cuatro está **en ninguna parte del artefacto**: no tienen fila en §2, no están referenciados en §4.1, no están entre los **dos** candidatos que §5.1 declara descartados, y §5.2 declara «**Ninguno**» pendiente. La consecuencia es que el glosario no los omite por criterio: los omite sin verlos.

Cuatro términos más aparecen **dentro de la definición de otra entrada** pero sin fila propia ni constancia de descarte: `Modo de red` (**14** artefactos), `Red del proyecto` (**9**, nombrada de paso en §4.1 como uno de los cuatro objetos con identidad), `Dirección fija` (**7**, usada dentro de dos definiciones) y `Configuración observada` (**6**, que además es el título de `CU-08`). Y de las **cinco** variantes de origen que la entrada `Origen` de §2.2 enumera, solo `Archivo de construcción en línea` tiene fila propia: `imagen de registro público` (5 artefactos), `imagen de registro privado` (4), `repositorio remoto` (8) y `sin origen` (2) aparecen en más de un artefacto y no la tienen. O entran las cinco o no entra ninguna.

**Por qué la ronda 1 no lo vio.** Su §5.2 declaró «en la categoría 02 el criterio **cumple**: los 82 términos aparecen en dos o más de los 98 hermanos, verificado uno por uno». Eso mide la **dirección inversa** —que lo declarado esté usado—, que este informe también confirma: ninguno de los 82 aparece en menos de dos artefactos. La regla de §3.3 es la **directa**, y no se midió. Es el mismo hueco de método que produjo `P1-01` sobre el otro glosario, con la diferencia de que allá el hallazgo se levantó.

**Por qué es P1 y no P0.** Es **omisión, no invención**: ningún término se inventó y ninguna sección se rellenó. No rompe trazabilidad, no omite un documento obligatorio, no introduce vocabulario prohibido y no falta ninguna cabecera.

**Por qué es P1 y no P2.** Es incumplimiento del §6 del archivo de reglas de la categoría, que `Master-Prompt.md` §10 clasifica como P1, sobre el artefacto que **esta migración emitió desde cero** y bajo la regla cuya incorporación es una de las dos razones por las que la categoría 02 se migró. Es además exactamente la graduación que la ronda 1 aplicó al mismo defecto en `Glosario-UX.md`, y `Evento de auditoría` aparece en **24 de 100** artefactos, más del doble de cobertura relativa que el término peor del hallazgo anterior.

**Recomendación.** Correr sobre los 100 hermanos el mismo barrido por ocurrencia con el que se cerró `P1-01` en 03 —clasificando por referente y no por coincidencia de cadena— y, para cada término que sobreviva: agregarle fila en §2 con la definición tomada de **cómo los artefactos lo usan**, o referenciarlo en §4.1 si ya está aguas arriba, o declararlo descartado en §5.1 con su conteo. No requiere tocar ninguno de los 100 artefactos.

---

### P2 · Medio

**`P2-r2-01` · El plan §8 sigue declarando 119 filas resueltas de 144, y ahora se contradice también consigo mismo.**
`Plan-Migracion-4.1-a-6.0.md`:424 y :425 declaran «`SDD/Docs/03-UX-UI-DX/` \| 25 \| **Sin resolver.** Corte 4, pendiente» y «**Total resuelto** \| **119 de 144**», mientras §8.2 del mismo documento —agregada a las 13:01— se titula «Las 25 filas de `03-UX-UI-DX`, **cerradas** el 2026-07-30» y `PRODUCT-MANIFEST`:71 declara «144 de 144». La medición de este informe da la razón al manifiesto. Ya era `P2-01`; el agravante es que el plan se editó y §8 no se actualizó en la misma edición. *Recomendación:* cerrar §8 con el estado final de §8.2 de este informe.

**`P2-r2-02` · La columna «fuente de contenido» de §4 del plan declara «documento de origen» para 141 de las 144 filas, contradicha por §8.1 y §8.2 del mismo plan.**
Reclasificación de `P1-02`. La sustancia está cerrada: §8.2 cubre las 25 filas de 03 y es verdadera. Lo que queda es que la tabla que `Migracion-Rules.md` §6 criterio 1 designa como el lugar de la declaración conserva una celda falsa para esas 25 filas y para otras 116, y un lector que consulte §4 sin llegar a §8 obtiene el dato equivocado. *Recomendación:* llevar la columna de §4 al estado de §8.1 y §8.2, o marcar cada celda afectada con el puntero a la sección que la corrige.

**`P2-r2-03` · `03-UX-UI-DX/README.md` atribuye al `PRODUCT-MANIFEST` §1.1 dos versiones de regla que el manifiesto ya no declara.**
`03/README.md`:222 dice «El `PRODUCT-MANIFEST` §1.1 declara `Maqueta-Rules` **2.0** y `Deriva-Rules` **2.0** "como previstas"». El manifiesto archivado v2.0:59 efectivamente decía eso, pero el manifiesto vivo :61 declara **`Maqueta-Rules` 3.1 y `Deriva-Rules` 3.1** desde el cierre de procedencia de M5. **Es un defecto que introdujo M5**: reescribió la procedencia después de cerrado el corte 4 y no revisó quién citaba el bloque. La afirmación de fondo —que el flag `requiere_maqueta` no tiene valor declarado— sigue siendo verdadera y se verificó en cero ocurrencias. *Recomendación:* actualizar las dos versiones citadas.

**`P2-r2-04` · Dos sub-sustituciones en `03-UX-UI-DX/README.md`.**
:143 «Base obligatoria de todo **proyecto** con interfaz web» y :160 «prohíbe definir tokens **por proyecto**», idénticas a `Experiencia-De-Uso.md`:140 y :751, que sí se promovieron sobre el mismo referente —la unidad D8—. Levantado por `M4-03-UX-UI-DX-r1` H-04 y por `P2-03`, todavía abierto. Es el defecto menor y visible que el plan §3.5 Paso 3 prefiere al riesgo inverso. *Recomendación:* promover las dos.

**`P2-r2-05` · Dieciséis conteos de la columna «Artefactos de 03» de `Glosario-UX.md` no reproducen, contra la afirmación de §1.1 de que «cada conteo se verificó en disco».**
Reconteo propio de las 65 filas de §2, §3, §4 y §7 sobre los 23 artefactos, sin `_legacy/` y sin filas de control de cambios. El peor caso es `Región de estado`, que declara **16** y mide **5**, y su celda no ofrece forma alterna. Le siguen `Grilla de tarjetas` 8→3, `Acción diferenciada` 6→4, `Variante de la banda de resultado` 5→1, `Marcador de origen indeterminado` 5→3 exacto, `Par de color` 5→3, `Distintivo de artefacto preliminar` 4→2 exacto, `Estado vacío por filtro` 4→0 exacto, `Estado de deriva` 3→2, `Shell de acceso` 6→5, `Tarjeta de acceso` 3→5, `Aviso de higiene` 2→3, `Rechazo indiferenciado` 2→1, y las tres filas cuya celda cuenta el concepto y no el término —`Presentación del par de estado`, `Precedencia de la marca de pendiente` y `Regla de continuidad del lazo`—. La fila `Shell de acceso` enumera además «las dos representaciones de identidad», que no son dos de los cuatro archivos de `Representaciones/`. **La evidencia resuelve** —el corpus existe y el barrido es reproducible— y falla el número derivado: por eso P2 y no P0, con el mismo criterio con que los cuatro cortes graduaron sus hallazgos análogos. *Recomendación:* recontar la columna, o cambiar su encabezado por uno que admita el conteo por concepto y declarar la forma medida en cada celda.

**`P2-r2-06` · `Nodo borrador` está a la vez definido y referenciado, y es la única duplicación entre los tres glosarios.**
Cruce por script de los 65 términos definidos en `Glosario-UX.md` contra los 82 definidos y sus alias en `Glosario-Funcional.md`: **una sola intersección**. `Glosario-UX.md`:135 define el término repitiendo las dos cláusulas sustantivas de `Glosario-Funcional.md`:126 —«existe, es visible en el lienzo, está incompleto de forma visible» y «**no entra al conjunto de cambios pendientes**»— antes de agregar su precisión de superficie, y a la vez lo referencia en §5.2:213 apuntando al mismo lugar. `Rules-UX-UI-DX` 4.0 §3.3 pide referenciar y declarar la diferencia, no redefinir. *Recomendación:* dejar en §3 solo la precisión de superficie, con el puntero.

**`P2-r2-07` · Tres términos de `Glosario-UX.md` aparecen en un solo artefacto de 03.**
`Vista de un solo uso`:107 y `Banner de cambios pendientes`:101 declaran «1» en su propia columna y conservan la fila; `Omisión declarada`:167 declara «1 como término» y su segunda mención es la enumeración de las cinco omisiones en `Experiencia-De-Uso` §1.4. §9.1 descarta 33 candidatos por exactamente este criterio: es una aplicación asimétrica de la propia regla de inclusión. *Recomendación:* mover las definiciones a su artefacto, o declarar en §1.1 la excepción y su motivo.

**`P2-r2-08` · El manifiesto afirma el valor de un flag que el intake no declara.**
`PRODUCT-MANIFEST`:84: «la categoría 04 queda excluida por gating: el proyecto de código no declara uso de LLM en su bloque §17 (**`usa_llm` == false**)». Barrido propio sobre el intake: **cero** ocurrencias de `usa_llm`, de `LLM` y de `Prompts-AI`. Dos líneas antes el mismo párrafo trata el flag hermano de forma honesta —«`requiere_maqueta` no tiene valor declarado en ninguna fuente», también cero ocurrencias—: el criterio no es uniforme y la forma correcta es la segunda. La conclusión de excluir la 04 no cambia. *Recomendación:* reescribir como «el intake no declara `usa_llm`; en ausencia de declaración la categoría 04 no se genera».

**`P2-r2-09` · Aritmética de `Plan-Migracion-4.1-a-6.0.md` §8.1.**
La última fila dice «Las **98** filas restantes de 02, las **6** de 00 y las 8 NB de 01». 02 tiene 101 filas y la propia tabla nomina 28, con lo que quedan **73** —número que el propio plan usa en §3.5 Paso 2.b—; 00 tiene 6 de las cuales 2 están corregidas dos filas más arriba, con lo que quedan **4**. *Recomendación:* corregir a 73 y a 4.

**`P2-r2-10` · Tres conteos de `Glosario-Funcional.md` no reproducen.**
§3.7 declara «Los **98 artefactos hermanos**, en su sección de control de cambios» para la frase de la etiqueta de cabecera; la frase citada aparece en **67** archivos. §3.2 proyecta «**128**» ocurrencias de «resolución» sobre los cien archivos y «**151** contando este glosario»; el conteo de la palabra da **117** y **140**, y contando además las variantes sin tilde de nombres de archivo da **129** y **152**: ninguna lectura da 128/151. Y §2.3:153 declara para `Veredicto` cinco artefactos —`CU-01, CU-20, CU-21, IDX, MC`— y en el cuerpo solo aparece en **dos**: en `CU-01`, en el índice maestro y en el modelo conceptual su única ocurrencia está **dentro de una fila de control de cambios**, que §1.1 declara excluida del barrido. La cifra «98 hermanos» sí es correcta como subconjunto: §1.4 lo define como 38 CU + 40 RN + 19 RC + el modelo conceptual. *Recomendación:* recontar las tres.

**`P2-r2-11` · La fila «Brecha declarada de cobertura» de `Glosario-Funcional.md` §5.1 hace tres afirmaciones y las tres son falsas.**
La fila vive en :392. (a) La expresión «Brecha declarada de cobertura» no existe en ningún artefacto vivo de 02. (b) «Brecha declarada» no tiene dos ocurrencias: tiene **52 en 34 archivos**. (c) En `RN-02`:51 y en `RN-08`:55 y :67 está **en el cuerpo** —dentro de «§3. Ámbito de aplicación» y «§6. Pruebas que la verifican»—, no en filas históricas de control de cambios, que en esos archivos empiezan en :56 y :71. *Recomendación:* corregir la fila o retirarla; si el término es de inclusión, tratarlo como tal.

**`P2-r2-12` · El cierre de `[R-1]` y de `[R-2]` no tiene registro fuera del propio documento migrado.**
`PRODUCT-INTAKE`:11 pasó de «Derivado, pendiente de confirmación» —así en el archivado v2.4:11— a «Confirmado el 2026-07-30», y :23 lo atribuye a la entrada `[R-1]` de la batería de M2; la fila 3.0 atribuye a `[R-2]` la preservación de los siete bloques de §9.1 de este informe. Ninguna de las dos aparece en el plan, cuyo §7.1 registra solo `D-M1` a `D-M4`. `Intake-Rules.md` §6 emite la batería como bloque de interacción y no como artefacto, de modo que su ausencia en disco es esperable; lo que falta es la resolución en el plan, que es donde el criterio 1 de §6 pide que la declaración viva. **No es invención**: los dos campos existían y cambiaron de estado por respuesta humana declarada. *Recomendación:* agregar `[R-1]` y `[R-2]` a §7.1 del plan.

**`P2-r2-13` · El manifiesto declara doce observaciones de audit abiertas sin enumerarlas por documento.**
`PRODUCT-MANIFEST`:82 sigue diciendo «Quedan doce observaciones de audit de nivel P2 y P3». `Migracion-Rules.md` §4.6 regla 2 pide el estado documento por documento. La tabla §8.3 de este informe y la de la ronda 1 lo cubren; falta el puntero. Y el número quedó viejo: con esta ronda son veintiuna. *Recomendación:* referenciar §8.3 desde el manifiesto en lugar de repetir el conteo.

**`P2-r2-14` · `Glosario-Funcional.md` no declara la diferencia de sentido de `Catálogo` frente al glosario raíz, y afirma expresamente que no hay ninguna.**
`Vision-Producto.md` §9:268 define `Catálogo` como «la **cuarta** vía de alta de un servicio»; `CU-03`:59, `CU-16`:136 y la propia entrada `Vía de alta` de `Glosario-Funcional.md`:119 declaran **siete**. `Glosario-Funcional.md`:356 lo lista en §4.1 como referenciado y no redefinido, con la precisión «la plantilla y las dos versiones», y **no declara la diferencia** que `Rules-Especificacion-Funcional` 4.0 §3.3 exige cuando el sentido difiere; :363 afirma además «**Ninguna entrada de este glosario contradice a `Vision-Producto.md` §9**». El «cuarta» del raíz es **preexistente** —idéntico en `_legacy/2026-07-30/Vision-Producto-v1.0.md`:263, correctamente conservado por `Migracion-Rules.md` §4.2— pero la omisión y la afirmación viven en el artefacto que esta migración emitió. *Recomendación:* declarar la diferencia en la fila de §4.1 y acotar la afirmación de §4 a las entradas que efectivamente no contradicen; el `Catálogo` del raíz es deuda del destino y se corrige aparte.

### P3 · Bajo

**`P3-r2-01` · El plan §7.2 omite `Bitacora-Validacion-Maqueta.md`.** Enumera dos de los tres artefactos que `Rules-UX-UI-DX` 4.0 §2.1 vuelve obligatorios para `requiere_maqueta == true`; barrido: cero ocurrencias del tercero en el plan. `03/README.md`:233 sí declara los tres, y es el artefacto que la regla designa para el inventario. Sin efecto sobre el destino.

**`P3-r2-02` · La cabecera del intake agrega la fila `Slug-Producto`, que la plantilla dice no completar.** `PRODUCT-INTAKE-template` 2.1:66 declara «`Slug-Producto` no se completa: el orquestador lo deriva». El intake la agrega anotada como derivada, de modo que el sentido se preserva. Desviación de forma.

**`P3-r2-03` · Cinco desfases heredados de los cortes 3 y 4 siguen abiertos, y tres de ellos son peores de lo que la ronda 1 describió.** El recuento de historias de usuario de `02/Especificacion-Funcional.md` declara **139** y la matriz expande a **142**; `02/README.md` no lista las 19 reglas conceptuales con propósito y estado —cero identificadores `RC-XX` en el archivo—; `Experiencia-De-Uso.md` §9.1 dice «Los **16** de `Wireframes/`» con 18 en disco y arrastra dos desfases más en la misma tabla, «los **36** casos de uso» con 38 y «las **118** historias» con 139 declaradas; `Wireframes-Panel-Lateral-Del-Servicio.md` §8 omite `CU-38` y en la fila siguiente declara que «reproduce» la fuente única de `Experiencia-De-Uso.md` §9.2, que sí lo trae; y `Wireframes-Alta-De-Servicio.md` §5 nombra **1 de los 4** estados mínimos, único caso entre los 18 wireframes. **Ninguno lo introdujo la migración**: los cinco vienen del origen y están documentados en sus informes de ronda. Se conservan por `Migracion-Rules.md` §4.2, que es lo correcto.

**`P3-r2-04` · `Pendiente de aplicar` tiene dos referentes en la cadena y no se declaran.** El estado visual del lienzo en `Glosario-UX.md`:133 y el valor `pendiente-de-aplicar` del `Estado de configuración` en `Glosario-Funcional.md`:125. Ni §5.2 ni §8 de 03 lo enumeran como polisemia. Los contextos son mayormente disjuntos, por lo que no sube de P3.

**`P3-r2-05` · Deuda preexistente del intake, conservada correctamente.** `PRODUCT-INTAKE`:354 sigue diciendo «Cada una de las **cuatro** unidades de la composición de §13», contradicho por §13 desde la versión 2.2, que declara una sola. Es idéntico en el archivado v2.4. Queda como deuda del destino, no de la migración.

**`P3-r2-06` · El plan §8.2 cita conteos del `Glosario-UX.md` que quedaron superados once minutos después de escribirse.** §8.2 dice «de sus **63** términos, 39 vienen del documento de origen y **24** salieron del barrido … los **61** referenciados de §5». El cierre de `P1-01`, escrito a las 13:12, llevó esas cifras a **65** y **65**. La declaración de fuente que §8.2 hace sigue siendo correcta; lo que envejeció es el número. *Recomendación:* actualizar a 65 y 65, o retirar las cifras y dejar la declaración de fuente.

**`P3-r2-07` · El informe de la ronda 1 §9 declara «no quedó contenido sin destino» y omite los siete bloques del intake que la plantilla vigente no ubica.** Están preservados íntegros por resolución `[R-2]` y declarados en la fila 3.0 del intake, de modo que no hay pérdida de información y no es defecto del destino: es una omisión del informe frente al criterio 5 de §6, que pide enumerarlos con su texto localizable. Se subsana en §9.1 de este informe. Se anota como P3 y no se corrige el informe de la ronda 1, que es un acto cerrado.

---

## 13. Veredicto y condiciones

### Veredicto

# APROBADO CON OBSERVACIONES

**Cero hallazgos P0.** Los seis P0 propios de una migración normativa se verificaron uno por uno contra los archivos, con medición propia y sin apoyarse en ninguna declaración de los orquestadores, del informe de la ronda 1 ni de los cinco informes de M4, y **ninguno se cumple**. La cadena no se detiene: `Migracion-Rules.md` §6 y `Master-Prompt-Migracion.md` §10 reservan la detención bloqueante para el P0. **Los dos P1 sí bloquean avance hasta corrección**, por `Master-Prompt.md` §10, y por la misma razón por la que existe esta ronda: una corrección aplicada y no verificada no cierra un P1.

**La migración se declara COMPLETA**, con las **144 filas** del plan resueltas y verificadas por seis medidas independientes, y en consecuencia el cierre de procedencia del conjunto 6.0 que M5 escribió en `PRODUCT-MANIFEST` §1.1 es una afirmación verdadera sobre el estado del destino.

### Lo que las tres correcciones de esta ronda hicieron bien

`P1-01` se cerró **sin inventar nada**: las cuatro referencias no redefinen y las dos definiciones acuñadas son transcripción de cómo los hermanos usan el término, verificada línea por línea. Los conteos declarados reproducen contados a mano, incluidas las filas que agrupan varios términos separados por `·`, y las cuatro precisiones que el glosario hace sobre el hallazgo que lo originó son ciertas: **el hallazgo de la ronda 1 era correcto en el defecto y equivocado en cuatro de sus seis números**. `P1-03` se cerró restituyendo el nombre real, y el barrido sobre las 126 citas a archivos archivados confirma que el defecto no quedó en ninguna otra parte del árbol. Y el punto que esta ronda tenía que mirar con más cuidado —que las correcciones se aplicaran dentro de las filas ya emitidas y no sobre filas de versiones anteriores— **se verifica cumplido**: las 485 filas históricas de los 143 pares siguen intactas.

El punto crítico de la corrida sigue resuelto tras las correcciones: **cero sobre-sustituciones** sobre el censo completo de «proyecto de código» en cuerpo, las nueve promociones ratificadas contra el archivado, «resolución» viva en las cuatro categorías y en el intake, cero «reproducto» reales, cero concordancias de género rotas y cero cabeceras de tabla pisadas.

### Condiciones para dar la migración por cerrada

Ninguna es bloqueante para el veredicto.

1. **`P1-r2-02`** — Correr sobre los 100 artefactos de 02 el mismo barrido por ocurrencia con el que se cerró `P1-01` en 03, y completar `Glosario-Funcional.md` con lo que sobreviva: fila propia, referencia en §4.1 o constancia de descarte en §5.1. Es la condición más sustantiva de las cinco, porque toca contenido y no registro, y porque el glosario de 02 es el insumo contra el que 03, 05, 06, 08 y 11 miden su no duplicación. No requiere tocar ninguno de los 100 artefactos.
2. **`P1-r2-01`** — Regularizar la forma de las dos correcciones sobre artefactos `Aprobado`: archivar, bumpear y dejar fila, en el intake por el flujo de `Master-Prompt.md` §13. **No revertir el contenido**: revertirlo reabriría `P1-01` y `P1-03`.
3. **`P2-r2-01`, `P2-r2-02` y `P2-r2-09`** — Cerrar el plan: llevar §8 al estado final de §8.2 de este informe, llevar la columna de §4 al estado de §8.1 y §8.2, y corregir la aritmética de §8.1 a 73 y 4. Sin esto el contrato entre orquestadores queda declarando 119 filas resueltas sobre un árbol con 144 y una fuente de contenido que él mismo desmiente dos secciones más abajo.
4. **`P2-r2-03` y `P2-r2-14`** — Actualizar la cita de `03/README.md`:222 a `Maqueta-Rules` 3.1 y `Deriva-Rules` 3.1, y declarar en `Glosario-Funcional.md` §4.1 la diferencia de sentido de `Catálogo`, acotando la afirmación de §4.
5. **`P2-r2-05` a `P2-r2-08` y `P2-r2-10` a `P2-r2-13`** — Se documentan y se siguen. Ninguno afecta el contenido migrado ni la reversibilidad.
6. **`P3-r2-01` a `P3-r2-07`** — Se anotan. Cinco de ellos son deuda preexistente del destino que la migración conservó correctamente.

**Recomendación de proceso.** Las tres correcciones de esta ronda se aplicaron después del informe que las pedía y antes de que nadie las verificara, sobre artefactos aprobados y sin dejar rastro de versión. El patrón funcionó porque las correcciones eran buenas; el mecanismo que garantiza que lo sean —archivar, bumpear, declarar y re-auditar— no se usó. Si hay una ronda 3, conviene que las correcciones que la originen pasen por él.

### Qué queda fuera de este veredicto

La coherencia de la Fase B2 sobre el árbol migrado, con la obligación correlativa que la decisión `D-M2` del plan §7.1 fijó para después de M6; la emisión de `Linea-Base-Visual.md`, `Contrato-Datos-Maqueta.md` y `Bitacora-Validacion-Maqueta.md` por la Fase B2 bajo la 6.0; y la generación de las categorías 04 a 11, que nunca existieron bajo la 4.1.

---

## 14. Sobre el nombre del informe de la ronda 1

El despacho pregunta si el informe de la ronda 1 debió llevar sufijo `-r1`. La respuesta corta es **no según la regla que lo nombra, y sí según la regla que lo gobierna**, y el conflicto es del framework y no del destino.

- **`Migracion-Rules.md` §2.1** nombra el artefacto `Informe-Migracion-<origen>-a-<vigente>.md`, **sin segmento de ronda**, y `Master-Prompt-Migracion.md` §10 repite ese nombre al declarar la salida de M6. Es la norma específica de la migración, y el informe de la ronda 1 la cumple literalmente.
- **`Master-Prompt.md` §10**, que `Master-Prompt-Migracion.md` §1 importa explícitamente para la auditoría —«su perfil de auditor, sus niveles P0 a P3, su estructura de informe y sus veredictos»—, declara el path `SDD/Docs/Audit/<fase>-<categoria>[-<proyecto de código>]-r<N>.md` y, sobre todo, la regla sustantiva: «El informe es **por ronda** y no un documento que cada ronda amplía … Preservar el informe de cada ronda es además lo que sostiene la trazabilidad». Un nombre sin segmento de ronda **no puede satisfacer esa regla**: admite un solo ejemplar.

El resultado es el par asimétrico que este directorio tiene hoy: `Informe-Migracion-4.1-a-6.0.md` y `Informe-Migracion-4.1-a-6.0-r2.md`. Es legible, pero no es el patrón que §10 declara, y un tercer auditor tendría que deducir que el primero es la ronda 1.

**Lectura.** El informe de la ronda 1 **no está mal nombrado**: aplicó la norma específica. El defecto es del framework, que declara la mecánica por rondas en `Master-Prompt.md` §10 y la nombra sin ronda en `Migracion-Rules.md` §2.1. **Recomendación al framework**, fuera del alcance de este destino: que `Migracion-Rules.md` §2.1 declare `Informe-Migracion-<origen>-a-<vigente>-r<N>.md`, con `N` empezando en 1, igual que el plan conserva su nombre sin ronda por no ser un artefacto por ronda. Este informe se escribe en `-r2` porque es el nombre que el despacho fija y porque respeta la regla de no tocar el informe anterior, que es la que importa.

---

## 15. Control de cambios

| Versión | Fecha | Cambios | Autor |
| --- | --- | --- | --- |
| 1.0 | 2026-07-30 | **Ronda 2** de la auditoría de la fase M6 de la migración normativa del conjunto 4.1 al 6.0 sobre SelfHosted Service, invocada desde cero, sobre los **144** entregables de `SDD/Intake/` y `SDD/Docs/`, con los **144** archivados de `_legacy/2026-07-30/` como línea de base. Ninguna afirmación de los orquestadores, del informe de la ronda 1 ni de los cinco informes de M4 se tomó como cierta. Método declarado: **veintitrés verificaciones de cobertura total por script** y **muestreo dirigido por riesgo** con los dos glosarios, los dos documentos de entrada, el plan y las diecisiete ocurrencias de prosa de «proyecto de código» al 100 %, más trece documentos de prosa sobre 137. **Verifica las tres correcciones que el orquestador aplicó después del informe de la ronda 1**: `P1-01` **cerrado** —los seis términos declarados, ninguna definición redactada de cero, los conteos 24 · 23 · 28 filas · 53 términos · 65 · 65 reproducidos a mano, y cero ausencias en el cruce completo de los 82 términos de 02 contra los 23 artefactos de 03—; `P1-03` **cerrado** —la cita resuelve y las 126 citas a archivos archivados del árbol resuelven todas—; `P1-02` **reclasificado a P2**, porque §8.2 del plan cubre las 25 filas de 03 y es verdadera, pero §4 conserva la celda que la desmiente. **Cero P0**: los seis P0 propios de una migración verificados uno por uno. Se ratifican **cero sobre-sustituciones** y las **nueve promociones** de «proyecto» a «proyecto de código» contra el archivado, con el censo de prosa medido en 27 → 44 ocurrencias, y **cero de las 485 filas históricas** de control de cambios alteradas, incluidas las de las tres correcciones de esta ronda. Se enumeran **trece polisemias evaluadas y descartadas**. **Dos P1 nuevos**: dos artefactos en estado `Aprobado` —el intake y el plan— corregidos sin bump, sin archivado y, en el intake, fuera de los dos casos de escritura de `Master-Prompt.md` §13; y la **regla de inclusión de `Rules-Especificacion-Funcional` 4.0 §3.3 incumplida en `Glosario-Funcional.md`**, con `Evento de auditoría` en 24 de 100 artefactos hermanos y cero menciones en todo el glosario, que la ronda 1 dio por cumplida habiendo medido solo la dirección inversa. Catorce P2 y siete P3, con `P2-04`, `P2-09`, `P2-10` y `P3-04` de la ronda 1 **ampliados por medición propia** y cuatro P2 y dos P3 nuevos. **§11.4 declara las dos afirmaciones de la ronda 1 que esta ronda contradice**, ninguna de las cuales cambia su veredicto. Se **subsana el criterio 5 de §6**, que el informe de la ronda 1 no cumplía: se enumeran los siete bloques del intake que la plantilla vigente no ubica, preservados por resolución `[R-2]`. Se declara la migración **COMPLETA**, con las **144 de 144** filas resueltas, y legítimo el cierre de procedencia del conjunto 6.0. Se declara además la lectura sobre el nombre del informe de la ronda 1: cumple `Migracion-Rules.md` §2.1 y no puede cumplir la regla por rondas de `Master-Prompt.md` §10, y el conflicto es del framework. **Veredicto: APROBADO CON OBSERVACIONES.** | Auditor independiente (Arquitecto de Soluciones + QA Senior) |
