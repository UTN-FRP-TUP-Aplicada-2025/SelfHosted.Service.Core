# CU-11 — Importación como proyecto SelfHosted nuevo

**Proyecto de código:** SelfHosted-Service
**Producto:** SelfHosted Service
**Documento:** CU-11-Importacion-Como-Proyecto-Nuevo.md
**Versión:** 2.1
**Estado:** Propuesto
**Fecha:** 2026-08-02
**Autor:** Analista Funcional Senior (AG-02)

**Necesidad de negocio upstream:** [NB-03](../../01-Necesidades-Negocio/Necesidades-De-Negocio/NB-03-Reproducibilidad-De-La-Arquitectura.md)
**Trazabilidad upstream:** **el intake vigente es v3.7**, verificado en el campo `Versión` de su cabecera el 2026-08-02. **Todo el contenido que este documento incorpora de la ronda del 2026-07-31 y del 2026-08-01 entró en la v3.4**, y se cita por esa versión en el cuerpo y en el control de cambios porque es la que permite localizarlo en el snapshot [`_legacy/2026-08-01/PRODUCT-INTAKE-SelfHosted-Service-v3.4.md`](../../../Intake/_legacy/2026-08-01/PRODUCT-INTAKE-SelfHosted-Service-v3.4.md), según el criterio de cita de versión de [`Especificacion-Funcional.md`](../Especificacion-Funcional.md) §8. **Secciones y anexos consumidos:** §4 capacidad F-13; anexo E-15, endpoint de importación y su informe; anexo E-21 (las reglas de traducción); anexo E-14 (el manifiesto propio); E-16 RN-01, RN-02, RN-21, RN-26, RN-34; §12, entrada de glosario del informe de importación

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

Permitir que el administrador reconstruya una arquitectura completa importando un archivo de composición como proyecto SelfHosted nuevo, con un informe que declare qué se creó y qué no se pudo representar, para que la pérdida de la máquina deje de significar la pérdida de la arquitectura.

## 2. Actores

| Actor | Tipo | Rol |
| --- | --- | --- |
| Administrador del producto | Primario | Aporta el archivo a importar y recibe el informe |
| Módulo de importación | Sistema | Traduce el archivo al modelo, crea el proyecto SelfHosted con sus servicios y enlaces, y emite el informe |

Los nombres de los actores no humanos son **denominaciones acuñadas por esta categoría**, salvo los seis que trazan a una fuente: `Motor de contenedores`, `Destino externo`, `Automatismo de integración continua`, `Sincronizador de estado`, `Módulo de descubrimiento` y `Resolutor de referencias`. Los acuñados no son componentes declarados y no condicionan la descomposición: su correspondencia con los módulos que el intake §17.P.2 sí declara la fija 05-Arquitectura-Tecnica. La convención completa, nombre por nombre, está en [Especificacion-Funcional.md](../Especificacion-Funcional.md) §8.

## 3. Precondiciones

- El administrador tiene sesión iniciada (CU-30).
- El archivo a importar es legible y está en el formato estándar de composición o es un manifiesto propio de una versión soportada.

## 4. Flujo principal

1. El administrador aporta el archivo de composición a importar.
2. El sistema crea un proyecto SelfHosted nuevo, con su red derivada de lo que el archivo declara.
3. El sistema traduce cada servicio del archivo aplicando las reglas de correspondencia declaradas, verificando el nombre (RN-01) y la pertenencia al proyecto (RN-02).
4. El sistema traduce las variables sin derivar ninguna referencia de la interpolación propia del formato de composición (RN-26).
5. El sistema reexpresa cada dependencia explícita: como referencia sobre la variable que ya lleva el host y el puerto del destino, o como arista sin variable y con espera declarada cuando ninguna variable lo menciona (RN-26, RN-34).
6. El sistema valida que las referencias creadas resuelvan a variables de ámbito válido (RN-21) y que el grafo de arranque quede sin ciclos (RN-05).
7. Si además se aporta el manifiesto propio, el sistema restituye la disposición del lienzo, el nivel de variable compartida y las expresiones sin resolver.
8. El sistema emite el informe de importación: qué servicios y enlaces se crearon, qué no se pudo representar, y **qué servicios no van a poder levantar en esta instalación** porque su origen declara una imagen del almacén local de otra máquina.
9. El sistema registra el evento de auditoría (RN-17).

## 5. Flujos alternativos

**FA-01 — Importación sin manifiesto propio.**
Disparador: el administrador aporta sólo el archivo de composición.
Pasos: el proyecto SelfHosted se crea igualmente; la disposición del lienzo se asigna inicialmente y no hay nivel de variable compartida que restituir.
Punto de retorno: paso 8.

