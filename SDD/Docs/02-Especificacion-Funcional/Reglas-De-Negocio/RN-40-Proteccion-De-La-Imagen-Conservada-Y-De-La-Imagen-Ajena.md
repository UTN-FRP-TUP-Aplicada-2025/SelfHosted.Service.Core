# RN-40 — Protección de la imagen conservada y de la imagen ajena

**Proyecto de código:** SelfHosted-Service
**Producto:** SelfHosted Service
**Documento:** RN-40-Proteccion-De-La-Imagen-Conservada-Y-De-La-Imagen-Ajena.md
**Versión:** 2.2
**Estado:** Propuesto
**Fecha:** 2026-08-02
**Autor:** Analista Funcional Senior (AG-02)

**Trazabilidad upstream:** **el intake vigente es v3.7**, verificado en el campo `Versión` de su cabecera el 2026-08-02. **Todo el contenido que este documento incorpora de la ronda del 2026-07-31 y del 2026-08-01 entró en la v3.4**, y se cita por esa versión en el cuerpo y en el control de cambios porque es la que permite localizarlo en el snapshot [`_legacy/2026-08-01/PRODUCT-INTAKE-SelfHosted-Service-v3.4.md`](../../../Intake/_legacy/2026-08-01/PRODUCT-INTAKE-SelfHosted-Service-v3.4.md), según el criterio de cita de versión de [`Especificacion-Funcional.md`](../Especificacion-Funcional.md) §8. **Secciones y anexos consumidos:** anexo E-16, fila RN-40; anexo E-23, la imagen como objeto con identidad y su tabla de decisiones. **Autoría declarada en la fuente:** especificación de integración `DI-17`, **confirmada por el agente humano del proyecto el 2026-07-30**: pasa de `[D-i]` revisable a **`[D]` cerrada**, y esta regla deja de consumirse como propuesta del integrador.

> **Esta regla depende de cuatro decisiones abiertas, una menos que en su versión anterior, y lo declara.** `Q-15` quedó **decidida en positivo**, `Q-17` quedó **decidida: la limpieza es sugerida**, y `Q-19` quedó **decidida el 2026-07-31: la operación de volver a un despliegue anterior existe**, de modo que la regla ya tiene con qué resolver el uso de cada imagen, cuál es el momento en el que la protección se ejerce, y a qué operación protege. Siguen abiertas `Q-16`, `Q-18`, `Q-20` y `Q-21`: **la regla declara la protección y no quién puede poner la marca ni con qué alcance.** El enunciado no cambió y sigue siendo indiferente al disparo.

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

**Lo que esta regla no declara, y hay que no leerlo como declarado:** quién puede limpiar, con qué credencial y con qué ámbito (`Q-18`); si el usuario puede marcar una imagen como conservada, quién puede hacerlo y con qué alcance (`Q-21`); si las imágenes construidas llevan efectivamente la marca de pertenencia sin la cual la segunda mitad del enunciado no es resoluble (`Q-16`); y qué pasa con la política de actualización al volver a un despliegue anterior (`Q-20`). Son **cuatro** pendientes abiertas y **ninguna se presume resuelta acá**. Lo que sí quedó decidido —el registro del digesto por despliegue, el disparo sugerido y **la existencia de la operación de volver**— está declarado en el bloque de cabecera y arriba.

**Lo que la decisión de `Q-19` le agrega a esta regla, y conviene que quede escrito.** Hasta el 2026-07-31 la protección de la imagen conservada amparaba una operación que podía no existir. Ahora ampara una **capacidad comprometida**, y además una que el sistema ejecuta **sin intervención humana**: la política de fallo al arrancar recupera el despliegue anterior por su digesto, y si la limpieza borró esa imagen la recuperación falla. **La regla no cambia de enunciado**; lo que cambia es que su incumplimiento ahora rompe un camino automático y no sólo uno manual.

**Brecha nueva declarada acá.** La imagen que sostiene el origen `imagen-local` de un servicio declarado **no tiene protección declarada** por esa sola condición, y a diferencia de cualquier otra **no hay de dónde volver a traerla**. Esta regla protege la conservada y la ajena, y no declara una tercera clase. Es la brecha `B-32` del índice maestro. Destinatario: agente humano del proyecto.

## 4. Consecuencia si se viola

La imagen **se excluye de la operación** y el informe de la limpieza declara por qué: conservada, o ajena. No es un rechazo de la operación completa: la limpieza procede sobre el resto y declara qué dejó y con qué motivo, que es el mismo patrón con el que la aplicación en lote informa lo que no alcanzó (RN-31).

