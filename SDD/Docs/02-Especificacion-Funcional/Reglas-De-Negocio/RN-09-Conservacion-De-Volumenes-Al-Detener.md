# RN-09 — Conservación de volúmenes y montajes al detener

**Proyecto:** SelfHosted Service
**Documento:** RN-09-Conservacion-De-Volumenes-Al-Detener.md
**Versión:** 1.0
**Estado:** Propuesto
**Fecha:** 2026-07-29
**Autor:** Analista Funcional Senior (AG-02)

**Trazabilidad upstream:** SOLUTION-INTAKE-SelfHosted-Service anexo E-16, fila RN-09. **Autoría declarada en la fuente:** **[E]** de la fuente base.

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

Al detener un servicio, sus volúmenes y montajes no se tocan.

## 2. Justificación

Es la consecuencia observable de la separación entre configuración y ejecución: el servicio es la configuración y existe siempre mientras no se lo borre; el despliegue es el intento de materializarla. Detener elimina el contenedor conservando intactas la definición, las variables y los datos del montaje. Es la invariante I6.

## 3. Ámbito de aplicación

**Momento de validación declarado en el anexo E-16:** Detención.

Se evalúa al detener un servicio y al detener un proyecto SelfHosted completo.

## 4. Consecuencia si se viola

Invariante, verificable por prueba.

## 5. CU afectados

CU-18, CU-24.

## 6. Pruebas que la verifican

- T-21: detener el servicio C-3. El montaje `/data` permanece intacto; el contenedor se elimina.
- T-27: redesplegar el caso C-2, cuyo montaje contiene una base de datos en archivo. Contenedor nuevo, datos del montaje intactos.

Las pruebas se realizan en 08-Calidad-Y-Pruebas. El anexo E-22 declara los casos con entrada concreta y resultado esperado, y el anexo E-16 declara que el catálogo está pensado para que cada regla se traduzca en una prueba automatizada.

## 7. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 1.0 | 2026-07-29 | Versión inicial. Transcripción del enunciado, del momento de validación y de la respuesta ante incumplimiento que declara el anexo E-16 del intake. No se reinterpreta ninguno de los tres |
