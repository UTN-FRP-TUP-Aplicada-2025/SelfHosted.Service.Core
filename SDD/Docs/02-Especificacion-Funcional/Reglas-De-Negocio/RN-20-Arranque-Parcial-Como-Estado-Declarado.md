# RN-20 — Arranque parcial como estado declarado

**Proyecto de código:** SelfHosted-Service
**Producto:** SelfHosted Service
**Documento:** RN-20-Arranque-Parcial-Como-Estado-Declarado.md
**Versión:** 2.1
**Estado:** Propuesto
**Fecha:** 2026-08-02
**Autor:** Analista Funcional Senior (AG-02)

**Trazabilidad upstream:** PRODUCT-INTAKE-SelfHosted-Service anexo E-16, fila RN-20. **El intake vigente es v3.7**, verificado en el campo `Versión` de su cabecera el 2026-08-02. **De qué versión vino cada bloque de contenido incorporado**, que es la cita que el cuerpo y el control de cambios conservan por el criterio de [`Especificacion-Funcional.md`](../Especificacion-Funcional.md) §8: el enunciado, su justificación, su momento de validación y su respuesta ante incumplimiento son los de la fuente base y **no se re-derivaron**; lo único incorporado por la ronda del 2026-07-31 es la entrada de `CU-38` a §5, cuyo fundamento —la **política de fallo al arrancar** y la cuarentena que produce— entró en la **v3.5** y **no está en la v3.4**: sobre el snapshot [`_legacy/2026-08-01/PRODUCT-INTAKE-SelfHosted-Service-v3.4.md`](../../../Intake/_legacy/2026-08-01/PRODUCT-INTAKE-SelfHosted-Service-v3.4.md), `grep -c -i "cuarentena"` devuelve 0, contra 4 sobre el vigente, verificado el 2026-08-02. `Q-19`, que la fila 2.1 de §7 cita, sí entró en la v3.4. **Autoría declarada en la fuente:** **[E]** de la fuente base.

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

Un proyecto SelfHosted con al menos un conflicto puede arrancar parcialmente, quedando parcialmente activo.

## 2. Justificación

Un despliegue parcial es un estado legítimo del modelo y no un accidente a evitar (D-1). La regla es la que impide que la situación se resuelva como un error silencioso o como un estado indeterminado.

## 3. Ámbito de aplicación

**Momento de validación declarado en el anexo E-16:** Arranque.

Se evalúa al arrancar un proyecto SelfHosted con al menos un conflicto de dirección, y al elegir la resolución de arranque parcial que ofrece el informe de conflicto.

## 4. Consecuencia si se viola

Estado explícito, no error silencioso.

## 5. CU afectados

CU-18, CU-20, CU-21, CU-24, CU-27, CU-28, CU-38.

**`CU-38` entra el 2026-08-01.** La política de fallo al arrancar manda a **cuarentena** al servicio cuyo despliegue nuevo no arranca y cuyo despliegue anterior recuperado tampoco, apagándole el **autoarranque**, y **deja al proyecto SelfHosted corriendo** con sus demás servicios. Eso es exactamente un arranque parcial, y esta regla es la que lo vuelve estado declarado en lugar de error silencioso.

**«Autoarranque apagado» sigue el cuerpo decidido de la fuente, y la marca concreta es punto abierto.** La nota «Política ante un despliegue que no arranca» del intake dice, en la tercera fila de su tabla, «el servicio pasa a **no autoarranque**: queda en cuarentena», y esta regla la sigue. **La misma nota deja sin decidir si lo que se apaga es el autoarranque o la participación en el arranque**, que son marcas distintas: es el punto **(b)** de `B-31`, y no se resuelve acá. **Lo que esta regla afirma no depende de cuál de las dos sea**: el arranque parcial se produce igual, porque lo que lo produce es que el proyecto siga corriendo con un servicio afuera, y el enunciado de §1 no cambia una palabra con ninguna de las dos lecturas. Lo que sí depende del punto abierto es la interfaz, y por eso lo bloquea `03-UX-UI-DX`, que exhibe hoy el autoarranque como control editable del panel.

## 6. Pruebas que la verifican

- T-24: arrancar un proyecto de 3 servicios con 1 en conflicto. Arrancan 2; el proyecto queda parcialmente activo, sin error silencioso.

Las pruebas se realizan en 08-Calidad-Y-Pruebas. El anexo E-22 declara los casos con entrada concreta y resultado esperado, y el anexo E-16 declara que el catálogo está pensado para que cada regla se traduzca en una prueba automatizada.

