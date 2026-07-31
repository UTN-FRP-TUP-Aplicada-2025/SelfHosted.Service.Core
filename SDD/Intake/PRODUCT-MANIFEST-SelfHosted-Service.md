# PRODUCT-MANIFEST-SelfHosted-Service

Artefacto derivado. El orquestador SDD lo construyó a partir de `PRODUCT-INTAKE-SelfHosted-Service.md` §13, siguiendo `Intake-Rules.md` §4 y el formato de `PRODUCT-MANIFEST-template.md`. No se completa a mano.

**Re-derivación del 2026-07-29, versión 1.7.** Es la segunda re-derivación del día y la primera que **cambia la composición**. `Master-Prompt.md` §13.7 la obliga: la modificación de §13 del intake quitó tres proyectos de código. El agente humano del proyecto decidió que las cuatro capas de la Clean Architecture se compilen en **un único proyecto de código** y se separen por espacio de nombres, tras observar que el producto es un único despliegue y que ninguna de las cuatro unidades se publicaba ni se consumía por separado.

**Este producto es el caso degenerado del framework.** Con un único proyecto, `Master-Prompt.md` §3.5 aplana la salida: las doce categorías se generan directamente bajo `SDD/Docs/`, sin el subnivel `Proyectos/<Nombre-Proyecto-Codigo>/` y sin la carpeta `Producto/`. No hay vista de producto ni pipeline de producto que consolidar en la Fase H, porque no hay jerarquía que documentar.

**Procedencia del framework.** El bloque de §1.1 declara el conjunto **6.0**, cerrado en la fase M5 de la migración normativa el 2026-07-30 tras verificarse que las 144 filas del plan quedaron resueltas. Las versiones se leyeron del `CHANGELOG.md` del repositorio fuente y de la cabecera de cada archivo, no se infirieron. El historial de cómo llegó hasta acá —la emisión bajo la 4.0, la actualización a 4.1 y el cierre a 6.0— vive en el control de cambios de este documento.

---

## §1 Bloque de producto

Las cuatro identidades del producto, separadas según la decisión D-F del agente humano del proyecto del 2026-07-29 y declaradas en la sección «Identidad del producto» del intake. Cada una tiene su consumidor y no son renderizaciones tipográficas de un mismo nombre.

| Campo | Valor | Origen |
|---|---|---|
| `Nombre-Producto` | SelfHosted Service | Declarado en la cabecera del intake |
| `Slug-Producto` | `SelfHosted-Service` | Derivado del nombre de producto por `Master-Prompt.md` §3.2 |
| `Raiz-Codigo` | `SelfHosted.Service.Core` | Declarado en el perfil de convención de `PRODUCT-INTAKE` §13 |
| `Artefacto-Agrupacion` | `SelfHosted.Service.Core.sln` | Derivado como `<Raiz-Codigo>.sln` |
| Proyecto de código principal | `SelfHosted-Service` | `PRODUCT-INTAKE` §13. Es el único proyecto de código, de modo que «principal» no discrimina: el campo se declara porque `Master-Prompt.md` §3.1 exige exactamente un principal, y lo satisface trivialmente |
| Cantidad de proyectos de código | 1 | Caso degenerado de `Master-Prompt.md` §3.5 |
| Intake (origen) | `PRODUCT-INTAKE-SelfHosted-Service.md` (de su §13 se deriva este manifiesto) | — |
| Documento | `PRODUCT-MANIFEST-SelfHosted-Service.md` | — |
| Versión | 2.1 | — |
| Fecha | 2026-07-30 | — |
| Estado | **Vigente.** Re-derivado en la fase M3 de la migración normativa 4.1 → 6.0 y **confirmado por el agente humano del proyecto el 2026-07-30**. La versión 2.1 cierra la procedencia en la fase M5, con la cadena verificada completa | — |

**Nota de derivación de `Slug-Producto`.** Se deriva del **nombre de producto**, no de la identidad de código, aplicando los pasos 1 a 7 de `Master-Prompt.md` §3.2 a «SelfHosted Service»: separar por espacios, capitalizar la inicial de cada palabra y unir con guion medio da `SelfHosted-Service`. Es la decisión F-1 (b) del agente humano del proyecto: seguir la derivación en lugar de declarar el slug estable, de modo que la regla del framework se cumpla sin excepción local.

**Nota de derivación de `Raiz-Codigo`.** Es un **valor declarado**, no derivado. El algoritmo de `Master-Prompt.md` §3.2 concatena sin separadores y produciría `SelfHostedServiceCore`, una raíz que ningún artefacto de este producto usa: la solución de código es `SelfHosted.Service.Core`, que es el argumento `-n` con el que se crea, el nombre de su archivo `.sln` y la raíz de todos sus espacios de nombres. El framework no declara qué prevalece cuando el perfil de §13 fija un literal; este producto declara que el valor del perfil prevalece, y lo registra acá para que la derivación sea auditable en lugar de tácita.

**Nota de derivación de `Identidad-Codigo`.** El proyecto lleva la identidad de código **a secas**, `SelfHosted.Service.Core`, sin el sufijo de rol que la composición `<Raiz-Codigo>.<Sufijo>` de `Master-Prompt.md` §3.2 prescribe. Es una **desviación declarada** de esa regla, decidida por el agente humano del proyecto el 2026-07-29, y se toma a cambio de una propiedad concreta: con el proyecto sin sufijo, las cuatro capas quedan simétricas —una carpeta de la raíz del proyecto y un segmento propio del espacio de nombres cada una, incluida la presentación agrupada bajo `Web/`— y la regla de aislamiento `[E]` de `Requerimientos-Tecnicos.md` §2 se cita literal, sin reexpresar su referente. La forma compuesta `SelfHosted.Service.Core.Web` se evaluó ese mismo día y se descartó: cumplía §3.2 pero anidaba las capas bajo `.Web`, dejaba a la presentación sin segmento propio y obligaba a reexpresar el referente de una regla marcada `[E]`. El detalle está en §16 del intake.

