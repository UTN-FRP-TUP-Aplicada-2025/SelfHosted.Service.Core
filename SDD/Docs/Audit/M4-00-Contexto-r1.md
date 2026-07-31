# Auditoría de migración normativa · M4 corte 1 · `00-Contexto`

**Archivo:** `M4-00-Contexto-r1.md`
**Producto:** SelfHosted Service (`Slug-Producto`: `SelfHosted-Service`)
**Fase:** M4 del orquestador de migración normativa (`Master-Prompt-Migracion.md` §8), **corte 1**: categoría de nivel producto `00-Contexto`
**Alcance auditado:** los seis entregables vivos de `SDD/Docs/00-Contexto/` en versión 2.0, contra su línea de base v1.0 archivada en `SDD/Docs/00-Contexto/_legacy/2026-07-30/`
**Ronda:** 1
**Auditor:** Arquitecto de Soluciones + QA Senior, independiente, invocado desde cero. No participó de la migración
**Fecha:** 2026-07-30
**`tipo_proyecto_codigo`:** `web-monolith` · categoría de **nivel producto**

**Normativa contra la que se audita:**

| Insumo | Versión | Qué aporta |
| --- | --- | --- |
| `Rules-Contexto.md` | 3.1 | Estructura obligatoria (§4.2), criterios de aceptación (§6), catálogo de ambigüedades (§6.1) |
| `Vocabulario-Rules.md` | 2.1 | §9 criterio de desambiguación léxica; §10 criterios de aceptación, incluido el criterio negativo |
| `Migracion-Rules.md` | 1.0 | Los catorce criterios de aceptación de §6 y sus seis hallazgos P0 |
| `Master-Prompt.md` | 5.2 | §10: matriz de criterios, niveles de hallazgo, estructura de este informe |
| `Master-Prompt-Migracion.md` | 1.0 | §10: los seis hallazgos P0 propios de una migración |
| `Plan-Migracion-4.1-a-6.0.md` | 1.1 | §3.5: procedimiento de sustitución léxica por ocurrencia; §4: clasificación y fuente de contenido |
| `PRODUCT-INTAKE-SelfHosted-Service.md` | 3.0 | §12: convención de vocabulario del producto, upstream de toda la categoría |
| `PRODUCT-MANIFEST-SelfHosted-Service.md` | 2.0 | §1.1: bloque de procedencia |

---

## 1 · Resumen ejecutivo

Los seis entregables están presentes en versión 2.0, con su estado previo v1.0 archivado en el `_legacy/` de su propia carpeta. La migración es **léxica y de forma de cabecera**, y así se comporta: el `diff` contra la línea de base no muestra ni una sola línea de contenido de negocio eliminada, y las únicas líneas agregadas son la fila nueva del control de cambios de cada documento, dos entradas de glosario en `Vision-Producto.md` §9 con fuente verificable, y tres párrafos que remiten al glosario raíz. **Ninguna** de las cuatro clases de daño que `Vocabulario-Rules.md` §9.5 documenta se materializó: no hay «reproducto», las 167 ocurrencias de «resolución» del destino que caen en esta carpeta sobrevivieron íntegras, no hay una sola rotura de concordancia de género, y ninguna fila histórica de control de cambios fue reescrita.

El punto crítico de esta migración —los tres referentes de «proyecto»— se resolvió correctamente **en las dos direcciones**. No hay sobre-sustitución: ninguna ocurrencia de la entidad del dominio ni del emprendimiento se convirtió a «proyecto de código», y las trece ocurrencias de la forma calificada que existen en el cuerpo de los seis documentos ya estaban en v1.0. No hay sub-sustitución: ninguna ocurrencia que designe la unidad de compilación quedó a secas. Los conteos que las filas nuevas de control de cambios declaran como evidencia (§9.5 exige declarar ocurrencias revisadas y cambiadas) se verificaron uno por uno contra los archivados y **cierran exactamente** en los seis documentos.

**Cero hallazgos P0.** Los seis P0 propios de la migración se verificaron y ninguno se cumple: no hay contenido inventado, no hay sección exigida rellenada por inferencia, la procedencia del manifiesto **sigue declarando el conjunto 4.1** en sus catorce filas, no había corrección manual que pisar —los seis archivados son byte a byte idénticos a `HEAD`—, el estado previo está archivado y las seis filas del plan quedan resueltas y declaradas en este informe.

Se emiten **seis hallazgos**: uno P1, dos P2 y tres P3.

| Nivel | Cantidad |
| --- | --- |
| **P0** | **0** |
| **P1** | **1** |
| **P2** | **2** |
| **P3** | **3** |
| **Total** | **6** |

**Veredicto: APROBADO CON OBSERVACIONES.** El corte 1 puede promoverse. El P1 —un término que la categoría precisa, usa en los seis artefactos y no declaró en el glosario raíz— se cierra con una fila de tabla y no requiere reabrir ningún documento de contenido.

---

## 2 · Matriz D1-D9 por documento

Leyenda: **C** conforme · **NC** no conforme · **n/a** no aplica.

| Documento | D1 idioma | D2 encoding | D3 Título-Con-Guiones | D4 versionado | D5 deprecación | D6 trazabilidad | D7 vocabulario fuente | D8 conjunto cerrado | D9 evidencia |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `Vision-Producto.md` | C | C | C | C | C | C | C | n/a | C |
| `Alcance-Producto.md` | C | C | C | C | C | C | C | n/a | C |
| `Roadmap-Producto.md` | C | C | C | C | C | C | C | n/a | C |
| `Compatibilidad-Plataformas.md` | C | C | C | C | C | C | C | n/a | C |
| `Acuerdo-Equipo.md` | C | C | C | C | C | C | C | n/a | C |
| `README.md` | C | C | C | C | C | C | C | n/a | C |

**Evidencia por dimensión.**

- **D1.** Idioma rioplatense técnico en los seis. Sin emojis: el barrido de rangos Unicode de emoji devuelve cero en los seis archivos. Sin negritas decorativas: las negritas que hay marcan términos y decisiones, no énfasis ornamental.
- **D2.** `file` reporta «UTF-8 text» en los seis. Cero caracteres `\r`: terminación LF pura.
- **D3.** Los seis nombres de archivo son ASCII sin acentos, en Título-Con-Guiones: `Vision-Producto.md`, `Alcance-Producto.md`, `Roadmap-Producto.md`, `Compatibilidad-Plataformas.md`, `Acuerdo-Equipo.md`, `README.md`.
- **D4.** Ningún archivo vivo lleva sufijo de versión en el nombre; los seis declaran `**Versión:** 2.0` en la cabecera. Las seis copias archivadas llevan `-v1.0.md` con guion medio, incluido el `README-v1.0.md` que `Rules-Contexto` §3.4 exige versionar al archivarse.
- **D5.** `_legacy/2026-07-30/` contiene los seis estados previos, con la fecha del archivado en el nombre de la carpeta. El archivo con nombre legado `Alcance-Proyecto.md` no quedó duplicado en la carpeta viva: se archivó como `Alcance-Proyecto-v1.0.md` y se escribió el nombre vigente, que es el procedimiento del plan §3.1.
- **D6.** Los seis declaran `Trazabilidad upstream` al `PRODUCT-INTAKE-SelfHosted-Service` con secciones específicas, y `Trazabilidad downstream` con categorías concretas. `README.md` declara además el `PRODUCT-MANIFEST-SelfHosted-Service`. Los treinta y siete enlaces markdown no ancla de la carpeta resuelven, incluidos los dos que apuntan a `_legacy/2026-07-30/` y los dos que apuntan a `../Audit/`. Los cuatro juegos de anclas de tabla de contenido resuelven contra sus títulos, verificados por reconstrucción del slug.
- **D7.** Cero ocurrencias de vocabulario del dominio fuente del bootstrap.
- **D8.** No aplica: ninguno de los seis documentos declara un `tipo_proyecto_codigo` ni ningún valor del conjunto cerrado. Es lo correcto para una categoría de nivel producto.
- **D9.** Las afirmaciones nuevas sobre el estado del sistema son las de las filas de control de cambios y una de `README.md` §4; todas citan evidencia que resuelve. Ver §5 de este informe para el detalle de la verificación de conteos.

