# RN-33 — Invariancia de las referencias ante el renombrado

**Proyecto de código:** SelfHosted-Service
**Producto:** SelfHosted Service
**Documento:** RN-33-Invariancia-De-Las-Referencias-Ante-El-Renombrado.md
**Versión:** 2.0
**Estado:** Propuesto
**Fecha:** 2026-07-30
**Autor:** Analista Funcional Senior (AG-02)

**Trazabilidad upstream:** PRODUCT-INTAKE-SelfHosted-Service anexo E-16, fila RN-33. **Autoría declarada en la fuente:** Enunciado **[D]**, decisión D-8 ampliada por D-12. Forma **[D-i]**, sin revisar: se consume declarándola revisable.

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

**[D]:** renombrar un elemento referenciado no invalida ni altera ninguna referencia que le apunte, y no produce cambios pendientes en el conjunto de cambios. Alcanza al servicio y, desde D-12, también a la variable. Un servicio puede llamarse `shared` sin que ninguna expresión quede ambigua. **[D-i]:** se logra persistiendo la expresión en su forma vinculada, con el identificador del servicio destino y el de la variable, y renderizando los nombres al mostrarla.

## 2. Justificación

Vincular por nombre hace que renombrar rompa en silencio. Es el defecto que D-8 corrigió a nivel de servicio y que D-12 bajó al nivel de la variable. La promesa de NB-01 es que la arquitectura quede declarada y por lo tanto verificable: si renombrar rompe en silencio lo que apuntaba al servicio, esa declaración nunca fue tal.

## 3. Ámbito de aplicación

**Momento de validación declarado en el anexo E-16:** Renombrado de un servicio o de una variable.

Se evalúa al renombrar un servicio y al renombrar una variable referenciada.

## 4. Consecuencia si se viola

Invariante, verificable por prueba: tras renombrar, toda expresión que apuntaba al elemento sigue resolviendo al mismo valor y la interfaz muestra el nombre nuevo.

## 5. CU afectados

CU-02, CU-03, CU-04, CU-22, CU-25, CU-34, CU-35.

## 6. Pruebas que la verifican

- T-55: renombrar el servicio `db` del proyecto 12, con `api` referenciándolo en dos variables. Ninguna referencia se rompe y no aparece ningún cambio pendiente.
- T-58: renombrar la variable `POSTGRES_USER` de `db`, con `api` referenciándola. Ninguna referencia se rompe.
- T-51: crear un servicio llamado `shared` en un proyecto con variables compartidas referenciadas. Aceptado, sin ambigüedad.

Las pruebas se realizan en 08-Calidad-Y-Pruebas. El anexo E-22 declara los casos con entrada concreta y resultado esperado, y el anexo E-16 declara que el catálogo está pensado para que cada regla se traduzca en una prueba automatizada.

## 7. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 2.0 | 2026-07-30 | Migración normativa del conjunto 4.1 al 6.0, fase M4 corte 3, bajo `Rules-Especificacion-Funcional` 4.0 y `Vocabulario-Rules` 2.1. Clasificación **regenerar contenido** por el salto major de la regla que la gobierna; fuente de contenido: el documento de origen, archivado en `_legacy/2026-07-30/`. Sube **major** porque la nomenclatura anterior deja de cumplir. Cabecera: la etiqueta `Proyecto` pasa a `Producto` sobre el mismo valor, según `Vocabulario-Rules` §3, y la trazabilidad upstream apunta al `PRODUCT-INTAKE-SelfHosted-Service` renombrado. Sustitución léxica **por ocurrencia** según `Vocabulario-Rules` §9.5 y el plan de migración §3.5: **cero ocurrencias de «solución»** y por lo tanto cero sustituciones; tampoco hay «resolución». Las tres ocurrencias de «proyecto» se clasificaron por referente y **ninguna pasó a «proyecto de código»**: dos son la entidad del dominio —«el proyecto 12» y «un proyecto con variables compartidas referenciadas», las dos en §6— y quedan intactas según el PRODUCT-INTAKE §12 y el glosario raíz de `Vision-Producto.md` §9; la restante era la etiqueta de cabecera. Cero ocurrencias del emprendimiento. **El enunciado de la invariante no cambió**: renombrar sigue no invalidando ninguna referencia, sigue alcanzando al servicio y a la variable, y la forma vinculada sigue declarada como **[D-i]** revisable. La migración es léxica y de forma de cabecera |
| 1.0 | 2026-07-29 | Versión inicial. Transcripción del enunciado, del momento de validación y de la respuesta ante incumplimiento que declara el anexo E-16 del intake. No se reinterpreta ninguno de los tres |
