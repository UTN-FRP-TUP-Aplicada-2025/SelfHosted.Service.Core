# RN-30 — Instanciación como N servicios y N contenedores

**Proyecto:** SelfHosted Service
**Documento:** RN-30-Instanciacion-Como-N-Servicios-Y-N-Contenedores.md
**Versión:** 1.0
**Estado:** Propuesto
**Fecha:** 2026-07-29
**Autor:** Analista Funcional Senior (AG-02)

**Trazabilidad upstream:** SOLUTION-INTAKE-SelfHosted-Service anexo E-16, fila RN-30. **Autoría declarada en la fuente:** **[D]** completa, decisión D-7.

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

Instanciar un ítem del catálogo crea N servicios y N contenedores, uno por cada nodo de su subgrafo, más los enlaces entre ellos. Ningún servicio instanciado comparte contenedor con otro.

## 2. Justificación

Empaquetar varios servicios en un mismo contenedor violaría la invariante que declara que un servicio es siempre exactamente un contenedor. El mecanismo es el mismo que la solución ya debe implementar para importar un archivo de composición, con parámetros encima.

## 3. Ámbito de aplicación

**Momento de validación declarado en el anexo E-16:** Instanciación.

Se evalúa al instanciar un ítem del catálogo en un proyecto SelfHosted.

## 4. Consecuencia si se viola

Invariante, verificable por prueba.

## 5. CU afectados

CU-16, CU-17.

## 6. Pruebas que la verifican

- T-43: instanciar el ítem `cat-api-con-base` en un proyecto que no tiene la clave compartida. Se crean dos servicios, dos contenedores y una arista con espera declarada; ningún contenedor aloja más de un servicio.

Las pruebas se realizan en 08-Calidad-Y-Pruebas. El anexo E-22 declara los casos con entrada concreta y resultado esperado, y el anexo E-16 declara que el catálogo está pensado para que cada regla se traduzca en una prueba automatizada.

## 7. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 1.0 | 2026-07-29 | Versión inicial. Transcripción del enunciado, del momento de validación y de la respuesta ante incumplimiento que declara el anexo E-16 del intake. No se reinterpreta ninguno de los tres |
