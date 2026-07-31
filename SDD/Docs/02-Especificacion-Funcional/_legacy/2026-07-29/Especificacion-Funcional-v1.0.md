> **Bloque de archivado.** Estado: `Superado`. Copia completa y autocontenida de la versión 1.0 de `Especificacion-Funcional.md`, tomada el 2026-07-29 antes de incorporar a la especificación las definiciones de alta y configuración de servicios y de ítems del catálogo que `SDD/Estado/Redefinicion-Servicio.md` v2.0 establece en su parte normativa (§16 a §23). La versión vigente es `../../Especificacion-Funcional.md`. El cuerpo de este snapshot no se modifica.

# Especificación Funcional — SelfHosted Service

| Campo | Valor |
| --- | --- |
| Proyecto | SelfHosted Service |
| Documento | Especificacion-Funcional.md |
| Versión | 1.0 |
| Estado | Propuesto |
| Fecha | 2026-07-29 |
| Autor | Analista Funcional Senior (AG-02) |
| Tipo de proyecto (D8) | web-monolith |
| Cantidad de CU | 36 |
| Cantidad de RN | 37 |
| Cantidad de RC | 18 |
| Trazabilidad upstream | 01-Necesidades-Negocio (NB-01 a NB-08 con sus 36 CU previstas); 00-Contexto (Vision-Producto.md, Alcance-Proyecto.md, Compatibilidad-Plataformas.md); SOLUTION-INTAKE-SelfHosted-Service Parte A §1 a §12, Parte C §17.P.2 a §17.P.5, §17.P.10, §17.P.11, Parte D anexos E-1 a E-22, Parte E §24 |
| Trazabilidad downstream | 03-UX-UI-DX, 05-Arquitectura-Tecnica, 06-Backlog-Tecnico, 07-Plan-Sprint, 08-Calidad-Y-Pruebas |

---

## Tabla de contenido

