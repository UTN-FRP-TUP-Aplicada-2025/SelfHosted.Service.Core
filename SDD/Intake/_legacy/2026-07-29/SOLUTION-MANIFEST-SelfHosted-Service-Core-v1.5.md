> **Bloque de archivado.** Estado: `Superado`. Esta es la copia completa y autocontenida de la versión 1.5 de `SOLUTION-MANIFEST-SelfHosted-Service-Core.md`, tomada el 2026-07-29 antes de la re-derivación que exige `Master-Prompt.md` §13.7 tras la modificación de §13 del intake. La versión vigente es `../../SOLUTION-MANIFEST-SelfHosted-Service.md`. Esta versión 1.5 nunca llegó a confirmarse: quedó en estado `En revisión` y fue superada por las decisiones D-E, D-F y F-1 antes de que el agente humano del proyecto se pronunciara sobre ella. El cuerpo de este snapshot no se modifica.

# SOLUTION-MANIFEST-SelfHosted-Service-Core

Artefacto derivado. El orquestador SDD lo construyó a partir de `SOLUTION-INTAKE-SelfHosted-Service-Core.md` §13, siguiendo `Intake-Rules.md` §4 y el formato de `SOLUTION-MANIFEST-template.md`. No se completa a mano.

**Procedencia del framework declarada, 2026-07-28.** El bloque de §1.1, que la versión 1.4 dejó deliberadamente sin completar, está emitido desde esta versión. Lo emitió el orquestador al re-derivar el manifiesto en la fase de validación de intake, leyendo la entrada vigente del `CHANGELOG.md` del framework y la versión de cabecera de cada regla que la solución va a aplicar. Declararlo antes habría afirmado que la documentación existente se generó bajo el conjunto 4.0, que era falso; ahora es cierto, porque la reconciliación normativa de `Master-Prompt.md` §2.1 se resolvió con la salida B —regenerar desde cero— el 2026-07-28, con el árbol anterior archivado completo en `SDD/Docs/_legacy/2026-07-28/` y la generación reiniciada bajo el conjunto vigente. La ausencia del bloque hasta la versión 1.4 fue lo que hizo que esa reconciliación clasificara al destino en el caso «sin procedencia», que era el correcto.

La derivación se hizo sobre la versión 1.0 del intake y sigue siendo válida sobre la 2.0, que es la vigente. El intake pasó por cinco actualizaciones desde entonces —las cuatro pasadas de contenido y la migración al conjunto normativo 4.0— y todas fueron verificadas contra §13, que es lo único de lo que este manifiesto deriva. La quinta, la migración, **no tocó §13 en absoluto**: renombró el archivo, agregó la tabla de contenido, normalizó el formato de la Parte D e incorporó la Parte E.

**Qué cambió en §13 y qué no.** Las tres primeras actualizaciones —la consolidación de supuestos, la incorporación de las siete decisiones del agente humano y la reformulación del modelo de vínculo— **no tocaron §13 en absoluto**, verificado ocho veces por comparación directa contra la versión 1.0 archivada. La cuarta, que desambiguó el término «proyecto», **sí modificó su prosa**: el título de la sección, la frase que señala el proyecto principal, la nota sobre los proyectos de prueba, la fila del prefijo de redistribuibles y un párrafo nuevo que declara que la sección habla exclusivamente de proyectos de código.

**Por qué no corresponde re-derivar.** Lo que cambió es cómo §13 nombra las cosas, no qué declara. Ninguna fila de la tabla de proyectos, ningún `project_type`, ninguna dependencia y ningún nombre de código cambió: son idénticos byte a byte a los de la versión 1.0. `Master-Prompt.md` §13.7 obliga a re-derivar cuando la modificación agrega o cambia un proyecto, su tipo o una dependencia, y ninguna de esas tres cosas ocurrió. El bloque de solución, la tabla de proyectos, el grafo y las validaciones de este manifiesto siguen siendo los correctos.

---

## §1 Bloque de solución

| Campo | Valor |
|---|---|
| Nombre de solución | SelfHosted.Service.Core |
| `Nombre-Solucion` | `SelfHosted-Service-Core` |
| `NombreSolucionCodigo` | `SelfHosted` |
| Proyecto principal | `SelfHosted-Web` |
| Intake (origen) | `SOLUTION-INTAKE-SelfHosted-Service-Core.md` (de su §13 se deriva este manifiesto) |
| Documento | `SOLUTION-MANIFEST-SelfHosted-Service-Core.md` |
| Versión | 1.5 |
| Fecha | 2026-07-28 |
| Estado | En revisión (re-derivado el 2026-07-28; espera confirmación explícita del agente humano del proyecto sobre el bloque de procedencia) |

Nota de derivación de `NombreSolucionCodigo`. El algoritmo de normalización de `Master-Prompt.md` §3.2 aplicado al nombre legible produciría `SelfHostedServiceCore`. El intake §13 declara explícitamente la forma del nombre de solución en código como `SelfHosted`, porque la raíz de los nombres de código ya está fijada por la estructura de `/src` del análisis integrado. El valor declarado prevalece sobre el derivado, y los nombres de código resultantes coinciden exactamente con los directorios de `/src` de §16 y con la identidad de cada bloque §17.

