# Roadmap de Producto

**Proyecto:** SelfHosted Service (`Nombre-Solucion`: `SelfHosted-Service`)
**Documento:** Roadmap-Producto.md
**Versión:** 1.0
**Estado:** Propuesto
**Fecha:** 2026-07-29
**Autor:** Product Manager Senior (AG-00)
**Trazabilidad upstream:** SOLUTION-INTAKE-SelfHosted-Service §4, §10, §15, §19, §22.2, §22.4, §22.6
**Trazabilidad downstream:** 06-Backlog-Tecnico, 07-Plan-Sprint, 08-Calidad-Y-Pruebas, 09-Devops

---

## Tabla de contenido

- [§1. Propósito](#1-propósito)
- [§2. Fases del producto](#2-fases-del-producto)
  - [§2.1 Unidad de gestión y criterio de expresión](#21-unidad-de-gestión-y-criterio-de-expresión)
  - [§2.2 Tabla maestra de fases](#22-tabla-maestra-de-fases)
  - [§2.3 Épicas con su capacidad y su fase](#23-épicas-con-su-capacidad-y-su-fase)
  - [§2.4 Puertas técnicas que condicionan fases](#24-puertas-técnicas-que-condicionan-fases)
  - [§2.5 Épicas sin fase asignada](#25-épicas-sin-fase-asignada)
  - [§2.6 Brechas del roadmap declaradas](#26-brechas-del-roadmap-declaradas)
- [§3. Matriz fase, épica, etapa y entrega](#3-matriz-fase-épica-etapa-y-entrega)
- [§4. Dependencias entre fases](#4-dependencias-entre-fases)
- [§5. Criterios de transición entre fases](#5-criterios-de-transición-entre-fases)
  - [§5.1 Inicio a Fase 0](#51-inicio-a-fase-0)
  - [§5.2 Fase 0 a Fase 1](#52-fase-0-a-fase-1)
  - [§5.3 Fase 1 a Fase 2](#53-fase-1-a-fase-2)
  - [§5.4 Fase 2 a Fase 3](#54-fase-2-a-fase-3)
  - [§5.5 Fase 3 a Fase 4](#55-fase-3-a-fase-4)
  - [§5.6 Fase 4 a cierre de la versión](#56-fase-4-a-cierre-de-la-versión)
  - [§5.7 Regla común a toda transición](#57-regla-común-a-toda-transición)
- [§6. Trazabilidad downstream](#6-trazabilidad-downstream)
- [Control de cambios](#control-de-cambios)

---

## §1. Propósito

Este documento ordena en el tiempo las capacidades que el [Alcance del Proyecto](Alcance-Proyecto.md) declara incluidas, y fija con qué criterios verificables se cierra cada fase y se habilita la siguiente. Es el insumo con el que la categoría 06-Backlog-Tecnico arma las épicas y la categoría 07-Plan-Sprint arma la secuencia de etapas.

Lo que este documento no hace: no decide qué capacidades entran, que es materia del Alcance del Proyecto; y no compromete fechas, por la razón que fija §2.1.

---

## §2. Fases del producto

### §2.1 Unidad de gestión y criterio de expresión

Tres propiedades condicionan la forma de este roadmap y conviene declararlas antes de leerlo:

- La unidad de gestión es la etapa, no el sprint. No hay sprints de duración fija, ni estimación por puntos, ni ceremonias de cadencia fija. El modelo de gestión adoptado no es Scrum, y el [Acuerdo de Equipo](Acuerdo-Equipo.md) lo declara con su fundamento. Donde la nomenclatura del framework dice «sprint», acá se lee «etapa».
- No hay fechas de calendario. El cliente declaró que no hay fecha objetivo (restricción RE-02) y que el bloqueo del punto de control no vence (restricción RE-12). Un hito se cierra cuando cumple sus criterios, no cuando llega una fecha.
- Las etapas se ejecutan en serie. No se abre la rama de una etapa antes de fusionar la anterior (restricción RE-04). El roadmap no admite paralelización de etapas.

De la etapa `c` en adelante, toda etapa es un hito demostrable sin excepción: si una etapa planificada no produce algo que el cliente pueda recorrer en el navegador, está mal cortada y debe redividirse.

### §2.2 Tabla maestra de fases

Cinco fases, con correspondencia uno a uno entre alcance incremental y fase, salvo la fase de cimientos, que no corresponde a ningún alcance declarado y existe para verificar la puerta técnica PT-02 antes de que ninguna capacidad dependa del motor de contenedores.

| Fase | Objetivo | Épicas asociadas | Etapas estimadas | Entregable | Entrega objetivo |
| --- | --- | --- | --- | --- | --- |
| Fase 0 — Cimientos | Solución compilando, ejecutándose y navegable, con PT-02 verificada antes de que ninguna capacidad dependa del motor de contenedores | EPC-01, EPC-02 | 2 etapas declaradas: `a` esqueleto ejecutable, `b` panel navegable | Aplicación que arranca desde los guiones y presenta todas las rutas del mapa de navegación, validadas contra la maqueta | Etiqueta de la etapa `b`, en la serie de versión 0.x |
| Fase 1 — Alcance 1: núcleo operable | Entregar el mínimo sin el cual la solución no resuelve el problema | EP-01 a EP-11 | 11 etapas declaradas: `c` y `01` a `10` | Las once capacidades Must Have F-01 a F-11 operativas sobre el servidor de referencia | Etiqueta de la etapa `10`, en la serie de versión 0.x |
| Fase 2 — Alcance 2: observabilidad | Estado del servidor, del proyecto SelfHosted y del contenedor en un único tablero | EP-12 | 1 etapa estimada | Tablero en tres capas, con la presión de memoria atribuible a un servicio concreto | Etiqueta de la etapa que cierre la fase, en la serie de versión 0.x |
| Fase 3 — Alcance 3: portabilidad y reutilización | Arquitectura reproducible fuera del servidor y alta de servicio reutilizable | EP-13, EP-14, EP-17 | 3 etapas estimadas | Exportación e importación de la arquitectura, catálogo de plantillas y exportación programada a un destino externo | Etiqueta de la etapa que cierre la fase, en la serie de versión 0.x |
| Fase 4 — Alcance 4: automatización | Un automatismo dispara un despliegue sin conocer la contraseña del administrador | EP-15, EP-16 | 2 etapas estimadas, o 1 si EP-15 se adelanta a la Fase 1 | Emisión de credenciales de máquina con ámbitos y disparo de despliegue desde un automatismo | Cierre de la primera entrega completa, que es lo que habilita salir de la serie de versión 0.x |

Las trece etapas de las fases 0 y 1 están declaradas por el cliente y no son estimación. Las de las fases 2 a 4 son estimación de piso, una por épica, derivada de la regla de corte que el cliente sí declara. Los cortes pueden reordenarse o subdividirse, pero no fusionarse hasta perder la demostrabilidad intermedia.

### §2.3 Épicas con su capacidad y su fase

Las dos épicas de cimientos usan serie propia (`EPC-XX`) para no ocupar números de la serie de capacidades. Los identificadores provienen de la Fase A previa y se conservan [FA].

| Épica | Fase | Capacidad | Qué entrega |
| --- | --- | --- | --- |
| EPC-01 | 0 | — | Esqueleto ejecutable, con página de salud respondiendo en el navegador del equipo del desarrollador. Verifica PT-02 |
| EPC-02 | 0 | — | Panel navegable: todas las rutas del mapa de navegación, validadas contra la maqueta |
| EP-01 | 1 | F-01 | Administrador único y sesión |
| EP-02 | 1 | F-02 | Proyectos SelfHosted con su modo de red y su persistencia |
| EP-03 | 1 | F-03 | Servicios del proyecto SelfHosted: alta y configuración completa |
| EP-04 | 1 | F-04 | Lienzo: nodos, aristas, desplazamiento, zoom, agrupación y disposición persistente |
| EP-05 | 1 | F-05 | Despliegue desde imagen de registro público, con estado real y registros del contenedor |
| EP-06 | 1 | F-06 | Arranque y parada, con autoarranque y orden declarado por el grafo |
| EP-07 | 1 | F-07 | Cambios pendientes: changeset, informe de impacto y aplicación en lote |
| EP-08 | 1 | F-08 | Direcciones y conflictos, con resoluciones ofrecidas |
| EP-09 | 1 | F-09 | Escalado manual horizontal y vertical |
| EP-10 | 1 | F-10 | Despliegue construyendo la imagen, con seguimiento del progreso |
| EP-11 | 1 | F-11 | Descubrimiento y adopción, con las salvaguardas de aislamiento |
| EP-12 | 2 | F-12 | Tablero en tres capas |
| EP-13 | 3 | F-13 | Exportación e importación de la arquitectura, con el manifiesto propio |
| EP-14 | 3 | F-14 | Catálogo de plantillas reutilizables, como cuarta vía de alta |
| EP-15 | 4 | F-15 | Tokens de API con ámbitos, vigencia y revocación inmediata. Admite adelanto a la Fase 1 |
| EP-16 | 4 | F-16 | Disparo de despliegue desde un automatismo con token de ámbito mínimo |
| EP-17 | 3 | F-17 | Exportación programada a un destino externo |

### §2.4 Puertas técnicas que condicionan fases

Los umbrales de las dos puertas son evidencia declarada por las fuentes y nunca fueron supuesto.

| Puerta | Qué verifica | Qué condiciona | Cuándo se mide |
| --- | --- | --- | --- |
| PT-01 | Fluidez del lienzo con 30 nodos y 40 aristas, con insignia de estado y métricas por nodo, actualización de estado cada 2 s, sin retraso perceptible en el arrastre, y consumo estable tras 15 minutos de uso continuo | La etapa `03` y con ella EP-04. Su falla obliga a cambiar la herramienta del lienzo y a replanificar ese corte | Antes de comprometer el corte del lienzo |
| PT-02 | Verificación del motor de contenedores desde el entorno de desarrollo: listar, crear, arrancar, detener y eliminar un contenedor de prueba, construir una imagen desde definición local y alcanzarla por red | Todo corte de despliegue, empezando por la etapa `04` | En la etapa `a`, dentro de la Fase 0 |

Una puerta que no pasa detiene la planificación de lo que depende de ella. PT-01 tiene además tres riesgos abiertos asociados, declarados como RP-01 a RP-03 en [Visión de Producto](Vision-Producto.md) §8.2 y en [Compatibilidad de Plataformas](Compatibilidad-Plataformas.md) §3.2.

### §2.5 Épicas sin fase asignada

Tres épicas tienen capacidad e identificador emitidos y no tienen fase ni corte vertical asignado. No se les asigna acá y el motivo es que los diez cortes verticales del Alcance 1 están declarados de forma cerrada por el cliente [E] y ninguna de las tres figura entre ellos.

| Épica | Capacidad | Prioridad | Qué entrega |
| --- | --- | --- | --- |
| EP-23 | F-23 | Should Have | Variables compartidas del proyecto SelfHosted |
| EP-24 | F-24 | Should Have | Referencias entre variables |
| EP-25 | F-25 | Could Have | Higiene del modelo |

Quien las asigne tiene que resolver tres consecuencias, declaradas por el intake:

- Ninguna de las tres puede ubicarse antes de EP-03, porque las tres operan sobre variables de servicio.
- El corte del lienzo necesita la forma mínima del mecanismo de referencia. La tensión se aflojó al admitir la arista que existe sin variable, pero no quedó disuelta.
- EP-25 va después de EP-23 y EP-24, porque las condiciones que advierte son en su mayoría sobre variables compartidas y sobre referencias.

### §2.6 Brechas del roadmap declaradas

| Brecha | Estado | Categoría destinataria |
| --- | --- | --- |
| Asignación de EP-23, EP-24 y EP-25 a una fase y a un corte vertical concreto | Abierta. Este documento no la resuelve | 07-Plan-Sprint, con decisión del agente humano del proyecto en un punto de control |
| Reparto de EP-12, EP-14 y EP-17 entre las fases 2 y 3 | Derivación de la Fase A previa [FA], pendiente de confirmación. El cliente fija dos anclajes: la métrica de reproducibilidad se ata al cierre del Alcance 3, y la nota del intake ubica tokens y despliegue automatizado en el Alcance 4. El resto es derivación a partir de la prioridad MoSCoW | Agente humano del proyecto, en el próximo punto de control |
| Adelanto de EP-15 a la Fase 1 | Recomendación registrada por el análisis y no decidida. El Alcance 4 es el menos costoso y el que valida antes la decisión de autenticación | Agente humano del proyecto, en el próximo punto de control |

---

## §3. Matriz fase, épica, etapa y entrega

La columna de etapa reemplaza a la de sprint, por lo declarado en §2.1. Las etapas de las fases 0 y 1 son las declaradas por el cliente; las de las fases 2 a 4 se identifican por su épica porque su orden todavía no está declarado.

| Fase | Épica | Etapa | Entrega objetivo |
| --- | --- | --- | --- |
| Fase 0 | EPC-01 | `a` esqueleto ejecutable | Etiqueta de la etapa `a` |
| Fase 0 | EPC-02 | `b` panel navegable | Etiqueta de la etapa `b` |
| Fase 1 | EP-01 | `c` administrador y sesión | Etiqueta de la etapa `c` |
| Fase 1 | EP-02 | `01` proyectos | Etiqueta de la etapa `01` |
| Fase 1 | EP-03 | `02` servicios del proyecto SelfHosted | Etiqueta de la etapa `02` |
| Fase 1 | EP-04 | `03` lienzo | Etiqueta de la etapa `03`, condicionada por PT-01 |
| Fase 1 | EP-05 | `04` despliegue desde imagen pública | Etiqueta de la etapa `04`, condicionada por PT-02 |
| Fase 1 | EP-06 | `05` arranque y parada | Etiqueta de la etapa `05` |
| Fase 1 | EP-07 | `06` cambios pendientes | Etiqueta de la etapa `06` |
| Fase 1 | EP-08 | `07` direcciones y conflictos | Etiqueta de la etapa `07` |
| Fase 1 | EP-09 | `08` escalado manual | Etiqueta de la etapa `08` |
| Fase 1 | EP-10 | `09` despliegue desde definición local y repositorio | Etiqueta de la etapa `09` |
| Fase 1 | EP-11 | `10` descubrimiento y adopción | Etiqueta de la etapa `10`, cierre de la Fase 1 |
| Fase 2 | EP-12 | 1 etapa estimada, sin orden declarado | Etiqueta de la etapa que cierre la Fase 2 |
| Fase 3 | EP-13 | 1 etapa estimada, sin orden declarado | Etiqueta de su etapa |
| Fase 3 | EP-14 | 1 etapa estimada, sin orden declarado | Etiqueta de su etapa |
| Fase 3 | EP-17 | 1 etapa estimada, sin orden declarado | Etiqueta de la etapa que cierre la Fase 3 |
| Fase 4 | EP-15 | 1 etapa estimada, con adelanto admitido a la Fase 1 | Etiqueta de su etapa |
| Fase 4 | EP-16 | 1 etapa estimada, sin orden declarado | Cierre de la primera entrega completa |
| Sin asignar | EP-23, EP-24, EP-25 | Sin etapa asignada. Ver §2.5 y §2.6 | Sin entrega objetivo mientras la brecha siga abierta |

Cada etapa cerrada y fusionada recibe su etiqueta, y desplegar la imagen de esa etiqueta debe reproducir la demostración de esa etapa. La versión se deriva de los mensajes de commit desde la etiqueta anterior y permanece en la serie 0.x hasta la primera entrega completa.

---

## §4. Dependencias entre fases

Dependencias entre fases:

- La Fase 1 depende de la Fase 0 completa.
- Las fases 2, 3 y 4 dependen de la Fase 1 completa.
- Entre las fases 2, 3 y 4 el orden declarado es secuencial, y el único adelanto admitido es el de EP-15 a la Fase 1.

Dependencias funcionales entre épicas, dentro de la Fase 1:

| Épica | Depende de |
| --- | --- |
| EP-01 | — |
| EP-02 | EP-01 |
| EP-03 | EP-02 |
| EP-04 | EP-03, y la puerta técnica PT-01 |
| EP-05 | EP-03, y la puerta técnica PT-02 |
| EP-06 | EP-05, EP-04 |
| EP-07 | EP-05 |
| EP-08 | EP-06 |
| EP-09 | EP-08 |
| EP-10 | EP-05 |
| EP-11 | EP-08 |

El grafo es acíclico y su orden topológico es el de la secuencia de etapas declarada en §3. Las tres épicas sin fase asignada tienen una dependencia conocida y declarada: ninguna puede ubicarse antes de EP-03.

---

## §5. Criterios de transición entre fases

Los criterios son listas de verificación y no plazos. La categoría 08-Calidad-Y-Pruebas los toma como verificaciones ejecutables.

Los veintinueve criterios se transcriben de la tabla de criterios de transición de §22.4 del intake, transición por transición y sin agregados: esta categoría les da forma de lista verificable, y ninguno se origina acá. Fijar la condición que habilita el paso de una fase a la siguiente es una decisión de producto, y su dueño es el Product Owner. Lo mismo vale para la columna de entrega objetivo de §2.2 y §3, que deriva del etiquetado por etapa cerrada y de la serie de versión 0.x que §22.6 declara, y para la cantidad de etapas estimadas de las fases 2 a 4, que §22.4 declara como estimación de piso derivada de la regla de corte del cliente.

| Fase origen | Fase destino | Criterios verificables |
| --- | --- | --- |
| — (inicio) | Fase 0 | [§5.1](#51-inicio-a-fase-0), 2 criterios |
| Fase 0 | Fase 1 | [§5.2](#52-fase-0-a-fase-1), 6 criterios |
| Fase 1 | Fase 2 | [§5.3](#53-fase-1-a-fase-2), 7 criterios |
| Fase 2 | Fase 3 | [§5.4](#54-fase-2-a-fase-3), 4 criterios |
| Fase 3 | Fase 4 | [§5.5](#55-fase-3-a-fase-4), 5 criterios |
| Fase 4 | Cierre de la versión | [§5.6](#56-fase-4-a-cierre-de-la-versión), 5 criterios |

### §5.1 Inicio a Fase 0

- [ ] El intake está aprobado y el manifiesto de la solución está derivado de él y confirmado.
- [ ] Las decisiones de producto pendientes están registradas y asignadas al agente humano del proyecto, y ninguna alcanza a una etapa de esta fase.

### §5.2 Fase 0 a Fase 1

- [ ] La solución compila y arranca desde los guiones, dentro del entorno de desarrollo, sin pasos manuales de preparación.
- [ ] La página de salud responde en el navegador del equipo del desarrollador.
- [ ] La puerta técnica PT-02 está verificada y su materialización corre como prueba automatizada.
- [ ] Todas las rutas del mapa de navegación son navegables y están validadas contra la maqueta.
- [ ] Los informes de cierre de las etapas `a` y `b` están publicados y anotados en el índice.
- [ ] Los puntos de control de las etapas `a` y `b` tienen OK explícito del agente humano del proyecto.

### §5.3 Fase 1 a Fase 2

- [ ] Las once capacidades F-01 a F-11 están entregadas, cada una con su etapa cerrada y su punto de control aprobado.
- [ ] La puerta técnica PT-01 está medida y aprobada, o su plan de contingencia se aplicó y el corte del lienzo quedó replanificado y cerrado.
- [ ] Los guiones de demostración de las once etapas pasan de corrido, sin corrección.
- [ ] El parque de referencia se recorre con el juego de datos de siembra, sin configuración manual previa.
- [ ] Al menos un contenedor del parque real quedó adoptado sin reinstanciarlo y sin cortar su servicio.
- [ ] Las salvaguardas de aislamiento están presentes en las etapas de despliegue y de adopción.
- [ ] Los umbrales de cobertura de la definición de terminado se cumplen.

### §5.4 Fase 2 a Fase 3

- [ ] El tablero muestra las tres capas: servidor, proyecto SelfHosted y contenedor.
- [ ] La presión de memoria del servidor se atribuye a un servicio concreto desde el tablero.
- [ ] La recolección de estadísticas ocurre sólo con vistas abiertas, y ninguna con vistas cerradas.
- [ ] Los guiones de demostración de las etapas anteriores siguen pasando.

### §5.5 Fase 3 a Fase 4

- [ ] Un proyecto SelfHosted se exporta y se reimporta conservando su arquitectura y su disposición.
- [ ] Ninguna exportación contiene un secreto, y el archivo de variables sale vacío.
- [ ] El catálogo permite dar de alta un servicio frecuente con sus parámetros.
- [ ] Existe una exportación programada hacia un destino externo.
- [ ] Los guiones de demostración de las etapas anteriores siguen pasando.

### §5.6 Fase 4 a cierre de la versión

- [ ] Un token de ámbito mínimo dispara un despliegue sin que el automatismo conozca la contraseña del administrador.
- [ ] La revocación del token deja de habilitar el disparo de forma inmediata.
- [ ] Ningún secreto vive en el repositorio ni en la imagen entregada.
- [ ] Los guiones de demostración de todas las etapas pasan de corrido.
- [ ] Las cuatro métricas de éxito tienen lectura definida y responsable asignado.

### §5.7 Regla común a toda transición

Ninguna etapa se considera terminada sin su informe de cierre publicado antes del punto de control, y un informe que declara terminada una etapa incompleta invalida el punto de control.

---

## §6. Trazabilidad downstream

| Categoría que consume | Qué consume de este documento |
| --- | --- |
| 06-Backlog-Tecnico | Las épicas EPC-01, EPC-02, EP-01 a EP-17 y EP-23 a EP-25 de §2.3 y §2.5, con su capacidad asociada, como origen de los ítems de backlog. Las tres épicas sin fase asignada se registran como tales y no se ubican por cuenta propia |
| 07-Plan-Sprint | La secuencia de etapas de §3, las dependencias de §4, las puertas técnicas de §2.4 y la brecha de asignación de §2.6. Es la categoría destinataria de la asignación de EP-23, EP-24 y EP-25 |
| 08-Calidad-Y-Pruebas | Los criterios de transición de §5, que convierte en verificaciones ejecutables, y los umbrales de las dos puertas técnicas de §2.4 |
| 09-Devops | El esquema de entrega por etiqueta de etapa cerrada de §3, y la serie de versión 0.x hasta la primera entrega completa |

Trazabilidad upstream, enumerada acá con el mismo alcance que declara la cabecera de este documento:

| Sección de este documento | Origen en el SOLUTION-INTAKE |
| --- | --- |
| §2.1 Unidad de gestión y criterio de expresión | §10 Restricciones del cliente (RE-02, RE-04, RE-12); §22.2 [FA], de donde vienen los identificadores `RE-XX`; §22.6 [FA], que declara que el modelo de gestión adoptado no es Scrum |
| §2.2 Tabla maestra de fases y §2.3 Épicas | §4 Alcance funcional pretendido, de donde vienen las capacidades `F-XX`; §15 Esquema de descomposición y delivery, que declara los cortes verticales; §22.4 [FA], de donde vienen los identificadores `EPC-XX` y `EP-XX` |
| §2.4 Puertas técnicas | §22.4 [FA], tabla de puertas técnicas, cuyos umbrales son evidencia declarada por las fuentes |
| §2.5 y §2.6 Épicas sin fase asignada y brechas | §4, nota sobre F-23 a F-25; §15, que declara cerrados los diez cortes verticales del Alcance 1; §19, que registra la pendiente de asignación; §22.4 [FA], que registra las dos derivaciones pendientes de confirmación |
| §3 Matriz de fase, épica, etapa y entrega | §15; §22.4 [FA]; §22.6 [FA], de donde salen el etiquetado por etapa cerrada y la serie de versión 0.x hasta la primera entrega completa |
| §4 Dependencias entre fases | §22.4 [FA], dependencias funcionales entre épicas |
| §5 Criterios de transición | §22.4 [FA], criterios de transición entre fases |

Este documento deriva además del [Alcance del Proyecto](Alcance-Proyecto.md) §4.1, que es quien declara qué capacidades entran.

---

## Control de cambios

| Versión | Fecha | Cambios | Autor |
| --- | --- | --- | --- |
| 1.0 | 2026-07-29 | Versión inicial, generada bajo el conjunto normativo 4.0 del Framework SDD a partir de `SOLUTION-INTAKE-SelfHosted-Service` versión 2.2. Conserva los identificadores `EPC-XX` y `EP-XX` emitidos por la Fase A previa, incluidas las tres épicas sin fase asignada. Declara tres brechas en §2.6 y no resuelve ninguna: la asignación de EP-23 a EP-25, el reparto de EP-12, EP-14 y EP-17 entre las fases 2 y 3, y el adelanto de EP-15 a la Fase 1 | Product Manager Senior (AG-00) |
| 1.0 | 2026-07-29 | Corrección de la cabecera y de §6 absorbida dentro de la versión de emisión, sin subir versión, por la política de versionado de `Master-Prompt.md` §5: el documento estaba en estado `Propuesto` y la corrección proviene del audit de su propia fase. El campo `Trazabilidad upstream` pasa a enumerar §4, §10, §15, §19, §22.2, §22.4 y §22.6, y §6 sustituye su enunciado en prosa —que omitía §19, presente en la cabecera— por una tabla de trazabilidad upstream sección por sección, con el mismo alcance que la cabecera. Se agregan §22.2 y §22.6, que el cuerpo consumía para los identificadores `RE-XX` y para el etiquetado por etapa cerrada sin declararlos en ningún lado. Origen: hallazgo H-02, P2, del informe [`Audit/A-00-01-r1.md`](../Audit/A-00-01-r1.md) | Product Manager Senior (AG-00) |
| 1.0 | 2026-07-29 | Adecuación a `Rules-Contexto` 2.1, absorbida dentro de la versión de emisión, sin subir versión y sin archivar, por la política de versionado de `Master-Prompt.md` §5. Se corrió el catálogo de ambigüedades de §6.1 sobre el documento, con foco en D1 a D3, sin ítems nuevos que escalar: D1 no aplica porque el cliente declaró que no hay fecha objetivo (RE-02), D2 está cubierto por las seis transiciones con criterios, y el caso D3 —las tres épicas sin fase— ya estaba escalado como brecha en §2.6. §5: se declara que los veintinueve criterios de transición se transcriben de §22.4 del intake sin agregados y que ninguno se origina acá, y lo mismo para la columna de entrega objetivo de §2.2 y §3, derivada de §22.6, y para la cantidad de etapas estimadas de las fases 2 a 4, que §22.4 declara como estimación de piso | Product Manager Senior (AG-00) |
