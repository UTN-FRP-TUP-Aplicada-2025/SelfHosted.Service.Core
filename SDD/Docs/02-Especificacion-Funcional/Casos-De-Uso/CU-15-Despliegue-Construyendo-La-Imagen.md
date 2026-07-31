# CU-15 — Despliegue construyendo la imagen

**Proyecto de código:** SelfHosted-Service
**Producto:** SelfHosted Service
**Documento:** CU-15-Despliegue-Construyendo-La-Imagen.md
**Versión:** 2.1
**Estado:** Propuesto
**Fecha:** 2026-07-30
**Autor:** Analista Funcional Senior (AG-02)

**Necesidad de negocio upstream:** [NB-04](../../01-Necesidades-Negocio/Necesidades-De-Negocio/NB-04-Alta-De-Servicio-Sin-Copiar-Y-Adaptar.md)
**Trazabilidad upstream:** PRODUCT-INTAKE-SelfHosted-Service §4 capacidad F-10; anexo E-2 §20.2.3, variantes de origen por repositorio remoto y por **archivo de construcción en línea**; anexo E-23, la imagen construida como objeto con identidad y su marca de pertenencia; anexo E-3, evento de construcción de la línea de tiempo; anexo E-17, transición de construcción de la máquina de estados; §17.P.3, restricción de rutas; E-16 RN-08, RN-24, RN-31

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

Permitir que el administrador despliegue un servicio cuya imagen se construye —desde un archivo de construcción local o desde un repositorio remoto—, con seguimiento del progreso de la construcción, para cubrir los orígenes que el parque real usa además de la imagen ya publicada.

## 2. Actores

| Actor | Tipo | Rol |
| --- | --- | --- |
| Administrador del producto | Primario | Solicita el despliegue del servicio con origen de construcción |
| Módulo de despliegue | Sistema | Dispara la construcción, sigue su progreso y crea el contenedor con la imagen resultante |
| Motor de contenedores | Sistema | Construye la imagen y crea el contenedor |

Los nombres de los actores no humanos son **denominaciones acuñadas por esta categoría**, salvo los seis que trazan a una fuente: `Motor de contenedores`, `Destino externo`, `Automatismo de integración continua`, `Sincronizador de estado`, `Módulo de descubrimiento` y `Resolutor de referencias`. Los acuñados no son componentes declarados y no condicionan la descomposición: su correspondencia con los módulos que el intake §17.P.2 sí declara la fija 05-Arquitectura-Tecnica. La convención completa, nombre por nombre, está en [Especificacion-Funcional.md](../Especificacion-Funcional.md) §8.

## 3. Precondiciones

- El servicio está declarado con origen por repositorio remoto o por archivo de construcción local, con los datos que RN-08 exige cuando el origen es repositorio (CU-03).
- El proyecto SelfHosted tiene su red creada (CU-01).
- El administrador tiene sesión iniciada (CU-30).

## 4. Flujo principal

1. El administrador solicita desplegar el servicio.
2. El sistema registra un despliegue en estado pendiente.
3. El sistema verifica que el origen declare lo que su variante exige para construir: dirección, rama y ruta del archivo de construcción cuando el origen es un repositorio remoto, o el **contenido** del archivo de construcción cuando el origen es un archivo de construcción en línea (RN-08).
4. El sistema dispara la construcción de la imagen y el despliegue pasa a estado de construcción.
5. El sistema sigue el progreso de la construcción y lo refleja en la línea de tiempo del despliegue.
6. Si la construcción termina bien, el despliegue pasa a creando y el sistema **registra el digesto de la imagen construida y su marca de pertenencia**, que es lo que distingue una imagen del producto de una ajena en un almacén compartido; si falla, pasa a fallido con su error. **El digesto es dato decidido desde el 2026-07-30** (`Q-15`) y este paso lo escribe; **la marca de pertenencia sigue dependiendo de `Q-16`, abierta**: ver §10.
7. El sistema resuelve las referencias de las variables inmediatamente antes de crear el contenedor (RN-24).
8. El sistema crea y arranca el contenedor con la imagen construida.
9. El sistema marca el resultado por contenedor y registra el evento de auditoría (RN-17).

