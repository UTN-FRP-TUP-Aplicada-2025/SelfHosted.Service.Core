# CU-18 — Arranque y parada, con autoarranque

**Proyecto de código:** SelfHosted-Service
**Producto:** SelfHosted Service
**Documento:** CU-18-Arranque-Y-Parada-Con-Autoarranque.md
**Versión:** 2.1
**Estado:** Propuesto
**Fecha:** 2026-08-02
**Autor:** Analista Funcional Senior (AG-02)

**Necesidad de negocio upstream:** [NB-05](../../01-Necesidades-Negocio/Necesidades-De-Negocio/NB-05-Arranque-Previsible-Y-Conflictos-Anticipados.md)
**Trazabilidad upstream:** **el intake vigente es v3.7**, verificado en el campo `Versión` de su cabecera el 2026-08-02. **De qué versión vino cada bloque de contenido incorporado**, que es la cita que el cuerpo y el control de cambios conservan por el criterio de [`Especificacion-Funcional.md`](../Especificacion-Funcional.md) §8: **de la v3.4**, §4 capacidad F-06 con la nota de **construir la imagen contra crear el contenedor**, y §19 fila `Q-19`, decidida el 2026-07-31; **de la v3.5**, que completa lo que la 3.4 dejó afuera, §4 con la nota de **las tres fases del despliegue** y la nota de la **política ante un despliegue que no arranca**, con sus tres puntos declarados sin decidir. Las dos citas se separan porque el snapshot [`_legacy/2026-08-01/PRODUCT-INTAKE-SelfHosted-Service-v3.4.md`](../../../Intake/_legacy/2026-08-01/PRODUCT-INTAKE-SelfHosted-Service-v3.4.md) **no contiene** ninguna de esas dos notas: sobre él `grep -c -i "cuarentena"` devuelve 0 y `grep -c -i "fases del despliegue"` devuelve 0, contra 4 y 2 sobre el intake vigente, verificado el 2026-08-02. **Secciones y anexos consumidos:** los citados arriba; anexo E-15, endpoints de arranque y parada de proyecto y de servicio; anexo E-17 (la máquina de estados); anexo E-1, marca de autoarranque; E-16 RN-03, RN-04, RN-05, RN-09, RN-14, RN-20, RN-24, RN-31

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

---

## 1. Propósito

Permitir que el administrador arranque y detenga un proyecto SelfHosted completo o un servicio suelto, respetando el orden que el grafo de arranque declara y con la marca de autoarranque al iniciar el sistema administrador, para que el arranque deje de depender de recordar el orden correcto.

## 2. Actores

| Actor | Tipo | Rol |
| --- | --- | --- |
| Administrador del producto | Primario | Arranca y detiene proyectos SelfHosted y servicios, y declara el autoarranque |
| Módulo de despliegue | Sistema | Valida los conflictos, calcula el orden topológico y ejecuta arranques y paradas |
| Motor de contenedores | Sistema | Crea, arranca y elimina los contenedores |

Los nombres de los actores no humanos son **denominaciones acuñadas por esta categoría**, salvo los seis que trazan a una fuente: `Motor de contenedores`, `Destino externo`, `Automatismo de integración continua`, `Sincronizador de estado`, `Módulo de descubrimiento` y `Resolutor de referencias`. Los acuñados no son componentes declarados y no condicionan la descomposición: su correspondencia con los módulos que el intake §17.P.2 sí declara la fija 05-Arquitectura-Tecnica. La convención completa, nombre por nombre, está en [Especificacion-Funcional.md](../Especificacion-Funcional.md) §8.

## 3. Precondiciones

- Existe el proyecto SelfHosted con al menos un servicio declarado (CU-01, CU-03).
- Las direcciones fijas declaradas pertenecen al rango gestionado (CU-19).
- El administrador tiene sesión iniciada (CU-30), salvo en el arranque automático al iniciar el sistema.

## 4. Flujo principal

