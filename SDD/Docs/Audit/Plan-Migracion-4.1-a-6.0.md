# Plan de migración normativa · 4.1 → 6.0

**Archivo:** `Plan-Migracion-4.1-a-6.0.md`
**Producto:** SelfHosted Service
**Repositorio destino:** `DEV/SelfHosted.Service.Core`
**Repositorio fuente:** `IA/IA.SDD`
**Versión de origen:** conjunto SDD **4.1**, declarada en el bloque de procedencia de `SOLUTION-MANIFEST-SelfHosted-Service.md` §1.1
**Versión vigente:** conjunto SDD **6.0** (`CHANGELOG.md`, entrada `[6.0] - 2026-07-29`)
**Conjunto de origen reconstruible:** **sí**, disponible en `IA/IA.SDD/_legacy/4.1/`
**Emitido por:** fase M1 del orquestador de migración normativa (`Master-Prompt-Migracion.md` §5)
**Versión:** 1.3
**Fecha:** 2026-07-30
**Estado:** **Ejecutado y cerrado.** Aprobado por el agente humano del proyecto el 2026-07-30 en la detención obligatoria de M1, con las cuatro decisiones de §7.1; ejecutado en las fases M2 a M5 y auditado en M6. Sus 144 filas quedaron resueltas: ver §8

---

## 1 · Contexto de la corrida

El destino no venía de una corrida previa de reconciliación normativa: no existía `Reconciliacion-*.md` ni `Plan-Migracion-*.md` en `SDD/Docs/Audit/`, de modo que este plan lo emite M1 aplicando el diff normativo de `Master-Prompt.md` §2.1 pasos 1 a 5, según `Master-Prompt-Migracion.md` §5.

**El destino está en medio de una corrida de generación.** `SDD/Estado/Informe-Avance.md` 2.9 declara las fases A y B cerradas y aprobadas, y la **Fase B2 en ejecución** con la especificación corregida y la maqueta pendiente de rehacer. Las categorías 04 a 11 no están generadas. Esto no impide migrar —la migración opera sobre lo que existe—, pero fija el alcance: se migra 00, 01, 02 y 03, más los dos documentos de entrada.

**Trabajo sin confirmar en disco.** El repositorio destino tiene 25 archivos modificados y 4 sin seguimiento respecto de `HEAD`, correspondientes al fix de definiciones de servicio de la Fase B2. El archivado previo de M2 y M4 preserva lo que está en disco, que es este estado, no el de `HEAD`. Se declara para que la elección sea consciente.

---

## 2 · Tabla de saltos por archivo de reglas

La severidad se lee de la propia numeración, según `Migracion-Rules.md` §4.3. La columna de documentos en el destino indica si el salto alcanza a algo ya emitido.

| Archivo del framework | Origen (4.1) | Vigente (6.0) | Severidad | Documentos en el destino |
| --- | --- | --- | --- | --- |
| `Master-Prompt` | 4.1 | 5.2 | **major** | No gobierna documentos; gobierna la corrida |
| `Intake-Rules` | 2.1 | 3.2 | **major** | 2 (intake y manifiesto) |
| `Rules-Contexto` | 2.1 | 3.1 | **major** | 6 |
| `Rules-Necesidades-Negocio` | 2.0 | 3.1 | **major** | 10 |
| `Rules-Especificacion-Funcional` | 2.0 | 4.0 | **major** | 100 emitidos + 1 ausente |
| `Rules-UX-UI-DX` | 2.0 | 4.0 | **major** | 25 |
| `Rules-Prompts-AI` | no aplicada | 3.1 | — | 0 · categoría 04 excluida por gating (`usa_llm` == false) |
| `Rules-Arquitectura-Tecnica` | 2.0 | 3.1 | **major** | 0 · categoría no generada |
| `Rules-Backlog-Tecnico` | 2.0 | 3.1 | **major** | 0 · categoría no generada |
| `Rules-Plan-Sprint` | 2.1 | 3.1 | **major** | 0 · categoría no generada |
| `Rules-Calidad-Y-Pruebas` | 2.0 | 3.1 | **major** | 0 · categoría no generada |
| `Rules-Devops` | 2.0 | 3.1 | **major** | 0 · categoría no generada |
| `Rules-Examples` | 3.0 | 4.1 | **major** | 0 · categoría no generada |
| `Rules-Documentacion` | 3.0 | 4.1 | **major** | 0 · categoría no generada |
| `Root-Rules` | 2.1 | 3.1 | **major** | 0 · el README raíz de la salida no está emitido |
| `Maqueta-Rules` | 2.0 | 3.1 | **major** | 0 · `SDD/Maquetas/` está fuera de alcance (§5) |
| `Deriva-Rules` | 2.0 | 3.1 | **major** | 0 · la línea de base visual no está emitida |
| `Vocabulario-Rules` | **no existía** | 2.1 | **regla nueva** | Transversal: alcanza a los 141 documentos |
| `Migracion-Rules` | **no existía** | 1.0 | **regla nueva** | Gobierna esta corrida |
| `PRODUCT-INTAKE-template` | `SOLUTION-INTAKE-template` 1.4 | 2.1 | **major** | 1 |
| `PRODUCT-MANIFEST-template` | `SOLUTION-MANIFEST-template` (sin versión en cabecera hasta 4.1 del framework) | 4.1 | **major** | 1 |

**Todos los saltos son major.** La razón es la entrada `[5.0]`, que renombró el vocabulario normativo del framework y subió major los diecisiete archivos de reglas a la vez. La consecuencia práctica, por §4.3, es que **ningún documento del destino queda clasificado «no tocar»**: los 141 emitidos entran como «regenerar contenido».

**Sobre `Vocabulario-Rules` y `Migracion-Rules`.** No figuran en el bloque de procedencia del destino porque no existían en la 4.1: la primera se incorporó en la `[5.0]` y la segunda en la `[6.0]`. No es una omisión del manifiesto, y por eso no se computan como salto sino como reglas nuevas. `Vocabulario-Rules` es la que tiene efecto real sobre el contenido: `Master-Prompt.md` §8 la inyecta en todo despacho y su §9.5 prohíbe resolver los renombres por sustitución global de cadena.

---

## 3 · Renombres de artefacto aplicables

Leídos de los bloques «Impacto sobre destinos existentes» de las entradas `[5.0]` y `[6.0]` del `CHANGELOG.md` del framework. **Ninguno se resolvió por inferencia**, según el criterio de `Migracion-Rules.md` §3.

### 3.1 Renombres de archivo que alcanzan a este destino

| Nombre en el destino | Nombre vigente | Entrada del changelog |
| --- | --- | --- |
| `SDD/Intake/SOLUTION-INTAKE-SelfHosted-Service.md` | `SDD/Intake/PRODUCT-INTAKE-SelfHosted-Service.md` | `[5.0]` |
| `SDD/Intake/SOLUTION-MANIFEST-SelfHosted-Service.md` | `SDD/Intake/PRODUCT-MANIFEST-SelfHosted-Service.md` | `[5.0]` |
| `SDD/Docs/00-Contexto/Alcance-Proyecto.md` | `SDD/Docs/00-Contexto/Alcance-Producto.md` | `[5.0]` |

El archivo con nombre legado **no se renombra en su lugar**: se archiva el estado previo y se escribe el nombre vigente, según `Master-Prompt-Migracion.md` §6.

### 3.2 Renombres de identificador

| Identificador en el destino | Identificador vigente | Entrada |
| --- | --- | --- |
| `Nombre-Solucion` | `Slug-Producto` | `[5.0]` |
| `NombreSolucionCodigo` | `Raiz-Codigo` | `[5.0]` |
| `Nombre-Proyecto` | `Nombre-Proyecto-Codigo` | `[5.0]` |
| `nombre-proyecto-codigo` | `Identidad-Codigo` | `[5.0]` |
| `project_type` | `tipo_proyecto_codigo` | `[5.0]` |

### 3.3 Renombres de término

| Término anterior | Término vigente | Entrada |
| --- | --- | --- |
| «solución» (nivel superior) | «producto» | `[5.0]` |
| «proyecto» (unidad de compilación) | «proyecto de código» | `[5.0]` |
| «plan de adecuación» | «plan de migración normativa» | `[6.0]` |

**Procedimiento obligatorio.** Los tres renombres de §3.3 se aplican por el procedimiento por ocurrencia de `Vocabulario-Rules.md` §9.5 —enumerar, clasificar por sentido, sustituir solo lo que cambia de referente, verificar con barrido negativo— y **nunca** por reemplazo global de cadena. El framework documenta en su propia entrada `[5.1]` las cuatro clases de daño que produjo hacerlo de la otra manera sobre sí mismo.

**Cuidados verificados sobre este destino en particular:**

- «solución» sobrevive legítimamente en el compuesto **«solución de código»**, que designa el `.sln`. No se toca.
- «proyecto» a secas queda para el **emprendimiento**, y este destino tiene además un tercer referente: **`Proyecto` es una entidad del dominio del producto** —el agrupador de servicios del lienzo, con sus CU-01, CU-02, RC-01 y su variable compartida—. Es el caso que `Vocabulario-Rules.md` §9.6 prevé y que la entrada `[5.0]` declaró como el defecto originario. Sustituir «proyecto» por «proyecto de código» en 02 y 03 sería el peor daño posible de esta migración.
- La cadena `soluci` aparece dentro de «re**soluci**ón», palabra frecuente en este destino (RN-24, RC-11, informes de conflicto, banda de resultado). Es exactamente la ocurrencia que produjo las 30 «reproducto» del framework.

### 3.4 Renombres declarados que no alcanzan a este destino

`SDD/Docs/Solucion/` → `SDD/Docs/Producto/`, `Arquitectura-Solucion.md` → `Arquitectura-Proyecto-Codigo.md`, `Vista-Solucion.md` → `Vista-Producto.md`, `Pipeline-Solucion.md` → `Pipeline-Producto.md` y `Reconciliacion-<origen>-a-<vigente>.md` → `Plan-Migracion-<origen>-a-<vigente>.md`. Los cuatro primeros no aplican porque el destino es el caso degenerado de un proyecto de código y `Master-Prompt.md` §3.5 aplana la salida sin carpeta `Solucion/`; el quinto porque el destino no tiene informe de reconciliación emitido.

### 3.5 Procedimiento de sustitución léxica por ocurrencia

Es la sección operativa del renombre y **la más riesgosa de la migración**. `Vocabulario-Rules.md` §9.5 prohíbe el reemplazo global de cadena y fija cuatro pasos: enumerar, clasificar por sentido, sustituir solo lo que cambia de referente, verificar con barrido negativo. Acá se ejecutan los dos primeros; los dos últimos se hacen por documento en M4.

#### Paso 1 — Censo, con evidencia

Barrido sobre `SDD/Docs/` sin `_legacy/` y `SDD/Intake/`, del 2026-07-30:

| Forma | Ocurrencias |
| --- | --- |
| `proyecto*` (todas las flexiones) | **2901** |
| `solución` / `soluciones` / `solucion` | 680 |
| `resolución*` — contiene la cadena `soluci` | 167 |

#### Paso 2 — Clasificación por referente

El destino **ya desambiguó parcialmente su vocabulario por su cuenta**, y ése es el hecho más importante de esta tabla: 680 ocurrencias llevan la forma calificada «proyecto SelfHosted» en 95 de los 147 archivos que mencionan la palabra. No es un corpus sin gobernar.

| # | Referente | Marca reconocible | Ocurrencias | Qué se hace |
| --- | --- | --- | --- | --- |
| R1 | **Entidad del dominio**: el agrupador de servicios del lienzo, con `ProyectoId`, CU-01, CU-02, RC-01 y su variable compartida | «proyecto SelfHosted», `Proyecto` como entidad del modelo conceptual, `ProyectoId` | 680 calificadas + las de los artefactos de 02 y 03 | **No se toca.** Llamarla «proyecto de código» es el peor daño posible de esta migración |
| R2 | **Unidad D8 del framework**: `SelfHosted.Service.Core` | «proyecto de código» | 161 | Ya está en la forma vigente. No se toca |
| R3 | **Emprendimiento**: la corrida, el equipo, el agente humano | «agente humano del proyecto», «el proyecto tomó/resolvió/confirmó» | 325 | **Se preserva a secas.** La `[5.0]` lo declara en «Preservado deliberadamente»: «proyecto» a secas queda para el emprendimiento |
| R4 | **Etiqueta de cabecera** sobre un valor de plano producto | `**Proyecto:** SelfHosted Service` | 130 | Pasa a `**Producto:** SelfHosted Service`. Es el defecto que el framework corrigió en sí mismo en la `[5.1]`: una etiqueta de un plano sobre el valor de otro, prohibido por `Vocabulario-Rules.md` §3. **Corregido el 2026-07-30, ver abajo**: en las categorías de nivel proyecto de código esta regla es insuficiente |
| R5 | **Nombre de archivo de artefacto SDD** | `Alcance-Proyecto.md` | 50 | Renombre a `Alcance-Producto.md` (§3.1), y las 50 referencias cruzadas con él |
| R6 | **Nombre de artefacto del dominio** | `CU-01-Alta-De-Proyecto.md`, `Wireframes-Listado-De-Proyectos.md`, `RC-01-Unicidad-Del-Identificador-Legible-Del-Proyecto.md` | 138 | **No se tocan.** Nombran a R1, no a R2 |
| R7 | **Identificadores del manifiesto** | `Nombre-Proyecto`, `nombre-proyecto-codigo` | 47 | Renombre a `Nombre-Proyecto-Codigo` e `Identidad-Codigo` (§3.2) |
| R8 | **Compuestos** `multi-proyecto`, `inter-proyecto`, `cross-proyecto` | — | 0 | No hay ninguno. Constancia del barrido, no omisión |

