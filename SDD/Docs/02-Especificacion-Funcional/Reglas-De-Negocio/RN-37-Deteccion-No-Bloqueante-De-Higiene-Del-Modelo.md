# RN-37 — Detección no bloqueante de higiene del modelo

**Proyecto de código:** SelfHosted-Service
**Producto:** SelfHosted Service
**Documento:** RN-37-Deteccion-No-Bloqueante-De-Higiene-Del-Modelo.md
**Versión:** 2.0
**Estado:** Propuesto
**Fecha:** 2026-07-30
**Autor:** Analista Funcional Senior (AG-02)

**Trazabilidad upstream:** PRODUCT-INTAKE-SelfHosted-Service anexo E-16, fila RN-37. **Autoría declarada en la fuente:** **[D]** completa, decisión D-13.

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

El sistema detecta y advierte, sin bloquear, cinco condiciones de higiene del modelo: variable compartida sin ninguna referencia; dos elementos con el mismo nombre visible en el mismo ámbito; al instanciar, una clave que ya existe con el mismo valor, donde sí se ofrece reusar; al instanciar, una clave que ya existe con distinto valor, donde se crean separadas y se avisa; y referencia que quedó sin uso tras un cambio.

## 2. Justificación

Es la capacidad que la identidad de objeto vuelve barata: con cada elemento identificado, detectar que dos se llaman igual o que nadie referencia a un tercero es una consulta y no un análisis. Es estrictamente informativa: ningún flujo de usuario depende de ella y nada falla si no está.

## 3. Ámbito de aplicación

**Momento de validación declarado en el anexo E-16:** Instanciación, alta y edición, y revisión periódica del proyecto.

Se evalúa al instanciar un ítem del catálogo, al dar de alta y editar elementos del modelo, y en la revisión periódica del proyecto SelfHosted.

## 4. Consecuencia si se viola

Aviso informativo. Ninguna condición bloquea ninguna operación.

## 5. CU afectados

CU-16, CU-34, CU-35, CU-36.

## 6. Pruebas que la verifican

- T-61: instanciar una plantilla que declara una clave compartida que ya existe con el mismo valor. Se crea el objeto nuevo y se advierte ofreciendo reusar; la operación no se bloquea.
- T-62: la misma plantilla en un proyecto que ya tiene la clave con distinto valor. Se crean separadas y se avisa; no se ofrece reusar.
- T-63: crear una variable compartida y no referenciarla. El sistema la reporta como huérfana, sin bloquear.
- T-42: segunda variable compartida con la misma clave y el mismo valor. Advertencia no bloqueante.

Las pruebas se realizan en 08-Calidad-Y-Pruebas. El anexo E-22 declara los casos con entrada concreta y resultado esperado, y el anexo E-16 declara que el catálogo está pensado para que cada regla se traduzca en una prueba automatizada.

## 7. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 2.0 | 2026-07-30 | Migración normativa del conjunto 4.1 al 6.0, fase M4 corte 3, bajo `Rules-Especificacion-Funcional` 4.0 y `Vocabulario-Rules` 2.1. Clasificación **regenerar contenido** por el salto major de la regla que la gobierna; fuente de contenido: el documento de origen, archivado en `_legacy/2026-07-30/`. Sube **major** porque la nomenclatura anterior deja de cumplir. Cabecera: la etiqueta `Proyecto` pasa a `Producto` sobre el mismo valor, según `Vocabulario-Rules` §3, y la trazabilidad upstream apunta al `PRODUCT-INTAKE-SelfHosted-Service` renombrado. Sustitución léxica **por ocurrencia** según `Vocabulario-Rules` §9.5 y el plan de migración §3.5: **cero ocurrencias de «solución»** y por lo tanto cero sustituciones; tampoco hay «resolución». Las cuatro ocurrencias de «proyecto» se clasificaron por referente y **ninguna pasó a «proyecto de código»**: tres son la entidad del dominio —«revisión periódica del proyecto» y «del proyecto SelfHosted» en §3, «un proyecto que ya tiene la clave con distinto valor» en §6— y quedan intactas según el PRODUCT-INTAKE §12 y el glosario raíz de `Vision-Producto.md` §9; la restante era la etiqueta de cabecera. Cero ocurrencias del emprendimiento. **El enunciado de la invariante no cambió**: las cinco condiciones de higiene siguen siendo las mismas, en el mismo orden, y siguen advirtiendo sin bloquear. La migración es léxica y de forma de cabecera |
| 1.0 | 2026-07-29 | Versión inicial. Transcripción del enunciado, del momento de validación y de la respuesta ante incumplimiento que declara el anexo E-16 del intake. No se reinterpreta ninguno de los tres |
