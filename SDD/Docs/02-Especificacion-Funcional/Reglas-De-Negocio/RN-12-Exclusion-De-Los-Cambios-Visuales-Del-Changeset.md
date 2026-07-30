# RN-12 — Exclusión de los cambios visuales del conjunto de cambios pendientes

**Proyecto:** SelfHosted Service
**Documento:** RN-12-Exclusion-De-Los-Cambios-Visuales-Del-Changeset.md
**Versión:** 1.0
**Estado:** Propuesto
**Fecha:** 2026-07-29
**Autor:** Analista Funcional Senior (AG-02)

**Trazabilidad upstream:** SOLUTION-INTAKE-SelfHosted-Service anexo E-16, fila RN-12. **Autoría declarada en la fuente:** **[E]** de la fuente base.

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

Los cambios visuales no entran al conjunto de cambios pendientes ni disparan redespliegue.

## 2. Justificación

De lo contrario el usuario acumularía cambios pendientes por el mero hecho de ordenar el dibujo. Es una decisión pre-tomada declarada en §17.P.11.

## 3. Ámbito de aplicación

**Momento de validación declarado en el anexo E-16:** Edición del lienzo.

Se evalúa en toda edición de la disposición del lienzo: desplazamiento de un nodo, agrupación y cualquier otro cambio que no altere la configuración de un servicio.

## 4. Consecuencia si se viola

Invariante.

## 5. CU afectados

CU-04, CU-05, CU-22, CU-23, CU-25.

## 6. Pruebas que la verifican

- T-22: mover un nodo del lienzo. Se guarda al instante; no entra al conjunto de cambios pendientes ni marca redespliegue.

Las pruebas se realizan en 08-Calidad-Y-Pruebas. El anexo E-22 declara los casos con entrada concreta y resultado esperado, y el anexo E-16 declara que el catálogo está pensado para que cada regla se traduzca en una prueba automatizada.

## 7. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 1.0 | 2026-07-29 | Versión inicial. Transcripción del enunciado, del momento de validación y de la respuesta ante incumplimiento que declara el anexo E-16 del intake. No se reinterpreta ninguno de los tres |
