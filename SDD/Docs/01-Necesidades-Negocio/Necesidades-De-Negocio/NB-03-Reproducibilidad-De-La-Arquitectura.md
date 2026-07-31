# NB-03 — Reproducibilidad de la arquitectura ante la pérdida del servidor

| Campo | Valor |
| --- | --- |
| Producto | SelfHosted Service |
| Documento | NB-03-Reproducibilidad-De-La-Arquitectura.md |
| Versión | 2.0 |
| Estado | Propuesto |
| Fecha | 2026-07-30 |
| Autor | Analista de Negocio Senior (AG-01) |
| Trazabilidad upstream | PRODUCT-INTAKE-SelfHosted-Service §1, §4 (F-13, F-17), §7 (CL-10), §11 (RG-07), §23.1, §23.3, §23.4, §23.5; Vision-Producto.md §1.2, §4.1, §5 (OBJ-03), §6, §8.1 (RG-07); Alcance-Producto.md §4.1; Roadmap-Producto.md §2.2 (Fase 3), §2.3 (EP-13, EP-17), §2.6 |
| Trazabilidad downstream | CU-09, CU-10, CU-11, CU-12 (previstas en 02-Especificacion-Funcional) |

---

## Tabla de contenido

- [1. Descripción de la necesidad](#1-descripción-de-la-necesidad)
- [2. Ejemplo de uso desde la perspectiva del negocio](#2-ejemplo-de-uso-desde-la-perspectiva-del-negocio)
- [3. Impacto](#3-impacto)
- [4. Problema específico que resuelve](#4-problema-específico-que-resuelve)
- [5. Criterios de éxito](#5-criterios-de-éxito)
- [6. Stakeholders involucrados](#6-stakeholders-involucrados)
- [7. Trazabilidad a CU](#7-trazabilidad-a-cu)
- [8. Dependencias con otras NB](#8-dependencias-con-otras-nb)
- [9. Prioridad MoSCoW](#9-prioridad-moscow)
- [10. Control de cambios](#10-control-de-cambios)

---

## 1. Descripción de la necesidad

El servidor de referencia no tiene redundancia de disco. Toda la arquitectura del parque vive únicamente adentro de ese equipo: en el motor de contenedores y en archivos que no están versionados. Si el disco falla o si el equipo se reinstala, no queda ninguna representación de qué había, cómo se relacionaba y con qué configuración, y la reconstrucción depende de la memoria de una sola persona. El riesgo está evaluado como de probabilidad alta y de impacto alto para el usuario.

La necesidad es que la arquitectura de cada conjunto de servicios exista también fuera del servidor, en una forma que permita reconstruirla. No alcanza con un respaldo de archivos: los archivos que hoy describen partes de la configuración contienen credenciales y no están versionados, de modo que no sirven ni como respaldo ni como documento para compartir. La representación exportada tiene que salir sin secretos y tiene que conservar todo lo que hace falta para volver a levantar el conjunto, incluida la disposición con la que el operador lo lee.

La necesidad incluye además que el respaldo no dependa de que alguien se acuerde de hacerlo. Una exportación manual que se ejecuta cuando el operador tiene tiempo es exactamente el mecanismo que hoy no existe y que nadie garantiza. Por eso la exportación programada hacia un destino externo, que tiene prioridad más baja como capacidad, forma parte de la misma necesidad: es lo que la vuelve confiable.

## 2. Ejemplo de uso desde la perspectiva del negocio

El único disco del servidor falla un martes. El propietario consigue un reemplazo y reinstala el sistema operativo el miércoles. Ahora tiene que volver a levantar los ocho servicios que tenía, con sus direcciones fijas, sus montajes, sus variables y el orden en el que dependían unos de otros. Nada de eso está escrito en ningún lado: reconstruye de memoria, servicio por servicio, y descubre lo que falta cuando algo no arranca.

Lo que necesitaría es tener, en otro equipo, un archivo por conjunto que describa la arquitectura completa y que le permita reimportarla, con los servicios, los enlaces, las direcciones reservadas y la disposición del lienzo tal como estaban, y con los valores de las credenciales en blanco para que él los complete.

## 3. Impacto

- El riesgo de pérdida del servidor deja de ser un riesgo sobre la arquitectura y pasa a ser un riesgo sobre los datos de los servicios, que es un problema distinto y acotado.
- El respaldo deja de depender de la memoria del operador y pasa a ser una capacidad del propio producto.
- La arquitectura de un conjunto se vuelve portable: puede llevarse a otro servidor o compartirse sin filtrar credenciales.
- Si la necesidad queda sin resolver, cualquier reinstalación obliga a reconstruir desde cero, sin documentación, que es exactamente la consecuencia que el intake §1 declara para el caso de no construir el producto.
- La disposición del lienzo, que es conocimiento del operador y no configuración del motor, sobrevive a la reconstrucción.

## 4. Problema específico que resuelve

- No existe ninguna representación de la arquitectura fuera del propio servidor.
- La reconstrucción tras una reinstalación no está documentada y depende de la memoria de una sola persona.
- Los archivos que describen partes de la configuración no están versionados y contienen credenciales, de modo que no sirven de respaldo.
- La disposición con la que el operador lee su arquitectura se perdería en cualquier reconstrucción.
- El respaldo depende de una acción manual que nadie garantiza.

## 5. Criterios de éxito

Ningún criterio usa fecha de calendario. Los plazos se expresan en meses desde el cierre de un alcance o se anclan al cierre de la etapa que entrega la capacidad medida, según la convención del intake §23.3 y el [Roadmap-Producto.md](../../00-Contexto/Roadmap-Producto.md) §2.2. Ninguno de los cinco es derivación.

| Criterio | Métrica | Target | Plazo |
| --- | --- | --- | --- |
| Reproducibilidad de la arquitectura | Proyectos SelfHosted con exportación vigente sobre el total declarado | 100 % de los proyectos SelfHosted, con exportación de antigüedad menor a 7 días | 3 meses desde el cierre del Alcance 3 |
| Fidelidad de la reimportación | Elementos conservados al reimportar una exportación: servicios, enlaces, direcciones, valores compartidos y disposición | 100 % de los elementos | Cierre de la etapa que entrega EP-13, dentro de la Fase 3 |
| Ausencia de credenciales en la salida | Secretos escritos en texto plano en una exportación | 0 secretos, con el archivo de variables emitido vacío | Continuo, desde el cierre de la etapa que entrega EP-13 |
| Cobertura de la traducción sobre el parque real | Configuraciones reales del parque de referencia que la exportación traduce sin pérdida no declarada | 6 de 6 configuraciones | Cierre de la etapa que entrega EP-13 |
| Automatismo del respaldo | Intervalo máximo entre dos exportaciones programadas hacia un destino externo | ≤ 7 días | Continuo, desde el cierre de la Fase 3, que entrega EP-17 |

El primer criterio adopta como propio el objetivo de negocio OBJ-03 de [Vision-Producto.md](../../00-Contexto/Vision-Producto.md) §5, que es dato cerrado confirmado el 2026-07-27. El plazo de los criterios segundo, tercero y cuarto queda anclado a una etapa cuyo orden dentro de la Fase 3 todavía no está declarado: el reparto de EP-13, EP-14 y EP-17 entre las fases 2 y 3 es una brecha abierta registrada en el Roadmap §2.6, con el agente humano del proyecto como destinatario.

## 6. Stakeholders involucrados

| Rol | Nivel | Qué pide o aporta |
| --- | --- | --- |
| Agente humano del proyecto | Propietario | Revisa y aprueba la necesidad, y da el OK explícito del punto de control de la etapa que la entrega |
| Analista de Negocio Senior (AG-01) | Propietario del contenido | Mantiene la necesidad, sus criterios y su trazabilidad, y declara las brechas en lugar de resolverlas |
| Equipo de desarrollo, dos desarrolladores | Implementador | Construye la exportación, la importación, las reglas de traducción y la exportación programada |
| Agente IA de codificación | Implementador | Genera la especificación y, en etapas posteriores, el código de los cortes verticales de portabilidad |
| Propietario del servidor de referencia | Beneficiario | Decide el destino externo del respaldo y valida que una reimportación reconstruya lo que tenía |
| Product Manager (AG-00) | Consultado | Verifica la alineación con la visión y con el alcance declarados |
| Analista Funcional (AG-02) | Consultado | Desarrolla los casos de uso que esta necesidad declara previstos |

El beneficiario que valida es el propietario del servidor, porque el respaldo y su destino son decisiones suyas sobre su propia infraestructura.

## 7. Trazabilidad a CU

| NB | CU prevista | Estado |
| --- | --- | --- |
| NB-03 | CU-09 exportación en formato estándar de composición (capa de presentación) | a generar |
| NB-03 | CU-10 exportación del manifiesto propio, que preserva la disposición (capa de presentación) | a generar |
| NB-03 | CU-11 importación como proyecto SelfHosted nuevo (capa de presentación) | a generar |
| NB-03 | CU-12 ejecución programada de la exportación hacia un destino externo (capa de infraestructura) | a generar |

## 8. Dependencias con otras NB

- Depende de: NB-01, porque no se exporta una arquitectura que no está declarada; y NB-04, porque los valores compartidos del proyecto SelfHosted y las referencias entre variables forman parte de lo que la exportación debe conservar y de lo que no debe filtrar.
- Es prerequisito de: ninguna otra NB.

## 9. Prioridad MoSCoW

Should Have. Agrupa una capacidad Should Have y una Could Have que responden al mismo dolor, y toma la prioridad más alta de las dos: la exportación es la mitigación del riesgo de pérdida del servidor y la programación es lo que la vuelve confiable.

## 10. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 2.0 | 2026-07-30 | Migración normativa del conjunto 4.1 al 6.0, fase M4 corte 2, bajo `Rules-Necesidades-Negocio` 3.1 y `Vocabulario-Rules` 2.1. Clasificación **regenerar contenido** por el salto major de la regla que lo gobierna; fuente de contenido: el documento de origen, archivado en `_legacy/2026-07-30/`. Sube **major** porque la nomenclatura anterior deja de cumplir. Cabecera: la etiqueta `Proyecto` pasa a `Producto` sobre el mismo valor, según `Vocabulario-Rules` §3 y §4 R3; la trazabilidad upstream apunta al `PRODUCT-INTAKE-SelfHosted-Service` renombrado y al artefacto hermano `Alcance-Producto.md`, antes `Alcance-Proyecto.md`. Sustitución léxica **por ocurrencia** según `Vocabulario-Rules` §9.5 y el plan de migración §3.5: **cero ocurrencias de «solución»** en este documento, y por lo tanto cero sustituciones; tampoco hay «resolución». Las nueve ocurrencias de «proyecto» se clasificaron por referente y **ninguna pasó a «proyecto de código»**: cuatro son «proyecto SelfHosted», la entidad del dominio, y dos son el emprendimiento —«el agente humano del proyecto» en §5 y en §6—, y las dos clases quedan intactas según el intake §12; las restantes eran la etiqueta de cabecera y el nombre del artefacto hermano. Ninguna necesidad, criterio de éxito, dependencia, prioridad, CU prevista ni brecha cambió: la migración es léxica y de forma de cabecera |
| 1.0 | 2026-07-29 | Corrección absorbida dentro de la versión 1.0, sin subirla y sin archivar el estado anterior, por la política de versionado de `Master-Prompt.md` §5. Se completa el campo `Trazabilidad upstream` de la cabecera con las secciones que el cuerpo cita y que faltaban: `Roadmap-Producto.md` §2.6, que el §5 cita como origen de la brecha del orden de las etapas de la Fase 3; el intake §23.4, que es el origen de la decisión de recorte que agrupa F-13 y F-17 y que el §9 y el control de cambios invocan; y `Vision-Producto.md` §6, de donde proviene la métrica de reproducibilidad. Origen: hallazgo H-02 del informe [Audit/A-00-01-r1.md](../../Audit/A-00-01-r1.md) |
| 1.0 | 2026-07-29 | Versión inicial, generada bajo el conjunto normativo 4.0 del Framework SDD a partir del consolidado de la Fase A previa transcripto en el intake §23, y de los documentos de 00-Contexto. Conserva el identificador NB-03, sus cinco criterios de éxito y la decisión de recorte que agrupa F-13 y F-17 en una sola necesidad. Declara como brecha el orden todavía no declarado de las etapas de la Fase 3 |
