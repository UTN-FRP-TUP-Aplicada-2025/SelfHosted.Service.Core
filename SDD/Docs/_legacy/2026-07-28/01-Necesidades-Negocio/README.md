# 01-Necesidades-Negocio — Necesidades de negocio de la solución

| Campo | Valor |
|---|---|
| Proyecto | SelfHosted.Service.Core (solución; proyecto de código principal `SelfHosted-Web`) |
| Documento | README.md |
| Versión | 1.5 |
| Estado | Propuesto |
| Fecha | 2026-07-28 |
| Autor | Analista de Negocio Senior (AG-01) |
| Trazabilidad upstream | SOLUTION-INTAKE-SelfHosted-Service-Core-v1.2; `Vision-Producto-v1.1.md`, `Alcance-Proyecto-v1.1.md`, `Roadmap-Producto-v1.1.md` de 00-Contexto |
| Trazabilidad downstream | 02-Especificacion-Funcional, 06-Backlog-Tecnico, 07-Plan-Sprint, 08-Calidad-Y-Pruebas |

## Tabla de contenido

- [1. Qué contiene esta carpeta](#1-qué-contiene-esta-carpeta)
- [2. Catálogo de necesidades](#2-catálogo-de-necesidades)
- [3. Mapa de dependencias](#3-mapa-de-dependencias)
- [4. Orden de lectura sugerido](#4-orden-de-lectura-sugerido)
- [5. RACI por necesidad](#5-raci-por-necesidad)
- [6. Qué queda pendiente de confirmación](#6-qué-queda-pendiente-de-confirmación)
- [Control de cambios](#control-de-cambios)

---

## 1. Qué contiene esta carpeta

Esta carpeta contiene las ocho necesidades de negocio de la solución, generadas una sola vez a nivel solución a partir del intake único y de los documentos de contexto de la categoría 00. No se repiten por proyecto de código.

NB-01 está en la versión 1.5, porque la quinta pasada le incorporó la higiene del registro. NB-05 y NB-06 están en la 1.4 y las otras cinco en la 1.2. La cuarta pasada, de terminología, alcanzó a las ocho y no cambió ninguna regla ni ningún criterio: sólo cómo se nombran el proyecto SelfHosted y el proyecto de código.

El punto de entrada es el índice maestro [Necesidades-Negocio-v1.5.md](Necesidades-Negocio-v1.5.md), que contiene la tabla resumen, el mapa de dependencias con su verificación de aciclicidad, la trazabilidad agregada de capacidades a necesidades y de necesidades a casos de uso, y la lista consolidada de criterios de éxito derivados. Cada necesidad tiene su archivo propio en la subcarpeta `Necesidades-De-Negocio/`.

Este README existe porque el catálogo supera las cinco necesidades y agrega lo que el índice no cubre: el orden de lectura y el RACI por necesidad.

## 2. Catálogo de necesidades

| NB | Título | Impacto principal | Prioridad MoSCoW | Estado | Enlace |
|---|---|---|---|---|---|
| NB-01 | Visibilidad unificada de la arquitectura de un conjunto de servicios | La arquitectura pasa a tener un registro único y legible, y habilita todo lo que se deduce de la relación entre servicios | Must Have | Propuesto | [NB-01](Necesidades-De-Negocio/NB-01-Visibilidad-Unificada-De-La-Arquitectura-v1.5.md) |
| NB-02 | Adoptabilidad del parque existente sin reinstanciar lo que ya está en producción | La solución se vuelve aplicable sobre un servidor que ya está en producción | Must Have | Propuesto | [NB-02](Necesidades-De-Negocio/NB-02-Adopcion-Del-Parque-Existente-v1.2.md) |
| NB-03 | Reproducibilidad de la arquitectura ante la pérdida del servidor | El costo de una reinstalación pasa de reconstruir a reimportar | Should Have | Propuesto | [NB-03](Necesidades-De-Negocio/NB-03-Reproducibilidad-De-La-Arquitectura-v1.2.md) |
| NB-04 | El alta de un servicio deja de ser un ejercicio de copiar y adaptar | El registro tiene quién lo alimente, y el alta deja de arrastrar decisiones ajenas | Must Have | Propuesto | [NB-04](Necesidades-De-Negocio/NB-04-Alta-De-Servicios-Sin-Copiar-Y-Adaptar-v1.2.md) |
| NB-05 | Arranque previsible: orden deducido y conflictos de dirección detectados antes de fallar | El conflicto de direcciones pasa de accidente del motor a regla verificada con resoluciones ofrecidas | Must Have | Propuesto | [NB-05](Necesidades-De-Negocio/NB-05-Arranque-Sin-Conflictos-De-Direccion-v1.4.md) |
| NB-06 | Cambios de configuración revisados antes de aplicarse y aplicados en un solo lote | Las ventanas de indisponibilidad dejan de ser proporcionales a la cantidad de cambios | Must Have | Propuesto | [NB-06](Necesidades-De-Negocio/NB-06-Cambios-Revisados-Y-Aplicados-En-Lote-v1.4.md) |
| NB-07 | Atribución del consumo del servidor a un servicio concreto | La presión sobre un servidor al límite se atribuye a un responsable concreto | Should Have | Propuesto | [NB-07](Necesidades-De-Negocio/NB-07-Atribucion-Del-Consumo-De-Recursos-v1.2.md) |
| NB-08 | Control de acceso al panel que gobierna el host y credenciales de máquina acotadas | Ninguna capacidad se expone sin credencial, y los automatismos dejan de necesitar la del administrador | Must Have | Propuesto | [NB-08](Necesidades-De-Negocio/NB-08-Control-De-Acceso-Y-Credenciales-De-Maquina-v1.2.md) |

## 3. Mapa de dependencias

| NB | Depende de | Es prerequisito de |
|---|---|---|
| NB-08 | Sin dependencias | NB-01, y por transitividad las seis restantes |
| NB-01 | NB-08 | NB-02, NB-03, NB-04, NB-05 y NB-07 de forma directa; NB-06 por transitividad |
| NB-04 | NB-01 | NB-03, NB-05, NB-06, NB-07 |
| NB-05 | NB-01, NB-04 | NB-02, NB-06 |
| NB-02 | NB-01, NB-05 | — |
| NB-06 | NB-04, NB-05 | — |
| NB-03 | NB-01, NB-04 | — |
| NB-07 | NB-01, NB-04 | — |

Ninguna necesidad depende de más de dos otras y el grafo es acíclico. La verificación completa, con su orden topológico, está en el índice maestro §3.2.

## 4. Orden de lectura sugerido

Las dependencias son fuertes: cuatro de las ocho necesidades presuponen el registro de arquitectura y el despliegue. El orden recomendado es el topológico, que coincide con el orden en que las capacidades se construyen según el roadmap.

| Orden | NB | Por qué en esta posición |
|---|---|---|
| 1 | NB-08 | Es la única sin dependencias y la condición de que cualquier otra capacidad pueda exponerse |
| 2 | NB-01 | Establece el proyecto SelfHosted, el servicio y la dependencia declarada, que es el vocabulario que usan las seis siguientes |
| 3 | NB-04 | Lleva la configuración declarada a un contenedor corriendo; sin ella el registro no tiene contenido operativo |
| 4 | NB-05 | Introduce el arranque y las reservas de dirección, sobre las que se apoyan NB-02 y NB-06 |
| 5 | NB-02 | Incorpora el parque existente, y su dirección observada depende del modelo de reservas de NB-05 |
| 6 | NB-06 | Introduce el circuito de revisión y aplicación en lote sobre lo desplegado |
| 7 | NB-03 | Exporta y reimporta lo que las anteriores permiten declarar |
| 8 | NB-07 | Observa el consumo de lo que las anteriores dejan corriendo |

Un lector que sólo necesite entender por qué existe el producto puede leer NB-01, NB-02 y NB-05, que concentran el dolor central declarado y los dos diferenciadores más citados.

## 5. RACI por necesidad

Los roles son los declarados en SOLUTION-INTAKE §2 y en `Vision-Producto` §2.1. La propiedad del catálogo es del Analista de Negocio Senior; la aprobación es siempre del propietario del servidor en su rol de agente humano del proyecto.

| NB | Responsable (propietario del contenido) | Implementador | Revisor y aprobador | Beneficiario que valida |
|---|---|---|---|---|
| NB-01 | Analista de Negocio Senior | Equipo de desarrollo de dos personas y agente de IA de codificación | Agente humano del proyecto | Usuario final: administrador de la solución |
| NB-02 | Analista de Negocio Senior | Equipo de desarrollo de dos personas y agente de IA de codificación | Agente humano del proyecto | Propietario del servidor y administrador único |
| NB-03 | Analista de Negocio Senior | Equipo de desarrollo de dos personas y agente de IA de codificación | Agente humano del proyecto | Propietario del servidor y administrador único |
| NB-04 | Analista de Negocio Senior | Equipo de desarrollo de dos personas y agente de IA de codificación | Agente humano del proyecto | Usuario final: administrador de la solución |
| NB-05 | Analista de Negocio Senior | Equipo de desarrollo de dos personas y agente de IA de codificación | Agente humano del proyecto | Usuario final: administrador de la solución |
| NB-06 | Analista de Negocio Senior | Equipo de desarrollo de dos personas y agente de IA de codificación | Agente humano del proyecto | Usuario final: administrador de la solución |
| NB-07 | Analista de Negocio Senior | Equipo de desarrollo de dos personas y agente de IA de codificación | Agente humano del proyecto | Propietario del servidor y administrador único |
| NB-08 | Analista de Negocio Senior | Equipo de desarrollo de dos personas y agente de IA de codificación | Agente humano del proyecto | Usuario final: administrador de la solución y automatismo de integración continua |

Consultados en toda la categoría: el Product Manager Senior, que verifica la alineación con la visión y el alcance, y el Analista Funcional, que desarrolla en 02-Especificacion-Funcional los casos de uso que cada necesidad declara como previstos.

## 6. Qué queda pendiente de confirmación

El SOLUTION-INTAKE lleva tres registros disjuntos de lo que no está cerrado, con alcances distintos, y su §19 pide expresamente no confundirlos: los supuestos `[S]`, que son valores que faltaban en las fuentes; las pendientes de decisión, que son decisiones de producto que nadie tomó; y las especificaciones de integración `[D-i]`, que el orquestador sí tomó al integrar y que están aplicadas pero son revisables. Esta sección respeta esa separación y agrega los pendientes que no vienen del intake.

Del registro de pendientes de decisión, el intake declara cinco, que bajaron de siete el 2026-07-28. Del registro `[D-i]`, ninguna de sus entradas condiciona una necesidad de este catálogo: son formas concretas de sintaxis, códigos de respuesta y persistencia, por debajo del nivel de negocio en el que se redactan las necesidades.

| # | Pendiente | Registro de origen | Dueño de la resolución | Qué condiciona en este catálogo |
|---|---|---|---|---|
| 1 | Asignación de F-23, F-24 y F-25 a un alcance y a un corte vertical concreto | Pendientes de decisión, intake §4 y §15 | Agente humano del proyecto, sobre la propuesta de `07-Plan-Sprint` | El plazo del sexto criterio de éxito de NB-04 y el del octavo de NB-01, los dos anclados a una etapa que todavía no se puede nombrar |
| 2 | Si la interfaz señala un literal que duplica un valor que el sistema ya provee, y con qué forma | Pendientes de decisión, intake E-4 | Agente humano del proyecto, sobre la propuesta de `03-UX-UI-DX` | Ninguna necesidad en su enunciado. Roza el sexto criterio de NB-04, que mide que un valor compartido se declare una sola vez |
| 3 | Distinción visual, en el lienzo, entre las dependencias que declaran espera y las que no | Pendientes de decisión, intake E-18 | Agente humano del proyecto, sobre la propuesta de `03-UX-UI-DX` | El sexto criterio de éxito de NB-01, que exige que la clase de cada dependencia se distinga mirando el lienzo. La necesidad fija qué debe poder leerse; la forma visual que lo consigue es de la categoría 03 |
| 4 | Maquetado del paso de clasificación de variables de la incorporación y de la pantalla de valores compartidos del proyecto SelfHosted | Pendientes de decisión, intake E-18 | Agente humano del proyecto, sobre la propuesta de `03-UX-UI-DX` | Ninguna necesidad en su enunciado. Las dos pantallas son obligatorias por el quinto criterio de NB-02 y por el sexto de NB-04, de modo que su ausencia bloquearía la demostración de ambos |
| 5 | Matriz de navegadores de escritorio soportados, con familias y versiones mínimas | Pendientes de decisión, intake §17.1 P.9 | Agente humano del proyecto, en su rol de usuario final | Ninguna necesidad de este catálogo. Se lista para que la enumeración de lo abierto en el intake sea completa; condiciona `03-UX-UI-DX`, `08-Calidad-Y-Pruebas` y `09-Devops` |
| 6 | Los dos criterios de éxito derivados, marcados `[D]` | Este catálogo | Agente humano del proyecto | Los criterios de aceptación correspondientes en `08-Calidad-Y-Pruebas`. El detalle del recorrido de cada uno está en el índice maestro §5 |
| 7 | El reparto de las capacidades entre las fases 2 y 3 | `Roadmap-Producto` §2.3 | Agente humano del proyecto, sobre la propuesta del roadmap | Los plazos de los criterios de éxito de NB-01, NB-03, NB-04 y NB-07, expresados por cierre de fase |

Cinco pendientes se cerraron y por eso ya no figuran. Tres el 2026-07-28 en la segunda ronda de decisiones: los casos límite CL-04 y CL-15 y el supuesto IC-05. Y las dos de instanciación, en la quinta pasada, de formas distintas que conviene no confundir: la del valor compartido cuya clave ya existía no se resolvió, desapareció, porque el principio de identidad de objeto quitó a la clave el papel de identificar y dos valores compartidos pueden ahora llamarse igual sin ambigüedad; la del nombre de servicio que ya existía sí se resolvió, con una regla que sufija automáticamente y avisa, en lugar de preguntar antes y obligar a decidir a ciegas.


---

## Control de cambios

| Versión | Fecha | Cambios | Autor |
|---|---|---|---|
| 1.0 | 2026-07-27 | Índice inicial de la categoría, con las ocho necesidades, el mapa de dependencias, el orden de lectura topológico, el RACI por necesidad y los cuatro pendientes de confirmación | Analista de Negocio Senior (AG-01) |
| 1.0 | 2026-07-27 | Correcciones del audit A-01-Necesidades-Negocio-v1.0, dentro del mismo ciclo de emisión y sin incremento de versión. P1-01: anclas de la tabla de contenido reemitidas conservando tildes. P1-03: el conteo de criterios derivados pasa de cinco a seis. P2-03: la cabecera pasa a bloque de tabla e incorpora el campo `Versión`. P3-02: la relación de NB-01 con NB-06 se distingue como transitiva. P3-03: el estado se alinea en `Propuesto` con el índice y las ocho necesidades | Analista de Negocio Senior (AG-01) |
| 1.0 | 2026-07-27 | Actualización de la referencia al intake tras su consolidación por el flujo de no-modificación: la cita de trazabilidad upstream pasa de la versión 1.0 del intake a la 1.1, que es la vigente en `SDD/Intake/`. Los pendientes de §6 se revisaron contra el intake consolidado y siguen vigentes sin cambios: los casos límite CL-04 y CL-15 no quedaron alcanzados por la resolución de supuestos. Sin incremento de versión de este documento | Analista de Negocio Senior (AG-01) |
| 1.0 | 2026-07-27 | Cierre del hallazgo N-03 del audit A-01-Necesidades-Negocio-v2.0: la §6 pasa a enumerar los cuatro pendientes que el intake v1.1 declara abiertos, incorporando el supuesto IC-05 sobre la invariante I10, que faltaba, y la matriz de navegadores, que se lista para que la enumeración sea completa aunque no condicione ninguna necesidad. La tabla agrega las columnas de origen y de dueño de la resolución, y separa los cuatro pendientes del intake de los dos que originan este catálogo y el roadmap | Analista de Negocio Senior (AG-01) |
| 1.1 | 2026-07-28 | Propagación del SOLUTION-INTAKE v1.2. La §1 registra qué necesidades pasaron a la versión 1.1 y cuáles permanecen en la 1.0, y las tablas de §2 y §3 apuntan a los nombres de archivo nuevos. La §6 se recalcula contra los tres registros disjuntos de lo pendiente que declara §19 del intake: pasa de cuatro a ocho filas, con la columna de registro de origen, incorporando las dos decisiones de producto abiertas sobre la instanciación de una plantilla y las dos de maquetado, y retirando los tres pendientes que las decisiones D-1, D-2 y D-3 cerraron. Se declara además que ninguna de las especificaciones de integración `[D-i]` condiciona una necesidad de este catálogo | Analista de Negocio Senior (AG-01) |
| 1.2 | 2026-07-28 | Propagación de la segunda pasada sobre la decisión D-6. La §1 registra qué necesidades pasaron a la versión 1.2 y cuáles permanecen en la 1.1, y las tablas de §2 y §3 apuntan a los nombres de archivo nuevos. La quinta fila de §6 se reformula: la pendiente de diseño visual deja de hablar de dos orígenes de dependencia, que ya no existen, y pasa a hablar de la distinción entre las dependencias que gobiernan el orden de arranque y las que no, que sí nació y que tiene consecuencia funcional. Se adopta la convención de citar los documentos de `00-Contexto` sin sufijo de versión en el cuerpo | Analista de Negocio Senior (AG-01) |
| 1.3 | 2026-07-28 | Propagación de la tercera pasada sobre la decisión D-6. La §1 actualiza el reparto de versiones y la quinta fila de §6 sigue el cambio de objeto de la distinción visual pendiente: pasa de separar las dependencias por el dato que toman a separarlas por si obligan o no a esperar | Analista de Negocio Senior (AG-01) |
| 1.4 | 2026-07-28 | Propagación de la cuarta pasada sobre el intake, que es de terminología: el agente humano del proyecto resolvió el doble sentido de la palabra «proyecto» separando el término de producto del de la composición. Ninguna regla, flujo ni decisión cambia. Se aplica la forma completa «proyecto SelfHosted» en la primera mención de cada sección, en las definiciones y donde el otro sentido está cerca, y se conserva la forma corta donde el contexto ya lo fija. Del lado del sentido de composición la aplicación es exhaustiva: la columna de la tabla de trazabilidad a casos de uso pasa a llamarse `Proyecto de código` y el valor del campo `Proyecto` de la cabecera deja de contener la construcción prohibida que fusionaba los dos términos. | Analista de Negocio Senior (AG-01) |
| 1.5 | 2026-07-28 | Propagación de la quinta y última pasada sobre el intake. La §1 actualiza el reparto de versiones. La §6 se recalcula contra el registro de pendientes del intake, que bajó de siete a cinco: se retiran las dos de instanciación declarando que cerraron de formas distintas —una desapareció por el principio de identidad de objeto y la otra se resolvió con una regla de sufijo automático más aviso—, se incorpora la del literal que duplica un valor provisto, que faltaba, y la de asignación de alcance pasa a cubrir también F-25 | Analista de Negocio Senior (AG-01) |
