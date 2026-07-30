# Changelog

Todos los cambios relevantes de este repositorio (`SelfHosted.Service.Core`) se documentan acá.
Formato basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/).

## [1.0] - 2026-07-29

Incorporación del corpus documental SDD de la solución **SelfHosted Service** al repositorio destino: 301 archivos bajo `SDD/`, con las Fases A y B cerradas y aprobadas y la Fase B2 —validación visual de maqueta— en ejecución. Hasta esta entrada el repositorio solo tenía `README.md` y `.gitignore`, y **`SDD/` no tenía seguimiento**: todo el árbol vivía únicamente en el disco de trabajo. El propio `Informe-Avance.md` registra el costo de eso —su versión 1.9 se perdió al reemplazar un archivo y no fue recuperable de ningún objeto de git, y hubo que reconstruirla desde el historial de la conversación—, de modo que el efecto principal de este commit no es publicar documentos sino **poner el corpus bajo control de versiones**.

Ningún archivo de código entra en esta entrada: la solución todavía no tiene proyecto compilable. La composición aprobada es **un único proyecto de código**, `SelfHosted.Service.Core`, con las cuatro capas de la Clean Architecture separadas por espacio de nombres y la presentación agrupada bajo una carpeta `Web/`.

### Añadido — superficie de entrada (`SDD/Intake/`)

- **`SOLUTION-INTAKE-SelfHosted-Service.md`** (versión 2.3, estado `Aprobado`, 4794 líneas): qué quiere el cliente, cómo se compone la solución y cómo se construye su proyecto de código. Emitido contra la plantilla `SOLUTION-INTAKE-template.md` v1.4 del conjunto normativo 4.0, con la sección de migración que declara qué cambió respecto de la 1.3. Fija el stack —.NET 10 con Blazor Interactive Server, MudBlazor 9.7.0 y Entity Framework Core sobre SQLite— y la matriz de plataformas: Google Chrome de escritorio estable desde 150.0.7871.186, en red local, operado desde Windows Server 2022 21H2.
- **`SOLUTION-MANIFEST-SelfHosted-Service.md`** (versión 1.7, estado `Vigente`, 185 líneas): artefacto derivado de §13 del intake, fuente canónica de la jerarquía. Es la segunda re-derivación del día y la primera que cambia la composición. Declara que **esta solución es el caso degenerado del framework**: con un único proyecto, `Master-Prompt.md` §3.5 aplana la salida y las doce categorías se generan directamente bajo `SDD/Docs/`, sin subnivel `Proyectos/<Nombre-Proyecto>/` ni carpeta `Solucion/`.
- **Modelo de cuatro identidades** declarado en la cabecera del intake y en §1 del manifiesto, cada una con su consumidor: nombre de producto `SelfHosted Service`, identidad documental `SelfHosted-Service`, identidad de código `SelfHosted.Service.Core` y artefacto de agrupación `SelfHosted.Service.Core.sln`. Hasta la versión 2.0 del intake había un solo campo de nombre, con un nombre de artefacto de código ocupando un campo de negocio.
- **`SDD/Intake/_legacy/`** (17 archivos): las versiones archivadas del intake y del manifiesto de los días 2026-07-27 y 2026-07-28, incluidas las que preceden a la separación de identidades, al colapso de la composición y a la intervención de terminología.

### Añadido — Fase A, generada y aprobada el 2026-07-29

- **`SDD/Docs/00-Contexto/`** (6 archivos, 1487 líneas): `Vision-Producto.md`, `Alcance-Proyecto.md`, `Roadmap-Producto.md`, `Acuerdo-Equipo.md`, `Compatibilidad-Plataformas.md` y el README de la categoría. Los seis pasaron por el catálogo de `Rules-Contexto` §6.1 en la adecuación al conjunto normativo 4.1.
- **`SDD/Docs/01-Necesidades-Negocio/`** (10 archivos, 1394 líneas): `Necesidades-Negocio.md` y sus componentes, con los 44 criterios de éxito verificados contra el inventario de traza.
- **`SDD/Docs/Audit/A-00-01-r1.md`**: informe del audit independiente de la Fase A, **APROBADO CON OBSERVACIONES** y cero P0. Un P1, un P2 y dos P3 fueron corregidos; un P3 se desestimó con evidencia y se resolvió después con la nota al pie que el informe pedía.

### Añadido — Fase B, generada y aprobada el 2026-07-29

