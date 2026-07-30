# NB-06 — Cambios de configuración revisados antes de aplicarse y aplicados en un solo lote

| Campo | Valor |
|---|---|
| Proyecto | SelfHosted.Service.Core (solución; proyecto de código principal `SelfHosted-Web`) |
| Documento | NB-06-Cambios-Revisados-Y-Aplicados-En-Lote-v1.4.md |
| Versión | 1.4 |
| Estado | Propuesto |
| Fecha | 2026-07-28 |
| Autor | Analista de Negocio Senior (AG-01) |
| Trazabilidad upstream | SOLUTION-INTAKE §3 (diferenciador 3), §4 (F-07, F-09), §5 (historia 5), §7 (CL-04 y CL-06; CL-04 resuelto el 2026-07-28 por la decisión D-1), §9 (exclusión 2), §17.2 P.11, anexos E-5, E-16 (RN-12, RN-13, RN-18, RN-19), y la segunda y la tercera pasada sobre la decisión D-6 del 2026-07-28; `Vision-Producto-v1.1.md` §3 (DV-03); `Alcance-Proyecto-v1.1.md` §4.1, §5.1 |
| Trazabilidad downstream | CU-22 a CU-25 (previstas en 02-Especificacion-Funcional); 06-Backlog-Tecnico; 07-Plan-Sprint; 08-Calidad-Y-Pruebas |

## Tabla de contenido

