# Wireframes — Revisión de higiene

**Proyecto:** SelfHosted Service
**Documento:** Wireframes-Revision-De-Higiene.md
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
  - [3.1 Las cinco detecciones y qué informa cada una](#31-las-cinco-detecciones-y-qué-informa-cada-una)
  - [3.2 La inversión que la superficie materializa](#32-la-inversión-que-la-superficie-materializa)
  - [3.3 Dónde más aparecen estos avisos](#33-dónde-más-aparecen-estos-avisos)
- [4. Interacciones](#4-interacciones)
- [5. Estados](#5-estados)
- [6. Versión responsive](#6-versión-responsive)
- [7. Notas de implementación](#7-notas-de-implementación)
- [8. Trazabilidad](#8-trazabilidad)
- [9. Control de cambios](#9-control-de-cambios)

---

## 1. Pantalla y propósito

**Nombre canónico de la superficie: `Revisión de higiene`** (`SUP-16`).

Su tarea es que el administrador tenga a la vista el inventario de condiciones que el registro del proyecto SelfHosted acumuló sin que nadie las viera: variables compartidas que nadie usa, nombres repetidos en el mismo ámbito y referencias que quedaron sin uso tras un cambio.

Su rasgo definitorio es que **ninguna detección bloquea nada**. `02-Especificacion-Funcional` declara explícitamente que la presentación de los avisos pertenece a esta categoría, y esa presentación tiene un requisito duro: no puede materializarse como algo que impida continuar.

El anexo E-18 no la maqueta y su ruta no figura en el mapa de navegación. Se especifica como superficie propia alcanzable desde la navegación del proyecto SelfHosted, y se declara en la brecha `B-UX-17` junto con la superficie de exportación e importación.

---

## 2. Layout

Superficie del shell de trabajo, dentro del proyecto SelfHosted abierto. Lista de avisos agrupados por lo que detectan.

```text
+-----------------------------------------------------------------------+
| [=] <titulo del panel>      <identidad>  [Cambiar contrasena] [Salir] |
+---------+-------------------------------------------------------------+
| Lienzo  |  Revision del proyecto                                      |
| Logs    |  <subtitulo: condiciones detectadas. Ninguna impide operar> |
| Metr.   |  ---------------------------------------------------------  |
| Ajustes |  Variables compartidas sin uso                       <n>    |
|         |   · <clave> — <descripcion>              [ Ver ] [ Eliminar]|
|         |   · <clave> — <descripcion>              [ Ver ] [ Eliminar]|
|         |  ---------------------------------------------------------  |
|         |  Nombres repetidos en el mismo ambito                <n>    |
|         |   · <nombre> — <ambito>                  [ Ver ] [Renombrar]|
|         |  ---------------------------------------------------------  |
|         |  Claves que ya existian al instanciar                <n>    |
|         |   · <clave> — mismo valor                [ Ver ] [ Reusar ] |
|         |   · <clave> — distinto valor             [ Ver ]            |
|         |  ---------------------------------------------------------  |
|         |  Referencias sin uso                                 <n>    |
|         |   · <servicio> · <clave>                 [ Ver ]            |
+---------+-------------------------------------------------------------+
```

**No hay acción primaria en esta pantalla.** Es una superficie de lectura con acciones de navegación y de corrección puntual, y ninguna de ellas es la acción que la superficie viene a proponer: la superficie no propone, informa.

---

## 3. Componentes principales

| Componente | Propósito | Datos que muestra | Comportamiento |
| --- | --- | --- | --- |
| Encabezado de la sección | Nombra la superficie y declara su carácter | Título y subtítulo | El subtítulo dice, con esas palabras, que **ninguna condición impide operar** |
| Grupo de detección | Agrupa los avisos por lo que detectan | Nombre de la detección y su conteo | Cuatro grupos, uno por clase de detección |
| Fila de aviso | Es la unidad de información | El elemento alcanzado, con el dato que lo identifica | **Nunca es un control que bloquea**: es una fila informativa con acciones opcionales |
| Acción de ver | Lleva al elemento alcanzado | — | Navegación a la superficie donde el elemento vive |
| Acción de corrección | Ofrece la corrección cuando corresponde | — | Ver §3.2. **Siempre opcional** |

### 3.1 Las cinco detecciones y qué informa cada una

Transcriptas del intake sin agregar ni quitar ninguna. Son cinco: las tres que se evalúan al abrir la revisión y en la revisión periódica, y las dos que se evalúan al instanciar un ítem del catálogo.

| Detección | Qué informa | Momento en que se evalúa |
| --- | --- | --- |
| Variable compartida sin ninguna referencia | Está huérfana: se creó y nadie la usa | Al abrir la revisión, y en la revisión periódica |
| Dos elementos con el mismo nombre visible en el mismo ámbito | No es error, pero conviene poder renombrar uno | Al abrir la revisión, y en la revisión periódica |
| Al instanciar, una clave que ya existe **con el mismo valor** | Probablemente convenga compartir: ahí sí se ofrece reusar | Al instanciar un ítem del catálogo |
| Al instanciar, una clave que ya existe **con distinto valor** | Casi seguro son cosas distintas: se crean separadas y se avisa | Al instanciar un ítem del catálogo |
| Referencia que quedó sin uso tras un cambio | Deuda que se acumula sin que nadie la vea | Al abrir la revisión, y en la revisión periódica |

**Brecha `B-UX-20`.** El intake declara la revisión periódica del proyecto SelfHosted como uno de los momentos de evaluación, y **no declara su frecuencia**. Es la brecha B-15 de `02-Especificacion-Funcional`, con destinatario en `05-Arquitectura-Tecnica`. La consecuencia acá es que la superficie **no puede declarar cada cuánto se refresca su contenido**, y por lo tanto no exhibe ninguna promesa de actualidad que no pueda cumplir.

### 3.2 La inversión que la superficie materializa

El intake declara la razón de ser de esta capacidad con precisión, y conviene no diluirla: en lugar de preguntar antes de instanciar y obligar al administrador a decidir a ciegas —sin saber todavía si las dos cosas que se llaman igual son la misma—, el sistema **crea separado, que es lo seguro, y después informa** si detecta que probablemente convenga compartir. La decisión se toma con la información delante y es reversible, que es lo contrario de un diálogo que bloquea.

Cuatro consecuencias de diseño que esta superficie hace cumplir:

1. **Ninguna detección se materializa como diálogo modal.** Ni acá, ni en el catálogo al instanciar, ni en la superficie de variables compartidas.
2. **La acción de reusar se ofrece sólo cuando el valor coincide.** Cuando difiere, la fila informa y **no ofrece reusar**: casi seguro son cosas distintas, y ofrecer la fusión invitaría a un error difícil de deshacer.
3. **Las acciones de corrección son opcionales y no se destacan como primarias.** La superficie no empuja a limpiar.
4. **Un registro sin condiciones detectadas no es un logro.** Su estado vacío informa que no hay advertencias, sin felicitar ni gamificar.

### 3.3 Dónde más aparecen estos avisos

Esta superficie es la vista consolidada, no la única. Los mismos avisos aparecen, acotados a su contexto, en dos lugares más:

| Superficie | Qué aviso exhibe |
| --- | --- |
| [`Wireframes-Variables-Compartidas-Del-Proyecto.md`](Wireframes-Variables-Compartidas-Del-Proyecto.md) | La marca de sin uso en la columna de uso de cada variable |
| [`Wireframes-Catalogo-De-Plantillas.md`](Wireframes-Catalogo-De-Plantillas.md) | Las tres detecciones que la instanciación produce, incluido el aviso de nombre sufijado |

El texto de cada aviso es el mismo en los tres lugares. Es la aplicación de la ley de Jakob a los mensajes: un mismo hallazgo se dice igual donde sea que aparezca.

---

## 4. Interacciones

| Acción | Disparador | Resultado esperado | Precondición |
| --- | --- | --- | --- |
| Abrir la revisión | Navegación desde el proyecto SelfHosted | El sistema detecta las condiciones y las presenta **como avisos informativos, cada uno con el elemento alcanzado** | Existe el proyecto SelfHosted |
| Ver un elemento alcanzado | Acción de la fila | Navegación a la superficie donde el elemento vive | Existe el elemento |
| Eliminar una variable huérfana | Acción de la fila | Se elimina. Si entretanto adquirió referencias, **se rechaza con la lista de quienes la referencian** | La variable no tiene referencias |
| Renombrar un elemento con nombre repetido | Acción de la fila | Navegación a la superficie donde se renombra. **Ninguna referencia se rompe**, porque las relaciones se establecen por identidad y nunca por nombre | Existe el elemento |
| Reusar una clave coincidente | Acción de la fila | Se unifican en el objeto ya existente | La clave coincide **y el valor también** |
| Ignorar un aviso | Ninguna acción | El aviso permanece. **No hay acción de descartar**, porque descartar un aviso lo volvería invisible sin haberlo resuelto | — |
| Ser bloqueado por una detección | — | **No existe.** Ninguna condición de higiene impide ninguna operación | — |

---

## 5. Estados

| Estado | Condición que lo produce | Representación esperada |
| --- | --- | --- |
| Vacío | El registro no tiene condiciones detectadas | El sistema **informa que no hay advertencias**, sin felicitar ni gamificar. Es un estado normal, no un logro |
| Cargando | La detección está en curso | Esqueleto de grupos |
| Con datos | Hay condiciones detectadas | Los grupos con condiciones, cada uno con su conteo. **Los grupos sin condiciones no se dibujan** |
| Variable compartida huérfana | Ninguna referencia la usa | Fila con la clave y su descripción, y la acción de eliminar |
| Nombre repetido en el mismo ámbito | Dos elementos comparten nombre visible | Fila con el nombre y el ámbito, y la acción de renombrar. **No es error** |
| Clave existente con el mismo valor | Coincidencia de clave y valor al instanciar | Fila que **ofrece reusar** |
| Clave existente con distinto valor | Coincidencia de clave y no de valor al instanciar | Fila que **no ofrece reusar** |
| Referencia sin uso | Una referencia quedó sin consumidor tras un cambio | Fila con el servicio y la clave |
| Rechazo al eliminar una variable con referencias | La variable adquirió referencias entre la detección y la acción | Rechazo **con la lista de servicios y claves que la referencian**. La variable no se elimina |
| Error | La detección no pudo completarse | Banda de error con causa. **El registro queda intacto**: el caso de uso es de lectura y no lo modifica |
| Sin permiso | — | **No aplica.** Una sola identidad |

---

## 6. Versión responsive

La matriz de plataforma declara una única familia de navegador de escritorio y excluye navegadores móviles y pantallas pequeñas. Esta superficie **no tiene versión móvil especificada**.

- Los grupos son apilados por naturaleza y reflúyen sin punto de quiebre propio.
- Las filas pasan de una disposición en columnas a una disposición apilada por debajo del punto de quiebre principal, con las acciones al pie de cada fila.
- Reflujo conforme al criterio 1.4.10 a 320 píxeles.

**Norma de diseño aplicada, no brecha.** El punto de quiebre principal alrededor de 768 px y el piso de 320 px sin desplazamiento horizontal los declara `Design-Rules-Web-Generico.md` §8, y esta superficie los aplica. Lo único delegado son los **anchos de verificación**: en cuáles comprueba la etapa `b` el comportamiento y lo registra en su informe de cierre, según `Compatibilidad-Plataformas.md` §4. La brecha `B-UX-15`, que declaraba ausente la norma, se retiró por falsa; ver [`Experiencia-De-Uso.md`](../Experiencia-De-Uso.md) §10.2.1.

---

## 7. Notas de implementación

**Accesibilidad.**

- Cada grupo es una región con nombre accesible que incluye su conteo.
- Los avisos se anuncian como **región de estado, no como alerta**: informan y no interrumpen. Un aviso de higiene anunciado como alerta contradice la propiedad que lo define.
- El nombre accesible de cada acción de fila nombra el elemento sobre el que actúa, no sólo el verbo.
- La acción de reusar declara en su etiqueta accesible qué unifica con qué.
- El estado vacío es texto, no ilustración con significado: la ausencia de advertencias es información y tiene que leerse como tal.

**Performance percibida.** Las detecciones se resuelven por enumeración indexada y no por búsqueda de texto, de modo que la superficie no degrada con el tamaño del proyecto SelfHosted. La superficie es de lectura y **no modifica el registro por el hecho de abrirse**.

**Internacionalización.** Claves, nombres de servicio y nombres de elemento se muestran literales. Los textos de cada aviso son prosa del producto.

---

## 8. Trazabilidad

| Dimensión | Referencia |
| --- | --- |
| Persona objetivo | Administrador único de la solución: [`Vision-Producto.md`](../../00-Contexto/Vision-Producto.md) §2.1 |
| CU origen | [CU-36](../../02-Especificacion-Funcional/Casos-De-Uso/CU-36-Revision-De-Higiene-Del-Registro.md) Revisión de higiene del registro |
| Reglas de negocio relevantes | RN-27, RN-28, RN-33, RN-35, RN-36, RN-37 |
| Insumo del intake | §4 capacidad F-25 y su tabla de cinco detecciones; §12 glosario, entrada de higiene del modelo |
| Marco de experiencia aplicado | [`Experiencia-De-Uso.md`](../Experiencia-De-Uso.md) §8.1 taxonomía de errores, última fila |
| Representaciones que invoca | Ninguna. La superficie no exhibe estado de despliegue |
| Catálogo de diseño aplicado | `Design-Rules-Web-Generico.md` §3.2, §3.3, §4.3, §4.9, §5; `Design-Rules-Config-Esquema.md` §5 |
| US a generar en 06 | US-CU-36-1 a US-CU-36-3, provisionales |
| Tests previstos en 08 | Snapshot de los once estados declarados; verificación de que ninguna detección bloquea ninguna operación; verificación de que la acción de reusar se ofrece sólo cuando el valor coincide; test de accesibilidad sobre el anuncio de los avisos como estado y no como alerta |
| Brechas que declara | `B-UX-20`, frecuencia de la revisión periódica sin declarar (B-15 de `02-Especificacion-Funcional`); `B-UX-17`, ausencia de esta ruta en el mapa de navegación |
| Maqueta de la Fase B2 | Nombre canónico `Revisión de higiene`. Once estados declarados en §5, de los cuales diez son demostrables: las filas marcadas no aplicable no se maquetan |
| Fuente de la correspondencia | La fila «CU origen» reproduce la fila de esta superficie en [`Experiencia-De-Uso.md`](../Experiencia-De-Uso.md) §9.2, que es la **fuente única** de la correspondencia entre superficie y caso de uso. Se reproduce, y no se referencia, porque `Rules-UX-UI-DX.md` §4.2.1 punto 8 la exige como sección obligatoria del wireframe |

---

## 9. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 1.0 | 2026-07-29 | Versión inicial. Especifica la vista consolidada de las condiciones de higiene que `02-Especificacion-Funcional` delega explícitamente a esta categoría; transcribe las cinco detecciones sin agregar ni quitar ninguna; declara las cuatro consecuencias de diseño de la inversión que el intake describe —crear separado e informar después—, incluida la prohibición de materializar cualquier detección como diálogo modal y la de ofrecer reusar cuando el valor difiere; declara dónde más aparecen los mismos avisos y que su texto es único; declara once estados y la brecha `B-UX-20` sobre la frecuencia de la revisión periódica |
| 1.0 | 2026-07-29 | Corrección del audit de la Fase B, absorbida dentro de la versión de emisión, sin subir versión y sin archivar, por la política de versionado de `Master-Prompt.md` §5: el documento está en estado `Propuesto` y la corrección proviene del audit de su propia fase. **H-14, P3:** el encabezado de §3.1 y su entrada en la tabla de contenido pasan de cuatro a cinco detecciones, que es la cantidad real de filas de su tabla. Se suma la fila que declara la fuente única de la correspondencia. **Brecha `B-UX-15` retirada por falsa:** §6 deja de declarar ausente el punto de quiebre y cita la norma que `Design-Rules-Web-Generico.md` §8 sí declara, acotando lo delegado a los anchos de verificación de la etapa `b`. Origen: informe [`Audit/B-02-03-r1.md`](../../Audit/B-02-03-r1.md) |
