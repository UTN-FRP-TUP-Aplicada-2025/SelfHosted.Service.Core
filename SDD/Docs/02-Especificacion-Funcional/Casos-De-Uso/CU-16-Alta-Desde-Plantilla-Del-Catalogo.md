# CU-16 — Alta desde plantilla del catálogo, con creación del conjunto completo

**Proyecto de código:** SelfHosted-Service
**Producto:** SelfHosted Service
**Documento:** CU-16-Alta-Desde-Plantilla-Del-Catalogo.md
**Versión:** 2.0
**Estado:** Propuesto
**Fecha:** 2026-07-30
**Autor:** Analista Funcional Senior (AG-02)

**Necesidad de negocio upstream:** [NB-04](../../01-Necesidades-Negocio/Necesidades-De-Negocio/NB-04-Alta-De-Servicio-Sin-Copiar-Y-Adaptar.md)
**Trazabilidad upstream:** PRODUCT-INTAKE-SelfHosted-Service §4 capacidad F-14, su nota y la **nota de los dos ejes del alta** (decisiones D-7 y D-14); anexo E-6 (el ítem como subgrafo parametrizado, su envoltorio, el informe de instanciación de §20.6.3 y las cinco consecuencias del vínculo débil de §20.6.4); anexo E-2 §20.2.4, el campo de procedencia del servicio instanciado; anexo E-15, endpoint de instanciación; E-16 RN-01, RN-21, RN-22, RN-30, RN-36, RN-37, RN-39; §17.P.2, invariante I2

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

Permitir que el administrador dé de alta un conjunto de servicios instanciando un ítem del catálogo con sus parámetros, creando de una sola vez los servicios, sus contenedores y los enlaces entre ellos, para que resolver algo una vez alcance y no haya que volver a copiar y adaptar.

## 2. Actores

| Actor | Tipo | Rol |
| --- | --- | --- |
| Administrador del producto | Primario | Elige el ítem, declara sus parámetros y confirma la instanciación |
| Módulo de catálogo | Sistema | Resuelve los parámetros, crea los N servicios, sus enlaces y sus variables compartidas, y emite los avisos de higiene |

Los nombres de los actores no humanos son **denominaciones acuñadas por esta categoría**, salvo los seis que trazan a una fuente: `Motor de contenedores`, `Destino externo`, `Automatismo de integración continua`, `Sincronizador de estado`, `Módulo de descubrimiento` y `Resolutor de referencias`. Los acuñados no son componentes declarados y no condicionan la descomposición: su correspondencia con los módulos que el intake §17.P.2 sí declara la fija 05-Arquitectura-Tecnica. La convención completa, nombre por nombre, está en [Especificacion-Funcional.md](../Especificacion-Funcional.md) §8.

## 3. Precondiciones

- Existe el proyecto SelfHosted destino (CU-01).
- El catálogo tiene al menos un ítem declarado (CU-17).
- El administrador tiene sesión iniciada (CU-30).

## 4. Flujo principal

1. El administrador elige un ítem del catálogo y pide instanciarlo en el proyecto SelfHosted abierto.
2. El sistema presenta los parámetros que el ítem declara.
3. El administrador declara los valores de los parámetros y confirma.
4. El sistema resuelve los huecos de parámetro del subgrafo. Ninguna expresión persistida conserva un hueco de parámetro sin resolver.
5. El sistema crea un servicio y un contenedor por cada nodo del subgrafo. Ningún servicio instanciado comparte contenedor con otro (RN-30, invariante I2).
6. Si el nombre de un servicio del subgrafo ya existe en el proyecto destino, el sistema lo sufija automáticamente e informa qué sufijó; no rechaza y no pregunta (RN-36).
7. El sistema crea las variables compartidas que la plantilla declara y las referencias del subgrafo, validando su ámbito (RN-21) y la ausencia de ciclos de valor (RN-22).
8. El sistema crea los enlaces entre los servicios del subgrafo con su espera declarada (RN-34).
9. El sistema copia en cada servicio creado la **procedencia**: el identificador, el nombre y la versión de contenido del ítem del que salió. Es una **copia y no una referencia**, y el vínculo que establece es **débil y sólo en calidad de origen** (RN-39).
10. El sistema emite el **informe de la instanciación**: qué servicios creó con qué nombre solicitado y qué nombre asignado, qué variables compartidas creó, qué enlaces trazó, y los avisos que correspondan **marcados como no bloqueantes** (RN-36, RN-37).
11. El sistema registra el evento de auditoría (RN-17).

