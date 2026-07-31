# RC-19 — Unicidad del puerto publicado por host

**Proyecto de código:** SelfHosted-Service
**Producto:** SelfHosted Service
**Documento:** RC-19-Unicidad-Del-Puerto-Publicado-Por-Host.md
**Versión:** 2.1
**Estado:** Propuesto
**Fecha:** 2026-07-30
**Autor:** Analista Funcional Senior (AG-02)

**Trazabilidad upstream:** PRODUCT-INTAKE anexo E-16, fila RN-38, y anexo E-2 §20.2.5, informe de configuración con el hallazgo de colisión de puerto; anexo E-7, campo de puertos publicados del candidato y regla RA-07. **Autoría declarada en la fuente:** especificación de integración `DI-17`, **confirmada por el agente humano del proyecto el 2026-07-30**: pasa de `[D-i]` revisable a **`[D]` cerrada**, y esta regla conceptual deja de consumirse declarándola revisable.

**Nota de procedencia distinta de las dieciocho anteriores.** Las reglas conceptuales RC-01 a RC-18 derivan de una restricción declarada en el **anexo E-9** o en su bloque de identidad de objeto. Ésta no: deriva del **catálogo de reglas del anexo E-16**, porque la restricción no está en el esquema. Es coherente y conviene declararlo: el esquema no puede expresarla con una clave única, porque el puerto de host vive dentro del bloque de puertos del servicio y no en una tabla propia. **La restricción es conceptual y su exigibilidad es de aplicación**, no de esquema. Que 05-Arquitectura-Tecnica decida representarla con una tabla, con un índice o con una consulta es su materia y no la de esta regla.

**Vocabulario:** los términos del dominio que esta regla usa se declaran en `../../Glosario-Funcional.md`, el glosario propio de la categoría 02 desde `Rules-Especificacion-Funcional` 4.0 §2.1; los que ya declara el glosario raíz de la cadena, [`Vision-Producto.md`](../../../00-Contexto/Vision-Producto.md) §9, se referencian ahí y no se redefinen. Esta regla no define vocabulario.

---

## Tabla de contenido

