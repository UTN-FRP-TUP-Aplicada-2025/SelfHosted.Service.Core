# CU-22 — Acumulación de cambios pendientes, con distinción de los visuales

**Proyecto de código:** SelfHosted-Service
**Producto:** SelfHosted Service
**Documento:** CU-22-Acumulacion-De-Cambios-Pendientes.md
**Versión:** 2.0
**Estado:** Propuesto
**Fecha:** 2026-07-30
**Autor:** Analista Funcional Senior (AG-02)

**Necesidad de negocio upstream:** [NB-06](../../01-Necesidades-Negocio/Necesidades-De-Negocio/NB-06-Cambios-Revisados-Y-Aplicados-En-Lote.md)
**Trazabilidad upstream:** PRODUCT-INTAKE-SelfHosted-Service §4 capacidad F-07; §5 historia 5; anexo E-5 (el conjunto de cambios con sus cuatro clases y su informe); §17.P.11, decisiones sobre el mecanismo de edición transaccional; anexo E-18, banner de cambios pendientes; E-16 RN-12, RN-13, RN-33

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

Permitir que el administrador modifique la configuración de un proyecto SelfHosted acumulando los cambios en un conjunto pendiente en lugar de aplicarlos de a uno, distinguiendo los cambios visuales, que no entran, para revisar el impacto antes de provocar una ventana de indisponibilidad.

## 2. Actores

| Actor | Tipo | Rol |
| --- | --- | --- |
| Administrador del producto | Primario | Edita la configuración y acumula los cambios |
| Registro del producto | Sistema | Clasifica cada cambio, lo acumula con su antes y su después, y distingue los visuales |

Los nombres de los actores no humanos son **denominaciones acuñadas por esta categoría**, salvo los seis que trazan a una fuente: `Motor de contenedores`, `Destino externo`, `Automatismo de integración continua`, `Sincronizador de estado`, `Módulo de descubrimiento` y `Resolutor de referencias`. Los acuñados no son componentes declarados y no condicionan la descomposición: su correspondencia con los módulos que el intake §17.P.2 sí declara la fija 05-Arquitectura-Tecnica. La convención completa, nombre por nombre, está en [Especificacion-Funcional.md](../Especificacion-Funcional.md) §8.

## 3. Precondiciones

- Existe el proyecto SelfHosted con al menos un servicio declarado (CU-01, CU-03).
- El administrador tiene el proyecto abierto.

## 4. Flujo principal

1. El administrador edita la configuración de un servicio, agrega un servicio, cambia una variable o modifica una variable compartida del proyecto SelfHosted.
2. El sistema clasifica el cambio y lo agrega al conjunto de cambios pendientes del proyecto, con su clase, su entidad, su resumen, su estado anterior y su estado posterior.
3. Para un cambio de variable compartida, la entidad del cambio es el proyecto SelfHosted y no un servicio, y el sistema enumera qué variable de qué servicio quedará obsoleta.
4. El sistema calcula qué servicios requieren redespliegue por cada cambio (RN-13). Ver CU-25.
5. El administrador mueve, agrupa o acerca los nodos del lienzo.
6. El sistema guarda esos cambios al instante y no los agrega al conjunto pendiente ni marca redespliegue (RN-12).
7. El sistema presenta el aviso de cambios pendientes con su cantidad y el acceso al detalle.
8. El administrador revisa el detalle antes de decidir qué hacer con el lote. Ver CU-23 y CU-24.

## 5. Flujos alternativos

**FA-01 — Renombrado de un elemento referenciado.**
Disparador: el administrador renombra un servicio o una variable a la que apuntan referencias.
Pasos: no aparece ningún cambio pendiente, porque la comparación es por forma vinculada y el renombrado no altera ninguna referencia (RN-33).
Punto de retorno: paso 7.

**FA-02 — Cambio de escalado.**
Disparador: el administrador cambia las réplicas o los límites de recursos de un servicio.
Pasos: el cambio entra al conjunto pendiente como cualquier otra edición de configuración y provoca reemplazo de contenedor al aplicarse.
Punto de retorno: paso 4.

**FA-03 — Proyecto SelfHosted sin cambios pendientes.**
Disparador: no hay ningún cambio acumulado.
Pasos: el sistema no muestra el aviso.
Punto de retorno: paso 1.

## 6. Excepciones y errores

