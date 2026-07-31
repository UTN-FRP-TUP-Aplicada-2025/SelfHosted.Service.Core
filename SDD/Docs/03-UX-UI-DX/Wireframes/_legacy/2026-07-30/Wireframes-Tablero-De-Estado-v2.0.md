> **Documento archivado.** Estado: **Superado**. Es la copia completa del estado previo de `Wireframes-Tablero-De-Estado.md`, versión **2.0**, archivada el 2026-07-30 por la política de deprecación de `Master-Prompt.md` §5.1, al propagarse la retroalimentación del paso 6 de la Fase B2: las decisiones `Q-15`, `Q-17` y `Q-27` del agente humano del proyecto del 2026-07-30, que cierran la brecha `B-UX-30`. La versión vigente es [`Wireframes-Tablero-De-Estado.md`](../../Wireframes-Tablero-De-Estado.md). **El cuerpo que sigue no se modificó.**
>

---

# Wireframes — Tablero de estado

**Proyecto de código:** SelfHosted-Service
**Producto:** SelfHosted Service
**Documento:** Wireframes-Tablero-De-Estado.md
**Versión:** 2.0
**Estado:** Propuesto
**Fecha:** 2026-07-30
**Autor:** UX/UI Designer + Frontend Lead (AG-03)
**Variante:** UX/UI

---

## Tabla de contenido

