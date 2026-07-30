# 03-UX-UI-DX — SelfHosted Service

**Proyecto:** SelfHosted Service
**Documento:** README.md
**Versión:** 1.0
**Estado:** Propuesto
**Fecha:** 2026-07-29
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
  - [7.2 La brecha retirada y la que quedó cerrada](#72-la-brecha-retirada-y-la-que-quedó-cerrada)
  - [7.3 Las diecisiete restantes, por destinatario](#73-las-diecisiete-restantes-por-destinatario)
- [8. Qué consume cada categoría downstream](#8-qué-consume-cada-categoría-downstream)
- [9. Qué le toca a la Fase B2](#9-qué-le-toca-a-la-fase-b2)
- [10. Control de cambios](#10-control-de-cambios)

---

## 1. Por dónde empezar

[Experiencia-De-Uso.md](Experiencia-De-Uso.md) es el marco de la categoría: trae la persona objetivo, el catálogo de diseño aplicado, las cuatro capacidades transversales con su contrato, los ocho flujos clave, el mapa de estados de las dieciséis superficies, el compromiso de accesibilidad, los umbrales de performance percibida, el catálogo de códigos de resultado y la trazabilidad bidireccional entre superficies y casos de uso. Sus §10.1 y §10.2 concentran las contradicciones y las brechas.

Un revisor que sólo quiera entender cómo se siente el producto puede leer, en este orden: [Wireframes-Lienzo-Del-Proyecto.md](Wireframes/Wireframes-Lienzo-Del-Proyecto.md), que es la pantalla principal; [Wireframes-Panel-Lateral-Del-Servicio.md](Wireframes/Wireframes-Panel-Lateral-Del-Servicio.md), que es la superficie de configuración más densa; [Wireframes-Cajon-De-Cambios-Pendientes.md](Wireframes/Wireframes-Cajon-De-Cambios-Pendientes.md), que es la edición transaccional; y [Wireframes-Descubrimiento-E-Incorporacion.md](Wireframes/Wireframes-Descubrimiento-E-Incorporacion.md), que es el flujo diferencial del producto.

## 2. Variante aplicada y por qué

La tabla §1.2 de `Rules-UX-UI-DX.md` asigna al tipo `web-monolith` la fila que se transcribe literal:

| Tipo | Variante | Especialidad específica | Justificación |
| --- | --- | --- | --- |
| web-monolith | UX/UI | UX/UI Designer + Frontend Lead | El usuario final recorre pantallas en navegador. Se diseña experiencia, layout, estados y accesibilidad de cada vista. |

Se asume además la especialidad base de §1.1: especialista en experiencia, equivalente AG-03, alineado con ISO 9241-210 para el proceso centrado en personas, WCAG 2.2 nivel AA como piso de accesibilidad, las heurísticas de Nielsen y las reglas de Shneiderman para la inspección, y el marco Diátaxis para documentación orientada al developer, que en esta solución no aplica.

**Verificación de §1.3, multi-especialidad.** La regla admite combinar con otras cinco especialidades. Se verifica una por una:

| Combinación admitida por §1.3 | ¿Se cumple la condición? | Consecuencia |
| --- | --- | --- |
| AG-02 Analista Funcional, para anclar cada flujo en un caso de uso con interacción humana | **Sí, parcialmente.** Los flujos y las superficies se anclan en los 36 casos de uso ya emitidos | Se aplica como consumo de upstream, no como coautoría. `02-Especificacion-Funcional` está emitida y auditada, y esta categoría no la modifica |
| AG-04 Ingeniero de Prompts, cuando una pantalla dispara un flujo asistido por un modelo de lenguaje | **No.** Ninguna superficie de esta solución lo hace. La ranura del asistente que se reserva está deshabilitada y no dispara nada | No se aplica. Ver la contradicción `C-UX-03` |
| AG-05 Arquitecto, para alinear el wireframe con la arquitectura de la capa de presentación | **No todavía.** `05-Arquitectura-Tecnica` no está emitida | No se aplica como coautoría. Esta categoría le delega lo que le corresponde y lo declara en cada wireframe |
| AG-08 QA, para que los estados visuales sean automatizables | **Sí, parcialmente.** Cada wireframe declara su tabla de estados con la condición que produce cada uno | Se aplica como delegación: `08-Calidad-Y-Pruebas` es titular de la verificación |
| AG-10 Technical Writer, para alinear el tono de los mensajes | **No todavía.** `11-Documentacion` no está emitida | No se aplica. El microcopy exacto lo cierra la Fase B2 sobre la maqueta; lo que esta categoría fija son las elecciones de vocabulario de [Glosario-UX.md](Glosario-UX.md) §6 |

Los dos casos de **combinación explícita de variantes** que §1.3 declara —portal de developers en una interfaz programática, y frontend más kit de desarrollo público— **no se dan**: el indicador `tiene_portal_developers` es falso y no hay integradores externos. Por lo tanto **no se produce ningún artefacto de la rama DX**, que la tabla §2.1 declara obligatorios sólo para tipos sin interfaz final.

## 3. Estructura de la carpeta

La salida va directo bajo `SDD/Docs/03-UX-UI-DX/`, sin subnivel de proyectos: la solución tiene un único proyecto de código y la categoría se genera plana, en el caso degenerado que el manifiesto declara.

| Ruta | Contenido |
| --- | --- |
| [Experiencia-De-Uso.md](Experiencia-De-Uso.md) | Marco de experiencia con sus once secciones obligatorias |
| [Glosario-UX.md](Glosario-UX.md) | Vocabulario de la categoría, sin duplicar el glosario del dominio |
| [Wireframes/](Wireframes/) | 16 superficies, una por archivo |
| [Representaciones/](Representaciones/) | 4 representaciones reutilizadas entre superficies |

Las dos subcarpetas son una decisión de navegabilidad de esta categoría y no una exigencia de `Rules-UX-UI-DX.md`, que no las prescribe ni las prohíbe. Se adoptan por el mismo criterio con el que `02-Especificacion-Funcional` separó sus casos de uso y sus reglas: veintiún archivos en una carpeta plana no son navegables.

Ningún archivo lleva sufijo de versión en el nombre: la versión vive en el campo de su cabecera. No hay carpeta de versiones superadas, porque ésta es la primera emisión de la categoría.

## 4. Artefactos vigentes

Los veintidós en estado `Propuesto`, versión 1.0.

### 4.1 Marco y vocabulario

| Artefacto | Propósito |
| --- | --- |
| [Experiencia-De-Uso.md](Experiencia-De-Uso.md) | Marco de experiencia: audiencia, principios, ocho flujos clave, estados, accesibilidad, internacionalización, performance percibida, errores, trazabilidad, notas y control de cambios |
| [Glosario-UX.md](Glosario-UX.md) | Términos de superficie, de estado y de las cuatro capacidades transversales, más las elecciones de microcopy fijadas |

### 4.2 Superficies

Las once primeras corresponden a nodos del mapa de navegación del anexo E-18 del intake; las cinco últimas declaran de dónde salen, porque ese anexo no las maqueta.

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

El mínimo que la tabla de adaptabilidad fija para `web-monolith` es de cuatro superficies clave. El anexo E-18 declara más, y la cobertura de los casos de uso con interacción humana relevante lleva la cuenta a dieciséis.

**Cobertura.** Los 36 casos de uso de `02-Especificacion-Funcional` tienen superficie, con una excepción declarada: CU-33, disparo de despliegue con credencial de ámbito mínimo, cuyo actor es el automatismo de integración continua y cuya superficie es la interfaz programática. La correspondencia completa, en las dos direcciones, está en [Experiencia-De-Uso.md](Experiencia-De-Uso.md) §9.2 y §9.3.

### 4.3 Representaciones

| Representación | Propósito | Superficies que la invocan |
| --- | --- | --- |
| [Representacion-Nodo-De-Servicio.md](Representaciones/Representacion-Nodo-De-Servicio.md) | Anatomía del nodo del lienzo, con el origen de cada dato | SUP-05 |
| [Representacion-Lenguaje-Visual-De-Estados.md](Representaciones/Representacion-Lenguaje-Visual-De-Estados.md) | Contrato visual de estados y su correspondencia con el catálogo base y con el estado del motor de contenedores | SUP-04, SUP-05, SUP-06, SUP-09, SUP-10 |
| [Representacion-Banda-De-Resultado.md](Representaciones/Representacion-Banda-De-Resultado.md) | Banda de resultado por código de las superficies de identidad | SUP-01, SUP-02, SUP-03, SUP-04, SUP-14 |
| [Representacion-Sello-De-Version.md](Representaciones/Representacion-Sello-De-Version.md) | Sello de versión y detalle de diagnóstico, en sus dos ubicaciones obligatorias | SUP-02, SUP-12 |

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
| C-UX-02 | La extensión de configuración por esquema exige declarar un modo simulación; ninguna fuente de esta solución declara uno. El conjunto de cambios pendientes cumple previsualizar, confirmar y no aplicar directo, pero **calcula qué se va a redesplegar, no prueba qué va a pasar** | No se dibuja un indicador de modo simulación. Se declara requisito por requisito qué se cumple y qué no, y se escala como brecha `B-UX-08` |
| C-UX-03 | `Rules-UX-UI-DX.md` §1.4 obliga a reservar la ranura del asistente; ninguna fuente de esta solución declara asistencia de un modelo de lenguaje | **Se aplica la regla**, por ser normativa y explícita: la ranura se reserva deshabilitada en el cajón de cambios pendientes. **Resuelta:** el audit confirmó que la ranura es forward-compat y que su caso de uso es precisamente el de una capacidad que todavía no existe, de modo que la regla no admite no aplicarse. El defecto quedó contra el repositorio fuente como `R-3` y `B-UX-09` pasa a cerrada |
| C-UX-04 | El anexo E-17 exige que la interfaz distinga «pausado» y «finalizado»; el contrato visual del anexo E-18 no tiene fila para ninguno de los dos | No se inventan dos filas del contrato. Los dos estados se exhiben por **etiqueta textual** sobre el par neutro, y se escala como brecha `B-UX-12`. **Confirmada como defecto del intake**, elevada como `R-6`; el audit declaró correcto el tratamiento |
| C-UX-05 | El intake ubica el cierre de sesión dentro de un menú de usuario; `Design-Rules-Acceso-Monousuario.md` §4.3 y §6 exigen que esté siempre visible y a un clic, y su §10 enumera el menú anidado como anti-patrón | Se aplica el catálogo, porque lo que el intake describe es una forma de interfaz y no un requisito funcional. Elevada acá para que reciba el mismo tratamiento que las otras cuatro, según el hallazgo `H-16`. **No genera brecha**: las dos fuentes declaran el dato y esta categoría elige con su motivo |

## 7. Brechas abiertas de esta categoría

**Veinte vigentes**, sobre veintidós identificadores emitidos. Ninguna se resuelve acá: es la precaución que la Fase A dejó asentada para la Fase B, y que esta cadena ya tuvo que corregir tres veces. La tabla completa, con la ubicación y el estado de cada una, está en [Experiencia-De-Uso.md](Experiencia-De-Uso.md) §10.2.

El audit independiente de la Fase B evaluó una a una las veinte que esta categoría había declarado: **catorce confirmadas, cinco acotadas** —su enunciado sobredimensionaba lo ausente y se ajustó a la evidencia— **y una retirada por falsa**. Se sumaron dos que el propio audit destapó. `B-UX-09` pasó a cerrada. Los identificadores retirados y cerrados conservan su fila.

### 7.1 Las tres pendencias que `02-Especificacion-Funcional` transfirió como B-07

| # | Pendencia | Estado |
| --- | --- | --- |
| B-UX-01 | Distinción visual entre las aristas que declaran espera y las que no | **Abierta.** Ninguna regla del catálogo cubre la representación de aristas, de modo que no hay derivación posible. Se declaran las **tres restricciones** que cualquier resolución debe cumplir. Destinatario: agente humano del proyecto |
| B-UX-02 | Maquetado del paso de clasificación de variables de la incorporación | **Resuelta por derivación**, campo por campo, de la carga útil del anexo E-11 y de las reglas RA-05 y RA-06 del anexo E-7. La derivación se declara para que sea impugnable. Destinatario: agente humano del proyecto, para confirmarla |
| B-UX-03 | Maquetado de la pantalla de variables compartidas | **Resuelta por derivación** de los campos del anexo E-1 y del cambio de entidad proyecto del anexo E-5. Misma condición que la anterior |

Las tres las confirmó el audit contra el literal del anexo E-18.

### 7.2 La brecha retirada y la que quedó cerrada

| # | Qué declaraba | Por qué se retira o se cierra |
| --- | --- | --- |
| B-UX-15 | Que los anchos de ventana del comportamiento responsivo no estaban declarados | **Retirada por falsa.** `Design-Rules-Web-Generico.md` §8 sí declara el punto de quiebre principal alrededor de 768 px y el piso de 320 px sin desplazamiento horizontal, y los dieciséis wireframes ya los aplicaban. Lo delegado por `Compatibilidad-Plataformas.md` §4 son los anchos de **verificación**, que son otra cosa. Ver [Experiencia-De-Uso.md](Experiencia-De-Uso.md) §10.2.1 |
| B-UX-09 | Que la ranura del asistente reservaba lugar para una capacidad fuera del alcance | **Cerrada.** El audit se pronunció a favor de aplicar la regla; el defecto es del repositorio fuente y quedó como `R-3` |

### 7.3 Las diecisiete restantes, por destinatario

| Destinatario | Brechas |
| --- | --- |
| Agente humano del proyecto | `B-UX-08` modo simulación; `B-UX-10` política de contraseña y control de intentos; `B-UX-12` estados pausado y finalizado; `B-UX-14` confirmación al eliminar un proyecto SelfHosted; `B-UX-17` superficies fuera del mapa de navegación; `B-UX-18` dependencia entre cambios; `B-UX-21` separador decimal |
| Agente humano del proyecto y `05-Arquitectura-Tecnica` | `B-UX-04` descriptores sin leyenda ni ejemplos; `B-UX-06` prefijo de nombre reservado sin clasificar; `B-UX-11` política de sesión; `B-UX-13` filtrado de secretos en el registro; `B-UX-16` destino del respaldo |
| `05-Arquitectura-Tecnica` y `09-Devops` | `B-UX-07` contrato de identidad de versión |
| `05-Arquitectura-Tecnica` | `B-UX-19` lectura no disponible; `B-UX-20` frecuencia de la revisión periódica |
| Mantenedor del catálogo de diseño | `B-UX-05` token del estado pendiente de aplicar |
| `08-Calidad-Y-Pruebas` | `B-UX-22` la confirmación escrita no tiene caso ejecutable en el anexo E-22 |

**Advertencia de consumo heredada.** Catorce de las dieciséis especificaciones derivadas del intake siguen sin revisar. Las reglas de negocio que esta categoría cita y que están alcanzadas por esa condición se consumen **declarándolas revisables** y nunca como requisito cerrado del cliente.

## 8. Qué consume cada categoría downstream

| Categoría | Qué consume de acá |
| --- | --- |
| 05-Arquitectura-Tecnica | Los requisitos no funcionales de la capa de presentación: los umbrales de performance percibida de [Experiencia-De-Uso.md](Experiencia-De-Uso.md) §7, la frontera entre configuración de aplicación y de entorno de §2.5, el contrato del predicado de aprovisionamiento de §2.4, y las siete brechas que esta categoría le delega |
| 06-Backlog-Tecnico | Los criterios de aceptación visuales: la tabla de estados de cada wireframe y la tabla de interacciones, que son lo que cada historia de usuario tiene que satisfacer. La numeración de las historias sigue siendo potestad de esa categoría |
| 08-Calidad-Y-Pruebas | Los escenarios de snapshot por estado —227 estados declarados sobre dieciséis superficies, de los cuales 204 son demostrables—, los tests de accesibilidad WCAG 2.2 AA de [Experiencia-De-Uso.md](Experiencia-De-Uso.md) §5, y el criterio verificable de la restricción de navegador |
| 09-Devops | Nada directamente. Recibe por vía de `05` el contrato de identidad de versión que la brecha `B-UX-07` deja abierto |
| 11-Documentacion | Las elecciones de vocabulario de [Glosario-UX.md](Glosario-UX.md) §6, para alinear el tono sin contradecirlas |
| AG-03M, Fase B2 | Los dieciséis nombres canónicos de superficie, las tablas de estados como lista de lo que la maqueta debe demostrar, y los ocho flujos clave como rutas de navegación a materializar |

## 9. Qué le toca a la Fase B2

El indicador `requiere_maqueta` es verdadero. Lo que esta categoría redacta **no cierra en su propio audit**: se materializa después en una maqueta navegable que el agente humano del proyecto valida, y esa validación vuelve.

Lo que esta categoría dejó preparado, según `Rules-UX-UI-DX.md` §1.5:

- **Cada wireframe declara su nombre canónico de superficie** en su §1, y es el que va a llevar el archivo de la maqueta y el `SUP-XX` de la línea de base.
- **La tabla de estados de cada wireframe es la lista de estados que la maqueta va a tener que demostrar.** Un estado no declarado no se maqueta y por lo tanto no se valida.
- **Los ocho flujos clave de [Experiencia-De-Uso.md](Experiencia-De-Uso.md) §3 son las rutas de navegación** que la maqueta va a materializar.
- **Ningún wireframe define valores visuales concretos.** El anti-patrón de wireframe con detalle de hoja de estilos rige sin excepción: no hay colores ni tipografías, y las únicas medidas son las de composición que el catálogo fija por patrón —el ancho acotado de la tarjeta de acceso y de aprovisionamiento, el ancho del cajón de navegación, el punto de quiebre principal alrededor de 768 px y el piso de reflujo de 320 px—, todas heredadas y ninguna acuñada acá.
- **Los anchos de verificación siguen abiertos, la norma de diseño no.** La maqueta materializa el comportamiento responsivo que `Design-Rules-Web-Generico.md` §8 declara; lo que la etapa `b` tiene que registrar en su informe de cierre es en qué anchos concretos lo verificó.

Lo que la fase deposita después en esta carpeta, y que **no existe todavía**: `Linea-Base-Visual.md`, `Contrato-Datos-Maqueta.md` y `Bitacora-Validacion-Maqueta.md`. Los emite AG-03M al aprobarse la maqueta, quedan bajo la titularidad documental de esta categoría, y son insumo del sensado de deriva.

Al volver la retroalimentación, los artefactos afectados suben versión menor y suman a su control de cambios el motivo correspondiente. La ruta de la maqueta es `SDD/Maquetas/SelfHosted-Service/`, y la etapa `b` del plan de entrega se valida contra ella.

## 10. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 1.0 | 2026-07-29 | Versión inicial del índice navegable de la categoría, emitido junto con el marco de experiencia, el glosario, dieciséis wireframes y cuatro representaciones. Declara la variante UX/UI aplicada con la verificación de multi-especialidad una a una y la ausencia de artefactos de la rama DX con su motivo; los seis documentos del catálogo de diseño aplicados con su condición de carga verificada; cuatro contradicciones declaradas entre el catálogo y el anexo E-18; veinte brechas abiertas con su destinatario, incluidas las tres pendencias que `02-Especificacion-Funcional` transfirió como B-07, dos de ellas resueltas por derivación declarada y una que queda abierta por no haber regla que la cubra; y lo que esta categoría dejó preparado para la Fase B2 de validación visual de maqueta |
| 1.0 | 2026-07-29 | Corrección del audit de la Fase B, absorbida dentro de la versión de emisión, sin subir versión y sin archivar, por la política de versionado de `Master-Prompt.md` §5: el documento está en estado `Propuesto` y la corrección proviene del audit de su propia fase. **H-06, P1:** §4.2 deja de repetir la correspondencia entre superficie y caso de uso y remite a la fuente única, que es `Experiencia-De-Uso.md` §9.2, con el motivo declarado; la columna correspondiente se retira porque `Rules-UX-UI-DX.md` §3.4 no la exige. **Brecha `B-UX-15` retirada por falsa** y nueva §7.2 con la brecha retirada y la cerrada; §7 pasa a veintiuna brechas vigentes con el resultado de la evaluación del audit. §6 suma la contradicción `C-UX-05` y actualiza `C-UX-03` y `C-UX-04` con el pronunciamiento del auditor. **H-14, P3:** el recuento de documentos del catálogo pasa a seis documentos de reglas más su índice. **H-18, P3:** el campo de cabecera pasa de `Variante aplicada` a `Variante`, que es la forma del modelo de §4.1. §9 precisa qué queda abierto de los anchos responsivos. Origen: informe [`Audit/B-02-03-r1.md`](../Audit/B-02-03-r1.md) |
