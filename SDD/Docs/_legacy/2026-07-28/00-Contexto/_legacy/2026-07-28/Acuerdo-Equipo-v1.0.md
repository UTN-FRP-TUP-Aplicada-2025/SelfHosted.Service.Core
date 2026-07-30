# Acuerdo de Equipo

**Proyecto:** SelfHosted.Service.Core (solución; proyecto principal SelfHosted-Web)
**Documento:** Acuerdo-Equipo-v1.0.md
**Versión:** 1.0
**Estado:** Propuesto
**Fecha:** 2026-07-27
**Autor:** Product Manager Senior (AG-00) en conjunción con Analista de Negocio Senior (AG-01)
**Trazabilidad upstream:** SOLUTION-INTAKE v1.1 cabecera y tabla de estado de supuestos, §2, §10, §15, §15.1, §17.1 P.6, §17.1 P.7, §17.1 P.8, §17.2 P.6, §17.3 P.6, §17.3 P.8, §17.4 P.6, §17.4 P.8
**Trazabilidad downstream:** 06-Backlog, 07-Plan-Sprint, 08-Calidad-Y-Pruebas, 09-Devops, 11-Documentacion

## Tabla de contenido

- [1. Propósito](#1-propósito)
- [2. Equipo y roles](#2-equipo-y-roles)
  - [2.1 Modelo de gestión adoptado](#21-modelo-de-gestión-adoptado)
  - [2.2 Roles y responsabilidades](#22-roles-y-responsabilidades)
- [3. Cadencia de ceremonias](#3-cadencia-de-ceremonias)
- [4. Acuerdos de trabajo](#4-acuerdos-de-trabajo)
  - [4.1 Ramas y pull requests](#41-ramas-y-pull-requests)
  - [4.2 Revisión y aprobación](#42-revisión-y-aprobación)
  - [4.3 Convenciones de commits y versionado](#43-convenciones-de-commits-y-versionado)
  - [4.4 Documentación](#44-documentación)
  - [4.5 Secretos](#45-secretos)
  - [4.6 Comunicación, horario y tiempos de respuesta](#46-comunicación-horario-y-tiempos-de-respuesta)
- [5. Definition of Done](#5-definition-of-done)
- [6. Definition of Ready](#6-definition-of-ready)
- [7. Herramientas](#7-herramientas)
- [Control de cambios](#control-de-cambios)

---

## 1. Propósito

Este documento fija las reglas operativas de trabajo del equipo. Cada acuerdo está redactado como una regla verificable: se puede comprobar si se cumplió mirando el repositorio, el pull request, el pipeline o el índice de informes. No hay acuerdos de intención.

Se genera pese a que el equipo es de dos personas, apartándose del umbral por defecto de la categoría, porque el cliente ya declaró cerrado un acuerdo operativo completo: etapas en serie, una rama y un pull request por etapa siendo el pull request el punto de control, convención de mensajes de cambio, etiqueta por etapa cerrada, registro de cambios en la rama de la etapa e informe de cierre de trece secciones como entregable bloqueante. Ese acuerdo necesita un lugar único y citable, porque condiciona a las categorías 06, 07, 08, 09 y 11.

## 2. Equipo y roles

### 2.1 Modelo de gestión adoptado

El modelo no es Scrum. No hay sprints de duración fija, ni fechas comprometidas, ni estimación por puntos. La unidad de gestión es la etapa, y la cadencia la marca el cierre de cada una:

- Las etapas se ejecutan en serie. No se abre la rama de una etapa antes de que se haya fusionado la anterior.
- Cada etapa se especifica por completo con la plantilla obligatoria antes de empezar a codificarla.
- Cada etapa termina en un punto de control bloqueante: el trabajo se detiene, se presenta el guion de demostración y se espera el OK explícito del agente humano.
- El punto de control es un cuello por diseño, no un impedimento a resolver.

### 2.2 Roles y responsabilidades

| Rol | Quién | Responsabilidad operativa | Autoridad |
|---|---|---|---|
| Agente humano del proyecto | El propietario del servidor en su rol de validación técnica | Recibe el guion de demostración, lo ejecuta, da o niega el OK, fusiona la rama de la etapa y avisa el cierre | Única autoridad para aprobar un punto de control, fusionar y aceptar un cambio de alcance |
| Equipo de desarrollo | Dos desarrolladores | Especifican la etapa con la plantilla, construyen el corte vertical, escriben las pruebas de las reglas que introducen y redactan el informe de cierre | Deciden la implementación dentro del alcance de la etapa; elevan todo lo que exceda ese alcance |
| Agente IA de codificación | Orquestador y sus subagentes | Genera la documentación de especificación y el código de cada etapa; verifica que los guiones de las etapas previas siguen pasando antes de preparar el pull request | No fusiona ramas y no aprueba puntos de control |
| Administrador de la solución | El propietario en su rol de usuario final | Opera el producto entregado y reporta lo que no funciona | Origen de todo pedido de cambio |

Regla de separación: la fusión de la rama de etapa la realiza el agente humano, nunca el agente IA. Es verificable en el historial del pull request.

## 3. Cadencia de ceremonias

| Ceremonia | Cuándo | Duración | Participantes | Notas |
|---|---|---|---|---|
| Especificación de etapa | Antes de escribir la primera línea de código de la etapa | Lo que lleve completar los nueve campos de la plantilla | Equipo de desarrollo y agente IA; el agente humano valida | Una etapa sin criterios de aceptación verificables no se puede iniciar. Es bloqueante |
| Verificación de puerta técnica | Antes de comprometer el corte que la puerta condiciona | Lo que lleve ejecutar la medición y registrar el resultado | Equipo de desarrollo; el agente humano recibe el resultado | Aplica a PT-01 antes del corte del lienzo y a PT-02 en la etapa `a`. Una puerta sin medir detiene la planificación de lo que depende de ella |
| Publicación del informe de cierre | Antes de convocar el punto de control | Sin acotar; es entregable, no trámite | Equipo de desarrollo y agente IA | Sin informe publicado y anotado en su índice no se convoca al agente humano |
| Punto de control de etapa | Al terminar cada etapa, sobre el pull request abierto | Lo que dure la ejecución completa del guion de demostración, más los guiones acumulados de las etapas anteriores | Agente humano, con el equipo disponible | Bloqueante. El proyecto no avanza a la etapa siguiente sin OK explícito |
| Fusión y etiquetado | Inmediatamente después del OK | Minutos | Agente humano | La rama se fusiona, se borra y la etapa cerrada recibe su etiqueta |
| Revisión de alcance | Sólo dentro de un punto de control | Lo que lleve clasificar el pedido y decidir qué se posterga | Agente humano y equipo | Una etapa en curso no cambia de alcance. Ver `Alcance-Proyecto-v1.0.md` §9 |

No hay ceremonias de cadencia fija —ni diarias, ni de revisión periódica, ni retrospectivas programadas—, porque no hay sprints de duración fija. Toda ceremonia se dispara por un evento del ciclo de la etapa, y ese evento es observable en el repositorio.

## 4. Acuerdos de trabajo

### 4.1 Ramas y pull requests

| # | Regla | Cómo se verifica |
|---|---|---|
| AT-01 | Una rama por etapa, creada desde la rama principal | El historial muestra una única rama abierta a la vez, con punto de partida en la principal |
| AT-02 | No se abre la rama de una etapa antes de que la anterior esté fusionada | Las fechas de creación y de fusión de ramas consecutivas no se solapan |
| AT-03 | Un pull request por etapa. El pull request es el punto de control | Cada etapa cerrada tiene exactamente un pull request asociado |
| AT-04 | La rama se borra después de la fusión | No quedan ramas de etapa cerradas en el remoto |
| AT-05 | Cada etapa cerrada y fusionada recibe una etiqueta en el repositorio | Existe una etiqueta por etapa, y desplegar la imagen de esa etiqueta reproduce la demostración correspondiente |

### 4.2 Revisión y aprobación

| # | Regla | Cómo se verifica |
|---|---|---|
| AT-06 | No se fusiona sin OK explícito del agente humano tras ejecutar el guion de demostración de la etapa | El pull request registra la aprobación antes de la fusión |
| AT-07 | La fusión la realiza el agente humano, no el agente IA | El autor de la fusión en el historial |
| AT-08 | Antes de abrir el pull request, el agente IA verifica que todos los guiones de las etapas previas siguen pasando | El pull request declara el resultado de esa verificación; es un control de calidad bloqueante |
| AT-09 | Un criterio de aceptación incumplido se declara en el informe de cierre. Un informe que declara terminada una etapa incompleta invalida el punto de control | Contraste entre la sección de criterios del informe y el resultado del guion |

### 4.3 Convenciones de commits y versionado

| # | Regla | Cómo se verifica |
|---|---|---|
| AT-10 | Conventional Commits sin excepciones, en toda la solución | Control automatizado sobre los mensajes de la rama |
| AT-11 | SemVer 2.0.0 como esquema de versión, único para los cuatro proyectos, porque se despliegan como un único artefacto | La versión calculada en el pipeline es única |
| AT-12 | La versión se deriva de los mensajes de cambio desde la etiqueta anterior, en el pipeline. Mientras no haya primera entrega completa, permanece en la serie 0.x | Salida del cálculo de versión del pipeline |
| AT-13 | Las migraciones de esquema no se editan una vez fusionadas: un cambio de esquema se corrige con una migración nueva | Ninguna migración fusionada aparece modificada en un commit posterior |

El esquema de versión de AT-11, la convención de mensajes de AT-10 y la regla de cálculo de versión de AT-12 provienen de S-04, propuesto por el intake y confirmado sin cambios por el agente humano del proyecto el 2026-07-27, según la tabla de estado de supuestos del SOLUTION-INTAKE v1.1. AT-13 no proviene de S-04: la regla de no editar una migración fusionada es una decisión de diseño declarada por el SOLUTION-INTAKE v1.1 §17.3 P.7.

### 4.4 Documentación

| # | Regla | Cómo se verifica |
|---|---|---|
| AT-14 | Cada etapa cierra con su informe autocontenido, publicado antes de convocar el punto de control, en el repositorio de documentación bajo el directorio de avances | El archivo existe con el nombre de orden y etapa que le corresponde |
| AT-15 | El informe tiene las trece secciones obligatorias, en orden: identificación; qué se entregó; qué quedó fuera; cómo lo levanto; claves y credenciales; qué probar paso a paso; casos de ejemplo; qué debería ver; cómo está armado el proyecto; criterios de aceptación; no-regresión; problemas conocidos; qué habilita | Revisión de encabezados del informe |
| AT-16 | El informe es autocontenido: se lee sin abrir el análisis ni el código, y está escrito para quien no vio escribir el código y va a probarlo | Revisión por el agente humano antes del punto de control |
| AT-17 | Todo comando que aparece en un informe fue ejecutado tal como está escrito | Ejecución del guion durante el punto de control |
| AT-18 | El índice de informes se mantiene al día con etapa, tipo, fecha y estado | El índice lista todos los informes existentes, sin huecos |
| AT-19 | Los informes anteriores no se editan salvo para actualizar su estado | Historial de cambios de los archivos ya publicados |
| AT-20 | El registro de cambios de la solución se actualiza en la rama de la etapa, no después | El commit del registro de cambios pertenece a la rama de la etapa |

### 4.5 Secretos

| # | Regla | Cómo se verifica |
|---|---|---|
| AT-21 | Ningún secreto entra al repositorio: ni claves de firma, ni tokens, ni credenciales de registros | Control de calidad de verificación de secretos en el pipeline, bloqueante |
| AT-22 | Los tokens que use un automatismo se guardan como secretos del repositorio remoto y se emiten con el ámbito mínimo necesario | Revisión de la configuración del automatismo y del ámbito del token emitido |
| AT-23 | Los informes de cierre transcriben completas las credenciales de ejemplo del entorno de desarrollo, y nunca un secreto de producción ni la contraseña real del agente humano: en su lugar indican dónde consultarla | Revisión del informe antes del punto de control |

### 4.6 Comunicación, horario y tiempos de respuesta

| # | Regla | Cómo se verifica |
|---|---|---|
| AT-24 | Toda decisión que exceda el alcance de la etapa en curso se eleva al agente humano y se resuelve en el punto de control, no en el momento | El pedido queda registrado en el pull request o en el informe, no aplicado |
| AT-25 | El canal formal de aprobación es el pull request. Una aprobación dada por otro medio se transcribe al pull request antes de fusionar | El pull request contiene la aprobación |
| AT-26 | No hay plazo máximo de respuesta. El punto de control bloquea el avance hasta el OK explícito del agente humano, y ese bloqueo no vence: el orquestador no avanza a la etapa siguiente ni abre la rama siguiente por vencimiento de ningún plazo, sólo por OK recibido. Respaldo: restricción «Disponibilidad y tiempos de respuesta» del SOLUTION-INTAKE v1.1 §10 | No existe ninguna rama de etapa posterior abierta antes de la fusión de la anterior, cualquiera sea el tiempo transcurrido |
| AT-27 | Una pregunta que bloquea la especificación de una etapa se registra como supuesto abierto con dueño y con la sección del intake donde debe vivir la respuesta, y no se resuelve por invención | Los supuestos abiertos de `Alcance-Proyecto-v1.0.md` §6.2 tienen dueño y destino declarados |
| AT-28 | No hay horario core ni franja de disponibilidad comprometida, para ningún rol. La coordinación es asíncrona y su registro es el pull request: ningún acuerdo depende de que dos personas coincidan en un horario, y ninguna regla de este documento se expresa en horas del día. Respaldo: restricción «Disponibilidad y tiempos de respuesta» del SOLUTION-INTAKE v1.1 §10 | Ninguna regla operativa del acuerdo referencia una franja horaria, y toda aprobación queda asentada en el pull request |

Decisión declarada, no omisión. La restricción «Disponibilidad y tiempos de respuesta» del SOLUTION-INTAKE v1.1 §10 declara que no hay horario core ni franja de disponibilidad comprometida, que no hay plazo máximo de respuesta y que el punto de control bloquea indefinidamente hasta el OK explícito del agente humano. Su origen, declarado en la propia restricción, es una decisión del agente humano del proyecto tomada el 2026-07-27 al responder la batería de validación de intake, sobre unas fuentes que declaran el bloqueo hasta el OK explícito y no declaran ni horario ni plazo. La restricción es además explícita en que no debe derivarse ningún acuerdo de nivel de servicio de reloj a partir de ella. AT-26 y AT-28 son la traducción operativa de esa restricción: el bloqueo del punto de control no vence, y la disponibilidad no se promete. No es una brecha pendiente de completar. Si en algún momento se quisiera fijar un plazo o una franja, se declara en el intake y este documento se actualiza.

## 5. Definition of Done

La definición de terminado de una etapa es la unión de los controles de calidad bloqueantes del pipeline y de las reglas de cierre declaradas por el cliente. La categoría 08-Calidad-Y-Pruebas es la propietaria del detalle de cada verificación; acá se listan como condición de cierre.

| # | Condición | Bloqueante |
|---|---|---|
| DoD-01 | La construcción termina en cero y sin advertencias de compilación | Sí |
| DoD-02 | La batería de pruebas pasa completa | Sí |
| DoD-03 | La cobertura alcanza el mínimo de cada proyecto: dominio 90 % de líneas y 85 % de ramas; aplicación 80 % y 70 %; interfaz 60 % y 50 %; adaptadores 55 % y 45 % | Sí |
| DoD-04 | Las reglas de negocio que la etapa introdujo tienen prueba automatizada | Sí |
| DoD-05 | Ninguna dependencia con vulnerabilidad conocida de severidad alta o crítica | Sí |
| DoD-06 | Ningún secreto en el árbol de fuentes | Sí |
| DoD-07 | Los guiones de demostración de todas las etapas anteriores siguen pasando, sin corrección | Sí |
| DoD-08 | El informe de cierre está publicado, con sus trece secciones, y anotado en el índice | Sí |
| DoD-09 | El registro de cambios está actualizado en la rama de la etapa | Sí |
| DoD-10 | El guion de demostración de la etapa se ejecutó en el punto de control con OK explícito del agente humano | Sí |
| DoD-11 | Ningún tipo del cliente del motor de contenedores aparece fuera de su carpeta de adaptador, y las pruebas de dominio no requieren motor ni base de datos | Sí |
| DoD-12 | El inventario de componentes de la construcción se genera y se adjunta al artefacto | No |

Los umbrales de DoD-03 provienen de S-02, propuesto por el intake y confirmado sin cambios por el agente humano del proyecto el 2026-07-27, según la tabla de estado de supuestos del SOLUTION-INTAKE v1.1. Son control bloqueante del pipeline, no una meta indicativa.

## 6. Definition of Ready

Una etapa está lista para iniciarse cuando su plantilla obligatoria está completa. La categoría 06-Backlog es la propietaria del refinamiento previo; acá se lista la condición de entrada.

| # | Condición | Bloqueante |
|---|---|---|
| DoR-01 | La etapa declara su tipo: hito interno o hito demostrable | Sí |
| DoR-02 | Declara objetivo, alcance y fuera de alcance | Sí |
| DoR-03 | Declara su entregable tangible | Sí |
| DoR-04 | Declara su guion de demostración, con el estado de partida y cómo se llega a él | Sí |
| DoR-05 | Declara criterios de aceptación verificables. Una etapa sin ellos no se puede iniciar | Sí |
| DoR-06 | Declara su punto de control y qué debe explicar su informe de cierre en particular | Sí |
| DoR-07 | Referencia la sección del análisis que especifica lo que implementa | Sí |
| DoR-08 | El corte es vertical: atraviesa interfaz, aplicación, dominio, datos y motor de contenedores. Está prohibido planificar por capa técnica | Sí |
| DoR-09 | De la etapa `c` en adelante, produce algo que el cliente pueda recorrer en el navegador. Si no, está mal cortada y se redivide | Sí |
| DoR-10 | La puerta técnica que condiciona la etapa, si existe, está medida y aprobada | Sí |
| DoR-11 | Ningún supuesto abierto del que dependa el comportamiento a especificar sigue sin respuesta del cliente | Sí |
| DoR-12 | El guion arranca con los guiones de ejecución, dentro del entorno de desarrollo, sin pasos manuales de preparación fuera de ellos | Sí |

## 7. Herramientas

| Herramienta | Uso | Regla operativa |
|---|---|---|
| Repositorio remoto en GitHub | Alojamiento del código, ramas de etapa y pull requests | El remoto `origin` es `https://github.com/UTN-FRP-TUP-Aplicada-2025/SelfHosted.Service.Core.git`. S-05 dejó de ser supuesto el 2026-07-27: se resolvió con evidencia verificable, y el dato se comprueba con `git remote get-url origin` en la raíz del repositorio destino. Es el remoto contra el que corre el flujo de una rama y un pull request por etapa |
| Repositorio de documentación | Informes de cierre de etapa y su índice | Es un repositorio distinto del de código. Los informes no viven bajo la carpeta de especificación ni los produce un subagente de categoría |
| GitHub Actions con ejecutor autoalojado en el propio servidor | Pipeline de integración y despliegue | El ejecutor requiere el socket del motor de contenedores disponible, porque las pruebas de integración lo usan |
| Entorno de desarrollo contenedorizado declarativo | Ciclo completo de desarrollo | La orquestación es declarativa: ningún guion levanta el entorno a mano. El host no tiene ni tendrá herramientas de construcción instaladas |
| Guiones del repositorio | Construcción, ejecución, migración de esquema, pruebas y reinicio de la base local | Todo guion de demostración arranca con ellos, dentro del entorno de desarrollo. No se admiten pasos manuales de preparación fuera de ellos |
| Configuración de depuración del editor | Depuración interactiva | Es un camino separado del de los guiones y no los reemplaza |
| Navegador de escritorio del host | Observación del resultado de todo guion de demostración | El resultado se observa siempre desde el navegador del host, no desde dentro del entorno de desarrollo |
| Registro de cambios de la solución | Historial de cambios por etapa | Se actualiza en la rama de la etapa |
| Herramienta de migración de esquema | Generación y aplicación de migraciones | Se declara como herramienta local del repositorio, no global, para que su versión quede versionada junto al código |

---

## Control de cambios

| Versión | Fecha | Cambios | Autor |
|---|---|---|---|
| 1.0 | 2026-07-27 | Versión inicial, derivada del SOLUTION-INTAKE-SelfHosted-Service-Core-v1.1. Veintisiete acuerdos operativos verificables, seis ceremonias disparadas por evento, doce condiciones de terminado y doce de listo, y nueve herramientas con su regla de uso. Queda declarada la ausencia de un tiempo de respuesta de reloj en las fuentes | Product Manager Senior (AG-00) con Analista de Negocio Senior (AG-01) |
| 1.0 | 2026-07-27 | Corrección dentro del ciclo de emisión, sin cambio de versión, por el audit `A-00-Contexto-v1.0.md`. P1-01: se regeneraron las cinco anclas de la tabla de contenido que no resolvían, conservando tildes y eñes. El hallazgo P1-02, sobre el tratamiento del horario core en §4, y el tratamiento del estado de los supuestos S-02 y S-04 quedan sin tocar, a la espera de la decisión del humano | Product Manager Senior (AG-00) con Analista de Negocio Senior (AG-01) |
| 1.0 | 2026-07-27 | Cierre de los hallazgos P1-02 y P0-01 del audit `A-00-Contexto-v1.0.md`, sin cambio de versión. P1-02: §4.6 pasa a titularse "Comunicación, horario y tiempos de respuesta" e incorpora AT-28, que declara la inexistencia de horario core y de franja de disponibilidad comprometida, y reformula AT-26 como regla de bloqueo que no vence; ambas resuelven la decisión del agente humano del proyecto del 2026-07-27 y cierran también la ambigüedad A-03 registrada en la entrega inicial; en ese momento la decisión no estaba registrada en ningún artefacto de la cadena, defecto que el audit reportó como N-01 y que cierra la fila siguiente. P0-01: §4.3 y §5 citan la tabla de estado de supuestos del SOLUTION-INTAKE v1.1 con la fecha de confirmación de S-04 y S-02, y §7 incorpora la URL del remoto `origin` con su método de verificación, con lo que desaparece la contradicción interna que el audit señaló sobre S-05. Se actualizó la referencia al intake de la versión 1.0 a la 1.1 en la cabecera y en el control de cambios | Product Manager Senior (AG-00) con Analista de Negocio Senior (AG-01) |
| 1.0 | 2026-07-27 | Cierre de los hallazgos N-01 y N-09 del re-audit `A-00-Contexto-v2.0.md`, sin cambio de versión. N-01: AT-26, AT-28 y el párrafo de cierre de §4.6 citan ahora su respaldo, la restricción «Disponibilidad y tiempos de respuesta» incorporada a §10 del SOLUTION-INTAKE v1.1, que registra la decisión del agente humano del proyecto con su origen y su fecha; el contenido operativo de las dos reglas no cambió, porque el audit lo verificó correcto. N-09: la nota de cierre de §4.3 deja de atribuir a S-04 los umbrales que §4.3 no contiene y la regla de migraciones de AT-13, y acota la atribución al esquema de versión de AT-11 y a la convención de mensajes de AT-10 y AT-12, con AT-13 remitido a su origen propio en §17.3 P.7 del intake | Product Manager Senior (AG-00) con Analista de Negocio Senior (AG-01) |
