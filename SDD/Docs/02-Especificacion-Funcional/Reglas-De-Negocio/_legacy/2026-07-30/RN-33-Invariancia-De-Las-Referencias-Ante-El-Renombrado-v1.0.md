# RN-33 — Invariancia de las referencias ante el renombrado

**Proyecto:** SelfHosted Service
**Documento:** RN-33-Invariancia-De-Las-Referencias-Ante-El-Renombrado.md
**Versión:** 1.0
**Estado:** Propuesto
**Fecha:** 2026-07-29
**Autor:** Analista Funcional Senior (AG-02)

**Trazabilidad upstream:** SOLUTION-INTAKE-SelfHosted-Service anexo E-16, fila RN-33. **Autoría declarada en la fuente:** Enunciado **[D]**, decisión D-8 ampliada por D-12. Forma **[D-i]**, sin revisar: se consume declarándola revisable.

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

**[D]:** renombrar un elemento referenciado no invalida ni altera ninguna referencia que le apunte, y no produce cambios pendientes en el conjunto de cambios. Alcanza al servicio y, desde D-12, también a la variable. Un servicio puede llamarse `shared` sin que ninguna expresión quede ambigua. **[D-i]:** se logra persistiendo la expresión en su forma vinculada, con el identificador del servicio destino y el de la variable, y renderizando los nombres al mostrarla.

## 2. Justificación

Vincular por nombre hace que renombrar rompa en silencio. Es el defecto que D-8 corrigió a nivel de servicio y que D-12 bajó al nivel de la variable. La promesa de NB-01 es que la arquitectura quede declarada y por lo tanto verificable: si renombrar rompe en silencio lo que apuntaba al servicio, esa declaración nunca fue tal.

## 3. Ámbito de aplicación

**Momento de validación declarado en el anexo E-16:** Renombrado de un servicio o de una variable.

Se evalúa al renombrar un servicio y al renombrar una variable referenciada.

## 4. Consecuencia si se viola

Invariante, verificable por prueba: tras renombrar, toda expresión que apuntaba al elemento sigue resolviendo al mismo valor y la interfaz muestra el nombre nuevo.

## 5. CU afectados

CU-02, CU-03, CU-04, CU-22, CU-25, CU-34, CU-35.

## 6. Pruebas que la verifican

- T-55: renombrar el servicio `db` del proyecto 12, con `api` referenciándolo en dos variables. Ninguna referencia se rompe y no aparece ningún cambio pendiente.
- T-58: renombrar la variable `POSTGRES_USER` de `db`, con `api` referenciándola. Ninguna referencia se rompe.
- T-51: crear un servicio llamado `shared` en un proyecto con variables compartidas referenciadas. Aceptado, sin ambigüedad.

Las pruebas se realizan en 08-Calidad-Y-Pruebas. El anexo E-22 declara los casos con entrada concreta y resultado esperado, y el anexo E-16 declara que el catálogo está pensado para que cada regla se traduzca en una prueba automatizada.

## 7. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 1.0 | 2026-07-29 | Versión inicial. Transcripción del enunciado, del momento de validación y de la respuesta ante incumplimiento que declara el anexo E-16 del intake. No se reinterpreta ninguno de los tres |
