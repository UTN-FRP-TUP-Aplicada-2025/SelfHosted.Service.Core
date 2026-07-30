# Orden de trabajo · corregir el gobierno del glosario y el criterio de desambiguación en el Framework SDD

**Documento:** `Fix-Ejecución-Glosario-Framework.md`
**Versión:** 1.0
**Estado:** Propuesto — orden de trabajo para ejecutar sobre `IA.SDD` en una sesión limpia
**Fecha:** 2026-07-29
**Autor:** Orquestador SDD, desde la corrida de la solución SelfHosted Service
**Repositorio a modificar:** `IA/IA.SDD` — el repositorio fuente del framework, que el orquestador de una solución nunca toca
**Repositorio de origen de la evidencia:** `DEV/SelfHosted.Service.Core`

> **Cómo usar este documento.** Es una orden de trabajo autocontenida. No requiere leer la conversación en que se produjo ni el resto de los documentos de `SDD/Estado/`. Cada afirmación sobre el estado del framework cita archivo y sección, y fue verificada contra el árbol de `IA.SDD` el 2026-07-29 con el conjunto normativo **4.1** vigente. Las secciones §2 y §3 son el diagnóstico; §4 y §5 son lo que hay que cambiar y dónde; §6 es cómo verificar que quedó bien.

## Tabla de contenido

