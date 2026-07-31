# NB-08 — Control de acceso al panel que gobierna el host y credenciales de máquina acotadas

| Campo | Valor |
| --- | --- |
| Producto | SelfHosted Service |
| Documento | NB-08-Control-De-Acceso-Y-Credenciales-De-Maquina.md |
| Versión | 2.0 |
| Estado | Propuesto |
| Fecha | 2026-07-30 |
| Autor | Analista de Negocio Senior (AG-01) |
| Trazabilidad upstream | PRODUCT-INTAKE-SelfHosted-Service §2, §4 (F-01, F-15, F-16), §5 (historias 1 y 10), §6 (flujo 4), §9 (exclusiones 4, 5 y 7), §11 (RG-02, RG-03), §17.P.10, §23.1, §23.3, §23.4, §23.5; Vision-Producto.md §4.1, §4.2, §8.1 (RG-02, RG-03); Alcance-Producto.md §4.1, §5.1, §5.2; Roadmap-Producto.md §2.2 (Fase 4), §2.3 (EP-01, EP-15, EP-16), §2.6, §3 |
| Trazabilidad downstream | CU-29, CU-30, CU-31, CU-32, CU-33 (previstas en 02-Especificacion-Funcional) |

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

El producto se apoya en el socket del motor de contenedores del host, y acceder a ese socket equivale a control administrativo total del equipo. Un panel con esa capacidad no puede quedar accesible sin credencial, ni siquiera en una red local con un solo usuario: quien alcance la pantalla puede crear, detener y eliminar cualquier contenedor del servidor. El riesgo está evaluado como inherente al diseño, de probabilidad alta y de impacto muy alto, y la única mitigación disponible del lado del producto es no exponerlo fuera de la red local, exigir credencial y auditar toda escritura.

La necesidad tiene un segundo componente, distinto del primero y del mismo origen. Hay un automatismo de integración continua que necesita disparar despliegues sin que nadie intervenga. Si ese automatismo tuviera que usar la credencial del administrador, un flujo de trabajo conocería la contraseña que abre el equipo entero, y retirarle el acceso obligaría a cambiar la credencial humana. La necesidad es que el automatismo tenga su propia credencial de máquina, acotada a lo que necesita hacer, con vigencia y con revocación individual e inmediata.

El tercer componente es el registro. Con un panel que gobierna el host, no alcanza con controlar quién entra: hace falta que quede constancia de qué se hizo. Toda operación con consecuencias sobre el parque debe registrarse con su actor, su acción, su entidad, su detalle y su resultado, porque sin ese registro no hay forma de reconstruir qué pasó ni de distinguir una operación del administrador de una de un automatismo.

## 2. Ejemplo de uso desde la perspectiva del negocio

El propietario instala el producto por primera vez. Si la aplicación arranca con el panel abierto y sin credencial hasta que él se acuerde de configurar una, hay una ventana en la que cualquiera de la red local controla su servidor. Necesita que el primer arranque le exija elegir usuario y contraseña antes de mostrarle nada.

Más adelante quiere que su automatismo publique la versión nueva de un servicio sin intervención suya. No está dispuesto a poner la contraseña de su administrador en un flujo de trabajo: necesita emitir una credencial que sólo sirva para disparar despliegues, con vigencia, y poder revocarla desde la interfaz el día que deje de confiar en ella, sin tocar su propia contraseña.

## 3. Impacto

- El panel deja de ser una superficie abierta sobre un equipo con control administrativo total, que es la mitigación declarada del riesgo más alto del proyecto.
- El primer arranque deja de tener una ventana sin credencial establecida.
- El automatismo de integración continua gana una vía de acceso propia y acotada, y deja de existir la necesidad de compartirle la credencial humana.
- Retirar el acceso a un automatismo pasa a ser una operación individual e inmediata, sin efecto sobre el administrador.
- Toda operación con consecuencias sobre el parque queda registrada con su actor, con lo que la reconstrucción de qué pasó deja de depender de la memoria.
- Si la necesidad queda sin resolver, ninguna de las otras siete puede entregarse de forma responsable, porque todas operan sobre el mismo equipo desde el mismo panel.

