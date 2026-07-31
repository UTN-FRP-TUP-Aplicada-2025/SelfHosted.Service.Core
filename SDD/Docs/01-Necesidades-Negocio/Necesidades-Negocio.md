# Necesidades de Negocio — SelfHosted Service

| Campo | Valor |
| --- | --- |
| Producto | SelfHosted Service |
| Documento | Necesidades-Negocio.md |
| Versión | 2.0 |
| Estado | Propuesto |
| Fecha | 2026-07-30 |
| Autor | Analista de Negocio Senior (AG-01) |
| Cantidad de NB | 8 |
| Versión del catálogo de NB | 2.0 |
| Trazabilidad upstream | PRODUCT-INTAKE-SelfHosted-Service §1, §3, §4, §8, §11, §12, §17.P.10, §23.1 a §23.5; Vision-Producto.md §1, §3.2 (DV-01 a DV-05), §5 (OBJ-01 a OBJ-05), §6, §7.1 (RE-01 a RE-12), §8.1, §9; Alcance-Producto.md §4.1, §5.1, §5.2, §6.3, §8 (CA-01 a CA-10); Roadmap-Producto.md §2.2, §2.3, §2.5, §2.6, §3 |
| Trazabilidad downstream | 02-Especificacion-Funcional (CU-01 a CU-36), 03-UX-UI-DX, 06-Backlog-Tecnico, 07-Plan-Sprint, 08-Calidad-Y-Pruebas |

---

## Tabla de contenido

