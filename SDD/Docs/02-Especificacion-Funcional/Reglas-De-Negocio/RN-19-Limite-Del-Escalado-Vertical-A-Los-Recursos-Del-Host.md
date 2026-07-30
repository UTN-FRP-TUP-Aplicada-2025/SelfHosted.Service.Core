# RN-19 — Límite del escalado vertical a los recursos declarados del host

**Proyecto:** SelfHosted Service
**Documento:** RN-19-Limite-Del-Escalado-Vertical-A-Los-Recursos-Del-Host.md
**Versión:** 1.0
**Estado:** Propuesto
**Fecha:** 2026-07-29
**Autor:** Analista Funcional Senior (AG-02)

**Trazabilidad upstream:** SOLUTION-INTAKE-SelfHosted-Service anexo E-16, fila RN-19. **Autoría declarada en la fuente:** **[E]** de la fuente base.

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

El escalado vertical no puede exceder los recursos declarados del host.

## 2. Justificación

Un límite mayor que la capacidad del servidor no se detecta al configurarlo sino cuando el contenedor no arranca. La regla lo adelanta al momento de la edición, con el máximo admisible en la respuesta.

## 3. Ámbito de aplicación

**Momento de validación declarado en el anexo E-16:** Cambio de límites.

Se evalúa al modificar los límites de procesador y de memoria de un servicio.

## 4. Consecuencia si se viola

Respuesta `422` con el máximo admisible.

## 5. CU afectados

CU-03.

## 6. Pruebas que la verifican

- T-20: límite de memoria de 64 GB en un host de 32 GB. Rechazado `422` con el máximo admisible.

Las pruebas se realizan en 08-Calidad-Y-Pruebas. El anexo E-22 declara los casos con entrada concreta y resultado esperado, y el anexo E-16 declara que el catálogo está pensado para que cada regla se traduzca en una prueba automatizada.

## 7. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 1.0 | 2026-07-29 | Versión inicial. Transcripción del enunciado, del momento de validación y de la respuesta ante incumplimiento que declara el anexo E-16 del intake. No se reinterpreta ninguno de los tres |