## 4. Problema específico que resuelve

- Un panel con control total del equipo no puede quedar accesible sin credencial en la red local.
- No hay credencial de administrador establecida ni validada, y el primer arranque debe resolverla sin dejar una ventana abierta.
- Un automatismo que necesita desplegar tendría que conocer la credencial humana, que abre el equipo entero.
- No hay forma de acotar lo que un automatismo puede hacer ni de retirarle el acceso sin afectar al administrador.
- No queda registro de quién ejecutó una operación con consecuencias sobre el parque ni de cuál fue su resultado.

## 5. Criterios de éxito

Ningún criterio usa fecha de calendario. Los plazos se anclan al cierre de la etapa o de la fase que entrega la capacidad medida, según la convención del intake §23.3 y el [Roadmap-Producto.md](../../00-Contexto/Roadmap-Producto.md) §2.2 y §3. Ninguno de los cinco es derivación.

| Criterio | Métrica | Target | Plazo |
| --- | --- | --- | --- |
| Superficie accesible sin credencial | Pantallas y operaciones alcanzables sin haber iniciado sesión | 0 pantallas y 0 operaciones | Continuo, desde el cierre de la etapa `c`, que entrega administrador y sesión (EP-01) |
| Automatismos que conocen la credencial humana | Automatismos que necesitan la contraseña del administrador para operar | 0 automatismos | Continuo, desde el cierre de la Fase 4 |
| Acotamiento de las credenciales de máquina | Credenciales emitidas con permisos que exceden lo que su automatismo necesita | 0 % de las credenciales emitidas | Continuo, desde el cierre de la etapa que entrega EP-15 |
| Efecto de la revocación | Despliegues aceptados con una credencial revocada, con efecto exigido en la primera petición posterior a la revocación | 0 despliegues | Cierre de la Fase 4 |
| Registro de las operaciones con consecuencias | Operaciones de escritura registradas con actor, acción, entidad, detalle y resultado, con retención declarada | 100 % de las escrituras, con retención de 90 días | Continuo, desde el cierre de la etapa `c` |

El plazo del tercer criterio depende de una brecha abierta que este documento no resuelve: el adelanto de EP-15 a la Fase 1 es una recomendación registrada y no decidida, declarada en el Roadmap §2.6, con el agente humano del proyecto como destinatario. Si el adelanto se decide, el plazo pasa a anclarse a una etapa de la Fase 1 sin que cambie el criterio.

## 6. Stakeholders involucrados

| Rol | Nivel | Qué pide o aporta |
| --- | --- | --- |
| Agente humano del proyecto | Propietario | Revisa y aprueba la necesidad, elige la credencial del administrador y da el OK explícito de cada punto de control que la entrega |
| Analista de Negocio Senior (AG-01) | Propietario del contenido | Mantiene la necesidad, sus criterios y su trazabilidad, y declara las brechas en lugar de resolverlas |
| Equipo de desarrollo, dos desarrolladores | Implementador | Construye el alta del administrador, la sesión, la emisión y revocación de credenciales de máquina y el registro de auditoría |
| Agente IA de codificación | Implementador | Genera la especificación y, en etapas posteriores, el código de los cortes verticales de acceso |
| Usuario final: administrador del producto | Beneficiario | Valida que nadie más pueda operar el panel que controla su servidor |
| Automatismo de integración continua | Beneficiario | Dispara despliegues con una credencial de ámbito mínimo, sin conocer la credencial humana |
| Product Manager (AG-00) | Consultado | Verifica la alineación con la visión y con el alcance declarados |
| Analista Funcional (AG-02) | Consultado | Desarrolla los casos de uso que esta necesidad declara previstos |

Es la única necesidad con dos beneficiarios que validan: el usuario final y el automatismo de integración continua, porque la capacidad de credenciales de máquina existe exactamente para el segundo.

