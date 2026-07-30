> **Bloque de archivado.** Estado: `Superado`. Copia completa y autocontenida de la versión 1.8 de `SOLUTION-MANIFEST-SelfHosted-Service.md`, tomada el 2026-07-29. Su §1.1 afirmaba que cinco exclusiones del `Alcance-Proyecto.md` habían sido originadas por AG-00 y que por eso incumplían el criterio nuevo de `Rules-Contexto` 2.1. **Esa afirmación resultó falsa** y la versión 1.9 la corrige. La versión vigente es `../../SOLUTION-MANIFEST-SelfHosted-Service.md`. El cuerpo de este snapshot no se modifica: preserva el estado en que la afirmación errónea estaba declarada.

# SOLUTION-MANIFEST-SelfHosted-Service

Artefacto derivado. El orquestador SDD lo construyó a partir de `SOLUTION-INTAKE-SelfHosted-Service.md` §13, siguiendo `Intake-Rules.md` §4 y el formato de `SOLUTION-MANIFEST-template.md`. No se completa a mano.

**Re-derivación del 2026-07-29, versión 1.7.** Es la segunda re-derivación del día y la primera que **cambia la composición**. `Master-Prompt.md` §13.7 la obliga: la modificación de §13 del intake quitó tres proyectos de código. El agente humano del proyecto decidió que las cuatro capas de la Clean Architecture se compilen en **un único proyecto de código** y se separen por espacio de nombres, tras observar que el producto es un único despliegue y que ninguna de las cuatro unidades se publicaba ni se consumía por separado.

**Esta solución es el caso degenerado del framework.** Con un único proyecto, `Master-Prompt.md` §3.5 aplana la salida: las doce categorías se generan directamente bajo `SDD/Docs/`, sin el subnivel `Proyectos/<Nombre-Proyecto>/` y sin la carpeta `Solucion/`. No hay vista de solución ni pipeline de solución que consolidar en la Fase H, porque no hay jerarquía que documentar.

**Procedencia del framework.** El bloque de §1.1 se emitió en la versión 1.5 y se reverificó contra los archivos vigentes de `IA.SDD` el 2026-07-29: la entrada vigente del `CHANGELOG.md` sigue siendo `[4.0] - 2026-07-28` y las dieciséis reglas declaran en su cabecera exactamente las versiones que la tabla registra. Se transcribe sin cambios, con una corrección de alcance que la composición nueva obliga: ver la nota al pie de §1.1.

---

## §1 Bloque de solución

Las cuatro identidades de la solución, separadas según la decisión D-F del agente humano del proyecto del 2026-07-29 y declaradas en la sección «Identidad de la solución» del intake. Cada una tiene su consumidor y no son renderizaciones tipográficas de un mismo nombre.

| Campo | Valor | Origen |
|---|---|---|
| Nombre de producto | SelfHosted Service | Declarado en la cabecera del intake |
| `Nombre-Solucion` (identidad documental) | `SelfHosted-Service` | Derivado del nombre de producto por `Master-Prompt.md` §3.2 |
| `NombreSolucionCodigo` (identidad de código) | `SelfHosted.Service.Core` | Declarado en el perfil de convención de `SOLUTION-INTAKE` §13 |
| Artefacto de agrupación de la construcción | `SelfHosted.Service.Core.sln` | Derivado como `<NombreSolucionCodigo>.sln` |
| Proyecto principal | `SelfHosted-Service` | `SOLUTION-INTAKE` §13. Es el único proyecto de código, de modo que «principal» no discrimina: el campo se declara porque `Master-Prompt.md` §3.1 exige exactamente un principal, y lo satisface trivialmente |
| Cantidad de proyectos de código | 1 | Caso degenerado de `Master-Prompt.md` §3.5 |
| Intake (origen) | `SOLUTION-INTAKE-SelfHosted-Service.md` (de su §13 se deriva este manifiesto) | — |
| Documento | `SOLUTION-MANIFEST-SelfHosted-Service.md` | — |
| Versión | 1.8 | — |
| Fecha | 2026-07-29 | — |
| Estado | **Vigente.** Confirmado como canónico por el agente humano del proyecto el 2026-07-29. La versión 1.8 actualiza la procedencia del framework sin tocar la derivación desde §13 | — |

