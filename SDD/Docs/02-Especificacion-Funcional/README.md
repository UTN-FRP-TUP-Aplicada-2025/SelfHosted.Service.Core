# 02-Especificacion-Funcional — SelfHosted Service

**Proyecto de código:** SelfHosted-Service
**Producto:** SelfHosted Service
**Documento:** README.md
**Versión:** 2.2
**Estado:** Propuesto
**Fecha:** 2026-07-30
**Autor:** Analista Funcional Senior (AG-02)

Punto de entrada navegable de la categoría, para revisores externos: 03-UX-UI-DX, 05-Arquitectura-Tecnica, 06-Backlog-Tecnico, 07-Plan-Sprint y 08-Calidad-Y-Pruebas.

---

## Tabla de contenido

- [1. Por dónde empezar](#1-por-dónde-empezar)
- [2. Estructura de la carpeta](#2-estructura-de-la-carpeta)
- [3. Casos de uso vigentes](#3-casos-de-uso-vigentes)
- [4. Reglas de negocio vigentes](#4-reglas-de-negocio-vigentes)
- [5. Modelo y reglas conceptuales vigentes](#5-modelo-y-reglas-conceptuales-vigentes)
- [6. Glosario funcional de la categoría](#6-glosario-funcional-de-la-categoría)
- [7. Qué consume cada categoría downstream](#7-qué-consume-cada-categoría-downstream)
- [8. Control de cambios](#8-control-de-cambios)

---

## 1. Por dónde empezar

[Especificacion-Funcional.md](Especificacion-Funcional.md) es el índice maestro: trae la matriz de trazabilidad de necesidad de negocio a caso de uso, a regla de negocio y a historia de usuario, la verificación de cobertura bidireccional y las **veintiocho** brechas abiertas con su destinatario, **tres de ellas cerradas** y con su fila conservada.

Un revisor que sólo quiera entender qué hace el producto puede leer, en este orden: CU-01 y CU-03, que declaran el proyecto SelfHosted y el servicio; CU-04, que es el mecanismo de vínculo del que dependen el orden de arranque, el marcado de redespliegue y la exportación; CU-22 y CU-24, que son la edición transaccional; y CU-07, que es el flujo diferencial del producto.

Un revisor que llegue a una sección suelta y no reconozca un término conviene que empiece por [Glosario-Funcional.md](Glosario-Funcional.md), en particular por su §3: **ocho** términos de esta categoría tienen **más de un referente**, y «registro» tiene cinco.

## 2. Estructura de la carpeta

| Ruta | Contenido |
| --- | --- |
| [Especificacion-Funcional.md](Especificacion-Funcional.md) | Índice maestro con la matriz de trazabilidad y las brechas |
| [Glosario-Funcional.md](Glosario-Funcional.md) | Glosario funcional de la categoría: 109 términos, 8 familias polisémicas y 18 términos referenciados del glosario raíz |
| [Casos-De-Uso/](Casos-De-Uso/) | 39 casos de uso, uno por archivo |
| [Reglas-De-Negocio/](Reglas-De-Negocio/) | 40 reglas de negocio, una por archivo |
| [Modelo-Datos/Modelo-Conceptual.md](Modelo-Datos/Modelo-Conceptual.md) | Modelo conceptual con 15 entidades conceptuales, su diagrama y su remisión al glosario |
| [Modelo-Datos/reglas-conceptuales-de-modelo/](Modelo-Datos/reglas-conceptuales-de-modelo/) | 19 reglas conceptuales del modelo, una por archivo |

Ningún archivo lleva sufijo de versión en el nombre: la versión vive en el campo de su cabecera. **Hay dos tandas de versiones superadas archivadas**, las dos en el `_legacy/` de la carpeta de cada artefacto: `_legacy/2026-07-29/`, por la corrección de las definiciones de servicio de la Fase B2, y `_legacy/2026-07-30/`, que reúne **dos operaciones del mismo día** —la migración normativa del conjunto 4.1 al 6.0 y la incorporación de la ronda de decisiones del agente humano del proyecto—, distinguibles por el sufijo de versión que preserva cada copia. El sufijo de versión aparece **sólo** en la copia archivada, y **una copia ya archivada no se pisa**.

## 3. Casos de uso vigentes

Los **39** en estado `Propuesto`. La mayoría está en versión **2.0**; **subieron a 2.1 el 2026-07-30** por la ronda de decisiones del agente humano del proyecto los cinco que esas decisiones alcanzaban —CU-13, CU-15, CU-17, CU-37 y CU-38—; [CU-03](Casos-De-Uso/CU-03-Alta-Y-Configuracion-De-Servicio.md) está en **3.1**, porque ya había subido a 2.0 en la Fase B2 por la redefinición del alta y a 3.0 por la migración normativa; y [CU-39](Casos-De-Uso/CU-39-Exploracion-Del-Registro-De-Imagenes.md) es de emisión nueva del mismo día, en **1.1** tras la corrección del hallazgo `P1-1` del audit de la ronda. Agrupados por la necesidad de negocio que los origina.

**NB-01, visibilidad unificada de la arquitectura.** [CU-01](Casos-De-Uso/CU-01-Alta-De-Proyecto.md) da de alta un proyecto SelfHosted con su modo de red. [CU-02](Casos-De-Uso/CU-02-Listado-Renombrado-Y-Eliminacion-De-Proyectos.md) lista, renombra y elimina proyectos SelfHosted. [CU-03](Casos-De-Uso/CU-03-Alta-Y-Configuracion-De-Servicio.md) declara un servicio con las ocho dimensiones que el parque real exige. [CU-04](Casos-De-Uso/CU-04-Composicion-Del-Lienzo.md) compone el lienzo y traza las aristas de dependencia. [CU-05](Casos-De-Uso/CU-05-Persistencia-Y-Recuperacion-De-La-Disposicion.md) conserva la disposición del lienzo. [CU-36](Casos-De-Uso/CU-36-Revision-De-Higiene-Del-Registro.md) informa las condiciones de higiene del registro del sistema sin bloquear.

**NB-02, adoptabilidad del parque existente.** [CU-06](Casos-De-Uso/CU-06-Descubrimiento-De-Contenedores-Adoptables.md) descubre los contenedores candidatos con su motivo de no incorporabilidad. [CU-07](Casos-De-Uso/CU-07-Incorporacion-Con-Confirmacion-Explicita.md) los incorpora sin recrearlos, con clasificación obligatoria de variables. [CU-08](Casos-De-Uso/CU-08-Traduccion-De-La-Configuracion-Observada.md) traduce la configuración observada al modelo de servicio.

**NB-03, reproducibilidad de la arquitectura.** [CU-09](Casos-De-Uso/CU-09-Exportacion-En-Formato-De-Composicion.md) exporta al formato estándar de composición con los secretos vacíos. [CU-10](Casos-De-Uso/CU-10-Exportacion-Del-Manifiesto-Propio.md) exporta el manifiesto propio que preserva la disposición. [CU-11](Casos-De-Uso/CU-11-Importacion-Como-Proyecto-Nuevo.md) importa como proyecto SelfHosted nuevo con su informe. [CU-12](Casos-De-Uso/CU-12-Exportacion-Programada-A-Destino-Externo.md) ejecuta la exportación programada hacia un destino externo.

**NB-04, el alta deja de ser copiar y adaptar.** [CU-13](Casos-De-Uso/CU-13-Despliegue-Desde-Imagen-De-Registro.md) despliega desde imagen de registro. [CU-14](Casos-De-Uso/CU-14-Consulta-Del-Registro-Del-Contenedor.md) consulta el registro del contenedor. [CU-15](Casos-De-Uso/CU-15-Despliegue-Construyendo-La-Imagen.md) despliega construyendo la imagen. [CU-16](Casos-De-Uso/CU-16-Alta-Desde-Plantilla-Del-Catalogo.md) instancia un ítem del catálogo creando el conjunto completo. [CU-17](Casos-De-Uso/CU-17-Mantenimiento-Del-Catalogo.md) mantiene el catálogo. [CU-34](Casos-De-Uso/CU-34-Variables-Compartidas-Del-Proyecto.md) declara las variables compartidas del proyecto SelfHosted. [CU-35](Casos-De-Uso/CU-35-Valor-Expresado-Como-Referencia.md) expresa un valor como referencia a otra variable. [CU-38](Casos-De-Uso/CU-38-Vuelta-A-Un-Despliegue-Anterior.md) vuelve a un despliegue anterior del mismo servicio. [CU-39](Casos-De-Uso/CU-39-Exploracion-Del-Registro-De-Imagenes.md) explora el registro de imágenes configurado, de modo que conocer la dirección de la imagen deja de ser requisito del usuario.

**NB-05, arranque previsible y conflictos anticipados.** [CU-18](Casos-De-Uso/CU-18-Arranque-Y-Parada-Con-Autoarranque.md) arranca y detiene respetando el orden del grafo de arranque. [CU-19](Casos-De-Uso/CU-19-Rango-Gestionado-Y-Reserva-De-Direccion.md) gobierna el rango de direcciones y sus reservas. [CU-20](Casos-De-Uso/CU-20-Validacion-De-Conflicto-De-Direcciones.md) valida el conflicto sin acceder al motor. [CU-21](Casos-De-Uso/CU-21-Informe-De-Conflicto-Y-Resolucion.md) emite el informe y aplica la resolución elegida.

**NB-06, cambios revisados y aplicados en lote.** [CU-22](Casos-De-Uso/CU-22-Acumulacion-De-Cambios-Pendientes.md) acumula los cambios distinguiendo los visuales. [CU-23](Casos-De-Uso/CU-23-Descarte-De-Un-Cambio-Individual.md) descarta un cambio individual. [CU-24](Casos-De-Uso/CU-24-Aplicacion-En-Lote.md) aplica el lote redesplegando sólo lo afectado. [CU-25](Casos-De-Uso/CU-25-Calculo-Del-Informe-De-Impacto.md) calcula el informe de impacto antes de ejecutar.

**NB-07, atribución del consumo del servidor.** [CU-26](Casos-De-Uso/CU-26-Lectura-Del-Estado-Del-Servidor.md) lee el estado del servidor. [CU-27](Casos-De-Uso/CU-27-Vista-Por-Proyecto-Y-Por-Contenedor.md) baja al estado por proyecto SelfHosted y por contenedor. [CU-28](Casos-De-Uso/CU-28-Reconciliacion-Con-El-Motor-De-Contenedores.md) reconcilia con el motor y señala el servicio huérfano. [CU-37](Casos-De-Uso/CU-37-Higiene-De-Imagenes.md) lista, conserva y limpia las imágenes del almacén.

**NB-08, control de acceso y credenciales de máquina.** [CU-29](Casos-De-Uso/CU-29-Alta-Del-Administrador-En-El-Primer-Arranque.md) da de alta el administrador en el primer arranque. [CU-30](Casos-De-Uso/CU-30-Inicio-Y-Cierre-De-Sesion.md) inicia y cierra sesión. [CU-31](Casos-De-Uso/CU-31-Cambio-De-Contrasena.md) cambia la contraseña exigiendo la actual. [CU-32](Casos-De-Uso/CU-32-Emision-Y-Revocacion-De-Credenciales-De-Maquina.md) emite, lista y revoca credenciales de máquina. [CU-33](Casos-De-Uso/CU-33-Disparo-De-Despliegue-Con-Credencial-De-Ambito-Minimo.md) dispara un despliegue con credencial de ámbito mínimo.

Advertencia de consumo, **actualizada el 2026-07-30**, porque el estado de los tres casos de uso del final **ya no es el mismo**:

| CU | Cómo se consume |
| --- | --- |
| CU-37 | **Especificable.** `Q-15` y `Q-17` cerraron: el despliegue registra el digesto y la limpieza es **sugerida**. Siguen abiertas `Q-16`, `Q-18` y `Q-21`, señaladas fila por fila en su §4, y queda el **criterio de descarte** sin identificador de pendiente, que es la brecha B-26 |
| CU-38 | **No es capacidad comprometida.** `Q-15` la volvió técnicamente posible y **eso no la decide**: `Q-19` —si el producto la ofrece— sigue abierta, igual que `Q-20` y `Q-21` |
| CU-39 | **Nace de una decisión cerrada**, `Q-27`. Su superficie **ya está emitida**: `SUP-19`, [`Wireframes-Exploracion-De-Registro-De-Imagenes.md`](../03-UX-UI-DX/Wireframes/Wireframes-Exploracion-De-Registro-De-Imagenes.md) 1.0, con lo que `03-UX-UI-DX` pasa a diecinueve superficies. Lo que sigue abierto es dónde se configura el registro explorable y su ámbito de credencial, que es la brecha B-27 |

Los tres son además los casos de uso que **ninguna necesidad de negocio previó** en su §7 —brecha B-20 del índice maestro, ampliada de dos a tres—. Su necesidad asignada es la que figura en los agrupamientos de arriba.

## 4. Reglas de negocio vigentes

Las **40** del anexo E-16 del intake, en estado `Propuesto`, versión **2.0**, en [Reglas-De-Negocio/](Reglas-De-Negocio/). El índice maestro trae la tabla completa con su autoría declarada y sus casos de uso afectados.

Agrupadas por lo que restringen: **el servicio y su configuración**, RN-01, RN-02, RN-07, RN-08, RN-09, RN-10, RN-19; **la red y las direcciones**, RN-03, RN-06, RN-18, RN-38; **el vínculo entre servicios**, RN-04, RN-05, RN-14, RN-34; **las variables y sus referencias**, RN-21, RN-22, RN-23, RN-24, RN-27, RN-28, RN-32; **la edición transaccional y el despliegue**, RN-12, RN-13, RN-20, RN-31; **la incorporación del parque existente**, RN-11, RN-29; **la exportación y la importación**, RN-25, RN-26; **los secretos y la auditoría**, RN-15, RN-16, RN-17; **el catálogo**, RN-30, RN-36, RN-39; **la identidad del modelo y su higiene**, RN-33, RN-35, RN-37; **el ciclo de vida de las imágenes**, RN-40.

Advertencia de consumo: **diecinueve de las veinticuatro especificaciones derivadas siguen sin revisar**, cifra actualizada el 2026-07-30 con la confirmación de `DI-17`, `DI-18` y `DI-19`. Toda parte de regla que siga marcada `[D-i]` se consume declarándola revisable y nunca como requisito cerrado del cliente; **RN-38 y RN-40 enteras, y el reparto por variante de RN-08, salen de esa condición** y pasan a consumirse como decisión cerrada.

## 5. Modelo y reglas conceptuales vigentes

[Modelo-Conceptual.md](Modelo-Datos/Modelo-Conceptual.md), en estado `Propuesto`, versión **2.0**, con **quince** entidades conceptuales sobre las once tablas que declara el anexo E-9 —más los cuatro objetos con identidad que el intake declara y no diseña—, su diagrama, su tabla de trazabilidad de entidad a caso de uso y a regla, y su **remisión al glosario**.

**El glosario del modelo se mudó.** Hasta la versión anterior el vocabulario de la categoría era el **punto 6 de este documento**. Desde `Rules-Especificacion-Funcional` 4.0 es el artefacto propio [Glosario-Funcional.md](Glosario-Funcional.md), y el punto 6 del modelo quedó como remisión navegable con la lista de los términos que ese glosario declara. Ver §6 de este README.

Las **19** reglas conceptuales están en [reglas-conceptuales-de-modelo/](Modelo-Datos/reglas-conceptuales-de-modelo/), todas en estado `Propuesto`, versión **2.0**. Son obligatorias porque el modelo supera las diez entidades, por las dos vías de conteo: once tablas persistidas o quince entidades conceptuales.

## 6. Glosario funcional de la categoría

[Glosario-Funcional.md](Glosario-Funcional.md), versión **1.1**, estado `Propuesto`. Es artefacto **propio y obligatorio para los ocho tipos D8** desde `Rules-Especificacion-Funcional` 4.0 §2.1, con las cinco secciones que fija su §4.2.4.

| Sección | Qué trae | Conteo |
| --- | --- | --- |
| §2 | Tabla de términos que esta categoría acuña o precisa, con los artefactos de 02 donde aparece cada uno | **109** |
| §3 | Términos con más de un referente, con su forma calificada y la evidencia de colisión | **8** familias: registro (5 referentes), procedencia (3), ámbito (3), resolución (2), higiene (2), huérfano (2), etiqueta (2), modo de red (2) |
| §4 | Términos que el glosario raíz de la cadena ya declara y que **no se redefinen**, más dos equivalencias de forma | **18** referenciados y **2** equivalencias |
| §5 | Constancias del barrido: candidatos descartados por vivir en un solo artefacto, y por ser vocabulario que la categoría usa y no acuña | **11** por conteo y **4** grupos por otro motivo |

**Cómo se consume.** La regla de inclusión es que un término entra si aparece en **más de un artefacto** de la categoría, de modo que el glosario es exactamente el vocabulario que cruza artefactos y que una categoría aguas abajo se va a encontrar sin contexto. `Rules-UX-UI-DX` §3.3 obliga a `Glosario-UX.md` a **referenciar** estos términos en lugar de duplicarlos. El glosario raíz de la cadena es [`Vision-Producto.md`](../00-Contexto/Vision-Producto.md) §9, y este glosario no lo pisa: declara la diferencia donde la hay.

## 7. Qué consume cada categoría downstream

| Categoría | Qué consume de acá |
| --- | --- |
| 03-UX-UI-DX | Los flujos principales y alternativos de cada CU, sin su detalle visual, que es de esa categoría; el [glosario funcional](Glosario-Funcional.md), que su propio `Glosario-UX.md` debe referenciar y no duplicar; las tres brechas de maquetado que el anexo E-18 dejó abiertas (B-07); y **tres entregas del 2026-07-30, de las que una ya está resuelta**: la superficie `SUP-19` de exploración de registro de imágenes, que esa categoría **emitió el mismo día** y que cierra B-25; el **umbral y el lugar** de la sugerencia de limpieza, que el intake delega explícitamente a esa categoría (B-26), **pendiente**; y la revisión de `SUP-18`, que la decisión de `Q-17` desbloquea |
| 05-Arquitectura-Tecnica | El modelo conceptual y sus 19 reglas, la dimensión de componentes esperados de cada CU —que es referencia tentativa, igual que los **diecisiete** nombres de actor no humano acuñados por esta categoría según §8 del índice maestro, sobre veintitrés distintos— y las **siete** brechas de diseño que esta categoría delega (B-06, B-08, B-10, B-14, B-15, B-16, B-17) |
| 06-Backlog-Tecnico | Las **146** historias de usuario previstas de la matriz de §6 del índice maestro, con su numeración provisional (B-19) |
| 07-Plan-Sprint | El orden de dependencia entre CU que las precondiciones declaran, y los anclajes de épica que quedaron abiertos (B-18) |
| 08-Calidad-Y-Pruebas | Los criterios de aceptación de los **39** CU, las **40** RN con su caso del anexo E-22, las **seis** reglas sin caso ejecutable propio —RN-02, RN-08, RN-10, RN-38, RN-39 y RN-40— y la mitad de RN-28 que el anexo deja sin cubrir (B-05) |

## 8. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 2.2 | 2026-07-30 | **Corrección del hallazgo `P1-1`** del informe [`B2-Retroalimentacion-Decisiones-2026-07-30-r1.md`](../Audit/B2-Retroalimentacion-Decisiones-2026-07-30-r1.md), veredicto APROBADO CON OBSERVACIONES y cero P0, por la política de versionado de `Master-Prompt.md` §5. Sube **minor**: no cambia la estructura del documento, ningún conteo de artefactos y ninguna otra fila. **Qué levantaba el hallazgo:** la fila `CU-39` de §3 listaba `SUP-19` entre lo que sigue abierto y declaraba que `03-UX-UI-DX` debía emitirla. **Verificado en disco antes de escribir, y no tomado del informe:** esa categoría emitió [`Wireframes-Exploracion-De-Registro-De-Imagenes.md`](../03-UX-UI-DX/Wireframes/Wireframes-Exploracion-De-Registro-De-Imagenes.md) versión **1.0**, con `SUP-19` declarado en su §1, y pasa a **diecinueve** superficies, con **19** archivos en su carpeta de wireframes. La fila de `CU-39` pasa a declarar la superficie **emitida** y deja abierta sólo la configuración del registro explorable, que es `B-27`; §1 pasa de «dos brechas cerradas» a **tres**; §3 declara `CU-39` en versión **1.1**; y §7 declara que de las tres entregas que la ronda le dejaba a 03, **una ya está resuelta**. **Ninguna decisión abierta se cerró y no se tocó el intake, `03-UX-UI-DX` ni ninguna otra categoría.** La versión 2.1 queda archivada en `_legacy/2026-07-30/README-v2.1.md` |
| 2.1 | 2026-07-30 | **Puesta al día del índice navegable por la ronda de decisiones del agente humano del proyecto del 2026-07-30**, consolidada en el `PRODUCT-INTAKE-SelfHosted-Service` v3.2. Sube **minor**: no cambia la estructura del documento y no se renumera ninguna sección. **§1 y §2** llevan las brechas de veinticuatro a **veintiocho, dos cerradas**, las familias polisémicas de siete a **ocho**, los términos del glosario de 82 a **109** y los casos de uso de 38 a **39**; §2 declara además que el `_legacy/2026-07-30/` de cada carpeta reúne **dos operaciones del mismo día**, distinguibles por el sufijo de versión, y que una copia ya archivada no se pisa. **§3** suma [CU-39](Casos-De-Uso/CU-39-Exploracion-Del-Registro-De-Imagenes.md) al agrupamiento de NB-04, declara las versiones vigentes con sus tres excepciones, y **reemplaza la advertencia de consumo por una tabla de estado de los tres casos de uso del final**, porque CU-37, CU-38 y CU-39 ya no comparten estado y agruparlos bajo «no son implementables» sería falso. **§4** pasa de veintidós a **diecinueve** especificaciones derivadas sin revisar y declara cuáles salen. **§6** corrige los conteos del glosario contra su versión **1.1**. **§7** suma a 03-UX-UI-DX las tres entregas que la ronda le deja —`SUP-19`, el umbral de la sugerencia de limpieza y la revisión de `SUP-18`—, lleva las historias de usuario de 139 a **146**, los nombres de actor acuñados de dieciséis a **diecisiete** sobre veintitrés distintos, y los criterios de aceptación a **39** casos de uso. Las filas históricas de esta tabla no se reescribieron, por `SDD-Development-Guide.md` §VI.2. La versión 2.0 queda archivada en `_legacy/2026-07-30/README-v2.0.md` |
| 2.0 | 2026-07-30 | **Migración normativa 4.1 → 6.0**, fase M4 corte 3, sobre el plan [`Plan-Migracion-4.1-a-6.0.md`](../Audit/Plan-Migracion-4.1-a-6.0.md) §3.5 y la fila de este documento de su §4. Clasificación **regenerar contenido**; fuente de contenido: el **documento de origen**, archivado en `_legacy/2026-07-30/README-v1.0.md`. Sube **major** porque `Rules-Especificacion-Funcional` pasa de 2.0 a **4.0** y la nomenclatura anterior deja de cumplir. **Cabecera**: este README era **el único documento de la categoría que todavía llevaba la cabecera legada `**Proyecto:**`**. Pasa a los dos campos que el orquestador resolvió en el plan §3.5 Paso 2.b, `**Proyecto de código:** SelfHosted-Service` porque §4.1 de la regla lo exige y la categoría es de nivel proyecto de código, y `**Producto:** SelfHosted Service` porque `Migracion-Rules` §4.2 prohíbe perder el valor del origen; los dos difieren **sólo por el guion** y no son intercambiables. **Sustitución léxica por ocurrencia** según `Vocabulario-Rules` §9.5, sin ningún reemplazo global de cadena: el documento de origen tenía **dos** ocurrencias de la cadena `soluci` y **las dos eran «resolución»** —la resolución elegida de CU-21, en §3—, de modo que **no hubo ninguna sustitución de «solución» que hacer** y las dos quedaron intactas; es exactamente la trampa de la subcadena que `Vocabulario-Rules` §9.5 documenta, y acá el barrido la evitó. De las ocurrencias de «proyecto», **ninguna pasó a «proyecto de código»**: todas designan la entidad del dominio, y donde el origen usaba la forma corta se completó a «proyecto SelfHosted» donde el contexto no lo fijaba solo. **§6 nueva**, el glosario funcional de la categoría, con su conteo y su regla de inclusión: es el artefacto que `Rules-Especificacion-Funcional` 4.0 §2.1 convierte en obligatorio para los ocho tipos D8 y que hasta la 3.0 era el punto 6 del modelo conceptual. Las secciones 6 y 7 del origen pasan a **7 y 8** por esa inserción. **Puntero al viejo lugar del glosario, corregido en los dos lugares donde aparecía fuera de una fila histórica**: §2 decía que el modelo conceptual traía «su glosario» y ahora dice «su remisión al glosario»; §5 lo declara explícitamente con el motivo del cambio. **Conteos actualizados contra el disco**, que habían quedado atrás del fix de la Fase B2: los casos de uso pasan de 36 a **38**, las reglas de negocio de 37 a **40**, las reglas conceptuales de 18 a **19**, las entidades conceptuales de catorce a **quince**, las brechas de diecinueve a **veinticuatro** con una cerrada, las especificaciones derivadas sin revisar de «catorce de dieciséis» a **veintidós de veinticuatro**, las historias de usuario previstas de 118 a **139**, las reglas sin caso ejecutable propio de tres a **seis**, y los nombres de actor acuñados de trece a **dieciséis** sobre veintidós distintos. **§3** suma CU-37 y CU-38 a sus agrupamientos de necesidad —NB-07 y NB-04—, con la advertencia de que **ninguno de los dos es implementable hoy** y que ninguna necesidad de negocio los previó, que es la brecha B-20; y declara la versión de cada artefacto, con la excepción de `CU-03`, que está en 3.0. **§4** suma RN-38 y RN-39 a sus agrupamientos y abre el grupo del ciclo de vida de las imágenes con RN-40. **§2** deja de afirmar que no hay carpeta de versiones superadas, que dejó de ser cierto el 2026-07-29, y declara las dos tandas de archivado en el `_legacy/` de cada carpeta, según la regla 1 de `Migracion-Rules` §4.2. **§7** suma la fila del glosario a lo que consume 03-UX-UI-DX. **Barrido negativo corrido**: cero «reproducto», cero roturas de concordancia de género, las **dos** «resolución» del origen intactas, las dos en §3 —el documento vigente tiene seis: esas dos, una de §6 y tres de esta fila—, y los enlaces de este documento verificados uno por uno contra el disco. Las filas históricas de esta tabla **no se reescribieron**, por `SDD-Development-Guide.md` §VI.2, y la fila de la versión 1.0 que remite a `Modelo-Datos/Modelo-Conceptual.md` como lugar del glosario queda tal cual |
| 1.0 | 2026-07-29 | Correcciones absorbidas dentro de la versión 1.0, sin subirla y sin archivar, por la política de versionado de `Master-Prompt.md` §5. §6 corregía dos conteos que afectan a lo que consume el downstream: las brechas delegadas a 05-Arquitectura-Tecnica son siete y la fila decía seis, y las reglas sin caso ejecutable propio son tres y la fila decía dos. La fila de 05 suma además la advertencia sobre los nombres de actor no humano acuñados por esta categoría. Origen: hallazgos H-02, H-04 y H-11 del informe [Audit/B-02-03-r1.md](../Audit/B-02-03-r1.md) |
| 1.0 | 2026-07-29 | Versión inicial del índice navegable de la categoría, emitido junto con los 36 casos de uso, las 37 reglas de negocio, el modelo conceptual y las 18 reglas conceptuales |
