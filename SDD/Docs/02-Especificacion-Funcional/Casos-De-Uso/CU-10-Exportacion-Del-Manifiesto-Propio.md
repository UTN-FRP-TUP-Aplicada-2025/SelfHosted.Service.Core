# CU-10 — Exportación del manifiesto propio, que preserva la disposición

**Proyecto de código:** SelfHosted-Service
**Producto:** SelfHosted Service
**Documento:** CU-10-Exportacion-Del-Manifiesto-Propio.md
**Versión:** 2.0
**Estado:** Propuesto
**Fecha:** 2026-07-30
**Autor:** Analista Funcional Senior (AG-02)

**Necesidad de negocio upstream:** [NB-03](../../01-Necesidades-Negocio/Necesidades-De-Negocio/NB-03-Reproducibilidad-De-La-Arquitectura.md)
**Trazabilidad upstream:** PRODUCT-INTAKE §4 capacidad F-13; anexo E-14 (el manifiesto propio y qué preserva); anexo E-1 (la disposición del lienzo); anexo E-4 (la forma legible frente a la forma vinculada); E-16 RN-15, RN-25

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

Permitir que el administrador exporte, junto al archivo de composición, el manifiesto propio del proyecto SelfHosted, que preserva lo que el formato estándar no representa: la disposición del lienzo, el nivel de variable compartida y las expresiones de referencia sin resolver.

## 2. Actores

| Actor | Tipo | Rol |
| --- | --- | --- |
| Administrador del producto | Primario | Solicita el manifiesto propio del proyecto SelfHosted |
| Módulo de exportación | Sistema | Emite el manifiesto con su versión de formato, preservando disposición, nivel de compartida y expresiones sin resolver |

Los nombres de los actores no humanos son **denominaciones acuñadas por esta categoría**, salvo los seis que trazan a una fuente: `Motor de contenedores`, `Destino externo`, `Automatismo de integración continua`, `Sincronizador de estado`, `Módulo de descubrimiento` y `Resolutor de referencias`. Los acuñados no son componentes declarados y no condicionan la descomposición: su correspondencia con los módulos que el intake §17.P.2 sí declara la fija 05-Arquitectura-Tecnica. La convención completa, nombre por nombre, está en [Especificacion-Funcional.md](../Especificacion-Funcional.md) §8.

## 3. Precondiciones

- Existe el proyecto SelfHosted con su disposición de lienzo guardada (CU-01, CU-05).
- El administrador tiene sesión iniciada (CU-30).

## 4. Flujo principal

1. El administrador solicita la exportación del proyecto SelfHosted.
2. El sistema emite el archivo de composición, según CU-09.
3. El sistema emite además el manifiesto propio con su versión de formato declarada.
4. El manifiesto preserva la disposición del lienzo de cada nodo.
5. El manifiesto preserva el nivel de variable compartida del proyecto, que el formato estándar aplana dentro de cada servicio.
6. El manifiesto preserva las expresiones de referencia sin resolver, en su forma legible y portable a otra instalación.
7. El manifiesto preserva el carácter de secreto de cada variable, sin su valor (RN-15).
8. El sistema entrega el manifiesto junto a los demás archivos de la exportación.

## 5. Flujos alternativos

**FA-01 — Manifiesto de una versión de formato anterior.**
Disparador: se lee un manifiesto emitido con una versión de formato previa.
Pasos: sigue siendo importable, leyéndose como un proyecto SelfHosted sin variables compartidas ni referencias.
Punto de retorno: CU-11.

**FA-02 — Proyecto SelfHosted sin referencias.**
Disparador: ninguna variable del proyecto contiene una referencia.
Pasos: el manifiesto se emite igualmente, con la disposición y el nivel de compartida, y sin expresiones que preservar.
Punto de retorno: paso 8.

## 6. Excepciones y errores

| Código | Causa | Respuesta del sistema |
| --- | --- | --- |
| Expresión no preservada | Una expresión sin resolver no se escribe en el manifiesto | El literal que rodea a la referencia no podría reconstruirse desde las aristas, que sólo guardan pares de claves. El manifiesto debe llevar todas las expresiones sin resolver |
| Secreto en el manifiesto | Un valor secreto se escribe en el manifiesto | Prohibido: el manifiesto preserva el carácter de secreto, nunca su valor (RN-15) |

## 7. Postcondiciones

**En caso de éxito:** existe el manifiesto propio con su versión de formato; la disposición del lienzo, el nivel de variable compartida y las expresiones sin resolver quedan preservados; ningún valor secreto aparece en él.

**En caso de fallo:** no se entrega ningún manifiesto parcial; el archivo de composición sigue siendo autosuficiente por sí solo.

## 8. Criterios de aceptación

| ID | Given | When | Then |
| --- | --- | --- | --- |
| CA-01 | El proyecto SelfHosted 12, con seis referencias y una disposición de lienzo guardada | El administrador exporta el proyecto | El manifiesto propio lleva las seis expresiones sin resolver y la posición de cada nodo |
| CA-02 | El mismo proyecto, con la variable compartida `DB_PASSWORD` marcada como secreta | El administrador exporta | El manifiesto declara que la variable es compartida y secreta, y no contiene su valor |
| CA-03 | Un manifiesto emitido con la versión de formato anterior | El administrador lo importa | El manifiesto sigue siendo importable y se lee como un proyecto sin variables compartidas ni referencias |
| CA-04 | El proyecto SelfHosted 12 con dos referencias que sostienen aristas | El administrador exporta y vuelve a importar | La intención de cada referencia se recupera desde el manifiesto, incluida la parte literal que rodea a la expresión |

