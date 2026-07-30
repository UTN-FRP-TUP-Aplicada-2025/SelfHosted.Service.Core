# Wireframes — Catálogo de plantillas

**Proyecto:** SelfHosted Service
**Documento:** Wireframes-Catalogo-De-Plantillas.md
**Versión:** 1.0
**Estado:** Propuesto
**Fecha:** 2026-07-29
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

El intake es explícito: el catálogo es la **cuarta vía de alta de un servicio y no un cuarto origen**. Un ítem es una plantilla parametrizada que, al instanciarse, resuelve a uno de los tres orígenes reales.

La consecuencia de diseño ya está tomada en [`Wireframes-Lienzo-Del-Proyecto.md`](Wireframes-Lienzo-Del-Proyecto.md) §3.1: en el menú de alta del lienzo, «Desde el catálogo» aparece **al mismo nivel** que los tres orígenes, no dentro de uno de ellos. Esta superficie es la otra puerta de entrada al mismo flujo.

### 3.3 Los parámetros y su descriptor

Los parámetros de un ítem son el único caso de esta solución en que **el intake sí declara el contrato del descriptor de forma explícita**: el anexo E-6 declara, por parámetro, su clave, su etiqueta, su tipo, si es obligatorio, su valor por defecto y si el sistema puede generarlo.

En consecuencia, esta superficie **sí puede aplicar el patrón de campo dirigido por descriptor sin brecha** para los parámetros: la etiqueta, el control, la marca de obligatorio y el valor por defecto salen del ítem y no se escriben en la pantalla. Lo que sigue faltando, igual que en el resto del producto, es la leyenda y los ejemplos, que ningún descriptor de esta solución declara: brecha `B-UX-04`.

El parámetro de tipo secreto con marca de generación lleva su acción de generar contigua al campo, y su valor **no se muestra en claro después de guardado**.

### 3.4 La higiene informa, nunca impide

Al instanciar, el sistema puede detectar tres condiciones y **ninguna bloquea**:

| Condición | Qué hace el sistema |
| --- | --- |
| El nombre de un servicio del subgrafo ya existe en el proyecto SelfHosted destino | **Lo sufija automáticamente e informa cuál asignó. No rechaza y no pregunta** |
| Una clave de variable compartida ya existe con el mismo valor | **Crea el objeto nuevo y advierte que probablemente convenga compartir, ofreciendo reusar** |
| Una clave de variable compartida ya existe con distinto valor | **Crea separadas y avisa, sin ofrecer reusar**: casi seguro son cosas distintas |

Es la inversión que el intake declara: en lugar de preguntar antes de instanciar y obligar a decidir a ciegas, el sistema **crea separado, que es lo seguro, y después informa**. La decisión se toma con la información delante y es reversible, que es lo contrario de un diálogo que bloquea. **Ninguna de las tres puede materializarse como un diálogo modal que impida continuar.**

---

## 4. Interacciones

| Acción | Disparador | Resultado esperado | Precondición |
| --- | --- | --- | --- |
| Abrir el catálogo | Navegación desde la barra lateral | El sistema lista los ítems con su nombre, su categoría y su versión de contenido | Sesión iniciada |
| Agregar una plantilla | Acción primaria | Se declara un ítem nuevo | Sesión iniciada |
| Guardar como plantilla | Acción desde un proyecto SelfHosted | Un subgrafo ya resuelto en un proyecto se guarda como ítem, con sus servicios y sus aristas | Existe el subgrafo |
| Editar un ítem | Acción de la tarjeta | Al guardar, **se incrementa la versión de contenido del ítem**, que es distinta de la versión de formato | Existe el ítem |
| Exportar el catálogo | Acción del encabezado | Se emite el archivo con el envoltorio versionado | Hay ítems |
| Importar un catálogo | Acción del encabezado | Los ítems se convierten a la versión de formato vigente, de forma determinista y sin pérdida. Lo que no se pueda representar **se declara en lugar de descartarse en silencio** | Hay archivo |
| Instanciar un ítem | Acción de la tarjeta | Se abre el formulario de parámetros, con la declaración de cuántos servicios y enlaces se van a crear | Existe el proyecto SelfHosted destino |
| Confirmar la instanciación | Acción primaria del formulario | Se crean **tantos servicios y tantos contenedores como nodos tenga el subgrafo**, más los enlaces entre ellos. Los nodos aparecen en el lienzo en estado pendiente de aplicar | Los parámetros obligatorios están completos |
| Generar un parámetro secreto | Acción contigua al campo | El sistema genera el valor. **No se muestra en claro después de guardado** | El parámetro declara que puede generarse |
| Abandonar la instanciación | Acción secundaria o cierre | No se crea nada. **No queda un subgrafo a medio instanciar** | El formulario está abierto |

---

## 5. Estados