- [§1. Qué contiene este catálogo](#1-qué-contiene-este-catálogo)
- [§2. Tabla resumen de necesidades](#2-tabla-resumen-de-necesidades)
  - [§2.1 Procedencia de la prioridad MoSCoW](#21-procedencia-de-la-prioridad-moscow)
  - [§2.2 Procedencia de los 44 criterios de éxito](#22-procedencia-de-los-44-criterios-de-éxito)
- [§3. Mapa de dependencias](#3-mapa-de-dependencias)
  - [§3.1 Tabla de dependencias](#31-tabla-de-dependencias)
  - [§3.2 Orden topológico y verificación de aciclicidad](#32-orden-topológico-y-verificación-de-aciclicidad)
- [§4. Trazabilidad agregada](#4-trazabilidad-agregada)
  - [§4.1 De capacidad a necesidad](#41-de-capacidad-a-necesidad)
  - [§4.2 De necesidad a caso de uso](#42-de-necesidad-a-caso-de-uso)
  - [§4.3 De métrica de negocio a necesidad](#43-de-métrica-de-negocio-a-necesidad)
  - [§4.4 Upstream y downstream de la categoría](#44-upstream-y-downstream-de-la-categoría)
- [§5. Decisiones de recorte del catálogo](#5-decisiones-de-recorte-del-catálogo)
- [§6. Criterios de éxito, en agregado](#6-criterios-de-éxito-en-agregado)
- [§7. Brechas abiertas de esta categoría](#7-brechas-abiertas-de-esta-categoría)
- [Control de cambios](#control-de-cambios)

---

## §1. Qué contiene este catálogo

Ocho necesidades de negocio, una por archivo, bajo [Necesidades-De-Negocio/](Necesidades-De-Negocio/). Cada una articula un dolor concreto del propietario del servidor de referencia, a quién le duele, con qué criterios numéricos se verifica que quedó resuelto y con qué prioridad relativa. Ninguna define flujos funcionales: las CU que las implementarán se declaran previstas y las desarrolla la categoría 02-Especificacion-Funcional. Las ocho están en versión 2.0, igual que este índice y que el README de la sección: la migración normativa del conjunto 4.1 al 6.0 las alcanzó a todas por el mismo salto major de la regla que las gobierna.

Las ocho provienen del consolidado de la Fase A previa transcripto en la Parte E del intake, §23, y se conservan con su numeración, sus criterios y su grafo de dependencias. Ese material está marcado [FA] y se consume como propuesta sólida y no como requisito cerrado del cliente: las ocho necesidades están en estado `Propuesto` y ninguna se declara aprobada. Lo que sí es dato cerrado son las cuatro métricas de negocio que tres de ellas adoptan como primer criterio, confirmadas por el agente humano del proyecto el 2026-07-27.

Convenciones que esta categoría aplica, heredadas de 00-Contexto: «proyecto SelfHosted» designa el objeto del producto —la arquitectura de servicios contenedorizados con su red y su lienzo, que el usuario crea desde el portal—; «proyecto de código» designa la unidad de compilación y se escribe siempre completo; «proyecto» a secas designa el emprendimiento. En esta categoría el sentido predominante es el del producto. Los tres referentes están declarados en el glosario del dominio de [Vision-Producto.md](../00-Contexto/Vision-Producto.md) §9, que es el glosario raíz de la cadena: esta categoría lo referencia y no lo redefine, y no mantiene glosario propio. Todo término que esta categoría acuñe o precise y que aparezca en más de uno de sus artefactos se da de alta allá, no acá.

---

## §2. Tabla resumen de necesidades

| ID | Necesidad | Prioridad MoSCoW | CU previstas | Estado | Enlace |
| --- | --- | --- | --- | --- | --- |
| NB-01 | Visibilidad unificada de la arquitectura de un conjunto de servicios | Must Have | CU-01, CU-02, CU-03, CU-04, CU-05, CU-36 | Propuesto | [NB-01](Necesidades-De-Negocio/NB-01-Visibilidad-Unificada-De-La-Arquitectura.md) |
| NB-02 | Adoptabilidad del parque existente sin reinstanciar lo que ya está en producción | Must Have | CU-06, CU-07, CU-08 | Propuesto | [NB-02](Necesidades-De-Negocio/NB-02-Adoptabilidad-Del-Parque-Existente.md) |
| NB-03 | Reproducibilidad de la arquitectura ante la pérdida del servidor | Should Have | CU-09, CU-10, CU-11, CU-12 | Propuesto | [NB-03](Necesidades-De-Negocio/NB-03-Reproducibilidad-De-La-Arquitectura.md) |
| NB-04 | El alta de un servicio deja de ser un ejercicio de copiar y adaptar | Must Have | CU-13, CU-14, CU-15, CU-16, CU-17, CU-34, CU-35 | Propuesto | [NB-04](Necesidades-De-Negocio/NB-04-Alta-De-Servicio-Sin-Copiar-Y-Adaptar.md) |
| NB-05 | Arranque previsible: orden declarado y conflictos de dirección detectados antes de fallar | Must Have | CU-18, CU-19, CU-20, CU-21 | Propuesto | [NB-05](Necesidades-De-Negocio/NB-05-Arranque-Previsible-Y-Conflictos-Anticipados.md) |
| NB-06 | Cambios de configuración revisados antes de aplicarse y aplicados en un solo lote | Must Have | CU-22, CU-23, CU-24, CU-25 | Propuesto | [NB-06](Necesidades-De-Negocio/NB-06-Cambios-Revisados-Y-Aplicados-En-Lote.md) |
| NB-07 | Atribución del consumo del servidor a un servicio concreto | Should Have | CU-26, CU-27, CU-28 | Propuesto | [NB-07](Necesidades-De-Negocio/NB-07-Atribucion-Del-Consumo-Del-Servidor.md) |
| NB-08 | Control de acceso al panel que gobierna el host y credenciales de máquina acotadas | Must Have | CU-29, CU-30, CU-31, CU-32, CU-33 | Propuesto | [NB-08](Necesidades-De-Negocio/NB-08-Control-De-Acceso-Y-Credenciales-De-Maquina.md) |

Seis necesidades son Must Have y dos Should Have. Ninguna es Could Have ni Won't Have v1: las cinco capacidades F-18 a F-22 no generan necesidad de negocio y no deben aparecer como caso de uso en la categoría 02. Su exclusión es dato cerrado del cliente y no derivación de esta cadena: el intake §4 las declara `Won't Have v1` y su §9 trae las siete exclusiones correspondientes marcadas [E]. [Alcance-Producto.md](../00-Contexto/Alcance-Producto.md) §5.2 las cataloga con su identificador para que un pedido futuro lo reutilice en lugar de emitir uno nuevo.

### §2.1 Procedencia de la prioridad MoSCoW

La prioridad de cada necesidad no se origina en esta categoría. Es el máximo de las prioridades MoSCoW que el intake §4 asigna a las capacidades que la necesidad agrupa, y esa regla de agregación está declarada en el intake §23.4 para el caso de NB-03, en los términos «toma la prioridad más alta». El intake §4 declara además de dónde sale su propia etiqueta: traduce la pertenencia de cada capacidad a uno de los cuatro alcances incrementales, que son dato declarado del cliente.

La tabla registra la traza de las ocho, capacidad por capacidad, para que ningún artefacto downstream tenga que reconstruirla ni suponer que el valor lo fijó el analista de negocio.

| NB | Prioridad declarada en §9 de la NB | MoSCoW de las capacidades que agrupa, según intake §4 | Traza |
| --- | --- | --- | --- |
| NB-01 | Must Have | F-02 Must, F-03 Must, F-04 Must, F-25 Could | Traza. Máximo de cuatro capacidades de dos prioridades distintas |
| NB-02 | Must Have | F-11 Must | Traza de forma directa. Capacidad única |
| NB-03 | Should Have | F-13 Should, F-17 Could | Traza. Máximo de dos prioridades distintas, con la regla de agregación declarada explícitamente en el intake §23.4 para este caso |
| NB-04 | Must Have | F-05 Must, F-10 Must, F-14 Should, F-23 Should, F-24 Should | Traza. Máximo de cinco capacidades de dos prioridades distintas |
| NB-05 | Must Have | F-06 Must, F-08 Must | Traza de forma directa. Las dos capacidades comparten prioridad |
| NB-06 | Must Have | F-07 Must, F-09 Must | Traza de forma directa. Las dos capacidades comparten prioridad |
| NB-07 | Should Have | F-12 Should | Traza de forma directa. Capacidad única |
| NB-08 | Must Have | F-01 Must, F-15 Should, F-16 Could | Traza. Máximo de tres capacidades de tres prioridades distintas |

Las ocho trazan a una sección concreta del intake y ninguna se originó en esta categoría. Lo que conviene registrar con precisión es qué parte de cada una es dato del intake y qué parte es la aplicación de la regla de agregación:

- El valor MoSCoW de cada capacidad es del intake §4 en los veinte casos, y en tres de ellos —F-23, F-24 y F-25— es además decisión explícita del agente humano del proyecto del 2026-07-28, registrada allí como D-5, D-6 y D-13.
- La regla de agregación está declarada de forma explícita en el intake §23.4 sólo para NB-03. Para NB-01, NB-04 y NB-08, que son los otros tres casos que mezclan prioridades, el intake §23.1 registra el resultado ya agregado como material [FA], sin repetir la regla. Los cuatro casos restantes no necesitan regla: sus capacidades comparten prioridad o son una sola.
- Ninguna de las ocho es una prioridad emitida por el analista de negocio. La justificación de una línea que cada NB da en su §9 explica por qué el valor es el que es; no lo elige.

### §2.2 Procedencia de los 44 criterios de éxito

Los 44 criterios de éxito son el otro eje que esta categoría emite en volumen, y cada uno tiene tres componentes con procedencia propia: la métrica, que es qué se mide; el target, que es el número o la condición de aceptación; y el plazo, que es a qué hito ancla. Este inventario clasifica los 132 componentes para que ningún artefacto downstream lea como derivado algo que no lo es.

Las tres clasificaciones: derivado, con la sección concreta del intake o del documento de 00-Contexto de donde sale; [FA], cuando el componente viene del consolidado de la Fase A previa transcripto en el intake §23.3, que es material previo y no dato cerrado del cliente; y originado, cuando lo emitió esta categoría.

| NB | Criterio | Métrica | Target | Plazo |
| --- | --- | --- | --- | --- |
| NB-01 | Cobertura del parque en el registro | [FA] §23.3; denominador de 5 conjuntos derivado del anexo E-19 [E] | [FA] §23.3, declarado derivación pendiente de confirmación | Derivado · §8, horizonte de la única otra métrica sobre el parque |
| NB-01 | Autosuficiencia de la consulta de dependencias | [FA] §23.3 | [FA] §23.3, derivación del dolor de §1, declarada pendiente | Derivado por composición · EP-04, etapa `03` |
| NB-01 | Escala legible sin degradación | Derivado · §17.P.10, umbral de PT-01 [E] | Derivado · §17.P.10 [E] | Derivado · §11 y Roadmap §2.4, antes del corte del lienzo |
| NB-01 | Conservación de la disposición | Derivado · §4 F-04 y §5 historia 3 | [FA] §23.3, target de totalidad | Derivado por composición · EP-04, etapa `03` |
| NB-01 | Estabilidad de la sesión | Derivado · §17.P.10 [E] | Derivado · §17.P.10 [E], cualitativo por declaración de la fuente | Derivado · Roadmap §2.4, medición de PT-01 |
| NB-01 | Previsibilidad del arranque leyendo el lienzo | [FA] §23.3, apoyada en §12, eje «espera al destino» de la arista | [FA] §23.3, target de totalidad | Derivado por composición · EP-04, etapa `03` |
| NB-01 | Integridad ante un renombrado | Derivado · §12, referencia persistida vinculada al servicio (D-8), y §23.4 | [FA] §23.3, target de totalidad | Derivado por composición · EP-04, etapa `03` |
| NB-01 | Señalamiento de la degradación del registro | Derivado · §4 F-25, las cinco detecciones enumeradas (D-13) | Derivado · §4 F-25, «ninguna bloquea» (D-13) | Derivado por composición · EP-25, anclaje abierto ya declarado como brecha |
| NB-02 | Adopción del parque existente | Derivado · §8 [S-01 confirmado] | Derivado · §8 | Derivado · §8 |
| NB-02 | Continuidad del servicio durante la incorporación | Derivado · §3 diferenciador 1 y §4 F-11 | Derivado · §3, «sin recrearlos ni cortar el servicio» | Derivado por composición · EP-11, etapa `10` |
| NB-02 | Fidelidad de la configuración importada | Derivado · §6 flujo 2, las seis dimensiones enumeradas | Derivado · §6 flujo 2 | Derivado por composición · EP-11, etapa `10` |
| NB-02 | Salvaguardas de aislamiento activas | Derivado · §17.P.5, las cinco salvaguardas enumeradas [E] | Derivado · §17.P.5 [E] | Derivado por composición · EP-11, etapa `10` |
| NB-02 | Clasificación de las credenciales importadas | Derivado · §7 CL-15 y §6 flujo 2 (D-2, RN-29) | Derivado · §7 CL-15, paso obligatorio | Derivado por composición · EP-11, etapa `10` |
| NB-03 | Reproducibilidad de la arquitectura | Derivado · §8 [S-01 confirmado] | Derivado · §8 | Derivado · §8 |
| NB-03 | Fidelidad de la reimportación | Derivado · §4 F-13 y anexo E-21 | [FA] §23.3, target de totalidad | Derivado por composición · EP-13, Fase 3 |
| NB-03 | Ausencia de credenciales en la salida | Derivado · §5 historia 9 y RN-15 | Derivado · §5 historia 9, «con los secretos vacíos» | Derivado por composición · EP-13, Fase 3 |
| NB-03 | Cobertura de la traducción sobre el parque real | Derivado · anexo E-20 | Derivado · §1 y E-20, seis configuraciones transcriptas [E] | Derivado por composición · EP-13, Fase 3 |
| NB-03 | Automatismo del respaldo | Derivado · §4 F-17 | Derivado · §8, antigüedad menor a 7 días | Derivado por composición · EP-17, Fase 3 |
| NB-04 | Reemplazo del método manual | Derivado · §8 [S-01 confirmado] | Derivado · §8 | Derivado · §8 |
| NB-04 | Cobertura de las dimensiones del alta | Derivado · anexos E-19 y E-2, las ocho dimensiones que el parque real exige [E] | Derivado · anexo E-19 [E] | Derivado por composición · EP-03, etapa `02` |
| NB-04 | Vías de alta soportadas | Derivado · §4 F-14 (D-7), tres orígenes más el catálogo | Derivado · §4 F-14 (D-7) | Derivado por composición · EP-14, Fase 3 |
| NB-04 | Autosuficiencia de la instanciación | Derivado · §4 F-14 y anexo E-6 | [FA] §23.3 | Derivado por composición · EP-14, Fase 3 |
| NB-04 | Fidelidad del conjunto instanciado | Derivado · §4 F-14 (D-7) y RN-30 | Derivado · §4 F-14, target de totalidad | Derivado por composición · EP-14, Fase 3 |
| NB-04 | Valor compartido declarado una sola vez | Derivado · §4 F-23 (D-5), enunciado del dolor | Derivado · §4 F-23 | Derivado por composición · EP-23 y EP-24, anclaje abierto ya declarado como brecha |
| NB-05 | Anticipación del conflicto | Derivado · §3 diferenciador 4 y §4 F-08 | Derivado · §3, bloquear en lugar de fallar en el motor | Derivado por composición · EP-08, etapa `07` |
| NB-05 | Inmediatez del informe | Derivado · §17.P.10 [S-03 confirmado] | Derivado · §17.P.10 | Derivado por composición · EP-08, etapa `07` |
| NB-05 | Resoluciones ofrecidas | Derivado · §7 CL-01 y anexo E-8 | Derivado · §7 CL-01 (D-4), las tres enumeradas | Derivado por composición · EP-08, etapa `07` |
| NB-05 | Orden de arranque respetado | Derivado · §4 F-06, orden topológico del grafo | Derivado · §4 F-06, target de totalidad | Derivado por composición · EP-06, etapa `05` |
| NB-05 | Gobierno del rango de direcciones | Derivado · §4 F-08, rango gestionado y reserva por servicio | Derivado · §4 F-08, target de totalidad | Derivado por composición · EP-08, etapa `07` |
| NB-06 | Reemplazos por sesión de edición | Derivado · §3 diferenciador 3 y §4 F-07 | Derivado · §3, «se redespliega una sola vez» | Derivado por composición · EP-07, etapa `06` |
| NB-06 | Revisión previa obligatoria | Derivado · §4 F-07, informe de impacto | Derivado · §4 F-07 | Derivado por composición · EP-07, etapa `06` |
| NB-06 | Precisión del alcance declarado | [FA] §23.3 | Derivado · §4 F-07, target de totalidad sobre el informe | Derivado por composición · EP-07, etapa `06` |
| NB-06 | Cambios de escalado con consecuencia declarada | Derivado · §4 F-09 y §7 CL-06 | Derivado · §7 CL-06, pedir explícitamente en lugar de fallar | Derivado por composición · EP-09, etapa `08` |
| NB-06 | Advertencia de la ventana de indisponibilidad | Derivado · §9 exclusión 2 [E] | Derivado · §9 exclusión 2 [E] | Derivado por composición · EP-07, etapa `06` |
| NB-07 | Atribución de la presión de memoria | Derivado · §5 historia 8 | [FA] §23.3, target de totalidad | Derivado por composición · EP-12, Fase 2 |
| NB-07 | Niveles de lectura disponibles | Derivado · §4 F-12, tablero en tres capas | Derivado · §4 F-12 | Derivado por composición · EP-12, Fase 2 |
| NB-07 | Costo de observar con las pantallas cerradas | Derivado · §17.P.10 [E] | Derivado · §17.P.10 [E] | Derivado por composición · EP-12, Fase 2 |
| NB-07 | Frescura del estado mostrado | Derivado · §17.P.10 [E] | Derivado · §17.P.10 [E] | Derivado por composición · EP-12, Fase 2 |
| NB-07 | Huella del propio administrador | Derivado · §10 y §17.P.10 [E] | Derivado · §17.P.10 [E] | Derivado por composición · Fase 0 |
| NB-08 | Superficie accesible sin credencial | Derivado · §4 F-01 y §11 RG-03 | Derivado · §11 RG-03, mitigación declarada | Derivado por composición · EP-01, etapa `c` |
| NB-08 | Automatismos que conocen la credencial humana | Derivado · §5 historia 10 y §11 RG-02 | Derivado · §5 historia 10 | Derivado por composición · Fase 4 |
| NB-08 | Acotamiento de las credenciales de máquina | Derivado · §4 F-15 y F-16, ámbito mínimo, y §11 RG-03 | Derivado · §11 RG-03, «tokens de ámbito mínimo» | Derivado por composición · EP-15, anclaje abierto ya declarado como brecha |
| NB-08 | Efecto de la revocación | Derivado · §4 F-15, revocación inmediata | Derivado · §4 F-15 | Derivado por composición · Fase 4 |
| NB-08 | Registro de las operaciones con consecuencias | Derivado · §17.P.10, los cinco campos de auditoría [E] | Derivado · §17.P.10 y §17.P.11 DA-07, retención de 90 días [E] | Derivado por composición · EP-01, etapa `c` |

Recuento de los 132 componentes:

| Componente | Derivado | [FA] | Originado |
| --- | --- | --- | --- |
| Métrica | 40 | 4 | 0 |
| Target | 36 | 8 | 0 |
| Plazo | 44 | 0 | 0 |
| Total | 120 | 12 | 0 |

El inventario da limpio: ningún valor de los 132 componentes se originó en esta categoría. Los doce marcados [FA] son material de la Fase A previa, no invención de esta corrida, y los cuatro que el intake §23.3 declara derivación pendiente de confirmación ya estaban declarados como brecha en §7 desde la versión inicial. Es un resultado negativo verificado y no una ausencia de hallazgos por no haber mirado: se recorrió componente por componente contra su fuente.

Tres precisiones que el recuento no muestra y que conviene registrar, porque son donde el inventario estuvo cerca de dar otra cosa:

- Tres denominadores se verificaron contra la fuente en lugar de darse por buenos, y los tres resultaron declarados: las cinco salvaguardas de aislamiento de NB-02 están enumeradas una por una en el intake §17.P.5 [E]; la retención de 90 días de NB-08 es la decisión pre-tomada DA-07 del §17.P.11 [E]; y las ocho dimensiones del alta de NB-04 son las que los anexos E-19 y E-2 declaran que el parque real exige [E], que es un conjunto distinto y más acotado que los nueve campos de configuración que enumera la capacidad F-03. El tercero es el que más se prestaba a un falso positivo: el criterio mide contra el parque real, no contra la capacidad.
- Los plazos son derivados en los 44, pero por dos vías distintas. Seis lo son de forma directa: cuatro toman el horizonte que el intake §8 declara para las métricas de negocio y dos anclan a la medición de PT-01, cuyo momento fija el intake §11 y el Roadmap §2.4. Los 38 restantes lo son por composición, siguiendo una cadena declarada en todos sus tramos: el criterio mide una capacidad, el intake §23.2 dice qué necesidad la agrupa, el Roadmap §2.3 dice qué épica la entrega y su §3 dice en qué etapa. Ningún plazo usa fecha de calendario y ninguno se mide antes de que exista la capacidad que evalúa.
- Lo único que esta categoría eligió es la forma del plazo, no su anclaje: el intake §23.3 declara tres formas admisibles —meses desde el cierre de una fase, anclado a un hito, o continuo— y no dice cuál corresponde a cada criterio. De los 38 por composición, 24 quedaron puntuales y 14 continuos. Es una elección dentro de un marco declarado y no la emisión de un valor nuevo, de modo que no altera el recuento; queda igualmente registrada como brecha en §7, con 08-Calidad-Y-Pruebas como destinataria, porque es esa categoría la que necesita saber si un criterio se verifica una vez o de forma sostenida.

---

## §3. Mapa de dependencias

### §3.1 Tabla de dependencias

| NB | Depende de | Es prerequisito de |
| --- | --- | --- |
| NB-08 | — | NB-01 de forma directa, y las seis restantes por transitividad |
| NB-01 | NB-08 | NB-02, NB-03, NB-04, NB-05 y NB-07 de forma directa; NB-06 por transitividad |
| NB-04 | NB-01 | NB-03, NB-05, NB-06, NB-07 |
| NB-05 | NB-01, NB-04 | NB-02, NB-06 |
| NB-02 | NB-01, NB-05 | — |
| NB-06 | NB-04, NB-05 | — |
| NB-03 | NB-01, NB-04 | — |
| NB-07 | NB-01, NB-04 | — |

Ninguna necesidad depende de más de dos otras, por debajo del máximo de tres que las reglas de la categoría admiten.

### §3.2 Orden topológico y verificación de aciclicidad

Orden topológico, que es también el orden de lectura sugerido:

`NB-08 → NB-01 → NB-04 → NB-05 → NB-02 → NB-06 → NB-03 → NB-07`

El grafo es acíclico: cada necesidad depende únicamente de necesidades que la preceden en ese orden, de modo que no hay arista de retorno posible. Un lector que sólo necesite entender por qué existe el producto puede leer NB-01, NB-02 y NB-05.

---

## §4. Trazabilidad agregada

### §4.1 De capacidad a necesidad

Cada capacidad incluida en el alcance tiene exactamente una necesidad responsable. Los identificadores `F-XX` son los del intake y de [Alcance-Producto.md](../00-Contexto/Alcance-Producto.md) §4.1, y no se renumeran.

| Capacidad | NB responsable | Capacidad | NB responsable |
| --- | --- | --- | --- |
| F-01 | NB-08 | F-11 | NB-02 |
| F-02 | NB-01 | F-12 | NB-07 |
| F-03 | NB-01 | F-13 | NB-03 |
| F-04 | NB-01 | F-14 | NB-04 |
| F-05 | NB-04 | F-15 | NB-08 |
| F-06 | NB-05 | F-16 | NB-08 |
| F-07 | NB-06 | F-17 | NB-03 |
| F-08 | NB-05 | F-23 | NB-04 |
| F-09 | NB-06 | F-24 | NB-04 |
| F-10 | NB-04 | F-25 | NB-01 |

Las veinte capacidades del alcance están cubiertas y ninguna queda huérfana. Las cinco que el intake §4 declara `Won't Have v1`, F-18 a F-22, no aparecen en esta tabla por decisión del cliente declarada aguas arriba y verificable en §4 y §9 del intake, no por decisión de esta categoría.

### §4.2 De necesidad a caso de uso

Treinta y seis casos de uso previstos, con numeración única en todo el producto y sin colisión entre necesidades. Todos en estado `a generar`.

| NB | CU previstas | Cantidad |
| --- | --- | --- |
| NB-01 | CU-01, CU-02, CU-03, CU-04, CU-05, CU-36 | 6 |
| NB-02 | CU-06, CU-07, CU-08 | 3 |
| NB-03 | CU-09, CU-10, CU-11, CU-12 | 4 |
| NB-04 | CU-13, CU-14, CU-15, CU-16, CU-17, CU-34, CU-35 | 7 |
| NB-05 | CU-18, CU-19, CU-20, CU-21 | 4 |
| NB-06 | CU-22, CU-23, CU-24, CU-25 | 4 |
| NB-07 | CU-26, CU-27, CU-28 | 3 |
| NB-08 | CU-29, CU-30, CU-31, CU-32, CU-33 | 5 |
| Total | CU-01 a CU-36 | 36 |

Dos reglas que la categoría 02-Especificacion-Funcional debe respetar: puede desdoblar o reagrupar estos casos de uso siempre que conserve la trazabilidad a su necesidad de origen, y no puede reutilizar un identificador ya asignado. CU-34, CU-35 y CU-36 se agregaron al final de la numeración durante la Fase A previa, sin renumerar los anteriores, justamente para no invalidar ninguna referencia ya emitida.

Cada archivo de necesidad indica, dentro de la celda del caso de uso, qué capa del proyecto de código lo implementa. Esa asignación proviene de la Fase A previa, que conocía cuatro proyectos de código donde hoy hay uno solo con cuatro capas internas; la asignación sigue siendo válida, porque qué capa implementa un caso de uso no depende de cuántas unidades de compilación haya. La categoría 02 se genera plana, una sola vez, y no repartida por capa.

### §4.3 De métrica de negocio a necesidad

De las cuatro métricas de éxito de negocio de [Vision-Producto.md](../00-Contexto/Vision-Producto.md) §6, tres las adopta una necesidad como primer criterio de éxito y la cuarta es transversal.

| Métrica de negocio | Objetivo | NB que la adopta |
| --- | --- | --- |
| Adopción del parque existente | OBJ-01 | NB-02, primer criterio |
| Reemplazo del método manual | OBJ-02 | NB-04, primer criterio |
| Reproducibilidad de la arquitectura | OBJ-03 | NB-03, primer criterio |
| Continuidad de la entrega | OBJ-04 | Transversal a las ocho; se verifica como regla de no-regresión acumulativa y no como criterio de una necesidad |

El objetivo OBJ-05, de escala operable sin degradación, sigue pendiente de confirmación del agente humano del proyecto y lo consume NB-01 en su tercer criterio, anclado a la medición de la puerta técnica PT-01.

### §4.4 Upstream y downstream de la categoría

| Documento upstream | Qué aporta a esta categoría |
| --- | --- |
| PRODUCT-INTAKE §1, §3 | El dolor central y los cinco diferenciadores, que fijan el problema de cada necesidad |
| PRODUCT-INTAKE §4 | Las veinte capacidades incluidas y las cinco excluidas, que fijan qué agrupa cada necesidad |
| PRODUCT-INTAKE §8 | Las cuatro métricas de negocio, que tres necesidades adoptan como primer criterio |
| PRODUCT-INTAKE §11, §17.P.10 | Los riesgos y los umbrales no funcionales que sostienen criterios de NB-05, NB-07 y NB-08 |
| PRODUCT-INTAKE §12 | La convención de vocabulario del producto: los tres referentes de «proyecto» y la prohibición de fusionar los términos |
| PRODUCT-INTAKE §23.1 a §23.5 | El catálogo consolidado de la Fase A previa: identificadores, grafo, 44 criterios, 36 CU, 7 decisiones de recorte y dolores por necesidad [FA] |
| [Vision-Producto.md](../00-Contexto/Vision-Producto.md) | Problema, diferenciadores DV-01 a DV-05, objetivos OBJ-01 a OBJ-05, restricciones RE-01 a RE-12 y riesgos |
| [Alcance-Producto.md](../00-Contexto/Alcance-Producto.md) | Capacidades incluidas con su MoSCoW y su alcance, exclusiones, criterios de aceptación CA-01 a CA-10 y brechas abiertas |
| [Roadmap-Producto.md](../00-Contexto/Roadmap-Producto.md) | Fases, épicas EPC-01, EPC-02, EP-01 a EP-17 y EP-23 a EP-25, y secuencia de etapas, que son los hitos a los que se anclan los plazos de los criterios. EP-18 a EP-22 no están emitidas, y el motivo del hueco es dato cerrado: corresponderían a F-18 a F-22, que el intake §4 declara `Won't Have v1` y cuyas exclusiones §9 trae marcadas [E]. Una capacidad que el cliente dejó fuera de la primera versión no abre épica, de modo que el hueco de numeración es consecuencia de una decisión declarada y no de una omisión del roadmap |

| Categoría downstream | Qué consume de esta categoría |
| --- | --- |
| 02-Especificacion-Funcional | Los 36 casos de uso previstos con su necesidad de origen, y los dolores específicos de §4 de cada NB, que son la razón por la que cada caso de uso existe |
| 03-UX-UI-DX | Los dolores de NB-01, NB-04 y NB-06, que fijan qué debe ser visible en el lienzo y en el flujo de cambios pendientes |
| 06-Backlog-Tecnico | La prioridad MoSCoW de cada necesidad, que ordena el backlog junto con las épicas del roadmap |
| 07-Plan-Sprint | El orden topológico de §3.2 y las dependencias de §3.1, que condicionan la secuencia de etapas |
| 08-Calidad-Y-Pruebas | Los 44 criterios de éxito de §5 de cada NB, que son input directo de sus criterios de aceptación verificables |

---

## §5. Decisiones de recorte del catálogo

Siete decisiones de partición que la Fase A previa tomó con su argumento, y que esta versión conserva sin refutar ninguna. Se transcriben porque son la clase de razonamiento que una regeneración pierde si no queda escrito.

| Decisión | Motivo |
| --- | --- |
| F-06, arranque y parada, va a NB-05 y no a NB-01 | El orden de arranque y el conflicto de direcciones se manifiestan en el mismo acto, con el mismo público y en el mismo momento de verificación. Separarlos habría creado una dependencia mutua entre NB-01 y NB-04 |
| F-09, escalado manual, va a NB-06 y no a NB-07 | Cambiar réplicas o límites es una edición de configuración que entra al conjunto de cambios pendientes y provoca reemplazo de contenedor: comparte circuito de revisión, informe de impacto y ventana de indisponibilidad con el resto |
| NB-07 queda con una sola capacidad | Su dolor tiene público y métrica propios y no se funde con ningún otro. Es una necesidad legítimamente acotada, no un recorte excesivo |
| NB-03 agrupa F-13 y F-17, de prioridades distintas | Ambas responden al mismo dolor; la exportación es la mitigación y la programación es lo que la vuelve confiable. La necesidad toma la prioridad más alta de las dos |
| F-23 y F-24 van a NB-04, y juntas | Resuelven el mismo dolor de copiar y adaptar, aplicado a un dato en lugar de a una configuración entera. Se evaluaron y descartaron NB-01 y NB-06 como destinos |
| F-25 va a NB-01 y no abre necesidad propia | Mismo público y misma métrica que NB-01, presupone enteramente a NB-01, y una necesidad de una sola capacidad Could Have, estrictamente informativa, sería la más delgada del catálogo |
| NB-08 agrupa F-01, F-15 y F-16, de prioridades distintas | Las tres responden al mismo dolor: un panel que gobierna el equipo necesita control de acceso, y los automatismos no deben conocer la credencial del administrador |

Una decisión de asignación adicional, que el agente humano revisó y que el analista sostuvo con mejor argumento: la promesa de que renombrar no rompa lo que apunta al servicio se ubicó en NB-01 y no en NB-04. NB-04 promete que el alta deje de ser copiar y adaptar y que un valor compartido se declare una sola vez, y un renombrado que rompe referencias no toca ninguna de las dos. NB-01 promete que la arquitectura quede declarada y por lo tanto verificable: si renombrar rompe en silencio lo que apuntaba al servicio, esa declaración nunca fue tal. El criterio aplicado fue cuál promesa quedaría falsa sin ello.

Nota sobre el argumento de la primera fila, que se señala y no se corrige. La fila decide un recorte entre NB-05 y NB-01 —dónde va F-06, arranque y parada— y su argumento cierra invocando «una dependencia mutua entre NB-01 y NB-04», que no son las dos necesidades en disputa. La imprecisión está en el intake §23.4, primera fila, de donde la fila es transcripción literal, y no se corrige acá por dos razones: el intake es de solo lectura, y §5.2 de las reglas de la categoría pide conservar o refutar explícitamente las decisiones de recorte de la Fase A, no reescribirlas. La decisión que la fila registra es correcta y está sostenida por el resto del catálogo: F-06 pertenece a NB-05 en §4.1 de este documento, en el intake §23.2 y en la propia NB-05, y el grafo resultante es acíclico en las tres representaciones. La imprecisión se eleva como observación sobre el intake §23.4 en el próximo punto de control. Origen de la observación: hallazgo H-05 del informe [Audit/A-00-01-r1.md](../Audit/A-00-01-r1.md).

Extensión de formato que esta versión no aplica: la Fase A previa había agregado a la tabla de trazabilidad a casos de uso una cuarta columna con el proyecto de código destinatario, porque la composición tenía cuatro. Con un único proyecto de código esa columna dejó de discriminar, y la información se reubicó dentro de la celda del caso de uso, que es la reubicación sin pérdida que la propia Parte E declara admisible. La tabla queda en el formato estricto de tres columnas que fija la regla de la categoría.

---

## §6. Criterios de éxito, en agregado

Cuarenta y cuatro criterios de éxito, repartidos así:

| NB | Criterios | Criterios con target derivado y pendiente de confirmación |
| --- | --- | --- |
| NB-01 | 8 | 2 |
| NB-02 | 5 | 0 |
| NB-03 | 5 | 0 |
| NB-04 | 6 | 0 |
| NB-05 | 5 | 0 |
| NB-06 | 5 | 0 |
| NB-07 | 5 | 0 |
| NB-08 | 5 | 0 |
| Total | 44 | 2 |

Reglas que los cuarenta y cuatro respetan y que la categoría 08-Calidad-Y-Pruebas puede dar por sentadas:

- Ninguno usa fecha de calendario. Los plazos se expresan en meses desde el cierre de un alcance, se anclan al cierre de la etapa o de la fase que entrega la capacidad medida, o se declaran continuos. Los hitos de anclaje son los de [Roadmap-Producto.md](../00-Contexto/Roadmap-Producto.md) §2.2 y §3.
- Ninguno se mide antes de que exista la capacidad que evalúa.
- Todos llevan número y unidad, con una excepción declarada: el criterio de estabilidad de la sesión de NB-01, cuyo umbral es cualitativo por decisión y cuyo valor numérico lo fija la puerta técnica PT-01 al medir.

---

## §7. Brechas abiertas de esta categoría

Ninguna de estas brechas se resuelve acá. Se declaran con su destinatario, porque resolverlas por cuenta propia es el error que la cadena ya tuvo que corregir tres veces.

| Brecha | Dónde está declarada | Destinatario |
| --- | --- | --- |
| Las ocho necesidades provienen de la Fase A previa [FA] y no están aprobadas por el cliente | Este documento §1; las ocho declaran estado `Propuesto` | Agente humano del proyecto, en el próximo punto de control |
| Los dos targets derivados de NB-01 —cobertura del parque en el registro y autosuficiencia de la consulta— siguen pendientes de confirmación | [NB-01](Necesidades-De-Negocio/NB-01-Visibilidad-Unificada-De-La-Arquitectura.md) §5, nota 1 | Agente humano del proyecto |
| El umbral numérico de la estabilidad de la sesión lo fija PT-01 al medir, y hoy es cualitativo | [NB-01](Necesidades-De-Negocio/NB-01-Visibilidad-Unificada-De-La-Arquitectura.md) §5, nota 2 | Puerta técnica PT-01 y 08-Calidad-Y-Pruebas |
| El plazo del criterio de higiene de NB-01 y el del valor compartido de NB-04 dependen de la asignación de EP-23, EP-24 y EP-25 a una fase | [NB-01](Necesidades-De-Negocio/NB-01-Visibilidad-Unificada-De-La-Arquitectura.md) §5 nota 3; [NB-04](Necesidades-De-Negocio/NB-04-Alta-De-Servicio-Sin-Copiar-Y-Adaptar.md) §5 nota 2; Roadmap §2.6 | 07-Plan-Sprint, con decisión del agente humano del proyecto |
| Los plazos de tres criterios de NB-03 se anclan a una etapa de la Fase 3 cuyo orden todavía no está declarado | [NB-03](Necesidades-De-Negocio/NB-03-Reproducibilidad-De-La-Arquitectura.md) §5; Roadmap §2.6 | Agente humano del proyecto |
| El plazo del acotamiento de credenciales de NB-08 depende del adelanto no decidido de EP-15 a la Fase 1 | [NB-08](Necesidades-De-Negocio/NB-08-Control-De-Acceso-Y-Credenciales-De-Maquina.md) §5; Roadmap §2.6 | Agente humano del proyecto |
| La confirmación de OBJ-05, que sostiene el criterio de escala de NB-01 | [Vision-Producto.md](../00-Contexto/Vision-Producto.md) §5; [Alcance-Producto.md](../00-Contexto/Alcance-Producto.md) §6.3 | Agente humano del proyecto |
| La imprecisión del argumento de recorte de F-06, heredada del intake §23.4 | Este documento §5, nota sobre la primera fila | Agente humano del proyecto, como observación sobre el intake en el próximo punto de control. No se corrige la transcripción |
| La forma del plazo —puntual o continuo— de los 38 criterios que anclan a una etapa o a una fase por composición. El intake §23.3 declara las tres formas admisibles pero no cuál corresponde a cada criterio, de modo que la elección la emitió esta categoría | Este documento §2.2 | 08-Calidad-Y-Pruebas, que convierte los 44 criterios en verificaciones ejecutables y es quien necesita saber si un criterio se verifica una vez o de forma sostenida. Ningún valor cambia mientras tanto |

---

## Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 2.0 | 2026-07-30 | Migración normativa del conjunto 4.1 al 6.0, fase M4 corte 2, bajo `Rules-Necesidades-Negocio` 3.1, `Vocabulario-Rules` 2.1 y `Migracion-Rules` 1.0. Clasificación **regenerar contenido** por el salto major de la regla que lo gobierna; fuente de contenido: el documento de origen, archivado en `_legacy/2026-07-30/Necesidades-Negocio-v1.0.md`, más los documentos hermanos de 00-Contexto y el PRODUCT-INTAKE para los nombres de artefacto y la convención de vocabulario. Sube **major** porque la nomenclatura anterior deja de cumplir. La cabecera pasa de la etiqueta `Proyecto` a `Producto` —una etiqueta del plano de proceso sobre un valor de plano producto, que `Vocabulario-Rules` §3 prohíbe— y su trazabilidad upstream apunta al `PRODUCT-INTAKE-SelfHosted-Service` y a `Alcance-Producto.md` renombrados. **Se cierra el hallazgo H-02 del informe [Audit/M4-00-Contexto-r1.md](../Audit/M4-00-Contexto-r1.md)**: los cuatro enlaces de este documento a `Alcance-Proyecto.md` —§2, §4.1, §4.4 y §7— pasan a `Alcance-Producto.md` y resuelven en disco; el renombre se leyó de la entrada `[5.0]` del `CHANGELOG.md` del framework y no se infirió. Las cinco filas de §4.4 que nombraban el `SOLUTION-INTAKE` pasan al `PRODUCT-INTAKE`, y la tabla suma la fila de §12, que es la sección de la que esta categoría toma su convención de vocabulario. §1 declara que el glosario del dominio de `Vision-Producto.md` §9 es el glosario raíz de la cadena y que esta categoría no mantiene glosario propio, según el criterio de gobierno del glosario que `Rules-Necesidades-Negocio` 3.1 §6 incorpora. Sustitución léxica **por ocurrencia** según `Vocabulario-Rules` §9.5 y el plan §3.5, con el registro que esa regla exige: se revisaron las dos ocurrencias de la cadena `soluci`, **una** designaba el nivel superior y pasó a «producto» con su concordancia —«en toda la solución» a «en todo el producto», en §4.2— y la otra es «Resoluciones ofrecidas», criterio de NB-05 en §2.2, que se conserva intacta. De las ocurrencias de «proyecto», **ninguna pasó a «proyecto de código»** que no lo fuera ya: las de «agente humano del proyecto» son el emprendimiento y se preservan a secas, las de §1 y §5 son menciones del término y no usos, y las seis que ya decían «proyecto de código» —cinco en singular en §1, §4.2 y §5, y una en plural en §4.2— quedaron como estaban. **Ningún valor de contenido cambia**: los ocho identificadores NB, las ocho prioridades MoSCoW, los 44 criterios de éxito con sus 132 componentes, los 36 casos de uso previstos, el grafo acíclico, las siete decisiones de recorte y las nueve brechas de §7 quedan exactamente como estaban. La versión del catálogo de NB pasa a 2.0 porque las ocho necesidades suben a 2.0 por esta misma migración. El bloque de procedencia del destino no se toca: es trabajo de la fase M5 |
| 1.0 | 2026-07-29 | Adecuación al conjunto normativo 4.1, absorbida dentro de la versión 1.0 igual que las anteriores. §2.2 es nueva y emite el inventario de procedencia de los 44 criterios de éxito, componente por componente: métrica, target y plazo, 132 en total, clasificados en derivado con su sección, material [FA] de la Fase A previa, u originado en esta categoría. Resultado: 120 derivados, 12 [FA] y ninguno originado. Se verificaron contra la fuente los tres denominadores que podían estar sin respaldo —las cinco salvaguardas de aislamiento, la retención de 90 días y las ocho dimensiones del alta— y los tres resultaron declarados [E] en el intake §17.P.5, §17.P.11 DA-07 y los anexos E-19 y E-2. Lo único que esta categoría elige es la forma del plazo, puntual o continuo, dentro de las tres que el intake §23.3 admite, y queda registrado como brecha en §7 con 08-Calidad-Y-Pruebas como destinataria. Ningún valor cambia: `Rules-Necesidades-Negocio.md` sigue en 2.0 y el catálogo de ambigüedades que motiva el inventario es de la categoría 00. Origen: adecuación al conjunto normativo 4.1, que declara al Product Owner dueño de la priorización y de las exclusiones y exige que ninguna fecha objetivo ni target de métrica se origine en la cadena de especificación |
| 1.0 | 2026-07-29 | Reversión de la salvedad sobre F-18 a F-22, absorbida dentro de la versión 1.0. La revisión de ambigüedades de 00-Contexto determinó que las cinco exclusiones son derivables y no originadas: el intake §4 las declara `Won't Have v1` y su §9 trae las exclusiones correspondientes marcadas [E]. En consecuencia §2, §4.1 y §4.4 vuelven a declarar el motivo del hueco EP-18 a EP-22 como dato cerrado, con traza a esas dos secciones, en lugar de dejarlo dependiendo de una revisión aguas arriba que no está abierta; y la brecha que §7 había registrado por ese motivo se cierra y se retira. La salvedad anterior se había introducido sobre un supuesto de revisión en curso que resultó no existir |
| 1.0 | 2026-07-29 | Tres correcciones más, absorbidas dentro de la versión 1.0 igual que las anteriores. Primera: §5 suma una nota sobre la primera fila de la tabla de decisiones de recorte, que señala que su argumento heredado invoca una dependencia mutua entre NB-01 y NB-04 cuando el recorte que la fila decide es entre NB-05 y NB-01. La transcripción no se toca: es literal del intake §23.4, que es de solo lectura, y §5.2 de las reglas de la categoría pide conservar o refutar las decisiones de recorte de la Fase A, no reescribirlas. La imprecisión se eleva como observación sobre el intake en el próximo punto de control y queda registrada en §7. Origen: hallazgo H-05 del informe [Audit/A-00-01-r1.md](../Audit/A-00-01-r1.md), con la instrucción de §7 H-05 y de §9 condición 3 de ese informe. Segunda: §2, §4.1 y §4.4 dejan de afirmar como cerrado el estado de F-18 a F-22 fuera de la primera versión, que 00-Contexto tiene en revisión bajo el conjunto normativo 4.1, que retiró a esa categoría la autoridad de originar exclusiones. El hueco EP-18 a EP-22 se conserva como hecho verificable sobre el roadmap vigente y su motivo se declara dependiente de esa revisión; §7 suma la brecha con su destinatario. Esta categoría no se adelanta a lo que 00-Contexto resuelva. Tercera: §2.1 es nueva y registra la traza de las ocho prioridades MoSCoW al intake §4, capacidad por capacidad, con la regla de agregación declarada en el intake §23.4. Ningún valor cambia: el inventario se emite porque el conjunto 4.1 declara al Product Owner dueño de la priorización y conviene que quede verificable que ninguna de las ocho se originó en esta categoría |
| 1.0 | 2026-07-29 | Dos correcciones absorbidas dentro de la versión 1.0, sin subirla y sin archivar el estado anterior, por la política de versionado de `Master-Prompt.md` §5: el documento está en estado `Propuesto` y las dos provienen del audit de su propia fase de emisión. Primera: §4.4 declaraba el rango `EP-01 a EP-25`, que afirma la existencia de EP-18 a EP-22, cinco épicas que `Roadmap-Producto.md` no emite ni puede emitir, porque corresponderían a las capacidades excluidas F-18 a F-22. Se reemplaza por la enumeración real, `EP-01 a EP-17 y EP-23 a EP-25`, verificada contra las veintidós épicas que ese documento efectivamente declara, y se agrega el motivo del hueco. Origen: hallazgo H-03 del informe [Audit/A-00-01-r1.md](../Audit/A-00-01-r1.md). Segunda: el campo `Trazabilidad upstream` de la cabecera nombraba los tres documentos de 00-Contexto sin sección, mientras que §4.4 y el cuerpo citan secciones concretas de los tres; se enumeran las secciones efectivamente consumidas. Origen: hallazgo H-02 del mismo informe |
| 1.0 | 2026-07-29 | Versión inicial del catálogo, generada bajo el conjunto normativo 4.0 del Framework SDD a partir del consolidado de la Fase A previa transcripto en el intake §23 y de los documentos de 00-Contexto. Conserva los ocho identificadores NB, sus 44 criterios de éxito, sus 36 casos de uso previstos, el grafo acíclico de dependencias y las siete decisiones de recorte, sin refutar ninguna. Retira la cuarta columna de la tabla de trazabilidad a casos de uso, que la composición de un único proyecto de código dejó sin función, reubicando la capa dentro de la celda del caso de uso. Declara siete brechas abiertas con su destinatario y no resuelve ninguna |
