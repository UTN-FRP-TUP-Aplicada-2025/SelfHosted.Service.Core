# NB-07 — Atribución del consumo del servidor a un servicio concreto

| Campo | Valor |
|---|---|
| Proyecto | SelfHosted.Service.Core (solución; proyecto principal SelfHosted-Web) |
| Documento | NB-07-Atribucion-Del-Consumo-De-Recursos-v1.0.md |
| Versión | 1.0 |
| Estado | Propuesto |
| Fecha | 2026-07-27 |
| Autor | Analista de Negocio Senior (AG-01) |
| Trazabilidad upstream | SOLUTION-INTAKE §1, §4 (F-12), §5 (historia 8), §7 (CL-02), §9 (exclusión 6), §10, §11 (RG-04, RG-08), §17.1 P.10, §17.3 P.10, anexo E-19; `Vision-Producto-v1.0.md` §7 (RE-06), §8 (RG-04, RG-08); `Alcance-Proyecto-v1.0.md` §4.1, §5.1 |
| Trazabilidad downstream | CU-26 a CU-28 (previstas en 02-Especificacion-Funcional); 06-Backlog-Tecnico; 07-Plan-Sprint; 08-Calidad-Y-Pruebas |

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

El servidor de referencia es chico y está ajustado: cuatro núcleos de generación antigua, la memoria a mitad de uso con presión de intercambio apreciable y un único disco. En ese contexto, la pregunta que el propietario se hace cada vez que el servidor se pone lento no es si hay presión de memoria, sino de quién es. Hoy no tiene forma de responderla desde un solo lugar: tiene que consultar el estado del equipo por un lado y el de cada contenedor por otro, y hacer la correspondencia de memoria entre lo que consume recursos y el conjunto de servicios al que pertenece.

El problema tiene una restricción propia: buena parte de los servicios del parque tiene dirección propia en la red local, y el equipo que los hospeda no los alcanza por la misma placa. Eso descarta observarlos preguntándoles directamente. La observación tiene que apoyarse en el motor de contenedores, que es la fuente de verdad del estado real, y que además es lo único que permite detectar que un servicio que la solución cree activo ya no existe porque alguien lo tocó por fuera.

El negocio necesita una lectura del estado en tres niveles que se atraviesen sin salir de la solución: el equipo completo, cada conjunto de servicios y cada contenedor. Y necesita que esa lectura no le cueste al servidor más de lo que aporta: en un equipo de esta capacidad, un administrador que consulta el estado permanentemente es parte del problema, no de la solución.

## 2. Ejemplo de uso desde la perspectiva del negocio

El propietario nota que el servidor está lento y que la memoria está al límite. Hoy eso arranca una investigación: mira el consumo general, después el de cada contenedor, después trata de recordar cuál de ellos pertenece a qué conjunto y cuál de todos ellos cambió últimamente. La investigación termina, en el mejor de los casos, en una sospecha.

Con la necesidad resuelta abre el tablero, ve que la memoria del equipo está al ochenta y cinco por ciento, baja un nivel y ve que uno de sus conjuntos de servicios explica la mayor parte del consumo, baja otro nivel y ve cuál de sus contenedores es el responsable. Tres pantallas, ninguna correspondencia hecha de memoria. Además, cuando cierra el tablero el administrador deja de consultar el estado, porque la lectura ocurre sólo mientras alguien la está mirando; y si un contenedor desapareció del equipo porque alguien lo detuvo por fuera de la solución, el servicio correspondiente aparece señalado como huérfano en lugar de mostrarse activo sin serlo.

## 3. Impacto

- La atribución del consumo deja de ser una investigación y pasa a ser una lectura de tres niveles.
- La decisión de ajustar recursos deja de tomarse a ciegas: se sabe qué servicio consume qué antes de cambiarle el límite.
- La deriva entre lo que la solución cree y lo que el equipo ejecuta se hace visible, con lo que el registro de arquitectura conserva su credibilidad frente a operaciones hechas por fuera.
- Si la necesidad no se resuelve, el propietario conserva su registro de arquitectura pero sigue sin saber a quién atribuirle la presión sobre un servidor que está permanentemente al límite.
- La propia observación tiene costo, y la necesidad se define con ese costo acotado: sin lectura continua con las pantallas cerradas y sin exigirle al servidor un consumo que compita con los servicios que hospeda.

## 4. Problema específico que resuelve

- No hay un lugar donde el estado del equipo, el de cada conjunto de servicios y el de cada contenedor se lean con la misma vista.
- La correspondencia entre un contenedor que consume recursos y el conjunto de servicios al que pertenece se hace de memoria.
- Los servicios con dirección propia en la red local no se pueden observar preguntándoles directamente, y hoy no hay una fuente de estado alternativa integrada.
- Un contenedor que alguien detuvo o eliminó por fuera de la solución seguiría figurando como activo sin que nada lo señale.
- Cualquier observación agrega carga a un servidor que ya está al límite, y hoy no hay una política declarada de cuánto puede costar mirar.

