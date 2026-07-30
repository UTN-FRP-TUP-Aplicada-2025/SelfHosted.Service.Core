# RC-10 — Unicidad del enlace de espera sin variable entre un par de servicios

**Proyecto:** SelfHosted Service
**Documento:** RC-10-Unicidad-Del-Enlace-De-Espera-Sin-Variable.md
**Versión:** 1.0
**Estado:** Propuesto
**Fecha:** 2026-07-29
**Autor:** Analista Funcional Senior (AG-02)

**Trazabilidad upstream:** SOLUTION-INTAKE anexo E-9, índice único parcial declarado en la tercera pasada, con su fundamento explícito; E-16 RN-34; caso T-56. Especificación derivada DI-16, sin revisar: se consume como revisable

---

## Tabla de contenido

- [1. Enunciado](#1-enunciado)
- [2. Entidades involucradas](#2-entidades-involucradas)
- [3. Tipo de restricción](#3-tipo-de-restricción)
- [4. Mecanismo de verificación conceptual](#4-mecanismo-de-verificación-conceptual)
- [5. RN o CU que la justifican](#5-rn-o-cu-que-la-justifican)
- [6. Control de cambios](#6-control-de-cambios)

---

## 1. Enunciado

Entre dos servicios no puede haber más de un enlace de espera sin variable asociada.

## 2. Entidades involucradas

- Enlace.
- Servicio.

## 3. Tipo de restricción

Cardinalidad.

## 4. Mecanismo de verificación conceptual

Se comprueba verificando, sobre el subconjunto de enlaces sin clave de variable, que cada par de servicios de origen y destino aparezca como máximo una vez. La restricción es necesaria porque la unicidad general de RC-09 no alcanza a expresarla cuando las claves están ausentes.

## 5. RN o CU que la justifican

- RN-34 Aporte obligatorio de la arista.
- CU-04, CU-11.

## 6. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 1.0 | 2026-07-29 | Versión inicial, derivada de la restricción declarada en la fuente citada en la cabecera. La regla transcribe la restricción; no la reinterpreta |
