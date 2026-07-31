# Auditoría M4 · corte 2 · `01-Necesidades-Negocio` · ronda 1

| Campo | Valor |
| --- | --- |
| Producto | SelfHosted Service |
| Documento | M4-01-Necesidades-Negocio-r1.md |
| Versión | 1.0 |
| Fase auditada | M4 — Migración de `SDD/Docs/`, corte 2 (categoría de nivel producto 01) |
| Alcance | Los diez entregables de `SDD/Docs/01-Necesidades-Negocio/` en versión 2.0: `Necesidades-Negocio.md`, `README.md` y `Necesidades-De-Negocio/NB-01` a `NB-08` |
| Línea de base | `01-Necesidades-Negocio/_legacy/2026-07-30/`, diez archivos con sufijo `-v1.0.md` |
| Normativa aplicada | `Rules-Necesidades-Negocio` 3.1 §6; `Vocabulario-Rules` 2.1 §9 y §10; `Migracion-Rules` 1.0 §6 (catorce criterios y seis P0); `Master-Prompt` §10; `Master-Prompt-Migracion` §10 |
| Upstream consultado | `SDD/Docs/00-Contexto/` 2.0 (`Vision-Producto.md` §9 como glosario raíz), `SDD/Intake/PRODUCT-INTAKE-SelfHosted-Service.md` 3.0 §12 y §23, `SDD/Intake/PRODUCT-MANIFEST-SelfHosted-Service.md` 2.0 §1.1, `SDD/Docs/Audit/Plan-Migracion-4.1-a-6.0.md` 1.1, `SDD/Docs/Audit/M4-00-Contexto-r1.md`, `IA.SDD/CHANGELOG.md` entradas `[5.0]` y `[5.1]` |
| `tipo_proyecto_codigo` | `web-monolith` · categoría de nivel producto |
| Auditor | Auditor independiente (Arquitecto de Soluciones + QA Senior), invocado desde cero |
| Fecha | 2026-07-30 |
| Ronda | 1 |

---

## 1 · Resumen ejecutivo

Los diez documentos están migrados, archivados y consistentes con su línea de base. La migración es **estrictamente léxica y de forma de cabecera**: el `diff` contra `_legacy/` no muestra ni una sola línea de contenido de negocio eliminada, agregada o alterada en los ocho `NB-XX`. Los ocho identificadores NB, los 44 criterios de éxito con sus 132 componentes, los 36 casos de uso previstos, el grafo acíclico, las siete decisiones de recorte y las nueve brechas abiertas están donde estaban y dicen lo que decían.

**Cero hallazgos P0.** Los seis P0 propios de una migración normativa se verificaron uno por uno y ninguno se cumple: no hay contenido inventado, ninguna sección exigida por la 3.1 quedó rellenada por inferencia, la procedencia del manifiesto **sigue declarando el conjunto 4.1**, con `Rules-Necesidades-Negocio` en 2.0 y no en 3.1, no había corrección manual que pisar —los diez archivados son byte a byte idénticos a `HEAD`—, el estado previo está archivado en el `_legacy/` de su propia carpeta, y las diez filas del plan quedan resueltas y declaradas en §4.1 de este informe.

El punto crítico de esta migración —la doble dirección del renombre de «proyecto»— se resolvió bien en las dos direcciones. **Cero sobre-sustituciones**: ninguna de las 89 ocurrencias de «proyecto» del corpus de origen pasó a «proyecto de código» sin serlo ya; las 17 del dominio («proyecto SelfHosted») y las 30 del emprendimiento («agente humano del proyecto», «el riesgo más alto del proyecto», «el disparador declarado del proyecto») quedaron intactas, verificado por conteo y por enumeración una por una. **Cero sub-sustituciones**: no queda ninguna ocurrencia desnuda que designe la unidad de compilación. **Cero «reproducto»**: las 7 ocurrencias de `resoluci` del cuerpo —6 en NB-05 y 1 en el índice— sobreviven las 7, verificado por conteo contra la línea de base. Cero roturas de concordancia de género. Los 71 enlaces markdown no ancla y los 105 enlaces ancla resuelven.

El hallazgo H-02 del corte 1 **queda cerrado**: los cinco enlaces al artefacto renombrado —cuatro en el índice y uno en NB-04 §5— apuntan a `Alcance-Producto.md` y resuelven en disco.

| Nivel | Cantidad |
| --- | --- |
| P0 | **0** |
| P1 | 1 |
| P2 | 2 |
| P3 | 1 |
| **Total** | **4** |

El único P1 no es un defecto del texto de 01 —que está correcto tal como está escrito— sino un hueco del glosario raíz que 01 consume: «conjunto de servicios», alias del «proyecto SelfHosted» que aparece en nueve de los diez artefactos y sostiene el denominador de un criterio medible, no tiene entrada en `Vision-Producto.md` §9. La deuda se origina aguas arriba y se salda con una fila en 00.

**Veredicto: APROBADO CON OBSERVACIONES.** M4 puede avanzar al corte siguiente.

---

## 2 · Matriz D1-D9 por documento

Leyenda: **C** conforme · **P** parcial, con hallazgo · **n/a** no aplica.

| Documento | D1 idioma | D2 encoding | D3 Título-Con-Guiones | D4 versionado | D5 deprecación | D6 trazabilidad | D7 vocabulario prohibido | D8 conjunto cerrado | D9 evidencia |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `Necesidades-Negocio.md` | C | C | C | C | C | C | C | n/a | C |
| `README.md` | C | C | C | C | C | C | C | n/a | C |
| `NB-01-Visibilidad-Unificada-De-La-Arquitectura.md` | C | C | C | C | C | C | C | n/a | **P** · H-03 |
| `NB-02-Adoptabilidad-Del-Parque-Existente.md` | C | C | C | C | C | C | C | n/a | C |
| `NB-03-Reproducibilidad-De-La-Arquitectura.md` | C | C | C | C | C | C | C | n/a | **P** · H-03 |
| `NB-04-Alta-De-Servicio-Sin-Copiar-Y-Adaptar.md` | C | C | C | C | C | C | C | n/a | **P** · H-03 |
| `NB-05-Arranque-Previsible-Y-Conflictos-Anticipados.md` | C | C | C | C | C | C | C | n/a | C |
| `NB-06-Cambios-Revisados-Y-Aplicados-En-Lote.md` | C | C | C | C | C | C | C | n/a | C |
| `NB-07-Atribucion-Del-Consumo-Del-Servidor.md` | C | C | C | C | C | C | C | n/a | C |
| `NB-08-Control-De-Acceso-Y-Credenciales-De-Maquina.md` | C | C | C | C | C | C | C | n/a | C |

Evidencia de la matriz:

- **D1.** Rioplatense técnico en los diez. Sin emojis: el único carácter no ASCII decorativo del corpus es la flecha `→` del orden topológico del índice §3.2, que es notación y venía de la línea de base sin cambios. Las negritas de las filas nuevas de control de cambios marcan términos normativos y clasificaciones, no son decorativas.
- **D2.** Los diez son UTF-8 (`file`).
- **D3.** Los ocho filenames satisfacen `^NB-\d{2}-([A-Z][A-Za-z0-9]*)(-[A-Z][A-Za-z0-9]*)*\.md$`, sin acentos ni eñes: `NB-08-Control-De-Acceso-Y-Credenciales-De-Maquina.md` escribe «Maquina» sin tilde y la conserva en el título del cuerpo. Nota metodológica: el criterio 9 de `Rules-Necesidades-Negocio` 3.1 §6 todavía cita el regex con `-v\d+\.\d+.md`, que la propia §3.1 de esa regla derogó en su versión 2.0 al sacar el sufijo del archivo vivo. Se evaluó contra §3.1, que es la declaración vigente. El regex desactualizado es un defecto del archivo de reglas y no del entregable; no se eleva a hallazgo porque está fuera del destino auditado.
- **D4/D5.** Los diez declaran su versión en el campo `Versión` de la cabecera y no en el nombre. Las diez copias archivadas llevan `-v1.0.md`, incluido el `README-v1.0.md` que `Rules-Necesidades-Negocio` 3.1 §3.4 obliga a versionar al archivar. El bump es major en los diez, correcto por el salto major de la regla que los gobierna.
- **D6.** Las diez cabeceras declaran trazabilidad upstream con secciones concretas y downstream con las CU previstas. Los diez nombran el intake y los artefactos de 00 por su nombre vigente. La cadena `PRODUCT-INTAKE → 00-Contexto → NB → CU` está completa.
- **D7.** Cero ocurrencias de `DSL`, `ESC-POS`, `MAUI`, `Bluetooth`, `NuGet`, `.NET 10` e «impresora térmica». Cero literales del motor de contenedores por su nombre comercial.
- **D8.** No aplica: ningún documento de la categoría declara un `tipo_proyecto_codigo`, y no debe, por el nivel producto de `Vocabulario-Rules` §4 R3.
- **D9.** Conforme salvo en tres documentos, donde el registro de sustitución léxica que `Vocabulario-Rules` §9.5 exige declara un conteo de ocurrencias que no verifica contra el archivado. Ver **H-03**.

