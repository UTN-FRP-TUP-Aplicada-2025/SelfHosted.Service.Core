# CU-23 — Descarte de un cambio individual del conjunto pendiente

**Proyecto de código:** SelfHosted-Service
**Producto:** SelfHosted Service
**Documento:** CU-23-Descarte-De-Un-Cambio-Individual.md
**Versión:** 2.0
**Estado:** Propuesto
**Fecha:** 2026-07-30
**Autor:** Analista Funcional Senior (AG-02)

**Necesidad de negocio upstream:** [NB-06](../../01-Necesidades-Negocio/Necesidades-De-Negocio/NB-06-Cambios-Revisados-Y-Aplicados-En-Lote.md)
**Trazabilidad upstream:** PRODUCT-INTAKE-SelfHosted-Service §4 capacidad F-07; anexo E-5 (los cuatro cambios acumulados y su granularidad); §17.P.11 DA-05, que declara el descarte granular como la mitad del deshacer; E-16 RN-12, RN-13

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

---

## 1. Propósito

Permitir que el administrador descarte del conjunto de cambios pendientes un cambio concreto sin perder los demás, para decidir con la consecuencia delante qué entra en el lote y qué no.

## 2. Actores

| Actor | Tipo | Rol |
| --- | --- | --- |
| Administrador del producto | Primario | Elige el cambio a descartar y confirma |
| Registro del producto | Sistema | Retira el cambio del conjunto, recalcula el informe de impacto y conserva el resto |

Los nombres de los actores no humanos son **denominaciones acuñadas por esta categoría**, salvo los seis que trazan a una fuente: `Motor de contenedores`, `Destino externo`, `Automatismo de integración continua`, `Sincronizador de estado`, `Módulo de descubrimiento` y `Resolutor de referencias`. Los acuñados no son componentes declarados y no condicionan la descomposición: su correspondencia con los módulos que el intake §17.P.2 sí declara la fija 05-Arquitectura-Tecnica. La convención completa, nombre por nombre, está en [Especificacion-Funcional.md](../Especificacion-Funcional.md) §8.

## 3. Precondiciones

- Existe un conjunto de cambios pendientes con al menos un cambio (CU-22).
- El administrador tiene el detalle del conjunto abierto.

## 4. Flujo principal

1. El administrador abre el detalle del conjunto de cambios pendientes.
2. El sistema lista cada cambio con su clase, su entidad, su resumen, su antes y su después.
3. El administrador elige un cambio y solicita descartarlo.
4. El sistema retira ese cambio del conjunto y restituye el estado anterior del elemento alcanzado.
5. El sistema recalcula el informe de impacto sobre los cambios que quedan (RN-13). Ver CU-25.
6. El sistema conserva los demás cambios del conjunto sin alterarlos.
7. El sistema registra el evento de auditoría (RN-17).

## 5. Flujos alternativos

**FA-01 — Descarte del conjunto completo.**
Disparador: el administrador descarta todos los cambios pendientes.
Pasos: el conjunto pasa a estado descartado y el proyecto SelfHosted vuelve a su configuración aplicada.
Punto de retorno: el lienzo del proyecto.

**FA-02 — Descarte de un cambio del que dependen otros.**
Disparador: el cambio descartado es el alta de un servicio al que otro cambio hace referencia.
Pasos: el sistema declara la dependencia entre los cambios antes de descartar. **El intake no declara el tratamiento de esta dependencia** y se registra como brecha en §10.
Punto de retorno: paso 4.

**FA-03 — Último cambio del conjunto.**
Disparador: se descarta el único cambio pendiente.
Pasos: el conjunto queda vacío y el aviso de cambios pendientes desaparece.
Punto de retorno: el lienzo del proyecto.

## 6. Excepciones y errores

