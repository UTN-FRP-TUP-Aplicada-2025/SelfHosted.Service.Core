# NB-02 — Adoptabilidad del parque existente sin reinstanciar lo que ya está en producción

| Campo | Valor |
| --- | --- |
| Proyecto | SelfHosted Service |
| Documento | NB-02-Adoptabilidad-Del-Parque-Existente.md |
| Versión | 1.0 |
| Estado | Propuesto |
| Fecha | 2026-07-29 |
| Autor | Analista de Negocio Senior (AG-01) |
| Trazabilidad upstream | SOLUTION-INTAKE-SelfHosted-Service §1, §3 (diferenciador 1), §4 (F-11), §6 (flujo 2), §7 (CL-07, CL-08, CL-15), §11 (RG-09), §23.1, §23.3, §23.5; Vision-Producto.md §1.3, §3.2 (DV-01), §5 (OBJ-01), §6; Alcance-Proyecto.md §4.1; Roadmap-Producto.md §2.3 (EP-11), §3 |
| Trazabilidad downstream | CU-06, CU-07, CU-08 (previstas en 02-Especificacion-Funcional) |

---

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

El servidor de referencia ya está en producción: ocho contenedores corriendo, levantados uno por uno a lo largo del tiempo, cada uno con su configuración propia. Incorporar cualquiera de ellos a un registro común exige hoy recrearlo, y recrearlo significa detenerlo, volver a levantarlo con la configuración nueva y aceptar una ventana de indisponibilidad sobre un servicio que estaba funcionando bien. Ese costo es exactamente el que hace que una herramienta de este tipo no se adopte: nadie corta un servicio que anda para poder anotarlo en una lista.

La necesidad es que la incorporación no cueste nada operativamente. El contenedor que ya corre debe poder quedar bajo gobierno del producto sin que se lo recree: se lee su configuración real, se la traduce al modelo del producto y se lo vincula por identificador al servicio recién declarado. El contenedor sigue siendo el mismo proceso, con el mismo tiempo de actividad, y lo que cambia es que ahora pertenece a un conjunto declarado.

La incorporación tampoco puede ser ingenua. La configuración real de un contenedor en producción contiene credenciales en sus variables, hay contenedores que no deben gobernarse porque hacerlo crearía una dependencia circular de control, y un mismo contenedor no puede terminar asociado a dos conjuntos. La necesidad incluye, entonces, las salvaguardas que hacen que incorporar sea seguro y no solamente barato.

## 2. Ejemplo de uso desde la perspectiva del negocio

El propietario del servidor quiere empezar a usar la herramienta. Tiene ocho contenedores corriendo, de los cuales tres son servicios que otras personas usan a diario. Si la única forma de incorporarlos es volver a crearlos, el propietario va a probar la herramienta con un servicio de juguete y no con su parque real, porque no está dispuesto a cortar lo que funciona para probar algo nuevo.

Lo que necesita es entrar a un conjunto declarado, pedir ver qué contenedores hay corriendo en su servidor, elegir uno de la lista, revisar qué variables trae y cuáles de ellas son credenciales, confirmar, y que el contenedor aparezca en el conjunto como un servicio más, con su tiempo de actividad intacto y sin que nadie haya notado nada.

## 3. Impacto

- La herramienta se vuelve aplicable sobre un servidor en producción, que es el disparador declarado del proyecto y su diferenciador principal (DV-01).
- La adopción del producto deja de exigir una decisión de riesgo por parte del propietario, y el parque real puede incorporarse de manera incremental.
- Las credenciales que hoy viven en claro en las variables de contenedores en ejecución quedan clasificadas explícitamente en el momento de incorporarlas, en lugar de importarse a ciegas.
- Si la necesidad queda sin resolver, el producto sólo sirve para servicios nuevos y el parque existente queda permanentemente fuera del registro, con lo que la métrica de adopción del parque es inalcanzable por construcción.
- El propietario del servidor gana una vía de entrada gradual: puede incorporar un servicio, evaluar el resultado y seguir, sin comprometer el parque entero de una vez.

## 4. Problema específico que resuelve

- Incorporar un servicio en uso exige hoy recrearlo, con su ventana de indisponibilidad.
- La configuración real de un contenedor en ejecución sólo se conoce inspeccionándolo a mano, comando por comando.
- No hay forma de saber qué contenedores ya están gobernados por la solución, y uno mismo podría quedar asociado a dos conjuntos.
- Hay contenedores que no deben gobernarse —el caso declarado es el que monta el socket del motor de contenedores— y hoy nada lo señala antes de intentarlo.
- Las variables de un contenedor en producción contienen credenciales que una importación ingenua dejaría legibles.

## 5. Criterios de éxito

Ningún criterio usa fecha de calendario. Los plazos se expresan en meses desde el cierre de un alcance o se anclan al cierre de la etapa que entrega la capacidad medida, según la convención del intake §23.3 y la secuencia de etapas de [Roadmap-Producto.md](../../00-Contexto/Roadmap-Producto.md) §3. Ninguno de los cinco es derivación: los cinco provienen de material declarado.

