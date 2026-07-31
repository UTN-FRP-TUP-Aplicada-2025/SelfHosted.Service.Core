# RN-26 — Ausencia de referencias derivadas de la interpolación importada

**Proyecto de código:** SelfHosted-Service
**Producto:** SelfHosted Service
**Documento:** RN-26-Ausencia-De-Referencias-Derivadas-De-La-Importacion.md
**Versión:** 2.0
**Estado:** Propuesto
**Fecha:** 2026-07-30
**Autor:** Analista Funcional Senior (AG-02)

**Trazabilidad upstream:** PRODUCT-INTAKE-SelfHosted-Service anexo E-16, fila RN-26. **Autoría declarada en la fuente:** **[D-i]** completa, sin revisar. Se consume declarándola revisable.

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

Una importación desde el formato de composición nunca deriva referencias de la interpolación del propio formato: las expresiones de ese formato se traducen con las reglas del anexo E-21; un signo peso duplicado del archivo es un escape y se importa como signo peso literal; una ocurrencia literal de la expresión propia se importa como texto, sin interpretarse, y se persiste escapada. La única referencia que la importación crea es la que reexpresa una dependencia explícita sobre una variable cuyo literal ya coincide con el host y el puerto del destino: no inventa un valor ni una variable, reexpresa el que el archivo ya tenía.

## 2. Justificación

Derivar referencias de la interpolación del formato de composición produciría vínculos que el archivo original no declaraba, y la ida y vuelta dejaría de reproducir el archivo de partida. La única reexpresión admitida es la que no cambia el valor resuelto.

## 3. Ámbito de aplicación

**Momento de validación declarado en el anexo E-16:** Importación.

Se evalúa en la importación de un archivo de composición como proyecto SelfHosted nuevo.

## 4. Consecuencia si se viola

Invariante.

## 5. CU afectados

CU-08, CU-11.

## 6. Pruebas que la verifican

- T-40: importar el caso C-5, cuyo archivo usa interpolación propia del formato y declara una dependencia explícita. De la interpolación no sale ninguna referencia; la única creada es la reexpresión de la variable que ya llevaba el host.
- T-48: importar un archivo con signos peso duplicados. Se importan como literales; no se crea ninguna referencia ni ninguna variable secreta.

Las pruebas se realizan en 08-Calidad-Y-Pruebas. El anexo E-22 declara los casos con entrada concreta y resultado esperado, y el anexo E-16 declara que el catálogo está pensado para que cada regla se traduzca en una prueba automatizada.

## 7. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 2.0 | 2026-07-30 | Migración normativa del conjunto 4.1 al 6.0, fase M4 corte 3, bajo `Rules-Especificacion-Funcional` 4.0, `Vocabulario-Rules` 2.1 y `Migracion-Rules` 1.0. Clasificación **regenerar contenido** por el salto major 2.0 → 4.0 de la regla que gobierna la categoría; fuente de contenido: el **documento de origen**, archivado sin modificación en `_legacy/2026-07-30/`. Sube **major** porque la nomenclatura anterior deja de cumplir. **El enunciado de la invariante no cambió de contenido normativo**: una regla de negocio es atemporal y esta migración es únicamente léxica y de forma de cabecera. Cabecera: la etiqueta `Proyecto` pasa a `Producto` sobre el mismo valor de plano producto —`SelfHosted Service`, que es el `Nombre-Producto`—, según `Vocabulario-Rules` §3 y §4 R3 y el referente R4 del plan de migración §3.5; la trazabilidad upstream apunta al `PRODUCT-INTAKE-SelfHosted-Service` renombrado. Sustitución léxica **por ocurrencia** según `Vocabulario-Rules` §9.5, con censo declarado: **2 ocurrencias de «proyecto»**, de las cuales 1 era la etiqueta de cabecera y se sustituyó; la restante —«como proyecto SelfHosted nuevo» en §3— designa la **entidad del dominio** y quedó intacta. Ninguna designa el emprendimiento y **ninguna se promovió a «proyecto de código»**. **Cero** ocurrencias de «solución» y **cero** de la cadena `resoluci`. **Glosario:** desde la 4.0 el vocabulario de la categoría vive en `Glosario-Funcional.md`, artefacto propio y obligatorio para los ocho tipos D8 (§2.1 y §4.2.4), y ya no en el punto 6 de `Modelo-Conceptual.md`; los términos «formato de composición», «escape del signo peso» y «reexpresión de una dependencia explícita», que esta regla comparte con RN-25 y con los CU de importación, se devolvieron al lote que emite ese glosario y acá no se redefinen |
| 1.0 | 2026-07-29 | Versión inicial. Transcripción del enunciado, del momento de validación y de la respuesta ante incumplimiento que declara el anexo E-16 del intake. No se reinterpreta ninguno de los tres |
