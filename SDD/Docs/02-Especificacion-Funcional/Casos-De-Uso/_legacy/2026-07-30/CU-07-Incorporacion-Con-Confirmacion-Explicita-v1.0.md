# CU-07 — Incorporación de un contenedor existente con confirmación explícita

**Proyecto:** SelfHosted Service
**Documento:** CU-07-Incorporacion-Con-Confirmacion-Explicita.md
**Versión:** 1.0
**Estado:** Propuesto
**Fecha:** 2026-07-29
**Autor:** Analista Funcional Senior (AG-02)

**Necesidad de negocio upstream:** [NB-02](../../01-Necesidades-Negocio/Necesidades-De-Negocio/NB-02-Adoptabilidad-Del-Parque-Existente.md)
**Trazabilidad upstream:** SOLUTION-INTAKE §4 capacidad F-11; §6 flujo 2; anexo E-11 (los cuatro pasos del flujo y la carga útil de la clasificación); anexo E-15, endpoint de incorporación y su nota; §7 CL-08 y CL-15; §17.P.5; E-16 RN-02, RN-11, RN-15, RN-29

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

Permitir que el administrador incorpore a un proyecto SelfHosted un contenedor que ya está corriendo, sin recrearlo ni cortar el servicio, pasando obligatoriamente por la clasificación de sus variables para que ningún secreto quede importado en claro.

## 2. Actores

| Actor | Tipo | Rol |
| --- | --- | --- |
| Administrador de la solución | Primario | Elige el candidato, clasifica sus variables y confirma la incorporación |
| Módulo de incorporación | Sistema | Importa la configuración observada, exige la clasificación y crea el servicio vinculado al contenedor existente |
| Motor de contenedores | Sistema | Es la fuente de la configuración observada; el contenedor no se recrea |

Los nombres de los actores no humanos son **denominaciones acuñadas por esta categoría**, salvo los seis que trazan a una fuente: `Motor de contenedores`, `Destino externo`, `Automatismo de integración continua`, `Sincronizador de estado`, `Módulo de descubrimiento` y `Resolutor de referencias`. Los acuñados no son componentes declarados y no condicionan la descomposición: su correspondencia con los módulos que el intake §17.P.2 sí declara la fija 05-Arquitectura-Tecnica. La convención completa, nombre por nombre, está en [Especificacion-Funcional.md](../Especificacion-Funcional.md) §8.

## 3. Precondiciones

- El administrador tiene sesión iniciada (CU-30).
- Existe el proyecto SelfHosted destino (CU-01).
- El contenedor figura como candidato incorporable en el descubrimiento (CU-06).

## 4. Flujo principal

1. El administrador elige un candidato del listado de descubrimiento.
2. El sistema importa la configuración observada del contenedor: imagen, red, dirección, montajes, dispositivos y variables (regla RA-02).
3. El sistema presenta el paso obligatorio de clasificación de variables: todas las variables importadas, con las que la heurística sugiere ya premarcadas como secretas (RN-29, regla RA-06).
4. El administrador marca o desmarca las variables que corresponda. La heurística sugiere; el administrador decide.
5. El administrador confirma la clasificación.
6. El sistema verifica que el contenedor no esté ya incorporado por otro proyecto SelfHosted (RN-11) y que el servicio pertenezca a un único proyecto (RN-02).
7. El sistema crea el servicio vinculado al contenedor existente por su identificador, sin recrearlo (regla RA-03).
8. El sistema persiste lo confirmado como secreto cifrado en reposo, con recarga manual pendiente, y lo no marcado como valor literal.
9. El sistema persiste la traza de la clasificación: quién la confirmó, cuándo, qué sugirió la heurística, qué marcó y qué desmarcó el administrador.
10. El sistema registra el evento de auditoría (RN-17) y el nodo aparece en el lienzo ya activo.

## 5. Flujos alternativos

**FA-01 — Contenedor que monta el punto de acceso del motor, forzado.**
Disparador: el candidato está marcado no incorporable por montar el punto de acceso del motor y el administrador decide forzarlo.
Pasos: el sistema exige confirmación explícita escribiendo el nombre antes de continuar (regla RA-04, salvaguardas de §17.P.5).
Punto de retorno: paso 2.

**FA-02 — Clasificación abandonada.**
Disparador: el administrador abandona el paso de clasificación sin confirmarlo.
Pasos: el sistema no crea el servicio y el contenedor sigue sin incorporar.
Punto de retorno: CU-06.

**FA-03 — Primer redespliegue posterior.**
Disparador: el administrador pide el primer redespliegue del servicio incorporado.
Pasos: la configuración importada se materializa de nuevo. Ese primer redespliegue sí implica corte y la interfaz debe advertirlo con esas palabras.
Punto de retorno: CU-13.

## 6. Excepciones y errores

| Código | Causa | Respuesta del sistema |
| --- | --- | --- |
| `422` de clasificación ausente | Se intenta confirmar la incorporación sin enviar la clasificación de variables | Rechazo: el servicio no se crea y el contenedor sigue sin incorporar (RN-29). El código `422` es especificación derivada DI-09, sin revisar |
| `409` de pertenencia | El contenedor ya fue incorporado por otro proyecto SelfHosted | Rechazo (RN-02, RN-11) |
| `422` sobre el nombre | El nombre derivado del contenedor no cumple el formato o ya existe en el proyecto destino | Rechazo con el campo señalado (RN-01) |
| Motor inalcanzable | El punto de acceso del motor no responde durante la importación | El sistema informa el error traducido a una causa propia y no crea el servicio |

