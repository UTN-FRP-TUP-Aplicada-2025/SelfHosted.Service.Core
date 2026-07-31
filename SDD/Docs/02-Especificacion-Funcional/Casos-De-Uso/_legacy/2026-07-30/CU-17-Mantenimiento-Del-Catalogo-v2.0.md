> **Documento archivado.** Estado: **Superado**. Es la copia completa del estado previo de `CU-17-Mantenimiento-Del-Catalogo.md`, versión **2.0**, archivada el 2026-07-30 por la política de deprecación de `Master-Prompt.md` §5.1 al incorporarse la ronda de decisiones del agente humano del proyecto del 2026-07-30 —`Q-15`, `Q-17`, `Q-27` y la confirmación de `DI-17` a `DI-19`—. La versión vigente es [`CU-17-Mantenimiento-Del-Catalogo.md`](../../CU-17-Mantenimiento-Del-Catalogo.md). **El cuerpo que sigue no se modificó.**
>

---

# CU-17 — Mantenimiento del catálogo de plantillas

**Proyecto de código:** SelfHosted-Service
**Producto:** SelfHosted Service
**Documento:** CU-17-Mantenimiento-Del-Catalogo.md
**Versión:** 2.0
**Estado:** Propuesto
**Fecha:** 2026-07-30
**Autor:** Analista Funcional Senior (AG-02)

**Necesidad de negocio upstream:** [NB-04](../../01-Necesidades-Negocio/Necesidades-De-Negocio/NB-04-Alta-De-Servicio-Sin-Copiar-Y-Adaptar.md)
**Trazabilidad upstream:** PRODUCT-INTAKE-SelfHosted-Service §4 capacidad F-14 y su nota, más la definición de **plantilla** de la nota de los dos ejes; anexo E-6 (el ítem, su envoltorio versionado, la conversión de formatos, los cuatro tipos de parámetro cerrados de §20.6.1, la conversión de secretos de §20.6.2, las dos versiones de §20.6.3 y la colisión de identificador de §20.6.5); anexo E-15, endpoints de listado, alta, exportación e importación del catálogo; E-16 RN-15, RN-30, RN-39; §12, entradas de glosario de catálogo, plantilla, versión de contenido y versión de formato

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

Permitir que el administrador mantenga el catálogo de plantillas reutilizables —listarlo, agregar ítems, guardarlos desde algo ya resuelto, exportarlo e importarlo—, para que resolver una configuración una vez alcance y el activo se pueda llevar a otra instalación.

## 2. Actores

| Actor | Tipo | Rol |
| --- | --- | --- |
| Administrador del producto | Primario | Lista, agrega, exporta e importa ítems del catálogo |
| Módulo de catálogo | Sistema | Persiste los ítems con su versión de formato, emite el envoltorio de exportación y convierte los formatos al importar |

Los nombres de los actores no humanos son **denominaciones acuñadas por esta categoría**, salvo los seis que trazan a una fuente: `Motor de contenedores`, `Destino externo`, `Automatismo de integración continua`, `Sincronizador de estado`, `Módulo de descubrimiento` y `Resolutor de referencias`. Los acuñados no son componentes declarados y no condicionan la descomposición: su correspondencia con los módulos que el intake §17.P.2 sí declara la fija 05-Arquitectura-Tecnica. La convención completa, nombre por nombre, está en [Especificacion-Funcional.md](../Especificacion-Funcional.md) §8.

## 3. Precondiciones

- El administrador tiene sesión iniciada (CU-30).
- Para guardar un servicio como plantilla, existe el servicio ya configurado (CU-03).

## 4. Flujo principal

