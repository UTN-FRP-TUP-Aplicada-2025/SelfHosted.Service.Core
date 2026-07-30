# NB-05 — Arranque previsible: orden deducido y conflictos de dirección detectados antes de fallar

| Campo | Valor |
|---|---|
| Proyecto | SelfHosted.Service.Core (solución; proyecto principal SelfHosted-Web) |
| Documento | NB-05-Arranque-Sin-Conflictos-De-Direccion-v1.0.md |
| Versión | 1.0 |
| Estado | Propuesto |
| Fecha | 2026-07-27 |
| Autor | Analista de Negocio Senior (AG-01) |
| Trazabilidad upstream | SOLUTION-INTAKE §1, §3 (diferenciador 4), §4 (F-06, F-08), §5 (historia 6), §6 (flujo 3), §7 (CL-01, CL-06), §17.2 P.10, §17.4 P.10, anexos E-8, E-16 (RN-03, RN-06, RN-14, RN-20), E-19; `Vision-Producto-v1.0.md` §3 (DV-04); `Alcance-Proyecto-v1.0.md` §4.1 |
| Trazabilidad downstream | CU-18 a CU-21 (previstas en 02-Especificacion-Funcional); 06-Backlog-Tecnico; 07-Plan-Sprint; 08-Calidad-Y-Pruebas |

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

Arrancar un conjunto de servicios en el servidor de referencia es hoy un acto que depende de dos cosas que no están escritas. La primera es el orden: hay servicios que necesitan que otro esté sano antes de levantarse, y ese orden vive en la memoria del operador. La segunda son las direcciones fijas de la red local, que se anotan fuera del sistema y que dos conjuntos distintos pueden estar reclamando sin que nadie lo sepa hasta que el motor de contenedores rechaza el arranque.

El problema de la dirección en conflicto no es que ocurra: es cuándo se descubre. Se descubre cuando algo ya falló, con un mensaje del motor que no dice qué otro servicio ocupaba la dirección ni qué hacer al respecto. La persona que opera queda con un conjunto a medio levantar y con la tarea de averiguar por su cuenta quién es el ocupante. Sobre un parque donde cinco servicios tienen dirección propia de la red local, esa averiguación se repite cada vez que se agrega uno nuevo.

El negocio necesita que el arranque sea previsible en las dos dimensiones. Por un lado, que el orden se deduzca de las dependencias ya declaradas y no de la memoria. Por el otro, que el conflicto de direcciones sea una regla verificada antes de tocar el motor, con el ocupante identificado y con resoluciones concretas ofrecidas, de manera que la persona decida en lugar de investigar.

## 2. Ejemplo de uso desde la perspectiva del negocio

El propietario arma un conjunto de servicios de pruebas reutilizando una dirección de la red local que cree libre porque el servicio que la usaba está detenido desde hace semanas. Arranca. Hoy el arranque avanza a medias: algunos servicios levantan y uno falla con un mensaje del motor que dice que la dirección está en uso. Tiene que salir a averiguar quién la ocupa, y el conjunto queda en un estado que no eligió.

Con la necesidad resuelta, el arranque se detiene antes de crear nada y le presenta el problema completo: qué dirección está en conflicto, qué servicio activo de qué otro conjunto la ocupa, y tres caminos posibles: detener el conjunto que la ocupa, reasignar la dirección a la siguiente libre del rango gestionado, o levantar el resto de los servicios y dejar el conjunto parcialmente activo, con ese estado declarado y no como una falla silenciosa. Elige reasignar, y el conjunto queda arrancado en el orden correcto, con los servicios que consumían la dirección anterior señalados para que él sepa cuáles quedaron desactualizados. El detalle de la secuencia corresponde a los casos de uso CU-19 a CU-21.

## 3. Impacto

- El arranque de un conjunto deja de depender de la memoria del operador y pasa a deducirse de lo declarado.
- El conflicto de direcciones pasa de accidente del motor a regla de negocio verificada, con el ocupante identificado y con resoluciones ofrecidas.
- La operación deja de terminar en estados a medias no elegidos: si un conjunto queda parcialmente activo es porque alguien lo decidió, y ese estado está declarado.
- Si la necesidad no se resuelve, cada dirección fija nueva sigue siendo una apuesta, y el registro de arquitectura no aporta ninguna protección sobre el recurso más escaso del parque real, que son las direcciones de la red local.
- La consecuencia de reasignar una dirección se propaga sola: los servicios que la consumían quedan señalados, en lugar de quedar apuntando en silencio a un valor que ya no existe.

## 4. Problema específico que resuelve

- El orden correcto de arranque de un conjunto de servicios no está declarado en ningún lado y se recuerda de memoria.
- Las direcciones fijas de la red local se anotan fuera del sistema y nadie sabe cuáles están efectivamente ocupadas.
- El conflicto de direcciones se descubre cuando el motor falla, con un mensaje que no identifica al ocupante ni ofrece salida.
- Un arranque que falla a mitad de camino deja el conjunto en un estado que nadie eligió y que no queda registrado.
- Al reasignar una dirección, los servicios que la consumían quedan apuntando a un valor obsoleto sin que nada lo señale.

## 5. Criterios de éxito

