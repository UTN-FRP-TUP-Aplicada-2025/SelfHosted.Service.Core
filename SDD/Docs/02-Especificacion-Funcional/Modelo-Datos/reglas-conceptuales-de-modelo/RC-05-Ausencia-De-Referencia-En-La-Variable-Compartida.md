# RC-05 — Ausencia de referencia en la variable compartida del proyecto

**Proyecto:** SelfHosted Service
**Documento:** RC-05-Ausencia-De-Referencia-En-La-Variable-Compartida.md
**Versión:** 1.0
**Estado:** Propuesto
**Fecha:** 2026-07-29
**Autor:** Analista Funcional Senior (AG-02)

**Trazabilidad upstream:** SOLUTION-INTAKE anexo E-9, tabla `variables_proyecto`, nota que declara la ausencia de columna de referencia y su fundamento; E-4 punto 2; E-16 RN-22. Especificación derivada DI-08, sin revisar: se consume como revisable

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

Una variable compartida del proyecto contiene siempre un literal o material secreto, nunca una expresión de referencia a otra variable.

## 2. Entidades involucradas

- Variable compartida del proyecto.
- Variable de servicio.
- Secreto.

## 3. Tipo de restricción

Valor permitido.

## 4. Mecanismo de verificación conceptual

Se comprueba verificando que ninguna variable compartida admita una expresión de referencia como valor. Es la forma en que el modelo hace cumplir que ningún ciclo de resolución atraviese el nivel proyecto: sin referencia en el nivel compartido, la cadena de resolución no puede volver por ahí.

## 5. RN o CU que la justifican

- RN-22 Prohibición del ciclo de valor.
- CU-34, CU-35.

## 6. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 1.0 | 2026-07-29 | Versión inicial, derivada de la restricción declarada en la fuente citada en la cabecera. La regla transcribe la restricción; no la reinterpreta |
