# Informe de auditoría — M4 corte 3 · 02-Especificacion-Funcional · ronda 1

| Campo | Valor |
| --- | --- |
| Fase | **M4**, corte 3, de la migración normativa del conjunto SDD **4.1 → 6.0** |
| Producto | SelfHosted Service |
| Proyecto de código | `SelfHosted-Service` · `tipo_proyecto_codigo` = **web-monolith** |
| Categoría auditada | `SDD/Docs/02-Especificacion-Funcional/` — **101 documentos** |
| Alcance | 38 CU, 40 RN, `Modelo-Datos/Modelo-Conceptual.md`, 19 RC, `Especificacion-Funcional.md`, `README.md` y `Glosario-Funcional.md` (**artefacto nuevo** emitido por esta migración) |
| Línea de base | Los **100** archivados de `_legacy/2026-07-30/` de cada carpeta (`Casos-De-Uso/`, `Reglas-De-Negocio/`, `Modelo-Datos/`, `Modelo-Datos/reglas-conceptuales-de-modelo/` y la raíz de la categoría). El documento 101 no tiene línea de base porque es emisión inicial |
| Normativa aplicada | `Rules-Especificacion-Funcional` **4.0** §6; `Vocabulario-Rules` **2.1** §9 y §10; `Migracion-Rules` **1.0** §6 (catorce criterios y seis P0); `Master-Prompt` §10; `Master-Prompt-Migracion` §10; `SDD-Development-Guide` §VI.2 |
| Insumos upstream | `00-Contexto/Vision-Producto.md` §9 (glosario raíz), `Alcance-Producto.md`; `01-Necesidades-Negocio/` 2.0; `PRODUCT-INTAKE-SelfHosted-Service` v3.0 §12; `PRODUCT-MANIFEST-SelfHosted-Service` v2.0 §1.1; `Audit/Plan-Migracion-4.1-a-6.0.md` v1.1 §3.5 y §4 |
| Informes previos consultados | `Audit/B-02-03-r1.md`, `Audit/B2-Fix-Definiciones-Servicio-r1.md`, `Audit/M4-00-Contexto-r1.md`, `Audit/M4-01-Necesidades-Negocio-r1.md` |
| Auditor | Auditor independiente (Arquitecto de Soluciones + QA Senior), invocado desde cero, sin participación en la migración |
| Fecha | 2026-07-30 |
| Ronda | 1 |

---

## 0 · Declaración del muestreo

Con 101 documentos no se lee todo con la misma profundidad. Se declara qué se verificó al 100 % y qué por muestreo, con el criterio de selección, según el precedente de `Audit/B-02-03-r1.md`.

### 0.1 Cobertura del 100 %, con script, sobre los 101 documentos

| # | Verificación | Resultado |
| --- | --- | --- |
| V-01 | Cabecera: presencia y valor de `Proyecto de código`, `Producto`, `Documento`, `Versión`, `Estado`, `Fecha`, `Autor` | 100/100 en bloque; 1 en tabla (`Especificacion-Funcional.md`) |
| V-02 | Encoding de los 101 archivos | 101/101 **utf-8** |
| V-03 | Nombre de archivo: Título-Con-Guiones, sin sufijo de versión en el vivo, sin acentos ni espacios | 101/101 conforme; 0 con sufijo `-v` |
| V-04 | Filas de control de cambios: cada fila del archivado aparece **literal** en el vivo, y el vivo agrega exactamente una | **100/100 conforme**, 0 filas históricas reescritas |
| V-05 | Diff de cuerpo contra `_legacy/` excluyendo cabecera y control de cambios | 100/100 comparados; los cambios son los declarados (ver §4.2) |
| V-06 | Enlaces markdown relativos que resuelven en disco | 0 rotos |
| V-07 | Anclas de tabla de contenido | **912 anclas, 0 rotas** |
| V-08 | Rutas citadas entre acentos graves hacia `_legacy/` | **59 no resuelven** → hallazgo **H-01** |
| V-09 | Secciones obligatorias por tipo de artefacto (11 CU / 7 RN / 6 RC / 9 MC / 5 glosario) | 101/101 completas |
| V-10 | Tabla de contenido presente en todo documento con más de tres secciones de primer nivel | 101/101 |
| V-11 | Censo de «proyecto de código» en el cuerpo, vivo contra archivado | 265 ocurrencias, **0 sobre-sustituciones** (ver §4.3) |
| V-12 | Censo de «solución» / «soluciones» como palabra | 160; ninguna designa el agrupador de construcción en prosa de cuerpo |
| V-13 | Censo de «resolución» / «resoluciones», vivo contra archivado, archivo por archivo | 129 en los 100; **0 archivos con pérdida** |
| V-14 | Barrido negativo «reproducto» | 4 ocurrencias, **las 4 entrecomilladas como cita**; 0 de corrupción |
| V-15 | Barrido negativo de concordancia de género («producto técnica», «la producto», …) | 0 |
| V-16 | Barrido negativo de cabecera de tabla de anti-patrones pisada | 0 |
| V-17 | Resolución de identificadores citados (CU-XX, RN-XX, RC-XX, NB-XX) contra el disco | 0 sin resolver |
| V-18 | Simetría CU §9 ↔ RN §5 (reglas aplicables contra CU afectados) | 0 asimetrías reales |
| V-19 | Regla de inclusión del glosario: los 82 términos contra los 100 hermanos | Conforme; los 6 casos límite se verificaron a mano (§5.4) |
| V-20 | Regla de no duplicación: los 82 términos de §2 contra los 34 del glosario raíz | **0 solapamientos de nombre**; los 18 referenciados existen los 18 en `Vision-Producto.md` §9 |
| V-21 | Las 32 entradas del punto 6 heredado tienen destino en el artefacto nuevo | **32/32**, 0 contenido sin destino |
| V-22 | Conteos del índice y del README contra el disco (38 CU, 40 RN, 19 RC, 24 brechas, 22 actores no humanos) | Conforme salvo el recuento de historias de usuario → **H-02** |
| V-23 | Emojis | 0 |
| V-24 | Procedencia del framework en `PRODUCT-MANIFEST` §1.1 | Sigue declarando **4.1** y `Rules-Especificacion-Funcional` **2.0** |

### 0.2 Muestreo declarado en prosa y estructura fina

**Tamaño: 14 documentos de 101 (13,9 %).** Criterio: **selección deliberada de los casos de mayor riesgo**, no aleatoria. Los cuatro ejes de riesgo y los documentos que los concentran:

| Eje de riesgo | Documentos leídos íntegros o en sus secciones críticas |
| --- | --- |
| Artefacto nuevo, sin línea de base, con 82 definiciones que tenían que salir de fuentes existentes | `Glosario-Funcional.md` (completo) |
| Los tres documentos con diff de cuerpo grande, donde una regeneración disfrazada sería visible | `Especificacion-Funcional.md` (+66/−20), `Modelo-Datos/Modelo-Conceptual.md` (+76/−41), `README.md` (+49/−26) |
| La entidad `Proyecto` del dominio, que es el punto crítico de toda la migración | `CU-01-Alta-De-Proyecto`, `CU-02`, `CU-34-Variables-Compartidas-Del-Proyecto`, `RN-02-Pertenencia-Del-Servicio-A-Un-Unico-Proyecto`, `RC-01-Unicidad-Del-Identificador-Legible-Del-Proyecto` |
| La trampa de la cadena `soluci` y la corrección manual de la Fase B2 | `CU-21-Informe-De-Conflicto-Y-Resolucion` (24 ocurrencias de `resoluci`, la más expuesta), `RN-24`, `RC-11`, `CU-03` (único en 3.0, tocado por el fix B2), `RN-20` |