**Verificación de D4/D5 sobre las filas históricas.** `SDD-Development-Guide.md` §VI.2 prohíbe reescribir una fila ya escrita. El conteo antes y después lo confirma, y el `diff` muestra que en los seis casos la única alteración de la sección de control de cambios es un apéndice de una línea:

| Documento | Filas en v1.0 | Filas en 2.0 | Marca del `diff` | Filas históricas alteradas |
| --- | --- | --- | --- | --- |
| `Vision-Producto.md` | 4 | 5 | `321a326` | 0 |
| `Alcance-Producto.md` | 3 | 4 | `320a323` | 0 |
| `Roadmap-Producto.md` | 3 | 4 | `294a295` | 0 |
| `Compatibilidad-Plataformas.md` | 2 | 3 | `192a193` | 0 |
| `Acuerdo-Equipo.md` | 1 | 2 | `229a230` | 0 |
| `README.md` | 4 | 5 | `131a134` | 0 |

Las siete menciones de `SOLUTION-INTAKE` / `SOLUTION-MANIFEST` que sobreviven en la carpeta viva están **todas** dentro de filas históricas de control de cambios, salvo una: la de `README.md` §1, que es un enunciado histórico deliberadamente reformulado —«`PRODUCT-INTAKE-SelfHosted-Service` versión 2.2 —que en ese momento se llamaba `SOLUTION-INTAKE-SelfHosted-Service`—»—. Es el tratamiento correcto: el nombre vigente en prosa, el nombre legado como dato del pasado.

---

## 3 · Matriz de estructura obligatoria

### 3.1 Cabecera obligatoria (`Rules-Contexto` §4.1)

| Documento | Producto | Documento | Versión | Estado | Fecha | Autor | Upstream | Downstream | TOC |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `Vision-Producto.md` | C | C | 2.0 | Propuesto | 2026-07-30 | C | C | C | C |
| `Alcance-Producto.md` | C | C | 2.0 | Propuesto | 2026-07-30 | C | C | C | C |
| `Roadmap-Producto.md` | C | C | 2.0 | Propuesto | 2026-07-30 | C | C | C | C |
| `Compatibilidad-Plataformas.md` | C | C | 2.0 | Propuesto | 2026-07-30 | C | C | C | C |
| `Acuerdo-Equipo.md` | C | C | 2.0 | Propuesto | 2026-07-30 | C | C | C | C |
| `README.md` | C | C | 2.0 | Propuesto | 2026-07-30 | C | C | C | C |

La etiqueta de la primera línea de metadatos pasó de `**Proyecto:**` a `**Producto:**` en los seis, sobre el mismo valor de plano producto —`SelfHosted Service`, que es el `Nombre-Producto`—, y el identificador entre paréntesis de `Nombre-Solucion` a `Slug-Producto`. Es exactamente el defecto que el framework corrigió en sí mismo en la entrada `[5.1]`: una etiqueta de un plano puesta sobre el valor de otro.

**Cabecera de nivel producto y R3 (`Vocabulario-Rules` §4 R3).** Conforme en los seis. Ninguna cabecera declara un proyecto de código, y ninguna nombra al producto con `Raiz-Codigo`: la cadena `SelfHosted.Service.Core` no aparece ni una vez en los seis documentos. Donde hay que nombrar estructura de código —`Compatibilidad-Plataformas.md` §2.2 y `Acuerdo-Equipo.md` §5— se nombran las cuatro capas por su sufijo (`Web`, `Application`, `Infrastructure`, `Domain`), que es lo que el intake §12 declara admisible y lo que `README.md` §5 convención 2 declara como regla de la carpeta.

### 3.2 Secciones obligatorias (`Rules-Contexto` §4.2)

| Documento | Secciones exigidas | Presentes | Faltantes | Pendientes emitidas |
| --- | --- | --- | --- | --- |
| `Vision-Producto.md` | §1 a §10 | §1 Problema de negocio · §2 Audiencia y stakeholders · §3 Propuesta de valor · §4 Visión a 3 años · §5 Objetivos SMART · §6 Métricas de éxito · §7 Restricciones · §8 Riesgos · §9 Glosario del dominio · §10 Trazabilidad | ninguna | ninguna |
| `Alcance-Producto.md` | §1 a §10 | §1 Propósito · §2 Descripción general · §3 Objetivos del producto · §4 Alcance incluido · §5 Alcance excluido · §6 Supuestos · §7 Restricciones · §8 Criterios de aceptación del producto · §9 Gestión de cambios de alcance · §10 Trazabilidad | ninguna | ninguna |
| `Roadmap-Producto.md` | §1 a §6 | §1 Propósito · §2 Fases del producto · §3 Matriz fase/épica/etapa/entrega · §4 Dependencias entre fases · §5 Criterios de transición · §6 Trazabilidad downstream | ninguna | ninguna |
| `Compatibilidad-Plataformas.md` | §1 a §6 | §1 Resumen ejecutivo · §2 Matriz de compatibilidad · §3 Restricciones justificadas · §4 Alternativas · §5 Estado de implementación · §6 Trazabilidad downstream | ninguna | ninguna |
| `Acuerdo-Equipo.md` | §1 a §7 | §1 Propósito · §2 Equipo y roles · §3 Cadencia de ceremonias · §4 Acuerdos de trabajo · §5 Definition of Done · §6 Definition of Ready · §7 Herramientas | ninguna | ninguna |
| `README.md` | §3.4 de la regla | §1 Qué contiene · §2 Documentos y orden de lectura · §3 Decisiones de inclusión y omisión · §4 Stakeholders · §5 Convenciones · §6 Brechas abiertas | ninguna | ninguna |

Los dos renombres de sección que `Rules-Contexto` 3.1 §4.2 obliga en `Alcance-Producto.md` —§3 «Objetivos del proyecto» → «Objetivos del producto» y §8 «Criterios de aceptación del proyecto» → «Criterios de aceptación del producto»— se aplicaron, con la tabla de contenido, sus anclas y la tabla de trazabilidad de §10.1 reconciliadas contra los títulos nuevos. Ver H-04 sobre el residuo que dejan.

**Secciones opcionales de §4.3.** Ninguna de las cuatro aplica a `web-monolith` con audiencia de una sola región lingüística y producto no comercial. Ausencia correcta, no omisión.

### 3.3 Criterios de aceptación de `Rules-Contexto` §6