### 2.1 Conformidad con `Vocabulario-Rules` 2.1 §10

| # | Criterio | Estado | Evidencia |
| --- | --- | --- | --- |
| 1 | «Proyecto» a secas no designa unidad de compilación ni producto | **C** | Las 30 ocurrencias desnudas del cuerpo vivo designan el emprendimiento, 28 de ellas en el rol «agente humano del proyecto». Enumeradas y clasificadas una por una en §4.3 |
| 2 | «Solución» a secas no designa el agrupador de construcción | **C** | Cero ocurrencias de «solución» como término en el corpus vivo. Las 7 supervivientes de la cadena `soluci` son subcadena de «resolución» |
| 3 | Los cuatro campos de identidad distinguibles | **C** | Sólo `Nombre-Producto` aparece en prosa. `Raiz-Codigo` no aparece, que es lo que R3 exige |
| 4 | Documento de nivel producto nombra con `Nombre-Producto` y no con `Raiz-Codigo` | **C** | Las diez cabeceras declaran `| Producto | SelfHosted Service |`. **Ninguna declara un proyecto de código**, conforme a R3 y a la cabecera de `Rules-Necesidades-Negocio` 3.1 |
| 5 | Choque con el glosario del dominio del cliente declarado según §6 | **C** | El intake §12 declara los tres referentes de «proyecto» con su contexto y con la prohibición de fusión; el índice §1 y el `README.md` §6 convención 1 lo transcriben |
| 6 | Ningún sinónimo nuevo de los seis términos de §2 | **C** | Ninguno introducido por esta migración |
| 7 | «Migración» calificada fuera de los dos archivos de forma desnuda admitida | **C** | Las diez filas nuevas de control de cambios abren con «Migración normativa del conjunto 4.1 al 6.0». Las menciones desnudas posteriores son anafóricas dentro de la misma fila o nombran el artefacto `Plan-Migracion-4.1-a-6.0.md` |
| 8 | Términos que la fase acuña, en más de un artefacto, declarados en el glosario | **P** | Ver §3.2 criterio 2 y **H-01** |
| 9 | Términos con más de un referente: glosario o forma calificada | **P** | Ver §3.2 criterio 3 y **H-01** |
| 10 | Ninguna forma desnuda de familia calificada sin resolver en sección despachada por separado | **P** | Ver §3.2 criterio 3 y **H-01** |
| 11 | **Criterio negativo**: ninguna polisemia de contextos disjuntos reportada como defecto | **C** | Once polisemias evaluadas y descartadas, enumeradas en §3.3 de este informe |
| 12 | Toda invariante de desambiguación cita su verificación de colisión | n/a | Esta categoría no declara invariantes: consume las del intake §12 y las del glosario raíz |
| 13 | Ninguna sustitución por reemplazo global de cadena, con registro de revisadas y cambiadas | **P** | El procedimiento fue por ocurrencia y está verificado en las dos direcciones (§4.3 y §4.4). El registro existe en los diez documentos, y en tres declara un conteo que no verifica: **H-03** |

### 2.2 Conformidad con `Rules-Necesidades-Negocio` 3.1 §6

| # | Criterio | Estado | Evidencia |
| --- | --- | --- | --- |
| 1 | Índice maestro en la raíz con tabla resumen | C | `Necesidades-Negocio.md` §2, ocho filas |
| 2 | Al menos 3 archivos `NB-XX` en la subcarpeta | C | Ocho, dentro del máximo razonable de 15 |
| 3 | Las 10 secciones obligatorias en orden en cada NB | C | Verificado archivo por archivo: ver §3.1 de este informe |
| 4 | Al menos 4 criterios SMART con métrica, target y plazo | C | 8, 5, 5, 6, 5, 5, 5, 5 = 44. Todos con número y unidad salvo la excepción declarada de estabilidad de sesión de NB-01, cuyo umbral lo fija PT-01 al medir y que el índice §6 declara |
| 5 | Prioridad MoSCoW en §9 con justificación de una línea | C | Las ocho. Seis Must, dos Should |
| 6 | Trazabilidad upstream explícita a PRODUCT-INTAKE y/o 00-Contexto | C | Las ocho cabeceras, con secciones concretas |
| 7 | §7 declara las CU previstas con estado del enum | C | 36 CU, todas `a generar`, sin colisión de identificador |
| 8 | Al menos 3 stakeholders nominales cubriendo las tres categorías | C | 7 filas en siete NB y 8 en NB-08; propietario, propietario del contenido, implementador, beneficiario y consultado en todas. Ninguno genérico |
| 9 | Filenames sin `.v` ni `_v`, en Título-Con-Guiones | C | Ver D3 y su nota sobre el regex desactualizado del criterio |
| 10 | El índice referencia las NB con paths correctos y todos resuelven | C | Los ocho enlaces del índice §2 y los siete del §7 resuelven por existencia en disco |
| 11 | Ninguna NB depende de más de 3, sin ciclos | C | Máximo dos dependencias. Orden topológico `NB-08 → NB-01 → NB-04 → NB-05 → NB-02 → NB-06 → NB-03 → NB-07`, verificado acíclico contra las ocho §8 |
| 12 | README de la sección si hay más de 5 NB | C | Existe, con la tabla de §3.4 completa: índice, mapa de dependencias, orden de lectura y RACI |
| 13 | Estado en el enum cerrado | C | Los diez en `Propuesto` |
| 14 | Sin emojis, negritas decorativas ni D7 | C | Ver D1 y D7 |
| 15 | Tabla de contenido con anclas de primer y segundo nivel | C | Los diez la tienen tras la cabecera. Los 106 enlaces ancla resuelven contra sus títulos |
| 16 | Todo término que la categoría acuña o precisa, en más de un artefacto, declarado en `Vision-Producto.md` §9 | **No conforme, un caso** | **H-01** |
| 17 | Ninguna forma desnuda de término polisémico sin resolver en artefacto que se lee por secciones | **P** | Ver §3.2 criterio 3. El caso es el mismo de H-01 |
| 18 | **Criterio negativo**: ninguna polisemia de contextos disjuntos reportada ni corregida calificando todo | C | Ver §3.3. La migración no calificó ninguna ocurrencia de más |

### 2.3 Conformidad con `Migracion-Rules` 1.0 §6