1. El administrador abre el catálogo.
2. El sistema lista los ítems declarados con su nombre, su categoría y su versión de contenido. El catálogo arranca vacío en una instalación nueva.
3. El administrador agrega un ítem, o guarda como plantilla un subgrafo ya resuelto en un proyecto SelfHosted. Son los **dos únicos caminos por los que el catálogo se puebla**, junto con la importación del paso 7, porque el producto no se distribuye con contenido precargado.
4. Al guardar como plantilla, el sistema **convierte cada variable secreta del servicio en un parámetro de tipo secreto con generación automática, descarta su valor, e informa cuáles convirtió** (RN-15). Propone además parámetros para los valores que varían: nombres, puertos y volúmenes.
5. El sistema valida los parámetros declarados: el tipo pertenece al **conjunto cerrado de cuatro valores**, ningún parámetro de tipo secreto lleva valor por defecto (RN-15), todo hueco de la plantilla tiene su parámetro declarado, y ningún parámetro queda sin uso.
6. El sistema persiste el ítem con su plantilla, sus parámetros y su versión de formato. Si el ítem ya estaba publicado, **incrementa su versión de contenido**, que es distinta de la versión de formato.
7. El administrador solicita exportar el catálogo completo.
8. El sistema emite el archivo con el envoltorio versionado declarado, y **declara en el informe si algún ítem contiene material sensible**. Si la conversión del paso 4 funcionó, ese contador es siempre cero.
9. El administrador aporta un catálogo exportado para importarlo.
10. El sistema convierte de forma determinista los ítems de la versión de formato anterior a la vigente, envolviendo la plantilla en un subgrafo de un nodo, y emite el **informe de la importación** con lo importado, lo convertido y sus avisos.
11. El sistema registra el evento de auditoría de cada operación de escritura (RN-17).

## 5. Flujos alternativos

**FA-01 — Catálogo vacío.**
Disparador: la instalación es nueva y nadie pobló el catálogo.
Pasos: el sistema lista el catálogo vacío y **declara que está vacío en lugar de mostrar una pantalla en blanco**. El producto no se distribuye con contenido precargado: es la decisión **D-16** del agente humano del proyecto, del 2026-07-29, que confirma lo que este flujo alternativo ya declaraba. Hay un **solo nivel** de catálogo, el del usuario.
Punto de retorno: paso 3.

**FA-02 — Importación de un catálogo de formato anterior.**
Disparador: el archivo aportado contiene ítems de la versión de formato previa.
Pasos: la conversión es determinista y sin pérdida; el ítem convertido queda con la versión de formato vigente.
Punto de retorno: paso 9.

**FA-03 — Edición de un ítem existente.**
Disparador: el administrador modifica un ítem ya publicado.
Pasos: se incrementa la versión de contenido del ítem, que es distinta de la versión de formato. **La edición no afecta a los servicios ya instanciados desde ese ítem, y no se les notifica** (RN-39).
Punto de retorno: paso 6.

**FA-04 — Importación de un ítem cuyo identificador ya existe.**
Disparador: el archivo aportado contiene un ítem cuyo identificador ya está en el catálogo.
Pasos: el sistema **lo importa como copia, con un identificador nuevo, y no modifica el existente**. El informe de la importación lo declara como aviso **no bloqueante**: el resto de los ítems del archivo se importa igual.
Punto de retorno: paso 11.

**Por qué se importa como copia y no de las otras dos formas posibles.** Rechazar el ítem hace que un solo choque frustre una importación entera. Pisar el existente **destruye trabajo del usuario en silencio**, y con el vínculo débil de RN-39 no habría forma de recuperarlo, porque los servicios instanciados no conservan el contenido del ítem. Importar como copia no pierde nada y no bloquea nada, a cambio de dejar dos ítems parecidos que el usuario puede comparar y borrar. **Es la única de las tres resoluciones que no destruye información.** Es la especificación de integración `DI-24`, **sin revisar**.

**FA-05 — Borrado de un ítem del que ya se instanciaron servicios.**
Disparador: el administrador borra un ítem que fue usado para crear servicios.
Pasos: el borrado **se permite y no emite advertencia de «en uso»**, porque no está en uso: los servicios instanciados tienen su propio ciclo de vida y conservan una copia de la procedencia, no una referencia (RN-39). Los servicios siguen respondiendo de qué plantilla y qué versión salieron.
Punto de retorno: paso 2.

## 6. Excepciones y errores

| Código | Causa | Respuesta del sistema |
| --- | --- | --- |
| `422` de formato no admitido | El ítem declara una versión de formato distinta de las dos admitidas | Rechazo (RC-14) |
| Importación con pérdida | Un ítem del archivo no puede convertirse | El sistema lo declara en lugar de descartarlo en silencio. El intake declara la conversión como determinista y sin pérdida para el formato anterior; cualquier otro caso se declara |
| Secreto en la plantilla | Se guarda como plantilla un servicio con variables secretas con valor literal | **No es un rechazo: es una conversión con informe.** Cada variable secreta pasa a parámetro de tipo secreto con generación automática, el valor se descarta, y el informe declara cuáles se convirtieron (RN-15). Rechazar dejaría al administrador sin la plantilla y sin camino |
| `422` de valor por defecto sobre secreto | Se declara un valor por defecto sobre un parámetro de tipo secreto | Rechazo: es un literal que vive en la definición y viaja con la exportación. La generación automática es su único mecanismo (RN-15) |
| `422` de tipo de parámetro | Se declara un parámetro con un tipo que no pertenece al conjunto cerrado de cuatro valores | Rechazo con el campo señalado |
| Aviso no bloqueante | Se importa un ítem cuyo identificador ya existe | Se importa como copia con identificador nuevo, el existente no se modifica, y el resto del archivo se importa igual (FA-04) |

