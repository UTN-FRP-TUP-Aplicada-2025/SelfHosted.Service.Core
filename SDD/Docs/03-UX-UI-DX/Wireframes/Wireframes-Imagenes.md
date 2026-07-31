# Wireframes — Imágenes

**Proyecto de código:** SelfHosted-Service
**Producto:** SelfHosted Service
**Documento:** Wireframes-Imagenes.md
**Versión:** 2.1
**Estado:** Propuesto
**Fecha:** 2026-07-30
**Autor:** UX/UI Designer + Frontend Lead (AG-03)
**Variante:** UX/UI

> **Dos de las decisiones que bloqueaban esta superficie quedaron cerradas el 2026-07-30, y tres siguen abiertas.** `Q-15` decidida en positivo —el despliegue **registra el digesto** de la imagen que usó— completa el **indicador de uso**, que era el dato central del inventario. `Q-17` decidida —la limpieza es **sugerida**— completa el **disparo**, y el intake delega explícitamente en esta categoría **dónde aparece la sugerencia y con qué umbral**: se especifican en §3.5. **Siguen sin especificar tres tramos**, con su pendiente declarada en §5.1: `Q-16`, `Q-18` y `Q-21`. **La maqueta ya puede construir esta superficie**; la restricción que la versión 2.0 declaraba se retira, y §5.1 dice qué queda fuera de lo demostrable.

---

## Tabla de contenido

