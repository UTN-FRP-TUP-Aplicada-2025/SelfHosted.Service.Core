# RN-29 — Clasificación obligatoria de variables en la incorporación

**Proyecto de código:** SelfHosted-Service
**Producto:** SelfHosted Service
**Documento:** RN-29-Clasificacion-Obligatoria-De-Variables-En-La-Adopcion.md
**Versión:** 2.0
**Estado:** Propuesto
**Fecha:** 2026-07-30
**Autor:** Analista Funcional Senior (AG-02)

**Trazabilidad upstream:** PRODUCT-INTAKE-SelfHosted-Service anexo E-16, fila RN-29. **Autoría declarada en la fuente:** Enunciado **[D]**, decisión D-2. Exigibilidad **[D-i]**, sin revisar: el código de rechazo se consume declarándolo revisable.

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

**[D]:** la incorporación de un contenedor no se completa sin el paso de clasificación de variables: se presentan todas las variables importadas, las que la heurística sugiere vienen premarcadas como secretas, y el usuario puede marcar o desmarcar cualquiera. La heurística sugiere; no decide.

## 2. Justificación

Una configuración real del parque lleva una clave simétrica en una variable cuyo nombre no contiene ninguno de los fragmentos de la heurística, y con la regla anterior esa clave se importaba en claro sin que nadie se enterara. De las tres resoluciones planteadas, el agente humano del proyecto eligió la que no vuelve a apostar a que la lista de fragmentos esté completa: el secreto se declara, no se infiere.

## 3. Ámbito de aplicación

**Momento de validación declarado en el anexo E-16:** Adopción.

Se evalúa en el tercero de los cuatro pasos de la incorporación —descubrir, elegir, clasificar y confirmar— y en la confirmación.

## 4. Consecuencia si se viola

**[D-i]:** `422` si se intenta confirmar la incorporación sin clasificación. Que el servicio no se cree es **[D]**: es lo que significa que la incorporación no se complete.

## 5. CU afectados

CU-06, CU-07, CU-08.

## 6. Pruebas que la verifican

- T-17: importar una variable que la heurística no detecta. Llega al paso de clasificación desmarcada, y sin confirmación no hay servicio creado.
- T-17b: importar una variable que la heurística sí detecta. Llega premarcada con su motivo de sugerencia.
- T-32: marcar en el paso de clasificación una variable que la heurística no detectó. Queda cifrada en reposo, con recarga manual pendiente.
- T-33: confirmar la incorporación sin enviar la clasificación. Rechazado `422`; el servicio no se crea.

Las pruebas se realizan en 08-Calidad-Y-Pruebas. El anexo E-22 declara los casos con entrada concreta y resultado esperado, y el anexo E-16 declara que el catálogo está pensado para que cada regla se traduzca en una prueba automatizada.

## 7. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 2.0 | 2026-07-30 | Migración normativa del conjunto 4.1 al 6.0, fase M4 corte 3, bajo `Rules-Especificacion-Funcional` 4.0 y `Vocabulario-Rules` 2.1. Clasificación **regenerar contenido** por el salto major de la regla que la gobierna; fuente de contenido: el documento de origen, archivado en `_legacy/2026-07-30/`. Sube **major** porque la nomenclatura anterior deja de cumplir. Cabecera: la etiqueta `Proyecto` pasa a `Producto` sobre el mismo valor, según `Vocabulario-Rules` §3, y la trazabilidad upstream apunta al `PRODUCT-INTAKE-SelfHosted-Service` renombrado. Sustitución léxica **por ocurrencia** según `Vocabulario-Rules` §9.5 y el plan de migración §3.5: **cero ocurrencias de «solución»** y por lo tanto cero sustituciones. La única aparición de la cadena `soluci` es «las tres **resoluciones** planteadas» en §2, que **queda intacta**: es la clase de daño por subcadena que `Vocabulario-Rules` §9.5 documenta sobre el propio framework y que el plan §3.5 paso 4 verifica con barrido negativo. Las dos ocurrencias de «proyecto» se clasificaron por referente y **ninguna pasó a «proyecto de código»**: una es el emprendimiento —«el agente humano del proyecto» en §2— y queda a secas y sin calificar según el PRODUCT-INTAKE §12; la restante era la etiqueta de cabecera. Cero ocurrencias de la entidad del dominio. **El enunciado de la invariante no cambió**: el paso de clasificación sigue siendo obligatorio y la heurística sigue sugiriendo sin decidir. La migración es léxica y de forma de cabecera |
| 1.0 | 2026-07-29 | Versión inicial. Transcripción del enunciado, del momento de validación y de la respuesta ante incumplimiento que declara el anexo E-16 del intake. No se reinterpreta ninguno de los tres |