Quedan aproximadamente **1370 ocurrencias sin marca reconocible** —«el proyecto», «del proyecto», «los proyectos»— que **no se clasifican acá**: se clasifican por ocurrencia, en su documento, durante M4. Declararlas resueltas desde el plan sería exactamente la inferencia masiva que §9.5 prohíbe.

#### Paso 3 — La advertencia que fija el criterio de M4

Decisión del agente humano del proyecto del 2026-07-30, incorporada al plan: **«proyecto de código» no es sinónimo de «proyecto de Visual Studio», y el referente se decide leyendo el contexto, no la forma de la palabra.** El destino ya había levantado esta distinción por su cuenta: `SDD/Estado/Fix-Definir-Producto.md` §Punto 1 declara cinco niveles donde el framework de la 4.1 tenía dos, y afirma textualmente que el proyecto SDD «es un **componente entregable**, no un proyecto de código», y que `NombreSolucionCodigo` «no es una solución de código: es una raíz de espacio de nombres».

Las dos consecuencias que M4 tiene que respetar:

1. **Ninguna ocurrencia se convierte en «proyecto de código» porque designe un `.csproj`.** Se convierte cuando designa **la unidad D8 que recibe las categorías 02 a 11**. En este destino las dos coinciden —el caso degenerado colapsó las cuatro capas de la Clean Architecture en un único `.csproj` separado por espacio de nombres—, pero coinciden **de hecho y no por definición**, y el texto migrado no debe apoyarse en esa coincidencia.
2. **Ante duda de referente, no se sustituye.** La ocurrencia se devuelve como ambigüedad según `Master-Prompt.md` §9 y la resuelve el humano. Un «proyecto» sin calificar que quedó sin calificar es un defecto menor y visible; un «proyecto de código» puesto sobre la entidad del dominio corrompe la especificación y se lee como correcto.

#### Paso 2.b — Dos correcciones al procedimiento, del 2026-07-30

Las dos salieron del corte 3 y **las dos son defectos del plan y del orquestador, no de los subagentes**. Se registran acá porque cambian el procedimiento para los cortes que faltan.

**La regla R4 era insuficiente para las categorías de nivel proyecto de código.** R4 ordenaba `**Proyecto:**` → `**Producto:**` conservando el valor, por el criterio de la `[5.1]` del framework. Eso es correcto para `00-Contexto` y `01-Necesidades-Negocio`, que son de **nivel producto**. Pero `Rules-Especificacion-Funcional` 4.0 §4.1 declara la cabecera de sus artefactos con `**Proyecto de código:** {{Nombre-Proyecto-Codigo}}` como primer campo, y la cabecera de esa regla fija su nivel de aplicación en **proyecto de código** (`Vocabulario-Rules.md` §4 R3). R4 sola dejaba a los 100 documentos de la categoría sin el campo que su propia regla exige.

El defecto era difícil de ver por una coincidencia del destino: `Nombre-Producto` es `SelfHosted Service` y `Nombre-Proyecto-Codigo` es `SelfHosted-Service`, **y difieren solo por el guion**. La cabecera de origen decía `**Proyecto:** SelfHosted Service`, es decir la etiqueta de un plano sobre el valor del otro, que es exactamente lo que `Vocabulario-Rules.md` §3 prohíbe y lo que hacía que las dos lecturas parecieran equivalentes.

**Cinco de los siete lotes del corte 3 levantaron la ambigüedad y se detuvieron a declararla en lugar de resolverla por su cuenta**, que es el comportamiento que `Master-Prompt.md` §9 pide. Dos —los de `CU-01` a `CU-13` y `CU-27` a `CU-38`— leyeron §4.1 y agregaron el campo. Resolución del orquestador: **la regla de la categoría manda, y los dos campos conviven**.

| Categoría | Nivel | Cabecera vigente |
| --- | --- | --- |
| `00-Contexto`, `01-Necesidades-Negocio` | producto | `**Producto:** SelfHosted Service` |
| `02-Especificacion-Funcional`, `03-UX-UI-DX` | proyecto de código | `**Proyecto de código:** SelfHosted-Service` **más** `**Producto:** SelfHosted Service` |

Se conservan los dos porque §4.1 exige el primero y `Migracion-Rules.md` §4.2 prohíbe perder el segundo, que es el valor que el documento de origen traía. El campo se agregó a los 73 documentos de 02 que no lo tenían —los otros 25 ya lo traían de los dos lotes que leyeron §4.1—, con el valor leído del `PRODUCT-MANIFEST` §2 y no inferido. Al cerrar el corte, **99 de los 100 documentos migrados** llevan los dos campos; el que falta es `Especificacion-Funcional.md`, que usa cabecera en tabla en lugar de bloque y quedó declarado como hallazgo P2 de la ronda 2. **Rige igual para el corte 4.**

**El archivado no iba en el `_legacy/` de la categoría sino en el de cada carpeta.** `Migracion-Rules.md` §4.2 regla 1 dice «el `_legacy/` de su **propia carpeta**», y el destino ya tenía esa convención establecida desde el 2026-07-29 en `Casos-De-Uso/_legacy/`, `Reglas-De-Negocio/_legacy/`, `Modelo-Datos/_legacy/` y `Wireframes/_legacy/`. El orquestador había archivado espejando el subárbol bajo un único `_legacy/` en la raíz de la categoría, que no es lo que la regla dice ni lo que el destino venía haciendo. Lo levantó el lote de `RN-01` a `RN-14`, que archivó por su cuenta en el lugar correcto al no encontrar el archivado donde el despacho lo anunciaba.

Corregido: las 116 copias quedaron consolidadas en el `_legacy/2026-07-30/` de su propia carpeta, verificadas idénticas antes de deduplicar. Alcanzó también a `01-Necesidades-Negocio`, que tenía el mismo defecto. **Rige igual para el corte 4**, que tiene `Wireframes/` y `Representaciones/` como subcarpetas.

#### Paso 4 — Barrido negativo, obligatorio por corte

Al cerrar cada corte de M4, antes del audit:

- `grep -n "reproducto\|reproducción de código"` — la clase de daño de las 30 «reproducto» del framework, producida por sustituir `soluci` dentro de «re**soluci**ón». Este destino tiene **167 ocurrencias** de «resolución».
- `grep -n "| Anti-patrón | .* | Producto |"` — cabeceras de tabla con la columna «Solución» pisada.
- `grep -n "proyecto de código"` sobre los artefactos de 02 y 03 — toda aparición nueva sobre un documento del dominio es sospechosa y se justifica una por una.
- `grep -n "producto técnica\|productos técnicas\|el producto de\b"` — concordancias de género rotas.
- Conteo de filas de control de cambios antes y después: `SDD-Development-Guide.md` §VI.2 prohíbe reescribir filas históricas, y el framework se reescribió 60 propias antes de darse cuenta.

**Ninguno de estos barridos es opcional y ninguno se declara cumplido sin haberlo corrido.**

---

## 4 · Tabla de documentos

Una fila por documento, en el orden de la cadena D6. **141 documentos emitidos y 1 ausente**, sobre un total de 144 archivos en `SDD/Docs/` menos los 3 informes de audit, que §5 declara fuera de alcance.

### Documentos de entrada (`SDD/Intake/`)

| Documento | Regla que lo gobierna | Qué cambió | Clasificación | Fuente de contenido |
| --- | --- | --- | --- | --- |
| `SDD/Intake/SOLUTION-INTAKE-SelfHosted-Service.md` → `PRODUCT-INTAKE-SelfHosted-Service.md` | `Intake-Rules` 2.1 → 3.2 y `PRODUCT-INTAKE-template` 1.4 → 2.1 | Renombre de artefacto; §9 «Lo que NO es este **producto**»; §13 «**Proyectos de código** del producto»; §17 bloque técnico **por proyecto de código**; los cuatro planos de identidad como campos propios con `Raiz-Codigo` declarada; regla de choque de vocabulario de `Intake-Rules` §5; §21 Anexo B pasa a «Cobertura de campos y trazabilidad de los ejemplos» | **Regenerar contenido** (fase M2, como propuesta) | documento de origen + pendiente humano para las secciones sin fuente |
| `SDD/Intake/SOLUTION-MANIFEST-SelfHosted-Service.md` → `PRODUCT-MANIFEST-SelfHosted-Service.md` | `Intake-Rules` 2.1 → 3.2 y `PRODUCT-MANIFEST-template` → 4.1 | Renombre de artefacto; §1 pasa a «Bloque de producto»; **§1.1 suma dos filas obligatorias**: versión de `PRODUCT-INTAKE-template` y de `PRODUCT-MANIFEST-template`; la fila de reglas transversales suma `Vocabulario-Rules` y `Migracion-Rules`; identificadores renombrados en §2 y §2.2 | **Re-derivación** (fase M3, no es migración de contenido) | derivado de §13 del intake migrado |

### Documentos generados (`SDD/Docs/`)