## 7. Postcondiciones

**En caso de éxito:** el catálogo refleja los ítems vigentes con su versión de contenido y su versión de formato; el archivo exportado lleva el envoltorio versionado; los ítems importados quedan en la versión de formato vigente; cada escritura dejó su evento de auditoría.

**En caso de fallo:** el catálogo queda en su estado previo y el rechazo identifica el ítem y la causa.

## 8. Criterios de aceptación

| ID | Given | When | Then |
| --- | --- | --- | --- |
| CA-01 | Una instalación nueva | El administrador abre el catálogo | El catálogo aparece vacío: el producto no se distribuye con contenido precargado |
| CA-02 | Un proyecto SelfHosted con dos servicios y su arista ya resueltos | El administrador los guarda como plantilla | El catálogo incorpora un ítem cuyo subgrafo tiene los dos nodos y la arista entre ellos |
| CA-03 | Un catálogo con tres ítems | El administrador lo exporta | El archivo emitido lleva los tres ítems dentro del envoltorio versionado declarado |
| CA-04 | Un archivo de catálogo con ítems de la versión de formato anterior | El administrador lo importa | Cada ítem queda convertido a la versión vigente, con su plantilla envuelta en un subgrafo de un nodo y sin pérdida |
| CA-05 | Un servicio con la variable secreta `POSTGRES_PASSWORD` cargada con un valor real | El administrador lo guarda como plantilla | El ítem resultante lleva un **parámetro de tipo secreto con generación automática** en lugar de la variable, **sin el valor**, y el informe de guardado declara que la convirtió |
| CA-06 | Un ítem en edición | El administrador declara un valor por defecto sobre un parámetro de tipo secreto | El sistema rechaza con `422`: un valor por defecto es un literal que viaja con la exportación |
| CA-07 | Un catálogo con dos ítems, ninguno con material sensible | El administrador lo exporta | El informe de la exportación declara **cero** ítems con material sensible |
| CA-08 | Un catálogo que ya tiene el ítem `cat-postgres-16`, y un archivo de importación que trae tres ítems, uno de ellos con ese mismo identificador | El administrador lo importa | Los tres se importan: dos con su identificador y el que choca **como copia con identificador nuevo**. El existente **no se modifica**, el aviso es no bloqueante, y ninguno de los dos ítems se pierde |
| CA-09 | Un ítem del que ya se instanciaron dos servicios | El administrador borra el ítem | El borrado se permite **sin advertencia de «en uso»**, los dos servicios siguen funcionando y siguen respondiendo de qué plantilla y qué versión salieron |

## 9. Trazabilidad

| Dimensión | Referencia |
| --- | --- |
| Necesidad de negocio | [NB-04](../../01-Necesidades-Negocio/Necesidades-De-Negocio/NB-04-Alta-De-Servicio-Sin-Copiar-Y-Adaptar.md) |
| Reglas de negocio aplicables | RN-15, RN-17, RN-30, RN-39. Reglas conceptuales: RC-14 |
| Historias de usuario a generar en 06 | US-CU-17-1 (listar el catálogo), US-CU-17-2 (guardar un subgrafo resuelto como plantilla), US-CU-17-3 (exportar el catálogo completo), US-CU-17-4 (importar un catálogo exportado), US-CU-17-5 (guardar como plantilla sabiendo qué secretos se convirtieron), US-CU-17-6 (importar un catálogo que choca con un ítem existente sin perder ninguno de los dos), US-CU-17-7 (borrar un ítem sin afectar lo instanciado) |
| Componentes esperados en 05 | Capa `Web`, página del catálogo y controladores de sus recursos; capa `Application`, módulo de catálogo; capa `Domain`, agregado `Catalogo`; capa `Infrastructure`, `Persistencia` y `Exportacion`. Referencia tentativa |
| Tests previstos en 08 | Casos a derivar por 08-Calidad-Y-Pruebas. El anexo E-22 no declara casos propios del mantenimiento del catálogo; el anexo E-6 declara la regla de conversión que hay que verificar |

