# RN-11 — Adopción única de un contenedor

**Proyecto:** SelfHosted Service
**Documento:** RN-11-Adopcion-Unica-De-Un-Contenedor.md
**Versión:** 1.0
**Estado:** Propuesto
**Fecha:** 2026-07-29
**Autor:** Analista Funcional Senior (AG-02)

**Trazabilidad upstream:** SOLUTION-INTAKE-SelfHosted-Service anexo E-16, fila RN-11. **Autoría declarada en la fuente:** **[E]** de la fuente base. Su fundamento fue completado por la decisión D-3 del 2026-07-28.

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

Un contenedor adoptado no puede adoptarse dos veces.

## 2. Justificación

Es la invariante I10 y el mecanismo que hace cumplir RN-02 en el único camino por el que un servicio podría llegar a dos proyectos SelfHosted. El filtro vive en el descubrimiento, que es la regla RA-01 del anexo E-7.

## 3. Ámbito de aplicación

**Momento de validación declarado en el anexo E-16:** Descubrimiento y adopción.

Se evalúa al listar los candidatos a incorporación y al confirmar la incorporación de un contenedor.

## 4. Consecuencia si se viola

Aparece deshabilitado con el proyecto que lo tomó.

## 5. CU afectados

CU-06, CU-07.

## 6. Pruebas que la verifican

- T-15: adoptar un contenedor ya adoptado por otro proyecto. Aparece deshabilitado, con el proyecto que lo tomó.

Las pruebas se realizan en 08-Calidad-Y-Pruebas. El anexo E-22 declara los casos con entrada concreta y resultado esperado, y el anexo E-16 declara que el catálogo está pensado para que cada regla se traduzca en una prueba automatizada.

## 7. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 1.0 | 2026-07-29 | Versión inicial. Transcripción del enunciado, del momento de validación y de la respuesta ante incumplimiento que declara el anexo E-16 del intake. No se reinterpreta ninguno de los tres |