**Las tres fases del despliegue, y a cuál de ellas aplica el orden.** Un despliegue tiene tres fases: **obtener la imagen**, **crear el contenedor** y **poner en marcha**. Las dos primeras son «el despliegue» y la tercera es «el arranque». **El orden que el grafo declara aplica a la tercera** y no a las dos primeras, que son **independientes entre servicios**: obtener la imagen de `api` no espera a que `db` esté listo, y crear su contenedor tampoco. Lo que espera es ponerlo en marcha. Serializar las tres fases haría que el arranque de un proyecto durase la suma de sus descargas en lugar de la más larga, sin que ninguna regla lo exija.

1. El administrador solicita arrancar el proyecto SelfHosted.
2. El sistema valida los conflictos de dirección contra los servicios activos, sin acceder al motor de contenedores (RN-03). Ver CU-20.
3. El sistema verifica que las aristas que referencian el host tengan canal alcanzable entre los modos de red de origen y destino (RN-04).
4. El sistema calcula el orden topológico sobre el subgrafo de las aristas que declaran espera, que es el grafo de arranque (RN-14).
5. El sistema despliega los servicios: **obtiene la imagen y crea el contenedor de cada uno sin sujetarse al orden**, resolviendo las referencias inmediatamente antes de crear cada contenedor (RN-24), y **los pone en marcha en el orden que el paso 4 calculó**.
6. El sistema determina el resultado por contenedor y no por operación (RN-31).
7. El sistema deriva el estado del proyecto SelfHosted de los estados de sus despliegues, que puede ser parcialmente activo (RN-20).
8. El administrador solicita detener el proyecto SelfHosted o un servicio.
9. El sistema elimina los contenedores conservando intactos la definición, las variables y los datos de los montajes (RN-09).
10. El sistema registra el evento de auditoría de cada operación (RN-17).

## 5. Flujos alternativos

**FA-01 — Arranque de un servicio suelto.**
Disparador: el administrador arranca un servicio en lugar del proyecto SelfHosted completo.
Pasos: se aplican las mismas validaciones de conflicto y de canal, acotadas a ese servicio.
Punto de retorno: paso 5.

**FA-02 — Arranque parcial por conflicto.**
Disparador: uno de los servicios está en conflicto de dirección y el administrador elige arrancar el resto.
Pasos: arrancan los servicios sin conflicto y el proyecto SelfHosted queda parcialmente activo, con estado explícito y no como error silencioso (RN-20). Ver CU-21.
Punto de retorno: paso 7.

**FA-03 — Autoarranque al iniciar el sistema administrador.**
Disparador: el sistema administrador se inicia y hay proyectos o servicios con la marca de autoarranque.
Pasos: se ejecuta el mismo flujo, con el solicitante registrado como autoarranque en lugar de la interfaz.
Punto de retorno: paso 2.

**FA-04 — Reinicio de un contenedor sin reconstruir la imagen.**
Disparador: el administrador pide reiniciar un servicio.
Pasos: el contenedor se reinicia sin construir de nuevo su imagen ni alterar los montajes.
Punto de retorno: paso 6.

**FA-05 — Servicio materializado y sin arrancar.**
Disparador: un servicio completó las dos primeras fases —su imagen está obtenida y su contenedor creado— y no se puso en marcha, sea porque el administrador no lo pidió, porque el orden todavía no llegó a él, o porque lo detuvo sin eliminarlo.
Pasos: **el estado es de reposo legítimo y no un paso transitorio.** El sistema lo declara como tal, el nodo lo refleja, y no se lo trata como fallo, como despliegue a medias ni como estado que haya que resolver. Poner en marcha es una operación posterior y separable.
Punto de retorno: paso 5, cuando se lo ponga en marcha.

**FA-06 — El servicio no arranca: recuperación y cuarentena.**
Disparador: un servicio se crea bien en la segunda fase y **no arranca** en la tercera.
Pasos: el sistema **informa el error** y **recupera el despliegue anterior** por su digesto, que es [CU-38](CU-38-Vuelta-A-Un-Despliegue-Anterior.md) `FA-05`. **Si ese tampoco arranca**, el arranque del proyecto SelfHosted **no se aborta**: los demás servicios siguen corriendo, el proyecto queda parcialmente activo como estado declarado (RN-20), y el servicio pasa a **cuarentena** con su **autoarranque apagado**, de modo que el próximo inicio del sistema administrador no lo vuelve a intentar. Es la política de fallo al arrancar que `Q-19` cita como su fundamento.
Punto de retorno: paso 7.

