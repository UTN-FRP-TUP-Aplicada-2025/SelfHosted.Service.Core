# RC-15 — Dependencia existencial del servicio y de sus elementos respecto del proyecto

**Proyecto:** SelfHosted Service
**Documento:** RC-15-Dependencia-Existencial-Del-Servicio.md
**Versión:** 1.0
**Estado:** Propuesto
**Fecha:** 2026-07-29
**Autor:** Analista Funcional Senior (AG-02)

**Trazabilidad upstream:** SOLUTION-INTAKE anexo E-9, claves foráneas con propagación en cascada de `servicios`, `variables`, `variables_proyecto`, `enlaces`, `reservas_ip` y `despliegues`; §17.P.2 invariante I1; E-16 RN-02

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

Los servicios de un proyecto SelfHosted, y con ellos sus variables, sus enlaces y sus reservas de dirección, no existen fuera de ese proyecto: al desaparecer el proyecto desaparecen con él.

## 2. Entidades involucradas

- Proyecto SelfHosted.
- Servicio.
- Variable de servicio.
- Enlace.
- Reserva de dirección.

## 3. Tipo de restricción

Referencial, con propagación en cascada.

## 4. Mecanismo de verificación conceptual

Se comprueba verificando que ningún servicio, variable, enlace ni reserva quede referenciando un proyecto o un servicio que ya no existe. Es la forma persistida de la invariante que declara que un servicio pertenece a exactamente un proyecto SelfHosted.

## 5. RN o CU que la justifican

- RN-02 Pertenencia del servicio a un único proyecto.
- CU-02, CU-03.

## 6. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 1.0 | 2026-07-29 | Versión inicial, derivada de la restricción declarada en la fuente citada en la cabecera. La regla transcribe la restricción; no la reinterpreta |