- [§1. Qué contiene esta categoría](#1-qué-contiene-esta-categoría)
- [§2. Especialidad asignada y su verificación](#2-especialidad-asignada-y-su-verificación)
- [§3. Catálogo de casos de uso](#3-catálogo-de-casos-de-uso)
- [§4. Catálogo de reglas de negocio](#4-catálogo-de-reglas-de-negocio)
- [§5. Modelo conceptual y reglas conceptuales](#5-modelo-conceptual-y-reglas-conceptuales)
- [§6. Matriz de trazabilidad NB → CU → RN → US](#6-matriz-de-trazabilidad-nb--cu--rn--us)
- [§7. Cobertura y verificación bidireccional](#7-cobertura-y-verificación-bidireccional)
- [§8. Convenciones que esta categoría aplica](#8-convenciones-que-esta-categoría-aplica)
- [§9. Brechas abiertas de esta categoría](#9-brechas-abiertas-de-esta-categoría)
- [§10. Ambigüedades detectadas](#10-ambigüedades-detectadas)
- [Control de cambios](#control-de-cambios)

---

## §1. Qué contiene esta categoría

Treinta y seis casos de uso, treinta y siete reglas de negocio, un modelo conceptual y dieciocho reglas conceptuales del modelo, para el producto **SelfHosted Service**.

La salida va directo bajo `SDD/Docs/02-Especificacion-Funcional/`, sin subnivel de proyectos: la solución tiene un único proyecto de código, `SelfHosted.Service.Core`, con cuatro capas internas. La categoría 02 se genera plana, una sola vez, y no repartida por capa: qué capa implementa un caso de uso no depende de cuántas unidades de compilación haya. La asignación de capa que cada NB declara dentro de la celda de su CU se conserva y se refleja en la dimensión de componentes esperados de cada caso de uso.

Los treinta y seis casos de uso son exactamente los que las ocho necesidades de negocio declaran previstos en su §7. No se inventó numeración nueva, no se reasignó ninguna y no sobra ni falta ninguna. Las treinta y siete reglas de negocio son exactamente las del anexo E-16 del intake, transcriptas con su momento de validación y su respuesta ante incumplimiento.

**Lo que esta categoría no hace.** No origina decisiones de producto. Formaliza y traza.

Todo dato de un caso de uso que afirme algo sobre el sistema —precondición, paso del flujo, postcondición, criterio de aceptación, regla aplicada, código de error— traza a una sección del intake, a un anexo de la Parte D o a un documento de 00 o de 01, y la traza está declarada en la cabecera de cada archivo. Donde una fuente no declara el dato, el archivo lo declara como brecha con su destinatario en lugar de completarlo con el valor razonable; las brechas están consolidadas en §9.

**Hay una excepción, y es de nomenclatura y no de dato.** Los **nombres de los actores no humanos** de §2 de cada caso de uso son en su mayoría **denominaciones acuñadas por esta categoría**: etiquetas funcionales que nombran a quién le toca la responsabilidad dentro del flujo, no componentes que alguna fuente declare. Los 36 casos de uso usan **diecinueve** nombres de actor no humano distintos: **seis trazan** a una fuente y **trece están acuñados acá**. Tres de los trece figuran además como actor primario de su caso de uso —en CU-08, CU-20 y CU-25—, de modo que la salvedad no se limita a los actores de tipo sistema. La convención completa, con el detalle nombre por nombre y la advertencia para 05, está en §8.

Se declara acá y no sólo en §8 porque la afirmación del párrafo anterior sería falsa sin la salvedad, y una afirmación absoluta que trece nombres no cumplen es peor que la ausencia de la afirmación.

## §2. Especialidad asignada y su verificación

La tabla §1.2 de `Rules-Especificacion-Funcional.md` asigna al tipo `web-monolith` la fila que se transcribe literal:

| Tipo | Especialidad específica | Justificación |
| --- | --- | --- |
| web-monolith | Analista Funcional senior | Flujos UI/UX-driven, con CU que cruzan presentación, dominio y persistencia. |

Se asume además la especialidad base de §1.1: Analista Funcional senior, equivalente AG-02, con elicitación, formalización y modelado de requisitos, casos de uso al estilo Cockburn y criterios de aceptación en formato Given/When/Then.

**Verificación de §1.3, multi-especialidad.** La regla admite combinar con otras cuatro especialidades cuando el dominio lo requiere. Se verifica una por una:

| Combinación admitida por §1.3 | ¿Se cumple la condición? | Consecuencia |
| --- | --- | --- |
| AG-05 Arquitecto, en proyectos con DDD o bounded contexts múltiples | **No.** La solución tiene un único proyecto de código con cuatro capas y ningún bounded context múltiple declarado. El intake declara organización por módulos dentro de una sola capa de aplicación | No se aplica. El modelo conceptual se emite igual y su modelo lógico se delega a 05 |
| AG-04 Ingeniero de Prompts, cuando un CU delega parte del flujo en un modelo de lenguaje | **No.** El indicador `usa_llm` es falso y ningún caso de uso delega flujo en un modelo de lenguaje | No se aplica |
| AG-03 DX/UX, cuando el CU describe interacción humana significativa | **Sí, parcialmente.** La mayoría de los casos de uso describen interacción del administrador con el panel | Se aplica como delegación, no como coautoría: cada caso de uso mantiene el qué y remite el detalle de experiencia a 03-UX-UI-DX, que es lo que §4.5 exige para no invadir esa categoría |
| AG-08 QA, para revisar que cada criterio sea automatizable | **Sí, parcialmente.** Los criterios se escribieron con valores concretos y anclados a los casos del anexo E-22 cuando existen | Se aplica como delegación: 08-Calidad-Y-Pruebas es la titular de la verificación |

El AG-02 mantiene la titularidad de los artefactos. Las dos combinaciones que se cumplen lo hacen como delegación acotada y no como coautoría, que es lo que §1.3 admite.

## §3. Catálogo de casos de uso

Treinta y seis casos de uso, uno por archivo, en [Casos-De-Uso/](Casos-De-Uso/). El mínimo que §2.2 fija para `web-monolith` es de ocho; la cota superior la define la cobertura completa de las necesidades de negocio, que son treinta y seis.

| CU | Nombre | NB upstream | Estado |
| --- | --- | --- | --- |
| [CU-01](Casos-De-Uso/CU-01-Alta-De-Proyecto.md) | Alta de proyecto SelfHosted con su modo de red y su persistencia | NB-01 | Propuesto |
| [CU-02](Casos-De-Uso/CU-02-Listado-Renombrado-Y-Eliminacion-De-Proyectos.md) | Listado, renombrado y eliminación de proyectos SelfHosted | NB-01 | Propuesto |
| [CU-03](Casos-De-Uso/CU-03-Alta-Y-Configuracion-De-Servicio.md) | Alta y configuración completa de un servicio | NB-01 | Propuesto |
| [CU-04](Casos-De-Uso/CU-04-Composicion-Del-Lienzo.md) | Composición del lienzo: nodos, aristas y dependencias | NB-01 | Propuesto |
| [CU-05](Casos-De-Uso/CU-05-Persistencia-Y-Recuperacion-De-La-Disposicion.md) | Persistencia y recuperación de la disposición del lienzo | NB-01 | Propuesto |
| [CU-06](Casos-De-Uso/CU-06-Descubrimiento-De-Contenedores-Adoptables.md) | Descubrimiento de contenedores, con motivo de no incorporabilidad | NB-02 | Propuesto |
| [CU-07](Casos-De-Uso/CU-07-Incorporacion-Con-Confirmacion-Explicita.md) | Incorporación de un contenedor existente con confirmación explícita | NB-02 | Propuesto |
| [CU-08](Casos-De-Uso/CU-08-Traduccion-De-La-Configuracion-Observada.md) | Traducción de la configuración observada al modelo de servicio | NB-02 | Propuesto |
| [CU-09](Casos-De-Uso/CU-09-Exportacion-En-Formato-De-Composicion.md) | Exportación en formato estándar de composición | NB-03 | Propuesto |
| [CU-10](Casos-De-Uso/CU-10-Exportacion-Del-Manifiesto-Propio.md) | Exportación del manifiesto propio, que preserva la disposición | NB-03 | Propuesto |
| [CU-11](Casos-De-Uso/CU-11-Importacion-Como-Proyecto-Nuevo.md) | Importación como proyecto SelfHosted nuevo | NB-03 | Propuesto |
| [CU-12](Casos-De-Uso/CU-12-Exportacion-Programada-A-Destino-Externo.md) | Ejecución programada de la exportación hacia un destino externo | NB-03 | Propuesto |
| [CU-13](Casos-De-Uso/CU-13-Despliegue-Desde-Imagen-De-Registro.md) | Despliegue de un servicio desde imagen de registro | NB-04 | Propuesto |
| [CU-14](Casos-De-Uso/CU-14-Consulta-Del-Registro-Del-Contenedor.md) | Consulta del registro del contenedor | NB-04 | Propuesto |
| [CU-15](Casos-De-Uso/CU-15-Despliegue-Construyendo-La-Imagen.md) | Despliegue construyendo la imagen | NB-04 | Propuesto |
| [CU-16](Casos-De-Uso/CU-16-Alta-Desde-Plantilla-Del-Catalogo.md) | Alta desde plantilla del catálogo, con creación del conjunto completo | NB-04 | Propuesto |
| [CU-17](Casos-De-Uso/CU-17-Mantenimiento-Del-Catalogo.md) | Mantenimiento del catálogo de plantillas | NB-04 | Propuesto |
| [CU-18](Casos-De-Uso/CU-18-Arranque-Y-Parada-Con-Autoarranque.md) | Arranque y parada, con autoarranque | NB-05 | Propuesto |
| [CU-19](Casos-De-Uso/CU-19-Rango-Gestionado-Y-Reserva-De-Direccion.md) | Rango gestionado y reserva de dirección por servicio | NB-05 | Propuesto |
| [CU-20](Casos-De-Uso/CU-20-Validacion-De-Conflicto-De-Direcciones.md) | Validación de conflicto contra los servicios activos, sin acceso al motor | NB-05 | Propuesto |
| [CU-21](Casos-De-Uso/CU-21-Informe-De-Conflicto-Y-Resolucion.md) | Informe de conflicto y aplicación de la resolución elegida | NB-05 | Propuesto |
| [CU-22](Casos-De-Uso/CU-22-Acumulacion-De-Cambios-Pendientes.md) | Acumulación de cambios pendientes, con distinción de los visuales | NB-06 | Propuesto |
| [CU-23](Casos-De-Uso/CU-23-Descarte-De-Un-Cambio-Individual.md) | Descarte de un cambio individual del conjunto pendiente | NB-06 | Propuesto |
| [CU-24](Casos-De-Uso/CU-24-Aplicacion-En-Lote.md) | Aplicación en lote del conjunto de cambios pendientes | NB-06 | Propuesto |
| [CU-25](Casos-De-Uso/CU-25-Calculo-Del-Informe-De-Impacto.md) | Cálculo del informe de impacto | NB-06 | Propuesto |
| [CU-26](Casos-De-Uso/CU-26-Lectura-Del-Estado-Del-Servidor.md) | Lectura del estado del servidor | NB-07 | Propuesto |
| [CU-27](Casos-De-Uso/CU-27-Vista-Por-Proyecto-Y-Por-Contenedor.md) | Vista por proyecto SelfHosted y por contenedor | NB-07 | Propuesto |
| [CU-28](Casos-De-Uso/CU-28-Reconciliacion-Con-El-Motor-De-Contenedores.md) | Reconciliación con el motor de contenedores y señalización del servicio huérfano | NB-07 | Propuesto |
| [CU-29](Casos-De-Uso/CU-29-Alta-Del-Administrador-En-El-Primer-Arranque.md) | Alta del administrador en el primer arranque | NB-08 | Propuesto |
| [CU-30](Casos-De-Uso/CU-30-Inicio-Y-Cierre-De-Sesion.md) | Inicio y cierre de sesión | NB-08 | Propuesto |
| [CU-31](Casos-De-Uso/CU-31-Cambio-De-Contrasena.md) | Cambio de contraseña | NB-08 | Propuesto |
| [CU-32](Casos-De-Uso/CU-32-Emision-Y-Revocacion-De-Credenciales-De-Maquina.md) | Emisión, listado y revocación de credenciales de máquina | NB-08 | Propuesto |
| [CU-33](Casos-De-Uso/CU-33-Disparo-De-Despliegue-Con-Credencial-De-Ambito-Minimo.md) | Disparo de despliegue con credencial de ámbito mínimo | NB-08 | Propuesto |
| [CU-34](Casos-De-Uso/CU-34-Variables-Compartidas-Del-Proyecto.md) | Variables compartidas del proyecto SelfHosted | NB-04 | Propuesto |
| [CU-35](Casos-De-Uso/CU-35-Valor-Expresado-Como-Referencia.md) | Valor expresado como referencia a otra variable | NB-04 | Propuesto |
| [CU-36](Casos-De-Uso/CU-36-Revision-De-Higiene-Del-Registro.md) | Revisión de higiene del registro | NB-01 | Propuesto |

**Sobre la numeración.** Los identificadores CU-01 a CU-36 son los que las necesidades de negocio emitieron y no se renumeran. CU-34, CU-35 y CU-36 se agregaron al final de la numeración durante la Fase A previa, sin renumerar los anteriores, para no invalidar ninguna referencia ya emitida: la numeración es contigua y el orden de los tres últimos responde a esa causa declarada.

## §4. Catálogo de reglas de negocio

Treinta y siete reglas, una por archivo, en [Reglas-De-Negocio/](Reglas-De-Negocio/). Son obligatorias para `web-monolith` según §2.2 de las reglas de la categoría. Cada una transcribe el enunciado, el momento de validación y la respuesta ante incumplimiento que declara el anexo E-16 del intake, y declara la autoría que esa misma fuente le asigna.

| RN | Nombre | Autoría declarada | CU afectados |
| --- | --- | --- | --- |
| [RN-01](Reglas-De-Negocio/RN-01-Unicidad-Y-Formato-Del-Nombre-De-Servicio.md) | Unicidad y formato del nombre de servicio | Fundamento **[D]**, decisión D-12 | CU-03, CU-07, CU-08, CU-11, CU-16 |
| [RN-02](Reglas-De-Negocio/RN-02-Pertenencia-Del-Servicio-A-Un-Unico-Proyecto.md) | Pertenencia del servicio a un único proyecto SelfHosted | **[E]** de la fuente base | CU-03, CU-07, CU-11, CU-16 |
| [RN-03](Reglas-De-Negocio/RN-03-Exclusividad-De-Direccion-Entre-Servicios-Activos.md) | Exclusividad de dirección entre servicios activos de proyectos distintos | **[E]** de la fuente base | CU-18, CU-19, CU-20, CU-21, CU-24 |
| [RN-04](Reglas-De-Negocio/RN-04-Canal-Alcanzable-En-La-Arista-Que-Referencia-El-Host.md) | Canal alcanzable en la arista que referencia el host | Ampliación **[D-i]**, sin revisar | CU-04, CU-18, CU-24 |
| [RN-05](Reglas-De-Negocio/RN-05-Aciclicidad-Del-Grafo-De-Arranque.md) | Aciclicidad del grafo de arranque | Ampliación **[D-i]**, sin revisar | CU-04, CU-11, CU-18 |
| [RN-06](Reglas-De-Negocio/RN-06-Pertenencia-De-La-Direccion-Al-Rango-Gestionado.md) | Pertenencia de la dirección al rango gestionado | **[E]** de la fuente base | CU-03, CU-19, CU-20, CU-21 |
| [RN-07](Reglas-De-Negocio/RN-07-Prohibicion-De-Publicar-Puertos-En-Macvlan.md) | Prohibición de publicar puertos en macvlan | **[E]** de la fuente base | CU-03, CU-08, CU-11 |
| [RN-08](Reglas-De-Negocio/RN-08-Datos-Obligatorios-Del-Origen-Repositorio.md) | Datos obligatorios del origen repositorio | **[E]** de la fuente base | CU-03, CU-15 |
| [RN-09](Reglas-De-Negocio/RN-09-Conservacion-De-Volumenes-Al-Detener.md) | Conservación de volúmenes y montajes al detener | **[E]** de la fuente base | CU-18, CU-24 |
| [RN-10](Reglas-De-Negocio/RN-10-Confirmacion-Escrita-Al-Eliminar-Un-Servicio.md) | Confirmación escrita al eliminar un servicio | **[E]** de la fuente base | CU-02, CU-03 |
| [RN-11](Reglas-De-Negocio/RN-11-Adopcion-Unica-De-Un-Contenedor.md) | Adopción única de un contenedor | **[E]** de la fuente base | CU-06, CU-07 |
| [RN-12](Reglas-De-Negocio/RN-12-Exclusion-De-Los-Cambios-Visuales-Del-Changeset.md) | Exclusión de los cambios visuales del conjunto de cambios pendientes | **[E]** de la fuente base | CU-04, CU-05, CU-22, CU-23, CU-25 |
| [RN-13](Reglas-De-Negocio/RN-13-Redespliegue-Acotado-A-Lo-Afectado.md) | Redespliegue acotado a los servicios afectados | **[E]** de la fuente base | CU-13, CU-21, CU-22, CU-23, CU-24, CU-25, CU-33 |
| [RN-14](Reglas-De-Negocio/RN-14-Orden-Topologico-Del-Grafo-De-Arranque.md) | Orden topológico del grafo de arranque | Ampliación **[D-i]**, sin revisar | CU-04, CU-18 |
| [RN-15](Reglas-De-Negocio/RN-15-Prohibicion-De-Devolver-Secretos-En-Claro.md) | Prohibición de devolver secretos en claro | **[E]** de la fuente base | CU-06, CU-07, CU-08, CU-09, CU-10, CU-12, CU-14, CU-17, CU-32, CU-34, CU-35 |
| [RN-16](Reglas-De-Negocio/RN-16-Exhibicion-Unica-Y-Persistencia-Del-Resumen-Del-Token.md) | Exhibición única del token y persistencia de su resumen | **[E]** de la fuente base | CU-32, CU-33 |
| [RN-17](Reglas-De-Negocio/RN-17-Registro-De-Auditoria-De-Toda-Escritura.md) | Registro de auditoría de toda operación de escritura | **[E]** de la fuente base | CU-01, CU-02, CU-03, CU-04, CU-05, CU-07, CU-11, CU-12, CU-13, CU-15, CU-16, CU-17, CU-18, CU-19, CU-21, CU-22, CU-23, CU-24, CU-29, CU-30, CU-31, CU-32, CU-33, CU-34, CU-35 |
| [RN-18](Reglas-De-Negocio/RN-18-Escalado-Horizontal-Con-Direccion-Por-Replica.md) | Escalado horizontal con dirección por réplica | **[E]** de la fuente base | CU-19 |
| [RN-19](Reglas-De-Negocio/RN-19-Limite-Del-Escalado-Vertical-A-Los-Recursos-Del-Host.md) | Límite del escalado vertical a los recursos declarados del host | **[E]** de la fuente base | CU-03 |
| [RN-20](Reglas-De-Negocio/RN-20-Arranque-Parcial-Como-Estado-Declarado.md) | Arranque parcial como estado declarado | **[E]** de la fuente base | CU-18, CU-20, CU-21, CU-24, CU-27, CU-28 |
| [RN-21](Reglas-De-Negocio/RN-21-Validez-Del-Ambito-De-Una-Referencia.md) | Validez del ámbito de una referencia de variable | Enunciado **[D]**, decisión D-6 | CU-04, CU-11, CU-13, CU-15, CU-16, CU-24, CU-33, CU-34, CU-35 |
| [RN-22](Reglas-De-Negocio/RN-22-Prohibicion-Del-Ciclo-De-Valor.md) | Prohibición del ciclo de valor entre referencias | **[D-i]** completa, sin revisar | CU-16, CU-24, CU-34, CU-35 |
| [RN-23](Reglas-De-Negocio/RN-23-Propagacion-Del-Caracter-De-Secreto.md) | Propagación del carácter de secreto por la referencia | **[D-i]** completa, sin revisar | CU-09, CU-10, CU-13, CU-34, CU-35 |
| [RN-24](Reglas-De-Negocio/RN-24-Resolucion-De-La-Referencia-Antes-De-Crear-El-Contenedor.md) | Resolución de la referencia inmediatamente antes de crear el contenedor | **[D]** completa, decisión D-6 | CU-13, CU-15, CU-16, CU-18, CU-24, CU-33, CU-35 |
| [RN-25](Reglas-De-Negocio/RN-25-Ausencia-De-Expresiones-En-La-Exportacion.md) | Ausencia de expresiones sin resolver en la exportación | **[D-i]** completa, sin revisar | CU-09, CU-10, CU-12, CU-35 |
| [RN-26](Reglas-De-Negocio/RN-26-Ausencia-De-Referencias-Derivadas-De-La-Importacion.md) | Ausencia de referencias derivadas de la interpolación importada | **[D-i]** completa, sin revisar | CU-08, CU-11 |
| [RN-27](Reglas-De-Negocio/RN-27-Proteccion-De-La-Variable-Referenciada-Ante-La-Eliminacion.md) | Protección de la variable referenciada ante la eliminación | **[D-i]** completa, sin revisar | CU-03, CU-22, CU-25, CU-34, CU-35 |
| [RN-28](Reglas-De-Negocio/RN-28-Unicidad-De-La-Clave-Segun-El-Ambito-De-La-Variable.md) | Unicidad de la clave según el ámbito de la variable | Reformulada **[D]**, decisión D-12 | CU-03, CU-34, CU-35, CU-36 |
| [RN-29](Reglas-De-Negocio/RN-29-Clasificacion-Obligatoria-De-Variables-En-La-Adopcion.md) | Clasificación obligatoria de variables en la incorporación | Enunciado **[D]**, decisión D-2 | CU-06, CU-07, CU-08 |
| [RN-30](Reglas-De-Negocio/RN-30-Instanciacion-Como-N-Servicios-Y-N-Contenedores.md) | Instanciación como N servicios y N contenedores | **[D]** completa, decisión D-7 | CU-16, CU-17 |
| [RN-31](Reglas-De-Negocio/RN-31-Resultado-Del-Despliegue-Por-Contenedor.md) | Resultado del despliegue determinado por contenedor | **[D]** completa, decisión D-1 | CU-13, CU-15, CU-18, CU-24, CU-27, CU-28, CU-33 |
| [RN-32](Reglas-De-Negocio/RN-32-Variables-Provistas-Por-El-Sistema-Y-Prefijo-Reservado.md) | Variables provistas por el sistema y prefijo reservado | Enunciado **[D]**, decisiones D-6 y D-9 | CU-03, CU-04, CU-35 |
| [RN-33](Reglas-De-Negocio/RN-33-Invariancia-De-Las-Referencias-Ante-El-Renombrado.md) | Invariancia de las referencias ante el renombrado | Enunciado **[D]**, decisión D-8 ampliada por D-12 | CU-02, CU-03, CU-04, CU-22, CU-25, CU-34, CU-35 |
| [RN-34](Reglas-De-Negocio/RN-34-Aporte-Obligatorio-De-La-Arista.md) | Aporte obligatorio de la arista | **[D-i]** completa, sin revisar | CU-04, CU-08, CU-11, CU-16, CU-35 |
| [RN-35](Reglas-De-Negocio/RN-35-Vinculo-Por-Identidad-Y-Nunca-Por-Nombre.md) | Vínculo por identidad y nunca por nombre | **[D]** completa, decisión D-12 | CU-01, CU-02, CU-03, CU-04, CU-34, CU-35, CU-36 |
| [RN-36](Reglas-De-Negocio/RN-36-Sufijo-Automatico-Al-Instanciar-Un-Nombre-Existente.md) | Sufijo automático al instanciar un nombre existente | **[D]** completa, decisión D-13 | CU-16 |
| [RN-37](Reglas-De-Negocio/RN-37-Deteccion-No-Bloqueante-De-Higiene-Del-Modelo.md) | Detección no bloqueante de higiene del modelo | **[D]** completa, decisión D-13 | CU-16, CU-34, CU-35, CU-36 |

**Sobre la autoría.** El anexo E-16 distingue tres situaciones y esta categoría las conserva sin fusionarlas: el enunciado que proviene de la fuente base, marcado `[E]`; el que fijó el agente humano del proyecto, marcado `[D]`; y la especificación de integración que derivó el orquestador, marcada `[D-i]`. **Catorce de las dieciséis especificaciones derivadas siguen sin revisar** —sólo dos están aprobadas—, de modo que toda regla o parte de regla marcada `[D-i]` se consume **declarándola revisable** y nunca como requisito cerrado del cliente. Las reglas alcanzadas por esa condición son RN-04, RN-05, RN-14, RN-22, RN-23, RN-25, RN-26, RN-27, RN-28, RN-34 en su totalidad o en su ampliación, y la exigibilidad de RN-21, RN-29, RN-32 y RN-33.

## §5. Modelo conceptual y reglas conceptuales

El indicador `tiene_persistencia` es verdadero, de modo que el modelo conceptual es obligatorio. Vive en [Modelo-Datos/Modelo-Conceptual.md](Modelo-Datos/Modelo-Conceptual.md) y deriva del anexo E-9 del intake, en lenguaje conceptual y sin tipos físicos.

**Conteo de entidades y decisión sobre las RC.** El anexo E-9 declara **once tablas**; su bloque de identidad de objeto declara además **dos objetos con identidad** que no diseña —el secreto y la red del proyecto— y el intake §24.3 agrega un **tercero**, el volumen o directorio al que apunta un montaje. El conteo conceptual es de **catorce entidades**. Por las dos vías —once persistidas o catorce conceptuales— el modelo supera las diez entidades que §2.2 fija como umbral, de modo que **las reglas conceptuales son obligatorias** y se emiten dieciocho en [Modelo-Datos/reglas-conceptuales-de-modelo/](Modelo-Datos/reglas-conceptuales-de-modelo/).

| RC | Nombre | Tipo de restricción |
| --- | --- | --- |
| [RC-01](Modelo-Datos/reglas-conceptuales-de-modelo/RC-01-Unicidad-Del-Identificador-Legible-Del-Proyecto.md) | Unicidad del identificador legible del proyecto SelfHosted | Identidad |
| [RC-02](Modelo-Datos/reglas-conceptuales-de-modelo/RC-02-Unicidad-Del-Nombre-De-Servicio-En-Su-Proyecto.md) | Unicidad del nombre de servicio dentro de su proyecto SelfHosted | Identidad, acotada al ámbito del proyecto SelfHosted |
| [RC-03](Modelo-Datos/reglas-conceptuales-de-modelo/RC-03-Unicidad-De-La-Clave-De-Variable-En-Su-Servicio.md) | Unicidad de la clave de variable dentro de su servicio | Identidad, acotada al ámbito del servicio |
| [RC-04](Modelo-Datos/reglas-conceptuales-de-modelo/RC-04-Ausencia-De-Unicidad-De-La-Clave-Compartida.md) | Ausencia de unicidad de la clave de una variable compartida | Identidad, por ausencia deliberada de restricción |
| [RC-05](Modelo-Datos/reglas-conceptuales-de-modelo/RC-05-Ausencia-De-Referencia-En-La-Variable-Compartida.md) | Ausencia de referencia en la variable compartida del proyecto | Valor permitido |
| [RC-06](Modelo-Datos/reglas-conceptuales-de-modelo/RC-06-Irreflexividad-Del-Enlace.md) | Irreflexividad del enlace | Referencial |
| [RC-07](Modelo-Datos/reglas-conceptuales-de-modelo/RC-07-Solidaridad-De-Las-Claves-Del-Enlace.md) | Solidaridad de las dos claves de referencia del enlace | Valor permitido, expresado como dependencia entre dos atributos |
| [RC-08](Modelo-Datos/reglas-conceptuales-de-modelo/RC-08-Aporte-Minimo-Del-Enlace.md) | Aporte mínimo del enlace | Valor permitido |
| [RC-09](Modelo-Datos/reglas-conceptuales-de-modelo/RC-09-Unicidad-Del-Enlace-Por-Par-Y-Claves.md) | Unicidad del enlace por par de servicios y par de claves | Identidad |
| [RC-10](Modelo-Datos/reglas-conceptuales-de-modelo/RC-10-Unicidad-Del-Enlace-De-Espera-Sin-Variable.md) | Unicidad del enlace de espera sin variable entre un par de servicios | Cardinalidad |
| [RC-11](Modelo-Datos/reglas-conceptuales-de-modelo/RC-11-Coherencia-Entre-Referencia-Y-Resolucion.md) | Coherencia entre la referencia y su momento de resolución | Derivación |
| [RC-12](Modelo-Datos/reglas-conceptuales-de-modelo/RC-12-Unicidad-De-La-Reserva-Por-Replica.md) | Unicidad de la reserva de dirección por réplica | Cardinalidad |
| [RC-13](Modelo-Datos/reglas-conceptuales-de-modelo/RC-13-Unicidad-Del-Resumen-Del-Token.md) | Unicidad del resumen del valor del token de API | Identidad |
| [RC-14](Modelo-Datos/reglas-conceptuales-de-modelo/RC-14-Valores-Admitidos-Del-Formato-Del-Item.md) | Valores admitidos del formato de un ítem del catálogo | Valor permitido |
| [RC-15](Modelo-Datos/reglas-conceptuales-de-modelo/RC-15-Dependencia-Existencial-Del-Servicio.md) | Dependencia existencial del servicio y de sus elementos respecto del proyecto | Referencial, con propagación en cascada |
| [RC-16](Modelo-Datos/reglas-conceptuales-de-modelo/RC-16-Exclusion-Entre-Valor-Y-Marca-De-Secreta.md) | Exclusión entre el valor en claro y la marca de secreta | Valor permitido, expresado como exclusión entre dos atributos |
| [RC-17](Modelo-Datos/reglas-conceptuales-de-modelo/RC-17-Vinculo-Por-Identidad-Del-Modelo.md) | Vínculo por identidad y nunca por nombre | Identidad |
| [RC-18](Modelo-Datos/reglas-conceptuales-de-modelo/RC-18-Conservacion-Del-Historial-De-Despliegues.md) | Conservación del historial de despliegues | Derivación, expresada como política de conservación |

Cada regla conceptual deriva de una restricción declarada en el anexo E-9 o en su bloque de identidad de objeto. Ninguna se origina en esta categoría.

## §6. Matriz de trazabilidad NB → CU → RN → US

Matriz exigida por §2.1 de las reglas de la categoría. Las historias de usuario llevan la forma `US-CU-XX-n` y son **provisionales**: la numeración definitiva es potestad de 06-Backlog-Tecnico. La forma se eligió para que ningún identificador emitido acá colisione con la que 06 asigne. Son 118 historias previstas sobre 36 casos de uso.

| NB | CU | RN aplicables | US a generar en 06 |
| --- | --- | --- | --- |
| NB-01 | [CU-01](Casos-De-Uso/CU-01-Alta-De-Proyecto.md) Alta de proyecto SelfHosted con su modo de red y su persistencia | RN-17, RN-35 | US-CU-01-1, US-CU-01-2, US-CU-01-3 |
| NB-01 | [CU-02](Casos-De-Uso/CU-02-Listado-Renombrado-Y-Eliminacion-De-Proyectos.md) Listado, renombrado y eliminación de proyectos SelfHosted | RN-10, RN-17, RN-33, RN-35 | US-CU-02-1, US-CU-02-2, US-CU-02-3 |
| NB-01 | [CU-03](Casos-De-Uso/CU-03-Alta-Y-Configuracion-De-Servicio.md) Alta y configuración completa de un servicio | RN-01, RN-02, RN-06, RN-07, RN-08, RN-10, RN-17, RN-19, RN-27, RN-28, RN-32, RN-33, RN-35 | US-CU-03-1, US-CU-03-2, US-CU-03-3, US-CU-03-4, US-CU-03-5 |
| NB-01 | [CU-04](Casos-De-Uso/CU-04-Composicion-Del-Lienzo.md) Composición del lienzo: nodos, aristas y dependencias | RN-04, RN-05, RN-12, RN-14, RN-17, RN-21, RN-32, RN-33, RN-34, RN-35 | US-CU-04-1, US-CU-04-2, US-CU-04-3, US-CU-04-4 |
| NB-01 | [CU-05](Casos-De-Uso/CU-05-Persistencia-Y-Recuperacion-De-La-Disposicion.md) Persistencia y recuperación de la disposición del lienzo | RN-12, RN-17 | US-CU-05-1, US-CU-05-2, US-CU-05-3 |
| NB-01 | [CU-36](Casos-De-Uso/CU-36-Revision-De-Higiene-Del-Registro.md) Revisión de higiene del registro | RN-28, RN-35, RN-37 | US-CU-36-1, US-CU-36-2, US-CU-36-3 |
| NB-02 | [CU-06](Casos-De-Uso/CU-06-Descubrimiento-De-Contenedores-Adoptables.md) Descubrimiento de contenedores, con motivo de no incorporabilidad | RN-11, RN-15, RN-29 | US-CU-06-1, US-CU-06-2, US-CU-06-3 |
| NB-02 | [CU-07](Casos-De-Uso/CU-07-Incorporacion-Con-Confirmacion-Explicita.md) Incorporación de un contenedor existente con confirmación explícita | RN-01, RN-02, RN-11, RN-15, RN-17, RN-29 | US-CU-07-1, US-CU-07-2, US-CU-07-3, US-CU-07-4 |
| NB-02 | [CU-08](Casos-De-Uso/CU-08-Traduccion-De-La-Configuracion-Observada.md) Traducción de la configuración observada al modelo de servicio | RN-01, RN-07, RN-15, RN-26, RN-29, RN-34 | US-CU-08-1, US-CU-08-2, US-CU-08-3 |
| NB-03 | [CU-09](Casos-De-Uso/CU-09-Exportacion-En-Formato-De-Composicion.md) Exportación en formato estándar de composición | RN-15, RN-23, RN-25 | US-CU-09-1, US-CU-09-2, US-CU-09-3 |
| NB-03 | [CU-10](Casos-De-Uso/CU-10-Exportacion-Del-Manifiesto-Propio.md) Exportación del manifiesto propio, que preserva la disposición | RN-15, RN-23, RN-25 | US-CU-10-1, US-CU-10-2, US-CU-10-3 |
| NB-03 | [CU-11](Casos-De-Uso/CU-11-Importacion-Como-Proyecto-Nuevo.md) Importación como proyecto SelfHosted nuevo | RN-01, RN-02, RN-05, RN-07, RN-17, RN-21, RN-26, RN-34 | US-CU-11-1, US-CU-11-2, US-CU-11-3 |
| NB-03 | [CU-12](Casos-De-Uso/CU-12-Exportacion-Programada-A-Destino-Externo.md) Ejecución programada de la exportación hacia un destino externo | RN-15, RN-17, RN-25 | US-CU-12-1, US-CU-12-2, US-CU-12-3 |
| NB-04 | [CU-13](Casos-De-Uso/CU-13-Despliegue-Desde-Imagen-De-Registro.md) Despliegue de un servicio desde imagen de registro | RN-13, RN-17, RN-21, RN-23, RN-24, RN-31 | US-CU-13-1, US-CU-13-2, US-CU-13-3 |
| NB-04 | [CU-14](Casos-De-Uso/CU-14-Consulta-Del-Registro-Del-Contenedor.md) Consulta del registro del contenedor | RN-15 | US-CU-14-1, US-CU-14-2, US-CU-14-3 |
| NB-04 | [CU-15](Casos-De-Uso/CU-15-Despliegue-Construyendo-La-Imagen.md) Despliegue construyendo la imagen | RN-08, RN-17, RN-21, RN-24, RN-31 | US-CU-15-1, US-CU-15-2, US-CU-15-3 |
| NB-04 | [CU-16](Casos-De-Uso/CU-16-Alta-Desde-Plantilla-Del-Catalogo.md) Alta desde plantilla del catálogo, con creación del conjunto completo | RN-01, RN-02, RN-17, RN-21, RN-22, RN-24, RN-30, RN-34, RN-36, RN-37 | US-CU-16-1, US-CU-16-2, US-CU-16-3 |
| NB-04 | [CU-17](Casos-De-Uso/CU-17-Mantenimiento-Del-Catalogo.md) Mantenimiento del catálogo de plantillas | RN-15, RN-17, RN-30 | US-CU-17-1, US-CU-17-2, US-CU-17-3, US-CU-17-4 |
| NB-04 | [CU-34](Casos-De-Uso/CU-34-Variables-Compartidas-Del-Proyecto.md) Variables compartidas del proyecto SelfHosted | RN-15, RN-17, RN-21, RN-22, RN-23, RN-27, RN-28, RN-33, RN-35, RN-37 | US-CU-34-1, US-CU-34-2, US-CU-34-3, US-CU-34-4 |
| NB-04 | [CU-35](Casos-De-Uso/CU-35-Valor-Expresado-Como-Referencia.md) Valor expresado como referencia a otra variable | RN-15, RN-17, RN-21, RN-22, RN-23, RN-24, RN-25, RN-27, RN-28, RN-32, RN-33, RN-34, RN-35, RN-37 | US-CU-35-1, US-CU-35-2, US-CU-35-3, US-CU-35-4 |
| NB-05 | [CU-18](Casos-De-Uso/CU-18-Arranque-Y-Parada-Con-Autoarranque.md) Arranque y parada, con autoarranque | RN-03, RN-04, RN-05, RN-09, RN-14, RN-17, RN-20, RN-24, RN-31 | US-CU-18-1, US-CU-18-2, US-CU-18-3, US-CU-18-4 |
| NB-05 | [CU-19](Casos-De-Uso/CU-19-Rango-Gestionado-Y-Reserva-De-Direccion.md) Rango gestionado y reserva de dirección por servicio | RN-03, RN-06, RN-17, RN-18 | US-CU-19-1, US-CU-19-2, US-CU-19-3, US-CU-19-4 |
| NB-05 | [CU-20](Casos-De-Uso/CU-20-Validacion-De-Conflicto-De-Direcciones.md) Validación de conflicto contra los servicios activos, sin acceso al motor | RN-03, RN-06, RN-20 | US-CU-20-1, US-CU-20-2, US-CU-20-3 |
| NB-05 | [CU-21](Casos-De-Uso/CU-21-Informe-De-Conflicto-Y-Resolucion.md) Informe de conflicto y aplicación de la resolución elegida | RN-03, RN-06, RN-13, RN-17, RN-20 | US-CU-21-1, US-CU-21-2, US-CU-21-3, US-CU-21-4 |
| NB-06 | [CU-22](Casos-De-Uso/CU-22-Acumulacion-De-Cambios-Pendientes.md) Acumulación de cambios pendientes, con distinción de los visuales | RN-12, RN-13, RN-17, RN-27, RN-33 | US-CU-22-1, US-CU-22-2, US-CU-22-3 |
| NB-06 | [CU-23](Casos-De-Uso/CU-23-Descarte-De-Un-Cambio-Individual.md) Descarte de un cambio individual del conjunto pendiente | RN-12, RN-13, RN-17 | US-CU-23-1, US-CU-23-2, US-CU-23-3 |
| NB-06 | [CU-24](Casos-De-Uso/CU-24-Aplicacion-En-Lote.md) Aplicación en lote del conjunto de cambios pendientes | RN-03, RN-04, RN-09, RN-13, RN-17, RN-20, RN-21, RN-22, RN-24, RN-31 | US-CU-24-1, US-CU-24-2, US-CU-24-3, US-CU-24-4 |
| NB-06 | [CU-25](Casos-De-Uso/CU-25-Calculo-Del-Informe-De-Impacto.md) Cálculo del informe de impacto | RN-12, RN-13, RN-27, RN-33 | US-CU-25-1, US-CU-25-2, US-CU-25-3 |
| NB-07 | [CU-26](Casos-De-Uso/CU-26-Lectura-Del-Estado-Del-Servidor.md) Lectura del estado del servidor | — | US-CU-26-1, US-CU-26-2, US-CU-26-3 |
| NB-07 | [CU-27](Casos-De-Uso/CU-27-Vista-Por-Proyecto-Y-Por-Contenedor.md) Vista por proyecto SelfHosted y por contenedor | RN-20, RN-31 | US-CU-27-1, US-CU-27-2, US-CU-27-3 |
| NB-07 | [CU-28](Casos-De-Uso/CU-28-Reconciliacion-Con-El-Motor-De-Contenedores.md) Reconciliación con el motor de contenedores y señalización del servicio huérfano | RN-20, RN-31 | US-CU-28-1, US-CU-28-2, US-CU-28-3 |
| NB-08 | [CU-29](Casos-De-Uso/CU-29-Alta-Del-Administrador-En-El-Primer-Arranque.md) Alta del administrador en el primer arranque | RN-17 | US-CU-29-1, US-CU-29-2, US-CU-29-3 |
| NB-08 | [CU-30](Casos-De-Uso/CU-30-Inicio-Y-Cierre-De-Sesion.md) Inicio y cierre de sesión | RN-17 | US-CU-30-1, US-CU-30-2, US-CU-30-3 |
| NB-08 | [CU-31](Casos-De-Uso/CU-31-Cambio-De-Contrasena.md) Cambio de contraseña | RN-17 | US-CU-31-1, US-CU-31-2 |
| NB-08 | [CU-32](Casos-De-Uso/CU-32-Emision-Y-Revocacion-De-Credenciales-De-Maquina.md) Emisión, listado y revocación de credenciales de máquina | RN-15, RN-16, RN-17 | US-CU-32-1, US-CU-32-2, US-CU-32-3 |
| NB-08 | [CU-33](Casos-De-Uso/CU-33-Disparo-De-Despliegue-Con-Credencial-De-Ambito-Minimo.md) Disparo de despliegue con credencial de ámbito mínimo | RN-13, RN-16, RN-17, RN-21, RN-24, RN-31 | US-CU-33-1, US-CU-33-2, US-CU-33-3 |

Dos casos de uso no declaran regla del catálogo E-16 y lo declaran explícitamente en lugar de dejar la celda vacía: CU-14, cuya única regla alcanzada es la de no devolver secretos en claro y cuyo alcance sobre el registro del contenedor es una brecha abierta; y CU-26, cuyas restricciones son requerimientos no funcionales del intake §17.P.10 y no reglas de dominio.

## §7. Cobertura y verificación bidireccional

**Cobertura de CU declaradas por las NB.** Las ocho necesidades de negocio declaran en su §7 exactamente 36 casos de uso previstos. Los 36 están generados, con la misma numeración y sin reasignaciones.

| NB | CU previstas en su §7 | CU generadas | Faltantes | Sobrantes |
| --- | --- | --- | --- | --- |
| NB-01 | CU-01, CU-02, CU-03, CU-04, CU-05, CU-36 | 6 | — | — |
| NB-02 | CU-06, CU-07, CU-08 | 3 | — | — |
| NB-03 | CU-09, CU-10, CU-11, CU-12 | 4 | — | — |
| NB-04 | CU-13, CU-14, CU-15, CU-16, CU-17, CU-34, CU-35 | 7 | — | — |
| NB-05 | CU-18, CU-19, CU-20, CU-21 | 4 | — | — |
| NB-06 | CU-22, CU-23, CU-24, CU-25 | 4 | — | — |
| NB-07 | CU-26, CU-27, CU-28 | 3 | — | — |
| NB-08 | CU-29, CU-30, CU-31, CU-32, CU-33 | 5 | — | — |
| Total | 36 | 36 | 0 | 0 |

**Cobertura de RN declaradas por el anexo E-16.** El anexo declara 37 reglas, RN-01 a RN-37. Las 37 están generadas, con la misma numeración. No hay faltantes ni sobrantes.

**Verificación bidireccional CU ↔ NB.** Cada caso de uso declara exactamente una necesidad de negocio upstream y no hay ningún caso de uso huérfano. Cada necesidad tiene al menos tres casos de uso.

**Verificación bidireccional CU ↔ RN.** Cada regla de negocio enumera sus casos de uso afectados y cada caso de uso enumera las reglas que lo restringen. Las dos listas se verificaron una contra otra y coinciden en las 37 reglas: no hay ninguna regla que declare un caso de uso que no la liste, ni ningún caso de uso que liste una regla que no lo declare.

**Verificación de identificadores.** No hay colisión: los 36 identificadores de caso de uso son únicos, los 37 de regla de negocio son únicos, los 18 de regla conceptual son únicos, y las 118 historias de usuario provisionales llevan una forma que no colisiona con la numeración de 06.

## §8. Convenciones que esta categoría aplica

**Desambiguación de «proyecto».** «Proyecto SelfHosted» designa el objeto del producto: la arquitectura de servicios contenedorizados con su red y su lienzo, que el usuario crea desde el portal. «Proyecto de código» designa la unidad de compilación, `SelfHosted.Service.Core`, y se escribe siempre completo. «Proyecto» a secas designa el emprendimiento. En esta categoría el sentido predominante es el del producto. Queda prohibida toda construcción que fusione los términos.

**Identidades de código.** Los nombres de código aparecen sólo al citar la estructura del repositorio o al asignar una responsabilidad a una capa. En prosa de negocio el producto es `SelfHosted Service`. Las cuatro capas son `Domain`, `Application`, `Infrastructure` y `Web`, y se nombran «capa», nunca «proyecto de código».

**Vocabulario del dominio del cliente.** Los casos de uso y las reglas usan el vocabulario del glosario del intake §12 —proyecto SelfHosted, servicio, despliegue, arista, changeset, adopción, huérfano, referencia de variable, catálogo, token de API— y evitan nombres de productos comerciales, de protocolos concretos y de librerías, según el criterio de §6 de las reglas de la categoría. Donde el intake nombra una tecnología concreta, esta categoría la refiere por su función: «motor de contenedores», «formato estándar de composición», «punto de acceso del motor».

**Versionado.** Ningún archivo lleva sufijo de versión en el nombre. Cada uno declara su versión en el campo de su cabecera y abre en `1.0`, estado `Propuesto`, con su sección de control de cambios. No hay ninguna versión superada que archivar, porque ésta es la primera emisión de la categoría.

**Tabla de contenido.** Todo documento con más de tres secciones de primer nivel la incluye inmediatamente después de la cabecera, con enlaces ancla.

**Nombres de los actores no humanos: denominación propia de esta categoría.** Un caso de uso necesita nombrar a quién le toca cada responsabilidad del flujo, y el intake no publica un catálogo de componentes con ese nivel de granularidad. En consecuencia, los nombres de actor no humano de §2 de cada caso de uso son en su mayoría **etiquetas funcionales acuñadas acá**. El detalle, verificado nombre por nombre contra el intake, `00-Contexto` y `01-Necesidades-Negocio`:

| Nombre de actor no humano | Tipo en los CU | Procedencia |
| --- | --- | --- |
| `Motor de contenedores` | Sistema, en 9 CU | **Declarado.** Actor externo y sustrato del producto: intake §10, §17.P.3 y anexos E-7, E-11 y E-17 |
| `Destino externo` | Sistema, en CU-12 | **Declarado.** Intake §17.P.11 DA-08 y §7 CL-10 |
| `Automatismo de integración continua` | Primario, en CU-33 | **Declarado.** Intake §2, tabla de audiencia y stakeholders |
| `Sincronizador de estado` | Primario, en CU-28 | **Declarado.** Intake §7 CL-02 y anexo E-17 |
| `Módulo de descubrimiento` | Sistema, en CU-06 | **Declarado.** Intake §6, flujo 2 |
| `Resolutor de referencias` | Sistema, en CU-35 | **Declarado.** Intake §17.P.5 y anexo E-4 |
| `Registro de la solución` (15 CU), `Módulo de despliegue` (5), `Módulo de red`, `Módulo de exportación`, `Módulo de catálogo`, `Recolector de métricas` (2 cada uno), `Módulo de incorporación`, `Módulo de importación`, `Módulo de observación`, `Servicio en segundo plano` (1 cada uno) | Sistema | **Acuñados por esta categoría.** Cero ocurrencias en toda fuente |
| `Módulo de traducción` (CU-08), `Módulo de validación de red` (CU-20), `Módulo de impacto` (CU-25) | **Primario** | **Acuñados por esta categoría.** Cero ocurrencias en toda fuente. Son actor primario de su caso de uso, que es un caso de uso sin intervención humana directa |

Seis nombres trazan y trece están acuñados, sobre diecinueve distintos.

**Consecuencia para 05-Arquitectura-Tecnica, que es la destinataria de la advertencia.** Los trece nombres acuñados **no son componentes declarados y no condicionan la descomposición**. Lo que sí es dato declarado son los siete módulos de la capa de aplicación que el intake §17.P.2 enumera —proyectos, servicios y despliegues, descubrimiento y adopción, red y conflictos de IP, catálogo, observabilidad, e identidad y tokens—, que son otros y menos que los nombres de actor de esta categoría, y son ésos los que 05 debe tomar como punto de partida. La correspondencia entre un actor no humano de un caso de uso y el componente que lo realice la fija 05. La dimensión «Componentes esperados en 05» del §9 de los 36 casos de uso ya lleva la marca de referencia tentativa por el mismo motivo.

La alternativa evaluada y descartada fue renombrar los trece contra los siete módulos declarados: se descartó porque varios casos de uso necesitan distinguir responsabilidades dentro de un mismo módulo —el cálculo del informe de impacto y la acumulación de cambios viven los dos en el módulo de proyectos—, y forzar el nombre declarado habría perdido esa distinción sin ganar traza real.

## §9. Brechas abiertas de esta categoría

Ninguna de estas brechas se resuelve acá. Se declaran con su destinatario, porque resolverlas por cuenta propia es el error que la cadena ya tuvo que corregir.

| # | Brecha | Dónde está declarada | Destinatario |
| --- | --- | --- | --- |
| B-01 | Catorce de las dieciséis especificaciones derivadas `[D-i]` siguen sin revisar y sostienen partes de RN-04, RN-05, RN-14, RN-21, RN-22, RN-23, RN-25, RN-26, RN-27, RN-28, RN-29, RN-32, RN-33 y RN-34 | Intake §24.1; cada RN alcanzada lo declara en su cabecera | Agente humano del proyecto |
| B-02 | El intake no declara el código de respuesta ante un identificador legible de proyecto SelfHosted duplicado. Rige la política general de CL-05 | [CU-01](Casos-De-Uso/CU-01-Alta-De-Proyecto.md) §10 | Agente humano del proyecto |
| B-03 | El intake no declara qué ocurre al renombrar el identificador legible de un proyecto SelfHosted, que RC-01 exige único y del que se derivan nombres de recursos. RN-33 alcanza al servicio y a la variable, no a él. **Alcance reducido**: la unicidad del nombre visible del proyecto ya no es parte de esta brecha, porque la consecuencia 2 de D-12 la resuelve | [CU-02](Casos-De-Uso/CU-02-Listado-Renombrado-Y-Eliminacion-De-Proyectos.md) §10 | Agente humano del proyecto |
| B-04 | El intake declara la confirmación escrita para eliminar un servicio (RN-10) y no declara la forma de la confirmación al eliminar un proyecto SelfHosted completo | [CU-02](Casos-De-Uso/CU-02-Listado-Renombrado-Y-Eliminacion-De-Proyectos.md) §10 | Agente humano del proyecto |
| B-05 | **Tres** reglas no tienen caso ejecutable propio en el anexo E-22 —RN-02, RN-08 y RN-10— y una cuarta, RN-28, tiene cubierta sólo una de las dos mitades de su enunciado: ningún caso del anexo tiene por entrada una clave de variable duplicada dentro de un mismo servicio. El propio anexo E-16 declara exigible que ninguna regla quede sin cobertura, de modo que la brecha es del intake y no de esta categoría | [RN-02](Reglas-De-Negocio/RN-02-Pertenencia-Del-Servicio-A-Un-Unico-Proyecto.md) §6, [RN-08](Reglas-De-Negocio/RN-08-Datos-Obligatorios-Del-Origen-Repositorio.md) §6, [RN-10](Reglas-De-Negocio/RN-10-Confirmacion-Escrita-Al-Eliminar-Un-Servicio.md) §6, [RN-28](Reglas-De-Negocio/RN-28-Unicidad-De-La-Clave-Segun-El-Ambito-De-La-Variable.md) §6 | 08-Calidad-Y-Pruebas, que debe derivar los casos; y agente humano del proyecto, para elevar al intake |
| B-06 | El intake no declara el comportamiento esperado ante un fallo de la escritura de la disposición del lienzo | [CU-05](Casos-De-Uso/CU-05-Persistencia-Y-Recuperacion-De-La-Disposicion.md) §10 | 05-Arquitectura-Tecnica |
| B-07 | El anexo E-18 registra como pendientes la distinción visual entre aristas que declaran espera y las que no, y el maquetado del paso de clasificación de variables y de la pantalla de variables compartidas | [CU-04](Casos-De-Uso/CU-04-Composicion-Del-Lienzo.md) §10, [CU-07](Casos-De-Uso/CU-07-Incorporacion-Con-Confirmacion-Explicita.md) §10, [CU-34](Casos-De-Uso/CU-34-Variables-Compartidas-Del-Proyecto.md) §10 | 03-UX-UI-DX |
| B-08 | El intake no declara si el registro que emite el contenedor debe filtrarse respecto de valores secretos, ni el comportamiento ante el corte del flujo continuo de registro | [CU-14](Casos-De-Uso/CU-14-Consulta-Del-Registro-Del-Contenedor.md) §10 | Agente humano del proyecto y 05-Arquitectura-Tecnica |
| B-09 | El intake no declara si una plantilla del catálogo puede contener material secreto ni con qué tratamiento, siendo el catálogo exportable | [CU-17](Casos-De-Uso/CU-17-Mantenimiento-Del-Catalogo.md) §10 | Agente humano del proyecto |
| B-10 | El destino concreto del respaldo externo y la periodicidad de la exportación programada no están declarados. El intake deja el destino explícitamente abierto | [CU-12](Casos-De-Uso/CU-12-Exportacion-Programada-A-Destino-Externo.md) §10 | Agente humano del proyecto y 05-Arquitectura-Tecnica |
| B-11 | El intake no declara qué ocurre al descartar un cambio del que dependen otros cambios del mismo conjunto pendiente | [CU-23](Casos-De-Uso/CU-23-Descarte-De-Un-Cambio-Individual.md) §10 | Agente humano del proyecto |
| B-12 | El intake no declara qué ocurre si un archivo importado colisiona con el identificador legible de un proyecto SelfHosted existente | [CU-11](Casos-De-Uso/CU-11-Importacion-Como-Proyecto-Nuevo.md) §10 | Agente humano del proyecto |
| B-13 | El intake no declara las condiciones concretas de validación de la contraseña del administrador, ni política de bloqueo o limitación de intentos fallidos de inicio de sesión | [CU-29](Casos-De-Uso/CU-29-Alta-Del-Administrador-En-El-Primer-Arranque.md) §10, [CU-30](Casos-De-Uso/CU-30-Inicio-Y-Cierre-De-Sesion.md) §10, [CU-31](Casos-De-Uso/CU-31-Cambio-De-Contrasena.md) §10 | Agente humano del proyecto |
| B-14 | El intake no declara el comportamiento esperado cuando la lectura del estado del sistema operativo no está disponible, ni la validez temporal de un estado que no pudo reconciliarse | [CU-26](Casos-De-Uso/CU-26-Lectura-Del-Estado-Del-Servidor.md) §10, [CU-28](Casos-De-Uso/CU-28-Reconciliacion-Con-El-Motor-De-Contenedores.md) §10 | 05-Arquitectura-Tecnica |
| B-15 | El intake no declara la frecuencia de la revisión periódica del proyecto SelfHosted, que es uno de los tres momentos de evaluación de RN-37 | [CU-36](Casos-De-Uso/CU-36-Revision-De-Higiene-Del-Registro.md) §10 | 05-Arquitectura-Tecnica |
| B-16 | El modelo lógico del secreto, de la red del proyecto y del volumen o directorio de montaje no está diseñado, y un volumen conservado tras eliminar su servicio queda hoy sin entidad que lo represente | [Modelo-Conceptual](Modelo-Datos/Modelo-Conceptual.md) §9; intake §24.3 | 05-Arquitectura-Tecnica |
| B-17 | El intake no declara política de purga para las reservas de dirección de servicios eliminados o inactivos. **Alcance reducido**: la retención de los eventos de auditoría ya no es parte de esta brecha, porque el intake §17.P.11 la declara en DA-07 —90 días, configurables— | [CU-19](Casos-De-Uso/CU-19-Rango-Gestionado-Y-Reserva-De-Direccion.md) §10; [Modelo-Conceptual](Modelo-Datos/Modelo-Conceptual.md) §9 | 05-Arquitectura-Tecnica |
| B-18 | Los plazos y anclajes que 01-Necesidades-Negocio dejó abiertos alcanzan a los casos de uso que las implementan, y son de dos clases distintas: las épicas EP-23, EP-24 y EP-25 **no tienen fase asignada**; EP-15 **sí la tiene**, la Fase 4, y lo que está abierto es su adelanto no decidido a la Fase 1 | [Necesidades-Negocio.md](../01-Necesidades-Negocio/Necesidades-Negocio.md) §7; [CU-32](Casos-De-Uso/CU-32-Emision-Y-Revocacion-De-Credenciales-De-Maquina.md) §10 y [CU-36](Casos-De-Uso/CU-36-Revision-De-Higiene-Del-Registro.md) §10 | 07-Plan-Sprint, con decisión del agente humano del proyecto |
| B-19 | Los identificadores de historia de usuario de la matriz de §6 son provisionales. La numeración definitiva es potestad de 06 | Este documento §6; cada CU en su §9 | 06-Backlog-Tecnico |

## §10. Ambigüedades detectadas

Ninguna ambigüedad bloqueó la emisión de un documento de esta categoría. Las diecinueve situaciones en las que una fuente no declaraba el dato necesario se resolvieron declarándolas como brecha en §9, con su destinatario, y no completándolas con un valor plausible.

Se registra además una **observación sobre el anexo E-16**, que no bloquea y que se eleva para el próximo punto de control: la regla RN-21 declara en su parte `[D]` que los ámbitos válidos son «exactamente los tres que la decisión enumera» y en la enumeración incluye la variable «provista por el sistema» como caso admitido de variable apuntada. La lectura que esta categoría aplicó, y que es la única compatible con RN-32 y con los casos T-12, T-38 y T-53 del anexo E-22, es que la variable provista no constituye un cuarto ámbito sino una clase de variable apuntable dentro del ámbito «de otro servicio del mismo proyecto» y del ámbito «del propio servicio». Se declara la lectura en lugar de elegirla en silencio.

---

## Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 1.0 | 2026-07-29 | Correcciones del audit independiente de la Fase B, absorbidas dentro de la versión 1.0 sin subirla y sin archivar, por la política de versionado de `Master-Prompt.md` §5: los documentos están en estado `Propuesto` y las correcciones provienen del audit de su propia fase de emisión. Origen: informe [Audit/B-02-03-r1.md](../Audit/B-02-03-r1.md), hallazgos H-01 a H-04 y veredictos de §7.1 sobre B-03, B-17 y B-18. **§1** deja de afirmar que todo dato de un caso de uso traza: la afirmación era falsa para trece de los diecinueve nombres de actor no humano, y se reformula acotándola a los datos que afirman algo sobre el sistema, con la excepción de nomenclatura declarada explícitamente (H-04). **§8** suma la convención de denominación de los actores no humanos, con la tabla que separa nombre por nombre los seis que trazan a una fuente de los trece acuñados por esta categoría, la advertencia para 05-Arquitectura-Tecnica de que no son componentes declarados, y la alternativa evaluada y descartada (H-04). El barrido de verificación corrigió dos precisiones del propio hallazgo, que declaraba dieciséis nombres de actor de sistema con tres trazando: el universo son diecinueve nombres de actor no humano, seis trazan —el hallazgo no contaba `Destino externo` ni `Automatismo de integración continua`, que sí están declarados— y tres de los trece acuñados figuran como actor **primario** y no de sistema, en CU-08, CU-20 y CU-25, de modo que la salvedad no se limita a los actores de tipo sistema. Los trece acuñados son exactamente los que el hallazgo enumera. **§9** corrige cuatro filas: B-05 pasa de dos a tres reglas sin caso ejecutable propio en el anexo E-22 —RN-02, RN-08 y RN-10— y suma la mitad de RN-28 que queda sin cubrir (H-01, H-02); B-03 y B-17 reducen su alcance retirando el componente que la fuente sí declara —la unicidad del nombre visible del proyecto, resuelta por la consecuencia 2 de D-12, y la retención de auditoría, declarada en DA-07—; y B-18 deja de afirmar que EP-15 no tiene fase asignada, porque la tiene, y acota lo abierto a su adelanto no decidido a la Fase 1. Ningún conteo de artefactos cambia y las brechas siguen siendo diecinueve, dos de ellas con alcance reducido |
| 1.0 | 2026-07-29 | Versión inicial de la categoría, generada bajo el conjunto normativo 4.1 del Framework SDD. Emite 36 casos de uso, que son exactamente los que las ocho necesidades de negocio declaran previstos en su §7, con su numeración conservada; 37 reglas de negocio, que son exactamente las del anexo E-16 del intake, transcriptas con su momento de validación, su respuesta y su autoría declarada; el modelo conceptual derivado del anexo E-9, con catorce entidades conceptuales sobre once tablas persistidas; y 18 reglas conceptuales, obligatorias por superarse el umbral de diez entidades. Declara 19 brechas abiertas con su destinatario y no resuelve ninguna. Consume las especificaciones derivadas `[D-i]` sin revisar declarándolas revisables |
