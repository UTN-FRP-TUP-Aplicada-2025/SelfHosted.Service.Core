# NB-06 — Cambios de configuración revisados antes de aplicarse y aplicados en un solo lote

| Campo | Valor |
| --- | --- |
| Producto | SelfHosted Service |
| Documento | NB-06-Cambios-Revisados-Y-Aplicados-En-Lote.md |
| Versión | 2.0 |
| Estado | Propuesto |
| Fecha | 2026-07-30 |
| Autor | Analista de Negocio Senior (AG-01) |
| Trazabilidad upstream | PRODUCT-INTAKE-SelfHosted-Service §3 (diferenciador 3), §4 (F-07, F-09), §5 (historia 5), §7 (CL-06), §9 (exclusión 2), §23.1, §23.3, §23.4, §23.5; Vision-Producto.md §3.2 (DV-03), §4.2; Alcance-Producto.md §4.1, §5.1; Roadmap-Producto.md §2.3 (EP-07, EP-09), §3 |
| Trazabilidad downstream | CU-22, CU-23, CU-24, CU-25 (previstas en 02-Especificacion-Funcional) |

---

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

Modificar la configuración de un servicio que ya está desplegado implica reemplazar su contenedor, y reemplazarlo implica una ventana de indisponibilidad. Hoy cada cambio provoca la suya: cambiar una variable, después un puerto y después un límite de memoria son tres reemplazos y tres cortes, aunque el operador los haya decidido en la misma sesión de trabajo. Como no hay ningún momento intermedio entre decidir y ejecutar, tampoco hay dónde revisar qué se está por hacer ni dónde descartar un cambio hecho por error antes de que produzca consecuencias.

La necesidad es que la edición de configuración sea transaccional: los cambios se acumulan, se muestran juntos con un informe que declara qué servicios quedan afectados, se descarta lo que no va, y se aplican en un solo lote con un único redespliegue de lo afectado. Es uno de los cinco diferenciadores declarados del producto y la razón por la que ordenar la pantalla no debería costar nada: un cambio visual no es un cambio de configuración y el sistema tiene que distinguirlos.

La necesidad cubre también los ajustes de recursos y de réplicas. Cambiar límites o cantidad de instancias es una edición de configuración que provoca reemplazo de contenedor y que comparte el mismo circuito de revisión, el mismo informe de impacto y la misma ventana de indisponibilidad que el resto; además tiene consecuencias propias sobre la capacidad del servidor y sobre las direcciones reservadas, que deben declararse antes de ejecutar y no después.

## 2. Ejemplo de uso desde la perspectiva del negocio

El propietario entra a revisar un conjunto y hace cinco cosas: mueve tres nodos para que el dibujo se entienda, cambia el puerto publicado de un servicio, y le sube el límite de memoria a otro. Hoy cada uno de los dos últimos cambios corta su servicio en el momento en que se guarda, y el movimiento de los nodos —que no debería tener ninguna consecuencia operativa— no se distingue de los otros dos.

Lo que necesita es que los cinco queden acumulados y marcados como pendientes, que el sistema le muestre que aplicar el lote va a reemplazar dos contenedores y a dejar sin servicio a los que dependen de uno de ellos durante ese reemplazo, que pueda descartar el cambio de memoria porque se equivocó de servicio, y que al confirmar el resto se redespliegue una sola vez.

## 3. Impacto

- La ventana de indisponibilidad pasa de ser una por cambio a ser una por sesión de edición, con lo que el costo de operar el parque baja de forma directa.
- Aparece un momento explícito de revisión previa, que hoy no existe: se sabe qué va a pasar antes de que pase.
- Un cambio hecho por error se puede descartar antes de producir consecuencias, en lugar de tener que revertirse después.
- Ordenar visualmente la pantalla deja de tener consecuencias operativas, porque el sistema distingue el cambio visual del cambio de configuración.
- Los ajustes de recursos y de réplicas dejan de aplicarse a ciegas sobre un servidor que ya está al límite.
- Si la necesidad queda sin resolver, el operador evita modificar configuraciones para no provocar cortes, y la configuración declarada se degrada respecto de lo que realmente hace falta.

