# CU-38 — Vuelta a un despliegue anterior

**Proyecto de código:** SelfHosted-Service
**Producto:** SelfHosted Service
**Documento:** CU-38-Vuelta-A-Un-Despliegue-Anterior.md
**Versión:** 2.1
**Estado:** Propuesto
**Fecha:** 2026-07-30
**Autor:** Analista Funcional Senior (AG-02)

**Necesidad de negocio upstream:** [NB-04](../../01-Necesidades-Negocio/Necesidades-De-Negocio/NB-04-Alta-De-Servicio-Sin-Copiar-Y-Adaptar.md)
**Trazabilidad upstream:** PRODUCT-INTAKE **v3.2** anexo E-23 (el bloque de imagen del despliegue y el digesto como identidad real, con su tabla de qué quedó decidido); anexo E-3 (el despliegue con su línea de tiempo); anexo E-17 (la máquina de estados del despliegue); §17.P.11 DA-07, la retención de cincuenta despliegues por servicio; E-16 RN-13, RN-17, RN-24, RN-31, RN-40

> **La operación pasó de imposible a posible, y sigue sin estar decidida. Son dos cosas distintas y conviene no confundirlas.** `Q-15` quedó **decidida en positivo el 2026-07-30**: el despliegue registra el digesto de la imagen que usó, de modo que **hay a qué volver** y el obstáculo técnico desapareció. **`Q-19` sigue abierta**, y `Q-19` es **si el producto ofrece esta operación**. Que sea técnicamente posible no la vuelve decidida: el intake v3.2 lo dice con todas las letras —«`Q-15` la volvió técnicamente posible; lo que falta es decidir si se ofrece»—. **Nada de este documento debe leerse como capacidad comprometida hasta que `Q-19` se cierre**, y su estado `Propuesto` lo declara. Siguen abiertas además `Q-20` y `Q-21`.

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

Permitir que el administrador **vuelva a un despliegue anterior de un servicio cuando el último salió mal**, desplegando exactamente la imagen que ese despliegue usó.

**Por qué existe este caso de uso, y por qué su ausencia era llamativa.** El intake retiene **cincuenta despliegues por servicio**, y esos despliegues alimentan la línea de tiempo que el panel muestra. El administrador **los ve y no puede volver a ninguno**: verificado, el redespliegue de CU-13 sólo vuelve a aplicar la configuración actual, que es otra operación. Un producto que muestra cincuenta puntos del pasado y no deja regresar a ninguno propone algo que no cumple.

**Y por qué no alcanza con volver a la etiqueta.** Con política de actualización flotante, la etiqueta de hace dos semanas **apunta hoy a otra imagen**. Volver por etiqueta no vuelve a nada: vuelve a lo último que ese nombre designe. La operación sólo es posible **por digesto**, que es la identidad real de la imagen, y por eso depende de que el despliegue lo haya registrado.

## 2. Actores

| Actor | Tipo | Rol |
| --- | --- | --- |
| Administrador del producto | Primario | Elige el despliegue al que volver y confirma la operación |
| Módulo de servicios y despliegues | Sistema | Resuelve la imagen del despliegue elegido, crea el despliegue nuevo y sigue su estado |
| Motor de contenedores | Sistema | Crea y arranca el contenedor con la imagen indicada por su digesto |

Los nombres de los actores no humanos son **denominaciones acuñadas por esta categoría**, salvo los seis que trazan a una fuente, entre ellos `Motor de contenedores`. La convención completa está en [Especificacion-Funcional.md](../Especificacion-Funcional.md) §8.

## 3. Precondiciones

- El administrador tiene sesión iniciada (CU-30).
- El servicio tiene al menos un despliegue anterior en su historial (RC-18).
- **El despliegue anterior registró el digesto de la imagen que usó.** Sin ese dato la operación no tiene a qué volver. Es dato decidido desde el 2026-07-30 (`Q-15`) y lo escribe el despliegue (CU-13 paso 5, CU-15 paso 6). **Alcanza a los despliegues posteriores a esa decisión**: un historial anterior a que el digesto se registrara no la satisface, y ninguna fuente declara qué hacer con él.
- **La imagen de ese digesto sigue existiendo en el almacén de imágenes.** Es lo que la marca de conservada protege (RN-40, CU-37).
- **El producto ofrece la operación.** Es la precondición que ninguna de las anteriores reemplaza y la única que **no se cumple hoy**: depende de `Q-19`, abierta.

## 4. Flujo principal