| # | Criterio | Estado | Evidencia |
| --- | --- | --- | --- |
| 1 | Visión en lenguaje de negocio, sin stack ni patrones | C | `Vision-Producto.md` §1 a §4 sin mención de stack. El stack vive en el intake §17.P.1 |
| 2 | Alcance con ≥ 5 capacidades y ≥ 3 exclusiones justificadas | C | 25 filas `F-XX` de capacidad; 5 exclusiones `F-18` a `F-22` en §5.1, cada una con justificación y versión futura |
| 3 | Roadmap con ≥ 3 hitos y criterios `- [ ]` | C | 5 fases más el cierre; 29 criterios de transición en formato `- [ ]` en §5.1 a §5.7 |
| 4 | ≥ 3 objetivos SMART con métrica, target y plazo | C | 5 filas `OBJ-XX` en §5 con métrica, target numérico, plazo y responsable |
| 5 | ≥ 1 stakeholder por categoría de la tríada | C | §2.1: propietario (dueño del problema, agente humano), implementador (equipo de desarrollo, agente IA), beneficiario (administrador del producto) |
| 6 | Glosario con ≥ 10 términos | C | `Vision-Producto.md` §9 tiene 32 entradas, dos de ellas nuevas en esta migración |
| 7 | Compatibilidad declara las plataformas del intake §17.P.9 | C | Matriz de tres ejes en §2.1 y por componente en §2.2, sin cambio respecto de v1.0 |
| 8 | Acuerdo declara herramientas, ceremonias, ramas y SLA | C | §3 ceremonias, §4.1 ramas, §4.5 tiempos de respuesta con su ausencia declarada, §7 herramientas |
| 9 | Cada documento declara upstream y downstream | C | Ver §3.1 de este informe |
| 10 | Ningún archivo vivo con sufijo de versión | C | Ver D4 |
| 11 | Sin emojis, negritas decorativas ni vocabulario del dominio fuente | C | Ver D1 y D7 |
| 12 | TOC en todo documento de más de tres secciones de primer nivel | C | Los seis la tienen, entre cabecera y §1, con anclas de primer y segundo nivel que resuelven |
| 13 | Ninguna prioridad, exclusión, fecha, target ni criterio se origina acá | C | La migración no originó ninguno: el `diff` no toca una sola fila `F-XX`, `OBJ-XX`, `CA-XX`, `AT-XX`, `DoD-XX`, `DoR-XX`, `CP-XX`, `RG-XX`, `RP-XX`, `EP-XX` ni criterio de transición |
| 14 | Todo término que la categoría acuña o precisa y usa en más de un artefacto está en `Vision-Producto.md` §9 | **NC** | **H-01**: «brecha» se usa en los seis artefactos y no está declarado |
| 15 | Ninguna forma desnuda de un término polisémico sin resolver en artefacto que se lee por secciones | C | Ver §5 de este informe |
| 16 | Ninguna polisemia con contextos disjuntos reportada como defecto ni corregida calificando todo | C | Ver §5 de este informe: siete polisemias evaluadas y descartadas |

### 3.4 Criterios de aceptación de `Migracion-Rules.md` §6

| # | Criterio | Estado | Evidencia |
| --- | --- | --- | --- |
| 1 | Fuente de contenido declarada en el plan, con uno de los tres valores | Parcial | El plan §4 declara «documento de origen» para las seis filas. Dos documentos usaron además «documento hermano», valor admitido pero no declarado en el plan. **H-03** |
| 2 | Ninguna sección con contenido ajeno a las tres fuentes | C | Las tres únicas incorporaciones de contenido tienen fuente verificada: ver §4.2 de este informe |
| 3 | Ninguna sección exigida y sin fuente quedó rellenada | C | Ninguna sección exigida por 3.1 quedó sin fuente: la estructura de 2.1 y la de 3.1 coinciden salvo en los dos renombres de título de `Alcance-Producto.md`, que tenían contenido |
| 4 | Estado previo archivado en el `_legacy/` de su propia carpeta | C | Seis archivos en `00-Contexto/_legacy/2026-07-30/`, uno por documento |
| 5 | Contenido sin destino enumerado con su texto localizable | C | No hay: el `diff` no muestra ninguna línea de contenido eliminada en ninguno de los seis |
| 6 | Ninguna corrección manual pisada sin declarar la interpretación | C | No había corrección manual que pisar: los seis archivados son byte a byte idénticos a la versión de `HEAD` (`diff` de cero líneas en los seis) |
| 7 | Cada documento del plan lleva su clasificación de §4.3 | C | Las seis filas del plan §4 declaran «Regenerar contenido» |
| 8 | Intake verificado contra la plantilla vigente, bump major | n/a | Fase M2, fuera del alcance de este corte. Constatado al pasar: el intake está en 3.0, bump major desde 2.4 |
| 9 | Orden de la cadena D6: intake, manifiesto, documentos generados | C | Intake 3.0 (M2) y manifiesto 2.0 (M3) llevan fecha 2026-07-30 y están migrados antes de este corte |
| 10 | Degradación declarada si no había procedencia | n/a | El destino declaraba procedencia. El plan §6 lo declara y no supone ningún origen |
| 11 | Procedencia reescrita solo con la cadena completa | C | Las catorce filas de `PRODUCT-MANIFEST` §1.1 siguen declarando el conjunto **4.1**, con la nota de estado mixto que explica por qué las dos filas de plantilla sí son vigentes. Ningún documento de `00-Contexto` declara procedencia propia |
| 12 | Ninguna fila del plan sin resolver y sin declarar | C | Las seis filas de `00-Contexto` quedan resueltas y declaradas en §4.1 de este informe. Ver H-06 sobre el §8 del plan |
| 13 | Ningún renombre resuelto por inferencia | C | El renombre `Alcance-Proyecto.md` → `Alcance-Producto.md` está literal en el `CHANGELOG.md` del framework, entrada `[5.0]`. Ver H-05 sobre la precisión de la cita |
| 14 | Ninguna sustitución por reemplazo global de cadena | C | Verificado en las dos direcciones y por conteo. Ver §4.3 y §4.4 de este informe |

---

## 4 · Verificación específica de la migración

### 4.1 Estado de las seis filas del plan

| Fila del plan §4 | Clasificación | Fuente declarada | Fuente efectiva | Estado |
| --- | --- | --- | --- | --- |
| `00-Contexto/Vision-Producto.md` | Regenerar contenido | documento de origen | documento de origen + documento hermano (`Alcance-Producto.md` §2.2) + intake §12 | **Resuelta** |
| `00-Contexto/Alcance-Proyecto.md` → `Alcance-Producto.md` | Regenerar contenido | documento de origen | documento de origen | **Resuelta** |
| `00-Contexto/Roadmap-Producto.md` | Regenerar contenido | documento de origen | documento de origen | **Resuelta** |
| `00-Contexto/Compatibilidad-Plataformas.md` | Regenerar contenido | documento de origen | documento de origen | **Resuelta** |
| `00-Contexto/Acuerdo-Equipo.md` | Regenerar contenido | documento de origen | documento de origen | **Resuelta** |
| `00-Contexto/README.md` | Regenerar contenido | documento de origen | documento de origen + cinco documentos hermanos (columna de versión de §2) + intake (confirmación del Product Owner) | **Resuelta** |

Ninguna fila quedó pendiente. Ninguna sección quedó emitida como pendiente por falta de fuente. Ningún contenido quedó sin destino.

