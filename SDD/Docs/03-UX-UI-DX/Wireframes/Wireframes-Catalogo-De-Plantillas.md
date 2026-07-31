# Wireframes — Catálogo de plantillas

**Proyecto de código:** SelfHosted-Service
**Producto:** SelfHosted Service
**Documento:** Wireframes-Catalogo-De-Plantillas.md
**Versión:** 2.1
**Estado:** Propuesto
**Fecha:** 2026-07-30
**Autor:** UX/UI Designer + Frontend Lead (AG-03)
**Variante:** UX/UI

---

## Tabla de contenido

- [1. Pantalla y propósito](#1-pantalla-y-propósito)
- [2. Layout](#2-layout)
- [3. Componentes principales](#3-componentes-principales)
  - [3.1 Deshacer la confusión desde el encabezado](#31-deshacer-la-confusión-desde-el-encabezado)
  - [3.2 El catálogo es una vía de alta, no un origen](#32-el-catálogo-es-una-vía-de-alta-no-un-origen)
  - [3.3 Los parámetros y su descriptor](#33-los-parámetros-y-su-descriptor)
  - [3.4 La higiene informa, nunca impide](#34-la-higiene-informa-nunca-impide)
  - [3.5 Las dos operaciones, separadas en la superficie](#35-las-dos-operaciones-separadas-en-la-superficie)
  - [3.6 El editor de plantilla es el alta menos la cola de despliegue](#36-el-editor-de-plantilla-es-el-alta-menos-la-cola-de-despliegue)
  - [3.7 La conversión de secretos al guardar como plantilla](#37-la-conversión-de-secretos-al-guardar-como-plantilla)
  - [3.8 El estado vacío deriva a las otras vías de alta](#38-el-estado-vacío-deriva-a-las-otras-vías-de-alta)
- [4. Interacciones](#4-interacciones)
- [5. Estados](#5-estados)
- [6. Versión responsive](#6-versión-responsive)
- [7. Notas de implementación](#7-notas-de-implementación)
- [8. Trazabilidad](#8-trazabilidad)
- [9. Control de cambios](#9-control-de-cambios)

---

## 1. Pantalla y propósito

**Nombre canónico de la superficie: `Catálogo de plantillas`** (`SUP-11`).

Su tarea es que el administrador convierta en activo reutilizable algo que ya resolvió una vez, y que después lo instancie en un proyecto SelfHosted con sus parámetros. Corresponde a la ruta `/catalogo` del mapa de navegación del anexo E-18.

Esta superficie carga con **la confusión más probable del producto después de la de guardar y desplegar**: «catálogo de servicios» se lee como servicios corriendo. La composición y el microcopy están diseñados para deshacerla desde el primer vistazo.

---

## 2. Layout

Superficie del shell de trabajo, con grilla de tarjetas de acceso y flujo de instanciación en dos pasos.

```text
+-----------------------------------------------------------------------+
| [=] <titulo del panel>      <identidad>  [Cambiar contrasena] [Salir] |
+---------+-------------------------------------------------------------+
| Lienzo  |  Catalogo de plantillas               [ + Nueva plantilla ] |
| Logs    |  <subtitulo: definiciones en reposo. Nada de aca corre       |
| Metr.   |   hasta instanciarse>                          ^ unica prim. |
| Ajustes |  ---------------------------------------------------------  |
|         |  [ buscar... ] [ categoria v ]  [ Exportar ] [ Importar ]   |
|         |  ---------------------------------------------------------  |
|         |  +------------------+  +------------------+                 |
|         |  | [icono]          |  | [icono]          |                 |
|         |  | <nombre>         |  | <nombre>         |                 |
|         |  | <categoria>      |  | <categoria>      |                 |
|         |  | <n> servicios    |  | <n> servicios    |                 |
|         |  | version <v>      |  | version <v>      |                 |
|         |  | [Instanciar][..] |  | [Instanciar][..] |                 |
|         |  +------------------+  +------------------+                 |
+---------+-------------------------------------------------------------+


Instanciacion, paso de parametros

+- Instanciar "<nombre>" en <proyecto SelfHosted> ------ X -+
|  <n> servicios y <m> enlaces se van a crear.              |
|                                                           |
|  <etiqueta del parametro>                                 |
|  [ campo                                               ]  |
|  <etiqueta del parametro>                                 |
|  [ campo                                               ]  |
|  <etiqueta del parametro>            [ generar ]          |
|  [ campo                                               ]  |
+-----------------------------------------------------------+
| [ Cancelar ]                              [ Instanciar ]  |
+-----------------------------------------------------------+
```

Grilla de tarjetas de acceso, patrón §4.2 del documento base: ícono en contenedor, título, descripción corta y área clicleable completa. Un único botón primario en la pantalla.

---

## 3. Componentes principales

| Componente | Propósito | Datos que muestra | Comportamiento |
| --- | --- | --- | --- |
| Encabezado de la sección | Nombra la superficie y deshace la confusión | Título y subtítulo | Ver §3.1 |
| Barra de filtros y acciones de archivo | Acota el listado y exporta o importa el catálogo completo | — | Exportar e importar son acciones secundarias del encabezado, no de cada ítem |
| Tarjeta de ítem | Es la unidad del catálogo | Nombre, categoría, **cantidad de servicios del subgrafo** y versión de contenido del ítem | Área clicleable completa hacia el detalle |
| Contador de servicios del ítem | Hace visible que un ítem puede contener más de un servicio | Cantidad de nodos del subgrafo | Ver §3.2 |
| Acción de instanciar | Abre el flujo de instanciación | — | Pregunta en qué proyecto SelfHosted, si no se llegó desde uno |
| Formulario de parámetros | Recoge los valores que la plantilla declara | Por parámetro: etiqueta, control según el tipo, marca de obligatorio y valor por defecto cuando el ítem lo declara | Ver §3.3 |
| Declaración de lo que se va a crear | Previsualiza el alcance antes de confirmar | Cantidad de servicios y de enlaces que la instanciación va a crear | Es la previsualización que la frontera de propuesta exige, acotada a esta operación |
| Panel de avisos de higiene | Informa condiciones detectadas al instanciar | Las detecciones que la instanciación produce | **Ninguna bloquea.** Ver §3.4 |

### 3.1 Deshacer la confusión desde el encabezado

El intake declara tres cosas sobre el catálogo, y las tres tienen que leerse en la superficie sin abrir nada:

1. **Nada del catálogo corre.** Sus ítems son definiciones en reposo: no tienen despliegue, no tienen contenedor, no ocupan dirección y no aparecen en el lienzo de ningún proyecto SelfHosted hasta instanciarse. La superficie **no exhibe ningún par de estado de ejecución**, y ésa es la señal más fuerte: donde otras superficies muestran una insignia de estado, ésta no muestra nada.
2. **El catálogo arranca vacío** en una instalación nueva. El producto no se distribuye con contenido precargado. El estado vacío no es una anomalía y su texto no puede sugerirlo.
3. **Un ítem contiene un subgrafo, no un servicio.** Puede contener uno o varios servicios con sus aristas.

### 3.2 El catálogo es una vía de alta, no un origen

El intake es explícito: el catálogo es **una de las siete vías de alta de un servicio y no un origen**. Un ítem es una plantilla parametrizada que, al instanciarse, resuelve a una de las **cinco** variantes de origen.

La consecuencia de diseño está tomada en [`Wireframes-Alta-De-Servicio.md`](Wireframes-Alta-De-Servicio.md) §3.1: en el menú de vías, «Desde el catálogo» aparece **al mismo nivel** que las otras seis, no dentro de ninguna. Esta superficie es la otra puerta de entrada al mismo flujo.

**Precisión de la versión 1.1.** La versión 1.0 decía «cuarta vía de alta» sobre «tres orígenes reales». El ordinal contaba vías y orígenes en la misma lista, que es el defecto que la redefinición del alta corrigió: son **dos ejes independientes**, siete vías y cinco variantes de origen, y ninguno es un subconjunto del otro.

### 3.3 Los parámetros y su descriptor

Los parámetros de un ítem son el único caso de este producto en que **el intake sí declara el contrato del descriptor de forma explícita**: el anexo E-6 declara, por parámetro, su clave, su etiqueta, su tipo, si es obligatorio, su valor por defecto y si el sistema puede generarlo.

En consecuencia, esta superficie **sí puede aplicar el patrón de campo dirigido por descriptor sin brecha** para los parámetros: la etiqueta, el control, la marca de obligatorio y el valor por defecto salen del ítem y no se escriben en la pantalla. Lo que sigue faltando, igual que en el resto del producto, es la leyenda y los ejemplos, que ningún descriptor de este producto declara: brecha `B-UX-04`.

El parámetro de tipo secreto con marca de generación lleva su acción de generar contigua al campo, y su valor **no se muestra en claro después de guardado**.

### 3.4 La higiene informa, nunca impide

Al instanciar, el sistema puede detectar tres condiciones y **ninguna bloquea**:

| Condición | Qué hace el sistema |
| --- | --- |
| El nombre de un servicio del subgrafo ya existe en el proyecto SelfHosted destino | **Lo sufija automáticamente e informa cuál asignó. No rechaza y no pregunta** |
| Una clave de variable compartida ya existe con el mismo valor | **Crea el objeto nuevo y advierte que probablemente convenga compartir, ofreciendo reusar** |
| Una clave de variable compartida ya existe con distinto valor | **Crea separadas y avisa, sin ofrecer reusar**: casi seguro son cosas distintas |

Es la inversión que el intake declara: en lugar de preguntar antes de instanciar y obligar a decidir a ciegas, el sistema **crea separado, que es lo seguro, y después informa**. La decisión se toma con la información delante y es reversible, que es lo contrario de un diálogo que bloquea. **Ninguna de las tres puede materializarse como un diálogo modal que impida continuar.**

### 3.5 Las dos operaciones, separadas en la superficie

**Son operaciones de naturaleza distinta y la superficie las nombra distinto.** Instanciar produce **servicios que corren**; mantener produce **definiciones que no corren**. Confundirlas es lo que produce la pregunta «¿tomo un servicio del catálogo o doy de alta una plantilla en el catálogo?», que es la que el administrador hizo y que motivó esta versión.

| Operación | Dónde vive en la superficie | Qué produce | Caso de uso |
| --- | --- | --- | --- |
| **Instanciar** | Acción de cada tarjeta de ítem, y también desde el menú de vías del alta de servicio | Servicios en un proyecto SelfHosted, en estado pendiente de aplicar | CU-16 |
| **Mantener** | Acción primaria del encabezado y acciones secundarias de cada tarjeta —editar, borrar—, más exportar e importar | Definiciones en reposo. **Nada de esto corre** | CU-17 |

**Consecuencia de composición, y es la que evita el error de lectura:** las dos operaciones **no comparten fila de acciones**. Instanciar es la acción primaria de la tarjeta; editar, duplicar y borrar viven en su menú secundario. Un administrador que quiere «usar» una plantilla y uno que quiere «armarla» no pueden confundir el botón.

### 3.6 El editor de plantilla es el alta menos la cola de despliegue

Una plantilla es **el alta de un servicio sin la cola de despliegue**: declara lo mismo que un alta —origen, comando de arranque, variables, puertos, montajes, recursos, política de reinicio, verificación de salud— y no se instancia, no se despliega y no ocupa dirección.

**La consecuencia de diseño es que no hay superficie nueva que diseñar acá.** El editor de plantilla **reusa el formulario de [`Wireframes-Alta-De-Servicio.md`](Wireframes-Alta-De-Servicio.md)** quitándole exactamente tres cosas:

| Qué se quita | Por qué |
| --- | --- |
| La **validación de la configuración** contra el motor de contenedores | No hay nada que validar contra el motor: la plantilla no ocupa dirección ni puerto, y validar contra el estado actual de un servidor concreto haría la plantilla dependiente de ese servidor |
| La acción de **aplicar** | Una definición en reposo no se aplica |
| El **despliegue** y todo lo que lo acompaña —línea de tiempo, estado del contenedor, registros— | Nada del catálogo corre |

**Qué se agrega en su lugar:** el declarador de parámetros, que es lo que convierte los valores variables del formulario en huecos. Y una validación propia, que no es contra el motor sino contra la plantilla: **que todo hueco tenga su parámetro declarado, y que ningún parámetro quede sin uso**.

**La verificación del origen sí se conserva**, y conviene decir por qué: verificar que la imagen que la plantilla declara existe es útil al escribirla, no depende de ningún servidor concreto, y evita publicar una plantilla que va a fallar en su primer uso.

### 3.7 La conversión de secretos al guardar como plantilla

Es el paso que más valor tiene de esta superficie —convierte «armé algo que funciona» en «lo tengo para la próxima»— y el más delicado, porque el servicio del que se parte **tiene sus secretos cargados con valor real**.

**Lo que la superficie tiene que mostrar, y es lo que la vuelve confiable:**

1. **Qué variables secretas se convirtieron**, una por una, con su clave. No un mensaje genérico de «se procesaron los secretos».
2. **Que el valor se descartó**, dicho con esas palabras. Es la afirmación que hace la plantilla compartible, y el administrador tiene que poder leerla antes de exportar.
3. **Qué parámetros se propusieron** para los valores que varían —nombres, puertos, volúmenes—, editables antes de guardar.
4. **Cuántos valores se descartaron**, como contador, que es la contrapartida verificable del punto 2.

**Un parámetro de tipo secreto no admite valor por defecto**, y el control lo refleja: donde los otros tres tipos tienen campo de valor por defecto, el de tipo secreto tiene la marca de generación y **ningún campo de valor**. No es un campo deshabilitado con una explicación: **no está**. Un campo deshabilitado invita a preguntarse cómo habilitarlo.

### 3.8 El estado vacío deriva a las otras vías de alta

El catálogo arranca vacío en toda instalación nueva, y eso es la especificación y no una anomalía. **Pero una pantalla vacía que no deriva es un callejón**, y es el problema concreto que esta superficie tiene que no producir.

El estado vacío declara tres cosas:

1. **Que está vacío porque el producto no trae contenido de fábrica**, dicho con esas palabras, para que no se lea como un fallo de carga.
2. **Las dos formas de poblarlo**: guardar un servicio como plantilla, e importar un catálogo exportado.
3. **Que hay otras seis vías de alta**, con acceso directo a ellas. Esto es lo que lo convierte de callejón en desvío.

**Brecha `B-UX-23` cerrada el 2026-07-30, y el estado vacío declara una cuarta cosa.** Hasta la versión 2.0 el punto 3 mitigaba la mitad del problema y la otra mitad quedaba abierta: un administrador que **no sabe la dirección de la imagen que quiere** no tenía camino en ninguna de las otras vías tampoco, porque el producto no declaraba si existía alguna forma de explorar un registro de imágenes. Era la pendiente `Q-27`, y esta superficie declaraba las dos respuestas como legítimas —una superficie nueva, o una línea de ayuda— sin presumir ninguna.

**La respuesta fue que hay exploración**, y por lo tanto es la superficie nueva: [`SUP-19`](Wireframes-Exploracion-De-Registro-De-Imagenes.md). El estado vacío de esta superficie declara entonces **cuatro cosas y no tres**:

4. **Que la vía de imagen de registro no exige conocer la dirección**, porque su paso del origen ofrece explorar el registro configurado. Es lo que completa el desvío: hasta acá el estado vacío derivaba a seis vías de las cuales dos pedían un dato que el administrador podía no tener.

**El acceso directo del punto 3 no cambia de forma.** Sigue llevando al menú de vías del alta de servicio ([`SUP-17`](Wireframes-Alta-De-Servicio.md) §3.1) y **no** directamente a la exploración: elegir la vía es el primer paso del alta y saltearlo desde acá produciría dos recorridos distintos hacia la misma pantalla.

**Lo que queda abierto no es el camino sino su configuración.** Dónde se configura el conjunto de registros explorables y si viene alguno de fábrica es la brecha **`B-UX-29`**, declarada en [`SUP-19`](Wireframes-Exploracion-De-Registro-De-Imagenes.md) §5.1: de eso depende que el administrador que llega desde acá encuentre una lista de imágenes o un segundo estado vacío. Destinatario: agente humano del proyecto.

---

## 4. Interacciones

| Acción | Disparador | Resultado esperado | Precondición |
| --- | --- | --- | --- |
| Abrir el catálogo | Navegación desde la barra lateral | El sistema lista los ítems con su nombre, su categoría y su versión de contenido | Sesión iniciada |
| Agregar una plantilla | Acción primaria | Se declara un ítem nuevo | Sesión iniciada |
| Guardar como plantilla | Acción desde un proyecto SelfHosted | Un subgrafo ya resuelto en un proyecto se guarda como ítem, con sus servicios y sus aristas. **Cada variable secreta se convierte en parámetro de tipo secreto con generación automática, su valor se descarta, y la superficie informa cuáles convirtió** | Existe el subgrafo |
| Editar un ítem | Acción **secundaria** de la tarjeta, nunca la primaria | Se abre el editor de plantilla, que es el formulario de alta sin la cola de despliegue (§3.6). Al guardar, **se incrementa la versión de contenido del ítem**, que es distinta de la versión de formato, y **lo ya instanciado no se toca ni se notifica** | Existe el ítem |
| Borrar un ítem | Acción secundaria de la tarjeta | El ítem se borra. **No hay advertencia de «en uso» aunque existan servicios instanciados desde él**, porque no está en uso: el vínculo es débil y sólo en calidad de origen | Existe el ítem |
| Exportar el catálogo | Acción del encabezado | Se emite el archivo con el envoltorio versionado, y el informe **declara cuántos ítems contienen material sensible**. Si la conversión de secretos funcionó, ese contador es cero | Hay ítems |
| Importar un catálogo | Acción del encabezado | Los ítems se convierten a la versión de formato vigente, de forma determinista y sin pérdida. Lo que no se pueda representar **se declara en lugar de descartarse en silencio**. Un ítem cuyo identificador ya existe **se importa como copia con identificador nuevo, sin tocar el existente**, con aviso no bloqueante | Hay archivo |
| Instanciar un ítem | Acción de la tarjeta | Se abre el formulario de parámetros, con la declaración de cuántos servicios y enlaces se van a crear | Existe el proyecto SelfHosted destino |
| Confirmar la instanciación | Acción primaria del formulario | Se crean **tantos servicios y tantos contenedores como nodos tenga el subgrafo**, más los enlaces entre ellos. Los nodos aparecen en el lienzo en estado pendiente de aplicar | Los parámetros obligatorios están completos |
| Generar un parámetro secreto | Acción contigua al campo | El sistema genera el valor. **No se muestra en claro después de guardado** | El parámetro declara que puede generarse |
| Abandonar la instanciación | Acción secundaria o cierre | No se crea nada. **No queda un subgrafo a medio instanciar** | El formulario está abierto |

---

## 5. Estados

| Estado | Condición que lo produce | Representación esperada |
| --- | --- | --- |
| Vacío | El catálogo no tiene ítems | **Es el estado inicial de toda instalación nueva y no una anomalía.** Texto orientativo que lo dice con esas palabras, las dos vías de poblarlo —guardar un servicio como plantilla o importar un catálogo exportado— **y acceso directo a las otras seis vías de alta**, que es lo que lo convierte de callejón en desvío (§3.8) |
| Vacío por filtro | La búsqueda o el filtro no devuelven resultados | Estado vacío distinto, con la acción de limpiar el filtro |
| Cargando | El listado se está trayendo | Esqueleto de tarjetas |
| Con datos | Hay ítems declarados | Grilla de tarjetas, **sin ningún par de estado de ejecución** |
| Ítem de un solo servicio | El subgrafo tiene un nodo | Contador en uno. Al instanciar se crea un servicio y un contenedor, sin enlaces |
| Ítem de varios servicios | El subgrafo tiene más de un nodo | Contador con la cantidad. Al instanciar se crean N servicios, N contenedores y sus enlaces |
| Instanciando | La confirmación está en curso | Acción primaria deshabilitada con indicador de progreso |
| Nombre sufijado | Un nombre del subgrafo ya existía en el destino | Aviso que **informa cuál sufijo asignó**. No rechaza y no pregunta |
| Clave compartida existente con el mismo valor | Coincidencia de clave y valor | Aviso que **ofrece reusar**, sin bloquear |
| Clave compartida existente con distinto valor | Coincidencia de clave y no de valor | Aviso que **no ofrece reusar**, sin bloquear |
| Rechazo por nombre | El nombre no cumple el formato | Rechazo **con el campo señalado**. El nombre que ya existe **no es este caso**: se sufija sin rechazar |
| Rechazo por referencia inválida | Una expresión de la plantilla apunta a algo inexistente | Rechazo **señalando la expresión y la causa** |
| Rechazo por ciclo de valor | Las referencias de la plantilla forman un ciclo | Rechazo **con la cadena completa del ciclo** |
| Rechazo por formato no admitido | El archivo importado tiene una versión de formato que no está entre las admitidas | Rechazo |
| Importación con pérdida | Algo del archivo no se pudo representar | El sistema **lo declara en lugar de descartarlo en silencio** |
| Error | El listado no pudo traerse | Banda de error con causa y acción de recuperación |
| Secretos convertidos al guardar como plantilla | Se guardó como plantilla un servicio con variables secretas con valor | Informe que enumera **cada variable convertida por su clave**, declara que **el valor se descartó** y muestra el contador de valores descartados (§3.7) |
| Parámetro de tipo secreto en el editor | El parámetro declara tipo secreto | Marca de generación automática y **ausencia del campo de valor por defecto**. No es un campo deshabilitado: no está |
| Rechazo por valor por defecto sobre secreto | Llega por API un ítem con valor por defecto en un parámetro secreto | Rechazo con el campo señalado. En la interfaz el estado no es alcanzable, porque el campo no existe |
| Rechazo por tipo de parámetro | El tipo no pertenece al conjunto cerrado de cuatro valores | Rechazo con el campo señalado |
| Identificador ya existente al importar | El archivo trae un ítem cuyo identificador está en el catálogo | Aviso **no bloqueante** que declara que se importó **como copia con identificador nuevo** y que el existente no se modificó. El resto del archivo se importa igual |
| Exportación con material sensible | El contador de ítems con material sensible es mayor que cero | La superficie **lo declara antes de emitir el archivo**. Es la contrapartida verificable de la conversión de §3.7: si funcionó, este estado no ocurre |
| Borrado de un ítem con instancias | Existen servicios instanciados desde el ítem | Confirmación **normal de borrado, sin advertencia de «en uso»**. Un aviso de que hay instancias instalaría la expectativa de que el borrado las afecta, y no las afecta |
| Sin permiso | — | **No aplica** para el administrador. La única forma de que falte alcance es una credencial de máquina |

---

## 6. Versión responsive

La matriz de plataforma declara una única familia de navegador de escritorio y excluye navegadores móviles y pantallas pequeñas. Esta superficie **no tiene versión móvil especificada**.

- La grilla de tarjetas es fluida, con ajuste automático y ancho mínimo por tarjeta.
- El formulario de parámetros reflúye a una columna, conforme al criterio 1.4.10.
- La barra de filtros y acciones de archivo envuelve antes que comprimir sus controles.

**Norma de diseño aplicada, no brecha.** El punto de quiebre principal alrededor de 768 px y el piso de 320 px sin desplazamiento horizontal los declara `Design-Rules-Web-Generico.md` §8, y esta superficie los aplica. Lo único delegado son los **anchos de verificación**: en cuáles comprueba la etapa `b` el comportamiento y lo registra en su informe de cierre, según `Compatibilidad-Plataformas.md` §4. La brecha `B-UX-15`, que declaraba ausente la norma, se retiró por falsa; ver [`Experiencia-De-Uso.md`](../Experiencia-De-Uso.md) §10.2.1.

---

## 7. Notas de implementación

**Accesibilidad.**

- El nombre accesible de la tarjeta incluye la cantidad de servicios del subgrafo: es el dato que distingue un ítem simple de uno compuesto.
- El ícono del ítem es decorativo y se marca como tal.
- La etiqueta de cada parámetro es visible; el marcador de posición no sustituye al rótulo.
- Los avisos de higiene se anuncian como región de estado, no como alerta: informan y no interrumpen.
- El aviso de nombre sufijado **dice cuál nombre asignó**, porque es información que el administrador necesita para encontrar el servicio después.
- La acción de generar un parámetro secreto declara en su etiqueta accesible que el valor no se va a poder ver después.

**Performance percibida.** La instanciación crea N servicios y sus enlaces en una operación: se muestra como operación con progreso, y su resultado declara qué se creó.

**Internacionalización.** Los nombres de ítem, las categorías y los valores de parámetro se muestran literales. Las tres sintaxis que conviven en una plantilla —el hueco de parámetro del instanciador, la expresión de referencia del modelo y la interpolación del formato de composición— **no se traducen ni se reescriben en la interfaz**.

---

## 8. Trazabilidad

| Dimensión | Referencia |
| --- | --- |
| Persona objetivo | Administrador único del producto: [`Vision-Producto.md`](../../00-Contexto/Vision-Producto.md) §2.1 |
| CU origen | [CU-16](../../02-Especificacion-Funcional/Casos-De-Uso/CU-16-Alta-Desde-Plantilla-Del-Catalogo.md), [CU-17](../../02-Especificacion-Funcional/Casos-De-Uso/CU-17-Mantenimiento-Del-Catalogo.md), [CU-36](../../02-Especificacion-Funcional/Casos-De-Uso/CU-36-Revision-De-Higiene-Del-Registro.md), por las tres detecciones de higiene que §3.4 declara |
| Reglas de negocio relevantes | RN-01, RN-02, RN-15, RN-17, RN-21, RN-22, RN-24, RN-30, RN-34, RN-36, RN-37, RN-39 |
| Insumo del intake | **v3.2.** §4 capacidad F-14, su nota y la **nota de los dos ejes del alta** con la definición de plantilla y con `DI-17` a `DI-19` **confirmadas el 2026-07-30**; §19, la decisión `Q-27`; §12 glosario, entradas de catálogo, plantilla, subgrafo parametrizado, versión de contenido y versión de formato; anexos E-6 —incluidos §20.6.1 a §20.6.5— y E-10 |
| Marco de experiencia aplicado | [`Experiencia-De-Uso.md`](../Experiencia-De-Uso.md) §3.3 flujo FL-03, §3.9 fricciones transversales, §8.1 taxonomía de errores |
| Representaciones que invoca | Ninguna. La superficie **no exhibe estado de ejecución**, y eso es deliberado |
| Catálogo de diseño aplicado | `Design-Rules-Web-Generico.md` §3.2, §4.2, §4.4, §4.6, §4.9, §4.10, §5; `Design-Rules-Config-Esquema.md` §2, §4.1, §5; `Design-Rules-Blazor-Mudblazor.md` §4 y §4.1 |
| US a generar en 06 | US-CU-16-1 a US-CU-16-5, US-CU-17-1 a US-CU-17-7, provisionales |
| Tests previstos en 08 | Snapshot de los **veinticuatro** estados declarados; verificación de que el catálogo arranca vacío; verificación de que instanciar un ítem de dos nodos crea dos servicios y dos contenedores, y de que ningún contenedor aloja más de un servicio; verificación de que ninguna detección de higiene bloquea |
| Brechas que declara | `B-UX-04`, leyenda y ejemplos de los descriptores. **`B-UX-23` cerrada** el 2026-07-30: `Q-27` decidida, hay exploración, y la superficie que la brecha declaraba como una de las dos respuestas legítimas está emitida como `SUP-19`. **Recoge sin resolverla** la brecha `B-UX-29`, dónde se configura el conjunto de registros explorables, de la que depende qué encuentra el administrador que llega desde el estado vacío. **B-09 de `02-Especificacion-Funcional` ya no se recoge: está cerrada** por RN-15 v1.1, y §3.7 especifica el tratamiento |
| Maqueta de la Fase B2 | Nombre canónico `Catálogo de plantillas`. **Veinticuatro** estados declarados en §5, de los cuales veintitrés son demostrables: las filas marcadas no aplicable no se maquetan. **La cuenta no cambia con esta versión**: el estado vacío de primer uso pasa de declarar tres cosas a declarar cuatro, y sigue siendo un estado. **La maqueta se rehace desde esta especificación y no desde el documento de trabajo que la originó** |
| Fuente de la correspondencia | La fila «CU origen» reproduce la fila de esta superficie en [`Experiencia-De-Uso.md`](../Experiencia-De-Uso.md) §9.2, que es la **fuente única** de la correspondencia entre superficie y caso de uso. Se reproduce, y no se referencia, porque `Rules-UX-UI-DX.md` §4.2.1 punto 8 la exige como sección obligatoria del wireframe |

---

## 9. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 2.1 | 2026-07-30 | **Propagación de la retroalimentación del paso 6 de la Fase B2, por la decisión `Q-27`**, consolidada en el `PRODUCT-INTAKE-SelfHosted-Service` **v3.2** §19: **hay exploración de registro de imágenes**, y conocer la dirección de la imagen deja de ser requisito del usuario. Cierra la parte de la brecha `B-UX-30` que nombraba a esta superficie. Sube **minor**: las dos operaciones separadas de §3.5, el editor de plantilla resuelto por reuso de §3.6, la conversión de secretos de §3.7, las interacciones y los **veinticuatro estados no cambian de contenido**, y ninguna sección se renumera. **`B-UX-23` pasa de abierta a cerrada.** §3.8 declaraba que el punto 3 del estado vacío mitigaba **la mitad** del problema y que la otra mitad dependía de `Q-27`, con las dos respuestas declaradas como legítimas y ninguna presumida. La respuesta fue **que hay exploración**, y por lo tanto la superficie nueva: [`SUP-19`](Wireframes-Exploracion-De-Registro-De-Imagenes.md), emitida en esta misma ronda. **El estado vacío pasa a declarar cuatro cosas y no tres**: se suma que la vía de imagen de registro **no exige conocer la dirección**, que es lo que completa el desvío —hasta acá derivaba a seis vías de las cuales dos pedían un dato que el administrador podía no tener—. **El acceso directo del punto 3 no cambia de forma**: sigue llevando al menú de vías del alta y **no** directamente a la exploración, porque elegir la vía es el primer paso del alta y saltearlo produciría dos recorridos distintos hacia la misma pantalla. **Lo que queda abierto no es el camino sino su configuración**: dónde se configura el conjunto de registros explorables y si viene alguno de fábrica es la brecha `B-UX-29`, que esta superficie **recoge y no resuelve**, y de la que depende que el administrador que llega desde acá encuentre una lista de imágenes o un segundo estado vacío. **§8** actualiza el insumo del intake a v3.2, declara `B-UX-23` cerrada, recoge `B-UX-29`, y precisa que la cuenta de estados **no cambia**: el estado vacío de primer uso declara una cosa más y sigue siendo un estado. **Ninguna decisión abierta se cerró y ningún valor plausible se completó.** Ningún artefacto fuera de `03-UX-UI-DX` se tocó. La versión 2.0 queda archivada en [`_legacy/2026-07-30/Wireframes-Catalogo-De-Plantillas-v2.0.md`](_legacy/2026-07-30/Wireframes-Catalogo-De-Plantillas-v2.0.md), con su bloque de archivado antepuesto y su cuerpo sin modificar. Ninguna fila anterior de este control de cambios se reescribió (`SDD-Development-Guide.md` §VI.2) |
| 2.0 | 2026-07-30 | **Migración normativa 4.1 → 6.0**, corte 4 de la fase M4, sobre el plan [`Plan-Migracion-4.1-a-6.0.md`](../../Audit/Plan-Migracion-4.1-a-6.0.md). Clasificación **regenerar contenido**, por el salto de `Rules-UX-UI-DX` 2.0 → 4.0. **Fuente de contenido: documento de origen** —en su estado 1.1, que es el que dejó el fix de definiciones de servicio de la Fase B2—, más el [`PRODUCT-MANIFEST`](../../../Intake/PRODUCT-MANIFEST-SelfHosted-Service.md) §2 para el único campo de cabecera que se suma. Ni las dos operaciones de §3.5, ni el editor por reuso de §3.6, ni la conversión de secretos de §3.7, ni el estado vacío de §3.8, ni las once interacciones, ni los veinticuatro estados cambian de contenido: lo que cambia es la nomenclatura. Las nueve secciones obligatorias de `Rules-UX-UI-DX` 4.0 §4.2.1 ya estaban presentes y ninguna se agregó ni se reordenó. **Cabecera**: `**Proyecto:**` llevaba un valor del plano de negocio y pasa a `**Producto:**`, porque `Vocabulario-Rules.md` §3 prohíbe la etiqueta de un plano sobre el valor de otro; se suma `**Proyecto de código:** SelfHosted-Service`, que §4.1 de la regla vigente exige y que este documento no declaraba, con el valor **leído del manifiesto y no inferido**. **Vocabulario (`[5.0]`)**: se clasificaron 4 ocurrencias de «solución» y se sustituyeron **3** —«el único caso de esta solución» y «ningún descriptor de esta solución» en §3.3, y «Administrador único de la solución» en §8—, las tres con la concordancia de género corregida. **La cuarta no se sustituyó y es deliberado**: está en la fila `1.0` de este control de cambios, y `SDD-Development-Guide.md` §VI.2 prohíbe reescribir una fila histórica ya escrita. Es residuo declarado, no omisión. Este documento **no tiene ninguna ocurrencia de «resolución»**, y se deja constancia del barrido. De las 11 ocurrencias de «proyecto», 1 era la etiqueta de cabecera, **8 llevan la forma calificada «proyecto SelfHosted»** y no se tocaron por designar la entidad del dominio —incluida la del bloque ASCII del paso de instanciación—, **1 es «proyecto» a secas con referente de entidad del dominio** en §4 («un subgrafo ya resuelto en un proyecto») y **1 es «agente humano del proyecto»** en §3.8, que queda a secas por su referente de emprendimiento. **Ninguna ocurrencia se promovió a «proyecto de código».** La sustitución se hizo por el procedimiento por ocurrencia de `Vocabulario-Rules.md` §9.5 y **nunca por reemplazo global de cadena**. Los dos bloques ASCII de §2 **conservan su ancho intacto**: el segundo contiene «proyecto SelfHosted» dentro de su marco y no se modificó. Los nombres canónicos de superficie —`SUP-11` y `Catálogo de plantillas`— se conservan textualmente, porque `Deriva-Rules.md` exige que coincidan término por término con la línea de base visual. **Glosario (`[5.1]`)**: `Glosario-UX.md` pasa de recomendado a obligatorio para los ocho tipos D8 y §6 verifica ahora su existencia y su completitud además de la no duplicación; lo emite un lote posterior de esta migración, y los términos que este wireframe acuña —tarjeta de ítem, contador de servicios del ítem, declarador de parámetros, editor de plantilla, campo dirigido por descriptor, estado vacío por filtro— se devolvieron para que ese lote los consuma sin redefinir los que ya están en `Glosario-Funcional.md` de 02, en particular plantilla, versión de contenido, versión de formato, procedencia y aviso no bloqueante. Ninguna fila anterior de este control de cambios se reescribió (`SDD-Development-Guide.md` §VI.2) y el bloque de procedencia del destino no se tocó: sigue declarando 4.1, y cerrarlo es trabajo de M5 |
| 1.1 | 2026-07-29 | **Se rehace la superficie con las dos operaciones separadas y el editor de plantilla resuelto por reuso.** §3.2 corrige que el catálogo es **una de siete vías sobre cinco variantes** y no la cuarta sobre tres, con el motivo del cambio. **§3.5** separa las dos operaciones —instanciar produce servicios que corren, mantener produce definiciones que no corren— y declara la consecuencia de composición: **no comparten fila de acciones**, para que un administrador que quiere usar una plantilla y uno que quiere armarla no puedan confundir el botón. **§3.6** declara que el editor de plantilla **es el formulario de alta de servicio menos tres cosas** —validar contra el motor, aplicar y desplegar—, de modo que **no hay superficie nueva que diseñar acá**, con qué se agrega en su lugar y por qué la verificación del origen sí se conserva. **§3.7** especifica la conversión de secretos al guardar como plantilla, con las cuatro cosas que la superficie tiene que mostrar para que sea confiable, y con el criterio de que el campo de valor por defecto de un parámetro secreto **no está** en lugar de estar deshabilitado. **§3.8** especifica el estado vacío derivando a las otras seis vías, que es lo que lo convierte de callejón en desvío, y declara la brecha `B-UX-23` para la mitad que sigue abierta. §4 reformula cuatro interacciones y suma el borrado sin advertencia de «en uso». §5 pasa de diecisiete a **veinticuatro** estados. §8 suma RN-39, actualiza el insumo del intake y las historias de usuario, y **retira B-09 de las brechas recogidas porque está cerrada**. La versión 1.0 queda archivada en `_legacy/2026-07-29/`. Origen: §22.5 del documento de trabajo `SDD/Estado/Redefinicion-Servicio.md` v2.0 |
| 1.0 | 2026-07-29 | Versión inicial. Especifica el catálogo con su grilla de tarjetas y su flujo de instanciación en dos pasos; declara las tres afirmaciones del intake que la composición tiene que hacer legibles sin abrir nada, incluida la ausencia deliberada de todo par de estado de ejecución; declara que los parámetros del ítem son el único caso de la solución en que el contrato del descriptor está declarado por las fuentes; declara las tres detecciones de higiene de la instanciación y la prohibición de materializarlas como diálogo bloqueante; declara diecisiete estados |
| 1.0 | 2026-07-29 | Corrección del audit de la Fase B, absorbida dentro de la versión de emisión, sin subir versión y sin archivar, por la política de versionado de `Master-Prompt.md` §5: el documento está en estado `Propuesto` y la corrección proviene del audit de su propia fase. **H-06, P1:** la fila de casos de uso de §8 suma CU-36, por las tres detecciones de higiene que §3.4 ya declaraba. **H-14, P3:** §3.4 pasa de «dos condiciones» a tres, que es la cantidad real de filas de su tabla. Se suma la fila que declara la fuente única de la correspondencia. **Brecha `B-UX-15` retirada por falsa:** §6 deja de declarar ausente el punto de quiebre y cita la norma que `Design-Rules-Web-Generico.md` §8 sí declara, acotando lo delegado a los anchos de verificación de la etapa `b`. Origen: informe [`Audit/B-02-03-r1.md`](../../Audit/B-02-03-r1.md) |
