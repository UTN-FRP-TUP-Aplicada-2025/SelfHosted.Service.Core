> **Bloque de archivado.** Estado: `Superado`. Copia completa y autocontenida de la versión 1.0 de `RN-08-Datos-Obligatorios-Del-Origen-Repositorio.md`, tomada el 2026-07-29 antes de incorporar a la especificación las definiciones de alta y configuración de servicios y de ítems del catálogo que `SDD/Estado/Redefinicion-Servicio.md` v2.0 establece en su parte normativa (§16 a §23). La versión vigente es `../../RN-08-Datos-Obligatorios-Del-Origen-Repositorio.md`. El cuerpo de este snapshot no se modifica.

# RN-08 — Datos obligatorios del origen repositorio

**Proyecto:** SelfHosted Service
**Documento:** RN-08-Datos-Obligatorios-Del-Origen-Repositorio.md
**Versión:** 1.0
**Estado:** Propuesto
**Fecha:** 2026-07-29
**Autor:** Analista Funcional Senior (AG-02)

**Trazabilidad upstream:** SOLUTION-INTAKE-SelfHosted-Service anexo E-16, fila RN-08. **Autoría declarada en la fuente:** **[E]** de la fuente base.

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

El servicio con origen «repositorio» requiere ruta de Dockerfile y rama.

## 2. Justificación

Sin la ruta del archivo de construcción y sin la rama, la construcción de la imagen no es reproducible ni determinable: el sistema no sabría qué construir.

## 3. Ámbito de aplicación

**Momento de validación declarado en el anexo E-16:** Alta.

Se evalúa al dar de alta un servicio cuyo origen es un repositorio remoto.

## 4. Consecuencia si se viola

Respuesta `422`.

## 5. CU afectados

CU-03, CU-15.

## 6. Pruebas que la verifican

- El anexo E-22 no declara un caso ejecutable propio para esta regla. **Brecha declarada**: 08-Calidad-Y-Pruebas debe derivar el caso, con entrada concreta y resultado esperado, a partir del enunciado del anexo E-16 y de la variante de origen por repositorio del anexo E-2.

Las pruebas se realizan en 08-Calidad-Y-Pruebas. El anexo E-22 declara los casos con entrada concreta y resultado esperado, y el anexo E-16 declara que el catálogo está pensado para que cada regla se traduzca en una prueba automatizada.

## 7. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 1.0 | 2026-07-29 | Versión inicial. Transcripción del enunciado, del momento de validación y de la respuesta ante incumplimiento que declara el anexo E-16 del intake. No se reinterpreta ninguno de los tres |