**FA-02 — Manifiesto de una versión de formato anterior.**
Disparador: el manifiesto aportado es de la versión previa.
Pasos: se lee como un proyecto SelfHosted sin variables compartidas ni referencias, sin pérdida adicional.
Punto de retorno: paso 8.

**FA-03 — Elemento sin correspondencia en el modelo.**
Disparador: el archivo declara un elemento que el modelo no representa.
Pasos: el sistema lo declara en el informe de importación y continúa con el resto.
Punto de retorno: paso 8.

**FA-04 — Servicios que no van a poder levantar en el destino.**
Disparador: el archivo declara al menos un servicio cuyo origen es una imagen del almacén local, que es la variante `imagen-local` incorporada el 2026-07-31.
Pasos: **el servicio se crea igual** —la importación no lo descarta ni lo silencia— y el informe del paso 8 **declara explícitamente que no va a poder levantar acá**, porque esa imagen vive en el almacén local de la máquina de origen y no en ésta. El servicio queda marcado como **no reproducible**, atributo derivado de su origen. El camino de pago declarado es publicar la imagen en un registro y cambiar el origen del servicio.
Punto de retorno: paso 8.

**Es la contraparte de la advertencia que la exportación emite antes de exportar** (CU-09 `FA-03`), y las dos existen por lo mismo: que la deuda de reproducibilidad sea visible en las dos puntas y no se descubra al arrancar.

## 6. Excepciones y errores

| Código | Causa | Respuesta del sistema |
| --- | --- | --- |
| `422` sobre el nombre | Un nombre de servicio del archivo no cumple el formato o colisiona dentro del proyecto SelfHosted nuevo | Rechazo con el campo señalado (RN-01) |
| `422` de referencia inválida | Una referencia reexpresada apunta a una clave o a un servicio inexistente | Rechazo señalando la expresión y la causa (RN-21) |
| `422` de ciclo de arranque | Las dependencias declaradas forman un ciclo entre aristas con espera | Rechazo señalando el ciclo (RN-05) |
| `409` de arista de espera duplicada | El archivo declara dos veces la misma dependencia sin variable entre el mismo par | Rechazo (RN-34) |
| Pérdida de traducción | Un elemento del archivo no tiene correspondencia en el modelo | Se declara en el informe de importación; sin ese informe la pérdida sería silenciosa |

## 7. Postcondiciones

**En caso de éxito:** existe un proyecto SelfHosted nuevo con sus servicios, sus variables y sus enlaces; el informe declara lo creado, lo no representado y **qué servicios no van a poder levantar en esta instalación**; volver a exportar reproduce el archivo de partida en imagen, red, dirección, dispositivos, montajes, límites y política de reinicio.

**En caso de fallo:** no queda un proyecto SelfHosted a medio construir: el informe declara la causa y el registro del sistema no incorpora servicios parciales.

## 8. Criterios de aceptación

| ID | Given | When | Then |
| --- | --- | --- | --- |
| CA-01 | El archivo del caso C-3, en macvlan con dirección `192.168.1.139`, dispositivo anclado y límite de 512 MB | El administrador lo importa y vuelve a exportarlo | El archivo resultante es equivalente al de partida en imagen, red, dirección, dispositivos, montajes, límites y política de reinicio |
| CA-02 | Un archivo donde un servicio declara una dependencia explícita hacia otro y ninguna de sus variables lo menciona | El administrador lo importa | Se crea una arista sin variable y con espera declarada; volver a exportar reproduce el entorno de partida y la dependencia |
| CA-03 | Un archivo cuyo entorno usa interpolación propia del formato de composición | El administrador lo importa | De la interpolación no sale ninguna referencia del modelo; la única referencia creada es la reexpresión de la variable que ya llevaba el host del destino |
| CA-04 | Un archivo con un elemento que el modelo no representa | El administrador lo importa | El informe de importación declara ese elemento como no representado, y el resto del proyecto SelfHosted queda creado |
| CA-05 | Un archivo que declara un servicio con origen por imagen del almacén local de otra máquina | El administrador lo importa | El servicio **se crea**, queda marcado como no reproducible, y el informe declara explícitamente que **no va a poder levantar en esta instalación**, con el motivo |

## 9. Trazabilidad

