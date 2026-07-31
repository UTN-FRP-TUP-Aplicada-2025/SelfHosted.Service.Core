# RN-05 — Aciclicidad del grafo de arranque

**Proyecto:** SelfHosted Service
**Documento:** RN-05-Aciclicidad-Del-Grafo-De-Arranque.md
**Versión:** 1.0
**Estado:** Propuesto
**Fecha:** 2026-07-29
**Autor:** Analista Funcional Senior (AG-02)

**Trazabilidad upstream:** SOLUTION-INTAKE-SelfHosted-Service anexo E-16, fila RN-05. **Autoría declarada en la fuente:** Ampliación **[D-i]**, sin revisar. Se consume declarándola revisable. El enunciado original de la regla sigue siendo **[E]** de la fuente base.

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

El grafo de arranque no puede tener ciclos. El grafo de arranque es el subgrafo de las aristas que declaran espera al destino; un ciclo formado por aristas que no esperan no es un ciclo de arranque y no lo rechaza esta regla, pero sí lo alcanza RN-22 si además es un ciclo de valor.

## 2. Justificación

Un ciclo en el orden de arranque deja al proyecto SelfHosted sin secuencia posible. La acotación al subgrafo de las aristas que declaran espera evita rechazar configuraciones legítimas: dos servicios que se toman un dato mutuamente producirían un ciclo de arranque inexistente si la regla operara sobre el grafo completo (D-11).

## 3. Ámbito de aplicación

**Momento de validación declarado en el anexo E-16:** Creación de enlace y cambio de la propiedad de espera.

Se evalúa al crear una arista en el lienzo y al cambiar la propiedad de espera de una arista existente.

## 4. Consecuencia si se viola

Respuesta `422` señalando el ciclo.

## 5. CU afectados

CU-04, CU-11, CU-18.

## 6. Pruebas que la verifican

- T-13: aristas `a → b`, `b → c`, `c → a`. Rechazado `422` señalando el ciclo.
- T-45: dos servicios que se referencian mutuamente sin declarar espera. Aceptado: no es ciclo de arranque.
- T-52: ciclo de valor entre servicios en aristas que no declaran espera. Lo cubre RN-22, no esta regla.

Las pruebas se realizan en 08-Calidad-Y-Pruebas. El anexo E-22 declara los casos con entrada concreta y resultado esperado, y el anexo E-16 declara que el catálogo está pensado para que cada regla se traduzca en una prueba automatizada.

## 7. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 1.0 | 2026-07-29 | Versión inicial. Transcripción del enunciado, del momento de validación y de la respuesta ante incumplimiento que declara el anexo E-16 del intake. No se reinterpreta ninguno de los tres |
