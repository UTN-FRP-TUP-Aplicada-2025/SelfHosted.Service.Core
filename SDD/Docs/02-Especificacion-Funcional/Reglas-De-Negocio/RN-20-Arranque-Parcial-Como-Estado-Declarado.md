# RN-20 — Arranque parcial como estado declarado

**Proyecto de código:** SelfHosted-Service
**Producto:** SelfHosted Service
**Documento:** RN-20-Arranque-Parcial-Como-Estado-Declarado.md
**Versión:** 2.0
**Estado:** Propuesto
**Fecha:** 2026-07-30
**Autor:** Analista Funcional Senior (AG-02)

**Trazabilidad upstream:** PRODUCT-INTAKE-SelfHosted-Service anexo E-16, fila RN-20. **Autoría declarada en la fuente:** **[E]** de la fuente base.

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

Un proyecto SelfHosted con al menos un conflicto puede arrancar parcialmente, quedando parcialmente activo.

## 2. Justificación

Un despliegue parcial es un estado legítimo del modelo y no un accidente a evitar (D-1). La regla es la que impide que la situación se resuelva como un error silencioso o como un estado indeterminado.

## 3. Ámbito de aplicación

**Momento de validación declarado en el anexo E-16:** Arranque.

Se evalúa al arrancar un proyecto SelfHosted con al menos un conflicto de dirección, y al elegir la resolución de arranque parcial que ofrece el informe de conflicto.

## 4. Consecuencia si se viola

Estado explícito, no error silencioso.

## 5. CU afectados

CU-18, CU-20, CU-21, CU-24, CU-27, CU-28.

## 6. Pruebas que la verifican

- T-24: arrancar un proyecto de 3 servicios con 1 en conflicto. Arrancan 2; el proyecto queda parcialmente activo, sin error silencioso.

Las pruebas se realizan en 08-Calidad-Y-Pruebas. El anexo E-22 declara los casos con entrada concreta y resultado esperado, y el anexo E-16 declara que el catálogo está pensado para que cada regla se traduzca en una prueba automatizada.

## 7. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 2.0 | 2026-07-30 | Migración normativa del conjunto 4.1 al 6.0, fase M4 corte 3, bajo `Rules-Especificacion-Funcional` 4.0, `Vocabulario-Rules` 2.1 y `Migracion-Rules` 1.0. Clasificación **regenerar contenido** por el salto major 2.0 → 4.0 de la regla que gobierna la categoría; fuente de contenido: el **documento de origen**, archivado sin modificación en `_legacy/2026-07-30/`. Sube **major** porque la nomenclatura anterior deja de cumplir. **El enunciado de la invariante no cambió de contenido normativo**: una regla de negocio es atemporal y esta migración es únicamente léxica y de forma de cabecera. Cabecera: la etiqueta `Proyecto` pasa a `Producto` sobre el mismo valor de plano producto —`SelfHosted Service`, que es el `Nombre-Producto`—, según `Vocabulario-Rules` §3 y §4 R3 y el referente R4 del plan de migración §3.5; la trazabilidad upstream apunta al `PRODUCT-INTAKE-SelfHosted-Service` renombrado. Sustitución léxica **por ocurrencia** según `Vocabulario-Rules` §9.5, con censo declarado: **5 ocurrencias de «proyecto»**, de las cuales 1 era la etiqueta de cabecera y se sustituyó; las 4 restantes —«Un proyecto SelfHosted» en el enunciado de §1, «un proyecto SelfHosted» en §3 y las dos del caso T-24 en §6— designan la **entidad del dominio** y quedaron intactas, incluida la del enunciado, que es su sujeto gramatical. Ninguna designa el emprendimiento y **ninguna se promovió a «proyecto de código»**. **Cero** ocurrencias de «solución». **1 ocurrencia de «resolución»**, en §3 —«la resolución de arranque parcial»—: contiene la cadena `soluci` y **quedó intacta**, verificado por barrido negativo antes y después de la sustitución. **Glosario:** desde la 4.0 el vocabulario de la categoría vive en `Glosario-Funcional.md`, artefacto propio y obligatorio para los ocho tipos D8 (§2.1 y §4.2.4), y ya no en el punto 6 de `Modelo-Conceptual.md`; los términos que esta regla acuña o precisa —«arranque parcial», «parcialmente activo»— se devolvieron al lote que emite ese glosario y acá no se redefinen, y los que ya declara `Vision-Producto.md` §9 se referencian sin duplicarse |
| 1.0 | 2026-07-29 | Versión inicial. Transcripción del enunciado, del momento de validación y de la respuesta ante incumplimiento que declara el anexo E-16 del intake. No se reinterpreta ninguno de los tres |
