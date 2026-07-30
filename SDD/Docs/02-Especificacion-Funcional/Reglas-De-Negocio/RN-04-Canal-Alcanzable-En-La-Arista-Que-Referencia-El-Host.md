# RN-04 — Canal alcanzable en la arista que referencia el host

**Proyecto:** SelfHosted Service
**Documento:** RN-04-Canal-Alcanzable-En-La-Arista-Que-Referencia-El-Host.md
**Versión:** 1.0
**Estado:** Propuesto
**Fecha:** 2026-07-29
**Autor:** Analista Funcional Senior (AG-02)

**Trazabilidad upstream:** SOLUTION-INTAKE-SelfHosted-Service anexo E-16, fila RN-04. **Autoría declarada en la fuente:** Ampliación **[D-i]**, sin revisar. Se consume declarándola revisable. El enunciado original de la regla sigue siendo **[E]** de la fuente base.

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

Toda arista que referencia el host de otro servicio debe tener un canal alcanzable entre origen y destino según sus modos de red, porque pedir la dirección de un servicio es declarar que se lo va a consumir por red. Ninguna otra arista lo exige: ni la que referencia un dato de configuración, ni la que sólo declara espera. La exigencia de canal es independiente de la espera: se puede esperar sin referenciar el host y referenciar el host sin esperar.

## 2. Justificación

El enunciado fue reformulado el 2026-07-28 por la tercera pasada (D-11), que lo desacopló del orden de arranque. El comportamiento del enlace que el usuario traza en el lienzo no cambia. Que la arista referencia el host no se persiste: se deduce de la clave referenciada.

## 3. Ámbito de aplicación

**Momento de validación declarado en el anexo E-16:** Aplicación del changeset.

Se evalúa al aplicar el conjunto de cambios pendientes de un proyecto SelfHosted, sobre las aristas que referencian el host del destino.

## 4. Consecuencia si se viola

Enlace marcado inválido; bloquea el arranque.

## 5. CU afectados

CU-04, CU-18, CU-24.

## 6. Pruebas que la verifican

- T-11: referencia de red de un servicio en red bridge a un servicio en macvlan sin puerto publicado. Enlace inválido; bloquea el arranque.
- T-12: arista entre dos servicios de la misma red bridge, con el destino declarando un solo puerto. Válida.
- T-46: arista de un servicio en bridge a uno en macvlan sin puerto publicado, que declara espera pero no referencia el host. Válida y no bloquea el arranque por canal.
- T-44: arista que referencia el host con la espera desmarcada. Sigue exigiendo canal alcanzable.

Las pruebas se realizan en 08-Calidad-Y-Pruebas. El anexo E-22 declara los casos con entrada concreta y resultado esperado, y el anexo E-16 declara que el catálogo está pensado para que cada regla se traduzca en una prueba automatizada.

## 7. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 1.0 | 2026-07-29 | Versión inicial. Transcripción del enunciado, del momento de validación y de la respuesta ante incumplimiento que declara el anexo E-16 del intake. No se reinterpreta ninguno de los tres |
