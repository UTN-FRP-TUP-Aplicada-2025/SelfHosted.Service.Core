# RN-02 — Pertenencia del servicio a un único proyecto SelfHosted

**Proyecto de código:** SelfHosted-Service
**Producto:** SelfHosted Service
**Documento:** RN-02-Pertenencia-Del-Servicio-A-Un-Unico-Proyecto.md
**Versión:** 2.0
**Estado:** Propuesto
**Fecha:** 2026-07-30
**Autor:** Analista Funcional Senior (AG-02)

**Trazabilidad upstream:** PRODUCT-INTAKE-SelfHosted-Service anexo E-16, fila RN-02. **Autoría declarada en la fuente:** **[E]** de la fuente base. Su fundamento fue completado por la decisión D-3 del 2026-07-28, que cerró IC-05.

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

Un servicio pertenece a un único proyecto SelfHosted.

## 2. Justificación

En el caso normal no hay forma de que un servicio esté en dos proyectos, porque los servicios se dan de alta desde cero al construir el proyecto. El único camino por el que la situación podría producirse es la adopción, y en ese camino lo impide el filtro del descubrimiento (RN-11). Es la invariante I1 del modelo, y la fuente del fundamento es el intake §17.P.11, apartado IC-05.

## 3. Ámbito de aplicación

**Momento de validación declarado en el anexo E-16:** Alta y adopción.

Se evalúa al dar de alta un servicio y al incorporar un contenedor existente a un proyecto SelfHosted.

## 4. Consecuencia si se viola

Respuesta `409`.

## 5. CU afectados

CU-03, CU-07, CU-11, CU-16.

## 6. Pruebas que la verifican

- El anexo E-22 no declara un caso ejecutable propio para esta regla. **Brecha declarada**: 08-Calidad-Y-Pruebas debe derivar el caso, con entrada concreta y resultado esperado, a partir del enunciado del anexo E-16 y del fundamento que el intake §17.P.11 aporta al cerrar IC-05.
- El caso T-15 del anexo E-22 verifica el filtro del descubrimiento y está asignado allí a RN-11, que es la regla que hace cumplir a ésta en el único camino por el que podría violarse. No es cobertura de RN-02 y no se cita como tal.

Las pruebas se realizan en 08-Calidad-Y-Pruebas. El anexo E-22 declara los casos con entrada concreta y resultado esperado, y el anexo E-16 declara que el catálogo está pensado para que cada regla se traduzca en una prueba automatizada.

## 7. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 2.0 | 2026-07-30 | Migración normativa del conjunto 4.1 al 6.0, fase M4 corte 3, bajo `Rules-Especificacion-Funcional` 4.0, `Vocabulario-Rules` 2.1 y `Migracion-Rules` 1.0. Clasificación **regenerar contenido** por el salto major 2.0 → 4.0 de la regla que gobierna la categoría; fuente de contenido: el **documento de origen**, archivado sin modificación en `_legacy/2026-07-30/`. Sube **major** porque la nomenclatura anterior deja de cumplir. **El enunciado de la invariante no cambió de contenido normativo**: una regla de negocio es atemporal, y esta migración es únicamente léxica y de forma de cabecera; las siete secciones obligatorias de `Rules-Especificacion-Funcional` §4.2.1 conservan su texto y su orden. **Cabecera:** la etiqueta `Proyecto` pasa a `Producto` sobre el mismo valor de plano producto —`SelfHosted Service`, que es el `Nombre-Producto`—, según `Vocabulario-Rules` §3 y §4 R3 y el referente R4 del plan de migración §3.5; la trazabilidad upstream apunta al `PRODUCT-INTAKE-SelfHosted-Service` renombrado. **Sustitución léxica por ocurrencia** según `Vocabulario-Rules` §9.5, con censo declarado: **7 ocurrencias de «proyecto»**; de las que **1 es la etiqueta de cabecera** y se sustituyó; **5 designan la entidad del dominio** —el agrupador de servicios contenedorizados que el usuario crea desde el portal, con su red y su lienzo— y se preservan tal cual; **1 es el nombre del archivo** en el campo `Documento`, que nombra a esa misma entidad del dominio (referente R6 del plan §3.5) y no se toca; y **ninguna se promovió a «proyecto de código»**. **Cero** ocurrencias de «solución» con el referente de nivel superior. **Cero** ocurrencias de la cadena `resoluci`. El nombre del archivo **no se renombra**: `Proyecto` nombra acá a la entidad del dominio y no a la unidad de compilación.  **Glosario:** desde la 4.0 el vocabulario de la categoría vive en `Glosario-Funcional.md`, artefacto propio y obligatorio para los ocho tipos D8 (§2.1 y §4.2.4), y ya no en el punto 6 de `Modelo-Conceptual.md`; los términos que esta regla acuña o precisa se devolvieron al lote que emite ese glosario y acá no se redefinen, y los que ya declara [Vision-Producto](../../00-Contexto/Vision-Producto.md) §9 se referencian sin duplicarse. El bloque de procedencia del destino sigue declarando la 4.1 y no se toca: es trabajo de M5 |
| 1.0 | 2026-07-29 | Corrección absorbida dentro de la versión 1.0, sin subirla y sin archivar, por la política de versionado de `Master-Prompt.md` §5: el documento está en estado `Propuesto` y la corrección proviene del audit de su propia fase de emisión. §6 presentaba el caso T-15 del anexo E-22 como cobertura de esta regla, cuando ese anexo lo asigna a RN-11 y RN-11 ya lo usa como caso propio. Se retira la cita y se declara la brecha de cobertura con el mismo formato que RN-08 y RN-10, porque esta regla es una de las tres que el anexo E-22 deja sin caso ejecutable propio. Origen: hallazgo H-02 del informe [Audit/B-02-03-r1.md](../../Audit/B-02-03-r1.md) |
| 1.0 | 2026-07-29 | Versión inicial. Transcripción del enunciado, del momento de validación y de la respuesta ante incumplimiento que declara el anexo E-16 del intake. No se reinterpreta ninguno de los tres |
