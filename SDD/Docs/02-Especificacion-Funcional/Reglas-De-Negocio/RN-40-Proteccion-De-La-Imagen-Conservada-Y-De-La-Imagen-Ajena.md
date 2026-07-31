# RN-40 — Protección de la imagen conservada y de la imagen ajena

**Proyecto de código:** SelfHosted-Service
**Producto:** SelfHosted Service
**Documento:** RN-40-Proteccion-De-La-Imagen-Conservada-Y-De-La-Imagen-Ajena.md
**Versión:** 2.1
**Estado:** Propuesto
**Fecha:** 2026-07-30
**Autor:** Analista Funcional Senior (AG-02)

**Trazabilidad upstream:** PRODUCT-INTAKE-SelfHosted-Service **v3.2** anexo E-16, fila RN-40; anexo E-23, la imagen como objeto con identidad y su tabla de decisiones. **Autoría declarada en la fuente:** especificación de integración `DI-17`, **confirmada por el agente humano del proyecto el 2026-07-30**: pasa de `[D-i]` revisable a **`[D]` cerrada**, y esta regla deja de consumirse como propuesta del integrador.

> **Esta regla depende de cinco decisiones abiertas, dos menos que en su versión anterior, y lo declara.** `Q-15` quedó **decidida en positivo** y `Q-17` quedó **decidida: la limpieza es sugerida**, de modo que la regla ya tiene con qué resolver el uso de cada imagen y cuál es el momento en el que la protección se ejerce. Siguen abiertas `Q-16`, `Q-18`, `Q-19`, `Q-20` y `Q-21`: **la regla declara la protección y no quién puede poner la marca ni con qué alcance.** El enunciado no cambió y sigue siendo indiferente al disparo.

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

**Una imagen marcada como conservada no se limpia, y una imagen ajena no se toca.**

Ninguna operación de limpieza puede eliminar:

1. Una imagen con la **marca de conservada**, aunque ningún despliegue activo la referencie.
2. Una imagen que **no lleva la marca de pertenencia del producto**, cualquiera sea su estado. Es la imagen `ajena`: la que el producto ve en el almacén y no administra.

## 2. Justificación

**La segunda mitad es la que vuelve practicable cualquier limpieza.** El motor de contenedores es uno y compartido: el mismo almacén de imágenes lo usan el producto, el parque de contenedores que nadie incorporó a un proyecto, y el automatismo de integración continua que construye en el propio servidor. Una operación de limpieza sin esta protección es una **operación destructiva sobre trabajo de otro**, y el producto no tiene forma de saber qué rompió. La regla conservadora —lo que no lleva la marca del producto, no se toca— es lo único que la hace segura.

**La primera mitad protege la única razón por la que se conservarían imágenes que nada usa.** Se retienen cincuenta despliegues por servicio, que el usuario ve en la línea de tiempo del panel. Si volver a uno de ellos va a ser posible, la imagen que ese despliegue usó tiene que seguir existiendo; y una limpieza que borra «lo que ningún despliegue activo referencia» borraría exactamente eso. Sin esta mitad, la limpieza destruye la capacidad que la conservación existe para habilitar.

## 3. Ámbito de aplicación

**Momento de validación declarado en el anexo E-16:** toda operación de limpieza de imágenes.

**El disparo de la limpieza está decidido desde el 2026-07-30 y es sugerido**: el sistema detecta espacio recuperable y lo propone, y el usuario confirma (`Q-17`). El momento de validación de esta regla se ejerce, por lo tanto, en la operación que esa confirmación dispara. El enunciado sigue siendo **indiferente al disparo** y se declaró así antes de que la decisión existiera: si la forma sugerida se cambiara, la protección no cambiaría.

**Lo que esta regla no declara, y hay que no leerlo como declarado:** quién puede limpiar, con qué credencial y con qué ámbito (`Q-18`); si el usuario puede marcar una imagen como conservada, quién puede hacerlo y con qué alcance (`Q-21`); si las imágenes construidas llevan efectivamente la marca de pertenencia sin la cual la segunda mitad del enunciado no es resoluble (`Q-16`); y qué pasa con la política de actualización al volver a un despliegue anterior, que además depende de que esa operación exista (`Q-19`, `Q-20`). Son cinco pendientes abiertas y **ninguna se presume resuelta acá**. Lo que sí quedó decidido —el registro del digesto por despliegue y el disparo sugerido— está declarado en el bloque de cabecera y arriba.

## 4. Consecuencia si se viola

La imagen **se excluye de la operación** y el informe de la limpieza declara por qué: conservada, o ajena. No es un rechazo de la operación completa: la limpieza procede sobre el resto y declara qué dejó y con qué motivo, que es el mismo patrón con el que la aplicación en lote informa lo que no alcanzó (RN-31).

Una limpieza que elimina una imagen protegida es un defecto de la clase más grave que este producto puede tener, porque es **pérdida de datos ajenos y no recuperable**.

## 5. CU afectados

CU-15, CU-37, CU-38.

## 6. Pruebas que la verifican

