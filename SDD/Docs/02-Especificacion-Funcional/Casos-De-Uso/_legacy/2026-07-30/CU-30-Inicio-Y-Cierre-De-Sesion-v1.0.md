# CU-30 — Inicio y cierre de sesión

**Proyecto:** SelfHosted Service
**Documento:** CU-30-Inicio-Y-Cierre-De-Sesion.md
**Versión:** 1.0
**Estado:** Propuesto
**Fecha:** 2026-07-29
**Autor:** Analista Funcional Senior (AG-02)

**Necesidad de negocio upstream:** [NB-08](../../01-Necesidades-Negocio/Necesidades-De-Negocio/NB-08-Control-De-Acceso-Y-Credenciales-De-Maquina.md)
**Trazabilidad upstream:** SOLUTION-INTAKE §4 capacidad F-01; §6 flujo 4; §17.P.5, cookie de sesión con sus atributos y descarte de la concesión por credenciales de propietario; §17.P.11 DA-01; §11 riesgo RG-02; anexo E-18, mapa de navegación

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

Permitir que el administrador inicie y cierre su sesión en el panel, con la sesión sostenida por cookie y sin ningún token en el navegador, para que la superficie accesible sin credencial quede acotada.

## 2. Actores

| Actor | Tipo | Rol |
| --- | --- | --- |
| Administrador de la solución | Primario | Inicia y cierra su sesión |
| Registro de la solución | Sistema | Verifica la credencial, emite la cookie de sesión y la invalida al cerrar |

Los nombres de los actores no humanos son **denominaciones acuñadas por esta categoría**, salvo los seis que trazan a una fuente: `Motor de contenedores`, `Destino externo`, `Automatismo de integración continua`, `Sincronizador de estado`, `Módulo de descubrimiento` y `Resolutor de referencias`. Los acuñados no son componentes declarados y no condicionan la descomposición: su correspondencia con los módulos que el intake §17.P.2 sí declara la fija 05-Arquitectura-Tecnica. La convención completa, nombre por nombre, está en [Especificacion-Funcional.md](../Especificacion-Funcional.md) §8.

## 3. Precondiciones

- Existe un administrador declarado (CU-29).
- La solución está en ejecución.

## 4. Flujo principal

1. El administrador abre la aplicación.
2. El sistema presenta el inicio de sesión, porque ya hay administrador declarado.
3. El administrador declara su usuario y su contraseña.
4. El sistema verifica la credencial contra la contraseña almacenada de forma derivada.
5. El sistema emite la cookie de sesión con los atributos declarados, sin colocar ningún token en el navegador.
6. El sistema recuerda la sesión según lo declarado por la capacidad F-01.
7. El administrador opera el panel.
8. El administrador cierra la sesión desde el menú de usuario de la barra superior.
9. El sistema invalida la sesión y registra el evento de auditoría (RN-17).

## 5. Flujos alternativos

**FA-01 — Credencial incorrecta.**
Disparador: el usuario o la contraseña no coinciden.
Pasos: el sistema rechaza el inicio de sesión y no emite cookie.
Punto de retorno: paso 3.

**FA-02 — Acceso a una ruta sin sesión.**
Disparador: se solicita una ruta del panel sin sesión iniciada.
Pasos: el sistema no la sirve y presenta el inicio de sesión. La superficie accesible sin credencial es la que NB-08 acota.
Punto de retorno: paso 2.

## 6. Excepciones y errores

| Código | Causa | Respuesta del sistema |
| --- | --- | --- |
| Credencial inválida | El usuario o la contraseña no coinciden | Rechazo del inicio de sesión, sin emitir cookie. **El intake no declara política de bloqueo por intentos fallidos** y se declara brecha en §10 |
| Acceso sin sesión | Se solicita una ruta protegida sin sesión | El sistema no la sirve y redirige al inicio de sesión |
| Token en el navegador | Se coloca un token de API en el navegador para sostener la sesión de la interfaz | Prohibido: la interfaz usa cookie y no token, por declaración de §17.P.5 |

## 7. Postcondiciones

