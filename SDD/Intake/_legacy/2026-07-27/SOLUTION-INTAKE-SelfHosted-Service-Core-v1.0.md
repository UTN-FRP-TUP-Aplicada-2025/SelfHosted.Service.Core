# SOLUTION-INTAKE-SelfHosted-Service-Core-v1.0

**Plantilla aplicada:** `SOLUTION-INTAKE-template.md` v1.3 del Framework SDD.

| Campo | Valor |
|---|---|
| Nombre de la solución | SelfHosted.Service.Core |
| Cliente / Stakeholder principal | Propietario del servidor autoalojado de referencia, que opera el parque de contenedores y aprueba cada punto de control (rol; el nombre propio no está declarado en las fuentes) |
| Repositorio | Repositorio destino local `DEV/SelfHosted.Service.Core`. El flujo de trabajo previsto es una rama y un pull request por etapa sobre un remoto GitHub cuya URL todavía no está declarada en las fuentes |
| Lead técnico | Agente humano del proyecto: valida cada punto de control, ejecuta los guiones de demostración y realiza la fusión de cada rama de etapa |
| Documento | `SOLUTION-INTAKE-SelfHosted-Service-Core-v1.0.md` |
| Versión | 1.0 |
| Fecha | 2026-07-27 |
| Stack principal | .NET 10 con Blazor Interactive Server, MudBlazor 9.7.0, Entity Framework Core sobre SQLite |
| Estado | Borrador |

> Este documento captura qué quiere el cliente, cómo se compone la solución y cómo se construye cada proyecto.
> El orquestador deriva de §13 el `SOLUTION-MANIFEST` canónico; no se completa el manifiesto a mano.

## Procedencia de este intake y convención de marcadores

Este intake se construyó integrando tres documentos de entrada, todos residentes en el repositorio de documentación `DEV/SelfHosted.Service.Core.Documentos/PROMPTs/02-Ejecutar-Prompt-Integrador-Documento-Intake/INPUTs/`:

| Fuente | Rol en este intake | Precedencia |
|---|---|---|
| `Analisis-Final-Integrado.md` | Definición completa de la solución: dominio, modelos de datos, decisiones técnicas evaluadas, maquetado, reglas de negocio, riesgos y glosario | Base |
| `Requerimientos-Funcionales.md` | Decisiones funcionales y de planeamiento por etapas, con sus hitos, guiones de demostración y puntos de control | Prevalece sobre la base en materia funcional y de entrega |
| `Requerimientos-Tecnicos.md` | Decisiones técnicas cerradas: versiones ancladas, entorno de desarrollo, autenticación, persistencia, pruebas, despliegue, puertas técnicas y flujo de trabajo | Prevalece sobre la base en materia técnica |

Se conserva la convención de marcadores de la fuente base, porque es la que permite distinguir hecho de propuesta sin ambigüedad:

- **[E]** Evidencia: dato verificable en las fuentes citadas (versión y fecha de un paquete, cita textual de documentación oficial, relevamiento del entorno).
- **[D]** Diseño: decisión argumentada, tomada por el análisis integrado o por los documentos de requerimientos. Es discutible y revisable, pero está declarada.
- **[S]** Supuesto: asunción registrada ante información faltante en las fuentes. Requiere confirmación del cliente antes de que el orquestador la trate como cerrada. Todo supuesto de este intake está listado en la sección siguiente.

## Supuestos abiertos que este intake registra

Ninguno de estos valores está declarado en las tres fuentes. Se propone un valor operable para no bloquear la cadena y se marca para confirmación explícita.

| # | Sección | Supuesto adoptado | Por qué se necesita |
|---|---|---|---|
| S-01 | §8 | Las tres métricas de éxito de negocio y sus umbrales | El checklist §19 exige métricas SMART; las fuentes describen capacidades, no metas medidas |
| S-02 | §17 P.6 | Cobertura mínima de líneas y de ramas por proyecto | `Intake-Rules.md` §2 la declara bloqueante y numérica; las fuentes fijan los niveles de prueba pero no un umbral |
| S-03 | §17 P.10 | Los umbrales numéricos de los NFR (latencia, memoria, frecuencias) que no vienen de una puerta técnica | Ídem; los umbrales de PT-01 sí están declarados y se citan como [E] del documento técnico |
| S-04 | §17 P.7 | Adopción de SemVer 2.0.0 y Conventional Commits, y etiquetado por etapa cerrada | El documento técnico declara etiqueta por etapa, no el esquema de versión |
| S-05 | Cabecera | La URL del repositorio remoto GitHub | El flujo de trabajo declarado en `Requerimientos-Tecnicos.md` §10 la presupone |
| S-06 | §2 | El nombre propio del propietario del problema y del lead técnico | Las fuentes los nombran por rol ("agente humano", "administrador") |

No hay supuestos abiertos sobre el proceso de entrega: `Requerimientos-Funcionales.md` §2.3, §2.4 y §2.5 declaran de forma cerrada la plantilla de etapa, las reglas transversales y el informe de cierre con sus trece secciones obligatorias. Ese material se integra en §15 y condiciona §17.1 P.5 y P.8.

---

# Parte A — Negocio de la solución

## §1 Idea y problema

