# Audit independiente — Fase B2, paso 6: retroalimentación de la documentación por la ronda de decisiones del 2026-07-31 y del 2026-08-01

| Campo | Valor |
|---|---|
| Fase | B2, paso 6 (retroalimentación de la documentación), ronda 1 de auditoría |
| Producto | SelfHosted Service |
| Proyecto de código | SelfHosted-Service (`tipo_proyecto_codigo`: `web-monolith`; caso degenerado, layout aplanado bajo `SDD/Docs/`) |
| Alcance | El incremento del 2026-08-01: `SDD/Intake/PRODUCT-INTAKE-SelfHosted-Service.md` v3.5 con sus dos snapshots del día, los 20 documentos de `02-Especificacion-Funcional` con fecha 2026-08-01 con sus 20 snapshots, y los 14 documentos de `03-UX-UI-DX` con fecha 2026-08-01 con sus 14 snapshots. 35 documentos vivos y 36 copias archivadas |
| Fuera de alcance | Todo documento del árbol que la ronda no tocó, y los informes de audit de rondas anteriores, que no se modifican |
| Normativa aplicada | `Master-Prompt.md` 5.2 §5, §5.1, §10 y §13; `Deriva-Rules.md` 3.1 §1; `Rules-Especificacion-Funcional.md` §6; `Rules-UX-UI-DX.md` §6; `Intake-Rules.md` §2, §5 y §6; `Vocabulario-Rules.md` 2.1 §9 y §10 |
| Auditor | Arquitecto de Soluciones + QA Senior, independiente. No participó de la generación de este incremento |
| Fecha | 2026-08-01 |
| Veredicto | **RECHAZADO** |

---

## Tabla de contenido