Los seis documentos que el enunciado del corte señala como portadores de corrección manual —`RN-08`, `RN-12`, `RN-13`, `RN-17`, `RN-24`, `RN-31` §5— se verificaron **los seis al 100 %** y no por muestreo, por ser el P0 número 4.

**Lo que el muestreo no cubre y se declara como límite:** la calidad intrínseca de la prosa de los 87 documentos no muestreados. Se cubre en cambio su **preservación**, que es lo que una migración tiene que garantizar: V-04 y V-05 los comparan a los 100 contra el archivado línea por línea, de modo que cualquier reescritura de prosa habría aparecido como diff de cuerpo.

---

## 1 · Resumen ejecutivo

La migración del corte 3 **preservó el contenido en lugar de regenerarlo**, y eso está verificado y no asumido: los 100 documentos con línea de base tienen su cuerpo idéntico al archivado salvo las sustituciones léxicas declaradas, ninguna fila histórica de control de cambios se reescribió en ninguno de los 100, y las 32 entradas del glosario heredado del punto 6 del modelo conceptual tienen todas destino en el artefacto nuevo. El punto crítico —el renombre de «proyecto» sobre un destino donde la palabra tiene tres referentes— se resolvió con **cero sobre-sustituciones sobre 265 ocurrencias de «proyecto de código»** y sin sub-sustituciones detectables.

**Hay un hallazgo P0.** No es de contenido: es de evidencia. **Cincuenta y nueve de los 101 documentos** citan, en la fila nueva de su control de cambios, la ruta donde quedó archivado su estado previo, y esa ruta **no existe en disco** bajo ninguna lectura relativa. Es el residuo del defecto que el propio plan §3.5 Paso 2.b levantó y corrigió a medias: el orquestador movió las 116 copias al `_legacy/` de cada carpeta y no actualizó las citas que los subagentes ya habían escrito apuntando al lugar viejo. El archivado existe y está en el lugar correcto, de modo que **el P0 número 5 de la migración no se cumple**; lo que falla es la cita que lo verifica, y `Master-Prompt` §10 tipifica «una evidencia que no resuelve» como P0.

Los seis P0 propios de una migración normativa se verificaron uno por uno y **ninguno de los seis se cumple**: no hay contenido inventado, ninguna sección exigida por la 4.0 quedó rellenada por inferencia, la procedencia del manifiesto **sigue declarando el conjunto 4.1**, las seis correcciones manuales de la Fase B2 están intactas palabra por palabra, el estado previo está archivado en el `_legacy/` de su propia carpeta en los 100 casos, y las 101 filas del plan quedan resueltas y declaradas en §6.2 de este informe.

| Nivel | Cantidad |
| --- | --- |
| **P0** | **1** |
| P1 | 0 |
| P2 | 4 |
| P3 | 2 |
| **Total** | **7** |

**Veredicto: RECHAZADO**, por el P0 de H-01. La corrección es acotada y mecánica —una cadena de ruta en 59 filas escritas en este mismo corte, que no son filas históricas y por lo tanto no las protege `SDD-Development-Guide` §VI.2— y no obliga a rehacer ningún contenido.

---

## 2 · Matriz D1-D9 por documento

D1 idioma · D2 encoding · D3 Título-Con-Guiones · D4 versionado con guion medio · D5 política de deprecación · D6 trazabilidad · D7 prohibición de vocabulario del dominio fuente · D8 conjunto cerrado · D9 evidencia verificable.

| Documento | D1 | D2 | D3 | D4 | D5 | D6 | D7 | D8 | D9 | Observación |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `Casos-De-Uso/CU-01` a `CU-13` (13) | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | **✗** | Cita de archivado que no resuelve (H-01) |
| `Casos-De-Uso/CU-14` a `CU-26` (13) | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | **✗** | Idem H-01 |
| `Casos-De-Uso/CU-27` a `CU-38` (12) | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | No citan ruta de archivado; nada que resolver mal |
| `Reglas-De-Negocio/RN-01` a `RN-14` (14) | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | — |
| `Reglas-De-Negocio/RN-15` a `RN-27` (13) | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | **✗** | Idem H-01 |
| `Reglas-De-Negocio/RN-28` a `RN-40` (13) | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | — |
| `Modelo-Datos/Modelo-Conceptual.md` | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | **✗** | Cita `../_legacy/2026-07-30/Modelo-Datos/`, directorio que existe y está **vacío** (H-01) |
| `reglas-conceptuales-de-modelo/RC-01` a `RC-19` (19) | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | **✗** | Idem H-01 |
| `Especificacion-Funcional.md` | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | **✗** | Recuento de 139 historias que no verifica (H-02). Cabecera en tabla (H-04) |
| `README.md` | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | **✗** | Propaga el recuento de 139 declarándolo verificado contra el disco (H-02). §5 sin la lista de RC (H-05) |
| `Glosario-Funcional.md` | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | **~** | Aritmética del conteo de «resolución» de §3.2 que no cierra por uno (H-06) |

**Notas de la matriz.**

- **D4.** Ningún archivo vivo lleva sufijo de versión (0/101) y los 100 archivados lo llevan con guion medio `-v<X.Y>`. Versiones: 98 en `2.0`, `CU-03` en `3.0` —traía `2.0` por el fix de la Fase B2— y `Glosario-Funcional.md` en `1.0` por emisión inicial. Los 101 en estado `Propuesto`.
- **D5.** Un solo archivo por nombre lógico en cada carpeta de trabajo; el estado previo en el `_legacy/` de su propia carpeta con su sufijo. Se verificó la correspondencia uno a uno: 38 CU ↔ 38 archivados, 40 RN ↔ 40, 19 RC ↔ 19, 1 modelo ↔ 1, 1 índice ↔ 1, 1 README ↔ 1.
- **D7.** El barrido de stacks y productos comerciales devuelve `github-actions-portal` (nombre de token de ejemplo en `Modelo-Conceptual` §1.12) y cinco menciones de `postgres` / `POSTGRES_*` como **valores concretos de criterios Given/When/Then** en `CU-17`, `CU-22`, `CU-35` y `RN-33`. Las seis son **preexistentes al corte**, están en el archivado, y son datos de ejemplo del parque del cliente —lo que §4.5 de la regla exige cuando prohíbe criterios sin valores concretos—, no vocabulario del dominio fuente. **No se computa como hallazgo**; se registra para que la ronda siguiente no lo levante.
- **D9.** La marca `✗` de D9 no significa ausencia de evidencia: los 101 documentos citan sus fuentes con archivo y sección. Significa que **una** de las citas no resuelve (H-01) o que un conteo derivado de ella no verifica (H-02, H-06).

---

## 3 · Matriz de estructura obligatoria