| Código | Causa | Respuesta del sistema |
| --- | --- | --- |
| Cambio visual acumulado | Un cambio de disposición entra al conjunto pendiente | Prohibido por RN-12: de lo contrario el usuario acumularía cambios pendientes por el mero hecho de ordenar el dibujo |
| Cambio sin antes y después | Un cambio se acumula sin declarar su estado anterior y posterior | El conjunto debe permitir comparar el antes y el después de cada cambio; sin ellos la revisión previa no es posible |
| `409` de variable referenciada | El cambio es la eliminación de una variable compartida referenciada | Rechazo con la lista de quienes la referencian; el cambio no entra al conjunto (RN-27) |

## 7. Postcondiciones

**En caso de éxito:** el conjunto de cambios pendientes contiene cada edición de configuración con su clase, su entidad, su resumen, su antes y su después, y los servicios que obliga a redesplegar; ningún cambio visual entró; el aviso de cambios pendientes está visible.

**En caso de fallo:** el cambio rechazado no entra al conjunto y el proyecto SelfHosted conserva su estado; los cambios ya acumulados no se ven afectados.

## 8. Criterios de aceptación

| ID | Given | When | Then |
| --- | --- | --- | --- |
| CA-01 | El proyecto SelfHosted 12 sin cambios pendientes | El administrador agrega el servicio `cache` y cambia una variable de `api` | El conjunto pendiente contiene los dos cambios, cada uno con su antes, su después y los servicios que obliga a redesplegar |
| CA-02 | El mismo proyecto con dos cambios acumulados | El administrador mueve el nodo `db` de (520, 300) a (560, 320) | El movimiento se guarda al instante, el conjunto pendiente sigue teniendo dos cambios y ningún servicio queda marcado por ese motivo |
| CA-03 | El proyecto SelfHosted 12 con la variable compartida de zona horaria referenciada por `api` | El administrador cambia su valor | El cambio entra con entidad de proyecto, enumera que la variable de `api` quedará obsoleta y marca `api` como pendiente de redespliegue |
| CA-04 | El servicio `db` referenciado por dos variables de `api` | El administrador renombra `db` a `postgres` | No aparece ningún cambio pendiente en el conjunto |

## 9. Trazabilidad

| Dimensión | Referencia |
| --- | --- |
| Necesidad de negocio | [NB-06](../../01-Necesidades-Negocio/Necesidades-De-Negocio/NB-06-Cambios-Revisados-Y-Aplicados-En-Lote.md) |
| Reglas de negocio aplicables | RN-12, RN-13, RN-17, RN-27, RN-33. Reglas conceptuales: RC-17 |
| Historias de usuario a generar en 06 | US-CU-22-1 (acumular los cambios de configuración en un conjunto pendiente), US-CU-22-2 (guardar los cambios visuales al instante sin acumularlos), US-CU-22-3 (ver el aviso de cambios pendientes con su cantidad) |
| Componentes esperados en 05 | Capa `Web`, cajón de cambios pendientes y banner del lienzo; capa `Application`, módulo de proyectos; capa `Domain`, agregado `Proyectos`; capa `Infrastructure`, `Persistencia`. Referencia tentativa |
| Tests previstos en 08 | T-22 (movimiento del nodo); T-23 (el conjunto de cambios del anexo E-5); T-55, T-58 (renombrado sin cambio pendiente) |

Los identificadores de historia de usuario llevan la forma `US-CU-XX-n` y son **provisionales**: la numeración definitiva es potestad de 06-Backlog-Tecnico. La forma se eligió para que ningún identificador emitido acá colisione con la numeración que 06 asigne.

## 10. Notas y supuestos

- El conjunto de cambios pendientes es el mecanismo de edición transaccional del proyecto SelfHosted y también el sustrato del deshacer y rehacer, por decisión pre-tomada DA-05.
- El violeta está reservado en exclusiva al estado pendiente de aplicar; su uso es materia de 03-UX-UI-DX.
- El intake advierte que la confusión más probable del modelo es creer que guardar un cambio despliega. Las etiquetas de la interfaz deben dejarlo claro: es una observación para 03-UX-UI-DX.
- La ventana de indisponibilidad que el lote provoca debe advertirse explícitamente al confirmar, por la exclusión 2 del intake §9.

