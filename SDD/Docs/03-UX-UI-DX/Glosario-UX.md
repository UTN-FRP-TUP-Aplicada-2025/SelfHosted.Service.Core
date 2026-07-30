# Glosario UX — SelfHosted Service

**Proyecto:** SelfHosted Service
**Documento:** Glosario-UX.md
**Versión:** 1.0
**Estado:** Propuesto
**Fecha:** 2026-07-29
**Autor:** UX/UI Designer + Frontend Lead (AG-03)
**Variante:** UX/UI

---

## Tabla de contenido

- [§1. Qué contiene este glosario y qué no](#1-qué-contiene-este-glosario-y-qué-no)
- [§2. Términos de superficie y de composición](#2-términos-de-superficie-y-de-composición)
- [§3. Términos de estado y de feedback](#3-términos-de-estado-y-de-feedback)
- [§4. Términos de las capacidades transversales](#4-términos-de-las-capacidades-transversales)
- [§5. Términos del dominio que esta categoría reusa sin redefinir](#5-términos-del-dominio-que-esta-categoría-reusa-sin-redefinir)
- [§6. Vocabulario de microcopy: elecciones fijadas](#6-vocabulario-de-microcopy-elecciones-fijadas)
- [§7. Control de cambios](#7-control-de-cambios)

---

## §1. Qué contiene este glosario y qué no

Contiene los términos que aparecen en **más de un artefacto** de esta categoría y que no están ya definidos aguas arriba. Su función es que un revisor de `05-Arquitectura-Tecnica`, `06-Backlog-Tecnico` o `08-Calidad-Y-Pruebas` lea los wireframes sin tener que reconstruir el vocabulario.

**No duplica el glosario del dominio.** El intake §12 y `Vision-Producto.md` §9 fijan el vocabulario del dominio del cliente —proyecto SelfHosted, servicio, despliegue, arista, conjunto de cambios pendientes, incorporación, huérfano, referencia de variable, catálogo, credencial de máquina—, y esta categoría lo usa tal cual. Los términos de esa lista que aparecen acá, en §5, se **referencian y no se redefinen**, y su entrada declara únicamente qué consecuencia tienen sobre la interfaz.

**No define tokens visuales.** Los valores de color, tipografía, espaciado y radio son del catálogo de diseño y esta categoría los hereda, según la prohibición de `Rules-UX-UI-DX.md` §4.4.

---

## §2. Términos de superficie y de composición

| Término | Definición | Dónde se usa |
| --- | --- | --- |
| **Superficie** | Unidad de especificación de esta categoría: una pantalla, un modal con flujo propio, o un panel con estados independientes. Cada superficie tiene un archivo de wireframe, un nombre canónico y un identificador `SUP-XX` | Todos los wireframes |
| **Nombre canónico de la superficie** | El nombre estable con el que la superficie se identifica en toda la cadena. Es el que va a llevar el archivo de la maqueta de la Fase B2 y el que la línea de base visual va a registrar. No cambia entre versiones del wireframe | §1 de cada wireframe |
| **Representación** | Elemento visual o estructural reutilizado por varias superficies, especificado una sola vez para que ninguna lo reinterprete | `Representaciones/` |
| **Shell de acceso** | Composición sin barra lateral, sin barra superior y sin navegación de módulos, sobre el lienzo vacío. Es el shell de las superficies que se recorren sin sesión, y también el del primer arranque | Aprovisionamiento inicial, Acceso al panel |
| **Shell de trabajo** | Composición completa: navegación de módulos, barra superior con la barra de identidad y área de contenido. Es el shell de todas las superficies que exigen sesión | Las catorce superficies restantes |
| **Shell partido** | La propiedad de que el sistema tenga dos shells y de que la frontera entre ellos sea la sesión. La transición entre shells es una **navegación completa** y no un cambio de estado: el cambio de shell es la señal visual de que la sesión cambió | `Experiencia-De-Uso.md` §4.1 |
| **Barra de identidad** | Componente de la barra superior del shell de trabajo: la identidad activa como texto, más las acciones de cambio de contraseña y de cierre de sesión, las dos con ícono y etiqueta textual. No se colapsa a sólo ícono en escritorio ni se esconde tras un menú de dos niveles | Todas las superficies del shell de trabajo |
| **Banner de cambios pendientes** | Banda fija en la parte superior del lienzo, con el contador de cambios acumulados, el acceso al detalle y la acción de aplicar. Sólo aparece si hay cambios pendientes | Lienzo del proyecto |
| **Cajón** | Contenedor superpuesto anclado a un costado, con flujo propio. Distinto del panel contextual, que es parte de la composición y no se superpone | Cajón de cambios pendientes |
| **Panel contextual** | Zona derecha del lienzo que cambia de contenido según haya o no un nodo seleccionado: actividad cuando no hay selección, configuración del servicio cuando la hay | Lienzo del proyecto, Panel lateral del servicio |
| **Tarjeta de acceso** | Patrón del catálogo base: ícono en contenedor, título, descripción de una a dos líneas, y toda la tarjeta como área clicleable | Listado de proyectos, Catálogo de plantillas, orientación posterior |
| **Orientación posterior** | Grilla de tarjetas de acceso, una por paso recomendado, que aparece en la superficie de destino del aprovisionamiento. **Orienta y no bloquea**: no es un asistente obligatorio ni una lista de tareas con progreso | Listado de proyectos, estado vacío de primer uso |
| **Vista de un solo uso** | Superficie que muestra un valor que no va a volver a estar disponible, con acción de copiado y aviso explícito. En este producto hay exactamente una: la del valor de una credencial de máquina recién emitida | Configuración del sistema |
| **Acción primaria** | La única acción destacada de una pantalla. El catálogo y el anexo E-18 coinciden: **un único botón primario por pantalla** | Todos los wireframes |
| **Divulgación progresiva** | Patrón por el que las opciones comunes quedan visibles y las avanzadas viven en un expansor colapsado por defecto. La pertenencia a común o avanzado es propiedad del descriptor, no una decisión visual por pantalla | Panel lateral del servicio, Configuración del sistema |

---

## §3. Términos de estado y de feedback

| Término | Definición | Dónde se usa |
| --- | --- | --- |
| **Par de estado** | Unidad mínima con la que se comunica una situación: insignia vectorial, etiqueta textual y tratamiento de borde, siempre los tres juntos. El color acompaña; nunca porta solo | `Representacion-Lenguaje-Visual-De-Estados.md` |
| **Estado agregado** | Estado de un proyecto SelfHosted, **derivado** de los estados de sus despliegues por contenedor. No es un estado propio de la operación | Listado de proyectos, Tablero de estado |
| **Precedencia de la marca de pendiente** | Regla por la que la variante «pendiente de aplicar» prevalece sobre el estado del despliegue subyacente. Lo que el administrador necesita saber en el lienzo es que lo que ve no es lo que corre | `Representacion-Nodo-De-Servicio.md` |
| **Banda de resultado** | Componente de las superficies de identidad que comunica el desenlace de un acto. Su texto **no se compone en la vista**: se resuelve desde el catálogo de códigos | `Representacion-Banda-De-Resultado.md` |
| **Catálogo de códigos de resultado** | Lista de resultados con código estable y texto único, que las superficies de identidad consultan en lugar de redactar. Vive en `Experiencia-De-Uso.md` §8.2 | Las tres superficies de identidad |
| **Rechazo indiferenciado** | Forma obligatoria del rechazo de credenciales: no se dice qué parte falló. Distinguirlo confirmaría la existencia de la identidad a quien no debería saberlo | Acceso al panel |
| **Requisito declarado** | Texto de apoyo bajo un campo con restricciones, que enuncia la regla completa en positivo **antes** del intento. Su contenido se deriva de la política del sistema y no se transcribe como literal en la vista | Aprovisionamiento inicial, Cambio de contraseña |
| **Aviso de higiene** | Información sobre una condición del registro que **nunca bloquea**. Se anuncia como región de estado, no como alerta | Revisión de higiene, Catálogo de plantillas, Variables compartidas |
| **Estado vacío de primer uso** | Estado vacío que corresponde a una situación normal de una instalación nueva y no a una anomalía. En este producto hay dos: el listado de proyectos sin proyectos y el catálogo vacío | Listado de proyectos, Catálogo de plantillas |
| **Estado vacío por filtro** | Estado vacío producido por una búsqueda sin resultados. Es **distinto** del anterior y su acción siguiente también: limpiar el filtro, no crear algo | Listado de proyectos, Descubrimiento, Catálogo, Variables compartidas |
| **Resultado por contenedor** | Forma en que se informa el desenlace de una operación que despliega más de un contenedor: el estado de cada uno por separado, más los servicios que no se alcanzaron y su motivo. **La operación no tiene estado propio** | Cajón de cambios pendientes, Lienzo del proyecto |
| **Interfaz optimista** | Práctica de reflejar el resultado de una acción antes de que el servidor lo confirme. En este producto se aplica **sólo a los cambios visuales del lienzo**, que son reversibles, y **a ninguna operación de despliegue** | `Experiencia-De-Uso.md` §7 |

---

## §4. Términos de las capacidades transversales

| Término | Definición | Fuente normativa |
| --- | --- | --- |
| **Predicado de aprovisionamiento** | Único booleano que responde si el sistema está aprovisionado. Todas las superficies lo consultan; ninguna lo infiere | `Design-Rules-Primer-Arranque.md` §1 y §2 |
| **Artefacto mínimo** | Lo indispensable para que el sistema sea operable por una persona. En este producto, la identidad del administrador único | `Design-Rules-Primer-Arranque.md` §2 |
| **Destino al completar** | Ruta a la que aterriza el administrador al terminar el aprovisionamiento. Se declara explícitamente: dejarlo implícito en la portada es una decisión no tomada | `Design-Rules-Primer-Arranque.md` §2 |
| **Corte en tres capas** | Redundancia deliberada del guard de primer arranque: ruteo, superficie y acción, los tres contra el mismo predicado y con redirección neutra | `Design-Rules-Primer-Arranque.md` §3 |
| **Descriptor de parámetro** | Contrato único de un parámetro configurable, que es su fuente de verdad: etiqueta, leyenda, tipo, unidad, valor por defecto, límites o conjunto admitido, ejemplos y condición de visibilidad. **La pantalla lo lee; no lo inventa** | `Design-Rules-Config-Esquema.md` §2 |
| **Frontera aplicación / entorno** | Separación entre lo que el administrador gobierna desde el sistema y lo que se fija al desplegar la instancia. Lo segundo **no se dibuja, ni siquiera deshabilitado** | `Design-Rules-Config-Esquema.md` §2.1 |
| **Frontera de propuesta** | Regla por la que toda propuesta de cambio se previsualiza y se confirma antes de aplicarse, y la interfaz nunca aplica directo. En este producto se realiza en el conjunto de cambios pendientes con su informe de impacto | `Design-Rules-Config-Esquema.md` §6 |
| **Ranura del asistente** | Hueco de interfaz reservado y deshabilitado para un futuro asistente de configuración, para que enchufarlo no obligue a rediseñar la composición | `Design-Rules-Config-Esquema.md` §4.7 |
| **Omisión declarada** | Elemento de identidad que este perfil **no dibuja ni siquiera deshabilitado**, por no aplicar: registro, selector de cuenta, recuperación, persistencia opcional de sesión y roles visibles | `Design-Rules-Acceso-Monousuario.md` §2 |
| **Sello de versión** | Declaración de qué versión de sí misma corre una instancia. Se muestra en dos ubicaciones obligatorias y **se deriva de la construcción; no se escribe** | `Design-Rules-Identidad-De-Version.md` §4.1 y §4.2 |
| **Detalle de diagnóstico** | Disclosure que expone el contrato de identidad de versión completo, con copiado en un solo gesto | `Design-Rules-Identidad-De-Version.md` §4.4 |
| **Marcador de origen indeterminado** | Texto explícito que reemplaza a la versión cuando la identidad no pudo derivarse de la construcción. **Nunca un espacio en blanco ni una versión inventada** | `Design-Rules-Identidad-De-Version.md` §4.5 |

---

## §5. Términos del dominio que esta categoría reusa sin redefinir

Su definición vive en el intake §12 y en `Vision-Producto.md` §9. Acá se declara únicamente qué consecuencia tienen sobre la interfaz, para evitar la duplicación con semántica distinta que `Rules-UX-UI-DX.md` §4.4 enumera como anti-patrón.

| Término | Consecuencia sobre la interfaz |
| --- | --- |
| Proyecto SelfHosted | Es lo que el usuario crea desde el portal. Su vista por defecto es el lienzo, porque la arquitectura es el proyecto |
| Servicio | Es el nodo del lienzo: permanente y posicionable. **No tiene estado de encendido**; lo que se pinta con color es su despliegue |
| Despliegue | Es lo volátil. Su estado y sus métricas son las dos zonas del nodo que desaparecen cuando no hay despliegue |
| Arista | Se dibuja **una por par de servicios**, agrupando debajo las referencias que la sostienen. Una referencia a una variable compartida **no dibuja arista**, porque el proyecto SelfHosted no es un nodo del lienzo |
| Conjunto de cambios pendientes | Su contador vive en el banner del lienzo. Los cambios **puramente visuales no entran** |
| Modo pendiente | Es la variante «pendiente de aplicar» del lenguaje visual de estados, y su color está reservado en exclusiva |
| Incorporación | Su flujo tiene **cuatro pasos y no tres**, y el tercero —la clasificación de variables— es obligatorio |
| Huérfano | Es la señal visual explícita de la deriva respecto del motor de contenedores |
| Referencia de variable | Trazar una flecha en el lienzo y escribir la referencia a mano **producen el mismo objeto**. La interfaz muestra la forma legible; lo persistido lleva el vínculo |
| Catálogo | **Nada de él corre.** Su superficie no exhibe ningún par de estado de ejecución, y arranca vacío en toda instalación nueva |
| Credencial de máquina | Su valor se muestra **una única vez**. Sus ámbitos no son roles del administrador y sólo aparecen en su propia superficie |
| Parcialmente activo | **Es un estado legítimo del modelo**, no un error. Ninguna superficie lo presenta con tratamiento de error ni ofrece una acción de reparar |
| Higiene del modelo | **Informa, nunca impide.** Ninguna detección puede materializarse como diálogo que bloquee |

---

## §6. Vocabulario de microcopy: elecciones fijadas

Las cuatro elecciones de vocabulario que esta categoría fija y que toda superficie respeta. El texto exacto de cada mensaje lo cierra la Fase B2 sobre la maqueta; lo que se fija acá es la elección de palabra.

| Elección | Regla | Por qué |
| --- | --- | --- |
| **Guardar** frente a **desplegar** | «Guardar» y sus variantes designan siempre agregar al conjunto de cambios pendientes. «Desplegar», «redesplegar» y «aplicar» designan siempre operaciones que tocan contenedores. **Los dos conjuntos de verbos no se cruzan nunca** | Es la confusión más probable del modelo, y el anexo E-18 la declara como criterio de verificación |
| **Incorporar** frente a **crear** | «Incorporar» designa exclusivamente traer al modelo un contenedor que ya existe fuera de él, sin recrearlo. «Crear» designa dar de alta algo nuevo | Confundirlas destruiría el diferenciador del producto, que es adoptar sin reinstanciar |
| **Detener** frente a **eliminar** | «Detener» elimina el contenedor y conserva definición, variables y datos de los montajes. «Eliminar» borra el servicio y pide confirmación escrita | Detener no borra nada, y la interfaz no puede sugerir lo contrario |
| **El verbo del acuse repite el verbo del botón** | Un botón que dice «Aplicar cambios» produce un acuse que habla de cambios aplicados, no de una operación exitosa | Regla de redacción del catálogo base §5 |

Dos prohibiciones de vocabulario, derivadas de reglas vigentes:

- **No se usa la palabra «proyecto» a secas** en la interfaz para designar el objeto del producto sin que el contexto lo haya fijado de forma inequívoca, y **nunca se fusiona con el nombre del proyecto de código**. La desambiguación es la del intake §12.
- **No se enuncian roles ni permisos** en ninguna superficie fuera de la sección de credenciales de máquina. Con una sola identidad, enunciarlos sugiere una granularidad que no existe.

---

## §7. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 1.0 | 2026-07-29 | Versión inicial. Reúne los términos de superficie y composición, de estado y feedback, y de las cuatro capacidades transversales que esta categoría introduce; referencia sin redefinir los trece términos del dominio del cliente que los wireframes reusan, declarando únicamente su consecuencia sobre la interfaz; fija cuatro elecciones de vocabulario de microcopy y dos prohibiciones derivadas de la desambiguación de «proyecto» y del perfil de operador único |
| 1.0 | 2026-07-29 | Corrección del audit de la Fase B, absorbida dentro de la versión de emisión, sin subir versión y sin archivar, por la política de versionado de `Master-Prompt.md` §5: el documento está en estado `Propuesto` y la corrección proviene del audit de su propia fase. **H-14, P3:** el recuento de §7 pasa de catorce a trece términos del dominio referenciados, que es la cantidad real de filas de §5. Origen: informe [`Audit/B-02-03-r1.md`](../Audit/B-02-03-r1.md) |
