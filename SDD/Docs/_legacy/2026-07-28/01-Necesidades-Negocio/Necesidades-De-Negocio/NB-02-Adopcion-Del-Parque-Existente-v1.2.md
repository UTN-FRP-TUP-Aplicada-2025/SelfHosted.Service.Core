# NB-02 — Adoptabilidad del parque existente sin reinstanciar lo que ya está en producción

| Campo | Valor |
|---|---|
| Proyecto | SelfHosted.Service.Core (solución; proyecto de código principal `SelfHosted-Web`) |
| Documento | NB-02-Adopcion-Del-Parque-Existente-v1.2.md |
| Versión | 1.2 |
| Estado | Propuesto |
| Fecha | 2026-07-28 |
| Autor | Analista de Negocio Senior (AG-01) |
| Trazabilidad upstream | SOLUTION-INTAKE §1 (disparador), §3 (diferenciador 1), §4 (F-11), §5 (historia 7), §6 (flujo 2), §7 (CL-03, CL-07, CL-08 y CL-15, estos dos últimos resueltos el 2026-07-28 por la decisión D-2), §8, §11 (RG-09), §17.4 P.11 (invariante I10, fundamento cerrado por la decisión D-3), anexos E-7, E-11, E-19; `Vision-Producto-v1.1.md` §3 (DV-01), §5 (OBJ-01); `Alcance-Proyecto-v1.1.md` §4.1, §6.2 |
| Trazabilidad downstream | CU-06 a CU-08 (previstas en 02-Especificacion-Funcional); 06-Backlog-Tecnico; 07-Plan-Sprint; 08-Calidad-Y-Pruebas |

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

El servidor de referencia no es un servidor vacío: ya tiene ocho contenedores corriendo, varios de ellos con servicio efectivamente en uso, con direcciones fijas de la red local, montajes de directorio con decenas de gigabytes de datos y dependencias de dispositivos del propio equipo. Cualquier herramienta que exija empezar de cero para gobernar ese parque exige, en la práctica, apagar y volver a crear lo que hoy funciona. Ese costo es el que hace que la herramienta no se adopte.

El negocio necesita que la incorporación del parque existente sea posible sin reinstanciar nada: que un contenedor que ya corre pueda quedar asociado a un conjunto de servicios declarado importando la configuración que se le observa —imagen, red, dirección, montajes, dispositivos y variables— y quedando vinculado al contenedor real que ya existe, sin recrearlo y sin cortar su servicio.

Esto no es una comodidad de migración: es la condición de adoptabilidad de la solución completa. Si la incorporación exige una ventana de indisponibilidad por cada servicio en producción, el propietario posterga la adopción indefinidamente y el resto de las capacidades no llega a usarse nunca. Por eso el descubrimiento y la adopción son el diferencial declarado desde la definición del servicio.

## 2. Ejemplo de uso desde la perspectiva del negocio

El propietario tiene un servicio de impresión corriendo desde hace meses, con su dirección fija de la red local anotada en un papel y un directorio de datos que no quiere tocar. Es exactamente el tipo de servicio que no está dispuesto a apagar para probar una herramienta nueva.

Con la necesidad resuelta, entra al conjunto de servicios donde quiere que viva, pide incorporar lo que ya existe, y la solución le muestra la lista de contenedores del servidor con lo que sabe de cada uno: qué imagen usan, en qué red están, con qué dirección, qué directorios montan y cuántas variables tienen. Elige el servicio de impresión, confirma, y el servicio aparece en la pantalla del conjunto ya activo, sin haberse detenido un segundo. Los contenedores que la solución no puede gobernar con seguridad —como el panel que administra el propio motor— aparecen marcados como no incorporables, con el motivo escrito, en lugar de ofrecerse y fallar después.

## 3. Impacto

- La solución pasa a ser aplicable sobre un servidor que ya está en producción, que es el escenario real del cliente y no un supuesto.
- El parque existente deja de ser un pasivo que la herramienta ignora y se convierte en el contenido inicial del registro de arquitectura.
- Si la necesidad no se resuelve, la adopción de la solución exige una ventana de indisponibilidad por cada servicio en uso, y la herramienta queda relegada a los servicios nuevos: el problema original persiste sobre el parque que más duele.
- Aparece un riesgo nuevo que la propia necesidad debe contener: la configuración importada puede traer credenciales a la vista. El tratamiento de ese riesgo forma parte del alcance de la necesidad, no de un agregado posterior.
- Incorporar un contenedor ajeno a la solución es una operación con consecuencias sobre el host, de modo que las salvaguardas de aislamiento pasan a ser parte del valor entregado y no una restricción externa.