| Artefacto | Secciones que exige la 4.0 | Verificado | Resultado |
| --- | --- | --- | --- |
| 38 CU | §4.2, once secciones | 38/38 con `## 1.` a `## 11.` | **Conforme.** Además 18 de los 38 llevan la sección opcional `## 13. Interacción multiusuario y concurrencia`, admitida por §4.3 para `web-monolith`. Ninguna obligatoria desplazada |
| 40 RN | §4.2.1, siete secciones | 40/40 con `## 1.` a `## 7.` | **Conforme.** Los 40 enumeran CU afectados explícitos en §5 |
| 19 RC | §4.2.3, seis secciones | 19/19 con `## 1.` a `## 6.` | **Conforme** |
| `Modelo-Conceptual.md` | §4.2.2, nueve secciones | `## 0.` a `## 10.` | **Conforme.** El punto 6 pasó de «Glosario» a **«Referencia al glosario»**, que es exactamente lo que §4.2.2 punto 6 de la 4.0 pide, con §6.1 listando los términos separados en 14 acuñados y 18 referenciados. `## 0.` y `## 9.` son adicionales y no desplazan ninguna obligatoria |
| `Especificacion-Funcional.md` | §2.1: índice maestro con matriz NB→CU→RN→US | §1 a §11 + control de cambios | **Conforme en contenido.** La matriz de §6 tiene las 38 filas y las cuatro columnas. §11 se agregó al final sin renumerar, con el motivo declarado. **Cabecera en tabla y no en bloque** → H-04 |
| `README.md` | §3.4: listar CU, RN, modelo y RC vigentes con propósito y estado | §1 a §8 | **Parcial.** Los 38 CU y las 40 RN llevan su línea con propósito y estado; **las 19 RC no** → H-05 |
| `Glosario-Funcional.md` | §4.2.4, **cinco** secciones | §1 a §6 | **Conforme.** Cabecera de §4.1 con trazabilidad upstream al glosario del dominio de 00 (§1); tabla de términos **no vacía**, 82 filas (§2); **términos con más de un referente no omitida y no vacía**, 7 familias (§3); términos referenciados y no redefinidos, 18 + 2 equivalencias (§4); control de cambios (§6). §5, «Constancias del barrido», es adicional y no desplaza ninguna |

**Verificación del reparto declarado del glosario.** §2 declara «82 términos» con reparto `6 + 21 + 18 + 11 + 6 + 6 + 3 + 6 + 3 + 2`. Conteo por script sobre las diez subsecciones: **6, 21, 18, 11, 6, 6, 3, 6, 3, 2 = 82**. §4.1 declara 18 y tiene 18; §4.2 declara 2 y tiene 2. El reparto verifica exactamente.

---

## 4 · Coherencia cross-doc y verificación específica de la migración

### 4.1 Coherencia del índice y del catálogo

| Comprobación | Declarado | Medido en disco | Resultado |
| --- | --- | --- | --- |
| Casos de uso | 38 | 38 archivos en `Casos-De-Uso/` | ✓ |
| Reglas de negocio | 40 | 40 en `Reglas-De-Negocio/` | ✓ |
| Reglas conceptuales | 19 | 19 en `reglas-conceptuales-de-modelo/` | ✓ |
| Entidades conceptuales | 15 | 11 tablas de E-9 + 3 objetos de D-12 + 1 de §24.3 = 15; §1 tiene 16 subsecciones porque §1.6 declara explícitamente «no es una entidad persistida propia» — **preexistente y explicado, no es hallazgo** | ✓ |
| Filas de la matriz §6 | 38 | 38, una por CU, sin duplicados | ✓ |
| Cobertura NB→CU bidireccional | 8 NB, ningún CU huérfano | Los 38 CU declaran NB en §9; las 8 NB tienen al menos un CU | ✓ |
| Brechas de §9 | 24, una cerrada | `B-01` a `B-24` | ✓ |
| Actores no humanos distintos | 22, de los cuales 16 acuñados y 6 con traza | 22 nombres distintos extraídos de las tablas §2 de los 38 CU | ✓ |
| Actor humano primario renombrado | `Administrador del producto` en los 38 | 38/38 | ✓ |
| Actor de sistema renombrado | `Registro del producto` en 15 CU | 15/15 | ✓ |
| Residuo de `Administrador de la solución` / `Registro de la solución` | 0 en cuerpo | 2 menciones, las dos **metalingüísticas** (IDX §8 y glosario §3.1 declarando el renombre) | ✓ |
| Historias de usuario previstas | **139** | La matriz de §6 suma **142** y los §9 de los 38 CU enumeran **142** identificadores distintos | **✗ H-02** |
| Identificadores citados que no resuelven | 0 | 0 sobre CU-XX, RN-XX, RC-XX y NB-XX | ✓ |
| Enlaces relativos rotos | 0 | 0 | ✓ |
| Anclas de tabla de contenido rotas | 0 | 0 de 912 | ✓ |

### 4.2 Preservación: qué cambió realmente en los 100 cuerpos

Diff de cuerpo contra el archivado, excluyendo cabecera y control de cambios. **Las únicas cinco clases de cambio son:**

1. `«solución»` → `«producto»` donde designaba el nivel superior, con su concordancia de género. Verificado uno por uno; 37 de las 40 RN tienen **cero** cambios de cuerpo.
2. Renombre de los dos actores, `Administrador de la solución` → `Administrador del producto` y `Registro de la solución` → `Registro del producto`.
3. Ancla de la sección opcional §13 agregada a la tabla de contenido de los CU que la tenían y no la listaban —cumplimiento de §4.1, que exige anclas de primer y segundo nivel—.
4. Línea `**Vocabulario:**` con puntero al glosario nuevo, agregada a los 19 RC.
5. En `Modelo-Conceptual.md`, `Especificacion-Funcional.md` y `README.md`: la mudanza del glosario y la actualización de conteos, ambas declaradas en su fila nueva.

**No hay ninguna sexta clase.** Ningún propósito, actor, precondición, paso de flujo, flujo alternativo, excepción, postcondición, criterio de aceptación, enunciado de regla, invariante de integridad, brecha ni fila de trazabilidad cambió de contenido en ninguno de los 100.

### 4.3 El punto crítico: las dos direcciones del renombre de «proyecto»

**Sobre-sustitución: cero, verificada y no asumida.** «Proyecto de código» aparece **265 veces** en los 101 documentos vivos. La descomposición, hecha por script sobre cada archivo delimitando la sección de control de cambios:

| Ubicación | Ocurrencias | Naturaleza |
| --- | --- | --- |
| Campo de cabecera `**Proyecto de código:**` / fila `| Proyecto de código |` | 101 | Exigido por §4.1; su valor es `SelfHosted-Service`, leído del `PRODUCT-MANIFEST` §1 |
| Dentro de la fila nueva de control de cambios | 155 | El término se menciona para declarar que **no** se aplicó: «ninguna se promovió a "proyecto de código"» |
| Cuerpo, fuera de cabecera y control de cambios | **9** | Las nueve son **metalingüísticas**: hablan del vocabulario, no lo aplican |

