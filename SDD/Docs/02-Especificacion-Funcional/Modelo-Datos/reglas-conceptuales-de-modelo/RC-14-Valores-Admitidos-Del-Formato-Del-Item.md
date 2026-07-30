# RC-14 — Valores admitidos del formato de un ítem del catálogo

**Proyecto:** SelfHosted Service
**Documento:** RC-14-Valores-Admitidos-Del-Formato-Del-Item.md
**Versión:** 1.0
**Estado:** Propuesto
**Fecha:** 2026-07-29
**Autor:** Analista Funcional Senior (AG-02)

**Trazabilidad upstream:** SOLUTION-INTAKE anexo E-9, tabla `catalogo_items`, condición sobre los valores del formato y su nota; E-6, regla de conversión

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

El formato de un ítem del catálogo admite exactamente dos valores: el de servicio suelto y el de subgrafo.

## 2. Entidades involucradas

- Ítem del catálogo.

## 3. Tipo de restricción

Valor permitido.

## 4. Mecanismo de verificación conceptual

Se comprueba verificando que todo ítem declare uno de los dos valores admitidos. Se persiste para poder convertir un catálogo importado sin adivinar su forma; la conversión del formato antiguo al nuevo es determinista y envuelve la plantilla en un subgrafo de un nodo.

## 5. RN o CU que la justifican

- RN-30 Instanciación como N servicios y N contenedores.
- CU-16, CU-17.

## 6. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 1.0 | 2026-07-29 | Versión inicial, derivada de la restricción declarada en la fuente citada en la cabecera. La regla transcribe la restricción; no la reinterpreta |
