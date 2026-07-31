# CU-05 — Persistencia y recuperación de la disposición del lienzo

**Proyecto de código:** SelfHosted-Service
**Producto:** SelfHosted Service
**Documento:** CU-05-Persistencia-Y-Recuperacion-De-La-Disposicion.md
**Versión:** 2.0
**Estado:** Propuesto
**Fecha:** 2026-07-30
**Autor:** Analista Funcional Senior (AG-02)

**Necesidad de negocio upstream:** [NB-01](../../01-Necesidades-Negocio/Necesidades-De-Negocio/NB-01-Visibilidad-Unificada-De-La-Arquitectura.md)
**Trazabilidad upstream:** PRODUCT-INTAKE §4 capacidad F-04; §5 historia 3; anexo E-1 (la disposición como bloque del proyecto); anexo E-15, endpoint de guardado del lienzo; §17.P.10, regla de oro del lienzo; §17.P.11, decisión de guardar la disposición en un único bloque; E-16 RN-12

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

Permitir que el administrador ordene los nodos del lienzo y que esa disposición se conserve al recargar, para leer la arquitectura como la pensó y no como la ordenó el sistema, sin que ordenar el dibujo produzca cambios pendientes.

## 2. Actores

| Actor | Tipo | Rol |
| --- | --- | --- |
| Administrador del producto | Primario | Desplaza, agrupa y acerca los nodos del lienzo |
| Registro del producto | Sistema | Persiste la disposición al finalizar el gesto y la restituye al abrir el proyecto |

Los nombres de los actores no humanos son **denominaciones acuñadas por esta categoría**, salvo los seis que trazan a una fuente: `Motor de contenedores`, `Destino externo`, `Automatismo de integración continua`, `Sincronizador de estado`, `Módulo de descubrimiento` y `Resolutor de referencias`. Los acuñados no son componentes declarados y no condicionan la descomposición: su correspondencia con los módulos que el intake §17.P.2 sí declara la fija 05-Arquitectura-Tecnica. La convención completa, nombre por nombre, está en [Especificacion-Funcional.md](../Especificacion-Funcional.md) §8.

## 3. Precondiciones

- Existe el proyecto SelfHosted con al menos un servicio declarado (CU-01, CU-03).
- El administrador tiene el lienzo abierto.

## 4. Flujo principal

1. El administrador arrastra un nodo del lienzo hacia una posición nueva.
2. El sistema no escribe nada durante el gesto: la regla de oro declarada es cero escrituras durante el arrastre.
3. El administrador suelta el nodo.
4. El sistema escribe la disposición una sola vez, con un antirrebote de 400 milisegundos, en el bloque de disposición del proyecto SelfHosted.
5. El sistema no agrega ningún cambio al conjunto de cambios pendientes y no marca ningún servicio como pendiente de redespliegue (RN-12).
6. El administrador recarga o vuelve a abrir el proyecto SelfHosted.
7. El sistema restituye la disposición guardada antes de pintar el lienzo.

## 5. Flujos alternativos

**FA-01 — Agrupación y acercamiento.**
Disparador: el administrador agrupa nodos o cambia el nivel de acercamiento.
Pasos: se aplica el mismo tratamiento que al desplazamiento: escritura única al finalizar el gesto y ninguna entrada al conjunto de cambios pendientes.
Punto de retorno: paso 4.

**FA-02 — Nodo nuevo sin posición declarada.**
Disparador: se agrega un servicio al proyecto SelfHosted y todavía no tiene posición.
Pasos: el sistema le asigna una posición inicial y la persiste con el mismo mecanismo.
Punto de retorno: paso 4.

## 6. Excepciones y errores