| Estado | Condición que lo produce | Representación esperada |
| --- | --- | --- |
| Vacío | El catálogo no tiene ítems | **Es el estado inicial de toda instalación nueva y no una anomalía.** Texto orientativo que lo dice con esas palabras, más las dos vías de poblarlo: guardar un servicio como plantilla o importar un catálogo exportado |
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
| Persona objetivo | Administrador único de la solución: [`Vision-Producto.md`](../../00-Contexto/Vision-Producto.md) §2.1 |
| CU origen | [CU-16](../../02-Especificacion-Funcional/Casos-De-Uso/CU-16-Alta-Desde-Plantilla-Del-Catalogo.md), [CU-17](../../02-Especificacion-Funcional/Casos-De-Uso/CU-17-Mantenimiento-Del-Catalogo.md), [CU-36](../../02-Especificacion-Funcional/Casos-De-Uso/CU-36-Revision-De-Higiene-Del-Registro.md), por las tres detecciones de higiene que §3.4 declara |
| Reglas de negocio relevantes | RN-01, RN-02, RN-15, RN-17, RN-21, RN-22, RN-24, RN-30, RN-34, RN-36, RN-37 |
| Insumo del intake | §4 capacidad F-14 y su nota sobre la cuarta vía de alta; §12 glosario, entradas de catálogo y subgrafo parametrizado; anexos E-6 y E-10 |
| Marco de experiencia aplicado | [`Experiencia-De-Uso.md`](../Experiencia-De-Uso.md) §3.3 flujo FL-03, §3.9 fricciones transversales, §8.1 taxonomía de errores |
| Representaciones que invoca | Ninguna. La superficie **no exhibe estado de ejecución**, y eso es deliberado |
| Catálogo de diseño aplicado | `Design-Rules-Web-Generico.md` §3.2, §4.2, §4.4, §4.6, §4.9, §4.10, §5; `Design-Rules-Config-Esquema.md` §2, §4.1, §5; `Design-Rules-Blazor-Mudblazor.md` §4 y §4.1 |
| US a generar en 06 | US-CU-16-1 a US-CU-16-3, US-CU-17-1 a US-CU-17-4, provisionales |
| Tests previstos en 08 | Snapshot de los diecisiete estados declarados; verificación de que el catálogo arranca vacío; verificación de que instanciar un ítem de dos nodos crea dos servicios y dos contenedores, y de que ningún contenedor aloja más de un servicio; verificación de que ninguna detección de higiene bloquea |
| Brechas que declara | `B-UX-04`, leyenda y ejemplos de los descriptores. Recoge además B-09 de `02-Especificacion-Funcional`, sobre el tratamiento de material secreto dentro de una plantilla |
| Maqueta de la Fase B2 | Nombre canónico `Catálogo de plantillas`. Diecisiete estados declarados en §5, de los cuales dieciséis son demostrables: las filas marcadas no aplicable no se maquetan |
| Fuente de la correspondencia | La fila «CU origen» reproduce la fila de esta superficie en [`Experiencia-De-Uso.md`](../Experiencia-De-Uso.md) §9.2, que es la **fuente única** de la correspondencia entre superficie y caso de uso. Se reproduce, y no se referencia, porque `Rules-UX-UI-DX.md` §4.2.1 punto 8 la exige como sección obligatoria del wireframe |

---

## 9. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 1.0 | 2026-07-29 | Versión inicial. Especifica el catálogo con su grilla de tarjetas y su flujo de instanciación en dos pasos; declara las tres afirmaciones del intake que la composición tiene que hacer legibles sin abrir nada, incluida la ausencia deliberada de todo par de estado de ejecución; declara que los parámetros del ítem son el único caso de la solución en que el contrato del descriptor está declarado por las fuentes; declara las tres detecciones de higiene de la instanciación y la prohibición de materializarlas como diálogo bloqueante; declara diecisiete estados |
| 1.0 | 2026-07-29 | Corrección del audit de la Fase B, absorbida dentro de la versión de emisión, sin subir versión y sin archivar, por la política de versionado de `Master-Prompt.md` §5: el documento está en estado `Propuesto` y la corrección proviene del audit de su propia fase. **H-06, P1:** la fila de casos de uso de §8 suma CU-36, por las tres detecciones de higiene que §3.4 ya declaraba. **H-14, P3:** §3.4 pasa de «dos condiciones» a tres, que es la cantidad real de filas de su tabla. Se suma la fila que declara la fuente única de la correspondencia. **Brecha `B-UX-15` retirada por falsa:** §6 deja de declarar ausente el punto de quiebre y cita la norma que `Design-Rules-Web-Generico.md` §8 sí declara, acotando lo delegado a los anchos de verificación de la etapa `b`. Origen: informe [`Audit/B-02-03-r1.md`](../../Audit/B-02-03-r1.md) |