1. El administrador abre la línea de tiempo de despliegues del servicio.
2. El sistema lista los despliegues retenidos con su momento, su estado, su actor y **la imagen que usó cada uno, identificada por su digesto**.
3. El administrador elige un despliegue anterior y solicita volver a él.
4. El sistema verifica que la imagen de ese digesto **siga existiendo** en el almacén de imágenes.
5. El sistema presenta qué va a hacer antes de hacerlo: qué imagen va a desplegar, de qué despliegue viene, y que la operación **implica ventana de indisponibilidad** porque reemplaza el contenedor.
6. El administrador confirma.
7. El sistema registra un despliegue nuevo en estado pendiente, que **referencia el digesto de la imagen elegida** y no una etiqueta.
8. El sistema resuelve las referencias de las variables del servicio inmediatamente antes de crear el contenedor (RN-24). **Las variables son las actuales del servicio, no las del despliegue anterior**: ver §10.
9. El sistema crea y arranca el contenedor con la imagen del digesto elegido.
10. El sistema marca el resultado por contenedor y no por operación (RN-31), refleja el estado en el nodo del lienzo, y registra el evento de auditoría declarando a qué despliegue se volvió (RN-17).

**Volver crea un despliegue nuevo, no revive el anterior.** El despliegue al que se volvió sigue en el historial con su estado original, y el nuevo aparece como una entrada más de la línea de tiempo. Es lo que hace que la operación sea auditable y que se pueda volver a volver.

**Lo que este flujo no declara, porque está abierto:**

| Tramo | Qué falta decidir | Pendiente |
| --- | --- | --- |
| Que la operación exista | **Si el producto ofrece volver a un despliegue anterior.** `Q-15` la volvió técnicamente posible el 2026-07-30 y **eso no la decide**: lo que falta es decidir si se ofrece | `Q-19`, **abierta** |
| Paso 5 y paso 7 | Si la política de actualización del servicio **pasa a fijada sola** al volver, o si se le pregunta al administrador | `Q-20`, **abierta**. Depende de `Q-19` |
| Precondición de existencia de la imagen | Si volver a un despliegue **marca su imagen como conservada** automáticamente | `Q-21`, **abierta** |

**Lo que este flujo sí declara desde el 2026-07-30, y antes no podía.** El paso 2 lista la imagen de cada despliegue y el paso 7 referencia un digesto concreto: los dos dependían de que el despliegue registrara el digesto, que es `Q-15`, **decidida en positivo**. La precondición técnica de la operación está cumplida; la decisión de producto, no.

## 5. Flujos alternativos

**FA-01 — La imagen del despliegue elegido ya no existe.**
Disparador: en el paso 4 el digesto no está en el almacén de imágenes, típicamente porque una limpieza la eliminó.
Pasos: el sistema **rechaza la operación declarando el motivo**, y ofrece los despliegues cuya imagen sí existe. No intenta reconstruirla ni volver a descargarla por etiqueta: descargar por etiqueta traería una imagen distinta y presentarla como «el despliegue anterior» sería falso.
Punto de retorno: paso 2.

**Es el caso que RN-40 existe para evitar**, y por eso el vínculo entre este caso de uso y CU-37 es de doble sentido: sin protección de la imagen conservada, esta operación falla justamente en los casos en los que hace falta.

**FA-02 — El servicio tiene política de actualización flotante.**
Disparador: el servicio declara política flotante, de modo que su próximo redespliegue normal volvería a tomar lo último que la etiqueta designe.
Pasos: **sin especificar.** Es `Q-20`. Lo que sí está declarado es el riesgo que la decisión tiene que resolver: si nada cambia la política, el administrador **cree que volvió** y el próximo redespliegue lo lleva adelante otra vez, sin que nada se lo advierta. Es un modo de falla silencioso y es el argumento de que la decisión no puede quedar sin tomar.
Punto de retorno: no aplica mientras `Q-20` esté abierta.

**FA-03 — El servicio tiene más de una réplica.**
Disparador: el servicio declara más de una réplica.
Pasos: se registra un despliegue por réplica con la misma imagen, cada uno con su propio estado y su propia reserva de dirección cuando corresponde (RN-18), igual que en CU-13.
Punto de retorno: paso 10.

**FA-04 — La configuración del servicio cambió desde el despliegue elegido.**
Disparador: el servicio tiene cambios de configuración aplicados posteriores al despliegue al que se quiere volver.
Pasos: el sistema **vuelve la imagen y no la configuración**, y lo declara en el paso 5 antes de confirmar. Volver la configuración es otra operación y este caso de uso no la ofrece: ver §10.
Punto de retorno: paso 5.

