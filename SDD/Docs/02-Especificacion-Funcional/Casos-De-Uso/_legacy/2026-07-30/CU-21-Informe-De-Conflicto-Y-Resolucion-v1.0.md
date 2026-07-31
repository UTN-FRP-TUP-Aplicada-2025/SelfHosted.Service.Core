# CU-21 — Informe de conflicto y aplicación de la resolución elegida

**Proyecto:** SelfHosted Service
**Documento:** CU-21-Informe-De-Conflicto-Y-Resolucion.md
**Versión:** 1.0
**Estado:** Propuesto
**Fecha:** 2026-07-29
**Autor:** Analista Funcional Senior (AG-02)

**Necesidad de negocio upstream:** [NB-05](../../01-Necesidades-Negocio/Necesidades-De-Negocio/NB-05-Arranque-Previsible-Y-Conflictos-Anticipados.md)
**Trazabilidad upstream:** SOLUTION-INTAKE §6 flujo 3; §7 CL-01 y su confirmación (decisión D-4); anexo E-8 (el informe de conflicto y sus tres resoluciones, y la respuesta de error); §17.P.3, formato de error; E-16 RN-03, RN-06, RN-13, RN-20

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

Permitir que el administrador reciba, ante un arranque bloqueado por conflicto de dirección, un informe que identifique al ocupante y ofrezca las tres resoluciones declaradas, y que aplique la que elija, para enterarse antes de romper algo que está funcionando.

## 2. Actores

| Actor | Tipo | Rol |
| --- | --- | --- |
| Administrador de la solución | Primario | Lee el informe de conflicto y elige la resolución |
| Módulo de red | Sistema | Emite el informe con sus resoluciones y aplica la elegida |

Los nombres de los actores no humanos son **denominaciones acuñadas por esta categoría**, salvo los seis que trazan a una fuente: `Motor de contenedores`, `Destino externo`, `Automatismo de integración continua`, `Sincronizador de estado`, `Módulo de descubrimiento` y `Resolutor de referencias`. Los acuñados no son componentes declarados y no condicionan la descomposición: su correspondencia con los módulos que el intake §17.P.2 sí declara la fija 05-Arquitectura-Tecnica. La convención completa, nombre por nombre, está en [Especificacion-Funcional.md](../Especificacion-Funcional.md) §8.

## 3. Precondiciones

- La validación del arranque devolvió un veredicto bloqueado (CU-20).
- El administrador tiene sesión iniciada (CU-30).

## 4. Flujo principal

1. El sistema devuelve el arranque bloqueado con el informe de conflicto en el formato de detalle de problema declarado.
2. El informe identifica cada conflicto con su dirección, el servicio solicitante y el ocupante, con su servicio y su proyecto SelfHosted.
3. El informe ofrece las tres resoluciones declaradas: detener el proyecto SelfHosted en conflicto, reasignar la dirección a la siguiente libre del rango, o arrancar parcialmente el resto de los servicios.
4. El administrador elige una resolución.
5. Si elige reasignar, el sistema actualiza la reserva a la dirección sugerida y marca como pendientes de redespliegue los servicios cuyas variables cambian de valor por ese motivo (RN-13).
6. Si elige detener el proyecto SelfHosted en conflicto, el sistema lo detiene y libera las direcciones que ocupaba.
7. Si elige arrancar parcialmente, el sistema arranca los servicios sin conflicto y el proyecto queda parcialmente activo (RN-20).
8. El sistema vuelve a validar y, si el veredicto es permitido, arranca.
9. El sistema registra el evento de auditoría (RN-17).

## 5. Flujos alternativos

**FA-01 — Conflicto por duplicado interno.**
Disparador: los dos servicios en conflicto pertenecen al mismo proyecto SelfHosted.
Pasos: la resolución de detener el proyecto en conflicto no aplica; queda reasignar o arrancar parcialmente.
Punto de retorno: paso 4.

**FA-02 — Conflicto por dirección fuera de rango.**
Disparador: la dirección no pertenece al rango gestionado o está excluida.
Pasos: la resolución es reasignar a la siguiente libre del rango (RN-06).
Punto de retorno: paso 5.

**FA-03 — Administrador que no elige ninguna resolución.**
Disparador: el administrador abandona el informe.
Pasos: el proyecto SelfHosted no arranca y nada se modifica.
Punto de retorno: el lienzo del proyecto.

## 6. Excepciones y errores

| Código | Causa | Respuesta del sistema |
| --- | --- | --- |
| `409` de conflicto de dirección | Una dirección solicitada está ocupada por un servicio activo de otro proyecto SelfHosted | El arranque se bloquea y se devuelve el informe con sus resoluciones, en el formato de detalle de problema con miembros de extensión propios (RN-03) |
| `422` de dirección sugerida inválida | La dirección sugerida en la reasignación deja de estar libre entre la emisión del informe y su aplicación | Rechazo con la siguiente libre recalculada (RN-06) |
| Resolución no aplicable | El administrador elige una resolución que no corresponde a la clase de conflicto | El sistema no la ofrece: cada conflicto declara sus resoluciones posibles |

