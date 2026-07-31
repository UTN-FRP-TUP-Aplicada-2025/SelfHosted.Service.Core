# Wireframes — Acceso al panel

**Proyecto de código:** SelfHosted-Service
**Producto:** SelfHosted Service
**Documento:** Wireframes-Acceso-Al-Panel.md
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
- [4. Interacciones](#4-interacciones)
- [5. Estados](#5-estados)
  - [5.1 Nota sobre el estado de identidad recién creada](#51-nota-sobre-el-estado-de-identidad-recién-creada)
  - [5.2 Brecha `B-UX-11`, política de sesión](#52-brecha-b-ux-11-política-de-sesión)
- [6. Versión responsive](#6-versión-responsive)
- [7. Notas de implementación](#7-notas-de-implementación)
- [8. Trazabilidad](#8-trazabilidad)
- [9. Control de cambios](#9-control-de-cambios)

---

## 1. Pantalla y propósito

**Nombre canónico de la superficie: `Acceso al panel`** (`SUP-02`).

Es la puerta de entrada del sistema en todos los arranques posteriores al primero. Su tarea es una sola: que el administrador único abra su sesión. Corresponde a la ruta `/login` del mapa de navegación del anexo E-18 y realiza los patrones §4.1, §4.2, §4.5 y §4.6 de `Design-Rules-Acceso-Monousuario.md`.

Es además una de las dos ubicaciones obligatorias del sello de versión, y es la más importante de las dos: es la única información disponible sobre la instancia antes de autenticarse, que es justamente el caso en el que más se la necesita.

---

## 2. Layout

Shell de acceso: el mismo shell vacío que usa el aprovisionamiento inicial. Las dos superficies **comparten composición deliberadamente**, para que el administrador perciba continuidad entre crear la identidad y usarla.

```text
+------------------------- lienzo, sin chrome --------------------------+
|                                                                       |
|              +-------------- ancho acotado --------------+            |
|              |  <Iniciar sesion>                         |  h1        |
|              |                                           |            |
|              |  [ banda confirmacion   rol de estado  ]  |  cond.     |
|              |  [ banda de error        rol de alerta ]  |  cond.     |
|              |                                           |            |
|              |  Nombre de usuario                        |  label     |
|              |  [ campo                               ]  |            |
|              |                                           |            |
|              |  Contrasena                               |  label     |
|              |  [ campo                               ]  |            |
|              |                                           |            |
|              |  [=========  Iniciar sesion  ==========]  |  primaria  |
|              |                                           |            |
|              |               <sello de version>          |  al pie    |
|              +-------------------------------------------+            |
|                                                                       |
+-----------------------------------------------------------------------+
```

**Las cinco ausencias del perfil de operador único.** Ninguna de estas se dibuja, ni siquiera deshabilitada ni con leyenda de «próximamente». `Design-Rules-Acceso-Monousuario.md` §10 lo declara como anti-patrón: lo que no aplica, no se dibuja.

| Elemento ausente | Por qué |
| --- | --- |
| Registro de cuenta | La identidad se crea una sola vez, en el primer arranque |
| Selector o listado de cuentas | No hay entre qué elegir |
| Enlace de recuperación de la contraseña | El producto no recupera contraseñas: está declarado fuera de alcance |
| Casilla de «recordarme» | La política de sesión es única y declarada; no se delega en una casilla |
| Cualquier mención de roles o permisos | Una sola identidad tiene todo el alcance |

---

## 3. Componentes principales

| Componente | Propósito | Datos que muestra | Comportamiento |
| --- | --- | --- | --- |
| Encabezado de primer nivel | Nombra la tarea y da estructura semántica a una página sin navegación | El nombre de la acción, sin instrucciones superfluas | Estático |
| Banda de resultado, variante de confirmación | Acusa recibo del acto ocurrido en la superficie anterior | Texto del catálogo de códigos | Aparece al llegar desde otra superficie de identidad. Rol de estado, **no roba el foco** |
| Banda de resultado, variante de error | Comunica el rechazo o el fin de la sesión | Texto del catálogo de códigos | Rol de alerta. Ver [`Representacion-Banda-De-Resultado.md`](../Representaciones/Representacion-Banda-De-Resultado.md) |
| Campo de nombre de usuario | Recoge el identificador | — | Propósito de campo declarado. Recibe el foco inicial |
| Campo de contraseña | Recoge el secreto | — | Propósito de campo declarado como secreto vigente |
| Acción primaria | Abre la sesión | El verbo nombra la acción exacta | Ancho completo, sin acción secundaria. Se deshabilita durante el envío |
| Sello de versión | Identifica la instancia antes de autenticarse | Cadena legible de la versión, más el distintivo de artefacto preliminar o el marcador de origen indeterminado cuando corresponda | Ver [`Representacion-Sello-De-Version.md`](../Representaciones/Representacion-Sello-De-Version.md). En esta ubicación **no abre el detalle de diagnóstico**: el detalle completo vive en la superficie de configuración del sistema, dentro del shell de trabajo |

**Sobre el rechazo indiferenciado.** El sistema no dice qué parte de la credencial falló. No es una simplificación de la interfaz: distinguir «identificador inexistente» de «secreto incorrecto» confirma la existencia de la identidad a quien no debería saberlo, y `Design-Rules-Acceso-Monousuario.md` §10 lo enumera como anti-patrón explícito.

---

## 4. Interacciones

| Acción | Disparador | Resultado esperado | Precondición |
| --- | --- | --- | --- |
| Aterrizar en la superficie | El administrador abre la aplicación | Se presenta el inicio de sesión, porque ya hay administrador declarado | El predicado de aprovisionamiento es verdadero |
| Ser devuelto a la superficie | Se solicita una ruta protegida sin sesión | La ruta no se sirve y se presenta el inicio de sesión | No hay sesión vigente |
| Ser devuelto por vencimiento | La sesión venció por inactividad o por tope | Retorno al shell de acceso **con el estado declarado**: banda de error con el código `SESION-VENCIDA`. **No hay vencimiento silencioso** que se manifieste como un error arbitrario en una acción cualquiera | Había sesión y venció |
| Iniciar sesión | Acción primaria o envío del formulario | El sistema emite la credencial de sesión y navega al shell de trabajo. **La transición es una navegación completa**, no un cambio de estado dentro de la misma superficie: el cambio de shell es la señal visual de que la sesión cambió | Los dos campos completos |
| Recibir un rechazo | Credencial inválida | Banda de error indiferenciada. El foco vuelve a la banda o al primer campo. **No se emite ninguna credencial de sesión** | — |
| Abrir el detalle de diagnóstico | — | **No disponible en esta superficie.** El sello exhibe la cadena y no abre el detalle | — |
| Recuperar la contraseña | — | **No existe.** Declarado fuera de alcance | — |

---

## 5. Estados

| Estado | Condición que lo produce | Representación esperada |
| --- | --- | --- |
| Con datos, listo para ingresar | Sin sesión, sistema aprovisionado | Tarjeta de acceso sobre shell vacío, campos limpios, foco en el primero. Es el estado «con datos» de esta superficie |
| Cargando, enviando el intento | El intento está en curso | Acción primaria deshabilitada con indicador de progreso. Previene el doble envío |
| Credenciales rechazadas | El par de identificador y secreto no valida | Banda de error con el código `CREDENCIAL-RECHAZADA`, **indiferenciada**: no dice qué parte falló |
| Acceso restringido temporalmente | Se superó el umbral de intentos de la política | Banda de error con el código `ACCESO-RESTRINGIDO`, que declara la restricción y su carácter temporal, **sin umbrales, sin cuenta regresiva y sin tiempo restante**. Es un estado del acceso, no un error del administrador, y el tono lo refleja |
| Formulario vencido | La protección del formulario expiró | Banda de error con el código `FORMULARIO-VENCIDO` |
| Identidad recién creada | Se llega desde el aprovisionamiento inicial | Banda de confirmación con el código `IDENTIDAD-CREADA`. Ver la nota de §5.1 |
| Secreto actualizado | Se llega desde el cambio de contraseña y la política invalidó la sesión | Banda de confirmación con el código `SECRETO-ACTUALIZADO`, que declara qué cambió y qué pasó con la sesión |
| Sesión vencida | La sesión venció | Banda de error con el código `SESION-VENCIDA`, que no culpa al administrador |
| Sello con versión publicada | El contrato de identidad de versión entrega la cadena y el artefacto no es preliminar | Sello al pie con la cadena |
| Sello con artefacto preliminar | El contrato declara el artefacto como preliminar | Sello más distintivo textual contiguo |
| Sello con origen indeterminado | La identidad no pudo derivarse de la construcción | Sello con el marcador textual explícito, **nunca en blanco ni con una versión inventada** |
| Vacío | — | **No aplica** |
| Sin permiso | — | **No aplica.** Una sola identidad; tener sesión es tener todo el alcance |

### 5.1 Nota sobre el estado de identidad recién creada

El flujo del aprovisionamiento inicial declara que el sistema **inicia la sesión** al concretarse el alta, de modo que el administrador no vuelve a pasar por esta superficie y el acuse de `IDENTIDAD-CREADA` se exhibe en el listado de proyectos SelfHosted, que es `destinoAlCompletar`. El estado se declara igual acá porque `Design-Rules-Acceso-Monousuario.md` §5 lo enumera entre los de esta superficie, y porque existe una vía por la que sí se alcanza: si la sesión que el alta abrió se pierde antes de la primera navegación. Se declara la asimetría en lugar de silenciarla.

### 5.2 Brecha `B-UX-11`, política de sesión

`Design-Rules-Acceso-Monousuario.md` §6 exige que este artefacto declare tres cosas: **la duración única de la sesión, su condición de vencimiento y el efecto de cada acto de identidad sobre la sesión en curso**. Ninguna fuente de este producto declara ninguna de las tres. El intake declara que la sesión se emite con credencial de tipo cookie con sus atributos, y que la capacidad F-01 incluye «sesión recordada», sin decir cuánto dura ni cuándo vence.

En consecuencia: el estado `SESION-VENCIDA` se declara con su representación y su comportamiento, y **no se declara la condición numérica que lo dispara**. Destinatario: agente humano del proyecto y `05-Arquitectura-Tecnica`.

---

## 6. Versión responsive

La matriz de plataforma declara una única familia de navegador de escritorio y excluye navegadores móviles y pantallas pequeñas. Esta superficie **no tiene versión móvil especificada**.

Lo que rige por accesibilidad: reflujo conforme al criterio 1.4.10 a 320 píxeles de ancho, con la tarjeta de ancho acotado con tope máximo y no de ancho fijo. Composición de una sola columna en todo ancho.

**Norma de diseño aplicada, no brecha.** El punto de quiebre principal alrededor de 768 px y el piso de 320 px sin desplazamiento horizontal los declara `Design-Rules-Web-Generico.md` §8, y esta superficie los aplica. Lo único delegado son los **anchos de verificación**: en cuáles comprueba la etapa `b` el comportamiento y lo registra en su informe de cierre, según `Compatibilidad-Plataformas.md` §4. La brecha `B-UX-15`, que declaraba ausente la norma, se retiró por falsa; ver [`Experiencia-De-Uso.md`](../Experiencia-De-Uso.md) §10.2.1.

---

## 7. Notas de implementación

**Accesibilidad.**

- El shell de acceso mantiene su encabezado de primer nivel pese a no tener navegación.
- Tras un rechazo, el foco vuelve a la banda de resultado o al primer campo, para que el motivo se perciba sin recorrer la página.
- Los campos declaran su propósito, de modo que el gestor de credenciales del navegador y las tecnologías asistivas los identifiquen sin depender del texto visible.
- El sello se ubica después de la acción primaria en el orden de lectura, para no interponerse en el recorrido por teclado del formulario. Su contraste cumple 4.5:1 pese a su jerarquía tipográfica baja.
- Ningún estado del acceso se comunica sólo por color.

**Performance percibida.** El envío cruza el canal; la acción primaria se deshabilita durante la operación. La transición al shell de trabajo es una navegación completa y no una transición animada.

**Nota de realización, de `Design-Rules-Blazor-Mudblazor.md` §4.2.** El formulario de identidad se envía por petición a un punto de autenticación, fuera del circuito de render interactivo. El estado de restricción temporal se materializa como banda de error **sin componente de cuenta regresiva**: exponer el temporizador filtraría el parámetro de la política.

---

## 8. Trazabilidad

| Dimensión | Referencia |
| --- | --- |
| Persona objetivo | Administrador único del producto: [`Vision-Producto.md`](../../00-Contexto/Vision-Producto.md) §2.1 |
| CU origen | [CU-30](../../02-Especificacion-Funcional/Casos-De-Uso/CU-30-Inicio-Y-Cierre-De-Sesion.md) Inicio y cierre de sesión |
| Reglas de negocio relevantes | RN-17 |
| Insumo del intake | §6 flujo 4; §4 capacidad F-01; §17.P.5; §17.P.11 decisión DA-01; §9 exclusiones 5 y 7; anexo E-18 mapa de navegación |
| Marco de experiencia aplicado | [`Experiencia-De-Uso.md`](../Experiencia-De-Uso.md) §1.4 omisiones del perfil, §3.2 flujo FL-02, §4.4 sello, §8.2 catálogo de códigos |
| Representaciones que invoca | [`Representacion-Banda-De-Resultado.md`](../Representaciones/Representacion-Banda-De-Resultado.md), [`Representacion-Sello-De-Version.md`](../Representaciones/Representacion-Sello-De-Version.md) |
| Catálogo de diseño aplicado | `Design-Rules-Web-Generico.md` §4.6 y §5; `Design-Rules-Acceso-Monousuario.md` §1, §2, §3, §4.1, §4.2, §4.5, §4.6, §5, §6, §7, §8; `Design-Rules-Identidad-De-Version.md` §4.1 y §4.2; `Design-Rules-Blazor-Mudblazor.md` §4.2 |
| US a generar en 06 | US-CU-30-1, US-CU-30-2, US-CU-30-3, provisionales |
| Tests previstos en 08 | Snapshot de los trece estados declarados; verificación de que el rechazo es indiferenciado y de que ningún mensaje expone parámetros de la política; test de accesibilidad sobre el orden de foco y el contraste del sello |
| Brechas que declara | `B-UX-07`, contrato de identidad de versión; `B-UX-11`, política de sesión |
| Maqueta de la Fase B2 | Nombre canónico `Acceso al panel`. Trece estados declarados en §5, de los cuales once son demostrables: las filas marcadas no aplicable no se maquetan |
| Fuente de la correspondencia | La fila «CU origen» reproduce la fila de esta superficie en [`Experiencia-De-Uso.md`](../Experiencia-De-Uso.md) §9.2, que es la **fuente única** de la correspondencia entre superficie y caso de uso. Se reproduce, y no se referencia, porque `Rules-UX-UI-DX.md` §4.2.1 punto 8 la exige como sección obligatoria del wireframe |

---

## 9. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 2.0 | 2026-07-30 | **Migración normativa 4.1 → 6.0**, corte 4 de la fase M4, sobre el plan [`Plan-Migracion-4.1-a-6.0.md`](../../Audit/Plan-Migracion-4.1-a-6.0.md). Clasificación **regenerar contenido**, por el salto de `Rules-UX-UI-DX` 2.0 → 4.0. **Fuente de contenido: documento de origen**, más el [`PRODUCT-MANIFEST`](../../../Intake/PRODUCT-MANIFEST-SelfHosted-Service.md) §2 para el único campo de cabecera que se suma. Ninguna superficie, componente, interacción, estado, brecha ni referencia cambia de contenido: lo que cambia es la nomenclatura. Las nueve secciones obligatorias de `Rules-UX-UI-DX` 4.0 §4.2.1 ya estaban presentes y ninguna se agregó ni se reordenó. **Cabecera**: `**Proyecto:**` llevaba un valor del plano de negocio y pasa a `**Producto:**`, porque `Vocabulario-Rules.md` §3 prohíbe la etiqueta de un plano sobre el valor de otro; se suma `**Proyecto de código:** SelfHosted-Service`, que §4.1 de la regla vigente exige y que este documento no declaraba, con el valor **leído del manifiesto y no inferido**. `Nombre-Proyecto-Codigo` y `Nombre-Producto` difieren sólo por el guion y no son intercambiables: los dos campos conviven, el primero por §4.1 y el segundo porque `Migracion-Rules.md` §4.2 prohíbe perder el valor del origen. **Vocabulario (`[5.0]`)**: «solución» pasa a «producto» en **2 ocurrencias** del referente de nivel superior —«Administrador único de la solución» en §8 y «ninguna fuente de esta solución» en §5.2—, las dos con la concordancia de género corregida de «la» a «el». Este documento **no tiene ninguna ocurrencia de «resolución»**, de modo que la superposición de cadenas que produjo las «reproducto» del framework no se presenta acá, y se deja constancia del barrido. De las 3 ocurrencias de «proyecto», 1 era la etiqueta de cabecera y **2 no se tocaron**: «el listado de proyectos SelfHosted» de §5.1, que designa la entidad del dominio, y «agente humano del proyecto» de §5.2, que designa el emprendimiento. **Ninguna ocurrencia se promovió a «proyecto de código».** La sustitución se hizo por el procedimiento por ocurrencia de `Vocabulario-Rules.md` §9.5 y **nunca por reemplazo global de cadena**. El bloque ASCII de §2 no contiene ninguna palabra a migrar y **conserva su ancho intacto**. Los nombres canónicos de superficie —`SUP-02` y `Acceso al panel`— se conservan textualmente, porque `Deriva-Rules.md` exige que coincidan término por término con la línea de base visual. **Glosario (`[5.1]`)**: `Glosario-UX.md` pasa de recomendado a obligatorio para los ocho tipos D8 y §6 verifica ahora su existencia y su completitud además de la no duplicación; lo emite un lote posterior de esta migración, y los términos que este wireframe acuña o precisa se devolvieron para que ese lote los consuma sin redefinir los que ya están en `Glosario-Funcional.md` de 02 o en el glosario raíz de `Vision-Producto.md` §9. Ninguna fila anterior de este control de cambios se reescribió (`SDD-Development-Guide.md` §VI.2) y el bloque de procedencia del destino no se tocó: sigue declarando 4.1, y cerrarlo es trabajo de M5 |
| 1.0 | 2026-07-29 | Versión inicial. Especifica la superficie de acceso sobre el shell partido, con la composición compartida con el aprovisionamiento inicial; declara las cinco ausencias del perfil de operador único como decisión de diseño; declara trece estados, incluidos los tres del sello de versión y los tres de continuidad entre superficies de identidad; declara el rechazo indiferenciado y la prohibición de exponer parámetros de la política; declara la brecha `B-UX-11` de política de sesión, que deja sin condición de disparo declarada al estado de sesión vencida |
| 1.0 | 2026-07-29 | Corrección del audit de la Fase B, absorbida dentro de la versión de emisión, sin subir versión y sin archivar, por la política de versionado de `Master-Prompt.md` §5: el documento está en estado `Propuesto` y la corrección proviene del audit de su propia fase. **H-06, P1:** Se suma a §8 la fila que declara la fuente única de la correspondencia entre superficie y caso de uso. **Brecha `B-UX-15` retirada por falsa:** §6 deja de declarar ausente el punto de quiebre y cita la norma que `Design-Rules-Web-Generico.md` §8 sí declara, acotando lo delegado a los anchos de verificación de la etapa `b`. Origen: informe [`Audit/B-02-03-r1.md`](../../Audit/B-02-03-r1.md) |