## 5. Criterios de éxito

| Criterio | Métrica | Target | Plazo |
|---|---|---|---|
| Atribución de la presión de memoria | Picos de consumo de memoria del servidor que el tablero permite atribuir a un servicio concreto, sobre el total de picos observados | 100 % de los picos | Al cierre de la Fase 2 |
| Niveles de lectura disponibles | Capas del tablero que se recorren sin salir de la solución: estado del servidor, vista por proyecto y vista por contenedor | 3 de 3 capas | Al cierre de la Fase 2 |
| Costo de observar con las pantallas cerradas | Recolecciones de estadísticas ejecutadas mientras no hay ninguna vista de estado abierta | 0 recolecciones | Continuo |
| Frescura del estado mostrado | Antigüedad máxima del estado de un contenedor en pantalla: por recolección con la vista abierta y por reconciliación con el motor | ≤ 5 s con la vista abierta y ≤ 30 s por reconciliación | Continuo |
| Huella del propio administrador | Memoria residente del proceso de la solución en régimen sobre el servidor de referencia | < 1 GB, en el orden de cientos de MB | Continuo |

Filas derivadas. Ninguna fila de esta tabla está derivada. La primera y la segunda son criterios de transición de fase ya declarados; la tercera, la cuarta y la quinta toman sus números de umbrales no funcionales declarados que el cliente percibe directamente, porque describen cuánto le cuesta al servidor tener el administrador encendido y cuán actual es lo que ve en pantalla.

## 6. Stakeholders involucrados

| Rol | Nivel | Qué pide o aporta |
|---|---|---|
| Propietario del servidor y administrador único | Propietario | Aporta la restricción de capacidad del servidor y decide qué consumo del administrador es aceptable |
| Agente humano del proyecto | Propietario | Valida en el punto de control que la presión de memoria se atribuye a un servicio concreto desde el tablero |
| Equipo de desarrollo de dos personas | Implementador | Construye la lectura de estado del equipo, la recolección de estadísticas y la reconciliación con el motor |
| Agente de IA de codificación | Implementador | Especifica y genera el corte vertical del tablero en tres capas |
| Usuario final: administrador de la solución | Beneficiario | Valida que responde de quién es la presión de memoria sin salir de la solución |

## 7. Trazabilidad a CU

| NB | CU prevista | Proyecto | Estado |
|---|---|---|---|
| NB-07 | CU-26 lectura del estado del servidor: procesamiento, memoria, intercambio y disco | SelfHosted-Web | a generar |
| NB-07 | CU-27 vista general de estado por proyecto y vista por contenedor, con su consumo | SelfHosted-Web | a generar |
| NB-07 | CU-28 reconciliación del estado registrado con el motor y señalización del servicio huérfano | SelfHosted-Infrastructure | a generar |

Extensión declarada de la tabla estándar. La columna `Proyecto` se agrega a las tres columnas que fija la Tabla C de `Rules-Necesidades-Negocio.md` §4.4, porque los casos de uso se generan por proyecto y esta solución se compone de cuatro. No reemplaza ninguna columna de la tabla estándar. La justificación única de la extensión está en el índice maestro §4.2.

## 8. Dependencias con otras NB

- Depende de: NB-01, porque el tablero atribuye consumo a servicios y proyectos declarados; y NB-04, porque sólo se observa el estado de contenedores efectivamente desplegados.
- Es prerequisito de: ninguna otra NB de este catálogo. Es una necesidad terminal en el mapa de dependencias.

## 9. Prioridad MoSCoW

Should Have. Agrupa únicamente F-12, Should Have en SOLUTION-INTAKE §4: la solución resuelve su problema central sin el tablero, pero sin él el propietario conserva un punto ciego sobre el recurso más escaso de su servidor.

## 10. Control de cambios

| Versión | Fecha | Cambios | Autor |
|---|---|---|---|
| 1.0 | 2026-07-27 | Versión inicial. Cinco criterios de éxito, ninguno derivado, y tres casos de uso previstos, dos sobre SelfHosted-Web y uno sobre SelfHosted-Infrastructure | Analista de Negocio Senior (AG-01) |
| 1.0 | 2026-07-27 | Correcciones del audit A-01-Necesidades-Negocio-v1.0, dentro del mismo ciclo de emisión y sin incremento de versión. P1-01: anclas de la tabla de contenido reemitidas conservando tildes. P2-01: se declara la extensión de la Tabla C con la columna `Proyecto` | Analista de Negocio Senior (AG-01) |
