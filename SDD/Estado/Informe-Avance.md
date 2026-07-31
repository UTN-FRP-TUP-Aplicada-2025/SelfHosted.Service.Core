# Informe de avance de la corrida del orquestador SDD

**Solución:** SelfHosted Service (identidad de código `SelfHosted.Service.Core`)
**Documento:** `Informe-Avance.md`
**Versión:** 2.9
**Estado:** Vigente — Fases A y B cerradas y aprobadas. Fase B2 en ejecución, con la especificación corregida y la maqueta pendiente de rehacer
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
- [6. Fix de las definiciones de servicio · lo aplicado, lo declarado y lo que quedó fuera](#6-fix-de-las-definiciones-de-servicio--lo-aplicado-lo-declarado-y-lo-que-quedó-fuera)
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
| Fase B2 · validación visual de maqueta | **En ejecución, paso 5, con un desvío mayor.** La maqueta está construida —16 superficies, `index.html`, tres assets, 352 KB— y servida en `http://127.0.0.1:8137/`. El ciclo de corrección destapó un **defecto de definición de producto y no de representación visual**, que obligó a corregir la especificación antes de poder rehacer la maqueta. Ver la fila siguiente |
| Corrección de las definiciones de servicio (Fix SDD) | **Ejecutada el 2026-07-29.** El intake pasa a **2.4** y `02` y `03` incorporan las definiciones de alta y configuración de servicios y de ítems del catálogo. **La maqueta no se rehizo**: se rehace desde la especificación corregida, que es el orden que §21.4 del documento de entrada exige. Ver §6 |


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
| PA-9 | **Veinticuatro brechas declaradas por `02-Especificacion-Funcional`** desde el 2026-07-29, consolidadas en §9 de su índice: eran diecinueve, se agregan `B-20` a `B-24` con el fix de las definiciones de servicio, y **`B-09` queda cerrada** con su fila conservada. Dos amplían su alcance, `B-01` y `B-05`. La categoría `03` declara además veinticinco brechas sobre veintisiete identificadores, con `B-UX-23` a `B-UX-27` nuevas. Detalle original: Diez son del agente humano del proyecto —entre ellas el código ante identificador de proyecto duplicado, el filtrado de secretos en el registro del contenedor, y las condiciones de validación de contraseña—; seis van a `05-Arquitectura-Tecnica`, una a `08`, una a `03`, una a `07` y una a `06` | Según cada brecha | No bloquean la Fase B |
| PA-11 | **Confirmada por el audit de la Fase B** como defecto del intake, no de la especificación: E-17 exige distinguir «pausado» y «finalizado» y el contrato visual de E-18 tiene siete filas sin ninguna que corresponda. El auditor declara además que el tratamiento que le dio la categoría —etiqueta textual sobre el par neutro, sin inventar filas— es el correcto | Agente humano del proyecto | No bloquea |
| PA-14 | **Alcance ampliado el 2026-07-29. El anexo E-22 del intake incumple lo que E-16 declara exigible**: quedan sin caso de prueba ejecutable propio `RN-02`, `RN-08` y `RN-10`, más las **tres nuevas** `RN-38`, `RN-39` y `RN-40`, que el anexo no puede cubrir porque es anterior a ellas. **La brecha de `RN-08` pasa de un caso a seis**, uno por variante de origen más el de campo ajeno. Tampoco hay casos para las vías de alta, los dos informes de verificación, el estado borrador, el comando de arranque, la conversión de secretos ni la colisión de identificador al importar | Agente humano del proyecto; lo consume `08-Calidad-Y-Pruebas` | No bloquea |
| PA-12 | **Cerrado por el audit de la Fase B.** La lectura de la categoría era correcta: `Rules-UX-UI-DX.md` §1.4 **no admite** no aplicarse cuando `usa_llm` es false, porque una ranura de compatibilidad hacia adelante tiene por caso de uso precisamente ése. El defecto es de la regla, que obliga a deducirlo, y quedó registrado contra el repositorio fuente como R-3 | — | Nada |
| PA-15 | **Reabierto el 2026-07-29 por conflicto con el fix de las definiciones de servicio.** El punto se había resuelto como «estado nuevo en `SUP-06`, descartando crear superficie propia», y el hallazgo que lo originó resultó ser mucho más grande que una superficie faltante: **el origen del servicio estaba mal definido como producto**. El documento de entrada del fix, posterior a esta decisión, trata el alta como superficie propia y manda rehacerla, y el fix se ejecutó así: `SUP-17` con wireframe propio. **El conflicto está declarado** en `Wireframes-Alta-De-Servicio.md` §1 y en §6.5 de este informe, con la operación mecánica que lo revierte si se sostiene la decisión original —el contenido no cambia, sólo dónde vive—. **Esta ejecución no revirtió la decisión: la dejó planteada** | Agente humano del proyecto | El cierre de la Fase B2 |
| PA-13 | **Distinción visual de las aristas que declaran espera**, única de las tres pendencias de E-18 que quedó abierta: ninguna regla del catálogo de diseño cubre representación de aristas de lienzo, de modo que no había derivación posible. La categoría declaró las tres restricciones que cualquier resolución debe cumplir | Agente humano del proyecto | La Fase B2, si se ejecuta |
| PA-10 | **Observación sobre el anexo E-16 del intake**: RN-21 declara «exactamente los tres ámbitos» y a la vez admite la variable provista por el sistema como apuntable. La categoría 02 declaró explícitamente la lectura que aplicó —la variable provista no es un cuarto ámbito— en lugar de elegirla en silencio | Agente humano del proyecto | No bloquea |
| PA-8 | **Forma del plazo** de 38 de los 44 criterios de éxito: si el criterio se verifica una vez o de forma sostenida. El intake §23.3 declara las tres formas admisibles pero no cuál corresponde a cada criterio; la categoría eligió 24 puntuales y 14 continuos dentro de ese marco | `08-Calidad-Y-Pruebas`, que es quien necesita saberlo para escribir la verificación | No bloquea |
| PA-3 | Confirmación de la asignación de responsable de los riesgos RG-01 a RG-10, que es material `[FA]` y no está declarada en el intake | Agente humano del proyecto | No bloquea |
| PA-4 | **Alcance ampliado el 2026-07-29. Veintidós de las veinticuatro** especificaciones `[D-i]` siguen sin revisar: las catorce de la tanda original, más las **ocho** que el intake 2.4 agrega con el fix de las definiciones de servicio, `DI-17` a `DI-24`, que nacen sin revisar. `DI-01` y `DI-03` siguen siendo las dos aprobadas. **Tres de las ocho nuevas condicionan la forma de una pantalla** y por lo tanto bloquean la reconstrucción de la maqueta: `DI-17`, `DI-18` y `DI-19` | Agente humano del proyecto | La Fase C, y **la reconstrucción de la maqueta** para tres de ellas |
| PA-5 | **Cuatro** objetos declarados y no diseñados desde el 2026-07-29: secreto, red del proyecto, el volumen o directorio al que apunta un montaje, y la **imagen**, que el anexo E-23 del intake 2.4 declara con su modelo conceptual y sin diseñar sus columnas | Trabajo propio de la Fase C | No bloquea |
| PA-6 | Asignación de F-23, F-24 y F-25 a un alcance y a un corte vertical concreto | Se resuelve en `07-Plan-Sprint` | No bloquea |

---

## 5. Qué sigue

1. **Hecho.** La adecuación a 4.1 cerró: AG-00 pasó los seis documentos por el catálogo de §6.1 y AG-01 agregó la nota al pie de H-05 y el inventario de traza de sus ocho prioridades MoSCoW, que dio que **las ocho derivan de §4 del intake**.
2. Correr el equivalente de §6.1 sobre `01-Necesidades-Negocio`, que emitió 44 criterios de éxito con target y plazo y no fue inventariado en ese eje. Lo sugirió AG-00 y es razonable: el mismo defecto de traza apareció dos veces en 00.
3. Resolver PA-1 con el agente humano del proyecto.
3. Corte de la Fase A y confirmación para arrancar la Fase B.
4. Fases B a G **una sola vez**: con un único proyecto de código no hay bucle topológico que recorrer. El orden `Domain` → `Application` → `Infrastructure` → `Web` sobrevive como orden de construcción dentro de cada corte vertical del plan de sprint, no como orden de generación de la documentación.

**Actualización del 2026-07-29, tras el fix de las definiciones de servicio.** Lo que sigue, en orden:

1. **Resolver con el agente humano del proyecto las cuatro decisiones que condicionan la forma de una pantalla**, enumeradas en §6.7: confirmar `DI-17`, `DI-18` y `DI-19`, y decidir `Q-27`. Sin ellas, rehacer la maqueta produciría pantallas que hay que volver a rehacer.
2. **Resolver `PA-15`**, que quedó reabierto por conflicto: si el alta de servicio es superficie propia `SUP-17` —como el fix la emitió— o estado de `SUP-06` —como la decisión anterior del mismo día había resuelto—. Ver §6.5.
3. **Rehacer la maqueta desde la especificación corregida**, no desde el documento de trabajo. Alcanza a `SUP-05`, `SUP-06`, `SUP-07`, `SUP-10`, `SUP-11` y `SUP-17`; **`SUP-18` no se construye** hasta que `Q-15` y `Q-17` se cierren.
4. **Auditar la especificación corregida**, que ya se hizo: informe en `SDD/Docs/Audit/B2-Fix-Definiciones-Servicio-r1.md`.
5. Cerrar la Fase B2 y arrancar la Fase C con el intake 2.4 y las categorías `02` y `03` corregidas.

---

## 6. Fix de las definiciones de servicio · lo aplicado, lo declarado y lo que quedó fuera

**Qué se ejecutó.** La parte normativa —§16 a §23— del documento de trabajo `SDD/Estado/Redefinicion-Servicio.md` v2.0 se incorporó a la especificación del producto. **Su parte de derivación, §1 a §15, no se usó**: es antecedente y contiene seis pasajes superados que su propio §0.1 enumera. Ningún pasaje de la derivación se usó para contradecir la normativa, que es la regla de precedencia que el documento declara.

> **Dónde está la tabla de trazabilidad fila por fila de §22.** El objetivo 4 de la orden de trabajo pide que cada fila de §22 pueda responder **si se aplicó, dónde, y con qué versión del artefacto**. Esa tabla es **§3 del informe de auditoría** `SDD/Docs/Audit/B2-Fix-Definiciones-Servicio-r1.md`, que la emite completa para las cinco subsecciones de §22. Acá vive el contraste del **estado previo** —§6.1— y lo aplicado **por artefacto** —§6.2—, que son las otras dos mitades de la misma pregunta.

### 6.1 Contraste fila por fila con §22, que es lo que la ejecución verificó antes de tocar nada

§22 se trató como **punto de partida verificable y no como inventario cerrado**. Fila por fila, el estado previo del destino era:

| Fila de §22 | Estado previo verificado |
|---|---|
| E-2, cinco variantes de origen | **No cubierto.** Tres valores planos: `imagen`, `repositorio`, `dockerfile` |
| E-2, comando de arranque | **No cubierto, y más grande de lo que el documento declara.** Ver §6.4 |
| E-2, Dockerfile como contenido | **No cubierto.** Era ruta absoluta del servidor |
| E-2, credenciales de registro | **Parcial.** Existía `credencialId` indiferenciada para las dos entidades distintas |
| E-2, digesto y procedencia de plantilla | **No cubierto.** Cero ocurrencias de digesto en el intake |
| E-6, tipos cerrados y `porDefecto` prohibido | **Parcial.** `generar` ya existía en los ejemplos; los tipos se inferían y nada prohibía `porDefecto` sobre `secreto` |
| E-7, puertos publicados | **No cubierto.** El candidato traía direcciones IP y ningún puerto |
| Imagen como objeto con identidad | **No cubierto.** Ni anexo propio ni entrada en E-9 |
| §4, vía de alta como eje propio | **Parcial.** El eje existía desde D-7, con cuatro vías sobre tres orígenes |
| Los siete CU de §22.2 | **No cubiertos**, cada uno en lo que la fila pedía |
| Los dos CU nuevos | **No existían** |
| Las tres RN nuevas | **No existían.** Verificado: ninguna de las nueve reglas de puertos y direcciones cubría la colisión de puerto de host |
| Modelo conceptual y restricciones | **No cubierto.** Quince entidades y ninguna era la imagen; RC-01 a RC-18 y ninguna era el puerto único por host; glosario sin las cinco entradas que §22.4 pide |
| Capa de experiencia | **No cubierto, y con un hallazgo de más.** Ver §6.5 |

### 6.2 Lo aplicado, por artefacto

| Artefacto | De → a | Qué incorpora |
|---|---|---|
| `SOLUTION-INTAKE-SelfHosted-Service` | 2.3 → **2.4** | Sección de decisiones nueva con **D-14** a **D-17**; §4 con la nota de los dos ejes y las siete vías; **E-2** rehecho con las cinco variantes, seis campos nuevos y los dos informes de verificación; **E-6** con tipos cerrados, conversión de secretos, informes de instanciación e importación y las consecuencias del vínculo débil; **E-7** con los puertos publicados y RA-07; **E-23 nuevo**, la imagen como objeto con identidad; **E-16** con RN-38, RN-39 y RN-40 y con RN-08 y RN-15 reformuladas; §12 con siete entradas de glosario; §19 con `DI-17` a `DI-24` y las diecisiete pendientes |
| `Especificacion-Funcional.md` | 1.0 → **1.1** | Catálogos a 38 CU, 40 RN y 19 RC; §7 con el desajuste de cobertura declarado; §9 de diecinueve a veinticuatro brechas, con **B-09 cerrada** |
| `CU-03` | 1.0 → **2.0** | Flujo renumerado: elegir vía, cinco variantes, verificación de origen separada, comando de arranque, tres estados del servicio, guardado transversal. Seis flujos alternativos y catorce criterios de aceptación |
| `CU-06`, `CU-08` | 1.0 → 1.1 | Puertos publicados del candidato, y su conservación en la traducción |
| `CU-13`, `CU-15` | 1.0 → 1.1 | Las dos variantes de imagen, el archivo de construcción en línea, y el registro del digesto |
| `CU-16`, `CU-17` | 1.0 → 1.1 | Desvinculación de la instancia; conversión de secretos, tipos cerrados y colisión de identificador al importar |
| `CU-37`, `CU-38` | **nuevos**, 1.0 | Higiene de imágenes; vuelta a un despliegue anterior |
| `RN-08`, `RN-15` | 1.0 → 1.1 | Datos obligatorios por variante; alcance a la plantilla del catálogo |
| `RN-38`, `RN-39`, `RN-40` | **nuevas**, 1.0 | Puerto único publicado por host; desvinculación de la plantilla; protección de la imagen conservada y de la ajena |
| `Modelo-Conceptual.md` | 1.0 → 1.1 | Entidad **Imagen** con la prueba de D-12 aplicada condición por condición; cinco atributos nuevos del servicio; ocho entradas de glosario; cuatro brechas |
| `RC-19` | **nueva**, 1.0 | Unicidad del puerto publicado por host, con su procedencia distinta declarada |
| `Experiencia-De-Uso.md`, `README.md` de 03 | 1.0 → 1.1 | Dieciocho superficies; cinco brechas nuevas |
| Cinco wireframes | 1.0 → 1.1 | Catálogo rehecho; lienzo, panel lateral, cajón de cambios y descubrimiento ampliados |
| `Wireframes-Alta-De-Servicio.md`, `Wireframes-Imagenes.md` | **nuevos**, 1.0 | `SUP-17` y `SUP-18` |

**Archivado.** Los diecinueve artefactos vigentes que se editaron quedaron archivados en el `_legacy/2026-07-29/` de su propia carpeta, con bloque de archivado antepuesto, por `Master-Prompt.md` §5.1. **Ningún desvío de archivado en esta ejecución.**

### 6.3 Lo declarado como brecha, que es lo que no se decidió

**Cuatro decisiones cerradas** se aplicaron como dato: `Q-4a` y `Q-4b` —no hay ítems de fábrica, y las dos versiones ya estaban especificadas—, `Q-9` —se conservan las dos modalidades de despliegue— y `Q-23` —la instancia queda desvinculada—. Entraron como **D-14 a D-17** del intake, marcadas `[D]` con su fecha, y ninguna como `[S]`.

**Ocho con propuesta escrita y sin confirmar** entraron como especificaciones de integración `[D-i]`, `DI-17` a `DI-24`, **aplicadas y revisables**, en correspondencia uno a uno con `Q-1`, `Q-2`, `Q-3`, `Q-14`, `Q-22`, `Q-24`, `Q-25` y `Q-26`. **Ninguna se presenta como requisito cerrado del cliente.**

**Diecisiete abiertas** entraron como pendientes de decisión de §19 del intake, **sin ningún valor supuesto**, y se replicaron como brechas en los artefactos que las consumen. Las que más pesan:

| Pendiente | Por qué pesa |
|---|---|
| `Q-15` · digesto por despliegue | **Es la de mayor palanca.** Las siete de imágenes se cierran con ella, y sin ella `CU-37` y `CU-38` **no son implementables** y la entidad Imagen existiría en el modelo sin nadie que la escriba |
| `Q-27` · exploración de registro de imágenes | **Es el primer minuto de uso.** Sin catálogo de fábrica y sin exploración, quien no sabe la dirección de la imagen no tiene camino. Decide si hay una superficie nueva o una línea de ayuda |
| `Q-28` · origen editable después del alta | **Corregir una etiqueta mal escrita no tiene camino** en ninguna superficie |
| `Q-8` y `Q-12` · qué repositorio y qué archivo de construcción son admisibles | Son de **seguridad**: construir ejecuta código en el mismo servidor que administra el motor de contenedores, y ninguna regla lo acota |

**Brechas nuevas emitidas:** `B-20` a `B-24` en `02`, y `B-UX-23` a `B-UX-27` en `03`. **Brecha cerrada:** `B-09`, el tratamiento del material secreto dentro de una plantilla, por la ampliación de RN-15.

### 6.4 Tres correcciones a afirmaciones del propio documento de entrada

La regla de ejecución advertía que un hallazgo de auditoría es un piso y no una medida. Se verificó el alcance real de tres, y en los tres el documento de entrada estaba corto o equivocado:

| Qué afirma el documento de entrada | Qué se verificó |
|---|---|
| Su §6 `H-B` y su §17.1 dicen que el campo de comando de arranque «existe en E-2» y que el hueco está sólo del lado de la especificación funcional | **Falso.** El único `"comando"` de E-2 vivía dentro del objeto `healthcheck`; no había campo de primer nivel. El hueco estaba en **las dos puntas**. Su §22.1, en cambio, acierta al clasificarlo como hueco puro, y es la clasificación que se aplicó |
| Su §23 dice «veintiocho decisiones» | Sus tres tablas suman **veintinueve filas**, porque `Q-4` está partida en `Q-4a` y `Q-4b`. Veintinueve filas sobre veintiocho identificadores |
| Su §23.3 se lee como dieciséis abiertas en el prompt de ejecución | La tabla enumera **diecisiete**. Se tomaron las diecisiete, porque contar filas es verificable y la cifra en prosa no lo es |

**Y una discrepancia interna del documento de entrada que se declaró en lugar de resolverse en silencio:** su §18.7 clasifica `Q-24`, `Q-25` y `Q-26` como **abiertas** y su §23.2 como **con propuesta escrita**. Se aplicó §23, que es la sección consolidada y la última, y las tres entraron como `[D-i]`. Está registrado en §19 del intake, con la operación exacta para revertirlo si el agente humano prefiere la otra clasificación.

### 6.5 Un hallazgo de más, y un conflicto con una decisión anterior

**`SUP-17` no existía en ninguna parte.** §21.1 y §22.5 del documento de entrada nombran la superficie `Alta-De-Servicio · SUP-17`. Verificado: `03-UX-UI-DX` declaraba **dieciséis** superficies, `SUP-01` a `SUP-16`, y **ninguna era el alta de servicio**; el alta vivía repartida entre `SUP-05` y `SUP-06`. La maqueta tiene `Alta-De-Servicio.html` y su propio README lo documenta como **§5.1, estados de `SUP-06`**. El número coincide con el siguiente libre, no con una asignación previa.

**El conflicto con `PA-15`, declarado.** El punto abierto `PA-15` de este informe registra, del mismo 2026-07-29, la decisión de resolver el alta como **estado nuevo de `SUP-06`, descartando explícitamente crear superficie propia**. El documento de entrada, posterior, la trata como superficie y manda rehacerla. **Se aplicó la parte normativa del documento de entrada** —que es la fuente de esta ejecución— y se le dio superficie propia `SUP-17`, **declarando el conflicto** en el propio wireframe §1, con el argumento a favor y con la operación mecánica que lo revierte si el agente humano sostiene `PA-15`: el contenido no cambia, sólo cambia dónde vive. **Esta ejecución no tiene mandato para revertir una decisión del agente humano del proyecto, y por eso la deja planteada en lugar de darla por cambiada.**

### 6.6 Lo que quedó fuera, con su motivo

| Qué | Motivo |
|---|---|
| **La maqueta** | **Deliberadamente fuera**, por §21.4 del documento de entrada y por la regla de ejecución. La maqueta se rehace **desde la especificación corregida**, que es de donde `03-UX-UI-DX` la deriva; saltear el paso del medio produce una maqueta que no traza a ningún artefacto, que es el defecto que la Fase B2 existe para evitar. **Es lo que sigue.** |
| `SDD/Estado/Fix-Ejecución-Glosario-Framework.md` | Es una orden de trabajo sobre el `Framework SDD` y se ejecuta en una sesión propia. Acá el framework no se tocó, y `/IA/IA.SDD` se leyó en sólo lectura |
| Las categorías `05` a `11` | No están generadas todavía. Lo que esta corrección les deja es el intake 2.4 y las categorías `02` y `03` corregidas, más las brechas con destinatario |
| `01-Necesidades-Negocio` | **Alcanzada y no tocada, con la brecha declarada.** `CU-37` y `CU-38` no están previstos en el §7 de ninguna necesidad de negocio. Corregirlo desde `02` invertiría la dirección de la cadena; queda como brecha `B-20` con `01` y el agente humano como destinatarios |
| La construcción de `SUP-18` en la maqueta | **No debe construirse todavía**: depende de `Q-15` y `Q-17`, abiertas. Está declarado en su wireframe §5.1 |
| Cerrar cualquiera de las veinticinco decisiones no cerradas | **Prohibido por la orden de trabajo.** Ninguna se presumió resuelta |

### 6.7 Qué necesita el agente humano del proyecto para desbloquear la reconstrucción de la maqueta

**Cuatro decisiones condicionan la forma de una pantalla** y hay que resolverlas antes de rehacer la maqueta. Tres de las cuatro **ya están aplicadas** como `[D-i]` y sólo esperan confirmación; una está abierta:

| Decisión | Qué hace falta | Qué pantalla condiciona |
|---|---|---|
| `DI-17` · siete vías sobre cinco variantes | **Confirmar** | El alta entera, `SUP-17` |
| `DI-18` · separar imagen pública de privada | **Confirmar** | Si no se separan, no hay paso de credencial |
| `DI-19` · el servicio sin origen como nodo borrador | **Confirmar** | Si no existe, el lienzo no admite un servicio sin origen |
| `Q-27` · exploración de registro de imágenes | **Decidir.** Está abierta | Si hay exploración es una pantalla nueva; si no, una línea de ayuda |

Y **dos más** para que la maqueta pueda demostrar el ciclo de vida de las imágenes: `Q-15`, el digesto por despliegue, y `Q-17`, el modo de disparo de la limpieza. Sin las dos, `SUP-18` no se construye.

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
| 2.9 | 2026-07-29 | **Fix de las definiciones de servicio ejecutado sobre la especificación del producto.** Se incorporó la parte normativa —§16 a §23— de `SDD/Estado/Redefinicion-Servicio.md` v2.0; su parte de derivación no se usó. El intake pasa a **2.4** con el anexo **E-23** nuevo y tres reglas de negocio nuevas; `02` pasa a **38 CU, 40 RN y 19 RC**; `03` pasa a **dieciocho superficies**. Diecinueve artefactos archivados en su `_legacy/2026-07-29/`, sin desvíos. Sección **§6** nueva con el contraste fila por fila contra §22, lo aplicado por artefacto, lo declarado como brecha, **tres correcciones a afirmaciones del propio documento de entrada** —entre ellas que el campo de comando de arranque **no** existía en E-2, contra lo que su `H-B` y su §17.1 afirman—, el **hallazgo de que `SUP-17` no existía en ninguna parte**, el **conflicto declarado con `PA-15`**, lo que quedó fuera con su motivo, y las **seis decisiones que el agente humano necesita tomar** para desbloquear la reconstrucción de la maqueta. **La maqueta no se rehizo**, por §21.4 del documento de entrada: se rehace desde la especificación corregida. `PA-15` queda **reabierto**; `PA-4`, `PA-5`, `PA-9` y `PA-14` amplían su alcance. **Cuatro decisiones cerradas** entraron como dato `[D]`, **ocho** como `[D-i]` aplicadas y revisables, y **diecisiete** como pendientes sin valor supuesto: ninguna de las veinticinco no cerradas se presumió resuelta. | Orquestador SDD |
| 2.8 | 2026-07-29 | **Maqueta construida, servida y en ciclo de corrección.** AG-03M fue interrumpido por un límite de gasto de la cuenta cuando le quedaban dos correcciones finales; la construcción estaba completa —16 superficies, `index.html`, tres assets, 352 KB— y el orquestador aplicó las dos correcciones pendientes verificándolas primero contra el catálogo, en lugar de aplicarlas a ciegas: el `box-shadow` ad hoc se retiró porque `Design-Rules-Web-Generico.md` §2 fija que la elevación se comunica con borde y superficie, y el `Incorporar` por fila perdió su énfasis primario porque §4.3 manda icon-buttons en las filas y reserva la primaria al encabezado. Se registra un falso positivo propio que vale como advertencia: el chequeo de integridad del JavaScript dio «desbalanceado» y era artefacto del analizador —dos expresiones regulares que contienen comillas, `/"/g` y `/'/g`—; confiar en ese resultado habría llevado a «arreglar» un archivo sano. La maqueta se sirve en el puerto 8137 porque el 8080 está ocupado por otro servicio del host, que no se tocó. **Primera observación del agente humano en el paso 5, y es el hallazgo más importante de la corrida hasta acá**: el alta de servicio desde cero no tiene superficie. Se registra como PA-15. Lo encontró mirando la maqueta en la primera pasada, después de que **el audit independiente de la Fase B y el auto-chequeo de AG-03 no lo levantaran**. Es la justificación empírica más fuerte de la Fase B2 que produjo esta corrida: el audit verifica que lo escrito cumpla las reglas, y la maqueta verifica que lo escrito alcance, que son dos propiedades distintas. | Orquestador SDD |
| 2.7 | 2026-07-29 | **Seis P1 de la Fase B corregidos, corte aprobado y Fase B2 arrancada.** AG-02 cerró sus cuatro y AG-03 sus dos; el orquestador reverificó ambos sobre el árbol emitido. Dos resultados de la corrección que valen como registro. Primero, **AG-02 corrigió la contabilidad del propio hallazgo H-04**: el universo de actores no humanos son 19 y no 16, seis trazan y no tres, y tres de los trece acuñados son actor primario y no de sistema, de modo que la corrección hubo que redactarla sobre «actores no humanos» —acotarla a los de sistema habría dejado tres fuera y la afirmación del índice seguiría siendo falsa—. Es la **tercera vez en la corrida que un subagente corrige la extensión de un hallazgo del audit**, después de los cuatro estrechamientos de la columna `Responsable` en la Fase A y del dato de anchos de ventana que ya estaba aplicado en dieciséis archivos. El patrón es consistente y se registra como criterio operativo: **el audit localiza bien los defectos y subestima su extensión**, de modo que un hallazgo es un piso y no una medida. Segundo, **H-06 se resolvió de raíz**: la correspondencia superficie↔caso de uso se declaraba en cuatro vistas independientes que se contradecían en cinco superficies, y el defecto no era de transcripción sino de fuente única faltante; ahora `Experiencia-De-Uso` §9.2 es canónica por regla, §9.3 es su inversión mecánica declarada, el README dejó de repetir la columna y los wireframes reproducen su fila declarando el origen. Verificador programático: 0 discrepancias sobre 16 superficies y 36 casos de uso. **Fase B2**: oferta aceptada, plan de 16 superficies aprobado, modelo base —`Modelos-UX-UI/` no tiene modelos registrados—, y AG-03M despachado con la instrucción de resolver la brecha `B-UX-01` dibujando una distinción de aristas que cumpla sus tres restricciones y marcándola **como propuesta a validar y no como especificación**, que es la función propia de una maqueta. | Orquestador SDD |
| 2.6 | 2026-07-29 | **Audit de la Fase B: APROBADO CON OBSERVACIONES, cero P0**, con 6 P1, 5 P2 y 7 P3 sobre la solución y 7 hallazgos sobre el repositorio fuente y el intake. Informe en `SDD/Docs/Audit/B-02-03-r1.md`, con su muestreo declarado. **Las dos instrucciones que el orquestador agregó al despacho del auditor dieron resultado, y conviene registrarlo porque corrige el modo de falla de la Fase A.** La primera, buscar datos completados sin fuente y no declarados: encontró **ocho**, cuatro de ellos P1 —una cita de caso de prueba reescrita, un conteo de reglas sin cobertura que era tres y decía dos, una cardinalidad del modelo conceptual que ninguna fuente declara, y trece de dieciséis nombres de actor sin traza bajo la afirmación explícita del índice de que todo dato traza—. En la Fase A ese mismo defecto se produjo tres veces y **el audit no lo encontró**. La segunda, evaluar las brechas en las dos direcciones: de las 39 declaradas, **27 confirmadas, 8 parciales, 3 con un componente falso y 1 íntegramente falsa**, ésta última porque el dato ya estaba en el catálogo de diseño que el subagente tenía como insumo. Una brecha falsa manda a alguien a decidir algo ya decidido, y es un defecto propio. Se registra también lo que el auditor **no** encontró, porque acota el problema: la caza dirigida sobre persona objetivo, umbrales, valores de criterios de aceptación y contrato visual dio negativo, y no hay ninguna columna de tabla rellenada completa sin fuente. PA-12 se cierra a favor de aplicar la regla y PA-11 queda confirmada; se abre PA-14 por el incumplimiento de E-22 respecto de E-16. | Orquestador SDD |
| 2.5 | 2026-07-29 | **`03-UX-UI-DX` generada y audit de la Fase B despachado.** 23 archivos y 5046 líneas en variante UX/UI: **16 superficies especificadas** contra un piso de cuatro, con los seis documentos del catálogo de diseño aplicados y citados por archivo y sección. Las cuatro extensiones por capacidad aplicaron todas, que es lo que `Master-Prompt.md` §6 predice para el arquetipo de panel de control monolítico. Los artefactos `dx-` no se generaron, correctamente: `tiene_portal_developers` es false. La categoría declaró **20 brechas, 4 contradicciones y 3 supuestos de derivación**, y trató las tres pendencias de E-18 por separado en lugar de en bloque: dos resueltas por derivación declarada e impugnable, una abierta por no existir regla que la cubra, con las tres restricciones que cualquier resolución debe respetar. Se registran PA-11 a PA-13. El despacho del auditor incorpora dos instrucciones que los anteriores no tenían: **exigirle muestreo declarado** por el volumen —117 archivos—, y pedirle que evalúe las 39 brechas en las dos direcciones, buscando específicamente **datos completados sin fuente y no declarados**, que es el modo de falla verificado de esta corrida y que en la Fase A el audit no encontró. | Orquestador SDD |
| 2.4 | 2026-07-29 | **`02-Especificacion-Funcional` generada.** 94 archivos y 8402 líneas: índice maestro con la matriz NB→CU→RN→US, los **36 casos de uso** que las ocho NB declaraban previstos con su numeración conservada, las **37 reglas de negocio** transcriptas del anexo E-16, el modelo conceptual derivado de E-9 y **18 reglas conceptuales**, obligatorias por superarse el umbral de diez entidades —11 tablas persistidas más los 3 objetos declarados y no diseñados—. La cobertura CU↔NB y CU↔RN se verificó bidireccionalmente y da cero inconsistencias; el orquestador reverificó los conteos y las invariantes sobre el árbol emitido. La disciplina de derivación que se inyectó en el despacho dio resultado: **19 brechas declaradas y ninguna resuelta por cuenta propia**, registradas como PA-9. Se registra además PA-10, una observación sobre el anexo E-16 del intake, cuya RN-21 admite dos lecturas: la categoría declaró explícitamente la que aplicó en lugar de elegirla en silencio, que es el comportamiento que C-2 pide. `03-UX-UI-DX` queda despachada con el catálogo de diseño completo: base, especialización Blazor y MudBlazor, y las cuatro extensiones por capacidad, que esta solución carga a las cuatro por ser el arquetipo de panel de control monolítico que `Master-Prompt.md` §6 describe. | Orquestador SDD |
| 2.3 | 2026-07-29 | **Corte de la Fase A aprobado y Fase B arrancada.** El agente humano del proyecto aprobó el corte y el alcance completo de la Fase B —02 y 03 en la misma fase—, descartando la alternativa de acotarla a 02 con un audit intermedio que el orquestador había ofrecido por volumen. Se registra como D-K. El despacho de AG-02 incorpora una sección de **disciplina de derivación** que no estaba en los despachos de la Fase A: la Fase A produjo tres defectos de la misma clase —columnas de tabla rellenadas con valores plausibles que ninguna fuente declaraba— y dos de los tres los encontró la adecuación a 4.1 y no el audit. El criterio nuevo de `Rules-Contexto` §6 no rige sobre `Rules-Especificacion-Funcional`, que sigue en 2.0, pero se le inyecta su espíritu al subagente por ser el modo de falla verificado de esta corrida. | Orquestador SDD |
| 2.2 | 2026-07-29 | **Cierre de la adecuación a 4.1 y del ciclo de la Fase A.** AG-01 emitió el inventario de traza de los 44 criterios de éxito, que era el eje que faltaba del criterio nuevo de `Rules-Contexto` §6 y que AG-00 había sugerido revisar tras encontrar el mismo defecto dos veces en su categoría. Resultado: **132 componentes clasificados, 120 derivados, 12 `[FA]`, cero originados**. Es un resultado negativo verificado componente por componente contra su fuente, no ausencia de hallazgos por no haber mirado, y es lo que permite que el corte se apoye en algo. Tres denominadores que estuvieron cerca de ser hallazgo se verificaron contra la fuente y resultaron declarados `[E]`. Se registra la única elección que la categoría sí hizo dentro de un marco declarado —la forma del plazo, puntual o continuo, en 38 de los 44— como PA-8, con `08-Calidad-Y-Pruebas` como destinataria. AG-01 revirtió además la salvedad que había introducido sobre `EP-18` a `EP-22` cuando el orquestador le informó una revisión en curso que no existía. §1 declara el corte de fase como el punto de detención abierto. | Orquestador SDD |
| 2.1 | 2026-07-29 | **Corrección de A-6 y cierre de PA-2, los dos por el mismo error del orquestador.** La versión 2.0 afirmaba que cinco exclusiones del `Alcance-Proyecto.md` habían sido originadas por AG-00 y que por eso incumplían el criterio nuevo de `Rules-Contexto` 2.1. Es falso y quedó verificado contra el intake: §4 declara `F-18` a `F-22` como `Won't Have v1`, que es la etiqueta MoSCoW con la que el Product Owner declara la exclusión, y §9 trae las exclusiones correspondientes marcadas `[E]`. AG-00 las había formalizado, que es su trabajo. El error fue del orquestador, que leyó como originadas cinco filas derivadas, y se propagó a este informe y al manifiesto 1.8, que la versión 1.9 corrige. A-6 se conserva porque su conclusión de fondo sigue en pie con otro fundamento: lo que sí resultó originado es la **evaluación de los riesgos `RP-01` a `RP-03`**, que ninguna fuente declara, más un horizonte y tres glosas. Se suma a A-6 el matiz que la adecuación dejó ver: 2.1 no invalidó contenido, expuso que faltaba declarar la derivación, de modo que el costo de adoptarla sobre documentación emitida es de trazabilidad y no de contenido. PA-2 pasa a cerrado y se abre PA-7 con la evaluación de los tres riesgos de plataforma. §5 incorpora correr el equivalente de §6.1 sobre la categoría 01. | Orquestador SDD |
| 2.0 | 2026-07-29 | **Reconstrucción del documento**, a pedido del agente humano del proyecto, tras el borrado de la versión 1.9. Se reconstruyó del historial de la corrida y no del archivo, que no era recuperable de git porque `SDD/` no tiene seguimiento en el repositorio destino. Sube a 2.0 porque el contenido se reordenó: §2 pasa a ser el registro consolidado de las trece decisiones del agente humano, cada una con dónde quedó aplicada, y §2.1 suma el detalle de por qué D-H costó tres pasadas; §3 condensa lo ejecutado y registra las dos cosas que no salieron como el orquestador las despachó —el sub-reporte de H-01 por el audit y el despacho equivocado de H-05 por el propio orquestador—; §4 consolida los seis puntos abiertos con quién decide cada uno. Los dos anexos se conservan íntegros, con dos incorporaciones: F-01 a F-03, los tres hallazgos de framework del auditor independiente, y **A-6**, que registra que la afirmación del changelog de 4.1 de que ninguna documentación emitida deja de cumplir no se sostuvo para esta solución, con el análisis de por qué un cambio que retira autoridad es retroactivo por naturaleza. | Orquestador SDD |
