# Audit A — 01-Necesidades-Negocio — Verificación de cierre

| Campo | Valor |
|---|---|
| Solución | SelfHosted.Service.Core (`Nombre-Solucion`: SelfHosted-Service-Core; `NombreSolucionCodigo`: SelfHosted) |
| Fase auditada | Fase A, categoría 01-Necesidades-Negocio (nivel solución) |
| Naturaleza de este informe | Verificación de cierre posterior a corrección. No es una re-auditoría completa: da por firmes las verificaciones de `A-01-Necesidades-Negocio-v1.0.md` que la corrección no toca, y se concentra en el cierre de los trece hallazgos, en la comprobación independiente de los conteos que declara el generador, en los defectos que la corrección pudiera haber introducido y en la coherencia con el intake consolidado |
| Informe que verifica | `A-01-Necesidades-Negocio-v1.0.md`, veredicto APROBADO CON OBSERVACIONES, 0 P0, 4 P1, 4 P2, 5 P3 |
| Ámbito | `SDD/Docs/01-Necesidades-Negocio/`: índice maestro, README de sección y las ocho `NB-XX-*-v1.0.md` de `Necesidades-De-Negocio/` |
| Reglas aplicadas | `Rules-Necesidades-Negocio.md` v1.4; `Master-Prompt.md` v3.6 §3.5, §5, §10 y §13 |
| Upstream contrastado | `SOLUTION-INTAKE-SelfHosted-Service-Core-v1.1.md` (vigente), `SOLUTION-INTAKE-SelfHosted-Service-Core-v1.0.md` (archivado en `SDD/Intake/_legacy/2026-07-27/`), `SOLUTION-MANIFEST-SelfHosted-Service-Core-v1.0.md`, `Vision-Producto-v1.0.md`, `Alcance-Proyecto-v1.0.md`, `Roadmap-Producto-v1.0.md` |
| Auditor | Auditor independiente, perfil Arquitecto de Soluciones más QA Senior, sin participación en la generación ni en la corrección |
| Documento | A-01-Necesidades-Negocio-v2.0.md |
| Versión | 2.0 |
| Fecha | 2026-07-27 |

## Tabla de contenido

