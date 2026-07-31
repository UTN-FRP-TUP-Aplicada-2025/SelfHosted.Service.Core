> **Documento archivado.** Estado: **Superado**. Es la copia completa del estado previo de `RN-08-Datos-Obligatorios-Del-Origen-Repositorio.md`, versión **2.0**, archivada el 2026-07-30 por la política de deprecación de `Master-Prompt.md` §5.1 al incorporarse la ronda de decisiones del agente humano del proyecto del 2026-07-30 —`Q-15`, `Q-17`, `Q-27` y la confirmación de `DI-17` a `DI-19`—. La versión vigente es [`RN-08-Datos-Obligatorios-Del-Origen-Repositorio.md`](../../RN-08-Datos-Obligatorios-Del-Origen-Repositorio.md). **El cuerpo que sigue no se modificó.**
>

---

# RN-08 — Datos obligatorios del origen, por variante

**Proyecto de código:** SelfHosted-Service
**Producto:** SelfHosted Service
**Documento:** RN-08-Datos-Obligatorios-Del-Origen-Repositorio.md
**Versión:** 2.0
**Estado:** Propuesto
**Fecha:** 2026-07-30
**Autor:** Analista Funcional Senior (AG-02)

**Trazabilidad upstream:** PRODUCT-INTAKE-SelfHosted-Service anexo E-16, fila RN-08; anexo E-2 §20.2.3, las cinco variantes discriminadas de origen. **Autoría declarada en la fuente:** enunciado base **[E]** de la fuente base; el **reparto por variante** es ampliación **[D-i]**, especificación de integración `DI-17`, **sin revisar**.

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

**El enunciado original de esta regla sobrevive sin cambios dentro de la tercera fila.** Antes decía «el servicio con origen repositorio requiere ruta del archivo de construcción y rama», y eso sigue siendo exactamente lo exigible para esa variante. Lo que la ampliación agrega es qué exigen las otras cuatro, que antes no estaba declarado en ninguna parte.

## 2. Justificación

Sin los datos que su variante exige, el origen **no es resoluble ni verificable**: el sistema no sabe qué descargar ni qué construir. Para la variante repositorio el argumento es el original —sin rama y sin ruta del archivo de construcción la imagen no es reproducible ni determinable—, y para las otras cuatro es el mismo con otro objeto: sin credencial no se puede autenticar contra un registro privado, y sin contenido no hay nada que construir.

La segunda mitad del enunciado —que un campo ajeno a la variante es inválido— existe porque el origen es una **variante discriminada** y no un objeto con todos los campos opcionales. Admitir campos ajenos permitiría persistir un origen que declara a la vez una rama y un contenido de archivo de construcción, que es un estado sin significado y que ningún consumidor sabría interpretar.

## 3. Ámbito de aplicación

**Momento de validación declarado en el anexo E-16:** alta, edición del origen y verificación del origen.

Se evalúa al declarar o cambiar el origen de un servicio, y la verificación del origen la vuelve a evaluar antes de consultar el sistema externo, porque consultar con datos incompletos produciría un fallo de red donde en realidad falta un dato.

**Brecha declarada:** el intake no declara si el origen es editable después del alta. La reentrada de la configuración arranca en el paso del modo de red y excluye el origen sin decirlo. Es la pendiente `Q-28` de §19 del intake, y **mientras esté abierta el momento «edición del origen» de esta regla no tiene camino de usuario declarado**. Destinatario: agente humano del proyecto.

## 4. Consecuencia si se viola

Respuesta `422`, señalando **el campo faltante o el campo ajeno a la variante**. Son dos causas distintas y el mensaje las distingue, porque la acción del usuario es distinta: completar un dato, o quitar uno que sobra.

## 5. CU afectados

CU-03, CU-08, CU-13, CU-15.

## 6. Pruebas que la verifican

- El anexo E-22 no declara un caso ejecutable propio para esta regla. **Brecha declarada**, sin cerrar y ampliada: 08-Calidad-Y-Pruebas debe derivar **un caso por variante** —cinco de dato faltante y al menos uno de campo ajeno—, con entrada concreta y resultado esperado, a partir del enunciado del anexo E-16 y de las cinco variantes del anexo E-2 §20.2.3.

