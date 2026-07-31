# RC-17 — Vínculo por identidad y nunca por nombre

**Proyecto de código:** SelfHosted-Service
**Producto:** SelfHosted Service
**Documento:** RC-17-Vinculo-Por-Identidad-Del-Modelo.md
**Versión:** 2.0
**Estado:** Propuesto
**Fecha:** 2026-07-30
**Autor:** Analista Funcional Senior (AG-02)

**Trazabilidad upstream:** PRODUCT-INTAKE anexo E-9, bloque de identidad de objeto (D-12, quinta pasada); E-16 RN-33 y RN-35; §17.P.11 decisiones del modelo de dominio; casos T-55 y T-58

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

Toda relación entre objetos del modelo se establece por la identidad del objeto y nunca por su nombre. El nombre es un atributo del objeto y puede cambiar sin romper ninguna relación.

## 2. Entidades involucradas

- Todas las entidades del modelo, y en particular Servicio, Variable de servicio, Variable compartida del proyecto, Secreto y Red del proyecto.

## 3. Tipo de restricción

Identidad.

## 4. Mecanismo de verificación conceptual

Se comprueba renombrando un elemento referenciado y verificando que toda relación que le apuntaba siga apuntando al mismo objeto, que el valor resuelto no cambie y que no aparezca ningún cambio pendiente. La comprobación es negativa: lo que se verifica es que nada se rompió.

## 5. RN o CU que la justifican

- RN-33 Invariancia de las referencias ante el renombrado.
- RN-35 Vínculo por identidad y nunca por nombre.
- CU-02, CU-03, CU-04, CU-34, CU-35.

## 6. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 2.0 | 2026-07-30 | **Migración normativa 4.1 → 6.0**, fase M4, corte 3, sobre el plan [`Plan-Migracion-4.1-a-6.0.md`](../../../Audit/Plan-Migracion-4.1-a-6.0.md) §3.5 y la fila de este documento de su §4. Clasificación **regenerar contenido**; fuente de contenido: **documento de origen**. Sube **major** porque `Rules-Especificacion-Funcional` pasa de 2.0 a **4.0**. **El enunciado normativo no cambió.** Las seis secciones obligatorias de §4.2.3 —enunciado, entidades involucradas, tipo de restricción, mecanismo de verificación conceptual, RN o CU que la justifican y control de cambios— conservan su texto palabra por palabra: el vínculo por identidad y nunca por nombre se migra en su forma léxica y no en su contenido. **Renombre de vocabulario normativo por la `[5.0]` del framework, por el procedimiento por ocurrencia de `Vocabulario-Rules.md` §9.5 y nunca por reemplazo global de cadena:** la etiqueta de cabecera `**Proyecto:**` sobre un valor de plano producto pasa a `**Producto:**` (1 ocurrencia), y el prefijo del nombre del documento de entrada pasa a `PRODUCT-INTAKE` (1). **Censo de «proyecto» en este archivo: 3 ocurrencias.** Sustituida 1, la etiqueta de cabecera. De las restantes, 2 designan la **entidad del dominio** —el proyecto SelfHosted— y no se tocan. Ninguna designa el emprendimiento y **ninguna se promovió a «proyecto de código»**: promoverla corrompería la especificación. **Barrido negativo del término de nivel superior.** La cadena que la `[5.0]` renombró a «producto» no aparece en este archivo, ni antes ni después: no hubo ninguna sustitución por ese frente y cero apariciones de la palabra inexistente que el reemplazo global produce. **El vocabulario deja de definirse en los artefactos del modelo:** la 4.0 §2.1 crea `Glosario-Funcional.md` como artefacto propio de la categoría, y el bloque de cabecera suma el puntero a él con la regla de no duplicación frente al glosario raíz de [`Vision-Producto.md`](../../../00-Contexto/Vision-Producto.md) §9 (§3.3). La versión 1.0 queda archivada en `_legacy/2026-07-30/`. |
| 1.0 | 2026-07-29 | Versión inicial, derivada de la restricción declarada en la fuente citada en la cabecera. La regla transcribe la restricción; no la reinterpreta |
