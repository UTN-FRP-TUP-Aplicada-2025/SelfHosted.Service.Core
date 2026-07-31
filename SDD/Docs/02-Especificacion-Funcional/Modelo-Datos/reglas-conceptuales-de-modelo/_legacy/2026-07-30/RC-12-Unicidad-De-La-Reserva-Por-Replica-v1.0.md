# RC-12 — Unicidad de la reserva de dirección por réplica

**Proyecto:** SelfHosted Service
**Documento:** RC-12-Unicidad-De-La-Reserva-Por-Replica.md
**Versión:** 1.0
**Estado:** Propuesto
**Fecha:** 2026-07-29
**Autor:** Analista Funcional Senior (AG-02)

**Trazabilidad upstream:** SOLUTION-INTAKE anexo E-9, tabla `reservas_ip`, restricción de unicidad sobre servicio y número de réplica; §17.P.4 decisión de esquema 1; E-16 RN-18

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

Cada réplica de un servicio reserva como máximo una dirección: no puede haber dos reservas para el mismo servicio y el mismo número de réplica.

## 2. Entidades involucradas

- Reserva de dirección.
- Servicio.

## 3. Tipo de restricción

Cardinalidad.

## 4. Mecanismo de verificación conceptual

Se comprueba verificando que el par de servicio y número de réplica no se repita entre las reservas. Es lo que permite escalar un servicio en macvlan dando una dirección por réplica, en lugar de rechazar el escalado.

## 5. RN o CU que la justifican

- RN-18 Escalado horizontal con dirección por réplica.
- RN-03 Exclusividad de dirección entre servicios activos.
- CU-19, CU-20.

## 6. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 1.0 | 2026-07-29 | Versión inicial, derivada de la restricción declarada en la fuente citada en la cabecera. La regla transcribe la restricción; no la reinterpreta |
