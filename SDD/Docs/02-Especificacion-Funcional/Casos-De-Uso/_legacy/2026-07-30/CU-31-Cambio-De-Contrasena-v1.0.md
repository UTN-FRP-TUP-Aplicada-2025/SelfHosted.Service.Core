# CU-31 — Cambio de contraseña

**Proyecto:** SelfHosted Service
**Documento:** CU-31-Cambio-De-Contrasena.md
**Versión:** 1.0
**Estado:** Propuesto
**Fecha:** 2026-07-29
**Autor:** Analista Funcional Senior (AG-02)

**Necesidad de negocio upstream:** [NB-08](../../01-Necesidades-Negocio/Necesidades-De-Negocio/NB-08-Control-De-Acceso-Y-Credenciales-De-Maquina.md)
**Trazabilidad upstream:** SOLUTION-INTAKE §4 capacidad F-01; §6 flujo 4, que declara que el cambio exige la contraseña actual; §17.P.5, contraseña almacenada con una función de derivación de clave; §9 exclusión 7

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

Permitir que el administrador cambie su contraseña desde el menú de usuario, exigiendo la contraseña actual, para que la credencial del panel que gobierna el servidor pueda rotarse sin depender de un mecanismo de recuperación que el producto no tiene.

## 2. Actores

| Actor | Tipo | Rol |
| --- | --- | --- |
| Administrador de la solución | Primario | Declara su contraseña actual y la nueva |
| Registro de la solución | Sistema | Verifica la contraseña actual, valida la nueva y la almacena derivada |

Los nombres de los actores no humanos son **denominaciones acuñadas por esta categoría**, salvo los seis que trazan a una fuente: `Motor de contenedores`, `Destino externo`, `Automatismo de integración continua`, `Sincronizador de estado`, `Módulo de descubrimiento` y `Resolutor de referencias`. Los acuñados no son componentes declarados y no condicionan la descomposición: su correspondencia con los módulos que el intake §17.P.2 sí declara la fija 05-Arquitectura-Tecnica. La convención completa, nombre por nombre, está en [Especificacion-Funcional.md](../Especificacion-Funcional.md) §8.

## 3. Precondiciones

- Existe un administrador declarado (CU-29).
- El administrador tiene sesión iniciada (CU-30).

## 4. Flujo principal

1. El administrador abre el cambio de contraseña desde el menú de usuario de la barra superior.
2. El administrador declara su contraseña actual.
3. El administrador declara la contraseña nueva.
4. El sistema verifica la contraseña actual contra la almacenada de forma derivada.
5. El sistema valida la contraseña nueva según las condiciones declaradas.
6. El sistema almacena la contraseña nueva con una función de derivación de clave.
7. El sistema registra el evento de auditoría (RN-17).

## 5. Flujos alternativos

**FA-01 — Contraseña actual incorrecta.**
Disparador: la contraseña actual declarada no coincide.
Pasos: el sistema rechaza el cambio y no modifica la credencial.
Punto de retorno: paso 2.

**FA-02 — Contraseña nueva que no cumple las condiciones.**
Disparador: la contraseña nueva no supera la validación.
Pasos: el sistema la rechaza y vuelve a pedirla.
Punto de retorno: paso 3.

## 6. Excepciones y errores

| Código | Causa | Respuesta del sistema |
| --- | --- | --- |
| `422` de contraseña actual incorrecta | La contraseña actual declarada no coincide con la almacenada | Rechazo; la credencial no se modifica |
| `422` de contraseña nueva inválida | La contraseña nueva no cumple las condiciones de validación declaradas | Rechazo; la credencial no se modifica |
| Cambio sin contraseña actual | Se intenta cambiar la contraseña sin declarar la actual | Prohibido: el intake declara explícitamente que el cambio exige la contraseña actual |

## 7. Postcondiciones

**En caso de éxito:** la contraseña del administrador quedó reemplazada y almacenada mediante una función de derivación de clave; existe el evento de auditoría.

**En caso de fallo:** la contraseña anterior sigue vigente y el intento queda registrado según RN-17.

