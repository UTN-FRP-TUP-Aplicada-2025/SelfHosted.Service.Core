# CU-26 — Lectura del estado del servidor

**Proyecto de código:** SelfHosted-Service
**Producto:** SelfHosted Service
**Documento:** CU-26-Lectura-Del-Estado-Del-Servidor.md
**Versión:** 2.0
**Estado:** Propuesto
**Fecha:** 2026-07-30
**Autor:** Analista Funcional Senior (AG-02)

**Necesidad de negocio upstream:** [NB-07](../../01-Necesidades-Negocio/Necesidades-De-Negocio/NB-07-Atribucion-Del-Consumo-Del-Servidor.md)
**Trazabilidad upstream:** PRODUCT-INTAKE-SelfHosted-Service §4 capacidad F-12, primera capa del tablero; §5 historia 8; anexo E-15, endpoint de estado del sistema; §17.P.3, lectura del sistema de archivos virtual en modo sólo lectura; §17.P.10, frecuencia de sondeo y recolector único; §10, restricción de plataforma de destino

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

Permitir que el administrador vea el estado del servidor —procesador, memoria, intercambio y disco— para saber si la presión que percibe viene del equipo en su conjunto antes de buscar el servicio responsable.

## 2. Actores

| Actor | Tipo | Rol |
| --- | --- | --- |
| Administrador del producto | Primario | Consulta el estado del servidor |
| Recolector de métricas | Sistema | Lee el estado del sistema operativo y lo publica a los circuitos conectados |

Los nombres de los actores no humanos son **denominaciones acuñadas por esta categoría**, salvo los seis que trazan a una fuente: `Motor de contenedores`, `Destino externo`, `Automatismo de integración continua`, `Sincronizador de estado`, `Módulo de descubrimiento` y `Resolutor de referencias`. Los acuñados no son componentes declarados y no condicionan la descomposición: su correspondencia con los módulos que el intake §17.P.2 sí declara la fija 05-Arquitectura-Tecnica. La convención completa, nombre por nombre, está en [Especificacion-Funcional.md](../Especificacion-Funcional.md) §8.

## 3. Precondiciones

- El administrador tiene sesión iniciada (CU-30).
- El sistema de archivos virtual del sistema operativo está montado en modo sólo lectura.

## 4. Flujo principal

1. El administrador abre la vista de estado del servidor.
2. El recolector lee el estado del sistema operativo: uso de procesador, memoria, intercambio y disco.
3. El sistema publica el estado a los circuitos conectados. Un solo recolector publica a todos, y no hay un flujo por pestaña.
4. El sistema actualiza el estado con la frecuencia declarada mientras la vista permanece abierta.
5. Al cerrar la vista, el sistema deja de recolectar: el intake declara que no debe haber sondeo con las vistas cerradas.
6. El administrador lee el estado y decide si baja a la vista por proyecto SelfHosted o por contenedor. Ver CU-27.

## 5. Flujos alternativos

**FA-01 — Varias pestañas abiertas sobre la misma vista.**
Disparador: el administrador abre la vista en más de un circuito.
Pasos: el mismo recolector publica a todos los circuitos conectados, sin multiplicar el sondeo.
Punto de retorno: paso 4.

**FA-02 — Todas las vistas cerradas.**
Disparador: no queda ninguna vista abierta que consuma el estado.
Pasos: la recolección se detiene por completo.
Punto de retorno: paso 1.

## 6. Excepciones y errores

| Código | Causa | Respuesta del sistema |
| --- | --- | --- |
| Lectura no disponible | El sistema de archivos virtual no está montado o no es legible | El sistema informa que el estado no está disponible, sin degradar el resto de la interfaz. **El intake no declara el comportamiento esperado ante esta condición** y se declara brecha en §10 |
| Sondeo con vistas cerradas | Se recolecta estado sin ninguna vista abierta | Prohibido por el requisito no funcional declarado en §17.P.10 |

## 7. Postcondiciones

**En caso de éxito:** el administrador dispone del estado del servidor actualizado con la frecuencia declarada; existe un único recolector publicando a todos los circuitos; no queda recolección activa con las vistas cerradas.

