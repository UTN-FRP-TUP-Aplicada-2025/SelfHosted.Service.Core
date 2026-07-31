# CU-04 — Composición del lienzo: nodos, aristas y dependencias

**Proyecto de código:** SelfHosted-Service
**Producto:** SelfHosted Service
**Documento:** CU-04-Composicion-Del-Lienzo.md
**Versión:** 2.0
**Estado:** Propuesto
**Fecha:** 2026-07-30
**Autor:** Analista Funcional Senior (AG-02)

**Necesidad de negocio upstream:** [NB-01](../../01-Necesidades-Negocio/Necesidades-De-Negocio/NB-01-Visibilidad-Unificada-De-La-Arquitectura.md)
**Trazabilidad upstream:** PRODUCT-INTAKE §4 capacidad F-04; §6 flujo 1; anexo E-4 (el único mecanismo de vínculo, sus dos ejes y sus cuatro combinaciones); anexo E-1; anexo E-18; E-16 RN-04, RN-05, RN-12, RN-14, RN-32, RN-34; §17.P.11, decisiones del modelo de dominio

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

Permitir que el administrador componga la arquitectura de un proyecto SelfHosted en el lienzo: colocar los nodos de servicio y trazar las aristas de dependencia, de modo que trazar la flecha escriba la referencia de variable correcta en lugar de obligar a escribir a mano una cadena que depende del modo de red.

## 2. Actores

| Actor | Tipo | Rol |
| --- | --- | --- |
| Administrador del producto | Primario | Compone el lienzo, traza y edita las aristas |
| Registro del producto | Sistema | Propone la referencia y la espera, valida el aporte de la arista, el ciclo de arranque y el canal alcanzable |

Los nombres de los actores no humanos son **denominaciones acuñadas por esta categoría**, salvo los seis que trazan a una fuente: `Motor de contenedores`, `Destino externo`, `Automatismo de integración continua`, `Sincronizador de estado`, `Módulo de descubrimiento` y `Resolutor de referencias`. Los acuñados no son componentes declarados y no condicionan la descomposición: su correspondencia con los módulos que el intake §17.P.2 sí declara la fija 05-Arquitectura-Tecnica. La convención completa, nombre por nombre, está en [Especificacion-Funcional.md](../Especificacion-Funcional.md) §8.

## 3. Precondiciones

- Existe el proyecto SelfHosted con al menos dos servicios declarados (CU-01, CU-03).
- El administrador tiene el lienzo del proyecto abierto.

## 4. Flujo principal

1. El administrador abre el lienzo del proyecto SelfHosted, que es su vista por defecto.
2. El sistema dibuja un nodo por servicio y una arista visual por par de servicios, agrupando debajo las referencias que la sostienen.
3. El administrador traza una flecha desde un servicio de origen hacia un servicio de destino.
4. El sistema escribe en el origen una referencia común a las variables provistas del destino: trazar la flecha es azúcar de interfaz sobre la referencia de variable (RN-32).
5. Si el destino declara más de un puerto de contenedor, el sistema pregunta cuál antes de escribir la expresión, y lo escribe literal.
6. El sistema propone el valor de la espera al destino: la propone verdadera si la referencia apunta al host del destino (RN-34).
7. El administrador acepta o cambia la propuesta de espera.
8. El sistema valida que la arista aporte referencia o espera (RN-34), que el grafo de arranque siga sin ciclos (RN-05) y, al aplicar los cambios, que exista canal alcanzable si la arista referencia el host (RN-04).
9. El sistema persiste la arista y la referencia que la sostiene, registrando el puerto de destino como registro de dependencia.
10. El sistema registra el evento de auditoría (RN-17).

## 5. Flujos alternativos

**FA-01 — Arista de espera sin variable.**
Disparador: el administrador quiere declarar que un servicio arranca después de otro sin referenciar nada suyo.
Pasos: el sistema crea la arista sin variable y con espera declarada. Entre dos servicios no puede haber más de una arista de espera sin variable (RN-34).
Punto de retorno: paso 9.

**FA-02 — Referencia escrita a mano.**
Disparador: el administrador escribe la referencia directamente en la variable en lugar de trazar la flecha.
Pasos: el resultado es el mismo objeto: una referencia común que se resuelve igual. Ver CU-35.
Punto de retorno: paso 8.

**FA-03 — Cambio visual sin efecto de configuración.**
Disparador: el administrador mueve, agrupa o acerca los nodos.
Pasos: el cambio se guarda al instante y no entra al conjunto de cambios pendientes ni marca redespliegue (RN-12). Ver CU-05.
Punto de retorno: paso 2.