Las nueve del cuerpo, una por una: `CU-01` línea 117 («`SelfHosted Service` es el producto; `SelfHosted.Service.Core` es el proyecto de código. Este caso de uso habla del primero»); `Especificacion-Funcional.md` líneas 45, 71, 296, 298 y 300 (el producto tiene un único proyecto de código; la verificación de §1.3; la desambiguación de «proyecto»; el cuidado de que `Nombre-Proyecto-Codigo` y `Nombre-Producto` difieren sólo por el guion; las identidades de código); `Glosario-Funcional.md` líneas 318, 329 y 346 (el referente R2 de «etiqueta»; la familia «proyecto» de §3.8; la fila «Capa» de §4.1). En el archivado había 7 ocurrencias de cuerpo equivalentes (`CU-01` 1, índice 4, modelo 2). **Ninguna de las 9 cae sobre la entidad del dominio ni sobre el emprendimiento**, que es el daño P0 que este corte tenía que evitar. Las 419 ocurrencias de «proyecto SelfHosted» y las 26 de «proyectos SelfHosted» están intactas; el modelo conceptual declara en su fila que censó 104 ocurrencias y sustituyó 1, la etiqueta de cabecera.

**Sub-sustitución: cero detectable.** Se buscaron las marcas de la unidad de compilación en forma desnuda —«proyecto» junto a `SelfHosted.Service`, `.csproj`, `.sln`, «Visual Studio», «compilación», «espacio de nombres», «ensamblado»— sobre los 101 cuerpos. Todas las referencias a la unidad de compilación ya están en forma calificada o se nombran con «capa», que es el término que `Vision-Producto.md` §9 declara para las cuatro divisiones internas. Las expresiones «módulo de proyectos», «agregado `Proyectos`» y «capa `Application`, módulo de proyectos» de las filas de componentes esperados designan la **entidad del dominio**, no una unidad de compilación: no son sub-sustituciones.

### 4.4 Los tres barridos negativos obligatorios del plan §3.5 Paso 4

| Barrido | Resultado | Detalle |
| --- | --- | --- |
| «reproducto» | **4 ocurrencias, 0 de corrupción** | Las cuatro están **entrecomilladas y citando el daño** que el procedimiento prohibido produce: `Glosario-Funcional.md` §3.2 (1), su fila de control de cambios (2) y la fila de control de cambios del `README.md` (1). Coincide exactamente con lo que el lote declaró. **Contarlas como hallazgo sería un defecto de este informe** |
| Cabecera de tabla de anti-patrones pisada | 0 | No hay tablas de anti-patrones en esta categoría |
| Concordancia de género | 0 | 0 ocurrencias de «la producto», «producto técnica» y variantes |

**Supervivencia de «resolución».** Verificada archivo por archivo, no en agregado. Los 100 documentos con línea de base tenían **83** ocurrencias de la palabra en el archivado y tienen **129** en el vivo, y **ningún archivo perdió ni una sola**. El aumento de 46 está íntegramente dentro de las filas nuevas de control de cambios, donde la palabra se menciona para declarar que quedó intacta. El dato que el enunciado del corte trae —121 en los 100 documentos al abrir el corte— **verifica**: reconstruyendo el estado del corpus en el momento en que se despachó el lote del glosario (los 98 hermanos ya migrados, índice y README todavía en su versión archivada) el conteo da exactamente `129 − 12 − 6 + 8 + 2 = 121`. Lo que no cierra es la aritmética con la que el glosario proyecta el cierre: ver H-06.

### 4.5 Gobierno del glosario, con los cuatro criterios de `Master-Prompt` §10

**Sin contradicciones.** Ningún término tiene dos definiciones incompatibles entre artefactos. Verificación mecánica de la regla de no duplicación de §3.3: se normalizaron los 82 términos de §2 y los 34 del glosario raíz de `Vision-Producto.md` §9 y se intersectaron. **Cero solapamientos de nombre.** Los 18 términos que §4.1 declara referenciados existen los 18 en el glosario raíz, y la tercera columna declara qué precisa esta categoría sin redefinirlo. El artefacto no duplica el glosario del dominio de 00, que es lo que §6 de la regla exige.

**Completitud.** Los 82 términos son los que cruzan artefactos. La regla de inclusión de §3.3 se verificó por muestreo dirigido a los seis casos límite, que es donde un término indebido se esconde: los seis con menos presencia literal en el corpus. `Carácter de secreto y su propagación` (declara CU-10, CU-34, CU-35, IDX, RC-16, RN-15, RN-23 → verificado en 7), `Servicio afectado` (CU-21, CU-24, CU-34, IDX, RN-13 → 5), `Línea de tiempo del despliegue` (CU-13, CU-15, CU-38, RC-18, RN-40 → 5), `Último valor resuelto` (CU-35, MC, RC-11 → 3), `Escape del signo peso` (RN-25, RN-26 → 2, ambos verificados en su §1 y §3) y `Clase de conflicto` (CU-20 «sus tres clases de conflicto», CU-21 «no corresponde a la clase de conflicto» → 2). **Ninguno vive en un solo artefacto.** El único candidato descartado por conteo, `Informe de verificación del origen` en `CU-03`, se verificó descartado con razón, y el segundo, `Brecha declarada de cobertura`, queda fuera por no ser vocabulario del dominio y estar sólo en filas históricas de `RN-02` y `RN-08`, lo que se comprobó.

**Polisemia gobernada.** Las siete familias de §3 declaran referentes, forma calificada obligatoria y **evidencia de colisión por artefacto**, que es lo que §4.2.4 punto 3 pide y lo que `Vocabulario-Rules` §9.4 exige antes de declarar una invariante. Se verificaron las evidencias de colisión de las tres familias más cargadas: «registro» R1 contra R5 en un mismo CU (tabla de actores de §2 y postcondición de §7 — verificado en `CU-01`, `CU-02`, `CU-20`); «ámbito» R2 contra R3 dentro de `RN-21`, cuyo título es «Validez del ámbito de una referencia» y cuya sección 3 se titula «Ámbito de aplicación» — verificado; «resolución» R1 contra R2 en `CU-24` — verificado. La escalera de costo de §9.3 se usó en su escalón más barato, la entrada de glosario, con la excepción histórica declarada.

**Criterio negativo: polisemias evaluadas y descartadas.** Se enumeran para que la ronda siguiente no las vuelva a levantar. **Ninguna se reporta como hallazgo.**

