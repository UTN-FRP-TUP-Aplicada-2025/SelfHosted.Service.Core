# CU-03 — Alta y configuración completa de un servicio

**Proyecto de código:** SelfHosted-Service
**Producto:** SelfHosted Service
**Documento:** CU-03-Alta-Y-Configuracion-De-Servicio.md
**Versión:** 3.3
**Estado:** Propuesto
**Fecha:** 2026-08-02
**Autor:** Analista Funcional Senior (AG-02)

**Necesidad de negocio upstream:** [NB-01](../../01-Necesidades-Negocio/Necesidades-De-Negocio/NB-01-Visibilidad-Unificada-De-La-Arquitectura.md)
**Trazabilidad upstream:** **el intake vigente es v3.7**, verificado en el campo `Versión` de su cabecera el 2026-08-02. **Todo el contenido que este caso de uso incorpora de la ronda del 2026-07-31 y del 2026-08-01 entró en la v3.4**, y se cita por esa versión en el cuerpo y en el control de cambios porque es la que permite localizarlo en el snapshot [`_legacy/2026-08-01/PRODUCT-INTAKE-SelfHosted-Service-v3.4.md`](../../../Intake/_legacy/2026-08-01/PRODUCT-INTAKE-SelfHosted-Service-v3.4.md), según el criterio de cita de versión de [`Especificacion-Funcional.md`](../Especificacion-Funcional.md) §8. **Secciones y anexos consumidos:** §4 capacidad F-03, su **nota de los dos ejes del alta**, la nota del **tercer eje y el alta unificada** y la nota de **construir la imagen contra crear el contenedor**; §4 capacidad `F-10` **acotada**; anexo E-2 §20.2.3 (las **seis** variantes discriminadas de origen, con `imagen-local` incorporada el 2026-07-31, el comando de arranque, el estado del servicio, y los dos informes de verificación de §20.2.5); anexo E-19 (los patrones del parque real que el alta debe soportar); anexo E-15, endpoints de alta y edición de servicio; E-16 RN-01, RN-02, RN-06, RN-07, RN-08, RN-10, RN-19, RN-28, RN-32, RN-38

---

## Tabla de contenido

