# RC-16 — Exclusión entre el valor en claro y la marca de secreta

**Proyecto:** SelfHosted Service
**Documento:** RC-16-Exclusion-Entre-Valor-Y-Marca-De-Secreta.md
**Versión:** 1.0
**Estado:** Propuesto
**Fecha:** 2026-07-29
**Autor:** Analista Funcional Senior (AG-02)

**Trazabilidad upstream:** SOLUTION-INTAKE anexo E-9, tablas `variables` y `variables_proyecto`, nota que declara el valor ausente cuando la variable es secreta; E-16 RN-15 y RN-23

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

Una variable marcada como secreta no lleva valor en claro: su material viaja como referencia a un secreto.

## 2. Entidades involucradas

- Variable de servicio.
- Variable compartida del proyecto.
- Secreto.

## 3. Tipo de restricción

Valor permitido, expresado como exclusión entre dos atributos.

## 4. Mecanismo de verificación conceptual

Se comprueba verificando que ninguna variable marcada como secreta tenga valor, y que su referencia a secreto esté presente. La comprobación de que el secreto no se devuelve en claro por ninguna vía pertenece a RN-15 y se prueba desde los casos de uso de exportación y de lectura.

## 5. RN o CU que la justifican

- RN-15 Prohibición de devolver secretos en claro.
- RN-23 Propagación del carácter de secreto.
- CU-07, CU-09, CU-34, CU-35.

## 6. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 1.0 | 2026-07-29 | Versión inicial, derivada de la restricción declarada en la fuente citada en la cabecera. La regla transcribe la restricción; no la reinterpreta |
