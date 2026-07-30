# SOLUTION-INTAKE-SelfHosted-Service

**Plantilla aplicada:** `SOLUTION-INTAKE-template.md` v1.4 del Framework SDD, conjunto normativo 4.0. La versión 1.2 de este documento se emitió contra la plantilla 1.3; la sección «Migración al Framework SDD 4.0» declara qué cambió y por qué.

| Campo | Valor |
|---|---|
| Nombre de producto | SelfHosted Service |
| `Nombre-Solucion` (identidad documental) | `SelfHosted-Service` |
| `NombreSolucionCodigo` (identidad de código) | `SelfHosted.Service.Core` |
| Artefacto de agrupación de la construcción | `SelfHosted.Service.Core.sln` |
| Product Owner | **Derivado, pendiente de confirmación.** El agente humano del proyecto, que es la misma persona que el propietario del servidor autoalojado de referencia y que el lead técnico. Ver la nota de abajo |
| Cliente / Stakeholder principal | Propietario del servidor autoalojado de referencia, que opera el parque de contenedores y aprueba cada punto de control (rol; el nombre propio no está declarado en las fuentes) |
| Repositorio | Repositorio destino local `DEV/SelfHosted.Service.Core`, con remoto `origin` en `https://github.com/UTN-FRP-TUP-Aplicada-2025/SelfHosted.Service.Core.git`. El flujo de trabajo es una rama y un pull request por etapa sobre ese remoto. Evidencia: `git remote get-url origin` en la raíz del repositorio destino, verificado el 2026-07-27 |
| Lead técnico | Agente humano del proyecto: valida cada punto de control, ejecuta los guiones de demostración y realiza la fusión de cada rama de etapa |
| Documento | `SOLUTION-INTAKE-SelfHosted-Service.md` |
| Versión | 2.3 |
| Fecha | 2026-07-29 |
| Stack principal | .NET 10 con Blazor Interactive Server, MudBlazor 9.7.0, Entity Framework Core sobre SQLite |
| Estado | Aprobado |

**Nota sobre el Product Owner, incorporada en la versión 2.3.** El conjunto normativo 4.1 del Framework SDD declara al **Product Owner** como rol humano **fuera de la cadena de subagentes AG-XX**, dueño de la priorización MoSCoW y de las exclusiones, que declara en §4 y §9 de este documento aguas arriba de toda generación. El framework distingue explícitamente ese rol de la categoría de stakeholder «propietario»: quien financia también es propietario y no por eso es el Product Owner.

En esta solución **las tres figuras coinciden en una sola persona**, que §2 declara en tres roles: dueño del problema y administrador único, agente humano del proyecto en su rol de validación técnica, y único usuario final con credenciales. El campo se completa por derivación de §2 y **queda marcado como pendiente de confirmación** en lugar de darse por cerrado, porque quién es el Product Owner determina quién decide las exclusiones que la categoría `00-Contexto` eleva, y ésa es una declaración que el intake no traía. Es responsabilidad del Product Owner el contenido de este documento y su aprobación; que su redacción esté asistida por un agente no delega la autoría.

> Este documento captura qué quiere el cliente, cómo se compone la solución y cómo se construye su proyecto de código.
> El orquestador deriva de §13 el `SOLUTION-MANIFEST` canónico; no se completa el manifiesto a mano.

## Identidad de la solución

**Incorporada en la versión 2.1, 2026-07-29.** Hasta la versión 2.0 este documento tenía un solo campo de nombre, «Nombre de la solución», con el valor `SelfHosted.Service.Core`, que es un nombre de artefacto de código ocupando un campo de negocio. El agente humano del proyecto lo observó durante la fase de validación de intake y decidió separar las identidades. La cabecera declara ahora cuatro, cada una con su consumidor:

| # | Identidad | Valor | Quién la consume | Origen |
|---|---|---|---|---|
| 1 | **Nombre de producto** | `SelfHosted Service` | 00-Contexto, 01-Necesidades-Negocio, README raíz, comunicación con el cliente | Decisión del agente humano del proyecto, 2026-07-29 **[D]** |
| 2 | **`Nombre-Solucion`**, identidad documental | `SelfHosted-Service` | `SOLUTION-INTAKE-<slug>.md`, `SOLUTION-MANIFEST-<slug>.md` y las rutas de `SDD/` | **Derivado** del nombre de producto por `Master-Prompt.md` §3.2, pasos 1 a 7 |
| 3 | **`NombreSolucionCodigo`**, identidad de código | `SelfHosted.Service.Core` | El archivo de solución, la raíz de los espacios de nombres y el prefijo de todo proyecto de código | **Declarado** en el perfil de convención de §13 **[D]** |
| 4 | **Artefacto de agrupación** | `SelfHosted.Service.Core.sln` | `dotnet build`, la apertura del repositorio y los scripts | Derivado de 3 como `<NombreSolucionCodigo>.sln` **[D]** |

**La propiedad que hay que sostener es que 1 y 3 son independientes.** El nombre de producto es una decisión de negocio; la identidad de código es una decisión técnica, acá preexistente por la estructura de `/src` del análisis integrado. Sólo 2 se deriva, y se deriva de 1.

**Por qué esta solución hacía tan fácil confundirlas.** Acá el producto es monolítico *y* la solución de código es monolítica: un producto, un despliegue, una solución .NET, un contenedor, un proceso. Con las cardinalidades en 1:1:1, usar el mismo nombre para las tres cosas no rompe nada visible. En una solución de varios despliegues la confusión salta el primer día.

**Consecuencia para la generación, y es la que un artefacto downstream debe respetar.** Las categorías de nivel solución —00-Contexto y 01-Necesidades-Negocio— hablan del **producto** y lo nombran `SelfHosted Service`. Un documento de visión que diga «`SelfHosted.Service.Core` resuelve el problema del propietario» está nombrando un archivo `.sln` en un documento de negocio. Las categorías por proyecto de código —02 a 11— hablan de **unidades de compilación** y usan los nombres de código. Es la misma frontera que §12 traza entre «proyecto SelfHosted» y «proyecto de código», aplicada un nivel más arriba.

**Sobre el renombrado de los dos artefactos de `SDD/Intake/`.** La identidad documental pasó de `SelfHosted-Service-Core` a `SelfHosted-Service` porque el slug **se deriva** del nombre de producto y el framework no admite declararlo estable. Los dos archivos cambiaron de nombre en consecuencia. Las copias archivadas en `_legacy/` conservan el nombre viejo y no se tocan: lo que archivan es el estado en que ese nombre era el vigente.

**Sobre la composición: un único proyecto de código, decidido el 2026-07-29 [D].** La versión 2.1 declaraba cuatro proyectos de código, uno por capa. El agente humano del proyecto observó que el producto es **un solo despliegue** —un contenedor, un proceso, un ejecutable— y que ninguna de las cuatro unidades se publica ni se consume por separado, de modo que la frontera de compilación no aportaba ninguna capacidad de distribución y en cambio arrastraba a la documentación un modelo de cuatro componentes publicables inexistente. Desde la versión 2.2 la solución tiene **un proyecto de código**, `SelfHosted.Service.Core`, de tipo `web-monolith`, y las cuatro capas son **espacios de nombres internos**.

| | Versión 2.1 | Versión 2.2 |
|---|---|---|
| Proyectos de código | 4 (`web-monolith` ×1, `library` ×3) | **1** (`web-monolith`) |
| Las cuatro capas | Proyectos de compilación | **Espacios de nombres y carpetas**, con los mismos nombres |
| Quién hace cumplir la regla de dependencia | El compilador, por el grafo de referencias | El **test de arquitectura** de §17.P.6, gate bloqueante **[D-i]** |
| Salida de `SDD/Docs/` | 12 categorías × 4 proyectos, bajo `Proyectos/<Nombre>/` | 12 categorías **planas**, caso degenerado de `Master-Prompt.md` §3.5 |

**Lo que la decisión cuesta y cómo se compensa**, declarado acá porque es lo que un artefacto downstream tiene que saber: la frontera de proyecto hacía cumplir por compilación la regla de aislamiento del cliente del motor **[E]**, la ausencia de dependencias externas en el dominio y la separación entre aplicación e infraestructura. Las tres pasan al test de arquitectura, que las verifica antes de fusionar. La violación se detecta más tarde —test rojo en lugar de error de compilación— y esa degradación está asumida.

**Lo que la decisión no cambia.** Ninguna regla de negocio, ningún umbral, ningún caso límite, ninguna capacidad, ningún anexo de datos y ninguna de las doce decisiones D-1 a D-12. Las cuatro capas siguen existiendo con la misma responsabilidad, el mismo contrato entre ellas y el mismo orden de construcción `Domain` → `Application` → `Infrastructure` → `Web`.

## Migración al Framework SDD 4.0

Esta versión 2.0 no incorpora ninguna decisión de producto nueva. Es la **migración del intake al conjunto normativo 4.0 del Framework SDD**, hecha para que la documentación pueda regenerarse bajo las reglas vigentes sin perder nada de lo decidido y acordado hasta el 2026-07-28. Todo lo que la versión 1.2 declaraba sigue declarado, con el mismo enunciado; lo que cambia es la forma del documento y lo que ahora contiene además.

**Por qué hizo falta.** La documentación de `SDD/Docs/` se generó con un conjunto normativo anterior al 4.0. Esa versión reformuló dos invariantes —D4 y D5, que son las de nomenclatura y de versión vigente—, con lo que la nomenclatura con sufijo de versión en el nombre del archivo vivo dejó de cumplir; incorporó el archivado por versión del propio framework en `_legacy/`, la fase de reconciliación normativa del orquestador y la validación de la Parte D del intake, y llevó la plantilla de intake de la 1.3 a la 1.4. Reejecutar el orquestador sin migrar habría producido una batería de validación bloqueante sobre la Parte D y, sobre todo, habría descartado el trabajo de la Fase A en lugar de conservarlo.

**Qué se cambió en este documento, y nada más que esto.**

| Cambio | Motivo normativo |
|---|---|
| El archivo vivo pierde el sufijo de versión del nombre y pasa a declarar su versión en la cabecera. La copia superada se archiva como `_legacy/2026-07-28/SOLUTION-INTAKE-SelfHosted-Service-Core-v1.2.md` | D4 y D5 reformuladas en el conjunto 4.0 |
| Se emite la **tabla de contenido obligatoria**, con las secciones de primer y segundo nivel y con los veintidós escenarios de la Parte D listados por identificador | Plantilla 1.4, paso 2 de su guía de uso; `Intake-Rules.md` 2.1 §5, navegabilidad |
| Cada escenario de §20 declara ahora sus **cuatro bloques** —contexto, qué ejercita, la carga completa y qué verificar— y su `Estado` pasa al enum cerrado `medido` / `declarado` / `derivado` / `reconstruido` | Plantilla 1.4 §20; `Intake-Rules.md` 2.1 §5, validación de la Parte D |
| Se incorpora la **Parte E**, con los resultados de la Fase A generada bajo el conjunto anterior y con el estado de decisiones, pendientes y especificaciones derivadas al momento de la migración | Objetivo de la migración: conservar los avances. No lo exige el framework |
| §19 incorpora los ítems de checklist de la Parte D de la plantilla 1.4 y actualiza el estado de lo abierto | `Intake-Rules.md` 2.1 §5 |

**Marcador nuevo: `[FA]`.** Señala material **derivado durante la Fase A previa**, bajo el conjunto normativo anterior, y transcripto en la Parte E de este documento. No es dato del cliente ni decisión del agente humano: es producto de los subagentes AG-00 y AG-01, revisado en su momento por el auditor independiente y por el agente humano del proyecto en los puntos que la Parte E declara. Se distingue de los otros tres marcadores así: un `[S]` es un valor que faltaba en las fuentes; un `[D-i]` es una especificación que el integrador derivó de una decisión del agente humano; un `[FA]` es una **derivación de categoría documental**, del nivel de 00-Contexto o 01-Necesidades-Negocio, que se conserva como insumo de la regeneración. Un artefacto downstream puede consumirlo, y debe tratarlo como propuesta previa —no como requisito cerrado del cliente— salvo donde la propia Parte E declare que el agente humano se pronunció.

**Qué pasa al reejecutar el orquestador.** `SDD/Docs/` conserva el árbol generado bajo el conjunto anterior, y se deja deliberadamente en su lugar: el orquestador lo detecta en su fase de reconciliación normativa (`Master-Prompt.md` §2.1) y, como el manifiesto de esta solución **no declara bloque de procedencia** —fue derivado antes de que la procedencia existiera—, el caso que corresponde es «sin procedencia», donde el orquestador ofrece únicamente regenerar o abortar. La salida coherente con esta migración es **regenerar**: archiva `SDD/Docs/` completo en `SDD/Docs/_legacy/<fecha>/` y vuelve a generar bajo el conjunto vigente, tomando de la Parte E lo que la Fase A anterior había producido. Ninguna decisión de esa fase se pierde, porque está transcripta acá.

**Lo que la migración deliberadamente no hizo.** No se modificó ninguna regla de negocio, ningún caso límite, ninguna capacidad, ningún umbral, ningún anexo de datos y ninguna decisión. No se tocó `SDD/Docs/`, que es materia de la reconciliación del orquestador y no de este documento. No se completó el bloque de procedencia del manifiesto: declararlo a mano afirmaría que el árbol existente se generó bajo el conjunto 4.0, que es falso, y D9 exige evidencia. No se reubicó §19, que sigue después de §21 por la misma razón registrada en su tabla de observaciones no aplicadas: de los títulos de la Parte D se derivan las veintidós anclas en uso, y §19 se cita por ancla desde artefactos que ya lo están leyendo.

## Tabla de contenido

- [Identidad de la solución](#identidad-de-la-solución)
- [Migración al Framework SDD 4.0](#migración-al-framework-sdd-40)
- [Procedencia de este intake y convención de marcadores](#procedencia-de-este-intake-y-convención-de-marcadores)
- [Decisiones del agente humano incorporadas en la versión 1.2](#decisiones-del-agente-humano-incorporadas-en-la-versión-12)
  - [Segunda pasada sobre D-6: la plataforma de referencia como tutor](#segunda-pasada-sobre-d-6-la-plataforma-de-referencia-como-tutor)
  - [Tercera pasada: cuatro decisiones puntuales sobre el modelo de vínculo](#tercera-pasada-cuatro-decisiones-puntuales-sobre-el-modelo-de-vínculo)
  - [Quinta pasada: identidad de objeto e higiene del modelo](#quinta-pasada-identidad-de-objeto-e-higiene-del-modelo)
  - [Qué decidió el agente humano y qué derivó el integrador](#qué-decidió-el-agente-humano-y-qué-derivó-el-integrador)
  - [Cuarta pasada: desambiguación del término «proyecto»](#cuarta-pasada-desambiguación-del-término-proyecto)
- [Supuestos registrados por este intake y su estado](#supuestos-registrados-por-este-intake-y-su-estado)
- [Parte A — Negocio de la solución](#parte-a--negocio-de-la-solución)
  - [§1 Idea y problema](#1-idea-y-problema)
  - [§2 Audiencia y stakeholders](#2-audiencia-y-stakeholders)
  - [§3 Propuesta de valor y diferenciación](#3-propuesta-de-valor-y-diferenciación)
  - [§4 Alcance funcional pretendido (MoSCoW)](#4-alcance-funcional-pretendido-moscow)
  - [§5 Historias de usuario / experiencias deseadas](#5-historias-de-usuario--experiencias-deseadas)
  - [§6 Flujos típicos](#6-flujos-típicos)
  - [§7 Casos límite y "qué pasa si"](#7-casos-límite-y-qué-pasa-si)
  - [§8 Métricas de éxito desde el negocio](#8-métricas-de-éxito-desde-el-negocio)
  - [§9 Lo que NO es esta solución (exclusiones)](#9-lo-que-no-es-esta-solución-exclusiones)
  - [§10 Restricciones del cliente](#10-restricciones-del-cliente)
  - [§11 Riesgos detectados desde el negocio](#11-riesgos-detectados-desde-el-negocio)
  - [§12 Glosario del dominio del cliente](#12-glosario-del-dominio-del-cliente)
- [Parte B — Composición de la solución](#parte-b--composición-de-la-solución)
  - [§13 Proyecto de código de la solución](#13-proyecto-de-código-de-la-solución)
  - [§14 Estilo arquitectónico de la solución](#14-estilo-arquitectónico-de-la-solución)
  - [§15 Esquema de descomposición y delivery](#15-esquema-de-descomposición-y-delivery)
    - [§15.1 Informe de cierre de etapa](#151-informe-de-cierre-de-etapa)
  - [§16 Estructura de repositorio de la solución](#16-estructura-de-repositorio-de-la-solución)
    - [§16.1 Materialización de `/samples`](#161-materialización-de-samples)
- [Parte C — Técnica del proyecto de código](#parte-c--técnica-del-proyecto-de-código)
  - [§17 Bloque técnico del proyecto de código](#17-bloque-técnico-del-proyecto-de-código)
    - [§17.P.1 Stack tecnológico](#17p1-stack-tecnológico)
    - [§17.P.2 Estilo arquitectónico del proyecto de código](#17p2-estilo-arquitectónico-del-proyecto-de-código)
    - [§17.P.3 Comunicación e integración](#17p3-comunicación-e-integración)
    - [§17.P.4 Persistencia](#17p4-persistencia)
    - [§17.P.5 Seguridad y autenticación](#17p5-seguridad-y-autenticación)
    - [§17.P.6 Estrategia de testing](#17p6-estrategia-de-testing)
    - [§17.P.7 Estrategia de versionado y release](#17p7-estrategia-de-versionado-y-release)
    - [§17.P.8 Pipeline CI/CD](#17p8-pipeline-cicd)
    - [§17.P.9 Compatibilidad y plataformas target](#17p9-compatibilidad-y-plataformas-target)
    - [§17.P.10 Requerimientos no funcionales (NFR)](#17p10-requerimientos-no-funcionales-nfr)
    - [§17.P.11 Decisiones técnicas pre-tomadas (pre-ADR)](#17p11-decisiones-técnicas-pre-tomadas-pre-adr)
    - [§17.P.12 Restricciones técnicas y trade-offs aceptados](#17p12-restricciones-técnicas-y-trade-offs-aceptados)
  - [§18 Estrategia de demo / samples](#18-estrategia-de-demo--samples)
- [Parte D — Anexos de datos](#parte-d--anexos-de-datos)
  - [§20 Anexo A — Escenarios con ejemplos completos](#20-anexo-a--escenarios-con-ejemplos-completos)
    - [§20.1 · E-1 · Proyecto con layout de lienzo](#201--e-1--proyecto-con-layout-de-lienzo)
    - [§20.2 · E-2 · Servicio, con sus tres variantes de origen](#202--e-2--servicio-con-sus-tres-variantes-de-origen)
    - [§20.3 · E-3 · Despliegue con su línea de tiempo de eventos y sus métricas](#203--e-3--despliegue-con-su-línea-de-tiempo-de-eventos-y-sus-métricas)
    - [§20.4 · E-4 · Enlace del lienzo y su variable generada](#204--e-4--enlace-del-lienzo-y-su-variable-generada)
    - [§20.5 · E-5 · Changeset de cambios pendientes con su informe de impacto](#205--e-5--changeset-de-cambios-pendientes-con-su-informe-de-impacto)
    - [§20.6 · E-6 · Ítem del catálogo de servicios reutilizables](#206--e-6--ítem-del-catálogo-de-servicios-reutilizables)
    - [§20.7 · E-7 · Descubrimiento de contenedores adoptables](#207--e-7--descubrimiento-de-contenedores-adoptables)
    - [§20.8 · E-8 · Reserva de direcciones IP e informe de conflicto](#208--e-8--reserva-de-direcciones-ip-e-informe-de-conflicto)
    - [§20.9 · E-9 · Esquema relacional de la base SQLite](#209--e-9--esquema-relacional-de-la-base-sqlite)
    - [§20.10 · E-10 · Alta de proyecto con API y base de datos, de extremo a extremo](#2010--e-10--alta-de-proyecto-con-api-y-base-de-datos-de-extremo-a-extremo)
    - [§20.11 · E-11 · Adopción de un contenedor existente](#2011--e-11--adopción-de-un-contenedor-existente)
    - [§20.12 · E-12 · Carga útil de un token de API emitido](#2012--e-12--carga-útil-de-un-token-de-api-emitido)
    - [§20.13 · E-13 · Contrato del endpoint de despliegue](#2013--e-13--contrato-del-endpoint-de-despliegue)
    - [§20.14 · E-14 · Exportación de un proyecto a Docker Compose](#2014--e-14--exportación-de-un-proyecto-a-docker-compose)
    - [§20.15 · E-15 · Superficie de la API REST](#2015--e-15--superficie-de-la-api-rest)
    - [§20.16 · E-16 · Catálogo de reglas de negocio RN-01 a RN-37](#2016--e-16--catálogo-de-reglas-de-negocio-rn-01-a-rn-37)
    - [§20.17 · E-17 · Ciclo de vida del despliegue y correspondencia con el motor](#2017--e-17--ciclo-de-vida-del-despliegue-y-correspondencia-con-el-motor)
    - [§20.18 · E-18 · Maquetado de la interfaz web](#2018--e-18--maquetado-de-la-interfaz-web)
    - [§20.19 · E-19 · Parque de contenedores de referencia](#2019--e-19--parque-de-contenedores-de-referencia)
    - [§20.20 · E-20 · Configuraciones reales de contenedor, ofuscadas](#2020--e-20--configuraciones-reales-de-contenedor-ofuscadas)
    - [§20.21 · E-21 · Correspondencia entre una configuración real y el modelo de la solución](#2021--e-21--correspondencia-entre-una-configuración-real-y-el-modelo-de-la-solución)
    - [§20.22 · E-22 · Casos de prueba derivados de las configuraciones reales](#2022--e-22--casos-de-prueba-derivados-de-las-configuraciones-reales)
  - [§21 Anexo B — Cobertura de los ejemplos sobre el modelo y las reglas](#21-anexo-b--cobertura-de-los-ejemplos-sobre-el-modelo-y-las-reglas)
- [Parte E — Continuidad de la Fase A generada bajo el conjunto normativo anterior](#parte-e--continuidad-de-la-fase-a-generada-bajo-el-conjunto-normativo-anterior)
  - [§22 Consolidado de 00-Contexto](#22-consolidado-de-00-contexto)
    - [§22.1 Objetivos SMART y métricas de éxito](#221-objetivos-smart-y-métricas-de-éxito)
    - [§22.2 Diferenciadores y restricciones identificados](#222-diferenciadores-y-restricciones-identificados)
    - [§22.3 Objetivos de proyecto, entregables, ambientes y criterios de aceptación](#223-objetivos-de-proyecto-entregables-ambientes-y-criterios-de-aceptación)
    - [§22.4 Roadmap por fases, épicas y etapas](#224-roadmap-por-fases-épicas-y-etapas)
    - [§22.5 Compatibilidad y plataformas](#225-compatibilidad-y-plataformas)
    - [§22.6 Acuerdo de equipo, definición de terminado y de listo](#226-acuerdo-de-equipo-definición-de-terminado-y-de-listo)
  - [§23 Consolidado de 01-Necesidades-Negocio](#23-consolidado-de-01-necesidades-negocio)
    - [§23.1 Catálogo de necesidades y su grafo](#231-catálogo-de-necesidades-y-su-grafo)
    - [§23.2 Trazabilidad de capacidad a necesidad y de necesidad a caso de uso](#232-trazabilidad-de-capacidad-a-necesidad-y-de-necesidad-a-caso-de-uso)
    - [§23.3 Los cuarenta y cuatro criterios de éxito](#233-los-cuarenta-y-cuatro-criterios-de-éxito)
    - [§23.4 Decisiones de recorte del catálogo](#234-decisiones-de-recorte-del-catálogo)
    - [§23.5 Dolores específicos y responsabilidades por necesidad](#235-dolores-específicos-y-responsabilidades-por-necesidad)
  - [§24 Estado de decisiones, pendientes y especificaciones derivadas al cierre de la Fase A](#24-estado-de-decisiones-pendientes-y-especificaciones-derivadas-al-cierre-de-la-fase-a)
    - [§24.1 Las dieciséis especificaciones derivadas y su estado de revisión](#241-las-dieciséis-especificaciones-derivadas-y-su-estado-de-revisión)
    - [§24.2 La matriz de navegadores, única pendiente que espera decisión](#242-la-matriz-de-navegadores-única-pendiente-que-espera-decisión)
    - [§24.3 Los tres objetos declarados y no diseñados](#243-los-tres-objetos-declarados-y-no-diseñados)
    - [§24.4 Precauciones y hallazgos que la Fase A deja asentados](#244-precauciones-y-hallazgos-que-la-fase-a-deja-asentados)
- [§19 Checklist de completitud del intake](#19-checklist-de-completitud-del-intake)
- [Trazabilidad downstream](#trazabilidad-downstream)
- [Control de cambios](#control-de-cambios)

## Procedencia de este intake y convención de marcadores

Este intake se construyó integrando cuatro documentos de entrada. Los tres primeros residen en el repositorio de documentación, bajo `DEV/SelfHosted.Service.Core.Documentos/PROMPTs/02-Ejecutar-Prompt-Integrador-Documento-Intake/INPUTs/`; el cuarto se incorporó en la versión 1.2 y reside en `DEV/SelfHosted.Service.Core.Documentos/Analisis/Analisis-SaaS-Service/Analisis-Rayway.md`:

| Fuente | Rol en este intake | Precedencia |
|---|---|---|
| `Analisis-Final-Integrado.md` | Definición completa de la solución: dominio, modelos de datos, decisiones técnicas evaluadas, maquetado, reglas de negocio, riesgos y glosario | Base |
| `Requerimientos-Funcionales.md` | Decisiones funcionales y de planeamiento por etapas, con sus hitos, guiones de demostración y puntos de control | Prevalece sobre la base en materia funcional y de entrega |
| `Requerimientos-Tecnicos.md` | Decisiones técnicas cerradas: versiones ancladas, entorno de desarrollo, autenticación, persistencia, pruebas, despliegue, puertas técnicas y flujo de trabajo | Prevalece sobre la base en materia técnica |
| `Analisis-Rayway.md` (fecha 2026-07-26, estado `draft`) | Relevamiento del modelo de abstracción de la plataforma comercial equivalente que §11 declara como antecedente funcional: definición formal de sus entidades (§3.2), mecanismo de referencias entre variables y semántica de las aristas del lienzo (§3.5), invariantes del modelo (§3.6) y traducción de ese modelo a un entorno Docker autoalojado (§7). **No es fuente normativa de la solución:** es evidencia de cómo resuelve el problema el producto de referencia, y sólo entra al intake por las decisiones D-5, D-6 y D-7, que la citan explícitamente | Aporta evidencia; no prevalece sobre las tres anteriores |

**Regla de autocontención sobre esta cuarta fuente.** Todo lo que este intake toma de `Analisis-Rayway.md` está **transcripto** en el cuerpo o en los anexos, con la sección de origen citada; ningún dato del intake se respalda únicamente en ese archivo, igual que con las tres fuentes anteriores. Lo transcripto de ese documento se marca **[E]** respecto de él, aclarando que la evidencia es sobre el producto de referencia y no sobre esta solución.

Se conserva la convención de marcadores de la fuente base, porque es la que permite distinguir hecho de propuesta sin ambigüedad:

- **[E]** Evidencia: dato verificable en las fuentes citadas (versión y fecha de un paquete, cita textual de documentación oficial, relevamiento del entorno).
- **[D]** Diseño: decisión argumentada, tomada por el análisis integrado, por los documentos de requerimientos o por el agente humano del proyecto. Es discutible y revisable, pero está declarada. Cuando lleva fecha y la mención del agente humano del proyecto, es un dato cerrado del cliente.
- **[D-i]** Diseño de integración: **marcador nuevo en la versión 1.2.** Especificación derivada por el orquestador **al integrar** una decisión del agente humano, para hacerla operable. No la decidió el agente humano y no es un dato cerrado del cliente: es propuesta del integrador, argumentada y **aplicada** en el documento para que la cadena no se bloquee, pero pendiente de confirmación. Todo pasaje marcado `[D-i]` corresponde a una entrada de la tabla «Especificaciones de integración pendientes de confirmación» de §19, que las enumera como DI-01 a DI-16; una regla puede llevar el marcador sólo en parte de su enunciado, y en ese caso la propia regla declara qué parte es `[D]` y cuál `[D-i]`. Un artefacto downstream puede consumirla, y debe declararla como revisable, nunca como requisito cerrado del cliente.
- **[FA]** Fase A previa: material **derivado por los subagentes de la Fase A** bajo el conjunto normativo anterior al 4.0, transcripto en la Parte E de este documento para que la regeneración no lo pierda. No es dato del cliente ni decisión del agente humano, salvo en los puntos donde la propia Parte E declara que él se pronunció. Su definición completa y su diferencia con los otros marcadores están en la sección «Migración al Framework SDD 4.0».
- **[S]** Supuesto: asunción registrada ante información faltante en las fuentes. Requiere confirmación del agente humano del proyecto antes de que el orquestador la trate como cerrada. Todo supuesto de este intake está listado en la sección siguiente, con su estado de confirmación.

**Por qué hace falta `[D-i]` y en qué se diferencia de `[S]`.** Un supuesto `[S]` cubre información que **falta** en las fuentes y que el intake rellena con un valor operable. Un `[D-i]` cubre otra cosa: una decisión del agente humano que **está tomada** pero que, para quedar operable, exige resolver detalles que ella no fija —qué identificadores concretos usa una sintaxis, qué se persiste, qué código HTTP devuelve un endpoint—. La diferencia importa porque el destino es distinto: un `[S]` se confirma o se cambia de valor; un `[D-i]` se confirma, se ajusta o se reemplaza por otra especificación igualmente compatible con la decisión que lo originó. Mezclarlos bajo `[D]` fue el defecto que esta versión corrige: presentaba como dato cerrado del cliente lo que era propuesta del integrador.

## Decisiones del agente humano incorporadas en la versión 1.2

El 2026-07-28, respondiendo una batería de preguntas del orquestador, el agente humano del proyecto tomó siete decisiones. **No son propuestas de este intake: son datos cerrados**, y por eso se marcan **[D]** con su fecha y su origen, nunca **[S]**. Esta tabla es su índice; cada una está desarrollada en la sección que le corresponde.

| # | Decisión | Fecha y origen | Dónde vive |
|---|---|---|---|
| D-1 | CL-04 resuelto: el despliegue vive del lado del servidor y su resultado se determina **por contenedor, no por operación**. Un despliegue parcial es un estado legítimo del modelo | 2026-07-28, agente humano del proyecto | §7 (CL-04), E-3, E-13, E-15 (`GET /operaciones/{id}`), E-17, E-22 (T-31), RN-31 |
| D-2 | CL-15 resuelto: el carácter de secreto **se declara, no se infiere**. La heurística por nombre deja de decidir y pasa a sugerir; la adopción no se completa sin un paso obligatorio de clasificación de variables | 2026-07-28, agente humano del proyecto | §7 (CL-15), §17.3 P.5, E-7 (RA-05, RA-06), E-11, E-15 (`GET /descubrimiento/contenedores/{id}/variables`), E-20 (C-2), E-21, E-22 (T-17, T-17b, T-32, T-33), RN-29 |
| D-3 | IC-05 cerrado sin cambios: I10 y RN-11 ya lo resuelven. Se incorpora el fundamento completo, que el intake no declaraba | 2026-07-28, agente humano del proyecto | §17.4 P.11, §19 |
| D-4 | Arranque parcial confirmado sin cambios: las tres resoluciones ante conflicto o fallo, incluida la de arrancar parcialmente, quedan como están | 2026-07-28, agente humano del proyecto | §7 (CL-01), E-8, RN-20 |
| D-5 | Se incorpora la **variable compartida del proyecto**: definida una vez a nivel proyecto y referenciable desde cualquiera de sus servicios | 2026-07-28, agente humano del proyecto | §4 (F-23), §12, §17.3 P.5, E-1, E-2, E-5, E-9, E-10, E-14, E-15, RN-27, RN-28, E-22 |
| D-6 | Se incorpora la **referencia entre variables** en tres formas —al propio servicio, a una compartida del proyecto y a otro servicio del mismo proyecto—, con la sintaxis `${{ … }}` tomada del análisis de la plataforma de referencia. **Reformulada en una segunda pasada el 2026-07-28** (ver la nota que sigue a esta tabla) | 2026-07-28, agente humano del proyecto; especificación rehecha el 2026-07-28 con autorización explícita del agente humano | §4 (F-24), §12, §17.1 P.3, §17.3 P.5, §17.4 P.11, E-1, E-2, E-4, E-5, E-6, E-9, E-10, E-13, E-14, E-21, RN-01, RN-04, RN-05, RN-14, RN-21 a RN-26, RN-32, E-22 |
| D-7 | El catálogo es una **cuarta vía de alta**, no un cuarto origen, y un ítem pasa de contener un servicio a contener un **subgrafo parametrizado** de uno o varios servicios con sus aristas | 2026-07-28, agente humano del proyecto | §4 (F-14), §12, §16, E-6, E-10, E-15, RN-30, E-22 |
| D-8 | La referencia se vincula **al servicio, no a su nombre**: renombrar un servicio no rompe ninguna referencia, y un servicio puede llamarse `shared` sin ambigüedad | 2026-07-28, agente humano del proyecto, tercera pasada | §12, E-2, E-4, E-9, E-14, E-16 (RN-01, RN-21, RN-33), E-22 |
| D-9 | **Se elimina la variable de puerto.** El puerto se escribe literal en la expresión; al trazar la flecha el sistema lo toma del destino y, si hay varios, pregunta cuál | 2026-07-28, agente humano del proyecto, tercera pasada | §12, E-1, E-2, E-4, E-10, E-14, E-16 (RN-32), E-22, §19 |
| D-10 | **El puerto es dato de la arista**: la arista registra a qué puerto apunta, como registro de la dependencia y no como mecanismo de resolución | 2026-07-28, agente humano del proyecto, tercera pasada | E-1, E-4, E-9, §17.4 P.11 |
| D-11 | **Esperar al destino es una propiedad declarada de la arista**, no una deducción de qué variable se referencia. El sistema propone el valor y el usuario lo cambia | 2026-07-28, agente humano del proyecto, tercera pasada | §17.4 P.11, E-1, E-4, E-9, E-16 (RN-04, RN-05, RN-14, RN-34), E-21, E-22, §19 |
| D-12 | **Principio de identidad de objeto**: todo elemento que se referencia, que sobrevive al objeto que lo contiene o que tiene ciclo de vida propio es un objeto con identidad, y las relaciones se establecen **por identidad y nunca por nombre** | 2026-07-28, agente humano del proyecto, quinta pasada | §12, §17.4 P.11, E-2, E-4, E-9, E-16 (RN-01, RN-28, RN-33, RN-35), E-22, §19 |
| D-13 | **La higiene del modelo entra al alcance**: el sistema detecta y **advierte, sin bloquear**, cinco condiciones —variables huérfanas, nombres repetidos, claves que coinciden al instanciar y referencias sin uso— | 2026-07-28, agente humano del proyecto, quinta pasada | §4 (F-25), §12, E-16 (RN-36, RN-37), E-22, §19 |

### Segunda pasada sobre D-6: la plataforma de referencia como tutor

**Decisión del agente humano del proyecto, 2026-07-28.** La primera especificación de D-6 se apartaba de la plataforma de referencia en dos puntos —cambiaba sus espacios de nombres y agregaba un tipo de arista propio— y el agente humano autorizó explícitamente rehacerla **tomando la fuente como tutor en lugar de apartarse de ella**. No es una corrección de defectos: es la misma decisión D-6, especificada sobre otra base, y el resultado es un modelo más chico.

**Qué estaba mal en el argumento anterior.** La especificación descartaba el nombre de servicio pelado sosteniendo que frente a `${{ x }}` no se puede saber si `x` es una variable propia o un servicio ajeno sin consultar el conjunto de nombres de servicio. **El argumento era falso**, y lo desmiente la propia transcripción de `Analisis-Rayway.md` §3.5 que este intake ya tenía en el anexo [E-4](#204--e-4--enlace-del-lienzo-y-su-variable-generada): la gramática de la fuente se decide por **cantidad de segmentos**, no por conocer los nombres. Un segmento es variable propia, dos son otro servicio, y `shared` es el espacio de nombres reservado del proyecto —lo que no implica prohibir que un servicio se llame así, como se ve más abajo—. Un parser decide sin consultar nada, que es exactamente la propiedad que el prefijo `servicios.` pretendía comprar: se estaba pagando dos veces por lo mismo.

**El hallazgo mayor, que es lo que simplifica el modelo.** La misma sección de la fuente declara que en la plataforma de referencia conviven dos tipos de vínculo entre servicios y **sólo uno es explícito**: la red privada es automática e implícita, y la referencia de variable es la única que genera la relación que el lienzo dibuja. Nuestro modelo tenía dos tipos de arista —enlace de host y puerto, y referencia— unificados con un discriminador, que era un parche sobre una complejidad que la fuente no tiene.

La pieza que faltaba y que lo explica: en la fuente, `${{ backend.RAILWAY_PUBLIC_DOMAIN }}` funciona **sin que nadie haya declarado** una variable de dominio en `backend`. La plataforma la provee. Eso es lo que hace que un solo mecanismo alcance. Este modelo no tenía equivalente, y por eso necesitaba el enlace de host y puerto como cosa aparte: era la única manera de que un servicio obtuviera la dirección de otro.

**Los tres cambios que se derivan**, desarrollados en el anexo [E-4](#204--e-4--enlace-del-lienzo-y-su-variable-generada):

1. **Sintaxis alineada con la fuente:** `${{ CLAVE }}`, `${{ shared.CLAVE }}` y `${{ <nombre-servicio>.CLAVE }}`. Se elimina el prefijo `servicios.` y se recupera `shared.`.
2. **Variables provistas por el sistema:** cada servicio expone variables de sólo lectura que el sistema provee y el usuario no declara ni edita, entre ellas su host interno y su puerto. Es la pieza nueva, y es la que habilita el punto 3.
3. **Un solo mecanismo de vínculo:** el enlace de host y puerto deja de ser un tipo de arista y pasa a ser **azúcar de interfaz**. El usuario arrastra la flecha y el sistema escribe la referencia a las variables provistas del destino; lo que se persiste es una referencia común. Desaparece el discriminador `tipo`, desaparece la sintaxis `{destino.host}` y quedan dos sintaxis en el modelo, no tres.

### Tercera pasada: cuatro decisiones puntuales sobre el modelo de vínculo

**Decisiones del agente humano del proyecto, 2026-07-28.** El mecanismo unificado de la segunda pasada **se conserva entero**: un solo tipo de vínculo, la sintaxis alineada con la fuente, las tres formas de referencia, la resolución en el backend antes de crear el contenedor y la convivencia con Compose en los dos sentidos. Lo que cambia son cuatro puntos, y tres de ellos corrigen especificaciones que había derivado el orquestador.

**De dónde salieron.** El agente humano pidió fundamentar cada especificación derivada contrastándola contra la plataforma de referencia. El contraste mostró que de las catorce especificaciones **una sola era enteramente heredada**, y que la fuente **no documenta** tres cosas sobre las que el orquestador había decidido: qué hace con un servicio llamado `shared`, cómo se obtiene el puerto de otro servicio, y cómo ordena los arranques. Donde la fuente calla, el método adoptado fue **especular sobre qué mecánica vuelve innecesaria la aclaración**, en lugar de construir una defensa propia.

**D-8 · La referencia se vincula al servicio, no a su nombre.** Si la fuente no aclara qué pasa con un servicio llamado `shared`, la hipótesis más probable —coherente con que su editor tiene paleta de comandos y creación guiada— es que **no persiste el nombre en la referencia sino el vínculo al servicio, y muestra el nombre**. Eso resuelve tres problemas de una vez, y el segundo este intake no lo había visto:

| Problema | Antes de esta pasada | Con el vínculo persistido |
|---|---|---|
| Un servicio se llama `shared` | Ambigüedad al leer, resuelta prohibiendo el nombre | No existe: el espacio de nombres se resuelve al escribir |
| **Se renombra un servicio referenciado** | **Se rompen en silencio todas las referencias que le apuntan** | La interfaz muestra el nombre nuevo y nada se rompe |
| Error de tipeo en el nombre | Referencia inválida detectada al validar | Imposible: el servicio se elige de una lista |

**D-9 · Se elimina la variable de puerto.** La fuente no provee variable de puerto: documenta su DNS interno como `<servicio>.internal:PORT`, con el puerto escrito a mano. Su criterio, deducible del conjunto, es proveer como variable **lo que el usuario no puede saber de antemano**, y dejar como convención lo que sí. El puerto lo declaró el usuario. Desaparece `SELFHOSTED_PORT` y el puerto pasa a escribirse literal.

**D-10 · El puerto es dato de la arista.** Al sacar la variable, el puerto queda literal dentro de un texto y el sistema perdería la capacidad de saber qué depende de qué puerto. La arista vuelve a registrar a qué puerto apunta, **con un rol distinto del que tenía antes de la segunda pasada**: no es parte del mecanismo de resolución —la expresión ya lleva el literal— sino el registro de la dependencia, que es lo que permite marcar con precisión qué servicios quedan desactualizados al cambiar un puerto, en lugar de buscar el número por texto.

**D-11 · Esperar al destino es una propiedad declarada, no una deducción.** Corrige la especificación DI-06 de la segunda pasada, que deducía el orden de arranque de qué variable se referencia. **La heurística falla en los dos sentidos:** un servicio que referencia el host de otro pero tiene reintentos de conexión **no necesita esperar**, y el sistema lo obligaba; un servicio que no referencia nada del otro porque la cadena de conexión vive en una variable compartida **sí necesita que esté arriba**, y el sistema no lo sabía. Qué variable se referencia no dice si hay que esperar: son dos cosas distintas que se parecen. La espera pasa a ser una propiedad de la arista que el sistema propone y el usuario cambia.

**Las cinco relaciones que esta pasada cambió, y el método que las produjo.** Una decisión no se propaga buscando las palabras que elimina: se propaga buscando las **afirmaciones** que deja de ser ciertas. Los restos de las pasadas anteriores sobrevivieron porque no repetían el término eliminado sino la relación que ese término expresaba —«arrastra el orden de arranque» no contiene ninguno de los términos que se habían dado de baja—. El método adoptado, y que toda pasada futura debe seguir, es **derivar la lista de relaciones de la decisión antes de aplicarla**: cada cosa que una decisión elimina o reemplaza cambia al menos una relación, y la lista se deja escrita para que el barrido sea auditable contra ella y no contra la memoria de quien lo corrió.

| # | Antes decía | Ahora dice | Decisión |
|---|---|---|---|
| R1 | Referenciar el host o el puerto **determina** el orden de arranque | **Declarar espera** determina el orden de arranque | D-11 |
| R2 | El puerto **se resuelve** por variable provista | El puerto se escribe **literal** y la arista lo registra | D-9, D-10 |
| R3 | El **nombre** del servicio identifica la referencia | El **vínculo** identifica la referencia; el nombre se muestra | D-8 |
| R4 | Un servicio **no puede llamarse** `shared` | Un servicio **puede** llamarse `shared` | D-8 |
| R5 | Toda arista **nace de una referencia** de variable | Casi toda arista nace de una referencia, y una puede existir **sin variable** si declara espera | D-11 |

Cada una se barre por su **predicado** —«determina», «se deduce de», «arrastra», «exige», «nace de», «necesita para existir»— y no por su sustantivo.

**Paso que faltaba, incorporado tras la quinta pasada: barrer también por forma.** El barrido por afirmación cubre **prosa**, porque una afirmación se localiza por su predicado. Pero cuando una decisión cambia la **forma de un dato** —una expresión, un identificador, la estructura de un registro—, los ejemplos de instancia de la Parte D **no afirman nada: exhiben una forma**, y ningún barrido por predicado los encuentra. Fue exactamente lo que pasó con la consecuencia 1 de D-12: la regla decía que la referencia vincula también la variable, y seis ejemplos seguían mostrando la forma anterior, incluido el que la propia decisión citaba como estado previo. Toda pasada que cambie una forma debe barrer, además, **el patrón viejo en los ejemplos**, con una consulta que reconozca la forma nueva y liste lo que no la cumple. R5 es la que esta pasada agregó tarde: se detectó como instancia suelta antes de promoverla a relación, y los dos restos que sobrevivieron a la primera corrección estaban exactamente ahí.

**Cuarta disciplina, incorporada tras la quinta pasada: enumerar las réplicas por identificador de decisión.** Las tres anteriores —término, afirmación y forma— no alcanzan cuando lo que cambia no es *qué se afirma* sino **cómo se enuncia**. Este intake **replica sus enunciados a propósito**, para que cada registro se lea solo: el principio de D-12 aparece en el índice de decisiones, en el enunciado de la subsección, en el glosario, en §17.4 P.11 y en RN-35, cinco veces con las mismas palabras. Cuando se reformula uno, los otros cuatro siguen siendo **prosa correcta** —no afirman nada falso— y por eso ningún barrido por relación los encuentra: sólo quedan desalineados con el canónico.

La contramedida es barata porque el documento ya tiene el mapa: **cada réplica cita la decisión que la origina**, de modo que buscar el identificador —`D-12`— devuelve las cinco, y basta verificar que digan lo mismo. Toda pasada que cambie la **redacción** de un enunciado, y no sólo su contenido, debe enumerar sus réplicas por identificador de decisión antes de darse por terminada.

**Advertencia para la Fase B.** El problema **escala con la cantidad de artefactos**, y la Fase B lo multiplica por doce categorías (desde la versión 2.2 ya no por cuatro proyectos de código, porque hay uno solo): un enunciado del intake que hoy tiene cinco réplicas internas va a tener decenas repartidas en documentos que ya no están en este archivo. La «Trazabilidad downstream» de este intake sirve para eso **leída en el otro sentido**: no sólo para saber qué documento deriva de qué sección, sino **qué documentos hay que revisar cuando un enunciado de esa sección cambia de forma**. El orquestador de la Fase B debería tratarla como índice de propagación y no sólo como índice de origen.

**La primera parada de cualquier barrido es §17.4 P.11.** Es la tabla de decisiones de modelo de la que el proyecto de código de dominio deriva, y por eso un resto ahí es siempre de gravedad máxima: alojó el defecto principal de las tres últimas correcciones. Se revisa entera, fila por fila, contra la lista de relaciones, antes que cualquier anexo.

### Quinta pasada: identidad de objeto e higiene del modelo

**Decisiones del agente humano del proyecto, 2026-07-28.** Salieron de analizar los dos conflictos de instanciación que quedaban pendientes en §19. La observación de fondo: si cada elemento tuviera identidad propia como objeto, esos conflictos **se resolverían por modelo en lugar de por regla**. El análisis mostró que el modelo ya aplicaba el principio a medias —once tablas tienen identificador propio y D-8 vinculó las referencias al servicio—, pero que la vinculación se había detenido ahí.

**D-12 · El principio.** Todo elemento que alguien referencia, que sobrevive al objeto que lo contiene o que tiene ciclo de vida propio es un **objeto con identidad**, y las relaciones entre objetos se establecen **por identidad y nunca por nombre**. El nombre es un atributo del objeto, no su identidad.

**La prueba que separa objeto de atributo**, que existe para que el principio no degenere en «una tabla para todo»: es **objeto** lo que se referencia, lo que **sobrevive al objeto que lo contiene**, o lo que tiene ciclo de vida propio; es **atributo** todo lo demás.

La segunda condición se enuncia así, y no como «sobrevive al objeto que lo contiene», por una razón de vocabulario propia de este documento: acá «contenedor» significa **contenedor Docker**, y con esa lectura la condición diría otra cosa —un montaje sobrevive al contenedor, y de ahí saldría que es objeto, contra I6, RN-09 y RN-10—. Lo que la prueba pregunta es si el elemento sobrevive a la **entidad del modelo que lo declara**. Aplicada al modelo actual:

| Elemento | Veredicto | Por qué |
|---|---|---|
| Recursos, healthcheck, layout del lienzo | **Atributo** | Nadie los referencia, no sobreviven al servicio que los declara y no tienen ciclo propio. Siguen como están |
| **Declaración de montaje** | **Atributo** | Es configuración del servicio: nadie la referencia y desaparece con él. Sigue como está |
| **El volumen o directorio al que un montaje apunta** | **Objeto — pero hoy no está modelado** | Sobrevive al servicio: I6 lo declara, RN-09 lo protege al detener y RN-10 ofrece conservarlo al eliminar. Hoy el modelo sólo guarda su **nombre** dentro del JSON del montaje, de modo que un volumen conservado tras eliminar su servicio queda en el motor sin ninguna entidad que lo represente. La prueba lo clasifica como objeto; **modelarlo es materia de la Fase C**, junto con el secreto y la red |
| Servicio, despliegue, enlace, changeset, variable, token, reserva de dirección, ítem de catálogo | **Objeto** | Ya lo son |
| **Secreto** | **Objeto, y hoy no lo es** | Se referencia como el texto `"sec-011"`, sin entidad propia. Se comparte entre servicios, se rota y tiene historia |
| **Red del proyecto** | **Objeto, y hoy no lo es** | Vive como JSON dentro del proyecto. La comparten todos sus servicios, se crea antes que los contenedores, sobrevive a ellos, y las reservas de dirección hablan de ella |

**Las cinco consecuencias, todas [D], D-12:**

1. **La referencia se vincula también a la variable, no sólo al servicio.** Hasta esta pasada, `${{ db#103.POSTGRES_USER }}` vinculaba el servicio y dejaba la clave como texto, de modo que renombrar la variable rompía la referencia en silencio. Es el mismo defecto que D-8 corrigió un nivel más arriba, sin terminar de bajar un nivel más.
2. **La unicidad del nombre se exige sólo donde cumple una función**, y son dos casos y nada más: el **alias DNS** de un servicio dentro de la red de su proyecto, porque es lo que el motor resuelve, y la **clave de una variable de servicio** dentro de su contenedor, porque es el contrato con el proceso que corre adentro.
3. **Las variables compartidas dejan de exigir clave única en el proyecto.** Su clave es puramente descriptiva: no la lee ningún proceso y existe sólo para ser referenciada. Dos compartidas pueden llamarse igual y distinguirse por identidad.
4. **El secreto pasa a ser objeto**, con identidad propia en lugar de una cadena de texto.
5. **La red del proyecto pasa a ser objeto**, en lugar de un bloque JSON dentro del proyecto.

**D-13 · La higiene del modelo entra al alcance.** Es capacidad nueva, y la identidad de objeto la vuelve barata. El sistema **detecta y advierte, sin bloquear**, cinco condiciones; el detalle está en la capacidad F-25 de §4 y en las reglas RN-36 y RN-37.

**Lo que D-13 da vuelta, y es su fundamento.** En lugar de **preguntar antes de instanciar** y obligar al usuario a decidir a ciegas —sin saber todavía si las dos cosas que se llaman igual son la misma—, el sistema **crea separado, que es lo seguro, y después informa** si detecta que probablemente convenga compartir. La decisión se toma con la información delante y es reversible, que es lo contrario de un diálogo modal que bloquea.

**Las relaciones que esta pasada cambia**, derivadas antes de aplicarla, según el método que la tercera pasada dejó asentado:

| # | Antes decía | Ahora dice |
|---|---|---|
| R1 | Una referencia vincula **el servicio**, y la clave de la variable viaja como texto | Vincula **el servicio y la variable**, las dos por identidad |
| R2 | El nombre es único **donde el modelo lo declara**: servicio en el proyecto, clave en el servicio, clave compartida en el proyecto | El nombre es único **sólo donde cumple una función**: alias DNS en la red, y clave de variable de servicio en el contenedor |
| R3 | Qué es objeto y qué es atributo está **implícito** y aplicado a medias | Está **declarado**, con una prueba de tres condiciones |
| R4 | Una colisión al instanciar **se resuelve preguntando** o queda pendiente de decidir | Se resuelve **creando separado**, y después se advierte si conviene compartir |
| R5 | El sistema **no observa** el estado del modelo | **Detecta y advierte** cinco condiciones de higiene, sin bloquear |

El predicado de barrido de R2 es **qué exige unicidad y por qué**, que es la relación más fácil de pasar por alto, porque el documento afirmaba unicidad en varios lugares sin distinguir si era por función o por mecanismo de vinculación.

**Límite de alcance: qué queda para la Fase C.** Esta pasada declara el principio, sus consecuencias y lo que cambia de forma observable. **No diseña el esquema.** El modelo lógico de los dos objetos nuevos —secreto y red del proyecto—, su mapeo relacional, sus claves, sus índices y la migración desde la forma actual son materia de la categoría `05-Arquitectura-Tecnica`, en la Fase C, en sus secciones de las capas `Domain` e `Infrastructure`, con el modelo de dominio completo delante. El anexo [E-9](#209--e-9--esquema-relacional-de-la-base-sqlite) refleja **que** esos elementos son objetos y que las referencias llevan vínculo; **cómo** se persiste cada uno no se resuelve acá.

### Qué decidió el agente humano y qué derivó el integrador

Tres de las siete decisiones no llegaron cerradas hasta el último detalle: D-6 encargó resolver el momento de resolución y el efecto en el grafo —la sintaxis dejó de ser materia del integrador en la segunda pasada, donde el agente humano la fijó completa—, y D-1 y D-2 dejaron sin fijar el contrato exacto de la API que las hace observables. Esos detalles **se resolvieron al integrar y están aplicados**, pero son propuesta del orquestador, no dato cerrado del cliente. Se marcan **[D-i]** y se enumeran acá y en §19, para que un lector distinga de un vistazo lo uno de lo otro:

| Punto | Qué decidió el agente humano **[D]** | Qué derivó el integrador **[D-i]** | Dónde |
|---|---|---|---|
| Sintaxis de la referencia | **Las tres formas completas, con sus identificadores**: `${{ CLAVE }}`, `${{ shared.CLAVE }}` y `${{ <nombre-servicio>.CLAVE }}`, alineadas con la plataforma de referencia. En la segunda pasada la sintaxis dejó de ser materia del integrador. En la tercera, **D-8 agregó que la referencia se vincula al servicio y no a su nombre** | La regla de decisión por cantidad de segmentos, y la **forma concreta del vínculo**: persistir la expresión vinculada con el identificador del destino y renderizar el nombre. La reserva del nombre `shared` que esta fila declaraba **se dio de baja**: D-8 la volvió innecesaria y RN-01 recuperó su enunciado original | E-4, E-16 (RN-01, RN-33) |
| Sintaxis de la referencia | — | La forma canónica de persistencia de la expresión | E-4, E-9 |
| Sintaxis de la referencia | — | El escape `$${{` para un `${{` literal | E-4, E-16 (RN-25, RN-26) |
| Momento de resolución | Que se resuelve en el backend antes de crear el contenedor y que el contenedor ve el valor, nunca la expresión (RN-24) | **Qué se persiste**: la expresión sin resolver como fuente de verdad y el último valor resuelto como materialización | E-4, E-9 |
| Variables provistas por el sistema | Que cada servicio exponga variables de sólo lectura que el sistema provee y el usuario no declara ni edita, con el host interno entre ellas. Es lo que habilita el mecanismo único. En la tercera pasada, **D-9 eliminó la variable de puerto**: el puerto lo declaró el usuario y se escribe literal | El prefijo `SELFHOSTED_` en inglés y el carácter de no secretas; y de la evaluación que pidió D-9, conservar `SELFHOSTED_SERVICE_NAME` y eliminar `SELFHOSTED_PROJECT_NAME` | E-4, E-16 (RN-32) |
| Efecto en el grafo | Que la referencia a otro servicio genere arista, que marque al que referencia como pendiente de redespliegue cuando el valor cambia, y que el enlace de host y puerto sea **azúcar de interfaz** sobre ese único mecanismo | Que sólo las referencias de red ordenaran el arranque y exigieran canal, con el predicado derivado de la clave referenciada. **Corregido por D-11 en la tercera pasada**: la espera pasó a ser propiedad declarada | §17.4 P.11, E-4, E-9, E-16 (RN-04, RN-05, RN-14) |
| Convivencia con Compose | — (D-6 no dice nada sobre importación ni exportación) | **RN-25 y RN-26 completas**, con su regla de escape en los dos sentidos | E-4, E-14, E-16, E-21 |
| Integridad de las referencias | **El ámbito de RN-21**: que los ámbitos válidos sean exactamente los tres de la tabla de D-6 y que una referencia no cruce el límite del proyecto | De RN-21, sólo su exigibilidad: el momento de validación, el `422` y la enumeración de causas. Y completas: RN-22 (ciclos de resolución), RN-23 (propagación del secreto), RN-27 (no eliminar con referencias vigentes) y RN-28 (unicidad de la clave compartida) | E-16 |
| Contrato de la operación en lote (D-1) | Que el resultado se determina por contenedor y que un despliegue parcial es legítimo (RN-31) | La política de códigos de respuesta —`202`/`200`, el fallo parcial que no es error de la operación y el `5xx` reservado— y el campo `serviciosNoAlcanzados` | E-13 |
| Contrato de la adopción (D-2) | Que la clasificación de variables es obligatoria y que sin ella la adopción no se completa (RN-29) | El `422` como respuesta concreta y el corolario de versionado de `/api/v1` | E-15, E-16 |
| Ámbito de la variable compartida (D-5) | Que existe, que es referenciable desde cualquier servicio del proyecto y que puede ser secreta | Que **no puede a su vez contener una referencia**, con su argumento, y el acotamiento de RN-22 que se deriva de ello | E-4, E-9, E-16 |

Ninguno de estos puntos contradice la decisión que lo originó: son las formas concretas que hacían falta para que la decisión fuera implementable. Si el agente humano prefiere otra, se cambia la especificación sin tocar la decisión.

### Cuarta pasada: desambiguación del término «proyecto»

**Decisión del agente humano del proyecto, 2026-07-28.** Es una pasada **de terminología, no de modelo**: no cambia ninguna regla, ningún flujo y ninguna decisión. El modelo de las tres pasadas anteriores queda intacto.

El problema: la palabra «proyecto» designaba dos cosas distintas y el glosario lo advertía sin resolverlo. Una advertencia no alcanza cuando el término aparece quinientas veces y los dos sentidos conviven en la misma página. Los dos términos quedan fijados en §12:

| Término | Qué designa |
|---|---|
| **Proyecto SelfHosted** | Lo que crea el usuario desde el portal web: el conjunto de servicios contenedorizados con su red y su lienzo |
| **Proyecto de código** | Cada una de las cuatro unidades de la composición de §13. Variante larga admitida: «proyecto de código fuente»; la forma canónica es la corta |

**La relación de vocabulario que esta pasada cambia**, en el formato que la tercera pasada dejó asentado —una decisión se propaga buscando las afirmaciones que deja de ser ciertas, no las palabras que elimina—:

| # | Antes decía | Ahora dice |
|---|---|---|
| V1 | «Proyecto» a secas designa **cualquiera de los dos sentidos**, y el lector desambigua por contexto | «Proyecto» a secas designa el **proyecto SelfHosted** en contexto de producto y el **emprendimiento** en contexto de proceso; la unidad de compilación se escribe siempre **completa**, como «proyecto de código» |

Es una sola relación, y su predicado de barrido es **qué designa el término desnudo**. De ella se derivan las tres reglas de aplicación:

1. **Forma completa** en la primera mención de cada sección o anexo, en toda definición, y allí donde el otro sentido aparece cerca, en el mismo párrafo o tabla.
2. **Forma corta «proyecto»** donde el contexto ya la fijó y el otro sentido no está cerca. Es deliberada y está declarada en §12, para que no se lea como descuido.
3. **«Proyecto de código» siempre completo**, sin excepción: es el sentido que aparecía sin calificar y el que producía la confusión.

**Qué títulos se calificaron y cuáles no, y por qué la asimetría.** La pasada cambió siete títulos —§13, la Parte C, §17 y los cuatro bloques P.2— y **no** cambió los veintidós títulos de los anexos de la Parte D, ni el de §19, ni el de E-4, que ya tenía su propia declaración. El criterio no es el tipo de título sino **si de él se deriva un ancla que el documento usa**:

| Títulos | Criterio | Resultado |
|---|---|---|
| Secciones del cuerpo (§13, Parte C, §17, los cuatro P.2) | **Ningún enlace del documento apunta a ellos.** Se citan por su número —«§13», «§17.4 P.11»—, que es texto y no ancla, y que no cambia | **Se calificaron.** El cambio de ancla no rompe nada porque no había ancla en uso |
| Anexos de la Parte D | De cada uno se deriva el ancla con la que el cuerpo lo cita. Son las **únicas veintidós anclas** del intake y están todas en uso | **No se calificaron.** La calificación se aplicó en la primera línea de prosa de cada anexo, que es donde el lector la necesita |

Es el mismo criterio con el que la segunda pasada conservó el título del anexo E-4 pese a contener un término retirado, y con el que se conserva la ubicación de §19: **no se rompe un ancla en uso por una mejora de redacción**. Las dos decisiones están registradas en la tabla de observaciones no aplicadas de §19, y ésta se declara acá para que la asimetría no se lea como inconsistencia.

**Nada técnico cambió, y es deliberado.** Conservan su forma la tabla `proyectos`, la columna `proyecto_id`, la clave JSON `proyectoId`, los endpoints `/api/v1/proyectos…`, el ámbito `proyectos:leer`, las carpetas `Proyectos/` de §16, los campos `Nombre-Proyecto` y `nombre-proyecto-codigo`, y los cuatro nombres de proyecto de código. El motivo: **dentro del producto el segundo sentido no existe**, de modo que no hay nada que desambiguar en la API ni en el esquema, y alargar esos identificadores costaría ergonomía sin resolver ninguna confusión.

**Un tercer sentido que no se toca.** «Proyecto Compose» —el que agrupa los servicios de un archivo `docker-compose.yml`— aparece en los anexos [E-19](#2019--e-19--parque-de-contenedores-de-referencia), [E-20](#2020--e-20--configuraciones-reales-de-contenedor-ofuscadas) y [E-21](#2021--e-21--correspondencia-entre-una-configuración-real-y-el-modelo-de-la-solución), y ya viene calificado en origen o es inequívoco por contexto. No es un sentido del vocabulario de esta solución sino del de Docker, y se deja como está.

## Supuestos registrados por este intake y su estado

Ninguno de estos valores estaba declarado en las tres fuentes. La versión 1.0 propuso un valor operable para no bloquear la cadena y lo marcó para confirmación explícita. El orquestador los presentó en su batería de validación de intake el 2026-07-27 y el agente humano del proyecto resolvió los seis. Esta tabla registra el resultado; es la fuente de verdad del estado de cada supuesto.

| # | Sección | Supuesto adoptado | Estado | Resolución |
|---|---|---|---|---|
| S-01 | §8 | Las cuatro métricas de éxito de negocio y sus umbrales | **Confirmado** el 2026-07-27 | Los valores propuestos por la versión 1.0 se adoptan sin cambios y dejan de ser supuestos: son el objetivo de negocio de la solución |
| S-02 | §17 P.6 | Cobertura mínima de líneas y de ramas por proyecto de código | **Confirmado** el 2026-07-27 | Los cuatro pares de umbrales (60/50, 80/70, 55/45 y 90/85) se adoptan sin cambios y son gate bloqueante del pipeline |
| S-03 | §17 P.10 | Los umbrales numéricos de los NFR que no vienen de una puerta técnica | **Confirmado** el 2026-07-27 | Los umbrales propuestos se adoptan sin cambios. Los umbrales de PT-01 nunca fueron supuestos: son **[E]** del documento técnico |
| S-04 | §17 P.7 | Adopción de SemVer 2.0.0 y Conventional Commits, y etiquetado por etapa cerrada | **Confirmado** el 2026-07-27 | El esquema de versión propuesto se adopta sin cambios, sobre el etiquetado por etapa que las fuentes sí declaran |
| S-05 | Cabecera | La URL del repositorio remoto GitHub | **Resuelto con evidencia** el 2026-07-27 | Deja de ser supuesto. El remoto existe y está configurado: `https://github.com/UTN-FRP-TUP-Aplicada-2025/SelfHosted.Service.Core.git`, verificable con `git remote get-url origin` en la raíz del repositorio destino |
| S-06 | §2 | El nombre propio del propietario del problema y del lead técnico | **Cerrado por identificación de rol** el 2026-07-27 | No se aportan nombres propios y no se requieren. Los actores se identifican por su rol, que es unívoco en esta solución porque el propietario, el lead técnico y el usuario final son la misma persona. Ningún artefacto downstream debe pedir un nombre propio |

Consecuencia para los subagentes: los seis supuestos numerados S-01 a S-06 dejaron de ser pendientes. Donde el marcador **[S]** aparece acompañado de la nota «confirmado el 2026-07-27» —en §8 y en los cuatro bloques de §17— señala el origen del dato (propuesto por este intake, no declarado por las fuentes) y no una pendiente: un artefacto downstream puede tratar esos valores como cerrados citando esta tabla.

**Esa generalización alcanza únicamente a S-01 a S-06.** Este intake contenía otros dos marcadores `[S]` sin número de supuesto que no fueron alcanzados por la batería de validación del 2026-07-27. **Los dos quedaron cerrados el 2026-07-28** por decisiones del agente humano del proyecto, aplicadas en la versión 2.1. Desde esta versión no queda ningún marcador `[S]` abierto en el documento:

| Marcador `[S]` sin número | Dónde | Estado |
|---|---|---|
| Matriz de navegadores de escritorio soportados, con familias y versiones mínimas | §17.1 P.9, fila de navegador | **Cerrado el 2026-07-28** por decisión del agente humano del proyecto, aplicada en la versión 2.1: Google Chrome de escritorio, canal estable, versión mínima 150.0.7871.186, en red local; toda otra familia no soportada. Se incorporó además el eje de plataforma del cliente, Windows Server 2022 21H2, que no estaba declarado. Ya no es brecha de `Compatibilidad-Plataformas`. El análisis que la originó, y los tres componentes del riesgo que la decisión no elimina, siguen en [§24.2](#242-la-matriz-de-navegadores-única-pendiente-que-espera-decisión) |
| Confirmación del supuesto IC-05 sobre la verificación de que un contenedor no esté ya adoptado por otro proyecto, formalizado en la invariante I10 | §17.4 P.11, apertura para el Sprint 0 | **Cerrado el 2026-07-28 por la decisión D-3.** El resultado ya era correcto —I10 más RN-11— y lo que faltaba era el fundamento, que ahora está declarado en §17.4 P.11. Deja de ser marcador `[S]` y pasa a `[D]` |

Los dos casos límite CL-04 y CL-15 de §7 **quedaron resueltos el 2026-07-28** por las decisiones D-1 y D-2, y con ellos desaparece la única deuda de reglas de negocio que condicionaba la categoría 02. Su resolución está transcripta en la fila correspondiente de §7 y desarrollada en los anexos que cada decisión alcanza.

No hay supuestos abiertos sobre el proceso de entrega: `Requerimientos-Funcionales.md` §2.3, §2.4 y §2.5 declaran de forma cerrada la plantilla de etapa, las reglas transversales y el informe de cierre con sus trece secciones obligatorias. Ese material se integra en §15 y condiciona §17.1 P.5 y P.8.

---

# Parte A — Negocio de la solución

## §1 Idea y problema

El propietario administra un servidor propio de desarrollo, pequeño y sin redundancia, sobre el que ya corre un parque de ocho contenedores y dieciocho imágenes, transcripto en el anexo [E-19](#2019--e-19--parque-de-contenedores-de-referencia) **[E]**. Ese parque creció de forma orgánica: cada servicio se levantó con su propio archivo Compose, sus variables de entorno no versionadas, sus montajes de directorio y su modo de red particular —seis de esas configuraciones están transcriptas, ofuscadas, en el anexo [E-20](#2020--e-20--configuraciones-reales-de-contenedor-ofuscadas)—, y hoy no hay ningún lugar donde se vea la arquitectura completa de un conjunto de servicios ni la relación entre ellos. Saber qué consume qué, con qué dirección y con qué puerto, exige abrir archivos dispersos y contrastarlos con lo que el motor de contenedores efectivamente está ejecutando.

Al que le duele es a quien opera ese servidor, que es una sola persona con permisos de administración total. Cada alta de un servicio nuevo es un ejercicio manual de copiar y adaptar, cada dirección IP fija de la LAN se anota fuera del sistema, y cada arranque de un conjunto de servicios depende de recordar el orden correcto. El costo no es catastrófico de a una operación, pero es permanente y crece con el parque.

La consecuencia de no resolverlo en los próximos meses es que el parque sigue creciendo sin registro común: la configuración real vive únicamente en el motor de contenedores y en archivos que no están versionados, el respaldo depende de la memoria del operador y el servidor no tiene redundancia de disco **[E]**. Cualquier reinstalación obliga a reconstruir la arquitectura desde cero, y la reconstrucción no está documentada en ningún lado.

El disparador es el propio parque existente: la herramienta tiene que ser adoptable sobre un servidor que ya está en producción, no exigir empezar de cero. Por eso el módulo de descubrimiento y adopción de contenedores existentes, que los incorpora a un proyecto SelfHosted **sin reinstanciarlos**, es el diferencial declarado desde la definición del servicio **[E]**.

## §2 Audiencia y stakeholders

| Rol | Nombre o cargo | Categoría | Responsabilidad principal |
|---|---|---|---|
| Dueño del problema y administrador único | Propietario del servidor autoalojado de referencia (identificado por rol; ver S-06) | Propietario | Aprueba el intake, opera la solución y valida cada punto de control de etapa |
| Agente humano del proyecto | El mismo propietario en su rol de validación técnica | Propietario | Ejecuta los guiones de demostración, da el OK de cada etapa, fusiona la rama y avisa el cierre |
| Equipo de desarrollo | Dos desarrolladores **[E]**, trabajando en etapas en serie | Implementador | Construyen y mantienen la solución, una rama y un pull request por etapa |
| Agente IA de codificación | Orquestador SDD y sus subagentes | Implementador | Genera la documentación SDD y, en etapas posteriores, el código de cada etapa |
| Usuario final: administrador de la solución | Único usuario con credenciales de la aplicación **[E]** | Beneficiario | Crea proyectos, configura servicios en el lienzo, despliega, arranca y detiene |
| Automatismo de integración continua | Workflow de GitHub Actions sobre el runner del propio servidor **[E]** | Beneficiario | Dispara despliegues con un token de API de ámbito mínimo, sin intervención humana |

No hay financiador externo ni área a la que rendir resultados: el propietario del problema, el que decide y el que paga son la misma persona **[D]**. Tampoco hay actores de auditoría o legales, porque el servicio no sale de la red local.

## §3 Propuesta de valor y diferenciación

Hoy el cliente opera su parque con archivos Compose sueltos y variables de entorno no versionadas, servicio por servicio **[E]**. Eso alcanza para levantar un contenedor, pero no para ver una arquitectura, ni para detectar que dos servicios pelean por la misma dirección IP, ni para saber qué hay que redesplegar cuando cambia el puerto de una base de datos.

La promesa central es que la arquitectura de un conjunto de servicios sea un objeto de primera clase, editable en un lienzo, con despliegue derivado de lo que se dibuja: se agrega el servicio, se traza la dependencia, el sistema propone la variable de entorno correcta según el modo de red y aplica los cambios en lote con un único redespliegue de lo afectado.

Diferenciadores **[D]**:

1. **Adopción sin reinstanciar.** Los contenedores que ya corren se incorporan a un proyecto SelfHosted importando su configuración observada y quedando vinculados por identificador, sin recrearlos ni cortar el servicio. Es lo que hace la herramienta aplicable sobre un servidor en producción.
2. **Separación entre configuración y ejecución.** El nodo del lienzo es el servicio, que es permanente y posicionable; el color y la insignia reflejan el despliegue activo, que es volátil. Detener no borra nada.
3. **Edición transaccional.** Los cambios de configuración se acumulan en un changeset con su informe de impacto, y se aplican en lote: se revisa antes de aplicar, se descarta lo que no va y se redespliega una sola vez.
4. **Conflicto de IP como regla de negocio, no como accidente.** El sistema conoce el rango gestionado, sabe qué direcciones están ocupadas por servicios activos de otros proyectos y bloquea el arranque con resoluciones concretas en lugar de fallar en el motor.
5. **Diseñado para un servidor chico.** El dimensionamiento objetivo son decenas de nodos y menos de cincuenta contenedores; nada se optimiza para escalas que este caso no tiene, y nada puede degradarse con treinta nodos **[E]**.

## §4 Alcance funcional pretendido (MoSCoW)

Las capacidades se derivan de los cuatro alcances incrementales declarados **[E]** y de los cortes verticales de `Requerimientos-Funcionales.md` §4.1. La etiqueta MoSCoW traduce a prioridad la pertenencia a cada alcance: el Alcance 1 es el mínimo sin el cual la solución no resuelve el problema.

| ID | Capacidad | MoSCoW |
|---|---|---|
| F-01 | Alta del administrador único en el primer arranque, con validación de contraseña, sesión recordada, cambio de contraseña y cierre de sesión desde la barra superior | Must Have |
| F-02 | Alta, listado, renombrado y eliminación de proyectos SelfHosted, con su modo de red y su persistencia | Must Have |
| F-03 | Alta y configuración de servicios de un proyecto: origen de imagen, variables, puertos, montajes, dispositivos, capacidades, recursos, política de reinicio y marca de efímero | Must Have |
| F-04 | Lienzo visual: nodos de servicio, aristas de dependencia, desplazamiento, zoom, agrupación y layout persistente por proyecto | Must Have |
| F-05 | Despliegue de un servicio desde imagen de registro público, con estado real reflejado en el nodo y acceso a los registros del contenedor | Must Have |
| F-06 | Arranque y parada del proyecto completo y de cada servicio, con marca de autoarranque y respeto del orden topológico del grafo | Must Have |
| F-07 | Changeset de cambios pendientes con informe de impacto y aplicación en lote con redespliegue de lo afectado | Must Have |
| F-08 | Rango de IP gestionado, reserva por servicio y bloqueo del arranque ante conflicto con un servicio activo de otro proyecto, con resoluciones ofrecidas | Must Have |
| F-09 | Escalado horizontal y vertical manuales: réplicas y límites de CPU y memoria | Must Have |
| F-10 | Despliegue construyendo la imagen desde un Dockerfile local o desde un repositorio de GitHub, con seguimiento del progreso de construcción | Must Have |
| F-11 | Descubrimiento de contenedores existentes en el servidor y adopción a un proyecto sin reinstanciarlos, con las salvaguardas de aislamiento | Must Have |
| F-12 | Dashboard en tres capas: estado del servidor, vista general por proyecto y vista por contenedor | Should Have |
| F-13 | Exportación e importación de la arquitectura completa de un proyecto como Docker Compose, más el manifiesto propio que preserva el layout, con las reglas de traducción del anexo [E-21](#2021--e-21--correspondencia-entre-una-configuración-real-y-el-modelo-de-la-solución) | Should Have |
| F-14 | Catálogo editable, exportable e importable de plantillas reutilizables, con parámetros. Es la **cuarta vía de alta** de un servicio, junto a las tres variantes de origen, y un ítem puede contener uno o varios servicios con sus aristas | Should Have |
| F-15 | Tokens de API con ámbitos, vigencia y revocación inmediata, emitidos desde la interfaz | Should Have |
| F-16 | Disparo de despliegue desde un workflow de GitHub Actions con token de ámbito mínimo | Could Have |
| F-17 | Exportación programada de proyectos y catálogo a un destino externo como estrategia de respaldo | Could Have |
| F-18 | Segundo factor de autenticación | Won't Have v1 |
| F-19 | Administración de proxies o proxies inversos y dominios públicos gestionados | Won't Have v1 |
| F-20 | Balanceo de carga entre réplicas y despliegue sin interrupción con solapamiento de versiones | Won't Have v1 |
| F-21 | Gestión de múltiples usuarios, roles y permisos | Won't Have v1 |
| F-22 | Recuperación de contraseña | Won't Have v1 |
| F-23 | Variables compartidas del proyecto: definidas una vez a nivel proyecto, secretas o no, y referenciables desde cualquiera de sus servicios | Should Have |
| F-24 | Referencias entre variables con sintaxis `${{ … }}`: a otra variable del propio servicio, a una variable compartida del proyecto o a una variable de otro servicio del mismo proyecto, resueltas en el backend antes de crear el contenedor | Should Have |
| F-25 | Higiene del modelo: el sistema detecta y **advierte, sin bloquear**, variables compartidas huérfanas, nombres repetidos en el mismo ámbito, claves que ya existen al instanciar y referencias que quedaron sin uso | Could Have |

**Nota sobre F-14 [D], decisión del agente humano del proyecto del 2026-07-28 (D-7).** El catálogo es una **cuarta vía de alta de un servicio, no un cuarto origen**. El intake declara tres variantes de origen —imagen de registro, repositorio remoto y Dockerfile local, transcriptas en el anexo [E-2](#202--e-2--servicio-con-sus-tres-variantes-de-origen)—; el catálogo no es una cuarta variante de esa lista, sino otra forma de llegar a ellas: un ítem del catálogo es una **plantilla parametrizada que, al instanciarse, resuelve a uno de los tres orígenes reales**. La distinción está tomada de que el producto de referencia lista `Template` como una opción del menú de creación de servicio junto a `Docker Image` y `GitHub Repository`, y no dentro de ellas (`Analisis-Rayway.md` §3.2 **[E]** respecto de ese documento, que enumera ese menú a partir de la captura de la interfaz real).

Tres consecuencias que hay que dejar explícitas, porque es el punto que más se presta a confusión —«catálogo de servicios» se lee como servicios corriendo—:

1. **Nada del catálogo corre.** Sus ítems son definiciones en reposo, no servicios instanciados: no tienen despliegue, no tienen contenedor, no ocupan dirección y no aparecen en el lienzo de ningún proyecto hasta que se los instancia.
2. **El catálogo arranca vacío** en una instalación nueva. Se puebla cuando el usuario guarda un servicio como plantilla o importa un catálogo exportado; el producto no se distribuye con contenido precargado.
3. **Un ítem contiene un subgrafo, no un servicio.** Puede contener uno o varios servicios con sus aristas; al instanciarlo se crean N servicios, cada uno con su propio contenedor, más los enlaces entre ellos. Su forma completa, con parámetros y formato de exportación versionado, está en el anexo [E-6](#206--e-6--ítem-del-catálogo-de-servicios-reutilizables).

**Fundamento técnico del ítem multi-servicio [D], D-7.** El subgrafo **no requiere empaquetar varios servicios en un mismo contenedor**, y hacerlo violaría la invariante I2 de §17.4 P.2, que declara que un servicio es siempre exactamente un contenedor. El mecanismo es el que la solución ya debe implementar para F-13: importar un archivo Compose crea varios servicios con sus enlaces de una sola vez. La plantilla multi-servicio es exactamente ese mecanismo con parámetros, y la instanciación crea tantos servicios y tantos contenedores como nodos tenga el subgrafo (RN-30).

**[D] Nota sobre F-25, decisión del agente humano del proyecto del 2026-07-28 (D-13).** Es la capacidad que la identidad de objeto (D-12) vuelve barata: con cada elemento identificado, detectar que dos se llaman igual o que nadie referencia a un tercero es una consulta, no un análisis. Las cinco detecciones y lo que informa cada una:

| Detección | Qué informa |
|---|---|
| Variable compartida sin ninguna referencia | Está huérfana: se creó y nadie la usa |
| Dos elementos con el mismo nombre visible en el mismo ámbito | No es error, pero conviene poder renombrar uno |
| Al instanciar, una clave que ya existe **con el mismo valor** | Probablemente convenga compartir: ahí sí se ofrece reusar |
| Al instanciar, una clave que ya existe **con distinto valor** | Casi seguro son cosas distintas: se crean separadas y se avisa |
| Referencia que quedó sin uso tras un cambio | Deuda que se acumula sin que nadie la vea |

**Ninguna bloquea.** Es la inversión que declara D-13: en lugar de preguntar antes de instanciar y obligar al usuario a decidir a ciegas —sin saber todavía si las dos cosas que se llaman igual son la misma—, el sistema **crea separado, que es lo seguro, y después informa** si detecta que probablemente convenga compartir. La decisión se toma con la información delante y es reversible, que es lo contrario de un diálogo modal que bloquea.

**Prioridad Could Have, con argumento.** No es Must porque no figura entre los diez cortes verticales del Alcance 1 declarados **[E]** en §15, igual que F-23 y F-24. Y va un escalón por debajo de esas dos, que son Should, por una razón concreta: **ningún flujo de usuario depende de ella**. F-23 y F-24 resuelven el dolor que §1 declara —escribir y mantener sincronizado el mismo valor en varios servicios— y sin ellas ese dolor sigue intacto. F-25 es estrictamente informativa: todo lo que detecta, el administrador puede verlo a mano en un parque de menos de cincuenta contenedores, y nada falla si no está. Es además la única capacidad del intake que **presupone** a otras: sin la identidad de objeto de D-12 aplicada, sus cinco consultas no existen. Su asignación a un alcance concreto queda en la misma pendiente de §19 que la de F-23 y F-24.

**[D] Nota sobre F-23 y F-24, decisión del agente humano del proyecto del 2026-07-28 (D-5 y D-6).** Ambas capacidades resuelven el mismo dolor: hoy varios servicios que comparten un valor —típicamente una credencial de base de datos— obligan a escribirlo y a mantenerlo sincronizado en cada servicio, que es exactamente lo que el producto viene a eliminar. Se declaran **Should Have** y no **Must Have** porque la etiqueta MoSCoW de este intake traduce la pertenencia a un alcance, y los diez cortes verticales del Alcance 1 están declarados de forma cerrada en §15 **[E]**: ninguna de las dos figura entre ellos y agregarlas contradiría esa declaración. La asignación a un alcance y a un corte vertical concreto queda registrada como pendiente en §19.

**[D] Nota sobre F-15 y F-16.** El análisis observa que el Alcance 4 es el menos costoso y el que valida antes la decisión de autenticación, y recomienda adelantar la emisión de tokens de API al Alcance 1 aunque el endpoint de despliegue automatizado llegue después. De ahí que F-15 sea Should Have y F-16 Could Have, y no ambas Could.

## §5 Historias de usuario / experiencias deseadas

1. Como administrador que instala la solución por primera vez, quiero que el sistema me pida un nombre de usuario y una contraseña validada, para que nadie más pueda operar el panel que controla mi servidor.
2. Como administrador, quiero crear un proyecto SelfHosted y agregarle servicios desde el panel lateral, para tener la arquitectura de un conjunto de contenedores en un solo lugar.
3. Como administrador, quiero arrastrar los nodos del lienzo y que la disposición se conserve al recargar, para leer la arquitectura como la pensé y no como la ordenó el sistema.
4. Como administrador, quiero trazar una arista de mi API a mi base de datos y que el sistema me proponga la variable de entorno correcta, para no escribir a mano una cadena de conexión que depende del modo de red.
5. Como administrador, quiero modificar la configuración de un servicio ya desplegado y ver el cambio acumulado en el cajón de cambios pendientes, para revisar el impacto antes de provocar una ventana de indisponibilidad.
6. Como administrador, quiero que el arranque de un proyecto se bloquee cuando una de sus direcciones IP está ocupada por un servicio activo de otro proyecto, para enterarme antes de romper algo que está funcionando.
7. Como administrador, quiero ver los contenedores que ya corren en mi servidor y asignarlos a un proyecto sin reinstanciarlos, para incorporar lo que ya tengo en lugar de empezar de cero.
8. Como administrador, quiero ver el estado del servidor, de cada proyecto y de cada contenedor en un tablero, para saber si la presión de memoria del servidor viene de un servicio concreto.
9. Como administrador, quiero exportar un proyecto a Docker Compose con los secretos vacíos, para llevármelo a otro servidor sin filtrar credenciales.
10. Como automatismo de integración continua, quiero disparar el despliegue de una versión nueva con un token de ámbito mínimo, para publicar sin que ningún workflow conozca la contraseña del administrador.

## §6 Flujos típicos

**Flujo 1 — Alta de un proyecto SelfHosted con API y base de datos.** Es el recorrido más frecuente y está transcripto con su topología resultante en el anexo [E-10](#2010--e-10--alta-de-proyecto-con-api-y-base-de-datos-de-extremo-a-extremo). El administrador crea el proyecto, elige modo de red bridge y aterriza en un lienzo vacío; agrega la base desde el catálogo y la API desde una imagen de registro, y ambos nodos aparecen en violeta porque están pendientes de aplicar; arrastra una arista de la API a la base y el sistema propone la variable de conexión con el nombre de contenedor como host; publica el puerto de la API en el host; aplica los cambios con un mensaje, y el sistema crea la red, despliega la base, espera su verificación de salud y recién entonces despliega la API, respetando el orden topológico del grafo.

**Flujo 2 — Adopción de un contenedor que ya está corriendo.** Es el flujo diferencial y está transcripto en el anexo [E-11](#2011--e-11--adopción-de-un-contenedor-existente). El administrador entra a un proyecto y pide adoptar; el módulo de descubrimiento consulta el motor de contenedores, inspecciona lo que encuentra, descarta los ya adoptados y los no adoptables, y devuelve los candidatos; el administrador elige uno; el sistema importa imagen, red, dirección, montajes, dispositivos y variables, y **presenta el paso obligatorio de clasificación de variables**, donde el administrador ve todas las importadas, con las que la heurística sugiere ya premarcadas como secretas, y marca o desmarca las que corresponda (D-2, RN-29); recién con esa clasificación confirmada crea el servicio vinculado al contenedor existente, sin recrearlo ni cortar el servicio. El nodo aparece en el lienzo ya activo. El listado de candidatos que ve el administrador está en el anexo [E-7](#207--e-7--descubrimiento-de-contenedores-adoptables).

**Flujo 3 — Arranque bloqueado por conflicto de dirección IP.** Transcripto en el anexo [E-8](#208--e-8--reserva-de-direcciones-ip-e-informe-de-conflicto). El administrador arranca un proyecto de pruebas; el validador de red compara las reservas del proyecto contra las direcciones ocupadas por servicios activos, encuentra una en conflicto y devuelve un rechazo con tres resoluciones posibles: detener el proyecto en conflicto, reasignar la dirección a la siguiente libre del rango, o arrancar parcialmente el resto de los servicios; el administrador reasigna, el sistema actualiza la reserva y marca los enlaces entrantes al servicio como pendientes de redespliegue porque su variable cambió de valor, y arranca.

**Flujo 4 — Primer arranque y sesión.** El administrador ejecuta la aplicación por primera vez sobre una base de datos inexistente; el sistema aplica sus migraciones solo, detecta que no hay administrador y presenta el alta; el administrador elige usuario y contraseña, el sistema la valida y la almacena con una función de derivación de clave, e inicia la sesión con cookie; en los arranques posteriores la aplicación ya no ofrece el alta y presenta el inicio de sesión; el cambio de contraseña y el cierre de sesión se hacen desde el menú de usuario de la barra superior, y el cambio exige la contraseña actual **[E]**.

## §7 Casos límite y "qué pasa si"

| # | Pregunta | Estado en las fuentes | Respuesta del cliente |
|---|---|---|---|
| CL-01 | ¿Qué pasa si dos proyectos SelfHosted configuran la misma dirección IP y ambos quieren arrancar? | Resuelto: configurar la misma dirección está permitido; arrancar en conflicto con un servicio **activo** de otro proyecto no. El arranque se bloquea con informe y resoluciones, o procede parcialmente dejando el proyecto "parcialmente activo" **[E]** | **Confirmado sin cambios el 2026-07-28 (D-4) [D].** Ante conflicto de dirección o fallo de un contenedor, el sistema ofrece las tres resoluciones que el intake ya declara en el anexo [E-8](#208--e-8--reserva-de-direcciones-ip-e-informe-de-conflicto) —detener el proyecto en conflicto, reasignar la dirección a la siguiente libre del rango, o arrancar parcialmente el resto dejando el proyecto "parcialmente activo"—. No cambia nada del modelo ni de RN-20; se registra la confirmación para que la pregunta no vuelva a abrirse |
| CL-02 | ¿Qué pasa si alguien opera contenedores por fuera de la aplicación y el estado registrado deja de coincidir con el motor? | Resuelto: el sincronizador de estado se suscribe a los eventos del motor y reconcilia cada 30 segundos; el nodo puede quedar en estado "huérfano" explícito **[D]** | |
| CL-03 | ¿Qué pasa si el contenedor vinculado a un servicio adoptado desaparece del motor? | Resuelto: el servicio queda huérfano y se ofrece redesplegarlo desde la configuración importada **[D]**, con la advertencia de que ese primer redespliegue sí implica corte | |
| CL-04 | ¿Qué pasa si se pierde la conexión del navegador en medio de una operación? | Era abierto: el modelo de hospedaje es Blazor Interactive Server, donde la interfaz vive en un circuito SignalR **[E]**, y las fuentes no declaraban el comportamiento esperado ante caída del circuito con un despliegue en curso. **Resuelto el 2026-07-28 (D-1)** | **Resuelto [D].** La caída de la conexión del navegador durante un despliegue deja de ser un caso especial. El despliegue vive del lado del servidor y su resultado se determina **por contenedor, no por operación**: los contenedores que se desplegaron bien se marcan como tales, los que fallaron se marcan con su error, y al reabrir el proyecto el sistema verifica el estado real de cada contenedor contra el motor. La consecuencia de fondo es que **un despliegue parcial es un estado legítimo del modelo**, no un accidente a evitar: encaja con el sincronizador de estado que CL-02 ya declara y con el estado "parcialmente activo" de CL-01 y RN-20. Se formaliza en RN-31 y se detalla en los anexos [E-3](#203--e-3--despliegue-con-su-línea-de-tiempo-de-eventos-y-sus-métricas), [E-13](#2013--e-13--contrato-del-endpoint-de-despliegue) y [E-17](#2017--e-17--ciclo-de-vida-del-despliegue-y-correspondencia-con-el-motor) |
| CL-05 | ¿Qué pasa si un dato obligatorio llega vacío o mal formado desde la API? | Resuelto: cada regla de negocio declara su momento de validación y su respuesta, con `422` para datos inválidos y `409` para conflictos, en formato `ProblemDetails` **[D]** | |
| CL-06 | ¿Qué pasa si el administrador pide más réplicas de un servicio que tiene una dirección IP fija de macvlan? | Resuelto: son incompatibles; el modelo admite una dirección por réplica y la interfaz debe pedirlas explícitamente en lugar de fallar en el arranque **[D]** | |
| CL-07 | ¿Qué pasa si se adopta un contenedor que monta el socket del motor de contenedores? | Resuelto: se marca no adoptable por defecto, porque gobernarlo desde el administrador crearía una dependencia circular de control; puede forzarse con confirmación explícita **[D]** | |
| CL-08 | ¿Qué pasa si un contenedor adoptado traía credenciales en sus variables de entorno? | Resuelto: las variables cuyo nombre coincide con la heurística de sensibilidad se importan enmascaradas y requieren recarga manual **[D]** | **Ampliado el 2026-07-28 por D-2 [D].** La respuesta sigue siendo la misma para las variables que la heurística detecta, pero deja de ser el único filtro: la coincidencia con la heurística ahora premarca, y el paso obligatorio de clasificación de CL-15 alcanza a **todas** las variables importadas, coincidan o no |
| CL-09 | ¿Qué pasa si la interfaz, la API y los servicios en segundo plano escriben a la vez en SQLite? | Parcialmente resuelto: modo WAL, escritor único y un alcance de contexto por operación **[E]**; la fuente registra que la mitigación no fue probada en este contexto y requiere validación en la etapa de codificación | |
| CL-10 | ¿Qué pasa si se pierde el disco del servidor, que no tiene redundancia? | Parcialmente resuelto: la estrategia de respaldo es la exportación programada de proyectos y catálogo a un destino externo **[E]**; el destino concreto no está declarado | |
| CL-11 | ¿Qué pasa si una etapa cierra con un criterio de aceptación sin cumplir? | Resuelto: el informe de cierre lo declara en su sección de criterios y en la de problemas conocidos. Un informe que declara terminada una etapa incompleta invalida el punto de control **[E]** | |
| CL-15 | ¿Qué pasa si un contenedor adoptado trae un secreto en una variable cuyo nombre no coincide con la heurística de sensibilidad? | Era abierto: una de las configuraciones reales del anexo [E-20](#2020--e-20--configuraciones-reales-de-contenedor-ofuscadas) (caso C-2) lleva una clave simétrica en una variable que no contiene `PASSWORD`, `TOKEN`, `SECRET`, `KEY` ni `PAT`, y la heurística declarada la importaría en claro. **Resuelto el 2026-07-28 (D-2)**, con la tercera de las tres resoluciones planteadas en C-2 | **Resuelto [D]: el secreto se declara, no se infiere.** El modelo ya declaraba el carácter de secreto —la tabla `variables` del anexo [E-9](#209--e-9--esquema-relacional-de-la-base-sqlite) tiene `secreta`, `referencia_secreto` y `origen`; E-2 lo usa; RN-15 prohíbe devolver un secreto en claro—. El defecto estaba en un único punto: la regla RA-05 del anexo [E-7](#207--e-7--descubrimiento-de-contenedores-adoptables) hacía que la heurística por nombre **decidiera** el valor de `secreta` durante la adopción, sin revisión. El cambio es que **la heurística deja de decidir y pasa a sugerir**: la adopción de un contenedor **no se completa** sin un paso de clasificación de variables en el que el usuario ve todas las variables importadas, las detectadas por la heurística vienen premarcadas como secretas y el usuario puede marcar o desmarcar cualquiera. Es un paso obligatorio del flujo, no una pantalla opcional. Se formaliza en RN-29, en RA-05 y RA-06, y se detalla en [E-11](#2011--e-11--adopción-de-un-contenedor-existente) |
| CL-14 | ¿Qué pasa con las credenciales de prueba que un informe de cierre necesita transcribir? | Resuelto: las credenciales de ejemplo del entorno de desarrollo se escriben completas en el informe; nunca se transcribe un secreto de producción ni una contraseña real elegida por el agente humano, y en su lugar se indica dónde consultarla **[E]** | |
| CL-12 | ¿Qué pasa si el administrador quiere borrar un servicio con datos persistidos? | Resuelto: se pide confirmación escribiendo el nombre del servicio y se ofrece conservar los volúmenes **[D]** | |
| CL-13 | ¿Qué pasa si el servicio se expone fuera de la red local? | Resuelto por prohibición: el acceso al socket del motor equivale a control total del host, de modo que el servicio no debe publicarse a internet sin una capa adicional de protección, y el proxy inverso está fuera de alcance **[E]** | |

## §8 Métricas de éxito desde el negocio

**[S] S-01, confirmado el 2026-07-27.** Las fuentes describen capacidades y riesgos, no metas de negocio medidas. Estas métricas se propusieron a partir de los datos de dimensionamiento verificados del servidor de referencia (parque de ocho contenedores y dieciocho imágenes, sin redundancia de disco) y de los diferenciales declarados. El agente humano del proyecto las confirmó sin cambios en la batería de validación de intake: son el objetivo de negocio de la solución y se tratan como cerradas.

| Criterio | Métrica | Target | Plazo |
|---|---|---|---|
| Adopción del parque existente | Porcentaje de los contenedores en ejecución del servidor de referencia, enumerados en el anexo [E-19](#2019--e-19--parque-de-contenedores-de-referencia), incorporados a un proyecto SelfHosted sin haber sido reinstanciados | ≥ 75 % de los 8 contenedores del parque relevado | 3 meses desde el cierre del Alcance 1 |
| Reemplazo del método manual | Porcentaje de altas de servicio nuevas realizadas desde la solución en lugar de por archivo Compose editado a mano | ≥ 90 % de las altas nuevas | 6 meses desde el cierre del Alcance 1 |
| Reproducibilidad de la arquitectura | Cantidad de proyectos con exportación vigente (Compose más manifiesto propio) sobre el total de proyectos declarados | 100 % de los proyectos, con exportación de antigüedad menor a 7 días | 3 meses desde el cierre del Alcance 3 |
| Continuidad de la entrega | Porcentaje de etapas cerradas con su guion de demostración ejecutado y con los guiones de todas las etapas anteriores pasando sin corrección | 100 % de las etapas | Durante toda la construcción |

## §9 Lo que NO es esta solución (exclusiones)

1. **No es un PaaS multiinquilino ni un orquestador de clúster [E].** Hay un único administrador y un único servidor. Incorporar inquilinos exigiría un modelo de identidad, de aislamiento y de cuotas que multiplica el alcance sin resolver el problema del propietario. No se contempla incorporación futura.
2. **No administra proxies ni proxies inversos [E].** Está declarado fuera de alcance desde la definición del servicio. Consecuencia aceptada: no hay dominios públicos gestionados, y el reemplazo de una versión de un servicio es *detener y arrancar*, con ventana de indisponibilidad que la interfaz debe advertir explícitamente al confirmar el redespliegue.
3. **No hace balanceo de carga [E].** Consecuencia aceptada y señalada como inconsistencia IC-04 por el análisis: las réplicas creadas por el escalado horizontal no tienen quién distribuya el tráfico entre ellas. En este alcance el escalado horizontal sirve para procesos sin tráfico entrante.
4. **No expone el servicio a internet [E].** El acceso al socket del motor de contenedores equivale a control total del host; el servicio se expone sólo en la red local. Podría incorporarse el día que exista una capa de protección adicional, que hoy está fuera de alcance.
5. **No gestiona usuarios, roles ni permisos [E].** Un solo administrador. La elección de ASP.NET Core Identity no bloquea incorporar un segundo factor más adelante, pero el primer alcance no lo incluye.
6. **No monitorea por peticiones HTTP contra los servicios [E].** Cuando los contenedores corren en macvlan, el host no los alcanza por la misma placa de red. La fuente de verdad del estado es el socket del motor de contenedores: estado del contenedor, verificación de salud declarada en la imagen y estadísticas de uso.
7. **No recupera contraseñas [E].** Declarado fuera de alcance de la etapa de administrador y sesión. Con un único usuario y acceso físico al archivo de base de datos, el mecanismo de recuperación aportaría superficie de ataque sin resolver un problema real.

## §10 Restricciones del cliente

| Restricción | Valor declarado | Origen |
|---|---|---|
| Equipo | 2 desarrolladores | `Requerimientos-Tecnicos.md` §1 **[E]** |
| Plazo | **Sin fecha objetivo.** No se contempla plazo: el avance se mide por etapas cerradas, y cada etapa termina en un punto de control con OK explícito del agente humano | `Requerimientos-Tecnicos.md` §1 **[E]** |
| Presupuesto | No hay presupuesto monetario asignado ni previsto: la restricción económica efectiva es que toda dependencia debe ser de licencia abierta y permisiva, sin costo de licencia ni de suscripción. Es lo que descarta Syncfusion y MindFusion pese a su completitud funcional | `Analisis-Final-Integrado.md` §7.1 y §7.4 **[E]** |
| Modo de trabajo | Etapas **en serie**. No se abre la rama de una etapa antes de que se haya fusionado la anterior; el punto de control es un cuello por diseño | `Requerimientos-Tecnicos.md` §1 y §10 **[E]** |
| Disponibilidad y tiempos de respuesta | **No hay horario core ni franja de disponibilidad comprometida, y no hay plazo máximo de respuesta.** El punto de control bloquea indefinidamente hasta el OK explícito del agente humano: el bloqueo no vence. La coordinación es asíncrona y su registro es el pull request de la etapa. No debe derivarse ningún acuerdo de nivel de servicio de reloj a partir de esta restricción | Decisión del agente humano del proyecto, tomada el 2026-07-27 al responder la batería de validación de intake del orquestador. Las tres fuentes no declaran horario ni plazo: declaran el bloqueo hasta el OK explícito (`Requerimientos-Tecnicos.md` §1 y §10 **[E]**), y la decisión consiste en declarar la ausencia en lugar de fijar un valor **[D]** |
| Entorno de desarrollo obligatorio | **El host Linux de desarrollo no tiene el SDK de .NET y no se va a instalar.** Todo el ciclo ocurre dentro de un Dev Container; el único requisito del host es Docker. Ningún comando ni paso de un guion puede asumir `dotnet` disponible en el host | `Requerimientos-Tecnicos.md` §3.1 **[E]** |
| Integración obligatoria | El motor de contenedores del host, accedido por socket montado (`docker-outside-of-docker` en desarrollo, socket montado en producción). No es una integración opcional: es el sustrato del producto | `Requerimientos-Tecnicos.md` §3.4 y §8 **[E]** |
| Plataforma de destino | Contenedor Docker sobre Linux, sobre un servidor de 4 núcleos y 8 hilos de generación antigua, 32 GB de RAM con la mitad en uso y presión de swap apreciable, y un único SSD sin RAID ni LVM. El administrador debe ser liviano: presupuesto de cientos de MB, no de GB, y sin sondeo agresivo de métricas | `Analisis-Final-Integrado.md` §3.1 **[E]** |
| Restricciones legales o regulatorias | Ninguna declarada. El servicio no procesa datos personales de terceros, no sale de la red local y tiene un único usuario. No aplican GDPR, PCI, HIPAA, SOC2 ni ISO 27001 | Derivado del alcance declarado **[D]** |
| Flujo de trabajo obligatorio | Una rama y un pull request por etapa; el pull request *es* el punto de control. El `changelog.md` se actualiza en la rama de la etapa. Cada etapa cerrada y fusionada recibe una etiqueta. Ningún secreto entra al repositorio | `Requerimientos-Tecnicos.md` §10 **[E]** |
| Documentación obligatoria por etapa | Cada etapa cierra con un informe autocontenido de trece secciones publicado en `SelfHosted.Service.Core.Documentos/Avances/`, escrito **antes** de convocar el punto de control y anotado en el índice `Avances/README.md`. Es entregable, al mismo nivel que el código: sin informe no hay etapa terminada. Ver §15.1 | `Requerimientos-Funcionales.md` §2.4 y §2.5 **[E]** |

## §11 Riesgos detectados desde el negocio

Los diez riesgos de la matriz del análisis integrado **[E]**, en el orden y con la evaluación declarada allí. Se listan completos porque cada uno condiciona una decisión de alcance o de secuencia.

| # | Riesgo | Probabilidad | Impacto | Mitigación declarada |
|---|---|---|---|---|
| RG-01 | Latencia del lienzo bajo Interactive Server con el arrastre manejado en C#: es la pantalla principal del producto | Media | Alto | Puerta técnica PT-01 medida antes de comprometer el corte del lienzo, más las mitigaciones M1 a M4 (arrastre en JavaScript notificando sólo al soltar, movimiento por `transform` de CSS, virtualización de nodos, WebSockets garantizados) |
| RG-02 | ROPC como puerta de entrada a un servicio que controla el host | Media | Alto | Adoptar cookie de Identity para la interfaz más tokens de API con ámbitos para automatismos; ROPC queda descartado |
| RG-03 | El acceso al socket del motor de contenedores equivale a control total del host | Alta, inherente al diseño | Muy alto | No exponer el servicio fuera de la red local, tokens de ámbito mínimo y auditoría de toda operación de escritura |
| RG-04 | Monitoreo inviable por red con contenedores en macvlan | Alta | Medio | Observar por el motor de contenedores, nunca por peticiones HTTP contra el servicio |
| RG-05 | Cliente de Docker desactualizado frente al motor instalado | Media | Medio | Usar el fork mantenido y aislarlo detrás de la abstracción `IContenedorEngine` |
| RG-06 | Concurrencia de escritura en SQLite entre la interfaz, la API y los servicios en segundo plano | Media | Medio | Modo WAL, tiempo de espera de bloqueo fijado y operaciones de despliegue serializadas por proyecto |
| RG-07 | Sin redundancia de disco en el servidor de referencia | Alta | Alto para el usuario, no para el software | Exportación periódica de proyectos y catálogo a un destino externo, facilitada por el propio servicio |
| RG-08 | Deriva entre el estado registrado y el motor cuando alguien opera contenedores por fuera | Alta | Medio | Reconciliación periódica y estado "huérfano" explícito en el nodo |
| RG-09 | Secretos importados en la adopción que terminen visibles | Media | Alto | Enmascarado por heurística en la importación y regla de no devolver secretos en texto plano por la API ni en exportaciones |
| RG-10 | Alcance creciente del lienzo (autolayout, rutas ortogonales, deshacer y rehacer) | Media | Medio | Fijar el alcance visual del primer incremento; el deshacer y rehacer se apoyan en el changeset, no en la librería |

**Nota sobre la mitigación de RG-09 [D], D-2 del 2026-07-28.** La fila de RG-09 se transcribe tal como la declara el análisis integrado y no se modifica, pero su mitigación quedó **reforzada**: el enmascarado por heurística dejó de ser el filtro que decide y pasó a ser una sugerencia dentro del paso obligatorio de clasificación de variables de la adopción (CL-15, RN-29). La regla de no devolver secretos en texto plano por la API ni en exportaciones (RN-15) no cambia. El riesgo residual baja, porque ya no depende de que una lista de fragmentos de nombre esté completa.

**Intento previo y por qué no alcanzó [E]:** no hubo un intento previo de construir esta herramienta. Sí hubo un análisis funcional previo del proyecto sobre una plataforma comercial equivalente, del que se toma el modelo de abstracción, la semántica de las aristas y el patrón de cambios en lote. El método actual —archivos Compose sueltos— no falló: se volvió insuficiente al crecer el parque.

**Supuesto crítico que, si se rompe, hace inviable el resultado [D]:** que un lienzo de treinta nodos sea fluido bajo Blazor Interactive Server en red local. Es exactamente lo que mide PT-01, y su falla no invalida el producto pero sí obliga a cambiar la librería del lienzo y replanificar ese corte.

## §12 Glosario del dominio del cliente

| Término | Definición |
|---|---|
| **Adopción** | Incorporación de un contenedor ya existente en el servidor a un proyecto SelfHosted, sin recrearlo. Sólo importa su configuración y lo vincula por identificador |
| **Alias DNS** | Nombre por el que un contenedor es resoluble dentro de una red definida por el usuario; suele coincidir con el nombre del servicio |
| **Arista o enlace** | Conexión dibujada en el lienzo. Representa que un servicio depende de otro del mismo proyecto. Casi siempre nace de una **referencia de variable** —trazar la flecha es azúcar que escribe la referencia al host provisto del destino—, y también puede existir **sin variable**, cuando su única razón de ser es esperar al destino. Tiene dos ejes independientes: **espera al destino**, que es una propiedad declarada y define el orden de arranque, y **referencia el host**, que se deduce de la clave referenciada y define la exigencia de canal alcanzable |
| **Autoarranque** | Marca que indica que un proyecto o servicio debe levantarse al iniciar el sistema administrador |
| **Bridge** | Red virtual del motor de contenedores con su propia subred privada; sus miembros se resuelven por nombre y publican puertos en el host |
| **Canvas o lienzo** | Vista por defecto de un proyecto: espacio visual infinito donde cada bloque es un servicio y cada arista una dependencia |
| **Catálogo** | Colección de plantillas reutilizables, editable, exportable e importable. Es la cuarta vía de alta de un servicio, junto a las tres variantes de origen. Nada del catálogo corre: sus ítems son definiciones en reposo. Arranca vacío en una instalación nueva |
| **Changeset** | Conjunto de cambios de configuración acumulados y pendientes de aplicar en lote sobre un proyecto |
| **Despliegue** | Intento concreto de materializar la configuración de un servicio: el contenedor creado, con su ciclo de vida |
| **Efímero** | Servicio pensado para reconstruirse en cada uso, sin estado persistente propio |
| **Escalado horizontal** | Agregar réplicas del mismo servicio. En esta solución, manual |
| **Escalado vertical** | Aumentar los recursos de CPU y memoria asignados a un servicio. En esta solución, manual |
| **Etapa** | Unidad de entrega del proyecto. Se especifica con una plantilla obligatoria, termina en un punto de control y se corresponde con una rama y un pull request |
| **Healthcheck o verificación de salud** | Comprobación periódica declarada en la imagen o en el servicio que determina si el contenedor está sano |
| **Higiene del modelo** | Conjunto de condiciones que el sistema detecta y **advierte sin bloquear**: variables compartidas huérfanas, nombres repetidos en el mismo ámbito, claves que ya existen al instanciar y referencias sin uso. Informa, nunca impide (D-13, F-25) |
| **Hito demostrable (HD)** | Etapa que entrega un flujo de usuario completo y operativo, y se ejecuta y recorre delante del cliente |
| **Hito interno (HI)** | Etapa que confirma decisiones estructurales caras de revertir; la valida el agente humano y no se muestra al cliente |
| **Huérfano** | Servicio cuyo contenedor vinculado ya no existe en el motor |
| **Informe de importación** | Resultado que devuelve la importación de un archivo Compose: qué servicios y enlaces se crearon, y **qué no se pudo representar**. Es lo que hace que toda pérdida de traducción sea declarada y no silenciosa. Desde la tercera pasada el `depends_on` ya no es una de ellas: se importa sin pérdida como arista con espera (anexo E-21) |
| **Informe de cierre** | Documento autocontenido de trece secciones que cierra cada etapa, publicado en `Avances/` antes de convocar el punto de control. Está escrito para quien no vio escribir el código y va a probarlo |
| **Macvlan** | Modo de red en el que el contenedor obtiene una dirección propia de la LAN y aparece como un equipo más de la red. El host no lo alcanza por la misma placa |
| **Modo pendiente** | Estado visual, en violeta, de un nodo o arista que existe en el changeset pero todavía no se aplicó |
| **Política de reinicio** | Regla que indica si el contenedor debe reiniciarse solo: `no`, `on-failure`, `always`, `unless-stopped` |
| **Objeto con identidad** | Elemento del modelo con identificador propio, cuyas relaciones con otros se establecen por ese identificador y **nunca por su nombre**, que es un atributo. Es objeto lo que se referencia, lo que sobrevive al objeto que lo contiene o lo que tiene ciclo de vida propio; lo demás es atributo (D-12) |
| **Proyecto de código** | La unidad de compilación del repositorio, declarada en §13: `SelfHosted.Service.Core`, único y principal. No es algo que el usuario cree ni vea. Desde la versión 2.2 es **uno solo**: las cuatro capas de la Clean Architecture, que hasta la 2.1 eran cuatro proyectos de código, son ahora espacios de nombres internos y se nombran «capa», no «proyecto de código». Variante larga admitida: «proyecto de código fuente»; la forma canónica es la corta |
| **Capa** | Cada una de las cuatro divisiones internas del proyecto de código, materializadas como carpeta y espacio de nombres: dominio (`SelfHosted.Service.Core.Domain`), aplicación (`.Application`), infraestructura (`.Infrastructure`) y presentación (`.Web`). Es el término que reemplaza a «proyecto de código» cuando se habla de una de las cuatro. Su regla de dependencia la hace cumplir el test de arquitectura de §17.P.6, no el compilador |
| **Proyecto SelfHosted** | Unidad de agrupación del producto: la arquitectura completa de servicios contenedorizados, con su red y su lienzo. Es lo que el usuario crea desde el portal web. **Forma corta:** donde el contexto ya fijó el sentido de forma inequívoca y el otro no aparece cerca, se escribe simplemente «proyecto»; la forma corta es deliberada y no un descuido. Se escribe completo en la primera mención de cada sección o anexo, en toda definición, y siempre que «proyecto de código» esté cerca. No confundir con **proyecto de código** |
| **Puerta técnica** | Verificación medida que condiciona una decisión de arquitectura. Una puerta que no pasa detiene la planificación de lo que depende de ella |
| **Referencia de variable** | Valor de una variable expresado como `${{ … }}` en lugar de como literal, que apunta a otra variable: del propio servicio, compartida del proyecto, o de otro servicio del mismo proyecto. Se resuelve en el backend antes de crear el contenedor; el contenedor nunca ve la expresión, ve el valor. Cuando apunta a otro servicio se persiste **vinculada al servicio y no a su nombre**, de modo que renombrarlo no la rompe |
| **Réplica** | Cada instancia paralela de un mismo servicio |
| **Servicio** | La configuración de un contenedor dentro de un proyecto: origen, variables, red, montajes, límites. No tiene estado de encendido |
| **Socket del motor de contenedores** | Punto de acceso local a la API del demonio de contenedores. Acceder a él equivale a control administrativo del host |
| **Subgrafo parametrizado** | Contenido de un ítem del catálogo: uno o varios servicios con sus aristas y con huecos parametrizables. Al instanciarlo se crean N servicios, cada uno con su propio contenedor, más los enlaces entre ellos |
| **Token de API** | Credencial de máquina, con ámbitos y vigencia, revocable individualmente, usada por automatismos |
| **Variable compartida del proyecto** | Variable definida una sola vez a nivel proyecto y referenciable desde cualquiera de sus servicios. Puede ser secreta, con el mismo tratamiento que cualquier otra: cifrada en reposo, mostrada enmascarada, nunca devuelta en claro ni escrita en una exportación |
| **Variable de enlace** | Variable de entorno que el sistema escribe al trazar una arista en el lienzo. No es una clase aparte de variable: es una referencia común a las variables provistas del servicio destino, y el usuario puede editarla como cualquier otra |
| **Variable generada** | **Término retirado.** Nombraba la variable que el enlace del lienzo producía cuando el enlace era un tipo de arista propio. Desde la segunda pasada sobre D-6 lo que el enlace produce es una **referencia de variable** común: ver «Referencia de variable» y «Variable de enlace». Se conserva la entrada porque el título del anexo E-4 sigue usando la expresión, por la razón declarada en §19 |
| **Variable provista por el sistema** | Variable de sólo lectura que el sistema expone en cada servicio y que el usuario no declara ni edita. Son dos: su host interno y su nombre. Llevan prefijo `SELFHOSTED_`, se nombran en inglés porque las lee el proceso dentro del contenedor, y ninguna es secreta. **No hay variable de puerto**: el puerto lo declaró el usuario y se escribe literal |
| **Ámbito** | Permiso concreto asociado a un token de API, por ejemplo `despliegues:ejecutar` |

**Qué separa léxicamente a «proyecto SelfHosted» de un nombre de proyecto de código, y la consecuencia asumida.** Los dos términos comparten la palabra `SelfHosted`, y conviene declarar qué los distingue, porque la distinción **es léxica y no tipográfica**:

| | Forma | Ejemplo |
|---|---|---|
| Término del producto | `SelfHosted` **sin sufijo de rol**, precedido de la palabra «proyecto» | «un proyecto SelfHosted», «los proyectos SelfHosted» |
| Nombre de capa del proyecto de código | La identidad de código `SelfHosted.Service.Core`, un **punto** y un **sufijo de capa**, sin la palabra «proyecto» delante. Es un espacio de nombres, no una unidad de compilación. Los cuatro sufijos de capa son `Domain`, `Application`, `Infrastructure` y `Web` | `SelfHosted.Service.Core.Domain`, `SelfHosted.Service.Core.Web` |
| Nombre del proyecto de código | La identidad de código a secas, sin sufijo de rol, porque hay un solo proyecto | `SelfHosted.Service.Core` |

**El discriminador es el punto, y después el sufijo de capa.** Todo nombre del plano de código arranca con la identidad `SelfHosted.Service.Core`, con puntos como separador de segmento, y cada capa agrega el suyo; el término del producto es `SelfHosted` a secas, sin punto y precedido de la palabra «proyecto». Por eso la regla es decidible por la forma de la palabra, sin depender del contexto ni del formato. Los cuatro sufijos de capa —`Web`, `Application`, `Infrastructure`, `Domain`— siguen presentes en los espacios de nombres, y el término del producto no lleva ninguno.

**Cómo sobrevivió esta regla a los dos cambios de composición.** La decisión D-E del 2026-07-29 llevó la raíz del plano de código de `SelfHosted` a `SelfHosted.Service.Core`, y la decisión del proyecto único del mismo día eliminó la forma `Nombre-Proyecto` por capa. Ninguna de las dos rompió la separación léxica, porque el discriminador nunca estuvo en la raíz ni en la existencia de cuatro nombres: está en que el plano de código escribe segmentos separados por punto y el término del producto no. El monoespaciado se usa donde el nombre de código se cita como identificador, pero es una **ayuda de lectura, no el mecanismo**: la distinción se sostiene igual en texto plano. Se exceptúan las filas donde el nombre es el **valor de un campo declarado** —`Nombre-Proyecto` en la tabla de §13 y en las cuatro tablas de identidad de §17—, que quedan sin formato deliberadamente: §13 es la fuente del manifiesto derivado y su tabla no se toca, de modo que ponerle formato sólo a §17 haría que las dos declaraciones del mismo dato dejaran de coincidir.

**Prohibición que se deriva, y que un artefacto downstream debe respetar:** no se admite ninguna construcción que fusione los dos términos, del tipo «el proyecto SelfHosted.Service.Core.Web» o «el proyecto de código SelfHosted». La prohibición alcanza a las dos formas del separador. Cuando hay que nombrar la unidad de compilación se escribe su nombre solo —`SelfHosted.Service.Core`— o «el proyecto de código `SelfHosted.Service.Core`», nunca «el proyecto SelfHosted.Service.Core». Cuando hay que nombrar una capa se escribe «la capa `Domain`» o su espacio de nombres completo, nunca «el proyecto `Domain`». Es la única forma en que los dos términos colapsarían, y hoy no ocurre en ninguna de las quinientas ocurrencias del documento.

**Consecuencia asumida.** El agente humano del proyecto evaluó la alternativa de elegir un término que no compartiera el prefijo y la descartó el 2026-07-28, reafirmando «proyecto SelfHosted». Se acepta entonces que los dos términos se parezcan a simple vista y que la separación dependa de una regla de forma, declarada acá, en lugar de dos palabras sin nada en común.

**Hay un tercer sentido, y no se califica.** Además de los dos anteriores, «proyecto» conserva su sentido corriente en el mundo del software: **el emprendimiento**, es decir el esfuerzo de construir esta solución, con sus etapas, su alcance, sus objetivos y sus criterios de aceptación. Aparece en expresiones como «el disparador del proyecto», «los objetivos del proyecto», «el proyecto no avanza a la etapa siguiente» o «unidad de entrega del proyecto», y en el propio rol «agente humano del proyecto».

Los tres sentidos se distinguen por el contexto en el que viven, y no hace falta calificar el tercero:

| Sentido | Contexto en el que aparece | Cómo se escribe |
|---|---|---|
| Producto | Servicios contenedorizados, redes, lienzo, despliegues | «proyecto SelfHosted», o «proyecto» a secas donde el contexto ya lo fijó |
| Unidad de compilación | Repositorio, capas, dependencias, cobertura, compilación | «proyecto de código», siempre completo |
| Emprendimiento | Proceso: etapas, alcance, plazos, objetivos, criterios de aceptación, entrega | «proyecto» a secas, sin calificar |

Se decidió **no calificarlo** porque los tres contextos son disjuntos y ninguna confusión real es posible: nadie lee «los objetivos del proyecto» pensando en un conjunto de contenedores ni en una unidad de compilación. Una tercera forma larga cargaría el texto sin resolver un problema que no existe.

**Consecuencia para un artefacto downstream.** La regla de que «proyecto» a secas designa el proyecto SelfHosted vale **dentro del contexto del producto**, que es donde el término se usa para nombrar algo que el usuario crea. En contexto de proceso, «proyecto» a secas designa el emprendimiento y es la forma correcta: convertirlo a «proyecto SelfHosted» produciría una afirmación falsa. Las categorías que hablan de proceso —plan de sprint, backlog, contexto y devops— van a usar ese tercer sentido de forma predominante, y deben dejarlo sin calificar.

---

# Parte B — Composición de la solución

## §13 Proyecto de código de la solución

La composición se deriva de la estructura declarada en `Analisis-Final-Integrado.md` §12 **[E]**, que define cuatro capas —dominio, aplicación, infraestructura y web— y de la decisión del agente humano del proyecto del **2026-07-29** **[D]**, que fija que esas cuatro capas se compilan en **un único proyecto de código** y se separan por espacio de nombres. El despliegue es monolítico —un único proceso sirve la interfaz Blazor, la API REST y los servicios en segundo plano— y desde esta versión la unidad de compilación también lo es.

Esta sección habla **exclusivamente del proyecto de código**, en el sentido que fija §12: la unidad de compilación del repositorio. El otro sentido del término —el **proyecto SelfHosted**, que es lo que el usuario crea desde el portal— no aparece acá.

Tabla del proyecto de código (fuente del manifiesto derivado):

| `Nombre-Proyecto` | `project_type` (D8) | Rol en la solución | Dependencias | `redistribuible` |
|---|---|---|---|---|
| SelfHosted-Service (único, y por lo tanto principal) | web-monolith | Único proyecto de código y único ejecutable: páginas Blazor Interactive Server, controladores REST `/api/v1` y servicios en segundo plano en un solo proceso, con las cuatro capas de la Clean Architecture como espacios de nombres internos | (ninguna) | false |

El grafo de dependencias entre proyectos de código es **trivial**: un solo nodo, sin aristas, nivel topológico 0. La solución es el caso degenerado del framework —un único proyecto—, con las consecuencias que `Master-Prompt.md` §3.5 declara para la estructura de la documentación generada.

**Las cuatro capas siguen existiendo, y su orden sigue importando.** Lo que dejó de ser un grafo de proyectos de código es ahora un grafo de espacios de nombres, con la misma regla de dependencia de la Clean Architecture y la misma dirección:

| Espacio de nombres | Carpeta dentro del proyecto | Depende de | Nivel |
|---|---|---|---|
| `SelfHosted.Service.Core.Domain` | `Domain/` | (ninguno) | 0 |
| `SelfHosted.Service.Core.Application` | `Application/` | `Domain` | 1 |
| `SelfHosted.Service.Core.Infrastructure` | `Infrastructure/` | `Application`, `Domain` | 2 |
| `SelfHosted.Service.Core.Web` | `Web/` | `Application`, `Infrastructure`, `Domain` | 3 |

Las seis aristas son las mismas que declaraba la versión 2.1 entre proyectos de código. Lo que cambió es quién las hace cumplir: antes el grafo de referencias de proyecto y el compilador; ahora el **test de arquitectura** de §17.P.6, que es gate bloqueante del pipeline **[D-i]**. El orden de construcción de cada corte vertical (§15) sigue siendo `Domain` → `Application` → `Infrastructure` → `Web`.

**Nota sobre los proyectos de prueba.** `SelfHosted.Service.Core.Domain.Tests`, `SelfHosted.Service.Core.Application.Tests` y `SelfHosted.Service.Core.Integration.Tests` **[E]** no se declaran como proyectos de código de la composición: son artefactos de la estrategia de testing (§17.P.6) y viven bajo `/tests`, según el árbol de §16. Se conservan los tres, aunque los tres referencien ahora el mismo proyecto de producción, porque son la unidad que organiza la pirámide de pruebas y la que alimenta los cuatro filtros de cobertura por espacio de nombres **[D-i]**.

Perfil de convención de nombres de código:

| Parámetro | Valor | Notas |
|---|---|---|
| `NombreSolucionCodigo`, forma del nombre de solución en código | `SelfHosted.Service.Core` | **Declarado explícitamente, no derivado.** Es la identidad de código de la solución, en el sentido del bloque «Identidad de la solución» de la cabecera: el argumento `-n` con el que se crea la solución y la raíz de todos los espacios de nombres. Se declara porque el algoritmo de `Master-Prompt.md` §3.2 —que concatena sin separadores— produciría `SelfHostedServiceCore`, una raíz que ningún artefacto de esta solución usa. Decisión del agente humano del proyecto, 2026-07-29 **[D]** |
| Separador de segmentos | `.` | Separa la identidad de código de los segmentos de capa y de rol |
| `nombre-proyecto-codigo` del proyecto único | `SelfHosted.Service.Core` | **Coincide con `NombreSolucionCodigo`, sin sufijo de rol.** Es una desviación declarada de la composición `<NombreSolucionCodigo>.<Sufijo>` de `Master-Prompt.md` §3.2, y se toma a cambio de que las cuatro capas queden simétricas: con el proyecto sin sufijo, cada capa es una carpeta de su raíz y un segmento propio del espacio de nombres, incluida la presentación en `Web/`. Decisión del agente humano del proyecto, 2026-07-29 **[D]** |
| Artefacto de agrupación de la construcción | `SelfHosted.Service.Core.sln` | Derivado como `<NombreSolucionCodigo>.sln`. El framework no modela este parámetro; se declara acá para que el nombre del archivo de solución tenga una fuente y no se decida en la etapa de scaffolding **[D]** |
| Prefijo de paquetes redistribuibles | `Aplicada` | No se aplica en esta solución: el proyecto de código no es redistribuible y no se publica ningún paquete |

**Por qué el proyecto de código lleva el mismo nombre que la solución.** Porque son la misma cosa: el archivo de solución agrupa exactamente un proyecto de producción y tres de prueba. La consecuencia buscada es que los cuatro espacios de nombres de las capas queden como segmentos directos de la identidad de código —`SelfHosted.Service.Core.Domain`, `.Application`, `.Infrastructure`, `.Web`—, **idénticos a los cuatro `nombre-proyecto-codigo` que la versión 2.1 declaraba**. Es lo que permite que todas las reglas que citan esas rutas, en particular la regla de aislamiento de `Requerimientos-Tecnicos.md` §2 **[E]**, sigan citándose literal: lo que cambió es que la ruta denota un espacio de nombres y ya no un directorio de proyecto.

**Los dos planos de nombres siguen siendo independientes por diseño.** El `Nombre-Proyecto` —`SelfHosted-Service`, **idéntico al `Nombre-Solucion` y no por casualidad**: con un único proyecto de código, el proyecto es la solución y los dos identificadores documentales nombran la misma cosa— gobierna el plano de documentación; el `nombre-proyecto-codigo` —`SelfHosted.Service.Core`— gobierna el plano de código: `/src`, el `.csproj` y los espacios de nombres. Es la sub-decisión E-1 (a) del agente humano del proyecto del 2026-07-29 **[D]**, que sobrevive al colapso de la composición. En el caso degenerado el `Nombre-Proyecto` tiene un solo consumidor efectivo, `SDD/Maquetas/<Nombre-Proyecto>/`: `Master-Prompt.md` §3.5 aplana la salida y la documentación se genera directamente bajo `SDD/Docs/`, sin el subnivel `Proyectos/<Nombre-Proyecto>/`. Si la solución incorporara un segundo proyecto de código, los dos identificadores dejarían de coincidir y cada uno recuperaría su función.

## §14 Estilo arquitectónico de la solución

La solución aplica Clean Architecture con organización por módulos, en despliegue monolítico y en un único proyecto de código **[E]** para el estilo, **[D]** para la unidad de compilación. Como §13, esta sección habla del plano de código. La regla de dependencia es la del estilo: las dependencias apuntan hacia el dominio y nunca al revés.

| Capa · espacio de nombres | Qué expone a las capas que dependen de ella | Quién la consume |
|---|---|---|
| `SelfHosted.Service.Core.Domain` | Entidades, objetos de valor, invariantes del modelo (I1 a I10, enumeradas en §17.P.2) y reglas de negocio (RN-01 a RN-37, transcriptas en el anexo [E-16](#2016--e-16--catálogo-de-reglas-de-negocio-rn-01-a-rn-37)) verificables sin infraestructura | Application, Infrastructure, Web |
| `SelfHosted.Service.Core.Application` | Casos de uso por módulo (proyectos, servicios y despliegues, descubrimiento, red, catálogo, observabilidad, identidad y tokens), sus DTO y validadores, y las abstracciones de salida que la infraestructura implementa | Web, e Infrastructure sólo para implementar sus abstracciones |
| `SelfHosted.Service.Core.Infrastructure` | Implementaciones de las abstracciones de Application: `DbContext` y configuraciones de EF Core, adaptador del motor de contenedores, lectura de métricas del host, exportación a Compose y respaldos. No expone contrato propio: se registra en el contenedor de dependencias durante el arranque | Web, sólo en la composición de arranque |
| `SelfHosted.Service.Core.Web` | La interfaz de usuario y la API REST `/api/v1`. Es el punto de entrada del proceso | El administrador por navegador y los automatismos por HTTP |

**Por qué las cuatro capas y no otra separación [D]:**

- **Frente a un diseño sin separación en capas:** la regla de aislamiento del cliente del motor de contenedores es explícita y bloqueante —ningún tipo de la librería de Docker puede aparecer fuera de `SelfHosted.Service.Core.Infrastructure/Contenedores/`, y todo consumo pasa por la abstracción `IContenedorEngine` **[E]**—, y las pruebas de dominio deben correr sin infraestructura. Las dos cosas exigen que las capas existan y que su frontera sea explícita. Lo que la decisión del 2026-07-29 cambió no es que la frontera exista, sino **quién la hace cumplir**: ver abajo.
- **Frente a microservicios:** el despliegue monolítico está declarado como requisito **[E]**, y el dimensionamiento del servidor de referencia lo confirma. Separar en servicios agregaría red, contratos y despliegue coordinado sin ningún beneficio para un único usuario en una única máquina.

**Por qué un único proyecto de código y no cuatro [D], 2026-07-29.** Es la decisión del agente humano del proyecto y reemplaza a la descomposición en cuatro proyectos que este documento declaraba hasta la versión 2.1. El producto es un único despliegue —un contenedor, un proceso, un ejecutable— y ninguna de las cuatro unidades se publicaba ni se consumía por separado: la frontera de compilación no aportaba ninguna capacidad de distribución, y en cambio arrastraba a la documentación un modelo de cuatro componentes publicables que no existe.

**Qué cambia y qué no, declarado con precisión porque es donde se pierde algo:**

| | Hasta la versión 2.1 | Desde la versión 2.2 |
|---|---|---|
| Las cuatro capas | Existen, como proyectos de código | **Existen igual**, como espacios de nombres y carpetas |
| La regla de dependencia | La hace cumplir el grafo de referencias entre proyectos | La hace cumplir el **test de arquitectura** de §17.P.6 **[D-i]** |
| La regla de aislamiento del cliente del motor **[E]** | Verificable por compilación | Verificable por test, gate bloqueante del pipeline |
| Las pruebas de dominio sin infraestructura | Garantía estructural: el proyecto no referenciaba nada | Garantía verificada: el test de arquitectura declara que el espacio de nombres `Domain` no referencia EF Core, el cliente del motor, ASP.NET Core ni terceros |
| El momento en que se detecta una violación | Error de compilación, en el editor | Test rojo del pipeline, antes de fusionar |

La degradación de garantía de la última fila está **asumida y declarada [D]**. Lo que no cambia es que ninguna violación llega a la rama principal: el test de arquitectura es bloqueante y el pull request es el punto de control.

El punto de entrada del usuario final es la capa `Web`; la capa compartida por todas es `Domain`.

## §15 Esquema de descomposición y delivery

La descomposición es **vertical, con walking skeleton inicial**, y está declarada en `Requerimientos-Funcionales.md` §2.1 **[E]**: cada etapa corta en vertical una funcionalidad acotada y la entrega operativa de punta a punta, atravesando interfaz, aplicación, dominio, datos y motor de contenedores. Está explícitamente prohibido planificar por capa técnica: no hay una etapa de entidades, otra de servicios de aplicación y otra de pantallas.

El valor demostrable end-to-end a través de la jerarquía se garantiza así:

- Las etapas `a` y `b` son hitos internos que atraviesan la jerarquía sin lógica de negocio: `a` entrega la solución compilando y ejecutándose desde los scripts dentro del devcontainer, con una página de salud que responde en el navegador del host, y verifica la puerta técnica PT-02; `b` entrega el panel navegable con las rutas del mapa de navegación del anexo [E-18](#2018--e-18--maquetado-de-la-interfaz-web), validado contra la maqueta UX-UI que ese mismo anexo especifica: disposición de la pantalla del lienzo, anatomía del nodo, panel lateral, dashboard y lenguaje visual de estados.
- La etapa `c` es el primer hito demostrable ante el cliente y ya recorre las cuatro capas: pantallas Blazor en Web, casos de uso de identidad en Application, reglas de contraseña en Domain y persistencia con migraciones en Infrastructure.
- De `c` en adelante, **toda** etapa es un hito demostrable, sin excepción: si una etapa planificada no produce algo que el cliente pueda recorrer en el navegador, está mal cortada y debe redividirse.

El orden de construcción respeta el orden de las capas de §13 dentro de cada etapa, no entre etapas: cada corte vertical toca los cuatro espacios de nombres en el orden Domain → Application → Infrastructure → Web. Que ahora sean espacios de nombres de un mismo proyecto de código y no cuatro proyectos no cambia el orden: la regla de dependencia es la misma y el corte vertical sigue atravesando las cuatro capas.

Reglas de entrega que el plan de sprint debe respetar **[E]**:

1. **No-regresión acumulativa.** Al cerrar cada etapa deben seguir pasando, sin correcciones, los guiones de demostración de todas las etapas anteriores.
2. **Todo guion arranca con los scripts, dentro del devcontainer**, y el resultado se observa en el navegador del host. No se admiten pasos manuales de preparación fuera de esos scripts.
3. **Estado de partida reproducible.** Cada guion declara desde qué estado parte y cómo se llega a él.
4. **Trazabilidad.** Cada etapa referencia la sección del análisis integrado que especifica lo que implementa.
5. **Punto de control bloqueante.** El orquestador se detiene, presenta el guion y espera el OK explícito del agente humano.
6. **Informe antes del punto de control.** Ninguna etapa se da por terminada, ni se convoca al agente humano, sin su informe de cierre publicado. El informe es el entregable de documentación de la etapa, al mismo nivel que el código.

Cada etapa se especifica con una **plantilla obligatoria completa** antes de empezar a codificarla, y una etapa sin criterios de aceptación verificables no se puede iniciar **[E]**. Sus campos son: tipo (`HI` o `HD`), objetivo, alcance, fuera de alcance, entregable tangible, guion de demostración, criterios de aceptación, punto de control e informe de cierre.

### §15.1 Informe de cierre de etapa

Es un artefacto de documentación obligatorio por etapa, declarado en `Requerimientos-Funcionales.md` §2.5 **[E]**, y su especificación es cerrada. El orquestador debe tratarlo como entregable de la etapa, no como resumen opcional.

| Aspecto | Definición **[E]** |
|---|---|
| Ubicación | `SelfHosted.Service.Core.Documentos/Avances/<orden>-<etapa>.md`, donde `<orden>` es `a`, `b`, `c`, `01`, `02`, … según el orden de ejecución, y `<etapa>` es el nombre en minúsculas y con guiones. Ejemplos: `a-esqueleto-ejecutable.md`, `c-administrador-y-sesion.md`, `01-proyectos.md` |
| Momento | Antes de convocar el punto de control |
| Destinatario | Alguien que no vio escribir el código y va a sentarse a probarlo. No se dan por sabidos ni los nombres de proyectos de código, ni las rutas, ni las claves generadas |
| Secciones obligatorias, en orden | Identificación (etapa, tipo, fecha, secciones del análisis que implementa, estado `Pendiente de validación` / `Validada` / `Con correcciones pedidas`); qué se entregó; qué quedó fuera; cómo lo levanto; claves y credenciales; qué probar paso a paso; casos de ejemplo; qué debería ver; cómo está armado el proyecto; criterios de aceptación; no-regresión; problemas conocidos; qué habilita |
| Reglas de escritura | Autocontenido, se lee sin abrir el análisis integrado ni el código. Verificable: todo comando que aparece fue ejecutado tal como está escrito. Honesto: un criterio incumplido se declara, y un informe que declara terminada una etapa incompleta invalida el punto de control. Acumulativo: cada etapa agrega su archivo y los anteriores no se editan salvo para actualizar su estado |
| Índice | `Avances/README.md` mantiene la lista de informes en orden, con etapa, tipo, fecha y estado |

**[D] Consecuencia para la generación SDD.** Este informe es documentación de proceso del repositorio de documentación, no un artefacto de las doce categorías: no vive bajo `SDD/Docs/` ni lo produce un subagente de categoría. Pero condiciona dos categorías: `07-Plan-Sprint`, que debe incorporarlo como definición de terminado de cada etapa, y `11-Documentacion`, que no debe duplicar su contenido. Las tres etapas ya especificadas declaran además qué debe explicar su informe en particular: la etapa `a`, el árbol de proyectos pieza por pieza, qué hace cada script y cómo se comprueba PT-02 desde el navegador del host; la etapa `b`, cada ruta navegable con su rótulo, qué pantallas son marcadores de posición y en qué anchos de ventana se verificó el comportamiento responsivo; la etapa `c`, la contraseña de ejemplo del administrador de prueba, la regla que hace fallar una contraseña débil, dónde queda el archivo de SQLite y cómo borrarlo para repetir el primer arranque **[E]**.

Cortes verticales ya declarados para el Alcance 1, cada uno una etapa demostrable independiente **[E]**: proyectos; servicios del proyecto; lienzo; despliegue desde imagen pública; arranque y parada; cambios pendientes; direcciones IP y conflictos; escalado manual; despliegue desde Dockerfile y repositorio; descubrimiento y adopción. Pueden reordenarse o subdividirse, pero no fusionarse hasta perder la demostrabilidad intermedia. Los condicionan dos puertas técnicas: PT-01 antes del corte del lienzo y PT-02 antes del corte de despliegue, verificada ya en la etapa `a`.

## §16 Estructura de repositorio de la solución

Árbol derivado del proyecto de código único de §13 y del perfil de convención, coherente con la estructura de carpetas declarada en `Analisis-Final-Integrado.md` §12 **[E]** y con los scripts y el entorno de desarrollo de `Requerimientos-Tecnicos.md` §3 **[E]**. Respecto de la fuente, la diferencia es de **frontera de compilación, no de organización**: las cuatro carpetas que la fuente muestra bajo `/src` como directorios de proyecto son ahora carpetas de primer nivel dentro del proyecto único, con los mismos nombres y las mismas subcarpetas.

```text
SelfHosted.Service.Core/                             # repositorio
├── SelfHosted.Service.Core.sln         # artefacto de agrupacion
├── .devcontainer/
│   └── devcontainer.json               # entorno declarativo: SDK .NET 10 + docker-outside-of-docker
├── .vscode/
│   └── launch.json                     # depuracion coreclr con F5, camino separado del de los scripts
├── src/
│   └── SelfHosted.Service.Core/    # UNICO .csproj, web-monolith, unico ejecutable
│       │                           # namespace raiz = nombre del proyecto = identidad de codigo
│       ├── Program.cs              # -> SelfHosted.Service.Core   raiz de composicion, sin capa
│       ├── Domain/                 # -> SelfHosted.Service.Core.Domain          capa, nivel 0
│       │   ├── Proyectos/          # Proyecto, Red, CanvasLayout, VariableCompartida
│       │   ├── Servicios/          # Servicio, Origen, Variable, ReferenciaVariable, Montaje, Recursos
│       │   ├── Despliegues/        # Despliegue, EstadoDespliegue, Evento
│       │   ├── Red/                # ReservaIp, RangoGestionado, Conflicto
│       │   ├── Catalogo/           # CatalogoItem (subgrafo), Parametro
│       │   └── Identidad/          # TokenApi, Ambito
│       ├── Application/            # -> SelfHosted.Service.Core.Application     capa, nivel 1
│       │   ├── Proyectos/          # casos de uso, DTO, validadores
│       │   ├── Servicios/
│       │   ├── Despliegues/
│       │   ├── Descubrimiento/
│       │   ├── Red/
│       │   ├── Catalogo/
│       │   ├── Observabilidad/
│       │   └── Abstracciones/      # IContenedorEngine, IProyectoRepository, IRelojSistema
│       ├── Infrastructure/         # -> SelfHosted.Service.Core.Infrastructure  capa, nivel 2
│       │   ├── Persistencia/       # DbContext, configuraciones, migraciones
│       │   ├── Contenedores/       # adaptador del motor (unico lugar con tipos de Docker)
│       │   ├── Sistema/            # metricas del host
│       │   └── Exportacion/        # Compose, catalogo, respaldos
│       ├── Web/                    # -> SelfHosted.Service.Core.Web             capa, nivel 3
│       │   ├── Components/         # lienzo, paneles, dashboard, layout
│       │   ├── Controllers/        # un controlador por recurso, bajo /api/v1
│       │   └── BackgroundServices/ # sincronizador de estado, recolector de metricas
│       └── wwwroot/js/             # canvas-interop.js: unico JavaScript propio
├── tests/
│   ├── SelfHosted.Service.Core.Domain.Tests/        # incluye el test de arquitectura
│   ├── SelfHosted.Service.Core.Application.Tests/
│   └── SelfHosted.Service.Core.Integration.Tests/   # SQLite real y motor real via Testcontainers
├── samples/
├── scripts/                            # build.sh, run.sh, migrate.sh, test.sh, reset-db.sh
├── docs/
├── SDD/
│   ├── Intake/                         # este documento
│   ├── Docs/                           # categorias SDD 00 a 11, planas (caso degenerado)
│   └── Maquetas/SelfHosted-Service/    # maqueta de validacion visual, derivada del anexo E-18
└── changelog.md
```

La estructura sigue las convenciones del ecosistema .NET: `src` y `tests` como raíces y espacios de nombres que replican la ruta. El proyecto de código no es redistribuible, de modo que el prefijo de organización no se usa.

**Los espacios de nombres y la raíz del proyecto.** El espacio de nombres raíz es el nombre del proyecto, `SelfHosted.Service.Core`, que coincide con la identidad de código. No hace falta declarar `RootNamespace`: es el comportamiento por omisión de .NET. Cada capa es **una carpeta de la raíz del proyecto y un segmento propio** debajo de esa raíz, y las cuatro son simétricas:

| Capa | Carpeta | Espacio de nombres | Nivel |
|---|---|---|---|
| Dominio | `Domain/` | `SelfHosted.Service.Core.Domain` | 0 |
| Aplicación | `Application/` | `SelfHosted.Service.Core.Application` | 1 |
| Adaptadores | `Infrastructure/` | `SelfHosted.Service.Core.Infrastructure` | 2 |
| Presentación | `Web/` | `SelfHosted.Service.Core.Web` | 3 |

**La carpeta `Web/` es lo que hace posible esa simetría [D], 2026-07-29.** La plantilla de Blazor deja `Components/`, `Controllers/` y `BackgroundServices/` en la raíz del proyecto, y con esa disposición la capa de presentación no tendría un segmento propio: sería un conjunto de tres espacios de nombres hermanos de las otras tres capas, que habría que enumerar en el test de arquitectura y en los filtros de cobertura, con la regla adicional de acordarse de agregar cualquier carpeta nueva. Agrupándolos bajo `Web/`, la presentación se nombra con un único espacio de nombres igual que las otras tres, y la enumeración desaparece. `wwwroot/` queda fuera de la agrupación porque el framework la exige en la raíz del proyecto, y no contiene código de ninguna capa.

**`Program.cs` no pertenece a ninguna capa, y se declara exento [D-i].** Vive en la raíz del proyecto, en el espacio de nombres `SelfHosted.Service.Core`, y es la raíz de composición: registra las implementaciones de `Infrastructure` contra las abstracciones de `Application` y configura la canalización de `Web`. Por definición toca más de una capa, así que el test de arquitectura de §17.P.6 lo excluye de la regla de dependencia. Sin esa exención el test falla sobre el arranque, que es precisamente el único lugar donde el acoplamiento entre capas es correcto.

**La regla de aislamiento se cita literal, sin reexpresión de referente.** `Requerimientos-Tecnicos.md` §2 declara **[E]** que ningún tipo de la librería de Docker puede aparecer fuera de `SelfHosted.Infrastructure/Contenedores/`, y con esta disposición eso es `SelfHosted.Service.Core.Infrastructure/Contenedores/`: el mismo sufijo de ruta, con la identidad de código delante. No hay referente que reexpresar ni reinterpretación que registrar. Es la razón principal por la que esta disposición se prefirió a las dos que se evaluaron antes el mismo día.

La ruta `SDD/Maquetas/SelfHosted-Service/` usa el `Nombre-Proyecto` y no el `nombre-proyecto-codigo`, porque pertenece al plano de documentación. No es una inconsistencia con `/src`: es la separación de planos que §13 declara.

### §16.1 Materialización de `/samples`

Con un único proyecto de código, `/samples` deja de organizarse por proyecto y pasa a organizarse por **capacidad demostrada**. El destinatario no cambia y sigue siendo el declarado en §18: no hay integradores externos, de modo que la función de un sample es sostener las demostraciones de las etapas y las puertas técnicas.

| Sample | Capa que ejercita | Qué contiene |
|---|---|---|
| Juego de datos de siembra | `Web`, extremo a extremo | Reproduce el parque de contenedores de referencia (proyectos, servicios, modos de red y direcciones), derivado de las configuraciones reales ofuscadas del anexo [E-20](#2020--e-20--configuraciones-reales-de-contenedor-ofuscadas), para levantar la aplicación con contenido y recorrer el lienzo sin configurar nada a mano. El anexo [E-9](#209--e-9--esquema-relacional-de-la-base-sqlite) es su esquema de destino |
| Ejercitación de casos de uso sin motor real | `Application` | Ejercita los casos de uso con una implementación de prueba de `IContenedorEngine`, sin motor real. Demuestra que la capa de aplicación es ejercitable sin infraestructura, que es la propiedad que el test de arquitectura hace cumplir |
| Adaptador contra motor real | `Infrastructure` | Ejemplo ejecutable del adaptador del motor de contenedores contra un motor real: es la materialización de la puerta técnica PT-02 —listar, crear, arrancar, detener y eliminar un contenedor de prueba desde código |
| Reglas de negocio sin infraestructura | `Domain` | Ejemplos de las reglas de negocio más específicas resueltas sin infraestructura, en particular la validación de conflicto de direcciones IP del anexo [E-8](#208--e-8--reserva-de-direcciones-ip-e-informe-de-conflicto) |

Cada sample es autocontenido, se ejecuta desde los scripts dentro del devcontainer y no requiere pasos manuales previos.

---

# Parte C — Técnica del proyecto de código

## §17 Bloque técnico del proyecto de código

La solución tiene **un único proyecto de código**, decidido por el agente humano del proyecto el 2026-07-29 **[D]**. Las cuatro capas de la Clean Architecture —dominio, aplicación, infraestructura y presentación— siguen existiendo como separación interna, materializadas en **carpetas y espacios de nombres** dentro de ese proyecto, no en unidades de compilación separadas. Este bloque es el único de la Parte C; donde una capa tiene una definición propia, se declara como sub-bloque de la sección P.x correspondiente en lugar de en un bloque técnico aparte.

| Campo | Valor |
|---|---|
| `Nombre-Proyecto` | SelfHosted-Service |
| `nombre-proyecto-codigo` | `SelfHosted.Service.Core` |
| `project_type` (D8) | web-monolith |
| Rol | Único proyecto de código y único ejecutable: interfaz Blazor, API REST y servicios en segundo plano en un solo proceso, con las cuatro capas como espacios de nombres internos |
| `redistribuible` | false |
| Path `/src` | `src/SelfHosted.Service.Core/` |

**Los cuatro espacios de nombres internos**, que son las capas y que este bloque nombra constantemente:

| Espacio de nombres | Carpeta | Qué contiene |
|---|---|---|
| `SelfHosted.Service.Core.Domain` | `Domain/` | Entidades, invariantes I1 a I10 y reglas de negocio RN-01 a RN-37, sin dependencias externas |
| `SelfHosted.Service.Core.Application` | `Application/` | Casos de uso por módulo, DTO, validadores y las abstracciones de salida |
| `SelfHosted.Service.Core.Infrastructure` | `Infrastructure/` | Adaptadores: persistencia, motor de contenedores, métricas del host y exportación |
| `SelfHosted.Service.Core.Web` | `Web/`, con `Components/`, `Controllers/` y `BackgroundServices/` adentro | Páginas Blazor, controladores REST y servicios en segundo plano |

**Cómo leer las citas de rutas de este documento.** Una ruta de la forma `SelfHosted.Service.Core.Infrastructure/Contenedores/` denota, desde esta versión, un **espacio de nombres y su carpeta dentro del proyecto único**, y ya no un directorio de proyecto de compilación bajo `/src`. El texto de las reglas que las citan no cambió, porque los espacios de nombres se conservaron idénticos a los nombres de código anteriores; lo que cambió es a qué apuntan. Es lo que permite que la regla de aislamiento de `Requerimientos-Tecnicos.md` §2 **[E]** siga citándose literal.

### §17.P.1 Stack tecnológico

Lenguaje C# sobre **.NET 10**, con Blazor en modo **Interactive Server** **[E]**. Plataforma target: contenedor Linux; en desarrollo, el devcontainer con imagen oficial `mcr.microsoft.com/devcontainers/dotnet` anclada por tag en `devcontainer.json` **[E]**.

Dependencias core, todas con versión anclada y verificada **[E]**. Cualquier cambio de versión mayor es una decisión que se documenta, no un efecto colateral de una actualización de paquetes:

| Dependencia | Versión | Licencia y fecha | Por qué es core | Capa que la consume |
|---|---|---|---|---|
| MudBlazor | 9.7.0 | MIT, publicada 2026-07-09 | Sistema visual completo de la interfaz; los nodos del lienzo se construyen con sus componentes. Sin ella no hay pantalla | `Web` |
| Z.Blazor.Diagrams | 3.0.4.1 | MIT, publicada 2026-03-02, marcos `net6.0` a `net10.0` | Lienzo: nodos y grupos personalizados, puertos, enlaces, minimapa y virtualización. Sujeta a la puerta técnica PT-01 | `Web` |
| ASP.NET Core Identity | Incluida en .NET 10 | — | Autenticación por cookie del administrador único | `Web` e `Infrastructure` |
| Entity Framework Core con proveedor SQLite | La correspondiente a .NET 10 | — | Es la persistencia de toda la solución. Migraciones aplicadas al arrancar | `Infrastructure` |
| Docker.DotNet.Enhanced | 4.3.3 | MIT, publicada 2026-06-28, marcos `netstandard2.0`, `net8.0`, `net9.0`, `net10.0` | Cliente del motor de contenedores. Declara soporte de la API del motor v29.4.1 | `Infrastructure`, exclusivamente en `Infrastructure/Contenedores/` |
| `dotnet-ef` | Herramienta **local** del repositorio, no global | — | Para que la versión quede versionada junto al código **[E]** | Herramienta de desarrollo |

Runtime mínimo: .NET 10. Protocolo en desarrollo: HTTP sin certificado de desarrollo, para evitar la fricción del certificado de confianza dentro del contenedor; HTTPS es asunto del despliegue **[E]**.

**Consecuencia del proyecto único sobre las dependencias, y es la que hay que tener presente [D-i].** Hasta la versión 2.1 la ausencia de dependencias era un hecho estructural verificable por compilación: `SelfHosted.Domain` no referenciaba nada y `SelfHosted.Application` referenciaba sólo al dominio, de modo que un `using` indebido no compilaba. Con un proyecto único, **las seis dependencias de arriba están disponibles para todo el código del ensamblado**, y la restricción por capa deja de ser estructural y pasa a ser una regla verificada. Las dos reglas que la sostienen son:

1. Ningún tipo de EF Core, del cliente del motor de contenedores ni de ASP.NET Core puede aparecer en `SelfHosted.Service.Core.Domain` ni en `SelfHosted.Service.Core.Application`.
2. Ningún tipo del cliente del motor de contenedores puede aparecer fuera de `SelfHosted.Service.Core.Infrastructure.Contenedores` **[E]**, que es la regla de `Requerimientos-Tecnicos.md` §2 sin cambios.

Las dos las verifica el test de arquitectura de P.6, que es gate bloqueante del pipeline (P.8).

### §17.P.2 Estilo arquitectónico del proyecto de código

**Clean Architecture con organización por módulos, en despliegue monolítico y en un único proyecto de código** **[E]** para el estilo, **[D]** para la unidad de compilación. Un solo proceso sirve la interfaz Blazor, la API REST y los servicios en segundo plano; un solo ensamblado los contiene. La regla de dependencia del estilo no cambia: las dependencias apuntan hacia el dominio y nunca al revés.

**Capa de presentación (`Web`)** **[E]**. Tres superficies sobre el mismo proceso y la misma capa de aplicación: páginas Blazor Interactive Server, controladores REST y servicios en segundo plano. Las páginas invocan la capa de aplicación **en proceso**, sin pasar por HTTP: no hay una llamada de red que autenticar entre la interfaz y la lógica **[E]**. Los controladores se organizan por recurso dentro de la carpeta de su módulo.

**Capa de aplicación (`Application`)** **[E]**. Organización **por módulos**: proyectos, servicios y despliegues, descubrimiento y adopción, red y conflictos de IP, catálogo, observabilidad, e identidad y tokens. Cada módulo agrupa sus casos de uso, sus DTO y sus validadores. Las abstracciones de salida viven en `Application/Abstracciones/` y son la única forma en que la capa alcanza el mundo exterior.

**Capa de adaptadores (`Infrastructure`)** **[E]**. Organizada por tecnología de salida: `Persistencia/`, `Contenedores/`, `Sistema/` y `Exportacion/`. Cada carpeta implementa las abstracciones declaradas en `Application/Abstracciones/` y no expone contrato propio: se registra en el contenedor de dependencias durante el arranque.

**Capa de dominio (`Domain`)** **[E]**. Modelo de dominio organizado por agregados, en carpetas que replican los conceptos del negocio: `Proyectos/`, `Servicios/`, `Despliegues/`, `Red/`, `Catalogo/` e `Identidad/`.

La decisión estructural del modelo, de la que dependen casi todas las demás, es la **separación entre configuración y ejecución** **[E]**, visible en el contraste entre el anexo [E-2](#202--e-2--servicio-con-sus-tres-variantes-de-origen), que es la configuración de un servicio, y el anexo [E-3](#203--e-3--despliegue-con-su-línea-de-tiempo-de-eventos-y-sus-métricas), que es un intento concreto de materializarla: el servicio es la configuración y existe siempre mientras no se lo borre del proyecto SelfHosted; el despliegue es el intento concreto de materializarla y tiene el ciclo de vida. El servicio no tiene estado de encendido o apagado; el despliegue sí, con la máquina de estados del anexo [E-17](#2017--e-17--ciclo-de-vida-del-despliegue-y-correspondencia-con-el-motor), que también declara cómo se traduce cada estado del contenedor al estado del despliegue. Es el patrón de estado deseado frente a estado actual, y explica por qué detener un servicio no borra nada: elimina el contenedor conservando intactas la definición, las variables y los datos del volumen.

Invariantes que el modelo debe hacer cumplir **[E]**: un proyecto SelfHosted contiene N servicios y un servicio pertenece a exactamente un proyecto SelfHosted (I1); un servicio es siempre exactamente un contenedor (I2); el servicio no tiene estado de encendido (I3); el ciclo de vida vive en el despliegue (I4); un servicio tiene como máximo un despliegue activo por réplica (I5); los datos persistentes viven en el volumen o montaje adjunto al servicio y sobreviven a la parada (I6); dos servicios **activos** de proyectos distintos no pueden ocupar la misma dirección, dos configurados sí (I7); el nombre de servicio es único dentro del proyecto y es también su nombre DNS interno (I8); los cambios de arquitectura se acumulan en un changeset y se aplican en lote (I9); un contenedor adoptado pertenece a un solo proyecto (I10).

**Correspondencia con las invariantes del producto de referencia [E]** respecto de `Analisis-Rayway.md` §3.6, transcriptas acá porque la tabla de procedencia declara esa sección como fuente y la regla de autocontención exige que lo tomado esté en el documento. No son invariantes de esta solución: son las del producto relevado, y sirven para mostrar cuáles se adoptaron, cuál se adaptó y cuál se descartó.

| # en la fuente | Invariante del producto de referencia | Qué se hizo con ella acá |
|---|---|---|
| I1 | Un `Project` contiene **N** `Service` | **Adoptada** como I1, que además fija la pertenencia a exactamente un proyecto |
| I2 | Un `Service` **es** un contenedor desplegado desde una imagen | **Adoptada** literalmente como I2. Es la que prohíbe que un ítem multi-servicio del catálogo empaquete varios servicios en un contenedor (D-7, RN-30) |
| I3 | Un `Service` no tiene estado on/off; su configuración existe siempre | **Adoptada** como I3 |
| I4 | El ciclo de vida vive en el `Deployment` | **Adoptada** como I4, y extendida por I5, que fija un despliegue activo por réplica porque esta solución tiene escalado horizontal manual |
| I5 | Toda configuración está *scoped* a un `Environment` | **Descartada.** Esta solución no tiene el concepto de entorno: hay un único servidor y un único administrador (§9). Es la diferencia de modelo más grande respecto de la fuente |
| I6 | La conectividad privada es automática dentro del entorno | **Adaptada.** Acá la red es por proyecto y la conectividad automática vale dentro de ella; es lo que sostiene que la arista del lienzo no represente red sino dependencia de configuración (P.11) |
| I7 | Los datos persistentes viven en el `Volume`, adjunto al servicio | **Adoptada** como I6, ampliada a montaje de directorio porque es el patrón mayoritario del parque real (E-19) |
| I8 | Los cambios se acumulan en un *changeset* antes de aplicarse | **Adoptada** como I9 |

Las invariantes propias de esta solución que la fuente no tiene son I7 (conflicto de direcciones entre servicios activos de proyectos distintos), I8 (nombre de servicio único y a la vez nombre DNS interno) e I10 (un contenedor adoptado pertenece a un solo proyecto). Las tres nacen de cosas que el producto de referencia no enfrenta: direcciones fijas de una LAN real, y un parque preexistente que hay que adoptar sin reinstanciar.

**Alternativas de estilo descartadas [E] salvo donde se indique:**

1. **Minimal APIs en lugar de controladores.** Se descarta como estilo general: en una API de administración de pocas decenas de endpoints, agrupados por módulo y con validación por atributos, los controladores son más legibles y acompañan mejor la organización por carpetas. La diferencia de rendimiento es irrelevante frente al costo de las operaciones sobre el motor de contenedores. Excepción admitida: los endpoints de sondeo de estado y métricas, de altísima frecuencia y cuerpo mínimo, pueden implementarse como minimal APIs sin romper la coherencia.
2. **Aislar la página del lienzo en `InteractiveAuto` o WebAssembly.** Es la mitigación M6 de RG-01 y se descarta salvo que PT-01 falle después de aplicar M1 a M4, porque cambia un requisito declarado.
3. **Organización por tipo técnico** en la capa de aplicación —una carpeta de servicios, otra de DTO, otra de validadores, transversales a todo el dominio— **[D]**: dispersa cada capacidad en tres lugares y hace que agregar un módulo toque tres carpetas. La organización por módulos está declarada en las fuentes.
4. **Fusionar la capa de aplicación con el dominio [D]**: haría que las reglas de negocio dependieran de DTO y de abstracciones de infraestructura, y rompería la exigencia de que las pruebas de dominio corran sin infraestructura **[E]**. La fusión de **proyectos de compilación** decidida el 2026-07-29 no es esta fusión: las dos capas siguen siendo espacios de nombres distintos con la regla de dependencia intacta.
5. **Un modelo de dominio anémico**, con las reglas en la capa de aplicación **[D]**: dejaría las invariantes I1 a I10 sin un lugar donde hacerse cumplir, y las pruebas de dominio sin objeto que probar.
6. **Que el nodo del lienzo represente al despliegue** en lugar de al servicio **[D]**: el lienzo se reconstruiría en cada arranque y perdería la posición **[E]**.

**La decisión de compilar en un único proyecto [D], 2026-07-29.** Es la decisión del agente humano del proyecto y reemplaza a la descomposición en cuatro proyectos de código que este documento declaraba hasta la versión 2.1. Su fundamento: el producto es un único despliegue —un contenedor, un proceso, un ejecutable— y ninguna de las cuatro unidades se publica ni se consume por separado, de modo que la frontera de compilación no aporta ninguna capacidad de distribución. Alternativas descartadas al tomarla:

| Alternativa | Por qué se descartó |
|---|---|
| **Cuatro proyectos de código**, uno por capa, que es lo que este documento declaraba | Multiplica las unidades de compilación de una solución que se despliega entera y de una sola vez, y arrastra a la documentación un modelo de cuatro componentes publicables que no existe |
| **Un proyecto de código por adaptador** dentro de infraestructura **[D]** | Multiplicaría las unidades sin ganar aislamiento real, porque todas se despliegan juntas y ninguna se publica por separado. Se descartaba ya antes de esta decisión y con más razón después |

**Lo que la decisión cuesta, declarado y compensado.** La frontera de proyecto hacía cumplir por compilación tres cosas que ahora hay que verificar: la regla de aislamiento del cliente del motor, la ausencia de dependencias externas en el dominio y la separación entre aplicación e infraestructura. Las tres pasan a verificarse con el **test de arquitectura** de P.6, que es gate bloqueante del pipeline. La diferencia real es el momento en que se detecta la violación: antes era un error de compilación, ahora es un test rojo del pipeline. Es una degradación de garantía asumida **[D]**, no un descuido.

### §17.P.3 Comunicación e integración

**Superficie externa** **[E]**:

| Aspecto | Definición |
|---|---|
| Interfaz de usuario | Circuito SignalR sobre WebSockets, propio de Interactive Server **[E]**. Garantizar WebSockets, y no sondeo largo, en la publicación del contenedor es la mitigación M4 de RG-01 |
| API REST | HTTP/JSON bajo `/api/v1`, con controladores. Todos los endpoints autenticados y con ámbito declarado |
| Formato de error | `ProblemDetails`, el estándar de ASP.NET Core, con miembros de extensión propios para el informe de conflicto **[E]**. Ver anexos [E-8](#208--e-8--reserva-de-direcciones-ip-e-informe-de-conflicto) y [E-13](#2013--e-13--contrato-del-endpoint-de-despliegue) |
| Versionado de contratos | El prefijo `/api/v1` es la unidad de versión. Un cambio incompatible abre `/api/v2`; `v1` no cambia su semántica una vez publicada |
| Política de breaking changes | Ningún cambio incompatible dentro de una versión mayor de la API. Agregar un campo opcional a una respuesta no lo es; quitar o renombrar uno, sí |

La superficie de la API son los **treinta endpoints**, agrupados en las veintiocho filas transcriptas en el anexo [E-15](#2015--e-15--superficie-de-la-api-rest) **[E]**, cada uno con su ámbito: `proyectos:leer`, `proyectos:escribir`, `despliegues:ejecutar`, `catalogo:leer`, `catalogo:escribir` y `sistema:leer`. Las reglas que esos endpoints hacen cumplir, con su momento de validación y su código de respuesta, están en el anexo [E-16](#2016--e-16--catálogo-de-reglas-de-negocio-rn-01-a-rn-37).

**Integraciones salientes** **[E]**:

| Integración | Protocolo | Nota |
|---|---|---|
| Motor de contenedores | API HTTP del demonio sobre socket de dominio Unix (`/var/run/docker.sock`), montado del host | En desarrollo por `docker-outside-of-docker`; en producción por socket montado en el contenedor **[E]**. Siempre a través de `IContenedorEngine`. Registro de contenedores en flujo continuo para la vista de logs |
| Base de datos | Archivo SQLite local, acceso en proceso | Ver P.4 |
| Sistema de archivos | Lectura del sistema de archivos virtual del sistema operativo, montado en modo sólo lectura, para las métricas del host **[E]** | |
| Exportación | Escritura de archivos Compose, de variables y del manifiesto propio en el directorio de datos de trabajo | Ver anexo [E-14](#2014--e-14--exportación-de-un-proyecto-a-docker-compose). Las reglas de traducción en el sentido inverso, de Compose al modelo, están en el anexo [E-21](#2021--e-21--correspondencia-entre-una-configuración-real-y-el-modelo-de-la-solución), verificadas contra las configuraciones reales del anexo [E-20](#2020--e-20--configuraciones-reales-de-contenedor-ofuscadas) |

**Contratos internos entre capas.** Ya no cruzan una frontera de proyecto, pero siguen siendo la estructura del código y se declaran igual **[E]**:

- El contrato de `Application` hacia `Web` son los casos de uso públicos de cada módulo y sus DTO.
- El contrato de `Application` hacia `Infrastructure` son las abstracciones que esta implementa: `IContenedorEngine`, los repositorios y `IRelojSistema`.
- El contrato de `Domain` hacia el resto son sus tipos públicos. No tiene dependencias salientes: es la capa base.

`IContenedorEngine` es el contrato más sensible de la solución: **ningún tipo de la librería de Docker puede aparecer fuera de `SelfHosted.Service.Core.Infrastructure/Contenedores/`** **[E]**. Los tipos que cruzan esta interfaz son propios de la solución, nunca del cliente de Docker. Es lo que permite cambiar de cliente sin tocar el resto. Desde la versión 2.2 la ruta denota un espacio de nombres y la regla la verifica el test de arquitectura, no el compilador.

Política de breaking changes internos: al haber un único proyecto y ningún consumidor externo, un cambio de firma se propaga en el mismo commit a todos sus usos. La compilación sigue siendo el detector.

**Restricción de rutas, consecuencia de `docker-outside-of-docker` [E]:** toda ruta que la aplicación le pase al demonio —contexto de construcción de un Dockerfile, montajes de volumen, directorio de repositorios clonados— la interpreta el demonio **del host**, no el sistema de archivos del devcontainer. Por eso el directorio de datos de trabajo debe estar montado **en la misma ruta absoluta en el host y en el devcontainer**, se expone como una variable de configuración única, y todo el adaptador la usa como raíz. Traducir rutas en el adaptador se descartó por frágil.

Los contenedores creados son **hermanos, no hijos** del devcontainer: nacen en el host, al mismo nivel. Para que la aplicación alcance por red a un servicio recién desplegado, el devcontainer debe estar adjunto a la misma red de puente del proyecto, o alcanzarlo por el puerto publicado en el host **[E]**.

### §17.P.4 Persistencia

| Aspecto | Definición **[E]** |
|---|---|
| Motor | SQLite, archivo único |
| Modo de diario | **WAL.** Los servicios en segundo plano escriben concurrentemente con la interfaz; sin WAL, los bloqueos de escritura degradan la interfaz |
| Concurrencia de escritura | **Escritor único.** SQLite no admite escrituras concurrentes: las escrituras de los servicios en segundo plano se serializan |
| Alcance del `DbContext` | Uno por operación. Los servicios en segundo plano crean su propio alcance en cada ciclo y nunca comparten el de la interfaz |
| Versionado del esquema | Migraciones de EF Core, aplicadas automáticamente al arrancar sobre una base inexistente o desactualizada. `scripts/migrate.sh` genera y aplica; `scripts/reset-db.sh` elimina la base local para reproducir el estado de primer arranque |
| Ubicación del archivo | Configurable. En producción reside en un volumen persistente, nunca dentro de la imagen |
| Respaldo | Exportación programada de proyectos SelfHosted y catálogo a un destino externo (DA-08). El respaldo debe ser consistente con WAL activo |
| Almacén de Identity | Se materializa sobre el mismo `DbContext` de la solución **[D]** |
| Multi-tenant | No aplica. Hay un único administrador y una única instancia |

**Dónde vive la persistencia dentro del proyecto.** Exclusivamente en `SelfHosted.Service.Core.Infrastructure.Persistencia`. Ni `Domain` ni `Application` conocen EF Core ni SQLite: `Domain` define las entidades y no su almacenamiento, y `Application` define las abstracciones de repositorio y no su implementación. Es la segunda regla que verifica el test de arquitectura de P.6.

Modelo de datos: el esquema relacional está transcripto completo en el anexo [E-9](#209--e-9--esquema-relacional-de-la-base-sqlite). Tres decisiones de esquema que la solución debe sostener **[E]**:

1. La dirección IP se guarda en `reservas_ip`, no sólo dentro del JSON de red, porque es el único dato que se consulta **entre proyectos** para detectar conflictos y necesita ser una columna indexada. La clave única por `(servicio_id, numero_replica)` permite escalar un servicio macvlan dando una dirección por réplica.
2. `despliegues` no se borra nunca: es el historial que alimenta la línea de tiempo del panel de servicio, con la política de retención de DA-07.
3. Un único administrador no significa "sin auditoría": `eventos_auditoria` es lo que permite entender qué disparó un despliegue cuando lo hizo un workflow y no una persona.

Los campos de configuración de baja cardinalidad viajan como JSON en columnas `TEXT`, que en SQLite es idiomático y permite consultarlos con `json_extract` si hiciera falta **[E]**.

Convención de nombres que atraviesa las tres representaciones **[E]**: `snake_case` en la base de datos, `camelCase` en el JSON de la API, `PascalCase` en las entidades de C#.

### §17.P.5 Seguridad y autenticación

| Aspecto | Definición **[E]** |
|---|---|
| Interfaz web | Cookie de ASP.NET Core Identity: `HttpOnly`, `Secure`, `SameSite=Strict`. Sin token en el navegador |
| API para automatismos | Encabezado `Authorization: Bearer <token>` |
| Formato del token de API | JWT firmado con clave simétrica de la instancia (HS256). Se almacena el hash del token, nunca el token. Se muestra al usuario una única vez. Carga útil de ejemplo en el anexo [E-12](#2012--e-12--carga-útil-de-un-token-de-api-emitido) |
| Ámbitos | `proyectos:leer`, `proyectos:escribir`, `despliegues:ejecutar`, `catalogo:leer`, `catalogo:escribir`, `sistema:leer` |
| Vigencia | Configurable por token; por defecto 90 días, con la opción "sin vencimiento" desaconsejada en la interfaz |
| Revocación | Inmediata, contrastando el identificador del token (`jti`) contra la tabla de tokens, que marca la fecha de revocación |
| Clave de firma y clave de la instancia | Generadas en el primer arranque. Fuera del repositorio y fuera de la imagen: variable de entorno o archivo montado |
| Cifrado en reposo | Los tokens de GitHub y las credenciales de registros privados se guardan cifrados con la clave de la instancia. Nunca se devuelven en claro por la API ni por la interfaz |
| Auditoría | Toda operación de escritura registra el actor: `admin` o `token:<prefijo>` |
| Contraseña del administrador | Almacenada con una función de derivación de clave, nunca en claro ni con un resumen simple |
| Segundo factor | Fuera del primer alcance; la elección de Identity no lo bloquea |
| ROPC | **Descartado.** La práctica recomendada vigente del IETF (RFC 9700, BCP 240, §2.4) dice textualmente *"The resource owner password credentials grant MUST NOT be used"*, OAuth 2.1 lo elimina del estándar y Microsoft lo desaconseja explícitamente. Además, la interfaz web no lo necesita: su sesión vive en el circuito **[E]** |
| Enmascarado en la adopción | **[D], D-2 del 2026-07-28.** La heurística por nombre —las variables cuyo nombre contiene `PASSWORD`, `TOKEN`, `SECRET`, `KEY` o `PAT`— **sugiere, no decide**: premarca esas variables como secretas en el paso de clasificación. La adopción no se completa sin ese paso, en el que el usuario ve todas las variables importadas y puede marcar o desmarcar cualquiera (RN-29). Lo que el usuario confirma como secreto se persiste cifrado con la clave de la instancia, se muestra enmascarado y requiere recarga manual; lo que no, se persiste como valor literal |
| Cifrado de las variables compartidas del proyecto | **[D], D-5 del 2026-07-28.** Una variable compartida marcada como secreta recibe exactamente el mismo tratamiento que cualquier otra variable secreta: cifrada en reposo con la clave de la instancia, nunca devuelta en claro por la API ni por la interfaz, y nunca escrita en una exportación (RN-15) |
| Resolución de referencias | **[D], D-6, segunda pasada del 2026-07-28.** La resolución de una referencia `${{ … }}` ocurre en el adaptador, **inmediatamente antes de crear el contenedor** (RN-24). Si la variable referenciada es secreta, la variable que la referencia se trata como secreta a todos los efectos (RN-23): el valor en claro existe sólo en memoria, entre el descifrado y la llamada de creación al motor, y no se persiste ni se registra en auditoría |
| Exportación | Ningún secreto se escribe en una exportación: viaja como referencia a variable, con el archivo de variables vacío **[E]** |
| Socket del motor | Su acceso equivale a control total del host. Las salvaguardas de aislamiento son obligatorias: prefijo de nombre reservado y configurable, distinto en desarrollo y en producción; etiquetas de pertenencia con identificador de proyecto y de servicio como fuente de verdad; rango de direcciones de desarrollo distinto del de producción y sin solapamiento; confirmación explícita escribiendo el nombre para adoptar o detener un contenedor sin etiquetas de la aplicación; y descubrimiento en modo sólo lectura, donde listar no habilita operar **[E]** |

**Reparto por capa** **[E]**. `Web` autentica y resuelve el actor. `Application` no autentica: recibe el actor ya resuelto (`admin` o `token:<prefijo>`) y lo propaga a la auditoría; su módulo de identidad y tokens implementa el ciclo de vida de los tokens de API —alta con ámbitos y vigencia, listado, revocación inmediata— y la regla de que sólo se persiste el hash y el valor se muestra una única vez. Sus secretos nunca viajan en claro en un DTO de salida: van enmascarados o como referencia a secreto. `Infrastructure` no autentica: implementa el almacén de Identity y la tabla de tokens que definen las capas superiores. `Domain` no autentica ni autoriza: modela el token de API con su nombre, prefijo, ámbitos, vigencia y estado de revocación, y el conjunto cerrado de ámbitos; la regla de mostrar el token una única vez y persistir sólo su hash es una invariante del modelo (RN-16), no una decisión de infraestructura.

Secretos en la documentación de proceso **[E]**: los informes de cierre de etapa (§15.1) transcriben completas las credenciales de ejemplo del entorno de desarrollo, porque quien prueba necesita poder entrar; pero nunca transcriben un secreto de producción ni la contraseña real elegida por el agente humano, y en su lugar indican dónde consultarla.

Secretos en CI/CD: ningún secreto entra al repositorio, ni claves de firma, ni tokens, ni credenciales de registros **[E]**. Los tokens de API que use un workflow se guardan como secretos del repositorio remoto y se emiten con el ámbito mínimo necesario, típicamente sólo `despliegues:ejecutar`.

Nota de seguridad transversal **[E]**: el servicio necesita acceso al socket del motor de contenedores, lo que equivale a control total del host. Por lo tanto no debe publicarse a internet sin una capa adicional de protección, y el proxy inverso está explícitamente fuera de alcance.

Compliance: no aplica normativa alguna (§10).

### §17.P.6 Estrategia de testing

**[S] S-02, confirmado el 2026-07-27**, en los umbrales numéricos; los niveles, los proyectos de prueba y el criterio de cierre son **[E]**.

**Los tres proyectos de prueba se conservan [D-i].** No son proyectos de código de la composición: viven bajo `/tests` y siguen la raíz de la identidad de código. Se conservan los tres, aunque ahora los tres referencien el mismo proyecto de producción, porque son la unidad que organiza la pirámide y la que alimenta los cuatro filtros de cobertura:

| Nivel | Proporción de la pirámide | Proyecto de prueba | Framework | Qué cubre |
|---|---|---|---|---|
| Unitarias de dominio | 100 % de la capa `Domain` | `SelfHosted.Service.Core.Domain.Tests` | xUnit | Invariantes del modelo (I1 a I10) y reglas de negocio (RN-01 a RN-37), **sin infraestructura** **[E]**, en particular la regla de conflicto de direcciones IP |
| Unitarias de aplicación y de frontera | 90 % de la capa `Application`, 15 % de `Infrastructure`, 20 % de `Web` | `SelfHosted.Service.Core.Application.Tests` | xUnit con dobles de prueba | Casos de uso con `IContenedorEngine` y repositorios simulados **[E]**; mapeos y traducciones puras de la frontera, sin salida real; casos de uso invocados desde la capa web |
| Integración | 85 % de `Infrastructure`, 60 % de `Web`, 10 % de `Application` | `SelfHosted.Service.Core.Integration.Tests` | xUnit más **Testcontainers** | Persistencia real contra SQLite y adaptador real contra el motor de contenedores **[E]**; endpoints de la API con persistencia real; los casos de uso cuyo comportamiento sólo se verifica contra un motor real, en particular la importación y exportación de Compose del anexo [E-21](#2021--e-21--correspondencia-entre-una-configuración-real-y-el-modelo-de-la-solución) |
| End-to-end | Guiones de demostración de cada etapa | — | Manual, ejecutado por el agente humano en el navegador | El flujo completo de usuario de la etapa, más los guiones acumulados de las etapas anteriores |

**Cobertura mínima, gate del CI. Los cuatro umbrales confirmados en S-02 se conservan y se miden por filtro de espacio de nombres [D-i]:**

| Espacio de nombres | Líneas | Ramas | Por qué ese umbral **[E]** |
|---|---|---|---|
| `SelfHosted.Service.Core.Domain` | 90 % | 85 % | Es el umbral más alto de la solución y está justificado: no hay código de frontera, no hay entrada ni salida, y cada regla de negocio está enunciada de forma verificable en las fuentes, con su momento de validación y su respuesta ante incumplimiento |
| `SelfHosted.Service.Core.Application` | 80 % | 70 % | Es la capa de mayor densidad de lógica de orquestación y se cubre con dobles de prueba, sin infraestructura; sólo el dominio lleva un umbral más alto |
| `SelfHosted.Service.Core.Web` | 60 % | 50 % | Umbral deliberadamente moderado para la capa de presentación, donde el componente Razor se valida por guion de demostración y no por prueba unitaria |
| `SelfHosted.Service.Core.Infrastructure` | 55 % | 45 % | Es la capa con mayor proporción de código de frontera, cuyo valor se verifica por prueba de integración contra el sistema real y no por cobertura de líneas |

**Por qué por filtro de espacio de nombres, y qué cambia [D-i].** Hasta la versión 2.1 los cuatro umbrales se medían por ensamblado, uno por proyecto de código. Con un único ensamblado, un solo número promediaría capas con exigencias deliberadamente distintas y haría que el dominio compensara a la infraestructura, que es exactamente lo que los cuatro umbrales evitan. El reporte de cobertura se emite entonces **filtrado por espacio de nombres**, capacidad estándar de la herramienta de cobertura de .NET, y el gate verifica los cuatro valores por separado. Ningún umbral confirmado en S-02 se modifica.

**Test de arquitectura, gate bloqueante [D-i].** Reemplaza a las tres garantías que la frontera de proyecto daba por compilación. Vive en `SelfHosted.Service.Core.Domain.Tests` y falla el pipeline si:

1. Algún tipo del espacio de nombres del cliente del motor de contenedores aparece fuera de `SelfHosted.Service.Core.Infrastructure.Contenedores` **[E]**, que es la regla de `Requerimientos-Tecnicos.md` §2.
2. `SelfHosted.Service.Core.Domain` referencia cualquier tipo de EF Core, del cliente del motor, de ASP.NET Core o de cualquier librería de terceros **[E]**.
3. `SelfHosted.Service.Core.Application` referencia cualquier tipo de EF Core, del cliente del motor o de ASP.NET Core **[E]**.
4. `SelfHosted.Service.Core.Domain` referencia a `…Web.Application`, a `…Web.Infrastructure` o a la capa de presentación; o `…Web.Application` referencia a `…Web.Infrastructure` o a la capa de presentación. Es la regla de dependencia de la Clean Architecture, que antes hacía cumplir el grafo de referencias entre proyectos.

**Cómo nombra el test a cada capa [D-i].** Las cuatro son un espacio de nombres exacto, con sus descendientes: `SelfHosted.Service.Core.Domain`, `.Application`, `.Infrastructure` y `.Web`. No hay enumeraciones ni definiciones por complemento, porque la disposición de carpetas de §16 le da a cada capa un segmento propio. **Excepción declarada:** `Program.cs`, en el espacio de nombres raíz `SelfHosted.Service.Core`, queda exento de la regla 4. Es la raíz de composición y su función es precisamente acoplar las capas al registrar las implementaciones en el contenedor de dependencias; aplicarle la regla de dependencia haría fallar el test sobre el único lugar donde ese acoplamiento es correcto.

**Tests de contrato** **[E]**. Cada abstracción de `Application/Abstracciones/` lleva su batería de pruebas de contrato, que la implementación de `Infrastructure` debe pasar. Es lo que sostiene la promesa de DA-02: si el cliente del motor cambia, la batería de contrato dice si el reemplazo es equivalente. La verificación de PT-02 —listar contenedores del host, crear, arrancar, detener y eliminar un contenedor de prueba desde código, construir una imagen desde un Dockerfile con contexto en el directorio de datos, y alcanzar por red el contenedor creado— se materializa como prueba de integración automatizada, no como comprobación manual **[E]**.

**Casos de prueba derivados de las configuraciones reales.** Los sesenta y cuatro casos del anexo [E-22](#2022--e-22--casos-de-prueba-derivados-de-las-configuraciones-reales) son el punto de partida de la batería: cada uno lleva su entrada concreta y su resultado esperado, y varios usan como dato de entrada las configuraciones reales del anexo [E-20](#2020--e-20--configuraciones-reales-de-contenedor-ofuscadas), de modo que las pruebas se escriben contra formas que ya se sabe que existen en un servidor real. Las treinta y siete reglas del anexo [E-16](#2016--e-16--catálogo-de-reglas-de-negocio-rn-01-a-rn-37) se traducen cada una en al menos una prueba **[E]**. Los casos T-05 a T-14, T-30, T-31 a T-33 y T-38 a T-63 corresponden a la capa de aplicación: validación de arranque, resolución de aristas, orden topológico, ida y vuelta con Compose, resolución de referencias de variable, clasificación de variables en la adopción, determinación del resultado del despliegue por contenedor e instanciación de un ítem del catálogo.

**Criterio de cierre de etapa [E]:** una etapa no se considera terminada sin pruebas automatizadas de las reglas de negocio que introdujo. Los guiones de demostración siguen siendo manuales, porque son la demostración al cliente, pero lo que protegen las pruebas no debe depender de ellos.

### §17.P.7 Estrategia de versionado y release

**[S] S-04, confirmado el 2026-07-27.** Las fuentes declaran el etiquetado por etapa cerrada y la actualización del `changelog.md` en la rama de la etapa **[E]**; el esquema de versión se propuso aquí y fue confirmado sin cambios.

- **SemVer 2.0.0 y Conventional Commits, sin excepciones.** La versión es única, que desde la versión 2.2 de este documento es además una propiedad estructural: hay un solo proyecto de código y un solo artefacto.
- Herramienta de cálculo de versión: derivada de los Conventional Commits desde la etiqueta anterior, en el pipeline. Mientras la solución no alcance su primera entrega completa, la versión permanece en `0.x`.
- Branching: una rama por etapa, creada desde la rama principal, fusionada por el agente humano tras el OK del punto de control, y borrada. No se abre la rama de una etapa antes de que se haya fusionado la anterior **[E]**.
- Canales: no hay canal de distribución pública. El artefacto es una imagen de contenedor para el servidor propio. No se publica ningún paquete.
- Cada etapa cerrada y fusionada recibe una **etiqueta** en el repositorio, para poder volver a cualquier demostración anterior **[E]**.
- Las migraciones de EF Core llevan su propia secuencia y **no se editan una vez fusionadas**: un cambio de esquema se corrige con una migración nueva **[D]**.

### §17.P.8 Pipeline CI/CD

Plataforma: GitHub Actions, con el runner autoalojado del propio servidor **[E]**.

| Stage | Quality gate |
|---|---|
| Restore y build | `scripts/build.sh` termina en 0 **y sin advertencias de compilación** **[E]**. Bloqueante |
| Test | `scripts/test.sh` pasa completo y la cobertura alcanza los **cuatro** mínimos por espacio de nombres de P.6. Bloqueante |
| Test de arquitectura | Las cuatro reglas de P.6 pasan. Bloqueante **[D-i]**. Reemplaza a la verificación por compilación que daba la frontera de proyecto |
| Socket del motor disponible en el runner | Las pruebas de integración usan Testcontainers y el adaptador real **[E]**. Bloqueante |
| Análisis de composición (SCA) | Ninguna vulnerabilidad conocida de severidad alta o crítica en las dependencias. Bloqueante |
| SBOM | Se genera y se adjunta al artefacto. No bloqueante |
| Verificación de secretos | Ningún secreto en el árbol de fuentes. Bloqueante **[E]** |
| Guiones de demostración anteriores | El agente IA verifica que todos los guiones de las etapas previas siguen pasando antes de preparar el pull request **[E]**. Bloqueante |
| Informe de cierre de la etapa | El informe de §15.1 está publicado en `Avances/`, con sus trece secciones y anotado en `Avances/README.md`, antes de convocar el punto de control **[E]**. Bloqueante |
| Construcción de la imagen | `Dockerfile` multietapa propio del pipeline de producción: una etapa con el SDK compila y publica, la imagen final lleva sólo el entorno de ejecución **[E]** |

Matriz de SO y runtime: única. Linux con .NET 10, porque el host de desarrollo es Linux, el devcontainer es Linux y el destino de producción es Linux **[E]**.

Ambientes: desarrollo dentro del devcontainer y producción como contenedor en el servidor. No hay ambientes intermedios de QA ni de staging: el punto de control de cada etapa cumple esa función, ejecutado sobre el entorno de desarrollo.

**Quality gate bloqueante para mergear [E]:** el pull request *es* el punto de control. No se fusiona sin el OK explícito del agente humano tras ejecutar el guion de demostración de la etapa, y la fusión la realiza el agente humano, no el agente IA.

Rollback: cada etapa cerrada tiene su etiqueta; volver a una demostración anterior es desplegar la imagen de esa etiqueta. Como el reemplazo de versión es *detener y arrancar*, el rollback tiene la misma ventana de indisponibilidad que el despliegue **[E]**.

### §17.P.9 Compatibilidad y plataformas target

| Plataforma | Versión mínima | Nota |
|---|---|---|
| Sistema operativo de ejecución | Linux Debian 13, kernel 6.12 **[E]** | El destino final es un contenedor Linux |
| Runtime | .NET 10 | Sin compatibilidad hacia atrás con runtimes anteriores |
| Motor de contenedores del host | Docker 26.x con `compose` v5 y `buildx` **[E]** | El cliente elegido declara soporte de la API del motor v29.4.1 **[E]** |
| SQLite | La versión embebida en el proveedor de EF Core de .NET 10, con WAL habilitado | |
| Formato de exportación | Docker Compose en la versión que corresponde a `compose` v5 **[E]** | |
| Navegador | Google Chrome de escritorio, canal estable. Versión mínima **150.0.7871.186** **[E]** | Única familia soportada. Toda otra familia —Firefox, Safari, Edge y derivados— se declara **no soportada**. El piso es la versión en uso del agente humano del proyecto al declarar la matriz; el canal estable se mantiene actualizado, de modo que el piso sube y nunca baja |
| Sistema operativo del cliente | Windows Server 2022, versión 21H2, build 20348.5256 **[E]** | Es la máquina desde la que el administrador opera el panel. **No es plataforma de ejecución ni de desarrollo**, que siguen siendo Linux exclusivamente |
| Red | Red local. El servicio no se publica a internet **[E]** | Es lo que reduce el riesgo de latencia del circuito SignalR y el costo de una caída del transporte a sondeo largo |

Toda combinación no listada se considera no soportada. En particular, no hay soporte para motores de contenedores distintos de Docker ni para bases de datos distintas de SQLite. No hay soporte declarado para Windows ni macOS como plataformas de ejecución, ni de desarrollo: no hay scripts `.bat` porque el host de desarrollo es Linux, el devcontainer es Linux y el destino es Linux **[E]**. La fila del sistema operativo del cliente no contradice eso: declara un **tercer eje de plataforma** —el del equipo desde el que se opera el panel— que hasta la versión 2.0 no estaba declarado, y que es el único de los tres que es Windows.

**Evidencia [E] de las dos filas de cliente.** Salida de `chrome://version` aportada por el agente humano del proyecto el 2026-07-28: Google Chrome 150.0.7871.186, build oficial de 64 bits, revisión `0fcdce5f4fdec8d442d7df760cb541f1ca6e446d`, V8 15.0.245.21, sobre Windows Server 2022 versión 21H2 build 20348.5256, con user-agent `Mozilla/5.0 (Windows NT 10.0; Win64; x64) … Chrome/150.0.0.0 Safari/537.36`.

**Por qué la fila de navegador pesa más que en una web común.** Blazor Interactive Server mantiene toda la interfaz en el servidor y el navegador es una pantalla conectada por un circuito permanente: cada clic, cada arrastre de un nodo del lienzo y cada tecla es un viaje de ida y vuelta. El navegador no afecta el aspecto, afecta si la aplicación funciona.

**Criterio verificable que se deriva**, para que los guiones de demostración no admitan dos ejecuciones con resultados distintos: cada guion se ejecuta sobre Chrome estable de versión igual o superior a la mínima declarada, y el número de versión concreto se registra en el informe de cierre de esa etapa (§15.1).

**Lo que la matriz no elimina.** Tres de los cinco componentes del riesgo analizados en §24.2 no los resuelve ni la red local ni la elección de familia, y siguen siendo materia de PT-01 y de `08-Calidad-Y-Pruebas`: la suspensión de la pestaña en segundo plano, las capacidades gráficas del motor de renderizado para el lienzo y la memoria del circuito en el servidor tras uso continuo. Se declaran como riesgos abiertos con su medición asignada, ya no como brecha de matriz.

### §17.P.10 Requerimientos no funcionales (NFR)

Los umbrales de PT-01 son **[E]**, declarados en `Requerimientos-Tecnicos.md` §9. El resto es **[S] S-03, confirmado el 2026-07-27**, salvo lo marcado.

**De la interfaz y del proceso:**

| Categoría | Métrica | Umbral | Origen |
|---|---|---|---|
| Fluidez del lienzo | Retraso perceptible entre el evento de puntero y la actualización visual, con 30 nodos y 40 aristas con insignia de estado y métricas por nodo, en red local | Sin retraso perceptible | PT-01 **[E]** |
| Fluidez bajo carga de estado | 30 nodos actualizando su estado cada 2 s, sin degradar el arrastre | Sin degradación | PT-01 **[E]** |
| Consumo del circuito | Memoria por circuito SignalR tras 15 minutos de uso continuo | Estable, sin crecimiento sostenido | PT-01 **[E]** |
| Escala de datos objetivo | Nodos por proyecto SelfHosted y contenedores en el parque | 10 a 30 nodos por lienzo; menos de 50 contenedores | Dimensionamiento **[E]** |
| Huella de memoria | Memoria residente del proceso en régimen | Cientos de MB, nunca GB | Perfil de capacidad **[E]** |
| Persistencia del layout | Escrituras durante un gesto de arrastre | Cero. Una única escritura al finalizar, con antirrebote de 400 ms | Regla de oro del lienzo **[E]** |
| Latencia de la API | Percentil 99 de los endpoints de lectura, sin operación sobre el motor | ≤ 300 ms **[S]** | Propuesto |
| Disponibilidad | SLO | No se declara SLO: el servicio se detiene y arranca con ventana de indisponibilidad aceptada, y no hay proxy inverso que permita solapamiento **[E]** | |
| Observabilidad | Qué se registra | Toda operación de escritura queda en auditoría con actor, acción, entidad, detalle y resultado | **[E]** |

**De la capa de aplicación:**

| Métrica | Umbral |
|---|---|
| Validación de conflicto de direcciones IP antes de arrancar un proyecto SelfHosted de hasta 30 servicios | ≤ 50 ms, sin acceso al motor de contenedores |
| Transaccionalidad de la validación de arranque | Entre validar y registrar la reserva activa no puede colarse otro arranque: validación y registro van en la misma transacción de escritura **[E]** |
| Serialización de despliegues | Las operaciones de despliegue se serializan por proyecto **[E]** |
| Determinismo | Ningún caso de uso lee el reloj del sistema directamente: lo hace por `IRelojSistema`, para que las pruebas sean reproducibles **[E]** |
| Observabilidad | Cada caso de uso de escritura emite su evento de auditoría con actor, acción, entidad y resultado **[E]** |

**De la capa de adaptadores:**

| Métrica | Umbral |
|---|---|
| Frecuencia de sondeo de métricas | Cada 3 a 5 s y sólo con vistas abiertas; ningún sondeo con vistas cerradas **[E]**. Un solo recolector publica a todos los circuitos conectados, no un flujo por pestaña **[E]** |
| Reconciliación de estado con el motor | Suscripción a eventos más reconciliación completa cada 30 s, traduciendo el estado del contenedor con la tabla del anexo [E-17](#2017--e-17--ciclo-de-vida-del-despliegue-y-correspondencia-con-el-motor) **[E]** |
| Costo de la reconciliación | Una pasada completa sobre un parque de 50 contenedores no debe superar 2 s ni saturar un núcleo |
| Consulta de conflicto de direcciones | Resuelta por índice sobre `reservas_ip` y sobre los despliegues activos **[E]** |
| Tiempo de espera de bloqueo de SQLite | Fijado explícitamente, no el valor por omisión **[E]** |
| Arranque en frío | Las migraciones se aplican solas sobre una base inexistente sin intervención manual **[E]** |
| Observabilidad | Todo error del adaptador del motor se traduce a un error propio con causa identificable, nunca se propaga el tipo del cliente **[E]** |

**De la capa de dominio:**

| Métrica | Umbral |
|---|---|
| Dependencias externas del espacio de nombres `Domain` | Cero, verificado por el test de arquitectura de P.6 **[D-i]** |
| Tiempo de la batería completa de pruebas de dominio | ≤ 5 s, para que corra en cada guardado sin fricción |
| Validación de conflicto de direcciones sobre 30 servicios | ≤ 10 ms, sin acceso a base de datos ni al motor |
| Determinismo | Ninguna entidad lee el reloj del sistema ni genera aleatoriedad: ambos llegan como parámetro **[E]** |
| Trazabilidad de las reglas | Cada regla RN-01 a RN-37 identificable en el código por su identificador **[D]** |

### §17.P.11 Decisiones técnicas pre-tomadas (pre-ADR)

| # | Decisión | Alternativas evaluadas | Justificación |
|---|---|---|---|
| DA-01 | Cookie de ASP.NET Core Identity para la interfaz web más tokens de API con ámbitos para automatismos. **ROPC descartado** | ROPC, `client_credentials` con JWT propio, endpoints de Identity (`MapIdentityApi`), servidor OIDC propio con OpenIddict | ROPC está prohibido por la práctica recomendada vigente y eliminado en OAuth 2.1; la interfaz no lo necesita porque su sesión vive en el circuito; el único consumidor que necesita token es automatizado, y para automatismos corresponde una credencial de máquina. OpenIddict es técnicamente apto pero desproporcionado para un solo usuario **[E]** |
| DA-02 | `Docker.DotNet.Enhanced` 4.3.3 como cliente del motor, detrás de `IContenedorEngine` | `Docker.DotNet` 3.125.15 | El cliente histórico no publica desde mayo de 2023; el fork lo mantiene el equipo de Testcontainers, publica para `net10.0` y declara soporte de la API del motor v29.4.1 **[E]** |
| DA-03 | Modo de red por defecto de un proyecto SelfHosted nuevo: **bridge** | macvlan por defecto | Aislado, con resolución de nombres y sin consumir dirección de la red local. macvlan queda como opción explícita por servicio **[E]** |
| DA-04 | El rango de direcciones gestionado es un bloque **fuera del rango que reparte el DHCP** de la red | Sin restricción | La configuración inicial debe advertirlo y el sistema debe validarlo **[E]** |
| DA-05 | El deshacer y rehacer se implementa **sobre el changeset**, no sobre la librería del lienzo | Ninguno; integrado en la librería | Descartar un cambio individual del changeset ya es la mitad del deshacer **[E]** |
| DA-07 | Retención del historial: últimos 50 despliegues por servicio y 90 días de auditoría, configurables | — | **[E]** |
| DA-08 | Respaldo por exportación programada de proyectos y catálogo a un destino externo | Copia del archivo de base de datos | El servidor no tiene redundancia de disco (RG-07); la exportación es además portable **[E]** |
| — | Controladores como estilo de la API, con minimal APIs admitidas sólo para sondeo de estado y métricas | Minimal APIs para todo | Ver P.2 |
| — | `Z.Blazor.Diagrams` como librería del lienzo, con `Excubo.Blazor.Diagrams` como segunda opción nativa y maxGraph envuelto con interoperabilidad de grano grueso como plan de contingencia | Excubo, Syncfusion, MindFusion, React Flow, maxGraph, JointJS, Drawflow, litegraph.js, Rete.js, jsPlumb | Es la única que combina licencia MIT, soporte declarado de Blazor Server sobre `net10.0` y cobertura funcional completa sin introducir una capa de interoperabilidad. Syncfusion y MindFusion se descartan por licencia comercial; React Flow y Rete.js por obligar a introducir un framework JavaScript completo **[E]** |
| — | El layout del lienzo se guarda junto al proyecto en una única columna JSON, no repartido en columnas por nodo, con la forma del anexo [E-1](#201--e-1--proyecto-con-layout-de-lienzo) | Una fila por nodo | Se lee y se escribe siempre completo, nunca se consulta por partes: una reorganización visual es una sola escritura **[E]** |
| — | Toda salida al mundo exterior pasa por una abstracción declarada en `Application/Abstracciones/` | Que la capa web hable directamente con la infraestructura | Es la condición que hace verificable la regla de aislamiento del cliente del motor **[E]** |
| — | El changeset es el mecanismo de edición transaccional del proyecto SelfHosted, y también el sustrato del deshacer y rehacer. Su forma y su informe de impacto están en el anexo [E-5](#205--e-5--changeset-de-cambios-pendientes-con-su-informe-de-impacto) | Guardado inmediato de cada cambio | Aporta revisión antes de aplicar, descarte granular y un único redespliegue en lugar de uno por clic **[E]** |
| — | Los cambios puramente visuales no entran al changeset y se guardan al instante | Que todo cambio entre al changeset | De lo contrario el usuario acumularía cambios pendientes por el mero hecho de ordenar el dibujo **[E]** |

**Decisiones del modelo de dominio:**

| Decisión | Alternativas | Justificación |
|---|---|---|
| Separación entre servicio (configuración) y despliegue (ejecución) | Una sola entidad con estado | El nodo del lienzo debe ser permanente y posicionable; el estado es volátil **[E]** |
| Una arista del lienzo representa que el servicio origen consume, vía variable de entorno, la dirección interna y el puerto del servicio destino, con la resolución del host que declara el anexo [E-4](#204--e-4--enlace-del-lienzo-y-su-variable-generada) **[E]**. **Ampliación [D-i]:** ese enunciado describe hoy un caso de arista y no su definición. Una arista representa que el origen depende del destino, y lo que aporta cada eje se decide por separado: **referenciar el host** exige canal alcanzable (RN-04) y **declarar espera** ordena el arranque (RN-14). Referenciar no arrastra el orden y esperar no arrastra el canal. El puerto ya no se referencia: se escribe literal y la arista lo registra (D-9, D-10) | Que la arista represente conectividad de red | La conectividad de red es implícita: los servicios de un proyecto SelfHosted comparten red y no hace falta dibujarla. Modelar mal esta abstracción es el mayor riesgo identificado del modelo **[E]**. La ampliación no contradice la transcripción: la extiende, igual que RN-04, RN-05 y RN-14 declaran la suya |
| **Un único mecanismo de vínculo**: no hay dos clases de arista, hay una sola entidad. Casi toda arista nace de una **referencia de variable** —y el enlace que el usuario traza en el lienzo es **azúcar de interfaz** que escribe esa referencia a las variables provistas del destino—, y desde D-11 una arista también puede existir **sin variable**, cuando su única razón de ser es la espera que declara. En los dos casos es la misma entidad, sin discriminador de tipo **[D], D-6 segunda pasada, ampliado por D-11 en la tercera** | Dos entidades distintas, una de enlaces y otra de referencias; o una sola entidad con un discriminador `tipo`, que es lo que declaraba la primera especificación de D-6 | Es el modelo de la plataforma de referencia, donde conviven dos clases de vínculo entre servicios y **sólo una es explícita**: la red privada es automática y la referencia de variable es la única que genera la relación que el lienzo dibuja (`Analisis-Rayway.md` §3.5 **[E]** respecto de ese documento). Lo que hacía falta para que un solo mecanismo alcanzara eran las **variables provistas por el sistema**: en la fuente, `${{ backend.RAILWAY_PUBLIC_DOMAIN }}` funciona sin que nadie declare esa variable en el destino, porque la plataforma la provee. Con el host provisto como variable —y el puerto, que la tercera pasada pasó a escribir literal—, el enlace de host y puerto deja de necesitar existir como cosa aparte, y con él desaparecen el discriminador, la sintaxis `{destino.host}` y dos columnas de la tabla de enlaces |
| El **subgrafo de las aristas que declaran espera** define tanto la detección de ciclos de arranque como el orden topológico; los ciclos de **valor** los cubre RN-22 sobre el grafo completo de referencias, que es otra cosa **[D], D-11 tercera pasada** | Deducir el orden de qué variable se referencia, que es lo que declaraba la segunda pasada; u ordenar por toda arista | La deducción **falla en los dos sentidos**: un servicio que referencia el host de otro pero reintenta la conexión no necesita esperar, y el sistema lo obligaba; uno que no referencia nada del otro porque la cadena vive en una variable compartida sí necesita que esté arriba, y el sistema no lo sabía. Qué variable se referencia no dice si hay que esperar. Ordenar por toda arista, en cambio, rechaza configuraciones legítimas: dos servicios que se toman un dato mutuamente producirían un ciclo de arranque inexistente. La propiedad declarada es lo único que expresa las cuatro combinaciones de esperar y referenciar el host, que son todas alcanzables (anexo [E-4](#204--e-4--enlace-del-lienzo-y-su-variable-generada), punto 4) |
| Si cambia la dirección o el puerto del destino, los servicios origen de sus aristas entrantes quedan marcados como "requieren redespliegue" **[E]**. **Acotación [D-i]:** alcanza a las aristas que **referencian el host** del destino, y a las que **registran su puerto** en `puerto_destino`, que son las que consumen uno u otro dato. Una arista que sólo referencia una variable de configuración no consume ninguno de los dos y no se marca por ese cambio; se marca por el suyo, según la fila siguiente | Propagación manual; o marcar toda arista entrante ante cualquier cambio del destino | Es la única forma de que el valor referenciado no quede obsoleto en silencio **[E]**. Marcar también las que no consumen dirección ni puerto provocaría redespliegues de servicios cuyo valor no cambió, que es el ruido que RN-13 evita. Registrar el puerto en la arista (D-10) es lo que permite acotarlo con precisión, en lugar de buscar el número por texto |
| **Extensión de la regla anterior a las referencias [D], D-6 del 2026-07-28:** si cambia el **valor referenciado** —el de una variable de otro servicio o el de una variable compartida del proyecto—, todo servicio que lo referencie queda marcado como "requiere redespliegue", exactamente igual que ante un cambio de dirección o de puerto | Resolver la referencia en cada lectura, sin marcar nada | La referencia se resuelve antes de crear el contenedor, de modo que un contenedor ya creado conserva el valor viejo: sin el marcado, el valor quedaría obsoleto en silencio, que es el mismo defecto que la regla original evita. Para las referencias a otro servicio el marcado se deduce de las aristas entrantes, que ya existen; para las referencias a una variable compartida del proyecto no hay arista —el proyecto no es un nodo del lienzo— y el marcado se resuelve por la enumeración indexada de las variables con referencia y el parseo de sus ocurrencias que declara el anexo [E-9](#209--e-9--esquema-relacional-de-la-base-sqlite) |
| **Las relaciones entre objetos se establecen por identidad y nunca por nombre.** Es objeto lo que se referencia, lo que sobrevive al objeto que lo contiene o lo que tiene ciclo de vida propio; lo demás es atributo. El secreto y la red del proyecto pasan a ser objetos; los recursos, el healthcheck, los montajes y el layout siguen siendo atributos **[D], D-12 quinta pasada** | Vincular por nombre, que es lo que el modelo hacía a medias: D-8 vinculó el servicio y dejó la clave de la variable como texto | Vincular por nombre hace que renombrar rompa en silencio, que es el defecto que D-8 corrigió un nivel arriba sin bajar al siguiente. La prueba de tres condiciones existe para que el principio no degenere en «una tabla para todo»: sin ella, cada atributo sería candidato a entidad. El principio además **disuelve** los dos conflictos de instanciación que §19 registraba como pendientes, en lugar de resolverlos con una regla más. **El modelo lógico de los dos objetos nuevos y su mapeo relacional son materia de la Fase C**, no de este intake |
| El modelo soporta los dos modos de red por servicio, `bridge` y `macvlan` | Sólo macvlan, como sugería el enunciado original | El parque real ya usa los dos **[E]** |

**Queda abierto para el Sprint 0 [E]:**

- DA-06, el manejo del gesto de arrastre. Se resuelve **midiendo** en PT-01: se implementa la mitigación M1 (arrastre en JavaScript, notificación a C# sólo al soltar) únicamente si la medición lo exige.
- La forma concreta del contrato de `IContenedorEngine` —operaciones, tipos y modelo de errores—, que se fija al implementar la puerta técnica PT-02 **[D]**.
- El destino concreto del respaldo externo (DA-08) y los límites reales de concurrencia de SQLite con tres escritores lógicos, cuya mitigación propuesta —WAL y serialización por proyecto— no fue probada en este contexto.

**IC-05, cerrado el 2026-07-28 (D-3) [D].** El análisis había registrado como supuesto que la frase cortada de la definición de idea se refería a verificar que un contenedor no estuviera ya adoptado por otro proyecto, formalizado en la invariante I10. El agente humano del proyecto **confirmó el resultado y aportó el fundamento completo, que el intake no declaraba**:

- En el caso normal **no hay forma de que un servicio esté en dos proyectos**, porque los servicios se dan de alta **desde cero** al construir el proyecto: un alta produce un servicio nuevo, que nace perteneciendo al proyecto en el que se lo creó, y nada del flujo de alta permite tomar un servicio existente de otro proyecto.
- El **único camino** por el que la situación podría producirse es la **adopción**, que es la operación que incorpora al modelo algo que ya existía fuera de él.
- Y en ese único camino lo impide el **filtro del descubrimiento**: RN-11 hace cumplir I10 dejando el contenedor ya adoptado deshabilitado en el listado de candidatos, con el nombre del proyecto que lo tomó (regla RA-01 del anexo [E-7](#207--e-7--descubrimiento-de-contenedores-adoptables), caso de prueba T-15).

Ni I10 ni RN-11 cambian: ya eran correctas. Lo que se incorpora es el fundamento, que es lo que faltaba para que `02-Especificacion-Funcional` pueda justificar la invariante en lugar de sólo enunciarla. IC-05 deja de figurar entre las pendientes de §19 y entre los marcadores `[S]` sin número.

### §17.P.12 Restricciones técnicas y trade-offs aceptados

| A qué se renuncia | Qué se gana | Consecuencia asumida |
|---|---|---|
| **Fronteras de compilación entre capas** **[D], 2026-07-29** | Una sola unidad de compilación para un producto que se despliega entero y de una sola vez, sin arrastrar a la documentación cuatro componentes publicables que no existen | La regla de aislamiento del cliente del motor, la ausencia de dependencias en el dominio y la regla de dependencia entre capas pasan de error de compilación a test de arquitectura del pipeline (P.6). La violación se detecta más tarde, aunque igual antes de fusionar |
| Interactividad del lado del cliente (WebAssembly) | Un único modelo de renderizado, todo el código en C# del lado del servidor, sin duplicar lógica ni exponer el acceso al motor | Cada interacción es un viaje al servidor **[E]**; el lienzo depende de la latencia de red local y de PT-01 |
| Despliegue sin interrupción | No administrar proxies inversos, que están fuera de alcance | El reemplazo de versión es *detener y arrancar*, con ventana de indisponibilidad que la interfaz debe advertir |
| Escalabilidad horizontal del propio administrador | Simplicidad de un monolito y de SQLite | Una sola instancia. Dos instancias sobre el mismo archivo de base de datos no están soportadas |
| Deshacer y rehacer integrados en la librería del lienzo | Cobertura funcional y comunidad de `Z.Blazor.Diagrams` | Hay que implementarlos sobre el changeset **[E]** |
| Registro de la construcción de imágenes en tiempo real sin límite | Un servidor de gama modesta que no debe saturarse | Sondeo moderado y por lotes, con antirrebote |
| Acceso directo a EF Core desde los casos de uso | Pruebas unitarias sin base de datos y libertad de cambiar el motor | Hay que declarar y mantener las abstracciones de repositorio, con su costo de indirección |
| Tipos del cliente de Docker en las firmas | Cambiar de cliente confinado a un adaptador | Hay que mapear los tipos del motor a tipos propios en la frontera |
| Un motor de base de datos con escrituras concurrentes | Cero administración, archivo único, respaldo trivial | Escritor único y serialización de las escrituras en segundo plano **[E]** |
| Monitoreo por peticiones HTTP contra los servicios | Un único origen de verdad del estado, válido también para macvlan | El estado se lee del motor: estado del contenedor, verificación de salud declarada en la imagen y estadísticas **[E]** |
| Traducción de rutas entre host y contenedor | Un adaptador simple y predecible | El directorio de datos debe estar montado en la misma ruta absoluta en el host y en el devcontainer, y también en producción **[E]** |
| Fidelidad completa en la ida y vuelta con Compose | Portabilidad real del proyecto SelfHosted | Compose no representa el layout del lienzo ni el changeset: el layout se preserva en un manifiesto propio y el changeset no se exporta **[E]** |
| Atributos y convenciones de persistencia en las entidades | Un dominio que no depende de EF Core | La correspondencia con el esquema se declara por configuración en `Infrastructure`, y hay que mantenerla |
| Escalado horizontal y direcciones IP fijas simultáneos | Un modelo de red fiel a lo que el motor permite | Son incompatibles: dos réplicas no pueden compartir dirección. El modelo admite una dirección por réplica, y la interfaz debe pedirlas explícitamente en lugar de fallar en el arranque **[E]** |
| Publicación de puertos en modo macvlan | Coherencia con el motor | El contenedor tiene dirección propia y la publicación no aplica: el formulario debe deshabilitar el campo, no sólo ignorarlo **[E]** |

Restricciones del ecosistema que el proyecto de código no puede eludir **[E]**: el SDK de .NET no existe en el host y no se va a instalar, de modo que todo comando de todo guion corre dentro del devcontainer; los scripts asumen `dotnet` en el `PATH` y no detectan el entorno ni ramifican por plataforma; la orquestación del entorno de desarrollo es declarativa en `devcontainer.json` y ningún script hace `docker run` a mano para levantarlo; la depuración va por `.vscode/launch.json` y F5, por un camino separado del de los scripts; y la imagen del devcontainer no define, ni deriva, ni condiciona la de producción.

Cargas que no soporta: tráfico de usuarios concurrentes (hay uno solo), exposición a internet, federación de identidad, dos instancias de la aplicación sobre el mismo archivo de base de datos, y motores de contenedores remotos accedidos por TCP.

---

## §18 Estrategia de demo / samples

Los samples de esta solución tienen un destinatario particular: no hay integradores externos, de modo que su función es sostener las demostraciones de las etapas y las puertas técnicas, que son el mecanismo de aceptación declarado. Cada uno es autocontenido, se ejecuta desde los scripts dentro del devcontainer y se reproduce en cinco pasos o menos.

| # | Sample | Capa que ilustra | Complejidad | Vínculo con `/src` |
|---|---|---|---|---|
| SM-01 | Prueba de concepto del lienzo: 30 nodos y 40 aristas con insignia de estado y métricas por nodo, actualizando cada 2 s | `Web` | Media | Es la materialización de la puerta técnica **PT-01** **[E]**. Usa el componente de nodo real de `Components/Canvas/`, no una maqueta aparte, para que la medición valga |
| SM-02 | Verificación del motor de contenedores desde el devcontainer: listar, crear, arrancar, detener y eliminar un contenedor de prueba, construir una imagen desde un Dockerfile con contexto en el directorio de datos y alcanzarlo por red | `Infrastructure` | Media | Es la materialización de la puerta técnica **PT-02** **[E]**, y ejercita el adaptador real de `Infrastructure/Contenedores/` |
| SM-03 | Juego de datos de siembra que reproduce el parque de referencia del anexo [E-19](#2019--e-19--parque-de-contenedores-de-referencia), materializado con las seis configuraciones reales ofuscadas del anexo [E-20](#2020--e-20--configuraciones-reales-de-contenedor-ofuscadas): proyectos con servicios en bridge y en macvlan, con sus direcciones, montajes, dispositivos y capacidades | `Web` | Baja | Puebla la base del anexo [E-9](#209--e-9--esquema-relacional-de-la-base-sqlite) para poder recorrer el lienzo y el dashboard sin configurar nada a mano. Es también el fixture base que declara el anexo [E-22](#2022--e-22--casos-de-prueba-derivados-de-las-configuraciones-reales) |
| SM-04 | Consumo de los casos de uso con una implementación de prueba de `IContenedorEngine`, sin motor real | `Application` | Baja | Demuestra que la capa de aplicación es ejercitable sin infraestructura, que es la premisa de su cobertura del 80 % |
| SM-05 | Resolución de un conflicto de direcciones IP de extremo a extremo, con sus tres resoluciones posibles | `Domain` | Baja | Ejercita la regla más específica del alcance, transcripta en el anexo [E-8](#208--e-8--reserva-de-direcciones-ip-e-informe-de-conflicto) |
| SM-06 | Ida y vuelta con Docker Compose: importar una de las configuraciones reales del anexo [E-20](#2020--e-20--configuraciones-reales-de-contenedor-ofuscadas), representarla en el modelo y volver a exportarla con el archivo de variables vacío y el manifiesto propio del layout | `Infrastructure` | Media | Demuestra la portabilidad del anexo [E-14](#2014--e-14--exportación-de-un-proyecto-a-docker-compose), las reglas de traducción del anexo [E-21](#2021--e-21--correspondencia-entre-una-configuración-real-y-el-modelo-de-la-solución) y la regla de que ningún secreto se exporta |
| SM-07 | Despliegue disparado por un workflow, con token de ámbito mínimo | `Web` | Baja | Demuestra el contrato del anexo [E-13](#2013--e-13--contrato-del-endpoint-de-despliegue) y cierra la discusión de autenticación con evidencia funcionando **[E]** |

**Punto de extensión principal.** El punto de extensión de la solución es el adaptador del motor de contenedores detrás de `IContenedorEngine`: es lo que permite cambiar de cliente sin tocar el resto **[E]**. SM-02 y SM-04 lo demuestran desde los dos lados, con motor real y con implementación de prueba.

---

# Parte D — Anexos de datos

Las fuentes de este intake aportan ejemplos de instancia completos, de modo que esta parte es obligatoria. El cuerpo los cita por identificador; aquí se reproducen enteros, sin recortes, para que el orquestador no dependa de resolver una referencia a un archivo externo.

Procedencia común de los anexos E-1 a E-19: `SelfHosted.Service.Core.Documentos/PROMPTs/02-Ejecutar-Prompt-Integrador-Documento-Intake/INPUTs/Analisis-Final-Integrado.md`, con el rango de líneas indicado en cada uno. Todos son de estado **propuesto**: son modelos de diseño de ese análisis, construidos para cubrir los requisitos declarados y los patrones observados en el parque real, no mediciones de un sistema en funcionamiento. Los valores de dirección IP, nombres de imagen y rutas están ofuscados en origen según la política del análisis, conservando estructura y topología.

**Normalización adicional aplicada sobre la fuente.** En tres anexos derivados del análisis (E-7, E-11 y E-19) la ofuscación de origen había quedado incompleta: normalizaba el nombre del contenedor pero conservaba el nombre del proyecto de despliegue y la ruta de datos, que juntos identifican el servicio real. Se completó la normalización en este intake. Es una divergencia deliberada respecto de la transcripción literal, y se declara acá porque la regla de autocontención exige saber en qué difiere el anexo de su fuente.

Los anexos E-20 a E-22 tienen otra procedencia y otro estado: provienen de configuraciones de despliegue **reales y en funcionamiento** en el servidor de referencia, y su estructura es por lo tanto **verificada**. Se les aplicó la misma política de ofuscación, declarada en detalle al inicio de E-20, con un criterio más estricto en un punto: **ningún secreto real se transcribe, en ninguna forma**. Este documento es público y su contenido debe poder leerse sin que exponga al servidor del que se derivó.

**Formato de esta parte, normalizado en la versión 2.0.** La plantilla 1.4 exige que cada escenario declare cuatro bloques —contexto, qué ejercita, la carga completa y qué verificar— y que su `Estado` pertenezca a un enum cerrado. Los veintidós anexos se emitían con tres piezas: procedencia, estado y carga, con el contexto y la verificación repartidos en la prosa que rodea a cada carga. La normalización **no reescribió ninguna carga ni ninguna afirmación**: agregó los bloques que faltaban y explicitó lo que ya estaba disperso.

Los cuatro bloques se emiten **contiguos, al encabezado de cada anexo**, y no intercalados alrededor de cada carga. El motivo es que varios anexos contienen más de una carga —E-2 tiene cuatro variantes de origen, E-8 tiene cuatro cargas, E-20 tiene seis casos con sus archivos— y un bloque de verificación colocado al final quedaría ambiguo respecto de a cuál de ellas se refiere. La divergencia respecto del orden que la plantilla ilustra se declara acá para que no se lea como omisión: las cuatro piezas están, y el bloque **Qué verificar** cubre el anexo entero, carga por carga cuando hay más de una.

**Conversión del `Estado` al enum cerrado.** El enum de la plantilla 1.4 es `medido`, `declarado`, `derivado` y `reconstruido`. Los estados anteriores —«propuesto» y «verificado»— se traducen así, sin cambiar lo que cada anexo afirma sobre su propio origen:

| Estado anterior | Anexos | Estado en el enum | Por qué |
|---|---|---|---|
| propuesto | E-1 a E-18 | `declarado` | Son modelos de diseño que el análisis integrado afirma con autoridad sobre el diseño, sin medición que los respalde. Es exactamente lo que el enum llama declarado |
| propuesto, normalizado y ofuscado en origen | E-19 | `medido` | Es el inventario del parque real del servidor de referencia, con su relevamiento fechado. La ofuscación cambia los nombres y las direcciones, no la condición de observación |
| verificado | E-20 | `medido` | Son configuraciones que corren hoy, relevadas y sincronizadas con su estado real el 2026-07-18 |
| propuesto, derivado de otro anexo | E-21, E-22 | `derivado` | E-21 se calcula del caso C-3 de E-20 y del modelo de servicio de E-2; E-22 se calcula del catálogo de reglas de E-16, de los casos de E-20 y del rango gestionado de E-8. La regla de cálculo está declarada en cada uno |

**Qué es `reconstruido` dentro de estos anexos.** Ningún anexo es reconstruido en su conjunto, pero **todos los valores de instancia de E-1 a E-18 lo son**: los identificadores numéricos —`proyectoId: 12`, `servicioId: 101`, `enlaceId: 9002`, `changesetId: 331`, `despliegueId: 5471`—, las marcas de tiempo, las direcciones IP concretas y los nombres de servicio de ejemplo son valores sintéticos que existen para que la fixture sea ejecutable y para que los anexos se citen entre sí de forma coherente. Se declara acá, una vez y para todos, en lugar de marcarlos dentro de cada carga: **ninguno de esos valores es una medición y ninguno debe presentarse como tal**. Los valores de capacidad, límites, políticas de reinicio, modos de red y patrones de montaje de E-19 y E-20 sí provienen del sistema real, y ésa es la diferencia que la columna de estado registra.

## §20 Anexo A — Escenarios con ejemplos completos

### §20.1 · E-1 · Proyecto con layout de lienzo

Citado desde §17.3 P.4 y §17.4 P.2. Es un **proyecto SelfHosted**: lo que el usuario crea desde el portal, con sus servicios, su red y su lienzo. Procedencia: `Analisis-Final-Integrado.md`, líneas 522–557, ampliado el 2026-07-28 con las variables compartidas del proyecto (D-5) y con el discriminador de origen de la arista (D-6). Estado: `declarado`.

**Contexto.** Un proyecto SelfHosted ya declarado y operando: cuatro servicios, red bridge propia, disposición del lienzo guardada, dos variables compartidas —una secreta— y un changeset pendiente de aplicar. Es el proyecto 12, que el resto de los anexos cita como estado de partida común, y representa el momento más frecuente de la vida del sistema: el administrador abre un conjunto de servicios que ya existe y lee su arquitectura.

**Qué ejercita.** La entidad proyecto con su red, su disposición y su estado agregado; las variables compartidas del proyecto (D-5), incluida una secreta con `valor` en `null`; las aristas en sus dos formas, la que nace de una referencia y la 9006, que existe sólo por la espera que declara (D-11); la persistencia de `esperaDestino` y de `puertoDestino` frente a la deducción de `referenciaElHost`; el estado `parcialmente-activo`, que es el que deja un despliegue parcial legítimo (RN-31); y la coherencia entre `cambiosPendientes` y el changeset 331 del anexo [E-5](#205--e-5--changeset-de-cambios-pendientes-con-su-informe-de-impacto), que obliga a leer los valores de este anexo como los **aplicados** y no como los del borrador.

**Qué verificar.** Que una referencia a una variable compartida no dibuje ninguna arista, porque el proyecto no es un nodo del lienzo. Que el lienzo dibuje una arista visual por par de servicios y agrupe debajo las referencias que la sostienen, mientras el modelo las guarda por separado. Que la arista 9006, sin variable y con espera declarada, se persista, aparezca en el lienzo y participe del orden de arranque (RN-34, RN-14, T-56). Que la variable compartida secreta no devuelva valor en claro por ninguna vía (RN-15). Que el estado del proyecto se derive de los despliegues por contenedor y no de un estado propio de la operación (RN-31, anexo [E-3](#203--e-3--despliegue-con-su-línea-de-tiempo-de-eventos-y-sus-métricas)).

```json
{
  "id": 12,
  "nombre": "Portal Interno",
  "slug": "portal-interno",
  "descripcion": "Sitio web interno con su base de datos y su cache",
  "autoArranque": true,
  "estado": "parcialmente-activo",
  "creadoEn": "2026-07-26T10:15:00-03:00",
  "red": {
    "modo": "bridge",
    "nombre": "portal-interno-net",
    "subred": "172.20.0.0/24",
    "gateway": "172.20.0.1",
    "creadaPorElServicio": true
  },
  "variablesCompartidas": [
    { "id": 701, "clave": "TZ", "valor": "America/Argentina/Buenos_Aires", "secreta": false, "descripcion": "Zona horaria comun a los tres servicios" },
    { "id": 702, "clave": "DB_PASSWORD", "valor": null, "secreta": true, "referenciaSecreto": "sec-011", "descripcion": "Credencial de la base, compartida por api y db" }
  ],
  "canvas": {
    "version": 1,
    "zoom": 0.9,
    "pan": { "x": -120, "y": 40 },
    "nodos": [
      { "servicioId": 101, "x": 160, "y": 120, "ancho": 260, "alto": 132, "grupo": null },
      { "servicioId": 102, "x": 560, "y": 120, "ancho": 260, "alto": 132, "grupo": null },
      { "servicioId": 103, "x": 560, "y": 320, "ancho": 260, "alto": 132, "grupo": "datos" }
    ],
    "grupos": [
      { "id": "datos", "titulo": "Persistencia", "color": "#7E57C2" }
    ],
    "enlaces": [
      { "id": 9001, "origen": 101, "destino": 102, "claveVariable": "REDIS_URL", "claveDestino": "SELFHOSTED_HOST", "puertoDestino": 6379, "esperaDestino": true },
      { "id": 9002, "origen": 101, "destino": 103, "claveVariable": "ConnectionStrings__Default", "claveDestino": "SELFHOSTED_HOST", "puertoDestino": 5432, "esperaDestino": true },
      { "id": 9003, "origen": 101, "destino": 103, "claveVariable": "DB_USER", "claveDestino": "POSTGRES_USER", "puertoDestino": null, "esperaDestino": false },
      { "id": 9006, "origen": 102, "destino": 103, "claveVariable": null, "claveDestino": null, "puertoDestino": null, "esperaDestino": true }
    ]
  },
  "servicios": [101, 102, 103],
  "cambiosPendientes": 4
}
```

Qué hay que entender del ejemplo, en lo incorporado el 2026-07-28 **[D]**:

- Las **variables compartidas** cuelgan del proyecto, no de un servicio, y valen para cualquiera de sus servicios (D-5). `DB_PASSWORD` es el caso típico: la credencial que hoy hay que escribir y mantener sincronizada en `api` y en `db`. Al ser secreta recibe el mismo tratamiento que cualquier otra: `valor` en `null`, referencia a secreto, cifrada en reposo y nunca devuelta en claro (RN-15).
- El proyecto **no es un nodo del lienzo**, de modo que una referencia a una variable compartida no dibuja ninguna arista. Sólo las referencias a otro servicio lo hacen.
- `cambiosPendientes` vale 4 y no 0: son los cuatro cambios del changeset 331 del anexo [E-5](#205--e-5--changeset-de-cambios-pendientes-con-su-informe-de-impacto), que está en estado `pendiente` sobre este mismo proyecto. Los valores que muestra este anexo son los **aplicados**, no los del borrador.
- **Casi todas las aristas nacen de una referencia**, y ninguna lleva discriminador de tipo: el enlace que el usuario traza en el lienzo es azúcar que escribe la referencia a las variables provistas del destino (E-4). Entre 101 y 103 hay dos filas —9002 sostiene `ConnectionStrings__Default` y 9003 sostiene `DB_USER`—, y entre 101 y 102 una, la de `REDIS_URL`. El **lienzo dibuja una arista visual por par de servicios**, agrupando debajo las referencias que la sostienen.
- **La 9006 es una arista sin variable**, admitida desde la tercera pasada (D-11): `cache` no referencia ninguna variable de `db`, pero precarga su contenido desde la base al arrancar y por eso declara que la espera. Es lo que significa un `depends_on` de Compose y lo que hace que el arranque administrado del proyecto pueda expresar una dependencia que no pasa por una variable.
- **`esperaDestino` se persiste, `puertoDestino` también, y `referenciaElHost` se deduce.** La espera es la propiedad declarada de D-11 y define el grafo de arranque; el puerto es el registro de dependencia de D-10 y no participa de la resolución, porque la expresión ya lo lleva literal. Las que apuntan a `SELFHOSTED_HOST` exigen canal alcanzable (RN-04); la 9003, que apunta a una variable declarada de `db`, dibuja arista y marca redespliegue pero ni ordena ni exige canal.

### §20.2 · E-2 · Servicio, con sus tres variantes de origen

Citado desde §4 (F-03), §17.4 P.2 y §17.4 P.12. Procedencia: `Analisis-Final-Integrado.md`, líneas 571–683. Estado: `declarado`.

**Contexto.** La configuración completa de un servicio tal como queda declarada en el registro, en sus cuatro formas: origen por imagen de registro, por repositorio remoto, por Dockerfile local y la variante macvlan con dirección fija y dispositivo anclado, que es el patrón mayoritario del parque real. Es lo que el alta de un servicio tiene que ser capaz de declarar el primer día.

**Qué ejercita.** Las ocho dimensiones de configuración que el parque real exige y que el anexo [E-19](#2019--e-19--parque-de-contenedores-de-referencia) enumera; las seis referencias del servicio 101, que entre ellas cubren las tres formas de D-6, las dos clases de arista y la interpolación dentro de un valor más largo; la distinción entre forma legible y forma vinculada (D-8, ampliada por D-12); la persistencia de las dos formas del valor, la expresión sin resolver como fuente de verdad y el último valor resuelto como materialización; la propagación del carácter de secreto por la referencia (RN-23); y el campo `origen: "enlace"`, que registra cómo se creó la variable y no una clase distinta de variable.

**Qué verificar.** Que al desplegar, el contenedor reciba valores y nunca expresiones: ninguna variable del contenedor puede contener la secuencia `${{` ni el marcador `#` del vínculo (T-38). Que renombrar el servicio destino o la variable destino no rompa ninguna referencia ni produzca un cambio pendiente (T-55, T-58, RN-33). Que `DB_PASSWORD` quede secreta por propagación, con `valor` en `null` y enmascarada en toda respuesta (T-37, RN-23). Que la variante macvlan rechace la publicación de puertos (T-10, RN-07). Que `SALUD_URL`, que referencia dos variables del propio servicio, no genere ninguna arista. Y que `DB_USER`, que referencia una variable declarada y no el host, dibuje arista y marque redespliegue sin ordenar el arranque ni exigir canal alcanzable (T-44, T-46).

Todo lo que sigue describe servicios de un **proyecto SelfHosted**. Modelo completo con origen por imagen de registro:

```json
{
  "id": 101,
  "proyectoId": 12,
  "nombre": "api",
  "descripcion": "API REST del portal",
  "origen": {
    "tipo": "imagen",
    "imagen": "registro-privado/portal-api",
    "etiqueta": "1.4.2",
    "politicaActualizacion": "fijada",
    "registro": { "url": "registry.interno.lan", "requiereCredenciales": true, "credencialId": 3 }
  },
  "red": {
    "modo": "bridge",
    "aliasDns": "api",
    "ipFija": null,
    "interfazPadre": null
  },
  "puertos": [
    { "contenedor": 8080, "host": 8080, "protocolo": "tcp", "publicar": true }
  ],
  "variables": [
    { "id": 711, "clave": "ASPNETCORE_ENVIRONMENT", "valor": "Production", "secreta": false, "origen": "manual", "referencia": null },
    { "clave": "ConnectionStrings__Default", "valor": "Host=db;Port=5432;Database=portal", "secreta": false, "origen": "enlace", "referencia": "Host=${{ db#103.SELFHOSTED_HOST }};Port=5432;Database=portal", "resueltaEn": "2026-07-26T09:02:09-03:00" },
    { "clave": "REDIS_URL", "valor": "cache:6379", "secreta": false, "origen": "enlace", "referencia": "${{ cache#102.SELFHOSTED_HOST }}:6379", "resueltaEn": "2026-07-26T09:02:09-03:00" },
    { "clave": "API_KEY_EXTERNA", "valor": null, "secreta": true, "referenciaSecreto": "sec-004", "origen": "manual", "referencia": null },
    { "clave": "TZ", "valor": "America/Argentina/Buenos_Aires", "secreta": false, "origen": "referencia", "referencia": "${{ shared.TZ#701 }}", "resueltaEn": "2026-07-26T09:02:09-03:00" },
    { "clave": "DB_USER", "valor": "portal", "secreta": false, "origen": "referencia", "referencia": "${{ db#103.POSTGRES_USER#731 }}", "resueltaEn": "2026-07-26T09:02:09-03:00" },
    { "clave": "DB_PASSWORD", "valor": null, "secreta": true, "referenciaSecreto": "sec-011", "origen": "referencia", "referencia": "${{ shared.DB_PASSWORD#702 }}", "resueltaEn": "2026-07-26T09:02:09-03:00" },
    { "id": 718, "clave": "PUERTO_HTTP", "valor": "8080", "secreta": false, "origen": "manual", "referencia": null },
    { "clave": "SALUD_URL", "valor": "http://api:8080/salud", "secreta": false, "origen": "referencia", "referencia": "http://${{ SELFHOSTED_HOST }}:${{ PUERTO_HTTP#718 }}/salud", "resueltaEn": "2026-07-26T09:02:09-03:00" }
  ],
  "montajes": [
    { "tipo": "volumen", "nombre": "portal-api-datos", "destino": "/app/data", "soloLectura": false }
  ],
  "dispositivos": [],
  "capacidades": [],
  "recursos": {
    "limiteMemoriaMb": 512,
    "reservaMemoriaMb": 128,
    "limiteCpus": 1.0
  },
  "replicas": 1,
  "politicaReinicio": "unless-stopped",
  "autoArranque": true,
  "efimero": false,
  "healthcheck": {
    "modo": "heredado-de-la-imagen",
    "comando": null,
    "intervaloSegundos": null
  },
  "adopcion": null,
  "posicionCanvas": { "x": 160, "y": 120 },
  "estadoActual": {
    "estado": "activo",
    "despliegueId": 5471,
    "desde": "2026-07-26T09:02:11-03:00",
    "requiereRedespliegue": false
  }
}
```

Seis de las variables de este servicio son referencias, y entre las seis ejercitan las tres formas de D-6 y las dos clases de arista. Su sintaxis, momento de resolución y efecto en el grafo están especificados en el anexo [E-4](#204--e-4--enlace-del-lienzo-y-su-variable-generada). La columna «Forma» muestra la **forma legible**, que es lo que el usuario escribe y lo que la interfaz muestra; lo que se persiste es la **forma vinculada**, con el identificador del servicio destino (D-8):

| Variable | Forma legible | Qué referencia | Arista |
|---|---|---|---|
| `TZ` | `${{ shared.TZ }}` | Variable compartida del proyecto (D-5) | Ninguna: el proyecto no es un nodo del lienzo |
| `DB_PASSWORD` | `${{ shared.DB_PASSWORD }}` | Variable compartida del proyecto, secreta | Ninguna |
| `SALUD_URL` | `http://${{ SELFHOSTED_HOST }}:${{ PUERTO_HTTP }}/salud` | Dos variables del **propio** servicio: una provista y una declarada, interpoladas en un valor más largo | Ninguna: origen y destino son el mismo servicio |
| `ConnectionStrings__Default` | `Host=${{ db.SELFHOSTED_HOST }};Port=5432;Database=portal` | El host provisto de `db`. **El puerto va literal** (D-9) | 9002: referencia el host, declara espera, y registra `puertoDestino: 5432` |
| `REDIS_URL` | `${{ cache.SELFHOSTED_HOST }}:6379` | El host provisto de `cache`, con el puerto literal | 9001: referencia el host, declara espera, registra `puertoDestino: 6379` |
| `DB_USER` | `${{ db.POSTGRES_USER }}` | Una variable **declarada** de `db` | 9003: no referencia el host y no declara espera. Dibuja arista y marca redespliegue, nada más |

Cinco cosas que el ejemplo muestra y que el modelo hace cumplir:

- **`ConnectionStrings__Default` y `REDIS_URL` son las dos que el usuario no tipeó**: las escribió el sistema al trazar la flecha en el lienzo, tomando el host del destino y **preguntando por el puerto si el destino declaraba varios**. Son referencias comunes como cualquier otra, y el usuario puede editarlas. Su `origen` sigue siendo `enlace`, que registra **cómo se creó** la variable y no una clase distinta de variable.
- **Lo persistido lleva el vínculo, no el nombre.** `ConnectionStrings__Default` se guarda como `Host=${{ db#103.SELFHOSTED_HOST }};Port=5432;Database=portal`: si mañana `db` pasa a llamarse `postgres`, la expresión sigue apuntando al servicio 103 y la interfaz muestra el nombre nuevo, sin que nada se rompa ni aparezca un cambio pendiente (RN-33).
- **Se persisten las dos formas del valor**: `referencia` guarda la expresión sin resolver y `valor` la última resolución, con `resueltaEn` como marca de tiempo.
- **El carácter de secreto se propaga por la referencia** (RN-23): `DB_PASSWORD` referencia una variable compartida secreta, de modo que ella misma es secreta, tiene `valor` en `null` y viaja como referencia a secreto, igual que `API_KEY_EXTERNA`. Ninguna variable provista es secreta, de modo que una referencia a `SELFHOSTED_*` nunca dispara esta propagación.
- **Un servicio puede referenciar sus propias variables provistas**, como hace `SALUD_URL` con `${{ SELFHOSTED_HOST }}`: es la forma de un segmento, no genera arista y no lleva vínculo, porque el servicio propio no necesita identificarse.

Variante de origen por repositorio de GitHub:

```json
{
  "origen": {
    "tipo": "repositorio",
    "proveedor": "github",
    "url": "https://github.com/usuario/portal-api",
    "rama": "main",
    "rutaDockerfile": "src/Api/Dockerfile",
    "contextoBuild": ".",
    "argumentosBuild": { "CONFIGURATION": "Release" },
    "credencialId": 2,
    "reconstruirEnDespliegue": true
  }
}
```

Variante de origen por Dockerfile local:

```json
{
  "origen": {
    "tipo": "dockerfile",
    "rutaDockerfile": "/srv/proyectos/portal/Dockerfile",
    "contextoBuild": "/srv/proyectos/portal",
    "argumentosBuild": {},
    "reconstruirEnDespliegue": true
  }
}
```

Variante macvlan con dirección fija y dispositivo anclado, que es el caso del parque real:

```json
{
  "nombre": "print-server",
  "red": {
    "modo": "macvlan",
    "aliasDns": "print-server",
    "ipFija": "192.168.1.139",
    "interfazPadre": "enp1s0",
    "subred": "192.168.1.0/24",
    "gateway": "192.168.1.1"
  },
  "puertos": [
    { "contenedor": 3344, "host": null, "protocolo": "tcp", "publicar": false }
  ],
  "dispositivos": [
    { "host": "/dev/serial/by-id/usb-FTDI-if00-port0", "contenedor": "/dev/ttyUSB0", "permisos": "rwm" }
  ],
  "recursos": { "limiteMemoriaMb": 512 },
  "politicaReinicio": "always"
}
```

### §20.3 · E-3 · Despliegue con su línea de tiempo de eventos y sus métricas

Citado desde §17.3 P.4. Procedencia: `Analisis-Final-Integrado.md`, líneas 691–719. Estado: `declarado`.

**Contexto.** El intento concreto de materializar un contenedor, con su línea de tiempo de eventos y sus métricas, y en segundo lugar la línea de tiempo de otro despliegue del mismo lote que falló. Los dos pertenecen a la aplicación del changeset 331 y son los que el anexo [E-13](#2013--e-13--contrato-del-endpoint-de-despliegue) devuelve como resultado de esa operación.

**Qué ejercita.** La decisión D-1 en su forma observable: el despliegue es siempre el de **un** contenedor, la operación que los agrupa no tiene estado propio, y un despliegue parcial es un estado legítimo del modelo (RN-31). Ejercita además la línea de tiempo de eventos como insumo de la interfaz, las métricas por despliegue que alimentan el nodo del lienzo y el tablero, y la relación con la máquina de estados del anexo [E-17](#2017--e-17--ciclo-de-vida-del-despliegue-y-correspondencia-con-el-motor).

**Qué verificar.** Que la caída del circuito de la interfaz no cancele, no pause y no altere ningún despliegue en curso: lo único que se pierde es la vista (T-31). Que el fallo del despliegue 5472 no arrastre al 5471, que queda `activo`, y que el proyecto resultante quede `parcialmente-activo` y no en un estado intermedio a resolver. Que al reabrir el proyecto el estado real de cada contenedor se verifique contra el motor con la tabla de correspondencia de E-17, en lugar de reconstruir el resultado de la operación. Y que el evento de fallo lleve su causa identificable, que es lo que la interfaz muestra.

```json
{
  "id": 5471,
  "servicioId": 101,
  "numeroReplica": 1,
  "contenedorId": "3f9a1c7b2e4d",
  "nombreContenedor": "portal-interno_api_1",
  "imagenResuelta": "registro-privado/portal-api:1.4.2",
  "digestImagen": "sha256:a1b2c3...",
  "estado": "activo",
  "codigoSalida": null,
  "solicitadoPor": "ui",
  "changesetId": 331,
  "iniciadoEn": "2026-07-26T09:02:11-03:00",
  "finalizadoEn": null,
  "eventos": [
    { "en": "2026-07-26T09:01:40-03:00", "tipo": "pendiente", "detalle": "Despliegue encolado" },
    { "en": "2026-07-26T09:01:44-03:00", "tipo": "construyendo", "detalle": "build de imagen · 38 s" },
    { "en": "2026-07-26T09:02:09-03:00", "tipo": "creando", "detalle": "Contenedor creado" },
    { "en": "2026-07-26T09:02:11-03:00", "tipo": "activo", "detalle": "Healthcheck OK" }
  ],
  "metricas": {
    "cpuPorcentaje": 3.4,
    "memoriaUsadaMb": 186,
    "memoriaLimiteMb": 512,
    "tomadoEn": "2026-07-26T10:14:58-03:00"
  }
}
```

**El resultado se determina por contenedor, no por operación [D], D-1 del 2026-07-28.** Un despliegue es siempre el intento de materializar **un** contenedor: la entidad de este anexo tiene un `servicioId`, un `numeroReplica` y un `contenedorId`, y su estado describe a ese contenedor y nada más. La operación que el usuario dispara —aplicar un changeset, arrancar un proyecto SelfHosted— agrupa N despliegues, pero **no tiene estado propio**: su resultado es el conjunto de los resultados de sus contenedores. Tres consecuencias que el modelo hace cumplir (RN-31):

1. **El despliegue vive del lado del servidor.** El circuito SignalR de la interfaz observa la línea de tiempo, no la produce: los eventos de este anexo los escribe el backend a medida que ocurren, y la caída del circuito no cancela, no pausa y no altera ningún despliegue en curso. Lo único que se pierde es la vista.
2. **Cada contenedor se marca por separado.** Los que se desplegaron bien quedan en `activo`; los que fallaron quedan en `fallido` con su causa en el último evento de su propia línea de tiempo. No hay un estado intermedio "operación a medias" que haya que resolver: **un despliegue parcial es un estado legítimo del modelo**, y el proyecto que lo contiene queda `parcialmente-activo`, el mismo estado que ya usan CL-01 y RN-20.
3. **Al reabrir el proyecto se verifica contra el motor.** El sincronizador de estado de CL-02 contrasta el estado real de cada contenedor con el registrado, usando la tabla de correspondencia del anexo [E-17](#2017--e-17--ciclo-de-vida-del-despliegue-y-correspondencia-con-el-motor). No se reconstruye el resultado de la operación: se lee el de cada contenedor.

Línea de tiempo de un despliegue del mismo lote que falló, para mostrar que el fallo es local al contenedor y no arrastra a los demás:

```json
{
  "id": 5472,
  "servicioId": 102,
  "numeroReplica": 1,
  "contenedorId": null,
  "nombreContenedor": "portal-interno_cache_1",
  "imagenResuelta": "imagen-oficial/redis:7.4",
  "estado": "fallido",
  "codigoSalida": null,
  "solicitadoPor": "ui",
  "changesetId": 331,
  "iniciadoEn": "2026-07-26T09:02:12-03:00",
  "finalizadoEn": "2026-07-26T09:02:19-03:00",
  "eventos": [
    { "en": "2026-07-26T09:01:40-03:00", "tipo": "pendiente", "detalle": "Despliegue encolado" },
    { "en": "2026-07-26T09:02:12-03:00", "tipo": "creando", "detalle": "Descarga de imagen" },
    { "en": "2026-07-26T09:02:19-03:00", "tipo": "fallido", "detalle": "La imagen no existe en el registro" }
  ],
  "metricas": null
}
```

Los dos despliegues pertenecen al mismo changeset 331 y a la misma operación. El 5471 quedó activo, el 5472 fallido: el proyecto 12 queda `parcialmente-activo`, que es exactamente el estado que declara el anexo [E-1](#201--e-1--proyecto-con-layout-de-lienzo).

### §20.4 · E-4 · Enlace del lienzo y su variable generada

Citado desde §17.4 P.11. Procedencia: `Analisis-Final-Integrado.md`, líneas 723–750, reescrito el 2026-07-28 por la segunda pasada sobre D-6, que unifica el enlace del lienzo y la referencia de variable en un único mecanismo. Estado: `declarado`.

**Contexto.** La especificación completa del único mecanismo de vínculo entre servicios, en el momento en que el usuario traza una flecha en el lienzo o escribe una referencia a mano. Es el anexo del que dependen el orden de arranque, el marcado de redespliegue, la exportación y la importación, y el que más veces cambió de forma: acumula la segunda pasada sobre D-6, las decisiones D-8, D-9, D-10 y D-11 de la tercera y la consecuencia 1 de D-12.

**Qué ejercita.** La sintaxis en sus tres formas y la gramática que se decide por cantidad de segmentos; la forma vinculada frente a la forma legible, con las cuatro clases de expresión que legítimamente no llevan vínculo; las variables provistas por el sistema y la resolución de `SELFHOSTED_HOST` según el modo de red del destino; el puerto escrito literal y registrado en la arista; el momento de resolución y qué se persiste; los dos ejes independientes de la arista —esperar al destino y referenciar el host— con sus cuatro combinaciones alcanzables; y la convivencia con la expansión de variables de Compose en los dos sentidos, incluido el escape del signo peso.

**Qué verificar.** Que trazar la flecha escriba una referencia común y no una plantilla de enlace, con el puerto tomado del destino y la espera **propuesta**, no impuesta (T-12, T-53). Que un destino con dos puertos declarados dispare la pregunta al trazar y no una ambigüedad diferida (T-50). Que un servicio pueda llamarse `shared` sin que ninguna expresión quede ambigua (T-51). Que declarar una clave con prefijo `SELFHOSTED_` se rechace (T-49). Que las cuatro combinaciones de espera y referencia al host se comporten como declara la tabla: T-44 y T-46 para las cruzadas, T-45 y T-57 para los bordes. Que una referencia que no resuelve aborte el despliegue de ese servicio con la causa identificada y sin afectar a los demás contenedores (T-34, T-35, RN-24, RN-31). Que ningún ciclo de valor sea admisible con independencia de la espera (T-36, T-52). Y que la ida y vuelta con Compose conserve los literales que contienen el signo peso, escapados en los dos sentidos (T-39, T-40, T-47, T-48).

**Nota sobre el título de este anexo.** Conserva la expresión «variable generada», que es anterior a la segunda pasada sobre D-6 y que el modelo ya no usa: lo que el enlace produce hoy es una **referencia**, no una variable de una clase aparte. El título no se corrige a propósito, porque de él se deriva el ancla con la que todo el documento y los artefactos que ya lo están leyendo citan este anexo. Se reevalúa si alguna vez se abre una versión 1.3, junto con las otras dos observaciones de orden registradas en §19.

**Un solo mecanismo de vínculo [D], D-6 segunda pasada.** El enlace que el usuario traza en el lienzo **ya no es un tipo de arista propio**: es **azúcar de interfaz** sobre la referencia de variable. El usuario arrastra la flecha de `api` a `db`, y el sistema escribe en `api` una variable cuyo valor referencia las variables provistas del destino. Lo que se persiste es una referencia común, igual que si el usuario la hubiera tipeado a mano. Es el modelo de la plataforma de referencia, donde *"la referencia de variable es el único vínculo explícito"* y la conectividad de red es implícita (`Analisis-Rayway.md` §3.5 **[E]** respecto de ese documento).

El mismo enlace 9002 del proyecto SelfHosted 12, con la forma que tiene ahora:

```json
{
  "id": 9002,
  "proyectoId": 12,
  "origenServicioId": 101,
  "destinoServicioId": 103,
  "claveVariable": "ConnectionStrings__Default",
  "claveDestino": "SELFHOSTED_HOST",
  "puertoDestino": 5432,
  "esperaDestino": true,
  "referenciaElHost": true,
  "estado": "aplicado",
  "creadoEn": "2026-07-20T18:22:00-03:00"
}
```

La variable que lo sostiene, en el servicio 101, es una referencia común y nada más:

```json
{
  "clave": "ConnectionStrings__Default",
  "referencia": "Host=${{ db#103.SELFHOSTED_HOST }};Port=5432;Database=portal",
  "valor": "Host=db;Port=5432;Database=portal"
}
```

Tres cosas que cambian respecto de la versión anterior de este anexo, y que conviene enunciar porque el modelo se achica:

- **Desaparece el discriminador `tipo`.** No hay aristas de host y puerto por un lado y de referencia por el otro: hay aristas. Casi todas nacen de una referencia a una variable de otro servicio, y desde la tercera pasada una puede existir sólo por la espera que declara, sin variable (D-11).
- **Desaparece la sintaxis `{destino.host}`.** Era la plantilla del enlace y ya no hace falta: lo que antes resolvía esa plantilla ahora lo aporta la variable provista `SELFHOSTED_HOST` del destino, y el puerto se escribe literal (D-9). En el modelo quedan **dos** sintaxis, no tres: `${{ … }}` para referencias y `{{ … }}` para huecos de parámetro del catálogo (anexo [E-6](#206--e-6--ítem-del-catálogo-de-servicios-reutilizables)).
- **Desaparece `protocolo` del enlace.** `puertoDestino` sí vuelve en la tercera pasada, pero con otro rol: registro de dependencia y no plantilla de resolución (D-10).

De los tres campos que la arista suma en esta pasada, **dos son datos persistidos y uno es calculado**. `esperaDestino` es la propiedad declarada de D-11, la que define el grafo de arranque, y se persiste porque la decide el usuario. `puertoDestino` es el registro de dependencia de D-10: la expresión ya lleva el puerto literal, de modo que este campo **no participa de la resolución** —no es una plantilla— y existe sólo para que cambiar el puerto de un servicio marque con precisión qué otros quedan desactualizados, en lugar de buscar el número por texto. `referenciaElHost` **no es una columna**: se deduce de `claveDestino`, y es lo único que decide la exigencia de canal alcanzable de RN-04. Los dos ejes son independientes; el argumento está en el punto 4 de este anexo.

Una variable puede contener **más de una referencia**, y entonces sostiene más de una arista: en el proyecto 12, `ConnectionStrings__Default` genera la 9002 hacia `SELFHOSTED_HOST` de `db`, y `REDIS_URL` genera la 9001 hacia el de `cache`. El lienzo **dibuja una sola arista por par de servicios** y agrupa debajo las referencias que la sostienen; el modelo las guarda por separado porque la validación de RN-04 depende de **qué** referencia cada una, y el marcado de redespliegue de **cuál** de los valores cambió. El orden de arranque no sale de ahí: lo decide la propiedad de espera de cada arista (RN-14).

---

**Especificación de la referencia de variable [D], D-6, segunda pasada del 2026-07-28.**

**Cómo leer este bloque, y qué parte de él no decidió el agente humano.** En la segunda pasada D-6 fijó la sintaxis completa con sus identificadores, la existencia de las variables provistas por el sistema, que la referencia se resuelve en el backend antes de crear el contenedor, que la referencia a otro servicio genera arista y que el enlace del lienzo es azúcar sobre ese único mecanismo. Quedó para el integrador el nombre concreto de las claves provistas, qué se persiste y la convivencia con Compose. La tercera pasada agregó tres decisiones del agente humano —D-8, D-9 y D-11— que reemplazaron parte de lo derivado entonces. Lo derivado va marcado **[D-i]** y está enumerado en §19; lo marcado **[D], D-6** es lo que decidió el agente humano.

Esta parte del anexo es la especificación completa de la decisión D-6. La sintaxis se toma del mecanismo de *reference variables* de la plataforma de referencia, transcripto de `Analisis-Rayway.md` §3.5 **[E]** respecto de ese documento. La transcripción es literal en la sintaxis y en la estructura del bloque; los comentarios van sin tildes por la convención de este intake de no acentuar dentro de bloques de código, que es la única divergencia respecto del original:

```bash
# Variable de otro servicio (el namespace es el nombre del servicio)
DATABASE_URL=${{ Postgres.DATABASE_URL }}

# Dominio publico de otro servicio
API_URL=https://${{ backend.RAILWAY_PUBLIC_DOMAIN }}

# Variable compartida del proyecto
SENTRY_DSN=${{ shared.SENTRY_DSN }}

# Variable del propio servicio
FULL_URL=${{ RAILWAY_PUBLIC_DOMAIN }}/api
```

Ese mismo documento declara, en su §7, cuál es el equivalente razonable en un entorno Docker autoalojado: *"Reference variable `${{svc.VAR}}` → Resolución en el backend antes de crear el contenedor + arista en el grafo. Es lo que alimenta las aristas del canvas"* **[E]** respecto de ese documento.

**1 · Sintaxis adoptada [D], D-6 segunda pasada.** Se toma la de la plataforma de referencia, sin apartarse de ella:

| Forma | Sintaxis | Qué referencia | En la fuente |
|---|---|---|---|
| Propio servicio | `${{ CLAVE }}` | Otra variable del mismo servicio. Un segmento | Igual: `${{ RAILWAY_PUBLIC_DOMAIN }}` |
| Compartida del proyecto | `${{ shared.CLAVE }}` | Una variable compartida del proyecto (D-5). Se distingue de un servicio homónimo porque el segmento del servicio va vinculado y éste no (D-8) | Igual: `${{ shared.SENTRY_DSN }}` |
| Otro servicio | `${{ <nombre-servicio>.CLAVE }}` | Cualquier variable de otro servicio del mismo proyecto, declarada o provista. `<nombre-servicio>` es el nombre de RN-01, único dentro del proyecto (I8) | Igual: `${{ Postgres.DATABASE_URL }}` |

**La gramática se decide por cantidad de segmentos [D-i].** No hace falta conocer el conjunto de nombres de servicio para parsear una expresión:

| Segmentos | Interpretación | Ejemplo |
|---|---|---|
| Uno | Siempre variable del propio servicio | `${{ PUERTO_HTTP }}` |
| Dos, con `shared` primero y sin vínculo | Siempre variable compartida del proyecto | `${{ shared.DB_PASSWORD }}` |
| Dos, con un segmento vinculado primero | Siempre variable de otro servicio | `${{ db#103.SELFHOSTED_HOST }}` |

**La referencia se vincula al servicio, no a su nombre [D], D-8 tercera pasada.** El efecto que la decisión exige es doble: **renombrar un servicio no rompe ninguna referencia**, y un servicio puede llamarse `shared` sin ambigüedad. La forma concreta de lograrlo es **[D-i]**, y se adopta la primera de las dos vías posibles: **persistir el vínculo dentro de la propia expresión y renderizar el nombre al mostrarla**.

La expresión existe entonces en dos formas, y la distinción es lo único que hay que entender de este punto:

| Forma | Cómo se ve | Dónde vive |
|---|---|---|
| **Forma legible** | `${{ db.SELFHOSTED_HOST }}` | Lo que el usuario escribe y lo que la interfaz muestra. Es idéntica a la de la plataforma de referencia |
| **Forma vinculada** | `${{ db#103.POSTGRES_USER#731 }}` | Lo que se persiste en `variables.referencia`. Los `#103` y `#731` son los identificadores del **servicio** y de la **variable** destino, y son **el vínculo**; los nombres que los preceden son render que el sistema mantiene al día y que no significan nada para el resolutor. La segunda mitad del vínculo la agregó D-12: hasta entonces sólo se vinculaba el servicio y la clave viajaba como texto, de modo que renombrar la variable rompía la referencia en silencio. **Una variable provista por el sistema nunca lleva identificador**, ni la del propio servicio ni la de otro, porque no es un objeto del usuario: su clave la fija el sistema, no se renombra y por lo tanto no hay nada que vincular. El servicio que la expone sí lo lleva, porque ése sí se renombra: `${{ SELFHOSTED_HOST }}` para la propia y `${{ db#103.SELFHOSTED_HOST }}` para la de otro servicio |

Cómo se comporta cada operación:

- **Al escribir**, el usuario elige el servicio de una lista —el autocompletado deja de ser una comodidad y pasa a ser **parte del mecanismo**, porque es donde se establece el vínculo— y el sistema persiste la forma vinculada. Si escribe a mano, el sistema resuelve el nombre contra los servicios del proyecto en ese momento y vincula; si el nombre no resuelve, rechaza con RN-21.
- **Al renombrar un servicio o una variable**, no cambia ningún vínculo: sólo se refresca el nombre renderizado de las expresiones que lo apuntan, que se localizan por las aristas, que ya guardan `destino_servicio_id`. Ninguna referencia se rompe (RN-33). Desde D-12 vale también para el renombrado de la variable, que antes rompía la referencia sin avisar.
- **Al mostrar**, se emite la forma legible.
- **Cuatro clases de expresión no llevan vínculo de variable, y las cuatro son correctas.** Quien calibre una consulta de barrido por forma contra este anexo tiene que reconocerlas, o marcará como resto algo que está bien. Las dos primeras son **contextos** donde la forma legible es la que corresponde; las dos últimas son **destinos** que no son objetos del usuario:

  1. **Plantilla del catálogo** y  2. **descripción de un flujo de la interfaz**, que se detallan a continuación.
  3. **Variable provista del propio servicio** —`${{ SELFHOSTED_HOST }}`—: no lleva ningún identificador, ni de servicio ni de variable.
  4. **Variable provista de otro servicio** —`${{ db#103.SELFHOSTED_HOST }}`—: lleva el del servicio y no el de la variable.

- **Los dos contextos, en detalle.** En una **plantilla del catálogo** (anexo [E-6](#206--e-6--ítem-del-catálogo-de-servicios-reutilizables)) no hay vínculo posible: los objetos que la expresión apunta **no existen todavía** y se crean al instanciar, que es cuando el sistema vincula. Y en la descripción de un **flujo de la interfaz** (anexo [E-10](#2010--e-10--alta-de-proyecto-con-api-y-base-de-datos-de-extremo-a-extremo)) se muestra lo que el usuario ve, que es por definición la forma legible. En los dos casos la ausencia de `#id` es deliberada y no un resto.
- **Al exportar al manifiesto propio**, se emite la forma **legible**: el manifiesto tiene que ser portable a otra instalación donde los identificadores son otros. La importación hace el camino inverso y vuelve a vincular por nombre contra los servicios que crea.
- **Al comparar dos expresiones** —el "antes → después" del changeset— se comparan por su forma vinculada, ignorando el nombre renderizado: renombrar un servicio no produce un cambio pendiente.

**Por qué esta vía y no la otra.** La alternativa era persistir el texto con el nombre y reescribirlo al renombrar, apoyándose en que la arista ya guarda el identificador del destino. Es más simple y no cambia la forma canónica, pero deja el **texto como fuente de verdad**: el vínculo se reconstruye por coincidencia de nombre en cada lectura, de modo que un servicio llamado `shared` sigue siendo ambiguo para quien escriba a mano, y la reserva de RN-01 tendría que sobrevivir. La vía adoptada elimina la ambigüedad de raíz —el espacio de nombres se resuelve una sola vez, al escribir— y hace del renombrado una operación de presentación en lugar de una migración de datos. El costo es que la forma persistida deja de coincidir con la de la fuente; se acepta porque **la divergencia está confinada a la persistencia**, que ningún usuario ve: lo que se escribe, lo que se muestra y lo que se exporta siguen siendo idénticos a la fuente.

**Consecuencia: la reserva del nombre `shared` desaparece.** Ya no hace falta, porque un segmento vinculado lleva su `#id` y un segmento `shared` sin vínculo es siempre el espacio del proyecto. La ampliación que RN-01 había recibido para prohibir ese nombre se revierte, y la especificación de integración que la sostenía se da de baja.

**2 · Variables provistas por el sistema [D], D-6 segunda pasada.** Es la pieza nueva y la que permite que un solo mecanismo alcance. Cada servicio expone un conjunto de variables **de sólo lectura** que el sistema provee y que el usuario **no declara ni edita**; son referenciables como cualquier otra, desde el propio servicio o desde otro. Es el equivalente de `RAILWAY_PUBLIC_DOMAIN` de la fuente, que funciona sin que nadie la haya declarado en el servicio destino.

El nombre de las claves lleva prefijo **`SELFHOSTED_` y va en inglés [D-i]**, siguiendo el patrón de la fuente, que usa el nombre de su producto como prefijo. El inglés es deliberado y es la única parte del modelo que no se nombra en español: estas claves **las lee el proceso que corre dentro del contenedor**, donde la convención del ecosistema es el inglés en mayúsculas, a diferencia del resto del modelo, que lo lee una persona en la interfaz.

| Clave provista | Qué vale | Notas |
|---|---|---|
| `SELFHOSTED_HOST` | El host interno por el que se alcanza al servicio, resuelto según su modo de red | Su tabla de resolución es la de abajo |
| `SELFHOSTED_SERVICE_NAME` | El nombre del servicio dentro del proyecto | Coincide con su alias DNS interno (I8) |

**Resolución de `SELFHOSTED_HOST` según el modo de red del destino.** Es la regla de resolución del host que este anexo declara desde la versión 1.0, sin cambios de contenido:

| Modo del destino | `SELFHOSTED_HOST` resuelve a | Requisito |
|---|---|---|
| `bridge` en la misma red del proyecto | El alias DNS del servicio (`db`) | Ambos servicios en la misma red |
| `macvlan` | La dirección fija del servicio (`192.168.1.139`) | La dirección debe estar reservada y sin conflicto |
| `bridge` con puerto publicado, consumido desde otra red | La dirección del host más el puerto publicado | Requiere puerto publicado |

**El puerto no es una variable provista [D], D-9 tercera pasada.** La fuente no provee variable de puerto: documenta su DNS interno como `<servicio>.internal:PORT`, con el puerto escrito a mano. Su criterio, deducible del conjunto de claves que sí provee, es proveer **lo que el usuario no puede saber de antemano** y dejar como convención lo que sí. El puerto lo declaró el usuario en el formulario del servicio. `SELFHOSTED_PORT` se elimina y el puerto pasa a escribirse **literal** dentro de la expresión:

```bash
DATABASE_URL=postgres://app:${{ shared.DB_PASSWORD }}@${{ db.SELFHOSTED_HOST }}:5432/portal
```

Cuando el usuario traza la flecha en el lienzo, el sistema mira los puertos declarados del destino: **si hay uno, lo escribe; si hay varios, pregunta cuál** antes de escribir la expresión. Con eso desaparece la ambigüedad del multi-puerto, que la especificación anterior no sabía resolver y había dejado registrada como pendiente en §19: la pendiente se cierra sin decisión adicional, porque la pregunta se hace una vez, al trazar, y no cada vez que se resuelve.

**Evaluación de las dos claves restantes [D-i], aplicando el mismo criterio.** El agente humano pidió revisar si `SELFHOSTED_SERVICE_NAME` y `SELFHOSTED_PROJECT_NAME` se sostienen. El veredicto es distinto para cada una:

- **`SELFHOSTED_SERVICE_NAME` se conserva.** A primera vista es marginal —el usuario eligió el nombre y lo conoce—, pero **D-8 cambió el argumento**: desde que renombrar un servicio es una operación segura y esperada, el nombre dejó de ser una constante que el usuario fija una vez. Un proceso que necesite su propio nombre —para registrarse, para etiquetar sus trazas— y lo reciba como literal queda desactualizado en el próximo renombrado, en silencio. Referenciándola, sigue al renombrado. Es exactamente el dolor de «escribirlo y mantenerlo sincronizado» que §1 declara y que el producto viene a eliminar. Además es el alias DNS interno del servicio (I8), de modo que es el dato de topología que un proceso más plausiblemente necesita de sí mismo.
- **`SELFHOSTED_PROJECT_NAME` se elimina.** El mismo argumento le alcanzaría —un proyecto también se renombra (F-02)—, pero no hay ningún flujo declarado en este intake donde el proceso de un contenedor necesite el `slug` del proyecto: no aparece en ninguna de las seis configuraciones reales de [E-20](#2020--e-20--configuraciones-reales-de-contenedor-ofuscadas) ni en ningún caso de uso. Se elimina por superficie: una clave provista es un contrato permanente con todo contenedor que corra en el producto, y no se sostiene un contrato sin un caso que lo pida. Agregarla más adelante no rompe nada, que es la asimetría que hace barato el descarte y caro el error contrario.

**Consecuencia asumida: un literal que duplica un valor provisto no sigue al renombrado [D-i].** Nada impide que el usuario escriba a mano el valor que una clave provista le daría, y el caso no es marginal: en modo `bridge`, que es el de un proyecto nuevo por DA-03, `SELFHOSTED_HOST` resuelve al **alias DNS del servicio, que por I8 es su nombre**. Un usuario que escriba `db` como literal obtiene hoy exactamente el mismo valor que `${{ db.SELFHOSTED_HOST }}`. Lo mismo vale para `SELFHOSTED_SERVICE_NAME`: la propiedad alcanza a las dos claves provistas, no a una.

La diferencia aparece al renombrar: la **referencia sigue** al servicio (RN-33) y el **literal queda obsoleto en silencio**, que es justamente el defecto que RN-33 existe para eliminar y el dolor que §1 declara como problema de origen. El modelo **no puede impedirlo sin prohibir los literales**, que sería peor: hay razones legítimas para escribir un nombre a mano, empezando por los servicios que no pertenecen al proyecto.

Se declara entonces como consecuencia asumida, con una salida barata identificada y no tomada: **la interfaz puede detectar la coincidencia** —un literal que iguala el valor provisto de un servicio del proyecto— y sugerir reemplazarlo por la referencia, en el momento de escribirlo o al renombrar. Si esa sugerencia existe, con qué forma y si es bloqueante o descartable, **no está decidido** y figura entre las pendientes de §19: es una decisión de interfaz con comportamiento observable y este intake no la toma.

Dos decisiones más sobre el conjunto, las dos **[D-i]**:

- **No se expone el modo de red.** Se evaluó una clave `SELFHOSTED_NETWORK_MODE` y se descarta: el modo es justamente el detalle que la resolución de `SELFHOSTED_HOST` existe para ocultar, y exponerlo invitaría al proceso del contenedor a ramificar por él, que es lo que la tabla de arriba evita. Si algún día hace falta, agregar una clave provista no rompe nada.
- **Ninguna variable provista es secreta.** El host y el nombre son datos de topología, no credenciales: se muestran en claro en la interfaz y viajan en claro a la exportación. Es lo que hace que RN-23, la propagación del carácter de secreto, nunca se dispare por una referencia a una provista.

**3 · Momento de resolución.** La referencia se resuelve **en el backend, inmediatamente antes de crear el contenedor** (RN-24). El contenedor nunca ve la expresión: ve el valor. Esa parte es **[D], D-6**. Qué se persiste es **[D-i]**, y se persisten **ambos**:

| Qué | Dónde | Rol |
|---|---|---|
| La expresión sin resolver | `variables.referencia` | **Es la fuente de verdad.** Es la intención del usuario, sobrevive a que el valor referenciado cambie y es lo que se exporta al manifiesto propio |
| El último valor resuelto | `variables.valor` y `variables.resuelta_en` | **Es una materialización, no un dato editable.** Sirve para tres cosas concretas: mostrar el valor efectivo en la interfaz sin resolver el grafo en cada lectura, construir el "antes → después" del informe de impacto del changeset del anexo [E-5](#205--e-5--changeset-de-cambios-pendientes-con-su-informe-de-impacto), y saber qué valor recibió el contenedor que está corriendo, que es lo que hace detectable que quedó obsoleto |

Mientras `referencia` no sea nula, `valor` no se edita a mano: se reescribe en cada resolución. Si la variable referenciada es secreta, el valor resuelto **no se persiste en claro**: la variable que la referencia es ella misma secreta, con `valor` en `null` y su referencia a secreto (RN-23).

**La resolución tiene exactamente dos niveles [D-i].** Una variable compartida del proyecto contiene siempre un literal o material secreto, nunca una referencia, de modo que resolver una expresión es una operación de un solo salto cuando apunta al nivel proyecto, y de a lo sumo una cadena entre variables de servicio cuando apunta a un servicio. Tres razones para acotarlo así, en lugar de permitir que una compartida referencie:

1. **Invierte la dirección de la dependencia.** El nivel proyecto es el que aporta el valor común; si pudiera referenciar a un servicio, el valor del proyecto dependería de qué servicios existen, y borrar un servicio rompería una variable de nivel superior.
2. **Rompe la instanciación del catálogo.** Un ítem multi-servicio declara sus variables compartidas antes de crear sus servicios (anexo [E-6](#206--e-6--ítem-del-catálogo-de-servicios-reutilizables)): si esas variables pudieran referenciar servicios, no habría orden de creación válido.
3. **Acota el ciclo posible.** Con esta restricción, ningún ciclo de resolución puede atravesar el nivel proyecto, y RN-22 sólo tiene que cubrir los ciclos entre variables de servicio.

Es una restricción y no una capacidad, de modo que levantarla más adelante no rompe nada de lo escrito. Figura entre las especificaciones de integración pendientes de confirmación de §19.

**4 · Efecto en el grafo, y qué ordena el arranque.** Toda referencia a una variable **de otro servicio** genera una arista del que referencia hacia el referenciado, y marca al primero como pendiente de redespliegue cuando el valor cambia: eso es **[D], D-6**. Las referencias al propio servicio y a una variable compartida no generan arista, porque no hay dos nodos que unir.

**Esperar al destino es una propiedad declarada de la arista [D], D-11 tercera pasada.** La segunda pasada deducía el orden de arranque de qué variable se referencia —si apuntaba al host, ordenaba— y esa heurística **falla en los dos sentidos**:

- Un servicio referencia el host de otro **pero tiene reintentos de conexión**: no necesita esperar, y el sistema lo obligaba a hacerlo.
- Un servicio **no referencia nada** del otro, porque la cadena de conexión vive en una variable compartida: sí necesita que el otro esté arriba, y el sistema no lo sabía.

Qué variable se referencia no dice si hay que esperar. Son dos cosas distintas que se parecen, y por eso pasan a ser dos ejes independientes de la arista:

| Eje | Cómo se determina | Para qué sirve |
|---|---|---|
| **Espera al destino** | **Propiedad declarada** de la arista. El sistema **propone** el valor al crearla —si la referencia apunta al host, propone que espere— y el usuario puede cambiarlo | Define el grafo de arranque: orden topológico (RN-14) y detección de ciclos de arranque (RN-05) |
| **Referencia el host** | **Deducido** de `clave_destino`: es verdadero cuando la arista apunta a `SELFHOSTED_HOST` del destino | Define la exigencia de canal alcanzable (RN-04) |

**Los dos ejes son independientes**, y esa independencia es el punto de la decisión: se puede **esperar sin referenciar** —el caso de la cadena de conexión en una variable compartida, y el de un `depends_on` importado— y se puede **referenciar sin esperar** —el caso del cliente con reintentos—. Ninguno de los dos implica al otro, y por eso ninguno se deduce del otro.

| | Espera declarada | No espera |
|---|---|---|
| **Referencia el host** | Caso más común: `api` toma el host de `db` y quiere que `db` esté arriba. Ordena y exige canal | Cliente con reintentos: toma el host pero arranca cuando quiere. No ordena, **sí** exige canal |
| **No referencia el host** | `depends_on` importado, o cadena de conexión en una variable compartida. **Ordena**, no exige canal | Referencia de un dato de configuración cualquiera. Ni ordena ni exige canal |

Las cuatro combinaciones son alcanzables y ninguna es un error: es lo que la tabla anterior, con un solo predicado deducido, no podía expresar.

**Consecuencia: se admite la arista sin variable.** Una arista cuya única razón de ser es la espera —sin `clave_variable` ni `clave_destino`— es exactamente lo que significa `depends_on` en Compose, y ahora tiene representación. La segunda pasada la había descartado por ser un caso de borde de importación; con el arranque administrado deja de ser un borde, porque **este producto administra el encendido de un proyecto y la plataforma de referencia no**: allá no existe un botón que arranque un conjunto de servicios en orden, y por eso la fuente no necesita el concepto. Acá sí, y es una capacidad de primera clase, no una concesión al importador.

**Consecuencia sobre la detección de ciclos.** El grafo de arranque es el subgrafo de las aristas **que declaran espera**. RN-05 impide un ciclo de **arranque** sobre ese subgrafo; los ciclos de **valor** —`a.X` que referencia `b.Y` que referencia `a.X`— los cubre RN-22 sobre el grafo completo de referencias, y siguen siendo inadmisibles con independencia de la espera. Son dos cosas distintas en dos reglas distintas, y el reparto no cambia respecto de la segunda pasada: lo único que cambió es qué aristas forman el subgrafo de arranque.

**5 · Convivencia con la expansión de variables de Docker Compose [D-i].** Sigue siendo un criterio dominante del diseño, porque el intake declara importación y exportación de Compose en ambos sentidos (F-13, anexos [E-14](#2014--e-14--exportación-de-un-proyecto-a-docker-compose) y [E-21](#2021--e-21--correspondencia-entre-una-configuración-real-y-el-modelo-de-la-solución)). Compose interpola `$VAR`, `${VAR}` y sus formas con valor por defecto, y escapa el signo con `$$`; la secuencia `${{` **no es una interpolación válida de Compose**, que espera un nombre de variable después de la llave y falla si encuentra otra llave. La convivencia se resuelve así, en las dos direcciones, y no queda librada a que las dos sintaxis no se parezcan:

| Dirección | Resolución declarada | Regla |
|---|---|---|
| Modelo → Compose (exportación) | **Una exportación nunca emite `${{ … }}`.** La referencia ya está resuelta cuando se exporta: si la variable no es secreta se emite su **valor resuelto**; si es secreta se emite el marcador `${CLAVE}` con el archivo de variables vacío, que es lo que la exportación ya hace hoy con cualquier secreto (RN-15). Y **todo `$` que forme parte del valor literal se emite escapado como `$$`**, que es el escape propio de Compose, de modo que Compose lo entregue tal cual en lugar de interpolarlo. La expresión sin resolver no se pierde: se preserva en el **manifiesto propio**, que es JSON y no Compose, igual que el layout del lienzo | RN-25 |
| Compose → modelo (importación) | **La interpolación de Compose nunca produce una referencia.** `${VAR}` y `$VAR` en un archivo Compose son interpolación de Compose, resuelta por Compose contra su archivo de variables al levantar, y se traducen como el anexo E-21 ya declara: variable con `secreta: true` y referencia a secreto. Un `$$` del archivo es el escape de Compose y se importa como un `$` literal. Una ocurrencia literal de `${{` se importa como **texto**, sin interpretarse, y se persiste escapada como `$${{` para que el modelo tampoco la interprete. La **única** referencia que la importación crea es la reexpresión de un `depends_on` explícito sobre una variable cuyo literal ya coincide con el host y el puerto del destino, declarada en el anexo E-21: no nace de una interpolación ni inventa un valor. Fuera de ese caso, las referencias las crea el usuario en la interfaz o la instanciación de un ítem del catálogo | RN-26 |

Las cuatro combinaciones de referencia y literal por sentido quedan cubiertas, que es lo que hace que la ida y vuelta de E-21 a E-14 no pueda producir un archivo que no levanta:

| Valor en el modelo | Qué emite la exportación | Qué reconstruye la importación de eso mismo |
|---|---|---|
| Referencia no secreta, `${{ shared.TZ }}` | El valor resuelto, `America/Argentina/Buenos_Aires` | Un literal. La expresión se recupera del manifiesto propio, no del Compose |
| Referencia secreta, `${{ shared.DB_PASSWORD }}` | `${DB_PASSWORD}` más la entrada vacía en el archivo de variables | Variable secreta con referencia a secreto (RN-15) |
| Literal que contiene `${{`, persistido como `$${{ x }}` | `$${{ x }}`: el escape del modelo y el de Compose coinciden en la forma, y el archivo levanta | El literal `${{ x }}`, persistido otra vez como `$${{ x }}` |
| Literal que contiene `$` o `${VAR}` como texto | `$$` y `$${VAR}` | El literal `$` y `${VAR}`, sin crear referencia ni secreto |

De ahí que las dos sintaxis no se crucen nunca en un mismo archivo con un significado ambiguo: `${VAR}` sólo se interpreta en Compose, `${{ … }}` sólo se interpreta dentro del modelo, y el `$` literal viaja escapado en los dos sentidos.

### §20.5 · E-5 · Changeset de cambios pendientes con su informe de impacto

Citado desde §4 (F-07) y §17.2 P.11. Procedencia: `Analisis-Final-Integrado.md`, líneas 758–803. Estado: `declarado`.

**Contexto.** Cuatro cambios de configuración acumulados sin aplicar sobre el proyecto 12, con el informe de impacto que el sistema presenta antes de ejecutar nada. Es la tarde de ajustes que NB-06 describe: el administrador toca varios servicios y decide, con la consecuencia delante, qué entra en el lote.

**Qué ejercita.** El changeset como borrador con estado propio; la distinción entre cambio de configuración y cambio visual, que no entra (RN-12); el informe de impacto con sus dos listas, la de servicios a redesplegar y la de servicios sin impacto (RN-13); el primer cambio del modelo cuya entidad es `proyecto` y no `servicio`, que es la variable compartida; y el campo `referenciadaPor`, que hace auditable la propagación de un valor compartido y que no se deduce del grafo porque una referencia a una compartida no genera arista.

**Qué verificar.** Que mover un nodo del lienzo se guarde al instante y no entre al changeset ni marque redespliegue (T-22). Que aplicar el changeset redespliegue exactamente `api` y `cache`, y deje a `db` intacta con su despliegue anterior (T-23, T-31). Que eliminar una variable compartida referenciada se rechace con la lista de quienes la referencian (T-41, RN-27). Que el informe se presente **antes** de ejecutar y que ningún servicio fuera de él resulte reemplazado. Y que los anexos [E-1](#201--e-1--proyecto-con-layout-de-lienzo), [E-2](#202--e-2--servicio-con-sus-tres-variantes-de-origen) y [E-14](#2014--e-14--exportación-de-un-proyecto-a-docker-compose) sigan mostrando el valor **anterior** de `TZ`, porque el changeset está pendiente: la coherencia entre anexos es parte de lo que hay que verificar.

```json
{
  "id": 331,
  "proyectoId": 12,
  "estado": "pendiente",
  "creadoEn": "2026-07-26T10:02:00-03:00",
  "mensaje": null,
  "cambios": [
    {
      "id": 1,
      "tipo": "servicio-agregado",
      "entidad": "servicio",
      "entidadId": null,
      "resumen": "Nuevo servicio 'cache' (imagen-oficial/redis:7.4)",
      "antes": null,
      "despues": { "nombre": "cache", "imagen": "imagen-oficial/redis", "etiqueta": "7.4" },
      "requiereRedespliegueDe": ["cache"]
    },
    {
      "id": 2,
      "tipo": "variable-modificada",
      "entidad": "servicio",
      "entidadId": 101,
      "resumen": "api · REDIS_URL: (sin valor) -> cache:6379",
      "antes": { "clave": "REDIS_URL", "valor": null },
      "despues": { "clave": "REDIS_URL", "valor": "cache:6379" },
      "requiereRedespliegueDe": ["api"]
    },
    {
      "id": 3,
      "tipo": "nodo-movido",
      "entidad": "canvas",
      "entidadId": 103,
      "resumen": "db movido a (560, 320)",
      "antes": { "x": 520, "y": 300 },
      "despues": { "x": 560, "y": 320 },
      "requiereRedespliegueDe": []
    },
    {
      "id": 4,
      "tipo": "variable-compartida-modificada",
      "entidad": "proyecto",
      "entidadId": 12,
      "resumen": "Proyecto · TZ: America/Argentina/Buenos_Aires -> UTC",
      "antes": { "clave": "TZ", "valor": "America/Argentina/Buenos_Aires" },
      "despues": { "clave": "TZ", "valor": "UTC" },
      "referenciadaPor": [ { "servicio": "api", "clave": "TZ" } ],
      "requiereRedespliegueDe": ["api"]
    }
  ],
  "impacto": {
    "serviciosARedesplegar": ["api", "cache"],
    "serviciosSinImpacto": ["db"],
    "conflictosIp": []
  }
}
```

**Cambio 4, incorporado el 2026-07-28 (D-5 y D-6) [D].** Una variable compartida del proyecto entra al changeset como cualquier otro cambio de configuración, con dos particularidades:

- Su `entidad` es `proyecto`, no `servicio`: es el primer cambio del modelo que no cuelga de un servicio. El informe de impacto no cambia de forma por eso, porque lo que declara son servicios a redesplegar.
- El sentido del cambio importa para leer bien los demás anexos: el changeset 331 está **pendiente**, de modo que el estado aplicado del proyecto es el `antes`. Por eso el anexo [E-1](#201--e-1--proyecto-con-layout-de-lienzo) muestra `TZ = "America/Argentina/Buenos_Aires"`, el anexo [E-2](#202--e-2--servicio-con-sus-tres-variantes-de-origen) muestra la variable `TZ` de `api` resuelta a ese mismo valor, y el anexo [E-14](#2014--e-14--exportación-de-un-proyecto-a-docker-compose) lo exporta así. `UTC` es el valor que el proyecto tendría **después** de aplicar, y no aparece en ningún otro anexo justamente porque todavía no se aplicó.
- El campo `referenciadaPor` es lo que hace auditable la propagación: enumera qué variable de qué servicio quedará obsoleta si el cambio se aplica, y es lo que alimenta `requiereRedespliegueDe`. Se obtiene de la enumeración indexada de las variables con referencia y el parseo de sus ocurrencias que declara el anexo [E-9](#209--e-9--esquema-relacional-de-la-base-sqlite), porque una referencia a una variable compartida no genera arista y por lo tanto no se deduce del grafo.

El informe de impacto no cambia respecto de la versión anterior del ejemplo: `api` ya figuraba entre los servicios a redesplegar por el cambio 2, y el cambio 4 lo confirma por otra vía. `db` sigue sin impacto, porque no referencia `TZ`.

### §20.6 · E-6 · Ítem del catálogo de servicios reutilizables

Citado desde §4 (F-14). Procedencia: `Analisis-Final-Integrado.md`, líneas 815–854, reescrito el 2026-07-28 por la decisión D-7. Estado: `declarado`.

**Contexto.** Dos ítems del catálogo —uno de un solo servicio, que es el caso frecuente, y uno multi-servicio con la arista entre sus dos nodos y una variable compartida que la plantilla declara— más el envoltorio del archivo de exportación del catálogo completo, con su versión de formato. Representa el momento en que el administrador convierte en activo reutilizable algo que ya resolvió una vez.

**Qué ejercita.** El catálogo como **cuarta vía de alta** y no como cuarto origen de imagen; el ítem como subgrafo parametrizado que al instanciarse crea N servicios y N contenedores (RN-30); la convivencia de las tres sintaxis —`{{ parametro }}` del instanciador, `${{ camino }}` del resolutor de referencias y `${VAR}` de Compose— con su orden de resolución por etapas; el `idLocal`, que sostiene la parametrización del nombre sin anidar huecos dentro de una expresión de referencia; y la conversión determinista del formato 1 al 2.

**Qué verificar.** Que instanciar el ítem multi-servicio cree dos servicios, dos contenedores y una arista con espera declarada, y que ninguna expresión persistida conserve un `{{ }}` de parámetro (T-43). Que un nombre de servicio que ya existe en el proyecto destino se **sufije con aviso**, sin rechazar y sin preguntar (T-60, RN-36). Que una clave de variable compartida que ya existe no sea conflicto: con el mismo valor se advierte ofreciendo reusar, con distinto valor se crean separadas y se avisa, y en ninguno de los dos casos se bloquea (T-61, T-62, RN-37). Que ningún servicio instanciado comparta contenedor con otro (I2). Y que un archivo de `version: 1` siga siendo importable, envolviendo su plantilla en un subgrafo de un nodo sin pérdida.

**Qué es el catálogo [D], D-7 del 2026-07-28.** Es la **cuarta vía de alta de un servicio**, no un cuarto origen: las tres variantes de origen del anexo [E-2](#202--e-2--servicio-con-sus-tres-variantes-de-origen) —imagen de registro, repositorio remoto y Dockerfile local— siguen siendo tres, y un ítem del catálogo es una plantilla parametrizada que, **al instanciarse, resuelve a** una de ellas. La distinción está tomada de que el producto de referencia lista `Template` en el mismo menú de creación de servicio que `Docker Image` y `GitHub Repository`, y define la entidad como *"Templates provide a way to jumpstart a project by packaging a service or set of services into a reusable, distributable format"* (`Analisis-Rayway.md` §3.2 **[E]** respecto de ese documento, tanto la definición de la entidad como la enumeración del menú). Tres notas que evitan la confusión más probable:

- **Nada del catálogo corre.** Sus ítems son definiciones en reposo: no tienen despliegue, no tienen contenedor, no ocupan dirección y no aparecen en ningún lienzo hasta instanciarse.
- **El catálogo arranca vacío** en una instalación nueva, y se puebla cuando el usuario guarda un servicio como plantilla o importa un catálogo exportado.
- **Un ítem contiene un subgrafo**, es decir uno o varios servicios con sus aristas. Al instanciarlo se crean N servicios, cada uno con **su propio contenedor**, más los enlaces entre ellos (RN-30). Empaquetar varios servicios en un mismo contenedor violaría la invariante I2 y está prohibido; el mecanismo es el que F-13 ya exige al importar un archivo Compose, que crea varios servicios con sus enlaces de una sola vez, con parámetros encima.

Ítem de un solo servicio, que es el caso más frecuente. La plantilla es un subgrafo de un nodo y ninguna arista:

```json
{
  "id": "cat-postgres-16",
  "nombre": "PostgreSQL 16",
  "categoria": "base-de-datos",
  "icono": "database",
  "version": 4,
  "plantilla": {
    "servicios": [
      {
        "nombre": "{{ slug }}-db",
        "origen": { "tipo": "imagen", "imagen": "imagen-oficial/postgres", "etiqueta": "16-alpine", "politicaActualizacion": "fijada" },
        "puertos": [ { "contenedor": 5432, "protocolo": "tcp", "publicar": false } ],
        "variables": [
          { "clave": "POSTGRES_DB", "valor": "{{ nombreBase }}", "secreta": false },
          { "clave": "POSTGRES_USER", "valor": "{{ usuario }}", "secreta": false },
          { "clave": "POSTGRES_PASSWORD", "valor": "{{ password }}", "secreta": true }
        ],
        "montajes": [ { "tipo": "volumen", "nombre": "{{ slug }}-datos", "destino": "/var/lib/postgresql/data" } ],
        "recursos": { "limiteMemoriaMb": 1024 },
        "politicaReinicio": "unless-stopped",
        "healthcheck": { "modo": "propio", "comando": "pg_isready -U {{ usuario }}", "intervaloSegundos": 30 }
      }
    ],
    "enlaces": []
  },
  "parametros": [
    { "clave": "nombreBase", "etiqueta": "Nombre de la base", "tipo": "texto", "requerido": true, "porDefecto": "app" },
    { "clave": "usuario", "etiqueta": "Usuario", "tipo": "texto", "requerido": true, "porDefecto": "app" },
    { "clave": "password", "etiqueta": "Contraseña", "tipo": "secreto", "requerido": true, "generar": true },
    { "clave": "slug", "etiqueta": "Prefijo de recursos", "tipo": "texto", "requerido": true }
  ],
  "exportadoEn": "2026-07-28T09:00:00-03:00"
}
```

Ítem multi-servicio, que es la ampliación de alcance de D-7: dos servicios y la arista entre ellos, más una variable compartida del proyecto que la plantilla declara y que la instanciación crea si no existe:

```json
{
  "id": "cat-api-con-base",
  "nombre": "API con base PostgreSQL",
  "categoria": "stack",
  "icono": "layers",
  "version": 1,
  "plantilla": {
    "variablesCompartidas": [
      { "clave": "DB_PASSWORD", "valor": "{{ password }}", "secreta": true }
    ],
    "servicios": [
      {
        "idLocal": "db",
        "nombre": "{{ slug }}-db",
        "origen": { "tipo": "imagen", "imagen": "imagen-oficial/postgres", "etiqueta": "16-alpine", "politicaActualizacion": "fijada" },
        "puertos": [ { "contenedor": 5432, "protocolo": "tcp", "publicar": false } ],
        "variables": [
          { "clave": "POSTGRES_DB", "valor": "{{ nombreBase }}", "secreta": false },
          { "clave": "POSTGRES_USER", "valor": "{{ usuario }}", "secreta": false },
          { "clave": "POSTGRES_PASSWORD", "valor": null, "secreta": true, "referencia": "${{ shared.DB_PASSWORD }}" }
        ],
        "montajes": [ { "tipo": "volumen", "nombre": "{{ slug }}-datos", "destino": "/var/lib/postgresql/data" } ],
        "recursos": { "limiteMemoriaMb": 1024 },
        "politicaReinicio": "unless-stopped",
        "healthcheck": { "modo": "propio", "comando": "pg_isready -U {{ usuario }}", "intervaloSegundos": 30 }
      },
      {
        "idLocal": "api",
        "nombre": "{{ slug }}-api",
        "origen": { "tipo": "imagen", "imagen": "{{ imagenApi }}", "etiqueta": "{{ etiquetaApi }}", "politicaActualizacion": "fijada" },
        "puertos": [ { "contenedor": 8080, "protocolo": "tcp", "publicar": true } ],
        "variables": [
          { "clave": "ConnectionStrings__Default", "valor": null, "secreta": false, "origen": "enlace" },
          { "clave": "DB_PASSWORD", "valor": null, "secreta": true, "referencia": "${{ shared.DB_PASSWORD }}" }
        ],
        "recursos": { "limiteMemoriaMb": 512, "limiteCpus": 1.0 },
        "politicaReinicio": "unless-stopped"
      }
    ],
    "enlaces": [
      {
        "origen": "api",
        "destino": "db",
        "claveVariable": "ConnectionStrings__Default",
        "referencia": "Host=${{ db.SELFHOSTED_HOST }};Port=5432;Database={{ nombreBase }};Username={{ usuario }}"
      }
    ]
  },
  "parametros": [
    { "clave": "slug", "etiqueta": "Prefijo de recursos", "tipo": "texto", "requerido": true },
    { "clave": "nombreBase", "etiqueta": "Nombre de la base", "tipo": "texto", "requerido": true, "porDefecto": "app" },
    { "clave": "usuario", "etiqueta": "Usuario", "tipo": "texto", "requerido": true, "porDefecto": "app" },
    { "clave": "password", "etiqueta": "Contraseña de la base", "tipo": "secreto", "requerido": true, "generar": true },
    { "clave": "imagenApi", "etiqueta": "Imagen de la API", "tipo": "texto", "requerido": true },
    { "clave": "etiquetaApi", "etiqueta": "Etiqueta de la imagen", "tipo": "texto", "requerido": true, "porDefecto": "latest" }
  ],
  "exportadoEn": "2026-07-28T09:00:00-03:00"
}
```

Qué hay que entender de este segundo ítem:

- Instanciarlo con `slug=portal` crea **dos servicios**, `portal-db` y `portal-api`, **dos contenedores** y **un enlace** entre ellos. Ningún contenedor se comparte: sigue valiendo I2 (RN-30).
- Los huecos de plantilla se escriben `{{ parametro }}` —doble llave **sin** `$`—, que es la sintaxis que el ítem de catálogo ya usaba en la versión 1.1. Conviven tres formas y hay que declarar cómo, porque dos de ellas se parecen:

| Forma | Quién la interpreta | Cuándo se resuelve |
|---|---|---|
| `{{ parametro }}` | El instanciador del catálogo | Al instanciar el ítem, en el backend |
| `${{ camino }}` | El resolutor de referencias del modelo | Antes de crear el contenedor (RN-24) |
| `${VAR}` | Docker Compose | Al levantar el archivo exportado, fuera del producto |

- **Un hueco de parámetro no puede aparecer dentro de una expresión de referencia [D-i].** La regla existe porque anidarlos produce dos cierres `}}` consecutivos y una expresión ambigua, y porque violaría la forma canónica de E-4, que exige el camino sin espacios internos. Por eso la variable compartida de esta plantilla se llama `DB_PASSWORD` y no `{{ slug }}_DB_PASSWORD`: la referencia queda `${{ shared.DB_PASSWORD }}`, canónica y parseable sin sustituir nada. El orden de resolución es, entonces, estrictamente por etapas: **primero** se sustituyen los parámetros al instanciar —y a partir de ahí no queda ningún `{{ }}` en la base—, **después** se resuelven las referencias al desplegar. Ninguna etapa produce entrada para la anterior.
- La contrapartida es que una clave de variable compartida sin parametrizar puede colisionar con una ya existente en el proyecto destino. Qué hace la instanciación en ese caso **no está decidido** y figura entre las pendientes de §19; no se resuelve acá.
- **`idLocal` es lo que resuelve el anidamiento de sintaxis.** Cada servicio de la plantilla lleva un identificador local fijo —`db`, `api`— además de su `nombre` parametrizado. Las referencias y los enlaces nombran el `idLocal`, que es un identificador plano sin huecos, de modo que la expresión queda canónica: `${{ db.SELFHOSTED_HOST }}` y no la forma anidada, que sería ambigua por sus dos cierres `}}` consecutivos. Al instanciar, el sistema reescribe el segmento de servicio de cada referencia con el nombre final —`portal2-db`—, que es algo que ya debe hacer porque las referencias nombran servicios. Así se cumple la prohibición de anidar un hueco de parámetro dentro de una expresión de referencia sin perder la parametrización del nombre, y los identificadores definitivos siguen sin existir hasta la instanciación.

Envoltorio del archivo de exportación del catálogo completo, con versión de formato. **Sube de 1 a 2** por el cambio de forma de `plantilla`, que pasa de un servicio suelto a un subgrafo:

```json
{
  "formato": "selfhosted-catalogo",
  "version": 2,
  "exportadoEn": "2026-07-28T09:00:00-03:00",
  "items": [ "...items de catalogo..." ]
}
```

Un archivo con `version: 1` sigue siendo importable: un ítem de formato 1 tiene la plantilla de un servicio suelto y se convierte a formato 2 envolviéndola en `servicios: [ … ]` con `enlaces: []`. La conversión es determinista y no pierde nada, porque un ítem de formato 1 es exactamente un subgrafo de un nodo.

### §20.7 · E-7 · Descubrimiento de contenedores adoptables

Citado desde §6 (flujo 2). Procedencia: `Analisis-Final-Integrado.md`, líneas 861–892. Estado: `declarado`.

**Contexto.** La lista de candidatos que devuelve el descubrimiento sobre el servidor de referencia, con lo que se sabe de cada contenedor y con los que no son incorporables marcados y con su motivo escrito. Es el primer paso del flujo que hace adoptable la solución sobre un servidor que ya está en producción.

**Qué ejercita.** Las seis reglas de adopción RA-01 a RA-06; el descubrimiento en modo sólo lectura, donde listar no habilita operar; el campo `variablesSugeridasComoSecretas`, que es la sugerencia de la heurística y ya no una decisión (D-2); la exclusión del contenedor que monta el socket del motor, por la dependencia circular de control que crearía (RA-04); y el filtro del contenedor ya adoptado, que es el fundamento de la invariante I10 cerrado por D-3.

**Qué verificar.** Que un contenedor ya adoptado por otro proyecto aparezca deshabilitado, con el proyecto que lo tomó, y no vuelva a ofrecerse (T-15, RN-11). Que el caso C-1, que monta el socket, salga con `adoptable: false` y motivo declarado, forzable sólo con confirmación explícita (T-16). Que la heurística **sugiera y no decida**: una variable que no coincide con ninguno de sus fragmentos llega al paso de clasificación desmarcada, no en claro y sin aviso (T-17). Que una que sí coincide llegue premarcada con su motivo de sugerencia (T-17b). Y que ninguna operación de escritura se habilite desde el descubrimiento.

```json
{
  "descubiertoEn": "2026-07-26T10:20:00-03:00",
  "candidatos": [
    {
      "contenedorId": "b71c9d4a2f10",
      "nombre": "print-server",
      "imagen": "registro-privado/print-server:1.4.18",
      "estado": "running",
      "creadoEn": "2026-05-02T11:00:00-03:00",
      "redes": [ { "nombre": "infra_vlan", "modo": "macvlan", "ip": "192.168.1.139" } ],
      "montajes": [ { "tipo": "bind", "origen": "/srv/despliegues/print-server/data", "destino": "/data" } ],
      "variablesDetectadas": 4,
      "variablesSugeridasComoSecretas": ["ADMIN_TOKEN"],
      "etiquetasCompose": { "proyecto": "print-server", "servicio": "print-server" },
      "adoptable": true,
      "motivoNoAdoptable": null,
      "yaAdoptadoPor": null
    },
    {
      "contenedorId": "1a2b3c4d5e6f",
      "nombre": "panel-admin",
      "imagen": "imagen-oficial/panel-ce:latest",
      "estado": "running",
      "redes": [ { "nombre": "infra_vlan", "modo": "macvlan", "ip": "192.168.1.130" } ],
      "montajes": [ { "tipo": "socket", "origen": "/var/run/docker.sock", "destino": "/var/run/docker.sock" } ],
      "adoptable": false,
      "motivoNoAdoptable": "monta-el-socket-de-docker",
      "yaAdoptadoPor": null
    }
  ]
}
```

Reglas de adopción que este ejemplo materializa:

| Regla | Comportamiento |
|---|---|
| RA-01 | Un contenedor ya adoptado por otro proyecto no vuelve a ofrecerse; se muestra en gris con el proyecto que lo tomó |
| RA-02 | La adopción importa la configuración observada (imagen, red, dirección, montajes, variables no secretas) y crea el servicio sin recrear el contenedor |
| RA-03 | El contenedor adoptado queda vinculado por su identificador; si desaparece del motor, el servicio queda huérfano y se ofrece redesplegarlo desde la configuración importada |
| RA-04 | Un contenedor que monta el socket de Docker se marca no adoptable por defecto, porque gobernarlo desde el administrador crearía una dependencia circular de control. Puede forzarse con confirmación explícita |
| RA-05 | **Reescrita el 2026-07-28 por D-2 [D].** La heurística por nombre —claves que contienen `PASSWORD`, `TOKEN`, `SECRET`, `KEY` o `PAT`— **sugiere, no decide**: las variables que coinciden se ofrecen **premarcadas** como secretas en el paso de clasificación, y el campo `variablesSugeridasComoSecretas` del descubrimiento es esa sugerencia. Lo que queda marcado como secreto al confirmar se importa enmascarado y requiere recarga manual; lo que queda desmarcado se importa como valor literal. La heurística ya no determina por sí sola el valor de `secreta` |
| RA-06 | **Nueva el 2026-07-28 por D-2 [D].** La adopción **no se completa** sin el paso de clasificación de variables: el usuario ve **todas** las variables importadas, no sólo las sugeridas, y puede marcar o desmarcar cualquiera. Es un paso obligatorio del flujo, no una pantalla opcional que se pueda saltear. Formalizado en RN-29 y detallado en el anexo [E-11](#2011--e-11--adopción-de-un-contenedor-existente) |

**Por qué la heurística deja de decidir [D], D-2.** El defecto que motivó el cambio está transcripto en el caso C-2 del anexo [E-20](#2020--e-20--configuraciones-reales-de-contenedor-ofuscadas): una configuración real del parque lleva una clave simétrica en una variable llamada `ClaveMaestra`, que no contiene ninguno de los cinco fragmentos de la heurística. Con la regla anterior esa clave se importaba en claro y nadie se enteraba. De las tres resoluciones que C-2 planteaba —ampliar la lista de fragmentos, agregar una heurística sobre la forma del valor, o pedir confirmación de cada variable importada—, el agente humano del proyecto eligió la tercera, que es la única que no vuelve a apostar a que la lista de fragmentos esté completa. Las otras dos no quedan prohibidas: pueden sumarse como fuentes de sugerencia, porque sugerir mejor no cambia quién decide.

### §20.8 · E-8 · Reserva de direcciones IP e informe de conflicto

Citado desde §6 (flujo 3), §16.1, §17.1 P.3 y §18 (SM-05). Procedencia: `Analisis-Final-Integrado.md`, líneas 906–946 y 1974–1995. Estado: `declarado`.

**Contexto.** El rango de direcciones gestionado con sus reservas, y el informe que devuelve el intento de arrancar un proyecto cuya dirección está ocupada por un servicio activo de otro proyecto, con el algoritmo que lo produce y la respuesta de error de la API. Es el momento que NB-05 describe: el conflicto se descubre antes de tocar el motor y no después de que algo falló.

**Qué ejercita.** El conflicto de direcciones como regla de negocio verificada y no como accidente del motor (RN-03); la pertenencia obligatoria al rango gestionado y el respeto de las exclusiones (RN-06); las tres resoluciones ofrecidas; el arranque parcial como estado declarado y no como falla silenciosa (RN-20); la reserva por réplica, con su clave `(servicio_id, numero_replica)`; y el formato de error `ProblemDetails` con miembros de extensión.

**Qué verificar.** Que la regla compare contra servicios **activos** y no contra servicios configurados: con el ocupante detenido, el arranque procede (T-05, T-06). Que dos servicios del mismo proyecto con la misma dirección se bloqueen siempre (T-07). Que una dirección fuera del rango o excluida se rechace con la siguiente libre sugerida (T-08, T-09). Que arrancar un proyecto de tres servicios con uno en conflicto levante los otros dos y deje el proyecto `parcialmente-activo` (T-24). Que la validación se resuelva sin consultar al motor, dentro del umbral que NB-05 fija para un proyecto de hasta treinta servicios. Y que el informe identifique al ocupante por servicio y por proyecto, que es lo que evita la investigación posterior.

Rango gestionado y reservas:

```json
{
  "rangoGestionado": {
    "subred": "192.168.1.128/26",
    "desde": "192.168.1.129",
    "hasta": "192.168.1.190",
    "gateway": "192.168.1.1",
    "interfazPadre": "enp1s0",
    "excluidas": ["192.168.1.129"],
    "nota": "Debe estar excluido del rango que reparte el servidor DHCP de la red"
  },
  "reservas": [
    { "direccion": "192.168.1.130", "servicioId": 201, "proyectoId": 5, "servicio": "panel-admin", "activa": true },
    { "direccion": "192.168.1.139", "servicioId": 305, "proyectoId": 7, "servicio": "print-server", "activa": true },
    { "direccion": "192.168.1.139", "servicioId": 412, "proyectoId": 9, "servicio": "print-server-pruebas", "activa": false }
  ]
}
```

Informe de conflicto que devuelve el intento de arrancar el proyecto SelfHosted 9:

```json
{
  "proyectoId": 9,
  "puedeArrancar": false,
  "verificadoEn": "2026-07-26T10:31:00-03:00",
  "conflictos": [
    {
      "direccion": "192.168.1.139",
      "servicioSolicitante": { "id": 412, "nombre": "print-server-pruebas", "proyectoId": 9 },
      "ocupadaPor": { "id": 305, "nombre": "print-server", "proyectoId": 7, "proyecto": "Impresion 3D", "despliegueId": 5310, "estado": "activo" },
      "resolucionesPosibles": [
        { "accion": "detener-proyecto-en-conflicto", "objetivoId": 7, "etiqueta": "Detener el proyecto 'Impresion 3D'" },
        { "accion": "reasignar-ip", "sugerencia": "192.168.1.141", "etiqueta": "Asignar la siguiente IP libre del rango" },
        { "accion": "arrancar-parcial", "excluye": [412], "etiqueta": "Arrancar los demas servicios del proyecto" }
      ]
    }
  ],
  "serviciosSinConflicto": [410, 411]
}
```

Algoritmo de validación que produce ese informe:

```text
funcion validarArranque(proyectoId):
    conflictos = []
    servicios = serviciosConIpFija(proyectoId)

    para cada s en servicios:
        ocupante = buscarServicioActivoConIp(s.ip)     # indice sobre reservas_ip y despliegues activos
        si ocupante existe y ocupante.proyectoId != proyectoId:
            conflictos.agregar({ ip: s.ip, solicitante: s, ocupante: ocupante })

    # Colision dentro del propio proyecto: siempre invalida
    para cada par (a, b) en servicios con a.ip == b.ip:
        conflictos.agregar({ ip: a.ip, tipo: "duplicado-interno", servicios: [a, b] })

    # La IP debe pertenecer al rango gestionado y no estar excluida
    para cada s en servicios:
        si no perteneceAlRangoGestionado(s.ip) o estaExcluida(s.ip):
            conflictos.agregar({ ip: s.ip, tipo: "fuera-de-rango", servicio: s })

    si conflictos esta vacio: devolver PERMITIDO
    devolver BLOQUEADO con conflictos y resoluciones posibles
```

Respuesta de error de la API cuando el arranque se bloquea, en formato `ProblemDetails`. Procedencia: líneas 1666–1682.

```json
{
  "type": "https://selfhosted.local/errores/conflicto-ip",
  "title": "Conflicto de direcciones IP",
  "status": 409,
  "detail": "El servicio 'print-server-pruebas' solicita 192.168.1.139, ocupada por un servicio activo de otro proyecto.",
  "instance": "/api/v1/proyectos/9/arrancar",
  "conflictos": [
    {
      "direccion": "192.168.1.139",
      "servicioSolicitante": "print-server-pruebas",
      "proyectoEnConflicto": "Impresion 3D",
      "servicioEnConflicto": "print-server"
    }
  ]
}
```

### §20.9 · E-9 · Esquema relacional de la base SQLite

Citado desde §16.1, §17.3 P.4, §17.4 P.4 y §18 (SM-03). Procedencia: `Analisis-Final-Integrado.md`, líneas 954–1096, ampliado el 2026-07-28 con la tabla `variables_proyecto` (D-5), con el discriminador de origen de la arista y la persistencia de la referencia sin resolver (D-6) y con el subgrafo del ítem de catálogo (D-7). Estado: `declarado`.

**Contexto.** El esquema relacional completo de la base de la solución, con sus tablas, claves, restricciones de coherencia e índices. Es la forma persistida de todo lo que los demás anexos describen como modelo, y el insumo de la categoría de arquitectura técnica, en sus secciones de las capas `Domain` e `Infrastructure`.

**Qué ejercita.** La persistencia de las entidades del modelo y de las incorporaciones del 2026-07-28: la tabla `variables_proyecto` con su clave (D-5), las columnas de la arista que sostienen la espera declarada y el puerto de destino (D-10, D-11), las columnas `referencia` y `resuelta_en` de la variable (D-6), el subgrafo del ítem de catálogo (D-7) y los índices `ix_enlaces_destino` e `ix_variables_referencia`, cada uno con la consulta que sirve. Ejercita además el índice único parcial que hace cumplir la unicidad de la arista de espera sin variable, que la clave única de la tabla no alcanza a expresar con columnas nulas.

**Qué verificar.** Que cada restricción declarada tenga su caso de prueba en el anexo [E-22](#2022--e-22--casos-de-prueba-derivados-de-las-configuraciones-reales) y ninguna quede sin verificar. Que ningún ciclo de resolución pueda atravesar el nivel proyecto, cosa que el esquema hace cumplir por ausencia de columna y no por regla de aplicación (RN-22). Que la localización de las referencias funcione en dos pasos —índice parcial para acotar el conjunto y parseo de las ocurrencias— y no por recorrido completo ni por búsqueda de texto. Y que la Fase C, al modelar el secreto, la red del proyecto y el volumen como objetos con identidad (§24.3), lo haga sin contradecir lo que este anexo ya persiste: el anexo refleja **que** esos elementos son objetos, no **cómo** se persisten.

```sql
CREATE TABLE proyectos (
    id                INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre            TEXT    NOT NULL,
    slug              TEXT    NOT NULL UNIQUE,
    descripcion       TEXT,
    auto_arranque     INTEGER NOT NULL DEFAULT 0,   -- 0/1
    red_json          TEXT    NOT NULL DEFAULT '{}',
    canvas_json       TEXT    NOT NULL DEFAULT '{}',
    creado_en         TEXT    NOT NULL,
    modificado_en     TEXT    NOT NULL
);

-- Variables compartidas del proyecto (D-5). Cuelgan del proyecto, no de un
-- servicio, y son referenciables desde cualquiera de sus servicios con la
-- forma `${{ shared.CLAVE }}`. Mismo tratamiento del secreto que `variables`:
-- `valor` queda en NULL cuando `secreta` = 1 y el material viaja por
-- `referencia_secreto`. La consulta habitual es siempre dentro de un proyecto,
-- de modo que alcanza con un indice por `proyecto_id`.
--
-- La tabla NO tiene columna `referencia` [D-i]: una variable compartida contiene
-- siempre un literal o material secreto, nunca una expresion `${{ ... }}`. La
-- ausencia de la columna es la forma en que el esquema hace cumplir esa
-- restriccion, argumentada en E-4 punto 2, y es lo que acota RN-22 a los ciclos
-- entre variables de servicio: ningun ciclo de resolucion puede atravesar el
-- nivel proyecto.
CREATE TABLE variables_proyecto (
    id                 INTEGER PRIMARY KEY AUTOINCREMENT,
    proyecto_id        INTEGER NOT NULL REFERENCES proyectos(id) ON DELETE CASCADE,
    clave              TEXT    NOT NULL,
    valor              TEXT,                         -- NULL si es secreta
    secreta            INTEGER NOT NULL DEFAULT 0,
    referencia_secreto TEXT,
    descripcion        TEXT,
    creado_en          TEXT    NOT NULL,
    modificado_en      TEXT    NOT NULL
    -- SIN clave unica sobre (proyecto_id, clave): desde D-12 la clave de una
    -- variable compartida NO exige unicidad, porque es descriptiva y no la lee
    -- ningun proceso. Dos compartidas pueden llamarse igual y se distinguen por
    -- identidad (RN-28). Que dos coincidan ademas en el valor es materia de la
    -- advertencia de RN-37, no de una restriccion.
);

-- Se crea antes que `servicios` porque `variables` referencia a ambas.
-- Las claves foraneas hacia `servicios` las agrega EF Core en la migracion
-- (SQLite las valida en tiempo de ejecucion, no de definicion).
--
-- Una arista materializa una dependencia de un servicio con otro. Casi siempre
-- nace de una referencia de `clave_variable` del origen a `clave_destino` del
-- destino; desde la tercera pasada tambien puede existir SIN variable, cuando
-- su unica razon de ser es la espera (D-11). No hay discriminador de tipo: el
-- enlace que se traza en el lienzo es azucar de interfaz que escribe una
-- referencia a las variables provistas del destino.
--
-- La arista tiene DOS EJES INDEPENDIENTES, y de ahi salen sus columnas nuevas:
--   `espera_destino` se PERSISTE porque la declara el usuario (D-11). El sistema
--     propone el valor al crear la arista -- si la referencia apunta al host,
--     propone 1 -- y el usuario lo cambia. Define el grafo de arranque: RN-05 y
--     RN-14 operan sobre el subgrafo de las aristas con espera_destino = 1.
--   "referencia el host" NO se persiste: se deduce de clave_destino =
--     'SELFHOSTED_HOST'. Es lo unico que decide la exigencia de canal
--     alcanzable de RN-04. Esperar y referenciar el host son independientes.
--
-- `puerto_destino` es REGISTRO DE DEPENDENCIA, no mecanismo de resolucion
-- (D-10). Desde D-9 el puerto se escribe literal en la expresion, de modo que
-- esta columna no participa de resolver nada: existe para que cambiar el puerto
-- de un servicio marque con precision que otros quedan desactualizados, sin
-- tener que buscar el numero por texto. Es NULL cuando la arista no involucra
-- un puerto.
--
-- Una misma variable puede contener varias referencias y sostener entonces
-- varias filas, que se distinguen por `clave_destino`. El lienzo dibuja una
-- arista por par de servicios y agrupa las filas debajo.
--
-- Por eso `variables` no lleva `enlace_id`: la relacion no es uno a uno y no hay
-- una arista que apuntar desde la variable. El vinculo se reconstruye desde aca,
-- con (origen_servicio_id, clave_variable), o parseando la expresion.
CREATE TABLE enlaces (
    id                  INTEGER PRIMARY KEY AUTOINCREMENT,
    proyecto_id         INTEGER NOT NULL REFERENCES proyectos(id) ON DELETE CASCADE,
    origen_servicio_id  INTEGER NOT NULL,
    destino_servicio_id INTEGER NOT NULL,
    clave_variable      TEXT,                        -- variable del origen que contiene la referencia; NULL si la arista es solo de espera
    clave_destino       TEXT,                        -- variable del destino que se referencia; NULL en el mismo caso
    puerto_destino      INTEGER,                     -- registro de dependencia (D-10); NULL si la arista no involucra puerto
    espera_destino      INTEGER NOT NULL DEFAULT 0,  -- 0/1, propiedad declarada (D-11)
    estado              TEXT    NOT NULL DEFAULT 'pendiente',
    creado_en           TEXT    NOT NULL,
    CHECK (origen_servicio_id <> destino_servicio_id),
    -- Una arista tiene que aportar algo: o referencia una variable, o declara
    -- espera. Las dos columnas de referencia van juntas o no van.
    CHECK ((clave_variable IS NULL) = (clave_destino IS NULL)),
    CHECK (clave_variable IS NOT NULL OR espera_destino = 1),
    UNIQUE (origen_servicio_id, clave_variable, destino_servicio_id, clave_destino)
);

CREATE TABLE servicios (
    id                INTEGER PRIMARY KEY AUTOINCREMENT,
    proyecto_id       INTEGER NOT NULL REFERENCES proyectos(id) ON DELETE CASCADE,
    nombre            TEXT    NOT NULL,
    descripcion       TEXT,
    origen_json       TEXT    NOT NULL,             -- imagen | repositorio | dockerfile
    red_json          TEXT    NOT NULL,             -- modo, alias, ip fija, interfaz padre
    puertos_json      TEXT    NOT NULL DEFAULT '[]',
    montajes_json     TEXT    NOT NULL DEFAULT '[]',
    dispositivos_json TEXT    NOT NULL DEFAULT '[]',
    recursos_json     TEXT    NOT NULL DEFAULT '{}',
    healthcheck_json  TEXT    NOT NULL DEFAULT '{}',
    replicas          INTEGER NOT NULL DEFAULT 1,
    politica_reinicio TEXT    NOT NULL DEFAULT 'unless-stopped',
    auto_arranque     INTEGER NOT NULL DEFAULT 1,
    efimero           INTEGER NOT NULL DEFAULT 0,
    adopcion_json     TEXT,                          -- NULL si no fue adoptado
    pos_x             REAL    NOT NULL DEFAULT 0,
    pos_y             REAL    NOT NULL DEFAULT 0,
    creado_en         TEXT    NOT NULL,
    modificado_en     TEXT    NOT NULL,
    UNIQUE (proyecto_id, nombre)
);

-- `referencia` guarda la expresion `${{ ... }}` SIN resolver, en su FORMA
-- VINCULADA: el segmento de servicio lleva el identificador del destino y no
-- solo su nombre -- `${{ db#103.SELFHOSTED_HOST }}` -- de modo que renombrar
-- un servicio no rompe ninguna referencia (D-8, RN-33). El nombre que precede
-- al `#` es render y se refresca; el vinculo es el identificador. La forma
-- legible, sin `#id`, es la que se escribe, la que se muestra y la que se
-- exporta al manifiesto propio, que tiene que ser portable a otra instalacion.
-- Dos expresiones se comparan por su forma vinculada, ignorando el render.
-- Es la fuente de
-- verdad de la variable cuando no es NULL (D-6). `valor` guarda la ultima
-- resolucion, que es una materializacion y no un dato editable a mano: se
-- reescribe en cada resolucion y `resuelta_en` la fecha. La expresion se
-- persiste en forma canonica -- `${{`, un espacio, el camino, un espacio, `}}` --,
-- lo que hace determinista el parseo y comparable el "antes -> despues" del
-- changeset.
--
-- Como se localiza quien referencia a una variable dada [D-i]. NO se resuelve
-- por igualdad sobre esta columna: una referencia puede ir interpolada dentro
-- de un valor mas largo y puede haber mas de una en el mismo valor, de modo que
-- la columna no guarda la expresion sino el valor entero que la contiene --
-- E-2 persiste "http://api:${{ PUERTO_HTTP }}/salud" --. Se resuelve en dos
-- pasos: el indice parcial `ix_variables_con_referencia` enumera las variables
-- del proyecto que TIENEN alguna referencia, y sobre ese conjunto se parsean las
-- ocurrencias con el mismo parser que usa la resolucion. El conjunto candidato
-- es chico por dimensionamiento -- hasta 30 servicios por proyecto (§17.1 P.10)
-- y unas pocas variables por servicio --, de modo que no hace falta ni una
-- tabla de ocurrencias ni una busqueda por LIKE. Es el unico camino para
-- propagar el cambio de una variable compartida del proyecto, porque esa
-- referencia no genera arista: el proyecto no es un nodo del lienzo.
CREATE TABLE variables (
    id                 INTEGER PRIMARY KEY AUTOINCREMENT,
    servicio_id        INTEGER NOT NULL REFERENCES servicios(id) ON DELETE CASCADE,
    clave              TEXT    NOT NULL,
    valor              TEXT,                         -- NULL si es secreta
    secreta            INTEGER NOT NULL DEFAULT 0,
    referencia_secreto TEXT,
    referencia         TEXT,                         -- expresion ${{ ... }} sin resolver; NULL si el valor es literal
    resuelta_en        TEXT,                         -- momento de la ultima resolucion; NULL si no hay referencia
    -- `origen` registra COMO se creo la variable, no que clase de variable es:
    -- 'enlace' es la que escribio el sistema al trazar la flecha en el lienzo y
    -- 'referencia' la que tipeo el usuario, pero las dos son referencias comunes
    -- y se resuelven igual. Se conserva la distincion porque la interfaz muestra
    -- distinto una variable que nacio de un gesto del lienzo.
    origen             TEXT    NOT NULL DEFAULT 'manual', -- manual | enlace | catalogo | adopcion | referencia
    UNIQUE (servicio_id, clave),
    CHECK (referencia IS NOT NULL OR resuelta_en IS NULL)
);

CREATE TABLE changesets (
    id                INTEGER PRIMARY KEY AUTOINCREMENT,
    proyecto_id       INTEGER NOT NULL REFERENCES proyectos(id) ON DELETE CASCADE,
    estado            TEXT    NOT NULL DEFAULT 'pendiente', -- pendiente | aplicado | descartado
    mensaje           TEXT,
    cambios_json      TEXT    NOT NULL DEFAULT '[]',
    creado_en         TEXT    NOT NULL,
    aplicado_en       TEXT
);

CREATE TABLE despliegues (
    id                INTEGER PRIMARY KEY AUTOINCREMENT,
    servicio_id       INTEGER NOT NULL REFERENCES servicios(id) ON DELETE CASCADE,
    numero_replica    INTEGER NOT NULL DEFAULT 1,
    contenedor_id     TEXT,
    nombre_contenedor TEXT,
    imagen_resuelta   TEXT,
    digest_imagen     TEXT,
    estado            TEXT    NOT NULL,
    codigo_salida     INTEGER,
    solicitado_por    TEXT    NOT NULL DEFAULT 'ui', -- ui | api | autoarranque | politica
    changeset_id      INTEGER REFERENCES changesets(id) ON DELETE SET NULL,
    iniciado_en       TEXT    NOT NULL,
    finalizado_en     TEXT
);

CREATE TABLE reservas_ip (
    id                INTEGER PRIMARY KEY AUTOINCREMENT,
    servicio_id       INTEGER NOT NULL REFERENCES servicios(id) ON DELETE CASCADE,
    numero_replica    INTEGER NOT NULL DEFAULT 1,
    direccion         TEXT    NOT NULL,
    interfaz_padre    TEXT    NOT NULL,
    UNIQUE (servicio_id, numero_replica)
);

-- `plantilla_json` pasa de contener un servicio suelto a contener un SUBGRAFO
-- parametrizado (D-7): { "variablesCompartidas": [...], "servicios": [...],
-- "enlaces": [...] }, con la forma del anexo E-6. Sigue siendo JSON en una
-- columna TEXT porque es configuracion de baja cardinalidad que se lee y se
-- escribe siempre completa y nunca se consulta por partes entre proyectos.
-- `formato_version` es la version del formato del ITEM, distinta de `version`,
-- que es la version del contenido que el usuario publica: 1 = servicio suelto
-- (formato de la version 1.1 del intake), 2 = subgrafo. Se persiste para poder
-- convertir un catalogo importado sin adivinar su forma.
CREATE TABLE catalogo_items (
    id                TEXT    PRIMARY KEY,
    nombre            TEXT    NOT NULL,
    categoria         TEXT    NOT NULL,
    icono             TEXT,
    version           INTEGER NOT NULL DEFAULT 1,
    formato_version   INTEGER NOT NULL DEFAULT 2,
    plantilla_json    TEXT    NOT NULL,             -- subgrafo: variablesCompartidas, servicios y enlaces
    parametros_json   TEXT    NOT NULL DEFAULT '[]',
    modificado_en     TEXT    NOT NULL,
    CHECK (formato_version IN (1, 2))
);

CREATE TABLE tokens_api (
    id                INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre            TEXT    NOT NULL,
    hash_token        TEXT    NOT NULL UNIQUE,
    prefijo           TEXT    NOT NULL,
    ambitos           TEXT    NOT NULL DEFAULT '',   -- lista separada por espacios
    creado_en         TEXT    NOT NULL,
    expira_en         TEXT,
    ultimo_uso_en     TEXT,
    revocado_en       TEXT
);

CREATE TABLE eventos_auditoria (
    id                INTEGER PRIMARY KEY AUTOINCREMENT,
    en                TEXT    NOT NULL,
    actor             TEXT    NOT NULL,              -- admin | token:<prefijo>
    accion            TEXT    NOT NULL,
    entidad           TEXT,
    entidad_id        TEXT,
    detalle_json      TEXT,
    resultado         TEXT    NOT NULL               -- ok | error | rechazado
);

-- ============================================================================
-- PRINCIPIO DE IDENTIDAD DE OBJETO (D-12, quinta pasada) -- LIMITE DE ALCANCE
--
-- Este esquema refleja QUE los siguientes elementos son objetos con identidad;
-- COMO se persiste cada uno es materia de la Fase C, categoria 05 de
-- las capas Domain e Infrastructure, con el modelo de dominio
-- completo delante. Acá no se disenan sus columnas, sus claves ni su migracion.
--
--   SECRETO. Hoy se referencia como el texto de `referencia_secreto` -- p. ej.
--     "sec-011" -- y no tiene entidad propia. Cumple la prueba de objeto: se
--     comparte entre servicios, se rota y tiene historia. Pasa a ser objeto.
--   RED DEL PROYECTO. Hoy vive en `proyectos.red_json`. Cumple la prueba: la
--     comparten todos los servicios del proyecto, se crea antes que los
--     contenedores, sobrevive a ellos, y `reservas_ip` habla de ella. Pasa a
--     ser objeto.
--
-- Lo que NO cambia, por la misma prueba: recursos, healthcheck, montajes y
-- layout del lienzo son ATRIBUTOS -- nadie los referencia, no sobreviven a su
-- servicio y no tienen ciclo propio -- y siguen viajando como JSON.
--
-- Consecuencia sobre `variables.referencia` (D-12, consecuencia 1): la forma
-- vinculada pasa a llevar el identificador de la VARIABLE ademas del del
-- servicio, de modo que renombrar la variable tampoco rompe la referencia
-- (RN-33). La forma legible y la exportada no cambian.
--
-- Consecuencia sobre la unicidad (D-12, consecuencia 2): el modelo exige nombre
-- unico en DOS lugares y en ninguno mas -- el alias DNS del servicio dentro de
-- la red de su proyecto, y la clave de una variable de servicio dentro de su
-- servicio --. La clave unica (proyecto_id, clave) de `variables_proyecto` deja
-- de exigirse: dos compartidas pueden llamarse igual (RN-28).
-- ============================================================================

-- Indices de consulta habitual
CREATE INDEX ix_servicios_proyecto      ON servicios(proyecto_id);
CREATE INDEX ix_despliegues_servicio    ON despliegues(servicio_id, estado);
CREATE INDEX ix_despliegues_contenedor  ON despliegues(contenedor_id);
CREATE INDEX ix_enlaces_proyecto        ON enlaces(proyecto_id);
CREATE INDEX ix_reservas_direccion      ON reservas_ip(direccion);
CREATE INDEX ix_auditoria_en            ON eventos_auditoria(en DESC);

-- Agregados el 2026-07-28 (D-6). Los dos sirven la misma pregunta desde sus dos
-- caminos: "quien queda obsoleto si esto cambia".
--   ix_enlaces_destino: aristas entrantes de un servicio, por clave referenciada.
--     Resuelve el marcado de "requiere redespliegue" ante el cambio de una
--     variable del destino, y con la clave en el indice permite filtrar las
--     aristas que referencian el host sin leer la fila, que es lo que consulta
--     la validacion de canal alcanzable de RN-04. El orden de arranque no sale
--     de aca sino de `ix_enlaces_arranque`, sobre la espera declarada.
--   ix_variables_con_referencia: indice PARCIAL sobre las variables que tienen
--     alguna referencia. No indexa la expresion sino que acota el conjunto a
--     parsear, porque la referencia puede ir interpolada y la igualdad no la
--     encontraria. Es el primer paso del camino de dos pasos descripto sobre la
--     tabla `variables`, y el unico camino para propagar el cambio de una
--     variable compartida del proyecto, que no genera arista.
CREATE INDEX ix_enlaces_destino          ON enlaces(destino_servicio_id, clave_destino);

-- Agregados en la tercera pasada.
--   ix_enlaces_arranque: el subgrafo de arranque, que es lo que recorren RN-05
--     y RN-14. Indice parcial porque la mayoria de las aristas no espera.
--   ux_enlaces_espera_sola: una sola arista de espera sin variable por par de
--     servicios. Hace falta como indice UNICO PARCIAL y no alcanza con la clave
--     unica de la tabla, porque SQLite trata cada NULL como distinto y esa clave
--     no impediria dos aristas de espera identicas entre el mismo par.
CREATE INDEX        ix_enlaces_arranque     ON enlaces(proyecto_id, destino_servicio_id) WHERE espera_destino = 1;
CREATE UNIQUE INDEX ux_enlaces_espera_sola  ON enlaces(origen_servicio_id, destino_servicio_id) WHERE clave_variable IS NULL;
CREATE INDEX ix_variables_con_referencia ON variables(servicio_id) WHERE referencia IS NOT NULL;

-- Repone la consulta que servia la clave unica retirada de `variables_proyecto`
-- (D-12, consecuencia 3): las compartidas se listan y se buscan siempre dentro
-- de un proyecto. Es reposicion, no diseno: la consulta ya estaba declarada.
CREATE INDEX ix_variables_proyecto_proy  ON variables_proyecto(proyecto_id);
```

### §20.10 · E-10 · Alta de proyecto con API y base de datos, de extremo a extremo

Citado desde §6 (flujo 1). Procedencia: `Analisis-Final-Integrado.md`, líneas 1839–1891. Estado: `declarado`.

**Contexto.** El recorrido completo de un administrador que crea un proyecto desde cero, agrega una base desde el catálogo y una API desde una imagen de registro, traza la dependencia entre ellas y aplica los cambios, con la variante del mismo alta usando una variable compartida para la credencial. Es el flujo 1 de §6 y el guion natural de la primera demostración del producto.

**Qué ejercita.** Las cuatro vías de alta conviviendo en el mismo menú; la instanciación de un ítem de catálogo de un solo nodo; el azúcar del lienzo, que escribe la referencia al trazar la flecha; el orden de arranque derivado del subgrafo de aristas con espera; el secreto que vive referenciado y nunca en texto plano; el volumen que sobrevive a detener y redesplegar; y, en la variante, la declaración de un valor una sola vez a nivel proyecto con su propagación a los dos servicios que lo usan.

**Qué verificar.** Que el paso 4 escriba una referencia editable y no una variable de clase aparte, con el puerto literal y la espera propuesta (T-53, T-12). Que la base no publique ningún puerto en el host, porque la API la alcanza por nombre dentro de la red del proyecto. Que el arranque respete el orden sin configuración manual (T-14, RN-14). Que la contraseña no aparezca en claro ni en la interfaz ni en la exportación (RN-15). Que el volumen sobreviva al redespliegue y sólo se borre al eliminar el servicio con confirmación explícita (T-21, T-27, RN-09, RN-10). Y que, en la variante, rotar la contraseña marque los dos servicios como pendientes de redespliegue desde un único cambio (E-5, cambio 4).

Pasos en la interfaz:

1. `Nuevo proyecto` → nombre "Portal Interno" → se elige modo de red **bridge**, y el sistema propone la subred `172.20.0.0/24`. Se aterriza en el lienzo vacío.
2. `+ Nuevo servicio` → **Desde catálogo** → *PostgreSQL 16* → se completan los parámetros (`nombreBase=portal`, `usuario=portal`, contraseña generada). El nodo `db` aparece en violeta, pendiente. El catálogo es una de las **cuatro vías de alta** que ofrece este menú, junto a las tres variantes de origen; el ítem elegido es una plantilla que resuelve al origen "imagen de registro", y como su subgrafo tiene un solo servicio, la instanciación crea un servicio y un contenedor (D-7, RN-30).
3. `+ Nuevo servicio` → **Imagen de registro** → `registro-privado/portal-api:1.4.2` → nodo `api`, también pendiente.
4. Se arrastra una arista de `api` a `db`. El sistema propone la variable:

```json
{
  "clave": "ConnectionStrings__Default",
  "referencia": "Host=${{ db.SELFHOSTED_HOST }};Port=5432;Database=portal;Username=portal;Password=${{ shared.DB_PASSWORD }}",
  "valorResuelto": "Host=db;Port=5432;Database=portal;Username=portal;Password=***"
}
```

5. En `api` → pestaña **Red** → se publica el puerto `8080` en el host.
6. `Aplicar cambios` con el mensaje "Alta inicial del portal". El sistema crea la red, despliega `db`, espera su verificación de salud y luego despliega `api`, respetando el orden topológico del grafo.

Qué hay que entender del ejemplo: `db` no publica ningún puerto en el host, porque `api` la alcanza por nombre dentro de la red del proyecto, y publicar el puerto de la base sería un error de seguridad que la interfaz debe desalentar; el orden de arranque no se configura a mano, se deduce del subgrafo de las aristas que declaran espera al destino (RN-14), y esa espera la propone el sistema al trazar la flecha y el usuario puede cambiarla; la contraseña de la base vive como secreto referenciado, nunca en texto plano en la exportación ni en la interfaz; y el volumen sobrevive a detener y redesplegar `db`, y sólo se borra al eliminar el servicio con confirmación explícita.

**Variante del paso 4 con variable compartida, incorporada el 2026-07-28 (D-5 y D-6) [D].** El mismo alta, con la contraseña de la base declarada una sola vez a nivel proyecto en lugar de repetirse en los dos servicios:

1. En el proyecto → **Variables del proyecto** → se declara `DB_PASSWORD`, marcada como secreta, con la contraseña generada.
2. En `db` → la variable `POSTGRES_PASSWORD` se escribe como `${{ shared.DB_PASSWORD }}`.
3. En `api` → la variable `DB_PASSWORD` se escribe como `${{ shared.DB_PASSWORD }}`.

Las dos variables quedan secretas por propagación (RN-23), ninguna de las dos referencias dibuja arista —el proyecto no es un nodo del lienzo—, y a partir de ahí rotar la contraseña es editar un único valor: el changeset marca los dos servicios como pendientes de redespliegue, con la forma del cambio 4 del anexo [E-5](#205--e-5--changeset-de-cambios-pendientes-con-su-informe-de-impacto). Es exactamente el dolor que el producto viene a eliminar: hoy ese mismo cambio obliga a editar dos archivos y a acordarse de los dos.

### §20.11 · E-11 · Adopción de un contenedor existente

Citado desde §6 (flujo 2). Procedencia: `Analisis-Final-Integrado.md`, líneas 1892–1944, ampliado el 2026-07-28 con el paso obligatorio de clasificación de variables (D-2). Estado: `declarado`.

**Contexto.** La adopción de un contenedor que ya corre en el servidor, paso por paso, con la carga útil del paso de clasificación de variables y el servicio resultante vinculado al contenedor existente. Es el caso que NB-02 describe como condición de adoptabilidad: un servicio en uso que el propietario no está dispuesto a apagar.

**Qué ejercita.** El flujo de cuatro pasos que D-2 dejó fijado —descubrir, elegir, clasificar y confirmar—, con el tercero obligatorio (RA-06, RN-29); la distinción entre `sugeridaSecreta`, que aporta la heurística, y `marcadaSecreta`, que decide el usuario; el vínculo del servicio con el contenedor existente por identificador, sin recrearlo; y la traza `clasificacionVariables`, que queda persistida y permite auditar más tarde qué se marcó, qué se desmarcó y quién lo confirmó.

**Qué verificar.** Que la adopción **no se complete** sin clasificación confirmada: el servicio no se crea y el contenedor sigue sin adoptar (T-33, RN-29). Que la variable que la heurística no detecta llegue desmarcada y que marcarla la deje cifrada en reposo, con recarga manual pendiente y sin valor en claro por ninguna vía (T-17, T-32). Que el contenedor no se recree en ningún momento del flujo y que el servicio quede activo sin corte. Que el primer redespliegue posterior, que sí implica corte, se advierta con esas palabras antes de ejecutarlo. Y que el valor de una variable marcada como secreta viaje enmascarado incluso dentro de la carga útil del propio paso de clasificación.

**El flujo tiene cuatro pasos, no tres [D], D-2 del 2026-07-28.** Descubrir, elegir, **clasificar** y confirmar. El tercero es nuevo y es obligatorio: la adopción no se completa sin él (RA-06, RN-29). El usuario ve **todas** las variables importadas, las que la heurística detectó vienen premarcadas como secretas, y puede marcar o desmarcar cualquiera. No es una pantalla que se pueda saltear ni un aviso que se pueda descartar: sin clasificación confirmada, el servicio no se crea.

Carga útil del paso de clasificación, usando el caso C-2 del anexo [E-20](#2020--e-20--configuraciones-reales-de-contenedor-ofuscadas), que es el que motivó la decisión. La heurística no detecta `ClaveMaestra`, la presenta desmarcada, y es el usuario el que la marca:

```json
{
  "contenedorId": "c93e0a1b7d55",
  "nombre": "bot-mensajeria",
  "propuestaEn": "2026-07-28T09:40:00-03:00",
  "variables": [
    { "clave": "Moderacion__Gateway",     "valor": "Mensajeria",             "sugeridaSecreta": false, "motivoSugerencia": null,             "marcadaSecreta": false },
    { "clave": "Persistencia__RutaBase",  "valor": "/app/data/moderador.db", "sugeridaSecreta": false, "motivoSugerencia": null,             "marcadaSecreta": false },
    { "clave": "ClaveMaestra",            "valor": "***",                    "sugeridaSecreta": false, "motivoSugerencia": null,             "marcadaSecreta": true },
    { "clave": "ADMIN_TOKEN",             "valor": "***",                    "sugeridaSecreta": true,  "motivoSugerencia": "heuristica:TOKEN", "marcadaSecreta": true }
  ],
  "confirmadaPor": "admin",
  "confirmadaEn": "2026-07-28T09:41:12-03:00"
}
```

Qué hay que entender de esta carga útil: `sugeridaSecreta` es lo que aporta la heurística y `marcadaSecreta` es lo que decide el usuario; son dos campos distintos justamente porque uno ya no determina al otro. `ClaveMaestra` llega con `sugeridaSecreta: false` y sale con `marcadaSecreta: true`, que es el hueco que CL-15 dejaba pasar en silencio. El valor de una variable marcada como secreta **nunca se devuelve al navegador ni se persiste en claro** (RN-15): viaja enmascarado en esta misma carga útil y se cifra en reposo al confirmar.

Servicio resultante de la importación, vinculado al contenedor existente sin recrearlo:

```json
{
  "id": 305,
  "proyectoId": 7,
  "nombre": "print-server",
  "origen": { "tipo": "imagen", "imagen": "registro-privado/print-server", "etiqueta": "1.4.18", "politicaActualizacion": "fijada" },
  "red": { "modo": "macvlan", "ipFija": "192.168.1.139", "interfazPadre": "enp1s0" },
  "montajes": [ { "tipo": "bind", "origen": "/srv/despliegues/print-server/data", "destino": "/data", "soloLectura": false } ],
  "dispositivos": [ { "host": "/dev/serial/by-id/usb-FTDI-if00-port0", "contenedor": "/dev/ttyUSB0", "permisos": "rwm" } ],
  "recursos": { "limiteMemoriaMb": 512 },
  "politicaReinicio": "always",
  "adopcion": {
    "adoptadoEn": "2026-07-26T10:25:00-03:00",
    "contenedorId": "b71c9d4a2f10",
    "recreado": false,
    "clasificacionVariables": {
      "confirmadaPor": "admin",
      "confirmadaEn": "2026-07-26T10:24:40-03:00",
      "sugeridasPorHeuristica": ["ADMIN_TOKEN"],
      "marcadasPorElUsuario": [],
      "desmarcadasPorElUsuario": []
    },
    "variablesEnmascaradas": ["ADMIN_TOKEN"]
  },
  "estadoActual": { "estado": "activo", "despliegueId": 5310, "requiereRedespliegue": false }
}
```

El bloque `clasificacionVariables` es la traza del paso obligatorio **[D], D-2**: queda persistido en `adopcion_json` y es lo que permite auditar más tarde qué se marcó, qué se desmarcó y quién lo confirmó. En este caso la sugerencia de la heurística coincidió con la decisión del usuario y no hubo correcciones; en el caso C-2 del ejemplo anterior, `marcadasPorElUsuario` llevaría `["ClaveMaestra"]`.

Punto crítico de la adopción: el contenedor no se recrea. El servicio queda vinculado al contenedor existente por su identificador, y el primer redespliegue —cuando el administrador lo pida— es el momento en que la configuración importada se materializa de nuevo. Ese primer redespliegue sí implica corte, y la interfaz debe advertirlo con esas palabras.

### §20.12 · E-12 · Carga útil de un token de API emitido

Citado desde §17.1 P.5. Procedencia: `Analisis-Final-Integrado.md`, líneas 1550–1561. Estado: `declarado`.

**Contexto.** La carga útil que devuelve la emisión de un token de API desde la interfaz, con su valor mostrado una única vez. Es la credencial de máquina que NB-08 separa de la sesión del administrador para que un automatismo pueda desplegar sin conocer su contraseña.

**Qué ejercita.** El token con sus ámbitos declarados, su vigencia y su identificador propio, que es lo que permite revocarlo individualmente; el principio de ámbito mínimo asociado al riesgo de control total del host (RG-03); y la regla de que sólo se persiste el hash del valor (RN-16).

**Qué verificar.** Que el valor se devuelva una única vez y que en la base quede únicamente su hash (T-25). Que toda operación de escritura hecha con el token quede registrada en auditoría con el actor identificado por su prefijo (T-26, RN-17). Que la revocación surta efecto en la primera petición posterior, sin afectar a otros tokens ni a la sesión del administrador. Y que un token sin el ámbito requerido reciba un rechazo que indique cuál le falta, que es lo que el anexo [E-13](#2013--e-13--contrato-del-endpoint-de-despliegue) declara como `403`.

```json
{
  "iss": "selfhosted-service-core",
  "aud": "selfhosted-api",
  "sub": "admin",
  "jti": "tk_7f3c9a12",
  "scope": "proyectos:leer despliegues:ejecutar",
  "nombre": "github-actions-portal",
  "iat": 1785000000,
  "exp": 1792776000
}
```

### §20.13 · E-13 · Contrato del endpoint de despliegue

Citado desde §17.1 P.3 y §18 (SM-07). Procedencia: `Analisis-Final-Integrado.md`, líneas 1638–1661 y 2165–2174. Estado: `declarado`.

**Contexto.** El contrato del endpoint que un automatismo de integración continua invoca para publicar una versión nueva: la petición que emite, la respuesta aceptada, la tabla de comportamiento por situación y el cuerpo de una operación en lote con su resultado por contenedor. Es la superficie de máquina del cuarto alcance.

**Qué ejercita.** El contrato de la API bajo `/api/v1` con su ámbito declarado; la política de códigos de respuesta por situación, incluida la de una referencia que no resuelve; el resultado **por contenedor** de una operación en lote y el campo `serviciosNoAlcanzados`, que hace auditable la otra mitad de RN-13; y la recuperación del estado tras una caída del circuito de la interfaz, consultando la operación en lugar de reconstruirla.

**Qué verificar.** Que un fallo parcial **no** sea un código de error de la operación: la operación se completó e informa qué contenedor quedó de qué manera, y el `5xx` queda reservado al caso en que el propio administrador no pudo llevarla adelante (T-31). Que la operación devuelva el resultado de los dos contenedores alcanzados y declare a `db` como no alcanzada, coherente con el informe de impacto de E-5 y con T-23. Que un token sin el ámbito requerido reciba `403` indicando cuál falta. Que un conflicto de dirección al recrear devuelva `409` con el informe del anexo [E-8](#208--e-8--reserva-de-direcciones-ip-e-informe-de-conflicto). Y que una referencia no resoluble devuelva `422` señalando la expresión y su causa, sin crear el contenedor (RN-21, RN-22, RN-24).

Petición que emite el workflow de integración continua:

```http
POST /api/v1/servicios/101/desplegar HTTP/1.1
Host: admin.interno.lan
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "etiquetaImagen": "1.4.3",
  "esperarActivo": true,
  "tiempoLimiteSegundos": 180,
  "mensaje": "Despliegue automatico desde workflow build-and-deploy 482"
}
```

Respuesta aceptada:

```json
{
  "operacionId": "op-9f21c",
  "servicioId": 101,
  "despliegueId": 5480,
  "estado": "creando",
  "iniciadoEn": "2026-07-26T11:02:00-03:00",
  "seguimiento": "/api/v1/operaciones/op-9f21c"
}
```

Comportamiento esperado del endpoint según la situación:

| Situación | Respuesta |
|---|---|
| Despliegue aceptado | `202 Accepted` con `operacionId` y ruta de seguimiento |
| `esperarActivo=true` y el servicio queda activo | `200 OK` con el despliegue final |
| Tiempo límite superado | `504` con el último estado conocido y las últimas líneas del registro |
| Imagen inexistente en el registro | `422` con detalle del error de descarga |
| Token sin el ámbito requerido | `403` indicando el ámbito faltante |
| Conflicto de dirección IP al recrear | `409` con el informe de conflicto de E-8 |
| **Se pierde la conexión del navegador con el despliegue en curso [D], D-1** | El despliegue **no se interrumpe**: vive del lado del servidor y su resultado se determina por contenedor. El circuito de la interfaz sólo observa. Al reconectar, el estado se recupera consultando `GET /api/v1/operaciones/{operacionId}`, que devuelve el resultado **de cada contenedor**, no un resultado único de la operación |
| **Una referencia de variable no resuelve al crear el contenedor [D], D-6** | `422` señalando la expresión y qué le falta: variable inexistente, servicio inexistente, servicio de otro proyecto o ciclo de resolución (RN-21, RN-22, RN-24). El contenedor no se crea |

**Resultado por contenedor de una operación en lote [D], D-1 del 2026-07-28.** Los endpoints que despliegan más de un contenedor —`POST /api/v1/proyectos/{id}/changeset/aplicar` y `POST /api/v1/proyectos/{id}/arrancar`— devuelven el seguimiento de la operación, y esa operación **no tiene un estado propio**: informa el de cada contenedor por separado. Es lo que hace que un despliegue parcial sea un estado legítimo y no un error a resolver.

Este ejemplo es la aplicación del changeset 331 del anexo [E-5](#205--e-5--changeset-de-cambios-pendientes-con-su-informe-de-impacto), que es el anexo canónico de ese changeset. Su informe de impacto declara `serviciosARedesplegar: ["api", "cache"]` y `serviciosSinImpacto: ["db"]`, de modo que la operación toca **dos** contenedores y no tres: `db` no aparece acá porque RN-13 exige redesplegar sólo los servicios afectados. Son los mismos dos despliegues, 5471 y 5472, que transcribe el anexo [E-3](#203--e-3--despliegue-con-su-línea-de-tiempo-de-eventos-y-sus-métricas):

```json
{
  "operacionId": "op-a41f7",
  "proyectoId": 12,
  "changesetId": 331,
  "iniciadaEn": "2026-07-26T09:01:40-03:00",
  "finalizadaEn": "2026-07-26T09:02:19-03:00",
  "resultadoPorContenedor": [
    { "servicioId": 101, "servicio": "api",   "numeroReplica": 1, "despliegueId": 5471, "estado": "activo",  "error": null },
    { "servicioId": 102, "servicio": "cache", "numeroReplica": 1, "despliegueId": 5472, "estado": "fallido", "error": "La imagen no existe en el registro" }
  ],
  "serviciosNoAlcanzados": [
    { "servicioId": 103, "servicio": "db", "motivo": "sin-impacto-en-el-changeset" }
  ],
  "estadoDelProyecto": "parcialmente-activo"
}
```

`serviciosNoAlcanzados` es lo que hace auditable la otra mitad de RN-13: declara explícitamente qué servicios del proyecto **no** se tocaron y por qué, para que un despliegue parcial no se confunda con un servicio omitido por error. `db` sigue activa con el despliegue que ya tenía; el proyecto queda `parcialmente-activo` porque uno de los dos contenedores alcanzados falló, que es el estado que declara el anexo [E-1](#201--e-1--proyecto-con-layout-de-lienzo).

El código de respuesta de una operación en lote es `202 Accepted` con la ruta de seguimiento, y `200 OK` con este cuerpo cuando se pidió esperar. **Un fallo parcial no es un código de error de la operación:** la operación se completó, y lo que informa es qué contenedor quedó de qué manera. Un `5xx` se reserva para el caso en que el propio administrador no pudo llevar adelante la operación. **[D-i]** — esta política de códigos de respuesta es especificación de integración, no contenido de D-1: ver la sección «Decisiones del agente humano incorporadas en la versión 1.2» y su tabla de especificaciones derivadas.

Workflow que lo consume, del cuarto alcance. Procedencia: líneas 2126–2156.

```yaml
# .github/workflows/deploy.yml
name: build-and-deploy
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: self-hosted          # el runner del propio servidor, ya presente en el parque
    steps:
      - uses: actions/checkout@v4

      - name: Construir y publicar la imagen
        run: |
          docker build -t "$REGISTRO/portal-api:${GITHUB_SHA::7}" .
          docker push "$REGISTRO/portal-api:${GITHUB_SHA::7}"
        env:
          REGISTRO: ${{ vars.REGISTRO_PRIVADO }}

      - name: Solicitar el despliegue
        run: |
          curl --fail --silent --show-error \
            -X POST "$ADMIN_URL/api/v1/servicios/101/desplegar" \
            -H "Authorization: Bearer $ADMIN_TOKEN" \
            -H "Content-Type: application/json" \
            -d "{\"etiquetaImagen\":\"${GITHUB_SHA::7}\",\"esperarActivo\":true,\"tiempoLimiteSegundos\":180}"
        env:
          ADMIN_URL:   ${{ vars.ADMIN_URL }}
          ADMIN_TOKEN: ${{ secrets.ADMIN_API_TOKEN }}
```

### §20.14 · E-14 · Exportación de un proyecto a Docker Compose

Citado desde §4 (F-13), §17.3 P.3 y §18 (SM-06). Procedencia: `Analisis-Final-Integrado.md`, líneas 2009–2113. Estado: `declarado`.

**Contexto.** La exportación completa de un proyecto: el archivo Compose que produce el endpoint, el archivo de variables que lo acompaña con los secretos vacíos y el manifiesto propio que preserva lo que Compose no representa. Es la mitigación que NB-03 asigna al riesgo de operar un servidor sin redundancia de disco.

**Qué ejercita.** La regla de que una exportación nunca emite una expresión `${{ … }}` (RN-25); el aplanado de las variables compartidas del proyecto en cada servicio que las usa, con su carácter de secreto preservado en el manifiesto; la emisión de todo secreto como marcador con su línea vacía en el archivo de variables, en lugar de suprimirlo (RN-15, RN-23); la preservación de la disposición del lienzo, de las expresiones sin resolver y del nivel de variable compartida en el manifiesto propio; y la tabla de correspondencia con su pérdida declarada campo por campo.

**Qué verificar.** Que ningún archivo exportado contenga la secuencia `${{` sin escapar y que todo signo peso literal viaje duplicado, de modo que el archivo levante (T-39, T-47, RN-25). Que los dos secretos del servicio viajen como marcador con su entrada vacía y ninguno se suprima: un secreto suprimido produce un proyecto que levanta sin la variable y falla en ejecución (T-18). Que el Compose exportado sea autosuficiente sin el manifiesto, y que con el manifiesto se recuperen además el lienzo, el nivel de compartida y la intención de cada referencia. Que la ida y vuelta conserve imagen, red, dirección, dispositivos, montajes, límites y política de reinicio (T-30). Y que un manifiesto de `version: 1` siga siendo importable, leyéndose como un proyecto sin variables compartidas ni referencias.

Archivo Compose que produce `GET /api/v1/proyectos/12/exportar/compose`:

```yaml
name: portal-interno

services:
  api:
    image: registro-privado/portal-api:1.4.2
    container_name: portal-interno_api_1
    restart: unless-stopped
    environment:
      ASPNETCORE_ENVIRONMENT: Production
      ConnectionStrings__Default: Host=db;Port=5432;Database=portal;Username=portal;Password=${DB_PASSWORD}
      REDIS_URL: cache:6379
      API_KEY_EXTERNA: ${API_KEY_EXTERNA}
      TZ: America/Argentina/Buenos_Aires
      DB_USER: portal
      DB_PASSWORD: ${DB_PASSWORD}
      PUERTO_HTTP: "8080"
      SALUD_URL: http://api:8080/salud
    ports:
      - "8080:8080"
    volumes:
      - portal-api-datos:/app/data
    depends_on:
      db:
        condition: service_healthy
    networks: [portal-interno-net]
    deploy:
      resources:
        limits: { memory: 512M, cpus: "1.0" }

  db:
    image: imagen-oficial/postgres:16-alpine
    container_name: portal-interno_db_1
    restart: unless-stopped
    environment:
      POSTGRES_DB: portal
      POSTGRES_USER: portal
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    volumes:
      - portal-interno-db-datos:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U portal"]
      interval: 30s
    networks: [portal-interno-net]
    deploy:
      resources:
        limits: { memory: 1024M }

  cache:
    image: imagen-oficial/redis:7.4
    container_name: portal-interno_cache_1
    restart: unless-stopped
    networks: [portal-interno-net]
    deploy:
      resources:
        limits: { memory: 256M }

volumes:
  portal-api-datos:
  portal-interno-db-datos:

networks:
  portal-interno-net:
    driver: bridge
    ipam:
      config:
        - subnet: 172.20.0.0/24
          gateway: 172.20.0.1
```

Archivo de variables que lo acompaña, con los secretos vacíos:

```bash
# portal-interno.env — completar antes de levantar
DB_PASSWORD=
API_KEY_EXTERNA=
```

Manifiesto propio que preserva lo que Compose no representa: el layout del lienzo y, desde el 2026-07-28, las variables compartidas del proyecto y las referencias sin resolver. **La versión del formato sube de 1 a 2** por esas dos incorporaciones:

```json
{
  "formato": "selfhosted-proyecto",
  "version": 2,
  "proyecto": { "nombre": "Portal Interno", "slug": "portal-interno", "autoArranque": true },
  "canvas": { "zoom": 0.9, "pan": { "x": -120, "y": 40 }, "nodos": [
    { "servicio": "api",   "x": 160, "y": 120 },
    { "servicio": "cache", "x": 560, "y": 120 },
    { "servicio": "db",    "x": 560, "y": 320, "grupo": "datos" }
  ], "grupos": [ { "id": "datos", "titulo": "Persistencia", "color": "#7E57C2" } ] },
  "variablesCompartidas": [
    { "clave": "TZ", "valor": "America/Argentina/Buenos_Aires", "secreta": false },
    { "clave": "DB_PASSWORD", "valor": null, "secreta": true }
  ],
  "enlaces": [
    { "origen": "api", "destino": "db",    "claveVariable": "ConnectionStrings__Default", "claveDestino": "SELFHOSTED_HOST", "puertoDestino": 5432, "esperaDestino": true },
    { "origen": "api", "destino": "cache", "claveVariable": "REDIS_URL", "claveDestino": "SELFHOSTED_HOST", "puertoDestino": 6379, "esperaDestino": true },
    { "origen": "api", "destino": "db",    "claveVariable": "DB_USER", "claveDestino": "POSTGRES_USER", "puertoDestino": null, "esperaDestino": false },
    { "origen": "cache", "destino": "db", "claveVariable": null, "claveDestino": null, "puertoDestino": null, "esperaDestino": true }
  ],
  "referencias": [
    { "servicio": "api", "clave": "TZ",                         "expresion": "${{ shared.TZ }}" },
    { "servicio": "api", "clave": "DB_USER",                    "expresion": "${{ db.POSTGRES_USER }}" },
    { "servicio": "api", "clave": "DB_PASSWORD",                "expresion": "${{ shared.DB_PASSWORD }}" },
    { "servicio": "api", "clave": "SALUD_URL",                  "expresion": "http://${{ SELFHOSTED_HOST }}:${{ PUERTO_HTTP }}/salud" },
    { "servicio": "api", "clave": "ConnectionStrings__Default", "expresion": "Host=${{ db.SELFHOSTED_HOST }};Port=5432;Database=portal" },
    { "servicio": "api", "clave": "REDIS_URL",                  "expresion": "${{ cache.SELFHOSTED_HOST }}:6379" }
  ],
  "secretosRequeridos": ["DB_PASSWORD", "API_KEY_EXTERNA"]
}
```

Correspondencia entre el modelo propio y Compose, con su pérdida declarada:

| Concepto propio | Equivalente en Compose | Pérdida |
|---|---|---|
| Proyecto | `name` del archivo | Ninguna |
| Servicio | Entrada de `services` | Ninguna |
| Enlace por variable | Variable de entorno más `depends_on` | Se pierde la intención del enlace: se recupera del manifiesto propio |
| Reserva de dirección macvlan | `networks.<red>.ipv4_address` | Ninguna |
| Layout del lienzo | No existe | Se preserva en el manifiesto propio |
| Changeset | No existe | Se exporta el estado aplicado, no el borrador |
| Secreto | Referencia `${VAR}` | El valor nunca se exporta: es deliberado |
| **Variable compartida del proyecto** | No existe: se **aplana** en cada servicio que la usa, con su valor resuelto o con `${CLAVE}` si es secreta | Se pierde el nivel de proyecto. Se preserva en el manifiesto propio, con su carácter de secreto |
| **Referencia `${{ … }}`** | No existe: se emite el **valor resuelto**, o `${CLAVE}` si el valor referenciado es secreto | Se pierde la expresión. Se preserva en el manifiesto propio, en `referencias` |

**Cómo se comporta la exportación ante una referencia [D], D-6 del 2026-07-28.** El archivo Compose **nunca lleva una expresión `${{ … }}`** (RN-25). El ejemplo de arriba lo muestra en las **seis** referencias del servicio `api`: `TZ`, `DB_USER`, `SALUD_URL`, `ConnectionStrings__Default` y `REDIS_URL` viajan con su valor resuelto —las dos últimas son las que el sistema escribió al trazar la flecha en el lienzo, y viajan igual que cualquier otra—, y `DB_PASSWORD` viaja como `${DB_PASSWORD}` con su entrada vacía en el archivo de variables, porque referencia una variable compartida secreta y el carácter de secreto se propaga (RN-23, RN-15). `PUERTO_HTTP` no está en esa lista: es un literal, no una referencia, y por eso no figura en `referencias` del manifiesto. El motivo es la convivencia con la expansión de variables de Compose: `${{` no es una interpolación válida para Compose, de modo que emitirla produciría un archivo que no levanta. La expresión no se pierde porque el manifiesto propio la preserva, que es el mismo mecanismo con el que ya se preserva el layout.

**Los dos secretos del servicio `api` viajan igual, y ninguno se omite.** `DB_PASSWORD` es secreto por referencia a una variable compartida secreta (RN-23) y `API_KEY_EXTERNA` es secreto declarado a mano en el anexo [E-2](#202--e-2--servicio-con-sus-tres-variantes-de-origen): los dos se emiten como `${CLAVE}`, los dos tienen su línea vacía en el archivo de variables y los dos figuran en `secretosRequeridos`. Ninguno de los dos valores aparece en ningún archivo, que es lo que exige RN-15. Un secreto **no se suprime** de la exportación: suprimirlo produciría un proyecto que levanta sin la variable y falla en tiempo de ejecución, en lugar de uno que pide completarla.

El archivo Compose exportado sigue siendo **autosuficiente**: quien lo recibe sin el manifiesto propio obtiene un proyecto que levanta, con los valores ya resueltos y los secretos por completar; quien lo recibe con el manifiesto propio recupera además el lienzo, el nivel de variable compartida y la intención de cada referencia. Un manifiesto de `version: 1` sigue siendo importable: no declara ni `variablesCompartidas` ni `referencias`, y se lee como un proyecto sin ninguna de las dos cosas.

Regla de la importación inversa: al importar un Compose sin manifiesto propio, los nodos se disponen automáticamente por capas según el grafo de `depends_on`, para que el lienzo resultante sea legible desde el primer momento. **La interpolación de Compose no produce referencias** (RN-26): un `${VAR}` del archivo es interpolación de Compose y se traduce con la regla que ya declara el anexo [E-21](#2021--e-21--correspondencia-entre-una-configuración-real-y-el-modelo-de-la-solución). La única referencia que la importación crea es la reexpresión de un `depends_on` sobre un literal que ya coincide con el host y el puerto del destino, que ese mismo anexo desarrolla; no alcanza a ninguna forma de `${VAR}`.

### §20.15 · E-15 · Superficie de la API REST

Citado desde §17.1 P.3. Procedencia: `Analisis-Final-Integrado.md`, líneas 1611–1634, ampliada el 2026-07-28 con seis endpoints: cuatro que exigen las decisiones D-1, D-2, D-5 y D-7, y dos de exportación e importación del catálogo que F-14 declaraba desde la versión 1.0 sin que la superficie los tuviera. Estado: `declarado`. Es la superficie mínima que sostiene los cuatro alcances. Todos los endpoints van bajo `/api/v1`, todos autenticados y todos con ámbito declarado.

**Contexto.** La superficie completa de la API que sostiene los cuatro alcances, con su ámbito por endpoint. Es lo que consumen tanto la interfaz como los automatismos, y el contrato que la categoría de especificación funcional traduce a casos de uso por recurso.

**Qué ejercita.** La cobertura de las capacidades declaradas en §4 con endpoints concretos; los seis endpoints incorporados el 2026-07-28, cuatro por las decisiones D-1, D-2, D-5 y D-7 y dos de exportación e importación del catálogo que F-14 declaraba desde la versión 1.0 sin que la superficie los tuviera; el informe de importación, que hace declarada y no silenciosa toda pérdida de traducción; y el ámbito declarado por endpoint, que es lo que hace posible emitir un token de ámbito mínimo.

**Qué verificar.** Que toda capacidad del alcance tenga al menos un endpoint que la sostenga, y que ningún endpoint quede sin capacidad que lo justifique. Que todos vayan bajo `/api/v1`, todos autenticados y todos con ámbito declarado, verificable por prueba de contrato. Que la lectura de las variables compartidas devuelva los secretos enmascarados y que su escritura entre al changeset marcando como pendientes los servicios que las referencian (RN-15, E-5). Que la adopción sin clasificación confirmada se rechace (T-33). Y que el cambio de contrato del endpoint de adopción entre **antes** de la primera publicación de la versión 1 de la API, o abra `/api/v2`, porque la superficie publicada no cambia de semántica una vez emitida (DI-11).

**Cómo leer el recuento.** La tabla tiene **veintiocho filas** y declara **treinta endpoints**: dos filas agrupan dos métodos sobre la misma ruta (`GET`/`POST /catalogo` y `GET`/`PUT /proyectos/{id}/variables`). El cuerpo cita el número de endpoints, no el de filas.

| Método y ruta | Ámbito | Descripción |
|---|---|---|
| `GET /api/v1/proyectos` | `proyectos:leer` | Lista de proyectos SelfHosted con estado agregado |
| `POST /api/v1/proyectos` | `proyectos:escribir` | Alta de proyecto |
| `GET /api/v1/proyectos/{id}` | `proyectos:leer` | Proyecto con servicios, enlaces y layout |
| `PUT /api/v1/proyectos/{id}/canvas` | `proyectos:escribir` | Guardado del layout del lienzo |
| `POST /api/v1/proyectos/{id}/servicios` | `proyectos:escribir` | Alta de servicio |
| `PUT /api/v1/servicios/{id}` | `proyectos:escribir` | Edición de servicio; entra al changeset |
| `POST /api/v1/proyectos/{id}/changeset/aplicar` | `despliegues:ejecutar` | Aplica los cambios pendientes y redespliega lo afectado |
| `POST /api/v1/proyectos/{id}/arrancar` | `despliegues:ejecutar` | Arranca el proyecto completo; valida conflictos de IP |
| `POST /api/v1/proyectos/{id}/detener` | `despliegues:ejecutar` | Detiene el proyecto completo |
| `POST /api/v1/servicios/{id}/desplegar` | `despliegues:ejecutar` | Despliega o redespliega un servicio |
| `POST /api/v1/servicios/{id}/detener` | `despliegues:ejecutar` | Detiene el servicio, conservando su configuración |
| `POST /api/v1/servicios/{id}/reiniciar` | `despliegues:ejecutar` | Reinicia el contenedor sin reconstruir |
| `PUT /api/v1/servicios/{id}/replicas` | `despliegues:ejecutar` | Escalado horizontal manual |
| `PUT /api/v1/servicios/{id}/recursos` | `proyectos:escribir` | Escalado vertical manual: límites de CPU y memoria |
| `GET /api/v1/servicios/{id}/logs` | `proyectos:leer` | Registro del contenedor, con opción de flujo continuo |
| `GET /api/v1/descubrimiento/contenedores` | `proyectos:leer` | Candidatos a adopción |
| `POST /api/v1/proyectos/{id}/adoptar` | `proyectos:escribir` | Adopta contenedores existentes |
| `GET /api/v1/proyectos/{id}/exportar/compose` | `proyectos:leer` | Exporta la arquitectura como Docker Compose |
| `POST /api/v1/proyectos/importar/compose` | `proyectos:escribir` | Importa un Compose como proyecto nuevo. Devuelve el **informe de importación**, que además de lo creado declara lo que no se pudo representar (anexo [E-21](#2021--e-21--correspondencia-entre-una-configuración-real-y-el-modelo-de-la-solución)). Sin ese informe cualquier pérdida de traducción sería silenciosa **[D-i]** |
| `GET /api/v1/catalogo` · `POST /api/v1/catalogo` | `catalogo:leer` / `catalogo:escribir` | Catálogo de plantillas reutilizables |
| `GET /api/v1/sistema/estado` | `sistema:leer` | CPU, memoria, swap y disco del host |
| `GET /api/v1/red/conflictos` | `sistema:leer` | Estado de reservas y conflictos de IP |
| `GET /api/v1/operaciones/{id}` | `proyectos:leer` | Seguimiento de una operación de despliegue, con su **resultado por contenedor**. Es la ruta que devuelve el campo `seguimiento` del anexo [E-13](#2013--e-13--contrato-del-endpoint-de-despliegue), y la que permite recuperar el estado tras una caída del circuito de la interfaz **[D], D-1 del 2026-07-28** |
| `GET /api/v1/proyectos/{id}/variables` · `PUT /api/v1/proyectos/{id}/variables` | `proyectos:leer` / `proyectos:escribir` | Variables compartidas del proyecto. La lectura devuelve los secretos enmascarados (RN-15); la escritura entra al changeset y marca como pendientes de redespliegue los servicios que las referencian **[D], D-5 del 2026-07-28** |
| `GET /api/v1/descubrimiento/contenedores/{contenedorId}/variables` | `proyectos:leer` | Variables de un contenedor candidato, con la sugerencia de la heurística. Es el insumo del paso obligatorio de clasificación; los valores de las variables sugeridas viajan enmascarados **[D], D-2 del 2026-07-28** |
| `POST /api/v1/proyectos/{id}/catalogo/{itemId}/instanciar` | `proyectos:escribir` | Instancia un ítem del catálogo en el proyecto, con sus parámetros. Crea N servicios y sus enlaces, uno por cada nodo del subgrafo **[D], D-7 del 2026-07-28** |
| `GET /api/v1/catalogo/exportar` | `catalogo:leer` | Exporta el catálogo completo con el envoltorio versionado del anexo [E-6](#206--e-6--ítem-del-catálogo-de-servicios-reutilizables). F-14 y el glosario declaran el catálogo exportable desde la versión 1.0 y la superficie no lo tenía |
| `POST /api/v1/catalogo/importar` | `catalogo:escribir` | Importa un catálogo exportado, convirtiendo los ítems de formato 1 a formato 2 con la regla declarada en E-6 |

**Nota sobre `POST /api/v1/proyectos/{id}/adoptar`.** **[D], D-2:** su carga útil incorpora la clasificación de variables confirmada, con la forma del anexo [E-11](#2011--e-11--adopción-de-un-contenedor-existente), y una petición sin clasificación confirmada no completa la adopción (RN-29). **[D-i]:** que el rechazo concreto sea `422` (DI-09), y el corolario de versionado que se deriva de que no sea un endpoint nuevo sino un contrato distinto —como `/api/v1` no cambia su semántica una vez publicada (§17.1 P.3), el cambio debe entrar antes de la primera publicación de la versión 1 de la API o abrir `/api/v2`— (DI-11).

### §20.16 · E-16 · Catálogo de reglas de negocio RN-01 a RN-37

Citado desde §14, §17.1 P.3, §17.4 P.5, §17.4 P.6 y §17.4 P.10. Procedencia: `Analisis-Final-Integrado.md`, líneas 2183–2210. Estado: `declarado`. La fuente lo declara pensado para que **cada regla se traduzca en una prueba automatizada**: es el insumo directo de la categoría `08-Calidad-Y-Pruebas` y de la batería de `SelfHosted.Service.Core.Domain.Tests`.

**Contexto.** El catálogo completo de reglas de negocio verificables, con el momento en que cada una se valida y la respuesta ante su incumplimiento. La fuente lo declara pensado para que **cada regla se traduzca en una prueba automatizada**, y es el insumo directo de la especificación funcional y de la batería de pruebas del dominio.

**Qué ejercita.** Las treinta y siete reglas con su momento de validación y su respuesta; la autoría declarada regla por regla, que distingue el enunciado que fijó el agente humano —marcado `[D]`— de la exigibilidad que derivó el integrador —marcada `[D-i]`—; y las tres ampliaciones de reglas preexistentes, RN-04, RN-05 y RN-14, que hoy se derivan de la propiedad declarada de espera y de la deducción de si la arista referencia el host.

**Qué verificar.** Que cada regla tenga al menos un caso ejecutable en el anexo [E-22](#2022--e-22--casos-de-prueba-derivados-de-las-configuraciones-reales), con entrada concreta y resultado esperado, y que ninguna quede sin cobertura. Que la respuesta declarada se cumpla también en su código: un `422` no puede materializarse como `400`, ni un `409` como `422`, porque la interfaz distingue esos casos. Que las reglas marcadas `[D-i]` se consuman aguas abajo **declarándolas revisables** y no como requisito cerrado del cliente. Y que el enunciado original de una regla ampliada siga siendo cierto: el marcador alcanza a la ampliación, nunca al enunciado que venía de la fuente base.

| # | Regla | Momento de validación | Respuesta ante incumplimiento |
|---|---|---|---|
| RN-01 (fundamento **[D]**, D-12) | El nombre de servicio es único dentro del proyecto SelfHosted, en minúsculas, con guiones, de 1 a 32 caracteres. **La unicidad se exige porque el nombre es el alias DNS que el motor resuelve dentro de la red del proyecto**, no porque identifique al servicio: identificarlo es tarea de su identidad. Es uno de los dos únicos casos donde el modelo exige nombre único (D-12, consecuencia 2) | Alta y edición | `422` con el campo señalado. Al **instanciar** un ítem del catálogo no se rechaza: se sufija e informa (RN-36) |
| RN-02 | Un servicio pertenece a un único proyecto | Alta y adopción | `409` |
| RN-03 | Dos servicios **activos** de proyectos distintos no pueden compartir dirección IP | Arranque de proyecto o servicio | `409` con informe y resoluciones |
| RN-04 (ampliación **[D-i]**) | Toda arista que **referencia el host** de otro servicio —`clave_destino` igual a `SELFHOSTED_HOST`— debe tener un canal alcanzable entre origen y destino según sus modos de red, porque pedir la dirección de un servicio es declarar que se lo va a consumir por red. Ninguna otra arista lo exige: ni la que referencia un dato de configuración, ni la que sólo declara espera. **La exigencia de canal es independiente de la espera**: se puede esperar sin referenciar el host y referenciar el host sin esperar. **Enunciado reformulado el 2026-07-28 por la tercera pasada (D-11), que lo desacopló del orden de arranque; el comportamiento del enlace que el usuario traza en el lienzo no cambia** | Aplicación del changeset | Enlace marcado inválido; bloquea el arranque |
| RN-05 (ampliación **[D-i]**) | El **grafo de arranque** no puede tener ciclos. El grafo de arranque es el subgrafo de las aristas que **declaran espera** al destino; un ciclo formado por aristas que no esperan no es un ciclo de arranque y no lo rechaza esta regla, pero sí lo alcanza RN-22 si además es un ciclo de valor | Creación de enlace y cambio de la propiedad de espera | `422` señalando el ciclo |
| RN-06 | Toda dirección IP fija debe pertenecer al rango gestionado y no estar excluida | Alta y edición | `422` con la siguiente dirección libre sugerida |
| RN-07 | Un servicio en macvlan no puede publicar puertos en el host | Alta y edición | Campo deshabilitado en la interfaz; `422` desde la API |
| RN-08 | El servicio con origen "repositorio" requiere ruta de Dockerfile y rama | Alta | `422` |
| RN-09 | Al detener un servicio, sus volúmenes y montajes **no** se tocan | Detención | Invariante, verificable por prueba |
| RN-10 | Al eliminar un servicio se pide confirmación escribiendo su nombre, y se ofrece conservar los volúmenes | Eliminación | Interacción obligatoria |
| RN-11 | Un contenedor adoptado no puede adoptarse dos veces | Descubrimiento y adopción | Aparece deshabilitado con el proyecto que lo tomó |
| RN-12 | Los cambios visuales no entran al changeset ni disparan redespliegue | Edición del lienzo | Invariante |
| RN-13 | Aplicar el changeset redespliega **sólo** los servicios afectados | Aplicación | El informe de impacto lo declara antes de ejecutar |
| RN-14 (ampliación **[D-i]**) | El arranque del proyecto respeta el orden topológico del **grafo de arranque**, que es el subgrafo de las aristas que declaran espera al destino. Una arista que no declara espera dibuja el vínculo y marca redespliegue, pero no ordena | Arranque | Invariante |
| RN-15 | Un secreto nunca se devuelve en texto plano por la API ni se escribe en una exportación | Toda respuesta y exportación | Enmascarado con `***` |
| RN-16 | El token de API se muestra una única vez y sólo se persiste su hash | Creación de token | Invariante |
| RN-17 | Toda operación de escritura queda registrada en auditoría con su actor | Cada operación | Invariante |
| RN-18 | El escalado horizontal crea réplicas con nombres sufijados y sin dirección IP fija duplicada | Cambio de réplicas | `422` si el servicio tiene una sola dirección fija y se piden más réplicas |
| RN-19 | El escalado vertical no puede exceder los recursos declarados del host | Cambio de límites | `422` con el máximo admisible |
| RN-20 | Un proyecto con al menos un conflicto puede arrancar parcialmente, quedando "parcialmente activo" | Arranque | Estado explícito, no error silencioso |
| RN-21 (enunciado **[D]**, exigibilidad **[D-i]**) | **[D], D-6:** toda referencia `${{ … }}` debe resolver a una variable de ámbito válido, y los ámbitos válidos son exactamente los tres que la decisión enumera —del propio servicio, compartida del proyecto con `shared.`, o de otro servicio **del mismo proyecto**—, de modo que una referencia a un servicio de otro proyecto es siempre inválida. La variable apuntada puede ser declarada o **provista por el sistema**. **[D-i]:** que la variable apuntada además deba **existir** ya al validar y no sólo al desplegar | **[D-i]:** alta y edición de la variable, aplicación del changeset y creación del contenedor | **[D-i]:** `422` señalando la expresión y la causa: clave inexistente, servicio inexistente o servicio de otro proyecto |
| RN-22 **[D-i]** | Las referencias no pueden formar un **ciclo de valor**: una cadena de referencias que vuelva sobre sí misma, sea dentro de un mismo servicio o atravesando varios. Es distinta de RN-05, que impide un ciclo de **arranque**: desde que el grafo de arranque lo forman sólo las aristas que declaran espera, un ciclo formado por aristas que no esperan no lo ve RN-05 y lo cubre únicamente esta regla. Ningún ciclo puede atravesar el nivel proyecto: una variable compartida contiene siempre un literal o material secreto, nunca una referencia, y el esquema lo hace cumplir por ausencia de columna (anexo E-9) | Alta y edición de la variable, y resolución previa al despliegue | `422` señalando la cadena completa del ciclo |
| RN-23 **[D-i]** | El carácter de secreto se propaga por la referencia: si la variable referenciada es secreta, la que la referencia se trata como secreta a todos los efectos. Vale también para una referencia interpolada dentro de un valor más largo. Ninguna variable provista por el sistema es secreta, de modo que una referencia a `SELFHOSTED_*` nunca dispara la propagación | Resolución, toda respuesta de la API y toda exportación | Enmascarado con `***`, igual que RN-15. El valor resuelto no se persiste en claro |
| RN-24 | La referencia se resuelve en el backend inmediatamente antes de crear el contenedor. El contenedor recibe el **valor**, nunca la expresión | Creación del contenedor | Invariante. Una referencia no resoluble aborta el despliegue de ese servicio con la causa identificada (RN-21), sin afectar a los demás contenedores de la operación (RN-31) |
| RN-25 **[D-i]** | Una exportación a Compose nunca emite la expresión `${{ … }}`: emite el valor resuelto, o `${CLAVE}` con el archivo de variables vacío si el valor referenciado es secreto. Y todo `$` que forme parte de un **valor literal** —incluido el de una variable cuyo valor contiene `${{` o `${VAR}` como texto— se emite **escapado como `$$`**, que es el escape propio de Compose, para que Compose lo entregue tal cual en lugar de interpolarlo ni fallar al leerlo. La expresión sin resolver se preserva en el manifiesto propio | Exportación | Invariante, verificable por prueba: ningún archivo Compose exportado contiene la secuencia `${{` sin escapar, ningún `$` literal queda sin duplicar, y el archivo levanta |
| RN-26 **[D-i]** | Una importación desde Compose **nunca deriva referencias de la interpolación de Compose**: `${VAR}` y `$VAR` se traducen con las reglas del anexo E-21; un `$$` del archivo es el escape de Compose y se importa como un `$` literal; una ocurrencia literal de `${{` se importa como texto, sin interpretarse, y se persiste escapada como `$${{`. La **única** referencia que la importación crea es la que reexpresa un `depends_on` explícito sobre una variable cuyo literal ya coincide con el host y el puerto del destino: no inventa un valor ni una variable, reexpresa el que el archivo ya tenía (anexo E-21) | Importación | Invariante |
| RN-27 **[D-i]** | No se puede eliminar una variable compartida del proyecto, ni una variable referenciada desde otro servicio, mientras exista al menos una referencia vigente | Eliminación de la variable | `409` con la lista de servicios y claves que la referencian |
| RN-28 (reformulada **[D]**, D-12) | La clave de una variable compartida **no exige unicidad dentro del proyecto**: es puramente descriptiva, no la lee ningún proceso y existe sólo para ser referenciada, de modo que dos compartidas pueden llamarse igual y se distinguen por identidad. Sí respeta el formato de una clave de variable. **La unicidad que sí se exige** es la de la clave de una variable **de servicio** dentro de su servicio, porque ésa es el contrato con el proceso que corre en el contenedor: es el segundo de los dos casos de D-12 | Alta y edición | `422` sólo por formato, o por clave duplicada **dentro de un mismo servicio** |
| RN-29 (enunciado **[D]**, exigibilidad **[D-i]**) | **[D], D-2:** la adopción de un contenedor no se completa sin el paso de clasificación de variables: se presentan **todas** las variables importadas, las que la heurística sugiere vienen premarcadas como secretas, y el usuario puede marcar o desmarcar cualquiera. La heurística sugiere; no decide | Adopción | **[D-i]:** `422` si se intenta confirmar la adopción sin clasificación. Que el servicio no se cree es **[D]**: es lo que significa que la adopción no se complete |
| RN-30 | Instanciar un ítem del catálogo crea **N servicios y N contenedores**, uno por cada nodo de su subgrafo, más los enlaces entre ellos. Ningún servicio instanciado comparte contenedor con otro (I2) | Instanciación | Invariante, verificable por prueba |
| RN-31 | El resultado de un despliegue se determina **por contenedor, no por operación**: cada contenedor se marca como desplegado o como fallido con su error, la caída del circuito de la interfaz no lo altera, y al reabrir el proyecto el estado real de cada contenedor se verifica contra el motor. Un despliegue parcial es un estado legítimo | Despliegue y apertura del proyecto | Invariante. La operación en lote responde con el resultado de cada contenedor, no con un resultado único |
| RN-32 (enunciado **[D]**, nombres y exigibilidad **[D-i]**) | **[D], D-6 segunda pasada, acotada por D-9:** cada servicio expone un conjunto de variables **provistas por el sistema**, de sólo lectura, que el usuario no declara ni edita y que son referenciables como cualquier otra. El conjunto es exactamente `SELFHOSTED_HOST` y `SELFHOSTED_SERVICE_NAME`: **no hay variable de puerto** (D-9), el puerto se escribe literal. **[D-i]:** llevan prefijo `SELFHOSTED_`, se nombran en inglés, ninguna es secreta, y el usuario no puede declarar ni editar una variable propia cuya clave empiece con ese prefijo | Alta y edición de variables | `422` al declarar o editar una clave con prefijo `SELFHOSTED_` |
| RN-33 (enunciado **[D]**, forma **[D-i]**) | **[D], D-8, ampliada por D-12:** renombrar un elemento referenciado **no invalida ni altera ninguna referencia** que le apunte, y no produce cambios pendientes en el changeset. Alcanza al **servicio** y, desde D-12, también a la **variable**: renombrar `POSTGRES_USER` en `db` no rompe la referencia que le apunta desde `api`. Un servicio puede llamarse `shared` sin que ninguna expresión quede ambigua. **[D-i]:** se logra persistiendo la expresión en su forma vinculada, con el identificador del servicio destino **y el de la variable**, y renderizando los nombres al mostrarla (anexo E-4) | Renombrado de un servicio o de una variable | Invariante, verificable por prueba: tras renombrar, toda expresión que apuntaba al elemento sigue resolviendo al mismo valor y la interfaz muestra el nombre nuevo |
| RN-34 **[D-i]** | Toda arista debe aportar un vínculo: o **referencia** una variable del destino —y entonces lleva la clave de la variable de origen y la del destino, las dos o ninguna—, o **declara espera** al destino, o ambas cosas. Al crear una arista el sistema **propone** el valor de la espera —la propone verdadera si la referencia apunta al host del destino— y el usuario puede cambiarlo. Entre dos servicios no puede haber más de una arista de espera sin variable | Creación y edición de la arista | `422` en una arista que no referencia ni espera; `409` en una segunda arista de espera sin variable entre el mismo par |
| RN-35 **[D]**, D-12 | **Las relaciones entre objetos se establecen por identidad y nunca por nombre.** Todo elemento que se referencia, que sobrevive al objeto que lo contiene o que tiene ciclo de vida propio es un objeto con identidad; el nombre es un atributo suyo. En particular, **el secreto y la red del proyecto son objetos**, y una referencia vincula el servicio y la variable, no sus nombres | Alta y edición de cualquier vínculo | Invariante del modelo. Su materialización relacional es materia de la Fase C |
| RN-36 **[D]**, D-13 | Al instanciar un ítem del catálogo, si el nombre de un servicio del subgrafo ya existe en el proyecto destino, el sistema **sufija automáticamente e informa qué sufijó**; no rechaza y no pregunta. Como la identidad ya es el identificador, sufijar no rompe ninguna referencia y renombrar después es gratis. Una clave de variable que ya existe **no** es conflicto: se crea el objeto nuevo y se advierte según RN-37 | Instanciación | Servicio creado con nombre sufijado, y aviso no bloqueante con el nombre asignado |
| RN-37 **[D]**, D-13 | El sistema **detecta y advierte, sin bloquear**, cinco condiciones de higiene del modelo: variable compartida sin ninguna referencia; dos elementos con el mismo nombre visible en el mismo ámbito; al instanciar, una clave que ya existe con el **mismo** valor —donde sí se ofrece reusar—; al instanciar, una clave que ya existe con **distinto** valor —donde se crean separadas y se avisa—; y referencia que quedó sin uso tras un cambio | Instanciación, alta y edición, y revisión periódica del proyecto | Aviso informativo. **Ninguna condición bloquea ninguna operación** |

Las catorce reglas RN-21 a RN-34 se incorporaron el 2026-07-28 con ocasión de las decisiones del agente humano del proyecto —RN-32 en la segunda pasada sobre D-6, y RN-33 y RN-34 en la tercera—, pero **no todas tienen la misma autoría**, y la columna de identificador lo declara:

- **[D]**, contenido de la decisión: RN-24 (D-6), RN-30 (D-7) y RN-31 (D-1) completas, más el **enunciado** de RN-21 (D-6), el de RN-29 (D-2), el de RN-32 (D-6 y D-9) y el de RN-33 (D-8). Son enunciados que el agente humano fijó.
- **[D-i]**, especificación de integración derivada: RN-22, RN-23, RN-25, RN-26, RN-27, RN-28 y RN-34 completas, más la **exigibilidad** de RN-21, RN-29, RN-32 y RN-33 —momento de validación, códigos de respuesta, nombres de las claves provistas y forma concreta del vínculo—, cuyos enunciados sí son del agente humano y quedan marcados `[D]` dentro de la propia regla. Son las reglas que hicieron falta para que las decisiones fueran implementables, y las eligió el orquestador al integrar. Están aplicadas y pendientes de confirmación; figuran en la tabla de §19.

Las veinte reglas anteriores no se renumeran, y **ninguna cambió el comportamiento observable del enlace que el usuario traza en el lienzo**, que sigue referenciando el host del destino, declarando espera y quedando sujeto a lo mismo que antes. Tres conservan una ampliación, y su celda de identificador lo declara con el mismo criterio que las reglas nuevas: **RN-04** exige canal alcanzable según si la arista referencia el host, con independencia de la espera; **RN-05** acota su grafo al de arranque; y **RN-14** declara que ordena ese mismo subgrafo. Las tres se derivan hoy de la propiedad declarada de espera (D-11) y de la deducción de si la arista referencia el host. **RN-01 recuperó su enunciado original**: la reserva del nombre `shared` que la segunda pasada le había agregado dejó de hacer falta al persistirse el vínculo y no el nombre (D-8). El marcador alcanza a la ampliación, nunca al enunciado original de la regla, que sigue siendo **[E]** de la fuente base.

Detalle de RN-18: el escalado horizontal y la dirección fija de macvlan son **incompatibles** entre sí, porque dos réplicas no pueden compartir dirección. Un servicio en macvlan que quiera escalar necesita una dirección por réplica; el modelo lo admite con la clave única `(servicio_id, numero_replica)` de `reservas_ip`, pero la interfaz debe pedirlas explícitamente en lugar de fallar en el arranque.

### §20.17 · E-17 · Ciclo de vida del despliegue y correspondencia con el motor

Citado desde §17.4 P.2 y §17.3 P.10. Procedencia: `Analisis-Final-Integrado.md`, líneas 373–405. Estado: `declarado`. Es la máquina de estados que el sincronizador debe reproducir y la tabla de traducción que consulta en cada reconciliación.

**Contexto.** La máquina de estados de un despliegue y la tabla que traduce el estado real que reporta el motor de contenedores al estado que la solución muestra. Es lo que el sincronizador reproduce en cada reconciliación y lo que se consulta al reabrir un proyecto.

**Qué ejercita.** El alcance por contenedor de la máquina, que es consecuencia directa de RN-31; los estados que no son caída y que la interfaz debe distinguir —degradado, pausado, finalizado— y el estado huérfano, que es el que hace visible la deriva cuando alguien opera contenedores por fuera de la solución; y la ausencia deliberada de una transición asociada a la caída del circuito de la interfaz.

**Qué verificar.** Que un contenedor `running` con verificación de salud en `unhealthy` quede en `Activo (degradado)` y no en `Caido` (T-28). Que un `exited` con código cero quede `Finalizado` y con código distinto de cero, `Caido` (T-29). Que al reabrir el proyecto todo despliegue se resuelva en un estado y nunca en «no se sabe»: el que nunca llegó a crearse queda `Fallido` y el que existía y desapareció, `Huérfano`. Que la reconciliación se ejecute también en la apertura del proyecto y no sólo por período. Y que ninguna transición de la máquina se dispare por un evento del circuito de la interfaz, que sólo observa.

```mermaid
stateDiagram-v2
    [*] --> Pendiente : despliegue solicitado
    Pendiente --> Construyendo : requiere build de imagen
    Pendiente --> Creando : imagen ya disponible
    Construyendo --> Creando : build exitoso
    Construyendo --> Fallido : error de build
    Creando --> Activo : contenedor iniciado o healthcheck OK
    Creando --> Fallido : error al crear o arrancar
    Activo --> Caido : el proceso muere con codigo distinto de cero
    Activo --> Finalizado : el proceso termina con codigo cero
    Caido --> Activo : reinicio manual o politica de reinicio
    Activo --> Retirado : detener servicio o reemplazo por nuevo despliegue
    Finalizado --> Retirado : limpieza
    Fallido --> [*]
    Retirado --> [*]
```

Correspondencia con el estado real del motor de contenedores, que es lo que el servicio consulta para sincronizar:

| Estado del contenedor | Estado del despliegue | Nota |
|---|---|---|
| `created` | `Pendiente` | Creado, aún sin arrancar |
| `running` sin healthcheck | `Activo` | |
| `running` con healthcheck `starting` | `Creando` | Todavía no confirmado |
| `running` con healthcheck `healthy` | `Activo` | |
| `running` con healthcheck `unhealthy` | `Activo (degradado)` | Estado visible en el nodo; no es caída |
| `restarting` | `Caido` | La política de reinicio está actuando |
| `exited` con código 0 | `Finalizado` | Típico de tareas puntuales |
| `exited` con código distinto de 0 | `Caido` | |
| `paused` | `Activo (pausado)` | |
| `dead` o eliminado | `Retirado` | |
| No existe en el motor, con despliegue registrado como activo | `Huérfano` | Es el estado de CL-02 y CL-03. Alcanza también al despliegue cuya creación quedó a medio camino: al reabrir el proyecto SelfHosted se verifica contra el motor y se resuelve en un estado, nunca en "no se sabe" **[D], D-1** |

**Alcance de esta máquina de estados [D], D-1 del 2026-07-28.** La máquina describe **un contenedor**, no una operación. Es la consecuencia directa de que el resultado del despliegue se determine por contenedor (RN-31), y tiene tres efectos sobre el sincronizador:

1. **No hay estado de operación que reconciliar.** El sincronizador reconcilia despliegues contra contenedores, uno a uno, con la tabla de arriba. Una operación que desplegó tres contenedores deja tres despliegues, cada uno con su propio estado; el estado del proyecto se deriva de ellos y puede ser `parcialmente-activo`.
2. **La caída del circuito de la interfaz no es un evento de esta máquina.** No hay transición asociada: el despliegue vive del lado del servidor y el circuito sólo lo observa. Ninguna de las transiciones del diagrama la menciona, y eso es deliberado.
3. **Al reabrir el proyecto se verifica el estado real de cada contenedor contra el motor**, con esta misma tabla, antes de pintar el lienzo. Un despliegue registrado como `Creando` cuyo contenedor no existe en el motor se resuelve como `Fallido` si nunca llegó a crearse, y como `Huérfano` si existía y desapareció. Es la misma reconciliación de CL-02, aplicada además en la apertura y no sólo cada 30 segundos.

### §20.18 · E-18 · Maquetado de la interfaz web

Citado desde §6 (flujo 1), §15 (etapa `b`) y §16 (`SDD/Maquetas/SelfHosted-Service/`). Procedencia: `Analisis-Final-Integrado.md`, líneas 1688–1833. Estado: `declarado`. Es el insumo de la categoría `03-UX-UI-DX` de SelfHosted-Web y de la maqueta de validación visual contra la que se valida la etapa `b`.

**Contexto.** El maquetado de la interfaz web: el mapa de navegación que la etapa `b` debe dejar navegable, la pantalla del lienzo con sus decisiones de disposición, la anatomía del nodo de servicio con el origen de cada dato, el panel lateral, el tablero del segundo alcance y el lenguaje visual de estados. Es el insumo de la categoría de experiencia de uso y de la maqueta contra la que se valida la etapa `b`.

**Qué ejercita.** El lienzo como vista por defecto del proyecto; el banner de cambios pendientes, que hace visible el estado transaccional del borrador; el panel derecho contextual; el contrato visual de estados, con el violeta reservado en exclusiva a «pendiente de aplicar»; el origen declarado de cada dato del nodo, que ata la maqueta al modelo; y las restricciones de implementación del tablero, que acotan cuánto puede costar mirar.

**Qué verificar.** Que todas las rutas del mapa queden navegables al cerrar la etapa `b`, con pantallas marcadoras de posición donde todavía no hay capacidad. Que el violeta no se use en ningún otro elemento de la interfaz: un tercer estado visual sólo funciona si es inequívoco. Que «Guardar cambio» agregue al changeset y **no** despliegue, y que las etiquetas de los botones lo dejen claro, porque es la confusión más probable del modelo. Que no haya ninguna recolección de estadísticas con las vistas cerradas y que exista un solo recolector en segundo plano, no un flujo por pestaña (criterios de NB-07). Y que las dos brechas declaradas se resuelvan y no se inventen: la distinción visual entre las aristas que declaran espera y las que no, y el maquetado del paso de clasificación de variables y de la pantalla de variables compartidas, que este anexo no cubre y que §24 registra como pendientes.

**Mapa de navegación.** Las rutas que la etapa `b` debe dejar navegables:

```mermaid
graph TD
    L["/login<br/>o alta inicial del administrador"] --> P["/proyectos<br/>listado"]
    P --> C["/proyectos/id<br/>LIENZO · vista por defecto"]
    C --> SP["Panel lateral del servicio<br/>configuracion, variables, red, recursos"]
    C --> CH["Cajon de cambios pendientes"]
    C --> LG["/proyectos/id/servicios/sid/logs"]
    P --> D["/dashboard<br/>alcance 2"]
    P --> CAT["/catalogo<br/>alcance 3"]
    P --> DESC["/descubrimiento<br/>adopcion de contenedores"]
    P --> CFG["/configuracion<br/>rango de IP, tokens de API, respaldos"]
```

**Pantalla del lienzo**, que es la vista por defecto de un proyecto SelfHosted:

```text
┌──────────────────────────────────────────────────────────────────────────────────┐
│  ☰  SelfHosted · Portal Interno            [▶ Arrancar] [■ Detener]   admin ▾    │
├───────┬──────────────────────────────────────────────────────┬───────────────────┤
│       │  ⚠ 3 cambios pendientes    [Ver detalle]  [Aplicar]  │  Actividad        │
│  ▣    │ ─────────────────────────────────────────────────────│ ───────────────── │
│ Lienzo│                                                      │ ✓ api desplegado  │
│       │      ┌──────────────┐          ┌──────────────┐      │   hace 2 min      │
│  ▤    │      │ ● api        │─────────▶│ ● db         │      │ ✓ cache agregado  │
│ Logs  │      │ portal-api   │          │ postgres:16  │      │   hace 5 min      │
│       │      │ ▮▮▮▯ 186 MB  │          │ ▮▮▯▯ 410 MB  │      │ ⚠ conflicto IP    │
│  ▦    │      └──────┬───────┘          └──────────────┘      │   resuelto        │
│ Métr. │             │                                        │                   │
│       │             ▼                                        │ ───────────────── │
│  ⚙    │      ┌──────────────┐                                │ Proyecto          │
│ Ajus. │      │ ○ cache      │  ← nodo pendiente (violeta)    │ 3 servicios       │
│       │      │ redis:7.4    │                                │ 2 activos         │
│       │      └──────────────┘                                │ red: bridge       │
│       │                                                      │ autoarranque: si  │
│       │   [+ Nuevo servicio]   [⤢ Ajustar]  [🗗 Minimapa]     │                   │
└───────┴──────────────────────────────────────────────────────┴───────────────────┘
```

Decisiones de esta pantalla: el lienzo es la vista por defecto del proyecto, porque la arquitectura *es* el proyecto; el banner de cambios pendientes va fijo arriba, con contador, detalle y aplicar, para hacer visible el estado transaccional del borrador; el panel derecho es contextual, con actividad cuando no hay selección y configuración del servicio cuando hay un nodo seleccionado; arrancar y detener el proyecto completo están siempre visibles en la barra superior, por ser las dos operaciones más frecuentes; y hay un único botón primario por pantalla, "Nuevo servicio".

**Anatomía del nodo de servicio:**

```text
        ┌────────────────────────────────────┐
   ○────┤ 🐳  api                    ● Activo├────○      ○ = puerto de enlace
(entrada)│    registro/portal-api:1.4.2      │ (salida)
        │    ▮▮▮▯▯ CPU 3.4%   186 / 512 MB  │
        │    192.168.1.130 · macvlan         │
        │    ⟳ unless-stopped   ×2 replicas  │
        └────────────────────────────────────┘
              ▲ borde por estado · violeta si esta pendiente de aplicar
```

| Zona | Contenido | Origen del dato |
|---|---|---|
| Cabecera | Icono por categoría, nombre, insignia de estado | `servicio.nombre`, `estadoActual.estado` |
| Subtítulo | Imagen resuelta con etiqueta | `origen.imagen` y `origen.etiqueta` |
| Métricas | Barra de CPU y memoria usada sobre el límite | `despliegue.metricas` |
| Red | Dirección y modo, o alias DNS si es bridge | `red` |
| Pie | Política de reinicio y número de réplicas | `politicaReinicio`, `replicas` |
| Puertos laterales | Anclas de las aristas: entrada a la izquierda, salida a la derecha | Modelo de puertos de la librería |

**Panel lateral de servicio:**

```text
┌─ api ────────────────────────────── ✕ ─┐
│ ● Activo · desde hace 1 h 12 min       │
│ [⟳ Reiniciar] [↻ Redesplegar] [■ Parar]│
├────────────────────────────────────────┤
│ General │ Variables │ Red │ Recursos   │
│ Montajes│ Despliegues │ Logs           │
├────────────────────────────────────────┤
│ Origen        ▸ Imagen de registro     │
│ Imagen          registro/portal-api    │
│ Etiqueta        1.4.2   [fijada ▾]     │
│ Reinicio        unless-stopped ▾       │
│ Autoarranque    [x]                    │
│ Replicas        [– 2 +]                │
│ Efimero         [ ]                    │
├────────────────────────────────────────┤
│         [Cancelar]  [Guardar cambio]   │
└────────────────────────────────────────┘
```

"Guardar cambio" **no despliega**: agrega la modificación al changeset del proyecto. El despliegue ocurre al aplicar el changeset o al pulsar explícitamente "Redesplegar". Esta distinción debe quedar clara en las etiquetas de los botones, porque es la fuente más probable de confusión del modelo.

**Dashboard del segundo alcance**, en tres capas: servidor, proyecto y contenedor.

```text
┌─ Servidor ───────────────────────────────────────────────────────────────┐
│  CPU  ▮▮▮▯▯▯▯▯ 34%    RAM ▮▮▮▮▮▯▯▯ 16.2/32 GB    SWAP ▮▮▯▯▯▯▯▯ 6.5/32 GB │
│  Disco / ▮▮▯▯▯▯▯▯ 115/884 GB     Contenedores 8 activos / 8 · 18 imagenes │
└──────────────────────────────────────────────────────────────────────────┘
┌─ Proyectos ──────────────────────────────────────────────────────────────┐
│  ● Portal Interno    3/3 activos   CPU 6%   RAM 1.1 GB   [abrir lienzo]  │
│  ◐ Impresion 3D      1/2 activos   CPU 1%   RAM 0.4 GB   [abrir lienzo]  │
│  ○ Laboratorio IA    0/3 activos   —        —            [abrir lienzo]  │
└──────────────────────────────────────────────────────────────────────────┘
┌─ Contenedores de "Portal Interno" ───────────────────────────────────────┐
│  api    ● Activo   3.4%  186/512 MB   1h12m   [logs] [reiniciar]         │
│  db     ● Activo   1.2%  410/1024 MB  2d 4h   [logs] [reiniciar]         │
│  cache  ● Activo   0.3%   24/256 MB   1h12m   [logs] [reiniciar]         │
└──────────────────────────────────────────────────────────────────────────┘
```

Restricciones de implementación del dashboard: el origen de los datos es el motor de contenedores, no peticiones HTTP a los servicios; la frecuencia es moderada, de 3 a 5 segundos para la vista abierta y ningún sondeo para las vistas cerradas; hay un solo recolector en segundo plano que publica a los circuitos conectados, no un flujo por pestaña abierta; y los datos del host se leen del sistema de archivos virtual del sistema operativo montado en el contenedor, en modo sólo lectura.

**Lenguaje visual de estados.** Es el contrato visual que el nodo del lienzo debe respetar y contra el que se valida la fidelidad de la etapa `b`:

| Estado | Color | Insignia | Borde del nodo |
|---|---|---|---|
| Activo | Verde | ● | Sólido tenue |
| Activo degradado (healthcheck fallando) | Ámbar | ◐ | Sólido ámbar |
| Creando o construyendo | Azul | ◔ animado | Punteado animado |
| Detenido o retirado | Gris | ○ | Sólido gris |
| Caído o fallido | Rojo | ✕ | Sólido rojo |
| **Pendiente de aplicar** | **Violeta** | ◇ | **Punteado violeta** |
| Huérfano (contenedor adoptado desaparecido) | Gris con contorno rojo | ⚠ | Rayado |

El violeta se reserva **exclusivamente** para "pendiente de aplicar" y no se usa en ningún otro elemento de la interfaz: un tercer estado visual sólo funciona si es inequívoco.

### §20.19 · E-19 · Parque de contenedores de referencia

Citado desde §1, §8 y §18 (SM-03). Procedencia: `Analisis-Final-Integrado.md`, líneas 293–320. Estado: `medido`, normalizado y ofuscado en origen. La fuente lo declara explícitamente como **juego de datos de maqueta** para poblar el lienzo y el módulo de adopción; es el contenido de SM-03 y el punto de partida de las métricas de §8.

**Contexto.** El inventario del parque real del servidor de referencia al momento del relevamiento: ocho contenedores repartidos en cinco conjuntos, con su imagen, su modo de red y dirección, su forma de persistencia y sus límites. Es el punto de partida del problema que §1 declara y el juego de datos con el que se puebla la maqueta y el módulo de adopción.

**Qué ejercita.** Los patrones observables que el modelo debe soportar: versiones fijadas en la etiqueta de imagen frente al uso deliberado de una etiqueta flotante, dispositivos del host anclados por identificador estable, capacidades adicionales del kernel, servicios efímeros frente a permanentes, reinicio automático generalizado, persistencia mayoritariamente por montaje de directorio y archivos de variables no versionados con credenciales adentro. Es la evidencia de por qué el alta de servicio no puede limitarse a imagen, puertos y variables.

**Qué verificar.** Que el juego de datos de siembra reproduzca los ocho contenedores y los cinco conjuntos sin configuración manual previa, que es el criterio de aceptación CA-09. Que las ocho dimensiones de configuración que estos patrones exigen existan en el alta (criterio de NB-04). Que los denominadores de las métricas de negocio se puedan leer contra este inventario: ocho contenedores para la métrica de adopción y cinco conjuntos para la cobertura del registro. Y que el conjunto se pueda recorrer en el lienzo dentro de los umbrales de la puerta técnica PT-01, que fija treinta nodos y cuarenta aristas.

| Contenedor de ejemplo | Imagen | Proyecto Compose | Red y dirección | Persistencia | Límite |
|---|---|---|---|---|---|
| `panel-admin` | `imagen-oficial/panel-ce:latest` | `panel-admin` | macvlan · `192.168.1.130` | volumen nombrado + socket de Docker | — |
| `vm-windows` | `imagen-comunidad/windows` | `print-server` | macvlan · `192.168.1.133` | montaje de directorio (imagen dispersa) | 8 GB / 4 vCPU |
| `bot-mensajeria` | `registro-privado/bot-moderador:latest` | `bot-mensajeria` | macvlan · `192.168.1.134` | montaje de directorio con SQLite | 512 MB |
| `runner-ci` | `registro-privado/runner-ci:2.x` | `runner-ci` | macvlan · `192.168.1.138` | montaje de directorio como caché | 8 GB |
| `print-server` | `registro-privado/print-server:1.4.x` | `print-server` | macvlan · `192.168.1.139` | montaje de directorio | 512 MB |
| `ia-api` | `imagen-oficial/modelos:0.32` | `ia-local` | bridge `ia-net` · `172.19.0.2` | montaje de directorio (decenas de GB) | — |
| `ia-webui` | `imagen-oficial/webui:0.10` | `ia-local` | bridge `ia-net` · `172.19.0.3` | montaje de directorio | — |
| `ia-video` | `registro-privado/video:0.3` | `ia-local` | bridge `ia-net` · `172.19.0.4` | montaje de directorio | — |

Patrones observables en el parque real que el modelo debe soportar, y que el juego de datos de maqueta debe reproducir **[E]**: servicios con versión fijada en la etiqueta de imagen y política de no actualizar automáticamente, casi ninguno usando `latest` deliberadamente; servicios con dispositivos del host anclados, incluido USB por identificador estable; servicios con capacidades adicionales del kernel y requisitos de privilegios; servicios efímeros que se reconstruyen, como un runner de integración continua, frente a servicios permanentes; todos con reinicio automático configurado; persistencia mayoritariamente por montaje de directorio y no por volumen nombrado; y archivos de variables de entorno no versionados que contienen credenciales.

La traducción de estos patrones a requisitos del alta de servicio es directa: el formulario no puede limitarse a imagen, puertos y variables. Necesita, como mínimo, etiqueta de imagen explícita con política de actualización, montajes de volumen o directorio, dispositivos, capacidades, límites de CPU y memoria, política de reinicio, modo de red con dirección y marca de servicio efímero. El anexo [E-2](#202--e-2--servicio-con-sus-tres-variantes-de-origen) refleja exactamente eso.

### §20.20 · E-20 · Configuraciones reales de contenedor, ofuscadas

Citado desde §3, §16.1, §17.3 P.3 y §18 (SM-03, SM-06). Procedencia: archivos de despliegue en producción del servidor de referencia, relevados y sincronizados con su estado real el 2026-07-18, cuyo inventario está indexado en `Host.Infra.Documentos/ia-db/indexes/02_servicios-docker.md` y `03_redes.md`. Estado: `medido` en cuanto a estructura y valores de capacidad —son configuraciones que corren hoy—, con **ofuscación aplicada** según la política declarada más abajo.

**Contexto.** Seis configuraciones de despliegue reales y en funcionamiento en el servidor de referencia, ofuscadas según la política que el propio anexo declara. Son el insumo inverso de los demás anexos: no describen cómo la solución representará un servicio, sino qué tiene que ser capaz de importar, representar en el lienzo y volver a exportar sin pérdida.

**Qué ejercita.** Origen por imagen con etiqueta flotante, por Dockerfile con argumentos de construcción y por imagen sin etiqueta; red macvlan creada por un proyecto y consumida como externa por los demás; volumen nombrado, montaje de directorio y montaje del socket del motor; dispositivos anclados y capacidades del kernel; límites y reservas de recursos; servicio efímero; secretos embebidos en el archivo de despliegue (C-2) y secretos por archivo externo (C-6), que es el mismo parque conteniendo el patrón incorrecto y su corrección; y un proyecto multi-servicio en bridge con dependencia declarada, que es el que ejercita el grafo.

**Qué verificar.** Que las seis se importen, se representen y se exporten sin pérdida de dimensiones de configuración, que es el criterio de NB-03 con denominador seis. Que C-1, que monta el socket, resulte no adoptable por defecto (T-16). Que la clave de C-2 llegue al paso de clasificación desmarcada y que marcarla la deje cifrada, con su traza registrada (T-17, T-32). Que la importación de C-5 no derive ninguna referencia de la interpolación de Compose y sí reexprese el literal del `depends_on` (T-40). Que la ida y vuelta de C-3 sea equivalente (T-30). Y que ningún secreto real aparezca en ninguna forma en este documento, que es público: la verificación es de contenido y no de estructura.

**Por qué están acá.** Los anexos E-1 a E-19 son modelos de diseño: describen cómo la solución representará un servicio. Estos son el insumo inverso, y son los únicos datos del intake tomados de un sistema real en funcionamiento: seis configuraciones que la solución tiene que ser capaz de **importar, representar en el lienzo y volver a exportar sin pérdida**. Sirven a dos propósitos concretos: poblar la maqueta con casos que no son inventados, y dar a las pruebas fixtures cuya forma ya se sabe que existe.

**Política de ofuscación aplicada a este anexo.** Este documento es público. Sobre el material original se aplicó exactamente el mismo criterio del Anexo C del análisis integrado, que ya rige para E-19:

| Categoría | Tratamiento |
|---|---|
| Nombre del host, su FQDN y su dominio | **Eliminados.** Se dice "el host de contenedores" |
| Nombres de contenedor, de proyecto y de imagen propia | **Normalizados** a los mismos alias que usa E-19 (`panel-admin`, `vm-windows`, `bot-mensajeria`, `runner-ci`, `print-server`, `ia-api`, `ia-webui`, `ia-video`), y los registros a `registro-privado/…`, `imagen-oficial/…`, `imagen-comunidad/…` |
| Direcciones IP | **Reasignadas** a las mismas direcciones ya ofuscadas en E-19, dentro del rango gestionado que declara E-8. Se conservan la estructura, el modo de red y la relación entre servicios |
| Secretos, claves, contraseñas y tokens | **Eliminados por completo.** Ningún valor real se transcribe: se reemplazan por una referencia a secreto o por un marcador explícito. Uno de los casos originales llevaba una clave simétrica embebida en el propio archivo de despliegue; acá aparece como lo que la solución debe hacer con ella, no con su valor |
| Rutas absolutas del sistema de archivos del propietario, usuario y UID | **Reemplazadas** por rutas de ejemplo (`/srv/…`) y por un usuario genérico |
| Identificadores de dispositivo USB y números de serie | **Truncados** al patrón, conservando que el anclaje es por identificador estable |
| Puertos en escucha del host y su alcance de exposición real | **Omitidos.** Se conserva la publicación de puertos donde es parte de la estructura del despliegue, pero no se declara qué escucha el servidor real ni en qué interfaces |
| Hallazgos de seguridad, servicios sin autenticar y riesgos abiertos del servidor | **Omitidos por completo** |
| Marca y modelo del hardware, de la placa y de la tarjeta de red | **Omitidos.** Se conservan sólo los valores de capacidad, que ya están en §10 |
| Capacidades, límites, políticas de reinicio, modos de red y patrones de montaje | **Conservados.** Son justamente el insumo que justifica el modelo de datos |

---

**C-1 · Servicio de imagen pública en macvlan, con el socket del motor montado.** Es el caso que la regla RA-04 marca como no adoptable por defecto: gobernarlo desde la solución crearía una dependencia circular de control.

```yaml
services:
  panel-admin:
    image: imagen-oficial/panel-ce:latest
    container_name: panel-admin
    restart: unless-stopped
    networks:
      vlan:
        ipv4_address: 192.168.1.130
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
      - panel_admin_data:/data

networks:
  vlan:
    external: true
    name: infra_vlan

volumes:
  panel_admin_data:
    name: panel_admin_data
```

Qué ejercita: origen por imagen con etiqueta flotante `latest`, que es el anti-patrón que la política de actualización del modelo de servicio debe poder declarar; red macvlan consumida como externa; volumen nombrado y montaje del socket; ausencia de límite de recursos.

---

**C-2 · Servicio propio con secreto embebido en el archivo de despliegue.** El original llevaba una clave simétrica en texto plano dentro del compose. Acá aparece como referencia, que es exactamente lo que la solución debe producir al importarlo.

```yaml
services:
  bot-mensajeria:
    image: registro-privado/bot-moderador:latest
    container_name: bot-mensajeria
    environment:
      Moderacion__Gateway: "Mensajeria"
      Persistencia__RutaBase: "/app/data/moderador.db"
      # En el archivo original esta clave viajaba en claro dentro del compose.
      # Al importarlo, la solucion debe detectarla por heuristica (RA-05),
      # enmascararla y exigir recarga manual: nunca conservar el valor.
      ClaveMaestra: "${CLAVE_MAESTRA}"
    networks:
      vlan:
        ipv4_address: 192.168.1.134
    volumes:
      - ./data:/app/data
    restart: always
    deploy:
      resources:
        limits:
          memory: 512M
```

Qué ejercita: persistencia por montaje de directorio con una base SQLite adentro, que es el patrón mayoritario del parque; límite de memoria declarado; y, sobre todo, un hueco concreto de la heurística declarada.

**Hallazgo [D].** La heurística de RA-05 enmascara las variables cuyo nombre contiene `PASSWORD`, `TOKEN`, `SECRET`, `KEY` o `PAT`. La clave de este caso real **no contiene ninguno de esos fragmentos**: la heurística, tal como estaba declarada, la importaría en claro. No es un defecto del ejemplo sino de la regla, y aparece sólo porque el ejemplo es real. Tres resoluciones posibles, que el cliente debía elegir: ampliar la lista con los fragmentos del idioma del dominio (`CLAVE`, `CONTRASENA`, `CREDENCIAL`); complementar el nombre con una heurística sobre la **forma del valor**, que detecte cadenas de alta entropía y material codificado en base64; o pedir confirmación de cada variable importada, tratando toda la importación como sospechosa hasta que el usuario la revise.

**Resuelto el 2026-07-28 (D-2) [D]: se eligió la tercera resolución.** El secreto se declara, no se infiere. La heurística deja de decidir y pasa a sugerir, y la adopción no se completa sin un paso obligatorio de clasificación en el que el usuario ve todas las variables importadas y marca o desmarca las que corresponda (RA-05, RA-06, RN-29). Es la única de las tres que no vuelve a apostar a que una lista de fragmentos esté completa: las otras dos siguen siendo admisibles como fuentes de sugerencia, porque sugerir mejor no cambia quién decide. Aplicado a este caso concreto, `ClaveMaestra` llega al paso de clasificación **desmarcada** —la heurística no la detecta— y el usuario la marca; la carga útil exacta está transcripta en el anexo [E-11](#2011--e-11--adopción-de-un-contenedor-existente). Registrado como caso límite CL-15 en §7, ya cerrado, y como casos de prueba T-17 y T-32 en el anexo [E-22](#2022--e-22--casos-de-prueba-derivados-de-las-configuraciones-reales).

---

**C-3 · Servicio construido desde Dockerfile, con versión fijada y dispositivo USB anclado.** Es el caso más completo del parque: imagen propia, sin publicar puertos por estar en macvlan, y un dispositivo del host anclado por identificador estable.

```yaml
services:
  print-server:
    build:
      context: .
      dockerfile: Dockerfile
      args:
        SERVER_VERSION: "1.4.18"
    image: registro-privado/print-server:1.4.18
    container_name: print-server
    environment:
      TZ: "America/Argentina/Buenos_Aires"
    # Controladora anclada por ruta ESTABLE (identificador del chip USB-serie),
    # mapeada al puerto que la aplicacion espera dentro del contenedor.
    devices:
      - /dev/serial/by-id/usb-FTDI-if00-port0:/dev/ttyUSB0
    networks:
      vlan:
        ipv4_address: 192.168.1.139
    volumes:
      - ./data:/data
    restart: always
    deploy:
      resources:
        limits:
          memory: 512M

networks:
  vlan:
    external: true
    name: infra_vlan
```

Su Dockerfile, que fija la versión por argumento de construcción y no usa ninguna etiqueta flotante:

```dockerfile
# Imagen propia minima construida sobre una base slim, porque el producto
# no publica imagen oficial. Version FIJADA por ARG: actualizar es deliberado
# (cambiar el argumento y reconstruir), nunca un efecto de `latest`.
FROM debian:bookworm-slim

ARG SERVER_VERSION=1.4.18
ARG SERVER_ARCH=debian-amd64
ARG SERVER_PKG=Servidor-${SERVER_VERSION}-Linux.deb
ARG SERVER_URL=https://descargas.ejemplo/files/server/${SERVER_ARCH}/${SERVER_PKG}

# 1) Dependencias de runtime declaradas por el paquete, mas utilidades de descarga.
# 2) Descarga e instalacion del paquete oficial sin ejecutar su configuracion de
#    servicio: no hay init en build, el binario se lanza por ENTRYPOINT.
# 3) Redireccion del almacenamiento por defecto a /data, para que la persistencia
#    quede en el montaje y sobreviva al redespliegue.
# 4) Purga de las utilidades de descarga.
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        ca-certificates curl libusb-1.0-0 sudo \
    && curl -fSL "${SERVER_URL}" -o /tmp/${SERVER_PKG} \
    && dpkg --unpack /tmp/${SERVER_PKG} \
    && mkdir -p /data \
    && sed -i '/storage-directory/s%/var/lib/servidor%/data%' /opt/servidor/etc/servidor.xml \
    && apt-get purge -y curl \
    && apt-get autoremove -y \
    && rm -rf /var/lib/apt/lists/* /tmp/*

EXPOSE 3344

VOLUME ["/data"]

ENTRYPOINT ["/opt/servidor/bin/servidor", "-c", "/opt/servidor/etc/servidor.xml"]
```

Qué ejercita: origen de tipo `dockerfile` con argumentos de construcción; política de actualización `fijada`; dispositivo anclado; `EXPOSE` sin publicación de puerto, porque en macvlan la publicación no aplica (RN-07); volumen declarado en la imagen.

---

**C-4 · Servicio que crea la red macvlan, con capacidades y dispositivos privilegiados.** Es el único proyecto del parque que **define** la red; los demás la consumen como externa. El orden de arranque entre proyectos depende de eso.

```yaml
services:
  vm-windows:
    image: imagen-comunidad/windows
    container_name: vm-windows
    environment:
      VERSION: "10"
      RAM_SIZE: "8G"
      CPU_CORES: "4"
      DISK_SIZE: "64G"
      USERNAME: "${VM_USUARIO}"
      PASSWORD: "${VM_PASSWORD}"
      # Passthrough de un dispositivo USB del host, por identificador de fabricante
      # y producto. Los identificadores reales no se transcriben.
      ARGUMENTS: "-device usb-host,vendorid=0xVVVV,productid=0xPPPP"
    devices:
      - /dev/kvm
      - /dev/net/tun
      - /dev/bus/usb
    cap_add:
      - NET_ADMIN
    networks:
      vlan:
        ipv4_address: 192.168.1.133
    volumes:
      - ./data:/storage
    restart: always
    stop_grace_period: 2m

networks:
  vlan:
    # Este es el UNICO despliegue que CREA la macvlan; los demas la declaran
    # `external`. El nombre se fija para desacoplarlo del directorio del proyecto:
    # sin `name:`, la herramienta la llamaria `<carpeta>_vlan` y el resto de los
    # despliegues no la encontraria.
    name: infra_vlan
    driver: macvlan
    driver_opts:
      parent: enp1s0
    ipam:
      config:
        - subnet: 192.168.1.0/24
          gateway: 192.168.1.1
```

Qué ejercita: capacidades adicionales del kernel y dispositivos del host, que el modelo de servicio declara como campos propios; período de gracia de detención; creación de la red macvlan con su interfaz padre, subred y gateway, que es la información del rango gestionado de E-8; y una imagen sin etiqueta, que resuelve a `latest` de forma implícita.

---

**C-5 · Proyecto multi-servicio en red bridge, con dependencia, construcción local y variables externalizadas.** Es el caso que ejercita el grafo de referencias y el orden topológico: la interfaz web alcanza al motor **por nombre de contenedor**, no por dirección.

```yaml
services:
  ia-api:
    image: imagen-oficial/modelos:${MODELOS_VERSION}
    container_name: ia-api
    restart: unless-stopped
    environment:
      TZ: ${TZ}
      MAX_MODELOS_CARGADOS: ${MAX_MODELOS_CARGADOS}
      HILOS_INFERENCIA: ${HILOS_INFERENCIA}
    ports:
      - "11434:11434"
    volumes:
      - ./ia-api/data:/root/.modelos
    networks:
      - ia-net
    mem_limit: ${IA_MEM_LIMIT}
    cpus: ${IA_CPUS}

  ia-webui:
    image: imagen-oficial/webui:${WEBUI_VERSION}
    container_name: ia-webui
    restart: unless-stopped
    depends_on:
      - ia-api
    environment:
      TZ: ${TZ}
      # Nombre de contenedor por la red interna, NO localhost: dentro del
      # contenedor localhost es el mismo. Esta variable es exactamente lo que
      # la solucion genera al trazar una arista de ia-webui a ia-api.
      API_BASE_URL: http://ia-api:11434
      AUTENTICACION: "true"
      CLAVE_SESION: ${CLAVE_SESION}
      MOTOR_IMAGENES: video
      VIDEO_BASE_URL: http://ia-video:8188
    ports:
      - "3000:8080"
    volumes:
      - ./ia-webui/data:/app/backend/data
    networks:
      - ia-net

  ia-video:
    build:
      context: ./ia-video
      args:
        VIDEO_REF: ${VIDEO_VERSION}
    image: registro-privado/video:${VIDEO_VERSION}
    container_name: ia-video
    restart: unless-stopped
    environment:
      TZ: ${TZ}
    command: ${VIDEO_ARGS}
    ports:
      - "8188:8188"
    volumes:
      - ./ia-video/data/models:/opt/app/models
      - ./ia-video/data/output:/opt/app/output
      - ./ia-video/data/input:/opt/app/input
    networks:
      - ia-net
    mem_limit: ${VIDEO_MEM_LIMIT}
    cpus: ${VIDEO_CPUS}

networks:
  ia-net:
    name: ia-net
    driver: bridge
```

Su archivo de variables de ejemplo, con los secretos vacíos, que es la forma que debe producir la exportación de E-14:

```bash
# Plantilla de variables. Se copia a .env y se completa antes de desplegar.
# El archivo real no se versiona: contiene la clave de sesion de la interfaz.

# Versiones FIJADAS de las imagenes. Nunca etiquetas flotantes.
MODELOS_VERSION=0.32.0
WEBUI_VERSION=v0.10.2
VIDEO_VERSION=v0.3.40

TZ=America/Argentina/Buenos_Aires

# Ajuste del motor
MAX_MODELOS_CARGADOS=2
HILOS_INFERENCIA=4

# Limites de recursos
IA_MEM_LIMIT=16g
IA_CPUS=6.0
VIDEO_MEM_LIMIT=12g
VIDEO_CPUS=6.0
VIDEO_ARGS=--cpu

# Clave de firma de sesiones. Generar una propia; nunca versionarla.
CLAVE_SESION=
```

Qué ejercita: tres servicios en una red bridge con resolución por nombre; una dependencia declarada que se corresponde con una arista del lienzo y con la referencia a las variables provistas que declara E-4; construcción local de una de las tres imágenes; versiones fijadas por variable; y puertos publicados en el host, que es lo que distingue este proyecto de los de macvlan.

---

**C-6 · Servicio efímero, con secretos fuera del archivo de despliegue y sin acceso al socket.** Es el contraejemplo deliberado de C-2: el mismo parque contiene el patrón incorrecto y su corrección.

```yaml
services:
  runner-ci:
    build:
      context: ./runner-ci
      dockerfile: Dockerfile
      args:
        RUNNER_VERSION: "2.335.1"
    image: registro-privado/runner-ci:2.335.1
    container_name: runner-ci

    # El token vive en un archivo de variables NO versionado, no embebido aca.
    env_file:
      - .env

    environment:
      TZ: "America/Argentina/Buenos_Aires"
      # El servicio procesa un trabajo y se desregistra; la politica de reinicio
      # lo vuelve a levantar limpio. Es la marca de servicio efimero del modelo.
      EFIMERO: "true"
      NOMBRE_RUNNER: "runner-ci"
      DESHABILITAR_AUTOACTUALIZACION: "true"
      # Caches redirigidos al montaje: sin esto se perderian en cada ciclo.
      NUGET_PACKAGES: "/cache/nuget"
      GRADLE_USER_HOME: "/cache/gradle"

    # NO se monta el socket del motor ni se usa modo privilegiado: en un runner
    # eso equivale a dar control del host a cualquier autor de un flujo de trabajo.

    networks:
      vlan:
        ipv4_address: 192.168.1.138

    volumes:
      # Solo los caches. El directorio de trabajo NO se persiste a proposito:
      # cada ciclo parte de un checkout limpio, que es el sentido de la efimeridad.
      - ./data:/cache

    restart: always

    deploy:
      resources:
        limits:
          memory: 8G
          cpus: "4.0"
        reservations:
          memory: 1G

networks:
  vlan:
    external: true
    name: infra_vlan
```

Qué ejercita: la marca de servicio efímero; reserva de recursos además del límite, que el modelo de recursos de E-2 contempla como `reservaMemoriaMb`; secretos por archivo externo en lugar de embebidos; y un servicio que **no expone nada** y sólo hace conexiones salientes, cuya dirección sirve para identificarlo y no para alcanzarlo.

### §20.21 · E-21 · Correspondencia entre una configuración real y el modelo de la solución

Citado desde §4 (F-13) y §17.3 P.3. Procedencia: derivado de E-20 (caso C-3) y del modelo de servicio de E-2. Estado: `derivado`. Es el contrato de la importación desde Compose y la fuente de las pruebas de ida y vuelta de esa conversión.

**Contexto.** La traducción campo por campo de una configuración de Compose al modelo de la solución, tomando el caso C-3 del anexo anterior, con las reglas verificables una por una y con el tratamiento declarado de `depends_on` en sus dos casos. Es el contrato de la importación y la fuente de las pruebas de ida y vuelta.

**Qué ejercita.** La correspondencia de cada elemento de Compose con su campo del modelo, incluida la política de actualización derivada de si la etiqueta es explícita o flotante; el tratamiento de la interpolación de Compose, que nunca produce una referencia del modelo (RN-26); el escape del signo peso en los dos sentidos; la importación de un `depends_on` con variable que ya lleva el host y sin ninguna que lo lleve, los dos sin pérdida desde D-11; y la distinción entre un proyecto que **crea** la red y otro que la consume como externa.

**Qué verificar.** Que importar y volver a exportar C-3 produzca un archivo equivalente en imagen, red, dirección, dispositivos, montajes, límites y política de reinicio (T-30). Que un `depends_on` sin ninguna variable que apunte al destino cree una arista sin variable y con espera declarada, y que **no** se inyecte en el origen ninguna variable que el archivo no tenía: volver a exportar tiene que reproducir el `environment` de partida (T-54). Que la reexpresión del primer caso conserve el mismo valor resuelto y no invente ninguno (T-40). Que `$$` se desescape al importar y se vuelva a escapar al exportar (T-47, T-48). Y que toda pérdida que no se pueda evitar quede declarada en el informe de importación, en lugar de ocurrir en silencio.

Tomando el caso C-3, la importación debe producir exactamente este servicio:

```json
{
  "id": 305,
  "proyectoId": 7,
  "nombre": "print-server",
  "descripcion": null,
  "origen": {
    "tipo": "dockerfile",
    "rutaDockerfile": "/srv/despliegues/print-server/Dockerfile",
    "contextoBuild": "/srv/despliegues/print-server",
    "argumentosBuild": { "SERVER_VERSION": "1.4.18" },
    "reconstruirEnDespliegue": false
  },
  "red": {
    "modo": "macvlan",
    "aliasDns": "print-server",
    "ipFija": "192.168.1.139",
    "interfazPadre": "enp1s0",
    "subred": "192.168.1.0/24",
    "gateway": "192.168.1.1"
  },
  "puertos": [
    { "contenedor": 3344, "host": null, "protocolo": "tcp", "publicar": false }
  ],
  "variables": [
    { "clave": "TZ", "valor": "America/Argentina/Buenos_Aires", "secreta": false, "origen": "adopcion" }
  ],
  "montajes": [
    { "tipo": "bind", "origen": "/srv/despliegues/print-server/data", "destino": "/data", "soloLectura": false }
  ],
  "dispositivos": [
    { "host": "/dev/serial/by-id/usb-FTDI-if00-port0", "contenedor": "/dev/ttyUSB0", "permisos": "rwm" }
  ],
  "capacidades": [],
  "recursos": { "limiteMemoriaMb": 512 },
  "replicas": 1,
  "politicaReinicio": "always",
  "autoArranque": true,
  "efimero": false,
  "healthcheck": { "modo": "ninguno", "comando": null, "intervaloSegundos": null },
  "posicionCanvas": { "x": 0, "y": 0 }
}
```

Reglas de traducción que la conversión debe respetar, verificables una por una:

| Elemento de Compose | Campo del modelo | Nota |
|---|---|---|
| `image:` con etiqueta explícita | `origen.imagen` + `origen.etiqueta`, `politicaActualizacion: "fijada"` | Una etiqueta flotante o ausente se traduce a `politicaActualizacion: "flotante"`, no se descarta |
| `build.context` y `build.args` | `origen.tipo: "dockerfile"` con contexto y argumentos | Convive con `image:`, que pasa a ser el nombre de la imagen resultante |
| `networks.<red>.ipv4_address` | `red.ipFija` y una fila en `reservas_ip` | La dirección debe pertenecer al rango gestionado (RN-06) |
| `driver: macvlan` con `parent` | `red.modo: "macvlan"` e `interfazPadre` | Con macvlan, `publicar` queda deshabilitado (RN-07) |
| `ports:` | `puertos[]` con `publicar: true` | Sólo válido en modo bridge |
| `volumes:` con ruta relativa | `montajes[].tipo: "bind"` | La ruta se resuelve contra el directorio del proyecto y debe existir en la misma ruta absoluta en host y contenedor |
| `volumes:` con nombre | `montajes[].tipo: "volumen"` | |
| `devices:` | `dispositivos[]` con host, contenedor y permisos | |
| `cap_add:` | `capacidades[]` | |
| `deploy.resources.limits` y `reservations` | `recursos.limiteMemoriaMb`, `limiteCpus`, `reservaMemoriaMb` | `mem_limit`/`cpus` de nivel servicio se normalizan al mismo lugar |
| `restart:` | `politicaReinicio` | Conjunto cerrado: `no`, `on-failure`, `always`, `unless-stopped` |
| `depends_on:` | Arista del lienzo hacia el servicio destino, **siempre y sin pérdida**: con variable si alguna del origen ya lleva el host del destino como literal, y sin variable si no la hay. En los dos casos la arista **declara espera** | Con `condition: service_healthy` se traduce además a espera de verificación de salud. Los dos casos y su fundamento están desarrollados debajo de esta tabla **[D-i]** |
| `environment:` con `${VAR}` o `$VAR` | Variable con `secreta: true` y referencia a secreto | El valor **nunca** se importa ni se exporta (RN-15). Es interpolación de Compose, **no** una referencia del modelo: **de una interpolación nunca sale una referencia** (RN-26). La única excepción de la regla no pasa por acá, porque no nace de una interpolación sino de un `depends_on` explícito |
| `environment:` con `$$` | Un `$` literal en el valor | `$$` es el escape propio de Compose. Se desescapa al importar, y la exportación vuelve a escaparlo (RN-25, RN-26) |
| `environment:` con una ocurrencia literal de `${{` | Variable con el texto tal cual, sin interpretar, persistida escapada como `$${{` | La sintaxis `${{ … }}` es del modelo, no de Compose, y no es una interpolación válida para Compose. Si aparece en un archivo importado se trata como texto, y se persiste con el escape del modelo para que el resolutor tampoco la interprete (RN-26) |
| `env_file:` | Variables importadas, todas al paso obligatorio de clasificación | **Ampliado el 2026-07-28 por D-2.** Antes la heurística decidía cuáles quedaban enmascaradas; ahora **premarca** las que coinciden y el usuario confirma la clasificación de todas, incluidas las que la heurística no detecta. Un archivo de variables externo es justamente donde más probablemente viven las que no coinciden con la heurística, como muestra el caso C-6 (RA-05, RA-06, RN-29) |
| Ausencia de `healthcheck` | `healthcheck.modo: "ninguno"` | Distinto de `heredado-de-la-imagen` |
| `external: true` en una red | El proyecto **consume** la red, no la crea | Sólo un proyecto puede declararla; el resto la referencia |

**Cómo se importa un `depends_on` [D-i], D-6 segunda pasada, rehecho por D-11 en la tercera.** Fue el caso que la eliminación del discriminador dejó sin dueño: con el modelo anterior un `depends_on` se importaba como arista de tipo `host-puerto`, que no exigía variable, y al desaparecer el tipo la segunda pasada lo dejó sin representación. **D-11 se la devolvió:** desde que la espera es una propiedad declarada de la arista, `clave_variable` y `clave_destino` admiten ausencia y una arista sin variable **es persistible**, siempre que declare espera (RN-34, anexo E-9). Se resuelve en dos casos, y ninguno es una pérdida:

| Caso | Qué hace la importación |
|---|---|
| El origen declara una variable cuyo valor literal **ya coincide** con el host del destino | Esa variable se **reexpresa como referencia**: `API_BASE_URL: http://ia-api:11434` del caso C-5 se importa como `http://${{ ia-api.SELFHOSTED_HOST }}:11434`, con el host referenciado y **el puerto literal** (D-9). La arista queda bien formada, registra `puertoDestino: 11434` y **declara espera**, que es lo que el `depends_on` pedía |
| No hay ninguna variable del origen que apunte al destino | **Sin pérdida, desde la tercera pasada.** Se crea una arista **sin variable y con espera declarada**, que es exactamente lo que `depends_on` significa: el origen arranca después del destino y no consume ningún dato suyo. La arista aparece en el lienzo y participa del orden de arranque (RN-34) |

**Por qué no se crea una variable en el segundo caso.** Era la salida aparentemente más completa —materializar la referencia al host que el `depends_on` implica— y se descarta por una razón concreta: **inyectaría en el contenedor una variable de entorno que el archivo original no tenía**. Al volver a exportar, esa variable aparecería en `environment`, y la ida y vuelta dejaría de ser equivalente, que es justamente lo que T-30 verifica. Un importador no puede cambiar el entorno del proceso que importa.

**Por qué el segundo caso dejó de ser una pérdida [D], D-11 tercera pasada.** La segunda pasada lo había declarado pérdida de traducción con este argumento: admitir una dependencia sin variable obligaría a una segunda clase de vínculo, que es lo que esa pasada vino a eliminar, y además el modelo de referencia **tampoco tiene** forma de declarar «arrancá `b` antes que `a`» sin una referencia de por medio. La primera mitad del argumento se cayó: con la espera como propiedad declarada de la arista (D-11), una arista sin variable **no es una segunda clase de vínculo** sino la misma entidad con las columnas de referencia vacías. La segunda mitad se dio vuelta: la fuente no lo necesita porque **no administra el encendido de un conjunto de servicios, y este producto sí**. Lo que allá es un caso inexistente, acá es una capacidad de primera clase, y por eso el `depends_on` sin variable se importa sin pérdida.

**Por qué la reexpresión del primer caso no contradice RN-26.** Esa regla prohíbe derivar referencias de la **interpolación de Compose** —`${VAR}` y `$VAR`—, que es material del archivo de variables y no del modelo. Acá no se deriva de una interpolación sino de un `depends_on` explícito, y no se inventa ningún valor: se reexpresa el literal que el archivo ya tenía, con el mismo valor resuelto. Es la misma operación que hace el azúcar del lienzo cuando el usuario traza la flecha (T-12), aplicada a un archivo en lugar de a un gesto. RN-26 lo declara explícitamente para que la excepción no quede sólo acá.

### §20.22 · E-22 · Casos de prueba derivados de las configuraciones reales

Citado desde §17.2 P.6 y §17.4 P.6. Procedencia: derivado del catálogo de reglas de E-16, de los casos de E-20 y del rango gestionado de E-8; ampliado el 2026-07-28 con los treinta y tres casos que exigen las reglas RN-21 a RN-37. Estado: `derivado`. Cada fila es un caso ejecutable con datos concretos, pensado para que la categoría `08-Calidad-Y-Pruebas` y la batería de `SelfHosted.Service.Core.Domain.Tests` no arranquen de una hoja en blanco.

**Contexto.** Los casos de prueba derivados del catálogo de reglas, de las configuraciones reales y del rango gestionado, cada uno con su entrada concreta y su resultado esperado. Existe para que la categoría de calidad y pruebas y la batería del dominio no arranquen de una hoja en blanco.

**Qué ejercita.** La cobertura del catálogo de reglas caso por caso, incluidas las combinaciones que sólo se distinguen entre sí por un eje: espera declarada frente a referencia al host (T-44 a T-46), ciclo de arranque frente a ciclo de valor (T-13, T-36, T-52), unicidad exigida frente a unicidad que dejó de exigirse (T-04, T-42, T-59), y las dos direcciones del escape del signo peso (T-47, T-48). Ejercita además el fixture base sugerido, que es el parque de E-19 con sus dos modos de red, sus cinco orígenes distintos y su conflicto de direcciones reproducible.

**Qué verificar.** Que cada regla RN-01 a RN-37 tenga al menos un caso y que ninguno quede sin regla que lo justifique. Que los casos que cambiaron de objeto en las pasadas segunda, tercera y quinta verifiquen el modelo vigente y no el anterior: el listado del cierre de este anexo enumera cuáles son, y es contra ese listado que hay que calibrar cualquier barrido. Que la categoría de calidad y pruebas los tome como criterio de aceptación y no como sugerencia. Y que el fixture base se pueda levantar entero, porque es lo que la solución tiene que poder representar el primer día.

| # | Regla | Entrada | Resultado esperado |
|---|---|---|---|
| T-01 | RN-01 | Nombre `print-server` en un proyecto SelfHosted que no lo tiene | Aceptado |
| T-02 | RN-01 | Nombre `Print Server` (mayúsculas y espacio) | Rechazado `422`, campo `nombre` |
| T-03 | RN-01 | Nombre de 33 caracteres | Rechazado `422`, campo `nombre` |
| T-04 | RN-01 | Segundo servicio `print-server` en el mismo proyecto | Rechazado `422`, nombre duplicado |
| T-05 | RN-03 | Servicio con `192.168.1.139` en el proyecto 9; el servicio 305 del proyecto 7 la ocupa y está **activo** | Arranque bloqueado `409`, con las tres resoluciones de E-8 |
| T-06 | RN-03 | Idéntico al anterior, pero el servicio 305 está **detenido** | Arranque permitido: la regla compara contra servicios activos, no configurados |
| T-07 | RN-03 | Dos servicios del **mismo** proyecto con `192.168.1.139` | Bloqueado siempre, tipo `duplicado-interno` |
| T-08 | RN-06 | Dirección `192.168.1.120`, fuera del rango gestionado `192.168.1.128/26` | Rechazado `422`, con `192.168.1.141` sugerida como siguiente libre |
| T-09 | RN-06 | Dirección `192.168.1.129`, dentro del rango pero declarada excluida | Rechazado `422` |
| T-10 | RN-07 | Caso C-3 (macvlan) al que se le agrega un puerto publicado | Rechazado `422`; en la interfaz el campo aparece deshabilitado |
| T-11 | RN-04 | **Referencia de red** —a `SELFHOSTED_HOST`— de un servicio en `ia-net` (bridge) a un servicio en macvlan sin puerto publicado | Enlace inválido; bloquea el arranque |
| T-12 | RN-04, RN-34 | Arista de `ia-webui` a `ia-api`, ambos en `ia-net`, trazada en el lienzo. `ia-api` declara un solo puerto, 11434 | Válida. El sistema escribe la referencia `http://${{ ia-api.SELFHOSTED_HOST }}:11434` —el puerto **literal**, tomado del único que el destino declara— y **propone la espera**, porque la referencia apunta al host. La arista registra `puertoDestino: 11434`. Lo persistido lleva el vínculo: `${{ ia-api#N.SELFHOSTED_HOST }}` |
| T-13 | RN-05 | Aristas `a → b`, `b → c`, `c → a` | Rechazado `422` señalando el ciclo |
| T-14 | RN-14 | Proyecto C-5 con `ia-webui` dependiente de `ia-api` | Orden de arranque `ia-api`, `ia-video`, `ia-webui`; deducido, no configurado |
| T-15 | RN-11 | Adoptar un contenedor ya adoptado por otro proyecto | Aparece deshabilitado, con el proyecto que lo tomó |
| T-16 | RA-04 | Descubrir el caso C-1, que monta el socket del motor | `adoptable: false`, motivo `monta-el-socket-de-docker`; forzable con confirmación explícita |
| T-17 | RA-05, RN-29 | Importar el caso C-2, cuya variable `ClaveMaestra` **no contiene** ninguno de los fragmentos de la heurística | **Cerrado por D-2.** Ya no es una prueba en rojo. La variable llega al paso de clasificación con `sugeridaSecreta: false` y la adopción **no se completa** mientras no haya clasificación confirmada. La aserción es doble: la heurística no la sugiere, y sin confirmación no hay servicio creado |
| T-17b | RA-05, RN-29 | Importar una variable llamada `API_TOKEN` con valor | Llega al paso de clasificación con `sugeridaSecreta: true` y `motivoSugerencia: "heuristica:TOKEN"`, premarcada. Al confirmar sin tocarla queda importada enmascarada y marcada para recarga manual; el valor no se persiste en claro |
| T-18 | RN-15 | Exportar a Compose un proyecto con una variable secreta | La exportación emite `${VAR}` y el archivo de variables con el valor vacío; el valor no aparece en ningún archivo |
| T-19 | RN-18 | Servicio C-3 (macvlan, una dirección fija) al que se le piden 2 réplicas | Rechazado `422`: hace falta una dirección por réplica |
| T-20 | RN-19 | Límite de memoria de 64 GB en un host de 32 GB | Rechazado `422` con el máximo admisible |
| T-21 | RN-09 | Detener el servicio C-3 | El montaje `/data` permanece intacto; el contenedor se elimina |
| T-22 | RN-12 | Mover un nodo del lienzo | Se guarda al instante; no entra al changeset ni marca redespliegue |
| T-23 | RN-13 | Changeset de E-5, con cambios en `api` y alta de `cache` | Redespliega sólo `api` y `cache`; `db` no se toca |
| T-24 | RN-20 | Arrancar un proyecto de 3 servicios con 1 en conflicto | Arrancan 2; el proyecto queda `parcialmente-activo`, sin error silencioso |
| T-25 | RN-16 | Crear un token de API | El valor se devuelve una única vez; en la base sólo queda su hash |
| T-26 | RN-17 | Cualquier operación de escritura vía API con token | Fila de auditoría con actor `token:<prefijo>` |
| T-27 | I2, I6 | Redesplegar el caso C-2, cuyo montaje contiene una base SQLite | Contenedor nuevo, datos del montaje intactos |
| T-28 | E-17 | Contenedor `running` con verificación de salud en `unhealthy` | Despliegue en `Activo (degradado)`, no en `Caido` |
| T-29 | E-17 | Contenedor `exited` con código 0 | Despliegue `Finalizado`; con código distinto de 0, `Caido` |
| T-30 | E-21 | Importar C-3 y volver a exportarlo | El Compose resultante es equivalente al de partida en imagen, red, dirección, dispositivos, montajes, límites y política de reinicio |
| T-31 | RN-31, RN-13 | Aplicar el changeset 331 de E-5, cuyo informe de impacto alcanza a `api` y a `cache` y deja a `db` sin impacto, y cerrar el navegador después del primer despliegue. La imagen de `cache` no existe en el registro | El despliegue continúa del lado del servidor: `api` queda `activo` (5471), `cache` queda `fallido` (5472) con "La imagen no existe en el registro" y el proyecto queda `parcialmente-activo`. `db` **no se toca** y conserva su despliegue anterior, coherente con RN-13 y con T-23. `GET /api/v1/operaciones/{id}` devuelve el resultado de los dos contenedores alcanzados más `db` en `serviciosNoAlcanzados`. Ningún despliegue queda en un estado intermedio |
| T-32 | RA-05, RN-29 | Adoptar el caso C-2 y, en el paso de clasificación, marcar `ClaveMaestra` como secreta | El servicio se crea con `ClaveMaestra` marcada secreta, cifrada en reposo y con recarga manual pendiente; el valor no se persiste en claro ni se devuelve por la API. `clasificacionVariables.marcadasPorElUsuario` registra `["ClaveMaestra"]`. Es el caso de prueba explícito del hueco que motivó D-2 |
| T-33 | RN-29 | Confirmar la adopción del caso C-2 sin enviar la clasificación de variables | Rechazado `422`; el servicio **no** se crea y el contenedor sigue sin adoptar |
| T-34 | RN-21 | Variable de `api` con valor `${{ inexistente.CLAVE }}` | Rechazado `422` señalando la expresión y la causa "servicio inexistente" |
| T-35 | RN-21 | Variable de `api` (proyecto 12) con valor `${{ print-server.TZ }}`, siendo `print-server` un servicio del proyecto 7 | Rechazado `422`, causa "servicio de otro proyecto". La referencia no cruza el límite del proyecto |
| T-36 | RN-22 | En el mismo servicio, `A = ${{ B }}` y `B = ${{ A }}` | Rechazado `422` con la cadena completa del ciclo. RN-05 no lo detecta porque no hay arista: es exactamente lo que RN-22 cubre |
| T-49 | RN-32 | Declarar en un servicio una variable con clave `SELFHOSTED_HOST` | Rechazado `422`: el prefijo `SELFHOSTED_` está reservado para las variables provistas por el sistema, que son de sólo lectura |
| T-50 | RN-34, D-9 | Trazar la flecha hacia un servicio que declara **dos** puertos de contenedor | El sistema **pregunta cuál** antes de escribir la expresión, y escribe el elegido como literal, registrándolo en `puertoDestino` de la arista. No hay ambigüedad diferida ni `422`: la pregunta se hace una vez, al trazar, y no cada vez que se resuelve |
| T-51 | RN-01, RN-33 | Crear un servicio llamado `shared` en un proyecto que ya tiene variables compartidas referenciadas con `${{ shared.X }}` | **Aceptado.** El nombre no está reservado: las referencias al servicio llevan su vínculo `#id` y las del proyecto no, de modo que ninguna expresión queda ambigua. Referenciar una variable del servicio produce `${{ shared#N.CLAVE#M }}` y la compartida sigue siendo `${{ shared.CLAVE }}` |
| T-52 | RN-22 | `a.X = ${{ b.Y }}` y `b.Y = ${{ a.X }}`: ciclo de valor **entre** servicios, en aristas que no declaran espera | Rechazado `422` con la cadena completa. Es el caso que RN-05 no ve, porque el grafo de arranque lo forman sólo las aristas que declaran espera, y que por eso RN-22 alcanza |
| T-53 | RN-34, D-6 | Trazar en el lienzo la flecha de `api` a `db` del proyecto 12 | El sistema **escribe una referencia**, no una plantilla de enlace: `ConnectionStrings__Default` queda con la forma legible `Host=${{ db.SELFHOSTED_HOST }};Port=5432;Database=portal` y persistida con el vínculo `db#103`. Se materializa la arista 9002, con `puertoDestino: 5432` y **espera propuesta como verdadera**. El usuario puede editar la variable y desmarcar la espera |
| T-37 | RN-23 | Variable de `api` con valor `${{ shared.DB_PASSWORD }}`, siendo `DB_PASSWORD` una variable compartida secreta | La variable resultante es secreta: `valor` en `null`, referencia a secreto, `***` en toda respuesta de la API y en la interfaz |
| T-38 | RN-24, RN-32 | Desplegar el servicio 101 de E-2, que tiene seis referencias, dos de ellas al host de otro servicio | El contenedor recibe `TZ=America/Argentina/Buenos_Aires`, `ConnectionStrings__Default=Host=db;Port=5432;Database=portal`, `REDIS_URL=cache:6379`, `DB_USER=portal`, `SALUD_URL=http://api:8080/salud` y `DB_PASSWORD` con el valor descifrado. Ninguna variable del contenedor contiene la secuencia `${{` ni el marcador `#` del vínculo: lo que viaja es el valor |
| T-39 | RN-25 | Exportar a Compose el proyecto 12 de E-1, que tiene seis referencias, secretas y no secretas, dos de ellas sosteniendo aristas | El Compose no contiene ninguna ocurrencia de `${{`; las no secretas viajan con su valor resuelto y `DB_PASSWORD` viaja como `${DB_PASSWORD}` con la entrada vacía en el archivo de variables. El manifiesto propio, de `version: 2`, lleva **las seis** expresiones sin resolver, incluidas las de `ConnectionStrings__Default` y `REDIS_URL`: sin ellas el literal que rodea a la referencia —`Host=…;Database=portal`— no se podría reconstruir desde `enlaces`, que sólo guarda pares de claves |
| T-40 | RN-26 | Importar el caso C-5, cuyo Compose usa `${MODELOS_VERSION}`, `${TZ}` y `${CLAVE_SESION}`, y además declara `depends_on: ia-api` en `ia-webui` con la variable `API_BASE_URL: http://ia-api:11434` | **De la interpolación de Compose no sale ninguna referencia**: se aplican las reglas de E-21 y `CLAVE_SESION` queda como variable con referencia a secreto. La **única** referencia creada es la reexpresión de `API_BASE_URL` como `http://${{ ia-api.SELFHOSTED_HOST }}:11434`, con el puerto literal, que sostiene la arista del `depends_on` —creada con espera declarada— y resuelve al mismo literal de partida |
| T-54 | RN-34, E-21 | Importar un Compose donde `a` declara `depends_on: b` y **ninguna** variable de `a` menciona a `b` | **Sin pérdida.** Se crea una arista de `a` a `b` **sin variable asociada y con espera declarada**, que es exactamente lo que `depends_on` significa. `a` arranca después de `b`. **No** se inyecta en `a` ninguna variable que el archivo no tenía: volver a exportar reproduce el `environment` de partida y el `depends_on` |
| T-41 | RN-27 | Eliminar la variable compartida `TZ` del proyecto 12, referenciada por `api` | Rechazado `409` con la lista `[{ servicio: "api", clave: "TZ" }]` |
| T-42 | RN-28, RN-37 | Declarar una segunda variable compartida `TZ` en el proyecto 12 | **Aceptado.** La clave de una compartida no exige unicidad: se crea un objeto nuevo, distinguible por identidad (D-12). Si además el valor coincide con el de la existente, el sistema **advierte sin bloquear** que probablemente convenga compartir (RN-37) |
| T-43 | RN-30, I2 | Instanciar el ítem `cat-api-con-base` de E-6 con `slug=portal2` en un proyecto que no tiene la clave `DB_PASSWORD` | Se crean dos servicios (`portal2-db` y `portal2-api`), dos contenedores y una arista con espera declarada entre ellos, que referencia el host y registra `puertoDestino: 5432`; se crea la variable compartida `DB_PASSWORD` y las dos referencias `${{ shared.DB_PASSWORD }}` quedan resueltas. El `idLocal` `db` de la plantilla se vincula al identificador del servicio creado. Ningún contenedor aloja más de un servicio; ninguna expresión persistida contiene un `{{ }}` de parámetro |
| T-44 | RN-14, RN-05 | Proyecto 12 con la arista 9002 de `api` a `db`, que referencia el host, y **la espera desmarcada** por el usuario porque `api` reintenta la conexión | `api` y `db` arrancan en **cualquier orden**: el grafo de arranque lo forman sólo las aristas que declaran espera. La arista sigue dibujándose, sigue marcando redespliegue y **sigue exigiendo canal alcanzable**, porque referencia el host: los dos ejes son independientes |
| T-45 | RN-05, RN-22 | `a` referencia `${{ b.RUTA_BASE }}` y `b` referencia `${{ a.PREFIJO }}`, ninguna de las dos con espera declarada | **Aceptado.** No es un ciclo de arranque —ninguna espera— y tampoco de valor, porque las dos claves referenciadas son literales. Si las dos declararan espera, RN-05 lo rechazaría con `422` |
| T-46 | RN-04, RN-34 | Arista de un servicio en `ia-net` (bridge) a uno en macvlan sin puerto publicado, que **declara espera** pero **no referencia el host** —sólo `${{ destino.TZ }}`— | **Válida y no bloquea el arranque por canal**, a diferencia de T-11, que sí referencia el host. Ordena el arranque, porque declara espera. Es la combinación que prueba que esperar y referenciar el host son independientes |

| T-47 | RN-25 | Exportar a Compose un servicio con una variable cuyo **valor literal** contiene `${{ x }}`, persistida escapada como `$${{ x }}`, y otra cuyo valor literal es `${VAR}` como texto | El Compose emite `$${{ x }}` y `$${VAR}`: todo `$` literal viaja duplicado. El archivo levanta y Compose entrega los valores `${{ x }}` y `${VAR}` sin interpolar. Ninguna de las dos se confunde con una referencia ni con un secreto |
| T-48 | RN-26 | Importar un Compose cuyo `environment` trae `RUTA: "$$HOME/datos"` y `PLANTILLA: "$${{ x }}"` | `RUTA` se importa con el literal `$HOME/datos` y `PLANTILLA` con el literal `${{ x }}`, persistido escapado como `$${{ x }}`. No se crea ninguna referencia (`referencia` queda en `null` en las dos) ni ninguna variable secreta. Volver a exportar reproduce el archivo de partida, cerrando la ida y vuelta con T-47 |

| T-55 | RN-33 | Renombrar el servicio `db` del proyecto 12 a `postgres`, con `api` referenciándolo en dos variables | **Ninguna referencia se rompe.** Las expresiones siguen apuntando al servicio 103, la interfaz las muestra como `${{ postgres.SELFHOSTED_HOST }}` y `${{ postgres.POSTGRES_USER }}`, los valores resueltos no cambian y **no aparece ningún cambio pendiente** en el changeset, porque la comparación es por forma vinculada |
| T-56 | RN-34 | Crear una arista de espera sin variable de `cache` a `db`, y después intentar crear una segunda igual | La primera se acepta: `cache` arranca después de `db` sin referenciar nada suyo. La segunda se rechaza con `409`: entre dos servicios no puede haber más de una arista de espera sin variable |
| T-57 | RN-34 | Crear una arista que no referencia ninguna variable y con la espera **desmarcada** | Rechazado `422`: una arista tiene que aportar algo, o una referencia o una espera. Es lo que impide que quede una fila sin significado |

| T-58 | RN-33, RN-35 | Renombrar la variable `POSTGRES_USER` de `db` a `PG_USER`, con `api` referenciándola | **Ninguna referencia se rompe.** La expresión sigue apuntando a la misma variable, la interfaz la muestra como `${{ db.PG_USER }}`, el valor resuelto no cambia y no aparece ningún cambio pendiente. Antes de D-12 esta operación rompía la referencia en silencio |
| T-59 | RN-28 | Dos variables compartidas del mismo proyecto con la clave `TZ` y valores distintos, referenciadas una desde `api` y otra desde `cache` | Las dos coexisten y cada referencia resuelve a **su** objeto. La clave no las identifica: las identifica su identidad |
| T-60 | RN-36 | Instanciar `cat-api-con-base` con `slug=portal` en un proyecto que ya tiene un servicio `portal-db` | El servicio se crea con nombre **sufijado** y el sistema **informa cuál asignó**. No se rechaza y no se pregunta. Ninguna referencia del subgrafo se rompe, porque apuntan a identidades y no a nombres |
| T-61 | RN-37 | Instanciar una plantilla que declara la clave compartida `DB_PASSWORD` en un proyecto que ya tiene una con **el mismo valor** | Se crea el objeto nuevo y se **advierte** que probablemente convenga compartir, ofreciendo reusar. La operación **no se bloquea** |
| T-62 | RN-37 | Instanciar la misma plantilla en un proyecto que ya tiene `DB_PASSWORD` con **distinto valor** | Se crean separadas y se **avisa**. La operación no se bloquea y no se ofrece reusar: casi seguro son cosas distintas |
| T-63 | RN-37 | Crear una variable compartida y no referenciarla desde ningún servicio | El sistema la reporta como **huérfana**, sin bloquear su creación ni el arranque del proyecto |

Los treinta y tres casos T-31 a T-63 se incorporaron el 2026-07-28 con las reglas RN-21 a RN-34. T-17 y T-17b se reescribieron por la resolución de CL-15. En la **segunda pasada** sobre D-6 cambiaron de objeto T-11, T-12, T-38, T-43, T-44, T-45 y T-46, porque probaban la distinción entre dos tipos de arista que dejó de existir. En la **tercera** volvieron a cambiar de objeto T-12, T-38, T-43, T-44, T-45, T-46, T-50, T-51, T-53 y T-54: los cuatro primeros porque el orden de arranque dejó de deducirse de la variable referenciada y pasó a ser una propiedad declarada; T-50 y T-51 porque la variable de puerto y la reserva del nombre `shared` desaparecieron; y T-53 y T-54 por el azúcar del lienzo y por la arista sin variable, que dejó de ser una pérdida. El caso T-32 es el que cierra explícitamente el hueco del caso C-2 del anexo [E-20](#2020--e-20--configuraciones-reales-de-contenedor-ofuscadas), que es el que motivó la decisión D-2. T-47 y T-48 cierran las dos combinaciones de literal por sentido que la tabla de convivencia del anexo [E-4](#204--e-4--enlace-del-lienzo-y-su-variable-generada) declara, y son los únicos casos de la tanda que verifican el escape.

**Fixture base sugerido para la maqueta y para las pruebas de integración [D]:** un proyecto en macvlan con los cuatro servicios de C-1 a C-4 y un proyecto en bridge con los tres de C-5, más el efímero de C-6. Da ocho servicios, dos modos de red, cinco orígenes distintos (imagen fijada, imagen flotante, dockerfile, imagen sin etiqueta y construcción local), dispositivos, capacidades, límites, reservas, una dependencia y un conflicto de direcciones reproducible. Es exactamente el parque de E-19, que es lo que la solución tiene que poder representar el primer día.

## §21 Anexo B — Cobertura de los ejemplos sobre el modelo y las reglas

Matriz derivada de §20 y de las reglas de negocio e invariantes declaradas en las fuentes. Demuestra que los ejemplos anexados cubren el modelo, los invariantes y los flujos que este intake declara.

| Área del modelo, invariante o flujo | Escenario que lo ejercita |
|---|---|
| Proyecto SelfHosted, su red y su layout de lienzo | E-1 |
| Servicio: origen por imagen, por repositorio y por Dockerfile | E-2 |
| Servicio en macvlan con dirección fija y dispositivo anclado (I2, RN-07) | E-2 |
| Variables secretas y referencia a secreto (RN-15) | E-2, E-14 |
| Despliegue, máquina de estados y línea de tiempo de eventos (I4, I5) | E-3 |
| Métricas por despliegue, insumo del nodo y del dashboard | E-3 |
| Arista del lienzo y su referencia al host provisto del destino, con el puerto literal (RN-04, D-9) | E-4, E-10, T-12, T-50 |
| Changeset, informe de impacto y cambios visuales que no lo integran (I9, RN-12, RN-13) | E-5 |
| Catálogo de servicios reutilizables con parámetros y formato de exportación | E-6 |
| Descubrimiento, adoptabilidad y reglas RA-01 a RA-06 (I10, RN-11, RN-29) | E-7 |
| Adopción sin recrear el contenedor (RA-02, RA-03) | E-11 |
| Rango gestionado, reserva por réplica y conflicto entre servicios activos (I7, RN-03, RN-06, RN-20) | E-8 |
| Algoritmo de validación de arranque y arranque parcial | E-8 |
| Formato de error `ProblemDetails` con miembros de extensión | E-8, E-13 |
| Esquema relacional completo, índices y decisiones de esquema | E-9 |
| Orden topológico de arranque sobre el **subgrafo de las aristas que esperan** (RN-14) | E-10, E-4, T-44 |
| Persistencia que sobrevive a la parada (I6, RN-09) | E-10 |
| Token de API con ámbitos, identificador y vigencia (RN-16) | E-12 |
| Contrato del endpoint de despliegue y respuestas por situación | E-13 |
| Ámbito mínimo del automatismo y revocación individual | E-12, E-13 |
| Exportación a Compose con secretos vacíos y manifiesto propio (RN-15) | E-14 |
| Importación inversa con disposición automática por capas | E-14 |
| Superficie de la API, con ámbito por endpoint | E-15 |
| Catálogo completo de reglas verificables RN-01 a RN-37, con momento de validación y respuesta | E-16 |
| Máquina de estados del despliegue y su traducción desde el estado del contenedor | E-17 |
| Estado degradado, pausado y huérfano, que no son caída | E-17, E-18 |
| Mapa de navegación y rutas que la etapa `b` debe dejar navegables | E-18 |
| Disposición del lienzo, anatomía del nodo y panel lateral de servicio | E-18 |
| Dashboard en tres capas y restricciones de su implementación | E-18 |
| Lenguaje visual de estados, con el violeta reservado a "pendiente de aplicar" | E-18 |
| Juego de datos de maqueta y patrones del parque real que el alta de servicio debe soportar | E-19, E-2 |
| Origen por Dockerfile con argumentos de construcción y versión fijada | E-20 (C-3), E-2 |
| Dispositivos del host anclados por identificador estable y capacidades del kernel | E-20 (C-3, C-4) |
| Creación de la red macvlan frente a su consumo como red externa | E-20 (C-4 frente a C-1, C-2, C-3, C-6) |
| Servicio efímero, con reserva de recursos y secretos fuera del despliegue | E-20 (C-6) |
| Secreto embebido en un archivo de despliegue, y su clasificación obligatoria al importarlo | E-20 (C-2), E-11, T-17, T-32 |
| Ciclo de valor, dentro de un servicio y entre servicios, que el grafo de arranque no detecta (RN-22) | E-4, E-9, T-36, T-52 |
| Escape del `$` literal en los dos sentidos de la ida y vuelta con Compose (RN-25, RN-26) | E-4, E-14, E-21, T-47, T-48 |
| Traducción de Compose al modelo de servicio, campo por campo | E-21 |
| Ida y vuelta con Compose sin pérdida | E-21, T-30 |
| Casos de prueba con entrada y resultado esperado por cada regla de negocio | E-22 |
| Fixture base para la maqueta y para las pruebas de integración | E-22, E-19, E-20 |
| Variable compartida del proyecto, secreta y no secreta (D-5, RN-27, RN-28) | E-1, E-2, E-5, E-9, E-10, E-14, T-41, T-42 |
| Referencia entre variables en sus tres formas, con la sintaxis de la plataforma de referencia y su forma canónica (D-6, RN-21) | E-4, E-2, T-34, T-35, T-51 |
| Convivencia de la sintaxis de referencia con la expansión de Compose, en las dos direcciones (RN-25, RN-26) | E-4, E-14, E-21, T-39, T-40 |
| Resolución de la referencia en el backend antes de crear el contenedor y propagación del secreto (RN-23, RN-24) | E-4, E-2, T-37, T-38 |
| Mecanismo único de vínculo: el enlace del lienzo como azúcar sobre la referencia (D-6, segunda pasada) | E-1, E-4, E-9, §17.4 P.11, T-12, T-53 |
| Referencia vinculada al servicio y no a su nombre; renombrado sin roturas (D-8, RN-33) | E-2, E-4, E-9, E-14, T-51, T-55 |
| Espera al destino como propiedad declarada, independiente de referenciar el host (D-11, RN-04, RN-05, RN-14, RN-34) | E-4, E-1, §17.4 P.11, T-44, T-45, T-46, T-56, T-57 |
| Arista sin variable, e importación sin pérdida de un `depends_on` (D-11, RN-34) | E-1, E-9, E-21, T-54, T-56 |
| Variables provistas por el sistema, con la resolución del host por modo de red, y el puerto literal (RN-32, D-9) | E-4, E-2, T-38, T-49, T-50 |
| Exigencia de canal alcanzable según si la arista referencia el host (RN-04) | E-4, §17.4 P.11, T-11, T-46 |
| Clasificación obligatoria de variables en la adopción, con la heurística como sugerencia (D-2, RA-05, RA-06, RN-29) | E-7, E-11, E-20 (C-2), E-21, T-17, T-17b, T-32, T-33 |
| Catálogo como cuarta vía de alta y como subgrafo parametrizado (D-7, RN-30) | §4 (F-14), E-6, E-10, T-43 |
| Resultado del despliegue determinado por contenedor y despliegue parcial legítimo (D-1, RN-31) | E-3, E-13, E-17, T-31 |
| Fundamento de I10: el alta crea desde cero y la adopción es el único camino, filtrado por el descubrimiento (D-3, RN-11) | §17.4 P.11, E-7 (RA-01), T-15 |

---

# Parte E — Continuidad de la Fase A generada bajo el conjunto normativo anterior

Esta parte **no existe en la plantilla del framework**. Se incorpora en la versión 2.0 con un único objetivo: que la regeneración de la documentación bajo el conjunto normativo 4.0 no descarte lo que la Fase A ya había producido y acordado. Todo su contenido está marcado **[FA]** y proviene de los seis documentos de `00-Contexto` —los cinco versionados más el README de la categoría— y de los diez de `01-Necesidades-Negocio` —el índice maestro, las ocho necesidades y su README— que el orquestador generó entre el 2026-07-27 y el 2026-07-28, más de los tres informes de revisión que el agente humano del proyecto recibió en ese tramo.

**Cómo debe consumirse.** Es **insumo de la regeneración, no su resultado**. Un subagente que regenere `00-Contexto` o `01-Necesidades-Negocio` bajo el conjunto vigente parte de acá en lugar de partir de cero, conserva los identificadores ya emitidos —`OBJ-XX`, `DV-XX`, `RE-XX`, `OP-XX`, `EN-XX`, `CA-XX`, `CP-XX`, `EP-XX`, `AT-XX`, `NB-XX`, `CU-XX`— porque hay artefactos y decisiones que ya los citan, y declara como propio todo lo que agregue o cambie. Lo que acá figura como derivación pendiente de confirmación sigue pendiente: la migración no la cierra.

**Qué no es.** No es una decisión del cliente. Donde el agente humano del proyecto sí se pronunció —los seis supuestos, las trece decisiones D-1 a D-13, la respuesta sobre los seis criterios derivados y la declaración de que no hay plazo fijado— la Parte E lo dice explícitamente en la fila correspondiente, y en esos puntos el dato es cerrado y vive además en las secciones del cuerpo que lo declaran.

**Qué no se transcribe acá, y dónde está.** La prosa completa de los dieciséis documentos no se reproduce: lo que se transcribe son sus **resultados citables** —tablas de identificadores, criterios, umbrales, dependencias y decisiones de recorte con su argumento—. El árbol generado sigue en `SDD/Docs/` hasta que el orquestador lo archive en su fase de reconciliación, de modo que la prosa original permanece consultable durante toda la regeneración.

## §22 Consolidado de 00-Contexto

Los cinco documentos de la categoría, con la versión que tenían al migrar: `Vision-Producto` 1.5, `Alcance-Proyecto` 1.5, `Roadmap-Producto` 1.5, `Compatibilidad-Plataformas` 1.4 y `Acuerdo-Equipo` 1.4, más el README de la categoría. Los cinco en estado Propuesto. Dos de ellos se generaron apartándose del criterio por defecto de la categoría, por decisión explícita del agente humano: `Compatibilidad-Plataformas`, porque el intake declara en los cuatro bloques P.9 una matriz restrictiva que necesita un lugar consolidado del que la categoría de devops derive la configuración sin recorrer cuatro bloques técnicos; y `Acuerdo-Equipo`, porque el cliente ya tenía cerrado un acuerdo operativo completo que condiciona a cinco categorías posteriores.

### §22.1 Objetivos SMART y métricas de éxito

Los cinco objetivos derivados de §8 y del dimensionamiento de §17.1 P.10 **[FA]**:

| ID | Objetivo | Métrica | Target | Plazo |
|---|---|---|---|---|
| OBJ-01 | Incorporar el parque existente sin reinstanciar contenedores | Contenedores en ejecución incorporados sobre el total relevado | ≥ 6 de 8 (≥ 75 %) | 3 meses desde el cierre del Alcance 1 |
| OBJ-02 | Reemplazar el alta manual de servicios por el alta desde la solución | Altas nuevas hechas desde la solución sobre el total | ≥ 90 % | 6 meses desde el cierre del Alcance 1 |
| OBJ-03 | Hacer reproducible la arquitectura fuera del servidor | Proyectos con exportación vigente, de antigüedad menor a 7 días | 100 % | 3 meses desde el cierre del Alcance 3 |
| OBJ-04 | Sostener la entrega por etapas sin regresión acumulada | Etapas cerradas con su guion ejecutado y los anteriores pasando sin corrección | 100 % | Durante toda la construcción |
| OBJ-05 | Operar la escala real sin degradación perceptible | Nodos y aristas por lienzo, y contenedores por parque | 30 nodos y 40 aristas; menos de 50 contenedores | Verificado en PT-01, antes de comprometer el corte del lienzo |

**Estado objetivo a tres años, y lo que se posterga explícitamente [FA].** A tres años el parque completo está representado en la solución: cada contenedor en ejecución pertenece a un proyecto declarado, con su red, sus direcciones reservadas y su disposición, y la pregunta «qué consume qué y con qué dirección» se responde mirando una pantalla. La arquitectura de cada proyecto es reproducible fuera del servidor, y esa exportación **es** la estrategia de respaldo frente a un servidor sin redundancia de disco. El alta deja de ser copiar y adaptar, con un catálogo que arranca vacío y que el propietario puebla, y con los valores compartidos definidos una sola vez. Y la publicación de una versión nueva puede dispararse desde un automatismo con credencial de ámbito mínimo. **El avance hacia ese estado no se mide por fechas de calendario**, sino por etapas cerradas con su punto de control aprobado. Se posterga explícitamente: la operación de más de un servidor y de más de un inquilino; la exposición del servicio fuera de la red local; la gestión de dominios públicos y del enrutamiento de entrada, con la consecuencia asumida de que reemplazar la versión de un servicio implica detener y arrancar, con una ventana de indisponibilidad que la interfaz debe advertir; la distribución de tráfico entre réplicas, que mientras no exista deja el escalado horizontal útil sólo para procesos sin tráfico entrante; y la gestión de múltiples usuarios, roles y permisos junto al segundo factor de autenticación.

OBJ-01 a OBJ-04 traducen las cuatro métricas de §8, confirmadas por el agente humano el 2026-07-27 (S-01); OBJ-01 lleva a valor absoluto el porcentaje, con el denominador de ocho contenedores tomado del anexo [E-19](#2019--e-19--parque-de-contenedores-de-referencia). **OBJ-05 es derivación de la categoría y sigue pendiente de confirmación**: la batería de validación del 2026-07-27 no lo alcanzó, y el README de `00-Contexto` lo registraba como pregunta abierta. Las cuatro métricas las verifica el agente humano del proyecto: las tres primeras se leen del propio sistema una vez que exista la capacidad, contrastadas contra el inventario del parque, y la cuarta se lee de los informes de cierre de etapa y de su índice.

### §22.2 Diferenciadores y restricciones identificados

Los cinco diferenciadores, con identificador emitido **[FA]**, derivados de §3:

| ID | Diferenciador |
|---|---|
| DV-01 | Adopción sin reinstanciar: los contenedores que ya corren se incorporan importando su configuración observada y quedando vinculados por identificador |
| DV-02 | Separación entre configuración y ejecución: el nodo es el servicio, permanente y posicionable; el color y la insignia reflejan el despliegue, que es volátil |
| DV-03 | Edición transaccional: los cambios se acumulan con su informe de impacto y se aplican en lote |
| DV-04 | El conflicto de direcciones como regla de negocio verificada antes de arrancar, con resoluciones ofrecidas |
| DV-05 | Diseñado para un servidor chico: decenas de nodos y menos de cincuenta contenedores, sin degradarse con treinta nodos |

Las doce restricciones del cliente, derivadas de §10 **[FA]**. RE-12 es la que el agente humano resolvió el 2026-07-27 declarando la ausencia en lugar de fijar un valor, y por eso vive además en §10 del cuerpo:

| ID | Restricción | Consecuencia para el producto |
|---|---|---|
| RE-01 | Dos desarrolladores | No hay trabajo en paralelo entre etapas: se trabaja en serie |
| RE-02 | Sin fecha objetivo; el avance se mide por etapas cerradas | El roadmap se expresa por hitos, nunca por fechas de calendario |
| RE-03 | Sin presupuesto monetario; toda dependencia de licencia abierta y permisiva | Ninguna capacidad puede depender de un producto de licencia comercial |
| RE-04 | Etapas en serie, con el punto de control como cuello por diseño | El punto de control bloquea el avance, y es decisión aceptada |
| RE-05 | El motor de contenedores del host es el sustrato, por su socket local | El producto no existe sin él y hereda sus límites |
| RE-06 | Servidor de gama modesta, sin redundancia de disco | Solución liviana, presupuesto de memoria de cientos de MB, sin sondeo agresivo |
| RE-07 | Sólo red local, sin publicación a internet | No hay superficie pública; el acceso remoto queda fuera de alcance |
| RE-08 | El ciclo de desarrollo ocurre dentro del entorno contenedorizado | Ningún guion puede asumir herramientas instaladas en el host |
| RE-09 | Ningún marco normativo aplicable | Sin requisitos de cumplimiento que condicionen el alcance |
| RE-10 | Una rama y un pull request por etapa; ningún secreto en el repositorio | Condiciona los entregables y el flujo de trabajo |
| RE-11 | Informe de cierre obligatorio por etapa | El informe es entregable al mismo nivel que el código |
| RE-12 | Sin horario core, sin franja comprometida y sin plazo máximo de respuesta | El bloqueo del punto de control no vence; es la razón de fondo por la que el avance no se compromete contra un calendario |

**Lectura de las restricciones en clave de alcance [FA].** Cuatro de las doce tienen una consecuencia sobre el alcance que no se lee del enunciado y que conviene conservar: de RE-01 y RE-04 se sigue que **el alcance de cada etapa debe ser recorrible por una persona en una sesión de demostración, y una etapa que no lo sea está mal cortada**; de RE-02, que el alcance no se recorta contra un calendario sino contra la demostrabilidad de cada etapa; de RE-05, que ninguna capacidad puede prometer lo que el motor no permite, con el escalado horizontal con dirección fija por servicio como caso concreto, porque exige una dirección por réplica; y de RE-12, que una etapa terminada puede quedar esperando su punto de control por tiempo indefinido, y esa espera **no habilita a iniciar la siguiente**. RE-09 se declara sin efecto sobre el alcance de forma explícita, para que no se lea como omisión: no hay capacidades de cumplimiento normativo que agregar.

Un término del glosario que la Fase A agregó y que §12 de este intake no tiene: **motor de contenedores**, el servicio del host que crea y ejecuta los contenedores, fuente de verdad del estado real y sustrato del producto, al que se accede por su socket local. §12 sólo define «socket del motor de contenedores». La regeneración debería conservarlo.

### §22.3 Objetivos de proyecto, entregables, ambientes y criterios de aceptación

Objetivos de proyecto **[FA]**, cada uno al servicio de un objetivo de negocio:

| ID | Objetivo del proyecto | Sirve a |
|---|---|---|
| OP-01 | Registro único y navegable de la arquitectura de cada conjunto de servicios | OBJ-01, OBJ-02 |
| OP-02 | Incorporar el parque existente sin cortar servicio ni reinstanciar | OBJ-01 |
| OP-03 | Despliegue derivado de la configuración declarada, con revisión previa del impacto | OBJ-02 |
| OP-04 | Conflicto de direcciones como regla verificada antes de arrancar | OBJ-02 |
| OP-05 | Arquitectura reproducible fuera del servidor, sin filtrar credenciales | OBJ-03 |
| OP-06 | Entrega por etapas cerradas y demostrables, sin regresión acumulada | OBJ-04 |
| OP-07 | Sostener la escala real del servidor sin degradación perceptible | OBJ-05 |

Entregables **[FA]**:

| ID | Entregable |
|---|---|
| EN-01 | Aplicación desplegable en el servidor de referencia, único artefacto ejecutable de la solución |
| EN-02 | Especificación de la solución: el conjunto de categorías de `SDD/Docs/` |
| EN-03 | Informe de cierre por etapa, de trece secciones, con su índice acumulativo |
| EN-04 | Guion de demostración por etapa, que debe seguir pasando en todas las posteriores |
| EN-05 | Materializaciones de las puertas técnicas PT-01 y PT-02 |
| EN-06 | Juego de datos de siembra que reproduce el parque de referencia |
| EN-07 | Registro de cambios de la solución, actualizado en la rama de cada etapa |

Ambientes: **desarrollo**, entorno contenedorizado declarativo sobre el host del equipo, con acceso al motor del propio host y resultado observado desde el navegador del host; y **producción**, la solución corriendo como un contenedor más en el servidor de referencia. **No hay ambiente intermedio de pruebas ni de preproducción**: el punto de control de cada etapa cumple esa función, y es decisión declarada por el cliente, no una omisión.

Criterios de aceptación del proyecto **[FA]**:

| ID | Criterio |
|---|---|
| CA-01 | Las capacidades Must Have F-01 a F-11 entregadas y demostradas, cada una con su etapa cerrada y su punto de control aprobado |
| CA-02 | Cada etapa cerrada con su informe de trece secciones publicado antes del punto de control y anotado en el índice |
| CA-03 | Al cerrar cada etapa, los guiones de todas las anteriores siguen pasando sin corrección |
| CA-04 | Las reglas de negocio que introduce cada etapa están cubiertas por pruebas automatizadas |
| CA-05 | PT-01 medida y aprobada antes de comprometer el corte del lienzo |
| CA-06 | PT-02 verificada antes del corte de despliegue, ya en la primera etapa |
| CA-07 | Ningún secreto entra al repositorio ni sale por una exportación |
| CA-08 | Las salvaguardas de aislamiento presentes en toda operación sobre el motor de contenedores |
| CA-09 | El parque de referencia se recorre con el juego de datos de siembra, sin configuración manual previa |
| CA-10 | Ninguna etapa se especifica con una decisión de producto pendiente que la alcance |

Gestión de cambios de alcance, en seis reglas operativas **[FA]**: todo pedido entra por el agente humano, único con autoridad para aceptarlo; se evalúa en un punto de control y nunca en medio de una etapa; se clasifica en capacidad nueva, ampliación o exclusión que se revierte, declarando qué etapa lo absorbe y qué se posterga a cambio; el aceptado se refleja en el alcance y en §4 o §9 de este intake, conservando el identificador de la capacidad; obliga a revisar el roadmap y las categorías 01, 02 y 06; y el rechazado se registra igualmente como exclusión con su justificación, porque un pedido que no queda registrado vuelve.

### §22.4 Roadmap por fases, épicas y etapas

Cinco fases, con la correspondencia uno a uno entre alcance del intake y fase, salvo la de cimientos **[FA]**:

| Fase | Objetivo | Épicas | Etapas |
|---|---|---|---|
| Fase 0 — Cimientos | Solución compilando, ejecutándose y navegable, con PT-02 verificada antes de que ninguna capacidad dependa del motor | EPC-01, EPC-02 | `a` esqueleto ejecutable, `b` panel navegable |
| Fase 1 — Alcance 1: núcleo operable | El mínimo sin el cual la solución no resuelve el problema | EP-01 a EP-11 | `c` y `01` a `10` |
| Fase 2 — Alcance 2: observabilidad | Estado del servidor, del proyecto y del contenedor en un único tablero | EP-12 | 1 etapa estimada |
| Fase 3 — Alcance 3: portabilidad y reutilización | Arquitectura reproducible fuera del servidor y alta reutilizable | EP-13, EP-14, EP-17 | 3 etapas estimadas |
| Fase 4 — Alcance 4: automatización | Un automatismo dispara un despliegue sin conocer la contraseña del administrador | EP-15, EP-16 | 2 etapas estimadas, 1 si EP-15 se adelanta |

Las etapas de la Fase 0 son hitos internos; la `c` y todas las posteriores son hitos demostrables sin excepción: una etapa que no produzca algo recorrible en el navegador está mal cortada y se redivide. Las trece etapas de las fases 0 y 1 están declaradas por el cliente y no son estimación; las de las fases 2 a 4 son **estimación de piso**, una por épica, derivada de la regla de corte que el cliente sí declara.

Épicas, con su capacidad y su fase **[FA]**. Las dos de cimientos usan serie propia para no ocupar números de la serie de capacidades:

| Épica | Fase | Capacidad | Qué entrega |
|---|---|---|---|
| EPC-01 | 0 | — | Esqueleto ejecutable, con página de salud en el navegador del host. Verifica PT-02 |
| EPC-02 | 0 | — | Panel navegable: todas las rutas del mapa, validadas contra la maqueta |
| EP-01 | 1 | F-01 | Administrador único y sesión |
| EP-02 | 1 | F-02 | Proyectos SelfHosted con su modo de red y su persistencia |
| EP-03 | 1 | F-03 | Servicios del proyecto: alta y configuración completa |
| EP-04 | 1 | F-04 | Lienzo: nodos, aristas, desplazamiento, zoom, agrupación y disposición persistente |
| EP-05 | 1 | F-05 | Despliegue desde imagen de registro público, con estado real y registros |
| EP-06 | 1 | F-06 | Arranque y parada, con autoarranque y orden declarado por el grafo |
| EP-07 | 1 | F-07 | Cambios pendientes: changeset, informe de impacto y aplicación en lote |
| EP-08 | 1 | F-08 | Direcciones y conflictos, con resoluciones ofrecidas |
| EP-09 | 1 | F-09 | Escalado manual horizontal y vertical |
| EP-10 | 1 | F-10 | Despliegue construyendo la imagen, con seguimiento del progreso |
| EP-11 | 1 | F-11 | Descubrimiento y adopción, con las salvaguardas de aislamiento |
| EP-12 | 2 | F-12 | Tablero en tres capas |
| EP-13 | 3 | F-13 | Exportación e importación de la arquitectura, con el manifiesto propio |
| EP-14 | 3 | F-14 | Catálogo de plantillas reutilizables, como cuarta vía de alta |
| EP-15 | 4 | F-15 | Tokens de API con ámbitos, vigencia y revocación inmediata. Admite adelanto a la Fase 1 |
| EP-16 | 4 | F-16 | Disparo de despliegue desde un automatismo con token de ámbito mínimo |
| EP-17 | 3 | F-17 | Exportación programada a un destino externo |
| EP-23 | Sin asignar | F-23 | Variables compartidas del proyecto |
| EP-24 | Sin asignar | F-24 | Referencias entre variables |
| EP-25 | Sin asignar | F-25 | Higiene del modelo |

Secuencia de etapas de las fases 0 y 1, declarada por el cliente **[FA]**: `a` esqueleto ejecutable, `b` panel navegable, `c` administrador y sesión, `01` proyectos, `02` servicios del proyecto, `03` lienzo, `04` despliegue desde imagen pública, `05` arranque y parada, `06` cambios pendientes, `07` direcciones y conflictos, `08` escalado manual, `09` despliegue desde definición local y repositorio, `10` descubrimiento y adopción. Los cortes pueden reordenarse o subdividirse, pero no fusionarse hasta perder la demostrabilidad intermedia.

Puertas técnicas **[FA]**, cuyos umbrales son evidencia declarada por las fuentes y nunca fueron supuesto:

| Puerta | Qué verifica | Qué condiciona | Cuándo se mide |
|---|---|---|---|
| PT-01 | Fluidez del lienzo con 30 nodos y 40 aristas, con insignia de estado y métricas por nodo, actualización cada 2 segundos, sin retraso perceptible en el arrastre, y consumo estable tras 15 minutos de uso continuo | La etapa `03` y con ella EP-04. Su falla obliga a cambiar la herramienta del lienzo y a replanificar ese corte | Antes de comprometer el corte del lienzo |
| PT-02 | Verificación del motor desde el entorno de desarrollo: listar, crear, arrancar, detener y eliminar un contenedor de prueba, construir una imagen desde definición local y alcanzarla por red | Todo corte de despliegue, empezando por la etapa `04` | En la etapa `a` |

Dependencias funcionales entre épicas **[FA]**: EP-02 depende de EP-01; EP-03 de EP-02; EP-04 de EP-03; EP-05 de EP-03 y de PT-02; EP-06 de EP-05 y EP-04; EP-07 de EP-05; EP-08 de EP-06; EP-09 de EP-08; EP-10 de EP-05; EP-11 de EP-08. Las fases 2, 3 y 4 dependen de la Fase 1 completa, y la Fase 1 de la Fase 0.

Criterios de transición entre fases **[FA]**, que son listas de verificación y no plazos, y que la categoría de calidad y pruebas toma como verificaciones ejecutables:

| Transición | Criterios verificables |
|---|---|
| — → Fase 0 | El intake aprobado y el manifiesto derivado; las decisiones de producto pendientes registradas y asignadas al cliente, ninguna alcanzando a una etapa de esta fase |
| Fase 0 → Fase 1 | La solución compila y arranca desde los guiones, dentro del entorno, sin pasos manuales; la página de salud responde en el navegador del host; PT-02 verificada y su materialización corriendo como prueba automatizada; todas las rutas del mapa navegables y validadas contra la maqueta; informes de `a` y `b` publicados y anotados; puntos de control de `a` y `b` con OK explícito |
| Fase 1 → Fase 2 | Las once capacidades F-01 a F-11 entregadas, cada una con su etapa cerrada y su punto de control aprobado; PT-01 medida y aprobada, o su plan de contingencia aplicado y el corte del lienzo replanificado y cerrado; los guiones de las once etapas pasando de corrido; el parque de referencia recorrible con el juego de datos de siembra; **al menos un contenedor del parque real adoptado sin reinstanciarlo y sin cortar su servicio**; salvaguardas de aislamiento presentes en las etapas de despliegue y adopción; umbrales de cobertura cumplidos |
| Fase 2 → Fase 3 | El tablero muestra las tres capas; la presión de memoria se atribuye a un servicio concreto desde el tablero; la recolección de estadísticas ocurre sólo con vistas abiertas; los guiones anteriores siguen pasando |
| Fase 3 → Fase 4 | Un proyecto se exporta y se reimporta conservando arquitectura y disposición; ninguna exportación contiene un secreto y el archivo de variables sale vacío; el catálogo permite dar de alta un servicio frecuente con sus parámetros; existe una exportación programada hacia un destino externo; los guiones anteriores siguen pasando |
| Fase 4 → Cierre de la versión | Un token de ámbito mínimo dispara un despliegue sin que el automatismo conozca la contraseña; la revocación deja de habilitar el disparo de forma inmediata; ningún secreto vive en el repositorio ni en la imagen; los guiones de todas las etapas pasan de corrido; las cuatro métricas de éxito tienen lectura definida y responsable asignado |

Regla común a toda transición: ninguna etapa se considera terminada sin su informe de cierre publicado antes del punto de control, y **un informe que declara terminada una etapa incompleta invalida el punto de control**.

**Dos derivaciones de esta categoría que siguen pendientes de confirmación.** La primera: el reparto de EP-12, EP-14 y EP-17 entre las fases 2 y 3 no lo declara el cliente. El intake fija dos anclajes —la métrica de reproducibilidad se ata al cierre del Alcance 3 y la nota de §4 ubica tokens y despliegue automatizado en el Alcance 4— y el resto es derivación del roadmap a partir de la prioridad MoSCoW. La segunda: EP-23, EP-24 y EP-25 **no tienen fase ni corte asignado**, porque los diez cortes verticales del Alcance 1 están declarados de forma cerrada y ninguna de las tres figura entre ellos; es la misma pendiente que §19 registra. Quien las asigne tiene que resolver tres consecuencias: ninguna puede ubicarse antes de EP-03; el corte del lienzo necesita la forma mínima del mecanismo de referencia, tensión que la tercera pasada aflojó al admitir la arista sin variable pero que no disolvió; y F-25 va después de F-23 y F-24, porque las condiciones que advierte son en su mayoría sobre variables compartidas y referencias.

### §22.5 Compatibilidad y plataformas

Matriz por componente **[FA]**, consolidada de los cuatro bloques P.9:

> **Anotación de la versión 2.2, 2026-07-29.** Esta tabla es material **[FA]** y su contenido no se modificó. Lo único que se corrigió es la **columna de componente**: sus cuatro primeras filas nombraban proyectos de código —`SelfHosted-Web`, `SelfHosted-Application`, `SelfHosted-Infrastructure`, `SelfHosted-Domain`— que dejaron de existir con la decisión del proyecto único, y pasan a nombrar las capas equivalentes. Ninguna plataforma, ningún runtime y ningún umbral cambió. La fuente vigente de la matriz es §17.P.9, que además incorporó las dos filas de cliente que esta tabla no tiene.

| Componente | Sistema operativo | Runtime | Motor de contenedores | Almacenamiento | Navegador |
|---|---|---|---|---|---|
| `Web` | Linux Debian 13, kernel 6.12 | .NET 10 | Docker 26.x con `compose` v5 y `buildx`, por socket del host | Delegado en Infrastructure | Navegador de escritorio con soporte de WebSockets, sin familia declarada |
| `Application` | Indiferente | .NET 10 | No aplica | No aplica | No aplica |
| `Infrastructure` | Linux Debian 13, kernel 6.12 | .NET 10 | Docker 26.x; el cliente declara soporte de la interfaz del motor v29.4.1 | SQLite embebido en el proveedor de acceso a datos de .NET 10, con diario WAL | No aplica |
| `Domain` | Indiferente | .NET 10 | No aplica | No aplica | No aplica |
| Entorno de desarrollo | Linux, host del equipo | .NET 10 dentro del contenedor | Docker del host, patrón de motor externo | Archivo local de SQLite | Navegador de escritorio del host |
| Pipeline | Linux, ejecutor autoalojado en el propio servidor | .NET 10 | Docker del propio servidor | SQLite real en pruebas de integración | No aplica |

Restricciones de plataforma justificadas **[FA]**:

| ID | Restricción | Consecuencia asumida |
|---|---|---|
| CP-01 | Una única combinación de sistema operativo y runtime, sin matriz | Sin guiones alternativos por plataforma; los scripts no detectan entorno ni ramifican |
| CP-02 | El host de desarrollo no tiene ni tendrá herramientas de construcción | Todo comando corre dentro del entorno contenedorizado |
| CP-03 | El directorio de datos de trabajo montado en la misma ruta absoluta en host y entorno | La ruta se expone como única variable de configuración y es la raíz del adaptador |
| CP-04 | Los contenedores creados son hermanos del entorno de desarrollo, no hijos | Para alcanzar por red un servicio recién desplegado hay que adjuntarse a su red o usar el puerto publicado |
| CP-05 | Sin soporte para motores de contenedores distintos del declarado | El punto de extensión existe, pero ningún otro motor está verificado |
| CP-06 | Sin soporte para bases de datos distintas de la declarada | Dos instancias sobre el mismo archivo de datos no están soportadas |
| CP-07 | El servicio no se publica a internet | Sin superficie pública ni certificado gestionado por la solución |
| CP-08 | Dominio y aplicación no pueden tener superficie de plataforma | Control de arquitectura bloqueante en el pipeline, no una convención |
| CP-09 | El entorno de desarrollo no define ni condiciona la imagen de producción | La imagen de producción se construye con su propia definición multietapa |

Regla de cierre de la matriz **[FA]**: **toda combinación de plataforma no listada se considera no soportada**. No hay soporte parcial ni soporte «de hecho»; una plataforma que no aparece no tiene verificación asociada y por lo tanto no puede declararse compatible. De ahí las alternativas declaradas, que en su mayoría son la declaración explícita de que no hay alternativa dentro del alcance:

| Plataforma no soportada | Alternativa |
|---|---|
| Windows como plataforma de ejecución o de desarrollo | Ninguna dentro del alcance. La vía practicable —ejecutar el entorno sobre un subsistema Linux con motor propio— queda fuera de lo verificado. No hay guiones para intérpretes de comandos de Windows y no se van a agregar |
| macOS como plataforma de ejecución o de desarrollo | Ninguna dentro del alcance. El proyecto no verifica esa combinación |
| Otros motores de contenedores | El adaptador vive detrás de una única abstracción, de modo que sustituirlo es trabajo acotado a un componente, y la batería de pruebas de contrato diría si un reemplazo es equivalente. Es un punto de extensión declarado, no una compatibilidad ofrecida |
| Otros almacenamientos | Ninguna. El modelo de concurrencia y el esquema están atados al declarado; cambiarlo es una decisión de arquitectura con registro propio |
| Navegadores sin soporte de WebSockets | Ninguna. La sesión persistente es constitutiva del modelo de interfaz, y el sondeo largo como transporte alternativo está explícitamente descartado por su efecto sobre la fluidez del lienzo |
| Navegadores móviles y pantallas pequeñas | Fuera de la matriz. No son plataforma target: los anchos de ventana en los que se verifica el comportamiento responsivo los declara la maqueta y los registra la etapa `b` en su informe |
| Acceso desde fuera de la red local | Ninguna. Requeriría una capa de protección adicional, hoy excluida |
| Más de una instancia sobre el mismo almacenamiento | Ninguna. Es una carga que la solución declara no soportar (CP-06) |

Verificación prevista por plataforma **[FA]**, que es lo que convierte cada fila de la matriz en un hecho comprobable y no en una declaración. El sistema todavía no está construido, de modo que la matriz especifica el objetivo y esta tabla dice con qué se va a verificar:

| Plataforma o combinación | Verificación prevista | Dónde queda la evidencia |
|---|---|---|
| Linux Debian 13 con .NET 10, como plataforma de ejecución | Construcción y arranque desde los guiones dentro del entorno, con página de salud respondiendo en el navegador del host | Etapa `a` y su informe |
| Motor de contenedores por socket | PT-02 materializada como prueba de integración automatizada | Etapa `a`, prueba de integración y su ejemplo ejecutable |
| Almacenamiento con diario WAL | Pruebas de integración con almacenamiento real, más la validación del comportamiento bajo escritura concurrente registrada en el caso límite CL-09 | Categoría de calidad y pruebas |
| Navegador de escritorio con WebSockets | PT-01 sobre el navegador que el agente humano use en el punto de control, y registro de los anchos de ventana verificados | Etapa `b`, etapa del lienzo y sus informes |
| Entorno de desarrollo contenedorizado con motor externo | El propio arranque de la etapa `a`, que sólo puede ocurrir dentro del entorno | Etapa `a` y su informe |
| Ejecutor autoalojado del pipeline | Ejecución del control de pruebas de integración, que requiere el socket disponible en el ejecutor | Categoría de devops |
| Ausencia de superficie de plataforma en dominio y aplicación | Control de arquitectura bloqueante: cero dependencias externas en el dominio y ningún tipo del cliente del motor fuera de su carpeta de adaptador | Controles del pipeline |

**Brecha declarada y abierta**: la fila de navegador es la única de la matriz sin versión mínima concreta. Hasta que se cierre, la categoría de devops no puede derivar una verificación de navegador y la de calidad no puede escribir un criterio de compatibilidad de interfaz. Su desarrollo completo está en §24.2.

> **Anotación de la versión 2.1, 2026-07-29.** El párrafo de arriba es material **[FA]** de la Fase A previa y se conserva sin modificar, porque es el registro de lo que esa fase afirmaba. **La brecha ya no está abierta**: el agente humano del proyecto cerró la matriz el 2026-07-28 y §17.1 P.9 la declara desde esta versión. La verificación de la fila de navegador pasa a ser «Chrome estable de versión igual o superior a 150.0.7871.186, con el número concreto registrado en el informe de cierre de la etapa». Un artefacto downstream toma §17.1 P.9 como fuente, no este párrafo.

### §22.6 Acuerdo de equipo, definición de terminado y de listo

El modelo de gestión **no es Scrum** **[FA]**: no hay sprints de duración fija, ni fechas comprometidas, ni estimación por puntos. La unidad de gestión es la etapa y la cadencia la marca su cierre. Las ceremonias se disparan por evento del ciclo de la etapa —especificación, verificación de puerta técnica, publicación del informe, punto de control, fusión y etiquetado, revisión de alcance— y no hay ninguna de cadencia fija.

Los veintiocho acuerdos operativos, todos redactados como regla verificable **[FA]**:

| # | Regla | Cómo se verifica |
|---|---|---|
| AT-01 | Una rama por etapa, creada desde la principal | Historial con una única rama abierta a la vez |
| AT-02 | No se abre la rama de una etapa antes de fusionar la anterior | Las fechas de creación y fusión no se solapan |
| AT-03 | Un pull request por etapa; el pull request es el punto de control | Un pull request por etapa cerrada |
| AT-04 | La rama se borra después de la fusión | No quedan ramas de etapa cerradas en el remoto |
| AT-05 | Cada etapa cerrada recibe su etiqueta | Desplegar la imagen de esa etiqueta reproduce la demostración |
| AT-06 | No se fusiona sin OK explícito tras ejecutar el guion de demostración | El pull request registra la aprobación antes de la fusión |
| AT-07 | La fusión la realiza el agente humano, no el agente IA | Autor de la fusión en el historial |
| AT-08 | Antes de abrir el pull request se verifica que los guiones previos siguen pasando | El pull request declara el resultado; es control bloqueante |
| AT-09 | Un criterio incumplido se declara en el informe; un informe que declara terminada una etapa incompleta invalida el punto de control | Contraste entre el informe y el resultado del guion |
| AT-10 | Conventional Commits sin excepciones | Control automatizado sobre los mensajes |
| AT-11 | SemVer 2.0.0, único para toda la solución, porque se despliega como un único artefacto. **[FA]** decía «para los cuatro proyectos de código»; desde la versión 2.2 hay uno solo y la unicidad pasó de acuerdo a propiedad estructural | La versión calculada en el pipeline es única |
| AT-12 | La versión se deriva de los mensajes desde la etiqueta anterior; hasta la primera entrega completa permanece en la serie 0.x | Salida del cálculo de versión |
| AT-13 | Las migraciones de esquema no se editan una vez fusionadas | Ninguna migración fusionada aparece modificada después |
| AT-14 | Cada etapa cierra con su informe autocontenido, publicado antes del punto de control | El archivo existe con su nombre de orden y etapa |
| AT-15 | El informe tiene sus trece secciones obligatorias, en orden | Revisión de encabezados |
| AT-16 | El informe se lee sin abrir el análisis ni el código | Revisión del agente humano antes del punto de control |
| AT-17 | Todo comando que aparece en un informe fue ejecutado tal como está escrito | Ejecución del guion durante el punto de control |
| AT-18 | El índice de informes se mantiene al día, sin huecos | El índice lista todos los informes existentes |
| AT-19 | Los informes anteriores no se editan salvo para actualizar su estado | Historial de cambios de los archivos publicados |
| AT-20 | El registro de cambios se actualiza en la rama de la etapa | El commit del registro pertenece a esa rama |
| AT-21 | Ningún secreto entra al repositorio | Control de verificación de secretos en el pipeline, bloqueante |
| AT-22 | Los tokens de un automatismo se guardan como secretos del remoto y con ámbito mínimo | Revisión de la configuración y del ámbito emitido |
| AT-23 | Los informes transcriben credenciales de ejemplo del entorno de desarrollo, nunca un secreto de producción | Revisión del informe antes del punto de control |
| AT-24 | Toda decisión que exceda el alcance de la etapa se eleva y se resuelve en el punto de control | El pedido queda registrado, no aplicado |
| AT-25 | El canal formal de aprobación es el pull request | El pull request contiene la aprobación |
| AT-26 | No hay plazo máximo de respuesta; el bloqueo del punto de control no vence | Ninguna rama posterior abierta antes de la fusión, cualquiera sea el tiempo transcurrido |
| AT-27 | Una pregunta que bloquea la especificación se registra como supuesto abierto con dueño y destino, y no se resuelve por invención | Los supuestos abiertos tienen dueño y destino declarados |
| AT-28 | No hay horario core ni franja de disponibilidad comprometida; la coordinación es asíncrona y su registro es el pull request | Ninguna regla operativa referencia una franja horaria |

Roles, con la autoridad que cada uno tiene declarada **[FA]**. La regla de separación que los ordena es que **la fusión de la rama de etapa la realiza el agente humano, nunca el agente IA**, y es verificable en el historial del pull request:

| Rol | Responsabilidad operativa | Autoridad |
|---|---|---|
| Agente humano del proyecto | Recibe el guion de demostración, lo ejecuta, da o niega el OK, fusiona la rama y avisa el cierre | Única autoridad para aprobar un punto de control, fusionar y aceptar un cambio de alcance |
| Equipo de desarrollo | Especifica la etapa con la plantilla, construye el corte vertical, escribe las pruebas de las reglas que introduce y redacta el informe de cierre | Decide la implementación dentro del alcance de la etapa; eleva todo lo que lo exceda |
| Agente IA de codificación | Genera la documentación y el código de cada etapa, y verifica que los guiones previos siguen pasando antes de preparar el pull request | No fusiona ramas y no aprueba puntos de control |
| Administrador de la solución | Opera el producto entregado y reporta lo que no funciona | Origen de todo pedido de cambio |

Ceremonias, todas disparadas por un evento del ciclo de la etapa y ninguna de cadencia fija **[FA]**, porque no hay sprints de duración fija y toda ceremonia tiene que ser observable en el repositorio:

| Ceremonia | Cuándo | Condición |
|---|---|---|
| Especificación de etapa | Antes de escribir la primera línea de código | Bloqueante: una etapa sin criterios de aceptación verificables no se puede iniciar |
| Verificación de puerta técnica | Antes de comprometer el corte que la puerta condiciona | Una puerta sin medir detiene la planificación de lo que depende de ella |
| Publicación del informe de cierre | Antes de convocar el punto de control | Sin informe publicado y anotado en su índice no se convoca al agente humano |
| Punto de control de etapa | Al terminar cada etapa, sobre el pull request abierto | Bloqueante: el proyecto no avanza sin OK explícito |
| Fusión y etiquetado | Inmediatamente después del OK | La rama se fusiona, se borra y la etapa recibe su etiqueta |
| Revisión de alcance | Sólo dentro de un punto de control | Una etapa en curso no cambia de alcance |

Definición de terminado de una etapa **[FA]**, once condiciones bloqueantes y una no bloqueante, con su identificador, porque las categorías de plan de sprint y de calidad las citan así:

| # | Condición | Bloqueante |
|---|---|---|
| DoD-01 | La construcción termina en cero y sin advertencias de compilación | Sí |
| DoD-02 | La batería de pruebas pasa completa | Sí |
| DoD-03 | La cobertura alcanza el mínimo de cada capa, medido por filtro de espacio de nombres desde la versión 2.2: dominio 90 % de líneas y 85 % de ramas; aplicación 80 % y 70 %; interfaz 60 % y 50 %; adaptadores 55 % y 45 % | Sí |
| DoD-04 | Las reglas de negocio que la etapa introdujo tienen prueba automatizada | Sí |
| DoD-05 | Ninguna dependencia con vulnerabilidad conocida de severidad alta o crítica | Sí |
| DoD-06 | Ningún secreto en el árbol de fuentes | Sí |
| DoD-07 | Los guiones de demostración de todas las etapas anteriores siguen pasando, sin corrección | Sí |
| DoD-08 | El informe de cierre está publicado, con sus trece secciones, y anotado en el índice | Sí |
| DoD-09 | El registro de cambios está actualizado en la rama de la etapa | Sí |
| DoD-10 | El guion de demostración se ejecutó en el punto de control con OK explícito del agente humano | Sí |
| DoD-11 | Ningún tipo del cliente del motor de contenedores aparece fuera de su carpeta de adaptador, y las pruebas de dominio no requieren motor ni base de datos | Sí |
| DoD-12 | El inventario de componentes de la construcción se genera y se adjunta al artefacto | No |

Los umbrales de DoD-03 provienen de S-02, confirmado sin cambios el 2026-07-27, y son control bloqueante del pipeline y no una meta indicativa.

Definición de listo **[FA]**, doce condiciones, todas bloqueantes:

| # | Condición |
|---|---|
| DoR-01 | La etapa declara su tipo: hito interno o hito demostrable |
| DoR-02 | Declara objetivo, alcance y fuera de alcance |
| DoR-03 | Declara su entregable tangible |
| DoR-04 | Declara su guion de demostración, con el estado de partida y cómo se llega a él |
| DoR-05 | Declara criterios de aceptación verificables. Una etapa sin ellos no se puede iniciar |
| DoR-06 | Declara su punto de control y qué debe explicar su informe de cierre en particular |
| DoR-07 | Referencia la sección del análisis que especifica lo que implementa |
| DoR-08 | El corte es vertical: atraviesa interfaz, aplicación, dominio, datos y motor de contenedores. Está prohibido planificar por capa técnica |
| DoR-09 | De la etapa `c` en adelante, produce algo que el cliente pueda recorrer en el navegador. Si no, está mal cortada y se redivide |
| DoR-10 | La puerta técnica que condiciona la etapa, si existe, está medida y aprobada |
| DoR-11 | Ningún supuesto abierto del que dependa el comportamiento a especificar sigue sin respuesta del cliente |
| DoR-12 | El guion arranca con los guiones de ejecución, dentro del entorno de desarrollo, sin pasos manuales de preparación fuera de ellos |

Herramientas **[FA]**: repositorio remoto en GitHub con el flujo de una rama y un pull request por etapa; repositorio de documentación separado para los informes de cierre y su índice; GitHub Actions con ejecutor autoalojado en el propio servidor, que requiere el socket del motor disponible; entorno de desarrollo contenedorizado declarativo; guiones del repositorio para construir, ejecutar, migrar, probar y reiniciar la base local; configuración de depuración del editor como camino separado; navegador de escritorio del host como único lugar donde se observa el resultado de un guion; registro de cambios de la solución; y herramienta de migración de esquema declarada como local del repositorio y no global, para que su versión quede versionada junto al código.

## §23 Consolidado de 01-Necesidades-Negocio

Ocho necesidades, generadas una sola vez a nivel solución, con cuarenta y cuatro criterios de éxito, treinta y seis casos de uso previstos y un grafo de dependencias acíclico. Versiones al migrar: NB-01 en 1.5, NB-05 y NB-06 en 1.4, las otras cinco en 1.2, con el índice maestro y el README en 1.5. Todas en estado Propuesto.

### §23.1 Catálogo de necesidades y su grafo

| ID | Necesidad | MoSCoW | Capacidades que agrupa | Dolor central |
|---|---|---|---|---|
| NB-01 | Visibilidad unificada de la arquitectura de un conjunto de servicios | Must | F-02, F-03, F-04, F-25 | La arquitectura no existe como objeto: vive repartida entre archivos dispersos y el estado del motor |
| NB-02 | Adoptabilidad del parque existente sin reinstanciar lo que ya está en producción | Must | F-11 | Incorporar un servicio en uso exige hoy recrearlo, con su ventana de indisponibilidad |
| NB-03 | Reproducibilidad de la arquitectura ante la pérdida del servidor | Should | F-13, F-17 | No existe representación de la arquitectura fuera del propio servidor, que no tiene redundancia de disco |
| NB-04 | El alta de un servicio deja de ser un ejercicio de copiar y adaptar | Must | F-05, F-10, F-14, F-23, F-24 | Cada alta parte de la configuración de otro servicio y arrastra decisiones que ya no corresponden |
| NB-05 | Arranque previsible: orden declarado y conflictos de dirección detectados antes de fallar | Must | F-06, F-08 | El orden vive en la memoria del operador y el conflicto de direcciones se descubre cuando el motor ya falló |
| NB-06 | Cambios de configuración revisados antes de aplicarse y aplicados en un solo lote | Must | F-07, F-09 | Cada cambio provoca su propio reemplazo de contenedor y su propia ventana de indisponibilidad |
| NB-07 | Atribución del consumo del servidor a un servicio concreto | Should | F-12 | No hay un lugar donde el estado del equipo, del conjunto y del contenedor se lean con la misma vista |
| NB-08 | Control de acceso al panel que gobierna el host y credenciales de máquina acotadas | Must | F-01, F-15, F-16 | Un panel con control total del equipo no puede quedar accesible sin credencial, y un automatismo no debe conocer la credencial humana |

Grafo de dependencias, acíclico y con un máximo de dos dependencias por necesidad **[FA]**:

| NB | Depende de | Es prerequisito de |
|---|---|---|
| NB-08 | — | NB-01, y por transitividad las seis restantes |
| NB-01 | NB-08 | NB-02, NB-03, NB-04, NB-05 y NB-07 de forma directa; NB-06 por transitividad |
| NB-04 | NB-01 | NB-03, NB-05, NB-06, NB-07 |
| NB-05 | NB-01, NB-04 | NB-02, NB-06 |
| NB-02 | NB-01, NB-05 | — |
| NB-06 | NB-04, NB-05 | — |
| NB-03 | NB-01, NB-04 | — |
| NB-07 | NB-01, NB-04 | — |

Orden topológico, que es también el orden de lectura sugerido: NB-08, NB-01, NB-04, NB-05, NB-02, NB-06, NB-03, NB-07. Un lector que sólo necesite entender por qué existe el producto puede leer NB-01, NB-02 y NB-05.

### §23.2 Trazabilidad de capacidad a necesidad y de necesidad a caso de uso

Cada capacidad de §4 tiene exactamente una necesidad responsable **[FA]**. Las excluidas de la primera versión, F-18 a F-22, no generan necesidad:

| Capacidad | NB | Capacidad | NB |
|---|---|---|---|
| F-01 | NB-08 | F-11 | NB-02 |
| F-02 | NB-01 | F-12 | NB-07 |
| F-03 | NB-01 | F-13 | NB-03 |
| F-04 | NB-01 | F-14 | NB-04 |
| F-05 | NB-04 | F-15 | NB-08 |
| F-06 | NB-05 | F-16 | NB-08 |
| F-07 | NB-06 | F-17 | NB-03 |
| F-08 | NB-05 | F-23 | NB-04 |
| F-09 | NB-06 | F-24 | NB-04 |
| F-10 | NB-04 | F-25 | NB-01 |

Casos de uso previstos, con numeración única en toda la solución y sin colisión entre necesidades **[FA]**. Treinta y uno corresponden a `SelfHosted-Web`, tres a `SelfHosted-Infrastructure`, uno a `SelfHosted-Application` y uno a `SelfHosted-Domain`:

| NB | CU | Proyecto de código |
|---|---|---|
| NB-01 | CU-01 alta de proyecto SelfHosted con su modo de red y persistencia; CU-02 listado, renombrado y eliminación; CU-03 alta y configuración completa de un servicio; CU-04 composición del lienzo; CU-05 persistencia y recuperación de la disposición; CU-36 revisión de higiene del registro | SelfHosted-Web |
| NB-02 | CU-06 descubrimiento con motivo de no incorporabilidad; CU-07 incorporación con confirmación explícita | SelfHosted-Web |
| NB-02 | CU-08 traducción de la configuración observada al modelo de servicio | SelfHosted-Infrastructure |
| NB-03 | CU-09 exportación en formato estándar; CU-10 exportación del manifiesto propio; CU-11 importación como proyecto nuevo | SelfHosted-Web |
| NB-03 | CU-12 ejecución programada de la exportación hacia un destino externo | SelfHosted-Infrastructure |
| NB-04 | CU-13 despliegue desde imagen pública; CU-14 consulta del registro del contenedor; CU-15 despliegue construyendo la imagen; CU-16 alta desde plantilla del catálogo con creación del conjunto completo; CU-17 mantenimiento del catálogo; CU-34 variables compartidas del proyecto; CU-35 valor expresado como referencia | SelfHosted-Web |
| NB-05 | CU-18 arranque y parada con autoarranque; CU-19 rango gestionado y reserva por servicio; CU-21 informe de conflicto y aplicación de la resolución elegida | SelfHosted-Web |
| NB-05 | CU-20 validación de conflicto contra los servicios activos, sin acceso al motor | SelfHosted-Domain |
| NB-06 | CU-22 acumulación de cambios pendientes con distinción de los visuales; CU-23 descarte de un cambio individual; CU-24 aplicación en lote | SelfHosted-Web |
| NB-06 | CU-25 cálculo del informe de impacto | SelfHosted-Application |
| NB-07 | CU-26 lectura del estado del servidor; CU-27 vista por proyecto y por contenedor | SelfHosted-Web |
| NB-07 | CU-28 reconciliación con el motor y señalización del servicio huérfano | SelfHosted-Infrastructure |
| NB-08 | CU-29 alta del administrador en el primer arranque; CU-30 inicio y cierre de sesión; CU-31 cambio de contraseña; CU-32 emisión, listado y revocación de credenciales de máquina; CU-33 disparo de despliegue con credencial de ámbito mínimo | SelfHosted-Web |

> **Anotación de la versión 2.2, 2026-07-29.** La columna de la derecha de esta tabla es material **[FA]** y nombra los cuatro proyectos de código que la Fase A previa conocía. Desde la decisión del proyecto único esos nombres designan **capas**, no proyectos de código: `SelfHosted-Web` se lee como la capa `Web`, y equivalentemente los otros tres. La tabla se conserva sin modificar porque es el registro de la asignación que esa fase hizo, y porque la asignación **sigue siendo válida**: qué capa implementa cada caso de uso no depende de cuántos proyectos de compilación haya. Lo que cambió es que las treinta y seis filas se documentan ahora en una sola `02-Especificacion-Funcional`, plana, y no repartidas en cuatro carpetas de proyecto.

La categoría de especificación funcional puede desdoblar o reagrupar, siempre que conserve la trazabilidad a la necesidad de origen y **no reutilice un identificador ya asignado**. CU-34, CU-35 y CU-36 se agregaron al final de la numeración, sin renumerar los anteriores, justamente para no invalidar ninguna referencia ya emitida.

De las cuatro métricas de negocio, tres las adopta una necesidad como primer criterio —adopción del parque en NB-02, reemplazo del método manual en NB-04 y reproducibilidad en NB-03— y la cuarta, continuidad de la entrega, es transversal a las ocho y se verifica como regla de no-regresión acumulativa.

### §23.3 Los cuarenta y cuatro criterios de éxito

Ninguno usa fecha de calendario: los plazos se expresan en meses desde el cierre de una fase, anclados a un hito o declarados continuos, y ningún criterio se mide antes de que exista la capacidad que evalúa **[FA]**.

**NB-01**, ocho criterios: cobertura del parque en el registro, 5 de 5 conjuntos representados `[D]`; autosuficiencia de la consulta de dependencias, 0 archivos externos que abrir `[D]`; escala legible sin degradación, 30 nodos y 40 aristas medidos en PT-01; conservación de la disposición, 100 % de los proyectos tras recargar; estabilidad de la sesión, consumo estable sin crecimiento sostenido tras 15 minutos, con el número fijado por PT-01 al medir; previsibilidad del arranque leyendo el lienzo, 100 % de las dependencias con su clase —si obliga o no a esperar— distinguible sin abrir ninguna configuración; integridad ante un renombrado, 100 % de las relaciones declaradas siguen válidas tras renombrar cualquier elemento al que apunten; y señalamiento de la degradación, 5 de 5 condiciones advertidas y 0 operaciones bloqueadas.

**NB-02**, cinco criterios, ninguno derivado: adopción del parque, ≥ 6 de 8 contenedores; continuidad del servicio durante la incorporación, 0 interrupciones; fidelidad de la configuración importada, 6 de 6 dimensiones —imagen, red, dirección, montajes, dispositivos y variables—; salvaguardas de aislamiento activas, 5 de 5; y clasificación de las credenciales importadas, 0 incorporaciones completadas sin que el administrador haya clasificado cada variable.

**NB-03**, cinco criterios, ninguno derivado: reproducibilidad, 100 % de los proyectos con exportación de antigüedad menor a 7 días; fidelidad de la reimportación, 100 % conservando servicios, enlaces, direcciones, valores compartidos y disposición; ausencia de credenciales en la salida, 0 secretos en texto plano con el archivo de variables vacío; cobertura de la traducción sobre el parque real, 6 de 6 configuraciones del anexo E-20; y automatismo del respaldo, intervalo máximo de 7 días entre exportaciones programadas.

**NB-04**, seis criterios, ninguno derivado: reemplazo del método manual, ≥ 90 % de las altas nuevas; cobertura de las dimensiones del alta, 8 de 8; vías de alta soportadas, 4 de 4; autosuficiencia de la instanciación, 0 datos adicionales a los huecos que la plantilla declara y 0 archivos de configuración redactados a mano; fidelidad del conjunto instanciado, 100 % de los servicios y sus dependencias en una sola operación; y valor compartido declarado una sola vez, 0 copias que mantener sincronizadas a mano.

**NB-05**, cinco criterios, ninguno derivado: anticipación del conflicto, 100 % de los arranques con conflicto resueltos con informe previo en lugar de fallar en el motor; inmediatez del informe, ≤ 50 ms para un proyecto de hasta 30 servicios sin acceder al motor; resoluciones ofrecidas, 3 de 3; orden de arranque, 100 % de los arranques respetando el orden topológico de las dependencias marcadas como de espera, sin intervención manual; y gobierno del rango, 100 % de las direcciones fijas asignadas dentro del rango gestionado y registradas como reserva.

**NB-06**, cinco criterios, ninguno derivado: reemplazos por sesión de edición, una aplicación por lote en lugar de una por cambio; revisión previa obligatoria, 0 % de aplicaciones sin informe de impacto presentado antes; precisión del alcance, 0 servicios reemplazados que no figuraban en el informe; cambios de escalado con consecuencia declarada, 100 % presentados con su informe y rechazados antes de ejecutarse si exceden los recursos o duplican una dirección fija; y advertencia de la ventana de indisponibilidad, 0 aplicaciones que provoquen corte sin advertirlo antes de confirmar.

**NB-07**, cinco criterios, ninguno derivado: atribución de la presión de memoria, 100 % de los picos atribuibles a un servicio concreto; niveles de lectura, 3 de 3 capas; costo de observar con las pantallas cerradas, 0 recolecciones; frescura del estado, ≤ 5 s con la vista abierta y ≤ 30 s por reconciliación; y huella del propio administrador, memoria residente menor a 1 GB, en el orden de cientos de MB.

**NB-08**, cinco criterios, ninguno derivado: superficie accesible sin credencial, 0 pantallas y 0 operaciones; automatismos que conocen la credencial humana, 0; acotamiento de las credenciales de máquina, 0 % con permisos que excedan lo que su automatismo necesita; efecto de la revocación, 0 despliegues aceptados con una credencial revocada, con efecto en la primera petición posterior; y registro de las operaciones con consecuencias, 100 % de las escrituras registradas con actor, acción, entidad, detalle y resultado, con retención de 90 días.

**Las dos únicas derivaciones vigentes**, las dos en NB-01 y las dos pendientes de confirmación del agente humano **[FA]**: el target del 100 % de cobertura del parque, cuyo denominador de cinco conjuntos sí está verificado pero cuyo target no proviene de ninguna métrica declarada —la única métrica sobre el parque es la de adopción, fijada en 75 % sobre contenedores y no sobre conjuntos—; y el target de 0 archivos externos de la autosuficiencia de la consulta, derivado del dolor que §1 declara. La segunda mide el producto, no la documentación, y por eso no se retiró.

### §23.4 Decisiones de recorte del catálogo

Siete decisiones de partición, cada una con su argumento, que la regeneración debería conservar o refutar explícitamente en lugar de volver a decidir a ciegas **[FA]**:

| Decisión | Motivo |
|---|---|
| F-06, arranque y parada, va a NB-05 y no a NB-01 | El orden de arranque y el conflicto de direcciones se manifiestan en el mismo acto, con el mismo público y en el mismo momento de verificación. Separarlos habría creado una dependencia mutua entre NB-01 y NB-04 |
| F-09, escalado manual, va a NB-06 y no a NB-07 | Cambiar réplicas o límites es una edición de configuración que entra al changeset y provoca reemplazo de contenedor: comparte circuito de revisión, informe de impacto y ventana de indisponibilidad con el resto |
| NB-07 queda con una sola capacidad | Su dolor tiene público y métrica propios y no se funde con ningún otro. Es una necesidad legítimamente acotada, no un recorte excesivo |
| NB-03 agrupa F-13 y F-17, de prioridades distintas | Ambas responden al mismo dolor; la exportación es la mitigación y la programación es lo que la vuelve confiable. Toma la prioridad más alta |
| F-23 y F-24 van a NB-04, y juntas | Resuelven el mismo dolor de copiar y adaptar, aplicado a un dato en lugar de a una configuración entera. Se evaluaron y descartaron NB-01 y NB-06 como destinos |
| F-25 va a NB-01 y no abre necesidad propia | Mismo público y misma métrica que NB-01; presupone enteramente a NB-01; y una necesidad de una sola capacidad Could Have, estrictamente informativa, sería la más delgada del catálogo |
| NB-08 agrupa F-01, F-15 y F-16, de prioridades distintas | Las tres responden al mismo dolor: un panel que gobierna el equipo necesita control de acceso, y los automatismos no deben conocer la credencial del administrador |

**Una decisión de asignación que el agente humano revisó y que el analista sostuvo con mejor argumento** —conviene registrarla porque es la clase de razonamiento que una regeneración pierde—: la promesa de que renombrar no rompa lo que apunta al servicio se ubicó en NB-01 y no en NB-04. NB-04 promete que el alta deje de ser copiar y adaptar y que un valor compartido se declare una sola vez, y un renombrado que rompe referencias no toca ninguna de las dos. NB-01 promete que la arquitectura quede declarada y por lo tanto verificable: si renombrar rompe en silencio lo que apuntaba al servicio, esa declaración nunca fue tal, era una coincidencia de cadenas de caracteres que se sostenía mientras nadie tocara el nombre. El criterio aplicado fue **cuál promesa quedaría falsa sin ello**.

**Cómo se llegó de seis criterios derivados a dos.** El 2026-07-28 el agente humano se pronunció sobre los seis que el catálogo declaraba: dos siguen derivados y pendientes; el de estabilidad de la sesión dejó de serlo al adoptar el umbral cualitativo que el intake declara para PT-01, que es la puerta la que fija el número al medir; dos de NB-04 se **retiraron**, porque un porcentaje de adopción no es medible sobre un catálogo que arranca vacío y que el usuario puebla o no; y el de NB-05 se **reemplazó** por uno no derivado, porque miraba el lugar equivocado: lo verificable no es cuántas direcciones quedaron anotadas afuera sino que toda dirección asignada salga del rango gestionado y quede registrada como reserva.

**Extensión declarada del formato de la categoría.** La tabla de trazabilidad a casos de uso lleva una cuarta columna, `Proyecto de código`, además de las tres que fija la regla de la categoría. La extensión es deliberada y responde a una condición de esta solución: los casos de uso se generan por proyecto de código y la composición tiene cuatro, de modo que sin esa columna la categoría de especificación funcional no sabría a qué proyecto de código despachar cada caso. Si el orquestador prefiere el formato estricto de tres columnas, la información se reubica dentro de la celda de la CU sin pérdida.

### §23.5 Dolores específicos y responsabilidades por necesidad

Los dolores que cada necesidad declara resolver, uno por uno **[FA]**. Es el material del que la categoría de especificación funcional deriva los casos de uso, y la razón por la que cada uno existe: un caso de uso que no elimina uno de estos puntos no tiene necesidad que lo justifique.

| NB | Problemas específicos que resuelve |
|---|---|
| NB-01 | No existe inventario de qué conjuntos de servicios hay ni de qué se compone cada uno; la dependencia entre dos servicios no está declarada y se infiere leyendo variables de archivos separados; la configuración declarada y lo que el motor ejecuta pueden divergir sin que nada lo señale; la disposición mental que el operador tiene de su arquitectura no está registrada; mirando el dibujo no se puede anticipar en qué orden va a levantar el conjunto; los datos que sí están anotados viven fuera de todo sistema y no sobreviven a una reinstalación; renombrar cualquier elemento obliga a corregir a mano todo lo que lo nombraba y lo que se pase por alto se rompe en silencio; y el registro acumula restos con el uso sin que nada lo señale |
| NB-02 | Incorporar un servicio en uso exige recrearlo, con su ventana de indisponibilidad; la configuración real de un contenedor en ejecución sólo se conoce inspeccionándolo a mano, comando por comando; no hay forma de saber qué contenedores ya están gobernados por la solución, y uno mismo podría quedar asociado a dos conjuntos; hay contenedores que no deben gobernarse y hoy nada lo señala antes de intentarlo; y las variables de un contenedor en producción contienen credenciales que una importación ingenua dejaría legibles |
| NB-03 | No existe ninguna representación de la arquitectura fuera del propio servidor; la reconstrucción tras una reinstalación no está documentada y depende de la memoria de una sola persona; los archivos que describen partes de la configuración no están versionados y contienen credenciales, de modo que no sirven de respaldo; la disposición con la que el operador lee su arquitectura se perdería en cualquier reconstrucción; y el respaldo depende de una acción manual que nadie garantiza |
| NB-04 | Cada alta parte de la configuración de otro servicio y arrastra decisiones que ya no corresponden; las dimensiones que el parque real exige declarar no están en ningún formulario único; no hay forma de reutilizar la configuración de un servicio frecuente ni de un conjunto que suele ir junto, sin copiarla y editarla; un valor que comparten varios servicios se escribe una vez por servicio y se sincroniza a mano, sin que nada avise cuando una copia quedó vieja; llevar la configuración declarada a un contenedor corriendo es un paso manual y distinto según el origen de la imagen; y la construcción de una imagen propia ocurre fuera del alcance de todo registro |
| NB-05 | El orden correcto de arranque no está declarado y se recuerda de memoria, y no hay dónde asentar cuál dependencia obliga a esperar y cuál no; las direcciones fijas se anotan fuera del sistema y nadie sabe cuáles están ocupadas; el conflicto se descubre cuando el motor falla, con un mensaje que no identifica al ocupante ni ofrece salida; un arranque que falla a mitad deja el conjunto en un estado que nadie eligió y que no queda registrado; y al reasignar una dirección los servicios que la consumían quedan apuntando a un valor obsoleto sin que nada lo señale |
| NB-06 | Cada cambio de configuración provoca su propio reemplazo de contenedor y su propia ventana de indisponibilidad; no hay ningún momento en el que se declare, antes de ejecutar, qué servicios quedan afectados; un cambio hecho por error no se puede descartar antes de que produzca consecuencias; los ajustes de recursos y de réplicas se aplican sin mostrar su consecuencia sobre el resto del servidor ni sobre las direcciones reservadas; y ordenar visualmente la pantalla no debería tener consecuencias operativas, y hoy nada distingue un cambio visual de uno de configuración |
| NB-07 | No hay un lugar donde el estado del equipo, el de cada conjunto y el de cada contenedor se lean con la misma vista; la correspondencia entre un contenedor que consume recursos y el conjunto al que pertenece se hace de memoria; los servicios con dirección propia en la red local no se pueden observar preguntándoles directamente y no hay fuente de estado alternativa integrada; un contenedor detenido o eliminado por fuera seguiría figurando como activo; y toda observación agrega carga a un servidor que ya está al límite, sin una política declarada de cuánto puede costar mirar |
| NB-08 | Un panel con control total del equipo no puede quedar accesible sin credencial en la red local; no hay credencial de administrador establecida ni validada, y el primer arranque debe resolverla sin dejar una ventana abierta; un automatismo que necesita desplegar tendría que conocer la credencial humana, que abre el equipo entero; no hay forma de acotar lo que un automatismo puede hacer ni de retirarle el acceso sin afectar al administrador; y no queda registro de quién ejecutó una operación con consecuencias sobre el parque ni de cuál fue su resultado |

Responsabilidades, uniformes en las ocho necesidades **[FA]**: la propiedad del contenido es del analista de negocio; la implementación, del equipo de desarrollo de dos personas junto al agente de IA de codificación; la revisión y aprobación, **siempre** del agente humano del proyecto; y la consulta permanente, del product manager, que verifica la alineación con la visión y el alcance, y del analista funcional, que desarrolla los casos de uso que cada necesidad declara como previstos. Lo único que varía es quién valida como beneficiario: el **usuario final** en NB-01, NB-04, NB-05, NB-06 y NB-08 —en esta última junto al automatismo de integración continua— y el **propietario del servidor** en NB-02, NB-03 y NB-07, porque son las tres que tocan decisiones suyas sobre el parque, el respaldo y la capacidad del equipo.

## §24 Estado de decisiones, pendientes y especificaciones derivadas al cierre de la Fase A

Esta sección consolida los tres informes de revisión que el agente humano del proyecto recibió entre el cierre de la Fase A y la migración. Es el estado real de lo que quedó abierto, y es lo que evita que la regeneración vuelva a plantear preguntas ya respondidas o dé por cerradas las que no lo están.

### §24.1 Las dieciséis especificaciones derivadas y su estado de revisión

Las dieciséis `[D-i]` que §19 enumera están **aplicadas** en este documento y la cadena puede consumirlas. Su estado de revisión por el agente humano, al cierre de la Fase A, es el siguiente **[FA]**:

| Especificación | Estado de revisión |
|---|---|
| DI-01, gramática decidida por cantidad de segmentos | **Aprobada.** Es la sintaxis de la plataforma de referencia. La mitad que reservaba el nombre `shared` se dio de baja por absorción, no por descarte: D-8 la volvió innecesaria y RN-01 recuperó su enunciado original |
| DI-03, el escape `$${{` como único escape del modelo | **Aprobada** |
| DI-02, DI-04 a DI-16 | **Sin revisar.** Catorce especificaciones. No bloquean la generación, y por eso la cadena avanzó, pero se consumen declarándolas revisables y nunca como requisito cerrado del cliente |

Las catorce sin revisar, agrupadas por lo que deciden, para que la revisión sea abordable: **qué se guarda y cómo se encuentra** (DI-02 forma canónica de persistencia, DI-04 las dos formas del valor, DI-06 la forma concreta del vínculo, DI-13 la localización de referencias en dos pasos); **variables del sistema** (DI-05, prefijo, no secretas, y conservar sólo el host interno y el nombre del servicio); **comportamiento del grafo** (DI-08 que una compartida no contenga referencia, DI-15 que toda arista aporte referencia o espera con la propuesta del sistema, DI-16 el puerto como columna y la unicidad por índice parcial); **convivencia con Compose** (DI-07 en los dos sentidos con el escape del signo peso, DI-14 la importación del `depends_on`); **reglas y respuestas** (DI-09 momento de validación y códigos, DI-10 los códigos de la operación en lote, DI-11 el efecto sobre la versión de la API, DI-12 el hueco de parámetro que no anida dentro de una referencia).

Es la clase de material que conviene revisar antes de que la Fase C lo consuma como cerrado: una especificación de integración que resulta equivocada se reemplaza sin tocar la decisión que la originó, pero después de que tres categorías la derivaron el costo del cambio ya no es el mismo.

### §24.2 La matriz de navegadores, única pendiente que espera decisión

De las cinco pendientes que §19 registra, **cuatro se resuelven en la categoría que las necesita** —tres en experiencia de uso y una en el plan de sprint— y no requieren decisión antes de regenerar. La quinta sí: la matriz de navegadores de escritorio soportados, con su familia y su versión mínima. El intake declara hoy «navegador de escritorio con soporte de WebSockets **[S]**», que no alcanza para escribir un criterio verificable.

**Por qué pesa más que en una web común [FA].** Blazor Interactive Server mantiene toda la interfaz en el servidor y el navegador es una pantalla conectada por un circuito permanente: cada clic, cada arrastre de un nodo y cada tecla es un viaje de ida y vuelta. El navegador no afecta el aspecto: **afecta si la aplicación funciona**.

**Qué cambia el hecho de que el servicio corra en red local**, declarado por el agente humano el 2026-07-28. El riesgo tiene cinco componentes y la red local alcanza a uno y medio:

| Componente | ¿La red local lo resuelve? |
|---|---|
| Latencia del viaje | **Sí, en buena medida.** Es el componente que la observación elimina |
| Caída del transporte a sondeo largo | **Parcialmente.** Sigue ocurriendo si algo bloquea la actualización de protocolo, pero su costo es mucho menor sobre un trayecto ya corto |
| Suspensión de la pestaña en segundo plano | **No.** Es decisión del navegador sobre sus propias pestañas, y el uso previsto incluye dejar el panel abierto y volver a mirarlo |
| Capacidades gráficas del motor de renderizado para el lienzo | **No.** El dibujado ocurre enteramente en el navegador |
| Memoria del circuito en el servidor | **No.** PT-01 mide el consumo por circuito tras quince minutos de uso continuo |

El intake **ya asumía** la condición de red local: PT-01 mide sus umbrales «en red local» y el supuesto crítico está declarado en esos términos. La observación no elimina la necesidad de declarar la matriz: la reduce a las tres razones que quedan, que son todas de navegador y ninguna de red. A esas tres se suma una cuarta, de proceso: el intake exige que cada etapa cierre con un guion de demostración verificable, y un guion que dice «abrí el panel y arrastrá un nodo» sin declarar dónde admite dos ejecuciones con resultados distintos.

**Recomendación registrada y no aplicada [FA]:** declarar el navegador que el agente humano usa, con su versión mínima, y el resto como no soportado. Es coherente con que el intake ya declare que no hay soporte para Windows ni macOS, ni de ejecución ni de desarrollo, y no cierra ninguna puerta: agregar otra familia después cuesta ejecutar los guiones de demostración dos veces. Si la versión exacta no está a mano, alcanza con la familia, tomando como mínima la instalada al momento de declararlo.

**Qué desbloquea.** La categoría de experiencia de uso, que hoy no sabe contra qué diseñar; la de calidad y pruebas, que no puede escribir un criterio de compatibilidad de interfaz; y la de devops, que no puede derivar una verificación. **Es la única decisión de producto que conviene tomar antes de que la regeneración llegue a la Fase B de `SelfHosted-Web`.**

> **Resolución, 2026-07-28, aplicada en la versión 2.1.** El agente humano del proyecto declaró la matriz: **Google Chrome de escritorio, canal estable, versión mínima 150.0.7871.186**, en red local, con toda otra familia declarada no soportada. La evidencia es la salida de `chrome://version`, que además destapó un eje de plataforma que el intake no tenía declarado: el sistema operativo del equipo desde el que se opera el panel, que es **Windows Server 2022 21H2 build 20348.5256** y es distinto de los ejes de ejecución y de desarrollo, ambos Linux. Las dos filas viven desde esta versión en §17.1 P.9, con su criterio verificable: cada guion de demostración se ejecuta sobre Chrome estable igual o superior al piso, y el número de versión concreto se registra en el informe de cierre de la etapa (§15.1).
>
> El análisis de arriba se conserva íntegro porque **sigue siendo válido en lo que no depende de la decisión**: los tres componentes del riesgo que la tabla marca como no resueltos —suspensión de la pestaña, capacidades gráficas del motor de renderizado y memoria del circuito— no los elimina ni la red local ni la elección de familia, y siguen siendo materia de PT-01 y de `08-Calidad-Y-Pruebas`. Lo que cambió es que dejaron de ser una brecha de matriz para pasar a ser riesgos abiertos con su medición asignada. El título de esta sección conserva su redacción original porque de él se deriva el ancla que otras secciones citan.

### §24.3 Los tres objetos declarados y no diseñados

La quinta pasada declaró el principio de identidad de objeto (D-12) pero **no diseñó el esquema**, deliberadamente: el modelo lógico y su mapeo relacional son materia de la categoría de arquitectura técnica, con el modelo de dominio completo delante. Quedan tres objetos declarados y sin diseñar, cada uno con su fundamento escrito **[FA]**:

| Objeto | Por qué es objeto | Qué falta decidir |
|---|---|---|
| Secreto | Se comparte entre servicios, se rota y tiene historia. Hoy se referencia como una cadena de texto, sin entidad propia | Si es entidad propia, si lleva versión para la rotación, cómo migra la forma actual y qué pasa con las exportaciones |
| Red del proyecto | La comparten todos los servicios del proyecto, se crea antes que los contenedores y sobrevive a ellos. Hoy vive como bloque JSON dentro del proyecto | Su modelado y su relación con las reservas de dirección |
| Volumen o directorio al que apunta un montaje | Sobrevive al servicio: la invariante I6 lo declara, RN-09 lo protege al detener y RN-10 ofrece conservarlo al eliminar. Hoy el modelo sólo guarda su nombre dentro del JSON del montaje | Si es entidad propia, cómo se adoptan los huérfanos, su relación con el montaje que lo declara, y qué pasa con los montajes de directorio, que no son volúmenes del motor |

El tercero apareció al aplicar la prueba que separa objeto de atributo, y es un hallazgo real: hoy un volumen conservado tras eliminar su servicio **queda en el motor sin ninguna entidad que lo represente**, o sea que el producto pierde de vista un recurso que él mismo decidió preservar.

**Precaución para los subagentes de la Fase C:** los tres son trabajo propio, no dato ya resuelto. Reciben la prueba con la que decidir, no la decisión.

### §24.4 Precauciones y hallazgos que la Fase A deja asentados

**Dos precauciones que el auditor independiente dejó para los subagentes de la Fase B [FA]**, y que la regeneración debería adoptar tal cual: que consuman las dieciséis especificaciones derivadas **declarándolas revisables** y no como requisito cerrado del agente humano; y que **declaren como brecha cada pendiente en lugar de resolverla por su cuenta**, que es el error que esta cadena tuvo que corregir tres veces.

**Lectura de aptitud del intake, emitida al cerrar la Fase A [FA]:** las doce categorías tienen su insumo transcripto, las reglas de negocio llevan momento de validación, respuesta y caso concreto, y el esquema quedó verificado restricción por restricción. El orden de generación arranca por la capa `Domain`, nivel 0 del orden de capas de §13.

**Un hallazgo de archivado que la migración conserva como registro [FA].** Durante la Fase A se perdió el cuerpo de la versión 1.0 del README de `01-Necesidades-Negocio`: se archivó sin sufijo de versión y la copia de la ronda siguiente pisó a la anterior. El alcance real es acotado, porque el control de cambios nunca se reescribió y conserva las filas de esa versión, de modo que el registro de qué pasó está completo; lo que se perdió es el cuerpo, cuya diferencia con la versión siguiente eran dos secciones. **Es exactamente el modo de falla que la reformulación de D4 y D5 del conjunto 4.0 elimina por construcción**: el archivo vivo no lleva sufijo y la copia archivada sí, de modo que dos archivados del mismo día no pueden pisarse. Se registra acá porque explica por qué la regla nueva existe, y porque el árbol de `SDD/Docs/` que el orquestador va a archivar arrastra esa pérdida.

**Cinco pendientes cerradas durante la Fase A, que no deben reabrirse [FA]:** los casos límite CL-04 y CL-15, cerrados por D-1 y D-2; el supuesto IC-05, cerrado por D-3 sin cambio de reglas; y las dos de instanciación, cerradas en la quinta pasada de formas distintas —la de la clave de variable compartida **desapareció por modelo**, porque la identidad de objeto le quitó a la clave el papel de identificar, y la del nombre de servicio **se resolvió con una regla**, sufijo automático más aviso—. Sus resoluciones están en el cuerpo de este documento y en el catálogo de reglas del anexo [E-16](#2016--e-16--catálogo-de-reglas-de-negocio-rn-01-a-rn-37).

---

## §19 Checklist de completitud del intake

Negocio (Parte A):

- [x] La cabecera tiene nombre de solución, cliente, fecha y estado.
- [x] §1 describe un problema concreto y qué pasa si no se construye.
- [x] §2 tiene al menos un stakeholder por categoría con rol explícito: propietario, implementador y beneficiario.
- [x] §4 tiene al menos un ítem en cada categoría MoSCoW y el Must Have es el Alcance 1, que es el mínimo razonable. Las capacidades F-23 y F-24, incorporadas el 2026-07-28 por D-5 y D-6, son Should Have; su asignación a un alcance y a un corte vertical figura entre lo abierto.
- [x] §5 tiene 10 historias en formato `Como/quiero/para`, cubriendo 2 roles: administrador y automatismo.
- [x] §7 lista 15 casos límite, **todos con respuesta**: los dos que quedaban abiertos, CL-04 y CL-15, se resolvieron el 2026-07-28 por las decisiones D-1 y D-2, y CL-01 quedó confirmado sin cambios por D-4.
- [x] §8 tiene 4 métricas de negocio con target y plazo numéricos. **Marcadas [S] S-01, confirmadas el 2026-07-27 por el agente humano del proyecto.**
- [x] §9 lista 7 exclusiones con justificación.
- [x] §10 declara "sin fecha" justificado y la naturaleza de la restricción económica; no hay presupuesto monetario asignado.
- [x] §11 lista 10 riesgos con probabilidad, impacto y mitigación.
- [x] §12 define 35 términos del dominio, uno de ellos declarado como término retirado.

Composición (Parte B):

- [x] §13 enumera el proyecto de código de la solución —**uno solo desde la versión 2.2**, `SelfHosted-Service` / `SelfHosted.Service.Core`—, con su valor D8 `web-monolith`, señalado como principal. El grafo de dependencias entre proyectos de código es trivial y por lo tanto acíclico: un nodo, sin aristas. Las cuatro capas conservan su grafo acíclico de cuatro niveles como espacios de nombres, declarado en la segunda tabla de §13.
- [x] §13 declara el perfil de convención de nombres; no hay colisión de nombres de proyecto de código ni de nombres de código.
- [x] §14 describe la composición y los contratos entre proyectos de código, coherentes con las aristas de §13.
- [x] §15 garantiza valor demostrable end-to-end en el primer sprint a través de la jerarquía, con corte vertical obligatorio.
- [x] §16 publica el árbol derivado de la jerarquía y de la convención de nombres, con §16.1.

Técnica por proyecto de código (Parte C):

- [x] §17 está completo para el proyecto de código de §13 —uno solo desde la versión 2.2—: identidad, tabla de los cuatro espacios de nombres internos, y P.1 a P.12 consolidadas, con el detalle por capa preservado dentro de cada P.x.
- [x] Cada proyecto de código: P.6 declara cobertura mínima numérica de líneas y de ramas; P.7 adopta SemVer 2.0.0 y Conventional Commits; P.8 enumera quality gates bloqueantes; P.9 declara plataformas y versiones mínimas; P.10 expresa NFR con métricas numéricas. **Los umbrales marcados [S] S-02, S-03 y S-04 fueron confirmados el 2026-07-27 por el agente humano del proyecto.**

Anexos de datos (Parte D):

- [x] Los veintidós identificadores E-1 a E-22 citados en el cuerpo tienen su contenido completo en §20, y ningún escenario de §20 queda huérfano.
- [x] Los anexos derivados de un sistema real declaran su procedencia y la política de ofuscación aplicada, y no contienen ningún secreto, hostname, dominio, ruta de usuario ni hallazgo de seguridad del servidor de referencia. Este documento es público. E-19 y E-20 declaran estado `medido`, con su fecha de relevamiento; E-21 y E-22, `derivado`, con la regla de cálculo declarada.
- [x] Los insumos de maquetado (mapa de navegación, disposición de pantallas, anatomía del nodo, dashboard, lenguaje visual de estados y juego de datos de maqueta) están transcriptos en E-18 y E-19, de modo que `03-UX-UI-DX` y `SDD/Maquetas/SelfHosted-Service/` pueden generarse sin abrir las fuentes.
- [x] Los insumos de generación de pruebas (reglas RN-01 a RN-37 con momento de validación y respuesta, invariantes I1 a I10, máquina de estados, contratos de la API y esquema de datos) están transcriptos en E-16, E-17, E-15, E-9 y §17.4 P.2.
- [x] Ningún dato del intake se respalda únicamente en una referencia a un archivo externo: todo lo citado está transcripto. Alcanza también a la cuarta fuente incorporada el 2026-07-28, `Analisis-Rayway.md`, cuyas **cuatro** secciones declaradas en la tabla de procedencia están transcriptas: la definición de la entidad plantilla y la enumeración del menú de creación de servicio (§3.2) en §4 y en E-6; la sintaxis de las referencias entre variables (§3.5) en E-4; las invariantes del modelo (§3.6) en §17.4 P.2, con la correspondencia de cuál se adoptó, cuál se adaptó y cuál se descartó; y el momento de resolución (§7) en E-4. Cada una con su sección de origen citada.
- [x] Cada escenario de §20 declara procedencia (archivo y líneas) y estado.
- [x] Cada escenario de §20 declara sus cuatro bloques: **contexto**, **qué ejercita**, la carga completa y **qué verificar**. Los cuatro se emiten contiguos al encabezado del anexo, con la divergencia de orden declarada en el preámbulo de la Parte D y su motivo: varios anexos contienen más de una carga y un bloque de verificación al final quedaría ambiguo respecto de a cuál se refiere.
- [x] El `Estado` de cada escenario pertenece al enum cerrado `medido` / `declarado` / `derivado` / `reconstruido`, con la tabla de conversión desde los estados anteriores publicada en el preámbulo de la Parte D.
- [x] Los valores de instancia sintéticos —identificadores, marcas de tiempo y direcciones concretas de E-1 a E-18— están declarados como `reconstruido` en el preámbulo de la Parte D, y ninguno se presenta como medición.

Navegabilidad:

- [x] El documento emite su tabla de contenido inmediatamente después de la cabecera, con las secciones de primer y segundo nivel y con los veintidós escenarios de la Parte D listados por identificador.

Continuidad de la Fase A (Parte E, propia de esta solución):

- [x] La Parte E transcribe los resultados citables de los quince documentos que la Fase A generó bajo el conjunto normativo anterior, con todos sus identificadores emitidos, y declara que son insumo de la regeneración y no su resultado.
- [x] Todo su contenido está marcado `[FA]`, y los puntos donde el agente humano del proyecto sí se pronunció están señalados como tales.
- [x] §24 declara qué quedó abierto al cierre de la Fase A: las catorce especificaciones de integración sin revisar, la matriz de navegadores —**cerrada el 2026-07-28 y aplicada en la versión 2.1**, con su resolución registrada en §24.2— y los tres objetos declarados y no diseñados que la Fase C recibe como trabajo propio.

General:

- [x] No hay vocabulario del dominio fuente del bootstrap del framework ni stacks hardcodeados en texto normativo (D7).
- [x] El control de cambios refleja la versión y la fecha del documento.

**Estado de la validación del orquestador.** Este intake no fue completado por el cliente sino integrado desde tres documentos de análisis y requerimientos. Los ítems marcados **[S]** —los seis supuestos S-01 a S-06— eran valores propuestos, no declarados por el cliente. El orquestador los presentó en su batería de validación de intake el 2026-07-27 y el agente humano del proyecto los resolvió: cuatro confirmados sin cambios, uno resuelto con evidencia verificable y uno cerrado por identificación de rol. El detalle por supuesto vive en la tabla de la sección «Supuestos registrados por este intake y su estado». Ninguno de ellos bloqueaba la derivación del manifiesto desde §13, que se apoya exclusivamente en datos verificados.

**Lo que se cerró el 2026-07-28.** Tres de las cuatro pendientes que la versión 1.1 registraba dejaron de serlo, por las decisiones del agente humano del proyecto listadas en la sección «Decisiones del agente humano incorporadas en la versión 1.2»:

| Pendiente cerrada | Cómo se cerró |
|---|---|
| CL-04: comportamiento ante caída del circuito de la interfaz con un despliegue en curso | **D-1.** El resultado se determina por contenedor, no por operación; el despliegue vive del lado del servidor y un despliegue parcial es un estado legítimo. Formalizado en RN-31 |
| CL-15: secreto en una variable cuyo nombre no coincide con la heurística de sensibilidad (caso C-2 del anexo E-20) | **D-2.** El secreto se declara, no se infiere: la heurística sugiere y el paso de clasificación de variables, obligatorio, decide. Formalizado en RN-29, RA-05 y RA-06, con su caso de prueba T-32 |
| IC-05: confirmación de que la verificación pendiente es que el contenedor no esté ya adoptado por otro proyecto, formalizada en I10 | **D-3.** Cerrado sin cambios de modelo: I10 y RN-11 ya lo resolvían, y lo que faltaba era el fundamento, ahora declarado en §17.4 P.11 |

**Lo que la quinta pasada cerró.** Las dos pendientes de instanciación **desaparecieron por modelo, no por regla**, que es lo que el principio de identidad de objeto (D-12) venía a lograr:

| Pendiente cerrada | Cómo se cerró |
|---|---|
| Qué hace la instanciación cuando la plantilla declara una **variable compartida cuya clave ya existe** | **Desaparece.** Con la consecuencia 3 de D-12, la clave de una compartida no exige unicidad: la plantilla crea su propio objeto y no hay colisión posible. No queda nada que elegir entre rechazar, sufijar o reusar. Lo que queda es la **advertencia** de RN-37 cuando además los valores coinciden |
| Qué hace la instanciación cuando el **nombre de un servicio ya existe** | **Sufijo automático más aviso** (RN-36). La unicidad del nombre se conserva porque cumple una función —es el alias DNS que el motor resuelve—, pero como la identidad ya es el identificador, sufijar no rompe ninguna referencia y renombrar después es gratis. **Se evaluó y descartó** generar un alias distinto del nombre visible: produciría divergencia entre lo que el lienzo muestra y lo que el motor resuelve, y este producto es para un administrador que además mira su servidor por fuera de la aplicación |

**Lo que sigue abierto.** Cinco pendientes, ninguna bloqueante para la generación pero todas con consumidor downstream identificado. Cinco de ellas se abrieron el 2026-07-28 al resolver los puntos de diseño de D-5, D-6 y D-7: son decisiones que las siete no cubren, que cambian el comportamiento observable del producto y que por lo tanto este intake **no toma**.

**Actualización de la versión 2.1, 2026-07-29.** De esas cinco, la **matriz de navegadores ya no está abierta**: el agente humano del proyecto la cerró el 2026-07-28 y §17.1 P.9 la declara desde esta versión. Quedan **cuatro** pendientes abiertas, todas resolubles en la categoría que las necesita. La fila de la matriz se conserva en la tabla de abajo con su estado actualizado, en lugar de borrarse, porque otras secciones la citan y porque el registro de que existió como pendiente es parte de la trazabilidad de la decisión.

Este documento lleva **tres registros de cosas sin cerrar, con alcances distintos**, y no hay que confundirlos:

| Registro | Qué enumera | Dónde vive |
|---|---|---|
| Supuestos `[S]` | Valores que **faltaban** en las fuentes y que el intake propuso. Seis numerados, todos resueltos el 2026-07-27, más dos sin número, de los cuales queda uno abierto | Sección «Supuestos registrados por este intake y su estado» |
| Pendientes de decisión | Decisiones de producto que **nadie tomó** y que este intake deliberadamente no toma. Cinco | La tabla que sigue |
| Especificaciones de integración `[D-i]` | Decisiones que el orquestador **sí tomó** al integrar, para hacer operables las siete del agente humano, y que están aplicadas pero pendientes de confirmación. Dieciséis | La tabla del final de esta sección |

Los tres registros clasifican por **origen**, no por ítem, y hay una superposición declarada: la matriz de navegadores figura en los dos primeros, porque era a la vez un supuesto `[S]` que el intake nunca cerró y una decisión de producto que nadie había tomado. Es la única superposición; el registro de especificaciones de integración no comparte ningún ítem con los otros dos. Desde la versión 2.1 ese ítem está cerrado en los dos registros por la misma decisión, que es lo coherente con que fuera el mismo ítem visto desde dos orígenes.

Un artefacto downstream debe tratarlos distinto. Un supuesto resuelto es dato cerrado y se cita por su fila de estado. Una pendiente de decisión bloquea la especificación del caso de uso que la necesita, y hay que detenerse en lugar de elegir por el cliente. Un `[D-i]` está aplicado y la cadena puede consumirlo, pero se usa declarándolo revisable.

| Pendiente | Dónde vive | Qué condiciona |
|---|---|---|
| Matriz de navegadores de escritorio soportados, con familias y versiones mínimas · **cerrada el 2026-07-28 y aplicada en la versión 2.1**, ver [§24.2](#242-la-matriz-de-navegadores-única-pendiente-que-espera-decisión) | §17.1 P.9 | `03-UX-UI-DX`, `Compatibilidad-Plataformas` de `00-Contexto`, `08-Calidad-Y-Pruebas` y `09-Devops` ya tienen contra qué escribir sus criterios: Chrome estable ≥ 150.0.7871.186 sobre Windows Server 2022 21H2, en red local. Deja de ser brecha |
| Asignación de F-23 (variables compartidas), F-24 (referencias entre variables) y F-25 (higiene del modelo) a un alcance y a un corte vertical concreto | §4 y §15 | `07-Plan-Sprint`. Los diez cortes verticales del Alcance 1 están declarados de forma cerrada **[E]** y ninguna de las dos figura entre ellos; ubicarlas exige decidir si abren un corte propio o se suman a uno existente |
| Si la interfaz detecta y señala un **literal que duplica un valor provisto** —y con qué forma— | E-4 punto 2 y RN-33 | `03-UX-UI-DX` y `02-Especificacion-Funcional`. Un literal que iguala el `SELFHOSTED_HOST` o el `SELFHOSTED_SERVICE_NAME` de un servicio del proyecto queda obsoleto en silencio al renombrarlo, mientras la referencia equivalente sigue al cambio (RN-33). El modelo no puede prohibir los literales, de modo que la única salida es que la interfaz lo detecte y sugiera; si la sugerencia existe, cuándo aparece —al escribir, al renombrar, o en las dos— y si es bloqueante o descartable, no está decidido. La cadena lo va a encontrar al especificar el renombrado |
| Distinción visual entre las aristas que **declaran espera** y las que no | E-18 | `03-UX-UI-DX` y `SDD/Maquetas/SelfHosted-Service/`. E-18 declara el lenguaje visual de los **estados del nodo** pero no uno de aristas, y el violeta está reservado a "pendiente de aplicar". Desde D-11 la distinción con consecuencia observable ya no es entre referencia de red y de dato sino entre **esperar y no esperar**: es lo que determina el orden de arranque, es una propiedad que el usuario cambia, y un usuario que no pueda verla en el dibujo no puede prever ni auditar el orden. Alcanza también a la arista sin variable, que sólo existe por su espera y que hoy no tiene forma declarada de representarse |
| Maquetado del paso de clasificación de variables de la adopción y de la pantalla de variables compartidas del proyecto | E-18 | `03-UX-UI-DX`. Las dos pantallas son obligatorias por RN-29 y por F-23, y E-18 no declara ninguna de las dos: el mapa de navegación tampoco tiene ruta para las variables del proyecto |

**Especificaciones de integración pendientes de confirmación (marcador `[D-i]`).** Dieciséis puntos que el orquestador resolvió al integrar las siete decisiones, porque sin ellos las decisiones no eran implementables. **Están aplicados en este documento y la cadena puede consumirlos**, pero no los decidió el agente humano del proyecto: son propuesta del integrador y deben declararse revisables aguas abajo. La convención `[D-i]` está definida en la sección «Procedencia de este intake y convención de marcadores», y el reparto de autoría frente a cada decisión está en «Qué decidió el agente humano y qué derivó el integrador».

| # | Especificación de integración | Decisión que la origina | Dónde vive |
|---|---|---|---|
| DI-01 | Que la gramática se decida por **cantidad de segmentos** —uno es propia, `shared.` sin vínculo es compartida, un segmento vinculado es un servicio— | D-6 | E-4 |
| DI-02 | La forma canónica de persistencia de la expresión de referencia | D-6 | E-4, E-9 |
| DI-03 | El escape `$${{` para un `${{` literal, y que sea el único escape del modelo | D-6 | E-4, E-16 (RN-25, RN-26), E-22 (T-47, T-48) |
| DI-04 | Que se persistan **las dos formas** del valor: la expresión sin resolver como fuente de verdad y el último valor resuelto como materialización | D-6 | E-4, E-9 |
| DI-05 | El **prefijo `SELFHOSTED_` en inglés** y que ninguna clave provista sea secreta; el descarte de exponer el modo de red; y, de la evaluación que pidió D-9, **conservar `SELFHOSTED_SERVICE_NAME` y eliminar `SELFHOSTED_PROJECT_NAME`** | D-6, D-9 | E-4, E-16 (RN-32), E-22 (T-38) |
| DI-06 | La **forma concreta del vínculo al servicio**: persistir la expresión vinculada con el identificador del destino y renderizar el nombre, en lugar de persistir el nombre y reescribirlo al renombrar | D-8 | E-4, E-9, E-14, E-16 (RN-33), E-22 (T-51, T-55) |
| DI-07 | RN-25 y RN-26 completas: la convivencia con la expansión de Compose en los dos sentidos, incluido el escape del `$` literal al exportar y su desescapado al importar | D-6 | E-4, E-14, E-16, E-21, E-22 (T-39, T-40, T-47, T-48) |
| DI-08 | Que una variable compartida del proyecto **no pueda contener una referencia**, con su argumento, y el acotamiento de la resolución a dos niveles que se deriva de ello | D-5, D-6 | E-4, E-9, E-16 (RN-22) |
| DI-09 | **De RN-21 y RN-29, sólo su exigibilidad**: el momento de validación, el `422` y la enumeración de causas. Sus enunciados son contenido de D-6 y D-2 y van marcados `[D]` dentro de la propia regla. Completas sí: RN-22 (ciclos de valor), RN-23 (propagación del carácter de secreto), RN-27 (bloqueo del borrado con referencias vigentes) y RN-28 (unicidad de la clave compartida) | D-2, D-5, D-6 | E-16, E-22 (T-34 a T-37, T-41, T-42, T-52) |
| DI-10 | La política de códigos de respuesta de la operación en lote —`202`/`200`, el fallo parcial que no es error de la operación, el `5xx` reservado— y el campo `serviciosNoAlcanzados` | D-1 | E-13 |
| DI-11 | El corolario de versionado de `/api/v1` que se deriva del cambio de contrato del endpoint de adopción | D-2 | E-15 |
| DI-12 | Que un **hueco de parámetro `{{ … }}` no pueda aparecer dentro de una expresión de referencia `${{ … }}`**, con el `idLocal` de los servicios de una plantilla como forma de sostener la parametrización del nombre sin anidar, y el orden de resolución por etapas | D-6, D-7 | E-6, E-22 (T-43) |
| DI-13 | El **mecanismo de localización de las referencias en dos pasos** —índice parcial `ix_variables_con_referencia` para acotar el conjunto, más parseo de las ocurrencias— en lugar de una tabla de ocurrencias o de una búsqueda por `LIKE` | D-5, D-6 | E-9, E-4, E-5, §17.4 P.11 |
| DI-14 | Cómo se importa un `depends_on`: **reexpresión** de la variable que ya lleva el host del destino cuando existe, y **arista sin variable con espera declarada** cuando no existe ninguna. Con el descarte razonado de crear una variable, que inyectaría en el contenedor una que el archivo no tenía | D-6, D-11 | E-21, E-16 (RN-26, RN-34), E-22 (T-40, T-54) |
| DI-15 | RN-34 completa: que toda arista deba aportar una referencia o una espera, que el sistema **proponga** la espera al crear la arista según si apunta al host, y que no haya más de una arista de espera sin variable entre dos servicios | D-11 | E-16, E-9, E-22 (T-56, T-57) |
| DI-16 | Que el **puerto de la arista** se persista como columna `puerto_destino` y que la unicidad de la arista de espera sin variable se haga cumplir con un índice único parcial, porque la clave única de la tabla no alcanza con columnas nulas | D-10, D-11 | E-9, E-1, E-4 |

**Renumeración de esta tabla, 2026-07-28.** Se renumeró dos veces en el mismo día y conviene declarar las dos, porque artefactos aguas abajo podrían citarla. **Segunda pasada sobre D-6:** desaparecieron la vieja DI-01 —identificadores propios de sintaxis— y la vieja DI-05 —arista única con dos orígenes—, y entraron el prefijo `SELFHOSTED_` y el predicado de referencia de red. **Tercera pasada:** se da de baja la mitad de DI-01 que reservaba el nombre `shared`, porque D-8 la volvió innecesaria, y se da de baja entera la DI-06 de entonces —«sólo las referencias de red ordenan el arranque»—, porque D-11 la reemplazó por una propiedad declarada. Entran tres: DI-06 con la forma del vínculo (D-8), y DI-15 y DI-16 con la exigibilidad de la espera y el registro del puerto (D-10 y D-11); DI-05 y DI-14 cambian de contenido sin cambiar de número. La aritmética cierra: catorce entradas, menos la vieja DI-06, más tres, son dieciséis. El resto conserva contenido y número.

Tres notas sobre esta tabla. Ninguna de las dieciséis contradice la decisión que la origina: son las formas concretas que faltaban. Ninguna es un supuesto `[S]`: no cubren información faltante en las fuentes sino detalles que una decisión tomada no fija. Y si el agente humano prefiere otra forma para cualquiera de ellas, se reemplaza la especificación sin tocar la decisión ni reabrir el caso límite que la originó.

**Estado de revisión, incorporado en la versión 2.0.** Dos de las dieciséis fueron revisadas y aprobadas por el agente humano del proyecto al cierre de la Fase A —DI-01 y DI-03— y las catorce restantes siguen sin revisar. El detalle, con las catorce agrupadas por lo que deciden para que la revisión sea abordable, está en [§24.1](#241-las-dieciséis-especificaciones-derivadas-y-su-estado-de-revisión).

**Observaciones de auditoría aceptadas y deliberadamente no aplicadas.** Las auditorías de coherencia registradas en `SDD/Docs/Audit/Intake-v1.2-Coherencia-v1.0.md` levantaron señalamientos que este documento **no** corrige, y el motivo se registra acá para que la decisión quede en la cadena y no haya que reconstruirla:

| Señalamiento | Qué observa | Por qué no se aplica |
|---|---|---|
| P2-15 | El campo «Intake (origen)» del manifiesto apuntaba a un archivo inexistente | **Queda fuera del alcance de este documento.** El manifiesto es otro artefacto y la corrección tenía restricción explícita de no tocar nada fuera del intake. Se resolvió por fuera, regenerando el manifiesto como v1.2 con la declaración de que §13 no cambió |
| P2-4 | El recuento de entradas de control de cambios | **Sin objeto dentro del intake.** El recuento nunca se declaró en este documento: era una cifra del informe del integrador al orquestador. No hay nada que corregir acá |
| P3-1 | §19 está ubicada después de §20 y §21, con la numeración fuera de orden | **Es de orden, no de contenido, y moverla rompería anclas.** Las secciones se citan por ancla generada del título en todo el documento y desde artefactos que ya lo están leyendo; reubicarla invalidaría esos enlaces por un defecto que no afecta ningún dato. Se reevalúa si alguna vez se abre una versión 1.3 por otro motivo |
| Títulos de los anexos de la Parte D | Los títulos de los veintidós anexos usan «proyecto» sin calificar —«E-1 · Proyecto con layout de lienzo», «E-10 · Alta de proyecto…», «E-14 · Exportación de un proyecto…»—, y la cuarta pasada no los cambió | **Por la misma razón que el título de E-4, y con el mismo precedente.** De cada título se deriva el ancla con la que todo el documento cita el anexo, y son las únicas veintidós anclas del intake. La ambigüedad ahí es baja: la Parte D describe íntegramente el producto y el sentido de composición no aparece en ella. La calificación se aplicó en la **primera línea de prosa** de los anexos afectados, que es donde el lector la necesita. Se reevalúa si alguna vez se abre una versión 1.3 |
| Título de E-4 | El título del anexo E-4 conserva la expresión «variable generada», que la segunda pasada sobre D-6 dejó sin uso: lo que el enlace produce hoy es una referencia | **Por consistencia del criterio, no por costo.** El criterio de no romper anclas ya se aplicó y se registró acá para la ubicación de §19; cambiar el título de E-4 mientras se conserva §19 por el mismo motivo sería incoherente, y la consistencia del criterio vale más que la elección concreta. Para que no quede como deuda silenciosa se tomaron dos medidas: el anexo abre con una nota que declara la discrepancia, y «Variable generada» figura en §12 como término retirado, con remisión a «Referencia de variable». Se reevalúa junto con las otras dos observaciones de orden si alguna vez se abre una versión 1.3 |
| P3-1, títulos de la Parte D y título de E-4 · **revisadas en la versión 2.0** | Las tres remitían su reevaluación a la apertura de una versión 1.3, que nunca ocurrió: la versión que se abrió fue la 2.0, por la migración al conjunto normativo 4.0 | **Se reevaluaron y se sostienen las tres.** El criterio que las sostenía no cambió y la migración lo refuerza: de los títulos de la Parte D se derivan las veintidós anclas en uso, y la versión 2.0 agrega la tabla de contenido, que las cita a todas. Mover §19 o retitular un anexo ahora rompería además el índice recién emitido. La decisión está declarada en la sección «Migración al Framework SDD 4.0» |
| P3-2 | E-18 conserva dos emojis, contra el invariante de estilo | **Corregirlo falsearía una transcripción.** Las dos ocurrencias están dentro de los maquetados en arte ASCII que E-18 transcribe **[E]** de `Analisis-Final-Integrado.md`; editarlas haría que el anexo dejara de reproducir su fuente, que es lo que la regla de autocontención exige que haga. El invariante de estilo alcanza a la prosa del intake, no al contenido transcripto |

---

## Trazabilidad downstream

| Sección del intake | Destino | Documento downstream típico |
|---|---|---|
| §1 a §12 (negocio) | `00-Contexto/`, `01-Necesidades-Negocio/` | Visión, alcance, roadmap por alcances 1 a 4, NB-XX |
| §4 MoSCoW y §5 historias | `01-Necesidades-Negocio/`, `02-Especificacion-Funcional/` | NB-XX, CU-XX |
| §7 casos límite y §11 riesgos | `02-Especificacion-Funcional/`, `05-Arquitectura-Tecnica/` | CU alternativos, ADR de mitigación |
| §13 (proyectos de código) | `SOLUTION-MANIFEST` derivado; todas las categorías por proyecto de código | Manifiesto canónico; selector de variantes D8 |
| §14 estilo de solución | `05-Arquitectura-Tecnica/` | Arquitectura de las cuatro capas y su grafo de dependencias. **No hay vista de solución**: con un único proyecto de código, `Master-Prompt.md` §3.5 omite `Solucion/` |
| §15 y §15.1 delivery | `07-Plan-Sprint/` | Plan de sprint por etapas, con el informe de cierre como definición de terminado |
| §16 estructura | `05-Arquitectura-Tecnica/`, `11-Documentacion/` | Árbol de la solución, README de carpeta |
| §17.P.x del proyecto de código | `05`, `08`, `09`, `00` | ADR (DA-01 a DA-08), estrategia de testing con sus cuatro umbrales por espacio de nombres y el test de arquitectura, pipeline, NFR |
| §17.1 P.5 y §17.3 P.5 | `05-Arquitectura-Tecnica/` e Infrastructure | ADR de autenticación, ADR de salvaguardas de aislamiento del host |
| §18 samples y puertas técnicas | `10-Examples/` | Ejemplo-XX; SM-01 y SM-02 son las materializaciones de PT-01 y PT-02 |
| **Lectura inversa de esta tabla** | Además de declarar qué documento deriva de qué sección, esta tabla es el **índice de propagación**: cuando un enunciado de una sección cambia de forma —no sólo de contenido—, indica qué artefactos hay que revisar para que sus réplicas queden alineadas. Es la contramedida de la cuarta disciplina de barrido, y su necesidad crece con la cantidad de artefactos | Todas las categorías |
| §20 y §21 anexos de datos | `02-Especificacion-Funcional/`, `10-Examples/`, `SDD/Maquetas/SelfHosted-Service/` | Modelo conceptual con ejemplos, fixtures de prueba, datos de maqueta |
| E-15 superficie de la API | `02-Especificacion-Funcional/` y `05-Arquitectura-Tecnica/` | CU por recurso, contrato OpenAPI |
| E-16 reglas RN-01 a RN-37 | `02-Especificacion-Funcional/` y `08-Calidad-Y-Pruebas/` | RN-XX y casos de prueba, uno por regla |
| E-17 ciclo de vida del despliegue | `02-Especificacion-Funcional/`, `05-Arquitectura-Tecnica/`, `08-Calidad-Y-Pruebas/` | Modelo de estados, pruebas del sincronizador |
| E-18 maquetado de la interfaz | `03-UX-UI-DX/` y `SDD/Maquetas/SelfHosted-Service/` | Wireframes, mapa de navegación, sistema visual de estados |
| E-19 parque de referencia | `10-Examples/` y `SDD/Maquetas/SelfHosted-Service/` | Datos de siembra y de maqueta |
| E-20 configuraciones reales ofuscadas | `10-Examples/`, `02-Especificacion-Funcional/` y `SDD/Maquetas/SelfHosted-Service/` | Fixtures de importación, datos de maqueta, casos de adopción |
| E-21 traducción Compose ↔ modelo | `02-Especificacion-Funcional/` y `08-Calidad-Y-Pruebas/` (capa `Infrastructure`) | Contrato de importación y exportación, pruebas de ida y vuelta |
| E-22 casos de prueba | `08-Calidad-Y-Pruebas/` | Casos de prueba con entrada y resultado esperado, uno o más por regla |
| §22 consolidado de 00-Contexto | `00-Contexto/` | Visión, alcance, roadmap, compatibilidad y acuerdo de equipo, con los identificadores `OBJ`, `DV`, `RE`, `OP`, `EN`, `CA`, `CP`, `EPC`, `EP` y `AT` ya emitidos y citados |
| §23 consolidado de 01-Necesidades-Negocio | `01-Necesidades-Negocio/` y `02-Especificacion-Funcional/` | Las ocho NB con su grafo, sus cuarenta y cuatro criterios y las treinta y seis CU previstas con su proyecto de código |
| §24 estado al cierre de la Fase A | Todas las categorías, y en particular `03-UX-UI-DX`, `05-Arquitectura-Tecnica` y `07-Plan-Sprint` | Especificaciones derivadas sin revisar, matriz de navegadores pendiente y los tres objetos que la Fase C recibe declarados y no diseñados |

---

## Control de cambios

| Versión | Fecha | Cambios | Autor |
|---|---|---|---|
| 1.0 | 2026-07-27 | Intake unificado inicial de la solución SelfHosted.Service.Core, integrado desde `Analisis-Final-Integrado.md`, `Requerimientos-Funcionales.md` y `Requerimientos-Tecnicos.md`. Incluye la Parte D con veintidós escenarios transcriptos y su matriz de cobertura: los nueve modelos de datos con su JSON completo y el esquema relacional (E-1 a E-9), los cinco escenarios de extremo a extremo (E-10 a E-14), la superficie de la API (E-15), el catálogo de reglas verificables (E-16), el ciclo de vida del despliegue (E-17), el maquetado de la interfaz (E-18), el parque de referencia como juego de datos de maqueta (E-19), seis configuraciones de despliegue reales ofuscadas con sus Compose y Dockerfile (E-20), la traducción entre Compose y el modelo de servicio (E-21) y treinta casos de prueba derivados (E-22). | Prompt integrador de Documento Intake (Claude Code) |
| 1.1 | 2026-07-27 | Actualización de la sección «Supuestos registrados por este intake y su estado», que en la versión 1.0 se titulaba «Supuestos abiertos que este intake registra»: consolidación de la respuesta del agente humano del proyecto a la batería de validación de intake emitida por el orquestador. Motivo: los seis supuestos estaban registrados como pendientes de confirmación explícita y la generación de `00-Contexto` los consumió como cerrados sin respaldo en este documento, lo que el audit independiente de la Fase A reportó como hallazgo P0. Se publica la tabla de resolución por supuesto, que pasa a ser la fuente de verdad de su estado: S-01 a S-04 confirmados sin cambios en sus valores propuestos, S-05 resuelto con evidencia verificable y S-06 cerrado por identificación de rol. Se declara además que la generalización sobre el marcador `[S]` alcanza únicamente a S-01 a S-06, y se enumeran los dos marcadores `[S]` sin número que siguen abiertos. Ningún valor cambió: la actualización es de estado y de evidencia. | Orquestador SDD |
| 1.1 | 2026-07-27 | Actualización de la cabecera y del título del documento. El campo Repositorio incorpora la URL del remoto `origin` y su método de verificación, que es la resolución de S-05; los campos Documento y Versión pasan a 1.1; el Estado pasa de Borrador a Aprobado. Motivo: consolidación de la misma batería de validación. La versión 1.0 queda archivada en `SDD/Intake/_legacy/2026-07-27/`. | Orquestador SDD |
| 1.1 | 2026-07-27 | Actualización de §2: la fila del dueño del problema deja de declarar el nombre propio como no declarado y pasa a identificarlo por rol, que es la resolución de S-06. Motivo: consolidación de la misma batería de validación. Ningún actor cambió. | Orquestador SDD |
| 1.1 | 2026-07-27 | Actualización de §8: la nota de origen de las cuatro métricas de negocio pasa de requerir confirmación a declararse confirmada, con su fecha. Motivo: consolidación de la misma batería de validación. Los cuatro targets y sus plazos no cambiaron. | Orquestador SDD |
| 1.1 | 2026-07-27 | Actualización de §10: incorporación de la restricción «Disponibilidad y tiempos de respuesta», que declara la ausencia de horario core, de franja comprometida y de plazo máximo de respuesta, y que el bloqueo del punto de control no vence. Motivo: la generación de `Acuerdo-Equipo-v1.0.md` requería declarar el acuerdo de nivel de servicio de respuesta que exige `Rules-Contexto.md` §4.2, las tres fuentes no lo declaran, y el agente humano del proyecto resolvió declarar la ausencia en lugar de fijar un valor. Se registra acá para que la afirmación tenga respaldo en la cadena. | Orquestador SDD |
| 1.1 | 2026-07-27 | Actualización de §17.1, §17.2, §17.3 y §17.4: las notas de origen de los bloques P.6, P.7 y P.10 de los cuatro proyectos pasan de requerir confirmación a declararse confirmadas, con su fecha. Motivo: consolidación de la misma batería de validación. Ningún umbral de cobertura, ningún NFR y ningún criterio de versionado cambió de valor. | Orquestador SDD |
| 1.1 | 2026-07-27 | Actualización de §19: los dos ítems del checklist que remitían a confirmación pendiente y la advertencia de cierre para la fase de validación pasan a declarar el resultado de la batería. Se incorpora la tabla de lo que sigue abierto y no fue alcanzado por la confirmación: CL-04, CL-15 y la matriz de navegadores, cada uno con su consumidor downstream identificado. Motivo: consolidación de la misma batería de validación. | Orquestador SDD |
| 1.2 | 2026-07-28 | Actualización de la cabecera y del título del documento: los campos Documento y Versión pasan a 1.2 y la Fecha a 2026-07-28. Motivo: integración de las siete decisiones D-1 a D-7 tomadas por el agente humano del proyecto el 2026-07-28. Origina el cambio: las siete decisiones. La versión 1.1 queda archivada por el orquestador. | Orquestador SDD |
| 1.2 | 2026-07-28 | Actualización de «Procedencia de este intake y convención de marcadores»: se incorpora `Analisis-Rayway.md` como cuarta fuente del intake, con su rol y su precedencia, y se declara la regla de autocontención que le aplica —todo lo tomado de ella está transcripto, con la sección citada, y se marca **[E]** respecto de ese documento—. Motivo: las decisiones D-5, D-6 y D-7 toman de ese análisis la sintaxis de las referencias entre variables, la definición de plantilla y el momento de resolución, y el intake no puede depender de un archivo externo. Origina el cambio: D-5, D-6 y D-7. | Orquestador SDD |
| 1.2 | 2026-07-28 | Incorporación de la sección nueva «Decisiones del agente humano incorporadas en la versión 1.2», con el índice de las siete decisiones D-1 a D-7, su fecha, su origen y la lista de secciones donde vive cada una. Motivo: dar un único punto de anclaje citable desde cada lugar afectado y dejar explícito que son decisiones declaradas **[D]** y no supuestos **[S]**. Origina el cambio: las siete decisiones. | Orquestador SDD |
| 1.2 | 2026-07-28 | Actualización de «Supuestos registrados por este intake y su estado»: la fila del marcador `[S]` sin número correspondiente a IC-05 pasa de abierta a cerrada, y el párrafo que declaraba abiertos a CL-04 y CL-15 pasa a declararlos resueltos. Motivo: los tres quedaron cerrados el 2026-07-28. Ningún supuesto numerado S-01 a S-06 cambió de estado. Origina el cambio: D-1, D-2 y D-3. | Orquestador SDD |
| 1.2 | 2026-07-28 | Actualización de §4: F-14 se reformula como cuarta vía de alta con ítems de uno o varios servicios; su nota se reescribe con las tres consecuencias del catálogo como definición en reposo y con el fundamento técnico del ítem multi-servicio, que no requiere empaquetar servicios en un mismo contenedor porque violaría I2. Se agregan las capacidades F-23 (variables compartidas del proyecto) y F-24 (referencias entre variables), ambas Should Have, con el argumento de por qué no pueden ser Must. Origina el cambio: D-5, D-6 y D-7. | Orquestador SDD |
| 1.2 | 2026-07-28 | Actualización de §6: el flujo 2 incorpora el paso obligatorio de clasificación de variables entre la importación y la creación del servicio. Motivo: la adopción deja de completarse sin ese paso. Origina el cambio: D-2. | Orquestador SDD |
| 1.2 | 2026-07-28 | Actualización de §7: CL-04 y CL-15 pasan de abiertos a resueltos con su respuesta completa; CL-01 registra su confirmación sin cambios; CL-08 amplía su respuesta porque la heurística deja de ser el único filtro. Motivo: eran los dos únicos casos límite abiertos del intake y condicionaban la categoría 02. Origina el cambio: D-1, D-2 y D-4. | Orquestador SDD |
| 1.2 | 2026-07-28 | Actualización de §11: se agrega una nota que declara que la mitigación de RG-09 quedó reforzada, porque el enmascarado por heurística dejó de decidir y pasó a sugerir dentro del paso obligatorio de clasificación. La fila del riesgo, que es transcripción **[E]** del análisis integrado, no se modifica. Origina el cambio: D-2. | Orquestador SDD |
| 1.2 | 2026-07-28 | Actualización de §12: se amplía la definición de «Arista o enlace» para declarar sus dos orígenes y se agregan cuatro términos —«Catálogo», «Referencia de variable», «Subgrafo parametrizado» y «Variable compartida del proyecto»—. El glosario pasa de 28 a 32 términos. Origina el cambio: D-5, D-6 y D-7. | Orquestador SDD |
| 1.2 | 2026-07-28 | Actualización de §14: la fila de SelfHosted-Domain pasa de declarar RN-01 a RN-20 a declarar RN-01 a RN-37. Motivo: el catálogo de reglas incorporó once reglas nuevas. Origina el cambio: D-1, D-2, D-5, D-6 y D-7. | Orquestador SDD |
| 1.2 | 2026-07-28 | Actualización de §16: el árbol de `/src` incorpora `VariableCompartida` en `Domain/Proyectos/`, `ReferenciaVariable` en `Domain/Servicios/` y la aclaración de que `CatalogoItem` es un subgrafo. Motivo: coherencia entre las entidades nuevas del modelo y la estructura declarada. Origina el cambio: D-5, D-6 y D-7. | Orquestador SDD |
| 1.2 | 2026-07-28 | Actualización de §17.1 P.3: la superficie de la API pasa de veintidós a veintiséis endpoints y la cita del catálogo de reglas pasa a RN-01 a RN-37. Motivo: las decisiones exigieron cuatro endpoints nuevos, transcriptos en E-15. Origina el cambio: D-1, D-2, D-5 y D-7. | Orquestador SDD |
| 1.2 | 2026-07-28 | Actualización de §17.2 P.6: se amplía la lista de casos de E-22 que corresponden a la capa de aplicación con los casos nuevos de resolución de referencias, clasificación de variables, resultado por contenedor e instanciación del catálogo. Origina el cambio: D-1, D-2, D-6 y D-7. | Orquestador SDD |
| 1.2 | 2026-07-28 | Actualización de §17.3 P.5: la fila de enmascarado en la adopción se reescribe para declarar que la heurística sugiere y no decide, y se agregan dos filas, una para el cifrado de las variables compartidas del proyecto y otra para el momento y el alcance de la resolución de referencias. Origina el cambio: D-2, D-5 y D-6. | Orquestador SDD |
| 1.2 | 2026-07-28 | Actualización de §17.4 P.6: la estrategia de testing del dominio pasa a citar RN-01 a RN-37 y el recuento de casos de E-22. Motivo: el catálogo de reglas y el de casos de prueba se ampliaron. Origina el cambio: D-1, D-2, D-5, D-6 y D-7. | Orquestador SDD |
| 1.2 | 2026-07-28 | Actualización de §17.4 P.10: la fila de trazabilidad de las reglas pasa a citar RN-01 a RN-37. Motivo: coherencia con el catálogo ampliado. Origina el cambio: D-1, D-2, D-5, D-6 y D-7. | Orquestador SDD |
| 1.2 | 2026-07-28 | Actualización de §17.4 P.11: se incorporan tres decisiones de modelado —arista única con dos orígenes, participación de la referencia en el orden topológico y extensión del marcado de «requiere redespliegue» al valor referenciado— y se cierra IC-05 con su fundamento completo, que reemplaza a la apertura para el Sprint 0 marcada `[S]`. Origina el cambio: D-3 y D-6. | Orquestador SDD |
| 1.2 | 2026-07-28 | Actualización de §19: el checklist ajusta el recuento de términos del glosario, declara que los quince casos límite tienen respuesta, cubre F-23 y F-24 en el ítem de MoSCoW y extiende el ítem de autocontención a la cuarta fuente. La tabla de lo abierto se parte en dos: lo que se cerró el 2026-07-28 —CL-04, CL-15 e IC-05— y lo que sigue abierto, que pasa de cuatro a seis pendientes con las cinco decisiones de diseño que las siete no cubren y que este intake deliberadamente no toma. Origina el cambio: las siete decisiones. | Orquestador SDD |
| 1.2 | 2026-07-28 | Actualización de §20.1 (E-1): el proyecto de ejemplo incorpora `variablesCompartidas` con un caso no secreto y uno secreto, las aristas del lienzo incorporan el discriminador `tipo` y se agrega la arista 9003 de tipo `referencia` entre los mismos dos servicios que ya une la 9002. Identificadores nuevos, sin reciclar los existentes. Origina el cambio: D-5 y D-6. | Orquestador SDD |
| 1.2 | 2026-07-28 | Actualización de §20.2 (E-2): las variables del servicio incorporan los campos `referencia` y `resueltaEn`, y se agregan cuatro variables que ejercitan las tres formas de referencia, incluida una secreta por propagación y una interpolada dentro de un valor más largo. Se agrega la tabla que explica qué referencia cada una y cuál genera arista. Origina el cambio: D-5 y D-6. | Orquestador SDD |
| 1.2 | 2026-07-28 | Actualización de §20.3 (E-3): se declara que el despliegue es siempre el de un contenedor y que la operación que los agrupa no tiene estado propio, con sus tres consecuencias, y se agrega la línea de tiempo de un despliegue fallido del mismo lote para mostrar que el fallo no arrastra a los demás. Origina el cambio: D-1. | Orquestador SDD |
| 1.2 | 2026-07-28 | Actualización de §20.4 (E-4): el enlace incorpora `tipo`, `claveDestino` y el ejemplo de una arista de referencia, y se agrega la especificación completa de D-6 —sintaxis adoptada con sus tres formas y su forma canónica, convivencia con la expansión de Compose en las dos direcciones, momento de resolución y qué se persiste, y efecto en el grafo con la tabla comparativa de los dos orígenes—, con la transcripción literal de la sintaxis de la cuarta fuente. Origina el cambio: D-6. | Orquestador SDD |
| 1.2 | 2026-07-28 | Actualización de §20.5 (E-5): el changeset incorpora un cambio de variable compartida del proyecto, con el campo `referenciadaPor` que hace auditable la propagación, y su explicación. El informe de impacto no cambia. Origina el cambio: D-5 y D-6. | Orquestador SDD |
| 1.2 | 2026-07-28 | Reescritura de §20.6 (E-6): se declara qué es el catálogo —cuarta vía de alta, nada corre, arranca vacío—, el ítem pasa de contener un servicio a contener un subgrafo con `variablesCompartidas`, `servicios` y `enlaces`, se agrega un segundo ítem multi-servicio completo y el formato de exportación sube de 1 a 2, con su regla de conversión desde el formato 1. Origina el cambio: D-7. | Orquestador SDD |
| 1.2 | 2026-07-28 | Actualización de §20.7 (E-7): el candidato incorpora `variablesSugeridasComoSecretas`, RA-05 se reescribe para que la heurística sugiera en lugar de decidir, se agrega RA-06 con el paso obligatorio de clasificación y se declara por qué se eligió esa resolución entre las tres de C-2. Origina el cambio: D-2. | Orquestador SDD |
| 1.2 | 2026-07-28 | Actualización de §20.9 (E-9): se agrega la tabla `variables_proyecto` con su clave única; `enlaces` incorpora `tipo`, `clave_destino`, `puerto_destino` nullable y tres `CHECK` de coherencia; `variables` incorpora `referencia`, `resuelta_en` y el valor `referencia` en `origen`; `catalogo_items` incorpora `formato_version`; y se agregan los índices `ix_enlaces_destino` e `ix_variables_referencia`, cada uno con la consulta que sirve. Origina el cambio: D-5, D-6 y D-7. | Orquestador SDD |
| 1.2 | 2026-07-28 | Actualización de §20.10 (E-10): el paso de alta desde catálogo declara que es una de las cuatro vías de alta y que la instanciación crea tantos servicios como nodos tenga el subgrafo, y se agrega la variante del flujo con la credencial declarada como variable compartida del proyecto. Origina el cambio: D-5, D-6 y D-7. | Orquestador SDD |
| 1.2 | 2026-07-28 | Actualización de §20.11 (E-11): el flujo pasa de tres a cuatro pasos, se transcribe la carga útil del paso de clasificación usando el caso C-2 que motivó la decisión, y el bloque `adopcion` del servicio resultante incorpora `clasificacionVariables` como traza auditable. Origina el cambio: D-2. | Orquestador SDD |
| 1.2 | 2026-07-28 | Actualización de §20.13 (E-13): la tabla de comportamiento incorpora la caída de la conexión del navegador y la referencia no resoluble, y se agrega el cuerpo de respuesta de una operación en lote con su resultado por contenedor, declarando que un fallo parcial no es un código de error de la operación. Origina el cambio: D-1 y D-6. | Orquestador SDD |
| 1.2 | 2026-07-28 | Actualización de §20.14 (E-14): el Compose exportado incorpora las variables resueltas del servicio `api`, el manifiesto propio sube de `version` 1 a 2 e incorpora `variablesCompartidas` y `referencias`, la tabla de correspondencia gana dos filas y se declara cómo se comporta la exportación ante una referencia y por qué el Compose nunca lleva `${{ … }}`. Origina el cambio: D-5 y D-6. | Orquestador SDD |
| 1.2 | 2026-07-28 | Actualización de §20.15 (E-15): se agregan cuatro endpoints —seguimiento de operación con resultado por contenedor, variables compartidas del proyecto, variables de un contenedor candidato e instanciación de un ítem del catálogo— y la nota sobre el cambio de contrato del endpoint de adopción. Origina el cambio: D-1, D-2, D-5 y D-7. | Orquestador SDD |
| 1.2 | 2026-07-28 | Actualización de §20.16 (E-16): se agregan las reglas RN-21 a RN-31 con su momento de validación y su respuesta, y se extiende el enunciado de RN-04 —que pasa a alcanzar sólo a las aristas de host y puerto— y el de RN-05 —que declara que los dos orígenes de arista participan por igual—. Ninguna regla existente se renumera ni cambia su comportamiento. Origina el cambio: D-1, D-2, D-5, D-6 y D-7. | Orquestador SDD |
| 1.2 | 2026-07-28 | Actualización de §20.17 (E-17): se agrega la fila de correspondencia del contenedor inexistente con despliegue activo y se declara que la máquina de estados describe un contenedor y no una operación, con sus tres efectos sobre el sincronizador, incluida la verificación contra el motor al reabrir el proyecto. Origina el cambio: D-1. | Orquestador SDD |
| 1.2 | 2026-07-28 | Actualización de §20.20 (E-20): el hallazgo del caso C-2 pasa de declarar tres resoluciones a elegir a declarar cuál se eligió y por qué, y remite a la carga útil de E-11 y a los casos de prueba T-17 y T-32. La configuración transcripta no cambia. Origina el cambio: D-2. | Orquestador SDD |
| 1.2 | 2026-07-28 | Actualización de §20.21 (E-21): se reescriben las filas de `depends_on`, de `environment:` con `${VAR}` y de `env_file:`, y se agrega la fila de la ocurrencia literal de `${{`, declarando que la importación nunca crea referencias y que todas las variables de un archivo externo pasan por el paso obligatorio de clasificación. Origina el cambio: D-2 y D-6. | Orquestador SDD |
| 1.2 | 2026-07-28 | Actualización de §20.22 (E-22): se reescriben T-17 y T-17b, que dejan de ser una prueba en rojo declarada, y se agregan los dieciséis casos T-31 a T-46 que exigen las reglas nuevas, incluido T-32, que es el caso de prueba explícito del caso C-2 que motivó D-2. El anexo pasa de 31 a 47 casos. Origina el cambio: D-1, D-2, D-5, D-6 y D-7. | Orquestador SDD |
| 1.2 | 2026-07-28 | Actualización de §21: se agregan nueve filas a la matriz de cobertura, una por cada capacidad o regla nueva, con los escenarios y casos de prueba que la ejercitan, y se ajusta la fila del catálogo de reglas a RN-01 a RN-37. Origina el cambio: las siete decisiones. | Orquestador SDD |
| 1.2 | 2026-07-28 | Nota de archivado, no de contenido. La versión 1.1 de este documento **no quedó archivada** en `SDD/Intake/_legacy/`, contra lo que exige la política de deprecación de una sola versión vigente. Motivo: la integración de la versión 1.2 se ejecutó editando el archivo en su lugar, sin tomar antes el snapshot de la 1.1, de modo que ese estado intermedio dejó de existir y no es reconstruible con fidelidad. Se descartó fabricar un snapshot aproximado, porque un archivo rotulado 1.1 con contenido distinto del que la 1.1 tuvo es peor que su ausencia. La versión 1.0 sí está archivada en `_legacy/2026-07-27/`, y el contenido de la 1.1 queda descripto por la 1.0 más las siete entradas de control de cambios de esa versión, que se conservan íntegras en esta tabla. La 1.1 vivió unas horas del mismo día y no fue consumida por ningún artefacto que la 1.2 no reemplace. | Orquestador SDD |
| 1.2 | 2026-07-28 | Actualización de «Trazabilidad downstream»: la fila de E-16 pasa de RN-01 a RN-20 a RN-01 a RN-37. Motivo: coherencia con el catálogo ampliado. Origina el cambio: D-1, D-2, D-5, D-6 y D-7. | Orquestador SDD |
| 1.2 | 2026-07-28 | Corrección de §20.13 (E-13) tras la auditoría de coherencia `Intake-v1.2-Coherencia-v1.0.md`: la operación en lote `op-a41f7` pasa de tres contenedores a dos, alineada con el informe de impacto del changeset 331 que declara el anexo E-5, y se agrega el campo `serviciosNoAlcanzados` que hace auditable la otra mitad de RN-13. Con eso desaparece además el identificador de despliegue 5310, que E-8 y E-11 ya asignan al servicio 305 del proyecto 7. Cierra los hallazgos **P0-1** y **P0-2**. | Orquestador SDD |
| 1.2 | 2026-07-28 | Corrección de §20.22 (E-22): T-31 se reescribe contra el informe de impacto de E-5 —`db` no se toca—, y se agregan los casos T-47 y T-48, que verifican el escape del `$` literal en la exportación y su desescapado en la importación. El anexo pasa de 47 a 49 casos. Cierra **P0-1** y **P1-3**. | Orquestador SDD |
| 1.2 | 2026-07-28 | Corrección de «Procedencia de este intake y convención de marcadores»: se incorpora el marcador **[D-i]**, diseño de integración, con su definición y con la explicación de en qué se diferencia de `[S]`. Motivo: la versión anterior marcaba `[D]` con origen «agente humano del proyecto» material que era especificación del integrador. Cierra **P0-3**. | Orquestador SDD |
| 1.2 | 2026-07-28 | Corrección de «Decisiones del agente humano incorporadas en la versión 1.2»: se agrega la subsección «Qué decidió el agente humano y qué derivó el integrador», con el reparto de autoría punto por punto; las filas D-1, D-2 y D-6 del índice completan su «Dónde vive» con E-15 y E-13, y la de D-6 corrige la atribución de reglas a RN-21 a RN-26. Cierra **P0-3**, **P2-3** y **P2-14**. | Orquestador SDD |
| 1.2 | 2026-07-28 | Corrección de §20.4 (E-4): se declara al abrir el bloque qué decidió D-6 y qué se derivó al integrar; la sintaxis, la forma canónica, el escape y la persistencia de las dos formas pasan a `[D-i]`; se sube a la tabla de formas la columna que declara la **desviación deliberada respecto de la fuente**, con su argumento de gramática decidible; se corrige la afirmación de que la forma canónica habilita una búsqueda por igualdad; se agrega la tabla de las cuatro combinaciones de referencia y literal por sentido de la ida y vuelta con Compose; y se declara y argumenta que una variable compartida no puede contener una referencia. Cierra **P0-3**, **P1-2**, **P1-3** y parte de **P1-1**. | Orquestador SDD |
| 1.2 | 2026-07-28 | Corrección de §20.9 (E-9): se declara que `variables_proyecto` no lleva columna `referencia` y que esa ausencia es la que hace cumplir la restricción; se reescribe el comentario de `variables` con el mecanismo real de localización de referencias en dos pasos; y el índice `ix_variables_referencia` se reemplaza por el índice parcial `ix_variables_con_referencia`, que acota el conjunto a parsear en lugar de buscar por igualdad. Cierra **P1-1** y **P1-2**. | Orquestador SDD |
| 1.2 | 2026-07-28 | Corrección de §20.16 (E-16): las reglas derivadas del integrador pasan a `[D-i]` en su identificador; RN-22 se acota a los ciclos entre variables de servicio; RN-25 incorpora el escape del `$` literal en la emisión y RN-26 el desescapado del `$$` en la importación; y el párrafo de cierre reparte la autoría regla por regla. Cierra **P0-3**, **P1-1** y **P1-3**. | Orquestador SDD |
| 1.2 | 2026-07-28 | Corrección de §20.21 (E-21): se agrega la fila de traducción de `$$` y se completa la de la ocurrencia literal de `${{`, declarando que se persiste escapada. Cierra **P1-3**. | Orquestador SDD |
| 1.2 | 2026-07-28 | Corrección de §20.5 (E-5): el cambio 4 invierte el sentido —`America/Argentina/Buenos_Aires` → `UTC`— para que el estado aplicado que muestran E-1, E-2 y E-14 sea el `antes` del cambio pendiente, y se explicita cómo leer el sentido del cambio. Cierra **P1-4**. | Orquestador SDD |
| 1.2 | 2026-07-28 | Corrección de §20.1 (E-1): `cambiosPendientes` pasa de 0 a 4, coherente con el changeset 331 pendiente de E-5, con su nota de lectura. Cierra **P2-11**, incoherencia preexistente desde la versión 1.0 agravada por el cambio 4. | Orquestador SDD |
| 1.2 | 2026-07-28 | Corrección de §20.6 (E-6): se elimina el anidamiento de `{{ slug }}` dentro de una expresión `${{ … }}`; la variable compartida de la plantilla pasa a llamarse `DB_PASSWORD`; se agrega la tabla de las tres sintaxis con quién interpreta cada una y cuándo se resuelve; y se declara la regla de que un hueco de parámetro no puede aparecer dentro de una expresión de referencia, con el orden de resolución por etapas. Cierra **P1-6**. | Orquestador SDD |
| 1.2 | 2026-07-28 | Corrección de §19: se reemplaza la afirmación falsa de que la tabla de pendientes y la de marcadores `[S]` enumeran el mismo conjunto por la declaración de los tres registros disjuntos del documento, y se agrega la tabla «Especificaciones de integración pendientes de confirmación», con las diez entradas DI-01 a DI-10 y la decisión que origina cada una. Cierra **P0-3** y **P1-5**. | Orquestador SDD |
| 1.2 | 2026-07-28 | Corrección de §17.1 P.10: la fila «Observabilidad» recupera su cuarta celda, la de origen. Motivo: tenía tres celdas en una tabla de cuatro columnas y rompía el renderizado, lo que hacía que el ítem del checklist sobre NFR numéricos se declarara verdadero sobre una tabla incompleta. Cierra **P2-1**, incoherencia preexistente desde la versión 1.0. | Orquestador SDD |
| 1.2 | 2026-07-28 | Corrección de §17.1 P.3: el recuento de la superficie de la API pasa a declarar treinta endpoints agrupados en veintiocho filas, en lugar de contar filas como endpoints. Cierra **P2-12**, criterio de recuento preexistente. | Orquestador SDD |
| 1.2 | 2026-07-28 | Corrección de §20.15 (E-15): se agregan los endpoints de exportación e importación del catálogo, que F-14 y el glosario declaran desde la versión 1.0 sin que la superficie los tuviera, y la nota que explica el recuento de filas frente al de endpoints. Cierra **P2-13** y **P2-12**. | Orquestador SDD |
| 1.2 | 2026-07-28 | Corrección de §20.14 (E-14): la exportación incorpora la variable secreta `API_KEY_EXTERNA` del servicio 101 en el Compose, en el archivo de variables y en `secretosRequeridos`, y se declara que un secreto no se suprime de la exportación sino que viaja como marcador a completar. Cierra **P2-9**, incoherencia preexistente desde la versión 1.0. | Orquestador SDD |
| 1.2 | 2026-07-28 | Corrección de §17.4 P.2: se transcribe la tabla de invariantes del producto de referencia (`Analisis-Rayway.md` §3.6) con la correspondencia de cuál se adoptó, cuál se adaptó y cuál se descartó. Motivo: la tabla de procedencia declaraba esa sección como fuente y nada del intake la citaba, contra la regla de autocontención. Cierra **P2-7**. | Orquestador SDD |
| 1.2 | 2026-07-28 | Corrección de §4 y de §20.6 (E-6) en su atribución de fuente: la enumeración del menú de creación de servicio se cita sólo de `Analisis-Rayway.md` §3.2, que es donde está; se quita la cita a §4.3, que no menciona `Template` y que además no figura en la tabla de procedencia. Cierra **P2-8**. | Orquestador SDD |
| 1.2 | 2026-07-28 | Corrección de §20.7 (E-7) y §20.11 (E-11): la ruta ofuscada del montaje del servicio 305 pasa a `/srv/despliegues/print-server/data`, unificada con la que declara E-21 para el mismo servicio. Cierra **P2-10**, incoherencia preexistente desde la versión 1.0. | Orquestador SDD |
| 1.2 | 2026-07-28 | Corrección de §21: la fila del secreto embebido se reescribe contra D-2 —ya no es enmascarado por heurística sino clasificación obligatoria— y cita T-32, y se agregan dos filas para RN-22 y para el escape del `$` literal, que eran las únicas reglas nuevas sin cobertura propia en la matriz. Cierra **P3-4**. | Orquestador SDD |
| 1.2 | 2026-07-28 | Corrección del control de cambios: la entrada de §17.4 se parte en tres, una por bloque P.6, P.10 y P.11, según `Master-Prompt.md` §13 regla 5; y la entrada de §21 corrige su cifra de diez filas a nueve. Cierra **P2-5** y **P2-6**. | Orquestador SDD |
| 1.2 | 2026-07-28 | Corrección de §19, ítem de autocontención del checklist: pasa a enumerar las cuatro secciones de `Analisis-Rayway.md` que la tabla de procedencia declara, con dónde está transcripta cada una. Antes enumeraba tres y omitía §3.6. Cierra **P2-7**. | Orquestador SDD |
| 1.2 | 2026-07-28 | Corrección de §20.16 (E-16) tras la verificación de cierre `Intake-v1.2-Coherencia-v1.0.md` §14: **RN-21 se reparte por dentro**. Su enunciado —que los ámbitos válidos sean exactamente las tres formas que enumera D-6 y que una referencia no cruce el límite del proyecto— vuelve a `[D]`, que es lo que el agente humano decidió; queda `[D-i]` sólo su exigibilidad: el momento de validación, el `422`, la enumeración de causas y la excepción de canal alcanzable frente a RN-04. RN-29 recibe el mismo tratamiento por el mismo criterio. Motivo: la corrección anterior sobrecorrigió en la dirección opuesta al hallazgo P0-3 y presentaba como revisable una regla que el cliente sí fijó. Cierra **N-3**. | Orquestador SDD |
| 1.2 | 2026-07-28 | Corrección de §20.16 (E-16) en su criterio de marcado: las filas de RN-04 y RN-05 pasan a declarar `(ampliación **[D-i]**)` en su celda de identificador, alineadas con lo que el párrafo de cierre ya afirmaba en prosa y con el sufijo que llevan las reglas nuevas derivadas. Se aclara además que el marcador alcanza a la ampliación y nunca al enunciado original, que sigue siendo **[E]** de la fuente base. Cierra **N-2**. | Orquestador SDD |
| 1.2 | 2026-07-28 | Corrección de §19, tabla de especificaciones de integración: se agregan **DI-11** —prohibición de anidar un hueco de parámetro dentro de una expresión de referencia, con su orden de resolución por etapas, que vive en E-6— y **DI-12** —mecanismo de localización de referencias en dos pasos con índice parcial, que vive en E-9—. Eran las dos únicas marcas `[D-i]` in situ sin entrada en la tabla, contra la exhaustividad que el propio documento declara, y con ellas la columna «Dónde vive» nombra a E-6 por primera vez. Se corrige además DI-08, que atribuía RN-21 entera al integrador, y DI-05, que ahora cita las ampliaciones de RN-04 y RN-05. Cierra **N-1** y **N-3**. | Orquestador SDD |
| 1.2 | 2026-07-28 | Corrección de «Procedencia de este intake y convención de marcadores»: la afirmación de exhaustividad del marcador `[D-i]` se precisa —todo pasaje marcado corresponde a una entrada DI-01 a DI-12, y una regla puede llevar el marcador sólo en parte de su enunciado, declarando cuál—. Motivo: la redacción anterior no admitía el reparto por dentro de una regla, que es lo que exigió el cierre de N-3. Cierra **N-1** y **N-3**. | Orquestador SDD |
| 1.2 | 2026-07-28 | Corrección de §17.4 P.11: que la arista de referencia ordene el arranque deja de marcarse `[D-i]` y pasa a `[D], D-6`, porque no es una elección de la integración sino una deducción de componer la decisión con RN-14, que ya declara **[E]** que el grafo define el orden. Cierra **N-3**. | Orquestador SDD |
| 1.2 | 2026-07-28 | Incorporación a §19 de la tabla «Observaciones de auditoría aceptadas y deliberadamente no aplicadas», con los cuatro señalamientos que este documento no corrige y el motivo de cada uno: P2-15 por quedar fuera del alcance del archivo y estar resuelto en el manifiesto, P2-4 por no tener objeto dentro del intake, P3-1 porque reubicar §19 rompería anclas que otros artefactos ya están citando, y P3-2 porque editar los emojis falsearía una transcripción **[E]**. Motivo: los cuatro estaban decididos pero su fundamento no vivía en ninguna parte del documento. Cierra **N-4**. | Orquestador SDD |
| 1.2 | 2026-07-28 | Corrección de §19: la afirmación de que los tres registros de lo no cerrado son disjuntos y que nada figura en dos de ellos era falsa. La matriz de navegadores figura a la vez en el registro de supuestos `[S]` sin número y en el de pendientes de decisión, porque es simultáneamente un supuesto que el intake nunca cerró y una decisión de producto que nadie tomó. Se reemplaza por la declaración de que los registros clasifican por origen y no por ítem, con la superposición nombrada, y se conserva la parte que sí era correcta y útil: cómo debe tratar un artefacto downstream cada uno de los tres. Motivo: el hallazgo lo detectó el subagente de la categoría 01 al recalcular su propio registro de pendientes contra esta sección. | Orquestador SDD |
| 1.2 | 2026-07-28 | Segunda pasada sobre D-6, autorizada explícitamente por el agente humano del proyecto el 2026-07-28. Se incorpora a «Decisiones del agente humano incorporadas en la versión 1.2» la subsección «Segunda pasada sobre D-6: la plataforma de referencia como tutor», que declara el error del argumento anterior —descartaba el nombre de servicio pelado sosteniendo que la gramática no se podía decidir sin conocer los nombres de servicio, cuando la propia transcripción de `Analisis-Rayway.md` §3.5 muestra que se decide por cantidad de segmentos— y el hallazgo mayor: en la fuente conviven dos clases de vínculo y sólo una es explícita, y lo que permite que un mecanismo alcance son las variables provistas por la plataforma. Motivo: rehacer la especificación tomando la fuente como tutor en lugar de apartarse de ella. | Orquestador SDD |
| 1.2 | 2026-07-28 | Actualización del índice de decisiones y de la tabla de reparto de autoría: la fila D-6 declara la segunda pasada y amplía su «Dónde vive»; la fila de sintaxis pasa de la columna del integrador a la del agente humano, porque en la segunda pasada la sintaxis quedó fijada por él; se agrega la fila de las variables provistas; y la fila de efecto en el grafo cambia de objeto, de «arista única con dos orígenes» a «sólo las referencias de red ordenan». Origina el cambio: D-6, segunda pasada. | Orquestador SDD |
| 1.2 | 2026-07-28 | Reescritura de §20.4 (E-4): se declara el mecanismo único de vínculo con el enlace del lienzo como azúcar de interfaz; la sintaxis se alinea con la fuente (`${{ CLAVE }}`, `${{ shared.CLAVE }}`, `${{ <servicio>.CLAVE }}`) y se declara la regla de decisión por cantidad de segmentos; se agrega el punto 2, variables provistas por el sistema, con su tabla de claves, el prefijo `SELFHOSTED_`, la tabla de resolución del host —que es la que este anexo ya tenía para `{destino.host}`, movida— y las tres decisiones sobre el conjunto; y el punto 4 pasa a distinguir referencia de red de referencia de dato, con el argumento de por qué sólo la primera ordena el arranque. Se eliminan la tabla comparativa de los dos orígenes y el ejemplo de arista de tipo `referencia`. Origina el cambio: D-6, segunda pasada. | Orquestador SDD |
| 1.2 | 2026-07-28 | Actualización de §20.1 (E-1): las aristas del lienzo pierden el campo `tipo` y pasan a declarar `claveVariable`, `claveDestino` y el calculado `esReferenciaDeRed`; se agregan las filas 9004 y 9005, que son las referencias al puerto que antes iban implícitas en el enlace; y se declara que el lienzo dibuja una arista por par de servicios agrupando las referencias que la sostienen. Origina el cambio: D-6, segunda pasada. | Orquestador SDD |
| 1.2 | 2026-07-28 | Actualización de §20.2 (E-2): `ConnectionStrings__Default` y `REDIS_URL` pasan de ser variables de enlace sin expresión a ser referencias a las variables provistas de sus destinos; `SALUD_URL` referencia además `${{ SELFHOSTED_HOST }}` del propio servicio; y la tabla explicativa pasa a distinguir referencia de red de referencia de dato. Origina el cambio: D-6, segunda pasada. | Orquestador SDD |
| 1.2 | 2026-07-28 | Actualización de §20.9 (E-9): la tabla `enlaces` pierde `tipo`, `puerto_destino`, `protocolo` y `plantilla_variable`, `clave_destino` pasa a `NOT NULL`, se agrega la clave única por origen, variable, destino y clave referenciada, y los tres `CHECK` que dependían del discriminador se reemplazan por uno. Se declara que la condición de referencia de red se deduce y no se persiste, y por qué. `ix_enlaces_destino` pasa a indexar `(destino_servicio_id, clave_destino)`. Origina el cambio: D-6, segunda pasada. | Orquestador SDD |
| 1.2 | 2026-07-28 | Actualización de §20.16 (E-16): se agrega RN-32, variables provistas por el sistema; RN-04 se reformula sobre qué se referencia en lugar de sobre la clase de arista; RN-05 acota su grafo al de arranque; RN-14 declara que ordena ese subgrafo; RN-01 reserva el nombre `shared`; RN-21 pierde la cláusula de excepción de RN-04, que pasó a RN-04; RN-22 vuelve a alcanzar los ciclos de valor entre servicios, porque RN-05 dejó de verlos; y RN-23 aclara que ninguna variable provista es secreta. El catálogo pasa de 31 a 32 reglas. Origina el cambio: D-6, segunda pasada. | Orquestador SDD |
| 1.2 | 2026-07-28 | Actualización de §20.22 (E-22): T-11, T-12, T-38, T-43, T-44, T-45 y T-46 cambian de objeto, porque probaban la distinción entre dos tipos de arista que dejó de existir; se agregan T-49 a T-53, que cubren el prefijo reservado, la limitación de `SELFHOSTED_PORT`, el nombre de servicio `shared`, el ciclo de valor entre servicios y el azúcar del lienzo. El anexo pasa de 49 a 54 casos. Origina el cambio: D-6, segunda pasada. | Orquestador SDD |
| 1.2 | 2026-07-28 | Actualización de §20.6 (E-6): el enlace de la plantilla multi-servicio pierde `tipo`, `puertoDestino` y `protocolo` y pasa a declarar una referencia; se incorpora `idLocal` en los servicios de la plantilla, que es lo que permite escribir `${{ db.SELFHOSTED_HOST }}` sin anidar un hueco de parámetro dentro de una expresión de referencia. Origina el cambio: D-6, segunda pasada, y DI-12. | Orquestador SDD |
| 1.2 | 2026-07-28 | Actualización de §20.10 (E-10) y §20.14 (E-14): la variable que el sistema propone al trazar la arista pasa de una plantilla `{destino.host}` a una referencia a las variables provistas; y el manifiesto propio declara sus enlaces por clave de variable y clave referenciada, sin `tipo` ni puerto. Origina el cambio: D-6, segunda pasada. | Orquestador SDD |
| 1.2 | 2026-07-28 | Actualización de §20.21 (E-21): la fila de `depends_on` deja de producir una arista tipada y declara cómo se materializa la dependencia importada bajo el mecanismo único, aclarando que eso no contradice RN-26. Origina el cambio: D-6, segunda pasada. | Orquestador SDD |
| 1.2 | 2026-07-28 | Actualización de §12: la entrada «Arista o enlace» pasa a declarar que toda arista nace de una referencia y a distinguir red de dato; «Variable de enlace» deja de ser una clase aparte de variable; y se agrega «Variable provista por el sistema». El glosario pasa de 32 a 33 términos. Origina el cambio: D-6, segunda pasada. | Orquestador SDD |
| 1.2 | 2026-07-28 | Actualización de §17.4 P.11: la fila de la arista única con dos orígenes se reemplaza por la del mecanismo único de vínculo, con el hallazgo de la fuente y las variables provistas como fundamento; y la fila del orden topológico declara que el orden lo define el subgrafo de las referencias de red, con el argumento de por qué no ordena toda referencia. Origina el cambio: D-6, segunda pasada. | Orquestador SDD |
| 1.2 | 2026-07-28 | Actualización de §19: la tabla de especificaciones de integración se renumera a DI-01 a DI-13 con el mapeo declarado —desaparecen la vieja DI-01, sobre los identificadores propios de sintaxis, y la vieja DI-05, sobre la arista con dos orígenes; entran el prefijo `SELFHOSTED_` y el predicado de referencia de red—, y se agrega la pendiente de cómo referenciar el puerto de un servicio que declara más de uno. Las pendientes pasan de seis a siete. Origina el cambio: D-6, segunda pasada. | Orquestador SDD |
| 1.2 | 2026-07-28 | Actualización de §14, §17.1 P.3, §17.3 P.5, §17.4 P.6, §17.4 P.10, §21 y «Trazabilidad downstream»: las citas al catálogo de reglas pasan de RN-01 a RN-31 a RN-01 a RN-37, el recuento de casos de prueba de 49 a 54, y la matriz de cobertura reemplaza la fila de la arista con dos orígenes por tres filas —mecanismo único, variables provistas y referencia de red frente a referencia de dato—. Origina el cambio: D-6, segunda pasada. | Orquestador SDD |
| 1.2 | 2026-07-28 | Actualización de §20.9 (E-9): la tabla `variables` pierde la columna `enlace_id`, porque una variable puede contener varias referencias y sostener varias aristas, de modo que la relación dejó de ser uno a uno y no hay una arista única que apuntar; el vínculo se reconstruye desde `enlaces` por origen y clave de variable. Se documenta además que `origen` registra cómo se creó la variable y no qué clase de variable es. Origina el cambio: D-6, segunda pasada. | Orquestador SDD |
| 1.2 | 2026-07-28 | Corrección de §17.4 P.11, fila 4, tras la sección 15 de la auditoría de coherencia: declaraba que el grafo completo de aristas detecta los ciclos de arranque, cuando RN-05, E-4 punto 4 y T-45 declaran que ese papel lo cumple el subgrafo de las referencias de red. Era verdadera mientras los dos grafos eran el mismo; al separarlos sólo se había actualizado la segunda mitad de la oración. Cierra **P0-1**. | Orquestador SDD |
| 1.2 | 2026-07-28 | Corrección de §20.21 (E-21): la fila de `depends_on` deja de declarar una arista sin variable asociada, que la tabla `enlaces` no admite porque `clave_variable` y `clave_destino` son `NOT NULL`. Se resuelve en dos casos, desarrollados debajo de la tabla con su fundamento: reexpresión de la variable que ya lleva el host del destino, y pérdida de traducción declarada cuando no hay ninguna. Cierra **P0-2**. | Orquestador SDD |
| 1.2 | 2026-07-28 | Corrección de §20.16 (E-16), RN-26: se precisa que la regla prohíbe derivar referencias de la **interpolación de Compose**, y se declara la única excepción, la reexpresión de un `depends_on` sobre una variable cuyo literal ya coincide con el host y el puerto del destino. Sin esa precisión, la resolución de P0-2 contradecía la regla. Cierra **P0-2**. | Orquestador SDD |
| 1.2 | 2026-07-28 | Corrección de §20.22 (E-22): T-40 pasa a verificar también la reexpresión del `depends_on` de C-5, y se agrega T-54, que verifica la pérdida declarada cuando ninguna variable del origen menciona al destino, con la aserción de que no se inyecta una variable inexistente. El anexo pasa de 54 a 55 casos. Cierra **P0-2**. | Orquestador SDD |
| 1.2 | 2026-07-28 | Corrección de §19: se restaura la tabla «Observaciones de auditoría aceptadas y deliberadamente no aplicadas», que había sido incorporada en la corrida anterior y quedó **borrada** al reescribirse la tabla de especificaciones de integración durante la segunda pasada sobre D-6. La entrada de control de cambios que la registraba era verdadera cuando se escribió; lo que falló fue una reescritura posterior que se llevó el bloque contiguo. Cierra **P1-4** y, con él, **P3-2**, cuyos motivos vuelven a estar declarados. | Orquestador SDD |
| 1.2 | 2026-07-28 | Corrección de §19, tabla de pendientes de decisión: la pendiente de distinción visual pasa de hablar de los dos orígenes de arista, que ya no existen, a hablar de **referencia de red frente a referencia de dato**, que es la distinción que sí nació y que tiene consecuencia funcional sobre el orden de arranque. Cierra **P1-1**. | Orquestador SDD |
| 1.2 | 2026-07-28 | Corrección de §20.14 (E-14): el manifiesto propio incorpora a `referencias` las expresiones de `ConnectionStrings__Default` y `REDIS_URL`, que al eliminarse la plantilla del enlace pasaron a ser referencias y no habían sido trasladadas; sin ellas el literal que rodea a la referencia no se podía reconstruir desde `enlaces`, que sólo guarda pares de claves, y el manifiesto incumplía RN-25. Se corrige el párrafo explicativo, que contaba cuatro variables e incluía un literal entre ellas. Cierra **P1-2**. | Orquestador SDD |
| 1.2 | 2026-07-28 | Corrección de §20.22 (E-22), T-39: pasa de esperar cuatro expresiones en el manifiesto a esperar seis, con la aserción de por qué las dos que sostienen aristas no son reconstruibles desde `enlaces`. Cierra **P1-2**. | Orquestador SDD |
| 1.2 | 2026-07-28 | Corrección de §17.4 P.11, fila 2: la definición transcripta de arista como consumo de la dirección y el puerto recibe su nota de alcance, porque hoy describe sólo la referencia de red y no la arista en general. Se conserva la transcripción **[E]** y se le agrega la ampliación **[D-i]**, con el mismo criterio con que RN-04 y RN-05 declaran las suyas. Cierra **P1-3**. | Orquestador SDD |
| 1.2 | 2026-07-28 | Corrección de §17.4 P.11, fila 5: el marcado de «requiere redespliegue» ante un cambio de dirección o de puerto se acota a las aristas entrantes **de red**, porque una de dato no consume ninguno de los dos y marcarla provocaría redespliegues de servicios cuyo valor no cambió. Cierra **P2-4**. | Orquestador SDD |
| 1.2 | 2026-07-28 | Corrección de §20.15 (E-15): la nota del endpoint de adopción se reparte entre enunciado **[D]** de D-2 y exigibilidad **[D-i]** —el `422` de DI-09 y el corolario de versionado de DI-11—, que era la única marca de la tabla DI sin contraparte in situ. Cierra **P2-1**. | Orquestador SDD |
| 1.2 | 2026-07-28 | Corrección de §20.16 (E-16): RN-32 se mueve a continuación de RN-31, para que el catálogo quede en orden de identificador en el tramo que `08-Calidad-Y-Pruebas` recorre regla por regla. Ninguna regla cambia de número ni de contenido. Cierra **P2-2**. | Orquestador SDD |
| 1.2 | 2026-07-28 | Corrección de §21: las dos filas que conservaban vocabulario del modelo anterior —«variable generada» y el orden topológico deducido «del grafo»— se actualizan a la referencia a las variables provistas y al subgrafo de las referencias de red. Cierra **P2-3**. | Orquestador SDD |
| 1.2 | 2026-07-28 | Corrección de §20.14 (E-14): el `canvas` del manifiesto propio exporta los tres nodos del proyecto 12 y su grupo, en lugar de uno solo. El manifiesto es lo que preserva el layout y con un único nodo no lo preservaba. Cierra **P2-5**, incoherencia preexistente desde la versión 1.0. | Orquestador SDD |
| 1.2 | 2026-07-28 | Corrección de §20.4 (E-4): la tabla de claves provistas y su tabla de resolución dejan de explicarse por referencia a la sintaxis `{destino.host}`, que ya no existe, y se enuncian por sí mismas. Se agrega en cambio una nota que declara por qué el título del anexo conserva la expresión «variable generada»: de él se deriva el ancla con la que todo el documento lo cita. Cierra **P3-1**. | Orquestador SDD |
| 1.2 | 2026-07-28 | Corrección de §20.10 (E-10) y §20.20 (E-20): tres pasajes de prosa que seguían razonando con el modelo anterior —el orden de arranque deducido «del grafo de aristas» en E-10, y en el caso C-5 el «grafo de aristas» y la «variable generada»— se actualizan al subgrafo de referencias de red y a la referencia a las variables provistas. No los listaba la auditoría; se detectaron al barrer el mismo patrón que ella describe. | Orquestador SDD |
| 1.2 | 2026-07-28 | Actualización de §19: se agrega DI-14, la resolución de la importación de un `depends_on`, con el descarte razonado de crear una variable y de admitir una dependencia de arranque sin arista. La tabla pasa de trece a catorce entradas. Origina el cambio: la resolución de **P0-2**. | Orquestador SDD |
| 1.2 | 2026-07-28 | Actualización de §17.2 P.6, §17.4 P.6 y §20.22: los recuentos de casos de prueba pasan de 54 a 55 y el rango de la tanda de la segunda pasada llega a T-54. Origina el cambio: la resolución de **P0-2**. | Orquestador SDD |
| 1.2 | 2026-07-28 | Corrección de §20.4 (E-4, punto 5), §20.14 (E-14, regla de la importación inversa) y §20.21 (E-21, fila de `environment:`): las tres afirmaban en absoluto que la importación **nunca** crea referencias, citando RN-26, que dejó de decir eso al abrirse la excepción del `depends_on`. Las tres se reformulan sobre el enunciado vigente —la interpolación de Compose nunca produce una referencia, y la única excepción es la reexpresión de un `depends_on` sobre un literal que ya coincide—, conservando lo que sigue siendo cierto en cada una. Cierra **N-1**. | Orquestador SDD |
| 1.2 | 2026-07-28 | Corrección de §19: la tabla «Observaciones de auditoría aceptadas y deliberadamente no aplicadas» se mueve **después** del párrafo de cierre de la tabla de especificaciones de integración. Al restaurarla en la ronda anterior había quedado insertada entre esa tabla y su cierre, con lo cual «Tres notas sobre esta tabla. Ninguna de las catorce…» seguía a una tabla de cuatro filas. Es el segundo caso del mismo modo de falla —una edición por rango que desplaza un bloque contiguo—, y por eso la verificación pasa a comprobar qué queda inmediatamente antes y después de lo insertado, no sólo que el bloque esté. Cierra **N-2**. | Orquestador SDD |
| 1.2 | 2026-07-28 | Corrección de §20.15 (E-15): la fila del endpoint de importación de Compose declara que devuelve el **informe de importación** con lo que no se pudo representar, en particular los `depends_on` sin arista. Sin esa declaración en la superficie de la API, la pérdida de traducción resuelta en P0-2 dependía de un informe que sólo existía en E-21 y en su caso de prueba. Cierra **N-3**. | Orquestador SDD |
| 1.2 | 2026-07-28 | Corrección de §12: se agrega «Informe de importación», que es el artefacto del que depende que la pérdida de traducción del `depends_on` sea declarada y no silenciosa. Cierra **N-3**. | Orquestador SDD |
| 1.2 | 2026-07-28 | Corrección de §12: se agrega «Variable generada» como **término retirado**, con remisión a «Referencia de variable» y «Variable de enlace», para que un lector que encuentre la expresión en el título del anexo E-4 sepa qué nombraba y por qué ya no se usa. El glosario pasa de 33 a 35 términos. Cierra **N-4**. | Orquestador SDD |
| 1.2 | 2026-07-28 | Corrección de §19: se agrega a la tabla de observaciones no aplicadas la quinta fila, el título del anexo E-4, con el argumento que la sostiene: el criterio de no romper anclas ya se aplicó y se registró para la ubicación de §19, y cambiar el título de E-4 conservando §19 por el mismo motivo sería incoherente. Deja de ser deuda silenciosa y pasa a ser decisión declarada. Cierra **N-4**. | Orquestador SDD |
| 1.2 | 2026-07-28 | Corrección de §19: el ítem del checklist sobre el glosario pasa de 32 a 35 términos, coherente con las tres incorporaciones de la segunda pasada y de esta ronda. Cierra el recuento que las correcciones anteriores habían dejado desactualizado. | Orquestador SDD |
| 1.2 | 2026-07-28 | Tercera pasada, autorizada por el agente humano del proyecto el 2026-07-28: se incorporan al índice de decisiones D-8 a D-11 y la subsección «Tercera pasada: cuatro decisiones puntuales sobre el modelo de vínculo», con el método que las produjo —contrastar cada especificación derivada contra la plataforma de referencia y, donde la fuente calla, especular sobre qué mecánica vuelve innecesaria la aclaración— y el fundamento de cada una. El mecanismo unificado de la segunda pasada se conserva entero. | Orquestador SDD |
| 1.2 | 2026-07-28 | Actualización de §20.4 (E-4): el punto 1 incorpora la forma vinculada de la expresión, con la comparación entre forma legible y forma persistida, el comportamiento de las cinco operaciones y el argumento de por qué se persiste el vínculo y no el nombre; y se declara que la reserva del nombre `shared` deja de hacer falta. Origina el cambio: **D-8**. | Orquestador SDD |
| 1.2 | 2026-07-28 | Actualización de §20.4 (E-4): el punto 2 elimina `SELFHOSTED_PORT` y declara que el puerto se escribe literal, con el criterio heredado de la fuente —proveer lo que el usuario no puede saber de antemano—; se agrega la evaluación de las dos claves restantes, que conserva `SELFHOSTED_SERVICE_NAME` y elimina `SELFHOSTED_PROJECT_NAME`, cada una con su argumento. Origina el cambio: **D-9**. | Orquestador SDD |
| 1.2 | 2026-07-28 | Actualización de §20.4 (E-4): el punto 4 reemplaza el predicado deducido por los dos ejes independientes —espera declarada y referencia al host—, con la tabla de las cuatro combinaciones alcanzables, el argumento de por qué la deducción fallaba en los dos sentidos, y la admisión de la arista sin variable. Origina el cambio: **D-11**. | Orquestador SDD |
| 1.2 | 2026-07-28 | Actualización de §20.4 (E-4), cabecera: el enlace de ejemplo incorpora `puertoDestino` y `esperaDestino` como datos persistidos y `referenciaElHost` como calculado, con la aclaración de que el puerto es registro de dependencia y no plantilla de resolución. Origina el cambio: **D-10** y **D-11**. | Orquestador SDD |
| 1.2 | 2026-07-28 | Actualización de §20.1 (E-1): las aristas del lienzo pasan a declarar `puertoDestino` y `esperaDestino`, se colapsan las que existían sólo por la variable de puerto, y se agrega la 9006, primera arista sin variable del intake. Origina el cambio: **D-9**, **D-10** y **D-11**. | Orquestador SDD |
| 1.2 | 2026-07-28 | Actualización de §20.2 (E-2): las expresiones pasan a la forma vinculada y el puerto a literal; la tabla explicativa distingue forma legible de forma persistida y describe cada arista por sus dos ejes. Origina el cambio: **D-8**, **D-9** y **D-11**. | Orquestador SDD |
| 1.2 | 2026-07-28 | Actualización de §20.9 (E-9): `enlaces` incorpora `puerto_destino` y `espera_destino`, `clave_variable` y `clave_destino` pasan a admitir ausencia, se reemplazan los `CHECK` por los dos que exigen que la arista aporte referencia o espera, y se agregan el índice parcial del subgrafo de arranque y el índice único parcial que impide dos aristas de espera iguales, que la clave única no puede hacer cumplir con columnas nulas. `variables.referencia` pasa a documentar la forma vinculada. Origina el cambio: **D-8**, **D-10** y **D-11**. | Orquestador SDD |
| 1.2 | 2026-07-28 | Actualización de §20.16 (E-16): RN-01 recupera su enunciado original al caerse la reserva de `shared`; RN-04 pasa a exigir canal según si la arista referencia el host, desacoplado de la espera; RN-05 y RN-14 pasan al subgrafo de las aristas que esperan; RN-32 reduce el conjunto de claves provistas a dos; y se agregan RN-33, renombrado sin roturas, y RN-34, buena formación de la arista con la propuesta de espera. El catálogo pasa de 32 a 34 reglas. Origina el cambio: **D-8**, **D-9** y **D-11**. | Orquestador SDD |
| 1.2 | 2026-07-28 | Actualización de §20.22 (E-22): diez casos cambian de objeto —T-12, T-38, T-43, T-44, T-45, T-46, T-50, T-51, T-53 y T-54— y se agregan T-55, T-56 y T-57, que cubren el renombrado sin roturas, la arista de espera sin variable con su unicidad, y el rechazo de la arista que no aporta nada. El anexo pasa de 55 a 58 casos. Origina el cambio: **D-8**, **D-9**, **D-10** y **D-11**. | Orquestador SDD |
| 1.2 | 2026-07-28 | Actualización de §20.21 (E-21): el segundo caso del `depends_on` deja de ser pérdida de traducción y pasa a importarse sin pérdida como arista con espera y sin variable, con el argumento de por qué las dos mitades del descarte anterior se cayeron. Se conserva el argumento de no inventar variables, que sigue siendo válido. Origina el cambio: **D-11**. | Orquestador SDD |
| 1.2 | 2026-07-28 | Actualización de §20.6 (E-6), §20.10 (E-10) y §20.14 (E-14): las expresiones de plantilla, del flujo de alta y del manifiesto propio pasan al puerto literal, y los enlaces del manifiesto declaran `puertoDestino` y `esperaDestino`, incluida una arista sin variable. Origina el cambio: **D-9**, **D-10** y **D-11**. | Orquestador SDD |
| 1.2 | 2026-07-28 | Actualización de §12: «Arista o enlace» pasa a declarar los dos ejes independientes y la arista sin variable; «Variable provista por el sistema» reduce el conjunto a dos y declara que no hay variable de puerto; «Referencia de variable» incorpora el vínculo al servicio. Origina el cambio: **D-8**, **D-9** y **D-11**. | Orquestador SDD |
| 1.2 | 2026-07-28 | Actualización de §17.4 P.11: la fila del subgrafo de arranque pasa de las referencias de red a las aristas que declaran espera, con el argumento de por qué la deducción fallaba en los dos sentidos y por qué ordenar por toda arista tampoco sirve. Origina el cambio: **D-11**. | Orquestador SDD |
| 1.2 | 2026-07-28 | Actualización de §19: la tabla de especificaciones de integración se renumera a DI-01 a DI-16, con el mapeo de las dos renumeraciones del día declarado; se dan de baja la reserva de `shared` y el predicado de referencia de red, y entran la forma del vínculo, la exigibilidad de la espera y el registro del puerto. La pendiente del multi-puerto se cierra sin decisión adicional, porque D-9 la disuelve, y la pendiente de distinción visual cambia de objeto a esperar frente a no esperar. Las pendientes pasan de siete a seis. Origina el cambio: **D-8** a **D-11**. | Orquestador SDD |
| 1.2 | 2026-07-28 | Actualización de §21: se agregan tres filas de cobertura —vínculo al servicio, espera declarada y arista sin variable— y se reformulan las que hablaban de referencia de red frente a referencia de dato. Origina el cambio: **D-8**, **D-9** y **D-11**. | Orquestador SDD |
| 1.2 | 2026-07-28 | Actualización de §14, §17.2 P.6, §17.4 P.6, §17.4 P.10, §20.15 y «Trazabilidad downstream»: las citas al catálogo de reglas pasan a RN-01 a RN-37, el recuento de casos de 55 a 58, y la fila del endpoint de importación deja de declarar el `depends_on` entre lo no representable. Origina el cambio: **D-9** y **D-11**. | Orquestador SDD |
| 1.2 | 2026-07-28 | Corrección de prosa que razonaba con el modelo de la segunda pasada, detectada al barrer el patrón de las pasadas anteriores: nueve pasajes de §20.4, §20.9, §20.10, §20.15, §20.16, §20.21, §20.22 y §12 que hablaban de referencia de red frente a referencia de dato, de la variable de puerto o de la pérdida de traducción del `depends_on` se actualizan a la espera declarada, al puerto literal y a la importación sin pérdida. No los pidió ninguna auditoría. | Orquestador SDD |
| 1.2 | 2026-07-28 | Corrección de §17.4 P.11, fila 2, tras la sección 18 de la auditoría: la ampliación decía que cuando el dato es la dirección o el puerto la arista «arrastra el orden de arranque», que mantiene el acoplamiento que D-11 rompió y menciona el puerto que D-9 eliminó. Pasa a declarar los dos ejes por separado —referenciar el host exige canal (RN-04), declarar espera ordena el arranque (RN-14)— y que el puerto ya no se referencia. Cierra **P0-1**. | Orquestador SDD |
| 1.2 | 2026-07-28 | Corrección de §17.4 P.11, fila 5: la acotación del marcado de «requiere redespliegue» deja de hablar de aristas «de red» y «de dato», que son las clases que la tercera pasada reemplazó, y se reformula sobre las aristas que referencian el host y las que registran el puerto en `puerto_destino`. Cierra **P2-3**. | Orquestador SDD |
| 1.2 | 2026-07-28 | Corrección de la tabla «Qué decidió el agente humano y qué derivó el integrador»: la fila de sintaxis dejaba de atribuir al integrador la reserva del nombre `shared`, que D-8 revirtió, y pasa a atribuirle la forma concreta del vínculo; la fila de variables provistas dejaba de declarar el puerto entre las que decidió el agente humano, que D-9 eliminó, e incorpora la evaluación de las dos claves restantes. Las dos filas habían sobrevivido byte a byte a la tercera pasada. Cierra **P1-1**. | Orquestador SDD |
| 1.2 | 2026-07-28 | Corrección de §20.10 (E-10): el párrafo «qué hay que entender del ejemplo» derivaba el orden de arranque del subgrafo de las referencias de red y citaba RN-14 para eso; pasa al subgrafo de las aristas que declaran espera, con la mención de que el sistema la propone y el usuario la cambia. El pasaje había sobrevivido a dos barridos. Cierra **P1-2**. | Orquestador SDD |
| 1.2 | 2026-07-28 | Corrección de §19, nota de renumeración: declaraba que entraban cuatro entradas cuando entran tres, y se agrega la aritmética que lo cierra —catorce, menos la vieja DI-06, más tres, dieciséis—. Es el mapeo del que depende resolver una cita a un número viejo. Cierra **P2-1**. | Orquestador SDD |
| 1.2 | 2026-07-28 | Corrección de §20.1, §20.4 y §20.9: el campo de la espera pasa a llamarse `esperaDestino` en el JSON de la API, para que su correspondencia con `espera_destino` de la base sea 1:1 como la de todos los demás pares del documento, según la convención de §17.4 P.4. Era el único par que no mapeaba y obligaba a sostener la correspondencia a mano en la configuración de EF Core. Cierra **P2-2**. | Orquestador SDD |
| 1.2 | 2026-07-28 | Actualización de §20.4 (E-4), punto 2: se declara como **consecuencia asumida** que un literal que duplica un valor provisto no sigue al renombrado, corrigiendo la premisa de que alcanzaba a una sola clave —en `bridge`, que es el modo por defecto, `SELFHOSTED_HOST` resuelve al alias DNS, que por I8 es el nombre del servicio—, y se identifica la salida barata sin tomarla. Origina el cambio: **D-8** y la lectura del auditor sobre `SELFHOSTED_SERVICE_NAME`. Cierra **P2-4**. | Orquestador SDD |
| 1.2 | 2026-07-28 | Actualización de §19: se agrega la pendiente de si la interfaz detecta y señala un literal que duplica un valor provisto, y con qué forma. Las pendientes pasan de seis a siete. Origina el cambio: **P2-4**; es la decisión de interfaz que la consecuencia asumida de E-4 deja abierta. | Orquestador SDD |
| 1.2 | 2026-07-28 | Corrección de tres pasajes que el barrido por afirmación encontró y que los barridos por término no habían visto, ninguno pedido por auditoría: la cabecera de §20.4 afirmaba que **todas** las aristas nacen de una referencia, que la arista sin variable de D-11 desmiente; §20.4 hacía depender el orden de arranque de **qué** se referencia; y la subsección de la tercera pasada llamaba a `shared` «palabra reservada» sin distinguir el espacio de nombres, que sigue reservado, del nombre de servicio, que dejó de estarlo. | Orquestador SDD |
| 1.2 | 2026-07-28 | Corrección de §17.4 P.11, fila 3, tras la sección 19 de la auditoría: declaraba que **toda** arista nace de una referencia de variable, contra RN-34, contra las columnas que admiten ausencia en E-9, contra la arista 9006 de E-1 y contra el glosario. Es la misma afirmación que la corrección anterior había arreglado en otros tres lugares, sobreviviendo en el único que no se había revisado. Cierra **P0-1** de esa sección. Es el tercer defecto principal consecutivo alojado en esta tabla, y por eso pasa a ser la primera parada obligatoria de todo barrido, según se declara en la subsección de la tercera pasada. | Orquestador SDD |
| 1.2 | 2026-07-28 | Corrección de §20.21 (E-21): el preámbulo del `depends_on` afirmaba que la tabla `enlaces` exige las dos claves y que por eso una arista sin variable no es persistible, contradicho dos líneas más abajo por su propia tabla, por T-54, por DI-14 y por el esquema. Pasa a declarar que **D-11 le devolvió la representación**: desde que la espera es propiedad declarada, las dos claves admiten ausencia y la arista sin variable es persistible si declara espera. Cierra **P1-1** de la sección 19. | Orquestador SDD |
| 1.2 | 2026-07-28 | Incorporación a la subsección «Tercera pasada» de la tabla de **las cinco relaciones** que esta pasada cambió —R1 qué determina el orden de arranque, R2 cómo se obtiene el puerto, R3 qué identifica la referencia, R4 si un servicio puede llamarse `shared`, R5 la aridad de la arista— con el método que las produce: derivar la lista de la decisión **antes** de aplicarla y dejarla escrita, para que el barrido sea auditable contra la lista y no contra la memoria de quien lo corrió. Se declara además que §17.4 P.11 es la primera parada obligatoria de todo barrido. Motivo: el barrido por afirmación es tan completo como la enumeración de relaciones sobre la que corre, y hasta ahora esa enumeración no quedaba escrita en ninguna parte. | Orquestador SDD |
| 1.2 | 2026-07-28 | Cuarta pasada, decidida por el agente humano del proyecto el 2026-07-28: desambiguación del término «proyecto», que designaba dos cosas distintas y que el glosario advertía sin resolver. Es una pasada **de terminología, no de modelo**: no cambia ninguna regla, ningún flujo ni ninguna decisión. Se incorpora a la sección de decisiones la subsección «Cuarta pasada: desambiguación del término “proyecto”», con los dos términos, la **relación de vocabulario V1** que la pasada cambia —qué designa el término desnudo—, las tres reglas de aplicación, la lista de identificadores técnicos que se conservan con su motivo, y la declaración del tercer sentido, «proyecto Compose», que no se toca. | Orquestador SDD |
| 1.2 | 2026-07-28 | Actualización de §12: la entrada «Proyecto» se reescribe como **«Proyecto SelfHosted»**, con su definición, la declaración de que la forma corta «proyecto» es deliberada y legítima donde el contexto ya la fijó, y la remisión cruzada; se agrega **«Proyecto de código»** como entrada propia, con las cuatro unidades de §13 y la variante larga admitida. El glosario pasa de 35 a 36 términos. Origina el cambio: la cuarta pasada. | Orquestador SDD |
| 1.2 | 2026-07-28 | Actualización de §13, §14, §15, §15.1 y §16: se califica «proyecto de código» en toda mención a las cuatro unidades de la composición, incluidos el título de §13, la cabecera de la tabla de §14 y la de §16.1, y se agrega a §13 y a §14 la declaración de que esas secciones hablan exclusivamente de proyectos de código. Los cuatro proyectos de código, sus tipos D8, sus dependencias y sus nombres no cambian. Origina el cambio: la cuarta pasada, regla 3. | Orquestador SDD |
| 1.2 | 2026-07-28 | Actualización de la Parte C: se califica «proyecto de código» en los títulos de la Parte, de §17 y de los cuatro bloques P.2, en las cinco cabeceras de tabla de testing y en las diecisiete menciones en prosa que designaban una unidad de compilación; y se califica «proyecto SelfHosted» en las nueve menciones del otro sentido que conviven dentro de esos bloques. Es la parte donde los dos sentidos estaban más mezclados. Origina el cambio: la cuarta pasada, reglas 1 y 3. | Orquestador SDD |
| 1.2 | 2026-07-28 | Actualización de la Parte A (§1, §3, §4, §5, §6, §7, §8 y §12) y de la Parte D (E-1, E-2, E-3, E-4, E-8, E-15, E-16, E-17, E-18, E-22 y §21): se escribe «proyecto SelfHosted» en la primera mención de cada sección y anexo y allí donde el otro sentido está cerca; el resto queda en forma corta, según la regla declarada en §12. Origina el cambio: la cuarta pasada, reglas 1 y 2. | Orquestador SDD |
| 1.2 | 2026-07-28 | Actualización de §19 y de «Trazabilidad downstream»: los seis ítems del checklist y las cinco filas de trazabilidad que designaban unidades de compilación pasan a «proyecto de código». Se agrega además a la tabla de observaciones no aplicadas la fila de los **títulos de los anexos de la Parte D**, que conservan «proyecto» sin calificar por el mismo precedente que el título de E-4: de ellos se derivan las únicas veintidós anclas del documento, y la calificación se aplicó en la primera línea de prosa de cada anexo. Origina el cambio: la cuarta pasada. | Orquestador SDD |
| 1.2 | 2026-07-28 | Corrección de la cita de encabezado del documento: decía «cómo se construye cada proyecto», en sentido de composición y sin calificar, en la segunda línea visible del intake y fuera de todas las secciones que la cuarta pasada había recorrido. Pasa a «cada proyecto de código». Cierra **P2-1** de la sección 20 de la auditoría. | Orquestador SDD |
| 1.2 | 2026-07-28 | Actualización de §12: se agrega, a continuación de la tabla del glosario, la **regla léxica** que separa «proyecto SelfHosted» de un nombre de proyecto de código —el guion y el sufijo de rol, presentes en las cuatro formas sin excepción—, la aclaración de que el monoespaciado es ayuda de lectura y no el mecanismo, la **prohibición** de construcciones que fusionen los dos términos como «el proyecto SelfHosted-Web», y la consecuencia asumida de que los dos términos compartan prefijo, que el agente humano evaluó y reafirmó. Motivo: la mitigación estaba reportada pero no declarada ni aplicada, y una mitigación no declarada es una costumbre. Cierra **P2-2**. | Orquestador SDD |
| 1.2 | 2026-07-28 | Actualización de §17: los cuatro títulos de bloque pasan a citar el nombre del proyecto de código en monoespaciado, que es donde la ausencia de la convención estaba más expuesta por convivir con prosa que habla de proyectos SelfHosted. Cierra **P2-2**. | Orquestador SDD |
| 1.2 | 2026-07-28 | Actualización de la subsección «Cuarta pasada»: se declara qué títulos se calificaron y cuáles no, con el criterio que explica la asimetría —si del título se deriva un ancla en uso—, y su coherencia con las decisiones ya tomadas sobre el título de E-4 y la ubicación de §19. Cierra **P2-3**. | Orquestador SDD |
| 1.2 | 2026-07-28 | Actualización de §12: se declara la excepción al monoespaciado en las filas donde el nombre de código es el **valor de un campo declarado** —`Nombre-Proyecto` en §13 y en las cuatro tablas de identidad de §17—, que quedan sin formato porque §13 es la fuente del manifiesto derivado y su tabla no se toca: darle formato sólo a §17 haría que las dos declaraciones del mismo dato dejaran de coincidir. Detectado al aplicar el monoespaciado de **P2-2**; se declara en lugar de dejarlo como inconsistencia silenciosa. | Orquestador SDD |
| 1.2 | 2026-07-28 | Corrección de §12, regla léxica: declaraba que el nombre de proyecto de código lleva «guion y sufijo» y que el guion está «sin excepción», cuando el documento usa **dos separadores** para las mismas cuatro unidades —guion en el `Nombre-Proyecto` y punto en el `nombre-proyecto-codigo`, según el perfil de convención que §13 ya declara—. El discriminador pasa a ser el **sufijo de rol**, que sí está en las dos formas sin excepción, y los dos separadores figuran como formas legítimas con su remisión a §13; la prohibición de fusionar los términos se extiende explícitamente a las dos. No cambia la decidibilidad de la regla: corrige una frase que se presentaba como exhaustiva sin serlo, en un texto escrito para aplicarse literalmente. Cierra el **P3** de la sección 21 de la auditoría. | Orquestador SDD |
| 1.2 | 2026-07-28 | Actualización de §12: se declara el **tercer sentido** del término «proyecto» —el emprendimiento, es decir el esfuerzo de construir esta solución— con la tabla de los tres contextos disjuntos en que vive cada uno, la decisión razonada de **no calificarlo** y la consecuencia para los artefactos downstream, que deben dejarlo sin calificar en contexto de proceso. Motivo: al propagar la cuarta pasada a las dos categorías de la Fase A, los dos subagentes encontraron de forma independiente ese sentido en unas dieciocho ocurrencias de documentación ya generada —«el disparador del proyecto», «alcance del proyecto», «unidad de entrega del proyecto», «el proyecto no avanza a la etapa siguiente»— y lo dejaron sin convertir, correctamente. La regla escrita en la cuarta pasada afirmaba que el término desnudo designa siempre el proyecto SelfHosted, lo cual era falso en esos lugares y habría llevado a un subagente a escribir afirmaciones falsas o a resolver la contradicción por su cuenta. Se ajusta también la relación V1 de la subsección de esa pasada, que sostenía la misma afirmación. Verificación asociada: se revisaron las treinta y tres conversiones al término de producto contra esta clase nueva, que ninguna auditoría previa pudo contemplar porque no estaba en la lista de clases; **cero falsos positivos**. | Orquestador SDD |
| 1.2 | 2026-07-28 | Quinta pasada, decidida por el agente humano del proyecto el 2026-07-28: se incorporan al índice de decisiones **D-12**, principio de identidad de objeto, y **D-13**, la higiene del modelo entra al alcance. Se agrega la subsección «Quinta pasada: identidad de objeto e higiene del modelo», con el principio, la **prueba que separa objeto de atributo** aplicada al modelo actual, las cinco consecuencias, el fundamento de la inversión de D-13 —crear separado y después informar, en lugar de preguntar antes—, **las cinco relaciones que la pasada cambia** derivadas antes de aplicarla, y el **límite de alcance** que deja el modelo lógico y el mapeo relacional para la Fase C. | Orquestador SDD |
| 1.2 | 2026-07-28 | Actualización de §4: se agrega la capacidad **F-25**, higiene del modelo, con su tabla de cinco detecciones, la declaración de que ninguna bloquea, y el argumento de su prioridad **Could Have** —ningún flujo de usuario depende de ella, es estrictamente informativa, y es la única capacidad del intake que presupone a otra decisión aplicada—. Origina el cambio: **D-13**. | Orquestador SDD |
| 1.2 | 2026-07-28 | Actualización de §12: se agregan «Objeto con identidad», con la prueba de las tres condiciones, e «Higiene del modelo». El glosario pasa de 36 a 38 términos. Origina el cambio: **D-12** y **D-13**. | Orquestador SDD |
| 1.2 | 2026-07-28 | Actualización de §17.4 P.11: se agrega la fila del principio de identidad de objeto, con la alternativa descartada —vincular por nombre—, el argumento de por qué la prueba de tres condiciones es necesaria para que el principio no degenere, y la declaración de que el modelo lógico de los dos objetos nuevos es materia de la Fase C. Origina el cambio: **D-12**. | Orquestador SDD |
| 1.2 | 2026-07-28 | Actualización de §20.4 (E-4): la forma vinculada de la expresión pasa a llevar el identificador de la **variable** además del del servicio, y se declara que las variables provistas por el sistema no lo llevan porque no son objetos del usuario; el comportamiento del renombrado se extiende a la variable. Origina el cambio: **D-12**, consecuencia 1. | Orquestador SDD |
| 1.2 | 2026-07-28 | Actualización de §20.9 (E-9): se declara, en un bloque acotado y sin diseñar columnas, **qué** elementos pasan a ser objetos —el secreto y la red del proyecto— con la prueba que lo justifica, qué sigue siendo atributo y por qué, la extensión del vínculo a la variable, y la baja de la exigencia de clave única en `variables_proyecto`. El bloque declara explícitamente que el mapeo relacional, las claves, los índices y la migración son materia de la Fase C. Origina el cambio: **D-12**. | Orquestador SDD |
| 1.2 | 2026-07-28 | Actualización de §20.16 (E-16): RN-01 declara que su unicidad se exige porque el nombre es el alias DNS y no porque identifique; RN-28 se reformula y **deja de exigir clave única** para las variables compartidas, acotando la unicidad a la clave de variable de servicio; RN-33 extiende el renombrado sin roturas a la variable; y se agregan RN-35 (relaciones por identidad), RN-36 (sufijo automático más aviso al instanciar) y RN-37 (las cinco detecciones de higiene, ninguna bloqueante). El catálogo pasa de 34 a 37 reglas. Origina el cambio: **D-12** y **D-13**. | Orquestador SDD |
| 1.2 | 2026-07-28 | Actualización de §20.22 (E-22): T-42 cambia de objeto —una clave compartida duplicada deja de rechazarse y pasa a advertirse— y se agregan T-58 a T-63, que cubren el renombrado de variable sin roturas, dos compartidas homónimas, el sufijo automático al instanciar, y las tres advertencias de higiene. El anexo pasa de 58 a 64 casos. Origina el cambio: **D-12** y **D-13**. | Orquestador SDD |
| 1.2 | 2026-07-28 | Actualización de §19: se cierran las **dos pendientes de instanciación**, con la tabla que declara cómo se cerró cada una —la de la clave compartida desaparece por modelo, la del nombre de servicio se resuelve con sufijo automático más aviso— y con el registro del descarte de generar un alias distinto del nombre visible, por la divergencia que produciría entre el lienzo y lo que el motor resuelve. Las pendientes pasan de siete a cinco. Origina el cambio: **D-12** y **D-13**. | Orquestador SDD |
| 1.2 | 2026-07-28 | Corrección detectada por el barrido por afirmación de la propia quinta pasada, relación R2: la tabla `variables_proyecto` de §20.9 conservaba la clave única `(proyecto_id, clave)`, que contradice la consecuencia 3 de D-12 y la reformulación de RN-28. Se elimina, con el comentario que declara por qué y que remite a la advertencia de RN-37 para el caso en que además coincidan los valores. Se ajusta también el tiempo verbal de la consecuencia 1, que describía el estado previo en presente. | Orquestador SDD |
| 1.2 | 2026-07-28 | Corrección de §20.2 (E-2), §20.4 (E-4) y §20.22 (T-51) tras la sección 23 de la auditoría: las referencias persistidas llevaban sólo el identificador del servicio, contra la consecuencia 1 de D-12, que estaba declarada y sin aplicar en ningún ejemplo. Las expresiones pasan a la forma vinculada completa —`${{ shared.TZ#701 }}`, `${{ db#103.POSTGRES_USER#731 }}`, `${{ PUERTO_HTTP#718 }}`—, y las variables de E-2 exhiben su identificador para que el vínculo sea trazable. Cierra **P1-1**. | Orquestador SDD |
| 1.2 | 2026-07-28 | Actualización de §20.4 (E-4): se declara que la plantilla del catálogo y la descripción de un flujo de la interfaz usan la forma **legible** aunque parezcan persistir una referencia, y por qué —en una plantilla los objetos apuntados no existen todavía; en un flujo se muestra lo que el usuario ve—, para que la ausencia de vínculo en E-6 y E-10 no se lea como resto. Detectado por el barrido por forma. Origina el cambio: **D-12**. | Orquestador SDD |
| 1.2 | 2026-07-28 | Actualización de la subsección de la tercera pasada: se incorpora al método escrito el **barrido por forma**, con el caso que lo motivó. El barrido por afirmación cubre prosa; un ejemplo de instancia no afirma nada, exhibe una forma, y ningún barrido por predicado lo alcanza. Toda pasada que cambie la forma de un dato debe barrer además el patrón viejo en los ejemplos. Motivo: es el punto ciego que la quinta pasada dejó ver. | Orquestador SDD |
| 1.2 | 2026-07-28 | Corrección de §20.9 (E-9): se repone el índice `ix_variables_proyecto_proy` sobre `variables_proyecto(proyecto_id)`, que la eliminación de la clave única se había llevado y que sirve la consulta ya declarada —las compartidas se listan y se buscan siempre dentro de un proyecto—. Es reposición, no diseño. Cierra **P2-1**. | Orquestador SDD |
| 1.2 | 2026-07-28 | Corrección de la prueba de objeto contra atributo de D-12: la segunda condición pasa de «sobrevive al objeto que lo contiene» a «sobrevive al **objeto que lo contiene**», porque en este documento «contenedor» significa contenedor Docker y con esa lectura la condición contradecía a I6, RN-09 y RN-10. Se reclasifica en consecuencia: la **declaración de montaje** es atributo, y el **volumen o directorio al que apunta** es objeto por la prueba, hoy no modelado —sólo se guarda su nombre dentro del JSON—, lo que deja un volumen conservado sin entidad que lo represente; modelarlo es materia de la Fase C, junto con el secreto y la red. Cierra **P2-2**. | Orquestador SDD |
| 1.2 | 2026-07-28 | Actualización de §19: F-25 se incorpora a la pendiente de asignación de alcance, junto a F-23 y F-24, que es donde su propia nota de §4 la ubicaba. Cierra **P2-3**. | Orquestador SDD |
| 1.2 | 2026-07-28 | Corrección del **enunciado canónico replicado** de D-12 tras la sección 24 de la auditoría: la condición se había reformulado en la prueba —«sobrevive al objeto que lo contiene»— y no en sus cinco réplicas, que seguían con «sobrevive a su contenedor», la formulación que el propio párrafo declara defectuosa. Se alinean el índice de decisiones, el enunciado del principio, el glosario, §17.4 P.11 y **RN-35**, que es la regla con la que la Fase C va a clasificar los elementos todavía no modelados. Cierra **P1-1**. | Orquestador SDD |
| 1.2 | 2026-07-28 | Corrección de §20.4 (E-4), celda de la forma vinculada: su prosa citaba el identificador `#77`, que no existe en el documento desde que el ejemplo se alineó a `#731`. Cierra **P2-1**. | Orquestador SDD |
| 1.2 | 2026-07-28 | Actualización de §20.4 (E-4): se declara que una variable provista por el sistema **nunca lleva identificador, ni la del propio servicio ni la de otro**, porque su clave la fija el sistema y no se renombra; y que el servicio que la expone sí lo lleva, porque ése sí se renombra. La declaración anterior sólo cubría el caso del propio servicio. Cierra **P2-2**. | Orquestador SDD |
| 1.2 | 2026-07-28 | Corrección de §20.4 (E-4): el bullet que enumeraba «dos lugares» donde la forma legible es correcta pasa a enumerar **cuatro clases** —dos contextos y dos destinos—, incluida la variable provista de otro servicio, que el auditor encontró y que la enumeración no cubría. Motivo: quien calibre una consulta de barrido por forma contra ese bullet marcaría como resto algo correcto. Cierra **P3-1**. | Orquestador SDD |
| 1.2 | 2026-07-28 | Actualización de la subsección de la tercera pasada: se incorpora al método escrito la **cuarta disciplina de barrido —enumerar las réplicas por identificador de decisión—**, con el diagnóstico de por qué las tres anteriores no la alcanzan: el intake replica sus enunciados a propósito, y una réplica desalineada sigue siendo prosa correcta. Se agrega la **advertencia para la Fase B**: el problema escala con la cantidad de artefactos y la Fase B lo multiplica por doce categorías (desde la versión 2.2 ya no por cuatro proyectos de código, porque hay uno solo). Motivo: es la cuarta superficie de defecto que estas pasadas dejaron ver. | Orquestador SDD |
| 1.2 | 2026-07-28 | Actualización de «Trazabilidad downstream»: se agrega la fila que declara su **lectura inversa** —índice de propagación, no sólo de origen—, para que el orquestador de la Fase B sepa qué artefactos revisar cuando un enunciado del intake cambia de forma. Origina el cambio: la advertencia de la cuarta disciplina de barrido. | Orquestador SDD |
| 2.0 | 2026-07-28 | **Migración al conjunto normativo 4.0 del Framework SDD.** Sube major porque la nomenclatura con la que este documento se venía emitiendo deja de cumplir: las invariantes D4 y D5 se reformularon, y el archivo vivo pasa a llevar su nombre lógico estable sin sufijo de versión, con la versión declarada en la cabecera. El archivo pasa a llamarse `SOLUTION-INTAKE-SelfHosted-Service-Core.md` y la versión 1.2 queda archivada en `SDD/Intake/_legacy/2026-07-28/`. La cabecera declara la plantilla aplicada 1.4 en lugar de la 1.3. Origina el cambio: la entrada 4.0 del changelog del framework. **Ninguna decisión de producto, regla de negocio, capacidad, umbral, caso límite ni carga de anexo se modificó en esta versión.** | Orquestador SDD |
| 2.0 | 2026-07-28 | Incorporación de la sección «Migración al Framework SDD 4.0», con el motivo de la migración, la tabla de qué se cambió y su respaldo normativo, la definición del marcador nuevo `[FA]`, lo que ocurre al reejecutar el orquestador —caso «sin procedencia» de la fase de reconciliación, con regenerar como salida coherente— y lo que la migración deliberadamente no hizo: no tocar `SDD/Docs/`, no completar a mano el bloque de procedencia del manifiesto, y no reubicar §19. | Orquestador SDD |
| 2.0 | 2026-07-28 | Emisión de la **tabla de contenido obligatoria** inmediatamente después de la cabecera, con las secciones de primer y segundo nivel y con los veintidós escenarios de la Parte D listados por identificador. Motivo: la plantilla 1.4 la exige y `Intake-Rules.md` 2.1 §5 la valida; un intake de más de cuatro mil líneas no es navegable sin índice, ni por el humano ni por el agente que lo lee por partes. | Orquestador SDD |
| 2.0 | 2026-07-28 | Normalización de la **Parte D** al formato de cinco piezas de la plantilla 1.4. Cada uno de los veintidós anexos declara ahora sus bloques de **contexto**, **qué ejercita** y **qué verificar**, además de la procedencia y la carga que ya declaraba, y su `Estado` pasa al enum cerrado. El preámbulo de la Parte D publica la tabla de conversión de los estados anteriores —«propuesto» y «verificado»— al enum, declara que los valores de instancia de E-1 a E-18 son `reconstruido` y declara la divergencia de orden: los cuatro bloques se emiten contiguos al encabezado de cada anexo, porque varios contienen más de una carga y un bloque de verificación al final quedaría ambiguo. **Ninguna carga se reescribió y ninguna afirmación cambió**: se agregó lo que faltaba y se explicitó lo que estaba disperso en la prosa. Origina el cambio: `Intake-Rules.md` 2.1 §5, que valida la Parte D por primera vez. | Orquestador SDD |
| 2.0 | 2026-07-28 | Incorporación de la **Parte E**, que no existe en la plantilla y es propia de esta solución: §22 consolida los cinco documentos de `00-Contexto` con todos sus identificadores emitidos, §23 consolida las ocho necesidades con su grafo, sus cuarenta y cuatro criterios de éxito, sus treinta y seis casos de uso previstos y sus siete decisiones de recorte con su argumento, y §24 consolida el estado al cierre de la Fase A: las dieciséis especificaciones derivadas con su estado de revisión, la matriz de navegadores como única pendiente que espera decisión, los tres objetos declarados y no diseñados que la Fase C recibe como trabajo propio, y las precauciones y hallazgos que la fase deja asentados. Motivo: es el objetivo de la migración. Sin esta parte, regenerar bajo el conjunto vigente descartaría el trabajo de la Fase A en lugar de conservarlo. Todo su contenido va marcado `[FA]`. | Orquestador SDD |
| 2.0 | 2026-07-28 | Actualización de §19: el checklist incorpora los ítems de la Parte D que exige la plantilla 1.4 —los cuatro bloques por escenario, el enum de estado y la declaración de los valores reconstruidos—, más el ítem de navegabilidad y los tres de la Parte E. La tabla de especificaciones de integración incorpora su **estado de revisión**, con DI-01 y DI-03 aprobadas y catorce sin revisar, remitiendo a §24.1. La tabla de observaciones de auditoría no aplicadas registra que las tres que remitían su reevaluación a una versión 1.3 se reevaluaron en esta versión y se sostienen, porque la tabla de contenido nueva cita las veintidós anclas y romperlas ahora costaría más que antes. | Orquestador SDD |
| 2.0 | 2026-07-28 | Actualización de «Procedencia de este intake y convención de marcadores» con el marcador `[FA]`, y de «Trazabilidad downstream» con las tres filas de la Parte E. El manifiesto derivado pasa en la misma intervención a su nombre lógico estable, `SOLUTION-MANIFEST-SelfHosted-Service-Core.md`, con su puntero a este documento actualizado; su bloque de procedencia del framework **no se completa a mano**: lo emite el orquestador al re-derivarlo, y declararlo ahora afirmaría que el árbol existente se generó bajo el conjunto 4.0, que es falso. | Orquestador SDD |
| 2.0 | 2026-07-28 | Pasada de verificación de coherencia de la Parte E contra sus fuentes, a pedido del agente humano del proyecto. Se auditaron las treinta y ocho secciones de los dieciséis documentos que la Fase A generó y se repusieron los dos huecos que la auditoría encontró: la **definición de terminado y la de listo habían quedado transcriptas en prosa, sin sus identificadores DoD-01 a DoD-12 y DoR-01 a DoR-12**, que son la forma en que las categorías de plan de sprint y de calidad las citan, y ahora vuelven a ser tablas con identificador; y faltaban cinco bloques que ninguna otra sección cubría: los **criterios de transición entre fases**, las **alternativas para plataformas no soportadas** con la regla de cierre de la matriz, la **verificación prevista por plataforma**, los **roles con su autoridad** y las **seis ceremonias** disparadas por evento. Se agregaron además §23.5 con los dolores específicos que cada necesidad declara resolver y las responsabilidades por necesidad, el estado objetivo a tres años con lo que se posterga, la lectura de las restricciones en clave de alcance, y el término de glosario «motor de contenedores», que la Fase A incorporó y que §12 no tiene. Verificado por conteo de identificadores contra las fuentes: OBJ 5, DV 5, RE 12, OP 7, EN 7, CA 10, CP 9, AT 28, DoD 12, DoR 12, épicas 22, NB 8, criterios de éxito 44, casos de uso previstos 36 y capacidades 20, todos presentes. | Orquestador SDD |
| 2.1 | 2026-07-29 | Actualización de la cabecera e incorporación de la sección «Identidad de la solución»: respuesta a la decisión **D-F** del agente humano del proyecto, elevada por el orquestador durante la fase de validación de intake. El campo único «Nombre de la solución», que tenía por valor `SelfHosted.Service.Core` —un nombre de artefacto de código ocupando un campo de negocio—, se sustituye por cuatro campos con consumidores distintos: **nombre de producto** `SelfHosted Service`, `Nombre-Solucion` `SelfHosted-Service`, `NombreSolucionCodigo` `SelfHosted.Service.Core` y artefacto de agrupación `SelfHosted.Service.Core.sln`. La sección nueva declara qué consume cada identidad, por qué el caso monolítico 1:1:1 hacía fácil confundirlas y cuál es la frontera para la generación: las categorías de nivel solución nombran el producto, las categorías por proyecto de código nombran unidades de compilación. Motivo: `Master-Prompt.md` §13.2. | Orquestador SDD |
| 2.1 | 2026-07-29 | Renombrado del documento a `SOLUTION-INTAKE-SelfHosted-Service.md`: respuesta a la decisión **F-1 (b)** del agente humano del proyecto. Con el nombre de producto declarado, la derivación de `Master-Prompt.md` §3.2 aplicada a «SelfHosted Service» da el slug `SelfHosted-Service`, y se sigue la derivación en lugar de declarar el slug estable, de modo que la regla del framework se cumple sin excepción local. El manifiesto derivado se renombra en la misma operación. La versión 2.0 queda archivada en `SDD/Intake/_legacy/2026-07-29/SOLUTION-INTAKE-SelfHosted-Service-Core-v2.0.md`, con su bloque de archivado, y conserva el nombre viejo porque es el estado en que ese nombre era el vigente. | Orquestador SDD |
| 2.1 | 2026-07-29 | Actualización de §13, perfil de convención de nombres de código: respuesta a las decisiones **D-E** y **D-F**. `NombreSolucionCodigo` pasa del truncado `SelfHosted` a la identidad de código completa `SelfHosted.Service.Core`, y en consecuencia los cuatro nombres de código resultantes pasan a `SelfHosted.Service.Core.Web`, `.Application`, `.Infrastructure` y `.Domain`. Se agrega el parámetro de artefacto de agrupación, que el framework no modela y que fijaba el nombre del archivo de solución en ninguna fuente. Se agrega el párrafo que declara que los dos planos de nombres son independientes por diseño: el `Nombre-Proyecto` conserva su forma corta y gobierna la documentación; el `nombre-proyecto-codigo` gobierna `/src`. Es la sub-decisión **E-1 (a)**. La nota de proyectos de prueba adopta la raíz nueva, que es la sub-decisión **E-2 (a)**. | Orquestador SDD |
| 2.1 | 2026-07-29 | Actualización de §16: el árbol del repositorio declara el archivo de solución `SelfHosted.Service.Core.sln` en la raíz, que hasta ahora no existía en ninguna fuente, y sus directorios de `/src` y `/tests` toman los nombres de código nuevos. Se agregan dos párrafos: el que declara que los espacios de nombres replican la ruta bajo la identidad de código nueva, con la consecuencia de que la regla de aislamiento del cliente del motor se lee en el `using`; y el que declara que `SDD/Maquetas/SelfHosted-Service/` usa el `Nombre-Proyecto` a propósito, por pertenecer al plano de documentación. Origina el cambio: **D-E** y **D-F**. | Orquestador SDD |
| 2.1 | 2026-07-29 | Actualización de §12, tabla léxica: la fila del nombre de proyecto de código deja de describir una raíz única `SelfHosted` con dos separadores y pasa a describir dos formas que difieren en raíz y en separador. El párrafo del discriminador se precisa: el discriminador es el sufijo de rol, no la raíz ni el separador, y se declara que esa propiedad es la que hizo que el cambio de raíz de D-E no rompiera la regla léxica. Motivo: sin esta corrección la regla de desambiguación de «proyecto», que es la cuarta pasada del documento, quedaba describiendo nombres que ya no existen. | Orquestador SDD |
| 2.1 | 2026-07-29 | Actualización de las cuatro tablas de identidad de §17.1 a §17.4 y de la prosa de §14, §16.1 y §17: las cuarenta y cinco ocurrencias de los nombres de código viejos —`SelfHosted.Web`, `SelfHosted.Application`, `SelfHosted.Infrastructure`, `SelfHosted.Domain` y los tres proyectos de prueba— pasan a la raíz nueva. Incluye el campo `nombre-proyecto-codigo` de los cuatro bloques técnicos, las reglas de aislamiento que citan `SelfHosted.Service.Core.Infrastructure/Contenedores/` y las referencias a las baterías de contrato entre capas. Origina el cambio: **D-E** y **D-F**. Ningún `Nombre-Proyecto` cambió. | Orquestador SDD |
| 2.1 | 2026-07-29 | Actualización de §17.1 P.9: respuesta a la decisión **D-D** del agente humano del proyecto. La fila de navegador deja de ser el supuesto «navegador de escritorio con soporte de WebSockets **[S]**» y declara **Google Chrome de escritorio, canal estable, versión mínima 150.0.7871.186 [E]**, con toda otra familia declarada no soportada. Se agrega la fila del **sistema operativo del cliente**, Windows Server 2022 21H2 build 20348.5256 **[E]**, que declara un tercer eje de plataforma que el intake no tenía: el del equipo desde el que se opera el panel, único de los tres que es Windows y que no contradice que ejecución y desarrollo sigan siendo Linux. Se agregan la evidencia de `chrome://version`, el fundamento de por qué la fila pesa más bajo Interactive Server, el criterio verificable para los guiones de demostración y los tres componentes del riesgo que la decisión no elimina. | Orquestador SDD |
| 2.1 | 2026-07-29 | Actualización de la sección «Supuestos registrados por este intake y su estado» y de §19: los dos marcadores `[S]` sin número que seguían abiertos quedan cerrados, con lo que no queda ningún `[S]` abierto en el documento. Las dos tablas de pendientes actualizan la fila de la matriz de navegadores a cerrada, el ítem de checklist de §24 declara su resolución, y la nota de los tres registros de lo no cerrado declara que la superposición se cerró en los dos registros por la misma decisión. Las filas no se borran: otras secciones las citan y el registro de que existieron como pendientes es parte de la trazabilidad. Quedan cuatro pendientes abiertas, todas resolubles en la categoría que las necesita. | Orquestador SDD |
| 2.1 | 2026-07-29 | Anotación de §22.5 y de §24.2, ambas de la Parte E: el material **[FA]** que declaraba la matriz de navegadores como brecha abierta se conserva sin modificar, porque es el registro de lo que la Fase A previa afirmaba, y recibe una anotación fechada que declara que la brecha se cerró y remite a §17.1 P.9 como fuente. El análisis de §24.2 se conserva íntegro porque sigue siendo válido en lo que no depende de la decisión: los tres componentes del riesgo que ni la red local ni la elección de familia resuelven pasan de brecha de matriz a riesgos abiertos con medición asignada. El título de §24.2 conserva su redacción porque de él se deriva el ancla que otras secciones citan. | Orquestador SDD |
| 2.2 | 2026-07-29 | **Colapso de la composición a un único proyecto de código.** Sube minor y no major porque no cambia ninguna decisión de producto: cambia la unidad de compilación, no lo que la solución hace. Decisión del agente humano del proyecto, tomada tras observar que el producto es un único despliegue —un contenedor, un proceso, un ejecutable— y que ninguna de las cuatro unidades se publicaba ni se consumía por separado, de modo que la frontera de compilación no aportaba capacidad de distribución y arrastraba a la documentación un modelo de cuatro componentes publicables inexistente. La sección «Identidad de la solución» incorpora el bloque que declara la composición nueva, qué cuesta y qué se compensa. | Orquestador SDD |
| 2.2 | 2026-07-29 | Reescritura de §13: pasa de cuatro proyectos de código a uno, `SelfHosted-Service` / `SelfHosted.Service.Core`, `web-monolith`, sin dependencias y de grafo trivial. Se agrega la tabla de los cuatro espacios de nombres internos con su carpeta, sus dependencias y su nivel, que conserva las seis aristas y los cuatro niveles que antes vivían entre proyectos. El perfil de convención suma la fila de `nombre-proyecto-codigo`, que coincide con `NombreSolucionCodigo` sin sufijo, con su fundamento: cualquier sufijo dejaría los espacios de nombres de las capas colgando de él y anidaría el dominio bajo la presentación. Se declara que la solución es el caso degenerado de `Master-Prompt.md` §3.5. | Orquestador SDD |
| 2.2 | 2026-07-29 | Reescritura de §14: la tabla de capas pasa de nombrar proyectos de código a nombrar espacios de nombres, con las mismas responsabilidades y los mismos consumidores. El argumento «por qué esta descomposición y no otra» se reformula: la separación en capas sigue justificada por las mismas dos razones, y lo que la decisión cambió no es que la frontera exista sino quién la hace cumplir. Se agrega la tabla comparativa de qué cambia y qué no entre la versión 2.1 y la 2.2, con la degradación de garantía declarada explícitamente: la violación pasa de error de compilación a test rojo del pipeline. | Orquestador SDD |
| 2.2 | 2026-07-29 | Reescritura de §16: el árbol pasa de cuatro directorios de proyecto bajo `/src` a un único proyecto con las cuatro capas como carpetas de primer nivel, con las mismas subcarpetas que declaraba la fuente. Se declara el espacio de nombres raíz y el caso particular de la capa de presentación, que se reparte en cuatro carpetas y declara explícitamente `SelfHosted.Service.Core.Web` **[D-i]** para que las cuatro capas sean nombrables de forma uniforme por el test de arquitectura y por los filtros de cobertura. `§16.1` reorganiza `/samples` por capacidad demostrada en lugar de por proyecto. La maqueta pasa a `SDD/Maquetas/SelfHosted-Service/`. | Orquestador SDD |
| 2.2 | 2026-07-29 | **Consolidación de la Parte C**: los cuatro bloques §17.1 a §17.4, con sus cuarenta y cuatro subsecciones, se funden en un único bloque §17 con doce secciones P.1 a P.12. Ninguna tabla, ningún umbral, ninguna decisión pre-ADR, ninguna invariante y ningún trade-off se perdió: donde las cuatro capas tenían definiciones distintas —estilo arquitectónico, contratos, NFR, seguridad— el contenido se preserva como sub-bloque rotulado por capa dentro de la P.x correspondiente. Se agrega la tabla de los cuatro espacios de nombres y la nota que declara cómo leer las citas de rutas: una ruta como `SelfHosted.Service.Core.Infrastructure/Contenedores/` denota desde ahora un espacio de nombres y no un directorio de proyecto, lo que permite que la regla de aislamiento de `Requerimientos-Tecnicos.md` §2 **[E]** se siga citando literal. | Orquestador SDD |
| 2.2 | 2026-07-29 | Reposición de las tres garantías que la frontera de compilación daba y que el proyecto único elimina, las tres marcadas **[D-i]** y por lo tanto revisables. **Test de arquitectura** en `SelfHosted.Service.Core.Domain.Tests`, con cuatro reglas: ningún tipo del cliente del motor fuera de `Infrastructure.Contenedores`; ningún tipo de EF Core, del cliente del motor, de ASP.NET Core ni de terceros en `Domain`; ninguno de los tres primeros en `Application`; y la regla de dependencia entre capas. Es gate bloqueante del pipeline (§17.P.8). **Cobertura por filtro de espacio de nombres**: los cuatro umbrales confirmados en S-02 —90/85, 80/70, 60/50 y 55/45— se conservan sin modificar y se verifican por separado, en lugar de promediarse en un único número de ensamblado. **Los tres proyectos de prueba se conservan**, porque son la unidad que organiza la pirámide y la que alimenta los cuatro filtros. | Orquestador SDD |
| 2.2 | 2026-07-29 | Actualización de §12: la entrada de glosario «Proyecto de código» pasa a describir la unidad única y se agrega la entrada **«Capa»**, que es el término que la reemplaza al hablar de una de las cuatro. La regla léxica se reformula: el discriminador deja de ser el sufijo de rol y pasa a ser el punto separador de segmentos, porque ya no hay cuatro nombres de proyecto que distinguir. Se declara por qué la regla sobrevivió a los dos cambios de composición del mismo día. | Orquestador SDD |
| 2.2 | 2026-07-29 | Actualización de §15, §18, §19 y de la tabla de trazabilidad downstream: el orden de construcción de cada corte vertical pasa a nombrar capas; la columna de la tabla de samples pasa de proyecto de código a capa; los ítems de checklist de §13 y §17 se reescriben sobre la composición nueva; y las filas de trazabilidad dejan de sufijar las categorías con un nombre de proyecto, porque el caso degenerado genera `SDD/Docs/` plana y omite `Solucion/`. | Orquestador SDD |
| 2.2 | 2026-07-29 | Anotación de dos tablas de la Parte E, cuyo contenido **[FA]** no se modifica. La matriz por componente de §22.5 recibe la corrección de su columna de componente —nombraba cuatro proyectos de código que dejaron de existir— con la anotación que declara que ninguna plataforma, runtime ni umbral cambió. La tabla de casos de uso previstos de §23 se conserva íntegra con una anotación que declara que su columna derecha designa capas y que la asignación sigue siendo válida, porque qué capa implementa cada caso de uso no depende de cuántos proyectos de compilación haya. | Orquestador SDD |
| 2.2 | 2026-07-29 | **Desvío declarado de la política de deprecación.** La versión 2.1 de este documento **no quedó archivada** en `_legacy/`: el orquestador la editó en su lugar al aplicar el colapso de la composición, sin tomar el snapshot previo que exige `Master-Prompt.md` §5.1. Se declara acá en lugar de dejarlo tácito, porque la política es explícita y el incumplimiento es verificable: `_legacy/2026-07-29/` contiene la 2.0 y no la 2.1. Tres precisiones sobre su alcance. La cadena de estados superados **no tiene hueco de contenido**: la 2.0 está archivada íntegra y esta 2.2 declara en su control de cambios, entrada por entrada, todo lo que la 2.1 introdujo y todo lo que esta versión cambió encima. La 2.1 **nunca fue consumida**: se emitió el mismo día, su confirmación (D-A) nunca se dio, no se generó ningún documento de `SDD/Docs/` bajo ella y ningún artefacto la cita. Y **no es recuperable**: `SDD/` es un árbol sin seguimiento en el repositorio destino, de modo que la 2.1 no existe en ningún objeto de git. La reposición correcta habría sido archivarla antes de editar; queda registrado que no se hizo. | Orquestador SDD |
| 2.3 | 2026-07-29 | **Incorporación del campo `Product Owner` en la cabecera**, que el conjunto normativo 4.1 del Framework SDD agrega al formato del intake. Se completa por derivación de §2 —las tres figuras coinciden en una sola persona— y se marca **pendiente de confirmación**, con la nota que declara el alcance del rol según 4.1 y por qué el framework lo distingue de la categoría de stakeholder «propietario». Motivo de la intervención: 4.1 declara al Product Owner como dueño de la priorización MoSCoW y de las exclusiones, y `Rules-Contexto` 2.1 retira esa autoridad de AG-00; sin el campo declarado, las cinco exclusiones que la Fase A elevó no tendrían destinatario nombrado. No se modificó ninguna otra sección: ninguna decisión de producto, regla de negocio, capacidad, umbral, caso límite ni anexo de datos cambió, y §13 quedó intacto, de modo que no corresponde re-derivar el manifiesto por `Master-Prompt.md` §13.7. La versión 2.2 queda archivada en `SDD/Intake/_legacy/2026-07-29/`. | Orquestador SDD |
