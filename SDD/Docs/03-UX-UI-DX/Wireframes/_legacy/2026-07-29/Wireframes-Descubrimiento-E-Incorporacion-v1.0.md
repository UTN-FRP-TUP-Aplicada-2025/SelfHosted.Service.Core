> **Bloque de archivado.** Estado: `Superado`. Copia completa y autocontenida de la versión 1.0 de `Wireframes-Descubrimiento-E-Incorporacion.md`, tomada el 2026-07-29 antes de incorporar a la especificación las definiciones de alta y configuración de servicios y de ítems del catálogo que `SDD/Estado/Redefinicion-Servicio.md` v2.0 establece en su parte normativa (§16 a §23). La versión vigente es `../../Wireframes-Descubrimiento-E-Incorporacion.md`. El cuerpo de este snapshot no se modifica.

# Wireframes — Descubrimiento e incorporación

**Proyecto:** SelfHosted Service
**Documento:** Wireframes-Descubrimiento-E-Incorporacion.md
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
  - [3.1 La tabla de clasificación y su derivación](#31-la-tabla-de-clasificación-y-su-derivación)
  - [3.2 La advertencia de corte](#32-la-advertencia-de-corte)
- [4. Interacciones](#4-interacciones)
- [5. Estados](#5-estados)
- [6. Versión responsive](#6-versión-responsive)
- [7. Notas de implementación](#7-notas-de-implementación)
- [8. Trazabilidad](#8-trazabilidad)
- [9. Control de cambios](#9-control-de-cambios)

---

## 1. Pantalla y propósito

**Nombre canónico de la superficie: `Descubrimiento e incorporación`** (`SUP-10`).

Es el flujo diferencial del producto: lo que hace la herramienta aplicable sobre un servidor que ya está en producción. Su tarea es que el administrador vea los contenedores que ya corren en su servidor y los incorpore a un proyecto SelfHosted **sin recrearlos ni cortar el servicio**.

Corresponde a la ruta `/descubrimiento` del mapa de navegación del anexo E-18. El flujo tiene **cuatro pasos y no tres** —descubrir, elegir, **clasificar** y confirmar—, y el tercero es obligatorio: sin clasificación confirmada, el servicio no se crea.

**Pendencia declarada `B-UX-02`.** El anexo E-18 no maqueta el paso de clasificación de variables, y `02-Especificacion-Funcional` lo transfiere como brecha B-07 a esta categoría. A diferencia de la distinción visual de las aristas, **acá sí hay de dónde derivarlo**: el anexo E-11 declara la carga útil completa del paso, las reglas de incorporación RA-05 y RA-06 del anexo E-7 declaran su comportamiento, y el catálogo de diseño aporta el patrón de grilla de listado y el de formulario. Se especifica por derivación y se declara la derivación, para que el agente humano del proyecto pueda confirmarla.

---

## 2. Layout

Superficie de dos pasos sobre el shell de trabajo. El primero lista candidatos; el segundo es el paso obligatorio de clasificación.

```text
Paso 1 — candidatos

+-----------------------------------------------------------------------+
| [=] <titulo del panel>      <identidad>  [Cambiar contrasena] [Salir] |
+---------+-------------------------------------------------------------+
| Lienzo  |  Incorporar contenedores existentes                         |
| Logs    |  <subtitulo: solo lectura, listar no habilita operar>       |
| Metr.   |  ---------------------------------------------------------  |
| Ajustes |  [ buscar...              ]  [ incorporables v ]            |
|         |  ---------------------------------------------------------  |
|         |  Nombre     Imagen      Estado  Red/Direccion  Vars  ...    |
|         |  ---------------------------------------------------------  |
|         |  <nombre>   <imagen>   (i)<est> <modo>/<dir>   <n>  [Incorp]|
|         |  <nombre>   <imagen>   (i)<est> <modo>/<dir>   <n>  [Incorp]|
|         |  ---------------------------------------------------------  |
|         |  <nombre>   <imagen>   ...                        deshabil. |
|         |  (!) <motivo de no incorporabilidad>            [Forzar]    |
|         |  ---------------------------------------------------------  |
|         |  <nombre>   <imagen>   ...                        deshabil. |
|         |  (i) Ya incorporado por <proyecto SelfHosted>               |
+---------+-------------------------------------------------------------+


Paso 2 — clasificacion de variables (obligatorio)

+- Clasificar las variables de <nombre> ----------------- X -+
|  <n> variables importadas. Marca las que son secretas.     |
|  Las detectadas ya vienen marcadas; podes cambiar          |
|  cualquiera.                                               |
+------------------------------------------------------------+
|  Secreta | Clave              | Valor        | Sugerencia   |
|  --------+--------------------+--------------+------------  |
|   [ x ]  | <clave>            | ********     | <motivo>     |
|   [   ]  | <clave>            | <valor>      | -            |
|   [ x ]  | <clave>            | ********     | -            |
|   [   ]  | <clave>            | <valor>      | -            |
+------------------------------------------------------------+
|  (!) <advertencia: el primer redespliegue implica corte>    |
+------------------------------------------------------------+
| [ Cancelar ]                    [ Confirmar e incorporar ]  |
+------------------------------------------------------------+
```

El paso 2 **no es una pantalla que se pueda saltear ni un aviso que se pueda descartar**. No hay acción de «omitir» ni de «usar las sugerencias y seguir»: las sugerencias ya vienen aplicadas, y lo que falta es la confirmación del administrador.

---

## 3. Componentes principales

| Componente | Propósito | Datos que muestra | Comportamiento |
| --- | --- | --- | --- |
| Encabezado de la sección | Nombra la superficie y declara que el descubrimiento es de sólo lectura | Título y subtítulo | El subtítulo declara que **listar no habilita operar**, que es una de las salvaguardas de aislamiento obligatorias |
| Barra de búsqueda y filtros | Acota el listado de candidatos | — | Filtra sobre lo devuelto, sin volver a consultar el motor |
| Grilla de candidatos | Es la unidad de decisión | Por candidato: nombre, imagen, estado observado, redes con su modo y su dirección, montajes, fecha de creación y **cantidad de variables detectadas** | Patrón §4.3 del documento base. Fila con acción de incorporar |
| Fila no incorporable | Impide una incorporación que crearía una dependencia circular de control | El **motivo escrito**, no sólo la marca | Fila deshabilitada, con la acción de forzar disponible y diferenciada |
| Fila ya incorporada | Hace cumplir que un contenedor pertenece a un solo proyecto SelfHosted | El **nombre del proyecto SelfHosted que lo tomó** | Fila deshabilitada. **No vuelve a ofrecerse** |
| Tabla de clasificación | Es el paso obligatorio | Por variable: marca de secreta, clave, valor y **motivo de la sugerencia** cuando la hay | Ver §3.1 |
| Advertencia de corte futuro | Declara la consecuencia diferida | — | Ver §3.2 |
| Acción primaria del paso 2 | Confirma la clasificación e incorpora | El verbo nombra las dos cosas: confirmar e incorporar | Se deshabilita durante el envío |

### 3.1 La tabla de clasificación y su derivación

La composición se deriva campo por campo de la carga útil que el anexo E-11 declara. La derivación se hace explícita para que sea impugnable:

| Columna de la tabla | Campo de la carga útil del anexo E-11 | Comportamiento derivado |
| --- | --- | --- |
| Marca de secreta | El campo que registra lo que el administrador decide | Es el único control editable de la tabla. Viene premarcado cuando la heurística sugirió |
| Clave | La clave de la variable | Texto literal, no editable en este paso |
| Valor | El valor de la variable | **Enmascarado cuando la variable está marcada como secreta.** El valor de una variable marcada como secreta viaja enmascarado **incluso dentro de la carga útil de este mismo paso** |
| Sugerencia | El campo que registra el motivo de la sugerencia de la heurística | Texto informativo. Vacío cuando la heurística no sugirió |

Dos reglas que la tabla hace cumplir, y que son la razón por la que el paso existe:

- **La heurística sugiere; no decide.** Son dos campos distintos justamente porque uno ya no determina al otro. Una variable que la heurística no detecta llega **desmarcada, no en claro y sin aviso**, y es el administrador el que la marca.
- **Se ven todas las variables importadas, no sólo las sugeridas.** Una tabla que muestre únicamente las detectadas reintroduce el defecto que el paso vino a corregir: apostar a que la lista de fragmentos de nombre esté completa.

La traza de lo que ocurrió en este paso —quién confirmó, cuándo, qué sugirió la heurística, qué marcó y qué desmarcó el administrador— **se persiste y es auditable**. No se exhibe en este paso; se lee después, desde el panel lateral del servicio incorporado.

### 3.2 La advertencia de corte

El anexo E-11 declara que el contenedor **no se recrea en ningún momento del flujo**, y que el primer redespliegue posterior sí implica corte: «la interfaz debe advertirlo con esas palabras».

La advertencia aparece dos veces, y las dos son necesarias:

1. **En el paso 2, antes de confirmar la incorporación**, como declaración de la consecuencia diferida: lo que se incorpora ahora no se corta, pero el primer redespliegue sí lo hará.
2. **En la acción de redesplegar del panel lateral del servicio incorporado**, en el momento en que la consecuencia se materializa.

---

## 4. Interacciones

| Acción | Disparador | Resultado esperado | Precondición |
| --- | --- | --- | --- |
| Abrir el descubrimiento | Navegación desde el proyecto SelfHosted | El sistema consulta el motor de contenedores **en modo sólo lectura**, inspecciona lo que encuentra y devuelve los candidatos con su marca de incorporabilidad, su motivo cuando no lo son y la sugerencia de la heurística | Sesión iniciada y proyecto SelfHosted destino existente |
| Elegir un candidato | Acción de la fila | El sistema importa la configuración observada —imagen, red, dirección, montajes, dispositivos y variables— y **presenta el paso obligatorio de clasificación** | El candidato es incorporable |
| Consultar las variables de un candidato | Acción de la fila, antes de elegirlo | Se devuelven las variables con la sugerencia de la heurística; **los valores de las sugeridas viajan enmascarados** | El candidato es incorporable |
| Forzar un candidato no incorporable | Acción diferenciada de la fila | El sistema exige **confirmación explícita escribiendo el nombre** antes de continuar, porque gobernarlo desde el administrador crearía una dependencia circular de control | El candidato es no incorporable |
| Marcar o desmarcar una variable | Casilla de la tabla | El valor se enmascara al marcar y se muestra al desmarcar. Sin efecto en el sistema hasta confirmar | El paso 2 está abierto |
| Confirmar e incorporar | Acción primaria del paso 2 | El sistema crea el servicio **vinculado al contenedor existente por su identificador, sin recrearlo**; persiste lo marcado como secreto cifrado en reposo con recarga manual pendiente, y lo no marcado como valor literal; persiste la traza de la clasificación; y **el nodo aparece en el lienzo ya activo** | La tabla está confirmada |
| Abandonar la clasificación | Acción secundaria o cierre | **El servicio no se crea y el contenedor sigue sin incorporar.** Retorno al paso 1 | El paso 2 está abierto |
| Confirmar sin clasificación | — | **No existe.** La incorporación no se completa sin el paso de clasificación confirmado | — |
| Operar sobre un contenedor desde el descubrimiento | — | **No existe.** Ninguna operación de escritura se habilita desde el descubrimiento | — |

---

## 5. Estados

| Estado | Condición que lo produce | Representación esperada |
| --- | --- | --- |
| Vacío | El servidor no tiene contenedores candidatos | Listado vacío **sin error**, con texto orientativo |
| Cargando | El motor de contenedores se está consultando | Esqueleto de la grilla |
| Con datos | Hay candidatos | Grilla con las filas y su marca de incorporabilidad |
| Candidato incorporable | El contenedor no está incorporado y no monta el punto de acceso del motor | Fila activa con su acción de incorporar |
| Candidato no incorporable | El contenedor monta el punto de acceso del motor | Fila deshabilitada, **con el motivo escrito** y la acción de forzar diferenciada |
| Candidato ya incorporado | El contenedor pertenece a otro proyecto SelfHosted | Fila deshabilitada, **con el nombre del proyecto SelfHosted que lo tomó**. No vuelve a ofrecerse |
| Vacío por filtro | La búsqueda no devuelve resultados | Estado vacío distinto, con la acción de limpiar el filtro |
| Motor inalcanzable | El punto de acceso del motor no responde | Banda de error con la causa **traducida a una causa identificable propia**, sin propagar el tipo del cliente del motor |
| Clasificación pendiente | Se eligió un candidato | Paso 2 abierto, con todas las variables importadas y las sugeridas premarcadas |
| Variable con sugerencia | La heurística detectó la clave | Marca activada y **motivo de la sugerencia visible** |
| Variable sin sugerencia | La heurística no detectó la clave | Marca **desactivada**, valor visible, columna de sugerencia vacía |
| Variable marcada por el administrador | El administrador activó la marca | Valor enmascarado desde ese momento |
| Incorporando | La confirmación está en curso | Acción primaria deshabilitada con indicador de progreso |
| Incorporado | El servicio se creó | El nodo aparece en el lienzo **ya activo**, sin corte del servicio que ya corría |
| Rechazo por clasificación ausente | Se intentó confirmar sin clasificación | Rechazo: el servicio no se crea y el contenedor sigue sin incorporar |
| Rechazo por nombre | El nombre derivado del contenedor no cumple el formato o ya existe en el proyecto SelfHosted destino | Rechazo con **el campo del nombre señalado** |
| Rechazo por pertenencia | El contenedor ya pertenece a otro proyecto SelfHosted | Rechazo |
| Sin permiso | — | **No aplica.** Una sola identidad |

---

## 6. Versión responsive

La matriz de plataforma declara una única familia de navegador de escritorio y excluye navegadores móviles y pantallas pequeñas. Esta superficie **no tiene versión móvil especificada**.

- La grilla de candidatos y la tabla de clasificación son contenido tabular ancho: se desplazan **dentro de su propio contenedor**, sin que el cuerpo de la página se desplace en horizontal.
- Por debajo del punto de quiebre principal, la barra lateral colapsa y las columnas menos densas de la grilla se pliegan bajo el nombre del candidato.
- La columna de marca de secreta y la de clave **nunca se pliegan**: son las dos que sostienen la decisión del paso obligatorio.

**Norma de diseño aplicada, no brecha.** El punto de quiebre principal alrededor de 768 px y el piso de 320 px sin desplazamiento horizontal los declara `Design-Rules-Web-Generico.md` §8, y esta superficie los aplica. Lo único delegado son los **anchos de verificación**: en cuáles comprueba la etapa `b` el comportamiento y lo registra en su informe de cierre, según `Compatibilidad-Plataformas.md` §4. La brecha `B-UX-15`, que declaraba ausente la norma, se retiró por falsa; ver [`Experiencia-De-Uso.md`](../Experiencia-De-Uso.md) §10.2.1.

---

## 7. Notas de implementación

**Accesibilidad.**

- La tabla de clasificación es una tabla de datos con encabezados asociados: recorrerla por teclado tiene que decir, en cada casilla, de qué variable se trata.
- El nombre accesible de cada casilla de marca nombra la clave de su variable, no sólo «secreta».
- Las filas deshabilitadas **exponen su motivo**, no sólo su estado: una fila que no se puede elegir sin decir por qué es un callejón sin salida.
- La advertencia de corte se asocia a la acción primaria, para que se anuncie antes de confirmar.
- El cambio de enmascarado al marcar una variable se anuncia: es un cambio de contenido que ocurre en respuesta a una acción y afecta a lo que se ve.
- La acción de forzar lleva etiqueta accesible que nombra la consecuencia completa.

**Performance percibida.** La consulta al motor de contenedores es la operación más lenta de esta superficie: se muestra esqueleto por encima de aproximadamente 400 ms. La incorporación no recrea el contenedor, de modo que su duración es la de una escritura, no la de un despliegue.

**Internacionalización.** Nombres de contenedor, imágenes, direcciones, rutas de montaje y claves de variable se muestran literales. Las fechas de creación llevan formato con desplazamiento horario explícito.

---

## 8. Trazabilidad

| Dimensión | Referencia |
| --- | --- |
| Persona objetivo | Administrador único de la solución: [`Vision-Producto.md`](../../00-Contexto/Vision-Producto.md) §2.1 |
| CU origen | [CU-06](../../02-Especificacion-Funcional/Casos-De-Uso/CU-06-Descubrimiento-De-Contenedores-Adoptables.md), [CU-07](../../02-Especificacion-Funcional/Casos-De-Uso/CU-07-Incorporacion-Con-Confirmacion-Explicita.md), [CU-08](../../02-Especificacion-Funcional/Casos-De-Uso/CU-08-Traduccion-De-La-Configuracion-Observada.md) |
| Reglas de negocio relevantes | RN-01, RN-02, RN-07, RN-11, RN-15, RN-17, RN-26, RN-29, RN-34 |
| Insumo del intake | §4 capacidad F-11; §6 flujo 2; §7 casos límite CL-07, CL-08 y CL-15; §17.P.5 salvaguardas de aislamiento y enmascarado en la incorporación; anexos E-7, E-11, E-20, E-21 |
| Marco de experiencia aplicado | [`Experiencia-De-Uso.md`](../Experiencia-De-Uso.md) §3.4 flujo FL-04, §8.1 taxonomía de errores |
| Representaciones que invoca | [`Representacion-Lenguaje-Visual-De-Estados.md`](../Representaciones/Representacion-Lenguaje-Visual-De-Estados.md) |
| Catálogo de diseño aplicado | `Design-Rules-Web-Generico.md` §4.3, §4.4, §4.6, §4.9, §4.10, §5, §7, §8; `Design-Rules-Config-Esquema.md` §4.1 campo dirigido por descriptor; `Design-Rules-Blazor-Mudblazor.md` §4 |
| US a generar en 06 | US-CU-06-1 a US-CU-06-3, US-CU-07-1 a US-CU-07-4, US-CU-08-1 a US-CU-08-3, provisionales |
| Tests previstos en 08 | Snapshot de los dieciocho estados declarados; verificación de que la incorporación sin clasificación confirmada se rechaza; verificación de que una variable no detectada llega desmarcada y no en claro; verificación de que ninguna operación de escritura se habilita desde el descubrimiento |
| Brechas que declara | `B-UX-02`, maquetado del paso de clasificación resuelto por derivación (B-07 de `02-Especificacion-Funcional`) |
| Maqueta de la Fase B2 | Nombre canónico `Descubrimiento e incorporación`. Dieciocho estados declarados en §5, de los cuales diecisiete son demostrables: las filas marcadas no aplicable no se maquetan. La superficie tiene dos pasos |
| Fuente de la correspondencia | La fila «CU origen» reproduce la fila de esta superficie en [`Experiencia-De-Uso.md`](../Experiencia-De-Uso.md) §9.2, que es la **fuente única** de la correspondencia entre superficie y caso de uso. Se reproduce, y no se referencia, porque `Rules-UX-UI-DX.md` §4.2.1 punto 8 la exige como sección obligatoria del wireframe |

---

## 9. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 1.0 | 2026-07-29 | Versión inicial. Especifica el flujo de cuatro pasos con el tercero obligatorio; **resuelve por derivación la pendencia `B-UX-02`** —maquetado del paso de clasificación de variables, brecha B-07 de `02-Especificacion-Funcional`— derivando la tabla campo por campo de la carga útil del anexo E-11 y de las reglas RA-05 y RA-06 del anexo E-7, y declarando la derivación para que sea impugnable; declara las dos reglas que la tabla hace cumplir, que la heurística sugiere y no decide y que se ven todas las variables importadas; especifica la advertencia de corte en sus dos apariciones; declara dieciocho estados |
| 1.0 | 2026-07-29 | Corrección del audit de la Fase B, absorbida dentro de la versión de emisión, sin subir versión y sin archivar, por la política de versionado de `Master-Prompt.md` §5: el documento está en estado `Propuesto` y la corrección proviene del audit de su propia fase. **H-06, P1:** Se suma a §8 la fila que declara la fuente única de la correspondencia entre superficie y caso de uso. **Brecha `B-UX-15` retirada por falsa:** §6 deja de declarar ausente el punto de quiebre y cita la norma que `Design-Rules-Web-Generico.md` §8 sí declara, acotando lo delegado a los anchos de verificación de la etapa `b`. Origen: informe [`Audit/B-02-03-r1.md`](../../Audit/B-02-03-r1.md) |
