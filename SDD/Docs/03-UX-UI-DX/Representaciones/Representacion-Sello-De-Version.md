# Representación — Sello de versión y detalle de diagnóstico

**Proyecto de código:** SelfHosted-Service
**Producto:** SelfHosted Service
**Documento:** Representacion-Sello-De-Version.md
**Versión:** 2.0
**Estado:** Propuesto
**Fecha:** 2026-07-30
**Autor:** UX/UI Designer + Frontend Lead (AG-03)
**Variante:** UX/UI

---

## Tabla de contenido

- [1. Concepto representado y propósito](#1-concepto-representado-y-propósito)
- [2. Apariencia esquemática](#2-apariencia-esquemática)
- [3. Variantes](#3-variantes)
- [4. Datos que consume](#4-datos-que-consume)
- [5. Restricciones de accesibilidad](#5-restricciones-de-accesibilidad)
- [6. Reutilización](#6-reutilización)
- [7. Control de cambios](#7-control-de-cambios)

---

## 1. Concepto representado y propósito

El **sello de versión** es la declaración que una instancia desplegada hace de qué versión de sí misma está corriendo. En este producto tiene un peso desproporcionado respecto de su tamaño visual, y conviene decir por qué: SelfHosted Service se entrega como imagen de contenedor, cada etapa cerrada y fusionada recibe su etiqueta, y volver a una demostración anterior es desplegar la imagen de esa etiqueta. Una instancia sin versión visible obliga a que toda conversación sobre ella empiece por averiguar cuál es, y en un producto que no tiene soporte al que derivar, el reporte de problema es el propio administrador hablando consigo mismo unas semanas después.

El **detalle de diagnóstico** es el disclosure que expone el contrato completo y lo copia en un solo gesto. Existe porque pedirle a alguien que transcriba a mano un identificador de construcción es garantizar el error de transcripción.

Los dos materializan `Design-Rules-Identidad-De-Version.md` §4.1 a §4.5.

---

## 2. Apariencia esquemática

```text
    Sello, al pie de la superficie que lo aloja:

        ...contenido de la superficie...

                    <version legible>  [preliminar]
                     ^                  ^
                     |                  +-- distintivo, solo si el artefacto
                     |                      no proviene de una linea estable
                     +-- abre el detalle


    Detalle expandido:

        +--------------------------------------------------+
        |  Version              | <version legible>        |
        |  Construccion         | <identificador opaco>    |
        |  Origen               | <estado del origen>      |
        |                                                  |
        |                       [ Copiar diagnostico ]     |
        +--------------------------------------------------+
```

El sello es información, no acción, y no compite visualmente con nada. Se dibuja al pie precisamente porque su valor está en estar siempre disponible sin reclamar atención. Su jerarquía tipográfica es la más baja de la escala; su contraste, no.

---

## 3. Variantes

| Variante | Condición de uso | Diferencias esperadas |
| --- | --- | --- |
| Versión publicada | La cadena legible está presente y el artefacto no es preliminar | El sello exhibe la cadena, sin adornos ni distintivo |
| Versión preliminar | El contrato declara que el artefacto no proviene de una línea de publicación estable | El sello exhibe la cadena más un distintivo contiguo, con **texto explícito** y el estado semántico de atención. Cambia por completo la lectura de cualquier comportamiento anómalo, y por eso no se comunica sólo por color |
| Origen indeterminado | La identidad no pudo derivarse del proceso de construcción | El sello **reemplaza la cadena por un marcador textual explícito**. No se disimula con un espacio en blanco ni con una versión inventada. Es el estado esperado en ejecución local y el estado alarmante en una instancia desplegada; distinguir los dos casos es responsabilidad de quien lee, y para eso el marcador tiene que ser visible |
| Detalle colapsado | Estado inicial del disclosure | Sólo el sello |
| Detalle expandido | El administrador lo abrió desde el sello | Filas de clave y valor con el contrato completo, más la acción de copiado |
| Detalle copiado | Se ejecutó el copiado | Confirmación efímera, anunciada como región activa |

---

## 4. Datos que consume

El contrato de identidad de versión de `Design-Rules-Identidad-De-Version.md` §2, con el estado real de cada campo en este producto.

| Campo del contrato | Qué hace en la interfaz | Estado en las fuentes de este producto |
| --- | --- | --- |
| Cadena legible de la versión | Es el dato principal y el único obligatorio. Se muestra tal como llega | El intake §17.P.7 declara versionado semántico con la versión derivada de los mensajes de confirmación desde la etiqueta anterior, calculada en el pipeline, y declara que permanece en la serie inicial hasta la primera entrega completa. **No declara cómo llega esa cadena al punto de composición del sistema** |
| Identificador de construcción | Amplía el diagnóstico cuando dos instancias comparten cadena legible | **Sin declarar** |
| Marca de artefacto preliminar | Habilita el distintivo | **Sin declarar** como campo. Es derivable de que la versión permanezca en la serie inicial, pero derivarlo sería inventar el contrato |
| Marca de origen indeterminado | Habilita el marcador | **Sin declarar** |

Las cuatro ausencias se consolidan en la brecha `B-UX-07`, con destinatario en `05-Arquitectura-Tecnica`, que fija el punto de composición del contrato, y en `09-Devops`, que produce el dato.

**Cuatro reglas de la frontera que sí son de diseño y que se declaran acá.**

1. La superficie **no participa del cálculo**. Recibe el contrato ya resuelto y no compone, no transcribe y no reformatea la cadena.
2. La superficie **no distingue entornos por su cuenta**. Si un entorno debe mostrarse distinto, esa distinción llega como campo del contrato y no como condicional en la vista. En este producto hay dos entornos declarados —desarrollo dentro del entorno contenedorizado y producción como contenedor en el servidor, sin ambientes intermedios— y ninguna superficie los infiere.
3. **La cadena que se muestra al administrador y la que se copia en el diagnóstico son la misma.** Dos representaciones del mismo artefacto obligan a traducir en el peor momento.
4. **No existe superficie que permita fijar la versión a mano.** El contrato es de sólo lectura para la interfaz.

---

## 5. Restricciones de accesibilidad

Piso WCAG 2.2 nivel AA.

- **Contraste del sello: 4.5:1, sin excepción.** Es la restricción más fácil de violar de toda la interfaz, porque la jerarquía tipográfica más baja invita a bajar también el contraste. Información secundaria no significa información ilegible, y `Design-Rules-Identidad-De-Version.md` §10 la enumera como anti-patrón.
- **El distintivo de preliminar y el marcador de origen indeterminado son textuales por definición.** El color es refuerzo, nunca el único canal.
- El detalle de diagnóstico es un **disclosure operable por teclado** que declara su estado de apertura.
- El sello **no es un elemento interactivo salvo que abra el detalle**; cuando lo hace, expone foco visible y el rol que corresponde a un control.
- **La confirmación de copiado se anuncia como región activa.** Un cambio visual efímero no alcanza: quien copió necesita saber que copió.
- Cuando el sello vive en el shell de acceso, se ubica dentro de la tarjeta y después de la acción primaria en el orden de lectura, para que no se interponga en el recorrido por teclado del formulario.

---

## 6. Reutilización

Las **dos ubicaciones obligatorias** que `Design-Rules-Identidad-De-Version.md` §4.2 exige. No son dos lugares convenientes: son dos poblaciones distintas, y omitir cualquiera de las dos deja a una de ellas sin el dato.

| Superficie | Wireframe | Por qué es obligatoria |
| --- | --- | --- |
| Acceso al panel | [`Wireframes-Acceso-Al-Panel.md`](../Wireframes/Wireframes-Acceso-Al-Panel.md) | Es la única información disponible sobre la instancia **antes de autenticarse**. Mostrarlo sólo adentro deja sin dato a quien no puede entrar, que es justamente el caso en el que más se lo necesita |
| Configuración del sistema | [`Wireframes-Configuracion-Del-Sistema.md`](../Wireframes/Wireframes-Configuracion-Del-Sistema.md) | Es la superficie del sistema en funcionamiento alcanzable desde la navegación. Mostrarlo sólo antes de entrar deja sin dato a quien ya está operando. Aloja además el detalle de diagnóstico completo |

La superficie de aprovisionamiento inicial comparte composición con la de acceso, pero **no aloja el sello**: no es una de las dos ubicaciones obligatorias, y en el primer arranque el administrador todavía no tiene nada que diagnosticar. Se declara la decisión para que la ausencia no se lea como omisión.

---

## 7. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 2.0 | 2026-07-30 | Migración normativa del conjunto 4.1 al 6.0, fase M4 corte 4, bajo `Rules-UX-UI-DX` 4.0, `Vocabulario-Rules` 2.1 y `Migracion-Rules` 1.0. Clasificación **regenerar contenido** por el salto major 2.0 → 4.0 de la regla que gobierna la categoría; fuente de contenido: **el documento de origen**, archivado sin modificar en `_legacy/2026-07-30/Representacion-Sello-De-Version-v1.0.md`. Sube **major** porque la nomenclatura anterior deja de cumplir. **Cabecera:** se suma el campo `Proyecto de código` con el valor `SelfHosted-Service`, que §4.1 de la regla 4.0 exige por ser ésta una categoría de nivel proyecto de código (`Vocabulario-Rules` §4 R3), y la etiqueta `Proyecto` pasa a `Producto` sobre su valor de origen `SelfHosted Service`, porque `Vocabulario-Rules` §3 prohíbe la etiqueta de un plano de identidad sobre el valor de otro; los dos conviven porque §4.1 exige el primero y `Migracion-Rules` §4.2 prohíbe perder el segundo. Se conserva el campo `Variante`. **Sustitución léxica por ocurrencia** según `Vocabulario-Rules` §9.5 y el plan de migración §3.5, y nunca por reemplazo global de cadena: las cuatro ocurrencias de «solución» designaban el nivel superior; **tres se sustituyeron por «producto» con su concordancia de género** —«en esta solución» a «en este producto» en la entrada de §4, «Estado en las fuentes de esta solución» a «de este producto» en la cabecera de su tabla, y «En esta solución hay dos entornos declarados» a «En este producto» en la regla de frontera 2—, y **la cuarta se preservó** porque vive en la fila del 2026-07-29 de este mismo control de cambios, que `SDD-Development-Guide` §VI.2 prohíbe reescribir. **Cero** ocurrencias de la cadena `resoluci`, verificado por barrido. La única ocurrencia de «proyecto» era la etiqueta de cabecera; **ninguna pasó a «proyecto de código»** dentro del cuerpo. **Glosario:** desde la 4.0 `Glosario-UX.md` es artefacto obligatorio para los ocho tipos D8 y §6 verifica su existencia y su completitud; los términos que esta representación acuña —sello de versión, detalle de diagnóstico, distintivo de artefacto preliminar, marcador de origen indeterminado, ubicación obligatoria del sello— se devolvieron al lote que emite ese glosario y acá no se redefinen, y los que ya declaran [`Vision-Producto`](../../00-Contexto/Vision-Producto.md) §9 y [`Glosario-Funcional`](../../02-Especificacion-Funcional/Glosario-Funcional.md) se referencian sin duplicarse. **Ningún concepto, variante, campo del contrato, regla de frontera, restricción de accesibilidad ni ubicación obligatoria cambió de contenido**: la migración es léxica y de forma de cabecera. Los dos bloques ASCII de §2 no contenían ninguna palabra a migrar y quedaron intactos, con su ancho de caja preservado. Las filas anteriores de este control de cambios no se reescribieron. El bloque de procedencia del destino sigue declarando la 4.1 y no se toca: es trabajo de M5. Origen: [`Plan-Migracion-4.1-a-6.0.md`](../../Audit/Plan-Migracion-4.1-a-6.0.md) §3.5 y §4 |
| 1.0 | 2026-07-29 | Versión inicial. Materializa los patrones §4.1 a §4.5 de `Design-Rules-Identidad-De-Version.md`: sello, ubicación obligatoria, distintivo de artefacto preliminar, detalle de diagnóstico con copiado en un solo gesto y marcador de origen indeterminado. Declara los cuatro campos del contrato con su estado real en las fuentes de esta solución, que no declaran ninguno de los cuatro más allá del esquema de versionado del pipeline, y consolida las ausencias en la brecha `B-UX-07`. Declara las cuatro reglas de frontera que sí son de diseño y las dos ubicaciones obligatorias, con la exclusión explícita de la superficie de aprovisionamiento inicial |