| Dimensión | Referencia |
| --- | --- |
| Necesidad de negocio | [NB-03](../../01-Necesidades-Negocio/Necesidades-De-Negocio/NB-03-Reproducibilidad-De-La-Arquitectura.md) |
| Reglas de negocio aplicables | RN-01, RN-02, RN-05, RN-07, RN-17, RN-21, RN-26, RN-34. Reglas conceptuales: RC-02, RC-06, RC-07, RC-08, RC-10, RC-15 |
| Historias de usuario a generar en 06 | US-CU-11-1 (importar un archivo de composición como proyecto SelfHosted nuevo), US-CU-11-2 (restituir la disposición y el nivel de compartida desde el manifiesto propio), US-CU-11-3 (recibir el informe de importación con lo no representado), US-CU-11-4 (saber al importar qué servicios no van a poder levantar acá) |
| Componentes esperados en 05 | Capa `Web`, controlador del recurso de importación; capa `Application`, módulo de proyectos; capa `Infrastructure`, `Exportacion`; capa `Domain`, agregados `Proyectos` y `Servicios`. Referencia tentativa |
| Tests previstos en 08 | T-30 (ida y vuelta del caso C-3); T-40 (interpolación y dependencia explícita con variable); T-54 (dependencia explícita sin variable); T-48 (signo de expansión escapado) |

Los identificadores de historia de usuario llevan la forma `US-CU-XX-n` y son **provisionales**: la numeración definitiva es potestad de 06-Backlog-Tecnico. La forma se eligió para que ningún identificador emitido acá colisione con la numeración que 06 asigne.

## 10. Notas y supuestos

- El informe de importación es lo que hace declarada y no silenciosa toda pérdida de traducción. Desde la tercera pasada la dependencia explícita ya no es una de esas pérdidas.
- RN-26 y RN-34 llevan marcador `[D-i]` y siguen sin revisar; se consumen declarándolas revisables.
- **Brecha declarada:** el intake no declara qué ocurre si el archivo importado colisiona con el identificador legible de un proyecto SelfHosted existente. Destinatario: agente humano del proyecto.
- Este caso de uso comparte reglas de traducción con CU-08, que las aplica sobre la configuración observada de un contenedor en lugar de sobre un archivo.
- **La importación declara y no repara.** Un servicio no reproducible se crea igual, con su deuda declarada: el producto no puede traer una imagen que no está y presentar otra en su lugar sería falso, con el mismo criterio con el que CU-38 rechaza volver por etiqueta a un digesto ausente.