- [1. Pantalla y propósito](#1-pantalla-y-propósito)
- [2. Layout](#2-layout)
- [3. Componentes principales](#3-componentes-principales)
  - [3.1 Lo que las restricciones de implementación prohíben ofrecer](#31-lo-que-las-restricciones-de-implementación-prohíben-ofrecer)
- [4. Interacciones](#4-interacciones)
- [5. Estados](#5-estados)
  - [5.1 Brecha `B-UX-19`](#51-brecha-b-ux-19)
- [6. Versión responsive](#6-versión-responsive)
- [7. Notas de implementación](#7-notas-de-implementación)
- [8. Trazabilidad](#8-trazabilidad)
- [9. Control de cambios](#9-control-de-cambios)

---

## 1. Pantalla y propósito

**Nombre canónico de la superficie: `Tablero de estado`** (`SUP-09`).

Su tarea es responder una pregunta concreta: si la presión de memoria del servidor viene de un servicio concreto. Lo hace en **tres capas** —servidor, proyectos SelfHosted y contenedores del proyecto elegido—, que es la disposición que el anexo E-18 declara para el tablero del segundo alcance.

Corresponde a la ruta `/dashboard` del mapa de navegación. Es la superficie con las restricciones de implementación más explícitas del intake, y esas restricciones **acotan lo que la interfaz puede ofrecer**.

---

## 2. Layout

Disposición transcripta del anexo E-18, desprovista de los valores de ejemplo. Tres bloques apilados, en orden de agregación decreciente.

```text
+-----------------------------------------------------------------------+
| [=] <titulo del panel>      <identidad>  [Cambiar contrasena] [Salir] |
+---------+-------------------------------------------------------------+
| Lienzo  | +- Servidor ---------------------------------------------+ |
| Logs    | | CPU [====    ] <x>%   RAM [======  ] <u>/<t>           | |
| Metr.   | | SWAP [==      ] <u>/<t>  Disco [==    ] <u>/<t>        | |
| Ajustes | | Contenedores <n> activos / <N> · <m> imagenes          | |
|         | +---------------------------------------------------------+ |
|         | +- Proyectos ---------------------------------------------+ |
|         | | (i) <nombre>   <n>/<N> activos  CPU <x>%  RAM <y>       | |
|         | |                                        [ abrir lienzo ] | |
|         | | (i) <nombre>   <n>/<N> activos  CPU <x>%  RAM <y>       | |
|         | |                                        [ abrir lienzo ] | |
|         | +---------------------------------------------------------+ |
|         | +- Contenedores de "<proyecto>" -------------------------+ |
|         | | <servicio> (i)<est> <x>%  <u>/<M>  <antig>             | |
|         | |                              [ registro ] [ reiniciar ] | |
|         | | <servicio> (i)<est> <x>%  <u>/<M>  <antig>             | |
|         | |                              [ registro ] [ reiniciar ] | |
|         | +---------------------------------------------------------+ |
+---------+-------------------------------------------------------------+
```

**No hay acción primaria en esta pantalla.** Es una superficie de lectura: las acciones que ofrece son de navegación —abrir el lienzo, abrir el registro— y una sola de ejecución acotada, reiniciar un contenedor.

---

## 3. Componentes principales

| Componente | Propósito | Datos que muestra | Comportamiento |
| --- | --- | --- | --- |
| Bloque del servidor | Primera capa: da el contexto global | Uso de procesador, memoria, intercambio y disco, con su uso sobre su total; cantidad de contenedores activos sobre el total y cantidad de imágenes | Los datos del sistema operativo se leen del sistema de archivos virtual montado **en modo sólo lectura** |
| Barra de magnitud | Hace comparable un consumo de un vistazo | La proporción, más **la cifra con su unidad** | Una barra sin cifra no es información |
| Bloque de proyectos SelfHosted | Segunda capa: atribuye el consumo a un conjunto | Por proyecto: par de estado agregado, conteo de servicios activos sobre el total, consumo de procesador y memoria, y acción de abrir el lienzo | Ver [`Representacion-Lenguaje-Visual-De-Estados.md`](../Representaciones/Representacion-Lenguaje-Visual-De-Estados.md) §3.4 |
| Bloque de contenedores | Tercera capa: atribuye el consumo a un servicio | Por despliegue: nombre del servicio, par de estado, consumo de procesador, memoria usada sobre el límite declarado, antigüedad, y acciones de registro y reinicio | Una fila **por réplica**: cada réplica tiene su despliegue con su estado y sus métricas propias |
| Acción de abrir el lienzo | Baja al detalle de la arquitectura | — | Es la vía por la que el tablero cierra el flujo de atribución |

### 3.1 Lo que las restricciones de implementación prohíben ofrecer

El anexo E-18 declara cuatro restricciones para este tablero, y el intake las repite como requerimientos no funcionales. Las cuatro tienen consecuencia directa sobre lo que la interfaz **no** puede tener:

| Restricción declarada | Lo que la interfaz no ofrece |
| --- | --- |
| El origen de los datos es el motor de contenedores, no peticiones contra los servicios | **Ninguna comprobación de disponibilidad por red** de un servicio, ni indicador de que un servicio «responde». Cuando los contenedores toman dirección propia de la red local, el servidor no los alcanza por la misma placa |
| La frecuencia es moderada, de 3 a 5 segundos **para la vista abierta** | **Ningún control de frecuencia elegible** por el administrador, ni acción de refresco manual que contradiga la cadencia |
| Ningún sondeo para las vistas cerradas | **Ninguna promesa de datos históricos** acumulados mientras la vista estuvo cerrada, ni gráfico de tendencia que los presuponga |
| Un solo recolector en segundo plano publica a los circuitos conectados, no un flujo por pestaña | **Ninguna diferencia de comportamiento entre pestañas.** Dos pestañas abiertas sobre esta superficie ven lo mismo, sin multiplicar el sondeo |

La tercera es la más fácil de violar por hábito: un tablero sin serie temporal parece incompleto. **No lo es**: el producto declara explícitamente que no acumula estadísticas con las vistas cerradas, y dibujar una tendencia exigiría acumularlas.

---

## 4. Interacciones

| Acción | Disparador | Resultado esperado | Precondición |
| --- | --- | --- | --- |
| Abrir el tablero | Navegación desde la barra lateral | El recolector lee el estado del sistema operativo y lo publica a los circuitos conectados | Sesión iniciada |
| Mantener la vista abierta | — | El estado se actualiza con la cadencia declarada mientras la vista permanece abierta | La vista está abierta |
| Abrir la misma vista en otra pestaña | Navegación | **El mismo recolector publica a los dos circuitos, sin multiplicar el sondeo** | La vista ya estaba abierta |
| Cerrar la vista | Navegación fuera | La recolección se detiene. Con todas las vistas cerradas, **se detiene por completo** | La vista estaba abierta |
| Elegir un proyecto SelfHosted | Clic en su fila | La tercera capa pasa a mostrar los contenedores de ese proyecto | Hay proyectos con despliegues |
| Abrir el lienzo | Acción de la fila del proyecto SelfHosted | Navegación a la superficie del lienzo | Existe el proyecto |
| Abrir el registro | Acción de la fila del contenedor | Navegación a la superficie de registro de ese servicio y esa réplica | Hay contenedor vigente |
| Reiniciar | Acción de la fila del contenedor | El contenedor se reinicia **sin reconstruir la imagen ni alterar los montajes** | Hay despliegue activo |

---

## 5. Estados

| Estado | Condición que lo produce | Representación esperada |
| --- | --- | --- |
| Vacío | No hay proyectos SelfHosted declarados | Bloque del servidor presente; los otros dos con estado vacío y texto orientativo. **El estado del servidor no depende de que haya proyectos** |
| Cargando | Las tres capas se están trayendo | Esqueleto de los tres bloques |
| Con datos | Hay proyectos con despliegues | Las tres capas pobladas |
| Proyecto parcialmente activo | Al menos un servicio del proyecto SelfHosted quedó fuera | Par de estado de atención más la etiqueta textual propia. **Estado legítimo, sin tratamiento de error** |
| Servicio activo degradado | El contenedor corre con la verificación de salud en mal estado | Par de estado de atención y **etiqueta que dice degradado, no caído** |
| Servicio pausado o finalizado | El contenedor está en pausa, o terminó con código cero | Par de estado neutro con **etiqueta textual propia**. Ver la brecha `B-UX-12` |
| Servicio huérfano | El despliegue está registrado como activo y su contenedor desapareció | Par de estado de deriva. Es la señal explícita de que alguien operó contenedores por fuera |
| Servicio sin despliegue | El servicio existe y nunca se desplegó | Fila **sin estado de ejecución y sin métricas**: el servicio existe siempre mientras no se lo borre y no tiene estado de encendido |
| Métricas no disponibles | El despliegue existe pero sus métricas no llegaron | Se muestra el estado **sin métricas y se declara**, sin degradar el resto de la vista |
| Lectura del servidor no disponible | El estado del sistema operativo no se pudo leer | El bloque del servidor declara que el dato no está disponible, **sin degradar el resto de la interfaz**. Ver la brecha `B-UX-19` |
| Estado sin reconciliar | El motor de contenedores no respondió a la última reconciliación | El estado registrado conserva su última reconciliación conocida y el sistema declara que no pudo reconciliar. Ver la brecha `B-UX-19` |
| Error | Las tres capas no pudieron traerse | Banda de error con causa y acción de recuperación |
| Sin permiso | — | **No aplica.** Una sola identidad |

### 5.1 Brecha `B-UX-19`

`02-Especificacion-Funcional` declara como brecha B-14 dos ausencias que caen sobre esta superficie: el intake **no declara el comportamiento esperado cuando la lectura del estado del sistema operativo no está disponible**, ni **la validez temporal de un estado que no pudo reconciliarse**.

Consecuencia concreta acá: los dos estados se declaran, y **no se declara cómo se presenta la antigüedad del dato**. Un tablero que muestra un estado de hace cinco minutos sin decir que es de hace cinco minutos miente en silencio; pero cuánto tiempo un estado sin reconciliar sigue siendo presentable, y con qué marca, no lo declara ninguna fuente. Destinatario: `05-Arquitectura-Tecnica`.

---

## 6. Versión responsive

La matriz de plataforma declara una única familia de navegador de escritorio y excluye navegadores móviles y pantallas pequeñas. Esta superficie **no tiene versión móvil especificada**.

- Los tres bloques son apilados por naturaleza y reflúyen sin punto de quiebre propio.
- Dentro de cada bloque, las filas pasan de una disposición en columnas a una disposición apilada por debajo del punto de quiebre principal.
- Las barras de magnitud conservan su cifra al reflúir: si el ancho no alcanza para la barra, se conserva la cifra y se pierde la barra, nunca al revés.
- Reflujo conforme al criterio 1.4.10 a 320 píxeles.

**Norma de diseño aplicada, no brecha.** El punto de quiebre principal alrededor de 768 px y el piso de 320 px sin desplazamiento horizontal los declara `Design-Rules-Web-Generico.md` §8, y esta superficie los aplica. Lo único delegado son los **anchos de verificación**: en cuáles comprueba la etapa `b` el comportamiento y lo registra en su informe de cierre, según `Compatibilidad-Plataformas.md` §4. La brecha `B-UX-15`, que declaraba ausente la norma, se retiró por falsa; ver [`Experiencia-De-Uso.md`](../Experiencia-De-Uso.md) §10.2.1.

---

## 7. Notas de implementación

**Accesibilidad.**

- Cada bloque es una región con nombre accesible.
- Las barras de magnitud llevan su valor en texto y su rol de indicador de progreso con su valor actual y su máximo: una barra sin valor accesible es decoración.
- Las cifras usan tipografía tabular y llevan **unidad explícita**.
- El nombre accesible de cada fila de contenedor incluye el estado, para que recorrer la tercera capa por teclado no exija leer columna por columna.
- La actualización periódica del contenido **no se anuncia en cada ciclo**: un tablero que se anuncia cada 3 segundos es inutilizable con lector de pantalla. Se anuncian los cambios de estado, no los de magnitud.
- Los estados que no son caída —degradado, pausado, finalizado— se distinguen por **etiqueta textual** y no sólo por par de color.

**Performance percibida.** Los umbrales del intake condicionan esta superficie: cadencia de 3 a 5 segundos sólo con vistas abiertas, un solo recolector para todos los circuitos, y una pasada completa de reconciliación sobre el parque objetivo sin saturar un núcleo. La interfaz no puede ofrecer nada que exija más.

**Internacionalización.** Las magnitudes llevan unidad explícita; la antigüedad se expresa en forma relativa y legible, como hace el anexo E-18.

---

## 8. Trazabilidad

| Dimensión | Referencia |
| --- | --- |
| Persona objetivo | Administrador único del producto: [`Vision-Producto.md`](../../00-Contexto/Vision-Producto.md) §2.1 |
| CU origen | [CU-26](../../02-Especificacion-Funcional/Casos-De-Uso/CU-26-Lectura-Del-Estado-Del-Servidor.md), [CU-27](../../02-Especificacion-Funcional/Casos-De-Uso/CU-27-Vista-Por-Proyecto-Y-Por-Contenedor.md), [CU-28](../../02-Especificacion-Funcional/Casos-De-Uso/CU-28-Reconciliacion-Con-El-Motor-De-Contenedores.md) |
| Reglas de negocio relevantes | RN-20, RN-31 |
| Insumo del intake | §4 capacidad F-12; §5 historia 8; §9 exclusión 6; §17.P.10 frecuencia de sondeo, recolector único y costo de la reconciliación; anexos E-3, E-17, E-18 |
| Marco de experiencia aplicado | [`Experiencia-De-Uso.md`](../Experiencia-De-Uso.md) §3.7 flujo FL-07, §4.2 lenguaje visual, §7 performance percibida |
| Representaciones que invoca | [`Representacion-Lenguaje-Visual-De-Estados.md`](../Representaciones/Representacion-Lenguaje-Visual-De-Estados.md) |
| Catálogo de diseño aplicado | `Design-Rules-Web-Generico.md` §3.2, §3.3, §4.3, §4.9, §5, §7, §8; `Design-Rules-Blazor-Mudblazor.md` §5 |
| US a generar en 06 | US-CU-26-1 a US-CU-26-3, US-CU-27-1 a US-CU-27-3, provisionales |
| Tests previstos en 08 | Snapshot de los doce estados declarados; verificación de que dos pestañas comparten recolector y de que al cerrar todas las vistas no queda recolección activa; verificación de que un contenedor con verificación de salud en mal estado se lee como degradado y no como caído |
| Brechas que declara | `B-UX-12`, estados pausado y finalizado sin fila en el contrato visual; `B-UX-19`, comportamiento ante lectura no disponible y validez temporal del estado sin reconciliar (B-14 de `02-Especificacion-Funcional`) |
| Maqueta de la Fase B2 | Nombre canónico `Tablero de estado`. Doce estados declarados en §5, de los cuales once son demostrables: las filas marcadas no aplicable no se maquetan |
| Fuente de la correspondencia | La fila «CU origen» reproduce la fila de esta superficie en [`Experiencia-De-Uso.md`](../Experiencia-De-Uso.md) §9.2, que es la **fuente única** de la correspondencia entre superficie y caso de uso. Se reproduce, y no se referencia, porque `Rules-UX-UI-DX.md` §4.2.1 punto 8 la exige como sección obligatoria del wireframe |

---

## 9. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 2.0 | 2026-07-30 | Migración normativa del conjunto 4.1 al 6.0, fase M4 corte 4, bajo `Rules-UX-UI-DX` 4.0, `Vocabulario-Rules` 2.1 y `Migracion-Rules` 1.0. Clasificación **regenerar contenido** por el salto major de la regla que lo gobierna; fuente de contenido: **el documento de origen**, archivado sin modificar en `_legacy/2026-07-30/Wireframes-Tablero-De-Estado-v1.0.md`. Sube **major** porque la nomenclatura anterior deja de cumplir. **Cabecera:** se suma el campo `Proyecto de código` con el valor `SelfHosted-Service`, que §4.1 de la regla 4.0 exige como primer campo por ser ésta una categoría de nivel proyecto de código (`Vocabulario-Rules` §4 R3) y que el `PRODUCT-MANIFEST` §2 declara como `Nombre-Proyecto-Codigo`; la etiqueta `Proyecto` pasa a `Producto` sobre el mismo valor `SelfHosted Service`, porque `Vocabulario-Rules` §3 prohíbe la etiqueta de un plano de identidad sobre el valor de otro. Los dos campos conviven: el primero lo exige §4.1 y el segundo lo preserva `Migracion-Rules` §4.2. **Sustitución léxica por ocurrencia** según `Vocabulario-Rules` §9.5 y el plan de migración §3.5, y nunca por reemplazo global de cadena: la **única** ocurrencia de «solución» designaba el nivel superior y pasa a «producto» con su concordancia de género —«Administrador único de la solución» a «Administrador único **del** producto»—; no hay ninguna «solución de código», y el cuerpo de este documento no contiene la cadena `soluci` dentro de ninguna otra palabra, de modo que el riesgo de superposición de cadenas que el plan §3.5 declara no se materializa acá. Las dieciocho ocurrencias de «proyecto» se clasificaron una por una y **ninguna pasó a «proyecto de código»**: seis llevan la forma calificada «proyecto SelfHosted»; diez son la misma entidad del dominio en forma corta, admitida por el `PRODUCT-INTAKE` §12 y por el glosario raíz de `Vision-Producto.md` §9 donde el contexto ya fijó el sentido —dos de ellas, «Proyectos» y `<proyecto>`, son etiquetas de la pantalla dentro del bloque ASCII de §2—; una nombra un artefacto del dominio en su enlace a `CU-27-Vista-Por-Proyecto-Y-Por-Contenedor.md`, que no se renombra; y una era la etiqueta de cabecera. **El nombre canónico de la superficie `Tablero de estado` y su identificador `SUP-09` se conservan textualmente**, porque `Deriva-Rules.md` exige que coincidan término por término con la línea de base visual. **El bloque ASCII de §2 no se tocó** y conserva su ancho. **Ninguna restricción declarada, componente, interacción, estado, nota, referencia de trazabilidad ni brecha cambió de contenido**: la migración es léxica y de forma de cabecera, y las filas anteriores de este control de cambios no se reescribieron. Origen: [`Plan-Migracion-4.1-a-6.0.md`](../../Audit/Plan-Migracion-4.1-a-6.0.md) §3.5 y §4 |
| 1.0 | 2026-07-29 | Versión inicial. Transcribe la disposición en tres capas del tablero del anexo E-18; declara restricción por restricción qué **no** puede ofrecer la interfaz como consecuencia de las cuatro restricciones de implementación declaradas, incluida la ausencia deliberada de series temporales; declara doce estados, con los tres estados que no son caída distinguidos por etiqueta textual; declara la brecha `B-UX-19` y su consecuencia sobre la presentación de la antigüedad del dato |
| 1.0 | 2026-07-29 | Corrección del audit de la Fase B, absorbida dentro de la versión de emisión, sin subir versión y sin archivar, por la política de versionado de `Master-Prompt.md` §5: el documento está en estado `Propuesto` y la corrección proviene del audit de su propia fase. **H-06, P1:** Se suma a §8 la fila que declara la fuente única de la correspondencia entre superficie y caso de uso. **Brecha `B-UX-15` retirada por falsa:** §6 deja de declarar ausente el punto de quiebre y cita la norma que `Design-Rules-Web-Generico.md` §8 sí declara, acotando lo delegado a los anchos de verificación de la etapa `b`. Origen: informe [`Audit/B-02-03-r1.md`](../../Audit/B-02-03-r1.md) |
