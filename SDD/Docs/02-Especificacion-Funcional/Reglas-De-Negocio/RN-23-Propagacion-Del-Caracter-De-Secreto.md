# RN-23 — Propagación del carácter de secreto por la referencia

**Proyecto:** SelfHosted Service
**Documento:** RN-23-Propagacion-Del-Caracter-De-Secreto.md
**Versión:** 1.0
**Estado:** Propuesto
**Fecha:** 2026-07-29
**Autor:** Analista Funcional Senior (AG-02)

**Trazabilidad upstream:** SOLUTION-INTAKE-SelfHosted-Service anexo E-16, fila RN-23. **Autoría declarada en la fuente:** **[D-i]** completa, sin revisar. Se consume declarándola revisable.

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

El carácter de secreto se propaga por la referencia: si la variable referenciada es secreta, la que la referencia se trata como secreta a todos los efectos. Vale también para una referencia interpolada dentro de un valor más largo. Ninguna variable provista por el sistema es secreta, de modo que una referencia a una variable provista nunca dispara la propagación.

## 2. Justificación

Sin la propagación, una variable que referencia una credencial la expondría en claro por la puerta de al lado, dejando sin efecto a RN-15 en el caso más frecuente: una cadena de conexión que interpola una contraseña compartida.

## 3. Ámbito de aplicación

**Momento de validación declarado en el anexo E-16:** Resolución, toda respuesta de la API y toda exportación.

Se evalúa al resolver la referencia, en toda respuesta de la API y en toda exportación.

## 4. Consecuencia si se viola

Enmascarado con `***`, igual que RN-15. El valor resuelto no se persiste en claro.

## 5. CU afectados

CU-09, CU-10, CU-13, CU-34, CU-35.

## 6. Pruebas que la verifican

- T-37: variable de `api` que referencia la variable compartida secreta `DB_PASSWORD`. La variable resultante es secreta, con el valor ausente y enmascarada en toda respuesta.

Las pruebas se realizan en 08-Calidad-Y-Pruebas. El anexo E-22 declara los casos con entrada concreta y resultado esperado, y el anexo E-16 declara que el catálogo está pensado para que cada regla se traduzca en una prueba automatizada.

## 7. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 1.0 | 2026-07-29 | Versión inicial. Transcripción del enunciado, del momento de validación y de la respuesta ante incumplimiento que declara el anexo E-16 del intake. No se reinterpreta ninguno de los tres |