## 4. Problema específico que resuelve

- Cada cambio de configuración provoca su propio reemplazo de contenedor y su propia ventana de indisponibilidad.
- No hay ningún momento en el que se declare, antes de ejecutar, qué servicios quedan afectados.
- Un cambio hecho por error no se puede descartar antes de que produzca consecuencias.
- Los ajustes de recursos y de réplicas se aplican sin mostrar su consecuencia sobre el resto del servidor ni sobre las direcciones reservadas.
- Ordenar visualmente la pantalla no debería tener consecuencias operativas, y hoy nada distingue un cambio visual de uno de configuración.

## 5. Criterios de éxito

Ningún criterio usa fecha de calendario. Los plazos se anclan al cierre de la etapa que entrega la capacidad medida, según la convención del intake §23.3 y la secuencia de etapas de [Roadmap-Producto.md](../../00-Contexto/Roadmap-Producto.md) §3. Ninguno de los cinco es derivación.

| Criterio | Métrica | Target | Plazo |
| --- | --- | --- | --- |
| Reemplazos por sesión de edición | Aplicaciones que provocan reemplazo de contenedor, por sesión de edición con varios cambios | 1 aplicación en lote, en lugar de 1 por cambio | Cierre de la etapa `06`, que entrega los cambios pendientes (EP-07) |
| Revisión previa obligatoria | Aplicaciones ejecutadas sin informe de impacto presentado antes | 0 % de las aplicaciones | Continuo, desde el cierre de la etapa `06` |
| Precisión del alcance declarado | Servicios reemplazados que no figuraban en el informe de impacto | 0 servicios | Continuo, desde el cierre de la etapa `06` |
| Cambios de escalado con consecuencia declarada | Cambios de réplicas o de límites presentados con su informe, y rechazados antes de ejecutarse si exceden los recursos del servidor o duplican una dirección fija | 100 % de los cambios de escalado | Cierre de la etapa `08`, que entrega el escalado manual (EP-09) |
| Advertencia de la ventana de indisponibilidad | Aplicaciones que provocan corte de servicio sin advertirlo antes de confirmar | 0 aplicaciones | Continuo, desde el cierre de la etapa `06` |

El cuarto criterio recoge la restricción declarada del producto: no hay solapamiento de versiones ni distribución de tráfico entre réplicas, de modo que el reemplazo de una versión es detener y arrancar, y la interfaz debe advertir la ventana de indisponibilidad al confirmar.

## 6. Stakeholders involucrados

| Rol | Nivel | Qué pide o aporta |
| --- | --- | --- |
| Agente humano del proyecto | Propietario | Revisa y aprueba la necesidad, y da el OK explícito de cada punto de control que la entrega |
| Analista de Negocio Senior (AG-01) | Propietario del contenido | Mantiene la necesidad, sus criterios y su trazabilidad, y declara las brechas en lugar de resolverlas |
| Equipo de desarrollo, dos desarrolladores | Implementador | Construye la acumulación de cambios pendientes, el cálculo del informe de impacto y la aplicación en lote |
| Agente IA de codificación | Implementador | Genera la especificación y, en etapas posteriores, el código de los cortes verticales de cambios y de escalado |
| Usuario final: administrador del producto | Beneficiario | Valida que pueda revisar el impacto antes de provocar una ventana de indisponibilidad |
| Product Manager (AG-00) | Consultado | Verifica la alineación con la visión y con el alcance declarados |
| Analista Funcional (AG-02) | Consultado | Desarrolla los casos de uso que esta necesidad declara previstos |

## 7. Trazabilidad a CU