Una limpieza que elimina una imagen protegida es un defecto de la clase más grave que este producto puede tener, porque es **pérdida de datos ajenos y no recuperable**.

## 5. CU afectados

CU-15, CU-18, CU-37, CU-38.

**`CU-18` entra el 2026-08-01.** La política de fallo al arrancar recupera el despliegue anterior por su digesto desde el flujo de arranque, y esa recuperación **depende de que la imagen siga existiendo**, que es lo que esta regla protege.

## 6. Pruebas que la verifican

**Brecha declarada**: el anexo E-22 no declara casos para esta regla, que es nueva, y el anexo E-23 aporta las entradas. 08-Calidad-Y-Pruebas debe derivar tres:

- Una imagen con la marca de conservada y sin ningún despliegue activo que la referencie. La limpieza **no la elimina** y el informe declara por qué.
- Una imagen con procedencia ajena, sin marca de pertenencia del producto. La limpieza **no la toca**, aunque cumpla todos los demás criterios de descarte.
- Una imagen del producto, sin marca de conservada y sin despliegues que la referencien. La limpieza **sí la elimina**: es el caso positivo, y sin él las dos pruebas anteriores pasarían con una limpieza que no hace nada.

Las pruebas se realizan en 08-Calidad-Y-Pruebas. El anexo E-16 declara que el catálogo está pensado para que cada regla se traduzca en una prueba automatizada.