- [1. Resumen ejecutivo](#1-resumen-ejecutivo)
- [2. Método y muestreo declarado](#2-método-y-muestreo-declarado)
  - [2.1 Qué se leyó entero](#21-qué-se-leyó-entero)
  - [2.2 Qué se muestreó y con qué criterio](#22-qué-se-muestreó-y-con-qué-criterio)
  - [2.3 Qué se verificó por script sobre el corpus completo](#23-qué-se-verificó-por-script-sobre-el-corpus-completo)
- [3. Matriz D1-D9](#3-matriz-d1-d9)
- [4. Matriz de estructura obligatoria](#4-matriz-de-estructura-obligatoria)
- [5. Coherencia cross-doc y gobierno del glosario](#5-coherencia-cross-doc-y-gobierno-del-glosario)
  - [5.1 Los cuatro criterios de gobierno del glosario](#51-los-cuatro-criterios-de-gobierno-del-glosario)
  - [5.2 Polisemias evaluadas y descartadas, para que la ronda siguiente no las levante](#52-polisemias-evaluadas-y-descartadas-para-que-la-ronda-siguiente-no-las-levante)
  - [5.3 El eje de la ronda: qué quedó abierto y qué se cerró por arrastre](#53-el-eje-de-la-ronda-qué-quedó-abierto-y-qué-se-cerró-por-arrastre)
  - [5.4 Cierre del incremento anterior](#54-cierre-del-incremento-anterior)
- [6. Hallazgos](#6-hallazgos)
- [7. Veredicto y condiciones para promover](#7-veredicto-y-condiciones-para-promover)
- [8. Lo que este audit no pudo verificar](#8-lo-que-este-audit-no-pudo-verificar)

---

## 1. Resumen ejecutivo

El incremento es de calidad alta en lo que más importa: la política de versionado y de deprecación se cumple sin una sola excepción en los 35 documentos vivos y las 36 copias archivadas, cero enlaces relativos rotos, y las brechas que la ronda abre —`B-29` a `B-32` y `B-UX-31` a `B-UX-34`— se declaran sin cerrar ninguna. El P1 del incremento anterior, `SUP-19` declarada inexistente por `02`, quedó cerrado.

Se reportan **once hallazgos: 2 P0, 2 P1, 4 P2 y 3 P3**. Los dos P0 son de la misma clase y ninguno afecta contenido de producto: son **citas de evidencia que no resuelven**, que `Deriva-Rules.md` §1 tipifica como peores que no citar porque simulan verificación. El primero es que los **veinte documentos de `02` citan el intake como v3.4** cuando el vigente es v3.5, y dos de las decisiones que consumen —las tres fases del despliegue y la política ante un despliegue que no arranca— **no existen en v3.4**, que está en disco y se puede abrir. El segundo es que `03-UX-UI-DX/README.md` §9 declara un barrido cuyo resultado no reproduce.

El P1 más relevante es de eje: `CU-38` **cierra por arrastre dos de los tres puntos que el intake declara sin decidir** de la política de cuarentena, en su flujo alternativo y en dos criterios de aceptación, mientras su propia §10 los declara abiertos y mientras `03` los mantiene abiertos uno por uno. `03` hizo bien exactamente lo que `02` hizo mal.

**Veredicto: RECHAZADO**, por los dos P0. Los dos se corrigen sin tocar ninguna decisión de producto ni ningún conteo de artefactos.

---

## 2. Método y muestreo declarado

Todo lo que sigue se verificó **contra el disco**, y no contra lo que un documento declara sobre sí mismo cuando era verificable de otro modo. La identificación del incremento se hizo con `git status --short` desde la raíz del repositorio destino —35 archivos modificados y 8 carpetas `_legacy/2026-08-01/` sin versionar— y los deltas con `git diff` contra el estado commiteado.

### 2.1 Qué se leyó entero

| Artefacto | Motivo |
|---|---|
| `Master-Prompt.md` §0 a §5.1, §10 y §13 | Política de versionado, de deprecación, estructura del informe y reglas de escritura del intake |
| `Deriva-Rules.md` completo | D9 con su alcance, sus cuatro condiciones de evidencia y su formato de cita |
| `Rules-UX-UI-DX.md` §2 a §6 y `Rules-Especificacion-Funcional.md` §2 a §6 | Tablas maestras, secciones obligatorias, anti-patrones y criterios de aceptación |
| `Vocabulario-Rules.md` §9 y §10 | Criterio de desambiguación léxica y criterios de aceptación |
| `Intake-Rules.md` §2 a §6 | Campos bloqueantes, completitud semántica y batería de preguntas |
| `PRODUCT-INTAKE-SelfHosted-Service.md`: el diff completo v3.3 → v3.5, las cuatro notas nuevas de §4, la fila `F-10`, `RN-08` en E-16, la variante `imagen-local` de E-2, las tablas de pendientes de §19 y de E-23, «Lo que este intake no decide» y el control de cambios entero | Es la fuente de la ronda y el punto donde se decide qué queda abierto |
| `03-UX-UI-DX/README.md` completo, las diez secciones y las cinco subsecciones de §9 | Es el documento que el enunciado marca para atención particular, emitido en dos tramos |
| `Experiencia-De-Uso.md` §10.2 completo, sus cinco bloques de actualización, las 34 filas de brecha y §10.2.1 | Es la fuente canónica de las brechas de la categoría |
| `Glosario-UX.md` §8 y §9 completos | Familias polisémicas, verificación de colisión y criterio negativo |
| `Glosario-Funcional.md` §1, §3 completo y §5 | Regla de inclusión, polisemia y constancias del barrido |
| `CU-38-Vuelta-A-Un-Despliegue-Anterior.md` completo desde §5 | Es el caso de uso donde la política de cuarentena se ejecuta y donde el arrastre indebido era más barato de cometer |
| `Wireframes-Panel-Lateral-Del-Servicio.md` §3.9 | Contraparte de lo anterior vista desde la superficie |
| `Especificacion-Funcional.md` cabecera, §9 completo con sus 32 filas y su recuento | Índice maestro: brechas, aritmética y declaración de upstream |
| `PRODUCT-MANIFEST-SelfHosted-Service.md` §1.1 | Para verificar las tres afirmaciones que `03` hace sobre él |

### 2.2 Qué se muestreó y con qué criterio

De los **20 documentos de `02`** leí enteros cuatro —`CU-38`, `Especificacion-Funcional.md`, `Glosario-Funcional.md` y `CU-18`— y muestreé dieciséis. El criterio fue **el delta**: en cada uno leí la cabecera con su bloque de trazabilidad upstream, la nota que la ronda antepone cuando la hay, las secciones que su propio control de cambios declara alcanzadas, §10 completo —notas y supuestos, que es donde vive el tratamiento de las pendientes— y la fila nueva del control de cambios. No leí de punta a punta los flujos, las tablas de excepciones ni los criterios de aceptación que la ronda no tocó.

De los **14 documentos de `03`** leí enteros tres —el `README.md`, `Glosario-UX.md` §8 y §9, y `Experiencia-De-Uso.md` §10.2— y muestreé once, con el mismo criterio del delta, más la fila «Maqueta de la Fase B2» de la tabla de trazabilidad de **los diecinueve** wireframes, leída por script y no por muestreo.

Del **intake** leí entero el delta y las secciones que la ronda toca o que declaran aritmética; no releí las Partes A, B y C fuera de §4, ni los anexos que la ronda no alcanza.

**Lo que deliberadamente no audité y por qué.** Los 26 casos de uso, las 37 reglas de negocio, las 19 reglas conceptuales y los 10 wireframes que la ronda no tocó quedan fuera: el alcance es el incremento. Verifiqué por script que ninguno quedara con enlace roto ni identificador colisionado por lo que el incremento agregó, y ninguno quedó.

### 2.3 Qué se verificó por script sobre el corpus completo

Sobre los 35 documentos vivos del incremento y las 36 copias archivadas del día:

- **Versionado.** Campo `Versión` y `Fecha` de cada documento vivo contra su valor commiteado: 35 de 35 suben exactamente un minor y llevan fecha 2026-08-01. Ningún archivo de carpeta de trabajo lleva sufijo de versión en el nombre.
- **Deprecación.** Correspondencia entre el sufijo `-v<X.Y>.md` de cada copia archivada y la versión previa del archivo vivo: 36 de 36 correctas. Presencia del bloque de archivado antepuesto con estado `Superado` y enlace a la versión vigente: 36 de 36. **Integridad del cuerpo archivado**: se comparó cada snapshot, descontando su bloque de archivado, contra el estado commiteado del archivo vivo. Las 34 copias de `02` y `03` y la copia v3.3 del intake son idénticas al estado commiteado salvo un salto de línea final; ninguna tiene el cuerpo modificado. La copia v3.4 del intake **no tiene estado commiteado contra el cual compararla**, porque esa versión nació y quedó superada dentro del mismo día: se verificó contra el archivo vivo v3.5, del que difiere sólo por el bloque de archivado, el campo `Versión`, las dos notas nuevas de §4 y la fila 3.5 del control de cambios.
- **Enlaces.** Resolución de los **923** enlaces relativos a archivo de los 35 documentos vivos: **cero rotos**. Resolución de los **814** enlaces con ancla, con la regla de slug de GitHub: **uno** no resuelve (hallazgo P2-04). Los enlaces de las copias archivadas no se cuentan como rotos: `Master-Prompt.md` §5.1 prohíbe modificar el cuerpo del snapshot y la ruta relativa cambia por construcción al bajar dos niveles.
- **Estructura.** Un solo H1 por documento, tabla de contenido presente y sección de control de cambios presente en los 35.
- **Idioma y registro.** Cero emojis y cero caracteres del rango pictográfico en los **34** documentos de `02` y `03`. El intake tiene once glifos de ese rango, todos entre las líneas 3776 y 3876, es decir dentro de los bloques de arte ASCII de §20.18 · E-18 · Maquetado de la interfaz web. Son anteriores a esta ronda —el diff v3.3 → v3.5 no toca ese rango— y no se levantan como hallazgo del incremento.
- **Conteos declarados contra disco.** 39 CU, 40 RN, 19 RC, 19 wireframes, 4 representaciones, 26 artefactos de `03`, 32 filas de brecha en `02`, 34 identificadores `B-UX` en `03`, 26 brechas repartidas en `README` §7.3.
- **Los 19 pares de estados** de la fila «Maqueta de la Fase B2» de cada wireframe, sumados y contrastados contra los 312/286 que el `README` declara: **coinciden fila por fila y en la suma**.
- **La evidencia de disco de `README` §9.1 y §9.5**, reproduciendo los tres comandos declarados.
- **Ocurrencias de `v3.4` y `v3.5`** en los 35 documentos vivos, y presencia de las dos notas de la 3.5 en el snapshot v3.4.

---

## 3. Matriz D1-D9

Evaluada sobre los 35 documentos vivos del incremento. Donde una celda no dice «conforme en los N», el documento que se aparta se nombra.

| Invariante | Intake v3.5 | 02 (20 docs) | 03 (14 docs) | Observación |
|---|---|---|---|---|
| D1 · Idioma y registro | Conforme | Conforme en los 20 | Conforme en los 14 | Español rioplatense neutro técnico, tildes y eñes en el cuerpo, nombres de archivo en ASCII. Cero emojis |
| D2 · Encoding y tablas | Conforme | Conforme en los 20 | Conforme en los 14 | UTF-8, LF. Ninguna tabla con encabezado incompleto ni fila con placeholder sin cerrar en lo emitido |
| D3 · Título-Con-Guiones | Conforme | Conforme en los 20 | Conforme en los 14 | Ningún archivo nuevo en esta ronda; los 35 nombres preexistentes respetan el patrón y los prefijos van en mayúscula completa |
| D4 · Versionado con guion medio | Conforme | Conforme en los 20 | Conforme en los 14 | Cero sufijos de versión en carpeta viva; las 36 copias de `_legacy/2026-08-01/` llevan `-v<X.Y>.md` y su cabecera declara esa misma versión |
| D5 · Deprecación y control de cambios | Conforme, con P2-02 sobre aritmética no actualizada | Conforme en los 20 | Conforme en los 14, con P2-01 sobre una cifra de la fila 2.4 del `README` | Una fila nueva por documento, ninguna anterior reescrita, verificado contra los snapshots |
| D6 · Trazabilidad | Conforme | **No conforme**: ver P0-01 | Conforme | Las citas de `02` al intake apuntan a una versión que no contiene dos de las decisiones que consume |
| D7 · Vocabulario del dominio fuente | No aplica | Conforme en los 20 | Conforme en los 14 | Ningún stack concreto, producto comercial ni protocolo del dominio fuente en lo que la ronda emite |
| D8 · Conjunto cerrado | Conforme | Conforme | Conforme | `web-monolith` declarado en el índice maestro y en el manifiesto; ninguna categoría fuera de gating |
| D9 · Evidencia verificable | Conforme | **No conforme**: P0-01 | **No conforme**: P0-02 en `README` §9. El resto de `03`, conforme y ejemplar | `README` §9.1 y §9.5 declaran método, comando y fecha, y los tres reproducen exactamente; §9 declara además un barrido que no reproduce |

**Nota sobre el alcance de D9.** Se aplicó únicamente a las afirmaciones sobre el estado del sistema, según la tabla de `Deriva-Rules.md` §1. Las afirmaciones de especificación —«el sistema informa el error y recupera el despliegue anterior»— no requieren evidencia y no se auditaron contra ella; lo que sí se auditó de ellas es si cierran una decisión que la fuente declara abierta, que es materia de §5.3 y no de D9.

---

## 4. Matriz de estructura obligatoria

| Clase de documento | Cuántos | Cabecera de §4.1 | Secciones obligatorias | Tabla de contenido | Resultado |
|---|---|---|---|---|---|
| `CU-XX` (`Rules-Especificacion-Funcional` §4.2, once secciones) | 13 | Los 6 campos presentes en los 13 | Las once presentes en los 13, en orden | Presente en los 13 | Conforme. `CU-03`, `CU-13`, `CU-15`, `CU-18` y `CU-33` suman §13, admitida por §4.3 para `web-monolith` |
| `RN-XX` (§4.2.1, siete secciones) | 3 | Presentes | Las siete presentes en los 3 | Presente | Conforme |
| `Modelo-Conceptual.md` (§4.2.2, nueve secciones) | 1 | Presente | Las nueve presentes, más §0 de alcance y §9 de brechas | Presente | Conforme |
| `Glosario-Funcional.md` (§4.2.4, cinco secciones) | 1 | Presente | Las cinco presentes; §3 declara ocho familias polisémicas y §3.9 el criterio negativo | Presente | Conforme |
| `Especificacion-Funcional.md` y `README.md` de 02 | 2 | Cabecera en tabla y no en líneas en negrita, con los seis campos | Índice maestro con matriz NB→CU→RN→US, brechas y control de cambios | Presente | Conforme en contenido. La forma de cabecera en tabla es anterior a este incremento y no la introduce la ronda |
| `Wireframes-<Superficie>` (`Rules-UX-UI-DX` §4.2.1, nueve secciones) | 9 | Los 7 campos, incluida `Variante`, presentes en los 9 | Las nueve presentes en los 9, con §5 enumerando vacío, cargando, con datos y error | Presente en los 9 | Conforme |
| `Representacion-<Concepto>` (§4.2.2, siete secciones) | 2 | Presentes | Las siete presentes en los 2 | Presente | Conforme |
| `Experiencia-De-Uso.md` (§4.2, once secciones) | 1 | Presente | Las once presentes | Presente | Conforme |
| `Glosario-UX.md` | 1 | Presente | Diez secciones, con §5 de términos reusados y §8 de polisemia | Presente | Conforme |
| `README.md` de 03 (§3.4) | 1 | Presente | Artefacto, propósito, variante y estado de los 26 | Presente, con las cinco subsecciones de §9 incorporadas | Conforme |
| `PRODUCT-INTAKE` v3.5 | 1 | Presente | Partes A a E, checklist de §19, control de cambios | Presente | Conforme |

Ninguna sección obligatoria falta en ningún documento del incremento. Ningún documento obligatorio de las dos categorías está ausente.

---

## 5. Coherencia cross-doc y gobierno del glosario

**Referencias.** Los 923 enlaces relativos a archivo de los 35 documentos vivos resuelven. De los 814 enlaces con ancla resuelven todos salvo uno (P2-04). Los identificadores no colisionan: `CU-01` a `CU-39` sin huecos, `RN-01` a `RN-40`, `RC-01` a `RC-19`, `SUP-01` a `SUP-19`, `B-01` a `B-32`, `B-UX-01` a `B-UX-34`. Las brechas que la ronda abre se apuntan en las dos direcciones entre categorías: `B-31`↔`B-UX-31`, `B-30`↔`B-UX-32`, `B-32`↔`B-UX-33`, y `B-UX-34` la destapa `03` y lo declara.

**Trazabilidad D6 de lo que la ronda emite o modifica.** Ningún artefacto se agrega ni se retira en este incremento; los 35 documentos son modificaciones de documentos existentes. Hacia arriba, cada uno declara su bloque de trazabilidad al intake, y ahí es donde falla `02` (P0-01). Hacia abajo, `02` transfiere `B-29` a `03` como destinataria y `03` la consume y lo declara en la fila 2.4 de su `README`; `CU-38` enumera seis historias de usuario provisionales para `06` y delega los tests a `08` declarando que el anexo E-22 es anterior al caso de uso; `03` entrega a `08` los 312 estados con su desglose reproducible. La cadena cierra en las dos direcciones salvo por el eslabón del intake.

### 5.1 Los cuatro criterios de gobierno del glosario

| Criterio | Resultado | Evidencia |
|---|---|---|
| **Sin contradicciones** | Conforme entre los dos glosarios del incremento | `Glosario-UX.md` §5 referencia 65 términos de `Glosario-Funcional.md` y de `Vision-Producto.md` §9 sin redefinirlos, y declara la única precisión que agrega —la variante visual del huérfano— como precisión de superficie sobre el mismo referente y no como sentido nuevo. Los once términos que `Glosario-Funcional.md` 1.2 acuña no contradicen ninguna entrada previa |
| **Completitud** | Conforme | Los once términos que `Glosario-Funcional.md` 1.2 incorpora —disparador del despliegue, imagen del almacén local, no reproducible, almacén local, construir la imagen, crear el contenedor, fases del despliegue, materializado y sin arrancar, cuarentena, política de fallo al arrancar, y la reescritura completa de «volver a un despliegue anterior»— más las cinco filas preexistentes que la ronda obliga a reescribir, cubren el vocabulario que el incremento acuña. Se muestrearon tres —«cuarentena», «fases del despliegue» y «materializado y sin arrancar»— y los tres aparecen en más de un artefacto, que es lo que la regla de inclusión de §3.3 exige. `Glosario-UX.md` incorpora los de superficie, entre ellos «campo de origen», que reemplaza a la grilla de tarjetas |
| **Polisemia gobernada** | Conforme | `02` declara ocho familias con sus referentes; la novena, «construir», entra en esta ronda con dos referentes en `02` y **tres** en `03`, y la entrada de `03` declara explícitamente cuál es el tercero y por qué su categoría lo tiene y `02` no. Las dos entradas declaran la verificación de colisión que `Vocabulario-Rules.md` §9.4 exige, y las dos adoptan el escalón más barato que resuelve, declarando por qué el anterior no alcanzaba |
| **Criterio negativo** | Conforme, y aplicado con rigor | `Glosario-Funcional.md` §3.9 deja cuatro constancias de polisemias con contextos disjuntos que no se califican, y `Glosario-UX.md` §9.2 deja once. Ninguna de las quince se levanta en este informe |

**Forma desnuda de familia calificada.** Se buscó el caso que `Vocabulario-Rules.md` §9.2 declara como el que hay que mirar: el término desnudo de una familia ya calificada, en una sección que se despacha por separado. En el incremento, «el registro» a secas no aparece en ninguna sección de los 35 documentos; «construir» sin complemento aparece **una vez**, en un texto de tarjeta de interfaz, y `Glosario-UX.md` §8.2 la declara explícitamente con su ubicación y su tratamiento. No hay hallazgo.

### 5.2 Polisemias evaluadas y descartadas, para que la ronda siguiente no las levante

Se evaluaron y se descartaron por contextos disjuntos. Reportar cualquiera de ellas como defecto del documento auditado sería un defecto del informe, según `Vocabulario-Rules.md` §10 y `Master-Prompt.md` §10.

| Término | Referentes | Por qué no es hallazgo |
|---|---|---|
| **«cuarentena»** | La marca del servicio en `02` y `03`; el sentido corriente no aparece | Un solo referente en el incremento. No es polisemia |
| **«reposo»** | El estado del contenedor creado y sin arrancar; y «reposo legítimo» como calificación de desenlace | Es el mismo referente visto como estado y como propiedad del desenlace, no dos objetos |
| **«recuperar»** | Recuperar el despliegue anterior (`CU-38`, `CU-18`); recuperar espacio en disco (`CU-37`, `SUP-18`); recuperación ante error de la taxonomía UX (`Experiencia-De-Uso` §8) | Tres contextos disjuntos, en secciones que no se comparten. La segunda va siempre como «espacio recuperable» y la tercera como «vía de recuperación» |
| **«distintivo»** | La zona de distintivos del nodo; el distintivo de cuarentena; el de no reproducible | Un referente de composición y dos instancias suyas. `Representacion-Nodo-De-Servicio.md` §2 y `Representacion-Lenguaje-Visual-De-Estados.md` §3.5 lo declaran como categoría que compone sobre el par de estado |
| **«fase»** | Las tres fases del despliegue; las fases del framework (B2); la fase de un plan de entrega | Contextos disjuntos: producto, proceso de generación y plan. Ninguna sección contiene dos |
| **«disparador»** | El tercer eje del despliegue (quién lo inicia); el disparador de un flujo alternativo, que es forma de artefacto | El segundo está declarado en `Glosario-Funcional.md` §2.10 como término de forma de las reglas, y el primero entra en esta ronda con su nombre completo «disparador del despliegue» |
| **«almacén»** | El almacén local de imágenes; el almacén de imágenes del motor | Es el mismo objeto nombrado con dos precisiones; `Glosario-Funcional.md` lo declara con una sola entrada |
| Las once constancias de `Glosario-UX.md` §9.2 | «esqueleto», «asimetría», «pertenencia», «zona», «etiqueta», la familia «proyecto», «registro», «higiene», «ámbito», «procedencia», «huérfano», «credencial rechazada», «sugerencia» y «migración» | Verificadas por ocurrencia por la propia categoría, con la sección de cada una nombrada. Se revisó la verificación y se la encontró correcta |
| Las cuatro constancias de `Glosario-Funcional.md` §3.9 | «registro» como anotación corriente, la familia «proyecto», «migración» en las filas de control de cambios, y «repositorio remoto» con sus dos usos | Igual que la anterior |

### 5.3 El eje de la ronda: qué quedó abierto y qué se cerró por arrastre

El intake v3.5 deja explícitamente sin decidir **tres puntos** de la política de cuarentena: si la recuperación del despliegue anterior es automática o se ofrece; si la cuarentena apaga el autoarranque o la participación en el arranque; y dónde se avisa. Deja además `Q-28` abierta, y `Q-7`, `Q-8`, `Q-10` a `Q-13`, `Q-16`, `Q-18`, `Q-20` y `Q-21`.

| Punto que la fuente declara abierto | `02-Especificacion-Funcional` | `03-UX-UI-DX` |
|---|---|---|
| Recuperación del anterior: ¿automática u ofrecida? | **Cerrada por arrastre.** `CU-38` `FA-05` se titula «Recuperación automática por fallo al arrancar», su prosa justifica que es una vuelta sin confirmación previa «y es deliberado», y `CA-07` lo fija como criterio de aceptación: «sin pedir confirmación». Ninguna sección declara que la fuente lo deja abierto | **Abierto y declarado.** `SUP-06` §3.9 lo enumera como primero de los tres puntos, y `README` §9.4 declara que la maqueta no puede demostrar una acción de recuperar porque si resultara ofrecida haría falta un control que hoy no se dibuja |
| ¿Apaga el autoarranque o la participación en el arranque? | **Adoptado sin declarar que está abierto.** «Cuarentena con el autoarranque apagado» aparece en `CU-13`, `CU-18`, `CU-38`, `RN-20` y el glosario, y `B-31` no lo enumera entre lo que ninguna fuente declara | **Abierto y declarado.** `B-UX-31` y `SUP-06` §3.9 lo declaran con la consecuencia concreta: el panel exhibe hoy la marca de autoarranque como control editable, y hace falta decir quién la cambió |
| ¿Dónde se avisa? | No se cierra ni se declara | **Abierto y declarado**, con la distinción entre ver y avisar, y con la derivación de la visibilidad persistente explicitada como derivación |
| ¿Qué levanta la cuarentena? (lo abre `02` como `B-31`) | **Contradicción interna.** `B-31` declara que ninguna fuente lo dice, y `FA-05`, `CA-09` y la historia `US-CU-38-6` afirman que «salir de la cuarentena es un acto explícito del administrador» | **Abierto y declarado.** `SUP-06` §3.9 cierra con «tampoco está declarado qué levanta la cuarentena, y el panel por lo tanto no dibuja una acción de retirarla» |
| `Q-28`, origen editable | **Abierta.** `CU-03` §3.7 y §10, `RN-08`, `Modelo-Conceptual.md` §9 y `B-21` la conservan sin resolverla; el panel declara que el origen no es editable en lugar de mostrar un control deshabilitado | **Abierta.** `B-UX-25` la conserva con la misma formulación |
| `B-UX-31` a `B-UX-34` | Contraparte en `B-31`, `B-30` y `B-32`, todas abiertas | **Cuatro abiertas, ninguna cerrada.** `Experiencia-De-Uso.md` §10.2 lo declara y el `README` lo deriva de esa tabla en lugar de decidirlo |

Ningún valor plausible se completó donde la fuente no lo declara, con la excepción de las dos filas de arriba. `03` es, en este eje, ejemplar: declara punto por punto qué no puede demostrar y por qué, y explicita que las ausencias son deliberadas para que la maqueta no las deje pasar por olvido.

### 5.4 Cierre del incremento anterior

El P1 de `B2-Retroalimentacion-Decisiones-2026-07-30-r1.md` —`02` declaraba en cuatro lugares que `SUP-19` no existía y que `03` tenía dieciocho superficies— **quedó cerrado**. Verificado en los cuatro lugares: `Especificacion-Funcional.md` §9 fila `B-25` la marca cerrada con el archivo y la versión que la cierran; `Especificacion-Funcional.md` §6 y el `README.md` §3 declaran la superficie emitida; `CU-39` §9 y §10 la declaran emitida y `CU-03` §10 cierra la consecuencia de `Q-27`. `03` declara diecinueve superficies y `SUP-19` existe en disco. La recomendación del informe anterior sobre un paso de reconciliación de brechas al cierre de una retroalimentación que atraviesa dos categorías **se aplicó**: el `README` de `03` deriva su recuento de la tabla canónica del hermano en lugar de decidirlo, y lo declara.

De los cuatro P2 de ese informe, el `P2-1` de conteo del intake se corrigió en la versión 3.3 con su fila propia; los otros no se re-auditaron por estar fuera del alcance de este incremento.

---

## 6. Hallazgos

### P0-01 · Los veinte documentos de `02` citan como vigente un intake superado, y dos de las decisiones que consumen no existen en la versión que citan

**Nivel:** P0
**Archivos:** los 20 documentos vivos de `SDD/Docs/02-Especificacion-Funcional/` con fecha 2026-08-01
**Secciones:** bloque de trazabilidad upstream de la cabecera, filas nuevas del control de cambios, y `Glosario-Funcional.md` §2 con su nota de marcas y su tabla de términos

**Evidencia.**

1. El intake vigente en disco es **v3.5**, fechado 2026-08-01. La v3.4 es una copia archivada en `SDD/Intake/_legacy/2026-08-01/PRODUCT-INTAKE-SelfHosted-Service-v3.4.md`, con su bloque de archivado y estado `Superado`.
2. `Especificacion-Funcional.md` cabecera, campo «Trazabilidad upstream», afirma literalmente: «El intake vigente es **v3.4**». Es una afirmación sobre el estado del sistema y es falsa.
3. Los veinte documentos citan `v3.4` y ninguno cita `v3.5`: barrido sobre los 20 archivos, **31** ocurrencias de `v3.4` repartidas en los **20**, y **cero** de `v3.5`. `Glosario-Funcional.md` suma además **dieciocho** marcas `[+3.4]`, y su §2 declara que la marca es «por la versión del intake que los origina».
4. **La v3.4 no contiene dos de las decisiones que `02` consume.** Barrido sobre el snapshot: `grep -c "tres fases del despliegue"` devuelve **0** y `grep -c -i "cuarentena"` devuelve **0**. Sobre el intake vigente devuelven 2 y 4. Las dos notas —«Las tres fases del despliegue» y «Política ante un despliegue que no arranca»— entraron en la **3.5**, y su propia fila de control de cambios lo dice: «Completa la consolidación de la 3.4, que dejó afuera dos decisiones que la ronda del 2026-07-31 sí tomó».
5. En consecuencia, estas citas no resuelven: `CU-18` control de cambios, fila 2.1, «Las tres fases del despliegue, el alcance del orden de arranque y la política de fallo al arrancar … consolidada en el `PRODUCT-INTAKE-SelfHosted-Service` **v3.4** §4 y §19»; `CU-13` fila 2.2, con la misma formulación; `Glosario-Funcional.md` §2, marcas `[+3.4]` sobre «Fases del despliegue», «Materializado y sin arrancar» y «Política de fallo al arrancar».

**Por qué es P0 y no P1.** `Deriva-Rules.md` §1 distingue: una afirmación sin evidencia es P1; una afirmación con evidencia que no resuelve —ruta, identificador o comando que no reproduce— es P0, «porque simula verificación». Acá la cita es localizable, el artefacto existe, y quien la sigue **no encuentra lo citado**. Un agente aguas abajo que abra la v3.4 para confirmar las tres fases va a concluir que `02` las inventó. Además, el índice maestro declara superada la versión que nombra como vigente, que es exactamente la ambigüedad que la política de un solo archivo por nombre lógico de `Master-Prompt.md` §5.1 existe para eliminar.

**Recomendación.** Emitir una corrección que re-apunte la trazabilidad upstream de los veinte documentos a **v3.5**, corrija el campo «El intake vigente es v3.4» de `Especificacion-Funcional.md`, y separe en `Glosario-Funcional.md` las marcas: `[+3.4]` para los términos que la 3.4 origina y `[+3.5]` para «Fases del despliegue», «Materializado y sin arrancar» y «Política de fallo al arrancar». Los documentos están en estado `Propuesto`, de modo que `Master-Prompt.md` §5 admite absorber la corrección dentro de la versión en curso citando este hallazgo, sin subir versión y sin archivar de nuevo. **Ninguna decisión de producto ni ningún conteo cambia**: el contenido que `02` consume es correcto y está en el intake vigente.

---

### P0-02 · `03-UX-UI-DX/README.md` §9 declara un barrido cuyo resultado no reproduce, y se contradice con la cita que da dos cláusulas antes

**Nivel:** P0
**Archivo:** `SDD/Docs/03-UX-UI-DX/README.md`
**Secciones:** §9, primer punto de «Dos cosas quedan sin decidir»; y la fila 2.4 del control de cambios, que repite la afirmación

**Evidencia.** El texto dice: «Verificado el 2026-08-01: el barrido de la cadena `requiere_maqueta` sobre `SDD/Intake/` devuelve **cero** ocurrencias, en el manifiesto y en el intake».

Reproducción del barrido declarado, el 2026-08-01, desde la raíz del repositorio destino:

```text
grep -c "requiere_maqueta" SDD/Intake/PRODUCT-MANIFEST-SelfHosted-Service.md  ->  4
grep -c "requiere_maqueta" SDD/Intake/PRODUCT-INTAKE-SelfHosted-Service.md    ->  0
```

Las cuatro ocurrencias están en las líneas 82, 84, 199 y 205 del manifiesto. La de la línea 82 es **la que el propio párrafo cita como literal** dos cláusulas antes: «el flag `requiere_maqueta` no tiene valor declarado en ninguna fuente». El párrafo afirma haber verificado que la cadena no aparece en el manifiesto, y transcribe una oración del manifiesto que la contiene.

**Por qué es P0.** `Deriva-Rules.md` §1 exige que una evidencia sea reproducible: «otro agente o el humano puede volver a obtenerla siguiendo el método declarado, y obtiene lo mismo». Un comando que no reproduce es P0 por la consecuencia declarada en la misma sección. Agrava que la afirmación es **autocontradictoria dentro del mismo párrafo**, de modo que no hace falta salir del documento para detectarla.

**Qué no se ve afectado.** La conclusión sustantiva es correcta y se verificó por separado: el flag `requiere_maqueta` **no tiene valor asignado en ninguna fuente de `SDD/Intake/`**, y el manifiesto §1.1 lo declara con esas palabras. Las otras dos afirmaciones del mismo punto resuelven: el manifiesto declara `Maqueta-Rules` 3.1 y `Deriva-Rules` 3.1 «por la Fase B2 prevista» y las deja sujetas a la confirmación del flag.

**Recomendación.** Reescribir la evidencia por lo que el barrido efectivamente devuelve: cuatro menciones del nombre del flag en el manifiesto, **ninguna con valor asignado**, y cero en el intake. La corrección se absorbe dentro de la versión 2.4 citando este hallazgo, por el mismo motivo que P0-01.

---

### P1-01 · `CU-38` cierra por arrastre dos de los tres puntos que el intake declara sin decidir, y se contradice con su propia `B-31` y con `03`

**Nivel:** P1
**Archivo:** `SDD/Docs/02-Especificacion-Funcional/Casos-De-Uso/CU-38-Vuelta-A-Un-Despliegue-Anterior.md`
**Secciones:** §5 `FA-05` y su nota inmediata, §8 `CA-07` y `CA-09`, §9 historia `US-CU-38-6`, contra §10

**Evidencia.**

El intake v3.5 §4, nota «Política ante un despliegue que no arranca», declara: «**Tres puntos de esta política quedan sin decidir** y se declaran en lugar de suponerse: si la recuperación del anterior es **automática o se ofrece**; si la cuarentena apaga el **autoarranque** o la **participación**…; y **dónde se avisa**».

`CU-38` resuelve dos de ellos:

1. **Recuperación automática.** `FA-05` se titula «Recuperación automática por fallo al arrancar». Su nota lo argumenta: «Es una vuelta sin confirmación previa, y es deliberado… pedir confirmación dejaría el servicio abajo esperando a alguien». `CA-07` lo fija como criterio evaluable: «El sistema informa el error de arranque y **recupera el despliegue anterior** por su digesto, **sin pedir confirmación**».
2. **Salida de la cuarentena.** `FA-05` cierra con «salir de cuarentena es un acto explícito del administrador», y `CA-09` lo repite como criterio de aceptación: «Salir de la cuarentena es un acto explícito del administrador». `US-CU-38-6` lo consolida como historia: «enterarse de que un servicio quedó en cuarentena… **y sacarlo de ahí**».

Y a la vez, §10 del mismo documento declara: «**Brecha nueva, `B-31`: la cuarentena no tiene salida declarada.** `FA-05` la produce y **ninguna fuente declara qué la levanta**: si alcanza con un despliegue exitoso, si el administrador la retira a mano volviendo a encender el autoarranque, o si son dos actos distintos».

`03` mantiene los dos puntos abiertos en la misma ronda: `Wireframes-Panel-Lateral-Del-Servicio.md` §3.9 los enumera uno por uno y cierra con «**tampoco está declarado qué levanta la cuarentena**, y el panel por lo tanto **no dibuja una acción de retirarla**»; y `README` §9.4 declara que la maqueta no puede demostrar «ninguna **acción de retirar la cuarentena**, porque no está declarado qué la levanta» ni «ninguna **acción de recuperar el despliegue anterior**… porque si la recuperación resultara ofrecida en vez de automática haría falta un control que hoy no se dibuja».

**Qué rompe.** Tres cosas, en orden de costo. La contradicción intradocumento entre §5/§8 y §10 vuelve indecidible qué consume un lector. La contradicción entre categorías del mismo incremento deja a `06` derivando historias de usuario de una decisión que `03` declara inexistente. Y `CA-07` y `CA-09` son criterios Given/When/Then, es decir aserciones evaluables que `08` va a convertir en tests: la decisión que nadie tomó llega a la suite como requisito verificado. El índice maestro afirma además «**Ninguna decisión abierta se cerró acá**», que con esto no se sostiene.

No es P0 porque la trazabilidad resuelve —`CU-38` cita la fuente correcta y `B-31` existe con su destinatario— y porque el error es corregible sin tocar el flujo principal.

**Recomendación.** Retirar de `FA-05`, `CA-07`, `CA-09` y `US-CU-38-6` la parte que decide, dejándola como lo que la fuente declara: la política ejecuta la recuperación y el paso a cuarentena, y **si esa recuperación es automática o se ofrece, y qué levanta la cuarentena, son puntos abiertos**. La forma que `03` usa —enunciar el tratamiento y declarar aparte el punto abierto con lo que bloquea— es la que conviene copiar. Ampliar `B-31` con los dos puntos del intake que hoy no enumera.

---

### P1-02 · El intake v3.5 se contradice sobre el estado de `Q-19`: §19 la declara decidida y el anexo E-23 la sigue declarando abierta

**Nivel:** P1
**Archivo:** `SDD/Intake/PRODUCT-INTAKE-SelfHosted-Service.md`
**Secciones:** §19, tabla de pendientes; y §20.23 (anexo E-23), tabla «qué quedó decidido y qué queda abierto»

**Evidencia.**

- §19, línea 5253: «`Q-19` … **Decidida el 2026-07-31: sí.** La exige la política de fallo al arrancar…».
- Anexo E-23, línea 4537: «| `Q-19` | **Abierta** | Si existe la operación de **volver a un despliegue anterior**. `Q-15` la volvió técnicamente posible; **lo que falta es decidir si se ofrece** |».
- La línea 4538 arrastra la dependencia: «`Q-20` … **Depende de `Q-19`**».

La contradicción **la introduce esta ronda**: en la v3.3 las dos tablas decían «abierta» y eran coherentes. La fila 3.4 declara «§19: `Q-19` decidida en positivo» y no menciona el anexo, pese a que la fila 3.2 ya había registrado que E-23 declara estado de pendientes y que una imprecisión suya «se corrige en lugar de arrastrarse».

**Por qué importa aguas abajo.** `CU-38` cita en su trazabilidad «anexo E-23 … **con su tabla de qué quedó decidido**», y esa tabla dice lo contrario de lo que `CU-38` afirma. `Wireframes-Imagenes.md` y `Wireframes-Tablero-De-Estado.md` citan E-23 con la misma formulación. Un subagente que reciba el anexo como sección suelta —que es el modo de despacho que `Vocabulario-Rules.md` §9.2 describe— consume `Q-19` como abierta.

**Recomendación.** Emitir v3.6 actualizando la fila de `Q-19` del anexo E-23 al mismo estado que §19, con su fila de control de cambios, y revisar en la misma operación si la fila de `Q-20` conserva su formulación de dependencia. Es modificación atómica de una sección y sube minor.

---

### P2-01 · `03-UX-UI-DX/README.md` declara doce artefactos cambiados de versión y en disco son catorce

**Nivel:** P2
**Archivo:** `SDD/Docs/03-UX-UI-DX/README.md`
**Secciones:** §4, párrafo posterior a la tabla de reparto; y fila 2.4 del control de cambios, que repite la cifra

**Evidencia.** El texto dice: «**Doce artefactos cambiaron de versión en esta ronda**: este índice, el marco, el glosario, cinco wireframes que suben a 2.2, y **dos wireframes** más las dos representaciones que suben a 2.1».

En disco, comparando el campo `Versión` de cada archivo vivo contra su valor commiteado, cambiaron **catorce**: el índice, el marco, el glosario, cinco wireframes a 2.2 —`SUP-06`, `SUP-09`, `SUP-11`, `SUP-17`, `SUP-18`—, **cuatro** wireframes a 2.1 —`SUP-04`, `SUP-05`, `SUP-10`, `SUP-15`— y las dos representaciones. La carpeta `Wireframes/_legacy/2026-08-01/` tiene nueve archivos, y el propio `README` §9.3 lo usa como evidencia de que cambian nueve superficies: nueve wireframes más cinco documentos de raíz y representaciones son catorce, no doce.

El error está acotado al conteo de wireframes que suben a 2.1. La tabla de reparto de versiones de §4 es correcta —2.4 en 2, 2.3 en 1, 2.2 en 5, 2.1 en 7, 2.0 en 10, 1.0 en 1, suma 26— y se verificó fila por fila en disco, igual que la aclaración de que `SUP-12` conserva su 2.1 del 2026-07-30.

**Por qué P2 y no más.** Es una cifra que el documento afirma sobre sí mismo y que no se sostiene al contarla, que es la clase que la fila 2.3 de este mismo documento se había comprometido a no repetir. No afecta contenido ni conteo de artefactos.

**Recomendación.** Corregir a catorce y a «cuatro wireframes», en §4 y en la fila 2.4, absorbiendo la corrección dentro de la versión 2.4.

---

### P2-02 · La aritmética agregada de decisiones del intake no incorpora `Q-19` decidida ni `Q-5` sin objeto

**Nivel:** P2
**Archivo:** `SDD/Intake/PRODUCT-INTAKE-SelfHosted-Service.md`
**Secciones:** §4, «Lo que este intake no decide»; y §19, tabla de los tres registros

**Evidencia.**

- §4: «**Lo que este intake no decide, actualizado en la versión 3.2** … La aritmética queda así … **once cerradas**, **cinco con propuesta escrita y sin confirmar** … y **trece abiertas sin propuesta cerrada**».
- §19: «Cinco de la Fase A, más **diecisiete** … **veintidós** en total, de las cuales **cinco están cerradas** desde la versión 3.2 … y **diecisiete siguen abiertas**».
- La tabla de §19 que las enumera tiene hoy diecisiete filas, de las cuales **seis** están resueltas —`Q-5` sin objeto, `Q-6`, `Q-15`, `Q-17`, `Q-19`, `Q-27`— y once abiertas.

La fila 3.2 había declarado explícitamente que actualizaba «la aritmética en las tres secciones que la declaran». La fila 3.4 cierra `Q-19` y deja `Q-5` sin objeto, y no vuelve a tocarlas.

**Recomendación.** Actualizar los dos agregados en la v3.6, en la misma operación que P1-02, declarando el ajuste en lugar de aplicarlo en silencio, como el documento viene haciendo.

---

### P2-03 · `B-31` de `02` no enumera los puntos que el intake declara abiertos, y adopta «autoarranque» sin declarar que la fuente lo deja abierto

**Nivel:** P2
**Archivos:** `SDD/Docs/02-Especificacion-Funcional/Especificacion-Funcional.md` §9 fila `B-31`; `CU-38` §10; `CU-18` §10; `RN-20` §3; `Glosario-Funcional.md` §2, entrada «Política de fallo al arrancar»
**Sección:** notas y supuestos

**Evidencia.** El intake declara tres puntos abiertos. `B-31` declara otros tres —qué levanta la cuarentena, si el servicio en cuarentena entra al conjunto de cambios pendientes, y cómo se representa en el lienzo— y **ninguno de los tres del intake**. En paralelo, «cuarentena con el **autoarranque apagado**» aparece como dato firme en `CU-13` `FA-06`, `CU-18` `FA-06` y `CA-07`, `CU-38` `FA-05`, `CA-08` y `CA-09`, `RN-20` §3 y la entrada de glosario, sin que ninguna de esas ocurrencias declare que el intake deja abierto si lo que se apaga es el autoarranque o la participación en el arranque. `03` sí lo declara, con la consecuencia concreta sobre el control editable del panel.

Se atenúa —y por eso es P2 y no P1— porque el propio intake usa «no autoarranque» en el cuerpo decidido de la política y sólo después declara el punto abierto, de modo que `02` sigue el texto principal de su fuente. Lo que falta es la declaración, no el valor.

**Recomendación.** Ampliar `B-31` con los tres puntos que el intake declara, y anotar en el primer lugar donde `02` escribe «autoarranque apagado» que la marca concreta es punto abierto de la fuente.

---

### P2-04 · Ancla que no resuelve entre los dos glosarios

**Nivel:** P2
**Archivo:** `SDD/Docs/03-UX-UI-DX/Glosario-UX.md`
**Sección:** §9.2, fila «La familia "proyecto", con sus tres referentes»

**Evidencia.** La fila enlaza a `../02-Especificacion-Funcional/Glosario-Funcional.md#38-criterio-negativo-polisemias-verificadas-que-no-se-califican`. En `Glosario-Funcional.md`, §3.8 es «modo de red — dos referentes»; el criterio negativo es **§3.9**. Es la única ancla del incremento que no resuelve: la verificación se corrió sobre los 814 enlaces con ancla de los 35 documentos vivos, con la regla de slug de GitHub.

El texto del ancla nombra correctamente la sección de destino y el documento sí la contiene, de modo que el lector la encuentra: por eso es P2 y no un hallazgo de trazabilidad.

**Recomendación.** Corregir a `#39-criterio-negativo-polisemias-verificadas-que-no-se-califican`.

---

### P3-01 · El bloque de actualización de la versión 2.4 de `Experiencia-De-Uso.md` §10.2 está insertado antes del de la versión 2.2

**Nivel:** P3
**Archivo:** `SDD/Docs/03-UX-UI-DX/Experiencia-De-Uso.md`
**Sección:** §10.2

**Evidencia.** Los bloques de actualización aparecen en este orden: 1.1 (2026-07-29), 2.1 (2026-07-30), **2.4 (2026-08-01)**, 2.2 (2026-07-30). Un lector que los recorra en orden lee el estado del 2026-08-01 y después uno del 2026-07-30, y los recuentos de los dos últimos bloques —veintinueve sobre treinta y cuatro, y después veinticinco sobre treinta— parecen retroceder.

Los contenidos son correctos y las 34 filas de la tabla que sigue son las vigentes.

**Recomendación.** Reubicar el bloque de la 2.4 al final de la secuencia. Es reordenamiento sin cambio de texto.

---

### P3-02 · La nota nueva de §4 del intake no declara autor, a diferencia de las otras tres de la ronda

**Nivel:** P3
**Archivo:** `SDD/Intake/PRODUCT-INTAKE-SelfHosted-Service.md`
**Sección:** §4

**Evidencia.** Las cuatro notas que la ronda antepone llevan encabezado con marcador, autor y fecha, salvo una: «El tercer eje y el alta unificada **[D], agente humano del proyecto**, 2026-07-31»; «Las tres fases del despliegue **[D], agente humano del proyecto**, 2026-07-31»; «Política ante un despliegue que no arranca **[D], agente humano del proyecto**, 2026-07-31»; y «Construir la imagen y crear el contenedor no son lo mismo **[D], 2026-08-01**», sin autor.

Con el marcador `[D]` la nota se consume como decisión cerrada, y quién la tomó es el dato que la distingue de una especificación de integración `[D-i]`. `Glosario-Funcional.md` §3.10 y `Glosario-UX.md` §8.2 la consumen atribuyéndola al agente humano del proyecto, de modo que el dato se está infiriendo.

**Recomendación.** Completar la atribución en la v3.6.

---

### P3-03 · Citas de versión de intake mezcladas dentro de `03`

**Nivel:** P3
**Archivo:** `SDD/Docs/03-UX-UI-DX/Glosario-UX.md`
**Sección:** §8.2

**Evidencia.** Los trece documentos restantes de `03` que la ronda toca citan el intake como **v3.5**; `Glosario-UX.md` §8.2 lo cita como **v3.4**. La cita resuelve —la nota de «construir» entró efectivamente en la 3.4— pero la mezcla obliga al lector a decidir cuál de las dos es la vigente, que es justamente lo que el P0-01 vuelve un problema real en la categoría hermana.

`Wireframes-Exploracion-De-Registro-De-Imagenes.md` cita v3.2 y **no es hallazgo**: la ronda no lo tocó y su insumo es efectivamente el de esa versión.

**Recomendación.** Uniformar a v3.5 la referencia de la versión vigente, conservando la mención de la 3.4 como la versión que originó la nota si se la quiere preservar.

---

**Observación evaluada y no elevada a hallazgo.** La fila 3.4 del intake alcanza §4, §19 y dos anexos de §20 en una sola entrada, cuando `Master-Prompt.md` §13 regla 5 pide modificación atómica por sección. El documento declara el criterio con el que lo hace —es una sola respuesta del humano y partirla haría ilegible la traza— y lo hereda de la fila 3.2, que el audit de la ronda anterior ya evaluó. No se levanta de nuevo.

---

## 7. Veredicto y condiciones para promover

**RECHAZADO.** Dos hallazgos P0 detienen la cadena según `Master-Prompt.md` §10.

| Nivel | Cantidad | Identificadores |
|---|---|---|
| P0 | 2 | P0-01, P0-02 |
| P1 | 2 | P1-01, P1-02 |
| P2 | 4 | P2-01, P2-02, P2-03, P2-04 |
| P3 | 3 | P3-01, P3-02, P3-03 |
| **Total** | **11** | |

**Condiciones para promover, en orden.**

1. Cerrar **P0-01**: re-apuntar a v3.5 la trazabilidad upstream de los veinte documentos de `02`, corregir el campo «El intake vigente es v3.4» del índice maestro, y separar las marcas `[+3.4]` y `[+3.5]` en `Glosario-Funcional.md`. Los documentos están en `Propuesto` y la corrección se absorbe dentro de la versión en curso citando este hallazgo, sin archivar de nuevo.
2. Cerrar **P0-02**: reescribir la evidencia del barrido de `requiere_maqueta` por lo que reproduce, dentro de la versión 2.4 del `README` de `03`.
3. Cerrar **P1-01**: retirar de `FA-05`, `CA-07`, `CA-09` y `US-CU-38-6` de `CU-38` lo que decide, y ampliar `B-31`.
4. Cerrar **P1-02** y **P2-02** en una sola emisión v3.6 del intake: fila de `Q-19` del anexo E-23 y los dos agregados de aritmética.
5. Los P2 y P3 restantes se documentan y no bloquean, según `Master-Prompt.md` §10.

Ninguna de las cinco condiciones toca una decisión de producto, un conteo de artefactos, un identificador ni una brecha. El re-audit puede acotarse a los puntos corregidos y a la verificación de que ninguna fila de control de cambios previa se reescribió.

**Lo que este incremento hace bien y conviene que la ronda siguiente conserve.** La política de deprecación se cumplió en las 36 copias sin una excepción, con el cuerpo intacto y verificado por comparación. `03` declaró punto por punto qué no puede demostrar la maqueta y por qué, en lugar de completar por su cuenta. Los 312 estados se declararon como suma de diecinueve pares leídos en disco, con el desglose publicado para que la suma se pueda rehacer, y la suma cierra. Y `README` §9.1 y §9.5 son el modelo de cómo se cita evidencia: afirmación, artefacto, comando que la reproduce y fecha; los tres comandos se corrieron y devolvieron exactamente lo declarado.

---

## 8. Lo que este audit no pudo verificar

| Punto | Por qué |
|---|---|
| Si la maqueta de `SDD/Maquetas/SelfHosted-Service/` materializa correctamente lo que los diecinueve wireframes especifican | Está fuera del alcance del paso 6. Se verificó únicamente lo que `README` §9.1 afirma sobre su estado —cantidad de archivos, tamaños y marcas de tiempo—, y las tres afirmaciones reproducen |
| Si las nueve superficies que la ronda alcanza se van a poder maquetar con las brechas abiertas | Es materia del paso siguiente. `README` §9.4 declara el condicionamiento concreto de cuatro de ellas y este audit verificó que la declaración es coherente con lo que las brechas dicen, no que sea suficiente |
| El valor real del flag `requiere_maqueta` | Ninguna fuente de `SDD/Intake/` le asigna valor. La ambigüedad es real, está declarada por `03` y por el manifiesto, y su destinatario es el agente humano del proyecto |
| Si los conteos de términos de `Glosario-UX.md` §9.3 —sesenta y nueve términos y sesenta y cinco referenciados— se sostienen | El propio documento declara que se contaron a mano porque las filas de §5 agrupan varios términos separados por punto medio. Se verificó por muestreo de tres filas y coincidió; no se recontó el total |
| Si las decisiones del agente humano del proyecto del 2026-07-31 y del 2026-08-01 son exactamente las que el intake consolidó | El insumo original es `Casos-Estudios-Re-Definidos.md` 3.6, que vive en el repositorio de documentación y no en este repositorio. El audit verificó la consolidación contra el intake, que es la fuente que la cadena consume, no contra el registro de la conversación |
| El estado de los cuatro P2 y tres P3 del informe del 2026-07-30 que no alcanzan a este incremento | Fuera de alcance. Sólo se verificó el P1, que quedó cerrado, y el `P2-1`, corregido en la versión 3.3 del intake |