- [1. Propósito](#1-propósito)
- [2. Actores](#2-actores)
- [3. Precondiciones](#3-precondiciones)
- [4. Flujo principal](#4-flujo-principal)
- [5. Flujos alternativos](#5-flujos-alternativos)
- [6. Excepciones y errores](#6-excepciones-y-errores)
- [7. Postcondiciones](#7-postcondiciones)
- [8. Criterios de aceptación](#8-criterios-de-aceptación)
- [9. Trazabilidad](#9-trazabilidad)
- [10. Notas y supuestos](#10-notas-y-supuestos)
- [11. Control de cambios](#11-control-de-cambios)
- [13. Interacción multiusuario y concurrencia](#13-interacción-multiusuario-y-concurrencia)

---

## 1. Propósito

Permitir que el administrador declare un servicio dentro de un proyecto SelfHosted con todas las dimensiones que el parque real exige —origen, comando de arranque, red, variables, puertos, montajes, dispositivos, capacidades, recursos, política de reinicio, verificación de salud y marca de efímero—, de modo que el alta deje de ser un ejercicio de copiar y adaptar un archivo suelto.

**El alta es una sola entrada y de dónde sale la imagen es un campo.** Desde el 2026-07-31 no hay menú de vías: el administrador abre el alta, declara el nombre y elige el **valor del campo de origen** entre los que la interfaz produce. Es la decisión del agente humano del proyecto que el intake v3.4 consolida en §4, y **es lo contrario de lo que la versión 3.2 de este documento declaraba**: la premisa —imagen pública y privada difieren en dos campos y no en su naturaleza— no cambió; lo que cambió es la consecuencia que se saca de ella, que pasó de separarlas en la interfaz a unificarlas.

## 2. Actores

| Actor | Tipo | Rol |
| --- | --- | --- |
| Administrador del producto | Primario | Declara y edita la configuración del servicio, incluido el valor de su campo de origen |
| Registro del producto | Sistema | Valida las reglas de nombre, red, puertos, recursos y variables, y persiste la configuración en cualquier estado |
| Verificador de origen | Sistema | Consulta el sistema externo que el valor de origen determine, o el almacén local cuando el origen es `imagen-local`, y emite el informe de verificación del origen |

Los nombres de los actores no humanos son **denominaciones acuñadas por esta categoría**, salvo los seis que trazan a una fuente: `Motor de contenedores`, `Destino externo`, `Automatismo de integración continua`, `Sincronizador de estado`, `Módulo de descubrimiento` y `Resolutor de referencias`. Los acuñados no son componentes declarados y no condicionan la descomposición: su correspondencia con los módulos que el intake §17.P.2 sí declara la fija 05-Arquitectura-Tecnica. La convención completa, nombre por nombre, está en [Especificacion-Funcional.md](../Especificacion-Funcional.md) §8.

## 3. Precondiciones

- Existe el proyecto SelfHosted en el que se declara el servicio (CU-01).
- El administrador tiene sesión iniciada (CU-30).

## 4. Flujo principal

**Los diez pasos son el tronco único del alta.** Sólo los pasos 4 y 5 cambian según el **valor del campo de origen**; los otros ocho son idénticos para los tres valores que la interfaz produce.

1. El administrador solicita agregar un servicio al proyecto SelfHosted abierto.
2. El sistema abre el alta. **Es una sola entrada y no un menú de alternativas**, y **el servicio existe como borrador desde ese momento**, visible en el lienzo.
3. El administrador declara el nombre del servicio, que es también su alias de resolución de nombres dentro de la red del proyecto (RN-01).
4. **El administrador declara el origen eligiendo el valor del campo.** Lo que cada valor exige está en la tabla de FA-01. El origen queda como una de las **seis** variantes discriminadas que el anexo E-2 §20.2.3 declara, y cada variante exige sus datos y ninguno de otra variante (RN-08). **En el valor de imagen de registro este paso tiene un punto de entrada alternativo: explorar el registro de imágenes configurado** y volver con el origen declarado, en lugar de escribir la dirección de memoria (CU-39). Es la decisión `Q-27`, cerrada el 2026-07-30.
5. **El sistema verifica el origen** contra el sistema externo que el valor determine —o contra el almacén local cuando el origen es `imagen-local`—, y emite el **informe de verificación del origen**, que declara qué consultó y con qué identidad. El informe distingue «el dato es incorrecto» de «no pude consultar», porque la acción del usuario es distinta: corregir contra reintentar.
6. El administrador declara el modo de red del servicio y, si corresponde, su dirección fija y su interfaz padre (RN-06).
7. El administrador declara los puertos, gateados por el modo de red (RN-07, RN-38).
8. El administrador declara variables, montajes, dispositivos, capacidades, límites de procesador y memoria, política de reinicio, verificación de salud, marca de efímero y **comando de arranque**.
9. El administrador confirma, y el sistema **valida la configuración completa** emitiendo el **informe de validación de la configuración**: el nombre (RN-01), la pertenencia al proyecto (RN-02), la dirección declarada (RN-06), la compatibilidad de puertos con el modo de red (RN-07), la unicidad del puerto publicado en el host (RN-38), los datos del origen según su variante (RN-08), los límites contra los recursos del host (RN-19) y las claves de las variables (RN-28, RN-32). El informe declara su propio alcance, incluido contra qué **no** verificó.
10. Con las dos verificaciones en verde, el servicio pasa a **pendiente de aplicar** y entra al conjunto de cambios pendientes del proyecto. El sistema registra el evento de auditoría (RN-17).

**Los tres estados del servicio, y por qué el guardado es transversal.** El servicio tiene estado propio —`borrador`, `pendiente-de-aplicar` o `aplicado`—, **ortogonal al estado del despliegue**. En cualquier punto entre los pasos 2 y 9 el administrador puede **guardar**, y el servicio queda en `borrador`: visible en el lienzo, incompleto de forma visible, y **fuera del conjunto de cambios pendientes**. Sólo el paso 10, con las dos verificaciones en verde, lo pasa a `pendiente-de-aplicar`. Es lo que hace utilizable guardar a mitad de camino: sin el estado borrador, guardar incompleto metería un servicio inaplicable en el conjunto de cambios.

**Las dos verificaciones no bloquean guardar; sí bloquean entrar al conjunto de cambios.** Son operaciones distintas, con informes distintos y momentos distintos: la del origen consulta un sistema externo, la de la configuración verifica contra el registro del sistema y contra el motor de contenedores.

## 5. Flujos alternativos

**FA-01 — El delta de cada valor del campo de origen.**
Disparador: en el paso 4 el administrador elige uno de los tres valores que la interfaz ofrece.
Pasos: cambian los pasos 4 y 5 según esta tabla, y el resto del tronco sigue igual.

| Valor del campo de origen | Paso 4 · qué se declara | Paso 5 · qué verifica la verificación del origen | Variante de origen resultante |
| --- | --- | --- | --- |
| **Imagen de registro** | Imagen, etiqueta y política de actualización, con el registro público de referencia ya puesto. Si el registro exige autenticarse, se declara además su **dirección** y la **credencial de registro**. **Se pueden escribir o traer explorando el registro configurado** (CU-39) | Que la imagen y la etiqueta existan y, cuando hay credencial, que la credencial autentique; devuelve el **digesto** | `imagen-publica` o `imagen-privada`, **derivada** de si se declaró credencial |
| **Imagen del almacén local** | Se elige una imagen que ya vive en el almacén local, identificada por su **digesto** y con su referencia legible. **No admite política flotante** | Que el digesto siga existiendo en el almacén local. No hay sistema externo que consultar | `imagen-local`. Marca el servicio como **no reproducible** |
| **Archivo de construcción en línea** | El **contenido** del archivo de construcción y los argumentos de construcción | Que el contenido sea interpretable y **no contenga instrucciones de copia local**, que sin contexto de construcción fallarían | `dockerfile` |

Punto de retorno: paso 6.

**El servicio sin origen no es un cuarto valor:** es el tronco detenido en el paso 3, y es lo que guardar ahí produce. La variante `ninguno` existe en el modelo y **no se elige**: se obtiene.

**La variante `repositorio` sigue en el modelo y la interfaz no la produce.** `F-10` se acotó el 2026-08-01: se le retiró la construcción desde repositorio remoto, porque clonar y compilar en el servidor de referencia duplica lo que hace el ejecutor de integración continua. **RN-08 conserva su fila** y el esquema conserva la variante, de modo que un servicio de origen `repositorio` sigue siendo representable; lo que deja de existir es el camino de usuario que lo produzca. Si alguna vez se ofrece, este paso 4 vuelve a tener un valor más y las pendientes `Q-5`, `Q-7` y `Q-8` se reabren.

**Adoptar un contenedor existente y tomar un ítem del catálogo salieron del alta.** No son formularios sino **listados donde se elige**, y tienen superficie propia: son acciones de esas superficies y no valores de este campo. Los flujos no cambian —[CU-07](CU-07-Incorporacion-Con-Confirmacion-Explicita.md) y [CU-16](CU-16-Alta-Desde-Plantilla-Del-Catalogo.md) siguen siendo los que crean el servicio— y lo que cambia es desde dónde se llega. Las dos siguen dejando huella en la **procedencia** del servicio y ninguna de las dos tiene origen propio: producen uno de los otros.

**Explorar tampoco es un valor del campo.** La exploración de CU-39 es un **punto de entrada al paso 4** del valor de imagen de registro: no cambia la variante resultante, no agrega una y no deja huella en la procedencia.

**FA-01-bis — El tercer eje: quién dispara el despliegue.**
Disparador: el servicio ya declarado se despliega.
Pasos: el disparador es **independiente del origen** y de cómo se llegó al alta, y tiene tres valores —el administrador sobre un servicio, el orquestador del proyecto dentro de la aplicación en lote, o un automatismo externo con credencial de ámbito mínimo—. Un servicio de cualquier origen puede desplegarse por los tres, incluso en la vida del mismo servicio. **Este caso de uso no lo declara**: lo declara el despliegue, en el atributo de solicitante que el modelo conceptual registra, y lo consumen [CU-13](CU-13-Despliegue-Desde-Imagen-De-Registro.md), [CU-18](CU-18-Arranque-Y-Parada-Con-Autoarranque.md), [CU-24](CU-24-Aplicacion-En-Lote.md) y [CU-33](CU-33-Disparo-De-Despliegue-Con-Credencial-De-Ambito-Minimo.md). Lo que sí es de este caso de uso es el **bloque de disparo externo** del servicio, que es propiedad transversal y no un origen: cualquier variante puede tenerlo.
Punto de retorno: no aplica; es una declaración de alcance y no un desvío del tronco.

**FA-02 — Guardado incompleto en cualquier punto.**
Disparador: el administrador guarda antes de completar la configuración, en cualquier punto entre los pasos 2 y 9.
Pasos: el sistema persiste lo declarado, el servicio queda en `borrador`, aparece en el lienzo marcado como incompleto, y **no entra al conjunto de cambios pendientes**. Ninguna validación bloquea el guardado; las que fallen quedan declaradas en el informe correspondiente para que el administrador sepa qué falta.
Punto de retorno: el lienzo del proyecto SelfHosted. El administrador puede retomar el alta desde donde la dejó.

**FA-03 — Fallo de la verificación del origen: el dato es incorrecto.**
Disparador: en el paso 5 el sistema consulta el sistema externo y éste responde que lo declarado no existe.
Pasos: el informe declara resultado fallido con clase «dato incorrecto» y acción sugerida **corregir el dato**, con el detalle de qué comprobación falló y, cuando el sistema externo lo permite, con valores similares al declarado. El servicio queda en `borrador` y **no** pasa a pendiente de aplicar.
Punto de retorno: paso 4, para corregir el dato.

**FA-04 — Fallo de la verificación del origen: no se pudo consultar.**
Disparador: en el paso 5 el sistema externo no responde.
Pasos: el informe declara resultado **indeterminado** con clase «consulta imposible» y acción sugerida **reintentar**. Es un fallo distinto de FA-03 y se presenta distinto: no hay ningún dato que corregir. El servicio queda en `borrador`.
Punto de retorno: paso 5, para reintentar.

**FA-05 — Edición y configuración de un servicio ya declarado.**
Disparador: el administrador modifica un servicio existente en lugar de crear uno nuevo.
Pasos: se repiten los **pasos 6 a 10** sobre el servicio elegido —el tronco reentrado desde el modo de red—; el cambio entra al conjunto de cambios pendientes y marca el servicio como pendiente de redespliegue. **La reentrada no pasa por los pasos 2 a 5**: no se vuelve a declarar el origen y no se vuelve a verificar. La única verificación que corre es la de la configuración.

**El origen queda en modo lectura, y es una brecha declarada y no una decisión de esta categoría.** No hay hoy ningún camino para cambiarle el origen a un servicio existente: pasar de imagen de registro a imagen del almacén local, o **corregir una etiqueta mal escrita**, no tiene flujo. **La sexta variante le agrega un caso con consecuencia visible**: el camino de pago que el intake declara para retirar la marca de no reproducible —publicar la imagen en un registro y pasar a un origen de registro— **es exactamente un cambio de origen**, de modo que mientras `Q-28` esté abierta ese camino no tiene flujo de usuario. El intake lo registra como la pendiente `Q-28` de §19, abierta y sin propuesta. Destinatario: agente humano del proyecto. Ver §10.

**El sistema declara, por cada cambio, si recrea el contenedor o no.** Es lo que el administrador necesita saber **antes** de aplicar, porque recrear es lo que le hace perder el estado no persistido:

| Clase de cambio | Ejemplos | Consecuencia |
| --- | --- | --- |
| Cosmético | Posición en el lienzo, notas | Ninguna. RN-12 los excluye del conjunto de cambios |
| De configuración, **sin** recrear | Política de reinicio, límites de recursos, verificación de salud, réplicas | Entra al conjunto de cambios y marca pendiente de redespliegue |
| De configuración, **recreando** | Variables, puertos, montajes, dispositivos, modo de red, dirección, comando de arranque | Igual, y además el contenedor **se recrea**: es el motor de contenedores el que no admite cambiarlos en caliente |
| De identidad | Nombre del servicio | RN-01 valida unicidad y formato. RN-33 garantiza que ninguna referencia se rompe. El alias de resolución de nombres sí cambia |
| De origen | Imagen, etiqueta, rama, contenido del archivo de construcción, política de actualización | **Sin camino declarado.** Es `Q-28` |
| Destructivo | Eliminar el servicio | RN-10 exige confirmación escrita. RN-09 conserva volúmenes y montajes al detener, no al eliminar |

Punto de retorno: paso 10.

**FA-06 — Eliminación del servicio.**
Disparador: el administrador solicita eliminar un servicio declarado.
Pasos: el sistema pide confirmación escribiendo el nombre del servicio y ofrece conservar los volúmenes (RN-10).
Punto de retorno: el lienzo del proyecto SelfHosted.

## 6. Excepciones y errores

| Código | Causa | Respuesta del sistema |
| --- | --- | --- |
| `422` sobre el nombre | Nombre con mayúsculas, espacios, más de 32 caracteres o duplicado dentro del proyecto | Rechazo con el campo del nombre señalado (RN-01) |
| `409` de pertenencia | El servicio ya pertenece a otro proyecto SelfHosted | Rechazo (RN-02) |
| `422` de dirección | Dirección fuera del rango gestionado o declarada excluida | Rechazo con la siguiente dirección libre sugerida (RN-06) |
| `422` de puerto en macvlan | Se declara un puerto publicado sobre un servicio en macvlan | Rechazo; en la interfaz el campo aparece deshabilitado (RN-07) |
| `422` de puerto de host ocupado | Se declara un puerto de host que ya publica otro servicio, aplicado o pendiente de aplicar, o un contenedor del parque | Rechazo con el servicio y el proyecto que lo ocupan, y el próximo puerto libre sugerido (RN-38) |
| `422` de datos del origen | Falta un dato que la variante de origen exige, o se declara un campo que pertenece a otra variante | Rechazo distinguiendo las dos causas, porque la acción del usuario es distinta (RN-08) |
| `422` de límite | El límite de memoria o de procesador excede los recursos declarados del host | Rechazo con el máximo admisible (RN-19) |
| `422` de clave de variable | Clave duplicada dentro del mismo servicio, o clave con el prefijo reservado del sistema | Rechazo (RN-28, RN-32) |
| **Informe fallido**, sin código de rechazo | La verificación del origen determina que el dato declarado no existe en el sistema externo | **No es un rechazo de la operación:** el servicio se guarda en `borrador` y el informe declara la clase de fallo y la acción sugerida (FA-03) |
| **Informe indeterminado**, sin código de rechazo | El sistema externo no responde | Igual que el anterior, con clase «consulta imposible» y acción sugerida reintentar (FA-04) |

**Por qué los dos últimos no son códigos de rechazo.** Un fallo de verificación **no invalida la configuración declarada**: la deja sin confirmar. Devolver un `422` haría perder lo que el administrador escribió, que es exactamente lo que el estado borrador existe para evitar.

## 7. Postcondiciones

**En caso de éxito:** el servicio queda declarado dentro de su proyecto SelfHosted con las dimensiones que el administrador definió y con su origen en una de las **seis** variantes; **si el origen es `imagen-local`, el servicio queda marcado como no reproducible**, atributo derivado del origen y no editable; existen los dos informes de verificación con su alcance declarado; el servicio está en estado `pendiente-de-aplicar`; el cambio figura en el conjunto de cambios pendientes; el nodo aparece en el lienzo en modo pendiente; existe el evento de auditoría.

**En caso de guardado incompleto:** el servicio queda en estado `borrador`, con lo declarado hasta ese punto persistido, visible en el lienzo como incompleto y **fuera** del conjunto de cambios pendientes. No hay evento de aplicación, y sí de escritura (RN-17).

**En caso de fallo de validación:** no se persiste ninguna configuración parcial **que el administrador no haya pedido guardar**; el proyecto SelfHosted queda como estaba y el rechazo identifica el campo y la regla que lo produjo.

## 8. Criterios de aceptación

| ID | Given | When | Then |
| --- | --- | --- | --- |
| CA-01 | Un proyecto SelfHosted sin ningún servicio llamado `print-server` | El administrador declara un servicio con nombre `print-server` | El sistema acepta el nombre y crea el servicio |
| CA-02 | El mismo proyecto, que ya tiene el servicio `print-server` | El administrador declara un segundo servicio `print-server` | El sistema rechaza con `422` señalando el nombre duplicado |
| CA-03 | Un servicio en macvlan con la dirección fija `192.168.1.139` | El administrador le agrega un puerto publicado en el host | El sistema rechaza con `422` y en la interfaz el campo aparece deshabilitado |
| CA-04 | Un host con 32 GB de memoria declarada | El administrador fija un límite de memoria de 64 GB para el servicio | El sistema rechaza con `422` e informa el máximo admisible |
| CA-05 | Un servicio con una variable declarada | El administrador declara en el mismo servicio una variable con clave `SELFHOSTED_HOST` | El sistema rechaza con `422`: el prefijo está reservado para las variables provistas por el sistema |
| CA-06 | Un proyecto SelfHosted abierto | El administrador solicita agregar un servicio | El sistema abre **una sola entrada de alta**, sin menú de vías, con el origen como **campo de tres valores**: imagen de registro, imagen del almacén local y archivo de construcción en línea |
| CA-07 | Un administrador que abrió el alta y declaró sólo el nombre | Guarda | El servicio queda en estado `borrador`, aparece en el lienzo marcado como incompleto y **no** figura en el conjunto de cambios pendientes |
| CA-08 | Un servicio con origen por imagen de registro público que declara una etiqueta que no existe en el registro | El administrador verifica el origen | El informe declara resultado fallido, clase «dato incorrecto» y acción sugerida corregir el dato, con la etiqueta similar que sí existe. El servicio **no** pasa a pendiente de aplicar y lo declarado no se pierde |
| CA-09 | El mismo servicio, con el registro de imágenes inalcanzable | El administrador verifica el origen | El informe declara resultado **indeterminado**, clase «consulta imposible» y acción sugerida reintentar. Es visiblemente distinto del caso anterior |
| CA-10 | Un servicio que declara publicar el puerto de host 6379, en un proyecto donde otro servicio ya lo publica | El administrador valida la configuración | El informe declara el hallazgo como **bloqueante**, con el servicio y el proyecto que lo ocupan (RN-38). El servicio se puede guardar y no puede pasar a pendiente de aplicar |
| CA-11 | Un servicio con origen por archivo de construcción en línea al que se le declara además una etiqueta de registro | El administrador confirma | El sistema rechaza con `422` por campo ajeno a la variante, con mensaje distinto del de campo faltante (RN-08) |
| CA-12 | Un servicio aplicado, con un contenedor corriendo | El administrador cambia su política de reinicio y, en otra operación, una de sus variables | El sistema declara que el primer cambio **no** recrea el contenedor y que el segundo **sí**, antes de aplicar |
| CA-13 | Un servicio aplicado | El administrador abre su configuración | El origen se presenta **en modo lectura**, y la ausencia de camino para cambiarlo está declarada como brecha `Q-28`, no resuelta en silencio |
| CA-14 | Un contenedor del parque real que corre con un comando de arranque propio | El administrador lo declara como servicio | El alta admite declarar el comando de arranque, y el servicio resultante lo conserva |
| CA-15 | Un administrador que eligió el valor de imagen de registro y **no conoce ninguna dirección de imagen** | Llega al paso 4 | El paso ofrece **explorar el registro configurado** (CU-39) además de escribir la dirección, y volver de la exploración deja el origen declarado sin saltear la verificación del paso 5 |
| CA-16 | Un administrador que declara el origen con registro, imagen y etiqueta y **sin credencial**, y otro que declara los mismos datos **con credencial de registro** | Los dos confirman | La variante queda **derivada**: `imagen-publica` en el primero y `imagen-privada` en el segundo. El administrador nunca eligió entre las dos |
| CA-17 | Una imagen que ya vive en el almacén local | El administrador la elige como origen del servicio | El origen queda como `imagen-local` con el **digesto** de esa imagen, el campo de política de actualización **no ofrece el valor flotante**, y el servicio queda marcado como **no reproducible** |
| CA-18 | Un servicio con origen `imagen-local`, marcado como no reproducible | El administrador intenta quitarle la marca de no reproducible | El sistema no lo admite: la marca es **derivada del origen y no editable**. La única forma de retirarla es publicar la imagen en un registro y pasar a un origen de registro |
| CA-19 | Un proyecto SelfHosted abierto | El administrador busca la construcción desde un repositorio remoto en el campo de origen | **No figura entre los valores ofrecidos.** La variante existe en el modelo y en RN-08, y ninguna superficie del producto la produce |

## 9. Trazabilidad

| Dimensión | Referencia |
| --- | --- |
| Necesidad de negocio | [NB-01](../../01-Necesidades-Negocio/Necesidades-De-Negocio/NB-01-Visibilidad-Unificada-De-La-Arquitectura.md) |
| Reglas de negocio aplicables | RN-01, RN-02, RN-06, RN-07, RN-08, RN-10, RN-12, RN-17, RN-19, RN-27, RN-28, RN-32, RN-33, RN-35, RN-38. Reglas conceptuales: RC-02, RC-03, RC-15, RC-16, RC-17, RC-19 |
| Historias de usuario a generar en 06 | US-CU-03-1 (declarar un servicio con su origen), US-CU-03-2 (declarar el modo de red y la dirección del servicio), US-CU-03-3 (declarar variables, montajes, dispositivos y límites), US-CU-03-4 (editar un servicio ya declarado), US-CU-03-5 (eliminar un servicio con confirmación escrita), US-CU-03-6 (dar de alta un servicio desde una sola entrada, con el origen como campo), US-CU-03-7 (guardar un servicio incompleto y retomarlo), US-CU-03-8 (verificar el origen y distinguir el dato incorrecto de la consulta imposible), US-CU-03-9 (declarar el comando de arranque), US-CU-03-10 (saber antes de aplicar si un cambio recrea el contenedor), US-CU-03-11 (llegar al origen explorando el registro de imágenes, sin conocer la dirección de la imagen), US-CU-03-12 (instanciar un servicio desde una imagen del almacén local), US-CU-03-13 (saber que un servicio con imagen del almacén local queda no reproducible) |
| Componentes esperados en 05 | Capa `Web`, controlador del recurso de servicios y panel lateral del servicio; capa `Application`, módulo de servicios y despliegues, con sus validadores y con el verificador de origen; capa `Domain`, agregado `Servicios`; capa `Infrastructure`, `Persistencia` y los adaptadores de consulta a registros de imágenes y a proveedores de repositorios. Referencia tentativa |
| Tests previstos en 08 | T-01, T-02, T-03, T-04 (nombre); T-08, T-09 (dirección); T-10 (puerto en macvlan); T-20 (límite); T-49 (prefijo reservado). Casos declarados en el anexo E-22. **Brecha**: el anexo no declara casos para las vías de alta, los dos informes de verificación, el estado borrador, el comando de arranque, RN-08 por variante ni RN-38 |

Los identificadores de historia de usuario llevan la forma `US-CU-XX-n` y son **provisionales**: la numeración definitiva es potestad de 06-Backlog-Tecnico. La forma se eligió para que ningún identificador emitido acá colisione con la numeración que 06 asigne.

## 10. Notas y supuestos

- El alta no puede limitarse a imagen, puertos y variables: el anexo E-19 declara los patrones del parque real que obligan a las dimensiones completas, y el anexo E-2 las refleja.
- **Los tres ejes, desde el 2026-07-31.** La **vía de alta** es cómo llega el usuario y **no se persiste**; el **origen** es qué queda declarado como fuente de la imagen y sí se persiste, como variante discriminada de seis valores; el **disparador del despliegue** es quién lo inicia, tiene tres valores —el administrador sobre un servicio, el orquestador del proyecto y un automatismo externo—, es **independiente de los otros dos** y queda registrado en el atributo de solicitante del despliegue. Confundir origen con disparador era lo que hacía que el menú anterior pareciera ofrecer «desplegar desde el ejecutor de integración continua» cuando en realidad ofrecía «de dónde sale la imagen». Ver FA-01-bis.
- **De siete vías a una sola entrada.** El eje de la vía de alta **no desaparece**: se vuelve trivial. La adopción y el catálogo salieron a sus propias superficies, el repositorio dejó de ofrecerse, las dos de imagen se fundieron en un valor con la variante derivada, y el servicio sin origen se reconoció como el formulario detenido en el nombre. Lo que queda son **tres valores de un campo**. **La decisión no retira nada del modelo**: las seis variantes siguen en RN-08 y en el esquema, y lo que cambia es cuáles produce la interfaz.
- **Lo que se pierde, declarado.** Quien no sabe qué quiere ya no ve las opciones juntas. Lo compensan el campo con el registro público de referencia ya puesto y la exploración de registro de CU-39.
- **Construir la imagen y crear el contenedor no son lo mismo.** **Crear el contenedor nunca sale del producto**: el panel lo hace siempre, en los seis orígenes, instanciando la imagen con la configuración del servicio —variables resueltas, dirección reservada, montajes, recursos—. Lo único que puede vivir afuera es **construir la imagen**, que en el modelo adoptado es trabajo del ejecutor de integración continua. Este caso de uso declara el origen de la imagen y nunca quién crea el contenedor, porque no hay alternativa que declarar.
- **El reparto de vías sobre variantes es decisión cerrada desde el 2026-07-30.** Eran las especificaciones de integración `DI-17`, `DI-18` y `DI-19` del intake §19 —la taxonomía de vías, la separación entre imagen de registro público y privado, y la existencia del servicio sin origen como nodo borrador—, aplicadas y **esperando confirmación**. El agente humano del proyecto las confirmó las tres: pasan de `[D-i]` revisable a **`[D]` cerrada**. La ronda del 2026-07-31 no las reabre: **conserva el modelo que `DI-18` fijó** —las dos variantes de imagen siguen existiendo y RN-08 las sigue validando— e **invierte su consecuencia de interfaz**, que pasa de separarlas a derivarlas de lo que el usuario declara.
- **`Q-5` queda sin objeto desde el 2026-08-01.** Preguntaba cómo se dispara automáticamente el origen por repositorio; retirada esa construcción de la interfaz, no hay disparo que decidir. **No se cierra como decidida**: queda sin objeto, y si alguna vez el repositorio vuelve a ofrecerse la pregunta se reabre.
- **`Q-7`, `Q-8`, `Q-12` y `Q-13` siguen abiertas.** Las dos primeras alcanzan a la variante `repositorio`, que sigue en el modelo sin interfaz que la produzca, de modo que su urgencia baja y su vigencia no. Las dos últimas alcanzan al archivo de construcción en línea, que **se conserva**. Destinatario: agente humano del proyecto.
- **Brecha declarada, `Q-28`:** no hay camino para cambiar el origen de un servicio existente. La reentrada de FA-05 arranca en el paso 6 y excluye el origen; corregir una etiqueta mal escrita no tiene flujo. **Sigue abierta**, y la exploración de CU-39 **no la resuelve**: explorar es un punto de entrada al alta, no un camino de edición del origen. Destinatario: agente humano del proyecto.
- **Brecha cerrada, `Q-27`: hay exploración de registro de imágenes.** La versión anterior declaraba que el producto no decía si existía alguna forma de explorar un registro, y que sin catálogo de fábrica un administrador que no sabía la dirección de la imagen no tenía camino en el primer minuto de uso. El agente humano del proyecto la decidió el 2026-07-30: **hay exploración**, y conocer la dirección deja de ser requisito. La capacidad vive en [CU-39](CU-39-Exploracion-Del-Registro-De-Imagenes.md) y entra a este caso de uso como **punto de entrada al paso 4** de las dos vías de imagen. La fila se conserva en lugar de borrarse porque otros artefactos citan el identificador. **La consecuencia declarada también quedó resuelta el mismo día**: la superficie nueva que `03-UX-UI-DX` debía especificar es `SUP-19`, y esa categoría la emitió —[`Wireframes-Exploracion-De-Registro-De-Imagenes.md`](../../03-UX-UI-DX/Wireframes/Wireframes-Exploracion-De-Registro-De-Imagenes.md) 1.0—, con el punto de entrada desde el paso 4 de este caso de uso declarado en su propia trazabilidad. Es la brecha `B-25` del índice maestro, **cerrada**.
- **Brecha declarada:** RN-08 no tiene caso ejecutable propio en el anexo E-22, y la reformulación por variante amplía la brecha de uno a seis casos. Destinatario: 08-Calidad-Y-Pruebas.
- **Brecha declarada:** RN-10 no tiene caso ejecutable propio en el anexo E-22. Destinatario: 08-Calidad-Y-Pruebas.
- **Brecha nueva, `B-29`: el alta unificada y la salida de las dos superficies de listado alcanzan a `03-UX-UI-DX`.** La grilla de tarjetas de siete opciones que esa categoría fundaba en el número de vías **deja de justificarse**, y la superficie del alta `SUP-17` pasa a tener el origen como campo de tres valores. No se toca desde acá: es su categoría. Destinatario: `03-UX-UI-DX`.
- El detalle visual del panel de configuración, del campo de origen y de los dos informes pertenece a 03-UX-UI-DX.

## 11. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 3.3 | 2026-08-02 | **Corrección del hallazgo `P0-01`** del informe [`B2-Retroalimentacion-Decisiones-2026-08-01-r1.md`](../../Audit/B2-Retroalimentacion-Decisiones-2026-08-01-r1.md), veredicto RECHAZADO. **Absorbida dentro de la versión 3.3 sin subirla y sin archivar de nuevo**, por la política de versionado de `Master-Prompt.md` §5: el documento está en `Propuesto` y la corrección deriva del audit de su propia fase de emisión. **Cabecera, y sólo cabecera:** la trazabilidad upstream citaba **v3.4** sin declarar cuál es la versión vigente del intake, de modo que la cita se leía como afirmación de vigencia y dejó de ser cierta cuando la fuente emitió la 3.6 y la 3.7 el 2026-08-02. Pasa a declarar que **el intake vigente es v3.7**, verificado en el campo `Versión` de su cabecera ese día, y que **el contenido incorporado entró en la v3.4**, con el enlace al snapshot donde se localiza. Las dos citas dicen cosas distintas y conviven, por el criterio de cita de versión que [`Especificacion-Funcional.md`](../Especificacion-Funcional.md) §8 fija en esta misma ronda. **Todo el contenido incorporado resuelve contra la v3.4**, verificado sobre su snapshot antes de escribir esta fila; ninguna cita del cuerpo ni del control de cambios se re-apunta. **Ninguna sección del documento cambia**: ningún propósito, actor, precondición, paso del flujo, flujo alternativo, excepción, postcondición, criterio de aceptación, referencia de trazabilidad ni nota. Ninguna decisión abierta se cerró y ningún conteo cambió. Ninguna fila previa de esta tabla se reescribió, por `Master-Prompt.md` §5.1 |
| 3.3 | 2026-08-01 | **El alta se unifica, aparece el tercer eje y el origen suma su sexta variante**, por la ronda de decisiones del agente humano del proyecto del 2026-07-31 y del 2026-08-01, consolidada en el `PRODUCT-INTAKE-SelfHosted-Service` **v3.4** §4 —`F-10` acotada, nota del tercer eje y el alta unificada, nota de construir la imagen contra crear el contenedor—, §19 y anexo E-2 §20.2.3. Sube **minor**: **la numeración del flujo principal no se toca** y ningún actor, precondición, postcondición de fallo ni excepción cambia de código. **§1** declara que el alta es una sola entrada con el origen como campo, y que la consecuencia de interfaz de la 3.2 **se invierte** sobre la misma premisa. **§4** reescribe los pasos 2, 4 y 5: no hay menú de vías, el origen se elige como valor de campo y las variantes pasan de cinco a **seis**. **FA-01** cambia de eje: la tabla deja de repartir siete vías y pasa a declarar los **tres valores que la interfaz produce** —imagen de registro, con la variante pública o privada **derivada** de si hay credencial; imagen del almacén local; archivo de construcción en línea—, con la constancia de que **la variante `repositorio` sigue en el modelo y ninguna superficie la produce**, de que el servicio sin origen no es un valor sino el tronco detenido, y de que **adoptar y catálogo salieron del alta** a sus listados propios sin que sus flujos cambien. **FA-01-bis nueva**, el disparador del despliegue como tercer eje independiente, con el reenvío a los cuatro casos de uso que lo consumen. **§7** declara la marca de **no reproducible** del origen `imagen-local`, derivada y no editable. **§8** suma `CA-16` a `CA-19` —variante derivada, alta desde el almacén local sin política flotante, marca no editable, y el repositorio ausente del campo— y reescribe `CA-06`, `CA-07`, `CA-11` y `CA-15`. **§9** suma `US-CU-03-12` y `US-CU-03-13`. **§10** reemplaza la nota de los dos ejes por la de los tres, suma la de construir la imagen contra crear el contenedor —**crear el contenedor nunca sale del producto**—, declara `Q-5` **sin objeto** y abre la brecha `B-29` con destinatario `03-UX-UI-DX`. **Ninguna decisión abierta se cerró acá**: `Q-7`, `Q-8`, `Q-12`, `Q-13` y `Q-28` siguen abiertas y sus notas lo declaran. La versión 3.2 queda archivada en `_legacy/2026-08-01/CU-03-Alta-Y-Configuracion-De-Servicio-v3.2.md` |
| 3.2 | 2026-07-30 | **Corrección del hallazgo `P1-1`** del informe [`B2-Retroalimentacion-Decisiones-2026-07-30-r1.md`](../../Audit/B2-Retroalimentacion-Decisiones-2026-07-30-r1.md), por la política de versionado de `Master-Prompt.md` §5. Sube **minor** y toca **una sola oración**: la última de la nota de `Q-27` de §10, que declaraba que la consecuencia de esa decisión seguía abierta porque `CU-39` proponía `SUP-19` «sin emitirla». **Verificado en disco:** `03-UX-UI-DX` emitió [`Wireframes-Exploracion-De-Registro-De-Imagenes.md`](../../03-UX-UI-DX/Wireframes/Wireframes-Exploracion-De-Registro-De-Imagenes.md) versión **1.0**, con `SUP-19` declarado en su §1, y pasa a **diecinueve** superficies. Es la brecha `B-25` del índice maestro, cerrada. **Este documento no figura entre los cuatro que el informe enumera**: se corrige acá porque contiene la misma afirmación y dejarla reproduciría el defecto que el hallazgo levanta. Ningún flujo, actor, precondición, excepción, postcondición, criterio de aceptación ni otra brecha cambia; `Q-28` sigue abierta. La versión 3.1 queda archivada en `_legacy/2026-07-30/CU-03-Alta-Y-Configuracion-De-Servicio-v3.1.md` |
| 3.1 | 2026-07-30 | **Incorporación de la ronda de decisiones del agente humano del proyecto del 2026-07-30**, consolidada en el `PRODUCT-INTAKE-SelfHosted-Service` v3.2 §19 y §4. Sube **minor**: **la numeración del flujo principal no se toca** —que es la razón por la que la versión 2.0 había subido a major— y ningún actor, precondición, excepción ni postcondición cambia. **`Q-27` decidida: hay exploración de registro de imágenes.** El paso 4 declara el **punto de entrada alternativo** de las dos vías de imagen —explorar el registro configurado y volver con el origen declarado, en [CU-39](CU-39-Exploracion-Del-Registro-De-Imagenes.md)—; las dos filas de imagen de la tabla de FA-01 lo declaran; se agrega el párrafo que precisa que **explorar no es una octava vía**, porque no cambia el origen resultante ni deja huella en la procedencia, de modo que las vías siguen siendo siete y las variantes cinco; §8 suma `CA-15` y §9 suma `US-CU-03-11`. **`DI-17`, `DI-18` y `DI-19` confirmadas**: la nota de §10 que las declaraba «propuesta del integrador, sin confirmar» pasa a declararlas `[D]` cerradas, y este caso de uso deja de consumirlas como revisables; **su contenido no cambió**, cambió su estatus. **`Q-28` sigue abierta** y su nota lo declara, con la precisión de que la exploración **no la resuelve**: explorar es entrada al alta y no camino de edición del origen. Ninguna decisión abierta se cerró acá. La versión 3.0 queda archivada en `_legacy/2026-07-30/CU-03-Alta-Y-Configuracion-De-Servicio-v3.0.md` |
| 3.0 | 2026-07-30 | Migración normativa del conjunto 4.1 al 6.0, fase M4 corte 3, bajo `Rules-Especificacion-Funcional` 4.0, `Vocabulario-Rules` 2.1 y `Migracion-Rules` 1.0. Clasificación **regenerar contenido** por el salto major de la regla que lo gobierna; fuente de contenido: **el documento de origen**, archivado sin modificar en `_legacy/2026-07-30/CU-03-Alta-Y-Configuracion-De-Servicio-v2.0.md`. Sube **major** porque la nomenclatura anterior deja de cumplir. **Cabecera:** la etiqueta `Proyecto` pasa a `Producto` sobre el mismo valor, porque `Vocabulario-Rules` §3 prohíbe la etiqueta de un plano de identidad sobre el valor de otro; se suma el campo `Proyecto de código` con el valor `SelfHosted-Service`, que §4.1 de la regla 4.0 exige por ser ésta una categoría de nivel proyecto de código (§4 R3) y que el PRODUCT-INTAKE §13 declara como `Nombre-Proyecto-Codigo`; la trazabilidad upstream cita el `PRODUCT-INTAKE` renombrado, antes `SOLUTION-INTAKE`. **Sustitución léxica por ocurrencia** según `Vocabulario-Rules` §9.5 y el plan de migración §3.5, y nunca por reemplazo global de cadena: las dos ocurrencias de «solución» designaban el nivel superior y pasan a «producto» con su concordancia de género —«Administrador de la solución» a «Administrador del producto» y «Registro de la solución» a «Registro del producto»—; no hay ninguna «solución de código», y las dos ocurrencias de la cadena `resoluci` —dentro de «resolución» y «resoluciones»— quedaron **intactas**, verificadas por el barrido negativo que el plan §3.5 paso 4 exige. Las veinticuatro ocurrencias de «proyecto» se clasificaron una por una y **ninguna pasó a «proyecto de código»**: diez llevan la forma calificada «proyecto SelfHosted»; nueve son la misma entidad del dominio en forma corta, admitida por el PRODUCT-INTAKE §12 donde el contexto ya fijó el sentido; cuatro son el emprendimiento —«agente humano del proyecto»—, que `Vocabulario-Rules` §4 R1 y el PRODUCT-INTAKE §12 dejan sin calificar, y una era la etiqueta de cabecera. **Tabla de contenido:** suma la entrada de §13, que la sección tenía sin figurar. **Ningún propósito, actor, precondición, paso de flujo, flujo alternativo, excepción, postcondición, criterio de aceptación, referencia de trazabilidad, nota ni brecha cambió de contenido**: la migración es léxica y de forma de cabecera, y las filas anteriores de este control de cambios no se reescribieron. Origen: [Plan-Migracion-4.1-a-6.0.md](../../Audit/Plan-Migracion-4.1-a-6.0.md) §3.5 y §4 |
| 2.0 | 2026-07-29 | **Versión mayor: el flujo principal se renumera y su forma cambia.** Sube a major y no a minor porque artefactos aguas abajo citan los pasos por su número —la reentrada de la configuración se citaba como «los pasos 5 a 10»— y esa numeración se corrió. El paso 2 pasa a ser **elegir la vía de alta** entre siete, con el servicio existiendo como borrador desde ese momento; el origen pasa al paso 4 con sus **cinco variantes discriminadas**; se inserta el paso 5, la **verificación del origen** con su informe, separada de la validación de la configuración del paso 9; el paso 8 incorpora el **comando de arranque**, que la versión 1.0 no declaraba y que el intake tampoco tenía; y el paso 10 declara el paso a `pendiente-de-aplicar`. Se declaran los **tres estados del servicio** y el **guardado transversal**. FA-01 pasa a ser la tabla del **delta de cada vía**; FA-02 declara el **guardado incompleto**; FA-03 y FA-04 declaran los **dos fallos de verificación** que hay que distinguir. La antigua FA-01, la reentrada, pasa a FA-05 con su rango corregido a los pasos 6 a 10, con la **tabla de clases de cambio por consecuencia** —que declara qué recrea el contenedor y qué no— y con la brecha `Q-28` escrita en lugar de la exclusión silenciosa. La antigua FA-02, origen por repositorio, **desaparece absorbida** por la tabla de FA-01. La antigua FA-03, eliminación, pasa a FA-06. §6 suma tres filas y declara por qué un fallo de verificación **no** es un código de rechazo. §8 suma nueve criterios de aceptación, CA-06 a CA-14. §10 declara cinco brechas, tres de ellas nuevas. La versión 1.0 queda archivada en `_legacy/2026-07-29/`. Origen: §22.2 del documento de trabajo `SDD/Estado/Redefinicion-Servicio.md` v2.0, primera y segunda fila |
| 1.0 | 2026-07-29 | Corrección absorbida dentro de la versión 1.0, sin subirla y sin archivar, por la política de versionado de `Master-Prompt.md` §5: el documento está en estado `Propuesto` y la corrección proviene del audit de su propia fase de emisión. §2 suma la declaración de que los nombres de los actores no humanos son denominaciones acuñadas por esta categoría y no componentes declarados, con la salvedad de los seis que sí trazan a una fuente. Ningún actor cambia de nombre y ningún flujo se altera: lo que se corrige es que la categoría afirmaba que todo dato trazaba y trece de los diecinueve nombres de actor no humano no lo cumplían. Origen: hallazgo H-04 del informe [Audit/B-02-03-r1.md](../../Audit/B-02-03-r1.md) |
| 1.0 | 2026-07-29 | Versión inicial, derivada de la necesidad de negocio upstream y de las secciones del intake citadas en la cabecera |

## 13. Interacción multiusuario y concurrencia

Sección opcional admitida por §4.3 de `Rules-Especificacion-Funcional.md` para el tipo `web-monolith`. Conserva el número que esa sección le asigna, de modo que la numeración salta del 11 al 13 por construcción de la regla y no por omisión.

El servicio no tiene estado de encendido: eso vive en el despliegue. **Sí tiene estado de configuración** —`borrador`, `pendiente-de-aplicar`, `aplicado`—, que es ortogonal al del despliegue y que esta versión incorpora. Editar un servicio ya desplegado no lo reemplaza en el acto: el cambio entra al conjunto de cambios pendientes y el reemplazo ocurre al aplicarlo (CU-24).
