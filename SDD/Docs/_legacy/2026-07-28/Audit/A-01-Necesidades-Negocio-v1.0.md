# Audit A — 01-Necesidades-Negocio

| Campo | Valor |
|---|---|
| Solución | SelfHosted.Service.Core (`Nombre-Solucion`: SelfHosted-Service-Core; `NombreSolucionCodigo`: SelfHosted) |
| Fase auditada | Fase A, categoría 01-Necesidades-Negocio (nivel solución) |
| Ámbito | `SDD/Docs/01-Necesidades-Negocio/`: índice maestro, README de sección y las ocho `NB-XX-*-v1.0.md` de `Necesidades-De-Negocio/` |
| Variante de especialidad evaluada | Analista de Negocio Senior (AG-01), variante `web-monolith` del proyecto principal `SelfHosted-Web` |
| Reglas aplicadas | `Rules-Necesidades-Negocio.md` v1.4; `Master-Prompt.md` v3.6 §3.5, §5 y §10 |
| Insumos upstream contrastados | `SOLUTION-INTAKE-SelfHosted-Service-Core-v1.0.md`, `SOLUTION-MANIFEST-SelfHosted-Service-Core-v1.0.md`, `Vision-Producto-v1.0.md`, `Alcance-Proyecto-v1.0.md`, `Roadmap-Producto-v1.0.md` |
| Auditor | Auditor independiente, perfil Arquitecto de Soluciones más QA Senior, sin participación en la generación de la Fase A |
| Documento | A-01-Necesidades-Negocio-v1.0.md |
| Versión | 1.0 |
| Fecha | 2026-07-27 |

## Tabla de contenido

