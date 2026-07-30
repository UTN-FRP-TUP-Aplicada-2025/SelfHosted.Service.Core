# Alcance del Proyecto

**Proyecto:** SelfHosted Service (`Nombre-Solucion`: `SelfHosted-Service`)
**Documento:** Alcance-Proyecto.md
**Versión:** 1.0
**Estado:** Propuesto
**Fecha:** 2026-07-29
**Autor:** Product Manager Senior (AG-00)
**Trazabilidad upstream:** SOLUTION-INTAKE-SelfHosted-Service §1, §4, §6, §9, §10, §12, §15, §15.1, §19, §22.2, §22.3, §24.1, §24.3, y la sección «Supuestos registrados por este intake y su estado»
**Trazabilidad downstream:** 01-Necesidades-Negocio, 02-Especificacion-Funcional, 03-UX-UI-DX, 05-Arquitectura-Tecnica, 06-Backlog-Tecnico, 07-Plan-Sprint, 08-Calidad-Y-Pruebas, 10-Examples

---

## Tabla de contenido

- [§1. Propósito](#1-propósito)
- [§2. Descripción general](#2-descripción-general)
  - [§2.1 Qué construye este proyecto](#21-qué-construye-este-proyecto)
  - [§2.2 Desambiguación de «alcance» y de «proyecto»](#22-desambiguación-de-alcance-y-de-proyecto)
- [§3. Objetivos del proyecto](#3-objetivos-del-proyecto)
- [§4. Alcance incluido](#4-alcance-incluido)
  - [§4.1 Capacidades](#41-capacidades)
  - [§4.2 Entregables](#42-entregables)
  - [§4.3 Ambientes](#43-ambientes)
- [§5. Alcance excluido](#5-alcance-excluido)
  - [§5.1 Exclusiones declaradas por el cliente](#51-exclusiones-declaradas-por-el-cliente)
  - [§5.2 Capacidades etiquetadas fuera de la primera versión](#52-capacidades-etiquetadas-fuera-de-la-primera-versión)
- [§6. Supuestos](#6-supuestos)
  - [§6.1 Supuestos resueltos](#61-supuestos-resueltos)
  - [§6.2 Material que se consume como revisable](#62-material-que-se-consume-como-revisable)
  - [§6.3 Brechas abiertas y su destinatario](#63-brechas-abiertas-y-su-destinatario)
- [§7. Restricciones](#7-restricciones)
- [§8. Criterios de aceptación del proyecto](#8-criterios-de-aceptación-del-proyecto)
- [§9. Gestión de cambios de alcance](#9-gestión-de-cambios-de-alcance)
- [§10. Trazabilidad](#10-trazabilidad)
  - [§10.1 Upstream](#101-upstream)
  - [§10.2 Downstream](#102-downstream)
- [Control de cambios](#control-de-cambios)

---

## §1. Propósito

Este documento fija qué entra y qué no entra en la construcción de SelfHosted Service, con qué supuestos y contra qué criterios se acepta el resultado. Es la referencia que evita que una capacidad excluida vuelva a entrar sin decisión explícita, y la que permite a las categorías de especificación funcional y de backlog trabajar sin volver a preguntarle al cliente qué estaba dentro y qué estaba fuera.

Lo que este documento no hace: no ordena las capacidades en el tiempo, que es materia del [Roadmap de Producto](Roadmap-Producto.md); no fija plataformas soportadas, que es materia de [Compatibilidad de Plataformas](Compatibilidad-Plataformas.md); y no define el porqué del producto ni sus métricas de negocio, que están en [Visión de Producto](Vision-Producto.md).

---

## §2. Descripción general

### §2.1 Qué construye este proyecto

Se construye una aplicación web autoalojada que permite declarar, ver, desplegar y operar la arquitectura de conjuntos de servicios contenedorizados sobre un único servidor de la red local, y que además incorpora al modelo los contenedores que ya están corriendo sin reinstanciarlos.

La entrega se organiza en cuatro alcances incrementales declarados por el cliente. El Alcance 1 es el mínimo sin el cual la solución no resuelve el problema; los tres siguientes agregan observabilidad, portabilidad y automatización. Cada alcance se corta en etapas, y cada etapa entrega una funcionalidad acotada operativa de punta a punta.

### §2.2 Desambiguación de «alcance» y de «proyecto»

Dos términos de este documento designan más de una cosa y conviene fijarlos antes de usarlos:

| Término | Qué designa acá | Cómo se escribe |
| --- | --- | --- |
| Alcance del proyecto | Lo que este documento delimita: qué se construye y qué no | «el alcance del proyecto», o «el alcance» a secas |
| Alcance 1 a Alcance 4 | Los cuatro incrementos de producto declarados por el cliente, cada uno con sus capacidades | Siempre con su número: «el Alcance 1» |
| Proyecto | El emprendimiento: sus etapas, su alcance, sus objetivos y sus criterios de aceptación. Es el sentido predominante de este documento | «proyecto» a secas, sin calificar |
| Proyecto SelfHosted | El objeto del producto: la arquitectura de servicios contenedorizados con su red y su lienzo, que el usuario crea desde el portal | Siempre calificado, salvo donde el contexto ya lo fijó y el otro sentido no está cerca |
| Proyecto de código | La unidad de compilación del repositorio. Es una sola | Siempre completo, sin excepción |

---

## §3. Objetivos del proyecto

Siete objetivos de proyecto, con los identificadores emitidos por la Fase A previa y conservados [FA]. Cada uno está al servicio de al menos un objetivo de negocio de la [Visión de Producto](Vision-Producto.md) §5.

| ID | Objetivo del proyecto | Sirve a |
| --- | --- | --- |
| OP-01 | Un registro único y navegable de la arquitectura de cada conjunto de servicios | OBJ-01, OBJ-02 |
| OP-02 | Incorporar el parque existente sin cortar servicio ni reinstanciar contenedores | OBJ-01 |
| OP-03 | Despliegue derivado de la configuración declarada, con revisión previa del impacto | OBJ-02 |
| OP-04 | El conflicto de direcciones de red como regla verificada antes de arrancar | OBJ-02 |
| OP-05 | Arquitectura reproducible fuera del servidor, sin filtrar credenciales | OBJ-03 |
| OP-06 | Entrega por etapas cerradas y demostrables, sin regresión acumulada | OBJ-04 |
| OP-07 | Sostener la escala real del servidor sin degradación perceptible | OBJ-05 |

OP-07 sirve a OBJ-05, que sigue pendiente de confirmación por el agente humano del proyecto (ver Visión de Producto §5). Los umbrales que lo sostienen provienen de la puerta técnica PT-01 y son evidencia declarada por las fuentes.

---

## §4. Alcance incluido

### §4.1 Capacidades

Veinte capacidades entran en el alcance del proyecto. Los identificadores `F-XX` son los del intake y no se renumeran. La etiqueta MoSCoW traduce la pertenencia a cada alcance incremental: el Alcance 1 es el conjunto Must Have.

| ID | Capacidad | MoSCoW | Alcance |
| --- | --- | --- | --- |
| F-01 | Alta del administrador único en el primer arranque, con validación de contraseña, sesión recordada, cambio de contraseña y cierre de sesión | Must Have | Alcance 1 |
| F-02 | Alta, listado, renombrado y eliminación de proyectos SelfHosted, con su modo de red y su persistencia | Must Have | Alcance 1 |
| F-03 | Alta y configuración de servicios de un proyecto SelfHosted: origen de imagen, variables, puertos, montajes, dispositivos, capacidades, recursos, política de reinicio y marca de efímero | Must Have | Alcance 1 |
| F-04 | Lienzo visual: nodos de servicio, aristas de dependencia, desplazamiento, zoom, agrupación y disposición persistente por proyecto SelfHosted | Must Have | Alcance 1 |
| F-05 | Despliegue de un servicio desde imagen de registro público, con estado real reflejado en el nodo y acceso a los registros del contenedor | Must Have | Alcance 1 |
| F-06 | Arranque y parada del proyecto SelfHosted completo y de cada servicio, con marca de autoarranque y respeto del orden declarado por el grafo | Must Have | Alcance 1 |
| F-07 | Changeset de cambios pendientes con informe de impacto y aplicación en lote con redespliegue de lo afectado | Must Have | Alcance 1 |
| F-08 | Rango de direcciones gestionado, reserva por servicio y bloqueo del arranque ante conflicto con un servicio activo de otro proyecto SelfHosted, con resoluciones ofrecidas | Must Have | Alcance 1 |
| F-09 | Escalado horizontal y vertical manuales: réplicas y límites de procesamiento y memoria | Must Have | Alcance 1 |
| F-10 | Despliegue construyendo la imagen desde una definición local o desde un repositorio remoto, con seguimiento del progreso de construcción | Must Have | Alcance 1 |
| F-11 | Descubrimiento de contenedores existentes en el servidor y adopción a un proyecto SelfHosted sin reinstanciarlos, con las salvaguardas de aislamiento | Must Have | Alcance 1 |
| F-12 | Tablero en tres capas: estado del servidor, vista general por proyecto SelfHosted y vista por contenedor | Should Have | Alcance 2 |
| F-13 | Exportación e importación de la arquitectura completa de un proyecto SelfHosted, con el manifiesto propio que preserva la disposición | Should Have | Alcance 3 |
| F-14 | Catálogo editable, exportable e importable de plantillas reutilizables con parámetros, como cuarta vía de alta de un servicio | Should Have | Alcance 3 |
| F-15 | Tokens de API con ámbitos, vigencia y revocación inmediata, emitidos desde la interfaz | Should Have | Alcance 4, con adelanto admitido al Alcance 1 |
| F-16 | Disparo de despliegue desde un automatismo de integración continua con token de ámbito mínimo | Could Have | Alcance 4 |
| F-17 | Exportación programada de proyectos SelfHosted y catálogo a un destino externo, como estrategia de respaldo | Could Have | Alcance 3 |
| F-23 | Variables compartidas del proyecto SelfHosted: definidas una vez a nivel proyecto, secretas o no, y referenciables desde cualquiera de sus servicios | Should Have | Sin alcance asignado. Ver §6.3 |
| F-24 | Referencias entre variables: a otra variable del propio servicio, a una variable compartida del proyecto SelfHosted o a una variable de otro servicio del mismo proyecto | Should Have | Sin alcance asignado. Ver §6.3 |
| F-25 | Higiene del modelo: el sistema detecta y advierte, sin bloquear, variables compartidas huérfanas, nombres repetidos en el mismo ámbito, claves que ya existen al instanciar y referencias que quedaron sin uso | Could Have | Sin alcance asignado. Ver §6.3 |

Ni la prioridad MoSCoW ni la asignación de alcance de esta tabla se originan acá. La prioridad es la que declara §4 del intake, y el alcance se deriva de la correspondencia entre épica y fase de §22.4, con una salvedad que hay que arrastrar: el reparto de F-12, F-14 y F-17 entre el Alcance 2 y el Alcance 3 no lo declara el cliente, es derivación de la Fase A previa [FA] y sigue pendiente de confirmación. Está registrado como brecha en [Roadmap-Producto.md](Roadmap-Producto.md) §2.6.

Tres precisiones que el intake declara y que condicionan la especificación funcional:

- El catálogo (F-14) es una cuarta vía de alta de un servicio, no un cuarto origen. Nada del catálogo corre: sus ítems son definiciones en reposo. El catálogo arranca vacío en una instalación nueva, y un ítem contiene un subgrafo de uno o varios servicios con sus aristas, no un servicio suelto (decisión D-7).
- El carácter de secreto de una variable se declara, no se infiere: la adopción no se completa sin un paso obligatorio de clasificación de variables (decisión D-2).
- Un despliegue parcial es un estado legítimo del modelo, no un accidente a evitar: el resultado del despliegue se determina por contenedor y no por operación (decisión D-1).

### §4.2 Entregables

| ID | Entregable | Quién lo recibe |
| --- | --- | --- |
| EN-01 | Aplicación desplegable en el servidor de referencia, único artefacto ejecutable de la solución | Agente humano del proyecto |
| EN-02 | Especificación de la solución: el conjunto de categorías de documentación generadas bajo `SDD/Docs/` | Equipo de desarrollo y agente IA de codificación |
| EN-03 | Informe de cierre por etapa, de trece secciones, con su índice acumulativo | Agente humano del proyecto |
| EN-04 | Guion de demostración por etapa, que debe seguir pasando en todas las etapas posteriores | Agente humano del proyecto |
| EN-05 | Materializaciones de las puertas técnicas PT-01 y PT-02 | Equipo de desarrollo |
| EN-06 | Juego de datos de siembra que reproduce el parque de contenedores de referencia | Agente humano del proyecto y equipo de desarrollo |
| EN-07 | Registro de cambios de la solución, actualizado en la rama de cada etapa | Agente humano del proyecto |

### §4.3 Ambientes

| Ambiente | Qué es | Quién lo opera |
| --- | --- | --- |
| Desarrollo | Entorno contenedorizado declarativo sobre el equipo del desarrollador, con acceso al motor de contenedores de ese mismo equipo y resultado observado desde el navegador del equipo | Equipo de desarrollo |
| Producción | La solución corriendo como un contenedor más en el servidor de referencia | Agente humano del proyecto |

No hay ambiente intermedio de pruebas ni de preproducción. El punto de control de cada etapa cumple esa función, y es una decisión declarada por el cliente, no una omisión.

---

## §5. Alcance excluido

Ninguna exclusión de esta sección se origina acá. Las decisiones de exclusión son decisiones de producto, y su dueño es el Product Owner, que las declaró aguas arriba en §4 y §9 del intake. Esta categoría las deriva y las traza: por eso las dos tablas llevan columna de origen, y cada fila remite a la sección del intake que la declara. La justificación que aparece en cada fila es la que declara la fuente, no una construida acá.

### §5.1 Exclusiones declaradas por el cliente

Siete exclusiones declaradas en §9 del intake, cada una con su justificación y con la consecuencia que el proyecto acepta. Ninguna se resuelve en esta versión, y ninguna debe generarse por error desde la categoría 02-Especificacion-Funcional.

| Funcionalidad excluida | Justificación | Versión futura tentativa | Origen en el intake |
| --- | --- | --- | --- |
| Operación multiinquilino y orquestación de clúster | Hay un único administrador y un único servidor. Incorporar inquilinos exigiría un modelo de identidad, de aislamiento y de cuotas que multiplica el alcance sin resolver el problema del propietario | No planificada. La fuente declara explícitamente que no se contempla incorporación futura | §9, exclusión 1 [E] |
| Administración de proxies, proxies inversos y dominios públicos gestionados | Declarado fuera de alcance desde la definición del servicio. Consecuencia aceptada: el reemplazo de una versión de un servicio es detener y arrancar, con ventana de indisponibilidad que la interfaz debe advertir al confirmar el redespliegue | No declarada por la fuente. La capacidad equivalente F-19 está etiquetada `Won't Have v1` | §9, exclusión 2 [E]; §4, F-19 |
| Balanceo de carga entre réplicas | Consecuencia aceptada y señalada como inconsistencia IC-04 por el análisis: las réplicas creadas por el escalado horizontal no tienen quién distribuya el tráfico entre ellas. En este alcance el escalado horizontal sirve para procesos sin tráfico entrante | No declarada por la fuente. La capacidad equivalente F-20 está etiquetada `Won't Have v1` | §9, exclusión 3 [E]; §4, F-20 |
| Exposición del servicio a internet | El acceso al socket del motor de contenedores equivale a control total del host; el servicio se expone sólo en la red local | Podría incorporarse el día que exista una capa de protección adicional, que hoy está fuera de alcance | §9, exclusión 4 [E] |
| Gestión de usuarios, roles y permisos | Un solo administrador. La decisión de autenticación adoptada no bloquea incorporar un segundo factor más adelante, pero el primer alcance no lo incluye | No declarada por la fuente. Las capacidades equivalentes F-21 y F-18 están etiquetadas `Won't Have v1` | §9, exclusión 5 [E]; §4, F-21 y F-18 |
| Monitoreo por peticiones contra los servicios | Cuando los contenedores toman una dirección propia de la red local, el host no los alcanza por la misma placa de red. La fuente de verdad del estado es el motor de contenedores: estado del contenedor, verificación de salud declarada en la imagen y estadísticas de uso | No declarada por la fuente. El motivo que la fuente da es de topología de red y no de alcance temporal | §9, exclusión 6 [E] |
| Recuperación de contraseñas | Con un único usuario y acceso físico al archivo de base de datos, el mecanismo de recuperación aportaría superficie de ataque sin resolver un problema real | No declarada por la fuente. La capacidad equivalente F-22 está etiquetada `Won't Have v1` | §9, exclusión 7 [E]; §4, F-22 |

La columna de versión futura tentativa declara «no declarada por la fuente» donde el intake no se pronuncia, en lugar de proponer una. Proponer un horizonte de reincorporación sería una decisión de producto, y esta categoría no las toma.

### §5.2 Capacidades etiquetadas fuera de la primera versión

Cinco capacidades del intake §4 llevan la etiqueta MoSCoW `Won't Have v1`, que es la forma en que el Product Owner declara su exclusión, y cada una tiene además su exclusión correspondiente en §9. Se listan con su identificador para que ningún artefacto downstream las genere y para que un pedido futuro reutilice el identificador en lugar de emitir uno nuevo.

| ID | Capacidad excluida | Justificación | Versión futura tentativa | Origen en el intake |
| --- | --- | --- | --- | --- |
| F-18 | Segundo factor de autenticación | Un solo administrador. La decisión de autenticación adoptada no bloquea incorporarlo más adelante, pero el primer alcance no lo incluye | No declarada por la fuente, más allá de que incorporarlo más adelante no está bloqueado | §4, `Won't Have v1`; §9, exclusión 5 [E]; §22.1 [FA], entre lo que se posterga explícitamente |
| F-19 | Administración de proxies o proxies inversos y dominios públicos gestionados | Está declarado fuera de alcance desde la definición del servicio. Consecuencia aceptada: no hay dominios públicos gestionados | No declarada por la fuente | §4, `Won't Have v1`; §9, exclusión 2 [E]; §22.1 [FA] |
| F-20 | Balanceo de carga entre réplicas y despliegue sin interrupción con solapamiento de versiones | Las réplicas creadas por el escalado horizontal no tienen quién distribuya el tráfico entre ellas; el análisis lo señala como inconsistencia IC-04 y la consecuencia está aceptada. El reemplazo de una versión es detener y arrancar, con ventana de indisponibilidad | No declarada por la fuente | §4, `Won't Have v1`; §9, exclusiones 2 y 3 [E]; §22.1 [FA] |
| F-21 | Gestión de múltiples usuarios, roles y permisos | Un solo administrador | No declarada por la fuente | §4, `Won't Have v1`; §9, exclusión 5 [E]; §22.1 [FA] |
| F-22 | Recuperación de contraseña | Con un único usuario y acceso físico al archivo de base de datos, el mecanismo de recuperación aportaría superficie de ataque sin resolver un problema real | No declarada por la fuente | §4, `Won't Have v1`; §9, exclusión 7 [E] |

Las cinco no generan necesidad de negocio en la categoría 01 y no deben aparecer como caso de uso en la categoría 02.

---

## §6. Supuestos

### §6.1 Supuestos resueltos

Los seis supuestos que el intake registró fueron resueltos por el agente humano del proyecto el 2026-07-27 y son dato cerrado. Se listan porque su resolución sostiene contenido de este documento y de la Visión de Producto.

| ID | Supuesto | Estado | Efecto sobre el alcance |
| --- | --- | --- | --- |
| S-01 | Las cuatro métricas de éxito de negocio y sus umbrales | Confirmado sin cambios | Fijan los objetivos OBJ-01 a OBJ-04 y los criterios de aceptación que los miden |
| S-02 | Cobertura mínima de líneas y de ramas | Confirmado sin cambios | Es control bloqueante del pipeline, y condiciona la definición de terminado del [Acuerdo de Equipo](Acuerdo-Equipo.md) |
| S-03 | Los umbrales de los requerimientos no funcionales que no vienen de una puerta técnica | Confirmado sin cambios | Fijan los umbrales que la categoría 08 debe verificar |
| S-04 | Esquema de versionado y convención de mensajes de commit, con etiquetado por etapa cerrada | Confirmado sin cambios | Condiciona el flujo de trabajo del Acuerdo de Equipo |
| S-05 | La URL del repositorio remoto | Resuelto con evidencia verificable | Confirma el flujo de una rama y un pull request por etapa |
| S-06 | El nombre propio del propietario del problema y del lead técnico | Cerrado por identificación de rol | Ningún artefacto downstream debe pedir un nombre propio |

Además, dos marcadores de supuesto sin número quedaron cerrados el 2026-07-28: la matriz de navegadores, que hoy está declarada y consolidada en [Compatibilidad de Plataformas](Compatibilidad-Plataformas.md); y la verificación de que un contenedor no esté ya adoptado por otro proyecto SelfHosted, cerrada sin cambio de reglas por la decisión D-3.

### §6.2 Material que se consume como revisable

Dieciséis especificaciones de integración, identificadas `DI-01` a `DI-16` en el intake, fueron derivadas por el orquestador al integrar las decisiones del agente humano del proyecto, para hacerlas operables. Están aplicadas y la cadena puede consumirlas, pero no las decidió el cliente. Dos fueron revisadas y aprobadas al cierre de la Fase A (DI-01 y DI-03) y catorce siguen sin revisar.

Regla que este documento fija para toda la cadena: las catorce sin revisar se consumen declarándolas revisables, nunca como requisito cerrado del cliente. Si el agente humano prefiere otra forma para cualquiera de ellas, se reemplaza la especificación sin tocar la decisión que la originó ni reabrir el caso límite que la produjo. Su detalle vive en el intake §19 y §24.1, y sus consumidores principales son las categorías 02-Especificacion-Funcional, 05-Arquitectura-Tecnica y 08-Calidad-Y-Pruebas.

De la misma manera, todo el material transcripto en la Parte E del intake y marcado [FA] es producto de la Fase A previa y se consume como propuesta, salvo en los puntos donde la propia Parte E declara que el agente humano del proyecto se pronunció.

### §6.3 Brechas abiertas y su destinatario

Este documento no resuelve ninguna de estas brechas. Las declara con su destinatario, porque resolverlas por cuenta propia es el error que la cadena ya tuvo que corregir tres veces.

| Brecha | Qué falta decidir | Categoría destinataria |
| --- | --- | --- |
| Asignación de F-23, F-24 y F-25 a un alcance y a un corte vertical | Los diez cortes verticales del Alcance 1 están declarados de forma cerrada [E] y ninguna de las tres figura entre ellos. Ubicarlas exige decidir si abren un corte propio o se suman a uno existente | 07-Plan-Sprint, con el Roadmap de Producto §2.6 como registro de la brecha |
| Detección de un literal que duplica un valor provisto por el sistema | Si la interfaz lo detecta y señala, con qué forma, en qué momento y si es bloqueante o descartable | 03-UX-UI-DX y 02-Especificacion-Funcional |
| Distinción visual entre las aristas que declaran espera y las que no | Qué lenguaje visual las distingue, incluida la arista que existe sin variable y sólo por su espera | 03-UX-UI-DX y la maqueta de validación visual |
| Maquetado del paso de clasificación de variables de la adopción y de la pantalla de variables compartidas del proyecto SelfHosted | Las dos pantallas son obligatorias y el maquetado de referencia no declara ninguna; el mapa de navegación tampoco tiene ruta para las variables del proyecto SelfHosted | 03-UX-UI-DX |
| Modelado de los tres objetos declarados y no diseñados: el secreto, la red del proyecto SelfHosted y el volumen o directorio al que apunta un montaje | Si cada uno es entidad propia, cómo se persiste, cómo migra la forma actual y qué pasa con las exportaciones y con los huérfanos | 05-Arquitectura-Tecnica. Los tres son trabajo propio de esa categoría, no dato ya resuelto: recibe la prueba con la que decidir, no la decisión |
| Confirmación de OBJ-05 | Si el objetivo de escala se adopta como objetivo de negocio del cliente | Agente humano del proyecto, en el próximo punto de control |

---

## §7. Restricciones

Las doce restricciones del cliente están catalogadas en [Visión de Producto](Vision-Producto.md) §7. Acá se registra únicamente su efecto sobre el alcance del proyecto, que es lo que este documento tiene que hacer cumplir.

| ID | Efecto sobre el alcance del proyecto |
| --- | --- |
| RE-01 | El alcance de cada etapa debe ser recorrible por una persona en una sesión de demostración |
| RE-02 | El alcance no se recorta contra un calendario sino contra la demostrabilidad de cada etapa |
| RE-03 | Ninguna capacidad puede depender de un producto de licencia comercial; toda dependencia es de licencia abierta y permisiva |
| RE-04 | Una etapa no se inicia antes de que la anterior esté fusionada; el punto de control es un cuello por diseño |
| RE-05 | Ninguna capacidad puede prometer lo que el motor de contenedores no permite. Caso concreto: el escalado horizontal con dirección fija exige una dirección por réplica |
| RE-06 | La solución debe ser liviana: presupuesto de memoria de cientos de MB y sin sondeo agresivo de métricas. Ninguna capacidad puede violarlo |
| RE-07 | Ninguna capacidad de acceso remoto entra en el alcance |
| RE-08 | Ningún entregable puede requerir herramientas instaladas en el equipo del desarrollador fuera del entorno contenedorizado |
| RE-09 | Sin efecto sobre el alcance, declarado explícitamente para que no se lea como omisión: no hay capacidades de cumplimiento normativo que agregar |
| RE-10 | El flujo de una rama y un pull request por etapa es parte del alcance del proyecto, no una convención opcional |
| RE-11 | El informe de cierre es entregable de cada etapa, al mismo nivel que el código (EN-03) |
| RE-12 | Una etapa terminada puede quedar esperando su punto de control por tiempo indefinido, y esa espera no habilita a iniciar la siguiente |

---

## §8. Criterios de aceptación del proyecto

Diez criterios, con los identificadores emitidos por la Fase A previa y conservados [FA]. La categoría 08-Calidad-Y-Pruebas los convierte en verificaciones ejecutables.

| ID | Criterio | Cómo se verifica |
| --- | --- | --- |
| CA-01 | Las capacidades Must Have F-01 a F-11 entregadas y demostradas, cada una con su etapa cerrada y su punto de control aprobado | Índice de informes de cierre, con una etapa cerrada por capacidad |
| CA-02 | Cada etapa cerrada con su informe de trece secciones publicado antes del punto de control y anotado en el índice | Existencia del archivo, revisión de encabezados y del índice |
| CA-03 | Al cerrar cada etapa, los guiones de demostración de todas las anteriores siguen pasando sin corrección | Ejecución de los guiones previos antes de abrir el pull request |
| CA-04 | Las reglas de negocio que introduce cada etapa están cubiertas por pruebas automatizadas | Batería de pruebas de la etapa, con una prueba por regla introducida |
| CA-05 | La puerta técnica PT-01 medida y aprobada antes de comprometer el corte del lienzo | Medición registrada en el informe de cierre de la etapa que la mide |
| CA-06 | La puerta técnica PT-02 verificada antes del corte de despliegue, ya en la primera etapa | Materialización de PT-02 corriendo como prueba automatizada |
| CA-07 | Ningún secreto entra al repositorio ni sale por una exportación | Control de verificación de secretos en el pipeline y revisión de una exportación de ejemplo |
| CA-08 | Las salvaguardas de aislamiento presentes en toda operación sobre el motor de contenedores | Revisión de las etapas de despliegue y de adopción contra sus reglas |
| CA-09 | El parque de referencia se recorre con el juego de datos de siembra, sin configuración manual previa | Ejecución del juego de datos de siembra desde los guiones |
| CA-10 | Ninguna etapa se especifica con una decisión de producto pendiente que la alcance | Contraste de la especificación de la etapa contra el registro de brechas de §6.3 |

Los diez enunciados provienen de §22.3 del intake y no se modifican acá. La columna «Cómo se verifica» es formalización de esta categoría: hace explícito contra qué se contrasta cada criterio, sin alterar su enunciado ni agregar criterios nuevos. La forma definitiva de cada verificación la fija la categoría 08-Calidad-Y-Pruebas, que es su dueña.

CA-10 es el criterio que conecta este documento con §6.3: una brecha abierta no impide avanzar, pero impide especificar la etapa que la necesita.

---

## §9. Gestión de cambios de alcance

Seis reglas operativas, conservadas de la Fase A previa [FA]:

1. Todo pedido de cambio entra por el agente humano del proyecto, que es el único con autoridad para aceptarlo.
2. Se evalúa en un punto de control y nunca en medio de una etapa. Una etapa en curso no cambia de alcance.
3. Se clasifica en capacidad nueva, ampliación de una existente, o exclusión que se revierte, declarando qué etapa lo absorbe y qué se posterga a cambio.
4. El pedido aceptado se refleja en este documento y en las secciones de alcance funcional o de exclusiones del intake, conservando el identificador `F-XX` de la capacidad cuando ya existe.
5. Todo cambio aceptado obliga a revisar el Roadmap de Producto y las categorías 01-Necesidades-Negocio, 02-Especificacion-Funcional y 06-Backlog-Tecnico.
6. El pedido rechazado se registra igualmente como exclusión con su justificación, en §5, porque un pedido que no queda registrado vuelve.

---

## §10. Trazabilidad

### §10.1 Upstream

| Sección de este documento | Origen en el SOLUTION-INTAKE |
| --- | --- |
| §2 Descripción general | §1 Idea y problema; §6 Flujos típicos; §15 Esquema de descomposición y delivery; §12 Glosario del dominio del cliente |
| §3 Objetivos del proyecto | §22.3 [FA] |
| §4.1 Capacidades | §4 Alcance funcional pretendido (MoSCoW) |
| §4.2 Entregables y §4.3 Ambientes | §22.3 [FA]; §10 Restricciones del cliente; §15.1 Informe de cierre de etapa |
| §5 Alcance excluido | §9 Lo que NO es esta solución; §4 (F-18 a F-22) |
| §6 Supuestos | Tabla de supuestos del intake; §19; §24.1 y §24.3 |
| §7 Restricciones | §10 Restricciones del cliente; §22.2 [FA] |
| §8 Criterios de aceptación | §22.3 [FA]; §15 reglas de entrega |
| §9 Gestión de cambios de alcance | §22.3 [FA] |

### §10.2 Downstream

| Categoría que consume | Qué consume de este documento |
| --- | --- |
| 01-Necesidades-Negocio | Las capacidades de §4.1, que agrupa en necesidades; y las exclusiones de §5, que no generan necesidad |
| 02-Especificacion-Funcional | Las exclusiones de §5, para no generar casos de uso de capacidades excluidas; y el material revisable de §6.2 |
| 03-UX-UI-DX | Las tres brechas de §6.3 que le quedan asignadas |
| 05-Arquitectura-Tecnica | La brecha de los tres objetos declarados y no diseñados de §6.3; las restricciones RE-05, RE-06 y RE-08 de §7 |
| 06-Backlog-Tecnico | Las capacidades de §4.1 con su prioridad MoSCoW, como origen de las épicas y de sus ítems |
| 07-Plan-Sprint | Los ambientes de §4.3, los criterios de aceptación de §8 y la brecha de asignación de F-23 a F-25 |
| 08-Calidad-Y-Pruebas | Los criterios CA-01 a CA-10 de §8, que convierte en verificaciones ejecutables |
| 10-Examples | El entregable EN-06, que fija qué debe reproducir el juego de datos de siembra |

---

## Control de cambios

| Versión | Fecha | Cambios | Autor |
| --- | --- | --- | --- |
| 1.0 | 2026-07-29 | Versión inicial, generada bajo el conjunto normativo 4.0 del Framework SDD a partir de `SOLUTION-INTAKE-SelfHosted-Service` versión 2.2. Conserva los identificadores `OP-XX`, `EN-XX`, `CA-XX` y `RE-XX` emitidos por la Fase A previa, y los identificadores `F-XX` del intake. Declara seis brechas abiertas con su categoría destinataria en §6.3, sin resolver ninguna | Product Manager Senior (AG-00) |
| 1.0 | 2026-07-29 | Corrección de la cabecera absorbida dentro de la versión de emisión, sin subir versión, por la política de versionado de `Master-Prompt.md` §5: el documento estaba en estado `Propuesto` y la corrección proviene del audit de su propia fase. El campo `Trazabilidad upstream` se reconcilia con la unión de las secciones que la tabla de §10.1 declara como origen: se agregan §1, §12, §15.1 y la sección «Supuestos registrados por este intake y su estado», y se retira §5, que la cabecera nombraba sin que ninguna fila del cuerpo lo cite como origen. Origen: hallazgo H-02, P2, del informe [`Audit/A-00-01-r1.md`](../Audit/A-00-01-r1.md) | Product Manager Senior (AG-00) |
| 1.0 | 2026-07-29 | Adecuación a `Rules-Contexto` 2.1, absorbida dentro de la versión de emisión, sin subir versión y sin archivar, por la política de versionado de `Master-Prompt.md` §5. Se corrió el catálogo de ambigüedades de §6.1 sobre el documento, con foco en A1 a A4. §5: se agrega el enunciado de que ninguna exclusión se origina acá y columna `Origen en el intake` a las dos tablas. Se verificó que las cinco capacidades de §5.2 son derivables y no originadas: las cinco llevan etiqueta MoSCoW `Won't Have v1` del Product Owner en §4 del intake y cada una tiene su exclusión correspondiente en §9, de modo que permanecen en el alcance excluido con su traza. Se reemplazan por la redacción de la fuente tres justificaciones que llevaban glosa propia —F-18, F-20 y F-21— y se retira el horizonte de reincorporación que este documento había propuesto para F-18, que ninguna fuente declara; la columna de versión futura pasa a declarar «no declarada por la fuente» donde el intake no se pronuncia. §4.1: se declara que el reparto de F-12, F-14 y F-17 entre el Alcance 2 y el Alcance 3 es derivación [FA] pendiente de confirmación. §8: se declara que la columna de verificación es formalización de esta categoría y que su forma definitiva la fija 08-Calidad-Y-Pruebas | Product Manager Senior (AG-00) |
