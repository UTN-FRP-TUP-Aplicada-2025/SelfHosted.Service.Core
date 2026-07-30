# NB-01 — Visibilidad unificada de la arquitectura de un conjunto de servicios

| Campo | Valor |
|---|---|
| Proyecto | SelfHosted.Service.Core (solución; proyecto principal SelfHosted-Web) |
| Documento | NB-01-Visibilidad-Unificada-De-La-Arquitectura-v1.2.md |
| Versión | 1.2 |
| Estado | Propuesto |
| Fecha | 2026-07-28 |
| Autor | Analista de Negocio Senior (AG-01) |
| Trazabilidad upstream | SOLUTION-INTAKE §1, §3, §4 (F-02, F-03, F-04), §5 (historias 2 y 3), §6 (flujo 1), §12, §17.1 P.10, §19, la segunda pasada sobre la decisión D-6 del 2026-07-28 y sus anexos E-4 y E-19; `Vision-Producto-v1.1.md` §1, §3; `Alcance-Proyecto-v1.1.md` §4.1 |
| Trazabilidad downstream | CU-01 a CU-05 (previstas en 02-Especificacion-Funcional); 06-Backlog-Tecnico; 07-Plan-Sprint; 08-Calidad-Y-Pruebas |

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

La operación del servidor de referencia no cuenta con ningún lugar donde se vea la arquitectura completa de un conjunto de servicios ni la relación entre ellos. Cada servicio se levantó en su momento con su propio archivo de composición, sus variables de entorno no versionadas, sus montajes de directorio y su modo de red particular, y el resultado es que la arquitectura no existe como objeto: existe repartida entre archivos dispersos y el estado que el motor de contenedores está ejecutando en ese momento.

La consecuencia cotidiana es que responder una pregunta elemental —qué servicio consume la dirección y el puerto de qué otro— obliga a abrir varios archivos y contrastarlos con lo que efectivamente corre. La relación entre servicios no está declarada en ninguna parte: se reconstruye de memoria cada vez que hace falta. Sobre un parque de ocho contenedores repartidos en cinco conjuntos distintos, ese trabajo de reconstrucción ya es permanente, y crece con cada servicio nuevo.

Lo que el negocio necesita es que la arquitectura de un conjunto de servicios pase a ser un objeto de primera clase: declarado, agrupado por proyecto, con sus servicios y sus dependencias visibles en una sola pantalla, y con una disposición que la persona que la pensó pueda ordenar y recuperar tal como la dejó. No se trata de reemplazar al motor de contenedores, sino de darle a la configuración declarada un registro común y legible que hoy no tiene.

## 2. Ejemplo de uso desde la perspectiva del negocio

El propietario necesita cambiar el puerto en el que escucha una de sus bases de datos. Antes de tocar nada tiene que saber quién la usa. Hoy eso significa recordar en qué conjunto vive esa base, abrir los archivos de los servicios que sospecha que la consumen, leer las variables de entorno de cada uno, y verificar contra el motor si el que está corriendo coincide con lo que dice el archivo. Media hora después tiene una lista que no está seguro de que esté completa, y esa incertidumbre es la que hace que el cambio se postergue.

Con la necesidad resuelta, entra al conjunto de servicios, mira una pantalla, y ve la base con dos flechas entrando: la interfaz web y el proceso de generación de informes. La lista está completa porque la relación está declarada, no deducida. Además, la pantalla está ordenada como él la dejó la última vez, con los servicios de datos abajo y los de cara al usuario arriba, de manera que la lee sin volver a interpretarla.

## 3. Impacto

- La configuración declarada de todo el parque pasa a tener un único lugar de consulta, y deja de depender de la memoria del operador.
- La relación entre servicios deja de ser tácita: queda declarada y por lo tanto verificable, y habilita todo lo que se deduce de ella (orden de arranque, propagación de cambios, informe de impacto). Hay un único modo de declararla: un servicio toma de otro un valor, sea su dirección, su puerto o cualquier otro de sus datos. Trazar la flecha en el lienzo es la forma cómoda de escribir esa toma, no un mecanismo aparte.
- No todas las dependencias declaradas pesan lo mismo sobre la operación: las que toman la dirección o el puerto de otro servicio declaran que se lo consume por red y por eso gobiernan el orden de arranque, mientras que las que toman cualquier otro dato no lo gobiernan, porque el valor sale del registro y no exige que el otro servicio esté corriendo. Si el dibujo no deja ver a cuál de las dos clases pertenece cada flecha, el lienzo deja de responder una de las preguntas para las que existe.
- Si la necesidad no se resuelve, ninguna de las demás necesidades de este catálogo tiene sobre qué apoyarse: sin proyecto, servicio y relación declarados no hay adopción que incorporar, ni changeset que revisar, ni exportación que reproducir.
- La lectura de la arquitectura pasa a ser una tarea de segundos y deja de ser un trabajo de reconstrucción, lo que reduce la barrera para hacer cambios que hoy se postergan por incertidumbre.
- El costo de incorporar un servicio nuevo al registro deja de crecer con el tamaño del parque, porque el registro es único y no una colección de archivos.