### §1.1 Procedencia del framework

Declara bajo qué normativa se genera la documentación de este producto. El orquestador lo completó al re-derivar el manifiesto, leyendo la entrada vigente del `CHANGELOG.md` del repositorio fuente y el campo `Versión` de la cabecera de cada archivo que va a aplicar. Se actualiza cuando el árbol se genera, o se adecua, bajo una versión distinta del framework.

**Actualizado a 6.0 el 2026-07-30**, en la fase M5 de la migración normativa. La tabla declara el conjunto **vigente**, que es bajo el que la documentación queda expresada, no el conjunto bajo el que se emitió por primera vez.

El árbol se emitió bajo la **4.0**, se adecuó a la **4.1** el 2026-07-29 —cuando el framework subió de versión con la Fase A en curso, moviendo `Master-Prompt`, `Root-Rules`, `Rules-Contexto` y `Rules-Plan-Sprint`— y se migró a la **6.0** el 2026-07-30, atravesando los saltos major `[5.0]`, `[5.1]` y `[6.0]`. Los tres tramos están registrados en el control de cambios; el detalle del último vive en [`Plan-Migracion-4.1-a-6.0.md`](../Docs/Audit/Plan-Migracion-4.1-a-6.0.md).

| Artefacto del framework | Versión |
|---|---|
| Framework SDD (conjunto) | **6.0** (`CHANGELOG.md`, entrada `[6.0] - 2026-07-29`) |
| `Master-Prompt` | 5.2 |
| `Root-Rules` | 3.1 |
| `Rules-Contexto` | 3.1 |
| `Rules-Necesidades-Negocio` | 3.1 |
| `Rules-Especificacion-Funcional` | 4.0 |
| `Rules-UX-UI-DX` | 4.0 |
| `Rules-Arquitectura-Tecnica` | 3.1 |
| `Rules-Backlog-Tecnico` | 3.1 |
| `Rules-Plan-Sprint` | 3.1 |
| `Rules-Calidad-Y-Pruebas` | 3.1 |
| `Rules-Devops` | 3.1 |
| `Rules-Examples` | 4.1 |
| `Rules-Documentacion` | 4.1 |
| Reglas transversales aplicadas | `Intake-Rules` 3.2 y `Vocabulario-Rules` 2.1, que van en todo despacho; `Migracion-Rules` 1.0, porque este árbol atravesó una migración normativa; `Maqueta-Rules` 3.1 y `Deriva-Rules` 3.1 por la Fase B2 prevista |
| `PRODUCT-INTAKE-template` | 2.1 |
| `PRODUCT-MANIFEST-template` | 4.1 |

**Procedencia cerrada el 2026-07-30, al terminar la fase M5 de la migración normativa 4.1 → 6.0.** Las catorce filas de arriba pasaron de declarar el conjunto **4.1** a declarar el **6.0**, y las dos de plantilla ya lo declaraban desde la versión 2.0 de este manifiesto. La **nota de estado mixto** que esa versión llevaba acá **se retira porque dejó de ser cierta**: ya no hay dos cosas distintas que declarar.

**Qué autoriza a cerrarla.** `Master-Prompt-Migracion.md` §9 condiciona la reescritura a que **toda la cadena haya quedado migrada**, y §4.6 de `Migracion-Rules.md` hace de una procedencia cerrada sobre un árbol migrado a medias un hallazgo P0. La verificación de M5, corrida sobre disco el 2026-07-30:

| Qué se verificó | Resultado |
|---|---|
| Filas del plan de migración resueltas | **144 de 144** — 142 documentos de `SDD/Docs/`, el intake y este manifiesto |
| Documentos clasificados «regenerar» que quedaron sin tocar | ninguno |
| Secciones exigidas por la normativa vigente emitidas como pendientes y sin respuesta | ninguna |
| Estados previos archivados en el `_legacy/` de su propia carpeta | los 142; `Glosario-Funcional.md` no tiene, por ser artefacto nuevo |
| Hallazgos P0 abiertos | **0** |
| Hallazgos P1 abiertos | **0** |
| Identificadores y nombres de artefacto legados vivos fuera de las filas de control de cambios | 0 |
| Daño de sustitución léxica: «reproducto», concordancias de género rotas, citas a `_legacy/` que no resuelven | 0, 0 y 0 |

Los cinco informes de auditoría de M4 están en `SDD/Docs/Audit/`: `M4-00-Contexto-r1`, `M4-01-Necesidades-Negocio-r1`, `M4-02-Especificacion-Funcional-r1` y `-r2`, y `M4-03-UX-UI-DX-r1`. El corte de `02` necesitó **dos rondas**: la primera dio RECHAZADO por un P0 —cincuenta y nueve documentos citaban una ruta de archivado que no resolvía, residuo de una consolidación del orquestador— y la segunda, tras la corrección, dio APROBADO CON OBSERVACIONES. Los otros tres cortes aprobaron en una ronda.