## 11. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 2.1 | 2026-08-02 | **Corrección del hallazgo `P0-01`** del informe [`B2-Retroalimentacion-Decisiones-2026-08-01-r1.md`](../../Audit/B2-Retroalimentacion-Decisiones-2026-08-01-r1.md), veredicto RECHAZADO. **Absorbida dentro de la versión 2.1 sin subirla y sin archivar de nuevo**, por la política de versionado de `Master-Prompt.md` §5: el documento está en `Propuesto` y la corrección deriva del audit de su propia fase de emisión. **Cabecera, y sólo cabecera:** la trazabilidad upstream no declaraba cuál es la versión vigente del intake, de modo que la versión que citaba se leía como afirmación de vigencia y dejó de ser cierta cuando la fuente emitió la 3.6 y la 3.7 el 2026-08-02. Pasa a declarar que **el intake vigente es v3.7**, verificado en el campo `Versión` de su cabecera ese día, y que **el contenido incorporado entró en la v3.4**, con el enlace al snapshot donde se localiza. Las dos citas dicen cosas distintas y conviven, por el criterio de cita de versión que [`Especificacion-Funcional.md`](../Especificacion-Funcional.md) §8 fija en esta misma ronda: la de vigencia se verifica contra el intake vivo, la de origen contra la copia archivada. **Todo el contenido incorporado resuelve contra la v3.4**, verificado sobre su snapshot antes de escribir esta fila; ninguna cita del cuerpo ni del control de cambios se re-apunta. **Ninguna otra parte del documento cambia**: ningún propósito, actor, precondición, paso del flujo, flujo alternativo, excepción, postcondición, criterio de aceptación, referencia de trazabilidad ni nota. Ninguna decisión abierta se cerró y ningún conteo cambió. Ninguna fila previa de esta tabla se reescribió, por `Master-Prompt.md` §5.1 |
| 2.1 | 2026-08-01 | **La importación declara qué servicios no van a poder levantar en el destino**, por la sexta variante de origen `imagen-local` que la ronda de decisiones del agente humano del proyecto del 2026-07-31 incorpora y que el `PRODUCT-INTAKE-SelfHosted-Service` **v3.4** consolida en su anexo E-2 §20.2.3. Sube **minor**: la numeración del flujo principal **no se toca** y ningún paso, excepción ni criterio preexistente cambia; el paso 8 **amplía** el contenido del informe que ya emitía. **FA-04 nueva**, con la constancia de que el servicio **se crea igual** y de que ésta es la contraparte de la advertencia previa de `CU-09` `FA-03`. **§7** y **§8** incorporan la declaración; **§9** suma `US-CU-11-4`; **§10** declara que la importación **declara y no repara**. **Ninguna decisión abierta se cerró acá.** La versión 2.0 queda archivada en `_legacy/2026-08-01/CU-11-Importacion-Como-Proyecto-Nuevo-v2.0.md` |
| 2.0 | 2026-07-30 | Migración normativa del conjunto 4.1 al 6.0, fase M4 corte 3, bajo `Rules-Especificacion-Funcional` 4.0, `Vocabulario-Rules` 2.1 y `Migracion-Rules` 1.0. Clasificación **regenerar contenido** por el salto major de la regla que lo gobierna; fuente de contenido: **el documento de origen**, archivado sin modificar en `_legacy/2026-07-30/CU-11-Importacion-Como-Proyecto-Nuevo-v1.0.md`. Sube **major** porque la nomenclatura anterior deja de cumplir. **Cabecera:** la etiqueta `Proyecto` pasa a `Producto` sobre el mismo valor, porque `Vocabulario-Rules` §3 prohíbe la etiqueta de un plano de identidad sobre el valor de otro; se suma el campo `Proyecto de código` con el valor `SelfHosted-Service`, que §4.1 de la regla 4.0 exige por ser ésta una categoría de nivel proyecto de código (§4 R3) y que el PRODUCT-INTAKE §13 declara como `Nombre-Proyecto-Codigo`; la trazabilidad upstream cita el `PRODUCT-INTAKE` renombrado, antes `SOLUTION-INTAKE`. **Sustitución léxica por ocurrencia** según `Vocabulario-Rules` §9.5 y el plan de migración §3.5, y nunca por reemplazo global de cadena: la única ocurrencia de «solución» designaba el nivel superior y pasa a «producto» con su concordancia de género —«Administrador de la solución» a «Administrador del producto»—; no hay ninguna «solución de código» ni ninguna ocurrencia de la cadena `resoluci` en este documento, verificado por barrido. Las dieciocho ocurrencias de «proyecto» se clasificaron una por una y **ninguna pasó a «proyecto de código»**: doce llevan la forma calificada «proyecto SelfHosted»; tres son la misma entidad del dominio en forma corta, admitida por el PRODUCT-INTAKE §12 donde el contexto ya fijó el sentido; una es el emprendimiento —«agente humano del proyecto»—, que `Vocabulario-Rules` §4 R1 y el PRODUCT-INTAKE §12 dejan sin calificar; una nombra el archivo de este artefacto del dominio, que no se renombra, y una era la etiqueta de cabecera. La entrada de glosario de los referentes de «el registro», que la fila del 2026-07-29 ubica en `Modelo-Datos/Modelo-Conceptual.md` §6, pasa al artefacto propio `Glosario-Funcional.md` que §2.1 y §4.2.4 de la regla 4.0 hacen obligatorio para los ocho tipos D8; lo emite un lote posterior de esta misma fase y esta fila no lo anticipa. **Ningún propósito, actor, precondición, paso de flujo, flujo alternativo, excepción, postcondición, criterio de aceptación, referencia de trazabilidad, nota ni brecha cambió de contenido**: la migración es léxica y de forma de cabecera, y las filas anteriores de este control de cambios no se reescribieron. Origen: [Plan-Migracion-4.1-a-6.0.md](../../Audit/Plan-Migracion-4.1-a-6.0.md) §3.5 y §4 |
| 1.0 | 2026-07-29 | Corrección absorbida dentro de la versión 1.0, sin subirla y sin archivar, por la política de versionado de `Master-Prompt.md` §5: el documento está en estado `Propuesto`. Se califica la forma «el registro» a secas, que tenía tres referentes distintos en la categoría y no era resoluble leyendo esta sección por separado, que es como se generan los artefactos de las categorías siguientes. La entrada de glosario con los cuatro referentes vive en `Modelo-Datos/Modelo-Conceptual.md` §6. Las formas ya calificadas no se tocaron: no colisionan. |
| 1.0 | 2026-07-29 | Corrección absorbida dentro de la versión 1.0, sin subirla y sin archivar, por la política de versionado de `Master-Prompt.md` §5: el documento está en estado `Propuesto` y la corrección proviene del audit de su propia fase de emisión. §2 suma la declaración de que los nombres de los actores no humanos son denominaciones acuñadas por esta categoría y no componentes declarados, con la salvedad de los seis que sí trazan a una fuente. Ningún actor cambia de nombre y ningún flujo se altera: lo que se corrige es que la categoría afirmaba que todo dato trazaba y trece de los diecinueve nombres de actor no humano no lo cumplían. Origen: hallazgo H-04 del informe [Audit/B-02-03-r1.md](../../Audit/B-02-03-r1.md) |
| 1.0 | 2026-07-29 | Versión inicial, derivada de la necesidad de negocio upstream y de las secciones del intake citadas en la cabecera |

