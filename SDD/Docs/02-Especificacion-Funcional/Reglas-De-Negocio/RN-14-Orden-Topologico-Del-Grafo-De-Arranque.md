# RN-14 — Orden topológico del grafo de arranque

**Proyecto de código:** SelfHosted-Service
**Producto:** SelfHosted Service
**Documento:** RN-14-Orden-Topologico-Del-Grafo-De-Arranque.md
**Versión:** 2.0
**Estado:** Propuesto
**Fecha:** 2026-07-30
**Autor:** Analista Funcional Senior (AG-02)

**Trazabilidad upstream:** PRODUCT-INTAKE-SelfHosted-Service anexo E-16, fila RN-14. **Autoría declarada en la fuente:** Ampliación **[D-i]**, sin revisar. Se consume declarándola revisable. El enunciado original de la regla sigue siendo **[E]** de la fuente base.

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

El arranque del proyecto SelfHosted respeta el orden topológico del grafo de arranque, que es el subgrafo de las aristas que declaran espera al destino. Una arista que no declara espera dibuja el vínculo y marca redespliegue, pero no ordena.

## 2. Justificación

El orden dejó de deducirse de qué variable se referencia y pasó a ser una propiedad declarada (D-11), porque la deducción fallaba en los dos sentidos: un servicio que referencia el host de otro pero reintenta la conexión no necesita esperar, y uno que no referencia nada del otro sí puede necesitarlo.

## 3. Ámbito de aplicación

**Momento de validación declarado en el anexo E-16:** Arranque.

Se evalúa al arrancar un proyecto SelfHosted completo, sobre el subgrafo de las aristas con espera declarada.

## 4. Consecuencia si se viola

Invariante.

## 5. CU afectados

CU-04, CU-18.

## 6. Pruebas que la verifican

- T-14: proyecto C-5 con `ia-webui` dependiente de `ia-api`. Orden de arranque `ia-api`, `ia-video`, `ia-webui`.
- T-44: arista que referencia el host con la espera desmarcada. Los dos servicios arrancan en cualquier orden.
- T-46: arista que declara espera sin referenciar el host. Ordena el arranque.

Las pruebas se realizan en 08-Calidad-Y-Pruebas. El anexo E-22 declara los casos con entrada concreta y resultado esperado, y el anexo E-16 declara que el catálogo está pensado para que cada regla se traduzca en una prueba automatizada.

## 7. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 2.0 | 2026-07-30 | Migración normativa del conjunto 4.1 al 6.0, fase M4 corte 3, bajo `Rules-Especificacion-Funcional` 4.0, `Vocabulario-Rules` 2.1 y `Migracion-Rules` 1.0. Clasificación **regenerar contenido** por el salto major 2.0 → 4.0 de la regla que gobierna la categoría; fuente de contenido: el **documento de origen**, archivado sin modificación en `_legacy/2026-07-30/`. Sube **major** porque la nomenclatura anterior deja de cumplir. **El enunciado de la invariante no cambió de contenido normativo**: una regla de negocio es atemporal, y esta migración es únicamente léxica y de forma de cabecera; las siete secciones obligatorias de `Rules-Especificacion-Funcional` §4.2.1 conservan su texto y su orden. **Cabecera:** la etiqueta `Proyecto` pasa a `Producto` sobre el mismo valor de plano producto —`SelfHosted Service`, que es el `Nombre-Producto`—, según `Vocabulario-Rules` §3 y §4 R3 y el referente R4 del plan de migración §3.5; la trazabilidad upstream apunta al `PRODUCT-INTAKE-SelfHosted-Service` renombrado. **Sustitución léxica por ocurrencia** según `Vocabulario-Rules` §9.5, con censo declarado: **4 ocurrencias de «proyecto»**; de las que **1 es la etiqueta de cabecera** y se sustituyó; **3 designan la entidad del dominio** —el agrupador de servicios contenedorizados que el usuario crea desde el portal, con su red y su lienzo— y se preservan tal cual; y **ninguna se promovió a «proyecto de código»**. **Cero** ocurrencias de «solución» con el referente de nivel superior. **Cero** ocurrencias de la cadena `resoluci`.  **Glosario:** desde la 4.0 el vocabulario de la categoría vive en `Glosario-Funcional.md`, artefacto propio y obligatorio para los ocho tipos D8 (§2.1 y §4.2.4), y ya no en el punto 6 de `Modelo-Conceptual.md`; los términos que esta regla acuña o precisa se devolvieron al lote que emite ese glosario y acá no se redefinen, y los que ya declara [Vision-Producto](../../00-Contexto/Vision-Producto.md) §9 se referencian sin duplicarse. El bloque de procedencia del destino sigue declarando la 4.1 y no se toca: es trabajo de M5 |
| 1.0 | 2026-07-29 | Versión inicial. Transcripción del enunciado, del momento de validación y de la respuesta ante incumplimiento que declara el anexo E-16 del intake. No se reinterpreta ninguno de los tres |