- [1. Descripción de la necesidad](#1-descripción-de-la-necesidad)
- [2. Ejemplo de uso desde la perspectiva del negocio](#2-ejemplo-de-uso-desde-la-perspectiva-del-negocio)
- [3. Impacto](#3-impacto)
- [4. Problema específico que resuelve](#4-problema-específico-que-resuelve)
- [5. Criterios de éxito](#5-criterios-de-éxito)
- [6. Stakeholders involucrados](#6-stakeholders-involucrados)
- [7. Trazabilidad a CU](#7-trazabilidad-a-cu)
- [8. Dependencias con otras NB](#8-dependencias-con-otras-nb)
- [9. Prioridad MoSCoW](#9-prioridad-moscow)
- [10. Control de cambios](#10-control-de-cambios)

---

## 1. Descripción de la necesidad

Modificar la configuración de un servicio que ya está corriendo tiene una consecuencia inevitable: hay que reemplazar el contenedor, y ese reemplazo implica una ventana de indisponibilidad. Hoy, cada cambio se aplica por separado, de modo que una tarde de ajustes sobre tres servicios de un mismo conjunto produce tres cortes en lugar de uno. El costo no está en el cambio, está en la cantidad de veces que se paga el mismo peaje.

El segundo costo es la ausencia de revisión previa. Cuando se cambia un dato del que dependen otros servicios —el puerto que publican, o el valor que varios comparten—, hay que saber, antes de aplicar, cuáles quedan afectados y cuáles hay que reemplazar. Hoy esa lista se arma de memoria y se descubre incompleta cuando algo deja de responder. Lo mismo vale para los ajustes de recursos: subir el límite de memoria de un servicio o pedirle réplicas es un cambio de configuración con consecuencias sobre el resto del servidor y sobre las direcciones reservadas, y hoy no hay ningún momento en el que esas consecuencias se muestren juntas antes de ejecutarlas.

El negocio necesita edición transaccional: que los cambios de configuración se acumulen como pendientes, que exista un informe que declare qué se va a reemplazar y qué no antes de ejecutar nada, que se pueda descartar un cambio individual sin descartar el resto, y que la aplicación ocurra una sola vez, reemplazando únicamente lo afectado. Y necesita que el mero hecho de ordenar el dibujo de la pantalla no acumule cambios pendientes, porque mover un nodo no cambia nada de lo que corre.

## 2. Ejemplo de uso desde la perspectiva del negocio

El propietario tiene una tarde para ajustar un conjunto de servicios: quiere cambiar el puerto de la base, subirle el límite de memoria al proceso de informes y agregarle una variable a la interfaz web. Hoy son tres operaciones, tres reemplazos de contenedor y tres cortes, y después de la primera se da cuenta de que el cambio de puerto afectaba a dos servicios más que ya no encuentran a la base.

Con la necesidad resuelta hace los tres cambios seguidos y ninguno se ejecuta: los tres quedan en el cajón de cambios pendientes, y los servicios afectados se distinguen en la pantalla porque están en modo pendiente. Antes de aplicar pide el informe de impacto, que le dice exactamente qué cinco servicios se van a reemplazar —los tres que tocó y los dos que dependían del puerto de la base— y cuáles no se tocan. Descarta el cambio de memoria, que decide postergar, y aplica los dos restantes con un mensaje que describe el lote. Hay un solo corte, advertido antes de confirmarlo, y ningún servicio que no estuviera en la lista se ve reemplazado.

## 3. Impacto

- La cantidad de ventanas de indisponibilidad deja de ser proporcional a la cantidad de cambios y pasa a ser una por lote aplicado.
- La consecuencia de un cambio se conoce antes de ejecutarlo y no después, lo que habilita decidir con información en lugar de descubrir. El alcance de esa consecuencia se calcula sobre las dependencias que toman del servicio modificado algún valor, cualquiera sea; las que sólo declaran que hay que esperarlo no llevan valor y por lo tanto no se ven alcanzadas por un cambio de configuración.
- El descarte de un cambio individual antes de aplicar cubre buena parte de lo que un mecanismo de deshacer aportaría, sin agregar un mecanismo aparte.
- Si la necesidad no se resuelve, el registro de arquitectura permite declarar cambios pero no protege la operación: cada ajuste sigue siendo una interrupción no planificada, y los ajustes se postergan por miedo al corte.
- El ajuste de recursos y de réplicas entra en el mismo circuito de revisión, con lo que sus consecuencias sobre el servidor y sobre las direcciones reservadas se ven antes de ejecutarse.

## 4. Problema específico que resuelve

- Cada cambio de configuración provoca su propio reemplazo de contenedor y su propia ventana de indisponibilidad.
- No hay ningún momento en el que se declare, antes de ejecutar, qué servicios quedan afectados por un cambio, sea cual sea el dato que tomaban del que cambió.
- Un cambio hecho por error no se puede descartar antes de que produzca consecuencias.
- Los ajustes de recursos y de réplicas se aplican sin mostrar su consecuencia sobre el resto del servidor ni sobre las direcciones reservadas.
- Ordenar visualmente la pantalla no debería tener consecuencias operativas, y hoy no hay ninguna distinción entre un cambio visual y un cambio de configuración.

## 5. Criterios de éxito

| Criterio | Métrica | Target | Plazo |
|---|---|---|---|
| Reemplazos por sesión de edición | Aplicaciones de cambios ejecutadas por una sesión de edición que toca varios servicios de un mismo proyecto SelfHosted | 1 aplicación por lote, en lugar de una por cambio | Al cierre de la etapa de cambios pendientes |
| Revisión previa obligatoria | Aplicaciones de cambios ejecutadas sin informe de impacto presentado antes, sobre el total de aplicaciones | 0 % de las aplicaciones | Continuo |
| Precisión del alcance del reemplazo | Servicios reemplazados que no figuraban en el informe de impacto, por aplicación de cambios | 0 servicios | Continuo |
| Cambios de escalado con consecuencia declarada | Cambios de réplicas y de límites de recursos que se presentan con su informe de impacto y se rechazan antes de ejecutarse si exceden los recursos del servidor o duplican una dirección fija | 100 % de los cambios de escalado | Al cierre de la etapa de escalado manual |
| Advertencia de la ventana de indisponibilidad | Aplicaciones que provocan un corte de servicio sin advertirlo explícitamente antes de confirmar | 0 aplicaciones | Continuo |

Filas derivadas. Ninguna fila de esta tabla está derivada. La primera toma su número del diferenciador declarado de aplicar en lote y redesplegar una sola vez; la segunda, la tercera y la cuarta se apoyan en reglas de negocio ya catalogadas sobre el informe de impacto, el alcance del redespliegue y los límites del escalado; la quinta se apoya en la consecuencia aceptada de no administrar enrutamiento de entrada, que obliga a advertir la ventana de indisponibilidad.

## 6. Stakeholders involucrados

| Rol | Nivel | Qué pide o aporta |
|---|---|---|
| Propietario del servidor y administrador único | Propietario | Decide qué cambios entran en cada lote y cuándo se paga la ventana de indisponibilidad |
| Agente humano del proyecto | Propietario | Valida en el punto de control que el informe de impacto es correcto y que se reemplaza sólo lo declarado |
| Equipo de desarrollo de dos personas | Implementador | Construye el cajón de cambios pendientes, el informe de impacto y la aplicación en lote |
| Agente de IA de codificación | Implementador | Especifica y genera los cortes verticales de cambios pendientes y de escalado manual |
| Usuario final: administrador de la solución | Beneficiario | Valida que puede revisar y descartar antes de provocar una indisponibilidad |

## 7. Trazabilidad a CU

| NB | CU prevista | Proyecto de código | Estado |
|---|---|---|---|
| NB-06 | CU-22 acumulación de cambios de configuración como pendientes, con distinción de los cambios puramente visuales | SelfHosted-Web | a generar |
| NB-06 | CU-23 descarte de un cambio individual del conjunto de cambios pendientes | SelfHosted-Web | a generar |
| NB-06 | CU-24 aplicación en lote de los cambios pendientes con reemplazo de lo afectado | SelfHosted-Web | a generar |
| NB-06 | CU-25 cálculo del informe de impacto de un conjunto de cambios pendientes | SelfHosted-Application | a generar |

Nota. El escalado horizontal y vertical no tiene caso de uso propio en esta necesidad: se especifica como cambio de configuración que entra en CU-22 y se aplica por CU-24, con sus reglas de rechazo evaluadas en el informe de CU-25. La categoría 02 puede desdoblarlo si el análisis funcional lo justifica.

Extensión declarada de la tabla estándar. La columna `Proyecto de código` se agrega a las tres columnas que fija la Tabla C de `Rules-Necesidades-Negocio.md` §4.4, porque los casos de uso se generan por proyecto de código y esta solución se compone de cuatro. No reemplaza ninguna columna de la tabla estándar. La justificación única de la extensión está en el índice maestro §4.2.

## 8. Dependencias con otras NB

- Depende de: NB-04, porque el informe de impacto necesita saber qué está efectivamente desplegado para declarar qué se reemplaza; y NB-05, porque el escalado horizontal exige una dirección reservada por réplica y su rechazo depende de las reservas.
- Es prerequisito de: ninguna otra NB de este catálogo. NB-03 la referencia como fuente de la configuración vigente al momento de exportar, pero no depende de ella para existir.

## 9. Prioridad MoSCoW

Must Have. Agrupa F-07 y F-09, ambas Must Have en SOLUTION-INTAKE §4, y sostiene el diferenciador de edición transaccional: sin él cada cambio cuesta su propia interrupción y los cambios se postergan.

## 10. Control de cambios

| Versión | Fecha | Cambios | Autor |
|---|---|---|---|
| 1.0 | 2026-07-27 | Versión inicial. Incorpora el escalado manual como cambio de configuración sujeto al mismo circuito de revisión. Cinco criterios de éxito, ninguno derivado, y cuatro casos de uso previstos, tres sobre SelfHosted-Web y uno sobre SelfHosted-Application | Analista de Negocio Senior (AG-01) |
| 1.0 | 2026-07-27 | Correcciones del audit A-01-Necesidades-Negocio-v1.0, dentro del mismo ciclo de emisión y sin incremento de versión. P1-01: anclas de la tabla de contenido reemitidas conservando tildes. P2-01: se declara la extensión de la Tabla C con la columna `Proyecto` | Analista de Negocio Senior (AG-01) |
| 1.1 | 2026-07-28 | Propagación del SOLUTION-INTAKE v1.2. Las decisiones D-5 y D-6 agregan un camino nuevo por el que un cambio alcanza a otros servicios: además de depender de la dirección y el puerto que cambió, un servicio puede tomar el valor de una variable que cambió. La §1, la §3 y la §4 lo incorporan al alcance del informe de impacto, sin alterar los cinco criterios de éxito, que ya medían el alcance del reemplazo con independencia del camino. La decisión D-1 resolvió el caso límite CL-04 estableciendo que un despliegue parcial es un estado legítimo, y queda citada en la trazabilidad upstream | Analista de Negocio Senior (AG-01) |
| 1.2 | 2026-07-28 | Propagación de la segunda pasada sobre la decisión D-6. La versión 1.1 describía dos caminos por los que un cambio alcanza a otros servicios, que era el reflejo de los dos mecanismos de vínculo que existían entonces. Con un único mecanismo esa formulación quedó sin objeto: la §1, la §3 y la §4 pasan a hablar de un solo alcance, calculado sobre todas las dependencias declaradas cualquiera sea el dato que cada una tome. No cambian los cinco criterios de éxito, que ya medían el alcance del reemplazo con independencia del camino | Analista de Negocio Senior (AG-01) |
| 1.3 | 2026-07-28 | Propagación de la tercera pasada sobre la decisión D-6. El tercer punto de §3 daba por sentado que toda dependencia declarada toma un valor del servicio del que depende, que era cierto hasta esta pasada. Ahora una dependencia puede existir sin valor de por medio, cuando su única razón es el orden de arranque, y esas no quedan alcanzadas por un cambio de configuración: el punto se precisa sobre esa distinción. No cambian los cinco criterios de éxito | Analista de Negocio Senior (AG-01) |
| 1.4 | 2026-07-28 | Propagación de la cuarta pasada sobre el intake, que es de terminología: el agente humano del proyecto resolvió el doble sentido de la palabra «proyecto» separando el término de producto del de la composición. Ninguna regla, flujo ni decisión cambia. Se aplica la forma completa «proyecto SelfHosted» en la primera mención de cada sección, en las definiciones y donde el otro sentido está cerca, y se conserva la forma corta donde el contexto ya lo fija. Del lado del sentido de composición la aplicación es exhaustiva: la columna de la tabla de trazabilidad a casos de uso pasa a llamarse `Proyecto de código` y el valor del campo `Proyecto` de la cabecera deja de contener la construcción prohibida que fusionaba los dos términos. | Analista de Negocio Senior (AG-01) |
