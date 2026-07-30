# NB-04 — El alta de un servicio deja de ser un ejercicio de copiar y adaptar

| Campo | Valor |
|---|---|
| Proyecto | SelfHosted.Service.Core (solución; proyecto principal SelfHosted-Web) |
| Documento | NB-04-Alta-De-Servicios-Sin-Copiar-Y-Adaptar-v1.0.md |
| Versión | 1.0 |
| Estado | Propuesto |
| Fecha | 2026-07-27 |
| Autor | Analista de Negocio Senior (AG-01) |
| Trazabilidad upstream | SOLUTION-INTAKE §1, §3, §4 (F-05, F-10, F-14), §5 (historias 2 y 4), §6 (flujo 1), §8, anexos E-2, E-6, E-19; `Vision-Producto-v1.0.md` §3.1, §5 (OBJ-02); `Alcance-Proyecto-v1.0.md` §4.1 |
| Trazabilidad downstream | CU-13 a CU-17 (previstas en 02-Especificacion-Funcional); 06-Backlog-Tecnico; 07-Plan-Sprint; 08-Calidad-Y-Pruebas |

## Tabla de contenido

- [1. Descripción de la necesidad](#1-descripción-de-la-necesidad)
- [2. Ejemplo de uso desde la perspectiva del negocio](#2-ejemplo-de-uso-desde-la-perspectiva-del-negocio)
- [3. Impacto](#3-impacto)
- [4. Problema específico que resuelve](#4-problema-específico-que-resuelve)
- [5. Criterios de éxito](#5-criterios-de-éxito)
- [6. Stakeholders involucrados](#6-stakeholders-involucrados)
- [7. Trazabilidad a CU](#7-trazabilidad-a-cu)
- [8. Dependencias con otras NB](#8-dependencias-con-otras-nb)
- [9. Prioridad MoSCoW](#9-prioridad-moscow)
- [10. Control de cambios](#10-control-de-cambios)

---

## 1. Descripción de la necesidad

Cada alta de un servicio nuevo en el servidor de referencia es un ejercicio manual de copiar y adaptar. Se toma la configuración del servicio más parecido que ya está corriendo, se cambian los valores que hace falta cambiar y se levanta a mano. El método no falla de a una vez: falla acumulándose. Cada copia arrastra decisiones que ya no aplican, cada adaptación introduce una diferencia que nadie registró, y el conjunto de servicios termina siendo una colección de variantes de un mismo original que ya nadie recuerda.

El costo tiene dos partes. La primera es el tiempo del alta en sí, que crece con la cantidad de dimensiones que el parque real exige declarar: no alcanza con imagen, puertos y variables, porque los servicios reales usan montajes de directorio, dispositivos del equipo, capacidades adicionales, límites de recursos, políticas de reinicio, versiones fijadas de imagen y marcas de servicio efímero. La segunda parte es el trabajo de llevar esa configuración a un contenedor corriendo, que hoy es un paso separado y manual, distinto según la imagen venga de un registro público o haya que construirla.

El negocio necesita que dar de alta un servicio sea una operación de la solución y no un procedimiento de copia: que la configuración se declare completa en un solo lugar, que los casos frecuentes se resuelvan desde un catálogo de servicios reutilizables con sus huecos parametrizables, y que el paso de la configuración declarada al contenedor corriendo sea derivado de lo declarado, cualquiera sea el origen de la imagen.

## 2. Ejemplo de uso desde la perspectiva del negocio

El propietario necesita una base de datos más para un conjunto de servicios nuevo. Ya tiene tres corriendo en el servidor, todas configuradas de manera ligeramente distinta porque cada una se copió de la anterior en un momento distinto. Hoy elegiría la más reciente, copiaría su configuración, cambiaría el nombre, el directorio de datos y la contraseña, y descubriría dos días después que arrastró un límite de memoria que ya no correspondía.

Con la necesidad resuelta, agrega la base desde el catálogo de servicios reutilizables, completa los tres o cuatro valores que ese ítem del catálogo declara como parámetros, y el servicio queda declarado con todas las dimensiones que su parque exige. Después agrega la aplicación que la va a usar, que esta vez no viene de un registro público sino de su propio repositorio, y la solución la construye siguiendo el progreso a la vista. Ninguno de los dos pasos requirió abrir la configuración de otro servicio para copiarla.

## 3. Impacto

- El alta de un servicio deja de ser una operación de riesgo por copia y pasa a ser una operación declarativa, con las mismas dimensiones para todos los servicios del parque.
- Los casos frecuentes dejan de reescribirse: el catálogo convierte la experiencia acumulada del propietario en un activo reutilizable y exportable.
- El paso de la configuración al contenedor corriendo deja de ser un procedimiento aparte, con lo que desaparece la brecha entre lo declarado y lo desplegado en el momento del alta.
- Si la necesidad no se resuelve, el registro de arquitectura existe pero nadie lo alimenta: el operador sigue trabajando con el método manual y el registro queda desactualizado desde el primer servicio nuevo.
- El servicio construido desde una definición propia o desde un repositorio deja de exigir un ciclo de construcción manual fuera de la solución.

## 4. Problema específico que resuelve

- Cada alta parte de la configuración de otro servicio, y arrastra decisiones que ya no corresponden.
- Las dimensiones que el parque real exige declarar no están en ningún formulario único, y se recuerdan de memoria servicio por servicio.
- No existe una forma de reutilizar la configuración de un servicio frecuente sin copiarla y editarla.
- Llevar la configuración declarada a un contenedor corriendo es hoy un paso manual y distinto según el origen de la imagen.
- La construcción de una imagen propia ocurre fuera del alcance de cualquier registro, y su progreso y su resultado no quedan a la vista.

## 5. Criterios de éxito

| Criterio | Métrica | Target | Plazo |
|---|---|---|---|
| Reemplazo del método manual | Altas de servicio nuevas realizadas desde la solución, sobre el total de altas nuevas | ≥ 90 % de las altas nuevas | 6 meses desde el cierre de la Fase 1 |
| Cobertura de las dimensiones del alta | Dimensiones de configuración que el parque real exige y que el alta permite declarar: etiqueta de imagen explícita con política de actualización, montajes, dispositivos, capacidades, límites de procesamiento y memoria, política de reinicio, modo de red con dirección y marca de efímero | 8 de 8 dimensiones | Al cierre de la etapa de servicios del proyecto |
| Orígenes de imagen soportados | Variantes de origen que el alta resuelve sin salir de la solución: registro público, definición local y repositorio remoto | 3 de 3 variantes | Al cierre de la Fase 1 |
| Altas resueltas desde el catálogo `[D]` | Altas de servicios frecuentes resueltas desde un ítem del catálogo con sus parámetros, sobre el total de altas de servicios frecuentes | ≥ 70 % | 6 meses desde el cierre de la Fase 3 |
| Tiempo de alta de un servicio frecuente `[D]` | Minutos desde iniciar el alta hasta tener el contenedor corriendo, para un servicio disponible en el catálogo | ≤ 5 min | 6 meses desde el cierre de la Fase 3 |

Filas derivadas. Dos filas están marcadas `[D]`. La de altas resueltas desde el catálogo deriva su porcentaje del propósito declarado del catálogo —cubrir los casos frecuentes del propietario— sin que exista una medición previa de qué proporción de las altas son frecuentes. La de tiempo de alta deriva su umbral del hecho de que el ítem del catálogo declara sus parámetros y no exige redactar configuración, sin que exista una medición del método manual con la que contrastarlo. Ambas requieren confirmación del cliente.

Nota sobre los plazos. Las dos filas que miden el catálogo se anclan al cierre de la Fase 3, que es la que entrega esa capacidad según `Roadmap-Producto-v1.0.md` §2.2. Las tres restantes se anclan a la Fase 1, que entrega el alta del servicio y su despliegue desde los tres orígenes de imagen. Ningún criterio se mide antes de que exista la capacidad que evalúa.

## 6. Stakeholders involucrados

| Rol | Nivel | Qué pide o aporta |
|---|---|---|
| Propietario del servidor y administrador único | Propietario | Aporta los casos frecuentes que el catálogo debe cubrir y decide qué configuración considera reutilizable |
| Agente humano del proyecto | Propietario | Valida en el punto de control que un servicio frecuente se da de alta sin copiar configuración de otro |
| Equipo de desarrollo de dos personas | Implementador | Construye el alta completa del servicio, el catálogo parametrizable y el despliegue desde los tres orígenes de imagen |
| Agente de IA de codificación | Implementador | Especifica y genera los cortes verticales de despliegue desde imagen pública, construcción de imagen y catálogo |
| Usuario final: administrador de la solución | Beneficiario | Valida que el alta cubre lo que su parque real necesita y que no queda nada por completar fuera de la solución |

## 7. Trazabilidad a CU

| NB | CU prevista | Proyecto | Estado |
|---|---|---|---|
| NB-04 | CU-13 despliegue de un servicio desde imagen de registro público, con estado real reflejado en el nodo | SelfHosted-Web | a generar |
| NB-04 | CU-14 consulta del registro de un contenedor desplegado | SelfHosted-Web | a generar |
| NB-04 | CU-15 despliegue construyendo la imagen desde una definición local o un repositorio remoto, con seguimiento del progreso | SelfHosted-Web | a generar |
| NB-04 | CU-16 alta de un servicio a partir de un ítem del catálogo con sus parámetros | SelfHosted-Web | a generar |
| NB-04 | CU-17 mantenimiento del catálogo de servicios reutilizables: alta, edición, exportación e importación | SelfHosted-Web | a generar |

Extensión declarada de la tabla estándar. La columna `Proyecto` se agrega a las tres columnas que fija la Tabla C de `Rules-Necesidades-Negocio.md` §4.4, porque los casos de uso se generan por proyecto y esta solución se compone de cuatro. No reemplaza ninguna columna de la tabla estándar. La justificación única de la extensión está en el índice maestro §4.2.

## 8. Dependencias con otras NB

- Depende de: NB-01, porque el servicio que se despliega o que se crea desde el catálogo es el que el registro declara dentro de un proyecto.
- Es prerequisito de: NB-03, NB-05, NB-06 y NB-07. La reproducibilidad debe describir el origen de la imagen; el arranque y los conflictos operan sobre servicios desplegables; el changeset necesita saber qué está desplegado para calcular su impacto; y el tablero observa contenedores que esta necesidad crea.

## 9. Prioridad MoSCoW

Must Have. Agrupa F-05 y F-10, ambas Must Have, junto con F-14, Should Have, y toma la más alta: sin llevar la configuración declarada a un contenedor corriendo el registro no tiene quién lo alimente, mientras que el catálogo es la parte que reduce el costo repetido y puede llegar después.

## 10. Control de cambios

| Versión | Fecha | Cambios | Autor |
|---|---|---|---|
| 1.0 | 2026-07-27 | Versión inicial. Cinco criterios de éxito, dos de ellos derivados y marcados `[D]`, y cinco casos de uso previstos sobre SelfHosted-Web | Analista de Negocio Senior (AG-01) |
| 1.0 | 2026-07-27 | Correcciones del audit A-01-Necesidades-Negocio-v1.0, dentro del mismo ciclo de emisión y sin incremento de versión. P1-01: anclas de la tabla de contenido reemitidas conservando tildes. P1-04: el plazo del quinto criterio se reancla al cierre de la Fase 3, que es la que entrega el catálogo que ese criterio mide, y se agrega la nota que declara el anclaje de las cinco filas. P2-01: se declara la extensión de la Tabla C con la columna `Proyecto`. P2-04: los plazos pasan a expresarse en fases del roadmap | Analista de Negocio Senior (AG-01) |