## 7. Trazabilidad a CU

| NB | CU prevista | Estado |
| --- | --- | --- |
| NB-08 | CU-29 alta del administrador en el primer arranque (capa de presentación) | a generar |
| NB-08 | CU-30 inicio y cierre de sesión (capa de presentación) | a generar |
| NB-08 | CU-31 cambio de contraseña (capa de presentación) | a generar |
| NB-08 | CU-32 emisión, listado y revocación de credenciales de máquina (capa de presentación) | a generar |
| NB-08 | CU-33 disparo de despliegue con credencial de ámbito mínimo (capa de presentación) | a generar |

## 8. Dependencias con otras NB

- Sin dependencias. Es la raíz del grafo de necesidades: no depende de ninguna otra NB.
- Es prerequisito de: NB-01 de forma directa, y de las seis restantes por transitividad.

## 9. Prioridad MoSCoW

Must Have. Agrupa tres capacidades de prioridades distintas que responden al mismo dolor, y sin la primera de ellas ninguna otra necesidad puede entregarse: un panel que gobierna el equipo no puede quedar accesible sin credencial.

## 10. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 2.0 | 2026-07-30 | Migración normativa del conjunto 4.1 al 6.0, fase M4 corte 2, bajo `Rules-Necesidades-Negocio` 3.1 y `Vocabulario-Rules` 2.1. Clasificación **regenerar contenido** por el salto major de la regla que lo gobierna; fuente de contenido: el documento de origen, archivado en `_legacy/2026-07-30/`. Sube **major** porque la nomenclatura anterior deja de cumplir. Cabecera: la etiqueta `Proyecto` pasa a `Producto` sobre el mismo valor, según `Vocabulario-Rules` §3 y §4 R3; la trazabilidad upstream apunta al `PRODUCT-INTAKE-SelfHosted-Service` renombrado y al artefacto hermano `Alcance-Producto.md`, antes `Alcance-Proyecto.md`. Sustitución léxica **por ocurrencia** según `Vocabulario-Rules` §9.5 y el plan de migración §3.5: dos ocurrencias de «solución» designaban el nivel superior y pasan a «producto» con su concordancia —«instala la solución» a «instala el producto» en §2 y «administrador de la solución» a «administrador del producto» en §6—; no hay ninguna «solución de código» ni ninguna «resolución» en este documento. Las cinco ocurrencias de «proyecto» se clasificaron por referente y **ninguna pasó a «proyecto de código»**: ninguna designa la entidad del dominio, y tres son el emprendimiento —«el riesgo más alto del proyecto» en §3 y «el agente humano del proyecto» en §5 y §6—, que quedan a secas y sin calificar según el intake §12, que declara que calificarlas produciría una afirmación falsa; las restantes eran la etiqueta de cabecera y el nombre del artefacto hermano. Ninguna necesidad, criterio de éxito, dependencia, prioridad, CU prevista ni brecha cambió: la migración es léxica y de forma de cabecera |
| 1.0 | 2026-07-29 | Corrección absorbida dentro de la versión 1.0, sin subirla y sin archivar el estado anterior, por la política de versionado de `Master-Prompt.md` §5. Se completa el campo `Trazabilidad upstream` de la cabecera con `Roadmap-Producto.md` §2.6, que el §5 cita como origen de la brecha del tercer criterio —el adelanto no decidido de EP-15—, y §3, que el §5 cita como origen de los hitos de anclaje. Origen: hallazgo H-02 del informe [Audit/A-00-01-r1.md](../../Audit/A-00-01-r1.md) |
| 1.0 | 2026-07-29 | Versión inicial, generada bajo el conjunto normativo 4.0 del Framework SDD a partir del consolidado de la Fase A previa transcripto en el intake §23, y de los documentos de 00-Contexto. Conserva el identificador NB-08, sus cinco criterios de éxito y la decisión de recorte que agrupa F-01, F-15 y F-16 pese a sus prioridades distintas. Declara como brecha el plazo dependiente del adelanto no decidido de EP-15 |
