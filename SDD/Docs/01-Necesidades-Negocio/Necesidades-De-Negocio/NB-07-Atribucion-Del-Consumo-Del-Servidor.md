# NB-07 — Atribución del consumo del servidor a un servicio concreto

| Campo | Valor |
| --- | --- |
| Proyecto | SelfHosted Service |
| Documento | NB-07-Atribucion-Del-Consumo-Del-Servidor.md |
| Versión | 1.0 |
| Estado | Propuesto |
| Fecha | 2026-07-29 |
| Autor | Analista de Negocio Senior (AG-01) |
| Trazabilidad upstream | SOLUTION-INTAKE-SelfHosted-Service §4 (F-12), §5 (historia 8), §7 (CL-02, CL-03), §9 (exclusión 6), §10, §11 (RG-04, RG-08), §17.P.10, §23.1, §23.3, §23.4, §23.5; Vision-Producto.md §7.1 (RE-06), §8.1 (RG-04, RG-08); Alcance-Proyecto.md §4.1, §5.1; Roadmap-Producto.md §2.2 (Fase 2), §2.3 (EP-12) |
| Trazabilidad downstream | CU-26, CU-27, CU-28 (previstas en 02-Especificacion-Funcional) |

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

El servidor de referencia es modesto y está trabajando cerca de su límite: la mitad de su memoria está en uso y hay presión de intercambio apreciable. Cuando esa presión aparece, el propietario necesita saber qué servicio la está causando, y hoy no tiene dónde mirarlo: el estado del equipo, el del conjunto de servicios y el de cada contenedor viven en lugares distintos, y la correspondencia entre un contenedor que consume recursos y el conjunto al que pertenece se hace de memoria.

La necesidad es que esas tres lecturas convivan en una misma vista, con la atribución resuelta: el pico de memoria del equipo se explica por un contenedor concreto, y ese contenedor pertenece a un servicio concreto de un conjunto concreto. La observación tiene además una restricción propia que forma parte de la necesidad: se hace sobre un servidor que ya está al límite, de modo que mirar no puede costar caro, y el propio administrador tiene que ser liviano.

La necesidad incluye la reconciliación con el motor de contenedores. Como hay operaciones que pueden ocurrir por fuera de la aplicación, un contenedor detenido o eliminado por afuera seguiría figurando como activo si nadie contrasta. Un estado que miente es peor que no tener estado: por eso la vista debe reconciliarse con el motor y señalar explícitamente el servicio cuyo contenedor ya no existe.

## 2. Ejemplo de uso desde la perspectiva del negocio

El propietario nota que el servidor está lento y que el intercambio de memoria está activo. Abre una consola, lista los contenedores, mira el consumo de cada uno, encuentra dos que consumen más de lo esperado, y entonces tiene que recordar a qué conjunto pertenece cada uno y si esos valores son normales para ellos. La respuesta le lleva media hora y depende enteramente de lo que recuerde.

Lo que necesita es una pantalla que le muestre el estado del equipo arriba, el de cada conjunto en el medio y el de cada contenedor abajo, con el pico de memoria ya atribuido al servicio que lo causa, y que le indique cuáles de sus servicios tienen el contenedor caído o eliminado por afuera.

## 3. Impacto

- La presión de recursos del servidor deja de ser un fenómeno anónimo y pasa a atribuirse a un servicio concreto, que es donde se puede tomar una decisión.
- Las tres capas de lectura —equipo, conjunto y contenedor— quedan en una vista única, y la correspondencia deja de hacerse de memoria.
- La deriva entre el estado registrado y el motor de contenedores se detecta y se señala en lugar de acumularse en silencio.
- La observación tiene un costo declarado y acotado: se recolecta sólo con vistas abiertas, de modo que mirar no degrada un servidor que ya está al límite.
- Si la necesidad queda sin resolver, el propietario sigue diagnosticando por consola y de memoria, y el producto no aporta nada sobre el estado del parque.

## 4. Problema específico que resuelve

- No hay un lugar donde el estado del equipo, el de cada conjunto y el de cada contenedor se lean con la misma vista.
- La correspondencia entre un contenedor que consume recursos y el conjunto al que pertenece se hace de memoria.
- Los servicios con dirección propia en la red local no se pueden observar preguntándoles directamente, y no hay fuente de estado alternativa integrada.
- Un contenedor detenido o eliminado por fuera seguiría figurando como activo.
- Toda observación agrega carga a un servidor que ya está al límite, sin una política declarada de cuánto puede costar mirar.

