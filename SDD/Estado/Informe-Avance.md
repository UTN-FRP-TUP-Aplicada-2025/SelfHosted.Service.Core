# Informe de avance de la corrida del orquestador SDD

**Solución:** SelfHosted Service (identidad de código `SelfHosted.Service.Core`)
**Documento:** `Informe-Avance.md`
**Versión:** 2.8
**Estado:** Vigente — Fases A y B cerradas y aprobadas. Fase B2 en ejecución
**Fecha:** 2026-07-29
**Autor:** Orquestador SDD
**Naturaleza:** Documento de trabajo del proceso, fuera de `SDD/Docs/`. No es artefacto de ninguna de las doce categorías y ningún subagente lo consume como insumo. Existe para llevar el registro de las decisiones del agente humano del proyecto y de los hallazgos que la corrida produce sobre el framework.

> **Nota de reconstrucción, 2026-07-29.** Este documento fue **reconstruido** a pedido del agente humano del proyecto. La versión 1.9 fue borrada del árbol junto con el reemplazo de `apuntes.md`, y `SDD/` no tiene seguimiento en el repositorio destino, de modo que no era recuperable de ningún objeto de git. Se reconstruyó a partir del historial de la conversación de la corrida, no del archivo. Sube a 2.0 y no continúa la serie 1.x porque su contenido se reordenó: el registro de decisiones pasó a ser la sección principal y el detalle de cada punto resuelto se condensó, conservando íntegros los dos anexos. **Lo que este documento afirma sobre decisiones tomadas es verificable contra el control de cambios del `SOLUTION-INTAKE` y del `SOLUTION-MANIFEST`**, que las registran una por una; lo que afirma sobre el framework es verificable contra los archivos de `IA.SDD`.

## Tabla de contenido