Las pruebas se realizan en 08-Calidad-Y-Pruebas. El anexo E-22 declara los casos con entrada concreta y resultado esperado, y el anexo E-16 declara que el catálogo está pensado para que cada regla se traduzca en una prueba automatizada.

## 7. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 2.0 | 2026-07-30 | Migración normativa del conjunto 4.1 al 6.0, fase M4 corte 3, bajo `Rules-Especificacion-Funcional` 4.0, `Vocabulario-Rules` 2.1 y `Migracion-Rules` 1.0. Clasificación **regenerar contenido** por el salto major 2.0 → 4.0 de la regla que gobierna la categoría; fuente de contenido: el **documento de origen**, archivado sin modificación en `_legacy/2026-07-30/`. Sube **major** porque la nomenclatura anterior deja de cumplir. **El enunciado de la invariante no cambió de contenido normativo**: una regla de negocio es atemporal, y esta migración es únicamente léxica y de forma de cabecera; las siete secciones obligatorias de `Rules-Especificacion-Funcional` §4.2.1 conservan su texto y su orden. **Cabecera:** la etiqueta `Proyecto` pasa a `Producto` sobre el mismo valor de plano producto —`SelfHosted Service`, que es el `Nombre-Producto`—, según `Vocabulario-Rules` §3 y §4 R3 y el referente R4 del plan de migración §3.5; la trazabilidad upstream apunta al `PRODUCT-INTAKE-SelfHosted-Service` renombrado. **Sustitución léxica por ocurrencia** según `Vocabulario-Rules` §9.5, con censo declarado: **2 ocurrencias de «proyecto»**; de las que **1 es la etiqueta de cabecera** y se sustituyó; **1 designa el emprendimiento** —«agente humano del proyecto»— y se preserva a secas y sin calificar (referente R3 del plan §3.5); y **ninguna se promovió a «proyecto de código»**. **Cero** ocurrencias de «solución» con el referente de nivel superior. **Cero** ocurrencias de la cadena `resoluci`. La nota sobre el nombre del archivo, el reparto por variante de origen de §1 y la brecha `Q-28` de §3 se conservan sin cambios; el nombre del archivo sigue siendo `Origen-Repositorio` por el motivo que la propia nota declara.  **Glosario:** desde la 4.0 el vocabulario de la categoría vive en `Glosario-Funcional.md`, artefacto propio y obligatorio para los ocho tipos D8 (§2.1 y §4.2.4), y ya no en el punto 6 de `Modelo-Conceptual.md`; los términos que esta regla acuña o precisa se devolvieron al lote que emite ese glosario y acá no se redefinen, y los que ya declara [Vision-Producto](../../00-Contexto/Vision-Producto.md) §9 se referencian sin duplicarse. El bloque de procedencia del destino sigue declarando la 4.1 y no se toca: es trabajo de M5 |
| 1.1 | 2026-07-29 | **Reformulación del enunciado por variante de origen.** El origen pasó de tres valores planos a cinco variantes discriminadas en el anexo E-2 del intake v2.4, y esta regla declaraba los datos obligatorios de una sola de ellas. El enunciado original **sobrevive sin cambios** dentro de la fila de la variante repositorio; lo que se agrega es qué exigen las otras cuatro y la prohibición de campos ajenos a la variante, que es lo que una variante discriminada obliga a declarar. El título del documento pasa a declarar el alcance vigente y el nombre del archivo se conserva, con su motivo escrito. §3 suma la brecha `Q-28`, que deja sin camino de usuario declarado el momento «edición del origen». §5 suma CU-13. §6 amplía la brecha de cobertura de un caso a seis. La versión 1.0 queda archivada en `_legacy/2026-07-29/`. Origen: §22.3 del documento de trabajo `SDD/Estado/Redefinicion-Servicio.md` v2.0 |
| 1.0 | 2026-07-29 | Versión inicial. Transcripción del enunciado, del momento de validación y de la respuesta ante incumplimiento que declara el anexo E-16 del intake. No se reinterpreta ninguno de los tres |
