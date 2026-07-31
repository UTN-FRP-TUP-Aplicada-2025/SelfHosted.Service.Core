# RN-18 — Escalado horizontal con dirección por réplica

**Proyecto de código:** SelfHosted-Service
**Producto:** SelfHosted Service
**Documento:** RN-18-Escalado-Horizontal-Con-Direccion-Por-Replica.md
**Versión:** 2.0
**Estado:** Propuesto
**Fecha:** 2026-07-30
**Autor:** Analista Funcional Senior (AG-02)

**Trazabilidad upstream:** PRODUCT-INTAKE-SelfHosted-Service anexo E-16, fila RN-18. **Autoría declarada en la fuente:** **[E]** de la fuente base.

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

El escalado horizontal crea réplicas con nombres sufijados y sin dirección IP fija duplicada.

## 2. Justificación

El escalado horizontal y la dirección fija de macvlan son incompatibles entre sí, porque dos réplicas no pueden compartir dirección. El modelo lo admite reservando una dirección por réplica, y la interfaz debe pedirlas explícitamente en lugar de fallar en el arranque. Es la respuesta declarada al caso límite CL-06.

## 3. Ámbito de aplicación

**Momento de validación declarado en el anexo E-16:** Cambio de réplicas.

Se evalúa al modificar la cantidad de réplicas de un servicio.

## 4. Consecuencia si se viola

Respuesta `422` si el servicio tiene una sola dirección fija y se piden más réplicas.

## 5. CU afectados

CU-19.

## 6. Pruebas que la verifican

- T-19: servicio C-3, en macvlan con una dirección fija, al que se le piden 2 réplicas. Rechazado `422`: hace falta una dirección por réplica.

Las pruebas se realizan en 08-Calidad-Y-Pruebas. El anexo E-22 declara los casos con entrada concreta y resultado esperado, y el anexo E-16 declara que el catálogo está pensado para que cada regla se traduzca en una prueba automatizada.

## 7. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 2.0 | 2026-07-30 | Migración normativa del conjunto 4.1 al 6.0, fase M4 corte 3, bajo `Rules-Especificacion-Funcional` 4.0, `Vocabulario-Rules` 2.1 y `Migracion-Rules` 1.0. Clasificación **regenerar contenido** por el salto major 2.0 → 4.0 de la regla que gobierna la categoría; fuente de contenido: el **documento de origen**, archivado sin modificación en `_legacy/2026-07-30/`. Sube **major** porque la nomenclatura anterior deja de cumplir. **El enunciado de la invariante no cambió de contenido normativo**: una regla de negocio es atemporal y esta migración es únicamente léxica y de forma de cabecera. Cabecera: la etiqueta `Proyecto` pasa a `Producto` sobre el mismo valor de plano producto —`SelfHosted Service`, que es el `Nombre-Producto`—, según `Vocabulario-Rules` §3 y §4 R3 y el referente R4 del plan de migración §3.5; la trazabilidad upstream apunta al `PRODUCT-INTAKE-SelfHosted-Service` renombrado. Sustitución léxica **por ocurrencia** según `Vocabulario-Rules` §9.5, con censo declarado: **1 ocurrencia de «proyecto»**, la etiqueta de cabecera, sustituida; ninguna designa la entidad del dominio ni el emprendimiento y **ninguna se promovió a «proyecto de código»**. **Cero** ocurrencias de «solución» y **cero** de la cadena `resoluci`. **Glosario:** desde la 4.0 el vocabulario de la categoría vive en `Glosario-Funcional.md`, artefacto propio y obligatorio para los ocho tipos D8 (§2.1 y §4.2.4), y ya no en el punto 6 de `Modelo-Conceptual.md`; los términos que esta regla acuña o precisa se devolvieron al lote que emite ese glosario y acá no se redefinen, y los que ya declara `Vision-Producto.md` §9 se referencian sin duplicarse |
| 1.0 | 2026-07-29 | Versión inicial. Transcripción del enunciado, del momento de validación y de la respuesta ante incumplimiento que declara el anexo E-16 del intake. No se reinterpreta ninguno de los tres |
