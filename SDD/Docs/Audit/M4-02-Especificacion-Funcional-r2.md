# Informe de auditoría — M4 corte 3 · 02-Especificacion-Funcional · ronda 2

| Campo | Valor |
| --- | --- |
| Fase | **M4**, corte 3, de la migración normativa del conjunto SDD **4.1 → 6.0** |
| Producto | SelfHosted Service |
| Proyecto de código | `SelfHosted-Service` · `tipo_proyecto_codigo` = **web-monolith** |
| Categoría auditada | `SDD/Docs/02-Especificacion-Funcional/` — **101 documentos**, medidos en disco |
| Alcance | 38 CU, 40 RN, `Modelo-Datos/Modelo-Conceptual.md`, 19 RC, `Especificacion-Funcional.md`, `README.md` y `Glosario-Funcional.md` (**artefacto nuevo** emitido por esta migración) |
| Línea de base | Los **100** archivados de `_legacy/2026-07-30/` de cada carpeta —`Casos-De-Uso/`, `Reglas-De-Negocio/`, `Modelo-Datos/`, `Modelo-Datos/reglas-conceptuales-de-modelo/` y la raíz de la categoría—. El documento 101, `Glosario-Funcional.md`, no tiene línea de base porque es emisión inicial |
| Normativa aplicada | `Rules-Especificacion-Funcional` **4.0** §2.1, §3.1, §3.3, §3.4, §3.5, §4.1, §4.2, §4.2.1 a §4.2.4, §4.3, §4.5 y §6; `Vocabulario-Rules` **2.1** §9 y §10; `Migracion-Rules` **1.0** §4 y §6 (catorce criterios y seis P0); `Master-Prompt` §10; `Master-Prompt-Migracion` §10; `SDD-Development-Guide` §VI.2 |
| Insumos upstream | `00-Contexto/Vision-Producto.md` §9 (glosario raíz, 34 términos); `01-Necesidades-Negocio/` 2.0; `PRODUCT-INTAKE-SelfHosted-Service` v3.0 §12; `PRODUCT-MANIFEST-SelfHosted-Service` v2.0 §1 y §1.1; `Audit/Plan-Migracion-4.1-a-6.0.md` v1.1 §3.5 (con su Paso 2.b), §4 y §8 |
| Informes previos | `Audit/M4-02-Especificacion-Funcional-r1.md` (**RECHAZADO**, 1 P0 / 0 P1 / 4 P2 / 2 P3). **No se modificó.** Sus afirmaciones se trataron como hipótesis a verificar, no como hechos |
| Auditor | Auditor independiente (Arquitecto de Soluciones + QA Senior), invocado desde cero, sin participación en la migración ni en la ronda 1 |
| Fecha | 2026-07-30 |
| Ronda | **2** |

---

## 0 · Declaración del muestreo

Ninguna afirmación de la ronda 1 ni del orquestador se dio por cierta. Todo lo mecánico se remidió con script propio sobre los 101 documentos; la prosa se muestreó de forma dirigida. Se declara qué es cobertura total y qué es muestreo, con el criterio de selección.

### 0.1 Cobertura del 100 %, con script, sobre los 101 documentos

| # | Verificación | Resultado medido en esta ronda |
| --- | --- | --- |
| W-01 | Censo del árbol: documentos vivos, archivados por carpeta, correspondencia uno a uno | **101 vivos**; 100 con archivado en el `_legacy/2026-07-30/` de su propia carpeta; 1 sin línea de base por emisión inicial |
| W-02 | **Rutas citadas entre acentos graves hacia `_legacy/`: resolución en disco** | **118 citas, 0 no resuelven.** Probadas desde la carpeta del documento y desde la raíz de la categoría → **H-01 de la ronda 1 cerrado** |
| W-03 | Directorios vacíos en el árbol de la categoría | **0.** `_legacy/2026-07-30/Modelo-Datos/` ya no existe |
| W-04 | Residuo textual de las cuatro formas viejas de la cita (`_legacy/2026-07-30/Casos-De-Uso/`, `…/Reglas-De-Negocio/`, `…/Modelo-Datos/`, `…/Modelo-Datos/reglas-conceptuales-de-modelo/`) fuera de `_legacy/` | **0 ocurrencias** |
| W-05 | Cita que nombre el archivado de **otro** documento | 3, las tres en `Glosario-Funcional.md` apuntando a `Modelo-Datos/_legacy/2026-07-30/Modelo-Conceptual-v1.1.md`, que es su **fuente declarada**. Correcto, no defecto |
| W-06 | **Filas históricas de control de cambios: cada fila del archivado, literal en el vivo** | **100/100 conforme, 0 filas históricas reescritas** |
| W-07 | **Filas agregadas por el corte** | **Exactamente 1 en cada uno de los 100.** Distribución sin excepciones |
| W-08 | Diff de cuerpo contra `_legacy/`, excluyendo cabecera y control de cambios | 100 comparados; **44 con diff**, clasificados uno por uno en §4.2. Ninguna clase no declarada |
| W-09 | Diff de cabecera contra `_legacy/` | 100 comparados; nueve firmas de diff, todas de la resolución del plan §3.5 Paso 2.b |
| W-10 | Cabecera: presencia de los siete campos de §4.1 | **101/101 completos.** 100 en bloque `**Campo:** valor`; 1 en tabla (`Especificacion-Funcional.md`) → H-04 |
| W-11 | Valores de cabecera: `Proyecto de código` = `SelfHosted-Service` y `Producto` = `SelfHosted Service` | **101/101 los dos campos, con el valor correcto.** 0 desvíos |
| W-12 | Encoding | 101/101 **utf-8** |
| W-13 | Nombre de archivo: Título-Con-Guiones, sin sufijo de versión, sin acentos ni espacios | 101/101 conforme; **0** con sufijo `-v` en la carpeta de trabajo |
| W-14 | Estado y versión declarados | 101 en `Propuesto`; **99 en 2.0**, `CU-03` en **3.0**, `Glosario-Funcional.md` en **1.0** |
| W-15 | Enlaces markdown relativos que resuelven en disco | **0 rotos** |
| W-16 | Anclas de tabla de contenido | **912 anclas, 0 rotas** (algoritmo de slug de GitHub) |
| W-17 | Tabla de contenido en todo documento con más de tres secciones de primer nivel | 101/101 |
| W-18 | Secciones obligatorias por tipo (11 CU / 7 RN / 6 RC / 9 MC / 5 glosario) | **101/101 completas.** 0 faltantes, 0 obligatorias desplazadas |
| W-19 | Identificadores citados que resuelven (CU-XX, RN-XX, RC-XX) | 97 distintos, **0 sin resolver** |
| W-20 | Simetría CU §9 ↔ RN §5 | **1 asimetría**, `RN-38`/`CU-24`, **deliberada y explicada en prosa** en `RN-38` §5. No es hallazgo (§5.4, ítem 12) |
| W-21 | **Los seis §5 con corrección manual de la Fase B2** (`RN-08`, `RN-12`, `RN-13`, `RN-17`, `RN-24`, `RN-31`) contra su archivado | **6/6 idénticos línea por línea**, incluidas las 27 entradas de `RN-17` |
| W-22 | Censo de «proyecto de código» / «proyectos de código», vivo contra archivado, por zona del documento | **269** en el vivo: 101 cabecera + **14 cuerpo** + 154 fila nueva. En el archivado: 7, las 7 de cuerpo. **Las 14 de cuerpo son metalingüísticas** (§4.3) |
| W-23 | Censo de «proyecto» a secas y de «proyecto SelfHosted», vivo contra archivado | Archivado **875** tokens de «proyecto(s)» —el número que el enunciado del corte trae— y **371** «proyecto(s) SelfHosted»; vivo 1451 y 445. El aumento está íntegramente en las filas nuevas y en el artefacto nuevo |
| W-24 | Censo de «solución» / «soluciones» **en el cuerpo**, fuera de cabecera y fila de cambios | **3 en los 101**, las tres **metalingüísticas** (declaran el renombre de los dos actores). Ninguna designa el nivel superior ni el agrupador de construcción |
| W-25 | Barrido negativo **«reproducto»** | **4 ocurrencias, las 4 entrecomilladas y citando el daño evitado.** 0 de corrupción. Contarlas sería defecto de este informe |
| W-26 | **Supervivencia de «resolución»**, archivo por archivo, vivo contra archivado | Archivado **83**, vivo **129** en los 100 (152 con el glosario). **0 archivos con pérdida.** El dato de la ronda 1 —121 al abrir el corte— es consistente |
| W-27 | Barrido de concordancia de género («la producto», «producto técnica», «una producto», …) | **0** |
| W-28 | Cabecera de tabla de anti-patrones pisada | **0.** No hay tablas de anti-patrones en la categoría |
| W-29 | Emojis | **0** |
| W-30 | Conteos del índice y del README contra el disco | 38 CU, 40 RN, 19 RC **verifican**. El recuento de historias de usuario **no** → H-02 |
| W-31 | **Matriz §6 expandida contra los §9 de los 38 CU** | Matriz **142** identificadores distintos; §9 de los CU **142**; intersección exacta, 0 solo-en-matriz, 0 solo-en-CU, 0 CU sin historias. Declarado: **139** → H-02 |
| W-32 | **Regla de no duplicación del glosario**: los 82 términos de §2 contra los 34 del glosario raíz | **0 solapamientos de nombre** |
| W-33 | **Los 18 términos de §4.1 contra `Vision-Producto.md` §9** | **18/18 existen** en el glosario raíz |
| W-34 | **Las 32 entradas del punto 6 heredado, con destino en el artefacto nuevo** | **32/32 con destino**, 0 sin destino. Reparto declarado 14 a §2 + 18 a §4.1, que cierra |
| W-35 | Reparto declarado de §2 del glosario | Declarado `6+21+18+11+6+6+3+6+3+2`; medido **6, 21, 18, 11, 6, 6, 3, 6, 3, 2 = 82**. Verifica exactamente |
| W-36 | Cinco secciones obligatorias de §4.2.4, con la de más de un referente **no omitida ni vacía** | **5/5 presentes**; §3 con **7 familias** y evidencia de colisión por artefacto |
| W-37 | Filas del plan §4 de la categoría y su columna «fuente de contenido» | **101 filas**; 100 «documento de origen», 1 «documento hermano … + pendiente humano» → H-03 |
| W-38 | Procedencia del framework en `PRODUCT-MANIFEST` §1.1 | Sigue declarando el conjunto **4.1** y `Rules-Especificacion-Funcional` **2.0** |
| W-39 | Barrido D7 de stacks y productos comerciales | 6 ocurrencias (`postgres`/`POSTGRES_*` en `CU-17`, `CU-22`, `CU-35`, `RN-33`; `github-actions-portal` en `MC` §1.12). **Las 6 preexistentes**, verificadas presentes en el archivado con el mismo conteo. No las introdujo este corte |