## 9. Trazabilidad

| Dimensión | Referencia |
| --- | --- |
| Necesidad de negocio | [NB-03](../../01-Necesidades-Negocio/Necesidades-De-Negocio/NB-03-Reproducibilidad-De-La-Arquitectura.md) |
| Reglas de negocio aplicables | RN-15, RN-23, RN-25. Reglas conceptuales: RC-16, RC-17 |
| Historias de usuario a generar en 06 | US-CU-10-1 (exportar el manifiesto propio junto al archivo de composición), US-CU-10-2 (preservar la disposición del lienzo en el manifiesto), US-CU-10-3 (preservar las expresiones sin resolver y el nivel de compartida) |
| Componentes esperados en 05 | Capa `Web`, controlador del recurso de exportación; capa `Application`, módulo de proyectos; capa `Infrastructure`, `Exportacion`. Referencia tentativa |
| Tests previstos en 08 | T-39 (el manifiesto con las seis expresiones sin resolver); T-30 (ida y vuelta); T-18 (ausencia de secretos) |

Los identificadores de historia de usuario llevan la forma `US-CU-XX-n` y son **provisionales**: la numeración definitiva es potestad de 06-Backlog-Tecnico. La forma se eligió para que ningún identificador emitido acá colisione con la numeración que 06 asigne.

## 10. Notas y supuestos

- La expresión se preserva en el manifiesto en su forma legible, sin el marcador del vínculo interno, porque el manifiesto tiene que ser portable a otra instalación.
- El archivo de composición debe seguir siendo autosuficiente sin el manifiesto: el manifiesto agrega, no reemplaza.
- RN-25 lleva marcador `[D-i]` completo y sigue sin revisar; se consume declarándola revisable.

## 11. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 2.0 | 2026-07-30 | Migración normativa del conjunto 4.1 al 6.0, fase M4 corte 3, bajo `Rules-Especificacion-Funcional` 4.0, `Vocabulario-Rules` 2.1 y `Migracion-Rules` 1.0. Clasificación **regenerar contenido** por el salto major de la regla que lo gobierna; fuente de contenido: **el documento de origen**, archivado sin modificar en `_legacy/2026-07-30/CU-10-Exportacion-Del-Manifiesto-Propio-v1.0.md`. Sube **major** porque la nomenclatura anterior deja de cumplir. **Cabecera:** la etiqueta `Proyecto` pasa a `Producto` sobre el mismo valor, porque `Vocabulario-Rules` §3 prohíbe la etiqueta de un plano de identidad sobre el valor de otro; se suma el campo `Proyecto de código` con el valor `SelfHosted-Service`, que §4.1 de la regla 4.0 exige por ser ésta una categoría de nivel proyecto de código (§4 R3) y que el PRODUCT-INTAKE §13 declara como `Nombre-Proyecto-Codigo`; la trazabilidad upstream cita el `PRODUCT-INTAKE` renombrado, antes `SOLUTION-INTAKE`. **Sustitución léxica por ocurrencia** según `Vocabulario-Rules` §9.5 y el plan de migración §3.5, y nunca por reemplazo global de cadena: la única ocurrencia de «solución» designaba el nivel superior y pasa a «producto» con su concordancia de género —«Administrador de la solución» a «Administrador del producto»—; no hay ninguna «solución de código» ni ninguna ocurrencia de la cadena `resoluci` en este documento, verificado por barrido. Las quince ocurrencias de «proyecto» se clasificaron una por una y **ninguna pasó a «proyecto de código»**: ocho llevan la forma calificada «proyecto SelfHosted»; seis son la misma entidad del dominio en forma corta, admitida por el PRODUCT-INTAKE §12 donde el contexto ya fijó el sentido, y una era la etiqueta de cabecera. **Ningún propósito, actor, precondición, paso de flujo, flujo alternativo, excepción, postcondición, criterio de aceptación, referencia de trazabilidad, nota ni brecha cambió de contenido**: la migración es léxica y de forma de cabecera, y las filas anteriores de este control de cambios no se reescribieron. Origen: [Plan-Migracion-4.1-a-6.0.md](../../Audit/Plan-Migracion-4.1-a-6.0.md) §3.5 y §4 |
| 1.0 | 2026-07-29 | Corrección absorbida dentro de la versión 1.0, sin subirla y sin archivar, por la política de versionado de `Master-Prompt.md` §5: el documento está en estado `Propuesto` y la corrección proviene del audit de su propia fase de emisión. §2 suma la declaración de que los nombres de los actores no humanos son denominaciones acuñadas por esta categoría y no componentes declarados, con la salvedad de los seis que sí trazan a una fuente. Ningún actor cambia de nombre y ningún flujo se altera: lo que se corrige es que la categoría afirmaba que todo dato trazaba y trece de los diecinueve nombres de actor no humano no lo cumplían. Origen: hallazgo H-04 del informe [Audit/B-02-03-r1.md](../../Audit/B-02-03-r1.md) |
| 1.0 | 2026-07-29 | Versión inicial, derivada de la necesidad de negocio upstream y de las secciones del intake citadas en la cabecera |

