# RN-15 — Prohibición de devolver secretos en claro, y de escribirlos en una plantilla

**Proyecto de código:** SelfHosted-Service
**Producto:** SelfHosted Service
**Documento:** RN-15-Prohibicion-De-Devolver-Secretos-En-Claro.md
**Versión:** 2.0
**Estado:** Propuesto
**Fecha:** 2026-07-30
**Autor:** Analista Funcional Senior (AG-02)

**Trazabilidad upstream:** PRODUCT-INTAKE-SelfHosted-Service anexo E-16, fila RN-15; anexo E-6 §20.6.1 y §20.6.2. **Autoría declarada en la fuente:** enunciado base **[E]** de la fuente base; el **alcance a la plantilla del catálogo** es ampliación **[D-i]**, especificación de integración `DI-21`, **sin revisar**.

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

Un secreto nunca se devuelve en texto plano por la API ni se escribe en una exportación.

**Alcanza explícitamente a la plantilla del catálogo, y no sólo a la exportación**, con dos consecuencias exigibles:

1. **Guardar como plantilla un servicio con variables secretas convierte cada una en parámetro de tipo secreto con generación automática, descarta el valor, e informa cuáles convirtió.**
2. **Un parámetro de tipo secreto no admite valor por defecto.** La generación automática es su único mecanismo.

## 2. Justificación

Es la mitigación declarada del riesgo RG-09, secretos importados en la adopción que terminen visibles, y la condición que permite llevarse una exportación a otro servidor sin filtrar credenciales (historia de usuario 9).

**Por qué la ampliación no es una regla nueva sino el mismo enunciado sobre otro objeto.** Una plantilla del catálogo **es exportable por definición**: el catálogo se exporta completo y se importa en otra instalación. Un secreto escrito dentro de una plantilla es, por construcción, un secreto que va a terminar en una exportación, de modo que el enunciado original ya lo prohibía; lo que faltaba era declarar **en qué momento** se hace cumplir. Y el momento no puede ser la exportación: si se detectara ahí, el usuario tendría un catálogo que no puede exportar y ninguna forma de arreglarlo sin rearmar la plantilla. Se hace cumplir **al guardar**, que es cuando el valor entra.

**Por qué el valor por defecto queda prohibido sobre un parámetro secreto.** Es un **literal que vive en la definición del ítem** y viaja con ella. Un valor por defecto secreto es un secreto en un archivo distribuible. La generación automática no tiene ese problema: el valor se produce en la instanciación y nunca vive en la definición.

**Un caso que la regla no alcanza, declarado para que no se lea como olvido.** Una cadena de conexión con la contraseña adentro, escrita en una variable marcada como no secreta, no queda alcanzada: RN-23 propaga el carácter de secreto **a través de referencias** y no alcanza a un literal. Pero eso ocurre igual en un servicio normal y **no es un problema del catálogo**: es el límite conocido de la declaración manual del carácter de secreto, que D-2 ya resolvió del modo que resolvió —el secreto se declara, no se infiere—.

## 3. Ámbito de aplicación

**Momento de validación declarado en el anexo E-16:** toda respuesta y exportación, **más el guardado como plantilla y la publicación de un ítem**.

Se evalúa en toda respuesta de la API, en toda pantalla de la interfaz y en toda exportación, incluidos el paso de clasificación de variables de la incorporación y la lectura de las variables compartidas del proyecto; y desde la versión 1.1, además, al guardar un subgrafo resuelto como plantilla y al publicar o editar un ítem del catálogo.

## 4. Consecuencia si se viola

Enmascarado con `***` en toda respuesta y exportación.

En el guardado como plantilla la respuesta **no es un rechazo**: es una **conversión con informe**. El ítem se guarda, cada variable secreta queda como parámetro con generación automática, y el informe de guardado declara cuáles se convirtieron y cuántos valores se descartaron. Rechazar el guardado dejaría al usuario sin la plantilla y sin camino; convertir le da la plantilla que sirve.

Un valor por defecto declarado sobre un parámetro de tipo secreto sí se rechaza, con `422`.

## 5. CU afectados

CU-06, CU-07, CU-08, CU-09, CU-10, CU-12, CU-14, CU-16, CU-17, CU-32, CU-34, CU-35.

## 6. Pruebas que la verifican