## 4. Problema específico que resuelve

- No existe un inventario de qué conjuntos de servicios hay en el servidor ni de qué servicios compone cada uno.
- La dependencia entre dos servicios no está declarada en ningún lado: se infiere leyendo variables de entorno de archivos separados.
- La configuración declarada de un servicio y lo que el motor está ejecutando pueden divergir sin que nada lo señale.
- La disposición mental que el operador tiene de su arquitectura no está registrada: cada vez que la revisa la vuelve a armar.
- Mirando el dibujo no se puede anticipar en qué orden va a levantar el conjunto, porque no toda dependencia dibujada condiciona el arranque y nada distingue a las que sí lo hacen.
- Los datos de la arquitectura que sí están anotados viven fuera de cualquier sistema y no sobreviven a una reinstalación.

## 5. Criterios de éxito

| Criterio | Métrica | Target | Plazo |
|---|---|---|---|
| Cobertura del parque en el registro `[D]` | Conjuntos de servicios del parque de referencia representados como proyecto declarado en la solución, sobre los 5 conjuntos distintos del inventario del parque | 5 de 5 conjuntos | Al cierre de la Fase 1, que es la que entrega el registro de proyectos, servicios y dependencias |
| Autosuficiencia de la consulta de dependencias `[D]` | Archivos externos a la solución que hay que abrir para responder qué servicio consume la dirección y el puerto de otro | 0 archivos | Al cierre de la etapa del lienzo |
| Escala legible sin degradación | Nodos y aristas por lienzo, con insignia de estado y métricas por nodo actualizando cada 2 s, sin retraso perceptible entre el gesto y la respuesta visual | 30 nodos y 40 aristas | Medido en la puerta técnica PT-01, antes de comprometer el corte del lienzo |
| Conservación de la disposición | Proyectos cuya disposición del lienzo se recupera idéntica tras recargar la pantalla | 100 % de los proyectos | Al cierre de la etapa del lienzo |
| Estabilidad de la sesión de trabajo | Consumo de memoria de la sesión de interfaz tras 15 minutos de uso continuo del lienzo | Estable, sin crecimiento sostenido; el valor numérico lo fija la puerta técnica PT-01 al medir | Medido en la puerta técnica PT-01 |
| Previsibilidad del arranque leyendo el lienzo | Dependencias dibujadas cuya clase —si gobierna o no el orden de arranque— se distingue mirando el lienzo, sin abrir la configuración de ningún servicio | 100 % de las dependencias | Al cierre de la etapa del lienzo |

La sexta fila declara qué debe poder leerse, no cómo se dibuja: la forma visual concreta que distingue una clase de dependencia de la otra es materia de 03-UX-UI-DX, y el intake la registra como pendiente de decisión. Esta necesidad sólo fija que la distinción tiene que ser legible en el lienzo, porque de ella depende poder anticipar el orden de arranque.

Filas derivadas. Dos filas están marcadas `[D]` porque su target no proviene de una métrica declarada. La fila de cobertura del parque toma del inventario del parque el denominador de 5 conjuntos, que sí está verificado, pero el target del 100 % sigue siendo derivación: la única métrica declarada sobre el parque es la de adopción, con target del 75 % sobre contenedores y no sobre conjuntos. Su plazo dejó de ser derivación el 2026-07-28, cuando el agente humano del proyecto declaró que no hay plazo fijado y que el plazo no es relevante para este criterio; queda anclado al hito que entrega la capacidad, como el resto del catálogo. La fila de autosuficiencia deriva el target 0 del dolor descripto en SOLUTION-INTAKE §1, donde el trabajo de abrir archivos dispersos es exactamente lo que la necesidad elimina; mide el producto, no este documento. Las dos requieren confirmación del cliente.

La fila de estabilidad de la sesión dejó de ser derivación en esta versión: adopta el umbral cualitativo que el intake declara para la puerta técnica PT-01 —consumo estable, sin crecimiento sostenido tras 15 minutos de uso continuo— en lugar del porcentaje que este catálogo había derivado, y es la propia puerta técnica la que fija el número al medir.

## 6. Stakeholders involucrados

| Rol | Nivel | Qué pide o aporta |
|---|---|---|
| Propietario del servidor y administrador único | Propietario | Aporta la arquitectura real de sus cinco conjuntos de servicios y decide qué se considera un proyecto declarado |
| Agente humano del proyecto | Propietario | Valida en el punto de control que la arquitectura de un conjunto se lee en una sola pantalla y que la disposición se conserva |
| Equipo de desarrollo de dos personas | Implementador | Construye el registro de proyectos, servicios y dependencias, y la superficie visual que lo hace legible |
| Agente de IA de codificación | Implementador | Especifica y genera el código de los cortes verticales de proyectos, servicios y lienzo |
| Usuario final: administrador de la solución | Beneficiario | Valida que la pantalla responde qué consume qué sin abrir ningún archivo externo |