## 5. Flujos alternativos

**FA-01 — Origen por archivo de construcción en línea.**
Disparador: el origen del servicio es el contenido de un archivo de construcción declarado en el panel, en lugar de un repositorio remoto.
Pasos: el sistema construye a partir del contenido declarado y de los argumentos de construcción, **sin contexto de construcción y sin clonar ningún repositorio**. La verificación del origen ya rechazó, en CU-03 paso 5, un contenido con instrucciones de copia local: sin contexto no hay nada que copiar y la construcción fallaría.
Punto de retorno: paso 4.

**El límite de esta vía se declara y no se deja como sorpresa.** Sirve para el patrón «tomar una imagen ya publicada y ajustarla» —agregar un paquete, fijar una variable, cambiar el comando—, que es su caso irreemplazable. **No** sirve para construir a partir de código fuente propio, que es lo que el origen por repositorio remoto cubre. La interfaz debe decirlo antes de que el administrador escriba un archivo de construcción que no va a poder construirse.

**Nota sobre la variante anterior.** Hasta la versión 1.0 esta vía tomaba una **ruta del servidor**, no un contenido. Se cambió por cuatro razones verificadas: la ruta la resuelve el demonio del host y no el proceso del panel; el modelo admitía cualquier ruta del servidor como contexto sin ninguna regla que la acotara; el insumo era el único del producto que él mismo **no podía obtener ni verificar**, porque no tiene carga de archivos; y sin repositorio no había ninguna señal de que el archivo hubiera cambiado, para lo cual la fecha de modificación del contenido es hoy el equivalente del commit. Es la especificación de integración `DI-20`, **sin revisar**.

**FA-02 — Reconstrucción en cada despliegue.**
Disparador: el servicio declara que se reconstruye en cada despliegue.
Pasos: la construcción se ejecuta siempre; en caso contrario se reutiliza la imagen ya construida.
Punto de retorno: paso 4.

**FA-03 — Servicio efímero.**
Disparador: el servicio está marcado como efímero.
Pasos: se reconstruye en cada uso y no conserva estado propio.
Punto de retorno: paso 4.

## 6. Excepciones y errores

| Código | Causa | Respuesta del sistema |
| --- | --- | --- |
| `422` de origen incompleto | El origen es repositorio y falta la ruta del archivo de construcción o la rama | Rechazo (RN-08) |
| Construcción fallida | La construcción de la imagen termina con error | El despliegue queda fallido con su error identificable, sin afectar a los demás contenedores de la operación (RN-31) |
| `422` de referencia no resoluble | Una referencia del servicio no resuelve a una variable de ámbito válido | El despliegue de ese servicio se aborta con la causa identificada y no se crea el contenedor (RN-21, RN-24) |
| Ruta no interpretable | La ruta de contexto de construcción no existe en el sistema de archivos que interpreta el motor | El error se traduce a una causa propia identificable. El intake declara que la ruta la interpreta el sistema de archivos del host y no el del entorno de desarrollo |

## 7. Postcondiciones

**En caso de éxito:** existe una imagen construida y un contenedor creado y arrancado a partir de ella; la línea de tiempo del despliegue registra el evento de construcción con su duración; el estado del nodo refleja el estado real.

**En caso de fallo:** el despliegue queda fallido con la causa —de construcción, de resolución o de creación—; ningún otro contenedor de la operación se ve afectado.

## 8. Criterios de aceptación