| # | Criterio | Estado | Evidencia |
| --- | --- | --- | --- |
| 1 | Fuente de contenido declarada en el plan con uno de los tres valores | **Parcial** | El plan §4 declara «documento de origen» para las diez filas. Dos documentos usaron además «documento hermano», valor admitido pero no declarado en el plan. **H-02** |
| 2 | Ninguna sección con contenido ajeno a las tres fuentes | C | Las cinco incorporaciones de contenido del corte tienen fuente verificada: §4.2 de este informe |
| 3 | Ninguna sección exigida y sin fuente quedó rellenada | C | La estructura de la 2.0 y la de la 3.1 coinciden sección por sección: la 3.1 no agrega ninguna sección obligatoria, sólo criterios de aceptación. No hubo sección nueva que llenar ni que emitir como pendiente |
| 4 | Estado previo archivado en el `_legacy/` de su propia carpeta | C | Diez archivos en `01-Necesidades-Negocio/_legacy/2026-07-30/`, con la subcarpeta `Necesidades-De-Negocio/` replicada |
| 5 | Contenido sin destino enumerado con su texto localizable | C | No hay: el `diff` contra la línea de base no muestra ninguna línea de contenido eliminada en ninguno de los diez |
| 6 | Ninguna corrección manual pisada sin declarar la interpretación | C | No había corrección manual que pisar: los diez archivados son byte a byte idénticos a la versión de `HEAD` (`diff` de cero líneas en los diez) |
| 7 | Cada documento del plan lleva su clasificación de §4.3 | C | Las diez filas del plan §4 declaran «Regenerar contenido», y las diez filas nuevas de control de cambios la repiten |
| 8 | Intake verificado contra la plantilla vigente, bump major | n/a | Fase M2, fuera del alcance de este corte |
| 9 | Orden de la cadena D6 | C | Intake 3.0 (M2), manifiesto 2.0 (M3), 00-Contexto 2.0 (corte 1) y 01 2.0 (corte 2), en ese orden |
| 10 | Degradación declarada si no había procedencia | n/a | El destino declaraba procedencia. El plan §6 lo declara y no supone ningún origen |
| 11 | Procedencia reescrita sólo con la cadena completa | C | `PRODUCT-MANIFEST` §1.1 sigue declarando el conjunto **4.1**. Ningún documento de 01 declara procedencia propia, y el índice lo dice explícito: «El bloque de procedencia del destino no se toca: es trabajo de la fase M5» |
| 12 | Ninguna fila del plan sin resolver y sin declarar | C | Las diez filas de 01 quedan resueltas y declaradas en §4.1 de este informe. Ver **H-04** sobre el §8 del plan |
| 13 | Ningún renombre resuelto por inferencia | C | `Alcance-Proyecto.md` → `Alcance-Producto.md` está literal en la entrada `[5.0]` del `CHANGELOG.md`, bloque «Artefactos generados». El índice y NB-04 citan la entrada. Las 30 «reproducto» que NB-05 invoca están en la entrada `[5.1]`, y NB-05 cita `[5.1]`: la cita es correcta |
| 14 | Ninguna sustitución por reemplazo global de cadena | C | Verificado en las dos direcciones y por conteo: §4.3 y §4.4 |

---

## 3 · Matriz de estructura obligatoria y gobierno del glosario

### 3.1 Estructura obligatoria por documento

Las diez secciones de `Rules-Necesidades-Negocio` 3.1 §4.2, en orden, en los ocho `NB-XX`:

| Documento | Cab. | TdC | §1 | §2 | §3 | §4 | §5 | §6 | §7 | §8 | §9 | §10 | Orden |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| NB-01 | C | C | C | C | C | C | C (8) | C (7) | C (6) | C | C | C (3) | C |
| NB-02 | C | C | C | C | C | C | C (5) | C (7) | C (3) | C | C | C (3) | C |
| NB-03 | C | C | C | C | C | C | C (5) | C (7) | C (4) | C | C | C (3) | C |
| NB-04 | C | C | C | C | C | C | C (6) | C (7) | C (7) | C | C | C (3) | C |
| NB-05 | C | C | C | C | C | C | C (5) | C (7) | C (4) | C | C | C (3) | C |
| NB-06 | C | C | C | C | C | C | C (5) | C (7) | C (4) | C | C | C (3) | C |
| NB-07 | C | C | C | C | C | C | C (5) | C (7) | C (3) | C | C | C (2) | C |
| NB-08 | C | C | C | C | C | C | C (5) | C (8) | C (5) | C | C | C (3) | C |

Entre paréntesis, el número de filas de la tabla de la sección. Ninguna sección opcional de §4.3 aplica a `web-monolith` y ninguna se emitió, que es lo correcto.

Índice maestro y README:

| Documento | Cabecera | Campos propios del índice | TdC | Contenido exigido | Control de cambios |
| --- | --- | --- | --- | --- | --- |
| `Necesidades-Negocio.md` | C | C · `Cantidad de NB` = 8 y `Versión del catálogo de NB` = 2.0, coincidentes con los hechos | C (16 anclas) | C · tabla resumen §2 con las seis columnas de la Tabla D, mapa de dependencias §3, trazabilidad agregada §4 | C (6 filas) |
| `README.md` | C | C · `Cantidad de NB` = 8 | C (9 anclas) | C · los cuatro contenidos mínimos de §3.4: índice §2, mapa de dependencias §3, orden de lectura §4, RACI §5 | C (3 filas) |

La columna `Versión` que el `README.md` §2 agrega a la tabla de §3.4 es una extensión admisible: la regla declara ese contenido «como mínimo». Los ocho valores coinciden con el campo `Versión` de la cabecera de cada archivo, verificado uno por uno.

**Filas históricas de los controles de cambios.** Ninguna reescrita. El conteo antes y después da +1 en los diez documentos, y el `diff` contra la línea de base muestra en los diez una **adición** de línea (`123a124`, `109a110`, `110a111`, `118a119`, `108a109`, `109a110`, `109a110`, `113a114`, `330a332`, `143a146`) y ninguna modificación. `SDD-Development-Guide.md` §VI.2 se respeta: la fila 1.0 del `README.md` y la de NB-06, que nombran `Alcance-Proyecto.md` en texto monoespaciado, **conservan el nombre legado**, y los dos documentos declaran explícitamente por qué no se tocan. Es la decisión correcta: son registro histórico y no referencias a resolver.

### 3.2 Gobierno del glosario, los cuatro criterios

**Criterio 1 — Sin contradicciones. Conforme.** Ningún término tiene dos definiciones incompatibles entre los diez artefactos. La categoría no mantiene glosario propio, que es lo que `Rules-Necesidades-Negocio` 3.1 §6 exige, y las dos declaraciones de vocabulario que emite —índice §1 y `README.md` §6 convención 1— dicen lo mismo entre sí, lo mismo que `Vision-Producto.md` §9 y lo mismo que el intake §12. Se compararon las tres tablas de referentes de «proyecto» término por término: coinciden, y la del README transcribe además la consecuencia downstream del intake §12 —«en contexto de proceso dejar el término sin calificar es la forma correcta»— sin deformarla.

**Criterio 2 — Completitud. No conforme, un caso.** Los términos que 01 usa en más de uno de sus artefactos y que sí están declarados en el glosario raíz: «proyecto SelfHosted», «proyecto de código», «proyecto», «servicio», «despliegue», «adopción», «lienzo», «arista», «changeset», «catálogo», «variable compartida del proyecto», «referencia de variable», «higiene del modelo», «huérfano», «escalado horizontal», «escalado vertical», «autoarranque», «token de API», «ámbito», «motor de contenedores», «socket del motor de contenedores», «etapa», «punto de control», «puerta técnica», «hito demostrable», «capa», «alcance» y «brecha» —esta última incorporada por el cierre de H-01 del corte 1, verificado en disco—.

El caso no conforme es **«conjunto de servicios» / «conjunto»**, alias del «proyecto SelfHosted» que aparece en nueve de los diez artefactos, encabeza el título de NB-01 y es el denominador de un criterio medible. Es **H-01**. «Parque» se evaluó como segundo candidato y queda por debajo del umbral: ver la justificación en H-01.

**Criterio 3 — Polisemia gobernada. No conforme en el mismo caso, conforme en el resto.** La familia «proyecto», que es la que esta migración podía romper, está gobernada: los tres referentes tienen entrada de glosario que los declara, la forma «proyecto de código» va siempre completa en las 8 ocurrencias del cuerpo vivo, «proyecto SelfHosted» va calificada en las 17 del dominio, y las 30 del emprendimiento quedan a secas porque el intake §12 declara que calificarlas produciría una afirmación falsa. Se aplicó el criterio de colisión de `Vocabulario-Rules` §9.2 —el contexto de lectura es la sección— sobre las 89 ocurrencias de la línea de base, sección por sección: ninguna forma desnuda queda sin resolver dentro de su sección.