## 7. Trazabilidad a CU

| NB | CU prevista | Proyecto | Estado |
|---|---|---|---|
| NB-01 | CU-01 alta de un proyecto con su modo de red y su persistencia | SelfHosted-Web | a generar |
| NB-01 | CU-02 listado, renombrado y eliminación de proyectos | SelfHosted-Web | a generar |
| NB-01 | CU-03 alta y configuración completa de un servicio del proyecto | SelfHosted-Web | a generar |
| NB-01 | CU-04 composición del lienzo: nodos, aristas de dependencia y agrupación | SelfHosted-Web | a generar |
| NB-01 | CU-05 persistencia y recuperación de la disposición del lienzo por proyecto | SelfHosted-Web | a generar |

Extensión declarada de la tabla estándar. La columna `Proyecto` se agrega a las tres columnas que fija la Tabla C de `Rules-Necesidades-Negocio.md` §4.4, porque los casos de uso se generan por proyecto y esta solución se compone de cuatro. No reemplaza ninguna columna de la tabla estándar. La justificación única de la extensión está en el índice maestro §4.2.

## 8. Dependencias con otras NB

- Depende de: NB-08, porque ninguna operación sobre el registro existe sin una sesión iniciada del administrador único.
- Es prerequisito directo de: NB-02, NB-03, NB-04, NB-05 y NB-07, y por transitividad de NB-06 a través de NB-04 y NB-05. Todas ellas operan sobre proyectos, servicios y dependencias declaradas, que son lo que esta necesidad establece.

## 9. Prioridad MoSCoW

Must Have. Agrupa las capacidades F-02, F-03 y F-04, las tres Must Have en SOLUTION-INTAKE §4, y es el dolor central declarado en §1: sin registro común de la arquitectura la solución no resuelve el problema que la origina.

## 10. Control de cambios

| Versión | Fecha | Cambios | Autor |
|---|---|---|---|
| 1.0 | 2026-07-27 | Versión inicial. Cinco criterios de éxito, dos de ellos derivados y marcados `[D]`, y cinco casos de uso previstos sobre SelfHosted-Web | Analista de Negocio Senior (AG-01) |
| 1.0 | 2026-07-27 | Correcciones del audit A-01-Necesidades-Negocio-v1.0, dentro del mismo ciclo de emisión y sin incremento de versión. P1-01: anclas de la tabla de contenido reemitidas conservando tildes. P1-03: la primera fila de §5 se reconoce como derivación y se marca `[D]`, con lo que las derivaciones de esta necesidad pasan de dos a tres. P2-01: se declara la extensión de la Tabla C con la columna `Proyecto`. P3-02: la relación con NB-06 se distingue como transitiva | Analista de Negocio Senior (AG-01) |
| 1.1 | 2026-07-28 | Propagación del SOLUTION-INTAKE v1.2 y respuesta del agente humano del proyecto sobre dos criterios derivados. El criterio de cobertura del parque pierde el plazo de tres meses y queda anclado al cierre de la Fase 1, porque el agente humano declaró que no hay plazo fijado y que el plazo no es relevante; conserva la marca `[D]` sobre su target, que sigue siendo derivación. El criterio de estabilidad de la sesión reemplaza el `≤ 10 %` derivado por el umbral cualitativo que el intake declara para la puerta técnica PT-01 y deja de estar marcado `[D]`. La §1 registra que la dependencia declarada entre servicios tiene dos orígenes, la dirección con su puerto y el valor de una variable, tras las decisiones D-5 y D-6. Derivaciones de esta necesidad: de tres a dos | Analista de Negocio Senior (AG-01) |
| 1.2 | 2026-07-28 | Propagación de la segunda pasada sobre la decisión D-6. Deja de haber dos mecanismos de vínculo entre servicios: hay uno solo, y trazar la flecha en el lienzo es la forma cómoda de escribirlo. Se reformula el punto de §3 que hablaba de dos orígenes de la dependencia, que quedó sin objeto. Se incorpora la distinción con consecuencia funcional que la segunda pasada introduce: las dependencias que toman la dirección o el puerto de otro servicio gobiernan el orden de arranque y las que toman cualquier otro dato no, de donde se sigue un problema de legibilidad nuevo en §4 y un sexto criterio de éxito que exige poder distinguirlas mirando el lienzo. La forma visual de esa distinción queda declarada como materia de 03-UX-UI-DX | Analista de Negocio Senior (AG-01) |