| Criterio | Métrica | Target | Plazo |
| --- | --- | --- | --- |
| Adopción del parque existente | Contenedores en ejecución del servidor de referencia incorporados a un proyecto SelfHosted sin haber sido reinstanciados, sobre el total relevado | ≥ 6 de 8 contenedores (≥ 75 %) | 3 meses desde el cierre del Alcance 1 |
| Continuidad del servicio durante la incorporación | Interrupciones de servicio provocadas por la incorporación de un contenedor en ejecución | 0 interrupciones | Continuo, desde el cierre de la etapa `10` |
| Fidelidad de la configuración importada | Dimensiones de la configuración observada que se importan al modelo: imagen, red, dirección, montajes, dispositivos y variables | 6 de 6 dimensiones | Cierre de la etapa `10`, que entrega descubrimiento y adopción (EP-11) |
| Salvaguardas de aislamiento activas | Salvaguardas presentes en toda operación de descubrimiento e incorporación | 5 de 5 salvaguardas | Cierre de la etapa `10` |
| Clasificación de las credenciales importadas | Incorporaciones completadas sin que el administrador haya clasificado cada variable importada | 0 incorporaciones | Continuo, desde el cierre de la etapa `10` |

El primer criterio adopta como propio el objetivo de negocio OBJ-01 de [Vision-Producto.md](../../00-Contexto/Vision-Producto.md) §5, que es dato cerrado confirmado por el agente humano del proyecto el 2026-07-27. El quinto materializa la decisión D-2 del 2026-07-28: el carácter de secreto se declara, no se infiere, y la detección por nombre sugiere pero no decide.

## 6. Stakeholders involucrados

| Rol | Nivel | Qué pide o aporta |
| --- | --- | --- |
| Agente humano del proyecto | Propietario | Revisa y aprueba la necesidad, y da el OK explícito del punto de control de la etapa que la entrega |
| Analista de Negocio Senior (AG-01) | Propietario del contenido | Mantiene la necesidad, sus criterios y su trazabilidad, y declara las brechas en lugar de resolverlas |
| Equipo de desarrollo, dos desarrolladores | Implementador | Construye el descubrimiento, la traducción de la configuración observada y el paso de clasificación de variables |
| Agente IA de codificación | Implementador | Genera la especificación y, en etapas posteriores, el código del corte vertical de adopción |
| Propietario del servidor de referencia | Beneficiario | Valida que sus contenedores en producción se incorporen sin corte y decide qué variables son credenciales |
| Product Manager (AG-00) | Consultado | Verifica la alineación con la visión y con el alcance declarados |
| Analista Funcional (AG-02) | Consultado | Desarrolla los casos de uso que esta necesidad declara previstos |

El beneficiario que valida esta necesidad es el propietario del servidor y no el usuario final genérico, porque lo que está en juego es una decisión suya sobre su propio parque en producción.

## 7. Trazabilidad a CU

| NB | CU prevista | Estado |
| --- | --- | --- |
| NB-02 | CU-06 descubrimiento de contenedores, con motivo de no incorporabilidad (capa de presentación) | a generar |
| NB-02 | CU-07 incorporación con confirmación explícita (capa de presentación) | a generar |
| NB-02 | CU-08 traducción de la configuración observada al modelo de servicio (capa de infraestructura) | a generar |

## 8. Dependencias con otras NB

- Depende de: NB-01, porque no hay dónde incorporar un contenedor si el conjunto de servicios no está declarado; y NB-05, porque el contenedor incorporado trae una dirección que debe quedar registrada dentro del rango gestionado.
- Es prerequisito de: ninguna otra NB.

## 9. Prioridad MoSCoW

Must Have. Es el diferenciador declarado desde la definición del servicio y la condición para que el producto sea adoptable sobre un servidor que ya está en producción.

## 10. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 1.0 | 2026-07-29 | Corrección absorbida dentro de la versión 1.0, sin subirla y sin archivar el estado anterior, por la política de versionado de `Master-Prompt.md` §5. Se completa el campo `Trazabilidad upstream` de la cabecera con `Roadmap-Producto.md` §3, que el §5 cita como origen de la secuencia de etapas a la que anclan sus plazos. Origen: hallazgo H-02 del informe [Audit/A-00-01-r1.md](../../Audit/A-00-01-r1.md), aplicado a la propiedad que el hallazgo describe y no sólo a los tres archivos que nombra |
| 1.0 | 2026-07-29 | Versión inicial, generada bajo el conjunto normativo 4.0 del Framework SDD a partir del consolidado de la Fase A previa transcripto en el intake §23, y de los documentos de 00-Contexto. Conserva el identificador NB-02, sus cinco criterios de éxito y sus tres CU previstas |