### 4.2 Regla de no invención (`Migracion-Rules.md` §4.1)

El `diff` contra la línea de base identifica **tres** incorporaciones de contenido, más la fila de control de cambios de cada documento. Las tres se rastrearon hasta una de las tres fuentes admitidas:

| Incorporación | Dónde | Fuente | Verificación |
| --- | --- | --- | --- |
| Entrada de glosario «Proyecto», tercer referente | `Vision-Producto.md` §9 | Intake §12 | El intake §12 declara los tres sentidos con su contexto y afirma que calificar el tercero produciría una afirmación falsa. La entrada transcribe esa declaración |
| Entrada de glosario «Alcance», dos referentes | `Vision-Producto.md` §9 | Documento hermano `Alcance-Producto.md` §2.2 | La tabla de §2.2 de v1.0 ya declaraba «Alcance del proyecto» y «Alcance 1 a Alcance 4» con esas mismas dos lecturas |
| Confirmación del Product Owner el 2026-07-30 | `README.md` §4 | Intake, cabecera y nota del Product Owner | El intake declara «**Confirmado el 2026-07-30**» en su cabecera y la nota amplía: «El agente humano del proyecto lo confirmó el 2026-07-30, resolviendo la entrada `[R-1]` de la batería de la fase M2». La cita resuelve |

Los tres párrafos de remisión al glosario raíz —`Vision-Producto.md` §9, `Alcance-Producto.md` §2.2 y `README.md` §5 convención 1 y 2— no aportan contenido de negocio: declaran la regla de `Rules-Contexto` 3.1 §6 y la de `Vocabulario-Rules` §4 R3, que son normativa vigente citada, no afirmación sobre el producto.

**No hay cuarta fuente.** No se detectó una sola afirmación sobre el producto, sus plazos, sus targets, sus exclusiones o sus riesgos que no estuviera en la línea de base.

### 4.3 Sobre-sustitución: la dirección P0

**No se detectó ninguna.** Verificación por conteo y por ubicación de cada ocurrencia de la forma calificada «proyecto de código» en los cuerpos de los seis documentos:

| Documento | «proyecto de código» en v1.0 | En 2.0, cuerpo | En 2.0, fila nueva de control de cambios | Ocurrencias nuevas sobre el cuerpo |
| --- | --- | --- | --- | --- |
| `Vision-Producto.md` | 5 | 5 (§9 glosario, líneas 253, 254, 257) | 2 | **0** |
| `Alcance-Producto.md` | 1 | 1 (§2.2, línea 70) | 2 | **0** |
| `Roadmap-Producto.md` | 0 | 0 | 2 | **0** |
| `Compatibilidad-Plataformas.md` | 4 | 4 (§1.1 línea 41, §2.2 línea 83, filas históricas) | 2 | **0** |
| `Acuerdo-Equipo.md` | 4 | 4 (§4.2 línea 112, DoD-11 línea 182, filas históricas) | 2 | **0** |
| `README.md` | 5 | 5 (§3.1 líneas 60 y 64, §5 líneas 96 y 98, fila histórica) | 2 | **0** |

Ni una sola ocurrencia de la entidad del dominio —«proyecto SelfHosted», «variable compartida del proyecto», la etapa `01` proyectos del roadmap— ni del emprendimiento —«agente humano del proyecto», «los objetivos del proyecto», «el alcance del proyecto», «unidad de entrega del proyecto», «el proyecto no verifica», «el proyecto no avanza sin OK explícito»— pasó a la forma calificada. La advertencia del plan §3.5 paso 3 —«un “proyecto de código” puesto sobre la entidad del dominio corrompe la especificación y se lee como correcto»— se respetó.

### 4.4 Sub-sustitución: la dirección P2/P3

**No se detectó ninguna.** Se enumeraron y clasificaron todas las ocurrencias de «proyecto» y «proyectos» de los seis documentos vivos, excluidas las formas ya calificadas. Ninguna designa la unidad de compilación. Los dos lugares donde el cuerpo habla de la unidad de compilación —`Acuerdo-Equipo.md` §4.2 y DoD-11, `Compatibilidad-Plataformas.md` §2.2— ya estaban en la forma completa en v1.0 y siguen estándolo. Los tres compuestos de la excepción de R1 —`multi-proyecto`, `inter-proyecto`, `cross-proyecto`— no aparecen, lo que coincide con la fila R8 del censo del plan.

### 4.5 Verificación de los conteos que las filas de control de cambios declaran

`Vocabulario-Rules.md` §9.5 exige que el registro de una sustitución declare cuántas ocurrencias se revisaron y cuántas se cambiaron, y §10 lo convierte en criterio de aceptación. Las seis filas nuevas lo declaran. Se verificaron contra los archivados y **los seis cierran exactamente**:

| Documento | Lo que la fila declara | Medición sobre el archivado | Cierra |
| --- | --- | --- | --- |
| `Vision-Producto.md` | 13 «solución» de nivel superior sustituidas; 1 «resolución» intacta; 1 identificador de cabecera | 15 ocurrencias de la cadena `soluci` = 13 + 1 «resolución» + 1 `Nombre-Solucion` | Sí |
| `Vision-Producto.md` | 19 «proyecto» a secas; 1 sustituida (etiqueta de cabecera); 18 intactas = 16 emprendimiento + 2 entidad del dominio | 43 totales − 19 «proyecto SelfHosted» − 5 «proyecto de código» = **19** a secas; 16 + 2 = 18 | Sí |
| `Alcance-Producto.md` | 7 «solución» sustituidas; 2 «resolución» intactas | 10 ocurrencias de `soluci` = 7 + 2 «resolución» + 1 `Nombre-Solucion` | Sí |
| `Alcance-Producto.md` | 41 «proyecto» a secas; 10 sustituidas (nombre de artefacto, títulos de sección, etiqueta de cabecera, anclas de TOC); 31 intactas | 58 totales − 16 «proyecto SelfHosted» − 1 «proyecto de código» = **41**; el `diff` muestra exactamente **10** sustituciones: título H1, etiqueta de cabecera, campo `Documento`, dos entradas de TOC con sus dos anclas, dos títulos de sección y una fila de la tabla de trazabilidad | Sí |
| `Roadmap-Producto.md` | 6 ocurrencias de `soluci`: 1 cabecera + 4 nivel superior + 1 «resoluciones» de EP-08 | 6 = 1 `Nombre-Solucion` + 4 + 1 «resoluciones» | Sí |
| `Roadmap-Producto.md` | 19 ocurrencias de «proyecto», ninguna a «proyecto de código»; 3 referencias cruzadas de §1 y §6 al artefacto renombrado | 19 totales; el `diff` muestra las tres referencias cruzadas en las líneas 41, 43 y 284 | Sí |
| `Compatibilidad-Plataformas.md` | 6 ocurrencias de `soluci`: 1 cabecera + 4 nivel superior + 1 dentro de fila histórica que no se reescribe | 6 = 1 `Nombre-Solucion` + 4 sustituidas (§1.1, §1.2, CP-07, última fila de §4) + 1 en la fila v1.0 | Sí |
| `Compatibilidad-Plataformas.md` | 13 ocurrencias de «proyecto» | 13 totales | Sí |
| `Acuerdo-Equipo.md` | 6 ocurrencias de `soluci`: 1 cabecera + 5 nivel superior | 6 = 1 `Nombre-Solucion` + 5 sustituidas (§2, AT-11, nota de §4.2, dos filas de §7) | Sí |
| `Acuerdo-Equipo.md` | 23 ocurrencias de «proyecto» | 23 totales | Sí |
| `README.md` | 7 ocurrencias de `soluci`: 1 cabecera + 6 nivel superior (§3.1 dos veces, §4 dos veces, §5 convención 2 y 4) | 7 = 1 `Nombre-Solucion` + 6 sustituidas en esas seis posiciones exactas | Sí |