El incumplimiento es el de «conjunto»: en NB-01 §5 la métrica del primer criterio distingue el conjunto real del parque de su representación —«Conjuntos de servicios del parque de referencia representados como proyecto SelfHosted»— y en NB-02 §3 el mismo término desnudo designa ya la representación —«un mismo contenedor no puede terminar asociado a dos conjuntos»—. Los dos usos viven en prosa de parque y arquitectura, que no es un contexto disjunto, y NB-01 §5 es precisamente una sección que `Rules-Necesidades-Negocio` §3.3 despacha por separado hacia 08-Calidad-Y-Pruebas. Es **H-01**.

**Criterio 4 — Criterio negativo. Conforme.** Se evaluaron once polisemias y **once se descartan**. Se enumeran en §3.3 con su razón, para que la ronda siguiente no las vuelva a levantar. La migración además no calificó ninguna ocurrencia de más: no hay ni un solo «proyecto de código» nuevo sobre un referente que no lo sea, que es la corrección que el falso positivo induce y que §9.1 declara defecto.

### 3.3 Polisemias evaluadas y descartadas

| # | Término | Referentes en la categoría | Por qué no es hallazgo |
| --- | --- | --- | --- |
| 1 | **«proyecto»** | (a) entidad del dominio: el agrupador de servicios del lienzo; (b) unidad de compilación; (c) emprendimiento | Los tres contextos son disjuntos —producto, código, proceso— y están **declarados** en el intake §12 y en `Vision-Producto.md` §9. El intake declara además que calificar el tercero produciría una afirmación falsa. Reportar la coexistencia como defecto es el falso positivo que `Vocabulario-Rules` §9.1 describe y que su §10 y `Master-Prompt` §10 declaran defecto del informe. Se reconfirma el descarte del corte 1 |
| 2 | **«solución»** | (a) dentro de «re**soluci**ón»; (b) citada entre comillas dentro de las filas nuevas de control de cambios, como término sustituido | Ninguna es un uso del término. (a) es subcadena de otra palabra y no se toca; (b) es la mención metalingüística que el registro de §9.5 obliga a hacer. Cero ocurrencias designando el nivel superior o el agrupador de construcción |
| 3 | **«migración»** | (a) migración normativa del framework; (b) `Plan-Migracion-4.1-a-6.0.md` como nombre de artefacto | El referente R2 de `Vocabulario-Rules` §9.6 —migraciones de datos o de esquema del producto documentado— **no aparece** en esta categoría: se verificó por barrido. La primera mención de cada sección va calificada como «migración normativa»; las posteriores son anafóricas dentro de la misma fila. Es el tratamiento estándar de una familia calificada |
| 4 | **«registro»** | (a) el registro declarado de la arquitectura; (b) «imagen de registro» en NB-04 §5; (c) «registro de reservas» en NB-05 §6; (d) el registro de auditoría de NB-08 §3; (e) «el registro que esa regla exige» en las filas de control de cambios | Es el caso literal del ejemplo de `Vocabulario-Rules` §9.2, y (b), (c) y (e) están **calificadas**. Las ocurrencias desnudas de (a) viven en NB-01 y NB-02, en secciones donde ningún otro referente aparece, y (d) es anafórica dentro de su propio ítem. Calificarlas todas es la corrección que §9.1 declara defecto |
| 5 | **«capa»** | (a) cada una de las cuatro divisiones internas del proyecto de código, en las celdas de CU; (b) las tres capas de lectura del tablero de NB-07 §5 | (a) está declarado en el glosario raíz y aparece **siempre** calificado como «capa de presentación» / «capa de aplicación». (b) vive en una sola fila de NB-07 §5 que enumera cuáles son las tres —«servidor, proyecto SelfHosted y contenedor»— y se resuelve dentro de la propia fila. Secciones distintas, forma calificada en la que puede colisionar |
| 6 | **«servicio»** | (a) la configuración de un contenedor dentro de un proyecto SelfHosted; (b) «SelfHosted Service», el nombre del producto; (c) «cortar el servicio», prosa corriente | (a) está declarado en el glosario raíz. (b) es un nombre propio en inglés, con mayúsculas, que ningún lector confunde con la entidad. (c) es lenguaje natural funcionando |
| 7 | **«alcance»** | (a) el alcance del proyecto; (b) cada uno de los cuatro incrementos declarados por el cliente | Declarado con sus dos referentes en `Vision-Producto.md` §9. El segundo va **siempre con su número** —«el cierre del Alcance 1»— y el primero nunca lo lleva: la distinción es decidible por la forma dentro de cualquier sección |
| 8 | **«origen»** | (a) el origen de la imagen del contenedor, en NB-04 §5; (b) «documento de origen», en las filas de control de cambios | (a) está declarado en el intake §12. Las dos formas van calificadas y viven en secciones disjuntas: el cuerpo de la necesidad y la fila de control de cambios |
| 9 | **«conjunto»** en su sentido no dominial | (a) «conjunto normativo 4.0 / 4.1 / 6.0»; (b) «conjunto de cambios pendientes», el changeset; (c) «un conjunto distinto y más acotado», prosa corriente | Las tres van **calificadas** y ninguna colisiona con el sentido del dominio. El hallazgo H-01 **no** es la coexistencia de estos tres con el cuarto: es que el cuarto, el dominial, no tiene entrada de glosario. Se declara acá para que la ronda siguiente no confunda las dos cosas ni «corrija» calificando estas tres |
| 10 | **«estado»** | (a) el campo `Estado` de la cabecera; (b) el estado de la CU en §7; (c) el estado del equipo y de los contenedores en NB-07 | Cada uno lleva su complemento y viven en secciones disjuntas. Prosa corriente en el tercero |
| 11 | **«criterio»** | (a) criterio de éxito de §5; (b) criterio de aceptación CA-XX de `Alcance-Producto.md`; (c) «el criterio aplicado fue», prosa | Los dos primeros van calificados y el tercero es prosa. La cadena `criterio de éxito → criterio de aceptación` está declarada en el índice §4.4 y es una relación, no una ambigüedad |

---

## 4 · Coherencia cross-doc y verificación específica de la migración

### 4.1 Estado de las diez filas del plan

| Fila del plan §4 | Clasificación | Fuente declarada | Fuente efectiva | Estado |
| --- | --- | --- | --- | --- |
| `01-Necesidades-Negocio/Necesidades-Negocio.md` | Regenerar contenido | documento de origen | documento de origen + **documento hermano** (nombres vigentes de 00-Contexto; `Vision-Producto.md` §9 como glosario raíz) + intake §12 | **Resuelta** |
| `01-Necesidades-Negocio/README.md` | Regenerar contenido | documento de origen | documento de origen + **documento hermano** (los ocho `NB-XX` para la columna de versión de §2; 00-Contexto y el intake §12 para la convención de vocabulario) | **Resuelta** |
| `.../NB-01-Visibilidad-Unificada-De-La-Arquitectura.md` | Regenerar contenido | documento de origen | documento de origen | **Resuelta** |
| `.../NB-02-Adoptabilidad-Del-Parque-Existente.md` | Regenerar contenido | documento de origen | documento de origen | **Resuelta** |
| `.../NB-03-Reproducibilidad-De-La-Arquitectura.md` | Regenerar contenido | documento de origen | documento de origen | **Resuelta** |
| `.../NB-04-Alta-De-Servicio-Sin-Copiar-Y-Adaptar.md` | Regenerar contenido | documento de origen | documento de origen (más el renombre leído del `CHANGELOG.md` `[5.0]`, que es la concesión declarada de `Migracion-Rules` §3 y no una cuarta fuente) | **Resuelta** |
| `.../NB-05-Arranque-Previsible-Y-Conflictos-Anticipados.md` | Regenerar contenido | documento de origen | documento de origen | **Resuelta** |
| `.../NB-06-Cambios-Revisados-Y-Aplicados-En-Lote.md` | Regenerar contenido | documento de origen | documento de origen | **Resuelta** |
| `.../NB-07-Atribucion-Del-Consumo-Del-Servidor.md` | Regenerar contenido | documento de origen | documento de origen | **Resuelta** |
| `.../NB-08-Control-De-Acceso-Y-Credenciales-De-Maquina.md` | Regenerar contenido | documento de origen | documento de origen | **Resuelta** |

