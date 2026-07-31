# RN-17 — Registro de auditoría de toda operación de escritura

**Proyecto:** SelfHosted Service
**Documento:** RN-17-Registro-De-Auditoria-De-Toda-Escritura.md
**Versión:** 1.0
**Estado:** Propuesto
**Fecha:** 2026-07-29
**Autor:** Analista Funcional Senior (AG-02)

**Trazabilidad upstream:** SOLUTION-INTAKE-SelfHosted-Service anexo E-16, fila RN-17. **Autoría declarada en la fuente:** **[E]** de la fuente base.

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

Toda operación de escritura queda registrada en auditoría con su actor.

## 2. Justificación

Un único administrador no significa sin auditoría: el registro de auditoría es lo que permite entender qué disparó un despliegue cuando lo hizo un automatismo y no una persona. Es además una de las mitigaciones declaradas del riesgo RG-03, el acceso al socket del motor como control total del host.

## 3. Ámbito de aplicación

**Momento de validación declarado en el anexo E-16:** Cada operación.

Se evalúa en toda operación de escritura, venga de la interfaz o de la API. El actor es el administrador o el token identificado por su prefijo. Los cinco campos de auditoría son momento, actor, acción, entidad y resultado, y la retención declarada es de 90 días (DA-07).

## 4. Consecuencia si se viola

Invariante.

## 5. CU afectados

CU-01, CU-02, CU-03, CU-04, CU-05, CU-07, CU-11, CU-12, CU-13, CU-15, CU-16, CU-17, CU-18, CU-19, CU-21, CU-22, CU-23, CU-24, CU-29, CU-30, CU-31, CU-32, CU-33, CU-34, CU-35, CU-37, CU-38.

## 6. Pruebas que la verifican

- T-26: cualquier operación de escritura por API con token. Fila de auditoría con actor identificado por el prefijo del token.

Las pruebas se realizan en 08-Calidad-Y-Pruebas. El anexo E-22 declara los casos con entrada concreta y resultado esperado, y el anexo E-16 declara que el catálogo está pensado para que cada regla se traduzca en una prueba automatizada.

## 7. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 1.0 | 2026-07-29 | Corrección absorbida dentro de la versión 1.0, sin subirla y sin archivar, por la política de versionado de `Master-Prompt.md` §5: el documento está en estado `Propuesto`. Se califica la forma «el registro» a secas, que tenía tres referentes distintos en la categoría y no era resoluble leyendo esta sección por separado, que es como se generan los artefactos de las categorías siguientes. La entrada de glosario con los cuatro referentes vive en `Modelo-Datos/Modelo-Conceptual.md` §6. Las formas ya calificadas no se tocaron: no colisionan. |
| 1.0 | 2026-07-29 | Versión inicial. Transcripción del enunciado, del momento de validación y de la respuesta ante incumplimiento que declara el anexo E-16 del intake. No se reinterpreta ninguno de los tres |
