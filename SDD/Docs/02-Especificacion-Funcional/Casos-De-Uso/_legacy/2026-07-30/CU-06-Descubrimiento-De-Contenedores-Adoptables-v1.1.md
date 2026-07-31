# CU-06 — Descubrimiento de contenedores, con motivo de no incorporabilidad

**Proyecto:** SelfHosted Service
**Documento:** CU-06-Descubrimiento-De-Contenedores-Adoptables.md
**Versión:** 1.1
**Estado:** Propuesto
**Fecha:** 2026-07-29
**Autor:** Analista Funcional Senior (AG-02)

**Necesidad de negocio upstream:** [NB-02](../../01-Necesidades-Negocio/Necesidades-De-Negocio/NB-02-Adoptabilidad-Del-Parque-Existente.md)
**Trazabilidad upstream:** SOLUTION-INTAKE §4 capacidad F-11; §6 flujo 2; anexo E-7 (el listado de candidatos, el campo de puertos publicados y las siete reglas RA-01 a RA-07); anexo E-15, endpoint de descubrimiento; §17.P.5, salvaguardas de aislamiento; E-16 RN-11, RN-29; §7 CL-07

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

Permitir que el administrador vea los contenedores que ya corren en su servidor como candidatos a incorporarse a un proyecto SelfHosted, con los que no son incorporables marcados y con su motivo escrito, para poder partir de lo que ya tiene en lugar de empezar de cero.

## 2. Actores

| Actor | Tipo | Rol |
| --- | --- | --- |
| Administrador de la solución | Primario | Consulta el listado de candidatos |
| Módulo de descubrimiento | Sistema | Consulta el motor de contenedores en modo sólo lectura, inspecciona lo encontrado y clasifica los candidatos |
| Motor de contenedores | Sistema | Devuelve los contenedores existentes y su configuración observada |

Los nombres de los actores no humanos son **denominaciones acuñadas por esta categoría**, salvo los seis que trazan a una fuente: `Motor de contenedores`, `Destino externo`, `Automatismo de integración continua`, `Sincronizador de estado`, `Módulo de descubrimiento` y `Resolutor de referencias`. Los acuñados no son componentes declarados y no condicionan la descomposición: su correspondencia con los módulos que el intake §17.P.2 sí declara la fija 05-Arquitectura-Tecnica. La convención completa, nombre por nombre, está en [Especificacion-Funcional.md](../Especificacion-Funcional.md) §8.

## 3. Precondiciones

- El administrador tiene sesión iniciada (CU-30).
- Existe el proyecto SelfHosted al que se incorporarán los contenedores (CU-01).
- El motor de contenedores es alcanzable por su punto de acceso local.

## 4. Flujo principal

1. El administrador entra a un proyecto SelfHosted y pide incorporar contenedores existentes.
2. El módulo de descubrimiento consulta el motor de contenedores en modo sólo lectura: listar no habilita operar.
3. El sistema inspecciona cada contenedor encontrado y toma su imagen, su estado, su fecha de creación, sus redes con su modo y su dirección, **sus puertos publicados en el host** (regla RA-07), sus montajes y la cantidad de variables detectadas.
4. El sistema descarta de la oferta los contenedores ya incorporados por otro proyecto SelfHosted, que aparecen deshabilitados con el proyecto que los tomó (RN-11, regla RA-01).
5. El sistema marca como no incorporables los contenedores que montan el punto de acceso del motor, con su motivo escrito (regla RA-04).
6. El sistema calcula, para cada candidato, qué variables sugiere la heurística por nombre como secretas. La heurística sugiere; no decide (RN-29, regla RA-05).
7. El sistema devuelve el listado de candidatos con la marca de incorporable, el motivo cuando no lo es, la sugerencia de la heurística y **los puertos publicados de cada uno**. Una lista de puertos vacía es un dato válido y significa que el contenedor no publica ninguno, no que no se sepa.
8. El administrador elige un candidato y continúa por CU-07.

## 5. Flujos alternativos

