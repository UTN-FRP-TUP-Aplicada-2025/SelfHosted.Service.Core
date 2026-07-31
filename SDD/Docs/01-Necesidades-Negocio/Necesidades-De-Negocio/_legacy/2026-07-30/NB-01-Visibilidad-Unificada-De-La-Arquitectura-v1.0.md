# NB-01 — Visibilidad unificada de la arquitectura de un conjunto de servicios

| Campo | Valor |
| --- | --- |
| Proyecto | SelfHosted Service |
| Documento | NB-01-Visibilidad-Unificada-De-La-Arquitectura.md |
| Versión | 1.0 |
| Estado | Propuesto |
| Fecha | 2026-07-29 |
| Autor | Analista de Negocio Senior (AG-01) |
| Trazabilidad upstream | SOLUTION-INTAKE-SelfHosted-Service §1, §3, §4 (F-02, F-03, F-04, F-25), §12, §23.1, §23.3, §23.5; Vision-Producto.md §1, §3.2 (DV-02, DV-05), §5 (OBJ-05), §6; Alcance-Proyecto.md §4.1; Roadmap-Producto.md §2.3 (EP-02, EP-03, EP-04, EP-25), §2.4 (PT-01), §2.6, §3 |
| Trazabilidad downstream | CU-01, CU-02, CU-03, CU-04, CU-05, CU-36 (previstas en 02-Especificacion-Funcional) |

---

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

La arquitectura de un conjunto de servicios contenedorizados no existe hoy como objeto: vive repartida entre definiciones sueltas, variables de entorno no versionadas y el estado que el motor de contenedores efectivamente está ejecutando. Quien opera el servidor necesita un lugar único donde esa arquitectura esté declarada, se pueda mirar completa y se pueda consultar sin abrir archivos dispersos ni contrastarlos con lo que corre. Hoy la respuesta a «qué consume qué, con qué dirección y con qué puerto» se arma a mano cada vez, y su costo crece con el parque.

El dolor no es un incidente puntual sino una fricción permanente. El operador sostiene la arquitectura en su cabeza: qué servicios forman un conjunto, cuál depende de cuál, en qué orden levantan, qué dirección tiene cada uno. Cada dato que se recuerda en lugar de estar declarado es un dato que se pierde si cambia la persona, si pasa el tiempo o si el servidor se reinstala. Y como no hay declaración, no hay nada que verificar: si la configuración y lo que el motor ejecuta divergen, nada lo señala.

Resolver esta necesidad es la condición para que el resto del producto sea posible. Adoptar contenedores existentes, exportar una arquitectura, dar de alta un servicio sin copiar y adaptar, o detectar un conflicto de direcciones antes de arrancar, presuponen todos que el conjunto de servicios está declarado en algún lado. Por eso esta necesidad es prerequisito directo de cinco de las otras siete y transitivo de la restante.

## 2. Ejemplo de uso desde la perspectiva del negocio

El propietario del servidor tiene que cambiar el puerto de la base de datos que usan dos de sus servicios. Para saber a quién le afecta, abre la definición de cada servicio del conjunto, busca en cuál de ellas aparece una cadena de conexión que apunte a esa base, y compara con lo que recuerda haber configurado hace seis meses. Cuando cree haber encontrado todos, arranca y espera a ver si algo falla. Un servicio que quedó fuera de esa revisión no avisa: simplemente deja de conectar cuando alguien lo usa, días después.

Lo que el propietario querría es entrar a un lugar donde el conjunto entero esté dibujado, ver las flechas que salen de la base hacia los dos servicios que la consumen, y saber que esas flechas son la declaración del vínculo y no una coincidencia entre cadenas de texto que él escribió dos veces.

## 3. Impacto

- La arquitectura pasa de ser conocimiento personal a ser un objeto declarado, consultable y verificable, y deja de depender de la memoria de una sola persona.
- Toda operación posterior del producto —adopción, exportación, alta de servicio, arranque ordenado, atribución de consumo— obtiene el sustrato sobre el que trabajar; sin esta necesidad resuelta, ninguna de ellas tiene sobre qué operar.
- La divergencia entre lo declarado y lo que el motor ejecuta deja de ser invisible y pasa a poder señalarse.
- Si la necesidad queda sin resolver, el parque sigue creciendo sin registro común y cada consulta sobre la arquitectura sigue costando lo mismo que hoy, multiplicado por el tamaño del parque.
- La disposición con la que el operador lee su arquitectura queda registrada, de modo que la lectura visual del conjunto es reproducible y no se rehace en cada sesión.
- El renombrado de un elemento deja de ser una operación de riesgo que obliga a corregir a mano todo lo que lo nombraba.

