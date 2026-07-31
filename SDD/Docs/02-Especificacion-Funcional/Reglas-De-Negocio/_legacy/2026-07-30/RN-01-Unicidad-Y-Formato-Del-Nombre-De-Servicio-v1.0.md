# RN-01 — Unicidad y formato del nombre de servicio

**Proyecto:** SelfHosted Service
**Documento:** RN-01-Unicidad-Y-Formato-Del-Nombre-De-Servicio.md
**Versión:** 1.0
**Estado:** Propuesto
**Fecha:** 2026-07-29
**Autor:** Analista Funcional Senior (AG-02)

**Trazabilidad upstream:** SOLUTION-INTAKE-SelfHosted-Service anexo E-16, fila RN-01. **Autoría declarada en la fuente:** Fundamento **[D]**, decisión D-12. El enunciado original es **[E]** de la fuente base; RN-01 recuperó su enunciado original al persistirse el vínculo y no el nombre (D-8).

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

El nombre de servicio es único dentro del proyecto SelfHosted, en minúsculas, con guiones, de 1 a 32 caracteres. La unicidad se exige porque el nombre es el alias DNS que el motor resuelve dentro de la red del proyecto, no porque identifique al servicio: identificarlo es tarea de su identidad.

## 2. Justificación

Es uno de los dos únicos casos donde el modelo exige nombre único, según la consecuencia 2 de la decisión D-12. La razón es de resolución de nombres dentro de la red del proyecto y no de identificación del objeto, que se resuelve por identidad (RN-35).

## 3. Ámbito de aplicación

**Momento de validación declarado en el anexo E-16:** Alta y edición. Al instanciar un ítem del catálogo no se rechaza: se sufija e informa (RN-36).

Se evalúa en el alta y en la edición de un servicio, en la incorporación de un contenedor existente, en la importación de un archivo de composición y en la instanciación de un ítem del catálogo, con el tratamiento distinto que declara RN-36 para este último caso.

## 4. Consecuencia si se viola

Respuesta `422` con el campo señalado. Al instanciar un ítem del catálogo no se rechaza: el sistema sufija automáticamente e informa qué sufijó (RN-36).

## 5. CU afectados

CU-03, CU-07, CU-08, CU-11, CU-16.

## 6. Pruebas que la verifican

- T-01: nombre `print-server` en un proyecto SelfHosted que no lo tiene. Aceptado.
- T-02: nombre `Print Server`, con mayúsculas y espacio. Rechazado `422`, campo del nombre.
- T-03: nombre de 33 caracteres. Rechazado `422`, campo del nombre.
- T-04: segundo servicio `print-server` en el mismo proyecto. Rechazado `422`, nombre duplicado.
- T-51: servicio llamado `shared` en un proyecto que ya tiene variables compartidas referenciadas. Aceptado: el nombre no está reservado.

Las pruebas se realizan en 08-Calidad-Y-Pruebas. El anexo E-22 declara los casos con entrada concreta y resultado esperado, y el anexo E-16 declara que el catálogo está pensado para que cada regla se traduzca en una prueba automatizada.

## 7. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 1.0 | 2026-07-29 | Versión inicial. Transcripción del enunciado, del momento de validación y de la respuesta ante incumplimiento que declara el anexo E-16 del intake. No se reinterpreta ninguno de los tres |