Es la evidencia más fuerte contra la hipótesis de reemplazo global: un reemplazo de cadena no produce conteos que discriminen entre «solución», «resolución» y `Nombre-Solucion`, ni una fila que declare cuáles de las cuarenta y una ocurrencias de «proyecto» se tocaron y por qué.

### 4.6 Barridos negativos del plan §3.5 paso 4

Los cinco barridos son obligatorios por corte. Se corrieron los cinco.

| Barrido | Resultado |
| --- | --- |
| `reproducto` y variantes de la corrupción de «re**soluci**ón» | **Cero ocurrencias** en la carpeta viva |
| Supervivencia de «resolución» | Las cinco ocurrencias legítimas de la línea de base están íntegras: `Roadmap-Producto.md` §2.3 EP-08 «con resoluciones ofrecidas», `Alcance-Producto.md` §4.1 F-08 y §6.1 «su resolución sostiene contenido», `Vision-Producto.md` §3.2 DV-04. Las tres ocurrencias adicionales son la palabra citada dentro de filas nuevas de control de cambios que declaran no haberla tocado |
| Cabeceras de tabla de anti-patrones con la columna «Solución» pisada | No aplica: ninguno de los seis documentos tiene tabla de anti-patrones. Constancia del barrido, no omisión |
| Concordancia de género rota: «la producto», «producto técnica», «toda el producto», «una producto», «esta producto» | **Cero ocurrencias.** Las trece sustituciones de `Vision-Producto.md` y las siete de `Alcance-Producto.md` rehicieron artículo, demostrativo, posesivo y adjetivo. Los dos casos difíciles se resolvieron bien: «Solución liviana» → «Producto liviano» (`Vision-Producto.md` RE-06) y «La solución debe ser liviana» → «El producto debe ser liviano» (`Alcance-Producto.md` RE-06); «toda la solución» → «todo el producto» (`Acuerdo-Equipo.md` AT-11) |
| Conteo de filas de control de cambios antes y después | Ver §2 de este informe: seis documentos, seis apéndices de una fila, cero filas históricas alteradas |

### 4.7 Los seis hallazgos P0 de `Master-Prompt-Migracion.md` §10

| # | Hallazgo P0 | Verificación | Resultado |
| --- | --- | --- | --- |
| 1 | Contenido que no proviene del origen, de un hermano, del intake o del humano | `diff` completo contra la línea de base; las tres incorporaciones rastreadas en §4.2 | **No se cumple** |
| 2 | Sección exigida rellenada con contenido inferido en lugar de emitida como pendiente | Ninguna sección exigida por 3.1 carecía de fuente; la estructura de 2.1 y 3.1 coinciden salvo dos renombres de título con contenido preexistente | **No se cumple** |
| 3 | Procedencia reescrita con migración parcial | Las catorce filas de `PRODUCT-MANIFEST` §1.1 siguen declarando el conjunto **4.1**, el `Master-Prompt` 4.1 y `Rules-Contexto` 2.1. La nota de estado mixto declara por qué las dos filas de plantilla sí son vigentes y qué falta para cerrar. Ningún documento de `00-Contexto` adelantó nada a 6.0 | **No se cumple** |
| 4 | Corrección manual pisada sin declarar la interpretación | Los seis archivados son byte a byte idénticos a la versión de `HEAD`: no existía corrección manual sobre esta carpeta | **No se cumple** |
| 5 | Estado previo no archivado en el `_legacy/` de su carpeta | Los seis están en `00-Contexto/_legacy/2026-07-30/`, con sufijo `-v1.0.md` | **No se cumple** |
| 6 | Fila del plan sin resolver y sin declarar | Las seis filas resueltas y declaradas en §4.1 de este informe | **No se cumple** |

---

## 5 · Coherencia cross-doc y gobierno del glosario

### 5.1 Coherencia cross-doc

| Verificación | Resultado |
| --- | --- |
| Referencias entre archivos de la fase | Los 37 enlaces markdown no ancla resuelven, verificados por existencia en disco. Las 5 referencias cruzadas al artefacto renombrado dentro de la categoría (`Roadmap-Producto.md` §1 y §6, `Acuerdo-Equipo.md` §4.5 y §6, `README.md` §2) apuntan a `Alcance-Producto.md` y resuelven |
| Enlaces a `_legacy/2026-07-30/` | Los dos que existen —`Vision-Producto.md` y `Alcance-Producto.md`, en sus filas de control de cambios— resuelven. Los otros cuatro documentos citan la carpeta en texto monoespaciado sin enlazar, lo cual es admisible |
| Anclas de tabla de contenido | Los seis juegos resuelven contra sus títulos, incluidas las dos anclas reescritas de `Alcance-Producto.md` |
| IDs no duplicados | Sin duplicados en las series `F-XX`, `OBJ-XX`, `OP-XX`, `CA-XX`, `RG-XX`, `RP-XX`, `RE-XX`, `CP-XX`, `EP-XX`, `AT-XX`, `DoD-XX`, `DoR-XX`, `DV-XX`, `PT-XX`. Ninguna serie cambió respecto de la línea de base |
| Coherencia de la columna de versión | `README.md` §2 declara los cinco documentos en 2.0, coincidente con el campo `Versión` de cada cabecera |
| Coherencia con el upstream migrado | Los seis nombran el intake y el manifiesto por su nombre vigente. La convención de vocabulario que `README.md` §5 fija coincide con la tabla de tres sentidos del intake §12 |
| Referencias entrantes desde fuera del corte | **5 enlaces markdown de `01-Necesidades-Negocio` al nombre legado quedan sin resolver.** Ver H-02 |

### 5.2 Gobierno del glosario, los cuatro criterios

**Criterio 1 — Sin contradicciones.** Conforme. Ningún término tiene dos definiciones incompatibles entre los seis artefactos. El caso que podía producirla se resolvió bien: la tabla de `Alcance-Producto.md` §2.2 dejó de ser una definición propia y pasó a declararse clave de lectura del documento, remitiendo a `Vision-Producto.md` §9 como definición canónica. Las dos tablas dicen lo mismo sobre «alcance del proyecto», «Alcance 1 a 4», «Proyecto», «Proyecto SelfHosted» y «Proyecto de código».

**Criterio 2 — Completitud.** **No conforme, un caso.** «Brecha» es un término que la categoría precisa —el intake lo usa nueve veces sin definirlo, y la categoría le agrega el destinatario y el «registro de brechas» como mecanismo— y aparece en los seis artefactos: `Alcance-Producto.md` 13 veces con su §6.3 dedicada, `README.md` 12 con su §6, `Roadmap-Producto.md` 9 con su §2.6, `Vision-Producto.md` 9, `Compatibilidad-Plataformas.md` 2 y `Acuerdo-Equipo.md` 1, donde DoR-11 remite al «registro de brechas» de otro documento. No está declarado en `Vision-Producto.md` §9. Es **H-01**.

