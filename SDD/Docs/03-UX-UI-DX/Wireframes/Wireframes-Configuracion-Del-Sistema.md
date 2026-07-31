# Wireframes — Configuración del sistema

**Proyecto de código:** SelfHosted-Service
**Producto:** SelfHosted Service
**Documento:** Wireframes-Configuracion-Del-Sistema.md
**Versión:** 2.1
**Estado:** Propuesto
**Fecha:** 2026-07-30
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
  - [3.4 Los dos descriptores del umbral de la sugerencia de limpieza](#34-los-dos-descriptores-del-umbral-de-la-sugerencia-de-limpieza)
- [4. Interacciones](#4-interacciones)
- [5. Estados](#5-estados)
- [6. Versión responsive](#6-versión-responsive)
- [7. Notas de implementación](#7-notas-de-implementación)
- [8. Trazabilidad](#8-trazabilidad)
- [9. Control de cambios](#9-control-de-cambios)

---

## 1. Pantalla y propósito

**Nombre canónico de la superficie: `Configuración del sistema`** (`SUP-12`).

Es donde vive lo que la instancia gobierna por encima de cualquier proyecto SelfHosted: el rango de direcciones gestionado, las credenciales de máquina, el respaldo programado, la retención del historial y —desde el 2026-07-30— el **umbral de la sugerencia de limpieza de imágenes**. Corresponde a la ruta `/configuracion` del mapa de navegación del anexo E-18, que la declara con esos contenidos.

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
|         |  | Sugerencia de limpieza de imagenes                       |
|         |  | Espacio recuperable minimo [    ] <unidad>               |
|         |  | Ocupacion del almacen a partir de [    ] <unidad>        |
|         |  | <en palabras: se sugiere limpiar cuando se puedan        |
|         |  |  liberar al menos X y el almacen supere Y>               |
|         |  ---------------------------------------------------------  |
|         |  | Acerca de esta instancia                                 |
|         |  | <version legible>  [preliminar]     > Diagnostico        |
|         |  ---------------------------------------------------------  |
+---------+-------------------------------------------------------------+
```

**Seis secciones**, dentro del rango de cinco a siete que la ley de Miller admite y **en su límite superior**. Cada una con su barra de acento, su título y su subtítulo descriptivo. La sexta se incorporó el 2026-07-30 con el umbral de la sugerencia de limpieza; **agregar una séptima exigiría subdividir**, con el mismo criterio con el que [`Experiencia-De-Uso.md`](../Experiencia-De-Uso.md) §2.3 lo declara para las pestañas del panel lateral del servicio.

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
| Sección de umbral de la sugerencia de limpieza | Gobierna **cuándo** el sistema propone limpiar imágenes | Los dos descriptores del umbral, más su explicación en palabras | Ver §3.4 |
| Sección de identidad de la instancia | Aloja el sello y el detalle de diagnóstico | Ver [`Representacion-Sello-De-Version.md`](../Representaciones/Representacion-Sello-De-Version.md) | Ver §3.3 |

### 3.1 La frontera de configuración, hecha visible

`Design-Rules-Config-Esquema.md` §2.1 exige que ningún parámetro que la superficie no gobierna se dibuje acá, **ni siquiera deshabilitado**: mostrar un control que no manda es peor que no mostrarlo, porque el administrador cree haber configurado algo que sigue igual.

Los parámetros de entorno de este producto, que **no se dibujan**: la clave de firma de las credenciales y la clave de la instancia, la ubicación del archivo de la base de datos, el directorio de datos de trabajo y la ruta del punto de acceso del motor de contenedores. Los cuatro se fijan al desplegar la instancia y se documentan en `09-Devops`.

Un caso queda sin clasificar por ninguna fuente —el prefijo de nombre reservado de los contenedores que el producto gobierna— y por eso **tampoco se dibuja** hasta que la brecha `B-UX-06` se resuelva. La regla ante la duda es no renderizar: dibujar un control que quizá no manda tiene peor consecuencia que omitir uno que sí mandaría.

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

Los cuatro campos del contrato no están declarados por ninguna fuente de este producto: es la brecha `B-UX-07`. Este wireframe declara la ranura, las filas de clave y valor y la acción de copiado, y **no inventa los campos ni su origen**.

### 3.4 Los dos descriptores del umbral de la sugerencia de limpieza

**Sección incorporada el 2026-07-30 por la decisión `Q-17`.** La limpieza de imágenes es **sugerida**: el sistema detecta espacio recuperable y lo propone, el administrador confirma. [`Wireframes-Imagenes.md`](Wireframes-Imagenes.md) §3.5 declara la **forma** del umbral y establece que **no se escribe en la pantalla**: es un descriptor de parámetro, la superficie lo lee y no lo inventa, y su valor vive acá. Esta sección es esa ubicación.

**Por qué acá y no en la superficie de imágenes.** Por el criterio que §3.1 ya aplica: lo que la instancia gobierna por encima de cualquier proyecto SelfHosted vive en esta superficie. El almacén de imágenes es **uno y compartido** —el mismo lo usan el producto, el parque no incorporado y el automatismo de integración continua—, de modo que su umbral no es de ningún proyecto. Es además vecino natural de la sección de retención: las dos acotan cuánto historial ocupa el servidor.

**Qué se configura.** Dos parámetros, que son las dos condiciones que el umbral conjuga:

| Descriptor | Qué gobierna | Campos del contrato del descriptor que sí están declarados | Lo que **no** está declarado |
| --- | --- | --- | --- |
| **Espacio recuperable mínimo** | Cuánto tendría que liberar la limpieza para que valga la pena proponerla. Se cuenta **sólo sobre lo administrado**, nunca sobre lo ajeno | Etiqueta, unidad de magnitud de disco, y la regla de cálculo: sólo lo administrado | **Valor por defecto y límites.** Brecha `B-UX-28` |
| **Ocupación del almacén a partir de la cual se sugiere** | Desde qué punto de llenado del almacén tiene sentido proponer una limpieza | Etiqueta, unidad, y la regla de que se evalúa junto con la anterior y no en su lugar | **Valor por defecto y límites.** Brecha `B-UX-28` |

**Cómo se presentan, y es lo que `Design-Rules-Config-Esquema.md` exige.**

1. **La ayuda contextual de cada campo sale del descriptor**, no escrita a mano en esta pantalla. Es el anti-patrón explícito de la extensión: un valor por defecto o una leyenda hardcodeados se desincronizan del descriptor y producen dos fuentes de verdad.
2. **La sección lleva su explicación en palabras**, generada por plantilla a partir de los dos descriptores y de sus valores, con la forma «se sugiere limpiar cuando se puedan liberar al menos ⟨X⟩ y el almacén supere ⟨Y⟩». **No se redacta a mano**: escrita a mano se desfasa del valor real, que es el otro anti-patrón de la extensión.
3. **La explicación declara la conjunción**, con esas palabras. Es el punto que el administrador necesita entender para que los dos números signifiquen algo: cada condición sola produce el defecto de la otra —proponer limpiezas que no liberan nada, o proponer en un servidor con disco de sobra—.
4. **Los dos campos son de aplicación y no de entorno**, por el criterio de §3.1: el administrador los gobierna desde el sistema y su efecto es visible en el sistema, en `SUP-18` y en `SUP-09`.

**Lo que esta sección no hace.**

- **No dispara la limpieza ni la propone.** Configura cuándo se propone. La propuesta y su confirmación viven en `SUP-18`, con la lista de imágenes delante.
- **No declara qué es descartable.** El cálculo del espacio recuperable depende del **criterio de descarte**, que ninguna fuente declara —brecha `B-26` de `02-Especificacion-Funcional`—. Esta sección gobierna el umbral, no la definición de lo que se cuenta.
- **No inventa los valores por defecto.** Es la brecha `B-UX-28`, y hasta que se cierre los dos campos se dibujan **con su descriptor completo y sin valor por defecto declarado**, que es distinto de dibujarlos con un número plausible. La regla es la misma que §3.3 aplica al contrato del sello: se declara la ranura y no se inventa el contenido.

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
| Declarar el umbral de la sugerencia de limpieza | Edición de la sección | Se persisten los dos parámetros y **la explicación en palabras se regenera** a partir de ellos. **No se dispara ninguna limpieza** | Sesión iniciada |
| Leer la explicación en palabras del umbral | Apertura de la sección | El sistema la compone por plantilla a partir de los dos descriptores y sus valores, declarando la **conjunción** de las dos condiciones | La sección está abierta |
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
| Umbral de la sugerencia declarado | Los dos parámetros tienen valor | Los dos campos con su ayuda contextual derivada del descriptor, más la explicación en palabras regenerada |
| Umbral de la sugerencia sin valor por defecto | Ninguna fuente declara el valor por defecto ni los límites de los dos parámetros | Los campos se dibujan **con su descriptor y sin valor por defecto declarado**, y la explicación en palabras declara el hueco en lugar de componer una frase con un número inventado. Ver la brecha `B-UX-28` |
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

- Las **seis** secciones son apiladas y reflúyen sin punto de quiebre propio.
- La explicación en palabras del umbral **no se trunca ni se colapsa al angostar**: es el único lugar donde los dos números significan algo junto.
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
| Persona objetivo | Administrador único del producto: [`Vision-Producto.md`](../../00-Contexto/Vision-Producto.md) §2.1 |
| CU origen | [CU-19](../../02-Especificacion-Funcional/Casos-De-Uso/CU-19-Rango-Gestionado-Y-Reserva-De-Direccion.md), [CU-32](../../02-Especificacion-Funcional/Casos-De-Uso/CU-32-Emision-Y-Revocacion-De-Credenciales-De-Maquina.md), [CU-12](../../02-Especificacion-Funcional/Casos-De-Uso/CU-12-Exportacion-Programada-A-Destino-Externo.md), [CU-37](../../02-Especificacion-Funcional/Casos-De-Uso/CU-37-Higiene-De-Imagenes.md) |
| Reglas de negocio relevantes | RN-03, RN-06, RN-15, RN-16, RN-17, RN-18, RN-25 |
| Insumo del intake | **v3.2.** §4 capacidades F-08, F-15, F-17; §17.P.5 ámbitos, vigencia y revocación; §17.P.11 decisiones DA-04, DA-07 y DA-08; §19, la decisión `Q-17` que hace sugerida la limpieza y delega su umbral en esta categoría; anexos E-8, E-12, E-18, **E-23** |
| Marco de experiencia aplicado | [`Experiencia-De-Uso.md`](../Experiencia-De-Uso.md) §1.4 los ámbitos no son roles, §2.5 frontera aplicación y entorno, §4.4 sello de identidad de versión |
| Representaciones que invoca | [`Representacion-Sello-De-Version.md`](../Representaciones/Representacion-Sello-De-Version.md) |
| Superficies con las que se coordina | [`SUP-18`](Wireframes-Imagenes.md), que **consume** los dos descriptores de §3.4 y declara la forma del umbral; [`SUP-09`](Wireframes-Tablero-De-Estado.md), donde la sugerencia aparece en su ubicación secundaria |
| Catálogo de diseño aplicado | `Design-Rules-Web-Generico.md` §3.2, §4.3, §4.4, §4.6, §4.9, §5; `Design-Rules-Config-Esquema.md` §2, §2.1, §4.1, §4.2, §4.3, §5, §8; `Design-Rules-Identidad-De-Version.md` §4.1, §4.2, §4.3, §4.4, §4.5, §5, §8; `Design-Rules-Blazor-Mudblazor.md` §4.1 y §4.2 |
| US a generar en 06 | US-CU-19-1 a US-CU-19-4, US-CU-32-1 a US-CU-32-3, US-CU-12-1 a US-CU-12-3, y `US-CU-37-6` en su parte de configuración, provisionales |
| Tests previstos en 08 | Snapshot de los **veintidós** estados declarados; verificación de que el valor de una credencial se muestra una única vez y de que sólo se persiste su resumen; verificación de que ningún parámetro de entorno se renderiza; verificación del contraste del sello y del anuncio del copiado; verificación de que la explicación en palabras del umbral **se genera por plantilla** y no está escrita en la vista; verificación de que la ayuda contextual de los dos campos del umbral **sale del descriptor** |
| Brechas que declara | `B-UX-06`, prefijo de nombre reservado sin clasificar; `B-UX-07`, contrato de identidad de versión; `B-UX-16`, destino y periodicidad del respaldo (B-10 de `02-Especificacion-Funcional`); **`B-UX-28`**, los valores por defecto y los límites de los dos descriptores del umbral de §3.4, que **no se completan**. Recoge además B-17 de `02-Especificacion-Funcional`, sobre purga de reservas inactivas y retención de auditoría, y `B-26` de esa misma categoría, el criterio de descarte del que depende el cálculo del espacio recuperable |
| Maqueta de la Fase B2 | Nombre canónico `Configuración del sistema`. **Ajustar**: se suma la sexta sección con los dos descriptores del umbral y sus dos estados. **Veintidós** estados declarados en §5, de los cuales **veinte** son demostrables: las filas marcadas no aplicable no se maquetan. Los dos campos se maquetan **sin valor por defecto**, que es lo que la brecha `B-UX-28` obliga |
| Fuente de la correspondencia | La fila «CU origen» reproduce la fila de esta superficie en [`Experiencia-De-Uso.md`](../Experiencia-De-Uso.md) §9.2, que es la **fuente única** de la correspondencia entre superficie y caso de uso. Se reproduce, y no se referencia, porque `Rules-UX-UI-DX.md` §4.2.1 punto 8 la exige como sección obligatoria del wireframe |

---

## 9. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 2.1 | 2026-07-30 | **Propagación de la retroalimentación del paso 6 de la Fase B2, por la decisión `Q-17`**: la limpieza de imágenes es **sugerida**, y el `PRODUCT-INTAKE-SelfHosted-Service` **v3.2** §19 delega en esta categoría **con qué umbral**. [`Wireframes-Imagenes.md`](Wireframes-Imagenes.md) §3.5 declaró que el umbral **no se escribe en la pantalla** sino que es un descriptor de parámetro cuyo valor vive en esta superficie; esta versión emite esa ubicación, y con eso se cierra la parte de la brecha `B-UX-30` que la nombraba. Sube **minor**: la frontera aplicación/entorno de §3.1, la regla de la credencial de un solo uso de §3.2, el sello y su diagnóstico de §3.3 y los veinte estados anteriores **no cambian de contenido**, y ninguna sección se renumera. **Una sección nueva, la sexta.** §1 la nombra, §2 la dibuja entre la retención del historial y la identidad de la instancia con su ancho ajustado al del resto del bloque, §3 suma su fila de componente, y **nueva §3.4** declara: **por qué vive acá y no en la superficie de imágenes** —el almacén es uno y compartido, de modo que su umbral no es de ningún proyecto, y es vecino natural de la retención—; **los dos descriptores** —espacio recuperable mínimo, contado **sólo sobre lo administrado**, y ocupación del almacén a partir de la cual se sugiere— con la columna de qué **sí** está declarado de su contrato y qué **no**; las **cuatro exigencias de presentación** que `Design-Rules-Config-Esquema.md` impone —ayuda contextual derivada del descriptor, explicación en palabras generada por plantilla y no escrita a mano, declaración explícita de la **conjunción**, y clasificación como configuración de aplicación—; y **tres cosas que la sección no hace**: no dispara ni propone la limpieza, no declara qué es descartable, y **no inventa los valores por defecto**. **La cuenta de secciones pasa de cinco a seis**, y §2 declara que queda **en el límite superior** de la ley de Miller y que una séptima exigiría subdividir. **§4** suma dos interacciones y pasa a **dieciséis**. **§5** suma dos estados y pasa a **veintidós**, veinte demostrables; uno de los dos es precisamente el de **umbral sin valor por defecto declarado**, que es el estado real mientras `B-UX-28` esté abierta. **§6** actualiza el conteo de secciones y declara que la explicación en palabras **no se trunca ni se colapsa al angostar**. **§8** suma `CU-37` a la fila de casos de uso, la fila de superficies con las que se coordina, dos verificaciones a los tests previstos, y declara **`B-UX-28`** entre sus brechas, recogiendo además `B-26` de `02-Especificacion-Funcional`. **Ningún valor numérico se completó**: los dos campos se dibujan con su descriptor y **sin valor por defecto**, que es distinto de dibujarlos con un número plausible, y es la misma regla que §3.3 aplica al contrato del sello. **Ninguna decisión abierta se cerró**: `B-UX-06`, `B-UX-07` y `B-UX-16` siguen como estaban. Ningún artefacto fuera de `03-UX-UI-DX` se tocó. La versión 2.0 queda archivada en [`_legacy/2026-07-30/Wireframes-Configuracion-Del-Sistema-v2.0.md`](_legacy/2026-07-30/Wireframes-Configuracion-Del-Sistema-v2.0.md), con su bloque de archivado antepuesto y su cuerpo sin modificar. Ninguna fila anterior de este control de cambios se reescribió (`SDD-Development-Guide.md` §VI.2) |
| 2.0 | 2026-07-30 | **Migración normativa 4.1 → 6.0**, corte 4 de la fase M4, sobre el plan [`Plan-Migracion-4.1-a-6.0.md`](../../Audit/Plan-Migracion-4.1-a-6.0.md). Clasificación **regenerar contenido**, por el salto de `Rules-UX-UI-DX` 2.0 → 4.0. **Fuente de contenido: documento de origen**, más el [`PRODUCT-MANIFEST`](../../../Intake/PRODUCT-MANIFEST-SelfHosted-Service.md) §2 para el único campo de cabecera que se suma. Ni la frontera aplicación/entorno de §3.1, ni la regla de la credencial de un solo uso de §3.2, ni el sello y su diagnóstico de §3.3, ni las catorce interacciones, ni los veinte estados cambian de contenido: lo que cambia es la nomenclatura. Las nueve secciones obligatorias de `Rules-UX-UI-DX` 4.0 §4.2.1 ya estaban presentes y ninguna se agregó ni se reordenó. **Cabecera**: `**Proyecto:**` llevaba un valor del plano de negocio y pasa a `**Producto:**`, porque `Vocabulario-Rules.md` §3 prohíbe la etiqueta de un plano sobre el valor de otro; se suma `**Proyecto de código:** SelfHosted-Service`, que §4.1 de la regla vigente exige y que este documento no declaraba, con el valor **leído del manifiesto y no inferido**. **Vocabulario (`[5.0]`)**: «solución» pasa a «producto» en **4 ocurrencias** del referente de nivel superior —«Los parámetros de entorno de esta solución» y «los contenedores que la solución gobierna» en §3.1, «ninguna fuente de esta solución» en §3.3 y «Administrador único de la solución» en §8—, las cuatro con la concordancia de género corregida: «de esta solución» a «de este producto» y «la solución gobierna» a «el producto gobierna». Este documento **no tiene ninguna ocurrencia de «resolución»**, y se deja constancia del barrido. De las 9 ocurrencias de «proyecto», 1 era la etiqueta de cabecera, **6 llevan la forma calificada «proyecto SelfHosted»** y no se tocaron por designar la entidad del dominio, y **2 están dentro del bloque ASCII de §2** —la cabecera de columna `Proyecto` de la tabla de reservas y «por proyecto» en la sección de respaldo—, que tampoco se tocaron: designan la entidad del dominio y además sustituirlas alteraría el ancho de la caja, que es significativo. **Ninguna ocurrencia se promovió a «proyecto de código».** La sustitución se hizo por el procedimiento por ocurrencia de `Vocabulario-Rules.md` §9.5 y **nunca por reemplazo global de cadena**. El bloque ASCII de §2 **conserva su ancho intacto**. Los nombres canónicos de superficie —`SUP-12` y `Configuración del sistema`— se conservan textualmente, porque `Deriva-Rules.md` exige que coincidan término por término con la línea de base visual. **Glosario (`[5.1]`)**: `Glosario-UX.md` pasa de recomendado a obligatorio para los ocho tipos D8 y §6 verifica ahora su existencia y su completitud además de la no duplicación; lo emite un lote posterior de esta migración, y los términos que este wireframe acuña —frontera entre configuración de aplicación y de entorno, vista de un solo uso, sello de versión, detalle de diagnóstico, disclosure— se devolvieron para que ese lote los consuma sin redefinir los que ya están en `Glosario-Funcional.md` de 02, en particular rango gestionado, reserva de dirección, resumen del token y ámbito. Ninguna fila anterior de este control de cambios se reescribió (`SDD-Development-Guide.md` §VI.2) y el bloque de procedencia del destino no se tocó: sigue declarando 4.1, y cerrarlo es trabajo de M5 |
| 1.0 | 2026-07-29 | Versión inicial. Especifica las cinco secciones que el anexo E-18 declara para esta ruta, más la sección de identidad de la instancia que aloja la segunda ubicación obligatoria del sello y el detalle de diagnóstico; hace visible la frontera entre configuración de aplicación y de entorno enumerando qué parámetros **no** se dibujan y por qué, incluida la regla ante la duda; declara las cuatro consecuencias de diseño de que la credencial se muestre una única vez, y que los ámbitos no son roles del administrador; declara veinte estados; declara las brechas `B-UX-06`, `B-UX-07` y `B-UX-16` |
| 1.0 | 2026-07-29 | Corrección del audit de la Fase B, absorbida dentro de la versión de emisión, sin subir versión y sin archivar, por la política de versionado de `Master-Prompt.md` §5: el documento está en estado `Propuesto` y la corrección proviene del audit de su propia fase. **H-06, P1:** Se suma a §8 la fila que declara la fuente única de la correspondencia entre superficie y caso de uso. **Brecha `B-UX-15` retirada por falsa:** §6 deja de declarar ausente el punto de quiebre y cita la norma que `Design-Rules-Web-Generico.md` §8 sí declara, acotando lo delegado a los anchos de verificación de la etapa `b`. Origen: informe [`Audit/B-02-03-r1.md`](../../Audit/B-02-03-r1.md) |