| Criterio | Métrica | Target | Plazo |
|---|---|---|---|
| Anticipación del conflicto de direcciones | Arranques con conflicto que se resuelven con informe previo, sobre el total de arranques con conflicto, en lugar de fallar en el motor | 100 % de los arranques con conflicto | Continuo |
| Inmediatez del informe de conflicto | Tiempo de validación de las reservas de un proyecto de hasta 30 servicios, sin acceder al motor de contenedores | ≤ 50 ms | Al cierre de la etapa de direcciones y conflictos |
| Resoluciones ofrecidas | Caminos de salida concretos que acompañan a cada informe de conflicto: detener el proyecto que ocupa la dirección, reasignar a la siguiente libre del rango, o arrancar parcialmente | 3 de 3 resoluciones | Al cierre de la etapa de direcciones y conflictos |
| Orden de arranque deducido | Arranques de proyecto que respetan el orden topológico del grafo de dependencias sin intervención manual, sobre el total de arranques de proyecto | 100 % de los arranques | Al cierre de la etapa de arranque y parada |
| Direcciones fijas fuera del sistema `[D]` | Direcciones fijas de la red local que siguen anotadas fuera de la solución, sobre las 5 que el parque relevado tiene asignadas a servicios con dirección propia de la red local | 0 direcciones | 3 meses desde el cierre de la Fase 1 |

Filas derivadas. Una fila está marcada `[D]`. El denominador de 5 direcciones proviene del inventario verificado del parque de referencia, donde cinco servicios tienen dirección propia de la red local, y es el mismo número que usa la §1 de este documento; el dolor declarado en SOLUTION-INTAKE §1 se enuncia justamente sobre las direcciones fijas de la red local. El target 0 es la derivación: expresa la eliminación de ese dolor, y no hay una métrica declarada que lo fije. Requiere confirmación del cliente.

## 6. Stakeholders involucrados

| Rol | Nivel | Qué pide o aporta |
|---|---|---|
| Propietario del servidor y administrador único | Propietario | Declara el rango de direcciones gestionado y las exclusiones, y decide qué resolución aplicar ante cada conflicto |
| Agente humano del proyecto | Propietario | Valida en el punto de control que un arranque en conflicto se bloquea con informe y resoluciones en lugar de fallar en el motor |
| Equipo de desarrollo de dos personas | Implementador | Construye la reserva de direcciones, la validación previa al arranque y el arranque en orden topológico |
| Agente de IA de codificación | Implementador | Especifica y genera los cortes verticales de arranque y parada y de direcciones y conflictos |
| Usuario final: administrador de la solución | Beneficiario | Valida que se entera del conflicto antes de romper algo que estaba funcionando |

## 7. Trazabilidad a CU

| NB | CU prevista | Proyecto | Estado |
|---|---|---|---|
| NB-05 | CU-18 arranque y parada del proyecto completo y de cada servicio, con marca de autoarranque | SelfHosted-Web | a generar |
| NB-05 | CU-19 declaración del rango de direcciones gestionado y reserva de dirección por servicio | SelfHosted-Web | a generar |
| NB-05 | CU-20 validación de conflicto de direcciones contra los servicios activos, sin acceso al motor | SelfHosted-Domain | a generar |
| NB-05 | CU-21 presentación del informe de conflicto con sus resoluciones y aplicación de la elegida | SelfHosted-Web | a generar |

Extensión declarada de la tabla estándar. La columna `Proyecto` se agrega a las tres columnas que fija la Tabla C de `Rules-Necesidades-Negocio.md` §4.4, porque los casos de uso se generan por proyecto y esta solución se compone de cuatro. No reemplaza ninguna columna de la tabla estándar. La justificación única de la extensión está en el índice maestro §4.2.

## 8. Dependencias con otras NB

- Depende de: NB-01, porque el orden de arranque se deduce del grafo de dependencias declarado; y NB-04, porque el conflicto se evalúa entre servicios efectivamente desplegables y activos.
- Es prerequisito de: NB-02, porque el contenedor incorporado trae su dirección observada y debe reservarla sin conflicto; y NB-06, porque el escalado horizontal exige una dirección por réplica.

## 9. Prioridad MoSCoW

Must Have. Agrupa F-06 y F-08, ambas Must Have en SOLUTION-INTAKE §4, y sostiene el diferenciador de tratar el conflicto de direcciones como regla de negocio y no como accidente del motor.

## 10. Control de cambios

| Versión | Fecha | Cambios | Autor |
|---|---|---|---|
| 1.0 | 2026-07-27 | Versión inicial. Fusiona el dolor del orden de arranque con el del conflicto de direcciones, porque ambos se manifiestan en el mismo acto y comparten público y momento de verificación. Cinco criterios de éxito, uno derivado y marcado `[D]`, y cuatro casos de uso previstos, tres sobre SelfHosted-Web y uno sobre SelfHosted-Domain | Analista de Negocio Senior (AG-01) |
| 1.0 | 2026-07-27 | Correcciones del audit A-01-Necesidades-Negocio-v1.0, dentro del mismo ciclo de emisión y sin incremento de versión. P1-01: anclas de la tabla de contenido reemitidas conservando tildes. P2-01: se declara la extensión de la Tabla C con la columna `Proyecto`. P2-02: el denominador del quinto criterio se unifica en las 5 direcciones de la red local que declara la §1 de este mismo documento. P3-01: el cierre de la §2 se sintetiza como resultado y remite el detalle de la secuencia a CU-19 a CU-21 | Analista de Negocio Senior (AG-01) |