Los identificadores de historia de usuario llevan la forma `US-CU-XX-n` y son **provisionales**: la numeración definitiva es potestad de 06-Backlog-Tecnico. La forma se eligió para que ningún identificador emitido acá colisione con la numeración que 06 asigne.

## 10. Notas y supuestos

- La exportación y la importación del catálogo son endpoints que el intake incorporó porque la capacidad F-14 los declaraba desde su primera versión sin que la superficie los tuviera.
- La versión de formato del ítem es distinta de la versión de contenido que el usuario publica, y se persiste para poder convertir un catálogo importado sin adivinar su forma.
- **Brecha cerrada en la versión 1.1.** La versión 1.0 declaraba como brecha que el intake no decía si una plantilla podía contener material secreto ni con qué tratamiento. **Está resuelta**: RN-15 v1.1 amplía su alcance a la plantilla del catálogo, y la conversión del paso 4 es el tratamiento. Era la brecha `B-09` de la especificación funcional. El tratamiento es la especificación de integración `DI-21`, **sin revisar**, y se consume declarándola revisable.
- **Qué es una plantilla, y por qué eso ahorra una superficie.** Es **el alta de un servicio sin la cola de despliegue**: declara lo mismo que un alta —origen, comando, variables, puertos, montajes, recursos, política de reinicio, verificación de salud— y no se instancia, no se despliega y no ocupa dirección. La consecuencia de interfaz es directa: **el editor de plantillas es el formulario de alta de CU-03 menos sus pasos 9 y 10**, validar contra el motor y aplicar, y no una superficie nueva que haya que diseñar aparte.
- **Las dos operaciones del catálogo son de naturaleza distinta y conviene nombrarlas distinto en la interfaz.** Instanciar (CU-16) produce **servicios que corren**; mantener (este caso de uso) produce **definiciones que no corren**. El intake lo declara así —«los ítems son definiciones en reposo»— y el glosario lo repite: nada del catálogo corre.
- **Los cuatro tipos de parámetro son un conjunto cerrado** desde el intake v2.4: texto, secreto, imagen y volumen. Antes se inferían de los ejemplos y no estaban enunciados. Es la especificación de integración `DI-22`, **sin revisar**.
- **Brecha declarada, `Q-27`:** con el catálogo vacío en una instalación nueva y sin ninguna forma declarada de explorar un registro de imágenes, un administrador que no sabe la dirección de la imagen que quiere **no tiene camino** en su primer minuto de uso. FA-01 mitiga la mitad del problema —declara el vacío y deriva a las otras vías de alta— y la otra mitad sigue abierta. Destinatario: agente humano del proyecto.
- La presentación del catálogo pertenece a 03-UX-UI-DX.

