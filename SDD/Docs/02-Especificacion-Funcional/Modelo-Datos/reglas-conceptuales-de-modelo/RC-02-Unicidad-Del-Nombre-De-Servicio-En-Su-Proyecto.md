# RC-02 — Unicidad del nombre de servicio dentro de su proyecto SelfHosted

**Proyecto:** SelfHosted Service
**Documento:** RC-02-Unicidad-Del-Nombre-De-Servicio-En-Su-Proyecto.md
**Versión:** 1.0
**Estado:** Propuesto
**Fecha:** 2026-07-29
**Autor:** Analista Funcional Senior (AG-02)

**Trazabilidad upstream:** SOLUTION-INTAKE anexo E-9, tabla `servicios`, restricción de unicidad sobre proyecto y nombre; E-16 RN-01; §17.P.2 invariante I8; D-12 consecuencia 2

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

Dos servicios del mismo proyecto SelfHosted no pueden llamarse igual, porque el nombre del servicio es su alias DNS dentro de la red del proyecto.

## 2. Entidades involucradas

- Servicio.
- Proyecto SelfHosted.

## 3. Tipo de restricción

Identidad, acotada al ámbito del proyecto SelfHosted.

## 4. Mecanismo de verificación conceptual

Se comprueba, dentro de un proyecto SelfHosted, que el nombre propuesto para un servicio no coincida con el de ningún otro servicio del mismo proyecto. Al instanciar un ítem del catálogo la comprobación no rechaza: deriva en el sufijado automático de RN-36.

## 5. RN o CU que la justifican

- RN-01 Unicidad y formato del nombre de servicio.
- RN-36 Sufijo automático al instanciar un nombre existente.
- CU-03, CU-07, CU-11, CU-16.

## 6. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 1.0 | 2026-07-29 | Versión inicial, derivada de la restricción declarada en la fuente citada en la cabecera. La regla transcribe la restricción; no la reinterpreta |
