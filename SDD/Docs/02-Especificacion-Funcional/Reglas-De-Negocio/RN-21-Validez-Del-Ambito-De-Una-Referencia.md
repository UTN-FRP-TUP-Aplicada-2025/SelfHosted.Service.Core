# RN-21 — Validez del ámbito de una referencia de variable

**Proyecto de código:** SelfHosted-Service
**Producto:** SelfHosted Service
**Documento:** RN-21-Validez-Del-Ambito-De-Una-Referencia.md
**Versión:** 2.0
**Estado:** Propuesto
**Fecha:** 2026-07-30
**Autor:** Analista Funcional Senior (AG-02)

**Trazabilidad upstream:** PRODUCT-INTAKE-SelfHosted-Service anexo E-16, fila RN-21. **Autoría declarada en la fuente:** Enunciado **[D]**, decisión D-6. Exigibilidad **[D-i]**, sin revisar: momento de validación y códigos de respuesta se consumen declarándolos revisables.

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

**[D]:** toda referencia debe resolver a una variable de ámbito válido, y los ámbitos válidos son exactamente tres: del propio servicio, compartida del proyecto SelfHosted, o de otro servicio del mismo proyecto SelfHosted. Una referencia a un servicio de otro proyecto es siempre inválida. La variable apuntada puede ser declarada o provista por el sistema. **[D-i]:** la variable apuntada además debe existir ya al validar y no sólo al desplegar.

## 2. Justificación

Los tres ámbitos son la enumeración cerrada que la decisión D-6 fija. Que la referencia no cruce el límite del proyecto SelfHosted es lo que mantiene al proyecto como unidad autocontenida. Adelantar la exigencia de existencia al momento de la validación evita que el error aparezca recién al crear el contenedor.

## 3. Ámbito de aplicación

**Momento de validación declarado en el anexo E-16:** **[D-i]:** alta y edición de la variable, aplicación del conjunto de cambios pendientes y creación del contenedor.

Se evalúa al declarar o editar una variable con referencia, al aplicar el conjunto de cambios pendientes y al crear el contenedor.

## 4. Consecuencia si se viola

**[D-i]:** `422` señalando la expresión y la causa: clave inexistente, servicio inexistente o servicio de otro proyecto SelfHosted.

## 5. CU afectados

CU-04, CU-11, CU-13, CU-15, CU-16, CU-24, CU-33, CU-34, CU-35.

## 6. Pruebas que la verifican

- T-34: variable de `api` con una referencia a un servicio inexistente. Rechazado `422` con la causa de servicio inexistente.
- T-35: variable de `api` del proyecto 12 con una referencia a un servicio del proyecto 7. Rechazado `422`, causa de servicio de otro proyecto.

Las pruebas se realizan en 08-Calidad-Y-Pruebas. El anexo E-22 declara los casos con entrada concreta y resultado esperado, y el anexo E-16 declara que el catálogo está pensado para que cada regla se traduzca en una prueba automatizada.

## 7. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 2.0 | 2026-07-30 | Migración normativa del conjunto 4.1 al 6.0, fase M4 corte 3, bajo `Rules-Especificacion-Funcional` 4.0, `Vocabulario-Rules` 2.1 y `Migracion-Rules` 1.0. Clasificación **regenerar contenido** por el salto major 2.0 → 4.0 de la regla que gobierna la categoría; fuente de contenido: el **documento de origen**, archivado sin modificación en `_legacy/2026-07-30/`. Sube **major** porque la nomenclatura anterior deja de cumplir. **El enunciado de la invariante no cambió de contenido normativo**: los tres ámbitos válidos, la invalidez de la referencia que cruza el límite y la exigencia de existencia al validar quedan exactamente como estaban, con sus marcadores de autoría **[D]** y **[D-i]** intactos. Cabecera: la etiqueta `Proyecto` pasa a `Producto` sobre el mismo valor de plano producto —`SelfHosted Service`, que es el `Nombre-Producto`—, según `Vocabulario-Rules` §3 y §4 R3 y el referente R4 del plan de migración §3.5; la trazabilidad upstream apunta al `PRODUCT-INTAKE-SelfHosted-Service` renombrado. Sustitución léxica **por ocurrencia** según `Vocabulario-Rules` §9.5, con censo declarado: **10 ocurrencias de «proyecto»**, de las cuales 1 era la etiqueta de cabecera y se sustituyó; las 9 restantes —3 en el enunciado de §1, 2 en §2, 1 en §4 y 3 en los casos T-34 y T-35 de §6— designan la **entidad del dominio**, que es el ámbito mismo que esta invariante delimita, y quedaron intactas. **Este documento es el más expuesto del lote al daño de sustituir «proyecto»**: convertir cualquiera de esas nueve a «proyecto de código» cambiaría el alcance de la regla. Ninguna designa el emprendimiento y **ninguna se promovió a «proyecto de código»**. **Cero** ocurrencias de «solución» y **cero** de la cadena `resoluci`; los verbos «resolver» y «resoluble» no la contienen. **Glosario:** desde la 4.0 el vocabulario de la categoría vive en `Glosario-Funcional.md`, artefacto propio y obligatorio para los ocho tipos D8 (§2.1 y §4.2.4), y ya no en el punto 6 de `Modelo-Conceptual.md`; los términos que esta regla acuña o precisa —«ámbito de una referencia» y sus tres valores— se devolvieron al lote que emite ese glosario y acá no se redefinen, y los que ya declara `Vision-Producto.md` §9 se referencian sin duplicarse |
| 1.0 | 2026-07-29 | Versión inicial. Transcripción del enunciado, del momento de validación y de la respuesta ante incumplimiento que declara el anexo E-16 del intake. No se reinterpreta ninguno de los tres |
