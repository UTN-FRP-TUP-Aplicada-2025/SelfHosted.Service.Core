# RN-08 — Datos obligatorios del origen, por variante

**Proyecto de código:** SelfHosted-Service
**Producto:** SelfHosted Service
**Documento:** RN-08-Datos-Obligatorios-Del-Origen-Repositorio.md
**Versión:** 2.2
**Estado:** Propuesto
**Fecha:** 2026-08-02
**Autor:** Analista Funcional Senior (AG-02)

**Trazabilidad upstream:** **el intake vigente es v3.7**, verificado en el campo `Versión` de su cabecera el 2026-08-02. **Todo el contenido que este documento incorpora de la ronda del 2026-07-31 y del 2026-08-01 entró en la v3.4**, y se cita por esa versión en el cuerpo y en el control de cambios porque es la que permite localizarlo en el snapshot [`_legacy/2026-08-01/PRODUCT-INTAKE-SelfHosted-Service-v3.4.md`](../../../Intake/_legacy/2026-08-01/PRODUCT-INTAKE-SelfHosted-Service-v3.4.md), según el criterio de cita de versión de [`Especificacion-Funcional.md`](../Especificacion-Funcional.md) §8. **Secciones y anexos consumidos:** anexo E-16, fila RN-08 con su fila nueva de variante; anexo E-2 §20.2.3, las **seis** variantes discriminadas de origen; §4, nota de los dos ejes del alta y nota del tercer eje y el alta unificada. **Autoría declarada en la fuente:** enunciado base **[E]** de la fuente base; el **reparto por variante** es ampliación por la especificación de integración `DI-17`, **confirmada por el agente humano del proyecto el 2026-07-30**: pasa de `[D-i]` revisable a **`[D]` cerrada**, y esta regla deja de consumirse declarando revisable su reparto por variante.

**Nota sobre el nombre del archivo.** Conserva `Origen-Repositorio` aunque la regla alcance ahora a las cinco variantes. El nombre lógico es el identificador con el que la regla se cita desde catorce artefactos de esta categoría y desde el intake, y `Master-Prompt.md` §5.1 declara que subir de versión **no propaga actualización de referencias** precisamente porque el nombre no cambia. Renombrarlo obligaría a tocar cada cita para no ganar nada: el título del documento sí declara el alcance vigente.

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

**Cada variante de origen exige sus propios datos obligatorios y ninguno de otra variante.** Un campo que pertenece a otra variante es un dato inválido, no un campo opcional vacío.

| Variante de origen | Datos obligatorios |
| --- | --- |
| Imagen de registro público | Registro, imagen y etiqueta |
| Imagen de registro privado | Dirección del registro de imágenes, imagen, etiqueta y **credencial de registro** |
| Repositorio remoto | Dirección del repositorio, **rama** y **ruta del archivo de construcción**, más el contexto de construcción |
| Archivo de construcción en línea | El **contenido** del archivo de construcción |
| Sin origen | Ninguno |
| **Imagen del almacén local** | El **digesto** de la imagen del almacén local, con su referencia legible. **No admite política de actualización flotante**: no hay registro remoto donde la etiqueta pueda moverse |

**El enunciado original de esta regla sobrevive sin cambios dentro de la tercera fila.** Antes decía «el servicio con origen repositorio requiere ruta del archivo de construcción y rama», y eso sigue siendo exactamente lo exigible para esa variante. Lo que la ampliación agrega es qué exigen las otras cinco, que antes no estaba declarado en ninguna parte.

**La sexta fila es del 2026-07-31 y su exigencia tiene dos mitades.** La primera es de datos, como las otras cinco: sin digesto no hay imagen identificable, porque la etiqueta local **se reasigna** y no identifica nada de forma estable. La segunda es una **prohibición de valor** y no una exigencia de campo: la política flotante no es admisible en esta variante, y declararla es dato inválido por la misma lógica con la que lo es un campo ajeno.