## 5. Criterios de éxito

Ningún criterio usa fecha de calendario. Los plazos se anclan al cierre de la fase que entrega la capacidad medida, según la convención del intake §23.3 y la tabla maestra de fases de [Roadmap-Producto.md](../../00-Contexto/Roadmap-Producto.md) §2.2. Ninguno de los cinco es derivación.

| Criterio | Métrica | Target | Plazo |
| --- | --- | --- | --- |
| Atribución de la presión de memoria | Picos de consumo de memoria del servidor atribuibles a un servicio concreto desde la vista | 100 % de los picos | Cierre de la Fase 2, que entrega el tablero (EP-12) |
| Niveles de lectura disponibles | Capas presentes en la vista: servidor, proyecto SelfHosted y contenedor | 3 de 3 capas | Cierre de la Fase 2 |
| Costo de observar con las pantallas cerradas | Recolecciones de métricas ejecutadas sin ninguna vista abierta | 0 recolecciones | Continuo, desde el cierre de la Fase 2 |
| Frescura del estado mostrado | Antigüedad del estado presentado, con la vista abierta y por reconciliación con el motor de contenedores | ≤ 5 s con la vista abierta y ≤ 30 s por reconciliación | Cierre de la Fase 2 |
| Huella del propio administrador | Memoria residente del proceso de la solución en régimen | Menor a 1 GB, en el orden de cientos de MB | Continuo, desde el cierre de la Fase 0 |

Los umbrales del cuarto y del quinto criterio son requerimientos no funcionales declarados en el intake §17.P.10 y responden a la restricción RE-06: la solución corre en el mismo servidor que observa y no puede competir con él por recursos.

## 6. Stakeholders involucrados

| Rol | Nivel | Qué pide o aporta |
| --- | --- | --- |
| Agente humano del proyecto | Propietario | Revisa y aprueba la necesidad, y da el OK explícito del punto de control de la etapa que la entrega |
| Analista de Negocio Senior (AG-01) | Propietario del contenido | Mantiene la necesidad, sus criterios y su trazabilidad, y declara las brechas en lugar de resolverlas |
| Equipo de desarrollo, dos desarrolladores | Implementador | Construye el tablero en tres capas, el recolector único y la reconciliación con el motor de contenedores |
| Agente IA de codificación | Implementador | Genera la especificación y, en etapas posteriores, el código del corte vertical de observabilidad |
| Propietario del servidor de referencia | Beneficiario | Valida que la presión de memoria de su equipo quede atribuida a un servicio concreto, y fija cuánto puede costar observar |
| Product Manager (AG-00) | Consultado | Verifica la alineación con la visión y con el alcance declarados |
| Analista Funcional (AG-02) | Consultado | Desarrolla los casos de uso que esta necesidad declara previstos |

El beneficiario que valida es el propietario del servidor, porque lo que está en juego es una decisión suya sobre la capacidad de su equipo.

## 7. Trazabilidad a CU

| NB | CU prevista | Estado |
| --- | --- | --- |
| NB-07 | CU-26 lectura del estado del servidor (capa de presentación) | a generar |
| NB-07 | CU-27 vista por proyecto SelfHosted y por contenedor (capa de presentación) | a generar |
| NB-07 | CU-28 reconciliación con el motor de contenedores y señalización del servicio huérfano (capa de infraestructura) | a generar |

## 8. Dependencias con otras NB

- Depende de: NB-01, porque atribuir un consumo a un servicio exige que el servicio y su conjunto estén declarados; y NB-04, porque lo que se observa es el contenedor que el despliegue creó.
- Es prerequisito de: ninguna otra NB.

## 9. Prioridad MoSCoW

Should Have. Es una necesidad legítimamente acotada a una sola capacidad, con público y métrica propios: sin ella el producto sigue resolviendo el problema central, pero el propietario sigue diagnosticando la presión de su servidor por fuera de la solución.

## 10. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 1.0 | 2026-07-29 | Versión inicial, generada bajo el conjunto normativo 4.0 del Framework SDD a partir del consolidado de la Fase A previa transcripto en el intake §23, y de los documentos de 00-Contexto. Conserva el identificador NB-07, sus cinco criterios de éxito y la decisión de recorte que la deja con una sola capacidad en lugar de fusionarla |