**Brecha declarada**: el anexo E-22 no declara casos para esta regla, que es nueva, y el anexo E-23 aporta las entradas. 08-Calidad-Y-Pruebas debe derivar tres:

- Una imagen con la marca de conservada y sin ningún despliegue activo que la referencie. La limpieza **no la elimina** y el informe declara por qué.
- Una imagen con procedencia ajena, sin marca de pertenencia del producto. La limpieza **no la toca**, aunque cumpla todos los demás criterios de descarte.
- Una imagen del producto, sin marca de conservada y sin despliegues que la referencien. La limpieza **sí la elimina**: es el caso positivo, y sin él las dos pruebas anteriores pasarían con una limpieza que no hace nada.

Las pruebas se realizan en 08-Calidad-Y-Pruebas. El anexo E-16 declara que el catálogo está pensado para que cada regla se traduzca en una prueba automatizada.

## 7. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 2.1 | 2026-07-30 | **Acotamiento de la dependencia declarada, por la ronda de decisiones del agente humano del proyecto del 2026-07-30** consolidada en el `PRODUCT-INTAKE-SelfHosted-Service` v3.2, §19 y anexo E-23. Sube **minor**: **el enunciado de la invariante no cambió** —la imagen conservada sigue sin limpiarse y la imagen ajena sigue sin tocarse—, y tampoco cambian su justificación, su consecuencia, sus casos de uso afectados ni sus tres pruebas previstas. **Cabecera:** `DI-17` pasa de `[D-i]` **sin revisar** a **`[D]` confirmada**, de modo que esta regla deja de consumirse declarándola revisable. **Bloque de dependencia:** pasa de siete decisiones abiertas a **cinco**. `Q-15` quedó decidida en positivo —el despliegue registra el digesto— y `Q-17` quedó decidida —la limpieza es **sugerida**—, con lo que la regla ya tiene con qué resolver el uso de cada imagen y en qué momento se ejerce la protección; se retira además la afirmación de que la regla «no puede darse por implementable hasta que `Q-15` se cierre», porque esa condición se cumplió. **§3** deja de declarar el disparo como incógnita y lo declara sugerido, conservando la constancia de que el enunciado es indiferente al disparo y se escribió así antes de la decisión; y su lista de lo no declarado se reescribe pendiente por pendiente —`Q-16`, `Q-18`, `Q-19`, `Q-20`, `Q-21`— en lugar del rango `Q-17` a `Q-21`. **Ninguna decisión abierta se cerró acá y ningún dato faltante se completó con un valor plausible.** La versión 2.0 queda archivada en `_legacy/2026-07-30/RN-40-Proteccion-De-La-Imagen-Conservada-Y-De-La-Imagen-Ajena-v2.0.md` |
| 2.0 | 2026-07-30 | Migración normativa del conjunto 4.1 al 6.0, fase M4 corte 3, bajo `Rules-Especificacion-Funcional` 4.0 y `Vocabulario-Rules` 2.1. Clasificación **regenerar contenido** por el salto major de la regla que la gobierna; fuente de contenido: el documento de origen, archivado en `_legacy/2026-07-30/`. Sube **major** porque la nomenclatura anterior deja de cumplir. Cabecera: la etiqueta `Proyecto` pasa a `Producto` sobre el mismo valor, según `Vocabulario-Rules` §3, y la trazabilidad upstream apunta al `PRODUCT-INTAKE-SelfHosted-Service` renombrado. Sustitución léxica **por ocurrencia** según `Vocabulario-Rules` §9.5 y el plan de migración §3.5: **cero ocurrencias de «solución»** y por lo tanto cero sustituciones; tampoco hay «resolución». Las ocho menciones de «producto» son de origen y no de esta migración, y su concordancia de género ya era correcta. Las dos ocurrencias de «proyecto» se clasificaron por referente y **ninguna pasó a «proyecto de código»**: una es la entidad del dominio —«el parque de contenedores que nadie incorporó a un proyecto» en §2— y queda intacta según el PRODUCT-INTAKE §12 y el glosario raíz de `Vision-Producto.md` §9; la restante era la etiqueta de cabecera. Cero ocurrencias del emprendimiento. **El enunciado de la invariante no cambió**: la imagen conservada sigue sin limpiarse y la imagen ajena sigue sin tocarse, y **las siete decisiones abiertas `Q-15` a `Q-21` siguen declaradas como tales** en la cabecera y en §3, sin presumirse resueltas. La migración es léxica y de forma de cabecera |
| 1.0 | 2026-07-29 | Versión inicial. Regla nueva, emitida por §22.3 del documento de trabajo `SDD/Estado/Redefinicion-Servicio.md` v2.0, que verificó que el intake no tenía **nada** sobre limpieza, poda, espacio en disco ni retención de imágenes, mientras se retienen cincuenta despliegues por servicio cuyas imágenes nadie administra. Transcribe el enunciado, el momento de validación y la respuesta que el anexo E-16 del intake v2.4 declara. **Declara en su cabecera y en §3 las siete decisiones abiertas de las que depende**, y qué no queda declarado por ellas, en lugar de presumirlas resueltas |
