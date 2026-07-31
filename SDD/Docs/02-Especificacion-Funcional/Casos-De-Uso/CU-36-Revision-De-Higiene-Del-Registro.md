# CU-36 — Revisión de higiene del registro

**Proyecto de código:** SelfHosted-Service
**Producto:** SelfHosted Service
**Documento:** CU-36-Revision-De-Higiene-Del-Registro.md
**Versión:** 2.0
**Estado:** Propuesto
**Fecha:** 2026-07-30
**Autor:** Analista Funcional Senior (AG-02)

**Necesidad de negocio upstream:** [NB-01](../../01-Necesidades-Negocio/Necesidades-De-Negocio/NB-01-Visibilidad-Unificada-De-La-Arquitectura.md)
**Trazabilidad upstream:** PRODUCT-INTAKE §4 capacidad F-25 y su nota (decisión D-13, con las cinco detecciones enumeradas); E-16 RN-37; §12, entrada de glosario de higiene del modelo; anexo E-9, bloque de identidad de objeto

---

## Tabla de contenido

- [1. Propósito](#1-propósito)
- [2. Actores](#2-actores)
- [3. Precondiciones](#3-precondiciones)
- [4. Flujo principal](#4-flujo-principal)
- [5. Flujos alternativos](#5-flujos-alternativos)
- [6. Excepciones y errores](#6-excepciones-y-errores)
- [7. Postcondiciones](#7-postcondiciones)
- [8. Criterios de aceptación](#8-criterios-de-aceptación)
- [9. Trazabilidad](#9-trazabilidad)
- [10. Notas y supuestos](#10-notas-y-supuestos)
- [11. Control de cambios](#11-control-de-cambios)
- [13. Interacción multiusuario y concurrencia](#13-interacción-multiusuario-y-concurrencia)

---

## 1. Propósito

Permitir que el administrador vea las condiciones de higiene que el registro del sistema acumuló —variables compartidas huérfanas, nombres repetidos en el mismo ámbito y referencias que quedaron sin uso—, informadas y nunca bloqueantes, para que la deuda del modelo deje de acumularse sin que nadie la vea.

## 2. Actores

| Actor | Tipo | Rol |
| --- | --- | --- |
| Administrador del producto | Primario | Consulta las advertencias de higiene y decide si actúa |
| Registro del producto | Sistema | Detecta las cinco condiciones y las informa sin bloquear ninguna operación |

Los nombres de los actores no humanos son **denominaciones acuñadas por esta categoría**, salvo los seis que trazan a una fuente: `Motor de contenedores`, `Destino externo`, `Automatismo de integración continua`, `Sincronizador de estado`, `Módulo de descubrimiento` y `Resolutor de referencias`. Los acuñados no son componentes declarados y no condicionan la descomposición: su correspondencia con los módulos que el intake §17.P.2 sí declara la fija 05-Arquitectura-Tecnica. La convención completa, nombre por nombre, está en [Especificacion-Funcional.md](../Especificacion-Funcional.md) §8.

## 3. Precondiciones

- Existe al menos un proyecto SelfHosted declarado (CU-01).
- El administrador tiene sesión iniciada (CU-30).

## 4. Flujo principal

1. El administrador abre la revisión de higiene de un proyecto SelfHosted, o el sistema la ejecuta en su revisión periódica.
2. El sistema detecta las variables compartidas del proyecto que ninguna referencia usa.
3. El sistema detecta los pares de elementos con el mismo nombre visible en el mismo ámbito.
4. El sistema detecta las referencias que quedaron sin uso tras un cambio.
5. El sistema presenta las condiciones detectadas como avisos informativos, cada uno con el elemento alcanzado.
6. El administrador decide si actúa sobre alguna. Ninguna operación queda bloqueada por la revisión.

## 5. Flujos alternativos

**FA-01 — Detección durante la instanciación.**
Disparador: el administrador instancia un ítem del catálogo y una clave compartida ya existe.
Pasos: si el valor coincide, el sistema advierte y ofrece reusar; si difiere, crea separadas y avisa. En ninguno de los dos casos bloquea (RN-37). Ver CU-16.
Punto de retorno: paso 5.

**FA-02 — Registro sin condiciones detectadas.**
Disparador: la revisión no encuentra ninguna de las cinco condiciones.
Pasos: el sistema informa que no hay advertencias.
Punto de retorno: paso 6.

## 6. Excepciones y errores

| Código | Causa | Respuesta del sistema |
| --- | --- | --- |
| Ninguna | La regla RN-37 declara explícitamente que ninguna de las cinco condiciones bloquea ninguna operación | No hay error asociado a este caso de uso: las cinco detecciones producen avisos informativos y no rechazos |

## 7. Postcondiciones

**En caso de éxito:** el administrador dispone del inventario de condiciones de higiene detectadas, con el elemento alcanzado en cada una; el estado del registro del sistema no cambió por el hecho de revisarlo.

**En caso de fallo:** el caso de uso es de lectura y no modifica el registro del sistema. Si la detección no puede completarse, el registro del sistema queda intacto.

## 8. Criterios de aceptación

| ID | Given | When | Then |
| --- | --- | --- | --- |
| CA-01 | Un proyecto SelfHosted con la variable compartida `API_KEY_EXTERNA` que ningún servicio referencia | El administrador abre la revisión de higiene | El sistema la reporta como huérfana, sin bloquear su creación ni el arranque del proyecto |
| CA-02 | Un proyecto SelfHosted con dos variables compartidas de clave `TZ` y el mismo valor | El administrador abre la revisión de higiene | El sistema advierte que probablemente convenga compartir y ofrece reusar, sin bloquear |
| CA-03 | Un proyecto SelfHosted con dos variables compartidas de clave `TZ` y valores distintos | El administrador abre la revisión de higiene | El sistema avisa que coexisten y no ofrece reusar: casi seguro son cosas distintas |
| CA-04 | Un proyecto SelfHosted con una referencia que quedó sin uso tras eliminar el consumidor | El administrador abre la revisión de higiene | El sistema la reporta como referencia sin uso, y ninguna operación del proyecto queda bloqueada |

## 9. Trazabilidad

| Dimensión | Referencia |
| --- | --- |
| Necesidad de negocio | [NB-01](../../01-Necesidades-Negocio/Necesidades-De-Negocio/NB-01-Visibilidad-Unificada-De-La-Arquitectura.md) |
| Reglas de negocio aplicables | RN-28, RN-35, RN-37. Reglas conceptuales: RC-04, RC-17 |
| Historias de usuario a generar en 06 | US-CU-36-1 (ver las variables compartidas huérfanas), US-CU-36-2 (ver los nombres repetidos en el mismo ámbito), US-CU-36-3 (ver las referencias que quedaron sin uso) |
| Componentes esperados en 05 | Capa `Web`, vista de revisión del proyecto; capa `Application`, módulo de proyectos; capa `Domain`, consultas de higiene sobre el modelo; capa `Infrastructure`, `Persistencia`. Referencia tentativa |
| Tests previstos en 08 | T-61, T-62, T-63 (las tres condiciones con caso declarado en el anexo E-22); T-42 (segunda compartida con la misma clave y el mismo valor) |

Los identificadores de historia de usuario llevan la forma `US-CU-XX-n` y son **provisionales**: la numeración definitiva es potestad de 06-Backlog-Tecnico. La forma se eligió para que ningún identificador emitido acá colisione con la numeración que 06 asigne.

## 10. Notas y supuestos

- La capacidad F-25 es `Could Have` y estrictamente informativa: ningún flujo de usuario depende de ella y nada falla si no está. Su prioridad y su argumento son dato declarado del intake §4.
- La capacidad presupone la identidad de objeto de D-12: sin ella, sus cinco consultas no existen.
- **Brecha declarada:** el plazo del criterio de higiene de NB-01 depende de la asignación de la épica EP-25 a una fase, que sigue sin decidirse. Destinatario: 07-Plan-Sprint, con decisión del agente humano del proyecto.
- La presentación de los avisos pertenece a 03-UX-UI-DX.

## 11. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 2.0 | 2026-07-30 | **Migración normativa 4.1 → 6.0**, corte 3 de la fase M4, sobre el plan [`Plan-Migracion-4.1-a-6.0.md`](../../Audit/Plan-Migracion-4.1-a-6.0.md). Clasificación **regenerar contenido**, por el salto de `Rules-Especificacion-Funcional` 2.0 → 4.0. **Fuente de contenido: documento de origen**, más el [PRODUCT-MANIFEST](../../../Intake/PRODUCT-MANIFEST-SelfHosted-Service.md) §1.3 para el único campo de cabecera que se suma. Ningún flujo, actor, criterio de aceptación, excepción, brecha ni referencia cambia de contenido: lo que cambia es la nomenclatura. **Vocabulario (`[5.0]`)**: la etiqueta de cabecera `**Proyecto:**` llevaba un valor del plano de negocio y pasa a `**Producto:**`, porque `Vocabulario-Rules.md` §3 prohíbe la etiqueta de un plano sobre el valor de otro; se suma `**Proyecto de código:**` con el `Nombre-Proyecto-Codigo` declarado, que §4.1 de la regla vigente exige y que este documento no declaraba; `SOLUTION-INTAKE` pasa a `PRODUCT-INTAKE`; y «solución» pasa a «producto» en **2 ocurrencias**, las de los dos nombres de actor. **Las 12 ocurrencias de «proyecto» del dominio no se tocaron**: designan la entidad `Proyecto` del producto —el ámbito sobre el que corre la revisión de higiene, en los cuatro criterios de aceptación y en la revisión periódica de §13— y no la unidad de compilación. La de «agente humano del proyecto» en §10 queda a secas, por su referente de emprendimiento. La sustitución se hizo por el procedimiento por ocurrencia de `Vocabulario-Rules.md` §9.5 y **nunca por reemplazo global de cadena**. **Glosario (`[5.1]`)**: por §2.1 y §4.2.4 de la regla vigente, `Glosario-Funcional.md` pasa a ser artefacto propio y obligatorio y deja de ser el punto 6 de `Modelo-Conceptual.md`. **Consecuencia para la fila de abajo, que no se reescribe**: la entrada de glosario con los cuatro referentes de «registro», que esa fila ubica en `Modelo-Datos/Modelo-Conceptual.md` §6, pasa a vivir en `Glosario-Funcional.md`; ese artefacto lo emite un lote posterior de esta migración y todavía no existe, de modo que acá no se enlaza. Las formas calificadas «registro del sistema» de §1, §7 y FA-02 **no se tocaron** —no colisionan—, y el renombre del actor `Registro de la solución` a `Registro del producto` **agrega un quinto referente** a esa familia, que se devolvió como término para el glosario junto con «higiene» en lugar de resolverse acá. **Navegabilidad**: la tabla de contenido suma la sección 13, que §4.3 de la regla admite para `web-monolith` y que la tabla omitía. Ninguna fila anterior de este control de cambios se reescribió (`SDD-Development-Guide.md` §VI.2) y el bloque de procedencia del destino no se tocó: sigue declarando 4.1, y cerrarlo es trabajo de M5 |
| 1.0 | 2026-07-29 | Corrección absorbida dentro de la versión 1.0, sin subirla y sin archivar, por la política de versionado de `Master-Prompt.md` §5: el documento está en estado `Propuesto`. Se califica la forma «el registro» a secas, que tenía tres referentes distintos en la categoría y no era resoluble leyendo esta sección por separado, que es como se generan los artefactos de las categorías siguientes. La entrada de glosario con los cuatro referentes vive en `Modelo-Datos/Modelo-Conceptual.md` §6. Las formas ya calificadas no se tocaron: no colisionan. |
| 1.0 | 2026-07-29 | Corrección absorbida dentro de la versión 1.0, sin subirla y sin archivar, por la política de versionado de `Master-Prompt.md` §5: el documento está en estado `Propuesto` y la corrección proviene del audit de su propia fase de emisión. §2 suma la declaración de que los nombres de los actores no humanos son denominaciones acuñadas por esta categoría y no componentes declarados, con la salvedad de los seis que sí trazan a una fuente. Ningún actor cambia de nombre y ningún flujo se altera: lo que se corrige es que la categoría afirmaba que todo dato trazaba y trece de los diecinueve nombres de actor no humano no lo cumplían. Origen: hallazgo H-04 del informe [Audit/B-02-03-r1.md](../../Audit/B-02-03-r1.md) |
| 1.0 | 2026-07-29 | Versión inicial, derivada de la necesidad de negocio upstream y de las secciones del intake citadas en la cabecera |

## 13. Interacción multiusuario y concurrencia

Sección opcional admitida por §4.3 de `Rules-Especificacion-Funcional.md` para el tipo `web-monolith`. Conserva el número que esa sección le asigna, de modo que la numeración salta del 11 al 13 por construcción de la regla y no por omisión.

El intake declara la revisión periódica del proyecto SelfHosted como uno de los tres momentos de evaluación de RN-37. La frecuencia concreta de esa revisión no está declarada y se registra como brecha para 05-Arquitectura-Tecnica.

