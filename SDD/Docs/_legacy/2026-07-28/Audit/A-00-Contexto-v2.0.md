# Re-audit de Fase A — Categoría 00-Contexto

**Solución:** SelfHosted.Service.Core (`Nombre-Solucion`: SelfHosted-Service-Core, `NombreSolucionCodigo`: SelfHosted; proyecto principal SelfHosted-Web, `web-monolith`)
**Fase:** A — Fundamentos de la solución
**Categoría auditada:** 00-Contexto (nivel solución, variante `web-monolith` de `Rules-Contexto.md` §1.2)
**Alcance:** `SDD/Docs/00-Contexto/`, seis archivos: `Vision-Producto-v1.0.md`, `Alcance-Proyecto-v1.0.md`, `Roadmap-Producto-v1.0.md`, `Compatibilidad-Plataformas-v1.0.md`, `Acuerdo-Equipo-v1.0.md` y `README.md`. Se audita además, por mandato del despacho, la consolidación del intake a la versión 1.1 contra `Master-Prompt.md` §13
**Naturaleza:** re-auditoría posterior a corrección. Sucede al informe `A-00-Contexto-v1.0.md`, que devolvió RECHAZADO con 1 P0, 2 P1, 3 P2 y 5 P3. No es una verificación acotada al cierre de esos once hallazgos: se auditó el cuerpo completo con criterio pleno, porque una corrección puede introducir defectos nuevos
**Reglas aplicadas:** `Rules-Contexto.md` v1.5 (§2.1, §2.2, §3, §4.1 a §4.5, §5, §6), `Master-Prompt.md` v3.6 (§3.5, §5, §9, §10, §13)
**Insumos upstream cotejados:** `SDD/Intake/SOLUTION-INTAKE-SelfHosted-Service-Core-v1.1.md` (fuente de verdad upstream), `SDD/Intake/SOLUTION-MANIFEST-SelfHosted-Service-Core-v1.0.md`, `SDD/Intake/_legacy/2026-07-27/SOLUTION-INTAKE-SelfHosted-Service-Core-v1.0.md` (para verificar la atomicidad y el alcance real del cambio)
**Auditor:** Arquitecto de Soluciones más QA Senior, independiente, sin participación en la generación de la Fase A ni en la primera auditoría
**Fecha:** 2026-07-27
**Documento:** A-00-Contexto-v2.0.md
**Versión:** 2.0

## Tabla de contenido

