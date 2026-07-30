# Alcance del Proyecto

**Proyecto:** SelfHosted.Service.Core (solución; proyecto principal SelfHosted-Web)
**Documento:** Alcance-Proyecto-v1.2.md
**Versión:** 1.2
**Estado:** Propuesto
**Fecha:** 2026-07-28
**Autor:** Product Manager Senior (AG-00) en conjunción con Analista de Negocio Senior (AG-01)
**Trazabilidad upstream:** SOLUTION-INTAKE v1.2 §1, §4, §5, §6, §7, §8, §9, §10, §11, §15, más su tabla de estado de supuestos
**Trazabilidad downstream:** 01-Necesidades-Negocio, 02-Especificacion-Funcional, 03-UX-UI-DX, 05-Arquitectura-Tecnica, 06-Backlog, 07-Plan-Sprint, 08-Calidad-Y-Pruebas, 10-Examples

## Tabla de contenido

- [1. Propósito](#1-propósito)
- [2. Descripción general](#2-descripción-general)
- [3. Objetivos del proyecto](#3-objetivos-del-proyecto)
- [4. Alcance incluido](#4-alcance-incluido)
  - [4.1 Capacidades](#41-capacidades)
  - [4.2 Entregables](#42-entregables)
  - [4.3 Ambientes](#43-ambientes)
- [5. Alcance excluido](#5-alcance-excluido)
  - [5.1 Exclusiones de producto](#51-exclusiones-de-producto)
  - [5.2 Exclusiones de proceso](#52-exclusiones-de-proceso)
- [6. Supuestos](#6-supuestos)
  - [6.1 Supuestos cerrados del intake](#61-supuestos-cerrados-del-intake)
  - [6.2 Supuestos abiertos](#62-supuestos-abiertos)
- [7. Restricciones](#7-restricciones)
- [8. Criterios de aceptación del proyecto](#8-criterios-de-aceptación-del-proyecto)
- [9. Gestión de cambios de alcance](#9-gestión-de-cambios-de-alcance)
- [10. Trazabilidad](#10-trazabilidad)
  - [10.1 Upstream](#101-upstream)
  - [10.2 Downstream](#102-downstream)
- [Control de cambios](#control-de-cambios)

---

## 1. Propósito

Este documento fija qué construye el proyecto y qué no, para que ninguna categoría posterior de la especificación tenga que volver a preguntárselo al cliente. Traduce a capacidades, entregables, exclusiones y criterios de aceptación el alcance funcional pretendido y las exclusiones declaradas en el SOLUTION-INTAKE, y deja registrados los supuestos que todavía condicionan decisiones aguas abajo.

El alcance se expresa en lenguaje de negocio. Las decisiones de plataforma, versiones y matrices de soporte están en `Compatibilidad-Plataformas-v1.2.md`; la secuencia de construcción está en `Roadmap-Producto-v1.2.md`; las reglas de trabajo del equipo están en `Acuerdo-Equipo-v1.2.md`.

## 2. Descripción general

El proyecto construye un administrador de servicios contenedorizados para un único servidor autoalojado y un único administrador. Su unidad de trabajo es el proyecto: una arquitectura completa de servicios, con su modo de red, sus direcciones reservadas y su disposición en un lienzo visual editable.

Sobre esa unidad, el administrador da de alta servicios, traza dependencias entre ellos, acumula cambios de configuración y los aplica en lote, despliega, arranca y detiene, y observa el estado real de lo que está corriendo. Puede además definir a nivel proyecto los valores que varios servicios comparten, y hacer que el valor de una variable apunte a otra en lugar de repetirse, de modo que un dato que cambia se actualice en un solo lugar. Trazar una dependencia en el lienzo y apuntar una variable a otra son el mismo acto: la flecha es la forma cómoda de escribir esa referencia, no un mecanismo distinto. La solución también descubre los contenedores que ya existen en el servidor y permite incorporarlos a un proyecto sin reinstanciarlos, que es la condición para que sea adoptable sobre un servidor en producción.

La fuente de verdad del estado es siempre el motor de contenedores del propio servidor. La solución no reemplaza a ese motor: lo gobierna y lo hace legible, y guarda la configuración declarada que hasta hoy vivía en archivos dispersos y sin versionar.

## 3. Objetivos del proyecto

| ID | Objetivo del proyecto | Objetivo de negocio que sirve |
|---|---|---|
| OP-01 | Entregar un registro único y navegable de la arquitectura de cada conjunto de servicios del servidor | OBJ-01 y OBJ-02 de `Vision-Producto-v1.2.md` |
| OP-02 | Permitir incorporar el parque existente sin cortar servicio ni reinstanciar contenedores | OBJ-01 |
| OP-03 | Hacer que el despliegue derive de la configuración declarada, con revisión previa del impacto | OBJ-02 |
| OP-04 | Convertir el conflicto de direcciones de red en una regla verificada antes de arrancar, con resoluciones ofrecidas | OBJ-02 |
| OP-05 | Dejar la arquitectura de cada proyecto reproducible fuera del servidor, sin filtrar credenciales | OBJ-03 |
| OP-06 | Entregar el producto por etapas cerradas y demostrables, sin regresión acumulada | OBJ-04 |
| OP-07 | Sostener la escala real del servidor de referencia sin degradación perceptible | OBJ-05 |

## 4. Alcance incluido

### 4.1 Capacidades

Las capacidades se enumeran con el identificador del SOLUTION-INTAKE §4, que es el que consumen las categorías 01 y 02. La prioridad MoSCoW traduce la pertenencia de cada capacidad a uno de los cuatro alcances incrementales; el reparto por fases está en `Roadmap-Producto-v1.2.md`.

| ID | Capacidad incluida | Prioridad |
|---|---|---|
| F-01 | Alta del administrador único en el primer arranque, con validación de contraseña, sesión recordada, cambio de contraseña y cierre de sesión | Must Have |
| F-02 | Alta, listado, renombrado y eliminación de proyectos, con su modo de red y su persistencia | Must Have |
| F-03 | Alta y configuración de servicios de un proyecto: origen de imagen, variables, puertos, montajes, dispositivos, capacidades, recursos, política de reinicio y marca de efímero | Must Have |
| F-04 | Lienzo visual: nodos de servicio, aristas de dependencia, desplazamiento, zoom, agrupación y disposición persistente por proyecto | Must Have |
| F-05 | Despliegue de un servicio desde imagen de registro público, con estado real reflejado en el nodo y acceso a los registros del contenedor | Must Have |
| F-06 | Arranque y parada del proyecto completo y de cada servicio, con marca de autoarranque y respeto del orden topológico del grafo | Must Have |
| F-07 | Changeset de cambios pendientes con informe de impacto y aplicación en lote con redespliegue de lo afectado | Must Have |
| F-08 | Rango de direcciones gestionado, reserva por servicio y bloqueo del arranque ante conflicto con un servicio activo de otro proyecto, con resoluciones ofrecidas | Must Have |
| F-09 | Escalado horizontal y vertical manuales: réplicas y límites de procesamiento y memoria | Must Have |
| F-10 | Despliegue construyendo la imagen desde una definición local o desde un repositorio remoto, con seguimiento del progreso de construcción | Must Have |
| F-11 | Descubrimiento de contenedores existentes en el servidor y adopción a un proyecto sin reinstanciarlos, con las salvaguardas de aislamiento | Must Have |
| F-12 | Tablero en tres capas: estado del servidor, vista general por proyecto y vista por contenedor | Should Have |
| F-13 | Exportación e importación de la arquitectura completa de un proyecto en formato estándar de composición, más el manifiesto propio que preserva la disposición del lienzo. La importación devuelve un informe de qué se creó y qué no se pudo representar, para que ninguna pérdida de traducción quede silenciosa | Should Have |
| F-14 | Catálogo editable, exportable e importable de plantillas reutilizables, con parámetros. Es la cuarta vía de alta de un servicio, junto a las tres variantes de origen, y un ítem puede contener uno o varios servicios con sus dependencias | Should Have |
| F-15 | Tokens de API con ámbitos, vigencia y revocación inmediata, emitidos desde la interfaz | Should Have |
| F-16 | Disparo de despliegue desde un automatismo de integración continua con token de ámbito mínimo | Could Have |
| F-17 | Exportación programada de proyectos y catálogo a un destino externo como estrategia de respaldo | Could Have |
| F-23 | Variables compartidas del proyecto: definidas una vez a nivel proyecto, secretas o no, y referenciables desde cualquiera de sus servicios | Should Have |
| F-24 | Referencias entre variables: el valor de una variable puede apuntar a otra del propio servicio, a una compartida del proyecto o a una de otro servicio del mismo proyecto, en lugar de repetirse como literal | Should Have |

Tres precisiones de alcance incorporadas el 2026-07-28 por decisión del agente humano del proyecto, según la sección de decisiones del SOLUTION-INTAKE v1.2. Primera, sobre F-14: el catálogo es una vía de alta y no un origen de imagen más, nada de lo que contiene está corriendo, arranca vacío en una instalación nueva y un ítem puede traer varios servicios con sus dependencias, no uno solo. Segunda, F-23 y F-24 son capacidades nuevas que resuelven el mismo dolor —un valor que hoy hay que escribir y mantener sincronizado en cada servicio que lo usa— y entran como Should Have porque los diez cortes verticales del primer alcance están declarados de forma cerrada y ninguna de las dos figura entre ellos. Tercera, su ubicación en una fase concreta es una pendiente declarada, registrada en §6.2 y en `Roadmap-Producto-v1.2.md` §2.4.

Una precisión posterior, del 2026-07-28, sobre cómo se relacionan F-04 y F-24: el vínculo entre dos servicios es un mecanismo único. Trazar la arista en el lienzo escribe una referencia, de modo que no hay una forma de vincular por dirección y otra por dato, sino una sola con dos efectos distintos. Cuando lo referenciado es la dirección o el puerto del destino, el vínculo declara consumo por red y ordena el arranque; cuando es cualquier otro dato, no lo ordena, porque el valor se resuelve del registro sin que el destino tenga que estar corriendo. La consecuencia de alcance es que el lienzo y las referencias no son dos capacidades separables: la primera se apoya en la segunda.

Salvaguardas de aislamiento incluidas en el alcance, que acompañan a F-11 y a toda operación sobre el motor de contenedores: prefijo de nombre reservado y configurable, distinto en desarrollo y en producción; etiquetas de pertenencia con identificador de proyecto y de servicio como fuente de verdad; rango de direcciones de desarrollo distinto del de producción y sin solapamiento; confirmación explícita escribiendo el nombre para adoptar o detener un contenedor ajeno a la solución; y descubrimiento en modo sólo lectura, donde listar no habilita operar. A esas salvaguardas se suma, desde la decisión D-2 del 2026-07-28, un paso obligatorio de clasificación: la adopción de un contenedor no se completa hasta que el administrador declara cuáles de sus variables son secretas. El sistema sugiere, pero no decide por él.

### 4.2 Entregables

| ID | Entregable | Descripción |
|---|---|---|
| EN-01 | Aplicación desplegable en el servidor de referencia | Único artefacto ejecutable de la solución, que expone la interfaz del administrador y la interfaz para automatismos |
| EN-02 | Especificación de la solución | El conjunto de categorías de documentación de `SDD/Docs/`, del que este documento forma parte |
| EN-03 | Informe de cierre por etapa | Documento autocontenido de trece secciones por etapa, publicado antes de convocar el punto de control, con su índice acumulativo |
| EN-04 | Guion de demostración por etapa | Recorrido reproducible que el agente humano ejecuta en el punto de control, y que debe seguir pasando en todas las etapas posteriores |
| EN-05 | Materializaciones de las puertas técnicas | Los ejemplos ejecutables que verifican PT-01, fluidez del lienzo, y PT-02, verificación del motor de contenedores |
| EN-06 | Juego de datos de siembra | Conjunto de datos que reproduce el parque de referencia, para recorrer el producto sin configurar nada a mano |
| EN-07 | Registro de cambios de la solución | Archivo de cambios actualizado en la rama de cada etapa, con una etiqueta por etapa cerrada |

### 4.3 Ambientes

| Ambiente | Qué es | Quién lo usa | Notas |
|---|---|---|---|
| Desarrollo | Entorno contenedorizado declarativo sobre el host de desarrollo, con acceso al motor de contenedores del propio host | Equipo de desarrollo y agente IA de codificación | El resultado se observa desde el navegador del host. El detalle de plataforma está en `Compatibilidad-Plataformas-v1.2.md` |
| Producción | La solución corriendo como un contenedor más en el servidor de referencia, en la red local | Administrador de la solución y automatismos | Es el mismo servidor que la solución administra |

No hay ambiente intermedio de pruebas ni de preproducción. El punto de control de cada etapa cumple esa función, ejecutado sobre el ambiente de desarrollo. Es una decisión declarada por el cliente, no una omisión.

## 5. Alcance excluido

### 5.1 Exclusiones de producto

| Funcionalidad excluida | Justificación | Versión futura tentativa |
|---|---|---|
| Operación multiinquilino y orquestación de clúster | Hay un único administrador y un único servidor. Incorporar inquilinos exigiría un modelo de identidad, de aislamiento y de cuotas que multiplica el alcance sin resolver el problema del propietario | No planificado |
| Administración de proxies y proxies inversos, y de dominios públicos gestionados (F-19) | Declarado fuera de alcance desde la definición del servicio. Consecuencia aceptada: el reemplazo de la versión de un servicio es detener y arrancar, con ventana de indisponibilidad que la interfaz debe advertir al confirmar el redespliegue | No planificado |
| Balanceo de carga entre réplicas y despliegue sin interrupción con solapamiento de versiones (F-20) | Sin capa de enrutamiento de entrada no hay quién distribuya tráfico entre réplicas. Consecuencia aceptada: en este alcance el escalado horizontal sirve para procesos sin tráfico entrante | Condicionada a que entre en alcance la capa de enrutamiento |
| Exposición del servicio a internet | El acceso al socket del motor de contenedores equivale a control total del host: exponerlo sin una capa adicional de protección es un riesgo desproporcionado | Condicionada a una capa de protección adicional, hoy fuera de alcance |
| Gestión de múltiples usuarios, roles y permisos (F-21) | Un solo administrador. El modelo de identidad elegido no bloquea incorporarlo más adelante, pero el primer alcance no lo incluye | No planificado para v1 |
| Segundo factor de autenticación (F-18) | Un único usuario en red local. El modelo de identidad elegido no lo bloquea | Backlog posterior a v1 |
| Recuperación de contraseña (F-22) | Con un único usuario y acceso físico al archivo de datos, el mecanismo aportaría superficie de ataque sin resolver un problema real | No planificado |
| Monitoreo de los servicios por peticiones de red contra ellos | Cuando los contenedores tienen dirección propia en la red local, el host no los alcanza por la misma placa. La fuente de verdad del estado es el motor de contenedores: estado del contenedor, verificación de salud declarada en la imagen y estadísticas de uso | No planificado |
| Escalado horizontal de la propia solución | Una sola instancia gobierna un solo servidor; dos instancias sobre el mismo almacenamiento no están contempladas | No planificado |

### 5.2 Exclusiones de proceso

| Excluido | Justificación | Versión futura tentativa |
|---|---|---|
| Ambiente de preproducción o de control de calidad separado | El punto de control de cada etapa, ejecutado sobre el ambiente de desarrollo, cumple esa función. Declarado por el cliente | No planificado mientras rija el modo de trabajo declarado |
| Fechas de calendario comprometidas | El plazo declarado es "sin fecha objetivo": el avance se mide por etapas cerradas con punto de control aprobado | No planificado mientras rija el modo de trabajo declarado |
| Trabajo en paralelo entre etapas | Las etapas son en serie por decisión del cliente: no se abre la rama de una etapa antes de fusionar la anterior | No planificado mientras rija el modo de trabajo declarado |
| Automatización de los guiones de demostración | Son la demostración al cliente y se ejecutan manualmente. Lo que protegen las pruebas automatizadas no debe depender de ellos | No planificado mientras rija el modo de trabajo declarado |

Las cuatro exclusiones de proceso son permanentes mientras rija el modo de trabajo declarado por el cliente. Revisarlas exige cambiar ese modo de trabajo, no ampliar el alcance del producto: es una decisión del agente humano, tomada por el flujo de §9.

## 6. Supuestos

### 6.1 Supuestos cerrados del intake

Los seis valores que el SOLUTION-INTAKE registró como supuestos numerados S-01 a S-06 están cerrados. No son los únicos datos que el intake marcó como supuesto: la matriz de navegadores de §17.1 P.9 lleva el mismo marcador sin número, no está en la tabla de estado y sigue abierta, de modo que se registra en §6.2 y no acá. El otro marcador sin número, el supuesto IC-05 de §17.4 P.11, quedó cerrado el 2026-07-28 por la decisión D-3 del agente humano del proyecto. El orquestador los presentó en su batería de validación y el agente humano del proyecto los resolvió el 2026-07-27; la resolución de cada uno está publicada en la tabla de estado de supuestos del SOLUTION-INTAKE v1.2, que es la fuente de verdad de ese estado y el respaldo de esta sección.

No los cierra el mismo mecanismo, y la diferencia importa aguas abajo: cuatro son valores propuestos por el intake y confirmados sin cambios, uno se resolvió contra un dato verificable del entorno y otro se cerró por una decisión de identificación, sin aportar el dato que se creía faltante.

| ID | Supuesto | Estado y fecha | Mecanismo de cierre | Dónde impacta |
|---|---|---|---|---|
| S-01 | Las métricas de éxito de negocio y sus umbrales | Confirmado el 2026-07-27 | Valores propuestos por el intake, adoptados sin cambios: son el objetivo de negocio de la solución | `Vision-Producto-v1.2.md` §6 y los objetivos OBJ-01 a OBJ-04 |
| S-02 | Los umbrales mínimos de cobertura de pruebas por proyecto | Confirmado el 2026-07-27 | Los cuatro pares de umbrales se adoptan sin cambios y son control bloqueante del pipeline | `Acuerdo-Equipo-v1.2.md` §5 y la categoría 08-Calidad-Y-Pruebas |
| S-03 | Los umbrales numéricos de los requerimientos no funcionales que no provienen de una puerta técnica | Confirmado el 2026-07-27 | Valores propuestos adoptados sin cambios. Los umbrales de PT-01 nunca fueron supuestos: son evidencia declarada por las fuentes | Categoría 05-Arquitectura-Tecnica y categoría 08 |
| S-04 | El esquema de versionado y la convención de mensajes de cambio, sobre el etiquetado por etapa que las fuentes sí declaran | Confirmado el 2026-07-27 | Esquema propuesto adoptado sin cambios | `Acuerdo-Equipo-v1.2.md` §4.3 |
| S-05 | La ubicación del repositorio remoto | Resuelto con evidencia el 2026-07-27 | Deja de ser supuesto: el remoto existe y está configurado, y el dato es verificable en el entorno con `git remote get-url origin` en la raíz del repositorio destino | `Acuerdo-Equipo-v1.2.md` §7 y la categoría 09-Devops |
| S-06 | Los nombres propios del propietario del problema y del agente humano del proyecto | Cerrado por identificación de rol el 2026-07-27 | No se aportan nombres propios y no se requieren: los actores se identifican por su rol, unívoco porque el propietario, el lead técnico y el usuario final son la misma persona. Ningún artefacto downstream debe pedir un nombre propio | `Vision-Producto-v1.2.md` §2 y el README de esta sección |

### 6.2 Supuestos abiertos

Tres de los cuatro pendientes que registraba la versión anterior de este documento se cerraron el 2026-07-28, por decisión del agente humano del proyecto: CL-04 por la decisión D-1, que determina el resultado de un despliegue por contenedor y admite el despliegue parcial como estado legítimo; CL-15 por la decisión D-2, que hace que el carácter de secreto se declare en un paso obligatorio de clasificación en lugar de inferirse del nombre; e IC-05 por la decisión D-3, que lo cierra sin cambio de reglas. Las tres están registradas en la sección de decisiones y en §19 del SOLUTION-INTAKE v1.2.

Quedan tres pendientes que alcanzan al alcance de esta solución: la matriz de navegadores, que venía de antes, y dos decisiones de producto que se abrieron el 2026-07-28 al precisar qué es el catálogo. Este documento no les propone respuesta, y cada una declara su consumidor, que no es el mismo para las tres.

| ID | Supuesto abierto | Qué queda sin definir | Quién resuelve | Qué bloquea |
|---|---|---|---|---|
| Instanciación con nombre en conflicto | Qué hace la instanciación de un ítem del catálogo cuando un nombre de servicio que trae ya existe en el proyecto destino | Si se rechaza, si se sufija automáticamente o si se pide un prefijo obligatorio | Cliente | La especificación del caso de uso de alta desde catálogo en 02-Especificacion-Funcional. Con ítems de varios servicios la colisión es mucho más probable que antes |
| Instanciación con clave compartida en conflicto | Qué hace la instanciación cuando la plantilla trae una variable compartida cuya clave ya existe en el proyecto destino | Si se reutiliza la existente, si se rechaza o si se crea con la clave modificada | Cliente | La misma especificación en 02-Especificacion-Funcional. Elegir mal expone la credencial de un conjunto de servicios a otro, de modo que no es una decisión de forma |
| Matriz de navegadores | Qué familias y versiones mínimas de navegador de escritorio se soportan | El intake declara la exigencia de conexión persistente por WebSockets, pero no la familia ni la versión mínima | Cliente | El alcance de lo que 03-UX-UI-DX puede prometer sobre el comportamiento de la interfaz, y la verificación de compatibilidad en 08-Calidad-Y-Pruebas y 09-Devops. Queda declarada como brecha en `Compatibilidad-Plataformas-v1.2.md` §2.2 |

Regla operativa mientras sigan abiertos: ninguna categoría posterior inventa el comportamiento faltante. Si el corte de etapa correspondiente llega antes que la respuesta del cliente, la etapa no cumple la condición de tener criterios de aceptación verificables y no se puede iniciar.

Qué no se registra acá, y dónde vive. El SOLUTION-INTAKE v1.2 §19 lleva tres registros distintos de cosas sin cerrar y enumera siete pendientes de decisión, de las cuales esta sección recoge tres. De las otras cuatro, dos son de maquetado y las resuelve 03-UX-UI-DX —cómo se distingue en el lienzo una referencia de red de una de dato, y el maquetado del paso de clasificación de variables y de la pantalla de variables compartidas—; la tercera es cómo se referencia el puerto de un servicio que declara más de uno, que resuelven 02-Especificacion-Funcional y 03-UX-UI-DX; y la cuarta es la ubicación de F-23 y F-24 en una fase, que resuelven `Roadmap-Producto-v1.2.md` §2.4 y la categoría 07-Plan-Sprint. Ninguna de las cuatro acota qué entra o qué sale del alcance, que es el objeto de este documento.

El intake lleva además un tercer registro, DI-01 a DI-14, con las especificaciones que el orquestador derivó para hacer implementables las decisiones del 2026-07-28. Están aplicadas y la cadena puede consumirlas, pero son propuesta del integrador y no dato del cliente: las categorías 02 y 05 deben tratarlas como revisables. No se transcriben acá porque son de modelado y de contrato, no de alcance.

## 7. Restricciones

Las restricciones del cliente están enumeradas en `Vision-Producto-v1.2.md` §7 como RE-01 a RE-12. Este documento agrega la lectura de cada una en clave de alcance.

| ID | Restricción | Efecto sobre el alcance |
|---|---|---|
| RE-01 y RE-04 | Dos desarrolladores, etapas en serie | El alcance de cada etapa debe ser recorrible por una persona en una sesión de demostración; una etapa que no lo sea está mal cortada |
| RE-02 | Sin fecha objetivo | El alcance no se recorta contra un calendario, sino contra la demostrabilidad de cada etapa |
| RE-03 | Sin presupuesto monetario; toda dependencia de licencia abierta y permisiva | Ninguna capacidad puede depender de un producto de licencia comercial, aunque cubra la funcionalidad completa |
| RE-05 | El motor de contenedores del host es el sustrato | Ninguna capacidad puede prescindir de él, y ninguna puede prometer lo que el motor no permite. El escalado horizontal con dirección fija por servicio es un caso concreto: exige una dirección por réplica |
| RE-06 | Servidor de gama modesta y sin redundancia | La solución debe ser liviana y sin sondeo agresivo; la exportación periódica es la estrategia de respaldo, no una capacidad accesoria |
| RE-07 | Sólo red local | No hay capacidades de acceso remoto, ni de publicación de dominios |
| RE-08 | El ciclo de desarrollo ocurre dentro del entorno contenedorizado | Ningún entregable puede depender de herramientas instaladas en el host |
| RE-09 | Ningún marco normativo aplicable | Sin efecto sobre el alcance: no hay capacidades de cumplimiento normativo que agregar ni requisitos de retención, consentimiento o reporte que condicionen una exclusión |
| RE-10 | Una rama y un pull request por etapa, con etiqueta por etapa cerrada y ningún secreto en el repositorio | Sin efecto sobre las capacidades del producto, pero sí sobre los entregables: condiciona EN-03 y EN-07, y su detalle operativo vive en `Acuerdo-Equipo-v1.2.md` §4 |
| RE-11 | Informe de cierre obligatorio por etapa | El informe es entregable EN-03 y su ausencia invalida el cierre de la etapa |
| RE-12 | Sin horario core, sin franja de disponibilidad comprometida y sin plazo máximo de respuesta | Sin efecto sobre las capacidades ni sobre las exclusiones. Afecta al ritmo de cierre de las etapas, no a su contenido: una etapa terminada puede quedar esperando el punto de control por tiempo indefinido, y esa espera no habilita a iniciar la siguiente |

## 8. Criterios de aceptación del proyecto

| ID | Criterio | Cómo se verifica |
|---|---|---|
| CA-01 | Todas las capacidades Must Have (F-01 a F-11) están entregadas y demostradas | Cada una tiene su etapa cerrada con guion de demostración ejecutado y aprobado en su punto de control |
| CA-02 | Cada etapa cerrada tiene su informe de cierre de trece secciones publicado antes del punto de control y anotado en el índice de informes | Revisión del índice y del informe por el agente humano, antes de convocar el punto de control |
| CA-03 | Al cerrar cada etapa, los guiones de demostración de todas las etapas anteriores siguen pasando sin corrección | Ejecución acumulativa de los guiones previos como paso previo al pull request |
| CA-04 | Las reglas de negocio que introduce cada etapa están cubiertas por pruebas automatizadas | Verificación de cobertura en el control de calidad del pipeline, con los umbrales por proyecto declarados en `Acuerdo-Equipo-v1.2.md` §5 |
| CA-05 | La puerta técnica PT-01 está medida y aprobada antes de comprometer el corte del lienzo | Ejecución de su materialización con 30 nodos y 40 aristas, con actualización de estado periódica |
| CA-06 | La puerta técnica PT-02 está verificada antes del corte de despliegue | Ejecución de su materialización contra el motor de contenedores real, ya en la primera etapa |
| CA-07 | Ningún secreto entra al repositorio ni sale por una exportación | Control de calidad de verificación de secretos en el pipeline, y revisión de la exportación con archivo de variables vacío |
| CA-08 | Las salvaguardas de aislamiento de §4.1 están presentes en toda operación sobre el motor de contenedores | Revisión funcional en el punto de control de las etapas de despliegue y de adopción |
| CA-09 | El parque de referencia puede recorrerse en la solución con el juego de datos de siembra, sin configuración manual previa | Ejecución del entregable EN-06 desde los guiones, dentro del entorno contenedorizado |
| CA-10 | Ninguna etapa se especifica con una decisión de producto pendiente que la alcance. Los casos límite CL-04 y CL-15 quedaron resueltos el 2026-07-28; las dos decisiones sobre la instanciación de un ítem del catálogo, registradas en §6.2, deben estar resueltas antes de especificar la etapa del catálogo | Registro de la respuesta en el intake y propagación a 02-Especificacion-Funcional |

## 9. Gestión de cambios de alcance

| Paso | Regla operativa |
|---|---|
| 1. Origen | Todo pedido de cambio de alcance entra por el agente humano del proyecto, que es el único con autoridad para aceptarlo. Un cambio detectado por el equipo o por el agente IA se eleva, no se aplica |
| 2. Momento | El cambio se evalúa en un punto de control, nunca en medio de una etapa. Una etapa en curso no cambia de alcance: se cierra con lo que tiene y el cambio se planifica como etapa nueva |
| 3. Evaluación | El pedido se clasifica en una de tres categorías: capacidad nueva, ampliación de una capacidad existente, o exclusión que se revierte. En los tres casos se declara qué etapa lo absorbe y qué se posterga a cambio |
| 4. Registro | El cambio aceptado se refleja en este documento con incremento de versión menor, y en el SOLUTION-INTAKE §4 o §9 según corresponda. La trazabilidad de la capacidad conserva su identificador |
| 5. Propagación | Un cambio aceptado obliga a revisar `Roadmap-Producto-v1.2.md` y las categorías 01, 02 y 06. El cambio no se considera cerrado hasta que esa propagación está hecha |
| 6. Rechazo | Un pedido rechazado se registra igualmente como exclusión en §5, con su justificación. Un pedido que no queda registrado vuelve |

Criterio de corte. Una capacidad que no puede demostrarse en el navegador al cierre de una etapa no entra al alcance de esa etapa. Si el pedido no cabe en un corte vertical demostrable, se redivide antes de aceptarse.

## 10. Trazabilidad

### 10.1 Upstream

| Sección de este documento | Origen en el SOLUTION-INTAKE |
|---|---|
| 2. Descripción general | §1 y §3 |
| 3. Objetivos del proyecto | §8, a través de los objetivos SMART de `Vision-Producto-v1.2.md` |
| 4.1 Capacidades | §4, con las salvaguardas de §17.3 P.5 |
| 4.2 Entregables | §15, §15.1, §16.1 y §18 |
| 4.3 Ambientes | §10 y §17.1 P.8 |
| 5. Alcance excluido | §9 y las capacidades marcadas como excluidas de la primera versión en §4 |
| 6. Supuestos | Tabla de estado de supuestos del intake para §6.1; sección de decisiones del agente humano y tabla de pendientes de decisión de §19 para §6.2, más §17.1 P.9 para la matriz de navegadores |
| 7. Restricciones | §10 |
| 8. Criterios de aceptación | §8, §15 y §17.1 P.8 |

### 10.2 Downstream

| Categoría | Qué consume de este documento |
|---|---|
| 01-Necesidades-Negocio | Las capacidades F-01 a F-17 más F-23 y F-24 como origen de cada necesidad de negocio, y los objetivos OP-01 a OP-07 |
| 02-Especificacion-Funcional | Las capacidades incluidas, las exclusiones de §5.1 —que no deben generar casos de uso— y los dos supuestos abiertos de §6.2, que bloquean la especificación del comportamiento correspondiente |
| 03-UX-UI-DX | Las capacidades de interfaz F-04, F-07, F-12 y las advertencias de ventana de indisponibilidad derivadas de las exclusiones |
| 05-Arquitectura-Tecnica | Las restricciones de §7 y las salvaguardas de aislamiento de §4.1 |
| 06-Backlog | La lista de capacidades con su prioridad, como origen de las épicas |
| 07-Plan-Sprint | Los entregables EN-03 a EN-05 y los criterios CA-02, CA-03 y CA-04, como definición de terminado de cada etapa |
| 08-Calidad-Y-Pruebas | Los criterios de aceptación CA-01 a CA-10 |
| 10-Examples | Los entregables EN-05 y EN-06 |

---

## Control de cambios

| Versión | Fecha | Cambios | Autor |
|---|---|---|---|
| 1.0 | 2026-07-27 | Versión inicial, derivada del SOLUTION-INTAKE-SelfHosted-Service-Core-v1.0. Diecisiete capacidades incluidas, trece exclusiones justificadas, seis supuestos del intake tratados entonces como confirmados —hoy diferenciados en cuatro confirmados, uno resuelto con evidencia y uno cerrado por identificación de rol, según la tercera fila—, dos supuestos abiertos y diez criterios de aceptación | Product Manager Senior (AG-00) con Analista de Negocio Senior (AG-01) |
| 1.0 | 2026-07-27 | Corrección dentro del ciclo de emisión, sin cambio de versión, por el audit `A-00-Contexto-v1.0.md`. P1-01: se regeneraron las cuatro anclas de la tabla de contenido que no resolvían, conservando tildes y eñes. P3-02: la tabla de exclusiones de proceso de §5.2 incorpora la tercera columna exigida por la tabla tipo. P3-04: §7 incorpora RE-09 y RE-10, que la frase de apertura prometía y la tabla omitía. El tratamiento del estado de los supuestos S-01 a S-06 queda sin tocar, a la espera de la decisión del humano sobre el hallazgo P0-01 | Product Manager Senior (AG-00) con Analista de Negocio Senior (AG-01) |
| 1.0 | 2026-07-27 | Cierre del hallazgo P0-01 del audit `A-00-Contexto-v1.0.md`, sin cambio de versión. §6.1 pasa de "Supuestos confirmados" a "Supuestos cerrados del intake", cita la tabla de estado del SOLUTION-INTAKE v1.1 como respaldo y distingue los tres mecanismos de cierre: S-01 a S-04 confirmados el 2026-07-27, S-05 resuelto con evidencia verificable en el entorno y S-06 cerrado por identificación de rol. §6.2 declara de forma explícita que la batería de validación no alcanzó a CL-04 ni a CL-15, que siguen abiertos. Se actualizó la referencia al intake de la versión 1.0 a la 1.1 en la cabecera, en §10.1 y en el control de cambios | Product Manager Senior (AG-00) con Analista de Negocio Senior (AG-01) |
| 1.0 | 2026-07-27 | Cierre de los hallazgos N-06 y N-07 del re-audit `A-00-Contexto-v2.0.md`, sin cambio de versión. N-07: §6.1 acota su alcance a los supuestos numerados S-01 a S-06 y remite a §6.2 el marcador de supuesto que el intake mantiene abierto; §6.2 pasa de dos a tres pendientes con el alta de la matriz de navegadores, y queda alineada con la tabla de pendientes de §19 del intake. N-06: la primera fila de este control de cambios deja de llamar confirmados a los seis supuestos y conserva la literalidad histórica remitiendo a la distinción de mecanismos de la tercera fila | Product Manager Senior (AG-00) con Analista de Negocio Senior (AG-01) |
| 1.0 | 2026-07-27 | Cierre de los hallazgos V-01 y V-04 del re-audit `A-00-Contexto-v2.0.md` §12.5, sin cambio de versión. V-01: §6.2 pasa de tres a cuatro pendientes con el alta de IC-05, alineada con las dos tablas del intake v1.1 que enumeran el mismo conjunto, y su párrafo de apertura deja de atribuir a la categoría 02 el consumo de todos los pendientes: cada uno declara el suyo. §6.1 nombra los dos marcadores sin número que siguen abiertos. V-04: §7 incorpora RE-12, la restricción «Disponibilidad y tiempos de respuesta» que la visión absorbió, con su lectura en clave de alcance | Product Manager Senior (AG-00) con Analista de Negocio Senior (AG-01) |
| 1.1 | 2026-07-28 | Propagación de las decisiones del 2026-07-28 consolidadas en el SOLUTION-INTAKE v1.2. §4.1 suma F-23, variables compartidas del proyecto, y F-24, referencias entre variables, ambas Should Have, con lo que las capacidades incluidas pasan de diecisiete a diecinueve; F-14 se reformula como cuarta vía de alta con ítems de uno o varios servicios, y se agrega la nota de las tres precisiones de alcance (D-5, D-6, D-7). §2 incorpora las dos capacidades nuevas a la descripción general. §6.1 declara cerrado IC-05. §6.2 se reescribe: salen CL-04, CL-15 e IC-05, cerrados por D-1, D-2 y D-3, y entran las dos decisiones pendientes sobre la instanciación de un ítem del catálogo; se declara qué pendientes del intake no se registran acá y por qué, y se declara el registro DI-01 a DI-10 como revisable para 02 y 05. CA-10 se reformula sobre las pendientes vigentes. Sube a 1.1 porque el documento ya fue consumido por 01-Necesidades-Negocio; la 1.0 queda archivada en `_legacy/2026-07-28/`. Las citas actualizadas son las vivas —cabecera, cuerpo y enlaces navegables—; las filas anteriores de este control de cambios conservan la versión del intake y los nombres de archivo contra los que se trabajó cada día, porque son parte del hecho registrado. | Product Manager Senior (AG-00) con Analista de Negocio Senior (AG-01) |
| 1.2 | 2026-07-28 | Propagación de la segunda pasada sobre el mecanismo de variables del SOLUTION-INTAKE v1.2. §2 declara que trazar una dependencia en el lienzo y apuntar una variable a otra son el mismo acto. §4.1 suma al alcance de F-13 el informe de importación, que hace declarada y no silenciosa toda pérdida de traducción, y la nota de capacidades incorpora la precisión sobre F-04 y F-24: el vínculo es un mecanismo único con dos efectos, y el lienzo se apoya en las referencias en lugar de ser una capacidad separable. §6.2 actualiza el recuento de pendientes de decisión del intake, que pasan de seis a siete con la del puerto múltiple, y el registro de especificaciones de integración, que pasa de DI-01 a DI-10 a DI-01 a DI-14. F-23 y F-24 no cambian de enunciado: cambió cómo se implementan, no qué hacen | Product Manager Senior (AG-00) con Analista de Negocio Senior (AG-01) |