**En caso de fallo:** el estado no se muestra y el sistema lo declara; ningún dato del registro del sistema se modifica: la lectura es de sólo lectura.

## 8. Criterios de aceptación

| ID | Given | When | Then |
| --- | --- | --- | --- |
| CA-01 | Un servidor con 32 GB de memoria y presión de intercambio | El administrador abre la vista de estado del servidor | El sistema muestra el uso de procesador, memoria, intercambio y disco del equipo |
| CA-02 | La vista de estado abierta en dos circuitos | El administrador observa las dos | Un solo recolector publica a los dos circuitos: no hay un flujo de recolección por pestaña |
| CA-03 | La vista de estado abierta | El administrador la cierra | El sistema deja de recolectar: no queda ningún sondeo activo con las vistas cerradas |
| CA-04 | La vista de estado abierta | Transcurre el intervalo de actualización declarado | El estado mostrado se refresca dentro de ese intervalo |

## 9. Trazabilidad

| Dimensión | Referencia |
| --- | --- |
| Necesidad de negocio | [NB-07](../../01-Necesidades-Negocio/Necesidades-De-Negocio/NB-07-Atribucion-Del-Consumo-Del-Servidor.md) |
| Reglas de negocio aplicables | Ninguna regla del catálogo E-16 restringe este caso de uso: sus restricciones son requerimientos no funcionales declarados en §17.P.10 —frecuencia de sondeo, recolector único, ausencia de sondeo con vistas cerradas— y no reglas de dominio. Se declara explícitamente para que la ausencia no se lea como omisión |
| Historias de usuario a generar en 06 | US-CU-26-1 (ver el estado del servidor), US-CU-26-2 (actualizar el estado con la frecuencia declarada), US-CU-26-3 (detener la recolección al cerrar las vistas) |
| Componentes esperados en 05 | Capa `Web`, vista de tablero y controlador del recurso de estado, admitido como interfaz mínima por su frecuencia; capa `Application`, módulo de observabilidad; capa `Infrastructure`, `Sistema`. Referencia tentativa |
| Tests previstos en 08 | Casos a derivar por 08-Calidad-Y-Pruebas a partir de los umbrales de §17.P.10. El anexo E-22 no declara casos propios del tablero |

Los identificadores de historia de usuario llevan la forma `US-CU-XX-n` y son **provisionales**: la numeración definitiva es potestad de 06-Backlog-Tecnico. La forma se eligió para que ningún identificador emitido acá colisione con la numeración que 06 asigne.

## 10. Notas y supuestos

- El intake declara que el administrador debe ser liviano: presupuesto de cientos de MB y sin sondeo agresivo de métricas, sobre un servidor de generación antigua con presión de intercambio.
- El producto no monitorea por peticiones contra los servicios: cuando los contenedores corren en macvlan el host no los alcanza por la misma placa. La fuente de verdad es el motor de contenedores.
- **Brecha declarada:** el intake no declara el comportamiento esperado cuando la lectura del estado del sistema operativo no está disponible. Destinatario: 05-Arquitectura-Tecnica.
- La capacidad F-12 es `Should Have` por declaración del intake §4.

