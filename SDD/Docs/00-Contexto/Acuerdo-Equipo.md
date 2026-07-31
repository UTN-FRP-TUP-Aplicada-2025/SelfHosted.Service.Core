# Acuerdo de Equipo

**Producto:** SelfHosted Service (`Slug-Producto`: `SelfHosted-Service`)
**Documento:** Acuerdo-Equipo.md
**Versión:** 2.0
**Estado:** Propuesto
**Fecha:** 2026-07-30
**Autor:** Product Manager Senior (AG-00)
**Trazabilidad upstream:** PRODUCT-INTAKE-SelfHosted-Service §2, §10, §15, §15.1, §22.6
**Trazabilidad downstream:** 06-Backlog-Tecnico, 07-Plan-Sprint, 08-Calidad-Y-Pruebas, 09-Devops, 11-Documentacion

---

## Tabla de contenido

- [§1. Propósito](#1-propósito)
  - [§1.1 Por qué este documento se genera](#11-por-qué-este-documento-se-genera)
  - [§1.2 El modelo de gestión adoptado no es Scrum](#12-el-modelo-de-gestión-adoptado-no-es-scrum)
- [§2. Equipo y roles](#2-equipo-y-roles)
- [§3. Cadencia de ceremonias](#3-cadencia-de-ceremonias)
- [§4. Acuerdos de trabajo](#4-acuerdos-de-trabajo)
  - [§4.1 Estrategia de ramas y punto de control](#41-estrategia-de-ramas-y-punto-de-control)
  - [§4.2 Convenciones de commit, versionado y migraciones](#42-convenciones-de-commit-versionado-y-migraciones)
  - [§4.3 Documentación de etapa](#43-documentación-de-etapa)
  - [§4.4 Manejo de secretos](#44-manejo-de-secretos)
  - [§4.5 Comunicación, decisiones y tiempos de respuesta](#45-comunicación-decisiones-y-tiempos-de-respuesta)
  - [§4.6 Revisión de código](#46-revisión-de-código)
- [§5. Definition of Done](#5-definition-of-done)
- [§6. Definition of Ready](#6-definition-of-ready)
- [§7. Herramientas](#7-herramientas)
- [Control de cambios](#control-de-cambios)

---

## §1. Propósito

Este documento fija cómo trabaja el equipo que construye SelfHosted Service: quién decide qué, qué ceremonias existen y por qué evento se disparan, qué reglas de trabajo son verificables, y qué condiciones tiene que cumplir una etapa para poder iniciarse y para poder darse por terminada.

Todo acuerdo de este documento está redactado como regla verificable, con la verificación declarada al lado. Un acuerdo que no se pueda contrastar contra el repositorio o contra un artefacto publicado no entra acá.

### §1.1 Por qué este documento se genera

Las reglas constructivas de la categoría marcan este documento como recomendado, y no obligatorio, para un equipo de dos personas. Se genera igual, por decisión declarada, con un motivo concreto: el cliente ya tenía cerrado un acuerdo operativo completo, con veintiocho reglas de trabajo, una definición de terminado de doce condiciones y una definición de listo de doce condiciones, todas con identificador emitido. Ese material condiciona a las categorías 06-Backlog-Tecnico, 07-Plan-Sprint y 08-Calidad-Y-Pruebas, que lo citan por identificador. Sin este documento, esas tres categorías tendrían que derivarlo cada una por su cuenta desde el intake.

Los identificadores `AT-XX`, `DoD-XX` y `DoR-XX` se conservan exactamente como fueron emitidos, porque hay artefactos que ya los citan.

### §1.2 El modelo de gestión adoptado no es Scrum

No hay sprints de duración fija, ni fechas comprometidas, ni estimación por puntos, ni ceremonias de cadencia fija. La unidad de gestión es la etapa, y la cadencia la marca su cierre. Toda ceremonia se dispara por un evento del ciclo de la etapa y ninguna por calendario.

Esto no es una omisión ni una simplificación del equipo: se deriva de tres restricciones declaradas por el cliente. No hay fecha objetivo (RE-02); las etapas se ejecutan en serie con el punto de control como cuello por diseño (RE-04); y no hay horario core, franja de disponibilidad comprometida ni plazo máximo de respuesta (RE-12).

---

## §2. Equipo y roles

La regla de separación que ordena los cuatro roles es que la fusión de la rama de una etapa la realiza el agente humano del proyecto y nunca el agente IA de codificación. Es verificable en el historial del pull request.

| Rol | Quién lo cumple | Responsabilidad operativa | Autoridad |
| --- | --- | --- | --- |
| Agente humano del proyecto | El propietario del servidor de referencia, en su rol de validación técnica | Recibe el guion de demostración, lo ejecuta, da o niega el OK, fusiona la rama y avisa el cierre | Única autoridad para aprobar un punto de control, fusionar una rama y aceptar un cambio de alcance |
| Equipo de desarrollo | Dos desarrolladores | Especifica la etapa con la plantilla obligatoria, construye el corte vertical, escribe las pruebas de las reglas de negocio que introduce y redacta el informe de cierre | Decide la implementación dentro del alcance de la etapa; eleva todo lo que lo exceda |
| Agente IA de codificación | Orquestador SDD y sus subagentes | Genera la documentación de especificación y el código de cada etapa, y verifica que los guiones de demostración previos siguen pasando antes de preparar el pull request | No fusiona ramas y no aprueba puntos de control |
| Administrador del producto | El mismo propietario, en su rol de usuario final | Opera el producto entregado y reporta lo que no funciona | Origen de todo pedido de cambio |

Los tres primeros roles trabajan sobre etapas en serie. El cuarto sólo interviene una vez que existe producto entregado.

---

## §3. Cadencia de ceremonias

Seis ceremonias, todas disparadas por un evento del ciclo de la etapa. Ninguna tiene cadencia fija ni duración comprometida: las fuentes no declaran duraciones y este documento no fija ninguna, porque fijarla sería inventar un acuerdo que el cliente no tomó. Lo que sí está declarado, y es lo verificable, es el evento que dispara cada una y su condición de cierre.

| Ceremonia | Cuándo | Duración | Participantes | Notas |
| --- | --- | --- | --- | --- |
| Especificación de etapa | Antes de escribir la primera línea de código de la etapa | No comprometida. Termina cuando la etapa cumple la definición de listo de §6 | Equipo de desarrollo, agente IA de codificación | Bloqueante: una etapa sin criterios de aceptación verificables no se puede iniciar |
| Verificación de puerta técnica | Antes de comprometer el corte que la puerta condiciona | No comprometida. Termina cuando la medición está registrada | Equipo de desarrollo | Una puerta sin medir detiene la planificación de lo que depende de ella. Las dos declaradas son PT-01 y PT-02 |
| Publicación del informe de cierre | Antes de convocar el punto de control | No comprometida. Termina cuando el informe está publicado y anotado en su índice | Equipo de desarrollo | Sin informe publicado y anotado no se convoca al agente humano del proyecto |
| Punto de control de etapa | Al terminar cada etapa, sobre el pull request abierto | No comprometida. El bloqueo no vence | Agente humano del proyecto, equipo de desarrollo | Bloqueante: el proyecto no avanza sin OK explícito |
| Fusión y etiquetado | Inmediatamente después del OK del punto de control | No comprometida | Agente humano del proyecto | La rama se fusiona, se borra y la etapa recibe su etiqueta |
| Revisión de alcance | Sólo dentro de un punto de control | No comprometida | Agente humano del proyecto | Una etapa en curso no cambia de alcance |

---

## §4. Acuerdos de trabajo

Veintiocho acuerdos, con los identificadores emitidos por la Fase A previa y conservados [FA]. Cada uno lleva su forma de verificación, porque un acuerdo que no se verifica no es un acuerdo sino una intención.

### §4.1 Estrategia de ramas y punto de control

| # | Regla | Cómo se verifica |
| --- | --- | --- |
| AT-01 | Una rama por etapa, creada desde la rama principal | Historial con una única rama de etapa abierta a la vez |
| AT-02 | No se abre la rama de una etapa antes de fusionar la anterior | Las fechas de creación y de fusión no se solapan |
| AT-03 | Un pull request por etapa; el pull request es el punto de control | Un pull request por etapa cerrada |
| AT-04 | La rama se borra después de la fusión | No quedan ramas de etapa cerradas en el remoto |
| AT-05 | Cada etapa cerrada recibe su etiqueta | Desplegar la imagen de esa etiqueta reproduce la demostración de esa etapa |
| AT-06 | No se fusiona sin OK explícito, dado después de ejecutar el guion de demostración | El pull request registra la aprobación antes de la fusión |
| AT-07 | La fusión la realiza el agente humano del proyecto, no el agente IA de codificación | Autor de la fusión en el historial |
| AT-08 | Antes de abrir el pull request se verifica que los guiones de demostración previos siguen pasando | El pull request declara el resultado; es control bloqueante |

### §4.2 Convenciones de commit, versionado y migraciones

| # | Regla | Cómo se verifica |
| --- | --- | --- |
| AT-10 | Convención de mensajes de commit estructurados, sin excepciones | Control automatizado sobre los mensajes |
| AT-11 | Versionado semántico, único para todo el producto, porque se despliega como un único artefacto | La versión calculada en el pipeline es única |
| AT-12 | La versión se deriva de los mensajes desde la etiqueta anterior; hasta la primera entrega completa permanece en la serie 0.x | Salida del cálculo de versión |
| AT-13 | Las migraciones de esquema no se editan una vez fusionadas | Ninguna migración fusionada aparece modificada después |
| AT-20 | El registro de cambios se actualiza en la rama de la etapa | El commit del registro pertenece a esa rama |

Sobre AT-11: el enunciado original de la Fase A decía «para los cuatro proyectos de código». Desde que el producto tiene un único proyecto de código, la unicidad de la versión pasó de ser un acuerdo del equipo a ser una propiedad estructural. La regla se conserva con su identificador porque su efecto verificable no cambió.

### §4.3 Documentación de etapa

| # | Regla | Cómo se verifica |
| --- | --- | --- |
| AT-09 | Un criterio de aceptación incumplido se declara en el informe; un informe que declara terminada una etapa incompleta invalida el punto de control | Contraste entre el informe y el resultado del guion de demostración |
| AT-14 | Cada etapa cierra con su informe autocontenido, publicado antes del punto de control | El archivo existe, con su nombre de orden y de etapa |
| AT-15 | El informe tiene sus trece secciones obligatorias, en orden | Revisión de encabezados |
| AT-16 | El informe se lee sin abrir el análisis ni el código | Revisión del agente humano del proyecto antes del punto de control |
| AT-17 | Todo comando que aparece en un informe fue ejecutado tal como está escrito | Ejecución del guion durante el punto de control |
| AT-18 | El índice de informes se mantiene al día, sin huecos | El índice lista todos los informes existentes |
| AT-19 | Los informes anteriores no se editan, salvo para actualizar su estado | Historial de cambios de los archivos publicados |

El informe de cierre no es un artefacto de las categorías de especificación: vive en el repositorio de documentación y es documentación de proceso. Condiciona a dos categorías: 07-Plan-Sprint, que lo incorpora como definición de terminado de cada etapa, y 11-Documentacion, que no debe duplicar su contenido.

### §4.4 Manejo de secretos

| # | Regla | Cómo se verifica |
| --- | --- | --- |
| AT-21 | Ningún secreto entra al repositorio | Control de verificación de secretos en el pipeline, bloqueante |
| AT-22 | Los tokens de un automatismo se guardan como secretos del remoto y con ámbito mínimo | Revisión de la configuración y del ámbito emitido |
| AT-23 | Los informes transcriben credenciales de ejemplo del entorno de desarrollo, nunca un secreto de producción ni una contraseña real elegida por el agente humano del proyecto | Revisión del informe antes del punto de control |

### §4.5 Comunicación, decisiones y tiempos de respuesta

| # | Regla | Cómo se verifica |
| --- | --- | --- |
| AT-24 | Toda decisión que exceda el alcance de la etapa se eleva y se resuelve en el punto de control | El pedido queda registrado, no aplicado |
| AT-25 | El canal formal de aprobación es el pull request | El pull request contiene la aprobación |
| AT-26 | No hay plazo máximo de respuesta; el bloqueo del punto de control no vence | Ninguna rama posterior abierta antes de la fusión, cualquiera sea el tiempo transcurrido |
| AT-27 | Una pregunta que bloquea la especificación se registra como supuesto abierto con dueño y destino, y no se resuelve por invención | Los supuestos abiertos tienen dueño y destino declarados |
| AT-28 | No hay horario core ni franja de disponibilidad comprometida; la coordinación es asíncrona y su registro es el pull request | Ninguna regla operativa referencia una franja horaria |

Sobre el tiempo de respuesta comprometido: no hay ninguno, y es una decisión explícita del agente humano del proyecto del 2026-07-27, no una omisión de este documento. Las fuentes no declaran horario ni plazo: declaran el bloqueo hasta el OK explícito. Ningún artefacto downstream debe derivar un acuerdo de nivel de servicio de reloj a partir de AT-26 ni de AT-28. La consecuencia operativa, declarada en el [Alcance del Producto](Alcance-Producto.md) §7, es que una etapa terminada puede quedar esperando su punto de control por tiempo indefinido, y esa espera no habilita a iniciar la siguiente.

### §4.6 Revisión de código

Las fuentes no declaran una ceremonia de revisión de código separada del punto de control, y este documento no inventa una. El pull request de la etapa concentra las tres funciones: revisión, demostración y aprobación. Lo que sí está declarado y es bloqueante:

- El pull request no se abre sin que los guiones de demostración previos hayan pasado (AT-08).
- El pull request no se fusiona sin OK explícito dado después de ejecutar el guion de demostración de la etapa (AT-06).
- La fusión la hace el agente humano del proyecto y nunca el agente IA de codificación (AT-07).
- Los controles automatizados del pipeline enumerados en §5 son bloqueantes, y su resultado se lee en el propio pull request.

Si el equipo adopta más adelante una revisión por pares adicional, es un cambio de este acuerdo y se registra subiendo la versión de este documento.

---

## §5. Definition of Done

Doce condiciones de terminado de una etapa, once bloqueantes y una no bloqueante. La categoría 08-Calidad-Y-Pruebas es la que las convierte en controles ejecutables del pipeline y la que declara cómo se mide cada una; acá se conserva el enunciado y el identificador con el que esa categoría las cita.

| # | Condición | Bloqueante |
| --- | --- | --- |
| DoD-01 | La construcción termina en cero y sin advertencias de compilación | Sí |
| DoD-02 | La batería de pruebas pasa completa | Sí |
| DoD-03 | La cobertura alcanza el mínimo de cada capa, medido por filtro de espacio de nombres: capa `Domain` 90 % de líneas y 85 % de ramas; capa `Application` 80 % y 70 %; capa `Web` 60 % y 50 %; capa `Infrastructure` 55 % y 45 % | Sí |
| DoD-04 | Las reglas de negocio que la etapa introdujo tienen prueba automatizada | Sí |
| DoD-05 | Ninguna dependencia con vulnerabilidad conocida de severidad alta o crítica | Sí |
| DoD-06 | Ningún secreto en el árbol de fuentes | Sí |
| DoD-07 | Los guiones de demostración de todas las etapas anteriores siguen pasando, sin corrección | Sí |
| DoD-08 | El informe de cierre está publicado, con sus trece secciones, y anotado en el índice | Sí |
| DoD-09 | El registro de cambios está actualizado en la rama de la etapa | Sí |
| DoD-10 | El guion de demostración se ejecutó en el punto de control con OK explícito del agente humano del proyecto | Sí |
| DoD-11 | Ningún tipo del cliente del motor de contenedores aparece fuera de su carpeta de adaptador, y las pruebas de la capa `Domain` no requieren motor de contenedores ni base de datos | Sí |
| DoD-12 | El inventario de componentes de la construcción se genera y se adjunta al artefacto | No |

Los umbrales de DoD-03 provienen del supuesto S-02, confirmado sin cambios por el agente humano del proyecto el 2026-07-27. Son control bloqueante del pipeline y no una meta indicativa.

DoD-11 es la forma verificable que tomó la regla de aislamiento del cliente del motor de contenedores desde que las cuatro capas se compilan en un único proyecto de código: lo que antes hacía cumplir el grafo de referencias entre proyectos de código ahora lo hace cumplir un test de arquitectura, que es control bloqueante del pipeline. La degradación de garantía está asumida y declarada: la violación se detecta al correr las pruebas y no al compilar. Lo que no cambia es que ninguna violación llega a la rama principal.

---

## §6. Definition of Ready

Doce condiciones para que una etapa pueda iniciarse, todas bloqueantes. La categoría 06-Backlog-Tecnico es la que las aplica al preparar cada ítem, y la categoría 07-Plan-Sprint la que verifica que se cumplan antes de abrir la rama de la etapa.

| # | Condición |
| --- | --- |
| DoR-01 | La etapa declara su tipo: hito interno o hito demostrable |
| DoR-02 | Declara objetivo, alcance y fuera de alcance |
| DoR-03 | Declara su entregable tangible |
| DoR-04 | Declara su guion de demostración, con el estado de partida y cómo se llega a él |
| DoR-05 | Declara criterios de aceptación verificables. Una etapa sin ellos no se puede iniciar |
| DoR-06 | Declara su punto de control y qué debe explicar su informe de cierre en particular |
| DoR-07 | Referencia la sección del análisis que especifica lo que implementa |
| DoR-08 | El corte es vertical: atraviesa interfaz, aplicación, dominio, datos y motor de contenedores. Está prohibido planificar por capa técnica |
| DoR-09 | De la etapa `c` en adelante, produce algo que el cliente pueda recorrer en el navegador. Si no, está mal cortada y se redivide |
| DoR-10 | La puerta técnica que condiciona la etapa, si existe, está medida y aprobada |
| DoR-11 | Ningún supuesto abierto del que dependa el comportamiento a especificar sigue sin respuesta del cliente |
| DoR-12 | El guion de demostración arranca con los guiones de ejecución del repositorio, dentro del entorno de desarrollo, sin pasos manuales de preparación fuera de ellos |

DoR-11 es el que conecta esta definición con el registro de brechas del [Alcance del Producto](Alcance-Producto.md) §6.3: una brecha abierta no impide avanzar en general, pero impide iniciar la etapa que la necesita.

---

## §7. Herramientas

| Herramienta | Para qué se usa | Regla asociada |
| --- | --- | --- |
| Repositorio remoto en GitHub | Alojar el código del producto, con el flujo de una rama y un pull request por etapa | AT-01 a AT-08. El remoto está configurado y verificado con evidencia [E] |
| Repositorio de documentación separado | Alojar los informes de cierre de etapa y su índice acumulativo | AT-14, AT-18 |
| GitHub Actions con ejecutor autoalojado en el propio servidor | Ejecutar el pipeline, incluidas las pruebas de integración, que requieren el socket del motor de contenedores disponible en el ejecutor | AT-08, AT-10, AT-21, DoD-01 a DoD-07 |
| Entorno de desarrollo contenedorizado declarativo | Construir, ejecutar y probar sin instalar herramientas en el equipo del desarrollador | Restricción RE-08, restricción de plataforma CP-02 |
| Guiones del repositorio | Construir, ejecutar, migrar, probar y reiniciar la base local | DoR-12: todo guion de demostración arranca con ellos |
| Configuración de depuración del editor | Camino de depuración separado del de los guiones | Sin regla asociada; es una comodidad del equipo de desarrollo |
| Navegador de escritorio del equipo del desarrollador | Único lugar donde se observa el resultado de un guion de demostración | Restricción de plataforma CP-10, con la familia y el piso de versión declarados en [Compatibilidad de Plataformas](Compatibilidad-Plataformas.md) |
| Registro de cambios del producto | Registrar qué entregó cada etapa | AT-20, DoD-09 |
| Herramienta de migración de esquema, declarada local del repositorio y no global | Generar y aplicar migraciones con su versión versionada junto al código | AT-13 |

---

## Control de cambios

| Versión | Fecha | Cambios | Autor |
| --- | --- | --- | --- |
| 1.0 | 2026-07-29 | Versión inicial, generada bajo el conjunto normativo 4.0 del Framework SDD a partir de `SOLUTION-INTAKE-SelfHosted-Service` versión 2.2. Se genera por decisión declarada, y no por regla de la tabla de inclusión de la categoría, con el motivo registrado en §1.1. Conserva los veintiocho identificadores `AT-01` a `AT-28`, los doce `DoD-01` a `DoD-12` y los doce `DoR-01` a `DoR-12` emitidos por la Fase A previa. Declara explícitamente la ausencia de acuerdo de nivel de servicio de reloj y la ausencia de ceremonia de revisión de código separada del punto de control, en lugar de fijar valores que el cliente no declaró | Product Manager Senior (AG-00) |
| 2.0 | 2026-07-30 | Migración normativa del conjunto 4.1 al 6.0, fase M4, bajo `Rules-Contexto` 3.1 y `Vocabulario-Rules` 2.1. Clasificación **regenerar contenido** por el salto major de la regla que lo gobierna; fuente de contenido: el documento de origen, archivado en `_legacy/2026-07-30/`. Sube **major** porque la nomenclatura anterior deja de cumplir. La cabecera pasa de la etiqueta `Proyecto` a `Producto` y el identificador `Nombre-Solucion` a `Slug-Producto`, según `Vocabulario-Rules` §3 y §4 R3, que fija esta categoría a nivel producto y le prohíbe declarar un proyecto de código; la trazabilidad upstream apunta al `PRODUCT-INTAKE-SelfHosted-Service` renombrado; el artefacto hermano `Alcance-Proyecto.md` pasa a `Alcance-Producto.md` en las dos referencias cruzadas de §4.5 y §6. Sustitución léxica **por ocurrencia** según `Vocabulario-Rules` §9.5 y el plan de migración §3.5: de las seis ocurrencias de la cadena `soluci`, una era el identificador de cabecera y cinco designaban el nivel superior y pasan a «producto» con su concordancia de género —el rol «administrador del producto» de §2, el enunciado de AT-11 y su nota de §4.2, donde «toda la solución» pasa a «todo el producto», y las dos filas de §7 sobre el repositorio remoto y el registro de cambios—. No hay ninguna «resolución» en este documento. De las veintitrés ocurrencias de «proyecto», **ninguna pasó a «proyecto de código»** que no lo fuera ya: las de §4.2 y DoD-11 designaban la unidad de compilación y ya estaban en la forma completa; el resto —«agente humano del proyecto», que es un rol, y «el proyecto no avanza sin OK explícito» de §3— es el emprendimiento y queda a secas, que es la forma que §12 del intake declara correcta para el contexto de proceso, predominante en este documento. Ningún acuerdo `AT-XX`, condición `DoD-XX` o `DoR-XX`, rol, ceremonia ni herramienta cambió de enunciado ni de identificador: la migración es léxica y de forma de cabecera | Product Manager Senior (AG-00) |