**Nota de derivación de `Nombre-Solucion`.** Se deriva del **nombre de producto**, no de la identidad de código, aplicando los pasos 1 a 7 de `Master-Prompt.md` §3.2 a «SelfHosted Service»: separar por espacios, capitalizar la inicial de cada palabra y unir con guion medio da `SelfHosted-Service`. Es la decisión F-1 (b) del agente humano del proyecto: seguir la derivación en lugar de declarar el slug estable, de modo que la regla del framework se cumpla sin excepción local.

**Nota de derivación de `NombreSolucionCodigo`.** Es un **valor declarado**, no derivado. El algoritmo de `Master-Prompt.md` §3.2 concatena sin separadores y produciría `SelfHostedServiceCore`, una raíz que ningún artefacto de esta solución usa: la solución de código es `SelfHosted.Service.Core`, que es el argumento `-n` con el que se crea, el nombre de su archivo `.sln` y la raíz de todos sus espacios de nombres. El framework no declara qué prevalece cuando el perfil de §13 fija un literal; esta solución declara que el valor del perfil prevalece, y lo registra acá para que la derivación sea auditable en lugar de tácita.

**Nota de derivación de `nombre-proyecto-codigo`.** El proyecto lleva la identidad de código **a secas**, `SelfHosted.Service.Core`, sin el sufijo de rol que la composición `<NombreSolucionCodigo>.<Sufijo>` de `Master-Prompt.md` §3.2 prescribe. Es una **desviación declarada** de esa regla, decidida por el agente humano del proyecto el 2026-07-29, y se toma a cambio de una propiedad concreta: con el proyecto sin sufijo, las cuatro capas quedan simétricas —una carpeta de la raíz del proyecto y un segmento propio del espacio de nombres cada una, incluida la presentación agrupada bajo `Web/`— y la regla de aislamiento `[E]` de `Requerimientos-Tecnicos.md` §2 se cita literal, sin reexpresar su referente. La forma compuesta `SelfHosted.Service.Core.Web` se evaluó ese mismo día y se descartó: cumplía §3.2 pero anidaba las capas bajo `.Web`, dejaba a la presentación sin segmento propio y obligaba a reexpresar el referente de una regla marcada `[E]`. El detalle está en §16 del intake.

### §1.1 Procedencia del framework

Declara bajo qué normativa se genera la documentación de esta solución. El orquestador lo completó al re-derivar el manifiesto, leyendo la entrada vigente del `CHANGELOG.md` del repositorio fuente y el campo `Versión` de la cabecera de cada archivo que va a aplicar. Se actualiza cuando el árbol se genera, o se adecua, bajo una versión distinta del framework.

**Actualizado a 4.1 el 2026-07-29.** El framework subió de 4.0 a 4.1 **mientras la Fase A se estaba generando**. Cuatro artefactos cambiaron de versión: `Master-Prompt` 4.0 → 4.1, `Root-Rules` 2.0 → 2.1, `Rules-Contexto` 2.0 → 2.1 y `Rules-Plan-Sprint` 2.0 → 2.1. Las doce filas restantes no se movieron. La tabla de abajo declara el conjunto **vigente**, que es bajo el que la documentación queda adecuada, no el conjunto bajo el que se emitió por primera vez.

| Artefacto del framework | Versión |
|---|---|
| Framework SDD (conjunto) | 4.1 (`CHANGELOG.md`, entrada `[4.1] - 2026-07-29`) |
| `Master-Prompt` | 4.1 |
| `Root-Rules` | 2.1 |
| `Rules-Contexto` | 2.1 |
| `Rules-Necesidades-Negocio` | 2.0 |
| `Rules-Especificacion-Funcional` | 2.0 |
| `Rules-UX-UI-DX` | 2.0 |
| `Rules-Arquitectura-Tecnica` | 2.0 |
| `Rules-Backlog-Tecnico` | 2.0 |
| `Rules-Plan-Sprint` | 2.1 |
| `Rules-Calidad-Y-Pruebas` | 2.0 |
| `Rules-Devops` | 2.0 |
| `Rules-Examples` | 3.0 |
| `Rules-Documentacion` | 3.0 |
| Reglas transversales aplicadas | `Intake-Rules` 2.1; `Maqueta-Rules` 2.0 y `Deriva-Rules` 2.0 por la Fase B2 prevista |