### 0.2 Muestreo declarado en prosa y estructura fina

**Tamaño: 13 documentos de 101 (12,9 %)**, más **14 de los 82 términos del glosario (17,1 %)** para la regla de inclusión. Criterio: **selección deliberada por riesgo**, no aleatoria.

| Eje de riesgo | Qué se leyó, y por qué es el lugar donde el defecto se esconde |
| --- | --- |
| El artefacto nuevo, sin línea de base, cuyas definiciones tenían que salir de fuentes existentes | `Glosario-Funcional.md` **completo**, incluidas sus 6 secciones y su fila de control de cambios |
| Los tres documentos con diff de cuerpo grande, donde una regeneración disfrazada sería visible | `Modelo-Datos/Modelo-Conceptual.md`, `Especificacion-Funcional.md` y `README.md`: **diff de cuerpo íntegro leído línea por línea** contra su archivado |
| Las **filas corregidas** por el orquestador entre rondas, una por grupo de las cuatro formas de la cita | `CU-01` (grupo de 26), `RN-20` (grupo de 13), `RC-01` y `RC-11` (grupo de 19), `Modelo-Conceptual.md` (caso único) |
| La entidad `Proyecto` del dominio, punto crítico del corte | Las **14 ocurrencias de «proyecto de código» en cuerpo**, leídas una por una en su contexto (§4.3) |
| La asimetría CU↔RN que una extracción mecánica levanta | `RN-38` §5 completo |
| La regla de inclusión del glosario | **Los 14 términos con menos artefactos declarados** de los 82 —el extremo donde un término indebido se cuela—, verificados por ocurrencia sobre el corpus |

Los seis §5 con corrección manual de la Fase B2 se verificaron **los seis al 100 %** y no por muestreo, por ser el P0 número 4 de la migración.

**Límite declarado.** No se evaluó la calidad intrínseca de la prosa de los 88 documentos no muestreados. Lo que sí se cubrió al 100 % es su **preservación**, que es lo que una migración debe garantizar: W-06, W-07, W-08 y W-09 los comparan a los 100 contra el archivado línea por línea, de modo que cualquier reescritura habría aparecido como diff.

---

## 1 · Resumen ejecutivo

**El P0 de la ronda 1 está cerrado, y está cerrado bien.** Las **118** rutas de archivado que los 101 documentos citan entre acentos graves resuelven **todas** en disco, probadas desde la carpeta del documento y desde la raíz de la categoría; el directorio vacío `_legacy/2026-07-30/Modelo-Datos/` fue eliminado y no queda ningún directorio vacío en el árbol; y no sobrevive **ninguna** ocurrencia textual de las cuatro formas viejas de la cita. Las cuatro formas se corrigieron cada una a la forma que resuelve: los 26 CU citan `` `_legacy/2026-07-30/<Nombre>-v<X.Y>.md` `` relativo a `Casos-De-Uso/`, los 13 RN y los 19 RC citan `` `_legacy/2026-07-30/` `` y el modelo conceptual cita `` `_legacy/2026-07-30/Modelo-Conceptual-v1.1.md` ``.

**La corrección no tocó contenido, y eso se verificó y no se asumió.** Ninguna fila histórica de control de cambios se reescribió en ninguno de los 100 documentos con línea de base; cada uno agrega **exactamente una** fila. El cuerpo de los 100, comparado contra el archivado excluyendo cabecera y control de cambios, cambia sólo en las cinco clases declaradas de §4.2 y en ninguna sexta: 44 documentos tienen diff y los 44 se clasificaron. La prosa que rodea a cada cita corregida quedó coherente con la ruta nueva.

**Los seis P0 propios de una migración normativa: ninguno se cumple.** No hay contenido inventado —el artefacto nuevo declara tres fuentes y las tres se verificaron: las **32** entradas del punto 6 heredado tienen las 32 su destino, los **18** términos referenciados existen los 18 en `Vision-Producto.md` §9, y los 82 términos de §2 no solapan **ni uno** con los 34 del glosario raíz—. Ninguna sección exigida por la 4.0 quedó rellenada por inferencia: la sección de términos con más de un referente no se omitió, no está vacía y trae siete familias con evidencia de colisión por artefacto. La procedencia del manifiesto **sigue declarando el conjunto 4.1**. Las **seis** correcciones manuales de la Fase B2 están idénticas línea por línea contra su archivado. El estado previo está archivado en el `_legacy/` de su propia carpeta en los 100 casos. Y las 101 filas del plan quedan resueltas y declaradas en §6.2.

**El punto crítico se resolvió sin daño.** «Proyecto de código» aparece **269** veces: 101 en cabecera, 154 dentro de las filas nuevas donde el término se menciona para declarar cómo se aplicó, y **14 en cuerpo**. Las 14 se leyeron una por una y **las 14 son metalingüísticas**: hablan del vocabulario, no lo aplican. **Ninguna cae sobre la entidad del dominio ni sobre el emprendimiento**, que es el daño P0 que el corte tenía que evitar; la entidad conserva «proyecto SelfHosted» y el emprendimiento queda a secas. Sub-sustitución: cero detectable.

**Los seis hallazgos no bloqueantes de la ronda 1 se reevaluaron uno por uno con medición propia.** Cinco siguen abiertos con la misma severidad, y el sexto —H-07— quedó cerrado en uno de sus tres puntos. **Cero hallazgos nuevos.** Ninguna medición de esta ronda contradijo materialmente a la anterior.

| Nivel | Cantidad |
| --- | --- |
| **P0** | **0** |
| P1 | 0 |
| P2 | 4 |
| P3 | 2 |
| **Total** | **6** |

**Veredicto: APROBADO CON OBSERVACIONES.** Sin P0 y sin P1, la cadena puede avanzar al corte 4. Los cuatro P2 y los dos P3 son defectos de conteo, de declaración del plan y de cierre de hallazgos heredados; ninguno afecta el contenido migrado ni la reversibilidad de la migración, y los seis se resuelven antes de cerrar M6.

---

## 2 · Matriz D1-D9 por documento

D1 idioma · D2 encoding · D3 Título-Con-Guiones · D4 versionado con guion medio · D5 política de deprecación · D6 trazabilidad · D7 prohibición de vocabulario del dominio fuente · D8 conjunto cerrado · D9 evidencia verificable.