Las diez resueltas. Ninguna quedó sin declarar. La discrepancia entre fuente declarada y fuente efectiva en las dos primeras filas es **H-02**.

### 4.2 Las cinco incorporaciones de contenido, con su fuente

El `diff` contra la línea de base identifica exactamente cinco incorporaciones de texto que no son ni la etiqueta de cabecera, ni un nombre de artefacto renombrado, ni una sustitución léxica, ni una fila de control de cambios. Las cinco se rastrearon hasta una fuente admitida:

1. **Índice §1, oración final** sobre las ocho en versión 2.0. Fuente: los ocho documentos hermanos, verificable en el campo `Versión` de cada cabecera. Es una afirmación sobre el estado del árbol, verificada en disco.
2. **Índice §1, cierre sobre el glosario raíz.** Fuente: `Rules-Necesidades-Negocio` 3.1 §6 y `Vision-Producto.md` §9, que declara literalmente ser el glosario raíz de la cadena. No agrega contenido de negocio: declara una conformidad normativa.
3. **Índice, cabecera y §4.4**: `Vision-Producto.md` §9 sumado a la trazabilidad upstream, y la fila nueva de `PRODUCT-INTAKE §12`. Fuente: las dos secciones se citan efectivamente en el cuerpo. Corrige un campo que quedaba incompleto al agregarse la cita.
4. **`README.md` §2, columna `Versión` y su párrafo.** Fuente: los ocho documentos hermanos. Verificado valor por valor.
5. **`README.md` §6, convenciones 1, 2 y 4.** Fuente: el intake §12 —cuya consecuencia downstream se transcribe casi literal, comparada contra el original—, `Vocabulario-Rules` 2.1 R3 y `Rules-Necesidades-Negocio` 3.1 §3.4. Ninguna afirmación de negocio nueva.

**Ninguna sección quedó rellenada con contenido inferido.** El salto de `Rules-Necesidades-Negocio` 2.0 a 3.1 no agrega ninguna sección obligatoria —los tres criterios que la 3.1 incorpora son de aceptación, no de estructura—, de modo que no hubo sección nueva sin fuente que pudiera tentar el relleno. Es un resultado negativo verificado comparando §4.2 de la 2.0 y de la 3.1, no una ausencia de hallazgos por no haber mirado.

### 4.3 Sobre-sustitución y sub-sustitución de «proyecto»: las dos direcciones

El censo sobre la línea de base da **89 ocurrencias** de la cadena `proyecto` en los diez documentos de origen. Se clasificaron una por una y se comparó con el cuerpo vivo, excluyendo del recuento vivo las filas nuevas de control de cambios, que se cuentan aparte porque mencionan el término para declarar el registro y no para usarlo:

| Referente | En el origen | Qué se hizo | En el cuerpo vivo |
| --- | --- | --- | --- |
| Entidad del dominio: «proyecto SelfHosted», «proyectos SelfHosted» | 17 | No se tocan | **17.** Idénticas, con la misma forma calificada |
| Emprendimiento, a secas: «agente humano del proyecto» (28), «el disparador declarado del proyecto» (NB-02 §3), «el riesgo más alto del proyecto» (NB-08 §3) | 30 | Se preservan a secas | **30.** Ninguna pasó a «proyecto de código» ni a «proyecto SelfHosted» |
| Mención metalingüística del término, en las declaraciones de vocabulario del índice §1 y del `README.md` §6 | 3 | Se preservan | **4:** las 3 más la del índice §4.4, fila nueva de `PRODUCT-INTAKE §12` |
| Unidad de compilación, ya en la forma vigente «proyecto de código» / «proyectos de código» | 7 | No se tocan | **8:** las 7 intactas —6 en el índice §1, §4.2 y §5, 5 en singular y 1 en plural, y 1 en el `README.md` §6 convención 1— más una nueva en el `README.md` §6 convención 2, que declara que ninguna cabecera de esta categoría declara un proyecto de código (R3). La nueva no cae sobre ninguna ocurrencia preexistente |
| Etiqueta de cabecera `| Proyecto |` sobre un valor de plano producto | 10 | Pasa a `| Producto |` | **0.** Las diez cabeceras. Es el defecto que `Vocabulario-Rules` §3 prohíbe |
| Nombre del artefacto renombrado `Alcance-Proyecto`: 10 en el campo de trazabilidad de las diez cabeceras, 10 en los cinco enlaces markdown vivos —cada enlace tiene el nombre dos veces, en el texto y en el destino— y 2 en filas históricas de control de cambios | 22 | Las 20 primeras pasan a `Alcance-Producto`; las 2 filas históricas **no se tocan** | **2.** Los cinco enlaces resuelven en disco; las dos filas conservan el nombre legado, correcto por §VI.2 |
| **Total** | **89** | | **61** en el cuerpo vivo |

**Sobre-sustitución: cero.** No existe en el cuerpo vivo ninguna ocurrencia de «proyecto de código» que caiga sobre un referente que no lo fuera. El conteo lo confirma: 7 en el origen y 8 en el cuerpo vivo, y la octava es una oración nueva del `README.md` §6 convención 2 sobre las cabeceras de la categoría, no una conversión. Las 17 del dominio y las 30 del emprendimiento están las 47 intactas, verificadas ocurrencia por ocurrencia con su línea y su contexto. Las 11 ocurrencias adicionales de «proyecto de código» del corpus están todas dentro de las filas nuevas de control de cambios, donde el término se menciona para declarar que **no** se aplicó («ninguna pasó a "proyecto de código"»). Ninguna cae sobre la entidad del dominio ni sobre el emprendimiento, que es el daño P0 que esta migración tenía que evitar.

**Sub-sustitución: cero.** Se revisaron las 30 ocurrencias desnudas del cuerpo vivo una por una buscando alguna que designara la unidad de compilación y hubiera quedado a secas. Ninguna: las 30 designan el emprendimiento, y 28 de ellas son el rol «agente humano del proyecto». El caso que más se prestaba —el índice §4.2, «la Fase A previa conocía cuatro proyectos de código donde hoy hay uno solo con cuatro capas internas»— usa la forma completa y en el sentido correcto, coherente con el intake §12, que declara que las cuatro capas «hasta la 2.1 eran cuatro proyectos de código».

### 4.4 Barrido negativo del plan §3.5 paso 4

Los cinco barridos obligatorios, corridos sobre el corpus vivo sin `_legacy/`:

| Barrido | Resultado |
| --- | --- |
| `reproducto` y variantes | **Cero.** Y el dato positivo: las **7** ocurrencias de `resoluci` del cuerpo sobreviven las 7 —6 en NB-05, en §3, en la métrica y el target del tercer criterio de §5, en el párrafo de cierre de §5 y en CU-21 de §7; 1 en el índice §2.2, «Resoluciones ofrecidas»—. Conteo verificado contra la línea de base: 7 antes, 7 después |
| Cabeceras de tabla de anti-patrones con la columna «Solución» pisada | **Cero.** No hay tablas de anti-patrones en esta categoría. Constancia del barrido, no omisión |
| «proyecto de código» nuevo sobre documentos del dominio | **Cero** apariciones nuevas en el cuerpo. Ver §4.3 |
| Concordancias de género rotas | **Cero.** Las quince sustituciones de «solución» a «producto» —1 en el índice, 2 en el `README.md`, 2 en NB-01, 1 en NB-02, 0 en NB-03, 2 en NB-04, 1 en NB-05, 1 en NB-06, 3 en NB-07 y 2 en NB-08— ajustaron el determinante en las quince: «administrador **de la** solución» → «administrador **del** producto» (6: `README.md` §5.2, NB-01 §6, NB-04 §6, NB-05 §6, NB-06 §6, NB-08 §6), «en toda la solución» → «en todo el producto» (2: índice §4.2, NB-01 §7), «la identidad de código **de la** solución» → «**del** producto» (`README.md` §6), «gobernados por la solución» → «por el producto» (NB-02 §4), «realizadas desde la solución» → «desde el producto» (NB-04 §5), «el proceso **de la** solución» → «el proceso **del** producto» (NB-07 §5), «**la** solución corre» → «**el** producto corre» (NB-07 §5), «por fuera **de la** solución» → «por fuera **del** producto» (NB-07 §9), «instala **la** solución» → «instala **el** producto» (NB-08 §2). Ninguna «producto técnica» ni equivalente |
| Conteo de filas de control de cambios antes y después | +1 en los diez, sin modificación de ninguna fila preexistente. Ver §3.1 |

