# CU-24 — Aplicación en lote del conjunto de cambios pendientes

**Proyecto:** SelfHosted Service
**Documento:** CU-24-Aplicacion-En-Lote.md
**Versión:** 1.0
**Estado:** Propuesto
**Fecha:** 2026-07-29
**Autor:** Analista Funcional Senior (AG-02)

**Necesidad de negocio upstream:** [NB-06](../../01-Necesidades-Negocio/Necesidades-De-Negocio/NB-06-Cambios-Revisados-Y-Aplicados-En-Lote.md)
**Trazabilidad upstream:** SOLUTION-INTAKE §4 capacidad F-07; §3 diferenciador 3; anexo E-5 (el conjunto y su informe); anexo E-13 (el contrato de la operación y su resultado por contenedor); anexo E-15, endpoint de aplicación; §9 exclusión 2, ventana de indisponibilidad; E-16 RN-04, RN-13, RN-21, RN-24, RN-31

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

Permitir que el administrador aplique en un solo lote los cambios pendientes de un proyecto SelfHosted, redesplegando únicamente los servicios afectados, para que una tarde de ajustes termine en un redespliegue y no en uno por cada clic.

## 2. Actores

| Actor | Tipo | Rol |
| --- | --- | --- |
| Administrador de la solución | Primario | Revisa el informe de impacto y aplica el lote |
| Módulo de despliegue | Sistema | Ejecuta el redespliegue de los servicios afectados y determina el resultado por contenedor |
| Motor de contenedores | Sistema | Reemplaza los contenedores alcanzados |

Los nombres de los actores no humanos son **denominaciones acuñadas por esta categoría**, salvo los seis que trazan a una fuente: `Motor de contenedores`, `Destino externo`, `Automatismo de integración continua`, `Sincronizador de estado`, `Módulo de descubrimiento` y `Resolutor de referencias`. Los acuñados no son componentes declarados y no condicionan la descomposición: su correspondencia con los módulos que el intake §17.P.2 sí declara la fija 05-Arquitectura-Tecnica. La convención completa, nombre por nombre, está en [Especificacion-Funcional.md](../Especificacion-Funcional.md) §8.

## 3. Precondiciones

- Existe un conjunto de cambios pendientes con al menos un cambio (CU-22).
- El informe de impacto fue calculado (CU-25).
- El administrador tiene sesión iniciada (CU-30).

## 4. Flujo principal

1. El administrador abre el informe de impacto del conjunto de cambios pendientes.
2. El sistema declara, antes de ejecutar nada, qué servicios se van a redesplegar y cuáles quedan sin impacto (RN-13).
3. El sistema advierte explícitamente la ventana de indisponibilidad que el reemplazo implica.
4. El administrador confirma la aplicación, opcionalmente con un mensaje.
5. El sistema valida el canal alcanzable de las aristas que referencian el host (RN-04).
6. El sistema redespliega únicamente los servicios que el informe declaró, resolviendo sus referencias inmediatamente antes de crear cada contenedor (RN-21, RN-24).
7. El sistema determina el resultado por contenedor y no por operación (RN-31).
8. El sistema marca el conjunto como aplicado con su momento de aplicación.
9. El sistema deriva el estado del proyecto SelfHosted de los estados por contenedor, que puede ser parcialmente activo (RN-20).
10. El sistema registra el evento de auditoría (RN-17).

## 5. Flujos alternativos

**FA-01 — Caída del circuito de la interfaz durante la aplicación.**
Disparador: se pierde la conexión del navegador con un despliegue en curso.
Pasos: el despliegue continúa del lado del servidor; al reabrir el proyecto SelfHosted el estado real de cada contenedor se verifica contra el motor. La operación se puede consultar para recuperar su resultado por contenedor (RN-31).
Punto de retorno: paso 7.

**FA-02 — Fallo de un contenedor del lote.**
Disparador: uno de los contenedores del lote no puede crearse o arrancar.
Pasos: ese despliegue queda fallido con su error; los demás conservan su resultado y los servicios sin impacto no se tocan.
Punto de retorno: paso 8.

**FA-03 — Conflicto de dirección al recrear.**
Disparador: al recrear un contenedor su dirección resulta ocupada por un servicio activo de otro proyecto SelfHosted.
Pasos: se devuelve el informe de conflicto con sus resoluciones (RN-03). Ver CU-21.
Punto de retorno: paso 6.

## 6. Excepciones y errores

| Código | Causa | Respuesta del sistema |
| --- | --- | --- |
| `422` de referencia no resoluble | Una referencia del lote no resuelve a una variable de ámbito válido | El despliegue de ese servicio se aborta con la causa identificada, sin crear el contenedor y sin afectar a los demás (RN-21, RN-24, RN-31) |
| `409` de conflicto de dirección | Una dirección resulta ocupada por un servicio activo de otro proyecto SelfHosted al recrear | Se devuelve el informe de conflicto del anexo E-8 con sus resoluciones (RN-03) |
| `403` de ámbito insuficiente | La aplicación se dispara con un token de API sin el ámbito de ejecución de despliegues | Rechazo indicando cuál ámbito falta. Ver CU-33 |
| Fallo parcial | Uno o varios contenedores del lote fallan | No es un código de error de la operación: la operación se completó e informa qué contenedor quedó de qué manera. El código de servidor queda reservado al caso en que el administrador no pudo llevarla adelante |
| Enlace inválido por canal | Una arista que referencia el host no tiene canal alcanzable | El enlace queda marcado inválido y bloquea el arranque (RN-04) |

