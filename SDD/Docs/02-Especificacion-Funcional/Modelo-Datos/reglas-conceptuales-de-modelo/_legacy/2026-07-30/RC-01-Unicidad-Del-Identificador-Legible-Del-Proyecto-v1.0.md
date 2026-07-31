# RC-01 — Unicidad del identificador legible del proyecto SelfHosted

**Proyecto:** SelfHosted Service
**Documento:** RC-01-Unicidad-Del-Identificador-Legible-Del-Proyecto.md
**Versión:** 1.0
**Estado:** Propuesto
**Fecha:** 2026-07-29
**Autor:** Analista Funcional Senior (AG-02)

**Trazabilidad upstream:** SOLUTION-INTAKE anexo E-9, tabla `proyectos`, restricción de unicidad sobre `slug`

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

Dos proyectos SelfHosted distintos no pueden compartir su identificador legible dentro de una misma instalación.

## 2. Entidades involucradas

- Proyecto SelfHosted.

## 3. Tipo de restricción

Identidad.

## 4. Mecanismo de verificación conceptual

Se comprueba enumerando los proyectos SelfHosted declarados y verificando que ningún identificador legible aparezca dos veces. La comprobación es interna a la instalación, porque no hay más de una.

## 5. RN o CU que la justifican

- CU-01 Alta de proyecto SelfHosted.
- CU-02 Listado, renombrado y eliminación de proyectos SelfHosted.
- Ninguna RN del catálogo E-16 la enuncia: es restricción del modelo persistido y no del catálogo de reglas. Se declara acá para que quede verificable.

## 6. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 1.0 | 2026-07-29 | Versión inicial, derivada de la restricción declarada en la fuente citada en la cabecera. La regla transcribe la restricción; no la reinterpreta |
