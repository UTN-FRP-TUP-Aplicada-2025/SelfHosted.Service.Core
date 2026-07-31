> **Documento archivado.** Estado: **Superado**. Es la copia completa del estado previo de `RN-38-Unicidad-Del-Puerto-Publicado-En-El-Host.md`, versión **2.0**, archivada el 2026-07-30 por la política de deprecación de `Master-Prompt.md` §5.1 al incorporarse la ronda de decisiones del agente humano del proyecto del 2026-07-30 —`Q-15`, `Q-17`, `Q-27` y la confirmación de `DI-17` a `DI-19`—. La versión vigente es [`RN-38-Unicidad-Del-Puerto-Publicado-En-El-Host.md`](../../RN-38-Unicidad-Del-Puerto-Publicado-En-El-Host.md). **El cuerpo que sigue no se modificó.**
>

---

# RN-38 — Unicidad del puerto publicado en el host

**Proyecto de código:** SelfHosted-Service
**Producto:** SelfHosted Service
**Documento:** RN-38-Unicidad-Del-Puerto-Publicado-En-El-Host.md
**Versión:** 2.0
**Estado:** Propuesto
**Fecha:** 2026-07-30
**Autor:** Analista Funcional Senior (AG-02)

**Trazabilidad upstream:** PRODUCT-INTAKE-SelfHosted-Service anexo E-16, fila RN-38; anexo E-2 §20.2.5, informe de configuración con el hallazgo de colisión; anexo E-7, campo de puertos publicados del candidato y regla RA-07. **Autoría declarada en la fuente:** **[D-i]**, especificación de integración `DI-17`, **sin revisar**. La decisión de principio que la origina —si el producto administra el orden de qué se asigna, es él quien debe impedir asignar un puerto tomado— es del agente humano del proyecto; el reparto en tres niveles de verificación con su límite declarado lo derivó el integrador.

---

## Tabla de contenido

