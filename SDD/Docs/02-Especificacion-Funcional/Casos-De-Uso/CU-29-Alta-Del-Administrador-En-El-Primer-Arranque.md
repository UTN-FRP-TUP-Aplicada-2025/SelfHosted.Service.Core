# CU-29 — Alta del administrador en el primer arranque

**Proyecto:** SelfHosted Service
**Documento:** CU-29-Alta-Del-Administrador-En-El-Primer-Arranque.md
**Versión:** 1.0
**Estado:** Propuesto
**Fecha:** 2026-07-29
**Autor:** Analista Funcional Senior (AG-02)

**Necesidad de negocio upstream:** [NB-08](../../01-Necesidades-Negocio/Necesidades-De-Negocio/NB-08-Control-De-Acceso-Y-Credenciales-De-Maquina.md)
**Trazabilidad upstream:** SOLUTION-INTAKE §4 capacidad F-01; §5 historia 1; §6 flujo 4; §17.P.4, migraciones aplicadas al arrancar; §17.P.5, contraseña almacenada con una función de derivación de clave; §9 exclusión 7; §11 riesgo RG-03; anexo E-18, ruta de alta inicial

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

Permitir que, en el primer arranque de la solución, el administrador declare su usuario y su contraseña, para que nadie más pueda operar el panel que controla el servidor.

## 2. Actores

| Actor | Tipo | Rol |
| --- | --- | --- |
| Administrador de la solución | Primario | Declara su usuario y su contraseña |
| Registro de la solución | Sistema | Aplica sus migraciones, detecta la ausencia de administrador, valida la contraseña y la almacena derivada |

Los nombres de los actores no humanos son **denominaciones acuñadas por esta categoría**, salvo los seis que trazan a una fuente: `Motor de contenedores`, `Destino externo`, `Automatismo de integración continua`, `Sincronizador de estado`, `Módulo de descubrimiento` y `Resolutor de referencias`. Los acuñados no son componentes declarados y no condicionan la descomposición: su correspondencia con los módulos que el intake §17.P.2 sí declara la fija 05-Arquitectura-Tecnica. La convención completa, nombre por nombre, está en [Especificacion-Funcional.md](../Especificacion-Funcional.md) §8.

## 3. Precondiciones

- La solución se ejecuta por primera vez, sobre una base inexistente o sin administrador declarado.
- No existe ningún administrador dado de alta.

## 4. Flujo principal

1. La solución arranca y aplica sus migraciones sola, sobre una base inexistente o desactualizada.
2. El sistema detecta que no hay administrador declarado.
3. El sistema presenta el alta inicial en lugar del inicio de sesión.
4. El administrador declara su nombre de usuario y su contraseña.
5. El sistema valida la contraseña según las condiciones declaradas.
6. El sistema almacena la contraseña con una función de derivación de clave, nunca en claro ni con un resumen simple.
7. El sistema genera la clave de firma y la clave de la instancia, fuera del repositorio y fuera de la imagen.
8. El sistema inicia la sesión del administrador con su cookie.
9. El sistema registra el evento de auditoría (RN-17).
10. En los arranques posteriores la aplicación ya no ofrece el alta y presenta el inicio de sesión. Ver CU-30.

## 5. Flujos alternativos

**FA-01 — Arranque posterior con administrador ya declarado.**
Disparador: la solución arranca y ya existe un administrador.
Pasos: no se ofrece el alta; se presenta el inicio de sesión.
Punto de retorno: CU-30.

**FA-02 — Contraseña que no cumple las condiciones.**
Disparador: la contraseña declarada no supera la validación.
Pasos: el sistema la rechaza y vuelve a pedirla.
Punto de retorno: paso 4.

## 6. Excepciones y errores

| Código | Causa | Respuesta del sistema |
| --- | --- | --- |
| `422` de contraseña inválida | La contraseña no cumple las condiciones de validación declaradas | Rechazo; el administrador no se crea |
| `422` de dato obligatorio ausente | Falta el usuario o la contraseña | Rechazo, según la política general de CL-05 |
| Alta ofrecida con administrador existente | Se ofrece el alta inicial cuando ya hay administrador | Prohibido: el intake declara que en los arranques posteriores la aplicación ya no ofrece el alta |

## 7. Postcondiciones

