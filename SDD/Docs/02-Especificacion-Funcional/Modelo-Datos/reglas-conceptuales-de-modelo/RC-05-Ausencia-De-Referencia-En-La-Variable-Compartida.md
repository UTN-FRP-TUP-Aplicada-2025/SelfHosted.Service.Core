# RC-05 — Ausencia de referencia en la variable compartida del proyecto

**Proyecto de código:** SelfHosted-Service
**Producto:** SelfHosted Service
**Documento:** RC-05-Ausencia-De-Referencia-En-La-Variable-Compartida.md
**Versión:** 2.0
**Estado:** Propuesto
**Fecha:** 2026-07-30
**Autor:** Analista Funcional Senior (AG-02)

**Trazabilidad upstream:** PRODUCT-INTAKE anexo E-9, tabla `variables_proyecto`, nota que declara la ausencia de columna de referencia y su fundamento; E-4 punto 2; E-16 RN-22. Especificación derivada DI-08, sin revisar: se consume como revisable

**Vocabulario:** los términos del dominio que esta regla usa se declaran en `../../Glosario-Funcional.md`, el glosario propio de la categoría 02 desde `Rules-Especificacion-Funcional` 4.0 §2.1; los que ya declara el glosario raíz de la cadena, [`Vision-Producto.md`](../../../00-Contexto/Vision-Producto.md) §9, se referencian ahí y no se redefinen. Esta regla no define vocabulario.

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

Una variable compartida del proyecto contiene siempre un literal o material secreto, nunca una expresión de referencia a otra variable.

## 2. Entidades involucradas

- Variable compartida del proyecto.
- Variable de servicio.
- Secreto.

## 3. Tipo de restricción

Valor permitido.

## 4. Mecanismo de verificación conceptual

Se comprueba verificando que ninguna variable compartida admita una expresión de referencia como valor. Es la forma en que el modelo hace cumplir que ningún ciclo de resolución atraviese el nivel proyecto: sin referencia en el nivel compartido, la cadena de resolución no puede volver por ahí.

## 5. RN o CU que la justifican

- RN-22 Prohibición del ciclo de valor.
- CU-34, CU-35.

## 6. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 2.0 | 2026-07-30 | **Migración normativa 4.1 → 6.0**, fase M4, corte 3, sobre el plan [`Plan-Migracion-4.1-a-6.0.md`](../../../Audit/Plan-Migracion-4.1-a-6.0.md) §3.5 y la fila de este documento de su §4. Clasificación **regenerar contenido**; fuente de contenido: **documento de origen**. Sube **major** porque `Rules-Especificacion-Funcional` pasa de 2.0 a **4.0**. **El enunciado normativo no cambió.** Las seis secciones obligatorias de §4.2.3 —enunciado, entidades involucradas, tipo de restricción, mecanismo de verificación conceptual, RN o CU que la justifican y control de cambios— conservan su texto palabra por palabra: la ausencia de referencia en la variable compartida del proyecto se migra en su forma léxica y no en su contenido. **Renombre de vocabulario normativo por la `[5.0]` del framework, por el procedimiento por ocurrencia de `Vocabulario-Rules.md` §9.5 y nunca por reemplazo global de cadena:** la etiqueta de cabecera `**Proyecto:**` sobre un valor de plano producto pasa a `**Producto:**` (1 ocurrencia), y el prefijo del nombre del documento de entrada pasa a `PRODUCT-INTAKE` (1). **Censo de «proyecto» en este archivo: 6 ocurrencias.** Sustituida 1, la etiqueta de cabecera. De las restantes, 4 designan la **entidad del dominio** —el proyecto SelfHosted— y no se tocan; 1 son identificadores persistidos del anexo E-9 y no se tocan. Ninguna designa el emprendimiento y **ninguna se promovió a «proyecto de código»**: promoverla corrompería la especificación. **Barrido negativo del término de nivel superior.** La cadena que la `[5.0]` renombró a «producto» aparece 2 veces en este archivo, y las 2 son subcadena de la palabra que designa la materialización de una referencia —el término que el enunciado usa y que este archivo lleva en su nombre—, no el término renombrado, que no aparece nunca: se conservan intactas y el conteo es idéntico antes y después. Cero apariciones de la palabra inexistente que el reemplazo global produce. **El vocabulario deja de definirse en los artefactos del modelo:** la 4.0 §2.1 crea `Glosario-Funcional.md` como artefacto propio de la categoría, y el bloque de cabecera suma el puntero a él con la regla de no duplicación frente al glosario raíz de [`Vision-Producto.md`](../../../00-Contexto/Vision-Producto.md) §9 (§3.3). La versión 1.0 queda archivada en `_legacy/2026-07-30/`. |
| 1.0 | 2026-07-29 | Versión inicial, derivada de la restricción declarada en la fuente citada en la cabecera. La regla transcribe la restricción; no la reinterpreta |
