# NB-05 — Arranque previsible: orden declarado y conflictos de dirección detectados antes de fallar

| Campo | Valor |
| --- | --- |
| Producto | SelfHosted Service |
| Documento | NB-05-Arranque-Previsible-Y-Conflictos-Anticipados.md |
| Versión | 2.0 |
| Estado | Propuesto |
| Fecha | 2026-07-30 |
| Autor | Analista de Negocio Senior (AG-01) |
| Trazabilidad upstream | PRODUCT-INTAKE-SelfHosted-Service §1, §3 (diferenciador 4), §4 (F-06, F-08), §6 (flujo 3), §7 (CL-01), §17.P.10, §23.1, §23.3, §23.4, §23.5; Vision-Producto.md §3.2 (DV-04); Alcance-Producto.md §4.1; Roadmap-Producto.md §2.3 (EP-06, EP-08), §3 |
| Trazabilidad downstream | CU-18, CU-19, CU-20, CU-21 (previstas en 02-Especificacion-Funcional) |

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

Arrancar un conjunto de servicios depende hoy de dos conocimientos que no están escritos en ningún lado: el orden correcto, que el operador recuerda, y qué direcciones fijas de la red local están ocupadas, que el operador anota fuera del sistema. Cuando alguno de los dos falla, el resultado no es un aviso sino un error del motor de contenedores, con un mensaje que no identifica al ocupante de la dirección ni ofrece salida, y con un conjunto que quedó a mitad de camino en un estado que nadie eligió.

La necesidad es que el arranque sea previsible: que el orden esté declarado en el modelo y se respete solo, y que el conflicto de direcciones se detecte antes de tocar el motor, con un informe que diga quién ocupa la dirección y con opciones concretas para resolverlo. Es la diferencia entre un accidente y una regla de negocio verificada, y es uno de los cinco diferenciadores declarados del producto.

La necesidad incluye el gobierno del rango de direcciones. No alcanza con detectar el choque en el momento de arrancar: toda dirección fija que se asigne tiene que salir de un rango que el sistema conoce y quedar registrada como reserva, porque de lo contrario el sistema sigue sin saber qué está ocupado y la detección vuelve a depender de datos anotados afuera.

## 2. Ejemplo de uso desde la perspectiva del negocio

El propietario arranca un conjunto de pruebas un sábado. Uno de sus servicios tiene una dirección fija que él mismo asignó hace meses a otro servicio que hoy está corriendo. El motor de contenedores rechaza la creación con un error que menciona la dirección pero no dice quién la tiene; el conjunto queda a medias, con dos servicios levantados y el resto no. El propietario pasa la tarde buscando cuál de sus contenedores ocupa esa dirección.

Lo que necesita es que, al pedir el arranque, el sistema le diga antes de hacer nada: «esta dirección está ocupada por tal servicio activo de tal conjunto», y le ofrezca detener ese conjunto, reasignar la dirección a la siguiente libre del rango, o arrancar el resto de los servicios dejando el conjunto parcialmente activo.

## 3. Impacto

- El conflicto de direcciones pasa de ser un accidente descubierto en el motor a ser una regla verificada antes de ejecutar, con resoluciones ofrecidas.
- El orden de arranque deja de vivir en la memoria del operador y pasa a estar declarado en el modelo, con lo que el arranque es reproducible por cualquiera.
- Las direcciones fijas dejan de anotarse fuera del sistema, y el inventario de lo ocupado queda dentro del producto.
- Si la necesidad queda sin resolver, cada arranque de un conjunto sigue siendo una operación de riesgo que puede dejar el conjunto en un estado intermedio no registrado.
- La incorporación de contenedores existentes se vuelve segura, porque la dirección que trae un contenedor incorporado se contrasta contra lo ya reservado.

## 4. Problema específico que resuelve