`Rules-Prompts-AI` no figura porque la categoría 04 queda excluida por gating: el proyecto de código no declara uso de LLM en su bloque §17 (`usa_llm` == false). Las dos reglas transversales de la Fase B2 se declaran como previstas y quedan sujetas a la confirmación del flag `requiere_maqueta`; si el agente humano declina la fase, esa fila se corrige en la versión siguiente.

**Sobre el salto 4.0 → 4.1 y por qué no dispara la reconciliación de §2.1.** El salto es **minor** en los cuatro artefactos, y la reconciliación normativa de `Master-Prompt.md` §2.1 clasifica el impacto por la propia numeración: un salto minor no marca ningún documento como potencialmente invalidado. Además la reconciliación se dispara al **arrancar** sobre un destino con documentación previa, y acá el framework se movió con la corrida en curso, que es un caso que §2.1 no cubre. Se resolvió por decisión del agente humano del proyecto el 2026-07-29: **adecuar la Fase A a 4.1** en lugar de cerrarla bajo 4.0 y evaluar el salto al empezar la Fase B.

**Qué de 4.1 alcanzó efectivamente a lo ya emitido.** El `CHANGELOG.md` del framework afirma que «ninguna documentación ya emitida deja de cumplir». Para esta solución esa afirmación **no se sostuvo**, y se registra acá porque es una afirmación sobre el estado del sistema y D9 exige contrastarla: `Rules-Contexto` 2.1 retira de AG-00 la autoridad de originar exclusiones y prioridades MoSCoW —que pasan a ser decisión del Product Owner declarada en el intake aguas arriba— y suma a §6 el criterio «ninguna prioridad MoSCoW, exclusión, fecha objetivo, target de métrica ni criterio de transición de fase se origina en esta categoría». El `Alcance-Proyecto.md` emitido bajo 2.0 contenía **cinco exclusiones originadas por AG-00**, F-18 a F-22, que bajo 2.1 incumplen ese criterio. La adecuación las reclasifica como propuestas elevadas al Product Owner, con su fundamento conservado y su estado abierto. Las otras tres filas que cambiaron de versión —`Master-Prompt`, `Root-Rules` y `Rules-Plan-Sprint`— no alcanzan a ningún artefacto ya emitido: las dos últimas gobiernan categorías que todavía no se generaron.

**Corrección de alcance que la composición nueva obliga.** Las trece reglas de categoría se aplican ahora **una sola vez** y no cuatro. `Root-Rules` sigue aplicándose para el README raíz de `SDD/Docs/`. Lo que deja de aplicarse es la parte de `Rules-Arquitectura-Tecnica` y de `Rules-Devops` que gobierna los artefactos de nivel solución —`Solucion/Vista-Solucion.md` y `Solucion/Pipeline-Solucion.md`—, que `Master-Prompt.md` §3.5 y §11 omiten en el caso degenerado. Ninguna versión de la tabla cambia: cambia cuántas veces se despacha cada regla.

#### Decisiones de reconciliación

Sin filas. La reconciliación normativa del 2026-07-28 se resolvió con la salida B (regenerar desde cero), que no deja registro en esta tabla: el registro de lo que pasó es este mismo bloque de procedencia reescrito con la versión nueva. La tabla queda declarada para el caso de que alguna reconciliación futura se resuelva con la salida C.

### §1.2 Perfil de convención de nombres

| Parámetro | Valor | Notas |
|---|---|---|
| `NombreSolucionCodigo`, forma del nombre de solución en código | `SelfHosted.Service.Core` | Declarado en `SOLUTION-INTAKE` §13, no derivado. Es la raíz de los espacios de nombres |
| Separador de segmentos | `.` | Separa la identidad de código de los segmentos de capa |
| `nombre-proyecto-codigo` del proyecto único | `SelfHosted.Service.Core` | Coincide con `NombreSolucionCodigo`. Desviación declarada de `Master-Prompt.md` §3.2: ver la nota de derivación de §1 |
| Artefacto de agrupación de la construcción | `SelfHosted.Service.Core.sln` | Derivado como `<NombreSolucionCodigo>.sln`. Parámetro que el framework no modela y que esta solución declara en el perfil de §13 del intake |
| Prefijo de paquetes redistribuibles | `Aplicada` | No se aplica: el proyecto de código no es redistribuible y no se publica ningún paquete |