- [1. Pantalla y propósito](#1-pantalla-y-propósito)
- [2. Layout](#2-layout)
- [3. Componentes principales](#3-componentes-principales)
  - [3.1 Lo propio y lo ajeno, que es la distinción que hace segura la superficie](#31-lo-propio-y-lo-ajeno-que-es-la-distinción-que-hace-segura-la-superficie)
  - [3.2 La etiqueta es lo que se reconoce, el digesto es lo que identifica](#32-la-etiqueta-es-lo-que-se-reconoce-el-digesto-es-lo-que-identifica)
  - [3.3 El informe de la limpieza declara lo que dejó, no sólo lo que borró](#33-el-informe-de-la-limpieza-declara-lo-que-dejó-no-sólo-lo-que-borró)
  - [3.4 El indicador de uso resuelve por digesto y distingue lo activo del historial](#34-el-indicador-de-uso-resuelve-por-digesto-y-distingue-lo-activo-del-historial)
  - [3.5 La sugerencia de limpieza: dónde aparece y con qué umbral](#35-la-sugerencia-de-limpieza-dónde-aparece-y-con-qué-umbral)
- [4. Interacciones](#4-interacciones)
- [5. Estados](#5-estados)
  - [5.1 Qué no se especifica, y por qué](#51-qué-no-se-especifica-y-por-qué)
- [6. Versión responsive](#6-versión-responsive)
- [7. Notas de implementación](#7-notas-de-implementación)
- [8. Trazabilidad](#8-trazabilidad)
- [9. Control de cambios](#9-control-de-cambios)

---

## 1. Pantalla y propósito

**Nombre canónico de la superficie: `Imágenes`** (`SUP-18`).

Su tarea es que el administrador **vea qué imágenes de contenedor ocupan su servidor, cuáles administra el producto y cuáles no, cuáles están en uso, y libere espacio sin destruir nada que necesite**.

**Por qué esta superficie no existía.** El ciclo de vida de las imágenes **no estaba en el intake**: verificado, cero menciones de limpieza, poda, espacio en disco o retención de imágenes antes de la versión 2.4. El producto retiene cincuenta despliegues por servicio, los muestra en la línea de tiempo del panel, y no tenía ninguna superficie que mostrara las imágenes que esos despliegues usaron. Llenar el disco es el modo de falla más probable del servidor de referencia, y era el único que el producto no ayudaba ni a evitar ni a diagnosticar.

**Qué cambia en esta versión.** La superficie deja de tener un hueco en el medio. El **indicador de uso** era el dato del que dependían todos los demás —sin saber qué imagen usa cada despliegue, «descartable» no tiene definición— y `Q-15` lo habilitó. El **disparo** era el otro, y `Q-17` lo cerró declarándolo sugerido, con la consecuencia de que el encabezado de esta pantalla ya no es sólo una acción sino también un lugar donde el sistema propone.

---

## 2. Layout

Superficie del shell de trabajo, con indicador de ocupación, banda de sugerencia cuando está vigente, tabla de inventario agrupada por pertenencia, y modal de informe de limpieza.

```text
+-----------------------------------------------------------------------+
| [=] <titulo del panel>      <identidad>  [Cambiar contrasena] [Salir] |
+---------+-------------------------------------------------------------+
| Lienzo  |  Imagenes          [ Explorar registro ]     [ Limpiar ]    |
| Logs    |  <subtitulo: lo que el panel administra y lo que no>        |
| Metr.   |  ---------------------------------------------------------  |
| Imag.   |  Ocupacion del almacen: <n> GB en <m> imagenes              |
| Ajustes |    del panel <a> GB      ajenas <b> GB                      |
|         |  ---------------------------------------------------------  |
|         |  [i] Se pueden liberar <n> GB en <k> imagenes               |
|         |      [ Revisar la propuesta ]  [ Descartar ]                |
|         |  ---------------------------------------------------------  |
|         |  [ buscar... ] [ procedencia v ] [ solo descartables ]      |
|         |  ---------------------------------------------------------  |
|         |  Administradas por el panel                                 |
|         |  +-------------------------------------------------------+  |
|         |  | <etiqueta>          <tamano> <uso>      <conservada>  |  |
|         |  |   <digesto abreviado>  <proyecto>/<servicio>          |  |
|         |  +-------------------------------------------------------+  |
|         |  | <etiqueta>          <tamano> <uso>      [ conservar ] |  |
|         |  |   <digesto abreviado>  <proyecto>/<servicio>          |  |
|         |  +-------------------------------------------------------+  |
|         |                                                             |
|         |  Ajenas · el panel no las administra y no las toca          |
|         |  +-------------------------------------------------------+  |
|         |  | <etiqueta>          <tamano>  <procedencia>           |  |
|         |  |   <digesto abreviado>          sin acciones           |  |
|         |  +-------------------------------------------------------+  |
+---------+-------------------------------------------------------------+


Indicador de uso, en su celda de la fila

+- <uso> -----------------------------------------------------+
|  en uso · <n> despliegues activos                           |
|  solo en el historial · <n> despliegues                     |
|  sin referencia                                             |
|  uso no atribuible · <n> despliegues sin digesto registrado |
+-------------------------------------------------------------+


Propuesta de la limpieza, al revisar la sugerencia

+- Lo que la limpieza haria -------------------------------- X -+
|  Se liberarian <n> GB borrando <m> imagenes.                  |
|  ----------------------------------------------------------   |
|  Entran:                                                      |
|   - <etiqueta>  <digesto abreviado>  <tamano>                 |
|  Quedan afuera, y por que:                                    |
|   - <etiqueta>  conservada                                    |
|   - <etiqueta>  ajena: el panel no la administra              |
|   - <etiqueta>  en uso por el despliegue <id>                 |
+---------------------------------------------------------------+
|                     [ Descartar ]   [ Confirmar la limpieza ] |
+---------------------------------------------------------------+


Informe de la limpieza

+- Resultado de la limpieza ------------------------------ X -+
|  Se liberaron <n> GB borrando <m> imagenes.                 |
|  ---------------------------------------------------------  |
|  Se dejaron <k>, y por que:                                 |
|   - <etiqueta>  conservada                                  |
|   - <etiqueta>  ajena: el panel no la administra            |
|   - <etiqueta>  en uso por el despliegue <id>               |
+-------------------------------------------------------------+
|                                              [ Entendido ]  |
+-------------------------------------------------------------+
```

**Tres decisiones de composición que el layout materializa.** El inventario está **agrupado por pertenencia** y no ordenado por tamaño: lo primero que el administrador necesita saber es qué es suyo y qué no, porque de eso depende qué puede hacer. El grupo de las ajenas **no tiene columna de acciones**: la ausencia del control es más clara que un control deshabilitado. Y la banda de sugerencia vive **debajo del indicador de ocupación y arriba de los filtros**, porque es una consecuencia de lo que la ocupación dice y porque filtrar el inventario no cambia la propuesta.

**La propuesta y el informe son dos cosas y no una.** La propuesta declara lo que **haría** y se confirma; el informe declara lo que **hizo** y se acusa. Colapsarlas produciría el defecto que `Q-17` viene a evitar: una sugerencia que, al abrirse, ya borró.

---

## 3. Componentes principales

| Componente | Propósito | Datos que muestra | Comportamiento |
| --- | --- | --- | --- |
| Indicador de ocupación | Atribuye el consumo de disco | Total del almacén, y el reparto entre lo administrado y lo ajeno | Es lo que vuelve accionable la atribución del consumo del servidor |
| Banda de sugerencia de limpieza | Propone sin ejecutar | Espacio recuperable y cantidad de imágenes que entrarían | Aparece cuando el umbral de §3.5 se cumple. **Región de estado, no alerta.** Ver §3.5 |
| Barra de filtros | Acota el inventario | — | Filtra por procedencia y por descartabilidad. **No altera la propuesta** |
| Grupo «administradas por el panel» | Lo que el administrador puede operar | Por imagen: etiqueta, digesto abreviado, tamaño, proyecto y servicio, uso, y marca de conservada | Ver §3.1 |
| Grupo «ajenas» | Lo que el producto ve y no administra | Por imagen: etiqueta, digesto abreviado, tamaño y procedencia | **Sin columna de acciones.** Ver §3.1 |
| Indicador de uso | Dice si algo la está usando | Despliegues que la referencian **por su digesto**, distinguiendo activos de historial | Ver §3.4 |
| Marca de conservada | Protege de la limpieza | Estado de la marca | Su alcance depende de `Q-21`: ver §5.1 |
| Acción de limpiar, a pedido | Libera espacio sin esperar la sugerencia | — | Sigue existiendo en el encabezado: la sugerencia agrega un camino y no reemplaza el otro (CU-37 FA-04) |
| Propuesta de la limpieza | Declara lo que haría antes de hacerlo | Lo que entra, lo que queda afuera y por qué, y el espacio que liberaría | Es la frontera de propuesta aplicada acá: la interfaz propone, el humano confirma |
| Informe de la limpieza | Declara lo que pasó | Lo borrado, el espacio liberado, **y lo que se dejó con el motivo de cada exclusión** | Ver §3.3 |

### 3.1 Lo propio y lo ajeno, que es la distinción que hace segura la superficie

El motor de contenedores es **uno y compartido**: el mismo almacén de imágenes lo usan el producto, el parque de contenedores que nadie incorporó a un proyecto, y el automatismo de integración continua que construye en el propio servidor. Una operación de limpieza que no distinga es **destrucción de datos de terceros**, y el producto no tiene forma de saber qué rompió.

| Grupo | Qué es | Qué acciones ofrece |
| --- | --- | --- |
| **Administradas por el panel** | Llevan la marca de pertenencia del producto: las descargó o las construyó él | Conservar, retirar la conservación, y quedar incluidas en la limpieza |
| **Ajenas** | No llevan la marca: son del parque preexistente o de un automatismo externo | **Ninguna.** Se listan con su tamaño para poder atribuir el consumo, y nada más |

**Cuatro criterios que esta separación impone:**

1. **La ausencia de acciones sobre lo ajeno no se implementa como controles deshabilitados.** No hay control. Un control deshabilitado invita a buscar cómo habilitarlo, y acá no hay forma: no es una restricción de permiso, es que **no es del producto**.
2. **El encabezado del grupo ajeno dice qué son y qué no se hace con ellas**, con esas palabras, y no sólo «otras».
3. **Ninguna acción masiva alcanza al grupo ajeno.** Un «seleccionar todo» selecciona todo lo administrado y nada de lo ajeno.
4. **La sugerencia nunca cuenta lo ajeno como espacio recuperable.** Incorporado en esta versión: el espacio que la banda de §3.5 declara se calcula **sólo sobre lo administrado**, porque proponer liberar lo que la operación tiene prohibido tocar sería una promesa que la limpieza no puede cumplir.

### 3.2 La etiqueta es lo que se reconoce, el digesto es lo que identifica

Son dos datos distintos y los dos tienen que estar, con jerarquía visual distinta:

| Dato | Qué es | Cómo se muestra |
| --- | --- | --- |
| **Etiqueta** | Lo que el administrador reconoce, y lo que su origen declaró | Prominente, en la línea principal |
| **Digesto** | La **identidad real**, calculada sobre el contenido | Secundario, abreviado, con la forma completa disponible al pedirla |

**Por qué el digesto no puede faltar aunque sea un dato técnico.** Con política de actualización flotante, la misma etiqueta designa cosas distintas en momentos distintos: **dos imágenes con la misma etiqueta y contenidos diferentes son dos filas de este inventario**, y sin el digesto serían indistinguibles. Es el único dato que responde qué corre.

### 3.3 El informe de la limpieza declara lo que dejó, no sólo lo que borró

Es el componente que hace confiable la operación, y la mitad que importa es la que normalmente se omite.

| Qué declara | Por qué |
| --- | --- |
| Cuántas imágenes borró y **cuánto espacio liberó** | Es el resultado que el administrador vino a buscar |
| **Qué dejó, imagen por imagen, con el motivo de cada exclusión** | Sin esto el administrador no puede saber si la limpieza hizo lo que esperaba, ni por qué el espacio liberado fue menor de lo que suponía |
| Los tres motivos de exclusión por separado: **conservada**, **ajena**, **en uso** | Son tres cosas distintas y la acción del administrador es distinta en cada una: retirar la conservación, nada, o esperar |

**El caso de cero borrados no es un error y el informe no puede presentarlo como tal.** En un servidor recién ordenado, que todas las imágenes estén en uso, conservadas o ajenas es el resultado esperado. El informe declara cero borrados **con el motivo de cada exclusión**, que es lo que lo distingue de un fallo.

**La propuesta usa la misma estructura que el informe, y es deliberado.** Lo que entra, lo que queda afuera y el motivo de cada exclusión: la única diferencia es el tiempo verbal. El administrador que confirma ya vio la forma exacta del resultado que va a recibir, de modo que el informe no le presenta ninguna categoría nueva en el momento en que ya no puede hacer nada.

### 3.4 El indicador de uso resuelve por digesto y distingue lo activo del historial

**Tramo que `Q-15` desbloquea.** La decisión del 2026-07-30 es que **el despliegue registra el digesto de la imagen que usó** (intake §20 anexo E-23, bloque `imagen` del despliegue). Con eso el indicador de uso tiene con qué resolverse, y esta versión lo especifica.

**La resolución es por digesto y nunca por etiqueta.** El anexo E-23 lo declara como criterio de verificación —«que la operación de volver a un despliegue anterior resuelva por digesto y no por etiqueta»— y acá vale por el mismo motivo: con etiqueta flotante, dos despliegues con la misma etiqueta pueden haber usado imágenes distintas, y atribuirles la misma imagen contaría como «en uso» algo que nadie usa.

Cuatro lecturas, y la acción del administrador es distinta en cada una:

| Lectura del indicador | Condición que la produce | Qué muestra | Consecuencia sobre la fila |
| --- | --- | --- | --- |
| **En uso** | Uno o más despliegues **activos** la referencian por su digesto | La cantidad, y al pedirlo el proyecto, el servicio y el despliegue de cada uno | **Sin acción de conservar**: ya está protegida por su uso. Marcarla sería redundante y sugeriría que sin la marca se borraría |
| **Sólo en el historial** | La referencian despliegues del historial y **ninguno activo** | La cantidad de despliegues del historial, con el más reciente identificado | **Con la acción de conservar disponible.** Es exactamente la fila que la limpieza se llevaría, y la que el administrador puede querer proteger |
| **Sin referencia** | Ningún despliegue, activo ni del historial, la referencia | La ausencia declarada con esas palabras, no una celda vacía | Es la candidata más clara de la limpieza. **Una celda en blanco se lee como falta de dato**, y acá el dato es que no hay ninguno |
| **Uso no atribuible** | Existen despliegues del historial cuyo bloque de imagen no tiene digesto registrado | La cantidad de despliegues sin digesto, declarada como tal | **La fila no se presenta como descartable.** Ver la brecha de §5.1: `Q-15` rige hacia adelante y los despliegues ya retenidos no tienen el dato |

**El detalle del uso se abre, no se lista.** La celda muestra la lectura y la cantidad; el desglose por proyecto, servicio y despliegue vive detrás de un control que declara su estado de apertura. La razón es de densidad: con cincuenta despliegues retenidos por servicio, listar cada referencia en la fila haría ilegible el inventario, que es lo que la superficie viene a resolver.

**El indicador no es el criterio de descarte, y conviene no confundirlos.** El indicador declara **quién referencia** la imagen. Qué la vuelve descartable —no tener ningún despliegue activo, no tener ninguno en absoluto, o una antigüedad— **no está declarado por ninguna fuente**, y `Q-17` decidió el disparo y no el criterio. Es la brecha `B-26` de `02-Especificacion-Funcional`, y esta superficie **no la resuelve ni la presume**: muestra las cuatro lecturas y deja que el criterio, cuando se declare, decida cuáles entran en la propuesta.

### 3.5 La sugerencia de limpieza: dónde aparece y con qué umbral

**Tramo que `Q-17` desbloquea.** La limpieza es **sugerida**: el sistema detecta espacio recuperable y lo propone, el administrador confirma (CU-37 paso 8 y FA-03). La decisión deja **dos datos delegados explícitamente en esta categoría** —el intake v3.2 lo declara al cerrarla, y `02-Especificacion-Funcional` lo repite como delegación y no como brecha de producto—: **dónde aparece la sugerencia** y **con qué umbral**. Se especifican acá.

**Dónde aparece. Dos ubicaciones, con reparto de responsabilidad.**

| Ubicación | Forma | Por qué ahí |
| --- | --- | --- |
| **Esta superficie, en su encabezado** | Banda de sugerencia entre el indicador de ocupación y la barra de filtros, con el espacio recuperable, la cantidad de imágenes que entrarían, y dos acciones: **revisar la propuesta** y **descartar la sugerencia** | Es la única superficie donde la sugerencia es accionable con la evidencia delante: el administrador ve, en la misma pantalla, exactamente qué imágenes entran |
| **Tablero de estado (`SUP-09`), en su capa de servidor** | Una línea con el espacio recuperable y un enlace a esta superficie. **No repite el detalle y no ofrece confirmar** | Es la superficie donde el consumo del servidor ya se lee —CU-26 y el flujo `FL-07` de atribución del consumo—, y por lo tanto donde el administrador está mirando cuando el disco le preocupa |

**Una sola sugerencia y una sola fuente.** Las dos ubicaciones exhiben el **mismo hecho** y no dos evaluaciones distintas: si el umbral no se cumple, ninguna de las dos aparece. Descartarla desde esta superficie la retira también del tablero.

**Dónde no aparece, y es parte de la especificación.** No aparece en el lienzo del proyecto, ni dentro del banner de cambios pendientes, ni como diálogo que bloquee, ni como aviso que interrumpa la tarea en curso. Tres motivos, los tres derivados y ninguno de preferencia:

1. **La higiene informa y nunca impide.** Es la última fila de la taxonomía de errores de [`Experiencia-De-Uso.md`](../Experiencia-De-Uso.md) §8.1 y la propiedad que define al aviso de higiene: ninguna detección puede materializarse como diálogo que bloquea.
2. **El banner del lienzo está reservado al estado transaccional** del conjunto de cambios pendientes, y su contador cuenta cambios. Meter ahí una sugerencia de mantenimiento rompería la correspondencia entre el contador y lo que el administrador declaró.
3. **Una sugerencia que interrumpe convierte el mantenimiento en urgencia.** El contexto emocional que esta categoría declara es fricción acumulada, no ansiedad, y el producto no es un tablero de alarmas.

**Con qué umbral. La forma se especifica acá; el valor por defecto es brecha.**

El umbral **no se escribe en la pantalla**. Es un **descriptor de parámetro** (`Design-Rules-Config-Esquema.md` §2): la superficie lo lee y no lo inventa, su ayuda contextual sale del descriptor, y su valor vive en la superficie de configuración del sistema (`SUP-12`), junto a los parámetros de retención que el intake declara configurables. Es **configuración de aplicación y no de entorno**, por el criterio de [`Experiencia-De-Uso.md`](../Experiencia-De-Uso.md) §2.5: el administrador lo gobierna desde el sistema y su efecto es visible en el sistema.

La forma del umbral es una **conjunción de dos condiciones**, más dos reglas de comportamiento:

| Componente | Qué declara | Por qué es necesario |
| --- | --- | --- |
| **Condición de espacio recuperable** | La propuesta libera al menos una cantidad declarada, calculada **sólo sobre lo administrado** | Sin ella, el sistema propondría limpiezas que no liberan nada, que es el caso de cero borrados de §3.3 presentado como oportunidad |
| **Condición de ocupación del almacén** | La ocupación del almacén de imágenes cruzó el punto declarado | Sin ella, el sistema sugeriría limpiar en un servidor con disco de sobra, y la sugerencia se volvería ruido que se aprende a ignorar |
| **Conjunción, no disyunción** | Las dos condiciones a la vez | Cada una sola produce el defecto de la otra fila. La conjunción es lo que hace que la sugerencia signifique «esto vale la pena ahora» |
| **Histéresis** | Una vez mostrada, la sugerencia no desaparece y reaparece por oscilación alrededor del punto declarado: se retira sólo cuando el hecho cambia de forma sostenida | Una banda que parpadea entre visible y ausente es peor que no tenerla |
| **Regla de reaparición tras el descarte** | Descartada, **no vuelve a aparecer hasta que el hecho cambie**: hasta que el espacio recuperable crezca respecto del que se descartó | Es lo que separa una sugerencia de un recordatorio insistente. `Q-17` decidió que el sistema propone, no que el sistema insiste |

**Lo que esta categoría no fija, y lo declara en lugar de inventarlo.** Los **valores numéricos por defecto** de las dos condiciones no salen de ninguna fuente: el intake declara el servidor de referencia con «un único SSD sin RAID ni LVM» y **no declara su capacidad**, ni ninguna cota de ocupación, ni el catálogo de diseño tiene nada sobre umbrales de disco. Se declara como brecha `B-UX-28`, con las tres restricciones que cualquier resolución tiene que cumplir:

1. **Los dos valores viven en descriptores**, con etiqueta, leyenda, unidad, valor por defecto y límites, y la pantalla los lee. No se hardcodean.
2. **El espacio recuperable se cuenta sólo sobre lo administrado**, nunca sobre lo ajeno.
3. **El cálculo del espacio recuperable depende del criterio de descarte**, que ninguna fuente declara —brecha `B-26` de `02-Especificacion-Funcional`—. Mientras ese criterio esté abierto, la condición de espacio recuperable tiene forma y no tiene aritmética: **la sugerencia no se puede construir en la maqueta con un número real**, y se demuestra con dato de ejemplo.

---

## 4. Interacciones

| Acción | Disparador | Resultado esperado | Precondición |
| --- | --- | --- | --- |
| Abrir el inventario | Navegación desde la barra lateral | Se lista el inventario agrupado por pertenencia, con la ocupación del almacén y su reparto | Sesión iniciada |
| Explorar un registro de imágenes | Acción del encabezado | Se abre [`SUP-19`](Wireframes-Exploracion-De-Registro-De-Imagenes.md) en su desenlace de **consulta**: devuelve la referencia completa con su digesto para consultarla. **No crea ningún servicio y no declara ningún origen.** Es el caso `FA-05` de CU-39 | Sesión iniciada |
| Ver el digesto completo | Acción sobre el digesto abreviado | Se muestra la forma completa, copiable | Ninguna |
| Ver el detalle del uso | Acción sobre el indicador de uso de la fila | Se despliega el desglose por proyecto, servicio y despliegue | La imagen tiene al menos una referencia |
| Filtrar por procedencia | Control de la barra | El inventario se acota. **El grupo ajeno no desaparece del total de ocupación** aunque se filtre, y **la sugerencia no cambia** | Ninguna |
| Marcar como conservada | Acción de la fila, sólo en el grupo administrado | La imagen queda protegida de la limpieza | Su alcance depende de `Q-21` |
| Retirar la conservación | Acción de la fila | La imagen vuelve a ser candidata a la limpieza | La imagen está conservada |
| Revisar la propuesta sugerida | Acción de la banda de sugerencia | Se abre la propuesta con lo que entra, lo que queda afuera y el espacio que liberaría. **No borra nada** | La sugerencia está vigente |
| Confirmar la limpieza | Acción primaria de la propuesta | Se ejecuta la limpieza y se emite el informe con lo borrado y **lo que se dejó con su motivo** | La propuesta está a la vista |
| Descartar la sugerencia | Acción secundaria de la banda o de la propuesta | La banda se retira de esta superficie y del tablero. **No se borra nada y no queda evento de borrado.** No vuelve hasta que el hecho cambie | La sugerencia está vigente |
| Limpiar, a pedido | Acción del encabezado | Se abre la misma propuesta, con el mismo contenido, sin haber esperado la sugerencia | Ninguna |
| Intentar operar sobre una imagen ajena | — | **No hay acción que lo intente**: el grupo ajeno no tiene columna de acciones. Por API, rechazo con el motivo de la protección | — |

**Todo camino a borrar pasa por la propuesta.** Las dos entradas —la sugerencia y la acción del encabezado— desembocan en la misma superficie de confirmación. No hay ninguna acción de esta pantalla que borre en un solo gesto.

---

## 5. Estados

| Estado | Condición que lo produce | Representación esperada |
| --- | --- | --- |
| Cargando | El inventario se está trayendo | Esqueleto de tabla |
| Con datos | Hay imágenes | Dos grupos, con la ocupación repartida entre ellos |
| Sólo imágenes ajenas | El producto todavía no descargó ni construyó ninguna | El grupo administrado declara que está vacío **y que eso es normal en una instalación nueva**, sin presentarlo como anomalía |
| Almacén vacío | No hay imágenes | Estado vacío con texto orientativo |
| Imagen en uso | La referencian uno o más despliegues activos | Indicador de uso con la cantidad, y **sin acción de conservar**: ya está protegida por su uso |
| Imagen sólo en el historial | La referencian despliegues del historial y ninguno activo | Indicador de uso que distingue el caso, **con la acción de conservar disponible**: es la que la limpieza se llevaría |
| Imagen sin ninguna referencia | Ningún despliegue la referencia por su digesto | La ausencia **declarada con esas palabras** y no como celda vacía. Es la candidata más clara de la limpieza |
| Uso no atribuible | Hay despliegues del historial sin digesto registrado | La cantidad declarada como tal, y la fila **no se presenta como descartable**. Ver §5.1 |
| Imagen conservada | Tiene la marca | Marca visible y acción de retirarla. **No se muestra como candidata a limpieza** en el filtro de descartables |
| Imagen ajena | No lleva la marca de pertenencia del producto | En su grupo, **sin acciones**, con su procedencia declarada |
| Dos imágenes con la misma etiqueta | Etiqueta flotante que designó contenidos distintos | **Dos filas distintas**, distinguidas por su digesto, con la más antigua declarada como tal |
| Sugerencia de limpieza vigente | Las dos condiciones del umbral de §3.5 se cumplen a la vez | Banda de sugerencia en el encabezado, **como región de estado y no como alerta**, con el espacio recuperable y las dos acciones |
| Sugerencia descartada | El administrador la descartó | La banda se retira acá y en el tablero. **El inventario queda igual y no hay evento de borrado.** No reaparece hasta que el hecho cambie |
| Propuesta a la vista | Se revisó la sugerencia, o se pidió limpiar | Lo que entra, lo que queda afuera con su motivo, y el espacio que liberaría. **Nada se borró todavía** |
| Limpieza en curso | La operación se está ejecutando | Acción deshabilitada con indicador de progreso |
| Limpieza con resultado | La operación terminó | Informe con lo borrado, el espacio liberado, y **lo que se dejó con el motivo de cada exclusión** |
| Limpieza sin nada que borrar | Todo está en uso, conservado o ajeno | Informe con cero borrados **y el motivo de cada exclusión**. **No usa lenguaje visual de error** |
| Limpieza parcial | El motor de contenedores se negó a borrar alguna | El informe declara la imagen y el motivo que devolvió el motor, y **la operación continuó con el resto** |
| Motor inalcanzable | El punto de acceso del motor no responde | Banda de error. **El inventario no se muestra desde caché sin declararlo**: un inventario desactualizado invitaría a borrar lo que no corresponde |
| Sin permiso | — | **No aplica** para el administrador. La única forma de que falte alcance es una credencial de máquina, cuyo ámbito depende de `Q-18` |

**Veinte estados.** Los diecinueve primeros son demostrables; el último no se maqueta, por la misma razón que en el resto de la categoría. La versión 2.0 declaraba quince: los cinco nuevos son los que `Q-15` y `Q-17` habilitaron —imagen sin referencia, uso no atribuible, sugerencia vigente, sugerencia descartada y propuesta a la vista—.

### 5.1 Qué no se especifica, y por qué

**Dos de los cinco tramos que la versión 2.0 declaraba abiertos quedaron completos**, y se declara dónde en lugar de retirar la fila:

| Tramo | Estado | Dónde quedó especificado |
| --- | --- | --- |
| El **indicador de uso** de cada imagen | **Completo.** `Q-15` decidida el 2026-07-30: el despliegue registra el digesto | §3.4, con sus cuatro lecturas, y los estados correspondientes de §5 |
| El **disparo de la limpieza** | **Completo.** `Q-17` decidida el 2026-07-30: sugerida. El umbral y la ubicación los delega el intake en esta categoría | §3.5, con las dos ubicaciones, la prohibición de las otras, y la forma del umbral |

**Tres tramos siguen sin especificar y no se completan.** Se enumeran con su pendiente para que la conversación con el agente humano del proyecto sea sobre algo concreto:

| Tramo sin especificar | Qué falta decidir | Pendiente |
| --- | --- | --- |
| El **grupo administrado** en sí | Si las imágenes construidas llevan **marca de pertenencia**. Sin ella la separación de §3.1 no es resoluble | `Q-16` |
| El **alcance de la marca de conservada** | Si el administrador puede marcarla, sobre qué imágenes, y si la marca se pone sola al volver a un despliegue anterior | `Q-21` |
| El **ámbito de credencial** de la limpieza por API | Si tiene ámbito propio, distinto del de desplegar | `Q-18` |

**Y dos huecos que las decisiones cerradas destaparon**, ninguno de los cuales es una decisión a medias:

| Hueco | Qué falta | Destinatario |
| --- | --- | --- |
| El **criterio de descarte** | Qué vuelve descartable a una imagen del producto: no tener ningún despliegue activo, no tener ninguno en absoluto, o una antigüedad. `Q-17` decidió el disparo y no el criterio, y ninguna fuente lo declara. Es la brecha `B-26` de `02-Especificacion-Funcional` y **esta superficie no la resuelve**: sin él, la condición de espacio recuperable de §3.5 tiene forma y no tiene aritmética | Agente humano del proyecto |
| Los **valores por defecto del umbral** | Las dos condiciones de §3.5 tienen forma declarada y **no tienen valor**. Ninguna fuente declara la capacidad del disco del servidor de referencia ni ninguna cota de ocupación, y el catálogo de diseño no cubre umbrales de disco. Brecha `B-UX-28`, con sus tres restricciones declaradas en §3.5 | Agente humano del proyecto |
| Los **despliegues ya retenidos sin digesto** | `Q-15` rige hacia adelante: los despliegues que estén en el historial cuando la decisión se aplique no registraron el digesto, y ninguna fuente declara cómo tratarlos. Esta superficie los expone como **uso no atribuible** en lugar de contarlos como sin referencia, que es la lectura conservadora, y declara que la elección es suya. Es la brecha `B-28` de `02-Especificacion-Funcional` | Agente humano del proyecto |

**Consecuencia para la maqueta, actualizada.** La restricción que la versión 2.0 declaraba **se retira**: la maqueta **ya puede construir esta superficie**, con los veinte estados de §5. Lo único que no se demuestra con dato real es la **aritmética** del umbral, porque depende del criterio de descarte: la banda de sugerencia se maqueta con dato de ejemplo, que es lo que la maqueta hace con todos los demás valores.

---

## 6. Versión responsive

La matriz de plataforma declara una única familia de navegador de escritorio y excluye navegadores móviles y pantallas pequeñas. Esta superficie **no tiene versión móvil especificada**.

- La tabla de inventario conserva sus columnas de etiqueta, tamaño y uso, y desplaza horizontalmente dentro de su contenedor antes que comprimirlas.
- El digesto abreviado no reduce su longitud al angostar: abreviarlo más lo volvería inútil para distinguir dos imágenes.
- El indicador de ocupación reflúye a una columna conservando el reparto entre lo administrado y lo ajeno.
- La banda de sugerencia reflúye apilando su texto sobre sus dos acciones, y **conserva las dos**: descartar no puede quedar fuera del reflujo, porque una sugerencia que no se puede descartar deja de ser una sugerencia.

**Norma de diseño aplicada, no brecha.** El punto de quiebre principal alrededor de 768 px y el piso de 320 px sin desplazamiento horizontal de la página los declara `Design-Rules-Web-Generico.md` §8, y esta superficie los aplica.

---

## 7. Notas de implementación

**Accesibilidad.**

- Cada grupo del inventario es una región con nombre accesible que declara **qué contiene y qué se puede hacer con ella**, no sólo su título.
- El digesto se expone completo al texto accesible aunque se muestre abreviado.
- El nombre accesible de cada fila incluye la etiqueta, el tamaño y el estado de uso: es lo que permite recorrer el inventario sin abrir cada fila.
- El indicador de uso expone su lectura como texto, no sólo su cantidad: «sin referencia» y una celda vacía suenan igual si el número es lo único que se anuncia.
- El control que abre el desglose del uso **declara su estado de apertura**.
- La banda de sugerencia es una **región de estado y no una alerta**, y no roba el foco: no hay nada mal, hay algo que conviene. Es la forma que el aviso de higiene tiene en toda la categoría.
- El informe de la limpieza es una región de estado y **no una alerta** cuando el resultado es cero borrados: no hay nada mal.
- La marca de conservada se expone como estado y no como decoración.

**Performance percibida.** El inventario consulta el almacén del motor de contenedores y puede tardar: se muestra como carga con esqueleto. **La evaluación del umbral no bloquea la pintura del inventario**: la banda de sugerencia aparece cuando el dato está, y su ausencia mientras se resuelve no se representa con un esqueleto propio, porque un hueco que después no se llena se lee como error. La limpieza es una operación destructiva con progreso, **sin resultado parcial silencioso**: toda imagen que no se borró aparece en el informe.

**Internacionalización.** Etiquetas de imagen, digestos, nombres de proyecto y de servicio se muestran **literales y no se traducen**. Los tamaños usan el formato numérico de la configuración regional, con la reserva de la brecha `B-UX-21` sobre el separador decimal.

---

## 8. Trazabilidad

| Dimensión | Referencia |
| --- | --- |
| Persona objetivo | Administrador único del producto: [`Vision-Producto.md`](../../00-Contexto/Vision-Producto.md) §2.1 |
| CU origen | [CU-37](../../02-Especificacion-Funcional/Casos-De-Uso/CU-37-Higiene-De-Imagenes.md), [CU-38](../../02-Especificacion-Funcional/Casos-De-Uso/CU-38-Vuelta-A-Un-Despliegue-Anterior.md) |
| Reglas de negocio relevantes | RN-17, RN-40. Regla conceptual RC-18, que conserva el historial de despliegues y es lo que obliga a que las imágenes de ese historial tengan una política |
| Insumo del intake | **v3.2.** Anexo **E-23**, la imagen como objeto con identidad, sus tres campos determinantes, el bloque `imagen` del despliegue y su tabla de qué quedó decidido y qué queda abierto; §19, las decisiones `Q-15` y `Q-17` con su delegación explícita del umbral y la ubicación a esta categoría; §17.P.10, requerimientos de recursos del servidor; §17.P.11 DA-07, retención de despliegues |
| Marco de experiencia aplicado | [`Experiencia-De-Uso.md`](../Experiencia-De-Uso.md) §2.5 frontera de configuración, §3.7 flujo FL-07 atribución del consumo del servidor, §4.3 frontera de propuesta, §8.1 taxonomía de errores |
| Representaciones que invoca | Ninguna. La superficie **no exhibe estado de ejecución**: una imagen no corre |
| Superficies con las que se coordina | `SUP-09`, tablero de estado, que aloja la segunda ubicación de la sugerencia; `SUP-12`, configuración del sistema, que aloja los descriptores del umbral; [`SUP-19`](Wireframes-Exploracion-De-Registro-De-Imagenes.md), exploración de registro de imágenes, que esta superficie invoca en su desenlace de consulta (CU-39 `FA-05`) |
| Catálogo de diseño aplicado | `Design-Rules-Web-Generico.md` §3.2, §4.3, §4.4, §4.6, §4.9, §4.10, §5, §8; `Design-Rules-Config-Esquema.md` §2, §2.1, §6; `Design-Rules-Blazor-Mudblazor.md` §4 |
| US a generar en 06 | US-CU-37-1 a US-CU-37-6, US-CU-38-1, provisionales. `US-CU-37-6` es la que la sugerencia agrega |
| Tests previstos en 08 | Snapshot de los **veinte** estados declarados; verificación de que el grupo ajeno **no tiene controles de acción, ni deshabilitados**; verificación de que una acción masiva no alcanza al grupo ajeno; verificación de que dos imágenes con la misma etiqueta y digestos distintos aparecen como dos filas; verificación de que el indicador de uso resuelve **por digesto y no por etiqueta**; verificación de que el espacio recuperable **no cuenta lo ajeno**; verificación de que descartar la sugerencia **no borra nada y no deja evento**; verificación de que la sugerencia **no reaparece** hasta que el hecho cambie; verificación de que el informe con cero borrados **no** usa lenguaje visual de error y declara el motivo de cada exclusión |
| Brechas que declara | **`B-UX-27` acotada**: de cinco tramos dependientes a **tres** —`Q-16`, `Q-18`, `Q-21`—, y se retira la consecuencia de que la maqueta no construya la superficie. **`B-UX-26` cerrada**: `Q-15` decidida en positivo. **`B-UX-28` nueva**: los valores por defecto del umbral de §3.5 no salen de ninguna fuente, con sus tres restricciones. Recoge además, sin resolverlas, las brechas `B-26` y `B-28` de `02-Especificacion-Funcional`: el criterio de descarte y los despliegues ya retenidos sin digesto |
| Maqueta de la Fase B2 | Nombre canónico `Imágenes`. **Se construye desde esta versión.** Veinte estados declarados, diecinueve demostrables |
| Fuente de la correspondencia | La fila «CU origen» reproduce la fila de esta superficie en [`Experiencia-De-Uso.md`](../Experiencia-De-Uso.md) §9.2, que es la **fuente única** de la correspondencia entre superficie y caso de uso. Se reproduce, y no se referencia, porque `Rules-UX-UI-DX.md` §4.2.1 punto 8 la exige como sección obligatoria del wireframe |

---

## 9. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 2.1 | 2026-07-30 | **Retroalimentación del paso 6 de la Fase B2: se completan los dos tramos que la ronda de decisiones del agente humano del proyecto del 2026-07-30 desbloquea**, consolidada en el `PRODUCT-INTAKE-SelfHosted-Service` **v3.2** §19 y anexo E-23, y consumida de [`CU-37`](../../02-Especificacion-Funcional/Casos-De-Uso/CU-37-Higiene-De-Imagenes.md) 2.1. Sube **minor**: el propósito, la separación entre lo propio y lo ajeno, la jerarquía entre etiqueta y digesto, y el informe de la limpieza **no cambian de contenido**, y ninguna sección se renumera. **`Q-15` decidida en positivo: el despliegue registra el digesto.** Nueva §3.4, que especifica el indicador de uso con sus **cuatro lecturas** —en uso, sólo en el historial, sin referencia, uso no atribuible—, la regla de que resuelve **por digesto y nunca por etiqueta**, el desglose detrás de un control que declara su apertura, y la distinción explícita entre el indicador y el criterio de descarte, que **no** es lo mismo y sigue abierto. **`Q-17` decidida: la limpieza es sugerida.** Nueva §3.5, que especifica los **dos datos que el intake delega en esta categoría**: la **ubicación** —banda en el encabezado de esta superficie, línea con enlace en el tablero de estado, y la prohibición explícita de las otras cuatro ubicaciones con sus tres motivos derivados— y la **forma del umbral** —conjunción de espacio recuperable y ocupación, con histéresis y con la regla de que descartada no vuelve hasta que el hecho cambie—, gobernado como **descriptor de parámetro** en `SUP-12` y no escrito en la pantalla. **§2** suma la banda de sugerencia al bloque del shell, más dos bloques nuevos: el indicador de uso y la **propuesta de la limpieza**, que es una superficie de confirmación distinta del informe y que declara lo que haría antes de hacerlo. **§3.1** suma un cuarto criterio: el espacio recuperable **no cuenta lo ajeno**. **§3.3** declara que la propuesta usa la misma estructura que el informe y por qué. **§4** pasa de siete a **doce** interacciones, con la regla de que **todo camino a borrar pasa por la propuesta**; una de las doce es el punto de entrada a la superficie nueva [`SUP-19`](Wireframes-Exploracion-De-Registro-De-Imagenes.md) en su desenlace de consulta, que `CU-39` `FA-05` declara y que esta superficie tenía que alojar. **§5** pasa de quince a **veinte** estados, diecinueve demostrables. **§5.1 se reescribe**: los dos tramos completos **conservan su fila** declarando dónde quedaron especificados en lugar de retirarse, quedan **tres** sin especificar —`Q-16`, `Q-18`, `Q-21`, con su texto sin cambios— y se suman **tres huecos que las decisiones destaparon**: el criterio de descarte (`B-26` de 02), los valores del umbral (`B-UX-28`) y los despliegues ya retenidos sin digesto (`B-28` de 02). **Se retira la declaración de que la maqueta no debe construir esta superficie**, en la cabecera, en §5.1 y en la fila de maqueta de §8: `Q-15` y `Q-17`, que eran las dos condiciones que la versión 2.0 ponía, están cerradas. **Ninguna decisión abierta se cerró acá y ningún valor plausible se completó**: los valores numéricos del umbral se declaran como brecha con sus tres restricciones, en lugar de elegirse. La versión 2.0 queda archivada en [`_legacy/2026-07-30/Wireframes-Imagenes-v2.0.md`](_legacy/2026-07-30/Wireframes-Imagenes-v2.0.md), con su bloque de archivado antepuesto y su cuerpo sin modificar. Ninguna fila anterior de este control de cambios se reescribió (`SDD-Development-Guide.md` §VI.2) |
| 2.0 | 2026-07-30 | Migración normativa del conjunto 4.1 al 6.0, fase M4 corte 4, bajo `Rules-UX-UI-DX` 4.0, `Vocabulario-Rules` 2.1 y `Migracion-Rules` 1.0. Clasificación **regenerar contenido** por el salto major de la regla que lo gobierna; fuente de contenido: **el documento de origen**, archivado sin modificar en `_legacy/2026-07-30/Wireframes-Imagenes-v1.0.md`. Sube **major** porque la nomenclatura anterior deja de cumplir. **Cabecera:** se suma el campo `Proyecto de código` con el valor `SelfHosted-Service`, que §4.1 de la regla 4.0 exige como primer campo por ser ésta una categoría de nivel proyecto de código (`Vocabulario-Rules` §4 R3) y que el `PRODUCT-MANIFEST` §2 declara como `Nombre-Proyecto-Codigo`; la etiqueta `Proyecto` pasa a `Producto` sobre el mismo valor `SelfHosted Service`, porque `Vocabulario-Rules` §3 prohíbe la etiqueta de un plano de identidad sobre el valor de otro. Los dos campos conviven: el primero lo exige §4.1 y el segundo lo preserva `Migracion-Rules` §4.2. **Sustitución léxica por ocurrencia** según `Vocabulario-Rules` §9.5 y el plan de migración §3.5, y nunca por reemplazo global de cadena: la **única** ocurrencia de «solución» designaba el nivel superior y pasa a «producto» con su concordancia de género —«Administrador único de la solución» a «Administrador único **del** producto»—; no hay ninguna «solución de código», y el cuerpo de este documento no contiene la cadena `soluci` dentro de ninguna otra palabra, de modo que el riesgo de superposición de cadenas que el plan §3.5 declara no se materializa acá. Las siete ocurrencias de «proyecto» se clasificaron una por una y **ninguna pasó a «proyecto de código»**: cinco son la entidad del dominio en forma corta —dos de ellas el marcador `<proyecto>` de los bloques ASCII de §2, que es una ranura de la pantalla y no prosa—, una es el emprendimiento —«agente humano del proyecto» en §5.1—, que `Vocabulario-Rules` §4 R1 deja sin calificar, y una era la etiqueta de cabecera. **El nombre canónico de la superficie `Imágenes` y su identificador `SUP-18` se conservan textualmente**, porque `Deriva-Rules.md` exige que coincidan término por término con la línea de base visual. **Los bloques ASCII de §2 no se tocaron** y conservan su ancho: los marcadores `<proyecto>/<servicio>` nombran la entidad del dominio y quedaron intactos. **Ningún componente, interacción, estado, tramo sin especificar, nota, referencia de trazabilidad ni brecha cambió de contenido**: la migración es léxica y de forma de cabecera, la advertencia de cabecera sobre `Q-15` a `Q-21` y la consecuencia declarada para la maqueta siguen vigentes sin cambio, y la fila anterior de este control de cambios no se reescribió. Origen: [`Plan-Migracion-4.1-a-6.0.md`](../../Audit/Plan-Migracion-4.1-a-6.0.md) §3.5 y §4 |
| 1.0 | 2026-07-29 | Versión inicial. **Superficie nueva `SUP-18`**, emitida por §22.5 del documento de trabajo `SDD/Estado/Redefinicion-Servicio.md` v2.0, que verificó que el ciclo de vida de las imágenes **no tenía ninguna superficie** que lo mostrara. Especifica el inventario **agrupado por pertenencia y no por tamaño**, con los tres criterios que la separación entre lo propio y lo ajeno impone, incluido que la ausencia de acciones sobre lo ajeno **no se implemente como controles deshabilitados**; la jerarquía entre **etiqueta y digesto**, con el argumento de por qué el digesto no puede faltar aunque sea técnico; y el **informe de la limpieza declarando lo que dejó y no sólo lo que borró**, con los tres motivos de exclusión por separado y con el caso de cero borrados tratado como resultado y no como error. §5.1 enumera **los cinco tramos que no se especifican** con su pendiente, y declara que la maqueta **no debe construir esta superficie** hasta que `Q-15` y `Q-17` se cierren, con el motivo de cada una. Declara quince estados y la brecha `B-UX-27` |