## 4. Problema específico que resuelve

- Incorporar un servicio en uso al registro exige hoy recrearlo, con la ventana de indisponibilidad que eso implica.
- La configuración real de un contenedor en ejecución sólo se conoce inspeccionándolo a mano, comando por comando.
- No hay forma de saber qué contenedores del servidor ya están gobernados por la solución y cuáles no, y un mismo contenedor podría quedar asociado a dos conjuntos distintos.
- Hay contenedores que no deben gobernarse desde la solución, y hoy nada lo señala antes de intentarlo.
- Las variables de entorno de un contenedor en producción contienen credenciales, y una importación ingenua las dejaría legibles en el registro.

## 5. Criterios de éxito

| Criterio | Métrica | Target | Plazo |
|---|---|---|---|
| Adopción del parque existente | Contenedores en ejecución del servidor de referencia incorporados a un proyecto SelfHosted sin haber sido reinstanciados, sobre los 8 del parque relevado | ≥ 6 de 8 contenedores (≥ 75 %) | 3 meses desde el cierre de la Fase 1 |
| Continuidad del servicio durante la incorporación | Interrupciones de servicio provocadas por la incorporación de un contenedor en ejecución | 0 interrupciones | Continuo |
| Fidelidad de la configuración importada | Dimensiones de la configuración observada que se importan por contenedor incorporado: imagen, red, dirección, montajes, dispositivos y variables | 6 de 6 dimensiones | Al cierre de la etapa de descubrimiento y adopción |
| Salvaguardas de aislamiento activas | Salvaguardas presentes en el descubrimiento y la incorporación, sobre las 5 declaradas en el alcance: prefijo reservado, etiquetas de pertenencia, rango de direcciones separado, confirmación escribiendo el nombre y descubrimiento en modo sólo lectura | 5 de 5 salvaguardas | Al cierre de la etapa de descubrimiento y adopción |
| Clasificación de las credenciales importadas | Incorporaciones que se completan sin que el administrador haya clasificado como secreta o no cada una de las variables importadas, sobre el total de incorporaciones | 0 incorporaciones | Al cierre de la etapa de descubrimiento y adopción |

Filas derivadas. Ninguna fila de esta tabla está derivada. La primera es la métrica de adopción del parque de SOLUTION-INTAKE §8; el resto toma su número del dimensionamiento verificado del parque, de la enumeración de dimensiones del flujo de adopción, de las cinco salvaguardas de aislamiento declaradas en el alcance y del paso obligatorio de clasificación de variables.

Nota sobre el último criterio, que cambió en esta versión. La versión 1.0 medía el enmascarado de las variables que la heurística por nombre identificaba, y llevaba una advertencia: una variable con un secreto cuyo nombre no coincidiera con la heurística se importaría en claro. El 2026-07-28 el agente humano del proyecto resolvió el caso límite CL-15 decidiendo que el carácter de secreto se declara y no se infiere: la heurística deja de decidir y pasa a sugerir, y la incorporación no se completa sin un paso obligatorio en el que el administrador ve todas las variables importadas y confirma cuáles son secretas. El criterio se reformuló sobre esa decisión y con eso se volvió más fuerte que antes: ya no mide una cobertura parcial dependiente de una heurística, sino que ninguna incorporación se cierre con variables sin clasificar. La advertencia se retiró porque el caso límite dejó de estar abierto.

## 6. Stakeholders involucrados

| Rol | Nivel | Qué pide o aporta |
|---|---|---|
| Propietario del servidor y administrador único | Propietario | Decide qué contenedores en producción se incorporan y en qué orden, y confirma cada incorporación de un contenedor ajeno a la solución |
| Agente humano del proyecto | Propietario | Valida en el punto de control que al menos un contenedor del parque real se incorporó sin reinstanciarlo y sin cortar su servicio |
| Equipo de desarrollo de dos personas | Implementador | Construye el descubrimiento, la traducción de la configuración observada y el vínculo con el contenedor existente |
| Agente de IA de codificación | Implementador | Especifica y genera el corte vertical de descubrimiento y adopción, con sus salvaguardas |
| Usuario final: administrador de la solución | Beneficiario | Valida que el contenedor incorporado sigue sirviendo y que su configuración quedó completa en el registro |

## 7. Trazabilidad a CU