| Documento | D1 | D2 | D3 | D4 | D5 | D6 | D7 | D8 | D9 | Observación |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `Casos-De-Uso/CU-01` a `CU-26` (26) | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | **✓** | Cita de archivado **corregida y resuelta**. H-01 cerrado |
| `Casos-De-Uso/CU-27` a `CU-38` (12) | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | No citan ruta de archivado con nombre de archivo; su cita de directorio resuelve |
| `Reglas-De-Negocio/RN-01` a `RN-14` (14) | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | — |
| `Reglas-De-Negocio/RN-15` a `RN-27` (13) | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | **✓** | Cita **corregida y resuelta**. H-01 cerrado |
| `Reglas-De-Negocio/RN-28` a `RN-40` (13) | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | — |
| `Modelo-Datos/Modelo-Conceptual.md` | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | **✓** | Cita **corregida** a `_legacy/2026-07-30/Modelo-Conceptual-v1.1.md`, que resuelve. El directorio vacío fue eliminado |
| `reglas-conceptuales-de-modelo/RC-01` a `RC-19` (19) | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | **✓** | Cita **corregida y resuelta**. H-01 cerrado |
| `Especificacion-Funcional.md` | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | **✗** | Recuento de 139 historias que no verifica contra su propia matriz (H-02). Cabecera en tabla y no en bloque (H-04) |
| `README.md` | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | **✗** | Propaga el 139 bajo rótulo de verificación contra el disco (H-02). §5 sin la lista de las 19 RC (H-05) |
| `Glosario-Funcional.md` | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | **~** | Aritmética de la proyección del conteo de «resolución» de §3.2 que no cierra por uno (H-06) |

**Notas de la matriz.**

- **D4.** Ningún archivo de la carpeta de trabajo lleva sufijo de versión (**0/101**); los 100 archivados lo llevan con guion medio `-v<X.Y>`. Versiones medidas: **99 en 2.0**, `CU-03` en 3.0 —traía 2.0 por el fix de la Fase B2 y no reinició numeración— y `Glosario-Funcional.md` en 1.0 por emisión inicial. Los 101 en estado `Propuesto`.
- **D5.** Un solo archivo por nombre lógico en cada carpeta de trabajo. Correspondencia uno a uno verificada por script: 38 CU ↔ 38 archivados, 40 RN ↔ 40, 19 RC ↔ 19, 1 modelo ↔ 1, 1 índice ↔ 1, 1 README ↔ 1. Las tandas del `2026-07-29` se conservan aparte y no se tocaron.
- **D7.** El barrido devuelve seis ocurrencias: cinco de `postgres` / `POSTGRES_*` como **valores concretos de criterios Given/When/Then** en `CU-17`, `CU-22`, `CU-35` y `RN-33`, y `github-actions-portal` como nombre de token de ejemplo en `Modelo-Conceptual.md` §1.12. Las seis están en el archivado con el mismo conteo: **son preexistentes al corte** y son datos de ejemplo del parque del cliente, que es lo que §4.5 de la regla exige cuando prohíbe criterios sin valores concretos. **No se computa como hallazgo**; se registra para que la ronda siguiente no lo levante.
- **D9.** La marca `✓` de D9 en los 59 documentos de H-01 es el resultado central de esta ronda y se sostiene en W-02, W-04 y W-05: **118 citas, 0 sin resolver, 0 residuos textuales**. Las tres marcas negativas restantes son conteos derivados que no verifican, no evidencias que no resuelvan.

---

## 3 · Matriz de estructura obligatoria

| Artefacto | Secciones que exige la 4.0 | Verificado con script | Resultado |
| --- | --- | --- | --- |
| 38 CU | §4.2, once secciones | 38/38 con `## 1.` a `## 11.` | **Conforme.** Además **19** de los 38 llevan la sección opcional `## 13. Interacción multiusuario y concurrencia`, admitida por §4.3 para `web-monolith`. Ninguna obligatoria desplazada |
| 40 RN | §4.2.1, siete secciones | 40/40 con `## 1.` a `## 7.` | **Conforme.** Los 40 enumeran CU afectados explícitos en §5 |
| 19 RC | §4.2.3, seis secciones | 19/19 con `## 1.` a `## 6.` | **Conforme.** Los 19 llevan además la línea `**Vocabulario:**` en cabecera, con puntero al glosario nuevo |
| `Modelo-Conceptual.md` | §4.2.2, nueve secciones | `## 0.` a `## 10.`, con 1 a 9 presentes | **Conforme.** El punto 6 pasó de «Glosario» a **«Referencia al glosario»**, que es exactamente lo que §4.2.2 punto 6 de la 4.0 pide, con §6.1 separando 14 términos acuñados de 18 referenciados. `## 0.` y `## 9.` son adicionales y no desplazan ninguna obligatoria |
| `Especificacion-Funcional.md` | §2.1: índice maestro con matriz NB→CU→RN→US | §1 a §11 + control de cambios | **Conforme en contenido.** La matriz de §6 tiene las 38 filas y las cuatro columnas, sin duplicados. §11 se agregó al final sin renumerar, con el motivo declarado. **Cabecera en tabla y no en bloque** → H-04 |
| `README.md` | §3.4: listar CU, RN, modelo y RC vigentes con propósito y estado | §1 a §8 | **Parcial.** Los 38 CU (§3) y las 40 RN (§4) llevan su línea con propósito y estado; **las 19 RC no** → H-05 |
| `Glosario-Funcional.md` | §4.2.4, **cinco** secciones | §1 a §6 | **Conforme.** (1) Cabecera de §4.1 completa **con trazabilidad upstream al glosario del dominio de 00**, declarada en dos campos propios; (2) tabla de términos **no vacía**, 82 filas; (3) **términos con más de un referente no omitida y no vacía**, 7 familias con evidencia de colisión; (4) términos referenciados y no redefinidos, 18 más 2 equivalencias de forma; (5) control de cambios. §5, «Constancias del barrido», es adicional y no desplaza ninguna |

**Verificación del reparto declarado del glosario.** §2 declara 82 términos con reparto `6 + 21 + 18 + 11 + 6 + 6 + 3 + 6 + 3 + 2`. Conteo por script sobre las diez subsecciones: **6, 21, 18, 11, 6, 6, 3, 6, 3, 2 = 82**. §4.1 declara 18 y tiene 18; §4.2 declara 2 y tiene 2. El reparto verifica exactamente.

---

## 4 · Coherencia cross-doc y verificación específica de la migración

### 4.1 Coherencia del índice y del catálogo

| Comprobación | Declarado | Medido en disco | Resultado |
| --- | --- | --- | --- |
| Casos de uso | 38 | 38 archivos en `Casos-De-Uso/` | ✓ |
| Reglas de negocio | 40 | 40 en `Reglas-De-Negocio/` | ✓ |
| Reglas conceptuales | 19 | 19 en `reglas-conceptuales-de-modelo/` | ✓ |
| Entidades conceptuales | 15 | §1 tiene **16** subsecciones porque §1.6 declara textualmente «no es una entidad persistida propia: es una proyección derivada del servicio». **Preexistente y explicado** | ✓ |
| Filas de la matriz §6 | 38 | 38, una por CU, sin duplicados | ✓ |
| Cobertura NB→CU bidireccional | 8 NB, ningún CU huérfano | Los 38 CU declaran NB en §9; las 8 NB tienen al menos un CU | ✓ |
| Brechas de §9 | 24, una cerrada | `B-01` a `B-24` | ✓ |
| Actores no humanos distintos | 22, de los cuales 16 acuñados y 6 con traza | 22 nombres distintos en las tablas §2 de los 38 CU | ✓ |
| Actor humano primario renombrado | `Administrador del producto` en los 38 | 38/38 | ✓ |
| Actor de sistema renombrado | `Registro del producto` en 15 CU | 15/15 | ✓ |
| Residuo de `Administrador de la solución` / `Registro de la solución` en cuerpo | 0 | **3**, las tres **metalingüísticas** (IDX §8 y glosario §3.1, declarando el renombre) | ✓ |
| **Historias de usuario previstas** | **139** | La matriz de §6, expandiendo sus seis rangos, suma **142** identificadores distintos; los §9 de los 38 CU enumeran **142**, con intersección exacta y ningún CU en cero | **✗ H-02** |
| Identificadores citados que no resuelven | 0 | 0 sobre CU-XX, RN-XX y RC-XX | ✓ |
| Enlaces relativos rotos | 0 | 0 | ✓ |
| Anclas de tabla de contenido rotas | 0 | 0 de 912 | ✓ |

### 4.2 Preservación: qué cambió realmente en los 100 cuerpos

Diff de cuerpo contra el archivado, excluyendo cabecera y control de cambios. **56 de los 100 no tienen ningún cambio de cuerpo.** Los 44 restantes se clasificaron línea por línea y **las únicas cinco clases de cambio son:**

1. **`«solución»` → `«producto»`** donde designaba el nivel superior, con su concordancia de género cuidada por ocurrencia —«la solución se ejecuta» → «el producto se ejecuta», «aplica sus migraciones sola» → «solo»—. Ejemplos verificados: `CU-19` §1, `CU-28` §1 y §6, `CU-29` §1/§3/§4/§5, `CU-30` §3, `CU-33` §3, `RN-06` §2, `RN-25` §2, `RN-30` §2.
2. **Renombre de los dos actores**, `Administrador de la solución` → `Administrador del producto` y `Registro de la solución` → `Registro del producto`, en las tablas §2.
3. **Ancla de la sección opcional §13** agregada a la tabla de contenido de los CU que la tenían y no la listaban, por cumplimiento de §4.1.
4. **Línea `**Vocabulario:**`** con puntero al glosario nuevo, agregada a los 19 RC.
5. En `Modelo-Conceptual.md`, `Especificacion-Funcional.md` y `README.md`: **la mudanza del glosario y la actualización de conteos**, las dos declaradas en su fila nueva. Los tres diffs se leyeron íntegros.

