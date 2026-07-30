> **Bloque de archivado.** Estado: `Superado`. Copia completa y autocontenida de la versión 1.6 de `SOLUTION-MANIFEST-SelfHosted-Service.md`, tomada el 2026-07-29 antes de la re-derivación que exige `Master-Prompt.md` §13.7 tras el colapso de la composición a un único proyecto de código. La versión vigente es `../../SOLUTION-MANIFEST-SelfHosted-Service.md`. Esta versión 1.6 declaraba los cuatro proyectos de código y nunca llegó a confirmarse: quedó en estado `En revisión` y fue superada por la decisión del agente humano del proyecto del mismo día. El cuerpo de este snapshot no se modifica.

# SOLUTION-MANIFEST-SelfHosted-Service

Artefacto derivado. El orquestador SDD lo construyó a partir de `SOLUTION-INTAKE-SelfHosted-Service.md` §13, siguiendo `Intake-Rules.md` §4 y el formato de `SOLUTION-MANIFEST-template.md`. No se completa a mano.

**Re-derivación del 2026-07-29.** Esta versión 1.6 es una re-derivación real, no una actualización de puntero: `Master-Prompt.md` §13.7 la obliga porque §13 del intake cambió sus nombres de código. El agente humano del proyecto tomó tres decisiones durante la fase de validación de intake —D-E, D-F y F-1— que separan cuatro identidades de la solución que hasta acá colapsaban en un solo campo. Lo que cambió es la identidad de código y, con ella, los cuatro `nombre-proyecto-codigo` y sus paths de `/src`. **Lo que no cambió es la composición**: los cuatro proyectos, sus `project_type`, sus roles, sus dependencias, el grafo y el orden topológico son idénticos a los de la versión 1.5, porque la tabla de proyectos de §13 no agregó, quitó ni retipó ningún proyecto.

**Procedencia del framework.** El bloque de §1.1 se emitió en la versión 1.5 y se **reverificó** el 2026-07-29 contra los archivos vigentes de `IA.SDD`: la entrada vigente del `CHANGELOG.md` sigue siendo `[4.0] - 2026-07-28` y las dieciséis reglas declaran en su cabecera exactamente las versiones que la tabla registra. El framework no avanzó entre una versión y otra de este manifiesto, de modo que el bloque se transcribe sin cambios y sigue siendo una afirmación verificable.

---

## §1 Bloque de solución

Las cuatro identidades de la solución, separadas según la decisión D-F del agente humano del proyecto del 2026-07-29 y declaradas en la sección «Identidad de la solución» del intake. Cada una tiene su consumidor y no son renderizaciones tipográficas de un mismo nombre.

| Campo | Valor | Origen |
|---|---|---|
| Nombre de producto | SelfHosted Service | Declarado en la cabecera del intake |
| `Nombre-Solucion` (identidad documental) | `SelfHosted-Service` | Derivado del nombre de producto por `Master-Prompt.md` §3.2 |
| `NombreSolucionCodigo` (identidad de código) | `SelfHosted.Service.Core` | Declarado en el perfil de convención de `SOLUTION-INTAKE` §13 |
| Artefacto de agrupación de la construcción | `SelfHosted.Service.Core.sln` | Derivado como `<NombreSolucionCodigo>.sln` |
| Proyecto principal | `SelfHosted-Web` | `SOLUTION-INTAKE` §13 |
| Intake (origen) | `SOLUTION-INTAKE-SelfHosted-Service.md` (de su §13 se deriva este manifiesto) | — |
| Documento | `SOLUTION-MANIFEST-SelfHosted-Service.md` | — |
| Versión | 1.6 | — |
| Fecha | 2026-07-29 | — |
| Estado | En revisión (re-derivado el 2026-07-29; espera confirmación explícita del agente humano del proyecto) | — |

**Nota de derivación de `Nombre-Solucion`.** Se deriva del **nombre de producto**, no de la identidad de código, aplicando los pasos 1 a 7 de `Master-Prompt.md` §3.2 a «SelfHosted Service»: separar por espacios, capitalizar la inicial de cada palabra y unir con guion medio da `SelfHosted-Service`. Es la decisión F-1 (b) del agente humano del proyecto: seguir la derivación en lugar de declarar el slug estable, de modo que la regla del framework se cumpla sin excepción local. El slug anterior, `SelfHosted-Service-Core`, derivaba de un campo que contenía un nombre de artefacto de código, y por eso reproducía la cadena con los puntos cambiados por guiones sin aportar información. Los dos artefactos de `SDD/Intake/` se renombraron en consecuencia; las copias de `_legacy/` conservan el nombre viejo y no se tocan.

