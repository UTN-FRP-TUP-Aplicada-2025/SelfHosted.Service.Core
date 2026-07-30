# Necesidades de Negocio — SelfHosted.Service.Core

| Campo | Valor |
|---|---|
| Proyecto | SelfHosted.Service.Core (solución; proyecto principal SelfHosted-Web) |
| Documento | Necesidades-Negocio-v1.3.md |
| Versión | 1.3 |
| Estado | Propuesto |
| Fecha | 2026-07-28 |
| Autor | Analista de Negocio Senior (AG-01) |
| Cantidad de NB | 8 |
| Versión del catálogo de NB | 1.3 |
| Trazabilidad upstream | SOLUTION-INTAKE-SelfHosted-Service-Core-v1.2 §1, §2, §3, §4, §5, §6, §7, §8, §9, §10, §11, §12, §17 P.10, §19 y la sección de decisiones del agente humano del proyecto del 2026-07-28; `Vision-Producto-v1.1.md`; `Alcance-Proyecto-v1.1.md`; `Roadmap-Producto-v1.1.md` |
| Trazabilidad downstream | CU-01 a CU-35 (previstas en 02-Especificacion-Funcional); 06-Backlog-Tecnico; 07-Plan-Sprint; 08-Calidad-Y-Pruebas |

## Tabla de contenido

