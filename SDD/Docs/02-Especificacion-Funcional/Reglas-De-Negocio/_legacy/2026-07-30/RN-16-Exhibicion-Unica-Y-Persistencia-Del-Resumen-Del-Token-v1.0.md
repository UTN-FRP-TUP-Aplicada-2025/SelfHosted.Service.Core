# RN-16 — Exhibición única del token y persistencia de su resumen

**Proyecto:** SelfHosted Service
**Documento:** RN-16-Exhibicion-Unica-Y-Persistencia-Del-Resumen-Del-Token.md
**Versión:** 1.0
**Estado:** Propuesto
**Fecha:** 2026-07-29
**Autor:** Analista Funcional Senior (AG-02)

**Trazabilidad upstream:** SOLUTION-INTAKE-SelfHosted-Service anexo E-16, fila RN-16. **Autoría declarada en la fuente:** **[E]** de la fuente base.

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

El token de API se muestra una única vez y sólo se persiste su resumen.

## 2. Justificación

Es lo que permite que la pérdida de la base no sea la pérdida de las credenciales de máquina, y la condición para que la revocación tenga sentido: lo que se contrasta es el identificador del token contra la tabla que marca la fecha de revocación. El intake declara además que la regla es una invariante del modelo y no una decisión de infraestructura.

## 3. Ámbito de aplicación

**Momento de validación declarado en el anexo E-16:** Creación de token.

Se evalúa al emitir un token de API desde la interfaz, y en toda lectura posterior del listado de tokens.

## 4. Consecuencia si se viola

Invariante.

## 5. CU afectados

CU-32, CU-33.

## 6. Pruebas que la verifican

- T-25: crear un token de API. El valor se devuelve una única vez; en la base sólo queda su resumen.

Las pruebas se realizan en 08-Calidad-Y-Pruebas. El anexo E-22 declara los casos con entrada concreta y resultado esperado, y el anexo E-16 declara que el catálogo está pensado para que cada regla se traduzca en una prueba automatizada.

## 7. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 1.0 | 2026-07-29 | Versión inicial. Transcripción del enunciado, del momento de validación y de la respuesta ante incumplimiento que declara el anexo E-16 del intake. No se reinterpreta ninguno de los tres |
