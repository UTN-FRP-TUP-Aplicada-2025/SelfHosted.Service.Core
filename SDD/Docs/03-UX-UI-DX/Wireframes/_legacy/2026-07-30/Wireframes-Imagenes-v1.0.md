# Wireframes — Imágenes

**Proyecto:** SelfHosted Service
**Documento:** Wireframes-Imagenes.md
**Versión:** 1.0
**Estado:** Propuesto
**Fecha:** 2026-07-29
**Autor:** UX/UI Designer + Frontend Lead (AG-03)
**Variante:** UX/UI

> **Esta superficie depende de decisiones abiertas y lo declara.** Las pendientes `Q-15` a `Q-21` del intake §19 condicionan **el modo de disparo de la limpieza y el alcance de la marca de conservada**, y ninguna está cerrada. Lo que este wireframe especifica es lo que **no depende** de ellas: qué se lista, qué está protegido y qué informa la operación. Los tramos que sí dependen están señalados y **no se completan con un valor plausible**. La maqueta **no debe construir esta superficie** hasta que `Q-15` y `Q-17` se cierren: ver §5.1.

---

## Tabla de contenido

- [1. Pantalla y propósito](#1-pantalla-y-propósito)
- [2. Layout](#2-layout)
- [3. Componentes principales](#3-componentes-principales)
  - [3.1 Lo propio y lo ajeno, que es la distinción que hace segura la superficie](#31-lo-propio-y-lo-ajeno-que-es-la-distinción-que-hace-segura-la-superficie)
  - [3.2 La etiqueta es lo que se reconoce, el digesto es lo que identifica](#32-la-etiqueta-es-lo-que-se-reconoce-el-digesto-es-lo-que-identifica)
  - [3.3 El informe de la limpieza declara lo que dejó, no sólo lo que borró](#33-el-informe-de-la-limpieza-declara-lo-que-dejó-no-sólo-lo-que-borró)
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

---

## 2. Layout

Superficie del shell de trabajo, con indicador de ocupación, tabla de inventario agrupada por pertenencia, y modal de informe de limpieza.

```text
+-----------------------------------------------------------------------+
| [=] <titulo del panel>      <identidad>  [Cambiar contrasena] [Salir] |
+---------+-------------------------------------------------------------+
| Lienzo  |  Imagenes                                    [ Limpiar ]    |
| Logs    |  <subtitulo: lo que el panel administra y lo que no>        |
| Metr.   |  ---------------------------------------------------------  |
| Imag.   |  Ocupacion del almacen: <n> GB en <m> imagenes              |
| Ajustes |    del panel <a> GB      ajenas <b> GB                      |
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


Informe de la limpieza

+- Resultado de la limpieza ------------------------------ X -+
|  Se liberaron <n> GB borrando <m> imagenes.                 |
|  ---------------------------------------------------------  |
|  Se dejaron <k>, y por que:                                 |
|   - <etiqueta>  conservada                                  |
|   - <etiqueta>  ajena: el panel no la administra             |
|   - <etiqueta>  en uso por el despliegue <id>               |
+-------------------------------------------------------------+
|                                              [ Entendido ]  |
+-------------------------------------------------------------+
```

**Dos decisiones de composición que el layout materializa.** El inventario está **agrupado por pertenencia** y no ordenado por tamaño: lo primero que el administrador necesita saber es qué es suyo y qué no, porque de eso depende qué puede hacer. Y el grupo de las ajenas **no tiene columna de acciones**: la ausencia del control es más clara que un control deshabilitado.

---

## 3. Componentes principales

| Componente | Propósito | Datos que muestra | Comportamiento |
| --- | --- | --- | --- |
| Indicador de ocupación | Atribuye el consumo de disco | Total del almacén, y el reparto entre lo administrado y lo ajeno | Es lo que vuelve accionable la atribución del consumo del servidor |
| Barra de filtros | Acota el inventario | — | Filtra por procedencia y por descartabilidad |
| Grupo «administradas por el panel» | Lo que el administrador puede operar | Por imagen: etiqueta, digesto abreviado, tamaño, proyecto y servicio, uso, y marca de conservada | Ver §3.1 |
| Grupo «ajenas» | Lo que el producto ve y no administra | Por imagen: etiqueta, digesto abreviado, tamaño y procedencia | **Sin columna de acciones.** Ver §3.1 |
| Indicador de uso | Dice si algo la está usando | Despliegues que la referencian, distinguiendo activos de historial | Depende de `Q-15`: ver §5.1 |
| Marca de conservada | Protege de la limpieza | Estado de la marca | Su alcance depende de `Q-21`: ver §5.1 |
| Acción de limpiar | Libera espacio | — | Su modo de disparo depende de `Q-17`: ver §5.1 |
| Informe de la limpieza | Declara lo que pasó | Lo borrado, el espacio liberado, **y lo que se dejó con el motivo de cada exclusión** | Ver §3.3 |

### 3.1 Lo propio y lo ajeno, que es la distinción que hace segura la superficie

El motor de contenedores es **uno y compartido**: el mismo almacén de imágenes lo usan el producto, el parque de contenedores que nadie incorporó a un proyecto, y el automatismo de integración continua que construye en el propio servidor. Una operación de limpieza que no distinga es **destrucción de datos de terceros**, y el producto no tiene forma de saber qué rompió.

| Grupo | Qué es | Qué acciones ofrece |
| --- | --- | --- |
| **Administradas por el panel** | Llevan la marca de pertenencia del producto: las descargó o las construyó él | Conservar, retirar la conservación, y quedar incluidas en la limpieza |
| **Ajenas** | No llevan la marca: son del parque preexistente o de un automatismo externo | **Ninguna.** Se listan con su tamaño para poder atribuir el consumo, y nada más |

**Tres criterios que esta separación impone:**

1. **La ausencia de acciones sobre lo ajeno no se implementa como controles deshabilitados.** No hay control. Un control deshabilitado invita a buscar cómo habilitarlo, y acá no hay forma: no es una restricción de permiso, es que **no es del producto**.
2. **El encabezado del grupo ajeno dice qué son y qué no se hace con ellas**, con esas palabras, y no sólo «otras».
3. **Ninguna acción masiva alcanza al grupo ajeno.** Un «seleccionar todo» selecciona todo lo administrado y nada de lo ajeno.

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

---

## 4. Interacciones

| Acción | Disparador | Resultado esperado | Precondición |
| --- | --- | --- | --- |
| Abrir el inventario | Navegación desde la barra lateral | Se lista el inventario agrupado por pertenencia, con la ocupación del almacén y su reparto | Sesión iniciada |
| Ver el digesto completo | Acción sobre el digesto abreviado | Se muestra la forma completa, copiable | Ninguna |
| Filtrar por procedencia | Control de la barra | El inventario se acota. **El grupo ajeno no desaparece del total de ocupación** aunque se filtre | Ninguna |
| Marcar como conservada | Acción de la fila, sólo en el grupo administrado | La imagen queda protegida de la limpieza | Su alcance depende de `Q-21` |
| Retirar la conservación | Acción de la fila | La imagen vuelve a ser candidata a la limpieza | La imagen está conservada |
| Limpiar | Acción del encabezado | Se ejecuta la limpieza y se emite el informe con lo borrado y **lo que se dejó con su motivo** | Su modo de disparo depende de `Q-17` |
| Intentar operar sobre una imagen ajena | — | **No hay acción que lo intente**: el grupo ajeno no tiene columna de acciones. Por API, rechazo con el motivo de la protección | — |

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
| Imagen conservada | Tiene la marca | Marca visible y acción de retirarla. **No se muestra como candidata a limpieza** en el filtro de descartables |
| Imagen ajena | No lleva la marca de pertenencia del producto | En su grupo, **sin acciones**, con su procedencia declarada |
| Dos imágenes con la misma etiqueta | Etiqueta flotante que designó contenidos distintos | **Dos filas distintas**, distinguidas por su digesto, con la más antigua declarada como tal |
| Limpieza en curso | La operación se está ejecutando | Acción deshabilitada con indicador de progreso |
| Limpieza con resultado | La operación terminó | Informe con lo borrado, el espacio liberado, y **lo que se dejó con el motivo de cada exclusión** |
| Limpieza sin nada que borrar | Todo está en uso, conservado o ajeno | Informe con cero borrados **y el motivo de cada exclusión**. **No usa lenguaje visual de error** |
| Limpieza parcial | El motor de contenedores se negó a borrar alguna | El informe declara la imagen y el motivo que devolvió el motor, y **la operación continuó con el resto** |
| Motor inalcanzable | El punto de acceso del motor no responde | Banda de error. **El inventario no se muestra desde caché sin declararlo**: un inventario desactualizado invitaría a borrar lo que no corresponde |
| Sin permiso | — | **No aplica** para el administrador. La única forma de que falte alcance es una credencial de máquina, cuyo ámbito depende de `Q-18` |

**Quince estados.** Los catorce primeros son demostrables; el último no se maqueta, por la misma razón que en el resto de la categoría.

### 5.1 Qué no se especifica, y por qué

Cinco tramos de esta superficie **dependen de decisiones abiertas y no se completan**. Se enumeran con su pendiente para que la conversación con el agente humano del proyecto sea sobre algo concreto:

| Tramo sin especificar | Qué falta decidir | Pendiente |
| --- | --- | --- |
| El **indicador de uso** de cada imagen | Si el despliegue registra el **digesto** de la imagen que usó. **Sin esto la superficie no tiene con qué resolver el uso**, y por lo tanto no tiene con qué decidir qué es descartable | `Q-15` |
| El **grupo administrado** en sí | Si las imágenes construidas llevan **marca de pertenencia**. Sin ella la separación de §3.1 no es resoluble | `Q-16` |
| El **disparo de la limpieza** | Si es manual —como este wireframe la dibuja—, **sugerida** cuando el sistema detecta presión de disco, o **programada**. Si es sugerida, hace falta además especificar dónde aparece la sugerencia y con qué umbral | `Q-17` |
| El **alcance de la marca de conservada** | Si el administrador puede marcarla, sobre qué imágenes, y si la marca se pone sola al volver a un despliegue anterior | `Q-21` |
| El **ámbito de credencial** de la limpieza por API | Si tiene ámbito propio, distinto del de desplegar | `Q-18` |

**Consecuencia para la maqueta, declarada.** Esta superficie **no debe construirse en la maqueta** hasta que `Q-15` y `Q-17` se cierren. La primera porque sin ella el dato central del inventario no existe y la maqueta tendría que inventarlo; la segunda porque el modo de disparo cambia la composición del encabezado. Las otras tres se pueden maquetar con lo que este wireframe declara.

---

## 6. Versión responsive

La matriz de plataforma declara una única familia de navegador de escritorio y excluye navegadores móviles y pantallas pequeñas. Esta superficie **no tiene versión móvil especificada**.

- La tabla de inventario conserva sus columnas de etiqueta, tamaño y uso, y desplaza horizontalmente dentro de su contenedor antes que comprimirlas.
- El digesto abreviado no reduce su longitud al angostar: abreviarlo más lo volvería inútil para distinguir dos imágenes.
- El indicador de ocupación reflúye a una columna conservando el reparto entre lo administrado y lo ajeno.

**Norma de diseño aplicada, no brecha.** El punto de quiebre principal alrededor de 768 px y el piso de 320 px sin desplazamiento horizontal de la página los declara `Design-Rules-Web-Generico.md` §8, y esta superficie los aplica.

---

## 7. Notas de implementación

**Accesibilidad.**

- Cada grupo del inventario es una región con nombre accesible que declara **qué contiene y qué se puede hacer con ella**, no sólo su título.
- El digesto se expone completo al texto accesible aunque se muestre abreviado.
- El nombre accesible de cada fila incluye la etiqueta, el tamaño y el estado de uso: es lo que permite recorrer el inventario sin abrir cada fila.
- El informe de la limpieza es una región de estado y **no una alerta** cuando el resultado es cero borrados: no hay nada mal.
- La marca de conservada se expone como estado y no como decoración.

**Performance percibida.** El inventario consulta el almacén del motor de contenedores y puede tardar: se muestra como carga con esqueleto. La limpieza es una operación destructiva con progreso, **sin resultado parcial silencioso**: toda imagen que no se borró aparece en el informe.

**Internacionalización.** Etiquetas de imagen, digestos, nombres de proyecto y de servicio se muestran **literales y no se traducen**. Los tamaños usan el formato numérico de la configuración regional.

---

## 8. Trazabilidad

| Dimensión | Referencia |
| --- | --- |
| Persona objetivo | Administrador único de la solución: [`Vision-Producto.md`](../../00-Contexto/Vision-Producto.md) §2.1 |
| CU origen | [CU-37](../../02-Especificacion-Funcional/Casos-De-Uso/CU-37-Higiene-De-Imagenes.md), [CU-38](../../02-Especificacion-Funcional/Casos-De-Uso/CU-38-Vuelta-A-Un-Despliegue-Anterior.md) |
| Reglas de negocio relevantes | RN-17, RN-40. Regla conceptual RC-18, que conserva el historial de despliegues y es lo que obliga a que las imágenes de ese historial tengan una política |
| Insumo del intake | Anexo **E-23**, la imagen como objeto con identidad, sus tres campos determinantes y las siete decisiones que deja abiertas; §17.P.10, requerimientos de recursos del servidor; §17.P.11 DA-07, retención de despliegues |
| Marco de experiencia aplicado | [`Experiencia-De-Uso.md`](../Experiencia-De-Uso.md) §3.7 flujo FL-07 atribución del consumo del servidor, §8.1 taxonomía de errores |
| Representaciones que invoca | Ninguna. La superficie **no exhibe estado de ejecución**: una imagen no corre |
| Catálogo de diseño aplicado | `Design-Rules-Web-Generico.md` §3.2, §4.4, §4.6, §4.9, §4.10, §5, §8; `Design-Rules-Blazor-Mudblazor.md` §4 |
| US a generar en 06 | US-CU-37-1 a US-CU-37-5, US-CU-38-1, provisionales |
| Tests previstos en 08 | Snapshot de los **quince** estados declarados; verificación de que el grupo ajeno **no tiene controles de acción, ni deshabilitados**; verificación de que una acción masiva no alcanza al grupo ajeno; verificación de que dos imágenes con la misma etiqueta y digestos distintos aparecen como dos filas; verificación de que el informe con cero borrados **no** usa lenguaje visual de error y declara el motivo de cada exclusión |
| Brechas que declara | **`B-UX-27` nueva**: cinco tramos de esta superficie dependen de `Q-15` a `Q-21`, enumerados en §5.1, con la consecuencia declarada de que la maqueta **no debe construirla** hasta que `Q-15` y `Q-17` se cierren |
| Maqueta de la Fase B2 | Nombre canónico `Imágenes`. **No se construye todavía**: ver §5.1 |
| Fuente de la correspondencia | La fila «CU origen» reproduce la fila de esta superficie en [`Experiencia-De-Uso.md`](../Experiencia-De-Uso.md) §9.2, que es la **fuente única** de la correspondencia entre superficie y caso de uso. Se reproduce, y no se referencia, porque `Rules-UX-UI-DX.md` §4.2.1 punto 8 la exige como sección obligatoria del wireframe |

---

## 9. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 1.0 | 2026-07-29 | Versión inicial. **Superficie nueva `SUP-18`**, emitida por §22.5 del documento de trabajo `SDD/Estado/Redefinicion-Servicio.md` v2.0, que verificó que el ciclo de vida de las imágenes **no tenía ninguna superficie** que lo mostrara. Especifica el inventario **agrupado por pertenencia y no por tamaño**, con los tres criterios que la separación entre lo propio y lo ajeno impone, incluido que la ausencia de acciones sobre lo ajeno **no se implemente como controles deshabilitados**; la jerarquía entre **etiqueta y digesto**, con el argumento de por qué el digesto no puede faltar aunque sea técnico; y el **informe de la limpieza declarando lo que dejó y no sólo lo que borró**, con los tres motivos de exclusión por separado y con el caso de cero borrados tratado como resultado y no como error. §5.1 enumera **los cinco tramos que no se especifican** con su pendiente, y declara que la maqueta **no debe construir esta superficie** hasta que `Q-15` y `Q-17` se cierren, con el motivo de cada una. Declara quince estados y la brecha `B-UX-27` |