- [1. Resumen en cinco líneas](#1-resumen-en-cinco-líneas)
- [2. Defecto A · el criterio de desambiguación no existe como regla](#2-defecto-a--el-criterio-de-desambiguación-no-existe-como-regla)
- [3. Defecto B · el glosario de una categoría no está gobernado](#3-defecto-b--el-glosario-de-una-categoría-no-está-gobernado)
- [4. Ejemplo verificado, con su cadena causal](#4-ejemplo-verificado-con-su-cadena-causal)
- [5. Solución propuesta, archivo por archivo](#5-solución-propuesta-archivo-por-archivo)
- [6. Cómo verificar que quedó corregido](#6-cómo-verificar-que-quedó-corregido)
- [7. Lo que este informe deliberadamente no propone](#7-lo-que-este-informe-deliberadamente-no-propone)
- [Control de cambios](#control-de-cambios)

---

## 1. Resumen en cinco líneas

Son **dos defectos independientes** que se combinan para producir un mismo síntoma: alertas de ambigüedad léxica que son falsos positivos, y términos acuñados por una categoría que no tienen dónde declararse.

1. **Defecto A.** El framework no tiene ninguna regla que diga **cuándo un término polisémico necesita desambiguarse y cuándo no**. El criterio correcto existe, pero vive dentro del intake de una solución particular, como hallazgo local.
2. **Defecto B.** El glosario de la categoría 02 es **sección de un documento condicional** y **ningún criterio de aceptación lo verifica**, de modo que su existencia depende de un flag y su contenido no se controla.
3. El síntoma combinado: un agente que lee documentación parcial no tiene dónde resolver una referencia ambigua, y un agente que revisa vocabulario no tiene criterio para decidir si una polisemia es un defecto o es lenguaje normal.
4. Ambos se corrigen con cambios acotados: una subsección nueva en `Master-Prompt.md` §5, tres líneas en `Rules-Especificacion-Funcional.md`, y un criterio de aceptación en cada una de las trece reglas de categoría.
5. Ninguna invariante D1-D9 se modifica, y **ninguna documentación ya emitida deja de cumplir**: los cambios agregan gobierno donde no había, no reclasifican lo existente.

---

## 2. Defecto A · el criterio de desambiguación no existe como regla

### 2.1 Qué hay hoy

El framework toca el tema del glosario en tres lugares, y **ninguno da un criterio**:

| Dónde | Qué dice | Qué no dice |
|---|---|---|
| `Master-Prompt.md` §10, criterios del audit | «Coherencia cross-doc dentro de la fase (referencias entre archivos resuelven, IDs no duplicados, **glosario sin contradicciones**)» | Verifica que un glosario no se contradiga. No dice cuándo un término **debe** entrar al glosario |
| `Master-Prompt.md` §10, estructura del informe, punto 5 | «Coherencia cross-doc (trazabilidad declarada, IDs no duplicados, **glosarios sin contradicciones**)» | Lo mismo |
| `Master-Prompt.md` §15 | Glosario operativo **del propio framework** | No es el glosario de una solución ni gobierna cómo se construye |

`Rules-UX-UI-DX.md` es la **única** de las trece reglas de categoría que gobierna su glosario de verdad, y lo hace bien. Sirve como modelo a replicar:

- §2.1 lo declara como artefacto propio: `Glosario-UX.md`.
- §3.3 fija la regla de inclusión: *«todo término que aparezca en más de un artefacto de 03 debe estar en `glosario-ux`»*.
- §3.3 fija la regla de no duplicación: *«Si un término ya está en el glosario de 02 con la misma semántica, se referencia»*.
- §5 lo incorpora a las preguntas guía y §6 a los criterios de aceptación verificables.

### 2.2 Dónde vive el criterio que falta

En la solución SelfHosted Service, el intake resolvió por su cuenta la desambiguación del término «proyecto», que tenía tres sentidos. Y al hacerlo **enunció el criterio correcto**, en su §12:

> Se decidió **no calificarlo** porque los tres contextos son disjuntos y ninguna confusión real es posible: nadie lee «los objetivos del proyecto» pensando en un conjunto de contenedores ni en una unidad de compilación. Una tercera forma larga **cargaría el texto sin resolver un problema que no existe**.

Ese es el criterio: **se desambigua cuando los contextos colisionan; no se desambigua cuando son disjuntos, porque hacerlo empeora el texto sin resolver nada.**

El problema es que ese enunciado es un hallazgo de **una solución**, no una regla del framework. Vive en `SDD/Intake/` de un repositorio destino. Ningún archivo de `IA.SDD` lo declara, de modo que:

- Un orquestador que adopte una invariante de desambiguación propia de la solución —cosa que `Master-Prompt.md` §5 habilita explícitamente— hereda **la forma** del patrón sin **el criterio**.
- Un auditor que verifique «glosario sin contradicciones» no tiene con qué decidir si una polisemia detectada es un defecto o es lenguaje natural funcionando.

### 2.3 El modo de falla concreto

Una vez que una solución declara una invariante de desambiguación para un término, el patrón queda **primado**: enumerar sentidos, declarar prohibición de fusión. Aplicado a un segundo término sin verificar si sus contextos colisionan, produce:

- **Falsos positivos reportados como defectos.** Un revisor levanta una alerta sobre una polisemia que el contexto resuelve solo.
- **Presión a cargar el texto.** La corrección «natural» de un falso positivo es calificar todas las ocurrencias, que es exactamente lo que el criterio de §12 declara contraproducente.

---

## 3. Defecto B · el glosario de una categoría no está gobernado

### 3.1 El glosario de 02 es sección de un documento condicional

`Rules-Especificacion-Funcional.md` ubica el glosario en **§4.2.2, punto 6**, como sección obligatoria del modelo conceptual:

> 6. Glosario. Términos del dominio reutilizados por toda la categoría 02.

Pero el modelo conceptual **es condicional**. Su propia §2.1 lo declara:

> `Modelo-Datos/Modelo-Conceptual.md` — Obligatorio para: proyectos de código con persistencia (web-monolith, web-microservices, rest-api, worker-service, mobile-app-maui)

Consecuencia estructural: **para un `library` o un `cli-tool` sin persistencia, la categoría 02 no tiene glosario en absoluto** — aunque acuñe igual sus cinco casos de uso mínimos, sus reglas de negocio y su vocabulario. El glosario de la categoría que más términos introduce depende de un flag que no tiene nada que ver con el vocabulario.

### 3.2 Ningún criterio de aceptación lo verifica

La palabra «glosario» aparece **una sola vez** en todo `Rules-Especificacion-Funcional.md`: en la línea 178, que es el punto 6 de §4.2.2.

Su §6, los criterios de aceptación del entregable —que es lo que el auditor independiente aplica—, **no lo menciona**. Verificado: cero ocurrencias de «glosario» en §6.

De modo que hoy, para la categoría 02:

- No hay criterio de inclusión: nada dice qué términos entran.
- No hay verificación de existencia: el audit no comprueba que la sección esté.
- No hay verificación de completitud: el audit no comprueba que los términos acuñados por la categoría estén declarados.

### 3.3 Alcance del defecto en las trece reglas

Verificado sobre `SDD/Devs/Rules/` con el conjunto 4.1:

| Regla de categoría | Menciones de «glosario» | ¿Lo exige como artefacto? |
|---|---|---|
| `Rules-UX-UI-DX.md` | 8 | **Sí**, y lo gobierna completo |
| `Rules-Documentacion.md` | 9 | No |
| `Rules-Contexto.md` | 6 | No |
| `Root-Rules.md` | 4 | No |
| `Rules-Especificacion-Funcional.md` | 1 | No |
| `Rules-Arquitectura-Tecnica.md`, `Rules-Backlog-Tecnico.md`, `Rules-Calidad-Y-Pruebas.md`, `Rules-Devops.md`, `Rules-Examples.md`, `Rules-Necesidades-Negocio.md`, `Rules-Plan-Sprint.md`, `Rules-Prompts-AI.md` | 0 | No |

Ocho de las trece reglas **no mencionan el glosario ni una vez**. `Rules-Contexto.md` lo pide como sección de `Vision-Producto` y sí lo verifica en §6 con un mínimo numérico de términos, que es el segundo caso mejor gobernado después de 03.

---

## 4. Ejemplo verificado, con su cadena causal

El ejemplo es real, de la corrida de SelfHosted Service, y sirve para probar los dos defectos a la vez.

### 4.1 El dato

En la categoría 02 de esa solución —36 casos de uso, 37 reglas de negocio, 18 reglas conceptuales, 94 archivos— el término **«registro»** se usa con tres referentes distintos:

| Forma | Referente | Dónde |
|---|---|---|
| «imagen de **registro**» | El servidor de imágenes de contenedor | `CU-13` |
| «**registro** del contenedor» | La salida de log del contenedor | `CU-14` |
| «higiene del **registro**» | El estado persistido del sistema | `CU-36` |
| «**registro** de auditoría» | La bitácora de operaciones | `RN-17` |

Y además aparece **14 veces sin calificador**, con al menos tres referentes distintos según el documento: el estado persistido en `CU-01`, `CU-02`, `CU-11`, `CU-20` y `CU-26`; la bitácora de auditoría en `RN-17` y `CU-31`; la salida del contenedor en `CU-14`.

El glosario de esa categoría existe —25 términos, en `Modelo-Conceptual.md` §6— y **«registro» no está en él**.

### 4.2 Por qué las formas calificadas no son el defecto

Éste es el punto que el Defecto A hace difícil de ver, y conviene dejarlo escrito: **«imagen de registro» y «registro del contenedor» no producen ninguna ambigüedad.** El modificador las distingue, los contextos son disjuntos, y ningún lector se confunde. Reportarlas como defecto es un falso positivo, y «corregirlas» calificando todas las ocurrencias empeoraría el texto.

Es exactamente el caso que el criterio de §12 —el que el framework no tiene— resuelve en una línea.

### 4.3 Por qué el «registro» a secas sí es el defecto, y cuál es el mecanismo

El mecanismo no es de lenguaje: es **cómo el framework consume su propia documentación**.

`Master-Prompt.md` §8 construye cada despacho de subagente con una lista de paths upstream. En la práctica el subagente **lee por secciones, no de corrido**: es lo que el propio orquestador le indica cuando el corpus es grande. Un lector humano abre el documento entero y el contexto le resuelve la referencia; un subagente que recibió tres secciones de setenta, no.

El escenario concreto, verificable en esa solución: en la Fase C, AG-05 tiene que derivar una decisión de arquitectura sobre transaccionalidad. Lee las secciones «en caso de fallo» de `CU-01` y `CU-20`, que son las que hablan de rollback. Encuentra:

> el registro queda en el estado previo

Y tiene que decidir si «el registro» es toda la base de datos, la tabla de auditoría, o el conjunto de tablas que ese caso de uso toca. **Las tres lecturas producen decisiones de arquitectura distintas**, y ninguna sección que recibió le permite elegir.

### 4.4 La cadena causal completa

| Paso | Qué ocurre | Defecto que lo habilita |
|---|---|---|
| 1 | La categoría 02 acuña vocabulario nuevo: entidades, actores, conceptos del modelo | — |
| 2 | Su glosario existe sólo si el proyecto tiene persistencia, y nada dice qué términos incluir | **B** |
| 3 | Un término polisémico queda fuera del glosario sin que nadie lo note | **B** |
| 4 | El audit verifica «glosario sin contradicciones», que un glosario incompleto cumple trivialmente | **B** |
| 5 | Un revisor detecta la polisemia y no tiene criterio para separar el caso real del falso positivo | **A** |
| 6 | Reporta las formas calificadas, que están bien, y propone cargar el texto | **A** |
| 7 | El caso real —el término a secas leído fuera de contexto por un subagente— queda sin corregir | **A** y **B** |

---

## 5. Solución propuesta, archivo por archivo

Cuatro intervenciones. Las dos primeras corrigen el Defecto A, las dos últimas el Defecto B. Ninguna modifica una invariante D1-D9.

### 5.1 `SDD/Devs/Orchestrator/Master-Prompt.md` §5 — subsección nueva

Agregar una subsección **§5.2, «Criterio de desambiguación léxica»**, después de §5.1. Contenido a declarar:

- **La regla de decisión.** Un término polisémico se desambigua **sólo cuando sus sentidos pueden aparecer en el mismo contexto de lectura**. Cuando los contextos son disjuntos, no se califica: hacerlo carga el texto sin resolver un problema que no existe.
- **Qué cuenta como «mismo contexto de lectura»**, y acá está la parte que el framework necesita declarar explícitamente porque es propia de cómo trabaja: **el contexto de lectura de un subagente es la sección, no el documento**. Un término cuyos sentidos se distinguen sólo leyendo el documento completo **sí** colisiona, porque el despacho de §8 entrega secciones.
- **La forma de la desambiguación, por orden de costo creciente**: entrada de glosario que declare los referentes; forma calificada obligatoria en las ocurrencias que colisionan; invariante de solución con prohibición de fusión. Se usa la más barata que resuelva el caso, y se declara por qué las anteriores no alcanzaban.
- **La prohibición explícita:** no se declara una invariante de desambiguación sin haber verificado que los contextos colisionan. Enumerar los sentidos de un término cuyos contextos son disjuntos es un falso positivo, y la corrección que induce —calificar todas las ocurrencias— es un defecto.

### 5.2 `SDD/Devs/Orchestrator/Master-Prompt.md` §10 — precisar el criterio del audit

Donde hoy dice «glosario sin contradicciones», agregar los dos criterios que faltan:

- **Completitud**: todo término que la fase acuña y que aparece en más de un artefacto está en el glosario de su categoría.
- **Polisemia gobernada**: todo término con más de un referente en la fase tiene entrada de glosario que los declara, o forma calificada en todas sus ocurrencias.

Y agregar el criterio negativo, que es el que evita el falso positivo: **una polisemia con contextos disjuntos no es hallazgo**, y reportarla como tal es un defecto del informe de auditoría.

### 5.3 `SDD/Devs/Rules/Rules-Especificacion-Funcional.md` — sacar el glosario del documento condicional

Tres cambios, todos acotados:

| Sección | Cambio |
|---|---|
| §2.1, tabla maestra | Agregar `Glosario-Funcional.md` como artefacto propio de la categoría, **obligatorio para los 8 tipos D8**, con el patrón de `Rules-UX-UI-DX.md` §2.1 como modelo |
| §4.2.2, punto 6 | El glosario deja de ser sección del modelo conceptual y pasa a ser referencia al artefacto nuevo. El modelo conceptual sigue siendo condicional; el glosario deja de serlo |
| §3.3 y §6 | Incorporar la regla de inclusión —todo término que aparezca en más de un artefacto de 02— y su criterio de aceptación verificable, replicando lo que `Rules-UX-UI-DX.md` §3.3 y §6 ya hacen bien |

### 5.4 Las trece reglas de categoría — criterio de aceptación uniforme

Agregar a §6 de cada regla de categoría un criterio con esta forma, adaptado al nombre de su glosario:

> - [ ] Todo término que esta categoría acuña y que aparece en más de un artefacto está declarado en su glosario, con sus referentes cuando tiene más de uno. Ninguna polisemia con contextos disjuntos se reporta como defecto.

Prioridad, porque no las trece pesan igual:

1. `Rules-Especificacion-Funcional.md` — es la que más vocabulario acuña y la que alimenta a las siete siguientes.
2. `Rules-Arquitectura-Tecnica.md` — consume el vocabulario de 02 y acuña el suyo, y hoy no menciona el glosario ni una vez.
3. Las once restantes, con `Rules-UX-UI-DX.md` sin cambios porque ya cumple.

---

## 6. Cómo verificar que quedó corregido

Cuatro comprobaciones, todas ejecutables sobre `IA.SDD` sin generar ninguna solución:

1. **§5.2 existe y declara el criterio de contexto de sección.** Buscar en `Master-Prompt.md` la frase que declara que el contexto de lectura de un subagente es la sección y no el documento. Sin eso, el criterio queda a medias: descarta falsos positivos pero no detecta el caso real.
2. **§10 tiene los tres criterios**: completitud, polisemia gobernada y el criterio negativo del falso positivo.
3. **`Rules-Especificacion-Funcional.md` declara su glosario como artefacto** en §2.1, obligatorio para los ocho tipos D8, y su §6 lo verifica. `grep -c glosario` sobre ese archivo debe pasar de 1 a al menos 4.
4. **Las trece reglas tienen el criterio de §6.** Hoy ocho de trece no mencionan «glosario» ni una vez; después de la corrección, ninguna debería estar en cero.

Prueba de regresión sugerida, si se quiere validar con una corrida real: generar la categoría 02 de una solución de tipo `library` o `cli-tool` —sin persistencia— y comprobar que **emite glosario**. Hoy no lo emitiría, porque su único glosario vive en un documento que ese tipo no genera.

---

## 7. Lo que este informe deliberadamente no propone

Tres cosas que quedaron afuera, con su motivo, para que quien ejecute no crea que son omisiones:

- **No propone una invariante D10.** El criterio de desambiguación es una regla operativa del orquestador, no una invariante del template. Las invariantes D1-D9 no se tocan.
- **No propone tocar `SDD/Devs/Bootstrap/`.** Por la regla del propio framework de que un registro que se corrige después deja de ser un registro.
- **No propone unificar los glosarios en uno solo por solución.** El modelo actual —un glosario por categoría, con regla de no duplicación entre ellos— es el que `Rules-UX-UI-DX.md` §3.3 ya implementa y funciona. El defecto es que no está replicado, no que esté mal diseñado.

---

## Control de cambios

| Versión | Fecha | Cambios | Autor |
| --- | --- | --- | --- |
| 1.0 | 2026-07-29 | Emisión inicial. Orden de trabajo para corregir dos defectos del Framework SDD detectados durante la corrida de SelfHosted Service: **A**, que el criterio de cuándo desambiguar un término polisémico no existe como regla del framework y vive sólo dentro del intake de una solución; y **B**, que el glosario de la categoría 02 es sección de un documento condicional y ningún criterio de aceptación lo verifica. Incluye el ejemplo verificado del término «registro» con sus tres referentes y sus 14 ocurrencias sin calificador, la cadena causal de siete pasos que combina los dos defectos, y el mecanismo que los vuelve consecuentes: el contexto de lectura de un subagente es la sección y no el documento, porque así construye el despacho `Master-Prompt.md` §8. Propone cuatro intervenciones acotadas con `Rules-UX-UI-DX.md` como modelo a replicar, ya que es la única de las trece reglas que gobierna su glosario correctamente. Declara que ninguna invariante D1-D9 se modifica y que ninguna documentación ya emitida deja de cumplir. | Orquestador SDD |