| NB | CU prevista | Estado |
| --- | --- | --- |
| NB-06 | CU-22 acumulación de cambios pendientes, con distinción de los visuales (capa de presentación) | a generar |
| NB-06 | CU-23 descarte de un cambio individual (capa de presentación) | a generar |
| NB-06 | CU-24 aplicación en lote (capa de presentación) | a generar |
| NB-06 | CU-25 cálculo del informe de impacto (capa de aplicación) | a generar |

## 8. Dependencias con otras NB

- Depende de: NB-04, porque lo que se edita es la configuración que el alta declaró; y NB-05, porque el informe de impacto y el rechazo previo de un cambio de escalado se apoyan en las reservas de dirección y en el orden declarado.
- Es prerequisito de: ninguna otra NB.

## 9. Prioridad MoSCoW

Must Have. Las dos capacidades que agrupa son del Alcance 1 y sostienen el diferenciador de edición transaccional, sin el cual cada cambio de configuración vuelve a costar una ventana de indisponibilidad propia.

## 10. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 2.0 | 2026-07-30 | Migración normativa del conjunto 4.1 al 6.0, fase M4 corte 2, bajo `Rules-Necesidades-Negocio` 3.1 y `Vocabulario-Rules` 2.1. Clasificación **regenerar contenido** por el salto major de la regla que lo gobierna; fuente de contenido: el documento de origen, archivado en `_legacy/2026-07-30/`. Sube **major** porque la nomenclatura anterior deja de cumplir. Cabecera: la etiqueta `Proyecto` pasa a `Producto` sobre el mismo valor, según `Vocabulario-Rules` §3 y §4 R3; la trazabilidad upstream apunta al `PRODUCT-INTAKE-SelfHosted-Service` renombrado y al artefacto hermano `Alcance-Producto.md`, antes `Alcance-Proyecto.md`. **La fila 1.0 de esta misma tabla nombra `Alcance-Proyecto.md` y no se reescribió**, por `SDD-Development-Guide.md` §VI.2: una fila histórica registra lo que se hizo cuando se hizo, y el nombre legado ahí es dato del registro y no una referencia a resolver; no es un enlace y por lo tanto no rompe ninguna navegación. Sustitución léxica **por ocurrencia** según `Vocabulario-Rules` §9.5 y el plan de migración §3.5: una ocurrencia de «solución» designaba el nivel superior y pasa a «producto» con su concordancia —«administrador de la solución» a «administrador del producto» en §6—; no hay ninguna «solución de código» ni ninguna «resolución» en este documento. Las cuatro ocurrencias de «proyecto» se clasificaron por referente y **ninguna pasó a «proyecto de código»**: ninguna designa la entidad del dominio en el cuerpo, una es el emprendimiento —«el agente humano del proyecto» en §6—, dos son el nombre del artefacto hermano y una la etiqueta de cabecera, según el intake §12. Ninguna necesidad, criterio de éxito, dependencia, prioridad ni CU prevista cambió: la migración es léxica y de forma de cabecera |
| 1.0 | 2026-07-29 | Corrección absorbida dentro de la versión 1.0, sin subirla y sin archivar el estado anterior, por la política de versionado de `Master-Prompt.md` §5. Se completa el campo `Trazabilidad upstream` de la cabecera con `Roadmap-Producto.md` §3, que el §5 cita como origen de los hitos de anclaje, y con `Alcance-Proyecto.md` §5.1, de donde proviene la exclusión de enrutamiento de entrada que sostiene el cuarto criterio y la advertencia de la ventana de indisponibilidad. Origen: hallazgo H-02 del informe [Audit/A-00-01-r1.md](../../Audit/A-00-01-r1.md) |
| 1.0 | 2026-07-29 | Versión inicial, generada bajo el conjunto normativo 4.0 del Framework SDD a partir del consolidado de la Fase A previa transcripto en el intake §23, y de los documentos de 00-Contexto. Conserva el identificador NB-06, sus cinco criterios de éxito y la decisión de recorte que ubica F-09 acá y no en NB-07 |
