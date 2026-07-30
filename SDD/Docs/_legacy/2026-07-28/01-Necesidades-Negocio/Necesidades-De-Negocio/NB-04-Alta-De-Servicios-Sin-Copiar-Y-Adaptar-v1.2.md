# NB-04 — El alta de un servicio deja de ser un ejercicio de copiar y adaptar

| Campo | Valor |
|---|---|
| Proyecto | SelfHosted.Service.Core (solución; proyecto de código principal `SelfHosted-Web`) |
| Documento | NB-04-Alta-De-Servicios-Sin-Copiar-Y-Adaptar-v1.2.md |
| Versión | 1.2 |
| Estado | Propuesto |
| Fecha | 2026-07-28 |
| Autor | Analista de Negocio Senior (AG-01) |
| Trazabilidad upstream | SOLUTION-INTAKE §1, §3, §4 (F-05, F-10, F-14, F-23, F-24) con sus notas de las decisiones D-5, D-6 y D-7 del 2026-07-28, §5 (historias 2 y 4), §6 (flujo 1), §8, §12, anexos E-2, E-4, E-6, E-19; `Vision-Producto-v1.1.md` §3.1, §5 (OBJ-02); `Alcance-Proyecto-v1.1.md` §4.1 |
| Trazabilidad downstream | CU-13 a CU-17 (previstas en 02-Especificacion-Funcional); 06-Backlog-Tecnico; 07-Plan-Sprint; 08-Calidad-Y-Pruebas |

## Tabla de contenido

