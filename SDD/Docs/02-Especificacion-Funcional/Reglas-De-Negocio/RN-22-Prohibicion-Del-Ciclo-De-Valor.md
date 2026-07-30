# RN-22 — Prohibición del ciclo de valor entre referencias

**Proyecto:** SelfHosted Service
**Documento:** RN-22-Prohibicion-Del-Ciclo-De-Valor.md
**Versión:** 1.0
**Estado:** Propuesto
**Fecha:** 2026-07-29
**Autor:** Analista Funcional Senior (AG-02)

**Trazabilidad upstream:** SOLUTION-INTAKE-SelfHosted-Service anexo E-16, fila RN-22. **Autoría declarada en la fuente:** **[D-i]** completa, sin revisar. Se consume declarándola revisable.

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

Las referencias no pueden formar un ciclo de valor: una cadena de referencias que vuelva sobre sí misma, sea dentro de un mismo servicio o atravesando varios. Es distinta de RN-05, que impide un ciclo de arranque. Ningún ciclo puede atravesar el nivel proyecto: una variable compartida contiene siempre un literal o material secreto, nunca una referencia, y el esquema lo hace cumplir por ausencia de columna.

## 2. Justificación

Desde que el grafo de arranque lo forman sólo las aristas que declaran espera, un ciclo formado por aristas que no esperan no lo ve RN-05 y lo cubre únicamente esta regla. Sin ella, una cadena de referencias circular no terminaría de resolver.

## 3. Ámbito de aplicación

**Momento de validación declarado en el anexo E-16:** Alta y edición de la variable, y resolución previa al despliegue.

Se evalúa al declarar o editar una variable con referencia y en la resolución previa a crear el contenedor.

## 4. Consecuencia si se viola

Respuesta `422` señalando la cadena completa del ciclo.

## 5. CU afectados

CU-16, CU-24, CU-34, CU-35.

## 6. Pruebas que la verifican

- T-36: en el mismo servicio, dos variables que se referencian mutuamente. Rechazado `422` con la cadena completa del ciclo.
- T-52: ciclo de valor entre servicios en aristas que no declaran espera. Rechazado `422` con la cadena completa.
- T-45: dos referencias mutuas cuyas claves apuntadas son literales. Aceptado: no es ciclo de valor.

Las pruebas se realizan en 08-Calidad-Y-Pruebas. El anexo E-22 declara los casos con entrada concreta y resultado esperado, y el anexo E-16 declara que el catálogo está pensado para que cada regla se traduzca en una prueba automatizada.

## 7. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 1.0 | 2026-07-29 | Versión inicial. Transcripción del enunciado, del momento de validación y de la respuesta ante incumplimiento que declara el anexo E-16 del intake. No se reinterpreta ninguno de los tres |