### §1.3 Independencia de los dos planos de nombres

**`Nombre-Proyecto` coincide con `Nombre-Solucion`, y la coincidencia es por construcción.** Los dos valen `SelfHosted-Service`. No es una casualidad ni un descuido de derivación: en el caso degenerado el proyecto de código **es** la solución, de modo que el identificador documental de uno y el de la otra nombran la misma cosa. Se declara acá porque dos campos con el mismo literal, sin explicación, se leen como el defecto que la separación de identidades de D-F vino a eliminar, y no lo son.

Qué se sigue de eso, para que nadie lo interprete de más:

- El campo se conserva porque el formato del manifiesto lo exige y porque el orquestador lo usa para derivar rutas. No se le inventa un valor propio para que se vea distinto del de la solución: eso sí sería un nombre que no nombra nada.
- Su **único consumidor efectivo** en esta solución es `SDD/Maquetas/<Nombre-Proyecto>/`, que resuelve a `SDD/Maquetas/SelfHosted-Service/`. `SDD/Docs/` no lo usa: el caso degenerado aplana la salida y elimina el subnivel `Proyectos/<Nombre-Proyecto>/`.
- Si más adelante la solución incorpora un segundo proyecto de código, los dos identificadores **dejan de coincidir** y cada uno recupera su función. La coincidencia es una propiedad del caso degenerado, no una regla nueva.


El `Nombre-Proyecto` y el `nombre-proyecto-codigo` divergen a propósito y la divergencia es legítima. Es la sub-decisión E-1 (a) del agente humano del proyecto del 2026-07-29, que sobrevive al colapso de la composición.

| Plano | Forma | Valor | Qué gobierna |
|---|---|---|---|
| Documentación | `Nombre-Proyecto`, Título-Con-Guiones | `SelfHosted-Service`, idéntico a `Nombre-Solucion` por lo declarado arriba | `SDD/Maquetas/<Nombre-Proyecto>/` y nada más. `Master-Prompt.md` §3.5 aplana `SDD/Docs/` y omite el subnivel `Proyectos/<Nombre-Proyecto>/` |
| Código | `nombre-proyecto-codigo`, segmentos con punto | `SelfHosted.Service.Core` | `/src`, `/tests`, el `.csproj`, el espacio de nombres raíz del que cuelgan las cuatro capas, y el pipeline |

---

## §2 Tabla de proyectos

| `Nombre-Proyecto` | `nombre-proyecto-codigo` | `project_type` (D8) | Rol en la solución | `redistribuible` | Dependencias | Path `/src` | Path `SDD/Docs/` |
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
| Cada `project_type` pertenece al conjunto cerrado D8 | Cumple: `web-monolith` ×1 |
| Hay exactamente un proyecto principal | Cumple trivialmente: hay un solo proyecto y por lo tanto es el principal. La validación existe para detectar cero o más de uno, y ninguno de los dos casos se da |
| Sin colisión de `Nombre-Proyecto` ni de `nombre-proyecto-codigo` | Cumple trivialmente: un solo proyecto, un solo nombre en cada plano |
| Cada dependencia referencia un proyecto existente | Cumple por vacuidad: no hay dependencias entre proyectos de código |
| El grafo de dependencias es acíclico | Cumple: un nodo sin aristas es acíclico. El grafo de capas de §2.1 también lo es, con cuatro niveles estrictos |
| §13 del intake es recorrible | Cumple: sin filas de ejemplo, perfil de convención declarado con sus cinco parámetros, campos bloqueantes completos |
| Los `redistribuible: true` arrancan con el prefijo de organización | No aplica: el proyecto no es redistribuible |

