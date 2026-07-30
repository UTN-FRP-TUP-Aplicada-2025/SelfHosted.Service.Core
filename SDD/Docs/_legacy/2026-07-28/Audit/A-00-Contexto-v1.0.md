# Audit de Fase A — Categoría 00-Contexto

**Solución:** SelfHosted.Service.Core (`Nombre-Solucion`: SelfHosted-Service-Core; proyecto principal SelfHosted-Web, `web-monolith`)
**Fase:** A — Fundamentos de la solución
**Categoría auditada:** 00-Contexto (nivel solución)
**Alcance:** `SDD/Docs/00-Contexto/`, seis archivos: `Vision-Producto-v1.0.md`, `Alcance-Proyecto-v1.0.md`, `Roadmap-Producto-v1.0.md`, `Compatibilidad-Plataformas-v1.0.md`, `Acuerdo-Equipo-v1.0.md` y `README.md`
**Reglas aplicadas:** `Rules-Contexto.md` v1.5 (§2.2, §3, §4.1 a §4.5, §6), `Master-Prompt.md` v3.6 (§3.5, §5, §10, §13)
**Insumos upstream cotejados:** `SDD/Intake/SOLUTION-INTAKE-SelfHosted-Service-Core-v1.0.md`, `SDD/Intake/SOLUTION-MANIFEST-SelfHosted-Service-Core-v1.0.md`
**Auditor:** Arquitecto de Soluciones más QA Senior, independiente, sin participación en la generación de la Fase A
**Fecha:** 2026-07-27
**Documento:** A-00-Contexto-v1.0.md
**Versión:** 1.0

## Tabla de contenido