**Nota de derivación de `NombreSolucionCodigo`.** Es un **valor declarado**, no derivado. El algoritmo de `Master-Prompt.md` §3.2 concatena sin separadores y produciría `SelfHostedServiceCore`, una raíz que ningún artefacto de esta solución usa: la solución de código es `SelfHosted.Service.Core`, que es el argumento `-n` con el que se crea, el nombre de su archivo `.sln`, la raíz de todos sus espacios de nombres y el prefijo de sus siete proyectos, cuatro de código y tres de prueba. El framework no declara qué prevalece cuando el perfil de §13 fija un literal; esta solución declara que el valor del perfil prevalece, y lo registra acá para que la derivación sea auditable en lugar de tácita. El hallazgo de framework que esto destapa está registrado en el Anexo A del informe de avance de la corrida, para revisar en `IA.SDD`.

### §1.1 Procedencia del framework

Declara bajo qué normativa se genera la documentación de esta solución. El orquestador lo completó al re-derivar el manifiesto, leyendo la entrada vigente del `CHANGELOG.md` del repositorio fuente y el campo `Versión` de la cabecera de cada archivo que va a aplicar. Se actualiza únicamente cuando el árbol se regenera bajo una versión distinta del framework. Reverificado contra los archivos vigentes el 2026-07-29, sin cambios.

| Artefacto del framework | Versión |
|---|---|
| Framework SDD (conjunto) | 4.0 (`CHANGELOG.md`, entrada `[4.0] - 2026-07-28`) |
| `Master-Prompt` | 4.0 |
| `Root-Rules` | 2.0 |
| `Rules-Contexto` | 2.0 |
| `Rules-Necesidades-Negocio` | 2.0 |
| `Rules-Especificacion-Funcional` | 2.0 |
| `Rules-UX-UI-DX` | 2.0 |
| `Rules-Arquitectura-Tecnica` | 2.0 |
| `Rules-Backlog-Tecnico` | 2.0 |
| `Rules-Plan-Sprint` | 2.0 |
| `Rules-Calidad-Y-Pruebas` | 2.0 |
| `Rules-Devops` | 2.0 |
| `Rules-Examples` | 3.0 |
| `Rules-Documentacion` | 3.0 |
| Reglas transversales aplicadas | `Intake-Rules` 2.1; `Maqueta-Rules` 2.0 y `Deriva-Rules` 2.0 por la Fase B2 prevista de `SelfHosted-Web` |

`Rules-Prompts-AI` no figura porque la categoría 04 queda excluida por gating: ningún proyecto de código de esta solución declara uso de LLM en su bloque §17 (`usa_llm` == false en los cuatro). Las dos reglas transversales de la Fase B2 se declaran como previstas y quedan sujetas a la confirmación del flag `requiere_maqueta` de `SelfHosted-Web`; si el agente humano declina la fase, esa fila se corrige en la versión siguiente.

#### Decisiones de reconciliación

Sin filas. La reconciliación normativa del 2026-07-28 se resolvió con la salida B (regenerar desde cero), que no deja registro en esta tabla: el registro de lo que pasó es este mismo bloque de procedencia reescrito con la versión nueva. La tabla queda declarada para el caso de que alguna reconciliación futura se resuelva con la salida C.

### §1.2 Perfil de convención de nombres

| Parámetro | Valor | Notas |
|---|---|---|
| `NombreSolucionCodigo`, forma del nombre de solución en código | `SelfHosted.Service.Core` | Declarado en `SOLUTION-INTAKE` §13, no derivado. Es la raíz de los espacios de nombres y el prefijo de todo proyecto de código |
| Separador de segmentos | `.` | Separa la identidad de código del sufijo de rol |
| Artefacto de agrupación de la construcción | `SelfHosted.Service.Core.sln` | Derivado como `<NombreSolucionCodigo>.sln`. Parámetro que el framework no modela y que esta solución declara en el perfil de §13 del intake |
| Prefijo de paquetes redistribuibles | `Aplicada` | No se aplica: ningún proyecto de esta solución es redistribuible |

### §1.3 Independencia de los dos planos de nombres

El `Nombre-Proyecto` y el `nombre-proyecto-codigo` de cada proyecto **divergen a propósito** y la divergencia es legítima. Es la sub-decisión E-1 (a) del agente humano del proyecto del 2026-07-29, y se declara acá porque sin esta fila un auditor no tendría contra qué verificarla.

