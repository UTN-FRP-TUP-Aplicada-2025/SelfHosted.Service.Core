# RN-36 — Sufijo automático al instanciar un nombre existente

**Proyecto de código:** SelfHosted-Service
**Producto:** SelfHosted Service
**Documento:** RN-36-Sufijo-Automatico-Al-Instanciar-Un-Nombre-Existente.md
**Versión:** 2.0
**Estado:** Propuesto
**Fecha:** 2026-07-30
**Autor:** Analista Funcional Senior (AG-02)

**Trazabilidad upstream:** PRODUCT-INTAKE-SelfHosted-Service anexo E-16, fila RN-36. **Autoría declarada en la fuente:** **[D]** completa, decisión D-13.

---

## Tabla de contenido

- [1. Enunciado de la regla](#1-enunciado-de-la-regla)
- [2. Justificación](#2-justificación)
- [3. Ámbito de aplicación](#3-ámbito-de-aplicación)
- [4. Consecuencia si se viola](#4-consecuencia-si-se-viola)
- [5. CU afectados](#5-cu-afectados)
- [6. Pruebas que la verifican](#6-pruebas-que-la-verifican)
- [7. Control de cambios](#7-control-de-cambios)

---

## 1. Enunciado de la regla

Al instanciar un ítem del catálogo, si el nombre de un servicio del subgrafo ya existe en el proyecto SelfHosted destino, el sistema sufija automáticamente e informa qué sufijó; no rechaza y no pregunta. Como la identidad ya es el identificador, sufijar no rompe ninguna referencia y renombrar después es gratis. Una clave de variable que ya existe no es conflicto: se crea el objeto nuevo y se advierte según RN-37.

## 2. Justificación

Es la inversión que declara D-13: en lugar de preguntar antes de instanciar y obligar al usuario a decidir a ciegas, el sistema crea lo seguro y después informa. La decisión se toma con la información delante y es reversible.

## 3. Ámbito de aplicación

**Momento de validación declarado en el anexo E-16:** Instanciación.

Se evalúa al instanciar un ítem del catálogo en un proyecto SelfHosted que ya tiene un servicio con alguno de los nombres del subgrafo.

## 4. Consecuencia si se viola

Servicio creado con nombre sufijado, y aviso no bloqueante con el nombre asignado.

## 5. CU afectados

CU-16.

## 6. Pruebas que la verifican

- T-60: instanciar `cat-api-con-base` en un proyecto que ya tiene un servicio con el nombre resultante. El servicio se crea sufijado y el sistema informa cuál asignó. No se rechaza y no se pregunta.

Las pruebas se realizan en 08-Calidad-Y-Pruebas. El anexo E-22 declara los casos con entrada concreta y resultado esperado, y el anexo E-16 declara que el catálogo está pensado para que cada regla se traduzca en una prueba automatizada.

## 7. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 2.0 | 2026-07-30 | Migración normativa del conjunto 4.1 al 6.0, fase M4 corte 3, bajo `Rules-Especificacion-Funcional` 4.0 y `Vocabulario-Rules` 2.1. Clasificación **regenerar contenido** por el salto major de la regla que la gobierna; fuente de contenido: el documento de origen, archivado en `_legacy/2026-07-30/`. Sube **major** porque la nomenclatura anterior deja de cumplir. Cabecera: la etiqueta `Proyecto` pasa a `Producto` sobre el mismo valor, según `Vocabulario-Rules` §3, y la trazabilidad upstream apunta al `PRODUCT-INTAKE-SelfHosted-Service` renombrado. Sustitución léxica **por ocurrencia** según `Vocabulario-Rules` §9.5 y el plan de migración §3.5: **cero ocurrencias de «solución»** y por lo tanto cero sustituciones; tampoco hay «resolución». Las cuatro ocurrencias de «proyecto» se clasificaron por referente y **ninguna pasó a «proyecto de código»**: tres son la entidad del dominio —«el proyecto SelfHosted destino» en §1, «un proyecto SelfHosted que ya tiene un servicio» en §3 y «un proyecto que ya tiene un servicio con el nombre resultante» en §6— y quedan intactas según el PRODUCT-INTAKE §12 y el glosario raíz de `Vision-Producto.md` §9; la restante era la etiqueta de cabecera. Cero ocurrencias del emprendimiento. **El enunciado de la invariante no cambió**: el sistema sigue sufijando e informando, sigue sin rechazar y sin preguntar, y la clave de variable repetida sigue no siendo conflicto. La migración es léxica y de forma de cabecera |
| 1.0 | 2026-07-29 | Versión inicial. Transcripción del enunciado, del momento de validación y de la respuesta ante incumplimiento que declara el anexo E-16 del intake. No se reinterpreta ninguno de los tres |
