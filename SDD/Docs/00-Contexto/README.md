# 00-Contexto — SelfHosted Service

**Proyecto:** SelfHosted Service (`Nombre-Solucion`: `SelfHosted-Service`)
**Documento:** README.md
**Versión:** 1.0
**Estado:** Propuesto
**Fecha:** 2026-07-29
**Autor:** Product Manager Senior (AG-00)
**Trazabilidad upstream:** SOLUTION-INTAKE-SelfHosted-Service (Parte A completa, §15, §17.P.9, §17.P.10, Parte E §22, §24), SOLUTION-MANIFEST-SelfHosted-Service §1 y §2
**Trazabilidad downstream:** 01-Necesidades-Negocio, 02-Especificacion-Funcional, 03-UX-UI-DX, 05-Arquitectura-Tecnica, 06-Backlog-Tecnico, 07-Plan-Sprint, 08-Calidad-Y-Pruebas, 09-Devops, 10-Examples, 11-Documentacion

---

## Tabla de contenido

- [§1. Qué contiene esta carpeta](#1-qué-contiene-esta-carpeta)
- [§2. Documentos y orden de lectura](#2-documentos-y-orden-de-lectura)
- [§3. Decisiones de inclusión y de omisión](#3-decisiones-de-inclusión-y-de-omisión)
  - [§3.1 Los dos documentos generados por decisión declarada](#31-los-dos-documentos-generados-por-decisión-declarada)
  - [§3.2 Documentos omitidos](#32-documentos-omitidos)
- [§4. Stakeholders](#4-stakeholders)
- [§5. Convenciones que esta categoría fija para toda la cadena](#5-convenciones-que-esta-categoría-fija-para-toda-la-cadena)
- [§6. Brechas abiertas consolidadas](#6-brechas-abiertas-consolidadas)
- [Control de cambios](#control-de-cambios)

---

## §1. Qué contiene esta carpeta

Esta carpeta es el punto de entrada de la especificación de SelfHosted Service y el inicio de la cadena de trazabilidad. Contiene el porqué del producto, qué entra y qué no entra en la construcción, en qué orden se entrega, sobre qué plataformas corre y cómo trabaja el equipo que lo construye.

Ninguna categoría posterior debería tener que volver al intake para responder esas cinco preguntas. Sí debe volver al intake para todo lo demás: reglas de negocio, contratos, esquema de datos, maquetado y anexos de ejemplos.

Los cinco documentos se generaron a partir de `SOLUTION-INTAKE-SelfHosted-Service` versión 2.2 y toman como insumo el consolidado de la Fase A previa transcripto en la Parte E de ese documento. Se reverificaron contra la versión 2.3 del intake, que incorpora el campo `Product Owner` en su cabecera y no modifica ninguna otra sección: ninguna capacidad, prioridad, exclusión, umbral ni anexo cambió, de modo que nada de esta carpeta queda superado por esa versión. Ese consolidado es insumo de la regeneración y no su resultado: sus identificadores se conservan porque hay artefactos y decisiones que ya los citan, y su contenido se consume como propuesta previa salvo donde la propia Parte E declara que el agente humano del proyecto se pronunció.

---

## §2. Documentos y orden de lectura

| Orden | Documento | Propósito | Versión | Estado |
| --- | --- | --- | --- | --- |
| 1 | [Vision-Producto.md](Vision-Producto.md) | Por qué existe el producto, quiénes son sus stakeholders, qué promete, qué objetivos numéricos persigue, contra qué restricciones y con qué riesgos. Incluye el glosario del dominio | 1.0 | Propuesto |
| 2 | [Alcance-Proyecto.md](Alcance-Proyecto.md) | Qué capacidades entran, cuáles quedan explícitamente afuera y por qué, con qué supuestos, entregables, ambientes y criterios de aceptación, y cómo se gestiona un cambio de alcance | 1.0 | Propuesto |
| 3 | [Roadmap-Producto.md](Roadmap-Producto.md) | En qué orden se entrega: cinco fases, sus épicas, sus etapas, sus dependencias y los criterios verificables de transición entre fases | 1.0 | Propuesto |
| 4 | [Compatibilidad-Plataformas.md](Compatibilidad-Plataformas.md) | Sobre qué plataformas corre, se construye y se opera el producto, con versiones mínimas y motivos, y qué riesgos de plataforma quedan abiertos | 1.0 | Propuesto |
| 5 | [Acuerdo-Equipo.md](Acuerdo-Equipo.md) | Cómo trabaja el equipo: roles y autoridad, ceremonias, veintiocho acuerdos verificables, definición de terminado y definición de listo | 1.0 | Propuesto |

El orden de la tabla es el orden de lectura sugerido, y es también el de dependencia: el alcance se entiende después de la visión, el roadmap ordena lo que el alcance declaró, y los dos últimos documentos son transversales a los tres primeros.

Un lector que sólo necesite entender por qué existe el producto puede leer Visión de Producto §1, §3 y §9. Un lector que vaya a planificar necesita además Alcance del Proyecto §4 y §5, y el Roadmap completo.

---

## §3. Decisiones de inclusión y de omisión

### §3.1 Los dos documentos generados por decisión declarada

Las reglas constructivas de esta categoría marcan dos de los cinco documentos como recomendados, y no obligatorios, para el tipo de proyecto de código de esta solución y para un equipo de dos personas. Los dos se generaron igual, por decisión declarada. El motivo se registra acá porque la regla general exige justificar la omisión, y esta carpeta hace lo contrario: justifica la inclusión.

| Documento | Qué dice la regla por defecto | Por qué se generó igual |
| --- | --- | --- |
| Compatibilidad-Plataformas.md | Recomendado para el tipo de proyecto de código de esta solución, y omitible salvo soporte a navegadores heredados | El intake declara una matriz restrictiva con versiones mínimas concretas —una única familia de navegador de escritorio con piso de versión, un sistema operativo de ejecución, un sistema operativo del equipo del administrador y la red local como condición—, y las categorías 08-Calidad-Y-Pruebas y 09-Devops necesitan esa matriz consolidada en un solo lugar para derivar sus verificaciones sin recorrer bloques técnicos. Además, la matriz no elimina tres componentes del riesgo del canal entre navegador y servidor, que sin este documento se perderían entre la puerta técnica y la categoría de calidad |
| Acuerdo-Equipo.md | Recomendado para equipos de dos personas que coordinan con stakeholders externos | El cliente ya tenía cerrado un acuerdo operativo completo: veintiocho reglas de trabajo `AT-01` a `AT-28`, una definición de terminado `DoD-01` a `DoD-12` y una definición de listo `DoR-01` a `DoR-12`, todas con identificador emitido y citadas por las categorías 06-Backlog-Tecnico, 07-Plan-Sprint y 08-Calidad-Y-Pruebas. Sin este documento, esas tres categorías tendrían que derivarlo cada una por su cuenta |

### §3.2 Documentos omitidos

Ninguno. Los cinco documentos de la categoría están presentes.

---

## §4. Stakeholders

Los actores se identifican por rol y no por nombre propio. Es una decisión cerrada del agente humano del proyecto del 2026-07-27: el propietario del problema, el lead técnico y el usuario final son la misma persona, de modo que el rol es unívoco. Ningún artefacto downstream debe pedir un nombre propio.

| Rol | Categoría | Dónde está desarrollado |
| --- | --- | --- |
| Dueño del problema y administrador único del servidor de referencia | Propietario | Visión de Producto §2.1 |
| Agente humano del proyecto, en su rol de validación técnica | Propietario | Visión de Producto §2.1; Acuerdo de Equipo §2 |
| Equipo de desarrollo, dos desarrolladores | Implementador | Visión de Producto §2.1; Acuerdo de Equipo §2 |
| Agente IA de codificación: orquestador y subagentes | Implementador | Visión de Producto §2.1; Acuerdo de Equipo §2 |
| Usuario final: administrador de la solución, único usuario con credenciales | Beneficiario | Visión de Producto §2.1 |
| Automatismo de integración continua | Beneficiario | Visión de Producto §2.1 |

No hay financiador externo, ni área a la que rendir resultados, ni actores de auditoría o legales, porque el servicio no sale de la red local y tiene un único usuario.

El Product Owner no figura en esta tabla porque no es una categoría de la tríada de stakeholders sino un rol humano que el framework ubica fuera de la cadena de subagentes, dueño de la priorización y de las exclusiones. La cabecera del intake lo declara desde su versión 2.3, por derivación y pendiente de confirmación: en esta solución coincide con la misma persona que cumple los tres roles de arriba. Es el destinatario de las brechas de §6 que requieren una decisión de producto.

---

## §5. Convenciones que esta categoría fija para toda la cadena

Tres convenciones que los documentos de esta carpeta aplican y que las categorías posteriores deben respetar:

1. Desambiguación del término «proyecto». «Proyecto SelfHosted» designa el objeto del producto: la arquitectura de servicios contenedorizados con su red y su lienzo, que el usuario crea desde el portal. «Proyecto de código» designa la unidad de compilación del repositorio, que es una sola, y se escribe siempre completo. «Proyecto» a secas designa el emprendimiento: sus etapas, su alcance, sus objetivos y sus criterios de aceptación. En esta categoría el sentido predominante es el tercero. No se admite ninguna construcción que fusione los términos.

2. Uso de las identidades. Los documentos de esta categoría hablan del producto y lo nombran SelfHosted Service. La identidad de código de la solución no aparece en prosa de negocio: es un nombre de artefacto de código, y sólo se cita donde hace falta nombrar la estructura del repositorio o las cuatro capas internas del proyecto de código, como ocurre en Compatibilidad de Plataformas §2.2 y en Acuerdo de Equipo §5.

3. Tratamiento del material heredado y de lo pendiente. El material de la Fase A previa se consume como propuesta y no como requisito cerrado. Las especificaciones derivadas por el integrador se consumen declarándolas revisables. Toda pendiente se declara como brecha con su destinatario, y nunca se resuelve por cuenta propia.

4. Frontera de autoridad de esta categoría. Los documentos de esta carpeta formalizan lo que el intake declara; no arbitran. Ninguna prioridad MoSCoW, exclusión, fecha objetivo, target de métrica ni criterio de transición de fase se origina acá: todos derivan del intake y trazan a su sección de origen, y donde la fuente no se pronuncia se declara la ausencia en lugar de proponer un valor. Las decisiones de producto y las evaluaciones de riesgo son del Product Owner, rol que en esta solución cumple el agente humano del proyecto, y se escalan como brecha en §6. Las categorías posteriores pueden apoyarse en esta frontera: si un dato de esta carpeta no lleva traza a una sección del intake, no es una decisión del cliente.

---

## §6. Brechas abiertas consolidadas

Ninguna brecha de esta lista se resuelve en esta categoría. Se consolidan acá para que la categoría destinataria las encuentre sin recorrer los cinco documentos.

| Brecha | Dónde está declarada | Categoría destinataria |
| --- | --- | --- |
| Confirmación de OBJ-05, el objetivo de escala operable sin degradación | Visión de Producto §5; Alcance del Proyecto §6.3 | Agente humano del proyecto, en el próximo punto de control |
| Asignación de las épicas EP-23, EP-24 y EP-25 —variables compartidas, referencias entre variables e higiene del modelo— a una fase y a un corte vertical | Roadmap de Producto §2.5 y §2.6; Alcance del Proyecto §6.3 | 07-Plan-Sprint, con decisión del agente humano del proyecto |
| Reparto de EP-12, EP-14 y EP-17 entre las fases 2 y 3, y adelanto de EP-15 a la Fase 1 | Roadmap de Producto §2.6 | Agente humano del proyecto, en el próximo punto de control |
| Detección de un literal que duplica un valor provisto por el sistema, y con qué forma | Alcance del Proyecto §6.3 | 03-UX-UI-DX y 02-Especificacion-Funcional |
| Distinción visual entre las aristas que declaran espera y las que no, incluida la arista sin variable | Alcance del Proyecto §6.3 | 03-UX-UI-DX y la maqueta de validación visual |
| Maquetado del paso de clasificación de variables de la adopción y de la pantalla de variables compartidas del proyecto SelfHosted | Alcance del Proyecto §6.3 | 03-UX-UI-DX |
| Modelado de los tres objetos declarados y no diseñados: el secreto, la red del proyecto SelfHosted y el volumen o directorio al que apunta un montaje | Alcance del Proyecto §6.3 | 05-Arquitectura-Tecnica, que recibe la prueba con la que decidir y no la decisión |
| Revisión de las catorce especificaciones de integración `DI-02` y `DI-04` a `DI-16`, aplicadas y sin revisar | Alcance del Proyecto §6.2 | Agente humano del proyecto; consumidas como revisables por 02-Especificacion-Funcional, 05-Arquitectura-Tecnica y 08-Calidad-Y-Pruebas |
| Medición de los tres riesgos abiertos de plataforma RP-01, RP-02 y RP-03 | Visión de Producto §8.2; Compatibilidad de Plataformas §3.2 | 08-Calidad-Y-Pruebas y la puerta técnica PT-01 |
| Confirmación de la asignación de responsable de cada riesgo RG-01 a RG-10 | Visión de Producto §8.1, donde la columna `Responsable` se declara material de la Fase A previa y no evidencia del intake | Agente humano del proyecto en su rol de Product Owner, en el próximo punto de control. Asignar dueño a un riesgo es una decisión organizativa y no una formalización, y ninguna fuente del cliente la declara |
| Evaluación de los tres riesgos abiertos de plataforma RP-01, RP-02 y RP-03: su probabilidad, su impacto y su responsable | Visión de Producto §8.2, donde las tres columnas declaran la ausencia en lugar de proponer un valor | Agente humano del proyecto en su rol de Product Owner. El intake enuncia los tres riesgos y asigna su medición, pero no los evalúa; evaluar un riesgo es una decisión de negocio y esta categoría no la produce |

---

## Control de cambios

| Versión | Fecha | Cambios | Autor |
| --- | --- | --- | --- |
| 1.0 | 2026-07-29 | Versión inicial de la sección, generada bajo el conjunto normativo 4.0 del Framework SDD junto con los cinco documentos de la categoría. Registra en §3.1 que `Compatibilidad-Plataformas.md` y `Acuerdo-Equipo.md` se generaron por decisión declarada y no por la regla de inclusión por tipo de proyecto de código, con su motivo. Declara que no hay documentos omitidos. Consolida en §6 las nueve brechas abiertas con su categoría destinataria | Product Manager Senior (AG-00) |
| 1.0 | 2026-07-29 | Corrección de §6 absorbida dentro de la versión de emisión, sin subir versión, por la política de versionado de `Master-Prompt.md` §5: el documento estaba en estado `Propuesto` y la corrección proviene del audit de su propia fase. Se agrega una décima brecha: la confirmación de la asignación de responsable de los riesgos RG-01 a RG-10, con el agente humano del proyecto como destinatario, derivada de la reatribución de esa columna a material de la Fase A previa. Origen: hallazgo H-01, P1, del informe [`Audit/A-00-01-r1.md`](../Audit/A-00-01-r1.md) | Product Manager Senior (AG-00) |
| 1.0 | 2026-07-29 | Adecuación a `Rules-Contexto` 2.1, absorbida dentro de la versión de emisión, sin subir versión y sin archivar, por la política de versionado de `Master-Prompt.md` §5. §5: se incorpora una cuarta convención, la frontera de autoridad de la categoría, que declara que estos documentos formalizan y no arbitran, que ninguna prioridad, exclusión, fecha objetivo, target ni criterio de transición se origina acá, y que donde la fuente no se pronuncia se declara la ausencia en lugar de proponer un valor. §6: se agrega una undécima brecha, la evaluación de los riesgos abiertos RP-01 a RP-03 —probabilidad, impacto y responsable—, que ninguna fuente declara, con el agente humano del proyecto en su rol de Product Owner como destinatario | Product Manager Senior (AG-00) |
| 1.0 | 2026-07-29 | Reverificación contra la versión 2.3 del `SOLUTION-INTAKE`, emitida mientras esta categoría se corregía, absorbida dentro de la versión de emisión. La 2.3 incorpora el campo `Product Owner` en la cabecera del intake por derivación y pendiente de confirmación, y no modifica ninguna otra sección. Se verificaron contra la versión nueva las dos fuentes sobre las que se apoya el alcance excluido —§4, donde F-18 a F-22 conservan su etiqueta `Won't Have v1`, y §9, con sus siete exclusiones idénticas— y ninguna cambió. §1 registra la reverificación; §4 declara por qué el Product Owner no figura en la tabla de stakeholders y que es el destinatario de las brechas de §6 que requieren una decisión de producto | Product Manager Senior (AG-00) |