- El orden correcto de arranque no está declarado y se recuerda de memoria, y no hay dónde asentar cuál dependencia obliga a esperar y cuál no.
- Las direcciones fijas se anotan fuera del sistema y nadie sabe cuáles están ocupadas.
- El conflicto se descubre cuando el motor de contenedores falla, con un mensaje que no identifica al ocupante ni ofrece salida.
- Un arranque que falla a mitad deja el conjunto en un estado que nadie eligió y que no queda registrado.
- Al reasignar una dirección, los servicios que la consumían quedan apuntando a un valor obsoleto sin que nada lo señale.

## 5. Criterios de éxito

Ningún criterio usa fecha de calendario. Los plazos se anclan al cierre de la etapa que entrega la capacidad medida, según la convención del intake §23.3 y la secuencia de etapas de [Roadmap-Producto.md](../../00-Contexto/Roadmap-Producto.md) §3. Ninguno de los cinco es derivación; el intake registra que el quinto reemplazó a un criterio derivado anterior que miraba el lugar equivocado.

| Criterio | Métrica | Target | Plazo |
| --- | --- | --- | --- |
| Anticipación del conflicto | Arranques con conflicto de dirección resueltos con informe previo en lugar de fallar en el motor de contenedores | 100 % de los arranques con conflicto | Cierre de la etapa `07`, que entrega direcciones y conflictos (EP-08) |
| Inmediatez del informe | Tiempo de validación del conflicto para un proyecto SelfHosted de hasta 30 servicios, sin acceder al motor de contenedores | ≤ 50 ms | Cierre de la etapa `07` |
| Resoluciones ofrecidas | Resoluciones concretas que el informe de conflicto presenta al administrador | 3 de 3 resoluciones | Cierre de la etapa `07` |
| Orden de arranque respetado | Arranques que respetan el orden topológico de las dependencias marcadas como de espera, sin intervención manual | 100 % de los arranques | Cierre de la etapa `05`, que entrega arranque y parada (EP-06) |
| Gobierno del rango de direcciones | Direcciones fijas asignadas dentro del rango gestionado y registradas como reserva | 100 % de las direcciones fijas | Continuo, desde el cierre de la etapa `07` |

El umbral de 50 ms del segundo criterio es requerimiento no funcional declarado en el intake §17.P.10 y no una derivación de esta categoría. Las tres resoluciones del tercer criterio son las que el intake declara y que el agente humano del proyecto confirmó sin cambios el 2026-07-28 (decisión D-4): detener el conjunto en conflicto, reasignar la dirección a la siguiente libre del rango, o arrancar parcialmente el resto de los servicios.

## 6. Stakeholders involucrados

| Rol | Nivel | Qué pide o aporta |
| --- | --- | --- |
| Agente humano del proyecto | Propietario | Revisa y aprueba la necesidad, y da el OK explícito de cada punto de control que la entrega |
| Analista de Negocio Senior (AG-01) | Propietario del contenido | Mantiene la necesidad, sus criterios y su trazabilidad, y declara las brechas en lugar de resolverlas |
| Equipo de desarrollo, dos desarrolladores | Implementador | Construye el validador de conflictos, el registro de reservas y el arranque ordenado, con sus pruebas de regla |
| Agente IA de codificación | Implementador | Genera la especificación y, en etapas posteriores, el código de los cortes verticales de arranque y de direcciones |
| Usuario final: administrador del producto | Beneficiario | Valida que un conflicto se informe antes de romper algo que está funcionando |
| Product Manager (AG-00) | Consultado | Verifica la alineación con la visión y con el alcance declarados |
| Analista Funcional (AG-02) | Consultado | Desarrolla los casos de uso que esta necesidad declara previstos |

## 7. Trazabilidad a CU