Los demás términos que la categoría acuña o precisa y usa en más de un artefacto sí están declarados: «etapa», «punto de control», «puerta técnica», «hito demostrable», «hito interno», «informe de cierre», «proyecto SelfHosted», «proyecto de código», «proyecto», «alcance», «capa».

**Criterio 3 — Polisemia gobernada.** Conforme. La única familia con más de un referente dentro de la fase es «proyecto», y tiene entrada de glosario que declara los tres, más la clave de lectura de `Alcance-Producto.md` §2.2 y la convención 1 de `README.md` §5. Ninguna forma desnuda de una familia calificada quedó sin resolver en una sección que se despacha por separado: el criterio de colisión de `Vocabulario-Rules.md` §9.2 —el contexto de lectura es la sección— se aplicó sección por sección sobre los seis documentos.

**Criterio 4 — Criterio negativo.** Se evaluaron siete polisemias y **las siete se descartan**. Se enumeran acá, con la razón, para que la ronda siguiente no las vuelva a levantar.

| # | Término | Referentes en la carpeta | Por qué no es hallazgo |
| --- | --- | --- | --- |
| 1 | **«proyecto»** | (a) entidad del dominio: el agrupador de servicios del lienzo; (b) unidad de compilación; (c) emprendimiento | Los tres contextos son disjuntos —producto, código, proceso— y están **declarados** en el intake §12 y en `Vision-Producto.md` §9. El intake declara además que calificar el tercero **produciría una afirmación falsa**. Convertir cualquier ocurrencia de (a) o (c) sería el daño P0 que esta migración evitó. Reportar la coexistencia como defecto es el falso positivo que `Vocabulario-Rules.md` §9.1 describe y que su §10 y `Master-Prompt.md` §10 declaran defecto del informe |
| 2 | **«alcance»** | (a) el alcance del proyecto —qué se construye y qué no—; (b) cada uno de los cuatro incrementos declarados por el cliente | Declarado con sus dos referentes en `Vision-Producto.md` §9 y en `Alcance-Producto.md` §2.2. El segundo va **siempre con su número** —«el Alcance 1»— y el primero no lleva número nunca: la distinción es tipográficamente decidible dentro de cualquier sección |
| 3 | **«migración»** | (a) migración de esquema de datos del producto documentado (`Acuerdo-Equipo.md` §4.2 AT-13 y §7); (b) migración normativa del framework (filas nuevas de control de cambios) | Es exactamente el par R2 contra R3 que `Vocabulario-Rules.md` §9.6 resuelve con **«nada»**, por contextos disjuntos, y que declara explícitamente «para que una ronda de auditoría posterior no lo levante como hallazgo». El sentido (b) va calificado en la primera mención de su sección en los seis documentos, que es lo que §9.6 exige fuera de los dos archivos de forma desnuda admitida |
| 4 | **«solución»** | (a) dentro de «re**soluci**ón»; (b) dentro de filas históricas de control de cambios | No queda ninguna ocurrencia de «solución» designando el nivel superior ni el agrupador de construcción. Las supervivientes no son usos del término: una es subcadena de otra palabra y la otra es registro histórico que §VI.2 prohíbe reescribir |
| 5 | **«registro»** | (a) registro de cambios; (b) registro de brechas; (c) registros del contenedor; (d) imagen de registro público; (e) registros de decisión | Es el caso literal del ejemplo de `Vocabulario-Rules.md` §9.2, y las cinco formas están **calificadas**. Las cuatro ocurrencias desnudas —`Acuerdo-Equipo.md` AT-20 y §4.5, `Compatibilidad-Plataformas.md` §4, `Vision-Producto.md` §1.2, `Alcance-Producto.md` OP-01— son anafóricas dentro de su propia fila o sustantivos de prosa corriente, en secciones disjuntas de las de despliegue donde viven (c) y (d). Calificarlas es la corrección que §9.1 declara defecto |
| 6 | **«servicio»** | (a) la configuración de un contenedor dentro de un proyecto SelfHosted; (b) «acuerdo de nivel de servicio» en `Acuerdo-Equipo.md` §4.5 | (a) está declarado en `Vision-Producto.md` §9. (b) es un compuesto lexicalizado de tres palabras que ningún lector confunde con la entidad del modelo, y vive en la sección de comunicación del equipo, disjunta de las de capacidades y despliegue |
| 7 | **«capa»** | (a) cada una de las cuatro divisiones internas del proyecto de código; (b) «una capa de protección adicional» en `Compatibilidad-Plataformas.md` §4 | (a) está declarado en `Vision-Producto.md` §9 y siempre lleva su sufijo entre acentos graves —«la capa `Domain`»—. (b) es prosa corriente. La distinción es decidible por la forma |

---

## 6 · Hallazgos

### H-01 · P1 · «Brecha», término que la categoría precisa y usa en los seis artefactos, no está declarado en el glosario raíz

**Archivo:** `SDD/Docs/00-Contexto/Vision-Producto.md`
**Sección:** §9 Glosario del dominio

**Evidencia.** `Rules-Contexto` 3.1 §6 incorpora el criterio «todo término que esta categoría acuña o precisa, y que aparece en más de uno de sus artefactos, está declarado en `Vision-Producto.md` §9, el glosario del dominio del cliente, con sus referentes cuando tiene más de uno. Es el glosario raíz de la cadena: 02 y 03 referencian sus términos en lugar de redefinirlos». Es uno de los tres criterios que el salto 2.1 → 3.1 agrega, y por lo tanto uno de los que la migración de esta categoría existía para cerrar.

«Brecha» aparece en los seis artefactos, con una densidad que descarta el uso ocasional: `Alcance-Producto.md` 13 veces, con la sección §6.3 «Brechas abiertas y su destinatario» dedicada; `README.md` 12, con la sección §6 «Brechas abiertas consolidadas»; `Roadmap-Producto.md` 9, con §2.6 «Brechas del roadmap declaradas»; `Vision-Producto.md` 9; `Compatibilidad-Plataformas.md` 2; `Acuerdo-Equipo.md` 1, y esa una es estructural: «DoR-11 es el que conecta esta definición con el registro de brechas del [Alcance del Producto](Alcance-Producto.md) §6.3».

El término no viene definido de arriba: el intake lo usa nueve veces sin entrada de glosario y sin la noción de destinatario. Lo que la categoría precisa es su forma operativa —una decisión de producto que esta categoría **declara con su destinatario en lugar de resolver**, y que constituye el «registro de brechas» que `Acuerdo-Equipo.md` DoR-11 y `Alcance-Producto.md` CA-10 usan como control—. Es, de hecho, el mecanismo con el que la categoría materializa la frontera de autoridad que `Rules-Contexto` 2.1 le impuso y que `README.md` §5 convención 4 declara. Sin entrada de glosario, 02 y 03 no tienen término al que referenciar y van a redefinirlo, que es exactamente lo que el criterio existe para impedir.

La migración sí agregó las dos entradas de la familia «proyecto» y la entrada «alcance», de modo que el criterio se aplicó parcialmente y no se ignoró.

