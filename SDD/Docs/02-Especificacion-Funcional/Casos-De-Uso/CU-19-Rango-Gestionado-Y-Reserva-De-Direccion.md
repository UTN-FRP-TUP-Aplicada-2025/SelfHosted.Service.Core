# CU-19 — Rango gestionado y reserva de dirección por servicio

**Proyecto de código:** SelfHosted-Service
**Producto:** SelfHosted Service
**Documento:** CU-19-Rango-Gestionado-Y-Reserva-De-Direccion.md
**Versión:** 2.0
**Estado:** Propuesto
**Fecha:** 2026-07-30
**Autor:** Analista Funcional Senior (AG-02)

**Necesidad de negocio upstream:** [NB-05](../../01-Necesidades-Negocio/Necesidades-De-Negocio/NB-05-Arranque-Previsible-Y-Conflictos-Anticipados.md)
**Trazabilidad upstream:** PRODUCT-INTAKE-SelfHosted-Service §4 capacidad F-08; anexo E-8 (el rango gestionado, sus exclusiones y las reservas); anexo E-15, endpoint de estado de reservas y conflictos; §17.P.11 DA-04; §17.P.4, decisión de esquema 1; E-16 RN-03, RN-06, RN-18

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

Permitir que el administrador declare el rango de direcciones que el producto gestiona y reserve una dirección por servicio y por réplica, para que las direcciones fijas dejen de anotarse fuera del sistema.

## 2. Actores

| Actor | Tipo | Rol |
| --- | --- | --- |
| Administrador del producto | Primario | Declara el rango gestionado, sus exclusiones y las reservas de cada servicio |
| Módulo de red | Sistema | Valida la pertenencia al rango, sugiere la siguiente dirección libre y persiste las reservas |

Los nombres de los actores no humanos son **denominaciones acuñadas por esta categoría**, salvo los seis que trazan a una fuente: `Motor de contenedores`, `Destino externo`, `Automatismo de integración continua`, `Sincronizador de estado`, `Módulo de descubrimiento` y `Resolutor de referencias`. Los acuñados no son componentes declarados y no condicionan la descomposición: su correspondencia con los módulos que el intake §17.P.2 sí declara la fija 05-Arquitectura-Tecnica. La convención completa, nombre por nombre, está en [Especificacion-Funcional.md](../Especificacion-Funcional.md) §8.

## 3. Precondiciones

- El administrador tiene sesión iniciada (CU-30).
- Existe al menos un proyecto SelfHosted con servicios que usan dirección fija (CU-01, CU-03).

## 4. Flujo principal

1. El administrador declara el rango gestionado con su subred, su primera y su última dirección, su pasarela, su interfaz padre y sus exclusiones.
2. El sistema advierte que el rango debe estar fuera del que reparte el servidor de direcciones de la red y lo valida (DA-04).
3. El administrador declara la dirección fija de un servicio, o pide que el sistema le asigne la siguiente libre.
4. El sistema valida que la dirección pertenezca al rango gestionado y no esté excluida (RN-06).
5. El sistema registra la reserva por servicio y por número de réplica (RC-12).
6. El administrador consulta el estado de las reservas y los conflictos.
7. El sistema devuelve las reservas con su dirección, su servicio, su proyecto SelfHosted y su marca de activa.

## 5. Flujos alternativos

**FA-01 — Servicio con más de una réplica y dirección fija.**
Disparador: el administrador pide más réplicas de un servicio que tiene una sola dirección fija.
Pasos: el sistema rechaza y pide explícitamente una dirección por réplica, en lugar de fallar en el arranque (RN-18, CL-06).
Punto de retorno: paso 3.

**FA-02 — Asignación de la siguiente dirección libre.**
Disparador: el administrador no quiere elegir la dirección a mano.
Pasos: el sistema sugiere la siguiente libre del rango gestionado, que es la misma sugerencia que emite el rechazo de RN-06.
Punto de retorno: paso 5.

**FA-03 — Servicio en red bridge.**
Disparador: el servicio usa red bridge y no requiere dirección fija de la red local.
Pasos: no se registra ninguna reserva; la dirección la asigna la red del proyecto SelfHosted.
Punto de retorno: paso 6.

## 6. Excepciones y errores

