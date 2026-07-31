# RN-22 — Prohibición del ciclo de valor entre referencias

**Proyecto de código:** SelfHosted-Service
**Producto:** SelfHosted Service
**Documento:** RN-22-Prohibicion-Del-Ciclo-De-Valor.md
**Versión:** 2.0
**Estado:** Propuesto
**Fecha:** 2026-07-30
**Autor:** Analista Funcional Senior (AG-02)

**Trazabilidad upstream:** PRODUCT-INTAKE-SelfHosted-Service anexo E-16, fila RN-22. **Autoría declarada en la fuente:** **[D-i]** completa, sin revisar. Se consume declarándola revisable.

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

Las referencias no pueden formar un ciclo de valor: una cadena de referencias que vuelva sobre sí misma, sea dentro de un mismo servicio o atravesando varios. Es distinta de RN-05, que impide un ciclo de arranque. Ningún ciclo puede atravesar el nivel proyecto: una variable compartida contiene siempre un literal o material secreto, nunca una referencia, y el esquema lo hace cumplir por ausencia de columna.

## 2. Justificación

Desde que el grafo de arranque lo forman sólo las aristas que declaran espera, un ciclo formado por aristas que no esperan no lo ve RN-05 y lo cubre únicamente esta regla. Sin ella, una cadena de referencias circular no terminaría de resolver.

## 3. Ámbito de aplicación

**Momento de validación declarado en el anexo E-16:** Alta y edición de la variable, y resolución previa al despliegue.

Se evalúa al declarar o editar una variable con referencia y en la resolución previa a crear el contenedor.

## 4. Consecuencia si se viola

Respuesta `422` señalando la cadena completa del ciclo.

## 5. CU afectados

CU-16, CU-24, CU-34, CU-35.

## 6. Pruebas que la verifican

- T-36: en el mismo servicio, dos variables que se referencian mutuamente. Rechazado `422` con la cadena completa del ciclo.
- T-52: ciclo de valor entre servicios en aristas que no declaran espera. Rechazado `422` con la cadena completa.
- T-45: dos referencias mutuas cuyas claves apuntadas son literales. Aceptado: no es ciclo de valor.

Las pruebas se realizan en 08-Calidad-Y-Pruebas. El anexo E-22 declara los casos con entrada concreta y resultado esperado, y el anexo E-16 declara que el catálogo está pensado para que cada regla se traduzca en una prueba automatizada.

## 7. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 2.0 | 2026-07-30 | Migración normativa del conjunto 4.1 al 6.0, fase M4 corte 3, bajo `Rules-Especificacion-Funcional` 4.0, `Vocabulario-Rules` 2.1 y `Migracion-Rules` 1.0. Clasificación **regenerar contenido** por el salto major 2.0 → 4.0 de la regla que gobierna la categoría; fuente de contenido: el **documento de origen**, archivado sin modificación en `_legacy/2026-07-30/`. Sube **major** porque la nomenclatura anterior deja de cumplir. **El enunciado de la invariante no cambió de contenido normativo**: la prohibición del ciclo de valor, su distinción respecto de RN-05 y la imposibilidad de atravesar el nivel proyecto quedan exactamente como estaban. Cabecera: la etiqueta `Proyecto` pasa a `Producto` sobre el mismo valor de plano producto —`SelfHosted Service`, que es el `Nombre-Producto`—, según `Vocabulario-Rules` §3 y §4 R3 y el referente R4 del plan de migración §3.5; la trazabilidad upstream apunta al `PRODUCT-INTAKE-SelfHosted-Service` renombrado. Sustitución léxica **por ocurrencia** según `Vocabulario-Rules` §9.5, con censo declarado: **2 ocurrencias de «proyecto»**, de las cuales 1 era la etiqueta de cabecera y se sustituyó; la restante —«el nivel proyecto» en el enunciado de §1— designa la **entidad del dominio** y quedó intacta: es el nivel de la variable compartida y convertirla cambiaría el alcance de la prohibición. Ninguna designa el emprendimiento y **ninguna se promovió a «proyecto de código»**. **Cero** ocurrencias de «solución». **2 ocurrencias de «resolución»**, las dos en §3 —«resolución previa al despliegue» y «la resolución previa a crear el contenedor»—: contienen la cadena `soluci` y **quedaron intactas**, verificado por barrido negativo antes y después de la sustitución. **Glosario:** desde la 4.0 el vocabulario de la categoría vive en `Glosario-Funcional.md`, artefacto propio y obligatorio para los ocho tipos D8 (§2.1 y §4.2.4), y ya no en el punto 6 de `Modelo-Conceptual.md`; el término «ciclo de valor», que esta regla acuña y que RN-05 contrasta con «ciclo de arranque», se devolvió al lote que emite ese glosario y acá no se redefine |
| 1.0 | 2026-07-29 | Versión inicial. Transcripción del enunciado, del momento de validación y de la respuesta ante incumplimiento que declara el anexo E-16 del intake. No se reinterpreta ninguno de los tres |