**No hay ninguna sexta clase.** Ningún propósito, actor, precondición, paso de flujo, flujo alternativo, excepción, postcondición, criterio de aceptación, enunciado de regla, invariante de integridad, brecha ni fila de trazabilidad cambió de contenido en ninguno de los 100.

**Sobre la corrección aplicada entre rondas.** No existe una copia del estado intermedio contra la cual diferenciar, de modo que la verificación se hizo contra la **línea de base**, que es la referencia normativa: si la corrección hubiera tocado contenido, el cuerpo o una fila histórica habrían divergido del archivado. No divergen en ninguno de los 100. Además, la prosa que rodea a cada cita corregida quedó coherente con la ruta nueva —muestreada en `CU-01`, `RN-20`, `RC-01`, `RC-11` y `Modelo-Conceptual.md`, una por cada una de las cuatro formas—: «archivado sin modificar en `_legacy/2026-07-30/CU-01-Alta-De-Proyecto-v1.0.md`», «archivado sin modificación en `_legacy/2026-07-30/`», «La versión 1.0 queda archivada en `_legacy/2026-07-30/`». Ninguna quedó con el segmento de directorio de más ni con una redacción huérfana.

### 4.3 El punto crítico: las dos direcciones del renombre de «proyecto»

**Sobre-sustitución: cero, verificada y no asumida.** «Proyecto de código» y su plural aparecen **269** veces en los 101 documentos vivos. La descomposición, por script, delimitando en cada archivo la cabecera y la sección de control de cambios:

| Ubicación | Ocurrencias | Naturaleza |
| --- | --- | --- |
| Campo de cabecera `**Proyecto de código:**` / fila `| Proyecto de código |` | **101** | Exigido por §4.1; valor `SelfHosted-Service`, leído del `PRODUCT-MANIFEST` §1 |
| Dentro de la fila nueva de control de cambios | **154** | El término se menciona para declarar cómo se aplicó y sobre qué **no** se aplicó |
| **Cuerpo**, fuera de cabecera y control de cambios | **14** | **Las catorce son metalingüísticas** |

Las 14 de cuerpo, una por una, leídas en su contexto:

- `Especificacion-Funcional.md` **8**: §1 línea 45, «sin subnivel de proyectos de código» y «el producto tiene un único proyecto de código»; §2 línea 71, la transcripción de la condición de §1.3 de la regla y la respuesta «el producto tiene un único proyecto de código con cuatro capas»; §8 línea 296, la desambiguación explícita de «proyecto»; §8 línea 298, la nota de cuidado de forma entre `Nombre-Proyecto-Codigo` y `Nombre-Producto`, que difieren sólo por el guion, y la exigencia de §4.1; §8 línea 300, «las cuatro capas … se nombran "capa", nunca "proyecto de código"».
- `Glosario-Funcional.md` **4**: §3.7 el referente R2 de «etiqueta de cabecera»; §3.8 la constancia de la familia «proyecto» que no se recalifica; y las dos filas de «Proyecto de código» y «Capa» en §4.1, la primera declarando «Nada. Aparece **sólo** en el contraste de vocabulario».
- `Modelo-Datos/Modelo-Conceptual.md` **1**: §6.1, fila «Proyecto de código — Sólo en el contraste de vocabulario: no es una entidad de este modelo».
- `Casos-De-Uso/CU-01-Alta-De-Proyecto.md` **1**: §10, «`SelfHosted Service` es el producto; `SelfHosted.Service.Core` es el proyecto de código. Este caso de uso habla del primero».

En el archivado había **7** ocurrencias de cuerpo. Las dos promociones de plural que este corte agregó —«sin subnivel de proyectos» → «sin subnivel de proyectos de código» y «en proyectos con DDD» → «en proyectos de código con DDD»— caen las dos sobre el referente de **unidad de compilación**: la primera nombra el subnivel `Proyectos/<Nombre-Proyecto-Codigo>/` que `Master-Prompt.md` §3.5 aplana, y la segunda transcribe la condición de §1.3 de la regla vigente con la forma que la regla usa. **Las dos están declaradas y justificadas una por una en la fila nueva del índice**, que además enumera las nueve ocurrencias nuevas del documento con su motivo. **Ninguna de las 14 cae sobre la entidad del dominio ni sobre el emprendimiento**, que es el daño P0 que este corte tenía que evitar.

La entidad del dominio está intacta: «proyecto SelfHosted» y su plural pasan de **371** a **445** ocurrencias, y el aumento está íntegramente en las filas nuevas y en el artefacto nuevo. Los **875** tokens de «proyecto» a secas del archivado —el número que el enunciado del corte trae— siguen designando lo que designaban.

**Sub-sustitución: cero detectable.** Se buscaron las marcas de la unidad de compilación en forma desnuda —«proyecto» junto a `SelfHosted.Service`, `.csproj`, `.sln`, «Visual Studio», «compilación», «espacio de nombres», «ensamblado»— sobre los 101 cuerpos. El barrido no devuelve `.csproj` ni `.sln` en ninguno de los 101. Toda referencia a la unidad de compilación está en forma calificada o se nombra «capa», que es el término que `Vision-Producto.md` §9 declara para las cuatro divisiones internas. Las expresiones «módulo de proyectos», «agregado `Proyectos`» y «capa `Application`, módulo de proyectos» de las filas de componentes esperados designan la **entidad del dominio** y no son sub-sustituciones.

### 4.4 Los tres barridos negativos obligatorios del plan §3.5 Paso 4

| Barrido | Resultado | Detalle |
| --- | --- | --- |
| «reproducto» | **4 ocurrencias, 0 de corrupción** | Las cuatro **entrecomilladas y citando el daño** que el procedimiento prohibido produce: `Glosario-Funcional.md` §3.2 (1), su fila de control de cambios (2) y la fila de control de cambios del `README.md` (1). **Contarlas como hallazgo sería un defecto de este informe** |
| Cabecera de tabla de anti-patrones pisada | **0** | No hay tablas de anti-patrones en esta categoría |
| Concordancia de género | **0** | 0 ocurrencias de «la producto», «producto técnica», «una producto», «esta producto» y variantes |

**Supervivencia de «resolución».** Verificada **archivo por archivo** y no en agregado. Los 100 documentos con línea de base tenían **83** ocurrencias en el archivado y tienen **129** en el vivo, y **ningún archivo perdió ni una sola**. El aumento de 46 está íntegramente dentro de las filas nuevas de control de cambios, donde la palabra se menciona para declarar que quedó intacta. El dato de la ronda 1 —**121 en los 100 documentos al abrir el corte**— es consistente con esta medición: 129 menos las menciones que el índice maestro y el `README.md` agregaron al cerrar. Con el glosario, el total de la categoría es **152**. Lo que no cierra es la aritmética con que el glosario proyecta ese cierre: ver H-06.

### 4.5 Gobierno del glosario, con los cuatro criterios de `Master-Prompt` §10

**Sin contradicciones.** Ningún término tiene dos definiciones incompatibles entre artefactos. La regla de no duplicación de §3.3 se verificó mecánicamente: se normalizaron los **82** términos de §2 y los **34** del glosario raíz de `Vision-Producto.md` §9 y se intersectaron. **Cero solapamientos de nombre.** Los **18** términos que §4.1 declara referenciados existen los **18** en el glosario raíz, y su tercera columna declara qué precisa esta categoría sin redefinirlo —en dos casos, «Proyecto de código» y «Capa», la precisión declarada es literalmente «Nada»—. El artefacto **no duplica** el glosario del dominio de 00, que es lo que §6 de la regla exige. `Modelo-Conceptual.md` §6.1 replica la misma separación 14 / 18, coherente con el glosario.

**Completitud.** La regla de inclusión de §3.3 se verificó **por muestreo dirigido a los 14 términos con menos artefactos declarados** de los 82 —17,1 %—, que es el extremo donde un término indebido se esconde. Los 14 se rastrearon por ocurrencia sobre el corpus y **los 14 viven en más de un artefacto**:

| Término | Verificación en disco |
| --- | --- |
| `Registro` / `Administrador del producto` / `Momento de validación` | Presencia masiva: 37, 39 y 41 artefactos respectivamente |
| `Estado agregado` | `CU-02`, `CU-27` — literal en los dos |
| `Marcador de variable` | `CU-09`, `RN-25` — literal en los dos |
| `Conversión con informe` | `CU-17`, `RN-15` — literal en los dos |
| `Dependencia existencial` | `RC-15`, `IDX` — literal en los dos |
| `Recursos declarados del host` | `CU-03`, `RN-19`, `IDX` |
| `Alias DNS` | `RN-01`, `RC-02`, `MC` |
| `Enlace de espera sin variable` | `RC-10`, `IDX`, `MC` |
| `Servicio suelto` | `CU-18`, `CU-20`, `RC-14` |
| `Clase de conflicto` | `CU-21` en singular y `CU-20` en plural, «el algoritmo de validación y sus tres **clases de conflicto**». Una extracción por cadena exacta lo lee como un solo artefacto; leído el texto, son dos |
| `Estado de configuración` | `MC` literal, y `CU-03` §1 «**Sí tiene estado de configuración** —`borrador`, `pendiente-de-aplicar`, `aplicado`—», con los tres estados usados en §4, §5, §7 y §8 del mismo CU |
| `Escape del signo peso` | `RN-25` §1 y §3 —«todo signo peso que forme parte de un valor literal se emite escapado», «ningún signo peso literal queda sin duplicar»— y `RN-26` §1 —«un signo peso duplicado del archivo es un escape»—. El concepto vive en dos reglas; el glosario le da el nombre canónico que ninguna de las dos usa |

Los tres últimos son los que una extracción por cadena exacta marca como falsos positivos, y los tres se descartaron leyendo el texto. **Ninguno de los 14 vive en un solo artefacto.** El candidato que §5.1 declara descartado, `Informe de verificación del origen` en `CU-03`, se verificó descartado con razón, y el segundo, `Brecha declarada de cobertura`, queda fuera por no ser vocabulario del dominio y aparecer sólo en filas históricas.

**Polisemia gobernada.** Las siete familias de §3 declaran referentes, forma calificada obligatoria y **evidencia de colisión por artefacto**, que es lo que §4.2.4 punto 3 pide y lo que `Vocabulario-Rules` §9.4 exige antes de declarar una invariante. Se verificaron las evidencias de las tres familias más cargadas: «registro» R1 contra R5 en un mismo CU —tabla de actores de §2 contra postcondición de §7, verificado en `CU-01`, `CU-02` y `CU-20`—; «ámbito» R2 contra R3 dentro de `RN-21`, cuyo título es «Validez del ámbito de una referencia» y cuya sección 3 se titula «Ámbito de aplicación», verificado; «resolución» R1 contra R2 en `CU-24`, verificado. La escalera de costo de §9.3 se usó en su escalón más barato —la entrada de glosario— con la excepción histórica declarada.

**Criterio negativo: polisemias evaluadas y descartadas.** Se enumeran para que la ronda siguiente no las vuelva a levantar. **Ninguna se reporta como hallazgo.** Se conservan las trece que la ronda 1 enumeró, reverificadas, más una decimocuarta que apareció en esta ronda.

| # | Polisemia evaluada | Por qué no es hallazgo |
| --- | --- | --- |
| 1 | **La familia «proyecto» con sus tres referentes** —entidad del dominio, unidad de compilación, emprendimiento— | Contextos disjuntos, declarados en el `PRODUCT-INTAKE` §12 y transcriptos en `Vision-Producto.md` §9. `Vocabulario-Rules` §9.1 y el criterio negativo de §10 lo excluyen expresamente. El glosario §3.8 lo declara y **no reabre** la decisión, que es lo correcto |
| 2 | **«registro» con el sentido corriente de anotación** | Cuatro ocurrencias en `Modelo-Conceptual.md` («Registro, no clase distinta de variable», «Registro de dependencia», «Registro del disparador», «Registro de una operación»). Verbo sustantivado del castellano; no es ninguno de los cinco referentes |
| 3 | **Las cinco formas calificadas de «registro» entre sí** | `registro del sistema`, `registro de auditoría`, `registro del contenedor`, `registro de imágenes` e `imagen de registro` no colisionan: el modificador las distingue. Calificarlas más sería el falso positivo de §9.1 |
| 4 | **`higiene del registro`, nombre de `CU-36`** | Forma calificada que combina dos familias y se resuelve sola; el glosario §3.4 la declara y no la corrige |
| 5 | **«migración» en las filas de control de cambios** | Las filas nuevas usan la forma calificada «migración normativa» que `Vocabulario-Rules` §4 R6 exige; las históricas no se reescriben por §VI.2. El referente viejo sigue vivo y eso no es defecto |
| 6 | **«solución» dentro de «resolución»** | 129 ocurrencias de la palabra «resolución» en los 100 y 152 en la categoría: **ninguna es el término renombrado**. Las 3 ocurrencias de «solución» en cuerpo son metalingüísticas |
| 7 | **«resolución» como sección de RN y como término del dominio** | El punto 4 de las RN se titula «Consecuencia si se viola», no «Resolución»; no hay colisión de título |
| 8 | **`Ámbito de aplicación`, título obligatorio del punto 3 de toda RN** | Es estructura de la regla de la categoría, no vocabulario del dominio; el glosario §3.3 R3 lo declara y conserva su forma |
| 9 | **«procedencia» del framework contra «procedencia del servicio»** | El glosario §3.6 R3 lo declara como forma del artefacto y no del dominio; su contexto es la sección de control de cambios |
| 10 | **«etiqueta de cabecera» contra «etiqueta de la imagen»** | Referente nacido con esta migración, declarado en §3.7, con su colisión verificada en `CU-15`, `CU-37` y `CU-38` |
| 11 | **«conjunto de servicios» y «conjunto de cambios pendientes»** | El glosario §4.2 las declara como **equivalencias de forma** de «proyecto SelfHosted» y «changeset», no como referentes nuevos. Es el escalón más barato de §9.3 |
| 12 | **`RN-38` §5 nombra `CU-24` para declarar que NO lo alcanza** | Es la **única** asimetría CU↔RN que el barrido devuelve, y leída la prosa es una exclusión deliberada: «**Por qué CU-24, la aplicación en lote, no está en esta lista** … el momento de validación es la validación de la configuración … La aplicación en lote **no vuelve a evaluar** esta regla». Preexistente al corte. **No es hallazgo** |
| 13 | **`Modelo-Conceptual.md` §1 con 16 subsecciones contra 15 entidades declaradas** | §1.6 declara textualmente «no es una entidad persistida propia: es una proyección derivada del servicio». Preexistente y explicado |
| 14 | **`Glosario-Funcional.md` cita el archivado de `Modelo-Conceptual.md` y no el propio** | Es su **fuente declarada** en §1.4: el punto 6 heredado. Un verificador que exija que cada documento cite sólo su propio archivado lo lee como error de referencia cruzada; es lo contrario, es la traza que la regla de no invención necesita. **No es hallazgo** |

---

## 5 · Hallazgos

**Ningún P0. Ningún P1.** Los seis hallazgos son los no bloqueantes que la ronda 1 dejó abiertos, reverificados con medición propia y reenunciados con la evidencia de esta ronda. **Cero hallazgos nuevos.**

### H-02-r2 · P2 · El recuento de 139 historias de usuario no verifica contra la propia matriz que lo sostiene, y el `README.md` lo propaga declarándolo verificado contra el disco

**Archivos.** `Especificacion-Funcional.md` §6 y §7; `README.md` §7 y su fila de control de cambios.

**Evidencia propia.** Expandiendo los **seis** rangos `US-CU-XX-1 a US-CU-XX-n` de la matriz de §6 y contando los identificadores enumerados en el resto de las filas, la matriz suma **142** identificadores distintos. Un conteo independiente sobre los §9 de los 38 casos de uso da **142**, con **intersección exacta**: cero identificadores sólo en la matriz, cero sólo en los CU, cero duplicados y ningún CU con cero historias. El índice declara «Son **139** historias previstas sobre **38** casos de uso» en §6 y «El recuento de historias pasa de 118 a **139**» en §7. La diferencia es de **tres**.

El `README.md` §7 dice «Las **139** historias de usuario previstas de la matriz de §6 del índice maestro», y su fila de control de cambios lo enumera bajo el rótulo «**Conteos actualizados contra el disco** … las historias de usuario previstas de 118 a **139**». El 139 no salió del disco: el mismo valor está en `_legacy/2026-07-30/Especificacion-Funcional-v1.1.md`, emitido por el fix de la Fase B2, cuya matriz ya sumaba 142.

**Por qué es P2 y no P0 por D9.** La evidencia resuelve: la matriz existe, es la fuente y está completa. Lo que falla es el número derivado de ella, que es la distinción que `Master-Prompt` §10 fija entre «una evidencia que no resuelve» y una afirmación imprecisa. **Por qué no es P1**: el índice preservó el valor que el origen traía, que es lo que `Migracion-Rules` §4.2 pide; el defecto es preexistente al corte. Lo que este corte agregó es propagarlo al `README.md` bajo una etiqueta de verificación que no se cumplió.

**Recomendación.** Fijar el recuento en 142 en los cuatro lugares, o declarar por qué tres de los 142 identificadores no cuentan. Corregir además el rótulo del `README.md`.

---