**La tercera fila sigue siendo exigible aunque la interfaz ya no produzca la variante.** `F-10` se acotó el 2026-08-01 y se le retiró la construcción desde repositorio remoto, de modo que **ninguna superficie del producto crea hoy un origen `repositorio`**. La regla lo conserva porque la variante sigue en el modelo y en el esquema: un servicio de ese origen es representable —por importación, por un dato migrado o por una interfaz futura— y si existe, estos son sus datos obligatorios. **La regla no decide qué produce la interfaz**; declara qué es válido.

## 2. Justificación

Sin los datos que su variante exige, el origen **no es resoluble ni verificable**: el sistema no sabe qué imagen obtener ni qué imagen construir. Para la variante repositorio el argumento es el original —sin rama y sin ruta del archivo de construcción la imagen no es reproducible ni determinable—, y para las otras cinco es el mismo con otro objeto: sin credencial no se puede autenticar contra un registro privado, sin contenido no hay ninguna imagen que construir, y sin digesto la imagen del almacén local no es identificable porque su etiqueta se reasigna.

**Lo que esta regla no gobierna, y conviene que quede escrito.** Gobierna de dónde sale la **imagen**. **Crear el contenedor no es materia suya** y no varía con la variante: el producto lo hace siempre, en las seis. Lo único que puede vivir afuera del producto es construir la imagen.

La segunda mitad del enunciado —que un campo ajeno a la variante es inválido— existe porque el origen es una **variante discriminada** y no un objeto con todos los campos opcionales. Admitir campos ajenos permitiría persistir un origen que declara a la vez una rama y un contenido de archivo de construcción, que es un estado sin significado y que ningún consumidor sabría interpretar.

## 3. Ámbito de aplicación

**Momento de validación declarado en el anexo E-16:** alta, edición del origen y verificación del origen.

Se evalúa al declarar o cambiar el origen de un servicio, y la verificación del origen la vuelve a evaluar antes de consultar el sistema externo, porque consultar con datos incompletos produciría un fallo de red donde en realidad falta un dato.

**Brecha declarada:** el intake no declara si el origen es editable después del alta. La reentrada de la configuración arranca en el paso del modo de red y excluye el origen sin decirlo. Es la pendiente `Q-28` de §19 del intake, y **mientras esté abierta el momento «edición del origen» de esta regla no tiene camino de usuario declarado**. **La sexta variante le suma una consecuencia visible**: el camino de pago que el intake declara para retirar la marca de no reproducible —publicar la imagen en un registro y pasar a un origen de registro— es exactamente un cambio de origen. Destinatario: agente humano del proyecto.

## 4. Consecuencia si se viola

Respuesta `422`, señalando **el campo faltante o el campo ajeno a la variante**. Son dos causas distintas y el mensaje las distingue, porque la acción del usuario es distinta: completar un dato, o quitar uno que sobra.

## 5. CU afectados

CU-03, CU-08, CU-13, CU-15, CU-39.

## 6. Pruebas que la verifican

- El anexo E-22 no declara un caso ejecutable propio para esta regla. **Brecha declarada**, sin cerrar y ampliada de seis a **ocho**: 08-Calidad-Y-Pruebas debe derivar **un caso por variante** —seis de dato faltante—, al menos uno de campo ajeno a la variante, y uno de la **prohibición de valor** que la sexta variante introduce, la política flotante sobre un origen `imagen-local`. Con entrada concreta y resultado esperado, a partir del enunciado del anexo E-16 y de las seis variantes del anexo E-2 §20.2.3.

Las pruebas se realizan en 08-Calidad-Y-Pruebas. El anexo E-22 declara los casos con entrada concreta y resultado esperado, y el anexo E-16 declara que el catálogo está pensado para que cada regla se traduzca en una prueba automatizada.