## 4. Problema específico que resuelve

- No existe inventario de qué conjuntos de servicios hay ni de qué se compone cada uno.
- La dependencia entre dos servicios no está declarada y se infiere leyendo variables de archivos separados.
- La configuración declarada y lo que el motor de contenedores ejecuta pueden divergir sin que nada lo señale.
- La disposición mental que el operador tiene de su arquitectura no está registrada en ningún lado.
- Mirando el dibujo del conjunto no se puede anticipar en qué orden va a levantar.
- Los datos que sí están anotados viven fuera de todo sistema y no sobreviven a una reinstalación.
- Renombrar cualquier elemento obliga a corregir a mano todo lo que lo nombraba, y lo que se pasa por alto se rompe en silencio.
- El registro acumula restos con el uso —variables compartidas huérfanas, nombres repetidos, referencias sin uso— sin que nada lo señale.

## 5. Criterios de éxito

Ningún criterio usa fecha de calendario. Los plazos se expresan en meses desde el cierre de un alcance o se anclan al cierre de la etapa que entrega la capacidad medida, según la convención declarada en el intake §23.3 y la secuencia de etapas de [Roadmap-Producto.md](../../00-Contexto/Roadmap-Producto.md) §3. Ningún criterio se mide antes de que exista la capacidad que evalúa.

| Criterio | Métrica | Target | Plazo |
| --- | --- | --- | --- |
| Cobertura del parque en el registro | Conjuntos de servicios del parque de referencia representados como proyecto SelfHosted, sobre el total relevado | 5 de 5 conjuntos | 3 meses desde el cierre del Alcance 1 |
| Autosuficiencia de la consulta de dependencias | Archivos externos que hay que abrir para responder qué servicio consume a cuál | 0 archivos | Cierre de la etapa `03`, que entrega el lienzo (EP-04) |
| Escala legible sin degradación | Nodos y aristas por lienzo sostenidos sin retraso perceptible entre el evento de puntero y la actualización visual | 30 nodos y 40 aristas | Medición de la puerta técnica PT-01, antes de comprometer el corte del lienzo |
| Conservación de la disposición | Proyectos SelfHosted que conservan la disposición de su lienzo tras recargar la pantalla | 100 % de los proyectos SelfHosted | Cierre de la etapa `03` |
| Estabilidad de la sesión | Memoria del canal entre navegador y servidor tras 15 minutos de uso continuo | Consumo estable, sin crecimiento sostenido; el valor numérico del umbral lo fija PT-01 al medir | Medición de la puerta técnica PT-01 |
| Previsibilidad del arranque leyendo el lienzo | Dependencias dibujadas cuya clase —si obliga o no a esperar al destino— es distinguible sin abrir ninguna configuración | 100 % de las dependencias | Cierre de la etapa `03` |
| Integridad ante un renombrado | Relaciones declaradas que siguen válidas tras renombrar cualquier elemento al que apunten | 100 % de las relaciones | Cierre de la etapa `03` |
| Señalamiento de la degradación del registro | Condiciones de higiene advertidas, y operaciones bloqueadas por esa advertencia | 5 de 5 condiciones advertidas y 0 operaciones bloqueadas | Cierre de la etapa que absorba EP-25, hoy sin fase asignada |

Tres precisiones sobre estos ocho criterios, que se declaran en lugar de resolverse:

1. Los targets del primer y del segundo criterio son derivaciones de la Fase A previa [FA] pendientes de confirmación del agente humano del proyecto, y así los registra el intake §23.3. El denominador de cinco conjuntos está verificado; el target de cobertura total, 5 de 5, no proviene de ninguna métrica declarada —la única métrica sobre el parque es la de adopción, fijada sobre contenedores y no sobre conjuntos, y vive en NB-02—. El target de 0 archivos externos se deriva del dolor que el intake §1 declara, y se conserva porque mide el producto y no la documentación. Ninguno de los dos se consume como objetivo cerrado del cliente.
2. El umbral del criterio de estabilidad de la sesión es cualitativo por decisión: es el umbral que el intake declara para PT-01, y es la propia puerta técnica la que fija el número al medir. La ventana de 15 minutos sí es dato numérico declarado.
3. El plazo del octavo criterio depende de una brecha abierta que este documento no resuelve: la asignación de EP-25 a una fase y a un corte vertical está declarada como pendiente en [Roadmap-Producto.md](../../00-Contexto/Roadmap-Producto.md) §2.6, con el agente humano del proyecto y la categoría 07-Plan-Sprint como destinatarios.