**FA-04 — Desmarcar la espera de una arista existente.**
Disparador: el administrador desmarca la espera de una arista que referencia el host.
Pasos: los dos servicios pasan a arrancar en cualquier orden; la arista sigue dibujándose, sigue marcando redespliegue y sigue exigiendo canal alcanzable.
Punto de retorno: paso 8.

## 6. Excepciones y errores

| Código | Causa | Respuesta del sistema |
| --- | --- | --- |
| `422` de arista sin aporte | La arista no referencia ninguna variable y tiene la espera desmarcada | Rechazo: una arista tiene que aportar una referencia o una espera (RN-34) |
| `409` de arista de espera duplicada | Se intenta crear una segunda arista de espera sin variable entre el mismo par de servicios | Rechazo (RN-34) |
| `422` de ciclo de arranque | Las aristas con espera declarada forman un ciclo | Rechazo señalando el ciclo (RN-05) |
| `422` de referencia inválida | La referencia apunta a una clave inexistente, a un servicio inexistente o a un servicio de otro proyecto SelfHosted | Rechazo señalando la expresión y la causa (RN-21) |
| Enlace inválido | La arista referencia el host del destino y no hay canal alcanzable entre los modos de red de origen y destino | El enlace queda marcado inválido y bloquea el arranque (RN-04) |

## 7. Postcondiciones

**En caso de éxito:** el lienzo refleja los servicios y sus dependencias; cada arista persiste su par de claves, su puerto de destino cuando corresponde y su espera declarada; las referencias quedan escritas en su forma vinculada; el grafo de arranque queda sin ciclos.

**En caso de fallo:** la arista no se crea y no se escribe ninguna referencia; el lienzo queda como estaba y el rechazo identifica la causa.

## 8. Criterios de aceptación

| ID | Given | When | Then |
| --- | --- | --- | --- |
| CA-01 | Los servicios `ia-webui` e `ia-api` en la misma red bridge, con `ia-api` declarando un solo puerto, 11434 | El administrador traza la flecha de `ia-webui` a `ia-api` | El sistema escribe la referencia al host del destino con el puerto 11434 literal, registra el puerto en la arista y propone la espera como verdadera |
| CA-02 | Un servicio de destino que declara dos puertos de contenedor | El administrador traza la flecha hacia él | El sistema pregunta cuál de los dos antes de escribir la expresión y escribe el elegido como literal |
| CA-03 | Las aristas `a → b` y `b → c`, las dos con espera declarada | El administrador traza la arista `c → a` con espera declarada | El sistema rechaza con `422` señalando el ciclo |
| CA-04 | La arista de `cache` a `db`, de espera y sin variable, ya creada | El administrador intenta crear una segunda arista de espera sin variable entre el mismo par | El sistema rechaza con `409` |
| CA-05 | Un servicio en red bridge y otro en macvlan sin puerto publicado | El administrador traza una arista que declara espera y referencia sólo una variable de configuración del destino, no su host | El sistema la acepta: ordena el arranque y no bloquea por canal, porque no referencia el host |

## 9. Trazabilidad

| Dimensión | Referencia |
| --- | --- |
| Necesidad de negocio | [NB-01](../../01-Necesidades-Negocio/Necesidades-De-Negocio/NB-01-Visibilidad-Unificada-De-La-Arquitectura.md) |
| Reglas de negocio aplicables | RN-04, RN-05, RN-12, RN-14, RN-17, RN-21, RN-32, RN-33, RN-34, RN-35. Reglas conceptuales: RC-06, RC-07, RC-08, RC-09, RC-10, RC-17 |
| Historias de usuario a generar en 06 | US-CU-04-1 (trazar una arista y obtener la referencia escrita), US-CU-04-2 (elegir el puerto del destino al trazar), US-CU-04-3 (declarar o desmarcar la espera de una arista), US-CU-04-4 (crear una arista de espera sin variable) |
| Componentes esperados en 05 | Capa `Web`, página del lienzo; capa `Application`, módulo de proyectos y de servicios; capa `Domain`, agregados `Proyectos` y `Servicios`, con el grafo de arranque; capa `Infrastructure`, `Persistencia`. Referencia tentativa |
| Tests previstos en 08 | T-12, T-53 (trazado de la flecha); T-50 (destino con dos puertos); T-13 (ciclo de arranque); T-56 (arista de espera duplicada); T-57 (arista sin aporte); T-44, T-45, T-46 (las combinaciones de espera y referencia al host); T-11 (canal no alcanzable) |

Los identificadores de historia de usuario llevan la forma `US-CU-XX-n` y son **provisionales**: la numeración definitiva es potestad de 06-Backlog-Tecnico. La forma se eligió para que ningún identificador emitido acá colisione con la numeración que 06 asigne.

## 10. Notas y supuestos