## 7. Postcondiciones

**En caso de éxito:** los servicios que el informe declaró fueron redesplegados y ningún otro se tocó; el conjunto de cambios quedó marcado como aplicado; el estado del proyecto SelfHosted se deriva de los resultados por contenedor; existe el evento de auditoría.

**En caso de fallo:** cada contenedor alcanzado tiene su resultado registrado —desplegado o fallido con su error—; los servicios no alcanzados conservan su despliegue anterior; ningún despliegue queda en un estado intermedio.

## 8. Criterios de aceptación

| ID | Given | When | Then |
| --- | --- | --- | --- |
| CA-01 | El conjunto de cambios 331 del proyecto SelfHosted 12, cuyo informe alcanza a `api` y a `cache` y deja a `db` sin impacto | El administrador aplica el lote | Se redespliegan sólo `api` y `cache`; `db` no se toca y conserva su despliegue anterior |
| CA-02 | El mismo conjunto, con la imagen de `cache` inexistente en el registro, y el administrador cerrando el navegador después del primer despliegue | El administrador aplica el lote | El despliegue continúa del lado del servidor: `api` queda activo, `cache` queda fallido con su causa y el proyecto queda parcialmente activo |
| CA-03 | El mismo caso | El administrador consulta la operación después de reabrir | La consulta devuelve el resultado de los dos contenedores alcanzados y declara a `db` como no alcanzada |
| CA-04 | Un conjunto de cambios con una referencia que no resuelve | El administrador aplica el lote | El despliegue de ese servicio se aborta con la causa identificada, sin crear el contenedor, y los demás contenedores del lote conservan su resultado |

## 9. Trazabilidad

| Dimensión | Referencia |
| --- | --- |
| Necesidad de negocio | [NB-06](../../01-Necesidades-Negocio/Necesidades-De-Negocio/NB-06-Cambios-Revisados-Y-Aplicados-En-Lote.md) |
| Reglas de negocio aplicables | RN-03, RN-04, RN-09, RN-13, RN-17, RN-20, RN-21, RN-22, RN-24, RN-31. Reglas conceptuales: RC-18 |
| Historias de usuario a generar en 06 | US-CU-24-1 (aplicar el conjunto de cambios pendientes en lote), US-CU-24-2 (recibir el resultado por contenedor de la operación), US-CU-24-3 (recuperar el resultado tras una caída del circuito de la interfaz), US-CU-24-4 (recibir la advertencia de la ventana de indisponibilidad) |
| Componentes esperados en 05 | Capa `Web`, controlador de aplicación del conjunto y cajón de cambios pendientes; capa `Application`, módulo de servicios y despliegues; capa `Domain`, agregados `Proyectos` y `Despliegues`; capa `Infrastructure`, `Contenedores`. Referencia tentativa |
| Tests previstos en 08 | T-23 (redespliegue acotado); T-31 (resultado por contenedor con caída del circuito); T-38 (resolución previa); T-28, T-29 (correspondencia de estados) |

Los identificadores de historia de usuario llevan la forma `US-CU-XX-n` y son **provisionales**: la numeración definitiva es potestad de 06-Backlog-Tecnico. La forma se eligió para que ningún identificador emitido acá colisione con la numeración que 06 asigne.

## 10. Notas y supuestos

- La caída del circuito de la interfaz no es un evento de la máquina de estados del despliegue: el despliegue vive del lado del servidor y el circuito sólo lo observa.
- Un fallo parcial no es un código de error de la operación. Es la especificación derivada DI-10, sin revisar, y se consume declarándola revisable.
- La ventana de indisponibilidad es consecuencia aceptada de que el producto no administre proxies inversos, y el intake exige que la interfaz la advierta explícitamente.
- El intake advierte que la confusión más probable es creer que guardar un cambio despliega. Las etiquetas de los botones son materia de 03-UX-UI-DX.

## 11. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 1.0 | 2026-07-29 | Corrección absorbida dentro de la versión 1.0, sin subirla y sin archivar, por la política de versionado de `Master-Prompt.md` §5: el documento está en estado `Propuesto` y la corrección proviene del audit de su propia fase de emisión. §2 suma la declaración de que los nombres de los actores no humanos son denominaciones acuñadas por esta categoría y no componentes declarados, con la salvedad de los seis que sí trazan a una fuente. Ningún actor cambia de nombre y ningún flujo se altera: lo que se corrige es que la categoría afirmaba que todo dato trazaba y trece de los diecinueve nombres de actor no humano no lo cumplían. Origen: hallazgo H-04 del informe [Audit/B-02-03-r1.md](../../Audit/B-02-03-r1.md) |
| 1.0 | 2026-07-29 | Versión inicial, derivada de la necesidad de negocio upstream y de las secciones del intake citadas en la cabecera |

## 13. Interacción multiusuario y concurrencia

Sección opcional admitida por §4.3 de `Rules-Especificacion-Funcional.md` para el tipo `web-monolith`. Conserva el número que esa sección le asigna, de modo que la numeración salta del 11 al 13 por construcción de la regla y no por omisión.

El intake declara que las operaciones de despliegue se serializan por proyecto SelfHosted. Un lote en curso ocupa esa serialización hasta terminar, y su resultado se determina por contenedor.

