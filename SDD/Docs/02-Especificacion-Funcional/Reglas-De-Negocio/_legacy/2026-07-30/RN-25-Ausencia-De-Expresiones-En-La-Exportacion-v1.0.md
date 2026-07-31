# RN-25 — Ausencia de expresiones sin resolver en la exportación

**Proyecto:** SelfHosted Service
**Documento:** RN-25-Ausencia-De-Expresiones-En-La-Exportacion.md
**Versión:** 1.0
**Estado:** Propuesto
**Fecha:** 2026-07-29
**Autor:** Analista Funcional Senior (AG-02)

**Trazabilidad upstream:** SOLUTION-INTAKE-SelfHosted-Service anexo E-16, fila RN-25. **Autoría declarada en la fuente:** **[D-i]** completa, sin revisar. Se consume declarándola revisable.

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

Una exportación al formato de composición nunca emite una expresión de referencia: emite el valor resuelto, o un marcador de variable con el archivo de variables vacío si el valor referenciado es secreto. Y todo signo peso que forme parte de un valor literal se emite escapado, para que la herramienta de composición lo entregue tal cual en lugar de interpolarlo ni fallar al leerlo. La expresión sin resolver se preserva en el manifiesto propio.

## 2. Justificación

El archivo exportado tiene que levantar en otra instalación sin la solución delante: una expresión propia del modelo no significa nada fuera de él. Preservarla en el manifiesto propio es lo que permite recuperar la intención de cada referencia al reimportar.

## 3. Ámbito de aplicación

**Momento de validación declarado en el anexo E-16:** Exportación.

Se evalúa en la exportación al formato de composición y en la generación del manifiesto propio.

## 4. Consecuencia si se viola

Invariante, verificable por prueba: ningún archivo exportado contiene la expresión sin escapar, ningún signo peso literal queda sin duplicar, y el archivo levanta.

## 5. CU afectados

CU-09, CU-10, CU-12, CU-35.

## 6. Pruebas que la verifican

- T-39: exportar el proyecto 12, que tiene seis referencias, secretas y no secretas. El archivo no contiene ninguna expresión; el manifiesto propio lleva las seis sin resolver.
- T-47: exportar un servicio con variables cuyo valor literal contiene un signo peso. Todo signo peso literal viaja duplicado y el archivo levanta.

Las pruebas se realizan en 08-Calidad-Y-Pruebas. El anexo E-22 declara los casos con entrada concreta y resultado esperado, y el anexo E-16 declara que el catálogo está pensado para que cada regla se traduzca en una prueba automatizada.

## 7. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 1.0 | 2026-07-29 | Versión inicial. Transcripción del enunciado, del momento de validación y de la respuesta ante incumplimiento que declara el anexo E-16 del intake. No se reinterpreta ninguno de los tres |