| Documento | Regla que lo gobierna | Qué cambió | Clasificación | Fuente de contenido |
| --- | --- | --- | --- | --- |
| `SDD/Docs/00-Contexto/Acuerdo-Equipo.md` | Rules-Contexto 2.1 → 3.1 | Vocabulario producto/proyecto de código (5.0); cabecera de nivel producto que deja de declarar un proyecto de código (R3); §6 declara que los términos de la categoría van al glosario del dominio (5.1) | Regenerar contenido | documento de origen |
| `SDD/Docs/00-Contexto/Alcance-Proyecto.md` | Rules-Contexto 2.1 → 3.1 | **Renombre de artefacto** a `Alcance-Producto.md`, que elimina el sentido «emprendimiento» del árbol. Vocabulario producto/proyecto de código (5.0); cabecera de nivel producto que deja de declarar un proyecto de código (R3); §6 declara que los términos de la categoría van al glosario del dominio (5.1) | Regenerar contenido | documento de origen |
| `SDD/Docs/00-Contexto/Compatibilidad-Plataformas.md` | Rules-Contexto 2.1 → 3.1 | Vocabulario producto/proyecto de código (5.0); cabecera de nivel producto que deja de declarar un proyecto de código (R3); §6 declara que los términos de la categoría van al glosario del dominio (5.1) | Regenerar contenido | documento de origen |
| `SDD/Docs/00-Contexto/README.md` | Rules-Contexto 2.1 → 3.1 | Vocabulario producto/proyecto de código (5.0); cabecera de nivel producto que deja de declarar un proyecto de código (R3); §6 declara que los términos de la categoría van al glosario del dominio (5.1) | Regenerar contenido | documento de origen |
| `SDD/Docs/00-Contexto/Roadmap-Producto.md` | Rules-Contexto 2.1 → 3.1 | Vocabulario producto/proyecto de código (5.0); cabecera de nivel producto que deja de declarar un proyecto de código (R3); §6 declara que los términos de la categoría van al glosario del dominio (5.1) | Regenerar contenido | documento de origen |
| `SDD/Docs/00-Contexto/Vision-Producto.md` | Rules-Contexto 2.1 → 3.1 | Vocabulario producto/proyecto de código (5.0); cabecera de nivel producto que deja de declarar un proyecto de código (R3); §6 declara que los términos de la categoría van al glosario del dominio (5.1) | Regenerar contenido | documento de origen |
| `SDD/Docs/01-Necesidades-Negocio/Necesidades-De-Negocio/NB-01-Visibilidad-Unificada-De-La-Arquitectura.md` | Rules-Necesidades-Negocio 2.0 → 3.1 | Vocabulario producto/proyecto de código (5.0); §6 declara que sus términos van al glosario del dominio de 00 (5.1) | Regenerar contenido | documento de origen |
| `SDD/Docs/01-Necesidades-Negocio/Necesidades-De-Negocio/NB-02-Adoptabilidad-Del-Parque-Existente.md` | Rules-Necesidades-Negocio 2.0 → 3.1 | Vocabulario producto/proyecto de código (5.0); §6 declara que sus términos van al glosario del dominio de 00 (5.1) | Regenerar contenido | documento de origen |
| `SDD/Docs/01-Necesidades-Negocio/Necesidades-De-Negocio/NB-03-Reproducibilidad-De-La-Arquitectura.md` | Rules-Necesidades-Negocio 2.0 → 3.1 | Vocabulario producto/proyecto de código (5.0); §6 declara que sus términos van al glosario del dominio de 00 (5.1) | Regenerar contenido | documento de origen |
| `SDD/Docs/01-Necesidades-Negocio/Necesidades-De-Negocio/NB-04-Alta-De-Servicio-Sin-Copiar-Y-Adaptar.md` | Rules-Necesidades-Negocio 2.0 → 3.1 | Vocabulario producto/proyecto de código (5.0); §6 declara que sus términos van al glosario del dominio de 00 (5.1) | Regenerar contenido | documento de origen |
| `SDD/Docs/01-Necesidades-Negocio/Necesidades-De-Negocio/NB-05-Arranque-Previsible-Y-Conflictos-Anticipados.md` | Rules-Necesidades-Negocio 2.0 → 3.1 | Vocabulario producto/proyecto de código (5.0); §6 declara que sus términos van al glosario del dominio de 00 (5.1) | Regenerar contenido | documento de origen |
| `SDD/Docs/01-Necesidades-Negocio/Necesidades-De-Negocio/NB-06-Cambios-Revisados-Y-Aplicados-En-Lote.md` | Rules-Necesidades-Negocio 2.0 → 3.1 | Vocabulario producto/proyecto de código (5.0); §6 declara que sus términos van al glosario del dominio de 00 (5.1) | Regenerar contenido | documento de origen |
| `SDD/Docs/01-Necesidades-Negocio/Necesidades-De-Negocio/NB-07-Atribucion-Del-Consumo-Del-Servidor.md` | Rules-Necesidades-Negocio 2.0 → 3.1 | Vocabulario producto/proyecto de código (5.0); §6 declara que sus términos van al glosario del dominio de 00 (5.1) | Regenerar contenido | documento de origen |
| `SDD/Docs/01-Necesidades-Negocio/Necesidades-De-Negocio/NB-08-Control-De-Acceso-Y-Credenciales-De-Maquina.md` | Rules-Necesidades-Negocio 2.0 → 3.1 | Vocabulario producto/proyecto de código (5.0); §6 declara que sus términos van al glosario del dominio de 00 (5.1) | Regenerar contenido | documento de origen |
| `SDD/Docs/01-Necesidades-Negocio/Necesidades-Negocio.md` | Rules-Necesidades-Negocio 2.0 → 3.1 | Vocabulario producto/proyecto de código (5.0); §6 declara que sus términos van al glosario del dominio de 00 (5.1) | Regenerar contenido | documento de origen |
| `SDD/Docs/01-Necesidades-Negocio/README.md` | Rules-Necesidades-Negocio 2.0 → 3.1 | Vocabulario producto/proyecto de código (5.0); §6 declara que sus términos van al glosario del dominio de 00 (5.1) | Regenerar contenido | documento de origen |
| `SDD/Docs/02-Especificacion-Funcional/Especificacion-Funcional.md` | Rules-Especificacion-Funcional 2.0 → 4.0 | Vocabulario producto/proyecto de código (5.0), con el cuidado de §3.3 sobre la entidad `Proyecto` del dominio; §3.3 de inclusión de términos en el glosario y §6 que lo verifica (5.1). La matriz NB→CU→RN→US suma la referencia al glosario | Regenerar contenido | documento de origen |
| `SDD/Docs/02-Especificacion-Funcional/Glosario-Funcional.md` | Rules-Especificacion-Funcional 2.0 → 4.0 | **Artefacto ausente.** Obligatorio para los ocho tipos D8 desde 4.0 (§2.1 y §4.2.4, cinco secciones); hasta 3.0 el glosario de 02 era el punto 6 de `Modelo-Conceptual.md` | Regenerar contenido · emisión inicial | documento hermano (punto 6 de `Modelo-Conceptual.md` y términos acuñados en 02) + pendiente humano |
| `SDD/Docs/02-Especificacion-Funcional/Casos-De-Uso/CU-01-Alta-De-Proyecto.md` | Rules-Especificacion-Funcional 2.0 → 4.0 | Vocabulario producto/proyecto de código (5.0), con el cuidado de §3.3 sobre la entidad `Proyecto` del dominio; §3.3 de inclusión de términos en el glosario y §6 que lo verifica (5.1) | Regenerar contenido | documento de origen |
| `SDD/Docs/02-Especificacion-Funcional/Casos-De-Uso/CU-02-Listado-Renombrado-Y-Eliminacion-De-Proyectos.md` | Rules-Especificacion-Funcional 2.0 → 4.0 | Vocabulario producto/proyecto de código (5.0), con el cuidado de §3.3 sobre la entidad `Proyecto` del dominio; §3.3 de inclusión de términos en el glosario y §6 que lo verifica (5.1) | Regenerar contenido | documento de origen |
| `SDD/Docs/02-Especificacion-Funcional/Casos-De-Uso/CU-03-Alta-Y-Configuracion-De-Servicio.md` | Rules-Especificacion-Funcional 2.0 → 4.0 | Vocabulario producto/proyecto de código (5.0), con el cuidado de §3.3 sobre la entidad `Proyecto` del dominio; §3.3 de inclusión de términos en el glosario y §6 que lo verifica (5.1) | Regenerar contenido | documento de origen |
| `SDD/Docs/02-Especificacion-Funcional/Casos-De-Uso/CU-04-Composicion-Del-Lienzo.md` | Rules-Especificacion-Funcional 2.0 → 4.0 | Vocabulario producto/proyecto de código (5.0), con el cuidado de §3.3 sobre la entidad `Proyecto` del dominio; §3.3 de inclusión de términos en el glosario y §6 que lo verifica (5.1) | Regenerar contenido | documento de origen |
| `SDD/Docs/02-Especificacion-Funcional/Casos-De-Uso/CU-05-Persistencia-Y-Recuperacion-De-La-Disposicion.md` | Rules-Especificacion-Funcional 2.0 → 4.0 | Vocabulario producto/proyecto de código (5.0), con el cuidado de §3.3 sobre la entidad `Proyecto` del dominio; §3.3 de inclusión de términos en el glosario y §6 que lo verifica (5.1) | Regenerar contenido | documento de origen |
| `SDD/Docs/02-Especificacion-Funcional/Casos-De-Uso/CU-06-Descubrimiento-De-Contenedores-Adoptables.md` | Rules-Especificacion-Funcional 2.0 → 4.0 | Vocabulario producto/proyecto de código (5.0), con el cuidado de §3.3 sobre la entidad `Proyecto` del dominio; §3.3 de inclusión de términos en el glosario y §6 que lo verifica (5.1) | Regenerar contenido | documento de origen |
| `SDD/Docs/02-Especificacion-Funcional/Casos-De-Uso/CU-07-Incorporacion-Con-Confirmacion-Explicita.md` | Rules-Especificacion-Funcional 2.0 → 4.0 | Vocabulario producto/proyecto de código (5.0), con el cuidado de §3.3 sobre la entidad `Proyecto` del dominio; §3.3 de inclusión de términos en el glosario y §6 que lo verifica (5.1) | Regenerar contenido | documento de origen |
| `SDD/Docs/02-Especificacion-Funcional/Casos-De-Uso/CU-08-Traduccion-De-La-Configuracion-Observada.md` | Rules-Especificacion-Funcional 2.0 → 4.0 | Vocabulario producto/proyecto de código (5.0), con el cuidado de §3.3 sobre la entidad `Proyecto` del dominio; §3.3 de inclusión de términos en el glosario y §6 que lo verifica (5.1) | Regenerar contenido | documento de origen |
| `SDD/Docs/02-Especificacion-Funcional/Casos-De-Uso/CU-09-Exportacion-En-Formato-De-Composicion.md` | Rules-Especificacion-Funcional 2.0 → 4.0 | Vocabulario producto/proyecto de código (5.0), con el cuidado de §3.3 sobre la entidad `Proyecto` del dominio; §3.3 de inclusión de términos en el glosario y §6 que lo verifica (5.1) | Regenerar contenido | documento de origen |
| `SDD/Docs/02-Especificacion-Funcional/Casos-De-Uso/CU-10-Exportacion-Del-Manifiesto-Propio.md` | Rules-Especificacion-Funcional 2.0 → 4.0 | Vocabulario producto/proyecto de código (5.0), con el cuidado de §3.3 sobre la entidad `Proyecto` del dominio; §3.3 de inclusión de términos en el glosario y §6 que lo verifica (5.1) | Regenerar contenido | documento de origen |
| `SDD/Docs/02-Especificacion-Funcional/Casos-De-Uso/CU-11-Importacion-Como-Proyecto-Nuevo.md` | Rules-Especificacion-Funcional 2.0 → 4.0 | Vocabulario producto/proyecto de código (5.0), con el cuidado de §3.3 sobre la entidad `Proyecto` del dominio; §3.3 de inclusión de términos en el glosario y §6 que lo verifica (5.1) | Regenerar contenido | documento de origen |
| `SDD/Docs/02-Especificacion-Funcional/Casos-De-Uso/CU-12-Exportacion-Programada-A-Destino-Externo.md` | Rules-Especificacion-Funcional 2.0 → 4.0 | Vocabulario producto/proyecto de código (5.0), con el cuidado de §3.3 sobre la entidad `Proyecto` del dominio; §3.3 de inclusión de términos en el glosario y §6 que lo verifica (5.1) | Regenerar contenido | documento de origen |
| `SDD/Docs/02-Especificacion-Funcional/Casos-De-Uso/CU-13-Despliegue-Desde-Imagen-De-Registro.md` | Rules-Especificacion-Funcional 2.0 → 4.0 | Vocabulario producto/proyecto de código (5.0), con el cuidado de §3.3 sobre la entidad `Proyecto` del dominio; §3.3 de inclusión de términos en el glosario y §6 que lo verifica (5.1) | Regenerar contenido | documento de origen |
| `SDD/Docs/02-Especificacion-Funcional/Casos-De-Uso/CU-14-Consulta-Del-Registro-Del-Contenedor.md` | Rules-Especificacion-Funcional 2.0 → 4.0 | Vocabulario producto/proyecto de código (5.0), con el cuidado de §3.3 sobre la entidad `Proyecto` del dominio; §3.3 de inclusión de términos en el glosario y §6 que lo verifica (5.1) | Regenerar contenido | documento de origen |
| `SDD/Docs/02-Especificacion-Funcional/Casos-De-Uso/CU-15-Despliegue-Construyendo-La-Imagen.md` | Rules-Especificacion-Funcional 2.0 → 4.0 | Vocabulario producto/proyecto de código (5.0), con el cuidado de §3.3 sobre la entidad `Proyecto` del dominio; §3.3 de inclusión de términos en el glosario y §6 que lo verifica (5.1) | Regenerar contenido | documento de origen |
| `SDD/Docs/02-Especificacion-Funcional/Casos-De-Uso/CU-16-Alta-Desde-Plantilla-Del-Catalogo.md` | Rules-Especificacion-Funcional 2.0 → 4.0 | Vocabulario producto/proyecto de código (5.0), con el cuidado de §3.3 sobre la entidad `Proyecto` del dominio; §3.3 de inclusión de términos en el glosario y §6 que lo verifica (5.1) | Regenerar contenido | documento de origen |
| `SDD/Docs/02-Especificacion-Funcional/Casos-De-Uso/CU-17-Mantenimiento-Del-Catalogo.md` | Rules-Especificacion-Funcional 2.0 → 4.0 | Vocabulario producto/proyecto de código (5.0), con el cuidado de §3.3 sobre la entidad `Proyecto` del dominio; §3.3 de inclusión de términos en el glosario y §6 que lo verifica (5.1) | Regenerar contenido | documento de origen |
| `SDD/Docs/02-Especificacion-Funcional/Casos-De-Uso/CU-18-Arranque-Y-Parada-Con-Autoarranque.md` | Rules-Especificacion-Funcional 2.0 → 4.0 | Vocabulario producto/proyecto de código (5.0), con el cuidado de §3.3 sobre la entidad `Proyecto` del dominio; §3.3 de inclusión de términos en el glosario y §6 que lo verifica (5.1) | Regenerar contenido | documento de origen |
| `SDD/Docs/02-Especificacion-Funcional/Casos-De-Uso/CU-19-Rango-Gestionado-Y-Reserva-De-Direccion.md` | Rules-Especificacion-Funcional 2.0 → 4.0 | Vocabulario producto/proyecto de código (5.0), con el cuidado de §3.3 sobre la entidad `Proyecto` del dominio; §3.3 de inclusión de términos en el glosario y §6 que lo verifica (5.1) | Regenerar contenido | documento de origen |
| `SDD/Docs/02-Especificacion-Funcional/Casos-De-Uso/CU-20-Validacion-De-Conflicto-De-Direcciones.md` | Rules-Especificacion-Funcional 2.0 → 4.0 | Vocabulario producto/proyecto de código (5.0), con el cuidado de §3.3 sobre la entidad `Proyecto` del dominio; §3.3 de inclusión de términos en el glosario y §6 que lo verifica (5.1) | Regenerar contenido | documento de origen |
| `SDD/Docs/02-Especificacion-Funcional/Casos-De-Uso/CU-21-Informe-De-Conflicto-Y-Resolucion.md` | Rules-Especificacion-Funcional 2.0 → 4.0 | Vocabulario producto/proyecto de código (5.0), con el cuidado de §3.3 sobre la entidad `Proyecto` del dominio; §3.3 de inclusión de términos en el glosario y §6 que lo verifica (5.1) | Regenerar contenido | documento de origen |
| `SDD/Docs/02-Especificacion-Funcional/Casos-De-Uso/CU-22-Acumulacion-De-Cambios-Pendientes.md` | Rules-Especificacion-Funcional 2.0 → 4.0 | Vocabulario producto/proyecto de código (5.0), con el cuidado de §3.3 sobre la entidad `Proyecto` del dominio; §3.3 de inclusión de términos en el glosario y §6 que lo verifica (5.1) | Regenerar contenido | documento de origen |
| `SDD/Docs/02-Especificacion-Funcional/Casos-De-Uso/CU-23-Descarte-De-Un-Cambio-Individual.md` | Rules-Especificacion-Funcional 2.0 → 4.0 | Vocabulario producto/proyecto de código (5.0), con el cuidado de §3.3 sobre la entidad `Proyecto` del dominio; §3.3 de inclusión de términos en el glosario y §6 que lo verifica (5.1) | Regenerar contenido | documento de origen |
| `SDD/Docs/02-Especificacion-Funcional/Casos-De-Uso/CU-24-Aplicacion-En-Lote.md` | Rules-Especificacion-Funcional 2.0 → 4.0 | Vocabulario producto/proyecto de código (5.0), con el cuidado de §3.3 sobre la entidad `Proyecto` del dominio; §3.3 de inclusión de términos en el glosario y §6 que lo verifica (5.1) | Regenerar contenido | documento de origen |
| `SDD/Docs/02-Especificacion-Funcional/Casos-De-Uso/CU-25-Calculo-Del-Informe-De-Impacto.md` | Rules-Especificacion-Funcional 2.0 → 4.0 | Vocabulario producto/proyecto de código (5.0), con el cuidado de §3.3 sobre la entidad `Proyecto` del dominio; §3.3 de inclusión de términos en el glosario y §6 que lo verifica (5.1) | Regenerar contenido | documento de origen |
| `SDD/Docs/02-Especificacion-Funcional/Casos-De-Uso/CU-26-Lectura-Del-Estado-Del-Servidor.md` | Rules-Especificacion-Funcional 2.0 → 4.0 | Vocabulario producto/proyecto de código (5.0), con el cuidado de §3.3 sobre la entidad `Proyecto` del dominio; §3.3 de inclusión de términos en el glosario y §6 que lo verifica (5.1) | Regenerar contenido | documento de origen |
| `SDD/Docs/02-Especificacion-Funcional/Casos-De-Uso/CU-27-Vista-Por-Proyecto-Y-Por-Contenedor.md` | Rules-Especificacion-Funcional 2.0 → 4.0 | Vocabulario producto/proyecto de código (5.0), con el cuidado de §3.3 sobre la entidad `Proyecto` del dominio; §3.3 de inclusión de términos en el glosario y §6 que lo verifica (5.1) | Regenerar contenido | documento de origen |
| `SDD/Docs/02-Especificacion-Funcional/Casos-De-Uso/CU-28-Reconciliacion-Con-El-Motor-De-Contenedores.md` | Rules-Especificacion-Funcional 2.0 → 4.0 | Vocabulario producto/proyecto de código (5.0), con el cuidado de §3.3 sobre la entidad `Proyecto` del dominio; §3.3 de inclusión de términos en el glosario y §6 que lo verifica (5.1) | Regenerar contenido | documento de origen |
| `SDD/Docs/02-Especificacion-Funcional/Casos-De-Uso/CU-29-Alta-Del-Administrador-En-El-Primer-Arranque.md` | Rules-Especificacion-Funcional 2.0 → 4.0 | Vocabulario producto/proyecto de código (5.0), con el cuidado de §3.3 sobre la entidad `Proyecto` del dominio; §3.3 de inclusión de términos en el glosario y §6 que lo verifica (5.1) | Regenerar contenido | documento de origen |
| `SDD/Docs/02-Especificacion-Funcional/Casos-De-Uso/CU-30-Inicio-Y-Cierre-De-Sesion.md` | Rules-Especificacion-Funcional 2.0 → 4.0 | Vocabulario producto/proyecto de código (5.0), con el cuidado de §3.3 sobre la entidad `Proyecto` del dominio; §3.3 de inclusión de términos en el glosario y §6 que lo verifica (5.1) | Regenerar contenido | documento de origen |
| `SDD/Docs/02-Especificacion-Funcional/Casos-De-Uso/CU-31-Cambio-De-Contrasena.md` | Rules-Especificacion-Funcional 2.0 → 4.0 | Vocabulario producto/proyecto de código (5.0), con el cuidado de §3.3 sobre la entidad `Proyecto` del dominio; §3.3 de inclusión de términos en el glosario y §6 que lo verifica (5.1) | Regenerar contenido | documento de origen |
| `SDD/Docs/02-Especificacion-Funcional/Casos-De-Uso/CU-32-Emision-Y-Revocacion-De-Credenciales-De-Maquina.md` | Rules-Especificacion-Funcional 2.0 → 4.0 | Vocabulario producto/proyecto de código (5.0), con el cuidado de §3.3 sobre la entidad `Proyecto` del dominio; §3.3 de inclusión de términos en el glosario y §6 que lo verifica (5.1) | Regenerar contenido | documento de origen |
| `SDD/Docs/02-Especificacion-Funcional/Casos-De-Uso/CU-33-Disparo-De-Despliegue-Con-Credencial-De-Ambito-Minimo.md` | Rules-Especificacion-Funcional 2.0 → 4.0 | Vocabulario producto/proyecto de código (5.0), con el cuidado de §3.3 sobre la entidad `Proyecto` del dominio; §3.3 de inclusión de términos en el glosario y §6 que lo verifica (5.1) | Regenerar contenido | documento de origen |
| `SDD/Docs/02-Especificacion-Funcional/Casos-De-Uso/CU-34-Variables-Compartidas-Del-Proyecto.md` | Rules-Especificacion-Funcional 2.0 → 4.0 | Vocabulario producto/proyecto de código (5.0), con el cuidado de §3.3 sobre la entidad `Proyecto` del dominio; §3.3 de inclusión de términos en el glosario y §6 que lo verifica (5.1) | Regenerar contenido | documento de origen |
| `SDD/Docs/02-Especificacion-Funcional/Casos-De-Uso/CU-35-Valor-Expresado-Como-Referencia.md` | Rules-Especificacion-Funcional 2.0 → 4.0 | Vocabulario producto/proyecto de código (5.0), con el cuidado de §3.3 sobre la entidad `Proyecto` del dominio; §3.3 de inclusión de términos en el glosario y §6 que lo verifica (5.1) | Regenerar contenido | documento de origen |
| `SDD/Docs/02-Especificacion-Funcional/Casos-De-Uso/CU-36-Revision-De-Higiene-Del-Registro.md` | Rules-Especificacion-Funcional 2.0 → 4.0 | Vocabulario producto/proyecto de código (5.0), con el cuidado de §3.3 sobre la entidad `Proyecto` del dominio; §3.3 de inclusión de términos en el glosario y §6 que lo verifica (5.1) | Regenerar contenido | documento de origen |
| `SDD/Docs/02-Especificacion-Funcional/Casos-De-Uso/CU-37-Higiene-De-Imagenes.md` | Rules-Especificacion-Funcional 2.0 → 4.0 | Vocabulario producto/proyecto de código (5.0), con el cuidado de §3.3 sobre la entidad `Proyecto` del dominio; §3.3 de inclusión de términos en el glosario y §6 que lo verifica (5.1) | Regenerar contenido | documento de origen |
| `SDD/Docs/02-Especificacion-Funcional/Casos-De-Uso/CU-38-Vuelta-A-Un-Despliegue-Anterior.md` | Rules-Especificacion-Funcional 2.0 → 4.0 | Vocabulario producto/proyecto de código (5.0), con el cuidado de §3.3 sobre la entidad `Proyecto` del dominio; §3.3 de inclusión de términos en el glosario y §6 que lo verifica (5.1) | Regenerar contenido | documento de origen |
| `SDD/Docs/02-Especificacion-Funcional/Reglas-De-Negocio/RN-01-Unicidad-Y-Formato-Del-Nombre-De-Servicio.md` | Rules-Especificacion-Funcional 2.0 → 4.0 | Vocabulario producto/proyecto de código (5.0), con el cuidado de §3.3 sobre la entidad `Proyecto` del dominio; §3.3 de inclusión de términos en el glosario y §6 que lo verifica (5.1) | Regenerar contenido | documento de origen |
| `SDD/Docs/02-Especificacion-Funcional/Reglas-De-Negocio/RN-02-Pertenencia-Del-Servicio-A-Un-Unico-Proyecto.md` | Rules-Especificacion-Funcional 2.0 → 4.0 | Vocabulario producto/proyecto de código (5.0), con el cuidado de §3.3 sobre la entidad `Proyecto` del dominio; §3.3 de inclusión de términos en el glosario y §6 que lo verifica (5.1) | Regenerar contenido | documento de origen |
| `SDD/Docs/02-Especificacion-Funcional/Reglas-De-Negocio/RN-03-Exclusividad-De-Direccion-Entre-Servicios-Activos.md` | Rules-Especificacion-Funcional 2.0 → 4.0 | Vocabulario producto/proyecto de código (5.0), con el cuidado de §3.3 sobre la entidad `Proyecto` del dominio; §3.3 de inclusión de términos en el glosario y §6 que lo verifica (5.1) | Regenerar contenido | documento de origen |
| `SDD/Docs/02-Especificacion-Funcional/Reglas-De-Negocio/RN-04-Canal-Alcanzable-En-La-Arista-Que-Referencia-El-Host.md` | Rules-Especificacion-Funcional 2.0 → 4.0 | Vocabulario producto/proyecto de código (5.0), con el cuidado de §3.3 sobre la entidad `Proyecto` del dominio; §3.3 de inclusión de términos en el glosario y §6 que lo verifica (5.1) | Regenerar contenido | documento de origen |
| `SDD/Docs/02-Especificacion-Funcional/Reglas-De-Negocio/RN-05-Aciclicidad-Del-Grafo-De-Arranque.md` | Rules-Especificacion-Funcional 2.0 → 4.0 | Vocabulario producto/proyecto de código (5.0), con el cuidado de §3.3 sobre la entidad `Proyecto` del dominio; §3.3 de inclusión de términos en el glosario y §6 que lo verifica (5.1) | Regenerar contenido | documento de origen |
| `SDD/Docs/02-Especificacion-Funcional/Reglas-De-Negocio/RN-06-Pertenencia-De-La-Direccion-Al-Rango-Gestionado.md` | Rules-Especificacion-Funcional 2.0 → 4.0 | Vocabulario producto/proyecto de código (5.0), con el cuidado de §3.3 sobre la entidad `Proyecto` del dominio; §3.3 de inclusión de términos en el glosario y §6 que lo verifica (5.1) | Regenerar contenido | documento de origen |
| `SDD/Docs/02-Especificacion-Funcional/Reglas-De-Negocio/RN-07-Prohibicion-De-Publicar-Puertos-En-Macvlan.md` | Rules-Especificacion-Funcional 2.0 → 4.0 | Vocabulario producto/proyecto de código (5.0), con el cuidado de §3.3 sobre la entidad `Proyecto` del dominio; §3.3 de inclusión de términos en el glosario y §6 que lo verifica (5.1) | Regenerar contenido | documento de origen |
| `SDD/Docs/02-Especificacion-Funcional/Reglas-De-Negocio/RN-08-Datos-Obligatorios-Del-Origen-Repositorio.md` | Rules-Especificacion-Funcional 2.0 → 4.0 | Vocabulario producto/proyecto de código (5.0), con el cuidado de §3.3 sobre la entidad `Proyecto` del dominio; §3.3 de inclusión de términos en el glosario y §6 que lo verifica (5.1) | Regenerar contenido | documento de origen |
| `SDD/Docs/02-Especificacion-Funcional/Reglas-De-Negocio/RN-09-Conservacion-De-Volumenes-Al-Detener.md` | Rules-Especificacion-Funcional 2.0 → 4.0 | Vocabulario producto/proyecto de código (5.0), con el cuidado de §3.3 sobre la entidad `Proyecto` del dominio; §3.3 de inclusión de términos en el glosario y §6 que lo verifica (5.1) | Regenerar contenido | documento de origen |
| `SDD/Docs/02-Especificacion-Funcional/Reglas-De-Negocio/RN-10-Confirmacion-Escrita-Al-Eliminar-Un-Servicio.md` | Rules-Especificacion-Funcional 2.0 → 4.0 | Vocabulario producto/proyecto de código (5.0), con el cuidado de §3.3 sobre la entidad `Proyecto` del dominio; §3.3 de inclusión de términos en el glosario y §6 que lo verifica (5.1) | Regenerar contenido | documento de origen |
| `SDD/Docs/02-Especificacion-Funcional/Reglas-De-Negocio/RN-11-Adopcion-Unica-De-Un-Contenedor.md` | Rules-Especificacion-Funcional 2.0 → 4.0 | Vocabulario producto/proyecto de código (5.0), con el cuidado de §3.3 sobre la entidad `Proyecto` del dominio; §3.3 de inclusión de términos en el glosario y §6 que lo verifica (5.1) | Regenerar contenido | documento de origen |
| `SDD/Docs/02-Especificacion-Funcional/Reglas-De-Negocio/RN-12-Exclusion-De-Los-Cambios-Visuales-Del-Changeset.md` | Rules-Especificacion-Funcional 2.0 → 4.0 | Vocabulario producto/proyecto de código (5.0), con el cuidado de §3.3 sobre la entidad `Proyecto` del dominio; §3.3 de inclusión de términos en el glosario y §6 que lo verifica (5.1) | Regenerar contenido | documento de origen |
| `SDD/Docs/02-Especificacion-Funcional/Reglas-De-Negocio/RN-13-Redespliegue-Acotado-A-Lo-Afectado.md` | Rules-Especificacion-Funcional 2.0 → 4.0 | Vocabulario producto/proyecto de código (5.0), con el cuidado de §3.3 sobre la entidad `Proyecto` del dominio; §3.3 de inclusión de términos en el glosario y §6 que lo verifica (5.1) | Regenerar contenido | documento de origen |
| `SDD/Docs/02-Especificacion-Funcional/Reglas-De-Negocio/RN-14-Orden-Topologico-Del-Grafo-De-Arranque.md` | Rules-Especificacion-Funcional 2.0 → 4.0 | Vocabulario producto/proyecto de código (5.0), con el cuidado de §3.3 sobre la entidad `Proyecto` del dominio; §3.3 de inclusión de términos en el glosario y §6 que lo verifica (5.1) | Regenerar contenido | documento de origen |
| `SDD/Docs/02-Especificacion-Funcional/Reglas-De-Negocio/RN-15-Prohibicion-De-Devolver-Secretos-En-Claro.md` | Rules-Especificacion-Funcional 2.0 → 4.0 | Vocabulario producto/proyecto de código (5.0), con el cuidado de §3.3 sobre la entidad `Proyecto` del dominio; §3.3 de inclusión de términos en el glosario y §6 que lo verifica (5.1) | Regenerar contenido | documento de origen |
| `SDD/Docs/02-Especificacion-Funcional/Reglas-De-Negocio/RN-16-Exhibicion-Unica-Y-Persistencia-Del-Resumen-Del-Token.md` | Rules-Especificacion-Funcional 2.0 → 4.0 | Vocabulario producto/proyecto de código (5.0), con el cuidado de §3.3 sobre la entidad `Proyecto` del dominio; §3.3 de inclusión de términos en el glosario y §6 que lo verifica (5.1) | Regenerar contenido | documento de origen |
| `SDD/Docs/02-Especificacion-Funcional/Reglas-De-Negocio/RN-17-Registro-De-Auditoria-De-Toda-Escritura.md` | Rules-Especificacion-Funcional 2.0 → 4.0 | Vocabulario producto/proyecto de código (5.0), con el cuidado de §3.3 sobre la entidad `Proyecto` del dominio; §3.3 de inclusión de términos en el glosario y §6 que lo verifica (5.1) | Regenerar contenido | documento de origen |
| `SDD/Docs/02-Especificacion-Funcional/Reglas-De-Negocio/RN-18-Escalado-Horizontal-Con-Direccion-Por-Replica.md` | Rules-Especificacion-Funcional 2.0 → 4.0 | Vocabulario producto/proyecto de código (5.0), con el cuidado de §3.3 sobre la entidad `Proyecto` del dominio; §3.3 de inclusión de términos en el glosario y §6 que lo verifica (5.1) | Regenerar contenido | documento de origen |
| `SDD/Docs/02-Especificacion-Funcional/Reglas-De-Negocio/RN-19-Limite-Del-Escalado-Vertical-A-Los-Recursos-Del-Host.md` | Rules-Especificacion-Funcional 2.0 → 4.0 | Vocabulario producto/proyecto de código (5.0), con el cuidado de §3.3 sobre la entidad `Proyecto` del dominio; §3.3 de inclusión de términos en el glosario y §6 que lo verifica (5.1) | Regenerar contenido | documento de origen |
| `SDD/Docs/02-Especificacion-Funcional/Reglas-De-Negocio/RN-20-Arranque-Parcial-Como-Estado-Declarado.md` | Rules-Especificacion-Funcional 2.0 → 4.0 | Vocabulario producto/proyecto de código (5.0), con el cuidado de §3.3 sobre la entidad `Proyecto` del dominio; §3.3 de inclusión de términos en el glosario y §6 que lo verifica (5.1) | Regenerar contenido | documento de origen |
| `SDD/Docs/02-Especificacion-Funcional/Reglas-De-Negocio/RN-21-Validez-Del-Ambito-De-Una-Referencia.md` | Rules-Especificacion-Funcional 2.0 → 4.0 | Vocabulario producto/proyecto de código (5.0), con el cuidado de §3.3 sobre la entidad `Proyecto` del dominio; §3.3 de inclusión de términos en el glosario y §6 que lo verifica (5.1) | Regenerar contenido | documento de origen |
| `SDD/Docs/02-Especificacion-Funcional/Reglas-De-Negocio/RN-22-Prohibicion-Del-Ciclo-De-Valor.md` | Rules-Especificacion-Funcional 2.0 → 4.0 | Vocabulario producto/proyecto de código (5.0), con el cuidado de §3.3 sobre la entidad `Proyecto` del dominio; §3.3 de inclusión de términos en el glosario y §6 que lo verifica (5.1) | Regenerar contenido | documento de origen |
| `SDD/Docs/02-Especificacion-Funcional/Reglas-De-Negocio/RN-23-Propagacion-Del-Caracter-De-Secreto.md` | Rules-Especificacion-Funcional 2.0 → 4.0 | Vocabulario producto/proyecto de código (5.0), con el cuidado de §3.3 sobre la entidad `Proyecto` del dominio; §3.3 de inclusión de términos en el glosario y §6 que lo verifica (5.1) | Regenerar contenido | documento de origen |
| `SDD/Docs/02-Especificacion-Funcional/Reglas-De-Negocio/RN-24-Resolucion-De-La-Referencia-Antes-De-Crear-El-Contenedor.md` | Rules-Especificacion-Funcional 2.0 → 4.0 | Vocabulario producto/proyecto de código (5.0), con el cuidado de §3.3 sobre la entidad `Proyecto` del dominio; §3.3 de inclusión de términos en el glosario y §6 que lo verifica (5.1) | Regenerar contenido | documento de origen |
| `SDD/Docs/02-Especificacion-Funcional/Reglas-De-Negocio/RN-25-Ausencia-De-Expresiones-En-La-Exportacion.md` | Rules-Especificacion-Funcional 2.0 → 4.0 | Vocabulario producto/proyecto de código (5.0), con el cuidado de §3.3 sobre la entidad `Proyecto` del dominio; §3.3 de inclusión de términos en el glosario y §6 que lo verifica (5.1) | Regenerar contenido | documento de origen |
| `SDD/Docs/02-Especificacion-Funcional/Reglas-De-Negocio/RN-26-Ausencia-De-Referencias-Derivadas-De-La-Importacion.md` | Rules-Especificacion-Funcional 2.0 → 4.0 | Vocabulario producto/proyecto de código (5.0), con el cuidado de §3.3 sobre la entidad `Proyecto` del dominio; §3.3 de inclusión de términos en el glosario y §6 que lo verifica (5.1) | Regenerar contenido | documento de origen |
| `SDD/Docs/02-Especificacion-Funcional/Reglas-De-Negocio/RN-27-Proteccion-De-La-Variable-Referenciada-Ante-La-Eliminacion.md` | Rules-Especificacion-Funcional 2.0 → 4.0 | Vocabulario producto/proyecto de código (5.0), con el cuidado de §3.3 sobre la entidad `Proyecto` del dominio; §3.3 de inclusión de términos en el glosario y §6 que lo verifica (5.1) | Regenerar contenido | documento de origen |
| `SDD/Docs/02-Especificacion-Funcional/Reglas-De-Negocio/RN-28-Unicidad-De-La-Clave-Segun-El-Ambito-De-La-Variable.md` | Rules-Especificacion-Funcional 2.0 → 4.0 | Vocabulario producto/proyecto de código (5.0), con el cuidado de §3.3 sobre la entidad `Proyecto` del dominio; §3.3 de inclusión de términos en el glosario y §6 que lo verifica (5.1) | Regenerar contenido | documento de origen |
| `SDD/Docs/02-Especificacion-Funcional/Reglas-De-Negocio/RN-29-Clasificacion-Obligatoria-De-Variables-En-La-Adopcion.md` | Rules-Especificacion-Funcional 2.0 → 4.0 | Vocabulario producto/proyecto de código (5.0), con el cuidado de §3.3 sobre la entidad `Proyecto` del dominio; §3.3 de inclusión de términos en el glosario y §6 que lo verifica (5.1) | Regenerar contenido | documento de origen |
| `SDD/Docs/02-Especificacion-Funcional/Reglas-De-Negocio/RN-30-Instanciacion-Como-N-Servicios-Y-N-Contenedores.md` | Rules-Especificacion-Funcional 2.0 → 4.0 | Vocabulario producto/proyecto de código (5.0), con el cuidado de §3.3 sobre la entidad `Proyecto` del dominio; §3.3 de inclusión de términos en el glosario y §6 que lo verifica (5.1) | Regenerar contenido | documento de origen |
| `SDD/Docs/02-Especificacion-Funcional/Reglas-De-Negocio/RN-31-Resultado-Del-Despliegue-Por-Contenedor.md` | Rules-Especificacion-Funcional 2.0 → 4.0 | Vocabulario producto/proyecto de código (5.0), con el cuidado de §3.3 sobre la entidad `Proyecto` del dominio; §3.3 de inclusión de términos en el glosario y §6 que lo verifica (5.1) | Regenerar contenido | documento de origen |
| `SDD/Docs/02-Especificacion-Funcional/Reglas-De-Negocio/RN-32-Variables-Provistas-Por-El-Sistema-Y-Prefijo-Reservado.md` | Rules-Especificacion-Funcional 2.0 → 4.0 | Vocabulario producto/proyecto de código (5.0), con el cuidado de §3.3 sobre la entidad `Proyecto` del dominio; §3.3 de inclusión de términos en el glosario y §6 que lo verifica (5.1) | Regenerar contenido | documento de origen |
| `SDD/Docs/02-Especificacion-Funcional/Reglas-De-Negocio/RN-33-Invariancia-De-Las-Referencias-Ante-El-Renombrado.md` | Rules-Especificacion-Funcional 2.0 → 4.0 | Vocabulario producto/proyecto de código (5.0), con el cuidado de §3.3 sobre la entidad `Proyecto` del dominio; §3.3 de inclusión de términos en el glosario y §6 que lo verifica (5.1) | Regenerar contenido | documento de origen |
| `SDD/Docs/02-Especificacion-Funcional/Reglas-De-Negocio/RN-34-Aporte-Obligatorio-De-La-Arista.md` | Rules-Especificacion-Funcional 2.0 → 4.0 | Vocabulario producto/proyecto de código (5.0), con el cuidado de §3.3 sobre la entidad `Proyecto` del dominio; §3.3 de inclusión de términos en el glosario y §6 que lo verifica (5.1) | Regenerar contenido | documento de origen |
| `SDD/Docs/02-Especificacion-Funcional/Reglas-De-Negocio/RN-35-Vinculo-Por-Identidad-Y-Nunca-Por-Nombre.md` | Rules-Especificacion-Funcional 2.0 → 4.0 | Vocabulario producto/proyecto de código (5.0), con el cuidado de §3.3 sobre la entidad `Proyecto` del dominio; §3.3 de inclusión de términos en el glosario y §6 que lo verifica (5.1) | Regenerar contenido | documento de origen |
| `SDD/Docs/02-Especificacion-Funcional/Reglas-De-Negocio/RN-36-Sufijo-Automatico-Al-Instanciar-Un-Nombre-Existente.md` | Rules-Especificacion-Funcional 2.0 → 4.0 | Vocabulario producto/proyecto de código (5.0), con el cuidado de §3.3 sobre la entidad `Proyecto` del dominio; §3.3 de inclusión de términos en el glosario y §6 que lo verifica (5.1) | Regenerar contenido | documento de origen |
| `SDD/Docs/02-Especificacion-Funcional/Reglas-De-Negocio/RN-37-Deteccion-No-Bloqueante-De-Higiene-Del-Modelo.md` | Rules-Especificacion-Funcional 2.0 → 4.0 | Vocabulario producto/proyecto de código (5.0), con el cuidado de §3.3 sobre la entidad `Proyecto` del dominio; §3.3 de inclusión de términos en el glosario y §6 que lo verifica (5.1) | Regenerar contenido | documento de origen |
| `SDD/Docs/02-Especificacion-Funcional/Reglas-De-Negocio/RN-38-Unicidad-Del-Puerto-Publicado-En-El-Host.md` | Rules-Especificacion-Funcional 2.0 → 4.0 | Vocabulario producto/proyecto de código (5.0), con el cuidado de §3.3 sobre la entidad `Proyecto` del dominio; §3.3 de inclusión de términos en el glosario y §6 que lo verifica (5.1) | Regenerar contenido | documento de origen |
| `SDD/Docs/02-Especificacion-Funcional/Reglas-De-Negocio/RN-39-Desvinculacion-De-La-Instancia-Respecto-De-La-Plantilla.md` | Rules-Especificacion-Funcional 2.0 → 4.0 | Vocabulario producto/proyecto de código (5.0), con el cuidado de §3.3 sobre la entidad `Proyecto` del dominio; §3.3 de inclusión de términos en el glosario y §6 que lo verifica (5.1) | Regenerar contenido | documento de origen |
| `SDD/Docs/02-Especificacion-Funcional/Reglas-De-Negocio/RN-40-Proteccion-De-La-Imagen-Conservada-Y-De-La-Imagen-Ajena.md` | Rules-Especificacion-Funcional 2.0 → 4.0 | Vocabulario producto/proyecto de código (5.0), con el cuidado de §3.3 sobre la entidad `Proyecto` del dominio; §3.3 de inclusión de términos en el glosario y §6 que lo verifica (5.1) | Regenerar contenido | documento de origen |
| `SDD/Docs/02-Especificacion-Funcional/Modelo-Datos/Modelo-Conceptual.md` | Rules-Especificacion-Funcional 2.0 → 4.0 | Vocabulario producto/proyecto de código (5.0), con el cuidado de §3.3 sobre la entidad `Proyecto` del dominio; §3.3 de inclusión de términos en el glosario y §6 que lo verifica (5.1). **Su punto 6 deja de ser sección de este documento** y pasa al artefacto propio `Glosario-Funcional.md` | Regenerar contenido | documento de origen |
| `SDD/Docs/02-Especificacion-Funcional/Modelo-Datos/reglas-conceptuales-de-modelo/RC-01-Unicidad-Del-Identificador-Legible-Del-Proyecto.md` | Rules-Especificacion-Funcional 2.0 → 4.0 | Vocabulario producto/proyecto de código (5.0), con el cuidado de §3.3 sobre la entidad `Proyecto` del dominio; §3.3 de inclusión de términos en el glosario y §6 que lo verifica (5.1) | Regenerar contenido | documento de origen |
| `SDD/Docs/02-Especificacion-Funcional/Modelo-Datos/reglas-conceptuales-de-modelo/RC-02-Unicidad-Del-Nombre-De-Servicio-En-Su-Proyecto.md` | Rules-Especificacion-Funcional 2.0 → 4.0 | Vocabulario producto/proyecto de código (5.0), con el cuidado de §3.3 sobre la entidad `Proyecto` del dominio; §3.3 de inclusión de términos en el glosario y §6 que lo verifica (5.1) | Regenerar contenido | documento de origen |
| `SDD/Docs/02-Especificacion-Funcional/Modelo-Datos/reglas-conceptuales-de-modelo/RC-03-Unicidad-De-La-Clave-De-Variable-En-Su-Servicio.md` | Rules-Especificacion-Funcional 2.0 → 4.0 | Vocabulario producto/proyecto de código (5.0), con el cuidado de §3.3 sobre la entidad `Proyecto` del dominio; §3.3 de inclusión de términos en el glosario y §6 que lo verifica (5.1) | Regenerar contenido | documento de origen |
| `SDD/Docs/02-Especificacion-Funcional/Modelo-Datos/reglas-conceptuales-de-modelo/RC-04-Ausencia-De-Unicidad-De-La-Clave-Compartida.md` | Rules-Especificacion-Funcional 2.0 → 4.0 | Vocabulario producto/proyecto de código (5.0), con el cuidado de §3.3 sobre la entidad `Proyecto` del dominio; §3.3 de inclusión de términos en el glosario y §6 que lo verifica (5.1) | Regenerar contenido | documento de origen |
| `SDD/Docs/02-Especificacion-Funcional/Modelo-Datos/reglas-conceptuales-de-modelo/RC-05-Ausencia-De-Referencia-En-La-Variable-Compartida.md` | Rules-Especificacion-Funcional 2.0 → 4.0 | Vocabulario producto/proyecto de código (5.0), con el cuidado de §3.3 sobre la entidad `Proyecto` del dominio; §3.3 de inclusión de términos en el glosario y §6 que lo verifica (5.1) | Regenerar contenido | documento de origen |
| `SDD/Docs/02-Especificacion-Funcional/Modelo-Datos/reglas-conceptuales-de-modelo/RC-06-Irreflexividad-Del-Enlace.md` | Rules-Especificacion-Funcional 2.0 → 4.0 | Vocabulario producto/proyecto de código (5.0), con el cuidado de §3.3 sobre la entidad `Proyecto` del dominio; §3.3 de inclusión de términos en el glosario y §6 que lo verifica (5.1) | Regenerar contenido | documento de origen |
| `SDD/Docs/02-Especificacion-Funcional/Modelo-Datos/reglas-conceptuales-de-modelo/RC-07-Solidaridad-De-Las-Claves-Del-Enlace.md` | Rules-Especificacion-Funcional 2.0 → 4.0 | Vocabulario producto/proyecto de código (5.0), con el cuidado de §3.3 sobre la entidad `Proyecto` del dominio; §3.3 de inclusión de términos en el glosario y §6 que lo verifica (5.1) | Regenerar contenido | documento de origen |
| `SDD/Docs/02-Especificacion-Funcional/Modelo-Datos/reglas-conceptuales-de-modelo/RC-08-Aporte-Minimo-Del-Enlace.md` | Rules-Especificacion-Funcional 2.0 → 4.0 | Vocabulario producto/proyecto de código (5.0), con el cuidado de §3.3 sobre la entidad `Proyecto` del dominio; §3.3 de inclusión de términos en el glosario y §6 que lo verifica (5.1) | Regenerar contenido | documento de origen |
| `SDD/Docs/02-Especificacion-Funcional/Modelo-Datos/reglas-conceptuales-de-modelo/RC-09-Unicidad-Del-Enlace-Por-Par-Y-Claves.md` | Rules-Especificacion-Funcional 2.0 → 4.0 | Vocabulario producto/proyecto de código (5.0), con el cuidado de §3.3 sobre la entidad `Proyecto` del dominio; §3.3 de inclusión de términos en el glosario y §6 que lo verifica (5.1) | Regenerar contenido | documento de origen |
| `SDD/Docs/02-Especificacion-Funcional/Modelo-Datos/reglas-conceptuales-de-modelo/RC-10-Unicidad-Del-Enlace-De-Espera-Sin-Variable.md` | Rules-Especificacion-Funcional 2.0 → 4.0 | Vocabulario producto/proyecto de código (5.0), con el cuidado de §3.3 sobre la entidad `Proyecto` del dominio; §3.3 de inclusión de términos en el glosario y §6 que lo verifica (5.1) | Regenerar contenido | documento de origen |
| `SDD/Docs/02-Especificacion-Funcional/Modelo-Datos/reglas-conceptuales-de-modelo/RC-11-Coherencia-Entre-Referencia-Y-Resolucion.md` | Rules-Especificacion-Funcional 2.0 → 4.0 | Vocabulario producto/proyecto de código (5.0), con el cuidado de §3.3 sobre la entidad `Proyecto` del dominio; §3.3 de inclusión de términos en el glosario y §6 que lo verifica (5.1) | Regenerar contenido | documento de origen |
| `SDD/Docs/02-Especificacion-Funcional/Modelo-Datos/reglas-conceptuales-de-modelo/RC-12-Unicidad-De-La-Reserva-Por-Replica.md` | Rules-Especificacion-Funcional 2.0 → 4.0 | Vocabulario producto/proyecto de código (5.0), con el cuidado de §3.3 sobre la entidad `Proyecto` del dominio; §3.3 de inclusión de términos en el glosario y §6 que lo verifica (5.1) | Regenerar contenido | documento de origen |
| `SDD/Docs/02-Especificacion-Funcional/Modelo-Datos/reglas-conceptuales-de-modelo/RC-13-Unicidad-Del-Resumen-Del-Token.md` | Rules-Especificacion-Funcional 2.0 → 4.0 | Vocabulario producto/proyecto de código (5.0), con el cuidado de §3.3 sobre la entidad `Proyecto` del dominio; §3.3 de inclusión de términos en el glosario y §6 que lo verifica (5.1) | Regenerar contenido | documento de origen |
| `SDD/Docs/02-Especificacion-Funcional/Modelo-Datos/reglas-conceptuales-de-modelo/RC-14-Valores-Admitidos-Del-Formato-Del-Item.md` | Rules-Especificacion-Funcional 2.0 → 4.0 | Vocabulario producto/proyecto de código (5.0), con el cuidado de §3.3 sobre la entidad `Proyecto` del dominio; §3.3 de inclusión de términos en el glosario y §6 que lo verifica (5.1) | Regenerar contenido | documento de origen |
| `SDD/Docs/02-Especificacion-Funcional/Modelo-Datos/reglas-conceptuales-de-modelo/RC-15-Dependencia-Existencial-Del-Servicio.md` | Rules-Especificacion-Funcional 2.0 → 4.0 | Vocabulario producto/proyecto de código (5.0), con el cuidado de §3.3 sobre la entidad `Proyecto` del dominio; §3.3 de inclusión de términos en el glosario y §6 que lo verifica (5.1) | Regenerar contenido | documento de origen |
| `SDD/Docs/02-Especificacion-Funcional/Modelo-Datos/reglas-conceptuales-de-modelo/RC-16-Exclusion-Entre-Valor-Y-Marca-De-Secreta.md` | Rules-Especificacion-Funcional 2.0 → 4.0 | Vocabulario producto/proyecto de código (5.0), con el cuidado de §3.3 sobre la entidad `Proyecto` del dominio; §3.3 de inclusión de términos en el glosario y §6 que lo verifica (5.1) | Regenerar contenido | documento de origen |
| `SDD/Docs/02-Especificacion-Funcional/Modelo-Datos/reglas-conceptuales-de-modelo/RC-17-Vinculo-Por-Identidad-Del-Modelo.md` | Rules-Especificacion-Funcional 2.0 → 4.0 | Vocabulario producto/proyecto de código (5.0), con el cuidado de §3.3 sobre la entidad `Proyecto` del dominio; §3.3 de inclusión de términos en el glosario y §6 que lo verifica (5.1) | Regenerar contenido | documento de origen |
| `SDD/Docs/02-Especificacion-Funcional/Modelo-Datos/reglas-conceptuales-de-modelo/RC-18-Conservacion-Del-Historial-De-Despliegues.md` | Rules-Especificacion-Funcional 2.0 → 4.0 | Vocabulario producto/proyecto de código (5.0), con el cuidado de §3.3 sobre la entidad `Proyecto` del dominio; §3.3 de inclusión de términos en el glosario y §6 que lo verifica (5.1) | Regenerar contenido | documento de origen |
| `SDD/Docs/02-Especificacion-Funcional/Modelo-Datos/reglas-conceptuales-de-modelo/RC-19-Unicidad-Del-Puerto-Publicado-Por-Host.md` | Rules-Especificacion-Funcional 2.0 → 4.0 | Vocabulario producto/proyecto de código (5.0), con el cuidado de §3.3 sobre la entidad `Proyecto` del dominio; §3.3 de inclusión de términos en el glosario y §6 que lo verifica (5.1) | Regenerar contenido | documento de origen |
| `SDD/Docs/02-Especificacion-Funcional/README.md` | Rules-Especificacion-Funcional 2.0 → 4.0 | Vocabulario producto/proyecto de código (5.0), con el cuidado de §3.3 sobre la entidad `Proyecto` del dominio; §3.3 de inclusión de términos en el glosario y §6 que lo verifica (5.1). El índice suma la fila del glosario | Regenerar contenido | documento de origen |
| `SDD/Docs/03-UX-UI-DX/Experiencia-De-Uso.md` | Rules-UX-UI-DX 2.0 → 4.0 | Vocabulario producto/proyecto de código (5.0); `Glosario-UX.md` pasa de recomendado a obligatorio para los ocho tipos y §6 verifica existencia y completitud además de la no duplicación (5.1) | Regenerar contenido | documento de origen |
| `SDD/Docs/03-UX-UI-DX/Glosario-UX.md` | Rules-UX-UI-DX 2.0 → 4.0 | Vocabulario producto/proyecto de código (5.0); `Glosario-UX.md` pasa de recomendado a obligatorio para los ocho tipos y §6 verifica existencia y completitud además de la no duplicación (5.1). Pasa de artefacto recomendado a obligatorio, con su §6 verificando completitud | Regenerar contenido | documento de origen |
| `SDD/Docs/03-UX-UI-DX/Representaciones/Representacion-Banda-De-Resultado.md` | Rules-UX-UI-DX 2.0 → 4.0 | Vocabulario producto/proyecto de código (5.0); `Glosario-UX.md` pasa de recomendado a obligatorio para los ocho tipos y §6 verifica existencia y completitud además de la no duplicación (5.1) | Regenerar contenido | documento de origen |
| `SDD/Docs/03-UX-UI-DX/Representaciones/Representacion-Lenguaje-Visual-De-Estados.md` | Rules-UX-UI-DX 2.0 → 4.0 | Vocabulario producto/proyecto de código (5.0); `Glosario-UX.md` pasa de recomendado a obligatorio para los ocho tipos y §6 verifica existencia y completitud además de la no duplicación (5.1) | Regenerar contenido | documento de origen |
| `SDD/Docs/03-UX-UI-DX/Representaciones/Representacion-Nodo-De-Servicio.md` | Rules-UX-UI-DX 2.0 → 4.0 | Vocabulario producto/proyecto de código (5.0); `Glosario-UX.md` pasa de recomendado a obligatorio para los ocho tipos y §6 verifica existencia y completitud además de la no duplicación (5.1) | Regenerar contenido | documento de origen |
| `SDD/Docs/03-UX-UI-DX/Representaciones/Representacion-Sello-De-Version.md` | Rules-UX-UI-DX 2.0 → 4.0 | Vocabulario producto/proyecto de código (5.0); `Glosario-UX.md` pasa de recomendado a obligatorio para los ocho tipos y §6 verifica existencia y completitud además de la no duplicación (5.1) | Regenerar contenido | documento de origen |
| `SDD/Docs/03-UX-UI-DX/Wireframes/Wireframes-Acceso-Al-Panel.md` | Rules-UX-UI-DX 2.0 → 4.0 | Vocabulario producto/proyecto de código (5.0); `Glosario-UX.md` pasa de recomendado a obligatorio para los ocho tipos y §6 verifica existencia y completitud además de la no duplicación (5.1) | Regenerar contenido | documento de origen |
| `SDD/Docs/03-UX-UI-DX/Wireframes/Wireframes-Alta-De-Servicio.md` | Rules-UX-UI-DX 2.0 → 4.0 | Vocabulario producto/proyecto de código (5.0); `Glosario-UX.md` pasa de recomendado a obligatorio para los ocho tipos y §6 verifica existencia y completitud además de la no duplicación (5.1) | Regenerar contenido | documento de origen |
| `SDD/Docs/03-UX-UI-DX/Wireframes/Wireframes-Aprovisionamiento-Inicial.md` | Rules-UX-UI-DX 2.0 → 4.0 | Vocabulario producto/proyecto de código (5.0); `Glosario-UX.md` pasa de recomendado a obligatorio para los ocho tipos y §6 verifica existencia y completitud además de la no duplicación (5.1) | Regenerar contenido | documento de origen |
| `SDD/Docs/03-UX-UI-DX/Wireframes/Wireframes-Cajon-De-Cambios-Pendientes.md` | Rules-UX-UI-DX 2.0 → 4.0 | Vocabulario producto/proyecto de código (5.0); `Glosario-UX.md` pasa de recomendado a obligatorio para los ocho tipos y §6 verifica existencia y completitud además de la no duplicación (5.1) | Regenerar contenido | documento de origen |
| `SDD/Docs/03-UX-UI-DX/Wireframes/Wireframes-Cambio-De-Contrasena.md` | Rules-UX-UI-DX 2.0 → 4.0 | Vocabulario producto/proyecto de código (5.0); `Glosario-UX.md` pasa de recomendado a obligatorio para los ocho tipos y §6 verifica existencia y completitud además de la no duplicación (5.1) | Regenerar contenido | documento de origen |
| `SDD/Docs/03-UX-UI-DX/Wireframes/Wireframes-Catalogo-De-Plantillas.md` | Rules-UX-UI-DX 2.0 → 4.0 | Vocabulario producto/proyecto de código (5.0); `Glosario-UX.md` pasa de recomendado a obligatorio para los ocho tipos y §6 verifica existencia y completitud además de la no duplicación (5.1) | Regenerar contenido | documento de origen |
| `SDD/Docs/03-UX-UI-DX/Wireframes/Wireframes-Configuracion-Del-Sistema.md` | Rules-UX-UI-DX 2.0 → 4.0 | Vocabulario producto/proyecto de código (5.0); `Glosario-UX.md` pasa de recomendado a obligatorio para los ocho tipos y §6 verifica existencia y completitud además de la no duplicación (5.1) | Regenerar contenido | documento de origen |
| `SDD/Docs/03-UX-UI-DX/Wireframes/Wireframes-Descubrimiento-E-Incorporacion.md` | Rules-UX-UI-DX 2.0 → 4.0 | Vocabulario producto/proyecto de código (5.0); `Glosario-UX.md` pasa de recomendado a obligatorio para los ocho tipos y §6 verifica existencia y completitud además de la no duplicación (5.1) | Regenerar contenido | documento de origen |
| `SDD/Docs/03-UX-UI-DX/Wireframes/Wireframes-Exportacion-E-Importacion.md` | Rules-UX-UI-DX 2.0 → 4.0 | Vocabulario producto/proyecto de código (5.0); `Glosario-UX.md` pasa de recomendado a obligatorio para los ocho tipos y §6 verifica existencia y completitud además de la no duplicación (5.1) | Regenerar contenido | documento de origen |
| `SDD/Docs/03-UX-UI-DX/Wireframes/Wireframes-Imagenes.md` | Rules-UX-UI-DX 2.0 → 4.0 | Vocabulario producto/proyecto de código (5.0); `Glosario-UX.md` pasa de recomendado a obligatorio para los ocho tipos y §6 verifica existencia y completitud además de la no duplicación (5.1) | Regenerar contenido | documento de origen |
| `SDD/Docs/03-UX-UI-DX/Wireframes/Wireframes-Informe-De-Conflicto-De-Direcciones.md` | Rules-UX-UI-DX 2.0 → 4.0 | Vocabulario producto/proyecto de código (5.0); `Glosario-UX.md` pasa de recomendado a obligatorio para los ocho tipos y §6 verifica existencia y completitud además de la no duplicación (5.1) | Regenerar contenido | documento de origen |
| `SDD/Docs/03-UX-UI-DX/Wireframes/Wireframes-Lienzo-Del-Proyecto.md` | Rules-UX-UI-DX 2.0 → 4.0 | Vocabulario producto/proyecto de código (5.0); `Glosario-UX.md` pasa de recomendado a obligatorio para los ocho tipos y §6 verifica existencia y completitud además de la no duplicación (5.1) | Regenerar contenido | documento de origen |
| `SDD/Docs/03-UX-UI-DX/Wireframes/Wireframes-Listado-De-Proyectos.md` | Rules-UX-UI-DX 2.0 → 4.0 | Vocabulario producto/proyecto de código (5.0); `Glosario-UX.md` pasa de recomendado a obligatorio para los ocho tipos y §6 verifica existencia y completitud además de la no duplicación (5.1) | Regenerar contenido | documento de origen |
| `SDD/Docs/03-UX-UI-DX/Wireframes/Wireframes-Panel-Lateral-Del-Servicio.md` | Rules-UX-UI-DX 2.0 → 4.0 | Vocabulario producto/proyecto de código (5.0); `Glosario-UX.md` pasa de recomendado a obligatorio para los ocho tipos y §6 verifica existencia y completitud además de la no duplicación (5.1) | Regenerar contenido | documento de origen |
| `SDD/Docs/03-UX-UI-DX/Wireframes/Wireframes-Registro-Del-Contenedor.md` | Rules-UX-UI-DX 2.0 → 4.0 | Vocabulario producto/proyecto de código (5.0); `Glosario-UX.md` pasa de recomendado a obligatorio para los ocho tipos y §6 verifica existencia y completitud además de la no duplicación (5.1) | Regenerar contenido | documento de origen |
| `SDD/Docs/03-UX-UI-DX/Wireframes/Wireframes-Revision-De-Higiene.md` | Rules-UX-UI-DX 2.0 → 4.0 | Vocabulario producto/proyecto de código (5.0); `Glosario-UX.md` pasa de recomendado a obligatorio para los ocho tipos y §6 verifica existencia y completitud además de la no duplicación (5.1) | Regenerar contenido | documento de origen |
| `SDD/Docs/03-UX-UI-DX/Wireframes/Wireframes-Tablero-De-Estado.md` | Rules-UX-UI-DX 2.0 → 4.0 | Vocabulario producto/proyecto de código (5.0); `Glosario-UX.md` pasa de recomendado a obligatorio para los ocho tipos y §6 verifica existencia y completitud además de la no duplicación (5.1) | Regenerar contenido | documento de origen |
| `SDD/Docs/03-UX-UI-DX/Wireframes/Wireframes-Variables-Compartidas-Del-Proyecto.md` | Rules-UX-UI-DX 2.0 → 4.0 | Vocabulario producto/proyecto de código (5.0); `Glosario-UX.md` pasa de recomendado a obligatorio para los ocho tipos y §6 verifica existencia y completitud además de la no duplicación (5.1) | Regenerar contenido | documento de origen |
| `SDD/Docs/03-UX-UI-DX/README.md` | Rules-UX-UI-DX 2.0 → 4.0 | Vocabulario producto/proyecto de código (5.0); `Glosario-UX.md` pasa de recomendado a obligatorio para los ocho tipos y §6 verifica existencia y completitud además de la no duplicación (5.1) | Regenerar contenido | documento de origen |

