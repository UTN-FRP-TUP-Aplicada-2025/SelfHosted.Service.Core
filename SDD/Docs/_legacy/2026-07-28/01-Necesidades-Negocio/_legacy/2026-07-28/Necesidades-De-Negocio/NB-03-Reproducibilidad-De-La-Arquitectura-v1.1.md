# NB-03 — Reproducibilidad de la arquitectura ante la pérdida del servidor

| Campo | Valor |
|---|---|
| Proyecto | SelfHosted.Service.Core (solución; proyecto principal SelfHosted-Web) |
| Documento | NB-03-Reproducibilidad-De-La-Arquitectura-v1.1.md |
| Versión | 1.1 |
| Estado | Propuesto |
| Fecha | 2026-07-28 |
| Autor | Analista de Negocio Senior (AG-01) |
| Trazabilidad upstream | SOLUTION-INTAKE §1, §4 (F-13, F-17), §5 (historia 9), §7 (CL-10), §8, §11 (RG-07), anexos E-14, E-20, E-21; `Vision-Producto-v1.1.md` §4.1, §5 (OBJ-03), §8 (RG-07); `Alcance-Proyecto-v1.1.md` §4.1, §8 (CA-07) |
| Trazabilidad downstream | CU-09 a CU-12 (previstas en 02-Especificacion-Funcional); 06-Backlog-Tecnico; 07-Plan-Sprint; 08-Calidad-Y-Pruebas |

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

La configuración real del parque vive hoy en dos lugares, y ninguno de los dos es un respaldo: el motor de contenedores, que sabe qué está corriendo pero no por qué, y un conjunto de archivos que no están versionados y que contienen credenciales. El servidor de referencia tiene un único disco sin redundancia. La combinación de ambos hechos es que la pérdida del disco no cuesta sólo los datos: cuesta la arquitectura, que habría que reconstruir de memoria porque no está documentada en ningún lado.

El negocio necesita que la arquitectura de cada conjunto de servicios sea reproducible fuera del servidor. Reproducible significa dos cosas a la vez: que exista una salida completa y legible de lo declarado —servicios, dependencias, redes, direcciones, valores compartidos del proyecto y disposición— y que esa salida pueda volver a entrar y reconstruir el conjunto en otra máquina. Una exportación que se lee pero no se reimporta no resuelve el problema; una que reimporta pero pierde la disposición devuelve un conjunto que hay que volver a interpretar.

Hay una restricción que la necesidad no puede violar: la salida no puede llevarse credenciales. Los archivos de variables del parque real contienen claves, y una exportación que las arrastra convierte al respaldo en una filtración. La reproducibilidad se entrega con los valores sensibles vacíos y con la indicación de qué hay que completar antes de levantar el conjunto en el destino.

## 2. Ejemplo de uso desde la perspectiva del negocio

El propietario compra un disco nuevo para reemplazar el que tiene y quiere hacer el cambio en un fin de semana. Hoy la pregunta que lo frena no es cómo copiar los datos, sino cómo recordar la arquitectura: qué servicios había en cada conjunto, con qué direcciones, qué directorios montaba cada uno y quién dependía de quién. Esa reconstrucción es la parte cara y la que no está escrita.

Con la necesidad resuelta, antes de tocar nada exporta cada conjunto y guarda el resultado fuera del servidor. La salida describe el conjunto completo y viene acompañada de la información que preserva la disposición de la pantalla. Cuando el servidor vuelve a estar en pie, importa esa salida y recupera el conjunto tal como estaba, incluida la manera en que él había ordenado los servicios. Completa las claves que la exportación dejó vacías a propósito y levanta. Además, como el respaldo no puede depender de que se acuerde de hacerlo, deja programada la exportación periódica a un destino externo.

## 3. Impacto

- La pérdida del disco deja de implicar la pérdida de la arquitectura: el costo de una reinstalación pasa de reconstruir a reimportar.
- La arquitectura se vuelve portable a otro servidor, lo que habilita mover un conjunto de servicios sin reescribir su configuración a mano.
- El respaldo deja de depender de la memoria y de la disciplina del operador, porque la propia solución lo produce de forma periódica.
- Si la necesidad no se resuelve, el riesgo declarado sobre la ausencia de redundancia de disco queda sin la mitigación que el propio análisis le asignó, y la solución habría registrado la arquitectura sin protegerla.
- Aparece una superficie nueva de filtración de credenciales, que la necesidad debe cerrar en su propia definición: la exportación es también el lugar donde un secreto podría salir del servidor.

## 4. Problema específico que resuelve

- No existe ninguna representación de la arquitectura fuera del propio servidor.
- La reconstrucción del parque tras una reinstalación no está documentada y depende de la memoria de una sola persona.
- Los archivos que sí describen partes de la configuración no están versionados y contienen credenciales, de modo que no pueden usarse como respaldo.
- La disposición con la que el operador lee su arquitectura se perdería en cualquier reconstrucción, aunque los servicios se recuperaran.
- El respaldo depende hoy de una acción manual que nadie garantiza que se ejecute con regularidad.

## 5. Criterios de éxito

