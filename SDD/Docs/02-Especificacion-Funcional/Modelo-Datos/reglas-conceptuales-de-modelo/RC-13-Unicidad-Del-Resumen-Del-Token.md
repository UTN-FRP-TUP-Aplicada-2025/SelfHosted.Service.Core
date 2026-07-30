# RC-13 — Unicidad del resumen del valor del token de API

**Proyecto:** SelfHosted Service
**Documento:** RC-13-Unicidad-Del-Resumen-Del-Token.md
**Versión:** 1.0
**Estado:** Propuesto
**Fecha:** 2026-07-29
**Autor:** Analista Funcional Senior (AG-02)

**Trazabilidad upstream:** SOLUTION-INTAKE anexo E-9, tabla `tokens_api`, restricción de unicidad sobre el resumen; E-16 RN-16; E-12; caso T-25

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

El resumen del valor de un token de API es único entre todos los tokens, y es lo único del valor que el modelo conserva.

## 2. Entidades involucradas

- Token de API.

## 3. Tipo de restricción

Identidad.

## 4. Mecanismo de verificación conceptual

Se comprueba verificando que ningún resumen se repita y que el modelo no conserve en ningún lado el valor del token. La verificación de que el valor se muestra una única vez pertenece a RN-16 y se prueba desde el caso de uso.

## 5. RN o CU que la justifican

- RN-16 Exhibición única y persistencia del resumen del token.
- CU-32, CU-33.

## 6. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 1.0 | 2026-07-29 | Versión inicial, derivada de la restricción declarada en la fuente citada en la cabecera. La regla transcribe la restricción; no la reinterpreta |