| Código | Causa | Respuesta del sistema |
| --- | --- | --- |
| `422` fuera de rango | La dirección declarada no pertenece al rango gestionado | Rechazo con la siguiente dirección libre sugerida (RN-06) |
| `422` de dirección excluida | La dirección pertenece al rango pero está declarada excluida | Rechazo (RN-06) |
| `422` de réplicas sin dirección | Se piden más réplicas de las que hay direcciones reservadas para un servicio con dirección fija | Rechazo: hace falta una dirección por réplica (RN-18) |
| `409` de conflicto | La dirección está ocupada por un servicio activo de otro proyecto SelfHosted | El conflicto se manifiesta en el arranque, con el informe y las resoluciones (RN-03). Ver CU-20 y CU-21 |

## 7. Postcondiciones

**En caso de éxito:** el rango gestionado está declarado con sus exclusiones; cada servicio con dirección fija tiene una reserva por réplica dentro del rango; el estado de reservas y conflictos es consultable.

**En caso de fallo:** no se registra ninguna reserva fuera del rango ni excluida; el rechazo identifica la dirección y sugiere la siguiente libre.

## 8. Criterios de aceptación

| ID | Given | When | Then |
| --- | --- | --- | --- |
| CA-01 | Un rango gestionado `192.168.1.128/26` con la dirección `192.168.1.129` declarada excluida | El administrador declara la dirección `192.168.1.120` para un servicio | El sistema rechaza con `422` y sugiere `192.168.1.141` como siguiente libre |
| CA-02 | El mismo rango | El administrador declara la dirección `192.168.1.129` | El sistema rechaza con `422`, porque la dirección está declarada excluida |
| CA-03 | Un servicio en macvlan con una sola dirección fija reservada | El administrador pide 2 réplicas | El sistema rechaza con `422`: hace falta una dirección por réplica |
| CA-04 | Un rango gestionado con tres reservas registradas | El administrador consulta el estado de reservas | El sistema devuelve las tres con su dirección, su servicio, su proyecto SelfHosted y su marca de activa |

## 9. Trazabilidad

| Dimensión | Referencia |
| --- | --- |
| Necesidad de negocio | [NB-05](../../01-Necesidades-Negocio/Necesidades-De-Negocio/NB-05-Arranque-Previsible-Y-Conflictos-Anticipados.md) |
| Reglas de negocio aplicables | RN-03, RN-06, RN-17, RN-18. Reglas conceptuales: RC-12 |
| Historias de usuario a generar en 06 | US-CU-19-1 (declarar el rango gestionado y sus exclusiones), US-CU-19-2 (reservar la dirección de un servicio), US-CU-19-3 (obtener la siguiente dirección libre), US-CU-19-4 (reservar una dirección por réplica) |
| Componentes esperados en 05 | Capa `Web`, pantalla de configuración de red y controlador del recurso; capa `Application`, módulo de red y conflictos; capa `Domain`, agregado `Red`; capa `Infrastructure`, `Persistencia`. Referencia tentativa |
| Tests previstos en 08 | T-08, T-09 (rango y exclusiones); T-19 (réplicas con una sola dirección fija); T-05, T-06, T-07 (conflicto, verificado desde CU-20) |

Los identificadores de historia de usuario llevan la forma `US-CU-XX-n` y son **provisionales**: la numeración definitiva es potestad de 06-Backlog-Tecnico. La forma se eligió para que ningún identificador emitido acá colisione con la numeración que 06 asigne.

## 10. Notas y supuestos

- La dirección se guarda como reserva y no sólo dentro de la configuración de red del servicio, porque es el único dato que se consulta entre proyectos SelfHosted para detectar conflictos.
- El escalado horizontal y la dirección fija de macvlan son incompatibles entre sí; el modelo lo admite reservando una dirección por réplica y la interfaz debe pedirlas explícitamente.
- **Brecha declarada:** el intake no declara política de purga para las reservas de servicios eliminados o inactivos. Destinatario: 05-Arquitectura-Tecnica.