## 7. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 2.2 | 2026-08-02 | **Corrección del hallazgo `P0-01`** del informe [`B2-Retroalimentacion-Decisiones-2026-08-01-r1.md`](../../Audit/B2-Retroalimentacion-Decisiones-2026-08-01-r1.md), veredicto RECHAZADO. **Absorbida dentro de la versión 2.2 sin subirla y sin archivar de nuevo**, por la política de versionado de `Master-Prompt.md` §5: el documento está en `Propuesto` y la corrección deriva del audit de su propia fase de emisión. **Cabecera, y sólo cabecera:** la trazabilidad upstream no declaraba cuál es la versión vigente del intake, de modo que la versión que citaba se leía como afirmación de vigencia y dejó de ser cierta cuando la fuente emitió la 3.6 y la 3.7 el 2026-08-02. Pasa a declarar que **el intake vigente es v3.7**, verificado en el campo `Versión` de su cabecera ese día, y que **el contenido incorporado entró en la v3.4**, con el enlace al snapshot donde se localiza. Las dos citas dicen cosas distintas y conviven, por el criterio de cita de versión que [`Especificacion-Funcional.md`](../Especificacion-Funcional.md) §8 fija en esta misma ronda: la de vigencia se verifica contra el intake vivo, la de origen contra la copia archivada. **Todo el contenido incorporado resuelve contra la v3.4**, verificado sobre su snapshot antes de escribir esta fila; ninguna cita del cuerpo ni del control de cambios se re-apunta. **Ninguna otra parte del documento cambia**: ningún enunciado, justificación, ámbito de aplicación, consecuencia si se viola, caso de uso afectado ni prueba prevista. Ninguna decisión abierta se cerró y ningún conteo cambió. Ninguna fila previa de esta tabla se reescribió, por `Master-Prompt.md` §5.1 |
| 2.2 | 2026-08-01 | **Sexta variante de origen**, por la ronda de decisiones del agente humano del proyecto del 2026-07-31 y del 2026-08-01, consolidada en el `PRODUCT-INTAKE-SelfHosted-Service` **v3.4** anexo E-16, que suma a esta regla su fila nueva, y anexo E-2 §20.2.3. Sube **minor**: **las cinco filas anteriores no cambian una palabra**, el momento de validación y la respuesta ante incumplimiento se conservan, y la ampliación es aditiva. **§1** suma la fila de `imagen-local` —digesto de la imagen del almacén local, con su referencia legible, y **prohibición de la política flotante**— y declara que esa prohibición es una **restricción de valor** y no una exigencia de campo, que es la primera de esta regla. Declara además que **la tercera fila sigue exigible aunque la interfaz ya no produzca la variante `repositorio`**, porque `F-10` se acotó el 2026-08-01: la regla dice qué es válido y no qué produce la interfaz. **§2** suma el argumento de la sexta variante y la constancia de que esta regla gobierna de dónde sale la **imagen**, mientras que **crear el contenedor no es materia suya y no varía con la variante**. **§5** suma `CU-39`, que ya la aplicaba sin figurar. **§6** amplía la brecha de cobertura de seis casos a **ocho**. **Ninguna decisión abierta se cerró acá**: `Q-28` sigue abierta y con ella el momento «edición del origen» sigue sin camino de usuario declarado, ahora con un caso más de consecuencia visible —retirar la marca de no reproducible exige cambiar el origen—. La versión 2.1 queda archivada en `_legacy/2026-08-01/RN-08-Datos-Obligatorios-Del-Origen-Repositorio-v2.1.md` |
| 2.1 | 2026-07-30 | **Cambio de estatus de autoría, sin cambio de contenido normativo**, por la confirmación de `DI-17` que el agente humano del proyecto emitió el 2026-07-30 y que el `PRODUCT-INTAKE-SelfHosted-Service` v3.2 consolida en §19 y en la nota de los dos ejes del alta de §4. Sube **minor**: **el enunciado, la tabla de datos obligatorios por variante, la justificación, el momento de validación, la consecuencia, los casos de uso afectados y las pruebas previstas no cambian una palabra**. Lo único que cambia es la cabecera: el reparto por variante pasa de `[D-i]` **sin revisar** a **`[D]` confirmada**, de modo que las cinco filas de la tabla de §1 se consumen como decisión cerrada del cliente y no como propuesta del integrador. **La brecha `Q-28` de §3 sigue abierta** —el intake no declara si el origen es editable después del alta— y con ella el momento «edición del origen» de esta regla sigue sin camino de usuario declarado; la exploración de registro de imágenes que `Q-27` habilitó **no lo resuelve**, porque es entrada al alta y no edición del origen. La brecha de cobertura de prueba del anexo E-22 también sigue abierta. La versión 2.0 queda archivada en `_legacy/2026-07-30/RN-08-Datos-Obligatorios-Del-Origen-Repositorio-v2.0.md` |
| 2.0 | 2026-07-30 | Migración normativa del conjunto 4.1 al 6.0, fase M4 corte 3, bajo `Rules-Especificacion-Funcional` 4.0, `Vocabulario-Rules` 2.1 y `Migracion-Rules` 1.0. Clasificación **regenerar contenido** por el salto major 2.0 → 4.0 de la regla que gobierna la categoría; fuente de contenido: el **documento de origen**, archivado sin modificación en `_legacy/2026-07-30/`. Sube **major** porque la nomenclatura anterior deja de cumplir. **El enunciado de la invariante no cambió de contenido normativo**: una regla de negocio es atemporal, y esta migración es únicamente léxica y de forma de cabecera; las siete secciones obligatorias de `Rules-Especificacion-Funcional` §4.2.1 conservan su texto y su orden. **Cabecera:** la etiqueta `Proyecto` pasa a `Producto` sobre el mismo valor de plano producto —`SelfHosted Service`, que es el `Nombre-Producto`—, según `Vocabulario-Rules` §3 y §4 R3 y el referente R4 del plan de migración §3.5; la trazabilidad upstream apunta al `PRODUCT-INTAKE-SelfHosted-Service` renombrado. **Sustitución léxica por ocurrencia** según `Vocabulario-Rules` §9.5, con censo declarado: **2 ocurrencias de «proyecto»**; de las que **1 es la etiqueta de cabecera** y se sustituyó; **1 designa el emprendimiento** —«agente humano del proyecto»— y se preserva a secas y sin calificar (referente R3 del plan §3.5); y **ninguna se promovió a «proyecto de código»**. **Cero** ocurrencias de «solución» con el referente de nivel superior. **Cero** ocurrencias de la cadena `resoluci`. La nota sobre el nombre del archivo, el reparto por variante de origen de §1 y la brecha `Q-28` de §3 se conservan sin cambios; el nombre del archivo sigue siendo `Origen-Repositorio` por el motivo que la propia nota declara.  **Glosario:** desde la 4.0 el vocabulario de la categoría vive en `Glosario-Funcional.md`, artefacto propio y obligatorio para los ocho tipos D8 (§2.1 y §4.2.4), y ya no en el punto 6 de `Modelo-Conceptual.md`; los términos que esta regla acuña o precisa se devolvieron al lote que emite ese glosario y acá no se redefinen, y los que ya declara [Vision-Producto](../../00-Contexto/Vision-Producto.md) §9 se referencian sin duplicarse. El bloque de procedencia del destino sigue declarando la 4.1 y no se toca: es trabajo de M5 |
| 1.1 | 2026-07-29 | **Reformulación del enunciado por variante de origen.** El origen pasó de tres valores planos a cinco variantes discriminadas en el anexo E-2 del intake v2.4, y esta regla declaraba los datos obligatorios de una sola de ellas. El enunciado original **sobrevive sin cambios** dentro de la fila de la variante repositorio; lo que se agrega es qué exigen las otras cuatro y la prohibición de campos ajenos a la variante, que es lo que una variante discriminada obliga a declarar. El título del documento pasa a declarar el alcance vigente y el nombre del archivo se conserva, con su motivo escrito. §3 suma la brecha `Q-28`, que deja sin camino de usuario declarado el momento «edición del origen». §5 suma CU-13. §6 amplía la brecha de cobertura de un caso a seis. La versión 1.0 queda archivada en `_legacy/2026-07-29/`. Origen: §22.3 del documento de trabajo `SDD/Estado/Redefinicion-Servicio.md` v2.0 |
| 1.0 | 2026-07-29 | Versión inicial. Transcripción del enunciado, del momento de validación y de la respuesta ante incumplimiento que declara el anexo E-16 del intake. No se reinterpreta ninguno de los tres |