- [1. Resumen ejecutivo](#1-resumen-ejecutivo)
- [2. Matriz D1 a D9 por documento](#2-matriz-d1-a-d9-por-documento)
- [3. Matriz de estructura obligatoria por documento](#3-matriz-de-estructura-obligatoria-por-documento)
- [4. Verificación de los 15 criterios de aceptación de §6](#4-verificación-de-los-15-criterios-de-aceptación-de-6)
- [5. Coherencia cross-doc](#5-coherencia-cross-doc)
  - [5.1 Grafo de dependencias recalculado](#51-grafo-de-dependencias-recalculado)
  - [5.2 Identificadores de caso de uso](#52-identificadores-de-caso-de-uso)
  - [5.3 Cobertura de capacidades y prioridad MoSCoW](#53-cobertura-de-capacidades-y-prioridad-moscow)
  - [5.4 Fidelidad de los criterios de éxito al upstream](#54-fidelidad-de-los-criterios-de-éxito-al-upstream)
  - [5.5 Enlaces, anclas y rutas](#55-enlaces-anclas-y-rutas)
- [6. Hallazgos](#6-hallazgos)
- [7. Veredicto final y condiciones para promover](#7-veredicto-final-y-condiciones-para-promover)
- [8. Nota metodológica sobre la asignación de niveles](#8-nota-metodológica-sobre-la-asignación-de-niveles)
- [Control de cambios](#control-de-cambios)

---

## 1. Resumen ejecutivo

Se auditaron diez documentos: el índice maestro, el README de sección y las ocho necesidades de negocio. Los diez están presentes en la ruta que exige `Master-Prompt.md` §3.5, con filename conforme al regex de §6, sin vocabulario del dominio fuente del bootstrap, sin descenso al stack técnico concreto, con trazabilidad upstream y downstream declarada en las diez cabeceras y con control de cambios al pie. El grafo de dependencias se recalculó de forma independiente: doce aristas, acíclico, máximo dos dependencias por necesidad, y el orden topológico declarado es válido. Las diecisiete capacidades F-01 a F-17 están cubiertas exactamente una vez, sin huérfanas ni duplicadas, y las ocho prioridades MoSCoW son coherentes con §4 del intake. Ningún plazo usa fecha de calendario.

Hallazgos: 0 P0, 4 P1, 4 P2 y 5 P3, total 13. Los cuatro P1 son las anclas de tabla de contenido que no resuelven en los diez documentos, un conteo MoSCoW erróneo en el índice, una derivación de criterio de éxito no marcada `[D]` en NB-01 y un criterio de NB-04 cuyo plazo precede a la fase que entrega la capacidad que mide. Ninguno rompe trazabilidad ni omite un entregable obligatorio.

Veredicto: APROBADO CON OBSERVACIONES.

## 2. Matriz D1 a D9 por documento

Convención: C cumple, O observado con hallazgo asociado, NA no aplica.

| Documento | D1 idioma y filename ASCII | D2 UTF-8 y LF | D3 Título-Con-Guiones | D4 sufijo `-v<X.Y>.md` | D5 control de cambios | D6 trazabilidad | D7 dominio fuente | D8 conjunto cerrado | D9 evidencia |
|---|---|---|---|---|---|---|---|---|---|
| `Necesidades-Negocio-v1.0.md` | C | C | C | C | C | C | C | C | NA |
| `README.md` | C | C | C (nombre reservado por §2.1) | NA (§2.1 lo fija sin sufijo) | C | C | C | C | NA |
| `NB-01-Visibilidad-Unificada-De-La-Arquitectura-v1.0.md` | C | C | C | C | C | C | C | C | NA |
| `NB-02-Adopcion-Del-Parque-Existente-v1.0.md` | C | C | C | C | C | C | C | C | NA |
| `NB-03-Reproducibilidad-De-La-Arquitectura-v1.0.md` | C | C | C | C | C | C | C | C | NA |
| `NB-04-Alta-De-Servicios-Sin-Copiar-Y-Adaptar-v1.0.md` | C | C | C | C | C | C | C | C | NA |
| `NB-05-Arranque-Sin-Conflictos-De-Direccion-v1.0.md` | C | C | C | C | C | C | C | C | NA |
| `NB-06-Cambios-Revisados-Y-Aplicados-En-Lote-v1.0.md` | C | C | C | C | C | C | C | C | NA |
| `NB-07-Atribucion-Del-Consumo-De-Recursos-v1.0.md` | C | C | C | C | C | C | C | C | NA |
| `NB-08-Control-De-Acceso-Y-Credenciales-De-Maquina-v1.0.md` | C | C | C | C | C | C | C | C | NA |

Evidencia de la verificación mecánica, ejecutada sobre los diez archivos: decodificación UTF-8 correcta en los diez, sin marca de orden de bytes, sin secuencia CRLF, sin tabuladores, con salto de línea final; cero emojis; cero placeholders del tipo `TBD`, `{{`, `[Reemplazar]`, `[Nombre]` o `[YYYY`; cero negritas en los nueve documentos con cabecera de tabla y siete negritas en `README.md`, todas usadas como rótulo de campo de cabecera y no como énfasis decorativo. Los ocho filenames de NB validan contra `^NB-\d{2}-([A-Z][A-Za-z0-9]*)(-[A-Z][A-Za-z0-9]*)*-v\d+\.\d+\.md$` y los ocho son ASCII puro, mientras que el cuerpo conserva tildes y eñes.

D7: se buscaron de forma literal `Docker`, `Compose`, `Blazor`, `MudBlazor`, `.NET`, `SQLite`, `Entity Framework`, `SignalR`, `GitHub`, `macvlan`, `NuGet`, `MAUI`, `ESC-POS`, `Bluetooth`, `impresora`, `térmica`, `Dockerfile`, `SemVer`, `ASP.NET`, `Identity`, `JWT`, `REST` y `HTTP` sobre los diez archivos: cero coincidencias. La traducción a lenguaje de negocio es sistemática y correcta ("motor de contenedores", "formato estándar de composición", "red local", "dirección", "función de derivación de clave"). El único término con carga técnica que aparece es "API", y sólo dentro del nombre de la capacidad F-15 en el índice §4.1, que es vocabulario del glosario del cliente (`Vision-Producto-v1.0.md` §9, entrada "Token de API").

D9: conforme al alcance declarado de la regla, el sistema todavía no existe y las afirmaciones de estos documentos son de especificación, de diseño y de contexto del cliente. Las afirmaciones sobre el parque real ("ocho contenedores", "cinco conjuntos distintos", "servidor sin redundancia de disco") citan el anexo E-19 del intake, marcado `[E]` en origen. No hay afirmaciones sobre el estado del sistema construido.

## 3. Matriz de estructura obligatoria por documento

Estructura exigida por `Rules-Necesidades-Negocio.md` §4.1 (cabecera y tabla de contenido) y §4.2 (diez secciones numeradas, en orden).

| Documento | Cabecera | Tabla de contenido | 1 Descripción | 2 Ejemplo | 3 Impacto | 4 Problema | 5 Criterios | 6 Stakeholders | 7 CU | 8 Dependencias | 9 MoSCoW | 10 Control de cambios | Orden |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| NB-01 | C | O | C | C | C | C | O | C | O | C | C | C | Correcto |
| NB-02 | C | O | C | C | C | C | C | C | O | C | C | C | Correcto |
| NB-03 | C | O | C | C | C | C | C | C | O | C | C | C | Correcto |
| NB-04 | C | O | C | C | C | C | O | C | O | C | C | C | Correcto |
| NB-05 | C | O | C | C | C | C | O | C | O | C | C | C | Correcto |
| NB-06 | C | O | C | C | C | C | C | C | O | C | C | C | Correcto |
| NB-07 | C | O | C | C | C | C | C | C | O | C | C | C | Correcto |
| NB-08 | C | O | C | C | C | C | C | C | O | C | C | C | Correcto |

Las ocho necesidades presentan las diez secciones numeradas, con los títulos exactos de §4.2 y en el orden exacto de §4.2. La tabla de contenido está en las ocho, ubicada entre la cabecera de metadatos y la primera sección, separada por regla horizontal; se marca observada por el hallazgo P1-01 sobre resolución de anclas. Las cabeceras contienen los ocho campos de §4.1: Proyecto, Documento, Versión, Estado, Fecha, Autor, Trazabilidad upstream y Trazabilidad downstream.

Documentos de índice:

| Documento | Cabecera §4.1 ampliada | Tabla de contenido | Tabla resumen (Tabla D) | Mapa de dependencias | Trazabilidad agregada | Control de cambios |
|---|---|---|---|---|---|---|
| `Necesidades-Negocio-v1.0.md` | C, con `Cantidad de NB` y `Versión del catálogo de NB` | O | C | C | C | C |
| `README.md` | O, sin campo `Versión` y en formato de lista | O | C, con impacto principal | C | C (RACI y orden de lectura) | C |

## 4. Verificación de los 15 criterios de aceptación de §6

| # | Criterio de §6 | Resultado | Evidencia de la verificación |
|---|---|---|---|
| 1 | Índice maestro en la raíz de la categoría con tabla resumen | Cumple | `01-Necesidades-Negocio/Necesidades-Negocio-v1.0.md`, §2, ocho filas |
| 2 | Al menos 3 archivos `NB-XX` en `Necesidades-De-Negocio/` | Cumple | Ocho archivos, dentro del rango de 3 a 15 |
| 3 | Las 10 secciones obligatorias en el orden de §4.2 | Cumple | Verificado NB por NB, ver §3 de este informe |
| 4 | Al menos 4 criterios de éxito SMART con métrica, target y plazo | Cumple con observación | Cinco criterios por NB, cuarenta en total; las cuarenta filas tienen número y unidad. Observado: hallazgo P1-04 sobre la alcanzabilidad de una fila de NB-04 |
| 5 | Prioridad MoSCoW con justificación de una línea | Cumple | Las ocho §9 declaran valor y justificación |
| 6 | Trazabilidad upstream explícita a SOLUTION-INTAKE o a 00-Contexto | Cumple | Las ocho cabeceras citan secciones y anexos concretos del intake más documentos de 00-Contexto |
| 7 | §7 con CU previstas y estado del enum | Cumple | Treinta y tres filas, todas con estado `a generar` |
| 8 | Al menos 3 stakeholders nominales cubriendo las tres categorías | Cumple | Cinco filas por NB y seis en NB-08; las tres categorías presentes en las ocho |
| 9 | Filename contra el regex, sin `.v` ni `_v` ni minúsculas | Cumple | Los ocho validan; verificación mecánica en §2 |
| 10 | El índice referencia las NB con paths relativos que resuelven | Cumple | Ocho enlaces del índice y ocho del README resueltos contra el sistema de archivos, más los tres enlaces a 00-Contexto: cero rotos |
| 11 | Ninguna NB con más de 3 dependencias ni ciclos | Cumple | Recalculado de forma independiente, ver §5.1 |
| 12 | README de sección con la tabla de §3.4 completa, si hay más de 5 NB | Cumple con observación | Ocho NB, README presente, con tabla, mapa de dependencias, orden de lectura y RACI. Observado: hallazgo P2-03 sobre la cabecera |
| 13 | Estado de la cabecera dentro del enum cerrado | Cumple | Las ocho NB y el índice en `Propuesto`. Observado: hallazgo P3-03 sobre el `Vigente` del README |
| 14 | Sin emojis, sin negritas decorativas, sin términos del dominio prohibido | Cumple | Verificación mecánica en §2 |
| 15 | Tabla de contenido con enlaces ancla de primer y segundo nivel | No cumple | Hallazgo P1-01: los diez documentos incluyen la tabla, pero 32 de sus anclas no resuelven contra los encabezados |

## 5. Coherencia cross-doc

### 5.1 Grafo de dependencias recalculado

Aristas leídas de la §8 de cada necesidad, sin usar la tabla del índice:

| Necesidad | Depende de | Cantidad |
|---|---|---|
| NB-01 | NB-08 | 1 |
| NB-02 | NB-01, NB-05 | 2 |
| NB-03 | NB-01, NB-04 | 2 |
| NB-04 | NB-01 | 1 |
| NB-05 | NB-01, NB-04 | 2 |
| NB-06 | NB-04, NB-05 | 2 |
| NB-07 | NB-01, NB-04 | 2 |
| NB-08 | ninguna | 0 |

Doce aristas, coincidentes con las doce que declara el índice §3.2. Máximo de dependencias por necesidad: 2, por debajo del límite de 3. Grafo acíclico: NB-08 es la única fuente y NB-02, NB-03, NB-06 y NB-07 son sumideros; no existe camino de retorno desde ningún sumidero.

Orden topológico recalculado: NB-08, NB-01, NB-04, NB-05, NB-02, NB-06, NB-03, NB-07. Coincide exactamente con el declarado en el índice §3.2 y con el orden de lectura del README §4. Cada posición se verificó contra sus predecesores: no hay ninguna arista hacia atrás.

Coherencia con el roadmap: la cadena declarada EP-01 a EP-02 a EP-03 a EP-05 a EP-06 a EP-08 a EP-11 existe en `Roadmap-Producto-v1.0.md` §4.2. Las derivaciones también resuelven: EP-07 depende de EP-05, coherente con NB-06 dependiendo de NB-04; EP-09 depende de EP-08, coherente con NB-06 dependiendo de NB-05; EP-11 depende de EP-08, coherente con NB-02 dependiendo de NB-05.

Discrepancia menor detectada, registrada como P3-02: el índice §3.1 y el README §3 declaran a NB-01 prerequisito directo de NB-06, cuando NB-06 depende de NB-04 y NB-05, y la relación con NB-01 es transitiva. La §8 de NB-01 replica la lista. El índice sí distingue el caso transitivo para NB-08 ("y por transitividad las seis restantes") y no lo hace para NB-01.

### 5.2 Identificadores de caso de uso

Recuento independiente sobre las ocho §7:

| Necesidad | CU declaradas | Cantidad | Proyecto principal / librerías |
|---|---|---|---|
| NB-01 | CU-01 a CU-05 | 5 | 5 / 0 |
| NB-02 | CU-06 a CU-08 | 3 | 2 / 1 (Infrastructure) |
| NB-03 | CU-09 a CU-12 | 4 | 3 / 1 (Infrastructure) |
| NB-04 | CU-13 a CU-17 | 5 | 5 / 0 |
| NB-05 | CU-18 a CU-21 | 4 | 3 / 1 (Domain) |
| NB-06 | CU-22 a CU-25 | 4 | 3 / 1 (Application) |
| NB-07 | CU-26 a CU-28 | 3 | 2 / 1 (Infrastructure) |
| NB-08 | CU-29 a CU-33 | 5 | 5 / 0 |

Total 33 identificadores, contiguos de CU-01 a CU-33, sin huecos y sin colisión entre necesidades. El reparto declarado en el índice §4.2 —28 en `SelfHosted-Web`, 3 en `SelfHosted-Infrastructure`, 1 en `SelfHosted-Application` y 1 en `SelfHosted-Domain`— se verifica exacto. Los cuatro nombres de proyecto coinciden con el `SOLUTION-MANIFEST` §2. La cabecera del índice declara `CU-01 a CU-33` y cada cabecera de NB declara su rango, coincidentes con sus §7.

### 5.3 Cobertura de capacidades y prioridad MoSCoW

| Capacidad | MoSCoW en intake §4 | NB responsable | MoSCoW de la NB | Coherencia |
|---|---|---|---|---|
| F-01 | Must Have | NB-08 | Must Have | Correcta |
| F-02 | Must Have | NB-01 | Must Have | Correcta |
| F-03 | Must Have | NB-01 | Must Have | Correcta |
| F-04 | Must Have | NB-01 | Must Have | Correcta |
| F-05 | Must Have | NB-04 | Must Have | Correcta |
| F-06 | Must Have | NB-05 | Must Have | Correcta |
| F-07 | Must Have | NB-06 | Must Have | Correcta |
| F-08 | Must Have | NB-05 | Must Have | Correcta |
| F-09 | Must Have | NB-06 | Must Have | Correcta |
| F-10 | Must Have | NB-04 | Must Have | Correcta |
| F-11 | Must Have | NB-02 | Must Have | Correcta |
| F-12 | Should Have | NB-07 | Should Have | Correcta |
| F-13 | Should Have | NB-03 | Should Have | Correcta, toma la más alta de F-13 y F-17 |
| F-14 | Should Have | NB-04 | Must Have | Correcta, toma la más alta de F-05, F-10 y F-14 |
| F-15 | Should Have | NB-08 | Must Have | Correcta, toma la más alta de F-01, F-15 y F-16 |
| F-16 | Could Have | NB-08 | Must Have | Correcta, agrupada bajo la más alta |
| F-17 | Could Have | NB-03 | Should Have | Correcta, agrupada bajo la más alta |

Las diecisiete capacidades tienen exactamente una necesidad responsable. No hay capacidad huérfana ni asignada dos veces. Las capacidades F-18 a F-22, `Won't Have v1`, no generan necesidad, y el índice §4.1 lo declara. La agrupación que cada §9 enuncia coincide en los ocho casos con la tabla del índice §4.1. La regla de tomar la prioridad más alta del grupo se aplica de forma uniforme y se justifica en cada §9.

Distribución real por etiqueta declarada en el índice §2: seis Must Have (NB-01, NB-02, NB-04, NB-05, NB-06 y NB-08) y dos Should Have (NB-03 y NB-07). El texto del índice §1 declara otra cosa; ver hallazgo P1-02.

### 5.4 Fidelidad de los criterios de éxito al upstream

Cuarenta criterios, cinco por necesidad. Se rastreó el número de cada fila contra el intake, la visión, el alcance y el roadmap.

Respaldo verificado de las filas más sensibles:

| Fila | Número | Respaldo localizado |
|---|---|---|
| NB-02, adopción del parque | ≥ 6 de 8, ≥ 75 % | Intake §8 y `Vision-Producto-v1.0.md` §6, métrica de adopción; inventario de ocho contenedores en el anexo E-19 |
| NB-02, dimensiones importadas | 6 de 6 | Intake §6, flujo 2: "importa imagen, red, dirección, montajes, dispositivos y variables" |
| NB-02, salvaguardas | 5 de 5 | `Alcance-Proyecto-v1.0.md` §4.1, párrafo de salvaguardas: las cinco coinciden literalmente |
| NB-03, reproducibilidad y 7 días | 100 %, menos de 7 días | Intake §8 y `Vision-Producto-v1.0.md` §6, métrica de reproducibilidad |
| NB-03, configuraciones reales | 6 de 6 | Anexo E-20 del intake, seis configuraciones transcriptas |
| NB-04, reemplazo del método manual | ≥ 90 % | Intake §8 y `Vision-Producto-v1.0.md` §6 |
| NB-04, dimensiones del alta | 8 de 8 | Anexo E-19 del intake, párrafo de traducción a requisitos del alta: enumera exactamente esas ocho dimensiones |
| NB-05, validación de conflicto | ≤ 50 ms | Intake §17.2 P.10: "Validación de conflicto de direcciones IP antes de arrancar un proyecto de hasta 30 servicios, ≤ 50 ms, sin acceso al motor de contenedores" |
| NB-05, resoluciones ofrecidas | 3 de 3 | Intake §6, flujo 3, y anexo E-8 |
| NB-07, sondeo con vistas cerradas | 0 recolecciones | Intake §17.1 P.10 y §17.3: "Cada 3 a 5 s, y sólo con vistas abiertas; ningún sondeo con vistas cerradas" |
| NB-07, frescura del estado | ≤ 5 s y ≤ 30 s | Intake §17.1 P.10 para la recolección y CL-02 para la reconciliación cada 30 segundos |
| NB-07, huella de memoria | menos de 1 GB | Intake §10, plataforma de destino: "presupuesto de cientos de MB, no de GB" |
| NB-08, retención de auditoría | 90 días | Intake §17.1 DA-07 y §17.3 DA-07, marcados `[E]` |
| NB-01, escala del lienzo | 30 nodos y 40 aristas, 2 s, 15 minutos | Puerta técnica PT-01, intake §17.1 P.10 y `Roadmap-Producto-v1.0.md` §4.1 |

Marcado `[D]` de derivaciones: el catálogo declara cinco derivaciones y las cinco están marcadas en la tabla de la necesidad correspondiente, declaradas al pie de su §5 y consolidadas en el índice §5. Se verificó una a una la coherencia entre las tres ubicaciones: NB-01 dos, NB-04 dos y NB-05 una, total cinco, coincidente con el índice §5 y con las tres §10 de control de cambios. Las cinco declaran requerir confirmación del cliente.

Derivación no marcada detectada: la primera fila de NB-01, registrada como hallazgo P1-03.

Plazos: ninguna de las cuarenta filas usa fecha de calendario. Todos los plazos se expresan como "continuo", como meses desde el cierre de un alcance o como hito del roadmap. Es coherente con la restricción del cliente de plazo "sin fecha objetivo" del intake §10 y con `Roadmap-Producto-v1.0.md` §1.1.

### 5.5 Enlaces, anclas y rutas

Rutas: la categoría está en `SDD/Docs/01-Necesidades-Negocio/`, a nivel solución y no bajo `Proyectos/`, conforme a `Master-Prompt.md` §3.5. El índice está en la raíz de la categoría y las ocho necesidades en la subcarpeta `Necesidades-De-Negocio/`, conforme a `Rules-Necesidades-Negocio.md` §3.2. Ninguna necesidad quedó fuera de la subcarpeta y el índice no quedó dentro de ella.

Enlaces relativos: se resolvieron contra el sistema de archivos los diecinueve enlaces relativos de los diez documentos, incluidos los ocho del índice §2, los ocho del README §2, los tres a `../00-Contexto/` del índice §4.4 y los dos internos del README a `Necesidades-Negocio-v1.0.md`. Cero rotos.

Anclas: se compararon los identificadores de las tablas de contenido contra los encabezados de cada documento. Resultado: 32 anclas no resuelven, distribuidas en 3 por cada una de las ocho necesidades, 5 en el índice y 3 en el README. Ver hallazgo P1-01.

## 6. Hallazgos

### P1-01. Anclas de la tabla de contenido que no resuelven, en los diez documentos

- Nivel: P1
- Archivos: los diez documentos de la categoría
- Sección: tabla de contenido de cada documento
- Evidencia: en `NB-01-Visibilidad-Unificada-De-La-Arquitectura-v1.0.md` línea 16 la entrada apunta al ancla `#1-descripcion-de-la-necesidad`, mientras que el encabezado de línea 29 es `## 1. Descripción de la necesidad`, cuyo identificador generado conserva la tilde y es `#1-descripción-de-la-necesidad`. El patrón se repite en las entradas de `#4-problema-especifico-que-resuelve` y `#5-criterios-de-exito` de las ocho necesidades, en las cinco entradas acentuadas del índice (`#1-proposito-y-alcance-del-catalogo`, `#32-grafo-y-verificacion-de-aciclicidad`, `#43-de-metrica-de-exito-del-negocio-a-nb`, `#5-criterios-de-exito-derivados-pendientes-de-confirmacion`, `#41-de-capacidad-del-alcance-a-nb`) y en tres del README. Total verificado de forma mecánica: 32 anclas rotas sobre los diez archivos.
- Impacto: incumple el criterio 15 de `Rules-Necesidades-Negocio.md` §6, que exige tabla de contenido con enlaces ancla a las secciones. La tabla existe pero no cumple su función de navegación, que es la única razón por la que la regla v1.4 la incorporó.
- Recomendación: reemitir las tablas de contenido conservando las tildes en el identificador del ancla, de modo que coincida con el encabezado real. Conviene fijar la convención en las invariantes de solución para que las categorías 02 en adelante no la repitan; el mismo patrón aparece en los documentos de 00-Contexto, fuera del alcance de este audit.

### P1-02. Conteo de prioridades MoSCoW erróneo en el índice maestro

- Nivel: P1
- Archivo: `Necesidades-Negocio-v1.0.md`
- Sección: §1 Propósito y alcance del catálogo, línea 40
- Evidencia: el texto declara "Cinco son Must Have y se corresponden con el conjunto de capacidades sin las cuales la solución no resuelve el problema declarado; dos son Should Have y una agrupa capacidades de prioridad mixta tomando la más alta". La tabla §2 del mismo documento declara Must Have en NB-01, NB-02, NB-04, NB-05, NB-06 y NB-08, es decir seis, y Should Have en NB-03 y NB-07, es decir dos. Bajo la lectura alternativa de "cinco Must puras más una mixta", tampoco cierra: las necesidades que agrupan capacidades de una sola prioridad Must son cuatro (NB-01, NB-02, NB-05 y NB-06), y las que agrupan prioridades mixtas son tres (NB-03, NB-04 y NB-08), según las propias §9 de esos documentos.
- Impacto: el índice maestro es la fuente de consulta de la priorización para 06-Backlog-Tecnico y 07-Plan-Sprint. Un conteo que contradice su propia tabla obliga a cada lector aguas abajo a recontar.
- Recomendación: corregir la frase a seis Must Have y dos Should Have, y declarar por separado que tres necesidades agrupan capacidades de prioridad mixta y toman la más alta, que es lo que documenta §6 del propio índice.

### P1-03. Derivación de criterio de éxito no marcada `[D]` en NB-01

- Nivel: P1
- Archivo: `NB-01-Visibilidad-Unificada-De-La-Arquitectura-v1.0.md`
- Sección: §5 Criterios de éxito, primera fila, línea 63
- Evidencia: la fila declara "Cobertura del parque en el registro | Conjuntos de servicios del parque de referencia representados como proyecto declarado en la solución, sobre los 5 conjuntos distintos del inventario del parque | 5 de 5 conjuntos | 3 meses desde el cierre de la Fase 1", sin marca `[D]`, y la nota al pie de esa §5 afirma "Dos filas están marcadas `[D]`", dejándola fuera. El denominador 5 se verifica contra el anexo E-19 del intake, que enumera cinco proyectos de composición distintos, pero el target del 100 % y el plazo de tres meses no provienen de ninguna métrica declarada: el intake §8 y `Vision-Producto-v1.0.md` §6 sólo fijan la métrica de adopción, con target ≥ 75 % sobre contenedores y no sobre conjuntos. La estructura de la fila es idéntica a la de la quinta fila de NB-05, que sí está marcada `[D]` con la justificación "El total de 8 proviene del inventario verificado del parque, pero el target 0 es una derivación del dolor declarado ... no hay una métrica declarada que lo fije".
- Impacto adicional: el target del 100 % de los conjuntos representados a los tres meses del cierre de la Fase 1 convive con el de NB-02, que en la misma ventana admite ≥ 6 de 8 contenedores adoptados. Las dos lecturas conviven, pero la más exigente no está declarada como derivación y por lo tanto no pasa por la confirmación del cliente.
- Recomendación: marcar la fila con `[D]`, agregarla a la nota al pie de la §5 de NB-01, sumarla a la tabla del índice §5 y actualizar los conteos de "cuarenta criterios, cinco derivados" del índice §5 y del control de cambios de NB-01 y del índice.

### P1-04. Criterio de NB-04 cuyo plazo precede a la fase que entrega la capacidad medida

- Nivel: P1
- Archivo: `NB-04-Alta-De-Servicios-Sin-Copiar-Y-Adaptar-v1.0.md`
- Sección: §5 Criterios de éxito, quinta fila, línea 67
- Evidencia: la fila declara "Tiempo de alta de un servicio frecuente `[D]` | Minutos desde iniciar el alta hasta tener el contenedor corriendo, para un servicio disponible en el catálogo | ≤ 5 min | 6 meses desde el cierre del Alcance 1". El catálogo de servicios reutilizables es la capacidad F-14, que `Roadmap-Producto-v1.0.md` §2.2 ubica en la épica EP-14 de la Fase 3, posterior a las fases 1 y 2. La cuarta fila de la misma tabla, que también mide el catálogo, sí ata su plazo al cierre de la Fase 3.
- Impacto: el criterio no es alcanzable ni medible en la ventana declarada, con lo que no satisface la condición SMART que exige el criterio 4 de §6. La categoría 08-Calidad-Y-Pruebas no puede derivar de él un caso de prueba ejecutable en ese momento.
- Recomendación: reanclar el plazo al cierre de la Fase 3, en línea con la cuarta fila, o bien reformular la métrica para que mida el alta de un servicio frecuente sin depender del catálogo, si lo que se quiere medir es el alta de la Fase 1.

### P2-01. La Tabla C de §7 agrega una columna no prevista en §4.4

- Nivel: P2
- Archivos: las ocho necesidades
- Sección: §7 Trazabilidad a CU
- Evidencia: las ocho tablas declaran el encabezado `| NB | CU prevista | Proyecto | Estado |`, por ejemplo en `NB-02-Adopcion-Del-Parque-Existente-v1.0.md` línea 85. La Tabla C de `Rules-Necesidades-Negocio.md` §4.4 fija exactamente tres columnas: `| NB | CU prevista | Estado |`, y §4.2 describe la sección como "tabla con `NB-XX / CU-YY prevista / estado de la CU`".
- Impacto: bajo. La columna agregada aporta información útil en una solución de cuatro proyectos, pero se aparta del formato exacto que la regla declara y que la categoría 02 va a consumir.
- Recomendación: mantener la información pero reubicarla, por ejemplo integrando el proyecto en el texto de la celda de la CU, o elevar la variación a la regla si se considera que el formato de tres columnas es insuficiente para soluciones multi-proyecto.

### P2-02. Denominador del criterio de direcciones de NB-05 incoherente con el propio documento

- Nivel: P2
- Archivos: `NB-05-Arranque-Sin-Conflictos-De-Direccion-v1.0.md` y `Necesidades-Negocio-v1.0.md`
- Sección: §5 de NB-05, quinta fila, línea 67; y §5 del índice, fila de NB-05, línea 182
- Evidencia: el criterio mide "Direcciones fijas del parque de referencia que siguen anotadas fuera de la solución, sobre las 8 direcciones del parque relevado", mientras que la §1 del mismo documento declara "Sobre un parque donde cinco servicios tienen dirección propia de la red local, esa averiguación se repite cada vez que se agrega uno nuevo". El dolor de origen, intake §1, se enuncia como "cada dirección IP fija de la LAN se anota fuera del sistema", y el anexo E-19 muestra cinco contenedores en modo macvlan con dirección de la red local y tres en red bridge con dirección interna.
- Impacto: el denominador del criterio abarca un conjunto más amplio que el dolor que dice eliminar, y contradice el número que el propio documento usa dos secciones antes. Afecta la verificabilidad del criterio desde 08.
- Recomendación: unificar el denominador. Si lo que se mide son las direcciones de la red local anotadas fuera del sistema, el total es 5; si se decide medir todas las direcciones fijas del parque, corregir la §1 y la justificación del índice §5 para que digan lo mismo.

### P2-03. Cabecera del README sin campo de versión y en formato distinto del resto de la categoría

- Nivel: P2
- Archivo: `README.md`
- Sección: cabecera, líneas 3 a 9
- Evidencia: la cabecera se compone de siete rótulos en negrita —`**Solución:**`, `**Documento:**`, `**Estado:**`, `**Fecha:**`, `**Autor:**`, `**Trazabilidad upstream:**`, `**Trazabilidad downstream:**`— y no incluye el campo `Versión`, pese a que su control de cambios al pie declara la versión 1.0. El índice maestro y las ocho necesidades usan el bloque de tabla de `Rules-Necesidades-Negocio.md` §4.1, con el campo `Versión` presente.
- Impacto: cabecera con campos parciales y con un formato distinto del que usa el resto de la categoría, lo que dificulta el procesamiento uniforme aguas abajo.
- Recomendación: llevar la cabecera del README al mismo bloque de tabla que usan los otros nueve documentos e incorporar el campo `Versión`.

### P2-04. Vocabulario de hitos mezclado dentro de una misma tabla de criterios

- Nivel: P2
- Archivos: `NB-01`, `NB-03`, `NB-04`, `NB-05`, `NB-07`, `NB-08` y el índice
- Sección: columna Plazo de la §5 de cada necesidad
- Evidencia: `NB-03-Reproducibilidad-De-La-Arquitectura-v1.0.md` §5 usa en la misma tabla "3 meses desde el cierre del Alcance 3" (línea 63) y "Al cierre de la Fase 3" (línea 64), que según `Roadmap-Producto-v1.0.md` §1.2 y §2.1 designan el mismo hito. `NB-01` ancla su primera fila a "el cierre de la Fase 1" mientras `NB-02` y `NB-04` anclan la misma ventana de tres y seis meses a "el cierre del Alcance 1". El índice §5 resume ambos como "meses desde el cierre de un alcance".
- Impacto: dos nombres para el mismo hito dentro de una misma tabla obligan a resolver la equivalencia en cada lectura, y la categoría 08 va a instrumentar estos plazos.
- Recomendación: elegir un único vocabulario, preferentemente el de fase del roadmap, que es el que ordena la construcción, y declarar la equivalencia una sola vez en el índice.

### P3-01. La §2 de NB-05 se aproxima a un flujo paso a paso

- Nivel: P3
- Archivo: `NB-05-Arranque-Sin-Conflictos-De-Direccion-v1.0.md`
- Sección: §2 Ejemplo de uso desde la perspectiva del negocio, línea 41
- Evidencia: el párrafo encadena "Elige reasignar. El sistema actualiza la reserva, marca los servicios que dependían de esa dirección como pendientes de redespliegue porque su variable cambió de valor, y levanta respetando el orden que el propio grafo de dependencias declara".
- Impacto: el nivel de detalle se acerca al anti-patrón "NB que en realidad es un caso de uso" de §4.5, aunque el texto conserva el registro narrativo y el lenguaje del cliente que pide §4.2. No se computa como incumplimiento porque no describe un flujo del sistema con pasos numerados ni ramificaciones.
- Recomendación: sintetizar la reacción del sistema en una frase de resultado y dejar el detalle de la secuencia para los casos de uso CU-19 a CU-21.

### P3-02. NB-01 declarada prerequisito directo de NB-06

- Nivel: P3
- Archivos: `Necesidades-Negocio-v1.0.md`, `README.md` y `NB-01-Visibilidad-Unificada-De-La-Arquitectura-v1.0.md`
- Sección: §3.1 del índice (línea 61), §3 del README (línea 49) y §8 de NB-01 (línea 94)
- Evidencia: las tres ubicaciones listan NB-06 entre las necesidades de las que NB-01 es prerequisito. La §8 de NB-06 declara "Depende de: NB-04 ... y NB-05", sin NB-01. La relación es transitiva, y el propio índice sí la marca como tal para NB-08 ("NB-01, y por transitividad las seis restantes").
- Recomendación: distinguir la arista directa de la transitiva también en la fila de NB-01, con la misma redacción que ya se usa para NB-08.

### P3-03. Estado `Vigente` del README sobre un catálogo `Propuesto`

- Nivel: P3
- Archivo: `README.md`
- Sección: cabecera, línea 5
- Evidencia: el README declara `**Estado:** Vigente` mientras el índice maestro y las ocho necesidades declaran `Propuesto`, y `Vision-Producto-v1.0.md`, `Alcance-Proyecto-v1.0.md` y `Roadmap-Producto-v1.0.md` también están en `Propuesto`.
- Recomendación: alinear el estado del README con el del contenido que indexa.

### P3-04. Archivo `.gitkeep` remanente en la carpeta de la categoría

- Nivel: P3
- Archivo: `01-Necesidades-Negocio/.gitkeep`
- Evidencia: la carpeta conserva el marcador de carpeta vacía pese a contener ya el índice, el README y la subcarpeta.
- Recomendación: eliminarlo al cierre de la fase, junto con los de las demás categorías ya pobladas.

### P3-05. Justificación de recorte del índice que remite a una fase no declarada como tal

- Nivel: P3
- Archivo: `Necesidades-Negocio-v1.0.md`
- Sección: §6 Decisiones de recorte del catálogo, línea 191
- Evidencia: la justificación del recorte de F-09 cierra con "NB-07 conserva la observación del consumo, que es un dolor distinto y de otra fase". La afirmación es correcta contra el roadmap, donde F-09 está en la Fase 1 y F-12 en la Fase 2, pero la tabla no cita el documento que fija ese reparto.
- Recomendación: agregar la referencia a `Roadmap-Producto-v1.0.md` §2.2, como sí hace la fila anterior con el intake.

## 7. Veredicto final y condiciones para promover

Veredicto: APROBADO CON OBSERVACIONES.

No se detectaron hallazgos P0. Los diez documentos obligatorios existen, en las rutas correctas, con cabecera completa, con trazabilidad upstream y downstream declarada y consistente con §3.3 de la regla, sin vocabulario del dominio fuente prohibido y sin descenso al stack técnico concreto. La cadena de trazabilidad D6 queda establecida desde el intake y la categoría 00 hacia las necesidades y hacia los casos de uso previstos, sin colisión de identificadores. La cadena no se detiene.

Condiciones para promover a la Fase B, en orden de prioridad:

1. Corregir los cuatro hallazgos P1 antes de despachar la categoría 02. El P1-04 y el P1-03 son bloqueantes para 08-Calidad-Y-Pruebas, que consume la §5 de cada necesidad como input directo de criterios de aceptación; el P1-02 lo es para 06 y 07, que consumen la priorización; el P1-01 es transversal a la navegabilidad de todo el cuerpo documental y conviene resolverlo con una convención de solución antes de que se replique en diez categorías más.
2. Elevar a decisión del orquestador el hallazgo P2-01: o se ajustan las ocho §7 al formato de tres columnas de la regla, o se actualiza `Rules-Necesidades-Negocio.md` §4.4 para admitir la columna de proyecto en soluciones multi-proyecto. No corresponde que la decisión quede implícita.
3. Resolver P2-02, P2-03 y P2-04 en la misma reemisión, por costo marginal nulo.
4. Los cinco P3 quedan a criterio del cierre de fase.
5. Al reemitir, actualizar el control de cambios de cada documento tocado con incremento de versión menor, conforme a la política de versionado de `Master-Prompt.md` §5, y verificar que los conteos declarados en los tres controles de cambios afectados (índice, NB-01 y NB-04) queden alineados con las correcciones.

Se deja constancia de dos elementos que no son hallazgos y que conviene registrar como fortalezas verificadas: el recorte del catálogo está argumentado documento por documento en el índice §6, con el criterio de fusión y partición de §2.2 de la regla aplicado de forma explícita; y el mecanismo de marcado `[D]` de criterios derivados, con su consolidación en el índice §5 y su enlace desde el README §6, es un control de honestidad epistémica que excede lo que la regla exige y que conviene conservar en las categorías siguientes.

## 8. Nota metodológica sobre la asignación de niveles

El despacho de este audit describe P0 como el nivel que aplica, entre otros casos, cuando se "incumple un criterio de §6", y P1 como "incumplimiento de §6 sin romper trazabilidad". Las dos definiciones se solapan. Se resolvió el solapamiento con `Master-Prompt.md` §10, que es la fuente normativa citada: allí P0 cubre la falta de cabecera o de checklist de §6, y P1 cubre el incumplimiento de §6 que no rompe trazabilidad. Bajo esa lectura, el hallazgo P1-01, que es un incumplimiento del criterio 15 de §6 sin efecto sobre la trazabilidad ni sobre la completitud de los entregables, se clasifica P1 y no P0. Si el orquestador prefiere la lectura literal del despacho, el veredicto pasaría a RECHAZADO por ese único hallazgo, sin que cambie el resto del informe ni la lista de correcciones.

---

## Control de cambios

| Versión | Fecha | Cambios | Autor |
|---|---|---|---|
| 1.0 | 2026-07-27 | Auditoría inicial de la categoría 01-Necesidades-Negocio de la Fase A. Diez documentos evaluados, trece hallazgos: cero P0, cuatro P1, cuatro P2 y cinco P3. Grafo de dependencias, orden topológico, identificadores de caso de uso, cobertura de capacidades y conteos de criterios recalculados de forma independiente. Veredicto APROBADO CON OBSERVACIONES | Auditor independiente, Arquitecto de Soluciones más QA Senior |