### §1.1 Procedencia del framework

Declara bajo qué normativa se genera la documentación de esta solución. El orquestador lo completó al re-derivar el manifiesto, leyendo la entrada vigente del `CHANGELOG.md` del repositorio fuente y el campo `Versión` de la cabecera de cada archivo que va a aplicar. Se actualiza únicamente cuando el árbol se regenera bajo una versión distinta del framework.

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
| Forma del nombre de solución en código | `SelfHosted` | Declarado en `SOLUTION-INTAKE` §13, no derivado |
| Separador de segmentos | `.` | Separa la raíz de la solución del sufijo de rol |
| Prefijo de paquetes redistribuibles | `Aplicada` | No se aplica: ningún proyecto de esta solución es redistribuible |

---

## §2 Tabla de proyectos

| `Nombre-Proyecto` | `nombre-proyecto-codigo` | `project_type` (D8) | Rol en la solución | `redistribuible` | Dependencias | Path `/src` |
|---|---|---|---|---|---|---|
| `SelfHosted-Web` | `SelfHosted.Web` | `web-monolith` | Punto de entrada único: páginas Blazor Interactive Server, controladores REST `/api/v1` y servicios en segundo plano, en un solo proceso (principal) | false | `SelfHosted-Application`, `SelfHosted-Infrastructure`, `SelfHosted-Domain` | `src/SelfHosted.Web/` |
| `SelfHosted-Application` | `SelfHosted.Application` | `library` | Casos de uso por módulo y abstracciones de salida (`IContenedorEngine`, repositorios, reloj del sistema) | false | `SelfHosted-Domain` | `src/SelfHosted.Application/` |
| `SelfHosted-Infrastructure` | `SelfHosted.Infrastructure` | `library` | Adaptadores: persistencia con EF Core sobre SQLite, cliente del motor de contenedores, métricas del host y exportación | false | `SelfHosted-Application`, `SelfHosted-Domain` | `src/SelfHosted.Infrastructure/` |
| `SelfHosted-Domain` | `SelfHosted.Domain` | `library` | Entidades, invariantes y reglas de negocio, sin dependencias externas | false | — | `src/SelfHosted.Domain/` |

Los proyectos de prueba (`SelfHosted.Domain.Tests`, `SelfHosted.Application.Tests`, `SelfHosted.Integration.Tests`) no son proyectos de la composición: son artefactos de la estrategia de testing de cada proyecto (§17 P.6) y viven bajo `/tests`.

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
| Sin colisión de `Nombre-Proyecto` ni de `nombre-proyecto-codigo` | Cumple: cuatro nombres distintos en ambas formas |
| Cada dependencia referencia un proyecto existente | Cumple: las seis aristas resuelven contra la tabla de §2 |
| El grafo de dependencias es acíclico | Cumple: cuatro niveles topológicos estrictos |
| §13 del intake es recorrible | Cumple: sin filas de ejemplo, perfil de convención declarado, campos bloqueantes completos |
| Los `redistribuible: true` arrancan con el prefijo de organización | No aplica: ningún proyecto es redistribuible |

---

## Control de cambios