| # | Polisemia evaluada | Por qué no es hallazgo |
| --- | --- | --- |
| 1 | **La familia «proyecto» con sus tres referentes** —entidad del dominio, unidad de compilación, emprendimiento— | Contextos disjuntos, declarados en el `PRODUCT-INTAKE` §12 y transcriptos en `Vision-Producto.md` §9. `Vocabulario-Rules` §9.1 y el criterio negativo de §10 lo excluyen expresamente. El glosario §3.8 lo declara y **no reabre** la decisión, que es lo correcto |
| 2 | **«registro» con el sentido corriente de anotación** | Cuatro ocurrencias en `Modelo-Conceptual.md` («Registro, no clase distinta de variable», «Registro de dependencia», «Registro del disparador», «Registro de una operación»). Verbo sustantivado del castellano; no es ninguno de los cinco referentes |
| 3 | **Las cinco formas calificadas de «registro» entre sí** | `registro del sistema`, `registro de auditoría`, `registro del contenedor`, `registro de imágenes` e `imagen de registro` no colisionan: el modificador las distingue. Calificarlas más sería el falso positivo de §9.1 |
| 4 | **`higiene del registro`, nombre de `CU-36`** | Forma calificada que combina dos familias y se resuelve sola; el glosario §3.4 la declara y no la corrige |
| 5 | **«migración» en las filas de control de cambios** | Las filas nuevas usan la forma calificada «migración normativa» que `Vocabulario-Rules` §4 R6 exige; las históricas no se reescriben por §VI.2. El referente viejo sigue vivo y eso no es defecto |
| 6 | **«solución» dentro de «resolución»** | 44 menciones de la cadena `resoluci` entre acentos graves y 129 de la palabra: ninguna es el término renombrado |
| 7 | **«resolución» como sección de RN y como término del dominio** | El punto 4 de las RN se titula «Consecuencia si se viola», no «Resolución»; no hay colisión de título |
| 8 | **`Ámbito de aplicación`, título obligatorio del punto 3 de toda RN** | Es estructura de la regla de la categoría, no vocabulario del dominio; el glosario §3.3 R3 lo declara y conserva su forma |
| 9 | **«procedencia» del framework contra «procedencia del servicio»** | El glosario §3.6 R3 lo declara como forma del artefacto y no del dominio; su contexto es la sección de control de cambios |
| 10 | **«etiqueta de cabecera» contra «etiqueta de la imagen»** | Referente nacido con esta migración, declarado en §3.7, con su colisión verificada en `CU-15`, `CU-37` y `CU-38` |
| 11 | **«conjunto de servicios» y «conjunto de cambios pendientes»** | El glosario §4.2 las declara como **equivalencias de forma** de «proyecto SelfHosted» y «changeset», no como referentes nuevos. Es el escalón más barato de §9.3 y es la resolución correcta del H-01 del corte 2 |
| 12 | **`RN-38` §5 nombra `CU-24` para declarar que NO lo alcanza** | Una extracción mecánica lo lee como asimetría CU↔RN. Leída la prosa, es una exclusión deliberada y explicada, preexistente al corte. **No es hallazgo** |
| 13 | **`Modelo-Conceptual.md` §1 con 16 subsecciones contra 15 entidades declaradas** | §1.6 declara textualmente «no es una entidad persistida propia: es una proyección derivada del servicio». Preexistente y explicado |

---

## 5 · Hallazgos

### H-01 · P0 · Cincuenta y nueve de los 101 documentos citan una ruta de archivado que no existe en disco

**Archivos.** `Casos-De-Uso/CU-01` a `CU-26` (26); `Reglas-De-Negocio/RN-15` a `RN-27` (13); `reglas-conceptuales-de-modelo/RC-01` a `RC-19` (19); `Modelo-Datos/Modelo-Conceptual.md` (1).
**Sección.** La fila nueva `2.0 | 2026-07-30` de la tabla de control de cambios de cada uno.

**Evidencia.** Las cuatro formas de la cita, con su ruta literal y su resolución:

| Grupo | Cita literal | Resolución desde la carpeta del documento | Resolución desde la raíz de la categoría | Ubicación real del archivado |
| --- | --- | --- | --- | --- |
| 26 CU | `` `_legacy/2026-07-30/Casos-De-Uso/CU-01-Alta-De-Proyecto-v1.0.md` `` | `Casos-De-Uso/_legacy/2026-07-30/Casos-De-Uso/…` → **no existe** | `_legacy/2026-07-30/Casos-De-Uso/…` → **no existe** | `Casos-De-Uso/_legacy/2026-07-30/CU-01-Alta-De-Proyecto-v1.0.md` |
| 13 RN | `` `_legacy/2026-07-30/Reglas-De-Negocio/` `` | `Reglas-De-Negocio/_legacy/2026-07-30/Reglas-De-Negocio/` → **no existe** | `_legacy/2026-07-30/Reglas-De-Negocio/` → **no existe** | `Reglas-De-Negocio/_legacy/2026-07-30/` |
| 19 RC | `` `../../_legacy/2026-07-30/Modelo-Datos/reglas-conceptuales-de-modelo/` `` | `02-Especificacion-Funcional/_legacy/2026-07-30/Modelo-Datos/reglas-conceptuales-de-modelo/` → **no existe** | idem | `Modelo-Datos/reglas-conceptuales-de-modelo/_legacy/2026-07-30/` |
| `Modelo-Conceptual.md` | `` `../_legacy/2026-07-30/Modelo-Datos/` `` | `02-Especificacion-Funcional/_legacy/2026-07-30/Modelo-Datos/` → **existe y está vacío** | idem | `Modelo-Datos/_legacy/2026-07-30/Modelo-Conceptual-v1.1.md` |

Texto exacto de una de ellas, `RN-20-Arranque-Parcial-Como-Estado-Declarado.md` §7: «fuente de contenido: el **documento de origen**, archivado sin modificación en `_legacy/2026-07-30/Reglas-De-Negocio/`». Es una afirmación sobre el estado del sistema con una cita que no resuelve. Las 42 restantes de la categoría no tienen el defecto: los 12 CU de `CU-27` a `CU-38` no citan ruta, `RN-01` a `RN-14` y `RN-28` a `RN-40` citan `` `_legacy/2026-07-30/` `` sin el segmento de más —que sí resuelve—, y las cuatro citas de los tres documentos de raíz resuelven.

**Causa.** Es el residuo del segundo defecto que el propio plan §3.5 Paso 2.b levantó y declaró corregido: «el orquestador había archivado espejando el subárbol bajo un único `_legacy/` en la raíz de la categoría… Corregido: las 116 copias quedaron consolidadas en el `_legacy/2026-07-30/` de su propia carpeta». La corrección movió los archivos y **no alcanzó a las citas que los subagentes ya habían escrito** apuntando al lugar viejo. La prueba material queda en disco: `_legacy/2026-07-30/Modelo-Datos/` es un **directorio vacío** sobreviviente de la estructura anterior.

**Por qué es P0 y no P1.** `Master-Prompt` §10 tipifica: «una afirmación sin evidencia es P1; **una evidencia que no resuelve es P0**». El informe del corte 2, `M4-01-Necesidades-Negocio-r1.md` §H-03, fijó la lectura operativa de esa frase para esta misma cadena de auditoría: «El P0 de D9 es "una evidencia que no resuelve", es decir **una cita que apunta a algo inexistente**. Acá la evidencia resuelve —el archivado existe y es la fuente correcta— y lo que falla es el conteo derivado de ella». Este caso cae del otro lado de esa misma distinción: la cita apunta a algo inexistente. Además es sistemático —58,4 % de la categoría— y degrada precisamente el criterio que sostiene la reversibilidad de la migración (`Migracion-Rules` §4.2 regla 1): quien quiera verificar que el estado previo se archivó antes de sobrescribir no llega al archivo siguiendo la cita del documento.

**Lo que este hallazgo NO es.** No es el P0 número 5 de `Master-Prompt-Migracion` §10. El estado previo **sí está archivado**, en el `_legacy/` de su propia carpeta, en los 100 casos, y se verificó la correspondencia uno a uno. Lo que falla es la ruta escrita, no el archivado.

