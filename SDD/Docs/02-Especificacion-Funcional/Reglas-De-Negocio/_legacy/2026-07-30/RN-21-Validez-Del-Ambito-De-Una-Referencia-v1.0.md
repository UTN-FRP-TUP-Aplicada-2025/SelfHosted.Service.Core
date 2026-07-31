# RN-21 — Validez del ámbito de una referencia de variable

**Proyecto:** SelfHosted Service
**Documento:** RN-21-Validez-Del-Ambito-De-Una-Referencia.md
**Versión:** 1.0
**Estado:** Propuesto
**Fecha:** 2026-07-29
**Autor:** Analista Funcional Senior (AG-02)

**Trazabilidad upstream:** SOLUTION-INTAKE-SelfHosted-Service anexo E-16, fila RN-21. **Autoría declarada en la fuente:** Enunciado **[D]**, decisión D-6. Exigibilidad **[D-i]**, sin revisar: momento de validación y códigos de respuesta se consumen declarándolos revisables.

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

**[D]:** toda referencia debe resolver a una variable de ámbito válido, y los ámbitos válidos son exactamente tres: del propio servicio, compartida del proyecto SelfHosted, o de otro servicio del mismo proyecto SelfHosted. Una referencia a un servicio de otro proyecto es siempre inválida. La variable apuntada puede ser declarada o provista por el sistema. **[D-i]:** la variable apuntada además debe existir ya al validar y no sólo al desplegar.

## 2. Justificación

Los tres ámbitos son la enumeración cerrada que la decisión D-6 fija. Que la referencia no cruce el límite del proyecto SelfHosted es lo que mantiene al proyecto como unidad autocontenida. Adelantar la exigencia de existencia al momento de la validación evita que el error aparezca recién al crear el contenedor.

## 3. Ámbito de aplicación

**Momento de validación declarado en el anexo E-16:** **[D-i]:** alta y edición de la variable, aplicación del conjunto de cambios pendientes y creación del contenedor.

Se evalúa al declarar o editar una variable con referencia, al aplicar el conjunto de cambios pendientes y al crear el contenedor.

## 4. Consecuencia si se viola

**[D-i]:** `422` señalando la expresión y la causa: clave inexistente, servicio inexistente o servicio de otro proyecto SelfHosted.

## 5. CU afectados

CU-04, CU-11, CU-13, CU-15, CU-16, CU-24, CU-33, CU-34, CU-35.

## 6. Pruebas que la verifican

- T-34: variable de `api` con una referencia a un servicio inexistente. Rechazado `422` con la causa de servicio inexistente.
- T-35: variable de `api` del proyecto 12 con una referencia a un servicio del proyecto 7. Rechazado `422`, causa de servicio de otro proyecto.

Las pruebas se realizan en 08-Calidad-Y-Pruebas. El anexo E-22 declara los casos con entrada concreta y resultado esperado, y el anexo E-16 declara que el catálogo está pensado para que cada regla se traduzca en una prueba automatizada.

## 7. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 1.0 | 2026-07-29 | Versión inicial. Transcripción del enunciado, del momento de validación y de la respuesta ante incumplimiento que declara el anexo E-16 del intake. No se reinterpreta ninguno de los tres |