**Por qué es P1 y no P0.** No rompe trazabilidad, no omite un documento obligatorio, no introduce vocabulario prohibido y no falta ninguna cabecera. Es un incumplimiento del §6 del archivo de reglas de la categoría, que `Master-Prompt.md` §10 clasifica como P1.

**Recomendación.** Agregar una fila a `Vision-Producto.md` §9, con la definición tomada de los documentos hermanos que ya la usan —`Alcance-Producto.md` §6.3 y `README.md` §5 convención 4— y no redactada de cero, para no incurrir en la regla de no invención. Forma sugerida: «Brecha — Decisión de producto que la categoría 00 no resuelve y declara con su destinatario y con qué falta decidir. El conjunto forma el registro de brechas, que `Alcance-Producto.md` §6.3 consolida y que DoR-11 y CA-10 usan como control». Evaluar en la misma pasada dos candidatos secundarios que quedan por debajo del umbral y que esta auditoría no eleva a hallazgo: «corte vertical», que viene del intake §15 sin precisarse acá, y «fase» del roadmap, que es genérico.

---

### H-02 · P2 · Cinco enlaces de `01-Necesidades-Negocio` al artefacto renombrado quedan sin resolver tras el corte 1

**Archivos:** `SDD/Docs/01-Necesidades-Negocio/Necesidades-Negocio.md` (4 enlaces) y `SDD/Docs/01-Necesidades-Negocio/Necesidades-De-Negocio/NB-04-Alta-De-Servicio-Sin-Copiar-Y-Adaptar.md` (1 enlace)
**Sección:** tablas de trazabilidad upstream y de brechas

**Evidencia.** El corte 1 renombró `Alcance-Proyecto.md` a `Alcance-Producto.md` y borró el archivo con el nombre legado, que es el procedimiento correcto del plan §3.1. La categoría 01 todavía no se migró —sus diez filas del plan §4 siguen abiertas— y conserva cinco enlaces markdown de la forma `[Alcance-Proyecto.md](../00-Contexto/Alcance-Proyecto.md)`, que ahora no resuelven. Verificado por existencia en disco: el destino no existe.

**Por qué es P2 y no P1.** Es un estado transitorio inherente a una migración por cortes, que `Migracion-Rules.md` §4.6 admite como legítimo, y el plan §4 ya declara las diez filas de 01 como pendientes. Dentro del alcance auditado —`00-Contexto`— la coherencia cross-doc se sostiene íntegra. `Master-Prompt.md` §10 sitúa en P2 lo que se documenta y se sigue.

**Recomendación.** El corte 2 de M4 los cierra al migrar 01, y el plan §3.5 ya prevé la reescritura de las referencias cruzadas del renombre (fila R5 del censo, 50 ocurrencias). Si la migración se detuviera antes del corte 2, M5 **no debe** cerrar la procedencia y el informe de M6 tiene que enumerar estos cinco enlaces como consecuencia declarada del estado parcial.

---

### H-03 · P2 · La columna «fuente de contenido» del plan declara menos de lo que dos documentos usaron

**Archivo:** `SDD/Docs/Audit/Plan-Migracion-4.1-a-6.0.md`
**Sección:** §4, filas de `00-Contexto/Vision-Producto.md` y `00-Contexto/README.md`

**Evidencia.** `Migracion-Rules.md` §2.1 declara que la columna de fuente de contenido «es la forma en que §4.1 se vuelve verificable fila por fila», con exactamente tres valores admitidos. El plan declara «documento de origen» para las seis filas de la categoría. Dos documentos usaron además, correctamente, la segunda fuente admitida:

- `Vision-Producto.md` §9 toma la entrada de glosario «Alcance» del documento hermano `Alcance-Producto.md` §2.2, y así lo declara su fila de control de cambios: «que hasta ahora vivían en el documento hermano de alcance».
- `README.md` §2 toma la columna de versión de los cinco documentos hermanos, y su fila lo declara: «más los cinco documentos hermanos para la columna de versión de §2». Su §4 toma además la confirmación del Product Owner del intake migrado.

Las fuentes son legítimas y están declaradas **en los documentos**; lo que no coincide es la fila del plan, que es el artefacto donde el criterio 1 de §6 pide que la declaración viva.

**Por qué es P2 y no P1.** No hay invención: las tres incorporaciones se rastrearon hasta una fuente admitida (§4.2 de este informe) y las dos filas de control de cambios las declaran con precisión. El defecto es de registro en el contrato entre orquestadores, no de contenido.

**Recomendación.** Al cerrar el corte, actualizar la columna de las dos filas a «documento de origen + documento hermano». Verificar la misma columna en las filas de los cortes siguientes antes de despachar: el patrón «documento de origen» por defecto para todas las filas de una categoría es la forma en que este defecto se propaga.

---

### H-04 · P3 · `Alcance-Producto.md` §3 y §8: el título dice «del producto» y el cuerpo dice «del proyecto»

**Archivo:** `SDD/Docs/00-Contexto/Alcance-Producto.md`
**Secciones:** §3 Objetivos del producto, §8 Criterios de aceptación del producto

**Evidencia.** `Rules-Contexto` 3.1 §4.2 exige los títulos «§3 Objetivos del producto» y «§8 Criterios de aceptación del producto», y la migración los aplicó, con la tabla de contenido y sus anclas reconciliadas. El cuerpo, en cambio, conserva correctamente el vocabulario de la fuente, que habla del emprendimiento: §3 dice «Siete objetivos de proyecto», su tabla tiene la columna «Objetivo del proyecto», sus identificadores son `OP-XX`, y §8 dice «Diez criterios... provienen de §22.3 del intake», sección que el intake titula «Objetivos de proyecto, entregables, ambientes y criterios de aceptación». La tabla de trazabilidad de §10.1 registra la fila como «§8 Criterios de aceptación», sin calificar.

El resultado es un título que anuncia objetivos de producto sobre una tabla de objetivos de proyecto. Un lector que reciba §3 como sección suelta —el contexto de lectura de un subagente, según `Vocabulario-Rules.md` §9.2— lee dos referentes distintos en cuatro líneas.

**Por qué es P3 y no más.** La migración hizo lo correcto en las dos mitades: obedeció el título que la normativa vigente impone y **no** convirtió el cuerpo, que habría sido la sobre-sustitución P0. La tensión es entre `Rules-Contexto` 3.1 §4.2 y el sentido de emprendimiento que el intake §12 declara intocable, y no es un defecto que este documento pudiera resolver por su cuenta. La fila de control de cambios declara el renombre y su fundamento.

**Recomendación.** Una línea de nota bajo cada título, con fuente en el propio documento y en el intake §22.3, que declare que la sección conserva los identificadores `OP-XX` y `CA-XX` del emprendimiento porque así los emite la fuente, y que el título responde a `Rules-Contexto` 3.1 §4.2. Alternativa de costo cero: dejarlo y anotarlo como punto abierto para el framework, ya que el conflicto es de la regla y va a reaparecer en todo destino donde §3 y §8 tengan contenido de proyecto.

---

### H-05 · P3 · La cita del `CHANGELOG.md` nombra un sub-bloque que no contiene el renombre

**Archivos:** `SDD/Docs/00-Contexto/Alcance-Producto.md` (fila 2.0 de control de cambios) y `SDD/Docs/00-Contexto/README.md` §2 y fila 2.0
**Origen:** `SDD/Docs/Audit/Plan-Migracion-4.1-a-6.0.md` §3

