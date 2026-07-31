> **Bloque de archivado.** Estado: `Superado`. Copia completa y autocontenida de la versión 1.0 de `CU-03-Alta-Y-Configuracion-De-Servicio.md`, tomada el 2026-07-29 antes de incorporar a la especificación las definiciones de alta y configuración de servicios y de ítems del catálogo que `SDD/Estado/Redefinicion-Servicio.md` v2.0 establece en su parte normativa (§16 a §23). La versión vigente es `../../CU-03-Alta-Y-Configuracion-De-Servicio.md`. El cuerpo de este snapshot no se modifica.

# CU-03 — Alta y configuración completa de un servicio

**Proyecto:** SelfHosted Service
**Documento:** CU-03-Alta-Y-Configuracion-De-Servicio.md
**Versión:** 1.0
**Estado:** Propuesto
**Fecha:** 2026-07-29
**Autor:** Analista Funcional Senior (AG-02)

**Necesidad de negocio upstream:** [NB-01](../../01-Necesidades-Negocio/Necesidades-De-Negocio/NB-01-Visibilidad-Unificada-De-La-Arquitectura.md)
**Trazabilidad upstream:** SOLUTION-INTAKE §4 capacidad F-03; anexo E-2 (las cuatro formas del servicio y sus ocho dimensiones); anexo E-19 (los patrones del parque real que el alta debe soportar); anexo E-15, endpoints de alta y edición de servicio; E-16 RN-01, RN-02, RN-06, RN-07, RN-08, RN-10, RN-19, RN-28, RN-32

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

Permitir que el administrador declare un servicio dentro de un proyecto SelfHosted con todas las dimensiones que el parque real exige —origen, red, variables, puertos, montajes, dispositivos, capacidades, recursos, política de reinicio y marca de efímero—, de modo que el alta deje de ser un ejercicio de copiar y adaptar un archivo suelto.

## 2. Actores

| Actor | Tipo | Rol |
| --- | --- | --- |
| Administrador de la solución | Primario | Declara y edita la configuración del servicio |
| Registro de la solución | Sistema | Valida las reglas de nombre, red, recursos y variables, y persiste la configuración |

Los nombres de los actores no humanos son **denominaciones acuñadas por esta categoría**, salvo los seis que trazan a una fuente: `Motor de contenedores`, `Destino externo`, `Automatismo de integración continua`, `Sincronizador de estado`, `Módulo de descubrimiento` y `Resolutor de referencias`. Los acuñados no son componentes declarados y no condicionan la descomposición: su correspondencia con los módulos que el intake §17.P.2 sí declara la fija 05-Arquitectura-Tecnica. La convención completa, nombre por nombre, está en [Especificacion-Funcional.md](../Especificacion-Funcional.md) §8.

## 3. Precondiciones

- Existe el proyecto SelfHosted en el que se declara el servicio (CU-01).
- El administrador tiene sesión iniciada (CU-30).

## 4. Flujo principal

1. El administrador solicita agregar un servicio al proyecto SelfHosted abierto.
2. El sistema presenta las dimensiones del servicio que el anexo E-2 declara.
3. El administrador declara el nombre del servicio, que es también su alias de resolución de nombres dentro de la red del proyecto.
4. El administrador elige el origen: imagen de registro, repositorio remoto o Dockerfile local.
5. El administrador declara el modo de red del servicio y, si corresponde, su dirección fija y su interfaz padre.
6. El administrador declara variables, puertos, montajes, dispositivos, capacidades, límites de procesador y memoria, política de reinicio, verificación de salud y marca de efímero.
7. El administrador confirma.
8. El sistema valida el nombre (RN-01), la pertenencia al proyecto (RN-02), la dirección declarada (RN-06), la compatibilidad de puertos con el modo de red (RN-07), los datos del origen repositorio (RN-08), los límites contra los recursos del host (RN-19) y las claves de las variables (RN-28, RN-32).
9. El sistema persiste el servicio y lo agrega al conjunto de cambios pendientes del proyecto (RN-13 en su consecuencia posterior).
10. El sistema registra el evento de auditoría (RN-17).

## 5. Flujos alternativos

**FA-01 — Edición de un servicio ya declarado.**
Disparador: el administrador modifica un servicio existente en lugar de crear uno nuevo.
Pasos: se repiten los pasos 5 a 10 sobre el servicio elegido; el cambio entra al conjunto de cambios pendientes y marca el servicio como pendiente de redespliegue.
Punto de retorno: paso 10.

**FA-02 — Origen por repositorio remoto.**
Disparador: en el paso 4 el administrador elige el origen repositorio.
Pasos: el sistema exige además la ruta del archivo de construcción y la rama (RN-08).
Punto de retorno: paso 5.

**FA-03 — Eliminación del servicio.**
Disparador: el administrador solicita eliminar un servicio declarado.
Pasos: el sistema pide confirmación escribiendo el nombre del servicio y ofrece conservar los volúmenes (RN-10).
Punto de retorno: el lienzo del proyecto SelfHosted.

## 6. Excepciones y errores

| Código | Causa | Respuesta del sistema |
| --- | --- | --- |
| `422` sobre el nombre | Nombre con mayúsculas, espacios, más de 32 caracteres o duplicado dentro del proyecto | Rechazo con el campo del nombre señalado (RN-01) |
| `409` de pertenencia | El servicio ya pertenece a otro proyecto SelfHosted | Rechazo (RN-02) |
| `422` de dirección | Dirección fuera del rango gestionado o declarada excluida | Rechazo con la siguiente dirección libre sugerida (RN-06) |
| `422` de puerto en macvlan | Se declara un puerto publicado sobre un servicio en macvlan | Rechazo; en la interfaz el campo aparece deshabilitado (RN-07) |
| `422` de origen repositorio | Falta la ruta del archivo de construcción o la rama | Rechazo (RN-08) |
| `422` de límite | El límite de memoria o de procesador excede los recursos declarados del host | Rechazo con el máximo admisible (RN-19) |
| `422` de clave de variable | Clave duplicada dentro del mismo servicio, o clave con el prefijo reservado del sistema | Rechazo (RN-28, RN-32) |