## 11. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 2.0 | 2026-07-30 | Migración normativa del conjunto 4.1 al 6.0, fase M4 corte 3, bajo `Rules-Especificacion-Funcional` 4.0, `Vocabulario-Rules` 2.1 y `Migracion-Rules` 1.0. Clasificación **regenerar contenido** por el salto major de la regla que lo gobierna; fuente de contenido: el documento de origen, archivado en `_legacy/2026-07-30/CU-26-Lectura-Del-Estado-Del-Servidor-v1.0.md`. Sube **major** porque la nomenclatura anterior deja de cumplir. Cabecera: la etiqueta `Proyecto` pasa a `Producto` sobre el mismo valor, que `Vocabulario-Rules` §3 prohíbe como etiqueta de un plano sobre el valor de otro, y la trazabilidad upstream apunta al `PRODUCT-INTAKE-SelfHosted-Service` renombrado. Sustitución léxica **por ocurrencia** según `Vocabulario-Rules` §9.5 y el plan de migración §3.5, sin ningún reemplazo global de cadena: se revisó la única ocurrencia de la cadena `soluci` de este documento y se sustituyó, todas designando el nivel superior y todas con su concordancia de género —el nombre del actor primario «Administrador de la solución» de §2, que pasa a «Administrador del producto»—; no hay en este documento ninguna «solución de código» ni ningún uso de prosa de negocio que R2 preserve. Este documento no trae ninguna ocurrencia de «re**soluci**ón», de modo que la trampa de la subcadena no aplicó acá, y así queda registrado. De las dos ocurrencias de «proyecto», **ninguna pasó a «proyecto de código»**: la única ocurrencia del cuerpo es «proyecto SelfHosted», la entidad del dominio, en el paso 6; ninguna es el emprendimiento; la restante era la etiqueta de cabecera. La clasificación sigue el intake §12, que declara los tres referentes del término, y el glosario del dominio de `Vision-Producto.md` §9. **Glosario**: §2.1 y §4.2.4 de la regla convierten el vocabulario de la categoría en el artefacto propio y obligatorio `Glosario-Funcional.md`, que hasta la 3.0 era el punto 6 de `Modelo-Conceptual.md` y por lo tanto dependía de que el proyecto de código tuviera persistencia. Este caso de uso **no lo emite**: los términos que acuña o precisa y que aparecen en más de un artefacto de 02 se devolvieron al lote que lo emite, por la regla de inclusión de §3.3, y los que ya declara el glosario del dominio de `Vision-Producto.md` §9 se referencian en lugar de redefinirse, por la regla de no duplicación de la misma sección. Las once secciones obligatorias de §4.2 ya estaban completas y no se agregó ni se quitó ninguna; la tabla de contenido de §4.1 y la sección opcional §13 que §4.3 admite para `web-monolith` quedan como estaban. Ningún propósito, actor, precondición, paso del flujo principal, flujo alternativo, excepción, postcondición, criterio de aceptación, regla de negocio aplicable, historia de usuario prevista, componente esperado, test previsto ni brecha declarada cambió de enunciado: la migración es léxica y de forma de cabecera. Las filas históricas de esta tabla **no se reescribieron**, por `SDD-Development-Guide.md` §VI.2 |
| 1.0 | 2026-07-29 | Corrección absorbida dentro de la versión 1.0, sin subirla y sin archivar, por la política de versionado de `Master-Prompt.md` §5: el documento está en estado `Propuesto`. Se califica la forma «el registro» a secas, que tenía tres referentes distintos en la categoría y no era resoluble leyendo esta sección por separado, que es como se generan los artefactos de las categorías siguientes. La entrada de glosario con los cuatro referentes vive en `Modelo-Datos/Modelo-Conceptual.md` §6. Las formas ya calificadas no se tocaron: no colisionan. |
| 1.0 | 2026-07-29 | Corrección absorbida dentro de la versión 1.0, sin subirla y sin archivar, por la política de versionado de `Master-Prompt.md` §5: el documento está en estado `Propuesto` y la corrección proviene del audit de su propia fase de emisión. §2 suma la declaración de que los nombres de los actores no humanos son denominaciones acuñadas por esta categoría y no componentes declarados, con la salvedad de los seis que sí trazan a una fuente. Ningún actor cambia de nombre y ningún flujo se altera: lo que se corrige es que la categoría afirmaba que todo dato trazaba y trece de los diecinueve nombres de actor no humano no lo cumplían. Origen: hallazgo H-04 del informe [Audit/B-02-03-r1.md](../../Audit/B-02-03-r1.md) |
| 1.0 | 2026-07-29 | Versión inicial, derivada de la necesidad de negocio upstream y de las secciones del intake citadas en la cabecera |

## 13. Interacción multiusuario y concurrencia

Sección opcional admitida por §4.3 de `Rules-Especificacion-Funcional.md` para el tipo `web-monolith`. Conserva el número que esa sección le asigna, de modo que la numeración salta del 11 al 13 por construcción de la regla y no por omisión.

El intake declara que un solo recolector publica a todos los circuitos conectados y no un flujo por pestaña, y que no debe haber recolección con las vistas cerradas. Los dos son requisitos de concurrencia declarados en §17.P.10.

