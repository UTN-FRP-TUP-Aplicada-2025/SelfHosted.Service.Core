# RN-27 — Protección de la variable referenciada ante la eliminación

**Proyecto:** SelfHosted Service
**Documento:** RN-27-Proteccion-De-La-Variable-Referenciada-Ante-La-Eliminacion.md
**Versión:** 1.0
**Estado:** Propuesto
**Fecha:** 2026-07-29
**Autor:** Analista Funcional Senior (AG-02)

**Trazabilidad upstream:** SOLUTION-INTAKE-SelfHosted-Service anexo E-16, fila RN-27. **Autoría declarada en la fuente:** **[D-i]** completa, sin revisar. Se consume declarándola revisable.

---

## Tabla de contenido

- [1. Enunciado de la regla](#1-enunciado-de-la-regla)
- [2. Justificación](#2-justificación)
- [3. Ámbito de aplicación](#3-ámbito-de-aplicación)
- [4. Consecuencia si se viola](#4-consecuencia-si-se-viola)
- [5. CU afectados](#5-cu-afectados)
- [6. Pruebas que la verifican](#6-pruebas-que-la-verifican)
- [7. Control de cambios](#7-control-de-cambios)

---

## 1. Enunciado de la regla

No se puede eliminar una variable compartida del proyecto SelfHosted, ni una variable referenciada desde otro servicio, mientras exista al menos una referencia vigente.

## 2. Justificación

Sin la regla, eliminar una variable dejaría referencias colgadas que sólo fallarían al desplegar. La lista de servicios y claves que la referencian es lo que convierte el rechazo en accionable.

## 3. Ámbito de aplicación

**Momento de validación declarado en el anexo E-16:** Eliminación de la variable.

Se evalúa al eliminar una variable compartida del proyecto SelfHosted y al eliminar una variable de servicio referenciada desde otro servicio.

## 4. Consecuencia si se viola

Respuesta `409` con la lista de servicios y claves que la referencian.

## 5. CU afectados

CU-03, CU-22, CU-25, CU-34, CU-35.

## 6. Pruebas que la verifican

- T-41: eliminar la variable compartida `TZ` del proyecto 12, referenciada por `api`. Rechazado `409` con la lista de quienes la referencian.

Las pruebas se realizan en 08-Calidad-Y-Pruebas. El anexo E-22 declara los casos con entrada concreta y resultado esperado, y el anexo E-16 declara que el catálogo está pensado para que cada regla se traduzca en una prueba automatizada.

## 7. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 1.0 | 2026-07-29 | Versión inicial. Transcripción del enunciado, del momento de validación y de la respuesta ante incumplimiento que declara el anexo E-16 del intake. No se reinterpreta ninguno de los tres |