- [1. Enunciado de la regla](#1-enunciado-de-la-regla)
- [2. Justificación](#2-justificación)
- [3. Ámbito de aplicación](#3-ámbito-de-aplicación)
- [4. Consecuencia si se viola](#4-consecuencia-si-se-viola)
- [5. CU afectados](#5-cu-afectados)
- [6. Pruebas que la verifican](#6-pruebas-que-la-verifican)
- [7. Control de cambios](#7-control-de-cambios)

---

## 1. Enunciado de la regla

**Un puerto del host no puede ser publicado por más de un servicio.** El sistema no permite asignar un puerto de host que ya está registrado, en lugar de dejar que el motor de contenedores falle al crear el contenedor.

Dos precisiones que forman parte del enunciado y sin las cuales la regla se aplicaría mal:

1. **No aplica a servicios en macvlan**, que por RN-07 no publican puertos. Un servicio en ese modo de red tiene dirección propia en la red local y no ocupa ningún puerto del host.
2. **Sí aplica a los servicios pendientes de aplicar.** Dos cambios del mismo conjunto pendiente pueden colisionar entre sí antes de desplegarse, y detectarlo al aplicar en lote sería detectarlo tarde: el conjunto de cambios existe justamente para poder revisar antes.

## 2. Justificación

El rol del producto es administrar el orden de qué se asigna. Sin esta regla, la colisión de puerto se descubre **cuando el motor de contenedores falla al crear el contenedor**, que es el peor momento posible por tres razones: el fallo llega después de que el usuario dio por buena la configuración, el mensaje es del motor y no del producto, y en una aplicación en lote deja el proyecto en estado mixto, porque el resultado se determina por contenedor (RN-31).

Es exactamente el mismo argumento con el que RN-03 impide compartir una dirección IP entre servicios activos de proyectos distintos, y sobre el mismo tipo de dato: uno ya persistido, que el sistema puede consultar sin salir a preguntarle a nadie.

**Ninguna de las nueve reglas de puertos y direcciones anteriores cubría este caso**, y verificarlo fue lo que produjo esta regla: RN-03 alcanza direcciones y no puertos; RN-06 alcanza el rango gestionado de direcciones; RN-07 prohíbe publicar en macvlan pero no dice nada de bridge.

## 3. Ámbito de aplicación

**Momento de validación declarado en el anexo E-16:** alta, edición y validación de la configuración.

**El alcance de la verificación tiene tres niveles y hay que distinguirlos, porque el tercero no se implementa:**

| Nivel | Contra qué verifica | Estado |
| --- | --- | --- |
| 1 · El registro del sistema | Los puertos que publican los servicios del producto, aplicados **y pendientes de aplicar** | **Obligatorio y sin costo**: el dato ya está persistido |
| 2 · El motor de contenedores | Los puertos que publican los contenedores del parque, **incluidos los no incorporados a ningún proyecto** | **Obligatorio desde que el descubrimiento los trae** (RA-07). Antes de eso no era posible, porque el modelo del candidato no tenía el dato |
| 3 · El sistema operativo | Los puertos que tiene tomados cualquier proceso del host, contenedorizado o no | **Descartado deliberadamente.** Sostendría una afirmación que caduca en cuanto otro proceso tome el puerto |

**Por qué el nivel 3 se descarta y qué lo reemplaza.** Un tilde que dijera «el puerto está libre en el host» sería falso un segundo después de emitirse, y el usuario le daría un crédito que no merece. Lo reemplaza el **informe que declara su propio alcance**: el informe de validación de la configuración dice contra qué verificó y contra qué no, y esa declaración es verificable mientras la afirmación absoluta no lo sería.

## 4. Consecuencia si se viola

Respuesta `422`, con **el servicio y el proyecto que ya publican ese puerto** y el próximo puerto libre sugerido. Es el mismo patrón de respuesta útil que RN-06 aplica con las direcciones: no alcanza con decir que está tomado, hay que decir por quién y qué usar en su lugar.

En la interfaz el hallazgo aparece en el informe de validación de la configuración marcado como **bloqueante**, y bloquea el paso del servicio a pendiente de aplicar. **No bloquea guardar**: un servicio con una colisión de puerto se puede guardar como borrador y corregir después.

## 5. CU afectados

CU-03, CU-06, CU-08, CU-13, CU-15.

**Por qué CU-24, la aplicación en lote, no está en esta lista.** Podría parecer que lo está, porque la regla alcanza a los servicios pendientes de aplicar. **No lo está, y es coherente con §1:** el momento de validación es la **validación de la configuración**, que ocurre antes de que el servicio entre al conjunto de cambios. Detectar la colisión al aplicar en lote sería detectarla tarde, que es exactamente lo que la segunda precisión del enunciado dice que hay que evitar. La aplicación en lote **no vuelve a evaluar** esta regla.

## 6. Pruebas que la verifican

**Brecha declarada**: el anexo E-22 no declara casos para esta regla, que es nueva. 08-Calidad-Y-Pruebas debe derivar cuatro, cuyas entradas los anexos E-2 y E-7 ya dan:

- Un servicio nuevo que publica el 6379 en un host donde otro servicio del producto ya lo publica. Rechazo `422` con el servicio y el proyecto que lo ocupan (nivel 1).
- El mismo caso contra el candidato `cache` del anexo E-7, que publica el 6379 y **no pertenece a ningún proyecto**. Rechazo `422` (nivel 2).
- Dos servicios del **mismo conjunto de cambios pendientes** que publican el mismo puerto. Rechazo antes de aplicar, no durante.
- Un servicio en macvlan al que se le declara el mismo puerto que otro publica. **No** aplica esta regla: lo rechaza RN-07 por otra causa, y el mensaje debe ser el de RN-07.

Las pruebas se realizan en 08-Calidad-Y-Pruebas. El anexo E-16 declara que el catálogo está pensado para que cada regla se traduzca en una prueba automatizada.

## 7. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 2.0 | 2026-07-30 | Migración normativa del conjunto 4.1 al 6.0, fase M4 corte 3, bajo `Rules-Especificacion-Funcional` 4.0 y `Vocabulario-Rules` 2.1. Clasificación **regenerar contenido** por el salto major de la regla que la gobierna; fuente de contenido: el documento de origen, archivado en `_legacy/2026-07-30/`. Sube **major** porque la nomenclatura anterior deja de cumplir. Cabecera: la etiqueta `Proyecto` pasa a `Producto` sobre el mismo valor, según `Vocabulario-Rules` §3, y la trazabilidad upstream apunta al `PRODUCT-INTAKE-SelfHosted-Service` renombrado. Sustitución léxica **por ocurrencia** según `Vocabulario-Rules` §9.5 y el plan de migración §3.5: **cero ocurrencias de «solución»** y por lo tanto cero sustituciones; tampoco hay «resolución». Las cinco menciones de «producto» que el documento ya traía son de origen y no de esta migración. Las ocho ocurrencias de «proyecto» se clasificaron por referente y **ninguna pasó a «proyecto de código»**: seis son la entidad del dominio —«deja el proyecto en estado mixto» y «servicios activos de proyectos distintos» en §2, «no incorporados a ningún proyecto» en la tabla de niveles de §3, «el servicio y el proyecto que ya publican ese puerto» en §4, y dos más en §6— y quedan intactas según el PRODUCT-INTAKE §12 y el glosario raíz de `Vision-Producto.md` §9; una es el emprendimiento —«es del agente humano del proyecto» en la trazabilidad de la cabecera— y queda a secas y sin calificar; la restante era la etiqueta de cabecera. **El enunciado de la invariante no cambió**: el puerto del host sigue sin poder publicarse por más de un servicio, las dos precisiones del enunciado siguen siendo las mismas, los tres niveles de verificación conservan su reparto y el tercero sigue descartado con el mismo argumento, y `CU-24` sigue fuera de §5 por la razón que la propia sección declara. La migración es léxica y de forma de cabecera |
| 1.0 | 2026-07-29 | Versión inicial. Regla nueva, emitida por §22.3 del documento de trabajo `SDD/Estado/Redefinicion-Servicio.md` v2.0, que la detectó al recorrer un escenario completo de alta y verificar que ninguna de las nueve reglas de puertos y direcciones la cubría. Transcribe el enunciado, el momento de validación y la respuesta que el anexo E-16 del intake v2.4 declara, con el reparto en tres niveles de verificación y el descarte razonado del tercero |