## 7. Postcondiciones

**En caso de éxito:** el conflicto quedó resuelto por la vía que el administrador eligió; si reasignó, la reserva está actualizada y los servicios afectados quedaron marcados para redespliegue; si arrancó parcialmente, el proyecto SelfHosted quedó parcialmente activo con estado explícito.

**En caso de fallo:** el proyecto SelfHosted no arranca, ninguna reserva se modifica y el informe sigue disponible con su ocupante identificado.

## 8. Criterios de aceptación

| ID | Given | When | Then |
| --- | --- | --- | --- |
| CA-01 | El servicio `print-server-pruebas` del proyecto SelfHosted 9 solicitando `192.168.1.139`, ocupada por `print-server` del proyecto 7, activo | El administrador intenta arrancar el proyecto 9 | El sistema devuelve `409` con el informe que identifica al ocupante por servicio y por proyecto, y ofrece las tres resoluciones |
| CA-02 | El mismo informe | El administrador elige reasignar la dirección a la siguiente libre | El sistema actualiza la reserva, marca como pendientes de redespliegue los servicios cuya variable cambia de valor, y arranca |
| CA-03 | El mismo informe, sobre un proyecto SelfHosted de tres servicios con uno solo en conflicto | El administrador elige arrancar los demás servicios | Arrancan los dos sin conflicto y el proyecto queda parcialmente activo, con estado explícito |
| CA-04 | El mismo informe | El administrador elige detener el proyecto SelfHosted en conflicto | El sistema detiene ese proyecto, libera la dirección y el arranque del proyecto 9 procede |

## 9. Trazabilidad

| Dimensión | Referencia |
| --- | --- |
| Necesidad de negocio | [NB-05](../../01-Necesidades-Negocio/Necesidades-De-Negocio/NB-05-Arranque-Previsible-Y-Conflictos-Anticipados.md) |
| Reglas de negocio aplicables | RN-03, RN-06, RN-13, RN-17, RN-20. Reglas conceptuales: RC-12 |
| Historias de usuario a generar en 06 | US-CU-21-1 (recibir el informe de conflicto con el ocupante identificado), US-CU-21-2 (reasignar la dirección a la siguiente libre), US-CU-21-3 (arrancar parcialmente el resto de los servicios), US-CU-21-4 (detener el proyecto SelfHosted en conflicto) |
| Componentes esperados en 05 | Capa `Web`, controlador de arranque y presentación del informe; capa `Application`, módulo de red y conflictos; capa `Domain`, agregado `Red`; capa `Infrastructure`, `Persistencia`. Referencia tentativa |
| Tests previstos en 08 | T-05 (informe con las tres resoluciones); T-24 (arranque parcial); T-08 (siguiente dirección libre sugerida) |

Los identificadores de historia de usuario llevan la forma `US-CU-XX-n` y son **provisionales**: la numeración definitiva es potestad de 06-Backlog-Tecnico. La forma se eligió para que ningún identificador emitido acá colisione con la numeración que 06 asigne.

## 10. Notas y supuestos

- Las tres resoluciones son dato declarado del anexo E-8 y confirmadas sin cambios por la decisión D-4. Esta categoría no agrega ni quita ninguna.
- El informe identifica al ocupante por servicio y por proyecto SelfHosted, que es lo que evita la investigación posterior.
- La reasignación marca como pendientes de redespliegue los enlaces entrantes al servicio, porque su variable cambia de valor. Es el flujo 3 del intake §6.
- La presentación del informe pertenece a 03-UX-UI-DX.

## 11. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 1.0 | 2026-07-29 | Corrección absorbida dentro de la versión 1.0, sin subirla y sin archivar, por la política de versionado de `Master-Prompt.md` §5: el documento está en estado `Propuesto` y la corrección proviene del audit de su propia fase de emisión. §2 suma la declaración de que los nombres de los actores no humanos son denominaciones acuñadas por esta categoría y no componentes declarados, con la salvedad de los seis que sí trazan a una fuente. Ningún actor cambia de nombre y ningún flujo se altera: lo que se corrige es que la categoría afirmaba que todo dato trazaba y trece de los diecinueve nombres de actor no humano no lo cumplían. Origen: hallazgo H-04 del informe [Audit/B-02-03-r1.md](../../Audit/B-02-03-r1.md) |
| 1.0 | 2026-07-29 | Versión inicial, derivada de la necesidad de negocio upstream y de las secciones del intake citadas en la cabecera |

## 13. Interacción multiusuario y concurrencia

Sección opcional admitida por §4.3 de `Rules-Especificacion-Funcional.md` para el tipo `web-monolith`. Conserva el número que esa sección le asigna, de modo que la numeración salta del 11 al 13 por construcción de la regla y no por omisión.

El informe se emite y se aplica dentro de la serialización de despliegues por proyecto SelfHosted que el intake declara. La reasignación de una dirección y el registro de la reserva activa comparten la garantía transaccional declarada en §17.P.10.

