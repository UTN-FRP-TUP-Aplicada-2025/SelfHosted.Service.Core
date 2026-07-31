# RC-11 — Coherencia entre la referencia y su momento de resolución

**Proyecto:** SelfHosted Service
**Documento:** RC-11-Coherencia-Entre-Referencia-Y-Resolucion.md
**Versión:** 1.0
**Estado:** Propuesto
**Fecha:** 2026-07-29
**Autor:** Analista Funcional Senior (AG-02)

**Trazabilidad upstream:** SOLUTION-INTAKE anexo E-9, tabla `variables`, condición que liga referencia y momento de resolución; E-16 RN-24. Especificación derivada DI-04, sin revisar: se consume como revisable

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

Una variable de servicio sólo puede tener momento de última resolución si tiene una referencia sin resolver. Una variable con valor literal no tiene resolución.

## 2. Entidades involucradas

- Variable de servicio.

## 3. Tipo de restricción

Derivación.

## 4. Mecanismo de verificación conceptual

Se comprueba verificando que toda variable con momento de resolución registrado tenga también una referencia. El último valor resuelto es una materialización que se reescribe en cada resolución, no un dato editable a mano.

## 5. RN o CU que la justifican

- RN-24 Resolución de la referencia antes de crear el contenedor.
- CU-35.

## 6. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 1.0 | 2026-07-29 | Versión inicial, derivada de la restricción declarada en la fuente citada en la cabecera. La regla transcribe la restricción; no la reinterpreta |
