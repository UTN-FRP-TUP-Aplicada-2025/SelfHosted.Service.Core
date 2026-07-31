# RN-35 — Vínculo por identidad y nunca por nombre

**Proyecto de código:** SelfHosted-Service
**Producto:** SelfHosted Service
**Documento:** RN-35-Vinculo-Por-Identidad-Y-Nunca-Por-Nombre.md
**Versión:** 2.0
**Estado:** Propuesto
**Fecha:** 2026-07-30
**Autor:** Analista Funcional Senior (AG-02)

**Trazabilidad upstream:** PRODUCT-INTAKE-SelfHosted-Service anexo E-16, fila RN-35. **Autoría declarada en la fuente:** **[D]** completa, decisión D-12.

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

Las relaciones entre objetos se establecen por identidad y nunca por nombre. Todo elemento que se referencia, que sobrevive al objeto que lo contiene o que tiene ciclo de vida propio es un objeto con identidad; el nombre es un atributo suyo. En particular, el secreto y la red del proyecto son objetos, y una referencia vincula el servicio y la variable, no sus nombres.

## 2. Justificación

La prueba de tres condiciones existe para que el principio no degenere en una entidad por atributo. El principio además disuelve los dos conflictos de instanciación que el intake registraba como pendientes, en lugar de resolverlos con una regla más.

## 3. Ámbito de aplicación

**Momento de validación declarado en el anexo E-16:** Alta y edición de cualquier vínculo.

Se evalúa en toda alta y edición de un vínculo del modelo. Su materialización relacional es materia de la Fase C y de 05-Arquitectura-Tecnica.

## 4. Consecuencia si se viola

Invariante del modelo. Su materialización relacional es materia de la Fase C.

## 5. CU afectados

CU-01, CU-02, CU-03, CU-04, CU-34, CU-35, CU-36.

## 6. Pruebas que la verifican

- T-58: renombrar una variable referenciada. La expresión sigue apuntando a la misma variable.
- T-59: dos variables compartidas con la misma clave y valores distintos. Cada referencia resuelve a su objeto: la clave no las identifica.
- T-60: instanciar con un nombre de servicio que ya existe. Ninguna referencia del subgrafo se rompe, porque apuntan a identidades.

Las pruebas se realizan en 08-Calidad-Y-Pruebas. El anexo E-22 declara los casos con entrada concreta y resultado esperado, y el anexo E-16 declara que el catálogo está pensado para que cada regla se traduzca en una prueba automatizada.

## 7. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 2.0 | 2026-07-30 | Migración normativa del conjunto 4.1 al 6.0, fase M4 corte 3, bajo `Rules-Especificacion-Funcional` 4.0 y `Vocabulario-Rules` 2.1. Clasificación **regenerar contenido** por el salto major de la regla que la gobierna; fuente de contenido: el documento de origen, archivado en `_legacy/2026-07-30/`. Sube **major** porque la nomenclatura anterior deja de cumplir. Cabecera: la etiqueta `Proyecto` pasa a `Producto` sobre el mismo valor, según `Vocabulario-Rules` §3, y la trazabilidad upstream apunta al `PRODUCT-INTAKE-SelfHosted-Service` renombrado. Sustitución léxica **por ocurrencia** según `Vocabulario-Rules` §9.5 y el plan de migración §3.5: **cero ocurrencias de «solución»** y por lo tanto cero sustituciones; tampoco hay «resolución». Las dos ocurrencias de «proyecto» se clasificaron por referente y **ninguna pasó a «proyecto de código»**: una es la entidad del dominio —«la red del proyecto» en el enunciado de §1, donde la red es un objeto del proyecto SelfHosted— y queda intacta según el PRODUCT-INTAKE §12 y el glosario raíz de `Vision-Producto.md` §9; la restante era la etiqueta de cabecera. Cero ocurrencias del emprendimiento. **El enunciado de la invariante no cambió**: las relaciones siguen estableciéndose por identidad y nunca por nombre, y la prueba de tres condiciones sigue siendo la que decide qué es objeto y qué es atributo. La migración es léxica y de forma de cabecera |
| 1.0 | 2026-07-29 | Versión inicial. Transcripción del enunciado, del momento de validación y de la respuesta ante incumplimiento que declara el anexo E-16 del intake. No se reinterpreta ninguno de los tres |