**FA-01 — Contenedor que monta el punto de acceso del motor, forzado.**
Disparador: el administrador quiere incorporar de todos modos un contenedor marcado no incorporable por montar el punto de acceso del motor.
Pasos: el sistema exige confirmación explícita antes de continuar, porque gobernarlo desde el administrador crearía una dependencia circular de control (CL-07, regla RA-04).
Punto de retorno: paso 8.

**FA-02 — Sin candidatos.**
Disparador: el servidor no tiene contenedores incorporables.
Pasos: el sistema devuelve el listado vacío, sin error.
Punto de retorno: paso 8, sin selección.

**FA-03bis — Candidato sin puertos publicados.**
Disparador: el candidato corre en macvlan, o en bridge sin publicar ningún puerto.
Pasos: el sistema devuelve la lista de puertos publicados **vacía**, que es un dato válido y no una ausencia de dato. Para un candidato en macvlan es además lo esperado, porque RN-07 prohíbe publicar puertos en ese modo de red.
Punto de retorno: paso 7.

**FA-03 — Consulta de las variables de un candidato.**
Disparador: el administrador quiere ver las variables de un candidato antes de elegirlo.
Pasos: el sistema devuelve las variables del contenedor con la sugerencia de la heurística; los valores de las variables sugeridas viajan enmascarados (RN-15).
Punto de retorno: paso 8.

## 6. Excepciones y errores

| Código | Causa | Respuesta del sistema |
| --- | --- | --- |
| Motor inalcanzable | El punto de acceso del motor de contenedores no responde | El sistema informa el error traducido a una causa identificable propia, sin propagar el tipo del cliente del motor. El intake declara esa traducción como requisito del adaptador |
| Candidato ya incorporado | El contenedor pertenece a otro proyecto SelfHosted | Aparece deshabilitado, con el proyecto que lo tomó, y no vuelve a ofrecerse (RN-11) |
| Candidato no incorporable | El contenedor monta el punto de acceso del motor | Se marca no incorporable con el motivo escrito; sólo puede forzarse con confirmación explícita (regla RA-04) |

## 7. Postcondiciones

**En caso de éxito:** el administrador dispone del listado de candidatos con su configuración observada, su marca de incorporabilidad, su motivo cuando corresponde y la sugerencia de variables secretas; ninguna operación de escritura se habilitó desde el descubrimiento y ningún contenedor se modificó.

**En caso de fallo:** no se incorpora ningún contenedor y el parque del servidor queda intacto: el descubrimiento es de sólo lectura.

## 8. Criterios de aceptación

| ID | Given | When | Then |
| --- | --- | --- | --- |
| CA-01 | Un servidor con el contenedor `print-server`, en macvlan con `192.168.1.139`, no incorporado por ningún proyecto SelfHosted | El administrador abre el descubrimiento | El contenedor aparece como incorporable, con su imagen, su red, su dirección, sus montajes y la cantidad de variables detectadas |
| CA-02 | Un servidor con el contenedor `panel-admin`, que monta el punto de acceso del motor de contenedores | El administrador abre el descubrimiento | El contenedor aparece con la marca de no incorporable y el motivo escrito, forzable sólo con confirmación explícita |
| CA-03 | Un contenedor ya incorporado por el proyecto SelfHosted `Impresion 3D` | El administrador abre el descubrimiento desde otro proyecto | El contenedor aparece deshabilitado, indicando el proyecto que lo tomó, y no puede elegirse |
| CA-04 | Un candidato con una variable llamada `ADMIN_TOKEN` con valor | El administrador consulta las variables del candidato | La variable llega con la sugerencia de secreta activada, con el motivo de la heurística declarado, y su valor viaja enmascarado |
| CA-05 | Un servidor con el contenedor `cache`, en bridge, que publica el puerto 6379 en el host | El administrador abre el descubrimiento | El candidato llega con ese puerto publicado declarado, y el dato queda disponible para que RN-38 pueda verificar la colisión contra un servicio nuevo aunque `cache` no pertenezca a ningún proyecto |
| CA-06 | El candidato `print-server`, en macvlan | El administrador abre el descubrimiento | La lista de puertos publicados llega **vacía**, y eso es un dato válido y no una ausencia: RN-07 prohíbe publicar puertos en macvlan |

