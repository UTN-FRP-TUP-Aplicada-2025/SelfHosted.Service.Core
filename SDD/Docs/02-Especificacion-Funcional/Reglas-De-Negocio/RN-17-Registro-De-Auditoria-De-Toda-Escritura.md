# RN-17 — Registro de auditoría de toda operación de escritura

**Proyecto de código:** SelfHosted-Service
**Producto:** SelfHosted Service
**Documento:** RN-17-Registro-De-Auditoria-De-Toda-Escritura.md
**Versión:** 2.0
**Estado:** Propuesto
**Fecha:** 2026-07-30
**Autor:** Analista Funcional Senior (AG-02)

**Trazabilidad upstream:** PRODUCT-INTAKE-SelfHosted-Service anexo E-16, fila RN-17. **Autoría declarada en la fuente:** **[E]** de la fuente base.

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

Toda operación de escritura queda registrada en auditoría con su actor.

## 2. Justificación

Un único administrador no significa sin auditoría: el registro de auditoría es lo que permite entender qué disparó un despliegue cuando lo hizo un automatismo y no una persona. Es además una de las mitigaciones declaradas del riesgo RG-03, el acceso al socket del motor como control total del host.

## 3. Ámbito de aplicación

**Momento de validación declarado en el anexo E-16:** Cada operación.

Se evalúa en toda operación de escritura, venga de la interfaz o de la API. El actor es el administrador o el token identificado por su prefijo. Los cinco campos de auditoría son momento, actor, acción, entidad y resultado, y la retención declarada es de 90 días (DA-07).

## 4. Consecuencia si se viola

Invariante.

## 5. CU afectados

CU-01, CU-02, CU-03, CU-04, CU-05, CU-07, CU-11, CU-12, CU-13, CU-15, CU-16, CU-17, CU-18, CU-19, CU-21, CU-22, CU-23, CU-24, CU-29, CU-30, CU-31, CU-32, CU-33, CU-34, CU-35, CU-37, CU-38.

## 6. Pruebas que la verifican

- T-26: cualquier operación de escritura por API con token. Fila de auditoría con actor identificado por el prefijo del token.

Las pruebas se realizan en 08-Calidad-Y-Pruebas. El anexo E-22 declara los casos con entrada concreta y resultado esperado, y el anexo E-16 declara que el catálogo está pensado para que cada regla se traduzca en una prueba automatizada.

## 7. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 2.0 | 2026-07-30 | Migración normativa del conjunto 4.1 al 6.0, fase M4 corte 3, bajo `Rules-Especificacion-Funcional` 4.0, `Vocabulario-Rules` 2.1 y `Migracion-Rules` 1.0. Clasificación **regenerar contenido** por el salto major 2.0 → 4.0 de la regla que gobierna la categoría; fuente de contenido: el **documento de origen**, archivado sin modificación en `_legacy/2026-07-30/`. Sube **major** porque la nomenclatura anterior deja de cumplir. **El enunciado de la invariante no cambió de contenido normativo**: una regla de negocio es atemporal y esta migración es únicamente léxica y de forma de cabecera. Cabecera: la etiqueta `Proyecto` pasa a `Producto` sobre el mismo valor de plano producto —`SelfHosted Service`, que es el `Nombre-Producto`—, según `Vocabulario-Rules` §3 y §4 R3 y el referente R4 del plan de migración §3.5; la trazabilidad upstream apunta al `PRODUCT-INTAKE-SelfHosted-Service` renombrado. Sustitución léxica **por ocurrencia** según `Vocabulario-Rules` §9.5, con censo declarado: **1 ocurrencia de «proyecto»**, la etiqueta de cabecera, sustituida; ninguna designa la entidad del dominio ni el emprendimiento y **ninguna se promovió a «proyecto de código»**. **Cero** ocurrencias de «solución» y **cero** de la cadena `resoluci`. La forma calificada «registro de auditoría» de §2 **no se toca**: es una forma calificada y por `Vocabulario-Rules` §9.2 no colisiona. **Corrección manual detectada y no propagada** (`Migracion-Rules` §4.2.3): §5 enumera `CU-37` y `CU-38`, que el informe [B2-Fix-Definiciones-Servicio-r1.md](../../Audit/B2-Fix-Definiciones-Servicio-r1.md) §5.3 declara agregados por el fix de la Fase B2 sin que ninguna fila de este control de cambios lo declare. La lista se **preservó tal como está** y la discrepancia se devolvió al plan sin resolverse acá. **Glosario:** desde la 4.0 el vocabulario de la categoría vive en `Glosario-Funcional.md`, artefacto propio y obligatorio para los ocho tipos D8 (§2.1 y §4.2.4), y ya no en el punto 6 de `Modelo-Conceptual.md`. La fila 1.0 que remite a ese punto 6 **no se reescribe**, por `SDD-Development-Guide.md` §VI.2: quedó escrita cuando ése era el lugar del glosario de la categoría, y el destino vigente de esa entrada de polisemia es `Glosario-Funcional.md`, adonde se devolvieron los referentes de la familia «registro» |
| 1.0 | 2026-07-29 | Corrección absorbida dentro de la versión 1.0, sin subirla y sin archivar, por la política de versionado de `Master-Prompt.md` §5: el documento está en estado `Propuesto`. Se califica la forma «el registro» a secas, que tenía tres referentes distintos en la categoría y no era resoluble leyendo esta sección por separado, que es como se generan los artefactos de las categorías siguientes. La entrada de glosario con los cuatro referentes vive en `Modelo-Datos/Modelo-Conceptual.md` §6. Las formas ya calificadas no se tocaron: no colisionan. |
| 1.0 | 2026-07-29 | Versión inicial. Transcripción del enunciado, del momento de validación y de la respuesta ante incumplimiento que declara el anexo E-16 del intake. No se reinterpreta ninguno de los tres |