**Qué de este flujo alternativo está declarado por la fuente y qué no.** Los tres pasos son el **cuerpo decidido** de la nota «Política ante un despliegue que no arranca» del `PRODUCT-INTAKE-SelfHosted-Service` §4, tomados de su tabla de tres situaciones, y «autoarranque apagado» se escribe siguiendo esa tabla, que dice «el servicio pasa a **no autoarranque**: queda en cuarentena». **La misma nota deja tres puntos sin decidir y este flujo no cierra ninguno**: si la recuperación del anterior es **automática o se ofrece**; si la cuarentena apaga el **autoarranque** o la **participación en el arranque**, que son marcas distintas; y **dónde se avisa** que un servicio quedó en cuarentena. Son los puntos **(a)**, **(b)** y **(c)** de `B-31`, y el mismo tratamiento vale para `CA-07` y para la fila de recuperación agotada de §6, que escriben la misma marca. Lo que bloquea al punto **(b)** es que `03-UX-UI-DX` exhibe hoy el autoarranque como control editable del panel: las dos lecturas producen interfaces distintas, y este caso de uso, que es el que gobierna la marca de autoarranque, no puede elegir por la fuente.

## 6. Excepciones y errores

| Código | Causa | Respuesta del sistema |
| --- | --- | --- |
| `409` de conflicto de dirección | Una dirección del proyecto SelfHosted está ocupada por un servicio activo de otro proyecto | Arranque bloqueado con el informe de conflicto y las tres resoluciones (RN-03). Ver CU-21 |
| Enlace inválido por canal | Una arista referencia el host de un destino sin canal alcanzable entre sus modos de red | El enlace queda marcado inválido y bloquea el arranque (RN-04) |
| `422` de ciclo de arranque | El grafo de arranque tiene un ciclo | Rechazo señalando el ciclo (RN-05) |
| Despliegue fallido de un contenedor | Un contenedor no puede crearse o arrancar | Ese despliegue queda fallido con su error y los demás conservan su resultado; el proyecto SelfHosted queda parcialmente activo (RN-31, RN-20) |
| Fallo al arrancar, con recuperación agotada | El contenedor se crea bien, no arranca, y el despliegue anterior recuperado tampoco | El servicio pasa a **cuarentena** con el autoarranque apagado; el proyecto SelfHosted **sigue corriendo** con sus demás servicios (FA-06, RN-20) |

## 7. Postcondiciones

**En caso de éxito del arranque:** los contenedores de los servicios alcanzados están creados y **puestos en marcha en el orden que el grafo de arranque declara**, mientras que obtenerlos y crearlos no se sujetó a ese orden; el estado del proyecto SelfHosted se deriva de los estados por contenedor; existe el evento de auditoría.

**En caso de servicio materializado y sin arrancar:** su imagen está obtenida y su contenedor creado, y no está en marcha. Es un **estado de reposo declarado** y no un fallo ni un despliegue incompleto.

**En caso de éxito de la parada:** los contenedores fueron eliminados y la definición, las variables y los datos de los montajes quedaron intactos.

**En caso de fallo:** el arranque queda bloqueado con su informe, o parcialmente ejecutado con el estado explícito de cada contenedor; ninguna configuración ni ningún dato persistido se pierde.

## 8. Criterios de aceptación