| NB | CU prevista | Proyecto de código | Estado |
|---|---|---|---|
| NB-02 | CU-06 descubrimiento de contenedores candidatos con su motivo de no incorporabilidad | SelfHosted-Web | a generar |
| NB-02 | CU-07 incorporación de un contenedor existente a un proyecto SelfHosted, con confirmación explícita | SelfHosted-Web | a generar |
| NB-02 | CU-08 traducción de la configuración observada de un contenedor al modelo de servicio, con enmascarado de variables sensibles | SelfHosted-Infrastructure | a generar |

Extensión declarada de la tabla estándar. La columna `Proyecto de código` se agrega a las tres columnas que fija la Tabla C de `Rules-Necesidades-Negocio.md` §4.4, porque los casos de uso se generan por proyecto de código y esta solución se compone de cuatro. No reemplaza ninguna columna de la tabla estándar. La justificación única de la extensión está en el índice maestro §4.2.

## 8. Dependencias con otras NB

- Depende de: NB-01, porque el contenedor incorporado se asocia a un proyecto SelfHosted y se representa como servicio del registro; y NB-05, porque la dirección observada del contenedor debe reservarse sin entrar en conflicto con un servicio activo de otro proyecto.
- Es prerequisito de: ninguna otra NB de este catálogo. Es una necesidad terminal en el mapa de dependencias. NB-03 y NB-07 la referencian —la arquitectura reproducible debe incluir lo incorporado, y el tablero debe atribuir consumo también a los contenedores incorporados— pero ambas operan sobre servicios declarados, cualquiera sea su origen, y no dependen de esta necesidad para existir.

## 9. Prioridad MoSCoW

Must Have. Agrupa la capacidad F-11, Must Have en SOLUTION-INTAKE §4, y es el disparador declarado del proyecto: sin adoptabilidad sobre el parque en producción la solución no se adopta y ninguna otra necesidad llega a ejercitarse sobre el problema real.

## 10. Control de cambios

| Versión | Fecha | Cambios | Autor |
|---|---|---|---|
| 1.0 | 2026-07-27 | Versión inicial. Cinco criterios de éxito, ninguno derivado, y tres casos de uso previstos, dos sobre SelfHosted-Web y uno sobre SelfHosted-Infrastructure | Analista de Negocio Senior (AG-01) |
| 1.0 | 2026-07-27 | Correcciones del audit A-01-Necesidades-Negocio-v1.0, dentro del mismo ciclo de emisión y sin incremento de versión. P1-01: anclas de la tabla de contenido reemitidas conservando tildes. P2-01: se declara la extensión de la Tabla C con la columna `Proyecto`. P2-04: el plazo del primer criterio pasa a expresarse en fases del roadmap | Analista de Negocio Senior (AG-01) |
| 1.0 | 2026-07-27 | Cierre del hallazgo N-03 del audit A-01-Necesidades-Negocio-v2.0: la §4 incorpora la advertencia sobre el supuesto IC-05, abierto para el Sprint 0, del que depende el fundamento de su tercer punto de dolor y el tratamiento del contenedor ya incorporado en CU-06. Se declara explícitamente que ningún criterio de éxito de §5 mide esa regla, de modo que la advertencia no acota ningún target, a diferencia de la de CL-15 | Analista de Negocio Senior (AG-01) |
| 1.1 | 2026-07-28 | Propagación del SOLUTION-INTAKE v1.2. La decisión D-2 del 2026-07-28 resolvió el caso límite CL-15: el carácter de secreto se declara y no se infiere, y la incorporación no se completa sin un paso obligatorio de clasificación de variables. El quinto criterio de §5 se reformula sobre esa decisión y se vuelve más exigente que el anterior —ninguna incorporación se cierra con variables sin clasificar, en lugar de un porcentaje de enmascarado dependiente de la heurística— y su advertencia se retira. La decisión D-3 cerró el supuesto IC-05 sin cambios de modelo, de modo que la advertencia de §4 también se retira | Analista de Negocio Senior (AG-01) |
| 1.2 | 2026-07-28 | Propagación de la cuarta pasada sobre el intake, que es de terminología: el agente humano del proyecto resolvió el doble sentido de la palabra «proyecto» separando el término de producto del de la composición. Ninguna regla, flujo ni decisión cambia. Se aplica la forma completa «proyecto SelfHosted» en la primera mención de cada sección, en las definiciones y donde el otro sentido está cerca, y se conserva la forma corta donde el contexto ya lo fija. Del lado del sentido de composición la aplicación es exhaustiva: la columna de la tabla de trazabilidad a casos de uso pasa a llamarse `Proyecto de código` y el valor del campo `Proyecto` de la cabecera deja de contener la construcción prohibida que fusionaba los dos términos. | Analista de Negocio Senior (AG-01) |