## 11. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 2.0 | 2026-07-30 | Migración normativa del conjunto 4.1 al 6.0, fase M4 corte 3, bajo `Rules-Especificacion-Funcional` 4.0, `Vocabulario-Rules` 2.1 y `Migracion-Rules` 1.0. Clasificación **regenerar contenido** por el salto major de la regla que lo gobierna; fuente de contenido: el documento de origen, archivado en `_legacy/2026-07-30/CU-22-Acumulacion-De-Cambios-Pendientes-v1.0.md`. Sube **major** porque la nomenclatura anterior deja de cumplir. Cabecera: la etiqueta `Proyecto` pasa a `Producto` sobre el mismo valor, que `Vocabulario-Rules` §3 prohíbe como etiqueta de un plano sobre el valor de otro, y la trazabilidad upstream apunta al `PRODUCT-INTAKE-SelfHosted-Service` renombrado. Sustitución léxica **por ocurrencia** según `Vocabulario-Rules` §9.5 y el plan de migración §3.5, sin ningún reemplazo global de cadena: se revisaron las dos ocurrencias de la cadena `soluci` de este documento y se sustituyeron dos, las dos designando el nivel superior y las dos con su concordancia de género —los dos nombres de actor de §2: «Administrador de la solución» pasa a «Administrador del producto» y «Registro de la solución» a «Registro del producto», las dos con la concordancia corregida—; no hay en este documento ninguna «solución de código» ni ningún uso de prosa de negocio que R2 preserve. Este documento no trae ninguna ocurrencia de «re**soluci**ón», de modo que la trampa de la subcadena no aplicó acá, y así queda registrado. De las dieciocho ocurrencias de «proyecto», **ninguna pasó a «proyecto de código»**: diez son «proyecto SelfHosted» y siete son su forma corta con el contexto ya fijado en la misma sección —«el proyecto abierto» de §3, «los cambios pendientes del proyecto» del paso 2, «el mismo proyecto» de CA-02, «entidad de proyecto» de CA-03, el módulo y el agregado `Proyectos` de §9 y «el mismo proyecto» de §13—, las diecisiete la entidad del dominio; ninguna es el emprendimiento; la restante era la etiqueta de cabecera. La clasificación sigue el intake §12, que declara los tres referentes del término, y el glosario del dominio de `Vision-Producto.md` §9. **Glosario**: §2.1 y §4.2.4 de la regla convierten el vocabulario de la categoría en el artefacto propio y obligatorio `Glosario-Funcional.md`, que hasta la 3.0 era el punto 6 de `Modelo-Conceptual.md` y por lo tanto dependía de que el proyecto de código tuviera persistencia. Este caso de uso **no lo emite**: los términos que acuña o precisa y que aparecen en más de un artefacto de 02 se devolvieron al lote que lo emite, por la regla de inclusión de §3.3, y los que ya declara el glosario del dominio de `Vision-Producto.md` §9 se referencian en lugar de redefinirse, por la regla de no duplicación de la misma sección. Las once secciones obligatorias de §4.2 ya estaban completas y no se agregó ni se quitó ninguna; la tabla de contenido de §4.1 y la sección opcional §13 que §4.3 admite para `web-monolith` quedan como estaban. Ningún propósito, actor, precondición, paso del flujo principal, flujo alternativo, excepción, postcondición, criterio de aceptación, regla de negocio aplicable, historia de usuario prevista, componente esperado, test previsto ni brecha declarada cambió de enunciado: la migración es léxica y de forma de cabecera. Las filas históricas de esta tabla **no se reescribieron**, por `SDD-Development-Guide.md` §VI.2 |
| 1.0 | 2026-07-29 | Corrección absorbida dentro de la versión 1.0, sin subirla y sin archivar, por la política de versionado de `Master-Prompt.md` §5: el documento está en estado `Propuesto` y la corrección proviene del audit de su propia fase de emisión. §2 suma la declaración de que los nombres de los actores no humanos son denominaciones acuñadas por esta categoría y no componentes declarados, con la salvedad de los seis que sí trazan a una fuente. Ningún actor cambia de nombre y ningún flujo se altera: lo que se corrige es que la categoría afirmaba que todo dato trazaba y trece de los diecinueve nombres de actor no humano no lo cumplían. Origen: hallazgo H-04 del informe [Audit/B-02-03-r1.md](../../Audit/B-02-03-r1.md) |
| 1.0 | 2026-07-29 | Versión inicial, derivada de la necesidad de negocio upstream y de las secciones del intake citadas en la cabecera |

## 13. Interacción multiusuario y concurrencia

Sección opcional admitida por §4.3 de `Rules-Especificacion-Funcional.md` para el tipo `web-monolith`. Conserva el número que esa sección le asigna, de modo que la numeración salta del 11 al 13 por construcción de la regla y no por omisión.

El conjunto de cambios pendientes es por proyecto SelfHosted. El intake no declara comportamiento para dos sesiones editando el mismo proyecto a la vez, porque hay un único administrador; se declara como observación y no como brecha, dado que §9 excluye la gestión de múltiples usuarios.