## 6. Excepciones y errores

| Código | Causa | Respuesta del sistema |
| --- | --- | --- |
| `404` del despliegue | El despliegue elegido ya no está en el historial retenido | Rechazo. La retención declarada es de cincuenta despliegues por servicio, y más allá de eso el historial no existe |
| `409` de imagen ausente | El digesto del despliegue elegido no está en el almacén de imágenes | Rechazo con el motivo escrito y con los despliegues a los que sí se puede volver (FA-01) |
| Fallo del despliegue nuevo | El contenedor no arranca con la imagen anterior | El despliegue nuevo queda **fallido con su error**, por contenedor y no por operación (RN-31). El estado anterior no se restaura solo: volver es una operación como cualquier otra y puede fallar |

## 7. Postcondiciones

**En caso de éxito:** el servicio corre con la imagen que usaba el despliegue elegido, identificada por su digesto; existe un despliegue **nuevo** en la línea de tiempo que declara de qué despliegue vino; el despliegue anterior sigue en el historial con su estado original; existe el evento de auditoría declarando a qué despliegue se volvió y quién lo pidió.

**En caso de fallo:** el despliegue nuevo queda registrado como fallido con su error, y el servicio queda en el estado en el que el fallo lo dejó, que es el comportamiento de cualquier despliegue (RN-31). El historial no se modifica.

## 8. Criterios de aceptación

| ID | Given | When | Then |
| --- | --- | --- | --- |
| CA-01 | Un servicio con tres despliegues en su historial, cada uno con el digesto de su imagen registrado | El administrador abre la línea de tiempo | Los tres aparecen con su momento, su estado, su actor y **la imagen que usó cada uno** |
| CA-02 | Un servicio cuyo último despliegue falló, con un despliegue anterior sano cuya imagen sigue en el almacén | El administrador vuelve a ese despliegue | Se crea un despliegue **nuevo** con el **digesto** del anterior, el contenedor arranca con esa imagen, y el despliegue anterior sigue en el historial sin modificarse |
| CA-03 | Un servicio con etiqueta flotante que se desplegó dos veces con contenidos de imagen distintos | El administrador vuelve al primero | Se despliega la imagen del **primer digesto** y no la que la etiqueta designa hoy |
| CA-04 | Un despliegue anterior cuya imagen fue eliminada del almacén | El administrador intenta volver a él | Rechazo con el motivo escrito. El sistema **no** descarga por etiqueta una imagen distinta presentándola como el despliegue anterior, y ofrece los despliegues a los que sí se puede volver |
| CA-05 | Un servicio con cambios de configuración posteriores al despliegue elegido | El administrador vuelve a ese despliegue | El sistema declara antes de confirmar que **vuelve la imagen y no la configuración** |
| CA-06 | Cualquier vuelta exitosa | La operación termina | El evento de auditoría declara a qué despliegue se volvió, con qué digesto y quién lo pidió |

## 9. Trazabilidad

| Dimensión | Referencia |
| --- | --- |
| Necesidad de negocio | [NB-04](../../01-Necesidades-Negocio/Necesidades-De-Negocio/NB-04-Alta-De-Servicio-Sin-Copiar-Y-Adaptar.md) |
| Reglas de negocio aplicables | RN-13, RN-17, RN-24, RN-31, RN-40. Reglas conceptuales: RC-18, que conserva el historial de despliegues y es la que vuelve posible esta operación |
| Historias de usuario a generar en 06 | US-CU-38-1 (ver qué imagen usó cada despliegue del historial), US-CU-38-2 (volver a un despliegue anterior), US-CU-38-3 (saber antes de confirmar que vuelve la imagen y no la configuración), US-CU-38-4 (enterarse de que la imagen de un despliegue ya no está disponible, con los que sí lo están) |
| Componentes esperados en 05 | Capa `Web`, línea de tiempo del panel lateral del servicio y su controlador; capa `Application`, módulo de servicios y despliegues; capa `Domain`, agregado `Despliegues`; capa `Infrastructure`, `Contenedores`. Referencia tentativa |
| Tests previstos en 08 | **Ninguno declarado en el anexo E-22**, que es anterior a este caso de uso. 08-Calidad-Y-Pruebas debe derivar los seis criterios de aceptación de §8, con CA-03 como el que distingue esta operación de un redespliegue por etiqueta |