## 11. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 2.0 | 2026-07-30 | Migración normativa del conjunto 4.1 al 6.0, fase M4 corte 3, bajo `Rules-Especificacion-Funcional` 4.0, `Vocabulario-Rules` 2.1 y `Migracion-Rules` 1.0. Clasificación **regenerar contenido** por el salto major de la regla que lo gobierna; fuente de contenido: el documento de origen, archivado en `_legacy/2026-07-30/CU-17-Mantenimiento-Del-Catalogo-v1.1.md`. Sube **major** porque la nomenclatura anterior deja de cumplir. Cabecera: la etiqueta `Proyecto` pasa a `Producto` sobre el mismo valor, que `Vocabulario-Rules` §3 prohíbe como etiqueta de un plano sobre el valor de otro, y la trazabilidad upstream apunta al `PRODUCT-INTAKE-SelfHosted-Service` renombrado. Sustitución léxica **por ocurrencia** según `Vocabulario-Rules` §9.5 y el plan de migración §3.5, sin ningún reemplazo global de cadena: se revisaron las tres ocurrencias de la cadena `soluci` de este documento y se sustituyó una sola, la que designaba el nivel superior, con su concordancia de género —el nombre del actor primario «Administrador de la solución» de §2, que pasa a «Administrador del producto»—; no hay en este documento ninguna «solución de código» ni ningún uso de prosa de negocio que R2 preserve. Las dos ocurrencias de la cadena `resoluci` —«re**soluci**ón», «re**soluci**ones»— **no son la palabra «solución» y quedaron intactas**, con conteo verificado antes y después de la intervención: sustituirlas habría producido la palabra inexistente que la `[5.1]` del framework documenta sobre sí mismo, la que resulta de reemplazar la cadena `soluci` dentro de «re**soluci**ón». De las cinco ocurrencias de «proyecto», **ninguna pasó a «proyecto de código»**: dos son «proyecto SelfHosted», la entidad del dominio, en el paso 3 y en CA-02; dos son el emprendimiento, «agente humano del proyecto» en FA-01 y en la brecha `Q-27` de §10; la restante era la etiqueta de cabecera. La clasificación sigue el intake §12, que declara los tres referentes del término, y el glosario del dominio de `Vision-Producto.md` §9. **Glosario**: §2.1 y §4.2.4 de la regla convierten el vocabulario de la categoría en el artefacto propio y obligatorio `Glosario-Funcional.md`, que hasta la 3.0 era el punto 6 de `Modelo-Conceptual.md` y por lo tanto dependía de que el proyecto de código tuviera persistencia. Este caso de uso **no lo emite**: los términos que acuña o precisa y que aparecen en más de un artefacto de 02 se devolvieron al lote que lo emite, por la regla de inclusión de §3.3, y los que ya declara el glosario del dominio de `Vision-Producto.md` §9 se referencian en lugar de redefinirse, por la regla de no duplicación de la misma sección. Las once secciones obligatorias de §4.2 ya estaban completas y no se agregó ni se quitó ninguna; la tabla de contenido de §4.1 y la sección opcional §13 que §4.3 admite para `web-monolith` quedan como estaban. Ningún propósito, actor, precondición, paso del flujo principal, flujo alternativo, excepción, postcondición, criterio de aceptación, regla de negocio aplicable, historia de usuario prevista, componente esperado, test previsto ni brecha declarada cambió de enunciado: la migración es léxica y de forma de cabecera. Las filas históricas de esta tabla **no se reescribieron**, por `SDD-Development-Guide.md` §VI.2 |
| 1.1 | 2026-07-29 | **Se declara la conversión de secretos al guardar como plantilla, y qué pasa al importar un identificador ya existente.** Eran las dos filas que §22.2 pedía y las dos estaban sin cubrir. El flujo principal pasa de nueve a once pasos: se inserta el 4, la **conversión de variables secretas a parámetro con generación automática** con su informe; el 5, la **validación de los parámetros** contra el conjunto cerrado de tipos y contra la prohibición del valor por defecto sobre secreto; el 6 declara el incremento de la versión de contenido; y el 8 declara el contador de material sensible de la exportación. Se agregan **FA-04**, importar un identificador ya existente como copia, con el argumento de por qué es la única de las tres resoluciones que no destruye información, y **FA-05**, borrar un ítem del que se instanciaron servicios. FA-01 declara la decisión D-16 y el único nivel de catálogo; FA-03 declara que editar no afecta lo instanciado (RN-39). §6 reemplaza la fila de secreto en la plantilla, que remitía a una brecha, por la conversión con informe, y suma tres filas. §8 suma CA-05 a CA-09. §9 suma RN-39 y tres historias de usuario. §10 **cierra la brecha B-09**, declara qué es una plantilla con su consecuencia de que el editor es el formulario de alta menos dos pasos, declara que las dos operaciones del catálogo son de naturaleza distinta, y abre la brecha `Q-27`. La versión 1.0 queda archivada en `_legacy/2026-07-29/`. Origen: §22.2 cuarta fila, §18.3 `H-2` y §20.4 del documento de trabajo `SDD/Estado/Redefinicion-Servicio.md` v2.0 |
| 1.0 | 2026-07-29 | Corrección absorbida dentro de la versión 1.0, sin subirla y sin archivar, por la política de versionado de `Master-Prompt.md` §5: el documento está en estado `Propuesto` y la corrección proviene del audit de su propia fase de emisión. §2 suma la declaración de que los nombres de los actores no humanos son denominaciones acuñadas por esta categoría y no componentes declarados, con la salvedad de los seis que sí trazan a una fuente. Ningún actor cambia de nombre y ningún flujo se altera: lo que se corrige es que la categoría afirmaba que todo dato trazaba y trece de los diecinueve nombres de actor no humano no lo cumplían. Origen: hallazgo H-04 del informe [Audit/B-02-03-r1.md](../../Audit/B-02-03-r1.md) |
| 1.0 | 2026-07-29 | Versión inicial, derivada de la necesidad de negocio upstream y de las secciones del intake citadas en la cabecera |

