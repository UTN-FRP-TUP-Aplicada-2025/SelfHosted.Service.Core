# CU-14 — Consulta del registro del contenedor

**Proyecto:** SelfHosted Service
**Documento:** CU-14-Consulta-Del-Registro-Del-Contenedor.md
**Versión:** 1.0
**Estado:** Propuesto
**Fecha:** 2026-07-29
**Autor:** Analista Funcional Senior (AG-02)

**Necesidad de negocio upstream:** [NB-04](../../01-Necesidades-Negocio/Necesidades-De-Negocio/NB-04-Alta-De-Servicio-Sin-Copiar-Y-Adaptar.md)
**Trazabilidad upstream:** SOLUTION-INTAKE §4 capacidad F-05; anexo E-15, endpoint de registro del contenedor con su opción de flujo continuo; §17.P.3, integración con el motor en flujo continuo; anexo E-18, ruta de la vista de registro; E-16 RN-15

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

Permitir que el administrador consulte el registro que emite el contenedor de un servicio, con opción de seguirlo en flujo continuo, para diagnosticar sin salir del panel ni abrir una sesión contra el servidor.

## 2. Actores

| Actor | Tipo | Rol |
| --- | --- | --- |
| Administrador de la solución | Primario | Consulta el registro del contenedor |
| Módulo de observación | Sistema | Obtiene el registro del motor de contenedores y lo entrega, con opción de flujo continuo |
| Motor de contenedores | Sistema | Es la fuente del registro |

Los nombres de los actores no humanos son **denominaciones acuñadas por esta categoría**, salvo los seis que trazan a una fuente: `Motor de contenedores`, `Destino externo`, `Automatismo de integración continua`, `Sincronizador de estado`, `Módulo de descubrimiento` y `Resolutor de referencias`. Los acuñados no son componentes declarados y no condicionan la descomposición: su correspondencia con los módulos que el intake §17.P.2 sí declara la fija 05-Arquitectura-Tecnica. La convención completa, nombre por nombre, está en [Especificacion-Funcional.md](../Especificacion-Funcional.md) §8.

## 3. Precondiciones

- El servicio tiene al menos un despliegue con contenedor asociado (CU-13 o CU-15).
- El administrador tiene sesión iniciada (CU-30).

## 4. Flujo principal

1. El administrador abre la vista de registro de un servicio.
2. El sistema identifica el contenedor asociado al despliegue vigente de la réplica elegida.
3. El sistema solicita el registro del contenedor al motor de contenedores.
4. El sistema entrega el registro del contenedor al administrador.
5. Si el administrador pide seguimiento, el sistema mantiene el flujo continuo mientras la vista permanece abierta.
6. Al cerrar la vista, el sistema termina el flujo: el intake declara que no debe haber recolección con las vistas cerradas.

## 5. Flujos alternativos

**FA-01 — Servicio con más de una réplica.**
Disparador: el servicio declara más de una réplica.
Pasos: el administrador elige de qué réplica quiere el registro; cada réplica tiene su propio contenedor y su propio registro.
Punto de retorno: paso 2.

**FA-02 — Servicio sin contenedor vigente.**
Disparador: el servicio no tiene despliegue con contenedor asociado, o su contenedor desapareció del motor.
Pasos: el sistema informa que no hay registro disponible y remite al estado del despliegue, que puede ser huérfano (CU-28).
Punto de retorno: paso 4.

## 6. Excepciones y errores

| Código | Causa | Respuesta del sistema |
| --- | --- | --- |
| Contenedor inexistente | El contenedor asociado al despliegue no existe en el motor | El sistema informa que no hay registro disponible; el despliegue se resuelve como huérfano o fallido en la reconciliación (CU-28) |
| Motor inalcanzable | El punto de acceso del motor no responde | El error se traduce a una causa propia identificable, sin propagar el tipo del cliente del motor |
| Flujo interrumpido | El flujo continuo se corta mientras la vista está abierta | El intake no declara el comportamiento esperado ante el corte del flujo de registro. Se declara brecha en §10 |

## 7. Postcondiciones

**En caso de éxito:** el administrador dispone del registro del contenedor, con seguimiento continuo si lo pidió; no queda ningún flujo activo con la vista cerrada; el estado del servicio y de su despliegue no cambió por consultarlo.

**En caso de fallo:** no se entrega registro y el sistema declara la causa; el contenedor y el servicio no se modifican: la consulta es de sólo lectura.