**En caso de éxito:** existe una sesión activa sostenida por cookie con los atributos declarados; ningún token quedó en el navegador; el cierre de sesión invalidó la sesión y dejó su evento de auditoría.

**En caso de fallo:** no se emite cookie, ninguna ruta protegida se sirve y el intento queda registrado según RN-17.

## 8. Criterios de aceptación

| ID | Given | When | Then |
| --- | --- | --- | --- |
| CA-01 | Una instalación con el administrador `admin` declarado | El administrador inicia sesión con su usuario y su contraseña correcta | El sistema emite la cookie de sesión y le da acceso al panel |
| CA-02 | La misma instalación | El administrador intenta iniciar sesión con una contraseña incorrecta | El sistema rechaza el inicio de sesión y no emite cookie |
| CA-03 | Una sesión activa | El administrador cierra la sesión desde el menú de usuario de la barra superior | La sesión queda invalidada y las rutas protegidas dejan de servirse |
| CA-04 | Sin sesión iniciada | Se solicita la ruta del listado de proyectos SelfHosted | El sistema no la sirve y presenta el inicio de sesión |

## 9. Trazabilidad

| Dimensión | Referencia |
| --- | --- |
| Necesidad de negocio | [NB-08](../../01-Necesidades-Negocio/Necesidades-De-Negocio/NB-08-Control-De-Acceso-Y-Credenciales-De-Maquina.md) |
| Reglas de negocio aplicables | RN-17. Reglas conceptuales: ninguna: la sesión no es una entidad del modelo conceptual |
| Historias de usuario a generar en 06 | US-CU-30-1 (iniciar sesión con usuario y contraseña), US-CU-30-2 (cerrar sesión desde la barra superior), US-CU-30-3 (impedir el acceso a las rutas del panel sin sesión) |
| Componentes esperados en 05 | Capa `Web`, página de inicio de sesión, barra superior y configuración de autenticación; capa `Application`, módulo de identidad y tokens, que recibe el actor ya resuelto; capa `Infrastructure`, almacén de identidad. Referencia tentativa |
| Tests previstos en 08 | Casos a derivar por 08-Calidad-Y-Pruebas. El anexo E-22 no declara casos propios del inicio de sesión |

Los identificadores de historia de usuario llevan la forma `US-CU-XX-n` y son **provisionales**: la numeración definitiva es potestad de 06-Backlog-Tecnico. La forma se eligió para que ningún identificador emitido acá colisione con la numeración que 06 asigne.

## 10. Notas y supuestos

- La sesión de la interfaz vive en el circuito y no necesita token: es la razón declarada por la que la concesión por credenciales de propietario queda descartada, junto con que la práctica recomendada vigente la prohíbe.
- **Brecha declarada:** el intake no declara política de bloqueo ni de limitación de intentos fallidos de inicio de sesión. Destinatario: agente humano del proyecto.
- La capa de aplicación no autentica: recibe el actor ya resuelto y lo propaga a la auditoría. Es reparto declarado en §17.P.5 y materia de 05-Arquitectura-Tecnica.
- El servicio no se expone fuera de la red local, por la exclusión 4 del intake §9.

## 11. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 1.0 | 2026-07-29 | Corrección absorbida dentro de la versión 1.0, sin subirla y sin archivar, por la política de versionado de `Master-Prompt.md` §5: el documento está en estado `Propuesto` y la corrección proviene del audit de su propia fase de emisión. §2 suma la declaración de que los nombres de los actores no humanos son denominaciones acuñadas por esta categoría y no componentes declarados, con la salvedad de los seis que sí trazan a una fuente. Ningún actor cambia de nombre y ningún flujo se altera: lo que se corrige es que la categoría afirmaba que todo dato trazaba y trece de los diecinueve nombres de actor no humano no lo cumplían. Origen: hallazgo H-04 del informe [Audit/B-02-03-r1.md](../../Audit/B-02-03-r1.md) |
| 1.0 | 2026-07-29 | Versión inicial, derivada de la necesidad de negocio upstream y de las secciones del intake citadas en la cabecera |