**Resumen de clasificación.** 141 documentos emitidos, todos «regenerar contenido», más 1 artefacto ausente que la normativa vigente exige. **Cero documentos clasificados «revisar» y cero «no tocar»**, porque los cuatro archivos de reglas que gobiernan las categorías emitidas subieron major.

**Corrección de la columna de fuente de contenido, 2026-07-30** (hallazgo H-03 del audit `M4-00-Contexto-r1`). `Migracion-Rules.md` §2.1 declara que esa columna «es la forma en que §4.1 se vuelve verificable fila por fila», y el plan la había completado con «documento de origen» para las seis filas de `00-Contexto` por defecto. Dos documentos usaron además la segunda fuente admitida, y sus filas se corrigen:

| Documento | Fuente declarada al emitir el plan | Fuente real, verificada al cerrar el corte |
| --- | --- | --- |
| `SDD/Docs/00-Contexto/Vision-Producto.md` | documento de origen | **documento de origen + documento hermano** — §9 toma la entrada «Alcance» de `Alcance-Producto.md` §2.2, y la entrada «Brecha» de §6.3 del mismo hermano y de los controles `DoR-11` y `CA-10` |
| `SDD/Docs/00-Contexto/README.md` | documento de origen | **documento de origen + documento hermano** — §2 toma la columna de versión de los cinco hermanos, y §4 la confirmación del Product Owner del intake migrado |