- [1. Resumen ejecutivo](#1-resumen-ejecutivo)
- [2. Criterio aplicado en la frontera P0 / P1](#2-criterio-aplicado-en-la-frontera-p0--p1)
- [3. Matriz D1 a D9 por documento](#3-matriz-d1-a-d9-por-documento)
- [4. Matriz de estructura obligatoria por documento](#4-matriz-de-estructura-obligatoria-por-documento)
  - [4.1 Cabecera y tabla de contenido](#41-cabecera-y-tabla-de-contenido)
  - [4.2 Secciones obligatorias de §4.2](#42-secciones-obligatorias-de-42)
  - [4.3 Tablas tipo de §4.4](#43-tablas-tipo-de-44)
  - [4.4 Anti-patrones de §4.5](#44-anti-patrones-de-45)
  - [4.5 Criterios de aceptación de §6](#45-criterios-de-aceptación-de-6)
- [5. Coherencia cross-doc](#5-coherencia-cross-doc)
  - [5.1 Enlaces, anclas e identificadores](#51-enlaces-anclas-e-identificadores)
  - [5.2 Coherencia sobre el estado de los supuestos](#52-coherencia-sobre-el-estado-de-los-supuestos)
- [6. Fidelidad al upstream](#6-fidelidad-al-upstream)
- [7. Auditoría de la consolidación del intake contra Master-Prompt §13](#7-auditoría-de-la-consolidación-del-intake-contra-master-prompt-13)
- [8. Estado de los once hallazgos de la primera auditoría](#8-estado-de-los-once-hallazgos-de-la-primera-auditoría)
- [9. Hallazgos nuevos](#9-hallazgos-nuevos)
- [10. Lo que se verificó y no es hallazgo](#10-lo-que-se-verificó-y-no-es-hallazgo)
- [11. Veredicto final y condiciones para promover](#11-veredicto-final-y-condiciones-para-promover)
- [12. Verificación de cierre de los nueve hallazgos](#12-verificación-de-cierre-de-los-nueve-hallazgos)
  - [12.1 Alcance y método de esta verificación](#121-alcance-y-método-de-esta-verificación)
  - [12.2 Estado de cierre, hallazgo por hallazgo](#122-estado-de-cierre-hallazgo-por-hallazgo)
  - [12.3 Verificación específica del contenido operativo de AT-26 y AT-28](#123-verificación-específica-del-contenido-operativo-de-at-26-y-at-28)
  - [12.4 Verificación específica del respaldo del intake §10](#124-verificación-específica-del-respaldo-del-intake-10)
  - [12.5 Defectos nuevos introducidos por esta ronda](#125-defectos-nuevos-introducidos-por-esta-ronda)
  - [12.6 Lectura sobre el criterio de no subir versión](#126-lectura-sobre-el-criterio-de-no-subir-versión)
  - [12.7 Precisión sobre este propio informe](#127-precisión-sobre-este-propio-informe)
  - [12.8 Condiciones para promover y veredicto final](#128-condiciones-para-promover-y-veredicto-final)
- [Control de cambios](#control-de-cambios)

---

## 1. Resumen ejecutivo

Se re-auditaron los seis entregables completos y la consolidación del intake a la versión 1.1. Los once hallazgos de la primera auditoría están cerrados, los once: el P0 de fidelidad se cerró de forma sustantiva y no cosmética, porque el intake v1.1 publica ahora una tabla de estado por supuesto y cada afirmación de los documentos se corresponde con lo que esa tabla dice, incluida la distinción entre los tres mecanismos de cierre; las veintisiete anclas rotas resuelven (se verificaron las ochenta y seis anclas internas de los seis archivos, cero rotas); y el horario core quedó redactado como regla operativa verificable, no como omisión disimulada.

La corrección introdujo defectos nuevos, ninguno bloqueante. Hallazgos nuevos: 0 P0, 1 P1, 5 P2 y 3 P3, nueve en total. El P1 es que el cierre del P1-02 se apoya en una decisión atribuida al agente humano y fechada, que ningún artefacto de la cadena registra: es el mismo modo de falla que originó el P0-01, en escala menor y sin contradecir al intake. Cinco de los nueve son contra el orquestador y viven en los artefactos de intake: el título del intake v1.1 sigue diciendo v1.0, la entrada de control de cambios no es atómica, la generalización sobre el marcador `[S]` deja leer como cerrada la matriz de navegadores, y el manifiesto se reescribió sin entrada de control de cambios y con una fila que se contradice a sí misma.

Veredicto: APROBADO CON OBSERVACIONES. Lo abierto sigue abierto —CL-04, CL-15 y la matriz de navegadores están declarados como pendientes en los tres lugares que corresponde— y no se detectó ninguna fecha de calendario inventada ni ninguna cifra de presupuesto monetario.

## 2. Criterio aplicado en la frontera P0 / P1

`Master-Prompt.md` §10 define P0 como "falta cabecera o checklist de §6" y P1 como "incumplimiento de §6 sin romper trazabilidad". La frontera se resolvió con dos decisiones declaradas, para que el veredicto sea auditable.

Primera. El "checklist de §6" no es una sección de los documentos entregables. `Rules-Contexto.md` §6 es la lista de criterios de aceptación del entregable, y `Master-Prompt.md` §8 la pide como punto 4 de la devolución del subagente al orquestador, no como contenido de los archivos generados. Su ausencia dentro de los seis archivos no se computa como P0. Los doce criterios se verificaron directamente en §4.5 de este informe, por conteo propio.

Segunda. Una afirmación sin respaldo se computa P0 sólo cuando la fuente citada la desmiente o cuando propaga aguas abajo un valor cerrado que en realidad está abierto. Cuando la fuente simplemente calla y el contenido operativo es derivable de lo que la fuente sí declara, se computa P1: la cadena no queda cargando un dato falso, pero la cita no existe. Es el criterio con el que se calificó el hallazgo N-01. Se deja constancia de que la calificación es discutible en el sentido estricto, y de que N-01 es la única corrección exigible antes de promover.

## 3. Matriz D1 a D9 por documento

Leyenda: C cumple, C-obs cumple con observación, NC no cumple, NA no aplica.

| Invariante | Vision | Alcance | Roadmap | Compatibilidad | Acuerdo | README |
|---|---|---|---|---|---|---|
| D1 idioma rioplatense neutro técnico, tildes y eñes en el cuerpo, filename ASCII | C | C | C | C | C | C |
| D2 UTF-8, EOL LF, tablas con encabezado completo y sin placeholders | C | C | C | C | C | C |
| D3 Título-Con-Guiones en nombre de archivo | C | C | C | C | C | C |
| D4 sufijo `-v<X.Y>.md` con guion medio | C | C | C | C | C | NA |
| D5 política de deprecación y control de cambios | C | C | C | C | C | C |
| D6 trazabilidad upstream y downstream | C | C | C | C | C-obs | C |
| D7 ausencia de vocabulario del dominio fuente del bootstrap | C | C | C | C | C | C |
| D8 conjunto cerrado de tipos de proyecto | C | C | C | C | C | C |
| D9 evidencia verificable | NA | NA | NA | C | C-obs | NA |

Notas de la matriz.

- D2 en `Roadmap-Producto-v1.0.md` pasa de C-obs a C: las nueve celdas "Por definir" que la primera auditoría observó ya no existen. El barrido de `Por definir`, `TBD`, `[Reemplazar]`, `[Nombre]` y `Pendiente de definir` sobre los seis archivos da cero ocurrencias.
- D2 en los seis: UTF-8 sin BOM, EOL LF, cero tabuladores, cero retornos de carro, verificado con `file` y con barrido de caracteres de control.
- D6 pasa de NC a C en `Vision-Producto-v1.0.md`, `Alcance-Proyecto-v1.0.md` y `Acuerdo-Equipo-v1.0.md`. La cita al `SOLUTION-INTAKE` ahora respalda lo afirmado: la tabla de estado de supuestos del intake v1.1 dice exactamente lo que los tres documentos le atribuyen, supuesto por supuesto y mecanismo por mecanismo. Se coteja fila por fila en §5.2 y §6.
- D6 en `Acuerdo-Equipo-v1.0.md` queda C-obs por el hallazgo N-01: la cabecera declara un upstream que no contiene la decisión sobre horario core y plazo de respuesta que §4.6 atribuye al agente humano con fecha.
- D6 en `README.md` pasa de C-obs a C: la cabecera declara secciones específicas del intake y del manifiesto (P2-03 cerrado).
- D9 en `Acuerdo-Equipo-v1.0.md` se computa por primera vez, porque §7 incorporó una afirmación sobre un artefacto existente: la URL del remoto `origin`. La evidencia es localizable, reproducible e independiente de quien afirma, y se comprobó: `git remote get-url origin` en la raíz del repositorio destino devuelve `https://github.com/UTN-FRP-TUP-Aplicada-2025/SelfHosted.Service.Core.git`, idéntico a lo declarado. Queda C-obs, no C, por la afirmación sin evidencia de N-01, que también es una afirmación de estado y no de diseño.
- D9 en los cuatro marcados NA: no contienen afirmaciones sobre el estado de un sistema construido ni sobre la existencia de un artefacto. Las afirmaciones de diseño, especificación y contexto no están alcanzadas antes del handoff.
- D7: el dominio de contenedores, proyectos, servicios, despliegues, lienzo, redes y direcciones es el dominio legítimo de esta solución y proviene del glosario del intake §12. El barrido del dominio fuente del bootstrap (impresoras térmicas, ESC-POS, DSL, Bluetooth y afines) da cero ocurrencias en los seis archivos.

## 4. Matriz de estructura obligatoria por documento

### 4.1 Cabecera y tabla de contenido

Campos exigidos por `Rules-Contexto.md` §4.1, más la tabla de contenido con anclas de primer y segundo nivel.

| Documento | Título | Proyecto | Documento | Versión | Estado | Fecha | Autor | Upstream | Downstream | TdC presente | Anclas verificadas | Anclas rotas |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Vision-Producto-v1.0.md | C | C | C | C | C | C | C | C | C | C | 19 | 0 |
| Alcance-Proyecto-v1.0.md | C | C | C | C | C | C | C | C | C | C | 20 | 0 |
| Roadmap-Producto-v1.0.md | C | C | C | C | C | C | C | C | C | C | 14 | 0 |
| Compatibilidad-Plataformas-v1.0.md | C | C | C | C | C | C | C | C | C | C | 11 | 0 |
| Acuerdo-Equipo-v1.0.md | C | C | C | C | C | C | C | C | C | C | 16 | 0 |
| README.md | C | C | C | NA | C | C | C | C | C | C | 6 | 0 |

Método de verificación de las anclas. Se resolvieron los ochenta y seis enlaces internos de los seis archivos contra el conjunto de anclas que generan sus encabezados, aplicando la regla de normalización habitual (minúsculas, puntuación descartada, espacios a guion medio, tildes y eñes conservadas, marcadores de código y de énfasis descartados, desambiguación por sufijo numérico en encabezados repetidos). Resultado: ochenta y seis resueltas, cero rotas. Se verificó además la cobertura: cada encabezado de primer y de segundo nivel de cada documento figura en su tabla de contenido, con la única excepción del propio encabezado "Tabla de contenido", que no corresponde listar.

Las seis cabeceras llevan fecha 2026-07-27 en ISO 8601. El estado es Propuesto en los cinco documentos versionados y Vigente en el README, dentro del conjunto cerrado de §4.1. La trazabilidad upstream de los seis cita ahora la versión 1.1 del intake; no queda ninguna referencia al nombre de archivo con sufijo `-v1.0`, que ya no existe en `SDD/Intake/`. Las únicas menciones a "la versión 1.0" son las de los controles de cambios que narran la actualización de la referencia, que es su función.

### 4.2 Secciones obligatorias de §4.2

| Documento | Secciones exigidas | Presentes y en orden | Resultado |
|---|---|---|---|
| Vision-Producto-v1.0.md | §1 Problema de negocio, §2 Audiencia y stakeholders, §3 Propuesta de valor, §4 Visión a 3 años, §5 Objetivos SMART, §6 Métricas de éxito, §7 Restricciones, §8 Riesgos, §9 Glosario del dominio, §10 Trazabilidad | 10 de 10, en orden | Completa |
| Alcance-Proyecto-v1.0.md | §1 Propósito, §2 Descripción general, §3 Objetivos del proyecto, §4 Alcance incluido con capacidades, entregables y ambientes, §5 Alcance excluido con justificación, §6 Supuestos, §7 Restricciones, §8 Criterios de aceptación, §9 Gestión de cambios de alcance, §10 Trazabilidad | 10 de 10, en orden; §4 abre las tres subsecciones exigidas | Completa con observación (N-07) |
| Roadmap-Producto-v1.0.md | §1 Propósito, §2 Fases con objetivo, épicas, entregable y release target, §3 Matriz fase a épica a sprint a release, §4 Dependencias entre fases, §5 Criterios de transición, §6 Trazabilidad downstream a 06 y 07 | 6 de 6, en orden; §3 sustituye sprint por etapa y declara la sustitución como desviación de la tabla tipo | Completa |
| Compatibilidad-Plataformas-v1.0.md | §1 Resumen ejecutivo, §2 Matriz de compatibilidad, §3 Restricciones justificadas, §4 Alternativas para plataformas no soportadas, §5 Estado de implementación, §6 Trazabilidad downstream a 09 | 6 de 6, en orden | Completa |
| Acuerdo-Equipo-v1.0.md | §1 Propósito, §2 Equipo y roles, §3 Cadencia de ceremonias, §4 Acuerdos de trabajo con branching, code review, comunicación, horario core, documentación y convenciones de commits, §5 Definition of Done, §6 Definition of Ready, §7 Herramientas | 7 de 7 secciones; §4 cubre ahora los seis componentes exigidos, con el horario core en §4.6 | Completa |
| README.md | `Rules-Contexto.md` §3.4: enumerar los cinco documentos con propósito, estado y orden de lectura; declarar omisiones con su motivo; listar stakeholders | Los tres, más la declaración de las dos desviaciones autorizadas con su motivo y el registro de preguntas abiertas | Completa con observación (N-08) |

Sobre el horario core, que es el objeto del P1-02. `Rules-Contexto.md` §4.2 lo exige como componente de §4 y §4.5 exige que todo acuerdo se redacte como regla operativa verificable, no aspiracional. AT-28 lo cumple en forma: enuncia una regla ("no hay horario core ni franja de disponibilidad comprometida, para ningún rol") y declara cómo se verifica ("ninguna regla operativa del acuerdo referencia una franja horaria, y toda aprobación queda asentada en el pull request"). El auditor ejecutó esa verificación: el barrido de expresiones horarias sobre los seis archivos no devuelve ninguna regla expresada en horas del día, de modo que la aserción de AT-28 es cierta y comprobable. AT-26 completa el par con la regla de bloqueo sin vencimiento, también verificable contra el historial de ramas. La sección no es una omisión disimulada. El problema no está en la regla sino en su justificación, y se reporta aparte como N-01.

### 4.3 Tablas tipo de §4.4

| Tabla | Ubicación exigida | Columnas exigidas | Columnas encontradas | Resultado |
|---|---|---|---|---|
| Stakeholders | vision §2 | Rol, nombre o cargo, categoría, nivel de involucramiento, responsabilidad principal | Idénticas | Cumple |
| Objetivos SMART | vision §5 | Objetivo, métrica, target numérico, plazo, responsable | Las cinco, más columna ID antepuesta | Cumple |
| Métricas de éxito | vision §6 | Criterio, métrica, target, plazo, fuente del dato | Idénticas | Cumple |
| Riesgos | vision §8 | ID, riesgo, probabilidad, impacto, mitigación, responsable | Idénticas | Cumple |
| Glosario | vision §9 | Término, definición, sinónimos o notas | Idénticas | Cumple |
| Hitos del roadmap | roadmap §2 | Fase, objetivo, épicas, sprints estimados, entregable, release target | Fase, Objetivo, Épicas, Etapas, Entregable, Release target, con las cinco filas resueltas | Cumple, con la sustitución sprint igual a etapa declarada en §3 |
| Criterios de transición | roadmap §5 | Fase origen, fase destino, criterios verificables `- [ ]` | Idénticas, con 29 criterios `- [ ]` en seis transiciones | Cumple |
| Matriz de compatibilidad | compatibilidad §2 | Componente, plataforma 1, plataforma 2, ..., notas | Componente, Sistema operativo, Runtime, Motor de contenedores, Almacenamiento, Navegador, Notas | Cumple |
| Exclusiones | alcance §5 | Funcionalidad excluida, justificación, versión futura tentativa | §5.1 y §5.2 con las tres columnas | Cumple |
| Ceremonias | acuerdo §3 | Ceremonia, cuándo, duración, participantes, notas | Idénticas | Cumple |

Corrección al informe anterior. La primera auditoría contabilizó 27 criterios `- [ ]` en `Roadmap-Producto-v1.0.md` §5. El conteo propio da 29, repartidos en 2, 6, 7, 4, 5 y 5 por transición. El control de cambios del roadmap no registra alteración de §5, de modo que la diferencia es un error de conteo del informe v1.0, probablemente por contaminación con el número 27 de las anclas rotas. No cambia ningún veredicto: el criterio 3 de §6 exige al menos tres hitos con criterios verificables.

### 4.4 Anti-patrones de §4.5

| # | Anti-patrón | Verificación | Resultado |
|---|---|---|---|
| 1 | Visión técnica en lugar de visión de negocio | Barrido de nombres de stack, framework y patrón sobre visión, alcance, roadmap y README: cero ocurrencias. El único término técnico recurrente es "token de API", que es entrada del glosario del dominio del intake §12 y no un framework. El stack aparece sólo en `Compatibilidad-Plataformas-v1.0.md`, que es su objeto, y en `Acuerdo-Equipo-v1.0.md` §7, que el criterio 8 de §6 obliga a declarar | Ausente |
| 2 | Alcance sin exclusiones explícitas | 13 exclusiones con justificación: 9 de producto y 4 de proceso | Ausente |
| 3 | Roadmap sin criterios para reordenar | 6 transiciones con 29 criterios verificables | Ausente |
| 4 | Objetivos sin métrica numérica | OBJ-01 a OBJ-05, los cinco con target numérico y plazo o condición de medición | Ausente |
| 5 | Stakeholders genéricos | Seis stakeholders, todos con rol concreto; ninguno "los usuarios" ni "la empresa" | Ausente |
| 6 | Compatibilidad enumerada sin justificación | §2.2 con motivo y origen por fila; §3 con nueve restricciones justificadas y su consecuencia asumida | Ausente |
| 7 | Acuerdo de equipo aspiracional | Las 28 reglas AT llevan columna "Cómo se verifica" con un observable concreto | Ausente |
| 8 | Glosario universal | 29 términos, todos del dominio del cliente; no se define API, framework ni equivalentes | Ausente |

### 4.5 Criterios de aceptación de §6

Los doce criterios, verificados por conteo propio y no por lo declarado en los controles de cambios.

| # | Criterio | Verificación | Resultado |
|---|---|---|---|
| 1 | Visión sin stack, frameworks ni patrones de implementación | Barrido sobre los cuatro documentos alcanzados: cero ocurrencias | Cumple |
| 2 | Al menos 5 capacidades incluidas y 3 exclusiones con justificación | 17 capacidades F-01 a F-17 contadas fila por fila; 13 exclusiones justificadas | Cumple |
| 3 | Al menos 3 hitos con criterios de avance verificables `- [ ]` | 5 fases, 6 transiciones, 29 criterios | Cumple |
| 4 | Al menos 3 objetivos SMART con métrica numérica, target y plazo | 5 objetivos; OBJ-01, OBJ-02 y OBJ-03 con target y plazo explícitos, OBJ-04 y OBJ-05 con target y condición de medición | Cumple |
| 5 | Mínimo 1 stakeholder por categoría con rol concreto | Propietario 2, Implementador 2, Beneficiario 2 | Cumple |
| 6 | Glosario con mínimo 10 términos si el equipo supera 2 personas, 5 si es individual | 29 términos contados fila por fila. Cumple con cualquiera de los dos umbrales | Cumple |
| 7 | Compatibilidad declara todas las plataformas target del intake §17 P.9 | §17.1 P.9 cinco filas, §17.3 P.9 cinco filas, §17.2 P.9 y §17.4 P.9 declaraciones en prosa de ausencia de superficie de plataforma. Las cuatro están representadas: las siete filas de §2.1 incluyen una por proyecto y las ocho de §2.2 cubren las versiones mínimas | Cumple |
| 8 | Acuerdo declara herramientas, ceremonias, branching strategy y SLA de respuesta cuando aplica | 9 herramientas, 6 ceremonias, branching AT-01 a AT-05; el SLA de reloj se declara inexistente como regla operativa verificable en AT-26 y AT-28 | Cumple |
| 9 | Cada documento declara upstream con secciones específicas y downstream con detalle | Los seis declaran upstream a nivel de sección del intake, el README incluido | Cumple |
| 10 | Nombre de archivo con patrón `<Nombre>-v1.0.md` y guion medio | Los cinco versionados cumplen; el README va sin versión, como exige §3.4 | Cumple |
| 11 | Sin emojis, sin negritas decorativas, sin referencias a stack ni al dominio fuente del bootstrap | Barrido de rangos de emoji: cero. Negritas: sólo en las etiquetas de cabecera exigidas por §4.1, verificado por barrido de `**` fuera de cabecera, cero ocurrencias | Cumple |
| 12 | Tabla de contenido con enlaces ancla de primer y segundo nivel en documentos de más de tres secciones | Seis tablas presentes, inmediatamente después de la cabecera, con cobertura completa de encabezados y las 86 anclas resolviendo | Cumple |

Los doce criterios se cumplen. El criterio 12, que la primera auditoría marcó como no cumplido, es el único que cambia de resultado.

## 5. Coherencia cross-doc

### 5.1 Enlaces, anclas e identificadores

Referencias cruzadas entre archivos de la fase. Se resolvieron las veintiuna referencias con forma `` `<archivo>` §<n> `` y las cinco de enlace del README: todas apuntan a una sección que existe en el documento destino. Los enlaces son relativos dentro de `SDD/Docs/`, como exige la política de enlaces de `Master-Prompt.md` §5, y los cinco archivos enlazados desde el README existen en disco.

Identificadores. No hay colisiones ni identificadores fuera de convención. DV-01 a DV-05, OBJ-01 a OBJ-05, RE-01 a RE-11, RG-01 a RG-10 en la visión; OP-01 a OP-07, F-01 a F-17, EN-01 a EN-07, CA-01 a CA-10 en el alcance; EPC-01 y EPC-02 más EP-01 a EP-17, PT-01 y PT-02 en el roadmap; CP-01 a CP-09 en compatibilidad; AT-01 a AT-28, DoD-01 a DoD-12 y DoR-01 a DoR-12 en el acuerdo. El identificador EP-0N que la primera auditoría observó desapareció de las cuatro apariciones. Los identificadores tomados del intake (F-xx, RG-xx, S-xx, CL-xx, PT-xx) conservan su numeración de origen.

Correspondencia roadmap contra alcance. Las diecisiete capacidades F-01 a F-17 tienen una y sólo una épica asociada, EP-01 a EP-17, sin capacidad huérfana ni épica sin capacidad. Las dos épicas de cimientos EPC-01 y EPC-02 no agrupan capacidad, que es lo declarado en §1.2. La asignación de fases de §2.2 coincide celda por celda con §2.1 y con la matriz de §3: Fase 0 con EPC-01 y EPC-02, Fase 1 con EP-01 a EP-11, Fase 2 con EP-12, Fase 3 con EP-13, EP-14 y EP-17, Fase 4 con EP-15 y EP-16. Diecinueve épicas, trece etapas identificadas, coherente con lo que el control de cambios declara.

Glosarios. El glosario de la visión no se contradice con el vocabulario de planificación del roadmap §1.2 ni con las definiciones operativas del acuerdo: Etapa, Hito interno, Hito demostrable y Puerta técnica son consistentes en las tres apariciones, y la distinción entre fase y etapa está declarada en ambos lugares.

### 5.2 Coherencia sobre el estado de los supuestos

Este es el punto que la primera auditoría marcó como contradictorio dentro de la fase. Se verificó afirmación por afirmación, contra el intake v1.1 y no contra ningún resumen.

| Supuesto | Lo que dice el intake v1.1 | Dónde lo afirma la fase | Resultado |
|---|---|---|---|
| S-01 | "Confirmado el 2026-07-27. Los valores propuestos por la versión 1.0 se adoptan sin cambios y dejan de ser supuestos" | `Vision-Producto-v1.0.md` §5 nota de origen, las cuatro filas de §6, §10.1 y `Alcance-Proyecto-v1.0.md` §6.1 | Coincide. Se usa "confirmado" y se cita la tabla de estado con fecha |
| S-02 | "Confirmado el 2026-07-27. Los cuatro pares de umbrales (60/50, 80/70, 55/45 y 90/85)" | `Acuerdo-Equipo-v1.0.md` §5 nota de DoD-03 y `Alcance-Proyecto-v1.0.md` §6.1 | Coincide, incluidos los valores: DoD-03 declara dominio 90/85, aplicación 80/70, interfaz 60/50 y adaptadores 55/45, idénticos a §17.4, §17.2, §17.1 y §17.3 P.6 |
| S-03 | "Confirmado el 2026-07-27" | `Alcance-Proyecto-v1.0.md` §6.1 | Coincide, incluida la aclaración de que los umbrales de PT-01 nunca fueron supuestos |
| S-04 | "Confirmado el 2026-07-27" | `Acuerdo-Equipo-v1.0.md` §4.3 nota de cierre y `Alcance-Proyecto-v1.0.md` §6.1 | Coincide en el estado. Observación menor de redacción en N-09 |
| S-05 | "Resuelto con evidencia el 2026-07-27. Deja de ser supuesto. El remoto existe y está configurado" | `Acuerdo-Equipo-v1.0.md` §7 y `Alcance-Proyecto-v1.0.md` §6.1 | Coincide y no se degrada a "confirmado". El acuerdo transcribe la URL y el método de verificación; la evidencia se comprobó y resuelve |
| S-06 | "Cerrado por identificación de rol el 2026-07-27. No se aportan nombres propios y no se requieren" | `Vision-Producto-v1.0.md` §2.1 y §10.1, `Alcance-Proyecto-v1.0.md` §6.1, `README.md` §4 | Coincide y no se degrada a "confirmado". Ningún documento sigue tratando el nombre propio como brecha |

Los tres mecanismos no se usan como sinónimos en el cuerpo normativo de ningún documento. `Alcance-Proyecto-v1.0.md` §6.1 los distingue de forma explícita en su párrafo de apertura y en la columna "Mecanismo de cierre", y el README §5 los repite con la misma distinción. La única degradación residual está en dos filas de control de cambios y se reporta como N-06.

Lo que sigue abierto, sigue declarado abierto en los tres lugares que corresponde:

| Pendiente | Intake v1.1 | Dónde lo declara la fase | Resultado |
|---|---|---|---|
| CL-04 | §7 "Abierto"; §19 lo enumera entre lo no alcanzado por la confirmación | `Alcance-Proyecto-v1.0.md` §6.2, `README.md` §5 fila 1, `Roadmap-Producto-v1.0.md` §5 transición a Fase 0, `Alcance-Proyecto-v1.0.md` CA-10 | Declarado abierto, con dueño (cliente) y con lo que bloquea |
| CL-15 | §7 "Abierto"; §19 lo enumera | `Alcance-Proyecto-v1.0.md` §6.2, `README.md` §5 fila 2, `Vision-Producto-v1.0.md` RG-09, CA-10 | Declarado abierto |
| Matriz de navegadores | §17.1 P.9 con marcador `[S]` sin resolver; §19 la enumera como pendiente con su consumidor downstream | `Compatibilidad-Plataformas-v1.0.md` §2.2 con su párrafo "Brecha declarada, y sigue abierta", §5 fila de navegador, `README.md` §5 fila 4 | Declarada abierta. Observación menor en N-07: no figura en `Alcance-Proyecto-v1.0.md` §6 |
| Reparto de EP-12, EP-14 y EP-17 | No declarado por el intake; derivación propia del roadmap | `Roadmap-Producto-v1.0.md` §2.3, `README.md` §5 fila 3 | Declarado como derivación pendiente de confirmación |

Ninguno fue barrido por la corrección. Ninguno quedó descrito como cerrado.

## 6. Fidelidad al upstream

Se recotejaron los datos duros contra el intake v1.1, incluidos los que la primera auditoría ya había dado por correctos, porque la consolidación tocó §2, §8 y §17.

| Afirmación auditada | Fuente en el intake v1.1 | Resultado |
|---|---|---|
| Parque de ocho contenedores y dieciocho imágenes | §1 y anexo E-19 | Correcto |
| Cuatro métricas de éxito con sus umbrales (75 %, 90 %, 100 % con antigüedad menor a 7 días, 100 %) | §8, cuatro filas | Correcto, cifra por cifra |
| OBJ-01 traducido a valor absoluto, 6 de 8 contenedores | Derivación de §8 y E-19; el 75 % de 8 es 6 | Correcto, y la derivación está declarada como tal |
| Diez riesgos con probabilidad, impacto y mitigación | §11, diez filas | Correcto, traducidos a lenguaje de negocio sin alterar la evaluación |
| Once restricciones del cliente | §10, once filas | Correcto |
| Veintinueve términos de glosario, veintiocho del intake | §12 | Correcto |
| Diecisiete capacidades y cinco exclusiones identificadas F-18 a F-22 | §4 | Correcto; las cinco Won't Have aparecen citadas por identificador en §5.1 del alcance |
| Cuatro alcances incrementales y trece etapas identificadas | §15 | Correcto |
| Umbrales de cobertura 90/85, 80/70, 60/50 y 55/45 | §17.4, §17.2, §17.1 y §17.3 P.6 | Correcto |
| Umbrales de PT-01: 30 nodos, 40 aristas, actualización cada 2 s, consumo estable tras 15 minutos | §17.1 P.10 y §18 SM-01 | Correcto |
| Alcance de PT-02: listar, crear, arrancar, detener, eliminar, construir imagen y alcanzar por red | §18 SM-02 | Correcto |
| Dimensionamiento de OBJ-05: 30 nodos y 40 aristas, menos de 50 contenedores | §17.1 P.10 fila de escala de datos objetivo | Correcto |
| Debian 13 kernel 6.12, .NET 10, Docker 26.x con `compose` v5 y `buildx`, interfaz del motor v29.4.1, SQLite con WAL | §17.1 P.9 y §17.3 P.9 | Correcto |
| Informe de cierre de trece secciones, en orden | §15.1 | Correcto, las trece y en el mismo orden |
| URL del remoto `origin` | Cabecera del intake y tabla de estado, S-05 | Correcto y verificado contra el entorno |
| Estado de los seis supuestos, con su mecanismo de cierre | Tabla "Supuestos registrados por este intake y su estado" | Correcto, ver §5.2 |
| CL-04, CL-15 y matriz de navegadores abiertos | §7, §17.1 P.9 y §19 | Correcto |
| Ausencia de fechas de calendario | §10, "sin fecha objetivo" | Correcto. La única fecha en los seis archivos es 2026-07-27, con 56 ocurrencias, todas de emisión, confirmación o cierre. Cero meses, cero trimestres, cero años distintos |
| Ausencia de cifras de presupuesto monetario | §10, sin presupuesto asignado | Correcto. RE-03 declara la restricción económica sin inventar cifra; la única aparición de la palabra "presupuesto" en otro sentido es "presupuesto de memoria", que viene de §10 |
| Decisión del agente humano sobre horario core y plazo de respuesta, fechada el 2026-07-27 | Ninguna | Incorrecto. Ver N-01 |

No se detectó ninguna otra invención. Donde el material no alcanza, los documentos declaran la brecha en lugar de completarla: la fila de navegador de compatibilidad, el reparto de épicas del roadmap §2.3 y la formulación de OBJ-05 en la visión.

## 7. Auditoría de la consolidación del intake contra Master-Prompt §13

Se comparó el intake vigente contra la versión archivada, línea por línea, para verificar el alcance real del cambio y no el declarado.

| Regla de §13 | Verificación | Resultado |
|---|---|---|
| 1. Lectura solo, salvo el caso del punto 2 | La escritura corresponde a la consolidación de la respuesta del humano a la batería de validación de §3, que es el caso permitido | Cumple |
| 2. Único caso de escritura permitido | Respuesta a la batería de validación de intake | Cumple |
| 3. Toda escritura agrega entrada al control de cambios con fecha, sección modificada y motivo | El intake suma la entrada 1.1 del 2026-07-27, con las secciones tocadas y el motivo explícito, incluido el hallazgo P0 que la originó. El `SOLUTION-MANIFEST`, en cambio, se reescribió sin entrada | Incumple parcialmente. Ver N-05 |
| 4. Minor cuando se agrega información sin cambiar lo existente | 1.0 a 1.1. Ningún valor de negocio, composición ni técnica cambió: el diff lo confirma. El único cambio de contenido más allá del estado es "tres métricas" a "cuatro métricas" en la descripción de S-01, que corrige un error interno de la versión 1.0 (§8 siempre tuvo cuatro filas y el checklist §19 siempre dijo cuatro) | Cumple |
| 5. La modificación es atómica: una sola sección por entrada de control de cambios | Una sola entrada cubre cabecera, sección de supuestos, §2, §8, §17.1, §17.2, §17.3, §17.4 y §19 | Incumple. Ver N-04 |
| 6. Las versiones anteriores se archivan en `SDD/Intake/_legacy/<YYYY-MM-DD>/` antes de sobrescribir | `SDD/Intake/_legacy/2026-07-27/SOLUTION-INTAKE-SelfHosted-Service-Core-v1.0.md` existe y es la versión previa íntegra | Cumple |
| 7. Si la respuesta toca §13, se re-deriva el manifiesto y se vuelve a presentar | §13 no fue tocada. El manifiesto declara ese razonamiento y no se re-deriva | Cumple en el fondo; la forma queda observada en N-05 |

Además del cumplimiento formal, la consolidación se evaluó por su efecto: ¿el intake v1.1 alcanza para que un lector externo determine el estado de cada supuesto sin recurrir a la conversación? Sí. La tabla de la sección de supuestos y la tabla de pendientes de §19 son autosuficientes, declaran el mecanismo de cierre por supuesto y separan lo cerrado de lo abierto. Es lo que faltaba y es lo que cierra el P0-01. Dos defectos de forma, N-02 y N-03, degradan esa autosuficiencia sin anularla.

## 8. Estado de los once hallazgos de la primera auditoría

| # | Hallazgo original | Estado | Evidencia del veredicto |
|---|---|---|---|
| P0-01 | Se afirma una confirmación del cliente que el intake declara pendiente | Cerrado | El intake v1.1 publica la tabla "Supuestos registrados por este intake y su estado" con el estado y la resolución de los seis, y una entrada 1.1 de control de cambios que la respalda. Las diez afirmaciones de la fase sobre el estado de un supuesto se cotejaron una por una contra esa tabla en §5.2 de este informe y todas coinciden, incluida la no degradación de S-05 y S-06 a "confirmado". Desapareció la contradicción interna: `Acuerdo-Equipo-v1.0.md` §7 ya no dice que la ubicación del remoto no está declarada, sino que la transcribe con su método de verificación, y ni la visión ni el README siguen tratando el nombre propio como brecha |
| P1-01 | Veintisiete anclas de las tablas de contenido no resuelven | Cerrado | Verificación programática de las 86 anclas internas de los seis archivos contra el conjunto de anclas generadas por sus encabezados: 0 rotas. La cobertura también se verificó: todo encabezado de primer y segundo nivel figura en su tabla de contenido. Los seis controles de cambios declaran 4, 4, 8, 3, 5 y 3 anclas regeneradas, que suman las 27 reportadas |
| P1-02 | `Acuerdo-Equipo-v1.0.md` §4 no cubre el horario core | Cerrado | §4.6 pasa a titularse "Comunicación, horario y tiempos de respuesta" e incorpora AT-28, con enunciado de regla y columna de verificación; AT-26 se reformula como bloqueo sin vencimiento. El auditor ejecutó la verificación que AT-28 declara y es cierta: ninguna regla del acuerdo se expresa en horas del día. No es una omisión disimulada. El cierre arrastra un defecto nuevo en su justificación, reportado como N-01, que no reabre este hallazgo |
| P2-01 | Tres de las cinco fases del roadmap no tienen iteración objetivo | Cerrado | §2.1 sustituye "Por definir" por una estimación de piso de una etapa por épica en las fases 2, 3 y 4, con su base derivada declarada ("cada capacidad es un corte vertical demostrable independiente") y su condición de cierre ("se cierra cuando se confirme la composición de los alcances 2 a 4 que §2.3 declara pendiente"). Las seis filas de §3 pasan de "Por definir en 07-Plan-Sprint" a "1 etapa, identificador de orden en 07-Plan-Sprint". Cero ocurrencias de "Por definir" en la carpeta |
| P2-02 | El identificador EP-0N rompe la convención que el propio documento declara | Cerrado | Serie propia EPC-01 y EPC-02 declarada en §1.2 y propagada a §2.1, §2.2, §3 y §6. Cero ocurrencias de EP-0N en la carpeta. Las diecinueve épicas se contaron fila por fila en §2.2 |
| P2-03 | El README declara upstream sin secciones específicas | Cerrado | La cabecera del README declara ahora "SOLUTION-INTAKE v1.1 §2 para los stakeholders de §4, §7 y su tabla de estado de supuestos para las preguntas abiertas de §5, §13 para la identidad de la solución y su composición; SOLUTION-MANIFEST §1 y §2 para el proyecto principal y su tipo" |
| P3-01 | Sustitución de sprint por etapa sin declarar la desviación | Cerrado | §3 abre con el párrafo "Desviación declarada respecto de la tabla tipo", que nombra la tabla de origen, la columna sustituida, el motivo y la equivalencia uno a uno, y remite a `Acuerdo-Equipo-v1.0.md` §2.1 |
| P3-02 | La tabla de exclusiones de proceso omite la columna de versión futura | Cerrado | §5.2 lleva las tres columnas exigidas por §4.4, con "No planificado mientras rija el modo de trabajo declarado" en las cuatro filas, más el párrafo que explica por qué son permanentes |
| P3-03 | El README caracteriza de más el defecto del que se aparta el acuerdo de equipo | Cerrado | §3 dice ahora "El documento pasa de recomendado a generado. Las reglas de la categoría lo declaran obligatorio para equipos de más de dos personas y recomendado para equipos de dos que coordinan con stakeholders externos, que es el caso; el umbral del que se aparta la decisión es el del master-prompt, `equipo_n` mayor que 2, no una prohibición de las reglas de la categoría" |
| P3-04 | La lectura de restricciones en clave de alcance omite dos de las once | Cerrado | §7 incorpora RE-09 y RE-10. Las once restricciones están cubiertas en diez filas, con RE-01 y RE-04 tratadas juntas por su relación declarada |
| P3-05 | La visión declara un origen upstream que su tabla de trazabilidad no mapea | Cerrado | §10.1 fila 3: "3. Propuesta de valor | §3, y §5 para las experiencias deseadas que sostienen la promesa central y los cinco diferenciadores" |

Once de once cerrados. Ninguno quedó cerrado parcialmente ni abierto.

## 9. Hallazgos nuevos

Numeración N-01 en adelante, para no colisionar con la del informe v1.0. Los hallazgos N-02 a N-05 son contra el orquestador y viven en artefactos de `SDD/Intake/`; el despacho los pone explícitamente dentro del alcance.

### N-01 (P1) — El cierre del horario core se apoya en una decisión atribuida al humano que ningún artefacto registra

Nivel: P1. Archivos y secciones: `Acuerdo-Equipo-v1.0.md` §4.6, párrafo de cierre (línea 136) y control de cambios (línea 200); `README.md` §5 (línea 75).

Evidencia. `Acuerdo-Equipo-v1.0.md` línea 136: "Decisión declarada, no omisión. El agente humano del proyecto resolvió el 2026-07-27 que no existe horario core ni plazo máximo de respuesta, y que esa ausencia se declara de forma explícita." El control de cambios de la línea 200 lo reitera: "ambas resuelven la decisión del agente humano del proyecto del 2026-07-27 y cierran también la ambigüedad A-03 registrada en la entrega inicial". `README.md` línea 75 lo registra entre lo cerrado: "y el tiempo de respuesta del punto de control, que el agente humano del proyecto resolvió declarando que no hay plazo máximo ni horario core".

Esa decisión no está en ninguna parte. El barrido de "horario", "franja", "plazo máximo", "plazo de respuesta", "SLA", "tiempo de respuesta" y "asíncron" sobre `SDD/Intake/SOLUTION-INTAKE-SelfHosted-Service-Core-v1.1.md` y sobre `SDD/Intake/SOLUTION-MANIFEST-SelfHosted-Service-Core-v1.0.md` devuelve cero ocurrencias. La tabla de estado de supuestos del intake registra seis resoluciones, ninguna sobre este punto. La tabla de pendientes de §19 registra tres, ninguna sobre este punto. La entrada 1.1 del control de cambios del intake enumera lo consolidado y no lo menciona. La cabecera de `Acuerdo-Equipo-v1.0.md` declara un upstream de catorce referencias, y ninguna contiene el dato.

Es el mismo modo de falla que originó el P0-01: una afirmación fechada sobre una decisión del humano, citada como cerrada, sin registro en la cadena. La corrección del P0-01 hizo lo correcto —consolidó primero en el intake por el flujo de §13 y recién después citó— y en el mismo movimiento introdujo una atribución nueva que no pasó por ese flujo. `Master-Prompt.md` §9 paso 5 es explícito: cuando el usuario responde a una ambigüedad, el orquestador actualiza el intake siguiendo §13, y recién entonces el subagente se reanuda con el dato incorporado. La ambigüedad A-03 que el propio documento dice cerrar es exactamente ese caso.

Por qué es P1 y no P0. El intake no contradice la afirmación: calla. Y el contenido operativo que la afirmación justifica es derivable de lo que el intake sí declara: §10 fija "sin fecha objetivo" y el punto de control como "cuello por diseño", §15 declara el punto de control bloqueante con OK explícito, y §17.1 P.8 declara que no se fusiona sin ese OK. De ahí que AT-26 y AT-28 sean reglas correctas y verificables aunque su justificación no tenga respaldo. La cadena no queda cargando un valor cerrado falso, que es lo que hacía P0-01 con los umbrales de S-02 y S-04. Se aplica el criterio declarado en §2 de este informe.

Recomendación. Dos caminos, ambos válidos. El primero: consolidar la decisión en el `SOLUTION-INTAKE` por el flujo de `Master-Prompt.md` §13, con su entrada de control de cambios, subida a 1.2 y archivado de la 1.1, y recién entonces citarla desde `Acuerdo-Equipo-v1.0.md` §4.6 y el README §5, como se hizo con los seis supuestos. El segundo, más barato y suficiente: quitar la atribución y la fecha, y fundar AT-26 y AT-28 en lo que el intake sí declara, que es §10 y §15. Lo que no puede quedar es la fecha y el sujeto sin evidencia localizable.

### N-02 (P2) — El intake v1.1 se titula a sí mismo v1.0

Nivel: P2. Archivo: `SDD/Intake/SOLUTION-INTAKE-SelfHosted-Service-Core-v1.1.md`, línea 1. Hallazgo contra el orquestador.

Evidencia. Línea 1: `# SOLUTION-INTAKE-SelfHosted-Service-Core-v1.0`. La tabla de metadatos inmediatamente debajo declara "Documento: `SOLUTION-INTAKE-SelfHosted-Service-Core-v1.1.md`" y "Versión: 1.1", y el nombre de archivo es el correcto. El diff contra la versión archivada confirma que el encabezado de primer nivel es la única línea de identidad que no se actualizó al consolidar.

Por qué importa. El encabezado de primer nivel es la identidad del documento, y es lo primero que lee un agente que lo abre. `Master-Prompt.md` §5 fija como invariante de solución el sufijo de versión y la política de una sola versión vigente; un documento vigente cuyo título anuncia la versión archivada invita al error de trabajar sobre la creencia de estar leyendo la 1.0. No se computa P1 porque el nombre de archivo, la tabla de metadatos y el control de cambios son correctos y consistentes entre sí, y porque ningún documento de 00-Contexto tomó la versión del título.

Recomendación. Actualizar la línea 1 a `# SOLUTION-INTAKE-SelfHosted-Service-Core-v1.1`. Es un cambio de una línea que no altera contenido; registrar la corrección como entrada de control de cambios propia, según N-04.

### N-03 (P2) — La generalización sobre el marcador `[S]` deja leer como cerrada la matriz de navegadores

Nivel: P2. Archivo: `SDD/Intake/SOLUTION-INTAKE-SelfHosted-Service-Core-v1.1.md`, línea 49. Hallazgo contra el orquestador. Defecto introducido por la corrección.

Evidencia. Línea 49, párrafo agregado en la 1.1: "Consecuencia para los subagentes: los seis dejaron de ser supuestos abiertos. El marcador `[S]` que aparece en el cuerpo de §8 y de §17 señala el origen del dato (propuesto por este intake, no declarado por las fuentes), no una pendiente de confirmación. Un artefacto downstream puede tratar estos valores como cerrados citando esta tabla."

La generalización es demasiado ancha. Hay al menos un `[S]` en el cuerpo de §17 que no pertenece a S-01 a S-06: §17.1 P.9, fila de navegador, "Navegador de escritorio con soporte de WebSockets **[S]**", cuya nota agrega "las fuentes no declaran una matriz de navegadores". Ese dato no está en la tabla de estado y sigue abierto: el propio §19 del intake, en la tabla "Lo que sigue abierto y no fue alcanzado por esa confirmación", lo enumera como tercer pendiente, con su consumidor downstream. Un subagente que aplique la línea 49 al pie de la letra sobre §17.1 P.9 cerraría la matriz de navegadores, que es justo lo que no debe cerrar.

El daño no se materializó: `Compatibilidad-Plataformas-v1.0.md` §2.2 leyó bien y declara la brecha abierta citando §19. Pero la contradicción interna del intake queda disponible para la próxima categoría que lo lea, y las categorías 03, 08 y 09 tienen esa fila como insumo.

Recomendación. Acotar la línea 49 a los `[S]` de S-01 a S-06, o marcar la fila de navegador de §17.1 P.9 con un identificador propio (por ejemplo S-07) que la tabla de estado registre como abierto, con lo que la generalización deja de ser ambigua y la matriz de navegadores gana el mismo tratamiento formal que el resto.

### N-04 (P2) — La entrada 1.1 del control de cambios del intake no es atómica

Nivel: P2. Archivo: `SDD/Intake/SOLUTION-INTAKE-SelfHosted-Service-Core-v1.1.md`, control de cambios, fila 1.1. Hallazgo contra el orquestador.

Evidencia. `Master-Prompt.md` §13 regla 5: "La modificación es atómica: una sola sección por entrada de control de cambios." La entrada 1.1 abre con "Actualización de la sección de supuestos, de la cabecera, de §2, de §8, de §17.1 a §17.4 y de §19", es decir nueve secciones en una sola entrada. El diff contra la versión archivada confirma que las nueve fueron efectivamente modificadas.

Se computa P2 y no más. La entrada es completa, fechada, motivada y trazable al hallazgo que la originó, de modo que cumple el fondo de la regla 3, que es que quede registro de qué cambió y por qué. Y existe una tensión razonable: la consolidación es un único acto lógico —la respuesta del humano a una batería de validación— cuya partición en nueve entradas idénticas salvo el número de sección empeoraría la legibilidad. La regla, sin embargo, está escrita y se incumplió, y la decisión de apartarse de ella no está declarada en ninguna parte.

Recomendación. O bien partir la entrada por sección, o bien declarar en la propia entrada que se trata de una consolidación única con alcance multisección y por qué se aparta de §13 regla 5. La segunda opción es la que preserva la legibilidad sin dejar el apartamiento sin registro.

### N-05 (P2) — El manifiesto se reescribió sin entrada de control de cambios, y su única entrada se contradice a sí misma

Nivel: P2. Archivo: `SDD/Intake/SOLUTION-MANIFEST-SelfHosted-Service-Core-v1.0.md`, líneas 3, 5, 17 y 88. Hallazgo contra el orquestador.

Evidencia. El manifiesto contiene texto que no pudo existir al momento de su derivación: línea 3, "lo construyó a partir de `SOLUTION-INTAKE-SelfHosted-Service-Core-v1.1.md` §13"; línea 5, "La derivación se hizo sobre la versión 1.0 del intake y sigue siendo válida sobre la 1.1"; línea 17, "Intake (origen): `SOLUTION-INTAKE-SelfHosted-Service-Core-v1.1.md`". Es decir, el archivo fue editado durante la consolidación. Su control de cambios, en cambio, tiene una sola fila, la de emisión, sin entrada por esa edición, lo que incumple `Master-Prompt.md` §13 regla 3: "Toda escritura agrega entrada al control de cambios."

Además, la fila existente quedó afirmando algo falso. Línea 88: "1.0 | 2026-07-27 | Manifiesto inicial derivado de `SOLUTION-INTAKE-SelfHosted-Service-Core-v1.1.md` §13 durante la fase de validación de intake". La derivación inicial no pudo hacerse desde la 1.1, que no existía entonces, y la línea 5 del mismo documento dice exactamente lo contrario: "La derivación se hizo sobre la versión 1.0 del intake". Un lector externo encuentra dos afirmaciones incompatibles sobre el mismo hecho dentro del mismo archivo.

El fondo es correcto y conviene decirlo: §13 de la Parte B no fue tocada, ninguna fila de la tabla de proyectos, ningún `project_type`, ninguna dependencia ni ningún nombre de código cambió —lo verificó este auditor contra el diff—, de modo que la regla 7 no obliga a re-derivar el manifiesto y el razonamiento de la línea 5 es válido. Lo que falla es la forma del registro.

Recomendación. Agregar una entrada 1.1 al control de cambios del manifiesto, con fecha y motivo ("actualización de la referencia al intake vigente tras su consolidación a 1.1; §13 no fue tocada y no corresponde re-derivar"), subir la versión del manifiesto o declarar por qué no corresponde, y corregir la fila 1.0 para que diga que la derivación inicial se hizo sobre la versión 1.0 del intake.

### N-06 (P2) — Dos filas de control de cambios siguen tratando los seis supuestos como confirmados

Nivel: P2. Archivos y secciones: `Alcance-Proyecto-v1.0.md` control de cambios, primera fila (línea 247); `Compatibilidad-Plataformas-v1.0.md` control de cambios, tercera fila (línea 131).

Evidencia. `Alcance-Proyecto-v1.0.md` línea 247: "Versión inicial, derivada del SOLUTION-INTAKE-SelfHosted-Service-Core-v1.1. Diecisiete capacidades incluidas, trece exclusiones justificadas, seis supuestos confirmados, dos supuestos abiertos y diez criterios de aceptación". `Compatibilidad-Plataformas-v1.0.md` línea 131: "§2.2 declara ahora de forma explícita que la batería de validación del 2026-07-27 no alcanzó a la matriz de navegadores, que sigue abierta: la confirmación de los seis supuestos del intake no la cerró".

En ambos casos se llama "confirmación" al cierre de los seis. El intake confirma cuatro. S-05 se resolvió con evidencia y S-06 se cerró por identificación de rol, que son mecanismos distintos y con consecuencias distintas aguas abajo: sobre S-05 hay un dato verificable que un artefacto downstream puede volver a comprobar, y sobre S-06 hay una decisión de no aportar el dato, que obliga a que ninguna categoría posterior lo pida. Llamar "confirmados" a los seis borra esa diferencia, que es exactamente la que la corrección del P0-01 vino a instalar.

Los dos casos no son iguales en gravedad. El de `Alcance-Proyecto-v1.0.md` describe el inventario de la versión inicial, que efectivamente decía "confirmados", y la tercera fila del mismo control de cambios documenta el cambio de tratamiento, de modo que un lector atento reconstruye. El de `Compatibilidad-Plataformas-v1.0.md` se escribió durante la corrección y es una degradación nueva. No se computa P1 porque el cuerpo normativo de los seis documentos es correcto y consistente, verificado fila por fila en §5.2, y ninguna categoría downstream consume el control de cambios como fuente de estado.

Recomendación. En `Compatibilidad-Plataformas-v1.0.md`, cambiar "la confirmación de los seis supuestos" por "el cierre de los seis supuestos". En `Alcance-Proyecto-v1.0.md`, cambiar "seis supuestos confirmados" por "seis supuestos cerrados" o agregar la precisión de mecanismos, según prefiera el orquestador conservar o no la literalidad histórica.

### N-07 (P3) — `Alcance-Proyecto-v1.0.md` §6 no registra la matriz de navegadores entre lo abierto

Nivel: P3. Archivo: `Alcance-Proyecto-v1.0.md`, secciones §6.1 y §6.2.

Evidencia. §6.1 abre con "Los seis valores que el SOLUTION-INTAKE registró con marcador de supuesto están cerrados", y §6.2 enumera dos abiertos, CL-04 y CL-15. El intake, en cambio, registra un marcador `[S]` más allá de los seis —la fila de navegador de §17.1 P.9— y su §19 declara tres pendientes, no dos: los dos casos límite y la matriz de navegadores. Un lector que use `Alcance-Proyecto-v1.0.md` como registro de supuestos de la solución concluye que hay seis cerrados y dos abiertos, y no ve el tercero.

El ítem no se perdió: está declarado en `Compatibilidad-Plataformas-v1.0.md` §2.2 con su párrafo de brecha, en §5 fila de navegador, y en el `README.md` §5 fila 4, que es el registro consolidado de la categoría. Por eso es P3 y no más: no hay pérdida de trazabilidad, hay una asimetría entre el documento que la regla designa para los supuestos y el que efectivamente lo registra.

Recomendación. Agregar una tercera fila a §6.2 con la matriz de navegadores, su dueño y lo que bloquea, y ajustar la frase de §6.1 a "los seis valores que el intake registró como supuestos numerados S-01 a S-06".

### N-08 (P3) — El registro de preguntas abiertas del README no incluye la pendiente de OBJ-05

Nivel: P3. Archivos y secciones: `README.md` §5; `Vision-Producto-v1.0.md` §5, nota de origen de los datos (línea 115).

Evidencia. `Vision-Producto-v1.0.md` línea 115: "OBJ-05 combina los umbrales de la puerta técnica PT-01 con el dimensionamiento verificado del SOLUTION-INTAKE v1.1 §17.1 P.10; su formulación como objetivo de negocio es una derivación de este documento y sigue marcada para confirmación: la batería de validación del 2026-07-27 no la alcanzó." `README.md` §5 abre con "Ninguna bloquea la generación de esta categoría, pero las cuatro condicionan categorías posteriores y su respuesta es del cliente", y enumera cuatro filas, ninguna de las cuales es OBJ-05.

El README §5 es, por construcción, el registro consolidado de lo que la categoría deja abierto: es el lugar donde §3.4 de las reglas pide declarar lo pendiente y el que las categorías siguientes van a leer para saber qué no pueden dar por cerrado. Una derivación marcada para confirmación en la visión que no aparece ahí queda invisible fuera de su documento de origen. El tratamiento en sí es correcto y honesto; lo que falta es propagarlo al registro.

Recomendación. Agregar una quinta fila a `README.md` §5 con la formulación de OBJ-05 como objetivo de negocio, su dueño y qué condiciona (la lectura de la métrica en 08-Calidad-Y-Pruebas), y ajustar el "las cuatro" del párrafo de apertura.

### N-09 (P3) — La nota de cierre de `Acuerdo-Equipo-v1.0.md` §4.3 atribuye a S-04 más de lo que S-04 cubre

Nivel: P3. Archivo: `Acuerdo-Equipo-v1.0.md`, §4.3, línea 104.

Evidencia. Línea 104: "Los umbrales de este bloque provienen de S-04, propuesto por el intake y confirmado sin cambios por el agente humano del proyecto el 2026-07-27, según la tabla de estado de supuestos del SOLUTION-INTAKE v1.1." Dos imprecisiones. Primera, §4.3 no contiene umbrales: contiene un esquema de versionado (AT-11), una convención de mensajes (AT-10), una regla de cálculo de versión (AT-12) y una regla sobre migraciones (AT-13). La palabra correcta es "el esquema y la convención", y probablemente sea un calco de la nota equivalente de §5, donde "umbrales" sí corresponde. Segunda, S-04 se define en el intake como "Adopción de SemVer 2.0.0 y Conventional Commits, y etiquetado por etapa cerrada", que cubre AT-10, AT-11 y AT-12, pero no AT-13: la regla de no editar migraciones fusionadas no proviene de ese supuesto.

Recomendación. Reformular la nota como "El esquema de versión de AT-11 y la convención de mensajes de AT-10 y AT-12 provienen de S-04", y dejar AT-13 fuera de la atribución o citarle su origen propio.

## 10. Lo que se verificó y no es hallazgo

Se deja constancia expresa para que la próxima corrección no introduzca regresiones por sobreinterpretación.

- La generación de `Compatibilidad-Plataformas-v1.0.md` y de `Acuerdo-Equipo-v1.0.md` es una desviación autorizada por decisión explícita del humano, del defecto de `Rules-Contexto.md` §2.2 y del umbral `equipo_n` mayor que 2 del master-prompt, respectivamente. El `README.md` §3 la declara con su motivo en una tabla de dos filas, y §1.1 de compatibilidad y §1 del acuerdo la reiteran en el lugar de uso. Es correcto y no es hallazgo. La caracterización de la regla, que el P3-03 observó, quedó corregida.
- La ausencia de un checklist de §6 dentro de los seis archivos no es hallazgo. Ver el criterio declarado en §2 de este informe.
- La cabecera de `Roadmap-Producto-v1.0.md`, `Compatibilidad-Plataformas-v1.0.md` y `Acuerdo-Equipo-v1.0.md` no enumera 01, 02 ni 05 en su downstream. No es hallazgo: `Rules-Contexto.md` §4.2 acota el downstream obligatorio de esos documentos a 06 y 07 en el roadmap y a 09 en compatibilidad, y enumerar categorías que no consumen sería peor.
- `Acuerdo-Equipo-v1.0.md` y `README.md` no tienen tabla de trazabilidad downstream con detalle por categoría, sólo la lista de la cabecera. No es hallazgo: §4.2 no les exige sección de trazabilidad, y el criterio 9 de §6 se satisface con la declaración de cabecera, que en ambos es específica.
- El vocabulario de contenedores, proyectos, servicios, despliegues, lienzo, redes y direcciones es el dominio legítimo de esta solución y proviene del glosario del intake §12. No es vocabulario prohibido por D7.
- La palabra "API" en `Vision-Producto-v1.0.md` §9 y en `Alcance-Proyecto-v1.0.md` §4.1 aparece dentro de "token de API", que es entrada del glosario del cliente. No es mención de stack y no activa el primer anti-patrón de §4.5.
- `Compatibilidad-Plataformas-v1.0.md` §5 separa el estado de especificación de la verificación prevista y declara de forma explícita que el sistema no está construido. Es el tratamiento correcto de D9 antes del handoff y conviene preservarlo tal cual.
- La ubicación de la carpeta es la correcta según `Master-Prompt.md` §3.5: la solución tiene cuatro proyectos, de modo que 00-Contexto es de nivel solución y vive directamente bajo `SDD/Docs/`, sin el subnivel `Proyectos/`, que existe y está reservado para las categorías 02 a 11. El intake vigente y el manifiesto viven en `SDD/Intake/` y la versión archivada en `SDD/Intake/_legacy/2026-07-27/`.
- El path de este informe sigue el patrón de `Master-Prompt.md` §10, `SDD/Docs/Audit/<fase>-<categoria>-v<X.Y>.md`, con la versión elevada a 2.0 por ser una re-auditoría de la misma fase y categoría. El informe `A-00-Contexto-v1.0.md` no se modificó.
- Los conteos declarados en los controles de cambios se reverificaron uno por uno y son exactos, con una salvedad histórica benigna: `Acuerdo-Equipo-v1.0.md` declara en su primera fila "veintisiete acuerdos operativos" y hoy hay veintiocho, porque la tercera fila documenta el alta de AT-28. Es un inventario histórico correcto y no se computa hallazgo.
- No hay emojis, no hay negritas decorativas fuera de las etiquetas de cabecera exigidas por §4.1, no hay tabuladores, no hay BOM y el EOL es LF en los seis archivos.

## 11. Veredicto final y condiciones para promover

Veredicto: APROBADO CON OBSERVACIONES.

Cero hallazgos P0. El P0-01 que motivó el rechazo está cerrado de forma sustantiva: existe ahora un artefacto upstream que registra el estado de cada supuesto con su mecanismo de cierre y su fecha, hay entrada de control de cambios que lo respalda, la versión anterior está archivada, y las diez afirmaciones de la fase sobre el estado de un supuesto se corresponden una por una con lo que ese artefacto dice, sin degradar "resuelto con evidencia" ni "cerrado por identificación de rol" a "confirmado" en ningún cuerpo normativo. Lo que sigue abierto sigue declarado abierto en los tres registros que corresponde. Los otros diez hallazgos también están cerrados.

Los nueve hallazgos nuevos —1 P1, 5 P2 y 3 P3— no rompen trazabilidad, no omiten documento obligatorio, no introducen vocabulario prohibido y no dejan ninguna cabecera incompleta. Cinco de ellos son contra el orquestador y se resuelven en `SDD/Intake/`, sin tocar los entregables.

Condiciones para promover a las fases siguientes:

1. Corregir N-01, que es la única condición bloqueante de esta lista en sentido práctico: o se consolida la decisión sobre horario core y plazo de respuesta en el `SOLUTION-INTAKE` por el flujo de `Master-Prompt.md` §13 y recién entonces se la cita, o se quita la atribución y la fecha y se funda AT-26 y AT-28 en §10 y §15 del intake, que sí las sostienen. Que la corrección de un P0 de fidelidad haya introducido una atribución sin respaldo es la señal a atender, más que su tamaño.
2. Corregir N-02 y N-05 antes de que otra categoría lea los artefactos de intake. Son dos correcciones de una línea cada una que evitan que un subagente trabaje sobre una identidad de versión equivocada o sobre una fila de control de cambios falsa.
3. Corregir N-03 antes de despachar la categoría 03 o la 09, que tienen la fila de navegador de §17.1 P.9 como insumo directo y son las que podrían cerrarla por error.
4. Resolver o declarar N-04 y N-06.
5. Los tres P3 se corrigen o se aceptan de forma explícita al cierre de fase, a criterio del orquestador.
6. No se requiere re-auditar el cuerpo completo de 00-Contexto por tercera vez. Una verificación acotada a los puntos 1 a 4 alcanza, salvo que la corrección de N-01 altere el contenido de AT-26 o AT-28, en cuyo caso vuelve a auditarse §4 del acuerdo y su coherencia con el README.

Se reitera la observación de cierre del informe anterior, que sigue vigente y fuera de este alcance: corresponde verificar si `01-Necesidades-Negocio`, generada antes de la consolidación del intake, cita todavía la versión 1.0 del intake o arrastra la formulación que originó el P0-01. Su audit propio es el lugar donde resolverlo.

---

## 12. Verificación de cierre de los nueve hallazgos

Sección agregada tras la ronda de corrección que siguió a §11. No modifica ninguna de las secciones anteriores: los hallazgos N-01 a N-09, sus niveles y el veredicto de §11 quedan como registro de lo que se auditó antes de esa ronda. Lo que sigue es la verificación de su cierre y el veredicto final de la categoría.

### 12.1 Alcance y método de esta verificación

Es una verificación de cierre acotada, no una tercera auditoría completa. Se verificó el estado de los nueve hallazgos, se contrastó de forma independiente lo que declaran los dos responsables de la corrección —orquestador en `SDD/Intake/` y subagente generador en `SDD/Docs/00-Contexto/`— y se buscaron defectos nuevos introducidos por esta ronda. No se reejecutó la matriz D1 a D9 ni el checklist completo de §6, salvo las verificaciones mecánicas que una corrección puede romper: anclas, cobertura de tabla de contenido, codificación y referencias al intake.

Resultado de esas verificaciones mecánicas, todas ejecutadas de nuevo sobre los seis archivos: 86 anclas internas, 0 rotas; cobertura completa de encabezados de primer y segundo nivel en las seis tablas de contenido; UTF-8 sin BOM, EOL LF, cero tabuladores y cero retornos de carro en los seis archivos y en los dos artefactos de intake; cero emojis; cero referencias al nombre de archivo del intake con sufijo `-v1.0`. Ninguna regresión.

Ninguna de las dos declaraciones de corrección se aceptó por su palabra. Cada afirmación verificable se contrastó contra el archivo, y dos afirmaciones nuevas que los correctores introdujeron —el supuesto IC-05 y el origen de AT-13— se comprobaron en el intake, línea por línea, porque son datos que este auditor no había verificado antes.

### 12.2 Estado de cierre, hallazgo por hallazgo

| # | Nivel | Hallazgo | Estado | Evidencia del veredicto |
|---|---|---|---|---|
| N-01 | P1 | El cierre del horario core se apoya en una decisión atribuida al humano que ningún artefacto registra | Cerrado | Se tomó el camino más caro de los dos que este informe ofrecía, que es el correcto. El intake v1.1 §10 incorpora la restricción «Disponibilidad y tiempos de respuesta», con su valor declarado y su origen: "Decisión del agente humano del proyecto, tomada el 2026-07-27 al responder la batería de validación de intake del orquestador. Las tres fuentes no declaran horario ni plazo: declaran el bloqueo hasta el OK explícito (`Requerimientos-Tecnicos.md` §1 y §10 **[E]**), y la decisión consiste en declarar la ausencia en lugar de fijar un valor **[D]**". La escritura quedó registrada con su entrada propia de control de cambios, que declara además por qué se registra: "Se registra acá para que la afirmación tenga respaldo en la cadena". Del lado de los entregables, AT-26 y AT-28 citan "Respaldo: restricción «Disponibilidad y tiempos de respuesta» del SOLUTION-INTAKE v1.1 §10", y el párrafo de cierre de §4.6 dejó de afirmar la decisión por cuenta propia y pasa a derivarla de la restricción. El `README.md` §5 hace lo mismo. La afirmación ya no cuelga de nada: cuelga de §10 del intake, y §10 declara su propio origen. Ver §12.4 para el cotejo del contenido |
| N-02 | P2 | El intake v1.1 se titula a sí mismo v1.0 | Cerrado | Línea 1: `# SOLUTION-INTAKE-SelfHosted-Service-Core-v1.1`. Coherente con el campo Documento, con el campo Versión y con el nombre de archivo. La corrección quedó registrada en la entrada de control de cambios de la cabecera |
| N-03 | P2 | La generalización sobre el marcador `[S]` deja leer como cerrada la matriz de navegadores | Cerrado, y mejor de lo pedido | El párrafo de consecuencia quedó acotado: "Donde el marcador **[S]** aparece acompañado de la nota «confirmado el 2026-07-27» —en §8 y en los cuatro bloques de §17— señala el origen del dato", seguido de "**Esa generalización alcanza únicamente a S-01 a S-06.**" y de una tabla de dos filas con los marcadores sin número que siguen abiertos. El orquestador identificó uno que este auditor no había encontrado: el supuesto IC-05 de §17.4 P.11. Se verificó y existe: línea 966, "Abierto para el Sprint 0 **[S]**: la confirmación del supuesto IC-05 registrado por el análisis, según el cual la frase cortada de la definición de idea se refiere a verificar que el contenedor no esté ya adoptado por otro proyecto, formalizado en I10". Se barrieron además todos los marcadores `[S]` del intake para comprobar que no queda un tercero sin clasificar: el único restante, el de ≤ 300 ms en §17.1 P.10, está cubierto por el preámbulo de esa sección, que lo adscribe a S-03. La tabla es exhaustiva. Queda una consecuencia menor sin propagar, reportada como V-02 |
| N-04 | P2 | La entrada 1.1 del control de cambios del intake no es atómica | Cerrado | La entrada monolítica se partió en siete entradas, una por sección: supuestos, cabecera y título, §2, §8, §10, §17.1 a §17.4, y §19. Cada una con su fecha, su alcance y su motivo propio. La entrada de §17 cubre los cuatro bloques de proyecto, lo cual es atómico en el sentido de `Master-Prompt.md` §13 regla 5: §17 es la sección y §17.1 a §17.4 son sus subsecciones por proyecto, modificadas con el mismo motivo y el mismo alcance. La entrada de §10 no existía en la versión anterior y aparece acá porque registra la escritura que cierra N-01 |
| N-05 | P2 | El manifiesto se reescribió sin entrada de control de cambios, y su única entrada se contradecía a sí misma | Cerrado | La fila 1.0 vuelve a declarar el origen correcto: "Manifiesto inicial derivado de `SOLUTION-INTAKE-SelfHosted-Service-Core-v1.0.md` §13 durante la fase de validación de intake, y confirmado por el agente humano del proyecto ese mismo día". Desapareció la contradicción con la línea 5. Se agregó una segunda fila que registra la actualización del puntero, su motivo, la comprobación de que §13 no cambió y el criterio por el cual la versión no sube. La observación sobre ese criterio va en §12.6 y como V-05 |
| N-06 | P2 | Dos filas de control de cambios seguían tratando los seis supuestos como confirmados | Cerrado | `Compatibilidad-Plataformas-v1.0.md`, tercera fila: "el cierre de los seis supuestos del intake —cuatro confirmados, uno resuelto con evidencia y uno cerrado por identificación de rol— no la alcanzó". `Alcance-Proyecto-v1.0.md`, primera fila: "seis supuestos del intake tratados entonces como confirmados —hoy diferenciados en cuatro confirmados, uno resuelto con evidencia y uno cerrado por identificación de rol, según la tercera fila—". La solución del alcance es la mejor de las dos que este informe ofrecía: conserva la literalidad de lo que la emisión inicial efectivamente dijo y evita proyectar hacia atrás una distinción que en ese momento no existía, agregando la referencia cruzada a la fila donde sí existe. Es el tratamiento correcto de un control de cambios, que es un registro histórico y no un espejo del estado presente |
| N-07 | P2, reportado como P3 | `Alcance-Proyecto-v1.0.md` §6 no registraba la matriz de navegadores entre lo abierto | Cerrado | §6.1 quedó acotada: "Los seis valores que el SOLUTION-INTAKE registró como supuestos numerados S-01 a S-06 están cerrados. No son los únicos datos que el intake marcó como supuesto: la matriz de navegadores de §17.1 P.9 lleva el mismo marcador, no está en la tabla de estado y sigue abierta, de modo que se registra en §6.2 y no acá". §6.2 pasó de dos a tres filas, con la matriz de navegadores, su dueño y lo que bloquea. Queda alineada con la tabla de pendientes de §19 del intake. Arrastra un residuo de redacción, reportado como V-01 |
| N-08 | P3 | El registro de preguntas abiertas del README no incluía la pendiente de OBJ-05 | Cerrado | `README.md` §5 pasa de cuatro a cinco filas y el párrafo de apertura de "las cuatro" a "las cinco". La quinta fila describe la pendiente con precisión y declara su naturaleza: "Es una derivación propia de esta categoría, no un dato declarado por el intake", con su destino en 08-Calidad-Y-Pruebas. Se agregó además a la fila 4 la referencia cruzada a `Alcance-Proyecto-v1.0.md` §6.2, que N-07 acababa de crear |
| N-09 | P3 | La nota de cierre de §4.3 atribuía a S-04 más de lo que S-04 cubre | Cerrado | La nota dice ahora: "El esquema de versión de AT-11, la convención de mensajes de AT-10 y la regla de cálculo de versión de AT-12 provienen de S-04 [...] AT-13 no proviene de S-04: la regla de no editar una migración fusionada es una decisión de diseño declarada por el SOLUTION-INTAKE v1.1 §17.3 P.7". Se verificó la atribución nueva: §17.3 P.7, línea 814, "Las migraciones de EF Core llevan su propia secuencia y **no se editan una vez fusionadas**: un cambio de esquema se corrige con una migración nueva **[D]**". Coincide, incluido el marcador de decisión de diseño. Desapareció además la palabra "umbrales", que §4.3 no contenía |

Nueve de nueve cerrados. Ninguno cerrado parcialmente, ninguno abierto, ninguno rechazado por los correctores.

### 12.3 Verificación específica del contenido operativo de AT-26 y AT-28

Es la condición 6 de §11 de este informe: si la corrección de N-01 alteraba el contenido de AT-26 o AT-28, había que volver a auditar §4 del acuerdo y su coherencia con el README. El generador declara que sólo agregó el puntero a la evidencia. Se verificó por comparación textual contra la transcripción literal que este auditor tomó de la versión anterior.

| Regla | Celda | Antes | Ahora | Resultado |
|---|---|---|---|---|
| AT-26 | Regla | "No hay plazo máximo de respuesta. El punto de control bloquea el avance hasta el OK explícito del agente humano, y ese bloqueo no vence: el orquestador no avanza a la etapa siguiente ni abre la rama siguiente por vencimiento de ningún plazo, sólo por OK recibido" | Idéntico, más la oración final "Respaldo: restricción «Disponibilidad y tiempos de respuesta» del SOLUTION-INTAKE v1.1 §10" | Sin alteración operativa |
| AT-26 | Cómo se verifica | "No existe ninguna rama de etapa posterior abierta antes de la fusión de la anterior, cualquiera sea el tiempo transcurrido" | Idéntico | Sin cambio |
| AT-28 | Regla | "No hay horario core ni franja de disponibilidad comprometida, para ningún rol. La coordinación es asíncrona y su registro es el pull request: ningún acuerdo depende de que dos personas coincidan en un horario, y ninguna regla de este documento se expresa en horas del día" | Idéntico, más la misma oración de respaldo | Sin alteración operativa |
| AT-28 | Cómo se verifica | "Ninguna regla operativa del acuerdo referencia una franja horaria, y toda aprobación queda asentada en el pull request" | Idéntico | Sin cambio |

La declaración del generador es exacta. Lo único que cambió en las dos reglas es el puntero al respaldo; ningún observable, ningún sujeto obligado y ninguna condición de verificación se movieron. Se reejecutó además la verificación que AT-28 declara, que es la que la hace no aspiracional: el barrido de expresiones horarias sobre los seis archivos sigue devolviendo cero reglas expresadas en horas del día. En consecuencia, la condición 6 de §11 no se activa y no corresponde reauditar §4 del acuerdo.

El párrafo de cierre de §4.6 sí cambió, y es donde estaba el defecto. Pasó de afirmar la decisión por cuenta propia a derivarla: "La restricción «Disponibilidad y tiempos de respuesta» del SOLUTION-INTAKE v1.1 §10 declara que [...] Su origen, declarado en la propia restricción, es una decisión del agente humano del proyecto tomada el 2026-07-27 al responder la batería de validación de intake". La diferencia es exactamente la que separaba a N-01 de su cierre: el documento ya no es la fuente de la afirmación, es su consumidor.

### 12.4 Verificación específica del respaldo del intake §10

Se pidió comprobar que la restricción nueva respalde lo que los documentos afirman y no algo parecido. Cotejo cláusula por cláusula.

| Lo que afirma el entregable | Lo que declara el intake v1.1 §10 | Resultado |
|---|---|---|
| AT-28: "No hay horario core ni franja de disponibilidad comprometida, para ningún rol" | "No hay horario core ni franja de disponibilidad comprometida" | Coincide |
| AT-26: "No hay plazo máximo de respuesta" | "y no hay plazo máximo de respuesta" | Coincide |
| AT-26: "ese bloqueo no vence: el orquestador no avanza a la etapa siguiente ni abre la rama siguiente por vencimiento de ningún plazo, sólo por OK recibido" | "El punto de control bloquea indefinidamente hasta el OK explícito del agente humano: el bloqueo no vence" | Coincide |
| AT-28: "La coordinación es asíncrona y su registro es el pull request" | "La coordinación es asíncrona y su registro es el pull request de la etapa" | Coincide |
| §4.6, párrafo de cierre: "La restricción es además explícita en que no debe derivarse ningún acuerdo de nivel de servicio de reloj a partir de ella" | "No debe derivarse ningún acuerdo de nivel de servicio de reloj a partir de esta restricción" | Coincide |
| §4.6, párrafo de cierre: "sobre unas fuentes que declaran el bloqueo hasta el OK explícito y no declaran ni horario ni plazo" | "Las tres fuentes no declaran horario ni plazo: declaran el bloqueo hasta el OK explícito (`Requerimientos-Tecnicos.md` §1 y §10 **[E]**)" | Coincide, incluida la atribución a la fuente y su marcador |
| `README.md` §5: "sin horario core, sin franja comprometida y sin plazo máximo, con el bloqueo del punto de control que no vence" | Idem | Coincide |

Ninguna cláusula del entregable excede lo que la restricción declara, y la restricción no declara nada que el entregable haya dejado sin traducir. Se destaca un acierto de la redacción del intake: separa con marcadores lo que las fuentes sí declaran (**[E]**, el bloqueo hasta el OK) de lo que la decisión agrega (**[D]**, declarar la ausencia en vez de fijar un valor). Un lector externo puede distinguir el hecho de la decisión sin salir del documento, que es lo que la convención de marcadores existe para permitir.

### 12.5 Defectos nuevos introducidos por esta ronda

Cinco, todos P3. Ninguno reabre un hallazgo cerrado ni afecta las condiciones de promoción.

**V-01 (P3) — Residuo de redacción en `Alcance-Proyecto-v1.0.md` §6.2.** El párrafo de apertura pasó a declarar tres pendientes pero conserva la construcción de cuando eran dos: "su resolución es del cliente, y ambos condicionan la categoría 02-Especificacion-Funcional, que no puede especificar el comportamiento correspondiente hasta que se cierren". Son tres, no dos, y la afirmación es falsa para el tercero: la propia fila de la matriz de navegadores declara que lo que bloquea es "el alcance de lo que 03-UX-UI-DX puede prometer [...] y la verificación de compatibilidad en 08-Calidad-Y-Pruebas y 09-Devops", no la categoría 02. Recomendación: "las tres condicionan categorías posteriores, las dos primeras la 02-Especificacion-Funcional y la tercera las categorías 03, 08 y 09".

**V-02 (P3) — Los dos registros de lo abierto del intake no tienen la misma extensión.** La tabla nueva de la sección de supuestos declara dos marcadores `[S]` sin número abiertos, la matriz de navegadores e IC-05. La tabla de §19, "Lo que sigue abierto y no fue alcanzado por esa confirmación", sigue diciendo "Tres pendientes" y enumera CL-04, CL-15 y la matriz de navegadores, sin IC-05, que es tan pendiente como los otros y tampoco fue alcanzado. El párrafo de §19 que la precede también quedó sin ajustar: sigue diciendo "Los ítems marcados **[S]** —los seis supuestos S-01 a S-06— eran valores propuestos", que es la generalización que la corrección de N-03 acotó en la otra sección. No es contradicción estricta, porque las dos tablas tienen alcances declarados distintos, pero deja dos inventarios de lo abierto que no coinciden en un mismo documento. Recomendación: agregar IC-05 como cuarta fila de la tabla de §19 con su consumidor downstream, y alinear el párrafo previo con la formulación acotada. No afecta a 00-Contexto: IC-05 es una decisión de dominio de SelfHosted-Domain, cuyo consumidor son las categorías 02 y 05 de ese proyecto, y no corresponde registrarla en el contexto de solución.

**V-03 (P3) — Conteo incorrecto en el control de cambios del manifiesto.** La entrada nueva cierra con "Es el mismo criterio con el que los diez documentos de `00-Contexto` y `01-Necesidades-Negocio` absorbieron sus correcciones post-audit dentro de la 1.0". Los documentos de esas dos categorías son dieciséis: seis en `00-Contexto` y diez en `01-Necesidades-Negocio`, contados en disco. El número diez corresponde sólo a la segunda. Recomendación: "los dieciséis documentos", o nombrar la cifra por categoría.

**V-04 (P3) — La restricción nueva del intake §10 no se refleja en la tabla de restricciones de la visión.** `Vision-Producto-v1.0.md` §7 enumera RE-01 a RE-11 y declara en §10.1 que su origen es §10 del intake. El intake §10 pasó de diez a once filas de datos con el alta de «Disponibilidad y tiempos de respuesta», y la visión no la absorbió; `Alcance-Proyecto-v1.0.md` §7 sigue diciendo "RE-01 a RE-11". Se atenúa por dos motivos y por eso es P3 y no más. Primero, la correspondencia nunca fue uno a uno: RE-07, alcance de red, no viene de §10 sino de §9 y de §17.1 P.9, de modo que §7 de la visión es un conjunto curado y no un espejo. Segundo, la sustancia está cubierta dentro de la categoría: RE-04 ya declara que "el punto de control bloquea el avance, y es una decisión aceptada, no un impedimento a resolver", y la traducción operativa completa vive en `Acuerdo-Equipo-v1.0.md` §4.6 con su cita al intake. Recomendación: agregar RE-12 a la visión, o declarar en §7 que la lectura de las restricciones de coordinación se delega al acuerdo de equipo.

**V-05 (P3) — El manifiesto quedó con dos filas de control de cambios bajo el mismo identificador de versión, con una justificación inexacta.** Ver §12.6, donde se desarrolla junto con la lectura del criterio de versionado.

### 12.6 Lectura sobre el criterio de no subir versión

Se pidió lectura explícita. La doy en tres partes: si el criterio es defendible, si se aplicó de forma consistente, y dónde no.

**El criterio es defendible, y en el caso de los entregables es además el correcto.** El argumento no es de conveniencia: se apoya en el estado declarado de los documentos y en la mecánica del master-prompt. Los cinco documentos versionados de `00-Contexto` llevan `Estado: Propuesto`, no `Aprobado` ni `Vigente`, y `Rules-Contexto.md` §4.1 trata esos cuatro valores como estados distintos de un ciclo. `Master-Prompt.md` §7 cierra cada fase con su audit y prohíbe avanzar sin veredicto aprobado, de modo que el audit no es una revisión posterior a la publicación sino un paso del propio ciclo de emisión. Un artefacto que nunca salió de `Propuesto` no fue consumido por nadie: subir minor en cada ronda de corrección produciría documentos en v1.3 cuyas versiones 1.0, 1.1 y 1.2 no existieron para ningún lector, y obligaría además, por la política de deprecación de `Master-Prompt.md` §5, a archivar tres estados superados en `_legacy/` que nadie va a consultar. El versionado existe para que un consumidor pueda saber contra qué estado trabajó; sin consumidor no hay nada que señalizar. El criterio, además, no oculta nada: cada corrección quedó registrada como fila propia del control de cambios, con el hallazgo que la originó, que es donde la trazabilidad efectivamente vive.

**El contraste con el intake confirma que el criterio está bien discriminado.** El intake sí subió a 1.1, y correspondía por dos razones independientes: su versión 1.0 había sido consumida —las categorías 00 y 01 se generaron a partir de ella— y `Master-Prompt.md` §13 reglas 4 y 6 mandan explícitamente la subida de minor y el archivado previo. Ambas se cumplieron: `_legacy/2026-07-27/` contiene la 1.0 íntegra. La línea que separa los dos tratamientos —consumido contra no consumido— es la línea correcta y está bien trazada.

**Donde no se aplicó de forma consistente es en el manifiesto, y es el caso que pediste que mirara.** El manifiesto justifica no subir con dos argumentos, y el segundo no se sostiene: "no cambió el contenido derivado sino la referencia a su origen, y el artefacto nunca tuvo una versión previa publicada como vigente". El primero es cierto y verificado: §13 del intake no cambió, y el bloque de solución, la tabla de proyectos, el grafo y las validaciones son idénticos. El segundo es falso contra el propio documento: su campo Estado dice "Aprobado (confirmación explícita del humano, 2026-07-27)", y `Master-Prompt.md` §3 paso 3 establece que el manifiesto se trata como canónico recién tras esa confirmación. Un artefacto aprobado, confirmado por el humano y citado por el `README.md` de `00-Contexto` en su trazabilidad upstream es exactamente un artefacto publicado como vigente. Le aplica la regla del intake, no la de los entregables en `Propuesto`.

El síntoma visible es que el control de cambios del manifiesto tiene hoy dos filas bajo el identificador `1.0`, que por lo tanto designa dos estados distintos del archivo. Es justo lo que la política de una sola versión vigente de `Master-Prompt.md` §5 existe para impedir: quien tenga el manifiesto 1.0 citado desde otro informe —el audit `A-01-Necesidades-Negocio-v1.0.md` está en esa situación— no puede distinguir cuál de los dos estados leyó.

Dicho esto, no recomiendo forzar la subida como única salida, porque el cambio es un puntero y `Master-Prompt.md` §13.7 sólo obliga a re-derivar cuando cambia §13, que no cambió. Hay dos salidas y ambas cierran V-05: subir el manifiesto a 1.1 archivando la 1.0, que es lo más consistente con la regla; o conservar la 1.0 y corregir la justificación, quitando la afirmación de que nunca fue publicado como vigente y reemplazándola por el argumento que sí se sostiene, que es que no cambió el contenido derivado. La segunda es más barata y honesta; lo que no puede quedar es el argumento falso, porque es el que habilita a repetir el criterio donde no corresponde.

**Un caso más, para cerrar la pregunta.** Se revisó si algún otro artefacto debió subir y no lo hizo. Los cinco documentos versionados de `00-Contexto` y su README: no, por lo dicho. El intake: subió y correspondía. El manifiesto: caso discutido. No hay otros artefactos tocados en estas dos rondas.

### 12.7 Precisión sobre este propio informe

Al recontar §10 del intake para evaluar V-04 se detectó que la fila "Once restricciones del cliente | §10, once filas | Correcto" de la tabla de fidelidad de §6 de este informe es inexacta, y que este auditor la arrastró del informe v1.0 sin recontar las filas de la fuente. El conteo correcto: §10 del intake tenía diez filas de datos en la versión 1.0 y tiene once en la 1.1; la visión declara once restricciones RE-01 a RE-11, de las cuales RE-07, alcance de red, no proviene de §10 sino de §9 y de §17.1 P.9. La conclusión de la fila no cambia —no hay invención de restricciones y las once de la visión tienen origen verificable en el intake— pero el fundamento declarado era erróneo. Se deja registrado acá en lugar de corregir §6, para no alterar lo auditado antes de la ronda de corrección.

Es el segundo error de conteo heredado que aparece, después del de los criterios `- [ ]` corregido en §4.3. Ambos apuntan a lo mismo y vale como recomendación de método para futuros audits de esta cadena: los conteos declarados por un informe anterior se recuentan, no se citan.

### 12.8 Condiciones para promover y veredicto final

Repaso de las seis condiciones declaradas en §11.

| # | Condición | Estado |
|---|---|---|
| 1 | Corregir N-01, consolidando en el intake por el flujo de §13 o quitando la atribución | Cumplida por la vía más exigente. La decisión se consolidó en §10 del intake con entrada de control de cambios propia, y los entregables pasaron a citarla |
| 2 | Corregir N-02 y N-05 antes de que otra categoría lea los artefactos de intake | Cumplida. Título del intake correcto; manifiesto con su entrada de control de cambios y su fila 1.0 rectificada. Queda V-05 sobre la justificación, que no impide la lectura |
| 3 | Corregir N-03 antes de despachar la categoría 03 o la 09 | Cumplida antes del despacho de ambas, y con mayor alcance del pedido: se identificó y registró un segundo marcador abierto, IC-05 |
| 4 | Resolver o declarar N-04 y N-06 | Cumplida. Entrada partida en siete; las dos filas de control de cambios rectificadas |
| 5 | Los tres P3 se corrigen o se aceptan de forma explícita | Cumplida. N-07, N-08 y N-09 se corrigieron, no se aceptaron |
| 6 | No reauditar el cuerpo completo salvo que se alterara AT-26 o AT-28 | No se activa. Verificado en §12.3: el contenido operativo de ambas reglas no cambió |

Las seis condiciones se cumplen. Los nueve hallazgos están cerrados: el único P1 y los cinco P2 dejaron de existir, y los tres P3 se corrigieron en lugar de aceptarse.

**Veredicto final de la categoría 00-Contexto: APROBADO CON OBSERVACIONES.**

La calificación se mantiene por rigor de nomenclatura, no por reserva sustantiva: `Master-Prompt.md` §10 reserva APROBADO para el entregable sin hallazgos, y quedan cinco P3 abiertos, V-01 a V-05. Ninguno bloquea. Los P3 se definen como "mejoras estilísticas o de claridad. Se anota y se decide al cierre de fase si corregir", y esa decisión es del orquestador. Tres de los cinco viven en artefactos de intake y dos son de redacción.

La categoría está en condiciones de promover sin corrección adicional. No corresponde un cuarto ciclo de audit sobre 00-Contexto: si el orquestador decide corregir V-01 a V-05, alcanza con registrarlo en los controles de cambios respectivos, sin nueva verificación independiente. Se sugiere, eso sí, resolver V-02 y V-05 antes que los otros tres, porque viven en artefactos que todas las categorías siguientes van a leer y su costo de corrección es de dos líneas cada uno.

Sigue vigente y fuera de este alcance la observación arrastrada desde el informe v1.0: corresponde verificar si `01-Necesidades-Negocio`, generada antes de la consolidación del intake, cita todavía la versión 1.0 o arrastra la formulación que originó el P0-01. Su audit propio es el lugar donde resolverlo, y ahora tiene además dos referencias nuevas que cotejar: la restricción de §10 y la tabla de marcadores abiertos.

---

## Control de cambios

| Versión | Fecha | Cambios | Autor |
|---|---|---|---|
| 2.0 | 2026-07-27 | Re-auditoría de la Fase A, categoría 00-Contexto, posterior a la corrección del audit `A-00-Contexto-v1.0.md`. Alcance completo sobre los seis entregables más la consolidación del intake a la versión 1.1 contra `Master-Prompt.md` §13. Los once hallazgos previos se verifican cerrados. Nueve hallazgos nuevos: 0 P0, 1 P1, 5 P2 y 3 P3, cinco de ellos contra el orquestador y localizados en `SDD/Intake/`. Veredicto APROBADO CON OBSERVACIONES | Auditor independiente, Arquitecto de Soluciones más QA Senior, sin participación en la generación ni en la primera auditoría |
| 2.0 | 2026-07-27 | Verificación de cierre de los nueve hallazgos, agregada como §12 tras la ronda de corrección repartida entre el orquestador y el subagente generador. Los nueve se verifican cerrados de forma independiente, contrastados contra los archivos y contra el intake v1.1, incluidas las dos afirmaciones nuevas que los correctores introdujeron (el supuesto IC-05 y el origen de AT-13 en §17.3 P.7). Se verifica en particular que la corrección de N-01 no alteró el contenido operativo de AT-26 ni de AT-28, con lo que la condición 6 de §11 no se activa. Cinco defectos nuevos, todos P3: V-01 a V-05. Se agrega la lectura pedida sobre el criterio de no subir versión y una precisión sobre un error de conteo heredado en la tabla de fidelidad de §6. Veredicto final de la categoría: APROBADO CON OBSERVACIONES, en condiciones de promover. Sin cambio de versión de este informe: §12 extiende el mismo acto de auditoría y no altera ningún hallazgo, nivel ni veredicto de las secciones 1 a 11, que quedan como registro de lo auditado antes de la corrección. Se declara el criterio de forma explícita porque es el mismo que §12.6 evalúa: si este agregado hubiera modificado un hallazgo o el veredicto previo, habría correspondido emitir una versión 2.1 y archivar la 2.0 | Auditor independiente, Arquitecto de Soluciones más QA Senior, sin participación en la generación ni en la primera auditoría |