## 6. Stakeholders involucrados

| Rol | Nivel | Qué pide o aporta |
| --- | --- | --- |
| Agente humano del proyecto | Propietario | Revisa y aprueba la necesidad, y da el OK explícito de cada punto de control que la entrega |
| Analista de Negocio Senior (AG-01) | Propietario del contenido | Mantiene la necesidad, sus criterios y su trazabilidad, y declara las brechas en lugar de resolverlas |
| Equipo de desarrollo, dos desarrolladores | Implementador | Construye el registro, el lienzo y la persistencia de la disposición, y escribe las pruebas de las reglas que introduce |
| Agente IA de codificación | Implementador | Genera la especificación y, en etapas posteriores, el código de cada corte vertical |
| Usuario final: administrador de la solución | Beneficiario | Valida que la arquitectura se lea completa en una pantalla y que la consulta no exija abrir archivos externos |
| Product Manager (AG-00) | Consultado | Verifica la alineación con la visión y con el alcance declarados |
| Analista Funcional (AG-02) | Consultado | Desarrolla los casos de uso que esta necesidad declara previstos |

## 7. Trazabilidad a CU

| NB | CU prevista | Estado |
| --- | --- | --- |
| NB-01 | CU-01 alta de proyecto SelfHosted con su modo de red y su persistencia (capa de presentación) | a generar |
| NB-01 | CU-02 listado, renombrado y eliminación de proyectos SelfHosted (capa de presentación) | a generar |
| NB-01 | CU-03 alta y configuración completa de un servicio (capa de presentación) | a generar |
| NB-01 | CU-04 composición del lienzo (capa de presentación) | a generar |
| NB-01 | CU-05 persistencia y recuperación de la disposición (capa de presentación) | a generar |
| NB-01 | CU-36 revisión de higiene del registro (capa de presentación) | a generar |

Los identificadores CU son únicos en toda la solución y no se reutilizan. La categoría 02-Especificacion-Funcional puede desdoblar o reagrupar estas seis CU siempre que conserve la trazabilidad a esta necesidad y no reasigne un identificador ya emitido.

## 8. Dependencias con otras NB

- Depende de: NB-08. Sin control de acceso, el registro de la arquitectura queda accesible sin credencial en un panel que gobierna el equipo entero.
- Es prerequisito de: NB-02, NB-03, NB-04, NB-05 y NB-07 de forma directa, y de NB-06 por transitividad a través de NB-04 y NB-05.

## 9. Prioridad MoSCoW

Must Have. Es el dolor central que el intake §1 declara y el sustrato sobre el que operan seis de las otras siete necesidades: sin ella no hay producto defendible.

## 10. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 1.0 | 2026-07-29 | Corrección absorbida dentro de la versión 1.0, sin subirla y sin archivar el estado anterior, por la política de versionado de `Master-Prompt.md` §5: el documento está en estado `Propuesto` y la corrección proviene del audit de su propia fase de emisión. Se completa el campo `Trazabilidad upstream` de la cabecera con las secciones que el cuerpo cita y que faltaban: `Roadmap-Producto.md` §2.4, que declara la puerta técnica PT-01 a la que ancla el tercer criterio; §2.6, que el §5 nota 3 cita como origen de la brecha del octavo criterio; §3, que el §5 cita como origen de los hitos de anclaje; y `Vision-Producto.md` §6, de donde proviene el umbral de escala. Origen: hallazgo H-02 del informe [Audit/A-00-01-r1.md](../../Audit/A-00-01-r1.md). El hallazgo H-04 del mismo informe, sobre el target no numérico del criterio de estabilidad de la sesión, no produce cambio: el umbral es cualitativo en la fuente y lo fija PT-01 al medir, y el propio informe lo declara sin acción sobre el entregable |
| 1.0 | 2026-07-29 | Versión inicial, generada bajo el conjunto normativo 4.0 del Framework SDD a partir del consolidado de la Fase A previa transcripto en el intake §23, y de los documentos de 00-Contexto. Conserva el identificador NB-01 y sus ocho criterios de éxito. Declara como brecha los dos targets derivados pendientes de confirmación, el umbral que fija PT-01 al medir y el plazo dependiente de la asignación de EP-25 |