**Recomendación.** Corregir la cadena de ruta en las 59 filas. Son filas emitidas en este mismo corte, todavía no cerrado: **no son filas históricas** y corregirlas no viola `SDD-Development-Guide` §VI.2, que protege lo ya publicado en versiones anteriores. Formas correctas: `` `_legacy/2026-07-30/<Nombre-Archivo>-v<X.Y>.md` `` para CU y RN, `` `_legacy/2026-07-30/` `` para RC y `` `_legacy/2026-07-30/Modelo-Conceptual-v1.1.md` `` para el modelo. Eliminar además el directorio vacío `_legacy/2026-07-30/Modelo-Datos/`. Con eso el corte queda listo para re-audit sin tocar una línea de contenido.

---

### H-02 · P2 · El recuento de 139 historias de usuario no verifica contra la propia matriz que lo sostiene, y el `README.md` lo propagó declarándolo verificado contra el disco

**Archivos.** `Especificacion-Funcional.md` §6 y §7; `README.md` §7 y su fila de control de cambios.

**Evidencia.** `Especificacion-Funcional.md` §6: «Son **139** historias previstas sobre **38** casos de uso»; §7: «El recuento de historias pasa de 118 a **139** con las veintiuna que esta versión agrega». Suma real de la matriz de §6, expandiendo los ocho rangos `US-CU-XX-1 a US-CU-XX-n` y contando los identificadores enumerados en las otras treinta filas: **142**. Suma independiente de los §9 de los 38 casos de uso: **142** identificadores distintos, sin ninguno duplicado y sin ningún CU con cero. La diferencia es de tres.

El `README.md` §7 dice «Las **139** historias de usuario previstas de la matriz de §6 del índice maestro», y su fila de control de cambios lo enumera bajo el rótulo «**Conteos actualizados contra el disco**, que habían quedado atrás del fix de la Fase B2: … las historias de usuario previstas de 118 a **139**». El valor 139 no salió del disco: salió del índice, que ya lo traía. El origen del 139 es la versión 1.1 del índice, emitida por el fix de la Fase B2 el 2026-07-29 —la línea es idéntica en `_legacy/2026-07-30/Especificacion-Funcional-v1.1.md`—, cuya matriz ya sumaba 142.

**Por qué es P2 y no P0 por D9.** La evidencia resuelve: la matriz existe, es la fuente y está completa. Lo que falla es el número derivado de ella. Es la misma tipificación que `M4-01-Necesidades-Negocio-r1.md` dio a su H-03. **Por qué no es P1**: el índice preservó el valor que el origen traía, que es lo que `Migracion-Rules` §4.2 pide; el defecto es preexistente. Lo que esta migración agregó es propagarlo al `README.md` bajo una etiqueta de verificación que no se cumplió.

**Recomendación.** Fijar el recuento en 142 en los cuatro lugares, o declarar por qué tres de los 142 identificadores no cuentan. Corregir además el rótulo del `README.md`: el conteo de historias no se verificó contra el disco.

---

### H-03 · P2 · La columna «fuente de contenido» del plan declara «documento de origen» para 100 de las 101 filas, y al menos cuatro documentos usaron además un documento hermano

**Archivo.** `Audit/Plan-Migracion-4.1-a-6.0.md` §4, las 101 filas de `02-Especificacion-Funcional`.

**Evidencia.** De las 101 filas, **100 declaran «documento de origen»** y una sola, la de `Glosario-Funcional.md`, declara «documento hermano … + pendiente humano». Los propios documentos migrados declaran otra cosa en su fila de control de cambios:

| Documento | Lo que el plan declara | Lo que el documento declara y se verificó |
| --- | --- | --- |
| `Modelo-Datos/Modelo-Conceptual.md` | documento de origen | «fuente de contenido: **documento de origen, más el upstream de 00** para la verificación de no duplicación del glosario y el intake §12 para la convención de vocabulario». Su §6.1 nuevo separa 14 términos acuñados de 18 referenciados, separación que sólo se puede hacer leyendo `Vision-Producto.md` §9 |
| `Especificacion-Funcional.md` | documento de origen | Conteos reverificados contra el disco —los 38, 40 y 19 archivos hermanos—, §11 nuevo que remite al glosario, y la tabla de actores de §8 alineada contra las tablas §2 de los 38 CU |
| `README.md` | documento de origen | §6 nuevo con el conteo de secciones del glosario hermano, y conteos tomados del disco |
| Los 19 RC | documento de origen | Línea `**Vocabulario:**` nueva con puntero a `Glosario-Funcional.md` y a `Vision-Producto.md` §9, ninguno de los dos el documento de origen |

Ninguno de estos contenidos es invención: los cuatro valores usados —origen, hermano, upstream del mismo destino, y el intake— caben en los tres valores admitidos de `Migracion-Rules` §2.1 leyendo el upstream de 00 y el intake como documentos del mismo destino. El defecto es de **declaración del plan**, no de contenido.

**Repetición.** Es el tercer corte consecutivo con el mismo hallazgo: H-03 del corte 1 y H-02 del corte 2. El plan no incorporó la corrección.

**Recomendación.** Corregir el valor de la columna en las cuatro filas antes de cerrar M6, y declarar en el informe de M6 el patrón, que ya lleva tres cortes.

---

### H-04 · P2 · La cabecera del índice maestro sigue en formato tabla y no en bloque de metadatos, y la migración no cerró el hallazgo que la señala

**Archivo.** `Especificacion-Funcional.md`, cabecera (líneas 3 a 18).

**Evidencia.** Es el único de los 101 documentos cuya cabecera es una tabla `| Campo | Valor |` en lugar del bloque `**Campo:** valor` que §4.1 de la 4.0 declara. Los otros 100 llevan el bloque. Todos los campos obligatorios están presentes y correctos —`Proyecto de código`, `Producto`, `Documento`, `Versión`, `Estado`, `Fecha`, `Autor`—, más siete adicionales. Lo que difiere es la forma, y la forma es lo que sostiene la extracción automática que el resto de la cadena hace de la cabecera.

**Repetición.** Es exactamente el **H-07 de `B-02-03-r1.md`**, emitido el 2026-07-29 y clasificado P2 entonces. La migración era la ocasión de cerrarlo, porque `Migracion-Rules` §3 declara que la normativa vigente es la especificación del estado al que hay que llegar y este documento se clasificó «regenerar contenido». El corte lo dejó como estaba y su fila de control de cambios no declara la desviación.

**Por qué es P2 y no P1.** No falta ningún campo obligatorio y la trazabilidad no se rompe. Se conserva el nivel con el que la ronda anterior lo tipificó, para no cambiar la severidad de un hallazgo abierto sin motivo nuevo.

**Recomendación.** Convertir a bloque de metadatos y mover los siete campos adicionales a una tabla posterior a la cabecera. Si se decide no hacerlo, declarar la desviación en el documento con su motivo, para que la ronda siguiente no la vuelva a levantar.

---

### H-05 · P2 · El `README.md` sigue sin listar las 19 reglas conceptuales con propósito y estado, como exige §3.4

**Archivo.** `README.md` §5.

**Evidencia.** §3.4 de la regla: «Debe listar CU, RN, modelo y RC vigentes con propósito en una línea y estado actual». El README lista los 38 CU (§3) y las 40 RN (§4) con propósito y estado, y para las reglas conceptuales dice sólo: «Las **19** reglas conceptuales están en [reglas-conceptuales-de-modelo/](…), todas en estado `Propuesto`, versión **2.0**». No hay una línea por RC ni su propósito. El corte actualizó el conteo de 18 a 19 y no agregó la lista.

