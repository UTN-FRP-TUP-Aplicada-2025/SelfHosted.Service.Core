# Wireframes — Aprovisionamiento inicial

**Proyecto de código:** SelfHosted-Service
**Producto:** SelfHosted Service
**Documento:** Wireframes-Aprovisionamiento-Inicial.md
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
- [6. Versión responsive](#6-versión-responsive)
- [7. Notas de implementación](#7-notas-de-implementación)
- [8. Trazabilidad](#8-trazabilidad)
- [9. Control de cambios](#9-control-de-cambios)

---

## 1. Pantalla y propósito

**Nombre canónico de la superficie: `Aprovisionamiento inicial`** (`SUP-01`).

Es la primera y única pantalla que el administrador ve cuando abre una instancia recién desplegada de SelfHosted Service. Su tarea es una sola: crear la identidad del administrador único, que es el artefacto mínimo sin el cual el sistema no es operable. Una vez completada, la superficie **deja de existir para siempre en esa instancia**.

Corresponde al nodo «alta inicial del administrador» del mapa de navegación del anexo E-18 y realiza los patrones §4.1 a §4.5 de `Design-Rules-Primer-Arranque.md`.

---

## 2. Layout

Shell partido: la superficie se dibuja sobre el lienzo vacío, **sin barra lateral, sin barra superior y sin navegación de módulos**. Mientras el sistema no está aprovisionado no hay a dónde navegar, y ofrecer navegación sería mostrar puertas cerradas.

```text
+------------------------- lienzo, sin chrome --------------------------+
|                                                                       |
|              +-------------- ancho acotado --------------+            |
|              |  <Crear el administrador>                 |  h1        |
|              |  <es la unica cuenta del sistema>         |  subtitulo |
|              |                                           |            |
|              |  [ banda de error        rol de alerta ]  |  cond.     |
|              |                                           |            |
|              |  Nombre de usuario                        |  label     |
|              |  [ campo                               ]  |            |
|              |                                           |            |
|              |  Contrasena                               |  label     |
|              |  [ campo                               ]  |            |
|              |  <requisito de la politica, declarado>    |  §4.5      |
|              |                                           |            |
|              |  Confirmacion de la contrasena            |  label     |
|              |  [ campo                               ]  |            |
|              |                                           |            |
|              |  [======  Crear el administrador  ======]  |  primaria  |
|              +-------------------------------------------+            |
|                                                                       |
+-----------------------------------------------------------------------+
```

La tarjeta es de ancho acotado, centrada en horizontal y **anclada a la franja superior del viewport, no al centro vertical**, según el patrón §4.2 de `Design-Rules-Primer-Arranque.md`.

Tres ausencias deliberadas, que se declaran para que no se lean como omisión:

- **No hay acción de cancelar ni acción secundaria.** En el primer arranque no existe un estado previo al que volver.
- **No hay sello de versión.** Ésta no es una de las dos ubicaciones obligatorias del sello, y en el primer arranque no hay nada que diagnosticar todavía. Ver [`Representacion-Sello-De-Version.md`](../Representaciones/Representacion-Sello-De-Version.md) §6.
- **No hay wizard ni pasos.** Una superficie, un acto indivisible. `Design-Rules-Primer-Arranque.md` §10 enumera el wizard multipaso como anti-patrón: es ceremonia abandonable a la mitad que deja el sistema en estado parcial.

---

## 3. Componentes principales

| Componente | Propósito | Datos que muestra | Comportamiento |
| --- | --- | --- | --- |
| Encabezado de primer nivel | Nombra la tarea. Es lo que da estructura semántica a una página sin navegación | El nombre del artefacto mínimo que se está creando | Estático |
| Subtítulo de unicidad | Declara que ésta es la única identidad del sistema, para que el administrador entienda por qué no ve las opciones que espera de otras aplicaciones | Alcance y unicidad de lo que se crea | Estático |
| Banda de resultado, variante de error | Comunica el rechazo | Texto resuelto desde el catálogo de códigos. Ver [`Representacion-Banda-De-Resultado.md`](../Representaciones/Representacion-Banda-De-Resultado.md) | Aparece sólo tras un intento rechazado. Rol de alerta |
| Campo de nombre de usuario | Recoge el identificador | — | Propósito de campo declarado, para que el gestor de credenciales del navegador lo reconozca. Recibe el foco inicial |
| Campo de contraseña | Recoge el secreto | — | Propósito de campo declarado como secreto nuevo |
| Requisito declarado | Enuncia la regla completa de la política **en positivo y antes del intento**, no después de que falle | El requisito, **derivado de la política del sistema**, no transcripto como literal en la vista | Asociado al campo de contraseña, de modo que se anuncie junto con él |
| Campo de confirmación de la contraseña | Previene el error de tipeo en un secreto que no se puede recuperar | — | Su discrepancia se informa por banda, no de forma silenciosa |
| Acción primaria | Concreta el acto | El verbo nombra la acción exacta: crear el administrador | Ancho completo. Se deshabilita mientras el envío está en curso, para prevenir el doble envío |

**Sobre el requisito declarado y su brecha.** El patrón §4.5 de `Design-Rules-Primer-Arranque.md` exige que el contenido del requisito «se derive de la política del sistema, no se transcriba como literal en la vista». Ninguna fuente de este producto declara las condiciones concretas de validación de la contraseña: CU-29 lo registra como brecha con destinatario en el agente humano del proyecto, y esta categoría la recoge como `B-UX-10`. **El wireframe declara la ranura y su regla de derivación, y no escribe el texto.**

---

## 4. Interacciones

| Acción | Disparador | Resultado esperado | Precondición |
| --- | --- | --- | --- |
| Resolver el destino | El administrador abre la aplicación | Indicador de progreso indeterminado mientras el predicado de aprovisionamiento responde. La navegación resultante **reemplaza la entrada del historial** en vez de apilarla, para que el botón de retroceso no devuelva a un limbo | El sistema arrancó y aplicó sus migraciones |
| Escribir el nombre de usuario y la contraseña | Foco en los campos | Sin validación de servidor mientras se escribe. La validación de la superficie es de conveniencia | La superficie está abierta |
| Confirmar el alta | Acción primaria o envío del formulario | El sistema valida la contraseña, la almacena con una función de derivación de clave, genera las claves de firma y de instancia fuera del repositorio y de la imagen, e inicia la sesión | Los tres campos completos |
| Aterrizar en el destino al completar | El acto se concretó | Navegación completa al listado de proyectos SelfHosted, que es `destinoAlCompletar`, sobre el shell de trabajo, con la banda de confirmación `IDENTIDAD-CREADA` | El sistema quedó aprovisionado |
| Intentar abrir la superficie con el sistema ya aprovisionado | Entrada directa por dirección | **Redirección neutra** a la superficie de acceso. Ninguna capa expone por qué rechazó | El predicado es verdadero |
| Enviar el formulario con el sistema ya aprovisionado entre la carga y el envío | Condición de carrera | **Redirección neutra** a la superficie de acceso, no un error. El intento tardío es una condición de carrera esperable, no una falta del administrador | El predicado pasó a verdadero |
| Cancelar | — | **No existe.** No hay acción de cancelar en esta superficie | — |

El corte se aplica en las tres capas que `Design-Rules-Primer-Arranque.md` §3 declara —ruteo, superficie y acción—, las tres contra el mismo predicado. La mecánica técnica del guard, la transaccionalidad del alta y su idempotencia frente a intentos concurrentes son de `05-Arquitectura-Tecnica`.

---

## 5. Estados

Esta tabla es la lista de estados que la maqueta de la Fase B2 va a tener que demostrar.

| Estado | Condición que lo produce | Representación esperada |
| --- | --- | --- |
| Cargando, resolviendo el destino | El predicado de aprovisionamiento todavía no respondió | Superficie mínima con indicador de progreso indeterminado. **Nunca queda en blanco ni parpadea contenido que después se retira**. La espera es breve por contrato |
| Con datos, sin aprovisionar | El predicado es falso | Tarjeta de aprovisionamiento sobre shell vacío, con los tres campos limpios y el foco en el primero. Es el estado «con datos» de esta superficie |
| Enviando | El acto está en curso | Acción primaria deshabilitada, con indicador de progreso en su contenido. Previene el doble envío |
| Requisito no cumplido | La contraseña viola la política declarada | Borde de error en el campo, más banda de error con el código `REQUISITO-NO-CUMPLIDO`. El texto enuncia la regla igual que el requisito declarado bajo el campo |
| Confirmación no coincidente | Los dos campos de contraseña difieren | Banda de error con el código `CONFIRMACION-NO-COINCIDENTE`, que declara cuál es la discrepancia y qué hacer |
| Dato obligatorio ausente | Falta el nombre de usuario o la contraseña | Borde de error en el campo faltante, más banda de error |
| Formulario vencido | La protección del formulario expiró | Banda de error con el código `FORMULARIO-VENCIDO`. Que se reintente, sin detalle técnico |
| Envío fuera de tiempo | El sistema se aprovisionó entre la carga y el envío | Redirección neutra a la superficie de acceso. **Ningún mensaje en la superficie abandonada** |
| Vacío | — | **No aplica.** La superficie existe exactamente cuando falta el artefacto mínimo; no hay un estado en que exista y no tenga qué pedir |
| Éxito | El acto se concretó | **Se resuelve en la superficie siguiente.** El lazo cierra en el destino, con la banda de confirmación `IDENTIDAD-CREADA` |
| Sin permiso | — | **No aplica.** No hay sesión que evaluar ni roles que distinguir |

---

## 6. Versión responsive

La matriz de plataforma declara una única familia de navegador de escritorio y excluye navegadores móviles y pantallas pequeñas del alcance. Esta superficie **no tiene versión móvil especificada**.

Lo que sí rige, y rige por accesibilidad y no por matriz de plataforma:

- **Reflujo conforme al criterio 1.4.10 de WCAG 2.2.** El contenido es legible sin desplazamiento horizontal a 320 píxeles de ancho. La tarjeta es de ancho acotado con tope máximo, no de ancho fijo, de modo que reduce sin romper.
- El punto de quiebre principal del catálogo base está alrededor de 768 píxeles; por debajo, la tarjeta ocupa el ancho disponible menos el margen del lienzo.
- La composición es de una sola columna en todo ancho: no hay reflujo que especificar más allá del ancho de la tarjeta.

**Norma de diseño aplicada, no brecha.** El punto de quiebre principal alrededor de 768 px y el piso de 320 px sin desplazamiento horizontal los declara `Design-Rules-Web-Generico.md` §8, y esta superficie los aplica. Lo único delegado son los **anchos de verificación**: en cuáles comprueba la etapa `b` el comportamiento y lo registra en su informe de cierre, según `Compatibilidad-Plataformas.md` §4. La brecha `B-UX-15`, que declaraba ausente la norma, se retiró por falsa; ver [`Experiencia-De-Uso.md`](../Experiencia-De-Uso.md) §10.2.1.

---

## 7. Notas de implementación

**Accesibilidad.**

- La superficie sin navegación **mantiene su encabezado de primer nivel**: la ausencia de barra lateral no puede dejar la página sin estructura semántica.
- Foco inicial en el campo de nombre de usuario. Tras un error, el foco vuelve a la banda o al primer campo inválido.
- El requisito declarado se asocia a su control, de modo que el lector de pantalla lo anuncie con el campo y **antes** del intento.
- La banda de error lleva rol de alerta.
- Los campos de identidad declaran su propósito, para que el gestor de credenciales del navegador y las tecnologías asistivas los identifiquen sin depender del texto visible.

**Performance percibida.**

- La resolución del predicado es la primera espera que el administrador experimenta con el producto. Se muestra como estado del sistema, con progreso indeterminado, y no como pantalla en blanco.
- El envío cruza el canal: la acción primaria se deshabilita durante la operación.

**Internacionalización.** Idioma único. El nombre de usuario es un identificador que el administrador elige y se muestra literal.

**Nota de realización, de `Design-Rules-Blazor-Mudblazor.md` §4.2.** Los formularios de identidad y de aprovisionamiento se envían por petición a un punto de autenticación y no por interactividad de componente: la credencial de sesión se emite en el ciclo de la petición, fuera del circuito de render interactivo. Es nota de fidelidad del catálogo por stack, no una decisión de esta categoría; su realización es de `05-Arquitectura-Tecnica`.

---

## 8. Trazabilidad

| Dimensión | Referencia |
| --- | --- |
| Persona objetivo | Administrador único del producto: [`Vision-Producto.md`](../../00-Contexto/Vision-Producto.md) §2.1 |
| CU origen | [CU-29](../../02-Especificacion-Funcional/Casos-De-Uso/CU-29-Alta-Del-Administrador-En-El-Primer-Arranque.md) Alta del administrador en el primer arranque |
| Reglas de negocio relevantes | RN-17, registro de auditoría de toda escritura |
| Insumo del intake | §6 flujo 4; §4 capacidad F-01; §17.P.5; §9 exclusiones 5 y 7; anexo E-18 mapa de navegación |
| Marco de experiencia aplicado | [`Experiencia-De-Uso.md`](../Experiencia-De-Uso.md) §2.4 contrato del predicado, §3.1 flujo FL-01, §8.2 catálogo de códigos |
| Representaciones que invoca | [`Representacion-Banda-De-Resultado.md`](../Representaciones/Representacion-Banda-De-Resultado.md) |
| Catálogo de diseño aplicado | `Design-Rules-Web-Generico.md` §4.6 y §5; `Design-Rules-Primer-Arranque.md` §3, §4.1, §4.2, §4.4, §4.5, §5, §6, §8; `Design-Rules-Acceso-Monousuario.md` §3 shell partido; `Design-Rules-Blazor-Mudblazor.md` §4.2 |
| US a generar en 06 | US-CU-29-1, US-CU-29-2, US-CU-29-3, provisionales |
| Tests previstos en 08 | Snapshot de los once estados declarados; test de accesibilidad sobre el orden de foco y el anuncio de la banda; verificación del corte en las tres capas |
| Brechas que declara | `B-UX-10`, política de contraseña no declarada |
| Maqueta de la Fase B2 | Nombre canónico `Aprovisionamiento inicial`. Once estados declarados en §5, de los cuales nueve son demostrables: las filas marcadas no aplicable no se maquetan |
| Fuente de la correspondencia | La fila «CU origen» reproduce la fila de esta superficie en [`Experiencia-De-Uso.md`](../Experiencia-De-Uso.md) §9.2, que es la **fuente única** de la correspondencia entre superficie y caso de uso. Se reproduce, y no se referencia, porque `Rules-UX-UI-DX.md` §4.2.1 punto 8 la exige como sección obligatoria del wireframe |

---

## 9. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 2.0 | 2026-07-30 | **Migración normativa 4.1 → 6.0**, corte 4 de la fase M4, sobre el plan [`Plan-Migracion-4.1-a-6.0.md`](../../Audit/Plan-Migracion-4.1-a-6.0.md). Clasificación **regenerar contenido**, por el salto de `Rules-UX-UI-DX` 2.0 → 4.0. **Fuente de contenido: documento de origen**, más el [`PRODUCT-MANIFEST`](../../../Intake/PRODUCT-MANIFEST-SelfHosted-Service.md) §2 para el único campo de cabecera que se suma. Ni el corte en las tres capas, ni las tres ausencias deliberadas, ni las siete interacciones, ni los once estados cambian de contenido: lo que cambia es la nomenclatura. Las nueve secciones obligatorias de `Rules-UX-UI-DX` 4.0 §4.2.1 ya estaban presentes y ninguna se agregó ni se reordenó. **Cabecera**: `**Proyecto:**` llevaba un valor del plano de negocio y pasa a `**Producto:**`, porque `Vocabulario-Rules.md` §3 prohíbe la etiqueta de un plano sobre el valor de otro; se suma `**Proyecto de código:** SelfHosted-Service`, que §4.1 de la regla vigente exige y que este documento no declaraba, con el valor **leído del manifiesto y no inferido**. **Vocabulario (`[5.0]`)**: «solución» pasa a «producto» en **2 ocurrencias** del referente de nivel superior —«Ninguna fuente de esta solución» en §3 y «Administrador único de la solución» en §8—, las dos con la concordancia de género corregida. La **1 ocurrencia de «resolución»** —«La resolución del predicado» en §7— **se contó antes y después y sigue siendo 1**: no se tocó, porque la cadena `soluci` vive dentro de la palabra. De las 3 ocurrencias de «proyecto», 1 era la etiqueta de cabecera y **2 no se tocaron**: «el listado de proyectos SelfHosted» de §4, que designa la entidad del dominio, y «agente humano del proyecto» de §3, que designa el emprendimiento. **Ninguna ocurrencia se promovió a «proyecto de código».** La sustitución se hizo por el procedimiento por ocurrencia de `Vocabulario-Rules.md` §9.5 y **nunca por reemplazo global de cadena**. El bloque ASCII de §2 no contiene ninguna palabra a migrar y **conserva su ancho intacto**. Los nombres canónicos de superficie —`SUP-01` y `Aprovisionamiento inicial`— se conservan textualmente, porque `Deriva-Rules.md` exige que coincidan término por término con la línea de base visual. **Glosario (`[5.1]`)**: `Glosario-UX.md` pasa de recomendado a obligatorio para los ocho tipos D8 y §6 verifica ahora su existencia y su completitud además de la no duplicación; lo emite un lote posterior de esta migración, y los términos que este wireframe acuña —shell partido, shell de acceso, requisito declarado, predicado de aprovisionamiento en su lectura de superficie, `destinoAlCompletar`— se devolvieron para que ese lote los consuma sin redefinir los que ya están en `Glosario-Funcional.md` de 02. Ninguna fila anterior de este control de cambios se reescribió (`SDD-Development-Guide.md` §VI.2) y el bloque de procedencia del destino no se tocó: sigue declarando 4.1, y cerrarlo es trabajo de M5 |
| 1.0 | 2026-07-29 | Versión inicial. Especifica la superficie de aprovisionamiento inicial sobre el shell partido, sin chrome de navegación y sin acción de cancelar; declara el corte en las tres capas contra el predicado único, el destino al completar y el cierre del lazo en la superficie siguiente; declara once estados, incluidos los dos de condición de carrera; declara la ranura del requisito de política sin escribir su texto, por la brecha `B-UX-10` |
| 1.0 | 2026-07-29 | Corrección del audit de la Fase B, absorbida dentro de la versión de emisión, sin subir versión y sin archivar, por la política de versionado de `Master-Prompt.md` §5: el documento está en estado `Propuesto` y la corrección proviene del audit de su propia fase. **H-06, P1:** Se suma a §8 la fila que declara la fuente única de la correspondencia entre superficie y caso de uso. **Brecha `B-UX-15` retirada por falsa:** §6 deja de declarar ausente el punto de quiebre y cita la norma que `Design-Rules-Web-Generico.md` §8 sí declara, acotando lo delegado a los anchos de verificación de la etapa `b`. Origen: informe [`Audit/B-02-03-r1.md`](../../Audit/B-02-03-r1.md) |
