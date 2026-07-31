# CU-13 — Despliegue de un servicio desde imagen de registro

**Proyecto de código:** SelfHosted-Service
**Producto:** SelfHosted Service
**Documento:** CU-13-Despliegue-Desde-Imagen-De-Registro.md
**Versión:** 2.1
**Estado:** Propuesto
**Fecha:** 2026-07-30
**Autor:** Analista Funcional Senior (AG-02)

**Necesidad de negocio upstream:** [NB-04](../../01-Necesidades-Negocio/Necesidades-De-Negocio/NB-04-Alta-De-Servicio-Sin-Copiar-Y-Adaptar.md)
**Trazabilidad upstream:** PRODUCT-INTAKE §4 capacidad F-05; anexo E-2 §20.2.3, las variantes de origen por imagen de registro **público y privado**; anexo E-23, la imagen como objeto con identidad y el bloque de imagen del despliegue; anexo E-3 (el despliegue con su línea de tiempo); anexo E-17 (la máquina de estados y la correspondencia con el motor); anexo E-15, endpoint de despliegue de servicio; E-16 RN-13, RN-21, RN-24, RN-31

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

Permitir que el administrador despliegue un servicio declarado a partir de una imagen de registro, con el estado real reflejado en su nodo, de modo que el alta de un servicio deje de ser un ejercicio de copiar y adaptar un archivo suelto.

## 2. Actores

| Actor | Tipo | Rol |
| --- | --- | --- |
| Administrador del producto | Primario | Solicita el despliegue del servicio |
| Módulo de despliegue | Sistema | Resuelve las referencias, crea el contenedor y registra el resultado por contenedor |
| Motor de contenedores | Sistema | Obtiene la imagen, crea y arranca el contenedor |

Los nombres de los actores no humanos son **denominaciones acuñadas por esta categoría**, salvo los seis que trazan a una fuente: `Motor de contenedores`, `Destino externo`, `Automatismo de integración continua`, `Sincronizador de estado`, `Módulo de descubrimiento` y `Resolutor de referencias`. Los acuñados no son componentes declarados y no condicionan la descomposición: su correspondencia con los módulos que el intake §17.P.2 sí declara la fija 05-Arquitectura-Tecnica. La convención completa, nombre por nombre, está en [Especificacion-Funcional.md](../Especificacion-Funcional.md) §8.

## 3. Precondiciones

- El servicio está declarado con origen por imagen de registro (CU-03).
- El proyecto SelfHosted tiene su red creada (CU-01).
- El administrador tiene sesión iniciada (CU-30).

## 4. Flujo principal

1. El administrador solicita desplegar el servicio.
2. El sistema registra un despliegue en estado pendiente para la réplica correspondiente.
3. El sistema resuelve cada referencia de las variables del servicio inmediatamente antes de crear el contenedor (RN-24).
4. El sistema obtiene la imagen del registro de imágenes con la etiqueta y la política de actualización declaradas, usando la **credencial de registro** que la variante `imagen-privada` exige. La variante `imagen-publica` no la usa: es la única diferencia operativa entre las dos en este caso de uso.
5. El sistema **registra el digesto de la imagen obtenida en el despliegue**, que es su identidad real y lo que permite saber qué corre exactamente incluso cuando la etiqueta es flotante. **Es dato decidido desde el 2026-07-30** (`Q-15`, decidida en positivo) y este paso es el que lo escribe para las dos variantes de imagen: ver §10.
6. El sistema crea el contenedor con las variables ya resueltas: el contenedor recibe valores y nunca expresiones.
7. El sistema arranca el contenedor y sigue su estado según la máquina de estados declarada.
8. El sistema traduce el estado real del contenedor al estado del despliegue con la tabla de correspondencia del anexo E-17.
9. El sistema marca el despliegue como desplegado o como fallido con su error, por contenedor y no por operación (RN-31).
10. El sistema refleja el estado en el nodo del lienzo y registra el evento de auditoría (RN-17).

## 5. Flujos alternativos

**FA-01 — Redespliegue de un servicio ya desplegado.**
Disparador: el servicio ya tiene un despliegue activo.
Pasos: el despliegue anterior pasa a retirado y se crea uno nuevo. El reemplazo implica ventana de indisponibilidad, que la interfaz debe advertir explícitamente al confirmar.
Punto de retorno: paso 2.

