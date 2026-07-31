# Wireframes — Cambio de contraseña

**Proyecto:** SelfHosted Service
**Documento:** Wireframes-Cambio-De-Contrasena.md
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
  - [3.1 La barra de identidad](#31-la-barra-de-identidad)
- [4. Interacciones](#4-interacciones)
- [5. Estados](#5-estados)
- [6. Versión responsive](#6-versión-responsive)
- [7. Notas de implementación](#7-notas-de-implementación)
  - [7.1 La brecha que esta superficie no puede cerrar](#71-la-brecha-que-esta-superficie-no-puede-cerrar)
- [8. Trazabilidad](#8-trazabilidad)
- [9. Control de cambios](#9-control-de-cambios)

---

## 1. Pantalla y propósito

**Nombre canónico de la superficie: `Cambio de contraseña`** (`SUP-03`).

Es la única operación de identidad del ciclo de vida normal del producto. Su tarea es que el administrador reemplace su contraseña exigiendo la actual, y que sepa con certeza qué pasó con su sesión al hacerlo. Realiza el patrón §4.4 de `Design-Rules-Acceso-Monousuario.md`.

A diferencia de las dos superficies de identidad anteriores, ésta vive **dentro del shell de trabajo**: hay sesión, hay navegación y hay a dónde volver. Se alcanza desde la barra de identidad de la barra superior.

---

## 2. Layout

Shell de trabajo completo, con la superficie sobre un contenedor angosto centrado en el área de contenido.

```text
+-----------------------------------------------------------------------+
| [=] <titulo del panel>      <identidad>  [Cambiar contrasena] [Salir] |
+---------+-------------------------------------------------------------+
| Lienzo  |                                                             |
| Logs    |     +------------- contenedor angosto -------------+        |
| Metr.   |     |  <Cambiar la contrasena>                     |  h1    |
| Ajustes |     |                                              |        |
|         |     |  [ banda de error       rol de alerta     ]  | cond.  |
|         |     |                                              |        |
|         |     |  Contrasena actual                           |        |
|         |     |  [ campo                                  ]  |        |
|         |     |                                              |        |
|         |     |  Contrasena nueva                            |        |
|         |     |  [ campo                                  ]  |        |
|         |     |  <requisito de la politica, declarado>       | §4.5   |
|         |     |                                              |        |
|         |     |  Confirmacion de la contrasena nueva         |        |
|         |     |  [ campo                                  ]  |        |
|         |     |                                              |        |
|         |     |  <efecto declarado sobre la sesion en curso> |        |
|         |     |                                              |        |
|         |     |            [ Volver ]  [ Guardar ]           |        |
|         |     +----------------------------------------------+        |
+---------+-------------------------------------------------------------+
```

A diferencia de las superficies del shell de acceso, ésta **sí lleva acción secundaria**: hay un estado previo al que volver. El par de acciones sigue el patrón §4.4 del documento base —secundaria a la izquierda, primaria a la derecha— y el verbo de cada botón nombra la acción exacta.

---

## 3. Componentes principales

| Componente | Propósito | Datos que muestra | Comportamiento |
| --- | --- | --- | --- |
| Barra de identidad | Muestra la identidad activa y las dos acciones de identidad, siempre visibles | Identidad activa | Nunca se colapsa a sólo ícono en escritorio, y nunca se esconde tras un menú de dos niveles. Ver la nota de §3.1 |
| Encabezado de primer nivel | Nombra la tarea | — | Estático |
| Banda de resultado, variante de error | Comunica el rechazo | Texto del catálogo de códigos | Rol de alerta |
| Campo de contraseña actual | Verifica que quien cambia el secreto es quien lo conoce | — | Propósito de campo declarado como secreto vigente. Recibe el foco inicial |
| Campo de contraseña nueva | Recoge el secreto nuevo | — | Propósito de campo declarado como secreto nuevo |
| Requisito declarado | Enuncia la regla completa de la política en positivo, **antes** del intento | El requisito, derivado de la política del sistema y no transcripto en la vista | Asociado al campo de contraseña nueva. Ver la brecha `B-UX-10` |
| Campo de confirmación | Previene el error de tipeo en un secreto que no se puede recuperar | — | Su discrepancia se informa por banda |
| Declaración del efecto sobre la sesión | Dice, **antes de confirmar**, qué va a pasar con la sesión en curso | El efecto declarado por la política de sesión | Estático. Ver la brecha `B-UX-11` |
| Acción secundaria | Vuelve sin cambiar nada | El verbo nombra la acción exacta | — |
| Acción primaria | Concreta el cambio | El verbo nombra la acción exacta | Se deshabilita durante el envío |

### 3.1 La barra de identidad

Se especifica acá porque es el punto desde el que esta superficie se alcanza, y porque `Design-Rules-Acceso-Monousuario.md` §4.3 la declara como patrón propio. Vive en la barra superior del shell de trabajo, es común a todas las superficies del shell y contiene tres elementos: la **identidad activa** como texto, la acción de **cambio de contraseña** y la acción de **cierre de sesión**, las dos con ícono y **etiqueta textual**.

Dos reglas que la barra hace cumplir:

- **El cierre de sesión está siempre a un clic desde cualquier superficie del shell de trabajo.** Es la contrapartida obligatoria de una sesión persistente y no se esconde tras un menú anidado.
- **El cierre de sesión es una acción que muta estado y se envía como tal**, no como enlace de navegación, y lleva etiqueta accesible explícita que nombra el efecto completo.

El intake nombra el punto de acceso como «el menú de usuario de la barra superior». La barra de identidad del catálogo lo realiza sin ocultar las dos acciones tras una apertura previa, que es lo que la extensión exige: «no escondidas tras un menú de dos niveles».

---

## 4. Interacciones

| Acción | Disparador | Resultado esperado | Precondición |
| --- | --- | --- | --- |
| Abrir la superficie | La acción de cambio de contraseña de la barra de identidad | Navegación a la superficie, sobre el shell de trabajo | Sesión iniciada |
| Escribir los tres campos | Foco en los campos | Sin validación de servidor mientras se escribe | La superficie está abierta |
| Guardar | Acción primaria | El sistema verifica la contraseña actual contra la almacenada derivada, valida la nueva contra la política, la almacena con una función de derivación de clave y aplica a la sesión el efecto declarado | Los tres campos completos |
| Volver | Acción secundaria | Retorno a la superficie anterior sin modificar la credencial | — |
| Recibir el acuse | El cambio se concretó | El acuse se exhibe **en la superficie siguiente**, con el código `SECRETO-ACTUALIZADO`, y declara qué cambió y qué pasó con la sesión. Cuál es la superficie siguiente depende del efecto sobre la sesión: ver la brecha `B-UX-11` | El cambio se concretó |
| Cambiar la contraseña sin la actual | — | **No existe.** El intake declara explícitamente que el cambio exige la contraseña actual | — |
| Cerrar sesión | La acción de cierre de la barra de identidad | La sesión se invalida y se navega al shell de acceso. Es una navegación completa | Sesión iniciada |

---

## 5. Estados

| Estado | Condición que lo produce | Representación esperada |
| --- | --- | --- |
| Con datos | La superficie está abierta con sesión vigente | Los tres campos limpios, con el requisito declarado y el efecto sobre la sesión visibles. Foco en el campo de contraseña actual |
| Cargando | La superficie se está abriendo | Esqueleto de los tres campos. Es una carga breve: no hay dato remoto que traer más allá de la política |
| Enviando | El cambio está en curso | Acción primaria deshabilitada con indicador de progreso. Previene el doble envío |
| Contraseña actual incorrecta | La actual no valida contra la almacenada | Banda de error con el código `SECRETO-ACTUAL-INCORRECTO`. La credencial **no se modifica**. Sin exponer parámetros de la política |
| Requisito no cumplido | La contraseña nueva viola la política declarada | Borde de error en el campo, más banda con el código `REQUISITO-NO-CUMPLIDO`, que enuncia la regla igual que el requisito declarado bajo el campo |
| Confirmación no coincidente | Los dos campos de contraseña nueva difieren | Banda con el código `CONFIRMACION-NO-COINCIDENTE` |
| Formulario vencido | La protección del formulario expiró | Banda con el código `FORMULARIO-VENCIDO` |
| Sesión vencida durante la edición | La sesión venció con la superficie abierta | Retorno al shell de acceso con el código `SESION-VENCIDA`. **No hay vencimiento silencioso** que se manifieste como un rechazo arbitrario al guardar |
| Éxito | El cambio se concretó | **Se resuelve en la superficie siguiente**, con el código `SECRETO-ACTUALIZADO` |
| Vacío | — | **No aplica.** La superficie no lista nada |
| Sin permiso | — | **No aplica.** Una sola identidad |

---

## 6. Versión responsive

La matriz de plataforma declara una única familia de navegador de escritorio y excluye navegadores móviles y pantallas pequeñas. Esta superficie **no tiene versión móvil especificada**.

Lo que rige por accesibilidad: reflujo conforme al criterio 1.4.10 a 320 píxeles de ancho. El contenedor angosto es de ancho acotado con tope máximo. Por debajo del punto de quiebre principal, la barra lateral del shell de trabajo colapsa según el patrón §8 del documento base, y **la barra de identidad no se colapsa a sólo ícono**: conserva sus etiquetas textuales.

**Norma de diseño aplicada, no brecha.** El punto de quiebre principal alrededor de 768 px y el piso de 320 px sin desplazamiento horizontal los declara `Design-Rules-Web-Generico.md` §8, y esta superficie los aplica. Lo único delegado son los **anchos de verificación**: en cuáles comprueba la etapa `b` el comportamiento y lo registra en su informe de cierre, según `Compatibilidad-Plataformas.md` §4. La brecha `B-UX-15`, que declaraba ausente la norma, se retiró por falsa; ver [`Experiencia-De-Uso.md`](../Experiencia-De-Uso.md) §10.2.1.

---

## 7. Notas de implementación

**Accesibilidad.**

- El requisito de la política se asocia a su control y se anuncia con el campo, antes del intento.
- Tras un rechazo, el foco vuelve a la banda o al primer campo inválido.
- Los tres campos declaran su propósito, distinguiendo el secreto vigente del secreto nuevo, para que el gestor de credenciales no proponga el valor equivocado.
- La acción de cierre de sesión de la barra de identidad lleva etiqueta accesible explícita que nombra el efecto completo, no sólo el verbo del botón.
- La banda de error lleva rol de alerta.

**Performance percibida.** El envío cruza el canal; la acción primaria se deshabilita durante la operación.

**Nota de realización, de `Design-Rules-Blazor-Mudblazor.md` §4.2.** Los formularios de identidad se envían por petición a un punto de autenticación, fuera del circuito de render interactivo, y el cierre de sesión es un envío y no un enlace de navegación.

### 7.1 La brecha que esta superficie no puede cerrar

`Design-Rules-Acceso-Monousuario.md` §4.4 exige que la superficie, al concretarse el cambio, **declare explícitamente qué pasa con la sesión en curso**: «un cambio de secreto que deja al usuario en duda sobre si sigue autenticado es un cambio a medias». §6 lo repite: si la conserva, se dice; si la invalida, se dice y se lleva al administrador al shell de acceso.

Ninguna fuente de esta solución declara ese efecto. En consecuencia, este wireframe:

- declara el **componente** que lo enuncia y su ubicación, antes de la confirmación;
- declara que el acuse posterior lo repite;
- **no escribe el texto y no elige el destino** de la navegación posterior.

Es la brecha `B-UX-11`, con destinatario en el agente humano del proyecto y en `05-Arquitectura-Tecnica`.

---

## 8. Trazabilidad

| Dimensión | Referencia |
| --- | --- |
| Persona objetivo | Administrador único de la solución: [`Vision-Producto.md`](../../00-Contexto/Vision-Producto.md) §2.1 |
| CU origen | [CU-31](../../02-Especificacion-Funcional/Casos-De-Uso/CU-31-Cambio-De-Contrasena.md) Cambio de contraseña |
| Reglas de negocio relevantes | RN-17 |
| Insumo del intake | §6 flujo 4; §4 capacidad F-01; §17.P.5; §9 exclusión 7 |
| Marco de experiencia aplicado | [`Experiencia-De-Uso.md`](../Experiencia-De-Uso.md) §1.4, §3.2 flujo FL-02, §8.2 catálogo de códigos |
| Representaciones que invoca | [`Representacion-Banda-De-Resultado.md`](../Representaciones/Representacion-Banda-De-Resultado.md) |
| Catálogo de diseño aplicado | `Design-Rules-Web-Generico.md` §3.1 shell, §4.4 formulario, §4.6 controles, §5; `Design-Rules-Acceso-Monousuario.md` §2, §3, §4.2, §4.3, §4.4, §4.6, §5, §6, §7, §8; `Design-Rules-Blazor-Mudblazor.md` §4.2 |
| US a generar en 06 | US-CU-31-1, US-CU-31-2, provisionales |
| Tests previstos en 08 | Snapshot de los once estados declarados; verificación de que ningún mensaje expone parámetros de la política; test de accesibilidad sobre el orden de foco y la etiqueta accesible del cierre de sesión |
| Brechas que declara | `B-UX-10`, política de contraseña; `B-UX-11`, efecto sobre la sesión |
| Maqueta de la Fase B2 | Nombre canónico `Cambio de contraseña`. Once estados declarados en §5, de los cuales nueve son demostrables: las filas marcadas no aplicable no se maquetan |
| Fuente de la correspondencia | La fila «CU origen» reproduce la fila de esta superficie en [`Experiencia-De-Uso.md`](../Experiencia-De-Uso.md) §9.2, que es la **fuente única** de la correspondencia entre superficie y caso de uso. Se reproduce, y no se referencia, porque `Rules-UX-UI-DX.md` §4.2.1 punto 8 la exige como sección obligatoria del wireframe |

---

## 9. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 1.0 | 2026-07-29 | Versión inicial. Especifica la superficie de cambio de contraseña sobre el shell de trabajo, con acción secundaria porque hay estado previo al que volver; especifica la barra de identidad como patrón común del shell, con el cierre de sesión siempre a un clic y como envío y no como enlace; declara once estados; declara el componente que enuncia el efecto sobre la sesión sin escribir su texto ni elegir el destino posterior, por la brecha `B-UX-11` |
| 1.0 | 2026-07-29 | Corrección del audit de la Fase B, absorbida dentro de la versión de emisión, sin subir versión y sin archivar, por la política de versionado de `Master-Prompt.md` §5: el documento está en estado `Propuesto` y la corrección proviene del audit de su propia fase. **H-06, P1:** Se suma a §8 la fila que declara la fuente única de la correspondencia entre superficie y caso de uso. **Brecha `B-UX-15` retirada por falsa:** §6 deja de declarar ausente el punto de quiebre y cita la norma que `Design-Rules-Web-Generico.md` §8 sí declara, acotando lo delegado a los anchos de verificación de la etapa `b`. Origen: informe [`Audit/B-02-03-r1.md`](../../Audit/B-02-03-r1.md) |
