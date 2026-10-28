# Wireframes — Alta de servicio

**Proyecto de código:** SelfHosted-Service
**Producto:** SelfHosted Service
**Documento:** Wireframes-Alta-De-Servicio.md
**Versión:** 2.2
**Estado:** Propuesto
**Fecha:** 2026-08-02
**Autor:** UX/UI Designer + Frontend Lead (AG-03)
**Variante:** UX/UI

> **El alta se unifica.** Desde esta versión no hay menú de vías: hay **una sola entrada**, y de dónde sale la imagen es un **campo** del apartado de origen, con **tres valores**. Es la decisión del agente humano del proyecto del 2026-07-31, consolidada en el `PRODUCT-INTAKE-SelfHosted-Service` §4 —la nota del tercer eje y el alta unificada **entró en la v3.4 y la 3.5 la conserva sin cambios**; el intake **vigente es v3.7**, leído el 2026-08-02 del campo `Versión` de su cabecera, y §8 declara como insumo la **v3.5**, que es la versión que originó este contenido, según la regla de cita del [`README.md`](../README.md) §4 de la categoría—. La grilla de siete tarjetas que la versión 2.1 fundaba en el número de opciones **se retira**, y la reversión se declara en §3.1 en lugar de aplicarse en silencio. Lo que se pierde con el cambio está declarado en §3.2.

---

## Tabla de contenido

