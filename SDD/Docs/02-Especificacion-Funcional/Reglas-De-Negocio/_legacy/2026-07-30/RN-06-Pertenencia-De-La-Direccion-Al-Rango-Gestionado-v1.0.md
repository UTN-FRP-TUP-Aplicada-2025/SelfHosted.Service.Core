# RN-06 — Pertenencia de la dirección al rango gestionado

**Proyecto:** SelfHosted Service
**Documento:** RN-06-Pertenencia-De-La-Direccion-Al-Rango-Gestionado.md
**Versión:** 1.0
**Estado:** Propuesto
**Fecha:** 2026-07-29
**Autor:** Analista Funcional Senior (AG-02)

**Trazabilidad upstream:** SOLUTION-INTAKE-SelfHosted-Service anexo E-16, fila RN-06. **Autoría declarada en la fuente:** **[E]** de la fuente base.

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

Toda dirección IP fija debe pertenecer al rango gestionado y no estar excluida.

## 2. Justificación

El rango gestionado es un bloque fuera del rango que reparte el servidor de direcciones de la red (DA-04). Sin la regla, el sistema podría asignar una dirección que la red entrega a otro equipo, produciendo un conflicto que la solución no ve.

## 3. Ámbito de aplicación

**Momento de validación declarado en el anexo E-16:** Alta y edición.

Se evalúa al declarar o modificar la dirección fija de un servicio, y en la validación previa al arranque del proyecto SelfHosted.

## 4. Consecuencia si se viola

Respuesta `422` con la siguiente dirección libre sugerida.

## 5. CU afectados

CU-03, CU-19, CU-20, CU-21.

## 6. Pruebas que la verifican

- T-08: dirección `192.168.1.120`, fuera del rango gestionado `192.168.1.128/26`. Rechazado `422`, con `192.168.1.141` sugerida como siguiente libre.
- T-09: dirección `192.168.1.129`, dentro del rango pero declarada excluida. Rechazado `422`.

Las pruebas se realizan en 08-Calidad-Y-Pruebas. El anexo E-22 declara los casos con entrada concreta y resultado esperado, y el anexo E-16 declara que el catálogo está pensado para que cada regla se traduzca en una prueba automatizada.

## 7. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 1.0 | 2026-07-29 | Versión inicial. Transcripción del enunciado, del momento de validación y de la respuesta ante incumplimiento que declara el anexo E-16 del intake. No se reinterpreta ninguno de los tres |
