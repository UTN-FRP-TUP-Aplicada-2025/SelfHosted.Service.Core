# Wireframes — Informe de conflicto de direcciones

**Proyecto de código:** SelfHosted-Service
**Producto:** SelfHosted Service
**Documento:** Wireframes-Informe-De-Conflicto-De-Direcciones.md
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
  - [3.1 Las tres resoluciones y su aplicabilidad](#31-las-tres-resoluciones-y-su-aplicabilidad)
  - [3.2 Lo que esta superficie no hace](#32-lo-que-esta-superficie-no-hace)
- [4. Interacciones](#4-interacciones)
- [5. Estados](#5-estados)
- [6. Versión responsive](#6-versión-responsive)
- [7. Notas de implementación](#7-notas-de-implementación)
- [8. Trazabilidad](#8-trazabilidad)
- [9. Control de cambios](#9-control-de-cambios)

---

## 1. Pantalla y propósito

**Nombre canónico de la superficie: `Informe de conflicto de direcciones`** (`SUP-14`).

Su tarea es que el administrador se entere **antes de romper algo que está funcionando**, y que pueda resolverlo sin salir a investigar. Materializa el diferenciador DV-04 de la visión de producto: el conflicto de direcciones es una regla de negocio verificada antes de arrancar, no un accidente del motor de contenedores.

**El anexo E-18 no maqueta esta superficie.** Su contenido, en cambio, está declarado con precisión en el anexo E-8 —el informe con su ocupante identificado y sus tres resoluciones— y el intake §6 flujo 3 declara el recorrido completo. Se especifica a partir de esas dos fuentes y de los patrones del catálogo de diseño.

**Supuesto `S-UX-03`.** Se especifica como superficie con flujo propio, y no como banda de error del lienzo, porque las tres resoluciones son acciones que modifican estado —detener otro proyecto SelfHosted, reasignar una dirección, arrancar parcialmente— y cada una tiene consecuencia distinta. `Rules-UX-UI-DX.md` §3.2 admite explícitamente el modal con flujo propio como superficie. La regla de corte respecto de la banda de resultado está en [`Representacion-Banda-De-Resultado.md`](../Representaciones/Representacion-Banda-De-Resultado.md) §6: un resultado que no entra en dos líneas no es un resultado.

---

## 2. Layout

Superficie con flujo propio, superpuesta sobre el lienzo del proyecto SelfHosted desde el que se intentó arrancar.

```text
+- No se puede arrancar <proyecto SelfHosted> ------------------ X -+
|                                                                   |
|  <n> conflicto(s) de direccion impiden el arranque.               |
|                                                                   |
|  +-------------------------------------------------------------+  |
|  | <direccion>                                                 |  |
|  | Lo solicita   <servicio> de <este proyecto SelfHosted>      |  |
|  | Lo ocupa      <servicio> de <otro proyecto SelfHosted>      |  |
|  |               (i) activo                                    |  |
|  |                                                             |  |
|  | Resoluciones                                                |  |
|  |  ( ) Detener "<otro proyecto SelfHosted>"                   |  |
|  |  ( ) Asignar la siguiente direccion libre: <sugerencia>     |  |
|  |  ( ) Arrancar los demas servicios del proyecto              |  |
|  +-------------------------------------------------------------+  |
|                                                                   |
|  Servicios sin conflicto: <servicio>, <servicio>                  |
|                                                                   |
+-------------------------------------------------------------------+
| [ Volver al lienzo ]                    [ Aplicar resolucion ]    |
+-------------------------------------------------------------------+
```

Un bloque por conflicto. Cada bloque declara **sus** resoluciones posibles: las que no aplican a ese conflicto **no se ofrecen**.

---

## 3. Componentes principales

| Componente | Propósito | Datos que muestra | Comportamiento |
| --- | --- | --- | --- |
| Encabezado | Declara que el arranque se bloqueó y sobre qué proyecto SelfHosted | Nombre del proyecto y cantidad de conflictos | Es el título de la superficie |
| Bloque de conflicto | Es la unidad de decisión | La dirección en conflicto, el servicio solicitante con su proyecto SelfHosted, y **el ocupante con su servicio, su proyecto SelfHosted y su estado** | Uno por conflicto |
| Identificación del ocupante | Evita la investigación posterior | Servicio **y** proyecto SelfHosted del ocupante | Es el dato que convierte un bloqueo en una decisión: sin él, el administrador tendría que salir a buscar quién ocupa la dirección |
| Grupo de resoluciones | Ofrece la salida | Las resoluciones posibles **de ese conflicto** | Ver §3.1 |
| Lista de servicios sin conflicto | Declara qué sí podría arrancar | Los servicios que no participan del conflicto | Es lo que hace comprensible la tercera resolución |
| Acción secundaria | Sale sin resolver | — | El proyecto SelfHosted **no arranca y nada se modifica** |
| Acción primaria | Aplica la resolución elegida | El verbo nombra la aplicación | Se deshabilita hasta que haya una resolución elegida, y durante el envío |

### 3.1 Las tres resoluciones y su aplicabilidad

Las tres son dato declarado del anexo E-8 y confirmadas sin cambios por decisión del agente humano del proyecto. **Esta categoría no agrega ni quita ninguna.**

| Resolución | Qué hace | Cuándo se ofrece |
| --- | --- | --- |
| Detener el proyecto SelfHosted en conflicto | Lo detiene y **libera las direcciones que ocupaba** | Sólo cuando el conflicto es contra un servicio activo de **otro** proyecto SelfHosted |
| Asignar la siguiente dirección libre del rango | Actualiza la reserva a la dirección sugerida y **marca como pendientes de redespliegue los servicios cuyas variables cambian de valor por ese motivo** | Siempre, salvo que no quede ninguna libre |
| Arrancar los demás servicios del proyecto SelfHosted | Arranca los servicios sin conflicto y el proyecto queda **parcialmente activo, con estado explícito** | Siempre que haya al menos un servicio sin conflicto |

**Una resolución que no aplica no se ofrece.** Cada conflicto declara las suyas: en un conflicto por duplicado interno —dos servicios del mismo proyecto SelfHosted con la misma dirección— la resolución de detener el proyecto en conflicto **no aplica**, porque el ocupante es del propio proyecto. En un conflicto por dirección fuera del rango o excluida, la resolución es reasignar.

No se dibujan deshabilitadas: se omiten. Es la aplicación de la regla general del catálogo de que lo que no aplica no se dibuja.

### 3.2 Lo que esta superficie no hace

- **No ofrece arrancar igual.** El conflicto contra un servicio activo de otro proyecto SelfHosted bloquea el arranque, y ofrecer una salida por la fuerza contradiría la regla que la superficie existe para hacer cumplir.
- **No sugiere qué resolución elegir.** Las tres tienen consecuencias distintas y el administrador es el único que sabe cuál de los dos proyectos SelfHosted importa más en ese momento.
- **No presenta el resultado parcial como un fracaso.** «Parcialmente activo» es un estado legítimo del modelo.

---

## 4. Interacciones

| Acción | Disparador | Resultado esperado | Precondición |
| --- | --- | --- | --- |
| Abrir la superficie | El arranque devolvió veredicto bloqueado | Se presenta el informe con sus conflictos y sus resoluciones | Hay al menos un conflicto |
| Elegir una resolución | Selección en el grupo | La acción primaria se habilita | El bloque ofrece esa resolución |
| Aplicar «detener el proyecto SelfHosted en conflicto» | Acción primaria | El sistema detiene el proyecto en conflicto y libera las direcciones que ocupaba; vuelve a validar y, si el veredicto es permitido, arranca | La resolución aplica |
| Aplicar «asignar la siguiente dirección libre» | Acción primaria | El sistema actualiza la reserva, **marca como pendientes de redespliegue los servicios cuyas variables cambian de valor**, vuelve a validar y arranca | La resolución aplica |
| Aplicar «arrancar los demás servicios» | Acción primaria | Arrancan los servicios sin conflicto y el proyecto SelfHosted queda **parcialmente activo, con estado explícito y no como error silencioso** | Hay servicios sin conflicto |
| Volver sin elegir | Acción secundaria o cierre | **El proyecto SelfHosted no arranca y nada se modifica.** Retorno al lienzo | La superficie está abierta |
| Aplicar una resolución cuya sugerencia caducó | Acción primaria | La dirección sugerida dejó de estar libre entre la emisión del informe y su aplicación: rechazo **con la siguiente libre recalculada** | La sugerencia caducó |

---

## 5. Estados

| Estado | Condición que lo produce | Representación esperada |
| --- | --- | --- |
| Vacío | — | **No aplica.** La superficie existe exactamente cuando hay conflicto |
| Cargando | La validación está en curso | Indicador breve. La validación se resuelve **sin consultar al motor de contenedores** y por debajo del umbral que el intake declara |
| Con datos | Hay conflictos | Un bloque por conflicto, con su ocupante identificado y sus resoluciones |
| Conflicto entre proyectos SelfHosted | La dirección está ocupada por un servicio activo de otro proyecto | Bloque con el ocupante identificado **por servicio y por proyecto SelfHosted**, y las tres resoluciones |
| Conflicto por duplicado interno | Dos servicios del mismo proyecto SelfHosted declaran la misma dirección | Bloque con la clase de duplicado interno. **Bloquea siempre**, y la resolución de detener el proyecto en conflicto no se ofrece |
| Conflicto por dirección fuera del rango o excluida | La dirección no pertenece al rango gestionado o está excluida | Bloque con la clase correspondiente y la resolución de reasignar |
| Sin resolución elegida | La superficie está abierta y no se eligió nada | Acción primaria deshabilitada |
| Aplicando | La resolución está en curso | Acción primaria deshabilitada con indicador de progreso |
| Arranque procedido | La resolución resolvió el conflicto y el veredicto pasó a permitido | La superficie se cierra y el lienzo refleja el arranque |
| Arranque parcial | Se aplicó la tercera resolución | El proyecto SelfHosted queda **parcialmente activo con estado explícito**, sin tratamiento de error |
| Sugerencia caducada | La dirección sugerida dejó de estar libre | Banda de error con la **siguiente libre recalculada** |
| Error | La aplicación de la resolución falló | Banda de error con causa. **Ninguna reserva se modifica** y el informe sigue disponible con su ocupante identificado |
| Sin permiso | — | **No aplica** para el administrador. Un arranque disparado por credencial de máquina sin el ámbito requerido se rechaza indicando cuál ámbito falta, y no llega a esta superficie |

---

## 6. Versión responsive

La matriz de plataforma declara una única familia de navegador de escritorio y excluye navegadores móviles y pantallas pequeñas. Esta superficie **no tiene versión móvil especificada**.

- La superficie es superpuesta y de ancho acotado con tope máximo; por debajo del punto de quiebre principal ocupa el ancho disponible.
- Los pares de etiqueta y valor de la identificación del ocupante reflúyen a una columna, conforme al criterio 1.4.10.
- Las opciones de resolución **nunca se comprimen a una lista desplegable**: son tres decisiones con consecuencias distintas y tienen que verse simultáneamente para poder compararse.

**Norma de diseño aplicada, no brecha.** El punto de quiebre principal alrededor de 768 px y el piso de 320 px sin desplazamiento horizontal los declara `Design-Rules-Web-Generico.md` §8, y esta superficie los aplica. Lo único delegado son los **anchos de verificación**: en cuáles comprueba la etapa `b` el comportamiento y lo registra en su informe de cierre, según `Compatibilidad-Plataformas.md` §4. La brecha `B-UX-15`, que declaraba ausente la norma, se retiró por falsa; ver [`Experiencia-De-Uso.md`](../Experiencia-De-Uso.md) §10.2.1.

---

## 7. Notas de implementación

**Accesibilidad.**

- La superficie mueve el foco a su encabezado al abrirse, y lo devuelve al control que la disparó al cerrarse.
- Cerrar con la tecla de escape equivale a volver sin elegir: no modifica nada.
- Cada bloque de conflicto es una región con nombre accesible que incluye la dirección.
- El grupo de resoluciones es un grupo de opciones excluyentes con nombre accesible, y cada opción declara su consecuencia en su etiqueta, no sólo su verbo.
- El estado activo del ocupante se comunica con etiqueta textual además del par de color.
- La banda de error de sugerencia caducada lleva rol de alerta.

**Performance percibida.** La validación se resuelve **sin acceder al motor de contenedores**, por debajo del umbral que el intake declara para un proyecto SelfHosted de hasta treinta servicios. Por eso la superficie se presenta como respuesta inmediata al intento de arrancar, y no como operación con progreso.

**Internacionalización.** Las direcciones y los nombres de servicio y de proyecto SelfHosted se muestran literales.

---

## 8. Trazabilidad

| Dimensión | Referencia |
| --- | --- |
| Persona objetivo | Administrador único del producto: [`Vision-Producto.md`](../../00-Contexto/Vision-Producto.md) §2.1 |
| CU origen | [CU-21](../../02-Especificacion-Funcional/Casos-De-Uso/CU-21-Informe-De-Conflicto-Y-Resolucion.md) como origen principal; [CU-20](../../02-Especificacion-Funcional/Casos-De-Uso/CU-20-Validacion-De-Conflicto-De-Direcciones.md) produce el veredicto que la abre; [CU-18](../../02-Especificacion-Funcional/Casos-De-Uso/CU-18-Arranque-Y-Parada-Con-Autoarranque.md) y [CU-24](../../02-Especificacion-Funcional/Casos-De-Uso/CU-24-Aplicacion-En-Lote.md) la disparan |
| Reglas de negocio relevantes | RN-03, RN-06, RN-13, RN-17, RN-20 |
| Insumo del intake | §5 historia 6; §6 flujo 3; §7 caso límite CL-01; §17.P.10 umbral de validación; anexo E-8 |
| Marco de experiencia aplicado | [`Experiencia-De-Uso.md`](../Experiencia-De-Uso.md) §3.5 flujo FL-05, §8.1 taxonomía de errores, §10.3 supuesto `S-UX-03` |
| Representaciones que invoca | [`Representacion-Banda-De-Resultado.md`](../Representaciones/Representacion-Banda-De-Resultado.md), para el rechazo de sugerencia caducada; [`Representacion-Lenguaje-Visual-De-Estados.md`](../Representaciones/Representacion-Lenguaje-Visual-De-Estados.md), para el estado del ocupante |
| Catálogo de diseño aplicado | `Design-Rules-Web-Generico.md` §4.6, §4.9, §5, §7, §8; `Design-Rules-Acceso-Monousuario.md` §4.2 variante de error; `Design-Rules-Blazor-Mudblazor.md` §4 y §5 |
| US a generar en 06 | US-CU-21-1 a US-CU-21-4, provisionales |
| Tests previstos en 08 | Snapshot de los trece estados declarados; verificación de que una resolución no aplicable no se ofrece; verificación de que el ocupante se identifica por servicio y por proyecto SelfHosted; verificación de que la validación no consulta al motor de contenedores |
| Brechas que declara | Ninguna propia; ver las de la categoría en `Experiencia-De-Uso.md` §10.2 |
| Maqueta de la Fase B2 | Nombre canónico `Informe de conflicto de direcciones`. Trece estados declarados en §5, de los cuales once son demostrables: las filas marcadas no aplicable no se maquetan |
| Fuente de la correspondencia | La fila «CU origen» reproduce la fila de esta superficie en [`Experiencia-De-Uso.md`](../Experiencia-De-Uso.md) §9.2, que es la **fuente única** de la correspondencia entre superficie y caso de uso. Se reproduce, y no se referencia, porque `Rules-UX-UI-DX.md` §4.2.1 punto 8 la exige como sección obligatoria del wireframe |

---

## 9. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 2.0 | 2026-07-30 | Migración normativa del conjunto 4.1 al 6.0, fase M4 corte 4, bajo `Rules-UX-UI-DX` 4.0, `Vocabulario-Rules` 2.1 y `Migracion-Rules` 1.0. Clasificación **regenerar contenido** por el salto major de la regla que lo gobierna; fuente de contenido: **el documento de origen**, archivado sin modificar en `_legacy/2026-07-30/Wireframes-Informe-De-Conflicto-De-Direcciones-v1.0.md`. Sube **major** porque la nomenclatura anterior deja de cumplir. **Cabecera:** se suma el campo `Proyecto de código` con el valor `SelfHosted-Service`, que §4.1 de la regla 4.0 exige como primer campo por ser ésta una categoría de nivel proyecto de código (`Vocabulario-Rules` §4 R3) y que el `PRODUCT-MANIFEST` §2 declara como `Nombre-Proyecto-Codigo`; la etiqueta `Proyecto` pasa a `Producto` sobre el mismo valor `SelfHosted Service`, porque `Vocabulario-Rules` §3 prohíbe la etiqueta de un plano de identidad sobre el valor de otro. Los dos campos conviven: el primero lo exige §4.1 y el segundo lo preserva `Migracion-Rules` §4.2. **Sustitución léxica por ocurrencia** según `Vocabulario-Rules` §9.5 y el plan de migración §3.5, y nunca por reemplazo global de cadena: la **única** ocurrencia de «solución» designaba el nivel superior y pasa a «producto» con su concordancia de género —«Administrador único de la solución» a «Administrador único **del** producto»—; no hay ninguna «solución de código». **Las treinta y nueve ocurrencias de «resolución» y «resoluciones» quedaron intactas**, verificadas con conteo antes y después: este documento es el más cargado de la palabra en todo el corte, y la cadena `soluci` que vive dentro de ella es exactamente la que produjo las treinta ocurrencias de una palabra inexistente en doce archivos del framework, registradas en su entrada `[5.1]`. Las treinta y siete ocurrencias de «proyecto» se clasificaron una por una y **ninguna pasó a «proyecto de código»**: veintisiete llevan la forma calificada «proyecto SelfHosted»; siete son la misma entidad del dominio en forma corta, admitida por el `PRODUCT-INTAKE` §12 y por el glosario raíz de `Vision-Producto.md` §9 donde el contexto ya fijó el sentido; una es el emprendimiento —«agente humano del proyecto»—, que `Vocabulario-Rules` §4 R1 deja sin calificar; una nombra un artefacto del dominio en su enlace, que no se renombra; y una era la etiqueta de cabecera. **El nombre canónico de la superficie `Informe de conflicto de direcciones` y su identificador `SUP-14` se conservan textualmente**, porque `Deriva-Rules.md` exige que coincidan término por término con la línea de base visual. **Los bloques ASCII de §2 no se tocaron** y conservan su ancho: ninguno contenía una palabra a migrar. **Ningún componente, interacción, estado, resolución, nota, referencia de trazabilidad ni brecha cambió de contenido**: la migración es léxica y de forma de cabecera, y las filas anteriores de este control de cambios no se reescribieron. Origen: [`Plan-Migracion-4.1-a-6.0.md`](../../Audit/Plan-Migracion-4.1-a-6.0.md) §3.5 y §4 |
| 1.0 | 2026-07-29 | Versión inicial. Especifica la superficie a partir del anexo E-8 y del intake §6 flujo 3, declarando que el anexo E-18 no la maqueta y que su forma es supuesto `S-UX-03`; transcribe las tres resoluciones sin agregar ni quitar ninguna y declara su aplicabilidad por clase de conflicto, con la regla de que una resolución que no aplica se omite y no se dibuja deshabilitada; declara las tres cosas que la superficie deliberadamente no hace; declara trece estados |
| 1.0 | 2026-07-29 | Corrección del audit de la Fase B, absorbida dentro de la versión de emisión, sin subir versión y sin archivar, por la política de versionado de `Master-Prompt.md` §5: el documento está en estado `Propuesto` y la corrección proviene del audit de su propia fase. **H-06, P1:** Se suma a §8 la fila que declara la fuente única de la correspondencia entre superficie y caso de uso. **Brecha `B-UX-15` retirada por falsa:** §6 deja de declarar ausente el punto de quiebre y cita la norma que `Design-Rules-Web-Generico.md` §8 sí declara, acotando lo delegado a los anchos de verificación de la etapa `b`. Origen: informe [`Audit/B-02-03-r1.md`](../../Audit/B-02-03-r1.md) |
