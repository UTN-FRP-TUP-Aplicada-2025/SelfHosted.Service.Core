# CU-09 — Exportación en formato estándar de composición

**Proyecto de código:** SelfHosted-Service
**Producto:** SelfHosted Service
**Documento:** CU-09-Exportacion-En-Formato-De-Composicion.md
**Versión:** 2.0
**Estado:** Propuesto
**Fecha:** 2026-07-30
**Autor:** Analista Funcional Senior (AG-02)

**Necesidad de negocio upstream:** [NB-03](../../01-Necesidades-Negocio/Necesidades-De-Negocio/NB-03-Reproducibilidad-De-La-Arquitectura.md)
**Trazabilidad upstream:** PRODUCT-INTAKE §4 capacidad F-13; §5 historia 9; anexo E-14 (el archivo exportado, el archivo de variables y el manifiesto); anexo E-15, endpoint de exportación; E-16 RN-15, RN-23, RN-25; §17.P.11 DA-08

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

Permitir que el administrador exporte la arquitectura completa de un proyecto SelfHosted a un archivo de composición estándar, con los secretos vacíos, para llevársela a otro servidor sin filtrar credenciales y para que la reconstrucción deje de depender de la memoria del operador.

## 2. Actores

| Actor | Tipo | Rol |
| --- | --- | --- |
| Administrador del producto | Primario | Solicita la exportación del proyecto SelfHosted |
| Módulo de exportación | Sistema | Resuelve las referencias, aplana las variables compartidas, escapa los literales y emite el archivo y su archivo de variables |

Los nombres de los actores no humanos son **denominaciones acuñadas por esta categoría**, salvo los seis que trazan a una fuente: `Motor de contenedores`, `Destino externo`, `Automatismo de integración continua`, `Sincronizador de estado`, `Módulo de descubrimiento` y `Resolutor de referencias`. Los acuñados no son componentes declarados y no condicionan la descomposición: su correspondencia con los módulos que el intake §17.P.2 sí declara la fija 05-Arquitectura-Tecnica. La convención completa, nombre por nombre, está en [Especificacion-Funcional.md](../Especificacion-Funcional.md) §8.

## 3. Precondiciones

- Existe el proyecto SelfHosted con al menos un servicio declarado (CU-01, CU-03).
- El administrador tiene sesión iniciada (CU-30).

## 4. Flujo principal

1. El administrador solicita exportar el proyecto SelfHosted al formato estándar de composición.
2. El sistema recorre los servicios del proyecto con su configuración vigente, que es la aplicada y no la del conjunto de cambios pendientes.
3. El sistema resuelve cada referencia a su valor y aplana las variables compartidas del proyecto en cada servicio que las usa.
4. Para cada valor secreto, el sistema emite un marcador de variable en lugar del valor y agrega su entrada vacía en el archivo de variables (RN-15, RN-23, RN-25).
5. El sistema escapa todo signo de expansión que forme parte de un valor literal, para que la herramienta de composición lo entregue tal cual (RN-25).
6. El sistema emite el archivo de composición y el archivo de variables que lo acompaña.
7. El sistema entrega los dos archivos al administrador.

## 5. Flujos alternativos

**FA-01 — Exportación acompañada del manifiesto propio.**
Disparador: el administrador quiere preservar además la disposición del lienzo, el nivel de variable compartida y las expresiones sin resolver.
Pasos: se genera además el manifiesto propio. Ver CU-10.
Punto de retorno: paso 7.

**FA-02 — Proyecto SelfHosted sin secretos.**
Disparador: ningún valor del proyecto es secreto.
Pasos: el archivo de variables se emite igualmente, vacío de entradas de secreto.
Punto de retorno: paso 7.

## 6. Excepciones y errores

| Código | Causa | Respuesta del sistema |
| --- | --- | --- |
| Referencia no resoluble | Una referencia del proyecto SelfHosted no resuelve a ninguna variable de ámbito válido | El sistema declara la causa y no emite un archivo con la expresión sin resolver, porque la exportación nunca emite una expresión del modelo (RN-25). El código concreto no está declarado para la exportación; rige la política general de CL-05 |
| Secreto suprimido | Se omite la entrada de un secreto en lugar de emitirla vacía | Es el defecto que el anexo E-14 declara inaceptable: un secreto suprimido produce un proyecto que levanta sin la variable y falla en ejecución. El archivo debe emitir el marcador con su entrada vacía |

## 7. Postcondiciones

**En caso de éxito:** existen el archivo de composición y su archivo de variables; ningún valor secreto aparece en ninguno de los dos; ningún archivo contiene una expresión propia del modelo sin escapar; el archivo levanta en otra instalación.

**En caso de fallo:** no se entrega ningún archivo parcial y el proyecto SelfHosted no se modifica: la exportación es de sólo lectura sobre el registro.

## 8. Criterios de aceptación

| ID | Given | When | Then |
| --- | --- | --- | --- |
| CA-01 | El proyecto SelfHosted 12, con seis referencias, secretas y no secretas, dos de ellas sosteniendo aristas | El administrador exporta al formato de composición | El archivo no contiene ninguna ocurrencia de la expresión propia del modelo; las no secretas viajan con su valor resuelto y la secreta viaja como marcador con la entrada vacía en el archivo de variables |
| CA-02 | Un proyecto SelfHosted con una variable secreta | El administrador exporta | El valor de la variable secreta no aparece en ningún archivo de la exportación |
| CA-03 | Un servicio con una variable cuyo valor literal contiene un signo de expansión | El administrador exporta | Todo signo de expansión literal viaja duplicado, el archivo levanta y la herramienta de composición entrega el valor sin interpolarlo |
| CA-04 | El proyecto SelfHosted 12 con el conjunto de cambios 331 pendiente, que cambiaría la variable compartida de zona horaria | El administrador exporta antes de aplicar | El archivo exporta el valor aplicado y no el del borrador |