Censo de `soluci` contra la línea de base, documento por documento, comparado con lo que declara cada registro: índice 2 revisadas / 1 cambiada; `README.md` 2 / 2; NB-01 2 / 2; NB-02 1 / 1; NB-03 0 / 0; NB-04 2 / 2; NB-05 7 revisadas de las cuales 6 son «resolución» / 1 cambiada; NB-06 1 / 1; NB-07 3 / 3; NB-08 2 / 2. **Los diez registros de «solución» coinciden exactamente con lo medido.** El defecto de H-03 está sólo en el conteo de «proyecto» de tres documentos.

### 4.5 Coherencia cross-doc

| Verificación | Resultado |
| --- | --- |
| Enlaces markdown no ancla | Los 71 resuelven por existencia en disco, incluidos los 26 que apuntan a `../00-Contexto/` y `../../00-Contexto/` |
| Anclas de tabla de contenido | Los 105 enlaces ancla de los diez documentos resuelven contra un título existente. Cero anclas huérfanas |
| **Cierre de H-02 del corte 1** | **Cerrado.** Los cinco enlaces al nombre legado —índice §2, §4.1, §4.4 y §7, y NB-04 §5 nota 2— apuntan a `Alcance-Producto.md` y resuelven. Cero ocurrencias de `Alcance-Proyecto` en enlaces vivos; las dos supervivientes son texto monoespaciado dentro de filas históricas de control de cambios, que §VI.2 prohíbe tocar |
| Nombre del intake | Cero ocurrencias vivas de `SOLUTION-INTAKE`. La única superviviente está en la fila 1.0 del `README.md`, en texto monoespaciado, correcta por §VI.2 |
| IDs no duplicados | 36 CU distintas, sin colisión entre necesidades. Las series `NB-XX`, `F-XX`, `EP-XX`, `OBJ-XX`, `CA-XX`, `PT-XX`, `RE-XX`, `RG-XX` no cambiaron respecto de la línea de base |
| Consistencia de los agregados | Los criterios contados en las ocho §5 suman 44, igual que el índice §6 y que las 44 filas del inventario del índice §2.2. Las CU contadas en las ocho §7 suman 36, igual que el índice §4.2. Las ocho prioridades de las §9 coinciden con la tabla del índice §2 y con la traza del §2.1 |
| Grafo de dependencias | Las ocho §8 coinciden con la tabla del índice §3.1 y con el mapa del `README.md` §3. Acíclico, verificado contra el orden topológico. Máximo dos dependencias por necesidad |
| Columna de versión del `README.md` | Los ocho valores 2.0 coinciden con el campo `Versión` de cada cabecera |
| Coherencia con el upstream migrado | Los diez nombran el intake y `Alcance-Producto.md` por su nombre vigente. Los tres referentes de «proyecto» que la categoría declara coinciden término por término con `Vision-Producto.md` §9 y con el intake §12 |
| Referencias entrantes desde fuera del corte | Las categorías 02 y 03 todavía no se migraron y no referencian artefactos de 01 por nombre de archivo. No hay enlaces entrantes rotos producidos por este corte |

---

## 5 · Hallazgos

### H-01 · P1 · «Conjunto de servicios», alias del proyecto SelfHosted usado en nueve de los diez artefactos y denominador de un criterio medible, no está declarado en el glosario raíz

**Archivo a corregir:** `SDD/Docs/00-Contexto/Vision-Producto.md`
**Sección:** §9 Glosario del dominio
**Criterio incumplido:** `Rules-Necesidades-Negocio` 3.1 §6, criterio de completitud del glosario; `Vocabulario-Rules` 2.1 §10, criterios 8 y 9; `Master-Prompt` §10, gobierno del glosario criterios 2 y 3

**Evidencia.** «Conjunto», en el sentido de agrupamiento de servicios, aparece en **nueve de los diez** artefactos de la categoría. Ocurrencias en el cuerpo, excluidas las filas de control de cambios y descontadas las formas calificadas «conjunto normativo» y «conjunto de cambios pendientes»: `Necesidades-Negocio.md` 4, `README.md` 1, NB-01 13, NB-02 6, NB-03 4, NB-04 8, NB-05 11, NB-06 1 y NB-07 9 — 57 en total, de las que dos son prosa corriente y no el término (índice §2.2, «un conjunto distinto y más acotado»; NB-04 §2, «el conjunto "base de datos más servicio"»). El único artefacto que no lo usa es NB-08. El término no está en `Vision-Producto.md` §9 ni en el intake §12.

No es un término marginal. Encabeza el título de NB-01 —«Visibilidad unificada de la arquitectura de **un conjunto de servicios**»—, que el índice §2 y el `README.md` §2 replican; y es el denominador del primer criterio de éxito de NB-01: «Conjuntos de servicios del parque de referencia representados como proyecto SelfHosted, sobre el total relevado», con target «5 de 5 conjuntos» y con el denominador de cinco declarado verificado contra el anexo E-19 en la nota 1 de esa misma §5.

El problema no es la coexistencia con «conjunto normativo» ni con «conjunto de cambios pendientes», que van calificados y viven en contextos disjuntos —eso se evaluó y se descartó, §3.3 ítem 9—. El problema es que el término dominial **se desliza entre dos referentes sin entrada que los declare**:

- En NB-01 §5 el conjunto y el proyecto SelfHosted son **cosas distintas**: el conjunto preexiste en el parque y el proyecto SelfHosted es su representación en el producto. Es lo que hace contable el denominador 5.
- En NB-02 §3 el mismo término desnudo designa ya **la representación**: «un mismo contenedor no puede terminar asociado a dos conjuntos», donde lo que no admite doble asociación es el proyecto SelfHosted. Lo mismo en NB-02 §8, NB-05 §2 y §3, y NB-07 §8.

Los dos usos viven en prosa de parque y de arquitectura, que no es un contexto disjunto, y NB-01 §5 es exactamente una de las secciones que `Rules-Necesidades-Negocio` §3.3 declara input directo de 08-Calidad-Y-Pruebas. Un lector que reciba esa sección sola tiene que decidir si «conjunto» es sinónimo de «proyecto SelfHosted» o una entidad previa distinta, y de esa decisión depende cómo se cuenta el 5 de 5. Es el corolario de `Vocabulario-Rules` §9.2: el término desnudo de una familia es el caso que hay que mirar.

**Origen de la deuda: aguas arriba, no en 01.** El término no lo acuña esta categoría. `Vision-Producto.md` lo usa 8 veces —3 en la forma «conjunto de servicios»— y `Alcance-Producto.md` 5 —2 en la forma larga—, y la definición del concepto ya está en el glosario bajo otro nombre: la entrada «Proyecto SelfHosted» dice «Unidad de agrupación del producto: la arquitectura completa de servicios contenedorizados, con su red y su lienzo». Lo que falta es el puntero del alias a esa entrada, más la aclaración de qué se cuenta cuando se cuentan conjuntos. **Los diez documentos de 01 están correctos tal como están escritos y no hay que reabrirlos.**

**Por qué es P1 y no P0.** No rompe trazabilidad, no omite ningún documento obligatorio, no introduce vocabulario prohibido y no falta ninguna cabecera. Es un incumplimiento del §6 del archivo de reglas de la categoría, que `Master-Prompt` §10 clasifica como P1, y es el mismo nivel con el que el corte 1 tipificó el caso análogo de «brecha».

**Por qué es P1 y no P2.** El corte 1 ya estableció el precedente con «brecha» y esa fila se agregó. El criterio de gobierno del glosario es uno de los tres que el salto de la regla a la 3.1 incorpora, es decir uno de los que esta migración existía para cerrar; y el término sostiene el denominador de un criterio medible que 08-Calidad-Y-Pruebas va a convertir en verificación ejecutable.