**Repetición.** Es el **H-08 de `B-02-03-r1.md`**, también P2, también abierto.

**Recomendación.** Agregar la tabla de 19 filas con el mismo formato que las de CU y RN. El propósito de cada RC está en su §1 y no hay que redactarlo.

---

### H-06 · P3 · La aritmética con la que el glosario proyecta el conteo de «resolución» al cierre no cierra por uno

**Archivo.** `Glosario-Funcional.md` §3.2, y la misma cifra repetida en su fila de control de cambios.

**Evidencia.** §3.2: «En esta categoría había **121** ocurrencias de "resolución" sobre los cien archivos al abrir este lote, y las 121 se verificaron intactas al cerrarlo; el conteo sobre los mismos cien archivos pasa a **128** por las **siete** menciones nuevas que el índice maestro y el `README.md` agregan al declarar la sustitución, y a **151** contando este glosario». Medición: el conteo de la palabra sobre los 100 archivos vivos es **129**, y con el glosario **152**. El aporte del índice maestro es de 8 a 12, `+4`, y el del `README.md` de 2 a 6, `+4`: **ocho menciones nuevas, no siete**. El 121 de partida verifica exactamente; lo que no verifica es la proyección.

**Por qué es P3 y no P2.** La afirmación que importa —«las 121 se verificaron intactas»— es cierta y se comprobó archivo por archivo: ningún documento perdió una sola ocurrencia. El error está en una cifra derivada y accesoria, que no sostiene ninguna decisión.

**Recomendación.** 128 → 129, «siete» → «ocho», 151 → 152.

---

### H-07 · P3 · El registro de avance del plan quedó atrás en tres puntos

**Archivo.** `Audit/Plan-Migracion-4.1-a-6.0.md` §8 y §3.5 Paso 2.b; y el árbol de la categoría.

**Evidencia.** Tres cosas menores, agrupadas porque comparten causa —el registro del avance no se actualiza al cerrar cada corte—:

1. **§8** sigue diciendo: «Al emitirse este plan, las 143 filas … están **sin resolver**», después de haber cerrado tres cortes y 121 documentos. Es la repetición del H-04 del corte 2.
2. **§3.5 Paso 2.b** dice «El campo se agregó a los **73** documentos de 02 que no lo tenían». Medición sobre el archivado: **los 100** documentos de la categoría carecían del campo `Proyecto de código` —99 con `**Proyecto:**` y 1 con la fila `| Proyecto |`—, de modo que descontando los 25 de los dos lotes que lo habían agregado por su cuenta el número es **75**. El resultado en disco es correcto: 101 de 101 llevan hoy los dos campos.
3. Queda en el árbol el **directorio vacío** `_legacy/2026-07-30/Modelo-Datos/`, residuo de la estructura de archivado anterior a la consolidación del Paso 2.b.

**Por qué no es el P0 número 6.** Ese P0 es «una fila del plan **sin resolver y sin declarar**». Las 101 filas de este corte están resueltas —los 101 documentos existen, con su archivado y su fila nueva— y quedan declaradas una por una en §6.2 de este informe. La conjunción del P0 no se cumple: es un defecto de registro del avance, no un estado no declarado.

**Recomendación.** Actualizar §8 con el estado por corte, corregir el 73 y borrar el directorio vacío.

---

## 6 · Verificación de la migración

### 6.1 Los seis P0 de `Master-Prompt-Migracion` §10, uno por uno

| # | Hallazgo P0 | Cómo se verificó | Resultado |
| --- | --- | --- | --- |
| 1 | Contenido que no proviene del origen, de un hermano, del upstream o del humano | Diff de cuerpo de los 100 contra su archivado, excluyendo cabecera y control de cambios: las cinco clases de cambio de §4.2 y ninguna sexta. Para el artefacto nuevo: las 32 entradas del punto 6 heredado tienen destino verificado (14 a §2, 18 a §4.1), los 82 términos se verificaron presentes en más de un hermano, los 18 referenciados existen los 18 en `Vision-Producto.md` §9, y §5.2 declara que ninguna definición se redactó de cero | **No se cumple** |
| 2 | Sección exigida rellenada con contenido inferido en lugar de emitida como pendiente | Las cinco secciones de §4.2.4 están completas y con fuente. La de términos con más de un referente **no se omitió y no está vacía**: siete familias con evidencia de colisión verificada. §5.2 emite el pendiente en forma explícita —«Ninguno»— y §5.1 declara los candidatos descartados con su conteo, en lugar de inflar la tabla | **No se cumple** |
| 3 | Procedencia reescrita con migración parcial | `PRODUCT-MANIFEST-SelfHosted-Service.md` §1.1 sigue declarando el conjunto **4.1** y `Rules-Especificacion-Funcional` en **2.0**. Nada de la cadena se adelantó | **No se cumple** |
| 4 | Corrección manual pisada sin declarar la interpretación | Los seis §5 señalados —`RN-08`, `RN-12`, `RN-13`, `RN-17`, `RN-24`, `RN-31`— se compararon literal contra su archivado: **las seis listas de CU afectados son idénticas**, incluidas las 27 entradas de `RN-17`. Además `RN-38` §5 conserva íntegro el párrafo que explica por qué `CU-24` no está en su lista, y `CU-03` conserva su versión 3.0 en lugar de reiniciar la numeración | **No se cumple** |
| 5 | Estado previo no archivado en el `_legacy/` de su propia carpeta | 100 archivados en las cuatro carpetas correctas, con correspondencia uno a uno verificada por script y sufijo de versión. Las tandas del 2026-07-29 se conservan aparte | **No se cumple** |
| 6 | Fila del plan sin resolver y sin declarar | Las 101 filas de la categoría están resueltas y quedan declaradas en §6.2 | **No se cumple** |

Los seis P0 propios de la migración están limpios. El P0 de este informe (H-01) es de la matriz general de `Master-Prompt` §10, no de esta lista.

### 6.2 Estado de las 101 filas del plan

| Grupo de filas | Cantidad | Clasificación del plan | Estado efectivo | Fuente de contenido efectiva |
| --- | --- | --- | --- | --- |
| `Casos-De-Uso/CU-01` a `CU-38` | 38 | Regenerar contenido | **Resueltas.** 38 archivos en 2.0, salvo `CU-03` en 3.0; 38 archivados | Documento de origen |
| `Reglas-De-Negocio/RN-01` a `RN-40` | 40 | Regenerar contenido | **Resueltas.** 40 archivos en 2.0; 40 archivados | Documento de origen |
| `Modelo-Datos/Modelo-Conceptual.md` | 1 | Regenerar contenido | **Resuelta.** 2.0; archivado | Origen **+ hermano y upstream de 00 y del intake** (H-03) |
| `reglas-conceptuales-de-modelo/RC-01` a `RC-19` | 19 | Regenerar contenido | **Resueltas.** 19 archivos en 2.0; 19 archivados | Origen **+ hermano** para el puntero de vocabulario (H-03) |
| `Especificacion-Funcional.md` | 1 | Regenerar contenido | **Resuelta.** 2.0; archivado | Origen **+ hermanos** para los conteos y la tabla de actores (H-03) |
| `README.md` | 1 | Regenerar contenido | **Resuelta.** 2.0; archivado | Origen **+ hermanos** (H-03) |
| `Glosario-Funcional.md` | 1 | Regenerar contenido · emisión inicial | **Resuelta.** 1.0, artefacto nuevo | Hermano (punto 6 heredado + los 98 hermanos) + upstream. El valor «pendiente humano» que el plan declara **no se usó**, y §5.2 lo dice |
| **Total** | **101** | — | **101 resueltas, 0 pendientes** | — |

