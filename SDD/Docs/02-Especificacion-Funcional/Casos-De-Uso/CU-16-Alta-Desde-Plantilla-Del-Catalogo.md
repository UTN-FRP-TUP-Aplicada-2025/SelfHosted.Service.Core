# CU-16 — Alta desde plantilla del catálogo, con creación del conjunto completo

**Proyecto:** SelfHosted Service
**Documento:** CU-16-Alta-Desde-Plantilla-Del-Catalogo.md
**Versión:** 1.0
**Estado:** Propuesto
**Fecha:** 2026-07-29
**Autor:** Analista Funcional Senior (AG-02)

**Necesidad de negocio upstream:** [NB-04](../../01-Necesidades-Negocio/Necesidades-De-Negocio/NB-04-Alta-De-Servicio-Sin-Copiar-Y-Adaptar.md)
**Trazabilidad upstream:** SOLUTION-INTAKE §4 capacidad F-14 y su nota (decisión D-7); anexo E-6 (el ítem como subgrafo parametrizado y su envoltorio); anexo E-15, endpoint de instanciación; E-16 RN-01, RN-21, RN-22, RN-30, RN-36, RN-37; §17.P.2, invariante I2

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

Permitir que el administrador dé de alta un conjunto de servicios instanciando un ítem del catálogo con sus parámetros, creando de una sola vez los servicios, sus contenedores y los enlaces entre ellos, para que resolver algo una vez alcance y no haya que volver a copiar y adaptar.

## 2. Actores

| Actor | Tipo | Rol |
| --- | --- | --- |
| Administrador de la solución | Primario | Elige el ítem, declara sus parámetros y confirma la instanciación |
| Módulo de catálogo | Sistema | Resuelve los parámetros, crea los N servicios, sus enlaces y sus variables compartidas, y emite los avisos de higiene |

Los nombres de los actores no humanos son **denominaciones acuñadas por esta categoría**, salvo los seis que trazan a una fuente: `Motor de contenedores`, `Destino externo`, `Automatismo de integración continua`, `Sincronizador de estado`, `Módulo de descubrimiento` y `Resolutor de referencias`. Los acuñados no son componentes declarados y no condicionan la descomposición: su correspondencia con los módulos que el intake §17.P.2 sí declara la fija 05-Arquitectura-Tecnica. La convención completa, nombre por nombre, está en [Especificacion-Funcional.md](../Especificacion-Funcional.md) §8.

## 3. Precondiciones

- Existe el proyecto SelfHosted destino (CU-01).
- El catálogo tiene al menos un ítem declarado (CU-17).
- El administrador tiene sesión iniciada (CU-30).

## 4. Flujo principal

1. El administrador elige un ítem del catálogo y pide instanciarlo en el proyecto SelfHosted abierto.
2. El sistema presenta los parámetros que el ítem declara.
3. El administrador declara los valores de los parámetros y confirma.
4. El sistema resuelve los huecos de parámetro del subgrafo. Ninguna expresión persistida conserva un hueco de parámetro sin resolver.
5. El sistema crea un servicio y un contenedor por cada nodo del subgrafo. Ningún servicio instanciado comparte contenedor con otro (RN-30, invariante I2).
6. Si el nombre de un servicio del subgrafo ya existe en el proyecto destino, el sistema lo sufija automáticamente e informa qué sufijó; no rechaza y no pregunta (RN-36).
7. El sistema crea las variables compartidas que la plantilla declara y las referencias del subgrafo, validando su ámbito (RN-21) y la ausencia de ciclos de valor (RN-22).
8. El sistema crea los enlaces entre los servicios del subgrafo con su espera declarada (RN-34).
9. El sistema emite los avisos de higiene que correspondan, sin bloquear la operación (RN-37).
10. El sistema registra el evento de auditoría (RN-17).

## 5. Flujos alternativos

**FA-01 — Clave compartida que ya existe con el mismo valor.**
Disparador: la plantilla declara una clave compartida que el proyecto SelfHosted ya tiene con idéntico valor.
Pasos: el sistema crea el objeto nuevo y advierte que probablemente convenga compartir, ofreciendo reusar. La operación no se bloquea (RN-37).
Punto de retorno: paso 9.

**FA-02 — Clave compartida que ya existe con distinto valor.**
Disparador: la plantilla declara una clave compartida que el proyecto ya tiene con otro valor.
Pasos: se crean separadas y se avisa; no se ofrece reusar, porque casi seguro son cosas distintas (RN-37).
Punto de retorno: paso 9.

**FA-03 — Ítem de un solo servicio.**
Disparador: el ítem contiene un subgrafo de un solo nodo y ninguna arista, que es el caso frecuente.
Pasos: se crea un servicio y un contenedor, sin enlaces.
Punto de retorno: paso 7.

**FA-04 — Ítem de una versión de formato anterior.**
Disparador: el ítem proviene de un catálogo importado con la versión de formato previa.
Pasos: se convierte de forma determinista envolviendo su plantilla en un subgrafo de un nodo, sin pérdida.
Punto de retorno: paso 4.

## 6. Excepciones y errores