- T-18: exportar a formato de composición un proyecto con una variable secreta. La exportación emite un marcador y el archivo de variables con el valor vacío; el valor no aparece en ningún archivo.
- T-32: incorporar el caso C-2 marcando `ClaveMaestra` como secreta. El valor no se persiste en claro ni se devuelve por la API.
- T-37: variable que referencia una compartida secreta. Enmascarada en toda respuesta.
- **Brecha declarada**: el anexo E-22 no declara casos para la ampliación. 08-Calidad-Y-Pruebas debe derivar tres, cuya entrada y resultado esperado el anexo E-6 §20.6.2 ya declara: guardar como plantilla un servicio con una variable secreta con valor literal y verificar que el parámetro resultante lleva generación automática y **no** lleva el valor; declarar un valor por defecto sobre un parámetro de tipo secreto y verificar el `422`; y exportar el catálogo verificando que el contador de ítems con material sensible es cero.

Las pruebas se realizan en 08-Calidad-Y-Pruebas. El anexo E-22 declara los casos con entrada concreta y resultado esperado, y el anexo E-16 declara que el catálogo está pensado para que cada regla se traduzca en una prueba automatizada.

## 7. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 2.0 | 2026-07-30 | Migración normativa del conjunto 4.1 al 6.0, fase M4 corte 3, bajo `Rules-Especificacion-Funcional` 4.0, `Vocabulario-Rules` 2.1 y `Migracion-Rules` 1.0. Clasificación **regenerar contenido** por el salto major 2.0 → 4.0 de la regla que gobierna la categoría; fuente de contenido: el **documento de origen**, archivado sin modificación en `_legacy/2026-07-30/`. Sube **major** porque la nomenclatura anterior deja de cumplir. **El enunciado de la invariante no cambió de contenido normativo**: una regla de negocio es atemporal y esta migración es únicamente léxica y de forma de cabecera. Cabecera: la etiqueta `Proyecto` pasa a `Producto` sobre el mismo valor de plano producto —`SelfHosted Service`, que es el `Nombre-Producto`—, según `Vocabulario-Rules` §3 y §4 R3 y el referente R4 del plan de migración §3.5; la trazabilidad upstream apunta al `PRODUCT-INTAKE-SelfHosted-Service` renombrado. Sustitución léxica **por ocurrencia** según `Vocabulario-Rules` §9.5, con censo declarado: **3 ocurrencias de «proyecto»**, de las cuales 1 era la etiqueta de cabecera y se sustituyó; las 2 restantes —«las variables compartidas del proyecto» en §3 y «un proyecto con una variable secreta» en el caso T-18 de §6— designan la **entidad del dominio** y quedaron intactas. Ninguna designa el emprendimiento y **ninguna se promovió a «proyecto de código»**. **Cero** ocurrencias de «solución» y **cero** de la cadena `resoluci`. La ampliación de la versión 1.1, del fix de la Fase B2, está declarada en su propia fila y su versión 1.0 archivada en `_legacy/2026-07-29/`: no hay corrección sin declarar y esta migración no toca su alcance. **Glosario:** desde la 4.0 el vocabulario de la categoría vive en `Glosario-Funcional.md`, artefacto propio y obligatorio para los ocho tipos D8 (§2.1 y §4.2.4), y ya no en el punto 6 de `Modelo-Conceptual.md`; los términos que esta regla acuña o precisa se devolvieron al lote que emite ese glosario y acá no se redefinen, y los que ya declara `Vision-Producto.md` §9 se referencian sin duplicarse |
| 1.1 | 2026-07-29 | **Ampliación del alcance a la plantilla del catálogo.** El enunciado base no cambia; se agregan sus dos consecuencias exigibles —la conversión de variables secretas a parámetro con generación automática al guardar como plantilla, y la prohibición del valor por defecto sobre un parámetro de tipo secreto—, con el argumento de por qué no es una regla nueva sino el mismo enunciado sobre otro objeto, y de por qué el momento de validación es el guardado y no la exportación. §2 declara además el caso que la regla **no** alcanza, para que no se lea como olvido. §3 suma dos momentos de validación, §4 distingue la conversión con informe del rechazo, §5 suma CU-16, y §6 declara tres casos de prueba a derivar. **Esta ampliación cierra la brecha B-09 de la especificación funcional**, que declaraba que el intake no decía si una plantilla podía contener material secreto ni con qué tratamiento. La versión 1.0 queda archivada en `_legacy/2026-07-29/`. Origen: §22.3 del documento de trabajo `SDD/Estado/Redefinicion-Servicio.md` v2.0 |
| 1.0 | 2026-07-29 | Versión inicial. Transcripción del enunciado, del momento de validación y de la respuesta ante incumplimiento que declara el anexo E-16 del intake. No se reinterpreta ninguno de los tres |