### 6.3 Contenido del origen sin destino en la normativa vigente

**Ninguno.** El único bloque que la 4.0 desubica es el punto 6 de `Modelo-Conceptual.md`, que deja de ser el glosario de la categoría. Sus 32 entradas se verificaron con destino: 14 a la tabla de §2 del artefacto nuevo y 18 a la lista de referenciados de §4.1, sin residuo. El documento conserva además el criterio de inclusión que ya aplicaba y la entrada polisémica de «registro», que pasó de cuatro a cinco referentes por el renombre del actor.

### 6.4 Los catorce criterios de `Migracion-Rules` §6

Conformes doce de catorce. **No conforme**: el criterio 1 —fuente de contenido declarada en el plan con uno de los tres valores— por H-03, en cuatro filas. **Fuera del alcance de este corte**: los criterios 8 y 9, sobre el intake y el manifiesto, que se auditaron en M2 y M3. El criterio 14 —ninguna sustitución por reemplazo global de cadena— es el más verificado de todos: las cuatro «reproducto» son citas, las 129 «resolución» están intactas archivo por archivo, y las 265 «proyecto de código» se descompusieron ocurrencia por ocurrencia.

---

## 7 · Veredicto

# RECHAZADO

Un hallazgo **P0**, cero P1, cuatro P2 y dos P3.

El corte 3 hizo bien lo difícil. Con 101 documentos y 875 ocurrencias en juego, la doble dirección del renombre de «proyecto» se resolvió sin una sola promoción sobre la entidad del dominio y sin una sola forma desnuda de la unidad de compilación; las 129 ocurrencias de «resolución» sobrevivieron archivo por archivo; ninguna de las 100 tablas de control de cambios perdió ni alteró una fila histórica; las seis correcciones manuales de la Fase B2 están intactas; y el artefacto nuevo, que era el riesgo más alto del corte por no tener línea de base, sale de fuentes verificables: sus 82 términos verifican la regla de inclusión, no duplica ni un solo término del glosario raíz, y las 32 entradas del glosario heredado tienen las 32 su destino.

Lo que detiene la cadena es de otra naturaleza y no obliga a rehacer contenido. Cincuenta y nueve documentos afirman dónde quedó archivado su estado previo con una ruta que no existe en disco: el residuo de la consolidación del archivado que el plan §3.5 Paso 2.b ordenó y ejecutó sobre los archivos sin alcanzar a las citas. `Master-Prompt` §10 tipifica una evidencia que no resuelve como P0, y la ronda anterior de esta misma cadena fijó esa lectura al distinguirla expresamente del caso del conteo impreciso. El archivado está donde tiene que estar; la cita que lo verifica, no.

### Condiciones para promover

**Bloqueante, para levantar el P0:**

1. Corregir la cadena de ruta del archivado en las 59 filas de control de cambios de H-01, y borrar el directorio vacío `_legacy/2026-07-30/Modelo-Datos/`. Son filas emitidas en este corte y no filas históricas: corregirlas no viola `SDD-Development-Guide` §VI.2. Ningún contenido se toca.

**No bloqueantes, a resolver antes de cerrar M6:**

2. Fijar el recuento de historias de usuario en 142 en `Especificacion-Funcional.md` §6 y §7 y en `README.md` §7, o declarar la resta; y corregir el rótulo del `README.md`, que declara verificado contra el disco un conteo que no lo fue (H-02).
3. Corregir la columna «fuente de contenido» del plan en las cuatro filas de H-03. Es el tercer corte con el mismo hallazgo: el informe de M6 debería declarar el patrón.
4. Cerrar o declarar los dos hallazgos que la migración heredó abiertos de `B-02-03-r1.md`: la cabecera en tabla del índice (H-04, era su H-07) y la lista de las 19 RC en el README (H-05, era su H-08).
5. Corregir la aritmética de `Glosario-Funcional.md` §3.2 (H-06) y el registro de avance del plan (H-07).

**Para el corte 4 (`03-UX-UI-DX`), que tiene `Wireframes/` y `Representaciones/` como subcarpetas:** el despacho de cada subagente debe entregarle la ruta de archivado **efectiva y ya consolidada**, no la que el orquestador planea usar. H-01 es el resultado de que las dos no coincidieran, y el corte 4 repite exactamente la condición que lo produjo.

**Para M5:** la procedencia no puede cerrarse mientras la cadena esté incompleta. Al 2026-07-30 el `PRODUCT-MANIFEST` §1.1 declara correctamente el conjunto 4.1, y así debe seguir hasta que el corte 4 quede aprobado.

---

## Control de cambios

| Versión | Fecha | Cambios | Autor |
| --- | --- | --- | --- |
| 1.0 | 2026-07-30 | Auditoría independiente de la ronda 1 del **corte 3** de la fase M4 de la migración normativa 4.1 → 6.0, sobre los **101** entregables de `02-Especificacion-Funcional` —38 CU, 40 RN, el modelo conceptual, 19 RC, el índice maestro, el README y el `Glosario-Funcional.md` nuevo—, contra `Rules-Especificacion-Funcional` 4.0 §6, `Vocabulario-Rules` 2.1 §9 y §10, los catorce criterios de `Migracion-Rules` 1.0 §6, la matriz de `Master-Prompt` §10 y los seis hallazgos P0 de `Master-Prompt-Migracion` §10. Línea de base: los 100 archivados de `_legacy/2026-07-30/` de cada carpeta. Método declarado: **veinticuatro verificaciones de cobertura total con script** más **muestreo dirigido de 14 documentos sobre 101**, elegidos por riesgo y no al azar. **Un hallazgo P0**: 59 de los 101 documentos citan una ruta de archivado que no existe en disco, residuo de la consolidación del plan §3.5 Paso 2.b. Cuatro P2 —el recuento de 139 historias contra 142 reales, la columna de fuente de contenido del plan por tercer corte consecutivo, y los dos hallazgos de `B-02-03-r1.md` que la migración dejó abiertos— y dos P3. Se verifican los **seis P0 de migración limpios**, incluidas las seis correcciones manuales de la Fase B2 intactas y la procedencia todavía en 4.1. Se verifica la doble dirección del renombre de «proyecto» sobre 265 ocurrencias de «proyecto de código», con **cero sobre-sustituciones** y cero sub-sustituciones, y las 129 ocurrencias de «resolución» sin pérdida en ningún archivo. Se enumeran **trece polisemias evaluadas y descartadas**, entre ellas las cuatro «reproducto» entrecomilladas, para que la ronda siguiente no las vuelva a levantar. Veredicto: **RECHAZADO**, con una condición bloqueante acotada a una cadena de ruta y sin impacto sobre el contenido. | Auditor independiente (Arquitecto de Soluciones + QA Senior) |