**FA-02 — Servicio con verificación de salud declarada.**
Disparador: la imagen o el servicio declaran una verificación de salud.
Pasos: mientras la verificación está en curso el despliegue queda en creando; si resulta sana pasa a activo y si resulta en mal estado pasa a activo degradado, que no es una caída.
Punto de retorno: paso 8.

**FA-03 — Servicio con más de una réplica.**
Disparador: el servicio declara más de una réplica.
Pasos: se registra un despliegue por réplica, cada uno con su propio estado y su propia reserva de dirección cuando corresponde (RN-18).
Punto de retorno: paso 8.

## 6. Excepciones y errores

| Código | Causa | Respuesta del sistema |
| --- | --- | --- |
| `422` de referencia no resoluble | Una referencia del servicio no resuelve a una variable de ámbito válido | El despliegue de ese servicio se aborta con la causa identificada, sin afectar a los demás contenedores de la operación (RN-21, RN-24, RN-31) |
| `409` de conflicto de dirección | La dirección del servicio está ocupada por un servicio activo de otro proyecto SelfHosted | Rechazo con el informe de conflicto y sus resoluciones (RN-03). Ver CU-21 |
| Despliegue fallido | La imagen no existe en el registro, o el contenedor no puede crearse ni arrancar | El despliegue queda fallido con su error identificable; los demás contenedores de la operación no se ven afectados (RN-31) |
| Motor inalcanzable | El punto de acceso del motor no responde | El error se traduce a una causa propia identificable y el despliegue queda fallido |

## 7. Postcondiciones

**En caso de éxito:** existe un contenedor creado y arrancado por cada réplica del servicio, con las variables resueltas a valores; el despliegue registra su estado, su identificador de contenedor y su línea de tiempo; el nodo del lienzo refleja el estado real; existe el evento de auditoría.

**En caso de fallo:** el despliegue queda registrado como fallido con su causa; ningún otro contenedor de la operación se ve afectado; el servicio conserva su configuración y sus datos persistidos.

## 8. Criterios de aceptación

| ID | Given | When | Then |
| --- | --- | --- | --- |
| CA-01 | El servicio 101, con seis referencias, dos de ellas al host de otro servicio | El administrador lo despliega | El contenedor recibe los valores resueltos y ninguna de sus variables contiene una expresión del modelo ni el marcador del vínculo interno |
| CA-02 | Un contenedor en ejecución con la verificación de salud en mal estado | El sistema sincroniza el estado | El despliegue queda en activo degradado y no en caído |
| CA-03 | Un servicio cuya imagen no existe en el registro | El administrador lo despliega dentro de una operación que alcanza a otros servicios | Ese despliegue queda fallido con la causa declarada y los demás contenedores de la operación conservan su resultado |
| CA-04 | Un servicio con una referencia a un servicio inexistente | El administrador lo despliega | El despliegue de ese servicio se aborta con la causa identificada y no se crea el contenedor |

## 9. Trazabilidad

| Dimensión | Referencia |
| --- | --- |
| Necesidad de negocio | [NB-04](../../01-Necesidades-Negocio/Necesidades-De-Negocio/NB-04-Alta-De-Servicio-Sin-Copiar-Y-Adaptar.md) |
| Reglas de negocio aplicables | RN-08, RN-13, RN-17, RN-21, RN-23, RN-24, RN-31, RN-38. Reglas conceptuales: RC-18 |
| Historias de usuario a generar en 06 | US-CU-13-1 (desplegar un servicio desde imagen de registro), US-CU-13-2 (ver el estado real del despliegue en el nodo), US-CU-13-3 (redesplegar un servicio ya desplegado con advertencia de indisponibilidad), US-CU-13-4 (saber qué imagen exacta está corriendo, por su digesto) |
| Componentes esperados en 05 | Capa `Web`, controlador del recurso de despliegue y nodo del lienzo; capa `Application`, módulo de servicios y despliegues; capa `Domain`, agregado `Despliegues`; capa `Infrastructure`, `Contenedores`. Referencia tentativa |
| Tests previstos en 08 | T-38 (resolución antes de crear el contenedor); T-28, T-29 (correspondencia de estados); T-31 (resultado por contenedor); T-27 (datos del montaje intactos al redesplegar) |

Los identificadores de historia de usuario llevan la forma `US-CU-XX-n` y son **provisionales**: la numeración definitiva es potestad de 06-Backlog-Tecnico. La forma se eligió para que ningún identificador emitido acá colisione con la numeración que 06 asigne.

## 10. Notas y supuestos

