# Wireframes — Exportación e importación

**Proyecto de código:** SelfHosted-Service
**Producto:** SelfHosted Service
**Documento:** Wireframes-Exportacion-E-Importacion.md
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
  - [3.1 La asimetría entre los dos formatos, declarada al exportar](#31-la-asimetría-entre-los-dos-formatos-declarada-al-exportar)
  - [3.2 El informe de importación](#32-el-informe-de-importación)
- [4. Interacciones](#4-interacciones)
- [5. Estados](#5-estados)
- [6. Versión responsive](#6-versión-responsive)
- [7. Notas de implementación](#7-notas-de-implementación)
- [8. Trazabilidad](#8-trazabilidad)
- [9. Control de cambios](#9-control-de-cambios)

---

## 1. Pantalla y propósito

**Nombre canónico de la superficie: `Exportación e importación`** (`SUP-15`).

Su tarea es que la arquitectura de un proyecto SelfHosted sea reproducible fuera del servidor, que es la estrategia de respaldo declarada frente a un servidor sin redundancia de disco. Y que traerla de vuelta no pierda nada en silencio.

**Brecha `B-UX-17`.** El mapa de navegación del anexo E-18 **no incluye ninguna ruta de exportación ni de importación**, aunque cuatro casos de uso las exigen y la superficie de la interfaz programática declara sus puntos de acceso. Esta superficie se deriva de los anexos E-14, E-15 y E-21 y de los flujos de los casos de uso, y **su ubicación en el mapa queda por confirmar**. Se especifica como superficie con flujo propio alcanzable desde dos lugares: desde el lienzo del proyecto SelfHosted para exportar, y desde el listado de proyectos para importar. Destinatario: agente humano del proyecto.

---

## 2. Layout

Superficie con flujo propio, superpuesta, en dos modos que no comparten composición porque no comparten tarea.

```text
Modo exportacion

+- Exportar "<proyecto SelfHosted>" ---------------------- X -+
|                                                             |
|  Que se va a generar                                        |
|   [x] Archivo en el formato estandar de composicion         |
|   [x] Archivo de variables, con las entradas de secreto     |
|       vacias                                                |
|   [x] Manifiesto propio                                     |
|                                                             |
|  (i) <declaracion de la asimetria: que preserva cada uno>   |
|                                                             |
|  (!) <ningun valor secreto se escribe en ningun archivo>    |
|                                                             |
+-------------------------------------------------------------+
| [ Cancelar ]                                    [ Exportar ]|
+-------------------------------------------------------------+


Modo importacion, paso 2: informe

+- Importar como proyecto SelfHosted nuevo --------------- X -+
|                                                             |
|  Se creo "<nombre>"                                         |
|                                                             |
|  Se crearon                                                 |
|   · <n> servicios                                           |
|   · <m> enlaces                                             |
|   · <k> variables compartidas                               |
|                                                             |
|  No se pudo representar                                     |
|   · <elemento> — <motivo>                                   |
|   · <elemento> — <motivo>                                   |
|                                                             |
+-------------------------------------------------------------+
| [ Cerrar ]                              [ Abrir el lienzo ] |
+-------------------------------------------------------------+
```

El informe de importación es lo que hace que **toda pérdida de traducción sea declarada y no silenciosa**, y por eso es una vista completa y no una banda.

---

## 3. Componentes principales

| Componente | Propósito | Datos que muestra | Comportamiento |
| --- | --- | --- | --- |
| Selección de artefactos a exportar | Deja elegir qué se genera | Los tres artefactos que las fuentes declaran | El archivo de composición y su archivo de variables van juntos: el segundo no tiene sentido sin el primero |
| Declaración de la asimetría | Explica qué preserva cada artefacto, **antes** de exportar | Qué queda en cada uno | Ver §3.1 |
| Advertencia sobre secretos | Declara la garantía | — | **Ningún valor secreto se escribe en ninguno de los archivos.** Los secretos viajan como marcador de variable con su entrada vacía en el archivo de variables |
| Selector de archivo a importar | Recoge lo que se va a interpretar | — | Admite el archivo de composición y, opcionalmente, el manifiesto propio que lo acompaña |
| Informe de importación | Declara lo creado y **lo no representable** | Cantidad de servicios, enlaces y variables compartidas creados; y la lista de elementos que no se pudieron representar, **cada uno con su motivo** | Ver §3.2 |
| Acción de abrir el lienzo | Cierra el flujo llevando al resultado | — | Es la acción primaria del informe |

### 3.1 La asimetría entre los dos formatos, declarada al exportar

El intake declara con precisión qué preserva cada artefacto, y la superficie lo dice **antes** de exportar en lugar de dejar que se descubra al reimportar:

| Artefacto | Qué preserva | Qué no preserva |
| --- | --- | --- |
| Archivo en el formato estándar de composición | La configuración de cada servicio con sus valores resueltos, y las variables compartidas **aplanadas** dentro de cada servicio que las usa | La disposición del lienzo, el nivel de variable compartida y las expresiones de referencia sin resolver |
| Archivo de variables | Las entradas de los valores secretos, **vacías** | Ningún valor |
| Manifiesto propio | La disposición del lienzo, el nivel de variable compartida, las expresiones de referencia **sin resolver en su forma legible y portable**, y el carácter de secreto de cada variable **sin su valor** | Nada que el archivo de composición ya preserve |

Dos garantías que la superficie declara y que condicionan lo que puede ofrecer:

- **El archivo de composición es autosuficiente sin el manifiesto.** El manifiesto agrega, no reemplaza. Por eso la selección admite exportar sólo los dos primeros artefactos.
- **El conjunto de cambios pendientes no se exporta.** Lo que se exporta es la configuración **aplicada**, no la del borrador. Si hay cambios pendientes al exportar, la superficie lo declara: es la diferencia entre lo que el administrador ve en el lienzo y lo que el archivo va a llevar.

### 3.2 El informe de importación

Es el componente central del modo importación, y su razón de ser es explícita en el intake: sin él, cualquier pérdida de traducción sería silenciosa, que es lo que se declara inaceptable.

Tres reglas de composición:

1. **Las dos listas siempre están presentes**, incluso vacías. Una lista de elementos no representables ausente se lee como «no hubo pérdida»; una lista vacía y declarada lo dice.
2. **Cada elemento no representable lleva su motivo**, no sólo su nombre.
3. El informe se presenta **antes de que el administrador navegue al resultado**, y no como un aviso efímero que puede perderse.

---

## 4. Interacciones

| Acción | Disparador | Resultado esperado | Precondición |
| --- | --- | --- | --- |
| Abrir el modo exportación | Acción desde el lienzo del proyecto SelfHosted, o desde su tarjeta en el listado | Se presenta la selección de artefactos con la declaración de la asimetría | Existe el proyecto SelfHosted con al menos un servicio |
| Exportar | Acción primaria | El sistema recorre los servicios **con su configuración vigente, que es la aplicada y no la del conjunto de cambios pendientes**, resuelve las referencias, aplana las variables compartidas, emite un marcador por cada valor secreto con su entrada vacía en el archivo de variables, y entrega los archivos | La selección tiene al menos un artefacto |
| Exportar un proyecto SelfHosted sin secretos | Acción primaria | El archivo de variables **se emite igualmente, vacío de entradas de secreto** | No hay variables secretas |
| Abrir el modo importación | Acción desde el listado de proyectos | Se presenta el selector de archivo | Sesión iniciada |
| Aportar el archivo | Selección de archivo | El sistema crea un proyecto SelfHosted nuevo con su red derivada, traduce cada servicio, reexpresa cada dependencia explícita y emite el informe | El archivo es legible y su formato es admitido |
| Aportar además el manifiesto propio | Selección de archivo | El sistema **restituye la disposición del lienzo, el nivel de variable compartida y las expresiones sin resolver** | Hay manifiesto |
| Importar sin manifiesto | Acción primaria | El proyecto SelfHosted se crea igualmente; **la disposición del lienzo se asigna inicialmente** y no hay nivel de variable compartida que restituir | No hay manifiesto |
| Importar un manifiesto de una versión de formato anterior | Acción primaria | Se lee como un proyecto SelfHosted **sin variables compartidas ni referencias, sin pérdida adicional** | El formato es de una versión admitida |
| Abrir el lienzo del resultado | Acción primaria del informe | Navegación al lienzo del proyecto SelfHosted creado | La importación se concretó |
| Cerrar el informe | Acción secundaria | Se cierra sin navegar. El proyecto SelfHosted creado queda en el listado | El informe está abierto |

---

## 5. Estados

| Estado | Condición que lo produce | Representación esperada |
| --- | --- | --- |
| Vacío | — | **No aplica.** La superficie existe cuando se la invoca sobre un proyecto SelfHosted o con un archivo |
| Con datos, selección de exportación | El modo exportación está abierto | Los tres artefactos seleccionables con la declaración de la asimetría |
| Exportación con cambios pendientes | El proyecto SelfHosted tiene cambios sin aplicar | Aviso de que se exporta **la configuración aplicada y no la del borrador** |
| Cargando, generando los archivos | La exportación está en curso | Acción primaria deshabilitada con indicador de progreso |
| Exportación entregada | Los archivos se generaron | Confirmación con el verbo del botón. Los archivos quedan disponibles |
| Referencia no resoluble al exportar | Una expresión no resuelve | El sistema **declara la causa y no emite un archivo con la expresión sin resolver**, porque la exportación nunca emite una expresión del modelo |
| Con datos, selector de archivo | El modo importación está abierto | Selector con la indicación de qué archivos admite |
| Cargando, interpretando el archivo | La importación está en curso | Indicador de progreso |
| Informe sin pérdida | Todo se pudo representar | Las dos listas presentes; la de elementos no representables **declarada vacía**, no ausente |
| Informe con pérdida | Algo no se pudo representar | Lista de elementos no representables, **cada uno con su motivo**. El resto del proyecto SelfHosted queda creado |
| Rechazo por nombre | Un nombre de servicio no cumple el formato o colisiona dentro del proyecto SelfHosted nuevo | Rechazo **con el campo señalado** |
| Rechazo por referencia inválida | Una expresión apunta a algo inexistente o a otro proyecto SelfHosted | Rechazo **señalando la expresión y la causa** |
| Rechazo por ciclo de arranque | Las dependencias con espera forman un ciclo | Rechazo **señalando el ciclo** |
| Rechazo por formato no admitido | La versión de formato del manifiesto no está entre las admitidas | Rechazo |
| Error | La operación falló | Banda de error con causa. **No queda un proyecto SelfHosted a medio construir** ni un archivo parcial |
| Sin permiso | — | **No aplica** para el administrador |

---

## 6. Versión responsive

La matriz de plataforma declara una única familia de navegador de escritorio y excluye navegadores móviles y pantallas pequeñas. Esta superficie **no tiene versión móvil especificada**.

- La superficie es superpuesta y de ancho acotado con tope máximo.
- Las dos listas del informe reflúyen a una columna, conforme al criterio 1.4.10.
- Los motivos de los elementos no representables **envuelven en lugar de truncar**: truncar el motivo destruye el propósito del informe.

**Norma de diseño aplicada, no brecha.** El punto de quiebre principal alrededor de 768 px y el piso de 320 px sin desplazamiento horizontal los declara `Design-Rules-Web-Generico.md` §8, y esta superficie los aplica. Lo único delegado son los **anchos de verificación**: en cuáles comprueba la etapa `b` el comportamiento y lo registra en su informe de cierre, según `Compatibilidad-Plataformas.md` §4. La brecha `B-UX-15`, que declaraba ausente la norma, se retiró por falsa; ver [`Experiencia-De-Uso.md`](../Experiencia-De-Uso.md) §10.2.1.

---

## 7. Notas de implementación

**Accesibilidad.**

- La superficie mueve el foco a su encabezado al abrirse y lo devuelve al control que la disparó al cerrarse.
- El informe es una región con nombre accesible, y sus dos listas son listas con encabezado propio.
- La declaración de la asimetría se asocia a la selección de artefactos, para que se anuncie antes de exportar.
- La advertencia sobre secretos se asocia a la acción primaria del modo exportación.
- El selector de archivo declara qué formatos admite, en texto y no sólo por filtro del diálogo del sistema.

**Performance percibida.** La exportación recorre todos los servicios del proyecto SelfHosted y resuelve sus referencias: es una operación con progreso. La importación crea un proyecto completo en una operación, y su informe es su resultado.

**Internacionalización.** Los nombres de archivo, los nombres de servicio y las claves de variable se muestran literales. Los motivos de no representabilidad son prosa del producto y van en el idioma de la interfaz.

---

## 8. Trazabilidad

| Dimensión | Referencia |
| --- | --- |
| Persona objetivo | Administrador único del producto: [`Vision-Producto.md`](../../00-Contexto/Vision-Producto.md) §2.1 |
| CU origen | [CU-09](../../02-Especificacion-Funcional/Casos-De-Uso/CU-09-Exportacion-En-Formato-De-Composicion.md), [CU-10](../../02-Especificacion-Funcional/Casos-De-Uso/CU-10-Exportacion-Del-Manifiesto-Propio.md), [CU-11](../../02-Especificacion-Funcional/Casos-De-Uso/CU-11-Importacion-Como-Proyecto-Nuevo.md); [CU-12](../../02-Especificacion-Funcional/Casos-De-Uso/CU-12-Exportacion-Programada-A-Destino-Externo.md) comparte el mecanismo y su programación vive en la configuración del sistema |
| Reglas de negocio relevantes | RN-01, RN-02, RN-05, RN-07, RN-15, RN-17, RN-21, RN-23, RN-25, RN-26, RN-34 |
| Insumo del intake | §4 capacidad F-13; §5 historia 9; §12 glosario, entrada de informe de importación; §17.P.12 fidelidad de la ida y vuelta; anexos E-14, E-15, E-21 |
| Marco de experiencia aplicado | [`Experiencia-De-Uso.md`](../Experiencia-De-Uso.md) §3.8 flujo FL-08, §8.1 taxonomía de errores |
| Representaciones que invoca | Ninguna. La superficie no exhibe estado de despliegue |
| Catálogo de diseño aplicado | `Design-Rules-Web-Generico.md` §4.6, §4.9, §5, §8; `Design-Rules-Blazor-Mudblazor.md` §4 y §5 |
| US a generar en 06 | US-CU-09-1 a US-CU-09-3, US-CU-10-1 a US-CU-10-3, US-CU-11-1 a US-CU-11-3, provisionales |
| Tests previstos en 08 | Snapshot de los dieciséis estados declarados; verificación de que ningún valor secreto aparece en ningún archivo emitido; verificación de que la lista de elementos no representables se declara vacía en lugar de omitirse; verificación de que exportar y reimportar reproduce el archivo de partida en las dimensiones que el intake declara |
| Brechas que declara | `B-UX-17`, ausencia de esta superficie en el mapa de navegación del anexo E-18. Recoge además B-12 de `02-Especificacion-Funcional`, sobre la colisión de identificador legible al importar |
| Maqueta de la Fase B2 | Nombre canónico `Exportación e importación`. Dieciséis estados declarados en §5, de los cuales catorce son demostrables: las filas marcadas no aplicable no se maquetan. La superficie tiene dos modos |
| Fuente de la correspondencia | La fila «CU origen» reproduce la fila de esta superficie en [`Experiencia-De-Uso.md`](../Experiencia-De-Uso.md) §9.2, que es la **fuente única** de la correspondencia entre superficie y caso de uso. Se reproduce, y no se referencia, porque `Rules-UX-UI-DX.md` §4.2.1 punto 8 la exige como sección obligatoria del wireframe |

---

## 9. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 2.0 | 2026-07-30 | **Migración normativa 4.1 → 6.0**, corte 4 de la fase M4, sobre el plan [`Plan-Migracion-4.1-a-6.0.md`](../../Audit/Plan-Migracion-4.1-a-6.0.md). Clasificación **regenerar contenido**, por el salto de `Rules-UX-UI-DX` 2.0 → 4.0. **Fuente de contenido: documento de origen**, más el [`PRODUCT-MANIFEST`](../../../Intake/PRODUCT-MANIFEST-SelfHosted-Service.md) §2 para el único campo de cabecera que se suma. Ni la asimetría entre los dos formatos de §3.1, ni las tres reglas del informe de §3.2, ni las diez interacciones, ni los dieciséis estados, ni la brecha `B-UX-17` cambian de contenido: lo que cambia es la nomenclatura. Las nueve secciones obligatorias de `Rules-UX-UI-DX` 4.0 §4.2.1 ya estaban presentes y ninguna se agregó ni se reordenó. **Cabecera**: `**Proyecto:**` llevaba un valor del plano de negocio y pasa a `**Producto:**`, porque `Vocabulario-Rules.md` §3 prohíbe la etiqueta de un plano sobre el valor de otro; se suma `**Proyecto de código:** SelfHosted-Service`, que §4.1 de la regla vigente exige y que este documento no declaraba, con el valor **leído del manifiesto y no inferido**. **Vocabulario (`[5.0]`)**: «solución» pasa a «producto» en **1 ocurrencia** del referente de nivel superior —«Administrador único de la solución» en §8—, con la concordancia de género corregida. Este documento **no tiene ninguna ocurrencia de «resolución»**, y se deja constancia del barrido. De las 25 ocurrencias de «proyecto», 1 era la etiqueta de cabecera, **19 llevan la forma calificada «proyecto SelfHosted»** y no se tocaron por designar la entidad del dominio —incluidas las dos de los bloques ASCII de §2—, **3 son «proyecto» o «proyectos» a secas con referente de entidad del dominio** —«desde el listado de proyectos» en §1 y en §4, y «crea un proyecto completo en una operación» en §7—, **1 es «agente humano del proyecto»** en §1, que queda a secas por su referente de emprendimiento, y **1 es el nombre de un artefacto del dominio**, `CU-11-Importacion-Como-Proyecto-Nuevo.md` en §8, que nombra a la entidad y no a la unidad de compilación. **Ninguna ocurrencia se promovió a «proyecto de código».** La sustitución se hizo por el procedimiento por ocurrencia de `Vocabulario-Rules.md` §9.5 y **nunca por reemplazo global de cadena**. Los dos bloques ASCII de §2 **conservan su ancho intacto**. Los nombres canónicos de superficie —`SUP-15` y `Exportación e importación`— se conservan textualmente, porque `Deriva-Rules.md` exige que coincidan término por término con la línea de base visual. **Glosario (`[5.1]`)**: `Glosario-UX.md` pasa de recomendado a obligatorio para los ocho tipos D8 y §6 verifica ahora su existencia y su completitud además de la no duplicación; lo emite un lote posterior de esta migración, y los términos que este wireframe acuña —selección de artefactos, declaración de la asimetría, superficie en dos modos, lista declarada vacía— se devolvieron para que ese lote los consuma sin redefinir los que ya están en `Glosario-Funcional.md` de 02, en particular formato estándar de composición, manifiesto propio, disposición del lienzo, marcador de variable e informe de importación. Ninguna fila anterior de este control de cambios se reescribió (`SDD-Development-Guide.md` §VI.2) y el bloque de procedencia del destino no se tocó: sigue declarando 4.1, y cerrarlo es trabajo de M5 |
| 1.0 | 2026-07-29 | Versión inicial. Especifica la superficie en dos modos que no comparten composición; declara la brecha `B-UX-17`, que es la ausencia de esta superficie en el mapa de navegación del anexo E-18 pese a que cuatro casos de uso la exigen; declara la asimetría entre los dos formatos **antes** de exportar en lugar de dejar que se descubra al reimportar, y la garantía de que el conjunto de cambios pendientes no se exporta; declara las tres reglas de composición del informe de importación, incluida la de que la lista de elementos no representables se declara vacía en lugar de omitirse; declara dieciséis estados |
| 1.0 | 2026-07-29 | Corrección del audit de la Fase B, absorbida dentro de la versión de emisión, sin subir versión y sin archivar, por la política de versionado de `Master-Prompt.md` §5: el documento está en estado `Propuesto` y la corrección proviene del audit de su propia fase. **H-06, P1:** Se suma a §8 la fila que declara la fuente única de la correspondencia entre superficie y caso de uso. **Brecha `B-UX-15` retirada por falsa:** §6 deja de declarar ausente el punto de quiebre y cita la norma que `Design-Rules-Web-Generico.md` §8 sí declara, acotando lo delegado a los anchos de verificación de la etapa `b`. Origen: informe [`Audit/B-02-03-r1.md`](../../Audit/B-02-03-r1.md) |
