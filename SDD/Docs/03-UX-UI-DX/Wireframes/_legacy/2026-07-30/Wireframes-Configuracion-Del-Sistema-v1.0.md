# Wireframes — Configuración del sistema

**Proyecto:** SelfHosted Service
**Documento:** Wireframes-Configuracion-Del-Sistema.md
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
  - [3.1 La frontera de configuración, hecha visible](#31-la-frontera-de-configuración-hecha-visible)
  - [3.2 La credencial se muestra una única vez](#32-la-credencial-se-muestra-una-única-vez)
  - [3.3 El sello y el detalle de diagnóstico](#33-el-sello-y-el-detalle-de-diagnóstico)
- [4. Interacciones](#4-interacciones)
- [5. Estados](#5-estados)
- [6. Versión responsive](#6-versión-responsive)
- [7. Notas de implementación](#7-notas-de-implementación)
- [8. Trazabilidad](#8-trazabilidad)
- [9. Control de cambios](#9-control-de-cambios)

---

## 1. Pantalla y propósito

**Nombre canónico de la superficie: `Configuración del sistema`** (`SUP-12`).

Es donde vive lo que la instancia gobierna por encima de cualquier proyecto SelfHosted: el rango de direcciones gestionado, las credenciales de máquina, el respaldo programado y la retención del historial. Corresponde a la ruta `/configuracion` del mapa de navegación del anexo E-18, que la declara con esos contenidos.

Es además la **segunda ubicación obligatoria del sello de versión** y la única que aloja el detalle de diagnóstico completo.

Es la superficie donde la frontera entre configuración de aplicación y configuración de entorno se hace visible: **lo que la instancia no gobierna no se dibuja acá, ni siquiera deshabilitado**.

---

## 2. Layout

Superficie del shell de trabajo, con secciones agrupadas y separadas por barra de acento, según el patrón §3.2 del documento base.

```text
+-----------------------------------------------------------------------+
| [=] <titulo del panel>      <identidad>  [Cambiar contrasena] [Salir] |
+---------+-------------------------------------------------------------+
| Lienzo  |  Configuracion del sistema                                  |
| Logs    |  ---------------------------------------------------------  |
| Metr.   |  | Rango de direcciones gestionado                          |
| Ajustes |  | (!) <advertencia: debe estar fuera del rango que reparte |
|         |  |      el servidor de direcciones de la red>               |
|         |  | Subred [        ]  Pasarela [        ]                   |
|         |  | Desde  [        ]  Hasta    [        ]                   |
|         |  | Interfaz padre [        ]                                |
|         |  | Exclusiones [                                         ]  |
|         |  |                                                          |
|         |  | Reservas                                                 |
|         |  | Direccion   Servicio   Proyecto   Activa                 |
|         |  | <dir>       <serv>     <proy>     si|no                  |
|         |  ---------------------------------------------------------  |
|         |  | Credenciales de maquina         [ + Emitir credencial ]  |
|         |  | Nombre  Prefijo  Ambitos  Vigencia  Ultimo uso  Estado   |
|         |  | <n>     <p>      <a>      <v>       <u>         <e> [rev]|
|         |  ---------------------------------------------------------  |
|         |  | Respaldo programado                                      |
|         |  | Destino [                            ]                   |
|         |  | Periodicidad [                       ]                   |
|         |  | Ultima exportacion vigente: <antiguedad> por proyecto    |
|         |  ---------------------------------------------------------  |
|         |  | Retencion del historial                                  |
|         |  | Despliegues por servicio [   ]  Dias de auditoria [   ]  |
|         |  ---------------------------------------------------------  |
|         |  | Acerca de esta instancia                                 |
|         |  | <version legible>  [preliminar]     > Diagnostico        |
|         |  ---------------------------------------------------------  |
+---------+-------------------------------------------------------------+
```

Cinco secciones, dentro del rango que la ley de Miller admite. Cada una con su barra de acento, su título y su subtítulo descriptivo.

---

## 3. Componentes principales

| Componente | Propósito | Datos que muestra | Comportamiento |
| --- | --- | --- | --- |
| Sección de rango gestionado | Declara el espacio de direcciones que la instancia administra | Subred, primera y última dirección, pasarela, interfaz padre y exclusiones | Campos dirigidos por descriptor |
| Advertencia del rango | Previene el conflicto con la red real antes de que ocurra | — | El rango **debe estar fuera del que reparte el servidor de direcciones de la red**: la configuración inicial lo advierte y el sistema lo valida |
| Tabla de reservas | Da el estado de ocupación del rango | Por reserva: dirección, servicio, proyecto SelfHosted y **marca de activa** | Sólo lectura desde acá; la reserva se declara en el panel lateral del servicio |
| Sección de credenciales de máquina | Emite, lista y revoca las credenciales que usan los automatismos | Por credencial: nombre, prefijo, ámbitos, vigencia, último uso y estado de revocación. **Nunca el valor** | Ver §3.2 |
| Sección de respaldo programado | Declara dónde y cada cuánto se exporta | Destino, periodicidad y **antigüedad de la última exportación vigente por proyecto SelfHosted** | Ver la brecha `B-UX-16` |
| Sección de retención | Acota cuánto historial se conserva | Cantidad de despliegues por servicio y días de auditoría | El intake los declara configurables, sin declarar su valor por defecto |
| Sección de identidad de la instancia | Aloja el sello y el detalle de diagnóstico | Ver [`Representacion-Sello-De-Version.md`](../Representaciones/Representacion-Sello-De-Version.md) | Ver §3.3 |

### 3.1 La frontera de configuración, hecha visible

`Design-Rules-Config-Esquema.md` §2.1 exige que ningún parámetro que la superficie no gobierna se dibuje acá, **ni siquiera deshabilitado**: mostrar un control que no manda es peor que no mostrarlo, porque el administrador cree haber configurado algo que sigue igual.

Los parámetros de entorno de esta solución, que **no se dibujan**: la clave de firma de las credenciales y la clave de la instancia, la ubicación del archivo de la base de datos, el directorio de datos de trabajo y la ruta del punto de acceso del motor de contenedores. Los cuatro se fijan al desplegar la instancia y se documentan en `09-Devops`.

Un caso queda sin clasificar por ninguna fuente —el prefijo de nombre reservado de los contenedores que la solución gobierna— y por eso **tampoco se dibuja** hasta que la brecha `B-UX-06` se resuelva. La regla ante la duda es no renderizar: dibujar un control que quizá no manda tiene peor consecuencia que omitir uno que sí mandaría.

**Dependencia declarada como información.** El intake declara que el rango de direcciones de desarrollo debe ser distinto del de producción y sin solapamiento. Es una condición del entorno que **condiciona los valores admisibles** del rango gestionado sin que esta superficie pueda gobernarla: se declara como información junto a la sección del rango, sin ofrecer cambiarla.

### 3.2 La credencial se muestra una única vez

Es la regla más consecuente de la sección de credenciales, y el intake la declara como invariante del modelo y no como decisión de infraestructura: **sólo se persiste el resumen del valor, y el valor se muestra una única vez**.

Consecuencias de diseño:

1. Tras emitir, aparece una **vista de un solo uso** con el valor y una acción de copiado en un solo gesto, y un aviso de que no va a volver a mostrarse.
2. El listado **nunca muestra el valor**, en ninguna columna ni en ningún detalle. No hay acción de revelar, porque el sistema no lo tiene.
3. Perdido el valor, **no puede recuperarse**: corresponde revocar y emitir uno nuevo, y la interfaz lo dice cuando el administrador busca dónde verlo.
4. Los ámbitos se eligen del conjunto cerrado que el intake declara, y la interfaz **desaconseja la opción sin vencimiento** sin prohibirla.

Los ámbitos de una credencial **no son roles del administrador**. Aparecen sólo en esta sección, y ninguna otra superficie los enuncia: hacerlo sugeriría una granularidad de permisos que para la persona no existe.

### 3.3 El sello y el detalle de diagnóstico

Ésta es una de las dos ubicaciones obligatorias del sello, y la que aloja el disclosure con el contrato completo y su copiado en un solo gesto. El detalle existe para que un reporte de problema no empiece por transcribir a mano un identificador de construcción.

Los cuatro campos del contrato no están declarados por ninguna fuente de esta solución: es la brecha `B-UX-07`. Este wireframe declara la ranura, las filas de clave y valor y la acción de copiado, y **no inventa los campos ni su origen**.

---

## 4. Interacciones

| Acción | Disparador | Resultado esperado | Precondición |
| --- | --- | --- | --- |
| Declarar el rango gestionado | Edición de la sección | El sistema **advierte que el rango debe estar fuera del que reparte el servidor de direcciones de la red y lo valida** | Sesión iniciada |
| Declarar una exclusión | Edición del campo | La dirección excluida deja de ser asignable | La sección está abierta |
| Consultar las reservas | Apertura de la sección | El sistema devuelve las reservas con su dirección, su servicio, su proyecto SelfHosted y su marca de activa | Hay reservas |
| Emitir una credencial | Acción de la sección | Se declara nombre, ámbitos y vigencia. El sistema genera la credencial y **muestra su valor una única vez** | Sesión iniciada |
| Copiar el valor de la credencial | Acción de la vista de un solo uso | El valor queda disponible para pegar, con confirmación anunciada | La vista está abierta |
| Cerrar la vista de un solo uso | Acción de cierre | El valor **deja de estar disponible para siempre** | La vista está abierta |
| Elegir vigencia sin vencimiento | Selección en el formulario | Se admite y **se desaconseja en la interfaz** | El formulario está abierto |
| Revocar una credencial | Acción de la fila | El sistema marca la fecha de revocación y el efecto es **inmediato**: la primera petición posterior con esa credencial se rechaza, **sin afectar a otras credenciales ni a la sesión del administrador** | Existe la credencial |
| Declarar el respaldo programado | Edición de la sección | Se persiste la programación. Ver la brecha `B-UX-16` | Sesión iniciada |
| Ejecutar la exportación fuera de horario | Acción de la sección | Se ejecuta sin alterar la programación | Hay programación declarada |
| Consultar la antigüedad de la última exportación | Apertura de la sección | El sistema declara la antigüedad de la última exportación vigente por proyecto SelfHosted | Hubo alguna exportación |
| Abrir el detalle de diagnóstico | Acción sobre el sello | Se despliega el contrato completo en filas de clave y valor | Sesión iniciada |
| Copiar el diagnóstico | Acción del detalle | El bloque de texto plano queda disponible para pegar en un reporte, con confirmación anunciada | El detalle está expandido |
| Cambiar los parámetros de entorno | — | **No existe.** Ninguno se dibuja acá | — |

---

## 5. Estados

| Estado | Condición que lo produce | Representación esperada |
| --- | --- | --- |
| Cargando | Las secciones se están trayendo | Esqueleto de campos |
| Con datos | La superficie está abierta | Las cinco secciones pobladas |
| Vacío | — | **No aplica al conjunto.** Siempre hay rango, retención y sello. Sí aplica a dos tablas: ver las dos filas siguientes |
| Sin reservas | Ningún servicio declara dirección fija | La tabla de reservas declara su estado vacío con texto orientativo |
| Sin credenciales | No se emitió ninguna | La tabla de credenciales declara su estado vacío con la acción de emitir |
| Campo válido | El valor está dentro de los límites del descriptor | Control normal con el hint de valor por defecto y límites |
| Campo en error | El valor viola los límites | Borde de error y mensaje inline con el rango admitido |
| Dirección fuera de rango o excluida | Se declaró una dirección no admisible | Rechazo **con la siguiente dirección libre sugerida** |
| Rango solapado con el del servidor de direcciones | El rango declarado invade el que reparte la red | Rechazo con la advertencia declarada |
| Credencial recién emitida | Se emitió | **Vista de un solo uso** con el valor, la acción de copiado y el aviso de que no va a volver a mostrarse |
| Credencial revocada | Se revocó | Fila con estado de revocación y su fecha. No se elimina del listado |
| Respaldo con exportación vigente | Hubo exportación exitosa | Antigüedad declarada por proyecto SelfHosted |
| Respaldo con destino inalcanzable | La última ejecución falló | Resultado fallido **con su causa**; la exportación anterior sigue disponible y **su antigüedad crece** |
| Sello con versión publicada | El contrato entrega la cadena y el artefacto no es preliminar | Sello con la cadena, y disclosure de diagnóstico colapsado |
| Sello con artefacto preliminar | El contrato lo declara preliminar | Sello más distintivo textual contiguo |
| Sello con origen indeterminado | La identidad no pudo derivarse | Sello con el marcador textual explícito |
| Diagnóstico expandido | Se abrió el disclosure | Filas de clave y valor con el contrato completo, más la acción de copiado |
| Diagnóstico copiado | Se ejecutó el copiado | Confirmación efímera **anunciada como región activa** |
| Error | Una sección no pudo traerse o una escritura falló | Banda de error con causa y acción de recuperación |
| Sin permiso | — | **No aplica** para el administrador |

---

## 6. Versión responsive

La matriz de plataforma declara una única familia de navegador de escritorio y excluye navegadores móviles y pantallas pequeñas. Esta superficie **no tiene versión móvil especificada**.

- Las cinco secciones son apiladas y reflúyen sin punto de quiebre propio.
- Las grillas de campos pasan de varias columnas a una, conforme al criterio 1.4.10.
- Las dos tablas se desplazan dentro de su propio contenedor si el ancho no alcanza.
- El sello y su disclosure conservan su ubicación al pie de su sección en todo ancho.

**Norma de diseño aplicada, no brecha.** El punto de quiebre principal alrededor de 768 px y el piso de 320 px sin desplazamiento horizontal los declara `Design-Rules-Web-Generico.md` §8, y esta superficie los aplica. Lo único delegado son los **anchos de verificación**: en cuáles comprueba la etapa `b` el comportamiento y lo registra en su informe de cierre, según `Compatibilidad-Plataformas.md` §4. La brecha `B-UX-15`, que declaraba ausente la norma, se retiró por falsa; ver [`Experiencia-De-Uso.md`](../Experiencia-De-Uso.md) §10.2.1.

---

## 7. Notas de implementación

**Accesibilidad.**

- Cada sección es una región con nombre accesible.
- La advertencia del rango se asocia a los campos que condiciona, para que se anuncie antes del intento.
- El mensaje de error de dirección **indica la siguiente libre sugerida**, no sólo que la dirección es inválida.
- El detalle de diagnóstico es un disclosure operable por teclado que **declara su estado de apertura**.
- La confirmación de copiado —tanto la del valor de la credencial como la del diagnóstico— se anuncia como región activa.
- El sello cumple contraste 4.5:1 pese a su jerarquía tipográfica baja.
- La acción de revocar lleva etiqueta accesible que nombra la credencial y el efecto inmediato.
- Los ámbitos se presentan con etiqueta textual, no sólo con distintivo de color.

**Performance percibida.** Ninguna sección de esta superficie exige operación sobre el motor de contenedores: son lecturas y escrituras del registro, por debajo del umbral que exige esqueleto.

**Internacionalización.** Direcciones, subredes, nombres de interfaz, prefijos de credencial y ámbitos se muestran literales. Las vigencias y los últimos usos llevan formato de fecha con desplazamiento horario explícito; la antigüedad de la exportación se expresa en forma relativa.

---

## 8. Trazabilidad

| Dimensión | Referencia |
| --- | --- |
| Persona objetivo | Administrador único de la solución: [`Vision-Producto.md`](../../00-Contexto/Vision-Producto.md) §2.1 |
| CU origen | [CU-19](../../02-Especificacion-Funcional/Casos-De-Uso/CU-19-Rango-Gestionado-Y-Reserva-De-Direccion.md), [CU-32](../../02-Especificacion-Funcional/Casos-De-Uso/CU-32-Emision-Y-Revocacion-De-Credenciales-De-Maquina.md), [CU-12](../../02-Especificacion-Funcional/Casos-De-Uso/CU-12-Exportacion-Programada-A-Destino-Externo.md) |
| Reglas de negocio relevantes | RN-03, RN-06, RN-15, RN-16, RN-17, RN-18, RN-25 |
| Insumo del intake | §4 capacidades F-08, F-15, F-17; §17.P.5 ámbitos, vigencia y revocación; §17.P.11 decisiones DA-04, DA-07 y DA-08; anexos E-8, E-12, E-18 |
| Marco de experiencia aplicado | [`Experiencia-De-Uso.md`](../Experiencia-De-Uso.md) §1.4 los ámbitos no son roles, §2.5 frontera aplicación y entorno, §4.4 sello de identidad de versión |
| Representaciones que invoca | [`Representacion-Sello-De-Version.md`](../Representaciones/Representacion-Sello-De-Version.md) |
| Catálogo de diseño aplicado | `Design-Rules-Web-Generico.md` §3.2, §4.3, §4.4, §4.6, §4.9, §5; `Design-Rules-Config-Esquema.md` §2, §2.1, §4.1, §4.2, §4.3, §5, §8; `Design-Rules-Identidad-De-Version.md` §4.1, §4.2, §4.3, §4.4, §4.5, §5, §8; `Design-Rules-Blazor-Mudblazor.md` §4.1 y §4.2 |
| US a generar en 06 | US-CU-19-1 a US-CU-19-4, US-CU-32-1 a US-CU-32-3, US-CU-12-1 a US-CU-12-3, provisionales |
| Tests previstos en 08 | Snapshot de los veinte estados declarados; verificación de que el valor de una credencial se muestra una única vez y de que sólo se persiste su resumen; verificación de que ningún parámetro de entorno se renderiza; verificación del contraste del sello y del anuncio del copiado |
| Brechas que declara | `B-UX-06`, prefijo de nombre reservado sin clasificar; `B-UX-07`, contrato de identidad de versión; `B-UX-16`, destino y periodicidad del respaldo (B-10 de `02-Especificacion-Funcional`). Recoge además B-17 de `02-Especificacion-Funcional`, sobre purga de reservas inactivas y retención de auditoría |
| Maqueta de la Fase B2 | Nombre canónico `Configuración del sistema`. Veinte estados declarados en §5, de los cuales dieciocho son demostrables: las filas marcadas no aplicable no se maquetan |
| Fuente de la correspondencia | La fila «CU origen» reproduce la fila de esta superficie en [`Experiencia-De-Uso.md`](../Experiencia-De-Uso.md) §9.2, que es la **fuente única** de la correspondencia entre superficie y caso de uso. Se reproduce, y no se referencia, porque `Rules-UX-UI-DX.md` §4.2.1 punto 8 la exige como sección obligatoria del wireframe |

---

## 9. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 1.0 | 2026-07-29 | Versión inicial. Especifica las cinco secciones que el anexo E-18 declara para esta ruta, más la sección de identidad de la instancia que aloja la segunda ubicación obligatoria del sello y el detalle de diagnóstico; hace visible la frontera entre configuración de aplicación y de entorno enumerando qué parámetros **no** se dibujan y por qué, incluida la regla ante la duda; declara las cuatro consecuencias de diseño de que la credencial se muestre una única vez, y que los ámbitos no son roles del administrador; declara veinte estados; declara las brechas `B-UX-06`, `B-UX-07` y `B-UX-16` |
| 1.0 | 2026-07-29 | Corrección del audit de la Fase B, absorbida dentro de la versión de emisión, sin subir versión y sin archivar, por la política de versionado de `Master-Prompt.md` §5: el documento está en estado `Propuesto` y la corrección proviene del audit de su propia fase. **H-06, P1:** Se suma a §8 la fila que declara la fuente única de la correspondencia entre superficie y caso de uso. **Brecha `B-UX-15` retirada por falsa:** §6 deja de declarar ausente el punto de quiebre y cita la norma que `Design-Rules-Web-Generico.md` §8 sí declara, acotando lo delegado a los anchos de verificación de la etapa `b`. Origen: informe [`Audit/B-02-03-r1.md`](../../Audit/B-02-03-r1.md) |
