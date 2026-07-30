# RN-31 — Resultado del despliegue determinado por contenedor

**Proyecto:** SelfHosted Service
**Documento:** RN-31-Resultado-Del-Despliegue-Por-Contenedor.md
**Versión:** 1.0
**Estado:** Propuesto
**Fecha:** 2026-07-29
**Autor:** Analista Funcional Senior (AG-02)

**Trazabilidad upstream:** SOLUTION-INTAKE-SelfHosted-Service anexo E-16, fila RN-31. **Autoría declarada en la fuente:** **[D]** completa, decisión D-1.

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

El resultado de un despliegue se determina por contenedor, no por operación: cada contenedor se marca como desplegado o como fallido con su error, la caída del circuito de la interfaz no lo altera, y al reabrir el proyecto SelfHosted el estado real de cada contenedor se verifica contra el motor. Un despliegue parcial es un estado legítimo.

## 2. Justificación

Es la resolución del caso límite CL-04: la caída de la conexión del navegador durante un despliegue deja de ser un caso especial porque el despliegue vive del lado del servidor. Encaja con el sincronizador de estado de CL-02 y con el estado parcialmente activo de CL-01 y RN-20.

## 3. Ámbito de aplicación

**Momento de validación declarado en el anexo E-16:** Despliegue y apertura del proyecto.

Se evalúa en toda operación de despliegue y en la apertura de un proyecto SelfHosted, donde el estado real de cada contenedor se verifica contra el motor con la tabla de correspondencia del anexo E-17.

## 4. Consecuencia si se viola

Invariante. La operación en lote responde con el resultado de cada contenedor, no con un resultado único.

## 5. CU afectados

CU-13, CU-15, CU-18, CU-24, CU-27, CU-28, CU-33.

## 6. Pruebas que la verifican

- T-31: aplicar el conjunto de cambios 331 y cerrar el navegador después del primer despliegue. El despliegue continúa del lado del servidor; un contenedor queda activo, otro fallido con su causa, y el proyecto parcialmente activo.
- T-28: contenedor en ejecución con verificación de salud en mal estado. Despliegue en activo degradado, no caído.
- T-29: contenedor terminado con código cero. Despliegue finalizado; con código distinto de cero, caído.

Las pruebas se realizan en 08-Calidad-Y-Pruebas. El anexo E-22 declara los casos con entrada concreta y resultado esperado, y el anexo E-16 declara que el catálogo está pensado para que cada regla se traduzca en una prueba automatizada.

## 7. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 1.0 | 2026-07-29 | Versión inicial. Transcripción del enunciado, del momento de validación y de la respuesta ante incumplimiento que declara el anexo E-16 del intake. No se reinterpreta ninguno de los tres |
