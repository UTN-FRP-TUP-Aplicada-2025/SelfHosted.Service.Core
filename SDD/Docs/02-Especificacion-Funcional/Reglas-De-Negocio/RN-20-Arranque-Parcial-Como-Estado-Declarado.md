# RN-20 — Arranque parcial como estado declarado

**Proyecto:** SelfHosted Service
**Documento:** RN-20-Arranque-Parcial-Como-Estado-Declarado.md
**Versión:** 1.0
**Estado:** Propuesto
**Fecha:** 2026-07-29
**Autor:** Analista Funcional Senior (AG-02)

**Trazabilidad upstream:** SOLUTION-INTAKE-SelfHosted-Service anexo E-16, fila RN-20. **Autoría declarada en la fuente:** **[E]** de la fuente base.

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

Un proyecto SelfHosted con al menos un conflicto puede arrancar parcialmente, quedando parcialmente activo.

## 2. Justificación

Un despliegue parcial es un estado legítimo del modelo y no un accidente a evitar (D-1). La regla es la que impide que la situación se resuelva como un error silencioso o como un estado indeterminado.

## 3. Ámbito de aplicación

**Momento de validación declarado en el anexo E-16:** Arranque.

Se evalúa al arrancar un proyecto SelfHosted con al menos un conflicto de dirección, y al elegir la resolución de arranque parcial que ofrece el informe de conflicto.

## 4. Consecuencia si se viola

Estado explícito, no error silencioso.

## 5. CU afectados

CU-18, CU-20, CU-21, CU-24, CU-27, CU-28.

## 6. Pruebas que la verifican

- T-24: arrancar un proyecto de 3 servicios con 1 en conflicto. Arrancan 2; el proyecto queda parcialmente activo, sin error silencioso.

Las pruebas se realizan en 08-Calidad-Y-Pruebas. El anexo E-22 declara los casos con entrada concreta y resultado esperado, y el anexo E-16 declara que el catálogo está pensado para que cada regla se traduzca en una prueba automatizada.

## 7. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 1.0 | 2026-07-29 | Versión inicial. Transcripción del enunciado, del momento de validación y de la respuesta ante incumplimiento que declara el anexo E-16 del intake. No se reinterpreta ninguno de los tres |