| ID | Given | When | Then |
| --- | --- | --- | --- |
| CA-01 | El proyecto `ia-local` con `ia-webui` dependiente de `ia-api` por una arista con espera declarada | El administrador arranca el proyecto SelfHosted | El orden de arranque es `ia-api`, `ia-video`, `ia-webui`, deducido del grafo de arranque y no configurado a mano |
| CA-02 | Un proyecto SelfHosted de tres servicios con uno en conflicto de dirección | El administrador elige arrancar el resto | Arrancan dos servicios y el proyecto queda parcialmente activo, con estado explícito y sin error silencioso |
| CA-03 | Un servicio en macvlan con el montaje de datos en `/data` | El administrador detiene el servicio | El contenedor se elimina y el montaje permanece intacto |
| CA-04 | Una arista entre `api` y `db` que referencia el host, con la espera desmarcada por el administrador | El administrador arranca el proyecto SelfHosted | Los dos servicios arrancan en cualquier orden, y la arista sigue exigiendo canal alcanzable |
| CA-05 | El proyecto `ia-local` con `ia-webui` esperando a `ia-api`, y las dos imágenes sin obtener | El administrador arranca el proyecto SelfHosted | Las imágenes se obtienen y los contenedores se crean **sin sujetarse al orden**; sólo la **puesta en marcha** respeta `ia-api` antes que `ia-webui` |
| CA-06 | Un servicio con su imagen obtenida y su contenedor creado, que nunca se puso en marcha | El administrador abre el proyecto SelfHosted | El servicio figura como **materializado y sin arrancar**, que es un estado de reposo declarado, y no como despliegue fallido ni a medias |
| CA-07 | Un servicio cuyo contenedor se crea bien y no arranca, con un despliegue anterior que **tampoco arranca** | La recuperación se agota | El servicio queda en **cuarentena** con el autoarranque apagado, y los demás servicios del proyecto SelfHosted **siguen corriendo**. **No se evalúa acá cuál de las dos marcas concretas se apaga** —el autoarranque o la participación en el arranque—: es punto abierto de la fuente (`B-31`, punto **b**), se escribe «autoarranque» porque es lo que dice el cuerpo decidido de la nota, y el criterio se cumple con las dos lecturas |

## 9. Trazabilidad

| Dimensión | Referencia |
| --- | --- |
| Necesidad de negocio | [NB-05](../../01-Necesidades-Negocio/Necesidades-De-Negocio/NB-05-Arranque-Previsible-Y-Conflictos-Anticipados.md) |
| Reglas de negocio aplicables | RN-03, RN-04, RN-05, RN-09, RN-14, RN-17, RN-20, RN-24, RN-31, RN-40. **RN-40 entra el 2026-08-01**: la recuperación de FA-06 depende de que la imagen del despliegue anterior siga existiendo. Reglas conceptuales: RC-12, RC-18 |
| Historias de usuario a generar en 06 | US-CU-18-1 (arrancar un proyecto SelfHosted respetando el orden de arranque), US-CU-18-2 (detener un proyecto SelfHosted o un servicio sin perder datos), US-CU-18-3 (declarar el autoarranque de un proyecto o de un servicio), US-CU-18-4 (reiniciar un contenedor sin construir de nuevo su imagen), US-CU-18-5 (que un servicio materializado y sin arrancar se vea como tal y no como fallo), US-CU-18-6 (que el proyecto siga corriendo cuando un servicio no arranca ni siquiera al recuperar) |
| Componentes esperados en 05 | Capa `Web`, controladores de arranque y parada y barra superior del proyecto; capa `Application`, módulo de servicios y despliegues; capa `Domain`, agregados `Proyectos`, `Despliegues` y `Red`, con el cálculo del orden topológico; capa `Infrastructure`, `Contenedores`. Referencia tentativa |
| Tests previstos en 08 | T-14 (orden de arranque); T-05, T-06, T-07 (conflicto de dirección); T-24 (arranque parcial); T-21 (conservación del montaje al detener); T-44, T-46 (independencia de espera y canal); T-11 (canal no alcanzable) |

Los identificadores de historia de usuario llevan la forma `US-CU-XX-n` y son **provisionales**: la numeración definitiva es potestad de 06-Backlog-Tecnico. La forma se eligió para que ningún identificador emitido acá colisione con la numeración que 06 asigne.

## 10. Notas y supuestos