| ID | Given | When | Then |
| --- | --- | --- | --- |
| CA-01 | Un servicio con origen por archivo de construcción local, con su contexto y sus argumentos declarados | El administrador lo despliega | El sistema construye la imagen, registra el evento de construcción en la línea de tiempo y crea el contenedor con la imagen resultante |
| CA-02 | Un servicio con origen por repositorio remoto y sin rama declarada | El administrador intenta darlo de alta o desplegarlo | El sistema rechaza con `422` por falta de la rama |
| CA-03 | Un servicio cuya construcción termina con error | El administrador lo despliega dentro de una operación que alcanza a otros servicios | Ese despliegue queda fallido con su error y los demás contenedores conservan su resultado |
| CA-04 | Un servicio con una referencia válida y una construcción exitosa | El administrador lo despliega | El contenedor recibe las variables ya resueltas, con valores y no expresiones |

## 9. Trazabilidad

| Dimensión | Referencia |
| --- | --- |
| Necesidad de negocio | [NB-04](../../01-Necesidades-Negocio/Necesidades-De-Negocio/NB-04-Alta-De-Servicio-Sin-Copiar-Y-Adaptar.md) |
| Reglas de negocio aplicables | RN-08, RN-17, RN-21, RN-24, RN-31, RN-38, RN-40. Reglas conceptuales: RC-18 |
| Historias de usuario a generar en 06 | US-CU-15-1 (desplegar construyendo la imagen desde un archivo local), US-CU-15-2 (desplegar construyendo la imagen desde un repositorio remoto), US-CU-15-3 (seguir el progreso de la construcción), US-CU-15-4 (declarar el contenido de un archivo de construcción en el panel), US-CU-15-5 (saber qué imagen construida está corriendo, por su digesto) |
| Componentes esperados en 05 | Capa `Web`, controlador del recurso de despliegue y vista de progreso; capa `Application`, módulo de servicios y despliegues; capa `Domain`, agregado `Despliegues`; capa `Infrastructure`, `Contenedores`. Referencia tentativa |
| Tests previstos en 08 | Casos a derivar por 08-Calidad-Y-Pruebas para RN-08, que no tiene caso propio en el anexo E-22. T-31 y T-38 verifican el resultado por contenedor y la resolución previa, que este caso de uso comparte con CU-13 |

Los identificadores de historia de usuario llevan la forma `US-CU-XX-n` y son **provisionales**: la numeración definitiva es potestad de 06-Backlog-Tecnico. La forma se eligió para que ningún identificador emitido acá colisione con la numeración que 06 asigne.

## 10. Notas y supuestos

- **Brecha declarada:** RN-08 no tiene caso ejecutable propio en el anexo E-22. Destinatario: 08-Calidad-Y-Pruebas.
- El intake declara que toda ruta que la aplicación le pase al motor la interpreta el sistema de archivos del host, y que el directorio de datos de trabajo debe estar montado en la misma ruta absoluta en los dos lados. Es materia de 05-Arquitectura-Tecnica y condiciona este caso de uso.
- El seguimiento del progreso de construcción es una capacidad declarada de F-10 y no una derivación de esta categoría.
- **Las expresiones de referencia nunca son resolubles en tiempo de construcción**, por RN-24, que las resuelve inmediatamente antes de crear el contenedor. **No van en los argumentos de construcción.** Lo que necesita valores resueltos —una migración de base de datos, típicamente— va en el **comando de arranque** del servicio, que CU-03 declara desde su versión 2.0.
- **Brecha cerrada, `Q-15`, y brecha abierta, `Q-16`: el paso 6 se parte en dos y conviene no fusionarlas.** El **registro del digesto** de la imagen construida quedó **decidido en positivo el 2026-07-30** y este paso es el que lo escribe. La **marca de pertenencia** sigue siendo `Q-16`, **abierta**: sin ella el producto no puede distinguir lo que construyó de lo ajeno y ninguna limpieza de imágenes es segura (RN-40, CU-37). El paso 6 declara las dos cosas y **sólo una está decidida**. Destinatario de lo que sigue abierto: agente humano del proyecto.
- **Brecha declarada, `Q-8` y `Q-12`:** construir **ejecuta código en el mismo servidor que administra el motor de contenedores**, y no hay ninguna regla que acote qué repositorio es admisible ni qué puede hacer un archivo de construcción. Cruzado con el acceso al punto de acceso del motor, es la mayor superficie de riesgo del producto. Destinatario: agente humano del proyecto.
- **Brecha declarada, `Q-13`:** si el despliegue registra la fecha de modificación del contenido del archivo de construcción que usó, que es el equivalente del commit en esta vía. Destinatario: agente humano del proyecto.

