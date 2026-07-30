# NB-08 — Control de acceso al panel que gobierna el host y credenciales de máquina acotadas

| Campo | Valor |
|---|---|
| Proyecto | SelfHosted.Service.Core (solución; proyecto principal SelfHosted-Web) |
| Documento | NB-08-Control-De-Acceso-Y-Credenciales-De-Maquina-v1.0.md |
| Versión | 1.0 |
| Estado | Propuesto |
| Fecha | 2026-07-27 |
| Autor | Analista de Negocio Senior (AG-01) |
| Trazabilidad upstream | SOLUTION-INTAKE §2, §4 (F-01, F-15, F-16), §5 (historias 1 y 10), §6 (flujo 4), §9 (exclusiones 4, 5 y 7), §11 (RG-02, RG-03), anexos E-12, E-13, E-15, E-16 (RN-15, RN-16, RN-17); `Vision-Producto-v1.0.md` §2.2, §8 (RG-02, RG-03); `Alcance-Proyecto-v1.0.md` §4.1, §5.1, §8 (CA-07) |
| Trazabilidad downstream | CU-29 a CU-33 (previstas en 02-Especificacion-Funcional); 06-Backlog-Tecnico; 07-Plan-Sprint; 08-Calidad-Y-Pruebas |

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

La solución que este catálogo especifica gobierna el motor de contenedores del propio servidor, y ese acceso equivale a control administrativo total del equipo. Quien entra al panel puede crear, detener y eliminar cualquier servicio del parque. Eso convierte al control de acceso en una necesidad de negocio y no en un requisito técnico accesorio: el panel no puede quedar disponible para cualquiera que alcance el equipo en la red local.

La necesidad tiene dos públicos con exigencias opuestas. El primero es una persona: el administrador único, que necesita una credencial propia, establecida en el primer arranque, con una contraseña que el sistema valide, con la posibilidad de cambiarla exigiendo la anterior y de cerrar la sesión. El segundo es un automatismo: el flujo de integración continua que publica una versión nueva y que necesita disparar un despliegue sin conocer la contraseña del administrador. Darle la credencial humana a un automatismo es exactamente lo que el negocio quiere evitar, porque esa credencial abre el equipo entero y no se puede revocar sin dejar al propietario afuera.

De ahí que la necesidad se resuelva con dos mecanismos distintos: una sesión de usuario para la persona y credenciales de máquina para los automatismos, cada una con los permisos concretos que necesita, con vigencia y revocables por separado. A eso se agrega el registro de toda operación de escritura, que es la contrapartida de gobernar un equipo con una sola persona y sin nadie que audite: si algo se creó o se eliminó, tiene que quedar dicho quién lo hizo y con qué resultado.

## 2. Ejemplo de uso desde la perspectiva del negocio

El propietario instala la solución por primera vez sobre un equipo vacío. La aplicación se prepara sola y, al entrar, le pide elegir usuario y contraseña, y le rechaza la primera que prueba por débil. A partir de ahí el panel no se abre sin esa credencial, y en los arranques siguientes ya no ofrece el alta sino el ingreso.

Semanas después quiere que su flujo de publicación despliegue automáticamente la versión nueva de una de sus aplicaciones. No le entrega su contraseña: emite desde el panel una credencial de máquina con un único permiso, el de ejecutar despliegues, con una vigencia declarada. La copia una sola vez, porque el sistema no vuelve a mostrarla, y la deja en su flujo de publicación. El día que sospecha que esa credencial se filtró, la revoca desde el panel y el flujo deja de poder desplegar en el acto, sin que él tenga que cambiar su propia contraseña ni tocar ningún servicio. Y cuando quiere saber quién eliminó un servicio la semana pasada, el registro de actividad se lo dice.

## 3. Impacto

- El panel que gobierna el equipo deja de estar disponible para cualquiera que lo alcance en la red local.
- Los automatismos dejan de necesitar la credencial humana, con lo que desaparece el escenario de una filtración que obliga a cambiar la contraseña del propietario.
- La revocación pasa a ser una operación granular: se corta el acceso de un automatismo sin afectar al resto ni al administrador.
- Si la necesidad no se resuelve, ninguna de las demás capacidades puede exponerse con seguridad, porque todas terminan operando sobre el motor de contenedores del equipo.
- El registro de toda operación de escritura da respuesta a la pregunta de qué pasó, que en un sistema con un solo operador y sin auditor externo no tiene otra fuente.

## 4. Problema específico que resuelve

- Un panel con control total del equipo no puede quedar accesible sin credencial en la red local.
- No hay una credencial de administrador establecida ni validada, y el primer arranque debe resolverla sin dejar una ventana abierta.
- Un automatismo que necesita desplegar hoy tendría que conocer la credencial humana, que abre el equipo entero.
- No hay forma de acotar lo que un automatismo puede hacer ni de retirarle el acceso sin afectar al administrador.
- No queda registro de quién ejecutó una operación con consecuencias sobre el parque ni de cuál fue su resultado.

## 5. Criterios de éxito

