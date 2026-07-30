# RN-15 — Prohibición de devolver secretos en claro

**Proyecto:** SelfHosted Service
**Documento:** RN-15-Prohibicion-De-Devolver-Secretos-En-Claro.md
**Versión:** 1.0
**Estado:** Propuesto
**Fecha:** 2026-07-29
**Autor:** Analista Funcional Senior (AG-02)

**Trazabilidad upstream:** SOLUTION-INTAKE-SelfHosted-Service anexo E-16, fila RN-15. **Autoría declarada en la fuente:** **[E]** de la fuente base.

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

Un secreto nunca se devuelve en texto plano por la API ni se escribe en una exportación.

## 2. Justificación

Es la mitigación declarada del riesgo RG-09, secretos importados en la adopción que terminen visibles, y la condición que permite llevarse una exportación a otro servidor sin filtrar credenciales (historia de usuario 9).

## 3. Ámbito de aplicación

**Momento de validación declarado en el anexo E-16:** Toda respuesta y exportación.

Se evalúa en toda respuesta de la API, en toda pantalla de la interfaz y en toda exportación, incluidos el paso de clasificación de variables de la incorporación y la lectura de las variables compartidas del proyecto.

## 4. Consecuencia si se viola

Enmascarado con `***`.

## 5. CU afectados

CU-06, CU-07, CU-08, CU-09, CU-10, CU-12, CU-14, CU-17, CU-32, CU-34, CU-35.

## 6. Pruebas que la verifican

- T-18: exportar a formato de composición un proyecto con una variable secreta. La exportación emite un marcador y el archivo de variables con el valor vacío; el valor no aparece en ningún archivo.
- T-32: incorporar el caso C-2 marcando `ClaveMaestra` como secreta. El valor no se persiste en claro ni se devuelve por la API.
- T-37: variable que referencia una compartida secreta. Enmascarada en toda respuesta.

Las pruebas se realizan en 08-Calidad-Y-Pruebas. El anexo E-22 declara los casos con entrada concreta y resultado esperado, y el anexo E-16 declara que el catálogo está pensado para que cada regla se traduzca en una prueba automatizada.

## 7. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 1.0 | 2026-07-29 | Versión inicial. Transcripción del enunciado, del momento de validación y de la respuesta ante incumplimiento que declara el anexo E-16 del intake. No se reinterpreta ninguno de los tres |