**Segundo candidato evaluado y no elevado: «parque».** Aparece en los diez artefactos de 01 (43 ocurrencias) y en tres de 00 (`Vision-Producto.md` 14, `Alcance-Producto.md` 3, `Roadmap-Producto.md` 2, `Compatibilidad-Plataformas.md` 1). Tampoco está en el glosario. No se eleva por tres razones verificadas: tiene **un solo referente** en todo el corpus —lo que ya corre en el servidor de referencia—, ninguna ocurrencia admite otra lectura; las dos veces en que es load-bearing como denominador, el propio texto del criterio dice qué se cuenta —NB-01 cuenta conjuntos, NB-02 cuenta «contenedores en ejecución del servidor de referencia»—, de modo que la sección se resuelve sola; y su densidad en 00 es mayor que en 01, lo que confirma que tampoco lo acuña esta categoría. Conviene evaluarlo en la misma pasada sobre el glosario raíz, pero por sí solo no alcanza el umbral de hallazgo.

**Recomendación.** Agregar a `Vision-Producto.md` §9 el alias en la columna «Sinónimos o notas» de la entrada «Proyecto SelfHosted», tomando la definición de lo que los documentos hermanos ya dicen y sin redactar de cero, para no incurrir en la regla de no invención. Forma sugerida: «Alias en prosa: "conjunto de servicios", o "el conjunto" donde el contexto ya fijó el sentido. Cuando se cuentan conjuntos del parque de referencia se cuentan los agrupamientos preexistentes que el producto va a representar, uno por proyecto SelfHosted». Evaluar «parque» en la misma pasada. La corrección es de 00 y no obliga a reabrir ningún documento de 01.

---

### H-02 · P2 · La columna «fuente de contenido» del plan declara menos de lo que dos documentos usaron, y el patrón se repite del corte anterior

**Archivo:** `SDD/Docs/Audit/Plan-Migracion-4.1-a-6.0.md`
**Sección:** §4, filas de `01-Necesidades-Negocio/Necesidades-Negocio.md` y `01-Necesidades-Negocio/README.md`
**Criterio incumplido:** `Migracion-Rules` 1.0 §6, criterio 1

**Evidencia.** `Migracion-Rules` §2.1 declara que la columna de fuente de contenido «es la forma en que §4.1 se vuelve verificable fila por fila», con exactamente tres valores admitidos. El plan §4 declara «documento de origen» para las **diez** filas de esta categoría. Dos documentos usaron además, correctamente, la segunda fuente admitida, y los dos lo declaran con precisión en su propia fila de control de cambios:

- `Necesidades-Negocio.md`: «fuente de contenido: el documento de origen [...] **más los documentos hermanos de 00-Contexto y el PRODUCT-INTAKE** para los nombres de artefacto y la convención de vocabulario».
- `README.md`: «el documento de origen [...] **más los ocho archivos hermanos de `Necesidades-De-Negocio/`** para la columna de versión de §2 y los documentos de 00-Contexto y el PRODUCT-INTAKE».

Las fuentes son legítimas y están declaradas **en los documentos**; lo que no coincide es la fila del plan, que es el artefacto donde el criterio 1 pide que la declaración viva.

**Es una repetición.** Es exactamente el H-03 del informe [`Audit/M4-00-Contexto-r1.md`](M4-00-Contexto-r1.md), con la misma forma —«documento de origen» por defecto para todas las filas de una categoría— y sobre la categoría siguiente. La recomendación de ese informe incluía «verificar la misma columna en las filas de los cortes siguientes antes de despachar», y no se ejecutó: las diez filas de 01 se despacharon con la columna sin revisar. El plan sigue en versión 1.1, con las filas de 00 también sin corregir.

**Por qué es P2 y no P1.** No hay invención: las cinco incorporaciones de contenido se rastrearon hasta una fuente admitida (§4.2 de este informe) y las dos filas de control de cambios las declaran con precisión. El defecto es de registro en el contrato entre orquestadores, no de contenido.

**Recomendación.** Corregir las dos filas de 01 y las dos de 00 a «documento de origen + documento hermano». Y atacar la causa en lugar del síntoma: la columna se está llenando con el valor por defecto de la categoría en vez de por documento. Antes de despachar el corte 3 —que son cien documentos de la categoría 02—, revisar la columna fila por fila, o declarar explícitamente que la fuente efectiva se consolida desde las filas de control de cambios en el informe de M6.

---

### H-03 · P2 · Tres registros de sustitución léxica declaran un conteo de ocurrencias de «proyecto» que no verifica contra el documento archivado

**Archivos:** `Necesidades-De-Negocio/NB-01-Visibilidad-Unificada-De-La-Arquitectura.md`, `NB-03-Reproducibilidad-De-La-Arquitectura.md` y `NB-04-Alta-De-Servicio-Sin-Copiar-Y-Adaptar.md`
**Sección:** §10 Control de cambios, fila 2.0, registro de sustitución léxica
**Criterio incumplido:** `Vocabulario-Rules` 2.1 §9.5 y §10 criterio 13 —«su registro declara cuántas ocurrencias se revisaron y cuántas se cambiaron»—; D9

**Evidencia.** `Vocabulario-Rules` §9.5 convierte el registro en el instrumento que hace auditable la sustitución por ocurrencia. Se recontaron los diez registros contra su archivado. Siete coinciden exactamente. Tres no:

| Documento | Declara | Medido en `_legacy/2026-07-30/` | Desglose declarado | Desglose medido |
| --- | --- | --- | --- | --- |
| NB-03 | «Las **nueve** ocurrencias de "proyecto"» | **8** | 4 dominio + 2 emprendimiento + etiqueta + artefacto hermano = **8** | 4 (líneas 67 ×2, 95, 100) + 2 (73, 79) + 1 (5) + 1 (11) = 8 |
| NB-04 | «Las **siete** ocurrencias de "proyecto"» | **8** | 2 dominio + **1** emprendimiento + etiqueta + artefacto hermano | 2 (69, 101) + **2** emprendimiento (78 y **84, la fila de stakeholder «Agente humano del proyecto» de §6, omitida**) + 1 (5) + 3 artefacto hermano (11, y las dos del enlace markdown de 78) = 8 |
| NB-01 | «diez [...] cinco dominio y **cuatro** emprendimiento [...] la restante era la etiqueta de cabecera» | 10, pero con otro desglose | 5 + 4 + 1 = 10 | 5 dominio (71, 74 ×2, 102, 103) + **3** emprendimiento (82, 84, 90) + 1 etiqueta (5) + **1 nombre de artefacto** (11, `Alcance-Proyecto.md`), no mencionado = 10 |

Los tres desgloses son internamente consistentes con su propio total en dos casos y contradictorios en el tercero —el desglose de NB-03 suma ocho y su total dice nueve—, y en NB-01 y NB-04 la clase «emprendimiento» absorbe una ocurrencia que pertenece a otra clase.

**Lo que el hallazgo no es.** La conclusión sustantiva de los tres registros —«ninguna pasó a "proyecto de código"»— es **verdadera**, verificada de forma independiente en §4.3 de este informe sobre las 62 ocurrencias del corpus. No hay ninguna sustitución mal hecha, y ninguna ocurrencia quedó sin clasificar en la práctica: la que NB-04 omite del registro es una fila de stakeholder que quedó intacta, como correspondía. El defecto es del registro, no de la sustitución.

**Por qué es P2 y no P1.** No hay incumplimiento de una sección obligatoria ni anti-patrón: el registro existe en los diez documentos, es por ocurrencia y clasifica por referente, que es lo que §9.5 pide. Falla la aritmética de tres de ellos. `Master-Prompt` §10 sitúa en P2 lo que se documenta y se sigue.

**Por qué no es P0 por D9.** El P0 de D9 es «una evidencia que no resuelve», es decir una cita que apunta a algo inexistente. Acá la evidencia resuelve —el archivado existe y es la fuente correcta— y lo que falla es el conteo derivado de ella. Es una afirmación imprecisa sobre el estado del sistema, no una cita rota.