- [1. Propósito y alcance del catálogo](#1-propósito-y-alcance-del-catálogo)
- [2. Resumen de necesidades de negocio](#2-resumen-de-necesidades-de-negocio)
- [3. Mapa de dependencias entre NB](#3-mapa-de-dependencias-entre-nb)
  - [3.1 Tabla de dependencias](#31-tabla-de-dependencias)
  - [3.2 Grafo y verificación de aciclicidad](#32-grafo-y-verificación-de-aciclicidad)
- [4. Trazabilidad agregada](#4-trazabilidad-agregada)
  - [4.1 De capacidad del alcance a NB](#41-de-capacidad-del-alcance-a-nb)
  - [4.2 De NB a casos de uso previstos](#42-de-nb-a-casos-de-uso-previstos)
  - [4.3 De métrica de éxito del negocio a NB](#43-de-métrica-de-éxito-del-negocio-a-nb)
  - [4.4 Cadena de trazabilidad obligatoria](#44-cadena-de-trazabilidad-obligatoria)
- [5. Criterios de éxito derivados pendientes de confirmación](#5-criterios-de-éxito-derivados-pendientes-de-confirmación)
- [6. Decisiones de recorte del catálogo](#6-decisiones-de-recorte-del-catálogo)
- [Control de cambios](#control-de-cambios)

---

## 1. Propósito y alcance del catálogo

Este documento es el índice maestro de las necesidades de negocio de la solución. La categoría se genera una sola vez a nivel solución, a partir del intake único y de los documentos de contexto de la categoría 00, y no se repite por proyecto. Cada necesidad tiene su archivo propio en la subcarpeta `Necesidades-De-Negocio/`.

Una necesidad de negocio describe un problema concreto de la operación del cliente, para quién duele, con qué métrica se sabrá que quedó resuelto y con qué prioridad relativa. No describe flujos ni pantallas: eso corresponde a los casos de uso de 02-Especificacion-Funcional, que cada necesidad declara como previstos y todavía no redactados.

El catálogo cubre las diecinueve capacidades incluidas del alcance, F-01 a F-17 más F-23 y F-24, estas dos últimas incorporadas por el intake el 2026-07-28. Tiene ocho necesidades, dentro del rango admitido de tres a quince. Seis son Must Have —NB-01, NB-02, NB-04, NB-05, NB-06 y NB-08— y se corresponden con el conjunto de capacidades sin las cuales la solución no resuelve el problema declarado; dos son Should Have, NB-03 y NB-07. Con independencia de ese reparto, tres necesidades agrupan capacidades de prioridad mixta y toman la más alta del grupo: NB-03, NB-04 y NB-08. Las justificaciones están en la §9 de cada documento y el detalle del criterio en §6 de este índice.

Vocabulario de hitos. Este catálogo expresa todos sus plazos en fases del roadmap, que es el vocabulario que ordena la construcción. La correspondencia con el vocabulario de alcances del intake es uno a uno para los cuatro incrementos funcionales, según `Roadmap-Producto` §1.2: Alcance 1 equivale a la Fase 1, Alcance 2 a la Fase 2, Alcance 3 a la Fase 3 y Alcance 4 a la Fase 4. La Fase 0 de cimientos no tiene alcance equivalente. Las métricas de éxito del intake §8, enunciadas por alcance, se leen aquí por fase sin cambio de significado.

## 2. Resumen de necesidades de negocio

| ID | Necesidad | Prioridad MoSCoW | CU previstas | Estado | Enlace |
|---|---|---|---|---|---|
| NB-01 | Visibilidad unificada de la arquitectura de un conjunto de servicios | Must Have | CU-01 a CU-05 | Propuesto | [NB-01](Necesidades-De-Negocio/NB-01-Visibilidad-Unificada-De-La-Arquitectura-v1.3.md) |
| NB-02 | Adoptabilidad del parque existente sin reinstanciar lo que ya está en producción | Must Have | CU-06 a CU-08 | Propuesto | [NB-02](Necesidades-De-Negocio/NB-02-Adopcion-Del-Parque-Existente-v1.1.md) |
| NB-03 | Reproducibilidad de la arquitectura ante la pérdida del servidor | Should Have | CU-09 a CU-12 | Propuesto | [NB-03](Necesidades-De-Negocio/NB-03-Reproducibilidad-De-La-Arquitectura-v1.1.md) |
| NB-04 | El alta de un servicio deja de ser un ejercicio de copiar y adaptar | Must Have | CU-13 a CU-17 | Propuesto | [NB-04](Necesidades-De-Negocio/NB-04-Alta-De-Servicios-Sin-Copiar-Y-Adaptar-v1.1.md) |
| NB-05 | Arranque previsible: orden deducido y conflictos de dirección detectados antes de fallar | Must Have | CU-18 a CU-21 | Propuesto | [NB-05](Necesidades-De-Negocio/NB-05-Arranque-Sin-Conflictos-De-Direccion-v1.3.md) |
| NB-06 | Cambios de configuración revisados antes de aplicarse y aplicados en un solo lote | Must Have | CU-22 a CU-25 | Propuesto | [NB-06](Necesidades-De-Negocio/NB-06-Cambios-Revisados-Y-Aplicados-En-Lote-v1.3.md) |
| NB-07 | Atribución del consumo del servidor a un servicio concreto | Should Have | CU-26 a CU-28 | Propuesto | [NB-07](Necesidades-De-Negocio/NB-07-Atribucion-Del-Consumo-De-Recursos-v1.1.md) |
| NB-08 | Control de acceso al panel que gobierna el host y credenciales de máquina acotadas | Must Have | CU-29 a CU-33 | Propuesto | [NB-08](Necesidades-De-Negocio/NB-08-Control-De-Acceso-Y-Credenciales-De-Maquina-v1.1.md) |

## 3. Mapa de dependencias entre NB

### 3.1 Tabla de dependencias

| NB | Depende de | Cantidad | Es prerequisito de |
|---|---|---|---|
| NB-01 | NB-08 | 1 | NB-02, NB-03, NB-04, NB-05 y NB-07 de forma directa, y NB-06 por transitividad a través de NB-04 y NB-05 |
| NB-02 | NB-01, NB-05 | 2 | — |
| NB-03 | NB-01, NB-04 | 2 | — |
| NB-04 | NB-01 | 1 | NB-03, NB-05, NB-06, NB-07 |
| NB-05 | NB-01, NB-04 | 2 | NB-02, NB-06 |
| NB-06 | NB-04, NB-05 | 2 | — |
| NB-07 | NB-01, NB-04 | 2 | — |
| NB-08 | Sin dependencias | 0 | NB-01, y por transitividad las seis restantes |

### 3.2 Grafo y verificación de aciclicidad

```text
NB-08
  └── NB-01
        ├── NB-04
        │     ├── NB-05
        │     │     ├── NB-02
        │     │     └── NB-06
        │     ├── NB-03
        │     └── NB-07
        ├── NB-02   (segunda arista, junto con NB-05)
        ├── NB-03   (segunda arista, junto con NB-04)
        ├── NB-05   (segunda arista, junto con NB-04)
        ├── NB-06   (por NB-04 y NB-05)
        └── NB-07   (segunda arista, junto con NB-04)
```

Verificación realizada antes de cerrar el catálogo:

| Verificación | Resultado |
|---|---|
| Ninguna NB depende de más de 3 otras NB | Cumple: el máximo es 2, en NB-02, NB-03, NB-05, NB-06 y NB-07 |
| No existen ciclos de dependencias | Cumple: el orden topológico NB-08, NB-01, NB-04, NB-05, NB-02, NB-06, NB-03, NB-07 recorre las ocho necesidades sin aristas hacia atrás |
| Toda dependencia declarada referencia una NB existente | Cumple: las doce aristas resuelven contra la tabla de §2 |
| Las dependencias son coherentes con las dependencias funcionales del roadmap | Cumple: reproducen el orden EP-01 → EP-02 → EP-03 → EP-05 → EP-06 → EP-08 → EP-11 y sus derivaciones |

Orden topológico resultante, que es también el orden de lectura sugerido: NB-08, NB-01, NB-04, NB-05, NB-02, NB-06, NB-03, NB-07.

## 4. Trazabilidad agregada

### 4.1 De capacidad del alcance a NB

Cada capacidad de SOLUTION-INTAKE §4 tiene exactamente una NB responsable. Las capacidades F-18 a F-22 están excluidas de la primera versión y no generan necesidad. F-23 y F-24 se incorporaron al intake el 2026-07-28 por las decisiones D-5 y D-6, y su asignación está argumentada en §6 de este índice.

| Capacidad | Prioridad declarada | NB responsable |
|---|---|---|
| F-01 alta del administrador único y sesión | Must Have | NB-08 |
| F-02 proyectos con su modo de red y su persistencia | Must Have | NB-01 |
| F-03 alta y configuración de servicios | Must Have | NB-01 |
| F-04 lienzo con nodos, aristas y disposición persistente | Must Have | NB-01 |
| F-05 despliegue desde imagen de registro público | Must Have | NB-04 |
| F-06 arranque y parada con orden topológico | Must Have | NB-05 |
| F-07 changeset con informe de impacto y aplicación en lote | Must Have | NB-06 |
| F-08 rango de direcciones, reservas y bloqueo por conflicto | Must Have | NB-05 |
| F-09 escalado horizontal y vertical manuales | Must Have | NB-06 |
| F-10 despliegue construyendo la imagen | Must Have | NB-04 |
| F-11 descubrimiento y adopción de contenedores existentes | Must Have | NB-02 |
| F-12 tablero en tres capas | Should Have | NB-07 |
| F-13 exportación e importación de la arquitectura | Should Have | NB-03 |
| F-14 catálogo de servicios reutilizables | Should Have | NB-04 |
| F-15 tokens de API con ámbitos, vigencia y revocación | Should Have | NB-08 |
| F-16 disparo de despliegue desde un automatismo | Could Have | NB-08 |
| F-17 exportación programada a un destino externo | Could Have | NB-03 |
| F-23 variables compartidas del proyecto | Should Have | NB-04 |
| F-24 referencias entre variables | Should Have | NB-04 |

### 4.2 De NB a casos de uso previstos

Los casos de uso se generan por proyecto en 02-Especificacion-Funcional. La numeración de CU-01 a CU-35 es única en toda la solución y no colisiona entre necesidades. Treinta corresponden a `SelfHosted-Web`, que es donde viven la superficie de usuario y la interfaz para automatismos; las cinco restantes corresponden a las librerías, en los puntos donde el caso de uso es verificable sin la superficie web. Los identificadores CU-34 y CU-35 se agregaron el 2026-07-28 al final de la numeración, sin renumerar los anteriores, para no invalidar ninguna referencia ya emitida.

| NB | CU previstas | Proyecto | Estado |
|---|---|---|---|
| NB-01 | CU-01, CU-02, CU-03, CU-04, CU-05 | SelfHosted-Web | a generar |
| NB-02 | CU-06, CU-07 | SelfHosted-Web | a generar |
| NB-02 | CU-08 | SelfHosted-Infrastructure | a generar |
| NB-03 | CU-09, CU-10, CU-11 | SelfHosted-Web | a generar |
| NB-03 | CU-12 | SelfHosted-Infrastructure | a generar |
| NB-04 | CU-13, CU-14, CU-15, CU-16, CU-17, CU-34, CU-35 | SelfHosted-Web | a generar |
| NB-05 | CU-18, CU-19, CU-21 | SelfHosted-Web | a generar |
| NB-05 | CU-20 | SelfHosted-Domain | a generar |
| NB-06 | CU-22, CU-23, CU-24 | SelfHosted-Web | a generar |
| NB-06 | CU-25 | SelfHosted-Application | a generar |
| NB-07 | CU-26, CU-27 | SelfHosted-Web | a generar |
| NB-07 | CU-28 | SelfHosted-Infrastructure | a generar |
| NB-08 | CU-29, CU-30, CU-31, CU-32, CU-33 | SelfHosted-Web | a generar |

Reparto por proyecto: 30 casos de uso en `SelfHosted-Web`, 3 en `SelfHosted-Infrastructure`, 1 en `SelfHosted-Application` y 1 en `SelfHosted-Domain`. La categoría 02 puede desdoblar o reagrupar, siempre que conserve la trazabilidad a la NB de origen y no reutilice un identificador ya asignado.

Extensión declarada de la Tabla C. La Tabla C de `Rules-Necesidades-Negocio.md` §4.4 fija tres columnas: `NB`, `CU prevista` y `Estado`. Las ocho §7 de este catálogo y la tabla anterior agregan una cuarta columna, `Proyecto`, sin quitar ninguna de las tres originales. La extensión es deliberada y responde a una condición de esta solución: los casos de uso se generan por proyecto y la composición tiene cuatro, de modo que sin esa columna la categoría 02 no sabría a qué proyecto despachar cada caso de uso. Queda registrada aquí para que no se lea como desvío del formato; si el orquestador prefiere el formato estricto de tres columnas, la información se reubica dentro de la celda de la CU sin pérdida.

### 4.3 De métrica de éxito del negocio a NB

Las cuatro métricas de éxito declaradas en SOLUTION-INTAKE §8 y recogidas en `Vision-Producto` §6 se reparten así:

| Métrica de negocio | NB que la adopta como criterio de éxito |
|---|---|
| Adopción del parque existente | NB-02, primer criterio |
| Reemplazo del método manual | NB-04, primer criterio |
| Reproducibilidad de la arquitectura | NB-03, primer criterio |
| Continuidad de la entrega | Ninguna NB en particular: es transversal a las ocho y se verifica en 07-Plan-Sprint y 08-Calidad-Y-Pruebas como regla de no-regresión acumulativa y de cierre de etapa |

### 4.4 Cadena de trazabilidad obligatoria

```text
SOLUTION-INTAKE → 00-Contexto → NB → CU → US → BT → Sprint → Test → Pipeline
```

| Eslabón | Dónde está | Estado |
|---|---|---|
| SOLUTION-INTAKE | `SDD/Intake/SOLUTION-INTAKE-SelfHosted-Service-Core-v1.2.md` | Aprobado con observaciones, con los seis supuestos S-01 a S-06 resueltos y las siete decisiones del agente humano del proyecto del 2026-07-28 incorporadas |
| 00-Contexto | `Vision-Producto`, `Alcance-Proyecto` y `Roadmap-Producto`, en `SDD/Docs/00-Contexto/` | Propuesto |
| NB | Este catálogo, ocho necesidades | Propuesto |
| CU | 02-Especificacion-Funcional, CU-01 a CU-35 | a generar |
| US, BT, Sprint, Test, Pipeline | 06-Backlog-Tecnico, 07-Plan-Sprint, 08-Calidad-Y-Pruebas, 09-Devops | a generar |

## 5. Criterios de éxito derivados pendientes de confirmación

Las ocho necesidades suman cuarenta y tres criterios de éxito. Cuarenta y uno toman su número de una métrica de negocio declarada, de un umbral no funcional declarado o del dimensionamiento verificado del intake. Los dos restantes son derivaciones de este catálogo, están marcados `[D]` en la tabla de la necesidad correspondiente y en la nota al pie de su §5, y requieren confirmación explícita del cliente antes de tratarse como cerrados.

| NB | Criterio | Target derivado | Base de la derivación |
|---|---|---|---|
| NB-01 | Cobertura del parque en el registro | 5 de 5 conjuntos representados | El denominador de 5 conjuntos proviene del inventario verificado del parque; el target del 100 % no proviene de ninguna métrica declarada, porque la única métrica sobre el parque es la de adopción, fijada en 75 % sobre contenedores y no sobre conjuntos |
| NB-01 | Autosuficiencia de la consulta de dependencias | 0 archivos externos que abrir | El dolor declarado en SOLUTION-INTAKE §1 es abrir archivos dispersos y contrastarlos; el target expresa su eliminación, pero ninguna métrica declarada lo fija. Mide el producto, no este documento |

Cómo se llegó de seis derivaciones a dos. La versión 1.0 de este catálogo declaraba seis criterios derivados. El 2026-07-28 el agente humano del proyecto se pronunció sobre los seis y el resultado fue el siguiente:

| NB | Criterio de la versión 1.0 | Resultado |
|---|---|---|
| NB-01 | Cobertura del parque en el registro | Sigue derivado en su target. Su plazo dejó de serlo: el agente humano declaró que no hay plazo fijado y que el plazo no es relevante, de modo que queda anclado al hito que entrega la capacidad |
| NB-01 | Autosuficiencia de la consulta de dependencias | Sigue derivado, sin cambios. La observación recibida leía el criterio como si midiera este documento; mide el producto, y por eso el criterio no se altera |
| NB-01 | Estabilidad de la sesión de trabajo | Deja de ser derivación. El `≤ 10 %` que este catálogo había derivado se reemplaza por el umbral cualitativo que el intake declara para la puerta técnica PT-01, y es esa puerta la que fija el número al medir |
| NB-04 | Altas resueltas desde el catálogo | Retirado. El catálogo arranca vacío y el usuario lo puebla o no: un porcentaje de adopción no es medible sobre una colección que puede quedar sin contenido |
| NB-04 | Tiempo de alta de un servicio frecuente | Retirado, por la misma razón que el anterior |
| NB-05 | Direcciones fijas fuera del sistema | Reemplazado por un criterio no derivado. El criterio miraba el lugar equivocado: lo verificable no es cuántas direcciones quedaron anotadas afuera, sino que toda dirección asignada salga del rango gestionado y quede registrada como reserva |

Los dos criterios retirados de NB-04 se reemplazaron por tres criterios verificables desde el día uno de la capacidad, de modo que el catálogo pasó de cuarenta a cuarenta y un criterios y NB-04 de cinco a seis. La segunda pasada sobre la decisión D-6 agregó después un sexto criterio a NB-01, sobre la legibilidad de la clase de cada dependencia en el lienzo, y la tercera un séptimo, sobre la integridad de la arquitectura ante el renombrado de un servicio, con lo que el total llega a cuarenta y tres.

Plazos. Ninguna de las cuarenta y tres filas usa fecha de calendario: los plazos se expresan en meses desde el cierre de una fase, atados a un hito del roadmap o declarados como continuos, en línea con la restricción de plazo del cliente. Ningún criterio se mide antes de que exista la capacidad que evalúa. Tres criterios de NB-04 se anclan al cierre de la fase que entregue el catálogo sin nombrarla, y uno a la etapa que incorpore las variables compartidas: en ambos casos la ubicación en el roadmap sigue pendiente y está registrada en el README §6.

## 6. Decisiones de recorte del catálogo

| Decisión | Motivo |
|---|---|
| F-06, arranque y parada, se ubica en NB-05 y no en NB-01 | El orden de arranque y el conflicto de direcciones se manifiestan en el mismo acto, con el mismo público y en el mismo momento de verificación. Separarlos habría creado una dependencia mutua entre NB-01 y NB-04, porque el arranque necesita el despliegue y el despliegue necesita el servicio declarado |
| F-09, escalado manual, se ubica en NB-06 y no en NB-07 | Cambiar réplicas o límites de recursos es una edición de configuración que entra en el conjunto de cambios pendientes y provoca un reemplazo de contenedor: comparte circuito de revisión, informe de impacto y ventana de indisponibilidad con el resto de los cambios. NB-07 conserva la observación del consumo, que es un dolor distinto y de otra fase: `Roadmap-Producto` §2.2 ubica F-09 en la Fase 1 y F-12 en la Fase 2 |
| NB-07 queda con una sola capacidad, F-12 | Su dolor —no poder atribuir la presión sobre un servidor chico a un servicio concreto— tiene público y métrica propios y no se funde con ningún otro. Es una necesidad legítimamente acotada, no un recorte excesivo |
| NB-03 agrupa F-13 y F-17, de prioridades distintas | Ambas responden al mismo dolor: la arquitectura no sobrevive a la pérdida del disco. La exportación es la mitigación y la programación es lo que la vuelve confiable. La necesidad toma Should Have, la más alta de las dos |
| F-23 y F-24 se ubican en NB-04, y juntas | El intake declara que ambas resuelven el mismo dolor: un valor que varios servicios comparten se escribe y se sincroniza servicio por servicio. Ese es el dolor de NB-04 —copiar y adaptar— aplicado a un dato en lugar de a una configuración entera, de modo que no abren una necesidad nueva y no se separan entre sí, porque separarlas partiría un dolor único. Se evaluaron dos destinos alternativos y se descartaron: NB-01, porque su dolor es no poder ver la arquitectura y no la duplicación de valores, aunque la referencia entre variables genere una dependencia declarada que NB-01 sí registra; y NB-06, porque su dolor es aplicar cambios en lote con revisión previa, y la propagación de un valor compartido es una consecuencia de estas capacidades y no su motivo. Ambos efectos quedan anotados en la NB que los recibe |
| NB-08 agrupa F-01, F-15 y F-16, de prioridades distintas | Las tres responden al mismo dolor: un panel que gobierna el equipo necesita control de acceso, y los automatismos no deben conocer la credencial del administrador. La necesidad toma Must Have, la más alta de las tres |

---

## Control de cambios

| Versión | Fecha | Cambios | Autor |
|---|---|---|---|
| 1.0 | 2026-07-27 | Catálogo inicial de ocho necesidades de negocio, con cuarenta criterios de éxito, cinco de ellos derivados y marcados para confirmación, treinta y tres casos de uso previstos y un mapa de dependencias acíclico con un máximo de dos dependencias por necesidad | Analista de Negocio Senior (AG-01) |
| 1.0 | 2026-07-27 | Correcciones del audit A-01-Necesidades-Negocio-v1.0, incorporadas dentro del mismo ciclo de emisión y sin incremento de versión, porque la 1.0 todavía no había sido publicada como vigente. P1-01: anclas de la tabla de contenido reemitidas conservando tildes y eñes. P1-02: conteo MoSCoW de §1 corregido a seis Must Have y dos Should Have, con el reparto de prioridades mixtas declarado por separado. P1-03: la primera fila de §5 de NB-01 se reconoce como derivación, con lo que el total de derivados pasa de cinco a seis. P2-01: extensión de la Tabla C con la columna `Proyecto` declarada en §4.2. P2-02: denominador del criterio de direcciones de NB-05 unificado en 5. P2-04: vocabulario de hitos unificado en fases del roadmap, con la correspondencia con los alcances del intake declarada en §1. P3-02 y P3-05 aplicados | Analista de Negocio Senior (AG-01) |
| 1.0 | 2026-07-27 | Actualización de la referencia al intake tras su consolidación por el flujo de no-modificación: las dos citas de este documento pasan de la versión 1.0 del intake a la 1.1, que es la vigente en `SDD/Intake/`, y la fila de la cadena de trazabilidad de §4.4 registra que los seis supuestos S-01 a S-06 quedaron resueltos. Ningún valor numérico del intake cambió, de modo que los cuarenta criterios de éxito y sus seis derivaciones se mantienen sin alteración. Sin incremento de versión de este documento | Analista de Negocio Senior (AG-01) |
| 1.0 | 2026-07-27 | Cierre del hallazgo N-01 del audit A-01-Necesidades-Negocio-v2.0: la primera fila de este control de cambios vuelve a declarar cinco criterios derivados, que es lo que la emisión inicial afirmaba, y el alta del sexto queda narrado únicamente en la fila de corrección que lo produjo. Un registro histórico no se reescribe | Analista de Negocio Senior (AG-01) |
| 1.1 | 2026-07-28 | Propagación del SOLUTION-INTAKE v1.2, que incorpora las siete decisiones del agente humano del proyecto del 2026-07-28, y respuesta del agente humano sobre los seis criterios derivados. Las capacidades cubiertas pasan de diecisiete a diecinueve con el alta de F-23 y F-24, ambas asignadas a NB-04 con su argumento en §6. Los casos de uso previstos pasan de treinta y tres a treinta y cinco. Los criterios de éxito pasan de cuarenta a cuarenta y uno y las derivaciones `[D]` de seis a dos, con el detalle del resultado de cada una en §5. Seis necesidades pasan a la versión 1.1 por contenido; NB-07 y NB-08 no son alcanzadas por ninguna decisión y suben de versión únicamente porque sus citas a documentos de `00-Contexto` debían apuntar a la versión 1.1 de esos documentos, actualizada en paralelo. La referencia al intake pasa a la versión 1.2 | Analista de Negocio Senior (AG-01) |
| 1.2 | 2026-07-28 | Propagación de la segunda pasada sobre la decisión D-6, que unifica en un solo mecanismo las dos formas de vincular servicios que existían, e introduce la distinción entre las dependencias que gobiernan el orden de arranque y las que no. Alcanza a NB-01, NB-05 y NB-06, que pasan a la versión 1.2; las otras cinco necesidades permanecen en la 1.1 por no requerir cambios. Se adopta además la convención de citar los documentos de `00-Contexto` sin sufijo de versión en el cuerpo, reservando el nombre versionado para la trazabilidad upstream de la cabecera, de modo que una subida de versión de esa categoría deje de propagarse a todo este catálogo | Analista de Negocio Senior (AG-01) |
| 1.3 | 2026-07-28 | Propagación de la tercera pasada sobre la decisión D-6. La distinción entre clases de dependencia cambia de objeto: deja de separar a las que toman la dirección de otro servicio de las que toman otro dato, y pasa a separar a aquellas en las que se declaró que hay que esperar de aquellas en las que no, con esa marca puesta por el administrador sobre una propuesta del sistema. Se incorpora además que una dependencia puede existir sin valor de por medio y que renombrar un servicio deja de romper lo que lo apuntaba. Alcanza a NB-01, NB-05 y NB-06, que pasan a la versión 1.3; las otras cinco permanecen en la 1.1 por no requerir cambios. Los criterios de éxito pasan de cuarenta y dos a cuarenta y tres por el alta del séptimo de NB-01 | Analista de Negocio Senior (AG-01) |
