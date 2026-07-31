# CU-38 — Vuelta a un despliegue anterior

**Proyecto:** SelfHosted Service
**Documento:** CU-38-Vuelta-A-Un-Despliegue-Anterior.md
**Versión:** 1.0
**Estado:** Propuesto
**Fecha:** 2026-07-29
**Autor:** Analista Funcional Senior (AG-02)

**Necesidad de negocio upstream:** [NB-04](../../01-Necesidades-Negocio/Necesidades-De-Negocio/NB-04-Alta-De-Servicio-Sin-Copiar-Y-Adaptar.md)
**Trazabilidad upstream:** SOLUTION-INTAKE anexo E-23 (el bloque de imagen del despliegue y el digesto como identidad real); anexo E-3 (el despliegue con su línea de tiempo); anexo E-17 (la máquina de estados del despliegue); §17.P.11 DA-07, la retención de cincuenta despliegues por servicio; E-16 RN-13, RN-17, RN-24, RN-31, RN-40

> **Este caso de uso depende de una decisión abierta que lo alcanza por entero.** La pendiente `Q-19` del intake §19 es **si esta operación existe**, y está abierta. Se especifica igual, por dos razones: porque §22.2 del documento de entrada la manda emitir, y porque una decisión sobre una operación que nadie especificó se toma peor que una sobre una operación descripta. **Nada de este documento debe leerse como capacidad comprometida hasta que `Q-19` se cierre**, y su estado `Propuesto` lo declara.

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
| Administrador de la solución | Primario | Elige el despliegue al que volver y confirma la operación |
| Módulo de servicios y despliegues | Sistema | Resuelve la imagen del despliegue elegido, crea el despliegue nuevo y sigue su estado |
| Motor de contenedores | Sistema | Crea y arranca el contenedor con la imagen indicada por su digesto |

Los nombres de los actores no humanos son **denominaciones acuñadas por esta categoría**, salvo los seis que trazan a una fuente, entre ellos `Motor de contenedores`. La convención completa está en [Especificacion-Funcional.md](../Especificacion-Funcional.md) §8.

## 3. Precondiciones

- El administrador tiene sesión iniciada (CU-30).
- El servicio tiene al menos un despliegue anterior en su historial (RC-18).
- **El despliegue anterior registró el digesto de la imagen que usó.** Sin ese dato la operación no tiene a qué volver. Depende de `Q-15`, abierta.
- **La imagen de ese digesto sigue existiendo en el almacén de imágenes.** Es lo que la marca de conservada protege (RN-40, CU-37).

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
| Que la operación exista | **Si el producto ofrece volver a un despliegue anterior** | `Q-19` |
| Paso 5 y paso 7 | Si la política de actualización del servicio **pasa a fijada sola** al volver, o si se le pregunta al administrador | `Q-20` |
| Precondición de existencia de la imagen | Si volver a un despliegue **marca su imagen como conservada** automáticamente | `Q-21` |

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
- **Brecha declarada, `Q-19`:** **si esta operación existe**. Es la decisión que alcanza al caso de uso por entero. Destinatario: agente humano del proyecto.
- **Brecha declarada, `Q-15`:** el despliegue debe registrar el **digesto** de la imagen que usó. Sin ese dato no hay a qué volver, y la operación es imposible por más que `Q-19` se cierre en positivo. Destinatario: agente humano del proyecto.
- **Brecha declarada, `Q-20`:** si al volver la política de actualización **pasa a fijada sola o se pregunta**. Sin decidirlo hay un modo de falla silencioso: con política flotante el administrador cree que volvió y el próximo redespliegue lo lleva adelante otra vez. Destinatario: agente humano del proyecto.
- **Brecha declarada, `Q-21`:** si volver a un despliegue **marca su imagen como conservada**, y si el administrador puede marcarla a mano. Sin protección, una limpieza posterior deja esta operación sin imagen a la que volver, que es FA-01. Destinatario: agente humano del proyecto.
- **La dependencia con CU-37 es de doble sentido**, y conviene que quede escrita: esta operación necesita que la imagen siga existiendo, y la limpieza necesita saber cuáles no puede tocar. RN-40 es la regla que sostiene las dos puntas.
- La presentación de la línea de tiempo, de la confirmación previa y del aviso de indisponibilidad pertenece a 03-UX-UI-DX.

## 11. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 1.0 | 2026-07-29 | Versión inicial. Caso de uso nuevo, emitido por §22.2 octava fila del documento de trabajo `SDD/Estado/Redefinicion-Servicio.md` v2.0, que verificó que el producto retiene cincuenta despliegues por servicio, los muestra en la línea de tiempo del panel, y **no puede volver a ninguno**: cero ocurrencias de la operación en toda la especificación. Deriva del anexo E-23 del intake v2.4. **Declara en su cabecera que la pendiente `Q-19` alcanza al caso de uso por entero**, con las dos razones por las que se especifica igual, y declara además `Q-15`, `Q-20` y `Q-21` como brechas con su destinatario. Distingue explícitamente esta operación del redespliegue de CU-13, y declara que vuelve la imagen y no la configuración con el argumento de por qué |
