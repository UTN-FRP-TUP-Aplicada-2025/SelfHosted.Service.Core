# CU-02 — Listado, renombrado y eliminación de proyectos SelfHosted

**Proyecto de código:** SelfHosted-Service
**Producto:** SelfHosted Service
**Documento:** CU-02-Listado-Renombrado-Y-Eliminacion-De-Proyectos.md
**Versión:** 2.0
**Estado:** Propuesto
**Fecha:** 2026-07-30
**Autor:** Analista Funcional Senior (AG-02)

**Necesidad de negocio upstream:** [NB-01](../../01-Necesidades-Negocio/Necesidades-De-Negocio/NB-01-Visibilidad-Unificada-De-La-Arquitectura.md)
**Trazabilidad upstream:** PRODUCT-INTAKE §4 capacidad F-02; anexo E-15, endpoints de listado y de lectura de proyecto; anexo E-9, propagación en cascada de los elementos del proyecto; E-16 RN-10, RN-17, RN-33; anexo E-18, mapa de navegación

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
- [13. Interacción multiusuario y concurrencia](#13-interacción-multiusuario-y-concurrencia)

---

## 1. Propósito

Permitir que el administrador vea el conjunto de proyectos SelfHosted declarados con su estado agregado, cambie el nombre de uno y elimine el que ya no necesita, para que el registro refleje la arquitectura vigente y no la histórica.

## 2. Actores

| Actor | Tipo | Rol |
| --- | --- | --- |
| Administrador del producto | Primario | Consulta el listado, renombra y elimina proyectos SelfHosted |
| Registro del producto | Sistema | Devuelve el listado con el estado agregado, aplica el renombrado y propaga la eliminación |

Los nombres de los actores no humanos son **denominaciones acuñadas por esta categoría**, salvo los seis que trazan a una fuente: `Motor de contenedores`, `Destino externo`, `Automatismo de integración continua`, `Sincronizador de estado`, `Módulo de descubrimiento` y `Resolutor de referencias`. Los acuñados no son componentes declarados y no condicionan la descomposición: su correspondencia con los módulos que el intake §17.P.2 sí declara la fija 05-Arquitectura-Tecnica. La convención completa, nombre por nombre, está en [Especificacion-Funcional.md](../Especificacion-Funcional.md) §8.

## 3. Precondiciones

- El administrador tiene sesión iniciada (CU-30).
- Para renombrar o eliminar, existe al menos un proyecto SelfHosted declarado (CU-01).

## 4. Flujo principal

1. El administrador abre el listado de proyectos SelfHosted.
2. El sistema devuelve cada proyecto con su estado agregado, derivado de los estados de sus despliegues por contenedor (RN-31).
3. El administrador elige un proyecto y solicita renombrarlo.
4. El administrador declara el nombre nuevo y confirma.
5. El sistema aplica el renombrado sin alterar la identidad del proyecto ni ninguna relación que le apunte (RN-35).
6. El sistema registra el evento de auditoría (RN-17).
7. El administrador solicita eliminar un proyecto SelfHosted.
8. El sistema pide confirmación y la eliminación propaga a los servicios, variables, enlaces y reservas del proyecto (RC-15).
9. El sistema registra el evento de auditoría del borrado.

## 5. Flujos alternativos

**FA-01 — Listado vacío.**
Disparador: la instalación no tiene ningún proyecto SelfHosted.
Pasos: el sistema presenta el listado vacío y ofrece el alta.
Punto de retorno: CU-01.

**FA-02 — Renombrado abandonado.**
Disparador: el administrador abandona antes del paso 4.
Pasos: el sistema no aplica ningún cambio.
Punto de retorno: paso 1.

**FA-03 — Eliminación no confirmada.**
Disparador: el administrador no completa la confirmación del paso 8.
Pasos: el sistema no elimina nada.
Punto de retorno: paso 1.

## 6. Excepciones y errores

| Código | Causa | Respuesta del sistema |
| --- | --- | --- |
| `PROYECTO_INEXISTENTE` | El proyecto SelfHosted elegido ya no existe | Rechazo, sin efecto sobre el registro. El código concreto no está declarado en el intake; rige la política general de CL-05 |
| `ELIMINACION_SIN_CONFIRMAR` | Se intenta eliminar sin completar la confirmación | El sistema no elimina nada. La confirmación escrita está declarada para el servicio en RN-10; **el intake no declara la forma de la confirmación al eliminar un proyecto SelfHosted completo** y se declara brecha en §10 |

## 7. Postcondiciones

**En caso de éxito:** el listado refleja los proyectos SelfHosted vigentes con su estado agregado; el proyecto renombrado conserva su identidad y todas sus relaciones; el proyecto eliminado y sus elementos dependientes desaparecen del registro; cada operación de escritura dejó su evento de auditoría.

**En caso de fallo:** el registro del sistema queda en su estado previo y la auditoría registra el intento con su resultado.

## 8. Criterios de aceptación

| ID | Given | When | Then |
| --- | --- | --- | --- |
| CA-01 | Una instalación con los proyectos SelfHosted `portal-interno` e `ia-local` | El administrador abre el listado | El sistema devuelve los dos proyectos, cada uno con su estado agregado derivado de sus despliegues |
| CA-02 | El proyecto SelfHosted 12, con el servicio `api` que referencia dos variables del servicio `db` | El administrador renombra el proyecto a `Portal Interno v2` | Las dos referencias siguen resolviendo al mismo valor y no aparece ningún cambio pendiente, porque las relaciones se establecen por identidad (RN-35) |
| CA-03 | El proyecto SelfHosted 12, con cuatro servicios, seis referencias y dos variables compartidas | El administrador elimina el proyecto confirmando la operación | Los cuatro servicios, sus variables, sus enlaces y sus reservas desaparecen con él, y el listado ya no lo muestra |
| CA-04 | Una instalación con el registro de auditoría vacío | El administrador renombra un proyecto SelfHosted | El registro de auditoría contiene una fila con actor `admin`, la acción de renombrado y su resultado |

## 9. Trazabilidad

| Dimensión | Referencia |
| --- | --- |
| Necesidad de negocio | [NB-01](../../01-Necesidades-Negocio/Necesidades-De-Negocio/NB-01-Visibilidad-Unificada-De-La-Arquitectura.md) |
| Reglas de negocio aplicables | RN-10, RN-17, RN-33, RN-35. Reglas conceptuales: RC-01, RC-15, RC-17 |
| Historias de usuario a generar en 06 | US-CU-02-1 (ver el listado de proyectos SelfHosted con su estado), US-CU-02-2 (renombrar un proyecto SelfHosted), US-CU-02-3 (eliminar un proyecto SelfHosted con sus elementos dependientes) |
| Componentes esperados en 05 | Capa `Web`, controlador y página del listado de proyectos; capa `Application`, módulo de proyectos; capa `Domain`, agregado `Proyectos`; capa `Infrastructure`, `Persistencia`. Referencia tentativa |
| Tests previstos en 08 | Casos a derivar por 08-Calidad-Y-Pruebas. Los casos T-55 y T-58 del anexo E-22 verifican la invariancia de las referencias ante el renombrado en el nivel de servicio y de variable, no en el de proyecto SelfHosted |

Los identificadores de historia de usuario llevan la forma `US-CU-XX-n` y son **provisionales**: la numeración definitiva es potestad de 06-Backlog-Tecnico. La forma se eligió para que ningún identificador emitido acá colisione con la numeración que 06 asigne.

## 10. Notas y supuestos

- **Brecha declarada:** RN-33 alcanza al renombrado del servicio y de la variable. El intake no declara qué ocurre al renombrar un proyecto SelfHosted respecto de su identificador legible, que RC-01 exige único y que da nombre a recursos derivados. Destinatario: agente humano del proyecto.
- **Brecha declarada:** el intake declara la confirmación escrita para eliminar un servicio (RN-10) y no declara la forma de la confirmación al eliminar un proyecto SelfHosted completo. Destinatario: agente humano del proyecto.
- El detalle de la presentación del listado pertenece a 03-UX-UI-DX.

## 11. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 2.0 | 2026-07-30 | Migración normativa del conjunto 4.1 al 6.0, fase M4 corte 3, bajo `Rules-Especificacion-Funcional` 4.0, `Vocabulario-Rules` 2.1 y `Migracion-Rules` 1.0. Clasificación **regenerar contenido** por el salto major de la regla que lo gobierna; fuente de contenido: **el documento de origen**, archivado sin modificar en `_legacy/2026-07-30/CU-02-Listado-Renombrado-Y-Eliminacion-De-Proyectos-v1.0.md`. Sube **major** porque la nomenclatura anterior deja de cumplir. **Cabecera:** la etiqueta `Proyecto` pasa a `Producto` sobre el mismo valor, porque `Vocabulario-Rules` §3 prohíbe la etiqueta de un plano de identidad sobre el valor de otro; se suma el campo `Proyecto de código` con el valor `SelfHosted-Service`, que §4.1 de la regla 4.0 exige por ser ésta una categoría de nivel proyecto de código (§4 R3) y que el PRODUCT-INTAKE §13 declara como `Nombre-Proyecto-Codigo`; la trazabilidad upstream cita el `PRODUCT-INTAKE` renombrado, antes `SOLUTION-INTAKE`. **Sustitución léxica por ocurrencia** según `Vocabulario-Rules` §9.5 y el plan de migración §3.5, y nunca por reemplazo global de cadena: las dos ocurrencias de «solución» designaban el nivel superior y pasan a «producto» con su concordancia de género —«Administrador de la solución» a «Administrador del producto» y «Registro de la solución» a «Registro del producto»—; no hay ninguna «solución de código» ni ninguna ocurrencia de la cadena `resoluci` en este documento, verificado por barrido. Las cuarenta y una ocurrencias de «proyecto» se clasificaron una por una y **ninguna pasó a «proyecto de código»**: veintiuna llevan la forma calificada «proyecto SelfHosted»; quince son la misma entidad del dominio en forma corta, admitida por el PRODUCT-INTAKE §12 donde el contexto ya fijó el sentido; una es el código de error `PROYECTO_INEXISTENTE`, que nombra a esa misma entidad; dos son el emprendimiento —«agente humano del proyecto»—, que `Vocabulario-Rules` §4 R1 y el PRODUCT-INTAKE §12 dejan sin calificar; una nombra el archivo de este artefacto del dominio, que no se renombra, y una era la etiqueta de cabecera. **Tabla de contenido:** suma la entrada de §13, que la sección tenía sin figurar. La entrada de glosario de los referentes de «el registro», que la fila del 2026-07-29 ubica en `Modelo-Datos/Modelo-Conceptual.md` §6, pasa al artefacto propio `Glosario-Funcional.md` que §2.1 y §4.2.4 de la regla 4.0 hacen obligatorio para los ocho tipos D8; lo emite un lote posterior de esta misma fase y esta fila no lo anticipa. **Ningún propósito, actor, precondición, paso de flujo, flujo alternativo, excepción, postcondición, criterio de aceptación, referencia de trazabilidad, nota ni brecha cambió de contenido**: la migración es léxica y de forma de cabecera, y las filas anteriores de este control de cambios no se reescribieron. Origen: [Plan-Migracion-4.1-a-6.0.md](../../Audit/Plan-Migracion-4.1-a-6.0.md) §3.5 y §4 |
| 1.0 | 2026-07-29 | Corrección absorbida dentro de la versión 1.0, sin subirla y sin archivar, por la política de versionado de `Master-Prompt.md` §5: el documento está en estado `Propuesto`. Se califica la forma «el registro» a secas, que tenía tres referentes distintos en la categoría y no era resoluble leyendo esta sección por separado, que es como se generan los artefactos de las categorías siguientes. La entrada de glosario con los cuatro referentes vive en `Modelo-Datos/Modelo-Conceptual.md` §6. Las formas ya calificadas no se tocaron: no colisionan. |
| 1.0 | 2026-07-29 | Corrección absorbida dentro de la versión 1.0, sin subirla y sin archivar, por la política de versionado de `Master-Prompt.md` §5: el documento está en estado `Propuesto` y la corrección proviene del audit de su propia fase de emisión. §2 suma la declaración de que los nombres de los actores no humanos son denominaciones acuñadas por esta categoría y no componentes declarados, con la salvedad de los seis que sí trazan a una fuente. Ningún actor cambia de nombre y ningún flujo se altera: lo que se corrige es que la categoría afirmaba que todo dato trazaba y trece de los diecinueve nombres de actor no humano no lo cumplían. Origen: hallazgo H-04 del informe [Audit/B-02-03-r1.md](../../Audit/B-02-03-r1.md) |
| 1.0 | 2026-07-29 | Versión inicial, derivada de la necesidad de negocio upstream y de las secciones del intake citadas en la cabecera |

## 13. Interacción multiusuario y concurrencia

Sección opcional admitida por §4.3 de `Rules-Especificacion-Funcional.md` para el tipo `web-monolith`. Conserva el número que esa sección le asigna, de modo que la numeración salta del 11 al 13 por construcción de la regla y no por omisión.

El estado agregado del proyecto SelfHosted se deriva de los estados de sus despliegues por contenedor y no de un estado propio de la operación (RN-31). Un proyecto puede figurar como parcialmente activo, que es un estado legítimo (RN-20).