## 9. Trazabilidad

| Dimensión | Referencia |
| --- | --- |
| Necesidad de negocio | [NB-02](../../01-Necesidades-Negocio/Necesidades-De-Negocio/NB-02-Adoptabilidad-Del-Parque-Existente.md) |
| Reglas de negocio aplicables | RN-11, RN-15, RN-29, RN-38. Reglas conceptuales: RC-17, RC-19 |
| Historias de usuario a generar en 06 | US-CU-06-1 (ver los contenedores del servidor como candidatos), US-CU-06-2 (ver el motivo por el que un candidato no es incorporable), US-CU-06-3 (ver las variables de un candidato con la sugerencia de la heurística), US-CU-06-4 (ver los puertos que un candidato publica en el host) |
| Componentes esperados en 05 | Capa `Web`, página de descubrimiento y controlador del recurso; capa `Application`, módulo de descubrimiento y adopción; capa `Infrastructure`, `Contenedores`, detrás de la abstracción del motor. Referencia tentativa |
| Tests previstos en 08 | T-15 (contenedor ya incorporado); T-16 (contenedor que monta el punto de acceso del motor); T-17, T-17b (sugerencia de la heurística) |

Los identificadores de historia de usuario llevan la forma `US-CU-XX-n` y son **provisionales**: la numeración definitiva es potestad de 06-Backlog-Tecnico. La forma se eligió para que ningún identificador emitido acá colisione con la numeración que 06 asigne.

## 10. Notas y supuestos

- El descubrimiento es de sólo lectura por declaración explícita del intake: listar no habilita operar. Es una de las cinco salvaguardas de aislamiento que §17.P.5 declara obligatorias.
- La heurística por nombre —claves que contienen ciertos fragmentos— sugiere y no decide desde la decisión D-2. Las otras dos resoluciones evaluadas no quedan prohibidas: pueden sumarse como fuentes de sugerencia.
- Ningún tipo de la librería del motor de contenedores puede aparecer fuera de su adaptador. Es materia de 05-Arquitectura-Tecnica.
- La presentación del listado pertenece a 03-UX-UI-DX.

## 11. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 1.1 | 2026-07-29 | **Se incorporan los puertos publicados del contenedor descubierto.** Hasta la versión 1.0 el candidato traía direcciones IP y ningún puerto, y ese hueco producía dos defectos verificados: un contenedor incorporado con puertos publicados **los perdía en la traducción** (CU-08), y la validación de la configuración **no podía verificar** la colisión de puerto de host contra el parque no incorporado (RN-38). El paso 3 los toma, el paso 7 los devuelve, y se agrega FA-03bis, que declara que la lista vacía es un dato válido y no una ausencia. §8 suma CA-05 y CA-06, §9 suma RN-38, RC-19 y una historia de usuario, y la cabecera pasa a citar las siete reglas de adopción RA-01 a RA-07 del intake v2.4. La versión 1.0 queda archivada en `_legacy/2026-07-29/`. Origen: §22.2 quinta fila del documento de trabajo `SDD/Estado/Redefinicion-Servicio.md` v2.0, y la especificación de integración `DI-23` |
| 1.0 | 2026-07-29 | Corrección absorbida dentro de la versión 1.0, sin subirla y sin archivar, por la política de versionado de `Master-Prompt.md` §5: el documento está en estado `Propuesto` y la corrección proviene del audit de su propia fase de emisión. §2 suma la declaración de que los nombres de los actores no humanos son denominaciones acuñadas por esta categoría y no componentes declarados, con la salvedad de los seis que sí trazan a una fuente. Ningún actor cambia de nombre y ningún flujo se altera: lo que se corrige es que la categoría afirmaba que todo dato trazaba y trece de los diecinueve nombres de actor no humano no lo cumplían. Origen: hallazgo H-04 del informe [Audit/B-02-03-r1.md](../../Audit/B-02-03-r1.md) |
| 1.0 | 2026-07-29 | Versión inicial, derivada de la necesidad de negocio upstream y de las secciones del intake citadas en la cabecera |

