# CU-35 — Valor expresado como referencia a otra variable

**Proyecto:** SelfHosted Service
**Documento:** CU-35-Valor-Expresado-Como-Referencia.md
**Versión:** 1.0
**Estado:** Propuesto
**Fecha:** 2026-07-29
**Autor:** Analista Funcional Senior (AG-02)

**Necesidad de negocio upstream:** [NB-04](../../01-Necesidades-Negocio/Necesidades-De-Negocio/NB-04-Alta-De-Servicio-Sin-Copiar-Y-Adaptar.md)
**Trazabilidad upstream:** SOLUTION-INTAKE §4 capacidad F-24 y su nota (decisión D-6); anexo E-4 (la sintaxis, la forma vinculada, los ámbitos y el momento de resolución); anexo E-2 (las seis referencias del servicio 101); E-16 RN-21, RN-22, RN-23, RN-24, RN-25, RN-32, RN-33; anexo E-9, columnas de referencia y de resolución

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

Permitir que el administrador exprese el valor de una variable como una referencia a otra variable —del propio servicio, compartida del proyecto SelfHosted o de otro servicio del mismo proyecto—, resuelta antes de crear el contenedor, para no mantener el mismo valor sincronizado en varios lugares.

## 2. Actores

| Actor | Tipo | Rol |
| --- | --- | --- |
| Administrador de la solución | Primario | Escribe la referencia en el valor de una variable |
| Resolutor de referencias | Sistema | Valida el ámbito, detecta ciclos, propaga el carácter de secreto y resuelve la expresión antes de crear el contenedor |

Los nombres de los actores no humanos son **denominaciones acuñadas por esta categoría**, salvo los seis que trazan a una fuente: `Motor de contenedores`, `Destino externo`, `Automatismo de integración continua`, `Sincronizador de estado`, `Módulo de descubrimiento` y `Resolutor de referencias`. Los acuñados no son componentes declarados y no condicionan la descomposición: su correspondencia con los módulos que el intake §17.P.2 sí declara la fija 05-Arquitectura-Tecnica. La convención completa, nombre por nombre, está en [Especificacion-Funcional.md](../Especificacion-Funcional.md) §8.

## 3. Precondiciones

- Existe el servicio con la variable a editar (CU-03).
- Existe la variable apuntada, declarada o provista por el sistema.
- El administrador tiene sesión iniciada (CU-30).

## 4. Flujo principal

1. El administrador edita el valor de una variable de servicio y escribe una expresión de referencia, sola o interpolada dentro de un valor más largo.
2. El sistema valida que la referencia apunte a uno de los tres ámbitos válidos: el propio servicio, una variable compartida del proyecto SelfHosted, o una variable de otro servicio del mismo proyecto (RN-21).
3. El sistema valida que la variable apuntada exista ya al validar, y no sólo al desplegar.
4. El sistema valida que las referencias no formen un ciclo de valor (RN-22).
5. El sistema persiste la expresión sin resolver en su forma vinculada, con el identificador del servicio destino y el de la variable, de modo que renombrar cualquiera de los dos no rompa la referencia (RN-33).
6. Si la variable apuntada es secreta, la que la referencia se trata como secreta a todos los efectos (RN-23).
7. Si la referencia apunta a una variable de otro servicio, el sistema materializa o actualiza la arista correspondiente (RN-34). Ver CU-04.
8. En el despliegue, el sistema resuelve la expresión inmediatamente antes de crear el contenedor y le entrega el valor, nunca la expresión (RN-24).
9. El sistema registra el último valor resuelto y el momento de la resolución.

## 5. Flujos alternativos

**FA-01 — Referencia a una variable provista por el sistema.**
Disparador: la referencia apunta al host interno o al nombre del servicio destino.
Pasos: el sistema la resuelve según el modo de red del destino. Ninguna variable provista es secreta, de modo que no dispara la propagación del carácter de secreto (RN-32, RN-23).
Punto de retorno: paso 7.

**FA-02 — Referencia a una variable compartida del proyecto SelfHosted.**
Disparador: la referencia apunta al nivel proyecto.
Pasos: no se materializa ninguna arista, porque el proyecto no es un nodo del lienzo. El marcado de redespliegue se resuelve por la enumeración de las variables con referencia.
Punto de retorno: paso 8.

**FA-03 — Referencia dentro del propio servicio.**
Disparador: la referencia apunta a otra variable del mismo servicio.
Pasos: se resuelve igual y no genera ninguna arista.
Punto de retorno: paso 8.

**FA-04 — Renombrado del elemento referenciado.**
Disparador: se renombra el servicio destino o la variable destino.
Pasos: ninguna referencia se rompe; la interfaz muestra el nombre nuevo y no aparece ningún cambio pendiente, porque la comparación es por forma vinculada (RN-33).
Punto de retorno: paso 9.

## 6. Excepciones y errores

| Código | Causa | Respuesta del sistema |
| --- | --- | --- |
| `422` de clave inexistente | La referencia apunta a una clave que no existe en el destino | Rechazo señalando la expresión y la causa (RN-21) |
| `422` de servicio inexistente | La referencia apunta a un servicio que no existe | Rechazo señalando la expresión y la causa (RN-21) |
| `422` de servicio de otro proyecto | La referencia apunta a un servicio de otro proyecto SelfHosted | Rechazo: la referencia no cruza el límite del proyecto (RN-21) |
| `422` de ciclo de valor | Las referencias forman una cadena que vuelve sobre sí misma | Rechazo con la cadena completa del ciclo (RN-22) |
| `422` de prefijo reservado | Se declara o edita una variable propia cuya clave empieza con el prefijo de las variables provistas | Rechazo (RN-32) |
| Despliegue abortado | Una referencia no resoluble se detecta al desplegar | El despliegue de ese servicio se aborta con la causa identificada, sin afectar a los demás contenedores de la operación (RN-24, RN-31) |