- **`SDD/Docs/02-Especificacion-Funcional/`** (94 archivos, 8556 líneas): índice con la matriz NB→CU→RN→US, **36 casos de uso**, **37 reglas de negocio**, modelo conceptual y 18 requisitos complementarios. Cobertura verificada 36/36 y 37/37, sin huecos ni sobrantes.
- **`SDD/Docs/03-UX-UI-DX/`** (23 archivos, 5142 líneas): `Experiencia-De-Uso.md`, `Glosario-UX.md`, README, 16 wireframes y 4 representaciones. **16 superficies especificadas** contra un piso de 4.
- **`SDD/Docs/Audit/B-02-03-r1.md`** (896 líneas junto con el informe de la Fase A): audit de la Fase B, **APROBADO CON OBSERVACIONES** y cero P0, con muestreo declarado. Levanta 6 P1, 5 P2 y 7 P3 sobre la solución, más 2 P1, 3 P2 y 2 P3 sobre el repositorio fuente y el intake. Los seis P1 de la solución quedaron corregidos y verificados por el orquestador sobre el árbol emitido.
- **La categoría `04-Prompts-AI` no se emite**, omitida por gating: `usa_llm` es `false` en el único proyecto de código. La omisión queda registrada con su motivo, no silenciada.

### Añadido — Fase B2, maqueta de validación visual

- **`SDD/Maquetas/SelfHosted-Service/`** (23 archivos, 376 KB): `index.html` como router más 17 páginas HTML que materializan las superficies de 03, tres assets (`assets/css/Estilos-Maqueta.css`, `assets/js/Maqueta.js`, `assets/js/Datos-Maqueta.js`) y un README de 15,4 KB que documenta el criterio de construcción. Se sirve en `http://127.0.0.1:8137/`. El ciclo de corrección está **abierto**: la maqueta entra al repositorio en el estado del paso 5, con la primera observación del agente humano del proyecto ya despachada.

### Añadido — documentos de trabajo del proceso (`SDD/Estado/`)

Cuatro documentos, 2741 líneas. Ninguno es artefacto de las doce categorías y ningún subagente los consume como insumo; viven fuera de `SDD/Docs/` a propósito.

- **`Informe-Avance.md`** (versión 2.8, `Vigente`): registro de la corrida —dónde está parada, las decisiones D-A a D-K del agente humano del proyecto con su trazado, lo ejecutado con su evidencia, los puntos abiertos— y dos anexos de hallazgos sobre el framework. Reconstruido el 2026-07-29 tras la pérdida de la versión 1.9; lo que afirma sobre decisiones es verificable contra el control de cambios del intake y del manifiesto.
- **`Redefinicion-Servicio.md`** (versión 1.15, `Propuesto`): hallazgo de producto detectado durante el paso 5 de la Fase B2 y el análisis de impacto que su corrección requeriría. **No modifica ningún artefacto**; espera decisión del Product Owner.
- **`Fix-Definir-Producto.md`**: agenda de trabajo sobre el estado del framework SDD y sus puntos abiertos, un punto por sección para tratarlos de a uno.
- **`Fix-Ejecución-Glosario-Framework.md`** (versión 1.0, `Propuesto`): orden de trabajo autocontenida para corregir el gobierno del glosario y el criterio de desambiguación léxica **en `IA/IA.SDD`**, el repositorio fuente del framework, que el orquestador de una solución nunca toca. Nace como hallazgo de esta corrida y se ejecuta afuera.

### Añadido — árbol archivado (`SDD/Docs/_legacy/2026-07-28/`)

- **120 archivos** del árbol de documentación anterior. La reconciliación normativa de `Master-Prompt.md` §2.1 se cerró el 2026-07-28 como caso «sin procedencia», salida B: regenerar desde cero. El árbol previo se archivó y **se verificó con `diff -r` antes de vaciar** la carpeta de trabajo.

### Estado al cierre de esta entrada

| Hito | Estado |
|---|---|
| Reconciliación normativa e intake | Cerrados sin bloqueantes |
| Derivación del manifiesto | Cerrada, manifiesto 1.7 `Vigente` |
| Fase A · 00 y 01 | **Corte aprobado** el 2026-07-29, adecuada al conjunto normativo 4.1 |
| Fase B · 02 y 03 | **Corte aprobado** el 2026-07-29, seis P1 corregidos |
| Fase B · 04-Prompts-AI | Omitida por gating (`usa_llm` = false) |
| Fase B2 · validación visual | **En ejecución**, paso 5, ciclo de corrección abierto |
| Proyecto de código | No iniciado |