| Versión | Fecha | Cambios | Autor |
|---|---|---|---|
| 1.0 | 2026-07-27 | Manifiesto inicial derivado de `SOLUTION-INTAKE-SelfHosted-Service-Core-v1.0.md` §13 durante la fase de validación de intake, y confirmado por el agente humano del proyecto ese mismo día. Cuatro proyectos, un principal (`SelfHosted-Web`, `web-monolith`) y tres librerías, con grafo acíclico de cuatro niveles topológicos. `NombreSolucionCodigo` tomado de la declaración explícita del perfil de convención de §13 en lugar del algoritmo de normalización de `Master-Prompt.md` §3.2. | Orquestador SDD |
| 1.2 | 2026-07-28 | Actualización del puntero al intake de origen, que pasa de la versión 1.1 a la 1.2, en el bloque de solución y en la nota de encabezado, más la ampliación de esa nota para cubrir las dos actualizaciones del intake. Motivo: el intake incorporó siete decisiones del agente humano sobre el modelo de variables, el catálogo y la determinación del resultado de un despliegue, y su versión 1.1 dejó de estar en `SDD/Intake/`, de modo que el puntero anterior dejó de resolver. No se re-derivó el manifiesto y no corresponde: §13 del intake, que es lo único de lo que este artefacto deriva, quedó intacto, verificado por comparación directa contra la versión 1.0 archivada. El bloque de solución, la tabla de proyectos, el grafo de dependencias y las validaciones bloqueantes son idénticos a los de las versiones 1.0 y 1.1. La versión sube por la misma regla que la anterior: este artefacto ya fue consumido. La versión 1.1 queda archivada en `SDD/Intake/_legacy/2026-07-28/`. | Orquestador SDD |
| 1.1 | 2026-07-27 | Actualización del puntero al intake de origen, que pasa de la versión 1.0 a la 1.1 en el bloque de solución y en la nota de encabezado, más la nota que declara por qué la derivación sigue siendo válida. Motivo: el orquestador consolidó el intake ejecutando el flujo de `Master-Prompt.md` §13 para cerrar el hallazgo P0 del audit de la Fase A, y la versión 1.0 del intake quedó archivada en `SDD/Intake/_legacy/2026-07-27/`, de modo que el puntero anterior dejó de resolver. No se re-derivó el manifiesto y no corresponde hacerlo: la actualización del intake fue de estado de supuestos y de evidencia, y §13 del intake, que es lo único de lo que este artefacto deriva, no cambió. El bloque de solución, la tabla de proyectos, el grafo de dependencias y las validaciones bloqueantes son idénticos a los de la versión 1.0. La versión sube igual porque este artefacto ya había sido consumido: fue confirmado como canónico el 2026-07-27 y `00-Contexto` lo cita en su trazabilidad upstream, de modo que le aplica la regla de los artefactos consumidos y no la de los que absorben correcciones dentro de su emisión inicial. La versión 1.0 queda archivada en `SDD/Intake/_legacy/2026-07-27/`. | Orquestador SDD |
| 1.3 | 2026-07-28 | Corrección de la nota de encabezado, que afirmaba que ninguna actualización del intake había tocado §13. Dejó de ser cierto: la cuarta actualización, que desambiguó el término «proyecto», modificó la prosa de §13 —su título, tres frases y un párrafo nuevo de alcance—, de modo que el hash idéntico que se venía verificando en ocho corridas ya no coincide. Motivo: el hallazgo lo levantó el auditor independiente del intake, que señaló que el manifiesto sostenía un hecho superado y que ningún control de cambios lo reconciliaba. La nota pasa a distinguir qué cambió —cómo §13 nombra las cosas— de qué no cambió —qué declara—, y a justificar la no re-derivación por el criterio de `Master-Prompt.md` §13.7, que obliga sólo cuando se agrega o cambia un proyecto, su tipo o una dependencia. La tabla de proyectos, los `project_type`, las dependencias y los nombres de código siguen siendo idénticos byte a byte a los de la versión 1.0 archivada. La versión 1.2 queda archivada en `SDD/Intake/_legacy/2026-07-28/`. | Orquestador SDD |
| 1.5 | 2026-07-28 | Re-derivación en la fase de validación de intake, posterior a la reconciliación normativa de `Master-Prompt.md` §2.1 resuelta con la salida B por el agente humano del proyecto. Se emite el bloque de procedencia del framework de §1.1, que la versión 1.4 había dejado deliberadamente sin completar, con el conjunto 4.0, `Master-Prompt` 4.0, las trece reglas de categoría efectivamente aplicables y las tres transversales; el perfil de convención de nombres pasa de §1.1 a §1.2 por el formato vigente de `SOLUTION-MANIFEST-template.md`. Se declara el gating de `Rules-Prompts-AI` y la sujeción de las dos reglas de la Fase B2 a la confirmación del flag `requiere_maqueta`. La nota de encabezado sobre la procedencia se reescribe: pasa de declarar por qué el bloque no estaba a declarar bajo qué hecho verificable pasa a estarlo. **La derivación desde §13 del intake no cambió**: el bloque de solución, la tabla de proyectos, el grafo, el orden topológico y las validaciones bloqueantes son idénticos a los de la versión 1.4, porque §13 del intake no cambió. El estado pasa a `En revisión` hasta la confirmación explícita del bloque nuevo. La versión 1.4 queda archivada en `SDD/Intake/_legacy/2026-07-28/`. | Orquestador SDD |
| 1.4 | 2026-07-28 | Migración al conjunto normativo 4.0 del Framework SDD. El archivo pasa a su nombre lógico estable, `SOLUTION-MANIFEST-SelfHosted-Service-Core.md`, con la versión declarada en la cabecera, por la reformulación de las invariantes D4 y D5; la versión 1.3 queda archivada en `SDD/Intake/_legacy/2026-07-28/`. El puntero al intake de origen sigue al renombrado de ese documento, que pasó a la versión 2.0 por la misma migración. Se agrega la nota que declara por qué el bloque de procedencia del framework de §1.1 del formato vigente **no** se completa a mano: lo emite el orquestador al re-derivar, y declararlo ahora afirmaría que la documentación existente se generó bajo el conjunto 4.0, que es falso. **No se re-derivó el manifiesto y no corresponde**: §13 del intake, que es lo único de lo que este artefacto deriva, no cambió en la versión 2.0 —la migración no tocó ninguna fila de la tabla de proyectos, ningún `project_type`, ninguna dependencia y ningún nombre de código—. El bloque de solución, la tabla de proyectos, el grafo y las validaciones son idénticos a los de la versión 1.3. | Orquestador SDD |