## 7. Postcondiciones

**En caso de éxito:** la variable persiste su expresión sin resolver en forma vinculada como fuente de verdad y su último valor resuelto como materialización; el carácter de secreto quedó propagado cuando correspondía; el contenedor recibe valores y nunca expresiones.

**En caso de fallo:** la variable conserva su valor anterior; no se persiste ninguna expresión inválida; el rechazo identifica la expresión y su causa.

## 8. Criterios de aceptación

| ID | Given | When | Then |
| --- | --- | --- | --- |
| CA-01 | Un servicio `api` del proyecto SelfHosted 12 y un servicio `db` del mismo proyecto | El administrador escribe en `api` una referencia al host de `db` dentro de una cadena de conexión | El sistema la acepta, persiste la expresión en forma vinculada y materializa la arista con el puerto de destino registrado |
| CA-02 | Un servicio `api` del proyecto SelfHosted 12 | El administrador escribe una referencia a un servicio del proyecto SelfHosted 7 | El sistema rechaza con `422` y la causa de servicio de otro proyecto |
| CA-03 | Un servicio con dos variables que se referencian mutuamente | El administrador guarda la segunda | El sistema rechaza con `422` y devuelve la cadena completa del ciclo |
| CA-04 | Una variable compartida secreta del proyecto SelfHosted 12 | El administrador escribe en `api` una variable que la referencia | La variable resultante queda secreta, sin valor en claro, y enmascarada en toda respuesta de la API y en la interfaz |
| CA-05 | El servicio `db` referenciado por dos variables de `api` | El administrador renombra `db` a `postgres` | Ninguna referencia se rompe, los valores resueltos no cambian y no aparece ningún cambio pendiente |

## 9. Trazabilidad

| Dimensión | Referencia |
| --- | --- |
| Necesidad de negocio | [NB-04](../../01-Necesidades-Negocio/Necesidades-De-Negocio/NB-04-Alta-De-Servicio-Sin-Copiar-Y-Adaptar.md) |
| Reglas de negocio aplicables | RN-15, RN-17, RN-21, RN-22, RN-23, RN-24, RN-25, RN-27, RN-28, RN-32, RN-33, RN-34, RN-35, RN-37. Reglas conceptuales: RC-03, RC-05, RC-11, RC-16, RC-17 |
| Historias de usuario a generar en 06 | US-CU-35-1 (escribir el valor de una variable como referencia), US-CU-35-2 (referenciar una variable compartida del proyecto SelfHosted), US-CU-35-3 (obtener la propagación del carácter de secreto), US-CU-35-4 (renombrar sin romper las referencias) |
| Componentes esperados en 05 | Capa `Web`, panel de variables del servicio; capa `Application`, módulo de servicios, con el resolutor y el detector de ciclos; capa `Domain`, agregado `Servicios`; capa `Infrastructure`, `Persistencia` y `Contenedores`, donde ocurre la resolución previa a crear el contenedor. Referencia tentativa |
| Tests previstos en 08 | T-34, T-35 (ámbito inválido); T-36, T-52 (ciclo de valor); T-37 (propagación del secreto); T-38 (resolución antes de crear el contenedor); T-49 (prefijo reservado); T-55, T-58 (renombrado); T-51 (servicio llamado como el ámbito compartido) |

Los identificadores de historia de usuario llevan la forma `US-CU-XX-n` y son **provisionales**: la numeración definitiva es potestad de 06-Backlog-Tecnico. La forma se eligió para que ningún identificador emitido acá colisione con la numeración que 06 asigne.

## 10. Notas y supuestos

- Trazar la flecha en el lienzo y escribir la referencia a mano producen el mismo objeto: una referencia común. No hay dos clases de vínculo.
- La forma legible, sin el marcador del vínculo interno, es la que se escribe, la que se muestra y la que se exporta al manifiesto propio. Dos expresiones se comparan por su forma vinculada.
- El puerto no se referencia: se escribe literal, y la arista lo registra como registro de dependencia. Es la decisión D-9 y D-10.
- Las reglas RN-22, RN-23 y RN-25 llevan marcador `[D-i]` completo y siguen sin revisar; la exigibilidad de RN-21, RN-32 y RN-33 también. Se consumen declarándolas revisables.
- La capacidad F-24 es `Should Have` y su asignación a un alcance concreto figura como pendiente del intake.

## 11. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 1.0 | 2026-07-29 | Corrección absorbida dentro de la versión 1.0, sin subirla y sin archivar, por la política de versionado de `Master-Prompt.md` §5: el documento está en estado `Propuesto` y la corrección proviene del audit de su propia fase de emisión. §2 suma la declaración de que los nombres de los actores no humanos son denominaciones acuñadas por esta categoría y no componentes declarados, con la salvedad de los seis que sí trazan a una fuente. Ningún actor cambia de nombre y ningún flujo se altera: lo que se corrige es que la categoría afirmaba que todo dato trazaba y trece de los diecinueve nombres de actor no humano no lo cumplían. Origen: hallazgo H-04 del informe [Audit/B-02-03-r1.md](../../Audit/B-02-03-r1.md) |
| 1.0 | 2026-07-29 | Versión inicial, derivada de la necesidad de negocio upstream y de las secciones del intake citadas en la cabecera |

