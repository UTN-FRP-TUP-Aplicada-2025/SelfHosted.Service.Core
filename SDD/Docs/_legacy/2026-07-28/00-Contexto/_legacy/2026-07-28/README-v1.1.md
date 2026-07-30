# 00-Contexto — Contexto del producto

**Solución:** SelfHosted.Service.Core (proyecto principal SelfHosted-Web)
**Documento:** README.md
**Estado:** Vigente
**Fecha:** 2026-07-28
**Autor:** Product Manager Senior (AG-00) en conjunción con Analista de Negocio Senior (AG-01)
**Trazabilidad upstream:** SOLUTION-INTAKE v1.2 §2 para los stakeholders de §4, §7 y su tabla de estado de supuestos para las preguntas abiertas de §5, §13 para la identidad de la solución y su composición; SOLUTION-MANIFEST §1 y §2 para el proyecto principal y su tipo, que determinan la variante de especialidad de la categoría
**Trazabilidad downstream:** 01-Necesidades-Negocio, 02-Especificacion-Funcional, 03-UX-UI-DX, 05-Arquitectura-Tecnica, 06-Backlog, 07-Plan-Sprint, 08-Calidad-Y-Pruebas, 09-Devops, 10-Examples, 11-Documentacion

## Tabla de contenido

- [1. Qué contiene esta carpeta](#1-qué-contiene-esta-carpeta)
- [2. Documentos y orden de lectura](#2-documentos-y-orden-de-lectura)
- [3. Declaración de completitud de la categoría](#3-declaración-de-completitud-de-la-categoría)
- [4. Stakeholders](#4-stakeholders)
- [5. Preguntas abiertas que esta categoría deja registradas](#5-preguntas-abiertas-que-esta-categoría-deja-registradas)
- [Control de cambios](#control-de-cambios)

---

## 1. Qué contiene esta carpeta

Esta carpeta es el contexto de producto de la solución completa. Se genera una sola vez a nivel solución, no por proyecto, y es el inicio de la cadena de trazabilidad: no tiene documentos aguas arriba dentro de la especificación, sólo el intake de la solución y el manifiesto derivado de él.

Los cinco documentos responden, en este orden, por qué existe el sistema, qué construye y qué no, en qué secuencia se construye, sobre qué plataformas corre y con qué reglas trabaja el equipo.

## 2. Documentos y orden de lectura

| Orden | Documento | Propósito | Estado |
|---|---|---|---|
| 1 | [Vision-Producto-v1.1.md](Vision-Producto-v1.1.md) | Por qué existe el sistema: problema de negocio, audiencia, propuesta de valor, visión a tres años, objetivos SMART, métricas de éxito, restricciones, riesgos y glosario del dominio | Propuesto |
| 2 | [Alcance-Proyecto-v1.1.md](Alcance-Proyecto-v1.1.md) | Qué entra y qué no entra: capacidades, entregables, ambientes, exclusiones justificadas, supuestos, criterios de aceptación y gestión de cambios de alcance | Propuesto |
| 3 | [Roadmap-Producto-v1.1.md](Roadmap-Producto-v1.1.md) | En qué secuencia se construye: fases, épicas, etapas, dependencias, puertas técnicas y criterios verificables de transición | Propuesto |
| 4 | [Compatibilidad-Plataformas-v1.1.md](Compatibilidad-Plataformas-v1.1.md) | Sobre qué plataformas corre: matriz por componente, versiones mínimas con motivo, restricciones justificadas, alternativas y estado de verificación previsto | Propuesto |
| 5 | [Acuerdo-Equipo-v1.1.md](Acuerdo-Equipo-v1.1.md) | Con qué reglas trabaja el equipo: roles, ceremonias disparadas por evento, ramas, revisión, convenciones, documentación, secretos, definición de terminado y de listo, y herramientas | Propuesto |

Recomendación de lectura para un agente que entra por primera vez: los documentos 1 y 2 son el contexto mínimo para cualquier categoría posterior. El 3 es indispensable para las categorías 06 y 07; el 4 lo es para la 09; el 5 lo es para la 07, la 08 y la 11.

## 3. Declaración de completitud de la categoría

Ningún documento de la categoría fue omitido. Los cinco están generados.

Dos de ellos se generan apartándose de los criterios por defecto, por decisión explícita del humano:

| Documento | Defecto que se deja de lado | Motivo de la decisión |
|---|---|---|
| Compatibilidad-Plataformas-v1.1.md | Las reglas de la categoría lo omiten por defecto para el tipo de proyecto del proyecto principal, salvo soporte a navegadores heredados | El intake declara en los cuatro bloques P.9 de sus proyectos una matriz restrictiva y verificable, con versiones mínimas y motivos, que debe materializarse en un único lugar consolidado del que la categoría 09-Devops pueda derivar la configuración de construcción y despliegue sin recorrer cuatro bloques técnicos. El documento consolida las plataformas de los cuatro proyectos, no sólo las del principal |
| Acuerdo-Equipo-v1.1.md | El documento pasa de recomendado a generado. Las reglas de la categoría lo declaran obligatorio para equipos de más de dos personas y recomendado para equipos de dos que coordinan con stakeholders externos, que es el caso; el umbral del que se aparta la decisión es el del master-prompt, `equipo_n` mayor que 2, no una prohibición de las reglas de la categoría | El intake declara un acuerdo operativo ya cerrado por el cliente: etapas en serie, una rama y un pull request por etapa siendo el pull request el punto de control, convención de mensajes de cambio, etiqueta por etapa cerrada, registro de cambios en la rama de la etapa e informe de cierre de trece secciones como entregable bloqueante. Ese acuerdo condiciona a las categorías 06, 07, 08, 09 y 11, y necesita un lugar único y citable |

## 4. Stakeholders

| Rol | Nombre o cargo | Categoría | Involucramiento |
|---|---|---|---|
| Dueño del problema y administrador único | Propietario del servidor autoalojado de referencia, identificado por rol. S-06 quedó cerrado por identificación de rol el 2026-07-27: no se aportan nombres propios y no se requieren aguas abajo | Propietario | Permanente y decisorio |
| Agente humano del proyecto | El mismo propietario en su rol de validación técnica | Propietario | Permanente y bloqueante: ningún punto de control cierra sin su OK explícito |
| Equipo de desarrollo | Dos desarrolladores | Implementador | Permanente durante la construcción |
| Agente IA de codificación | Orquestador y sus subagentes | Implementador | Permanente durante la construcción |
| Usuario final: administrador de la solución | Único usuario con credenciales de la aplicación | Beneficiario | Diario y operativo |
| Automatismo de integración continua | Flujo de trabajo de integración continua sobre el propio servidor | Beneficiario | Eventual y desatendido |

No hay financiador externo, ni área a la que rendir resultados, ni actores de auditoría o legales: el servicio no sale de la red local y tiene un único usuario.

## 5. Preguntas abiertas que esta categoría deja registradas

Ninguna bloquea la generación de esta categoría, pero las seis condicionan categorías posteriores y su respuesta es del cliente. El registro se actualizó el 2026-07-28: los seis supuestos S-01 a S-06 se habían cerrado el 2026-07-27 y no figuran acá; los casos límite CL-04 y CL-15 y el supuesto IC-05 se cerraron el 2026-07-28 por las decisiones D-1, D-2 y D-3 y dejaron de ser pendientes; y entraron tres preguntas nuevas, las dos de instanciación del catálogo y la ubicación en una fase de las dos capacidades nuevas.

| # | Pregunta | Dónde queda registrada | Qué condiciona |
|---|---|---|---|
| 1 | Qué familias y versiones de navegador se soportan | `Compatibilidad-Plataformas-v1.1.md` §2.2 y `Alcance-Proyecto-v1.1.md` §6.2 | La verificación de compatibilidad de interfaz en 08-Calidad-Y-Pruebas y 09-Devops, y el alcance de lo que 03-UX-UI-DX puede prometer |
| 2 | Qué capacidades componen exactamente los alcances 2 y 3, más allá de los dos anclajes que el intake fija | `Roadmap-Producto-v1.1.md` §2.3 | El armado de épicas de 06-Backlog y la secuencia de 07-Plan-Sprint |
| 3 | Si se adopta como objetivo de negocio la formulación de OBJ-05, que traduce a meta de producto los umbrales de la puerta técnica PT-01 y el dimensionamiento del intake | `Vision-Producto-v1.1.md` §5, nota de origen de los datos | La lectura y el responsable de esa métrica en 08-Calidad-Y-Pruebas. Es una derivación propia de esta categoría, no un dato declarado por el intake |
| 4 | Qué hace la instanciación de un ítem del catálogo cuando un nombre de servicio que trae ya existe en el proyecto destino | `Alcance-Proyecto-v1.1.md` §6.2 | La especificación del caso de uso de alta desde catálogo en 02-Especificacion-Funcional |
| 5 | Qué hace la instanciación cuando la plantilla trae una variable compartida cuya clave ya existe en el proyecto destino | `Alcance-Proyecto-v1.1.md` §6.2 | La misma especificación en 02-Especificacion-Funcional. Elegir mal expone la credencial de un conjunto de servicios a otro |
| 6 | En qué fase y en qué corte vertical entran las capacidades nuevas F-23 y F-24 | `Roadmap-Producto-v1.1.md` §2.4 | La secuencia de etapas de 07-Plan-Sprint. Los diez cortes del primer alcance están cerrados y ninguna de las dos figura entre ellos |

Cerrado y ya no pendiente:

- Los seis supuestos del intake, resueltos el 2026-07-27 y publicados en su tabla de estado: S-01 a S-04 confirmados sin cambios, S-05 resuelto con evidencia verificable en el entorno y S-06 cerrado por identificación de rol.
- La disponibilidad y los tiempos de respuesta, que el SOLUTION-INTAKE §10 registra como restricción del cliente —sin horario core, sin franja comprometida y sin plazo máximo, con el bloqueo del punto de control que no vence—, traducida a regla operativa en `Acuerdo-Equipo-v1.1.md` §4.6.
- Los casos límite CL-04, comportamiento ante la caída de la conexión con un despliegue en curso, y CL-15, secreto en una variable cuyo nombre la heurística no reconoce, cerrados el 2026-07-28 por las decisiones D-1 y D-2 del agente humano del proyecto.
- El supuesto IC-05 sobre la pertenencia de un contenedor adoptado a un solo proyecto, cerrado el 2026-07-28 por la decisión D-3, sin cambio de reglas.

---

## Control de cambios

| Versión | Fecha | Cambios | Autor |
|---|---|---|---|
| 1.0 | 2026-07-27 | Índice inicial de la categoría, con los cinco documentos generados, la declaración de completitud, los seis stakeholders y las cuatro preguntas abiertas registradas | Product Manager Senior (AG-00) con Analista de Negocio Senior (AG-01) |
| 1.0 | 2026-07-27 | Corrección dentro del ciclo de emisión, sin cambio de versión, por el audit `A-00-Contexto-v1.0.md`. P1-01: se regeneraron las tres anclas de la tabla de contenido que no resolvían, conservando tildes y eñes. P2-03: la trazabilidad upstream de la cabecera pasa de nivel de documento a secciones específicas del intake y del manifiesto. P3-03: §3 precisa que el acuerdo de equipo pasa de recomendado a generado y que el umbral del que se aparta es el del master-prompt. El registro de preguntas abiertas de §5 queda sin tocar, a la espera de la decisión del humano sobre el hallazgo P0-01 | Product Manager Senior (AG-00) con Analista de Negocio Senior (AG-01) |
| 1.0 | 2026-07-27 | Cierre de los hallazgos P0-01 y P1-02 del audit `A-00-Contexto-v1.0.md`, sin cambio de versión. §4 deja de tratar S-06 como brecha y lo declara cerrado por identificación de rol el 2026-07-27. §5 declara que la batería de validación de esa fecha cerró los seis supuestos, que por eso no figuran como preguntas abiertas, y que no alcanzó a las cuatro preguntas que sí siguen abiertas; se agrega el registro de lo cerrado, incluido el tiempo de respuesta resuelto en `Acuerdo-Equipo-v1.0.md` §4.6. Se actualizó la referencia al intake a la versión 1.1 en la cabecera | Product Manager Senior (AG-00) con Analista de Negocio Senior (AG-01) |
| 1.0 | 2026-07-27 | Cierre de los hallazgos N-01 y N-08 del re-audit `A-00-Contexto-v2.0.md`, sin cambio de versión. N-01: la nota de cierre de §5 deja de apoyarse en una decisión sin registro y cita la restricción «Disponibilidad y tiempos de respuesta» del SOLUTION-INTAKE v1.1 §10. N-08: §5 incorpora una quinta pregunta abierta, la formulación de OBJ-05 como objetivo de negocio, que estaba marcada para confirmación en `Vision-Producto-v1.0.md` §5 y no figuraba en el registro consolidado; se ajusta el conteo del párrafo de apertura y se agrega a la fila 4 la referencia cruzada a `Alcance-Proyecto-v1.0.md` §6.2 | Product Manager Senior (AG-00) con Analista de Negocio Senior (AG-01) |
| 1.1 | 2026-07-28 | Propagación de las siete decisiones del agente humano del proyecto del 2026-07-28, consolidadas en el SOLUTION-INTAKE v1.2. §2 actualiza los cinco documentos a la versión 1.1. §5 se rehace: salen CL-04, CL-15 e IC-05, cerrados por D-1, D-2 y D-3, y entran tres preguntas nuevas —las dos de instanciación de un ítem del catálogo y la ubicación de F-23 y F-24 en una fase—, con lo que el registro pasa de cinco a seis; la nota de cierre suma las tres pendientes resueltas. Los cinco documentos versionados suben a 1.1 porque ya fueron consumidos por 01-Necesidades-Negocio, y sus versiones 1.0 quedan archivadas en `_legacy/2026-07-28/`; este README no lleva sufijo de versión por aplicación de las reglas de la categoría. Las citas actualizadas son las vivas —cabecera, cuerpo y enlaces navegables—; las filas anteriores de este control de cambios conservan la versión del intake y los nombres de archivo contra los que se trabajó cada día, porque son parte del hecho registrado. | Product Manager Senior (AG-00) con Analista de Negocio Senior (AG-01) |
