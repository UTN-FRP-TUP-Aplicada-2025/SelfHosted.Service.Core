> **Documento archivado.** Estado: **Superado**. Es la copia completa del estado previo de `Experiencia-De-Uso.md`, versión **2.1**, archivada el 2026-07-30 por la política de deprecación de `Master-Prompt.md` §5.1, al cerrarse la brecha `B-UX-30` con la propagación de la retroalimentación del paso 6 de la Fase B2 a `SUP-06`, `SUP-09`, `SUP-11` y `SUP-12`. La versión vigente es [`Experiencia-De-Uso.md`](../../Experiencia-De-Uso.md). **El cuerpo que sigue no se modificó.**
>

---

# Experiencia de uso — SelfHosted Service

**Proyecto de código:** SelfHosted-Service
**Producto:** SelfHosted Service
**Documento:** Experiencia-De-Uso.md
**Versión:** 2.1
**Estado:** Propuesto
**Fecha:** 2026-07-30
**Autor:** UX/UI Designer + Frontend Lead (AG-03)
**Variante:** UX/UI

---

## Tabla de contenido

- [§1. Audiencia y contexto de uso](#1-audiencia-y-contexto-de-uso)
  - [§1.1 Persona objetivo](#11-persona-objetivo)
  - [§1.2 Contexto físico, técnico y emocional](#12-contexto-físico-técnico-y-emocional)
  - [§1.3 Frecuencia y duración de uso](#13-frecuencia-y-duración-de-uso)
  - [§1.4 Perfil de operador único y sus omisiones declaradas](#14-perfil-de-operador-único-y-sus-omisiones-declaradas)
  - [§1.5 Audiencias que esta categoría no diseña](#15-audiencias-que-esta-categoría-no-diseña)
- [§2. Principios de diseño](#2-principios-de-diseño)
  - [§2.1 Catálogo de diseño aplicado y herencia de tokens](#21-catálogo-de-diseño-aplicado-y-herencia-de-tokens)
  - [§2.2 Heurísticas de Nielsen aplicables](#22-heurísticas-de-nielsen-aplicables)
  - [§2.3 Leyes UX relevantes](#23-leyes-ux-relevantes)
  - [§2.4 Las cuatro capacidades transversales y su contrato](#24-las-cuatro-capacidades-transversales-y-su-contrato)
  - [§2.5 Frontera entre configuración de aplicación y configuración de entorno](#25-frontera-entre-configuración-de-aplicación-y-configuración-de-entorno)
- [§3. Flujos clave](#3-flujos-clave)
  - [§3.1 FL-01 · Primer arranque y aprovisionamiento del administrador](#31-fl-01--primer-arranque-y-aprovisionamiento-del-administrador)
  - [§3.2 FL-02 · Acceso al panel en los arranques posteriores](#32-fl-02--acceso-al-panel-en-los-arranques-posteriores)
  - [§3.3 FL-03 · Alta de un proyecto SelfHosted con API y base de datos](#33-fl-03--alta-de-un-proyecto-selfhosted-con-api-y-base-de-datos)
  - [§3.4 FL-04 · Incorporación de un contenedor que ya está corriendo](#34-fl-04--incorporación-de-un-contenedor-que-ya-está-corriendo)
  - [§3.5 FL-05 · Arranque bloqueado por conflicto de dirección](#35-fl-05--arranque-bloqueado-por-conflicto-de-dirección)
  - [§3.6 FL-06 · Tarde de ajustes con revisión antes de aplicar](#36-fl-06--tarde-de-ajustes-con-revisión-antes-de-aplicar)
  - [§3.7 FL-07 · Atribución del consumo del servidor](#37-fl-07--atribución-del-consumo-del-servidor)
  - [§3.8 FL-08 · Reproducibilidad de la arquitectura fuera del servidor](#38-fl-08--reproducibilidad-de-la-arquitectura-fuera-del-servidor)
  - [§3.9 Puntos de fricción anticipados, transversales](#39-puntos-de-fricción-anticipados-transversales)
- [§4. Estados y feedback](#4-estados-y-feedback)
  - [§4.1 Mapa de estados por superficie clave](#41-mapa-de-estados-por-superficie-clave)
  - [§4.2 Lenguaje visual de estados y su correspondencia con el catálogo](#42-lenguaje-visual-de-estados-y-su-correspondencia-con-el-catálogo)
  - [§4.3 El modo pendiente y la frontera de propuesta](#43-el-modo-pendiente-y-la-frontera-de-propuesta)
  - [§4.4 Sello de identidad de versión](#44-sello-de-identidad-de-versión)
- [§5. Accesibilidad](#5-accesibilidad)
- [§6. Internacionalización](#6-internacionalización)
- [§7. Performance percibida](#7-performance-percibida)
- [§8. Errores y recuperación](#8-errores-y-recuperación)
  - [§8.1 Taxonomía de errores que el administrador ve](#81-taxonomía-de-errores-que-el-administrador-ve)
  - [§8.2 Catálogo de códigos de resultado de las superficies de identidad](#82-catálogo-de-códigos-de-resultado-de-las-superficies-de-identidad)
  - [§8.3 Tono de los mensajes](#83-tono-de-los-mensajes)
- [§9. Trazabilidad](#9-trazabilidad)
  - [§9.1 Tabla de trazabilidad del artefacto](#91-tabla-de-trazabilidad-del-artefacto)
  - [§9.2 Superficies y los casos de uso que las ejercitan](#92-superficies-y-los-casos-de-uso-que-las-ejercitan)
  - [§9.3 Cobertura inversa: casos de uso a superficie](#93-cobertura-inversa-casos-de-uso-a-superficie)
- [§10. Notas y supuestos](#10-notas-y-supuestos)
  - [§10.1 Contradicciones declaradas entre el catálogo de diseño y el anexo E-18](#101-contradicciones-declaradas-entre-el-catálogo-de-diseño-y-el-anexo-e-18)
  - [§10.2 Brechas abiertas de esta categoría](#102-brechas-abiertas-de-esta-categoría)
  - [§10.3 Supuestos de derivación](#103-supuestos-de-derivación)
- [§11. Control de cambios](#11-control-de-cambios)

---

## §1. Audiencia y contexto de uso

### §1.1 Persona objetivo

Hay **una sola persona objetivo**: el administrador único del producto. `Vision-Producto.md` §2.1 lo declara como «único usuario con credenciales de la aplicación», y §2.2 fija que los actores se identifican por rol y nunca por nombre propio, porque el propietario del servidor, el agente humano del proyecto y el usuario final son la misma persona (supuesto S-06, cerrado el 2026-07-27). Ningún artefacto de esta categoría pide un nombre propio.

| Dimensión | Valor | Fuente |
| --- | --- | --- |
| Rol | Administrador del producto, con permisos de administración total sobre el servidor | `Vision-Producto.md` §2.1; intake §1 |
| Nivel técnico | **Derivado, no declarado.** Alto, inferido de que ya opera el parque a mano, con definiciones sueltas, variables de entorno no versionadas, montajes de directorio y modos de red distintos por servicio | `Vision-Producto.md` §1.1 describe esa práctica y **no califica el nivel técnico del operador**. Los hechos que sostienen la inferencia sí están declarados; la calificación es de esta categoría |
| Tarea principal | Crear proyectos SelfHosted, configurar servicios en el lienzo, desplegar, arrancar y detener | `Vision-Producto.md` §2.1 |
| Cantidad de identidades del sistema | Exactamente una | Intake §9, exclusión 5; §17.P.5 |

El nivel técnico alto cambia dos cosas del diseño, y conviene declararlas para que no se lean como omisiones. Primero, el vocabulario de la interfaz es el vocabulario del dominio del cliente, que el glosario del intake §12 fija y que `Vision-Producto.md` §9 transcribe: imagen, etiqueta, montaje, política de reinicio, réplica, modo de red. No se traduce a metáforas más blandas. Segundo, la interfaz no enseña el dominio: enseña **este producto**. La ayuda contextual explica qué hace un parámetro dentro de SelfHosted Service, no qué es un contenedor.

### §1.2 Contexto físico, técnico y emocional

| Dimensión | Valor declarado | Fuente |
| --- | --- | --- |
| Equipo desde el que se opera | Windows Server 2022, versión 21H2, build 20348.5256 | `Compatibilidad-Plataformas.md` §2.1 |
| Navegador | Google Chrome de escritorio, canal estable, versión mínima 150.0.7871.186. Toda otra familia se declara no soportada | `Compatibilidad-Plataformas.md` §2.1 y §4 |
| Red | Red local. El servicio no se publica a internet | `Compatibilidad-Plataformas.md` §2.1; intake §9, exclusión 4 |
| Superficies pequeñas | Fuera de la matriz. Navegadores móviles y pantallas pequeñas no son plataforma target | `Compatibilidad-Plataformas.md` §4 |
| Modelo de interfaz | La interfaz vive en el servidor y el navegador es una pantalla conectada por un canal permanente: cada clic, cada arrastre de un nodo y cada tecla es un viaje de ida y vuelta | `Compatibilidad-Plataformas.md` §3.1, restricción CP-10 |

El contexto emocional se deriva de lo que el problema declara y no se infiere de un perfil genérico. `Vision-Producto.md` §1.1 dice que el costo del método actual «no es catastrófico de a una operación, pero es permanente y crece con el parque». La consecuencia de diseño es que el producto no compite contra la ansiedad sino contra la **fricción acumulada**: nadie llega a la pantalla en pánico, llega cansado de abrir archivos dispersos. Lo que la interfaz tiene que devolver, entonces, es la lectura completa de una arquitectura en una pantalla, y no un tablero de alarmas.

El segundo rasgo emocional sí es de riesgo: el administrador opera sobre servicios **que ya están en producción en su servidor**, sin redundancia de disco (`Vision-Producto.md` §7.1, restricción RE-06). Toda acción que pueda cortar un servicio en funcionamiento se declara antes de ejecutarse, con esas palabras. El caso concreto que el intake nombra es el primer redespliegue de un contenedor incorporado, que sí implica corte y que «la interfaz debe advertir con esas palabras» (anexo E-11).

### §1.3 Frecuencia y duración de uso

| Dimensión | Valor declarado | Fuente |
| --- | --- | --- |
| Frecuencia | Diaria, una vez entregado el primer alcance | `Vision-Producto.md` §2.1 |
| Patrón de sesión | El uso previsto incluye dejar el panel abierto y volver a mirarlo | `Compatibilidad-Plataformas.md` §3.2, riesgo RP-01 |
| Escala que se recorre | 10 a 30 nodos por lienzo; menos de 50 contenedores en el parque | Intake §17.P.10 |

El patrón de «dejar abierto y volver» tiene dos consecuencias de diseño, las dos declaradas por las fuentes y ninguna inventada acá. La primera es que la vista abierta sondea el estado cada 3 a 5 segundos y **las vistas cerradas no sondean nada** (intake §17.P.10, capa de adaptadores). La segunda es que la suspensión de la pestaña en segundo plano queda como riesgo abierto RP-01, con su medición asignada a `08-Calidad-Y-Pruebas`: el diseño no la resuelve y no debe presumirla resuelta.

### §1.4 Perfil de operador único y sus omisiones declaradas

`Design-Rules-Acceso-Monousuario.md` §2 exige que las omisiones del perfil se declaren en este artefacto y que ningún elemento omitido se dibuje, ni siquiera deshabilitado. Se declaran acá, contrastadas contra lo que el intake excluye:

| Elemento | En este producto | Fuente de la omisión |
| --- | --- | --- |
| Identificador y secreto del administrador | Presentes | Intake §4, capacidad F-01 |
| Registro de cuentas | **Omitido.** La identidad se crea una sola vez, en el primer arranque | Intake §6, flujo 4; §9, exclusión 5 |
| Selector o listado de cuentas | **Omitido.** No hay entre qué elegir | Intake §9, exclusión 5 |
| Recuperación de la contraseña | **Omitida.** «No recupera contraseñas», declarado fuera de alcance | Intake §9, exclusión 7; §4, capacidad F-22 (Won't Have v1) |
| Persistencia de sesión opcional, del tipo «recordarme» | **Omitida.** La política de sesión es única y no se delega en una casilla | `Design-Rules-Acceso-Monousuario.md` §2 y §6 |
| Roles y permisos visibles | **Omitidos.** Una sola identidad tiene todo el alcance | Intake §9, exclusión 5; §4, capacidad F-21 (Won't Have v1) |
| Segundo factor | **Omitido** en este alcance | Intake §4, capacidad F-18 (Won't Have v1); §17.P.5 |
| Cambio de la contraseña | **Presente.** Es la única operación de identidad del ciclo de vida normal, y exige la contraseña actual | Intake §6, flujo 4; CU-31 |
| Cierre de sesión | **Presente y siempre visible** en la barra superior | `Design-Rules-Acceso-Monousuario.md` §4.3 y §6. **No coincide con el intake**, que lo ubica dentro de un menú de usuario: ver la contradicción `C-UX-05` |

Ninguno de los elementos omitidos se dibuja deshabilitado ni con leyenda de «próximamente». La regla es la de `Design-Rules-Acceso-Monousuario.md` §10: lo que no aplica, no se dibuja.

Los ámbitos de los tokens de API (`proyectos:leer`, `proyectos:escribir`, `despliegues:ejecutar`, `catalogo:leer`, `catalogo:escribir`, `sistema:leer`, intake §17.P.5) **no son roles del administrador y no se presentan como tales**. Son permisos de una credencial de máquina, y sólo aparecen en la superficie de emisión de credenciales. Enunciarlos en cualquier otra superficie sugeriría una granularidad de permisos que no existe para la persona.

### §1.5 Audiencias que esta categoría no diseña

El indicador `tiene_portal_developers` es falso: no hay integradores externos. El intake §18 lo declara sin ambigüedad y por eso los samples existen para sostener las demostraciones de etapa, no para un tercero.

Hay un segundo consumidor del producto, el **automatismo de integración continua** (`Vision-Producto.md` §2.1), pero su superficie es la API REST con una credencial de máquina, no una pantalla. Por lo tanto:

- Esta categoría produce **únicamente la rama UX/UI** de `Rules-UX-UI-DX.md`, y no `DX-Developer-Experience.md`, `Guia-Onboarding-Developer.md`, `DX-Error-Messages.md`, `DX-Portal-Developers.md` ni `DX-Operability.md`. La tabla §2.1 de esas reglas los declara obligatorios sólo para tipos sin interfaz final, y `web-monolith` con `tiene_ui_final` verdadero los omite.
- Lo único que el automatismo aporta a esta categoría es una superficie de la persona: la emisión, el listado y la revocación de credenciales de máquina (CU-32), que sí es una pantalla que el administrador opera.

---

## §2. Principios de diseño

### §2.1 Catálogo de diseño aplicado y herencia de tokens

Esta categoría no define ningún token visual propio. Hereda los del catálogo `Devs/References/Design/`, cargado por su índice `Index-Design-Rules.md`, en el orden de apilado que §4.1 de ese índice declara.

| Capa del catálogo | Documento | Por qué aplica en este producto |
| --- | --- | --- |
| Base, siempre | `Design-Rules-Web-Generico.md` 1.2 | Piso obligatorio de todo proyecto de código con interfaz web |
| Especialización por stack | `Design-Rules-Blazor-Mudblazor.md` 1.2 | La Parte C del intake declara .NET 10 con Blazor Interactive Server y MudBlazor 9.7.0 (§17.P.1) |
| Extensión por capacidad | `Design-Rules-Config-Esquema.md` 1.1 | El usuario fija parámetros de cada servicio y del sistema: CU-03, CU-19, CU-32, CU-34 |
| Extensión por capacidad | `Design-Rules-Primer-Arranque.md` 1.0 | Se despliega por instancia y arranca sin administrador creado: CU-29, intake §6 flujo 4 |
| Extensión por capacidad | `Design-Rules-Acceso-Monousuario.md` 1.0 | Una sola identidad de operación, sin roles ni gestión de usuarios: intake §9 exclusión 5 |
| Extensión por capacidad | `Design-Rules-Identidad-De-Version.md` 1.0 | Produce imágenes de contenedor etiquetadas por etapa cerrada: intake §17.P.7 y §17.P.8 |

Las cuatro extensiones cargan a la vez. `Index-Design-Rules.md` §4 declara que ésa es exactamente la combinación del arquetipo de panel de control monolítico de un servicio específico, que es este caso. Se leyeron además las tres notas de coherencia del subárbol (`Coherencia-Incorporacion.md`, `Coherencia-Config-Esquema.md` y `Coherencia-Panel-Monolitico.md`); la única consecuencia operativa que aportan es la de `Coherencia-Panel-Monolitico.md` §5, observación 1: los esqueletos en arte ASCII de las extensiones son **referencia de composición** y no wireframes del proyecto, de modo que los wireframes de esta categoría los referencian por nombre de patrón en lugar de copiarlos.

Regla que esta categoría se aplica a sí misma, tomada de `Rules-UX-UI-DX.md` §1.4 y del anti-patrón de §4.4: **está prohibido definir tokens, paleta, tipografía, espaciado o iconografía ad hoc por pantalla**. Todo valor visual sale del theme único; ningún wireframe de esta categoría declara colores, tipografías ni medidas de CSS, salvo las tres medidas de composición que las extensiones fijan por patrón (el ancho acotado de la tarjeta de acceso y de aprovisionamiento, el ancho del cajón de navegación y el punto de quiebre principal).

El único token que este producto necesita y el catálogo no tiene es el del estado «pendiente de aplicar». Se declara como brecha `B-UX-05` en §10.2 y como contradicción en §10.1, y no se resuelve acá inventando un valor.

### §2.2 Heurísticas de Nielsen aplicables

| Heurística | Aplicación en el producto | Fuente | Verificación |
| --- | --- | --- | --- |
| Visibilidad del estado del sistema | Banner fijo de cambios pendientes con contador, detalle y aplicar, arriba del lienzo, «para hacer visible el estado transaccional del borrador» | Anexo E-18, decisiones de la pantalla del lienzo | Inspección heurística sobre la maqueta de la Fase B2; guion de demostración de la etapa que entrega el cajón de cambios |
| Visibilidad del estado del sistema | Insignia y borde de estado por nodo, derivados del despliegue activo y no de un estado propio del servicio | Anexo E-18, lenguaje visual de estados; `Vision-Producto.md` §3.2, diferenciador DV-02 | Snapshot por estado en `08-Calidad-Y-Pruebas` |
| Visibilidad del estado del sistema | Línea de tiempo de eventos del despliegue, con la causa identificable del fallo | Anexo E-3 | Caso T-31 del anexo E-22 |
| Correspondencia entre el sistema y el mundo real | Vocabulario del glosario del dominio del cliente en toda la interfaz | Intake §12; [`Vision-Producto.md`](../00-Contexto/Vision-Producto.md) §9, glosario raíz del dominio; [`Glosario-Funcional.md`](../02-Especificacion-Funcional/Glosario-Funcional.md), glosario funcional de 02 | Revisión de microcopy contra los dos glosarios upstream, con `Glosario-UX.md` como puente. `Rules-UX-UI-DX` 4.0 §3.3 obliga a que `Glosario-UX.md` **referencie** los términos que esos dos ya declaran con la misma semántica, en lugar de redefinirlos |
| Control y libertad del usuario | Descarte de un cambio individual del conjunto pendiente, y deshacer y rehacer apoyados en el conjunto de cambios y no en la herramienta de dibujo | CU-23; intake §17.P.11, decisión DA-05 | Guion de demostración de la etapa de cambios pendientes |
| Consistencia y estándares | Patrones y tokens únicos del catálogo, realizados una sola vez en el theme | `Design-Rules-Web-Generico.md` §1, principio 3; `Design-Rules-Blazor-Mudblazor.md` §1 | Criterio de aceptación de `Design-Rules-Blazor-Mudblazor.md` §10: cero valores de color literales fuera del theme |
| Prevención de errores | El conflicto de dirección se valida **antes** de tocar el motor de contenedores y bloquea el arranque con resoluciones concretas | RN-03; anexo E-8; `Vision-Producto.md` §3.2, diferenciador DV-04 | Casos T-05 a T-09 y T-24 del anexo E-22 |
| Prevención de errores | Confirmación escribiendo el nombre para eliminar un servicio con datos persistidos, y para incorporar o detener un contenedor sin etiquetas de la aplicación | RN-10; intake §17.P.5, salvaguardas del socket | **Sin caso ejecutable en el anexo E-22.** Recorrida la columna de regla de ese anexo, RN-10 no tiene caso propio, y ningún caso declara la confirmación escrita como resultado esperado. Es la brecha B-05 de [`02-Especificacion-Funcional`](../02-Especificacion-Funcional/Especificacion-Funcional.md) §9, que el audit corrigió de dos reglas a tres —RN-02, RN-08 y RN-10—. La verificación queda por derivar en `08-Calidad-Y-Pruebas`; ver `B-UX-22` |
| Prevención de errores | En modo de red macvlan el campo de publicación de puertos **se deshabilita**, no se ignora | Intake §17.P.12; RN-07 | Caso T-10 del anexo E-22 |
| Prevención de errores | Etiquetas de botón que separan «guardar el cambio» de «desplegar»: guardar agrega al conjunto pendiente y no despliega | Anexo E-18, panel lateral de servicio | Verificación explícita que E-18 pide en «Qué verificar» |
| Reconocer antes que recordar | El lienzo es la vista por defecto del proyecto SelfHosted, «porque la arquitectura *es* el proyecto», con la disposición conservada entre sesiones | Anexo E-18; CU-05 | Guion de demostración de la etapa del lienzo |
| Flexibilidad y eficiencia de uso | Arrancar y detener el proyecto completo, siempre visibles en la barra superior, por ser las dos operaciones más frecuentes | Anexo E-18, decisiones de la pantalla del lienzo | Inspección heurística sobre la maqueta |
| Diseño estético y minimalista | Un único botón primario por pantalla | Anexo E-18, decisiones de la pantalla del lienzo | Inspección de cada wireframe: exactamente una acción primaria |
| Reconocer, diagnosticar y recuperarse de errores | El informe de conflicto identifica al ocupante por servicio y por proyecto SelfHosted, y ofrece tres resoluciones accionables | Anexo E-8; CU-21 | Casos T-05 a T-09 del anexo E-22 |
| Reconocer, diagnosticar y recuperarse de errores | Sello de versión y detalle de diagnóstico copiable en un solo gesto, para que un reporte no empiece por averiguar qué instancia es | `Design-Rules-Identidad-De-Version.md` §4.4 | Inspección de la superficie de configuración y de la de acceso |
| Ayuda y documentación | Ayuda contextual por campo, derivada del descriptor del parámetro y nunca escrita a mano por pantalla | `Design-Rules-Config-Esquema.md` §4.2 | Criterio de aceptación de esa extensión, §9 |

### §2.3 Leyes UX relevantes

| Ley | Aplicación | Justificación en este producto |
| --- | --- | --- |
| Hick | Divulgación progresiva de las dimensiones avanzadas del servicio: las comunes quedan visibles y las avanzadas viven en un expansor colapsado | El alta de un servicio declara ocho dimensiones de configuración (intake anexo E-19), y presentarlas todas a la vez convierte la pantalla más frecuente del producto en un formulario ilegible. El patrón es el de `Design-Rules-Config-Esquema.md` §4.3 |
| Hick | Omisión de toda ceremonia de identidad que no aplica | Con una sola identidad, la decisión óptima es la que no hay que tomar (`Design-Rules-Acceso-Monousuario.md` §1) |
| Fitts | Las dos operaciones más frecuentes —arrancar y detener el proyecto SelfHosted completo— viven en la barra superior, y la tarjeta de acceso es clicleable entera | E-18 declara la ubicación por frecuencia; el área clicleable completa es el patrón §4.2 del documento base |
| Miller | No más de cinco a siete ítems de primer nivel por agrupación | El panel lateral del servicio declara **siete** pestañas (General, Variables, Red, Recursos, Montajes, Despliegues, Logs) en el anexo E-18. Está en el límite superior de la ley, no por encima: se conserva la agrupación de E-18 y se declara que agregar una octava pestaña exige subdividir |
| Jakob | Un mismo concepto se ve y se comporta igual en todo el producto | El estado de un servicio se lee igual en el nodo del lienzo, en la lista del tablero y en la cabecera del panel lateral: mismo par de insignia y etiqueta, misma correspondencia de estado |

### §2.4 Las cuatro capacidades transversales y su contrato

Cada extensión por capacidad exige que este artefacto declare un contrato. Los cuatro se declaran acá y los wireframes los consumen por referencia.

**Predicado de aprovisionamiento** (`Design-Rules-Primer-Arranque.md` §2). El sistema declara un único predicado booleano, y ninguna superficie lo infiere por su cuenta.

| Campo del contrato | Valor en este producto | Fuente |
| --- | --- | --- |
| `estaAprovisionado` | Verdadero cuando existe el administrador único. El intake lo enuncia como «detecta que no hay administrador y presenta el alta» | Intake §6, flujo 4; CU-29 |
| `artefactoMinimo` | La identidad del administrador único: nombre de usuario y contraseña | Intake §4, capacidad F-01; CU-29 |
| `destinoSiFalta` | La superficie de aprovisionamiento inicial | Anexo E-18, mapa de navegación, nodo «`/login` o alta inicial del administrador» |
| `destinoSiExiste` | La superficie de acceso al panel | Anexo E-18, mismo nodo; intake §6 flujo 4: «en los arranques posteriores la aplicación ya no ofrece el alta y presenta el inicio de sesión» |
| `destinoAlCompletar` | El listado de proyectos SelfHosted. Es la única arista que el mapa de navegación de E-18 traza desde el nodo de acceso, y el intake declara que el alta «inicia la sesión con cookie», de modo que no se vuelve a pedir la credencial | Anexo E-18, mapa de navegación; intake §6, flujo 4 |
| `pasosPosteriores` | Derivados; ver el supuesto `S-UX-01` de §10.3 | — |

El corte se aplica en las tres capas que §3 de esa extensión declara —ruteo, superficie y acción—, las tres contra este mismo predicado y con redirección neutra. La mecánica técnica del guard, la transaccionalidad del alta y su idempotencia son de `05-Arquitectura-Tecnica`.

**Descriptor de parámetro** (`Design-Rules-Config-Esquema.md` §2). Cada parámetro configurable se describe con un descriptor único que es su fuente de verdad; la pantalla no hardcodea default, límites, leyenda ni ejemplos. El intake declara los parámetros y, para algunos, su conjunto de valores admitidos y su valor por defecto; **no declara la leyenda ni los ejemplos de ninguno**. Ver la brecha `B-UX-04`.

**Perfil de operador único** (`Design-Rules-Acceso-Monousuario.md` §2). Declarado en §1.4. El shell partido, la política de sesión y el catálogo de códigos de resultado se declaran en §4.1, §4.3 y §8.2.

**Identidad de versión** (`Design-Rules-Identidad-De-Version.md` §2). Declarado en §4.4.

### §2.5 Frontera entre configuración de aplicación y configuración de entorno

`Design-Rules-Config-Esquema.md` §2.1 exige que esta frontera se declare acá, y que **ningún parámetro que la superficie no gobierna se dibuje, ni siquiera deshabilitado**.

| Parámetro | Clase | Fuente | En la interfaz |
| --- | --- | --- | --- |
| Modo de red del proyecto SelfHosted, y su subred | Aplicación | CU-01; intake §17.P.11, decisión DA-03 | Superficie de alta de proyecto SelfHosted |
| Las ocho dimensiones de configuración de un servicio | Aplicación | Anexo E-2; anexo E-19 | Panel lateral del servicio |
| Rango de direcciones gestionado, con sus exclusiones | Aplicación | Anexo E-8; CU-19 | Superficie de configuración del sistema |
| Variables compartidas del proyecto SelfHosted | Aplicación | Anexo E-1; CU-34 | Superficie de variables compartidas |
| Credenciales de máquina: nombre, ámbitos y vigencia | Aplicación | Intake §17.P.5; CU-32 | Superficie de configuración del sistema |
| Retención del historial: últimos despliegues por servicio y días de auditoría | Aplicación. El intake los declara «configurables» | Intake §17.P.11, decisión DA-07 | Superficie de configuración del sistema |
| Clave de firma de tokens y clave de la instancia | **Entorno.** Se generan en el primer arranque, fuera del repositorio y fuera de la imagen: variable de entorno o archivo montado | Intake §17.P.5 | **No se dibuja.** Se documenta en `09-Devops` |
| Ubicación del archivo de la base de datos | **Entorno.** Configurable, en producción sobre un volumen persistente, nunca dentro de la imagen | Intake §17.P.4 | **No se dibuja** |
| Directorio de datos de trabajo | **Entorno.** Se expone como una variable de configuración única y debe estar montado en la misma ruta absoluta en el host y en el entorno de desarrollo | Intake §17.P.3; `Compatibilidad-Plataformas.md` §3.1, restricción CP-03 | **No se dibuja** |
| Ruta del socket del motor de contenedores | **Entorno** | Intake §17.P.3 | **No se dibuja** |
| Prefijo de nombre reservado de los contenedores que el producto gobierna | Sin clasificar por ninguna fuente. El intake lo declara «reservado y configurable, distinto en desarrollo y en producción» sin decir quién lo fija | Intake §17.P.5 | **No se dibuja** hasta que se resuelva la brecha `B-UX-06` |

Un descriptor puede existir sin superficie: los parámetros de entorno conservan su contrato y no se renderizan. Y cuando un parámetro de entorno condiciona el efecto de una superficie de aplicación, la superficie lo declara como información y no ofrece cambiarlo. El caso concreto de este producto es el rango de direcciones: el intake declara que el rango de desarrollo debe ser distinto del de producción y sin solapamiento (§17.P.5), lo que condiciona los valores admisibles del rango gestionado sin que la superficie pueda gobernar esa separación.

---

## §3. Flujos clave

Los cuatro primeros son los flujos típicos que el intake §6 declara, en su orden y con su redacción de origen. Los cuatro siguientes se derivan de las necesidades de negocio NB-03, NB-06 y NB-07 y de sus casos de uso; cada uno declara de dónde sale.

Cada flujo nombra las superficies que recorre, y ésas son exactamente las rutas que la maqueta de la Fase B2 va a materializar.

### §3.1 FL-01 · Primer arranque y aprovisionamiento del administrador

**Origen:** intake §6, flujo 4. **Casos de uso:** CU-29. **Superficies:** Aprovisionamiento inicial → Listado de proyectos.

**Disparador.** El administrador ejecuta la aplicación por primera vez sobre una base de datos inexistente.

**Pasos.**

1. El sistema aplica sus migraciones solo y evalúa el predicado de aprovisionamiento. Mientras lo resuelve, la superficie de redirección muestra el estado de resolución (`Design-Rules-Primer-Arranque.md` §4.3); no queda en blanco ni parpadea contenido que después se retira.
2. El predicado es falso. La navegación reemplaza la entrada del historial y aterriza en la superficie de aprovisionamiento inicial, dibujada **sin barra lateral, sin barra superior y sin navegación de módulos**: mientras el sistema no está aprovisionado no hay a dónde ir.
3. El administrador elige nombre de usuario y contraseña. El requisito de la política se declara **antes** del intento, bajo el campo, y no aparece recién al fallar.
4. Confirma. El acto es explícito, indivisible e irreversible desde la interfaz: no hay acción de cancelar, porque no hay estado previo al que volver.
5. El sistema valida la contraseña, la almacena con una función de derivación de clave e inicia la sesión.
6. El administrador aterriza en `destinoAlCompletar`, que es el listado de proyectos SelfHosted, sobre el shell completo. La superficie de destino acusa recibo con la banda de confirmación: el lazo se cierra en la pantalla de destino, no en la de origen.

**Fricción anticipada.** El requisito de contraseña no está declarado por ninguna fuente (brecha `B-UX-10`). Hasta que se declare, el paso 3 no puede escribir el texto del requisito, y el wireframe lo deja como hueco derivado de la política, no como literal en la vista.

**Salida.** El sistema queda aprovisionado. La superficie de aprovisionamiento deja de existir para siempre en esa instancia: el guard de superficie redirige a la de acceso, y el guard de la acción rechaza un envío tardío redirigiendo en lugar de devolver un error.

### §3.2 FL-02 · Acceso al panel en los arranques posteriores

**Origen:** intake §6, flujo 4. **Casos de uso:** CU-30, CU-31. **Superficies:** Acceso al panel → Listado de proyectos; Cambio de contraseña.

**Disparador.** El administrador abre el panel sin sesión vigente, o su sesión venció.

**Pasos.**

1. El predicado de aprovisionamiento es verdadero: la aplicación «ya no ofrece el alta y presenta el inicio de sesión».
2. La superficie de acceso se dibuja sobre el mismo shell vacío que la de aprovisionamiento, para que el administrador perciba continuidad entre crear la identidad y usarla. Lleva el sello de versión al pie.
3. El administrador ingresa identificador y secreto. Un rechazo se informa de forma **indiferenciada**: no se dice qué parte falló.
4. Con la credencial válida, la transición al shell de trabajo es una navegación completa, no un cambio de estado dentro de la misma superficie. El cambio de shell es la señal visual de que la sesión cambió.
5. Desde el shell de trabajo, la barra superior muestra la identidad activa y, a un clic, el cambio de contraseña y el cierre de sesión.
6. El cambio de contraseña exige la contraseña actual y, al concretarse, declara explícitamente qué pasa con la sesión en curso, y acusa recibo en la superficie siguiente.

**Fricción anticipada.** El vencimiento de la sesión no puede manifestarse como un error arbitrario en una acción cualquiera: devuelve al shell de acceso con el estado de sesión vencida declarado. La duración concreta de la sesión no está declarada por ninguna fuente (brecha `B-UX-11`).

**Salida.** Sesión activa sobre el shell de trabajo, o retorno al shell de acceso con el resultado declarado.

### §3.3 FL-03 · Alta de un proyecto SelfHosted con API y base de datos

**Origen:** intake §6, flujo 1, transcripto paso por paso en el anexo E-10. **Casos de uso:** CU-01, CU-16, CU-13, CU-04, CU-03, CU-22, CU-24, CU-18, **CU-39**. **Superficies:** Listado de proyectos → Lienzo del proyecto → **Alta de servicio** → **Exploración de registro de imágenes** → Panel lateral del servicio → Cajón de cambios pendientes.

**Dos superficies que esta lista no nombraba, incorporadas acá.** El alta de servicio dejó de vivir repartida entre el lienzo y el panel lateral y tiene superficie propia desde la versión 1.1; la ruta la nombraba por sus efectos y no por la superficie que la materializa. Y la **exploración de registro de imágenes** es la superficie que `Q-27` habilitó el 2026-07-30: es un desvío del paso del origen que devuelve al alta, no un paso obligatorio del recorrido.

**Disparador.** El administrador quiere tener la arquitectura de un conjunto de contenedores en un solo lugar. Es «el recorrido más frecuente».

**Pasos**, en la redacción del anexo E-10:

1. `Nuevo proyecto`, nombre, se elige modo de red bridge y el sistema propone la subred. Se aterriza en el lienzo vacío.
2. `+ Nuevo servicio` → **Desde catálogo** → se completan los parámetros de la plantilla. El nodo aparece en modo pendiente.
3. `+ Nuevo servicio` → **Imagen de registro** → el paso del origen ofrece escribir la dirección **o explorar el registro configurado** y volver con registro, imagen y etiqueta ya declarados. El nodo aparece, también pendiente.
4. Se arrastra una arista de la API a la base. El sistema **propone** la variable de conexión, con el host del destino como referencia y el puerto literal, y propone la espera al destino; el administrador puede editar las dos cosas.
5. En el panel lateral del servicio, pestaña **Red**, se publica el puerto en el host.
6. `Aplicar cambios` con un mensaje. El sistema crea la red, despliega la base, espera su verificación de salud y luego despliega la API, respetando el orden topológico del grafo.

**Fricción anticipada, y es la que E-18 nombra como la más probable del modelo.** «Guardar cambio» **no despliega**: agrega la modificación al conjunto pendiente. El despliegue ocurre al aplicar el conjunto o al pulsar explícitamente «Redesplegar». Las etiquetas de los botones tienen que dejarlo claro, y esa verificación es un criterio de aceptación explícito de E-18.

Segunda fricción: publicar el puerto de la base en el host sería un error de seguridad, porque la API la alcanza por nombre dentro de la red del proyecto SelfHosted. El anexo E-10 declara que «la interfaz debe desalentar» esa publicación. Se traduce en la ayuda contextual del campo, derivada del descriptor, y no en un bloqueo: ninguna regla de negocio lo prohíbe.

**Salida.** Proyecto SelfHosted desplegado, con su disposición conservada y su estado agregado derivado de los despliegues por contenedor.

### §3.4 FL-04 · Incorporación de un contenedor que ya está corriendo

**Origen:** intake §6, flujo 2, transcripto en el anexo E-11. **Casos de uso:** CU-06, CU-07, CU-08. **Superficies:** Descubrimiento e incorporación (con su paso de clasificación de variables) → Lienzo del proyecto.

**Disparador.** El administrador quiere incorporar lo que ya tiene en lugar de empezar de cero. Es «el flujo diferencial» del producto.

**Pasos.** El anexo E-11 declara que el flujo tiene **cuatro pasos, no tres**: descubrir, elegir, **clasificar** y confirmar.

1. El administrador entra a un proyecto SelfHosted y pide incorporar. El módulo de descubrimiento consulta el motor de contenedores, inspecciona lo que encuentra, descarta los ya incorporados y los no incorporables, y devuelve los candidatos. El descubrimiento es de **sólo lectura**: listar no habilita operar.
2. El administrador elige uno. Los no incorporables se muestran deshabilitados con su motivo escrito; el ya incorporado, con el nombre del proyecto SelfHosted que lo tomó.
3. El sistema importa imagen, red, dirección, montajes, dispositivos y variables, y **presenta el paso obligatorio de clasificación de variables**: el administrador ve **todas** las variables importadas, con las que la heurística sugiere ya premarcadas como secretas, y marca o desmarca las que corresponda.
4. Recién con esa clasificación confirmada el sistema crea el servicio vinculado al contenedor existente, sin recrearlo ni cortar el servicio. El nodo aparece en el lienzo ya activo.

**Fricción anticipada.** El paso 3 es obligatorio y no se puede saltear ni descartar: sin clasificación confirmada el servicio no se crea. La interfaz no puede presentarlo como un aviso descartable. Y el valor de una variable marcada como secreta viaja enmascarado incluso dentro de la carga útil de ese mismo paso.

Segunda fricción, declarada por el anexo E-11: el contenedor no se recrea en ningún momento del flujo, pero **el primer redespliegue posterior sí implica corte**, y «la interfaz debe advertirlo con esas palabras».

**Salida.** Servicio incorporado y activo, con la traza de la clasificación persistida y auditable.

### §3.5 FL-05 · Arranque bloqueado por conflicto de dirección

**Origen:** intake §6, flujo 3, transcripto en el anexo E-8. **Casos de uso:** CU-18, CU-19, CU-20, CU-21. **Superficies:** Lienzo del proyecto → Informe de conflicto de direcciones → Configuración del sistema.

**Disparador.** El administrador arranca un proyecto SelfHosted cuya dirección está ocupada por un servicio activo de otro.

**Pasos.**

1. El administrador arranca el proyecto SelfHosted desde la barra superior del lienzo.
2. El validador compara las reservas contra las direcciones ocupadas por servicios activos, sin consultar al motor de contenedores.
3. Encuentra una en conflicto y devuelve un rechazo que identifica al ocupante **por servicio y por proyecto SelfHosted**, con tres resoluciones posibles: detener el proyecto en conflicto, reasignar la dirección a la siguiente libre del rango, o arrancar parcialmente el resto de los servicios.
4. El administrador reasigna. El sistema actualiza la reserva y marca los enlaces entrantes al servicio como pendientes de redespliegue porque su variable cambió de valor, y arranca.

**Fricción anticipada.** El estado resultante de la tercera resolución es «parcialmente activo», y es un **estado legítimo del modelo**, no un accidente. La interfaz no puede presentarlo como una falla a resolver.

**Salida.** Proyecto SelfHosted activo, o parcialmente activo con su estado declarado.

### §3.6 FL-06 · Tarde de ajustes con revisión antes de aplicar

**Origen:** NB-06 y el anexo E-5, que lo describe como «la tarde de ajustes». **Casos de uso:** CU-22, CU-23, CU-24, CU-25. **Superficies:** Lienzo del proyecto → Cajón de cambios pendientes.

**Disparador.** El administrador toca varios servicios y quiere decidir, con la consecuencia delante, qué entra en el lote.

**Pasos.**

1. Cada modificación de configuración se acumula en el conjunto de cambios pendientes, y el contador del banner sube. Los cambios **puramente visuales** —mover un nodo, reagrupar— se guardan al instante y no entran: de lo contrario el administrador acumularía cambios pendientes por el mero hecho de ordenar el dibujo.
2. El administrador abre el detalle. Ve cada cambio con su resumen, su valor anterior y su valor posterior, y qué servicios exige redesplegar.
3. Descarta los que no van, de a uno.
4. El sistema calcula y presenta el informe de impacto **antes** de ejecutar nada: qué servicios se van a redesplegar y cuáles quedan sin impacto.
5. El administrador confirma con un mensaje. El sistema redespliega exactamente lo afectado, y declara además qué servicios **no** alcanzó y por qué, para que un despliegue parcial no se confunda con un servicio omitido por error.

**Fricción anticipada.** El paso 4 es la frontera de propuesta de `Design-Rules-Config-Esquema.md` §6 aplicada a este producto: la interfaz propone, el humano confirma, el sistema valida. La interfaz nunca aplica directo.

Segunda fricción: el reemplazo de una versión de un servicio es *detener y arrancar*, con ventana de indisponibilidad, «que la interfaz debe advertir explícitamente al confirmar el redespliegue» (intake §9, exclusión 2).

**Salida.** Cambios aplicados con resultado **por contenedor**, y el proyecto SelfHosted en el estado que ese resultado determine.

### §3.7 FL-07 · Atribución del consumo del servidor

**Origen:** NB-07; anexo E-18, tablero del segundo alcance. **Casos de uso:** CU-26, CU-27, CU-28, **CU-37**. **Superficies:** Tablero de estado → Lienzo del proyecto → Registro del contenedor; y Tablero de estado → **Imágenes**, cuando lo que consume es disco.

**Disparador.** El administrador quiere saber si la presión de memoria del servidor viene de un servicio concreto (intake §5, historia 8).

**Pasos.**

1. Abre el tablero y lee las tres capas: servidor, proyectos SelfHosted y contenedores del proyecto elegido.
2. Identifica el proyecto SelfHosted que más consume y abre su lienzo desde la propia fila.
3. Si hace falta, abre el registro del contenedor del servicio sospechoso.

**Fricción anticipada.** El tablero tiene restricciones de implementación declaradas que condicionan lo que puede prometer: el origen de los datos es el motor de contenedores y no peticiones contra los servicios; la frecuencia es de 3 a 5 segundos **sólo para la vista abierta**; no hay sondeo con vistas cerradas; y hay un único recolector en segundo plano que publica a todos los circuitos conectados, no un flujo por pestaña. La interfaz no puede ofrecer ningún control que contradiga eso, ni una frecuencia elegible por el usuario.

**La segunda rama del flujo, incorporada el 2026-07-30.** Cuando lo que presiona es el **disco** y no la memoria, la atribución no termina en un servicio sino en el almacén de imágenes: el tablero exhibe el espacio recuperable con un enlace al inventario de imágenes, y ahí el administrador ve qué liberaría y confirma. Es la **ubicación secundaria de la sugerencia de limpieza** que `Q-17` habilitó, y está especificada en [`Wireframes-Imagenes.md`](Wireframes/Wireframes-Imagenes.md) §3.5. El tablero **no ofrece confirmar**: confirmar desde ahí borraría sin la lista delante.

**Salida.** El consumo queda atribuido a un servicio concreto, o al almacén de imágenes con una propuesta accionable.

### §3.8 FL-08 · Reproducibilidad de la arquitectura fuera del servidor

**Origen:** NB-03; intake §5, historia 9. **Casos de uso:** CU-09, CU-10, CU-11, CU-12. **Superficies:** Lienzo del proyecto → Exportación e importación → Configuración del sistema.

**Disparador.** El servidor no tiene redundancia de disco, y la exportación es la estrategia de respaldo.

**Pasos.**

1. Desde el proyecto SelfHosted, el administrador exporta la arquitectura al formato estándar de composición, **con los secretos vacíos**, más el manifiesto propio que preserva la disposición del lienzo.
2. Importa un archivo como proyecto SelfHosted nuevo y recibe el **informe de importación**, que declara qué se creó y **qué no se pudo representar**. Toda pérdida de traducción es declarada y nunca silenciosa.
3. Configura la exportación programada hacia un destino externo.

**Fricción anticipada.** El formato estándar de composición no representa la disposición del lienzo ni el conjunto de cambios pendientes: la disposición se preserva en el manifiesto propio y el conjunto de cambios no se exporta. La interfaz declara esa asimetría al exportar, en lugar de dejar que se descubra al reimportar.

**Salida.** Arquitectura reproducible fuera del servidor.

### §3.9 Puntos de fricción anticipados, transversales

| Fricción | Por qué existe | Cómo la trata el diseño |
| --- | --- | --- |
| Confundir guardar con desplegar | Es «la fuente más probable de confusión del modelo», declarada por E-18 | Verbos distintos en las etiquetas, y el contador del banner como acuse de que el cambio quedó pendiente y no aplicado |
| Confundir el catálogo de plantillas con servicios corriendo | «Catálogo de servicios» se lee como servicios corriendo, y el intake lo declara como el punto que más se presta a confusión | La superficie del catálogo declara que sus ítems son definiciones en reposo, que arranca vacío y que nada de él corre hasta instanciarse |
| Caída del canal con un despliegue en curso | El modelo de interfaz mantiene un canal permanente | El despliegue vive del lado del servidor y el canal sólo observa: al reconectar, el estado se recupera consultando la operación. La interfaz declara esa propiedad en lugar de ofrecer un reintento que duplicaría el despliegue |
| Un despliegue parcial leído como falla | Es un estado legítimo del modelo | Se nombra como estado, no como error, en las tres superficies que lo exhiben |
| Un servicio incorporado que un día desaparece del motor | Alguien puede operar contenedores por fuera de la aplicación | Estado huérfano explícito en el nodo, con la acción de redesplegar desde la configuración importada y la advertencia de corte |

---

## §4. Estados y feedback

### §4.1 Mapa de estados por superficie clave

Los seis estados canónicos de `Design-Rules-Web-Generico.md` §5 —vacío, cargando, con datos, error, éxito y sin permiso— rigen en todas las superficies. La columna «Sin permiso» se declara **no aplicable en el shell de trabajo**: hay una sola identidad y tener sesión es tener todo el alcance, de modo que enunciar permisos sugeriría una granularidad inexistente. Donde sí aplica es en las superficies que la sesión no alcanza, y ahí se resuelve como corte de ruteo, no como control deshabilitado.

| Superficie | Vacío | Cargando | Con datos | Error | Éxito | Estado propio adicional |
| --- | --- | --- | --- | --- | --- | --- |
| Aprovisionamiento inicial | No aplica: la superficie existe sólo cuando falta el artefacto mínimo | Resolviendo el predicado, con progreso indeterminado | Formulario del artefacto mínimo | Banda de error por código, sobre los campos | Se resuelve en la superficie siguiente, con banda de confirmación | Envío fuera de tiempo: redirección neutra |
| Acceso al panel | No aplica | Enviando | Formulario de identidad | Banda de error indiferenciada | Se resuelve en el destino | Acceso restringido temporalmente; sesión vencida; identidad recién creada; secreto actualizado |
| Cambio de contraseña | No aplica | Enviando | Formulario | Banda de error por código | Acuse en la superficie siguiente, con el efecto sobre la sesión declarado | — |
| Listado de proyectos | Sin proyectos SelfHosted declarados: es el estado del primer uso, y lleva la orientación posterior | Esqueleto de tarjetas | Grilla de proyectos con su estado agregado | Banda de error | Confirmación sutil al crear, renombrar o eliminar | Banda de confirmación entrante desde el aprovisionamiento |
| Lienzo del proyecto | Lienzo vacío, con la acción de agregar el primer servicio | Esqueleto del lienzo; progreso lineal fino en la cabecera | Nodos y aristas con su estado | Banda de error; error por nodo con su causa | Confirmación sutil | Modo pendiente, con contador; parcialmente activo; huérfano |
| Panel lateral del servicio | No aplica: siempre hay un servicio seleccionado | Esqueleto de campos | Formulario dirigido por descriptor | Error inline por campo, con el rango admitido | Acuse de que el cambio quedó pendiente, no aplicado | Requiere redespliegue |
| Cajón de cambios pendientes | Sin cambios pendientes | Calculando el informe de impacto | Lista de cambios con su informe | Banda de error | Resultado por contenedor | Ninguno |
| Registro del contenedor | Sin líneas todavía | Conectando al flujo continuo | Líneas del registro | Flujo interrumpido, con acción de reconectar | — | Contenedor inexistente |
| Tablero de estado | Sin proyectos SelfHosted | Esqueleto de las tres capas | Tres capas con sus barras | Lectura del estado del servidor no disponible | — | Dato con antigüedad declarada |
| Descubrimiento e incorporación | Ningún candidato en el servidor | Consultando el motor | Lista de candidatos | Banda de error | Servicio incorporado | No incorporable, con motivo; ya incorporado, con el proyecto que lo tomó; clasificación pendiente |
| Catálogo de plantillas | **Catálogo vacío: es el estado inicial de toda instalación nueva**, y no una anomalía | Esqueleto | Lista de ítems | Banda de error | Ítem guardado, importado o instanciado | — |
| Configuración del sistema | No aplica: siempre hay rango y retención | Esqueleto de campos | Secciones de configuración | Error inline por campo | Confirmación | Credencial mostrada una única vez |
| Variables compartidas del proyecto | Sin variables compartidas declaradas | Esqueleto | Lista de variables, con los secretos enmascarados | Error inline; rechazo por variable referenciada | Acuse de cambio pendiente | Huérfana, advertida sin bloquear |
| Revisión de higiene | Sin condiciones detectadas, informado sin felicitar | Esqueleto de grupos | Grupos con condiciones y su conteo | Banda de error; el registro queda intacto | — | Ninguna condición bloquea |
| Informe de conflicto de direcciones | No aplica: la superficie existe sólo cuando hay conflicto | Validando | Conflictos con sus resoluciones | Es, en sí, un estado de error del arranque | Arranque procedido tras la resolución | Parcialmente activo |
| Exportación e importación | No aplica | Generando o interpretando el archivo | Resultado de la operación | Banda de error | Informe de importación, con lo creado y lo no representable | — |
| Alta de servicio | No aplica: la superficie existe para crear lo que todavía no hay | Cargando el formulario | Menú de vías, o tronco con el bloque de origen de la vía elegida | Banda de error; informe **fallido** por dato incorrecto | Confirmación de borrador guardado o de cambio pendiente | Origen **indeterminado** por consulta imposible, sin lenguaje de error; origen traído de la exploración; puertos deshabilitados por modo de red |
| Imágenes | Almacén vacío; y sólo imágenes ajenas, que es normal en una instalación nueva | Esqueleto de tabla | Dos grupos con la ocupación repartida | Banda de error con el motor inalcanzable, **sin inventario desde caché sin declararlo** | Informe de la limpieza con lo borrado y lo dejado | Sugerencia de limpieza vigente; sugerencia descartada; propuesta a la vista; uso no atribuible |
| Exploración de registro de imágenes | Sin ningún registro configurado, **declarado con su motivo**; y sin criterio de búsqueda todavía | Esqueleto de lista, con la consulta cruzando a un sistema externo | Resultados, y etiquetas de la imagen elegida con su digesto | **Dos clases distintas**: consulta imposible, indeterminada y sin lenguaje de error; y credencial rechazada, fallida | Se resuelve en la superficie que la invocó: el origen queda declarado y sin verificar | Sin resultados, que es resultado y no error; enumeración no admitida por el registro |

Cada wireframe desarrolla su propia tabla de estados con la condición que produce cada uno y su representación esperada. La tabla de estados de cada wireframe **es la lista que la maqueta de la Fase B2 va a tener que demostrar**: un estado no declarado no se maqueta y por lo tanto no se valida.

### §4.2 Lenguaje visual de estados y su correspondencia con el catálogo

El anexo E-18 declara el contrato visual de estados del nodo del lienzo y lo declara verificable. Esta categoría lo adopta sin modificarlo y declara su correspondencia con los estados semánticos del documento base, porque el catálogo prohíbe definir tokens ad hoc y la correspondencia es la única forma de heredar los del theme.

| Estado del nodo, según E-18 | Estado semántico del catálogo base §2.1 | Insignia | Borde del nodo |
| --- | --- | --- | --- |
| Activo | Éxito | Presente | Sólido tenue |
| Activo degradado, con la verificación de salud fallando | Atención | Presente | Sólido, en el mismo par |
| Creando o construyendo | Informativo | Presente, animada | Punteado animado |
| Detenido o retirado | Neutro | Presente | Sólido, en el par neutro |
| Caído o fallido | Error | Presente | Sólido, en el par de error |
| **Pendiente de aplicar** | **Sin correspondencia en el catálogo base.** Ver la contradicción `C-UX-01` y la brecha `B-UX-05` | Presente | Punteado |
| Huérfano, contenedor incorporado desaparecido | Composición: neutro con contorno del par de error, más patrón de relleno | Presente | Rayado |

Dos reglas heredadas que se aplican sobre este contrato sin excepción:

- **El color nunca es el único canal.** Cada estado lleva, además del color y del borde, su insignia y su etiqueta textual. E-18 ya lo cumple en la anatomía del nodo, que muestra el par insignia + nombre del estado.
- **Las insignias son SVG con `currentColor`**, de un único set vectorial, no glifos de texto ni emoji. El documento base §6.1 lo exige y §10 lo enumera como anti-patrón. Los caracteres que E-18 usa en su transcripción son notación del anexo, no la iconografía de la implementación.

El violeta que E-18 reserva en exclusiva para «pendiente de aplicar» se conserva como reserva de exclusividad: **ningún otro elemento de la interfaz lo usa**, porque «un tercer estado visual sólo funciona si es inequívoco». Esta categoría adopta esa restricción y la verifica en cada wireframe.

### §4.3 El modo pendiente y la frontera de propuesta

`Design-Rules-Config-Esquema.md` §6 exige que toda propuesta de cambio se previsualice antes de aplicar y se confirme explícitamente, y que la interfaz nunca aplique directo. En este producto esa frontera **ya existe con nombre propio en el intake**: es el conjunto de cambios pendientes con su informe de impacto, declarado como el mecanismo de edición transaccional del proyecto SelfHosted.

| Requisito de la frontera, `Design-Rules-Config-Esquema.md` §6 | Realización en este producto | Fuente |
| --- | --- | --- |
| Toda propuesta se previsualiza: qué cambia y a qué afecta | Informe de impacto con sus dos listas, servicios a redesplegar y servicios sin impacto, más los servicios no alcanzados y su motivo | Anexo E-5; anexo E-13; RN-13 |
| Toda propuesta se confirma explícitamente | «Aplicar cambios» con un mensaje, como acto separado de cada edición | Anexo E-10, paso 6; CU-24 |
| La interfaz nunca aplica directo | «Guardar cambio» no despliega: agrega al conjunto | Anexo E-18, panel lateral |
| Una propuesta puede llenarse de varias formas | Formulario del panel lateral, arrastre de una arista en el lienzo, instanciación de una plantilla del catálogo, resolución elegida en el informe de conflicto | Anexos E-4, E-5, E-6, E-8 |
| Existe un modo simulación como red de seguridad | **Sin equivalente declarado.** Ver la contradicción `C-UX-02` y la brecha `B-UX-08` | — |

La explicación en lenguaje natural que §4.5 de esa extensión pide se realiza en el **resumen de cada cambio**, que el anexo E-5 declara ya redactado en palabras y con la forma «servicio · clave: valor anterior → valor posterior». Se genera por plantilla a partir del cambio y de los descriptores, y no se escribe a mano por pantalla.

La ranura del asistente que §4.7 de esa extensión reserva se declara y se ubica en el cajón de cambios pendientes, deshabilitada y anunciada como tal, con la tensión declarada en `C-UX-03`.

### §4.4 Sello de identidad de versión

`Design-Rules-Identidad-De-Version.md` §2 exige declarar el contrato que la superficie consume, y §4.2 exige dos ubicaciones obligatorias.

| Campo del contrato | Qué hace en la interfaz | Estado en las fuentes |
| --- | --- | --- |
| `versionLegible` | Cadena que se muestra. Es el dato principal y el único obligatorio | El intake declara SemVer 2.0.0 con la versión derivada de los Conventional Commits en el pipeline, y `0.x` hasta la primera entrega completa (§17.P.7). Cómo llega esa cadena al punto de composición no está declarado: brecha `B-UX-07` |
| `identificadorDeConstruccion` | Amplía el diagnóstico cuando dos instancias comparten versión legible | Sin declarar. Brecha `B-UX-07` |
| `esPreliminar` | Habilita el distintivo de artefacto preliminar | Derivable de que la versión permanezca en `0.x`, pero ninguna fuente lo declara como campo. Brecha `B-UX-07` |
| `origenIndeterminado` | Habilita el marcador cuando la identidad no pudo derivarse de la construcción | Sin declarar. Brecha `B-UX-07` |

Las dos ubicaciones obligatorias en este producto:

1. **Superficie de acceso al panel**, al pie de la tarjeta. Es la única información disponible sobre la instancia antes de autenticarse, que es justamente el caso en el que más se la necesita.
2. **Superficie de configuración del sistema**, alcanzable desde la navegación del shell de trabajo, con el detalle de diagnóstico que expone el contrato completo en filas clave y valor y lo copia en un solo gesto.

La versión **se deriva, no se escribe**: la vista la recibe ya formada y no la compone, no la transcribe y no la reformatea. Si falta el dato, muestra el marcador de origen indeterminado, nunca un espacio en blanco ni una versión inventada. El cálculo de la versión, el sellado en los binarios y el etiquetado de los artefactos son de `09-Devops`; el punto de composición del contrato es de `05-Arquitectura-Tecnica`.

---

## §5. Accesibilidad

**Compromiso: WCAG 2.2 nivel AA como piso obligatorio**, no como mejora opcional. Es requisito de aceptación de cada superficie, heredado de `Design-Rules-Web-Generico.md` §7.

Criterios prioritarios, con lo que cada uno significa en este producto:

| Criterio | Aplicación concreta |
| --- | --- |
| Contraste de texto 4.5:1, y 3:1 para texto grande | Alcanza también al sello de versión: información secundaria no significa información ilegible |
| Contraste de componentes y de estados de foco, 3:1 | Alcanza a las insignias de estado del nodo y a los bordes que las acompañan |
| Foco visible en todo elemento interactivo, con anillo de al menos 2 px que no dependa sólo del color | No se suprime el anillo de foco del sistema de componentes |
| Navegación completa por teclado en el orden lógico de lectura, sin trampas de foco | Alcanza al lienzo: seleccionar un nodo, abrir su panel lateral, recorrer sus pestañas y volver tienen que ser posibles sin puntero |
| Objetivos de toque de al menos 24 × 24 px (criterio 2.5.8) | Alcanza a los puertos laterales del nodo, que son las anclas de las aristas y el objetivo más chico de la interfaz |
| Semántica: un encabezado de primer nivel por vista, regiones de navegación y de contenido, etiquetas asociadas a cada control | El shell de acceso y el de aprovisionamiento mantienen su encabezado de primer nivel pese a no tener navegación |
| El color nunca es el único canal de información | Estado = color + insignia + etiqueta textual, en las tres superficies que exhiben estado |
| Mensajes de error asociados al campo y anunciados | El mensaje indica el rango admitido, no sólo que el valor es inválido |
| Banda de error con rol de alerta y banda de confirmación con rol de estado | En las tres superficies de identidad y en el informe de conflicto |
| Ayuda contextual asociada a su control, y expansores que declaran su estado de apertura | En el panel lateral del servicio y en la configuración del sistema |
| Preferencia de movimiento reducido respetada | Las animaciones no esenciales se desactivan; alcanza a la insignia animada del estado «creando o construyendo» |
| Reflujo sin desplazamiento horizontal (criterio 1.4.10) | Aplica a todas las superficies **salvo el lienzo**, que se acoge a la excepción explícita del criterio para el contenido que requiere disposición bidimensional para su uso o su significado. La excepción se declara acá para que no se lea como incumplimiento |

Dos consecuencias del modelo de interfaz que la accesibilidad tiene que absorber, y que las fuentes declaran:

- Cada acción viaja al servidor. Toda operación que cruce el canal muestra su estado de carga y previene el doble envío, y ese estado se anuncia como región activa, no sólo visualmente.
- El arrastre de un nodo del lienzo es la interacción más cara del producto. La alternativa por teclado no puede depender de la mitigación de arrastre que la puerta técnica PT-01 decida: se especifica como interacción propia en el wireframe del lienzo.

Verificación prevista: escenarios de test de accesibilidad en `08-Calidad-Y-Pruebas`, y la inspección heurística de la maqueta de la Fase B2 sobre la familia y el piso de navegador declarados.

---

## §6. Internacionalización

| Dimensión | Decisión | Fuente |
| --- | --- | --- |
| Idioma de la interfaz | Español rioplatense neutro técnico, único idioma. No hay selector de idioma | **Derivación `S-UX-04`, no dato declarado.** Ninguna fuente declara el idioma de la interfaz. El indicio más cercano es el intake §17.P.11, que justifica el inglés de las claves provistas por el sistema «a diferencia del resto del modelo, que lo lee una persona en la interfaz». La invariante D1 gobierna el idioma de la documentación generada, no el del producto, y no se invoca acá |
| Expansión de texto esperada | No aplica una previsión de expansión por traducción, porque no hay traducción prevista. Los contenedores de texto igualmente se dimensionan por contenido y no por número de caracteres | Derivado de la fila anterior, y por lo tanto alcanzado por `S-UX-04` |
| Dirección de lectura | Izquierda a derecha | Derivado de la primera fila, y por lo tanto alcanzado por `S-UX-04` |
| Formato de fecha y hora | Fecha en formato ISO 8601 en todo dato de sistema, y desplazamiento horario explícito. Los ejemplos del intake usan la forma con desplazamiento `-03:00` | Invariante del framework; anexos E-1, E-3, E-5, E-7, E-11 |
| Formato de duración relativa | Las superficies que muestran antigüedad la expresan en forma relativa y legible, como hace el anexo E-18 en la columna de actividad y en la de tiempo activo del tablero | Anexo E-18 |
| Números | Cifras tabulares en columnas numéricas. Las magnitudes de memoria y disco llevan su unidad explícita | `Design-Rules-Web-Generico.md` §2.2, «números tabulares para columnas numéricas»; anexo E-18 |
| Separador decimal | **Sin declarar.** Ver la brecha `B-UX-21` | Ninguna fuente lo declara, y el anexo E-18 exhibe punto decimal en todas sus cifras, que no es el separador del español rioplatense |
| Vocabulario técnico que no se traduce | Los nombres que el administrador escribe y que el motor de contenedores interpreta —claves de variables, nombres de imagen, etiquetas, modos de red, políticas de reinicio— se muestran tal cual. Las variables provistas por el sistema llevan prefijo reservado y se nombran en inglés «porque las lee el proceso dentro del contenedor» | Intake §12, entrada «Variable provista por el sistema» |

La consecuencia práctica es que la interfaz **mezcla deliberadamente dos registros**: la prosa del producto en español, y los identificadores del dominio en su forma literal. La regla que separa los dos es que todo lo que el administrador escribe y el motor lee se muestra literal; todo lo que el producto dice sobre eso, se dice en español.

---

## §7. Performance percibida

Los umbrales de la puerta técnica PT-01 son evidencia declarada por las fuentes y esta categoría no los modifica. Se transcriben porque condicionan el diseño de la interacción.

| Acción | Umbral | Origen | Consecuencia de diseño |
| --- | --- | --- | --- |
| Arrastre de un nodo, con 30 nodos y 40 aristas con insignia de estado y métricas por nodo, en red local | Sin retraso perceptible entre el evento de puntero y la actualización visual | PT-01 | El movimiento del nodo no puede esperar una ida y vuelta al servidor por evento. Cuál es la técnica concreta lo decide la medición de PT-01; el diseño sólo exige que el resultado no tenga retraso perceptible |
| 30 nodos actualizando su estado cada 2 s | Sin degradar el arrastre | PT-01 | La actualización de estado es un flujo independiente del gesto y no lo interrumpe |
| Memoria por canal tras 15 minutos de uso continuo | Estable, sin crecimiento sostenido | PT-01 | El patrón de «dejar abierto y volver» es de uso previsto, no excepcional |
| Escritura de la disposición del lienzo durante un gesto de arrastre | **Cero.** Una única escritura al finalizar, con antirrebote de 400 ms | Intake §17.P.10, «regla de oro del lienzo» | El guardado de la disposición no muestra indicador de progreso por gesto: sería feedback de algo que no está ocurriendo |
| Lectura de la API sin operación sobre el motor de contenedores, percentil 99 | ≤ 300 ms | Intake §17.P.10, propuesto | Por debajo del umbral de esqueleto: las lecturas simples no necesitan estado de carga visible |
| Validación de conflicto de direcciones sobre un proyecto SelfHosted de hasta 30 servicios | ≤ 50 ms, sin acceso al motor | Intake §17.P.10 | El informe de conflicto se presenta como respuesta inmediata al intento de arrancar, no como operación con progreso |
| Sondeo de métricas | Cada 3 a 5 s y **sólo con vistas abiertas** | Intake §17.P.10 | La interfaz no ofrece control de frecuencia ni acción de «actualizar ahora» que contradiga la cadencia declarada |
| Reconciliación con el motor | Suscripción a eventos más reconciliación completa cada 30 s, y también al abrir el proyecto SelfHosted | Intake §17.P.10; anexo E-17 | Al abrir un proyecto SelfHosted el estado se verifica antes de pintar el lienzo, de modo que la primera pintura no muestra un estado que ya caducó |

Criterios heredados del catálogo base, que se aplican encima de esos umbrales. Cada uno cita la sección que lo contiene:

- Esqueleto por encima de aproximadamente 400 ms de espera; indicador circular sólo para acciones puntuales. Dado que cada interacción cruza el canal, se prefieren indicadores tempranos y una barra de progreso fina en la parte superior del contenido durante las cargas de página.
- Transiciones de 150 a 250 ms, al servicio del cambio de estado y nunca como movimiento ambiental permanente (`Design-Rules-Web-Generico.md` **§8**). Su §5 declara un rango distinto para lo mismo, de 150 a 200 ms; la discrepancia es del catálogo y se eleva a su mantenedor. Se adopta el de §8 por ser el que rige el movimiento, mientras §5 rige la transición de estado dentro de ese rango.
- Interfaz optimista **sólo donde la operación es reversible**. En este producto eso alcanza a los cambios visuales del lienzo, que se guardan al instante y no tienen consecuencia sobre ningún contenedor. **No alcanza a ninguna operación de despliegue**: un despliegue no es reversible y su resultado se determina por contenedor, de modo que la interfaz muestra el estado real y nunca lo anticipa.

---

## §8. Errores y recuperación

### §8.1 Taxonomía de errores que el administrador ve

| Categoría | Qué la produce | Vía de recuperación | Fuente |
| --- | --- | --- | --- |
| Dato inválido | Un valor fuera de los límites o del conjunto admitido de su descriptor | Error inline junto al campo, con el rango admitido enunciado. El envío no se intenta | CL-05; `Design-Rules-Config-Esquema.md` §5 |
| Conflicto de estado | Una dirección ocupada por un servicio activo de otro proyecto SelfHosted; un contenedor ya incorporado; un identificador duplicado | Informe con el ocupante identificado y resoluciones accionables. En el caso de la dirección, las tres que el anexo E-8 declara | CL-01, CL-05; RN-03, RN-11 |
| Regla de negocio que impide la acción | Publicar puertos en modo macvlan; eliminar una variable compartida que otros referencian; incorporar un contenedor que monta el socket del motor | El control se deshabilita antes del intento cuando la condición es conocida, y el rechazo enumera quién impide la acción cuando no lo es | RN-07, RN-27; RA-04 |
| Fallo del despliegue de un contenedor | La imagen no existe en el registro; error de construcción; el contenedor no arranca | La causa identificable queda en el último evento de la línea de tiempo de **ese** contenedor. El fallo no arrastra a los demás | Anexo E-3; RN-31 |
| Resultado parcial | Uno o varios contenedores de un lote fallaron, o el arranque procedió excluyendo el servicio en conflicto | Se nombra como estado «parcialmente activo», no como error, y se declara qué quedó de qué manera y qué no se alcanzó | RN-20, RN-31; anexo E-13 |
| Deriva respecto del motor | Alguien operó contenedores por fuera de la aplicación, o el contenedor incorporado desapareció | Estado huérfano explícito en el nodo, con la acción de redesplegar desde la configuración importada y la advertencia de corte | CL-02, CL-03; anexo E-17 |
| Pérdida del canal con el navegador | Se cortó la conexión, con o sin despliegue en curso | La reconexión del canal se estiliza acorde a la marca. El despliegue **no se interrumpe**: al reconectar, el estado se recupera consultando la operación | CL-04; anexo E-13 |
| Error de identidad | Credencial rechazada, formulario vencido, restricción temporal de acceso, sesión vencida | Banda de resultado resuelta desde el catálogo de códigos de §8.2 | `Design-Rules-Acceso-Monousuario.md` §5 |
| Advertencia que no bloquea | Higiene del registro: variable compartida huérfana, nombre repetido en el mismo ámbito, clave que ya existe al instanciar, referencia sin uso. **Y desde el 2026-07-30, la sugerencia de limpieza de imágenes**, que el sistema propone cuando detecta espacio recuperable | Se informa, nunca se impide. La decisión se toma con la información delante y es reversible. La sugerencia se descarta sin consecuencia y **no reaparece hasta que el hecho cambie** | RN-37; intake §4, nota sobre F-25; §19 `Q-17` decidida |

La última fila es una decisión de producto explícita y conviene no diluirla: el sistema **crea separado, que es lo seguro, y después informa**, en lugar de preguntar antes y obligar a decidir a ciegas. Ninguna detección de higiene puede materializarse como un diálogo que bloquea.

### §8.2 Catálogo de códigos de resultado de las superficies de identidad

`Design-Rules-Acceso-Monousuario.md` §5 exige que los mensajes de las superficies de identidad se resuelvan desde un catálogo de códigos estables, con un texto único por resultado, y no se compongan en cada vista. Se declara la estructura del catálogo y sus entradas; el texto exacto de cada una es microcopy que la Fase B2 fija sobre la maqueta y que `11-Documentacion` revisa de tono.

| Código | Condición | Variante de banda | Restricción de contenido |
| --- | --- | --- | --- |
| `IDENTIDAD-CREADA` | Se llega desde el aprovisionamiento inicial | Confirmación | Qué se creó y qué hacer ahora |
| `CREDENCIAL-RECHAZADA` | El par identificador y secreto no valida | Error | **Indiferenciado**: no dice qué parte falló. No confirma la existencia de la identidad |
| `ACCESO-RESTRINGIDO` | Se superó el umbral de intentos de la política | Error | Declara la restricción y su carácter temporal. **Sin umbrales, sin cuenta regresiva y sin tiempo restante**: exponerlos filtraría el parámetro de la política |
| `FORMULARIO-VENCIDO` | La protección del formulario expiró | Error | Que se reintente, sin detalle técnico |
| `SESION-VENCIDA` | La sesión venció por inactividad o por tope | Error | Que la sesión venció, sin culpar al administrador. Devuelve al shell de acceso |
| `SECRETO-ACTUALIZADO` | Se llega desde el cambio de contraseña | Confirmación | Qué cambió y **qué pasa con la sesión en curso** |
| `SECRETO-ACTUAL-INCORRECTO` | La contraseña actual no valida en el cambio | Error | Sin exponer parámetros de la política |
| `REQUISITO-NO-CUMPLIDO` | La contraseña nueva viola la política declarada | Error | Enuncia la regla igual que el requisito declarado bajo el campo, derivada de la política y no transcripta en la vista |
| `CONFIRMACION-NO-COINCIDENTE` | Los dos campos que deben coincidir difieren | Error | Cuál es la discrepancia y qué hacer |

Un código sin entrada en el catálogo cae en un mensaje genérico, **nunca en el código crudo ni en el detalle técnico**. Las condiciones concretas de la política de contraseña y del control de intentos no están declaradas por ninguna fuente: ver la brecha `B-UX-10`.

### §8.3 Tono de los mensajes

Reglas heredadas de `Design-Rules-Web-Generico.md` §5 y aplicadas a este producto:

- Voz activa. El verbo del acuse coincide con el verbo del botón que lo produjo.
- Los errores no se disculpan y no son vagos: dicen qué pasó, por qué pasó y qué hacer.
- La pantalla vacía es una invitación a actuar, no un adorno. El caso más importante de este producto es el catálogo vacío, que es el estado normal de toda instalación nueva y no una anomalía.
- Se nombran las cosas por lo que el administrador controla, no por cómo está construido el sistema. Donde el intake nombra una tecnología concreta, la interfaz la refiere por su función, con la única excepción de los identificadores literales que el motor de contenedores interpreta (§6).
- No hay handoff humano: no existe soporte al que derivar. La vía de escalamiento del producto es el detalle de diagnóstico copiable del sello de versión, que es lo que convierte un reporte en un diagnóstico.

---

## §9. Trazabilidad

### §9.1 Tabla de trazabilidad del artefacto

Instancia la tabla tipo de `Rules-UX-UI-DX.md` §4.3 con sus catorce filas. **Las siete filas de capacidad y de Fase B2 —configuración por esquema, primer arranque, operador único, identidad de versión, modelo UX-UI, validación visual y línea de base— se declaran una sola vez acá, para toda la categoría, y no se replican por wireframe.** Se explicita para que su ausencia en el §8 de los dieciséis wireframes no se lea como omisión: §4.2.1 punto 8, que es la especificación de la sección obligatoria del wireframe, pide CU origen, marco aplicado, historias a generar y tests previstos, y los dieciséis lo cumplen y suman además la fila de catálogo que §1.4 exige. Es el tratamiento que recomienda el hallazgo `H-17` del audit.

| Dimensión | Referencia |
| --- | --- |
| Persona objetivo | Administrador único del producto, identificado por rol: [`Vision-Producto.md`](../00-Contexto/Vision-Producto.md) §2.1 y §2.2 |
| CU origen | Los **39** casos de uso de [`02-Especificacion-Funcional`](../02-Especificacion-Funcional/Especificacion-Funcional.md) §3, con interacción humana en 38 de ellos; ver §9.3 |
| Reglas de negocio relevantes | RN-03, RN-07, RN-09, RN-10, RN-11, RN-12, RN-13, RN-15, RN-16, RN-20, RN-27, RN-29, RN-30, RN-31, RN-36, RN-37 |
| Wireframes asociados | Los **19** de [`Wireframes/`](Wireframes/); ver §9.2. **Corrección incorporada el 2026-07-30**: esta celda declaraba 16, que era la cuenta de la versión 1.0 y quedó atrás cuando la 1.1 sumó `SUP-17` y `SUP-18`; la migración normativa la preservó sin tocar y la declaró pendiente del corte. Se corrige acá contra el disco |
| Representaciones asociadas | Las 4 de [`Representaciones/`](Representaciones/) |
| US a generar en 06 | Las **146** historias de usuario provisionales de la matriz de [`Especificacion-Funcional.md`](../02-Especificacion-Funcional/Especificacion-Funcional.md) §6 —cifra actualizada el 2026-07-30 con las siete que la ronda de decisiones agrega: cinco de CU-39, una de CU-03 y una de CU-37—, con la numeración definitiva como potestad de `06-Backlog-Tecnico` (brecha B-19 de esa categoría) |
| Tests previstos en 08 | Escenarios de snapshot por estado de cada superficie; tests de accesibilidad WCAG 2.2 AA; el criterio verificable de la restricción CP-10; la medición del riesgo abierto RP-01; y la derivación del caso de prueba de la confirmación escrita, que el anexo E-22 no tiene, ver `B-UX-22` |
| Anchos de verificación del comportamiento responsivo | **Delegados, no ausentes.** La norma de diseño está declarada y aplicada: `Design-Rules-Web-Generico.md` §8 fija el punto de quiebre principal alrededor de 768 px y el piso de 320 px sin desplazamiento horizontal. Lo que queda delegado es la **matriz de verificación**, es decir en qué anchos concretos la etapa `b` comprueba el comportamiento y lo registra en su informe de cierre, según `Compatibilidad-Plataformas.md` §4 e intake §15.1 | 
| Catálogo de diseño aplicado | `Design-Rules-Web-Generico.md` 1.2 y `Design-Rules-Blazor-Mudblazor.md` 1.2, vía `Index-Design-Rules.md` 1.3 |
| Configuración dirigida por esquema aplicada | **Sí**, parcialmente. Contrato del descriptor, ayuda contextual, divulgación progresiva, explicación en palabras, ranura del asistente y frontera de propuesta: aplicados. Presets: sin ejemplos declarados de los que componerlos, ver `B-UX-04`. Modo simulación: sin equivalente declarado, ver `C-UX-02` y `B-UX-08` |
| Primer arranque aplicado | **Sí.** Predicado único de §2.4, corte en tres capas, superficie sin chrome y sin cancelar, `destinoAlCompletar` declarado, orientación posterior en el estado vacío del listado de proyectos |
| Acceso de operador único aplicado | **Sí.** Omisiones declaradas en §1.4, shell partido en §4.1, catálogo de códigos de resultado en §8.2, política de sesión con su brecha `B-UX-11` |
| Identidad de versión aplicada | **Sí** en cuanto a contrato consumido, dos ubicaciones obligatorias, distintivo de preliminar, marcador de origen indeterminado y detalle de diagnóstico copiable. La producción del dato es brecha `B-UX-07` |
| Modelo UX-UI aplicado en la Fase B2 | N/A todavía. La elección del modelo es del paso 1 de la Fase B2 y la ejecuta AG-03M |
| Validación visual de maqueta | Pendiente. `requiere_maqueta` es verdadero; la Fase B2 se ofrece al cerrar la Fase B y la ejecuta AG-03M, con salida en `SDD/Maquetas/SelfHosted-Service/` |
| Línea de base emitida | N/A. `Linea-Base-Visual.md`, `Contrato-Datos-Maqueta.md` y `Bitacora-Validacion-Maqueta.md` los emite AG-03M al aprobarse la maqueta |

### §9.2 Superficies y los casos de uso que las ejercitan

**Esta tabla es la fuente única de la correspondencia entre superficie y caso de uso.** Se declara así de forma explícita porque la correspondencia se enuncia en más de un lugar y una correspondencia afirmada varias veces sin fuente declarada deriva. La regla de gobierno es:

| Vista | Qué contiene | Relación con esta tabla |
| --- | --- | --- |
| **§9.2, esta tabla** | La correspondencia completa `SUP → CU` | **Canónica.** `Rules-UX-UI-DX.md` §3.3 asigna a este artefacto la declaración de los casos de uso de 02 con interacción humana, y §4.3 ubica acá la tabla de trazabilidad de la categoría |
| §9.3 | La correspondencia inversa `CU → SUP` | **Derivada.** Es la inversión mecánica de esta tabla, y sirve para verificar la cobertura. No agrega ni quita ninguna correspondencia |
| §8 de cada wireframe, fila «CU origen» | La fila de esta tabla que le corresponde a esa superficie | **Obligatoria por `Rules-UX-UI-DX.md` §4.2.1 punto 8**, de modo que no puede reemplazarse por una referencia. Reproduce su fila y debe coincidir con ella carácter por carácter |
| [`README.md`](README.md) §4.2 | El inventario de superficies | **Referencia, no repite.** `Rules-UX-UI-DX.md` §3.4 le exige artefacto, propósito, variante y estado, no la correspondencia con los casos de uso, de modo que remite acá en lugar de duplicarla |

**Diecinueve** superficies. Las once primeras corresponden a nodos del mapa de navegación del anexo E-18; las ocho últimas declaran de dónde salen, porque E-18 no las maqueta.

| # | Nombre canónico de la superficie | Wireframe | Ruta o forma | CU que la ejercitan | Origen del maquetado |
| --- | --- | --- | --- | --- | --- |
| SUP-01 | Aprovisionamiento inicial | [`Wireframes-Aprovisionamiento-Inicial.md`](Wireframes/Wireframes-Aprovisionamiento-Inicial.md) | Nodo «alta inicial del administrador» | CU-29 | E-18 mapa de navegación; `Design-Rules-Primer-Arranque.md` §7 |
| SUP-02 | Acceso al panel | [`Wireframes-Acceso-Al-Panel.md`](Wireframes/Wireframes-Acceso-Al-Panel.md) | `/login` | CU-30 | E-18 mapa de navegación; `Design-Rules-Acceso-Monousuario.md` §7 |
| SUP-03 | Cambio de contraseña | [`Wireframes-Cambio-De-Contrasena.md`](Wireframes/Wireframes-Cambio-De-Contrasena.md) | Desde la barra de identidad | CU-31 | `Design-Rules-Acceso-Monousuario.md` §4.4; intake §6 flujo 4 |
| SUP-04 | Listado de proyectos | [`Wireframes-Listado-De-Proyectos.md`](Wireframes/Wireframes-Listado-De-Proyectos.md) | `/proyectos` | CU-01, CU-02, CU-11 | E-18 mapa de navegación |
| SUP-05 | Lienzo del proyecto | [`Wireframes-Lienzo-Del-Proyecto.md`](Wireframes/Wireframes-Lienzo-Del-Proyecto.md) | `/proyectos/{id}` | CU-03, CU-04, CU-05, CU-13, CU-15, CU-16, CU-18, CU-22, CU-28 | E-18 pantalla del lienzo |
| SUP-06 | Panel lateral del servicio | [`Wireframes-Panel-Lateral-Del-Servicio.md`](Wireframes/Wireframes-Panel-Lateral-Del-Servicio.md) | Panel contextual del lienzo | CU-03, CU-13, CU-15, CU-18, CU-19, CU-35, **CU-38** | E-18 panel lateral de servicio |
| SUP-07 | Cajón de cambios pendientes | [`Wireframes-Cajon-De-Cambios-Pendientes.md`](Wireframes/Wireframes-Cajon-De-Cambios-Pendientes.md) | Cajón del lienzo | CU-22, CU-23, CU-24, CU-25 | E-18 mapa de navegación y banner del lienzo; anexo E-5 |
| SUP-08 | Registro del contenedor | [`Wireframes-Registro-Del-Contenedor.md`](Wireframes/Wireframes-Registro-Del-Contenedor.md) | `/proyectos/{id}/servicios/{sid}/logs` | CU-14 | E-18 mapa de navegación |
| SUP-09 | Tablero de estado | [`Wireframes-Tablero-De-Estado.md`](Wireframes/Wireframes-Tablero-De-Estado.md) | `/dashboard` | CU-26, CU-27, CU-28 | E-18 tablero del segundo alcance |
| SUP-10 | Descubrimiento e incorporación | [`Wireframes-Descubrimiento-E-Incorporacion.md`](Wireframes/Wireframes-Descubrimiento-E-Incorporacion.md) | `/descubrimiento` | CU-06, CU-07, CU-08 | E-18 mapa de navegación; anexos E-7 y E-11 |
| SUP-11 | Catálogo de plantillas | [`Wireframes-Catalogo-De-Plantillas.md`](Wireframes/Wireframes-Catalogo-De-Plantillas.md) | `/catalogo` | CU-16, CU-17, CU-36 | E-18 mapa de navegación; anexo E-6 |
| SUP-12 | Configuración del sistema | [`Wireframes-Configuracion-Del-Sistema.md`](Wireframes/Wireframes-Configuracion-Del-Sistema.md) | `/configuracion` | CU-12, CU-19, CU-32 | E-18 mapa de navegación; anexos E-8 y E-12 |
| SUP-13 | Variables compartidas del proyecto | [`Wireframes-Variables-Compartidas-Del-Proyecto.md`](Wireframes/Wireframes-Variables-Compartidas-Del-Proyecto.md) | Desde el lienzo del proyecto | CU-34, CU-35, CU-36 | **E-18 no la maqueta.** Pendencia declarada; ver `B-UX-03`. Derivada de los anexos E-1, E-5 y E-10 |
| SUP-14 | Informe de conflicto de direcciones | [`Wireframes-Informe-De-Conflicto-De-Direcciones.md`](Wireframes/Wireframes-Informe-De-Conflicto-De-Direcciones.md) | Modal con flujo propio, desde el arranque | CU-18, CU-20, CU-21, CU-24 | **E-18 no la maqueta.** Derivada del anexo E-8 y del intake §6 flujo 3 |
| SUP-15 | Exportación e importación | [`Wireframes-Exportacion-E-Importacion.md`](Wireframes/Wireframes-Exportacion-E-Importacion.md) | Modal con flujo propio, desde el proyecto y desde el listado | CU-09, CU-10, CU-11, CU-12 | **E-18 no la maqueta.** Derivada de los anexos E-14 y E-21 y de la superficie de la API del anexo E-15 |
| SUP-16 | Revisión de higiene | [`Wireframes-Revision-De-Higiene.md`](Wireframes/Wireframes-Revision-De-Higiene.md) | Desde el lienzo del proyecto | CU-36 | **E-18 no la maqueta.** `02-Especificacion-Funcional` delega explícitamente la presentación de los avisos a esta categoría. Derivada de la tabla de cinco detecciones del intake §4 |
| SUP-17 | Alta de servicio | [`Wireframes-Alta-De-Servicio.md`](Wireframes/Wireframes-Alta-De-Servicio.md) | Flujo por pasos, desde el lienzo del proyecto y desde el catálogo | CU-03, CU-13, CU-15, CU-16 | **E-18 no la maqueta, y hasta la versión 1.1 esta categoría tampoco.** Derivada del anexo E-2 §20.2.1 a §20.2.5 y de la nota de los dos ejes del alta del intake §4 |
| SUP-18 | Imágenes | [`Wireframes-Imagenes.md`](Wireframes/Wireframes-Imagenes.md) | `/imagenes` | CU-37, CU-38 | **E-18 no la maqueta.** Derivada del anexo E-23, que es nuevo en el intake v2.4. **Tres tramos siguen dependiendo de decisiones abiertas y lo declara** |
| SUP-19 | Exploración de registro de imágenes | [`Wireframes-Exploracion-De-Registro-De-Imagenes.md`](Wireframes/Wireframes-Exploracion-De-Registro-De-Imagenes.md) | Superficie con flujo propio, desde el paso del origen del alta en las vías de imagen, y desde el inventario de imágenes | CU-39, CU-03 | **E-18 no la maqueta.** Derivada de la decisión `Q-27` del intake v3.2 §19, que declara explícitamente que es una superficie nueva, y de CU-39 |

El mínimo que la tabla de adaptabilidad fija para `web-monolith` es de cuatro superficies clave. E-18 declara más, y la cobertura de los casos de uso con interacción humana relevante lleva la cuenta a **diecinueve**.

**Sobre la superficie incorporada el 2026-07-30.** `SUP-19`, exploración de registro de imágenes, **no corrige una omisión de esta categoría**: es una capacidad que el producto no tenía. `Q-27` preguntaba si conocer la dirección de la imagen era requisito del usuario, esta categoría declaraba las dos respuestas como legítimas en su brecha `B-UX-23` y no presumía ninguna, y el agente humano del proyecto decidió que **hay exploración**. La consecuencia que la decisión declara es explícita —es una superficie nueva con wireframe propio— y `02-Especificacion-Funcional` propuso el identificador `SUP-19` sin emitirlo, para no invadir esta categoría: es su brecha `B-25`, que se cierra al emitirse la superficie acá. El número es el **siguiente libre** de la serie, tomado al final y sin renumerar nada.

**Sobre las dos superficies incorporadas en la versión 1.1, y una corrección de la propia categoría.**

**`SUP-17`, alta de servicio, corrige una omisión de la versión 1.0.** El alta de servicio no tenía wireframe propio: vivía repartida entre `SUP-05` y `SUP-06`. La consecuencia la destapó el paso 5 de la Fase B2 —había disparador y no había destino, y el origen era un campo de valores técnicos—, y la corrección es darle superficie propia. **El número `SUP-17` que el documento de trabajo usa para nombrarla no existía en ninguna parte**: esta categoría declaraba dieciséis superficies, y la maqueta documenta su archivo `Alta-De-Servicio.html` como un estado de `SUP-06`. El número coincide porque es el siguiente libre.

**`SUP-18`, imágenes, es una superficie que no existía porque su dominio no existía.** El ciclo de vida de las imágenes no estaba en el intake antes de su versión 2.4. **Actualizado el 2026-07-30:** de las cinco decisiones abiertas de las que dependía, `Q-15` y `Q-17` quedaron cerradas —el despliegue registra el digesto, y la limpieza es sugerida— y su wireframe completó los dos tramos correspondientes. Siguen abiertas **tres**, `Q-16`, `Q-18` y `Q-21`, enumeradas una por una en su §5.1, y **se retira la consecuencia de que la maqueta no debe construirla**: las dos condiciones que la ponían están cerradas.

Las cuatro representaciones reutilizadas entre superficies:

| Representación | Documento | Superficies que la invocan |
| --- | --- | --- |
| Nodo de servicio del lienzo | [`Representacion-Nodo-De-Servicio.md`](Representaciones/Representacion-Nodo-De-Servicio.md) | SUP-05 |
| Lenguaje visual de estados | [`Representacion-Lenguaje-Visual-De-Estados.md`](Representaciones/Representacion-Lenguaje-Visual-De-Estados.md) | SUP-04, SUP-05, SUP-06, SUP-09, SUP-10 |
| Banda de resultado por código | [`Representacion-Banda-De-Resultado.md`](Representaciones/Representacion-Banda-De-Resultado.md) | SUP-01, SUP-02, SUP-03, SUP-04, SUP-14 |
| Sello de versión y detalle de diagnóstico | [`Representacion-Sello-De-Version.md`](Representaciones/Representacion-Sello-De-Version.md) | SUP-02, SUP-12 |

### §9.3 Cobertura inversa: casos de uso a superficie

**Tabla derivada.** Es la inversión mecánica de §9.2, que es la fuente única, y no agrega ni quita ninguna correspondencia: si las dos difieren, manda §9.2 y esta tabla está mal. Existe porque es la vista con la que se verifica la cobertura, que es lo que §5.3 de `Rules-UX-UI-DX.md` pregunta.

Los **39** casos de uso de `02-Especificacion-Funcional`, con la superficie que los materializa. Ningún caso de uso con interacción humana queda sin superficie.

| CU | Superficies | CU | Superficies |
| --- | --- | --- | --- |
| CU-01 | SUP-04 | CU-19 | SUP-06, SUP-12 |
| CU-02 | SUP-04 | CU-20 | SUP-14 |
| CU-03 | SUP-05, SUP-06, **SUP-17**, **SUP-19** | CU-21 | SUP-14 |
| CU-04 | SUP-05 | CU-22 | SUP-05, SUP-07 |
| CU-05 | SUP-05 | CU-23 | SUP-07 |
| CU-06 | SUP-10 | CU-24 | SUP-07, SUP-14 |
| CU-07 | SUP-10 | CU-25 | SUP-07 |
| CU-08 | SUP-10 | CU-26 | SUP-09 |
| CU-09 | SUP-15 | CU-27 | SUP-09 |
| CU-10 | SUP-15 | CU-28 | SUP-05, SUP-09 |
| CU-11 | SUP-04, SUP-15 | CU-29 | SUP-01 |
| CU-12 | SUP-12, SUP-15 | CU-30 | SUP-02 |
| CU-13 | SUP-05, SUP-06, **SUP-17** | CU-31 | SUP-03 |
| CU-14 | SUP-08 | CU-32 | SUP-12 |
| CU-15 | SUP-05, SUP-06, **SUP-17** | CU-33 | **Sin superficie.** Ver la nota siguiente |
| CU-16 | SUP-05, SUP-11, **SUP-17** | CU-34 | SUP-13 |
| CU-17 | SUP-11 | CU-35 | SUP-06, SUP-13 |
| CU-18 | SUP-05, SUP-06, SUP-14 | CU-36 | SUP-11, SUP-13, SUP-16 |
| **CU-37** | **SUP-18** | **CU-38** | **SUP-06, SUP-18** |
| **CU-39** | **SUP-19** | | |


**CU-39 aparece en una sola superficie y CU-03 gana una, y las dos cosas son la misma decisión.** La exploración de registro de imágenes se materializa en `SUP-19`; lo que CU-03 gana es el **punto de entrada** desde el paso del origen de sus vías de imagen. Explorar **no es una octava vía de alta**: no cambia el origen resultante ni deja huella en la procedencia, de modo que `SUP-17` conserva sus cuatro casos de uso sin sumar CU-39.

**CU-38 aparece en dos superficies y conviene decir en cuál hace qué.** La línea de tiempo desde la que se elige el despliegue al que volver vive en `SUP-06`, el panel lateral del servicio; el inventario que declara si la imagen de ese despliegue todavía existe vive en `SUP-18`. Son dos mitades de la misma operación y ninguna alcanza sola.

**CU-33, disparo de despliegue con credencial de ámbito mínimo, no tiene superficie y no es una omisión.** Su actor es el automatismo de integración continua y su superficie es la API REST, no una pantalla. Lo que sí tiene superficie es su condición previa —la emisión de la credencial, CU-32, en SUP-12— y su efecto observable, que es un despliegue cuya línea de tiempo se lee en SUP-05 y SUP-06 como cualquier otro. Se declara para que la cobertura no se lea incompleta.

---

## §10. Notas y supuestos

### §10.1 Contradicciones declaradas entre el catálogo de diseño y el anexo E-18

Se declaran en lugar de resolverse en silencio, que es lo que `Rules-UX-UI-DX.md` y el despacho de esta categoría exigen.

**`C-UX-01` · El estado «pendiente de aplicar» no tiene token en el catálogo base.**
El anexo E-18 declara siete estados del nodo y reserva el violeta **en exclusiva** para «pendiente de aplicar», con la justificación de que «un tercer estado visual sólo funciona si es inequívoco». El catálogo base `Design-Rules-Web-Generico.md` §2.1 declara cinco estados semánticos —éxito, atención, error, informativo y neutro— y ninguno corresponde a «pendiente». Al mismo tiempo, §1 principio 3 y el anti-patrón de §10 prohíben definir tokens visuales ad hoc por pantalla.
**Cómo se declara:** los dos requisitos no se pueden cumplir a la vez sin agregar un token. El anti-patrón admite exactamente una salida: «agregar token nuevo sólo si es transversal y se promueve al catálogo». El estado «pendiente de aplicar» es transversal —cualquier producto con edición transaccional lo necesita—, de modo que corresponde promoverlo al catálogo en lugar de declararlo por proyecto de código. Esta categoría **no lo promueve ni le fija valor**: lo declara como brecha `B-UX-05` con destinatario en el mantenedor del catálogo. Mientras tanto, los wireframes nombran el estado por su nombre semántico, «pendiente de aplicar», y no por su color.

**`C-UX-02` · El modo simulación no tiene equivalente declarado en este producto.**
`Design-Rules-Config-Esquema.md` §4.6 declara el indicador de modo simulación como patrón, §5 lo lista como estado y §9 lo exige como criterio de aceptación: «el modo simulación está declarado». Ninguna fuente de este producto declara una simulación. Lo que sí declara es el conjunto de cambios pendientes con su informe de impacto, que cumple los otros tres requisitos de la frontera de §6 —previsualizar, confirmar y no aplicar directo— pero **no prueba el efecto**: calcula qué se va a redesplegar, no qué va a pasar.
**Cómo se declara:** la diferencia es real y no se disimula mapeando una cosa a la otra. El informe de impacto se declara como realización de la frontera de propuesta, y el modo simulación se declara como **no realizado**, con brecha `B-UX-08`. Un segundo aspecto de la misma contradicción es cromático: §4.6 de esa extensión pide un chip de estado `warning` para el indicador, y en este producto el estado «cambios pendientes» está asignado al violeta exclusivo de E-18, mientras que el par de atención ya está tomado por «activo degradado». Si la brecha se resuelve incorporando una simulación, su indicador no puede reutilizar ninguno de los dos.

**`C-UX-03` · La ranura del asistente de IA reserva lugar para una capacidad que el alcance no declara.**
`Rules-UX-UI-DX.md` §1.4 obliga a «reservar la ranura del asistente de IA (forward-compat) sin construirla» en todo proyecto de código que cargue la extensión de configuración por esquema, y `Design-Rules-Config-Esquema.md` §4.7 la especifica. Ninguna fuente de este producto declara asistencia de un modelo de lenguaje: el indicador correspondiente es falso y el alcance de §4 del intake no la enumera ni entre lo pospuesto. Además, `Design-Rules-Acceso-Monousuario.md` §10 declara como anti-patrón «mostrar deshabilitado lo que no aplica».
**Cómo se declara:** la regla de la categoría es normativa y explícita, y el anti-patrón que la tensiona está enunciado para las ceremonias de identidad, no para la ranura, que la propia extensión declara deshabilitada por diseño. Se **aplica la regla**: la ranura se reserva en el cajón de cambios pendientes, deshabilitada, anunciada a tecnologías asistivas y sin ocupar lugar central.

**Resuelta a favor de aplicar la regla.** El audit independiente de la Fase B se pronunció sobre este punto y confirmó la lectura: [`Audit/B-02-03-r1.md`](../Audit/B-02-03-r1.md) §7.2 declara que §1.4 condiciona la ranura a que el proyecto de código tenga superficies de configuración y no al indicador de asistencia por modelo de lenguaje, y que «una ranura forward-compat es, por definición, para el caso en que la capacidad todavía no existe: `usa_llm` false es su caso de uso, no su excepción». Declara además que el anti-patrón de `Design-Rules-Acceso-Monousuario.md` §10 está acotado por el §2 de esa misma extensión a las omisiones del perfil de identidad y no alcanza a la ranura. **La tensión deja de estar abierta**: el defecto quedó registrado como hallazgo `R-3` contra el repositorio fuente, porque la regla obliga a deducir lo que podría enunciar. La brecha `B-UX-09` se conserva con su identificador y pasa a estado cerrado.

**`C-UX-04` · El anexo E-17 exige distinguir dos estados que el lenguaje visual del anexo E-18 no tiene.**
Es una contradicción entre dos anexos del mismo intake, y esta categoría la hereda. El anexo E-17 declara, en su «Qué ejercita», «los estados que no son caída y que la interfaz debe distinguir —degradado, **pausado**, **finalizado**—», y su tabla de correspondencia asigna `Activo (pausado)` al contenedor en pausa y `Finalizado` al que terminó con código cero. El lenguaje visual de E-18 tiene siete filas y ninguna corresponde a pausado ni a finalizado: lo más cercano es «detenido o retirado», que es otra cosa, porque un servicio finalizado es el resultado normal de una tarea puntual y un servicio pausado sigue existiendo en el motor.
**Cómo se declara:** no se inventan dos filas del contrato visual. Se declara como brecha `B-UX-12`, con destinatario en el agente humano del proyecto, y los wireframes exhiben los dos estados **por su etiqueta textual** sobre el par neutro, sin asignarles insignia ni borde propios, hasta que el contrato se complete.

**Confirmada como defecto del intake, no de esta categoría.** El audit independiente de la Fase B la verificó anexo contra anexo y declara que «un anexo exige distinguir dos estados que el otro no permite representar», y que el tratamiento que le dio esta categoría es **correcto**: no inventar filas, exhibir por etiqueta textual y escalar la brecha. Quedó elevada como hallazgo `R-6` contra el intake, con la recomendación de agregar las dos filas al contrato visual de E-18 o de declarar en E-17 que el canal de distinción es textual. Ver [`Audit/B-02-03-r1.md`](../Audit/B-02-03-r1.md) §7.2 y §8.2.

**`C-UX-05` · El punto de acceso al cierre de sesión no coincide con el que describe el intake.**
El intake §6 flujo 4 dice que «el cambio de contraseña y el cierre de sesión se hacen desde el **menú de usuario** de la barra superior», y el anexo E-18 dibuja ese punto de acceso como un desplegable en la pantalla del lienzo. `Design-Rules-Acceso-Monousuario.md` §4.3 exige lo contrario: la barra de identidad lleva las dos acciones «ambas con ícono y etiqueta textual», «nunca se colapsa a solo ícono en escritorio», y §6 exige que el cierre de sesión esté «siempre a un clic desde cualquier superficie del shell de trabajo». Su §10 enumera como anti-patrón «cierre de sesión escondido tras un menú anidado».
**Cómo se declara:** se aplica el catálogo, porque la regla que el intake describe es una forma de interfaz y no un requisito funcional, y porque el catálogo la enuncia como anti-patrón explícito. La divergencia estaba razonada dentro de [`Wireframes-Cambio-De-Contrasena.md`](Wireframes/Wireframes-Cambio-De-Contrasena.md) §3.1 y se eleva acá para que reciba el mismo tratamiento que las otras cuatro, que es lo que el hallazgo `H-16` del audit pide. No genera brecha: las dos fuentes declaran el dato y esta categoría elige la del catálogo con su motivo.

### §10.2 Brechas abiertas de esta categoría

Ninguna se resuelve acá. Se declaran con su destinatario, que es lo que la Fase A dejó asentado como precaución para la Fase B.

**Estado tras el audit independiente de la Fase B.** El informe [`Audit/B-02-03-r1.md`](../Audit/B-02-03-r1.md) §7.2 evaluó las veinte brechas que esta categoría había declarado, una a una y contra la fuente. Su resultado se incorpora acá sin reescribir el historial: **`B-UX-15` se retira por falsa**, `B-UX-09` pasa a cerrada, cinco enunciados sobredimensionados se acotan a lo que la evidencia sostiene, y se suman dos brechas nuevas que el propio audit destapó. Los identificadores retirados y cerrados **conservan su fila**, para que las referencias ya emitidas —incluidas las del informe— sigan resolviendo. El resultado son **veinte brechas vigentes sobre veintidós identificadores emitidos**: `B-UX-15` retirada y `B-UX-09` cerrada.

**Actualización de la versión 1.1, 2026-07-29.** Se suman **cinco brechas**, `B-UX-23` a `B-UX-27`, todas provenientes de la redefinición del alta y la configuración de servicios. Cuatro de las cinco son **decisiones de producto que nadie tomó** y que esta categoría deliberadamente no toma —`Q-27`, `Q-28`, `Q-15` y el conjunto `Q-15` a `Q-21`—; la quinta, `B-UX-24`, es trabajo propio de esta categoría sobre una representación que ya tiene. El resultado son **veinticinco brechas vigentes sobre veintisiete identificadores emitidos**.

**Actualización de la versión 2.1, 2026-07-30.** La ronda de decisiones del agente humano del proyecto —`Q-15`, `Q-17`, `Q-27`, la confirmación de `DI-17` a `DI-19` y la resolución de `PA-15`— **cierra dos brechas**, `B-UX-23` y `B-UX-26`, **acota una**, `B-UX-27`, y **abre tres**, `B-UX-28` a `B-UX-30`. Ninguna de las tres nuevas es una decisión que la ronda haya dejado a medias: son huecos que las decisiones cerradas **destaparon** al volver especificables tramos que antes no lo eran, más la propagación que la propia categoría se debe. Las filas cerradas **conservan su identificador y su fila**, con el mismo criterio con el que se conservaron `B-UX-09` y `B-UX-15`. El resultado son **veintiséis brechas vigentes sobre treinta identificadores emitidos**: `B-UX-15` retirada, y `B-UX-09`, `B-UX-23` y `B-UX-26` cerradas. **Ninguna decisión abierta se cerró acá**: siguen abiertas `Q-16`, `Q-18`, `Q-19`, `Q-20`, `Q-21` y `Q-28`, más las diecinueve especificaciones de integración sin confirmar.

| # | Brecha | Dónde se manifiesta | Destinatario | Estado tras el audit |
| --- | --- | --- | --- | --- |
| B-UX-01 | **Pendencia de E-18 heredada como B-07 de 02.** La distinción visual entre las aristas que declaran espera al destino y las que no. Ninguna regla del catálogo de diseño cubre la representación de aristas de un lienzo, de modo que no se resuelve por derivación. Lo que sí se declara es la restricción que cualquier solución debe cumplir: el color no puede ser el único canal, y la distinción no puede usar el violeta reservado | [`Wireframes-Lienzo-Del-Proyecto.md`](Wireframes/Wireframes-Lienzo-Del-Proyecto.md) §5; [`Representacion-Nodo-De-Servicio.md`](Representaciones/Representacion-Nodo-De-Servicio.md) §3 | Agente humano del proyecto | Confirmada |
| B-UX-02 | **Pendencia de E-18 heredada como B-07 de 02.** El maquetado del paso de clasificación de variables de la incorporación. **Se resuelve por derivación** de la carga útil del anexo E-11, de las reglas RA-05 y RA-06 del anexo E-7 y de los patrones de formulario del catálogo; se declara igual porque E-18 no la maqueta y porque la resolución es derivada y no declarada | [`Wireframes-Descubrimiento-E-Incorporacion.md`](Wireframes/Wireframes-Descubrimiento-E-Incorporacion.md) §2 y §3 | Agente humano del proyecto, para confirmar la derivación | Confirmada |
| B-UX-03 | **Pendencia de E-18 heredada como B-07 de 02.** El maquetado de la pantalla de variables compartidas del proyecto SelfHosted. **Se resuelve por derivación** de los campos del anexo E-1, del cambio 4 del anexo E-5 y del patrón de grilla de listado del catálogo; se declara por el mismo motivo que la anterior | [`Wireframes-Variables-Compartidas-Del-Proyecto.md`](Wireframes/Wireframes-Variables-Compartidas-Del-Proyecto.md) | Agente humano del proyecto, para confirmar la derivación | Confirmada |
| B-UX-04 | Ninguna fuente declara la `leyenda` ni los `ejemplos` de ningún parámetro configurable, y para la mayoría tampoco sus límites. El contrato del descriptor exige los seis campos, y la ayuda contextual y la explicación en palabras se derivan de ellos. Esta categoría declara el contrato y los campos que sí están declarados, y no compone los que faltan | [`Wireframes-Panel-Lateral-Del-Servicio.md`](Wireframes/Wireframes-Panel-Lateral-Del-Servicio.md) §3; [`Wireframes-Configuracion-Del-Sistema.md`](Wireframes/Wireframes-Configuracion-Del-Sistema.md) §3 | Agente humano del proyecto y `05-Arquitectura-Tecnica` | **Acotada.** El audit verificó que los límites **sí están declarados** para varios parámetros —rango de direcciones en E-8, conjunto cerrado de política de reinicio en E-21, techo de recursos en RN-19, dirección por réplica en RN-18—. Lo que ninguna fuente declara es la leyenda y los ejemplos |
| B-UX-05 | El estado «pendiente de aplicar» no tiene token en el catálogo base y el catálogo prohíbe definirlo por proyecto de código. Ver `C-UX-01` | §4.2 de este documento | Mantenedor del catálogo de diseño (AG-ROOT) | Confirmada |
| B-UX-06 | El intake declara el prefijo de nombre reservado de los contenedores «configurable, distinto en desarrollo y en producción» sin decir quién lo fija, de modo que la frontera de §2.5 no puede clasificarlo. Hasta que se clasifique, no se dibuja | §2.5 de este documento | Agente humano del proyecto y `05-Arquitectura-Tecnica` | Confirmada |
| B-UX-07 | El contrato de identidad de versión no está declarado por ninguna fuente: ni cómo llega la cadena legible al punto de composición, ni si existe identificador de construcción, ni cómo se determina que el artefacto es preliminar o que su origen es indeterminado | §4.4; [`Representacion-Sello-De-Version.md`](Representaciones/Representacion-Sello-De-Version.md) | `05-Arquitectura-Tecnica` y `09-Devops` | Confirmada |
| B-UX-08 | El modo simulación de la extensión de configuración por esquema no tiene equivalente declarado. Ver `C-UX-02` | §4.3 | Agente humano del proyecto | **Acotada.** El audit confirmó la contradicción y observó que «sin equivalente declarado» sobredimensiona: el conjunto de cambios pendientes con su informe de impacto es equivalente funcional declarado de tres de los cuatro requisitos de la frontera. Lo que falta es la simulación, no la frontera |
| B-UX-09 | La ranura del asistente reserva lugar para una capacidad que el alcance del intake no declara. Ver `C-UX-03` | [`Wireframes-Cajon-De-Cambios-Pendientes.md`](Wireframes/Wireframes-Cajon-De-Cambios-Pendientes.md) §3 | Agente humano del proyecto | **Cerrada.** El audit se pronunció a favor de aplicar la regla y el defecto quedó contra el repositorio fuente como `R-3`. Ver `C-UX-03` |
| B-UX-10 | Las condiciones concretas de validación de la contraseña y la política de limitación de intentos fallidos no están declaradas. Es la brecha B-13 de `02-Especificacion-Funcional`, y en esta categoría bloquea el texto del requisito declarado antes del intento y el del estado de acceso restringido | [`Wireframes-Aprovisionamiento-Inicial.md`](Wireframes/Wireframes-Aprovisionamiento-Inicial.md) §3; [`Wireframes-Cambio-De-Contrasena.md`](Wireframes/Wireframes-Cambio-De-Contrasena.md) §3 | Agente humano del proyecto | Confirmada |
| B-UX-11 | La duración de la sesión, su condición de vencimiento y el efecto de cada acto de identidad sobre la sesión en curso no están declarados. La extensión de acceso de operador único exige declarar los tres | §3.2; [`Wireframes-Acceso-Al-Panel.md`](Wireframes/Wireframes-Acceso-Al-Panel.md) §5 | Agente humano del proyecto y `05-Arquitectura-Tecnica` | **Acotada.** Duración y vencimiento de la sesión: confirmadas. El audit precisó que la vigencia de 90 días del intake §17.P.5 es de las credenciales de máquina y no de la sesión, y que el efecto de revocar una credencial sobre la sesión del administrador **sí está declarado** en el anexo E-12 |
| B-UX-12 | El lenguaje visual de estados del anexo E-18 no tiene fila para «pausado» ni para «finalizado», que el anexo E-17 exige distinguir. Ver `C-UX-04` | [`Representacion-Lenguaje-Visual-De-Estados.md`](Representaciones/Representacion-Lenguaje-Visual-De-Estados.md) §3 | Agente humano del proyecto | **Confirmada y elevada al intake** como hallazgo `R-6`. El tratamiento de esta categoría se declaró correcto |
| B-UX-13 | No está declarado si el registro que emite el contenedor debe filtrarse respecto de valores secretos, ni el comportamiento ante el corte del flujo continuo. Es la brecha B-08 de `02-Especificacion-Funcional`, y en esta categoría condiciona dos estados de la superficie del registro | [`Wireframes-Registro-Del-Contenedor.md`](Wireframes/Wireframes-Registro-Del-Contenedor.md) §5 | Agente humano del proyecto y `05-Arquitectura-Tecnica` | Confirmada |
| B-UX-14 | No está declarada la forma de la confirmación al eliminar un proyecto SelfHosted completo, mientras que sí lo está la de eliminar un servicio. Es la brecha B-04 de `02-Especificacion-Funcional` | [`Wireframes-Listado-De-Proyectos.md`](Wireframes/Wireframes-Listado-De-Proyectos.md) §4 | Agente humano del proyecto | Confirmada |
| B-UX-15 | Los anchos de ventana concretos en los que se verifica el comportamiento responsivo no están declarados: `Compatibilidad-Plataformas.md` §4 los delega a la maqueta y a la etapa `b`, que los registra en su informe de cierre | §7 de cada wireframe | AG-03M en la Fase B2, y la etapa `b` | **RETIRADA POR FALSA.** Ver la nota de §10.2.1 |
| B-UX-16 | El destino concreto y la periodicidad de la exportación programada no están declarados. Es la brecha B-10 de `02-Especificacion-Funcional`, y acá deja sin descriptor dos campos de la superficie de configuración | [`Wireframes-Configuracion-Del-Sistema.md`](Wireframes/Wireframes-Configuracion-Del-Sistema.md) §3 | Agente humano del proyecto y `05-Arquitectura-Tecnica` | **Acotada.** Destino: confirmada, y el propio intake la admite en CL-10. Periodicidad: **hay cota declarada**, «intervalo máximo de 7 días entre exportaciones programadas», intake §23.3 |
| B-UX-17 | El mapa de navegación del anexo E-18 no incluye ninguna ruta de exportación ni de importación, ni de revisión de higiene, aunque cinco casos de uso las exigen. Las superficies SUP-15 y SUP-16 se derivan de los anexos E-14, E-15 y E-21 y de la tabla de detecciones del intake §4, y no de E-18; su ubicación en el mapa queda por confirmar | [`Wireframes-Exportacion-E-Importacion.md`](Wireframes/Wireframes-Exportacion-E-Importacion.md) §1; [`Wireframes-Revision-De-Higiene.md`](Wireframes/Wireframes-Revision-De-Higiene.md) §1 | Agente humano del proyecto | Confirmada |
| B-UX-18 | El intake no declara qué ocurre al descartar un cambio del que dependen otros cambios del mismo conjunto pendiente. Es la brecha B-11 de `02-Especificacion-Funcional`, y acá deja sin especificar qué ve el administrador en ese momento: si el descarte se bloquea, si arrastra a los dependientes o si se ofrece elegir | [`Wireframes-Cajon-De-Cambios-Pendientes.md`](Wireframes/Wireframes-Cajon-De-Cambios-Pendientes.md) §5.1 | Agente humano del proyecto | Confirmada |
| B-UX-19 | No está declarado el comportamiento esperado cuando la lectura del estado del sistema operativo no está disponible, ni la validez temporal de un estado que no pudo reconciliarse. Es la brecha B-14 de `02-Especificacion-Funcional`, y acá deja sin declarar cómo se presenta la antigüedad de un dato que no es actual | [`Wireframes-Tablero-De-Estado.md`](Wireframes/Wireframes-Tablero-De-Estado.md) §5.1 | `05-Arquitectura-Tecnica` | **Acotada.** La indisponibilidad de la lectura del sistema operativo es brecha real. La validez temporal **está acotada** por el intake §17.P.10 —reconciliación completa cada 30 s— y por NB-07 |
| B-UX-20 | El intake declara la revisión periódica del proyecto SelfHosted como uno de los momentos de evaluación de las condiciones de higiene, y no declara su frecuencia. Es la brecha B-15 de `02-Especificacion-Funcional`, y acá impide declarar cada cuánto se refresca el contenido de la superficie de revisión | [`Wireframes-Revision-De-Higiene.md`](Wireframes/Wireframes-Revision-De-Higiene.md) §3.1 | `05-Arquitectura-Tecnica` | Confirmada |
| B-UX-21 | Ninguna fuente declara el separador decimal de la interfaz, y el anexo E-18 exhibe **punto decimal** en todas sus cifras, que no es el separador del español rioplatense. `Design-Rules-Web-Generico.md` §2.2 sólo declara cifras tabulares. La regla que esta categoría había enunciado se retiró | §6 de este documento | Agente humano del proyecto | **Nueva.** Origen: hallazgo `H-10` del audit |
| B-UX-22 | La confirmación escrita al eliminar un servicio no tiene caso ejecutable en el anexo E-22 del intake: RN-10 es una de las **tres** reglas sin caso propio, junto con RN-02 y RN-08. La heurística de prevención de errores de §2.2 no puede citar una verificación que no existe | §2.2 de este documento | `08-Calidad-Y-Pruebas`, para derivar el caso; el intake, por el hallazgo `R-5` | **Nueva.** Origen: hallazgo `H-05` del audit |
| B-UX-23 | ~~**El primer minuto de uso no tiene camino para quien no sabe una dirección de imagen.**~~ · **CERRADA el 2026-07-30.** Declaraba que el catálogo arranca vacío —decisión D-16— y que el producto no decía si existía alguna forma de explorar un registro de imágenes, y que la respuesta decidía entre **una superficie nueva** y **una línea de ayuda**. El agente humano del proyecto decidió `Q-27`: **hay exploración**, y por lo tanto es la superficie nueva. Se emite como `SUP-19`. Lo que queda del hueco **no es el camino sino su configuración**, y vive en `B-UX-29` | [`Wireframes-Alta-De-Servicio.md`](Wireframes/Wireframes-Alta-De-Servicio.md) §3.6; [`Wireframes-Catalogo-De-Plantillas.md`](Wireframes/Wireframes-Catalogo-De-Plantillas.md) §3.8 | Cerrada. La superficie que la decisión declaraba está emitida | **Cerrada el 2026-07-30.** La fila se conserva porque otros artefactos citan el identificador |
| B-UX-24 | **El lenguaje visual de estados no tiene señal para el nodo borrador.** El estado de configuración `borrador` es nuevo, y el anexo E-18 no lo incluye porque no existía cuando se declaró. La señal no puede colisionar con el violeta reservado al modo pendiente ni con los estados de ejecución, y los dos significan cosas opuestas —incompleto contra listo y esperando— de modo que no pueden compartir representación | [`Wireframes-Lienzo-Del-Proyecto.md`](Wireframes/Wireframes-Lienzo-Del-Proyecto.md) §3.3; [`Representacion-Lenguaje-Visual-De-Estados.md`](Representaciones/Representacion-Lenguaje-Visual-De-Estados.md) | `03-UX-UI-DX`, en la revisión de esa representación | **Nueva en la versión 1.1** |
| B-UX-25 | **El origen de un servicio no es editable y nadie lo decidió.** La reentrada de la configuración de CU-03 arranca después del origen y lo excluye sin decirlo: **corregir una etiqueta mal escrita no tiene camino en ninguna superficie**. Es la pendiente `Q-28` del intake §19. Mientras esté abierta, el panel **declara que no es editable** en lugar de mostrar un control deshabilitado sin explicación | [`Wireframes-Panel-Lateral-Del-Servicio.md`](Wireframes/Wireframes-Panel-Lateral-Del-Servicio.md) §3.4 | Agente humano del proyecto | **Nueva en la versión 1.1** |
| B-UX-26 | ~~**El digesto de la imagen en uso depende de que alguien lo registre.**~~ · **CERRADA el 2026-07-30.** El panel lateral y el inventario de imágenes lo necesitan para responder qué corre exactamente, y el registro del digesto por despliegue era la pendiente `Q-15`. **Decidida en positivo**: el despliegue registra el digesto de la imagen que usó, y el bloque `imagen` del despliegue del anexo E-23 es el campo que lo puebla. El indicador de uso de `SUP-18` queda especificado en su §3.4 | [`Wireframes-Panel-Lateral-Del-Servicio.md`](Wireframes/Wireframes-Panel-Lateral-Del-Servicio.md) §3.5; [`Wireframes-Imagenes.md`](Wireframes/Wireframes-Imagenes.md) §3.4 | Cerrada. La **propagación** al panel lateral, que todavía la cita como abierta, es `B-UX-30` | **Cerrada el 2026-07-30.** La fila se conserva porque otros artefactos citan el identificador |
| B-UX-27 | **Alcance acotado el 2026-07-30: de cinco tramos a tres.** Siguen dependiendo de decisiones abiertas la separación entre lo administrado y lo ajeno (`Q-16`), el alcance de la marca de conservada (`Q-21`) y el ámbito de credencial de la limpieza por API (`Q-18`). **`Q-15` y `Q-17` cerraron**: el indicador de uso y el disparo de la limpieza quedan especificados en `SUP-18` §3.4 y §3.5, con la ubicación y la forma del umbral que el intake delega en esta categoría. **Se retira la consecuencia** de que la maqueta no debe construir `SUP-18`: las dos condiciones que la ponían están cerradas | [`Wireframes-Imagenes.md`](Wireframes/Wireframes-Imagenes.md) §5.1 | Agente humano del proyecto | **Acotada el 2026-07-30** |
| B-UX-28 | **Los valores por defecto del umbral de la sugerencia de limpieza no salen de ninguna fuente.** `Q-17` decidió que la limpieza es sugerida y el intake delega en esta categoría dónde aparece la sugerencia y con qué umbral. La **ubicación** y la **forma del umbral** se especifican —conjunción de espacio recuperable y ocupación, con histéresis y con la regla de que descartada no vuelve hasta que el hecho cambie, gobernada por descriptor y no escrita en la pantalla—. Los **valores numéricos** no: el intake declara el servidor de referencia con «un único SSD sin RAID ni LVM» y **no declara su capacidad**, no declara ninguna cota de ocupación, y el catálogo de diseño no cubre umbrales de disco. Se declaran las **tres restricciones** que cualquier resolución debe cumplir, y una dependencia: el cálculo del espacio recuperable **depende del criterio de descarte**, que es la brecha `B-26` de `02-Especificacion-Funcional` y tampoco está declarado | [`Wireframes-Imagenes.md`](Wireframes/Wireframes-Imagenes.md) §3.5 y §5.1 | Agente humano del proyecto | **Nueva en la versión 2.1** |
| B-UX-29 | **La exploración de registro de imágenes deja tres datos sin declarar.** Dónde y cómo se configura el conjunto de registros explorables —si es de la instalación, del proyecto SelfHosted o del servicio— y si el registro público de referencia **viene configurado de fábrica**, de lo que depende que el primer minuto de uso termine en una lista de imágenes o en un estado vacío; si explorar exige un **ámbito de credencial propio**, que es el mismo eje que `Q-18` abre para la limpieza; y si existe **exploración equivalente para el origen por repositorio remoto**, que esta categoría **no asume por analogía** porque `Q-27` decidió sobre el registro de imágenes y no sobre el repositorio. El wireframe declara los tres con lo que cada uno bloquea y con la restricción que cualquier resolución debe cumplir, y **no completa ninguno**. Es la misma ambigüedad que `02-Especificacion-Funcional` declara como `B-27`, vista desde la superficie | [`Wireframes-Exploracion-De-Registro-De-Imagenes.md`](Wireframes/Wireframes-Exploracion-De-Registro-De-Imagenes.md) §5.1 | Agente humano del proyecto | **Nueva en la versión 2.1** |
| B-UX-30 | **Propagación pendiente a cuatro wireframes hermanos que esta ronda no alcanzó.** El despacho de esta ronda acota el trabajo a `SUP-17`, `SUP-18`, `SUP-19`, este marco, el glosario y el índice, y hay cuatro superficies vigentes cuyo contenido queda desactualizado y **no se toca desde acá**: `SUP-06`, panel lateral del servicio, cuyo §3.5 cita `B-UX-26` como abierta cuando ya está cerrada; `SUP-09`, tablero de estado, que pasa a alojar la **ubicación secundaria** de la sugerencia de limpieza especificada en `SUP-18` §3.5; `SUP-12`, configuración del sistema, que pasa a alojar los **descriptores del umbral** de esa misma sugerencia; y `SUP-11`, catálogo de plantillas, cuyo §3.8 cita `B-UX-23` como abierta. Se declara en lugar de aplicarse en silencio, y en lugar de dejarlo sin registro | [`Wireframes-Panel-Lateral-Del-Servicio.md`](Wireframes/Wireframes-Panel-Lateral-Del-Servicio.md) §3.5; [`Wireframes-Tablero-De-Estado.md`](Wireframes/Wireframes-Tablero-De-Estado.md); [`Wireframes-Configuracion-Del-Sistema.md`](Wireframes/Wireframes-Configuracion-Del-Sistema.md); [`Wireframes-Catalogo-De-Plantillas.md`](Wireframes/Wireframes-Catalogo-De-Plantillas.md) §3.8 | `03-UX-UI-DX`, en la ronda que alcance esas cuatro superficies | **Nueva en la versión 2.1** |

#### §10.2.1 La brecha retirada

**`B-UX-15` era falsa y se retira.** Declaraba que los anchos de ventana del comportamiento responsivo no estaban declarados. **El catálogo sí los declara**: `Design-Rules-Web-Generico.md` §8 fija «punto de quiebre principal alrededor de 768px» y «contenido legible sin scroll horizontal a 320px de ancho; reflow conforme WCAG 1.4.10». Los dos valores estaban en el insumo normativo desde el principio, y los dieciséis wireframes ya los aplicaban en su §6: lo que estaba mal era declararlos ausentes.

El origen del error está identificado y es de lectura: `Compatibilidad-Plataformas.md` §4 delega a la maqueta y a la etapa `b` **los anchos de verificación**, que son otra cosa que la norma de diseño. El audit lo elevó como hallazgo `R-7` contra `00-Contexto`.

**Qué queda, y no es brecha de esta categoría.** La norma de diseño está completa y aplicada. Lo único pendiente es la **matriz de verificación**: en qué anchos concretos la etapa `b` comprueba el comportamiento y lo registra en su informe de cierre. Es una obligación de verificación ya asignada por `Compatibilidad-Plataformas.md` §4 y por el intake §15.1, no un dato que a esta categoría le falte, y por eso pasa a declararse como delegación downstream en §9 y no como brecha.

### §10.3 Supuestos de derivación

Se declaran los cuatro puntos en los que esta categoría derivó un dato en lugar de transcribirlo, para que un revisor pueda impugnarlos sin tener que descubrirlos. El cuarto lo incorpora el audit.

**`S-UX-01` · Los pasos posteriores al aprovisionamiento.** `Design-Rules-Primer-Arranque.md` §2 exige declarar `pasosPosteriores`, y §4.6 exige una orientación posterior que sugiera sin bloquear. Ninguna fuente declara qué debería sugerir este producto. Los tres pasos que la orientación posterior propone se **derivan** de las capacidades que el intake declara como primer alcance y de sus casos de uso: crear el primer proyecto SelfHosted (CU-01), incorporar contenedores que ya corren en el servidor (CU-06 y CU-07) y declarar el rango de direcciones gestionado (CU-19). La derivación es sostenible porque el intake declara que el disparador del producto es el parque existente y que la herramienta «tiene que ser adoptable sobre un servidor que ya está en producción», pero es derivación y no dato declarado.

**`S-UX-02` · La ubicación de la superficie de variables compartidas.** El anexo E-10 la nombra en su variante del paso 4 como «En el proyecto → **Variables del proyecto**», lo que la ubica dentro del proyecto SelfHosted y no en la configuración del sistema. Esta categoría toma esa ubicación. No aparece en el mapa de navegación de E-18, que es anterior a la decisión D-5.

**`S-UX-03` · La superficie del informe de conflicto como modal con flujo propio.** El intake §6 flujo 3 y el anexo E-8 declaran el contenido del informe y sus tres resoluciones, pero no declaran su forma. Se especifica como superficie con flujo propio, y no como banda de error del lienzo, porque las tres resoluciones son acciones que modifican estado —detener otro proyecto SelfHosted, reasignar una dirección, arrancar parcialmente— y cada una tiene consecuencia distinta. `Rules-UX-UI-DX.md` §3.2 admite explícitamente el modal con flujo propio como superficie.

**`S-UX-04` · El idioma de la interfaz.** Ninguna fuente lo declara. El indicio es el intake §17.P.11, que al justificar por qué las claves provistas por el sistema van en inglés dice que lo hace «a diferencia del resto del modelo, que **lo lee una persona en la interfaz**», y §12 lo repite en la entrada de glosario correspondiente. De ahí se deriva que la interfaz está en el idioma de esa persona, que es el del producto. **La invariante D1 no sostiene esta decisión**: gobierna el idioma de la documentación generada, no el del producto, y atribuírsela era el hallazgo `H-09` del audit. Las filas de expansión de texto y de dirección de lectura de §6 cuelgan de esta derivación y quedan alcanzadas por ella.

Los cuatro supuestos fueron verificados por el audit independiente de la Fase B, que declara los tres primeros «legítimos, correctamente rotulados como derivación y no como dato», e incorpora el cuarto. Ver [`Audit/B-02-03-r1.md`](../Audit/B-02-03-r1.md) §7.2 y §8.1.

---

## §11. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 2.1 | 2026-07-30 | **Retroalimentación del paso 6 de la Fase B2**, por la ronda de decisiones del agente humano del proyecto del 2026-07-30 consolidada en el `PRODUCT-INTAKE-SelfHosted-Service` **v3.2** —§4 nota de los dos ejes, §19 en sus dos tablas, anexo E-23 actualizado y la fila 3.2 de su control de cambios— y consumida de la [`02-Especificacion-Funcional`](../02-Especificacion-Funcional/Especificacion-Funcional.md) 2.1 recién emitida. Sube **minor**: ninguna persona objetivo, principio de diseño, heurística, ley UX, criterio de accesibilidad, decisión de internacionalización, umbral de performance percibida, entrada del catálogo de códigos, contradicción ni supuesto de derivación cambia de contenido, y ninguna sección se renumera. **Una superficie nueva: `SUP-19`, exploración de registro de imágenes.** §9.2 pasa de **dieciocho a diecinueve** superficies, con su fila, su forma —superficie con flujo propio— y su origen de maquetado; §9.3 suma la fila de `CU-39` y `SUP-19` a la de `CU-03`, con la precisión de que **explorar no es una octava vía de alta** y que por eso `SUP-17` conserva sus cuatro casos de uso. La emite esta categoría porque `02-Especificacion-Funcional` propuso el identificador **sin emitirlo**, para no invadirla: es su brecha `B-25`, que se cierra acá. **Los dos tramos de `SUP-18` que `Q-15` y `Q-17` desbloquean quedan reflejados**: §3.7 declara la **segunda rama del flujo `FL-07`**, la del disco, con la ubicación secundaria de la sugerencia de limpieza en el tablero y la regla de que el tablero **no ofrece confirmar**; §8.1 incorpora la sugerencia a la fila de advertencia que no bloquea. **§3.3 nombra dos superficies que la ruta de `FL-03` no nombraba** —el alta de servicio, que tiene superficie propia desde la versión 1.1, y la exploración— y su paso 3 declara el punto de entrada. **§4.1 pasa de dieciséis a diecinueve filas**: el mapa de estados no incorporaba `SUP-17` ni `SUP-18` desde que la versión 1.1 los creó, y la migración normativa preservó la discrepancia declarándola pendiente del corte; se cierra acá contra el disco, junto con la fila de `SUP-19`. **Tres conteos corregidos en §9.1 por la misma razón**: wireframes asociados de 16 a **19**, casos de uso de 36 a **39** y historias de usuario provisionales de 118 a **146**, las tres cifras tomadas de `02-Especificacion-Funcional` 2.1 y del disco, no estimadas. **§10.2 pasa de veinticinco brechas vigentes sobre veintisiete identificadores a veintiséis sobre treinta**: **cierra `B-UX-23`** —`Q-27` decidida, hay exploración, y es la superficie nueva que la brecha declaraba como una de las dos respuestas legítimas— y **`B-UX-26`** —`Q-15` decidida en positivo, el despliegue registra el digesto—, **acota `B-UX-27`** de cinco tramos a tres retirando la consecuencia de que la maqueta no construya `SUP-18`, y **abre `B-UX-28`, `B-UX-29` y `B-UX-30`**: los valores por defecto del umbral de la sugerencia, los tres datos sin declarar de la exploración, y la propagación pendiente a cuatro wireframes hermanos que este despacho no alcanza. **Las filas cerradas conservan su identificador y su texto tachado**, con el criterio ya aplicado a `B-UX-09` y `B-UX-15`. **Ninguna decisión abierta se cerró acá y ningún valor plausible se completó**: siguen abiertas `Q-16`, `Q-18`, `Q-19`, `Q-20`, `Q-21` y `Q-28`, más diecinueve especificaciones de integración sin confirmar, y los valores numéricos del umbral se declaran como brecha con sus restricciones en lugar de elegirse. **Ningún artefacto fuera de `03-UX-UI-DX` se tocó.** La versión 2.0 queda archivada en [`_legacy/2026-07-30/Experiencia-De-Uso-v2.0.md`](_legacy/2026-07-30/Experiencia-De-Uso-v2.0.md), con su bloque de archivado antepuesto y su cuerpo sin modificar. Ninguna fila anterior de este control de cambios se reescribió (`SDD-Development-Guide.md` §VI.2) |
| 2.0 | 2026-07-30 | Migración normativa del conjunto 4.1 al 6.0, fase M4 corte 4, bajo `Rules-UX-UI-DX` 4.0, `Vocabulario-Rules` 2.1 y `Migracion-Rules` 1.0. Clasificación **regenerar contenido** por el salto major 2.0 → 4.0 de la regla que gobierna la categoría; fuente de contenido: **el documento de origen**, archivado sin modificar en `_legacy/2026-07-30/Experiencia-De-Uso-v1.1.md`, más **un artefacto hermano del propio destino** para un solo punto, declarado abajo. Sube **major** porque la nomenclatura anterior deja de cumplir. **Cabecera:** se suma el campo `Proyecto de código` con el valor `SelfHosted-Service`, que §4.1 de la regla 4.0 exige por ser ésta una categoría de nivel proyecto de código (`Vocabulario-Rules` §4 R3) y que el PRODUCT-INTAKE §13 declara como `Nombre-Proyecto-Codigo`, y la etiqueta `Proyecto` pasa a `Producto` sobre su valor de origen `SelfHosted Service`, que es el `Nombre-Producto`, porque `Vocabulario-Rules` §3 prohíbe la etiqueta de un plano de identidad sobre el valor de otro; los dos conviven porque §4.1 exige el primero y `Migracion-Rules` §4.2 prohíbe perder el segundo, y **no son intercambiables: difieren por el guion**. Se conserva el campo `Variante`. **Sustitución léxica por ocurrencia** según `Vocabulario-Rules` §9.5 y el plan de migración §3.5, y nunca por reemplazo global de cadena. **«Solución»:** dieciocho ocurrencias revisadas; **diecisiete designaban el nivel superior y pasan a «producto» con su concordancia de género** —«el administrador único de la solución» a «del producto», «Administrador de la solución» a «Administrador del producto», que es además la forma que [`Glosario-Funcional`](../02-Especificacion-Funcional/Glosario-Funcional.md) declara, «un segundo consumidor de la solución» a «del producto», «en esta solución» a «en este producto» en §2.1, §2.4, §2.5, §4.3 dos veces, §4.4, §10.1 dos veces y §10.3, «igual en toda la solución» a «en todo el producto», «los contenedores que la solución gobierna» a «que el producto gobierna» y «Administrador único de la solución» a «del producto»—; **una se preserva**, la de la fila `B-UX-01` de §10.2 —«la restricción que cualquier solución debe cumplir»—, porque su referente es el remedio de un problema y no el nivel superior del framework, uso que `Vocabulario-Rules` §4 R2 conserva expresamente. **Las doce ocurrencias de la cadena `resoluci` quedaron intactas** —«tres resoluciones concretas» y «tres resoluciones accionables» del informe de conflicto, «el estado de resolución» del predicado, «la resolución elegida», «resolución de nombres», «la resolución es derivada» y las demás—, verificadas por el barrido negativo que el plan §3.5 paso 4 exige: la cadena `soluci` vive dentro de ellas y sustituirla produce la palabra inexistente que la intervención del framework 5.0 dejó treinta veces. **«Proyecto»:** ciento quince ocurrencias clasificadas una por una. **Setenta y nueve designan la entidad del dominio** —el agrupador de servicios contenedorizados que el usuario crea desde el portal, con su red y su lienzo— y **se preservan tal cual**: treinta y siete con la forma calificada «proyecto SelfHosted», una en el ancla de la tabla de contenido de esa misma forma, veintinueve en la forma corta que el PRODUCT-INTAKE §12 admite donde el contexto ya la fijó —«Lienzo del proyecto», «Listado de proyectos», «Nuevo proyecto», «detener el proyecto en conflicto», «la arquitectura *es* el proyecto», «Variables compartidas del proyecto», «el proyecto que lo tomó»—, catorce en los nombres de archivo de artefactos del dominio, que no se renombran, tres en la ruta `/proyectos` y dos en los ámbitos de credencial `proyectos:leer` y `proyectos:escribir`. **Veintidós son el emprendimiento** —«agente humano del proyecto»— y **quedan sin calificar**, por `Vocabulario-Rules` §4 R1 y por la declaración del PRODUCT-INTAKE §12 de que en contexto de proceso ésa es la forma correcta y calificarla produciría una afirmación falsa. **Una queda sin resolver por ambigüedad de referente y se preserva a secas**: «los esqueletos en arte ASCII de las extensiones son referencia de composición y no wireframes del proyecto», en §2.1, donde el referente admite las dos lecturas y el plan §3.5 paso 3 ordena no sustituir ante duda. **Cinco se promovieron a «proyecto de código»**, y las cinco designan la unidad D8 que recibe las categorías 02 a 11 y no un `.csproj` por serlo: «Piso obligatorio de todo proyecto con interfaz web» en §2.1, porque es la condición de aplicación de `Design-Rules-Web-Generico.md` y `Rules-UX-UI-DX` 4.0 §1.4 la escribe completa; «declararlo por proyecto» en `C-UX-01` y «definirlo por proyecto» en `B-UX-05`, porque el anti-patrón de §4.4 de la regla 4.0 dice ahora «ad hoc por proyecto de código»; y «en todo proyecto que cargue la extensión» y «condiciona la ranura a que el proyecto tenga superficies de configuración» en `C-UX-03`, porque §1.4 condiciona la carga de la extensión al proyecto de código. **Identificadores del manifiesto:** cero ocurrencias de `Nombre-Solucion`, `NombreSolucionCodigo`, `Nombre-Proyecto`, `nombre-proyecto-codigo` o `project_type`, verificado por barrido; no hubo renombre de identificador que aplicar. **Glosario:** desde la 4.0 `Glosario-UX.md` deja de ser recomendado y pasa a **obligatorio para los ocho tipos D8**, y §6 verifica su existencia y su completitud además de la no duplicación, que ahora se mide contra `Glosario-Funcional.md` de 02, artefacto nuevo del corte 3. La fila de correspondencia con el mundo real de §2.2 pasa a citar los **dos** glosarios upstream —el raíz de [`Vision-Producto`](../00-Contexto/Vision-Producto.md) §9 y el funcional de 02— y la obligación de referenciarlos en lugar de redefinirlos; es el único punto de este documento cuya fuente es un **artefacto hermano del destino** y no el documento de origen. Los términos que esta categoría acuña se devolvieron al lote que emite `Glosario-UX.md` y acá no se redefinen. **Nombres canónicos de superficie conservados textualmente:** los dieciocho `SUP-01` a `SUP-18` de §9.2 y §9.3 no cambiaron un carácter, porque `Deriva-Rules.md` exige que coincidan término por término con la línea de base visual y un nombre alterado vuelve inservible el sensado. **Nada más cambió de contenido**: ninguna persona objetivo, principio de diseño, heurística, ley UX, flujo, estado, criterio de accesibilidad, decisión de internacionalización, umbral de performance percibida, categoría de error, entrada del catálogo de códigos, referencia de trazabilidad, contradicción, brecha ni supuesto de derivación se agregó, se quitó ni se reformuló, y las tres filas anteriores de este control de cambios **no se reescribieron**. **Inconsistencia interna del documento de origen, detectada y no propagada:** §9.1 declara «Los 16 de `Wireframes/`» y su párrafo de encabezado habla de «los dieciséis wireframes», mientras §9.2 declara dieciocho superficies y el disco tiene dieciocho archivos; la discrepancia la dejó la versión 1.1 al sumar `SUP-17` y `SUP-18` y **se preserva sin tocar**, porque corregirla es una decisión de contenido y `Migracion-Rules` §4.2 regla 3 obliga a declarar la interpretación y esperar confirmación. Queda declarada como pendiente del corte. El bloque de procedencia del destino sigue declarando la 4.1 y no se toca: es trabajo de M5. Origen: [`Plan-Migracion-4.1-a-6.0.md`](../Audit/Plan-Migracion-4.1-a-6.0.md) §3.5 y §4 |
| 1.1 | 2026-07-29 | **Se incorporan dos superficies y se declaran cinco brechas nuevas.** §9.2 pasa de dieciséis a **dieciocho** superficies: **`SUP-17`, alta de servicio**, que corrige una omisión de la versión 1.0 —el alta no tenía wireframe y vivía repartida entre `SUP-05` y `SUP-06`, que es el reparto del que salió el defecto que la Fase B2 destapó—, y **`SUP-18`, imágenes**, que no existía porque su dominio no existía en el intake. Se declara además que **el número `SUP-17` que el documento de trabajo usa no existía en ninguna parte**: la categoría declaraba dieciséis superficies y la maqueta documenta su archivo de alta como un estado de `SUP-06`; el número coincide por ser el siguiente libre. §9.3 suma las dos filas nuevas, actualiza cinco filas de casos de uso a `SUP-17` y declara en qué superficie hace qué CU-38. §10.2 suma **`B-UX-23` a `B-UX-27`**: el primer minuto de uso sin camino (`Q-27`), la señal visual del nodo borrador, el origen no editable (`Q-28`), el digesto que nadie registra (`Q-15`) y los cinco tramos de `SUP-18` que dependen de `Q-15` a `Q-21`. Cuatro de las cinco son decisiones que esta categoría **no toma**. Se emiten en paralelo las versiones 1.1 de los wireframes del catálogo, del lienzo, del panel lateral, del cajón de cambios y del descubrimiento, y las 1.0 de los dos nuevos. **La maqueta no se rehace acá**: se rehace desde esta especificación corregida. La versión 1.0 queda archivada en `_legacy/2026-07-29/`. Origen: §22.5 del documento de trabajo `SDD/Estado/Redefinicion-Servicio.md` v2.0 |
| 1.0 | 2026-07-29 | Versión inicial del marco de experiencia, generada bajo el conjunto normativo 4.1 del Framework SDD con la variante UX/UI de `Rules-UX-UI-DX.md` 2.0. Declara la persona objetivo única y su contexto de operación; el catálogo de diseño aplicado con sus seis documentos y el orden de apilado; las cuatro capacidades transversales con su contrato; la frontera entre configuración de aplicación y de entorno; ocho flujos clave, cuatro transcriptos del intake §6 y cuatro derivados de las necesidades de negocio; el mapa de estados de dieciséis superficies; la correspondencia entre el lenguaje visual de estados del anexo E-18 y los estados semánticos del catálogo base; el compromiso WCAG 2.2 AA con la excepción de reflujo del lienzo declarada; los umbrales de performance percibida transcriptos de la puerta técnica PT-01; el catálogo de códigos de resultado de las superficies de identidad; y la trazabilidad bidireccional entre las dieciséis superficies y los 36 casos de uso. Declara cuatro contradicciones entre el catálogo de diseño y el anexo E-18, veinte brechas abiertas con su destinatario —incluidas las tres pendencias que `02-Especificacion-Funcional` transfirió como B-07— y tres supuestos de derivación |
| 1.0 | 2026-07-29 | Corrección del audit de la Fase B, absorbida dentro de la versión de emisión, sin subir versión y sin archivar, por la política de versionado de `Master-Prompt.md` §5: el documento está en estado `Propuesto` y la corrección proviene del audit de su propia fase. **H-05, P1:** la fila de prevención de errores de §2.2 citaba el caso `T-27` del anexo E-22 como verificación de la confirmación escrita, y ese caso es sobre redespliegue con montaje de base de datos y está asignado a otras dos invariantes. Recorrida la columna de regla de E-22, RN-10 no tiene caso propio: la celda pasa a declarar la ausencia de cobertura y se emite la brecha `B-UX-22` con destinatario en `08-Calidad-Y-Pruebas`. **H-06, P1:** la correspondencia entre superficie y caso de uso se declaraba en cuatro tablas que se contradecían en cinco superficies. Se corrige de raíz: §9.2 se declara **fuente única** con su regla de gobierno, §9.3 pasa a ser su inversión mecánica declarada como derivada, el `README.md` deja de repetirla y remite, y el §8 de los dieciséis wireframes suma la fila que declara de dónde sale su celda. Las cinco discrepancias se resuelven por contenido: SUP-05 pierde CU-36 —el lienzo navega a la revisión de higiene y no la materializa—, SUP-11 y SUP-13 lo recuperan por las detecciones que sí exhiben, SUP-14 conserva los cuatro casos de uso que la ejercitan incluidos los dos que la disparan, y SUP-06 conserva CU-18. **Brecha `B-UX-15` retirada por falsa:** `Design-Rules-Web-Generico.md` §8 sí declara el punto de quiebre y el piso de reflujo; lo que `Compatibilidad-Plataformas.md` §4 delega son los anchos de verificación. Nueva §10.2.1 con la evidencia, y fila propia en §9.1 que declara la delegación en lugar de la ausencia. **H-09, P2:** el idioma de la interfaz dejaba de atribuirse a la invariante D1, que gobierna la documentación generada y no el producto, y pasa a declararse como supuesto `S-UX-04` con el intake §17.P.11 como indicio. **H-10, P2:** se retira la regla de separador decimal, que ninguna fuente declara y que el anexo E-18 contradice, y se emite la brecha `B-UX-21`. **H-13, P3:** el rango de transición de 150 a 250 ms se cita a §8 del catálogo base y no a §5, con la discrepancia interna del catálogo declarada. **H-15, P3:** la columna de §1.1 pasa de «Valor declarado» a «Valor» y la celda de nivel técnico se rotula como derivada. **H-16, P3:** la divergencia sobre el punto de acceso al cierre de sesión se eleva como contradicción `C-UX-05`, para que reciba el mismo tratamiento que las otras cuatro. **H-17, P3:** §9.1 declara explícitamente que las siete filas de capacidad y de Fase B2 se declaran una sola vez para toda la categoría y no se replican por wireframe. Se incorpora además el resultado de la evaluación de brechas del audit: cinco enunciados sobredimensionados acotados a la evidencia, `B-UX-09` cerrada y `C-UX-03` y `C-UX-04` actualizadas con la confirmación del auditor. Origen: informe [`Audit/B-02-03-r1.md`](../Audit/B-02-03-r1.md) |