No hay invención en ninguno de los dos casos: las tres incorporaciones se rastrean a una fuente admitida y las filas de control de cambios de los documentos ya lo declaraban. El defecto era de registro en el plan, que es el artefacto donde §6 criterio 1 pide que la declaración viva. **Consecuencia para los cortes siguientes**: la columna se verifica documento por documento al cerrar cada corte, y no se da por buena la fuente que el plan asignó por defecto a toda la categoría.

---

## 5 · Documentos fuera de alcance

Se enumeran con su razón, según `Migracion-Rules.md` §2.2, para que la migración no se lea como si hubiera cubierto todo.

| Artefacto | Por qué queda afuera |
| --- | --- |
| `SDD/Docs/Audit/A-00-01-r1.md`, `B-02-03-r1.md`, `B2-Fix-Definiciones-Servicio-r1.md` | Son **registros de auditoría** de la corrida bajo la 4.1, no artefactos de ninguna de las doce categorías. Reescribirlos bajo el vocabulario nuevo haría que el registro dejara de ser un registro, que es la misma razón por la que el framework no toca su propio `_legacy/` ni las filas históricas de sus controles de cambios |
| `SDD/Maquetas/SelfHosted-Service/` | Fuera de alcance por `Migracion-Rules.md` §2.2: se versiona con el repositorio, está exento del archivado y es material ejecutable que el humano edita a mano |
| `SDD/Estado/` (`Informe-Avance.md`, `Redefinicion-Servicio.md`, `Fix-Definir-Producto.md`, `Fix-Ejecución-Glosario-Framework.md`) | Documentos de trabajo del proceso, fuera de `SDD/Docs/` y de `SDD/Intake/`. El propio `Informe-Avance.md` declara su naturaleza: ningún subagente los consume como insumo. El alcance de §2.2 es `SDD/Intake/` y `SDD/Docs/` |
| `SDD/Docs/**/_legacy/` y `SDD/Intake/_legacy/` | Estados previos archivados. Un archivo que se corrige después deja de ser un archivo del estado que tenía |
| Código fuente y `/samples/` | El framework produce documentación de especificación, no código |
| `AGENTS.md` | Se regenera completo desde `Contrato-Agentes.md` en cada corrida de la Fase I. No está emitido en este destino |
| Categorías 04 a 11 | No están generadas. No hay documento que migrar; se generarán bajo la 6.0 cuando la corrida de generación llegue a ellas. La 04 además está excluida por gating (`usa_llm` == false) |

