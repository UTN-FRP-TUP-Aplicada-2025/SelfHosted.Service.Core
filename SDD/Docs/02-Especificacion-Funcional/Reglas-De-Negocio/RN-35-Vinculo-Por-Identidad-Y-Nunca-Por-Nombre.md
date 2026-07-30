# RN-35 — Vínculo por identidad y nunca por nombre

**Proyecto:** SelfHosted Service
**Documento:** RN-35-Vinculo-Por-Identidad-Y-Nunca-Por-Nombre.md
**Versión:** 1.0
**Estado:** Propuesto
**Fecha:** 2026-07-29
**Autor:** Analista Funcional Senior (AG-02)

**Trazabilidad upstream:** SOLUTION-INTAKE-SelfHosted-Service anexo E-16, fila RN-35. **Autoría declarada en la fuente:** **[D]** completa, decisión D-12.

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
| 1.0 | 2026-07-29 | Versión inicial. Transcripción del enunciado, del momento de validación y de la respuesta ante incumplimiento que declara el anexo E-16 del intake. No se reinterpreta ninguno de los tres |