**Lo que sigue abierto, y por qué no impide cerrar.** Quedan doce observaciones de audit de nivel P2 y P3, que `Master-Prompt.md` §10 declara documentables sin bloquear, y **siete inconsistencias del propio destino que la migración enumeró y deliberadamente no propagó**, según la regla de correcciones manuales de `Migracion-Rules.md` §4.2. Ninguna la introdujo esta migración: todas provienen del fix de definiciones de servicio de la Fase B2, que estaba en curso al migrar. Están declaradas documento por documento en las filas de control de cambios que las contienen y en el informe de M6. La más relevante para esta sección: **el flag `requiere_maqueta` no tiene valor declarado en ninguna fuente**, de modo que las dos reglas de la Fase B2 siguen figurando como previstas y no como aplicadas.

`Rules-Prompts-AI` no figura porque la categoría 04 queda excluida por gating: el proyecto de código no declara uso de LLM en su bloque §17 (`usa_llm` == false). Las dos reglas transversales de la Fase B2 se declaran como previstas y quedan sujetas a la confirmación del flag `requiere_maqueta`; si el agente humano declina la fase, esa fila se corrige en la versión siguiente.

**Sobre el salto 4.0 → 4.1 y por qué no dispara la reconciliación de §2.1.** El salto es **minor** en los cuatro artefactos, y la reconciliación normativa de `Master-Prompt.md` §2.1 clasifica el impacto por la propia numeración: un salto minor no marca ningún documento como potencialmente invalidado. Además la reconciliación se dispara al **arrancar** sobre un destino con documentación previa, y acá el framework se movió con la corrida en curso, que es un caso que §2.1 no cubre. Se resolvió por decisión del agente humano del proyecto el 2026-07-29: **adecuar la Fase A a 4.1** en lugar de cerrarla bajo 4.0 y evaluar el salto al empezar la Fase B.

**Qué de 4.1 alcanzó efectivamente a lo ya emitido.** El `CHANGELOG.md` del framework afirma que «ninguna documentación ya emitida deja de cumplir». Para este producto esa afirmación **no se sostuvo**, y se registra acá porque es una afirmación sobre el estado del sistema y D9 exige contrastarla. `Rules-Contexto` 2.1 retira de AG-00 la autoridad de originar exclusiones y prioridades MoSCoW, y suma a §6 el criterio «ninguna prioridad MoSCoW, exclusión, fecha objetivo, target de métrica ni criterio de transición de fase se origina en esta categoría».

La adecuación se ejecutó pasando los seis documentos de `00-Contexto/` por el catálogo de dieciocho ambigüedades de `Rules-Contexto` §6.1, que es nuevo en 2.1. **Lo que efectivamente dejó de cumplir es más acotado que lo que la primera lectura del orquestador supuso**, y conviene declararlo con precisión porque la versión 1.8 de este manifiesto afirmaba otra cosa:

| Qué se revisó | Veredicto |
|---|---|
| Las cinco exclusiones `F-18` a `F-22` del `Alcance-Producto.md` | **Derivables, no originadas.** El intake §4 las declara `Won't Have v1` —etiqueta MoSCoW con la que el Product Owner declara la exclusión— y §9 trae las exclusiones correspondientes, las siete marcadas `[E]`. AG-00 las formalizó, que es exactamente su trabajo bajo 2.1. No hubo nada que elevar |
| Evaluación de los riesgos de plataforma `RP-01` a `RP-03` | **Originada en la categoría.** El intake enuncia los tres riesgos y asigna su medición a PT-01 y a la categoría 08, pero **no los evalúa**: probabilidad, impacto y responsable se habían asignado sin fuente. Corregido: las tres columnas declaran la ausencia y la evaluación queda como brecha |
| Columna `Responsable` de los riesgos `RG-01` a `RG-10` | **Originada**, ya detectada por el audit como hallazgo H-01 y corregida antes de esta adecuación |
| Horizonte de reincorporación de `F-18` y tres justificaciones glosadas | **Originados.** Retirados; la columna de versión futura declara «no declarada por la fuente» donde el intake calla |
| `Roadmap-Producto.md` y `Acuerdo-Equipo.md` | **Limpios.** Los 29 criterios de transición se transcriben de §22.4 uno a uno; los 28 `AT`, 12 `DoD` y 12 `DoR` vienen de §22.6 sin alteración |

**La conclusión, que es distinta de la que la versión 1.8 declaraba.** Ninguna decisión de exclusión y ningún target de métrica se había originado en la categoría, que era la preocupación de fondo. Lo que 2.1 expuso fue una **tabla de evaluación de riesgos sin fuente** y un puñado de glosas: la regla nueva no invalidó el contenido de la categoría, hizo visible que le faltaba declarar su propia derivación. La afirmación del changelog sigue sin sostenerse —hay artefactos emitidos que dejaron de cumplir un criterio nuevo—, pero su alcance es menor y de otra naturaleza que la que se supuso al decidir la adecuación.

**Corrección de alcance que la composición nueva obliga.** Las trece reglas de categoría se aplican ahora **una sola vez** y no cuatro. `Root-Rules` sigue aplicándose para el README raíz de `SDD/Docs/`. Lo que deja de aplicarse es la parte de `Rules-Arquitectura-Tecnica` y de `Rules-Devops` que gobierna los artefactos de nivel producto —`Producto/Vista-Producto.md` y `Producto/Pipeline-Producto.md`—, que `Master-Prompt.md` §3.5 y §11 omiten en el caso degenerado. Ninguna versión de la tabla cambia: cambia cuántas veces se despacha cada regla.

#### Decisiones de reconciliación

Sin filas. La reconciliación normativa del 2026-07-28 se resolvió con la salida B (regenerar desde cero), que no deja registro en esta tabla: el registro de lo que pasó es este mismo bloque de procedencia reescrito con la versión nueva. La tabla queda declarada para el caso de que alguna reconciliación futura se resuelva con la salida C.