- El resultado del despliegue se determina por contenedor y no por operación. Un despliegue parcial es un estado legítimo del modelo.
- La ventana de indisponibilidad del reemplazo es consecuencia declarada de que el producto no administre proxies inversos, y la interfaz debe advertirla explícitamente.
- La resolución de referencias ocurre en el adaptador, inmediatamente antes de crear el contenedor. El valor en claro de un secreto existe sólo en memoria y no se persiste ni se registra en auditoría.
- La presentación del estado en el nodo y del digesto en el panel lateral pertenece a 03-UX-UI-DX.
- **Las dos variantes de imagen se alinearon en la versión 1.1, y su separación quedó confirmada el 2026-07-30.** El origen por imagen dejó de ser un valor único y pasó a ser dos variantes discriminadas, `imagen-publica` e `imagen-privada`, que difieren en dos campos: el registro pasa de selector a dirección, y aparece la credencial de registro. **No son dos naturalezas**: es el mismo origen con y sin autenticación, y este caso de uso las cubre las dos. Es la especificación de integración `DI-18`, **confirmada por el agente humano del proyecto**: pasa a `[D]` y deja de consumirse como revisable.
- **Brecha cerrada, `Q-15`: el despliegue registra el digesto.** La versión anterior declaraba el paso 5 dependiente de una decisión abierta. Quedó **decidida en positivo el 2026-07-30**, y con ella el usuario puede saber qué imagen corre, la higiene de imágenes puede resolver el uso de cada una (CU-37) y volver a un despliegue anterior pasa a ser técnicamente posible (CU-38, cuya existencia como operación sigue sujeta a `Q-19`). La fila se conserva en lugar de borrarse porque otros artefactos citan el identificador.
- **Brecha cerrada, `Q-6`, por arrastre:** si el despliegue registra además qué commit construyó la imagen. **La cierra `Q-15`**, tal como la propia fila de §19 del intake lo anticipaba: el digesto cubre qué versión corre. Para el origen por repositorio remoto la respuesta operativa la da CU-15. Es la única de las pendientes que cerró sin decisión propia, y el intake v3.2 declara que **ninguna otra lo hace por arrastre**.
- **Brecha declarada, `Q-27`, cerrada con consecuencia acá:** desde el 2026-07-30 el origen de este caso de uso puede haberse declarado explorando el registro de imágenes ([CU-39](CU-39-Exploracion-Del-Registro-De-Imagenes.md)) en lugar de escribiéndose. **No cambia nada de este flujo**: la imagen y la etiqueta llegan igual al paso 4, ya verificadas por CU-03 paso 5. Se declara para que no se lea como camino alternativo de despliegue.

