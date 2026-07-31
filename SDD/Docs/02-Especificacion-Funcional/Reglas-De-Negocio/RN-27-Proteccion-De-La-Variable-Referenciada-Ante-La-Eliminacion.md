# RN-27 — Protección de la variable referenciada ante la eliminación

**Proyecto de código:** SelfHosted-Service
**Producto:** SelfHosted Service
**Documento:** RN-27-Proteccion-De-La-Variable-Referenciada-Ante-La-Eliminacion.md
**Versión:** 2.0
**Estado:** Propuesto
**Fecha:** 2026-07-30
**Autor:** Analista Funcional Senior (AG-02)

**Trazabilidad upstream:** PRODUCT-INTAKE-SelfHosted-Service anexo E-16, fila RN-27. **Autoría declarada en la fuente:** **[D-i]** completa, sin revisar. Se consume declarándola revisable.

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

No se puede eliminar una variable compartida del proyecto SelfHosted, ni una variable referenciada desde otro servicio, mientras exista al menos una referencia vigente.

## 2. Justificación

Sin la regla, eliminar una variable dejaría referencias colgadas que sólo fallarían al desplegar. La lista de servicios y claves que la referencian es lo que convierte el rechazo en accionable.

## 3. Ámbito de aplicación

**Momento de validación declarado en el anexo E-16:** Eliminación de la variable.

Se evalúa al eliminar una variable compartida del proyecto SelfHosted y al eliminar una variable de servicio referenciada desde otro servicio.

## 4. Consecuencia si se viola

Respuesta `409` con la lista de servicios y claves que la referencian.

## 5. CU afectados

CU-03, CU-22, CU-25, CU-34, CU-35.

## 6. Pruebas que la verifican

- T-41: eliminar la variable compartida `TZ` del proyecto 12, referenciada por `api`. Rechazado `409` con la lista de quienes la referencian.

Las pruebas se realizan en 08-Calidad-Y-Pruebas. El anexo E-22 declara los casos con entrada concreta y resultado esperado, y el anexo E-16 declara que el catálogo está pensado para que cada regla se traduzca en una prueba automatizada.

## 7. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 2.0 | 2026-07-30 | Migración normativa del conjunto 4.1 al 6.0, fase M4 corte 3, bajo `Rules-Especificacion-Funcional` 4.0, `Vocabulario-Rules` 2.1 y `Migracion-Rules` 1.0. Clasificación **regenerar contenido** por el salto major 2.0 → 4.0 de la regla que gobierna la categoría; fuente de contenido: el **documento de origen**, archivado sin modificación en `_legacy/2026-07-30/`. Sube **major** porque la nomenclatura anterior deja de cumplir. **El enunciado de la invariante no cambió de contenido normativo**: una regla de negocio es atemporal y esta migración es únicamente léxica y de forma de cabecera. Cabecera: la etiqueta `Proyecto` pasa a `Producto` sobre el mismo valor de plano producto —`SelfHosted Service`, que es el `Nombre-Producto`—, según `Vocabulario-Rules` §3 y §4 R3 y el referente R4 del plan de migración §3.5; la trazabilidad upstream apunta al `PRODUCT-INTAKE-SelfHosted-Service` renombrado. Sustitución léxica **por ocurrencia** según `Vocabulario-Rules` §9.5, con censo declarado: **4 ocurrencias de «proyecto»**, de las cuales 1 era la etiqueta de cabecera y se sustituyó; las 3 restantes —«variable compartida del proyecto SelfHosted» en el enunciado de §1 y en §3, y «del proyecto 12» en el caso T-41 de §6— designan la **entidad del dominio**, que es el ámbito de la variable que la regla protege, y quedaron intactas. Ninguna designa el emprendimiento y **ninguna se promovió a «proyecto de código»**. **Cero** ocurrencias de «solución» y **cero** de la cadena `resoluci`. **Glosario:** desde la 4.0 el vocabulario de la categoría vive en `Glosario-Funcional.md`, artefacto propio y obligatorio para los ocho tipos D8 (§2.1 y §4.2.4), y ya no en el punto 6 de `Modelo-Conceptual.md`; el término «referencia vigente», que esta regla acuña, se devolvió al lote que emite ese glosario y acá no se redefine, y «variable compartida del proyecto», que ya declara `Vision-Producto.md` §9, se referencia sin duplicarse |
| 1.0 | 2026-07-29 | Versión inicial. Transcripción del enunciado, del momento de validación y de la respuesta ante incumplimiento que declara el anexo E-16 del intake. No se reinterpreta ninguno de los tres |