## 5. Flujos alternativos

**FA-01 — Clave compartida que ya existe con el mismo valor.**
Disparador: la plantilla declara una clave compartida que el proyecto SelfHosted ya tiene con idéntico valor.
Pasos: el sistema crea el objeto nuevo y advierte que probablemente convenga compartir, ofreciendo reusar. La operación no se bloquea (RN-37).
Punto de retorno: paso 9.

**FA-02 — Clave compartida que ya existe con distinto valor.**
Disparador: la plantilla declara una clave compartida que el proyecto ya tiene con otro valor.
Pasos: se crean separadas y se avisa; no se ofrece reusar, porque casi seguro son cosas distintas (RN-37).
Punto de retorno: paso 9.

**FA-03 — Ítem de un solo servicio.**
Disparador: el ítem contiene un subgrafo de un solo nodo y ninguna arista, que es el caso frecuente.
Pasos: se crea un servicio y un contenedor, sin enlaces.
Punto de retorno: paso 7.

**FA-04 — Ítem de una versión de formato anterior.**
Disparador: el ítem proviene de un catálogo importado con la versión de formato previa.
Pasos: se convierte de forma determinista envolviendo su plantilla en un subgrafo de un nodo, sin pérdida.
Punto de retorno: paso 4.

**FA-05 — La plantilla cambia después de la instanciación.**
Disparador: el administrador edita el ítem del que ya se instanciaron servicios, o lo borra.
Pasos: **no pasa nada sobre lo instanciado** (RN-39). El servicio instanciado tiene su propio ciclo de vida: la edición no lo toca, el borrado del ítem está permitido y no emite advertencia de «en uso», y una versión de contenido más nueva **no se notifica**. El servicio sigue respondiendo de qué plantilla y qué versión salió, aunque el ítem ya no exista, porque lo que guarda es una copia.
Punto de retorno: ninguno. Es una invariante y no un flujo del usuario; se declara como flujo alternativo porque es la pregunta que un lector se hace en este caso de uso y que la versión 1.0 no respondía.

**Por qué el vínculo es débil, y no una elección de implementación.** Instancias vivas que se actualizaran cuando la plantilla cambia convertirían el catálogo en un gestor de configuración, que es otro producto; y traerían el problema de qué hacer cuando la plantilla cambia un campo que el usuario ya editó a mano en la instancia. Es la decisión **D-14** del agente humano del proyecto, del 2026-07-29.

## 6. Excepciones y errores

| Código | Causa | Respuesta del sistema |
| --- | --- | --- |
| `422` sobre el nombre | Un nombre resuelto no cumple el formato de nombre de servicio | Rechazo con el campo señalado (RN-01). El nombre que ya existe no es este caso: se sufija sin rechazar (RN-36) |
| `422` de referencia inválida | Una referencia del subgrafo apunta a una clave o a un servicio inexistente, o a un servicio de otro proyecto SelfHosted | Rechazo señalando la expresión y la causa (RN-21) |
| `422` de ciclo de valor | Las referencias del subgrafo forman una cadena que vuelve sobre sí misma | Rechazo con la cadena completa del ciclo (RN-22) |
| Aviso no bloqueante | Una clave compartida del subgrafo ya existe en el proyecto destino | Se crea el objeto nuevo y el sistema advierte. Ninguna condición de higiene bloquea (RN-37) |

