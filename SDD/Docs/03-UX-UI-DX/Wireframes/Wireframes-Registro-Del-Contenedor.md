# Wireframes — Registro del contenedor

**Proyecto de código:** SelfHosted-Service
**Producto:** SelfHosted Service
**Documento:** Wireframes-Registro-Del-Contenedor.md
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
  - [3.1 El conmutador de seguimiento y la regla de recursos](#31-el-conmutador-de-seguimiento-y-la-regla-de-recursos)
- [4. Interacciones](#4-interacciones)
- [5. Estados](#5-estados)
  - [5.1 Brecha `B-UX-13`](#51-brecha-b-ux-13)
- [6. Versión responsive](#6-versión-responsive)
- [7. Notas de implementación](#7-notas-de-implementación)
- [8. Trazabilidad](#8-trazabilidad)
- [9. Control de cambios](#9-control-de-cambios)

---

## 1. Pantalla y propósito

**Nombre canónico de la superficie: `Registro del contenedor`** (`SUP-08`).

Su tarea es que el administrador lea lo que el proceso de adentro del contenedor está diciendo, con seguimiento continuo si lo pide. Corresponde a la ruta `/proyectos/{id}/servicios/{sid}/logs` del mapa de navegación del anexo E-18.

Es la superficie con la restricción de recursos más estricta del producto: el intake declara que no debe haber recolección con las vistas cerradas, y el mismo criterio se aplica al flujo de registro.

---

## 2. Layout

Superficie del shell de trabajo, con la mayor parte del área destinada al contenido del registro.

```text
+-----------------------------------------------------------------------+
| [=] <titulo del panel>      <identidad>  [Cambiar contrasena] [Salir] |
+---------+-------------------------------------------------------------+
| Lienzo  |  < Volver al lienzo                                         |
| Logs    |  Registro de <servicio>            (i) <estado>             |
| Metr.   |  ---------------------------------------------------------  |
| Ajustes |  [ replica v ]  [ x ] Seguimiento continuo    [ Copiar ]    |
|         |  ---------------------------------------------------------  |
|         |  <linea del registro>                                       |
|         |  <linea del registro>                                       |
|         |  <linea del registro>                                       |
|         |  <linea del registro>                                       |
|         |  ...                                                        |
|         |                                                             |
|         |  ---------------------------------------------------------  |
|         |  (i) <estado del flujo>                                     |
+---------+-------------------------------------------------------------+
```

El contenido del registro es texto preformateado de ancho variable, y se desplaza **dentro de su propio contenedor**: es el caso arquetípico de contenido que no puede forzar el desplazamiento horizontal del cuerpo de la página.

---

## 3. Componentes principales

| Componente | Propósito | Datos que muestra | Comportamiento |
| --- | --- | --- | --- |
| Enlace de retorno | Devuelve al contexto de origen | — | El registro se alcanza desde el panel lateral del servicio y desde el tablero de estado |
| Cabecera | Identifica de qué servicio es el registro y en qué situación está | Nombre del servicio y su par de estado | Ver [`Representacion-Lenguaje-Visual-De-Estados.md`](../Representaciones/Representacion-Lenguaje-Visual-De-Estados.md) |
| Selector de réplica | Elige de cuál contenedor se lee | Las réplicas del servicio | **Sólo aparece si el servicio tiene más de una réplica.** Cada réplica tiene su propio contenedor y su propio registro |
| Conmutador de seguimiento | Activa el flujo continuo | — | Ver §3.1 |
| Acción de copiado | Lleva el contenido a otro lado | — | Copia lo que está a la vista |
| Área del registro | Es el contenido | Las líneas que el contenedor emite | Texto preformateado, con desplazamiento propio |
| Indicador del estado del flujo | Declara si el seguimiento está activo, detenido o interrumpido | — | Región de estado, no alerta |

### 3.1 El conmutador de seguimiento y la regla de recursos

El intake declara que no debe haber recolección de estadísticas con las vistas cerradas, y `02-Especificacion-Funcional` extiende el mismo criterio al flujo de registro: **al cerrar la vista, el sistema termina el flujo**.

Tres consecuencias de diseño:

1. El seguimiento continuo es **opcional y explícito**: se activa con el conmutador, no por el hecho de abrir la vista.
2. Cerrar la vista termina el flujo **sin pedir confirmación**: es la contrapartida de la regla, no una pérdida de trabajo.
3. La interfaz **no ofrece control de frecuencia** ni acción de refresco manual que contradiga la cadencia declarada del recolector.

---

## 4. Interacciones

| Acción | Disparador | Resultado esperado | Precondición |
| --- | --- | --- | --- |
| Abrir la vista | Pestaña de registros del panel lateral, o acción del tablero | El sistema entrega el registro del contenedor del despliegue vigente | El servicio tiene al menos un despliegue con contenedor |
| Elegir una réplica | Selector | Se entrega el registro de la réplica elegida | El servicio tiene más de una réplica |
| Activar el seguimiento | Conmutador | El sistema mantiene el flujo continuo **mientras la vista permanece abierta** | La vista está abierta |
| Cerrar la vista | Navegación fuera | El sistema **termina el flujo**. No queda ninguna recolección activa | El seguimiento estaba activo |
| Copiar | Acción de la cabecera | El contenido a la vista queda disponible para pegar, con confirmación efímera anunciada | Hay líneas |
| Abrir la vista de un servicio sin contenedor vigente | Navegación | El sistema **informa que no hay registro disponible y remite al estado del despliegue**, que puede ser huérfano | El servicio no tiene contenedor |

---

## 5. Estados

| Estado | Condición que lo produce | Representación esperada |
| --- | --- | --- |
| Vacío | El contenedor todavía no emitió ninguna línea | Estado vacío con texto orientativo. No es un error |
| Cargando | El registro se está trayendo, o el flujo se está estableciendo | Esqueleto de líneas o indicador de conexión |
| Con datos | Hay líneas | Texto preformateado con desplazamiento propio |
| Seguimiento activo | El conmutador está activado y el flujo está establecido | Indicador de flujo activo. Las líneas nuevas aparecen al pie |
| Seguimiento detenido | El conmutador está desactivado | Indicador de flujo detenido. El contenido queda estático |
| Sin contenedor vigente | El servicio no tiene contenedor | Mensaje de que no hay registro disponible, **con remisión al estado del despliegue** |
| Motor inalcanzable | El punto de acceso del motor no responde | Banda de error con la causa **traducida a una causa identificable propia**, sin propagar el tipo del cliente del motor |
| Flujo interrumpido | El flujo continuo se cortó | Ver la brecha `B-UX-13` de §5.1 |
| Sin permiso | — | **No aplica.** Una sola identidad |

### 5.1 Brecha `B-UX-13`

`02-Especificacion-Funcional` declara dos brechas que caen enteramente sobre esta superficie, y las dos condicionan estados que este wireframe no puede terminar de especificar:

| Lo que falta | Consecuencia en esta superficie | Destinatario |
| --- | --- | --- |
| El intake **no declara si el registro debe filtrarse respecto de valores secretos**. La regla de no devolver secretos en claro alcanza a las respuestas de la interfaz programática y a las exportaciones, y el registro lo produce el proceso de adentro del contenedor, no el producto | No se puede declarar si el área del registro exhibe el contenido tal cual o filtrado, ni si existe un aviso al respecto. **Este wireframe no especifica ningún filtrado**: especificarlo afirmaría una capacidad que ninguna fuente declara | Agente humano del proyecto |
| El intake **no declara el comportamiento esperado ante el corte del flujo continuo** | El estado «flujo interrumpido» se declara como estado, y **no se declara si reconecta solo, si ofrece reconectar o si sólo informa**. La representación queda pendiente | `05-Arquitectura-Tecnica` |

---

## 6. Versión responsive

La matriz de plataforma declara una única familia de navegador de escritorio y excluye navegadores móviles y pantallas pequeñas. Esta superficie **no tiene versión móvil especificada**.

- El área del registro es contenido preformateado de ancho variable: se desplaza **dentro de su propio contenedor**, y el cuerpo de la página nunca se desplaza en horizontal, conforme al criterio 1.4.10.
- La barra de controles envuelve antes que comprimir los controles por debajo del objetivo de toque mínimo.

**Norma de diseño aplicada, no brecha.** El punto de quiebre principal alrededor de 768 px y el piso de 320 px sin desplazamiento horizontal los declara `Design-Rules-Web-Generico.md` §8, y esta superficie los aplica. Lo único delegado son los **anchos de verificación**: en cuáles comprueba la etapa `b` el comportamiento y lo registra en su informe de cierre, según `Compatibilidad-Plataformas.md` §4. La brecha `B-UX-15`, que declaraba ausente la norma, se retiró por falsa; ver [`Experiencia-De-Uso.md`](../Experiencia-De-Uso.md) §10.2.1.

---

## 7. Notas de implementación

**Accesibilidad.**

- El área del registro es una región identificada con nombre accesible que dice de qué servicio y de qué réplica es.
- Con el seguimiento activo, las líneas nuevas **no se anuncian una por una**: un flujo continuo anunciado línea a línea hace la superficie inutilizable con lector de pantalla. Se anuncia el cambio de estado del flujo, no su contenido.
- El conmutador de seguimiento declara su estado y es operable por teclado.
- La confirmación de copiado se anuncia como región activa.
- El contenido preformateado conserva su estructura sin depender de tamaño de fuente fijo: el criterio de espaciado de texto se cumple.

**Performance percibida.** El flujo continuo es una operación de larga duración sobre el canal, y el intake declara que el registro se lee en flujo continuo desde el motor de contenedores. La vista no sondea: recibe.

**Internacionalización.** El contenido del registro es lo que el proceso de adentro emite y **no se traduce ni se reformatea**. Sólo la interfaz alrededor está en el idioma del producto.

---

## 8. Trazabilidad

| Dimensión | Referencia |
| --- | --- |
| Persona objetivo | Administrador único del producto: [`Vision-Producto.md`](../../00-Contexto/Vision-Producto.md) §2.1 |
| CU origen | [CU-14](../../02-Especificacion-Funcional/Casos-De-Uso/CU-14-Consulta-Del-Registro-Del-Contenedor.md) Consulta del registro del contenedor |
| Reglas de negocio relevantes | RN-15, en la medida en que el sistema no debe devolver secretos en claro; ver la brecha `B-UX-13` |
| Insumo del intake | §4 capacidad F-05; §17.P.3 registro en flujo continuo; §17.P.10 frecuencia de sondeo y ausencia de recolección con vistas cerradas; anexo E-18 mapa de navegación |
| Marco de experiencia aplicado | [`Experiencia-De-Uso.md`](../Experiencia-De-Uso.md) §3.7 flujo FL-07, §4.1 mapa de estados, §7 performance percibida |
| Representaciones que invoca | [`Representacion-Lenguaje-Visual-De-Estados.md`](../Representaciones/Representacion-Lenguaje-Visual-De-Estados.md) |
| Catálogo de diseño aplicado | `Design-Rules-Web-Generico.md` §4.7 conmutador, §4.9, §5, §7, §8; `Design-Rules-Blazor-Mudblazor.md` §5 |
| US a generar en 06 | US-CU-14-1 a US-CU-14-3, provisionales |
| Tests previstos en 08 | Snapshot de los nueve estados declarados; verificación de que al cerrar la vista no queda ninguna recolección activa; test de accesibilidad sobre el anuncio del flujo |
| Brechas que declara | `B-UX-13`, filtrado de secretos en el registro y comportamiento ante el corte del flujo (B-08 de `02-Especificacion-Funcional`) |
| Maqueta de la Fase B2 | Nombre canónico `Registro del contenedor`. Nueve estados declarados en §5, de los cuales ocho son demostrables: las filas marcadas no aplicable no se maquetan |
| Fuente de la correspondencia | La fila «CU origen» reproduce la fila de esta superficie en [`Experiencia-De-Uso.md`](../Experiencia-De-Uso.md) §9.2, que es la **fuente única** de la correspondencia entre superficie y caso de uso. Se reproduce, y no se referencia, porque `Rules-UX-UI-DX.md` §4.2.1 punto 8 la exige como sección obligatoria del wireframe |

---

## 9. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 2.0 | 2026-07-30 | Migración normativa del conjunto 4.1 al 6.0, fase M4 corte 4, bajo `Rules-UX-UI-DX` 4.0, `Vocabulario-Rules` 2.1 y `Migracion-Rules` 1.0. Clasificación **regenerar contenido** por el salto major de la regla que lo gobierna; fuente de contenido: **el documento de origen**, archivado sin modificar en `_legacy/2026-07-30/Wireframes-Registro-Del-Contenedor-v1.0.md`. Sube **major** porque la nomenclatura anterior deja de cumplir. **Cabecera:** se suma el campo `Proyecto de código` con el valor `SelfHosted-Service`, que §4.1 de la regla 4.0 exige como primer campo por ser ésta una categoría de nivel proyecto de código (`Vocabulario-Rules` §4 R3) y que el `PRODUCT-MANIFEST` §2 declara como `Nombre-Proyecto-Codigo`; la etiqueta `Proyecto` pasa a `Producto` sobre el mismo valor `SelfHosted Service`, porque `Vocabulario-Rules` §3 prohíbe la etiqueta de un plano de identidad sobre el valor de otro. Los dos campos conviven: el primero lo exige §4.1 y el segundo lo preserva `Migracion-Rules` §4.2. **Sustitución léxica por ocurrencia** según `Vocabulario-Rules` §9.5 y el plan de migración §3.5, y nunca por reemplazo global de cadena: las **dos** ocurrencias de «solución» designaban el nivel superior y pasan a «producto» con su concordancia de género —«Administrador único de la solución» a «Administrador único **del** producto», y «lo produce el proceso de adentro del contenedor, no la solución» a «no **el** producto» en la brecha `B-UX-13`—; no hay ninguna «solución de código», y el cuerpo de este documento no contiene la cadena `soluci` dentro de ninguna otra palabra, de modo que el riesgo de superposición de cadenas que el plan §3.5 declara no se materializa acá. Las tres ocurrencias de «proyecto» se clasificaron una por una y **ninguna pasó a «proyecto de código»**: una es el emprendimiento —«Agente humano del proyecto» como destinatario de la brecha—, que `Vocabulario-Rules` §4 R1 deja sin calificar; una es el segmento `/proyectos/{id}` de la ruta del anexo E-18, que nombra la entidad del dominio y **no se toca porque es una cadena de la interfaz**; y una era la etiqueta de cabecera. **El nombre canónico de la superficie `Registro del contenedor` y su identificador `SUP-08` se conservan textualmente**, porque `Deriva-Rules.md` exige que coincidan término por término con la línea de base visual. **El bloque ASCII de §2 no se tocó** y conserva su ancho: no contenía ninguna palabra a migrar. **Se verificó el conteo de estados que el hallazgo P3-4 del informe [`B2-Fix-Definiciones-Servicio-r1.md`](../../Audit/B2-Fix-Definiciones-Servicio-r1.md) elevaba a esta categoría: la tabla de §5 tiene nueve filas y el documento declara nueve estados. El hallazgo es un falso positivo y no se aplicó ninguna corrección**, que además habría sido invención por no tener fuente. **Ningún componente, interacción, estado, nota, referencia de trazabilidad ni brecha cambió de contenido**: la migración es léxica y de forma de cabecera, y las filas anteriores de este control de cambios no se reescribieron. Origen: [`Plan-Migracion-4.1-a-6.0.md`](../../Audit/Plan-Migracion-4.1-a-6.0.md) §3.5 y §4 |
| 1.0 | 2026-07-29 | Versión inicial. Especifica la superficie de registro con su selector de réplica condicional y su conmutador de seguimiento explícito; declara las tres consecuencias de diseño de la regla de no recolectar con las vistas cerradas; declara nueve estados; declara la brecha `B-UX-13` y su consecuencia concreta, que es no especificar ningún filtrado de secretos ni la representación del flujo interrumpido |
| 1.0 | 2026-07-29 | Corrección del audit de la Fase B, absorbida dentro de la versión de emisión, sin subir versión y sin archivar, por la política de versionado de `Master-Prompt.md` §5: el documento está en estado `Propuesto` y la corrección proviene del audit de su propia fase. **H-06, P1:** Se suma a §8 la fila que declara la fuente única de la correspondencia entre superficie y caso de uso. **Brecha `B-UX-15` retirada por falsa:** §6 deja de declarar ausente el punto de quiebre y cita la norma que `Design-Rules-Web-Generico.md` §8 sí declara, acotando lo delegado a los anchos de verificación de la etapa `b`. Origen: informe [`Audit/B-02-03-r1.md`](../../Audit/B-02-03-r1.md) |