- **Las tres fases y el alcance del orden.** Obtener la imagen y crear el contenedor son «el despliegue»; ponerlo en marcha es «el arranque». **El orden topológico gobierna la tercera fase**; las dos primeras son independientes entre servicios y no se serializan. RN-14 se lee sobre la puesta en marcha, que es donde la espera tiene sentido: esperar para descargar una imagen no protege de nada.
- **Materializado y sin arrancar es reposo legítimo.** No es un paso transitorio del que haya que salir. Es FA-05, y su consecuencia práctica es que la interfaz no debe presentarlo como fallo ni como operación incompleta.
- **Crear el contenedor nunca sale del producto.** Este caso de uso lo hace en todos los casos, con independencia del origen del servicio; lo único que puede vivir afuera es **construir la imagen**, que es materia de CU-15 y del ejecutor de integración continua.
- El orden de arranque sale del subgrafo de las aristas que declaran espera, no de qué variable se referencia. Es la decisión D-11 y las reglas RN-05 y RN-14 llevan su ampliación marcada `[D-i]`, sin revisar.
- **Brecha declarada, `B-31`: la política de fallo al arrancar tiene seis puntos abiertos.** **Tres los declara la fuente** —`PRODUCT-INTAKE-SelfHosted-Service` §4, nota «Política ante un despliegue que no arranca», que cierra con «tres puntos de esta política quedan sin decidir», y que entró en la **v3.5**—: **(a)** si la recuperación del despliegue anterior es **automática o se ofrece**; **(b)** si la cuarentena apaga el **autoarranque** o la **participación en el arranque**, que son marcas distintas; **(c)** **dónde se avisa** que un servicio quedó en cuarentena. **Tres los levanta la categoría** y ninguna fuente los declara: **(d)** **qué levanta la cuarentena** —si alcanza un despliegue exitoso, si el administrador la retira volviendo a encender el autoarranque, o si son dos actos distintos—; **(e)** si el servicio en cuarentena entra al conjunto de cambios pendientes; **(f)** cómo se representa en el lienzo. **Ninguno se cierra acá**: `FA-06` los declara en su nota y `CA-07` excluye el punto **(b)** de lo que evalúa. La brecha se declara entera en [CU-38](CU-38-Vuelta-A-Un-Despliegue-Anterior.md) §10 y se consolida en [`Especificacion-Funcional.md`](../Especificacion-Funcional.md) §9. **El punto (b) alcanza directamente a este caso de uso**, que es el que gobierna la marca de autoarranque. Destinatario: agente humano del proyecto, y `03-UX-UI-DX` para su representación, donde es `B-UX-31`.
- Detener no borra nada: es la consecuencia observable de la separación entre configuración y ejecución.
- El estado del proyecto SelfHosted se deriva de los despliegues por contenedor y no de un estado propio de la operación.
- La reconciliación del estado real contra el motor pertenece a CU-28 y se ejecuta también en la apertura del proyecto.