## 7. Postcondiciones

**En caso de éxito:** existen N servicios y N contenedores en el proyecto SelfHosted, uno por cada nodo del subgrafo, con sus enlaces y sus variables compartidas; ninguna expresión persistida conserva un hueco de parámetro; los avisos de higiene emitidos no bloquearon nada; existe el evento de auditoría.

**En caso de fallo:** no queda un subgrafo a medio instanciar; el proyecto SelfHosted conserva su estado previo y el rechazo identifica la expresión o el campo que lo produjo.

## 8. Criterios de aceptación

| ID | Given | When | Then |
| --- | --- | --- | --- |
| CA-01 | Un ítem con dos servicios y una arista entre ellos, instanciado con un parámetro de identificador, en un proyecto SelfHosted que no tiene la clave compartida que declara | El administrador lo instancia | Se crean dos servicios, dos contenedores, una arista con espera declarada que referencia el host y registra el puerto de destino, y la variable compartida con sus dos referencias resueltas |
| CA-02 | El mismo ítem, en un proyecto SelfHosted que ya tiene un servicio con el nombre resultante | El administrador lo instancia | El servicio se crea con nombre sufijado y el sistema informa cuál asignó; no rechaza y no pregunta |
| CA-03 | Un proyecto SelfHosted que ya tiene una variable compartida con la misma clave y el mismo valor que la plantilla declara | El administrador instancia el ítem | Se crea el objeto nuevo y el sistema advierte que probablemente convenga compartir, ofreciendo reusar, sin bloquear |
| CA-04 | El mismo caso con valores distintos | El administrador instancia el ítem | Se crean separadas, el sistema avisa y no ofrece reusar |
| CA-05 | Un ítem con dos nodos | El administrador lo instancia | Ningún contenedor aloja más de un servicio: se crean tantos contenedores como nodos |
| CA-06 | Un ítem instanciado en un proyecto SelfHosted | El administrador edita el ítem cambiando su imagen y su etiqueta | El servicio instanciado **no cambia**, y sigue declarando la versión de contenido con la que se instanció (RN-39) |
| CA-07 | El mismo caso | El administrador borra el ítem | El borrado se permite, **no pide confirmación adicional por instancias existentes**, el servicio sigue funcionando y sigue respondiendo de qué plantilla salió |
| CA-08 | Un ítem multi-servicio | El administrador lo elige, antes de confirmar | El sistema declara **cuántos servicios va a crear**, con qué nombres previstos, y qué variables compartidas y aristas declara |

## 9. Trazabilidad

| Dimensión | Referencia |
| --- | --- |
| Necesidad de negocio | [NB-04](../../01-Necesidades-Negocio/Necesidades-De-Negocio/NB-04-Alta-De-Servicio-Sin-Copiar-Y-Adaptar.md) |
| Reglas de negocio aplicables | RN-01, RN-02, RN-15, RN-17, RN-21, RN-22, RN-24, RN-30, RN-34, RN-36, RN-37, RN-39. Reglas conceptuales: RC-02, RC-04, RC-14, RC-17 |
| Historias de usuario a generar en 06 | US-CU-16-1 (instanciar un ítem del catálogo con sus parámetros), US-CU-16-2 (obtener el aviso del nombre sufijado), US-CU-16-3 (recibir los avisos de higiene sin que bloqueen la instanciación), US-CU-16-4 (ver de qué plantilla y de qué versión salió un servicio), US-CU-16-5 (recibir el informe de la instanciación antes de confirmar cuántos servicios se van a crear) |
| Componentes esperados en 05 | Capa `Web`, página del catálogo y controlador de instanciación; capa `Application`, módulo de catálogo; capa `Domain`, agregado `Catalogo`; capa `Infrastructure`, `Persistencia`. Referencia tentativa |
| Tests previstos en 08 | T-43 (instanciación del ítem multi-servicio); T-60 (nombre sufijado); T-61, T-62 (clave compartida con el mismo y con distinto valor) |

