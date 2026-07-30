# RN-13 — Redespliegue acotado a los servicios afectados

**Proyecto:** SelfHosted Service
**Documento:** RN-13-Redespliegue-Acotado-A-Lo-Afectado.md
**Versión:** 1.0
**Estado:** Propuesto
**Fecha:** 2026-07-29
**Autor:** Analista Funcional Senior (AG-02)

**Trazabilidad upstream:** SOLUTION-INTAKE-SelfHosted-Service anexo E-16, fila RN-13. **Autoría declarada en la fuente:** **[E]** de la fuente base.

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

Aplicar el conjunto de cambios pendientes redespliega sólo los servicios afectados.

## 2. Justificación

Es el tercer diferenciador declarado del producto: se revisa antes de aplicar, se descarta lo que no va y se redespliega una sola vez, en lugar de un redespliegue por cada clic. Redesplegar servicios cuyo valor no cambió es el ruido que la regla evita.

## 3. Ámbito de aplicación

**Momento de validación declarado en el anexo E-16:** Aplicación. El informe de impacto lo declara antes de ejecutar.

Se evalúa al calcular el informe de impacto y al aplicar el conjunto de cambios pendientes de un proyecto SelfHosted.

## 4. Consecuencia si se viola

El informe de impacto lo declara antes de ejecutar, con sus dos listas: servicios a redesplegar y servicios sin impacto.

## 5. CU afectados

CU-13, CU-21, CU-22, CU-23, CU-24, CU-25, CU-33.

## 6. Pruebas que la verifican

- T-23: conjunto de cambios del anexo E-5, con cambios en `api` y alta de `cache`. Redespliega sólo `api` y `cache`; `db` no se toca.
- T-31: aplicación del mismo conjunto con caída del circuito de la interfaz. `db` no se toca y conserva su despliegue anterior.

Las pruebas se realizan en 08-Calidad-Y-Pruebas. El anexo E-22 declara los casos con entrada concreta y resultado esperado, y el anexo E-16 declara que el catálogo está pensado para que cada regla se traduzca en una prueba automatizada.

## 7. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 1.0 | 2026-07-29 | Versión inicial. Transcripción del enunciado, del momento de validación y de la respuesta ante incumplimiento que declara el anexo E-16 del intake. No se reinterpreta ninguno de los tres |
