# RN-14 — Orden topológico del grafo de arranque

**Proyecto:** SelfHosted Service
**Documento:** RN-14-Orden-Topologico-Del-Grafo-De-Arranque.md
**Versión:** 1.0
**Estado:** Propuesto
**Fecha:** 2026-07-29
**Autor:** Analista Funcional Senior (AG-02)

**Trazabilidad upstream:** SOLUTION-INTAKE-SelfHosted-Service anexo E-16, fila RN-14. **Autoría declarada en la fuente:** Ampliación **[D-i]**, sin revisar. Se consume declarándola revisable. El enunciado original de la regla sigue siendo **[E]** de la fuente base.

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

El arranque del proyecto SelfHosted respeta el orden topológico del grafo de arranque, que es el subgrafo de las aristas que declaran espera al destino. Una arista que no declara espera dibuja el vínculo y marca redespliegue, pero no ordena.

## 2. Justificación

El orden dejó de deducirse de qué variable se referencia y pasó a ser una propiedad declarada (D-11), porque la deducción fallaba en los dos sentidos: un servicio que referencia el host de otro pero reintenta la conexión no necesita esperar, y uno que no referencia nada del otro sí puede necesitarlo.

## 3. Ámbito de aplicación

**Momento de validación declarado en el anexo E-16:** Arranque.

Se evalúa al arrancar un proyecto SelfHosted completo, sobre el subgrafo de las aristas con espera declarada.

## 4. Consecuencia si se viola

Invariante.

## 5. CU afectados

CU-04, CU-18.

## 6. Pruebas que la verifican

- T-14: proyecto C-5 con `ia-webui` dependiente de `ia-api`. Orden de arranque `ia-api`, `ia-video`, `ia-webui`.
- T-44: arista que referencia el host con la espera desmarcada. Los dos servicios arrancan en cualquier orden.
- T-46: arista que declara espera sin referenciar el host. Ordena el arranque.

Las pruebas se realizan en 08-Calidad-Y-Pruebas. El anexo E-22 declara los casos con entrada concreta y resultado esperado, y el anexo E-16 declara que el catálogo está pensado para que cada regla se traduzca en una prueba automatizada.

## 7. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 1.0 | 2026-07-29 | Versión inicial. Transcripción del enunciado, del momento de validación y de la respuesta ante incumplimiento que declara el anexo E-16 del intake. No se reinterpreta ninguno de los tres |