## 7. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 2.2 | 2026-08-02 | **Corrección del hallazgo `P0-01`** del informe [`B2-Retroalimentacion-Decisiones-2026-08-01-r1.md`](../../Audit/B2-Retroalimentacion-Decisiones-2026-08-01-r1.md), veredicto RECHAZADO. **Absorbida dentro de la versión 2.2 sin subirla y sin archivar de nuevo**, por la política de versionado de `Master-Prompt.md` §5: el documento está en `Propuesto` y la corrección deriva del audit de su propia fase de emisión. **Cabecera, y sólo cabecera:** la trazabilidad upstream no declaraba cuál es la versión vigente del intake, de modo que la versión que citaba se leía como afirmación de vigencia y dejó de ser cierta cuando la fuente emitió la 3.6 y la 3.7 el 2026-08-02. Pasa a declarar que **el intake vigente es v3.7**, verificado en el campo `Versión` de su cabecera ese día, y que **el contenido incorporado entró en la v3.4**, con el enlace al snapshot donde se localiza. Las dos citas dicen cosas distintas y conviven, por el criterio de cita de versión que [`Especificacion-Funcional.md`](../Especificacion-Funcional.md) §8 fija en esta misma ronda: la de vigencia se verifica contra el intake vivo, la de origen contra la copia archivada. **Todo el contenido incorporado resuelve contra la v3.4**, verificado sobre su snapshot antes de escribir esta fila; ninguna cita del cuerpo ni del control de cambios se re-apunta. **Ninguna otra parte del documento cambia**: ningún enunciado, justificación, ámbito de aplicación, consecuencia si se viola, caso de uso afectado ni prueba prevista. Ninguna decisión abierta se cerró y ningún conteo cambió. Ninguna fila previa de esta tabla se reescribió, por `Master-Prompt.md` §5.1 |
| 2.2 | 2026-08-01 | **`Q-19` decidida y una brecha nueva sobre la imagen que sostiene un servicio no reproducible**, por la ronda de decisiones del agente humano del proyecto del 2026-07-31 y del 2026-08-01, consolidada en el `PRODUCT-INTAKE-SelfHosted-Service` **v3.4** §19 y anexo E-2 §20.2.3. Sube **minor**: **el enunciado, la justificación, el momento de validación, la consecuencia, los casos de uso afectados y las pruebas previstas no cambian una palabra**, y la regla sigue siendo indiferente al disparo. **Cabecera:** la dependencia declarada pasa de **cinco** decisiones abiertas a **cuatro** —`Q-16`, `Q-18`, `Q-20` y `Q-21`—, porque `Q-19` quedó decidida en positivo: la operación de volver a un despliegue anterior **existe**. **§3** declara lo que esa decisión le agrega: la protección ampara ahora una **capacidad comprometida** que además el sistema ejecuta **sin intervención humana**, porque la política de fallo al arrancar recupera el despliegue anterior por su digesto; y **abre la brecha `B-32`**, la imagen que sostiene el origen `imagen-local` de un servicio declarado, que **no tiene protección declarada** por esa sola condición y de la que no hay de dónde volver a traerla. **Ninguna decisión abierta se cerró acá**; `Q-19` la cerró el intake y esta regla la consume. La versión 2.1 queda archivada en `_legacy/2026-08-01/RN-40-Proteccion-De-La-Imagen-Conservada-Y-De-La-Imagen-Ajena-v2.1.md` |
| 2.1 | 2026-07-30 | **Acotamiento de la dependencia declarada, por la ronda de decisiones del agente humano del proyecto del 2026-07-30** consolidada en el `PRODUCT-INTAKE-SelfHosted-Service` v3.2, §19 y anexo E-23. Sube **minor**: **el enunciado de la invariante no cambió** —la imagen conservada sigue sin limpiarse y la imagen ajena sigue sin tocarse—, y tampoco cambian su justificación, su consecuencia, sus casos de uso afectados ni sus tres pruebas previstas. **Cabecera:** `DI-17` pasa de `[D-i]` **sin revisar** a **`[D]` confirmada**, de modo que esta regla deja de consumirse declarándola revisable. **Bloque de dependencia:** pasa de siete decisiones abiertas a **cinco**. `Q-15` quedó decidida en positivo —el despliegue registra el digesto— y `Q-17` quedó decidida —la limpieza es **sugerida**—, con lo que la regla ya tiene con qué resolver el uso de cada imagen y en qué momento se ejerce la protección; se retira además la afirmación de que la regla «no puede darse por implementable hasta que `Q-15` se cierre», porque esa condición se cumplió. **§3** deja de declarar el disparo como incógnita y lo declara sugerido, conservando la constancia de que el enunciado es indiferente al disparo y se escribió así antes de la decisión; y su lista de lo no declarado se reescribe pendiente por pendiente —`Q-16`, `Q-18`, `Q-19`, `Q-20`, `Q-21`— en lugar del rango `Q-17` a `Q-21`. **Ninguna decisión abierta se cerró acá y ningún dato faltante se completó con un valor plausible.** La versión 2.0 queda archivada en `_legacy/2026-07-30/RN-40-Proteccion-De-La-Imagen-Conservada-Y-De-La-Imagen-Ajena-v2.0.md` |
| 2.0 | 2026-07-30 | Migración normativa del conjunto 4.1 al 6.0, fase M4 corte 3, bajo `Rules-Especificacion-Funcional` 4.0 y `Vocabulario-Rules` 2.1. Clasificación **regenerar contenido** por el salto major de la regla que la gobierna; fuente de contenido: el documento de origen, archivado en `_legacy/2026-07-30/`. Sube **major** porque la nomenclatura anterior deja de cumplir. Cabecera: la etiqueta `Proyecto` pasa a `Producto` sobre el mismo valor, según `Vocabulario-Rules` §3, y la trazabilidad upstream apunta al `PRODUCT-INTAKE-SelfHosted-Service` renombrado. Sustitución léxica **por ocurrencia** según `Vocabulario-Rules` §9.5 y el plan de migración §3.5: **cero ocurrencias de «solución»** y por lo tanto cero sustituciones; tampoco hay «resolución». Las ocho menciones de «producto» son de origen y no de esta migración, y su concordancia de género ya era correcta. Las dos ocurrencias de «proyecto» se clasificaron por referente y **ninguna pasó a «proyecto de código»**: una es la entidad del dominio —«el parque de contenedores que nadie incorporó a un proyecto» en §2— y queda intacta según el PRODUCT-INTAKE §12 y el glosario raíz de `Vision-Producto.md` §9; la restante era la etiqueta de cabecera. Cero ocurrencias del emprendimiento. **El enunciado de la invariante no cambió**: la imagen conservada sigue sin limpiarse y la imagen ajena sigue sin tocarse, y **las siete decisiones abiertas `Q-15` a `Q-21` siguen declaradas como tales** en la cabecera y en §3, sin presumirse resueltas. La migración es léxica y de forma de cabecera |
| 1.0 | 2026-07-29 | Versión inicial. Regla nueva, emitida por §22.3 del documento de trabajo `SDD/Estado/Redefinicion-Servicio.md` v2.0, que verificó que el intake no tenía **nada** sobre limpieza, poda, espacio en disco ni retención de imágenes, mientras se retienen cincuenta despliegues por servicio cuyas imágenes nadie administra. Transcribe el enunciado, el momento de validación y la respuesta que el anexo E-16 del intake v2.4 declara. **Declara en su cabecera y en §3 las siete decisiones abiertas de las que depende**, y qué no queda declarado por ellas, en lugar de presumirlas resueltas |
