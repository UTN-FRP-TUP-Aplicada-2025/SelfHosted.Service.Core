# RC-06 — Irreflexividad del enlace

**Proyecto:** SelfHosted Service
**Documento:** RC-06-Irreflexividad-Del-Enlace.md
**Versión:** 1.0
**Estado:** Propuesto
**Fecha:** 2026-07-29
**Autor:** Analista Funcional Senior (AG-02)

**Trazabilidad upstream:** SOLUTION-INTAKE anexo E-9, tabla `enlaces`, condición que exige origen distinto de destino; E-2, verificación de que una referencia a variables del propio servicio no genera arista

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

El servicio de origen y el servicio de destino de un enlace deben ser distintos.

## 2. Entidades involucradas

- Enlace.
- Servicio.

## 3. Tipo de restricción

Referencial.

## 4. Mecanismo de verificación conceptual

Se comprueba verificando que ningún enlace tenga el mismo servicio en sus dos extremos. Una referencia de una variable de un servicio a otra variable del mismo servicio es legítima y no produce enlace, de modo que la restricción no la alcanza.

## 5. RN o CU que la justifican

- RN-34 Aporte obligatorio de la arista.
- CU-04, CU-11.

## 6. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 1.0 | 2026-07-29 | Versión inicial, derivada de la restricción declarada en la fuente citada en la cabecera. La regla transcribe la restricción; no la reinterpreta |