### H-03-r2 · P2 · La columna «fuente de contenido» del plan declara «documento de origen» para 100 de las 101 filas, y al menos cuatro conjuntos de documentos usaron además un hermano o el upstream

**Archivo.** `Audit/Plan-Migracion-4.1-a-6.0.md` §4, las 101 filas de `02-Especificacion-Funcional`.

**Evidencia propia.** Extraídas por script las 101 filas de la categoría: **100 declaran «documento de origen»** y una sola, la de `Glosario-Funcional.md`, declara «documento hermano (punto 6 de `Modelo-Conceptual.md` y términos acuñados en 02) + pendiente humano». Clasificación: 100 «Regenerar contenido» y 1 «Regenerar contenido · emisión inicial». Los propios documentos migrados declaran otra cosa:

| Documento | Lo que el plan declara | Lo que el documento declara y se verificó |
| --- | --- | --- |
| `Modelo-Datos/Modelo-Conceptual.md` | documento de origen | «documento de origen, **más el upstream de 00**» para la no duplicación del glosario, y el intake §12 para la convención de vocabulario. Su §6.1 separa 14 términos acuñados de 18 referenciados, separación que **sólo** se puede hacer leyendo `Vision-Producto.md` §9 |
| `Especificacion-Funcional.md` | documento de origen | Conteos reverificados contra los 38, 40 y 19 archivos **hermanos**; §11 nuevo que remite al glosario hermano; tabla de actores de §8 realineada contra las tablas §2 de los 38 CU, de donde salen los conteos 22 / 16 / 11 |
| `README.md` | documento de origen | §6 nuevo con el conteo de secciones del glosario **hermano**, y conteos tomados del disco |
| Los 19 RC | documento de origen | Línea `**Vocabulario:**` nueva con puntero a `Glosario-Funcional.md` y a `Vision-Producto.md` §9, ninguno de los dos el documento de origen |

Ninguno de estos contenidos es invención: los cuatro valores usados caben en los tres admitidos de `Migracion-Rules` §2.1 leyendo el upstream de 00 y el intake como documentos del mismo destino. El defecto es de **declaración del plan**, no de contenido.

**Repetición.** Tercer corte consecutivo con el mismo hallazgo —H-03 del corte 1, H-02 del corte 2— y la fila v1.1 del control de cambios del plan lo confirma: «**Ninguna fila de §4 cambió de clasificación ni de fuente de contenido**».

**Recomendación.** Corregir el valor de la columna en las cuatro filas antes de cerrar M6, y declarar en el informe de M6 el patrón, que ya lleva tres cortes.

---

### H-04-r2 · P2 · La cabecera del índice maestro sigue en formato tabla y no en bloque de metadatos

**Archivo.** `Especificacion-Funcional.md`, cabecera.

**Evidencia propia.** Es el único de los 101 documentos cuya cabecera es una tabla `| Campo | Valor |` en lugar del bloque `**Campo:** valor` que §4.1 de la 4.0 declara. Los otros 100 llevan el bloque. Los siete campos obligatorios están presentes y correctos —incluidos `Proyecto de código` con `SelfHosted-Service` y `Producto` con `SelfHosted Service`—, más siete adicionales. Lo que difiere es la forma, y la forma es lo que sostiene la extracción automática que el resto de la cadena hace de la cabecera: la propia verificación W-10 de este informe tuvo que ramificar para leerlo.

**Repetición.** Es el **H-07 de `B-02-03-r1.md`**, emitido el 2026-07-29 y clasificado P2 entonces. `Migracion-Rules` §3 declara que la normativa vigente es la especificación del estado al que hay que llegar, y este documento se clasificó «regenerar contenido»: el corte era la ocasión de cerrarlo. Su fila nueva no declara la desviación.

**Por qué es P2 y no P1.** No falta ningún campo obligatorio y la trazabilidad no se rompe. Se conserva el nivel con el que las dos rondas anteriores lo tipificaron, sin motivo nuevo para moverlo.

**Recomendación.** Convertir a bloque de metadatos y mover los siete campos adicionales a una tabla posterior a la cabecera. Si se decide no hacerlo, declarar la desviación en el documento con su motivo.

---

### H-05-r2 · P2 · El `README.md` sigue sin listar las 19 reglas conceptuales con propósito y estado, como exige §3.4

**Archivo.** `README.md` §5.

**Evidencia propia.** §3.4 de la regla: «Debe listar CU, RN, modelo y RC vigentes con propósito en una línea y estado actual». El README lista los 38 CU (§3) y las 40 RN (§4) con propósito y estado. Para las reglas conceptuales dice sólo: «Las **19** reglas conceptuales están en [reglas-conceptuales-de-modelo/](…), todas en estado `Propuesto`, versión **2.0**. Son obligatorias porque el modelo supera las diez entidades, por las dos vías de conteo». No hay una línea por RC ni su propósito. El diff contra el archivado confirma que el corte actualizó el conteo de 18 a 19 y las versiones, y **no agregó la lista**.

**Repetición.** Es el **H-08 de `B-02-03-r1.md`**, también P2, también abierto.

**Recomendación.** Agregar la tabla de 19 filas con el mismo formato que las de CU y RN. El propósito de cada RC está en su §1 y no hay que redactarlo.

---

### H-06-r2 · P3 · La aritmética con la que el glosario proyecta el conteo de «resolución» al cierre no cierra por uno

**Archivo.** `Glosario-Funcional.md` §3.2, y la misma cifra repetida en su fila de control de cambios.

**Evidencia propia.** §3.2 dice: «En esta categoría había **121** ocurrencias de "resolución" sobre los cien archivos al abrir este lote, y las 121 se verificaron intactas al cerrarlo; el conteo sobre los mismos cien archivos pasa a **128** por las **siete** menciones nuevas … y a **151** contando este glosario». Medición por script: el conteo de la palabra sobre los 100 archivos vivos es **129** y el del glosario es **23**, de modo que el total de la categoría es **152**. Las menciones nuevas del índice maestro y del `README.md` son **ocho**, no siete. El 121 de partida es consistente; lo que no verifica es la proyección.

**Por qué es P3 y no P2.** La afirmación que importa —«las 121 se verificaron intactas»— es **cierta** y se comprobó archivo por archivo: ningún documento perdió una sola ocurrencia. El error está en una cifra derivada y accesoria, que no sostiene ninguna decisión.

**Recomendación.** 128 → 129, «siete» → «ocho», 151 → 152, en §3.2 y en la fila de control de cambios.

---

### H-07-r2 · P3 · El registro de avance del plan sigue atrás en dos de sus tres puntos

**Archivo.** `Audit/Plan-Migracion-4.1-a-6.0.md` §8 y §3.5 Paso 2.b.

**Evidencia propia.** De los tres puntos que la ronda 1 agrupó, **uno quedó cerrado y dos siguen abiertos**:

1. **§8 sigue diciendo** «Al emitirse este plan, las 143 filas —141 documentos emitidos, 1 artefacto ausente y los 2 documentos de entrada— están **sin resolver**», después de cerrar tres cortes y 121 documentos. Es la repetición del H-04 del corte 2. **Abierto.** (Nota de medición propia: §4 del plan contiene hoy **151** filas de documento, no 143; la diferencia no es objeto de este hallazgo pero conviene reconciliarla al cerrar M6.)
2. **§3.5 Paso 2.b sigue diciendo** «El campo se agregó a los **73** documentos de 02 que no lo tenían». Medición propia sobre la línea de base: de los **100** archivados en `_legacy/2026-07-30/`, **99** carecían del campo `Proyecto de código` en cualquiera de sus dos formas. El 73 no verifica bajo ninguna lectura. El resultado en disco, en cambio, es correcto: **101 de 101** llevan hoy los dos campos con el valor correcto. **Abierto.**
3. **El directorio vacío** `_legacy/2026-07-30/Modelo-Datos/`. **Cerrado**: no existe, y el barrido de directorios vacíos sobre todo el árbol de la categoría devuelve **0**.

**Por qué no es el P0 número 6 de la migración.** Ese P0 es «una fila del plan **sin resolver y sin declarar**». Las 101 filas de este corte están resueltas —los 101 documentos existen, con su archivado y su fila nueva— y quedan declaradas una por una en §6.2. La conjunción del P0 no se cumple: es un defecto de registro del avance, no un estado no declarado.

**Recomendación.** Actualizar §8 con el estado por corte y reconciliar el total de filas; corregir el 73.

---

## 6 · Verificación de la migración

### 6.1 Los seis P0 de `Master-Prompt-Migracion` §10, uno por uno