**Recomendación.** Corregir los tres conteos y los dos desgloses en la fila 2.0 de esos tres documentos, sin tocar ninguna otra fila. Los valores correctos son: NB-03 «las ocho ocurrencias», con el desglose que ya trae; NB-04 «las ocho ocurrencias», con «dos son el emprendimiento —"el agente humano del proyecto" en la nota 2 de §5 y en la fila de stakeholder de §6—» y «las restantes eran la etiqueta de cabecera y las tres del nombre del artefacto hermano»; NB-01 «tres son el emprendimiento» y «las restantes eran la etiqueta de cabecera y el nombre del artefacto hermano». Para los cortes siguientes, el conteo declarado debería producirse con el mismo barrido que lo verifica, en lugar de escribirse a mano al redactar la fila.

---

### H-04 · P3 · El §8 del plan sigue declarando las 143 filas sin resolver después de cerrar dos cortes

**Archivo:** `SDD/Docs/Audit/Plan-Migracion-4.1-a-6.0.md`
**Sección:** §8 Estado de las filas

**Evidencia.** El §8 dice: «Se completa durante M4 y se cierra en el informe de M6. Al emitirse este plan, las 143 filas [...] están **sin resolver**». A la fecha de esta auditoría hay dieciocho filas resueltas: el intake (M2), el manifiesto (M3), las seis de `00-Contexto` (corte 1) y las diez de `01-Necesidades-Negocio` (corte 2). El plan sigue en versión 1.1, con la fecha de su aprobación, y no registra ninguna.

**Es una repetición.** Es el H-06 del informe [`Audit/M4-00-Contexto-r1.md`](M4-00-Contexto-r1.md), que quedó abierto con su recomendación sin ejecutar.

**Por qué no es el P0 número 6.** El P0 es «una fila del plan sin resolver **y sin declarar**». Las diez filas de este corte están resueltas —los diez documentos existen en 2.0 con su archivado— y quedan declaradas, con su fuente efectiva, en §4.1 de este informe. La conjunción del P0 no se cumple. Es un defecto de registro del avance, no un estado no declarado.

**Recomendación.** La misma del corte 1, que gana urgencia con cada corte: o se anotan en §8 las dieciocho filas cerradas con su corte y su fecha, o se declara explícitamente que el estado por fila se lleva en los informes de audit de cada corte y se consolida en M6. La segunda es más barata y evita mantener dos registros del mismo dato. En cualquier caso, M5 no puede correr su verificación de «ninguna fila del plan sin resolver» contra un §8 que dice que están todas sin resolver.

---

## 6 · Los seis P0 de una migración, uno por uno

| # | Hallazgo P0 de `Master-Prompt-Migracion` §10 | Verificación | Resultado |
| --- | --- | --- | --- |
| 1 | Contenido que no proviene del documento de origen, de un hermano o de una respuesta humana | `diff` completo contra los diez archivados. Cinco incorporaciones de texto, las cinco rastreadas a fuente admitida en §4.2 | **No se cumple** |
| 2 | Sección exigida por la normativa vigente rellenada con contenido inferido | El salto 2.0 → 3.1 no agrega ninguna sección obligatoria: §4.2 de las dos versiones de la regla coincide. Ninguna sección nueva que rellenar | **No se cumple** |
| 3 | Procedencia reescrita con migración parcial | `PRODUCT-MANIFEST` §1.1 declara el conjunto **4.1** y `Rules-Necesidades-Negocio` **2.0**, no 3.1. Ningún documento de 01 declara procedencia propia, y el índice declara que M5 es quien la toca | **No se cumple** |
| 4 | Corrección manual pisada sin declarar la interpretación | Los diez archivados son byte a byte idénticos a `HEAD` (`diff` de cero líneas en los diez). No había corrección manual que pisar | **No se cumple** |
| 5 | Estado previo no archivado en el `_legacy/` de su carpeta | Diez archivos en `01-Necesidades-Negocio/_legacy/2026-07-30/`, con la subcarpeta replicada y el `README-v1.0.md` versionado según §3.4 | **No se cumple** |
| 6 | Fila del plan sin resolver y sin declarar | Las diez resueltas y declaradas en §4.1 | **No se cumple** |

---

## 7 · Veredicto

**APROBADO CON OBSERVACIONES.**

Cero hallazgos P0. Un P1, dos P2 y un P3. La migración del corte 2 preservó el contenido en lugar de regenerarlo: los diez documentos dicen exactamente lo que decían, con la nomenclatura vigente y con el registro de qué se cambió y por qué. El punto crítico —la doble dirección del renombre de «proyecto» sobre un destino donde la palabra tiene tres referentes— se resolvió sin una sola sobre-sustitución y sin una sola sub-sustitución, y las 7 ocurrencias de «resolución» del cuerpo sobrevivieron las 7.

M4 puede avanzar al corte 3.

**Condiciones para promover:**

| # | Condición | ¿Bloquea el corte 3? |
| --- | --- | --- |
| 1 | Cerrar **H-01**: una fila en `Vision-Producto.md` §9 para «conjunto de servicios», evaluando «parque» en la misma pasada. **No obliga a reabrir ningún documento de 01** | No, pero antes de M5. Si 02 se migra antes de cerrarlo, el término entra a la categoría 02 sin referente canónico y esa categoría lo va a redefinir, que es lo que el criterio existe para impedir |
| 2 | Cerrar **H-02** y su reincidencia: corregir la columna de fuente de contenido de las dos filas de 01 y las dos de 00, y revisar la columna fila por fila antes de despachar el corte 3 | **Sí para la revisión previa**, no para la corrección de las cuatro filas |
| 3 | Cerrar **H-03**: corregir el conteo y el desglose de la fila 2.0 de NB-01, NB-03 y NB-04, sin tocar ninguna otra fila | No, pero antes de M6 |
| 4 | Cerrar **H-04**: resolver cómo se lleva el estado de las filas del plan | No, pero **sí antes de M5**, que no puede verificar «ninguna fila sin resolver» contra un §8 que dice que están todas sin resolver |

**Nota para la ronda siguiente.** Las once polisemias de §3.3 se evaluaron y se descartaron por contextos disjuntos o por forma calificada. Reportarlas como defecto del documento auditado es un defecto del informe, por el criterio negativo de `Vocabulario-Rules` §10 y de `Master-Prompt` §10. En particular, «conjunto normativo», «conjunto de cambios pendientes» y el «conjunto» de prosa corriente **no** son parte de H-01: el hallazgo es la ausencia de entrada para el sentido dominial, y la corrección no debe calificar esas tres.

---

## Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 1.0 | 2026-07-30 | Auditoría independiente de la ronda 1 del corte 2 de la fase M4 de la migración normativa 4.1 → 6.0, sobre los diez entregables de `01-Necesidades-Negocio` en versión 2.0, contra `Rules-Necesidades-Negocio` 3.1 §6, `Vocabulario-Rules` 2.1 §9 y §10, los catorce criterios de `Migracion-Rules` 1.0 §6, la matriz de `Master-Prompt` §10 y los seis hallazgos P0 de `Master-Prompt-Migracion` §10. Línea de base: los diez archivados de `_legacy/2026-07-30/`. Cero P0. Cuatro hallazgos: uno P1 por el alias «conjunto de servicios» ausente del glosario raíz, dos P2 por la columna de fuente de contenido del plan —repetición de H-03 del corte 1— y por el conteo de tres registros de sustitución léxica, y uno P3 por el §8 del plan sin actualizar —repetición de H-06—. Se verifica cerrado el hallazgo H-02 del corte 1: los cinco enlaces al artefacto renombrado resuelven. Se verifica la doble dirección del renombre de «proyecto» sobre las 89 ocurrencias de la línea de base, con cero sobre-sustituciones y cero sub-sustituciones, y la supervivencia de las 7 ocurrencias de «resolución» del cuerpo. Se enumeran once polisemias evaluadas y descartadas, para que la ronda siguiente no las vuelva a levantar. Veredicto: APROBADO CON OBSERVACIONES, con una condición bloqueante para el despacho del corte 3 y dos para M5. |