- [1. Pantalla y propósito](#1-pantalla-y-propósito)
- [2. Layout](#2-layout)
- [3. Componentes principales](#3-componentes-principales)
  - [3.1 El origen es un campo de tres valores, y la grilla de siete tarjetas se retira](#31-el-origen-es-un-campo-de-tres-valores-y-la-grilla-de-siete-tarjetas-se-retira)
  - [3.2 Lo que se pierde con el formulario, declarado](#32-lo-que-se-pierde-con-el-formulario-declarado)
  - [3.3 Las dos verificaciones son dos operaciones con dos informes](#33-las-dos-verificaciones-son-dos-operaciones-con-dos-informes)
  - [3.4 Dato incorrecto y consulta imposible se ven distinto](#34-dato-incorrecto-y-consulta-imposible-se-ven-distinto)
  - [3.5 Guardar en cualquier punto, y qué queda cuando se guarda](#35-guardar-en-cualquier-punto-y-qué-queda-cuando-se-guarda)
  - [3.6 El delta de cada valor del campo de origen](#36-el-delta-de-cada-valor-del-campo-de-origen)
  - [3.7 La marca de no reproducible del almacén local](#37-la-marca-de-no-reproducible-del-almacén-local)
  - [3.8 El alta no despliega, y desde esta versión eso son tres fases y no una](#38-el-alta-no-despliega-y-desde-esta-versión-eso-son-tres-fases-y-no-una)
  - [3.9 El primer minuto de uso, que era la brecha más grande de esta superficie](#39-el-primer-minuto-de-uso-que-era-la-brecha-más-grande-de-esta-superficie)
- [4. Interacciones](#4-interacciones)
- [5. Estados](#5-estados)
- [6. Versión responsive](#6-versión-responsive)
- [7. Notas de implementación](#7-notas-de-implementación)
- [8. Trazabilidad](#8-trazabilidad)
- [9. Control de cambios](#9-control-de-cambios)

---

## 1. Pantalla y propósito

**Nombre canónico de la superficie: `Alta de servicio`** (`SUP-17`).

Su tarea es que el administrador **declare un servicio completo dentro de un proyecto SelfHosted**, empezando por ponerle nombre y siguiendo por decir de dónde sale su imagen. Se abre desde el lienzo del proyecto (`SUP-05` §3.1).

**Es una sola entrada y no un menú.** El primer paso es el nombre; el origen es un **campo** del apartado que sigue. La versión 2.1 abría con una grilla de siete tarjetas donde el administrador elegía «por dónde llegar»; esa grilla se retira, y §3.1 declara por qué el argumento que la sostenía dejó de valer.

**Por qué esta superficie existe como wireframe propio, y qué corrige.** Hasta la versión 1.0 de la categoría, el alta de servicio **no tenía wireframe**: vivía repartida entre el lienzo (`SUP-05`) y el panel lateral del servicio (`SUP-06`), y en la maqueta de la Fase B2 existía como archivo `Alta-De-Servicio.html` documentado como un estado de `SUP-06`. El resultado fue el defecto que el paso 5 de la Fase B2 destapó: **había disparador y no había destino**. Se le dio número propio, `SUP-17`, que continúa la numeración sin renumerar nada, y `PA-15` quedó resuelto el 2026-07-30 a favor de conservarla como superficie propia.

> **El argumento que sostiene la superficie propia se conserva, porque sigue siendo la razón de la forma:** `SUP-06` existe **sólo con un servicio seleccionado**, por su propia regla estructural, y el alta ocurre cuando el servicio todavía no existe. Alojar el alta ahí obligaba a que la superficie contradijera su regla de existencia. **La unificación del alta no toca ese argumento**: unificar la entrada no la reubica.

**Dos superficies dejan de ser puntos de entrada de esta.** Adoptar un contenedor existente y usar el catálogo **salen del alta**: no son formularios sino **listados donde se elige**, y ya tienen superficie propia. Pasan a ser acciones de [`SUP-10`](Wireframes-Descubrimiento-E-Incorporacion.md) y de [`SUP-11`](Wireframes-Catalogo-De-Plantillas.md) cuyo resultado es un servicio. Ver §3.1.

---

## 2. Layout

Superficie de formulario por pasos dentro del shell de trabajo, con el apartado de origen variable según el valor del campo y dos zonas de informe.

```text
+-----------------------------------------------------------------------+
| [=] <titulo del panel>      <identidad>  [Cambiar contrasena] [Salir] |
+---------+-------------------------------------------------------------+
| Lienzo  |  Agregar un servicio a <proyecto SelfHosted>  [Guardar] [X] |
| Logs    |  (o) Nombre (o) Origen (o) Red (o) Puertos (o) Dimensiones  |
| Metr.   |   ^ indicador de avance, con lo incompleto visible          |
| Ajustes |  ---------------------------------------------------------  |
|         |  Nombre del servicio                                        |
|         |  [ campo                                       ]            |
|         |  <alias de resolucion de nombres: el mismo>                 |
|         |  ---------------------------------------------------------  |
|         |  Origen                                                     |
|         |  De donde sale la imagen                                    |
|         |   ( ) Imagen de un registro                                 |
|         |   ( ) Imagen del almacen local                              |
|         |   ( ) Definicion local                                      |
|         |  [ campos propios del valor elegido, y de ningun otro ]     |
|         |  [ Explorar el registro ]  <solo en el primer valor>        |
|         |                                [ Verificar el origen ]      |
|         |  +- Informe de verificacion del origen ---------------+     |
|         |  | <resultado>  <momento>                             |     |
|         |  | Alcance: <que se consulto y que no>                |     |
|         |  | [ok] <comprobacion>  <detalle>                     |     |
|         |  | [no] <comprobacion>  <detalle>  <accion sugerida>  |     |
|         |  +----------------------------------------------------+     |
|         |  ---------------------------------------------------------  |
|         |  Red / Puertos / Variables / Montajes / Recursos / Comando  |
+---------+-------------------------------------------------------------+
|  +- Informe de validacion de la configuracion -------------------+    |
|  | <resultado>  Alcance: <contra que se verifico y contra que no> |    |
|  | [ok] <regla>                                                  |    |
|  | [!!] <regla>  <detalle>            <bloqueante>               |    |
|  +---------------------------------------------------------------+    |
|  [ Guardar como borrador ]        [ Validar ]  [ Dejar pendiente ]    |
+-----------------------------------------------------------------------+
```

**Dos decisiones de composición que el layout materializa.** El origen es **un campo dentro del tronco** y no un paso previo de selección: son tres valores que se leen en una línea cada uno y no requieren compararse en una grilla. Y los **dos informes ocupan zonas distintas**: el del origen contiguo al apartado de origen, el de la configuración al pie del formulario completo, porque son dos operaciones con alcances distintos y compartir zona sugeriría que son una.

**Qué se retiró del layout y qué no.** Se retiró el bloque de arte ASCII del «paso 1 · elección de vía», con sus siete tarjetas. **No se retiró nada del tronco**: el paso del nombre, el apartado de origen con su informe, las dimensiones, el informe de configuración y el par de acciones de salida están donde estaban.

---

## 3. Componentes principales

| Componente | Propósito | Datos que muestra | Comportamiento |
| --- | --- | --- | --- |
| Indicador de avance | Hace visible qué falta | Los pasos del tronco, con lo incompleto marcado | No bloquea el avance ni el guardado: informa |
| Campo de nombre | Declara el nombre y el alias de resolución de nombres | El nombre, con la nota de que es también el alias | Valida formato y unicidad en el proyecto. Es el **primer** dato del formulario |
| Campo de origen | Declara **de dónde sale la imagen** | Sus tres valores, con lo que resuelve cada uno | Ver §3.1. La variante de origen que queda persistida **se deriva** y no se elige |
| Apartado de origen | Recoge lo propio del valor elegido | Los campos que la variante exige, **y ninguno de otra variante** | Ver §3.6 |
| Acción de verificar el origen | Consulta el sistema externo o el almacén local | — | Ver §3.3 |
| Informe de verificación del origen | Declara qué se verificó y con qué resultado | Resultado, momento, **alcance**, y comprobación por comprobación | Ver §3.3 y §3.4 |
| Distintivo de no reproducible | Declara que el servicio no va a poder reconstruirse en otra máquina | — | **Derivado del origen y no editable.** Ver §3.7 |
| Bloque de dimensiones | Recoge red, puertos, variables, montajes, dispositivos, capacidades, recursos, política de reinicio, verificación de salud, efímero y **comando de arranque** | Los valores declarados | Los puertos se gatean por el modo de red |
| Acción de validar la configuración | Verifica contra el registro del sistema y contra el motor de contenedores | — | Ver §3.3 |
| Informe de validación de la configuración | Declara qué reglas se verificaron y contra qué **no** se verificó | Resultado, alcance y regla por regla, con el nivel de cada hallazgo | Ver §3.3 |
| Acción de guardar como borrador | Persiste lo declarado sin exigir nada | — | Ver §3.5 |
| Acción de dejar pendiente de aplicar | Pasa el servicio al conjunto de cambios | — | Habilitada sólo con las dos verificaciones en verde. **No despliega**: ver §3.8 |

### 3.1 El origen es un campo de tres valores, y la grilla de siete tarjetas se retira

**El campo se llama «de dónde sale la imagen» y tiene tres valores.** Es el enunciado del agente humano del proyecto: «con una tarjeta te alcanza; el concepto es simple, es decir de dónde va a obtener la imagen».

| Valor del campo | Qué dice que resuelve | Variante de origen que persiste |
| --- | --- | --- |
| **Imagen de un registro** | «La imagen ya está publicada en un registro» | `imagen-publica` o `imagen-privada`, **derivada**: si se declaró credencial es privada, si no es pública |
| **Imagen del almacén local** | «La imagen ya está en este servidor» | `imagen-local`. Es la sexta variante, incorporada el 2026-07-31 |
| **Definición local** | «Quiero tomar una imagen publicada y ajustarla con un archivo de construcción declarado acá» | `dockerfile` |

**La variante se deriva y no se elige.** El administrador declara una dirección de registro y, si hace falta, una credencial; el panel deriva si el origen es público o privado. `RN-08` **no se toca**: sigue validando la variante derivada, exigiendo sus campos propios y ninguno de otra variante. Lo que cambia es quién produce el valor de `tipo`, no qué se valida.

**La reversión de una decisión de composición propia, declarada.** La versión 2.1 de este wireframe fundaba la grilla de tarjetas en un argumento explícito: «siete opciones que hay que comparar antes de elegir necesitan verse juntas, y un desplegable las esconde». Ese argumento **está atado al número**, y el número cambió:

| Vía de la versión 2.1 | Qué pasa con ella |
| --- | --- |
| Imagen de registro público · Imagen de registro privado | **Se funden en un valor del campo.** La variante se deriva de si hay credencial |
| Archivo de construcción en línea | **Es otro valor**, ahora llamado «definición local». `F-10` acotada lo conserva |
| Imagen del almacén local | **Es un valor nuevo**, y también una acción desde la superficie de imágenes (`SUP-18`) |
| Repositorio remoto | **Deja de ofrecerse.** `F-10` le retira esa mitad por redundante con el ejecutor de integración continua |
| Servicio sin origen | **Nunca fue una vía**: es este mismo formulario guardado en el paso del nombre. Ver §3.5 |
| Adoptar un contenedor existente · Desde el catálogo | **Salen del alta.** Son listados donde se elige, con superficie propia |

Quedan **tres valores de un campo**, y tres valores no se comparan en una grilla. Se declara la reversión en lugar de borrar el argumento anterior, porque es una decisión de composición que esta categoría había tomado y fundado, y un argumento retirado sin registro se vuelve a tomar la próxima vez.

**Adoptar y usar el catálogo pasan a ser acciones de sus listados.** El motivo es que **no son formularios**: en los dos el administrador elige un elemento de una lista y lo que sigue es la consecuencia de esa elección, no la declaración de un servicio desde cero. Cada una vive en la superficie que ya la aloja, y su resultado es un servicio:

| Operación | Dónde vive ahora | Qué produce | Qué no cambia |
| --- | --- | --- | --- |
| Adoptar un contenedor existente | [`SUP-10`](Wireframes-Descubrimiento-E-Incorporacion.md), como acción de la fila del candidato | Un servicio vinculado al contenedor existente, con el origen que la traducción deduzca | Los cuatro pasos del flujo y el paso obligatorio de clasificación de variables |
| Usar un ítem del catálogo | [`SUP-11`](Wireframes-Catalogo-De-Plantillas.md), como acción de la tarjeta del ítem | Uno o varios servicios con sus aristas, con el origen que declare la plantilla | La declaración de lo que se va a crear antes de confirmar, y la desvinculación de la plantilla |

**Una variante del modelo que ninguna superficie produce, declarada.** La variante `repositorio` **sigue en el modelo y en `RN-08`**, y el campo de esta superficie **no la ofrece**. Un servicio con ese origen es representable por importación o por dato migrado, y qué hace el despliegue con él no lo declara ninguna fuente: es la brecha `B-30` de `02-Especificacion-Funcional`, que esta superficie recoge como `B-UX-32` y **no resuelve**.

### 3.2 Lo que se pierde con el formulario, declarado

**Quien no sabe qué quiere ya no ve las opciones juntas.** Es una pérdida real y se declara en lugar de presentarse como una mejora sin costo: una grilla de tarjetas, con su descripción de qué resuelve cada una, le contaba al administrador qué le ofrece el producto antes de que tuviera que saber nada; un campo de tres valores no cuenta lo mismo con la misma fuerza.

Dos cosas la compensan, y las dos ya existen:

1. **El campo llega con el registro público de referencia ya puesto.** El valor «imagen de un registro» no arranca en blanco: el registro viene seleccionado, de modo que el camino frecuente empieza resuelto. Cuál es ese registro y si viene configurado de fábrica es la brecha `B-UX-29`, abierta.
2. **La exploración de registro de imágenes.** El administrador que no sabe la dirección de la imagen no tiene que saberla: explora ([`SUP-19`](Wireframes-Exploracion-De-Registro-De-Imagenes.md)) desde el propio apartado de origen. Es la decisión `Q-27`, cerrada el 2026-07-30.

**Lo que la compensación no cubre, dicho con precisión.** Las dos mitigaciones sirven a quien ya sabe que quiere una imagen. Al que no sabe si lo que quiere es una imagen, un contenedor que ya corre o una plantilla suya, el formulario **no se lo cuenta**: se lo cuentan el lienzo, cuya acción de agregar servicio convive con la entrada al descubrimiento y al catálogo en la navegación del proyecto, y el estado vacío del catálogo, que deriva a las otras entradas. Es la razón por la que `SUP-05` conserva las tres entradas al mismo nivel y no las anida bajo el alta: ver [`SUP-05`](Wireframes-Lienzo-Del-Proyecto.md) §3.1.

### 3.3 Las dos verificaciones son dos operaciones con dos informes

Es la distinción central de esta superficie y la que la versión anterior del producto no tenía: **había una sola noción de «validar» y no alcanzaba**.

| | Verificación del origen | Validación de la configuración |
| --- | --- | --- |
| Contra qué verifica | Un **sistema externo** —un registro de imágenes—, el **almacén local** del servidor, o el propio contenido del archivo de construcción | El **registro del sistema** y el **motor de contenedores** |
| Qué responde | Si lo declarado **existe y es alcanzable**, y con qué identidad | Si la configuración **cumple las reglas** del modelo y no colisiona con lo que ya hay |
| Cuándo corre | En el apartado del origen, a pedido | Al confirmar, y a pedido |
| Puede fallar por causas ajenas | **Sí** para el registro: la red, el registro caído, la credencial vencida. **No** para el almacén local, que es del propio servidor | **No**: todo lo que consulta es local |
| Bloquea guardar | **No** | **No** |
| Bloquea dejar pendiente de aplicar | **Sí** | **Sí** |
| Dónde vive su informe | Contiguo al apartado de origen | Al pie del formulario |

**Los dos informes declaran su propio alcance, y no es decorativo.** Un tilde sin decir qué se consultó es una afirmación sin evidencia. El informe de la configuración, en particular, **declara contra qué no verificó**: conoce los puertos de lo que el producto administra y los de los contenedores del motor, y **no** los de un proceso del sistema operativo que no corre en un contenedor. Afirmar «el puerto está libre en el host» sería falso un segundo después de emitirse.

### 3.4 Dato incorrecto y consulta imposible se ven distinto

Es la distinción que el administrador necesita para saber **qué hacer**, y presentarlas igual es el defecto que hay que no cometer: la acción es opuesta.

| Clase de fallo | Qué pasó | Qué muestra el informe | Acción que ofrece |
| --- | --- | --- | --- |
| **Dato incorrecto** | El sistema externo respondió, y lo declarado no existe | Resultado **fallido**, con la comprobación que falló y, cuando el sistema externo lo permite, **valores similares al declarado** | **Corregir el dato**, con el foco en el campo que lo produjo |
| **Consulta imposible** | El sistema externo no respondió | Resultado **indeterminado** y no fallido, con qué no se pudo consultar | **Reintentar**. No hay ningún campo que corregir y el formulario no marca ninguno |

**Tres consecuencias de composición:** el resultado indeterminado **no usa el lenguaje visual de error**, porque nada está mal; la acción primaria del informe es distinta en cada caso y no un genérico «volver a intentar»; y en el caso indeterminado **ningún campo del formulario queda marcado**, porque marcar uno afirmaría que ese dato es el problema.

**Una precisión que el valor de almacén local obliga.** Una imagen del almacén local que no está **no produce resultado indeterminado sino fallido**: el almacén es del propio servidor y la consulta sí respondió. El resultado indeterminado queda reservado a lo que el producto no puede alcanzar.

### 3.5 Guardar en cualquier punto, y qué queda cuando se guarda

**Se puede guardar en cualquier punto del formulario**, desde que hay un nombre declarado hasta antes de dejar pendiente. Lo que queda es un servicio en estado `borrador`.

| Propiedad del borrador | Qué implica para la superficie |
| --- | --- |
| Existe y es visible en el lienzo | El nodo aparece **desde que el nombre queda declarado**, no desde que se completó el alta |
| Está **incompleto de forma visible** | El indicador de avance conserva qué falta, y el nodo del lienzo lo señala |
| **No entra al conjunto de cambios pendientes** | El cajón no lo lista, y por lo tanto el lote sigue siendo aplicable |
| **No es aplicable** | La acción de dejar pendiente está deshabilitada hasta que las dos verificaciones estén en verde |
| Se puede retomar donde se dejó | Reabrir el alta desde el nodo del lienzo restituye el paso en el que estaba |

**El servicio sin origen es este formulario detenido en el nombre, y no un valor del campo.** El campo de origen queda sin resolver y el nodo borrador existe igual. La superficie lo dice con esas palabras y **no ofrece un cuarto valor «ninguno»**: ofrecerlo lo presentaría como una alternativa equivalente a las otras tres, y no lo es. La variante `ninguno` sigue en el modelo y la produce el guardado, no una elección.

**Cambio respecto de la versión 2.1, declarado porque cambia una condición.** La versión anterior decía que el nodo borrador existe «desde que se eligió la vía». Sin menú de vías, el primer acto que produce un objeto identificable es **declarar el nombre**, que es además el dato con el que el nodo se dibuja. Antes del nombre no hay nada que representar en el lienzo.

**La acción de guardar nunca está deshabilitada, y es deliberado.** Un formulario que no deja guardar hasta estar completo obliga al administrador a resolver todo de una sentada o a perder lo escrito. Esta superficie hace lo contrario: guardar siempre puede, y lo que las validaciones controlan es el paso siguiente.

**Y hay dos acciones de salida, no una.** «Guardar como borrador» y «dejar pendiente de aplicar» son cosas distintas y la superficie no las presenta como un único botón cuyo efecto depende del estado: son dos, y la segunda declara por qué está deshabilitada cuando lo está.

### 3.6 El delta de cada valor del campo de origen

Sólo el apartado de origen cambia según el valor. Los demás pasos del tronco son idénticos para los tres.

| Valor del campo | Qué pide el apartado de origen | Qué verifica su verificación |
| --- | --- | --- |
| Imagen de un registro | Dirección del registro —con el registro público de referencia ya puesto—, imagen, etiqueta, política de actualización y, **cuando el registro la exige, una credencial de registro** elegida por su nombre. Se pueden escribir o traer explorando ([`SUP-19`](Wireframes-Exploracion-De-Registro-De-Imagenes.md)) | Que la imagen y la etiqueta existan; devuelve el **digesto**. Con credencial declarada, **además que la credencial autentique** |
| Imagen del almacén local | La referencia de la imagen del almacén —nombre y etiqueta local— elegida de lo que el almacén tiene. **No hay campo de política de actualización**: esta variante no admite la política flotante | Que la imagen siga en el almacén; devuelve el **digesto**, que es su identidad real porque la etiqueta local puede reasignarse |
| Definición local | **Editor de contenido** del archivo de construcción, y argumentos de construcción | Que el contenido sea interpretable y **no lleve instrucciones de copia local** |

**Cuatro criterios que este apartado tiene que cumplir:**

1. **Nunca muestra campos de otra variante, ni deshabilitados.** Un campo de rama deshabilitado en el valor de imagen invita a preguntarse cómo habilitarlo. El valor del campo determina qué campos existen.
2. **La política de actualización no aparece en el valor de almacén local**, y su ausencia se declara con una línea que dice por qué: no hay registro remoto donde la etiqueta pueda moverse. **No se dibuja deshabilitada**, por el mismo criterio del punto anterior.
3. **El límite de la definición local se declara antes de escribir, no al fallar.** Sin contexto de construcción no se pueden copiar archivos locales: el valor sirve para tomar una imagen publicada y ajustarla, y **no** para producir una imagen a partir de código fuente propio. Decirlo después de que el administrador escribió veinte líneas es tarde.
4. **La credencial es un campo del valor de registro y no un valor aparte.** Declararla es lo que hace que la variante derivada sea privada; no declararla la deja pública. La superficie **no exhibe la variante derivada como un rótulo técnico**: lo que muestra es si hay credencial y cuál, que es lo que el administrador controla.

**El punto de entrada a la exploración.** En el valor **imagen de un registro**, el apartado ofrece, además de los campos, la acción de **explorar el registro configurado** y volver con registro, imagen y etiqueta ya declarados. Tres precisiones que sobreviven sin cambio a la unificación:

- **Explorar no es un cuarto valor del campo.** No cambia la variante de origen resultante, no agrega una variante y no deja huella en la procedencia.
- **Volver de la exploración no saltea la verificación.** El origen queda **completo y sin verificar**: la acción de verificar queda habilitada y la de dejar pendiente sigue deshabilitada. Entre elegir y confirmar puede haber pasado cualquier cosa, y es la verificación la que devuelve el digesto con el que el despliegue va a trabajar.
- **La acción convive con los campos y no los reemplaza.** El administrador que sabe la dirección la escribe; el que no la sabe explora. Presentar la exploración como único camino encarecería el caso frecuente.

**El almacén local tiene su propio punto de entrada, y viene de afuera.** El inventario de imágenes ofrece crear un servicio desde una imagen que ya está en el almacén: se abre esta superficie con el valor del campo ya puesto y la referencia ya declarada. Está especificado en [`SUP-18`](Wireframes-Imagenes.md) §3.6. Vale la misma regla que para la exploración: **el origen queda completo y sin verificar**.

### 3.7 La marca de no reproducible del almacén local

El origen `imagen-local` es **la única variante que marca al servicio como no reproducible**: al exportar el proyecto e importarlo en otra máquina, esa imagen no está.

| Propiedad de la marca | Cómo la trata esta superficie |
| --- | --- |
| **Derivada del origen** | Aparece en cuanto el campo toma el valor de almacén local, sin que el administrador la ponga |
| **No editable** | **No hay control que la active ni que la desactive.** No se dibuja una casilla deshabilitada: no está. Un control deshabilitado invita a buscar cómo habilitarlo |
| Visible en el servicio | Distintivo en el apartado de origen del alta, y después en el nodo del lienzo y en el panel lateral |
| Visible en el proyecto | El proyecto queda marcado cuando **al menos uno** de sus servicios lo está. Lo materializan [`SUP-05`](Wireframes-Lienzo-Del-Proyecto.md) y [`SUP-04`](Wireframes-Listado-De-Proyectos.md) |
| Con su camino de pago declarado | El distintivo enuncia cómo se retira: publicar la imagen en un registro y pasar a un origen de registro. **Enunciar la deuda sin su salida la vuelve un reproche** |

**El distintivo no usa el lenguaje visual de error ni el de atención.** No es un fallo ni una condición a resolver: es una propiedad declarada de lo que el administrador eligió, y el intake declara que la deuda **se acepta a cambio de costo**. Se exhibe como rótulo informativo con su texto, sin insignia de estado propia, con el mismo criterio con el que esta categoría trata las situaciones que el contrato visual del anexo E-18 no tiene fila para representar.

**Dónde se advierte con anticipación, y por qué acá no.** La advertencia relevante es **antes de exportar**, porque es ahí donde la consecuencia se materializa, y vive en [`SUP-15`](Wireframes-Exportacion-E-Importacion.md) §3.3. En el alta lo que corresponde es **declarar la propiedad**, no advertir de una operación que el administrador no está haciendo.

### 3.8 El alta no despliega, y desde esta versión eso son tres fases y no una

**El alta no despliega. Eso no cambia.** Lo que cambia es que «desplegar» dejó de ser una operación y pasó a ser tres, y conviene que esta superficie diga cuál de las tres es la que no hace.

| # | Fase | Qué hace | Quién la ejecuta |
| --- | --- | --- | --- |
| 1 | Obtener la imagen | Descargarla del registro, construirla desde la definición local, tomarla del almacén local, o encontrarla ya presente | El despliegue, nunca el alta |
| 2 | **Crear el contenedor** | Resolver variables, reservar la dirección y crear el contenedor con la configuración | El despliegue, nunca el alta. **Siempre el panel** |
| 3 | Poner en marcha | Arrancar el proceso y esperar su verificación de salud | El arranque, nunca el alta |

**El alta no hace ninguna de las tres.** Deja el servicio declarado y, cuando las dos verificaciones están en verde, lo pasa al conjunto de cambios pendientes. Las tres fases las gobiernan [`SUP-06`](Wireframes-Panel-Lateral-Del-Servicio.md) y [`SUP-05`](Wireframes-Lienzo-Del-Proyecto.md).

**Invariante que esta superficie hace cumplir en sus textos: crear el contenedor nunca sale del producto.** Lo único que puede vivir afuera es **construir la imagen**. La consecuencia de microcopy es directa y se declara porque la versión 2.1 la incumplía: la tarjeta de repositorio remoto decía «quiero que **el panel construya**», sin complemento, y así leída sugería que construir es lo que distingue a una opción, cuando el panel **siempre** crea contenedores y lo único que varía es de dónde sale la imagen.

**Regla de redacción que rige en toda esta superficie:** el verbo «construir» **nunca aparece sin complemento**, y su complemento es siempre **la imagen**. Para el contenedor el verbo es **crear**. Las dos entradas están en [`Glosario-UX.md`](../Glosario-UX.md) §2.

### 3.9 El primer minuto de uso, que era la brecha más grande de esta superficie

**Brecha `B-UX-23` cerrada el 2026-07-30.** Hasta la versión 2.0 esta sección declaraba el hueco así: un administrador que abre el alta por primera vez, en una instalación nueva, se encuentra con el catálogo vacío —el producto no trae contenido de fábrica, decisión D-16— y si no sabe la dirección de la imagen que quiere, ninguna de las vías lo lleva a ningún lado. El agente humano del proyecto decidió `Q-27`: **hay exploración**, y por lo tanto es una superficie nueva, [`SUP-19`](Wireframes-Exploracion-De-Registro-De-Imagenes.md).

**Qué cambia con la unificación, y qué no.** No cambia la respuesta: el camino sigue siendo la exploración, y su punto de entrada sigue viviendo en el apartado de origen, ahora en el único valor que lo admite. **Sí cambia una de las dos mitigaciones que la versión anterior declaraba**: «la vía de adoptar un contenedor existente va primera y no exige saber ninguna dirección» deja de ser una propiedad de esta superficie, porque la adopción salió del alta. La mitigación no desaparece —la adopción sigue estando y sigue sin exigir una dirección—, pero **se mudó de superficie**, y por eso §3.2 declara que quien no sabe qué quiere se entera en el lienzo y no acá.

**Lo que sigue abierto no es el camino sino su configuración**: dónde se configura el conjunto de registros explorables y si viene alguno de fábrica. Es la brecha `B-UX-29`, declarada en [`SUP-19`](Wireframes-Exploracion-De-Registro-De-Imagenes.md) §5.1, y su destinatario es el agente humano del proyecto. Con el alta unificada esa brecha **gana peso**: el registro público de referencia ya puesto es una de las dos compensaciones de la pérdida de §3.2, y si no viene configurado de fábrica, la compensación no ocurre.

---

## 4. Interacciones

| Acción | Disparador | Resultado esperado | Precondición |
| --- | --- | --- | --- |
| Abrir el alta | Acción de agregar servicio en el lienzo | Se presenta el formulario con el paso del nombre activo. **No hay menú previo de elección** | Existe el proyecto SelfHosted |
| Declarar el nombre | Campo | Se valida formato y unicidad en el proyecto. Se declara que el nombre es también el alias de resolución de nombres. **El servicio existe como borrador desde ese momento**, visible en el lienzo | Ninguna |
| Elegir de dónde sale la imagen | Campo de origen | El apartado presenta los campos del valor elegido **y ninguno de otra variante**. Cambiar de valor descarta los campos del anterior, con confirmación si había algo escrito | Ninguna |
| Declarar una credencial de registro | Campo del valor de registro | La variante derivada pasa a privada. **No hay control que elija la variante** | El valor del campo es imagen de un registro |
| Explorar el registro de imágenes | Acción del apartado de origen, **sólo en el valor de registro** | Se abre [`SUP-19`](Wireframes-Exploracion-De-Registro-De-Imagenes.md). Al volver, registro, imagen y etiqueta quedan declarados y el origen queda **completo y sin verificar** | Hay al menos un registro configurado: si no, la superficie declara el vacío con su motivo |
| Elegir una imagen del almacén local | Campo del valor de almacén local | La referencia queda declarada. **No aparece campo de política de actualización**, y el distintivo de no reproducible se enciende | El valor del campo es imagen del almacén local |
| Llegar con el origen ya puesto desde el inventario de imágenes | Acción de [`SUP-18`](Wireframes-Imagenes.md) | Se abre esta superficie con el valor del campo y la referencia ya declarados, y el origen **completo y sin verificar** | La imagen está en el almacén y la administra el producto |
| Verificar el origen | Acción contigua al apartado de origen | Se emite el informe con su alcance declarado y su resultado. **No bloquea guardar** | El origen declara lo que su variante exige |
| Corregir tras un fallo de dato | Acción del informe | El foco va al campo que produjo el fallo | El informe declaró dato incorrecto |
| Reintentar tras una consulta imposible | Acción del informe | Se repite la consulta. **Ningún campo queda marcado** | El informe declaró consulta imposible |
| Declarar las dimensiones | Campos, incluido el **comando de arranque** | Los puertos se gatean por el modo de red | Ninguna |
| Validar la configuración | Acción del pie | Se emite el informe regla por regla, con su alcance y con el nivel de cada hallazgo | Ninguna |
| Guardar como borrador | Acción **siempre habilitada** | El servicio queda en borrador, visible e incompleto en el lienzo, **fuera del conjunto de cambios pendientes** | Hay un nombre declarado |
| Guardar con el origen sin resolver | Acción de guardar | Queda el servicio sin origen, con la acción de resolverlo disponible. **No es un valor del campo**: es este formulario detenido | Hay un nombre declarado |
| Dejar pendiente de aplicar | Acción primaria | El servicio pasa a pendiente de aplicar y entra al conjunto de cambios. **No se despliega y no se arranca nada** | **Las dos verificaciones en verde** |
| Retomar un borrador | Acción del nodo del lienzo | Se reabre el alta en el paso en el que se dejó | El servicio está en borrador |
| Intentar quitar la marca de no reproducible | — | **No existe.** La marca se deriva del origen y no tiene control | — |
| Abandonar sin guardar | Cierre o acción secundaria | Se pide confirmación si hay algo declarado. Nada se persiste | Ninguna |

---

## 5. Estados

| Estado | Condición que lo produce | Representación esperada |
| --- | --- | --- |
| Formulario abierto, sin nombre | El alta se abrió | Paso del nombre activo, el resto del tronco visible y sin datos. La acción de dejar pendiente deshabilitada con su motivo |
| Origen sin elegir | Hay nombre y el campo de origen no tiene valor | El apartado muestra los tres valores y **ningún campo propio**. La acción de verificar deshabilitada con su motivo |
| Origen elegido, incompleto | El valor está elegido y faltan campos | Indicador de avance con el paso de origen marcado como pendiente. La acción de verificar deshabilitada con su motivo |
| Origen sin verificar | El origen está completo y no se verificó | Acción de verificar habilitada. La de dejar pendiente **deshabilitada, declarando que falta verificar** |
| Origen traído de la exploración | Se volvió de [`SUP-19`](Wireframes-Exploracion-De-Registro-De-Imagenes.md) con una imagen y una etiqueta elegidas | Los campos quedan completos con lo elegido, **el digesto que la exploración mostró no se presenta como verificado**, y no aparece ningún tilde. Es el estado «origen sin verificar» alcanzado por otro camino, y la superficie **no lo distingue visualmente**: distinguirlo sugeriría que un origen explorado vale más que uno escrito |
| Origen traído del inventario de imágenes | Se llegó desde [`SUP-18`](Wireframes-Imagenes.md) con una imagen del almacén elegida | Mismo tratamiento que el anterior, con el valor del campo ya puesto en almacén local y el distintivo de no reproducible encendido |
| Variante derivada privada | Se declaró una credencial de registro | El apartado exhibe **qué credencial usa, por su nombre y nunca su valor**. La variante derivada **no se rotula como término técnico** |
| Origen verificado | La verificación devolvió resultado verificado | Informe con su alcance y sus comprobaciones en verde. Para los dos valores de imagen, **el digesto obtenido** |
| Origen fallido por dato incorrecto | El sistema externo o el almacén respondió y lo declarado no existe | Informe **fallido**, con la comprobación que falló, valores similares cuando los haya, y acción de corregir con foco en el campo |
| Origen indeterminado por consulta imposible | El registro no respondió | Informe **indeterminado**, sin lenguaje visual de error, con acción de reintentar y **sin ningún campo marcado**. **No aplica al almacén local** |
| Servicio marcado como no reproducible | El valor del campo es almacén local | Distintivo informativo en el apartado de origen, **sin control que lo modifique**, con el camino de pago enunciado |
| Configuración sin validar | El formulario tiene datos y no se validó | Informe ausente, con la acción de validar disponible |
| Configuración validada | Todas las reglas en verde | Informe con su alcance, **incluido contra qué no verificó** |
| Configuración con hallazgos bloqueantes | Alguna regla falló con nivel bloqueante | Informe con el hallazgo señalado, su detalle y su regla. La acción de dejar pendiente deshabilitada |
| Colisión de puerto de host | El puerto declarado ya lo publica otro servicio o un contenedor del parque | Hallazgo **bloqueante** con el servicio y el proyecto que lo ocupan, y el próximo puerto libre sugerido |
| Rechazo por campo ajeno a la variante | Llega por API un origen con un campo de otra variante | Rechazo con mensaje **distinto** del de campo faltante. En la interfaz no es alcanzable, porque el campo no existe |
| Borrador guardado | Se guardó sin completar | Confirmación que declara que el servicio quedó **visible en el lienzo, incompleto y fuera del conjunto de cambios** |
| Servicio sin origen guardado | Se guardó tras declarar sólo el nombre | Borrador con el origen declarado como no resuelto, y la acción de resolverlo disponible |
| Pendiente de aplicar | Se dejó pendiente con las dos verificaciones en verde | Confirmación que declara que el cambio entró al conjunto de cambios pendientes, **y que todavía no se desplegó ni se arrancó nada** |
| Puertos deshabilitados por modo de red | El servicio está en macvlan | El bloque de puertos publicados **no está disponible**, con el motivo declarado |
| Error | El formulario no pudo cargarse o persistirse | Banda de error con causa y acción de recuperación |
| Sin permiso | — | **No aplica** para el administrador. La única forma de que falte alcance es una credencial de máquina |

**Veintidós estados.** Los veintiuno primeros son demostrables; el último no se maqueta, por la misma razón que en el resto de la categoría. La versión 2.1 declaraba diecinueve: **se retiran dos** —«elección de vía» y «vía de adopción o de catálogo»—, que la unificación deja sin objeto, y **se suman cinco** —formulario abierto sin nombre, origen sin elegir, origen traído del inventario de imágenes, variante derivada privada, y servicio marcado como no reproducible—. El estado «tronco, origen sin resolver» de la versión anterior se parte en dos, «origen sin elegir» y «origen elegido, incompleto», porque con el campo de origen son dos situaciones con acciones distintas.

---

## 6. Versión responsive

La matriz de plataforma declara una única familia de navegador de escritorio y excluye navegadores móviles y pantallas pequeñas. Esta superficie **no tiene versión móvil especificada**.

- El tronco reflúye a una columna, con los dos informes conservando su posición relativa: el del origen contiguo a su apartado, el de la configuración al pie.
- El grupo de tres valores del campo de origen **no se colapsa a un desplegable por falta de ancho**: tres opciones en línea entran en el piso de reflujo, y esconderlas reintroduciría exactamente el problema que §3.2 declara.
- El editor de contenido de la definición local conserva su ancho mínimo y desplaza horizontalmente dentro de sí, sin producir desplazamiento de la página.

**Norma de diseño aplicada, no brecha.** El punto de quiebre principal alrededor de 768 px y el piso de 320 px sin desplazamiento horizontal los declara `Design-Rules-Web-Generico.md` §8, y esta superficie los aplica. Lo único delegado son los anchos de verificación de la etapa `b`.

---

## 7. Notas de implementación

**Accesibilidad.**

- El campo de origen es un **grupo de opciones con nombre accesible propio** —«de dónde sale la imagen»—, y cada opción incluye en su nombre accesible **qué resuelve**, no sólo su rótulo.
- Cambiar el valor del campo reemplaza los campos del apartado: el cambio se anuncia y el foco se lleva al primer campo del valor nuevo, para que quien no ve la sustitución sepa que ocurrió.
- El indicador de avance se expone como lista de pasos con su estado, no como decoración.
- Los dos informes son **regiones de estado**, anunciadas al completarse. El informe indeterminado **no se anuncia como alerta**: nada está mal.
- Cada hallazgo del informe de configuración declara la regla que lo produjo en su texto accesible, para que sea buscable.
- El digesto se expone completo al texto accesible aunque se muestre abreviado.
- El distintivo de no reproducible es **texto y no sólo un adorno**: se anuncia con su enunciado completo, incluido el camino de pago.
- La acción de dejar pendiente, cuando está deshabilitada, **declara por qué** en su descripción accesible.

**Performance percibida.** La verificación del origen contra un registro y la validación contra el motor **pueden tardar**: se muestran como operación con progreso, con la acción deshabilitada mientras corre, y con un límite tras el cual el resultado pasa a indeterminado en lugar de quedar colgado. La verificación contra el almacén local es una lectura del propio servidor y no necesita el mismo tratamiento.

**Internacionalización.** Nombres de imagen, etiquetas, digestos, referencias del almacén local, contenido del archivo de construcción y argumentos de construcción se muestran **literales y no se traducen**. Los rótulos del campo de origen y los textos de los informes sí se traducen.

---

## 8. Trazabilidad

| Dimensión | Referencia |
| --- | --- |
| Persona objetivo | Administrador único del producto: [`Vision-Producto.md`](../../00-Contexto/Vision-Producto.md) §2.1 |
| CU origen | [CU-03](../../02-Especificacion-Funcional/Casos-De-Uso/CU-03-Alta-Y-Configuracion-De-Servicio.md), [CU-13](../../02-Especificacion-Funcional/Casos-De-Uso/CU-13-Despliegue-Desde-Imagen-De-Registro.md), [CU-15](../../02-Especificacion-Funcional/Casos-De-Uso/CU-15-Despliegue-Construyendo-La-Imagen.md), [CU-16](../../02-Especificacion-Funcional/Casos-De-Uso/CU-16-Alta-Desde-Plantilla-Del-Catalogo.md) |
| Reglas de negocio relevantes | RN-01, RN-02, RN-06, RN-07, RN-08, RN-17, RN-19, RN-28, RN-32, RN-38. Regla conceptual RC-19 |
| Insumo del intake | **v3.5.** §4 capacidad `F-03`, `F-10` **acotada**, la nota del **tercer eje y el alta unificada**, la nota de **las tres fases del despliegue** y la de **construir la imagen contra crear el contenedor**; §19; anexo E-2 §20.2.1 a §20.2.5, con la **sexta variante `imagen-local`** y los dos informes de verificación; E-16 con `RN-08` en seis variantes. Filas 3.4 y 3.5 de su control de cambios |
| Marco de experiencia aplicado | [`Experiencia-De-Uso.md`](../Experiencia-De-Uso.md) §3.3 flujo FL-03, §4.3 el modo pendiente y la frontera de propuesta, §8.1 taxonomía de errores |
| Representaciones que invoca | [`Representacion-Nodo-De-Servicio.md`](../Representaciones/Representacion-Nodo-De-Servicio.md) y [`Representacion-Lenguaje-Visual-De-Estados.md`](../Representaciones/Representacion-Lenguaje-Visual-De-Estados.md), para el nodo borrador que el alta crea al declararse el nombre y para el distintivo de no reproducible |
| Catálogo de diseño aplicado | `Design-Rules-Web-Generico.md` §3.2, §4.2, §4.4, §4.6, §4.9, §4.10, §5, §8; `Design-Rules-Config-Esquema.md` §2, §4.1, §5; `Design-Rules-Blazor-Mudblazor.md` §4 |
| Superficies con las que se coordina | [`SUP-19`](Wireframes-Exploracion-De-Registro-De-Imagenes.md), que esta superficie invoca desde el apartado de origen en el valor de registro; [`SUP-18`](Wireframes-Imagenes.md), desde donde llega el valor de almacén local con su referencia; `SUP-05`, desde donde se abre. **`SUP-10` y `SUP-11` dejan de ser puntos de entrada de esta superficie**: adoptar y usar el catálogo son acciones propias de ellas |
| US a generar en 06 | US-CU-03-1 a US-CU-03-13, provisionales. `US-CU-03-12` y `US-CU-03-13` son las que `CU-03` 3.3 agrega por el alta unificada y la sexta variante |
| Tests previstos en 08 | Snapshot de los veintidós estados declarados; verificación de que **no existe menú de vías** y de que el origen es un campo de tres valores; verificación de que la variante pública o privada **se deriva de la credencial y no se elige**; verificación de que el valor de almacén local **no ofrece política de actualización**; verificación de que la marca de no reproducible **no tiene control que la modifique**; verificación de que guardar **nunca** está deshabilitado con un nombre declarado; verificación de que dejar pendiente lo está mientras falte una verificación; verificación de que el informe indeterminado **no** usa lenguaje visual de error y **no** marca ningún campo; verificación de que el apartado de origen no expone campos de otra variante; verificación de que la acción de explorar **sólo existe en el valor de registro**; verificación de que volver de la exploración o del inventario **no marca el origen como verificado**; verificación de que ningún texto de esta superficie usa «construir» con el contenedor por referente |
| Brechas que declara | **`B-UX-32` nueva**: la variante `repositorio` sigue en el modelo y **ninguna superficie la produce**; es la brecha `B-30` de `02-Especificacion-Funcional` vista desde la superficie. Recoge `B-UX-25` de `SUP-06`, el origen no editable (`Q-28`), **que la unificación no resuelve**: unificar el alta no abre un camino de edición del origen. Recoge `B-UX-24` de `SUP-05`, la señal visual del nodo borrador. Recoge `B-UX-29` de `SUP-19`, que **gana peso**: el registro público de referencia ya puesto es una de las dos compensaciones de la pérdida de §3.2. **`B-UX-23` sigue cerrada** |
| Maqueta de la Fase B2 | Nombre canónico `Alta de servicio`. **Se rehace desde esta especificación**: la maqueta tiene un archivo con ese nombre construido sobre la grilla de siete tarjetas, que ya no existe. Veintidós estados declarados, veintiuno demostrables |
| Fuente de la correspondencia | La fila «CU origen» reproduce la fila de esta superficie en [`Experiencia-De-Uso.md`](../Experiencia-De-Uso.md) §9.2, que es la **fuente única** de la correspondencia entre superficie y caso de uso. Se reproduce, y no se referencia, porque `Rules-UX-UI-DX.md` §4.2.1 punto 8 la exige como sección obligatoria del wireframe |

---

## 9. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 2.2 | 2026-08-01 | **Retroalimentación de la Fase B2: el alta se unifica.** Por la ronda de decisiones del agente humano del proyecto del 2026-07-31 y del 2026-08-01, consolidada en el `PRODUCT-INTAKE-SelfHosted-Service` **v3.5** §4 —`F-10` acotada, tercer eje y alta unificada, tres fases del despliegue, construir la imagen contra crear el contenedor— y anexo E-2 §20.2.3, y consumida de [`CU-03`](../../02-Especificacion-Funcional/Casos-De-Uso/CU-03-Alta-Y-Configuracion-De-Servicio.md) 3.3 y de la brecha `B-29` de [`02-Especificacion-Funcional`](../../02-Especificacion-Funcional/Especificacion-Funcional.md) §9, cuyo destinatario es esta categoría. Sube **minor**: ninguna sección se renumera por encima del segundo nivel, la superficie conserva su nombre canónico y su identificador, y las dos verificaciones, la distinción entre dato incorrecto y consulta imposible y el guardado en cualquier punto **no cambian de contenido**. **Desaparece el menú de siete tarjetas.** §1 y §2 declaran **una sola entrada**; el bloque de arte ASCII del paso 1 se retira y el del tronco se conserva con el campo de origen incorporado. **§3.1 se rehace entero**: el origen pasa a ser un **campo de tres valores** —imagen de un registro, imagen del almacén local y definición local—, con la variante `imagen-publica` o `imagen-privada` **derivada** de si hay credencial, y **se declara la reversión de una decisión de composición propia**: el argumento de «siete opciones que hay que comparar antes de elegir» estaba atado al número y el número cambió. Se declara además que **adoptar y usar el catálogo salen del alta** y pasan a ser acciones de `SUP-10` y `SUP-11`, y que la variante `repositorio` **sigue en el modelo y ninguna superficie la produce**. **§3.2 nueva: la pérdida declarada.** Quien no sabe qué quiere ya no ve las opciones juntas; se declara la pérdida, sus dos compensaciones —el registro público de referencia ya puesto y la exploración de `SUP-19`— y **lo que las compensaciones no cubren**. **§3.7 nueva: la marca de no reproducible** del origen `imagen-local`, derivada del origen, **no editable y sin control deshabilitado**, visible en el servicio y en el proyecto, con su camino de pago enunciado y con la advertencia previa delegada a `SUP-15`. **§3.8 nueva: las tres fases.** El alta sigue sin desplegar, y se declara cuál de las tres fases no hace; se declara la **invariante de que crear el contenedor nunca sale del producto** y la **regla de redacción** de que «construir» nunca aparece sin complemento y su complemento es siempre la imagen. **Barrido del verbo corrido sobre toda la superficie**: la única ocurrencia con el contenedor por referente era el texto de la tarjeta de repositorio remoto, «quiero que el panel construya», que se retira con la vía. **§3.6 reemplaza al delta por vía por el delta por valor del campo**, con cuatro criterios: no exponer campos de otra variante, la ausencia declarada de la política de actualización en el almacén local, el límite de la definición local declarado antes de escribir, y la credencial como campo y no como valor aparte. Suma el **punto de entrada desde el inventario de imágenes**. **§3.5** declara que el nodo borrador existe **desde que el nombre queda declarado** y no desde la elección de vía, y que el servicio sin origen **no es un cuarto valor** del campo. **§3.9** actualiza el primer minuto de uso: la respuesta no cambia, y **una de las dos mitigaciones se mudó de superficie** con la adopción. **§4 pasa de trece a dieciocho interacciones** y **§5 de diecinueve a veintidós estados**: se retiran dos, se suman cinco y uno se parte en dos, con el detalle en el cierre de §5. **§8** actualiza el insumo del intake a v3.5, las superficies con las que se coordina, las historias de usuario a `US-CU-03-13`, y suma seis verificaciones a los tests previstos. **Brecha nueva `B-UX-32`**, la variante `repositorio` sin superficie que la produzca, que es `B-30` de `02-Especificacion-Funcional` vista desde acá. **Ninguna decisión abierta se cerró acá**: `Q-28` sigue abierta y se declara que la unificación **no la resuelve**, y `Q-7`, `Q-8`, `Q-12` y `Q-13` siguen abiertas. **Ningún artefacto fuera de `03-UX-UI-DX` se tocó.** La versión 2.1 queda archivada en [`_legacy/2026-08-01/Wireframes-Alta-De-Servicio-v2.1.md`](_legacy/2026-08-01/Wireframes-Alta-De-Servicio-v2.1.md), con su bloque de archivado antepuesto y su cuerpo sin modificar. Ninguna fila anterior de este control de cambios se reescribió (`SDD-Development-Guide.md` §VI.2) |
| 2.2 | 2026-08-02 | **Corrección del hallazgo `P3-03` del informe de audit [`B2-Retroalimentacion-Decisiones-2026-08-01-r1.md`](../../Audit/B2-Retroalimentacion-Decisiones-2026-08-01-r1.md)**, veredicto RECHAZADO, **aplicada a una segunda ocurrencia que el informe no enumeró**. Absorbida **dentro de la versión de emisión, sin subir versión y sin archivar de nuevo**, por la política de versionado de `Master-Prompt.md` §5: el documento está en estado `Propuesto` y la corrección proviene del audit de su propia fase. **Qué dice el hallazgo y qué se encontró en disco.** `P3-03` se titula «Citas de versión de intake mezcladas dentro de `03`», nombra como archivo a [`Glosario-UX.md`](../Glosario-UX.md) §8.2 y sostiene su nivel sobre esta evidencia: «Los trece documentos restantes de `03` que la ronda toca citan el intake como **v3.5**». **La evidencia no se sostiene al contarla**: el barrido de la cadena `v3.` sobre los catorce documentos vivos de la categoría que la ronda del 2026-08-01 tocó, corrido el 2026-08-02, devuelve **una ocurrencia de `v3.4` en este wireframe**, en la nota antepuesta de la cabecera, además de la de `Glosario-UX.md`. El defecto es el mismo y de la misma clase, y corregir sólo una de las dos ocurrencias habría dejado el hallazgo cerrado a medias. **Qué se corrigió.** La nota antepuesta declaraba la decisión del alta unificada «consolidada en el `PRODUCT-INTAKE-SelfHosted-Service` **v3.4** §4», mientras la fila «Insumo del intake» de §8 declara **v3.5**: el mismo documento citaba dos versiones sin decir cuál es la vigente. La cita **resolvía** —la nota del tercer eje y el alta unificada entró efectivamente en la 3.4— y por eso es P3 y no un hallazgo de trazabilidad. Pasa a declarar que **el intake vigente es v3.5**, **conservando la mención de la 3.4 como la versión que originó la nota** y la constancia de que la 3.5 la conserva sin cambios, que es la recomendación literal del informe. **Alcance.** Se tocó **una sola oración de la nota antepuesta de la cabecera**. **Ninguna sección del cuerpo se tocó**: §1 a §8 no cambian una palabra. **Ninguna cifra cambia** —siguen dieciocho interacciones y veintidós estados, veintiuno demostrables—, **ninguna decisión abierta se cerró** —`Q-28`, `Q-7`, `Q-8`, `Q-12` y `Q-13` siguen abiertas—, **ningún valor plausible se completó** y **ninguna brecha se abrió ni se cerró**: `B-UX-32` sigue abierta. **Ningún artefacto fuera de este wireframe se tocó** por esta fila. **No se archivó nada de nuevo**: `Master-Prompt.md` §5.1 prohíbe tocar lo archivado, y el snapshot de la 2.1 ya estaba tomado. Ninguna fila anterior de este control de cambios se reescribió (`SDD-Development-Guide.md` §VI.2) |
| 2.2 | 2026-08-02 | **Aplicación de la regla de cita de la versión del `PRODUCT-INTAKE`, fijada por el orquestador el 2026-08-02.** Absorbida **dentro de la versión de emisión, sin subir versión y sin archivar de nuevo**, por la política de versionado de `Master-Prompt.md` §5: el documento está en estado `Propuesto`. **La regla, declarada en [`README.md`](../README.md) §4 de la categoría**, tiene dos mitades: la trazabilidad upstream de la cabecera cita la versión **vigente** del intake, y el cuerpo **conserva la versión que originó cada contenido**. **Nota antepuesta de la cabecera:** declaraba «el intake **vigente es v3.5**, que es el que declara §8 como insumo», que era cierto el 2026-08-02 por la mañana y **dejó de serlo** cuando el intake subió a **v3.6** y a **v3.7** ese mismo día. Pasa a declarar **v3.7**, leída del campo `Versión` de la cabecera del intake y no de memoria, y a distinguir explícitamente las dos mitades de la regla: la nota del tercer eje y el alta unificada **entró en la v3.4** y la **v3.5** la conserva sin cambios, y **§8 sigue declarando v3.5 como insumo** porque es la versión que originó este contenido. **§8 no se toca**: su fila «Insumo del intake» **conserva la v3.5**, y hacerla vigente destruiría la traza a la copia archivada en lugar de refrescarla. **Verificación de la ronda anterior:** el hallazgo `P3-03` del informe [`B2-Retroalimentacion-Decisiones-2026-08-01-r1.md`](../../Audit/B2-Retroalimentacion-Decisiones-2026-08-01-r1.md) se contrastó contra el disco y **estaba cerrado**, incluida la segunda ocurrencia que este documento declaró y que el informe no enumeraba. Esta fila **no lo reabre**: lo que cambia no es el defecto de mezcla que el hallazgo describía, sino la versión vigente, que se movió después. **Alcance:** una sola oración de la nota antepuesta. **Ninguna sección del cuerpo se tocó**: §1 a §8 no cambian una palabra. **Ninguna cifra cambia** —siguen dieciocho interacciones y veintidós estados, veintiuno demostrables—, **ninguna decisión abierta se cerró** —`Q-28`, `Q-7`, `Q-8`, `Q-12` y `Q-13` siguen abiertas—, **ningún valor plausible se completó** y **ninguna brecha se abrió ni se cerró**: `B-UX-32` sigue abierta. **Ningún artefacto fuera de este wireframe se tocó** por esta fila. **No se archivó nada de nuevo**: `Master-Prompt.md` §5.1 prohíbe tocar lo archivado, y el snapshot de la 2.1 ya estaba tomado. Ninguna fila anterior de este control de cambios se reescribió (`SDD-Development-Guide.md` §VI.2) |
| 2.1 | 2026-07-30 | **Retroalimentación del paso 6 de la Fase B2**, por la ronda de decisiones del agente humano del proyecto del 2026-07-30 consolidada en el `PRODUCT-INTAKE-SelfHosted-Service` **v3.2** §4, §19 y su fila de control de cambios, y consumida de [`CU-03`](../../02-Especificacion-Funcional/Casos-De-Uso/CU-03-Alta-Y-Configuracion-De-Servicio.md) 3.1 y [`CU-39`](../../02-Especificacion-Funcional/Casos-De-Uso/CU-39-Exploracion-Del-Registro-De-Imagenes.md) 1.0. Sube **minor**: **el menú de las siete vías, las dos verificaciones, la distinción entre dato incorrecto y consulta imposible y el guardado en cualquier punto no cambian de contenido**, y ninguna sección se renumera. **`PA-15` resuelto a favor de `SUP-17` como superficie propia.** §1 **retira la declaración de conflicto y la operación mecánica de reversión** que la acompañaba —mover el contenido a `SUP-06`, retirar este archivo y renumerar la superficie de imágenes— y deja en su lugar el registro del cierre con su fecha y su fuente. **No se reubica ningún contenido y no se renumera ninguna superficie**, que es exactamente lo que el intake v3.2 declara al cerrar el punto. El argumento que sostenía la superficie propia se conserva, porque sigue siendo la razón de la forma. **`Q-27` decidida: hay exploración de registro de imágenes.** §3.5 suma el **punto de entrada a [`SUP-19`](Wireframes-Exploracion-De-Registro-De-Imagenes.md)** en las vías **3 y 4** —imagen de registro público e imagen de registro privado—, con sus tres precisiones: explorar **no es una octava vía**, volver **no saltea la verificación**, y la acción **convive con los campos y no los reemplaza**; las dos filas de imagen de la tabla de deltas lo declaran; §2 suma la acción al bloque ASCII del tronco, sin alterar su ancho. **§3.6 pasa de brecha abierta a brecha cerrada**: `B-UX-23` se cierra, se declara cuál de las dos respuestas legítimas resultó ser, y se precisa que **lo que queda abierto no es el camino sino su configuración** —dónde se configura el conjunto de registros explorables—, que vive como `B-UX-29` en el wireframe de `SUP-19` y no se reabre acá. Las dos mitigaciones que la versión anterior declaraba **no se retiran**. **`DI-17`, `DI-18` y `DI-19` confirmadas**: §3.1 deja de declararlas «sin revisar» y las consume como `[D]` cerradas; **su contenido no cambió, cambió su estatus**. **§4** suma una interacción, la de explorar, y pasa a **trece**; se declara de paso que la cifra de «once interacciones» que la versión 1.0 enunciaba en su §1 **nunca coincidió con la tabla**, que tenía doce filas, y que el conteo de acá se verificó contra el disco. **§5** suma un estado, «origen traído de la exploración», y pasa a **diecinueve**, dieciocho demostrables, con la regla de que **no se distingue visualmente** del origen sin verificar alcanzado escribiendo. **§8** suma la fila de superficies con las que se coordina, actualiza el insumo del intake a v3.2, lleva las historias de usuario a `US-CU-03-11`, suma dos verificaciones a los tests previstos, declara `B-UX-23` cerrada y declara en la fila de maqueta que `PA-15` no deja reubicación pendiente. **Ninguna decisión abierta se cerró acá**: `Q-28`, el origen no editable, sigue abierta, y se declara explícitamente que **la exploración no la resuelve**. La versión 2.0 queda archivada en [`_legacy/2026-07-30/Wireframes-Alta-De-Servicio-v2.0.md`](_legacy/2026-07-30/Wireframes-Alta-De-Servicio-v2.0.md), con su bloque de archivado antepuesto y su cuerpo sin modificar. Ninguna fila anterior de este control de cambios se reescribió (`SDD-Development-Guide.md` §VI.2) |
| 2.0 | 2026-07-30 | **Migración normativa 4.1 → 6.0**, corte 4 de la fase M4, sobre el plan [`Plan-Migracion-4.1-a-6.0.md`](../../Audit/Plan-Migracion-4.1-a-6.0.md). Clasificación **regenerar contenido**, por el salto de `Rules-UX-UI-DX` 2.0 → 4.0. **Fuente de contenido: documento de origen**, más el [`PRODUCT-MANIFEST`](../../../Intake/PRODUCT-MANIFEST-SelfHosted-Service.md) §2 para el único campo de cabecera que se suma. Ninguna de las siete vías, ninguno de los dos informes, ninguna de las once interacciones ni ninguno de los dieciocho estados cambia de contenido: lo que cambia es la nomenclatura. Las nueve secciones obligatorias de `Rules-UX-UI-DX` 4.0 §4.2.1 ya estaban presentes y ninguna se agregó ni se reordenó. **Cabecera**: `**Proyecto:**` llevaba un valor del plano de negocio y pasa a `**Producto:**`, porque `Vocabulario-Rules.md` §3 prohíbe la etiqueta de un plano sobre el valor de otro; se suma `**Proyecto de código:** SelfHosted-Service`, que §4.1 de la regla vigente exige y que este documento no declaraba, con el valor **leído del manifiesto y no inferido**. **Vocabulario (`[5.0]`)**: «solución» pasa a «producto» en **2 ocurrencias** del referente de nivel superior —«el administrador de esta solución» en §3.1 y «Administrador único de la solución» en §8—, las dos con la concordancia de género corregida. Las **3 ocurrencias de «resolución»** —«alias de resolución de nombres» en §3, §4 y en el bloque ASCII de §2— **se contaron antes y después y siguen siendo 3**: no se tocaron, porque la cadena `soluci` vive dentro de la palabra y sustituirla produciría «reproducto». De las 11 ocurrencias de «proyecto», 1 era la etiqueta de cabecera y **10 no se tocaron**: 3 llevan la forma calificada «proyecto SelfHosted» (§1, §4 y el bloque ASCII del paso 1 de §2), 5 son «proyecto» a secas con referente de entidad del dominio y contexto ya fijado —«el lienzo del proyecto» en §1, «unicidad en el proyecto» en §3 y en §4, «incorporado por otro proyecto» en §3.5, «el servicio y el proyecto que lo ocupan» en §5— y 2 son «agente humano del proyecto», en §1 y en §3.6, que designa el emprendimiento. **Ninguna ocurrencia se promovió a «proyecto de código».** La sustitución se hizo por el procedimiento por ocurrencia de `Vocabulario-Rules.md` §9.5 y **nunca por reemplazo global de cadena**. Los dos bloques ASCII de §2 **conservan su ancho intacto**: la única palabra a migrar que contienen es «resolucion», que no se sustituye. Los nombres canónicos de superficie —`SUP-17` y `Alta de servicio`, y las referencias a `SUP-05`, `SUP-06`, `SUP-10` y `SUP-11`— se conservan textualmente, porque `Deriva-Rules.md` exige que coincidan término por término con la línea de base visual. **Glosario (`[5.1]`)**: `Glosario-UX.md` pasa de recomendado a obligatorio para los ocho tipos D8 y §6 verifica ahora su existencia y su completitud además de la no duplicación; lo emite un lote posterior de esta migración, y los términos que este wireframe acuña —vía de alta como grilla de tarjetas, informe de verificación del origen, informe de validación de la configuración, resultado indeterminado, indicador de avance— se devolvieron para que ese lote los consuma sin redefinir los que ya están en `Glosario-Funcional.md` de 02. Ninguna fila anterior de este control de cambios se reescribió (`SDD-Development-Guide.md` §VI.2) y el bloque de procedencia del destino no se tocó: sigue declarando 4.1, y cerrarlo es trabajo de M5 |
| 1.0 | 2026-07-29 | Versión inicial. **Superficie nueva `SUP-17`**, emitida por §22.5 del documento de trabajo `SDD/Estado/Redefinicion-Servicio.md` v2.0. Hasta esta versión el alta de servicio **no tenía wireframe**: vivía repartida entre `SUP-05` y `SUP-06`, y §1 declara que ese reparto es el origen del defecto que la Fase B2 destapó —había disparador y no había destino—. §1 declara además que el número `SUP-17` que el documento de trabajo usa **no existía en ninguna parte** y que coincide por ser el siguiente libre. Especifica el **menú de las siete vías como primer paso y no como campo**, con los cuatro criterios que tiene que cumplir; las **dos verificaciones como dos operaciones con dos informes**, con la tabla que las separa en siete dimensiones; la distinción entre **dato incorrecto y consulta imposible** con sus tres consecuencias de composición; el **guardado en cualquier punto** con las cinco propiedades del borrador y el criterio de que guardar nunca esté deshabilitado; el **delta de cada vía** en el bloque de origen, con la prohibición de exponer campos de otra variante aunque sea deshabilitados; y la brecha `B-UX-23`, que es el primer minuto de uso del producto. Declara dieciocho estados |