## 11. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 2.1 | 2026-07-30 | **Acotamiento de las dependencias declaradas, por la ronda de decisiones del agente humano del proyecto del 2026-07-30** consolidada en el `PRODUCT-INTAKE-SelfHosted-Service` v3.2 §19. Sube **minor**: ningún propósito, actor, precondición, flujo, excepción, postcondición ni criterio de aceptación cambia de contenido, y la numeración del flujo principal se conserva. **`Q-15` decidida en positivo**: el paso 5 deja de declararse dependiente de una decisión abierta y pasa a ser el paso que **escribe** el digesto; su brecha de §10 pasa a cerrada conservando la fila. **`Q-6` cierra por arrastre**, tal como su propia fila del intake lo anticipaba, y §10 lo declara con la precisión de que es la única que cierra sin decisión propia. **`DI-18` confirmada**: la nota de las dos variantes de imagen deja de declararla sin revisar. **`Q-27` decidida**: §10 declara que el origen puede llegar desde la exploración de [CU-39](CU-39-Exploracion-Del-Registro-De-Imagenes.md) y que **eso no cambia este flujo**. Ninguna decisión abierta se cerró acá. La versión 2.0 queda archivada en `_legacy/2026-07-30/CU-13-Despliegue-Desde-Imagen-De-Registro-v2.0.md` |
| 2.0 | 2026-07-30 | Migración normativa del conjunto 4.1 al 6.0, fase M4 corte 3, bajo `Rules-Especificacion-Funcional` 4.0, `Vocabulario-Rules` 2.1 y `Migracion-Rules` 1.0. Clasificación **regenerar contenido** por el salto major de la regla que lo gobierna; fuente de contenido: **el documento de origen**, archivado sin modificar en `_legacy/2026-07-30/CU-13-Despliegue-Desde-Imagen-De-Registro-v1.1.md`. Sube **major** porque la nomenclatura anterior deja de cumplir. **Cabecera:** la etiqueta `Proyecto` pasa a `Producto` sobre el mismo valor, porque `Vocabulario-Rules` §3 prohíbe la etiqueta de un plano de identidad sobre el valor de otro; se suma el campo `Proyecto de código` con el valor `SelfHosted-Service`, que §4.1 de la regla 4.0 exige por ser ésta una categoría de nivel proyecto de código (§4 R3) y que el PRODUCT-INTAKE §13 declara como `Nombre-Proyecto-Codigo`; la trazabilidad upstream cita el `PRODUCT-INTAKE` renombrado, antes `SOLUTION-INTAKE`. **Sustitución léxica por ocurrencia** según `Vocabulario-Rules` §9.5 y el plan de migración §3.5, y nunca por reemplazo global de cadena: la única ocurrencia de «solución» designaba el nivel superior y pasa a «producto» con su concordancia de género —«Administrador de la solución» a «Administrador del producto»—; no hay ninguna «solución de código», y las tres ocurrencias de la cadena `resoluci` —dentro de «resolución» y «resoluciones»— quedaron **intactas**, verificadas por el barrido negativo que el plan §3.5 paso 4 exige. Las seis ocurrencias de «proyecto» se clasificaron una por una y **ninguna pasó a «proyecto de código»**: tres llevan la forma calificada «proyecto SelfHosted»; dos son el emprendimiento —«agente humano del proyecto»—, que `Vocabulario-Rules` §4 R1 y el PRODUCT-INTAKE §12 dejan sin calificar, y una era la etiqueta de cabecera. **Tabla de contenido:** suma la entrada de §13, que la sección tenía sin figurar. **Ningún propósito, actor, precondición, paso de flujo, flujo alternativo, excepción, postcondición, criterio de aceptación, referencia de trazabilidad, nota ni brecha cambió de contenido**: la migración es léxica y de forma de cabecera, y las filas anteriores de este control de cambios no se reescribieron. Origen: [Plan-Migracion-4.1-a-6.0.md](../../Audit/Plan-Migracion-4.1-a-6.0.md) §3.5 y §4 |
| 1.1 | 2026-07-29 | **Se alinea con las dos variantes de imagen y con el registro del digesto.** El paso 4 distingue la variante de registro público de la de registro privado, cuya única diferencia operativa acá es la credencial de registro. Se inserta el paso 5, que **registra el digesto de la imagen obtenida en el despliegue**, y los pasos siguientes se renumeran del 6 al 10. §9 suma RN-08, RN-38 y una historia de usuario. §10 declara que las dos variantes son el mismo origen con y sin autenticación y no dos naturalezas, y declara **dos brechas**: `Q-15`, de la que depende el paso 5 y que es la pendiente de mayor palanca de las diecisiete abiertas, y `Q-6`, sobre el registro del commit. La versión 1.0 queda archivada en `_legacy/2026-07-29/`. Origen: §22.2 sexta fila del documento de trabajo `SDD/Estado/Redefinicion-Servicio.md` v2.0 |
| 1.0 | 2026-07-29 | Corrección absorbida dentro de la versión 1.0, sin subirla y sin archivar, por la política de versionado de `Master-Prompt.md` §5: el documento está en estado `Propuesto` y la corrección proviene del audit de su propia fase de emisión. §2 suma la declaración de que los nombres de los actores no humanos son denominaciones acuñadas por esta categoría y no componentes declarados, con la salvedad de los seis que sí trazan a una fuente. Ningún actor cambia de nombre y ningún flujo se altera: lo que se corrige es que la categoría afirmaba que todo dato trazaba y trece de los diecinueve nombres de actor no humano no lo cumplían. Origen: hallazgo H-04 del informe [Audit/B-02-03-r1.md](../../Audit/B-02-03-r1.md) |
| 1.0 | 2026-07-29 | Versión inicial, derivada de la necesidad de negocio upstream y de las secciones del intake citadas en la cabecera |

## 13. Interacción multiusuario y concurrencia

Sección opcional admitida por §4.3 de `Rules-Especificacion-Funcional.md` para el tipo `web-monolith`. Conserva el número que esa sección le asigna, de modo que la numeración salta del 11 al 13 por construcción de la regla y no por omisión.

El intake declara que las operaciones de despliegue se serializan por proyecto SelfHosted. La caída del circuito de la interfaz no es un evento de la máquina de estados del despliegue: el despliegue vive del lado del servidor y el circuito sólo lo observa.

