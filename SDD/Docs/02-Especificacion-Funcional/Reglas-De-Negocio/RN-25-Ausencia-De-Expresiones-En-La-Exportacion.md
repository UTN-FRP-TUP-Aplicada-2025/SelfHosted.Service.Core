# RN-25 — Ausencia de expresiones sin resolver en la exportación

**Proyecto de código:** SelfHosted-Service
**Producto:** SelfHosted Service
**Documento:** RN-25-Ausencia-De-Expresiones-En-La-Exportacion.md
**Versión:** 2.0
**Estado:** Propuesto
**Fecha:** 2026-07-30
**Autor:** Analista Funcional Senior (AG-02)

**Trazabilidad upstream:** PRODUCT-INTAKE-SelfHosted-Service anexo E-16, fila RN-25. **Autoría declarada en la fuente:** **[D-i]** completa, sin revisar. Se consume declarándola revisable.

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

Una exportación al formato de composición nunca emite una expresión de referencia: emite el valor resuelto, o un marcador de variable con el archivo de variables vacío si el valor referenciado es secreto. Y todo signo peso que forme parte de un valor literal se emite escapado, para que la herramienta de composición lo entregue tal cual en lugar de interpolarlo ni fallar al leerlo. La expresión sin resolver se preserva en el manifiesto propio.

## 2. Justificación

El archivo exportado tiene que levantar en otra instalación sin el producto delante: una expresión propia del modelo no significa nada fuera de él. Preservarla en el manifiesto propio es lo que permite recuperar la intención de cada referencia al reimportar.

## 3. Ámbito de aplicación

**Momento de validación declarado en el anexo E-16:** Exportación.

Se evalúa en la exportación al formato de composición y en la generación del manifiesto propio.

## 4. Consecuencia si se viola

Invariante, verificable por prueba: ningún archivo exportado contiene la expresión sin escapar, ningún signo peso literal queda sin duplicar, y el archivo levanta.

## 5. CU afectados

CU-09, CU-10, CU-12, CU-35.

## 6. Pruebas que la verifican

- T-39: exportar el proyecto 12, que tiene seis referencias, secretas y no secretas. El archivo no contiene ninguna expresión; el manifiesto propio lleva las seis sin resolver.
- T-47: exportar un servicio con variables cuyo valor literal contiene un signo peso. Todo signo peso literal viaja duplicado y el archivo levanta.

Las pruebas se realizan en 08-Calidad-Y-Pruebas. El anexo E-22 declara los casos con entrada concreta y resultado esperado, y el anexo E-16 declara que el catálogo está pensado para que cada regla se traduzca en una prueba automatizada.

## 7. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 2.0 | 2026-07-30 | Migración normativa del conjunto 4.1 al 6.0, fase M4 corte 3, bajo `Rules-Especificacion-Funcional` 4.0, `Vocabulario-Rules` 2.1 y `Migracion-Rules` 1.0. Clasificación **regenerar contenido** por el salto major 2.0 → 4.0 de la regla que gobierna la categoría; fuente de contenido: el **documento de origen**, archivado sin modificación en `_legacy/2026-07-30/`. Sube **major** porque la nomenclatura anterior deja de cumplir. **El enunciado de la invariante no cambió de contenido normativo**: una regla de negocio es atemporal y esta migración es únicamente léxica y de forma de cabecera. Cabecera: la etiqueta `Proyecto` pasa a `Producto` sobre el mismo valor de plano producto —`SelfHosted Service`, que es el `Nombre-Producto`—, según `Vocabulario-Rules` §3 y §4 R3 y el referente R4 del plan de migración §3.5; la trazabilidad upstream apunta al `PRODUCT-INTAKE-SelfHosted-Service` renombrado. Sustitución léxica **por ocurrencia** según `Vocabulario-Rules` §9.5, con censo declarado: **2 ocurrencias de «proyecto»**, de las cuales 1 era la etiqueta de cabecera y se sustituyó; la restante —«exportar el proyecto 12» en el caso T-39 de §6— designa la **entidad del dominio** y quedó intacta. Ninguna designa el emprendimiento y **ninguna se promovió a «proyecto de código»**. **1 ocurrencia de «solución»**, en §2, que designaba el nivel superior y pasa a «producto» con su concordancia de género —«sin la solución delante» a «sin **el** producto delante»—. Es la **única** sustitución de este término en el lote RN-15 a RN-27, y no cambia lo que la justificación afirma: el archivo exportado tiene que levantar sin el sistema que lo produjo delante. **Cero** ocurrencias de la cadena `resoluci`; «sin resolver» y «valor resuelto» no la contienen. **Glosario:** desde la 4.0 el vocabulario de la categoría vive en `Glosario-Funcional.md`, artefacto propio y obligatorio para los ocho tipos D8 (§2.1 y §4.2.4), y ya no en el punto 6 de `Modelo-Conceptual.md`; los términos «formato de composición», «manifiesto propio» y «marcador de variable», que esta regla usa junto con RN-26 y con los CU de exportación, se devolvieron al lote que emite ese glosario y acá no se redefinen |
| 1.0 | 2026-07-29 | Versión inicial. Transcripción del enunciado, del momento de validación y de la respuesta ante incumplimiento que declara el anexo E-16 del intake. No se reinterpreta ninguno de los tres |