## 9. Trazabilidad

| Dimensión | Referencia |
| --- | --- |
| Necesidad de negocio | [NB-03](../../01-Necesidades-Negocio/Necesidades-De-Negocio/NB-03-Reproducibilidad-De-La-Arquitectura.md) |
| Reglas de negocio aplicables | RN-15, RN-23, RN-25. Reglas conceptuales: RC-16 |
| Historias de usuario a generar en 06 | US-CU-09-1 (exportar el proyecto SelfHosted al formato estándar de composición), US-CU-09-2 (obtener el archivo de variables con los secretos vacíos), US-CU-09-3 (conservar los literales con signo de expansión al exportar) |
| Componentes esperados en 05 | Capa `Web`, controlador del recurso de exportación; capa `Application`, módulo de proyectos; capa `Infrastructure`, `Exportacion`. Referencia tentativa |
| Tests previstos en 08 | T-18 (secreto en la exportación); T-39 (las seis referencias del proyecto 12); T-47 (escape del signo de expansión); T-30 (ida y vuelta con la importación) |

Los identificadores de historia de usuario llevan la forma `US-CU-XX-n` y son **provisionales**: la numeración definitiva es potestad de 06-Backlog-Tecnico. La forma se eligió para que ningún identificador emitido acá colisione con la numeración que 06 asigne.

## 10. Notas y supuestos

- RN-25 lleva marcador `[D-i]` completo y sigue sin revisar; se consume declarándola revisable.
- El archivo exportado debe ser autosuficiente sin el manifiesto propio: con el manifiesto se recuperan además la disposición del lienzo, el nivel de variable compartida y la intención de cada referencia.
- La exportación es la mitigación declarada del riesgo RG-07, servidor sin redundancia de disco, y la decisión pre-tomada DA-08.
- El destino externo concreto del respaldo no está declarado y el intake lo deja abierto. Ver CU-12.

## 11. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 2.0 | 2026-07-30 | Migración normativa del conjunto 4.1 al 6.0, fase M4 corte 3, bajo `Rules-Especificacion-Funcional` 4.0, `Vocabulario-Rules` 2.1 y `Migracion-Rules` 1.0. Clasificación **regenerar contenido** por el salto major de la regla que lo gobierna; fuente de contenido: **el documento de origen**, archivado sin modificar en `_legacy/2026-07-30/CU-09-Exportacion-En-Formato-De-Composicion-v1.0.md`. Sube **major** porque la nomenclatura anterior deja de cumplir. **Cabecera:** la etiqueta `Proyecto` pasa a `Producto` sobre el mismo valor, porque `Vocabulario-Rules` §3 prohíbe la etiqueta de un plano de identidad sobre el valor de otro; se suma el campo `Proyecto de código` con el valor `SelfHosted-Service`, que §4.1 de la regla 4.0 exige por ser ésta una categoría de nivel proyecto de código (§4 R3) y que el PRODUCT-INTAKE §13 declara como `Nombre-Proyecto-Codigo`; la trazabilidad upstream cita el `PRODUCT-INTAKE` renombrado, antes `SOLUTION-INTAKE`. **Sustitución léxica por ocurrencia** según `Vocabulario-Rules` §9.5 y el plan de migración §3.5, y nunca por reemplazo global de cadena: la única ocurrencia de «solución» designaba el nivel superior y pasa a «producto» con su concordancia de género —«Administrador de la solución» a «Administrador del producto»—; no hay ninguna «solución de código» ni ninguna ocurrencia de la cadena `resoluci` en este documento, verificado por barrido. Las dieciocho ocurrencias de «proyecto» se clasificaron una por una y **ninguna pasó a «proyecto de código»**: once llevan la forma calificada «proyecto SelfHosted»; seis son la misma entidad del dominio en forma corta, admitida por el PRODUCT-INTAKE §12 donde el contexto ya fijó el sentido, y una era la etiqueta de cabecera. **Ningún propósito, actor, precondición, paso de flujo, flujo alternativo, excepción, postcondición, criterio de aceptación, referencia de trazabilidad, nota ni brecha cambió de contenido**: la migración es léxica y de forma de cabecera, y las filas anteriores de este control de cambios no se reescribieron. Origen: [Plan-Migracion-4.1-a-6.0.md](../../Audit/Plan-Migracion-4.1-a-6.0.md) §3.5 y §4 |
| 1.0 | 2026-07-29 | Corrección absorbida dentro de la versión 1.0, sin subirla y sin archivar, por la política de versionado de `Master-Prompt.md` §5: el documento está en estado `Propuesto` y la corrección proviene del audit de su propia fase de emisión. §2 suma la declaración de que los nombres de los actores no humanos son denominaciones acuñadas por esta categoría y no componentes declarados, con la salvedad de los seis que sí trazan a una fuente. Ningún actor cambia de nombre y ningún flujo se altera: lo que se corrige es que la categoría afirmaba que todo dato trazaba y trece de los diecinueve nombres de actor no humano no lo cumplían. Origen: hallazgo H-04 del informe [Audit/B-02-03-r1.md](../../Audit/B-02-03-r1.md) |
| 1.0 | 2026-07-29 | Versión inicial, derivada de la necesidad de negocio upstream y de las secciones del intake citadas en la cabecera |