## 8. Criterios de aceptación

| ID | Given | When | Then |
| --- | --- | --- | --- |
| CA-01 | Un administrador con sesión iniciada | El administrador declara su contraseña actual correcta y una contraseña nueva válida | El sistema reemplaza la credencial y la almacena con una función de derivación de clave |
| CA-02 | El mismo administrador | El administrador declara una contraseña actual incorrecta | El sistema rechaza el cambio y la credencial no se modifica |
| CA-03 | El mismo administrador | El administrador declara una contraseña nueva que no cumple las condiciones | El sistema rechaza el cambio y la credencial no se modifica |
| CA-04 | Una instalación con el registro de auditoría vacío | El administrador cambia su contraseña | El registro de auditoría contiene una fila con actor `admin`, la acción de cambio de contraseña y su resultado |

## 9. Trazabilidad

| Dimensión | Referencia |
| --- | --- |
| Necesidad de negocio | [NB-08](../../01-Necesidades-Negocio/Necesidades-De-Negocio/NB-08-Control-De-Acceso-Y-Credenciales-De-Maquina.md) |
| Reglas de negocio aplicables | RN-17. Reglas conceptuales: ninguna: la credencial del administrador es material del almacén de identidad y no figura entre las entidades del anexo E-9 |
| Historias de usuario a generar en 06 | US-CU-31-1 (cambiar la contraseña exigiendo la actual), US-CU-31-2 (validar la contraseña nueva) |
| Componentes esperados en 05 | Capa `Web`, menú de usuario de la barra superior; capa `Application`, módulo de identidad y tokens; capa `Infrastructure`, almacén de identidad. Referencia tentativa |
| Tests previstos en 08 | Casos a derivar por 08-Calidad-Y-Pruebas. El anexo E-22 no declara casos propios del cambio de contraseña |

Los identificadores de historia de usuario llevan la forma `US-CU-XX-n` y son **provisionales**: la numeración definitiva es potestad de 06-Backlog-Tecnico. La forma se eligió para que ningún identificador emitido acá colisione con la numeración que 06 asigne.

## 10. Notas y supuestos

- **Brecha declarada:** el intake declara que la contraseña se valida pero no enumera las condiciones concretas de esa validación. Es la misma brecha que CU-29. Destinatario: agente humano del proyecto.
- El producto no recupera contraseñas: está declarado fuera de alcance por la exclusión 7 del intake §9.
- La contraseña nunca se almacena en claro ni con un resumen simple.

## 11. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 1.0 | 2026-07-29 | Corrección absorbida dentro de la versión 1.0, sin subirla y sin archivar, por la política de versionado de `Master-Prompt.md` §5: el documento está en estado `Propuesto`. Se califica la forma «el registro» a secas, que tenía tres referentes distintos en la categoría y no era resoluble leyendo esta sección por separado, que es como se generan los artefactos de las categorías siguientes. La entrada de glosario con los cuatro referentes vive en `Modelo-Datos/Modelo-Conceptual.md` §6. Las formas ya calificadas no se tocaron: no colisionan. |
| 1.0 | 2026-07-29 | Corrección absorbida dentro de la versión 1.0, sin subirla y sin archivar, por la política de versionado de `Master-Prompt.md` §5: el documento está en estado `Propuesto` y la corrección proviene del audit de su propia fase de emisión. §2 suma la declaración de que los nombres de los actores no humanos son denominaciones acuñadas por esta categoría y no componentes declarados, con la salvedad de los seis que sí trazan a una fuente. Ningún actor cambia de nombre y ningún flujo se altera: lo que se corrige es que la categoría afirmaba que todo dato trazaba y trece de los diecinueve nombres de actor no humano no lo cumplían. Origen: hallazgo H-04 del informe [Audit/B-02-03-r1.md](../../Audit/B-02-03-r1.md) |
| 1.0 | 2026-07-29 | Versión inicial, derivada de la necesidad de negocio upstream y de las secciones del intake citadas en la cabecera |