**Evidencia.** Los dos documentos declaran que el renombre fue «leído del bloque de impacto sobre destinos existentes de la entrada `[5.0]` del `CHANGELOG.md` del framework y no inferido». En el `CHANGELOG.md` de `IA/IA.SDD`, la entrada `[5.0] - 2026-07-29` sí declara el renombre de forma literal —«**Artefactos generados**: `Alcance-Proyecto.md` → `Alcance-Producto.md` (elimina el sentido «emprendimiento» del árbol)»— pero lo hace en el sub-bloque `### Cambiado`, línea 158. El sub-bloque `### Impacto sobre destinos existentes` de esa misma entrada contiene un único párrafo sobre reconciliación y las tres salidas, y no menciona ningún renombre de artefacto.

La afirmación de fondo es **verdadera y verificada**: el renombre está declarado literalmente en la entrada citada y no se resolvió por inferencia, que es lo que el criterio 13 de `Migracion-Rules.md` §6 exige. Lo impreciso es el nombre del sub-bloque.

**Por qué es P3 y no P0.** `Master-Prompt.md` §10 califica de P0 «una evidencia que no resuelve». Ésta resuelve: apunta al archivo correcto, a la entrada correcta, y el texto citado está ahí, verbatim, a un encabezado de distancia. La imprecisión no cambia el hecho verificado ni ninguna decisión que dependa de él. La expectativa de que los renombres vivan en ese sub-bloque viene de `Migracion-Rules.md` §3, y la imprecisión se origina en el plan §3, que la formula así para las dos entradas: los documentos la heredaron correctamente de su contrato.

**Recomendación.** Corregir la cita a «el bloque **Cambiado** de la entrada `[5.0]`» en los dos documentos y en el plan §3. Como corrección de fondo, evaluar en el repositorio fuente si `SDD-Development-Guide.md` §VI.4 debería exigir que los renombres de artefacto se repitan en «Impacto sobre destinos existentes», que es donde `Migracion-Rules.md` §3 dice que la migración los va a buscar. Eso último es del framework y no de este destino.

---

### H-06 · P3 · El §8 del plan sigue declarando las 143 filas sin resolver después de cerrar el corte 1

**Archivo:** `SDD/Docs/Audit/Plan-Migracion-4.1-a-6.0.md`
**Sección:** §8 Estado de las filas

**Evidencia.** El §8 dice: «Se completa durante M4 y se cierra en el informe de M6. Al emitirse este plan, las 143 filas —141 documentos emitidos, 1 artefacto ausente y los 2 documentos de entrada— están **sin resolver**». A la fecha de esta auditoría hay ocho filas resueltas: el intake (M2), el manifiesto (M3) y las seis de `00-Contexto` (M4 corte 1). El plan sigue en versión 1.1, con la fecha de su aprobación, y no registra ninguna.

**Por qué no es el P0 número 6.** El P0 es «una fila del plan sin resolver **y sin declarar**». Las seis filas de este corte están resueltas —los seis documentos existen en 2.0 con su archivado— y quedan declaradas, con su fuente efectiva, en §4.1 de este informe. La conjunción del P0 no se cumple. Es un defecto de registro del avance, no un estado no declarado.

**Recomendación.** Anotar en el §8 del plan las ocho filas cerradas con su corte y su fecha, o declarar explícitamente que el estado por fila se lleva en los informes de audit de cada corte y se consolida en M6. La segunda opción es más barata y evita mantener dos registros del mismo dato. Sea cual sea, M5 no puede correr su verificación de «ninguna fila del plan sin resolver» contra un §8 que dice que están todas sin resolver.

---

## 7 · Veredicto

### APROBADO CON OBSERVACIONES

**Cero hallazgos P0.** Los seis hallazgos P0 propios de una migración normativa se verificaron uno por uno y ninguno se cumple. La procedencia sigue declarando el conjunto 4.1 en las catorce filas que corresponden, que es la condición que hace legítima una migración parcial. No hay invención, no hay relleno inferido, no hay corrección manual pisada, no hay estado previo sin archivar y no hay fila sin resolver ni sin declarar.

**El punto crítico está resuelto en las dos direcciones.** Cero ocurrencias de sobre-sustitución sobre los sentidos de entidad del dominio y de emprendimiento, y cero ocurrencias de sub-sustitución sobre el sentido de unidad de compilación. Los conteos declarados como evidencia cierran exactamente contra la línea de base en los seis documentos, lo cual es la prueba positiva de que la sustitución se hizo por ocurrencia y no por reemplazo global.

**Conteo final:** P0 = 0 · P1 = 1 · P2 = 2 · P3 = 3 · total = 6.

### Condiciones para promover

| # | Condición | Bloquea el corte 2 |
| --- | --- | --- |
| 1 | Cerrar **H-01**: agregar la entrada «brecha» a `Vision-Producto.md` §9, con contenido tomado de los documentos hermanos que ya la usan. `Vision-Producto.md` no sube de versión por esto si la corrección se absorbe dentro de la versión de emisión, según la política de versionado de `Master-Prompt.md` §5; si sube, la fila nueva cita este hallazgo | **Sí.** Es un incumplimiento de §6 del archivo de reglas de la categoría, y la categoría es el glosario raíz que 01, 02 y 03 van a referenciar en los cortes siguientes |
| 2 | Cerrar **H-03**: corregir la columna de fuente de contenido de las dos filas del plan | No, pero antes de M6 |
| 3 | Cerrar **H-02** al migrar 01 en el corte 2, o enumerar los cinco enlaces en el informe de M6 si la migración se detiene antes | No |
| 4 | Cerrar **H-05** y **H-06** en la pasada de higiene del plan, junto con la condición 2 | No |
| 5 | Decidir sobre **H-04**: nota aclaratoria en `Alcance-Producto.md` §3 y §8, o punto abierto elevado al framework | No |

Con la condición 1 cerrada, el corte 1 de M4 queda apto para promover y el corte 2 —categoría `01-Necesidades-Negocio`— puede despacharse.

---

## Control de cambios

| Versión | Fecha | Cambios | Autor |
| --- | --- | --- | --- |
| 1.0 | 2026-07-30 | Auditoría independiente de la ronda 1 del corte 1 de la fase M4 de la migración normativa 4.1 → 6.0, sobre los seis entregables de `00-Contexto` en versión 2.0, contra `Rules-Contexto` 3.1, `Vocabulario-Rules` 2.1, los catorce criterios de `Migracion-Rules` 1.0 §6, la matriz de `Master-Prompt` §10 y los seis hallazgos P0 de `Master-Prompt-Migracion` §10. Cero P0. Seis hallazgos: uno P1 por el término «brecha» ausente del glosario raíz, dos P2 por cinco enlaces entrantes sin resolver desde la categoría 01 y por la columna de fuente de contenido del plan, tres P3 por el residuo de los dos renombres de sección de `Alcance-Producto.md`, la cita imprecisa del sub-bloque del `CHANGELOG.md` y el §8 del plan sin actualizar. Se enumeran siete polisemias evaluadas y descartadas por contextos disjuntos, para que la ronda siguiente no las levante. Veredicto: APROBADO CON OBSERVACIONES, con una condición bloqueante para el corte 2. | Auditor independiente (Arquitecto de Soluciones + QA Senior) |