## 11. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 2.1 | 2026-08-02 | **Corrección de los hallazgos `P0-01` y `P2-03`** del informe [`B2-Retroalimentacion-Decisiones-2026-08-01-r1.md`](../../Audit/B2-Retroalimentacion-Decisiones-2026-08-01-r1.md), veredicto RECHAZADO. **Absorbida dentro de la versión 2.1 sin subirla y sin archivar de nuevo**, por la política de versionado de `Master-Prompt.md` §5: el documento está en `Propuesto` y la corrección deriva del audit de su propia fase de emisión. **`P0-01`, cabecera:** la trazabilidad upstream citaba **v3.4** sin declarar cuál es la versión vigente. Pasa a declarar que **el intake vigente es v3.7**, verificado en el campo `Versión` de su cabecera el 2026-08-02, y a **separar de qué versión vino cada bloque**: `F-10`, la nota de construir la imagen contra crear el contenedor y `Q-19` entraron en la **v3.4**; **las tres fases del despliegue y la política de fallo al arrancar entraron en la v3.5**, y la copia archivada de la 3.4 **no las contiene** —`grep -c -i "cuarentena"` sobre ella devuelve 0 y `grep -c -i "fases del despliegue"` devuelve 0, contra 4 y 2 sobre el vigente, verificado el 2026-08-02—. **La fila 2.1 del 2026-08-01 de esta tabla no se reescribe**, por `Master-Prompt.md` §5.1: citó la v3.4 para contenido que entró en la v3.5, y el registro de lo que esa emisión escribió se conserva tal como quedó. Es una de las dos citas que el hallazgo enumera como no resolubles, y la que resuelve vive acá y en la cabecera. **`P2-03`, `FA-06` y `CA-07`:** los dos enunciaban «cuarentena con el autoarranque apagado» como dato firme sin declarar que el intake deja abierto si lo que se apaga es el autoarranque o la participación en el arranque. `FA-06` suma la nota que **enuncia el tratamiento y declara aparte los tres puntos abiertos** de la fuente, con lo que bloquea al punto **(b)**; `CA-07` declara que **no evalúa** cuál de las dos marcas se apaga y que se cumple con las dos lecturas. **`P2-03`, §10:** la brecha `B-31` enumeraba dos puntos y ninguno de los tres del intake; pasa a los **seis** con los que quedó, alineada con `CU-38` §10 y con `Especificacion-Funcional.md` §9, con la constancia de que el punto **(b)** alcanza directamente a este caso de uso porque es el que gobierna la marca de autoarranque. **Ningún paso del flujo principal cambia de numeración, ningún actor, precondición, postcondición ni excepción cambia de contenido, ningún criterio de aceptación cambia de identificador ni de lo que exige, y ninguna decisión abierta se cerró: `B-31` se enumera, no se resuelve** |
| 2.1 | 2026-08-01 | **Las tres fases del despliegue, el alcance del orden de arranque y la política de fallo al arrancar**, por la ronda de decisiones del agente humano del proyecto del 2026-07-31 y del 2026-08-01, consolidada en el `PRODUCT-INTAKE-SelfHosted-Service` **v3.4** §4 y §19. Sube **minor**: **la numeración del flujo principal no se toca** —los diez pasos siguen siendo los mismos— y ningún actor, precondición ni postcondición cambia. **§4** antepone la declaración de las tres fases —obtener la imagen, crear el contenedor, poner en marcha—, con las dos primeras como «el despliegue» y la tercera como «el arranque», y **precisa el paso 5**: el orden que el paso 4 calcula gobierna **la puesta en marcha**, mientras que obtener la imagen y crear el contenedor son **independientes entre servicios**. **FA-05 nueva**, el estado **materializado y sin arrancar** como **reposo legítimo** y no paso transitorio. **FA-06 nueva**, la política de fallo al arrancar vista desde el arranque: se informa el error, se recupera el despliegue anterior —que es `FA-05` de CU-38— y, si ése tampoco arranca, **el proyecto SelfHosted sigue corriendo** y el servicio pasa a **cuarentena** con el **autoarranque apagado**. **FA-04** deja de decir «sin reconstruir» a secas y nombra su complemento. **§6** suma la fila del fallo al arrancar con recuperación agotada. **§8** suma `CA-05` a `CA-07`. **§9** suma `RN-40` y dos historias de usuario. **§10** suma las tres notas nuevas y la brecha `B-31`. **Ninguna decisión abierta se cerró acá**; `Q-19` la cerró el intake y este documento la consume. La versión 2.0 queda archivada en `_legacy/2026-08-01/CU-18-Arranque-Y-Parada-Con-Autoarranque-v2.0.md` |
| 2.0 | 2026-07-30 | Migración normativa del conjunto 4.1 al 6.0, fase M4 corte 3, bajo `Rules-Especificacion-Funcional` 4.0, `Vocabulario-Rules` 2.1 y `Migracion-Rules` 1.0. Clasificación **regenerar contenido** por el salto major de la regla que lo gobierna; fuente de contenido: el documento de origen, archivado en `_legacy/2026-07-30/CU-18-Arranque-Y-Parada-Con-Autoarranque-v1.0.md`. Sube **major** porque la nomenclatura anterior deja de cumplir. Cabecera: la etiqueta `Proyecto` pasa a `Producto` sobre el mismo valor, que `Vocabulario-Rules` §3 prohíbe como etiqueta de un plano sobre el valor de otro, y la trazabilidad upstream apunta al `PRODUCT-INTAKE-SelfHosted-Service` renombrado. Sustitución léxica **por ocurrencia** según `Vocabulario-Rules` §9.5 y el plan de migración §3.5, sin ningún reemplazo global de cadena: se revisaron las dos ocurrencias de la cadena `soluci` de este documento y se sustituyó una sola, la que designaba el nivel superior, con su concordancia de género —el nombre del actor primario «Administrador de la solución» de §2, que pasa a «Administrador del producto»—; no hay en este documento ninguna «solución de código» ni ningún uso de prosa de negocio que R2 preserve. La única ocurrencia de la cadena `resoluci` —«re**soluci**ón»— **no es la palabra «solución» y quedó intacta**, con conteo verificado antes y después de la intervención: sustituirlas habría producido la palabra inexistente que la `[5.1]` del framework documenta sobre sí mismo, la que resulta de reemplazar la cadena `soluci` dentro de «re**soluci**ón». De las veintiocho ocurrencias de «proyecto», **ninguna pasó a «proyecto de código»**: dieciocho son «proyecto SelfHosted» y nueve son su forma corta con el contexto ya fijado en la misma sección —el proyecto `ia-local` de CA-01, «el proyecto queda parcialmente activo», «la barra superior del proyecto», el agregado `Proyectos` y «la apertura del proyecto» de §10—, las veintisiete la entidad del dominio; ninguna es el emprendimiento; la restante era la etiqueta de cabecera. La clasificación sigue el intake §12, que declara los tres referentes del término, y el glosario del dominio de `Vision-Producto.md` §9. **Glosario**: §2.1 y §4.2.4 de la regla convierten el vocabulario de la categoría en el artefacto propio y obligatorio `Glosario-Funcional.md`, que hasta la 3.0 era el punto 6 de `Modelo-Conceptual.md` y por lo tanto dependía de que el proyecto de código tuviera persistencia. Este caso de uso **no lo emite**: los términos que acuña o precisa y que aparecen en más de un artefacto de 02 se devolvieron al lote que lo emite, por la regla de inclusión de §3.3, y los que ya declara el glosario del dominio de `Vision-Producto.md` §9 se referencian en lugar de redefinirse, por la regla de no duplicación de la misma sección. Las once secciones obligatorias de §4.2 ya estaban completas y no se agregó ni se quitó ninguna; la tabla de contenido de §4.1 y la sección opcional §13 que §4.3 admite para `web-monolith` quedan como estaban. Ningún propósito, actor, precondición, paso del flujo principal, flujo alternativo, excepción, postcondición, criterio de aceptación, regla de negocio aplicable, historia de usuario prevista, componente esperado, test previsto ni brecha declarada cambió de enunciado: la migración es léxica y de forma de cabecera. Las filas históricas de esta tabla **no se reescribieron**, por `SDD-Development-Guide.md` §VI.2 |
| 1.0 | 2026-07-29 | Corrección absorbida dentro de la versión 1.0, sin subirla y sin archivar, por la política de versionado de `Master-Prompt.md` §5: el documento está en estado `Propuesto` y la corrección proviene del audit de su propia fase de emisión. §2 suma la declaración de que los nombres de los actores no humanos son denominaciones acuñadas por esta categoría y no componentes declarados, con la salvedad de los seis que sí trazan a una fuente. Ningún actor cambia de nombre y ningún flujo se altera: lo que se corrige es que la categoría afirmaba que todo dato trazaba y trece de los diecinueve nombres de actor no humano no lo cumplían. Origen: hallazgo H-04 del informe [Audit/B-02-03-r1.md](../../Audit/B-02-03-r1.md) |
| 1.0 | 2026-07-29 | Versión inicial, derivada de la necesidad de negocio upstream y de las secciones del intake citadas en la cabecera |

## 13. Interacción multiusuario y concurrencia

Sección opcional admitida por §4.3 de `Rules-Especificacion-Funcional.md` para el tipo `web-monolith`. Conserva el número que esa sección le asigna, de modo que la numeración salta del 11 al 13 por construcción de la regla y no por omisión.

El intake declara que las operaciones de despliegue se serializan por proyecto SelfHosted, y que entre validar el conflicto de dirección y registrar la reserva activa no puede colarse otro arranque: la validación y el registro van en la misma transacción de escritura.

