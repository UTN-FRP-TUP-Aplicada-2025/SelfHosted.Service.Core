# `_legacy/` de `SDD/Docs/`

Esta carpeta contiene los estados superados del árbol de documentación de la solución, agrupados por fecha de archivado, según la política de deprecación de `Master-Prompt.md` §5 y §5.1.

Cada subcarpeta con fecha es una copia completa y autocontenida del árbol `SDD/Docs/` en el momento del archivado. Su contenido no se modifica nunca: ni sus enlaces, ni sus estados, ni sus nombres. Un registro que se corrige después deja de ser un registro.

| Fecha | Motivo del archivado | Contenido |
|---|---|---|
| `2026-07-28/` | Reconciliación normativa de `Master-Prompt.md` §2.1, caso «sin procedencia», salida B (regenerar desde cero) elegida por el agente humano. El árbol se había generado bajo un conjunto normativo anterior que el manifiesto no declaraba, con la nomenclatura de artefacto vivo con sufijo de versión en el nombre, que dejó de cumplir D4 y D5 con el conjunto normativo 4.0 del Framework SDD | Árbol completo de la corrida anterior: 119 archivos. Categorías de nivel solución `00-Contexto/` y `01-Necesidades-Negocio/` con sus artefactos vivos y sus propios `_legacy/`, los informes de auditoría de la Fase A en `Audit/`, y el esqueleto de carpetas de `Proyectos/` y `Solucion/` sin contenido generado |

## Control de cambios

| Versión | Fecha | Cambios | Autor |
| --- | --- | --- | --- |
| 1.0 | 2026-07-28 | Creación de la carpeta con el archivado del árbol de la corrida anterior a la regeneración bajo el conjunto normativo 4.0. | Orquestador SDD |
