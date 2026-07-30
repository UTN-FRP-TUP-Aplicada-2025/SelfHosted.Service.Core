# CU-25 — Cálculo del informe de impacto

**Proyecto:** SelfHosted Service
**Documento:** CU-25-Calculo-Del-Informe-De-Impacto.md
**Versión:** 1.0
**Estado:** Propuesto
**Fecha:** 2026-07-29
**Autor:** Analista Funcional Senior (AG-02)

**Necesidad de negocio upstream:** [NB-06](../../01-Necesidades-Negocio/Necesidades-De-Negocio/NB-06-Cambios-Revisados-Y-Aplicados-En-Lote.md)
**Trazabilidad upstream:** SOLUTION-INTAKE §4 capacidad F-07; anexo E-5 (el informe con sus dos listas y el campo de referencias); anexo E-9, camino de dos pasos para localizar las referencias; §17.P.11, acotación del marcado de redespliegue y su extensión a las referencias; E-16 RN-12, RN-13, RN-27

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

Calcular, antes de ejecutar nada, qué servicios de un proyecto SelfHosted quedan afectados por los cambios pendientes y cuáles no, para que el administrador decida con la consecuencia delante y para que el redespliegue no alcance a servicios cuyo valor no cambió.

## 2. Actores

| Actor | Tipo | Rol |
| --- | --- | --- |
| Módulo de impacto | Primario | Recorre los cambios pendientes y produce las dos listas del informe |
| Registro de la solución | Sistema | Aporta las aristas entrantes y las variables con referencia sobre las que se resuelve la propagación |
| Administrador de la solución | Secundario | Lee el informe antes de aplicar (CU-24) |

Los nombres de los actores no humanos son **denominaciones acuñadas por esta categoría**, salvo los seis que trazan a una fuente: `Motor de contenedores`, `Destino externo`, `Automatismo de integración continua`, `Sincronizador de estado`, `Módulo de descubrimiento` y `Resolutor de referencias`. Los acuñados no son componentes declarados y no condicionan la descomposición: su correspondencia con los módulos que el intake §17.P.2 sí declara la fija 05-Arquitectura-Tecnica. La convención completa, nombre por nombre, está en [Especificacion-Funcional.md](../Especificacion-Funcional.md) §8.

## 3. Precondiciones

- Existe un conjunto de cambios pendientes con al menos un cambio (CU-22).

## 4. Flujo principal

1. El módulo recorre cada cambio del conjunto pendiente.
2. Para el alta o la edición de un servicio, marca ese servicio como afectado.
3. Para un cambio de dirección o de puerto de un servicio, marca los orígenes de sus aristas entrantes que referencian el host o que registran su puerto, y sólo ésos.
4. Para un cambio del valor referenciado de una variable de otro servicio, marca los servicios que la referencian, deduciéndolo de las aristas entrantes.
5. Para un cambio de una variable compartida del proyecto SelfHosted, enumera qué variable de qué servicio quedará obsoleta. No hay arista que consultar, porque el proyecto no es un nodo del lienzo: se resuelve enumerando las variables con referencia y parseando sus ocurrencias.
6. Descarta los cambios visuales, que no producen impacto (RN-12).
7. Produce las dos listas: servicios a redesplegar y servicios sin impacto, más los conflictos de dirección detectados.
8. Entrega el informe, que se presenta antes de ejecutar (RN-13).

## 5. Flujos alternativos

**FA-01 — Cambio que no consume dirección ni puerto.**
Disparador: una arista referencia una variable de configuración del destino y no su host ni su puerto.
Pasos: un cambio de dirección o de puerto del destino no marca a ese origen; se marca por su propio cambio, si lo hay.
Punto de retorno: paso 7.

**FA-02 — Conjunto de cambios sólo visuales.**
Disparador: todos los cambios acumulados son de disposición.
Pasos: no entran al conjunto pendiente y el informe no tiene servicios a redesplegar (RN-12).
Punto de retorno: paso 7.

**FA-03 — Eliminación de una variable referenciada.**
Disparador: uno de los cambios es la eliminación de una variable compartida referenciada.
Pasos: el cambio se rechaza con la lista de quienes la referencian y no entra al conjunto (RN-27).
Punto de retorno: paso 1.

## 6. Excepciones y errores

| Código | Causa | Respuesta del sistema |
| --- | --- | --- |
| Servicio marcado sin causa | Un servicio que no consume la dirección ni el puerto del destino queda marcado para redespliegue | Es el ruido que RN-13 evita. El marcado alcanza a las aristas que referencian el host y a las que registran el puerto, y a nada más |
| Propagación no detectada | Un servicio que referencia una variable compartida modificada no queda marcado | El valor quedaría obsoleto en silencio, que es el defecto que la regla evita. La propagación se resuelve por la enumeración de las variables con referencia |
| `409` de variable referenciada | Uno de los cambios elimina una variable compartida con referencias vigentes | Rechazo con la lista de servicios y claves que la referencian (RN-27) |