### §1.2 Perfil de convención de nombres

| Parámetro | Valor | Notas |
|---|---|---|
| `Raiz-Codigo`, forma del nombre de producto en código | `SelfHosted.Service.Core` | Declarado en `PRODUCT-INTAKE` §13, no derivado. Es la raíz de los espacios de nombres |
| Separador de segmentos | `.` | Separa la identidad de código de los segmentos de capa |
| `Identidad-Codigo` del proyecto único | `SelfHosted.Service.Core` | Coincide con `Raiz-Codigo`. Desviación declarada de `Master-Prompt.md` §3.2: ver la nota de derivación de §1 |
| `Artefacto-Agrupacion` | `SelfHosted.Service.Core.sln` | Derivado como `<Raiz-Codigo>.sln`. Parámetro que el framework no modela y que este producto declara en el perfil de §13 del intake |
| Prefijo de paquetes redistribuibles | `Aplicada` | No se aplica: el proyecto de código no es redistribuible y no se publica ningún paquete |

### §1.3 Independencia de los dos planos de nombres

**`Nombre-Proyecto-Codigo` coincide con `Slug-Producto`, y la coincidencia es por construcción.** Los dos valen `SelfHosted-Service`. No es una casualidad ni un descuido de derivación: en el caso degenerado el proyecto de código **es** el producto, de modo que el identificador documental de uno y el de la otra nombran la misma cosa. Se declara acá porque dos campos con el mismo literal, sin explicación, se leen como el defecto que la separación de identidades de D-F vino a eliminar, y no lo son.

Qué se sigue de eso, para que nadie lo interprete de más:

- El campo se conserva porque el formato del manifiesto lo exige y porque el orquestador lo usa para derivar rutas. No se le inventa un valor propio para que se vea distinto del del producto: eso sí sería un nombre que no nombra nada.
- Su **único consumidor efectivo** en este producto es `SDD/Maquetas/<Nombre-Proyecto-Codigo>/`, que resuelve a `SDD/Maquetas/SelfHosted-Service/`. `SDD/Docs/` no lo usa: el caso degenerado aplana la salida y elimina el subnivel `Proyectos/<Nombre-Proyecto-Codigo>/`.
- Si más adelante el producto incorpora un segundo proyecto de código, los dos identificadores **dejan de coincidir** y cada uno recupera su función. La coincidencia es una propiedad del caso degenerado, no una regla nueva.


El `Nombre-Proyecto-Codigo` y el `Identidad-Codigo` divergen a propósito y la divergencia es legítima. Es la sub-decisión E-1 (a) del agente humano del proyecto del 2026-07-29, que sobrevive al colapso de la composición.

| Plano | Forma | Valor | Qué gobierna |
|---|---|---|---|
| Documentación | `Nombre-Proyecto-Codigo`, Título-Con-Guiones | `SelfHosted-Service`, idéntico a `Slug-Producto` por lo declarado arriba | `SDD/Maquetas/<Nombre-Proyecto-Codigo>/` y nada más. `Master-Prompt.md` §3.5 aplana `SDD/Docs/` y omite el subnivel `Proyectos/<Nombre-Proyecto-Codigo>/` |
| Código | `Identidad-Codigo`, segmentos con punto | `SelfHosted.Service.Core` | `/src`, `/tests`, el `.csproj`, el espacio de nombres raíz del que cuelgan las cuatro capas, y el pipeline |

---

## §2 Tabla de proyectos de código

| `Nombre-Proyecto-Codigo` | `Identidad-Codigo` | `tipo_proyecto_codigo` (D8) | Rol en el producto | `redistribuible` | Dependencias | Path `/src` | Path `SDD/Docs/` |
|---|---|---|---|---|---|---|---|
| `SelfHosted-Service` | `SelfHosted.Service.Core` | `web-monolith` | Único proyecto de código y único ejecutable: páginas Blazor Interactive Server, controladores REST `/api/v1` y servicios en segundo plano en un solo proceso, con las cuatro capas de la Clean Architecture como espacios de nombres internos (principal) | false | — | `src/SelfHosted.Service.Core/` | `SDD/Docs/` (plano, caso degenerado) |

Los proyectos de prueba (`SelfHosted.Service.Core.Domain.Tests`, `SelfHosted.Service.Core.Application.Tests`, `SelfHosted.Service.Core.Integration.Tests`) no son proyectos de la composición: son artefactos de la estrategia de testing (§17.P.6 del intake) y viven bajo `/tests`. Toman la raíz de la identidad de código por la sub-decisión E-2 (a) del agente humano del proyecto.

### §2.1 Capas internas del proyecto de código

No son proyectos de la composición y el orquestador **no genera categorías por capa**. Se declaran acá porque conservan el grafo de dependencias y el orden que hasta la versión 1.6 vivía entre proyectos de código, y porque las categorías 05, 08 y 09 los consumen como estructura interna del único proyecto.

| Espacio de nombres | Carpeta | Depende de | Nivel |
|---|---|---|---|
| `SelfHosted.Service.Core.Domain` | `Domain/` | — | 0 |
| `SelfHosted.Service.Core.Application` | `Application/` | `Domain` | 1 |
| `SelfHosted.Service.Core.Infrastructure` | `Infrastructure/` | `Application`, `Domain` | 2 |
| `SelfHosted.Service.Core.Web` | `Web/` | `Application`, `Infrastructure`, `Domain` | 3 |