| # | Hallazgo P0 | Cómo se verificó en esta ronda | Resultado |
| --- | --- | --- | --- |
| 1 | Contenido que no proviene del origen, de un hermano, del upstream o del humano | Diff de cuerpo de los 100 contra su archivado excluyendo cabecera y control de cambios: 56 sin cambio, 44 con diff, **las cinco clases de §4.2 y ninguna sexta**. Para el artefacto nuevo: las **32** entradas del punto 6 heredado tienen destino verificado (14 a §2, 18 a §4.1, 0 sin destino); los **18** referenciados existen los 18 en `Vision-Producto.md` §9; **0** de los 82 términos de §2 solapa con los 34 del glosario raíz; los 14 términos de menor presencia se verificaron por ocurrencia y **los 14 viven en más de un artefacto**; y §5.2 declara explícitamente que ninguna definición se redactó de cero | **No se cumple** |
| 2 | Sección exigida rellenada con contenido inferido en lugar de emitida como pendiente | Las cinco secciones de §4.2.4 están completas y con fuente declarada. La de términos con más de un referente **no se omitió y no está vacía**: siete familias con evidencia de colisión verificada en tres de ellas. §5.2 emite el pendiente en forma explícita —«**Ninguno**»— y §5.1 declara el candidato descartado con su conteo, en lugar de inflar la tabla. En los 100 restantes, 101/101 secciones obligatorias completas sin ninguna rellenada | **No se cumple** |
| 3 | Procedencia reescrita con migración parcial | `PRODUCT-MANIFEST-SelfHosted-Service.md` §1.1 sigue declarando el conjunto **4.1** y `Rules-Especificacion-Funcional` en **2.0**, y su prosa declara expresamente que la actualización a 6.0 es trabajo de M5 y sólo ocurre con la cadena completa. Nada se adelantó | **No se cumple** |
| 4 | Corrección manual pisada sin declarar la interpretación | Los seis §5 señalados —`RN-08`, `RN-12`, `RN-13`, `RN-17`, `RN-24`, `RN-31`— se compararon **línea por línea** contra su archivado: **los seis idénticos**, con 4, 6, 8, 27, 8 y 8 CU afectados respectivamente. Además `RN-38` §5 conserva íntegro el párrafo que explica por qué `CU-24` no está en su lista, y `CU-03` conserva su versión **3.0** en lugar de reiniciar la numeración | **No se cumple** |
| 5 | Estado previo no archivado en el `_legacy/` de su propia carpeta | 100 archivados en las cuatro carpetas correctas, con correspondencia uno a uno verificada por script y sufijo de versión con guion medio. Las tandas del `2026-07-29` se conservan aparte y no se tocaron. **Y ahora las 118 citas que lo declaran resuelven las 118**, que era el defecto de la ronda 1 | **No se cumple** |
| 6 | Fila del plan sin resolver y sin declarar | Las **101** filas de la categoría están resueltas y quedan declaradas en §6.2 | **No se cumple** |

Los seis P0 propios de la migración están limpios. El P0 que la ronda 1 levantó pertenecía a la matriz general de `Master-Prompt` §10 y **quedó cerrado**.

### 6.2 Estado de las 101 filas del plan

| Grupo de filas | Cantidad | Clasificación del plan | Estado efectivo | Fuente de contenido efectiva |
| --- | --- | --- | --- | --- |
| `Casos-De-Uso/CU-01` a `CU-38` | 38 | Regenerar contenido | **Resueltas.** 38 archivos en 2.0, salvo `CU-03` en 3.0; 38 archivados; 38 citas de archivado que resuelven | Documento de origen |
| `Reglas-De-Negocio/RN-01` a `RN-40` | 40 | Regenerar contenido | **Resueltas.** 40 archivos en 2.0; 40 archivados | Documento de origen |
| `Modelo-Datos/Modelo-Conceptual.md` | 1 | Regenerar contenido | **Resuelta.** 2.0; archivado; cita que resuelve | Origen **+ hermano y upstream de 00 y del intake** (H-03-r2) |
| `reglas-conceptuales-de-modelo/RC-01` a `RC-19` | 19 | Regenerar contenido | **Resueltas.** 19 archivos en 2.0; 19 archivados | Origen **+ hermano** para el puntero de vocabulario (H-03-r2) |
| `Especificacion-Funcional.md` | 1 | Regenerar contenido | **Resuelta.** 2.0; archivado | Origen **+ hermanos** para los conteos y la tabla de actores (H-03-r2) |
| `README.md` | 1 | Regenerar contenido | **Resuelta.** 2.0; archivado | Origen **+ hermanos** (H-03-r2) |
| `Glosario-Funcional.md` | 1 | Regenerar contenido · emisión inicial | **Resuelta.** 1.0, artefacto nuevo, cinco secciones conformes | Hermano (punto 6 heredado + los 98 hermanos) + upstream. El valor «pendiente humano» que el plan declara **no se usó**, y §5.2 lo dice |
| **Total** | **101** | — | **101 resueltas, 0 pendientes** | — |

### 6.3 Contenido del origen sin destino en la normativa vigente

**Ninguno.** El único bloque que la 4.0 desubica es el punto 6 de `Modelo-Conceptual.md`, que deja de ser el glosario de la categoría. Sus **32** entradas se verificaron con destino por script: **14** a la tabla de §2 del artefacto nuevo y **18** a la lista de referenciados de §4.1, **cero sin destino**. El documento conserva además el criterio de inclusión que ya aplicaba y la entrada polisémica de «registro», que pasó de cuatro a cinco referentes por el renombre del actor de sistema.

### 6.4 Los catorce criterios de `Migracion-Rules` §6

Conformes **doce de catorce**. **No conforme**: el criterio 1 —fuente de contenido declarada en el plan con uno de los tres valores— por H-03-r2, en cuatro conjuntos de filas. **Fuera del alcance de este corte**: los criterios 8 y 9, sobre el intake y el manifiesto, auditados en M2 y M3.

El criterio 4 —estado previo archivado en el `_legacy/` de la propia carpeta antes de sobrescribir— pasa de conforme-con-evidencia-defectuosa a **conforme sin reservas**: el archivado estaba bien desde la ronda 1 y ahora las citas que lo declaran resuelven. El criterio 14 —ninguna sustitución por reemplazo global de cadena— es el más verificado: las cuatro «reproducto» son citas entrecomilladas, las 129 «resolución» de los 100 documentos están intactas archivo por archivo con cero pérdidas, las 3 «solución» de cuerpo son metalingüísticas, y las 269 «proyecto de código» se descompusieron por zona del documento con las 14 de cuerpo leídas una por una.

---

## 6-bis · Estado de los siete hallazgos de la ronda 1

Declaración hallazgo por hallazgo, con la evidencia de esta ronda. **No se modificó `M4-02-Especificacion-Funcional-r1.md`.**

| Hallazgo de la r1 | Nivel r1 | Estado en r2 | Evidencia propia |
| --- | --- | --- | --- |
| **H-01** · 59 de los 101 documentos citan una ruta de archivado que no existe en disco | **P0** | **CERRADO** | **118 citas hacia `_legacy/` en los 101 documentos, 0 no resuelven**, probadas desde la carpeta del documento y desde la raíz de la categoría (W-02). Las cuatro formas quedaron corregidas cada una a la que resuelve: 26 CU a `` `_legacy/2026-07-30/<Nombre>-v<X.Y>.md` ``, 13 RN y 19 RC a `` `_legacy/2026-07-30/` ``, y el modelo a `` `_legacy/2026-07-30/Modelo-Conceptual-v1.1.md` ``. **0 residuos textuales** de las cuatro formas viejas fuera de `_legacy/` (W-04). El directorio vacío `_legacy/2026-07-30/Modelo-Datos/` fue eliminado y el árbol no tiene **ningún** directorio vacío (W-03). La corrección **no tocó contenido**: 0 filas históricas alteradas en los 100 (W-06), exactamente 1 fila agregada en cada uno (W-07), cuerpo idéntico al archivado salvo las cinco clases declaradas (W-08), y la prosa que rodea cada cita corregida quedó coherente, muestreada en una por cada forma |
| **H-02** · El recuento de 139 historias no verifica y el README lo propagó como verificado contra el disco | P2 | **ABIERTO**, mismo nivel | Matriz §6 expandida: **142** identificadores distintos; §9 de los 38 CU: **142**; intersección exacta. Declarado: **139** en índice §6, §7, README §7 y su fila de control de cambios. Sin cambios respecto de la r1 → **H-02-r2** |
| **H-03** · La columna «fuente de contenido» del plan declara «documento de origen» para 100 de 101 filas | P2 | **ABIERTO**, mismo nivel | 101 filas extraídas del plan §4: **100 «documento de origen»**, 1 «documento hermano … + pendiente humano». La fila v1.1 del control de cambios del plan confirma que ninguna fila de §4 se tocó. Cuatro conjuntos usaron hermano o upstream → **H-03-r2** |
| **H-04** · Cabecera del índice maestro en tabla y no en bloque | P2 | **ABIERTO**, mismo nivel | 100 de 101 documentos con cabecera en bloque; `Especificacion-Funcional.md` es el único en tabla. Los siete campos obligatorios están, con los valores correctos → **H-04-r2** |
| **H-05** · El README sigue sin listar las 19 RC con propósito y estado | P2 | **ABIERTO**, mismo nivel | §5 del README lista las 19 en una sola oración, sin una línea por RC ni propósito. El diff contra el archivado confirma que el corte actualizó el conteo y no agregó la lista → **H-05-r2** |
| **H-06** · La aritmética de la proyección del conteo de «resolución» no cierra por uno | P3 | **ABIERTO**, mismo nivel | `Glosario-Funcional.md` §3.2 sigue declarando 128, «siete» y 151. Medición: **129** en los 100, **23** en el glosario, **152** total; las menciones nuevas son **ocho**. El 121 de partida y la afirmación de intactas verifican → **H-06-r2** |
| **H-07** · El registro de avance del plan quedó atrás en tres puntos | P3 | **PARCIALMENTE CERRADO** — 1 de 3 puntos cerrado, sigue abierto como P3 | Punto 3, el directorio vacío: **CERRADO**, 0 directorios vacíos en el árbol. Punto 1, §8 «las 143 filas … sin resolver»: **ABIERTO**, texto sin cambios. Punto 2, «los 73 documentos»: **ABIERTO**; medición propia sobre la línea de base: **99 de 100** archivados carecían del campo → **H-07-r2** |

