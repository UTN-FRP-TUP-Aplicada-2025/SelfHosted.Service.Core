# RN-24 — Resolución de la referencia inmediatamente antes de crear el contenedor

**Proyecto de código:** SelfHosted-Service
**Producto:** SelfHosted Service
**Documento:** RN-24-Resolucion-De-La-Referencia-Antes-De-Crear-El-Contenedor.md
**Versión:** 2.0
**Estado:** Propuesto
**Fecha:** 2026-07-30
**Autor:** Analista Funcional Senior (AG-02)

**Trazabilidad upstream:** PRODUCT-INTAKE-SelfHosted-Service anexo E-16, fila RN-24. **Autoría declarada en la fuente:** **[D]** completa, decisión D-6.

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

La referencia se resuelve en el backend inmediatamente antes de crear el contenedor. El contenedor recibe el valor, nunca la expresión.

## 2. Justificación

El valor en claro de un secreto existe sólo en memoria, entre el descifrado y la llamada de creación al motor, y no se persiste ni se registra en auditoría. Que el contenedor reciba el valor y no la expresión es lo que hace que el proceso que corre adentro no tenga que conocer el mecanismo de referencias.

## 3. Ámbito de aplicación

**Momento de validación declarado en el anexo E-16:** Creación del contenedor.

Se evalúa en cada creación de contenedor, cualquiera sea la operación que la haya disparado.

## 4. Consecuencia si se viola

Invariante. Una referencia no resoluble aborta el despliegue de ese servicio con la causa identificada (RN-21), sin afectar a los demás contenedores de la operación (RN-31).

## 5. CU afectados

CU-13, CU-15, CU-16, CU-18, CU-24, CU-33, CU-35, CU-38.

## 6. Pruebas que la verifican

- T-38: desplegar el servicio 101 del anexo E-2, que tiene seis referencias. Ninguna variable del contenedor contiene la expresión ni el marcador del vínculo: lo que viaja es el valor.

Las pruebas se realizan en 08-Calidad-Y-Pruebas. El anexo E-22 declara los casos con entrada concreta y resultado esperado, y el anexo E-16 declara que el catálogo está pensado para que cada regla se traduzca en una prueba automatizada.

## 7. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 2.0 | 2026-07-30 | Migración normativa del conjunto 4.1 al 6.0, fase M4 corte 3, bajo `Rules-Especificacion-Funcional` 4.0, `Vocabulario-Rules` 2.1 y `Migracion-Rules` 1.0. Clasificación **regenerar contenido** por el salto major 2.0 → 4.0 de la regla que gobierna la categoría; fuente de contenido: el **documento de origen**, archivado sin modificación en `_legacy/2026-07-30/`. Sube **major** porque la nomenclatura anterior deja de cumplir. **El enunciado de la invariante no cambió de contenido normativo**: una regla de negocio es atemporal y esta migración es únicamente léxica y de forma de cabecera. Cabecera: la etiqueta `Proyecto` pasa a `Producto` sobre el mismo valor de plano producto —`SelfHosted Service`, que es el `Nombre-Producto`—, según `Vocabulario-Rules` §3 y §4 R3 y el referente R4 del plan de migración §3.5; la trazabilidad upstream apunta al `PRODUCT-INTAKE-SelfHosted-Service` renombrado. Sustitución léxica **por ocurrencia** según `Vocabulario-Rules` §9.5, con censo declarado: **1 ocurrencia de «proyecto»**, la etiqueta de cabecera, sustituida; ninguna designa la entidad del dominio ni el emprendimiento y **ninguna se promovió a «proyecto de código»**. **Cero** ocurrencias de «solución». **Este documento es el más expuesto del destino a la trampa de la cadena `soluci`**: lleva «Resolución» en el título H1, «Resolucion» en el campo `Documento` y en su **nombre de archivo**, que **no se renombró**. Las tres ocurrencias quedaron intactas, verificado por barrido negativo antes y después: es exactamente la ocurrencia que el plan de migración §3.5 señala como la que produjo, al sustituir la cadena a ciegas, las treinta apariciones de una palabra inexistente que la entrada `[5.1]` del framework documenta sobre sí mismo. **Corrección manual detectada y no propagada** (`Migracion-Rules` §4.2.3): §5 enumera `CU-38`, que el informe [B2-Fix-Definiciones-Servicio-r1.md](../../Audit/B2-Fix-Definiciones-Servicio-r1.md) §5.3 declara agregado por el fix de la Fase B2 sin que ninguna fila de este control de cambios lo declare. La lista se **preservó tal como está** y la discrepancia se devolvió al plan sin resolverse acá. **Glosario:** desde la 4.0 el vocabulario de la categoría vive en `Glosario-Funcional.md`, artefacto propio y obligatorio para los ocho tipos D8 (§2.1 y §4.2.4), y ya no en el punto 6 de `Modelo-Conceptual.md`; el término «resolución de la referencia», que esta regla acuña, se devolvió al lote que emite ese glosario y acá no se redefine |
| 1.0 | 2026-07-29 | Versión inicial. Transcripción del enunciado, del momento de validación y de la respuesta ante incumplimiento que declara el anexo E-16 del intake. No se reinterpreta ninguno de los tres |