| Código | Causa | Respuesta del sistema |
| --- | --- | --- |
| Escritura no persistida | El gesto termina y la escritura no se completa | La disposición mostrada y la persistida quedan divergentes hasta la próxima escritura. **El intake no declara el comportamiento ante fallo de la escritura de la disposición** y se declara brecha en §10 |
| Proyecto sin disposición guardada | Se abre un proyecto SelfHosted cuya disposición nunca se escribió | El sistema pinta el lienzo con las posiciones iniciales asignadas, sin error |

## 7. Postcondiciones

**En caso de éxito:** la disposición del lienzo queda persistida en el proyecto SelfHosted y se restituye idéntica al reabrirlo; no hay ningún cambio pendiente originado por el gesto y ningún servicio queda marcado para redespliegue.

**En caso de fallo:** la disposición persistida es la de la última escritura completa; ningún cambio de configuración se ve afectado, porque la disposición es un atributo del proyecto y no entra al conjunto de cambios.

## 8. Criterios de aceptación

| ID | Given | When | Then |
| --- | --- | --- | --- |
| CA-01 | Un lienzo con el nodo `db` en la posición (520, 300) | El administrador arrastra `db` hasta (560, 320) y suelta | La disposición se guarda una sola vez al soltar y no entra ningún cambio al conjunto de cambios pendientes |
| CA-02 | El mismo lienzo, con la disposición ya guardada | El administrador recarga la vista del proyecto SelfHosted | El nodo `db` aparece en (560, 320): la disposición se conservó |
| CA-03 | Un lienzo con treinta nodos | El administrador arrastra un nodo durante tres segundos | El sistema no realiza ninguna escritura durante el gesto y realiza exactamente una al finalizarlo |
| CA-04 | Un proyecto SelfHosted con un conjunto de cambios pendientes vacío | El administrador reordena cinco nodos del lienzo | El conjunto de cambios pendientes sigue vacío y ningún servicio queda marcado como pendiente de redespliegue |

## 9. Trazabilidad

| Dimensión | Referencia |
| --- | --- |
| Necesidad de negocio | [NB-01](../../01-Necesidades-Negocio/Necesidades-De-Negocio/NB-01-Visibilidad-Unificada-De-La-Arquitectura.md) |
| Reglas de negocio aplicables | RN-12, RN-17. Reglas conceptuales: RC-17 |
| Historias de usuario a generar en 06 | US-CU-05-1 (arrastrar un nodo y conservar su posición), US-CU-05-2 (recuperar la disposición al reabrir el proyecto SelfHosted), US-CU-05-3 (agrupar nodos conservando la agrupación) |
| Componentes esperados en 05 | Capa `Web`, página del lienzo y su mecanismo de antirrebote; capa `Application`, módulo de proyectos; capa `Infrastructure`, `Persistencia`. Referencia tentativa |
| Tests previstos en 08 | T-22 (mover un nodo del lienzo: se guarda al instante y no entra al conjunto de cambios). Los umbrales de fluidez y de escrituras por gesto los mide la puerta técnica PT-01 |

Los identificadores de historia de usuario llevan la forma `US-CU-XX-n` y son **provisionales**: la numeración definitiva es potestad de 06-Backlog-Tecnico. La forma se eligió para que ningún identificador emitido acá colisione con la numeración que 06 asigne.

## 10. Notas y supuestos

- La disposición es un atributo del proyecto SelfHosted y no una entidad: la prueba de tres condiciones de D-12 la deja del lado de los atributos.
- El intake declara que la disposición se guarda en un único bloque y no repartida por nodo, porque se lee y se escribe siempre completa.
- **Brecha declarada:** el intake no declara el comportamiento esperado ante un fallo de la escritura de la disposición. Destinatario: 05-Arquitectura-Tecnica.
- La fluidez del arrastre y su mitigación pertenecen a 05-Arquitectura-Tecnica y a la puerta técnica PT-01.