Los identificadores de historia de usuario llevan la forma `US-CU-XX-n` y son **provisionales**: la numeración definitiva es potestad de 06-Backlog-Tecnico. La forma se eligió para que ningún identificador emitido acá colisione con la numeración que 06 asigne.

## 10. Notas y supuestos

- El catálogo es **una de las siete vías de alta** de un servicio, no un origen: un ítem es una plantilla que al instanciarse resuelve a una de las **cinco** variantes de origen. Es la decisión D-7, precisada por la nota de los dos ejes del intake §4. La vía **no se persiste**; lo que queda es la procedencia.
- **Lo propio de esta vía, y lo que la hace distinta de las otras seis:** puede crear **más de un servicio de una sola confirmación**. Eso obliga a declarar **antes de crear** cuántos servicios, con qué nombres previstos, y qué variables compartidas y aristas se van a trazar, porque el administrador está por meter dos o tres nodos en su lienzo con una sola acción.
- **La instanciación desvincula (RN-39, decisión D-14).** El servicio creado tiene su propio ciclo de vida y el vínculo con la plantilla es débil y sólo en calidad de origen. Ver FA-05.
- Nada del catálogo corre: sus ítems no tienen despliegue, no tienen contenedor, no ocupan dirección y no aparecen en ningún lienzo hasta instanciarse.
- Conviven tres sintaxis con su orden de resolución por etapas: el hueco de parámetro del instanciador, la expresión de referencia del modelo y la interpolación del formato de composición. El intake lo declara en el anexo E-6.
- La capacidad F-14 es `Should Have` por declaración del intake §4.

