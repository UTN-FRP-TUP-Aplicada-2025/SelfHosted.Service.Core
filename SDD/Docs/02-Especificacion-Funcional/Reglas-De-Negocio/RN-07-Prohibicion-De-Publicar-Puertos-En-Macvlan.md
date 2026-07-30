# RN-07 — Prohibición de publicar puertos en macvlan

**Proyecto:** SelfHosted Service
**Documento:** RN-07-Prohibicion-De-Publicar-Puertos-En-Macvlan.md
**Versión:** 1.0
**Estado:** Propuesto
**Fecha:** 2026-07-29
**Autor:** Analista Funcional Senior (AG-02)

**Trazabilidad upstream:** SOLUTION-INTAKE-SelfHosted-Service anexo E-16, fila RN-07. **Autoría declarada en la fuente:** **[E]** de la fuente base.

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

Un servicio en macvlan no puede publicar puertos en el host.

## 2. Justificación

En macvlan el contenedor obtiene una dirección propia de la red local y aparece como un equipo más; el host no lo alcanza por la misma placa y la publicación de puertos no tiene sentido en ese modo.

## 3. Ámbito de aplicación

**Momento de validación declarado en el anexo E-16:** Alta y edición.

Se evalúa al declarar o modificar los puertos de un servicio cuyo modo de red es macvlan, tanto desde la interfaz como desde la API.

## 4. Consecuencia si se viola

Campo deshabilitado en la interfaz; `422` desde la API.

## 5. CU afectados

CU-03, CU-08, CU-11.

## 6. Pruebas que la verifican

- T-10: caso C-3, en macvlan, al que se le agrega un puerto publicado. Rechazado `422`; en la interfaz el campo aparece deshabilitado.

Las pruebas se realizan en 08-Calidad-Y-Pruebas. El anexo E-22 declara los casos con entrada concreta y resultado esperado, y el anexo E-16 declara que el catálogo está pensado para que cada regla se traduzca en una prueba automatizada.

## 7. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 1.0 | 2026-07-29 | Versión inicial. Transcripción del enunciado, del momento de validación y de la respuesta ante incumplimiento que declara el anexo E-16 del intake. No se reinterpreta ninguno de los tres |