- [1. Resumen ejecutivo](#1-resumen-ejecutivo)
- [2. Matriz D1 a D9 por documento](#2-matriz-d1-a-d9-por-documento)
- [3. Matriz de estructura obligatoria por documento](#3-matriz-de-estructura-obligatoria-por-documento)
  - [3.1 Cabecera y tabla de contenido](#31-cabecera-y-tabla-de-contenido)
  - [3.2 Secciones obligatorias de §4.2](#32-secciones-obligatorias-de-42)
  - [3.3 Tablas tipo de §4.4](#33-tablas-tipo-de-44)
  - [3.4 Criterios de aceptación de §6](#34-criterios-de-aceptación-de-6)
- [4. Coherencia cross-doc](#4-coherencia-cross-doc)
- [5. Fidelidad al upstream](#5-fidelidad-al-upstream)
- [6. Hallazgos](#6-hallazgos)
- [7. Lo que se verificó y no es hallazgo](#7-lo-que-se-verificó-y-no-es-hallazgo)
- [8. Veredicto final y condiciones para promover](#8-veredicto-final-y-condiciones-para-promover)
- [Control de cambios](#control-de-cambios)

---

## 1. Resumen ejecutivo

Se auditaron los seis entregables completos de la categoría 00-Contexto contra `Rules-Contexto.md` v1.5 y las invariantes de `Master-Prompt.md` §5. El cuerpo documental es sólido: los cinco documentos obligatorios y el README existen, la estructura de §4.2 está completa en los cinco, los conteos declarados en cada control de cambios se verificaron uno por uno y coinciden, no hay vocabulario del dominio fuente del bootstrap, y ni la visión ni el alcance ni el roadmap mencionan stack, frameworks ni patrones de implementación.

Hallazgos: 1 P0, 2 P1, 3 P2 y 5 P3, once en total. El P0 es de fidelidad al upstream: tres documentos afirman que los seis supuestos `[S]` del intake fueron confirmados por el cliente, cuando el intake los declara abiertos y pendientes de confirmación explícita, y no existe registro de esa confirmación en ninguna parte de la cadena. Eso convierte datos abiertos en datos cerrados para toda la cadena aguas abajo y rompe la trazabilidad D6, porque la cita no respalda lo afirmado.

Veredicto: RECHAZADO. El resto de los hallazgos es corregible sin rehacer contenido.

## 2. Matriz D1 a D9 por documento

Leyenda: C cumple, C-obs cumple con observación, NC no cumple, NA no aplica.

| Invariante | Vision | Alcance | Roadmap | Compatibilidad | Acuerdo | README |
|---|---|---|---|---|---|---|
| D1 idioma rioplatense neutro técnico, tildes y eñes en el cuerpo, filename ASCII | C | C | C | C | C | C |
| D2 UTF-8, EOL LF, tablas con encabezado completo y sin placeholders | C | C | C-obs | C | C | C |
| D3 Título-Con-Guiones en nombre de archivo | C | C | C | C | C | C |
| D4 sufijo `-v<X.Y>.md` con guion medio | C | C | C | C | C | NA |
| D5 política de deprecación y control de cambios | C | C | C | C | C | C |
| D6 trazabilidad upstream y downstream | NC | NC | C | C | NC | C-obs |
| D7 ausencia de vocabulario del dominio fuente del bootstrap | C | C | C | C | C | C |
| D8 conjunto cerrado de tipos de proyecto | C | C | C | C | C | C |
| D9 evidencia verificable | NA | NA | NA | C | NA | NA |

Notas de la matriz.

- D2 en `Roadmap-Producto-v1.0.md`: nueve celdas de las tablas de §2.1 y §3 llevan el valor "Por definir en 06-Backlog y 07-Plan-Sprint". No se computa como violación de D2 porque cada celda nombra la categoría responsable de resolverla, de modo que no es un placeholder sin cerrar; sí deja incompleta la tabla tipo de §4.4 (hallazgo P2-01).
- D4 en `README.md`: la ausencia de sufijo de versión es correcta, `Rules-Contexto.md` §3.4 lo exige sin versión.
- D6 en `Vision-Producto-v1.0.md`, `Alcance-Proyecto-v1.0.md` y `Acuerdo-Equipo-v1.0.md`: la trazabilidad de sección a sección está declarada y es correcta en su mapeo, pero tres afirmaciones sobre el estado de los supuestos del intake contradicen la fuente que citan (hallazgo P0-01). Una cita que no respalda lo afirmado rompe D6.
- D6 en `README.md`: declara el upstream a nivel de documento y no de sección (hallazgo P2-03).
- D9 en los cinco documentos marcados NA: no contienen ninguna afirmación sobre el estado de un sistema construido, que es lo único que D9 alcanza en esta fase. `Compatibilidad-Plataformas-v1.0.md` se computa C porque su §5 declara de forma explícita que el sistema no está construido y separa el estado de especificación de la verificación prevista, que es exactamente el tratamiento correcto antes del handoff.

## 3. Matriz de estructura obligatoria por documento

### 3.1 Cabecera y tabla de contenido

Campos exigidos por `Rules-Contexto.md` §4.1: Título, Proyecto, Documento, Versión, Estado, Fecha, Autor, Trazabilidad upstream, Trazabilidad downstream, más tabla de contenido inmediatamente después de la cabecera para documentos de más de tres secciones de primer nivel.

| Documento | Título | Proyecto | Documento | Versión | Estado | Fecha | Autor | Upstream | Downstream | TdC presente | Anclas de la TdC |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Vision-Producto-v1.0.md | C | C | C | C | C | C | C | C | C | C | 4 no resuelven |
| Alcance-Proyecto-v1.0.md | C | C | C | C | C | C | C | C | C | C | 4 no resuelven |
| Roadmap-Producto-v1.0.md | C | C | C | C | C | C | C | C | C | C | 8 no resuelven |
| Compatibilidad-Plataformas-v1.0.md | C | C | C | C | C | C | C | C | C | C | 3 no resuelven |
| Acuerdo-Equipo-v1.0.md | C | C | C | C | C | C | C | C | C | C | 5 no resuelven |
| README.md | C | C | C | NA | C | C | C | C-obs | C | C | 3 no resuelven |

Las fechas de las seis cabeceras son 2026-07-27, en formato ISO 8601. El estado es Propuesto en los cinco documentos versionados y Vigente en el README, coherente con el conjunto cerrado de §4.1.

### 3.2 Secciones obligatorias de §4.2

| Documento | Secciones exigidas | Presentes y en orden | Resultado |
|---|---|---|---|
| Vision-Producto-v1.0.md | §1 Problema de negocio, §2 Audiencia y stakeholders, §3 Propuesta de valor, §4 Visión a 3 años, §5 Objetivos SMART, §6 Métricas de éxito, §7 Restricciones, §8 Riesgos, §9 Glosario del dominio, §10 Trazabilidad | 10 de 10, en orden | Completa |
| Alcance-Proyecto-v1.0.md | §1 Propósito, §2 Descripción general, §3 Objetivos del proyecto, §4 Alcance incluido con capacidades, entregables y ambientes, §5 Alcance excluido con justificación, §6 Supuestos, §7 Restricciones, §8 Criterios de aceptación, §9 Gestión de cambios de alcance, §10 Trazabilidad | 10 de 10, en orden; §4 abre las tres subsecciones exigidas | Completa |
| Roadmap-Producto-v1.0.md | §1 Propósito, §2 Fases con objetivo, épicas, entregable y release target, §3 Matriz fase a épica a sprint a release, §4 Dependencias entre fases, §5 Criterios de transición, §6 Trazabilidad downstream a 06 y 07 | 6 de 6, en orden; §3 sustituye "sprint" por "etapa" | Completa con observación (P3-01) |
| Compatibilidad-Plataformas-v1.0.md | §1 Resumen ejecutivo, §2 Matriz de compatibilidad, §3 Restricciones justificadas, §4 Alternativas para plataformas no soportadas, §5 Estado de implementación, §6 Trazabilidad downstream a 09 | 6 de 6, en orden | Completa |
| Acuerdo-Equipo-v1.0.md | §1 Propósito, §2 Equipo y roles, §3 Cadencia de ceremonias, §4 Acuerdos de trabajo con branching, code review, comunicación, horario core, documentación y convenciones de commits, §5 Definition of Done, §6 Definition of Ready, §7 Herramientas | 7 de 7 secciones; §4 cubre cinco de los seis componentes exigidos, falta horario core | Incompleta (P1-02) |
| README.md | `Rules-Contexto.md` §3.4: enumerar los cinco documentos con propósito, estado y orden de lectura; declarar omisiones con su motivo; listar stakeholders | Los tres, más la declaración de las dos desviaciones autorizadas y las preguntas abiertas | Completa |

### 3.3 Tablas tipo de §4.4

| Tabla | Ubicación exigida | Columnas exigidas | Columnas encontradas | Resultado |
|---|---|---|---|---|
| Stakeholders | vision §2 | Rol, nombre o cargo, categoría, nivel de involucramiento, responsabilidad principal | Idénticas | Cumple |
| Objetivos SMART | vision §5 | Objetivo, métrica, target numérico, plazo, responsable | Las cinco, más columna ID antepuesta | Cumple |
| Métricas de éxito | vision §6 | Criterio, métrica, target, plazo, fuente del dato | Idénticas | Cumple |
| Riesgos | vision §8 | ID, riesgo, probabilidad, impacto, mitigación, responsable | Idénticas | Cumple |
| Glosario | vision §9 | Término, definición, sinónimos o notas | Idénticas | Cumple |
| Hitos del roadmap | roadmap §2 | Fase, objetivo, épicas, sprints estimados, entregable, release target | Fase, Objetivo, Épicas, Etapas, Entregable, Release target | Cumple con observación (P3-01), con la columna sin resolver en tres fases (P2-01) |
| Criterios de transición | roadmap §5 | Fase origen, fase destino, criterios verificables `- [ ]` | Idénticas, con 27 criterios `- [ ]` en seis transiciones | Cumple |
| Matriz de compatibilidad | compatibilidad §2 | Componente, plataforma 1, plataforma 2, ..., notas | Componente, Sistema operativo, Runtime, Motor de contenedores, Almacenamiento, Navegador, Notas | Cumple |
| Exclusiones | alcance §5 | Funcionalidad excluida, justificación, versión futura tentativa | §5.1 idénticas; §5.2 sin la tercera columna | Cumple con observación (P3-02) |
| Ceremonias | acuerdo §3 | Ceremonia, cuándo, duración, participantes, notas | Idénticas | Cumple |

### 3.4 Criterios de aceptación de §6

Los doce criterios, verificados por conteo propio y no por lo declarado.

| # | Criterio | Verificación | Resultado |
|---|---|---|---|
| 1 | Visión sin stack, frameworks ni patrones de implementación | Barrido de términos de stack sobre visión, alcance, roadmap y README: cero ocurrencias | Cumple |
| 2 | Al menos 5 capacidades incluidas y 3 exclusiones con justificación | 17 capacidades F-01 a F-17; 13 exclusiones justificadas, 9 de producto y 4 de proceso | Cumple |
| 3 | Al menos 3 hitos con criterios de avance verificables `- [ ]` | 5 fases y 6 transiciones, con 27 criterios `- [ ]` | Cumple |
| 4 | Al menos 3 objetivos SMART con métrica numérica, target y plazo | 5 objetivos; OBJ-01, OBJ-02 y OBJ-03 con target numérico y plazo explícito | Cumple |
| 5 | Mínimo 1 stakeholder por categoría con rol concreto | Propietario 2, Implementador 2, Beneficiario 2; ninguno genérico | Cumple |
| 6 | Glosario con mínimo 10 términos si el equipo supera 2 personas, 5 si es individual | 29 términos contados fila por fila, 28 provenientes del glosario del intake más "Motor de contenedores" | Cumple |
| 7 | Compatibilidad declara todas las plataformas target del intake §17 P.9 | Las cinco filas de §17.1 P.9 más las cinco de §17.3 P.9 y las declaraciones de §17.2 P.9 y §17.4 P.9 están representadas en las ocho filas de §2.2 y las siete de §2.1 | Cumple |
| 8 | Acuerdo declara herramientas, ceremonias, branching strategy y SLA de respuesta | Herramientas 9, ceremonias 6, branching AT-01 a AT-05; el SLA de reloj se declara inexistente en las fuentes y se sustituye por la regla de bloqueo AT-26, que es verificable | Cumple |
| 9 | Cada documento declara upstream con secciones específicas y downstream con detalle | Cinco documentos con `SOLUTION-INTAKE §n` explícito; el README declara upstream a nivel de documento | Cumple con observación (P2-03) |
| 10 | Nombre de archivo con patrón `<Nombre>-v1.0.md` y guion medio | Los cinco versionados cumplen; ninguno usa `_v` ni `.v` | Cumple |
| 11 | Sin emojis, sin negritas decorativas, sin referencias a stack ni al dominio fuente del bootstrap | Barrido de símbolos: cero. Negritas: sólo en las etiquetas de cabecera exigidas por §4.1. Dominio fuente: cero ocurrencias | Cumple |
| 12 | Tabla de contenido con enlaces ancla de primer y segundo nivel en documentos de más de tres secciones | Las seis tablas existen y cubren todos los niveles, pero 27 de sus anclas no resuelven | No cumple (P1-01) |

## 4. Coherencia cross-doc

Referencias entre archivos de la fase. Se verificaron las quince referencias cruzadas y todas apuntan a una sección existente: `Vision-Producto-v1.0.md` §4.2 y RG-09 hacia `Alcance-Proyecto-v1.0.md` §5 y §6; `Alcance-Proyecto-v1.0.md` §1, §6.1 y §7 hacia los otros cuatro documentos; `Roadmap-Producto-v1.0.md` §5 hacia `Vision-Producto-v1.0.md` §6; `Compatibilidad-Plataformas-v1.0.md` §4 hacia `Alcance-Proyecto-v1.0.md` §5.1 y hacia CP-06; `Acuerdo-Equipo-v1.0.md` §3 y AT-27 hacia `Alcance-Proyecto-v1.0.md` §9 y §6.2; los cinco enlaces del README a los cinco documentos. Los enlaces son relativos dentro de `SDD/Docs/`, como exige la política de enlaces de `Master-Prompt.md` §5.

Identificadores. No hay colisiones. Los espacios de identificadores están separados por documento y por propósito: DV-01 a DV-05, OBJ-01 a OBJ-05, RE-01 a RE-11, RG-01 a RG-10 en la visión; OP-01 a OP-07, F-01 a F-17, EN-01 a EN-07, CA-01 a CA-10 en el alcance; EP-00, EP-0N y EP-01 a EP-17, PT-01 y PT-02 en el roadmap; CP-01 a CP-09 en compatibilidad; AT-01 a AT-27, DoD-01 a DoD-12 y DoR-01 a DoR-12 en el acuerdo. Los identificadores tomados del intake (F-xx, RG-xx, S-xx, CL-xx, PT-xx) conservan su numeración de origen, que es lo correcto. La única anomalía de forma es EP-0N (P2-02).

Correspondencia roadmap contra alcance. Las diecisiete capacidades F-01 a F-17 tienen una y sólo una épica asociada, EP-01 a EP-17, con correspondencia uno a uno y sin capacidad huérfana ni épica sin capacidad. La asignación de fases de §2.2 coincide celda por celda con la matriz de §3 y con la tabla de fases de §2.1. Las prioridades MoSCoW del alcance son coherentes con la fase asignada, con la excepción declarada y justificada de F-15, Should Have en Fase 4, que el propio documento explica en §2.3 y en la nota del intake §4.

Glosarios. El glosario de la visión no se contradice con el vocabulario de planificación de `Roadmap-Producto-v1.0.md` §1.2: las definiciones de Etapa, Hito interno y Hito demostrable son consistentes entre ambos, y la distinción entre fase y etapa está declarada de forma explícita en las dos partes. La entrada "Proyecto" desambigua correctamente el proyecto del producto frente al proyecto de la composición, que es la confusión que la solución tenía disponible.

Contradicción detectada. El tratamiento de los seis supuestos del intake no es coherente dentro de la propia fase: `Alcance-Proyecto-v1.0.md` §6.1 los declara confirmados y cerrados, mientras `Acuerdo-Equipo-v1.0.md` §7 declara que el valor de S-05 "todavía no está declarada como valor", y tanto `Vision-Producto-v1.0.md` §2.1 como el README §4 siguen tratando el nombre propio del propietario como no declarado, que es exactamente S-06. Se detalla en P0-01.

## 5. Fidelidad al upstream

Se cotejaron los datos duros de los seis documentos contra el intake.

| Afirmación auditada | Fuente en el intake | Resultado |
|---|---|---|
| Parque de ocho contenedores y dieciocho imágenes | §1 y anexo E-19, que enumera ocho contenedores | Correcto |
| Cuatro métricas de éxito con sus umbrales | §8 y checklist §19 | Correcto en cifras |
| Diez riesgos con probabilidad, impacto y mitigación | §11 | Correcto, los diez, traducidos a lenguaje de negocio |
| Once restricciones del cliente | §10, once filas | Correcto |
| Veintiocho términos de glosario del cliente | §12 y checklist §19 | Correcto, más un término propio declarado |
| Diecisiete capacidades y cinco exclusiones identificadas F-18 a F-22 | §4 | Correcto |
| Cuatro alcances incrementales y trece etapas identificadas | §15 | Correcto |
| Umbrales de cobertura 90/85, 80/70, 60/50 y 55/45 | §17.4 P.6, §17.2 P.6, §17.1 P.6 y §17.3 P.6 | Correcto |
| Debian 13 kernel 6.12, .NET 10, Docker 26.x con `compose` v5 y `buildx`, interfaz del motor v29.4.1, SQLite con WAL | §17.1 P.9 y §17.3 P.9 | Correcto |
| Umbrales de PT-01 y alcance de PT-02 | §15 y §18, SM-01 y SM-02 | Correcto |
| Ausencia de fechas de calendario | §10, "sin fecha objetivo" | Correcto: la única fecha de los seis archivos es la de emisión, 2026-07-27 |
| Ausencia de cifras de presupuesto | §10, sin presupuesto monetario | Correcto: RE-03 declara la restricción económica sin inventar cifra |
| Exclusión de dos instancias sobre el mismo almacenamiento | §17.3 P.12, "cargas que no soporta" | Correcto |
| Los seis supuestos S-01 a S-06 están confirmados por el cliente | Sección de supuestos abiertos, §8, checklist §19 y advertencia de cierre | Incorrecto, ver P0-01 |

No se detectó ninguna otra invención de dato. Cuando el material no alcanzaba, los documentos declaran la brecha en lugar de completarla: la fila de navegador de `Compatibilidad-Plataformas-v1.0.md` §2.2, el tiempo de respuesta de reloj de `Acuerdo-Equipo-v1.0.md` §4.6, el reparto de EP-12, EP-14 y EP-17 de `Roadmap-Producto-v1.0.md` §2.3 y la formulación de OBJ-05 en `Vision-Producto-v1.0.md` §5. Ese tratamiento es correcto y conviene preservarlo en la corrección.

## 6. Hallazgos

### P0-01 — Se afirma una confirmación del cliente que el intake declara pendiente

Nivel: P0. Archivos y secciones: `Alcance-Proyecto-v1.0.md` §6.1 línea 141; `Vision-Producto-v1.0.md` §5 línea 115 y §6 líneas 121 a 124; `Acuerdo-Equipo-v1.0.md` §4.3 línea 104 y §5 línea 156.

Evidencia. `Alcance-Proyecto-v1.0.md` línea 141: "Los seis supuestos que el SOLUTION-INTAKE registra con marcador de supuesto fueron confirmados por el cliente y se tratan como datos cerrados." `Vision-Producto-v1.0.md` línea 115: "OBJ-01 a OBJ-04 derivan de las cuatro métricas de éxito del SOLUTION-INTAKE §8, marcadas como supuesto S-01 y ya confirmadas por el cliente." La columna "Fuente del dato" de las cuatro filas de `Vision-Producto-v1.0.md` §6 repite "supuesto S-01 confirmado". `Acuerdo-Equipo-v1.0.md` línea 104: "Los umbrales de este bloque provienen del supuesto S-04 del intake, ya confirmado", y línea 156: "Los umbrales de DoD-03 provienen del supuesto S-02 del intake, ya confirmado."

La fuente citada dice lo contrario. `SOLUTION-INTAKE-SelfHosted-Service-Core-v1.0.md` línea 19: "Ninguno de estos valores está declarado en las tres fuentes. Se propone un valor operable para no bloquear la cadena y se marca para confirmación explícita." Línea 170, sobre §8: "Requieren confirmación del cliente antes de que el orquestador las trate como cerradas." Checklist §19, línea 2644: "§8 tiene 4 métricas de negocio con target y plazo numéricos. Marcadas [S] S-01: requieren confirmación del cliente." Línea 2677: "Los ítems marcados [S] —los seis supuestos S-01 a S-06— son valores propuestos, no declarados por el cliente. El orquestador debe presentarlos en su batería de validación de intake y obtener confirmación explícita antes de tratarlos como cerrados."

No hay registro de esa confirmación. El intake sigue en versión 1.0 y su control de cambios tiene una única entrada, la de emisión, sin la entrada que `Master-Prompt.md` §13 regla 2 y regla 3 exigen cuando una respuesta a la batería de validación se consolida en el intake. La columna "Respuesta del cliente" de §7 está vacía en las quince filas. La confirmación registrada del humano que sí existe, en el manifiesto derivado, alcanza al manifiesto y a §13 del intake, no a los supuestos de negocio.

La afirmación además se contradice dentro de la propia fase: `Acuerdo-Equipo-v1.0.md` §7 declara sobre el repositorio remoto que "La ubicación concreta del remoto proviene del supuesto S-05 del intake y todavía no está declarada como valor", y `Vision-Producto-v1.0.md` §2.1 junto con el README §4 siguen registrando que el nombre propio del propietario "no está declarado en las fuentes: supuesto S-06 del intake". S-05 y S-06 no pueden ser a la vez datos cerrados y datos sin declarar.

Por qué es bloqueante. Rompe la trazabilidad D6: la cita al `SOLUTION-INTAKE` no respalda lo afirmado, sino que lo desmiente. Y el efecto es material aguas abajo, no cosmético: 01-Necesidades-Negocio ya consume las métricas de S-01 como criterios de éxito, y 08-Calidad-Y-Pruebas y 09-Devops van a consumir S-02 y S-04 como umbrales cerrados de sus controles bloqueantes. El README §5, que es el lugar donde la categoría registra lo que queda abierto, enumera cuatro preguntas y no incluye ninguno de los seis supuestos, de modo que la cadena pierde el único registro que los mantenía visibles.

Recomendación. Reemplazar las cinco afirmaciones por la formulación que el intake sostiene: valores propuestos por el intake, pendientes de confirmación explícita del cliente. Agregar los seis supuestos a la tabla de preguntas abiertas del README §5 con su dueño y lo que condicionan. Marcar en el punto de uso los elementos que dependen de un supuesto abierto: OBJ-01 a OBJ-04 y las cuatro métricas de la visión, DoD-03 y AT-10 a AT-12 del acuerdo. Si el humano ya confirmó los seis en la conversación de validación, el camino correcto no es afirmarlo en 00-Contexto sino consolidarlo en el `SOLUTION-INTAKE` por el flujo de `Master-Prompt.md` §13, con entrada de control de cambios y subida de minor, y recién entonces citarlo.

### P1-01 — Veintisiete anclas de las tablas de contenido no resuelven

Nivel: P1. Archivos: los seis. Secciones: la tabla de contenido de cada documento.

Evidencia. Las anclas se generan sin tildes ni eñes mientras los títulos las llevan, de modo que el destino no existe. `Vision-Producto-v1.0.md` línea 21: `- [4. Visión a 3 años](#4-vision-a-3-anos)`, contra el título de la línea 83 `## 4. Visión a 3 años`, cuya ancla es `#4-visión-a-3-años`. Lo mismo en `Roadmap-Producto-v1.0.md` línea 14, `- [1. Propósito](#1-proposito)` contra `## 1. Propósito`. El reparto es: Vision 4, Alcance 4, Roadmap 8, Compatibilidad 3, Acuerdo 5, README 3. Las anclas de títulos sin tilde ni eñe resuelven todas.

Por qué es P1 y no P0. La tabla de contenido existe en los seis documentos, está ubicada inmediatamente después de la cabecera y cubre todos los títulos de primer y de segundo nivel, de modo que el criterio 12 de §6 se cumple en cobertura y ubicación. Lo que falla es el destino de los enlaces, que es mecánico y se corrige sin tocar contenido. Aun así incumple el propósito declarado del cambio 1.5 de las reglas, que es la navegabilidad para el lector humano, y por eso no puede quedar como observación.

Recomendación. Regenerar las anclas conservando tildes y eñes, en minúsculas y con guiones, y verificar el conjunto antes de promover. La numeración de sección se mantiene como está.

### P1-02 — `Acuerdo-Equipo-v1.0.md` §4 no cubre el horario core

Nivel: P1. Archivo: `Acuerdo-Equipo-v1.0.md`, sección §4.

Evidencia. `Rules-Contexto.md` §4.2 exige para §4: "Acuerdos de trabajo (branching, code review, comunicación, horario core, documentación, convenciones de commits)". El documento abre §4.1 Ramas y pull requests, §4.2 Revisión y aprobación, §4.3 Convenciones de commits y versionado, §4.4 Documentación, §4.5 Secretos y §4.6 Comunicación y tiempos de respuesta. Cinco de los seis componentes exigidos están cubiertos; el horario core no aparece en ninguna de las veintisiete reglas AT-01 a AT-27, ni siquiera como ausencia declarada, a diferencia del tiempo de respuesta de reloj, que sí se declara inexistente en las fuentes en la nota de cierre de §4.6.

Recomendación. Agregar una regla operativa en §4.6, o una nota equivalente a la brecha ya declarada, que fije el horario core o declare de forma explícita que las fuentes no lo establecen y que la coordinación es asíncrona por el pull request. Una línea alcanza; lo que no puede quedar es el componente sin tratar.

### P2-01 — Tres de las cinco fases del roadmap no tienen iteración objetivo

Nivel: P2. Archivo: `Roadmap-Producto-v1.0.md`, secciones §2.1 y §3.

Evidencia. La columna "Etapas" de §2.1 dice "Por definir en 06-Backlog y 07-Plan-Sprint" para la Fase 2, la Fase 3 y la Fase 4, y las seis filas correspondientes de §3 dicen "Por definir en 07-Plan-Sprint". `Rules-Contexto.md` §4.4 exige en esa tabla la columna "sprints estimados", y §5.4 lo formula como pregunta de calidad: "¿Los hitos del roadmap tienen fecha objetivo o iteración objetivo? Sin uno de los dos, el hito no se puede cerrar." Como el proyecto no admite fechas por decisión del cliente, la iteración objetivo es la única de las dos vías disponibles, y queda sin resolver en tres de cinco fases.

No se computa como violación de D2 porque cada celda nombra la categoría responsable de resolverla, de modo que no es un placeholder sin cerrar sino una postergación declarada. Sí deja la tabla tipo incompleta.

Recomendación. Declarar un rango de etapas estimadas por fase, aunque sea grueso y marcado como estimación revisable, o declarar de forma explícita por qué esas tres fases no admiten estimación todavía y qué condición la habilita.

### P2-02 — El identificador EP-0N rompe la convención que el propio documento declara

Nivel: P2. Archivo: `Roadmap-Producto-v1.0.md`, secciones §1.2, §2.1, §2.2 y §3.

Evidencia. §1.2 declara: "Épica | Agrupación de capacidades que la categoría 06 desarrolla en historias. Identificadas EP-XX en este documento." La segunda épica de la Fase 0 se identifica EP-0N en las cuatro apariciones, que no es de dos dígitos y se lee como un marcador sin resolver. Las invariantes de `Master-Prompt.md` §5 fijan identificadores "con dos dígitos uniformes". Estos identificadores son insumo directo de 06-Backlog, que los va a consumir como estructura del backlog según §6 del propio roadmap.

Recomendación. Renumerar la épica con un identificador de dos dígitos que no colisione con la serie de la Fase 1, por ejemplo EP-99 reservado para cimientos o una serie propia EPC-01 y EPC-02 declarada en §1.2, y propagar el cambio a las cuatro apariciones antes de que 06 lo consuma.

### P2-03 — El README declara upstream sin secciones específicas

Nivel: P2. Archivo: `README.md`, cabecera línea 8.

Evidencia. La cabecera declara "Trazabilidad upstream: SOLUTION-INTAKE-SelfHosted-Service-Core-v1.0, SOLUTION-MANIFEST-SelfHosted-Service-Core-v1.0", a nivel de documento. El criterio 9 de `Rules-Contexto.md` §6 pide "trazabilidad upstream (SOLUTION-INTAKE con secciones específicas)" para cada documento de la carpeta. Los otros cinco documentos sí la declaran a nivel de sección.

Recomendación. Precisar las secciones del intake que sostienen el contenido propio del README, que son §2 para los stakeholders, §7 para los dos casos límite abiertos y §13 para la identidad de la solución.

### P3-01 — Sustitución de "sprint" por "etapa" en el roadmap sin declarar la desviación

Nivel: P3. Archivo: `Roadmap-Producto-v1.0.md`, título de §3 y columna de §2.1.

Evidencia. `Rules-Contexto.md` §4.2 nombra la sección "§3 Matriz fase → épica → sprint → release" y §4.4 la columna "sprints estimados". El documento usa "Matriz fase, épica, etapa y release" y la columna "Etapas". La sustitución es coherente con el modelo de gestión declarado, que no tiene sprints de duración fija, y está explicada en §1.2 y en `Acuerdo-Equipo-v1.0.md` §2.1, de modo que no confunde al lector. Lo que falta es declararla como desviación de la tabla tipo.

Recomendación. Anotar la equivalencia sprint igual a etapa en una nota al pie de §3, o registrarla en el README junto con las otras dos desviaciones autorizadas.

### P3-02 — La tabla de exclusiones de proceso omite la columna de versión futura

Nivel: P3. Archivo: `Alcance-Proyecto-v1.0.md`, sección §5.2.

Evidencia. §5.1 usa las tres columnas exigidas por §4.4. §5.2 usa "Excluido | Justificación", sin "Versión futura tentativa". Cuatro exclusiones de proceso quedan sin declarar si son permanentes o revisables.

Recomendación. Agregar la tercera columna, previsiblemente con "No planificado" en las cuatro filas, o declarar en una línea que las exclusiones de proceso son permanentes mientras dure el modo de trabajo declarado.

### P3-03 — El README caracteriza de más el defecto que se deja de lado en el acuerdo de equipo

Nivel: P3. Archivo: `README.md`, sección §3, fila de `Acuerdo-Equipo-v1.0.md`.

Evidencia. El README dice "Las reglas de la categoría lo reservan para equipos de más de dos personas, y el equipo de esta solución es de dos". `Rules-Contexto.md` §2.1 lo declara obligatorio para equipos de más de dos personas y recomendado para "Equipos de 2 personas que coordinan con stakeholders externos". El apartamiento real es del umbral de `Master-Prompt.md` §6, `equipo_n` mayor que 2, no de una prohibición de las reglas de la categoría.

Recomendación. Precisar que el documento pasa de recomendado a generado, y que el umbral del que se aparta es el del master-prompt. La decisión y su motivo están bien declarados; sólo la caracterización de la regla es imprecisa.

### P3-04 — La lectura de restricciones en clave de alcance omite dos de las once

Nivel: P3. Archivo: `Alcance-Proyecto-v1.0.md`, sección §7.

Evidencia. El texto de apertura dice "Este documento agrega la lectura de cada una en clave de alcance", y la tabla trata RE-01 y RE-04 juntas, RE-02, RE-03, RE-05, RE-06, RE-07, RE-08 y RE-11. RE-09, marco normativo, y RE-10, flujo de trabajo obligatorio, no aparecen.

Recomendación. Agregar las dos filas, aunque sea para declarar que no tienen efecto sobre el alcance, o ajustar la frase de apertura para que no prometa las once.

### P3-05 — La visión declara un origen upstream que su tabla de trazabilidad no mapea

Nivel: P3. Archivo: `Vision-Producto-v1.0.md`, cabecera línea 9 y sección §10.1.

Evidencia. La cabecera declara upstream a "SOLUTION-INTAKE §1, §2, §3, §4, §5, §8, §9, §10, §11, §12". La tabla de §10.1 mapea nueve secciones del documento a §1, §2, §3, §4, §8, §9, §10, §11, §12 y al anexo E-19, pero ninguna fila cita §5, las historias de usuario.

Recomendación. Agregar §5 al mapeo donde corresponda, previsiblemente en la propuesta de valor, o quitarlo de la cabecera.

## 7. Lo que se verificó y no es hallazgo

Se deja constancia expresa para que la corrección no introduzca regresiones por sobreinterpretación.

- La generación de `Compatibilidad-Plataformas-v1.0.md` y de `Acuerdo-Equipo-v1.0.md` es una desviación autorizada por decisión explícita del humano, del defecto de `Rules-Contexto.md` §2.2 y del umbral `equipo_n` mayor que 2 de `Master-Prompt.md` §6 respectivamente. El README §3 la declara con su motivo, como exige la regla general de §2.2, y §1.1 y §1 de cada documento la reiteran en el lugar de uso. Correcto.
- El vocabulario de contenedores, proyectos, servicios, despliegues, lienzo, redes y direcciones es el dominio legítimo de esta solución y proviene del glosario del intake §12. No es vocabulario prohibido por D7. El barrido de términos del dominio fuente del bootstrap dio cero ocurrencias.
- El stack aparece únicamente en `Compatibilidad-Plataformas-v1.0.md`, que es su objeto, y en las herramientas de `Acuerdo-Equipo-v1.0.md` §7, que el criterio 8 de §6 exige declarar. Visión, alcance, roadmap y README están limpios de stack, verificado por barrido.
- D9 no alcanza a las afirmaciones de diseño, de especificación ni de contexto de esta fase. No se encontró ninguna afirmación sobre el estado de un sistema construido. `Compatibilidad-Plataformas-v1.0.md` §5 lo declara de forma explícita, que es el tratamiento correcto.
- La trazabilidad downstream de `Roadmap-Producto-v1.0.md`, `Compatibilidad-Plataformas-v1.0.md` y `Acuerdo-Equipo-v1.0.md` no enumera 01, 02 ni 05 en su cabecera. No es hallazgo: `Rules-Contexto.md` §3.3 pide declarar "qué categorías consumen sus decisiones", y §4.2 acota el downstream obligatorio de esos documentos a 06 y 07 en el roadmap y a 09 en compatibilidad. Enumerar categorías que no consumen sería peor.
- La ubicación de la carpeta es la correcta según `Master-Prompt.md` §3.5: la solución tiene cuatro proyectos, de modo que 00-Contexto es de nivel solución y vive directamente bajo `SDD/Docs/`, sin el subnivel `Proyectos/`, que existe y está reservado para las categorías 02 a 11. El path de este informe, `SDD/Docs/Audit/A-00-Contexto-v1.0.md`, es el que fija §10.
- Los conteos declarados en los cinco controles de cambios se verificaron uno por uno y son exactos: 29 términos de glosario con 28 de origen en el intake, 17 capacidades, 13 exclusiones, 10 criterios de aceptación, 19 épicas, 13 etapas identificadas, 6 transiciones, 7 componentes de la matriz, 8 plataformas con versión mínima, 9 restricciones de plataforma, 27 acuerdos, 6 ceremonias, 12 condiciones de terminado, 12 de listo y 9 herramientas.
- No hay emojis, no hay negritas decorativas fuera de las etiquetas de cabecera exigidas por §4.1, no hay tabuladores, no hay BOM y el EOL es LF en los seis archivos.

## 8. Veredicto final y condiciones para promover

Veredicto: RECHAZADO.

El motivo es un único hallazgo P0: tres documentos afirman una confirmación del cliente sobre los seis supuestos del intake que la fuente citada declara pendiente y que no está registrada en ninguna parte de la cadena. Todo lo demás es corregible sin rehacer contenido, y el cuerpo documental es de buena calidad: la estructura está completa, los conteos son exactos, la fidelidad al upstream es alta en los catorce datos duros cotejados salvo el que origina el P0, y las brechas de información se declaran en lugar de completarse por invención.

Condiciones para promover a la Fase A.2 y al resto de la cadena:

1. Corregir P0-01 en los tres documentos, agregar los seis supuestos al registro de preguntas abiertas del README §5 y marcar los elementos que dependen de un supuesto abierto en su punto de uso. Si el humano confirmó los supuestos, consolidar la confirmación primero en el `SOLUTION-INTAKE` por el flujo de `Master-Prompt.md` §13, con entrada de control de cambios y subida de minor, y recién después citarla.
2. Corregir P1-01 regenerando las veintisiete anclas y verificando que resuelvan.
3. Corregir P1-02 agregando el tratamiento del horario core en `Acuerdo-Equipo-v1.0.md` §4.
4. Resolver o declarar los tres P2. En particular, renumerar EP-0N antes de que 06-Backlog consuma las épicas.
5. Los cinco P3 se corrigen o se aceptan de forma explícita al cierre de fase, a criterio del orquestador.
6. Re-audit acotado a los puntos 1 a 4. No requiere re-auditar el cuerpo completo, salvo que la corrección del P0 modifique los objetivos, las métricas o los umbrales de terminado, en cuyo caso vuelve a auditarse la coherencia cross-doc.

Corresponde revisar además si `01-Necesidades-Negocio`, ya generada, propagó la afirmación del P0-01 al derivar sus criterios de éxito de las métricas de S-01. Queda fuera del alcance de este informe y se señala para el audit de esa categoría.

---

## Control de cambios

| Versión | Fecha | Cambios | Autor |
|---|---|---|---|
| 1.0 | 2026-07-27 | Audit inicial de la Fase A, categoría 00-Contexto, sobre los seis entregables de `SDD/Docs/00-Contexto/`. Once hallazgos: 1 P0, 2 P1, 3 P2 y 5 P3. Veredicto RECHAZADO por el P0 de fidelidad al upstream sobre el estado de confirmación de los seis supuestos del intake | Auditor independiente, Arquitecto de Soluciones más QA Senior |
