# RC-19 — Unicidad del puerto publicado por host

**Proyecto:** SelfHosted Service
**Documento:** RC-19-Unicidad-Del-Puerto-Publicado-Por-Host.md
**Versión:** 1.0
**Estado:** Propuesto
**Fecha:** 2026-07-29
**Autor:** Analista Funcional Senior (AG-02)

**Trazabilidad upstream:** SOLUTION-INTAKE anexo E-16, fila RN-38, y anexo E-2 §20.2.5, informe de configuración con el hallazgo de colisión de puerto; anexo E-7, campo de puertos publicados del candidato y regla RA-07. **Autoría declarada en la fuente:** **[D-i]**, especificación de integración `DI-17`, **sin revisar**.

**Nota de procedencia distinta de las dieciocho anteriores.** Las reglas conceptuales RC-01 a RC-18 derivan de una restricción declarada en el **anexo E-9** o en su bloque de identidad de objeto. Ésta no: deriva del **catálogo de reglas del anexo E-16**, porque la restricción no está en el esquema. Es coherente y conviene declararlo: el esquema no puede expresarla con una clave única, porque el puerto de host vive dentro del bloque de puertos del servicio y no en una tabla propia. **La restricción es conceptual y su exigibilidad es de aplicación**, no de esquema. Que 05-Arquitectura-Tecnica decida representarla con una tabla, con un índice o con una consulta es su materia y no la de esta regla.

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
| 1.0 | 2026-07-29 | Versión inicial. Regla conceptual nueva, emitida por §22.4 del documento de trabajo `SDD/Estado/Redefinicion-Servicio.md` v2.0, que verificó que la restricción **no existía**: de las nueve reglas de puertos y direcciones, ninguna cubría la colisión de puerto de host. Deriva de la regla RN-38 del anexo E-16 del intake v2.4. **Declara en su cabecera que su procedencia es distinta de la de las dieciocho anteriores** —el catálogo de reglas y no el esquema relacional— con el motivo, y declara en §4 el límite de alcance de su verificación con el descarte razonado de verificar contra el sistema operativo |
