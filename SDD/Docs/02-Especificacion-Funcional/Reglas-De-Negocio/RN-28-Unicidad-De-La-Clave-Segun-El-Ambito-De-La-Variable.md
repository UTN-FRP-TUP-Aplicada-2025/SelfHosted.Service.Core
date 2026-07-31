# RN-28 — Unicidad de la clave según el ámbito de la variable

**Proyecto de código:** SelfHosted-Service
**Producto:** SelfHosted Service
**Documento:** RN-28-Unicidad-De-La-Clave-Segun-El-Ambito-De-La-Variable.md
**Versión:** 2.0
**Estado:** Propuesto
**Fecha:** 2026-07-30
**Autor:** Analista Funcional Senior (AG-02)

**Trazabilidad upstream:** PRODUCT-INTAKE-SelfHosted-Service anexo E-16, fila RN-28. **Autoría declarada en la fuente:** Reformulada **[D]**, decisión D-12.

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

La clave de una variable compartida no exige unicidad dentro del proyecto SelfHosted: es puramente descriptiva, no la lee ningún proceso y existe sólo para ser referenciada, de modo que dos compartidas pueden llamarse igual y se distinguen por identidad. Sí respeta el formato de una clave de variable. La unicidad que sí se exige es la de la clave de una variable de servicio dentro de su servicio, porque ésa es el contrato con el proceso que corre en el contenedor.

## 2. Justificación

Es el segundo de los dos casos de la consecuencia 2 de D-12: el modelo exige nombre único en exactamente dos lugares y en ninguno más. Que dos compartidas coincidan además en el valor es materia de la advertencia no bloqueante de RN-37, no de una restricción.

## 3. Ámbito de aplicación

**Momento de validación declarado en el anexo E-16:** Alta y edición.

Se evalúa al declarar o editar una variable, con distinto criterio según sea de servicio o compartida del proyecto SelfHosted.

## 4. Consecuencia si se viola

Respuesta `422` sólo por formato, o por clave duplicada dentro de un mismo servicio.

## 5. CU afectados

CU-03, CU-34, CU-35, CU-36.

## 6. Pruebas que la verifican

- T-42: declarar una segunda variable compartida `TZ` en el proyecto 12. Aceptado; si además el valor coincide, el sistema advierte sin bloquear.
- T-59: dos variables compartidas del mismo proyecto con la clave `TZ` y valores distintos. Las dos coexisten y cada referencia resuelve a su objeto.
- La mitad exigible del enunciado —la unicidad de la clave de una variable de servicio dentro de su servicio— **no tiene caso ejecutable en el anexo E-22**: recorrida la tabla completa, ningún caso tiene por entrada una clave de variable duplicada dentro de un mismo servicio. **Brecha declarada**: 08-Calidad-Y-Pruebas debe derivarlo, con entrada concreta y resultado esperado, a partir del enunciado del anexo E-16. El caso T-04 del anexo verifica un nombre de servicio duplicado y está asignado allí a RN-01; no es cobertura de esta regla.

Las pruebas se realizan en 08-Calidad-Y-Pruebas. El anexo E-22 declara los casos con entrada concreta y resultado esperado, y el anexo E-16 declara que el catálogo está pensado para que cada regla se traduzca en una prueba automatizada.

## 7. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 2.0 | 2026-07-30 | Migración normativa del conjunto 4.1 al 6.0, fase M4 corte 3, bajo `Rules-Especificacion-Funcional` 4.0 y `Vocabulario-Rules` 2.1. Clasificación **regenerar contenido** por el salto major de la regla que la gobierna; fuente de contenido: el documento de origen, archivado en `_legacy/2026-07-30/`. Sube **major** porque la nomenclatura anterior deja de cumplir. Cabecera: la etiqueta `Proyecto` pasa a `Producto` sobre el mismo valor, según `Vocabulario-Rules` §3, y la trazabilidad upstream apunta al `PRODUCT-INTAKE-SelfHosted-Service` renombrado. Sustitución léxica **por ocurrencia** según `Vocabulario-Rules` §9.5 y el plan de migración §3.5: **cero ocurrencias de «solución»** y por lo tanto cero sustituciones; tampoco hay «resolución». Las cinco ocurrencias de «proyecto» se clasificaron por referente y **ninguna pasó a «proyecto de código»**: cuatro son la entidad del dominio —«proyecto SelfHosted» en §1 y §3, «el proyecto 12» y «el mismo proyecto» en §6— y quedan intactas según el PRODUCT-INTAKE §12 y el glosario raíz de `Vision-Producto.md` §9; la restante era la etiqueta de cabecera. Cero ocurrencias del emprendimiento. **El enunciado de la invariante no cambió**: la unicidad que se exige y la que no siguen siendo exactamente las que declara el anexo E-16. La migración es léxica y de forma de cabecera |
| 1.0 | 2026-07-29 | Corrección absorbida dentro de la versión 1.0, sin subirla y sin archivar, por la política de versionado de `Master-Prompt.md` §5. §6 citaba el caso T-04 del anexo E-22 con el contenido reescrito: el anexo lo asigna a RN-01 y su entrada es un nombre de servicio duplicado, no una clave de variable duplicada dentro de un servicio. Se retira la cita y se declara como brecha que la mitad exigible del enunciado no tiene caso ejecutable en el anexo. Las otras dos citas de la sección, T-42 y T-59, sí corresponden a esta regla y se conservan. Origen: hallazgo H-01 del informe [Audit/B-02-03-r1.md](../../Audit/B-02-03-r1.md) |
| 1.0 | 2026-07-29 | Versión inicial. Transcripción del enunciado, del momento de validación y de la respuesta ante incumplimiento que declara el anexo E-16 del intake. No se reinterpreta ninguno de los tres |
