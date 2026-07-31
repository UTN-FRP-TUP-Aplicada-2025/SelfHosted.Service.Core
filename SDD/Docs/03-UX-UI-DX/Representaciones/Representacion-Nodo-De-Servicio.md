# Representación — Nodo de servicio del lienzo

**Proyecto de código:** SelfHosted-Service
**Producto:** SelfHosted Service
**Documento:** Representacion-Nodo-De-Servicio.md
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
  - [3.1 Variantes por estado](#31-variantes-por-estado)
  - [3.2 Variantes de la zona de red](#32-variantes-de-la-zona-de-red)
  - [3.3 La arista y su pendencia declarada](#33-la-arista-y-su-pendencia-declarada)
- [4. Datos que consume](#4-datos-que-consume)
- [5. Restricciones de accesibilidad](#5-restricciones-de-accesibilidad)
- [6. Reutilización](#6-reutilización)
- [7. Control de cambios](#7-control-de-cambios)

---

## 1. Concepto representado y propósito

El **nodo de servicio** es la unidad de lectura del lienzo y la representación más cargada del producto: en un rectángulo caben la identidad del servicio, su origen resuelto, su consumo, su ubicación de red, su política de reinicio, su cantidad de réplicas y su estado de ejecución. Es lo que el anexo E-18 llama «anatomía del nodo» y lo declara con el **origen de cada dato**, «que ata la maqueta al modelo».

Se centraliza como representación por tres motivos. Primero, porque su composición es contrato verificable de la etapa `b` y no una decisión de pantalla. Segundo, porque encarna el diferenciador DV-02 de la visión de producto —el nodo **es el servicio**, que es permanente y posicionable, mientras que el color y la insignia reflejan el despliegue activo, que es volátil— y confundir las dos cosas rompe el modelo mental completo. Tercero, porque el nodo es el objeto sobre el que se mide la puerta técnica PT-01: treinta nodos con insignia de estado y métricas por nodo, sin retraso perceptible en el arrastre.

Lo que esta representación **no** hace: no decide la técnica de arrastre ni el mecanismo de dibujado, que son de `05-Arquitectura-Tecnica` y quedan condicionados por la medición de PT-01.

---

## 2. Apariencia esquemática

Composición del nodo, transcripta del anexo E-18 y desprovista de los valores de ejemplo:

```text
                 +--------------------------------------------+
    (entrada) o--|  [icono]  <nombre del servicio>   (i) <est> |
                 |           <imagen resuelta>:<etiqueta>      |--o (salida)
                 |           [====   ] CPU <n>%  <m>/<M> MB    |
                 |           <direccion> · <modo de red>       |
                 |           <politica de reinicio>  x<N>      |
                 +--------------------------------------------+
                        ^ borde y trazo segun el par de estado

    o = puerto de enlace. Entrada a la izquierda, salida a la derecha.
        Es el ancla de las aristas y el objetivo mas chico de la interfaz.
```

Cinco zonas, en el orden en que el ojo las recorre de arriba abajo. El ritmo vertical es regular, según `Design-Rules-Web-Generico.md` §3.3: el administrador tiene que poder escanear una columna de nodos sin saltos arbitrarios.

---

## 3. Variantes

### 3.1 Variantes por estado

El borde, la insignia y la etiqueta salen de [`Representacion-Lenguaje-Visual-De-Estados.md`](Representacion-Lenguaje-Visual-De-Estados.md) y no se redefinen acá. Lo que cambia en el nodo es qué zonas se dibujan.

| Variante | Condición de uso | Diferencias esperadas |
| --- | --- | --- |
| Nodo con despliegue activo | El servicio tiene un despliegue en curso | Las cinco zonas presentes. Las métricas se actualizan con la cadencia de sondeo declarada |
| Nodo sin despliegue | El servicio está declarado y nunca se desplegó, o su despliegue fue retirado | Zona de métricas **ausente**, no en cero: mostrar cero afirmaría un consumo que no existe. La zona de estado exhibe la variante que corresponda |
| Nodo pendiente de aplicar | El servicio existe en el conjunto de cambios pendientes y todavía no se aplicó | Borde y par de estado de la variante «pendiente de aplicar», que **prevalece** sobre el estado del despliegue. Zona de métricas ausente si nunca se desplegó, presente y del despliegue vigente si el servicio ya corría |
| Nodo huérfano | El despliegue está registrado como activo y su contenedor desapareció del motor | Par de estado y borde de la variante «huérfano». Zona de métricas ausente. Es la señal explícita de la deriva |
| Nodo de servicio incorporado | El servicio quedó vinculado a un contenedor preexistente sin recrearlo | Sin diferencia de composición. La procedencia se lee en el panel lateral, no en el nodo: el nodo representa el servicio, y un servicio incorporado es un servicio como cualquier otro |
| Nodo con más de una réplica | El servicio declara réplicas | La zona de pie exhibe el número de réplicas. El par de estado del nodo **agrega** los estados de los despliegues de cada réplica con el criterio del estado agregado; el detalle por réplica vive en el panel lateral |
| Nodo dentro de un grupo | El servicio pertenece a una agrupación visual del lienzo | Sin diferencia de composición. La pertenencia la exhibe el contenedor del grupo, con su título |

### 3.2 Variantes de la zona de red

| Modo de red del servicio | Qué exhibe la zona | Fuente |
| --- | --- | --- |
| Modo con dirección propia de la red local | La dirección fija y el nombre del modo | Anexo E-18, fila «Red» de la anatomía |
| Modo de red virtual del motor | El alias de resolución de nombres y el nombre del modo. **No hay dirección que exhibir**: la asigna la red del proyecto SelfHosted | Anexo E-18; CU-19, flujo alternativo de servicio en red virtual |

### 3.3 La arista y su pendencia declarada

La arista no es parte del nodo, pero se ancla en sus puertos laterales y su tratamiento se declara acá porque ninguna otra representación la aloja.

| Lo que sí está declarado | Fuente |
| --- | --- |
| El lienzo dibuja **una arista visual por par de servicios**, y agrupa debajo las referencias que la sostienen, mientras el modelo las guarda por separado | Anexo E-1 |
| Una referencia a una variable compartida del proyecto SelfHosted **no dibuja ninguna arista**, porque el proyecto no es un nodo del lienzo | Anexo E-1; CU-04 |
| Una arista puede existir **sin variable**, cuando su única razón de ser es la espera que declara | Anexo E-1; RN-34 |
| Una arista que referencia el host del destino y no tiene canal alcanzable queda **marcada inválida y bloquea el arranque** | RN-04; CU-04, CU-18 |

**Pendencia declarada `B-UX-01`.** El anexo E-18 registra como pendiente **la distinción visual entre las aristas que declaran espera al destino y las que no**, y la categoría `02-Especificacion-Funcional` la transfiere como brecha B-07 con destinatario en esta categoría. No se resuelve acá, por dos motivos: ninguna regla del catálogo de diseño cubre la representación de aristas de un lienzo, de modo que no hay derivación posible; y el anexo E-18 pide explícitamente que las pendencias «se resuelvan y no se inventen».

Lo que sí se declara son las **tres restricciones que cualquier solución tiene que cumplir**, que sí se derivan de reglas vigentes:

1. La distinción no puede usar el color que E-18 reserva en exclusiva para «pendiente de aplicar».
2. El color no puede ser el único canal: la distinción necesita un segundo canal, de forma o de rótulo.
3. La arista marcada inválida por falta de canal alcanzable tiene que ser distinguible de las dos anteriores, porque su consecuencia es distinta: bloquea el arranque.

---

## 4. Datos que consume

Tabla del anexo E-18, transcripta con su columna de origen del dato, que es lo que ata la representación al modelo.

| Zona | Contenido | Origen del dato |
| --- | --- | --- |
| Cabecera | Ícono por categoría, nombre del servicio, insignia de estado | Nombre del servicio; estado del despliegue vigente |
| Subtítulo | Imagen resuelta con su etiqueta | Imagen y etiqueta del origen del servicio |
| Métricas | Barra de procesador y memoria usada sobre el límite declarado | Métricas del despliegue |
| Red | Dirección y modo, o alias de resolución de nombres cuando el modo es de red virtual | Configuración de red del servicio |
| Pie | Política de reinicio y número de réplicas | Política de reinicio y réplicas del servicio |
| Puertos laterales | Anclas de las aristas: entrada a la izquierda, salida a la derecha | Modelo de puertos de la herramienta de dibujo |

Dos precisiones sobre el origen, derivadas de la separación entre configuración y ejecución:

- **Las tres zonas superiores mezclan deliberadamente las dos naturalezas.** El nombre, la imagen, la red, la política de reinicio y las réplicas son del **servicio**, que es permanente. El estado y las métricas son del **despliegue**, que es volátil. Es exactamente el diferenciador DV-02, y es la razón por la que detener un servicio vacía la zona de métricas y cambia el par de estado, sin borrar ninguna otra zona.
- El **ícono por categoría** de la cabecera no tiene fuente declarada en el modelo: el anexo E-2 no lleva campo de categoría para el servicio, y el único campo de categoría del intake pertenece al ítem del catálogo. Ver §6, nota de derivación.

---

## 5. Restricciones de accesibilidad

Piso WCAG 2.2 nivel AA.

- **Objetivos de toque.** Los puertos laterales son el objetivo más chico de toda la interfaz y tienen que cumplir el mínimo de 24 × 24 píxeles del criterio 2.5.8. Si el tamaño visual del puerto es menor, el área activa se amplía sin ampliar el dibujo.
- **Operación completa por teclado.** El nodo es un elemento enfocable. Seleccionarlo, abrir su panel lateral, recorrer las acciones que ofrece y volver tienen que ser posibles sin puntero. La alternativa por teclado al trazado de una arista y al desplazamiento del nodo se especifica en el wireframe del lienzo y no depende de la técnica de arrastre que la puerta técnica PT-01 decida.
- **Nombre accesible completo.** El nombre accesible del nodo no es sólo el nombre del servicio: incluye su estado, porque un lector de pantalla que recorre treinta nodos necesita distinguirlos sin abrir cada uno.
- **La barra de consumo lleva su valor en texto.** Una barra sin cifra no es información: la zona de métricas exhibe el porcentaje y el par de memoria usada sobre límite, con su unidad explícita.
- **Contraste.** El texto de las cinco zonas cumple 4.5:1 pese a la densidad; el borde y las barras, 3:1 como componentes gráficos.
- **El ícono de categoría es decorativo** y se marca como tal: la categoría no aporta información que no esté en el nombre y en la imagen.
- El lienzo se acoge a la excepción del criterio 1.4.10 para contenido que requiere disposición bidimensional. La excepción alcanza al lienzo, **no al nodo**: el contenido del nodo no puede exigir desplazamiento horizontal dentro de sí.

---

## 6. Reutilización

| Superficie | Wireframe | Cómo la usa |
| --- | --- | --- |
| Lienzo del proyecto | [`Wireframes-Lienzo-Del-Proyecto.md`](../Wireframes/Wireframes-Lienzo-Del-Proyecto.md) | Es su unidad de contenido. El lienzo dibuja un nodo por servicio |

Representación de la que depende: [`Representacion-Lenguaje-Visual-De-Estados.md`](Representacion-Lenguaje-Visual-De-Estados.md), para la cabecera y el borde.

**Nota de derivación sobre el ícono por categoría.** El anexo E-18 declara «ícono por categoría» en la zona de cabecera, y ninguna fuente declara qué categorías existen para un servicio ni de dónde sale la del servicio. El único campo de categoría declarado en el intake pertenece al ítem del catálogo, con dos valores de ejemplo. Esta representación **no inventa un catálogo de categorías**: declara la ranura, la marca decorativa a efectos de accesibilidad y deja el origen del dato sin resolver. Se recoge en la brecha `B-UX-04`, que es la de los descriptores no declarados.

---

## 7. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 2.0 | 2026-07-30 | Migración normativa del conjunto 4.1 al 6.0, fase M4 corte 4, bajo `Rules-UX-UI-DX` 4.0, `Vocabulario-Rules` 2.1 y `Migracion-Rules` 1.0. Clasificación **regenerar contenido** por el salto major 2.0 → 4.0 de la regla que gobierna la categoría; fuente de contenido: **el documento de origen**, archivado sin modificar en `_legacy/2026-07-30/Representacion-Nodo-De-Servicio-v1.0.md`. Sube **major** porque la nomenclatura anterior deja de cumplir. **Cabecera:** se suma el campo `Proyecto de código` con el valor `SelfHosted-Service`, que §4.1 de la regla 4.0 exige por ser ésta una categoría de nivel proyecto de código (`Vocabulario-Rules` §4 R3), y la etiqueta `Proyecto` pasa a `Producto` sobre su valor de origen `SelfHosted Service`, porque `Vocabulario-Rules` §3 prohíbe la etiqueta de un plano de identidad sobre el valor de otro; los dos conviven porque §4.1 exige el primero y `Migracion-Rules` §4.2 prohíbe perder el segundo. Se conserva el campo `Variante`. **Sustitución léxica por ocurrencia** según `Vocabulario-Rules` §9.5 y el plan de migración §3.5, y nunca por reemplazo global de cadena: la única ocurrencia de «solución» —«las tres restricciones que cualquier solución tiene que cumplir», en §3.3— **se preserva**, porque su referente es el remedio de un problema y no el nivel superior del framework, uso que `Vocabulario-Rules` §4 R2 conserva expresamente; las tres ocurrencias de la cadena `resoluci` —dos «resolución de nombres» en §3.2 y §4, y «cualquier resolución debe cumplir» en el control de cambios— quedaron **intactas**, verificadas por el barrido negativo que el plan §3.5 paso 4 exige. Las siete ocurrencias de «proyecto» se clasificaron una por una y **ninguna pasó a «proyecto de código»**: cinco designan la entidad del dominio —dos con la forma calificada «proyecto SelfHosted», dos en forma corta que el PRODUCT-INTAKE §12 admite donde el contexto ya fijó el sentido, y una en el nombre del archivo de un wireframe del dominio, que no se renombra—, y una era la etiqueta de cabecera. **Glosario:** desde la 4.0 `Glosario-UX.md` es artefacto obligatorio para los ocho tipos D8 y §6 verifica su existencia y su completitud; los términos que esta representación acuña —nodo de servicio, zona del nodo, puerto de enlace, arista, nodo pendiente de aplicar, nodo huérfano, nodo de servicio incorporado, ranura del ícono por categoría— se devolvieron al lote que emite ese glosario y acá no se redefinen, y los que ya declaran [`Vision-Producto`](../../00-Contexto/Vision-Producto.md) §9 y [`Glosario-Funcional`](../../02-Especificacion-Funcional/Glosario-Funcional.md) se referencian sin duplicarse. **Ninguna zona, variante, restricción de la arista, dato consumido, restricción de accesibilidad, brecha ni nota de derivación cambió de contenido**: la migración es léxica y de forma de cabecera. El bloque ASCII de §2, que transcribe la anatomía del nodo del anexo E-18, no contenía ninguna palabra a migrar y quedó intacto, con su ancho de caja preservado. Las filas anteriores de este control de cambios no se reescribieron. El bloque de procedencia del destino sigue declarando la 4.1 y no se toca: es trabajo de M5. Origen: [`Plan-Migracion-4.1-a-6.0.md`](../../Audit/Plan-Migracion-4.1-a-6.0.md) §3.5 y §4 |
| 1.0 | 2026-07-29 | Versión inicial. Transcribe la anatomía del nodo del anexo E-18 con su tabla de origen del dato; declara siete variantes por estado y dos por modo de red; declara la separación entre las zonas que provienen del servicio y las que provienen del despliegue como materialización del diferenciador DV-02; declara la pendencia de la distinción visual de las aristas —brecha B-07 de `02-Especificacion-Funcional`, recogida como `B-UX-01`— sin resolverla, y fija las tres restricciones que cualquier resolución debe cumplir; declara la ranura del ícono por categoría como derivación sin origen de dato |
