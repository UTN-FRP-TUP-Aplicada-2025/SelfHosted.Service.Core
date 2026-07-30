# RN-10 — Confirmación escrita al eliminar un servicio

**Proyecto:** SelfHosted Service
**Documento:** RN-10-Confirmacion-Escrita-Al-Eliminar-Un-Servicio.md
**Versión:** 1.0
**Estado:** Propuesto
**Fecha:** 2026-07-29
**Autor:** Analista Funcional Senior (AG-02)

**Trazabilidad upstream:** SOLUTION-INTAKE-SelfHosted-Service anexo E-16, fila RN-10. **Autoría declarada en la fuente:** **[E]** de la fuente base.

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

Al eliminar un servicio se pide confirmación escribiendo su nombre, y se ofrece conservar los volúmenes.

## 2. Justificación

Es la respuesta declarada al caso límite CL-12: qué pasa si el administrador quiere borrar un servicio con datos persistidos. La confirmación escrita es además una de las salvaguardas de aislamiento que §17.P.5 declara obligatorias.

## 3. Ámbito de aplicación

**Momento de validación declarado en el anexo E-16:** Eliminación.

Se evalúa al eliminar un servicio de un proyecto SelfHosted.

## 4. Consecuencia si se viola

Interacción obligatoria.

## 5. CU afectados

CU-02, CU-03.

## 6. Pruebas que la verifican

- El anexo E-22 no declara un caso ejecutable propio para esta regla. **Brecha declarada**: 08-Calidad-Y-Pruebas debe derivar el caso a partir del enunciado del anexo E-16 y del caso límite CL-12 del intake §7.

Las pruebas se realizan en 08-Calidad-Y-Pruebas. El anexo E-22 declara los casos con entrada concreta y resultado esperado, y el anexo E-16 declara que el catálogo está pensado para que cada regla se traduzca en una prueba automatizada.

## 7. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 1.0 | 2026-07-29 | Versión inicial. Transcripción del enunciado, del momento de validación y de la respuesta ante incumplimiento que declara el anexo E-16 del intake. No se reinterpreta ninguno de los tres |