Las cuatro capas son simétricas: una carpeta de la raíz del proyecto y un espacio de nombres propio cada una, incluida la presentación, agrupada bajo `Web/`. `Program.cs` no pertenece a ninguna: es la raíz de composición y queda exenta de la regla de dependencia. Las seis aristas son las mismas que la versión 1.6 declaraba entre proyectos de código. Lo que cambió es quién las hace cumplir: antes el grafo de referencias de proyecto y el compilador; ahora el test de arquitectura de §17.P.6 del intake, que es gate bloqueante del pipeline.

---

## §3 Grafo de dependencias

Entre proyectos de código, el grafo es **trivial**: un nodo, sin aristas.

```text
SelfHosted-Service   (web-monolith, principal y único)
```

Orden topológico:

```text
nivel 0: SelfHosted-Service  (principal)
```

Un único proyecto de código en un único nivel: la generación no admite paralelización porque no hay nada que paralelizar. El grafo de cuatro niveles que la versión 1.6 declaraba sobrevive como grafo de capas en §2.1, y gobierna el orden de construcción de cada corte vertical, no el orden de generación de la documentación.

---

## §4 Validaciones bloqueantes

| Validación | Resultado |
|---|---|
| Cada `tipo_proyecto_codigo` pertenece al conjunto cerrado D8 | Cumple: `web-monolith` ×1 |
| Hay exactamente un proyecto principal | Cumple trivialmente: hay un solo proyecto y por lo tanto es el principal. La validación existe para detectar cero o más de uno, y ninguno de los dos casos se da |
| Sin colisión de `Nombre-Proyecto-Codigo` ni de `Identidad-Codigo` | Cumple trivialmente: un solo proyecto, un solo nombre en cada plano |
| Cada dependencia referencia un proyecto existente | Cumple por vacuidad: no hay dependencias entre proyectos de código |
| El grafo de dependencias es acíclico | Cumple: un nodo sin aristas es acíclico. El grafo de capas de §2.1 también lo es, con cuatro niveles estrictos |
| §13 del intake es recorrible | Cumple: sin filas de ejemplo, perfil de convención declarado con sus cinco parámetros, campos bloqueantes completos |
| Los `redistribuible: true` arrancan con el prefijo de organización | No aplica: el proyecto no es redistribuible |

**Validación adicional del caso degenerado**, que `Master-Prompt.md` §3.5 obliga a verificar y que no estaba en la lista de §3.1 porque hasta ahora no aplicaba: con un único proyecto, el orquestador debe aplanar el layout de salida y omitir `Proyectos/` y `Producto/`. Verificado y declarado en §1 y en la columna de path de §2.

---

## Control de cambios