## 7. Postcondiciones

**En caso de éxito:** el informe declara la lista de servicios a redesplegar, la de servicios sin impacto y los conflictos de dirección detectados; ningún servicio figura marcado sin una causa trazable a un cambio del conjunto.

**En caso de fallo:** no se presenta un informe incompleto y no se ejecuta ninguna aplicación sobre él; el conjunto de cambios queda como estaba.

## 8. Criterios de aceptación

| ID | Given | When | Then |
| --- | --- | --- | --- |
| CA-01 | El conjunto de cambios 331 del proyecto SelfHosted 12, con el alta de `cache`, un cambio de variable de `api`, un movimiento de nodo y un cambio de la variable compartida de zona horaria | El módulo calcula el informe | El informe declara `api` y `cache` a redesplegar y `db` sin impacto |
| CA-02 | El mismo conjunto | El módulo calcula el informe | El movimiento del nodo no aporta ningún servicio a redesplegar |
| CA-03 | El cambio de la variable compartida de zona horaria, referenciada por la variable homónima de `api` | El módulo calcula el informe | El informe enumera que la variable de `api` quedará obsoleta y marca `api` como pendiente de redespliegue |
| CA-04 | Un servicio cuya arista entrante referencia una variable de configuración del destino y no su host ni su puerto | Cambia la dirección del destino | Ese servicio no queda marcado para redespliegue por ese cambio |

## 9. Trazabilidad

| Dimensión | Referencia |
| --- | --- |
| Necesidad de negocio | [NB-06](../../01-Necesidades-Negocio/Necesidades-De-Negocio/NB-06-Cambios-Revisados-Y-Aplicados-En-Lote.md) |
| Reglas de negocio aplicables | RN-12, RN-13, RN-27, RN-33. Reglas conceptuales: RC-05, RC-17 |
| Historias de usuario a generar en 06 | US-CU-25-1 (calcular la lista de servicios a redesplegar), US-CU-25-2 (calcular la lista de servicios sin impacto), US-CU-25-3 (enumerar qué variables quedarán obsoletas por un cambio de variable compartida) |
| Componentes esperados en 05 | Capa `Application`, módulo de proyectos, donde vive el cálculo del informe; capa `Domain`, agregado `Proyectos`; capa `Infrastructure`, `Persistencia`, con la enumeración indexada de las variables con referencia. Referencia tentativa. La NB-06 asigna este caso de uso a la capa de aplicación |
| Tests previstos en 08 | T-23 (informe del conjunto 331); T-22 (el cambio visual sin impacto); T-31 (servicios no alcanzados); T-41 (variable referenciada protegida) |

Los identificadores de historia de usuario llevan la forma `US-CU-XX-n` y son **provisionales**: la numeración definitiva es potestad de 06-Backlog-Tecnico. La forma se eligió para que ningún identificador emitido acá colisione con la numeración que 06 asigne.

## 10. Notas y supuestos

- El informe se presenta antes de ejecutar. Es lo que convierte a la edición en transaccional y no en una sucesión de despliegues.
- La localización de las referencias se resuelve en dos pasos —enumeración indexada y parseo de las ocurrencias— y no por igualdad ni por búsqueda de texto, porque una referencia puede ir interpolada dentro de un valor más largo. Es la especificación derivada DI-13, sin revisar.
- La acotación del marcado a las aristas que consumen dirección o puerto lleva marcador `[D-i]` y se consume declarándola revisable.
- El campo que enumera quién referencia una variable compartida es lo que hace auditable la propagación.

## 11. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 1.0 | 2026-07-29 | Corrección absorbida dentro de la versión 1.0, sin subirla y sin archivar, por la política de versionado de `Master-Prompt.md` §5: el documento está en estado `Propuesto` y la corrección proviene del audit de su propia fase de emisión. §2 suma la declaración de que los nombres de los actores no humanos son denominaciones acuñadas por esta categoría y no componentes declarados, con la salvedad de los seis que sí trazan a una fuente. Ningún actor cambia de nombre y ningún flujo se altera: lo que se corrige es que la categoría afirmaba que todo dato trazaba y trece de los diecinueve nombres de actor no humano no lo cumplían. Origen: hallazgo H-04 del informe [Audit/B-02-03-r1.md](../../Audit/B-02-03-r1.md) |
| 1.0 | 2026-07-29 | Versión inicial, derivada de la necesidad de negocio upstream y de las secciones del intake citadas en la cabecera |

