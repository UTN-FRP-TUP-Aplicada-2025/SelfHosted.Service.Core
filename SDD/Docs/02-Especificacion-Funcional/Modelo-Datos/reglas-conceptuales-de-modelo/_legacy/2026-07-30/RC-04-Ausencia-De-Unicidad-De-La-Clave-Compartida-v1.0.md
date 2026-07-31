# RC-04 — Ausencia de unicidad de la clave de una variable compartida

**Proyecto:** SelfHosted Service
**Documento:** RC-04-Ausencia-De-Unicidad-De-La-Clave-Compartida.md
**Versión:** 1.0
**Estado:** Propuesto
**Fecha:** 2026-07-29
**Autor:** Analista Funcional Senior (AG-02)

**Trazabilidad upstream:** SOLUTION-INTAKE anexo E-9, tabla `variables_proyecto`, nota que declara la ausencia de clave única y su fundamento; E-16 RN-28; D-12 consecuencia 2; casos T-42 y T-59

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

La clave de una variable compartida del proyecto no exige unicidad dentro del proyecto SelfHosted: dos compartidas pueden llamarse igual y se distinguen por identidad.

## 2. Entidades involucradas

- Variable compartida del proyecto.
- Proyecto SelfHosted.

## 3. Tipo de restricción

Identidad, por ausencia deliberada de restricción.

## 4. Mecanismo de verificación conceptual

Se comprueba por lo contrario de una unicidad: crear una segunda variable compartida con una clave ya existente debe ser aceptado y las dos deben coexistir, resolviendo cada referencia a su propio objeto. Que dos coincidan además en el valor es materia de la advertencia no bloqueante de RN-37.

## 5. RN o CU que la justifican

- RN-28 Unicidad de la clave según el ámbito de la variable.
- RN-37 Detección no bloqueante de higiene del modelo.
- CU-34, CU-36.

## 6. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 1.0 | 2026-07-29 | Versión inicial, derivada de la restricción declarada en la fuente citada en la cabecera. La regla transcribe la restricción; no la reinterpreta |
