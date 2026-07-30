# Compatibilidad y Plataformas Target

**Proyecto:** SelfHosted.Service.Core (solución; proyecto de código principal `SelfHosted-Web`)
**Documento:** Compatibilidad-Plataformas-v1.4.md
**Versión:** 1.4
**Estado:** Propuesto
**Fecha:** 2026-07-28
**Autor:** Product Manager Senior (AG-00) en conjunción con Analista de Negocio Senior (AG-01)
**Trazabilidad upstream:** SOLUTION-INTAKE v1.2 §10, §17.1 P.9, §17.2 P.9, §17.3 P.9, §17.4 P.9, con apoyo en §17.1 P.1, §17.3 P.1 y §17.3 P.3
**Trazabilidad downstream:** 09-Devops, 05-Arquitectura-Tecnica, 08-Calidad-Y-Pruebas, 10-Examples

## Tabla de contenido

- [1. Resumen ejecutivo](#1-resumen-ejecutivo)
  - [1.1 Por qué existe este documento](#11-por-qué-existe-este-documento)
  - [1.2 Regla de cierre](#12-regla-de-cierre)
- [2. Matriz de compatibilidad](#2-matriz-de-compatibilidad)
  - [2.1 Matriz por componente](#21-matriz-por-componente)
  - [2.2 Versiones mínimas por plataforma](#22-versiones-mínimas-por-plataforma)
- [3. Restricciones de plataforma justificadas](#3-restricciones-de-plataforma-justificadas)
- [4. Alternativas para plataformas no soportadas](#4-alternativas-para-plataformas-no-soportadas)
- [5. Estado de implementación por plataforma](#5-estado-de-implementación-por-plataforma)
- [6. Trazabilidad downstream](#6-trazabilidad-downstream)
- [Control de cambios](#control-de-cambios)

---

## 1. Resumen ejecutivo

La solución tiene una única plataforma de ejecución: un contenedor Linux sobre el servidor de referencia, dentro de la red local. No hay matriz de sistemas operativos, ni de arquitecturas, ni de canales de distribución. Esa unicidad no es una simplificación de este documento: está declarada por el cliente, porque el host de desarrollo es Linux, el entorno de desarrollo es Linux y el destino de producción es Linux.

Lo que sí exige una matriz es la relación de la solución con el motor de contenedores del host, que es su sustrato obligatorio y no una integración opcional, y con el navegador del administrador, que sostiene una sesión persistente contra el servidor. Los cuatro proyectos de código de la solución comparten runtime y sistema operativo, pero no comparten superficie de plataforma: dos de ellos no tocan el sistema operativo en absoluto, y esa ausencia es verificable por construcción.

### 1.1 Por qué existe este documento

Las reglas de la categoría omiten este documento por defecto para el tipo del proyecto de código principal. Se genera igualmente por decisión explícita del humano, porque el SOLUTION-INTAKE declara en los cuatro bloques P.9 una matriz restrictiva y verificable, con versiones mínimas y motivos, y esa matriz necesita un único lugar consolidado del que la categoría 09-Devops pueda derivar la configuración del pipeline y del despliegue sin recorrer cuatro bloques técnicos.

### 1.2 Regla de cierre

Toda combinación de plataforma no listada en §2 se considera no soportada. No hay soporte parcial ni soporte "de hecho": una plataforma que no aparece en la matriz no tiene verificación asociada y, por lo tanto, no puede declararse compatible.

## 2. Matriz de compatibilidad

### 2.1 Matriz por componente

| Componente | Sistema operativo | Runtime | Motor de contenedores | Almacenamiento | Navegador | Notas |
|---|---|---|---|---|---|---|
| SelfHosted-Web | Linux Debian 13, kernel 6.12 | .NET 10 | Docker 26.x con `compose` v5 y `buildx`, por socket del host | Delegado en SelfHosted-Infrastructure | Navegador de escritorio con soporte de WebSockets | Único ejecutable de la solución. Requiere transporte por WebSockets garantizado en la publicación del contenedor, no sondeo largo |
| SelfHosted-Application | Indiferente: el del proceso que la hospeda | .NET 10 | No aplica | No aplica | No aplica | Sin superficie propia de plataforma: no lee del sistema de archivos, no abre puertos y no depende del sistema operativo |
| SelfHosted-Infrastructure | Linux Debian 13, kernel 6.12 | .NET 10 | Docker 26.x con `compose` v5 y `buildx`; el cliente declara soporte de la interfaz del motor v29.4.1 | SQLite en la versión embebida en el proveedor de acceso a datos de .NET 10, con modo de diario WAL habilitado | No aplica | Es el único componente con superficie de sistema operativo: socket de dominio Unix del motor, lectura del sistema de archivos virtual del sistema operativo en modo sólo lectura para las métricas del host, y escritura de exportaciones en el directorio de datos de trabajo |
| SelfHosted-Domain | Indiferente | .NET 10 | No aplica | No aplica | No aplica | Sin dependencias externas ni superficie de plataforma. Sus pruebas no pueden requerir motor de contenedores ni base de datos: es un control de arquitectura bloqueante |
| Entorno de desarrollo | Linux, host del equipo de desarrollo | .NET 10 dentro del contenedor de desarrollo | Docker en el host, accedido desde el contenedor de desarrollo con el patrón de motor externo | Archivo local de SQLite en el directorio de datos de trabajo | Navegador de escritorio del host | El host no tiene ni tendrá instaladas las herramientas de construcción. Los contenedores creados son hermanos del contenedor de desarrollo, no hijos |
| Pipeline de integración continua | Linux, ejecutor autoalojado en el propio servidor | .NET 10 | Docker del propio servidor, requerido por las pruebas de integración | SQLite real en las pruebas de integración | No aplica | Matriz de sistema operativo y runtime única, sin combinaciones |
| Formato de exportación | No aplica | No aplica | Formato estándar de composición correspondiente a `compose` v5 | No aplica | No aplica | Es el contrato de portabilidad hacia otros servidores |

### 2.2 Versiones mínimas por plataforma

| Plataforma | Versión mínima | Motivo declarado | Origen |
|---|---|---|---|
| Sistema operativo de ejecución | Linux Debian 13, kernel 6.12 | Es el sistema del servidor de referencia y del host de desarrollo; el destino final es un contenedor Linux | SOLUTION-INTAKE v1.2 §17.1 P.9 y §17.3 P.9 |
| Runtime | .NET 10 | Sin compatibilidad hacia atrás con runtimes anteriores: las dependencias core de interfaz y de acceso al motor declaran soporte para ese marco | SOLUTION-INTAKE v1.2 §17.1 P.9, §17.2 P.9, §17.3 P.9, §17.4 P.9 |
| Motor de contenedores | Docker 26.x, con `compose` v5 y `buildx` | Es el motor instalado en el servidor de referencia. El cliente elegido declara soporte de la interfaz del motor v29.4.1, de modo que cubre la versión instalada | SOLUTION-INTAKE v1.2 §17.1 P.9 y §17.3 P.9 |
| Acceso al motor | Socket de dominio Unix del host, montado | Es el único punto de acceso previsto: motor externo en desarrollo y socket montado en producción | SOLUTION-INTAKE v1.2 §17.3 P.3 |
| Almacenamiento | SQLite embebido en el proveedor de acceso a datos de .NET 10, con modo de diario WAL | Es la persistencia de toda la solución; sin WAL, los bloqueos de escritura de los procesos en segundo plano degradan la interfaz | SOLUTION-INTAKE v1.2 §17.3 P.4 y §17.3 P.9 |
| Navegador | Navegador de escritorio con soporte de WebSockets | El modelo de interfaz mantiene una sesión persistente contra el servidor y exige conexión por WebSockets. Las fuentes no declaran una matriz de navegadores concretos ni versiones mínimas, y la batería de validación del 2026-07-27 no alcanzó este punto: el SOLUTION-INTAKE v1.2 lo mantiene declarado como abierto | SOLUTION-INTAKE v1.2 §17.1 P.9, donde el dato sigue marcado con origen de supuesto y sin resolver |
| Red | Red local. El servicio no se publica a internet | El acceso al socket del motor equivale a control total del host | SOLUTION-INTAKE v1.2 §10 y §17.1 P.9 |
| Formato de exportación | Formato estándar de composición correspondiente a `compose` v5 | Es la versión que corresponde al motor soportado | SOLUTION-INTAKE v1.2 §17.3 P.9 |

Brecha declarada, y sigue abierta. La fila de navegador es la única de la matriz sin versión mínima concreta. El SOLUTION-INTAKE v1.2 no fija ni familia de navegador ni versión, y su tabla de pendientes de §19 la enumera de forma explícita entre lo que el cierre de los seis supuestos del 2026-07-27 no alcanzó, con su consumidor downstream identificado. Queda planteada como pregunta abierta al cliente en el README de esta sección; hasta que se cierre, la categoría 09-Devops no puede derivar una verificación de navegador y la categoría 08 no puede escribir un criterio de compatibilidad de interfaz.

## 3. Restricciones de plataforma justificadas

| ID | Restricción | Justificación | Consecuencia asumida |
|---|---|---|---|
| CP-01 | Una única combinación de sistema operativo y runtime, sin matriz | El host de desarrollo es Linux, el entorno de desarrollo es Linux y el destino de producción es Linux | No hay guiones ni procedimientos alternativos por plataforma. Los scripts no detectan el entorno ni ramifican |
| CP-02 | El host de desarrollo no tiene ni tendrá instaladas las herramientas de construcción | Decisión del cliente. El único requisito del host es el motor de contenedores | Todo comando de todo guion corre dentro del entorno de desarrollo contenedorizado. Ningún paso puede asumir herramientas disponibles en el host |
| CP-03 | El directorio de datos de trabajo debe estar montado en la misma ruta absoluta en el host y en el entorno de desarrollo | Toda ruta que la solución le pase al motor la interpreta el motor del host, no el sistema de archivos del entorno de desarrollo. Traducir rutas en el adaptador se descartó por frágil | La ruta se expone como una única variable de configuración y todo el adaptador la usa como raíz |
| CP-04 | Los contenedores creados son hermanos del entorno de desarrollo, no hijos | Consecuencia del patrón de motor externo | Para alcanzar por red un servicio recién desplegado, el entorno de desarrollo debe estar adjunto a la misma red del proyecto, o alcanzarlo por el puerto publicado en el host |
| CP-05 | Sin soporte para motores de contenedores distintos del declarado | El motor es el sustrato del producto y su comportamiento no es intercambiable sin verificación | El punto de extensión existe —el adaptador vive detrás de una única abstracción— pero ningún otro motor está verificado ni soportado |
| CP-06 | Sin soporte para bases de datos distintas de la declarada | El modelo de concurrencia elegido, con escritor único y modo de diario WAL, es específico del almacenamiento declarado | Dos instancias de la solución sobre el mismo archivo de datos no están soportadas |
| CP-07 | El servicio no se publica a internet | El acceso al socket del motor equivale a control total del host, y la capa de protección adicional está fuera de alcance | No hay superficie pública ni certificado gestionado por la solución. El protocolo seguro es asunto del despliegue, no del entorno de desarrollo |
| CP-08 | Los proyectos de código de dominio y de aplicación no pueden tener superficie de plataforma | Es lo que permite que sus pruebas corran sin infraestructura y que la regla de aislamiento del cliente del motor sea verificable por compilación | Es un control de arquitectura bloqueante en el pipeline, no una convención |
| CP-09 | El entorno de desarrollo no define, ni deriva, ni condiciona la imagen de producción | Son dos artefactos con propósitos distintos | La imagen de producción se construye con su propia definición multietapa |

## 4. Alternativas para plataformas no soportadas

| Plataforma no soportada | Alternativa ofrecida | Nota |
|---|---|---|
| Windows como plataforma de ejecución o de desarrollo | Ninguna dentro del alcance. La vía practicable es ejecutar el entorno de desarrollo sobre un subsistema Linux con motor de contenedores propio, fuera de lo verificado por el proyecto | No hay guiones para intérpretes de comandos de Windows, y no se van a agregar |
| macOS como plataforma de ejecución o de desarrollo | Ninguna dentro del alcance | El proyecto no verifica esa combinación |
| Otros motores de contenedores | El adaptador del motor vive detrás de una única abstracción, de modo que sustituirlo es un trabajo acotado a un componente. La batería de pruebas de contrato del adaptador es la que diría si un reemplazo es equivalente | Es un punto de extensión declarado, no una compatibilidad ofrecida |
| Otros almacenamientos | Ninguna. El modelo de concurrencia y el esquema están atados al almacenamiento declarado | Cambiarlo es una decisión de arquitectura con registro propio, no una configuración |
| Navegadores sin soporte de WebSockets | Ninguna. La sesión persistente es constitutiva del modelo de interfaz elegido | El sondeo largo como transporte alternativo está explícitamente descartado por su efecto sobre la fluidez del lienzo |
| Navegadores móviles y pantallas pequeñas | Fuera de la matriz declarada. La maqueta de interfaz declara los anchos de ventana en los que se verifica el comportamiento responsivo, y la etapa de panel navegable los registra en su informe | No es una plataforma target: es una verificación de comportamiento en la plataforma de escritorio |
| Acceso desde fuera de la red local | Ninguna dentro del alcance. Requeriría una capa de protección adicional que hoy está excluida | Ver `Alcance-Proyecto` §5.1 |
| Más de una instancia de la solución sobre el mismo almacenamiento | Ninguna. Es una carga que la solución declara no soportar | Ver CP-06 |

## 5. Estado de implementación por plataforma

El sistema todavía no está construido: este documento especifica la matriz target, no describe un estado verificado. En consecuencia, la columna de estado registra la situación de especificación de cada plataforma y la columna de verificación registra el mecanismo previsto que la convertirá en un hecho comprobable.

| Plataforma o combinación | Estado | Verificación prevista | Dónde queda la evidencia |
|---|---|---|---|
| Linux Debian 13 con .NET 10, como plataforma de ejecución | Especificada, no construida | Construcción y arranque desde los guiones dentro del entorno de desarrollo, con página de salud respondiendo en el navegador del host | Etapa `a` y su informe de cierre |
| Motor de contenedores Docker 26.x por socket | Especificada, no construida | Puerta técnica PT-02, materializada como prueba de integración automatizada: listar, crear, arrancar, detener y eliminar un contenedor de prueba, construir una imagen desde una definición local y alcanzarla por red | Etapa `a`, prueba de integración y su ejemplo ejecutable |
| Almacenamiento SQLite con modo de diario WAL | Especificada, no construida | Pruebas de integración con almacenamiento real, más la validación del comportamiento bajo escritura concurrente registrada como pendiente en el caso límite CL-09 del intake | Categoría 08-Calidad-Y-Pruebas y pruebas de integración |
| Navegador de escritorio con WebSockets | Especificada de forma incompleta: sin familia ni versión mínima | Puerta técnica PT-01 sobre el navegador que el agente humano use en el punto de control, y registro de los anchos de ventana verificados | Etapa `b`, etapa del lienzo y sus informes de cierre |
| Entorno de desarrollo contenedorizado con motor externo | Especificada, no construida | El propio arranque de la etapa `a`, que sólo puede ocurrir dentro del entorno | Etapa `a` y su informe de cierre |
| Ejecutor autoalojado del pipeline con acceso al socket del motor | Especificada, no construida | Ejecución del control de calidad de pruebas de integración, que requiere el socket disponible en el ejecutor | Categoría 09-Devops |
| Ausencia de superficie de plataforma en dominio y aplicación | Especificada, no construida | Control de arquitectura bloqueante: cero dependencias externas en el dominio y ningún tipo del cliente del motor fuera de su carpeta de adaptador | Categoría 09-Devops, controles del pipeline |
| Windows y macOS | No soportadas, por decisión declarada | No se verifica | — |

## 6. Trazabilidad downstream

| Categoría | Qué consume de este documento |
|---|---|
| 09-Devops | La matriz de §2 como definición única de la configuración de construcción y despliegue; CP-02, CP-03 y CP-04 como restricciones del entorno de desarrollo y del ejecutor del pipeline; CP-08 como control de arquitectura bloqueante; y la fila de ejecutor autoalojado de §5, que exige socket del motor disponible |
| 05-Arquitectura-Tecnica | CP-05 y CP-06 como decisiones de arquitectura con registro propio, y CP-03 como restricción de diseño del adaptador del motor |
| 08-Calidad-Y-Pruebas | La columna de verificación prevista de §5, que define qué prueba convierte cada fila de la matriz en un hecho comprobable |
| 10-Examples | Las materializaciones de PT-01 y PT-02, que son las verificaciones de las dos filas más críticas de la matriz |
| 03-UX-UI-DX | La restricción de navegador de §2.2 y su brecha declarada, que condiciona qué se puede prometer sobre el comportamiento de la interfaz |

---

## Control de cambios

| Versión | Fecha | Cambios | Autor |
|---|---|---|---|
| 1.0 | 2026-07-27 | Versión inicial, consolidando los cuatro bloques P.9 del SOLUTION-INTAKE-SelfHosted-Service-Core-v1.0. Siete componentes en la matriz, ocho plataformas con versión mínima y motivo, nueve restricciones justificadas y una brecha declarada en la fila de navegador | Product Manager Senior (AG-00) con Analista de Negocio Senior (AG-01) |
| 1.0 | 2026-07-27 | Corrección dentro del ciclo de emisión, sin cambio de versión, por el audit `A-00-Contexto-v1.0.md`. P1-01: se regeneraron las tres anclas de la tabla de contenido que no resolvían, conservando tildes y eñes. Sin cambios de contenido: el audit no registró hallazgos de fondo sobre este documento | Product Manager Senior (AG-00) con Analista de Negocio Senior (AG-01) |
| 1.0 | 2026-07-27 | Actualización de referencias y refuerzo de la brecha declarada, sin cambio de versión. El intake vigente pasa a ser `SOLUTION-INTAKE-SelfHosted-Service-Core-v1.1.md` y se cita esa versión en la cabecera y en el control de cambios. §2.2 declara ahora de forma explícita que la batería de validación del 2026-07-27 no alcanzó a la matriz de navegadores, que sigue abierta: el cierre de los seis supuestos del intake —cuatro confirmados, uno resuelto con evidencia y uno cerrado por identificación de rol— no la alcanzó | Product Manager Senior (AG-00) con Analista de Negocio Senior (AG-01) |
| 1.0 | 2026-07-27 | Cierre del hallazgo N-06 del re-audit `A-00-Contexto-v2.0.md`, sin cambio de versión. La tercera fila de este control de cambios deja de llamar confirmación al cierre de los seis supuestos y explicita los tres mecanismos; el párrafo de brecha declarada de §2.2 se alinea con el mismo criterio y cita la tabla de pendientes de §19 del intake, que es donde la matriz de navegadores figura como abierta | Product Manager Senior (AG-00) con Analista de Negocio Senior (AG-01) |
| 1.1 | 2026-07-28 | Actualización de referencias al intake vigente, que pasa a la versión 1.2 tras consolidar las siete decisiones del agente humano del proyecto del 2026-07-28, y a los nombres de archivo de los documentos de la categoría, que pasan a 1.1. Las citas actualizadas son las vivas —cabecera, cuerpo y enlaces navegables—; las filas anteriores de este control de cambios conservan la versión del intake y los nombres de archivo contra los que se trabajó cada día, porque son parte del hecho registrado. Ninguna de las siete decisiones alcanza a la matriz de compatibilidad: no cambian plataformas, versiones mínimas ni restricciones, y la matriz de navegadores sigue declarada como brecha abierta en §2.2, porque tampoco fue alcanzada por esta ronda. Sube a 1.1 porque el documento ya fue consumido por 01-Necesidades-Negocio; la 1.0 queda archivada en `_legacy/2026-07-28/` | Product Manager Senior (AG-00) con Analista de Negocio Senior (AG-01) |
| 1.2 | 2026-07-28 | Actualización de citas vivas, sin cambio de contenido propio. La segunda pasada sobre el mecanismo de variables no alcanza a esta matriz: no cambian plataformas, versiones mínimas, restricciones ni alternativas, y la matriz de navegadores sigue declarada como brecha abierta. Sube a 1.2 porque los documentos de la categoría que este cita pasaron a 1.2 y sus referencias debían seguirlos | Product Manager Senior (AG-00) con Analista de Negocio Senior (AG-01) |
| 1.3 | 2026-07-28 | Actualización de citas vivas, sin cambio de contenido propio. La tercera pasada sobre el mecanismo de variables no alcanza a esta matriz: no cambian plataformas, versiones mínimas, restricciones ni alternativas. Sube a 1.3 porque los documentos de la categoría que este cita pasaron a 1.3 y sus referencias debían seguirlos | Product Manager Senior (AG-00) con Analista de Negocio Senior (AG-01) |
| 1.4 | 2026-07-28 | Cuarta pasada del SOLUTION-INTAKE, de terminología. Es el documento con más menciones en sentido de composición: se califican los cuatro proyectos de código de §1, el tipo del proyecto de código principal de §1.1 y la restricción CP-08. La cabecera califica el proyecto de código principal. Se adopta además la convención de citas de la solución: las citas en prosa van sin sufijo de versión y el nombre versionado queda reservado a la identidad del propio documento, a la trazabilidad upstream de la cabecera y a los enlaces navegables, que necesitan el nombre de archivo real. Es lo que corta la cascada por la que un documento subía de versión sin tener una línea propia que corregir. | Product Manager Senior (AG-00) con Analista de Negocio Senior (AG-01) |
