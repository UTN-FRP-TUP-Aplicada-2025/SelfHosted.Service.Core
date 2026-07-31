# RC-18 — Conservación del historial de despliegues

**Proyecto:** SelfHosted Service
**Documento:** RC-18-Conservacion-Del-Historial-De-Despliegues.md
**Versión:** 1.0
**Estado:** Propuesto
**Fecha:** 2026-07-29
**Autor:** Analista Funcional Senior (AG-02)

**Trazabilidad upstream:** SOLUTION-INTAKE §17.P.4, decisión de esquema 2, que declara que `despliegues` no se borra nunca; §17.P.11 DA-07, que fija la retención; anexo E-3

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

El despliegue no se borra: es el historial que alimenta la línea de tiempo del servicio, con la política de retención declarada de los últimos cincuenta despliegues por servicio.

## 2. Entidades involucradas

- Despliegue.
- Servicio.

## 3. Tipo de restricción

Derivación, expresada como política de conservación.

## 4. Mecanismo de verificación conceptual

Se comprueba verificando que ninguna operación del modelo elimine despliegues y que la reducción del historial ocurra únicamente por la política de retención declarada, que es configurable. Un despliegue retirado o fallido sigue existiendo como registro.

## 5. RN o CU que la justifican

- RN-31 Resultado del despliegue por contenedor.
- CU-13, CU-27, CU-28.

## 6. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 1.0 | 2026-07-29 | Versión inicial, derivada de la restricción declarada en la fuente citada en la cabecera. La regla transcribe la restricción; no la reinterpreta |
