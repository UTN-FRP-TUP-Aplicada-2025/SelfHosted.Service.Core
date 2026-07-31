# Wireframes — Variables compartidas del proyecto

**Proyecto de código:** SelfHosted-Service
**Producto:** SelfHosted Service
**Documento:** Wireframes-Variables-Compartidas-Del-Proyecto.md
**Versión:** 2.0
**Estado:** Propuesto
**Fecha:** 2026-07-30
**Autor:** UX/UI Designer + Frontend Lead (AG-03)
**Variante:** UX/UI

---

## Tabla de contenido

- [1. Pantalla y propósito](#1-pantalla-y-propósito)
- [2. Layout](#2-layout)
- [3. Componentes principales](#3-componentes-principales)
  - [3.1 La derivación de los campos](#31-la-derivación-de-los-campos)
  - [3.2 La clave no identifica](#32-la-clave-no-identifica)
  - [3.3 Lo que esta superficie no ofrece](#33-lo-que-esta-superficie-no-ofrece)
- [4. Interacciones](#4-interacciones)
- [5. Estados](#5-estados)
- [6. Versión responsive](#6-versión-responsive)
- [7. Notas de implementación](#7-notas-de-implementación)
- [8. Trazabilidad](#8-trazabilidad)
- [9. Control de cambios](#9-control-de-cambios)

---

## 1. Pantalla y propósito

**Nombre canónico de la superficie: `Variables compartidas del proyecto`** (`SUP-13`).

Su tarea es que el administrador declare una sola vez un valor que varios servicios usan, y que rotarlo después sea editar un único valor en lugar de acordarse de dos archivos. Es exactamente el dolor que el problema de negocio describe: hoy una credencial de base de datos obliga a escribirla y a mantenerla sincronizada en cada servicio.

**Pendencia declarada `B-UX-03`.** El anexo E-18 no maqueta esta pantalla, y `02-Especificacion-Funcional` lo transfiere como brecha B-07 a esta categoría. Como en el paso de clasificación de variables, **acá sí hay de dónde derivarlo**: el anexo E-1 declara los campos de una variable compartida, el cambio de entidad proyecto SelfHosted del anexo E-5 declara el campo de referencias y su efecto, el anexo E-10 nombra la ubicación de la superficie, y el catálogo de diseño aporta el patrón de grilla de listado y el de formulario de edición. Se especifica por derivación y se declara la derivación.

**Supuesto de ubicación `S-UX-02`.** El anexo E-10 la nombra en la variante de su paso 4 como «En el proyecto → Variables del proyecto», lo que la ubica **dentro del proyecto SelfHosted** y no en la configuración del sistema. Esta categoría toma esa ubicación. No figura en el mapa de navegación del anexo E-18, que es anterior a la decisión que la introdujo.

---

## 2. Layout

Superficie del shell de trabajo, alcanzable desde la navegación del proyecto SelfHosted abierto. Patrón de grilla de listado con formulario de edición.

```text
+-----------------------------------------------------------------------+
| [=] <titulo del panel>      <identidad>  [Cambiar contrasena] [Salir] |
+---------+-------------------------------------------------------------+
| Lienzo  |  Variables del proyecto                 [ + Nueva variable ] |
| Logs    |  <subtitulo: definidas una vez, usables desde cualquier      |
| Metr.   |   servicio del proyecto>                       ^ unica prim. |
| Ajustes |  ---------------------------------------------------------  |
|         |  [ buscar...                       ]                        |
|         |  ---------------------------------------------------------  |
|         |  Clave        Valor        Secreta  Usada por      Acciones |
|         |  ---------------------------------------------------------  |
|         |  <clave>      <valor>        no     <n> servicios  [ed][el] |
|         |  <clave>      ********       si     <n> servicios  [ed][el] |
|         |  <clave>      <valor>        no     (!) sin uso    [ed][el] |
|         |  ---------------------------------------------------------  |
|         |                                                             |
|         |  (i) <avisos de higiene, sin bloquear>                      |
+---------+-------------------------------------------------------------+


Formulario de edicion

+- <Nueva variable | Editar variable> ------------------ X -+
|  Clave                                                    |
|  [ campo                                               ]  |
|                                                           |
|  Valor                                                    |
|  [ campo                                               ]  |
|                                                           |
|  [ x ] Es secreta                                         |
|  <consecuencia declarada de marcarla>                     |
|                                                           |
|  Descripcion                                              |
|  [ campo                                               ]  |
+-----------------------------------------------------------+
| [ Cancelar ]                            [ Guardar cambio ]|
+-----------------------------------------------------------+
```

Un único botón primario en la pantalla. El pie del formulario sigue el patrón §4.4 del documento base, y su acción primaria lleva el **mismo verbo** que la del panel lateral del servicio: guardar un cambio lo agrega al conjunto pendiente y no lo aplica.

---

## 3. Componentes principales

| Componente | Propósito | Datos que muestra | Comportamiento |
| --- | --- | --- | --- |
| Encabezado de la sección | Nombra la superficie y explica qué es una variable compartida | Título y subtítulo descriptivo | Aloja la única acción primaria |
| Grilla de variables | Es la unidad de lectura | Por variable: clave, valor, marca de secreta, cantidad de servicios que la referencian y acciones | Patrón §4.3 del documento base |
| Celda de valor | Muestra el valor sin comprometerlo | El valor literal, o **enmascarado si la variable es secreta** | Una variable secreta **nunca se devuelve en claro por ninguna vía** |
| Columna de uso | Hace visible la propagación | Cantidad de servicios que referencian la variable, o la marca de sin uso | La cantidad se obtiene enumerando las variables con referencia y parseando sus ocurrencias: **no se deduce del grafo**, porque una referencia a una variable compartida no genera arista |
| Formulario de edición | Declara o modifica una variable | Clave, valor, marca de secreta y descripción | Los cuatro campos que el anexo E-1 declara |
| Consecuencia de marcar como secreta | Declara qué implica la marca antes de aplicarla | — | Cifrada en reposo, mostrada enmascarada, nunca devuelta en claro y **nunca escrita en una exportación** |
| Panel de avisos de higiene | Informa condiciones del registro sin bloquear | Las detecciones que alcanzan a esta superficie | Ver [`Wireframes-Revision-De-Higiene.md`](Wireframes-Revision-De-Higiene.md). **Ninguna bloquea** |
| Diálogo de rechazo por referencia | Impide dejar referencias colgando | **La lista de servicios y claves que referencian la variable** | Ver §3.2 |

### 3.1 La derivación de los campos

Se hace explícita para que sea impugnable. Los cuatro campos del formulario y las cinco columnas de la grilla salen de dos fuentes declaradas:

| Elemento de la superficie | De dónde se deriva |
| --- | --- |
| Clave | Campo de clave de la variable compartida, anexo E-1 |
| Valor | Campo de valor, anexo E-1. En una variable secreta el campo llega vacío y con referencia a secreto |
| Marca de secreta | Campo de secreta, anexo E-1 |
| Descripción | Campo de descripción, anexo E-1 |
| Cantidad de servicios que la referencian | Campo de referencias del cambio de entidad proyecto SelfHosted, anexo E-5 |
| Marca de sin uso | Detección de variable compartida huérfana de la revisión de higiene |

### 3.2 La clave no identifica

Es la regla menos intuitiva de esta superficie y la que más condiciona su diseño: **la clave de una variable compartida no exige unicidad dentro del proyecto SelfHosted**. Dos variables con la misma clave pueden coexistir, y cada referencia resuelve a su propio objeto, porque las relaciones se establecen por identidad y nunca por nombre.

Tres consecuencias de diseño:

1. **La grilla no puede usar la clave como identificador de fila.** Dos filas pueden llamarse igual, y el administrador tiene que poder distinguirlas: la descripción es lo que las diferencia, y por eso la columna de descripción no es opcional en la vista de detalle.
2. **Declarar una segunda variable con una clave existente no es un error.** Si además el valor coincide, el sistema **advierte que probablemente convenga compartir y ofrece reusar**, sin bloquear. Si el valor difiere, **crea separadas y avisa**, sin ofrecer reusar, porque casi seguro son cosas distintas.
3. **Eliminar una variable referenciada se rechaza** con la lista de servicios y claves que la referencian. El rechazo no es un aviso: la variable no se elimina y el cambio no entra al conjunto pendiente.

### 3.3 Lo que esta superficie no ofrece

- **No ofrece escribir una referencia en el valor de una variable compartida.** Una variable compartida contiene siempre un literal o material secreto; una referencia dentro de ella se rechaza. La superficie no dibuja el control que produciría ese rechazo.
- **No ofrece ver el valor de una variable secreta.** No hay acción de revelar: el valor no se devuelve en claro por ninguna vía, y ofrecer el control sería prometer lo que el sistema no hace.

---

## 4. Interacciones

| Acción | Disparador | Resultado esperado | Precondición |
| --- | --- | --- | --- |
| Abrir la superficie | Navegación desde el proyecto SelfHosted | El sistema devuelve las variables declaradas, **con los valores secretos enmascarados** | Existe el proyecto SelfHosted |
| Declarar una variable | Acción primaria | Se abre el formulario con los cuatro campos. Al guardar, el sistema valida el formato de la clave y persiste | Existe el proyecto SelfHosted |
| Marcar una variable como secreta | Casilla del formulario | Se declara la consecuencia. Al guardar, el valor queda cifrado en reposo | El formulario está abierto |
| Declarar una clave que ya existe con el mismo valor | Guardado del formulario | El sistema **crea el objeto nuevo y advierte que probablemente convenga compartir, ofreciendo reusar**. La operación no se bloquea | Existe otra variable con esa clave y ese valor |
| Declarar una clave que ya existe con distinto valor | Guardado del formulario | El sistema **crea separadas y avisa, sin ofrecer reusar** | Existe otra variable con esa clave y otro valor |
| Editar el valor de una variable referenciada | Guardado del formulario | El cambio **entra al conjunto de cambios pendientes con entidad de proyecto SelfHosted**, y el sistema enumera qué variable de qué servicio quedará obsoleta, marcando esos servicios como pendientes de redespliegue | La variable tiene referencias |
| Eliminar una variable sin referencias | Acción de la fila | Se elimina | La variable no tiene referencias |
| Eliminar una variable referenciada | Acción de la fila | **Rechazo con la lista de servicios y claves que la referencian.** No se elimina y el cambio no entra al conjunto | La variable tiene referencias |
| Escribir una referencia en el valor | Guardado del formulario | **Rechazo.** Una variable compartida contiene un literal o material secreto | — |
| Ver el valor de una variable secreta | — | **No existe.** No hay acción de revelar | — |
| Referenciar la variable desde un servicio | Panel lateral del servicio, pestaña de variables | La referencia se escribe allí, no acá. **No dibuja ninguna arista**, porque el proyecto SelfHosted no es un nodo del lienzo | Existe la variable |

---

## 5. Estados

| Estado | Condición que lo produce | Representación esperada |
| --- | --- | --- |
| Vacío | El proyecto SelfHosted no tiene variables compartidas declaradas | Estado vacío con texto orientativo y la acción de alta. Es una invitación a actuar |
| Vacío por filtro | La búsqueda no devuelve resultados | Estado vacío distinto, con la acción de limpiar el filtro |
| Cargando | El listado se está trayendo | Esqueleto de filas |
| Con datos | Hay variables declaradas | Grilla con las cinco columnas |
| Variable secreta | La variable está marcada como secreta | Valor **enmascarado**, marca activa, sin acción de revelar |
| Variable huérfana | Ninguna referencia la usa | Marca de sin uso en la columna de uso, y aviso de higiene. **No bloquea nada**: ni su creación ni el arranque del proyecto SelfHosted |
| Clave duplicada con el mismo valor | Se declaró una clave existente con el mismo valor | Aviso que **ofrece reusar**, sin bloquear. Se crea el objeto nuevo |
| Clave duplicada con distinto valor | Se declaró una clave existente con otro valor | Aviso que **no ofrece reusar**. Se crean separadas |
| Campo en error | El formato de la clave es inválido | Borde de error y mensaje inline con la regla violada |
| Rechazo por referencia | Se intentó eliminar una variable referenciada | Diálogo de rechazo **con la lista de servicios y claves que la referencian** |
| Rechazo por referencia en el valor | Se intentó escribir una expresión de referencia en el valor | Rechazo con la causa |
| Cambio guardado | Se guardó una edición | Acuse de que el cambio **quedó pendiente y no aplicado**. El contador del banner del lienzo sube |
| Con servicios marcados | Se editó el valor de una variable referenciada | La fila declara cuántos servicios quedaron pendientes de redespliegue por ese cambio |
| Error | El listado no pudo traerse, o una escritura falló | Banda de error con causa y acción de recuperación |
| Sin permiso | — | **No aplica.** Una sola identidad |

---

## 6. Versión responsive

La matriz de plataforma declara una única familia de navegador de escritorio y excluye navegadores móviles y pantallas pequeñas. Esta superficie **no tiene versión móvil especificada**.

- La grilla se desplaza dentro de su propio contenedor si el ancho no alcanza, sin que el cuerpo de la página se desplace en horizontal.
- La columna de clave y la de marca de secreta no se pliegan: son las que sostienen la lectura.
- El formulario de edición reflúye a una columna, conforme al criterio 1.4.10.

**Norma de diseño aplicada, no brecha.** El punto de quiebre principal alrededor de 768 px y el piso de 320 px sin desplazamiento horizontal los declara `Design-Rules-Web-Generico.md` §8, y esta superficie los aplica. Lo único delegado son los **anchos de verificación**: en cuáles comprueba la etapa `b` el comportamiento y lo registra en su informe de cierre, según `Compatibilidad-Plataformas.md` §4. La brecha `B-UX-15`, que declaraba ausente la norma, se retiró por falsa; ver [`Experiencia-De-Uso.md`](../Experiencia-De-Uso.md) §10.2.1.

---

## 7. Notas de implementación

**Accesibilidad.**

- La grilla es una tabla de datos con encabezados asociados. El nombre accesible de cada acción de fila **nombra la clave y la descripción de su variable**, porque dos filas pueden compartir clave.
- La marca de secreta lleva etiqueta textual además del control: no se comunica sólo por ícono.
- El valor enmascarado se anuncia como enmascarado, no como una cadena de asteriscos leída carácter por carácter.
- El diálogo de rechazo por referencia mueve el foco a su encabezado y su lista es recorrible por teclado.
- Los avisos de higiene se anuncian como región de estado, no como alerta: informan y no interrumpen.
- El mensaje de error inline se asocia al campo e indica la regla violada.

**Performance percibida.** La cantidad de servicios que referencian cada variable se resuelve por enumeración indexada, no por búsqueda de texto, de modo que el listado no degrada con el tamaño del proyecto SelfHosted.

**Internacionalización.** Las claves y los valores se muestran literales: son lo que el proceso dentro del contenedor lee. La descripción es prosa del administrador y se muestra tal cual.

---

## 8. Trazabilidad

| Dimensión | Referencia |
| --- | --- |
| Persona objetivo | Administrador único del producto: [`Vision-Producto.md`](../../00-Contexto/Vision-Producto.md) §2.1 |
| CU origen | [CU-34](../../02-Especificacion-Funcional/Casos-De-Uso/CU-34-Variables-Compartidas-Del-Proyecto.md) como origen principal; [CU-35](../../02-Especificacion-Funcional/Casos-De-Uso/CU-35-Valor-Expresado-Como-Referencia.md), [CU-36](../../02-Especificacion-Funcional/Casos-De-Uso/CU-36-Revision-De-Higiene-Del-Registro.md) |
| Reglas de negocio relevantes | RN-15, RN-17, RN-21, RN-22, RN-23, RN-27, RN-28, RN-33, RN-35, RN-37 |
| Insumo del intake | §4 capacidades F-23 y F-25; §17.P.5 cifrado de las variables compartidas; anexos E-1, E-5 cambio 4, E-10 variante del paso 4 |
| Marco de experiencia aplicado | [`Experiencia-De-Uso.md`](../Experiencia-De-Uso.md) §2.5 frontera aplicación y entorno, §3.3 flujo FL-03, §8.1 taxonomía de errores, §10.3 supuesto `S-UX-02` |
| Representaciones que invoca | Ninguna. La superficie no exhibe estado de despliegue |
| Catálogo de diseño aplicado | `Design-Rules-Web-Generico.md` §4.3, §4.4, §4.6, §4.9, §4.10, §5; `Design-Rules-Config-Esquema.md` §2.1 frontera, §4.1, §5, §8; `Design-Rules-Blazor-Mudblazor.md` §4 y §4.1 |
| US a generar en 06 | US-CU-34-1 a US-CU-34-4, provisionales |
| Tests previstos en 08 | Snapshot de los quince estados declarados; verificación de que una variable secreta no devuelve valor en claro por ninguna vía; verificación de que dos claves iguales coexisten y de que ninguna detección de higiene bloquea |
| Brechas que declara | `B-UX-03`, maquetado de la pantalla resuelto por derivación (B-07 de `02-Especificacion-Funcional`) |
| Maqueta de la Fase B2 | Nombre canónico `Variables compartidas del proyecto`. Quince estados declarados en §5, de los cuales catorce son demostrables: las filas marcadas no aplicable no se maquetan |
| Fuente de la correspondencia | La fila «CU origen» reproduce la fila de esta superficie en [`Experiencia-De-Uso.md`](../Experiencia-De-Uso.md) §9.2, que es la **fuente única** de la correspondencia entre superficie y caso de uso. Se reproduce, y no se referencia, porque `Rules-UX-UI-DX.md` §4.2.1 punto 8 la exige como sección obligatoria del wireframe |

---

## 9. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 2.0 | 2026-07-30 | Migración normativa del conjunto 4.1 al 6.0, fase M4 corte 4, bajo `Rules-UX-UI-DX` 4.0, `Vocabulario-Rules` 2.1 y `Migracion-Rules` 1.0. Clasificación **regenerar contenido** por el salto major de la regla que lo gobierna; fuente de contenido: **el documento de origen**, archivado sin modificar en `_legacy/2026-07-30/Wireframes-Variables-Compartidas-Del-Proyecto-v1.0.md`. Sube **major** porque la nomenclatura anterior deja de cumplir. **El nombre del archivo no cambia**: `Wireframes-Variables-Compartidas-Del-Proyecto.md` nombra la **entidad del dominio** —la variable definida a nivel proyecto SelfHosted, capacidad F-23 y decisión D-5—, no la unidad de compilación; es el referente R6 de §3.5 paso 2 del plan, que declara textualmente que estos nombres no se tocan. **Cabecera:** se suma el campo `Proyecto de código` con el valor `SelfHosted-Service`, que §4.1 de la regla 4.0 exige como primer campo por ser ésta una categoría de nivel proyecto de código (`Vocabulario-Rules` §4 R3) y que el `PRODUCT-MANIFEST` §2 declara como `Nombre-Proyecto-Codigo`; la etiqueta `Proyecto` pasa a `Producto` sobre el mismo valor `SelfHosted Service`, porque `Vocabulario-Rules` §3 prohíbe la etiqueta de un plano de identidad sobre el valor de otro. Los dos campos conviven: el primero lo exige §4.1 y el segundo lo preserva `Migracion-Rules` §4.2. Los dos valores **difieren sólo por el guion** y no son intercambiables. **Sustitución léxica por ocurrencia** según `Vocabulario-Rules` §9.5 y el plan de migración §3.5, y nunca por reemplazo global de cadena: la **única** ocurrencia de «solución» designaba el nivel superior y pasa a «producto» con su concordancia de género —«Administrador único de la solución» a «Administrador único **del** producto»—; no hay ninguna «solución de código», y el cuerpo de este documento no contiene la cadena `soluci` dentro de ninguna otra palabra, de modo que el riesgo de superposición de cadenas que el plan §3.5 declara no se materializa acá. Las veinticuatro ocurrencias de «proyecto» se clasificaron una por una y **ninguna pasó a «proyecto de código»**: catorce llevan la forma calificada «proyecto SelfHosted»; tres son el **nombre canónico de la superficie** `Variables compartidas del proyecto`, que se conserva textualmente; cuatro son la misma entidad del dominio en forma corta —entre ellas la etiqueta «Variables del proyecto» del bloque ASCII de §2 y la cita literal «En el proyecto → Variables del proyecto» del anexo E-10, que es transcripción de fuente y **no se reescribe**—; dos nombran artefactos del dominio en sus enlaces a `CU-34-Variables-Compartidas-Del-Proyecto.md`; y una era la etiqueta de cabecera. **El nombre canónico de la superficie `Variables compartidas del proyecto` y su identificador `SUP-13` se conservan textualmente**, porque `Deriva-Rules.md` exige que coincidan término por término con la línea de base visual. **Los bloques ASCII de §2 no se tocaron** y conservan su ancho. **Ninguna derivación de campo, componente, interacción, estado, nota, referencia de trazabilidad ni brecha cambió de contenido**: la migración es léxica y de forma de cabecera, el supuesto `S-UX-02` y la pendencia `B-UX-03` siguen vigentes sin cambio, y las filas anteriores de este control de cambios no se reescribieron. Origen: [`Plan-Migracion-4.1-a-6.0.md`](../../Audit/Plan-Migracion-4.1-a-6.0.md) §3.5 y §4 |
| 1.0 | 2026-07-29 | Versión inicial. **Resuelve por derivación la pendencia `B-UX-03`** —maquetado de la pantalla de variables compartidas, brecha B-07 de `02-Especificacion-Funcional`— derivando los cuatro campos del formulario y las cinco columnas de la grilla de los anexos E-1 y E-5, y declarando la derivación para que sea impugnable; toma la ubicación dentro del proyecto SelfHosted del anexo E-10 como supuesto `S-UX-02`; declara las tres consecuencias de diseño de que la clave no identifique; declara los dos controles que la superficie deliberadamente no ofrece; declara quince estados |
| 1.0 | 2026-07-29 | Corrección del audit de la Fase B, absorbida dentro de la versión de emisión, sin subir versión y sin archivar, por la política de versionado de `Master-Prompt.md` §5: el documento está en estado `Propuesto` y la corrección proviene del audit de su propia fase. **H-06, P1:** Se suma a §8 la fila que declara la fuente única de la correspondencia entre superficie y caso de uso. **Brecha `B-UX-15` retirada por falsa:** §6 deja de declarar ausente el punto de quiebre y cita la norma que `Design-Rules-Web-Generico.md` §8 sí declara, acotando lo delegado a los anchos de verificación de la etapa `b`. Origen: informe [`Audit/B-02-03-r1.md`](../../Audit/B-02-03-r1.md) |