El propietario administra un servidor propio de desarrollo, pequeño y sin redundancia, sobre el que ya corre un parque de ocho contenedores y dieciocho imágenes, transcripto en el anexo [E-19](#2019--e-19--parque-de-contenedores-de-referencia) **[E]**. Ese parque creció de forma orgánica: cada servicio se levantó con su propio archivo Compose, sus variables de entorno no versionadas, sus montajes de directorio y su modo de red particular —seis de esas configuraciones están transcriptas, ofuscadas, en el anexo [E-20](#2020--e-20--configuraciones-reales-de-contenedor-ofuscadas)—, y hoy no hay ningún lugar donde se vea la arquitectura completa de un conjunto de servicios ni la relación entre ellos. Saber qué consume qué, con qué dirección y con qué puerto, exige abrir archivos dispersos y contrastarlos con lo que el motor de contenedores efectivamente está ejecutando.

Al que le duele es a quien opera ese servidor, que es una sola persona con permisos de administración total. Cada alta de un servicio nuevo es un ejercicio manual de copiar y adaptar, cada dirección IP fija de la LAN se anota fuera del sistema, y cada arranque de un conjunto de servicios depende de recordar el orden correcto. El costo no es catastrófico de a una operación, pero es permanente y crece con el parque.

La consecuencia de no resolverlo en los próximos meses es que el parque sigue creciendo sin registro común: la configuración real vive únicamente en el motor de contenedores y en archivos que no están versionados, el respaldo depende de la memoria del operador y el servidor no tiene redundancia de disco **[E]**. Cualquier reinstalación obliga a reconstruir la arquitectura desde cero, y la reconstrucción no está documentada en ningún lado.

El disparador es el propio parque existente: la herramienta tiene que ser adoptable sobre un servidor que ya está en producción, no exigir empezar de cero. Por eso el módulo de descubrimiento y adopción de contenedores existentes, que los incorpora a un proyecto **sin reinstanciarlos**, es el diferencial declarado desde la definición del servicio **[E]**.

## §2 Audiencia y stakeholders

| Rol | Nombre o cargo | Categoría | Responsabilidad principal |
|---|---|---|---|
| Dueño del problema y administrador único | Propietario del servidor autoalojado de referencia (rol; nombre no declarado, ver S-06) | Propietario | Aprueba el intake, opera la solución y valida cada punto de control de etapa |
| Agente humano del proyecto | El mismo propietario en su rol de validación técnica | Propietario | Ejecuta los guiones de demostración, da el OK de cada etapa, fusiona la rama y avisa el cierre |
| Equipo de desarrollo | Dos desarrolladores **[E]**, trabajando en etapas en serie | Implementador | Construyen y mantienen la solución, una rama y un pull request por etapa |
| Agente IA de codificación | Orquestador SDD y sus subagentes | Implementador | Genera la documentación SDD y, en etapas posteriores, el código de cada etapa |
| Usuario final: administrador de la solución | Único usuario con credenciales de la aplicación **[E]** | Beneficiario | Crea proyectos, configura servicios en el lienzo, despliega, arranca y detiene |
| Automatismo de integración continua | Workflow de GitHub Actions sobre el runner del propio servidor **[E]** | Beneficiario | Dispara despliegues con un token de API de ámbito mínimo, sin intervención humana |

No hay financiador externo ni área a la que rendir resultados: el propietario del problema, el que decide y el que paga son la misma persona **[D]**. Tampoco hay actores de auditoría o legales, porque el servicio no sale de la red local.

## §3 Propuesta de valor y diferenciación

Hoy el cliente opera su parque con archivos Compose sueltos y variables de entorno no versionadas, servicio por servicio **[E]**. Eso alcanza para levantar un contenedor, pero no para ver una arquitectura, ni para detectar que dos servicios pelean por la misma dirección IP, ni para saber qué hay que redesplegar cuando cambia el puerto de una base de datos.

La promesa central es que la arquitectura de un conjunto de servicios sea un objeto de primera clase, editable en un lienzo, con despliegue derivado de lo que se dibuja: se agrega el servicio, se traza la dependencia, el sistema propone la variable de entorno correcta según el modo de red y aplica los cambios en lote con un único redespliegue de lo afectado.

Diferenciadores **[D]**:

1. **Adopción sin reinstanciar.** Los contenedores que ya corren se incorporan a un proyecto importando su configuración observada y quedando vinculados por identificador, sin recrearlos ni cortar el servicio. Es lo que hace la herramienta aplicable sobre un servidor en producción.
2. **Separación entre configuración y ejecución.** El nodo del lienzo es el servicio, que es permanente y posicionable; el color y la insignia reflejan el despliegue activo, que es volátil. Detener no borra nada.
3. **Edición transaccional.** Los cambios de configuración se acumulan en un changeset con su informe de impacto, y se aplican en lote: se revisa antes de aplicar, se descarta lo que no va y se redespliega una sola vez.
4. **Conflicto de IP como regla de negocio, no como accidente.** El sistema conoce el rango gestionado, sabe qué direcciones están ocupadas por servicios activos de otros proyectos y bloquea el arranque con resoluciones concretas en lugar de fallar en el motor.
5. **Diseñado para un servidor chico.** El dimensionamiento objetivo son decenas de nodos y menos de cincuenta contenedores; nada se optimiza para escalas que este caso no tiene, y nada puede degradarse con treinta nodos **[E]**.

## §4 Alcance funcional pretendido (MoSCoW)

Las capacidades se derivan de los cuatro alcances incrementales declarados **[E]** y de los cortes verticales de `Requerimientos-Funcionales.md` §4.1. La etiqueta MoSCoW traduce a prioridad la pertenencia a cada alcance: el Alcance 1 es el mínimo sin el cual la solución no resuelve el problema.

| ID | Capacidad | MoSCoW |
|---|---|---|
| F-01 | Alta del administrador único en el primer arranque, con validación de contraseña, sesión recordada, cambio de contraseña y cierre de sesión desde la barra superior | Must Have |
| F-02 | Alta, listado, renombrado y eliminación de proyectos, con su modo de red y su persistencia | Must Have |
| F-03 | Alta y configuración de servicios de un proyecto: origen de imagen, variables, puertos, montajes, dispositivos, capacidades, recursos, política de reinicio y marca de efímero | Must Have |
| F-04 | Lienzo visual: nodos de servicio, aristas de dependencia, desplazamiento, zoom, agrupación y layout persistente por proyecto | Must Have |
| F-05 | Despliegue de un servicio desde imagen de registro público, con estado real reflejado en el nodo y acceso a los registros del contenedor | Must Have |
| F-06 | Arranque y parada del proyecto completo y de cada servicio, con marca de autoarranque y respeto del orden topológico del grafo | Must Have |
| F-07 | Changeset de cambios pendientes con informe de impacto y aplicación en lote con redespliegue de lo afectado | Must Have |
| F-08 | Rango de IP gestionado, reserva por servicio y bloqueo del arranque ante conflicto con un servicio activo de otro proyecto, con resoluciones ofrecidas | Must Have |
| F-09 | Escalado horizontal y vertical manuales: réplicas y límites de CPU y memoria | Must Have |
| F-10 | Despliegue construyendo la imagen desde un Dockerfile local o desde un repositorio de GitHub, con seguimiento del progreso de construcción | Must Have |
| F-11 | Descubrimiento de contenedores existentes en el servidor y adopción a un proyecto sin reinstanciarlos, con las salvaguardas de aislamiento | Must Have |
| F-12 | Dashboard en tres capas: estado del servidor, vista general por proyecto y vista por contenedor | Should Have |
| F-13 | Exportación e importación de la arquitectura completa de un proyecto como Docker Compose, más el manifiesto propio que preserva el layout, con las reglas de traducción del anexo [E-21](#2021--e-21--correspondencia-entre-una-configuración-real-y-el-modelo-de-la-solución) | Should Have |
| F-14 | Catálogo editable, exportable e importable de servicios genéricos reutilizables, con parámetros | Should Have |
| F-15 | Tokens de API con ámbitos, vigencia y revocación inmediata, emitidos desde la interfaz | Should Have |
| F-16 | Disparo de despliegue desde un workflow de GitHub Actions con token de ámbito mínimo | Could Have |
| F-17 | Exportación programada de proyectos y catálogo a un destino externo como estrategia de respaldo | Could Have |
| F-18 | Segundo factor de autenticación | Won't Have v1 |
| F-19 | Administración de proxies o proxies inversos y dominios públicos gestionados | Won't Have v1 |
| F-20 | Balanceo de carga entre réplicas y despliegue sin interrupción con solapamiento de versiones | Won't Have v1 |
| F-21 | Gestión de múltiples usuarios, roles y permisos | Won't Have v1 |
| F-22 | Recuperación de contraseña | Won't Have v1 |

**Nota sobre F-14.** Un ítem del catálogo es una plantilla de servicio con huecos parametrizables; su forma completa, con parámetros y formato de exportación versionado, está en el anexo [E-6](#206--e-6--ítem-del-catálogo-de-servicios-reutilizables) **[E]**.

**[D] Nota sobre F-15 y F-16.** El análisis observa que el Alcance 4 es el menos costoso y el que valida antes la decisión de autenticación, y recomienda adelantar la emisión de tokens de API al Alcance 1 aunque el endpoint de despliegue automatizado llegue después. De ahí que F-15 sea Should Have y F-16 Could Have, y no ambas Could.

## §5 Historias de usuario / experiencias deseadas

1. Como administrador que instala la solución por primera vez, quiero que el sistema me pida un nombre de usuario y una contraseña validada, para que nadie más pueda operar el panel que controla mi servidor.
2. Como administrador, quiero crear un proyecto y agregarle servicios desde el panel lateral, para tener la arquitectura de un conjunto de contenedores en un solo lugar.
3. Como administrador, quiero arrastrar los nodos del lienzo y que la disposición se conserve al recargar, para leer la arquitectura como la pensé y no como la ordenó el sistema.
4. Como administrador, quiero trazar una arista de mi API a mi base de datos y que el sistema me proponga la variable de entorno correcta, para no escribir a mano una cadena de conexión que depende del modo de red.
5. Como administrador, quiero modificar la configuración de un servicio ya desplegado y ver el cambio acumulado en el cajón de cambios pendientes, para revisar el impacto antes de provocar una ventana de indisponibilidad.
6. Como administrador, quiero que el arranque de un proyecto se bloquee cuando una de sus direcciones IP está ocupada por un servicio activo de otro proyecto, para enterarme antes de romper algo que está funcionando.
7. Como administrador, quiero ver los contenedores que ya corren en mi servidor y asignarlos a un proyecto sin reinstanciarlos, para incorporar lo que ya tengo en lugar de empezar de cero.
8. Como administrador, quiero ver el estado del servidor, de cada proyecto y de cada contenedor en un tablero, para saber si la presión de memoria del servidor viene de un servicio concreto.
9. Como administrador, quiero exportar un proyecto a Docker Compose con los secretos vacíos, para llevármelo a otro servidor sin filtrar credenciales.
10. Como automatismo de integración continua, quiero disparar el despliegue de una versión nueva con un token de ámbito mínimo, para publicar sin que ningún workflow conozca la contraseña del administrador.

## §6 Flujos típicos

**Flujo 1 — Alta de un proyecto con API y base de datos.** Es el recorrido más frecuente y está transcripto con su topología resultante en el anexo [E-10](#2010--e-10--alta-de-proyecto-con-api-y-base-de-datos-de-extremo-a-extremo). El administrador crea el proyecto, elige modo de red bridge y aterriza en un lienzo vacío; agrega la base desde el catálogo y la API desde una imagen de registro, y ambos nodos aparecen en violeta porque están pendientes de aplicar; arrastra una arista de la API a la base y el sistema propone la variable de conexión con el nombre de contenedor como host; publica el puerto de la API en el host; aplica los cambios con un mensaje, y el sistema crea la red, despliega la base, espera su verificación de salud y recién entonces despliega la API, respetando el orden topológico del grafo.

**Flujo 2 — Adopción de un contenedor que ya está corriendo.** Es el flujo diferencial y está transcripto en el anexo [E-11](#2011--e-11--adopción-de-un-contenedor-existente). El administrador entra a un proyecto y pide adoptar; el módulo de descubrimiento consulta el motor de contenedores, inspecciona lo que encuentra, descarta los ya adoptados y los no adoptables, y devuelve los candidatos; el administrador elige uno; el sistema importa imagen, red, dirección, montajes, dispositivos y variables, enmascara las variables que la heurística marca como sensibles, y crea el servicio vinculado al contenedor existente, sin recrearlo ni cortar el servicio. El nodo aparece en el lienzo ya activo. El listado de candidatos que ve el administrador está en el anexo [E-7](#207--e-7--descubrimiento-de-contenedores-adoptables).

**Flujo 3 — Arranque bloqueado por conflicto de dirección IP.** Transcripto en el anexo [E-8](#208--e-8--reserva-de-direcciones-ip-e-informe-de-conflicto). El administrador arranca un proyecto de pruebas; el validador de red compara las reservas del proyecto contra las direcciones ocupadas por servicios activos, encuentra una en conflicto y devuelve un rechazo con tres resoluciones posibles: detener el proyecto en conflicto, reasignar la dirección a la siguiente libre del rango, o arrancar parcialmente el resto de los servicios; el administrador reasigna, el sistema actualiza la reserva y marca los enlaces entrantes al servicio como pendientes de redespliegue porque su variable cambió de valor, y arranca.

**Flujo 4 — Primer arranque y sesión.** El administrador ejecuta la aplicación por primera vez sobre una base de datos inexistente; el sistema aplica sus migraciones solo, detecta que no hay administrador y presenta el alta; el administrador elige usuario y contraseña, el sistema la valida y la almacena con una función de derivación de clave, e inicia la sesión con cookie; en los arranques posteriores la aplicación ya no ofrece el alta y presenta el inicio de sesión; el cambio de contraseña y el cierre de sesión se hacen desde el menú de usuario de la barra superior, y el cambio exige la contraseña actual **[E]**.

## §7 Casos límite y "qué pasa si"

| # | Pregunta | Estado en las fuentes | Respuesta del cliente |
|---|---|---|---|
| CL-01 | ¿Qué pasa si dos proyectos configuran la misma dirección IP y ambos quieren arrancar? | Resuelto: configurar la misma dirección está permitido; arrancar en conflicto con un servicio **activo** de otro proyecto no. El arranque se bloquea con informe y resoluciones, o procede parcialmente dejando el proyecto "parcialmente activo" **[E]** | |
| CL-02 | ¿Qué pasa si alguien opera contenedores por fuera de la aplicación y el estado registrado deja de coincidir con el motor? | Resuelto: el sincronizador de estado se suscribe a los eventos del motor y reconcilia cada 30 segundos; el nodo puede quedar en estado "huérfano" explícito **[D]** | |
| CL-03 | ¿Qué pasa si el contenedor vinculado a un servicio adoptado desaparece del motor? | Resuelto: el servicio queda huérfano y se ofrece redesplegarlo desde la configuración importada **[D]**, con la advertencia de que ese primer redespliegue sí implica corte | |
| CL-04 | ¿Qué pasa si se pierde la conexión del navegador en medio de una operación? | **Abierto.** El modelo de hospedaje es Blazor Interactive Server, donde la interfaz vive en un circuito SignalR **[E]**; las fuentes no declaran el comportamiento esperado ante caída del circuito con un despliegue en curso | |
| CL-05 | ¿Qué pasa si un dato obligatorio llega vacío o mal formado desde la API? | Resuelto: cada regla de negocio declara su momento de validación y su respuesta, con `422` para datos inválidos y `409` para conflictos, en formato `ProblemDetails` **[D]** | |
| CL-06 | ¿Qué pasa si el administrador pide más réplicas de un servicio que tiene una dirección IP fija de macvlan? | Resuelto: son incompatibles; el modelo admite una dirección por réplica y la interfaz debe pedirlas explícitamente en lugar de fallar en el arranque **[D]** | |
| CL-07 | ¿Qué pasa si se adopta un contenedor que monta el socket del motor de contenedores? | Resuelto: se marca no adoptable por defecto, porque gobernarlo desde el administrador crearía una dependencia circular de control; puede forzarse con confirmación explícita **[D]** | |
| CL-08 | ¿Qué pasa si un contenedor adoptado traía credenciales en sus variables de entorno? | Resuelto: las variables cuyo nombre coincide con la heurística de sensibilidad se importan enmascaradas y requieren recarga manual **[D]** | |
| CL-09 | ¿Qué pasa si la interfaz, la API y los servicios en segundo plano escriben a la vez en SQLite? | Parcialmente resuelto: modo WAL, escritor único y un alcance de contexto por operación **[E]**; la fuente registra que la mitigación no fue probada en este contexto y requiere validación en la etapa de codificación | |
| CL-10 | ¿Qué pasa si se pierde el disco del servidor, que no tiene redundancia? | Parcialmente resuelto: la estrategia de respaldo es la exportación programada de proyectos y catálogo a un destino externo **[E]**; el destino concreto no está declarado | |
| CL-11 | ¿Qué pasa si una etapa cierra con un criterio de aceptación sin cumplir? | Resuelto: el informe de cierre lo declara en su sección de criterios y en la de problemas conocidos. Un informe que declara terminada una etapa incompleta invalida el punto de control **[E]** | |
| CL-15 | ¿Qué pasa si un contenedor adoptado trae un secreto en una variable cuyo nombre no coincide con la heurística de sensibilidad? | **Abierto.** Una de las configuraciones reales del anexo [E-20](#2020--e-20--configuraciones-reales-de-contenedor-ofuscadas) (caso C-2) lleva una clave simétrica en una variable que no contiene `PASSWORD`, `TOKEN`, `SECRET`, `KEY` ni `PAT`: la heurística declarada la importaría en claro. Las tres resoluciones posibles están planteadas en C-2 y la decisión es del cliente | |
| CL-14 | ¿Qué pasa con las credenciales de prueba que un informe de cierre necesita transcribir? | Resuelto: las credenciales de ejemplo del entorno de desarrollo se escriben completas en el informe; nunca se transcribe un secreto de producción ni una contraseña real elegida por el agente humano, y en su lugar se indica dónde consultarla **[E]** | |
| CL-12 | ¿Qué pasa si el administrador quiere borrar un servicio con datos persistidos? | Resuelto: se pide confirmación escribiendo el nombre del servicio y se ofrece conservar los volúmenes **[D]** | |
| CL-13 | ¿Qué pasa si el servicio se expone fuera de la red local? | Resuelto por prohibición: el acceso al socket del motor equivale a control total del host, de modo que el servicio no debe publicarse a internet sin una capa adicional de protección, y el proxy inverso está fuera de alcance **[E]** | |

## §8 Métricas de éxito desde el negocio

**[S] S-01.** Las fuentes describen capacidades y riesgos, no metas de negocio medidas. Estas métricas se proponen a partir de los datos de dimensionamiento verificados del servidor de referencia (parque de ocho contenedores y dieciocho imágenes, sin redundancia de disco) y de los diferenciales declarados. Requieren confirmación del cliente antes de que el orquestador las trate como cerradas.

| Criterio | Métrica | Target | Plazo |
|---|---|---|---|
| Adopción del parque existente | Porcentaje de los contenedores en ejecución del servidor de referencia, enumerados en el anexo [E-19](#2019--e-19--parque-de-contenedores-de-referencia), incorporados a un proyecto de la solución sin haber sido reinstanciados | ≥ 75 % de los 8 contenedores del parque relevado | 3 meses desde el cierre del Alcance 1 |
| Reemplazo del método manual | Porcentaje de altas de servicio nuevas realizadas desde la solución en lugar de por archivo Compose editado a mano | ≥ 90 % de las altas nuevas | 6 meses desde el cierre del Alcance 1 |
| Reproducibilidad de la arquitectura | Cantidad de proyectos con exportación vigente (Compose más manifiesto propio) sobre el total de proyectos declarados | 100 % de los proyectos, con exportación de antigüedad menor a 7 días | 3 meses desde el cierre del Alcance 3 |
| Continuidad de la entrega | Porcentaje de etapas cerradas con su guion de demostración ejecutado y con los guiones de todas las etapas anteriores pasando sin corrección | 100 % de las etapas | Durante toda la construcción |

## §9 Lo que NO es esta solución (exclusiones)

1. **No es un PaaS multiinquilino ni un orquestador de clúster [E].** Hay un único administrador y un único servidor. Incorporar inquilinos exigiría un modelo de identidad, de aislamiento y de cuotas que multiplica el alcance sin resolver el problema del propietario. No se contempla incorporación futura.
2. **No administra proxies ni proxies inversos [E].** Está declarado fuera de alcance desde la definición del servicio. Consecuencia aceptada: no hay dominios públicos gestionados, y el reemplazo de una versión de un servicio es *detener y arrancar*, con ventana de indisponibilidad que la interfaz debe advertir explícitamente al confirmar el redespliegue.
3. **No hace balanceo de carga [E].** Consecuencia aceptada y señalada como inconsistencia IC-04 por el análisis: las réplicas creadas por el escalado horizontal no tienen quién distribuya el tráfico entre ellas. En este alcance el escalado horizontal sirve para procesos sin tráfico entrante.
4. **No expone el servicio a internet [E].** El acceso al socket del motor de contenedores equivale a control total del host; el servicio se expone sólo en la red local. Podría incorporarse el día que exista una capa de protección adicional, que hoy está fuera de alcance.
5. **No gestiona usuarios, roles ni permisos [E].** Un solo administrador. La elección de ASP.NET Core Identity no bloquea incorporar un segundo factor más adelante, pero el primer alcance no lo incluye.
6. **No monitorea por peticiones HTTP contra los servicios [E].** Cuando los contenedores corren en macvlan, el host no los alcanza por la misma placa de red. La fuente de verdad del estado es el socket del motor de contenedores: estado del contenedor, verificación de salud declarada en la imagen y estadísticas de uso.
7. **No recupera contraseñas [E].** Declarado fuera de alcance de la etapa de administrador y sesión. Con un único usuario y acceso físico al archivo de base de datos, el mecanismo de recuperación aportaría superficie de ataque sin resolver un problema real.

## §10 Restricciones del cliente

| Restricción | Valor declarado | Origen |
|---|---|---|
| Equipo | 2 desarrolladores | `Requerimientos-Tecnicos.md` §1 **[E]** |
| Plazo | **Sin fecha objetivo.** No se contempla plazo: el avance se mide por etapas cerradas, y cada etapa termina en un punto de control con OK explícito del agente humano | `Requerimientos-Tecnicos.md` §1 **[E]** |
| Presupuesto | No hay presupuesto monetario asignado ni previsto: la restricción económica efectiva es que toda dependencia debe ser de licencia abierta y permisiva, sin costo de licencia ni de suscripción. Es lo que descarta Syncfusion y MindFusion pese a su completitud funcional | `Analisis-Final-Integrado.md` §7.1 y §7.4 **[E]** |
| Modo de trabajo | Etapas **en serie**. No se abre la rama de una etapa antes de que se haya fusionado la anterior; el punto de control es un cuello por diseño | `Requerimientos-Tecnicos.md` §1 y §10 **[E]** |
| Entorno de desarrollo obligatorio | **El host Linux de desarrollo no tiene el SDK de .NET y no se va a instalar.** Todo el ciclo ocurre dentro de un Dev Container; el único requisito del host es Docker. Ningún comando ni paso de un guion puede asumir `dotnet` disponible en el host | `Requerimientos-Tecnicos.md` §3.1 **[E]** |
| Integración obligatoria | El motor de contenedores del host, accedido por socket montado (`docker-outside-of-docker` en desarrollo, socket montado en producción). No es una integración opcional: es el sustrato del producto | `Requerimientos-Tecnicos.md` §3.4 y §8 **[E]** |
| Plataforma de destino | Contenedor Docker sobre Linux, sobre un servidor de 4 núcleos y 8 hilos de generación antigua, 32 GB de RAM con la mitad en uso y presión de swap apreciable, y un único SSD sin RAID ni LVM. El administrador debe ser liviano: presupuesto de cientos de MB, no de GB, y sin sondeo agresivo de métricas | `Analisis-Final-Integrado.md` §3.1 **[E]** |
| Restricciones legales o regulatorias | Ninguna declarada. El servicio no procesa datos personales de terceros, no sale de la red local y tiene un único usuario. No aplican GDPR, PCI, HIPAA, SOC2 ni ISO 27001 | Derivado del alcance declarado **[D]** |
| Flujo de trabajo obligatorio | Una rama y un pull request por etapa; el pull request *es* el punto de control. El `changelog.md` se actualiza en la rama de la etapa. Cada etapa cerrada y fusionada recibe una etiqueta. Ningún secreto entra al repositorio | `Requerimientos-Tecnicos.md` §10 **[E]** |
| Documentación obligatoria por etapa | Cada etapa cierra con un informe autocontenido de trece secciones publicado en `SelfHosted.Service.Core.Documentos/Avances/`, escrito **antes** de convocar el punto de control y anotado en el índice `Avances/README.md`. Es entregable, al mismo nivel que el código: sin informe no hay etapa terminada. Ver §15.1 | `Requerimientos-Funcionales.md` §2.4 y §2.5 **[E]** |

## §11 Riesgos detectados desde el negocio

Los diez riesgos de la matriz del análisis integrado **[E]**, en el orden y con la evaluación declarada allí. Se listan completos porque cada uno condiciona una decisión de alcance o de secuencia.

| # | Riesgo | Probabilidad | Impacto | Mitigación declarada |
|---|---|---|---|---|
| RG-01 | Latencia del lienzo bajo Interactive Server con el arrastre manejado en C#: es la pantalla principal del producto | Media | Alto | Puerta técnica PT-01 medida antes de comprometer el corte del lienzo, más las mitigaciones M1 a M4 (arrastre en JavaScript notificando sólo al soltar, movimiento por `transform` de CSS, virtualización de nodos, WebSockets garantizados) |
| RG-02 | ROPC como puerta de entrada a un servicio que controla el host | Media | Alto | Adoptar cookie de Identity para la interfaz más tokens de API con ámbitos para automatismos; ROPC queda descartado |
| RG-03 | El acceso al socket del motor de contenedores equivale a control total del host | Alta, inherente al diseño | Muy alto | No exponer el servicio fuera de la red local, tokens de ámbito mínimo y auditoría de toda operación de escritura |
| RG-04 | Monitoreo inviable por red con contenedores en macvlan | Alta | Medio | Observar por el motor de contenedores, nunca por peticiones HTTP contra el servicio |
| RG-05 | Cliente de Docker desactualizado frente al motor instalado | Media | Medio | Usar el fork mantenido y aislarlo detrás de la abstracción `IContenedorEngine` |
| RG-06 | Concurrencia de escritura en SQLite entre la interfaz, la API y los servicios en segundo plano | Media | Medio | Modo WAL, tiempo de espera de bloqueo fijado y operaciones de despliegue serializadas por proyecto |
| RG-07 | Sin redundancia de disco en el servidor de referencia | Alta | Alto para el usuario, no para el software | Exportación periódica de proyectos y catálogo a un destino externo, facilitada por el propio servicio |
| RG-08 | Deriva entre el estado registrado y el motor cuando alguien opera contenedores por fuera | Alta | Medio | Reconciliación periódica y estado "huérfano" explícito en el nodo |
| RG-09 | Secretos importados en la adopción que terminen visibles | Media | Alto | Enmascarado por heurística en la importación y regla de no devolver secretos en texto plano por la API ni en exportaciones |
| RG-10 | Alcance creciente del lienzo (autolayout, rutas ortogonales, deshacer y rehacer) | Media | Medio | Fijar el alcance visual del primer incremento; el deshacer y rehacer se apoyan en el changeset, no en la librería |

**Intento previo y por qué no alcanzó [E]:** no hubo un intento previo de construir esta herramienta. Sí hubo un análisis funcional previo del proyecto sobre una plataforma comercial equivalente, del que se toma el modelo de abstracción, la semántica de las aristas y el patrón de cambios en lote. El método actual —archivos Compose sueltos— no falló: se volvió insuficiente al crecer el parque.

**Supuesto crítico que, si se rompe, hace inviable el resultado [D]:** que un lienzo de treinta nodos sea fluido bajo Blazor Interactive Server en red local. Es exactamente lo que mide PT-01, y su falla no invalida el producto pero sí obliga a cambiar la librería del lienzo y replanificar ese corte.

## §12 Glosario del dominio del cliente

| Término | Definición |
|---|---|
| **Adopción** | Incorporación de un contenedor ya existente en el servidor a un proyecto, sin recrearlo. Sólo importa su configuración y lo vincula por identificador |
| **Alias DNS** | Nombre por el que un contenedor es resoluble dentro de una red definida por el usuario; suele coincidir con el nombre del servicio |
| **Arista o enlace** | Conexión dibujada en el lienzo. Representa que un servicio consume, por variable de entorno, la dirección y el puerto de otro |
| **Autoarranque** | Marca que indica que un proyecto o servicio debe levantarse al iniciar el sistema administrador |
| **Bridge** | Red virtual del motor de contenedores con su propia subred privada; sus miembros se resuelven por nombre y publican puertos en el host |
| **Canvas o lienzo** | Vista por defecto de un proyecto: espacio visual infinito donde cada bloque es un servicio y cada arista una dependencia |
| **Changeset** | Conjunto de cambios de configuración acumulados y pendientes de aplicar en lote sobre un proyecto |
| **Despliegue** | Intento concreto de materializar la configuración de un servicio: el contenedor creado, con su ciclo de vida |
| **Efímero** | Servicio pensado para reconstruirse en cada uso, sin estado persistente propio |
| **Escalado horizontal** | Agregar réplicas del mismo servicio. En esta solución, manual |
| **Escalado vertical** | Aumentar los recursos de CPU y memoria asignados a un servicio. En esta solución, manual |
| **Etapa** | Unidad de entrega del proyecto. Se especifica con una plantilla obligatoria, termina en un punto de control y se corresponde con una rama y un pull request |
| **Healthcheck o verificación de salud** | Comprobación periódica declarada en la imagen o en el servicio que determina si el contenedor está sano |
| **Hito demostrable (HD)** | Etapa que entrega un flujo de usuario completo y operativo, y se ejecuta y recorre delante del cliente |
| **Hito interno (HI)** | Etapa que confirma decisiones estructurales caras de revertir; la valida el agente humano y no se muestra al cliente |
| **Huérfano** | Servicio cuyo contenedor vinculado ya no existe en el motor |
| **Informe de cierre** | Documento autocontenido de trece secciones que cierra cada etapa, publicado en `Avances/` antes de convocar el punto de control. Está escrito para quien no vio escribir el código y va a probarlo |
| **Macvlan** | Modo de red en el que el contenedor obtiene una dirección propia de la LAN y aparece como un equipo más de la red. El host no lo alcanza por la misma placa |
| **Modo pendiente** | Estado visual, en violeta, de un nodo o arista que existe en el changeset pero todavía no se aplicó |
| **Política de reinicio** | Regla que indica si el contenedor debe reiniciarse solo: `no`, `on-failure`, `always`, `unless-stopped` |
| **Proyecto** | Unidad de agrupación del producto: la arquitectura completa de servicios contenedorizados, con su red y su lienzo. No confundir con el proyecto de la composición SDD de §13 |
| **Puerta técnica** | Verificación medida que condiciona una decisión de arquitectura. Una puerta que no pasa detiene la planificación de lo que depende de ella |
| **Réplica** | Cada instancia paralela de un mismo servicio |
| **Servicio** | La configuración de un contenedor dentro de un proyecto: origen, variables, red, montajes, límites. No tiene estado de encendido |
| **Socket del motor de contenedores** | Punto de acceso local a la API del demonio de contenedores. Acceder a él equivale a control administrativo del host |
| **Token de API** | Credencial de máquina, con ámbitos y vigencia, revocable individualmente, usada por automatismos |
| **Variable de enlace** | Variable de entorno generada automáticamente a partir de una arista del lienzo |
| **Ámbito** | Permiso concreto asociado a un token de API, por ejemplo `despliegues:ejecutar` |

---

# Parte B — Composición de la solución

## §13 Proyectos de la solución

La composición se deriva directamente de la estructura de carpetas de `/src` declarada en `Analisis-Final-Integrado.md` §12 **[E]**, que define cuatro proyectos de código: dominio, aplicación, infraestructura y web. El despliegue es monolítico —un único proceso sirve la interfaz Blazor, la API REST y los servicios en segundo plano—, y por eso el proyecto principal es el web, del que los demás son dependencias internas.

Tabla de proyectos (fuente del manifiesto derivado):

| `Nombre-Proyecto` | `project_type` (D8) | Rol en la solución | Dependencias | `redistribuible` |
|---|---|---|---|---|
| SelfHosted-Web (principal) | web-monolith | Punto de entrada único: páginas Blazor Interactive Server, controladores REST `/api/v1` y servicios en segundo plano, en un solo proceso | SelfHosted-Application, SelfHosted-Infrastructure, SelfHosted-Domain | false |
| SelfHosted-Application | library | Casos de uso por módulo y abstracciones de salida (`IContenedorEngine`, repositorios, reloj del sistema) | SelfHosted-Domain | false |
| SelfHosted-Infrastructure | library | Adaptadores: persistencia con EF Core sobre SQLite, cliente del motor de contenedores, métricas del host y exportación | SelfHosted-Application, SelfHosted-Domain | false |
| SelfHosted-Domain | library | Entidades, invariantes y reglas de negocio, sin dependencias externas | (ninguna) | false |

El grafo es acíclico: `SelfHosted-Domain` es el nivel 0; `SelfHosted-Application` el nivel 1; `SelfHosted-Infrastructure` el nivel 2; `SelfHosted-Web` el nivel 3.

**Nota sobre los proyectos de prueba.** `SelfHosted.Domain.Tests`, `SelfHosted.Application.Tests` y `SelfHosted.Integration.Tests` **[E]** no se declaran como proyectos de la composición: son artefactos de la estrategia de testing de cada proyecto (§17 P.6) y viven bajo `/tests`, según el árbol de §16.

Perfil de convención de nombres de código:

| Parámetro | Valor | Notas |
|---|---|---|
| Forma del nombre de solución en código | `SelfHosted` | **Declarado explícitamente, no derivado.** El nombre legible de la solución es `SelfHosted.Service.Core`, pero la raíz de los nombres de código ya está fijada como `SelfHosted` por la estructura de `/src` de `Analisis-Final-Integrado.md` §12 **[E]**. Se declara aquí para que la derivación del manifiesto sea determinista y no produzca `SelfHostedServiceCore` |
| Separador de segmentos | `.` | Separa la raíz de la solución del sufijo de rol |
| Prefijo de paquetes redistribuibles | `Aplicada` | No se aplica en esta solución: ningún proyecto es redistribuible |

Nombres de código resultantes: `SelfHosted.Web`, `SelfHosted.Application`, `SelfHosted.Infrastructure`, `SelfHosted.Domain`. Coinciden exactamente con los directorios de `/src` de la fuente, sin colisiones.

## §14 Estilo arquitectónico de la solución

La solución aplica Clean Architecture con organización por módulos, en despliegue monolítico **[E]**. La regla de dependencia es la del estilo: las dependencias apuntan hacia el dominio y nunca al revés.

| Proyecto | Qué expone a sus dependientes | Quién lo consume |
|---|---|---|
| SelfHosted-Domain | Entidades, objetos de valor, invariantes del modelo (I1 a I10, enumeradas en §17.4 P.2) y reglas de negocio (RN-01 a RN-20, transcriptas en el anexo [E-16](#2016--e-16--catálogo-de-reglas-de-negocio-rn-01-a-rn-20)) verificables sin infraestructura | Application, Infrastructure, Web |
| SelfHosted-Application | Casos de uso por módulo (proyectos, servicios y despliegues, descubrimiento, red, catálogo, observabilidad, identidad y tokens), sus DTO y validadores, y las abstracciones de salida que la infraestructura implementa | Web, e Infrastructure sólo para implementar sus abstracciones |
| SelfHosted-Infrastructure | Implementaciones de las abstracciones de Application: `DbContext` y configuraciones de EF Core, adaptador del motor de contenedores, lectura de métricas del host, exportación a Compose y respaldos. No expone contrato propio: se registra en el contenedor de dependencias del host | Web, sólo en la composición de arranque |
| SelfHosted-Web | La interfaz de usuario y la API REST `/api/v1`. Es el único ejecutable de la solución | El administrador por navegador y los automatismos por HTTP |

**Por qué esta descomposición y no otra [D]:**

- **Frente a un único proyecto sin separación en capas:** la regla de aislamiento del cliente del motor de contenedores es explícita y bloqueante: ningún tipo de la librería de Docker puede aparecer fuera de `SelfHosted.Infrastructure/Contenedores/`, y todo consumo pasa por la abstracción `IContenedorEngine` **[E]**. Esa regla sólo es verificable por compilación si hay una frontera de proyecto: en un proyecto único sería una convención que nadie hace cumplir. El mismo argumento vale para las pruebas de dominio, que la estrategia declarada exige que corran sin infraestructura.
- **Frente a microservicios:** el despliegue monolítico está declarado como requisito **[E]**, y el dimensionamiento del servidor de referencia lo confirma. Separar en servicios agregaría red, contratos y despliegue coordinado sin ningún beneficio para un único usuario en una única máquina.

Las cuatro fronteras corresponden a aristas de dependencia reales del grafo de §13. El punto de entrada del usuario final es `SelfHosted-Web`; el proyecto compartido por todos es `SelfHosted-Domain`.

## §15 Esquema de descomposición y delivery

La descomposición es **vertical, con walking skeleton inicial**, y está declarada en `Requerimientos-Funcionales.md` §2.1 **[E]**: cada etapa corta en vertical una funcionalidad acotada y la entrega operativa de punta a punta, atravesando interfaz, aplicación, dominio, datos y motor de contenedores. Está explícitamente prohibido planificar por capa técnica: no hay una etapa de entidades, otra de servicios de aplicación y otra de pantallas.

El valor demostrable end-to-end a través de la jerarquía se garantiza así:

- Las etapas `a` y `b` son hitos internos que atraviesan la jerarquía sin lógica de negocio: `a` entrega la solución compilando y ejecutándose desde los scripts dentro del devcontainer, con una página de salud que responde en el navegador del host, y verifica la puerta técnica PT-02; `b` entrega el panel navegable con las rutas del mapa de navegación del anexo [E-18](#2018--e-18--maquetado-de-la-interfaz-web), validado contra la maqueta UX-UI que ese mismo anexo especifica: disposición de la pantalla del lienzo, anatomía del nodo, panel lateral, dashboard y lenguaje visual de estados.
- La etapa `c` es el primer hito demostrable ante el cliente y ya recorre las cuatro capas: pantallas Blazor en Web, casos de uso de identidad en Application, reglas de contraseña en Domain y persistencia con migraciones en Infrastructure.
- De `c` en adelante, **toda** etapa es un hito demostrable, sin excepción: si una etapa planificada no produce algo que el cliente pueda recorrer en el navegador, está mal cortada y debe redividirse.

El orden de construcción respeta el orden topológico de §13 dentro de cada etapa, no entre etapas: cada corte vertical toca los cuatro proyectos en el orden Domain → Application → Infrastructure → Web.

Reglas de entrega que el plan de sprint debe respetar **[E]**:

1. **No-regresión acumulativa.** Al cerrar cada etapa deben seguir pasando, sin correcciones, los guiones de demostración de todas las etapas anteriores.
2. **Todo guion arranca con los scripts, dentro del devcontainer**, y el resultado se observa en el navegador del host. No se admiten pasos manuales de preparación fuera de esos scripts.
3. **Estado de partida reproducible.** Cada guion declara desde qué estado parte y cómo se llega a él.
4. **Trazabilidad.** Cada etapa referencia la sección del análisis integrado que especifica lo que implementa.
5. **Punto de control bloqueante.** El orquestador se detiene, presenta el guion y espera el OK explícito del agente humano.
6. **Informe antes del punto de control.** Ninguna etapa se da por terminada, ni se convoca al agente humano, sin su informe de cierre publicado. El informe es el entregable de documentación de la etapa, al mismo nivel que el código.

Cada etapa se especifica con una **plantilla obligatoria completa** antes de empezar a codificarla, y una etapa sin criterios de aceptación verificables no se puede iniciar **[E]**. Sus campos son: tipo (`HI` o `HD`), objetivo, alcance, fuera de alcance, entregable tangible, guion de demostración, criterios de aceptación, punto de control e informe de cierre.

### §15.1 Informe de cierre de etapa

Es un artefacto de documentación obligatorio por etapa, declarado en `Requerimientos-Funcionales.md` §2.5 **[E]**, y su especificación es cerrada. El orquestador debe tratarlo como entregable de la etapa, no como resumen opcional.

| Aspecto | Definición **[E]** |
|---|---|
| Ubicación | `SelfHosted.Service.Core.Documentos/Avances/<orden>-<etapa>.md`, donde `<orden>` es `a`, `b`, `c`, `01`, `02`, … según el orden de ejecución, y `<etapa>` es el nombre en minúsculas y con guiones. Ejemplos: `a-esqueleto-ejecutable.md`, `c-administrador-y-sesion.md`, `01-proyectos.md` |
| Momento | Antes de convocar el punto de control |
| Destinatario | Alguien que no vio escribir el código y va a sentarse a probarlo. No se dan por sabidos ni los nombres de proyectos, ni las rutas, ni las claves generadas |
| Secciones obligatorias, en orden | Identificación (etapa, tipo, fecha, secciones del análisis que implementa, estado `Pendiente de validación` / `Validada` / `Con correcciones pedidas`); qué se entregó; qué quedó fuera; cómo lo levanto; claves y credenciales; qué probar paso a paso; casos de ejemplo; qué debería ver; cómo está armado el proyecto; criterios de aceptación; no-regresión; problemas conocidos; qué habilita |
| Reglas de escritura | Autocontenido, se lee sin abrir el análisis integrado ni el código. Verificable: todo comando que aparece fue ejecutado tal como está escrito. Honesto: un criterio incumplido se declara, y un informe que declara terminada una etapa incompleta invalida el punto de control. Acumulativo: cada etapa agrega su archivo y los anteriores no se editan salvo para actualizar su estado |
| Índice | `Avances/README.md` mantiene la lista de informes en orden, con etapa, tipo, fecha y estado |

**[D] Consecuencia para la generación SDD.** Este informe es documentación de proceso del repositorio de documentación, no un artefacto de las doce categorías: no vive bajo `SDD/Docs/` ni lo produce un subagente de categoría. Pero condiciona dos categorías: `07-Plan-Sprint` de `SelfHosted-Web`, que debe incorporarlo como definición de terminado de cada etapa, y `11-Documentacion`, que no debe duplicar su contenido. Las tres etapas ya especificadas declaran además qué debe explicar su informe en particular: la etapa `a`, el árbol de proyectos pieza por pieza, qué hace cada script y cómo se comprueba PT-02 desde el navegador del host; la etapa `b`, cada ruta navegable con su rótulo, qué pantallas son marcadores de posición y en qué anchos de ventana se verificó el comportamiento responsivo; la etapa `c`, la contraseña de ejemplo del administrador de prueba, la regla que hace fallar una contraseña débil, dónde queda el archivo de SQLite y cómo borrarlo para repetir el primer arranque **[E]**.

Cortes verticales ya declarados para el Alcance 1, cada uno una etapa demostrable independiente **[E]**: proyectos; servicios del proyecto; lienzo; despliegue desde imagen pública; arranque y parada; cambios pendientes; direcciones IP y conflictos; escalado manual; despliegue desde Dockerfile y repositorio; descubrimiento y adopción. Pueden reordenarse o subdividirse, pero no fusionarse hasta perder la demostrabilidad intermedia. Los condicionan dos puertas técnicas: PT-01 antes del corte del lienzo y PT-02 antes del corte de despliegue, verificada ya en la etapa `a`.

## §16 Estructura de repositorio de la solución

Árbol derivado de la jerarquía de §13 y del perfil de convención, coherente con la estructura de carpetas declarada en `Analisis-Final-Integrado.md` §12 **[E]** y con los scripts y el entorno de desarrollo de `Requerimientos-Tecnicos.md` §3 **[E]**.

```text
SelfHosted.Service.Core/
├── .devcontainer/
│   └── devcontainer.json               # entorno declarativo: SDK .NET 10 + docker-outside-of-docker
├── .vscode/
│   └── launch.json                     # depuracion coreclr con F5, camino separado del de los scripts
├── src/
│   ├── SelfHosted.Web/                 # web-monolith (principal)
│   │   ├── Components/
│   │   │   ├── Canvas/                 # lienzo, nodo de servicio, aristas, minimapa
│   │   │   ├── Paneles/                # panel de servicio, changeset, actividad
│   │   │   ├── Dashboard/
│   │   │   └── Layout/                 # barra superior, menu lateral
│   │   ├── Controllers/                # un controlador por recurso, bajo /api/v1
│   │   ├── BackgroundServices/         # sincronizador de estado, recolector de metricas
│   │   └── wwwroot/js/                 # canvas-interop.js: unico JavaScript propio
│   ├── SelfHosted.Application/         # library
│   │   ├── Proyectos/                  # casos de uso, DTO, validadores
│   │   ├── Servicios/
│   │   ├── Despliegues/
│   │   ├── Descubrimiento/
│   │   ├── Red/
│   │   ├── Catalogo/
│   │   ├── Observabilidad/
│   │   └── Abstracciones/              # IContenedorEngine, IProyectoRepository, IRelojSistema
│   ├── SelfHosted.Infrastructure/      # library
│   │   ├── Persistencia/               # DbContext, configuraciones, migraciones
│   │   ├── Contenedores/               # adaptador del motor de contenedores (unico lugar con tipos de Docker)
│   │   ├── Sistema/                    # metricas del host
│   │   └── Exportacion/                # Compose, catalogo, respaldos
│   └── SelfHosted.Domain/              # library
│       ├── Proyectos/                  # Proyecto, Red, CanvasLayout
│       ├── Servicios/                  # Servicio, Origen, Variable, Montaje, Recursos
│       ├── Despliegues/                # Despliegue, EstadoDespliegue, Evento
│       ├── Red/                        # ReservaIp, RangoGestionado, Conflicto
│       ├── Catalogo/                   # CatalogoItem, Parametro
│       └── Identidad/                  # TokenApi, Ambito
├── tests/
│   ├── SelfHosted.Domain.Tests/
│   ├── SelfHosted.Application.Tests/
│   └── SelfHosted.Integration.Tests/   # SQLite real y motor real via Testcontainers
├── samples/
├── scripts/                            # build.sh, run.sh, migrate.sh, test.sh, reset-db.sh
├── docs/
├── SDD/
│   ├── Intake/                         # este documento
│   ├── Docs/                           # categorias SDD 00 a 11
│   └── Maquetas/SelfHosted-Web/        # maqueta de validacion visual, derivada del anexo E-18
└── changelog.md
```

Cada proyecto de §13 tiene su carpeta en `/src` con su nombre de código. La estructura sigue las convenciones del ecosistema .NET: `src` y `tests` como raíces, un directorio por proyecto y espacios de nombres que replican la ruta. Ningún proyecto es redistribuible, de modo que el prefijo de organización no se usa.

### §16.1 Materialización de `/samples`

| Proyecto | Tipo D8 | Qué hay en `/samples` |
|---|---|---|
| SelfHosted-Web | web-monolith | Un juego de datos de siembra que reproduce el parque de contenedores de referencia (proyectos, servicios, modos de red y direcciones), derivado de las configuraciones reales ofuscadas del anexo [E-20](#2020--e-20--configuraciones-reales-de-contenedor-ofuscadas), para levantar la aplicación con contenido y recorrer el lienzo sin configurar nada a mano. El anexo [E-9](#209--e-9--esquema-relacional-de-la-base-sqlite) es su esquema de destino |
| SelfHosted-Application | library | Aplicaciones integradoras progresivas que ejercitan los casos de uso con una implementación de prueba de `IContenedorEngine`, sin motor real |
| SelfHosted-Infrastructure | library | Ejemplo ejecutable del adaptador del motor de contenedores contra un motor real, que es la materialización de la puerta técnica PT-02: listar, crear, arrancar, detener y eliminar un contenedor de prueba desde código |
| SelfHosted-Domain | library | Ejemplos de las reglas de negocio más específicas resueltas sin infraestructura, en particular la validación de conflicto de direcciones IP del anexo [E-8](#208--e-8--reserva-de-direcciones-ip-e-informe-de-conflicto) |

Cada sample es autocontenido, se ejecuta desde los scripts dentro del devcontainer y no requiere pasos manuales previos.

---

# Parte C — Técnica por proyecto

## §17 Bloque técnico por proyecto

### §17.1 SelfHosted-Web

| Campo | Valor |
|---|---|
| `Nombre-Proyecto` | SelfHosted-Web |
| `nombre-proyecto-codigo` | `SelfHosted.Web` |
| `project_type` (D8) | web-monolith |
| Rol | Punto de entrada único: interfaz Blazor, API REST y servicios en segundo plano en un solo proceso |
| `redistribuible` | false |

#### §17.1.P.1 Stack tecnológico

Lenguaje C# sobre **.NET 10**, con Blazor en modo **Interactive Server** **[E]**. Plataforma target: contenedor Linux; en desarrollo, el devcontainer con imagen oficial `mcr.microsoft.com/devcontainers/dotnet` anclada por tag en `devcontainer.json` **[E]**.

Dependencias core, todas con versión anclada y verificada **[E]**. Cualquier cambio de versión mayor es una decisión que se documenta, no un efecto colateral de una actualización de paquetes:

| Dependencia | Versión | Licencia y fecha | Por qué es core |
|---|---|---|---|
| MudBlazor | 9.7.0 | MIT, publicada 2026-07-09 | Sistema visual completo de la interfaz; los nodos del lienzo se construyen con sus componentes. Sin ella no hay pantalla |
| Z.Blazor.Diagrams | 3.0.4.1 | MIT, publicada 2026-03-02, marcos `net6.0` a `net10.0` | Lienzo: nodos y grupos personalizados, puertos, enlaces, minimapa y virtualización. Sujeta a la puerta técnica PT-01 |
| ASP.NET Core Identity | Incluida en .NET 10 | — | Autenticación por cookie del administrador único |

Runtime mínimo: .NET 10. Protocolo en desarrollo: HTTP sin certificado de desarrollo, para evitar la fricción del certificado de confianza dentro del contenedor; HTTPS es asunto del despliegue **[E]**.

#### §17.1.P.2 Estilo arquitectónico del proyecto

Capa de presentación de la Clean Architecture de la solución, con tres superficies sobre el mismo proceso y la misma capa de aplicación: páginas Blazor Interactive Server, controladores REST y servicios en segundo plano **[E]**. Las páginas invocan la capa de aplicación **en proceso**, sin pasar por HTTP: no hay una llamada de red que autenticar entre la interfaz y la lógica **[E]**.

Los controladores se organizan por recurso dentro de la carpeta de su módulo, coherente con la organización por módulos de la solución.

Dos alternativas descartadas **[E]**:

1. **Minimal APIs en lugar de controladores.** Se descarta como estilo general: en una API de administración de pocas decenas de endpoints, agrupados por módulo y con validación por atributos, los controladores son más legibles y acompañan mejor la organización por carpetas. La diferencia de rendimiento es irrelevante frente al costo de las operaciones sobre el motor de contenedores. Excepción admitida: los endpoints de sondeo de estado y métricas, de altísima frecuencia y cuerpo mínimo, pueden implementarse como minimal APIs sin romper la coherencia.
2. **Aislar la página del lienzo en `InteractiveAuto` o WebAssembly.** Es la mitigación M6 de RG-01 y se descarta salvo que PT-01 falle después de aplicar M1 a M4, porque cambia un requisito declarado del proyecto.

#### §17.1.P.3 Comunicación e integración

| Aspecto | Definición |
|---|---|
| Interfaz de usuario | Circuito SignalR sobre WebSockets, propio de Interactive Server **[E]**. Garantizar WebSockets, y no sondeo largo, en la publicación del contenedor es la mitigación M4 de RG-01 |
| API REST | HTTP/JSON bajo `/api/v1`, con controladores. Todos los endpoints autenticados y con ámbito declarado |
| Formato de error | `ProblemDetails`, el estándar de ASP.NET Core, con miembros de extensión propios para el informe de conflicto **[E]**. Ver anexos [E-8](#208--e-8--reserva-de-direcciones-ip-e-informe-de-conflicto) y [E-13](#2013--e-13--contrato-del-endpoint-de-despliegue) |
| Versionado de contratos | El prefijo `/api/v1` es la unidad de versión. Un cambio incompatible abre `/api/v2`; `v1` no cambia su semántica una vez publicada |
| Política de breaking changes | Ningún cambio incompatible dentro de una versión mayor de la API. Agregar un campo opcional a una respuesta no lo es; quitar o renombrar uno, sí |
| Hacia otros proyectos | Consume `SelfHosted.Application` por referencia de proyecto, en proceso. Registra las implementaciones de `SelfHosted.Infrastructure` en el contenedor de dependencias durante el arranque |
| Integración saliente | Motor de contenedores por socket, siempre a través de `IContenedorEngine`. Registro de contenedores en flujo continuo para la vista de logs |

La superficie de la API son los veintidós endpoints transcriptos en el anexo [E-15](#2015--e-15--superficie-de-la-api-rest) **[E]**, cada uno con su ámbito: `proyectos:leer`, `proyectos:escribir`, `despliegues:ejecutar`, `catalogo:leer`, `catalogo:escribir` y `sistema:leer`. Las reglas que esos endpoints hacen cumplir, con su momento de validación y su código de respuesta, están en el anexo [E-16](#2016--e-16--catálogo-de-reglas-de-negocio-rn-01-a-rn-20).

#### §17.1.P.4 Persistencia

No tiene persistencia propia: delega en `SelfHosted.Infrastructure` a través de las abstracciones de repositorio de `SelfHosted.Application`. La única excepción es el almacén de ASP.NET Core Identity, que se materializa sobre el mismo `DbContext` de la solución **[D]**.

Restricción heredada que este proyecto debe respetar **[E]**: el alcance del `DbContext` es **uno por operación**. Los servicios en segundo plano crean su propio alcance en cada ciclo y nunca comparten el de la interfaz.

Multi-tenant: no aplica. Hay un único administrador y una única instancia.

#### §17.1.P.5 Seguridad y autenticación

| Aspecto | Definición **[E]** |
|---|---|
| Interfaz web | Cookie de ASP.NET Core Identity: `HttpOnly`, `Secure`, `SameSite=Strict`. Sin token en el navegador |
| API para automatismos | Encabezado `Authorization: Bearer <token>` |
| Formato del token de API | JWT firmado con clave simétrica de la instancia (HS256). Se almacena el hash del token, nunca el token. Se muestra al usuario una única vez. Carga útil de ejemplo en el anexo [E-12](#2012--e-12--carga-útil-de-un-token-de-api-emitido) |
| Ámbitos | `proyectos:leer`, `proyectos:escribir`, `despliegues:ejecutar`, `catalogo:leer`, `catalogo:escribir`, `sistema:leer` |
| Vigencia | Configurable por token; por defecto 90 días, con la opción "sin vencimiento" desaconsejada en la interfaz |
| Revocación | Inmediata, contrastando el identificador del token (`jti`) contra la tabla de tokens, que marca la fecha de revocación |
| Clave de firma | Generada en el primer arranque. Fuera del repositorio y fuera de la imagen: variable de entorno o archivo montado |
| Credenciales de terceros | Los tokens de GitHub y las credenciales de registros privados se guardan cifrados en reposo con la clave de la instancia. Nunca se devuelven en claro por la API ni por la interfaz |
| Auditoría | Toda operación de escritura registra el actor: `admin` o `token:<prefijo>` |
| Contraseña del administrador | Almacenada con una función de derivación de clave, nunca en claro ni con un resumen simple |
| Segundo factor | Fuera del primer alcance; la elección de Identity no lo bloquea |
| ROPC | **Descartado.** La práctica recomendada vigente del IETF (RFC 9700, BCP 240, §2.4) dice textualmente *"The resource owner password credentials grant MUST NOT be used"*, OAuth 2.1 lo elimina del estándar y Microsoft lo desaconseja explícitamente. Además, la interfaz web no lo necesita: su sesión vive en el circuito **[E]** |

Secretos en la documentación de proceso **[E]**: los informes de cierre de etapa (§15.1) transcriben completas las credenciales de ejemplo del entorno de desarrollo, porque quien prueba necesita poder entrar; pero nunca transcriben un secreto de producción ni la contraseña real elegida por el agente humano, y en su lugar indican dónde consultarla.

Secretos en CI/CD: ningún secreto entra al repositorio, ni claves de firma, ni tokens, ni credenciales de registros **[E]**. Los tokens de API que use un workflow se guardan como secretos del repositorio remoto y se emiten con el ámbito mínimo necesario, típicamente sólo `despliegues:ejecutar`.

Nota de seguridad transversal **[E]**: el servicio necesita acceso al socket del motor de contenedores, lo que equivale a control total del host. Por lo tanto no debe publicarse a internet sin una capa adicional de protección, y el proxy inverso está explícitamente fuera de alcance.

Compliance: no aplica normativa alguna (§10).

#### §17.1.P.6 Estrategia de testing

**[S] S-02** en los umbrales numéricos; los niveles, los proyectos y el criterio de cierre son **[E]**.

| Nivel | Proporción de la pirámide | Proyecto | Framework | Qué cubre |
|---|---|---|---|---|
| Unitarias | 20 % | `SelfHosted.Application.Tests` | xUnit con dobles de prueba | Casos de uso invocados desde la capa web, con `IContenedorEngine` y repositorios simulados |
| Integración | 60 % | `SelfHosted.Integration.Tests` | xUnit más Testcontainers | Endpoints de la API con persistencia real sobre SQLite y adaptador real contra el motor de contenedores |
| End-to-end | 20 % | Guiones de demostración de cada etapa | Manual, ejecutado por el agente humano en el navegador | El flujo completo de usuario de la etapa, más los guiones acumulados de las etapas anteriores |

- **Cobertura mínima, gate del CI: 60 % de líneas y 50 % de ramas.** Umbral deliberadamente moderado para la capa de presentación, donde el componente Razor se valida por guion de demostración y no por prueba unitaria.
- Tests de contrato hacia otros proyectos: los casos de uso de `SelfHosted.Application` se ejercitan desde este proyecto sólo a través de sus interfaces públicas.
- **Criterio de cierre de etapa [E]:** una etapa no se considera terminada sin pruebas automatizadas de las reglas de negocio que introdujo. Los guiones de demostración siguen siendo manuales, porque son la demostración al cliente, pero lo que protegen las pruebas no debe depender de ellos.

#### §17.1.P.7 Estrategia de versionado y release

**[S] S-04.** Las fuentes declaran el etiquetado por etapa cerrada y la actualización del `changelog.md` en la rama de la etapa **[E]**; el esquema de versión se propone aquí.

- **SemVer 2.0.0 y Conventional Commits, sin excepciones**, para toda la solución. La versión es única para los cuatro proyectos, porque se despliegan como un único artefacto.
- Herramienta de cálculo de versión: derivada de los Conventional Commits desde la etiqueta anterior, en el pipeline. Mientras la solución no alcance su primera entrega completa, la versión permanece en `0.x`.
- Branching: una rama por etapa, creada desde la rama principal, fusionada por el agente humano tras el OK del punto de control, y borrada. No se abre la rama de una etapa antes de que se haya fusionado la anterior **[E]**.
- Canales: no hay canal de distribución pública. El artefacto es una imagen de contenedor para el servidor propio.
- Cada etapa cerrada y fusionada recibe una **etiqueta** en el repositorio, para poder volver a cualquier demostración anterior **[E]**.

#### §17.1.P.8 Pipeline CI/CD

Plataforma: GitHub Actions, con el runner autoalojado del propio servidor **[E]**.

| Stage | Quality gate |
|---|---|
| Restore y build | `scripts/build.sh` termina en 0 **y sin advertencias de compilación** **[E]**. Bloqueante |
| Test | `scripts/test.sh` pasa completo y la cobertura alcanza el mínimo de P.6. Bloqueante |
| Análisis de composición (SCA) | Ninguna vulnerabilidad conocida de severidad alta o crítica en las dependencias. Bloqueante |
| SBOM | Se genera y se adjunta al artefacto. No bloqueante |
| Verificación de secretos | Ningún secreto en el árbol de fuentes. Bloqueante **[E]** |
| Guiones de demostración anteriores | El agente IA verifica que todos los guiones de las etapas previas siguen pasando antes de preparar el pull request **[E]**. Bloqueante |
| Informe de cierre de la etapa | El informe de §15.1 está publicado en `Avances/`, con sus trece secciones y anotado en `Avances/README.md`, antes de convocar el punto de control **[E]**. Bloqueante |
| Construcción de la imagen | `Dockerfile` multietapa propio del pipeline de producción: una etapa con el SDK compila y publica, la imagen final lleva sólo el entorno de ejecución **[E]** |

Matriz de SO y runtime: única. Linux con .NET 10, porque el host de desarrollo es Linux, el devcontainer es Linux y el destino de producción es Linux **[E]**.

Ambientes: desarrollo dentro del devcontainer y producción como contenedor en el servidor. No hay ambientes intermedios de QA ni de staging: el punto de control de cada etapa cumple esa función, ejecutado sobre el entorno de desarrollo.

**Quality gate bloqueante para mergear [E]:** el pull request *es* el punto de control. No se fusiona sin el OK explícito del agente humano tras ejecutar el guion de demostración de la etapa, y la fusión la realiza el agente humano, no el agente IA.

Rollback: cada etapa cerrada tiene su etiqueta; volver a una demostración anterior es desplegar la imagen de esa etiqueta. Como el reemplazo de versión es *detener y arrancar*, el rollback tiene la misma ventana de indisponibilidad que el despliegue **[E]**.

#### §17.1.P.9 Compatibilidad y plataformas target

| Plataforma | Versión mínima | Nota |
|---|---|---|
| Sistema operativo de ejecución | Linux Debian 13, kernel 6.12 **[E]** | El destino final es un contenedor Linux |
| Runtime | .NET 10 | Sin compatibilidad hacia atrás con runtimes anteriores |
| Motor de contenedores del host | Docker 26.x con `compose` v5 y `buildx` **[E]** | El cliente elegido declara soporte de la API del motor v29.4.1 **[E]** |
| Navegador | Navegador de escritorio con soporte de WebSockets **[S]** | Interactive Server exige conexión SignalR persistente; las fuentes no declaran una matriz de navegadores |
| Red | Red local. El servicio no se publica a internet **[E]** | |

Toda combinación no listada se considera no soportada. No hay soporte declarado para Windows ni macOS como plataformas de ejecución, ni de desarrollo: no hay scripts `.bat` porque el host de desarrollo es Linux, el devcontainer es Linux y el destino es Linux **[E]**.

#### §17.1.P.10 Requerimientos no funcionales (NFR)

Los umbrales de PT-01 son **[E]**, declarados en `Requerimientos-Tecnicos.md` §9. El resto es **[S] S-03**.

| Categoría | Métrica | Umbral | Origen |
|---|---|---|---|
| Fluidez del lienzo | Retraso perceptible entre el evento de puntero y la actualización visual, con 30 nodos y 40 aristas con insignia de estado y métricas por nodo, en red local | Sin retraso perceptible | PT-01 **[E]** |
| Fluidez bajo carga de estado | 30 nodos actualizando su estado cada 2 s, sin degradar el arrastre | Sin degradación | PT-01 **[E]** |
| Consumo del circuito | Memoria por circuito SignalR tras 15 minutos de uso continuo | Estable, sin crecimiento sostenido | PT-01 **[E]** |
| Escala de datos objetivo | Nodos por proyecto y contenedores en el parque | 10 a 30 nodos por lienzo; menos de 50 contenedores | Dimensionamiento **[E]** |
| Huella de memoria | Memoria residente del proceso en régimen | Cientos de MB, nunca GB | Perfil de capacidad **[E]** |
| Frecuencia de sondeo de métricas | Recolección de estadísticas del motor | Cada 3 a 5 s, y sólo con vistas abiertas; ningún sondeo con vistas cerradas | **[E]** |
| Reconciliación de estado | Suscripción a eventos del motor más reconciliación periódica | Cada 30 s | **[E]** |
| Persistencia del layout | Escrituras durante un gesto de arrastre | Cero. Una única escritura al finalizar, con antirrebote de 400 ms | Regla de oro del lienzo **[E]** |
| Latencia de la API | Percentil 99 de los endpoints de lectura, sin operación sobre el motor | ≤ 300 ms **[S]** | Propuesto |
| Disponibilidad | SLO | No se declara SLO: el servicio se detiene y arranca con ventana de indisponibilidad aceptada, y no hay proxy inverso que permita solapamiento **[E]** | |
| Observabilidad | Qué se registra | Toda operación de escritura queda en auditoría con actor, acción, entidad, detalle y resultado **[E]** |

#### §17.1.P.11 Decisiones técnicas pre-tomadas (pre-ADR)

| # | Decisión | Alternativas evaluadas | Justificación |
|---|---|---|---|
| DA-01 | Cookie de ASP.NET Core Identity para la interfaz web más tokens de API con ámbitos para automatismos. **ROPC descartado** | ROPC, `client_credentials` con JWT propio, endpoints de Identity (`MapIdentityApi`), servidor OIDC propio con OpenIddict | ROPC está prohibido por la práctica recomendada vigente y eliminado en OAuth 2.1; la interfaz no lo necesita porque su sesión vive en el circuito; el único consumidor que necesita token es automatizado, y para automatismos corresponde una credencial de máquina. OpenIddict es técnicamente apto pero desproporcionado para un solo usuario **[E]** |
| DA-02 | `Docker.DotNet.Enhanced` 4.3.3 como cliente del motor, detrás de `IContenedorEngine` | `Docker.DotNet` 3.125.15 | El cliente histórico no publica desde mayo de 2023; el fork lo mantiene el equipo de Testcontainers, publica para `net10.0` y declara soporte de la API del motor v29.4.1 **[E]** |
| — | Controladores como estilo de la API, con minimal APIs admitidas sólo para sondeo de estado y métricas | Minimal APIs para todo | Ver P.2 |
| — | `Z.Blazor.Diagrams` como librería del lienzo, con `Excubo.Blazor.Diagrams` como segunda opción nativa y maxGraph envuelto con interoperabilidad de grano grueso como plan de contingencia | Excubo, Syncfusion, MindFusion, React Flow, maxGraph, JointJS, Drawflow, litegraph.js, Rete.js, jsPlumb | Es la única que combina licencia MIT, soporte declarado de Blazor Server sobre `net10.0` y cobertura funcional completa sin introducir una capa de interoperabilidad. Syncfusion y MindFusion se descartan por licencia comercial; React Flow y Rete.js por obligar a introducir un framework JavaScript completo **[E]** |
| DA-05 | El deshacer y rehacer se implementa **sobre el changeset**, no sobre la librería del lienzo | Ninguno; integrado en la librería | Descartar un cambio individual del changeset ya es la mitad del deshacer **[E]** |
| DA-07 | Retención del historial: últimos 50 despliegues por servicio y 90 días de auditoría, configurables | — | **[E]** |

**Queda abierto para el Sprint 0 [E]:** DA-06, el manejo del gesto de arrastre. Se resuelve **midiendo** en PT-01: se implementa la mitigación M1 (arrastre en JavaScript, notificación a C# sólo al soltar) únicamente si la medición lo exige.

#### §17.1.P.12 Restricciones técnicas y trade-offs aceptados

| A qué se renuncia | Qué se gana | Consecuencia asumida |
|---|---|---|
| Interactividad del lado del cliente (WebAssembly) | Un único modelo de renderizado, todo el código en C# del lado del servidor, sin duplicar lógica ni exponer el acceso al motor | Cada interacción es un viaje al servidor **[E]**; el lienzo depende de la latencia de red local y de PT-01 |
| Despliegue sin interrupción | No administrar proxies inversos, que están fuera de alcance | El reemplazo de versión es *detener y arrancar*, con ventana de indisponibilidad que la interfaz debe advertir |
| Escalabilidad horizontal del propio administrador | Simplicidad de un monolito y de SQLite | Una sola instancia. Dos instancias sobre el mismo archivo de base de datos no están soportadas |
| Deshacer y rehacer integrados en la librería del lienzo | Cobertura funcional y comunidad de `Z.Blazor.Diagrams` | Hay que implementarlos sobre el changeset **[E]** |
| Registro de la construcción de imágenes en tiempo real sin límite | Un servidor de gama modesta que no debe saturarse | Sondeo moderado y por lotes, con antirrebote |

Restricciones del ecosistema que el proyecto no puede eludir **[E]**: el SDK de .NET no existe en el host y no se va a instalar, de modo que todo comando de todo guion corre dentro del devcontainer; los scripts asumen `dotnet` en el `PATH` y no detectan el entorno ni ramifican por plataforma; la orquestación del entorno de desarrollo es declarativa en `devcontainer.json` y ningún script hace `docker run` a mano para levantarlo; la depuración va por `.vscode/launch.json` y F5, por un camino separado del de los scripts; y la imagen del devcontainer no define, ni deriva, ni condiciona la de producción.

Cargas que no soporta: tráfico de usuarios concurrentes (hay uno solo), exposición a internet, y federación de identidad.

---

### §17.2 SelfHosted-Application

| Campo | Valor |
|---|---|
| `Nombre-Proyecto` | SelfHosted-Application |
| `nombre-proyecto-codigo` | `SelfHosted.Application` |
| `project_type` (D8) | library |
| Rol | Casos de uso por módulo y abstracciones de salida que la infraestructura implementa |
| `redistribuible` | false |

#### §17.2.P.1 Stack tecnológico

C# sobre .NET 10, biblioteca de clases sin interfaz de usuario ni acceso directo a infraestructura. Dependencias core: únicamente `SelfHosted.Domain` **[E]**. No referencia EF Core, ni el cliente del motor de contenedores, ni ASP.NET Core: esa ausencia es la que hace verificable por compilación la regla de aislamiento.

Plataforma target: la misma del proceso que la hospeda, contenedor Linux con .NET 10.

#### §17.2.P.2 Estilo arquitectónico del proyecto

Capa de aplicación de la Clean Architecture, con **organización por módulos** **[E]**: proyectos, servicios y despliegues, descubrimiento y adopción, red y conflictos de IP, catálogo, observabilidad, e identidad y tokens. Cada módulo agrupa sus casos de uso, sus DTO y sus validadores. Las abstracciones de salida viven en una carpeta propia (`Abstracciones/`) y son la única forma en que la capa alcanza el mundo exterior.

Dos alternativas descartadas **[D]**:

1. **Organización por tipo técnico** (una carpeta de servicios, otra de DTO, otra de validadores, transversales a todo el dominio): dispersa cada capacidad en tres lugares y hace que agregar un módulo toque tres carpetas. La organización por módulos está declarada en las fuentes.
2. **Fusionar esta capa con el dominio**: haría que las reglas de negocio dependieran de DTO y de abstracciones de infraestructura, y rompería la exigencia de que las pruebas de dominio corran sin infraestructura **[E]**.

#### §17.2.P.3 Comunicación e integración

No expone protocolo de red. Su contrato hacia `SelfHosted.Web` son los casos de uso públicos de cada módulo y sus DTO; su contrato hacia `SelfHosted.Infrastructure` son las abstracciones que esta implementa: `IContenedorEngine`, los repositorios y `IRelojSistema` **[E]**. Ambas aristas existen en el grafo de §13.

`IContenedorEngine` es el contrato más sensible de la solución: **ningún tipo de la librería de Docker puede aparecer fuera de `SelfHosted.Infrastructure/Contenedores/`** **[E]**. Los tipos que cruzan esta interfaz son propios de la solución, nunca del cliente de Docker. Es lo que permite cambiar de cliente sin tocar el resto.

Política de breaking changes: al no ser redistribuible, un cambio de firma se propaga en el mismo commit a sus dependientes. La compilación es el detector.

#### §17.2.P.4 Persistencia

No aplica: define las abstracciones de repositorio, no su implementación. No conoce EF Core ni SQLite.

#### §17.2.P.5 Seguridad y autenticación

No autentica: recibe el actor ya resuelto por la capa web (`admin` o `token:<prefijo>`) y lo propaga a la auditoría **[E]**. El módulo de identidad y tokens implementa el ciclo de vida de los tokens de API: alta con ámbitos y vigencia, listado, revocación inmediata, y la regla de que sólo se persiste el hash del token y el valor se muestra una única vez **[E]**.

Secretos: nunca en claro en un DTO de salida. Los valores sensibles viajan enmascarados o como referencia a secreto **[E]**.

#### §17.2.P.6 Estrategia de testing

**[S] S-02** en el umbral.

| Nivel | Proporción | Proyecto | Framework | Qué cubre |
|---|---|---|---|---|
| Unitarias | 90 % | `SelfHosted.Application.Tests` | xUnit con dobles de prueba | Casos de uso con `IContenedorEngine` y repositorios simulados **[E]** |
| Integración | 10 % | `SelfHosted.Integration.Tests` | xUnit más Testcontainers | Los casos de uso cuyo comportamiento sólo se verifica contra un motor real, en particular la importación y exportación de Compose del anexo [E-21](#2021--e-21--correspondencia-entre-una-configuración-real-y-el-modelo-de-la-solución) |

**Cobertura mínima, gate del CI: 80 % de líneas y 70 % de ramas.** Es la capa de mayor densidad de lógica de orquestación y se cubre con dobles de prueba, sin infraestructura: sólo el dominio lleva un umbral más alto.

Los casos T-05 a T-14 y T-30 del anexo [E-22](#2022--e-22--casos-de-prueba-derivados-de-las-configuraciones-reales) corresponden a esta capa: validación de arranque, resolución de aristas, orden topológico e ida y vuelta con Compose.

Tests de contrato: cada abstracción de `Abstracciones/` lleva su batería de pruebas de contrato, que la implementación de `SelfHosted.Infrastructure` debe pasar. Es lo que sostiene la promesa de DA-02: si el cliente del motor cambia, la batería de contrato dice si el reemplazo es equivalente.

#### §17.2.P.7 Estrategia de versionado y release

Versión única de la solución, SemVer 2.0.0 y Conventional Commits, igual que §17.1.P.7. No se publica como paquete: no es redistribuible y viaja dentro del artefacto único.

#### §17.2.P.8 Pipeline CI/CD

Los mismos stages y quality gates de §17.1.P.8, ejecutados sobre la solución completa por `scripts/build.sh` y `scripts/test.sh`. La cobertura mínima que se verifica para este proyecto es la de su P.6: 80 % de líneas y 70 % de ramas.

#### §17.2.P.9 Compatibilidad y plataformas target

Runtime .NET 10, contenedor Linux. Sin superficie propia de plataforma: no lee del sistema de archivos, no abre puertos y no depende del sistema operativo. Toda combinación no listada se considera no soportada.

#### §17.2.P.10 Requerimientos no funcionales (NFR)

**[S] S-03** salvo lo marcado.

| Métrica | Umbral |
|---|---|
| Validación de conflicto de direcciones IP antes de arrancar un proyecto de hasta 30 servicios | ≤ 50 ms, sin acceso al motor de contenedores |
| Transaccionalidad de la validación de arranque | Entre validar y registrar la reserva activa no puede colarse otro arranque: validación y registro van en la misma transacción de escritura **[E]** |
| Serialización de despliegues | Las operaciones de despliegue se serializan por proyecto **[E]** |
| Determinismo | Ningún caso de uso lee el reloj del sistema directamente: lo hace por `IRelojSistema`, para que las pruebas sean reproducibles **[E]** |
| Observabilidad | Cada caso de uso de escritura emite su evento de auditoría con actor, acción, entidad y resultado **[E]** |

#### §17.2.P.11 Decisiones técnicas pre-tomadas (pre-ADR)

| Decisión | Alternativas | Justificación |
|---|---|---|
| Toda salida al mundo exterior pasa por una abstracción declarada en este proyecto | Que la capa web hable directamente con la infraestructura | Es la condición que hace verificable la regla de aislamiento del cliente del motor **[E]** |
| El changeset es el mecanismo de edición transaccional del proyecto, y también el sustrato del deshacer y rehacer. Su forma y su informe de impacto están en el anexo [E-5](#205--e-5--changeset-de-cambios-pendientes-con-su-informe-de-impacto) | Guardado inmediato de cada cambio | Aporta revisión antes de aplicar, descarte granular y un único redespliegue en lugar de uno por clic **[E]** |
| Los cambios puramente visuales no entran al changeset y se guardan al instante | Que todo cambio entre al changeset | De lo contrario el usuario acumularía cambios pendientes por el mero hecho de ordenar el dibujo **[E]** |

Abierto para el Sprint 0: la forma concreta del contrato de `IContenedorEngine` (operaciones, tipos y modelo de errores), que se fija al implementar la puerta técnica PT-02 **[D]**.

#### §17.2.P.12 Restricciones técnicas y trade-offs aceptados

| A qué se renuncia | Qué se gana | Consecuencia asumida |
|---|---|---|
| Acceso directo a EF Core desde los casos de uso | Pruebas unitarias sin base de datos y libertad de cambiar el motor | Hay que declarar y mantener las abstracciones de repositorio, con su costo de indirección |
| Tipos del cliente de Docker en las firmas | Cambiar de cliente confinado a un adaptador | Hay que mapear los tipos del motor a tipos propios en la frontera |
| Concurrencia de escritura | Coherencia sobre SQLite, que no admite escrituras concurrentes | Las escrituras de los servicios en segundo plano se serializan **[E]** |

---

### §17.3 SelfHosted-Infrastructure

| Campo | Valor |
|---|---|
| `Nombre-Proyecto` | SelfHosted-Infrastructure |
| `nombre-proyecto-codigo` | `SelfHosted.Infrastructure` |
| `project_type` (D8) | library |
| Rol | Adaptadores de salida: persistencia, motor de contenedores, métricas del host y exportación |
| `redistribuible` | false |

#### §17.3.P.1 Stack tecnológico

C# sobre .NET 10. Dependencias core **[E]**:

| Dependencia | Versión | Licencia y fecha | Por qué es core |
|---|---|---|---|
| Entity Framework Core con proveedor SQLite | La correspondiente a .NET 10 | — | Es la persistencia de toda la solución. Migraciones aplicadas al arrancar |
| Docker.DotNet.Enhanced | 4.3.3 | MIT, publicada 2026-06-28, marcos `netstandard2.0`, `net8.0`, `net9.0`, `net10.0` | Cliente del motor de contenedores. Declara soporte de la API del motor v29.4.1 |
| `dotnet-ef` | Herramienta **local** del repositorio, no global | — | Para que la versión quede versionada junto al código **[E]** |

#### §17.3.P.2 Estilo arquitectónico del proyecto

Capa de adaptadores, organizada por tecnología de salida: `Persistencia/`, `Contenedores/`, `Sistema/` y `Exportacion/` **[E]**. Cada carpeta implementa las abstracciones declaradas en `SelfHosted.Application/Abstracciones/` y no expone contrato propio: se registra en el contenedor de dependencias del host durante el arranque.

Dos alternativas descartadas **[D]**:

1. **Un proyecto por adaptador** (uno de persistencia, uno de contenedores, uno de sistema): multiplicaría las unidades de compilación sin ganar aislamiento real, porque todas se despliegan juntas y ninguna se publica por separado.
2. **Adaptadores dentro del proyecto web**: la regla de aislamiento del cliente de Docker dejaría de ser verificable por compilación, que es exactamente lo que se quiere evitar.

#### §17.3.P.3 Comunicación e integración

| Integración | Protocolo | Nota |
|---|---|---|
| Motor de contenedores | API HTTP del demonio sobre socket de dominio Unix (`/var/run/docker.sock`), montado del host | En desarrollo por `docker-outside-of-docker`; en producción por socket montado en el contenedor **[E]** |
| Base de datos | Archivo SQLite local, acceso en proceso | Ver P.4 |
| Sistema de archivos | Lectura del sistema de archivos virtual del sistema operativo, montado en modo sólo lectura, para las métricas del host **[E]** | |
| Exportación | Escritura de archivos Compose, de variables y del manifiesto propio en el directorio de datos de trabajo | Ver anexo [E-14](#2014--e-14--exportación-de-un-proyecto-a-docker-compose). Las reglas de traducción en el sentido inverso, de Compose al modelo, están en el anexo [E-21](#2021--e-21--correspondencia-entre-una-configuración-real-y-el-modelo-de-la-solución), verificadas contra las configuraciones reales del anexo [E-20](#2020--e-20--configuraciones-reales-de-contenedor-ofuscadas) |

**Restricción de rutas, consecuencia de `docker-outside-of-docker` [E]:** toda ruta que la aplicación le pase al demonio —contexto de construcción de un Dockerfile, montajes de volumen, directorio de repositorios clonados— la interpreta el demonio **del host**, no el sistema de archivos del devcontainer. Por eso el directorio de datos de trabajo debe estar montado **en la misma ruta absoluta en el host y en el devcontainer**, se expone como una variable de configuración única, y todo el adaptador la usa como raíz. Traducir rutas en el adaptador se descartó por frágil.

Los contenedores creados son **hermanos, no hijos** del devcontainer: nacen en el host, al mismo nivel. Para que la aplicación alcance por red a un servicio recién desplegado, el devcontainer debe estar adjunto a la misma red de puente del proyecto, o alcanzarlo por el puerto publicado en el host **[E]**.

#### §17.3.P.4 Persistencia

| Aspecto | Definición **[E]** |
|---|---|
| Motor | SQLite, archivo único |
| Modo de diario | **WAL.** Los servicios en segundo plano escriben concurrentemente con la interfaz; sin WAL, los bloqueos de escritura degradan la interfaz |
| Concurrencia de escritura | **Escritor único.** SQLite no admite escrituras concurrentes: las escrituras de los servicios en segundo plano se serializan |
| Alcance del `DbContext` | Uno por operación. Los servicios en segundo plano crean su propio alcance en cada ciclo y nunca comparten el de la interfaz |
| Versionado del esquema | Migraciones de EF Core, aplicadas automáticamente al arrancar sobre una base inexistente o desactualizada. `scripts/migrate.sh` genera y aplica; `scripts/reset-db.sh` elimina la base local para reproducir el estado de primer arranque |
| Ubicación del archivo | Configurable. En producción reside en un volumen persistente, nunca dentro de la imagen |
| Respaldo | Exportación programada de proyectos y catálogo a un destino externo (DA-08). El respaldo debe ser consistente con WAL activo |
| Multi-tenant | No aplica |

Modelo de datos: el esquema relacional está transcripto completo en el anexo [E-9](#209--e-9--esquema-relacional-de-la-base-sqlite). Tres decisiones de esquema que este proyecto debe sostener **[E]**:

1. La dirección IP se guarda en `reservas_ip`, no sólo dentro del JSON de red, porque es el único dato que se consulta **entre proyectos** para detectar conflictos y necesita ser una columna indexada. La clave única por `(servicio_id, numero_replica)` permite escalar un servicio macvlan dando una dirección por réplica.
2. `despliegues` no se borra nunca: es el historial que alimenta la línea de tiempo del panel de servicio, con la política de retención de DA-07.
3. Un único administrador no significa "sin auditoría": `eventos_auditoria` es lo que permite entender qué disparó un despliegue cuando lo hizo un workflow y no una persona.

Los campos de configuración de baja cardinalidad viajan como JSON en columnas `TEXT`, que en SQLite es idiomático y permite consultarlos con `json_extract` si hiciera falta **[E]**.

#### §17.3.P.5 Seguridad y autenticación

No autentica: implementa el almacén de Identity y la tabla de tokens definidos por las capas superiores.

| Aspecto | Definición **[E]** |
|---|---|
| Cifrado en reposo | Los tokens de GitHub y las credenciales de registros privados se guardan cifrados con la clave de la instancia |
| Clave de la instancia | Generada en el primer arranque, fuera del repositorio y fuera de la imagen: variable de entorno o archivo montado |
| Hash de tokens de API | Sólo se persiste el hash; el token nunca se almacena |
| Enmascarado en la adopción | Las variables cuyo nombre contiene `PASSWORD`, `TOKEN`, `SECRET`, `KEY` o `PAT` se importan enmascaradas y requieren recarga manual |
| Exportación | Ningún secreto se escribe en una exportación: viaja como referencia a variable, con el archivo de variables vacío **[E]** |
| Socket del motor | Su acceso equivale a control total del host. Las salvaguardas de aislamiento son obligatorias: prefijo de nombre reservado y configurable, distinto en desarrollo y en producción; etiquetas de pertenencia con identificador de proyecto y de servicio como fuente de verdad; rango de direcciones de desarrollo distinto del de producción y sin solapamiento; confirmación explícita escribiendo el nombre para adoptar o detener un contenedor sin etiquetas de la aplicación; y descubrimiento en modo sólo lectura, donde listar no habilita operar **[E]** |

#### §17.3.P.6 Estrategia de testing

**[S] S-02** en el umbral.

| Nivel | Proporción | Proyecto | Framework | Qué cubre |
|---|---|---|---|---|
| Integración | 85 % | `SelfHosted.Integration.Tests` | xUnit más **Testcontainers** | Persistencia real contra SQLite y adaptador real contra el motor de contenedores **[E]** |
| Unitarias | 15 % | `SelfHosted.Application.Tests` | xUnit | Mapeos y traducciones puras de la frontera, sin salida real |

**Cobertura mínima, gate del CI: 55 % de líneas y 45 % de ramas.** Es la capa con mayor proporción de código de frontera, cuyo valor se verifica por prueba de integración contra el sistema real y no por cobertura de líneas.

Tests de contrato: este proyecto debe pasar la batería de contrato que `SelfHosted.Application` define para cada abstracción. La verificación de PT-02 —listar contenedores del host, crear, arrancar, detener y eliminar un contenedor de prueba desde código, construir una imagen desde un Dockerfile con contexto en el directorio de datos, y alcanzar por red el contenedor creado— se materializa como prueba de integración automatizada, no como comprobación manual **[E]**.

#### §17.3.P.7 Estrategia de versionado y release

Versión única de la solución, SemVer 2.0.0 y Conventional Commits, igual que §17.1.P.7. No se publica como paquete. Las migraciones de EF Core llevan su propia secuencia y **no se editan una vez fusionadas**: un cambio de esquema se corrige con una migración nueva **[D]**.

#### §17.3.P.8 Pipeline CI/CD

Los mismos stages y quality gates de §17.1.P.8. Particularidades de este proyecto:

- El stage de test requiere el socket del motor de contenedores disponible en el runner, porque las pruebas de integración usan Testcontainers y el adaptador real **[E]**. Es bloqueante.
- La verificación de que ningún tipo de la librería de Docker aparece fuera de `SelfHosted.Infrastructure/Contenedores/` es un gate de arquitectura bloqueante **[E]**.
- La cobertura mínima que se verifica es la de su P.6: 55 % de líneas y 45 % de ramas.

#### §17.3.P.9 Compatibilidad y plataformas target

| Plataforma | Versión mínima |
|---|---|
| Runtime | .NET 10 |
| Sistema operativo | Linux Debian 13, kernel 6.12 **[E]** |
| Motor de contenedores | Docker 26.x con `compose` v5 y `buildx` **[E]**; el cliente declara soporte de la API del motor v29.4.1 **[E]** |
| Formato de exportación | Docker Compose en la versión que corresponde a `compose` v5 **[E]** |
| SQLite | La versión embebida en el proveedor de EF Core de .NET 10, con WAL habilitado |

Toda combinación no listada se considera no soportada. En particular, no hay soporte para motores de contenedores distintos de Docker ni para bases de datos distintas de SQLite.

#### §17.3.P.10 Requerimientos no funcionales (NFR)

**[S] S-03** salvo lo marcado.

| Métrica | Umbral |
|---|---|
| Reconciliación de estado con el motor | Suscripción a eventos más reconciliación completa cada 30 s, traduciendo el estado del contenedor con la tabla del anexo [E-17](#2017--e-17--ciclo-de-vida-del-despliegue-y-correspondencia-con-el-motor) **[E]** |
| Recolección de estadísticas | Cada 3 a 5 s y sólo con vistas abiertas; ningún sondeo con vistas cerradas **[E]**. Un solo recolector publica a todos los circuitos conectados, no un flujo por pestaña **[E]** |
| Costo de la reconciliación | Una pasada completa sobre un parque de 50 contenedores no debe superar 2 s ni saturar un núcleo |
| Consulta de conflicto de direcciones | Resuelta por índice sobre `reservas_ip` y sobre los despliegues activos **[E]** |
| Tiempo de espera de bloqueo de SQLite | Fijado explícitamente, no el valor por omisión **[E]** |
| Arranque en frío | Las migraciones se aplican solas sobre una base inexistente sin intervención manual **[E]** |
| Observabilidad | Todo error del adaptador del motor se traduce a un error propio con causa identificable, nunca se propaga el tipo del cliente **[E]** |

#### §17.3.P.11 Decisiones técnicas pre-tomadas (pre-ADR)

| # | Decisión | Alternativas | Justificación |
|---|---|---|---|
| DA-02 | `Docker.DotNet.Enhanced` 4.3.3 | `Docker.DotNet` 3.125.15 | El histórico no publica desde 2023; el fork está mantenido por el equipo de Testcontainers y declara soporte del motor moderno **[E]** |
| DA-03 | Modo de red por defecto de un proyecto nuevo: **bridge** | macvlan por defecto | Aislado, con resolución de nombres y sin consumir dirección de la red local. macvlan queda como opción explícita por servicio **[E]** |
| DA-04 | El rango de direcciones gestionado es un bloque **fuera del rango que reparte el DHCP** de la red | Sin restricción | La configuración inicial debe advertirlo y el sistema debe validarlo **[E]** |
| DA-07 | Retención: últimos 50 despliegues por servicio y 90 días de auditoría, configurables | — | **[E]** |
| DA-08 | Respaldo por exportación programada de proyectos y catálogo a un destino externo | Copia del archivo de base de datos | El servidor no tiene redundancia de disco (RG-07); la exportación es además portable **[E]** |
| — | El layout del lienzo se guarda junto al proyecto en una única columna JSON, no repartido en columnas por nodo, con la forma del anexo [E-1](#201--e-1--proyecto-con-layout-de-lienzo) | Una fila por nodo | Se lee y se escribe siempre completo, nunca se consulta por partes: una reorganización visual es una sola escritura **[E]** |

Abierto para el Sprint 0 **[E]**: el destino concreto del respaldo externo (DA-08) y los límites reales de concurrencia de SQLite con tres escritores lógicos, cuya mitigación propuesta —WAL y serialización por proyecto— no fue probada en este contexto.

#### §17.3.P.12 Restricciones técnicas y trade-offs aceptados

| A qué se renuncia | Qué se gana | Consecuencia asumida |
|---|---|---|
| Un motor de base de datos con escrituras concurrentes | Cero administración, archivo único, respaldo trivial | Escritor único y serialización de las escrituras en segundo plano **[E]** |
| Monitoreo por peticiones HTTP contra los servicios | Un único origen de verdad del estado, válido también para macvlan | El estado se lee del motor: estado del contenedor, verificación de salud declarada en la imagen y estadísticas **[E]** |
| Traducción de rutas entre host y contenedor | Un adaptador simple y predecible | El directorio de datos debe estar montado en la misma ruta absoluta en el host y en el devcontainer, y también en producción **[E]** |
| Fidelidad completa en la ida y vuelta con Compose | Portabilidad real del proyecto | Compose no representa el layout del lienzo ni el changeset: el layout se preserva en un manifiesto propio y el changeset no se exporta **[E]** |

Cargas que no soporta: dos instancias de la aplicación sobre el mismo archivo de base de datos, y motores de contenedores remotos accedidos por TCP.

---

### §17.4 SelfHosted-Domain

| Campo | Valor |
|---|---|
| `Nombre-Proyecto` | SelfHosted-Domain |
| `nombre-proyecto-codigo` | `SelfHosted.Domain` |
| `project_type` (D8) | library |
| Rol | Entidades, invariantes y reglas de negocio, sin dependencias externas |
| `redistribuible` | false |

#### §17.4.P.1 Stack tecnológico

C# sobre .NET 10, biblioteca de clases **sin dependencias externas** **[E]**: ni EF Core, ni el cliente del motor, ni ASP.NET Core, ni librerías de terceros. Es un requisito estructural, no una preferencia: es lo que permite que sus pruebas corran sin infraestructura.

#### §17.4.P.2 Estilo arquitectónico del proyecto

Modelo de dominio organizado por agregados, en carpetas que replican los conceptos del negocio: `Proyectos/`, `Servicios/`, `Despliegues/`, `Red/`, `Catalogo/` e `Identidad/` **[E]**.

La decisión estructural del modelo, de la que dependen casi todas las demás, es la **separación entre configuración y ejecución** **[E]**, visible en el contraste entre el anexo [E-2](#202--e-2--servicio-con-sus-tres-variantes-de-origen), que es la configuración de un servicio, y el anexo [E-3](#203--e-3--despliegue-con-su-línea-de-tiempo-de-eventos-y-sus-métricas), que es un intento concreto de materializarla: el servicio es la configuración y existe siempre mientras no se lo borre del proyecto; el despliegue es el intento concreto de materializarla y tiene el ciclo de vida. El servicio no tiene estado de encendido o apagado; el despliegue sí, con la máquina de estados del anexo [E-17](#2017--e-17--ciclo-de-vida-del-despliegue-y-correspondencia-con-el-motor), que también declara cómo se traduce cada estado del contenedor al estado del despliegue. Es el patrón de estado deseado frente a estado actual, y explica por qué detener un servicio no borra nada: elimina el contenedor conservando intactas la definición, las variables y los datos del volumen.

Dos alternativas descartadas **[D]**:

1. **Un modelo anémico**, con las reglas en la capa de aplicación: dejaría las invariantes I1 a I10 sin un lugar donde hacerse cumplir, y las pruebas de dominio sin objeto que probar.
2. **Que el nodo del lienzo represente al despliegue** en lugar de al servicio: el lienzo se reconstruiría en cada arranque y perdería la posición **[E]**.

Invariantes que el modelo debe hacer cumplir **[E]**: un proyecto contiene N servicios y un servicio pertenece a exactamente un proyecto (I1); un servicio es siempre exactamente un contenedor (I2); el servicio no tiene estado de encendido (I3); el ciclo de vida vive en el despliegue (I4); un servicio tiene como máximo un despliegue activo por réplica (I5); los datos persistentes viven en el volumen o montaje adjunto al servicio y sobreviven a la parada (I6); dos servicios **activos** de proyectos distintos no pueden ocupar la misma dirección, dos configurados sí (I7); el nombre de servicio es único dentro del proyecto y es también su nombre DNS interno (I8); los cambios de arquitectura se acumulan en un changeset y se aplican en lote (I9); un contenedor adoptado pertenece a un solo proyecto (I10).

#### §17.4.P.3 Comunicación e integración

No aplica: no expone protocolo ni consume ninguno. Su contrato hacia el resto de la solución son sus tipos públicos, y no tiene dependencias salientes. Es el nivel 0 del orden topológico de §13.

#### §17.4.P.4 Persistencia

No aplica: define las entidades, no su almacenamiento. La correspondencia con el esquema relacional del anexo [E-9](#209--e-9--esquema-relacional-de-la-base-sqlite) la resuelve `SelfHosted.Infrastructure` con configuraciones de EF Core, sin atributos de persistencia en las entidades.

Convención de nombres que atraviesa las tres representaciones **[E]**: `snake_case` en la base de datos, `camelCase` en el JSON de la API, `PascalCase` en las entidades de C#.

#### §17.4.P.5 Seguridad y autenticación

No autentica ni autoriza. Modela los conceptos de identidad que el negocio necesita: el token de API con su nombre, prefijo, ámbitos, vigencia y estado de revocación, y el conjunto cerrado de ámbitos **[E]**. La regla de que el token se muestra una única vez y de que sólo se persiste su hash es una invariante del modelo (RN-16), no una decisión de infraestructura.

#### §17.4.P.6 Estrategia de testing

**[S] S-02** en el umbral.

| Nivel | Proporción | Proyecto | Framework | Qué cubre |
|---|---|---|---|---|
| Unitarias | 100 % | `SelfHosted.Domain.Tests` | xUnit | Invariantes del modelo (I1 a I10) y reglas de negocio (RN-01 a RN-20), **sin infraestructura** **[E]**, en particular la regla de conflicto de direcciones IP |

**Cobertura mínima, gate del CI: 90 % de líneas y 85 % de ramas.** Es el umbral más alto de la solución y está justificado: no hay código de frontera, no hay entrada ni salida, y cada regla de negocio está enunciada de forma verificable en las fuentes, con su momento de validación y su respuesta ante incumplimiento.

Los treinta casos del anexo [E-22](#2022--e-22--casos-de-prueba-derivados-de-las-configuraciones-reales) son el punto de partida de esta batería: cada uno lleva su entrada concreta y su resultado esperado, y varios usan como dato de entrada las configuraciones reales del anexo [E-20](#2020--e-20--configuraciones-reales-de-contenedor-ofuscadas), de modo que las pruebas se escriben contra formas que ya se sabe que existen en un servidor real. Las veinte reglas del anexo [E-16](#2016--e-16--catálogo-de-reglas-de-negocio-rn-01-a-rn-20) se traducen cada una en al menos una prueba **[E]**: la fuente declara ese catálogo pensado exactamente para eso, con el momento de validación y la respuesta esperada de cada regla, que son el enunciado y la aserción de la prueba. Cada etapa que introduzca una regla nueva debe traer su prueba: es el criterio de cierre de etapa.

#### §17.4.P.7 Estrategia de versionado y release

Versión única de la solución, SemVer 2.0.0 y Conventional Commits, igual que §17.1.P.7. No se publica como paquete.

#### §17.4.P.8 Pipeline CI/CD

Los mismos stages de §17.1.P.8, con dos particularidades bloqueantes:

- Las pruebas de este proyecto **no pueden requerir el socket del motor de contenedores ni la base de datos**: si lo hicieran, la separación de capas estaría rota. Es un gate de arquitectura.
- La cobertura mínima que se verifica es la de su P.6: 90 % de líneas y 85 % de ramas.

#### §17.4.P.9 Compatibilidad y plataformas target

Runtime .NET 10. Sin superficie de plataforma: no depende del sistema operativo, del sistema de archivos ni de la red. Toda combinación no listada se considera no soportada.

#### §17.4.P.10 Requerimientos no funcionales (NFR)

**[S] S-03** salvo lo marcado.

| Métrica | Umbral |
|---|---|
| Dependencias externas | Cero, verificado en el pipeline |
| Tiempo de la batería completa de pruebas de dominio | ≤ 5 s, para que corra en cada guardado sin fricción |
| Validación de conflicto de direcciones sobre 30 servicios | ≤ 10 ms, sin acceso a base de datos ni al motor |
| Determinismo | Ninguna entidad lee el reloj del sistema ni genera aleatoriedad: ambos llegan como parámetro **[E]** |
| Trazabilidad de las reglas | Cada regla RN-01 a RN-20 identificable en el código por su identificador **[D]** |

#### §17.4.P.11 Decisiones técnicas pre-tomadas (pre-ADR)

| Decisión | Alternativas | Justificación |
|---|---|---|
| Separación entre servicio (configuración) y despliegue (ejecución) | Una sola entidad con estado | El nodo del lienzo debe ser permanente y posicionable; el estado es volátil **[E]** |
| Una arista del lienzo representa que el servicio origen consume, vía variable de entorno, la dirección interna y el puerto del servicio destino, con la resolución del host que declara el anexo [E-4](#204--e-4--enlace-del-lienzo-y-su-variable-generada) | Que la arista represente conectividad de red | La conectividad de red es implícita: los servicios de un proyecto comparten red y no hace falta dibujarla. Modelar mal esta abstracción es el mayor riesgo identificado del modelo **[E]** |
| El grafo de aristas define el orden topológico de arranque y permite detectar ciclos | Orden de arranque configurado a mano | Se deduce del grafo, no se configura **[E]** |
| Si cambia la dirección o el puerto del destino, todos los servicios origen de aristas entrantes quedan marcados como "requieren redespliegue" | Propagación manual | Es la única forma de que la variable generada no quede obsoleta en silencio **[E]** |
| El modelo soporta los dos modos de red por servicio, `bridge` y `macvlan` | Sólo macvlan, como sugería el enunciado original | El parque real ya usa los dos **[E]** |

Abierto para el Sprint 0 **[S]**: la confirmación del supuesto IC-05 registrado por el análisis, según el cual la frase cortada de la definición de idea se refiere a verificar que el contenedor no esté ya adoptado por otro proyecto, formalizado en I10.

#### §17.4.P.12 Restricciones técnicas y trade-offs aceptados

| A qué se renuncia | Qué se gana | Consecuencia asumida |
|---|---|---|
| Atributos y convenciones de persistencia en las entidades | Un dominio que no depende de EF Core | La correspondencia con el esquema se declara por configuración en Infrastructure, y hay que mantenerla |
| Escalado horizontal y direcciones IP fijas simultáneos | Un modelo de red fiel a lo que el motor permite | Son incompatibles: dos réplicas no pueden compartir dirección. El modelo admite una dirección por réplica, y la interfaz debe pedirlas explícitamente en lugar de fallar en el arranque **[E]** |
| Publicación de puertos en modo macvlan | Coherencia con el motor | El contenedor tiene dirección propia y la publicación no aplica: el formulario debe deshabilitar el campo, no sólo ignorarlo **[E]** |

---

## §18 Estrategia de demo / samples

Los samples de esta solución tienen un destinatario particular: no hay integradores externos, de modo que su función es sostener las demostraciones de las etapas y las puertas técnicas, que son el mecanismo de aceptación declarado. Cada uno es autocontenido, se ejecuta desde los scripts dentro del devcontainer y se reproduce en cinco pasos o menos.

| # | Sample | Proyecto que ilustra | Complejidad | Vínculo con `/src` |
|---|---|---|---|---|
| SM-01 | Prueba de concepto del lienzo: 30 nodos y 40 aristas con insignia de estado y métricas por nodo, actualizando cada 2 s | SelfHosted-Web | Media | Es la materialización de la puerta técnica **PT-01** **[E]**. Usa el componente de nodo real de `Components/Canvas/`, no una maqueta aparte, para que la medición valga |
| SM-02 | Verificación del motor de contenedores desde el devcontainer: listar, crear, arrancar, detener y eliminar un contenedor de prueba, construir una imagen desde un Dockerfile con contexto en el directorio de datos y alcanzarlo por red | SelfHosted-Infrastructure | Media | Es la materialización de la puerta técnica **PT-02** **[E]**, y ejercita el adaptador real de `Infrastructure/Contenedores/` |
| SM-03 | Juego de datos de siembra que reproduce el parque de referencia del anexo [E-19](#2019--e-19--parque-de-contenedores-de-referencia), materializado con las seis configuraciones reales ofuscadas del anexo [E-20](#2020--e-20--configuraciones-reales-de-contenedor-ofuscadas): proyectos con servicios en bridge y en macvlan, con sus direcciones, montajes, dispositivos y capacidades | SelfHosted-Web | Baja | Puebla la base del anexo [E-9](#209--e-9--esquema-relacional-de-la-base-sqlite) para poder recorrer el lienzo y el dashboard sin configurar nada a mano. Es también el fixture base que declara el anexo [E-22](#2022--e-22--casos-de-prueba-derivados-de-las-configuraciones-reales) |
| SM-04 | Consumo de los casos de uso con una implementación de prueba de `IContenedorEngine`, sin motor real | SelfHosted-Application | Baja | Demuestra que la capa de aplicación es ejercitable sin infraestructura, que es la premisa de su cobertura del 80 % |
| SM-05 | Resolución de un conflicto de direcciones IP de extremo a extremo, con sus tres resoluciones posibles | SelfHosted-Domain | Baja | Ejercita la regla más específica del alcance, transcripta en el anexo [E-8](#208--e-8--reserva-de-direcciones-ip-e-informe-de-conflicto) |
| SM-06 | Ida y vuelta con Docker Compose: importar una de las configuraciones reales del anexo [E-20](#2020--e-20--configuraciones-reales-de-contenedor-ofuscadas), representarla en el modelo y volver a exportarla con el archivo de variables vacío y el manifiesto propio del layout | SelfHosted-Infrastructure | Media | Demuestra la portabilidad del anexo [E-14](#2014--e-14--exportación-de-un-proyecto-a-docker-compose), las reglas de traducción del anexo [E-21](#2021--e-21--correspondencia-entre-una-configuración-real-y-el-modelo-de-la-solución) y la regla de que ningún secreto se exporta |
| SM-07 | Despliegue disparado por un workflow, con token de ámbito mínimo | SelfHosted-Web | Baja | Demuestra el contrato del anexo [E-13](#2013--e-13--contrato-del-endpoint-de-despliegue) y cierra la discusión de autenticación con evidencia funcionando **[E]** |

**Punto de extensión principal.** El punto de extensión de la solución es el adaptador del motor de contenedores detrás de `IContenedorEngine`: es lo que permite cambiar de cliente sin tocar el resto **[E]**. SM-02 y SM-04 lo demuestran desde los dos lados, con motor real y con implementación de prueba.

---

# Parte D — Anexos de datos

Las fuentes de este intake aportan ejemplos de instancia completos, de modo que esta parte es obligatoria. El cuerpo los cita por identificador; aquí se reproducen enteros, sin recortes, para que el orquestador no dependa de resolver una referencia a un archivo externo.

Procedencia común de los anexos E-1 a E-19: `SelfHosted.Service.Core.Documentos/PROMPTs/02-Ejecutar-Prompt-Integrador-Documento-Intake/INPUTs/Analisis-Final-Integrado.md`, con el rango de líneas indicado en cada uno. Todos son de estado **propuesto**: son modelos de diseño de ese análisis, construidos para cubrir los requisitos declarados y los patrones observados en el parque real, no mediciones de un sistema en funcionamiento. Los valores de dirección IP, nombres de imagen y rutas están ofuscados en origen según la política del análisis, conservando estructura y topología.

**Normalización adicional aplicada sobre la fuente.** En tres anexos derivados del análisis (E-7, E-11 y E-19) la ofuscación de origen había quedado incompleta: normalizaba el nombre del contenedor pero conservaba el nombre del proyecto de despliegue y la ruta de datos, que juntos identifican el servicio real. Se completó la normalización en este intake. Es una divergencia deliberada respecto de la transcripción literal, y se declara acá porque la regla de autocontención exige saber en qué difiere el anexo de su fuente.

Los anexos E-20 a E-22 tienen otra procedencia y otro estado: provienen de configuraciones de despliegue **reales y en funcionamiento** en el servidor de referencia, y su estructura es por lo tanto **verificada**. Se les aplicó la misma política de ofuscación, declarada en detalle al inicio de E-20, con un criterio más estricto en un punto: **ningún secreto real se transcribe, en ninguna forma**. Este documento es público y su contenido debe poder leerse sin que exponga al servidor del que se derivó.

## §20 Anexo A — Escenarios con ejemplos completos

### §20.1 · E-1 · Proyecto con layout de lienzo

Citado desde §17.3 P.4 y §17.4 P.2. Procedencia: `Analisis-Final-Integrado.md`, líneas 522–557. Estado: propuesto.

```json
{
  "id": 12,
  "nombre": "Portal Interno",
  "slug": "portal-interno",
  "descripcion": "Sitio web interno con su base de datos y su cache",
  "autoArranque": true,
  "estado": "parcialmente-activo",
  "creadoEn": "2026-07-26T10:15:00-03:00",
  "red": {
    "modo": "bridge",
    "nombre": "portal-interno-net",
    "subred": "172.20.0.0/24",
    "gateway": "172.20.0.1",
    "creadaPorElServicio": true
  },
  "canvas": {
    "version": 1,
    "zoom": 0.9,
    "pan": { "x": -120, "y": 40 },
    "nodos": [
      { "servicioId": 101, "x": 160, "y": 120, "ancho": 260, "alto": 132, "grupo": null },
      { "servicioId": 102, "x": 560, "y": 120, "ancho": 260, "alto": 132, "grupo": null },
      { "servicioId": 103, "x": 560, "y": 320, "ancho": 260, "alto": 132, "grupo": "datos" }
    ],
    "grupos": [
      { "id": "datos", "titulo": "Persistencia", "color": "#7E57C2" }
    ],
    "enlaces": [
      { "id": 9001, "origen": 101, "destino": 102, "puertoOrigen": "salida", "puertoDestino": "entrada" },
      { "id": 9002, "origen": 101, "destino": 103, "puertoOrigen": "salida", "puertoDestino": "entrada" }
    ]
  },
  "servicios": [101, 102, 103],
  "cambiosPendientes": 0
}
```

### §20.2 · E-2 · Servicio, con sus tres variantes de origen

Citado desde §4 (F-03), §17.4 P.2 y §17.4 P.12. Procedencia: `Analisis-Final-Integrado.md`, líneas 571–683. Estado: propuesto.

Modelo completo con origen por imagen de registro:

```json
{
  "id": 101,
  "proyectoId": 12,
  "nombre": "api",
  "descripcion": "API REST del portal",
  "origen": {
    "tipo": "imagen",
    "imagen": "registro-privado/portal-api",
    "etiqueta": "1.4.2",
    "politicaActualizacion": "fijada",
    "registro": { "url": "registry.interno.lan", "requiereCredenciales": true, "credencialId": 3 }
  },
  "red": {
    "modo": "bridge",
    "aliasDns": "api",
    "ipFija": null,
    "interfazPadre": null
  },
  "puertos": [
    { "contenedor": 8080, "host": 8080, "protocolo": "tcp", "publicar": true }
  ],
  "variables": [
    { "clave": "ASPNETCORE_ENVIRONMENT", "valor": "Production", "secreta": false, "origen": "manual" },
    { "clave": "ConnectionStrings__Default", "valor": "Host=db;Port=5432;Database=portal", "secreta": false, "origen": "enlace", "enlaceId": 9002 },
    { "clave": "REDIS_URL", "valor": "cache:6379", "secreta": false, "origen": "enlace", "enlaceId": 9001 },
    { "clave": "API_KEY_EXTERNA", "valor": null, "secreta": true, "referenciaSecreto": "sec-004", "origen": "manual" }
  ],
  "montajes": [
    { "tipo": "volumen", "nombre": "portal-api-datos", "destino": "/app/data", "soloLectura": false }
  ],
  "dispositivos": [],
  "capacidades": [],
  "recursos": {
    "limiteMemoriaMb": 512,
    "reservaMemoriaMb": 128,
    "limiteCpus": 1.0
  },
  "replicas": 1,
  "politicaReinicio": "unless-stopped",
  "autoArranque": true,
  "efimero": false,
  "healthcheck": {
    "modo": "heredado-de-la-imagen",
    "comando": null,
    "intervaloSegundos": null
  },
  "adopcion": null,
  "posicionCanvas": { "x": 160, "y": 120 },
  "estadoActual": {
    "estado": "activo",
    "despliegueId": 5471,
    "desde": "2026-07-26T09:02:11-03:00",
    "requiereRedespliegue": false
  }
}
```

Variante de origen por repositorio de GitHub:

```json
{
  "origen": {
    "tipo": "repositorio",
    "proveedor": "github",
    "url": "https://github.com/usuario/portal-api",
    "rama": "main",
    "rutaDockerfile": "src/Api/Dockerfile",
    "contextoBuild": ".",
    "argumentosBuild": { "CONFIGURATION": "Release" },
    "credencialId": 2,
    "reconstruirEnDespliegue": true
  }
}
```

Variante de origen por Dockerfile local:

```json
{
  "origen": {
    "tipo": "dockerfile",
    "rutaDockerfile": "/srv/proyectos/portal/Dockerfile",
    "contextoBuild": "/srv/proyectos/portal",
    "argumentosBuild": {},
    "reconstruirEnDespliegue": true
  }
}
```

Variante macvlan con dirección fija y dispositivo anclado, que es el caso del parque real:

```json
{
  "nombre": "print-server",
  "red": {
    "modo": "macvlan",
    "aliasDns": "print-server",
    "ipFija": "192.168.1.139",
    "interfazPadre": "enp1s0",
    "subred": "192.168.1.0/24",
    "gateway": "192.168.1.1"
  },
  "puertos": [
    { "contenedor": 3344, "host": null, "protocolo": "tcp", "publicar": false }
  ],
  "dispositivos": [
    { "host": "/dev/serial/by-id/usb-FTDI-if00-port0", "contenedor": "/dev/ttyUSB0", "permisos": "rwm" }
  ],
  "recursos": { "limiteMemoriaMb": 512 },
  "politicaReinicio": "always"
}
```

### §20.3 · E-3 · Despliegue con su línea de tiempo de eventos y sus métricas

Citado desde §17.3 P.4. Procedencia: `Analisis-Final-Integrado.md`, líneas 691–719. Estado: propuesto.

```json
{
  "id": 5471,
  "servicioId": 101,
  "numeroReplica": 1,
  "contenedorId": "3f9a1c7b2e4d",
  "nombreContenedor": "portal-interno_api_1",
  "imagenResuelta": "registro-privado/portal-api:1.4.2",
  "digestImagen": "sha256:a1b2c3...",
  "estado": "activo",
  "codigoSalida": null,
  "solicitadoPor": "ui",
  "changesetId": 331,
  "iniciadoEn": "2026-07-26T09:02:11-03:00",
  "finalizadoEn": null,
  "eventos": [
    { "en": "2026-07-26T09:01:40-03:00", "tipo": "pendiente", "detalle": "Despliegue encolado" },
    { "en": "2026-07-26T09:01:44-03:00", "tipo": "construyendo", "detalle": "build de imagen · 38 s" },
    { "en": "2026-07-26T09:02:09-03:00", "tipo": "creando", "detalle": "Contenedor creado" },
    { "en": "2026-07-26T09:02:11-03:00", "tipo": "activo", "detalle": "Healthcheck OK" }
  ],
  "metricas": {
    "cpuPorcentaje": 3.4,
    "memoriaUsadaMb": 186,
    "memoriaLimiteMb": 512,
    "tomadoEn": "2026-07-26T10:14:58-03:00"
  }
}
```

### §20.4 · E-4 · Enlace del lienzo y su variable generada

Citado desde §17.4 P.11. Procedencia: `Analisis-Final-Integrado.md`, líneas 723–750. Estado: propuesto.

```json
{
  "id": 9002,
  "proyectoId": 12,
  "origenServicioId": 101,
  "destinoServicioId": 103,
  "puertoDestino": 5432,
  "protocolo": "tcp",
  "variableGenerada": {
    "clave": "ConnectionStrings__Default",
    "plantilla": "Host={destino.host};Port={destino.puerto};Database=portal",
    "valorResuelto": "Host=db;Port=5432;Database=portal"
  },
  "estado": "aplicado",
  "creadoEn": "2026-07-20T18:22:00-03:00"
}
```

Resolución de `{destino.host}` según el modo de red del destino:

| Modo del destino | `{destino.host}` resuelve a | Requisito |
|---|---|---|
| `bridge` en la misma red del proyecto | El alias DNS del servicio (`db`) | Ambos servicios en la misma red |
| `macvlan` | La dirección fija del servicio (`192.168.1.139`) | La dirección debe estar reservada y sin conflicto |
| `bridge` con puerto publicado, consumido desde otra red | La dirección del host más el puerto publicado | Requiere puerto publicado |

Si origen y destino no comparten un canal alcanzable, el enlace se marca inválido y el proyecto no arranca (regla RN-04).

### §20.5 · E-5 · Changeset de cambios pendientes con su informe de impacto

Citado desde §4 (F-07) y §17.2 P.11. Procedencia: `Analisis-Final-Integrado.md`, líneas 758–803. Estado: propuesto.

```json
{
  "id": 331,
  "proyectoId": 12,
  "estado": "pendiente",
  "creadoEn": "2026-07-26T10:02:00-03:00",
  "mensaje": null,
  "cambios": [
    {
      "id": 1,
      "tipo": "servicio-agregado",
      "entidad": "servicio",
      "entidadId": null,
      "resumen": "Nuevo servicio 'cache' (imagen-oficial/redis:7.4)",
      "antes": null,
      "despues": { "nombre": "cache", "imagen": "imagen-oficial/redis", "etiqueta": "7.4" },
      "requiereRedespliegueDe": ["cache"]
    },
    {
      "id": 2,
      "tipo": "variable-modificada",
      "entidad": "servicio",
      "entidadId": 101,
      "resumen": "api · REDIS_URL: (sin valor) -> cache:6379",
      "antes": { "clave": "REDIS_URL", "valor": null },
      "despues": { "clave": "REDIS_URL", "valor": "cache:6379" },
      "requiereRedespliegueDe": ["api"]
    },
    {
      "id": 3,
      "tipo": "nodo-movido",
      "entidad": "canvas",
      "entidadId": 103,
      "resumen": "db movido a (560, 320)",
      "antes": { "x": 520, "y": 300 },
      "despues": { "x": 560, "y": 320 },
      "requiereRedespliegueDe": []
    }
  ],
  "impacto": {
    "serviciosARedesplegar": ["api", "cache"],
    "serviciosSinImpacto": ["db"],
    "conflictosIp": []
  }
}
```

### §20.6 · E-6 · Ítem del catálogo de servicios reutilizables

Citado desde §4 (F-14). Procedencia: `Analisis-Final-Integrado.md`, líneas 815–854. Estado: propuesto.

```json
{
  "id": "cat-postgres-16",
  "nombre": "PostgreSQL 16",
  "categoria": "base-de-datos",
  "icono": "database",
  "version": 3,
  "plantilla": {
    "origen": { "tipo": "imagen", "imagen": "imagen-oficial/postgres", "etiqueta": "16-alpine", "politicaActualizacion": "fijada" },
    "puertos": [ { "contenedor": 5432, "protocolo": "tcp", "publicar": false } ],
    "variables": [
      { "clave": "POSTGRES_DB", "valor": "{{ nombreBase }}", "secreta": false },
      { "clave": "POSTGRES_USER", "valor": "{{ usuario }}", "secreta": false },
      { "clave": "POSTGRES_PASSWORD", "valor": "{{ password }}", "secreta": true }
    ],
    "montajes": [ { "tipo": "volumen", "nombre": "{{ slug }}-datos", "destino": "/var/lib/postgresql/data" } ],
    "recursos": { "limiteMemoriaMb": 1024 },
    "politicaReinicio": "unless-stopped",
    "healthcheck": { "modo": "propio", "comando": "pg_isready -U {{ usuario }}", "intervaloSegundos": 30 }
  },
  "parametros": [
    { "clave": "nombreBase", "etiqueta": "Nombre de la base", "tipo": "texto", "requerido": true, "porDefecto": "app" },
    { "clave": "usuario", "etiqueta": "Usuario", "tipo": "texto", "requerido": true, "porDefecto": "app" },
    { "clave": "password", "etiqueta": "Contraseña", "tipo": "secreto", "requerido": true, "generar": true },
    { "clave": "slug", "etiqueta": "Prefijo de recursos", "tipo": "texto", "requerido": true }
  ],
  "exportadoEn": "2026-07-26T10:00:00-03:00"
}
```

Envoltorio del archivo de exportación del catálogo completo, con versión de formato:

```json
{
  "formato": "selfhosted-catalogo",
  "version": 1,
  "exportadoEn": "2026-07-26T10:00:00-03:00",
  "items": [ "...items de catalogo..." ]
}
```

### §20.7 · E-7 · Descubrimiento de contenedores adoptables

Citado desde §6 (flujo 2). Procedencia: `Analisis-Final-Integrado.md`, líneas 861–892. Estado: propuesto.

```json
{
  "descubiertoEn": "2026-07-26T10:20:00-03:00",
  "candidatos": [
    {
      "contenedorId": "b71c9d4a2f10",
      "nombre": "print-server",
      "imagen": "registro-privado/print-server:1.4.18",
      "estado": "running",
      "creadoEn": "2026-05-02T11:00:00-03:00",
      "redes": [ { "nombre": "infra_vlan", "modo": "macvlan", "ip": "192.168.1.139" } ],
      "montajes": [ { "tipo": "bind", "origen": "/srv/print-server/data", "destino": "/data" } ],
      "variablesDetectadas": 4,
      "etiquetasCompose": { "proyecto": "print-server", "servicio": "print-server" },
      "adoptable": true,
      "motivoNoAdoptable": null,
      "yaAdoptadoPor": null
    },
    {
      "contenedorId": "1a2b3c4d5e6f",
      "nombre": "panel-admin",
      "imagen": "imagen-oficial/panel-ce:latest",
      "estado": "running",
      "redes": [ { "nombre": "infra_vlan", "modo": "macvlan", "ip": "192.168.1.130" } ],
      "montajes": [ { "tipo": "socket", "origen": "/var/run/docker.sock", "destino": "/var/run/docker.sock" } ],
      "adoptable": false,
      "motivoNoAdoptable": "monta-el-socket-de-docker",
      "yaAdoptadoPor": null
    }
  ]
}
```

Reglas de adopción que este ejemplo materializa:

| Regla | Comportamiento |
|---|---|
| RA-01 | Un contenedor ya adoptado por otro proyecto no vuelve a ofrecerse; se muestra en gris con el proyecto que lo tomó |
| RA-02 | La adopción importa la configuración observada (imagen, red, dirección, montajes, variables no secretas) y crea el servicio sin recrear el contenedor |
| RA-03 | El contenedor adoptado queda vinculado por su identificador; si desaparece del motor, el servicio queda huérfano y se ofrece redesplegarlo desde la configuración importada |
| RA-04 | Un contenedor que monta el socket de Docker se marca no adoptable por defecto, porque gobernarlo desde el administrador crearía una dependencia circular de control. Puede forzarse con confirmación explícita |
| RA-05 | Las variables marcadas como sensibles por heurística (claves cuyo nombre contiene `PASSWORD`, `TOKEN`, `SECRET`, `KEY`, `PAT`) se importan enmascaradas y requieren recarga manual |

### §20.8 · E-8 · Reserva de direcciones IP e informe de conflicto

Citado desde §6 (flujo 3), §16.1, §17.1 P.3 y §18 (SM-05). Procedencia: `Analisis-Final-Integrado.md`, líneas 906–946 y 1974–1995. Estado: propuesto.

Rango gestionado y reservas:

```json
{
  "rangoGestionado": {
    "subred": "192.168.1.128/26",
    "desde": "192.168.1.129",
    "hasta": "192.168.1.190",
    "gateway": "192.168.1.1",
    "interfazPadre": "enp1s0",
    "excluidas": ["192.168.1.129"],
    "nota": "Debe estar excluido del rango que reparte el servidor DHCP de la red"
  },
  "reservas": [
    { "direccion": "192.168.1.130", "servicioId": 201, "proyectoId": 5, "servicio": "panel-admin", "activa": true },
    { "direccion": "192.168.1.139", "servicioId": 305, "proyectoId": 7, "servicio": "print-server", "activa": true },
    { "direccion": "192.168.1.139", "servicioId": 412, "proyectoId": 9, "servicio": "print-server-pruebas", "activa": false }
  ]
}
```

Informe de conflicto que devuelve el intento de arrancar el proyecto 9:

```json
{
  "proyectoId": 9,
  "puedeArrancar": false,
  "verificadoEn": "2026-07-26T10:31:00-03:00",
  "conflictos": [
    {
      "direccion": "192.168.1.139",
      "servicioSolicitante": { "id": 412, "nombre": "print-server-pruebas", "proyectoId": 9 },
      "ocupadaPor": { "id": 305, "nombre": "print-server", "proyectoId": 7, "proyecto": "Impresion 3D", "despliegueId": 5310, "estado": "activo" },
      "resolucionesPosibles": [
        { "accion": "detener-proyecto-en-conflicto", "objetivoId": 7, "etiqueta": "Detener el proyecto 'Impresion 3D'" },
        { "accion": "reasignar-ip", "sugerencia": "192.168.1.141", "etiqueta": "Asignar la siguiente IP libre del rango" },
        { "accion": "arrancar-parcial", "excluye": [412], "etiqueta": "Arrancar los demas servicios del proyecto" }
      ]
    }
  ],
  "serviciosSinConflicto": [410, 411]
}
```

Algoritmo de validación que produce ese informe:

```text
funcion validarArranque(proyectoId):
    conflictos = []
    servicios = serviciosConIpFija(proyectoId)

    para cada s en servicios:
        ocupante = buscarServicioActivoConIp(s.ip)     # indice sobre reservas_ip y despliegues activos
        si ocupante existe y ocupante.proyectoId != proyectoId:
            conflictos.agregar({ ip: s.ip, solicitante: s, ocupante: ocupante })

    # Colision dentro del propio proyecto: siempre invalida
    para cada par (a, b) en servicios con a.ip == b.ip:
        conflictos.agregar({ ip: a.ip, tipo: "duplicado-interno", servicios: [a, b] })

    # La IP debe pertenecer al rango gestionado y no estar excluida
    para cada s en servicios:
        si no perteneceAlRangoGestionado(s.ip) o estaExcluida(s.ip):
            conflictos.agregar({ ip: s.ip, tipo: "fuera-de-rango", servicio: s })

    si conflictos esta vacio: devolver PERMITIDO
    devolver BLOQUEADO con conflictos y resoluciones posibles
```

Respuesta de error de la API cuando el arranque se bloquea, en formato `ProblemDetails`. Procedencia: líneas 1666–1682.

```json
{
  "type": "https://selfhosted.local/errores/conflicto-ip",
  "title": "Conflicto de direcciones IP",
  "status": 409,
  "detail": "El servicio 'print-server-pruebas' solicita 192.168.1.139, ocupada por un servicio activo de otro proyecto.",
  "instance": "/api/v1/proyectos/9/arrancar",
  "conflictos": [
    {
      "direccion": "192.168.1.139",
      "servicioSolicitante": "print-server-pruebas",
      "proyectoEnConflicto": "Impresion 3D",
      "servicioEnConflicto": "print-server"
    }
  ]
}
```

### §20.9 · E-9 · Esquema relacional de la base SQLite

Citado desde §16.1, §17.3 P.4, §17.4 P.4 y §18 (SM-03). Procedencia: `Analisis-Final-Integrado.md`, líneas 954–1096. Estado: propuesto.

```sql
CREATE TABLE proyectos (
    id                INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre            TEXT    NOT NULL,
    slug              TEXT    NOT NULL UNIQUE,
    descripcion       TEXT,
    auto_arranque     INTEGER NOT NULL DEFAULT 0,   -- 0/1
    red_json          TEXT    NOT NULL DEFAULT '{}',
    canvas_json       TEXT    NOT NULL DEFAULT '{}',
    creado_en         TEXT    NOT NULL,
    modificado_en     TEXT    NOT NULL
);

-- Se crea antes que `servicios` porque `variables` referencia a ambas.
-- Las claves foraneas hacia `servicios` las agrega EF Core en la migracion
-- (SQLite las valida en tiempo de ejecucion, no de definicion).
CREATE TABLE enlaces (
    id                  INTEGER PRIMARY KEY AUTOINCREMENT,
    proyecto_id         INTEGER NOT NULL REFERENCES proyectos(id) ON DELETE CASCADE,
    origen_servicio_id  INTEGER NOT NULL,
    destino_servicio_id INTEGER NOT NULL,
    puerto_destino      INTEGER NOT NULL,
    protocolo           TEXT    NOT NULL DEFAULT 'tcp',
    plantilla_variable  TEXT    NOT NULL,
    clave_variable      TEXT    NOT NULL,
    estado              TEXT    NOT NULL DEFAULT 'pendiente',
    creado_en           TEXT    NOT NULL,
    CHECK (origen_servicio_id <> destino_servicio_id)
);

CREATE TABLE servicios (
    id                INTEGER PRIMARY KEY AUTOINCREMENT,
    proyecto_id       INTEGER NOT NULL REFERENCES proyectos(id) ON DELETE CASCADE,
    nombre            TEXT    NOT NULL,
    descripcion       TEXT,
    origen_json       TEXT    NOT NULL,             -- imagen | repositorio | dockerfile
    red_json          TEXT    NOT NULL,             -- modo, alias, ip fija, interfaz padre
    puertos_json      TEXT    NOT NULL DEFAULT '[]',
    montajes_json     TEXT    NOT NULL DEFAULT '[]',
    dispositivos_json TEXT    NOT NULL DEFAULT '[]',
    recursos_json     TEXT    NOT NULL DEFAULT '{}',
    healthcheck_json  TEXT    NOT NULL DEFAULT '{}',
    replicas          INTEGER NOT NULL DEFAULT 1,
    politica_reinicio TEXT    NOT NULL DEFAULT 'unless-stopped',
    auto_arranque     INTEGER NOT NULL DEFAULT 1,
    efimero           INTEGER NOT NULL DEFAULT 0,
    adopcion_json     TEXT,                          -- NULL si no fue adoptado
    pos_x             REAL    NOT NULL DEFAULT 0,
    pos_y             REAL    NOT NULL DEFAULT 0,
    creado_en         TEXT    NOT NULL,
    modificado_en     TEXT    NOT NULL,
    UNIQUE (proyecto_id, nombre)
);

CREATE TABLE variables (
    id                 INTEGER PRIMARY KEY AUTOINCREMENT,
    servicio_id        INTEGER NOT NULL REFERENCES servicios(id) ON DELETE CASCADE,
    clave              TEXT    NOT NULL,
    valor              TEXT,                         -- NULL si es secreta
    secreta            INTEGER NOT NULL DEFAULT 0,
    referencia_secreto TEXT,
    origen             TEXT    NOT NULL DEFAULT 'manual', -- manual | enlace | catalogo | adopcion
    enlace_id          INTEGER REFERENCES enlaces(id) ON DELETE SET NULL,
    UNIQUE (servicio_id, clave)
);

CREATE TABLE changesets (
    id                INTEGER PRIMARY KEY AUTOINCREMENT,
    proyecto_id       INTEGER NOT NULL REFERENCES proyectos(id) ON DELETE CASCADE,
    estado            TEXT    NOT NULL DEFAULT 'pendiente', -- pendiente | aplicado | descartado
    mensaje           TEXT,
    cambios_json      TEXT    NOT NULL DEFAULT '[]',
    creado_en         TEXT    NOT NULL,
    aplicado_en       TEXT
);

CREATE TABLE despliegues (
    id                INTEGER PRIMARY KEY AUTOINCREMENT,
    servicio_id       INTEGER NOT NULL REFERENCES servicios(id) ON DELETE CASCADE,
    numero_replica    INTEGER NOT NULL DEFAULT 1,
    contenedor_id     TEXT,
    nombre_contenedor TEXT,
    imagen_resuelta   TEXT,
    digest_imagen     TEXT,
    estado            TEXT    NOT NULL,
    codigo_salida     INTEGER,
    solicitado_por    TEXT    NOT NULL DEFAULT 'ui', -- ui | api | autoarranque | politica
    changeset_id      INTEGER REFERENCES changesets(id) ON DELETE SET NULL,
    iniciado_en       TEXT    NOT NULL,
    finalizado_en     TEXT
);

CREATE TABLE reservas_ip (
    id                INTEGER PRIMARY KEY AUTOINCREMENT,
    servicio_id       INTEGER NOT NULL REFERENCES servicios(id) ON DELETE CASCADE,
    numero_replica    INTEGER NOT NULL DEFAULT 1,
    direccion         TEXT    NOT NULL,
    interfaz_padre    TEXT    NOT NULL,
    UNIQUE (servicio_id, numero_replica)
);

CREATE TABLE catalogo_items (
    id                TEXT    PRIMARY KEY,
    nombre            TEXT    NOT NULL,
    categoria         TEXT    NOT NULL,
    icono             TEXT,
    version           INTEGER NOT NULL DEFAULT 1,
    plantilla_json    TEXT    NOT NULL,
    parametros_json   TEXT    NOT NULL DEFAULT '[]',
    modificado_en     TEXT    NOT NULL
);

CREATE TABLE tokens_api (
    id                INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre            TEXT    NOT NULL,
    hash_token        TEXT    NOT NULL UNIQUE,
    prefijo           TEXT    NOT NULL,
    ambitos           TEXT    NOT NULL DEFAULT '',   -- lista separada por espacios
    creado_en         TEXT    NOT NULL,
    expira_en         TEXT,
    ultimo_uso_en     TEXT,
    revocado_en       TEXT
);

CREATE TABLE eventos_auditoria (
    id                INTEGER PRIMARY KEY AUTOINCREMENT,
    en                TEXT    NOT NULL,
    actor             TEXT    NOT NULL,              -- admin | token:<prefijo>
    accion            TEXT    NOT NULL,
    entidad           TEXT,
    entidad_id        TEXT,
    detalle_json      TEXT,
    resultado         TEXT    NOT NULL               -- ok | error | rechazado
);

-- Indices de consulta habitual
CREATE INDEX ix_servicios_proyecto      ON servicios(proyecto_id);
CREATE INDEX ix_despliegues_servicio    ON despliegues(servicio_id, estado);
CREATE INDEX ix_despliegues_contenedor  ON despliegues(contenedor_id);
CREATE INDEX ix_enlaces_proyecto        ON enlaces(proyecto_id);
CREATE INDEX ix_reservas_direccion      ON reservas_ip(direccion);
CREATE INDEX ix_auditoria_en            ON eventos_auditoria(en DESC);
```

### §20.10 · E-10 · Alta de proyecto con API y base de datos, de extremo a extremo

Citado desde §6 (flujo 1). Procedencia: `Analisis-Final-Integrado.md`, líneas 1839–1891. Estado: propuesto.

Pasos en la interfaz:

1. `Nuevo proyecto` → nombre "Portal Interno" → se elige modo de red **bridge**, y el sistema propone la subred `172.20.0.0/24`. Se aterriza en el lienzo vacío.
2. `+ Nuevo servicio` → **Desde catálogo** → *PostgreSQL 16* → se completan los parámetros (`nombreBase=portal`, `usuario=portal`, contraseña generada). El nodo `db` aparece en violeta, pendiente.
3. `+ Nuevo servicio` → **Imagen de registro** → `registro-privado/portal-api:1.4.2` → nodo `api`, también pendiente.
4. Se arrastra una arista de `api` a `db`. El sistema propone la variable:

```json
{
  "clave": "ConnectionStrings__Default",
  "plantilla": "Host={destino.host};Port={destino.puerto};Database=portal;Username=portal;Password={secreto:db.password}",
  "valorResuelto": "Host=db;Port=5432;Database=portal;Username=portal;Password=***"
}
```

5. En `api` → pestaña **Red** → se publica el puerto `8080` en el host.
6. `Aplicar cambios` con el mensaje "Alta inicial del portal". El sistema crea la red, despliega `db`, espera su verificación de salud y luego despliega `api`, respetando el orden topológico del grafo.

Qué hay que entender del ejemplo: `db` no publica ningún puerto en el host, porque `api` la alcanza por nombre dentro de la red del proyecto, y publicar el puerto de la base sería un error de seguridad que la interfaz debe desalentar; el orden de arranque no se configura a mano, se deduce del grafo de aristas; la contraseña de la base vive como secreto referenciado, nunca en texto plano en la exportación ni en la interfaz; y el volumen sobrevive a detener y redesplegar `db`, y sólo se borra al eliminar el servicio con confirmación explícita.

### §20.11 · E-11 · Adopción de un contenedor existente

Citado desde §6 (flujo 2). Procedencia: `Analisis-Final-Integrado.md`, líneas 1892–1944. Estado: propuesto.

Servicio resultante de la importación, vinculado al contenedor existente sin recrearlo:

```json
{
  "id": 305,
  "proyectoId": 7,
  "nombre": "print-server",
  "origen": { "tipo": "imagen", "imagen": "registro-privado/print-server", "etiqueta": "1.4.18", "politicaActualizacion": "fijada" },
  "red": { "modo": "macvlan", "ipFija": "192.168.1.139", "interfazPadre": "enp1s0" },
  "montajes": [ { "tipo": "bind", "origen": "/srv/print-server/data", "destino": "/data", "soloLectura": false } ],
  "dispositivos": [ { "host": "/dev/serial/by-id/usb-FTDI-if00-port0", "contenedor": "/dev/ttyUSB0", "permisos": "rwm" } ],
  "recursos": { "limiteMemoriaMb": 512 },
  "politicaReinicio": "always",
  "adopcion": {
    "adoptadoEn": "2026-07-26T10:25:00-03:00",
    "contenedorId": "b71c9d4a2f10",
    "recreado": false,
    "variablesEnmascaradas": ["ADMIN_TOKEN"]
  },
  "estadoActual": { "estado": "activo", "despliegueId": 5310, "requiereRedespliegue": false }
}
```

Punto crítico de la adopción: el contenedor no se recrea. El servicio queda vinculado al contenedor existente por su identificador, y el primer redespliegue —cuando el administrador lo pida— es el momento en que la configuración importada se materializa de nuevo. Ese primer redespliegue sí implica corte, y la interfaz debe advertirlo con esas palabras.

### §20.12 · E-12 · Carga útil de un token de API emitido

Citado desde §17.1 P.5. Procedencia: `Analisis-Final-Integrado.md`, líneas 1550–1561. Estado: propuesto.

```json
{
  "iss": "selfhosted-service-core",
  "aud": "selfhosted-api",
  "sub": "admin",
  "jti": "tk_7f3c9a12",
  "scope": "proyectos:leer despliegues:ejecutar",
  "nombre": "github-actions-portal",
  "iat": 1785000000,
  "exp": 1792776000
}
```

### §20.13 · E-13 · Contrato del endpoint de despliegue

Citado desde §17.1 P.3 y §18 (SM-07). Procedencia: `Analisis-Final-Integrado.md`, líneas 1638–1661 y 2165–2174. Estado: propuesto.

Petición que emite el workflow de integración continua:

```http
POST /api/v1/servicios/101/desplegar HTTP/1.1
Host: admin.interno.lan
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "etiquetaImagen": "1.4.3",
  "esperarActivo": true,
  "tiempoLimiteSegundos": 180,
  "mensaje": "Despliegue automatico desde workflow build-and-deploy 482"
}
```

Respuesta aceptada:

```json
{
  "operacionId": "op-9f21c",
  "servicioId": 101,
  "despliegueId": 5480,
  "estado": "creando",
  "iniciadoEn": "2026-07-26T11:02:00-03:00",
  "seguimiento": "/api/v1/operaciones/op-9f21c"
}
```

Comportamiento esperado del endpoint según la situación:

| Situación | Respuesta |
|---|---|
| Despliegue aceptado | `202 Accepted` con `operacionId` y ruta de seguimiento |
| `esperarActivo=true` y el servicio queda activo | `200 OK` con el despliegue final |
| Tiempo límite superado | `504` con el último estado conocido y las últimas líneas del registro |
| Imagen inexistente en el registro | `422` con detalle del error de descarga |
| Token sin el ámbito requerido | `403` indicando el ámbito faltante |
| Conflicto de dirección IP al recrear | `409` con el informe de conflicto de E-8 |

Workflow que lo consume, del cuarto alcance. Procedencia: líneas 2126–2156.

```yaml
# .github/workflows/deploy.yml
name: build-and-deploy
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: self-hosted          # el runner del propio servidor, ya presente en el parque
    steps:
      - uses: actions/checkout@v4

      - name: Construir y publicar la imagen
        run: |
          docker build -t "$REGISTRO/portal-api:${GITHUB_SHA::7}" .
          docker push "$REGISTRO/portal-api:${GITHUB_SHA::7}"
        env:
          REGISTRO: ${{ vars.REGISTRO_PRIVADO }}

      - name: Solicitar el despliegue
        run: |
          curl --fail --silent --show-error \
            -X POST "$ADMIN_URL/api/v1/servicios/101/desplegar" \
            -H "Authorization: Bearer $ADMIN_TOKEN" \
            -H "Content-Type: application/json" \
            -d "{\"etiquetaImagen\":\"${GITHUB_SHA::7}\",\"esperarActivo\":true,\"tiempoLimiteSegundos\":180}"
        env:
          ADMIN_URL:   ${{ vars.ADMIN_URL }}
          ADMIN_TOKEN: ${{ secrets.ADMIN_API_TOKEN }}
```

### §20.14 · E-14 · Exportación de un proyecto a Docker Compose

Citado desde §4 (F-13), §17.3 P.3 y §18 (SM-06). Procedencia: `Analisis-Final-Integrado.md`, líneas 2009–2113. Estado: propuesto.

Archivo Compose que produce `GET /api/v1/proyectos/12/exportar/compose`:

```yaml
name: portal-interno

services:
  api:
    image: registro-privado/portal-api:1.4.2
    container_name: portal-interno_api_1
    restart: unless-stopped
    environment:
      ASPNETCORE_ENVIRONMENT: Production
      ConnectionStrings__Default: Host=db;Port=5432;Database=portal;Username=portal;Password=${DB_PASSWORD}
      REDIS_URL: cache:6379
    ports:
      - "8080:8080"
    volumes:
      - portal-api-datos:/app/data
    depends_on:
      db:
        condition: service_healthy
    networks: [portal-interno-net]
    deploy:
      resources:
        limits: { memory: 512M, cpus: "1.0" }

  db:
    image: imagen-oficial/postgres:16-alpine
    container_name: portal-interno_db_1
    restart: unless-stopped
    environment:
      POSTGRES_DB: portal
      POSTGRES_USER: portal
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    volumes:
      - portal-interno-db-datos:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U portal"]
      interval: 30s
    networks: [portal-interno-net]
    deploy:
      resources:
        limits: { memory: 1024M }

  cache:
    image: imagen-oficial/redis:7.4
    container_name: portal-interno_cache_1
    restart: unless-stopped
    networks: [portal-interno-net]
    deploy:
      resources:
        limits: { memory: 256M }

volumes:
  portal-api-datos:
  portal-interno-db-datos:

networks:
  portal-interno-net:
    driver: bridge
    ipam:
      config:
        - subnet: 172.20.0.0/24
          gateway: 172.20.0.1
```

Archivo de variables que lo acompaña, con los secretos vacíos:

```bash
# portal-interno.env — completar antes de levantar
DB_PASSWORD=
```

Manifiesto propio que preserva lo que Compose no representa, el layout del lienzo:

```json
{
  "formato": "selfhosted-proyecto",
  "version": 1,
  "proyecto": { "nombre": "Portal Interno", "slug": "portal-interno", "autoArranque": true },
  "canvas": { "zoom": 0.9, "pan": { "x": -120, "y": 40 }, "nodos": [ { "servicio": "api", "x": 160, "y": 120 } ] },
  "enlaces": [ { "origen": "api", "destino": "db", "puerto": 5432, "clave": "ConnectionStrings__Default" } ],
  "secretosRequeridos": ["DB_PASSWORD"]
}
```

Correspondencia entre el modelo propio y Compose, con su pérdida declarada:

| Concepto propio | Equivalente en Compose | Pérdida |
|---|---|---|
| Proyecto | `name` del archivo | Ninguna |
| Servicio | Entrada de `services` | Ninguna |
| Enlace por variable | Variable de entorno más `depends_on` | Se pierde la intención del enlace: se recupera del manifiesto propio |
| Reserva de dirección macvlan | `networks.<red>.ipv4_address` | Ninguna |
| Layout del lienzo | No existe | Se preserva en el manifiesto propio |
| Changeset | No existe | Se exporta el estado aplicado, no el borrador |
| Secreto | Referencia `${VAR}` | El valor nunca se exporta: es deliberado |

Regla de la importación inversa: al importar un Compose sin manifiesto propio, los nodos se disponen automáticamente por capas según el grafo de `depends_on`, para que el lienzo resultante sea legible desde el primer momento.

### §20.15 · E-15 · Superficie de la API REST

Citado desde §17.1 P.3. Procedencia: `Analisis-Final-Integrado.md`, líneas 1611–1634. Estado: propuesto. Es la superficie mínima que sostiene los cuatro alcances. Todos los endpoints van bajo `/api/v1`, todos autenticados y todos con ámbito declarado.

| Método y ruta | Ámbito | Descripción |
|---|---|---|
| `GET /api/v1/proyectos` | `proyectos:leer` | Lista de proyectos con estado agregado |
| `POST /api/v1/proyectos` | `proyectos:escribir` | Alta de proyecto |
| `GET /api/v1/proyectos/{id}` | `proyectos:leer` | Proyecto con servicios, enlaces y layout |
| `PUT /api/v1/proyectos/{id}/canvas` | `proyectos:escribir` | Guardado del layout del lienzo |
| `POST /api/v1/proyectos/{id}/servicios` | `proyectos:escribir` | Alta de servicio |
| `PUT /api/v1/servicios/{id}` | `proyectos:escribir` | Edición de servicio; entra al changeset |
| `POST /api/v1/proyectos/{id}/changeset/aplicar` | `despliegues:ejecutar` | Aplica los cambios pendientes y redespliega lo afectado |
| `POST /api/v1/proyectos/{id}/arrancar` | `despliegues:ejecutar` | Arranca el proyecto completo; valida conflictos de IP |
| `POST /api/v1/proyectos/{id}/detener` | `despliegues:ejecutar` | Detiene el proyecto completo |
| `POST /api/v1/servicios/{id}/desplegar` | `despliegues:ejecutar` | Despliega o redespliega un servicio |
| `POST /api/v1/servicios/{id}/detener` | `despliegues:ejecutar` | Detiene el servicio, conservando su configuración |
| `POST /api/v1/servicios/{id}/reiniciar` | `despliegues:ejecutar` | Reinicia el contenedor sin reconstruir |
| `PUT /api/v1/servicios/{id}/replicas` | `despliegues:ejecutar` | Escalado horizontal manual |
| `PUT /api/v1/servicios/{id}/recursos` | `proyectos:escribir` | Escalado vertical manual: límites de CPU y memoria |
| `GET /api/v1/servicios/{id}/logs` | `proyectos:leer` | Registro del contenedor, con opción de flujo continuo |
| `GET /api/v1/descubrimiento/contenedores` | `proyectos:leer` | Candidatos a adopción |
| `POST /api/v1/proyectos/{id}/adoptar` | `proyectos:escribir` | Adopta contenedores existentes |
| `GET /api/v1/proyectos/{id}/exportar/compose` | `proyectos:leer` | Exporta la arquitectura como Docker Compose |
| `POST /api/v1/proyectos/importar/compose` | `proyectos:escribir` | Importa un Compose como proyecto nuevo |
| `GET /api/v1/catalogo` · `POST /api/v1/catalogo` | `catalogo:leer` / `catalogo:escribir` | Catálogo de servicios reutilizables |
| `GET /api/v1/sistema/estado` | `sistema:leer` | CPU, memoria, swap y disco del host |
| `GET /api/v1/red/conflictos` | `sistema:leer` | Estado de reservas y conflictos de IP |

### §20.16 · E-16 · Catálogo de reglas de negocio RN-01 a RN-20

Citado desde §14, §17.1 P.3, §17.4 P.5, §17.4 P.6 y §17.4 P.10. Procedencia: `Analisis-Final-Integrado.md`, líneas 2183–2210. Estado: propuesto. La fuente lo declara pensado para que **cada regla se traduzca en una prueba automatizada**: es el insumo directo de la categoría `08-Calidad-Y-Pruebas` y de la batería de `SelfHosted.Domain.Tests`.

| # | Regla | Momento de validación | Respuesta ante incumplimiento |
|---|---|---|---|
| RN-01 | El nombre de servicio es único dentro del proyecto, en minúsculas, con guiones, de 1 a 32 caracteres | Alta y edición | `422` con el campo señalado |
| RN-02 | Un servicio pertenece a un único proyecto | Alta y adopción | `409` |
| RN-03 | Dos servicios **activos** de proyectos distintos no pueden compartir dirección IP | Arranque de proyecto o servicio | `409` con informe y resoluciones |
| RN-04 | Todo enlace debe tener un canal alcanzable entre origen y destino según sus modos de red | Aplicación del changeset | Enlace marcado inválido; bloquea el arranque |
| RN-05 | El grafo de enlaces no puede tener ciclos | Creación de enlace | `422` señalando el ciclo |
| RN-06 | Toda dirección IP fija debe pertenecer al rango gestionado y no estar excluida | Alta y edición | `422` con la siguiente dirección libre sugerida |
| RN-07 | Un servicio en macvlan no puede publicar puertos en el host | Alta y edición | Campo deshabilitado en la interfaz; `422` desde la API |
| RN-08 | El servicio con origen "repositorio" requiere ruta de Dockerfile y rama | Alta | `422` |
| RN-09 | Al detener un servicio, sus volúmenes y montajes **no** se tocan | Detención | Invariante, verificable por prueba |
| RN-10 | Al eliminar un servicio se pide confirmación escribiendo su nombre, y se ofrece conservar los volúmenes | Eliminación | Interacción obligatoria |
| RN-11 | Un contenedor adoptado no puede adoptarse dos veces | Descubrimiento y adopción | Aparece deshabilitado con el proyecto que lo tomó |
| RN-12 | Los cambios visuales no entran al changeset ni disparan redespliegue | Edición del lienzo | Invariante |
| RN-13 | Aplicar el changeset redespliega **sólo** los servicios afectados | Aplicación | El informe de impacto lo declara antes de ejecutar |
| RN-14 | El arranque del proyecto respeta el orden topológico del grafo | Arranque | Invariante |
| RN-15 | Un secreto nunca se devuelve en texto plano por la API ni se escribe en una exportación | Toda respuesta y exportación | Enmascarado con `***` |
| RN-16 | El token de API se muestra una única vez y sólo se persiste su hash | Creación de token | Invariante |
| RN-17 | Toda operación de escritura queda registrada en auditoría con su actor | Cada operación | Invariante |
| RN-18 | El escalado horizontal crea réplicas con nombres sufijados y sin dirección IP fija duplicada | Cambio de réplicas | `422` si el servicio tiene una sola dirección fija y se piden más réplicas |
| RN-19 | El escalado vertical no puede exceder los recursos declarados del host | Cambio de límites | `422` con el máximo admisible |
| RN-20 | Un proyecto con al menos un conflicto puede arrancar parcialmente, quedando "parcialmente activo" | Arranque | Estado explícito, no error silencioso |

Detalle de RN-18: el escalado horizontal y la dirección fija de macvlan son **incompatibles** entre sí, porque dos réplicas no pueden compartir dirección. Un servicio en macvlan que quiera escalar necesita una dirección por réplica; el modelo lo admite con la clave única `(servicio_id, numero_replica)` de `reservas_ip`, pero la interfaz debe pedirlas explícitamente en lugar de fallar en el arranque.

### §20.17 · E-17 · Ciclo de vida del despliegue y correspondencia con el motor

Citado desde §17.4 P.2 y §17.3 P.10. Procedencia: `Analisis-Final-Integrado.md`, líneas 373–405. Estado: propuesto. Es la máquina de estados que el sincronizador debe reproducir y la tabla de traducción que consulta en cada reconciliación.

```mermaid
stateDiagram-v2
    [*] --> Pendiente : despliegue solicitado
    Pendiente --> Construyendo : requiere build de imagen
    Pendiente --> Creando : imagen ya disponible
    Construyendo --> Creando : build exitoso
    Construyendo --> Fallido : error de build
    Creando --> Activo : contenedor iniciado o healthcheck OK
    Creando --> Fallido : error al crear o arrancar
    Activo --> Caido : el proceso muere con codigo distinto de cero
    Activo --> Finalizado : el proceso termina con codigo cero
    Caido --> Activo : reinicio manual o politica de reinicio
    Activo --> Retirado : detener servicio o reemplazo por nuevo despliegue
    Finalizado --> Retirado : limpieza
    Fallido --> [*]
    Retirado --> [*]
```

Correspondencia con el estado real del motor de contenedores, que es lo que el servicio consulta para sincronizar:

| Estado del contenedor | Estado del despliegue | Nota |
|---|---|---|
| `created` | `Pendiente` | Creado, aún sin arrancar |
| `running` sin healthcheck | `Activo` | |
| `running` con healthcheck `starting` | `Creando` | Todavía no confirmado |
| `running` con healthcheck `healthy` | `Activo` | |
| `running` con healthcheck `unhealthy` | `Activo (degradado)` | Estado visible en el nodo; no es caída |
| `restarting` | `Caido` | La política de reinicio está actuando |
| `exited` con código 0 | `Finalizado` | Típico de tareas puntuales |
| `exited` con código distinto de 0 | `Caido` | |
| `paused` | `Activo (pausado)` | |
| `dead` o eliminado | `Retirado` | |

### §20.18 · E-18 · Maquetado de la interfaz web

Citado desde §6 (flujo 1), §15 (etapa `b`) y §16 (`SDD/Maquetas/SelfHosted-Web/`). Procedencia: `Analisis-Final-Integrado.md`, líneas 1688–1833. Estado: propuesto. Es el insumo de la categoría `03-UX-UI-DX` de SelfHosted-Web y de la maqueta de validación visual contra la que se valida la etapa `b`.

**Mapa de navegación.** Las rutas que la etapa `b` debe dejar navegables:

```mermaid
graph TD
    L["/login<br/>o alta inicial del administrador"] --> P["/proyectos<br/>listado"]
    P --> C["/proyectos/id<br/>LIENZO · vista por defecto"]
    C --> SP["Panel lateral del servicio<br/>configuracion, variables, red, recursos"]
    C --> CH["Cajon de cambios pendientes"]
    C --> LG["/proyectos/id/servicios/sid/logs"]
    P --> D["/dashboard<br/>alcance 2"]
    P --> CAT["/catalogo<br/>alcance 3"]
    P --> DESC["/descubrimiento<br/>adopcion de contenedores"]
    P --> CFG["/configuracion<br/>rango de IP, tokens de API, respaldos"]
```

**Pantalla del lienzo**, que es la vista por defecto de un proyecto:

```text
┌──────────────────────────────────────────────────────────────────────────────────┐
│  ☰  SelfHosted · Portal Interno            [▶ Arrancar] [■ Detener]   admin ▾    │
├───────┬──────────────────────────────────────────────────────┬───────────────────┤
│       │  ⚠ 3 cambios pendientes    [Ver detalle]  [Aplicar]  │  Actividad        │
│  ▣    │ ─────────────────────────────────────────────────────│ ───────────────── │
│ Lienzo│                                                      │ ✓ api desplegado  │
│       │      ┌──────────────┐          ┌──────────────┐      │   hace 2 min      │
│  ▤    │      │ ● api        │─────────▶│ ● db         │      │ ✓ cache agregado  │
│ Logs  │      │ portal-api   │          │ postgres:16  │      │   hace 5 min      │
│       │      │ ▮▮▮▯ 186 MB  │          │ ▮▮▯▯ 410 MB  │      │ ⚠ conflicto IP    │
│  ▦    │      └──────┬───────┘          └──────────────┘      │   resuelto        │
│ Métr. │             │                                        │                   │
│       │             ▼                                        │ ───────────────── │
│  ⚙    │      ┌──────────────┐                                │ Proyecto          │
│ Ajus. │      │ ○ cache      │  ← nodo pendiente (violeta)    │ 3 servicios       │
│       │      │ redis:7.4    │                                │ 2 activos         │
│       │      └──────────────┘                                │ red: bridge       │
│       │                                                      │ autoarranque: si  │
│       │   [+ Nuevo servicio]   [⤢ Ajustar]  [🗗 Minimapa]     │                   │
└───────┴──────────────────────────────────────────────────────┴───────────────────┘
```

Decisiones de esta pantalla: el lienzo es la vista por defecto del proyecto, porque la arquitectura *es* el proyecto; el banner de cambios pendientes va fijo arriba, con contador, detalle y aplicar, para hacer visible el estado transaccional del borrador; el panel derecho es contextual, con actividad cuando no hay selección y configuración del servicio cuando hay un nodo seleccionado; arrancar y detener el proyecto completo están siempre visibles en la barra superior, por ser las dos operaciones más frecuentes; y hay un único botón primario por pantalla, "Nuevo servicio".

**Anatomía del nodo de servicio:**

```text
        ┌────────────────────────────────────┐
   ○────┤ 🐳  api                    ● Activo├────○      ○ = puerto de enlace
(entrada)│    registro/portal-api:1.4.2      │ (salida)
        │    ▮▮▮▯▯ CPU 3.4%   186 / 512 MB  │
        │    192.168.1.130 · macvlan         │
        │    ⟳ unless-stopped   ×2 replicas  │
        └────────────────────────────────────┘
              ▲ borde por estado · violeta si esta pendiente de aplicar
```

| Zona | Contenido | Origen del dato |
|---|---|---|
| Cabecera | Icono por categoría, nombre, insignia de estado | `servicio.nombre`, `estadoActual.estado` |
| Subtítulo | Imagen resuelta con etiqueta | `origen.imagen` y `origen.etiqueta` |
| Métricas | Barra de CPU y memoria usada sobre el límite | `despliegue.metricas` |
| Red | Dirección y modo, o alias DNS si es bridge | `red` |
| Pie | Política de reinicio y número de réplicas | `politicaReinicio`, `replicas` |
| Puertos laterales | Anclas de las aristas: entrada a la izquierda, salida a la derecha | Modelo de puertos de la librería |

**Panel lateral de servicio:**

```text
┌─ api ────────────────────────────── ✕ ─┐
│ ● Activo · desde hace 1 h 12 min       │
│ [⟳ Reiniciar] [↻ Redesplegar] [■ Parar]│
├────────────────────────────────────────┤
│ General │ Variables │ Red │ Recursos   │
│ Montajes│ Despliegues │ Logs           │
├────────────────────────────────────────┤
│ Origen        ▸ Imagen de registro     │
│ Imagen          registro/portal-api    │
│ Etiqueta        1.4.2   [fijada ▾]     │
│ Reinicio        unless-stopped ▾       │
│ Autoarranque    [x]                    │
│ Replicas        [– 2 +]                │
│ Efimero         [ ]                    │
├────────────────────────────────────────┤
│         [Cancelar]  [Guardar cambio]   │
└────────────────────────────────────────┘
```

"Guardar cambio" **no despliega**: agrega la modificación al changeset del proyecto. El despliegue ocurre al aplicar el changeset o al pulsar explícitamente "Redesplegar". Esta distinción debe quedar clara en las etiquetas de los botones, porque es la fuente más probable de confusión del modelo.

**Dashboard del segundo alcance**, en tres capas: servidor, proyecto y contenedor.

```text
┌─ Servidor ───────────────────────────────────────────────────────────────┐
│  CPU  ▮▮▮▯▯▯▯▯ 34%    RAM ▮▮▮▮▮▯▯▯ 16.2/32 GB    SWAP ▮▮▯▯▯▯▯▯ 6.5/32 GB │
│  Disco / ▮▮▯▯▯▯▯▯ 115/884 GB     Contenedores 8 activos / 8 · 18 imagenes │
└──────────────────────────────────────────────────────────────────────────┘
┌─ Proyectos ──────────────────────────────────────────────────────────────┐
│  ● Portal Interno    3/3 activos   CPU 6%   RAM 1.1 GB   [abrir lienzo]  │
│  ◐ Impresion 3D      1/2 activos   CPU 1%   RAM 0.4 GB   [abrir lienzo]  │
│  ○ Laboratorio IA    0/3 activos   —        —            [abrir lienzo]  │
└──────────────────────────────────────────────────────────────────────────┘
┌─ Contenedores de "Portal Interno" ───────────────────────────────────────┐
│  api    ● Activo   3.4%  186/512 MB   1h12m   [logs] [reiniciar]         │
│  db     ● Activo   1.2%  410/1024 MB  2d 4h   [logs] [reiniciar]         │
│  cache  ● Activo   0.3%   24/256 MB   1h12m   [logs] [reiniciar]         │
└──────────────────────────────────────────────────────────────────────────┘
```

Restricciones de implementación del dashboard: el origen de los datos es el motor de contenedores, no peticiones HTTP a los servicios; la frecuencia es moderada, de 3 a 5 segundos para la vista abierta y ningún sondeo para las vistas cerradas; hay un solo recolector en segundo plano que publica a los circuitos conectados, no un flujo por pestaña abierta; y los datos del host se leen del sistema de archivos virtual del sistema operativo montado en el contenedor, en modo sólo lectura.

**Lenguaje visual de estados.** Es el contrato visual que el nodo del lienzo debe respetar y contra el que se valida la fidelidad de la etapa `b`:

| Estado | Color | Insignia | Borde del nodo |
|---|---|---|---|
| Activo | Verde | ● | Sólido tenue |
| Activo degradado (healthcheck fallando) | Ámbar | ◐ | Sólido ámbar |
| Creando o construyendo | Azul | ◔ animado | Punteado animado |
| Detenido o retirado | Gris | ○ | Sólido gris |
| Caído o fallido | Rojo | ✕ | Sólido rojo |
| **Pendiente de aplicar** | **Violeta** | ◇ | **Punteado violeta** |
| Huérfano (contenedor adoptado desaparecido) | Gris con contorno rojo | ⚠ | Rayado |

El violeta se reserva **exclusivamente** para "pendiente de aplicar" y no se usa en ningún otro elemento de la interfaz: un tercer estado visual sólo funciona si es inequívoco.

### §20.19 · E-19 · Parque de contenedores de referencia

Citado desde §1, §8 y §18 (SM-03). Procedencia: `Analisis-Final-Integrado.md`, líneas 293–320. Estado: propuesto, normalizado y ofuscado en origen. La fuente lo declara explícitamente como **juego de datos de maqueta** para poblar el lienzo y el módulo de adopción; es el contenido de SM-03 y el punto de partida de las métricas de §8.

| Contenedor de ejemplo | Imagen | Proyecto Compose | Red y dirección | Persistencia | Límite |
|---|---|---|---|---|---|
| `panel-admin` | `imagen-oficial/panel-ce:latest` | `panel-admin` | macvlan · `192.168.1.130` | volumen nombrado + socket de Docker | — |
| `vm-windows` | `imagen-comunidad/windows` | `print-server` | macvlan · `192.168.1.133` | montaje de directorio (imagen dispersa) | 8 GB / 4 vCPU |
| `bot-mensajeria` | `registro-privado/bot-moderador:latest` | `bot-mensajeria` | macvlan · `192.168.1.134` | montaje de directorio con SQLite | 512 MB |
| `runner-ci` | `registro-privado/runner-ci:2.x` | `runner-ci` | macvlan · `192.168.1.138` | montaje de directorio como caché | 8 GB |
| `print-server` | `registro-privado/print-server:1.4.x` | `print-server` | macvlan · `192.168.1.139` | montaje de directorio | 512 MB |
| `ia-api` | `imagen-oficial/modelos:0.32` | `ia-local` | bridge `ia-net` · `172.19.0.2` | montaje de directorio (decenas de GB) | — |
| `ia-webui` | `imagen-oficial/webui:0.10` | `ia-local` | bridge `ia-net` · `172.19.0.3` | montaje de directorio | — |
| `ia-video` | `registro-privado/video:0.3` | `ia-local` | bridge `ia-net` · `172.19.0.4` | montaje de directorio | — |

Patrones observables en el parque real que el modelo debe soportar, y que el juego de datos de maqueta debe reproducir **[E]**: servicios con versión fijada en la etiqueta de imagen y política de no actualizar automáticamente, casi ninguno usando `latest` deliberadamente; servicios con dispositivos del host anclados, incluido USB por identificador estable; servicios con capacidades adicionales del kernel y requisitos de privilegios; servicios efímeros que se reconstruyen, como un runner de integración continua, frente a servicios permanentes; todos con reinicio automático configurado; persistencia mayoritariamente por montaje de directorio y no por volumen nombrado; y archivos de variables de entorno no versionados que contienen credenciales.

La traducción de estos patrones a requisitos del alta de servicio es directa: el formulario no puede limitarse a imagen, puertos y variables. Necesita, como mínimo, etiqueta de imagen explícita con política de actualización, montajes de volumen o directorio, dispositivos, capacidades, límites de CPU y memoria, política de reinicio, modo de red con dirección y marca de servicio efímero. El anexo [E-2](#202--e-2--servicio-con-sus-tres-variantes-de-origen) refleja exactamente eso.

### §20.20 · E-20 · Configuraciones reales de contenedor, ofuscadas

Citado desde §3, §16.1, §17.3 P.3 y §18 (SM-03, SM-06). Procedencia: archivos de despliegue en producción del servidor de referencia, relevados y sincronizados con su estado real el 2026-07-18, cuyo inventario está indexado en `Host.Infra.Documentos/ia-db/indexes/02_servicios-docker.md` y `03_redes.md`. Estado: **verificado** en cuanto a estructura y valores de capacidad —son configuraciones que corren hoy—, con **ofuscación aplicada** según la política declarada más abajo.

**Por qué están acá.** Los anexos E-1 a E-19 son modelos de diseño: describen cómo la solución representará un servicio. Estos son el insumo inverso, y son los únicos datos del intake tomados de un sistema real en funcionamiento: seis configuraciones que la solución tiene que ser capaz de **importar, representar en el lienzo y volver a exportar sin pérdida**. Sirven a dos propósitos concretos: poblar la maqueta con casos que no son inventados, y dar a las pruebas fixtures cuya forma ya se sabe que existe.

**Política de ofuscación aplicada a este anexo.** Este documento es público. Sobre el material original se aplicó exactamente el mismo criterio del Anexo C del análisis integrado, que ya rige para E-19:

| Categoría | Tratamiento |
|---|---|
| Nombre del host, su FQDN y su dominio | **Eliminados.** Se dice "el host de contenedores" |
| Nombres de contenedor, de proyecto y de imagen propia | **Normalizados** a los mismos alias que usa E-19 (`panel-admin`, `vm-windows`, `bot-mensajeria`, `runner-ci`, `print-server`, `ia-api`, `ia-webui`, `ia-video`), y los registros a `registro-privado/…`, `imagen-oficial/…`, `imagen-comunidad/…` |
| Direcciones IP | **Reasignadas** a las mismas direcciones ya ofuscadas en E-19, dentro del rango gestionado que declara E-8. Se conservan la estructura, el modo de red y la relación entre servicios |
| Secretos, claves, contraseñas y tokens | **Eliminados por completo.** Ningún valor real se transcribe: se reemplazan por una referencia a secreto o por un marcador explícito. Uno de los casos originales llevaba una clave simétrica embebida en el propio archivo de despliegue; acá aparece como lo que la solución debe hacer con ella, no con su valor |
| Rutas absolutas del sistema de archivos del propietario, usuario y UID | **Reemplazadas** por rutas de ejemplo (`/srv/…`) y por un usuario genérico |
| Identificadores de dispositivo USB y números de serie | **Truncados** al patrón, conservando que el anclaje es por identificador estable |
| Puertos en escucha del host y su alcance de exposición real | **Omitidos.** Se conserva la publicación de puertos donde es parte de la estructura del despliegue, pero no se declara qué escucha el servidor real ni en qué interfaces |
| Hallazgos de seguridad, servicios sin autenticar y riesgos abiertos del servidor | **Omitidos por completo** |
| Marca y modelo del hardware, de la placa y de la tarjeta de red | **Omitidos.** Se conservan sólo los valores de capacidad, que ya están en §10 |
| Capacidades, límites, políticas de reinicio, modos de red y patrones de montaje | **Conservados.** Son justamente el insumo que justifica el modelo de datos |

---

**C-1 · Servicio de imagen pública en macvlan, con el socket del motor montado.** Es el caso que la regla RA-04 marca como no adoptable por defecto: gobernarlo desde la solución crearía una dependencia circular de control.

```yaml
services:
  panel-admin:
    image: imagen-oficial/panel-ce:latest
    container_name: panel-admin
    restart: unless-stopped
    networks:
      vlan:
        ipv4_address: 192.168.1.130
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
      - panel_admin_data:/data

networks:
  vlan:
    external: true
    name: infra_vlan

volumes:
  panel_admin_data:
    name: panel_admin_data
```

Qué ejercita: origen por imagen con etiqueta flotante `latest`, que es el anti-patrón que la política de actualización del modelo de servicio debe poder declarar; red macvlan consumida como externa; volumen nombrado y montaje del socket; ausencia de límite de recursos.

---

**C-2 · Servicio propio con secreto embebido en el archivo de despliegue.** El original llevaba una clave simétrica en texto plano dentro del compose. Acá aparece como referencia, que es exactamente lo que la solución debe producir al importarlo.

```yaml
services:
  bot-mensajeria:
    image: registro-privado/bot-moderador:latest
    container_name: bot-mensajeria
    environment:
      Moderacion__Gateway: "Mensajeria"
      Persistencia__RutaBase: "/app/data/moderador.db"
      # En el archivo original esta clave viajaba en claro dentro del compose.
      # Al importarlo, la solucion debe detectarla por heuristica (RA-05),
      # enmascararla y exigir recarga manual: nunca conservar el valor.
      ClaveMaestra: "${CLAVE_MAESTRA}"
    networks:
      vlan:
        ipv4_address: 192.168.1.134
    volumes:
      - ./data:/app/data
    restart: always
    deploy:
      resources:
        limits:
          memory: 512M
```

Qué ejercita: persistencia por montaje de directorio con una base SQLite adentro, que es el patrón mayoritario del parque; límite de memoria declarado; y, sobre todo, un hueco concreto de la heurística declarada.

**Hallazgo [D].** La heurística de RA-05 enmascara las variables cuyo nombre contiene `PASSWORD`, `TOKEN`, `SECRET`, `KEY` o `PAT`. La clave de este caso real **no contiene ninguno de esos fragmentos**: la heurística, tal como está declarada, la importaría en claro. No es un defecto del ejemplo sino de la regla, y aparece sólo porque el ejemplo es real. Tres resoluciones posibles, que el cliente debe elegir: ampliar la lista con los fragmentos del idioma del dominio (`CLAVE`, `CONTRASENA`, `CREDENCIAL`); complementar el nombre con una heurística sobre la **forma del valor**, que detecte cadenas de alta entropía y material codificado en base64; o pedir confirmación de cada variable importada, tratando toda la importación como sospechosa hasta que el usuario la revise. Registrado como caso límite CL-15 en §7 y como caso de prueba T-17 en el anexo [E-22](#2022--e-22--casos-de-prueba-derivados-de-las-configuraciones-reales).

---

**C-3 · Servicio construido desde Dockerfile, con versión fijada y dispositivo USB anclado.** Es el caso más completo del parque: imagen propia, sin publicar puertos por estar en macvlan, y un dispositivo del host anclado por identificador estable.

```yaml
services:
  print-server:
    build:
      context: .
      dockerfile: Dockerfile
      args:
        SERVER_VERSION: "1.4.18"
    image: registro-privado/print-server:1.4.18
    container_name: print-server
    environment:
      TZ: "America/Argentina/Buenos_Aires"
    # Controladora anclada por ruta ESTABLE (identificador del chip USB-serie),
    # mapeada al puerto que la aplicacion espera dentro del contenedor.
    devices:
      - /dev/serial/by-id/usb-FTDI-if00-port0:/dev/ttyUSB0
    networks:
      vlan:
        ipv4_address: 192.168.1.139
    volumes:
      - ./data:/data
    restart: always
    deploy:
      resources:
        limits:
          memory: 512M

networks:
  vlan:
    external: true
    name: infra_vlan
```

Su Dockerfile, que fija la versión por argumento de construcción y no usa ninguna etiqueta flotante:

```dockerfile
# Imagen propia minima construida sobre una base slim, porque el producto
# no publica imagen oficial. Version FIJADA por ARG: actualizar es deliberado
# (cambiar el argumento y reconstruir), nunca un efecto de `latest`.
FROM debian:bookworm-slim

ARG SERVER_VERSION=1.4.18
ARG SERVER_ARCH=debian-amd64
ARG SERVER_PKG=Servidor-${SERVER_VERSION}-Linux.deb
ARG SERVER_URL=https://descargas.ejemplo/files/server/${SERVER_ARCH}/${SERVER_PKG}

# 1) Dependencias de runtime declaradas por el paquete, mas utilidades de descarga.
# 2) Descarga e instalacion del paquete oficial sin ejecutar su configuracion de
#    servicio: no hay init en build, el binario se lanza por ENTRYPOINT.
# 3) Redireccion del almacenamiento por defecto a /data, para que la persistencia
#    quede en el montaje y sobreviva al redespliegue.
# 4) Purga de las utilidades de descarga.
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        ca-certificates curl libusb-1.0-0 sudo \
    && curl -fSL "${SERVER_URL}" -o /tmp/${SERVER_PKG} \
    && dpkg --unpack /tmp/${SERVER_PKG} \
    && mkdir -p /data \
    && sed -i '/storage-directory/s%/var/lib/servidor%/data%' /opt/servidor/etc/servidor.xml \
    && apt-get purge -y curl \
    && apt-get autoremove -y \
    && rm -rf /var/lib/apt/lists/* /tmp/*

EXPOSE 3344

VOLUME ["/data"]

ENTRYPOINT ["/opt/servidor/bin/servidor", "-c", "/opt/servidor/etc/servidor.xml"]
```

Qué ejercita: origen de tipo `dockerfile` con argumentos de construcción; política de actualización `fijada`; dispositivo anclado; `EXPOSE` sin publicación de puerto, porque en macvlan la publicación no aplica (RN-07); volumen declarado en la imagen.

---

**C-4 · Servicio que crea la red macvlan, con capacidades y dispositivos privilegiados.** Es el único proyecto del parque que **define** la red; los demás la consumen como externa. El orden de arranque entre proyectos depende de eso.

```yaml
services:
  vm-windows:
    image: imagen-comunidad/windows
    container_name: vm-windows
    environment:
      VERSION: "10"
      RAM_SIZE: "8G"
      CPU_CORES: "4"
      DISK_SIZE: "64G"
      USERNAME: "${VM_USUARIO}"
      PASSWORD: "${VM_PASSWORD}"
      # Passthrough de un dispositivo USB del host, por identificador de fabricante
      # y producto. Los identificadores reales no se transcriben.
      ARGUMENTS: "-device usb-host,vendorid=0xVVVV,productid=0xPPPP"
    devices:
      - /dev/kvm
      - /dev/net/tun
      - /dev/bus/usb
    cap_add:
      - NET_ADMIN
    networks:
      vlan:
        ipv4_address: 192.168.1.133
    volumes:
      - ./data:/storage
    restart: always
    stop_grace_period: 2m

networks:
  vlan:
    # Este es el UNICO despliegue que CREA la macvlan; los demas la declaran
    # `external`. El nombre se fija para desacoplarlo del directorio del proyecto:
    # sin `name:`, la herramienta la llamaria `<carpeta>_vlan` y el resto de los
    # despliegues no la encontraria.
    name: infra_vlan
    driver: macvlan
    driver_opts:
      parent: enp1s0
    ipam:
      config:
        - subnet: 192.168.1.0/24
          gateway: 192.168.1.1
```

Qué ejercita: capacidades adicionales del kernel y dispositivos del host, que el modelo de servicio declara como campos propios; período de gracia de detención; creación de la red macvlan con su interfaz padre, subred y gateway, que es la información del rango gestionado de E-8; y una imagen sin etiqueta, que resuelve a `latest` de forma implícita.

---

**C-5 · Proyecto multi-servicio en red bridge, con dependencia, construcción local y variables externalizadas.** Es el caso que ejercita el grafo de aristas y el orden topológico: la interfaz web alcanza al motor **por nombre de contenedor**, no por dirección.

```yaml
services:
  ia-api:
    image: imagen-oficial/modelos:${MODELOS_VERSION}
    container_name: ia-api
    restart: unless-stopped
    environment:
      TZ: ${TZ}
      MAX_MODELOS_CARGADOS: ${MAX_MODELOS_CARGADOS}
      HILOS_INFERENCIA: ${HILOS_INFERENCIA}
    ports:
      - "11434:11434"
    volumes:
      - ./ia-api/data:/root/.modelos
    networks:
      - ia-net
    mem_limit: ${IA_MEM_LIMIT}
    cpus: ${IA_CPUS}

  ia-webui:
    image: imagen-oficial/webui:${WEBUI_VERSION}
    container_name: ia-webui
    restart: unless-stopped
    depends_on:
      - ia-api
    environment:
      TZ: ${TZ}
      # Nombre de contenedor por la red interna, NO localhost: dentro del
      # contenedor localhost es el mismo. Esta variable es exactamente lo que
      # la solucion genera al trazar una arista de ia-webui a ia-api.
      API_BASE_URL: http://ia-api:11434
      AUTENTICACION: "true"
      CLAVE_SESION: ${CLAVE_SESION}
      MOTOR_IMAGENES: video
      VIDEO_BASE_URL: http://ia-video:8188
    ports:
      - "3000:8080"
    volumes:
      - ./ia-webui/data:/app/backend/data
    networks:
      - ia-net

  ia-video:
    build:
      context: ./ia-video
      args:
        VIDEO_REF: ${VIDEO_VERSION}
    image: registro-privado/video:${VIDEO_VERSION}
    container_name: ia-video
    restart: unless-stopped
    environment:
      TZ: ${TZ}
    command: ${VIDEO_ARGS}
    ports:
      - "8188:8188"
    volumes:
      - ./ia-video/data/models:/opt/app/models
      - ./ia-video/data/output:/opt/app/output
      - ./ia-video/data/input:/opt/app/input
    networks:
      - ia-net
    mem_limit: ${VIDEO_MEM_LIMIT}
    cpus: ${VIDEO_CPUS}

networks:
  ia-net:
    name: ia-net
    driver: bridge
```

Su archivo de variables de ejemplo, con los secretos vacíos, que es la forma que debe producir la exportación de E-14:

```bash
# Plantilla de variables. Se copia a .env y se completa antes de desplegar.
# El archivo real no se versiona: contiene la clave de sesion de la interfaz.

# Versiones FIJADAS de las imagenes. Nunca etiquetas flotantes.
MODELOS_VERSION=0.32.0
WEBUI_VERSION=v0.10.2
VIDEO_VERSION=v0.3.40

TZ=America/Argentina/Buenos_Aires

# Ajuste del motor
MAX_MODELOS_CARGADOS=2
HILOS_INFERENCIA=4

# Limites de recursos
IA_MEM_LIMIT=16g
IA_CPUS=6.0
VIDEO_MEM_LIMIT=12g
VIDEO_CPUS=6.0
VIDEO_ARGS=--cpu

# Clave de firma de sesiones. Generar una propia; nunca versionarla.
CLAVE_SESION=
```

Qué ejercita: tres servicios en una red bridge con resolución por nombre; una dependencia declarada que se corresponde con una arista del lienzo y con la variable generada de E-4; construcción local de una de las tres imágenes; versiones fijadas por variable; y puertos publicados en el host, que es lo que distingue este proyecto de los de macvlan.

---

**C-6 · Servicio efímero, con secretos fuera del archivo de despliegue y sin acceso al socket.** Es el contraejemplo deliberado de C-2: el mismo parque contiene el patrón incorrecto y su corrección.

```yaml
services:
  runner-ci:
    build:
      context: ./runner-ci
      dockerfile: Dockerfile
      args:
        RUNNER_VERSION: "2.335.1"
    image: registro-privado/runner-ci:2.335.1
    container_name: runner-ci

    # El token vive en un archivo de variables NO versionado, no embebido aca.
    env_file:
      - .env

    environment:
      TZ: "America/Argentina/Buenos_Aires"
      # El servicio procesa un trabajo y se desregistra; la politica de reinicio
      # lo vuelve a levantar limpio. Es la marca de servicio efimero del modelo.
      EFIMERO: "true"
      NOMBRE_RUNNER: "runner-ci"
      DESHABILITAR_AUTOACTUALIZACION: "true"
      # Caches redirigidos al montaje: sin esto se perderian en cada ciclo.
      NUGET_PACKAGES: "/cache/nuget"
      GRADLE_USER_HOME: "/cache/gradle"

    # NO se monta el socket del motor ni se usa modo privilegiado: en un runner
    # eso equivale a dar control del host a cualquier autor de un flujo de trabajo.

    networks:
      vlan:
        ipv4_address: 192.168.1.138

    volumes:
      # Solo los caches. El directorio de trabajo NO se persiste a proposito:
      # cada ciclo parte de un checkout limpio, que es el sentido de la efimeridad.
      - ./data:/cache

    restart: always

    deploy:
      resources:
        limits:
          memory: 8G
          cpus: "4.0"
        reservations:
          memory: 1G

networks:
  vlan:
    external: true
    name: infra_vlan
```

Qué ejercita: la marca de servicio efímero; reserva de recursos además del límite, que el modelo de recursos de E-2 contempla como `reservaMemoriaMb`; secretos por archivo externo en lugar de embebidos; y un servicio que **no expone nada** y sólo hace conexiones salientes, cuya dirección sirve para identificarlo y no para alcanzarlo.

### §20.21 · E-21 · Correspondencia entre una configuración real y el modelo de la solución

Citado desde §4 (F-13) y §17.3 P.3. Procedencia: derivado de E-20 (caso C-3) y del modelo de servicio de E-2. Estado: propuesto. Es el contrato de la importación desde Compose y la fuente de las pruebas de ida y vuelta de esa conversión.

Tomando el caso C-3, la importación debe producir exactamente este servicio:

```json
{
  "id": 305,
  "proyectoId": 7,
  "nombre": "print-server",
  "descripcion": null,
  "origen": {
    "tipo": "dockerfile",
    "rutaDockerfile": "/srv/despliegues/print-server/Dockerfile",
    "contextoBuild": "/srv/despliegues/print-server",
    "argumentosBuild": { "SERVER_VERSION": "1.4.18" },
    "reconstruirEnDespliegue": false
  },
  "red": {
    "modo": "macvlan",
    "aliasDns": "print-server",
    "ipFija": "192.168.1.139",
    "interfazPadre": "enp1s0",
    "subred": "192.168.1.0/24",
    "gateway": "192.168.1.1"
  },
  "puertos": [
    { "contenedor": 3344, "host": null, "protocolo": "tcp", "publicar": false }
  ],
  "variables": [
    { "clave": "TZ", "valor": "America/Argentina/Buenos_Aires", "secreta": false, "origen": "adopcion" }
  ],
  "montajes": [
    { "tipo": "bind", "origen": "/srv/despliegues/print-server/data", "destino": "/data", "soloLectura": false }
  ],
  "dispositivos": [
    { "host": "/dev/serial/by-id/usb-FTDI-if00-port0", "contenedor": "/dev/ttyUSB0", "permisos": "rwm" }
  ],
  "capacidades": [],
  "recursos": { "limiteMemoriaMb": 512 },
  "replicas": 1,
  "politicaReinicio": "always",
  "autoArranque": true,
  "efimero": false,
  "healthcheck": { "modo": "ninguno", "comando": null, "intervaloSegundos": null },
  "posicionCanvas": { "x": 0, "y": 0 }
}
```

Reglas de traducción que la conversión debe respetar, verificables una por una:

| Elemento de Compose | Campo del modelo | Nota |
|---|---|---|
| `image:` con etiqueta explícita | `origen.imagen` + `origen.etiqueta`, `politicaActualizacion: "fijada"` | Una etiqueta flotante o ausente se traduce a `politicaActualizacion: "flotante"`, no se descarta |
| `build.context` y `build.args` | `origen.tipo: "dockerfile"` con contexto y argumentos | Convive con `image:`, que pasa a ser el nombre de la imagen resultante |
| `networks.<red>.ipv4_address` | `red.ipFija` y una fila en `reservas_ip` | La dirección debe pertenecer al rango gestionado (RN-06) |
| `driver: macvlan` con `parent` | `red.modo: "macvlan"` e `interfazPadre` | Con macvlan, `publicar` queda deshabilitado (RN-07) |
| `ports:` | `puertos[]` con `publicar: true` | Sólo válido en modo bridge |
| `volumes:` con ruta relativa | `montajes[].tipo: "bind"` | La ruta se resuelve contra el directorio del proyecto y debe existir en la misma ruta absoluta en host y contenedor |
| `volumes:` con nombre | `montajes[].tipo: "volumen"` | |
| `devices:` | `dispositivos[]` con host, contenedor y permisos | |
| `cap_add:` | `capacidades[]` | |
| `deploy.resources.limits` y `reservations` | `recursos.limiteMemoriaMb`, `limiteCpus`, `reservaMemoriaMb` | `mem_limit`/`cpus` de nivel servicio se normalizan al mismo lugar |
| `restart:` | `politicaReinicio` | Conjunto cerrado: `no`, `on-failure`, `always`, `unless-stopped` |
| `depends_on:` | Arista del lienzo hacia el servicio destino | Con `condition: service_healthy` se traduce además a espera de verificación de salud |
| `environment:` con `${VAR}` | Variable con `secreta: true` y referencia a secreto | El valor **nunca** se importa ni se exporta (RN-15) |
| `env_file:` | Variables importadas, con la heurística de sensibilidad aplicada | RA-05 |
| Ausencia de `healthcheck` | `healthcheck.modo: "ninguno"` | Distinto de `heredado-de-la-imagen` |
| `external: true` en una red | El proyecto **consume** la red, no la crea | Sólo un proyecto puede declararla; el resto la referencia |

### §20.22 · E-22 · Casos de prueba derivados de las configuraciones reales

Citado desde §17.2 P.6 y §17.4 P.6. Procedencia: derivado del catálogo de reglas de E-16, de los casos de E-20 y del rango gestionado de E-8. Estado: propuesto. Cada fila es un caso ejecutable con datos concretos, pensado para que la categoría `08-Calidad-Y-Pruebas` y la batería de `SelfHosted.Domain.Tests` no arranquen de una hoja en blanco.

| # | Regla | Entrada | Resultado esperado |
|---|---|---|---|
| T-01 | RN-01 | Nombre `print-server` en un proyecto que no lo tiene | Aceptado |
| T-02 | RN-01 | Nombre `Print Server` (mayúsculas y espacio) | Rechazado `422`, campo `nombre` |
| T-03 | RN-01 | Nombre de 33 caracteres | Rechazado `422`, campo `nombre` |
| T-04 | RN-01 | Segundo servicio `print-server` en el mismo proyecto | Rechazado `422`, nombre duplicado |
| T-05 | RN-03 | Servicio con `192.168.1.139` en el proyecto 9; el servicio 305 del proyecto 7 la ocupa y está **activo** | Arranque bloqueado `409`, con las tres resoluciones de E-8 |
| T-06 | RN-03 | Idéntico al anterior, pero el servicio 305 está **detenido** | Arranque permitido: la regla compara contra servicios activos, no configurados |
| T-07 | RN-03 | Dos servicios del **mismo** proyecto con `192.168.1.139` | Bloqueado siempre, tipo `duplicado-interno` |
| T-08 | RN-06 | Dirección `192.168.1.120`, fuera del rango gestionado `192.168.1.128/26` | Rechazado `422`, con `192.168.1.141` sugerida como siguiente libre |
| T-09 | RN-06 | Dirección `192.168.1.129`, dentro del rango pero declarada excluida | Rechazado `422` |
| T-10 | RN-07 | Caso C-3 (macvlan) al que se le agrega un puerto publicado | Rechazado `422`; en la interfaz el campo aparece deshabilitado |
| T-11 | RN-04 | Arista de un servicio en `ia-net` (bridge) a un servicio en macvlan sin puerto publicado | Enlace inválido; bloquea el arranque |
| T-12 | RN-04 | Arista de `ia-webui` a `ia-api`, ambos en `ia-net` | Válida; variable generada `http://ia-api:11434`, resuelta por alias DNS |
| T-13 | RN-05 | Aristas `a → b`, `b → c`, `c → a` | Rechazado `422` señalando el ciclo |
| T-14 | RN-14 | Proyecto C-5 con `ia-webui` dependiente de `ia-api` | Orden de arranque `ia-api`, `ia-video`, `ia-webui`; deducido, no configurado |
| T-15 | RN-11 | Adoptar un contenedor ya adoptado por otro proyecto | Aparece deshabilitado, con el proyecto que lo tomó |
| T-16 | RA-04 | Descubrir el caso C-1, que monta el socket del motor | `adoptable: false`, motivo `monta-el-socket-de-docker`; forzable con confirmación explícita |
| T-17 | RA-05 | Importar el caso C-2, cuya variable de clave **no contiene** ninguno de los fragmentos de la heurística | **Caso abierto (CL-15).** Con la heurística declarada la variable se importaría en claro, que es el comportamiento incorrecto. La prueba debe escribirse contra la resolución que elija el cliente, y hasta entonces queda como prueba en rojo declarada, no como prueba ausente |
| T-17b | RA-05 | Importar una variable llamada `API_TOKEN` con valor | Importada enmascarada y marcada para recarga manual; el valor no se persiste |
| T-18 | RN-15 | Exportar a Compose un proyecto con una variable secreta | La exportación emite `${VAR}` y el archivo de variables con el valor vacío; el valor no aparece en ningún archivo |
| T-19 | RN-18 | Servicio C-3 (macvlan, una dirección fija) al que se le piden 2 réplicas | Rechazado `422`: hace falta una dirección por réplica |
| T-20 | RN-19 | Límite de memoria de 64 GB en un host de 32 GB | Rechazado `422` con el máximo admisible |
| T-21 | RN-09 | Detener el servicio C-3 | El montaje `/data` permanece intacto; el contenedor se elimina |
| T-22 | RN-12 | Mover un nodo del lienzo | Se guarda al instante; no entra al changeset ni marca redespliegue |
| T-23 | RN-13 | Changeset de E-5, con cambios en `api` y alta de `cache` | Redespliega sólo `api` y `cache`; `db` no se toca |
| T-24 | RN-20 | Arrancar un proyecto de 3 servicios con 1 en conflicto | Arrancan 2; el proyecto queda `parcialmente-activo`, sin error silencioso |
| T-25 | RN-16 | Crear un token de API | El valor se devuelve una única vez; en la base sólo queda su hash |
| T-26 | RN-17 | Cualquier operación de escritura vía API con token | Fila de auditoría con actor `token:<prefijo>` |
| T-27 | I2, I6 | Redesplegar el caso C-2, cuyo montaje contiene una base SQLite | Contenedor nuevo, datos del montaje intactos |
| T-28 | E-17 | Contenedor `running` con verificación de salud en `unhealthy` | Despliegue en `Activo (degradado)`, no en `Caido` |
| T-29 | E-17 | Contenedor `exited` con código 0 | Despliegue `Finalizado`; con código distinto de 0, `Caido` |
| T-30 | E-21 | Importar C-3 y volver a exportarlo | El Compose resultante es equivalente al de partida en imagen, red, dirección, dispositivos, montajes, límites y política de reinicio |

**Fixture base sugerido para la maqueta y para las pruebas de integración [D]:** un proyecto en macvlan con los cuatro servicios de C-1 a C-4 y un proyecto en bridge con los tres de C-5, más el efímero de C-6. Da ocho servicios, dos modos de red, cinco orígenes distintos (imagen fijada, imagen flotante, dockerfile, imagen sin etiqueta y construcción local), dispositivos, capacidades, límites, reservas, una dependencia y un conflicto de direcciones reproducible. Es exactamente el parque de E-19, que es lo que la solución tiene que poder representar el primer día.

## §21 Anexo B — Cobertura de los ejemplos sobre el modelo y las reglas

Matriz derivada de §20 y de las reglas de negocio e invariantes declaradas en las fuentes. Demuestra que los ejemplos anexados cubren el modelo, los invariantes y los flujos que este intake declara.

| Área del modelo, invariante o flujo | Escenario que lo ejercita |
|---|---|
| Proyecto, red del proyecto y layout del lienzo | E-1 |
| Servicio: origen por imagen, por repositorio y por Dockerfile | E-2 |
| Servicio en macvlan con dirección fija y dispositivo anclado (I2, RN-07) | E-2 |
| Variables secretas y referencia a secreto (RN-15) | E-2, E-14 |
| Despliegue, máquina de estados y línea de tiempo de eventos (I4, I5) | E-3 |
| Métricas por despliegue, insumo del nodo y del dashboard | E-3 |
| Arista del lienzo y variable generada según modo de red (RN-04) | E-4, E-10 |
| Changeset, informe de impacto y cambios visuales que no lo integran (I9, RN-12, RN-13) | E-5 |
| Catálogo de servicios reutilizables con parámetros y formato de exportación | E-6 |
| Descubrimiento, adoptabilidad y reglas RA-01 a RA-05 (I10, RN-11) | E-7 |
| Adopción sin recrear el contenedor (RA-02, RA-03) | E-11 |
| Rango gestionado, reserva por réplica y conflicto entre servicios activos (I7, RN-03, RN-06, RN-20) | E-8 |
| Algoritmo de validación de arranque y arranque parcial | E-8 |
| Formato de error `ProblemDetails` con miembros de extensión | E-8, E-13 |
| Esquema relacional completo, índices y decisiones de esquema | E-9 |
| Orden topológico de arranque deducido del grafo (RN-14) | E-10 |
| Persistencia que sobrevive a la parada (I6, RN-09) | E-10 |
| Token de API con ámbitos, identificador y vigencia (RN-16) | E-12 |
| Contrato del endpoint de despliegue y respuestas por situación | E-13 |
| Ámbito mínimo del automatismo y revocación individual | E-12, E-13 |
| Exportación a Compose con secretos vacíos y manifiesto propio (RN-15) | E-14 |
| Importación inversa con disposición automática por capas | E-14 |
| Superficie de la API, con ámbito por endpoint | E-15 |
| Catálogo completo de reglas verificables RN-01 a RN-20, con momento de validación y respuesta | E-16 |
| Máquina de estados del despliegue y su traducción desde el estado del contenedor | E-17 |
| Estado degradado, pausado y huérfano, que no son caída | E-17, E-18 |
| Mapa de navegación y rutas que la etapa `b` debe dejar navegables | E-18 |
| Disposición del lienzo, anatomía del nodo y panel lateral de servicio | E-18 |
| Dashboard en tres capas y restricciones de su implementación | E-18 |
| Lenguaje visual de estados, con el violeta reservado a "pendiente de aplicar" | E-18 |
| Juego de datos de maqueta y patrones del parque real que el alta de servicio debe soportar | E-19, E-2 |
| Origen por Dockerfile con argumentos de construcción y versión fijada | E-20 (C-3), E-2 |
| Dispositivos del host anclados por identificador estable y capacidades del kernel | E-20 (C-3, C-4) |
| Creación de la red macvlan frente a su consumo como red externa | E-20 (C-4 frente a C-1, C-2, C-3, C-6) |
| Servicio efímero, con reserva de recursos y secretos fuera del despliegue | E-20 (C-6) |
| Secreto embebido en un archivo de despliegue, y su enmascarado al importarlo | E-20 (C-2), T-17 |
| Traducción de Compose al modelo de servicio, campo por campo | E-21 |
| Ida y vuelta con Compose sin pérdida | E-21, T-30 |
| Casos de prueba con entrada y resultado esperado por cada regla de negocio | E-22 |
| Fixture base para la maqueta y para las pruebas de integración | E-22, E-19, E-20 |

---

## §19 Checklist de completitud del intake

Negocio (Parte A):

- [x] La cabecera tiene nombre de solución, cliente, fecha y estado.
- [x] §1 describe un problema concreto y qué pasa si no se construye.
- [x] §2 tiene al menos un stakeholder por categoría con rol explícito: propietario, implementador y beneficiario.
- [x] §4 tiene al menos un ítem en cada categoría MoSCoW y el Must Have es el Alcance 1, que es el mínimo razonable.
- [x] §5 tiene 10 historias en formato `Como/quiero/para`, cubriendo 2 roles: administrador y automatismo.
- [x] §7 lista 15 casos límite con espacio para la respuesta del cliente.
- [x] §8 tiene 4 métricas de negocio con target y plazo numéricos. **Marcadas [S] S-01: requieren confirmación del cliente.**
- [x] §9 lista 7 exclusiones con justificación.
- [x] §10 declara "sin fecha" justificado y la naturaleza de la restricción económica; no hay presupuesto monetario asignado.
- [x] §11 lista 10 riesgos con probabilidad, impacto y mitigación.
- [x] §12 define 28 términos del dominio.

Composición (Parte B):

- [x] §13 enumera los 4 proyectos, cada uno con uno de los 8 valores D8, señala el principal (SelfHosted-Web) y el grafo de dependencias es acíclico.
- [x] §13 declara el perfil de convención de nombres; no hay colisión de nombres de proyecto ni de nombres de código.
- [x] §14 describe la composición y los contratos entre proyectos, coherentes con las aristas de §13.
- [x] §15 garantiza valor demostrable end-to-end en el primer sprint a través de la jerarquía, con corte vertical obligatorio.
- [x] §16 publica el árbol derivado de la jerarquía y de la convención de nombres, con §16.1.

Técnica por proyecto (Parte C):

- [x] §17 está completo para cada uno de los 4 proyectos de §13: identidad más P.1 a P.12.
- [x] Cada proyecto: P.6 declara cobertura mínima numérica de líneas y de ramas; P.7 adopta SemVer 2.0.0 y Conventional Commits; P.8 enumera quality gates bloqueantes; P.9 declara plataformas y versiones mínimas; P.10 expresa NFR con métricas numéricas. **Los umbrales marcados [S] S-02, S-03 y S-04 requieren confirmación.**

Anexos de datos (Parte D):

- [x] Los veintidós identificadores E-1 a E-22 citados en el cuerpo tienen su contenido completo en §20, y ningún escenario de §20 queda huérfano.
- [x] Los anexos derivados de un sistema real (E-20 a E-22) declaran su estado como verificado, su procedencia y la política de ofuscación aplicada, y no contienen ningún secreto, hostname, dominio, ruta de usuario ni hallazgo de seguridad del servidor de referencia. Este documento es público.
- [x] Los insumos de maquetado (mapa de navegación, disposición de pantallas, anatomía del nodo, dashboard, lenguaje visual de estados y juego de datos de maqueta) están transcriptos en E-18 y E-19, de modo que `03-UX-UI-DX` y `SDD/Maquetas/SelfHosted-Web/` pueden generarse sin abrir las fuentes.
- [x] Los insumos de generación de pruebas (reglas RN-01 a RN-20 con momento de validación y respuesta, invariantes I1 a I10, máquina de estados, contratos de la API y esquema de datos) están transcriptos en E-16, E-17, E-15, E-9 y §17.4 P.2.
- [x] Ningún dato del intake se respalda únicamente en una referencia a un archivo externo: todo lo citado está transcripto.
- [x] Cada escenario de §20 declara procedencia (archivo y líneas) y estado.

General:

- [x] No hay vocabulario del dominio fuente del bootstrap del framework ni stacks hardcodeados en texto normativo (D7).
- [x] El control de cambios refleja la versión y la fecha del documento.

**Advertencia para la fase de validación del orquestador.** Este intake no fue completado por el cliente sino integrado desde tres documentos de análisis y requerimientos. Los ítems marcados **[S]** —los seis supuestos S-01 a S-06— son valores propuestos, no declarados por el cliente. El orquestador debe presentarlos en su batería de validación de intake y obtener confirmación explícita antes de tratarlos como cerrados. Ninguno de ellos bloquea la derivación del manifiesto desde §13, que se apoya exclusivamente en datos verificados.

---

## Trazabilidad downstream

| Sección del intake | Destino | Documento downstream típico |
|---|---|---|
| §1 a §12 (negocio) | `00-Contexto/`, `01-Necesidades-Negocio/` | Visión, alcance, roadmap por alcances 1 a 4, NB-XX |
| §4 MoSCoW y §5 historias | `01-Necesidades-Negocio/`, `02-Especificacion-Funcional/` de SelfHosted-Web | NB-XX, CU-XX |
| §7 casos límite y §11 riesgos | `02-Especificacion-Funcional/`, `05-Arquitectura-Tecnica/` | CU alternativos, ADR de mitigación |
| §13 (proyectos) | `SOLUTION-MANIFEST` derivado; todas las categorías por proyecto | Manifiesto canónico; selector de variantes D8 |
| §14 estilo de solución | `Solucion/` y `05-Arquitectura-Tecnica/` de cada proyecto | Vista de solución, grafo de dependencias |
| §15 y §15.1 delivery | `07-Plan-Sprint/` de SelfHosted-Web | Plan de sprint por etapas, con el informe de cierre como definición de terminado |
| §16 estructura | `05-Arquitectura-Tecnica/`, `11-Documentacion/` | Árbol de la solución, README de carpeta |
| §17 P.x por proyecto | `05`, `08`, `09`, `00` de cada proyecto | ADR (DA-01 a DA-08), estrategia de testing, pipeline, NFR |
| §17.1 P.5 y §17.3 P.5 | `05-Arquitectura-Tecnica/` de SelfHosted-Web e Infrastructure | ADR de autenticación, ADR de salvaguardas de aislamiento del host |
| §18 samples y puertas técnicas | `10-Examples/` de cada proyecto | Ejemplo-XX; SM-01 y SM-02 son las materializaciones de PT-01 y PT-02 |
| §20 y §21 anexos de datos | `02-Especificacion-Funcional/`, `10-Examples/`, `SDD/Maquetas/SelfHosted-Web/` | Modelo conceptual con ejemplos, fixtures de prueba, datos de maqueta |
| E-15 superficie de la API | `02-Especificacion-Funcional/` y `05-Arquitectura-Tecnica/` de SelfHosted-Web | CU por recurso, contrato OpenAPI |
| E-16 reglas RN-01 a RN-20 | `02-Especificacion-Funcional/` y `08-Calidad-Y-Pruebas/` | RN-XX y casos de prueba, uno por regla |
| E-17 ciclo de vida del despliegue | `02-Especificacion-Funcional/`, `05-Arquitectura-Tecnica/`, `08-Calidad-Y-Pruebas/` | Modelo de estados, pruebas del sincronizador |
| E-18 maquetado de la interfaz | `03-UX-UI-DX/` de SelfHosted-Web y `SDD/Maquetas/SelfHosted-Web/` | Wireframes, mapa de navegación, sistema visual de estados |
| E-19 parque de referencia | `10-Examples/` de SelfHosted-Web y `SDD/Maquetas/SelfHosted-Web/` | Datos de siembra y de maqueta |
| E-20 configuraciones reales ofuscadas | `10-Examples/`, `02-Especificacion-Funcional/` y `SDD/Maquetas/SelfHosted-Web/` | Fixtures de importación, datos de maqueta, casos de adopción |
| E-21 traducción Compose ↔ modelo | `02-Especificacion-Funcional/` y `08-Calidad-Y-Pruebas/` de SelfHosted-Infrastructure | Contrato de importación y exportación, pruebas de ida y vuelta |
| E-22 casos de prueba | `08-Calidad-Y-Pruebas/` de cada proyecto | Casos de prueba con entrada y resultado esperado, uno o más por regla |

---

## Control de cambios

| Versión | Fecha | Cambios | Autor |
|---|---|---|---|
| 1.0 | 2026-07-27 | Intake unificado inicial de la solución SelfHosted.Service.Core, integrado desde `Analisis-Final-Integrado.md`, `Requerimientos-Funcionales.md` y `Requerimientos-Tecnicos.md`. Incluye la Parte D con veintidós escenarios transcriptos y su matriz de cobertura: los nueve modelos de datos con su JSON completo y el esquema relacional (E-1 a E-9), los cinco escenarios de extremo a extremo (E-10 a E-14), la superficie de la API (E-15), el catálogo de reglas verificables (E-16), el ciclo de vida del despliegue (E-17), el maquetado de la interfaz (E-18), el parque de referencia como juego de datos de maqueta (E-19), seis configuraciones de despliegue reales ofuscadas con sus Compose y Dockerfile (E-20), la traducción entre Compose y el modelo de servicio (E-21) y treinta casos de prueba derivados (E-22). | Prompt integrador de Documento Intake (Claude Code) |
