# RN-12 — Exclusión de los cambios visuales del conjunto de cambios pendientes

**Proyecto de código:** SelfHosted-Service
**Producto:** SelfHosted Service
**Documento:** RN-12-Exclusion-De-Los-Cambios-Visuales-Del-Changeset.md
**Versión:** 2.0
**Estado:** Propuesto
**Fecha:** 2026-07-30
**Autor:** Analista Funcional Senior (AG-02)

**Trazabilidad upstream:** PRODUCT-INTAKE-SelfHosted-Service anexo E-16, fila RN-12. **Autoría declarada en la fuente:** **[E]** de la fuente base.

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

Los cambios visuales no entran al conjunto de cambios pendientes ni disparan redespliegue.

## 2. Justificación

De lo contrario el usuario acumularía cambios pendientes por el mero hecho de ordenar el dibujo. Es una decisión pre-tomada declarada en §17.P.11.

## 3. Ámbito de aplicación

**Momento de validación declarado en el anexo E-16:** Edición del lienzo.

Se evalúa en toda edición de la disposición del lienzo: desplazamiento de un nodo, agrupación y cualquier otro cambio que no altere la configuración de un servicio.

## 4. Consecuencia si se viola

Invariante.

## 5. CU afectados

CU-03, CU-04, CU-05, CU-22, CU-23, CU-25.

## 6. Pruebas que la verifican

- T-22: mover un nodo del lienzo. Se guarda al instante; no entra al conjunto de cambios pendientes ni marca redespliegue.

Las pruebas se realizan en 08-Calidad-Y-Pruebas. El anexo E-22 declara los casos con entrada concreta y resultado esperado, y el anexo E-16 declara que el catálogo está pensado para que cada regla se traduzca en una prueba automatizada.

## 7. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 2.0 | 2026-07-30 | Migración normativa del conjunto 4.1 al 6.0, fase M4 corte 3, bajo `Rules-Especificacion-Funcional` 4.0, `Vocabulario-Rules` 2.1 y `Migracion-Rules` 1.0. Clasificación **regenerar contenido** por el salto major 2.0 → 4.0 de la regla que gobierna la categoría; fuente de contenido: el **documento de origen**, archivado sin modificación en `_legacy/2026-07-30/`. Sube **major** porque la nomenclatura anterior deja de cumplir. **El enunciado de la invariante no cambió de contenido normativo**: una regla de negocio es atemporal, y esta migración es únicamente léxica y de forma de cabecera; las siete secciones obligatorias de `Rules-Especificacion-Funcional` §4.2.1 conservan su texto y su orden. **Cabecera:** la etiqueta `Proyecto` pasa a `Producto` sobre el mismo valor de plano producto —`SelfHosted Service`, que es el `Nombre-Producto`—, según `Vocabulario-Rules` §3 y §4 R3 y el referente R4 del plan de migración §3.5; la trazabilidad upstream apunta al `PRODUCT-INTAKE-SelfHosted-Service` renombrado. **Sustitución léxica por ocurrencia** según `Vocabulario-Rules` §9.5, con censo declarado: **1 ocurrencia de «proyecto»**; de las que **1 es la etiqueta de cabecera** y se sustituyó; y **ninguna se promovió a «proyecto de código»**. **Cero** ocurrencias de «solución» con el referente de nivel superior. **Cero** ocurrencias de la cadena `resoluci`. **Corrección manual detectada y no propagada:** §5 lista `CU-03` entre los CU afectados y ninguna fila anterior de este control de cambios declara ese alta. Se interpreta como corrección intencional posterior a la emisión; **no se revierte ni se propaga** y se eleva al informe del corte según `Migracion-Rules` §4.2.3. Destinatario: agente humano del proyecto.  **Glosario:** desde la 4.0 el vocabulario de la categoría vive en `Glosario-Funcional.md`, artefacto propio y obligatorio para los ocho tipos D8 (§2.1 y §4.2.4), y ya no en el punto 6 de `Modelo-Conceptual.md`; los términos que esta regla acuña o precisa se devolvieron al lote que emite ese glosario y acá no se redefinen, y los que ya declara [Vision-Producto](../../00-Contexto/Vision-Producto.md) §9 se referencian sin duplicarse. El bloque de procedencia del destino sigue declarando la 4.1 y no se toca: es trabajo de M5 |
| 1.0 | 2026-07-29 | Versión inicial. Transcripción del enunciado, del momento de validación y de la respuesta ante incumplimiento que declara el anexo E-16 del intake. No se reinterpreta ninguno de los tres |