| Código | Causa | Respuesta del sistema |
| --- | --- | --- |
| Cambio inexistente | El cambio elegido ya no está en el conjunto | El sistema informa la situación y refresca el detalle, sin alterar el conjunto |
| Dependencia entre cambios | El cambio descartado es requisito de otro cambio del conjunto | **El intake no declara el comportamiento**; se declara brecha en §10 |
| Conjunto ya aplicado | Se intenta descartar un cambio de un conjunto ya aplicado | No corresponde: un conjunto aplicado no tiene cambios pendientes que descartar |

## 7. Postcondiciones

**En caso de éxito:** el cambio descartado no está en el conjunto pendiente; el elemento alcanzado volvió a su estado anterior; los demás cambios siguen intactos y el informe de impacto refleja el conjunto restante.

**En caso de fallo:** el conjunto queda como estaba y ningún cambio se pierde.

## 8. Criterios de aceptación

| ID | Given | When | Then |
| --- | --- | --- | --- |
| CA-01 | Un conjunto de cambios pendientes con cuatro cambios, uno de ellos el alta del servicio `cache` | El administrador descarta el alta de `cache` | El conjunto queda con los otros tres cambios y `cache` deja de figurar entre los servicios a redesplegar |
| CA-02 | El mismo conjunto tras el descarte | El administrador abre el informe de impacto | El informe se recalculó sobre los tres cambios restantes |
| CA-03 | Un conjunto con un único cambio pendiente | El administrador lo descarta | El conjunto queda vacío y el aviso de cambios pendientes desaparece |
| CA-04 | Un conjunto de cambios pendientes con cuatro cambios | El administrador descarta el conjunto completo | El proyecto SelfHosted vuelve a su configuración aplicada y ningún servicio queda marcado para redespliegue |

## 9. Trazabilidad

| Dimensión | Referencia |
| --- | --- |
| Necesidad de negocio | [NB-06](../../01-Necesidades-Negocio/Necesidades-De-Negocio/NB-06-Cambios-Revisados-Y-Aplicados-En-Lote.md) |
| Reglas de negocio aplicables | RN-12, RN-13, RN-17. |
| Historias de usuario a generar en 06 | US-CU-23-1 (descartar un cambio individual del conjunto), US-CU-23-2 (descartar el conjunto completo), US-CU-23-3 (ver el informe recalculado tras el descarte) |
| Componentes esperados en 05 | Capa `Web`, cajón de cambios pendientes; capa `Application`, módulo de proyectos; capa `Domain`, agregado `Proyectos`; capa `Infrastructure`, `Persistencia`. Referencia tentativa |
| Tests previstos en 08 | Casos a derivar por 08-Calidad-Y-Pruebas. El anexo E-22 no declara casos propios del descarte; el anexo E-5 declara la granularidad del conjunto sobre la que el descarte opera |

Los identificadores de historia de usuario llevan la forma `US-CU-XX-n` y son **provisionales**: la numeración definitiva es potestad de 06-Backlog-Tecnico. La forma se eligió para que ningún identificador emitido acá colisione con la numeración que 06 asigne.

## 10. Notas y supuestos

- El descarte granular es la mitad del deshacer, por declaración explícita de la decisión pre-tomada DA-05. El deshacer y rehacer se apoyan en el conjunto de cambios y no en la librería del lienzo.
- **Brecha declarada:** el intake no declara qué ocurre al descartar un cambio del que dependen otros cambios del mismo conjunto. Destinatario: agente humano del proyecto.
- La presentación del cajón de cambios pendientes pertenece a 03-UX-UI-DX.