Los identificadores de historia de usuario llevan la forma `US-CU-XX-n` y son **provisionales**: la numeración definitiva es potestad de 06-Backlog-Tecnico.

## 10. Notas y supuestos

- **En qué se diferencia del redespliegue de CU-13, que es la confusión más probable.** El redespliegue vuelve a aplicar **la configuración actual** del servicio y toma la imagen que su origen designe hoy. Esta operación toma **una imagen concreta del pasado**, por su digesto, y la configuración actual. Son dos operaciones distintas y la interfaz debe nombrarlas distinto.
- **Vuelve la imagen y no la configuración, y es deliberado.** Volver la configuración exigiría versionar la configuración completa de cada despliegue y decidir qué pasa con lo que cambió en el medio —una variable nueva, un montaje que ya no existe, una dirección reasignada—. Es otro alcance y otro producto. Lo que este caso de uso resuelve es el problema concreto que el administrador tiene: **la versión nueva salió mal y quiere la anterior corriendo**.
- **Brecha declarada, `Q-19`, la que alcanza al caso de uso por entero: si esta operación existe.** **Sigue abierta** después de la ronda del 2026-07-30, y conviene decir por qué no se cerró por arrastre: lo que esa ronda cerró fue `Q-15`, que es la **condición** de esta operación y no su respuesta. El intake v3.2 corrige explícitamente la formulación anterior, que decía que «las siete se cierran con `Q-15`». Destinatario: agente humano del proyecto.
- **Brecha cerrada, `Q-15`:** el despliegue **registra el digesto** de la imagen que usó. Quedó decidida en positivo el 2026-07-30 y con ella la operación pasa de imposible a posible. La fila se conserva en lugar de borrarse porque otros artefactos citan el identificador. **No cierra `Q-19`.**
- **Brecha declarada, `Q-20`:** si al volver la política de actualización **pasa a fijada sola o se pregunta**. Sin decidirlo hay un modo de falla silencioso: con política flotante el administrador cree que volvió y el próximo redespliegue lo lleva adelante otra vez. Sigue abierta y depende de `Q-19`. Destinatario: agente humano del proyecto.
- **Brecha declarada, `Q-21`:** si volver a un despliegue **marca su imagen como conservada**, y si el administrador puede marcarla a mano. Sin protección, una limpieza posterior deja esta operación sin imagen a la que volver, que es FA-01. Sigue abierta. Destinatario: agente humano del proyecto.
- **Brecha nueva, del alcance temporal de la precondición.** El digesto se registra desde que `Q-15` se aplique; los despliegues que ya estén en el historial retenido cuando eso ocurra **no lo tienen**, y ninguna fuente declara si esta operación los oculta, los muestra deshabilitados con su motivo, o los ignora. Es el mismo problema que FA-01 resuelve para la imagen ausente, aplicado al dato ausente. Destinatario: agente humano del proyecto, junto con `Q-19`.
- **La dependencia con CU-37 es de doble sentido**, y conviene que quede escrita: esta operación necesita que la imagen siga existiendo, y la limpieza necesita saber cuáles no puede tocar. RN-40 es la regla que sostiene las dos puntas.
- La presentación de la línea de tiempo, de la confirmación previa y del aviso de indisponibilidad pertenece a 03-UX-UI-DX.