## 8. Criterios de aceptación

| ID | Given | When | Then |
| --- | --- | --- | --- |
| CA-01 | El servicio `api` con un despliegue activo y su contenedor en ejecución | El administrador abre la vista de registro | El sistema entrega el registro del contenedor asociado a ese despliegue |
| CA-02 | La misma vista abierta con el seguimiento activado | El administrador cierra la vista | El sistema termina el flujo continuo y no queda ninguna recolección activa con la vista cerrada |
| CA-03 | Un servicio cuyo contenedor desapareció del motor | El administrador abre la vista de registro | El sistema informa que no hay registro disponible y remite al estado del despliegue |
| CA-04 | Un servicio con dos réplicas desplegadas | El administrador abre la vista de registro | El sistema permite elegir la réplica y entrega el registro del contenedor de la réplica elegida |

## 9. Trazabilidad

| Dimensión | Referencia |
| --- | --- |
| Necesidad de negocio | [NB-04](../../01-Necesidades-Negocio/Necesidades-De-Negocio/NB-04-Alta-De-Servicio-Sin-Copiar-Y-Adaptar.md) |
| Reglas de negocio aplicables | Ninguna regla del catálogo E-16 restringe este caso de uso de forma directa. RN-15 lo alcanza en la medida en que el sistema no debe devolver secretos en claro; ver la brecha declarada en §10 |
| Historias de usuario a generar en 06 | US-CU-14-1 (consultar el registro del contenedor de un servicio), US-CU-14-2 (seguir el registro en flujo continuo), US-CU-14-3 (elegir la réplica cuyo registro se consulta) |
| Componentes esperados en 05 | Capa `Web`, vista de registro y controlador del recurso; capa `Application`, módulo de observabilidad; capa `Infrastructure`, `Contenedores`, con el registro en flujo continuo. Referencia tentativa |
| Tests previstos en 08 | Casos a derivar por 08-Calidad-Y-Pruebas. El anexo E-22 no declara casos propios de la consulta del registro |

Los identificadores de historia de usuario llevan la forma `US-CU-XX-n` y son **provisionales**: la numeración definitiva es potestad de 06-Backlog-Tecnico. La forma se eligió para que ningún identificador emitido acá colisione con la numeración que 06 asigne.

## 10. Notas y supuestos

- **Brecha declarada:** el intake no declara si el registro que emite el contenedor debe filtrarse respecto de valores secretos. RN-15 alcanza a las respuestas de la API y a las exportaciones, y el registro del contenedor lo produce el proceso de adentro y no la solución. Destinatario: agente humano del proyecto.
- **Brecha declarada:** el intake no declara el comportamiento esperado ante el corte del flujo continuo de registro. Destinatario: 05-Arquitectura-Tecnica.
- El intake declara que no debe haber recolección de estadísticas con las vistas cerradas; el mismo criterio se aplica al flujo de registro.
- La presentación de la vista pertenece a 03-UX-UI-DX.

## 11. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 1.0 | 2026-07-29 | Corrección absorbida dentro de la versión 1.0, sin subirla y sin archivar, por la política de versionado de `Master-Prompt.md` §5: el documento está en estado `Propuesto`. Se califica la forma «el registro» a secas, que tenía tres referentes distintos en la categoría y no era resoluble leyendo esta sección por separado, que es como se generan los artefactos de las categorías siguientes. La entrada de glosario con los cuatro referentes vive en `Modelo-Datos/Modelo-Conceptual.md` §6. Las formas ya calificadas no se tocaron: no colisionan. |
| 1.0 | 2026-07-29 | Corrección absorbida dentro de la versión 1.0, sin subirla y sin archivar, por la política de versionado de `Master-Prompt.md` §5: el documento está en estado `Propuesto` y la corrección proviene del audit de su propia fase de emisión. §2 suma la declaración de que los nombres de los actores no humanos son denominaciones acuñadas por esta categoría y no componentes declarados, con la salvedad de los seis que sí trazan a una fuente. Ningún actor cambia de nombre y ningún flujo se altera: lo que se corrige es que la categoría afirmaba que todo dato trazaba y trece de los diecinueve nombres de actor no humano no lo cumplían. Origen: hallazgo H-04 del informe [Audit/B-02-03-r1.md](../../Audit/B-02-03-r1.md) |
| 1.0 | 2026-07-29 | Versión inicial, derivada de la necesidad de negocio upstream y de las secciones del intake citadas en la cabecera |