**Dos diferencias de medición respecto de la ronda 1**, ninguna de ellas un defecto de los documentos auditados, registradas para trazabilidad: la r1 declara «98 en 2.0» y la medición propia da **99 en 2.0** —98 + `CU-03` en 3.0 + el glosario en 1.0 son 100 y no 101—; y la r1 declara 18 CU con la sección opcional §13, mientras la medición propia da **19**. Las dos son aritmética del informe anterior, no del corpus, y no cambian ninguna conclusión.

---

## 7 · Veredicto

# APROBADO CON OBSERVACIONES

Cero hallazgos **P0**, cero **P1**, cuatro **P2** y dos **P3**.

El P0 que detuvo la cadena está cerrado, y el cierre es del tipo que se puede verificar sin creer a nadie: las **118** rutas de archivado que los 101 documentos citan resuelven **todas** en disco, no queda **ninguna** ocurrencia textual de las cuatro formas viejas, y el único directorio vacío del árbol desapareció. Lo más importante es lo que **no** cambió al corregirlo: ninguna de las 100 tablas de control de cambios perdió ni alteró una fila histórica, cada una agrega exactamente una fila, y el cuerpo de los 100 sigue siendo idéntico al archivado salvo las cinco clases de cambio que la migración declara. La corrección fue lo que tenía que ser: una cadena de ruta en 59 filas emitidas en este mismo corte, sin una línea de contenido tocada.

Lo que el corte hizo bien sigue verificando de forma independiente. La doble dirección del renombre de «proyecto» —el punto crítico, sobre los 875 tokens de la línea de base— se resolvió sin **una sola** promoción sobre la entidad del dominio: de las 269 ocurrencias de «proyecto de código», 101 son el campo de cabecera que §4.1 exige, 154 viven dentro de la fila nueva declarando cómo se aplicó, y las **14 de cuerpo son metalingüísticas**, leídas una por una. Las dos promociones de plural que el corte agregó caen sobre la unidad de compilación y están justificadas de a una en la fila del índice. Las 129 ocurrencias de «resolución» sobrevivieron archivo por archivo sin una sola pérdida; las cuatro «reproducto» son citas entrecomilladas del daño que se evitaba y contarlas habría sido un defecto de este informe; las seis correcciones manuales de la Fase B2 están idénticas línea por línea. Y el artefacto nuevo, que era el riesgo más alto por no tener línea de base, sale de fuentes verificables: las 32 entradas del glosario heredado tienen las 32 su destino, sus 82 términos no solapan **ni uno** con los 34 del glosario raíz, sus 18 referenciados existen los 18 en `Vision-Producto.md` §9, la regla de inclusión aguanta en los 14 términos de menor presencia, y la sección de términos con más de un referente no se omitió ni quedó vacía.

Los seis hallazgos restantes son de conteo y de registro. Ninguno afecta el contenido migrado, ninguno rompe trazabilidad y ninguno compromete la reversibilidad de la migración. El corte 3 puede promoverse.

### Condiciones para promover

**Ninguna bloqueante.** El corte queda habilitado para avanzar al corte 4.

**No bloqueantes, a resolver antes de cerrar M6:**

1. Fijar el recuento de historias de usuario en **142** en `Especificacion-Funcional.md` §6 y §7 y en `README.md` §7, o declarar por qué tres no cuentan; y corregir el rótulo del `README.md`, que declara verificado contra el disco un conteo que no lo fue (H-02-r2).
2. Corregir la columna «fuente de contenido» del plan en las cuatro filas de H-03-r2. Es el **tercer corte consecutivo** con el mismo hallazgo y el plan declara expresamente que no lo tocó: el informe de M6 debería declarar el patrón, porque un plan cuya columna de procedencia no se mantiene deja de ser el registro que `Migracion-Rules` §6 criterio 1 pide.
3. Cerrar o declarar los dos hallazgos que la migración heredó abiertos de `B-02-03-r1.md` y que llevan tres rondas sin moverse: la cabecera en tabla del índice (H-04-r2, era su H-07) y la lista de las 19 RC en el README (H-05-r2, era su H-08).
4. Corregir la aritmética de `Glosario-Funcional.md` §3.2 (H-06-r2) y los dos puntos abiertos del registro de avance del plan (H-07-r2), incluida la reconciliación entre las «143 filas» de §8 y las 151 filas que §4 tiene hoy.

**Para el corte 4 (`03-UX-UI-DX`), que tiene `Wireframes/` y `Representaciones/` como subcarpetas.** La lección de H-01 sigue vigente y el corte 4 repite exactamente la condición que lo produjo: el despacho de cada subagente debe entregarle la ruta de archivado **efectiva y ya consolidada**, no la que el orquestador planea usar. El plan §3.5 Paso 2.b declara que la consolidación «rige igual para el corte 4»; lo que hay que agregar es que la ruta que el despacho comunica y la que el orquestador ejecuta sean **la misma**, y que el barrido de cierre del corte incluya la verificación de que **toda ruta citada resuelve en disco**, que es la verificación que habría detectado H-01 antes del audit.

**Para M5.** La procedencia sigue correctamente en **4.1** y así debe seguir hasta que el corte 4 quede aprobado. `PRODUCT-MANIFEST` §1.1 lo declara con su motivo y no se adelantó nada.

---

## Control de cambios

| Versión | Fecha | Cambios | Autor |
| --- | --- | --- | --- |
| 1.0 | 2026-07-30 | Auditoría independiente de la **ronda 2** del corte 3 de la fase M4 de la migración normativa 4.1 → 6.0, sobre los **101** entregables de `02-Especificacion-Funcional`, contra `Rules-Especificacion-Funcional` 4.0, `Vocabulario-Rules` 2.1 §9 y §10, los catorce criterios de `Migracion-Rules` 1.0 §6, la matriz de `Master-Prompt` §10 y los seis hallazgos P0 de `Master-Prompt-Migracion` §10. Línea de base: los 100 archivados de `_legacy/2026-07-30/` de cada carpeta. Ninguna afirmación de la ronda 1 se dio por cierta: todo lo mecánico se remidió con script propio. Método declarado: **treinta y nueve verificaciones de cobertura total con script** más **muestreo dirigido de 13 documentos sobre 101 y de 14 términos sobre los 82 del glosario**, elegidos por riesgo. **El P0 de la ronda 1 (H-01) queda CERRADO**: las 118 rutas de archivado citadas en los 101 documentos resuelven las 118, no sobrevive ninguna ocurrencia textual de las cuatro formas viejas, el directorio vacío fue eliminado, y la corrección no tocó contenido —0 filas históricas alteradas, exactamente 1 fila agregada por documento, cuerpo idéntico al archivado salvo las cinco clases declaradas—. Los otros seis hallazgos se reevaluaron con medición propia: **cuatro P2 y dos P3 siguen abiertos**, con H-07 cerrado en uno de sus tres puntos. **Cero hallazgos nuevos.** Se verifican los **seis P0 de migración limpios**, incluidas las seis correcciones manuales de la Fase B2 idénticas línea por línea y la procedencia todavía en 4.1. Se verifica la doble dirección del renombre de «proyecto» sobre 269 ocurrencias de «proyecto de código» descompuestas por zona del documento, con las **14 de cuerpo leídas una por una y todas metalingüísticas**, cero sobre-sustituciones y cero sub-sustituciones; y las 129 ocurrencias de «resolución» de los 100 documentos sin pérdida en ningún archivo. Se enumeran **catorce polisemias evaluadas y descartadas**, entre ellas las cuatro «reproducto» entrecomilladas y la asimetría deliberada `RN-38`/`CU-24`, para que la ronda siguiente no las vuelva a levantar. Veredicto: **APROBADO CON OBSERVACIONES**, sin condiciones bloqueantes. | Auditor independiente (Arquitecto de Soluciones + QA Senior) |