## 11. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 2.0 | 2026-07-30 | Migración normativa del conjunto 4.1 al 6.0, fase M4 corte 3, bajo `Rules-Especificacion-Funcional` 4.0, `Vocabulario-Rules` 2.1 y `Migracion-Rules` 1.0. Clasificación **regenerar contenido** por el salto major de la regla que lo gobierna; fuente de contenido: el documento de origen, archivado en `_legacy/2026-07-30/CU-23-Descarte-De-Un-Cambio-Individual-v1.0.md`. Sube **major** porque la nomenclatura anterior deja de cumplir. Cabecera: la etiqueta `Proyecto` pasa a `Producto` sobre el mismo valor, que `Vocabulario-Rules` §3 prohíbe como etiqueta de un plano sobre el valor de otro, y la trazabilidad upstream apunta al `PRODUCT-INTAKE-SelfHosted-Service` renombrado. Sustitución léxica **por ocurrencia** según `Vocabulario-Rules` §9.5 y el plan de migración §3.5, sin ningún reemplazo global de cadena: se revisaron las dos ocurrencias de la cadena `soluci` de este documento y se sustituyeron dos, las dos designando el nivel superior y las dos con su concordancia de género —los dos nombres de actor de §2: «Administrador de la solución» pasa a «Administrador del producto» y «Registro de la solución» a «Registro del producto», las dos con la concordancia corregida—; no hay en este documento ninguna «solución de código» ni ningún uso de prosa de negocio que R2 preserve. Este documento no trae ninguna ocurrencia de «re**soluci**ón», de modo que la trampa de la subcadena no aplicó acá, y así queda registrado. De las ocho ocurrencias de «proyecto», **ninguna pasó a «proyecto de código»**: dos son «proyecto SelfHosted» y cuatro son su forma corta con el contexto ya fijado en la misma sección —«el lienzo del proyecto» de FA-01 y FA-03, y el módulo y el agregado `Proyectos` de §9—, las seis la entidad del dominio; una es el emprendimiento, «agente humano del proyecto» como destinatario de la brecha de §10, y queda a secas; la restante era la etiqueta de cabecera. La clasificación sigue el intake §12, que declara los tres referentes del término, y el glosario del dominio de `Vision-Producto.md` §9. **Glosario**: §2.1 y §4.2.4 de la regla convierten el vocabulario de la categoría en el artefacto propio y obligatorio `Glosario-Funcional.md`, que hasta la 3.0 era el punto 6 de `Modelo-Conceptual.md` y por lo tanto dependía de que el proyecto de código tuviera persistencia. Este caso de uso **no lo emite**: los términos que acuña o precisa y que aparecen en más de un artefacto de 02 se devolvieron al lote que lo emite, por la regla de inclusión de §3.3, y los que ya declara el glosario del dominio de `Vision-Producto.md` §9 se referencian en lugar de redefinirse, por la regla de no duplicación de la misma sección. Las once secciones obligatorias de §4.2 ya estaban completas y no se agregó ni se quitó ninguna; la tabla de contenido de §4.1 y la sección opcional §13 que §4.3 admite para `web-monolith` quedan como estaban. Ningún propósito, actor, precondición, paso del flujo principal, flujo alternativo, excepción, postcondición, criterio de aceptación, regla de negocio aplicable, historia de usuario prevista, componente esperado, test previsto ni brecha declarada cambió de enunciado: la migración es léxica y de forma de cabecera. Las filas históricas de esta tabla **no se reescribieron**, por `SDD-Development-Guide.md` §VI.2 |
| 1.0 | 2026-07-29 | Corrección absorbida dentro de la versión 1.0, sin subirla y sin archivar, por la política de versionado de `Master-Prompt.md` §5: el documento está en estado `Propuesto` y la corrección proviene del audit de su propia fase de emisión. §2 suma la declaración de que los nombres de los actores no humanos son denominaciones acuñadas por esta categoría y no componentes declarados, con la salvedad de los seis que sí trazan a una fuente. Ningún actor cambia de nombre y ningún flujo se altera: lo que se corrige es que la categoría afirmaba que todo dato trazaba y trece de los diecinueve nombres de actor no humano no lo cumplían. Origen: hallazgo H-04 del informe [Audit/B-02-03-r1.md](../../Audit/B-02-03-r1.md) |
| 1.0 | 2026-07-29 | Versión inicial, derivada de la necesidad de negocio upstream y de las secciones del intake citadas en la cabecera |

