# RC-03 — Unicidad de la clave de variable dentro de su servicio

**Proyecto:** SelfHosted Service
**Documento:** RC-03-Unicidad-De-La-Clave-De-Variable-En-Su-Servicio.md
**Versión:** 1.0
**Estado:** Propuesto
**Fecha:** 2026-07-29
**Autor:** Analista Funcional Senior (AG-02)

**Trazabilidad upstream:** SOLUTION-INTAKE anexo E-9, tabla `variables`, restricción de unicidad sobre servicio y clave; E-16 RN-28; D-12 consecuencia 2

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

Dos variables del mismo servicio no pueden compartir clave, porque la clave es el contrato con el proceso que corre en el contenedor.

## 2. Entidades involucradas

- Variable de servicio.
- Servicio.

## 3. Tipo de restricción

Identidad, acotada al ámbito del servicio.

## 4. Mecanismo de verificación conceptual

Se comprueba, dentro de un servicio, que la clave propuesta no coincida con la de ninguna otra variable del mismo servicio. Es uno de los dos únicos ámbitos donde el modelo exige nombre único.

## 5. RN o CU que la justifican

- RN-28 Unicidad de la clave según el ámbito de la variable.
- RN-32 Variables provistas por el sistema y prefijo reservado.
- CU-03, CU-35.

## 6. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 1.0 | 2026-07-29 | Versión inicial, derivada de la restricción declarada en la fuente citada en la cabecera. La regla transcribe la restricción; no la reinterpreta |