## 11. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 2.0 | 2026-07-30 | Migración normativa del conjunto 4.1 al 6.0, fase M4 corte 3, bajo `Rules-Especificacion-Funcional` 4.0, `Vocabulario-Rules` 2.1 y `Migracion-Rules` 1.0. Clasificación **regenerar contenido** por el salto major de la regla que lo gobierna; fuente de contenido: **el documento de origen**, archivado sin modificar en `_legacy/2026-07-30/CU-05-Persistencia-Y-Recuperacion-De-La-Disposicion-v1.0.md`. Sube **major** porque la nomenclatura anterior deja de cumplir. **Cabecera:** la etiqueta `Proyecto` pasa a `Producto` sobre el mismo valor, porque `Vocabulario-Rules` §3 prohíbe la etiqueta de un plano de identidad sobre el valor de otro; se suma el campo `Proyecto de código` con el valor `SelfHosted-Service`, que §4.1 de la regla 4.0 exige por ser ésta una categoría de nivel proyecto de código (§4 R3) y que el PRODUCT-INTAKE §13 declara como `Nombre-Proyecto-Codigo`; la trazabilidad upstream cita el `PRODUCT-INTAKE` renombrado, antes `SOLUTION-INTAKE`. **Sustitución léxica por ocurrencia** según `Vocabulario-Rules` §9.5 y el plan de migración §3.5, y nunca por reemplazo global de cadena: las dos ocurrencias de «solución» designaban el nivel superior y pasan a «producto» con su concordancia de género —«Administrador de la solución» a «Administrador del producto» y «Registro de la solución» a «Registro del producto»—; no hay ninguna «solución de código» ni ninguna ocurrencia de la cadena `resoluci` en este documento, verificado por barrido. Las dieciséis ocurrencias de «proyecto» se clasificaron una por una y **ninguna pasó a «proyecto de código»**: diez llevan la forma calificada «proyecto SelfHosted»; cinco son la misma entidad del dominio en forma corta, admitida por el PRODUCT-INTAKE §12 donde el contexto ya fijó el sentido, y una era la etiqueta de cabecera. **Tabla de contenido:** suma la entrada de §13, que la sección tenía sin figurar. **Ningún propósito, actor, precondición, paso de flujo, flujo alternativo, excepción, postcondición, criterio de aceptación, referencia de trazabilidad, nota ni brecha cambió de contenido**: la migración es léxica y de forma de cabecera, y las filas anteriores de este control de cambios no se reescribieron. Origen: [Plan-Migracion-4.1-a-6.0.md](../../Audit/Plan-Migracion-4.1-a-6.0.md) §3.5 y §4 |
| 1.0 | 2026-07-29 | Corrección absorbida dentro de la versión 1.0, sin subirla y sin archivar, por la política de versionado de `Master-Prompt.md` §5: el documento está en estado `Propuesto` y la corrección proviene del audit de su propia fase de emisión. §2 suma la declaración de que los nombres de los actores no humanos son denominaciones acuñadas por esta categoría y no componentes declarados, con la salvedad de los seis que sí trazan a una fuente. Ningún actor cambia de nombre y ningún flujo se altera: lo que se corrige es que la categoría afirmaba que todo dato trazaba y trece de los diecinueve nombres de actor no humano no lo cumplían. Origen: hallazgo H-04 del informe [Audit/B-02-03-r1.md](../../Audit/B-02-03-r1.md) |
| 1.0 | 2026-07-29 | Versión inicial, derivada de la necesidad de negocio upstream y de las secciones del intake citadas en la cabecera |

## 13. Interacción multiusuario y concurrencia

Sección opcional admitida por §4.3 de `Rules-Especificacion-Funcional.md` para el tipo `web-monolith`. Conserva el número que esa sección le asigna, de modo que la numeración salta del 11 al 13 por construcción de la regla y no por omisión.

El intake declara que el consumo de memoria por circuito debe ser estable tras quince minutos de uso continuo y que treinta nodos actualizando su estado cada dos segundos no deben degradar el arrastre. Los dos umbrales los mide PT-01 y condicionan a 05-Arquitectura-Tecnica, no a este caso de uso.