## 11. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 2.0 | 2026-07-30 | Migración normativa del conjunto 4.1 al 6.0, fase M4 corte 3, bajo `Rules-Especificacion-Funcional` 4.0, `Vocabulario-Rules` 2.1 y `Migracion-Rules` 1.0. Clasificación **regenerar contenido** por el salto major de la regla que lo gobierna; fuente de contenido: el documento de origen, archivado en `_legacy/2026-07-30/CU-19-Rango-Gestionado-Y-Reserva-De-Direccion-v1.0.md`. Sube **major** porque la nomenclatura anterior deja de cumplir. Cabecera: la etiqueta `Proyecto` pasa a `Producto` sobre el mismo valor, que `Vocabulario-Rules` §3 prohíbe como etiqueta de un plano sobre el valor de otro, y la trazabilidad upstream apunta al `PRODUCT-INTAKE-SelfHosted-Service` renombrado. Sustitución léxica **por ocurrencia** según `Vocabulario-Rules` §9.5 y el plan de migración §3.5, sin ningún reemplazo global de cadena: se revisaron las tres ocurrencias de la cadena `soluci` de este documento y se sustituyeron dos, las dos designando el nivel superior y las dos con su concordancia de género —el nombre del actor primario «Administrador de la solución» de §2, que pasa a «Administrador del producto», y el propósito de §1, donde «el rango de direcciones que la solución gestiona» pasa a «que el producto gestiona»—; no hay en este documento ninguna «solución de código» ni ningún uso de prosa de negocio que R2 preserve. La única ocurrencia de la cadena `resoluci` —«re**soluci**ón»— **no es la palabra «solución» y quedó intacta**, con conteo verificado antes y después de la intervención: sustituirlas habría producido la palabra inexistente que la `[5.1]` del framework documenta sobre sí mismo, la que resulta de reemplazar la cadena `soluci` dentro de «re**soluci**ón». De las siete ocurrencias de «proyecto», **ninguna pasó a «proyecto de código»**: seis son «proyecto SelfHosted», la entidad del dominio, incluidas las de §7, CA-04 y la nota de §10 sobre la consulta entre proyectos; ninguna es el emprendimiento; la restante era la etiqueta de cabecera. La clasificación sigue el intake §12, que declara los tres referentes del término, y el glosario del dominio de `Vision-Producto.md` §9. **Glosario**: §2.1 y §4.2.4 de la regla convierten el vocabulario de la categoría en el artefacto propio y obligatorio `Glosario-Funcional.md`, que hasta la 3.0 era el punto 6 de `Modelo-Conceptual.md` y por lo tanto dependía de que el proyecto de código tuviera persistencia. Este caso de uso **no lo emite**: los términos que acuña o precisa y que aparecen en más de un artefacto de 02 se devolvieron al lote que lo emite, por la regla de inclusión de §3.3, y los que ya declara el glosario del dominio de `Vision-Producto.md` §9 se referencian en lugar de redefinirse, por la regla de no duplicación de la misma sección. Las once secciones obligatorias de §4.2 ya estaban completas y no se agregó ni se quitó ninguna; la tabla de contenido de §4.1 y la sección opcional §13 que §4.3 admite para `web-monolith` quedan como estaban. Ningún propósito, actor, precondición, paso del flujo principal, flujo alternativo, excepción, postcondición, criterio de aceptación, regla de negocio aplicable, historia de usuario prevista, componente esperado, test previsto ni brecha declarada cambió de enunciado: la migración es léxica y de forma de cabecera. Las filas históricas de esta tabla **no se reescribieron**, por `SDD-Development-Guide.md` §VI.2 |
| 1.0 | 2026-07-29 | Corrección absorbida dentro de la versión 1.0, sin subirla y sin archivar, por la política de versionado de `Master-Prompt.md` §5: el documento está en estado `Propuesto` y la corrección proviene del audit de su propia fase de emisión. §2 suma la declaración de que los nombres de los actores no humanos son denominaciones acuñadas por esta categoría y no componentes declarados, con la salvedad de los seis que sí trazan a una fuente. Ningún actor cambia de nombre y ningún flujo se altera: lo que se corrige es que la categoría afirmaba que todo dato trazaba y trece de los diecinueve nombres de actor no humano no lo cumplían. Origen: hallazgo H-04 del informe [Audit/B-02-03-r1.md](../../Audit/B-02-03-r1.md) |
| 1.0 | 2026-07-29 | Versión inicial, derivada de la necesidad de negocio upstream y de las secciones del intake citadas en la cabecera |

