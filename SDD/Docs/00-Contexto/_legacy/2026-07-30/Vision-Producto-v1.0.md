# Visión de Producto

**Proyecto:** SelfHosted Service (`Nombre-Solucion`: `SelfHosted-Service`)
**Documento:** Vision-Producto.md
**Versión:** 1.0
**Estado:** Propuesto
**Fecha:** 2026-07-29
**Autor:** Product Manager Senior (AG-00)
**Trazabilidad upstream:** SOLUTION-INTAKE-SelfHosted-Service §1, §2, §3, §8, §9, §10, §11, §12, §17.P.9, §17.P.10, §22.1, §22.2, §24.2, y la sección «Supuestos registrados por este intake y su estado»
**Trazabilidad downstream:** 01-Necesidades-Negocio, 02-Especificacion-Funcional, 03-UX-UI-DX, 05-Arquitectura-Tecnica, 07-Plan-Sprint, 08-Calidad-Y-Pruebas, 10-Examples

---

## Tabla de contenido

- [§1. Problema de negocio](#1-problema-de-negocio)
  - [§1.1 Situación actual](#11-situación-actual)
  - [§1.2 Consecuencia de no resolverlo](#12-consecuencia-de-no-resolverlo)
  - [§1.3 Disparador](#13-disparador)
- [§2. Audiencia y stakeholders](#2-audiencia-y-stakeholders)
  - [§2.1 Mapa de stakeholders](#21-mapa-de-stakeholders)
  - [§2.2 Identificación por rol y ausencia de actores externos](#22-identificación-por-rol-y-ausencia-de-actores-externos)
- [§3. Propuesta de valor](#3-propuesta-de-valor)
  - [§3.1 Promesa central](#31-promesa-central)
  - [§3.2 Diferenciadores](#32-diferenciadores)
- [§4. Visión a 3 años](#4-visión-a-3-años)
  - [§4.1 Estado objetivo](#41-estado-objetivo)
  - [§4.2 Lo que se posterga explícitamente](#42-lo-que-se-posterga-explícitamente)
  - [§4.3 Cómo se mide el avance hacia ese estado](#43-cómo-se-mide-el-avance-hacia-ese-estado)
- [§5. Objetivos SMART](#5-objetivos-smart)
- [§6. Métricas de éxito](#6-métricas-de-éxito)
- [§7. Restricciones](#7-restricciones)
  - [§7.1 Catálogo de restricciones](#71-catálogo-de-restricciones)
  - [§7.2 Lectura de las restricciones en clave de alcance](#72-lectura-de-las-restricciones-en-clave-de-alcance)
- [§8. Riesgos](#8-riesgos)
  - [§8.1 Matriz de riesgos de negocio](#81-matriz-de-riesgos-de-negocio)
  - [§8.2 Riesgos abiertos de plataforma](#82-riesgos-abiertos-de-plataforma)
  - [§8.3 Supuesto crítico](#83-supuesto-crítico)
- [§9. Glosario del dominio](#9-glosario-del-dominio)
- [§10. Trazabilidad](#10-trazabilidad)
  - [§10.1 Upstream](#101-upstream)
  - [§10.2 Downstream](#102-downstream)
- [Control de cambios](#control-de-cambios)

---

## §1. Problema de negocio

### §1.1 Situación actual

El propietario administra un servidor propio de desarrollo, pequeño y sin redundancia de disco, sobre el que ya corre un parque de ocho contenedores y dieciocho imágenes [E]. Ese parque creció de forma orgánica: cada servicio se levantó con su propia definición suelta, sus variables de entorno no versionadas, sus montajes de directorio y su modo de red particular. Hoy no existe ningún lugar donde se vea la arquitectura completa de un conjunto de servicios ni la relación entre ellos. Saber qué consume qué, con qué dirección y con qué puerto obliga a abrir archivos dispersos y a contrastarlos contra lo que el motor de contenedores efectivamente está ejecutando.

El dolor lo sufre quien opera ese servidor, que es una sola persona con permisos de administración total. Cada alta de un servicio nuevo es un ejercicio manual de copiar y adaptar; cada dirección IP fija de la red local se anota fuera del sistema; cada arranque de un conjunto de servicios depende de recordar el orden correcto. El costo no es catastrófico de a una operación, pero es permanente y crece con el parque.

### §1.2 Consecuencia de no resolverlo

Si no se resuelve en los próximos meses, el parque sigue creciendo sin registro común. La configuración real vive únicamente en el motor de contenedores y en archivos que no están versionados; el respaldo depende de la memoria del operador; y el servidor no tiene redundancia de disco [E]. Cualquier reinstalación obliga a reconstruir la arquitectura desde cero, y esa reconstrucción no está documentada en ningún lado.

### §1.3 Disparador

El disparador es el propio parque existente: la herramienta tiene que ser adoptable sobre un servidor que ya está en producción, y no puede exigir empezar de cero. Por eso la incorporación de contenedores existentes a un proyecto SelfHosted, sin reinstanciarlos, es el diferencial declarado desde la definición del servicio [E].

---

## §2. Audiencia y stakeholders

### §2.1 Mapa de stakeholders

| Rol | Nombre o cargo | Categoría | Nivel de involucramiento | Responsabilidad principal |
| --- | --- | --- | --- | --- |
| Dueño del problema y administrador único | Propietario del servidor autoalojado de referencia, identificado por rol | Propietario | Permanente y decisorio | Aprueba el intake, opera la solución y valida cada punto de control de etapa |
| Agente humano del proyecto | El mismo propietario, en su rol de validación técnica | Propietario | En cada punto de control, sin excepción | Ejecuta los guiones de demostración, da o niega el OK de la etapa, fusiona la rama y avisa el cierre |
| Equipo de desarrollo | Dos desarrolladores [E], trabajando en etapas en serie | Implementador | Continuo durante la construcción | Especifican y construyen cada corte vertical, escriben las pruebas de las reglas que introducen y redactan el informe de cierre |
| Agente IA de codificación | Orquestador SDD y sus subagentes | Implementador | Continuo durante la construcción | Genera la documentación de especificación y, en etapas posteriores, el código de cada etapa. No fusiona ramas ni aprueba puntos de control |
| Usuario final: administrador de la solución | Único usuario con credenciales de la aplicación [E] | Beneficiario | Diario, una vez entregado el primer alcance | Crea proyectos SelfHosted, configura servicios en el lienzo, despliega, arranca y detiene |
| Automatismo de integración continua | Flujo de trabajo de integración continua sobre el ejecutor del propio servidor [E] | Beneficiario | Por evento, sin intervención humana | Dispara despliegues con una credencial de máquina de ámbito mínimo |

### §2.2 Identificación por rol y ausencia de actores externos

Los actores se identifican por rol y no por nombre propio. Es una decisión cerrada del agente humano del proyecto del 2026-07-27 (supuesto S-06, cerrado por identificación de rol): el propietario, el lead técnico y el usuario final son la misma persona, de modo que el rol es unívoco. Ningún artefacto downstream debe pedir un nombre propio.

No hay financiador externo ni área a la que rendir resultados: el propietario del problema, el que decide y el que paga son la misma persona [D]. Tampoco hay actores de auditoría ni legales, porque el servicio no sale de la red local.

---

## §3. Propuesta de valor

### §3.1 Promesa central

Hoy el cliente opera su parque con definiciones sueltas y variables de entorno no versionadas, servicio por servicio [E]. Eso alcanza para levantar un contenedor, pero no para ver una arquitectura, ni para detectar que dos servicios pelean por la misma dirección de red, ni para saber qué hay que redesplegar cuando cambia el puerto de una base de datos.

La promesa central es que la arquitectura de un conjunto de servicios sea un objeto de primera clase, editable en un lienzo, con el despliegue derivado de lo que se dibuja: se agrega el servicio, se traza la dependencia, el sistema propone la variable de entorno correcta según el modo de red, y los cambios se aplican en lote con un único redespliegue de lo afectado.

### §3.2 Diferenciadores

| ID | Diferenciador | Por qué diferencia |
| --- | --- | --- |
| DV-01 | Adopción sin reinstanciar: los contenedores que ya corren se incorporan a un proyecto SelfHosted importando su configuración observada y quedando vinculados por identificador | Es lo que hace la herramienta aplicable sobre un servidor en producción, sin cortar servicio |
| DV-02 | Separación entre configuración y ejecución: el nodo del lienzo es el servicio, permanente y posicionable; el color y la insignia reflejan el despliegue activo, que es volátil | Detener no borra nada, y la arquitectura sobrevive a cualquier operación de ejecución |
| DV-03 | Edición transaccional: los cambios de configuración se acumulan con su informe de impacto y se aplican en lote | Se revisa antes de aplicar, se descarta lo que no va y se redespliega una sola vez |
| DV-04 | El conflicto de direcciones de red como regla de negocio verificada antes de arrancar, con resoluciones ofrecidas | El sistema conoce el rango gestionado y bloquea el arranque en lugar de fallar en el motor de contenedores |
| DV-05 | Diseñado para un servidor chico: decenas de nodos y menos de cincuenta contenedores, sin degradarse con treinta nodos [E] | Nada se optimiza para escalas que este caso no tiene, y nada puede degradarse en la escala que sí tiene |

Los cinco identificadores `DV-XX` provienen de la Fase A previa [FA] y se conservan porque hay artefactos y decisiones que ya los citan.

---

## §4. Visión a 3 años

### §4.1 Estado objetivo

A tres años el parque completo está representado en la solución: cada contenedor en ejecución pertenece a un proyecto SelfHosted declarado, con su red, sus direcciones reservadas y su disposición, y la pregunta «qué consume qué y con qué dirección» se responde mirando una pantalla.

La arquitectura de cada proyecto SelfHosted es reproducible fuera del servidor, y esa exportación es la estrategia de respaldo frente a un servidor sin redundancia de disco. El alta de un servicio deja de ser un ejercicio de copiar y adaptar, con un catálogo de plantillas que arranca vacío y que el propietario puebla, y con los valores compartidos definidos una sola vez y referenciados desde donde hagan falta. La publicación de una versión nueva puede dispararse desde un automatismo con una credencial de ámbito mínimo, sin que ese automatismo conozca la contraseña del administrador.

Este enunciado proviene de la Fase A previa [FA] y se consume como propuesta, no como requisito cerrado del cliente. Lo que sí es dato cerrado son las métricas de §6, confirmadas por el agente humano del proyecto el 2026-07-27.

### §4.2 Lo que se posterga explícitamente

| Capacidad postergada | Consecuencia asumida mientras no exista |
| --- | --- |
| Operación de más de un servidor y de más de un inquilino | El modelo de identidad, aislamiento y cuotas que exigiría no se construye; la solución sirve a un servidor y a un administrador |
| Exposición del servicio fuera de la red local | No hay acceso remoto; el panel se alcanza únicamente desde la red local |
| Gestión de dominios públicos y de enrutamiento de entrada | Reemplazar la versión de un servicio implica detener y arrancar, con una ventana de indisponibilidad que la interfaz debe advertir al confirmar |
| Distribución de tráfico entre réplicas | El escalado horizontal queda útil sólo para procesos sin tráfico entrante |
| Gestión de múltiples usuarios, roles y permisos, y segundo factor de autenticación | Un único administrador con credencial única; la decisión de autenticación no bloquea incorporar un segundo factor más adelante |

### §4.3 Cómo se mide el avance hacia ese estado

El avance no se mide por fechas de calendario. Se mide por etapas cerradas con su punto de control aprobado, porque el cliente declaró que no hay fecha objetivo (restricción RE-02) y que el bloqueo del punto de control no vence (restricción RE-12). Los plazos que aparecen en §5 y §6 se cuentan desde el cierre de un alcance, nunca desde una fecha del calendario.

---

## §5. Objetivos SMART

Cinco objetivos, con los identificadores emitidos por la Fase A previa y conservados [FA]. Los cuatro primeros traducen las métricas de negocio de la sección §8 del intake, confirmadas sin cambios por el agente humano del proyecto el 2026-07-27 (supuesto S-01), y son dato cerrado.

Ningún target ni plazo de esta tabla se origina acá. Los de OBJ-01 a OBJ-04 son los de §8 del intake, con el único ajuste de forma de OBJ-01, que lleva el porcentaje a valor absoluto usando el denominador de ocho contenedores del parque relevado; los de OBJ-05 son los umbrales que §17.P.10 y la puerta técnica PT-01 declaran como evidencia de las fuentes. Fijar un target es un compromiso de negocio y le pertenece al Product Owner, no a esta categoría.

| Objetivo | Métrica | Target numérico | Plazo | Responsable |
| --- | --- | --- | --- | --- |
| OBJ-01 · Incorporar el parque existente sin reinstanciar contenedores | Contenedores en ejecución incorporados a un proyecto SelfHosted, sobre el total relevado | ≥ 6 de 8 contenedores (≥ 75 %) | 3 meses desde el cierre del Alcance 1 | Agente humano del proyecto |
| OBJ-02 · Reemplazar el alta manual de servicios por el alta desde la solución | Altas de servicio nuevas hechas desde la solución, sobre el total de altas nuevas | ≥ 90 % | 6 meses desde el cierre del Alcance 1 | Agente humano del proyecto |
| OBJ-03 · Hacer reproducible la arquitectura fuera del servidor | Proyectos SelfHosted con exportación vigente, de antigüedad menor a 7 días, sobre el total declarado | 100 % | 3 meses desde el cierre del Alcance 3 | Agente humano del proyecto |
| OBJ-04 · Sostener la entrega por etapas sin regresión acumulada | Etapas cerradas con su guion de demostración ejecutado y con los guiones de todas las anteriores pasando sin corrección | 100 % de las etapas | Durante toda la construcción | Agente humano del proyecto |
| OBJ-05 · Operar la escala real sin degradación perceptible | Nodos y aristas por lienzo, y contenedores por parque, sin retraso perceptible en el arrastre | 30 nodos y 40 aristas por lienzo; menos de 50 contenedores | Verificado en la puerta técnica PT-01, antes de comprometer el corte del lienzo | Equipo de desarrollo, con validación del agente humano |

Brecha declarada: OBJ-05 no figura entre las métricas de negocio de §8 del intake. Es derivación de la Fase A previa, transcripta en §22.1 [FA], y sigue pendiente de confirmación: la batería de validación del 2026-07-27 no lo alcanzó. Se consume como propuesta y no como objetivo cerrado del cliente hasta que el agente humano del proyecto se pronuncie en su rol de Product Owner. Los umbrales que lo sostienen sí son evidencia declarada por las fuentes: los mide la puerta técnica PT-01. Esta categoría no lo adopta por su cuenta ni lo descarta: lo deriva de §22.1 y declara su estado.

Cómo se leen las cuatro métricas cerradas: las tres primeras se leen del propio sistema, una vez que exista la capacidad, contrastadas contra el inventario del parque de referencia; la cuarta se lee de los informes de cierre de etapa y de su índice.

---

## §6. Métricas de éxito

| Criterio | Métrica | Target | Plazo | Fuente del dato |
| --- | --- | --- | --- | --- |
| Adopción del parque existente | Porcentaje de los contenedores en ejecución del servidor de referencia incorporados a un proyecto SelfHosted sin haber sido reinstanciados | ≥ 75 % de los 8 contenedores relevados | 3 meses desde el cierre del Alcance 1 | Listado de servicios adoptados de la propia solución, contrastado contra el inventario del parque de referencia |
| Reemplazo del método manual | Porcentaje de altas de servicio nuevas realizadas desde la solución en lugar de por definición editada a mano | ≥ 90 % de las altas nuevas | 6 meses desde el cierre del Alcance 1 | Registro de altas de la propia solución |
| Reproducibilidad de la arquitectura | Proyectos SelfHosted con exportación vigente sobre el total declarado | 100 %, con exportación de antigüedad menor a 7 días | 3 meses desde el cierre del Alcance 3 | Fecha de la última exportación registrada por la solución |
| Continuidad de la entrega | Porcentaje de etapas cerradas con su guion de demostración ejecutado y con los guiones de todas las etapas anteriores pasando sin corrección | 100 % de las etapas | Durante toda la construcción | Informes de cierre de etapa y su índice acumulativo |
| Escala operable sin degradación | Nodos y aristas por lienzo sostenidos sin retraso perceptible entre el evento de puntero y la actualización visual | 30 nodos y 40 aristas, con actualización de estado cada 2 s y consumo estable tras 15 minutos de uso continuo | Medición de PT-01, antes de comprometer el corte del lienzo | Medición de la puerta técnica PT-01, registrada en el informe de cierre de la etapa que la mide |

Las cuatro primeras son dato cerrado (S-01, confirmado el 2026-07-27) y sus cuatro targets se transcriben de §8 del intake sin modificación. La quinta corresponde a OBJ-05 y arrastra su misma condición de propuesta pendiente de confirmación; sus umbrales, en cambio, son evidencia declarada por las fuentes técnicas y nunca fueron supuesto. Ningún target de esta tabla se origina en esta categoría.

---

## §7. Restricciones

### §7.1 Catálogo de restricciones

Doce restricciones del cliente, con los identificadores emitidos por la Fase A previa y conservados [FA]. RE-12 es la que el agente humano del proyecto resolvió el 2026-07-27 declarando la ausencia en lugar de fijar un valor.

| ID | Restricción | Consecuencia para el producto |
| --- | --- | --- |
| RE-01 | Dos desarrolladores | No hay trabajo en paralelo entre etapas: se trabaja en serie |
| RE-02 | Sin fecha objetivo; el avance se mide por etapas cerradas | El roadmap se expresa por hitos, nunca por fechas de calendario |
| RE-03 | Sin presupuesto monetario; toda dependencia debe ser de licencia abierta y permisiva | Ninguna capacidad puede depender de un producto de licencia comercial |
| RE-04 | Etapas en serie, con el punto de control como cuello por diseño | El punto de control bloquea el avance, y es decisión aceptada |
| RE-05 | El motor de contenedores del host es el sustrato, accedido por su socket local | El producto no existe sin él y hereda sus límites |
| RE-06 | Servidor de gama modesta, sin redundancia de disco | Solución liviana: presupuesto de memoria de cientos de MB, nunca de GB, y sin sondeo agresivo de métricas |
| RE-07 | Sólo red local, sin publicación a internet | No hay superficie pública; el acceso remoto queda fuera de alcance |
| RE-08 | El ciclo de desarrollo ocurre dentro de un entorno contenedorizado declarativo | Ningún guion puede asumir herramientas instaladas en el equipo del desarrollador |
| RE-09 | Ningún marco normativo aplicable | Sin requisitos de cumplimiento que condicionen el alcance |
| RE-10 | Una rama y un pull request por etapa; ningún secreto en el repositorio | Condiciona los entregables y el flujo de trabajo |
| RE-11 | Informe de cierre obligatorio por etapa | El informe es entregable al mismo nivel que el código |
| RE-12 | Sin horario core, sin franja de disponibilidad comprometida y sin plazo máximo de respuesta | El bloqueo del punto de control no vence; es la razón de fondo por la que el avance no se compromete contra un calendario |

### §7.2 Lectura de las restricciones en clave de alcance

Cuatro de las doce tienen una consecuencia sobre el alcance que no se lee del enunciado y que conviene conservar:

- De RE-01 y RE-04: el alcance de cada etapa debe ser recorrible por una persona en una sesión de demostración, y una etapa que no lo sea está mal cortada.
- De RE-02: el alcance no se recorta contra un calendario sino contra la demostrabilidad de cada etapa.
- De RE-05: ninguna capacidad puede prometer lo que el motor de contenedores no permite. El caso concreto es el escalado horizontal con dirección fija por servicio, que exige una dirección por réplica.
- De RE-12: una etapa terminada puede quedar esperando su punto de control por tiempo indefinido, y esa espera no habilita a iniciar la siguiente.

RE-09 se declara sin efecto sobre el alcance de forma explícita, para que no se lea como omisión: no hay capacidades de cumplimiento normativo que agregar.

---

## §8. Riesgos

### §8.1 Matriz de riesgos de negocio

Los diez riesgos de la matriz del análisis integrado, con su probabilidad, su impacto y su mitigación declarados allí [E]. Se listan completos porque cada uno condiciona una decisión de alcance o de secuencia.

Procedencia de la columna `Responsable`, declarada aparte porque no comparte marcador con el resto de la tabla: la fuente [E] no la declara. El intake transcribe los diez riesgos con cinco columnas y sin responsable, y la Parte E no la repone. Los valores provienen de la Fase A previa [FA] y se transcriben acá sin modificación. Se consumen como propuesta previa y no como requisito cerrado del cliente: asignar dueño a un riesgo es una decisión organizativa, y su confirmación queda declarada como brecha en el [README de la sección](README.md) §6, con el agente humano del proyecto como destinatario.

| ID | Riesgo | Probabilidad | Impacto | Mitigación | Responsable [FA] |
| --- | --- | --- | --- | --- | --- |
| RG-01 | Latencia del lienzo cuando el arrastre se resuelve del lado del servidor: es la pantalla principal del producto | Media | Alto | Medir la puerta técnica PT-01 antes de comprometer el corte del lienzo, con cuatro mitigaciones previstas: arrastre resuelto en el navegador notificando sólo al soltar, movimiento por transformación visual, virtualización de nodos y transporte permanente garantizado | Equipo de desarrollo |
| RG-02 | Un mecanismo de autenticación por intercambio directo de usuario y contraseña como puerta de entrada a un servicio que controla el host | Media | Alto | Sesión con cookie para la interfaz y credenciales de máquina con ámbitos para los automatismos; el intercambio directo queda descartado | Equipo de desarrollo |
| RG-03 | El acceso al socket del motor de contenedores equivale a control total del host | Alta, inherente al diseño | Muy alto | No exponer el servicio fuera de la red local, emitir credenciales de ámbito mínimo y auditar toda operación de escritura | Propietario del servidor y equipo de desarrollo |
| RG-04 | Monitoreo inviable por red cuando los contenedores toman una dirección propia de la red local y el host no los alcanza por la misma placa | Alta | Medio | Observar el estado por el motor de contenedores y nunca por peticiones contra el servicio | Equipo de desarrollo |
| RG-05 | Cliente del motor de contenedores desactualizado frente al motor instalado | Media | Medio | Usar el cliente mantenido y aislarlo detrás de una única abstracción de acceso al motor | Equipo de desarrollo |
| RG-06 | Concurrencia de escritura sobre el almacenamiento local entre la interfaz, la interfaz programática y los procesos en segundo plano | Media | Medio | Diario de escritura anticipada, tiempo de espera de bloqueo fijado explícitamente y operaciones de despliegue serializadas por proyecto SelfHosted | Equipo de desarrollo |
| RG-07 | Sin redundancia de disco en el servidor de referencia | Alta | Alto para el usuario, no para el software | Exportación periódica de proyectos SelfHosted y del catálogo a un destino externo, facilitada por el propio servicio | Propietario del servidor |
| RG-08 | Deriva entre el estado registrado y el motor de contenedores cuando alguien opera contenedores por fuera de la aplicación | Alta | Medio | Reconciliación periódica y estado huérfano explícito en el nodo | Equipo de desarrollo |
| RG-09 | Secretos importados durante la adopción que terminen visibles | Media | Alto | Paso obligatorio de clasificación de variables en la adopción, con la detección por nombre como sugerencia y no como decisión, más la regla de no devolver secretos en texto plano ni en exportaciones | Equipo de desarrollo |
| RG-10 | Alcance creciente del lienzo: disposición automática, rutas ortogonales, deshacer y rehacer | Media | Medio | Fijar el alcance visual del primer incremento; el deshacer y rehacer se apoyan en el conjunto de cambios pendientes y no en la herramienta de dibujo | Product Manager y equipo de desarrollo |

La mitigación de RG-09 quedó reforzada por la decisión D-2 del agente humano del proyecto del 2026-07-28: la detección por nombre dejó de ser el filtro que decide y pasó a ser una sugerencia dentro de un paso obligatorio de clasificación. El riesgo residual baja, porque ya no depende de que una lista de fragmentos de nombre esté completa.

### §8.2 Riesgos abiertos de plataforma

La matriz de compatibilidad quedó cerrada el 2026-07-28 por decisión del agente humano del proyecto, pero tres componentes del riesgo del canal entre navegador y servidor no los elimina ni la red local ni la elección de familia de navegador. Se declaran acá como riesgos abiertos con su medición asignada, y no como brecha de matriz. Los tres identificadores `RP-XX` los emite este documento; el intake los enuncia sin identificador.

Alcance de lo que esta tabla puede afirmar: el intake enuncia los tres riesgos y asigna su medición a PT-01 y a la categoría 08-Calidad-Y-Pruebas, pero no los evalúa. No hay probabilidad, impacto ni responsable declarados para ninguno de los tres en ninguna fuente. Evaluar un riesgo y asignarle dueño son decisiones de negocio y de organización, no una formalización, de modo que esta categoría no las produce: las tres columnas correspondientes declaran la ausencia, y la evaluación queda registrada como brecha en el [README de la sección](README.md) §6, con el agente humano del proyecto como destinatario.

| ID | Riesgo abierto | Probabilidad | Impacto | Mitigación y medición asignada | Responsable |
| --- | --- | --- | --- | --- | --- |
| RP-01 | Suspensión de la pestaña en segundo plano, decidida por el navegador sobre sus propias pestañas, con el panel abierto y desatendido | Sin evaluar en las fuentes | Sin evaluar en las fuentes | El uso previsto incluye dejar el panel abierto y volver a mirarlo. Medición asignada a la categoría 08-Calidad-Y-Pruebas como criterio de compatibilidad de interfaz [E] | Sin asignar. Ver la brecha del README §6 |
| RP-02 | Capacidades gráficas del motor de renderizado del navegador para dibujar el lienzo, que ocurre enteramente del lado del navegador | Sin evaluar en las fuentes | Sin evaluar en las fuentes | Medición asignada a la puerta técnica PT-01, sobre la versión mínima declarada de la familia soportada [E] | Sin asignar. Ver la brecha del README §6 |
| RP-03 | Crecimiento de la memoria del canal en el servidor tras uso continuo | Sin evaluar en las fuentes | Sin evaluar en las fuentes | PT-01 mide el consumo por canal tras quince minutos de uso continuo, con umbral de consumo estable y sin crecimiento sostenido [E] | Sin asignar. Ver la brecha del README §6 |

### §8.3 Supuesto crítico

Supuesto crítico que, si se rompe, hace inviable el resultado esperado [D]: que un lienzo de treinta nodos sea fluido en red local con el modelo de interfaz elegido. Es exactamente lo que mide PT-01. Su falla no invalida el producto, pero obliga a cambiar la herramienta del lienzo y a replanificar ese corte.

No hubo un intento previo de construir esta herramienta [E]. Sí hubo un análisis funcional previo sobre una plataforma comercial equivalente, del que se toma el modelo de abstracción, la semántica de las dependencias y el patrón de cambios en lote. El método actual —definiciones sueltas por servicio— no falló: se volvió insuficiente al crecer el parque.

---

## §9. Glosario del dominio

Términos del dominio del cliente. La categoría 02-Especificacion-Funcional amplía este glosario con los términos que el modelo funcional incorpore.

| Término | Definición | Sinónimos o notas |
| --- | --- | --- |
| Proyecto SelfHosted | Unidad de agrupación del producto: la arquitectura completa de servicios contenedorizados, con su red y su lienzo. Es lo que el usuario crea desde el portal web | Forma corta «proyecto» sólo donde el contexto ya fijó el sentido y el otro no está cerca. No confundir con proyecto de código |
| Proyecto de código | La unidad de compilación del repositorio. Es una sola. No es algo que el usuario cree ni vea | Variante larga admitida: «proyecto de código fuente». Se escribe siempre completo |
| Capa | Cada una de las cuatro divisiones internas del proyecto de código, materializadas como carpeta y espacio de nombres | Reemplaza a «proyecto de código» cuando se habla de una de las cuatro |
| Motor de contenedores | Servicio del host que crea y ejecuta los contenedores. Es la fuente de verdad del estado real y el sustrato del producto; se lo alcanza por su socket local | Término incorporado por la Fase A previa [FA] y conservado |
| Socket del motor de contenedores | Punto de acceso local a la interfaz programática del motor. Acceder a él equivale a control administrativo del host | — |
| Servicio | La configuración de un contenedor dentro de un proyecto SelfHosted: origen, variables, red, montajes, límites. No tiene estado de encendido | — |
| Despliegue | Intento concreto de materializar la configuración de un servicio: el contenedor creado, con su ciclo de vida | Un despliegue parcial es un estado legítimo del modelo (D-1) |
| Adopción | Incorporación de un contenedor ya existente en el servidor a un proyecto SelfHosted, sin recrearlo. Importa su configuración y lo vincula por identificador | — |
| Canvas o lienzo | Vista por defecto de un proyecto SelfHosted: espacio visual infinito donde cada bloque es un servicio y cada arista una dependencia | — |
| Arista o enlace | Conexión dibujada en el lienzo. Representa que un servicio depende de otro del mismo proyecto SelfHosted. Casi siempre nace de una referencia de variable, y también puede existir sin variable cuando su única razón de ser es esperar al destino | Tiene dos ejes independientes: espera al destino, que es una propiedad declarada, y referencia el host |
| Changeset | Conjunto de cambios de configuración acumulados y pendientes de aplicar en lote sobre un proyecto SelfHosted | Se muestra en modo pendiente hasta que se aplica |
| Modo pendiente | Estado visual de un nodo o de una arista que existe en el changeset y todavía no se aplicó | — |
| Catálogo | Colección de plantillas reutilizables, editable, exportable e importable. Es la cuarta vía de alta de un servicio. Nada del catálogo corre: sus ítems son definiciones en reposo, y arranca vacío en una instalación nueva | — |
| Subgrafo parametrizado | Contenido de un ítem del catálogo: uno o varios servicios con sus aristas y con huecos parametrizables. Al instanciarlo se crean N servicios, cada uno con su propio contenedor | — |
| Variable compartida del proyecto | Variable definida una sola vez a nivel proyecto SelfHosted y referenciable desde cualquiera de sus servicios. Puede ser secreta | Capacidad F-23, decisión D-5 |
| Referencia de variable | Valor de una variable expresado como una expresión que apunta a otra variable, en lugar de como literal. Se resuelve antes de crear el contenedor; el contenedor ve el valor, nunca la expresión | Cuando apunta a otro servicio se persiste vinculada al servicio y no a su nombre (D-8) |
| Objeto con identidad | Elemento del modelo con identificador propio, cuyas relaciones con otros se establecen por ese identificador y nunca por su nombre, que es un atributo | Principio D-12 |
| Higiene del modelo | Conjunto de condiciones que el sistema detecta y advierte sin bloquear: variables compartidas huérfanas, nombres repetidos en el mismo ámbito, claves que ya existen al instanciar y referencias sin uso | Capacidad F-25, decisión D-13. Informa, nunca impide |
| Huérfano | Servicio cuyo contenedor vinculado ya no existe en el motor de contenedores | — |
| Escalado horizontal | Agregar réplicas del mismo servicio. En esta solución, manual | Sin distribución de tráfico entre réplicas en esta versión |
| Escalado vertical | Aumentar los recursos de procesamiento y memoria asignados a un servicio. En esta solución, manual | — |
| Autoarranque | Marca que indica que un proyecto SelfHosted o un servicio debe levantarse al iniciar el sistema administrador | — |
| Token de API | Credencial de máquina, con ámbitos y vigencia, revocable individualmente, usada por automatismos | — |
| Ámbito | Permiso concreto asociado a un token de API | — |
| Etapa | Unidad de entrega del proyecto. Se especifica con una plantilla obligatoria, termina en un punto de control y se corresponde con una rama y un pull request | Es la unidad de gestión: no hay sprints de duración fija |
| Hito demostrable | Etapa que entrega un flujo de usuario completo y operativo, y se recorre delante del cliente | Abreviatura en uso: HD |
| Hito interno | Etapa que confirma decisiones estructurales caras de revertir; la valida el agente humano y no se muestra al cliente | Abreviatura en uso: HI |
| Puerta técnica | Verificación medida que condiciona una decisión de arquitectura. Una puerta que no pasa detiene la planificación de lo que depende de ella | Las dos declaradas son PT-01 y PT-02 |
| Informe de cierre | Documento autocontenido de trece secciones que cierra cada etapa, publicado antes de convocar el punto de control | Está escrito para quien no vio escribir el código y va a probarlo |
| Punto de control | Instancia bloqueante en la que el agente humano del proyecto ejecuta el guion de demostración y da o niega el OK de la etapa | El pull request de la etapa es el punto de control |

---

## §10. Trazabilidad

### §10.1 Upstream

| Sección de este documento | Origen en el SOLUTION-INTAKE |
| --- | --- |
| §1 Problema de negocio | §1 Idea y problema |
| §2 Audiencia y stakeholders | §2 Audiencia y stakeholders; tabla de supuestos (S-06) |
| §3 Propuesta de valor | §3 Propuesta de valor y diferenciación; §22.2 [FA] |
| §4 Visión a 3 años | §9 Exclusiones; §22.1 [FA] |
| §5 Objetivos SMART | §8 Métricas de éxito (S-01, confirmado); §17.P.10; §22.1 [FA] |
| §6 Métricas de éxito | §8 Métricas de éxito; §17.P.10 |
| §7 Restricciones | §10 Restricciones del cliente; §22.2 [FA] |
| §8 Riesgos | §11 Riesgos detectados desde el negocio, de donde salen las columnas de riesgo, probabilidad, impacto y mitigación [E]; §17.P.9 y §24.2, de donde salen los tres riesgos abiertos de plataforma. La columna `Responsable` de §8.1 no proviene del intake: es material de la Fase A previa [FA], según se declara en esa sección |
| §9 Glosario del dominio | §12 Glosario del dominio del cliente; §22.2 [FA] |

### §10.2 Downstream

| Categoría que consume | Qué consume de este documento |
| --- | --- |
| 01-Necesidades-Negocio | El problema de §1, los diferenciadores de §3.2 y las restricciones de §7, para derivar las necesidades NB-01 a NB-08 y sus criterios de éxito |
| 02-Especificacion-Funcional | El glosario de §9, como vocabulario obligatorio de los casos de uso y de las reglas de negocio |
| 03-UX-UI-DX | La promesa central de §3.1 y los diferenciadores DV-02 y DV-03, que fijan qué debe ser visible en el lienzo y en el flujo de cambios pendientes |
| 05-Arquitectura-Tecnica | Los riesgos RG-01 a RG-10 de §8.1, como origen de los registros de decisión de arquitectura de mitigación |
| 07-Plan-Sprint | Las restricciones RE-01, RE-02, RE-04 y RE-12 de §7, que fijan la cadencia y el carácter bloqueante del punto de control |
| 08-Calidad-Y-Pruebas | Los objetivos de §5 y las métricas de §6, que deben quedar medibles; y los riesgos abiertos RP-01 a RP-03 de §8.2, con su medición asignada |
| 10-Examples | La escala objetivo de OBJ-05, que fija el tamaño del juego de datos de siembra |

---

## Control de cambios

| Versión | Fecha | Cambios | Autor |
| --- | --- | --- | --- |
| 1.0 | 2026-07-29 | Versión inicial, generada bajo el conjunto normativo 4.0 del Framework SDD a partir de `SOLUTION-INTAKE-SelfHosted-Service` versión 2.2. Toma como insumo el consolidado de la Fase A previa transcripto en la Parte E del intake, conservando los identificadores `OBJ-XX`, `DV-XX` y `RE-XX` ya emitidos. Emite los identificadores `RP-01` a `RP-03` para los tres riesgos abiertos de plataforma que §17.P.9 del intake enuncia sin identificador. Declara como brecha la confirmación pendiente de OBJ-05 | Product Manager Senior (AG-00) |
| 1.0 | 2026-07-29 | Corrección de §8.1 absorbida dentro de la versión de emisión, sin subir versión, por la política de versionado de `Master-Prompt.md` §5: el documento estaba en estado `Propuesto` y la corrección proviene del audit de su propia fase. Reatribución de la columna `Responsable` de la matriz de riesgos, de `[E]` a `[FA]`, con la procedencia declarada en prosa antes de la tabla y la aclaración de que se consume como propuesta previa. Restitución fiel de los diez valores de esa columna contra la fuente `[FA]` `_legacy/2026-07-28/00-Contexto/Vision-Producto-v1.5.md` §8: se repone RG-10 a «Product Manager y equipo de desarrollo», y además RG-03 a «Propietario del servidor y equipo de desarrollo», RG-07 a «Propietario del servidor» y RG-09 a «Equipo de desarrollo», tres estrechamientos que el hallazgo no enumera y que se detectaron al verificar la fuente fila por fila. Se opta por restituir en lugar de declarar el cambio, que era la otra alternativa admitida, para que la columna quede como transcripción fiel y no sobreviva ninguna divergencia sin declarar. Actualización de la fila de §8 de la tabla de trazabilidad upstream de §10.1, que ahora separa qué columnas son `[E]` y cuál es `[FA]`. Origen: hallazgo H-01, P1, del informe [`Audit/A-00-01-r1.md`](../Audit/A-00-01-r1.md) | Product Manager Senior (AG-00) |
| 1.0 | 2026-07-29 | Corrección de la cabecera absorbida dentro de la versión de emisión, sin subir versión, por el mismo motivo. El campo `Trazabilidad upstream` pasa a enumerar la unión de las secciones que la tabla de §10.1 declara como origen: se agregan §9, §17.P.9, §24.2 y la sección «Supuestos registrados por este intake y su estado», que el cuerpo citaba y la cabecera no nombraba. Origen: hallazgo H-02, P2, del mismo informe | Product Manager Senior (AG-00) |
| 1.0 | 2026-07-29 | Adecuación a `Rules-Contexto` 2.1, absorbida dentro de la versión de emisión, sin subir versión y sin archivar, por la política de versionado de `Master-Prompt.md` §5. §1.1 de la regla retira a esta categoría la autoridad de arbitrar, y §6 suma el criterio de que ninguna prioridad, exclusión, fecha objetivo, target de métrica ni criterio de transición se origine acá. Se corrió el catálogo de ambigüedades de §6.1 completo sobre el documento. Dos cambios en consecuencia. §5 y §6: se declara que ningún target ni plazo se origina en esta categoría, con el origen de cada uno explicitado —§8 del intake para OBJ-01 a OBJ-04, §17.P.10 y PT-01 para OBJ-05—, y se precisa que OBJ-05 no figura entre las métricas de §8 sino que deriva de §22.1 [FA]. §8.2: por el ítem G1 del catálogo, se retiran los valores de probabilidad, impacto y responsable de RP-01 a RP-03, que ninguna fuente declara y que este documento había asignado; las tres columnas pasan a declarar la ausencia y la evaluación se escala como brecha al Product Owner. La mitigación y la medición asignada de los tres se conservan, porque sí son evidencia del intake | Product Manager Senior (AG-00) |