| Plano | Forma | Raíz | Qué gobierna |
|---|---|---|---|
| Documentación | `Nombre-Proyecto`, Título-Con-Guiones | `SelfHosted` | `SDD/Docs/Proyectos/<Nombre-Proyecto>/`, `SDD/Maquetas/<Nombre-Proyecto>/` y toda cita de la documentación generada |
| Código | `nombre-proyecto-codigo`, segmentos con punto | `SelfHosted.Service.Core` | `/src`, `/tests`, cada `.csproj`, cada `namespace` y el pipeline |

Un lector que vea `SDD/Docs/Proyectos/SelfHosted-Web/` documentando el proyecto de código `SelfHosted.Service.Core.Web` está viendo el comportamiento correcto, no un error de generación. El discriminador entre las dos formas es el **sufijo de rol**, que está presente en ambas.

---

## §2 Tabla de proyectos

| `Nombre-Proyecto` | `nombre-proyecto-codigo` | `project_type` (D8) | Rol en la solución | `redistribuible` | Dependencias | Path `/src` | Path `SDD/Docs/` |
|---|---|---|---|---|---|---|---|
| `SelfHosted-Web` | `SelfHosted.Service.Core.Web` | `web-monolith` | Punto de entrada único: páginas Blazor Interactive Server, controladores REST `/api/v1` y servicios en segundo plano, en un solo proceso (principal) | false | `SelfHosted-Application`, `SelfHosted-Infrastructure`, `SelfHosted-Domain` | `src/SelfHosted.Service.Core.Web/` | `SDD/Docs/Proyectos/SelfHosted-Web/` |
| `SelfHosted-Application` | `SelfHosted.Service.Core.Application` | `library` | Casos de uso por módulo y abstracciones de salida (`IContenedorEngine`, repositorios, reloj del sistema) | false | `SelfHosted-Domain` | `src/SelfHosted.Service.Core.Application/` | `SDD/Docs/Proyectos/SelfHosted-Application/` |
| `SelfHosted-Infrastructure` | `SelfHosted.Service.Core.Infrastructure` | `library` | Adaptadores: persistencia con EF Core sobre SQLite, cliente del motor de contenedores, métricas del host y exportación | false | `SelfHosted-Application`, `SelfHosted-Domain` | `src/SelfHosted.Service.Core.Infrastructure/` | `SDD/Docs/Proyectos/SelfHosted-Infrastructure/` |
| `SelfHosted-Domain` | `SelfHosted.Service.Core.Domain` | `library` | Entidades, invariantes y reglas de negocio, sin dependencias externas | false | — | `src/SelfHosted.Service.Core.Domain/` | `SDD/Docs/Proyectos/SelfHosted-Domain/` |

Los proyectos de prueba (`SelfHosted.Service.Core.Domain.Tests`, `SelfHosted.Service.Core.Application.Tests`, `SelfHosted.Service.Core.Integration.Tests`) no son proyectos de la composición: son artefactos de la estrategia de testing de cada proyecto (§17 P.6) y viven bajo `/tests`. Toman la raíz de la identidad de código por la sub-decisión E-2 (a) del agente humano del proyecto.

---

## §3 Grafo de dependencias

```text
SelfHosted-Domain  ->  SelfHosted-Application  ->  SelfHosted-Infrastructure  ->  SelfHosted-Web
        \                       \                            \-------------------------^
         \                       \-------------------------------------------------------^
          \------------------------------------------------------------------------------^
```

Orden topológico:

```text
nivel 0: SelfHosted-Domain
nivel 1: SelfHosted-Application
nivel 2: SelfHosted-Infrastructure
nivel 3: SelfHosted-Web  (principal)
```

Ningún nivel tiene más de un proyecto, de modo que no hay paralelización posible: la generación es estrictamente secuencial.

---

## §4 Validaciones bloqueantes

| Validación | Resultado |
|---|---|
| Cada `project_type` pertenece al conjunto cerrado D8 | Cumple: `web-monolith` ×1, `library` ×3 |
| Hay exactamente un proyecto principal | Cumple: `SelfHosted-Web` |
| Sin colisión de `Nombre-Proyecto` ni de `nombre-proyecto-codigo` | Cumple: cuatro nombres distintos en ambas formas. Reverificado sobre la raíz nueva: los cuatro `nombre-proyecto-codigo` difieren en su sufijo de rol |
| Cada dependencia referencia un proyecto existente | Cumple: las seis aristas resuelven contra la tabla de §2 |
| El grafo de dependencias es acíclico | Cumple: cuatro niveles topológicos estrictos |
| §13 del intake es recorrible | Cumple: sin filas de ejemplo, perfil de convención declarado, campos bloqueantes completos |
| Los `redistribuible: true` arrancan con el prefijo de organización | No aplica: ningún proyecto es redistribuible |

