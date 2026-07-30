# CU-20 — Validación de conflicto contra los servicios activos, sin acceso al motor

**Proyecto:** SelfHosted Service
**Documento:** CU-20-Validacion-De-Conflicto-De-Direcciones.md
**Versión:** 1.0
**Estado:** Propuesto
**Fecha:** 2026-07-29
**Autor:** Analista Funcional Senior (AG-02)

**Necesidad de negocio upstream:** [NB-05](../../01-Necesidades-Negocio/Necesidades-De-Negocio/NB-05-Arranque-Previsible-Y-Conflictos-Anticipados.md)
**Trazabilidad upstream:** SOLUTION-INTAKE §4 capacidad F-08; §6 flujo 3; anexo E-8 (el algoritmo de validación y sus tres clases de conflicto); §17.P.10, umbrales de la validación en las capas de aplicación y de dominio; §7 CL-01; E-16 RN-03, RN-06, RN-20

---

## Tabla de contenido

- [1. Propósito](#1-propósito)
- [2. Actores](#2-actores)
- [3. Precondiciones](#3-precondiciones)
- [4. Flujo principal](#4-flujo-principal)
- [5. Flujos alternativos](#5-flujos-alternativos)
- [6. Excepciones y errores](#6-excepciones-y-errores)
- [7. Postcondiciones](#7-postcondiciones)
- [8. Criterios de aceptación](#8-criterios-de-aceptación)
- [9. Trazabilidad](#9-trazabilidad)
- [10. Notas y supuestos](#10-notas-y-supuestos)
- [11. Control de cambios](#11-control-de-cambios)

---

## 1. Propósito

Determinar, antes de tocar el motor de contenedores, si un proyecto SelfHosted puede arrancar sin conflicto de direcciones, comparando sus reservas contra las direcciones ocupadas por servicios activos, para bloquear con información en lugar de fallar en el motor.

## 2. Actores

| Actor | Tipo | Rol |
| --- | --- | --- |
| Módulo de validación de red | Primario | Ejecuta el algoritmo de validación y produce el veredicto con sus conflictos |
| Registro de la solución | Sistema | Aporta las reservas y los despliegues activos sobre los que se compara |
| Administrador de la solución | Secundario | Recibe el veredicto a través del informe de conflicto (CU-21) |

Los nombres de los actores no humanos son **denominaciones acuñadas por esta categoría**, salvo los seis que trazan a una fuente: `Motor de contenedores`, `Destino externo`, `Automatismo de integración continua`, `Sincronizador de estado`, `Módulo de descubrimiento` y `Resolutor de referencias`. Los acuñados no son componentes declarados y no condicionan la descomposición: su correspondencia con los módulos que el intake §17.P.2 sí declara la fija 05-Arquitectura-Tecnica. La convención completa, nombre por nombre, está en [Especificacion-Funcional.md](../Especificacion-Funcional.md) §8.

## 3. Precondiciones

- El proyecto SelfHosted tiene servicios con dirección fija declarada (CU-03, CU-19).
- Existe el registro de reservas y de despliegues activos.

## 4. Flujo principal

1. El módulo recibe la solicitud de validación del arranque de un proyecto SelfHosted.
2. Toma los servicios del proyecto que declaran dirección fija.
3. Para cada uno, busca un servicio activo que ocupe la misma dirección. Si existe y pertenece a otro proyecto SelfHosted, registra el conflicto con su ocupante (RN-03).
4. Detecta las colisiones dentro del propio proyecto: dos servicios del mismo proyecto con la misma dirección son conflicto siempre, con la clase de duplicado interno.
5. Verifica que cada dirección pertenezca al rango gestionado y no esté excluida, registrando la clase de fuera de rango cuando no lo cumple (RN-06).
6. Si no hay ningún conflicto, devuelve el veredicto de arranque permitido.
7. Si hay conflictos, devuelve el veredicto de bloqueado con la lista de conflictos, cada uno con su ocupante identificado por servicio y por proyecto SelfHosted, y con las resoluciones posibles.
8. La validación se resuelve sin consultar al motor de contenedores.

## 5. Flujos alternativos

**FA-01 — Ocupante detenido.**
Disparador: la dirección solicitada está declarada por un servicio de otro proyecto SelfHosted que no está activo.
Pasos: no hay conflicto: la regla compara contra servicios activos y no contra servicios configurados. El arranque procede.
Punto de retorno: paso 6.

**FA-02 — Validación de un servicio suelto.**
Disparador: se valida el arranque de un servicio en lugar del proyecto SelfHosted completo.
Pasos: el algoritmo se ejecuta acotado a ese servicio y a su dirección.
Punto de retorno: paso 6.

**FA-03 — Proyecto SelfHosted sin direcciones fijas.**
Disparador: ningún servicio del proyecto declara dirección fija.
Pasos: el veredicto es de arranque permitido, sin recorrer conflictos.
Punto de retorno: paso 6.

## 6. Excepciones y errores

| Código | Causa | Respuesta del sistema |
| --- | --- | --- |
| Conflicto entre proyectos | La dirección está ocupada por un servicio activo de otro proyecto SelfHosted | Veredicto bloqueado, con el ocupante identificado por servicio y por proyecto y con las tres resoluciones posibles (RN-03) |
| Duplicado interno | Dos servicios del mismo proyecto SelfHosted declaran la misma dirección | Veredicto bloqueado siempre, con la clase de duplicado interno |
| Fuera de rango | Una dirección no pertenece al rango gestionado o está excluida | Veredicto bloqueado con la clase de fuera de rango (RN-06) |

## 7. Postcondiciones

**En caso de éxito:** existe un veredicto de arranque permitido o bloqueado; si es bloqueado, cada conflicto identifica su dirección, su servicio solicitante, su ocupante y sus resoluciones posibles; el motor de contenedores no fue consultado.

**En caso de fallo:** no se ejecuta ningún arranque sobre un veredicto incompleto; el registro del sistema no se modifica, porque la validación es de sólo lectura hasta el registro de la reserva activa.

## 8. Criterios de aceptación

| ID | Given | When | Then |
| --- | --- | --- | --- |
| CA-01 | El servicio 412 del proyecto SelfHosted 9 solicita `192.168.1.139`, ocupada por el servicio 305 del proyecto 7, que está activo | Se valida el arranque del proyecto 9 | El veredicto es bloqueado, con el ocupante identificado por servicio y por proyecto y con las tres resoluciones posibles |
| CA-02 | El mismo caso, con el servicio 305 detenido | Se valida el arranque del proyecto 9 | El veredicto es permitido: la regla compara contra servicios activos y no contra servicios configurados |
| CA-03 | Dos servicios del proyecto SelfHosted 9 que declaran `192.168.1.139` | Se valida el arranque | El veredicto es bloqueado siempre, con la clase de duplicado interno |
| CA-04 | Un proyecto SelfHosted de hasta 30 servicios con direcciones fijas | Se valida el arranque | La validación se resuelve sin consultar al motor de contenedores y dentro del umbral que el intake declara en §17.P.10 |

## 9. Trazabilidad

| Dimensión | Referencia |
| --- | --- |
| Necesidad de negocio | [NB-05](../../01-Necesidades-Negocio/Necesidades-De-Negocio/NB-05-Arranque-Previsible-Y-Conflictos-Anticipados.md) |
| Reglas de negocio aplicables | RN-03, RN-06, RN-20. Reglas conceptuales: RC-12 |
| Historias de usuario a generar en 06 | US-CU-20-1 (validar el arranque contra los servicios activos), US-CU-20-2 (detectar la colisión dentro del propio proyecto SelfHosted), US-CU-20-3 (detectar la dirección fuera del rango gestionado) |
| Componentes esperados en 05 | Capa `Domain`, agregado `Red`, donde vive el algoritmo sin dependencias externas; capa `Application`, módulo de red y conflictos; capa `Infrastructure`, `Persistencia`, con la consulta indexada sobre reservas y despliegues activos. Referencia tentativa. La NB-05 asigna este caso de uso a la capa de dominio |
| Tests previstos en 08 | T-05, T-06 (activo frente a detenido); T-07 (duplicado interno); T-08, T-09 (fuera de rango y excluida); T-24 (arranque parcial derivado del veredicto) |

Los identificadores de historia de usuario llevan la forma `US-CU-XX-n` y son **provisionales**: la numeración definitiva es potestad de 06-Backlog-Tecnico. La forma se eligió para que ningún identificador emitido acá colisione con la numeración que 06 asigne.

## 10. Notas y supuestos

- El intake declara umbrales para esta validación en §17.P.10, tanto para la capa de aplicación como para la de dominio, y declara además que se resuelve sin acceso al motor de contenedores ni a la base en el nivel de dominio. Los umbrales son requisitos no funcionales y su verificación pertenece a 08-Calidad-Y-Pruebas.
- El informe que se le muestra al administrador y la aplicación de la resolución elegida pertenecen a CU-21.
- Configurar la misma dirección está permitido; arrancar en conflicto con un servicio activo de otro proyecto SelfHosted no. Es la respuesta declarada al caso límite CL-01, confirmada sin cambios por la decisión D-4.

## 11. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 1.0 | 2026-07-29 | Corrección absorbida dentro de la versión 1.0, sin subirla y sin archivar, por la política de versionado de `Master-Prompt.md` §5: el documento está en estado `Propuesto`. Se califica la forma «el registro» a secas, que tenía tres referentes distintos en la categoría y no era resoluble leyendo esta sección por separado, que es como se generan los artefactos de las categorías siguientes. La entrada de glosario con los cuatro referentes vive en `Modelo-Datos/Modelo-Conceptual.md` §6. Las formas ya calificadas no se tocaron: no colisionan. |
| 1.0 | 2026-07-29 | Corrección absorbida dentro de la versión 1.0, sin subirla y sin archivar, por la política de versionado de `Master-Prompt.md` §5: el documento está en estado `Propuesto` y la corrección proviene del audit de su propia fase de emisión. §2 suma la declaración de que los nombres de los actores no humanos son denominaciones acuñadas por esta categoría y no componentes declarados, con la salvedad de los seis que sí trazan a una fuente. Ningún actor cambia de nombre y ningún flujo se altera: lo que se corrige es que la categoría afirmaba que todo dato trazaba y trece de los diecinueve nombres de actor no humano no lo cumplían. Origen: hallazgo H-04 del informe [Audit/B-02-03-r1.md](../../Audit/B-02-03-r1.md) |
| 1.0 | 2026-07-29 | Versión inicial, derivada de la necesidad de negocio upstream y de las secciones del intake citadas en la cabecera |

## 13. Interacción multiusuario y concurrencia

Sección opcional admitida por §4.3 de `Rules-Especificacion-Funcional.md` para el tipo `web-monolith`. Conserva el número que esa sección le asigna, de modo que la numeración salta del 11 al 13 por construcción de la regla y no por omisión.

El intake declara que entre validar y registrar la reserva activa no puede colarse otro arranque: la validación y el registro van en la misma transacción de escritura. Es la garantía que impide que dos arranques simultáneos pasen los dos la validación.

