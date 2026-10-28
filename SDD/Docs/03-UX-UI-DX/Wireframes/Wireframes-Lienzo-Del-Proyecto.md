# Wireframes — Lienzo del proyecto

**Proyecto de código:** SelfHosted-Service
**Producto:** SelfHosted Service
**Documento:** Wireframes-Lienzo-Del-Proyecto.md
**Versión:** 2.1
**Estado:** Propuesto
**Fecha:** 2026-08-01
**Autor:** UX/UI Designer + Frontend Lead (AG-03)
**Variante:** UX/UI

> **El menú de las siete vías de alta desaparece.** El alta se unificó: hay **una sola entrada** y de dónde sale la imagen es un campo suyo. Adoptar un contenedor existente y usar el catálogo **salen del alta** y pasan a ser acciones de sus propios listados. La acción primaria del lienzo deja de abrir un menú y abre directamente [`SUP-17`](Wireframes-Alta-De-Servicio.md): ver §3.1. Esta versión suma además la **acción de desplegar sin arrancar** el proyecto (§3.4) y la representación del **servicio en cuarentena** y del **proyecto no reproducible** (§3.5).

---

## Tabla de contenido

- [1. Pantalla y propósito](#1-pantalla-y-propósito)
- [2. Layout](#2-layout)
- [3. Componentes principales](#3-componentes-principales)
  - [3.1 Las tres entradas para agregar un servicio, y por qué están al mismo nivel](#31-las-tres-entradas-para-agregar-un-servicio-y-por-qué-están-al-mismo-nivel)
  - [3.2 La instanciación de una plantilla mete N nodos de una confirmación](#32-la-instanciación-de-una-plantilla-mete-n-nodos-de-una-confirmación)
  - [3.3 El nodo borrador](#33-el-nodo-borrador)
  - [3.4 Las tres fases sobre el proyecto completo](#34-las-tres-fases-sobre-el-proyecto-completo)
  - [3.5 El servicio en cuarentena y el proyecto no reproducible](#35-el-servicio-en-cuarentena-y-el-proyecto-no-reproducible)
- [4. Interacciones](#4-interacciones)
- [5. Estados](#5-estados)
  - [5.1 Pendencia declarada `B-UX-01`, distinción visual de las aristas](#51-pendencia-declarada-b-ux-01-distinción-visual-de-las-aristas)
- [6. Versión responsive](#6-versión-responsive)
- [7. Notas de implementación](#7-notas-de-implementación)
- [8. Trazabilidad](#8-trazabilidad)
- [9. Control de cambios](#9-control-de-cambios)

---

## 1. Pantalla y propósito

**Nombre canónico de la superficie: `Lienzo del proyecto`** (`SUP-05`).

Es la pantalla principal del producto y la vista por defecto de un proyecto SelfHosted, «porque la arquitectura *es* el proyecto». Su tarea es que el administrador lea de un vistazo la arquitectura completa de un conjunto de servicios, la edite, y arranque o detenga el conjunto. Corresponde a la ruta `/proyectos/{id}` del mapa de navegación del anexo E-18, cuya disposición este wireframe transcribe.

Es además la superficie sobre la que se mide la puerta técnica PT-01, y la que concentra el riesgo RG-01 de la matriz de riesgos.

---

## 2. Layout

Disposición transcripta del anexo E-18, desprovista de los valores de ejemplo. Tres zonas: navegación del proyecto SelfHosted a la izquierda, lienzo al centro con el banner fijo arriba, y panel contextual a la derecha.

```text
+-----------------------------------------------------------------------------+
| [=] <titulo>  [> Arrancar][# Detener][+ Desplegar]  <ident.> [..] [Salir] |
+-------+-------------------------------------------------+-------------------+
|       | (!) <n> cambios pendientes [Ver detalle][Aplicar]|  Actividad        |
|  [#]  |-------------------------------------------------|  ---------------  |
| Lienzo|                                                  |  (i) <evento>     |
|       |     +--------------+        +--------------+     |      <hace ...>   |
|  [=]  |     | (i) <nombre> |------->| (i) <nombre> |     |  (i) <evento>     |
|  Logs |     | <imagen>     |        | <imagen>     |     |      <hace ...>   |
|       |     | [==  ] <mem> |        | [=   ] <mem> |     |                   |
|  [~]  |     +------+-------+        +--------------+     |  ---------------  |
| Metr. |            |                                     |  Proyecto         |
|       |            v                                     |  <N> servicios    |
|  [*]  |     +--------------+                             |  <n> activos      |
| Ajus. |     | (o) <nombre> |  <- nodo pendiente          |  red: <modo>      |
|       |     | <imagen>     |                             |  autoarranque:    |
|       |     +--------------+                             |    <si | no>      |
|       |                                                  |                   |
|       |  [+ Nuevo servicio]  [Ajustar]  [Minimapa]        |                   |
+-------+-------------------------------------------------+-------------------+
```

Cinco decisiones de esta pantalla, transcriptas del anexo E-18:

1. El lienzo es la vista por defecto del proyecto SelfHosted.
2. El banner de cambios pendientes va **fijo arriba**, con contador, acceso al detalle y acción de aplicar, para hacer visible el estado transaccional del borrador.
3. El panel derecho es **contextual**: actividad cuando no hay selección, configuración del servicio cuando hay un nodo seleccionado.
4. Arrancar y detener el proyecto SelfHosted completo están **siempre visibles en la barra superior**, por ser las dos operaciones más frecuentes. **Desplegar sin arrancar es contigua y de jerarquía menor**, y no altera esa decisión: se suma sin desplazar a ninguna de las dos. Ver §3.4.
5. Hay **un único botón primario por pantalla**: «Nuevo servicio».

La navegación de la izquierda es la del proyecto SelfHosted abierto y sus cuatro destinos son los que el anexo E-18 declara. La ley de Miller se respeta con holgura.

---

## 3. Componentes principales

| Componente | Propósito | Datos que muestra | Comportamiento |
| --- | --- | --- | --- |
| Acciones de arranque y parada | Las dos operaciones más frecuentes sobre el conjunto | — | Siempre visibles en la barra superior. El arranque valida los conflictos de dirección **antes** de tocar el motor de contenedores y puede derivar en la superficie de informe de conflicto |
| Acción de desplegar sin arrancar | Ejecuta las dos primeras fases sobre el conjunto sin encenderlo | — | Contigua a las dos anteriores y **con jerarquía menor**: es la menos frecuente de las tres. Valida conflictos igual, porque crear el contenedor es la fase que ocupa la dirección. Ver §3.4 |
| Banner de cambios pendientes | Hace visible el estado transaccional del borrador | Contador de cambios acumulados | Fijo arriba del lienzo. **Sólo aparece si hay cambios pendientes.** Ofrece ver el detalle y aplicar |
| Lienzo | Espacio visual donde se lee y se edita la arquitectura | Un nodo por servicio y una arista visual por par de servicios | Desplazamiento, acercamiento, arrastre de nodos, agrupación y trazado de aristas |
| Nodo de servicio | Unidad de lectura del lienzo | Ver [`Representacion-Nodo-De-Servicio.md`](../Representaciones/Representacion-Nodo-De-Servicio.md) | Seleccionable; abre el panel lateral del servicio |
| Arista | Representa que un servicio depende de otro | Una por par de servicios, agrupando debajo las referencias que la sostienen | Ver la pendencia `B-UX-01` en §5.1 |
| Grupo | Agrupación visual de nodos | Título del grupo | Cambio puramente visual: se guarda al instante |
| Panel contextual, modo actividad | Da el pulso del proyecto SelfHosted cuando no hay selección | Eventos recientes con su antigüedad relativa; resumen del proyecto con cantidad de servicios, activos, modo de red, marca de autoarranque, **conteo de servicios en cuarentena cuando hay al menos uno** y **rótulo de proyecto no reproducible cuando corresponde** | Es el estado por defecto del panel. Ver §3.5 |
| Panel contextual, modo servicio | Configuración del servicio seleccionado | Ver [`Wireframes-Panel-Lateral-Del-Servicio.md`](Wireframes-Panel-Lateral-Del-Servicio.md) | Aparece al seleccionar un nodo |
| Acción primaria | Da de alta un servicio | — | Única acción primaria de la pantalla. **Abre directamente [`SUP-17`](Wireframes-Alta-De-Servicio.md)** y no un menú previo. Ver §3.1 |
| Controles de encuadre | Ajustar el encuadre y abrir el minimapa | — | Cambios puramente visuales |

### 3.1 Las tres entradas para agregar un servicio, y por qué están al mismo nivel

**El menú de vías desaparece.** El alta se unificó el 2026-07-31: hay una sola entrada y de dónde sale la imagen es un **campo** suyo, con tres valores. La acción primaria del lienzo **abre el alta directamente**.

Lo que el lienzo conserva son **tres entradas distintas para llegar a tener un servicio**, y las tres viven al mismo nivel:

| Entrada | Dónde vive en esta pantalla | A qué superficie lleva | Qué produce |
| --- | --- | --- | --- |
| **Agregar un servicio** | Acción **primaria** del lienzo | [`SUP-17`](Wireframes-Alta-De-Servicio.md) | Un servicio declarado desde cero, con el origen como campo |
| **Incorporar un contenedor que ya corre** | Navegación del proyecto SelfHosted | [`SUP-10`](Wireframes-Descubrimiento-E-Incorporacion.md) | Un servicio vinculado a un contenedor existente, sin recrearlo |
| **Usar una plantilla del catálogo** | Navegación del producto | [`SUP-11`](Wireframes-Catalogo-De-Plantillas.md) | Uno o varios servicios con sus aristas, según el subgrafo del ítem |

**Por qué al mismo nivel y no anidadas bajo el alta.** Es la respuesta a la pérdida que la unificación produce y que [`SUP-17`](Wireframes-Alta-De-Servicio.md) §3.2 declara: con un formulario, quien no sabe qué quiere ya no ve las opciones juntas. Anidar las otras dos bajo el alta las escondería detrás de una decisión que el administrador todavía no puede tomar. El lienzo es la pantalla donde las tres se ven a la vez, y **ésa pasa a ser su función**: no ofrecer un menú de siete opciones, sino que las tres formas de tener un servicio sean alcanzables desde la pantalla principal.

**Cambio respecto de la versión 2.0, declarado porque retira contenido que otros artefactos citan.** La versión 2.0 declaraba **siete vías sobre cinco orígenes** y la tabla que las repartía. Se retira entera: las dos de imagen se funden en un valor del campo de origen, el repositorio remoto **deja de ofrecerse** por la acotación de `F-10`, el archivo de construcción en línea pasa a llamarse definición local y es otro valor, la imagen del almacén local es un valor nuevo, el servicio sin origen se reconoce como el alta detenida en el paso del nombre, y adoptar y catálogo salen del alta. El eje de la **vía de alta** no desaparece del modelo: lo que desaparece es su materialización como menú.

**El eje que sí conviene conservar dicho acá.** El **origen** sigue siendo una variante discriminada que se persiste, y desde el 2026-07-31 tiene **seis** valores. La **vía** sigue sin persistirse. Y hay un **tercer eje**, el **disparador del despliegue** —quién lo inicia: el administrador sobre un servicio, el orquestador del proyecto, o un automatismo externo—, que es independiente de los otros dos y que esta pantalla materializa en las acciones de §3.4.

### 3.2 La instanciación de una plantilla mete N nodos de una confirmación

Es lo propio de la vía del catálogo y **ninguna de las otras seis lo hace**: una sola confirmación puede producir **dos o tres nodos con sus aristas trazadas**. El lienzo tiene que absorberlo sin que el administrador se pregunte qué pasó.

| Qué exige | Por qué |
| --- | --- |
| **Declarar antes de crear** cuántos servicios, con qué nombres previstos, y qué aristas y variables compartidas se van a crear | El administrador está por meter varios nodos con una sola acción, y tiene que saber cuántos antes de darle |
| Los nodos nuevos aparecen **en modo pendiente**, con sus aristas ya trazadas | Es el estado que les corresponde: quedan pendientes de aplicar, no aplicados |
| El **aviso de nombre sufijado** se muestra como información y **no como error** | El sufijo automático es el comportamiento correcto y declarado: no rechaza y no pregunta. Presentarlo en rojo haría que el administrador buscara un problema que no existe |
| La vista **encuadra los nodos nuevos** en lugar de dejarlos donde caigan | Con dos o tres nodos apareciendo de golpe, no encuadrarlos obliga a buscarlos |

### 3.3 El nodo borrador

Un servicio puede existir **incompleto y visible** en el lienzo: es el estado `borrador`, que es lo que hace utilizable guardar a mitad de camino. El lienzo tiene que representarlo, y con tres propiedades que lo distinguen del modo pendiente:

| Propiedad | Nodo borrador | Nodo en modo pendiente |
| --- | --- | --- |
| Qué significa | Existe, está **incompleto** y no es aplicable | Está completo y **espera que se aplique el conjunto de cambios** |
| Entra al cajón de cambios pendientes | **No** | Sí |
| Qué acción ofrece | Retomar el alta donde se dejó | Aplicar, o descartar el cambio |

**No pueden compartir representación visual**, porque significan cosas opuestas: uno no está listo y el otro sí. El lenguaje visual de estados reserva un color para el modo pendiente, y el borrador necesita el suyo.

**Brecha declarada, `B-UX-24`.** El anexo E-18 del intake declara el lenguaje visual de los estados del nodo y **no incluye el borrador**, porque el estado no existía cuando se declaró. Qué señal visual lo representa —y que no colisione con el violeta del modo pendiente ni con los estados de ejecución— es materia de [`Representacion-Lenguaje-Visual-De-Estados.md`](../Representaciones/Representacion-Lenguaje-Visual-De-Estados.md), que esta superficie no reescribe. Destinatario: `03-UX-UI-DX`, en la revisión de esa representación.

**El nodo borrador aparece al declararse el nombre**, que es el primer dato con el que se lo puede dibujar. La versión 2.0 decía «desde que se eligió la vía»; sin menú de vías, el acto que produce un objeto identificable es el nombre. Lo declara [`SUP-17`](Wireframes-Alta-De-Servicio.md) §3.5.

### 3.4 Las tres fases sobre el proyecto completo

«Desplegar» son tres operaciones y no una: obtener la imagen, **crear el contenedor** y poner en marcha. Las dos primeras son «el despliegue» y la tercera «el arranque». La consecuencia sobre esta pantalla es concreta: **se puede desplegar sobre un proyecto detenido sin encenderlo**, que es exactamente lo que la separación habilita.

| Acción de la barra superior | Qué fases ejecuta | Qué respeta | Es nueva |
| --- | --- | --- | --- |
| **Desplegar sin arrancar** | 1 y 2 sobre todos los servicios alcanzados | **No consulta el grafo**: obtener imágenes y crear contenedores son independientes entre servicios y pueden ir en paralelo | **Sí** |
| Arrancar | 3 | **El orden topológico del subgrafo de aristas que declaran espera.** Es la razón por la que la regla se llama grafo de **arranque** | No |
| Detener | Deshace la 3 | — | No |

**Tres consecuencias de composición:**

1. **Arrancar y detener siguen siendo las dos acciones siempre visibles** de la barra superior, por ser las más frecuentes, y así lo declara el anexo E-18. **Desplegar sin arrancar vive contiguo a ellas y con jerarquía menor**: es la menos frecuente de las tres y no puede competir con las que E-18 ubicó por frecuencia.
2. **La validación de conflicto de direcciones se conserva donde estaba.** Arrancar valida los conflictos antes de tocar el motor y puede derivar al informe. **Desplegar sin arrancar también reserva direcciones**, porque crear el contenedor es la fase que las ocupa, y por lo tanto valida igual.
3. **Un proyecto con todos sus contenedores creados y ninguno en marcha no es un proyecto a medias.** El resumen del panel contextual lo nombra por su estado, sin tratamiento de error y sin acción de reparar.

### 3.5 El servicio en cuarentena y el proyecto no reproducible

Son **dos marcas del servicio**, no dos estados del despliegue, y el lienzo tiene que exhibir las dos porque es la pantalla donde el administrador mira la arquitectura completa.

**Cuarentena.** Un servicio cuyo despliegue nuevo no arrancó y cuyo despliegue anterior recuperado tampoco queda en cuarentena, con el proyecto siguiendo en marcha. Sin representación, es un servicio silenciosamente apagado, que es peor que uno visiblemente caído.

| Dónde se ve en esta pantalla | Cómo |
| --- | --- |
| En el nodo | **Distintivo textual compuesto sobre el par de estado**, sin insignia ni color propios. Ver [`Representacion-Nodo-De-Servicio.md`](../Representaciones/Representacion-Nodo-De-Servicio.md) §3.1 |
| En el resumen del panel contextual | Conteo de servicios en cuarentena junto al de activos, **cuando hay al menos uno**. Su ausencia no se representa: un cero permanente entrena a no mirarlo |
| En la actividad | El evento del fallo de arranque y el de la recuperación del despliegue anterior, con su causa |

**Y donde el humano lo encuentre antes de necesitarlo**, que es el tablero de estado: ver [`SUP-09`](Wireframes-Tablero-De-Estado.md) §3.3. Esta pantalla lo muestra **por proyecto**; el tablero lo muestra **por servidor**, que es donde se lo encuentra sin haber ido a buscarlo.

**Lo que esta superficie hace visible es distinto de avisar, y se declara.** Hacer visible de forma persistente se deriva de la exigencia de que un servicio en cuarentena se encuentre; **dónde se avisa en el momento en que ocurre no está declarado por ninguna fuente y no se inventa acá**. Es uno de los tres puntos abiertos de la brecha `B-UX-31`, junto con si la recuperación del anterior es automática u ofrecida y con si la cuarentena apaga el autoarranque o la participación en el arranque. Ninguno se cierra acá, y por eso **el lienzo no dibuja ninguna acción de retirar la cuarentena**.

**No reproducible.** Un servicio de origen imagen del almacén local queda marcado como no reproducible, y **el proyecto queda marcado cuando al menos uno de sus servicios lo está**.

| Dónde se ve | Cómo |
| --- | --- |
| En el nodo del servicio | Distintivo informativo, **sin tratamiento de error ni de atención**: es una propiedad declarada de lo que el administrador eligió, no un fallo |
| En el resumen del panel contextual, a nivel proyecto | Rótulo con el conteo de servicios que lo producen, y el enunciado de cómo se retira: publicar la imagen en un registro y pasar a un origen de registro |

**La marca es derivada del origen y no editable en ninguna de las dos escalas.** No hay control que la active ni que la desactive, y no se dibuja deshabilitada. La advertencia relevante es antes de exportar, y vive en [`SUP-15`](Wireframes-Exportacion-E-Importacion.md) §3.3.

---

## 4. Interacciones

| Acción | Disparador | Resultado esperado | Precondición |
| --- | --- | --- | --- |
| Abrir el proyecto SelfHosted | Navegación desde el listado | El sistema **verifica el estado real de cada contenedor contra el motor antes de pintar el lienzo**, y restituye la disposición guardada. La primera pintura no muestra un estado caducado | Existe el proyecto |
| Arrastrar un nodo | Puntero sobre el nodo | El nodo se mueve **sin retraso perceptible**. Durante el gesto **no se escribe nada**. Al soltar, se escribe la disposición **una sola vez**, con antirrebote de 400 ms. **No entra al conjunto de cambios pendientes ni marca redespliegue** | El lienzo está abierto |
| Agrupar o acercar | Gesto sobre el lienzo | Mismo tratamiento: escritura única al finalizar el gesto, sin entrada al conjunto de cambios | El lienzo está abierto |
| Recargar o reabrir | Navegación | El sistema restituye la disposición guardada **antes de pintar el lienzo** | Hay disposición guardada |
| Agregar un servicio | Acción primaria | **Se abre [`SUP-17`](Wireframes-Alta-De-Servicio.md) directamente, sin menú previo.** El nodo aparece en el lienzo **en estado borrador al declararse el nombre**, y pasa a pendiente de aplicar cuando el alta se deja pendiente | Existe el proyecto |
| Incorporar un contenedor que ya corre | Navegación del proyecto SelfHosted | Se abre [`SUP-10`](Wireframes-Descubrimiento-E-Incorporacion.md). Su acción de adoptar **produce un servicio**: el nodo aparece en el lienzo ya activo, sin corte del servicio que corría | Existe el proyecto |
| Usar una plantilla del catálogo | Navegación del producto | Se abre [`SUP-11`](Wireframes-Catalogo-De-Plantillas.md). Su acción de usar un ítem **produce uno o varios servicios** con sus aristas, en estado pendiente de aplicar. Ver §3.2 | Existe el proyecto |
| Trazar una arista | Arrastre desde el puerto de salida de un nodo al puerto de entrada de otro | El sistema **escribe en el origen una referencia** a las variables provistas del destino: trazar la flecha es azúcar de interfaz sobre la referencia de variable. Si el destino declara **más de un puerto de contenedor, el sistema pregunta cuál** antes de escribir la expresión, y lo escribe literal. El sistema **propone el valor de la espera** al destino, y el administrador acepta o cambia la propuesta | Hay al menos dos servicios |
| Desmarcar la espera de una arista | Edición de la arista | Los dos servicios pasan a arrancar en cualquier orden. **La arista sigue dibujándose**, sigue marcando redespliegue y sigue exigiendo canal alcanzable si referencia el host | Existe la arista |
| Crear una arista sin variable | Acción de la arista | Se crea la arista con espera declarada y sin variable. **Entre dos servicios no puede haber más de una** | Hay al menos dos servicios |
| Seleccionar un nodo | Clic o foco de teclado sobre el nodo | El panel contextual pasa al modo servicio | Existe el nodo |
| Deseleccionar | Clic en el lienzo vacío o tecla de escape | El panel contextual vuelve al modo actividad | Había selección |
| Arrancar el proyecto SelfHosted | Acción de la barra superior | El sistema valida los conflictos de dirección sin acceder al motor, calcula el orden topológico sobre el subgrafo de las aristas que declaran espera, y despliega en ese orden. Ante conflicto, deriva a la superficie de informe | Hay servicios declarados |
| Desplegar sin arrancar el proyecto SelfHosted | Acción contigua a las dos de la barra superior, con jerarquía menor | El sistema valida los conflictos de dirección, obtiene las imágenes y **crea los contenedores sin ponerlos en marcha**. **No consulta el grafo de arranque**: las dos primeras fases son independientes entre servicios. El proyecto queda con sus contenedores creados y ninguno en marcha, que es un desenlace correcto | Hay servicios declarados |
| Detener el proyecto SelfHosted | Acción de la barra superior | Los contenedores se eliminan **conservando intactos la definición, las variables y los datos de los montajes**. Detener no borra nada | Hay despliegues activos |
| Retirar la cuarentena de un servicio | — | **No se dibuja.** Ninguna fuente declara qué la levanta: brecha `B-UX-31` | — |
| Ver el detalle de los cambios | Acción del banner | Se abre el cajón de cambios pendientes | Hay cambios pendientes |
| Aplicar los cambios | Acción del banner | Se abre el informe de impacto del cajón, **antes de ejecutar nada** | Hay cambios pendientes |
| Abrir las variables compartidas | Navegación del proyecto SelfHosted | Se abre la superficie de variables compartidas | Existe el proyecto |
| Abrir la revisión de higiene | Navegación del proyecto SelfHosted | Se abre la superficie de revisión de higiene. **El lienzo no exhibe los avisos**: navega a la superficie que los consolida. Ninguna condición de higiene bloquea ninguna operación del lienzo | Existe el proyecto |
| Desplazar un nodo por teclado | Nodo enfocado y teclas de dirección | El nodo se desplaza en incrementos discretos. Al soltar el foco o tras una pausa, se escribe la disposición con el mismo antirrebote. **Es alternativa obligatoria al arrastre y no depende de la técnica que decida la puerta técnica PT-01** | El nodo está enfocado |
| Trazar una arista por teclado | Nodo enfocado y acción de conexión | Se elige el destino de una lista de los servicios del proyecto SelfHosted, y el flujo continúa igual que con puntero | Hay al menos dos servicios |

---

## 5. Estados

| Estado | Condición que lo produce | Representación esperada |
| --- | --- | --- |
| Vacío | El proyecto SelfHosted no tiene ningún servicio declarado | Lienzo vacío con texto orientativo y la acción primaria destacada. Es el estado en el que aterriza un alta recién creada |
| Cargando | El proyecto SelfHosted se está trayendo y reconciliando | Esqueleto del lienzo, más barra de progreso fina en la parte superior del contenido. La reconciliación previa a la primera pintura ocurre en este estado |
| Con datos | Hay servicios declarados | Nodos y aristas con su par de estado |
| Sin cambios pendientes | El conjunto de cambios está vacío | **El banner no se muestra** |
| Con cambios pendientes | Hay al menos un cambio acumulado | Banner fijo con el contador, el acceso al detalle y la acción de aplicar. Los nodos y aristas alcanzados exhiben la variante «pendiente de aplicar» |
| Nodo pendiente de aplicar | El servicio existe en el conjunto de cambios y no se aplicó | Variante «pendiente de aplicar» del lenguaje visual de estados, que **prevalece** sobre el estado del despliegue |
| Nodo huérfano | El despliegue está registrado como activo y su contenedor desapareció del motor | Variante «huérfano», con la acción de redesplegar desde la configuración importada disponible en el panel lateral, y su advertencia de corte |
| Proyecto parcialmente activo | Al menos un servicio quedó fuera del arranque | El resumen del panel contextual lo declara con su etiqueta textual. **Es un estado legítimo**, sin tratamiento de error |
| Proyecto desplegado y en reposo | Los contenedores están creados y ninguno se puso en marcha | El resumen lo nombra por su estado, **sin tratamiento de error y sin acción de reparar**. Es el desenlace correcto de desplegar sin arrancar |
| Nodo en cuarentena | El despliegue nuevo del servicio no arrancó y el anterior recuperado tampoco | Distintivo textual **compuesto sobre el par de estado**, sin insignia ni color propios. El resumen del panel contextual suma el conteo de servicios en cuarentena. **Sin acción de retirarla**: ver §3.5 y `B-UX-31` |
| Nodo no reproducible | El origen del servicio es imagen del almacén local | Distintivo informativo en el nodo, **sin tratamiento de error ni de atención** y sin control que lo modifique |
| Proyecto no reproducible | Al menos un servicio del proyecto lo está | Rótulo en el resumen del panel contextual con el conteo de servicios que lo producen y el camino de pago enunciado |
| Arranque bloqueado | Hay conflicto de dirección | Se abre la superficie de informe de conflicto. Ver [`Wireframes-Informe-De-Conflicto-De-Direcciones.md`](Wireframes-Informe-De-Conflicto-De-Direcciones.md) |
| Arista inválida | Una arista referencia el host del destino y no hay canal alcanzable | La arista queda **marcada inválida y bloquea el arranque** |
| Ciclo de arranque rechazado | El trazado produce un ciclo en el subgrafo de aristas con espera | Rechazo **señalando el ciclo**, sin crear la arista |
| Arista sin aporte rechazada | La arista no aporta ni referencia ni espera | Rechazo: una arista tiene que aportar una de las dos |
| Arista de espera duplicada | Ya existe una arista de espera sin variable entre ese par | Rechazo |
| Error | El proyecto SelfHosted no pudo traerse, o una operación falló | Banda de error con causa y acción de recuperación. Un fallo por nodo se lee en el par de estado de ese nodo, con su causa |
| Canal caído | Se perdió la conexión con el servidor | Aviso de reconexión estilizado acorde a la marca, no el aspecto por omisión. **Ningún despliegue en curso se cancela, se pausa ni se altera: lo único que se pierde es la vista** |
| Sin permiso | — | **No aplica.** Una sola identidad |

### 5.1 Pendencia declarada `B-UX-01`, distinción visual de las aristas

El anexo E-18 registra como pendiente la distinción visual entre las aristas que declaran espera al destino y las que no, y `02-Especificacion-Funcional` la transfiere a esta categoría como brecha B-07.

**No se resuelve acá.** Ninguna regla del catálogo de diseño cubre la representación de aristas de un lienzo, de modo que no hay derivación posible, y el anexo E-18 pide explícitamente que sus pendencias «se resuelvan y no se inventen». Lo que sí se declara son las tres restricciones que cualquier resolución tiene que cumplir, en [`Representacion-Nodo-De-Servicio.md`](../Representaciones/Representacion-Nodo-De-Servicio.md) §3.3.

Consecuencia para la maqueta de la Fase B2: la distinción **no es un estado demostrable** de esta superficie hasta que la brecha se cierre. Lo que sí se demuestra es la arista con variable, la arista sin variable y la arista marcada inválida, que son tres situaciones declaradas por las fuentes.

---

## 6. Versión responsive

La matriz de plataforma declara una única familia de navegador de escritorio y excluye navegadores móviles y pantallas pequeñas. Esta superficie **no tiene versión móvil especificada**, y es la que menos sentido tendría tenerla: el lienzo es una superficie de trabajo bidimensional sobre un parque de hasta treinta nodos.

- **El lienzo se acoge a la excepción explícita del criterio 1.4.10 de WCAG 2.2** para las partes del contenido que requieren disposición bidimensional para su uso o su significado. La excepción alcanza al lienzo y **no al resto de la superficie**: el banner, el panel contextual y la navegación reflúyen sin desplazamiento horizontal.
- Por debajo del punto de quiebre principal, el panel contextual se convierte en cajón superpuesto en lugar de comprimir el lienzo, y la barra lateral colapsa.
- El banner de cambios pendientes **nunca se oculta por falta de ancho**: es el componente que hace visible el estado transaccional y su desaparición es información falsa.

**Norma de diseño aplicada, no brecha.** El punto de quiebre principal alrededor de 768 px y el piso de 320 px sin desplazamiento horizontal los declara `Design-Rules-Web-Generico.md` §8, y esta superficie los aplica. Lo único delegado son los **anchos de verificación**: en cuáles comprueba la etapa `b` el comportamiento y lo registra en su informe de cierre, según `Compatibilidad-Plataformas.md` §4. La brecha `B-UX-15`, que declaraba ausente la norma, se retiró por falsa; ver [`Experiencia-De-Uso.md`](../Experiencia-De-Uso.md) §10.2.1.

---

## 7. Notas de implementación

**Accesibilidad.**

- **Operación completa por teclado del lienzo.** Recorrer los nodos, seleccionarlos, desplazarlos, trazar una arista y abrir el panel lateral tienen que ser posibles sin puntero, con el orden de recorrido correspondiendo al orden de lectura y sin trampas de foco. La alternativa por teclado **no depende de la mitigación de arrastre que la puerta técnica PT-01 decida**.
- Los puertos laterales del nodo son el objetivo más chico de la interfaz y cumplen el mínimo de 24 × 24 píxeles del criterio 2.5.8, ampliando el área activa sin ampliar el dibujo si hace falta.
- El nombre accesible de cada nodo incluye su estado.
- Un cambio de estado que ocurre sin acción del administrador se anuncia como región activa: el patrón de uso incluye dejar el panel abierto y volver a mirarlo.
- La insignia animada del estado «creando o construyendo» se detiene con preferencia de movimiento reducido, y el estado sigue siendo distinguible.
- El banner de cambios pendientes es una región identificada, no un adorno flotante.

**Performance percibida.** Los umbrales de la puerta técnica PT-01 condicionan esta superficie más que ninguna otra:

| Umbral | Consecuencia de diseño |
| --- | --- |
| Sin retraso perceptible en el arrastre, con 30 nodos y 40 aristas con insignia de estado y métricas por nodo | El movimiento del nodo no puede esperar una ida y vuelta al servidor por evento |
| 30 nodos actualizando su estado cada 2 s sin degradar el arrastre | La actualización de estado es un flujo independiente del gesto y no lo interrumpe |
| Cero escrituras durante el gesto; una única escritura al finalizar, con antirrebote de 400 ms | El guardado de la disposición **no muestra indicador de progreso por gesto**: sería feedback de algo que no está ocurriendo |
| Memoria por canal estable tras 15 minutos de uso continuo | El patrón de dejar abierto y volver es de uso previsto |

**La interfaz optimista no se aplica a ninguna operación de despliegue.** Un despliegue no es reversible y su resultado se determina por contenedor: la superficie muestra el estado real y nunca lo anticipa. Sí se aplica a los cambios visuales, que son reversibles y no tienen consecuencia sobre ningún contenedor.

**Internacionalización.** Los nombres de servicio, imágenes, etiquetas, direcciones y modos de red se muestran literales. Las magnitudes llevan unidad explícita y cifras tabulares. La antigüedad de los eventos de actividad se expresa en forma relativa.

---

## 8. Trazabilidad

| Dimensión | Referencia |
| --- | --- |
| Persona objetivo | Administrador único del producto: [`Vision-Producto.md`](../../00-Contexto/Vision-Producto.md) §2.1 |
| CU origen | [CU-04](../../02-Especificacion-Funcional/Casos-De-Uso/CU-04-Composicion-Del-Lienzo.md) y [CU-05](../../02-Especificacion-Funcional/Casos-De-Uso/CU-05-Persistencia-Y-Recuperacion-De-La-Disposicion.md) como origen principal; [CU-03](../../02-Especificacion-Funcional/Casos-De-Uso/CU-03-Alta-Y-Configuracion-De-Servicio.md), [CU-13](../../02-Especificacion-Funcional/Casos-De-Uso/CU-13-Despliegue-Desde-Imagen-De-Registro.md), [CU-15](../../02-Especificacion-Funcional/Casos-De-Uso/CU-15-Despliegue-Construyendo-La-Imagen.md), [CU-16](../../02-Especificacion-Funcional/Casos-De-Uso/CU-16-Alta-Desde-Plantilla-Del-Catalogo.md), [CU-18](../../02-Especificacion-Funcional/Casos-De-Uso/CU-18-Arranque-Y-Parada-Con-Autoarranque.md), [CU-22](../../02-Especificacion-Funcional/Casos-De-Uso/CU-22-Acumulacion-De-Cambios-Pendientes.md), [CU-28](../../02-Especificacion-Funcional/Casos-De-Uso/CU-28-Reconciliacion-Con-El-Motor-De-Contenedores.md) |
| Reglas de negocio relevantes | RN-03, RN-04, RN-05, RN-09, RN-12, RN-14, RN-17, RN-20, RN-21, RN-31, RN-32, RN-33, RN-34, RN-35 |
| Insumo del intake | **v3.5.** §4 capacidades F-04, F-06, la nota del **tercer eje y el alta unificada**, la de **las tres fases del despliegue** y la de la **política ante un despliegue que no arranca**; §5 historias 3 y 4; §6 flujo 1; §17.P.10 regla de oro del lienzo; §17.P.11 decisiones DA-05 y de disposición; anexos E-1, E-2 §20.2.3, E-4, E-10, E-17, E-18. Filas 3.4 y 3.5 de su control de cambios |
| Marco de experiencia aplicado | [`Experiencia-De-Uso.md`](../Experiencia-De-Uso.md) §3.3 flujo FL-03, §3.5 flujo FL-05, §3.6 flujo FL-06, §4.2 lenguaje visual, §7 performance percibida |
| Representaciones que invoca | [`Representacion-Nodo-De-Servicio.md`](../Representaciones/Representacion-Nodo-De-Servicio.md), [`Representacion-Lenguaje-Visual-De-Estados.md`](../Representaciones/Representacion-Lenguaje-Visual-De-Estados.md) |
| Catálogo de diseño aplicado | `Design-Rules-Web-Generico.md` §3.1, §3.3, §4.1, §4.9, §5, §6, §7, §8; `Design-Rules-Acceso-Monousuario.md` §3 y §4.3; `Design-Rules-Config-Esquema.md` §6 frontera de propuesta; `Design-Rules-Blazor-Mudblazor.md` §2 y §5 |
| US a generar en 06 | US-CU-04-1 a US-CU-04-4 y US-CU-05-1 a US-CU-05-3, provisionales |
| Tests previstos en 08 | Snapshot de los **veintiún** estados declarados; verificación de que la acción primaria **abre el alta directamente y no un menú de vías**; verificación de que **desplegar sin arrancar crea los contenedores sin ponerlos en marcha y no consulta el grafo**, y de que arrancar sí lo consulta; verificación de que un servicio en cuarentena **se ve en su nodo y en el resumen del proyecto** y de que **no hay acción de retirarla**; verificación de que la marca de no reproducible **no tiene control que la modifique** en ninguna de las dos escalas; verificación de cero escrituras durante el gesto y exactamente una al finalizar; test de accesibilidad sobre la operación completa por teclado del lienzo; medición de la puerta técnica PT-01 sobre esta superficie |
| Brechas que declara | `B-UX-01`, distinción visual de las aristas (B-07 de `02-Especificacion-Funcional`), **que sigue abierta y no se resuelve acá**; `B-UX-05`, token del estado pendiente; `B-UX-24`, señal visual del nodo borrador. **Recoge `B-UX-31`**, los tres puntos sin decidir de la política de cuarentena, declarada en [`SUP-06`](Wireframes-Panel-Lateral-Del-Servicio.md) §3.9 |
| Maqueta de la Fase B2 | Nombre canónico `Lienzo del proyecto`. **Veintiún** estados declarados en §5, de los cuales **veinte** son demostrables: la fila marcada no aplicable no se maqueta. **Se ajusta**: la acción primaria deja de abrir un menú, la barra superior suma la tercera acción, y el nodo y el resumen suman los dos distintivos |
| Fuente de la correspondencia | La fila «CU origen» reproduce la fila de esta superficie en [`Experiencia-De-Uso.md`](../Experiencia-De-Uso.md) §9.2, que es la **fuente única** de la correspondencia entre superficie y caso de uso. Se reproduce, y no se referencia, porque `Rules-UX-UI-DX.md` §4.2.1 punto 8 la exige como sección obligatoria del wireframe |

---

## 9. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 2.1 | 2026-08-01 | **Retroalimentación de la Fase B2: desaparece el menú de vías, aparecen las tres fases y las dos marcas del servicio.** Por la ronda de decisiones del agente humano del proyecto del 2026-07-31 y del 2026-08-01, consolidada en el `PRODUCT-INTAKE-SelfHosted-Service` **v3.5** §4 y anexo E-2 §20.2.3, y consumida de la brecha `B-29` de [`02-Especificacion-Funcional`](../../02-Especificacion-Funcional/Especificacion-Funcional.md) §9. Sube **minor**: ninguna sección de primer nivel se renumera, el nombre canónico y el identificador no cambian, y la regla de oro del lienzo, el trazado de aristas, la instanciación de N nodos de §3.2 y la excepción de reflujo **no cambian de contenido**. **§3.1 se rehace entero y cambia de título**: pasa de «el menú de las siete vías de alta» a **las tres entradas para agregar un servicio**, con la tabla de siete vías **retirada** y con el motivo de por qué las tres están al mismo nivel —es la respuesta del lienzo a la pérdida que la unificación produce y que `SUP-17` §3.2 declara—. Se declara qué pasó con cada una de las siete y se conserva dicho el eje del origen, que pasa a **seis variantes**, y el **tercer eje**, el disparador del despliegue. **La fila «Acción primaria» de §3 se corrige**: decía «el menú de las **cuatro** vías de alta», cifra de la versión 1.0 que la migración normativa detectó y no propagó; ahora declara que **abre el alta directamente**. La pendencia queda cerrada por el cambio y no por una corrección aislada. **§3.4 nueva: las tres fases sobre el proyecto completo**, con la acción de **desplegar sin arrancar**, la declaración de que **no consulta el grafo** mientras que arrancar sí, y las tres consecuencias de composición, entre ellas que la acción nueva **no puede competir en jerarquía** con las dos que el anexo E-18 ubicó por frecuencia. §2 suma la acción al bloque ASCII de la barra superior y §3 suma su fila de componente. **§3.5 nueva: el servicio en cuarentena y el proyecto no reproducible**, las dos como **marcas del servicio y no como estados del despliegue**, con dónde se ve cada una y con la regla de que el distintivo **no inventa una fila del contrato visual**. Se declara la distinción entre **hacer visible** —que se deriva— y **avisar** —que no está declarado y no se inventa—, y que la marca de no reproducible sube al proyecto cuando **al menos uno** de sus servicios la lleva. **§3.3** declara que el nodo borrador aparece **al declararse el nombre** y no al elegirse una vía. **§4 suma cinco interacciones** y reformula la de agregar un servicio. **§5 pasa de dieciséis a veintiún estados**, veinte demostrables. **§8** actualiza el insumo del intake a v3.5, suma cuatro verificaciones a los tests previstos, recoge `B-UX-31` y declara que la superficie **se ajusta** en la maqueta. **Ninguna decisión abierta se cerró acá**: `B-UX-01` —la distinción visual de las aristas que declaran espera— **sigue abierta y no se resuelve**, porque ninguna regla del catálogo la cubre; y los tres puntos de la política de cuarentena siguen abiertos. **Ningún artefacto fuera de `03-UX-UI-DX` se tocó.** La versión 2.0 queda archivada en [`_legacy/2026-08-01/Wireframes-Lienzo-Del-Proyecto-v2.0.md`](_legacy/2026-08-01/Wireframes-Lienzo-Del-Proyecto-v2.0.md), con su bloque de archivado antepuesto y su cuerpo sin modificar. Ninguna fila anterior de este control de cambios se reescribió (`SDD-Development-Guide.md` §VI.2) |
| 2.0 | 2026-07-30 | Migración normativa del conjunto 4.1 al 6.0, fase M4 corte 4, bajo `Rules-UX-UI-DX` 4.0, `Vocabulario-Rules` 2.1 y `Migracion-Rules` 1.0. Clasificación **regenerar contenido** por el salto major de la regla que lo gobierna; fuente de contenido: **el documento de origen** en su versión 1.1, archivado sin modificar en `_legacy/2026-07-30/Wireframes-Lienzo-Del-Proyecto-v1.1.md`. Sube **major** desde 1.1 porque la nomenclatura anterior deja de cumplir. **El nombre del archivo no cambia**: `Wireframes-Lienzo-Del-Proyecto.md` nombra la **entidad del dominio** —el lienzo del agrupador de servicios, vista por defecto de un proyecto SelfHosted—, no la unidad de compilación; es el referente R6 de §3.5 paso 2 del plan, que declara textualmente que estos nombres no se tocan. **Cabecera:** se suma el campo `Proyecto de código` con el valor `SelfHosted-Service`, que §4.1 de la regla 4.0 exige como primer campo por ser ésta una categoría de nivel proyecto de código (`Vocabulario-Rules` §4 R3) y que el `PRODUCT-MANIFEST` §2 declara como `Nombre-Proyecto-Codigo`; la etiqueta `Proyecto` pasa a `Producto` sobre el mismo valor `SelfHosted Service`, porque `Vocabulario-Rules` §3 prohíbe la etiqueta de un plano de identidad sobre el valor de otro. Los dos campos conviven: el primero lo exige §4.1 y el segundo lo preserva `Migracion-Rules` §4.2. Los dos valores **difieren sólo por el guion** y no son intercambiables. **Sustitución léxica por ocurrencia** según `Vocabulario-Rules` §9.5 y el plan de migración §3.5, y nunca por reemplazo global de cadena: la **única** ocurrencia de «solución» designaba el nivel superior y pasa a «producto» con su concordancia de género —«Administrador único de la solución» a «Administrador único **del** producto»—; no hay ninguna «solución de código», y la única ocurrencia de la cadena `soluci` restante —dentro de «resolución», en §5.1— quedó **intacta**. Las veintinueve ocurrencias de «proyecto» se clasificaron una por una y **ninguna pasó a «proyecto de código»**: quince llevan la forma calificada «proyecto SelfHosted»; tres son el **nombre canónico de la superficie** `Lienzo del proyecto`, que se conserva textualmente; ocho son la misma entidad del dominio en forma corta, admitida por el `PRODUCT-INTAKE` §12 y por el glosario raíz de `Vision-Producto.md` §9 donde el contexto ya fijó el sentido —entre ellas la cita literal «porque la arquitectura *es* el proyecto» del anexo E-18, que es transcripción de fuente y **no se reescribe**, y la etiqueta «Proyecto» del panel contextual dentro del bloque ASCII de §2—; una es el segmento `/proyectos/{id}` de la ruta del anexo E-18; una nombra un artefacto del dominio en su enlace; y una era la etiqueta de cabecera. **El nombre canónico de la superficie `Lienzo del proyecto` y su identificador `SUP-05` se conservan textualmente**, porque `Deriva-Rules.md` exige que coincidan término por término con la línea de base visual. **El bloque ASCII de §2 no se tocó** y conserva su ancho. **Nada del contenido emitido por el fix de definiciones de servicio de la Fase B2 se alteró**: los dos ejes de §3.1, las siete vías, la instanciación de N nodos de §3.2, el nodo borrador de §3.3 y la brecha `B-UX-24` quedan idénticos, y las filas 1.1 y 1.0 de este control de cambios no se reescribieron. **Se detectó y no se propagó una diferencia preexistente**: la fila «Acción primaria» de §3 sigue diciendo «el menú de las **cuatro** vías de alta», cifra de la versión 1.0 que el fix de la Fase B2 actualizó en el encabezado de §3.1 y en la tabla de contenido pero no acá. Se declara como pendiente de confirmación humana y **no se corrige en esta migración**, por `Migracion-Rules` §4.2 regla 3. Origen: [`Plan-Migracion-4.1-a-6.0.md`](../../Audit/Plan-Migracion-4.1-a-6.0.md) §3.5 y §4 |
| 1.1 | 2026-07-29 | **El menú de alta pasa de cuatro vías sobre tres orígenes a siete sobre cinco**, y el lienzo incorpora dos representaciones que no tenía. §3.1 se rehace: declara los **dos ejes** —vía de alta, que no se persiste, y origen, que sí—, enumera las siete vías con qué resuelve cada una, y declara por qué presentar sólo los valores técnicos de origen era el defecto de la versión 1.0: **el administrador tenía que saber qué es una dirección de imagen antes de que el producto le contara qué le ofrece**. **§3.2** especifica que la instanciación de una plantilla mete **N nodos y sus aristas de una sola confirmación**, con las cuatro cosas que el lienzo tiene que hacer, incluida que el aviso de nombre sufijado **no se muestre como error**. **§3.3** especifica el **nodo borrador**, con la tabla que lo distingue del modo pendiente en tres propiedades y con la brecha `B-UX-24`, porque el lenguaje visual de estados del intake no lo incluye. La versión 1.0 queda archivada en `_legacy/2026-07-29/`. Origen: §22.5 del documento de trabajo `SDD/Estado/Redefinicion-Servicio.md` v2.0 |
| 1.0 | 2026-07-29 | Versión inicial. Transcribe la disposición de la pantalla del lienzo del anexo E-18 con sus cinco decisiones; especifica el menú de las cuatro vías de alta con el catálogo al mismo nivel que los tres orígenes; especifica la interacción de trazado de arista con la pregunta de puerto y la propuesta de espera, y su alternativa completa por teclado, independiente de la mitigación que decida la puerta técnica PT-01; declara dieciséis estados; declara la excepción de reflujo del criterio 1.4.10 acotada al lienzo y no al resto de la superficie; declara la pendencia `B-UX-01` sin resolverla y su consecuencia para la maqueta |
| 1.0 | 2026-07-29 | Corrección del audit de la Fase B, absorbida dentro de la versión de emisión, sin subir versión y sin archivar, por la política de versionado de `Master-Prompt.md` §5: el documento está en estado `Propuesto` y la corrección proviene del audit de su propia fase. **H-06, P1:** la fila de casos de uso de §8 pierde CU-36 y §3 pierde el componente de avisos de higiene, porque el lienzo **navega** a la superficie que los consolida y no los exhibe; §4 suma la interacción de apertura que lo declara. Se suma la fila que declara la fuente única de la correspondencia. **Brecha `B-UX-15` retirada por falsa:** §6 deja de declarar ausente el punto de quiebre y cita la norma que `Design-Rules-Web-Generico.md` §8 sí declara, acotando lo delegado a los anchos de verificación de la etapa `b`. Origen: informe [`Audit/B-02-03-r1.md`](../../Audit/B-02-03-r1.md) |