| Criterio | Métrica | Target | Plazo |
|---|---|---|---|
| Reproducibilidad de la arquitectura | Proyectos con exportación vigente sobre el total de proyectos declarados, contando como vigente la de antigüedad menor a 7 días | 100 % de los proyectos | 3 meses desde el cierre de la Fase 3 |
| Fidelidad de la reimportación | Proyectos que al reimportarse conservan sus servicios, sus enlaces, sus direcciones, sus valores compartidos del proyecto y su disposición del lienzo | 100 % de los proyectos exportados | Al cierre de la Fase 3 |
| Ausencia de credenciales en la salida | Secretos escritos en texto plano en una exportación | 0 secretos; el archivo de variables sale vacío | Continuo |
| Cobertura de la traducción sobre el parque real | Configuraciones reales del anexo de configuraciones del intake que se exportan y reimportan sin pérdida de dimensiones de configuración, sobre las 6 transcriptas | 6 de 6 configuraciones | Al cierre de la Fase 3 |
| Automatismo del respaldo | Intervalo máximo entre exportaciones programadas de proyectos y catálogo hacia el destino externo | ≤ 7 días | Continuo, desde el cierre de la Fase 3 |

Filas derivadas. Ninguna fila de esta tabla está derivada. La primera es la métrica de reproducibilidad de SOLUTION-INTAKE §8 y de ella toma también el umbral de 7 días que reutiliza la última fila; la segunda y la tercera son criterios de transición de fase ya declarados; la cuarta toma su número del dimensionamiento verificado de seis configuraciones reales transcriptas.

## 6. Stakeholders involucrados

| Rol | Nivel | Qué pide o aporta |
|---|---|---|
| Propietario del servidor y administrador único | Propietario | Declara el destino externo del respaldo y asume la consecuencia de operar un servidor sin redundancia de disco |
| Agente humano del proyecto | Propietario | Valida en el punto de control que un conjunto exportado se reimporta conservando arquitectura y disposición, y que la salida no lleva secretos |
| Equipo de desarrollo de dos personas | Implementador | Construye la exportación, la importación y la programación del respaldo, con las reglas de traducción declaradas |
| Agente de IA de codificación | Implementador | Especifica y genera los cortes verticales de portabilidad y de exportación programada |
| Usuario final: administrador de la solución | Beneficiario | Valida que la salida es suficiente para levantar el conjunto en otra máquina completando sólo las claves |

## 7. Trazabilidad a CU

| NB | CU prevista | Proyecto | Estado |
|---|---|---|---|
| NB-03 | CU-09 exportación de la arquitectura completa de un proyecto en formato estándar de composición | SelfHosted-Web | a generar |
| NB-03 | CU-10 exportación del manifiesto propio que preserva la disposición del lienzo | SelfHosted-Web | a generar |
| NB-03 | CU-11 importación de una arquitectura exportada como proyecto nuevo | SelfHosted-Web | a generar |
| NB-03 | CU-12 ejecución programada de la exportación de proyectos y catálogo hacia un destino externo | SelfHosted-Infrastructure | a generar |

Extensión declarada de la tabla estándar. La columna `Proyecto` se agrega a las tres columnas que fija la Tabla C de `Rules-Necesidades-Negocio.md` §4.4, porque los casos de uso se generan por proyecto y esta solución se compone de cuatro. No reemplaza ninguna columna de la tabla estándar. La justificación única de la extensión está en el índice maestro §4.2.

## 8. Dependencias con otras NB

- Depende de: NB-01, porque sólo se exporta lo que está declarado como proyecto, servicio y dependencia; y NB-04, porque la salida debe describir también el origen de la imagen de cada servicio, incluidos los que se construyen.
- Es prerequisito de: ninguna otra NB de este catálogo. Es una necesidad terminal en el mapa de dependencias.

## 9. Prioridad MoSCoW

Should Have. Agrupa F-13, Should Have, y F-17, Could Have, y toma la más alta de las dos: la portabilidad es la mitigación asignada al riesgo de ausencia de redundancia de disco, mientras que la programación del respaldo es el automatismo que la vuelve confiable y puede llegar después.

## 10. Control de cambios

| Versión | Fecha | Cambios | Autor |
|---|---|---|---|
| 1.0 | 2026-07-27 | Versión inicial. Cinco criterios de éxito, ninguno derivado, y cuatro casos de uso previstos, tres sobre SelfHosted-Web y uno sobre SelfHosted-Infrastructure | Analista de Negocio Senior (AG-01) |
| 1.0 | 2026-07-27 | Correcciones del audit A-01-Necesidades-Negocio-v1.0, dentro del mismo ciclo de emisión y sin incremento de versión. P1-01: anclas de la tabla de contenido reemitidas conservando tildes. P2-01: se declara la extensión de la Tabla C con la columna `Proyecto`. P2-04: el vocabulario de hitos de §5 se unifica en fases del roadmap, eliminando la alternancia entre alcance y fase dentro de la misma tabla | Analista de Negocio Senior (AG-01) |
| 1.1 | 2026-07-28 | Propagación del SOLUTION-INTAKE v1.2. Las decisiones D-5 y D-6 incorporan las variables compartidas del proyecto, que forman parte de la arquitectura que esta necesidad exige reproducir: la §1 y el segundo criterio de §5 las agregan a lo que una exportación debe llevar y una reimportación debe conservar. Sin criterios derivados, como en la versión anterior | Analista de Negocio Senior (AG-01) |