**En caso de éxito:** existe un administrador con su contraseña almacenada mediante una función de derivación de clave; existen la clave de firma y la clave de la instancia, fuera del repositorio y de la imagen; la sesión está iniciada; existe el evento de auditoría.

**En caso de fallo:** no se crea ningún administrador y la aplicación sigue ofreciendo el alta inicial en el próximo arranque; ninguna credencial parcial queda persistida.

## 8. Criterios de aceptación

| ID | Given | When | Then |
| --- | --- | --- | --- |
| CA-01 | Una instalación nueva, sobre una base inexistente | El administrador ejecuta la aplicación por primera vez | El sistema aplica sus migraciones solo, detecta que no hay administrador y presenta el alta inicial |
| CA-02 | El alta inicial presentada | El administrador declara usuario y una contraseña que cumple las condiciones | El sistema la almacena con una función de derivación de clave e inicia la sesión con cookie |
| CA-03 | El alta inicial presentada | El administrador declara una contraseña que no cumple las condiciones | El sistema la rechaza y no crea el administrador |
| CA-04 | Una instalación con administrador ya declarado | El administrador ejecuta la aplicación | El sistema no ofrece el alta y presenta el inicio de sesión |

## 9. Trazabilidad

| Dimensión | Referencia |
| --- | --- |
| Necesidad de negocio | [NB-08](../../01-Necesidades-Negocio/Necesidades-De-Negocio/NB-08-Control-De-Acceso-Y-Credenciales-De-Maquina.md) |
| Reglas de negocio aplicables | RN-17. Reglas conceptuales: ninguna del modelo conceptual restringe este caso de uso: el administrador es material del almacén de identidad, que se materializa sobre el mismo contexto de datos y no figura entre las entidades del anexo E-9 |
| Historias de usuario a generar en 06 | US-CU-29-1 (declarar el administrador en el primer arranque), US-CU-29-2 (validar la contraseña declarada), US-CU-29-3 (no ofrecer el alta en los arranques posteriores) |
| Componentes esperados en 05 | Capa `Web`, página de alta inicial y configuración de autenticación; capa `Application`, módulo de identidad y tokens; capa `Infrastructure`, `Persistencia`, con el almacén de identidad sobre el mismo contexto de datos. Referencia tentativa |
| Tests previstos en 08 | Casos a derivar por 08-Calidad-Y-Pruebas. El anexo E-22 no declara casos propios del alta del administrador |

Los identificadores de historia de usuario llevan la forma `US-CU-XX-n` y son **provisionales**: la numeración definitiva es potestad de 06-Backlog-Tecnico. La forma se eligió para que ningún identificador emitido acá colisione con la numeración que 06 asigne.

## 10. Notas y supuestos

- **Brecha declarada:** el intake declara que la contraseña se valida pero no enumera las condiciones concretas de esa validación. Destinatario: agente humano del proyecto.
- El producto no recupera contraseñas: está declarado fuera de alcance. Con un único usuario y acceso físico al archivo de base de datos, el mecanismo aportaría superficie de ataque sin resolver un problema real.
- El segundo factor queda fuera del primer alcance; la elección de mecanismo de identidad no lo bloquea.
- El acceso al punto de acceso del motor de contenedores equivale a control total del host: es el riesgo RG-03 y la razón por la que este caso de uso existe.

## 11. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 1.0 | 2026-07-29 | Corrección absorbida dentro de la versión 1.0, sin subirla y sin archivar, por la política de versionado de `Master-Prompt.md` §5: el documento está en estado `Propuesto` y la corrección proviene del audit de su propia fase de emisión. §2 suma la declaración de que los nombres de los actores no humanos son denominaciones acuñadas por esta categoría y no componentes declarados, con la salvedad de los seis que sí trazan a una fuente. Ningún actor cambia de nombre y ningún flujo se altera: lo que se corrige es que la categoría afirmaba que todo dato trazaba y trece de los diecinueve nombres de actor no humano no lo cumplían. Origen: hallazgo H-04 del informe [Audit/B-02-03-r1.md](../../Audit/B-02-03-r1.md) |
| 1.0 | 2026-07-29 | Versión inicial, derivada de la necesidad de negocio upstream y de las secciones del intake citadas en la cabecera |