| NB | CU prevista | Estado |
| --- | --- | --- |
| NB-05 | CU-18 arranque y parada, con autoarranque (capa de presentación) | a generar |
| NB-05 | CU-19 rango gestionado y reserva de dirección por servicio (capa de presentación) | a generar |
| NB-05 | CU-20 validación de conflicto contra los servicios activos, sin acceso al motor de contenedores (capa de dominio) | a generar |
| NB-05 | CU-21 informe de conflicto y aplicación de la resolución elegida (capa de presentación) | a generar |

## 8. Dependencias con otras NB

- Depende de: NB-01, porque el orden de arranque se lee del grafo declarado; y NB-04, porque las direcciones y las dependencias que se validan se declaran en el alta del servicio.
- Es prerequisito de: NB-02 y NB-06.

## 9. Prioridad MoSCoW

Must Have. Las dos capacidades que agrupa son del Alcance 1 y sostienen uno de los cinco diferenciadores declarados del producto: el conflicto de direcciones tratado como regla de negocio y no como accidente.

## 10. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 2.0 | 2026-07-30 | Migración normativa del conjunto 4.1 al 6.0, fase M4 corte 2, bajo `Rules-Necesidades-Negocio` 3.1 y `Vocabulario-Rules` 2.1. Clasificación **regenerar contenido** por el salto major de la regla que lo gobierna; fuente de contenido: el documento de origen, archivado en `_legacy/2026-07-30/`. Sube **major** porque la nomenclatura anterior deja de cumplir. Cabecera: la etiqueta `Proyecto` pasa a `Producto` sobre el mismo valor, según `Vocabulario-Rules` §3 y §4 R3; la trazabilidad upstream apunta al `PRODUCT-INTAKE-SelfHosted-Service` renombrado y al artefacto hermano `Alcance-Producto.md`, antes `Alcance-Proyecto.md`. Sustitución léxica **por ocurrencia** según `Vocabulario-Rules` §9.5 y el plan de migración §3.5: una ocurrencia de «solución» designaba el nivel superior y pasa a «producto» con su concordancia —«administrador de la solución» a «administrador del producto» en §6—. **Este documento es el que concentra la trampa de la cadena `soluci`**: sus seis ocurrencias de «resolución» y «resoluciones» —§3, el tercer criterio de §5 con su métrica y su target, el párrafo de cierre de §5 y CU-21 en §7— **no son la palabra «solución» y quedaron intactas**, verificado por barrido negativo; sustituirlas habría producido las treinta ocurrencias de una palabra inexistente que la `[5.1]` del framework documenta sobre sí mismo. Las cinco ocurrencias de «proyecto» se clasificaron por referente y **ninguna pasó a «proyecto de código»**: una es «proyecto SelfHosted», la entidad del dominio, y dos son el emprendimiento —«el agente humano del proyecto» en §5 y en §6—, y las dos clases quedan intactas según el intake §12; las restantes eran la etiqueta de cabecera y el nombre del artefacto hermano. Ninguna necesidad, criterio de éxito, dependencia, prioridad ni CU prevista cambió: la migración es léxica y de forma de cabecera |
| 1.0 | 2026-07-29 | Corrección absorbida dentro de la versión 1.0, sin subirla y sin archivar el estado anterior, por la política de versionado de `Master-Prompt.md` §5. Se completa el campo `Trazabilidad upstream` de la cabecera con `Roadmap-Producto.md` §3, que el §5 cita como origen de la secuencia de etapas a la que anclan sus plazos. Origen: hallazgo H-02 del informe [Audit/A-00-01-r1.md](../../Audit/A-00-01-r1.md), aplicado a la propiedad que el hallazgo describe y no sólo a los tres archivos que nombra |
| 1.0 | 2026-07-29 | Versión inicial, generada bajo el conjunto normativo 4.0 del Framework SDD a partir del consolidado de la Fase A previa transcripto en el intake §23, y de los documentos de 00-Contexto. Conserva el identificador NB-05, sus cinco criterios de éxito y la decisión de recorte que ubica F-06 acá y no en NB-01 |
