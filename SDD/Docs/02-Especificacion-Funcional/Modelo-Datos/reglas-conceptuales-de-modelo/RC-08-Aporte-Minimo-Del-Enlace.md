# RC-08 — Aporte mínimo del enlace

**Proyecto:** SelfHosted Service
**Documento:** RC-08-Aporte-Minimo-Del-Enlace.md
**Versión:** 1.0
**Estado:** Propuesto
**Fecha:** 2026-07-29
**Autor:** Analista Funcional Senior (AG-02)

**Trazabilidad upstream:** SOLUTION-INTAKE anexo E-9, tabla `enlaces`, condición que exige clave de variable o espera; E-16 RN-34; caso T-57. Especificación derivada DI-15, sin revisar: se consume como revisable

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

Todo enlace debe referenciar una variable del destino, declarar espera al destino, o las dos cosas. No existe enlace que no aporte ninguna de las dos.

## 2. Entidades involucradas

- Enlace.
- Servicio.

## 3. Tipo de restricción

Valor permitido.

## 4. Mecanismo de verificación conceptual

Se comprueba verificando que todo enlace tenga clave de variable, o espera declarada, o ambas. Un enlace sin ninguna de las dos es una fila sin significado y la restricción lo impide.

## 5. RN o CU que la justifican

- RN-34 Aporte obligatorio de la arista.
- CU-04.

## 6. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 1.0 | 2026-07-29 | Versión inicial, derivada de la restricción declarada en la fuente citada en la cabecera. La regla transcribe la restricción; no la reinterpreta |