---

## 6 · Degradación declarada

**No aplica.** El destino declara bloque de procedencia en `SOLUTION-MANIFEST-SelfHosted-Service.md` §1.1, con el conjunto 4.1 y las dieciséis versiones de archivo que lo componen. La clasificación de saltos de §4.3 se aplica **por severidad** y no degradada a «revisar todo», y el conjunto de origen es reconstruible en `IA/IA.SDD/_legacy/4.1/`. No se supuso ninguna versión de origen.

El resultado práctico coincide en apariencia con el de una degradación —todos los documentos requieren tocarse— pero por una razón distinta y verificable: los saltos son efectivamente major, no desconocidos.

---

## 7 · Riesgos de esta migración en particular

Se declaran acá porque condicionan cómo se ejecutan M2 y M4, y porque el humano los tiene que ponderar antes de aprobar el plan.

| Riesgo | Por qué es propio de este destino | Mitigación prevista |
| --- | --- | --- |
| **`Proyecto` es entidad del dominio** | El producto documenta un agrupador de servicios llamado `Proyecto`, con CU, RC y wireframes propios. El renombre «proyecto» → «proyecto de código» de la `[5.0]` apunta a la unidad de compilación, no a esa entidad | Procedimiento por ocurrencia de `Vocabulario-Rules.md` §9.5, clasificando por sentido antes de sustituir. Además, `Intake-Rules.md` §5 exige que el intake **declare el choque de vocabulario** y defina los dos usos: es una fila nueva de la batería de M2 |
| **La cadena `soluci` dentro de «resolución»** | Aparece en RN-24, RC-11, el informe de conflicto de direcciones y la banda de resultado | Barrido negativo obligatorio al cerrar cada corte de M4 |
| **Volumen** | 141 documentos, todos a regenerar, con 100 solo en la categoría 02 | M4 se corta por categoría con audit independiente entre medio, y una migración parcial es un estado final legítimo (`Migracion-Rules.md` §4.6) |
| **Fase B2 en ejecución** | La especificación se acaba de corregir y la maqueta está pendiente de rehacer. Migrar ahora reescribe documentos que el fix acaba de tocar | **Resuelto por decisión D-M2 de §7.1**: se migra B2 incluida y su coherencia se evalúa después de M6 |
| **Correcciones manuales sobre el árbol** | 25 archivos modificados respecto de `HEAD` | `Migracion-Rules.md` §4.2 regla 3: el subagente que las encuentre enumera las diferencias, declara cómo las interpreta y espera confirmación, sin editar |

