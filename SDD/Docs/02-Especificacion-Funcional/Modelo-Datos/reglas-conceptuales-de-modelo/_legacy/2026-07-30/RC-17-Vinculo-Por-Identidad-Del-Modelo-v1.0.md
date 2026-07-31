# RC-17 — Vínculo por identidad y nunca por nombre

**Proyecto:** SelfHosted Service
**Documento:** RC-17-Vinculo-Por-Identidad-Del-Modelo.md
**Versión:** 1.0
**Estado:** Propuesto
**Fecha:** 2026-07-29
**Autor:** Analista Funcional Senior (AG-02)

**Trazabilidad upstream:** SOLUTION-INTAKE anexo E-9, bloque de identidad de objeto (D-12, quinta pasada); E-16 RN-33 y RN-35; §17.P.11 decisiones del modelo de dominio; casos T-55 y T-58

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

Toda relación entre objetos del modelo se establece por la identidad del objeto y nunca por su nombre. El nombre es un atributo del objeto y puede cambiar sin romper ninguna relación.

## 2. Entidades involucradas

- Todas las entidades del modelo, y en particular Servicio, Variable de servicio, Variable compartida del proyecto, Secreto y Red del proyecto.

## 3. Tipo de restricción

Identidad.

## 4. Mecanismo de verificación conceptual

Se comprueba renombrando un elemento referenciado y verificando que toda relación que le apuntaba siga apuntando al mismo objeto, que el valor resuelto no cambie y que no aparezca ningún cambio pendiente. La comprobación es negativa: lo que se verifica es que nada se rompió.

## 5. RN o CU que la justifican

- RN-33 Invariancia de las referencias ante el renombrado.
- RN-35 Vínculo por identidad y nunca por nombre.
- CU-02, CU-03, CU-04, CU-34, CU-35.

## 6. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 1.0 | 2026-07-29 | Versión inicial, derivada de la restricción declarada en la fuente citada en la cabecera. La regla transcribe la restricción; no la reinterpreta |
