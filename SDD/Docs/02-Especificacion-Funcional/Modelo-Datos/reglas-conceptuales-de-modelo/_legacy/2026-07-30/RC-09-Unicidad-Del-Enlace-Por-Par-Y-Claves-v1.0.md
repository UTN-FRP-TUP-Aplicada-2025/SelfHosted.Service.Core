# RC-09 — Unicidad del enlace por par de servicios y par de claves

**Proyecto:** SelfHosted Service
**Documento:** RC-09-Unicidad-Del-Enlace-Por-Par-Y-Claves.md
**Versión:** 1.0
**Estado:** Propuesto
**Fecha:** 2026-07-29
**Autor:** Analista Funcional Senior (AG-02)

**Trazabilidad upstream:** SOLUTION-INTAKE anexo E-9, tabla `enlaces`, restricción de unicidad sobre origen, clave de variable, destino y clave de destino

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

No pueden existir dos enlaces con el mismo servicio de origen, el mismo servicio de destino, la misma clave de variable de origen y la misma clave referenciada del destino.

## 2. Entidades involucradas

- Enlace.
- Servicio.

## 3. Tipo de restricción

Identidad.

## 4. Mecanismo de verificación conceptual

Se comprueba verificando que la cuádrupla de origen, clave de origen, destino y clave de destino no se repita. Una misma variable puede contener varias referencias y sostener entonces varios enlaces, que se distinguen por la clave referenciada del destino.

## 5. RN o CU que la justifican

- RN-34 Aporte obligatorio de la arista.
- CU-04.

## 6. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 1.0 | 2026-07-29 | Versión inicial, derivada de la restricción declarada en la fuente citada en la cabecera. La regla transcribe la restricción; no la reinterpreta |