- [1. Descripción de la necesidad](#1-descripción-de-la-necesidad)
- [2. Ejemplo de uso desde la perspectiva del negocio](#2-ejemplo-de-uso-desde-la-perspectiva-del-negocio)
- [3. Impacto](#3-impacto)
- [4. Problema específico que resuelve](#4-problema-específico-que-resuelve)
- [5. Criterios de éxito](#5-criterios-de-éxito)
- [6. Stakeholders involucrados](#6-stakeholders-involucrados)
- [7. Trazabilidad a CU](#7-trazabilidad-a-cu)
- [8. Dependencias con otras NB](#8-dependencias-con-otras-nb)
- [9. Prioridad MoSCoW](#9-prioridad-moscow)
- [10. Control de cambios](#10-control-de-cambios)

---

## 1. Descripción de la necesidad

Cada alta de un servicio nuevo en el servidor de referencia es un ejercicio manual de copiar y adaptar. Se toma la configuración del servicio más parecido que ya está corriendo, se cambian los valores que hace falta cambiar y se levanta a mano. El método no falla de a una vez: falla acumulándose. Cada copia arrastra decisiones que ya no aplican, cada adaptación introduce una diferencia que nadie registró, y el conjunto de servicios termina siendo una colección de variantes de un mismo original que ya nadie recuerda.

El costo tiene dos partes. La primera es el tiempo del alta en sí, que crece con la cantidad de dimensiones que el parque real exige declarar: no alcanza con imagen, puertos y variables, porque los servicios reales usan montajes de directorio, dispositivos del equipo, capacidades adicionales, límites de recursos, políticas de reinicio, versiones fijadas de imagen y marcas de servicio efímero. La segunda parte es el trabajo de llevar esa configuración a un contenedor corriendo, que hoy es un paso separado y manual, distinto según la imagen venga de un registro público o haya que construirla.

Hay un tercer costo, del mismo origen y menos visible: el valor que varios servicios comparten. Una credencial de base de datos que usan la aplicación, el proceso de informes y la herramienta de respaldo se escribe hoy tres veces y hay que mantenerla sincronizada a mano en las tres. Cambiarla es tocar tres lugares y descubrir el que se olvidó cuando algo deja de conectar. Es el mismo dolor de copiar y adaptar, aplicado a un dato en lugar de a una configuración entera.

El negocio necesita que dar de alta un servicio sea una operación de la solución y no un procedimiento de copia. Eso supone cuatro cosas: que la configuración se declare completa en un solo lugar; que exista una vía de alta que parta de una plantilla ya armada, con sus huecos a completar, y no de la copia de un servicio vecino; que un valor compartido se declare una sola vez en el proyecto SelfHosted y los servicios lo tomen de ahí en lugar de repetirlo; y que el paso de la configuración declarada al contenedor corriendo sea derivado de lo declarado, cualquiera sea el origen de la imagen.

Sobre la plantilla conviene una precisión, porque el nombre engaña: nada de lo que vive en el catálogo está corriendo. Sus ítems son definiciones en reposo, sin contenedor, sin dirección y sin presencia en ningún lienzo hasta que alguien los instancia. El catálogo tampoco viene con contenido: arranca vacío y se puebla con lo que el propietario decida guardar o importar. Y un ítem puede traer más de un servicio con las dependencias entre ellos, de modo que instanciarlo levanta un conjunto y no una pieza suelta.

## 2. Ejemplo de uso desde la perspectiva del negocio

El propietario necesita una base de datos más para un conjunto de servicios nuevo. Ya tiene tres corriendo en el servidor, todas configuradas de manera ligeramente distinta porque cada una se copió de la anterior en un momento distinto. Hoy elegiría la más reciente, copiaría su configuración, cambiaría el nombre, el directorio de datos y la contraseña, y descubriría dos días después que arrastró un límite de memoria que ya no correspondía.

Con la necesidad resuelta, la primera vez tiene que armar la base a mano, porque su catálogo está vacío: lo llena él, no viene con contenido. Cuando la termina la guarda como plantilla, declarando qué valores quedan como huecos a completar. La segunda vez que necesita una base, la agrega desde esa plantilla: completa los tres o cuatro huecos y el servicio queda declarado con todas las dimensiones que su parque exige, sin abrir la configuración de ningún otro servicio.

Después agrega la aplicación que la va a usar, que esta vez no viene de un registro público sino de su propio repositorio, y la solución la construye siguiendo el progreso a la vista. La contraseña de la base la declara una sola vez, a nivel del proyecto SelfHosted, y tanto la base como la aplicación la toman de ahí: el día que la rote, la cambia en un lugar y el sistema le dice qué servicios quedan por reemplazar. Con el tiempo guarda como plantilla el conjunto entero —base más aplicación, con la dependencia entre ellas—, y el alta del siguiente proyecto SelfHosted parecido pasa a ser una sola operación.

## 3. Impacto

- El alta de un servicio deja de ser una operación de riesgo por copia y pasa a ser una operación declarativa, con las mismas dimensiones para todos los servicios del parque.
- Los casos frecuentes dejan de reescribirse: el catálogo convierte la experiencia acumulada del propietario en un activo reutilizable y exportable, que puede abarcar un conjunto de servicios con sus dependencias y no sólo una pieza.
- Un valor compartido pasa a tener un solo lugar donde vive, con lo que rotarlo deja de ser una operación de búsqueda y reemplazo sobre servicios que hay que recordar.
- El paso de la configuración al contenedor corriendo deja de ser un procedimiento aparte, con lo que desaparece la brecha entre lo declarado y lo desplegado en el momento del alta.
- Si la necesidad no se resuelve, el registro de arquitectura existe pero nadie lo alimenta: el operador sigue trabajando con el método manual y el registro queda desactualizado desde el primer servicio nuevo.
- El servicio construido desde una definición propia o desde un repositorio deja de exigir un ciclo de construcción manual fuera de la solución.

## 4. Problema específico que resuelve

- Cada alta parte de la configuración de otro servicio, y arrastra decisiones que ya no corresponden.
- Las dimensiones que el parque real exige declarar no están en ningún formulario único, y se recuerdan de memoria servicio por servicio.
- No existe una forma de reutilizar la configuración de un servicio frecuente, ni la de un conjunto de servicios que suelen ir juntos, sin copiarla y editarla.
- Un valor que comparten varios servicios se escribe una vez por servicio y se mantiene sincronizado a mano; nada avisa cuando una de las copias quedó vieja.
- Llevar la configuración declarada a un contenedor corriendo es hoy un paso manual y distinto según el origen de la imagen.
- La construcción de una imagen propia ocurre fuera del alcance de cualquier registro, y su progreso y su resultado no quedan a la vista.

## 5. Criterios de éxito

| Criterio | Métrica | Target | Plazo |
|---|---|---|---|
| Reemplazo del método manual | Altas de servicio nuevas realizadas desde la solución, sobre el total de altas nuevas | ≥ 90 % de las altas nuevas | 6 meses desde el cierre de la Fase 1 |
| Cobertura de las dimensiones del alta | Dimensiones de configuración que el parque real exige y que el alta permite declarar: etiqueta de imagen explícita con política de actualización, montajes, dispositivos, capacidades, límites de procesamiento y memoria, política de reinicio, modo de red con dirección y marca de efímero | 8 de 8 dimensiones | Al cierre de la etapa de servicios del proyecto |
| Vías de alta soportadas | Vías por las que se puede dar de alta un servicio sin salir de la solución: imagen de registro público, definición local, repositorio remoto y plantilla del catálogo | 4 de 4 vías | La cuarta, al cierre de la fase que entregue el catálogo; las tres primeras, al cierre de la Fase 1 |
| Autosuficiencia de la instanciación de una plantilla | Datos que el administrador debe aportar al instanciar un ítem del catálogo además de los huecos que la propia plantilla declara como parámetros | 0 datos adicionales, y 0 archivos de configuración redactados a mano | Al cierre de la fase que entregue el catálogo |
| Fidelidad del conjunto instanciado | Servicios y dependencias creados al instanciar un ítem que contiene varios servicios, sobre los declarados en la plantilla | 100 % de los servicios y de sus dependencias, en una sola operación | Al cierre de la fase que entregue el catálogo |
| Valor compartido declarado una sola vez | Copias de un mismo valor que hay que mantener sincronizadas a mano entre servicios de un proyecto SelfHosted | 0 copias | Al cierre de la etapa que incorpore las variables compartidas del proyecto |

Filas derivadas. Ninguna fila de esta tabla está derivada, y es un cambio respecto de la versión 1.0. Los dos criterios que medían el catálogo por adopción —un porcentaje de altas resueltas desde él y un tiempo de alta— se retiraron el 2026-07-28: el agente humano del proyecto observó que el catálogo arranca vacío y que el usuario lo puebla o no, de modo que un porcentaje de adopción no es medible sobre una colección que puede quedar sin contenido. Los reemplazan tres criterios verificables desde el día uno de la capacidad: que instanciar no exija más que completar los huecos que la plantilla declara, que el conjunto instanciado se cree entero, y que un valor compartido se declare una sola vez.

El resto toma su número de fuentes declaradas: la primera fila es la métrica de reemplazo del método manual de SOLUTION-INTAKE §8; la segunda, las ocho dimensiones que el inventario del parque exige; la tercera, las tres variantes de origen del anexo de servicio más el catálogo como cuarta vía de alta, declarado así por la decisión D-7; la cuarta y la quinta, la forma del ítem del catálogo y su regla de instanciación; y la sexta, la declaración del intake de que mantener un valor sincronizado a mano en cada servicio es exactamente lo que las variables compartidas vienen a eliminar. Esa última afirmación es una declaración explícita de propósito, no una inferencia de este catálogo, y por eso el target 0 no se marca como derivación.

Nota sobre los plazos. Los tres criterios que miden el catálogo se anclan al cierre de la fase que lo entregue, sin nombrarla: el reparto de capacidades entre las fases 2 y 3 sigue pendiente de confirmación. El criterio del valor compartido se ancla a la etapa que incorpore las variables compartidas, cuya ubicación en el roadmap el intake declara expresamente pendiente de asignación. Ningún criterio se mide antes de que exista la capacidad que evalúa.

## 6. Stakeholders involucrados

| Rol | Nivel | Qué pide o aporta |
|---|---|---|
| Propietario del servidor y administrador único | Propietario | Aporta los casos frecuentes que el catálogo debe cubrir y decide qué configuración considera reutilizable |
| Agente humano del proyecto | Propietario | Valida en el punto de control que un servicio frecuente se da de alta sin copiar configuración de otro |
| Equipo de desarrollo de dos personas | Implementador | Construye el alta completa del servicio, el catálogo parametrizable y el despliegue desde los tres orígenes de imagen |
| Agente de IA de codificación | Implementador | Especifica y genera los cortes verticales de despliegue desde imagen pública, construcción de imagen y catálogo |
| Usuario final: administrador de la solución | Beneficiario | Valida que el alta cubre lo que su parque real necesita y que no queda nada por completar fuera de la solución |

## 7. Trazabilidad a CU

| NB | CU prevista | Proyecto de código | Estado |
|---|---|---|---|
| NB-04 | CU-13 despliegue de un servicio desde imagen de registro público, con estado real reflejado en el nodo | SelfHosted-Web | a generar |
| NB-04 | CU-14 consulta del registro de un contenedor desplegado | SelfHosted-Web | a generar |
| NB-04 | CU-15 despliegue construyendo la imagen desde una definición local o un repositorio remoto, con seguimiento del progreso | SelfHosted-Web | a generar |
| NB-04 | CU-16 alta a partir de una plantilla del catálogo, completando sus parámetros, con creación del conjunto completo de servicios y dependencias que la plantilla declara | SelfHosted-Web | a generar |
| NB-04 | CU-17 mantenimiento del catálogo de plantillas: alta desde un servicio o un conjunto existente, edición, exportación e importación | SelfHosted-Web | a generar |
| NB-04 | CU-34 declaración y mantenimiento de las variables compartidas de un proyecto SelfHosted, incluidas las secretas | SelfHosted-Web | a generar |
| NB-04 | CU-35 expresión del valor de una variable como referencia a otra variable del propio servicio, compartida del proyecto SelfHosted o de otro servicio del mismo proyecto | SelfHosted-Web | a generar |

Extensión declarada de la tabla estándar. La columna `Proyecto de código` se agrega a las tres columnas que fija la Tabla C de `Rules-Necesidades-Negocio.md` §4.4, porque los casos de uso se generan por proyecto de código y esta solución se compone de cuatro. No reemplaza ninguna columna de la tabla estándar. La justificación única de la extensión está en el índice maestro §4.2.

## 8. Dependencias con otras NB

- Depende de: NB-01, porque el servicio que se despliega o que se crea desde el catálogo es el que el registro declara dentro de un proyecto SelfHosted.
- Es prerequisito de: NB-03, NB-05, NB-06 y NB-07. La reproducibilidad debe describir el origen de la imagen; el arranque y los conflictos operan sobre servicios desplegables; el changeset necesita saber qué está desplegado para calcular su impacto; y el tablero observa contenedores que esta necesidad crea.

## 9. Prioridad MoSCoW

Must Have. Agrupa F-05 y F-10, ambas Must Have, junto con F-14, F-23 y F-24, las tres Should Have, y toma la más alta: sin llevar la configuración declarada a un contenedor corriendo el registro no tiene quién lo alimente, mientras que el catálogo, las variables compartidas y las referencias entre variables son las partes que reducen el costo repetido y pueden llegar después.

## 10. Control de cambios

| Versión | Fecha | Cambios | Autor |
|---|---|---|---|
| 1.0 | 2026-07-27 | Versión inicial. Cinco criterios de éxito, dos de ellos derivados y marcados `[D]`, y cinco casos de uso previstos sobre SelfHosted-Web | Analista de Negocio Senior (AG-01) |
| 1.0 | 2026-07-27 | Correcciones del audit A-01-Necesidades-Negocio-v1.0, dentro del mismo ciclo de emisión y sin incremento de versión. P1-01: anclas de la tabla de contenido reemitidas conservando tildes. P1-04: el plazo del quinto criterio se reancla al cierre de la Fase 3, que es la que entrega el catálogo que ese criterio mide, y se agrega la nota que declara el anclaje de las cinco filas. P2-01: se declara la extensión de la Tabla C con la columna `Proyecto`. P2-04: los plazos pasan a expresarse en fases del roadmap | Analista de Negocio Senior (AG-01) |
| 1.1 | 2026-07-28 | Propagación del SOLUTION-INTAKE v1.2, que es la necesidad más alcanzada por las decisiones del 2026-07-28, y respuesta del agente humano del proyecto sobre dos criterios derivados. Por D-7 el catálogo deja de ser una colección de servicios reutilizables y pasa a ser una cuarta vía de alta cuyos ítems son plantillas en reposo, arrancan vacías en una instalación nueva y pueden contener un conjunto de servicios con sus dependencias: se reescriben §1, §2, §3 y §4 sobre esa naturaleza. Por D-5 y D-6 la necesidad incorpora las capacidades F-23 y F-24, porque el dolor que resuelven —un valor compartido que hay que escribir y sincronizar servicio por servicio— es el mismo dolor de copiar y adaptar aplicado a un dato. Los dos criterios derivados se retiran por observación del agente humano: un porcentaje de adopción no es medible sobre un catálogo que puede quedar vacío. Los reemplazan tres criterios verificables desde el día uno de la capacidad. La tabla pasa de cinco a seis criterios y de dos derivaciones a ninguna, y se agregan los casos de uso CU-34 y CU-35 | Analista de Negocio Senior (AG-01) |
| 1.2 | 2026-07-28 | Propagación de la cuarta pasada sobre el intake, que es de terminología: el agente humano del proyecto resolvió el doble sentido de la palabra «proyecto» separando el término de producto del de la composición. Ninguna regla, flujo ni decisión cambia. Se aplica la forma completa «proyecto SelfHosted» en la primera mención de cada sección, en las definiciones y donde el otro sentido está cerca, y se conserva la forma corta donde el contexto ya lo fija. Del lado del sentido de composición la aplicación es exhaustiva: la columna de la tabla de trazabilidad a casos de uso pasa a llamarse `Proyecto de código` y el valor del campo `Proyecto` de la cabecera deja de contener la construcción prohibida que fusionaba los dos términos. | Analista de Negocio Senior (AG-01) |