- [1. Dónde está parada la corrida](#1-dónde-está-parada-la-corrida)
- [2. Registro de decisiones del agente humano del proyecto](#2-registro-de-decisiones-del-agente-humano-del-proyecto)
- [3. Lo ejecutado, con su evidencia](#3-lo-ejecutado-con-su-evidencia)
- [4. Puntos abiertos](#4-puntos-abiertos)
- [5. Qué sigue](#5-qué-sigue)
- [Anexo A · Hallazgos sobre el Framework SDD](#anexo-a--hallazgos-sobre-el-framework-sdd)
- [Anexo B · Análisis de causa: la identidad de la solución en el SDD](#anexo-b--análisis-de-causa-la-identidad-de-la-solución-en-el-sdd)
- [Control de cambios](#control-de-cambios)

---

## 1. Dónde está parada la corrida

| Fase | Estado |
|---|---|
| Reconciliación normativa (`Master-Prompt.md` §2.1) | **Cerrada** el 2026-07-28. Caso «sin procedencia», salida B: regenerar desde cero. El árbol anterior quedó archivado en `SDD/Docs/_legacy/2026-07-28/`, 119 archivos verificados con `diff -r` antes de vaciar |
| Validación de intake (`Master-Prompt.md` §3) | **Cerrada sin bloqueantes** |
| Derivación del manifiesto | **Cerrada.** Cinco intervenciones el 2026-07-29: 1.6 separó las identidades, 1.7 colapsó la composición y fue confirmada como canónica, 1.8 actualizó la procedencia a 4.1 y 1.9 corrigió una afirmación falsa de la 1.8 |
| Fase A · 00-Contexto y 01-Necesidades-Negocio | **Generada** el 2026-07-29. 16 documentos, 2881 líneas, los 16 en versión 1.0 y estado `Propuesto` |
| Audit independiente de la Fase A | **APROBADO CON OBSERVACIONES**, cero P0. Informe en `SDD/Docs/Audit/A-00-01-r1.md` |
| Corrección de hallazgos | **Cerrada.** Un P1, un P2 y dos P3 corregidos; un P3 desestimado con evidencia y resuelto después con la nota al pie que el informe pedía |
| Adecuación al conjunto normativo 4.1 | **Cerrada.** Los seis documentos de `00-Contexto` pasaron por el catálogo de `Rules-Contexto` §6.1, y los 44 criterios de éxito de `01-Necesidades-Negocio` por el inventario de traza de sus tres componentes |
| Corte de la Fase A | **Aprobado el 2026-07-29** por el agente humano del proyecto |
| Fase B · 02-Especificacion-Funcional | **Generada** el 2026-07-29. 94 archivos, 8402 líneas: índice con matriz NB→CU→RN→US, 36 CU, 37 RN, modelo conceptual y 18 RC. Cobertura verificada 36/36 y 37/37, sin huecos ni sobrantes |
| Fase B · 03-UX-UI-DX | **Generada** el 2026-07-29. 23 archivos, 5046 líneas: `Experiencia-De-Uso`, glosario, README, 16 wireframes y 4 representaciones. 16 superficies especificadas contra un piso de 4 |
| Fase B · 04-Prompts-AI | **Omitida por gating**: `usa_llm` es false en el único proyecto de código. Se registra la omisión con su motivo |
| Audit de la Fase B | **APROBADO CON OBSERVACIONES**, cero P0. Informe en `SDD/Docs/Audit/B-02-03-r1.md`, 511 líneas, con muestreo declarado. 6 P1, 5 P2 y 7 P3 sobre la solución; 2 P1, 3 P2 y 2 P3 sobre el repositorio fuente y el intake |
| Corrección de los hallazgos de la Fase B | **Cerrada.** Los seis P1 corregidos y verificados por el orquestador sobre el árbol emitido |
| Corte de la Fase B | **Aprobado** el 2026-07-29 |
| Fase B2 · validación visual de maqueta | **En ejecución, paso 5.** Maqueta construida —16 superficies, `index.html`, tres assets, 352 KB— y servida en `http://127.0.0.1:8137/`. Ciclo de corrección abierto, con la primera observación del agente humano ya despachada |


---

## 2. Registro de decisiones del agente humano del proyecto

Todas del 2026-07-28 y 2026-07-29. Cada una está aplicada y trazada en el control de cambios del artefacto que tocó.

| # | Punto | Decisión | Dónde quedó aplicada |
|---|---|---|---|
| D-D | Matriz de navegadores | Google Chrome de escritorio, canal estable, versión mínima **150.0.7871.186**, en red local. Toda otra familia no soportada. Aparece además un tercer eje de plataforma que el intake no declaraba: el equipo desde el que se opera el panel, Windows Server 2022 21H2 | Intake §17.P.9, con la evidencia de `chrome://version` |
| D-E | Raíz de los nombres de código | Pasa de `SelfHosted` a la identidad completa de la solución. **Absorbida por D-F** | Intake §12, §13, §16, §17 |
| E-1 | ¿`Nombre-Proyecto` acompaña el cambio de raíz? | **No.** Los dos planos —documentación y código— son independientes por diseño | Intake §13; manifiesto §1.3 |
| E-2 | Nombres de los proyectos de prueba | Toman la raíz de la identidad de código: `SelfHosted.Service.Core.Domain.Tests` y equivalentes | Intake §13, §16 |
| D-F | Identidad de la solución | Modelo de **cuatro identidades** aprobado. Nombre de producto **`SelfHosted Service`**; identidad documental `SelfHosted-Service`; identidad de código `SelfHosted.Service.Core`; artefacto de agrupación `SelfHosted.Service.Core.sln` | Cabecera del intake, sección «Identidad de la solución»; manifiesto §1 |
| F-1 | Identidad documental | **(b)** Seguir la derivación: el slug se deriva del nombre de producto y pasa de `SelfHosted-Service-Core` a `SelfHosted-Service`. Los dos artefactos de `SDD/Intake/` se renombran. Se descartó declararlo estable, que habría agregado otra excepción local | Renombrado de los dos artefactos |
| D-B | Flags de generación | Aprobados. Con el colapso de la composición, **B-1 quedó sin objeto**: `tiene_persistencia` es del proyecto y el proyecto declara SQLite, de modo que es `true` | Registrado en §3 |
| D-C | Invariantes de la solución | Aprobadas con **C-1** (desambiguación de «proyecto»), **C-2** (tratamiento de marcadores) y **C-3** (uso de las cuatro identidades), esta última propuesta por el orquestador como consecuencia directa de D-F | Inyectadas en todo despacho de subagente |
| D-A | Manifiesto | **Aprobado.** El manifiesto 1.7 pasó a `Vigente` y es la fuente canónica de la jerarquía | Manifiesto §1 |
| D-G | Composición de la solución | **Un único proyecto de código.** Las cuatro capas de la Clean Architecture pasan de proyectos de compilación a espacios de nombres. La solución es el caso degenerado del framework | Intake §12 a §19 y Parte C completa; manifiesto §2 y §2.1 |
| D-H | Nombre del proyecto y forma de los espacios de nombres | El proyecto se llama `SelfHosted.Service.Core`, sin sufijo de rol, y la presentación se agrupa bajo una carpeta `Web/`. Se evaluaron y descartaron dos formas intermedias el mismo día | Intake §13, §16; manifiesto §1 |
| D-I | Plan de la Fase A | **Aprobado**, con la condición explícita de que `Program.cs` quede en la raíz del proyecto | Ejecutado |
| D-J | Salto del framework a 4.1 | **Adecuar la Fase A a 4.1**, en lugar de cerrarla bajo 4.0 y evaluar el salto al empezar la Fase B | Manifiesto §1.1, versiones 1.8 y 1.9; adecuación de `00-Contexto` ejecutada |
| D-K | Corte de la Fase A y alcance de la Fase B | **Corte aprobado.** La Fase B se aprueba **completa**: 02 y 03 en la misma fase, en lugar de acotarla a 02 con audit intermedio | Fase B despachada el 2026-07-29 |

### 2.1 Sobre D-H, que costó tres pasadas

El nombre del proyecto de código se decidió en tres pasadas el mismo día, y conviene que quede registrado por qué, porque el criterio que lo resolvió no era obvio al principio.

| Forma evaluada | Qué la favorecía | Por qué se descartó |
|---|---|---|
| `SelfHosted.Service.Core`, capas en la raíz | Cumple la cita literal de la regla `[E]` de aislamiento | La presentación quedaba sin segmento propio: tres espacios de nombres hermanos de las otras tres capas, que había que enumerar en el test de arquitectura |
| `SelfHosted.Service.Core.Web` | Cumple `Master-Prompt.md` §3.2 sin excepción, y nombra lo que el proyecto es | Anidaba las capas bajo `.Web`, dejaba el dominio debajo de la presentación y obligaba a **reexpresar el referente** de una regla marcada `[E]` |
| **`SelfHosted.Service.Core` con carpeta `Web/`** — la adoptada | Las cuatro capas quedan **simétricas**: una carpeta y un espacio de nombres cada una. La regla `[E]` se cita literal. No hace falta `RootNamespace` ni enumeración | Su único costo es la desviación de §3.2, declarada en el perfil de §13 |

La propuesta de la carpeta `Web/` fue del agente humano del proyecto. Es la que resolvió las dos cosas que las otras dos formas parcheaban por separado.

---

## 3. Lo ejecutado, con su evidencia

**Archivado del árbol anterior.** `SDD/Docs/` completo se copió a `SDD/Docs/_legacy/2026-07-28/`: 119 archivos, 53 directorios, 1.954.738 bytes, verificados con `diff -r` contra el original **antes** de vaciar el árbol vivo.

**Intake.** De 2.0 a **2.3**, en tres intervenciones del 2026-07-29, todas por el flujo controlado de `Master-Prompt.md` §13, con archivado previo verificado idéntico: 2.1 aplicó las decisiones de identidad, 2.2 el colapso de la composición y 2.3 el campo `Product Owner` que 4.1 incorpora. **Desvío declarado:** la versión 2.1 no quedó archivada —se editó en su lugar— y no es recuperable, porque `SDD/` no tiene seguimiento en git. Está registrado en el control de cambios del propio intake. No hay hueco de contenido: la 2.0 está archivada íntegra y la 2.2 declara entrada por entrada lo que la 2.1 introdujo.

**Manifiesto.** De 1.5 a **1.8**. La 1.5 y la 1.6 nunca llegaron a confirmarse. La 1.7 es la primera canónica y bajo ella se generó y auditó la Fase A. La 1.8 actualiza la procedencia a 4.1.

**Fase A.** AG-00 emitió los seis documentos de `00-Contexto/`; AG-01 el índice, las ocho NB y el README de `01-Necesidades-Negocio/`. 16 documentos, 2725 líneas. La salida es plana bajo `SDD/Docs/`, sin subnivel `Proyectos/` ni carpeta `Solucion/`, que es lo que corresponde al caso degenerado.

**Audit.** Veredicto **APROBADO CON OBSERVACIONES**, cero P0: un P1, un P2 y tres P3 sobre la solución, más tres hallazgos sobre el repositorio fuente. Informe en `SDD/Docs/Audit/A-00-01-r1.md`.

**Corrección de hallazgos.** Dos cosas que conviene registrar porque no salieron como el orquestador las había despachado:

- **El audit sub-reportó H-01.** Reportaba un estrechamiento de la columna `Responsable` de la matriz de riesgos; al verificar fila por fila contra la fuente `[FA]` archivada, los estrechamientos eran **cuatro** —RG-03, RG-07, RG-09 y RG-10—. Los cuatro quedaron restituidos y la columna coincide ahora carácter por carácter con la fuente.
- **El orquestador despachó mal H-05.** Lo atribuyó a `Alcance-Proyecto.md`, siendo de `Necesidades-Negocio.md`, y pidió corregir la referencia cuando el informe pide dos veces **no** corregir la transcripción, porque es literal del intake §23.4, que es de solo lectura. El subagente lo desestimó con la evidencia correcta y el orquestador lo aceptó. La corrección que corresponde es una nota al pie, no una reescritura.

---

## 4. Puntos abiertos

| # | Punto | Quién decide | Bloquea |
|---|---|---|---|
| PA-1 | Confirmar quién es el **Product Owner**. El campo se incorporó en el intake 2.3 derivado de §2 —las tres figuras coinciden en una persona— y está marcado pendiente | Agente humano del proyecto | Nada hoy. Importa porque es a quien se elevan las exclusiones de PA-2 |
| PA-2 | **Cerrado, y sin haber sido nunca un punto abierto.** El orquestador lo abrió por error: las cinco exclusiones `F-18` a `F-22` son derivables del intake §4 y §9, y AG-00 las había formalizado. No hubo nada que elevar | — | Nada |
| PA-7 | Evaluación de los riesgos de plataforma **RP-01 a RP-03**: probabilidad, impacto y responsable. El intake enuncia los tres y asigna su medición a PT-01 y a 08, pero no los evalúa | Agente humano del proyecto, con la medición de PT-01 | No bloquea el corte de la Fase A |
| PA-9 | **Diecinueve brechas declaradas por `02-Especificacion-Funcional`**, consolidadas en §9 de su índice. Diez son del agente humano del proyecto —entre ellas el código ante identificador de proyecto duplicado, el filtrado de secretos en el registro del contenedor, y las condiciones de validación de contraseña—; seis van a `05-Arquitectura-Tecnica`, una a `08`, una a `03`, una a `07` y una a `06` | Según cada brecha | No bloquean la Fase B |
| PA-11 | **Confirmada por el audit de la Fase B** como defecto del intake, no de la especificación: E-17 exige distinguir «pausado» y «finalizado» y el contrato visual de E-18 tiene siete filas sin ninguna que corresponda. El auditor declara además que el tratamiento que le dio la categoría —etiqueta textual sobre el par neutro, sin inventar filas— es el correcto | Agente humano del proyecto | No bloquea |
| PA-14 | **El anexo E-22 del intake incumple lo que E-16 declara exigible**: `RN-02`, `RN-08` y `RN-10` quedan sin caso de prueba ejecutable propio, cuando E-16 declara que cada regla se traduce en al menos una prueba | Agente humano del proyecto; lo consume `08-Calidad-Y-Pruebas` | No bloquea |
| PA-12 | **Cerrado por el audit de la Fase B.** La lectura de la categoría era correcta: `Rules-UX-UI-DX.md` §1.4 **no admite** no aplicarse cuando `usa_llm` es false, porque una ranura de compatibilidad hacia adelante tiene por caso de uso precisamente ése. El defecto es de la regla, que obliga a deducirlo, y quedó registrado contra el repositorio fuente como R-3 | — | Nada |
| PA-15 | **El alta de servicio desde cero no tiene superficie especificada**, encontrado por el agente humano del proyecto al mirar el lienzo en la maqueta. `CU-03` §4 describe el alta en diez pasos, con los pasos 3 y 4 —nombre, que es también el alias de resolución de nombres, y elección entre los tres orígenes de E-2— sin superficie que los aloje: `SUP-06` los excluye por su regla estructural de existir sólo con un servicio seleccionado, y `SUP-05` tiene once estados y ninguno es el formulario de alta. **Decisión: estado nuevo en `SUP-06`**, descartando crear superficie propia. La maqueta se corrige en el paso 5; el wireframe y `Experiencia-De-Uso`, en el paso 6 | Decidido el 2026-07-29; ejecución en curso | El cierre de la Fase B2 |
| PA-13 | **Distinción visual de las aristas que declaran espera**, única de las tres pendencias de E-18 que quedó abierta: ninguna regla del catálogo de diseño cubre representación de aristas de lienzo, de modo que no había derivación posible. La categoría declaró las tres restricciones que cualquier resolución debe cumplir | Agente humano del proyecto | La Fase B2, si se ejecuta |
| PA-10 | **Observación sobre el anexo E-16 del intake**: RN-21 declara «exactamente los tres ámbitos» y a la vez admite la variable provista por el sistema como apuntable. La categoría 02 declaró explícitamente la lectura que aplicó —la variable provista no es un cuarto ámbito— en lugar de elegirla en silencio | Agente humano del proyecto | No bloquea |
| PA-8 | **Forma del plazo** de 38 de los 44 criterios de éxito: si el criterio se verifica una vez o de forma sostenida. El intake §23.3 declara las tres formas admisibles pero no cuál corresponde a cada criterio; la categoría eligió 24 puntuales y 14 continuos dentro de ese marco | `08-Calidad-Y-Pruebas`, que es quien necesita saberlo para escribir la verificación | No bloquea |
| PA-3 | Confirmación de la asignación de responsable de los riesgos RG-01 a RG-10, que es material `[FA]` y no está declarada en el intake | Agente humano del proyecto | No bloquea |
| PA-4 | Catorce de las dieciséis especificaciones `[D-i]` siguen sin revisar. DI-01 y DI-03 están aprobadas | Agente humano del proyecto | La Fase C |
| PA-5 | Los tres objetos declarados y no diseñados: secreto, red del proyecto, y el volumen o directorio al que apunta un montaje | Trabajo propio de la Fase C | No bloquea |
| PA-6 | Asignación de F-23, F-24 y F-25 a un alcance y a un corte vertical concreto | Se resuelve en `07-Plan-Sprint` | No bloquea |

---

## 5. Qué sigue

1. **Hecho.** La adecuación a 4.1 cerró: AG-00 pasó los seis documentos por el catálogo de §6.1 y AG-01 agregó la nota al pie de H-05 y el inventario de traza de sus ocho prioridades MoSCoW, que dio que **las ocho derivan de §4 del intake**.
2. Correr el equivalente de §6.1 sobre `01-Necesidades-Negocio`, que emitió 44 criterios de éxito con target y plazo y no fue inventariado en ese eje. Lo sugirió AG-00 y es razonable: el mismo defecto de traza apareció dos veces en 00.
3. Resolver PA-1 con el agente humano del proyecto.
3. Corte de la Fase A y confirmación para arrancar la Fase B.
4. Fases B a G **una sola vez**: con un único proyecto de código no hay bucle topológico que recorrer. El orden `Domain` → `Application` → `Infrastructure` → `Web` sobrevive como orden de construcción dentro de cada corte vertical del plan de sprint, no como orden de generación de la documentación.

---

## Anexo A · Hallazgos sobre el Framework SDD

Este anexo **no es materia de esta solución**. Registra defectos del framework que aparecieron al ejecutar el orquestador sobre este destino, para que se revisen en el repositorio fuente `IA.SDD`, que el orquestador nunca modifica.

**Estado al 2026-07-29.** El framework publicó la entrada `[4.1]` de su `CHANGELOG.md` ese mismo día, a partir de un análisis externo, y corrigió varios defectos de la familia que este anexo describe. Las fichas de abajo se conservan porque son el registro de lo que esta corrida encontró y de cómo lo sorteó; **verificá contra 4.1 antes de actuar sobre cualquiera**, porque algunas pueden estar ya cerradas.

### A-1 · El perfil de convención no declara precedencia sobre el algoritmo de derivación

`Master-Prompt.md` §3.2 declara que `NombreSolucionCodigo` **se obtiene** en PascalCase del nombre legible, sin excepción declarada. La fila del perfil, en las dos plantillas, tiene por valor `PascalCase`, que es un **formato** y no un literal. Ninguna de las tres fuentes contempla que una solución declare la raíz en lugar de derivarla, ni dice qué prevalece si lo hace.

Esta corrida declaró `SelfHosted.Service.Core` como valor explícito y el manifiesto agregó una nota ad hoc para justificar que el valor declarado prevaleciera. Es una regla nueva creada por el artefacto que la regla debía gobernar. Pasó de largo por tres rondas de auditoría.

**Propuesta:** que §3.2 declare que el perfil de §13 puede fijar `NombreSolucionCodigo` como literal y que el algoritmo aplica **solo** cuando no hay valor declarado; y que la fila del perfil distinga la columna «formato por defecto» de la columna «valor declarado».

### A-2 · El algoritmo de derivación no contempla nombres ya expresados en forma de código

El algoritmo supone un nombre legible con palabras separadas por espacios —su ejemplo es `Gestión de Turnos` → `GestionDeTurnos`—. Un nombre como `SelfHosted.Service.Core` ya viene en forma de código y su tratamiento queda ambiguo: los pasos hablan de espacios, de letras ASCII, de dígitos y de guiones, y **nunca del punto**.

Los nombres de solución en forma de código son la norma en el ecosistema .NET, que es el de esta solución y el de varias que el framework va a recibir. El algoritmo produce un valor que nadie usa y empuja a todas esas soluciones al mismo parche.

**Propuesta:** declarar en §3.2 el tratamiento de los separadores ya presentes en el nombre legible, o exigir que el nombre legible se escriba en prosa y que la forma de código se declare siempre en el perfil.

### A-3 · El framework no modela la identidad del artefacto de agrupación

El framework modela el nombre legible, su slug, `NombreSolucionCodigo` y el path `src/<codigo>/`. **No tiene ningún campo para el artefacto que agrupa la construcción**: el `.sln` en .NET, el workspace en otros ecosistemas. Cero ocurrencias de `.sln` en los tres documentos de entrada.

Es el nombre que ve todo el que abre el repositorio y el primero que se contrasta contra el prefijo de los proyectos. Que no exista como campo garantiza que la incoherencia se descubra tarde: acá se descubrió en la fase de validación de intake.

**Propuesta:** agregar al perfil de convención un parámetro para el artefacto de agrupación del ecosistema, aunque sea opcional.

### A-4 · No hay regla de acoplamiento entre `Nombre-Proyecto` y `nombre-proyecto-codigo`

Las dos formas se derivan por caminos distintos y **ninguna regla declara si su divergencia es legítima**. Es la sub-decisión E-1, que el orquestador tuvo que elevar al agente humano porque el framework no la resuelve.

**Corrección incorporada tras el Anexo B.** La regla de independencia **sí existe**, pero vive en `SDD-User-Guide.md`, que no es fuente normativa: «Esta convención aplica solo al plano de código en `/src`; el plano de documentación sigue en Título-Con-Guiones sin cambios». El defecto es más chico y más específico: la regla está enunciada en la guía y **ausente del master-prompt y de las dos plantillas**, que son los artefactos que el orquestador lee para decidir.

### A-5 · `Rules-Necesidades-Negocio.md` exige la nomenclatura que el conjunto 4.0 derogó

Su **§3.1** declara la convención vigente: «El archivo vivo no lleva versión en el nombre: la declara en el campo `Versión` de su cabecera». Pero su **§6** conserva un criterio de aceptación con el regex `^NB-\d{2}-…-v\d+\.\d+\.md$`, que **exige** el sufijo, y §3.2 conserva una línea equivalente. El auditor encontró un tercer residuo en §4.5, que además exige minúsculas y contradice a D3.

Es el **único** de los dieciséis archivos de reglas que conserva el patrón. Es **bloqueante en las dos direcciones y se manifiesta en la Fase A**, que es la primera que se ejecuta: si el subagente sigue §3.1, el auditor aplica §6 literal y levanta un P0 por filename en cada NB; si sigue §6, viola D4 y D5 y el mismo auditor levanta un P0 por invariante. No hay salida que pase las dos secciones del mismo archivo.

**Cómo se sorteó:** el orquestador aplicó §3.1, que es la sección normativa de nomenclatura, y declaró en el despacho del auditor que el criterio de filename de §6 está derogado por D4 y D5.

### F-01 a F-03 · Hallazgos del auditor independiente

El auditor de la Fase A encontró tres defectos más del repositorio fuente, distintos de A-5, y los reportó separados de los hallazgos de la solución:

| # | Defecto |
|---|---|
| F-01 | Tercer residuo del regex heredado en §4.5 de `Rules-Necesidades-Negocio.md`, que además exige minúsculas y contradice §3.1 y D3 |
| F-02 | `.NET 10` enumerado como vocabulario prohibido por D7 en §5.4, lo que produce hallazgos falsos contra soluciones cuyo entorno de ejecución real es ése |
| F-03 | Contradicción entre §2.1 y §2.2 de `Rules-Contexto.md` sobre el gating de `Acuerdo-Equipo.md` en `web-monolith` |

### A-6 · El changelog de 4.1 afirma que ninguna documentación emitida deja de cumplir, y para esta solución no se sostuvo

La entrada `[4.1]` declara: «Sube minor […] Ninguna documentación ya emitida deja de cumplir». Para el conjunto del framework la afirmación es razonable. Para esta corrida **no se sostuvo**, y es una afirmación sobre el estado del sistema, así que D9 pide contrastarla.

`Rules-Contexto.md` 2.1 retira de AG-00 la autoridad de originar exclusiones y prioridades MoSCoW, y **suma a §6 un criterio de aceptación nuevo**: «Ninguna prioridad MoSCoW, exclusión, fecha objetivo, target de métrica ni criterio de transición de fase se origina en esta categoría». La adecuación pasó los seis documentos de `00-Contexto/` por el catálogo de dieciocho ambigüedades de §6.1, que es nuevo en 2.1, y encontró **una tabla de evaluación de riesgos sin fuente**: a `RP-01`, `RP-02` y `RP-03` se les había asignado probabilidad, impacto y responsable que el intake no declara —el intake enuncia los tres riesgos y asigna su medición a PT-01 y a la categoría 08, pero no los evalúa—. Más un horizonte de reincorporación propuesto y tres justificaciones glosadas.

**Corrección de este mismo anexo.** Su primera redacción afirmaba que lo que dejaba de cumplir eran cinco exclusiones —`F-18` a `F-22`— originadas por AG-00. **Esa afirmación era falsa**, y el error fue del orquestador: el intake §4 declara las cinco `Won't Have v1`, que es la etiqueta MoSCoW con la que el Product Owner declara la exclusión, y §9 trae las exclusiones correspondientes marcadas `[E]`. Las cinco eran derivables y AG-00 las había formalizado, que es exactamente su trabajo bajo 2.1. La ficha se conserva porque **su conclusión de fondo sigue en pie con otro fundamento**, más chico y de otra naturaleza.

**Por qué importa más allá de este caso.** Un cambio que retira autoridad de un rol es **retroactivo por naturaleza**: no agrega un artefacto que falte, sino que reclasifica como indebido algo que ya se produjo. La regla de que un salto minor no invalida documentación se apoya en que los cambios minor agregan o precisan; éste **quita**. El framework no tiene hoy una categoría para eso.

**Un matiz que la adecuación dejó ver, y que vale tanto como el hallazgo.** La regla nueva no invalidó el contenido de la categoría: expuso que le faltaba **declarar su propia derivación**. Las cinco exclusiones estaban bien y no lo parecían, porque nada en el documento decía de dónde salían. El criterio de §6 y el catálogo de §6.1 no cambiaron qué se podía escribir; cambiaron qué hay que hacer visible. Eso sugiere que el costo real de adoptar 2.1 sobre documentación ya emitida es de trazabilidad, no de contenido, y es una información útil para el framework al estimar el impacto de cambios de esta clase.

**Propuesta:** que el criterio de severidad del changelog distinga los cambios que **retiran** autoridad o alcance de los que agregan, y que los primeros declaren explícitamente qué de lo ya emitido queda alcanzado, aunque el salto sea minor.

---

## Anexo B · Análisis de causa: la identidad de la solución en el SDD

Responde a una pregunta concreta del agente humano del proyecto: **dónde, dentro del SDD, se produce el problema** que hace que el bloque informativo imprima dos nombres que parecen el mismo y un tercero que no nombra a ninguna solución. Como el Anexo A, es materia de `IA.SDD`.

Se mapearon las 30 ocurrencias del concepto en los 6 archivos del framework que lo definen o lo usan. El concepto se define **una sola vez** y se replica en los otros cinco.

### B-1 · El modelo: un nombre con tres renderizaciones

El framework asume que existe **un** nombre de solución, del que todo lo demás se obtiene por transformación tipográfica. `Master-Prompt.md` §3.4 lo imprime como tres líneas donde los marcadores declaran **formatos**, no conceptos:

```text
- nombre-solucion: <nombre humano>
- Nombre-Solucion: <slug>
- NombreSolucionCodigo: <PascalCase>
```

El supuesto implícito es que el nombre humano es prosa y que las otras dos formas son maneras de escribirlo. **Ese supuesto es el origen de todo lo demás.** No hay ningún campo donde una solución declare que su identidad de código es una decisión propia.

### B-2 · La cláusula que hace inexpresable una raíz de varios segmentos

`Master-Prompt.md` §3.2, última oración: «`NombreSolucionCodigo` se obtiene en PascalCase del nombre legible: separar por espacios, capitalizar la inicial de cada palabra, **concatenar sin separadores**».

«Concatenar sin separadores» es la cláusula exacta que impide expresar `SelfHosted.Service.Core`, `Contoso.Billing` o cualquier raíz de espacio de nombres de más de un segmento, que es la forma normal en .NET, en Java y en Python. Los treinta usos del concepto ilustran siempre raíces de **un solo segmento**, de modo que el caso multi-segmento no aparece nunca y su imposibilidad no se nota.

### B-3 · La cadena causal

| Paso | Qué ocurrió | Consecuencia |
|---|---|---|
| 1 | El equipo tiene una identidad de código **preexistente** | Hay un dato técnico que el framework no tiene dónde recibir |
| 2 | El framework no ofrece un campo para la identidad de código: solo el «nombre legible», del que la deriva | El único lugar donde escribirla es el campo de negocio |
| 3 | El intake escribe `SelfHosted.Service.Core` en «Nombre de la solución», que es un campo de la Parte A | **Contaminación hacia atrás**: un nombre de artefacto de código ocupa el lugar del nombre de producto. La solución queda sin nombre de producto |
| 4 | El slug se deriva de ese campo contaminado | `SelfHosted-Service-Core`: la misma cadena con los puntos cambiados por guiones. **Es lo que el agente humano vio** |
| 5 | La derivación de `NombreSolucionCodigo` sobre ese campo daría `SelfHostedServiceCore`, por B-2 | Nadie quiere ese valor |
| 6 | El intake declara `SelfHosted` como valor explícito, usando una precedencia que el framework nunca autorizó (A-1) | La identidad de código queda **truncada** y el nombre del `.sln` no existe en el modelo (A-3) |

Los seis pasos son coherentes: cada uno es la respuesta razonable al anterior. **Nadie se equivocó en un paso; el modelo no tenía la forma que el caso necesitaba**, y cada compensación agregó una convención local no declarada.

### B-4 · La evidencia de que la confusión está en el framework

`Master-Prompt.md` §8, esqueleto del prompt de despacho de todo subagente:

```text
- Solución: {{NOMBRE_SOLUCION}} ({{NOMBRE_SOLUCION}}, {{NombreSolucionCodigo}})
```

La línea repite **el mismo marcador dos veces** en dos posiciones que evidentemente deberían llevar nombres distintos. Es el mismo colapso que el agente humano observó en el bloque informativo, materializado en el artefacto que construye el contexto de cada subagente de cada fase. Si las tres identidades fueran conceptos separados en el modelo, esta línea no podría haberse escrito así.

### B-5 · Dónde el framework sí acierta, y por qué no alcanza

`SDD-User-Guide.md` declara la separación de planos que faltaba en A-4, y su ejemplo multi-proyecto muestra las dos formas divergiendo a propósito. O sea que el framework **sí distingue el plano de código del de documentación**. Lo que no distingue es, dentro del plano de negocio, el nombre del producto del nombre de la solución de código; y la distinción que sí hace vive en la **guía de usuario**, que ningún subagente lee y que no es fuente normativa.

### B-6 · Propuesta de corrección, por archivo

| Archivo | Qué cambiar |
|---|---|
| `Master-Prompt.md` §3.2 | Separar los dos orígenes: `Nombre-Solucion` se deriva del **nombre de producto**; `NombreSolucionCodigo` **se declara** en el perfil y solo se deriva cuando no hay valor declarado. Eliminar «concatenar sin separadores» como regla absoluta. Subir a norma la separación de planos que hoy dice la guía |
| `Master-Prompt.md` §3.4 | Que el bloque informativo imprima cuatro líneas con sus conceptos, no tres con sus formatos |
| `Master-Prompt.md` §8 | Corregir el esqueleto de despacho, que repite `{{NOMBRE_SOLUCION}}` dos veces (B-4) |
| `SOLUTION-INTAKE-template.md` | Un campo de **nombre de producto** en la cabecera, distinto del de identidad de código; en el perfil de §13, la fila de identidad de código con columna de valor declarado; y el artefacto de agrupación como parámetro |
| `SOLUTION-MANIFEST-template.md` | Reflejar los cuatro campos; agregar al menos un ejemplo de raíz multi-segmento, porque hoy los dos ejemplos son de un solo segmento y ocultan el caso |
| `Intake-Rules.md` §4 | El paso 1 de la derivación pasa a leer el valor declarado antes de derivar |
| Los tres anteriores, para el **slug documental** | La misma columna de valor declarado hace falta para `Nombre-Solucion`: un identificador que nombra artefactos existentes necesita poder declararse estable, porque derivarlo de nuevo equivale a renombrarlos |

**Prioridad sugerida.** B-2 y A-1 son la raíz: sin ellas, toda solución de ecosistema .NET, Java o Python repite esta discusión en su fase de validación. B-4 es una errata concreta y barata. El resto es consecuencia de las dos primeras.

---

## Control de cambios

| Versión | Fecha | Cambios | Autor |
| --- | --- | --- | --- |
| 2.8 | 2026-07-29 | **Maqueta construida, servida y en ciclo de corrección.** AG-03M fue interrumpido por un límite de gasto de la cuenta cuando le quedaban dos correcciones finales; la construcción estaba completa —16 superficies, `index.html`, tres assets, 352 KB— y el orquestador aplicó las dos correcciones pendientes verificándolas primero contra el catálogo, en lugar de aplicarlas a ciegas: el `box-shadow` ad hoc se retiró porque `Design-Rules-Web-Generico.md` §2 fija que la elevación se comunica con borde y superficie, y el `Incorporar` por fila perdió su énfasis primario porque §4.3 manda icon-buttons en las filas y reserva la primaria al encabezado. Se registra un falso positivo propio que vale como advertencia: el chequeo de integridad del JavaScript dio «desbalanceado» y era artefacto del analizador —dos expresiones regulares que contienen comillas, `/"/g` y `/'/g`—; confiar en ese resultado habría llevado a «arreglar» un archivo sano. La maqueta se sirve en el puerto 8137 porque el 8080 está ocupado por otro servicio del host, que no se tocó. **Primera observación del agente humano en el paso 5, y es el hallazgo más importante de la corrida hasta acá**: el alta de servicio desde cero no tiene superficie. Se registra como PA-15. Lo encontró mirando la maqueta en la primera pasada, después de que **el audit independiente de la Fase B y el auto-chequeo de AG-03 no lo levantaran**. Es la justificación empírica más fuerte de la Fase B2 que produjo esta corrida: el audit verifica que lo escrito cumpla las reglas, y la maqueta verifica que lo escrito alcance, que son dos propiedades distintas. | Orquestador SDD |
| 2.7 | 2026-07-29 | **Seis P1 de la Fase B corregidos, corte aprobado y Fase B2 arrancada.** AG-02 cerró sus cuatro y AG-03 sus dos; el orquestador reverificó ambos sobre el árbol emitido. Dos resultados de la corrección que valen como registro. Primero, **AG-02 corrigió la contabilidad del propio hallazgo H-04**: el universo de actores no humanos son 19 y no 16, seis trazan y no tres, y tres de los trece acuñados son actor primario y no de sistema, de modo que la corrección hubo que redactarla sobre «actores no humanos» —acotarla a los de sistema habría dejado tres fuera y la afirmación del índice seguiría siendo falsa—. Es la **tercera vez en la corrida que un subagente corrige la extensión de un hallazgo del audit**, después de los cuatro estrechamientos de la columna `Responsable` en la Fase A y del dato de anchos de ventana que ya estaba aplicado en dieciséis archivos. El patrón es consistente y se registra como criterio operativo: **el audit localiza bien los defectos y subestima su extensión**, de modo que un hallazgo es un piso y no una medida. Segundo, **H-06 se resolvió de raíz**: la correspondencia superficie↔caso de uso se declaraba en cuatro vistas independientes que se contradecían en cinco superficies, y el defecto no era de transcripción sino de fuente única faltante; ahora `Experiencia-De-Uso` §9.2 es canónica por regla, §9.3 es su inversión mecánica declarada, el README dejó de repetir la columna y los wireframes reproducen su fila declarando el origen. Verificador programático: 0 discrepancias sobre 16 superficies y 36 casos de uso. **Fase B2**: oferta aceptada, plan de 16 superficies aprobado, modelo base —`Modelos-UX-UI/` no tiene modelos registrados—, y AG-03M despachado con la instrucción de resolver la brecha `B-UX-01` dibujando una distinción de aristas que cumpla sus tres restricciones y marcándola **como propuesta a validar y no como especificación**, que es la función propia de una maqueta. | Orquestador SDD |
| 2.6 | 2026-07-29 | **Audit de la Fase B: APROBADO CON OBSERVACIONES, cero P0**, con 6 P1, 5 P2 y 7 P3 sobre la solución y 7 hallazgos sobre el repositorio fuente y el intake. Informe en `SDD/Docs/Audit/B-02-03-r1.md`, con su muestreo declarado. **Las dos instrucciones que el orquestador agregó al despacho del auditor dieron resultado, y conviene registrarlo porque corrige el modo de falla de la Fase A.** La primera, buscar datos completados sin fuente y no declarados: encontró **ocho**, cuatro de ellos P1 —una cita de caso de prueba reescrita, un conteo de reglas sin cobertura que era tres y decía dos, una cardinalidad del modelo conceptual que ninguna fuente declara, y trece de dieciséis nombres de actor sin traza bajo la afirmación explícita del índice de que todo dato traza—. En la Fase A ese mismo defecto se produjo tres veces y **el audit no lo encontró**. La segunda, evaluar las brechas en las dos direcciones: de las 39 declaradas, **27 confirmadas, 8 parciales, 3 con un componente falso y 1 íntegramente falsa**, ésta última porque el dato ya estaba en el catálogo de diseño que el subagente tenía como insumo. Una brecha falsa manda a alguien a decidir algo ya decidido, y es un defecto propio. Se registra también lo que el auditor **no** encontró, porque acota el problema: la caza dirigida sobre persona objetivo, umbrales, valores de criterios de aceptación y contrato visual dio negativo, y no hay ninguna columna de tabla rellenada completa sin fuente. PA-12 se cierra a favor de aplicar la regla y PA-11 queda confirmada; se abre PA-14 por el incumplimiento de E-22 respecto de E-16. | Orquestador SDD |
| 2.5 | 2026-07-29 | **`03-UX-UI-DX` generada y audit de la Fase B despachado.** 23 archivos y 5046 líneas en variante UX/UI: **16 superficies especificadas** contra un piso de cuatro, con los seis documentos del catálogo de diseño aplicados y citados por archivo y sección. Las cuatro extensiones por capacidad aplicaron todas, que es lo que `Master-Prompt.md` §6 predice para el arquetipo de panel de control monolítico. Los artefactos `dx-` no se generaron, correctamente: `tiene_portal_developers` es false. La categoría declaró **20 brechas, 4 contradicciones y 3 supuestos de derivación**, y trató las tres pendencias de E-18 por separado en lugar de en bloque: dos resueltas por derivación declarada e impugnable, una abierta por no existir regla que la cubra, con las tres restricciones que cualquier resolución debe respetar. Se registran PA-11 a PA-13. El despacho del auditor incorpora dos instrucciones que los anteriores no tenían: **exigirle muestreo declarado** por el volumen —117 archivos—, y pedirle que evalúe las 39 brechas en las dos direcciones, buscando específicamente **datos completados sin fuente y no declarados**, que es el modo de falla verificado de esta corrida y que en la Fase A el audit no encontró. | Orquestador SDD |
| 2.4 | 2026-07-29 | **`02-Especificacion-Funcional` generada.** 94 archivos y 8402 líneas: índice maestro con la matriz NB→CU→RN→US, los **36 casos de uso** que las ocho NB declaraban previstos con su numeración conservada, las **37 reglas de negocio** transcriptas del anexo E-16, el modelo conceptual derivado de E-9 y **18 reglas conceptuales**, obligatorias por superarse el umbral de diez entidades —11 tablas persistidas más los 3 objetos declarados y no diseñados—. La cobertura CU↔NB y CU↔RN se verificó bidireccionalmente y da cero inconsistencias; el orquestador reverificó los conteos y las invariantes sobre el árbol emitido. La disciplina de derivación que se inyectó en el despacho dio resultado: **19 brechas declaradas y ninguna resuelta por cuenta propia**, registradas como PA-9. Se registra además PA-10, una observación sobre el anexo E-16 del intake, cuya RN-21 admite dos lecturas: la categoría declaró explícitamente la que aplicó en lugar de elegirla en silencio, que es el comportamiento que C-2 pide. `03-UX-UI-DX` queda despachada con el catálogo de diseño completo: base, especialización Blazor y MudBlazor, y las cuatro extensiones por capacidad, que esta solución carga a las cuatro por ser el arquetipo de panel de control monolítico que `Master-Prompt.md` §6 describe. | Orquestador SDD |
| 2.3 | 2026-07-29 | **Corte de la Fase A aprobado y Fase B arrancada.** El agente humano del proyecto aprobó el corte y el alcance completo de la Fase B —02 y 03 en la misma fase—, descartando la alternativa de acotarla a 02 con un audit intermedio que el orquestador había ofrecido por volumen. Se registra como D-K. El despacho de AG-02 incorpora una sección de **disciplina de derivación** que no estaba en los despachos de la Fase A: la Fase A produjo tres defectos de la misma clase —columnas de tabla rellenadas con valores plausibles que ninguna fuente declaraba— y dos de los tres los encontró la adecuación a 4.1 y no el audit. El criterio nuevo de `Rules-Contexto` §6 no rige sobre `Rules-Especificacion-Funcional`, que sigue en 2.0, pero se le inyecta su espíritu al subagente por ser el modo de falla verificado de esta corrida. | Orquestador SDD |
| 2.2 | 2026-07-29 | **Cierre de la adecuación a 4.1 y del ciclo de la Fase A.** AG-01 emitió el inventario de traza de los 44 criterios de éxito, que era el eje que faltaba del criterio nuevo de `Rules-Contexto` §6 y que AG-00 había sugerido revisar tras encontrar el mismo defecto dos veces en su categoría. Resultado: **132 componentes clasificados, 120 derivados, 12 `[FA]`, cero originados**. Es un resultado negativo verificado componente por componente contra su fuente, no ausencia de hallazgos por no haber mirado, y es lo que permite que el corte se apoye en algo. Tres denominadores que estuvieron cerca de ser hallazgo se verificaron contra la fuente y resultaron declarados `[E]`. Se registra la única elección que la categoría sí hizo dentro de un marco declarado —la forma del plazo, puntual o continuo, en 38 de los 44— como PA-8, con `08-Calidad-Y-Pruebas` como destinataria. AG-01 revirtió además la salvedad que había introducido sobre `EP-18` a `EP-22` cuando el orquestador le informó una revisión en curso que no existía. §1 declara el corte de fase como el punto de detención abierto. | Orquestador SDD |
| 2.1 | 2026-07-29 | **Corrección de A-6 y cierre de PA-2, los dos por el mismo error del orquestador.** La versión 2.0 afirmaba que cinco exclusiones del `Alcance-Proyecto.md` habían sido originadas por AG-00 y que por eso incumplían el criterio nuevo de `Rules-Contexto` 2.1. Es falso y quedó verificado contra el intake: §4 declara `F-18` a `F-22` como `Won't Have v1`, que es la etiqueta MoSCoW con la que el Product Owner declara la exclusión, y §9 trae las exclusiones correspondientes marcadas `[E]`. AG-00 las había formalizado, que es su trabajo. El error fue del orquestador, que leyó como originadas cinco filas derivadas, y se propagó a este informe y al manifiesto 1.8, que la versión 1.9 corrige. A-6 se conserva porque su conclusión de fondo sigue en pie con otro fundamento: lo que sí resultó originado es la **evaluación de los riesgos `RP-01` a `RP-03`**, que ninguna fuente declara, más un horizonte y tres glosas. Se suma a A-6 el matiz que la adecuación dejó ver: 2.1 no invalidó contenido, expuso que faltaba declarar la derivación, de modo que el costo de adoptarla sobre documentación emitida es de trazabilidad y no de contenido. PA-2 pasa a cerrado y se abre PA-7 con la evaluación de los tres riesgos de plataforma. §5 incorpora correr el equivalente de §6.1 sobre la categoría 01. | Orquestador SDD |
| 2.0 | 2026-07-29 | **Reconstrucción del documento**, a pedido del agente humano del proyecto, tras el borrado de la versión 1.9. Se reconstruyó del historial de la corrida y no del archivo, que no era recuperable de git porque `SDD/` no tiene seguimiento en el repositorio destino. Sube a 2.0 porque el contenido se reordenó: §2 pasa a ser el registro consolidado de las trece decisiones del agente humano, cada una con dónde quedó aplicada, y §2.1 suma el detalle de por qué D-H costó tres pasadas; §3 condensa lo ejecutado y registra las dos cosas que no salieron como el orquestador las despachó —el sub-reporte de H-01 por el audit y el despacho equivocado de H-05 por el propio orquestador—; §4 consolida los seis puntos abiertos con quién decide cada uno. Los dos anexos se conservan íntegros, con dos incorporaciones: F-01 a F-03, los tres hallazgos de framework del auditor independiente, y **A-6**, que registra que la afirmación del changelog de 4.1 de que ninguna documentación emitida deja de cumplir no se sostuvo para esta solución, con el análisis de por qué un cambio que retira autoridad es retroactivo por naturaleza. | Orquestador SDD |