## 11. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 2.1 | 2026-07-30 | **La operación pasa de imposible a posible y sigue sin estar decidida**, por la ronda de decisiones del agente humano del proyecto del 2026-07-30 consolidada en el `PRODUCT-INTAKE-SelfHosted-Service` v3.2, §19 y anexo E-23. Sube **minor**: ningún flujo, actor, excepción, postcondición ni criterio de aceptación cambia de contenido, y la numeración del flujo principal se conserva. **`Q-15` decidida en positivo**: la precondición de §3 pasa de «depende de `Q-15`, abierta» a dato decidido con su escritor —CU-13 paso 5 y CU-15 paso 6—, y §4 declara que los pasos 2 y 7 ya tienen el digesto del que dependían. **`Q-19` NO se cierra por arrastre y el documento lo declara con precisión**: la nota de cabecera separa explícitamente «técnicamente posible» de «decidida», citando la corrección que el intake v3.2 hace de su propia formulación anterior —`Q-15` es **condición** de las otras seis, no su respuesta—; la fila de `Q-19` de la tabla de §4 lo repite; y §3 suma la precondición «el producto ofrece la operación», que es la única que **no se cumple hoy**. `Q-20` y `Q-21` quedan igualmente abiertas y se declaran como tales. **§10** convierte la brecha de `Q-15` en brecha cerrada conservando su fila, reescribe la de `Q-19` con el motivo de por qué no cerró, y **abre una brecha nueva**: los despliegues ya retenidos cuando `Q-15` se aplique **no tienen digesto**, y ninguna fuente declara si esta operación los oculta, los deshabilita con su motivo o los ignora. **Ninguna decisión abierta se cerró acá y ningún dato faltante se completó con un valor plausible.** La versión 2.0 queda archivada en `_legacy/2026-07-30/CU-38-Vuelta-A-Un-Despliegue-Anterior-v2.0.md` |
| 2.0 | 2026-07-30 | **Migración normativa 4.1 → 6.0**, corte 3 de la fase M4, sobre el plan [`Plan-Migracion-4.1-a-6.0.md`](../../Audit/Plan-Migracion-4.1-a-6.0.md). Clasificación **regenerar contenido**, por el salto de `Rules-Especificacion-Funcional` 2.0 → 4.0. **Fuente de contenido: documento de origen**, más el [PRODUCT-MANIFEST](../../../Intake/PRODUCT-MANIFEST-SelfHosted-Service.md) §1.3 para el único campo de cabecera que se suma. **Las cuatro brechas abiertas `Q-15`, `Q-19`, `Q-20` y `Q-21` siguen abiertas y ninguna se completó con un valor plausible**: la nota de cabecera que declara que `Q-19` —si esta operación existe— alcanza al caso de uso por entero, y que nada de este documento debe leerse como capacidad comprometida, queda literal. Ningún flujo, actor, criterio de aceptación, excepción ni tramo declarado abierto cambia de contenido: lo que cambia es la nomenclatura. **Vocabulario (`[5.0]`)**: la etiqueta de cabecera `**Proyecto:**` llevaba un valor del plano de negocio y pasa a `**Producto:**`, porque `Vocabulario-Rules.md` §3 prohíbe la etiqueta de un plano sobre el valor de otro; se suma `**Proyecto de código:**` con el `Nombre-Proyecto-Codigo` declarado, que §4.1 de la regla vigente exige y que este documento no declaraba; `SOLUTION-INTAKE` pasa a `PRODUCT-INTAKE`; y «solución» pasa a «producto» en **1 ocurrencia**, la del nombre del actor primario. **Las 4 apariciones de «producto» que este documento ya tenía no se tocaron**: fueron escritas así desde su emisión, porque es posterior a la `[5.0]`. **Las 4 ocurrencias de «proyecto» son todas «agente humano del proyecto» en §10 y quedan a secas**, por su referente de emprendimiento: este documento no tiene ninguna ocurrencia de la entidad del dominio, y la constancia se deja escrita para que el barrido no la lea como omisión. La sustitución se hizo por el procedimiento por ocurrencia de `Vocabulario-Rules.md` §9.5 y **nunca por reemplazo global de cadena**. **Glosario (`[5.1]`)**: por §2.1 y §4.2.4 de la regla vigente, `Glosario-Funcional.md` pasa a ser artefacto propio y obligatorio y deja de ser el punto 6 de `Modelo-Conceptual.md`; lo emite un lote posterior de esta migración. Los términos que este caso de uso acuña o precisa —«digesto» como identidad real frente a la «etiqueta» reasignable, «política de actualización flotante», «volver a un despliegue anterior» como operación distinta del redespliegue de CU-13, y «conservada» en su papel de precondición— se devolvieron con su definición tal como este documento las usa. Ninguna fila anterior de este control de cambios se reescribió (`SDD-Development-Guide.md` §VI.2) y el bloque de procedencia del destino no se tocó: sigue declarando 4.1, y cerrarlo es trabajo de M5 |
| 1.0 | 2026-07-29 | Versión inicial. Caso de uso nuevo, emitido por §22.2 octava fila del documento de trabajo `SDD/Estado/Redefinicion-Servicio.md` v2.0, que verificó que el producto retiene cincuenta despliegues por servicio, los muestra en la línea de tiempo del panel, y **no puede volver a ninguno**: cero ocurrencias de la operación en toda la especificación. Deriva del anexo E-23 del intake v2.4. **Declara en su cabecera que la pendiente `Q-19` alcanza al caso de uso por entero**, con las dos razones por las que se especifica igual, y declara además `Q-15`, `Q-20` y `Q-21` como brechas con su destinatario. Distingue explícitamente esta operación del redespliegue de CU-13, y declara que vuelve la imagen y no la configuración con el argumento de por qué |