- [1. Resumen ejecutivo](#1-resumen-ejecutivo)
- [2. Estado de cierre de los trece hallazgos previos](#2-estado-de-cierre-de-los-trece-hallazgos-previos)
  - [2.1 Tabla de estado](#21-tabla-de-estado)
  - [2.2 Evidencia por hallazgo](#22-evidencia-por-hallazgo)
- [3. Verificación independiente de los conteos declarados](#3-verificación-independiente-de-los-conteos-declarados)
- [4. Defectos nuevos introducidos por la corrección](#4-defectos-nuevos-introducidos-por-la-corrección)
- [5. Coherencia con el intake consolidado v1.1](#5-coherencia-con-el-intake-consolidado-v11)
- [6. Comprobación de no-regresión sobre lo ya aprobado](#6-comprobación-de-no-regresión-sobre-lo-ya-aprobado)
- [7. Veredicto final](#7-veredicto-final)
- [Control de cambios](#control-de-cambios)

---

## 1. Resumen ejecutivo

De los trece hallazgos del informe v1.0, doce quedan cerrados con evidencia verificada de forma independiente y uno, el P3-04, queda descartado por decisión del generador con un argumento que este audit acepta. Los cuatro P1 están efectivamente cerrados: las anclas resuelven 100 de 100, el conteo MoSCoW del índice coincide con el recuento sobre las ocho §9, la sexta derivación está marcada y propagada a las cuatro ubicaciones que la registran, y ningún criterio del catálogo se mide ya antes de la fase que entrega la capacidad que evalúa.

Ninguno de los conteos que declara el generador se aceptó sin recontar. Los cinco recuentos independientes coinciden: 100 anclas resueltas sobre 100, 40 criterios de éxito con 6 marcados `[D]`, 6 Must Have y 2 Should Have, 3 necesidades de prioridad mixta, y 0 residuos de vocabulario de alcance en las 40 celdas de plazo.

La corrección no introdujo defectos de nivel P0, P1 ni P2. Se detectan tres defectos nuevos de nivel P3, los tres de registro y no de contenido: una contradicción interna en el control de cambios del índice, una convención de versionado del changelog que conviene ratificar antes de que se replique en las once categorías restantes, y una enumeración incompleta de lo que sigue abierto en el intake.

Veredicto: APROBADO.

## 2. Estado de cierre de los trece hallazgos previos

### 2.1 Tabla de estado

| Hallazgo | Nivel original | Estado | Verificación |
|---|---|---|---|
| P1-01 Anclas de tabla de contenido que no resuelven | P1 | Cerrado | Recuento mecánico: 100 anclas, 0 rotas, en los diez documentos |
| P1-02 Conteo MoSCoW erróneo en el índice §1 | P1 | Cerrado | Recuento sobre las ocho §9: 6 Must Have y 2 Should Have, coincidente con el texto corregido |
| P1-03 Derivación no marcada `[D]` en NB-01 | P1 | Cerrado | 6 filas marcadas sobre 40 criterios; propagado a NB-01 §5, índice §5, README §6 y controles de cambio |
| P1-04 Plazo de NB-04 anterior a la fase que entrega la capacidad | P1 | Cerrado | Fila reanclada a Fase 3; barrido de las 40 filas sin ningún otro caso |
| P2-01 Columna `Proyecto` fuera de las columnas exactas de la Tabla C | P2 | Cerrado con condición | Extensión declarada en los ocho §7 y justificada una vez en índice §4.2; la variación respecto de §4.4 subsiste y requiere ratificación del orquestador |
| P2-02 Denominador de direcciones de NB-05 incoherente | P2 | Cerrado | Denominador unificado en 5, coincidente con la §1 del propio documento y con el índice §5 |
| P2-03 Cabecera del README sin campo de versión | P2 | Cerrado | Cabecera convertida a bloque de tabla con los ocho campos, incluido `Versión` |
| P2-04 Vocabulario de hitos mezclado | P2 | Cerrado con residuo menor | 40 de 40 celdas de plazo en fases, etapas o puertas técnicas; residuo desambiguado en README §6 fila 4 |
| P3-01 La §2 de NB-05 se aproxima a un flujo paso a paso | P3 | Cerrado | Cierre sintetizado como resultado, con remisión a CU-19 a CU-21 |
| P3-02 NB-01 declarada prerequisito directo de NB-06 | P3 | Cerrado | Distinción directa y transitiva en índice §3.1, README §3 y NB-01 §8 |
| P3-03 Estado `Vigente` del README sobre catálogo `Propuesto` | P3 | Cerrado | README en `Propuesto`, alineado con el índice y las ocho necesidades |
| P3-04 Archivo `.gitkeep` remanente | P3 | Descartado, descarte aceptado | El archivo sigue presente; el argumento del generador coincide con la recomendación original de tratarlo como operación de cierre transversal de fase |
| P3-05 Justificación de recorte sin cita del roadmap | P3 | Cerrado | Índice §6 cita `Roadmap-Producto-v1.0.md` §2.2 con la ubicación de F-09 y F-12 |

### 2.2 Evidencia por hallazgo

P1-01. Se reconstruyó el identificador de cada encabezado con el algoritmo de GitHub —minúsculas, eliminación de puntuación, espacios a guion medio, preservación de letras Unicode— y se contrastó contra cada enlace de las tablas de contenido. Resultado: 10 anclas en cada una de las ocho necesidades, 13 en el índice y 7 en el README, total 100, ninguna rota. En el informe anterior eran 32 rotas sobre 100. Las tildes están efectivamente presentes en los identificadores: `NB-01-Visibilidad-Unificada-De-La-Arquitectura-v1.0.md` línea 16 apunta a `#1-descripción-de-la-necesidad`, con tilde, contra el encabezado `## 1. Descripción de la necesidad` de la línea 29. Cerrado.

P1-02. `Necesidades-Negocio-v1.0.md` §1, línea 40, declara ahora "Seis son Must Have —NB-01, NB-02, NB-04, NB-05, NB-06 y NB-08— ... dos son Should Have, NB-03 y NB-07. Con independencia de ese reparto, tres necesidades agrupan capacidades de prioridad mixta y toman la más alta del grupo: NB-03, NB-04 y NB-08". Se recontó leyendo la §9 de cada necesidad, sin usar el índice: seis declaran `Must Have` y dos `Should Have`. Se verificó también la nominación: las seis Must Have son exactamente las seis nombradas. Y se verificó la afirmación sobre prioridad mixta contra las agrupaciones de capacidades de cada §9: NB-03 agrupa F-13 Should con F-17 Could, NB-04 agrupa F-05 y F-10 Must con F-14 Should, NB-08 agrupa F-01 Must con F-15 Should y F-16 Could; ninguna otra necesidad agrupa prioridades distintas. Las tres afirmaciones del texto corregido son verdaderas. Cerrado.

P1-03. La primera fila de `NB-01-Visibilidad-Unificada-De-La-Arquitectura-v1.0.md` §5, línea 63, lee ahora "Cobertura del parque en el registro `[D]`". La nota al pie de esa §5 pasó de "Dos filas están marcadas" a "Tres filas están marcadas" y explica la derivación con la misma lógica que ya usaba NB-05: denominador verificado, target y plazo derivados, con la aclaración de que "la única métrica declarada sobre el parque es la de adopción, con target del 75 % sobre contenedores y no sobre conjuntos". La propagación se verificó en las cuatro ubicaciones que registran el número: índice §5 pasa a "Treinta y cuatro toman su número ... Los seis restantes son derivaciones" con seis filas en su tabla; README §6 fila 1 pasa a "Los seis criterios de éxito derivados"; y los controles de cambio del índice y de NB-01 lo narran. Recuento independiente sobre las ocho §5: 40 filas de criterio, 6 con marca `[D]`, repartidas 3 en NB-01, 2 en NB-04 y 1 en NB-05. Cerrado.

P1-04. `NB-04-Alta-De-Servicios-Sin-Copiar-Y-Adaptar-v1.0.md` §5, línea 67, lee ahora "6 meses desde el cierre de la Fase 3", coincidente con la cuarta fila que mide la misma capacidad. La sección incorpora además una nota de plazos, línea 71: "Las dos filas que miden el catálogo se anclan al cierre de la Fase 3, que es la que entrega esa capacidad según `Roadmap-Producto-v1.0.md` §2.2 ... Ningún criterio se mide antes de que exista la capacidad que evalúa". La regla se replica en el índice §5, línea 189. Se verificó que el defecto no exista en ninguna otra fila: se contrastaron las 40 celdas de plazo contra la fase que `Roadmap-Producto-v1.0.md` §2.2 asigna a la capacidad que cada necesidad agrupa. NB-01, NB-02 y NB-05 anclan a Fase 1 capacidades de Fase 1; NB-03 ancla a Fase 3 capacidades de Fase 3; NB-07 ancla a Fase 2 la capacidad F-12 de Fase 2; NB-08 ancla a Fase 4 las capacidades F-15 y F-16 de Fase 4 y a la etapa de administrador y sesión la capacidad F-01 de Fase 1. Ningún desfase. Cerrado.

P2-01. La columna se conservó y se declaró. Los ocho §7 llevan el mismo párrafo, verificado uno por uno: "La columna `Proyecto` se agrega a las tres columnas que fija la Tabla C de `Rules-Necesidades-Negocio.md` §4.4, porque los casos de uso se generan por proyecto y esta solución se compone de cuatro. No reemplaza ninguna columna de la tabla estándar. La justificación única de la extensión está en el índice maestro §4.2". El índice §4.2, línea 149, contiene la justificación única y ofrece la vía alternativa. La recomendación original admitía las dos salidas y exigía que la decisión no quedara implícita: eso está cumplido. Se cierra con una condición y no de forma incondicional, porque la variación respecto de las columnas exactas de §4.4 subsiste y su ratificación no es potestad del generador ni de este audit: o el orquestador la acepta como extensión legítima para soluciones multi-proyecto, o eleva el cambio a `Rules-Necesidades-Negocio.md` §4.4.

P2-02. `NB-05-Arranque-Sin-Conflictos-De-Direccion-v1.0.md` §5, línea 67, lee ahora "sobre las 5 que el parque relevado tiene asignadas a servicios con dirección propia de la red local", y la nota de la línea 69 declara explícitamente que "es el mismo número que usa la §1 de este documento". El índice §5, línea 187, se actualizó en el mismo sentido: "0 sobre las 5 direcciones de la red local del parque relevado". Contrastado contra el anexo E-19 del intake: cinco contenedores en modo macvlan con dirección de la red local. Coherente en las tres ubicaciones y con el dolor del intake §1, que se enuncia sobre las direcciones fijas de la red local. Cerrado.

P2-03. La cabecera del README es ahora un bloque de tabla con los mismos ocho campos que usan el índice y las ocho necesidades, incluido `Versión` con valor 1.0. El barrido de negritas devuelve cero en los diez documentos, contra siete en el README de la versión anterior. Cerrado.

P2-04. Se extrajeron las 40 celdas de la columna Plazo y se clasificaron: 12 "Continuo", 1 "Continuo, desde el cierre de la Fase 3", 7 anclajes a fase con meses o al cierre, 11 anclajes a etapa del roadmap, 2 anclajes a la puerta técnica PT-01, y el resto a cierre de fase. Ninguna celda usa "Alcance N". La correspondencia entre vocabularios se declara una sola vez, en el índice §1 línea 42, con el mapeo uno a uno de los cuatro incrementos y la aclaración de que la Fase 0 no tiene alcance equivalente. Cerrado con un residuo menor descripto en §4.

P3-01. La §2 de NB-05, línea 41, cierra ahora con "Elige reasignar, y el conjunto queda arrancado en el orden correcto, con los servicios que consumían la dirección anterior señalados para que él sepa cuáles quedaron desactualizados. El detalle de la secuencia corresponde a los casos de uso CU-19 a CU-21". El resultado de negocio se conserva, la secuencia de sistema se remite a la categoría 02, y la propagación de la reasignación sigue registrada como impacto en la §3. Cerrado.

P3-02. Índice §3.1 línea 63: "NB-02, NB-03, NB-04, NB-05 y NB-07 de forma directa, y NB-06 por transitividad a través de NB-04 y NB-05". README §3 línea 52 y NB-01 §8 línea 96 replican la distinción. Cerrado.

P3-03. README cabecera línea 8: `Estado | Propuesto`. Cerrado.

P3-04. El archivo `01-Necesidades-Negocio/.gitkeep` sigue presente. El descarte se acepta: el informe v1.0 lo recomendaba "al cierre de la fase, junto con los de las demás categorías ya pobladas", de modo que el generador de la categoría no era su destinatario natural. Queda registrado como tarea pendiente de la fase, no de esta categoría, y este audit no lo cuenta como hallazgo abierto de 01.

P3-05. Índice §6, línea 196, cierra la justificación con "`Roadmap-Producto-v1.0.md` §2.2 ubica F-09 en la Fase 1 y F-12 en la Fase 2". Contrastado contra el roadmap: EP-09 con F-09 en Fase 1 y EP-12 con F-12 en Fase 2. Cerrado.

## 3. Verificación independiente de los conteos declarados

Ningún conteo del generador se dio por bueno. Los cinco se recalcularon desde los archivos.

| Conteo declarado por el generador | Recuento independiente | Método | Coincide |
|---|---|---|---|
| Anclas: 100 de 100 resuelven | 100 anclas, 0 rotas | Reconstrucción del identificador GFM de cada encabezado y contraste contra cada enlace, en los diez documentos | Sí |
| Criterios derivados: 6 sobre 40 | 40 filas de criterio, 6 con marca `[D]` | Aislamiento de la §5 de cada necesidad y conteo de filas de datos, descartando encabezado, separador y prosa | Sí |
| Reparto MoSCoW: 6 Must Have y 2 Should Have | 6 y 2 | Lectura de la §9 de cada una de las ocho necesidades | Sí |
| Prioridad mixta: NB-03, NB-04 y NB-08 | Las mismas tres | Contraste de las capacidades agrupadas en cada §9 contra la prioridad de cada una en el intake §4 | Sí |
| Residuos de "Alcance N" como hito: ninguno | Ninguno en las 40 celdas de plazo | Extracción de la columna Plazo de las ocho §5 y barrido literal de "Alcance N" en los diez documentos | Sí, con la salvedad de §4 |
| Referencias al intake actualizadas: tres | Tres, y sólo tres necesitaban cambio | Barrido de todas las menciones a `SOLUTION-INTAKE` en los diez documentos, separando las calificadas por versión de las que citan por sección | Sí |
| Extensión de Tabla C declarada en las ocho | Ocho de ocho | Conteo del párrafo de extensión en cada §7 | Sí |

Detalle del sexto conteo, por ser el que el coordinador pidió contrastar de forma explícita. Las menciones a `SOLUTION-INTAKE` en la categoría son 27. Tres califican versión y las tres apuntan ahora a la 1.1: la cabecera del índice (línea 13), la fila de la cadena de trazabilidad del índice §4.4 (línea 170) y la cabecera del README (línea 11). Las 24 restantes citan por sección o por anexo sin calificar versión —por ejemplo "SOLUTION-INTAKE §1, §3, §4 (F-02, F-03, F-04)" en la cabecera de NB-01—, de modo que la afirmación del generador de que las ocho necesidades no requerían cambio es correcta. Se verificó además que la estructura de secciones del intake no se movió entre v1.0 y v1.1: el diferencial de encabezados devuelve una única diferencia, el retitulado de la sección de supuestos, que no es una sección numerada y que ninguna necesidad cita. Por lo tanto las 24 citas por sección siguen resolviendo contra el intake vigente.

## 4. Defectos nuevos introducidos por la corrección

No se detectaron defectos nuevos de nivel P0, P1 ni P2. Se detectan tres de nivel P3.

### N-01. Contradicción interna en el control de cambios del índice

- Nivel: P3
- Archivo: `Necesidades-Negocio-v1.0.md`
- Sección: Control de cambios, líneas 207 y 208
- Evidencia: la primera fila, que describe la emisión inicial del catálogo, fue reescrita y declara ahora "Catálogo inicial de ocho necesidades de negocio, con cuarenta criterios de éxito, seis de ellos derivados y marcados para confirmación". La segunda fila, que describe la corrección, declara "P1-03: la primera fila de §5 de NB-01 se reconoce como derivación, con lo que el total de derivados pasa de cinco a seis". Las dos filas no pueden ser ambas ciertas: si el catálogo inicial ya tenía seis derivados, no pasaron de cinco a seis. El tratamiento además difiere del que recibió NB-01, cuya primera fila conserva el texto histórico "dos de ellos derivados" y cuya segunda fila narra el paso de dos a tres, que es la forma correcta de registrar un cambio.
- Impacto: el control de cambios deja de ser un registro fiel de la evolución del documento, que es la función que le asigna la política de D5. No afecta contenido ni trazabilidad.
- Recomendación: restituir el texto original de la primera fila del índice, con "cinco de ellos derivados", y dejar que la segunda fila narre el cambio, replicando el criterio ya aplicado en NB-01.

### N-02. Convención de changelog sin incremento de versión, aplicada sin ratificación

- Nivel: P3
- Archivos: los diez documentos de la categoría
- Sección: Control de cambios de cada documento
- Evidencia: el índice y el README llevan tres filas y las ocho necesidades llevan dos, todas con el mismo valor `1.0` en la columna Versión y la misma fecha `2026-07-27`. La justificación se declara en cada fila: "dentro del mismo ciclo de emisión y sin incremento de versión, porque la 1.0 todavía no había sido publicada como vigente". El informe v1.0 había recomendado lo contrario, "actualizar el control de cambios de cada documento tocado con incremento de versión menor, conforme a la política de versionado de `Master-Prompt.md` §5".
- Impacto: la columna Versión deja de discriminar filas y el documento pierde la capacidad de referenciar un estado concreto de sí mismo. El argumento del generador es defendible —el documento nunca estuvo en estado `Vigente`, no hay copia archivada en `_legacy` y la política de deprecación de §5 no llegó a activarse— y el intake consolidado aplicó el mismo criterio con sus filas `1.1`, de modo que ya es una convención de hecho de esta solución. Lo que falta es la ratificación explícita.
- Recomendación: que el orquestador ratifique o rechace la convención como invariante de solución en el bloque de §5, antes de la Fase B. Se va a repetir en las once categorías restantes y en cada ciclo de corrección post-audit, así que conviene que quede declarada una vez y no argumentada documento por documento.

### N-03. Enumeración incompleta de lo que sigue abierto en el intake

- Nivel: P3
- Archivo: `README.md`
- Sección: §6 Qué queda pendiente de confirmación, y la tercera fila de su control de cambios, línea 113
- Evidencia: la fila de control de cambios declara "Los cuatro pendientes de §6 se revisaron contra el intake consolidado y siguen vigentes sin cambios: CL-04, CL-15 y la matriz de navegadores no quedaron alcanzados por la resolución de supuestos". El intake v1.1, en su tabla de marcadores `[S]` sin número, declara abiertos dos y no uno: la matriz de navegadores de §17.1 P.9 y la "Confirmación del supuesto IC-05 sobre la verificación de que un contenedor no esté ya adoptado por otro proyecto, formalizado en la invariante I10", de §17.4 P.11, "declarado por el propio intake como pendiente de Sprint 0". El segundo no aparece ni en la enumeración del changelog ni en la tabla de §6.
- Impacto: el punto abierto omitido es el que corresponde al tercer punto de dolor de `NB-02-Adopcion-Del-Parque-Existente-v1.0.md` §4, "No hay forma de saber qué contenedores del servidor ya están gobernados por la solución y cuáles no, y un mismo contenedor podría quedar asociado a dos conjuntos distintos", y a su CU-06. Es el único de los cuatro puntos abiertos del intake que toca directamente una necesidad de este catálogo sin quedar registrado en él.
- Recomendación: agregar el pendiente a la tabla de §6 del README, con `SOLUTION-INTAKE` §17.4 P.11 como lugar de registro y CU-06 de NB-02 como lo que condiciona, o bien declarar explícitamente que es un pendiente de nivel técnico que la categoría 01 no arrastra y que corresponde a 02 y a 05.

## 5. Coherencia con el intake consolidado v1.1

Se verificó el estado del upstream y su efecto sobre la categoría.

| Verificación | Resultado |
|---|---|
| El intake vigente es el v1.1 y el v1.0 está archivado | Cumple. `SDD/Intake/` contiene únicamente `SOLUTION-INTAKE-SelfHosted-Service-Core-v1.1.md` y el manifiesto; la v1.0 está en `SDD/Intake/_legacy/2026-07-27/`, conforme a la política de deprecación de `Master-Prompt.md` §5 |
| Los tres mecanismos de resolución de supuestos se reflejan sin confundirse | Cumple. La categoría no los describe uno por uno, y la única afirmación agregada es la de la fila de la cadena de trazabilidad del índice §4.4: "Aprobado, con los seis supuestos S-01 a S-06 resueltos". El verbo "resueltos" es el correcto: cubre las tres modalidades sin afirmar que las seis fueron confirmadas, que sería falso para S-05 y S-06 |
| El estado `Aprobado` que declara el índice coincide con el intake | Cumple. La cabecera del intake v1.1 declara `Estado: Aprobado`; la v1.0 declaraba `Borrador` |
| Ningún valor numérico cambió, de modo que los criterios de éxito siguen respaldados | Cumple. Se recontrastaron los catorce números que las necesidades citan del intake: 75 %, 90 %, 100 % con antigüedad menor a 7 días, 50 ms, 90 días de auditoría, 2 s, 15 minutos, 3 a 5 s, 30 segundos, 30 nodos y 40 aristas, 8 contenedores, 5 conjuntos, 6 configuraciones reales y el presupuesto de cientos de MB. Los catorce están presentes en el v1.1 con el mismo valor |
| Las citas por sección de las ocho necesidades siguen resolviendo | Cumple. El diferencial de encabezados entre v1.0 y v1.1 devuelve una única diferencia, el retitulado de una sección no numerada que ninguna necesidad cita |
| Ninguna NB describe las métricas del intake §8 como pendientes de confirmar | Cumple. Las tres necesidades que las adoptan las citan como métrica declarada: NB-02 §5 "La primera es la métrica de adopción del parque de SOLUTION-INTAKE §8", NB-03 §5 "La primera es la métrica de reproducibilidad de SOLUTION-INTAKE §8", NB-04 §5 fila 1 sin marca ni advertencia. Ninguna de las tres las califica de supuesto ni de pendiente. Es coherente con el intake v1.1 §8, que declara S-01 confirmado y las métricas "cerradas" |
| Las frases de confirmación remiten inequívocamente a las derivaciones propias del catálogo | Cumple. Ver el detalle abajo |
| CL-04 y CL-15 siguen registrados como abiertos donde corresponde | Cumple. README §6 filas 2 y 3, y la advertencia de `NB-02-Adopcion-Del-Parque-Existente-v1.0.md` §5 sobre CL-15, que sigue vigente porque el caso límite sigue abierto en el v1.1 |

Detalle sobre el punto que el coordinador señaló como riesgo de ambigüedad. Se localizaron todas las apariciones de "confirmación", "confirmar" y "supuesto" en los diez documentos y se evaluó el referente de cada una. Las tres notas de filas derivadas remiten al conjunto marcado inmediatamente antes y no dejan margen: NB-01 §5 cierra con "Las tres requieren confirmación del cliente", después de explicar las tres filas `[D]`; NB-04 §5 cierra con "Ambas requieren confirmación del cliente", después de explicar las dos; NB-05 §5 cierra con "Requiere confirmación del cliente", en singular, después de explicar la única. El índice §5 titula "Criterios de éxito derivados pendientes de confirmación" y su tabla enumera las seis filas. El README §6 fila 1 dice "Los seis criterios de éxito derivados, marcados `[D]`". En ningún caso la frase de confirmación puede leerse como referida a los supuestos del intake: no hay ninguna mención a S-01 a S-06 fuera de la fila de la cadena de trazabilidad del índice, que los declara resueltos. La única aparición de la palabra "supuesto" en las ocho necesidades es `NB-02-Adopcion-Del-Parque-Existente-v1.0.md` §3, "que es el escenario real del cliente y no un supuesto", donde el sentido es corriente y no técnico. No hay ambigüedad.

## 6. Comprobación de no-regresión sobre lo ya aprobado

La corrección tocó los diez documentos, de modo que se reverificaron los elementos que el informe v1.0 había aprobado y que una reescritura podría haber roto.

| Elemento | Resultado |
|---|---|
| Estructura obligatoria de §4.2 | Cumple. Las ocho necesidades conservan las diez secciones numeradas con los títulos exactos y en el orden exacto, con la tabla de contenido en primera posición y sin contaminar la numeración |
| Cabeceras de §4.1 | Cumple. Los ocho campos en las ocho necesidades y en el índice, más `Cantidad de NB` y `Versión del catálogo de NB` en el índice, y ahora también en el README |
| Tabla A de §4.4 | Cumple. Encabezado `Criterio \| Métrica \| Target \| Plazo` exacto en las ocho, con 5 filas cada una |
| Tabla B de §4.4 | Cumple. Encabezado `Rol \| Nivel \| Qué pide o aporta` exacto en las ocho, con 5 filas y 6 en NB-08, y las tres categorías presentes en todas |
| Tabla D de §4.4 | Cumple. El índice §2 conserva las seis columnas exactas |
| Grafo de dependencias | Cumple. Reconstruido desde las ocho §8: las mismas 12 aristas, acíclico, máximo 2 dependencias, y el orden topológico NB-08, NB-01, NB-04, NB-05, NB-02, NB-06, NB-03, NB-07 sigue siendo válido. La corrección de P3-02 cambió la redacción de la columna de prerequisitos, no las aristas |
| Identificadores de caso de uso | Cumple. 5, 3, 4, 5, 4, 4, 3 y 5 casos de uso, total 33, contiguos de CU-01 a CU-33, sin colisión, con el reparto por proyecto 28 / 3 / 1 / 1 intacto |
| Cobertura de capacidades | Cumple. Las diecisiete capacidades F-01 a F-17 con exactamente una necesidad responsable, sin huérfanas ni duplicadas |
| Enlaces relativos | Cumple. 21 enlaces relativos en los diez documentos, ninguno roto |
| D1, D2 y D3 | Cumple. UTF-8 sin marca de orden de bytes, sin CRLF, sin tabuladores, sin emojis, sin placeholders, sin negritas, filenames ASCII que validan contra el regex de §6. Los caracteres de dibujo de caja del grafo del índice son los mismos que ya llevaba la versión auditada y no son emojis |
| D7 | Cumple. Barrido literal de veintiún términos de stack y del dominio fuente del bootstrap sobre los diez documentos: cero coincidencias |
| Anti-patrones de §4.5 | Cumple. Sin formato de historia de usuario, sin criterios sin número, sin ciclos, sin más de tres dependencias, sin stakeholders genéricos, con MoSCoW explícito en las ocho, y con el único caso limítrofe de flujo paso a paso ya corregido |

## 7. Veredicto final

Veredicto: APROBADO.

Los cuatro P1 y los cuatro P2 están cerrados, verificados con recuento independiente y no con la declaración del generador. Cuatro de los cinco P3 están cerrados y el quinto está descartado con un argumento que este audit acepta. La corrección no introdujo regresiones: los doce elementos de no-regresión verificados siguen conformes. Los tres defectos nuevos son de nivel P3 y ninguno afecta contenido, trazabilidad ni verificabilidad de los criterios.

La categoría queda habilitada para promover a la Fase B sin condiciones bloqueantes. Quedan dos asuntos que corresponden al orquestador y no al generador, y que conviene resolver antes de despachar la categoría 02 porque condicionan a todas las categorías siguientes:

1. Ratificar o rechazar la extensión de la Tabla C con la columna `Proyecto`, que es la condición con la que se cierra P2-01. La decisión afecta a la categoría 02, que va a consumir esas tablas, y a cualquier categoría posterior con tablas de trazabilidad por proyecto.
2. Ratificar o rechazar la convención de registrar correcciones post-audit en el control de cambios sin incrementar la versión, que es el defecto N-02. Ya se aplicó en el intake consolidado y en los diez documentos de esta categoría, así que la ratificación es de una práctica en curso.

Los tres P3 nuevos y el P3-04 descartado se recomiendan para el lote de limpieza de cierre de fase, sin re-audit: son correcciones de registro cuyo resultado es verificable por inspección directa.

---

## Control de cambios

| Versión | Fecha | Cambios | Autor |
|---|---|---|---|
| 2.0 | 2026-07-27 | Verificación de cierre de la categoría 01-Necesidades-Negocio posterior a la corrección del generador y a la consolidación del intake en su versión 1.1. De los trece hallazgos de `A-01-Necesidades-Negocio-v1.0.md`, doce cerrados y uno descartado con descarte aceptado. Siete conteos declarados por el generador recalculados de forma independiente, los siete coincidentes. Tres defectos nuevos, los tres P3 y los tres de registro. Doce elementos de no-regresión reverificados sin desvíos. Veredicto APROBADO | Auditor independiente, Arquitecto de Soluciones más QA Senior |