## 7. Postcondiciones

**En caso de éxito:** existe un servicio dentro del proyecto SelfHosted, vinculado por identificador al contenedor preexistente, que no fue recreado ni interrumpido; las variables clasificadas como secretas están cifradas en reposo y con recarga manual pendiente; la traza de la clasificación queda persistida y es auditable; existe el evento de auditoría.

**En caso de fallo:** el servicio no se crea, el contenedor sigue corriendo sin incorporar y sin modificaciones, y ninguna variable se persiste.

## 8. Criterios de aceptación

| ID | Given | When | Then |
| --- | --- | --- | --- |
| CA-01 | El contenedor `bot-mensajeria`, con la variable `ClaveMaestra` que la heurística no detecta | El administrador la marca como secreta en el paso de clasificación y confirma | El servicio se crea con esa variable cifrada en reposo y con recarga manual pendiente; su valor no se persiste en claro ni se devuelve por la API, y la traza registra que el administrador la marcó |
| CA-02 | El mismo contenedor | El administrador intenta confirmar la incorporación sin enviar la clasificación de variables | El sistema rechaza con `422`, el servicio no se crea y el contenedor sigue sin incorporar |
| CA-03 | El contenedor `print-server`, con la variable `ADMIN_TOKEN` premarcada por la heurística | El administrador confirma sin tocarla | La variable queda importada enmascarada y marcada para recarga manual; el valor no se persiste en claro |
| CA-04 | El contenedor `print-server`, en ejecución, con su montaje de datos | El administrador completa la incorporación | El contenedor no se recrea en ningún momento del flujo, el servicio queda activo sin corte y el nodo aparece en el lienzo ya activo |

## 9. Trazabilidad

| Dimensión | Referencia |
| --- | --- |
| Necesidad de negocio | [NB-02](../../01-Necesidades-Negocio/Necesidades-De-Negocio/NB-02-Adoptabilidad-Del-Parque-Existente.md) |
| Reglas de negocio aplicables | RN-01, RN-02, RN-11, RN-15, RN-17, RN-29. Reglas conceptuales: RC-02, RC-16, RC-17 |
| Historias de usuario a generar en 06 | US-CU-07-1 (elegir un candidato e importar su configuración observada), US-CU-07-2 (clasificar las variables importadas antes de confirmar), US-CU-07-3 (incorporar sin recrear el contenedor), US-CU-07-4 (consultar la traza de la clasificación confirmada) |
| Componentes esperados en 05 | Capa `Web`, página de incorporación y controlador del recurso; capa `Application`, módulo de descubrimiento y adopción; capa `Domain`, agregado `Servicios`; capa `Infrastructure`, `Contenedores` y `Persistencia`. Referencia tentativa |
| Tests previstos en 08 | T-32 (marcar una variable que la heurística no detectó); T-33 (confirmar sin clasificación); T-17, T-17b (sugerencia de la heurística); T-15 (contenedor ya incorporado) |

Los identificadores de historia de usuario llevan la forma `US-CU-XX-n` y son **provisionales**: la numeración definitiva es potestad de 06-Backlog-Tecnico. La forma se eligió para que ningún identificador emitido acá colisione con la numeración que 06 asigne.

## 10. Notas y supuestos

- El flujo tiene cuatro pasos y no tres: descubrir, elegir, clasificar y confirmar. El tercero es obligatorio por decisión D-2 y no es una pantalla que se pueda saltear.
- El código `422` del rechazo por clasificación ausente es especificación derivada DI-09, sin revisar. Se consume declarándola revisable. El que el servicio no se cree es decisión del agente humano y no derivación.
- El cambio de contrato del endpoint de incorporación debe entrar antes de la primera publicación de la versión 1 de la API o abrir una versión nueva (DI-11, sin revisar). Es materia de 05-Arquitectura-Tecnica.
- **Brecha declarada:** el anexo E-18 registra como pendiente el maquetado del paso de clasificación de variables. Destinatario: 03-UX-UI-DX.

## 11. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 1.0 | 2026-07-29 | Corrección absorbida dentro de la versión 1.0, sin subirla y sin archivar, por la política de versionado de `Master-Prompt.md` §5: el documento está en estado `Propuesto` y la corrección proviene del audit de su propia fase de emisión. §2 suma la declaración de que los nombres de los actores no humanos son denominaciones acuñadas por esta categoría y no componentes declarados, con la salvedad de los seis que sí trazan a una fuente. Ningún actor cambia de nombre y ningún flujo se altera: lo que se corrige es que la categoría afirmaba que todo dato trazaba y trece de los diecinueve nombres de actor no humano no lo cumplían. Origen: hallazgo H-04 del informe [Audit/B-02-03-r1.md](../../Audit/B-02-03-r1.md) |
| 1.0 | 2026-07-29 | Versión inicial, derivada de la necesidad de negocio upstream y de las secciones del intake citadas en la cabecera |

## 13. Interacción multiusuario y concurrencia

Sección opcional admitida por §4.3 de `Rules-Especificacion-Funcional.md` para el tipo `web-monolith`. Conserva el número que esa sección le asigna, de modo que la numeración salta del 11 al 13 por construcción de la regla y no por omisión.

El intake declara que el contenedor no se recrea en ningún momento del flujo. La incorporación no interrumpe el servicio que ya corre, que es la condición de adoptabilidad que NB-02 describe.