## 11. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 2.1 | 2026-07-30 | **Acotamiento de la dependencia declarada del paso 6, por la ronda de decisiones del agente humano del proyecto del 2026-07-30** consolidada en el `PRODUCT-INTAKE-SelfHosted-Service` v3.2 §19. Sube **minor**: ningún propósito, actor, precondición, flujo, excepción, postcondición ni criterio de aceptación cambia de contenido, y la numeración del flujo principal se conserva. **`Q-15` decidida en positivo**: el registro del digesto de la imagen construida deja de depender de una decisión abierta y este caso de uso es uno de los dos que lo escriben, junto con CU-13. **`Q-16` sigue abierta** y la nota se parte en dos para que no se lea como cerrada por arrastre: el paso 6 declara el digesto **y** la marca de pertenencia, y sólo el primero está decidido; sin la marca ninguna limpieza es segura. Las brechas `Q-8`, `Q-12` y `Q-13` de §10 **siguen abiertas sin cambios**. Ninguna decisión abierta se cerró acá. La versión 2.0 queda archivada en `_legacy/2026-07-30/CU-15-Despliegue-Construyendo-La-Imagen-v2.0.md` |
| 2.0 | 2026-07-30 | Migración normativa del conjunto 4.1 al 6.0, fase M4 corte 3, bajo `Rules-Especificacion-Funcional` 4.0, `Vocabulario-Rules` 2.1 y `Migracion-Rules` 1.0. Clasificación **regenerar contenido** por el salto major de la regla que lo gobierna; fuente de contenido: el documento de origen, archivado en `_legacy/2026-07-30/CU-15-Despliegue-Construyendo-La-Imagen-v1.1.md`. Sube **major** porque la nomenclatura anterior deja de cumplir. Cabecera: la etiqueta `Proyecto` pasa a `Producto` sobre el mismo valor, que `Vocabulario-Rules` §3 prohíbe como etiqueta de un plano sobre el valor de otro, y la trazabilidad upstream apunta al `PRODUCT-INTAKE-SelfHosted-Service` renombrado. Sustitución léxica **por ocurrencia** según `Vocabulario-Rules` §9.5 y el plan de migración §3.5, sin ningún reemplazo global de cadena: se revisaron las tres ocurrencias de la cadena `soluci` de este documento y se sustituyó una sola, la que designaba el nivel superior, con su concordancia de género —el nombre del actor primario «Administrador de la solución» de §2, que pasa a «Administrador del producto»—; no hay en este documento ninguna «solución de código» ni ningún uso de prosa de negocio que R2 preserve. Las dos ocurrencias de la cadena `resoluci` —«re**soluci**ón», «re**soluci**ones»— **no son la palabra «solución» y quedaron intactas**, con conteo verificado antes y después de la intervención: sustituirlas habría producido la palabra inexistente que la `[5.1]` del framework documenta sobre sí mismo, la que resulta de reemplazar la cadena `soluci` dentro de «re**soluci**ón». De las seis ocurrencias de «proyecto», **ninguna pasó a «proyecto de código»**: dos son «proyecto SelfHosted», la entidad del dominio —la red del proyecto en §3 y la serialización de §13— y tres son el emprendimiento, «agente humano del proyecto» como destinatario de las brechas `Q-15`/`Q-16`, `Q-8`/`Q-12` y `Q-13` de §10, que quedan a secas; la restante era la etiqueta de cabecera. La clasificación sigue el intake §12, que declara los tres referentes del término, y el glosario del dominio de `Vision-Producto.md` §9. **Glosario**: §2.1 y §4.2.4 de la regla convierten el vocabulario de la categoría en el artefacto propio y obligatorio `Glosario-Funcional.md`, que hasta la 3.0 era el punto 6 de `Modelo-Conceptual.md` y por lo tanto dependía de que el proyecto de código tuviera persistencia. Este caso de uso **no lo emite**: los términos que acuña o precisa y que aparecen en más de un artefacto de 02 se devolvieron al lote que lo emite, por la regla de inclusión de §3.3, y los que ya declara el glosario del dominio de `Vision-Producto.md` §9 se referencian en lugar de redefinirse, por la regla de no duplicación de la misma sección. Las once secciones obligatorias de §4.2 ya estaban completas y no se agregó ni se quitó ninguna; la tabla de contenido de §4.1 y la sección opcional §13 que §4.3 admite para `web-monolith` quedan como estaban. Ningún propósito, actor, precondición, paso del flujo principal, flujo alternativo, excepción, postcondición, criterio de aceptación, regla de negocio aplicable, historia de usuario prevista, componente esperado, test previsto ni brecha declarada cambió de enunciado: la migración es léxica y de forma de cabecera. Las filas históricas de esta tabla **no se reescribieron**, por `SDD-Development-Guide.md` §VI.2 |
| 1.1 | 2026-07-29 | **El origen por archivo de construcción pasa de ruta del servidor a contenido en línea, y se incorpora el digesto de la imagen construida.** El paso 3 verifica los datos obligatorios **por variante** (RN-08). El paso 6 registra el **digesto y la marca de pertenencia** de la imagen construida, que es lo que distingue una imagen del producto de una ajena en un almacén compartido. FA-01 se reescribe entero: pasa de «archivo de construcción local» por ruta a «archivo de construcción en línea» por contenido, con **el límite técnico declarado** —sin contexto de construcción no se pueden copiar archivos locales, de modo que la vía sirve para ajustar una imagen ya publicada y no para construir código fuente propio— y con las cuatro razones verificadas del cambio. §9 suma RN-38, RN-40 y dos historias de usuario. §10 suma que las expresiones de referencia **no van en los argumentos de construcción** y que lo que necesita valores resueltos va en el comando de arranque, más **cuatro brechas declaradas**: `Q-15`, `Q-16`, `Q-8` con `Q-12` —construir ejecuta código en el servidor que administra el motor y ninguna regla lo acota— y `Q-13`. La versión 1.0 queda archivada en `_legacy/2026-07-29/`. Origen: §22.2 sexta fila, §13 y §15.1 del documento de trabajo `SDD/Estado/Redefinicion-Servicio.md` v2.0, y la especificación de integración `DI-20` |
| 1.0 | 2026-07-29 | Corrección absorbida dentro de la versión 1.0, sin subirla y sin archivar, por la política de versionado de `Master-Prompt.md` §5: el documento está en estado `Propuesto` y la corrección proviene del audit de su propia fase de emisión. §2 suma la declaración de que los nombres de los actores no humanos son denominaciones acuñadas por esta categoría y no componentes declarados, con la salvedad de los seis que sí trazan a una fuente. Ningún actor cambia de nombre y ningún flujo se altera: lo que se corrige es que la categoría afirmaba que todo dato trazaba y trece de los diecinueve nombres de actor no humano no lo cumplían. Origen: hallazgo H-04 del informe [Audit/B-02-03-r1.md](../../Audit/B-02-03-r1.md) |
| 1.0 | 2026-07-29 | Versión inicial, derivada de la necesidad de negocio upstream y de las secciones del intake citadas en la cabecera |

## 13. Interacción multiusuario y concurrencia

Sección opcional admitida por §4.3 de `Rules-Especificacion-Funcional.md` para el tipo `web-monolith`. Conserva el número que esa sección le asigna, de modo que la numeración salta del 11 al 13 por construcción de la regla y no por omisión.

El despliegue con construcción es más largo que el despliegue desde imagen ya publicada y ocupa la serialización por proyecto SelfHosted durante más tiempo. El intake declara esa serialización en §17.P.10.