### 7.1 Decisiones del agente humano del proyecto

Tomadas el 2026-07-30 sobre la detención obligatoria de M1, y registradas acá porque condicionan la ejecución de las fases siguientes.

| # | Decisión | Alcance |
| --- | --- | --- |
| **D-M1** | **Plan aprobado.** M2 queda habilitada | La migración procede sobre las 143 filas de §4 con la clasificación emitida |
| **D-M2** | **La Fase B2 se migra.** No se cierra antes | Los documentos que el fix de definiciones de servicio tocó entran a M4 como cualquier otro. **Obligación correlativa**: terminada M6 hay que evaluar la coherencia de B2 sobre el árbol migrado y decidir si continúa o se reejecuta. Queda anotado como punto abierto de §7.2, no como parte de esta migración |
| **D-M3** | **Despacho de subagentes autorizado para M4** | M4 despacha al subagente titular de cada categoría, según `Migracion-Rules.md` §1.1 y el esqueleto de `Master-Prompt.md` §8 más el bloque de migración de `Migracion-Rules.md` §8. Sin esta autorización la migración habría tenido que declarar la desviación del anti-patrón «usar un subagente genérico» |
| **D-M4** | **El referente de «proyecto» se decide por contexto** | Incorporada como §3.5 paso 3. «Proyecto de código» designa la unidad D8, no un `.csproj` por el hecho de serlo; ante duda no se sustituye |
| **D-M5** | **La migración se declara cerrada**, el 2026-07-30, tras la ronda 2 de M6 | Dos rondas de auditoría independiente con **cero P0** y las 144 filas resueltas es lo que `Master-Prompt-Migracion.md` §10 pide para cerrar. Se declina una ronda 3: las dos rondas mostraron daño decreciente y hallazgos crecientes de **completitud de glosario**, que es un criterio nuevo de la `[5.1]` aplicado sobre un corpus grande y que va a seguir produciendo términos sin declarar en cada ronda. Eso es trabajo de calidad del glosario, no de la migración. Las 21 observaciones P2 y P3 quedan abiertas y declaradas |