- Los dos ejes de la arista son independientes: esperar al destino y referenciar su host. Las cuatro combinaciones son alcanzables y el anexo E-4 las declara.
- Las reglas RN-04, RN-05, RN-14 y RN-34 llevan marcador `[D-i]` sobre su ampliación o sobre su totalidad, y catorce de las dieciséis especificaciones derivadas siguen sin revisar. Se consumen declarándolas revisables.
- **Brecha declarada:** el anexo E-18 registra como pendiente la distinción visual entre las aristas que declaran espera y las que no. Destinatario: 03-UX-UI-DX.
- El detalle de la interacción del lienzo pertenece a 03-UX-UI-DX; la elección de la librería del lienzo, a 05-Arquitectura-Tecnica.

## 11. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 2.0 | 2026-07-30 | Migración normativa del conjunto 4.1 al 6.0, fase M4 corte 3, bajo `Rules-Especificacion-Funcional` 4.0, `Vocabulario-Rules` 2.1 y `Migracion-Rules` 1.0. Clasificación **regenerar contenido** por el salto major de la regla que lo gobierna; fuente de contenido: **el documento de origen**, archivado sin modificar en `_legacy/2026-07-30/CU-04-Composicion-Del-Lienzo-v1.0.md`. Sube **major** porque la nomenclatura anterior deja de cumplir. **Cabecera:** la etiqueta `Proyecto` pasa a `Producto` sobre el mismo valor, porque `Vocabulario-Rules` §3 prohíbe la etiqueta de un plano de identidad sobre el valor de otro; se suma el campo `Proyecto de código` con el valor `SelfHosted-Service`, que §4.1 de la regla 4.0 exige por ser ésta una categoría de nivel proyecto de código (§4 R3) y que el PRODUCT-INTAKE §13 declara como `Nombre-Proyecto-Codigo`; la trazabilidad upstream cita el `PRODUCT-INTAKE` renombrado, antes `SOLUTION-INTAKE`. **Sustitución léxica por ocurrencia** según `Vocabulario-Rules` §9.5 y el plan de migración §3.5, y nunca por reemplazo global de cadena: las dos ocurrencias de «solución» designaban el nivel superior y pasan a «producto» con su concordancia de género —«Administrador de la solución» a «Administrador del producto» y «Registro de la solución» a «Registro del producto»—; no hay ninguna «solución de código» ni ninguna ocurrencia de la cadena `resoluci` en este documento, verificado por barrido. Las diez ocurrencias de «proyecto» se clasificaron una por una y **ninguna pasó a «proyecto de código»**: cinco llevan la forma calificada «proyecto SelfHosted»; cuatro son la misma entidad del dominio en forma corta, admitida por el PRODUCT-INTAKE §12 donde el contexto ya fijó el sentido, y una era la etiqueta de cabecera. **Tabla de contenido:** suma la entrada de §13, que la sección tenía sin figurar. **Ningún propósito, actor, precondición, paso de flujo, flujo alternativo, excepción, postcondición, criterio de aceptación, referencia de trazabilidad, nota ni brecha cambió de contenido**: la migración es léxica y de forma de cabecera, y las filas anteriores de este control de cambios no se reescribieron. Origen: [Plan-Migracion-4.1-a-6.0.md](../../Audit/Plan-Migracion-4.1-a-6.0.md) §3.5 y §4 |
| 1.0 | 2026-07-29 | Corrección absorbida dentro de la versión 1.0, sin subirla y sin archivar, por la política de versionado de `Master-Prompt.md` §5: el documento está en estado `Propuesto` y la corrección proviene del audit de su propia fase de emisión. §2 suma la declaración de que los nombres de los actores no humanos son denominaciones acuñadas por esta categoría y no componentes declarados, con la salvedad de los seis que sí trazan a una fuente. Ningún actor cambia de nombre y ningún flujo se altera: lo que se corrige es que la categoría afirmaba que todo dato trazaba y trece de los diecinueve nombres de actor no humano no lo cumplían. Origen: hallazgo H-04 del informe [Audit/B-02-03-r1.md](../../Audit/B-02-03-r1.md) |
| 1.0 | 2026-07-29 | Versión inicial, derivada de la necesidad de negocio upstream y de las secciones del intake citadas en la cabecera |

## 13. Interacción multiusuario y concurrencia

Sección opcional admitida por §4.3 de `Rules-Especificacion-Funcional.md` para el tipo `web-monolith`. Conserva el número que esa sección le asigna, de modo que la numeración salta del 11 al 13 por construcción de la regla y no por omisión.

El lienzo dibuja una arista visual por par de servicios y agrupa debajo las referencias que la sostienen, mientras el modelo las guarda por separado. Una referencia a una variable compartida del proyecto SelfHosted no dibuja ninguna arista, porque el proyecto no es un nodo del lienzo.