**Validación adicional del caso degenerado**, que `Master-Prompt.md` §3.5 obliga a verificar y que no estaba en la lista de §3.1 porque hasta ahora no aplicaba: con un único proyecto, el orquestador debe aplanar el layout de salida y omitir `Proyectos/` y `Solucion/`. Verificado y declarado en §1 y en la columna de path de §2.

---

## Control de cambios

| Versión | Fecha | Cambios | Autor |
|---|---|---|---|
| 1.8 | 2026-07-29 | **Actualización del bloque de procedencia del framework, de 4.0 a 4.1.** El framework subió de versión mientras la Fase A se generaba, con cuatro artefactos movidos: `Master-Prompt` 4.1, `Root-Rules` 2.1, `Rules-Contexto` 2.1 y `Rules-Plan-Sprint` 2.1. El agente humano del proyecto decidió **adecuar la Fase A a 4.1** en lugar de cerrarla bajo 4.0. Se agregan dos bloques a §1.1: el que declara por qué el salto no dispara la reconciliación normativa de `Master-Prompt.md` §2.1 —es minor en los cuatro artefactos, y la reconciliación se dispara al arrancar sobre un destino con documentación previa, no con la corrida en curso—, y el que registra qué de 4.1 **sí** alcanzó a lo ya emitido, contra la afirmación del changelog del framework de que ninguna documentación emitida deja de cumplir: `Rules-Contexto` 2.1 retira de AG-00 la autoridad de originar exclusiones, y el `Alcance-Proyecto.md` emitido bajo 2.0 contenía cinco. **La derivación desde §13 del intake no cambió**: el bloque de solución, la tabla de proyectos, el grafo, las capas internas y las validaciones bloqueantes son idénticos a los de la versión 1.7. Esta corrección **sí sube versión y archiva**, a diferencia de las que la 1.7 absorbió, porque desde su confirmación del 2026-07-29 el manifiesto está en estado `Vigente` y fue consumido: bajo él se generó y auditó la Fase A. La versión 1.7 queda archivada en `SDD/Intake/_legacy/2026-07-29/`. | Orquestador SDD |
| 1.7 | 2026-07-29 | **Absorbe, dentro de la misma versión y antes de ser consumido, la disposición definitiva del proyecto de código**, decidida por el agente humano del proyecto el 2026-07-29 al revisar el scaffolding y tras evaluar y descartar dos formas intermedias ese mismo día. El proyecto se llama `SelfHosted.Service.Core`, sin sufijo de rol, y la capa de presentación se agrupa bajo una carpeta `Web/`. La propiedad que se compra con eso es la **simetría de las cuatro capas**: cada una es una carpeta de la raíz del proyecto y un espacio de nombres propio, de modo que el test de arquitectura y los filtros de cobertura las nombran sin enumeraciones ni definiciones por complemento; y la regla de aislamiento `[E]` de `Requerimientos-Tecnicos.md` §2 se cita literal, sin reexpresar su referente. El precio es una desviación declarada de la composición `<NombreSolucionCodigo>.<Sufijo>` de `Master-Prompt.md` §3.2, registrada en la nota de derivación de §1 y en el perfil de §1.2. Se declara además `Program.cs` exento de la regla de dependencia del test de arquitectura, por ser la raíz de composición. **Absorbe además, la declaración de que `Nombre-Proyecto` coincide con `Nombre-Solucion` por construcción**, pedida por el agente humano del proyecto el 2026-07-29 al observar que los dos campos exhibían el mismo literal sin explicación. §1.3 declara la coincidencia, sus tres consecuencias y que deja de valer si la solución incorpora un segundo proyecto de código; §1 y §4 dejan de presentar «principal» como si discriminara algo. No cambia ningún valor: precisa cómo leerlos. **Confirmado como canónico** por el agente humano del proyecto el 2026-07-29, cerrando el punto de decisión D-A. El estado pasa de `En revisión` a `Vigente` dentro de la misma versión, sin subir: la confirmación es el acto que cierra la emisión de 1.7, no una corrección posterior a ella, según la política de versionado de `Master-Prompt.md` §5. Desde acá el manifiesto es la fuente canónica de la jerarquía y toda corrección futura sube versión y archiva el estado anterior. **Re-derivación por colapso de la composición**, obligada por `Master-Prompt.md` §13.7: la modificación de §13 del intake quitó tres proyectos de código. Decisión del agente humano del proyecto: las cuatro capas de la Clean Architecture se compilan en **un único proyecto de código**, `SelfHosted.Service.Core`, de tipo `web-monolith`, y se separan por espacio de nombres. §1 suma la fila de cantidad de proyectos y la nota de derivación de `nombre-proyecto-codigo`, que con un solo proyecto no se compone con sufijo sino que coincide con `NombreSolucionCodigo`. §1.1 suma la corrección de alcance: las trece reglas de categoría se aplican una vez y no cuatro, y los artefactos de nivel solución de `Rules-Arquitectura-Tecnica` y `Rules-Devops` no se generan, porque el caso degenerado los omite. §2 pasa de cuatro filas a una, con el path de documentación declarado plano. §2.1 es nueva y preserva el grafo de las cuatro capas, con sus seis aristas y sus cuatro niveles, declarando que ya no lo hace cumplir el compilador sino el test de arquitectura. §3 declara el grafo trivial. §4 reverifica las siete validaciones sobre la composición nueva y suma la del caso degenerado. **Se declara que esta solución es el caso degenerado del framework**, con la consecuencia sobre el layout de salida. La versión 1.6 queda archivada en `SDD/Intake/_legacy/2026-07-29/`. | Orquestador SDD |
| 1.6 | 2026-07-29 | Re-derivación por cambio de §13 del intake, obligada por `Master-Prompt.md` §13.7. Aplica las tres decisiones del agente humano del proyecto que la fase de validación de intake tenía abiertas. **D-F**: §1 pasa de un campo de nombre a cuatro identidades declaradas —nombre de producto `SelfHosted Service`, identidad documental, identidad de código y artefacto de agrupación—, cada una con su consumidor, y se agregan las dos notas de derivación que declaran cuál se deriva y cuál se declara. **D-E**: `NombreSolucionCodigo` pasa del truncado `SelfHosted` a `SelfHosted.Service.Core`, y en consecuencia los cuatro `nombre-proyecto-codigo` y sus paths de `/src` toman la raíz nueva; §1.2 suma el parámetro de artefacto de agrupación, que el framework no modela. **F-1 (b)**: `Nombre-Solucion` pasa de `SelfHosted-Service-Core` a `SelfHosted-Service`, derivado del nombre de producto, y este archivo y el intake se renombran; las copias de `_legacy/` conservan el nombre viejo. **E-1 (a)**: §1.3 es nueva y declara que los dos planos de nombres son independientes por diseño. **E-2 (a)**: los tres proyectos de prueba toman la raíz nueva. La composición no cambió en esta versión: los cuatro proyectos, sus `project_type`, sus roles, sus dependencias, el grafo y el orden topológico eran idénticos a los de la 1.5. El estado quedó `En revisión` y **nunca llegó a confirmarse**: la decisión de composición del mismo día la superó. Archivada en `SDD/Intake/_legacy/2026-07-29/`. | Orquestador SDD |
| 1.5 | 2026-07-28 | Re-derivación en la fase de validación de intake, posterior a la reconciliación normativa de `Master-Prompt.md` §2.1 resuelta con la salida B por el agente humano del proyecto. Se emite el bloque de procedencia del framework de §1.1, que la versión 1.4 había dejado deliberadamente sin completar, con el conjunto 4.0, `Master-Prompt` 4.0, las trece reglas de categoría efectivamente aplicables y las tres transversales; el perfil de convención de nombres pasa de §1.1 a §1.2 por el formato vigente de `SOLUTION-MANIFEST-template.md`. Se declara el gating de `Rules-Prompts-AI` y la sujeción de las dos reglas de la Fase B2 a la confirmación del flag `requiere_maqueta`. **La derivación desde §13 del intake no cambió**: el bloque de solución, la tabla de proyectos, el grafo, el orden topológico y las validaciones bloqueantes son idénticos a los de la versión 1.4, porque §13 del intake no cambió. El estado pasa a `En revisión` hasta la confirmación explícita del bloque nuevo. La versión 1.4 queda archivada en `SDD/Intake/_legacy/2026-07-28/`. | Orquestador SDD |
| 1.4 | 2026-07-28 | Migración al conjunto normativo 4.0 del Framework SDD. El archivo pasa a su nombre lógico estable, `SOLUTION-MANIFEST-SelfHosted-Service-Core.md`, con la versión declarada en la cabecera, por la reformulación de las invariantes D4 y D5; la versión 1.3 queda archivada en `SDD/Intake/_legacy/2026-07-28/`. El puntero al intake de origen sigue al renombrado de ese documento, que pasó a la versión 2.0 por la misma migración. Se agrega la nota que declara por qué el bloque de procedencia del framework de §1.1 del formato vigente **no** se completa a mano: lo emite el orquestador al re-derivar, y declararlo ahora afirmaría que la documentación existente se generó bajo el conjunto 4.0, que es falso. **No se re-derivó el manifiesto y no corresponde**: §13 del intake, que es lo único de lo que este artefacto deriva, no cambió en la versión 2.0. El bloque de solución, la tabla de proyectos, el grafo y las validaciones son idénticos a los de la versión 1.3. | Orquestador SDD |
| 1.3 | 2026-07-28 | Corrección de la nota de encabezado, que afirmaba que ninguna actualización del intake había tocado §13. Dejó de ser cierto: la cuarta actualización, que desambiguó el término «proyecto», modificó la prosa de §13 —su título, tres frases y un párrafo nuevo de alcance—, de modo que el hash idéntico que se venía verificando en ocho corridas ya no coincide. Motivo: el hallazgo lo levantó el auditor independiente del intake, que señaló que el manifiesto sostenía un hecho superado y que ningún control de cambios lo reconciliaba. La nota pasa a distinguir qué cambió —cómo §13 nombra las cosas— de qué no cambió —qué declara—, y a justificar la no re-derivación por el criterio de `Master-Prompt.md` §13.7. La versión 1.2 queda archivada en `SDD/Intake/_legacy/2026-07-28/`. | Orquestador SDD |
| 1.2 | 2026-07-28 | Actualización del puntero al intake de origen, que pasa de la versión 1.1 a la 1.2, en el bloque de solución y en la nota de encabezado, más la ampliación de esa nota para cubrir las dos actualizaciones del intake. No se re-derivó el manifiesto y no corresponde: §13 del intake, que es lo único de lo que este artefacto deriva, quedó intacto, verificado por comparación directa contra la versión 1.0 archivada. La versión sube por la misma regla que la anterior: este artefacto ya fue consumido. La versión 1.1 queda archivada en `SDD/Intake/_legacy/2026-07-28/`. | Orquestador SDD |
| 1.1 | 2026-07-27 | Actualización del puntero al intake de origen, que pasa de la versión 1.0 a la 1.1 en el bloque de solución y en la nota de encabezado, más la nota que declara por qué la derivación sigue siendo válida. Motivo: el orquestador consolidó el intake ejecutando el flujo de `Master-Prompt.md` §13 para cerrar el hallazgo P0 del audit de la Fase A, y la versión 1.0 del intake quedó archivada. No se re-derivó el manifiesto y no corresponde hacerlo: la actualización del intake fue de estado de supuestos y de evidencia, y §13 no cambió. La versión sube igual porque este artefacto ya había sido consumido: fue confirmado como canónico el 2026-07-27 y `00-Contexto` lo cita en su trazabilidad upstream. La versión 1.0 queda archivada en `SDD/Intake/_legacy/2026-07-27/`. | Orquestador SDD |
| 1.0 | 2026-07-27 | Manifiesto inicial derivado de `SOLUTION-INTAKE-SelfHosted-Service-Core-v1.0.md` §13 durante la fase de validación de intake, y confirmado por el agente humano del proyecto ese mismo día. Cuatro proyectos, un principal (`SelfHosted-Web`, `web-monolith`) y tres librerías, con grafo acíclico de cuatro niveles topológicos. `NombreSolucionCodigo` tomado de la declaración explícita del perfil de convención de §13 en lugar del algoritmo de normalización de `Master-Prompt.md` §3.2. | Orquestador SDD |
