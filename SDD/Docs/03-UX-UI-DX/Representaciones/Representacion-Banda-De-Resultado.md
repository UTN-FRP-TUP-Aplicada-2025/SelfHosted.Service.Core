# Representación — Banda de resultado por código

**Proyecto de código:** SelfHosted-Service
**Producto:** SelfHosted Service
**Documento:** Representacion-Banda-De-Resultado.md
**Versión:** 2.0
**Estado:** Propuesto
**Fecha:** 2026-07-30
**Autor:** UX/UI Designer + Frontend Lead (AG-03)
**Variante:** UX/UI

---

## Tabla de contenido

- [1. Concepto representado y propósito](#1-concepto-representado-y-propósito)
- [2. Apariencia esquemática](#2-apariencia-esquemática)
- [3. Variantes](#3-variantes)
  - [3.1 Restricciones de contenido que la variante de error hace cumplir](#31-restricciones-de-contenido-que-la-variante-de-error-hace-cumplir)
  - [3.2 Entradas del catálogo y su variante](#32-entradas-del-catálogo-y-su-variante)
- [4. Datos que consume](#4-datos-que-consume)
- [5. Restricciones de accesibilidad](#5-restricciones-de-accesibilidad)
- [6. Reutilización](#6-reutilización)
- [7. Control de cambios](#7-control-de-cambios)

---

## 1. Concepto representado y propósito

La **banda de resultado** es el componente con el que las superficies de identidad comunican el desenlace de un acto: un aprovisionamiento que se concretó, una credencial que se rechazó, una sesión que venció, una contraseña que cambió. Es el patrón §4.4 de `Design-Rules-Primer-Arranque.md` y §4.2 de `Design-Rules-Acceso-Monousuario.md`, que las dos extensiones declaran compartido.

Su rasgo definitorio es que **el texto no se compone en la vista**: se resuelve desde un código de resultado contra el catálogo declarado en [`Experiencia-De-Uso.md`](../Experiencia-De-Uso.md) §8.2. Ese rasgo existe por dos motivos, y los dos importan en este producto. El primero es de consistencia: sin catálogo, el mismo rechazo se redacta distinto en la superficie de acceso y en la de cambio de contraseña, y las dos divergen con el tiempo. El segundo es de seguridad: el rechazo de credenciales tiene que ser **indiferenciado** y ningún mensaje puede exponer parámetros de la política, y esas dos reglas se hacen cumplir en un solo lugar o no se hacen cumplir.

El segundo rasgo definitorio es que **el lazo se cierra en la superficie de destino, no en la de origen**. Un acto de identidad que ocurre en una pantalla acusa recibo en la siguiente, porque la pantalla donde ocurrió deja de existir o deja de ser el lugar donde el administrador está mirando.

---

## 2. Apariencia esquemática

Banda de ancho completo dentro de la tarjeta, **sobre los campos** y bajo el título. Nunca al pie: un resultado que aparece debajo del botón se descubre después de haber vuelto a intentar.

```text
    +--------------------------------------------+
    |  <titulo de la superficie>                 |
    |                                            |
    |  +--------------------------------------+  |
    |  | (i)  <texto del catalogo de codigos> |  |   <- banda de resultado
    |  +--------------------------------------+  |
    |                                            |
    |  <etiqueta>                                |
    |  [ campo                                ]  |
    |  ...                                       |
    |  [=========  accion primaria  =========]   |
    +--------------------------------------------+
```

La banda es de una a dos líneas. Un resultado que necesita más de dos líneas no es un resultado: es una superficie, y el caso de este producto es el informe de conflicto de direcciones, que tiene wireframe propio.

---

## 3. Variantes

Dos variantes de presentación y una regla de agotamiento.

| Variante | Condición de uso | Diferencias esperadas |
| --- | --- | --- |
| Error | El acto no se concretó: credencial rechazada, requisito no cumplido, confirmación no coincidente, formulario vencido, acceso restringido, sesión vencida | Estado semántico de error del catálogo base. Rol de alerta, para que se anuncie sin que el administrador tenga que buscarlo. Tras aparecer, el foco vuelve a la banda o al primer campo inválido |
| Confirmación | El acto de la superficie **anterior** se concretó: identidad creada, secreto actualizado | Estado semántico de éxito del catálogo base. Rol de estado, que anuncia sin interrumpir. No roba el foco: el administrador viene a hacer otra cosa |
| Genérica | El código de resultado no tiene entrada en el catálogo | Presentación de la variante de error, con el texto genérico del catálogo. **Nunca el código crudo, nunca el detalle técnico** |

### 3.1 Restricciones de contenido que la variante de error hace cumplir

Estas cuatro no son recomendaciones de redacción: son reglas del perfil de operador único, y una banda que las viola es un defecto de seguridad, no de estilo.

| Restricción | Por qué | Fuente |
| --- | --- | --- |
| El rechazo de credenciales es **indiferenciado** | Distinguir «identificador inexistente» de «secreto incorrecto» confirma la existencia de la identidad a quien no debería saberlo | `Design-Rules-Acceso-Monousuario.md` §5 y §10 |
| Ningún texto expone parámetros de la política: umbrales, ventanas, duraciones | Filtra el parámetro de seguridad | `Design-Rules-Acceso-Monousuario.md` §5 |
| La restricción temporal de acceso **no lleva cuenta regresiva ni tiempo restante** | Expondría el umbral y convertiría la espera en un juego | `Design-Rules-Acceso-Monousuario.md` §4.5 |
| Ningún texto lleva detalle técnico del rechazo | Es información de sistema, no contenido de usuario | `Design-Rules-Primer-Arranque.md` §3 |

### 3.2 Entradas del catálogo y su variante

Las nueve entradas del catálogo de `Experiencia-De-Uso.md` §8.2, con la superficie que las emite y la que las exhibe. La asimetría entre las dos columnas es la regla de continuidad: el lazo cierra en el destino.

| Código | Variante | Superficie que lo produce | Superficie que lo exhibe |
| --- | --- | --- | --- |
| `IDENTIDAD-CREADA` | Confirmación | Aprovisionamiento inicial | Listado de proyectos |
| `CREDENCIAL-RECHAZADA` | Error | Acceso al panel | Acceso al panel |
| `ACCESO-RESTRINGIDO` | Error | Acceso al panel | Acceso al panel |
| `FORMULARIO-VENCIDO` | Error | Cualquiera de identidad | La misma que lo produjo |
| `SESION-VENCIDA` | Error | Cualquier superficie del shell de trabajo | Acceso al panel |
| `SECRETO-ACTUALIZADO` | Confirmación | Cambio de contraseña | La declarada por el efecto sobre la sesión; ver §4 |
| `SECRETO-ACTUAL-INCORRECTO` | Error | Cambio de contraseña | Cambio de contraseña |
| `REQUISITO-NO-CUMPLIDO` | Error | Aprovisionamiento inicial, cambio de contraseña | La misma que lo produjo |
| `CONFIRMACION-NO-COINCIDENTE` | Error | Aprovisionamiento inicial, cambio de contraseña | La misma que lo produjo |

---

## 4. Datos que consume

| Dato | De dónde sale | Uso |
| --- | --- | --- |
| Código de resultado | El acto de identidad que se ejecutó | Selecciona la entrada del catálogo y la variante |
| Texto del catálogo | Catálogo de códigos de `Experiencia-De-Uso.md` §8.2 | Es el contenido. **La vista no lo compone** |
| Efecto sobre la sesión en curso | Política de sesión del sistema | Sólo para `SECRETO-ACTUALIZADO`: determina si la banda se exhibe en el shell de trabajo, porque la sesión se conservó, o en el shell de acceso, porque se invalidó |

Dos datos que la banda **no** consume, y no consumirlos es parte de su definición:

- **No consume el motivo técnico del rechazo.** Ninguna capa expone por qué rechazó; el detalle es información de sistema.
- **No consume parámetros de la política.** Ni el umbral de intentos, ni la ventana de restricción, ni la duración de la sesión, ni las condiciones concretas de la contraseña. El requisito de la contraseña se declara **bajo el campo, antes del intento**, con el patrón de requisito declarado, y no dentro de la banda.

**Brecha `B-UX-11`.** El efecto de un cambio de contraseña sobre la sesión en curso no está declarado por ninguna fuente, y `Design-Rules-Acceso-Monousuario.md` §6 exige declararlo: «si el cambio de secreto la conserva, se dice; si la invalida, se dice y se lleva al usuario al shell de acceso». Hasta que se declare, la superficie de destino de `SECRETO-ACTUALIZADO` queda indeterminada y no se elige por conveniencia.

**Brecha `B-UX-10`.** Las condiciones concretas de la política de contraseña y el umbral de intentos fallidos tampoco están declarados. Sin ellos, `REQUISITO-NO-CUMPLIDO` no tiene texto derivable y `ACCESO-RESTRINGIDO` no tiene condición de disparo declarada.

---

## 5. Restricciones de accesibilidad

Piso WCAG 2.2 nivel AA.

- **Rol de alerta en la variante de error y rol de estado en la de confirmación.** Es requisito explícito de las dos extensiones que declaran el patrón. La diferencia importa: la alerta interrumpe la lectura en curso, el estado no.
- **Gestión del foco tras un rechazo.** El foco vuelve a la banda o al primer campo inválido, para que el motivo se perciba sin recorrer la página.
- La banda **no roba el foco en la variante de confirmación**: el administrador llega a esa pantalla a hacer otra cosa.
- **El color no es el único canal.** Las dos variantes llevan ícono y su texto es autoexplicativo: un lector que no percibe el par de color distingue igual un rechazo de un acuse.
- Contraste 4.5:1 para el texto de la banda sobre su fondo suave.
- La banda es **contenido, no control**: no es enfocable salvo que contenga un enlace, y no lo contiene en ninguna de sus nueve entradas.
- La aparición de la banda no depende de animación: con preferencia de movimiento reducido aparece sin transición y su anuncio no cambia.

---

## 6. Reutilización

| Superficie | Wireframe | Variantes que exhibe |
| --- | --- | --- |
| Aprovisionamiento inicial | [`Wireframes-Aprovisionamiento-Inicial.md`](../Wireframes/Wireframes-Aprovisionamiento-Inicial.md) | Error |
| Acceso al panel | [`Wireframes-Acceso-Al-Panel.md`](../Wireframes/Wireframes-Acceso-Al-Panel.md) | Error y confirmación |
| Cambio de contraseña | [`Wireframes-Cambio-De-Contrasena.md`](../Wireframes/Wireframes-Cambio-De-Contrasena.md) | Error |
| Listado de proyectos | [`Wireframes-Listado-De-Proyectos.md`](../Wireframes/Wireframes-Listado-De-Proyectos.md) | Confirmación, como destino del aprovisionamiento |
| Informe de conflicto de direcciones | [`Wireframes-Informe-De-Conflicto-De-Direcciones.md`](../Wireframes/Wireframes-Informe-De-Conflicto-De-Direcciones.md) | Error, para el rechazo recalculado de una dirección sugerida que dejó de estar libre |

**Delimitación respecto de los mensajes de dominio.** La banda de resultado sirve a las superficies de identidad y al rechazo puntual de una acción. **No** sirve para los errores del dominio que tienen contenido propio y estructura: el informe de conflicto de direcciones, el informe de impacto, el informe de importación y la línea de tiempo de un despliegue fallido son superficies o componentes con wireframe propio, y no bandas. La regla de corte es la de §2: un resultado que no entra en dos líneas no es un resultado.

---

## 7. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 2.0 | 2026-07-30 | Migración normativa del conjunto 4.1 al 6.0, fase M4 corte 4, bajo `Rules-UX-UI-DX` 4.0, `Vocabulario-Rules` 2.1 y `Migracion-Rules` 1.0. Clasificación **regenerar contenido** por el salto major 2.0 → 4.0 de la regla que gobierna la categoría; fuente de contenido: **el documento de origen**, archivado sin modificar en `_legacy/2026-07-30/Representacion-Banda-De-Resultado-v1.0.md`. Sube **major** porque la nomenclatura anterior deja de cumplir. **Cabecera:** se suma el campo `Proyecto de código` con el valor `SelfHosted-Service`, que §4.1 de la regla 4.0 exige por ser ésta una categoría de nivel proyecto de código (`Vocabulario-Rules` §4 R3), y la etiqueta `Proyecto` pasa a `Producto` sobre su valor de origen `SelfHosted Service`, porque `Vocabulario-Rules` §3 prohíbe la etiqueta de un plano de identidad sobre el valor de otro; los dos conviven porque §4.1 exige el primero y `Migracion-Rules` §4.2 prohíbe perder el segundo. Se conserva el campo `Variante`. **Sustitución léxica por ocurrencia** según `Vocabulario-Rules` §9.5 y el plan de migración §3.5, y nunca por reemplazo global de cadena: **cero** ocurrencias de «solución» con el referente de nivel superior y **cero** de la cadena `resoluci`, verificado por barrido; las cinco ocurrencias de «proyecto» se clasificaron una por una y **ninguna pasó a «proyecto de código»** —cuatro designan la entidad del dominio, el agrupador de servicios contenedorizados que el usuario crea desde el portal, en la forma corta que el PRODUCT-INTAKE §12 admite donde el contexto ya fijó el sentido, y una es el nombre del archivo de un wireframe del dominio, que no se renombra—. **Glosario:** desde la 4.0 `Glosario-UX.md` es artefacto obligatorio para los ocho tipos D8 y §6 verifica su existencia y su completitud; los términos que esta representación acuña —banda de resultado, variante de error, variante de confirmación, variante genérica, catálogo de códigos de resultado, rechazo indiferenciado, requisito declarado, regla de continuidad del lazo— se devolvieron al lote que emite ese glosario y acá no se redefinen, y los que ya declaran [`Vision-Producto`](../../00-Contexto/Vision-Producto.md) §9 y [`Glosario-Funcional`](../../02-Especificacion-Funcional/Glosario-Funcional.md) se referencian sin duplicarse. **Ningún concepto, variante, restricción de contenido, entrada del catálogo, dato consumido, restricción de accesibilidad ni superficie de reutilización cambió de contenido**: la migración es léxica y de forma de cabecera. El bloque ASCII de §2 no contenía ninguna palabra a migrar y quedó intacto, con su ancho de caja preservado. Las filas anteriores de este control de cambios no se reescribieron. El bloque de procedencia del destino sigue declarando la 4.1 y no se toca: es trabajo de M5. Origen: [`Plan-Migracion-4.1-a-6.0.md`](../../Audit/Plan-Migracion-4.1-a-6.0.md) §3.5 y §4 |
| 1.0 | 2026-07-29 | Versión inicial. Materializa el patrón de banda de mensaje de `Design-Rules-Primer-Arranque.md` §4.4 y de banda de resultado por código de `Design-Rules-Acceso-Monousuario.md` §4.2; declara las dos variantes y la de agotamiento del catálogo; transcribe las cuatro restricciones de contenido del perfil de operador único; declara las nueve entradas del catálogo con la superficie que las produce y la que las exhibe, y la regla de continuidad que las separa; declara los dos datos que la banda no consume y las brechas `B-UX-10` y `B-UX-11` que dejan sin resolver el texto de dos entradas y el destino de una tercera; delimita el alcance respecto de los mensajes de dominio con estructura propia |