| Criterio | Métrica | Target | Plazo |
|---|---|---|---|
| Superficie accesible sin credencial | Pantallas y operaciones de la solución que se pueden ejecutar sin sesión iniciada ni credencial de máquina válida | 0 pantallas y 0 operaciones | Al cierre de la etapa de administrador y sesión |
| Automatismos que conocen la credencial humana | Automatismos configurados que necesitan la contraseña del administrador para disparar un despliegue | 0 automatismos | Al cierre de la Fase 4 |
| Acotamiento de las credenciales de máquina | Credenciales de máquina emitidas cuyo conjunto de permisos excede lo que su automatismo necesita, sobre el total de credenciales emitidas | 0 % de las credenciales | Continuo |
| Efecto de la revocación | Despliegues aceptados con una credencial de máquina después de haber sido revocada | 0 despliegues, con efecto en la primera petición posterior | Al cierre de la Fase 4 |
| Registro de las operaciones con consecuencias | Operaciones de escritura registradas con actor, acción, entidad, detalle y resultado, sobre el total de operaciones de escritura, con retención de 90 días | 100 % de las operaciones | Continuo |

Filas derivadas. Ninguna fila de esta tabla está derivada. Las cinco toman su número de capacidades y reglas ya declaradas: el alta obligatoria del administrador en el primer arranque, la separación entre sesión de usuario y credencial de máquina, el principio de ámbito mínimo asociado al riesgo de control total del equipo, la revocación inmediata declarada como parte de la capacidad de credenciales, y la regla de auditoría de toda operación de escritura con su retención configurada.

## 6. Stakeholders involucrados

| Rol | Nivel | Qué pide o aporta |
|---|---|---|
| Propietario del servidor y administrador único | Propietario | Establece su credencial en el primer arranque, decide qué permisos recibe cada automatismo y ordena las revocaciones |
| Agente humano del proyecto | Propietario | Valida en el punto de control que una credencial de ámbito mínimo dispara un despliegue y que su revocación surte efecto de inmediato |
| Equipo de desarrollo de dos personas | Implementador | Construye el alta del administrador, la sesión, la emisión y revocación de credenciales de máquina y el registro de actividad |
| Agente de IA de codificación | Implementador | Especifica y genera los cortes verticales de administrador y sesión, de credenciales de máquina y de disparo desatendido |
| Usuario final: administrador de la solución | Beneficiario | Valida que puede cambiar su contraseña y cerrar su sesión, y que nadie más opera el panel |
| Automatismo de integración continua | Beneficiario | Consume una credencial de ámbito mínimo para disparar despliegues sin conocer la contraseña del administrador |

## 7. Trazabilidad a CU

| NB | CU prevista | Proyecto | Estado |
|---|---|---|---|
| NB-08 | CU-29 alta del administrador único en el primer arranque, con validación de la contraseña | SelfHosted-Web | a generar |
| NB-08 | CU-30 inicio y cierre de sesión, con sesión recordada | SelfHosted-Web | a generar |
| NB-08 | CU-31 cambio de contraseña exigiendo la contraseña actual | SelfHosted-Web | a generar |
| NB-08 | CU-32 emisión, listado y revocación de credenciales de máquina con sus permisos y su vigencia | SelfHosted-Web | a generar |
| NB-08 | CU-33 disparo de un despliegue desde un automatismo con credencial de ámbito mínimo | SelfHosted-Web | a generar |

Extensión declarada de la tabla estándar. La columna `Proyecto` se agrega a las tres columnas que fija la Tabla C de `Rules-Necesidades-Negocio.md` §4.4, porque los casos de uso se generan por proyecto y esta solución se compone de cuatro. No reemplaza ninguna columna de la tabla estándar. La justificación única de la extensión está en el índice maestro §4.2.

## 8. Dependencias con otras NB

- Sin dependencias. Es la única necesidad del catálogo que no depende de ninguna otra: se resuelve antes que el resto y no presupone nada declarado.
- Es prerequisito de: NB-01, y por transitividad de las seis restantes, porque ninguna operación sobre el registro de arquitectura existe sin una sesión iniciada.

## 9. Prioridad MoSCoW

Must Have. Agrupa F-01, Must Have, junto con F-15, Should Have, y F-16, Could Have, y toma la más alta: sin credencial del administrador ninguna capacidad puede exponerse sobre un panel que gobierna el equipo, mientras que las credenciales de máquina y el disparo desatendido pueden llegar después sin bloquear el resto.

## 10. Control de cambios

| Versión | Fecha | Cambios | Autor |
|---|---|---|---|
| 1.0 | 2026-07-27 | Versión inicial. Cinco criterios de éxito, ninguno derivado, seis stakeholders y cinco casos de uso previstos sobre SelfHosted-Web | Analista de Negocio Senior (AG-01) |
| 1.0 | 2026-07-27 | Correcciones del audit A-01-Necesidades-Negocio-v1.0, dentro del mismo ciclo de emisión y sin incremento de versión. P1-01: anclas de la tabla de contenido reemitidas conservando tildes. P2-01: se declara la extensión de la Tabla C con la columna `Proyecto` | Analista de Negocio Senior (AG-01) |
