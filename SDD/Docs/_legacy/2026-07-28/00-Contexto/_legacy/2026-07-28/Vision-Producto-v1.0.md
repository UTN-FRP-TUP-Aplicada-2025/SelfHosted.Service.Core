# Visión de Producto

**Proyecto:** SelfHosted.Service.Core (solución; proyecto principal SelfHosted-Web)
**Documento:** Vision-Producto-v1.0.md
**Versión:** 1.0
**Estado:** Propuesto
**Fecha:** 2026-07-27
**Autor:** Product Manager Senior (AG-00) en conjunción con Analista de Negocio Senior (AG-01)
**Trazabilidad upstream:** SOLUTION-INTAKE v1.1 §1, §2, §3, §4, §5, §8, §9, §10, §11, §12, más su tabla de estado de supuestos
**Trazabilidad downstream:** 01-Necesidades-Negocio, 02-Especificacion-Funcional, 03-UX-UI-DX, 05-Arquitectura-Tecnica, 07-Plan-Sprint, 10-Examples

## Tabla de contenido

- [1. Problema de negocio](#1-problema-de-negocio)
- [2. Audiencia y stakeholders](#2-audiencia-y-stakeholders)
  - [2.1 Tabla de stakeholders](#21-tabla-de-stakeholders)
  - [2.2 Notas sobre la audiencia](#22-notas-sobre-la-audiencia)
- [3. Propuesta de valor](#3-propuesta-de-valor)
  - [3.1 Promesa central](#31-promesa-central)
  - [3.2 Diferenciadores frente al método actual](#32-diferenciadores-frente-al-método-actual)
- [4. Visión a 3 años](#4-visión-a-3-años)
  - [4.1 Estado objetivo](#41-estado-objetivo)
  - [4.2 Lo que se posterga explícitamente](#42-lo-que-se-posterga-explícitamente)
- [5. Objetivos SMART](#5-objetivos-smart)
- [6. Métricas de éxito](#6-métricas-de-éxito)
- [7. Restricciones](#7-restricciones)
- [8. Riesgos](#8-riesgos)
- [9. Glosario del dominio](#9-glosario-del-dominio)
- [10. Trazabilidad](#10-trazabilidad)
  - [10.1 Upstream](#101-upstream)
  - [10.2 Downstream](#102-downstream)
- [Control de cambios](#control-de-cambios)

---

## 1. Problema de negocio

El propietario administra un servidor propio de desarrollo, pequeño y sin redundancia de disco, sobre el que hoy corre un parque de ocho contenedores y dieciocho imágenes. Ese parque creció de forma orgánica: cada servicio se levantó con su propio archivo de composición, sus variables de entorno no versionadas, sus montajes de directorio y su modo de red particular. No existe ningún lugar donde se vea la arquitectura completa de un conjunto de servicios ni la relación entre ellos: saber qué consume qué, con qué dirección y con qué puerto obliga a abrir archivos dispersos y contrastarlos con lo que el motor de contenedores está ejecutando en ese momento.

El costo lo paga una sola persona, que opera el servidor con permisos de administración total. Cada alta de un servicio nuevo es un ejercicio manual de copiar y adaptar; cada dirección IP fija de la red local se anota fuera del sistema; cada arranque de un conjunto de servicios depende de recordar el orden correcto. Ninguna de esas operaciones es catastrófica por separado, pero el costo es permanente y crece con el parque.

La consecuencia de no resolverlo es que el parque sigue creciendo sin registro común. La configuración real vive únicamente en el motor de contenedores y en archivos que no están versionados, el respaldo depende de la memoria del operador y el servidor no tiene redundancia de disco. Cualquier reinstalación obliga a reconstruir la arquitectura desde cero, y esa reconstrucción no está documentada en ningún lado.

El disparador del proyecto es el propio parque existente. La solución tiene que ser adoptable sobre un servidor que ya está en producción y no puede exigir empezar de cero: por eso la capacidad de descubrir contenedores que ya corren e incorporarlos a un proyecto sin reinstanciarlos es el diferencial declarado desde la definición del servicio.

## 2. Audiencia y stakeholders

### 2.1 Tabla de stakeholders

| Rol | Nombre o cargo | Categoría | Nivel de involucramiento | Responsabilidad principal |
|---|---|---|---|---|
| Dueño del problema y administrador único | Propietario del servidor autoalojado de referencia (identificado por rol, que es unívoco en esta solución; S-06 cerrado por identificación de rol el 2026-07-27 según la tabla de estado de supuestos del SOLUTION-INTAKE v1.1: no se aportan nombres propios y no se requieren aguas abajo) | Propietario | Permanente y decisorio | Aprueba el intake, opera la solución y valida cada punto de control de etapa |
| Agente humano del proyecto | El mismo propietario en su rol de validación técnica | Propietario | Permanente y bloqueante | Ejecuta los guiones de demostración, da el OK de cada etapa, fusiona la rama de etapa y avisa el cierre |
| Equipo de desarrollo | Dos desarrolladores, trabajando en etapas en serie | Implementador | Permanente durante la construcción | Construyen y mantienen la solución, con una rama y un pull request por etapa |
| Agente IA de codificación | Orquestador SDD y sus subagentes | Implementador | Permanente durante la construcción | Genera la documentación de especificación y, en etapas posteriores, el código de cada etapa |
| Usuario final: administrador de la solución | Único usuario con credenciales de la aplicación | Beneficiario | Diario, operativo | Crea proyectos, configura servicios en el lienzo, despliega, arranca y detiene |
| Automatismo de integración continua | Flujo de trabajo de integración continua sobre el propio servidor | Beneficiario | Eventual, desatendido | Dispara despliegues con un token de ámbito mínimo, sin intervención humana |

### 2.2 Notas sobre la audiencia

No hay financiador externo ni área a la que rendir resultados: el propietario del problema, el que decide y el que sostiene el costo son la misma persona. Tampoco hay actores de auditoría ni legales, porque el servicio no sale de la red local y no procesa datos personales de terceros.

La audiencia es de dos naturalezas distintas y ambas condicionan el producto. La primera es humana y única: un administrador que opera por navegador y para quien la pantalla principal es el lienzo del proyecto. La segunda es de máquina: automatismos que necesitan disparar un despliegue sin conocer la contraseña del administrador, lo que obliga a una credencial de máquina con ámbitos acotados.

## 3. Propuesta de valor

### 3.1 Promesa central

La arquitectura de un conjunto de servicios pasa a ser un objeto de primera clase, editable en un lienzo, con el despliegue derivado de lo que se dibuja: se agrega el servicio, se traza la dependencia, el sistema propone la variable de entorno correcta según el modo de red, y los cambios se aplican en lote con un único redespliegue de lo afectado.

El método actual —archivos de composición sueltos y variables de entorno no versionadas, servicio por servicio— alcanza para levantar un contenedor, pero no para ver una arquitectura, ni para detectar que dos servicios pelean por la misma dirección de red, ni para saber qué hay que redesplegar cuando cambia el puerto de un servicio del que dependen otros.

### 3.2 Diferenciadores frente al método actual

| # | Diferenciador | Qué resuelve |
|---|---|---|
| DV-01 | Adopción sin reinstanciar | Los contenedores que ya corren se incorporan a un proyecto importando su configuración observada y quedando vinculados por identificador, sin recrearlos ni cortar el servicio. Es lo que hace la solución aplicable sobre un servidor que ya está en producción |
| DV-02 | Separación entre configuración y ejecución | El nodo del lienzo es el servicio, que es permanente y posicionable; el color y la insignia reflejan el despliegue activo, que es volátil. Detener no borra nada |
| DV-03 | Edición transaccional | Los cambios de configuración se acumulan en un changeset con su informe de impacto y se aplican en lote: se revisa antes de aplicar, se descarta lo que no va y se redespliega una sola vez |
| DV-04 | El conflicto de direcciones como regla de negocio | El sistema conoce el rango gestionado, sabe qué direcciones ocupan los servicios activos de otros proyectos y bloquea el arranque ofreciendo resoluciones concretas, en lugar de dejar que falle el motor de contenedores |
| DV-05 | Diseñado para un servidor chico | El dimensionamiento objetivo son decenas de nodos por lienzo y menos de cincuenta contenedores en el parque. Nada se optimiza para escalas que este caso no tiene, y nada puede degradarse con treinta nodos |

## 4. Visión a 3 años

### 4.1 Estado objetivo

A tres años, el parque completo del servidor de referencia está representado en la solución: cada contenedor en ejecución pertenece a un proyecto declarado, con su red, sus direcciones reservadas y su disposición en el lienzo. La pregunta "qué consume qué y con qué dirección" se responde mirando una pantalla, no abriendo archivos.

La arquitectura de cada proyecto es reproducible fuera del servidor: existe una exportación vigente que permite reconstruir el conjunto en otra máquina sin filtrar credenciales, y esa exportación es la estrategia de respaldo efectiva frente a un servidor sin redundancia de disco.

El alta de un servicio nuevo deja de ser un ejercicio de copiar y adaptar. El catálogo de servicios reutilizables cubre los casos frecuentes del propietario, y la publicación de una versión nueva puede dispararse desde un automatismo con una credencial de ámbito mínimo, sin que ningún flujo de trabajo conozca la contraseña del administrador.

El avance hacia ese estado no se mide por fechas de calendario. El plazo declarado por el cliente es explícitamente "sin fecha objetivo": el progreso se mide por etapas cerradas, cada una con su punto de control aprobado. La secuencia de alcances y las condiciones de transición están en `Roadmap-Producto-v1.0.md`.

### 4.2 Lo que se posterga explícitamente

- La operación de más de un servidor y de más de un inquilino. La solución nace y permanece atada a un servidor y a un administrador únicos.
- La exposición del servicio fuera de la red local. Podría incorporarse el día que exista una capa adicional de protección; hoy esa capa está fuera de alcance.
- La gestión de dominios públicos y del enrutamiento de entrada. Su consecuencia asumida es que el reemplazo de la versión de un servicio implica detener y arrancar, con una ventana de indisponibilidad que la interfaz debe advertir.
- La distribución de tráfico entre réplicas. Mientras no exista, el escalado horizontal sirve para procesos sin tráfico entrante.
- La gestión de múltiples usuarios, roles y permisos, y el segundo factor de autenticación.

El detalle de cada exclusión, con su justificación y su versión futura tentativa, está en `Alcance-Proyecto-v1.0.md` §5.

## 5. Objetivos SMART

| ID | Objetivo | Métrica | Target numérico | Plazo | Responsable |
|---|---|---|---|---|---|
| OBJ-01 | Incorporar el parque existente a la solución sin reinstanciar contenedores | Contenedores en ejecución del parque relevado incorporados a un proyecto, sobre el total relevado | ≥ 6 de 8 contenedores (≥ 75 %) | 3 meses desde el cierre del Alcance 1 | Administrador de la solución |
| OBJ-02 | Reemplazar el alta manual de servicios por el alta desde la solución | Altas de servicio nuevas realizadas desde la solución sobre el total de altas nuevas | ≥ 90 % | 6 meses desde el cierre del Alcance 1 | Administrador de la solución |
| OBJ-03 | Hacer reproducible la arquitectura de cada proyecto fuera del servidor | Proyectos con exportación vigente sobre el total de proyectos declarados, con antigüedad de la exportación menor a 7 días | 100 % de los proyectos | 3 meses desde el cierre del Alcance 3 | Administrador de la solución |
| OBJ-04 | Sostener la entrega por etapas sin regresión acumulada | Etapas cerradas con su guion de demostración ejecutado y con los guiones de todas las etapas anteriores pasando sin corrección | 100 % de las etapas | Durante toda la construcción | Agente humano del proyecto y equipo de desarrollo |
| OBJ-05 | Operar la escala real del servidor de referencia sin degradación perceptible | Nodos por lienzo y contenedores por parque soportados con actualización de estado periódica y sin retraso perceptible en el arrastre | 30 nodos y 40 aristas por lienzo; menos de 50 contenedores en el parque | Verificado en la puerta técnica PT-01, antes de comprometer el corte del lienzo | Equipo de desarrollo |

Origen de los datos. OBJ-01 a OBJ-04 derivan de las cuatro métricas de éxito del SOLUTION-INTAKE §8, propuestas por el intake bajo el marcador S-01 y confirmadas sin cambios por el agente humano del proyecto el 2026-07-27, según la tabla de estado de supuestos del SOLUTION-INTAKE v1.1, que es la fuente de verdad de ese estado. OBJ-01 traduce a valor absoluto (6 de 8) el porcentaje declarado, tomando el tamaño del parque relevado del anexo E-19 del intake. OBJ-05 combina los umbrales de la puerta técnica PT-01 con el dimensionamiento verificado del SOLUTION-INTAKE v1.1 §17.1 P.10; su formulación como objetivo de negocio es una derivación de este documento y sigue marcada para confirmación: la batería de validación del 2026-07-27 no la alcanzó.

## 6. Métricas de éxito

| Criterio | Métrica | Target | Plazo | Fuente del dato |
|---|---|---|---|---|
| Adopción del parque existente | Porcentaje de los contenedores en ejecución del servidor de referencia incorporados a un proyecto de la solución sin haber sido reinstanciados | ≥ 75 % de los 8 contenedores del parque relevado | 3 meses desde el cierre del Alcance 1 | SOLUTION-INTAKE v1.1 §8; S-01 confirmado el 2026-07-27, tabla de estado de supuestos; inventario del parque en el anexo E-19 del intake |
| Reemplazo del método manual | Porcentaje de altas de servicio nuevas realizadas desde la solución en lugar de por archivo de composición editado a mano | ≥ 90 % de las altas nuevas | 6 meses desde el cierre del Alcance 1 | SOLUTION-INTAKE v1.1 §8; S-01 confirmado el 2026-07-27, tabla de estado de supuestos |
| Reproducibilidad de la arquitectura | Cantidad de proyectos con exportación vigente sobre el total de proyectos declarados | 100 % de los proyectos, con exportación de antigüedad menor a 7 días | 3 meses desde el cierre del Alcance 3 | SOLUTION-INTAKE v1.1 §8; S-01 confirmado el 2026-07-27, tabla de estado de supuestos |
| Continuidad de la entrega | Porcentaje de etapas cerradas con su guion de demostración ejecutado y con los guiones de todas las etapas anteriores pasando sin corrección | 100 % de las etapas | Durante toda la construcción | SOLUTION-INTAKE v1.1 §8; S-01 confirmado el 2026-07-27, tabla de estado de supuestos; regla de no-regresión acumulativa del §15 |

Quién mide y con qué. Las cuatro métricas las verifica el agente humano del proyecto. Las tres primeras se leen del propio sistema una vez que exista la capacidad correspondiente, contrastadas contra el inventario del parque; la cuarta se lee de los informes de cierre de etapa y de su índice. La categoría 08-Calidad-Y-Pruebas es la responsable de definir cómo se instrumenta cada lectura.

## 7. Restricciones

| ID | Restricción | Valor declarado | Consecuencia para el producto |
|---|---|---|---|
| RE-01 | Tamaño del equipo | Dos desarrolladores | La planificación no admite trabajo en paralelo entre etapas: se trabaja en serie |
| RE-02 | Plazo | Sin fecha objetivo. El avance se mide por etapas cerradas, y cada etapa termina en un punto de control con OK explícito del agente humano | El roadmap se expresa por hitos y por etapas, nunca por fechas de calendario |
| RE-03 | Restricción económica | No hay presupuesto monetario asignado ni previsto. La restricción efectiva es que toda dependencia debe ser de licencia abierta y permisiva, sin costo de licencia ni de suscripción | Ninguna capacidad puede depender de un producto de licencia comercial |
| RE-04 | Modo de trabajo | Etapas en serie. No se abre la rama de una etapa antes de que se haya fusionado la anterior; el punto de control es un cuello por diseño | El punto de control bloquea el avance, y es una decisión aceptada, no un impedimento a resolver |
| RE-05 | Integración obligatoria | El motor de contenedores del propio servidor, accedido por su socket local. No es una integración opcional: es el sustrato del producto | El producto no existe sin el motor de contenedores del host, y hereda sus límites |
| RE-06 | Plataforma de destino | Un servidor de gama modesta: cuatro núcleos de generación antigua, memoria a mitad de uso con presión de intercambio, y un único disco sin redundancia | La solución debe ser liviana, con presupuesto de memoria de cientos de MB, y sin sondeo agresivo de métricas |
| RE-07 | Alcance de red | El servicio se expone sólo en la red local y no se publica a internet | No hay superficie pública, y el acceso remoto queda fuera de alcance |
| RE-08 | Entorno de construcción | El ciclo de desarrollo ocurre íntegramente dentro de un entorno contenedorizado declarativo; el host de desarrollo no lleva instaladas las herramientas de construcción y no se van a instalar | Ningún procedimiento, guion ni demostración puede asumir herramientas disponibles en el host. El detalle está en `Compatibilidad-Plataformas-v1.0.md` |
| RE-09 | Marco normativo | Ninguna restricción legal ni regulatoria declarada. El servicio no procesa datos personales de terceros, no sale de la red local y tiene un único usuario | No hay requisitos de cumplimiento normativo que condicionen el alcance |
| RE-10 | Flujo de trabajo obligatorio | Una rama y un pull request por etapa, siendo el pull request el punto de control; etiqueta por etapa cerrada; ningún secreto entra al repositorio | Las reglas operativas están en `Acuerdo-Equipo-v1.0.md` |
| RE-11 | Documentación obligatoria por etapa | Cada etapa cierra con un informe autocontenido de trece secciones, escrito antes de convocar el punto de control | El informe es entregable al mismo nivel que el código: sin informe no hay etapa terminada |
| RE-12 | Disponibilidad y tiempos de respuesta | No hay horario core, ni franja de disponibilidad comprometida, ni plazo máximo de respuesta. El punto de control bloquea hasta el OK explícito del agente humano, y ese bloqueo no vence | Refuerza a RE-02: además de no haber fecha objetivo, tampoco hay un plazo que limite cuánto puede esperar una etapa terminada su validación. Es la razón de fondo por la que el avance no se puede comprometer contra un calendario. Su traducción operativa está en `Acuerdo-Equipo-v1.0.md` §4.6 |

## 8. Riesgos

| ID | Riesgo | Probabilidad | Impacto | Mitigación | Responsable |
|---|---|---|---|---|---|
| RG-01 | Fluidez insuficiente del lienzo con decenas de nodos, siendo el lienzo la pantalla principal del producto | Media | Alto | Puerta técnica PT-01, medida antes de comprometer el corte del lienzo, con sus cuatro mitigaciones asociadas de manejo del gesto, movimiento visual, virtualización de nodos y transporte de la sesión garantizado | Equipo de desarrollo |
| RG-02 | Mecanismo de autenticación inadecuado para un servicio que controla el host | Media | Alto | Sesión de la interfaz separada de las credenciales de máquina: la interfaz usa sesión de usuario y los automatismos usan tokens con ámbitos acotados. El esquema de credenciales por contraseña directa queda descartado | Equipo de desarrollo |
| RG-03 | El acceso al socket del motor de contenedores equivale a control total del host | Alta, inherente al diseño | Muy alto | No exponer el servicio fuera de la red local, emitir tokens de ámbito mínimo y auditar toda operación de escritura | Propietario del servidor y equipo de desarrollo |
| RG-04 | Monitoreo inviable por red cuando los contenedores tienen dirección propia en la red local | Alta | Medio | Observar el estado por el motor de contenedores, nunca por peticiones contra el servicio | Equipo de desarrollo |
| RG-05 | Desfase entre la herramienta de acceso al motor de contenedores y la versión del motor instalado en el servidor | Media | Medio | Usar la variante mantenida y aislarla detrás de una única frontera de integración, verificable por construcción | Equipo de desarrollo |
| RG-06 | Concurrencia de escritura sobre el almacenamiento local del administrador entre la interfaz, la interfaz de máquina y los procesos en segundo plano | Media | Medio | Modo de diario concurrente, tiempo de espera de bloqueo fijado explícitamente y operaciones de despliegue serializadas por proyecto | Equipo de desarrollo |
| RG-07 | Ausencia de redundancia de disco en el servidor de referencia | Alta | Alto para el usuario, no para el software | Exportación periódica de proyectos y catálogo a un destino externo, facilitada por el propio servicio | Propietario del servidor |
| RG-08 | Deriva entre el estado registrado por la solución y el motor de contenedores cuando alguien opera contenedores por fuera | Alta | Medio | Reconciliación periódica y estado huérfano explícito en el nodo | Equipo de desarrollo |
| RG-09 | Secretos importados durante la adopción que terminen visibles | Media | Alto | Enmascarado por heurística de sensibilidad en la importación, y regla de no devolver secretos en texto plano ni por la interfaz de máquina ni en exportaciones. Ver el caso límite CL-15, abierto, en `Alcance-Proyecto-v1.0.md` §6 | Equipo de desarrollo |
| RG-10 | Alcance creciente del lienzo, con disposición automática, rutas ortogonales y deshacer y rehacer | Media | Medio | Fijar el alcance visual del primer incremento; el deshacer y rehacer se apoyan en el changeset y no en la capacidad de la herramienta de dibujo | Product Manager y equipo de desarrollo |

Supuesto crítico. El supuesto que, de romperse, obliga a replanificar es que un lienzo de treinta nodos sea fluido en red local con el modelo de interacción elegido. Es exactamente lo que mide la puerta técnica PT-01. Su falla no invalida el producto, pero sí obliga a cambiar la herramienta del lienzo y a replanificar ese corte.

No hubo un intento previo de construir esta herramienta. Sí hubo un análisis funcional previo sobre una plataforma comercial equivalente, del que se toma el modelo de abstracción, la semántica de las aristas y el patrón de cambios en lote. El método actual no falló: se volvió insuficiente al crecer el parque.

## 9. Glosario del dominio

| Término | Definición | Sinónimos o notas |
|---|---|---|
| Adopción | Incorporación de un contenedor ya existente en el servidor a un proyecto, sin recrearlo: sólo se importa su configuración y se lo vincula por identificador | Es el diferenciador DV-01 |
| Alias DNS | Nombre por el que un contenedor es resoluble dentro de una red definida por el usuario | Suele coincidir con el nombre del servicio |
| Arista o enlace | Conexión dibujada en el lienzo. Representa que un servicio consume, por variable de entorno, la dirección y el puerto de otro | Enlace |
| Autoarranque | Marca que indica que un proyecto o servicio debe levantarse al iniciar el sistema administrador | — |
| Ámbito | Permiso concreto asociado a un token de API, por ejemplo el de ejecutar despliegues | Alcance del token |
| Bridge | Red virtual del motor de contenedores con su propia subred privada; sus miembros se resuelven por nombre y publican puertos en el host | Uno de los dos modos de red soportados |
| Canvas o lienzo | Vista por defecto de un proyecto: espacio visual donde cada bloque es un servicio y cada arista una dependencia | Lienzo. Es la pantalla principal del producto |
| Changeset | Conjunto de cambios de configuración acumulados y pendientes de aplicar en lote sobre un proyecto | Cajón de cambios pendientes |
| Despliegue | Intento concreto de materializar la configuración de un servicio: el contenedor creado, con su ciclo de vida | Se opone a servicio, que es la configuración |
| Efímero | Servicio pensado para reconstruirse en cada uso, sin estado persistente propio | — |
| Escalado horizontal | Agregar réplicas del mismo servicio. En esta solución, manual | — |
| Escalado vertical | Aumentar los recursos de procesamiento y memoria asignados a un servicio. En esta solución, manual | — |
| Etapa | Unidad de entrega del proyecto. Se especifica con una plantilla obligatoria, termina en un punto de control y se corresponde con una rama y un pull request | No confundir con fase del roadmap: una fase agrupa varias etapas |
| Hito demostrable | Etapa que entrega un flujo de usuario completo y operativo, y se ejecuta y recorre delante del cliente | Abreviado HD |
| Hito interno | Etapa que confirma decisiones estructurales caras de revertir; la valida el agente humano y no se muestra al cliente | Abreviado HI |
| Huérfano | Servicio cuyo contenedor vinculado ya no existe en el motor de contenedores | Es un estado explícito del nodo |
| Informe de cierre | Documento autocontenido de trece secciones que cierra cada etapa, publicado antes de convocar el punto de control | Está escrito para quien no vio escribir el código y va a probarlo |
| Macvlan | Modo de red en el que el contenedor obtiene una dirección propia de la red local y aparece como un equipo más. El host no lo alcanza por la misma placa | Uno de los dos modos de red soportados |
| Modo pendiente | Estado visual de un nodo o arista que existe en el changeset pero todavía no se aplicó | — |
| Motor de contenedores | Servicio del host que crea y ejecuta los contenedores. Es la fuente de verdad del estado real y el sustrato del producto | Se accede por su socket local |
| Política de reinicio | Regla que indica si el contenedor debe reiniciarse solo, y bajo qué condición | — |
| Proyecto | Unidad de agrupación del producto: la arquitectura completa de servicios contenedorizados, con su red y su lienzo | No confundir con el proyecto de la composición de la especificación: `SelfHosted-Web`, `SelfHosted-Application`, `SelfHosted-Infrastructure` y `SelfHosted-Domain` son proyectos de composición, no proyectos del producto |
| Puerta técnica | Verificación medida que condiciona una decisión de arquitectura. Una puerta que no pasa detiene la planificación de lo que depende de ella | Abreviadas PT-01 y PT-02 |
| Réplica | Cada instancia paralela de un mismo servicio | — |
| Servicio | La configuración de un contenedor dentro de un proyecto: origen, variables, red, montajes y límites. No tiene estado de encendido | Es el nodo del lienzo |
| Socket del motor de contenedores | Punto de acceso local a la interfaz del motor de contenedores. Acceder a él equivale a control administrativo del host | Justifica el riesgo RG-03 |
| Token de API | Credencial de máquina, con ámbitos y vigencia, revocable individualmente, usada por automatismos | Se muestra una única vez |
| Variable de enlace | Variable de entorno generada automáticamente a partir de una arista del lienzo | — |
| Verificación de salud | Comprobación periódica declarada en la imagen o en el servicio que determina si el contenedor está sano | Healthcheck |

## 10. Trazabilidad

### 10.1 Upstream

| Sección de este documento | Origen en el SOLUTION-INTAKE |
|---|---|
| 1. Problema de negocio | §1, y el anexo E-19 para el tamaño del parque |
| 2. Audiencia y stakeholders | §2, y la tabla de estado de supuestos para S-06, cerrado por identificación de rol |
| 3. Propuesta de valor | §3, y §5 para las experiencias deseadas que sostienen la promesa central y los cinco diferenciadores |
| 4. Visión a 3 años | §3, §4, §9 y §10 |
| 5. Objetivos SMART | §8 con S-01 confirmado el 2026-07-27, y §17.1 P.10 para el dimensionamiento de OBJ-05 |
| 6. Métricas de éxito | §8 con S-01 confirmado el 2026-07-27, y §15 para la regla de no-regresión |
| 7. Restricciones | §10 |
| 8. Riesgos | §11 |
| 9. Glosario del dominio | §12 |

### 10.2 Downstream

| Categoría | Qué consume de este documento |
|---|---|
| 01-Necesidades-Negocio | El problema, la propuesta de valor y los objetivos SMART, como origen de cada necesidad de negocio |
| 02-Especificacion-Funcional | El glosario del dominio, como vocabulario obligatorio de casos de uso y reglas de negocio |
| 03-UX-UI-DX | La audiencia, el diferenciador DV-02 sobre configuración y ejecución, y el estado visual pendiente del lienzo |
| 05-Arquitectura-Tecnica | Las restricciones RE-05, RE-06 y RE-07, y los riesgos RG-01 a RG-10, como origen de decisiones de arquitectura y de sus registros |
| 07-Plan-Sprint | Los objetivos SMART y la métrica de continuidad de la entrega, como criterio de cierre de cada etapa |
| 08-Calidad-Y-Pruebas | Las métricas de éxito, que definen qué hay que poder medir |
| 10-Examples | El diferenciador DV-01 y el dimensionamiento de OBJ-05, que las materializaciones de las puertas técnicas deben ejercitar |

---

## Control de cambios

| Versión | Fecha | Cambios | Autor |
|---|---|---|---|
| 1.0 | 2026-07-27 | Versión inicial, derivada del SOLUTION-INTAKE-SelfHosted-Service-Core-v1.1. Cinco objetivos SMART, cuatro métricas de éxito, diez riesgos y veintinueve términos de glosario, veintiocho de ellos tomados del glosario del intake | Product Manager Senior (AG-00) con Analista de Negocio Senior (AG-01) |
| 1.0 | 2026-07-27 | Corrección dentro del ciclo de emisión, sin cambio de versión, por el audit `A-00-Contexto-v1.0.md`. P1-01: se regeneraron las cuatro anclas de la tabla de contenido que no resolvían, conservando tildes y eñes. P3-05: §10.1 mapea ahora §5 del intake, que la cabecera declaraba sin mapear | Product Manager Senior (AG-00) con Analista de Negocio Senior (AG-01) |
| 1.0 | 2026-07-27 | Cierre del hallazgo P0-01 del audit `A-00-Contexto-v1.0.md`, sin cambio de versión. Las afirmaciones sobre el estado de los supuestos citan ahora la tabla de estado del SOLUTION-INTAKE v1.1 con su fecha de confirmación: §5 y las cuatro filas de §6 para S-01, confirmado el 2026-07-27; §2.1 y §10.1 para S-06, cerrado por identificación de rol el 2026-07-27, que deja de tratarse como brecha. Ningún valor numérico cambió: los cuatro targets de §6 y los cinco objetivos de §5 son los mismos. Se actualizó la referencia al intake de la versión 1.0 a la 1.1 en la cabecera y en el control de cambios | Product Manager Senior (AG-00) con Analista de Negocio Senior (AG-01) |
| 1.0 | 2026-07-27 | Cierre del hallazgo V-04 del re-audit `A-00-Contexto-v2.0.md` §12.5, sin cambio de versión. §7 incorpora RE-12, «Disponibilidad y tiempos de respuesta», que el intake sumó a su §10 al consolidar la decisión sobre horario core y plazo de respuesta. Se incorpora en lenguaje de negocio y por su consecuencia sobre el compromiso de plazos, que es lo que hace a la visión, con la traducción operativa delegada a `Acuerdo-Equipo-v1.0.md` §4.6. El cambio se propagó a `Alcance-Proyecto-v1.0.md` §7, que lee las restricciones en clave de alcance y ahora cubre las doce | Product Manager Senior (AG-00) con Analista de Negocio Senior (AG-01) |