## 11. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 2.0 | 2026-07-30 | Migración normativa del conjunto 4.1 al 6.0, fase M4 corte 3, bajo `Rules-Especificacion-Funcional` 4.0, `Vocabulario-Rules` 2.1 y `Migracion-Rules` 1.0. Clasificación **regenerar contenido** por el salto major de la regla que lo gobierna; fuente de contenido: el documento de origen, archivado en `_legacy/2026-07-30/CU-16-Alta-Desde-Plantilla-Del-Catalogo-v1.1.md`. Sube **major** porque la nomenclatura anterior deja de cumplir. Cabecera: la etiqueta `Proyecto` pasa a `Producto` sobre el mismo valor, que `Vocabulario-Rules` §3 prohíbe como etiqueta de un plano sobre el valor de otro, y la trazabilidad upstream apunta al `PRODUCT-INTAKE-SelfHosted-Service` renombrado. Sustitución léxica **por ocurrencia** según `Vocabulario-Rules` §9.5 y el plan de migración §3.5, sin ningún reemplazo global de cadena: se revisaron las dos ocurrencias de la cadena `soluci` de este documento y se sustituyó una sola, la que designaba el nivel superior, con su concordancia de género —el nombre del actor primario «Administrador de la solución» de §2, que pasa a «Administrador del producto»—; no hay en este documento ninguna «solución de código» ni ningún uso de prosa de negocio que R2 preserve. La única ocurrencia de la cadena `resoluci` —«re**soluci**ón»— **no es la palabra «solución» y quedó intacta**, con conteo verificado antes y después de la intervención: sustituirlas habría producido la palabra inexistente que la `[5.1]` del framework documenta sobre sí mismo, la que resulta de reemplazar la cadena `soluci` dentro de «re**soluci**ón». De las dieciséis ocurrencias de «proyecto», **ninguna pasó a «proyecto de código»**: diez son «proyecto SelfHosted» y tres son su forma corta con el contexto ya fijado en la misma sección —«el proyecto destino» de los pasos 6 y 10 y de §6, y «el proyecto ya tiene» de FA-02—, las trece la entidad del dominio; dos son el emprendimiento, «agente humano del proyecto» en FA-05 y en §10; la restante era la etiqueta de cabecera. La clasificación sigue el intake §12, que declara los tres referentes del término, y el glosario del dominio de `Vision-Producto.md` §9. **Glosario**: §2.1 y §4.2.4 de la regla convierten el vocabulario de la categoría en el artefacto propio y obligatorio `Glosario-Funcional.md`, que hasta la 3.0 era el punto 6 de `Modelo-Conceptual.md` y por lo tanto dependía de que el proyecto de código tuviera persistencia. Este caso de uso **no lo emite**: los términos que acuña o precisa y que aparecen en más de un artefacto de 02 se devolvieron al lote que lo emite, por la regla de inclusión de §3.3, y los que ya declara el glosario del dominio de `Vision-Producto.md` §9 se referencian en lugar de redefinirse, por la regla de no duplicación de la misma sección. Las once secciones obligatorias de §4.2 ya estaban completas y no se agregó ni se quitó ninguna; la tabla de contenido de §4.1 y la sección opcional §13 que §4.3 admite para `web-monolith` quedan como estaban. Ningún propósito, actor, precondición, paso del flujo principal, flujo alternativo, excepción, postcondición, criterio de aceptación, regla de negocio aplicable, historia de usuario prevista, componente esperado, test previsto ni brecha declarada cambió de enunciado: la migración es léxica y de forma de cabecera. Las filas históricas de esta tabla **no se reescribieron**, por `SDD-Development-Guide.md` §VI.2 |
| 1.1 | 2026-07-29 | **Se declara que la instanciación desvincula.** La versión 1.0 no decía nada sobre qué pasa si la plantilla cambia después de instanciar —verificado: cero menciones en este caso de uso y en CU-17 sobre actualizar instancias o propagar cambios—, y esa pregunta quedaba sin respuesta en toda la especificación. El flujo principal suma dos pasos: el 9 copia la **procedencia** en cada servicio creado, como copia y no como referencia, y el 10 emite el **informe de la instanciación** con sus avisos marcados no bloqueantes; el registro de auditoría pasa al 11. Se agrega **FA-05**, que declara que no pasa nada sobre lo instanciado cuando la plantilla cambia o se borra, con las cuatro consecuencias exigibles y con el argumento de por qué el vínculo es débil. §8 suma CA-06, CA-07 y CA-08. §9 suma RN-15 y RN-39 y dos historias de usuario. §10 corrige que el catálogo es una de siete vías sobre cinco variantes y no la cuarta sobre tres, declara lo propio de esta vía —crear varios servicios de una confirmación, y la obligación de declararlo antes— y remite a RN-39. La versión 1.0 queda archivada en `_legacy/2026-07-29/`. Origen: §22.2 tercera fila y §18.3 `H-3` del documento de trabajo `SDD/Estado/Redefinicion-Servicio.md` v2.0, y la decisión D-14 del agente humano del proyecto |
| 1.0 | 2026-07-29 | Corrección absorbida dentro de la versión 1.0, sin subirla y sin archivar, por la política de versionado de `Master-Prompt.md` §5: el documento está en estado `Propuesto` y la corrección proviene del audit de su propia fase de emisión. §2 suma la declaración de que los nombres de los actores no humanos son denominaciones acuñadas por esta categoría y no componentes declarados, con la salvedad de los seis que sí trazan a una fuente. Ningún actor cambia de nombre y ningún flujo se altera: lo que se corrige es que la categoría afirmaba que todo dato trazaba y trece de los diecinueve nombres de actor no humano no lo cumplían. Origen: hallazgo H-04 del informe [Audit/B-02-03-r1.md](../../Audit/B-02-03-r1.md) |
| 1.0 | 2026-07-29 | Versión inicial, derivada de la necesidad de negocio upstream y de las secciones del intake citadas en la cabecera |

