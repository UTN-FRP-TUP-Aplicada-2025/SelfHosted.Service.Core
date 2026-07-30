# Roadmap de Producto

**Proyecto:** SelfHosted.Service.Core (solución; proyecto principal SelfHosted-Web)
**Documento:** Roadmap-Producto-v1.0.md
**Versión:** 1.0
**Estado:** Propuesto
**Fecha:** 2026-07-27
**Autor:** Product Manager Senior (AG-00) en conjunción con Analista de Negocio Senior (AG-01)
**Trazabilidad upstream:** SOLUTION-INTAKE v1.1 §4, §8, §10, §11, §15, §15.1, §18
**Trazabilidad downstream:** 06-Backlog, 07-Plan-Sprint, 08-Calidad-Y-Pruebas, 10-Examples

## Tabla de contenido

- [1. Propósito](#1-propósito)
  - [1.1 Cómo se mide el avance](#11-cómo-se-mide-el-avance)
  - [1.2 Vocabulario de planificación](#12-vocabulario-de-planificación)
- [2. Fases del producto](#2-fases-del-producto)
  - [2.1 Tabla de fases](#21-tabla-de-fases)
  - [2.2 Épicas por fase](#22-épicas-por-fase)
  - [2.3 Nota sobre la composición de los alcances 2 a 4](#23-nota-sobre-la-composición-de-los-alcances-2-a-4)
- [3. Matriz fase, épica, etapa y release](#3-matriz-fase-épica-etapa-y-release)
- [4. Dependencias entre fases](#4-dependencias-entre-fases)
  - [4.1 Puertas técnicas](#41-puertas-técnicas)
  - [4.2 Dependencias funcionales](#42-dependencias-funcionales)
- [5. Criterios de transición entre fases](#5-criterios-de-transición-entre-fases)
- [6. Trazabilidad downstream](#6-trazabilidad-downstream)
- [Control de cambios](#control-de-cambios)

---

## 1. Propósito

Este documento ordena la construcción del producto en fases, mapea cada fase a las capacidades que entrega y fija los criterios verificables que permiten declarar cerrada una fase y habilitada la siguiente. Es el insumo directo del backlog de la categoría 06 y del plan de etapas de la categoría 07.

### 1.1 Cómo se mide el avance

El cliente declaró explícitamente que no hay fecha objetivo. El avance se mide por etapas cerradas: cada etapa termina en un punto de control con OK explícito del agente humano, y ese OK es la única señal de progreso admitida. Por eso este roadmap no contiene ninguna fecha de calendario, ni de inicio ni de entrega, y sus criterios de transición son listas de verificación, no plazos.

Tres reglas de entrega condicionan todo el ordenamiento:

- Las etapas se ejecutan en serie. No se abre la rama de una etapa antes de que se haya fusionado la anterior.
- La no-regresión es acumulativa. Al cerrar cada etapa deben seguir pasando, sin correcciones, los guiones de demostración de todas las etapas anteriores.
- El corte es siempre vertical. Cada etapa atraviesa interfaz, aplicación, dominio, datos y motor de contenedores. Está prohibido planificar por capa técnica.

### 1.2 Vocabulario de planificación

| Término | Significado en este documento |
|---|---|
| Alcance | Cada uno de los cuatro incrementos funcionales declarados por el cliente. Se corresponde uno a uno con una fase de este roadmap, salvo la fase de cimientos |
| Fase | Agrupación de etapas de este roadmap. Se cierra con criterios verificables |
| Etapa | Unidad de entrega: una rama, un pull request, un guion de demostración y un informe de cierre. Identificadas por orden: `a`, `b`, `c`, `01`, `02` y siguientes |
| Épica | Agrupación de capacidades que la categoría 06 desarrolla en historias. Las épicas de capacidad se identifican EP-XX, con dos dígitos y correspondencia uno a uno con la capacidad F-XX del alcance. Las dos épicas de cimientos no agrupan ninguna capacidad y usan una serie propia, EPC-XX, para no ocupar números de la serie de capacidades |
| Hito interno | Etapa que confirma decisiones estructurales caras de revertir. La valida el agente humano y no se muestra al cliente |
| Hito demostrable | Etapa que entrega un flujo de usuario completo y operativo, y se recorre delante del cliente |

## 2. Fases del producto

### 2.1 Tabla de fases

| Fase | Objetivo | Épicas | Etapas | Entregable | Release target |
|---|---|---|---|---|---|
| Fase 0 — Cimientos | Dejar la solución compilando, ejecutándose y navegable, y verificar la puerta técnica del motor de contenedores antes de que ninguna capacidad dependa de ella | EPC-01, EPC-02 | 2 etapas: `a` esqueleto ejecutable y `b` panel navegable | Aplicación que arranca desde los guiones dentro del entorno contenedorizado, con página de salud visible desde el navegador del host, y panel con todas las rutas del mapa de navegación | Etiqueta de cada etapa cerrada; versión de la solución en la serie 0.x |
| Fase 1 — Alcance 1: núcleo operable | Entregar el mínimo sin el cual la solución no resuelve el problema: proyectos, servicios, lienzo, despliegue, ciclo de vida, cambios en lote, direcciones, escalado y adopción | EP-01 a EP-11 | 11 etapas: `c` y `01` a `10` | Producto operable de punta a punta sobre el servidor de referencia, con el parque existente incorporable sin reinstanciar | Etiqueta de cada etapa cerrada; versión de la solución en la serie 0.x |
| Fase 2 — Alcance 2: observabilidad | Hacer legible el estado del servidor, de cada proyecto y de cada contenedor en un único tablero | EP-12 | 1 etapa estimada, una por épica. Identificador de orden asignado en 07-Plan-Sprint | Tablero en tres capas | Etiqueta de cada etapa cerrada; versión de la solución en la serie 0.x |
| Fase 3 — Alcance 3: portabilidad y reutilización | Hacer reproducible la arquitectura fuera del servidor y reutilizable el alta de servicios frecuentes | EP-13, EP-14, EP-17 | 3 etapas estimadas, una por épica. Identificadores de orden asignados en 07-Plan-Sprint | Exportación e importación de proyectos, catálogo de servicios reutilizables y exportación programada como estrategia de respaldo | Etiqueta de cada etapa cerrada; versión de la solución en la serie 0.x |
| Fase 4 — Alcance 4: automatización | Permitir que un automatismo dispare un despliegue sin conocer la contraseña del administrador | EP-15, EP-16 | 2 etapas estimadas, una por épica; 1 si EP-15 se adelanta a la Fase 1. Identificadores de orden asignados en 07-Plan-Sprint | Emisión y revocación de tokens de ámbito acotado, y disparo de despliegue desatendido | Etiqueta de cada etapa cerrada; el paso de la serie 0.x a la primera versión mayor se decide en el punto de control de cierre de esta fase |

Las etapas de la Fase 0 son hitos internos. La etapa `c` y todas las posteriores son hitos demostrables, sin excepción: si una etapa planificada no produce algo que el cliente pueda recorrer en el navegador, está mal cortada y debe redividirse.

Base de la estimación de etapas, y su condición de cierre. Las etapas de las fases 0 y 1 están declaradas por el cliente y no son estimación: son trece etapas nombradas. Las de las fases 2 a 4 son una estimación de piso, derivada de la regla de corte que el cliente sí declara: cada capacidad es un corte vertical demostrable independiente, y los cortes pueden subdividirse pero no fusionarse hasta perder la demostrabilidad intermedia. De ahí que el piso sea una etapa por épica, y que el número real sólo pueda ser igual o mayor. La estimación es revisable y se cierra cuando se confirme la composición de los alcances 2 a 4 que §2.3 declara pendiente: hasta entonces, ni la cantidad de épicas por fase ni la de etapas por épica están fijadas. La categoría 07-Plan-Sprint es la que asigna el identificador de orden de cada etapa.

### 2.2 Épicas por fase

| Épica | Fase | Capacidades que agrupa | Descripción |
|---|---|---|---|
| EPC-01 | Fase 0 | — | Esqueleto ejecutable: la solución compila, arranca desde los guiones y responde una página de salud en el navegador del host. Verifica la puerta técnica PT-02 |
| EPC-02 | Fase 0 | — | Panel navegable: todas las rutas del mapa de navegación, validadas contra la maqueta de interfaz, con pantallas marcadoras de posición donde todavía no hay capacidad |
| EP-01 | Fase 1 | F-01 | Administrador único y sesión: alta en el primer arranque, validación de contraseña, cambio de contraseña y cierre de sesión |
| EP-02 | Fase 1 | F-02 | Proyectos: alta, listado, renombrado y eliminación, con su modo de red y su persistencia |
| EP-03 | Fase 1 | F-03 | Servicios del proyecto: alta y configuración completa del servicio |
| EP-04 | Fase 1 | F-04 | Lienzo: nodos, aristas, desplazamiento, zoom, agrupación y disposición persistente |
| EP-05 | Fase 1 | F-05 | Despliegue desde imagen de registro público, con estado real en el nodo y acceso a los registros del contenedor |
| EP-06 | Fase 1 | F-06 | Arranque y parada del proyecto y de cada servicio, con autoarranque y orden topológico |
| EP-07 | Fase 1 | F-07 | Cambios pendientes: changeset, informe de impacto y aplicación en lote |
| EP-08 | Fase 1 | F-08 | Direcciones y conflictos: rango gestionado, reservas y bloqueo del arranque con resoluciones ofrecidas |
| EP-09 | Fase 1 | F-09 | Escalado manual horizontal y vertical |
| EP-10 | Fase 1 | F-10 | Despliegue construyendo la imagen desde definición local o repositorio remoto, con seguimiento del progreso |
| EP-11 | Fase 1 | F-11 | Descubrimiento y adopción de contenedores existentes, con las salvaguardas de aislamiento |
| EP-12 | Fase 2 | F-12 | Tablero en tres capas: servidor, proyecto y contenedor |
| EP-13 | Fase 3 | F-13 | Exportación e importación de la arquitectura del proyecto, con el manifiesto propio que preserva la disposición |
| EP-14 | Fase 3 | F-14 | Catálogo de servicios reutilizables, editable, exportable e importable |
| EP-15 | Fase 4 | F-15 | Tokens de API con ámbitos, vigencia y revocación inmediata |
| EP-16 | Fase 4 | F-16 | Disparo de despliegue desde un automatismo con token de ámbito mínimo |
| EP-17 | Fase 3 | F-17 | Exportación programada a un destino externo como estrategia de respaldo |

### 2.3 Nota sobre la composición de los alcances 2 a 4

El SOLUTION-INTAKE declara cuatro alcances incrementales y enumera de forma cerrada el contenido del Alcance 1, que es el conjunto de capacidades Must Have y sus diez cortes verticales. Para los alcances 2 a 4 el intake fija dos anclajes explícitos y no un inventario completo: la métrica de reproducibilidad de §8 se ata al cierre del Alcance 3, que es por lo tanto el de la exportación; y la nota de §4 sobre tokens y despliegue automatizado ubica esas dos capacidades en el Alcance 4.

El reparto de EP-12, EP-14 y EP-17 entre las fases 2 y 3 es una derivación de este roadmap a partir de la prioridad MoSCoW y de esos dos anclajes, no una declaración del cliente. Queda registrado para confirmación explícita antes de que la categoría 06 lo consuma como cerrado. La composición de la Fase 1 y la ubicación de EP-13, EP-15 y EP-16 sí están respaldadas por el intake.

La capacidad EP-15 admite un adelanto declarado: el análisis recomienda emitir tokens de API ya en el Alcance 1, aunque el disparo automatizado de despliegue llegue después. Si ese adelanto se acepta, EP-15 se planifica como etapa de la Fase 1 y la Fase 4 conserva únicamente EP-16.

## 3. Matriz fase, épica, etapa y release

La columna de etapa usa el identificador de orden que consume la categoría 07 y que nombra al informe de cierre correspondiente. Los cortes verticales del Alcance 1 están declarados por el cliente y pueden reordenarse o subdividirse, pero no fusionarse hasta perder la demostrabilidad intermedia; el orden que aquí se propone respeta las dependencias funcionales de §4.2.

Desviación declarada respecto de la tabla tipo. Las reglas de la categoría nombran esta matriz por fase, épica, sprint y release, y su columna de cantidad como "sprints estimados". Este documento sustituye sprint por etapa en el título de la sección, en el encabezado de la columna y en el cuerpo, porque el modelo de gestión que el cliente declaró no tiene sprints de duración fija: la unidad de entrega es la etapa, con su rama, su pull request, su guion de demostración y su informe de cierre. La equivalencia es uno a uno, sprint igual a etapa, y así debe leerla la categoría 07-Plan-Sprint. Ver `Acuerdo-Equipo-v1.0.md` §2.1.

| Fase | Épica | Etapa | Tipo | Capacidad | Release |
|---|---|---|---|---|---|
| Fase 0 | EPC-01 | `a` esqueleto ejecutable | Hito interno | — | Etiqueta `a`, serie 0.x |
| Fase 0 | EPC-02 | `b` panel navegable | Hito interno | — | Etiqueta `b`, serie 0.x |
| Fase 1 | EP-01 | `c` administrador y sesión | Hito demostrable | F-01 | Etiqueta `c`, serie 0.x |
| Fase 1 | EP-02 | `01` proyectos | Hito demostrable | F-02 | Etiqueta `01`, serie 0.x |
| Fase 1 | EP-03 | `02` servicios del proyecto | Hito demostrable | F-03 | Etiqueta `02`, serie 0.x |
| Fase 1 | EP-04 | `03` lienzo | Hito demostrable | F-04 | Etiqueta `03`, serie 0.x |
| Fase 1 | EP-05 | `04` despliegue desde imagen pública | Hito demostrable | F-05 | Etiqueta `04`, serie 0.x |
| Fase 1 | EP-06 | `05` arranque y parada | Hito demostrable | F-06 | Etiqueta `05`, serie 0.x |
| Fase 1 | EP-07 | `06` cambios pendientes | Hito demostrable | F-07 | Etiqueta `06`, serie 0.x |
| Fase 1 | EP-08 | `07` direcciones y conflictos | Hito demostrable | F-08 | Etiqueta `07`, serie 0.x |
| Fase 1 | EP-09 | `08` escalado manual | Hito demostrable | F-09 | Etiqueta `08`, serie 0.x |
| Fase 1 | EP-10 | `09` despliegue desde definición local y repositorio | Hito demostrable | F-10 | Etiqueta `09`, serie 0.x |
| Fase 1 | EP-11 | `10` descubrimiento y adopción | Hito demostrable | F-11 | Etiqueta `10`, serie 0.x |
| Fase 2 | EP-12 | 1 etapa, identificador de orden en 07-Plan-Sprint | Hito demostrable | F-12 | Etiqueta por etapa, serie 0.x |
| Fase 3 | EP-13 | 1 etapa, identificador de orden en 07-Plan-Sprint | Hito demostrable | F-13 | Etiqueta por etapa, serie 0.x |
| Fase 3 | EP-14 | 1 etapa, identificador de orden en 07-Plan-Sprint | Hito demostrable | F-14 | Etiqueta por etapa, serie 0.x |
| Fase 3 | EP-17 | 1 etapa, identificador de orden en 07-Plan-Sprint | Hito demostrable | F-17 | Etiqueta por etapa, serie 0.x |
| Fase 4 | EP-15 | 1 etapa, identificador de orden en 07-Plan-Sprint; admite adelanto a la Fase 1 | Hito demostrable | F-15 | Etiqueta por etapa, serie 0.x |
| Fase 4 | EP-16 | 1 etapa, identificador de orden en 07-Plan-Sprint | Hito demostrable | F-16 | Etiqueta por etapa, serie 0.x |

## 4. Dependencias entre fases

### 4.1 Puertas técnicas

| Puerta | Qué verifica | Qué condiciona | Cuándo se mide |
|---|---|---|---|
| PT-01 | Fluidez del lienzo con 30 nodos y 40 aristas con insignia de estado y métricas por nodo, con actualización de estado cada 2 segundos y sin retraso perceptible en el arrastre, y consumo estable tras 15 minutos de uso continuo | La etapa `03` lienzo, y con ella EP-04. Su falla no invalida el producto, pero obliga a cambiar la herramienta del lienzo y a replanificar ese corte | Antes de comprometer el corte del lienzo |
| PT-02 | Verificación del motor de contenedores desde el entorno de desarrollo: listar, crear, arrancar, detener y eliminar un contenedor de prueba, construir una imagen desde una definición local con contexto en el directorio de datos, y alcanzarlo por red | Todo corte de despliegue, empezando por la etapa `04` | En la etapa `a`, antes de cualquier capacidad que use el motor |

Una puerta que no pasa detiene la planificación de lo que depende de ella. No se compromete una etapa cuya puerta previa esté sin medir.

### 4.2 Dependencias funcionales

| Depende | De | Motivo |
|---|---|---|
| Fase 1 completa | Fase 0 | Ninguna capacidad se puede demostrar sin la solución arrancando desde los guiones y sin las rutas navegables |
| EP-02 proyectos | EP-01 administrador y sesión | No hay operación sin sesión iniciada |
| EP-03 servicios | EP-02 proyectos | El servicio pertenece a exactamente un proyecto |
| EP-04 lienzo | EP-03 servicios | El nodo del lienzo es el servicio; sin servicios no hay nodos que disponer |
| EP-05 despliegue | EP-03 servicios y PT-02 | El despliegue materializa la configuración del servicio contra el motor |
| EP-06 arranque y parada | EP-05 despliegue y EP-04 lienzo | El orden topológico de arranque se deduce de las aristas del lienzo |
| EP-07 cambios pendientes | EP-05 despliegue | El informe de impacto necesita saber qué está desplegado |
| EP-08 direcciones y conflictos | EP-06 arranque y parada | El conflicto se evalúa contra los servicios activos en el momento del arranque |
| EP-09 escalado manual | EP-08 direcciones | Las réplicas con dirección fija exigen una dirección por réplica |
| EP-10 construcción de imagen | EP-05 despliegue | Comparte el ciclo de despliegue y sólo cambia el origen de la imagen |
| EP-11 adopción | EP-08 direcciones | El contenedor adoptado trae su dirección observada y debe reservarla sin conflicto |
| Fase 2 | Fase 1 | El tablero muestra el estado de proyectos y contenedores que la Fase 1 crea |
| Fase 3 | Fase 1 | La exportación traduce la arquitectura completa que la Fase 1 permite declarar |
| Fase 4 | Fase 1 | El disparo automatizado ejecuta el despliegue que la Fase 1 entrega |

## 5. Criterios de transición entre fases

| Fase origen | Fase destino | Criterios verificables |
|---|---|---|
| — | Fase 0 | - [ ] El intake está aprobado y el manifiesto de la solución derivado.<br>- [ ] Los supuestos abiertos CL-04 y CL-15 están registrados y asignados al cliente. |
| Fase 0 | Fase 1 | - [ ] La solución compila y arranca desde los guiones, dentro del entorno contenedorizado, sin pasos manuales de preparación.<br>- [ ] La página de salud responde en el navegador del host.<br>- [ ] La puerta técnica PT-02 está verificada y su materialización corre como prueba automatizada.<br>- [ ] Todas las rutas del mapa de navegación son navegables y están validadas contra la maqueta de interfaz.<br>- [ ] Los informes de cierre de las etapas `a` y `b` están publicados y anotados en su índice.<br>- [ ] Los puntos de control de `a` y `b` tienen OK explícito del agente humano. |
| Fase 1 | Fase 2 | - [ ] Las once capacidades F-01 a F-11 están entregadas, cada una con su etapa cerrada y su punto de control aprobado.<br>- [ ] La puerta técnica PT-01 está medida y aprobada, o bien se aplicó su plan de contingencia y el corte del lienzo se replanificó y cerró.<br>- [ ] Los guiones de demostración de las once etapas pasan de corrido, sin corrección.<br>- [ ] El parque de referencia se recorre en la solución con el juego de datos de siembra, sin configuración manual previa.<br>- [ ] Al menos un contenedor del parque real fue adoptado sin reinstanciarlo y sin cortar su servicio.<br>- [ ] Las salvaguardas de aislamiento están presentes en las etapas de despliegue y de adopción.<br>- [ ] Los umbrales de cobertura por proyecto se cumplen en el control de calidad del pipeline. |
| Fase 2 | Fase 3 | - [ ] El tablero muestra las tres capas: servidor, proyecto y contenedor.<br>- [ ] La presión de memoria del servidor se puede atribuir a un servicio concreto desde el tablero.<br>- [ ] La recolección de estadísticas ocurre sólo con vistas abiertas y ninguna con vistas cerradas.<br>- [ ] Los guiones de las etapas anteriores siguen pasando sin corrección. |
| Fase 3 | Fase 4 | - [ ] Un proyecto se exporta y se vuelve a importar conservando su arquitectura y su disposición del lienzo.<br>- [ ] Ninguna exportación contiene un secreto: el archivo de variables sale vacío.<br>- [ ] El catálogo permite dar de alta un servicio frecuente con sus parámetros, sin copiar configuración a mano.<br>- [ ] Existe una exportación programada configurada hacia un destino externo.<br>- [ ] Los guiones de las etapas anteriores siguen pasando sin corrección. |
| Fase 4 | Cierre de la versión | - [ ] Un token con ámbito mínimo dispara un despliegue sin que el automatismo conozca la contraseña del administrador.<br>- [ ] La revocación de un token deja de habilitar el disparo de forma inmediata.<br>- [ ] Ningún secreto vive en el repositorio ni en la imagen.<br>- [ ] Los guiones de todas las etapas pasan de corrido, sin corrección.<br>- [ ] Las cuatro métricas de éxito de `Vision-Producto-v1.0.md` §6 tienen lectura definida y responsable asignado. |

Regla común a toda transición: ninguna etapa se considera terminada sin su informe de cierre publicado antes del punto de control, y un informe que declara terminada una etapa incompleta invalida el punto de control.

## 6. Trazabilidad downstream

| Categoría | Qué consume de este documento |
|---|---|
| 06-Backlog | Las diecinueve épicas de §2.2, EPC-01 y EPC-02 de cimientos más EP-01 a EP-17 de capacidad, con su capacidad asociada y su fase, como estructura del backlog. La nota de §2.3 marca qué reparto necesita confirmación antes de tratarse como cerrado |
| 07-Plan-Sprint | La secuencia de etapas de §3, las dependencias de §4.2 y los criterios de transición de §5, como orden de planificación y como definición de cierre de cada etapa |
| 08-Calidad-Y-Pruebas | Los criterios de transición de §5, que son verificaciones ejecutables, y la regla de no-regresión acumulativa |
| 10-Examples | Las puertas técnicas PT-01 y PT-02 de §4.1, cuyas materializaciones son ejemplos ejecutables |
| 05-Arquitectura-Tecnica | La condición de que PT-01 pueda obligar a cambiar la herramienta del lienzo, que es una decisión de arquitectura con registro propio |

---

## Control de cambios

| Versión | Fecha | Cambios | Autor |
|---|---|---|---|
| 1.0 | 2026-07-27 | Versión inicial, derivada del SOLUTION-INTAKE-SelfHosted-Service-Core-v1.1. Cinco fases, diecinueve épicas, trece etapas identificadas y seis transiciones con criterios verificables. El reparto de EP-12, EP-14 y EP-17 entre las fases 2 y 3 queda marcado como derivación pendiente de confirmación | Product Manager Senior (AG-00) con Analista de Negocio Senior (AG-01) |
| 1.0 | 2026-07-27 | Corrección dentro del ciclo de emisión, sin cambio de versión, por el audit `A-00-Contexto-v1.0.md`. P1-01: se regeneraron las ocho anclas de la tabla de contenido que no resolvían, conservando tildes y eñes. P2-01: las fases 2, 3 y 4 pasan de "por definir" a una estimación de piso de una etapa por épica, con su base derivada y su condición de cierre declaradas bajo §2.1. P2-02: las dos épicas de cimientos se renumeran a la serie propia EPC-01 y EPC-02, declarada en §1.2, y se propaga a §2.1, §2.2, §3 y §6; desaparece el identificador EP-0N. P3-01: §3 declara la sustitución de sprint por etapa como desviación de la tabla tipo, con su equivalencia uno a uno | Product Manager Senior (AG-00) con Analista de Negocio Senior (AG-01) |
| 1.0 | 2026-07-27 | Actualización de referencias, sin cambio de versión ni de contenido: el intake vigente pasa a ser `SOLUTION-INTAKE-SelfHosted-Service-Core-v1.1.md`, y se cita esa versión en la cabecera de trazabilidad y en el control de cambios. Ningún hallazgo del audit `A-00-Contexto-v1.0.md` sobre este documento quedaba pendiente | Product Manager Senior (AG-00) con Analista de Negocio Senior (AG-01) |
