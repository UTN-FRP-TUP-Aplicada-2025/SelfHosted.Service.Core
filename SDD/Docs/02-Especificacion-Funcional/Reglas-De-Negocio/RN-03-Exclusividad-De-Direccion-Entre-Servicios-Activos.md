# RN-03 — Exclusividad de dirección entre servicios activos de proyectos distintos

**Proyecto:** SelfHosted Service
**Documento:** RN-03-Exclusividad-De-Direccion-Entre-Servicios-Activos.md
**Versión:** 1.0
**Estado:** Propuesto
**Fecha:** 2026-07-29
**Autor:** Analista Funcional Senior (AG-02)

**Trazabilidad upstream:** SOLUTION-INTAKE-SelfHosted-Service anexo E-16, fila RN-03. **Autoría declarada en la fuente:** **[E]** de la fuente base.

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

Dos servicios activos de proyectos SelfHosted distintos no pueden compartir dirección IP.

## 2. Justificación

Es la invariante I7 y el cuarto diferenciador declarado del producto: el conflicto de direcciones es una regla de negocio verificada antes de tocar el motor, y no un accidente que se descubre cuando algo falla. Configurar la misma dirección está permitido; arrancar en conflicto con un servicio activo de otro proyecto no (CL-01).

## 3. Ámbito de aplicación

**Momento de validación declarado en el anexo E-16:** Arranque de proyecto o servicio.

Se evalúa al arrancar un proyecto SelfHosted completo y al arrancar un servicio. La validación se resuelve sin consultar al motor de contenedores.

## 4. Consecuencia si se viola

Respuesta `409` con informe y resoluciones. Las tres resoluciones que el anexo E-8 declara son detener el proyecto en conflicto, reasignar la dirección a la siguiente libre del rango, o arrancar parcialmente el resto de los servicios (D-4).

## 5. CU afectados

CU-18, CU-19, CU-20, CU-21, CU-24.

## 6. Pruebas que la verifican

- T-05: servicio con `192.168.1.139` en el proyecto 9, ocupada por el servicio 305 del proyecto 7, activo. Arranque bloqueado `409` con las tres resoluciones.
- T-06: idéntico, con el servicio 305 detenido. Arranque permitido: la regla compara contra servicios activos, no configurados.
- T-07: dos servicios del mismo proyecto con `192.168.1.139`. Bloqueado siempre, tipo duplicado interno.

Las pruebas se realizan en 08-Calidad-Y-Pruebas. El anexo E-22 declara los casos con entrada concreta y resultado esperado, y el anexo E-16 declara que el catálogo está pensado para que cada regla se traduzca en una prueba automatizada.

## 7. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 1.0 | 2026-07-29 | Versión inicial. Transcripción del enunciado, del momento de validación y de la respuesta ante incumplimiento que declara el anexo E-16 del intake. No se reinterpreta ninguno de los tres |