| Versión | Fecha | Cambios | Autor |
|---|---|---|---|
| 2.1 | 2026-07-30 | **Cierre de la procedencia del framework**, fase M5 de la migración normativa 4.1 → 6.0. Sube **minor**: no cambia la derivación desde §13 del intake ni ninguna estructura, incorpora el dato que la migración vino a producir. Es el mismo criterio con el que la versión 1.8 actualizó la procedencia de 4.0 a 4.1. **§1.1 pasa sus catorce filas de 4.1 a 6.0** —`Master-Prompt` 4.1 → 5.2, `Root-Rules` 2.1 → 3.1, `Rules-Contexto` 2.1 → 3.1, `Rules-Necesidades-Negocio` 2.0 → 3.1, `Rules-Especificacion-Funcional` 2.0 → **4.0**, `Rules-UX-UI-DX` 2.0 → **4.0**, `Rules-Arquitectura-Tecnica`, `Rules-Backlog-Tecnico`, `Rules-Plan-Sprint`, `Rules-Calidad-Y-Pruebas` y `Rules-Devops` a 3.1, y `Rules-Examples` y `Rules-Documentacion` a 4.1—. La fila de transversales suma **`Vocabulario-Rules` 1.0 → 2.1**, que no existía en la 4.1 y que `Master-Prompt.md` §8 inyecta en todo despacho, y **`Migracion-Rules` 1.0**, porque este árbol atravesó una migración normativa; `Intake-Rules` pasa a 3.2 y las dos reglas de la Fase B2 a 3.1. Las dos filas de plantilla ya declaraban 2.1 y 4.1 desde la versión 2.0. **La nota de estado mixto se retira** porque dejó de ser cierta, y la reemplaza la nota de cierre con la tabla de verificación de M5. **Lo que autoriza el cierre**: las **144 filas del plan quedaron resueltas** —142 documentos de `SDD/Docs/` más los dos de entrada—, ningún documento clasificado «regenerar» quedó sin tocar, ninguna sección exigida quedó pendiente sin respuesta, los 142 estados previos están archivados en el `_legacy/` de su propia carpeta, y **no hay ningún hallazgo P0 ni P1 abierto** en los cinco informes de auditoría de M4. `Migracion-Rules.md` §4.6 hace de una procedencia cerrada sobre un árbol migrado a medias un hallazgo P0, y por eso la verificación se corrió sobre disco y no sobre lo que los subagentes declararon. **Lo que queda abierto y no lo impide**: doce observaciones de audit P2 y P3, que `Master-Prompt.md` §10 declara documentables sin bloquear, y siete inconsistencias del propio destino provenientes del fix de la Fase B2 que la migración enumeró y **no propagó**, según la regla de correcciones manuales de `Migracion-Rules.md` §4.2 regla 3. Entre ellas, la que alcanza a esta sección: el flag `requiere_maqueta` sigue sin valor declarado en ninguna fuente, de modo que `Maqueta-Rules` y `Deriva-Rules` continúan figurando como previstas y no como aplicadas. La versión 2.0 queda archivada en `SDD/Intake/_legacy/2026-07-30/`. | Orquestador de migración normativa SDD |
| 2.0 | 2026-07-30 | **Re-derivación por migración normativa 4.1 → 6.0**, fase M3 del orquestador de migración, sobre el plan [`Plan-Migracion-4.1-a-6.0.md`](../Docs/Audit/Plan-Migracion-4.1-a-6.0.md). Sube **major** porque `PRODUCT-MANIFEST-template` subió major y un manifiesto emitido bajo la estructura anterior deja de cumplir. **Renombre del artefacto**: `SOLUTION-MANIFEST-SelfHosted-Service.md` pasa a `PRODUCT-MANIFEST-SelfHosted-Service.md`; la versión 1.9 queda archivada en `SDD/Intake/_legacy/2026-07-30/`. **La derivación desde §13 del intake no cambió**: el único proyecto de código, su `tipo_proyecto_codigo`, su rol, el grafo trivial, las cuatro capas internas de §2.1, el orden topológico y las siete validaciones bloqueantes son idénticos a los de la versión 1.9. Lo que cambió es la nomenclatura y la estructura del bloque de procedencia. **§1 pasa a «Bloque de producto»** y declara los cuatro planos con sus nombres vigentes: `Nombre-Producto`, `Slug-Producto`, `Raiz-Codigo` y `Artefacto-Agrupacion`; «Proyecto principal» pasa a «Proyecto de código principal». **Identificadores renombrados por la `[5.0]`**: `Nombre-Solucion` a `Slug-Producto` (4), `NombreSolucionCodigo` a `Raiz-Codigo` (7), `Nombre-Proyecto` a `Nombre-Proyecto-Codigo` (10), `nombre-proyecto-codigo` a `Identidad-Codigo` (6), `project_type` a `tipo_proyecto_codigo` (2), `Alcance-Proyecto` a `Alcance-Producto` (1) y la carpeta `Solucion/` a `Producto/` (2). **Renombre léxico de «solución» a «producto» por el procedimiento por ocurrencia de `Vocabulario-Rules.md` §9.5**: 39 ocurrencias reales clasificadas, 22 sustituidas y 1 conservada como «solución de código»; las filas históricas del control de cambios **no se reescribieron**, por `SDD-Development-Guide.md` §VI.2. El barrido negativo dio cero «reproducto» y cero roturas de concordancia. Un dato que el barrido expuso y conviene dejar escrito: las once apariciones de la cadena `resoluci` en este archivo **no son la palabra «resolución»**, que no aparece nunca acá, sino la subcadena de `Nomb**reSoluci**onCodigo`. Es la misma superposición de cadenas que produjo las treinta «reproducto» del framework en su `[5.1]`, y no causó daño porque los identificadores se renombraron **antes** que los términos, no después. **§1.1 suma las dos filas obligatorias** de la `[6.0]` —la versión de `PRODUCT-INTAKE-template` y la de `PRODUCT-MANIFEST-template`—, que es la instrumentación por cuya ausencia este manifiesto dejaba de cumplir, con la nota que declara el estado mixto: las catorce filas de reglas siguen en 4.1 porque `SDD/Docs/` sigue sin migrar, y las dos de plantilla declaran las vigentes porque los dos documentos de entrada ya fueron reexpresados. **La procedencia no se cerró**: es trabajo de M5 y está condicionada a que la cadena quede completa. El estado pasa a `En revisión` hasta la confirmación del agente humano del proyecto. | Orquestador de migración normativa SDD |
| 1.9 | 2026-07-29 | **Corrección de una afirmación falsa de la versión 1.8.** Su §1.1 declaraba que el `Alcance-Proyecto.md` contenía cinco exclusiones originadas por AG-00 —`F-18` a `F-22`— que bajo `Rules-Contexto` 2.1 incumplían el criterio nuevo de §6. La adecuación verificó lo contrario: el intake §4 declara las cinco `Won't Have v1`, que es la etiqueta MoSCoW con la que el Product Owner declara la exclusión, y §9 trae las exclusiones correspondientes marcadas `[E]`. **Las cinco eran derivables y AG-00 las había formalizado**, que es su trabajo. El error fue del orquestador, que leyó como originadas cinco filas que la categoría había derivado, y no del subagente ni del auditor. §1.1 pasa a declarar el resultado real de haber pasado los seis documentos por el catálogo de §6.1, con lo que sí resultó originado —la evaluación de los riesgos `RP-01` a `RP-03`, que ninguna fuente declara, más un horizonte y tres glosas— y con la conclusión corregida: 2.1 no invalidó el contenido de la categoría, expuso que le faltaba declarar su propia derivación. **La derivación desde §13 del intake no cambió.** Esta corrección sube versión y archiva porque el manifiesto está `Vigente`; la versión 1.8 queda archivada en `SDD/Intake/_legacy/2026-07-29/`, con su bloque de archivado declarando que preserva el estado en que la afirmación errónea estaba declarada. | Orquestador SDD |
| 1.8 | 2026-07-29 | **Actualización del bloque de procedencia del framework, de 4.0 a 4.1.** El framework subió de versión mientras la Fase A se generaba, con cuatro artefactos movidos: `Master-Prompt` 4.1, `Root-Rules` 2.1, `Rules-Contexto` 2.1 y `Rules-Plan-Sprint` 2.1. El agente humano del proyecto decidió **adecuar la Fase A a 4.1** en lugar de cerrarla bajo 4.0. Se agregan dos bloques a §1.1: el que declara por qué el salto no dispara la reconciliación normativa de `Master-Prompt.md` §2.1 —es minor en los cuatro artefactos, y la reconciliación se dispara al arrancar sobre un destino con documentación previa, no con la corrida en curso—, y el que registra qué de 4.1 **sí** alcanzó a lo ya emitido, contra la afirmación del changelog del framework de que ninguna documentación emitida deja de cumplir: `Rules-Contexto` 2.1 retira de AG-00 la autoridad de originar exclusiones, y el `Alcance-Proyecto.md` emitido bajo 2.0 contenía cinco. **La derivación desde §13 del intake no cambió**: el bloque de solución, la tabla de proyectos, el grafo, las capas internas y las validaciones bloqueantes son idénticos a los de la versión 1.7. Esta corrección **sí sube versión y archiva**, a diferencia de las que la 1.7 absorbió, porque desde su confirmación del 2026-07-29 el manifiesto está en estado `Vigente` y fue consumido: bajo él se generó y auditó la Fase A. La versión 1.7 queda archivada en `SDD/Intake/_legacy/2026-07-29/`. | Orquestador SDD |
| 1.7 | 2026-07-29 | **Absorbe, dentro de la misma versión y antes de ser consumido, la disposición definitiva del proyecto de código**, decidida por el agente humano del proyecto el 2026-07-29 al revisar el scaffolding y tras evaluar y descartar dos formas intermedias ese mismo día. El proyecto se llama `SelfHosted.Service.Core`, sin sufijo de rol, y la capa de presentación se agrupa bajo una carpeta `Web/`. La propiedad que se compra con eso es la **simetría de las cuatro capas**: cada una es una carpeta de la raíz del proyecto y un espacio de nombres propio, de modo que el test de arquitectura y los filtros de cobertura las nombran sin enumeraciones ni definiciones por complemento; y la regla de aislamiento `[E]` de `Requerimientos-Tecnicos.md` §2 se cita literal, sin reexpresar su referente. El precio es una desviación declarada de la composición `<NombreSolucionCodigo>.<Sufijo>` de `Master-Prompt.md` §3.2, registrada en la nota de derivación de §1 y en el perfil de §1.2. Se declara además `Program.cs` exento de la regla de dependencia del test de arquitectura, por ser la raíz de composición. **Absorbe además, la declaración de que `Nombre-Proyecto` coincide con `Nombre-Solucion` por construcción**, pedida por el agente humano del proyecto el 2026-07-29 al observar que los dos campos exhibían el mismo literal sin explicación. §1.3 declara la coincidencia, sus tres consecuencias y que deja de valer si la solución incorpora un segundo proyecto de código; §1 y §4 dejan de presentar «principal» como si discriminara algo. No cambia ningún valor: precisa cómo leerlos. **Confirmado como canónico** por el agente humano del proyecto el 2026-07-29, cerrando el punto de decisión D-A. El estado pasa de `En revisión` a `Vigente` dentro de la misma versión, sin subir: la confirmación es el acto que cierra la emisión de 1.7, no una corrección posterior a ella, según la política de versionado de `Master-Prompt.md` §5. Desde acá el manifiesto es la fuente canónica de la jerarquía y toda corrección futura sube versión y archiva el estado anterior. **Re-derivación por colapso de la composición**, obligada por `Master-Prompt.md` §13.7: la modificación de §13 del intake quitó tres proyectos de código. Decisión del agente humano del proyecto: las cuatro capas de la Clean Architecture se compilan en **un único proyecto de código**, `SelfHosted.Service.Core`, de tipo `web-monolith`, y se separan por espacio de nombres. §1 suma la fila de cantidad de proyectos y la nota de derivación de `nombre-proyecto-codigo`, que con un solo proyecto no se compone con sufijo sino que coincide con `NombreSolucionCodigo`. §1.1 suma la corrección de alcance: las trece reglas de categoría se aplican una vez y no cuatro, y los artefactos de nivel solución de `Rules-Arquitectura-Tecnica` y `Rules-Devops` no se generan, porque el caso degenerado los omite. §2 pasa de cuatro filas a una, con el path de documentación declarado plano. §2.1 es nueva y preserva el grafo de las cuatro capas, con sus seis aristas y sus cuatro niveles, declarando que ya no lo hace cumplir el compilador sino el test de arquitectura. §3 declara el grafo trivial. §4 reverifica las siete validaciones sobre la composición nueva y suma la del caso degenerado. **Se declara que esta solución es el caso degenerado del framework**, con la consecuencia sobre el layout de salida. La versión 1.6 queda archivada en `SDD/Intake/_legacy/2026-07-29/`. | Orquestador SDD |
| 1.6 | 2026-07-29 | Re-derivación por cambio de §13 del intake, obligada por `Master-Prompt.md` §13.7. Aplica las tres decisiones del agente humano del proyecto que la fase de validación de intake tenía abiertas. **D-F**: §1 pasa de un campo de nombre a cuatro identidades declaradas —nombre de producto `SelfHosted Service`, identidad documental, identidad de código y artefacto de agrupación—, cada una con su consumidor, y se agregan las dos notas de derivación que declaran cuál se deriva y cuál se declara. **D-E**: `NombreSolucionCodigo` pasa del truncado `SelfHosted` a `SelfHosted.Service.Core`, y en consecuencia los cuatro `nombre-proyecto-codigo` y sus paths de `/src` toman la raíz nueva; §1.2 suma el parámetro de artefacto de agrupación, que el framework no modela. **F-1 (b)**: `Nombre-Solucion` pasa de `SelfHosted-Service-Core` a `SelfHosted-Service`, derivado del nombre de producto, y este archivo y el intake se renombran; las copias de `_legacy/` conservan el nombre viejo. **E-1 (a)**: §1.3 es nueva y declara que los dos planos de nombres son independientes por diseño. **E-2 (a)**: los tres proyectos de prueba toman la raíz nueva. La composición no cambió en esta versión: los cuatro proyectos, sus `project_type`, sus roles, sus dependencias, el grafo y el orden topológico eran idénticos a los de la 1.5. El estado quedó `En revisión` y **nunca llegó a confirmarse**: la decisión de composición del mismo día la superó. Archivada en `SDD/Intake/_legacy/2026-07-29/`. | Orquestador SDD |
| 1.5 | 2026-07-28 | Re-derivación en la fase de validación de intake, posterior a la reconciliación normativa de `Master-Prompt.md` §2.1 resuelta con la salida B por el agente humano del proyecto. Se emite el bloque de procedencia del framework de §1.1, que la versión 1.4 había dejado deliberadamente sin completar, con el conjunto 4.0, `Master-Prompt` 4.0, las trece reglas de categoría efectivamente aplicables y las tres transversales; el perfil de convención de nombres pasa de §1.1 a §1.2 por el formato vigente de `SOLUTION-MANIFEST-template.md`. Se declara el gating de `Rules-Prompts-AI` y la sujeción de las dos reglas de la Fase B2 a la confirmación del flag `requiere_maqueta`. **La derivación desde §13 del intake no cambió**: el bloque de solución, la tabla de proyectos, el grafo, el orden topológico y las validaciones bloqueantes son idénticos a los de la versión 1.4, porque §13 del intake no cambió. El estado pasa a `En revisión` hasta la confirmación explícita del bloque nuevo. La versión 1.4 queda archivada en `SDD/Intake/_legacy/2026-07-28/`. | Orquestador SDD |
| 1.4 | 2026-07-28 | Migración al conjunto normativo 4.0 del Framework SDD. El archivo pasa a su nombre lógico estable, `SOLUTION-MANIFEST-SelfHosted-Service-Core.md`, con la versión declarada en la cabecera, por la reformulación de las invariantes D4 y D5; la versión 1.3 queda archivada en `SDD/Intake/_legacy/2026-07-28/`. El puntero al intake de origen sigue al renombrado de ese documento, que pasó a la versión 2.0 por la misma migración. Se agrega la nota que declara por qué el bloque de procedencia del framework de §1.1 del formato vigente **no** se completa a mano: lo emite el orquestador al re-derivar, y declararlo ahora afirmaría que la documentación existente se generó bajo el conjunto 4.0, que es falso. **No se re-derivó el manifiesto y no corresponde**: §13 del intake, que es lo único de lo que este artefacto deriva, no cambió en la versión 2.0. El bloque de solución, la tabla de proyectos, el grafo y las validaciones son idénticos a los de la versión 1.3. | Orquestador SDD |
| 1.3 | 2026-07-28 | Corrección de la nota de encabezado, que afirmaba que ninguna actualización del intake había tocado §13. Dejó de ser cierto: la cuarta actualización, que desambiguó el término «proyecto», modificó la prosa de §13 —su título, tres frases y un párrafo nuevo de alcance—, de modo que el hash idéntico que se venía verificando en ocho corridas ya no coincide. Motivo: el hallazgo lo levantó el auditor independiente del intake, que señaló que el manifiesto sostenía un hecho superado y que ningún control de cambios lo reconciliaba. La nota pasa a distinguir qué cambió —cómo §13 nombra las cosas— de qué no cambió —qué declara—, y a justificar la no re-derivación por el criterio de `Master-Prompt.md` §13.7. La versión 1.2 queda archivada en `SDD/Intake/_legacy/2026-07-28/`. | Orquestador SDD |
| 1.2 | 2026-07-28 | Actualización del puntero al intake de origen, que pasa de la versión 1.1 a la 1.2, en el bloque de solución y en la nota de encabezado, más la ampliación de esa nota para cubrir las dos actualizaciones del intake. No se re-derivó el manifiesto y no corresponde: §13 del intake, que es lo único de lo que este artefacto deriva, quedó intacto, verificado por comparación directa contra la versión 1.0 archivada. La versión sube por la misma regla que la anterior: este artefacto ya fue consumido. La versión 1.1 queda archivada en `SDD/Intake/_legacy/2026-07-28/`. | Orquestador SDD |
| 1.1 | 2026-07-27 | Actualización del puntero al intake de origen, que pasa de la versión 1.0 a la 1.1 en el bloque de solución y en la nota de encabezado, más la nota que declara por qué la derivación sigue siendo válida. Motivo: el orquestador consolidó el intake ejecutando el flujo de `Master-Prompt.md` §13 para cerrar el hallazgo P0 del audit de la Fase A, y la versión 1.0 del intake quedó archivada. No se re-derivó el manifiesto y no corresponde hacerlo: la actualización del intake fue de estado de supuestos y de evidencia, y §13 no cambió. La versión sube igual porque este artefacto ya había sido consumido: fue confirmado como canónico el 2026-07-27 y `00-Contexto` lo cita en su trazabilidad upstream. La versión 1.0 queda archivada en `SDD/Intake/_legacy/2026-07-27/`. | Orquestador SDD |
| 1.0 | 2026-07-27 | Manifiesto inicial derivado de `SOLUTION-INTAKE-SelfHosted-Service-Core-v1.0.md` §13 durante la fase de validación de intake, y confirmado por el agente humano del proyecto ese mismo día. Cuatro proyectos, un principal (`SelfHosted-Web`, `web-monolith`) y tres librerías, con grafo acíclico de cuatro niveles topológicos. `NombreSolucionCodigo` tomado de la declaración explícita del perfil de convención de §13 en lugar del algoritmo de normalización de `Master-Prompt.md` §3.2. | Orquestador SDD |
