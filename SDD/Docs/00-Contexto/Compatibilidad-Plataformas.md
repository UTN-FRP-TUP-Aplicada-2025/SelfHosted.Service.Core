# Compatibilidad de Plataformas

**Proyecto:** SelfHosted Service (`Nombre-Solucion`: `SelfHosted-Service`)
**Documento:** Compatibilidad-Plataformas.md
**Versión:** 1.0
**Estado:** Propuesto
**Fecha:** 2026-07-29
**Autor:** Product Manager Senior (AG-00)
**Trazabilidad upstream:** SOLUTION-INTAKE-SelfHosted-Service §10, §17.P.9, §17.P.10, §22.5, §24.2
**Trazabilidad downstream:** 03-UX-UI-DX, 05-Arquitectura-Tecnica, 08-Calidad-Y-Pruebas, 09-Devops

---

## Tabla de contenido

- [§1. Resumen ejecutivo](#1-resumen-ejecutivo)
  - [§1.1 Por qué este documento se genera](#11-por-qué-este-documento-se-genera)
  - [§1.2 Los tres ejes de plataforma](#12-los-tres-ejes-de-plataforma)
- [§2. Matriz de compatibilidad](#2-matriz-de-compatibilidad)
  - [§2.1 Matriz por eje de plataforma](#21-matriz-por-eje-de-plataforma)
  - [§2.2 Matriz por componente](#22-matriz-por-componente)
  - [§2.3 Regla de cierre de la matriz](#23-regla-de-cierre-de-la-matriz)
- [§3. Restricciones de plataforma justificadas](#3-restricciones-de-plataforma-justificadas)
  - [§3.1 Catálogo de restricciones de plataforma](#31-catálogo-de-restricciones-de-plataforma)
  - [§3.2 Riesgos que la matriz no elimina](#32-riesgos-que-la-matriz-no-elimina)
- [§4. Alternativas para plataformas no soportadas](#4-alternativas-para-plataformas-no-soportadas)
- [§5. Estado de implementación por plataforma](#5-estado-de-implementación-por-plataforma)
- [§6. Trazabilidad downstream](#6-trazabilidad-downstream)
- [Control de cambios](#control-de-cambios)

---

## §1. Resumen ejecutivo

SelfHosted Service soporta una única combinación de plataforma, sin matriz de variantes. Corre como un contenedor sobre Linux Debian 13 en el servidor de referencia, se construye y se prueba exclusivamente dentro de un entorno contenedorizado declarativo sobre un equipo Linux, y se opera desde una única familia de navegador de escritorio, en red local. Toda combinación no listada acá se considera no soportada.

La consecuencia práctica de esa decisión es que no hay guiones alternativos por plataforma, no hay detección de entorno ni ramificación en los guiones, y no hay verificación asociada a ninguna plataforma que la matriz no nombre.

### §1.1 Por qué este documento se genera

Las reglas constructivas de la categoría marcan este documento como recomendado, y no obligatorio, para el tipo de proyecto de código de esta solución. Se genera igual, por decisión declarada, con dos motivos concretos:

- El intake declara una matriz restrictiva con versiones mínimas concretas, incluida una familia única de navegador con piso de versión, y las categorías 08-Calidad-Y-Pruebas y 09-Devops necesitan esa matriz consolidada en un solo lugar para derivar sus verificaciones sin recorrer bloques técnicos.
- La matriz no elimina tres componentes del riesgo del canal entre navegador y servidor, que quedan como riesgos abiertos con medición asignada. Sin un documento que los consolide, esos tres se pierden entre la puerta técnica y la categoría de calidad.

### §1.2 Los tres ejes de plataforma

La solución tiene tres ejes de plataforma independientes, y confundirlos es el error más probable al leer esta matriz. Sólo uno de los tres es Windows.

| Eje | Qué es | Plataforma |
| --- | --- | --- |
| Ejecución | Dónde corre el producto entregado | Linux Debian 13, dentro de un contenedor, sobre el servidor de referencia |
| Desarrollo | Dónde se construye y se prueba | Linux, dentro de un entorno contenedorizado declarativo sobre el equipo del desarrollador |
| Cliente | Desde qué equipo el administrador opera el panel | Windows Server 2022, versión 21H2 |

El eje de cliente no es plataforma de ejecución ni de desarrollo. Se declara porque la interfaz mantiene un canal permanente con el servidor y el navegador deja de ser un detalle de presentación.

---

## §2. Matriz de compatibilidad

### §2.1 Matriz por eje de plataforma

Fuente vigente de esta matriz: la sección de compatibilidad y plataformas target del intake. Todos los valores marcados [E] son evidencia verificable en las fuentes citadas allí.

| Elemento de plataforma | Eje | Versión mínima | Motivo de la restricción |
| --- | --- | --- | --- |
| Sistema operativo de ejecución | Ejecución | Linux Debian 13, kernel 6.12 [E] | El destino final es un contenedor Linux sobre el servidor de referencia |
| Entorno de ejecución de la aplicación | Ejecución y desarrollo | .NET 10 | Sin compatibilidad hacia atrás con entornos de ejecución anteriores; el proyecto no verifica ninguna otra versión |
| Motor de contenedores del host | Ejecución y desarrollo | Docker 26.x, con `compose` v5 y `buildx` [E] | Es el sustrato del producto, accedido por socket local. El cliente elegido declara soporte de la interfaz del motor v29.4.1 [E] |
| Almacenamiento | Ejecución | SQLite embebido en el proveedor de acceso a datos de .NET 10, con diario de escritura anticipada habilitado | El modelo de concurrencia y el esquema están atados a este almacenamiento |
| Formato de exportación | Ejecución | Docker Compose, en la versión que corresponde a `compose` v5 [E] | Es el formato con el que el parque existente ya está descripto |
| Navegador | Cliente | Google Chrome de escritorio, canal estable, versión 150.0.7871.186 [E] | Única familia soportada. El piso es la versión en uso del agente humano del proyecto al declarar la matriz; el canal estable se mantiene actualizado, de modo que el piso sube y nunca baja |
| Sistema operativo del cliente | Cliente | Windows Server 2022, versión 21H2, build 20348.5256 [E] | Es la máquina desde la que el administrador opera el panel. No es plataforma de ejecución ni de desarrollo |
| Red | Ejecución y cliente | Red local. El servicio no se publica a internet [E] | Reduce la latencia del canal permanente y el costo de una caída del transporte a un mecanismo de respaldo |

Evidencia de las dos filas de cliente: salida de la página de versión del navegador, aportada por el agente humano del proyecto el 2026-07-28, con Google Chrome 150.0.7871.186, build oficial de 64 bits, sobre Windows Server 2022 versión 21H2 build 20348.5256 [E].

Toda otra familia de navegador de escritorio se declara no soportada, incluidas Firefox, Safari, Edge y sus derivados.

### §2.2 Matriz por componente

Los componentes son las cuatro capas internas del proyecto de código, más los dos entornos que lo construyen y lo entregan. Los nombres de capa se citan porque esta matriz alimenta la configuración de la categoría 09-Devops, que los necesita para derivar filtros y verificaciones.

| Componente | Sistema operativo | Entorno de ejecución | Motor de contenedores | Almacenamiento | Navegador |
| --- | --- | --- | --- | --- | --- |
| Capa `Web` | Linux Debian 13, kernel 6.12 | .NET 10 | Docker 26.x con `compose` v5 y `buildx`, por socket del host | Delegado en la capa `Infrastructure` | Google Chrome de escritorio, canal estable, ≥ 150.0.7871.186 |
| Capa `Application` | Indiferente | .NET 10 | No aplica | No aplica | No aplica |
| Capa `Infrastructure` | Linux Debian 13, kernel 6.12 | .NET 10 | Docker 26.x; el cliente declara soporte de la interfaz del motor v29.4.1 | SQLite embebido en el proveedor de acceso a datos de .NET 10, con diario de escritura anticipada | No aplica |
| Capa `Domain` | Indiferente | .NET 10 | No aplica | No aplica | No aplica |
| Entorno de desarrollo | Linux, sobre el equipo del desarrollador | .NET 10 dentro del entorno contenedorizado | Motor del propio equipo, con patrón de motor externo | Archivo local de SQLite | Navegador del equipo del desarrollador, misma familia y piso de versión |
| Pipeline | Linux, ejecutor autoalojado en el propio servidor | .NET 10 | Motor del propio servidor | SQLite real en las pruebas de integración | No aplica |

La columna de navegador de las capas `Application`, `Infrastructure` y `Domain` dice «no aplica» porque ninguna de las tres tiene superficie de presentación. La fila de la capa `Web` es la única que la matriz de navegador alcanza.

### §2.3 Regla de cierre de la matriz

Toda combinación de plataforma no listada en §2.1 y §2.2 se considera no soportada. No hay soporte parcial ni soporte de hecho: una plataforma que no aparece no tiene verificación asociada y por lo tanto no puede declararse compatible.

En particular, no hay soporte para motores de contenedores distintos del declarado, ni para almacenamientos distintos del declarado, ni para Windows o macOS como plataformas de ejecución o de desarrollo. No hay guiones para intérpretes de comandos de Windows y no se van a agregar: el equipo de desarrollo es Linux, el entorno es Linux y el destino es Linux [E]. La fila del sistema operativo del cliente no contradice eso: declara el tercer eje de §1.2, que es el único de los tres que es Windows.

---

## §3. Restricciones de plataforma justificadas

### §3.1 Catálogo de restricciones de plataforma

Nueve restricciones con identificador emitido por la Fase A previa y conservado [FA], más una décima que este documento emite para la decisión de navegador tomada el 2026-07-28.

| ID | Restricción | Justificación | Consecuencia asumida |
| --- | --- | --- | --- |
| CP-01 | Una única combinación de sistema operativo y entorno de ejecución, sin matriz de variantes | Un solo servidor, un solo administrador y ningún caso de distribución | Sin guiones alternativos por plataforma; los guiones no detectan entorno ni ramifican |
| CP-02 | El equipo de desarrollo no tiene ni tendrá herramientas de construcción instaladas | Restricción declarada por el cliente: el único requisito del equipo es el motor de contenedores | Todo comando corre dentro del entorno contenedorizado |
| CP-03 | El directorio de datos de trabajo montado en la misma ruta absoluta en el equipo y en el entorno | El adaptador del motor de contenedores comparte rutas con el motor del host | La ruta se expone como única variable de configuración y es la raíz del adaptador |
| CP-04 | Los contenedores creados son hermanos del entorno de desarrollo, no hijos | Consecuencia del patrón de motor externo elegido | Para alcanzar por red un servicio recién desplegado hay que adjuntarse a su red o usar el puerto publicado |
| CP-05 | Sin soporte para motores de contenedores distintos del declarado | Ningún otro motor está verificado, y verificar uno tiene costo sin beneficio para este caso | El punto de extensión existe detrás de una única abstracción, pero no es una compatibilidad ofrecida |
| CP-06 | Sin soporte para almacenamientos distintos del declarado | El modelo de concurrencia y el esquema están atados al declarado | Dos instancias sobre el mismo archivo de datos no están soportadas |
| CP-07 | El servicio no se publica a internet | El acceso al socket del motor de contenedores equivale a control total del host | Sin superficie pública ni certificado gestionado por la solución |
| CP-08 | Las capas `Domain` y `Application` no pueden tener superficie de plataforma | Las pruebas de dominio deben correr sin infraestructura, y la regla de aislamiento del cliente del motor es bloqueante | Control de arquitectura bloqueante en el pipeline, no una convención |
| CP-09 | El entorno de desarrollo no define ni condiciona la imagen de producción | Son dos artefactos con propósitos distintos | La imagen de producción se construye con su propia definición multietapa |
| CP-10 | Una única familia de navegador de escritorio, con piso de versión concreto y creciente | La interfaz vive en el servidor y el navegador es una pantalla conectada por un canal permanente: cada clic, cada arrastre de un nodo y cada tecla es un viaje de ida y vuelta. El navegador no afecta el aspecto, afecta si la aplicación funciona | Cada guion de demostración se ejecuta sobre la familia declarada, con versión igual o superior al piso, y el número de versión concreto se registra en el informe de cierre de esa etapa |

CP-10 no es una restricción nueva ni una decisión de esta categoría: es el identificador que este documento emite, siguiendo la serie `CP-XX` ya en uso, para la decisión que el agente humano del proyecto tomó el 2026-07-28 y que §17.P.9 del intake declara con su evidencia. Tanto la familia y el piso de versión como el criterio verificable que la acompaña se transcriben de esa sección. Con esa decisión se cerró la única pendiente de plataforma que la Fase A dejaba abierta. Antes de esa decisión, la fila de navegador era la única de la matriz sin versión mínima concreta, y bloqueaba a tres categorías. Desde entonces no es brecha.

El criterio verificable que CP-10 deriva existe para que los guiones de demostración no admitan dos ejecuciones con resultados distintos: un guion que dice «abrí el panel y arrastrá un nodo» sin declarar dónde no es verificable.

### §3.2 Riesgos que la matriz no elimina

La decisión de matriz cerró la brecha, pero no elimina tres de los cinco componentes del riesgo que el análisis de la Fase A identificó. Dejan de ser brecha de matriz y pasan a ser riesgos abiertos con medición asignada. Los identificadores `RP-XX` son los que emite [Visión de Producto](Vision-Producto.md) §8.2.

| Componente del riesgo | ¿Lo resuelve la red local? | ¿Lo resuelve la elección de familia? | Riesgo abierto y medición asignada |
| --- | --- | --- | --- |
| Latencia del viaje entre navegador y servidor | Sí, en buena medida. Es el componente que la red local elimina | Parcialmente | Cerrado. Cubierto por los umbrales de PT-01, que se miden en red local |
| Caída del transporte a un mecanismo de respaldo | Parcialmente. Sigue ocurriendo si algo bloquea la actualización de protocolo, pero su costo es mucho menor sobre un trayecto corto | Parcialmente | Cerrado con riesgo residual aceptado. El mecanismo de respaldo está explícitamente descartado como transporte por su efecto sobre la fluidez del lienzo |
| Suspensión de la pestaña en segundo plano | No. Es decisión del navegador sobre sus propias pestañas | No | RP-01. Medición asignada a 08-Calidad-Y-Pruebas, como criterio de compatibilidad de interfaz. El uso previsto incluye dejar el panel abierto y volver a mirarlo |
| Capacidades gráficas del motor de renderizado para dibujar el lienzo | No. El dibujado ocurre enteramente del lado del navegador | No | RP-02. Medición asignada a PT-01, sobre la versión mínima declarada |
| Memoria del canal en el servidor tras uso continuo | No | No | RP-03. PT-01 mide el consumo por canal tras quince minutos de uso continuo, con umbral de consumo estable y sin crecimiento sostenido |

---

## §4. Alternativas para plataformas no soportadas

| Plataforma no soportada | Alternativa |
| --- | --- |
| Windows como plataforma de ejecución o de desarrollo | Ninguna dentro del alcance. La vía practicable, ejecutar el entorno sobre un subsistema Linux con motor propio, queda fuera de lo verificado. No hay guiones para intérpretes de comandos de Windows y no se van a agregar |
| macOS como plataforma de ejecución o de desarrollo | Ninguna dentro del alcance. El proyecto no verifica esa combinación |
| Familias de navegador de escritorio distintas de la declarada | Ninguna dentro del alcance. Agregar otra familia más adelante no está cerrado, y su costo es ejecutar los guiones de demostración una vez por familia |
| Navegadores sin soporte de canal permanente | Ninguna. La sesión persistente es constitutiva del modelo de interfaz, y el mecanismo de respaldo como transporte alternativo está explícitamente descartado por su efecto sobre la fluidez del lienzo |
| Navegadores móviles y pantallas pequeñas | Fuera de la matriz. No son plataforma target: los anchos de ventana en los que se verifica el comportamiento responsivo los declara la maqueta y los registra la etapa `b` en su informe de cierre |
| Otros motores de contenedores | El adaptador vive detrás de una única abstracción, de modo que sustituirlo es trabajo acotado a un componente, y la batería de pruebas de contrato diría si un reemplazo es equivalente. Es un punto de extensión declarado, no una compatibilidad ofrecida (CP-05) |
| Otros almacenamientos | Ninguna. El modelo de concurrencia y el esquema están atados al declarado; cambiarlo es una decisión de arquitectura con registro propio (CP-06) |
| Acceso desde fuera de la red local | Ninguna. Requeriría una capa de protección adicional, hoy excluida del alcance del proyecto |
| Más de una instancia sobre el mismo almacenamiento | Ninguna. Es una carga que la solución declara no soportar (CP-06) |

---

## §5. Estado de implementación por plataforma

El sistema todavía no está construido. La matriz de §2 especifica el objetivo, y esta tabla declara con qué se va a verificar cada fila y dónde queda su evidencia. Ninguna fila puede declararse compatible antes de que su verificación exista.

| Plataforma o combinación | Estado | Verificación prevista | Dónde queda la evidencia |
| --- | --- | --- | --- |
| Linux Debian 13 con .NET 10, como plataforma de ejecución | No construido. Verificación prevista | Construcción y arranque desde los guiones dentro del entorno, con la página de salud respondiendo en el navegador del equipo del desarrollador | Etapa `a` y su informe de cierre |
| Motor de contenedores por socket | No construido. Verificación prevista | La puerta técnica PT-02, materializada como prueba de integración automatizada | Etapa `a`, prueba de integración y su ejemplo ejecutable |
| Almacenamiento con diario de escritura anticipada | No construido. Verificación prevista | Pruebas de integración con almacenamiento real, más la validación del comportamiento bajo escritura concurrente | Categoría 08-Calidad-Y-Pruebas |
| Navegador de la familia declarada, con piso de versión | No construido. Verificación prevista | La puerta técnica PT-01 sobre la familia y el piso declarados, con el número de versión concreto y los anchos de ventana verificados registrados en el informe de cierre | Etapa `b`, etapa del lienzo y sus informes de cierre |
| Sistema operativo del cliente | Declarado y con evidencia [E], sin verificación pendiente | Es dato del entorno del administrador, no un objetivo de construcción. Su evidencia es la salida de la página de versión del navegador del 2026-07-28 | Este documento, §2.1 |
| Entorno de desarrollo contenedorizado con motor externo | No construido. Verificación prevista | El propio arranque de la etapa `a`, que sólo puede ocurrir dentro del entorno | Etapa `a` y su informe de cierre |
| Ejecutor autoalojado del pipeline | No construido. Verificación prevista | Ejecución del control de pruebas de integración, que requiere el socket del motor disponible en el ejecutor | Categoría 09-Devops |
| Ausencia de superficie de plataforma en las capas `Domain` y `Application` | No construido. Verificación prevista | Control de arquitectura bloqueante: cero dependencias externas en la capa `Domain`, y ningún tipo del cliente del motor fuera de su carpeta de adaptador | Controles del pipeline, categoría 09-Devops |

---

## §6. Trazabilidad downstream

| Categoría que consume | Qué consume de este documento |
| --- | --- |
| 09-Devops | La matriz de §2 completa, para derivar la configuración del pipeline, la imagen de producción, el ejecutor autoalojado y los controles de arquitectura bloqueantes; y la tabla de §5, que declara qué verificación cubre cada fila |
| 08-Calidad-Y-Pruebas | El criterio verificable de CP-10, la medición asignada a RP-01, y las verificaciones previstas de §5 que le quedan asignadas: almacenamiento con escritura concurrente y compatibilidad de interfaz |
| 03-UX-UI-DX | La familia y el piso de versión de navegador de §2.1, que es contra lo que se diseña; y la exclusión de navegadores móviles y pantallas pequeñas de §4, que acota los anchos de ventana a verificar |
| 05-Arquitectura-Tecnica | Las restricciones CP-03, CP-04, CP-05, CP-06, CP-08 y CP-09, que condicionan el adaptador del motor de contenedores, la persistencia y la separación entre capas |

Trazabilidad upstream: este documento consolida la sección de compatibilidad y plataformas target del intake, que es su fuente vigente, y la matriz por componente que la Fase A previa había consolidado [FA]. Donde las dos difieren, prevalece el intake: la matriz de la Fase A no tiene las dos filas de cliente.

---

## Control de cambios

| Versión | Fecha | Cambios | Autor |
| --- | --- | --- | --- |
| 1.0 | 2026-07-29 | Versión inicial, generada bajo el conjunto normativo 4.0 del Framework SDD a partir de `SOLUTION-INTAKE-SelfHosted-Service` versión 2.2. Se genera por decisión declarada, y no por regla de la tabla de inclusión de la categoría, con el motivo registrado en §1.1. Conserva los identificadores `CP-01` a `CP-09` de la Fase A previa y emite `CP-10` para la decisión de navegador del 2026-07-28. Corrige la columna de componente de la matriz de la Fase A, que nombraba proyectos de código que dejaron de existir, y pasa a nombrar las capas equivalentes; ninguna plataforma, entorno de ejecución ni umbral cambió por esa corrección. Consolida en §3.2 los tres riesgos que la matriz no elimina, con su medición asignada | Product Manager Senior (AG-00) |
| 1.0 | 2026-07-29 | Adecuación a `Rules-Contexto` 2.1, absorbida dentro de la versión de emisión, sin subir versión y sin archivar, por la política de versionado de `Master-Prompt.md` §5. Se corrió el catálogo de ambigüedades de §6.1 sobre el documento: E1 no aplica, porque la solución tiene un único proyecto de código y no hay plataformas que agregar entre proyectos; E2 está cubierto, porque las ocho filas de §2.1 llevan versión mínima. §3.1: se precisa que CP-10 no es una restricción originada en esta categoría sino el identificador emitido para la decisión que el agente humano del proyecto tomó el 2026-07-28 y que §17.P.9 del intake declara con su evidencia, de la que se transcriben tanto la matriz como el criterio verificable | Product Manager Senior (AG-00) |