## 7. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 2.1 | 2026-08-02 | **Corrección de los hallazgos `P0-01` y `P2-03`** del informe [`B2-Retroalimentacion-Decisiones-2026-08-01-r1.md`](../../Audit/B2-Retroalimentacion-Decisiones-2026-08-01-r1.md), veredicto RECHAZADO. **Absorbida dentro de la versión 2.1 sin subirla y sin archivar de nuevo**, por la política de versionado de `Master-Prompt.md` §5: el documento está en `Propuesto` y la corrección deriva del audit de su propia fase de emisión. **`P0-01`, cabecera:** la trazabilidad upstream no declaraba ninguna versión del intake. Pasa a declarar que **el intake vigente es v3.7**, verificado en el campo `Versión` de su cabecera el 2026-08-02, y a separar de qué versión vino cada bloque: el enunciado es de la fuente base y no se re-derivó; el fundamento de la entrada de `CU-38` —la política de fallo al arrancar— entró en la **v3.5** y **no está en la v3.4**, mientras que `Q-19`, que la fila 2.1 del 2026-08-01 cita, sí entró en la v3.4. **`P2-03`, §5:** el párrafo de `CU-38` enunciaba la cuarentena sin declarar que el intake deja abierto si lo que se apaga es el autoarranque o la participación en el arranque. Se enuncia el tratamiento y se declara aparte el punto **(b)** de `B-31` con lo que bloquea, en la forma que `03-UX-UI-DX` usa, y se deja escrito que **lo que esta regla afirma no depende de cuál de las dos marcas sea**: el arranque parcial se produce igual. **El enunciado de §1, la justificación, el ámbito de aplicación, la consecuencia si se viola, la lista de casos de uso afectados y las pruebas que la verifican no cambian una palabra**, y ninguna decisión abierta se cerró. Ninguna fila previa de esta tabla se reescribió, por `Master-Prompt.md` §5.1 |
| 2.1 | 2026-08-01 | **`CU-38` entra a los casos de uso afectados**, por la ronda de decisiones del agente humano del proyecto del 2026-07-31, consolidada en el `PRODUCT-INTAKE-SelfHosted-Service` **v3.4** §19, fila `Q-19`. Sube **minor**: **el enunciado, la justificación, el momento de validación, la consecuencia y las pruebas previstas no cambian una palabra**. Lo único que cambia es §5: la **cuarentena** que la política de fallo al arrancar produce deja al proyecto SelfHosted corriendo con sus demás servicios, que es un arranque parcial, y esta regla es la que lo vuelve **estado declarado** en lugar de error silencioso. **Ninguna decisión abierta se cerró acá.** La versión 2.0 queda archivada en `_legacy/2026-08-01/RN-20-Arranque-Parcial-Como-Estado-Declarado-v2.0.md` |
| 2.0 | 2026-07-30 | Migración normativa del conjunto 4.1 al 6.0, fase M4 corte 3, bajo `Rules-Especificacion-Funcional` 4.0, `Vocabulario-Rules` 2.1 y `Migracion-Rules` 1.0. Clasificación **regenerar contenido** por el salto major 2.0 → 4.0 de la regla que gobierna la categoría; fuente de contenido: el **documento de origen**, archivado sin modificación en `_legacy/2026-07-30/`. Sube **major** porque la nomenclatura anterior deja de cumplir. **El enunciado de la invariante no cambió de contenido normativo**: una regla de negocio es atemporal y esta migración es únicamente léxica y de forma de cabecera. Cabecera: la etiqueta `Proyecto` pasa a `Producto` sobre el mismo valor de plano producto —`SelfHosted Service`, que es el `Nombre-Producto`—, según `Vocabulario-Rules` §3 y §4 R3 y el referente R4 del plan de migración §3.5; la trazabilidad upstream apunta al `PRODUCT-INTAKE-SelfHosted-Service` renombrado. Sustitución léxica **por ocurrencia** según `Vocabulario-Rules` §9.5, con censo declarado: **5 ocurrencias de «proyecto»**, de las cuales 1 era la etiqueta de cabecera y se sustituyó; las 4 restantes —«Un proyecto SelfHosted» en el enunciado de §1, «un proyecto SelfHosted» en §3 y las dos del caso T-24 en §6— designan la **entidad del dominio** y quedaron intactas, incluida la del enunciado, que es su sujeto gramatical. Ninguna designa el emprendimiento y **ninguna se promovió a «proyecto de código»**. **Cero** ocurrencias de «solución». **1 ocurrencia de «resolución»**, en §3 —«la resolución de arranque parcial»—: contiene la cadena `soluci` y **quedó intacta**, verificado por barrido negativo antes y después de la sustitución. **Glosario:** desde la 4.0 el vocabulario de la categoría vive en `Glosario-Funcional.md`, artefacto propio y obligatorio para los ocho tipos D8 (§2.1 y §4.2.4), y ya no en el punto 6 de `Modelo-Conceptual.md`; los términos que esta regla acuña o precisa —«arranque parcial», «parcialmente activo»— se devolvieron al lote que emite ese glosario y acá no se redefinen, y los que ya declara `Vision-Producto.md` §9 se referencian sin duplicarse |
| 1.0 | 2026-07-29 | Versión inicial. Transcripción del enunciado, del momento de validación y de la respuesta ante incumplimiento que declara el anexo E-16 del intake. No se reinterpreta ninguno de los tres |