## 7. Postcondiciones

**En caso de éxito:** el servicio queda declarado dentro de su proyecto SelfHosted con las dimensiones que el administrador definió; el cambio figura en el conjunto de cambios pendientes; el nodo aparece en el lienzo en estado pendiente de aplicar; existe el evento de auditoría.

**En caso de fallo:** no se persiste ninguna configuración parcial; el proyecto SelfHosted queda como estaba y el rechazo identifica el campo y la regla que lo produjo.

## 8. Criterios de aceptación

| ID | Given | When | Then |
| --- | --- | --- | --- |
| CA-01 | Un proyecto SelfHosted sin ningún servicio llamado `print-server` | El administrador declara un servicio con nombre `print-server` | El sistema acepta el nombre y crea el servicio |
| CA-02 | El mismo proyecto, que ya tiene el servicio `print-server` | El administrador declara un segundo servicio `print-server` | El sistema rechaza con `422` señalando el nombre duplicado |
| CA-03 | Un servicio en macvlan con la dirección fija `192.168.1.139` | El administrador le agrega un puerto publicado en el host | El sistema rechaza con `422` y en la interfaz el campo aparece deshabilitado |
| CA-04 | Un host con 32 GB de memoria declarada | El administrador fija un límite de memoria de 64 GB para el servicio | El sistema rechaza con `422` e informa el máximo admisible |
| CA-05 | Un servicio con una variable declarada | El administrador declara en el mismo servicio una variable con clave `SELFHOSTED_HOST` | El sistema rechaza con `422`: el prefijo está reservado para las variables provistas por el sistema |

## 9. Trazabilidad

| Dimensión | Referencia |
| --- | --- |
| Necesidad de negocio | [NB-01](../../01-Necesidades-Negocio/Necesidades-De-Negocio/NB-01-Visibilidad-Unificada-De-La-Arquitectura.md) |
| Reglas de negocio aplicables | RN-01, RN-02, RN-06, RN-07, RN-08, RN-10, RN-17, RN-19, RN-27, RN-28, RN-32, RN-33, RN-35. Reglas conceptuales: RC-02, RC-03, RC-15, RC-16, RC-17 |
| Historias de usuario a generar en 06 | US-CU-03-1 (declarar un servicio con su origen), US-CU-03-2 (declarar el modo de red y la dirección del servicio), US-CU-03-3 (declarar variables, montajes, dispositivos y límites), US-CU-03-4 (editar un servicio ya declarado), US-CU-03-5 (eliminar un servicio con confirmación escrita) |
| Componentes esperados en 05 | Capa `Web`, controlador del recurso de servicios y panel lateral del servicio; capa `Application`, módulo de servicios y despliegues, con sus validadores; capa `Domain`, agregado `Servicios`; capa `Infrastructure`, `Persistencia`. Referencia tentativa |
| Tests previstos en 08 | T-01, T-02, T-03, T-04 (nombre); T-08, T-09 (dirección); T-10 (puerto en macvlan); T-20 (límite); T-49 (prefijo reservado). Casos declarados en el anexo E-22 |

Los identificadores de historia de usuario llevan la forma `US-CU-XX-n` y son **provisionales**: la numeración definitiva es potestad de 06-Backlog-Tecnico. La forma se eligió para que ningún identificador emitido acá colisione con la numeración que 06 asigne.

## 10. Notas y supuestos

- El alta no puede limitarse a imagen, puertos y variables: el anexo E-19 declara los patrones del parque real que obligan a las ocho dimensiones, y el anexo E-2 las refleja.
- **Brecha declarada:** RN-08 no tiene caso ejecutable propio en el anexo E-22. Destinatario: 08-Calidad-Y-Pruebas.
- **Brecha declarada:** RN-10 no tiene caso ejecutable propio en el anexo E-22. Destinatario: 08-Calidad-Y-Pruebas.
- El detalle visual del panel de configuración pertenece a 03-UX-UI-DX.

## 11. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 1.0 | 2026-07-29 | Corrección absorbida dentro de la versión 1.0, sin subirla y sin archivar, por la política de versionado de `Master-Prompt.md` §5: el documento está en estado `Propuesto` y la corrección proviene del audit de su propia fase de emisión. §2 suma la declaración de que los nombres de los actores no humanos son denominaciones acuñadas por esta categoría y no componentes declarados, con la salvedad de los seis que sí trazan a una fuente. Ningún actor cambia de nombre y ningún flujo se altera: lo que se corrige es que la categoría afirmaba que todo dato trazaba y trece de los diecinueve nombres de actor no humano no lo cumplían. Origen: hallazgo H-04 del informe [Audit/B-02-03-r1.md](../../Audit/B-02-03-r1.md) |
| 1.0 | 2026-07-29 | Versión inicial, derivada de la necesidad de negocio upstream y de las secciones del intake citadas en la cabecera |

## 13. Interacción multiusuario y concurrencia

Sección opcional admitida por §4.3 de `Rules-Especificacion-Funcional.md` para el tipo `web-monolith`. Conserva el número que esa sección le asigna, de modo que la numeración salta del 11 al 13 por construcción de la regla y no por omisión.

El servicio no tiene estado de encendido: es configuración, y su ciclo de vida vive en el despliegue. Editar un servicio ya desplegado no lo reemplaza en el acto: el cambio entra al conjunto de cambios pendientes y el reemplazo ocurre al aplicarlo (CU-24).

