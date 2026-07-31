# 03-UX-UI-DX — SelfHosted Service

**Proyecto de código:** SelfHosted-Service
**Producto:** SelfHosted Service
**Documento:** README.md
**Versión:** 2.3
**Estado:** Propuesto
**Fecha:** 2026-07-30
**Autor:** UX/UI Designer + Frontend Lead (AG-03)
**Variante:** UX/UI

Punto de entrada navegable de la categoría, para revisores externos: 05-Arquitectura-Tecnica, 06-Backlog-Tecnico, 08-Calidad-Y-Pruebas, y AG-03M en la Fase B2 de validación visual de maqueta.

---

## Tabla de contenido

- [1. Por dónde empezar](#1-por-dónde-empezar)
- [2. Variante aplicada y por qué](#2-variante-aplicada-y-por-qué)
- [3. Estructura de la carpeta](#3-estructura-de-la-carpeta)
- [4. Artefactos vigentes](#4-artefactos-vigentes)
  - [4.1 Marco y vocabulario](#41-marco-y-vocabulario)
  - [4.2 Superficies](#42-superficies)
  - [4.3 Representaciones](#43-representaciones)
- [5. Insumos normativos de diseño aplicados](#5-insumos-normativos-de-diseño-aplicados)
- [6. Contradicciones declaradas](#6-contradicciones-declaradas)
- [7. Brechas abiertas de esta categoría](#7-brechas-abiertas-de-esta-categoría)
  - [7.1 Las tres pendencias que `02-Especificacion-Funcional` transfirió como B-07](#71-las-tres-pendencias-que-02-especificacion-funcional-transfirió-como-b-07)
  - [7.2 La brecha retirada y las que quedaron cerradas](#72-la-brecha-retirada-y-las-que-quedaron-cerradas)
  - [7.3 Las veintidós restantes, por destinatario](#73-las-veintidós-restantes-por-destinatario)
- [8. Qué consume cada categoría downstream](#8-qué-consume-cada-categoría-downstream)
- [9. Qué le toca a la Fase B2](#9-qué-le-toca-a-la-fase-b2)
- [10. Control de cambios](#10-control-de-cambios)

---

## 1. Por dónde empezar

[Experiencia-De-Uso.md](Experiencia-De-Uso.md) es el marco de la categoría: trae la persona objetivo, el catálogo de diseño aplicado, las cuatro capacidades transversales con su contrato, los ocho flujos clave, el mapa de estados de las **diecinueve** superficies, el compromiso de accesibilidad, los umbrales de performance percibida, el catálogo de códigos de resultado y la trazabilidad bidireccional entre superficies y casos de uso. Sus §10.1 y §10.2 concentran las contradicciones y las brechas.

Un revisor que sólo quiera entender cómo se siente el producto puede leer, en este orden: [Wireframes-Lienzo-Del-Proyecto.md](Wireframes/Wireframes-Lienzo-Del-Proyecto.md), que es la pantalla principal; [Wireframes-Panel-Lateral-Del-Servicio.md](Wireframes/Wireframes-Panel-Lateral-Del-Servicio.md), que es la superficie de configuración más densa; [Wireframes-Cajon-De-Cambios-Pendientes.md](Wireframes/Wireframes-Cajon-De-Cambios-Pendientes.md), que es la edición transaccional; y [Wireframes-Descubrimiento-E-Incorporacion.md](Wireframes/Wireframes-Descubrimiento-E-Incorporacion.md), que es el flujo diferencial del producto.

## 2. Variante aplicada y por qué

La tabla §1.2 de `Rules-UX-UI-DX.md` asigna al tipo `web-monolith` la fila que se transcribe literal:

| Tipo | Variante | Especialidad específica | Justificación |
| --- | --- | --- | --- |
| web-monolith | UX/UI | UX/UI Designer + Frontend Lead | El usuario final recorre pantallas en navegador. Se diseña experiencia, layout, estados y accesibilidad de cada vista. |

Se asume además la especialidad base de §1.1: especialista en experiencia, equivalente AG-03, alineado con ISO 9241-210 para el proceso centrado en personas, WCAG 2.2 nivel AA como piso de accesibilidad, las heurísticas de Nielsen y las reglas de Shneiderman para la inspección, y el marco Diátaxis para documentación orientada al developer, que en este producto no aplica.

**Verificación de §1.3, multi-especialidad.** La regla admite combinar con otras cinco especialidades. Se verifica una por una:

| Combinación admitida por §1.3 | ¿Se cumple la condición? | Consecuencia |
| --- | --- | --- |
| AG-02 Analista Funcional, para anclar cada flujo en un caso de uso con interacción humana | **Sí, parcialmente.** Los flujos y las superficies se anclan en los **39** casos de uso ya emitidos | Se aplica como consumo de upstream, no como coautoría. `02-Especificacion-Funcional` está emitida y auditada, y esta categoría no la modifica |
| AG-04 Ingeniero de Prompts, cuando una pantalla dispara un flujo asistido por un modelo de lenguaje | **No.** Ninguna superficie de este producto lo hace. La ranura del asistente que se reserva está deshabilitada y no dispara nada | No se aplica. Ver la contradicción `C-UX-03` |
| AG-05 Arquitecto, para alinear el wireframe con la arquitectura de la capa de presentación | **No todavía.** `05-Arquitectura-Tecnica` no está emitida | No se aplica como coautoría. Esta categoría le delega lo que le corresponde y lo declara en cada wireframe |
| AG-08 QA, para que los estados visuales sean automatizables | **Sí, parcialmente.** Cada wireframe declara su tabla de estados con la condición que produce cada uno | Se aplica como delegación: `08-Calidad-Y-Pruebas` es titular de la verificación |
| AG-10 Technical Writer, para alinear el tono de los mensajes | **No todavía.** `11-Documentacion` no está emitida | No se aplica. El microcopy exacto lo cierra la Fase B2 sobre la maqueta; lo que esta categoría fija son las elecciones de vocabulario de [Glosario-UX.md](Glosario-UX.md) §6 |

Los dos casos de **combinación explícita de variantes** que §1.3 declara —portal de developers en una interfaz programática, y frontend más kit de desarrollo público— **no se dan**: el indicador `tiene_portal_developers` es falso y no hay integradores externos. Por lo tanto **no se produce ningún artefacto de la rama DX**, que la tabla §2.1 declara obligatorios sólo para tipos sin interfaz final.

## 3. Estructura de la carpeta

La salida va directo bajo `SDD/Docs/03-UX-UI-DX/`, sin subnivel de proyectos: el producto tiene un único proyecto de código y la categoría se genera plana, en el caso degenerado que el manifiesto declara.

| Ruta | Contenido |
| --- | --- |
| [Experiencia-De-Uso.md](Experiencia-De-Uso.md) | Marco de experiencia con sus once secciones obligatorias |
| [Glosario-UX.md](Glosario-UX.md) | Vocabulario de la categoría, sin duplicar los dos glosarios upstream |
| [Wireframes/](Wireframes/) | 19 superficies, una por archivo |
| [Representaciones/](Representaciones/) | 4 representaciones reutilizadas entre superficies |
| `_legacy/`, `Wireframes/_legacy/`, `Representaciones/_legacy/` | Copias archivadas de las versiones superadas, con su sufijo de versión y fechadas por operación |

Las dos subcarpetas son una decisión de navegabilidad de esta categoría y no una exigencia de `Rules-UX-UI-DX.md`, que no las prescribe ni las prohíbe. Se adoptan por el mismo criterio con el que `02-Especificacion-Funcional` separó sus casos de uso y sus reglas: veintiún archivos en una carpeta plana no son navegables.

Ningún archivo de la carpeta de trabajo lleva sufijo de versión en el nombre: la versión vive en el campo de su cabecera, según D4. **El archivado va al `_legacy/` de la propia carpeta de cada artefacto** y no a un único `_legacy/` en la raíz de la categoría, que es lo que `Migracion-Rules.md` §4.2 regla 1 dice y lo que esta categoría venía haciendo desde el 2026-07-29. Hay dos fechas de archivado: `2026-07-29`, de la emisión de la versión 1.1, y `2026-07-30`, de la migración normativa al conjunto 6.0.

## 4. Artefactos vigentes

**Veintiséis artefactos**, todos en estado `Propuesto`, verificado en disco el 2026-07-30: este índice, el marco de experiencia, el glosario, los **diecinueve** wireframes y las cuatro representaciones.

**Las versiones ya no son uniformes, y el reparto se declara.** Los veinticinco artefactos que existían subieron a **2.0** en la migración normativa del conjunto 4.1 al 6.0, fase M4 corte 4, por el salto `Rules-UX-UI-DX` 2.0 → 4.0 —el glosario subió además porque el artefacto pasó de **recomendado a obligatorio**—. Sobre eso, la retroalimentación del paso 6 de la Fase B2 del 2026-07-30 se aplicó en **dos rondas**, y el reparto verificado en disco es:

| Versión | Cuántos | Cuáles |
| --- | --- | --- |
| **2.3** | 2 | Este índice y el marco de experiencia, que la corrección del hallazgo `P2` del audit vuelve a tocar |
| **2.2** | 1 | El glosario |
| **2.1** | 6 | Los wireframes de `SUP-06`, `SUP-09`, `SUP-11`, `SUP-12`, `SUP-17` y `SUP-18` |
| **1.0** | 1 | El wireframe de `SUP-19`, **nuevo** |
| **2.0** | 16 | Los **doce** wireframes restantes y las cuatro representaciones, **que no se tocaron** |

**La columna «cuántos» suma 26 y cada fila se contó en disco**, no se derivó de la anterior. Es la corrección del hallazgo `P2`: la versión 2.2 declaraba «trece wireframes restantes» acá y en §4.2, y en disco son **doce**.

Este README referencia únicamente la versión vigente de cada nombre lógico, según `Rules-UX-UI-DX.md` §3.5 punto 3.

### 4.1 Marco y vocabulario

| Artefacto | Versión | Propósito |
| --- | --- | --- |
| [Experiencia-De-Uso.md](Experiencia-De-Uso.md) | 2.2 | Marco de experiencia: audiencia, principios, ocho flujos clave, estados, accesibilidad, internacionalización, performance percibida, errores, trazabilidad, notas y control de cambios |
| [Glosario-UX.md](Glosario-UX.md) | 2.2 | Términos de superficie, de estado, de las cuatro capacidades transversales y de forma del artefacto; los términos referenciados a los dos glosarios upstream; la familia polisémica «resolución»; y las elecciones de microcopy fijadas |

### 4.2 Superficies

Las once primeras corresponden a nodos del mapa de navegación del anexo E-18 del intake; **las ocho últimas** declaran de dónde salen, porque ese anexo no las maqueta. **Doce** están en versión 2.0; `SUP-06`, `SUP-09`, `SUP-11`, `SUP-12`, `SUP-17` y `SUP-18` en 2.1; y `SUP-19` en 1.0. **Doce más seis más uno son los diecinueve**, contado en disco.

**Este índice no repite la correspondencia con los casos de uso.** `Rules-UX-UI-DX.md` §3.4 le exige a este README el artefacto, su propósito, la variante y el estado, no la trazabilidad; y una correspondencia enunciada en varios lugares sin fuente declarada deriva. La fuente única es [Experiencia-De-Uso.md](Experiencia-De-Uso.md) §9.2, y su inversión para verificar cobertura está en §9.3.

| # | Superficie | Wireframe |
| --- | --- | --- |
| SUP-01 | Aprovisionamiento inicial | [Wireframes-Aprovisionamiento-Inicial.md](Wireframes/Wireframes-Aprovisionamiento-Inicial.md) |
| SUP-02 | Acceso al panel | [Wireframes-Acceso-Al-Panel.md](Wireframes/Wireframes-Acceso-Al-Panel.md) |
| SUP-03 | Cambio de contraseña | [Wireframes-Cambio-De-Contrasena.md](Wireframes/Wireframes-Cambio-De-Contrasena.md) |
| SUP-04 | Listado de proyectos | [Wireframes-Listado-De-Proyectos.md](Wireframes/Wireframes-Listado-De-Proyectos.md) |
| SUP-05 | Lienzo del proyecto | [Wireframes-Lienzo-Del-Proyecto.md](Wireframes/Wireframes-Lienzo-Del-Proyecto.md) |
| SUP-06 | Panel lateral del servicio | [Wireframes-Panel-Lateral-Del-Servicio.md](Wireframes/Wireframes-Panel-Lateral-Del-Servicio.md) |
| SUP-07 | Cajón de cambios pendientes | [Wireframes-Cajon-De-Cambios-Pendientes.md](Wireframes/Wireframes-Cajon-De-Cambios-Pendientes.md) |
| SUP-08 | Registro del contenedor | [Wireframes-Registro-Del-Contenedor.md](Wireframes/Wireframes-Registro-Del-Contenedor.md) |
| SUP-09 | Tablero de estado | [Wireframes-Tablero-De-Estado.md](Wireframes/Wireframes-Tablero-De-Estado.md) |
| SUP-10 | Descubrimiento e incorporación | [Wireframes-Descubrimiento-E-Incorporacion.md](Wireframes/Wireframes-Descubrimiento-E-Incorporacion.md) |
| SUP-11 | Catálogo de plantillas | [Wireframes-Catalogo-De-Plantillas.md](Wireframes/Wireframes-Catalogo-De-Plantillas.md) |
| SUP-12 | Configuración del sistema | [Wireframes-Configuracion-Del-Sistema.md](Wireframes/Wireframes-Configuracion-Del-Sistema.md) |
| SUP-13 | Variables compartidas del proyecto | [Wireframes-Variables-Compartidas-Del-Proyecto.md](Wireframes/Wireframes-Variables-Compartidas-Del-Proyecto.md) |
| SUP-14 | Informe de conflicto de direcciones | [Wireframes-Informe-De-Conflicto-De-Direcciones.md](Wireframes/Wireframes-Informe-De-Conflicto-De-Direcciones.md) |
| SUP-15 | Exportación e importación | [Wireframes-Exportacion-E-Importacion.md](Wireframes/Wireframes-Exportacion-E-Importacion.md) |
| SUP-16 | Revisión de higiene | [Wireframes-Revision-De-Higiene.md](Wireframes/Wireframes-Revision-De-Higiene.md) |
| SUP-17 | Alta de servicio | [Wireframes-Alta-De-Servicio.md](Wireframes/Wireframes-Alta-De-Servicio.md) |
| SUP-18 | Imágenes | [Wireframes-Imagenes.md](Wireframes/Wireframes-Imagenes.md) |
| SUP-19 | Exploración de registro de imágenes | [Wireframes-Exploracion-De-Registro-De-Imagenes.md](Wireframes/Wireframes-Exploracion-De-Registro-De-Imagenes.md) |

El mínimo que la tabla de adaptabilidad fija para `web-monolith` es de cuatro superficies clave. El anexo E-18 declara más, y la cobertura de los casos de uso con interacción humana relevante llevó la cuenta a dieciocho en la versión 1.1 —`SUP-17`, alta de servicio, y `SUP-18`, imágenes— y a **diecinueve** el 2026-07-30, con `SUP-19`, exploración de registro de imágenes, que la decisión `Q-27` del agente humano del proyecto declara explícitamente como superficie nueva con wireframe propio.

**Cobertura.** Los **39** casos de uso de `02-Especificacion-Funcional` tienen superficie, con una excepción declarada: CU-33, disparo de despliegue con credencial de ámbito mínimo, cuyo actor es el automatismo de integración continua y cuya superficie es la interfaz programática. La correspondencia completa, en las dos direcciones, está en [Experiencia-De-Uso.md](Experiencia-De-Uso.md) §9.2 y §9.3.

### 4.3 Representaciones

Las cuatro en versión 2.0.

| Representación | Versión | Propósito | Superficies que la invocan |
| --- | --- | --- | --- |
| [Representacion-Nodo-De-Servicio.md](Representaciones/Representacion-Nodo-De-Servicio.md) | 2.0 | Anatomía del nodo del lienzo, con el origen de cada dato | SUP-05 |
| [Representacion-Lenguaje-Visual-De-Estados.md](Representaciones/Representacion-Lenguaje-Visual-De-Estados.md) | 2.0 | Contrato visual de estados y su correspondencia con el catálogo base y con el estado del motor de contenedores | SUP-04, SUP-05, SUP-06, SUP-09, SUP-10 |
| [Representacion-Banda-De-Resultado.md](Representaciones/Representacion-Banda-De-Resultado.md) | 2.0 | Banda de resultado por código de las superficies de identidad | SUP-01, SUP-02, SUP-03, SUP-04, SUP-14 |
| [Representacion-Sello-De-Version.md](Representaciones/Representacion-Sello-De-Version.md) | 2.0 | Sello de versión y detalle de diagnóstico, en sus dos ubicaciones obligatorias | SUP-02, SUP-12 |

## 5. Insumos normativos de diseño aplicados

Seis documentos de reglas del catálogo `Devs/References/Design/`, más su índice, cargados por él y apilados en el orden que su §4.1 declara. Esta categoría **no define ningún token visual propio**.

| Documento | Versión | Condición de carga verificada |
| --- | --- | --- |
| `Index-Design-Rules.md` | 1.3 | Punto de entrada del catálogo |
| `Design-Rules-Web-Generico.md` | 1.2 | Base obligatoria de todo proyecto con interfaz web |
| `Design-Rules-Blazor-Mudblazor.md` | 1.2 | El stack declarado en la Parte C del intake es el que esta especialización cubre |
| `Design-Rules-Config-Esquema.md` | 1.1 | El usuario fija parámetros: CU-03, CU-19, CU-32, CU-34 |
| `Design-Rules-Primer-Arranque.md` | 1.0 | Se despliega por instancia y arranca sin administrador creado: CU-29 |
| `Design-Rules-Acceso-Monousuario.md` | 1.0 | Una sola identidad de operación, sin roles ni gestión de usuarios |
| `Design-Rules-Identidad-De-Version.md` | 1.0 | Produce imágenes de contenedor etiquetadas por etapa cerrada |

Las cuatro extensiones por capacidad cargan a la vez, que es lo que el índice declara como arquetipo de panel de control monolítico de un servicio específico. Las tres notas de coherencia del subárbol se leyeron; la única consecuencia operativa es que los esqueletos en arte ASCII de las extensiones son referencia de composición y no wireframes del proyecto, de modo que estos wireframes los referencian por nombre de patrón en lugar de copiarlos.

Cada artefacto declara, en su tabla de trazabilidad, **qué documentos del catálogo aplicó y en qué secciones**.

## 6. Contradicciones declaradas

Cinco, todas desarrolladas en [Experiencia-De-Uso.md](Experiencia-De-Uso.md) §10.1. Se declaran en lugar de resolverse en silencio. El audit independiente de la Fase B verificó las cuatro primeras y las declaró reales; la quinta la incorpora esa misma revisión.

| # | Contradicción | Cómo se trató |
| --- | --- | --- |
| C-UX-01 | El estado «pendiente de aplicar» tiene fila y color exclusivo en el anexo E-18, y no tiene estado semántico correspondiente en el catálogo base, que además prohíbe definir tokens por proyecto | No se define el token. Los wireframes nombran el estado por su nombre semántico y su insignia y su borde ya lo distinguen sin depender del color. Se escala como brecha `B-UX-05` al mantenedor del catálogo |
| C-UX-02 | La extensión de configuración por esquema exige declarar un modo simulación; ninguna fuente de este producto declara uno. El conjunto de cambios pendientes cumple previsualizar, confirmar y no aplicar directo, pero **calcula qué se va a redesplegar, no prueba qué va a pasar** | No se dibuja un indicador de modo simulación. Se declara requisito por requisito qué se cumple y qué no, y se escala como brecha `B-UX-08` |
| C-UX-03 | `Rules-UX-UI-DX.md` §1.4 obliga a reservar la ranura del asistente; ninguna fuente de este producto declara asistencia de un modelo de lenguaje | **Se aplica la regla**, por ser normativa y explícita: la ranura se reserva deshabilitada en el cajón de cambios pendientes. **Resuelta:** el audit confirmó que la ranura es forward-compat y que su caso de uso es precisamente el de una capacidad que todavía no existe, de modo que la regla no admite no aplicarse. El defecto quedó contra el repositorio fuente como `R-3` y `B-UX-09` pasa a cerrada |
| C-UX-04 | El anexo E-17 exige que la interfaz distinga «pausado» y «finalizado»; el contrato visual del anexo E-18 no tiene fila para ninguno de los dos | No se inventan dos filas del contrato. Los dos estados se exhiben por **etiqueta textual** sobre el par neutro, y se escala como brecha `B-UX-12`. **Confirmada como defecto del intake**, elevada como `R-6`; el audit declaró correcto el tratamiento |
| C-UX-05 | El intake ubica el cierre de sesión dentro de un menú de usuario; `Design-Rules-Acceso-Monousuario.md` §4.3 y §6 exigen que esté siempre visible y a un clic, y su §10 enumera el menú anidado como anti-patrón | Se aplica el catálogo, porque lo que el intake describe es una forma de interfaz y no un requisito funcional. Elevada acá para que reciba el mismo tratamiento que las otras cuatro, según el hallazgo `H-16`. **No genera brecha**: las dos fuentes declaran el dato y esta categoría elige con su motivo |

## 7. Brechas abiertas de esta categoría

**Veinticinco vigentes**, sobre **treinta identificadores emitidos**, `B-UX-01` a `B-UX-30`. Ninguna se resuelve acá: es la precaución que la Fase A dejó asentada para la Fase B, y que esta cadena ya tuvo que corregir tres veces. **La tabla completa, con la ubicación, el destinatario y el estado de cada una, está en [Experiencia-De-Uso.md](Experiencia-De-Uso.md) §10.2, que es la fuente canónica**; este índice reparte por destinatario y no repite el enunciado.

El audit independiente de la Fase B evaluó una a una las veinte que esta categoría había declarado en su versión 1.0: **catorce confirmadas, cinco acotadas** —su enunciado sobredimensionaba lo ausente y se ajustó a la evidencia— **y una retirada por falsa**. Se sumaron dos que el propio audit destapó, `B-UX-21` y `B-UX-22`, y **cinco más en la versión 1.1** del marco, `B-UX-23` a `B-UX-27`, al incorporarse las superficies `SUP-17` y `SUP-18`. `B-UX-09` pasó a cerrada. Los identificadores retirados y cerrados conservan su fila. **La retroalimentación del paso 6 de la Fase B2, el 2026-07-30, cerró dos más** —`B-UX-23`, porque `Q-27` se decidió y la superficie que declaraba está emitida, y `B-UX-26`, porque `Q-15` se decidió en positivo—, **acotó `B-UX-27`** de cinco tramos a tres, y **abrió tres**, `B-UX-28` a `B-UX-30`. **La segunda ronda del mismo día cerró `B-UX-30`**, que era trabajo de esta categoría y no una decisión a elevar: la propagación se aplicó a las cuatro superficies que enumeraba, **verificando una por una que las alcanzara**, y ninguna quedó fuera.

**Recuento reconciliado en esta versión.** La versión 1.1 de este índice declaraba «veinte vigentes sobre veintidós identificadores emitidos» y su §7.3 repartía diecisiete: es el estado anterior a que el marco sumara `B-UX-23` a `B-UX-27` en esa misma versión. El recuento de acá se **deriva de la tabla canónica del hermano** —verificada en disco el 2026-07-30: veintisiete identificadores, una retirada y una cerrada— y no de una decisión de este documento. Se declara el ajuste en lugar de aplicarlo en silencio.

### 7.1 Las tres pendencias que `02-Especificacion-Funcional` transfirió como B-07

| # | Pendencia | Estado |
| --- | --- | --- |
| B-UX-01 | Distinción visual entre las aristas que declaran espera y las que no | **Abierta.** Ninguna regla del catálogo cubre la representación de aristas, de modo que no hay derivación posible. Se declaran las **tres restricciones** que cualquier resolución debe cumplir. Destinatario: agente humano del proyecto |
| B-UX-02 | Maquetado del paso de clasificación de variables de la incorporación | **Resuelta por derivación**, campo por campo, de la carga útil del anexo E-11 y de las reglas RA-05 y RA-06 del anexo E-7. La derivación se declara para que sea impugnable. Destinatario: agente humano del proyecto, para confirmarla |
| B-UX-03 | Maquetado de la pantalla de variables compartidas | **Resuelta por derivación** de los campos del anexo E-1 y del cambio de entidad proyecto del anexo E-5. Misma condición que la anterior |

Las tres las confirmó el audit contra el literal del anexo E-18.

### 7.2 La brecha retirada y las que quedaron cerradas

| # | Qué declaraba | Por qué se retira o se cierra |
| --- | --- | --- |
| B-UX-15 | Que los anchos de ventana del comportamiento responsivo no estaban declarados | **Retirada por falsa.** `Design-Rules-Web-Generico.md` §8 sí declara el punto de quiebre principal alrededor de 768 px y el piso de 320 px sin desplazamiento horizontal, y los dieciséis wireframes ya los aplicaban. Lo delegado por `Compatibilidad-Plataformas.md` §4 son los anchos de **verificación**, que son otra cosa. Ver [Experiencia-De-Uso.md](Experiencia-De-Uso.md) §10.2.1 |
| B-UX-09 | Que la ranura del asistente reservaba lugar para una capacidad fuera del alcance | **Cerrada.** El audit se pronunció a favor de aplicar la regla; el defecto es del repositorio fuente y quedó como `R-3` |
| B-UX-23 | Que el primer minuto de uso no tenía camino para quien no sabe una dirección de imagen, y que la respuesta a `Q-27` decidía entre una superficie nueva y una línea de ayuda | **Cerrada el 2026-07-30.** `Q-27` decidida: **hay exploración**, y por lo tanto es la superficie nueva, emitida como `SUP-19`. Lo que queda del hueco —dónde se configura el conjunto de registros explorables— es `B-UX-29` |
| B-UX-26 | Que el digesto de la imagen en uso dependía de que alguien lo registrara, y que sin eso el panel lateral y el inventario no tenían qué mostrar | **Cerrada el 2026-07-30.** `Q-15` decidida en positivo: el despliegue registra el digesto. La propagación al panel lateral se aplicó en la segunda ronda del mismo día: `SUP-06` 2.1 §3.5 |
| B-UX-30 | La propagación pendiente a `SUP-06`, `SUP-09`, `SUP-11` y `SUP-12`, que la primera ronda del 2026-07-30 no alcanzó | **Cerrada el 2026-07-30.** Se verificó una por una si la propagación alcanzaba a las cuatro: **alcanza a las cuatro**. `SUP-09` y `SUP-12` ganan contenido por `Q-17`; `SUP-06` y `SUP-11` tenían una brecha declarada abierta que dejó de estarlo, por `Q-15` y `Q-27`. No se abrió ninguna brecha nueva |

### 7.3 Las veintidós restantes, por destinatario

| Destinatario | Brechas |
| --- | --- |
| Agente humano del proyecto | `B-UX-08` modo simulación; `B-UX-10` política de contraseña y control de intentos; `B-UX-12` estados pausado y finalizado; `B-UX-14` confirmación al eliminar un proyecto SelfHosted; `B-UX-17` superficies fuera del mapa de navegación; `B-UX-18` dependencia entre cambios; `B-UX-21` separador decimal; `B-UX-25` origen del servicio no editable; `B-UX-27` **tres** tramos de la superficie de imágenes dependientes de decisiones abiertas; `B-UX-28` valores por defecto del umbral de la sugerencia de limpieza; `B-UX-29` los tres datos sin declarar de la exploración de registro de imágenes |
| Agente humano del proyecto y `05-Arquitectura-Tecnica` | `B-UX-04` descriptores sin leyenda ni ejemplos; `B-UX-06` prefijo de nombre reservado sin clasificar; `B-UX-11` política de sesión; `B-UX-13` filtrado de secretos en el registro; `B-UX-16` destino del respaldo |
| `05-Arquitectura-Tecnica` y `09-Devops` | `B-UX-07` contrato de identidad de versión |
| `05-Arquitectura-Tecnica` | `B-UX-19` lectura no disponible; `B-UX-20` frecuencia de la revisión periódica |
| Mantenedor del catálogo de diseño | `B-UX-05` token del estado pendiente de aplicar |
| `08-Calidad-Y-Pruebas` | `B-UX-22` la confirmación escrita no tiene caso ejecutable en el anexo E-22 |
| `03-UX-UI-DX`, en la revisión de la representación de estados | `B-UX-24` el lenguaje visual de estados no tiene señal para el nodo borrador |

**Advertencia de consumo heredada, acotada el 2026-07-30.** **Diecinueve de las veinticuatro** especificaciones derivadas del intake siguen sin revisar —`DI-17`, `DI-18` y `DI-19` quedaron **confirmadas** en la ronda del 2026-07-30 y se consumen como decisión cerrada—, incluidas las ocho que su versión 2.4 agrega y que nacen sin revisar. Las reglas de negocio que esta categoría cita y que están alcanzadas por esa condición se consumen **declarándolas revisables** y nunca como requisito cerrado del cliente.

## 8. Qué consume cada categoría downstream

| Categoría | Qué consume de acá |
| --- | --- |
| 05-Arquitectura-Tecnica | Los requisitos no funcionales de la capa de presentación: los umbrales de performance percibida de [Experiencia-De-Uso.md](Experiencia-De-Uso.md) §7, la frontera entre configuración de aplicación y de entorno de §2.5, el contrato del predicado de aprovisionamiento de §2.4, y las siete brechas que esta categoría le delega |
| 06-Backlog-Tecnico | Los criterios de aceptación visuales: la tabla de estados de cada wireframe y la tabla de interacciones, que son lo que cada historia de usuario tiene que satisfacer. La numeración de las historias sigue siendo potestad de esa categoría |
| 08-Calidad-Y-Pruebas | Los escenarios de snapshot por estado —227 estados declarados sobre dieciséis superficies, de los cuales 204 son demostrables; **la cifra es la de la versión 1.0 y no incluye los estados de `SUP-17` ni de `SUP-18`, y el recuento sobre las dieciocho superficies queda pendiente**—, los tests de accesibilidad WCAG 2.2 AA de [Experiencia-De-Uso.md](Experiencia-De-Uso.md) §5, y el criterio verificable de la restricción de navegador |
| 09-Devops | Nada directamente. Recibe por vía de `05` el contrato de identidad de versión que la brecha `B-UX-07` deja abierto |
| 11-Documentacion | Las elecciones de vocabulario de [Glosario-UX.md](Glosario-UX.md) §6, para alinear el tono sin contradecirlas |
| AG-03M, Fase B2 | Los **diecinueve** nombres canónicos de superficie, las tablas de estados como lista de lo que la maqueta debe demostrar, y los ocho flujos clave como rutas de navegación a materializar. **La restricción sobre `SUP-18` se retira**: `Q-15` y `Q-17` están cerradas y la superficie ya se construye. **`SUP-19` se construye desde cero**, no se rehace. Ver §9 |

## 9. Qué le toca a la Fase B2

El indicador `requiere_maqueta` es verdadero. Lo que esta categoría redacta **no cierra en su propio audit**: se materializa después en una maqueta navegable que el agente humano del proyecto valida, y esa validación vuelve.

**Dos cosas quedan sin decidir y no se deciden acá.** Las dos las levantó el corte 4 de la migración normativa y las dos son de la Fase B2, no del salto de la regla:

- **El flag `requiere_maqueta` no está declarado con valor en ninguna parte.** El [`PRODUCT-MANIFEST`](../../Intake/PRODUCT-MANIFEST-SelfHosted-Service.md) §1.1 declara `Maqueta-Rules` 2.0 y `Deriva-Rules` 2.0 «como previstas» y las deja **sujetas a la confirmación del flag**, que no aparece con valor en el manifiesto ni en el intake. Esta categoría y [Experiencia-De-Uso.md](Experiencia-De-Uso.md) §9.1 lo afirman verdadero, y con una maqueta ya construida la ambigüedad es real. **Destinatario: agente humano del proyecto.**
- **Las siete filas de capacidad y de Fase B2 de la tabla de trazabilidad de `Rules-UX-UI-DX.md` §4.3 viven en un solo lugar y tres de ellas todavía no tienen valor.** [Experiencia-De-Uso.md](Experiencia-De-Uso.md) §9.1 las declara una sola vez para toda la categoría, por decisión explícita del hallazgo `H-17` del audit, y **no se replican en los dieciocho wireframes ni en las cuatro representaciones**. De las siete, las cuatro de extensiones del catálogo —configuración por esquema, primer arranque, operador único e identidad de versión— están declaradas con su alcance; las tres de Fase B2 —modelo UX-UI aplicado, validación visual de maqueta y línea de base emitida— figuran como `N/A` o pendientes porque la fase no corrió. **No son deuda del salto normativo**: §4.3 no cambió entre la 2.0 y la 4.0 de la regla, verificado al migrar. Se completan cuando la Fase B2 corra.

Lo que esta categoría dejó preparado, según `Rules-UX-UI-DX.md` §1.5:

- **Cada wireframe declara su nombre canónico de superficie** en su §1, y es el que va a llevar el archivo de la maqueta y el `SUP-XX` de la línea de base.
- **La tabla de estados de cada wireframe es la lista de estados que la maqueta va a tener que demostrar.** Un estado no declarado no se maqueta y por lo tanto no se valida.
- **Los ocho flujos clave de [Experiencia-De-Uso.md](Experiencia-De-Uso.md) §3 son las rutas de navegación** que la maqueta va a materializar.
- **Ningún wireframe define valores visuales concretos.** El anti-patrón de wireframe con detalle de hoja de estilos rige sin excepción: no hay colores ni tipografías, y las únicas medidas son las de composición que el catálogo fija por patrón —el ancho acotado de la tarjeta de acceso y de aprovisionamiento, el ancho del cajón de navegación, el punto de quiebre principal alrededor de 768 px y el piso de reflujo de 320 px—, todas heredadas y ninguna acuñada acá.
- **Los anchos de verificación siguen abiertos, la norma de diseño no.** La maqueta materializa el comportamiento responsivo que `Design-Rules-Web-Generico.md` §8 declara; lo que la etapa `b` tiene que registrar en su informe de cierre es en qué anchos concretos lo verificó.

**Qué tiene que rehacer o construir la maqueta después de la retroalimentación del 2026-07-30.** Es el insumo directo del paso siguiente de la Fase B2, y se declara acá para que no haya que reconstruirlo leyendo los diecinueve wireframes:

| Superficie | Qué le toca a la maqueta | Motivo |
| --- | --- | --- |
| `SUP-19` · Exploración de registro de imágenes | **Construir desde cero** | Superficie nueva. No existe archivo previo. `Q-27` decidida el 2026-07-30, con la consecuencia declarada de que es una superficie nueva con wireframe propio. Catorce estados, trece demostrables |
| `SUP-18` · Imágenes | **Construir**, ahora sí | La versión anterior del wireframe prohibía construirla hasta que `Q-15` y `Q-17` se cerraran. **Las dos están cerradas** y la restricción se retira. Veinte estados, diecinueve demostrables; los cinco estados nuevos son el indicador de uso completo y la sugerencia de limpieza |
| `SUP-17` · Alta de servicio | **Rehacer** | Ya venía marcada para rehacerse desde la versión 1.1, porque en la maqueta existía como estado de `SUP-06`. Se suma el **punto de entrada a `SUP-19`** en las vías 3 y 4 y un estado nuevo, y `PA-15` resuelto confirma que **se rehace como superficie propia y no se reubica a `SUP-06`**. Diecinueve estados, dieciocho demostrables |
| `SUP-09` · Tablero de estado | **Ajustar** | Aloja la **ubicación secundaria** de la sugerencia de limpieza: una línea dentro del bloque del servidor con el espacio recuperable y un enlace a `SUP-18`, **sin detalle, sin confirmar y sin descartar**, y cuya **ausencia no se representa**. Declarado en [su §3.2](Wireframes/Wireframes-Tablero-De-Estado.md). Catorce estados, trece demostrables |
| `SUP-12` · Configuración del sistema | **Ajustar** | Aloja los **dos descriptores del umbral** de la sugerencia, en una sexta sección contigua a la de retención, con su explicación en palabras generada por plantilla. Declarado en [su §3.4](Wireframes/Wireframes-Configuracion-Del-Sistema.md). Veintidós estados, veinte demostrables. **Los dos campos se maquetan sin valor por defecto**, que es lo que `B-UX-28` obliga |
| `SUP-06` · Panel lateral del servicio | **Sin cambio de forma** | Su §3.5 pasa de declarar un componente sin dato a uno exigible, porque `B-UX-26` se cerró. **No agrega estados y no cambia la composición**: la maqueta lo construye como ya estaba especificado, con el digesto presente |
| `SUP-11` · Catálogo de plantillas | **Sin cambio de forma** | Su estado vacío pasa a declarar **cuatro cosas y no tres**, porque `B-UX-23` se cerró. **No agrega estados**: es contenido dentro de un estado que ya existía |

Las **doce** superficies restantes **no cambian** y la maqueta las conserva como estén.

**Las dos últimas filas están en la tabla a propósito.** Se listan aunque no cambien de forma para que el paso siguiente no tenga que averiguar si les tocaba algo: se verificó que la propagación las alcanza —las dos tenían una brecha declarada abierta que dejó de estarlo— y se declara que el alcance es de contenido y no de composición.

Lo que la fase deposita después en esta carpeta, y que **no existe todavía**: `Linea-Base-Visual.md`, `Contrato-Datos-Maqueta.md` y `Bitacora-Validacion-Maqueta.md`. Los emite AG-03M al aprobarse la maqueta, quedan bajo la titularidad documental de esta categoría, y son insumo del sensado de deriva.

Al volver la retroalimentación, los artefactos afectados suben versión menor y suman a su control de cambios el motivo correspondiente. La ruta de la maqueta es `SDD/Maquetas/SelfHosted-Service/`, y la etapa `b` del plan de entrega se valida contra ella.

## 10. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 2.3 | 2026-07-30 | **Corrección del hallazgo `P2` del informe de audit [`B2-Retroalimentacion-Decisiones-2026-07-30-r1.md`](../Audit/B2-Retroalimentacion-Decisiones-2026-07-30-r1.md)**, veredicto APROBADO CON OBSERVACIONES, cero P0. Sube **minor**: **ningún artefacto se agrega, se retira ni cambia de versión por esta fila**, ninguna sección se renumera y ninguna decisión abierta se cierra. Lo único que cambia son **cifras que este documento afirmaba sobre sí mismo y que no se sostenían al contarlas**, que es lo que `Deriva-Rules.md` §1 no admite dejar. **El hallazgo, corregido en los dos lugares donde vivía la misma cifra**: §4.2 declaraba «Trece están en versión 2.0» y §4 declaraba «Los trece wireframes restantes y las cuatro representaciones»; **en disco son doce**. Doce más los seis en 2.1 más el nuevo en 1.0 dan los diecinueve wireframes, y doce más las cuatro representaciones dan los dieciséis en 2.0, que era la única cifra correcta de esa fila. **Una tercera cifra que el recuento destapó y que el hallazgo no nombraba**: la fila de AG-02 de §2 declaraba que los flujos y las superficies se anclan en «los 36 casos de uso ya emitidos», cuando `02-Especificacion-Funcional` 2.1 declara **39** desde el 2026-07-30 y §4.2 de este mismo índice ya lo decía; se corrige. **La tabla de reparto de versiones se reescribe entera al estado posterior a esta corrección** —2.3, 2.2, 2.1, 1.0 y 2.0— en lugar de ajustar una celda, porque este documento cambia de versión al corregirse y su propia fila tenía que moverse; **cada fila se contó en disco y ninguna se derivó de la anterior**, y se declara que la columna suma 26. **Recuento completo verificado, y qué sí se sostuvo**: 26 artefactos, 19 wireframes, 4 representaciones, 19 filas de superficie en §4.2, 39 casos de uso con superficie, 25 brechas vigentes sobre 30 identificadores, 22 repartidas en §7.3 y 3 en §7.1. Ninguna de ésas se tocó. **Contenido preservado con su obsolescencia ya rotulada**: la cifra de 227 estados sobre dieciséis superficies de §8 sigue siendo la de la versión 1.0 y su propia celda lo declara; recalcularla sería inventar y no es lo que el hallazgo pide. **Ningún artefacto fuera de `03-UX-UI-DX` se tocó.** La versión 2.2 queda archivada en [`_legacy/2026-07-30/README-v2.2.md`](_legacy/2026-07-30/README-v2.2.md), con su bloque de archivado antepuesto y su cuerpo sin modificar. Ninguna fila anterior de este control de cambios se reescribió (`SDD-Development-Guide.md` §VI.2) |
| 2.2 | 2026-07-30 | **Cierre de la brecha `B-UX-30`: propagación de la retroalimentación del paso 6 de la Fase B2 a las cuatro superficies que la ronda anterior no alcanzó.** Sube **minor**: no cambia la estructura del índice, no se renumera ninguna sección, la variante aplicada no cambia y la tabla de superficies sigue en **diecinueve**. **§4 declara el reparto de versiones en tabla** en lugar de en prosa, porque con dos rondas del mismo día el enunciado corrido dejó de ser legible: el reparto se cuenta en disco fila por fila y se declara en la tabla que sigue. El glosario entró en 2.2 porque **tres de sus conteos cambian** con la propagación, y sus cifras son verificables. **§4.2** actualiza qué wireframes están en cada versión. **§7 pasa de veintiséis brechas vigentes a veinticinco, sobre los mismos treinta identificadores**: **`B-UX-30` se cierra** y pasa a §7.2 con el resultado de la verificación —**la propagación alcanza a las cuatro**, y ninguna se retiró por no corresponder—; §7.3 pasa de veintitrés a **veintidós** repartidas, retirando la fila que la nombraba, y **el destinatario `03-UX-UI-DX` para esa brecha desaparece porque el trabajo está hecho**. **§9 actualiza la tabla de qué tiene que rehacer o construir la maqueta**: `SUP-09` y `SUP-12` pasan de «su wireframe todavía no lo declara» a **declarado**, con la sección exacta y su recuento de estados, y se suman `SUP-06` y `SUP-11` como **sin cambio de forma**, con el motivo de por qué figuran igual. Las superficies que no cambian pasan de catorce a **doce**. **No se abrió ninguna brecha nueva y ninguna decisión abierta se cerró**: `B-UX-28` sigue abierta, y `SUP-12` maqueta los dos campos del umbral **sin valor por defecto**. **Ningún artefacto fuera de `03-UX-UI-DX` se tocó.** La versión 2.1 queda archivada en [`_legacy/2026-07-30/README-v2.1.md`](_legacy/2026-07-30/README-v2.1.md), con su bloque de archivado antepuesto y su cuerpo sin modificar. Ninguna fila anterior de este control de cambios se reescribió (`SDD-Development-Guide.md` §VI.2) |
| 2.1 | 2026-07-30 | **Retroalimentación del paso 6 de la Fase B2**, por la ronda de decisiones del agente humano del proyecto del 2026-07-30 —`Q-15`, `Q-17`, `Q-27`, la confirmación de `DI-17` a `DI-19` y la resolución de `PA-15`—, consolidada en el `PRODUCT-INTAKE-SelfHosted-Service` **v3.2**. Sube **minor**: no cambia la estructura del índice, no se renumera ninguna sección y la variante aplicada y su verificación de multi-especialidad no cambian. **§4 pasa de veinticinco a veintiséis artefactos** y **deja de declarar versión uniforme**: se declara el reparto —veinte en 2.0, cinco en 2.1 y uno nuevo en 1.0—, verificado en disco, en lugar de afirmar un número único que dejó de ser cierto. **§4.2 pasa de dieciocho a diecinueve superficies**, con la fila de **`SUP-19`, exploración de registro de imágenes**, y «las siete últimas» pasa a «las ocho últimas»; la cobertura pasa de 36 a **39** casos de uso. **§3** actualiza el conteo de la carpeta de wireframes. **§7 pasa de veinticinco vigentes sobre veintisiete identificadores a veintiséis sobre treinta**: §7.2 cambia de título y suma **`B-UX-23` y `B-UX-26` cerradas** con su motivo, y §7.3 pasa de veintidós a **veintitrés** repartidas, retirando las dos cerradas, acotando `B-UX-27` a tres tramos e incorporando `B-UX-28`, `B-UX-29` y `B-UX-30` con su destinatario. La **advertencia de consumo heredada** pasa de veintidós a **diecinueve** especificaciones derivadas sin revisar, por las tres confirmadas. **§8** actualiza lo que AG-03M consume: diecinueve nombres canónicos, y **se retira la restricción de no construir `SUP-18`**. **§9 suma la tabla de qué tiene que rehacer o construir la maqueta**, con las tres superficies que cambian de forma y las dos que hay que ajustar, cada una con su motivo: es el insumo directo del paso siguiente de la fase, declarado acá para que no haya que reconstruirlo leyendo los diecinueve wireframes. **Contenido que se preserva sin tocar aunque quedó desactualizado**: la cifra de 227 estados sobre dieciséis superficies de §8 sigue siendo la de la versión 1.0, ninguna fuente declara su recuento sobre las diecinueve y **recalcularla sería inventar**; su celda ya lo anota como pendiente. **Ninguna decisión abierta se cerró acá y ningún artefacto fuera de `03-UX-UI-DX` se tocó.** La versión 2.0 queda archivada en [`_legacy/2026-07-30/README-v2.0.md`](_legacy/2026-07-30/README-v2.0.md), con su bloque de archivado antepuesto y su cuerpo sin modificar. Ninguna fila anterior de este control de cambios se reescribió (`SDD-Development-Guide.md` §VI.2) |
| 2.0 | 2026-07-30 | Migración normativa del conjunto 4.1 al 6.0, fase M4 corte 4, último lote de la fase, bajo `Rules-UX-UI-DX` 4.0, `Vocabulario-Rules` 2.1 y `Migracion-Rules` 1.0. Clasificación **regenerar contenido** por el salto major 2.0 → 4.0 de la regla que gobierna la categoría. **Fuente de contenido: el documento de origen, más los veinticuatro artefactos hermanos del propio destino y el estado del disco, para los recuentos y las versiones que este índice declara** —no es «documento de origen» a secas: `Rules-UX-UI-DX` §3.4 le exige a este README el estado actual de cada artefacto, y el estado actual es un hecho del disco y de los hermanos—. El estado previo queda archivado sin modificar en [`_legacy/2026-07-30/README-v1.1.md`](_legacy/2026-07-30/README-v1.1.md). Sube **major** acompañando a la categoría. **Cabecera:** se suma el campo `Proyecto de código` con el valor `SelfHosted-Service`, que §4.1 de la regla 4.0 exige por ser ésta una categoría de nivel proyecto de código (`Vocabulario-Rules` §4 R3), con el valor **leído del `PRODUCT-MANIFEST` §2 y no inferido**, y la etiqueta `Proyecto` pasa a `Producto` sobre su valor de origen `SelfHosted Service`, porque `Vocabulario-Rules` §3 prohíbe la etiqueta de un plano de identidad sobre el valor de otro; los dos conviven porque §4.1 exige el primero y `Migracion-Rules` §4.2 prohíbe perder el segundo, y **no son intercambiables: difieren por el guion**. Se conserva el campo `Variante`. **Sustitución léxica por ocurrencia** según `Vocabulario-Rules` §9.5 y el plan de migración §3.5, y nunca por reemplazo global de cadena: las **5** ocurrencias de «solución» designaban el nivel superior y **pasan a «producto» con su concordancia de género** —«en esta solución no aplica» en §2, «Ninguna superficie de esta solución» en la fila AG-04 de §2, «la solución tiene un único proyecto de código» en §3, y «ninguna fuente de esta solución» en `C-UX-02` y en `C-UX-03` de §6—; la **única** ocurrencia de la cadena `resoluci` que el documento de origen tenía —«las tres restricciones que cualquier resolución debe cumplir», en la fila `B-UX-01` de §7.1— quedó **intacta**, contada antes y después y verificada por el barrido negativo del plan §3.5 paso 4, porque la cadena `soluci` vive dentro de ella y sustituirla produciría una palabra inexistente. La segunda mención de la palabra en el cuerpo, en la fila del glosario de §4.1, es nueva y declara la familia polisémica que [`Glosario-UX.md`](Glosario-UX.md) §8.1 resuelve. Las ocurrencias de «proyecto» se clasificaron una por una: designan la entidad del dominio en su forma calificada o en la forma corta que el `PRODUCT-INTAKE` §12 admite, el emprendimiento en «agente humano del proyecto», o nombres de archivo de artefactos del dominio, que no se renombran; **las tres que se promovieron o se conservaron como «proyecto de código»** —§3 y las dos de §2— designan la unidad D8 que recibe las categorías 02 a 11 y no un archivo de compilación por serlo. **Estado de la categoría, actualizado contra el disco:** §4 pasa de «los veintidós en versión 1.0» a **veinticinco artefactos en versión 2.0**, con la versión declarada por artefacto en §4.1 y §4.3; §3 declara la convención de archivado en el `_legacy/` de la propia carpeta, que la versión 1.1 no podía declarar porque no existía ninguna versión superada. **Recuentos reconciliados contra el hermano canónico, declarados y no aplicados en silencio:** §7 pasa de veinte vigentes sobre veintidós identificadores a **veinticinco vigentes sobre veintisiete**, y §7.3 de diecisiete a **veintidós** repartidas, incorporando `B-UX-23` a `B-UX-27` con su destinatario, que [`Experiencia-De-Uso.md`](Experiencia-De-Uso.md) §10.2 declara y que la versión 1.1 de este índice no había incorporado; §4.2 corrige «las cinco últimas» por «las siete últimas», que es la aritmética de las dieciocho superficies. **Contenido que se preserva sin tocar aunque quedó desactualizado:** la cifra de 227 estados sobre dieciséis superficies de §8 es de la versión 1.0, ninguna fuente declara su recuento sobre las dieciocho, y **recalcularla sería inventar**: se anota como pendiente en su propia celda. **Nombres canónicos e identificadores conservados textualmente:** los dieciocho `SUP-01` a `SUP-18` de §4.2 con su nombre canónico, y los `B-UX-XX` y `C-UX-XX`, no cambiaron un carácter, porque `Deriva-Rules.md` exige que coincidan término por término con la línea de base visual. **§9 suma las dos cosas que el corte levantó y que no resuelve**: la falta de valor declarado del flag `requiere_maqueta` y el estado real de las siete filas de capacidad y de Fase B2 de la tabla de §4.3, que no son deuda del salto porque §4.3 no cambió entre la 2.0 y la 4.0. **Ninguna fila anterior de este control de cambios se reescribió** (`SDD-Development-Guide.md` §VI.2). El bloque de procedencia del destino sigue declarando la 4.1 y no se toca: es trabajo de M5. Origen: [`Plan-Migracion-4.1-a-6.0.md`](../Audit/Plan-Migracion-4.1-a-6.0.md) §3.5 y §4 |
| 1.1 | 2026-07-29 | **Se incorporan al índice las dos superficies nuevas**, `SUP-17` alta de servicio y `SUP-18` imágenes, y los conteos de la categoría pasan de dieciséis a dieciocho superficies. La advertencia de consumo heredada pasa de catorce a **veintidós** especificaciones derivadas sin revisar, por las ocho que el intake v2.4 agrega. Se declara que **`SUP-18` no se construye todavía en la maqueta**, porque depende de dos decisiones abiertas. La versión 1.0 queda archivada en `_legacy/2026-07-29/`. Origen: §22.5 del documento de trabajo `SDD/Estado/Redefinicion-Servicio.md` v2.0 |
| 1.0 | 2026-07-29 | Versión inicial del índice navegable de la categoría, emitido junto con el marco de experiencia, el glosario, dieciséis wireframes y cuatro representaciones. Declara la variante UX/UI aplicada con la verificación de multi-especialidad una a una y la ausencia de artefactos de la rama DX con su motivo; los seis documentos del catálogo de diseño aplicados con su condición de carga verificada; cuatro contradicciones declaradas entre el catálogo y el anexo E-18; veinte brechas abiertas con su destinatario, incluidas las tres pendencias que `02-Especificacion-Funcional` transfirió como B-07, dos de ellas resueltas por derivación declarada y una que queda abierta por no haber regla que la cubra; y lo que esta categoría dejó preparado para la Fase B2 de validación visual de maqueta |
| 1.0 | 2026-07-29 | Corrección del audit de la Fase B, absorbida dentro de la versión de emisión, sin subir versión y sin archivar, por la política de versionado de `Master-Prompt.md` §5: el documento está en estado `Propuesto` y la corrección proviene del audit de su propia fase. **H-06, P1:** §4.2 deja de repetir la correspondencia entre superficie y caso de uso y remite a la fuente única, que es `Experiencia-De-Uso.md` §9.2, con el motivo declarado; la columna correspondiente se retira porque `Rules-UX-UI-DX.md` §3.4 no la exige. **Brecha `B-UX-15` retirada por falsa** y nueva §7.2 con la brecha retirada y la cerrada; §7 pasa a veintiuna brechas vigentes con el resultado de la evaluación del audit. §6 suma la contradicción `C-UX-05` y actualiza `C-UX-03` y `C-UX-04` con el pronunciamiento del auditor. **H-14, P3:** el recuento de documentos del catálogo pasa a seis documentos de reglas más su índice. **H-18, P3:** el campo de cabecera pasa de `Variante aplicada` a `Variante`, que es la forma del modelo de §4.1. §9 precisa qué queda abierto de los anchos responsivos. Origen: informe [`Audit/B-02-03-r1.md`](../Audit/B-02-03-r1.md) |