---

## Control de cambios

| Versión | Fecha | Cambios | Autor |
|---|---|---|---|
| 1.6 | 2026-07-29 | **Re-derivación por cambio de §13 del intake**, obligada por `Master-Prompt.md` §13.7. Aplica las tres decisiones del agente humano del proyecto que la fase de validación de intake tenía abiertas. **D-F**: §1 pasa de un campo de nombre a cuatro identidades declaradas —nombre de producto `SelfHosted Service`, identidad documental, identidad de código y artefacto de agrupación—, cada una con su consumidor, y se agregan las dos notas de derivación que declaran cuál se deriva y cuál se declara. **D-E**: `NombreSolucionCodigo` pasa del truncado `SelfHosted` a `SelfHosted.Service.Core`, y en consecuencia los cuatro `nombre-proyecto-codigo` y sus paths de `/src` toman la raíz nueva; §1.2 suma el parámetro de artefacto de agrupación, que el framework no modela. **F-1 (b)**: `Nombre-Solucion` pasa de `SelfHosted-Service-Core` a `SelfHosted-Service`, derivado del nombre de producto, y este archivo y el intake se renombran; las copias de `_legacy/` conservan el nombre viejo. **E-1 (a)**: §1.3 es nueva y declara que los dos planos de nombres son independientes por diseño, con qué gobierna cada uno, porque sin esa declaración la divergencia entre `SelfHosted-Web` y `SelfHosted.Service.Core.Web` no es verificable contra ninguna fuente. **E-2 (a)**: los tres proyectos de prueba toman la raíz nueva. §2 suma la columna de path de documentación para que las dos rutas de cada proyecto se lean juntas. **La composición no cambió**: los cuatro proyectos, sus `project_type`, sus roles, sus dependencias, el grafo y el orden topológico son idénticos a los de la versión 1.5. El bloque de procedencia de §1.1 se reverificó contra los archivos vigentes de `IA.SDD` y se transcribe sin cambios. El estado queda `En revisión` hasta la confirmación explícita. La versión 1.5 queda archivada en `SDD/Intake/_legacy/2026-07-29/`. | Orquestador SDD |
| 1.5 | 2026-07-28 | Re-derivación en la fase de validación de intake, posterior a la reconciliación normativa de `Master-Prompt.md` §2.1 resuelta con la salida B por el agente humano del proyecto. Se emite el bloque de procedencia del framework de §1.1, que la versión 1.4 había dejado deliberadamente sin completar, con el conjunto 4.0, `Master-Prompt` 4.0, las trece reglas de categoría efectivamente aplicables y las tres transversales; el perfil de convención de nombres pasa de §1.1 a §1.2 por el formato vigente de `SOLUTION-MANIFEST-template.md`. Se declara el gating de `Rules-Prompts-AI` y la sujeción de las dos reglas de la Fase B2 a la confirmación del flag `requiere_maqueta`. La nota de encabezado sobre la procedencia se reescribe: pasa de declarar por qué el bloque no estaba a declarar bajo qué hecho verificable pasa a estarlo. **La derivación desde §13 del intake no cambió**: el bloque de solución, la tabla de proyectos, el grafo, el orden topológico y las validaciones bloqueantes son idénticos a los de la versión 1.4, porque §13 del intake no cambió. El estado pasa a `En revisión` hasta la confirmación explícita del bloque nuevo. La versión 1.4 queda archivada en `SDD/Intake/_legacy/2026-07-28/`. | Orquestador SDD |
| 1.4 | 2026-07-28 | Migración al conjunto normativo 4.0 del Framework SDD. El archivo pasa a su nombre lógico estable, `SOLUTION-MANIFEST-SelfHosted-Service-Core.md`, con la versión declarada en la cabecera, por la reformulación de las invariantes D4 y D5; la versión 1.3 queda archivada en `SDD/Intake/_legacy/2026-07-28/`. El puntero al intake de origen sigue al renombrado de ese documento, que pasó a la versión 2.0 por la misma migración. Se agrega la nota que declara por qué el bloque de procedencia del framework de §1.1 del formato vigente **no** se completa a mano: lo emite el orquestador al re-derivar, y declararlo ahora afirmaría que la documentación existente se generó bajo el conjunto 4.0, que es falso. **No se re-derivó el manifiesto y no corresponde**: §13 del intake, que es lo único de lo que este artefacto deriva, no cambió en la versión 2.0 —la migración no tocó ninguna fila de la tabla de proyectos, ningún `project_type`, ninguna dependencia y ningún nombre de código—. El bloque de solución, la tabla de proyectos, el grafo y las validaciones son idénticos a los de la versión 1.3. | Orquestador SDD |
| 1.3 | 2026-07-28 | Corrección de la nota de encabezado, que afirmaba que ninguna actualización del intake había tocado §13. Dejó de ser cierto: la cuarta actualización, que desambiguó el término «proyecto», modificó la prosa de §13 —su título, tres frases y un párrafo nuevo de alcance—, de modo que el hash idéntico que se venía verificando en ocho corridas ya no coincide. Motivo: el hallazgo lo levantó el auditor independiente del intake, que señaló que el manifiesto sostenía un hecho superado y que ningún control de cambios lo reconciliaba. La nota pasa a distinguir qué cambió —cómo §13 nombra las cosas— de qué no cambió —qué declara—, y a justificar la no re-derivación por el criterio de `Master-Prompt.md` §13.7, que obliga sólo cuando se agrega o cambia un proyecto, su tipo o una dependencia. La tabla de proyectos, los `project_type`, las dependencias y los nombres de código siguen siendo idénticos byte a byte a los de la versión 1.0 archivada. La versión 1.2 queda archivada en `SDD/Intake/_legacy/2026-07-28/`. | Orquestador SDD |
| 1.2 | 2026-07-28 | Actualización del puntero al intake de origen, que pasa de la versión 1.1 a la 1.2, en el bloque de solución y en la nota de encabezado, más la ampliación de esa nota para cubrir las dos actualizaciones del intake. Motivo: el intake incorporó siete decisiones del agente humano sobre el modelo de variables, el catálogo y la determinación del resultado de un despliegue, y su versión 1.1 dejó de estar en `SDD/Intake/`, de modo que el puntero anterior dejó de resolver. No se re-derivó el manifiesto y no corresponde: §13 del intake, que es lo único de lo que este artefacto deriva, quedó intacto, verificado por comparación directa contra la versión 1.0 archivada. El bloque de solución, la tabla de proyectos, el grafo de dependencias y las validaciones bloqueantes son idénticos a los de las versiones 1.0 y 1.1. La versión sube por la misma regla que la anterior: este artefacto ya fue consumido. La versión 1.1 queda archivada en `SDD/Intake/_legacy/2026-07-28/`. | Orquestador SDD |
| 1.1 | 2026-07-27 | Actualización del puntero al intake de origen, que pasa de la versión 1.0 a la 1.1 en el bloque de solución y en la nota de encabezado, más la nota que declara por qué la derivación sigue siendo válida. Motivo: el orquestador consolidó el intake ejecutando el flujo de `Master-Prompt.md` §13 para cerrar el hallazgo P0 del audit de la Fase A, y la versión 1.0 del intake quedó archivada en `SDD/Intake/_legacy/2026-07-27/`, de modo que el puntero anterior dejó de resolver. No se re-derivó el manifiesto y no corresponde hacerlo: la actualización del intake fue de estado de supuestos y de evidencia, y §13 del intake, que es lo único de lo que este artefacto deriva, no cambió. El bloque de solución, la tabla de proyectos, el grafo de dependencias y las validaciones bloqueantes son idénticos a los de la versión 1.0. La versión sube igual porque este artefacto ya había sido consumido: fue confirmado como canónico el 2026-07-27 y `00-Contexto` lo cita en su trazabilidad upstream, de modo que le aplica la regla de los artefactos consumidos y no la de los que absorben correcciones dentro de su emisión inicial. La versión 1.0 queda archivada en `SDD/Intake/_legacy/2026-07-27/`. | Orquestador SDD |
| 1.0 | 2026-07-27 | Manifiesto inicial derivado de `SOLUTION-INTAKE-SelfHosted-Service-Core-v1.0.md` §13 durante la fase de validación de intake, y confirmado por el agente humano del proyecto ese mismo día. Cuatro proyectos, un principal (`SelfHosted-Web`, `web-monolith`) y tres librerías, con grafo acíclico de cuatro niveles topológicos. `NombreSolucionCodigo` tomado de la declaración explícita del perfil de convención de §13 en lugar del algoritmo de normalización de `Master-Prompt.md` §3.2. | Orquestador SDD |