| Código | Causa | Respuesta del sistema |
| --- | --- | --- |
| `422` sobre el nombre | Un nombre resuelto no cumple el formato de nombre de servicio | Rechazo con el campo señalado (RN-01). El nombre que ya existe no es este caso: se sufija sin rechazar (RN-36) |
| `422` de referencia inválida | Una referencia del subgrafo apunta a una clave o a un servicio inexistente, o a un servicio de otro proyecto SelfHosted | Rechazo señalando la expresión y la causa (RN-21) |
| `422` de ciclo de valor | Las referencias del subgrafo forman una cadena que vuelve sobre sí misma | Rechazo con la cadena completa del ciclo (RN-22) |
| Aviso no bloqueante | Una clave compartida del subgrafo ya existe en el proyecto destino | Se crea el objeto nuevo y el sistema advierte. Ninguna condición de higiene bloquea (RN-37) |

## 7. Postcondiciones

**En caso de éxito:** existen N servicios y N contenedores en el proyecto SelfHosted, uno por cada nodo del subgrafo, con sus enlaces y sus variables compartidas; ninguna expresión persistida conserva un hueco de parámetro; los avisos de higiene emitidos no bloquearon nada; existe el evento de auditoría.

**En caso de fallo:** no queda un subgrafo a medio instanciar; el proyecto SelfHosted conserva su estado previo y el rechazo identifica la expresión o el campo que lo produjo.

## 8. Criterios de aceptación

| ID | Given | When | Then |
| --- | --- | --- | --- |
| CA-01 | Un ítem con dos servicios y una arista entre ellos, instanciado con un parámetro de identificador, en un proyecto SelfHosted que no tiene la clave compartida que declara | El administrador lo instancia | Se crean dos servicios, dos contenedores, una arista con espera declarada que referencia el host y registra el puerto de destino, y la variable compartida con sus dos referencias resueltas |
| CA-02 | El mismo ítem, en un proyecto SelfHosted que ya tiene un servicio con el nombre resultante | El administrador lo instancia | El servicio se crea con nombre sufijado y el sistema informa cuál asignó; no rechaza y no pregunta |
| CA-03 | Un proyecto SelfHosted que ya tiene una variable compartida con la misma clave y el mismo valor que la plantilla declara | El administrador instancia el ítem | Se crea el objeto nuevo y el sistema advierte que probablemente convenga compartir, ofreciendo reusar, sin bloquear |
| CA-04 | El mismo caso con valores distintos | El administrador instancia el ítem | Se crean separadas, el sistema avisa y no ofrece reusar |
| CA-05 | Un ítem con dos nodos | El administrador lo instancia | Ningún contenedor aloja más de un servicio: se crean tantos contenedores como nodos |

## 9. Trazabilidad

| Dimensión | Referencia |
| --- | --- |
| Necesidad de negocio | [NB-04](../../01-Necesidades-Negocio/Necesidades-De-Negocio/NB-04-Alta-De-Servicio-Sin-Copiar-Y-Adaptar.md) |
| Reglas de negocio aplicables | RN-01, RN-02, RN-17, RN-21, RN-22, RN-24, RN-30, RN-34, RN-36, RN-37. Reglas conceptuales: RC-02, RC-04, RC-14, RC-17 |
| Historias de usuario a generar en 06 | US-CU-16-1 (instanciar un ítem del catálogo con sus parámetros), US-CU-16-2 (obtener el aviso del nombre sufijado), US-CU-16-3 (recibir los avisos de higiene sin que bloqueen la instanciación) |
| Componentes esperados en 05 | Capa `Web`, página del catálogo y controlador de instanciación; capa `Application`, módulo de catálogo; capa `Domain`, agregado `Catalogo`; capa `Infrastructure`, `Persistencia`. Referencia tentativa |
| Tests previstos en 08 | T-43 (instanciación del ítem multi-servicio); T-60 (nombre sufijado); T-61, T-62 (clave compartida con el mismo y con distinto valor) |

Los identificadores de historia de usuario llevan la forma `US-CU-XX-n` y son **provisionales**: la numeración definitiva es potestad de 06-Backlog-Tecnico. La forma se eligió para que ningún identificador emitido acá colisione con la numeración que 06 asigne.

## 10. Notas y supuestos

- El catálogo es la cuarta vía de alta de un servicio, no un cuarto origen: un ítem es una plantilla que al instanciarse resuelve a una de las tres variantes de origen. Es decisión declarada D-7.
- Nada del catálogo corre: sus ítems no tienen despliegue, no tienen contenedor, no ocupan dirección y no aparecen en ningún lienzo hasta instanciarse.
- Conviven tres sintaxis con su orden de resolución por etapas: el hueco de parámetro del instanciador, la expresión de referencia del modelo y la interpolación del formato de composición. El intake lo declara en el anexo E-6.
- La capacidad F-14 es `Should Have` por declaración del intake §4.

## 11. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 1.0 | 2026-07-29 | Corrección absorbida dentro de la versión 1.0, sin subirla y sin archivar, por la política de versionado de `Master-Prompt.md` §5: el documento está en estado `Propuesto` y la corrección proviene del audit de su propia fase de emisión. §2 suma la declaración de que los nombres de los actores no humanos son denominaciones acuñadas por esta categoría y no componentes declarados, con la salvedad de los seis que sí trazan a una fuente. Ningún actor cambia de nombre y ningún flujo se altera: lo que se corrige es que la categoría afirmaba que todo dato trazaba y trece de los diecinueve nombres de actor no humano no lo cumplían. Origen: hallazgo H-04 del informe [Audit/B-02-03-r1.md](../../Audit/B-02-03-r1.md) |
| 1.0 | 2026-07-29 | Versión inicial, derivada de la necesidad de negocio upstream y de las secciones del intake citadas en la cabecera |