### 7.2 Puntos abiertos que esta migración deja declarados

No son parte del alcance y no se resuelven acá. Se declaran para que no se pierdan.

| Punto | Cuándo se trata |
| --- | --- |
| **Coherencia de la Fase B2 sobre el árbol migrado**, y decisión de continuar o reejecutar. La maqueta está pendiente de rehacer y sus 16 superficies se verifican contra 03, que M4 va a reescribir | Después de M6 |
| **Las ~1370 ocurrencias de «proyecto» sin marca reconocible** se clasifican por ocurrencia en M4, no acá | Durante M4, documento por documento |
| **La `Linea-Base-Visual.md` y el `Contrato-Datos-Maqueta.md`** que `Deriva-Rules` 3.1 exige para un destino con `requiere_maqueta` == true no están emitidos | Los emite la Fase B2 bajo la 6.0, fuera de esta migración |

---

## 8 · Estado de las filas

Se completa durante M4 y se cierra en el informe de M6.

**Al emitirse este plan** (2026-07-30, versión 1.0), las 143 filas —141 documentos emitidos, 1 artefacto ausente y los 2 documentos de entrada— estaban **sin resolver**.

**Estado al cerrar el corte 3** (2026-07-30):

| Fila | Cantidad | Estado |
| --- | --- | --- |
| `SDD/Intake/` — intake y manifiesto | 2 | **Resueltas.** M2 y M3, con confirmación humana |
| `SDD/Docs/00-Contexto/` | 6 | **Resueltas.** Corte 1, audit `M4-00-Contexto-r1` APROBADO CON OBSERVACIONES |
| `SDD/Docs/01-Necesidades-Negocio/` | 10 | **Resueltas.** Corte 2, audit `M4-01-Necesidades-Negocio-r1` APROBADO CON OBSERVACIONES |
| `SDD/Docs/02-Especificacion-Funcional/` | 101 | **Resueltas.** Corte 3, audit `M4-02-Especificacion-Funcional-r2` APROBADO CON OBSERVACIONES tras un RECHAZADO en la ronda 1 |
| `SDD/Docs/03-UX-UI-DX/` | 25 | **Sin resolver.** Corte 4, pendiente |
| **Total resuelto** | **119 de 144** | |

El total es 144 y no 143: el artefacto ausente `Glosario-Funcional.md` se contaba aparte y quedó emitido en el corte 3, de modo que la categoría 02 pasa de 100 filas de documento emitido a 101 resueltas.

### 8.1 Corrección de la columna de fuente de contenido, del 2026-07-30

**Tres cortes seguidos produjeron el mismo hallazgo** —H-03 en el corte 1, y su repetición en los cortes 2 y 3—, y la causa es de este plan: la columna de §4 se completó con «documento de origen» **por defecto para toda la categoría**, y `Migracion-Rules.md` §2.1 declara que esa columna «es la forma en que §4.1 se vuelve verificable fila por fila». Una asignación por categoría no es una declaración por fila.

Corrección de alcance general, verificada al cerrar cada corte:

| Documento | Fuente real |
| --- | --- |
| `00-Contexto/Vision-Producto.md` | documento de origen **+ documento hermano** (§9 toma «Alcance» y «Brecha» de `Alcance-Producto.md`) |
| `00-Contexto/README.md` | documento de origen **+ documento hermano** (columna de versión) **+ intake** (confirmación del Product Owner) |
| `01-Necesidades-Negocio/Necesidades-Negocio.md` | documento de origen **+ documento hermano + intake** |
| `01-Necesidades-Negocio/README.md` | documento de origen **+ documento hermano + intake** |
| `02-Especificacion-Funcional/Glosario-Funcional.md` | **documento hermano** (el punto 6 heredado de `Modelo-Conceptual.md` y los 98 artefactos de 02) **+ intake** §12 |
| `02-Especificacion-Funcional/Especificacion-Funcional.md` | documento de origen **+ documento hermano** (censo de actores y conteos verificados contra los 98) |
| `02-Especificacion-Funcional/README.md` | documento de origen **+ documento hermano** |
| Las 13 filas de `CU-01` a `CU-13` y las 12 de `CU-27` a `CU-38` | documento de origen **+ intake** §13 (el campo `Nombre-Proyecto-Codigo` de la cabecera nueva) |
| Las 98 filas restantes de 02, las 6 de 00 y las 8 NB de 01 | documento de origen, sin excepción |

Ninguno de los casos es invención: las tres fuentes admitidas de §2.1 cubren todos, y los documentos ya lo declaraban en sus propias filas de control de cambios. El defecto era de registro en el plan, que es el artefacto donde §6 criterio 1 pide que la declaración viva.

### 8.2 Las 25 filas de `03-UX-UI-DX`, cerradas el 2026-07-30

**§8.1 declaró una consecuencia para el corte 4 —«la columna se declara documento por documento antes de despachar»— y esa consecuencia no se aplicó.** El corte 4 se despachó con la columna heredada, y el hallazgo `P1-02` del informe de M6 lo levantó como **cuarta ocurrencia consecutiva** del mismo defecto, con el agravante de que ya no queda corte siguiente donde corregirlo. Es defecto del orquestador: escribió la regla y no la ejecutó.

Se cierra acá, con la fuente real de las 25 filas:

| Documento | Fuente real |
| --- | --- |
| `03-UX-UI-DX/Glosario-UX.md` | **documento de origen + documento hermano + intake**. Es el caso más marcado de toda la migración: de sus 63 términos, 39 vienen del documento de origen y **24 salieron del barrido por ocurrencia sobre los 23 artefactos hermanos**; los 61 referenciados de §5 salieron de los dos glosarios upstream, y §5.3 y §6 del `PRODUCT-INTAKE` §12 y su anexo §20 E-18 |
| `03-UX-UI-DX/README.md` | **documento de origen + documento hermano**. §4 toma versiones y recuento del estado de los 23 hermanos en disco; §7 los recuentos de brecha de `Experiencia-De-Uso.md` §10.2; §9 las dos pendencias de ese mismo hermano y del `PRODUCT-MANIFEST` §1.1 |
| `03-UX-UI-DX/Experiencia-De-Uso.md` | **documento de origen + documento hermano**. Una celda de §2.2 cita `02-Especificacion-Funcional/Glosario-Funcional.md`, que es artefacto nuevo del corte 3: sin ese añadido el documento no declara contra qué se mide la no duplicación que §6 de la 4.0 verifica |
| Los 18 `Wireframes/Wireframes-*.md` y las 4 `Representaciones/Representacion-*.md` | **documento de origen + intake**. El campo de cabecera `Nombre-Proyecto-Codigo` se leyó del `PRODUCT-MANIFEST` §2, no se infirió del nombre de producto |

Los tres documentos que la declaran en su propio control de cambios —el glosario, el README y `Experiencia-De-Uso.md`— ya decían textualmente que su fuente **no es «documento de origen» a secas**. Lo que faltaba era que el plan lo dijera, que es donde `Migracion-Rules.md` §6 criterio 1 pide que la declaración viva.

**La lección, para que quede escrita y no se repita**: una consecuencia declarada en un plan no se ejecuta sola. Las tres primeras ocurrencias se cerraron corrigiendo el registro; la cuarta se produjo porque el orquestador confió en su propia nota en lugar de verificar la columna antes de despachar el corte.

---

## 9 · Control de cambios

| Versión | Fecha | Cambios | Autor |
| --- | --- | --- | --- |
| 1.3 | 2026-07-30 | **Cierre de la migración normativa**, declarado por el agente humano del proyecto. §7.1 suma la decisión **D-M5** con su fundamento y con la razón por la que se declina una ronda 3 de auditoría. Estado final: **144 de 144 filas resueltas**, migración **completa**, procedencia cerrada en el conjunto **6.0**, **cero hallazgos P0** en las dos rondas independientes de M6 y **cero P1 abiertos** tras corregirse los cinco que las dos rondas levantaron. Quedan abiertas 21 observaciones P2 y P3 y las siete inconsistencias del propio destino provenientes del fix de la Fase B2, que la migración enumeró y deliberadamente no propagó según `Migracion-Rules.md` §4.2 regla 3. Entre las P2, una conviene no perder de vista: el hallazgo `P1-02` quedó **reclasificado a P2 y no cerrado**, porque §8.1 y §8.2 declaran la fuente de contenido real pero la celda de la tabla de §4 sigue diciendo «documento de origen» para 141 filas, de modo que el plan se contradice a sí mismo en dos lugares. Los siete informes de auditoría de la corrida quedan en `SDD/Docs/Audit/`. | Orquestador de migración normativa SDD |
| 1.2 | 2026-07-30 | **Cierre del plan al terminar la migración**, y **corrección del hallazgo `P1-r2-01` del informe de M6 ronda 2**, que levantó que este documento se había editado tres veces después de su aprobación **sin una sola fila de control de cambios**. El defecto era del orquestador: el plan es artefacto de `Migracion-Rules.md` §2.1 y le rige el versionado de D5 como a cualquier otro. Las tres ediciones que faltaban registrar, todas del 2026-07-30, quedan declaradas acá. **§3.5 Paso 2.b**, incorporado al cerrar el corte 3: registra las dos correcciones al procedimiento que ese corte expuso —la regla R4 era insuficiente para las categorías de **nivel proyecto de código**, cuya §4.1 exige `**Proyecto de código:** {{Nombre-Proyecto-Codigo}}` y que quedaban sin el campo que su propia regla pide; y el archivado iba en el `_legacy/` de **cada carpeta** y no espejado bajo la raíz de la categoría—. **§8**, reescrito: pasa de declarar las 143 filas «sin resolver» al estado real por corte, con el total de 144 resueltas. **§8.1**, incorporado tras el tercer hallazgo consecutivo sobre la columna de fuente de contenido: declara la fuente real documento por documento en lugar de asignarla por categoría. **§8.2**, incorporado al cerrar M6: cierra esa columna para las 25 filas de `03-UX-UI-DX`, que era la cuarta ocurrencia del mismo hallazgo y la única sin corte siguiente donde corregirse. El estado del documento pasa de `Aprobado` a **`Ejecutado y cerrado`**. **No se archiva estado previo**: este destino no tiene precedente de archivar los artefactos de `SDD/Docs/Audit/`, que `Master-Prompt.md` §10 trata como registros por ronda, y hacerlo acá inauguraría una convención en la última fase de la corrida. Queda declarado en lugar de decidido en silencio. | Orquestador de migración normativa SDD |
| 1.1 | 2026-07-30 | **Plan aprobado** en la detención de M1, con las cuatro decisiones del agente humano del proyecto registradas en §7.1. Suma **§3.5, el procedimiento de sustitución léxica por ocurrencia**, que es la sección operativa del renombre y la más riesgosa de la migración: censo con evidencia —2901 ocurrencias de `proyecto*`, 680 de «solución», 167 de «resolución»—, clasificación en ocho referentes con lo que se hace con cada uno, la advertencia de que «proyecto de código» designa la unidad D8 y no un `.csproj` por serlo, y cinco barridos negativos obligatorios por corte. El hallazgo que cambia el riesgo de la migración: **el destino ya había desambiguado su vocabulario por su cuenta**, con 680 ocurrencias bajo la forma calificada «proyecto SelfHosted» en 95 de sus 147 archivos, y su propio `Fix-Definir-Producto.md` ya había levantado la distinción entre la unidad D8 y el proyecto de Visual Studio. Suma **§7.2** con los tres puntos abiertos que la migración deja declarados y no resuelve. La fila de riesgo de la Fase B2 pasa de «decisión del humano» a resuelta por D-M2. Ninguna fila de §4 cambió de clasificación ni de fuente de contenido. | Orquestador de migración normativa SDD |
| 1.0 | 2026-07-29 | Plan inicial, emitido por la fase M1 del orquestador de migración normativa sobre un destino sin informe de reconciliación previo. Declara el par de versiones 4.1 → 6.0 con el conjunto de origen reconstruible, los veintiún saltos de la tabla de §2 —todos major—, los tres renombres de archivo, los cinco de identificador y los tres de término leídos de los bloques «Impacto sobre destinos existentes» de las entradas `[5.0]` y `[6.0]`, las 143 filas de documento con su clasificación y su fuente de contenido, los siete conjuntos fuera de alcance con su razón, la constancia de que la degradación de §4.5 no aplica y los cinco riesgos propios de este destino. Ningún documento fue modificado al emitirlo. | Orquestador de migración normativa SDD |
