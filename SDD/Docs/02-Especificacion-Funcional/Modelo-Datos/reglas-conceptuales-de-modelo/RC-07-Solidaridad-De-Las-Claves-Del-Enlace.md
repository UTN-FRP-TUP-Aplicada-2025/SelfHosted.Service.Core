# RC-07 — Solidaridad de las dos claves de referencia del enlace

**Proyecto:** SelfHosted Service
**Documento:** RC-07-Solidaridad-De-Las-Claves-Del-Enlace.md
**Versión:** 1.0
**Estado:** Propuesto
**Fecha:** 2026-07-29
**Autor:** Analista Funcional Senior (AG-02)

**Trazabilidad upstream:** SOLUTION-INTAKE anexo E-9, tabla `enlaces`, condición que exige que las dos columnas de referencia vayan juntas; E-16 RN-34. Especificación derivada DI-15, sin revisar: se consume como revisable

---

## Tabla de contenido

- [1. Enunciado](#1-enunciado)
- [2. Entidades involucradas](#2-entidades-involucradas)
- [3. Tipo de restricción](#3-tipo-de-restricción)
- [4. Mecanismo de verificación conceptual](#4-mecanismo-de-verificación-conceptual)
- [5. RN o CU que la justifican](#5-rn-o-cu-que-la-justifican)
- [6. Control de cambios](#6-control-de-cambios)

---

## 1. Enunciado

En un enlace, la clave de la variable de origen y la clave referenciada del destino están las dos presentes o las dos ausentes.

## 2. Entidades involucradas

- Enlace.

## 3. Tipo de restricción

Valor permitido, expresado como dependencia entre dos atributos.

## 4. Mecanismo de verificación conceptual

Se comprueba verificando que no exista ningún enlace con exactamente una de las dos claves. Un enlace con las dos claves nace de una referencia; un enlace sin ninguna existe sólo por la espera que declara.

## 5. RN o CU que la justifican

- RN-34 Aporte obligatorio de la arista.
- CU-04, CU-11.

## 6. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 1.0 | 2026-07-29 | Versión inicial, derivada de la restricción declarada en la fuente citada en la cabecera. La regla transcribe la restricción; no la reinterpreta |