- [1. Enunciado](#1-enunciado)
- [2. Entidades involucradas](#2-entidades-involucradas)
- [3. Tipo de restricción](#3-tipo-de-restricción)
- [4. Mecanismo de verificación conceptual](#4-mecanismo-de-verificación-conceptual)
- [5. RN o CU que la justifican](#5-rn-o-cu-que-la-justifican)
- [6. Control de cambios](#6-control-de-cambios)

---

## 1. Enunciado

**Un puerto del host lo publica como máximo un servicio.** No puede haber dos servicios que declaren publicar el mismo puerto de host, y el alcance de «servicio» incluye los que están **pendientes de aplicar** y no sólo los aplicados.

Dos precisiones que forman parte del enunciado:

1. **No alcanza a los servicios en macvlan**, que por RN-07 no publican puertos en el host. Un servicio en ese modo de red tiene dirección propia en la red local y no ocupa ningún puerto del host, de modo que dos servicios en macvlan pueden declarar el mismo puerto de contenedor sin conflicto.
2. **Alcanza a los servicios de proyectos SelfHosted distintos.** El puerto del host es un recurso de la instalación, no del proyecto, igual que la dirección IP de RC-03 y RN-03.

## 2. Entidades involucradas

- Servicio, en su atributo de puertos.

Es una restricción **sobre una sola entidad y entre instancias de ella**, como RC-02 con el nombre del servicio, y no una restricción entre dos entidades.

## 3. Tipo de restricción

Identidad, acotada al ámbito de la instalación y no al del proyecto SelfHosted.

Es el mismo tipo y el mismo ámbito que la exclusividad de dirección entre servicios activos: **el recurso escaso es del host y se administra a nivel instalación**. La diferencia con esa regla es el estado que la activa —la dirección se exige exclusiva entre servicios **activos**, y el puerto entre servicios **declarados**, incluidos los pendientes de aplicar—, y la diferencia tiene su motivo: dos cambios del mismo conjunto pendiente pueden colisionar entre sí antes de desplegarse, y el conjunto de cambios existe justamente para poder revisar antes.

## 4. Mecanismo de verificación conceptual

Se comprueba verificando que ningún puerto de host aparezca en más de un servicio que publique puertos.

**El alcance de la verificación tiene un límite y forma parte de la regla declararlo.** El modelo conoce los puertos que publican los servicios del producto, y —desde que el descubrimiento los trae, por la regla RA-07— también los que publican los contenedores del parque que nadie incorporó a ningún proyecto. **No conoce** los puertos que tenga tomados un proceso del sistema operativo que no corre en un contenedor. Verificar contra el sistema operativo se evaluó y **se descartó**: sostendría una afirmación que caduca en cuanto otro proceso tome el puerto, y el usuario le daría un crédito que no merece. Lo reemplaza el informe de validación de la configuración, que **declara su propio alcance** en lugar de afirmar que el puerto está libre.

## 5. RN o CU que la justifican

- RN-38 Unicidad del puerto publicado en el host.
- RN-07 Prohibición de publicar puertos en macvlan, que es la que acota el alcance de esta regla.
- CU-03, CU-08, CU-13, CU-15, CU-24.

## 6. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 2.1 | 2026-07-30 | **Cambio de estatus de autoría, sin cambio de contenido normativo**, por la confirmación de `DI-17` que el agente humano del proyecto emitió el 2026-07-30 y que el `PRODUCT-INTAKE-SelfHosted-Service` v3.2 consolida en §19. Sube **minor**: **el enunciado, las entidades involucradas, el tipo de restricción, el mecanismo de verificación conceptual y la justificación no cambian una palabra**, y la nota de procedencia distinta de las dieciocho anteriores queda intacta. Lo único que cambia es la cabecera: la regla de negocio de la que deriva, RN-38, deja de sostenerse en una especificación de integración sin revisar. La versión 2.0 queda archivada en `_legacy/2026-07-30/RC-19-Unicidad-Del-Puerto-Publicado-Por-Host-v2.0.md` |
| 2.0 | 2026-07-30 | **Migración normativa 4.1 → 6.0**, fase M4, corte 3, sobre el plan [`Plan-Migracion-4.1-a-6.0.md`](../../../Audit/Plan-Migracion-4.1-a-6.0.md) §3.5 y la fila de este documento de su §4. Clasificación **regenerar contenido**; fuente de contenido: **documento de origen**. Sube **major** porque `Rules-Especificacion-Funcional` pasa de 2.0 a **4.0**. **El enunciado normativo no cambió.** Las seis secciones obligatorias de §4.2.3 —enunciado, entidades involucradas, tipo de restricción, mecanismo de verificación conceptual, RN o CU que la justifican y control de cambios— conservan su texto palabra por palabra: la unicidad del puerto publicado por host se migra en su forma léxica y no en su contenido. **Renombre de vocabulario normativo por la `[5.0]` del framework, por el procedimiento por ocurrencia de `Vocabulario-Rules.md` §9.5 y nunca por reemplazo global de cadena:** la etiqueta de cabecera `**Proyecto:**` sobre un valor de plano producto pasa a `**Producto:**` (1 ocurrencia), y el prefijo del nombre del documento de entrada pasa a `PRODUCT-INTAKE` (1). **Censo de «proyecto» en este archivo: 5 ocurrencias.** Sustituida 1, la etiqueta de cabecera. De las restantes, 4 designan la **entidad del dominio** —el proyecto SelfHosted— y no se tocan. Ninguna designa el emprendimiento y **ninguna se promovió a «proyecto de código»**: promoverla corrompería la especificación. **Barrido negativo del término de nivel superior.** La cadena que la `[5.0]` renombró a «producto» no aparece en este archivo, ni antes ni después: no hubo ninguna sustitución por ese frente y cero apariciones de la palabra inexistente que el reemplazo global produce. **El vocabulario deja de definirse en los artefactos del modelo:** la 4.0 §2.1 crea `Glosario-Funcional.md` como artefacto propio de la categoría, y el bloque de cabecera suma el puntero a él con la regla de no duplicación frente al glosario raíz de [`Vision-Producto.md`](../../../00-Contexto/Vision-Producto.md) §9 (§3.3). La versión 1.0 queda archivada en `_legacy/2026-07-30/`. |
| 1.0 | 2026-07-29 | Versión inicial. Regla conceptual nueva, emitida por §22.4 del documento de trabajo `SDD/Estado/Redefinicion-Servicio.md` v2.0, que verificó que la restricción **no existía**: de las nueve reglas de puertos y direcciones, ninguna cubría la colisión de puerto de host. Deriva de la regla RN-38 del anexo E-16 del intake v2.4. **Declara en su cabecera que su procedencia es distinta de la de las dieciocho anteriores** —el catálogo de reglas y no el esquema relacional— con el motivo, y declara en §4 el límite de alcance de su verificación con el descarte razonado de verificar contra el sistema operativo |
