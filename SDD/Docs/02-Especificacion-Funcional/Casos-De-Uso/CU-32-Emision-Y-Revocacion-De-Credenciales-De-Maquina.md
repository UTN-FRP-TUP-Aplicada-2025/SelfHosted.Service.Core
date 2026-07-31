# CU-32 — Emisión, listado y revocación de credenciales de máquina

**Proyecto de código:** SelfHosted-Service
**Producto:** SelfHosted Service
**Documento:** CU-32-Emision-Y-Revocacion-De-Credenciales-De-Maquina.md
**Versión:** 2.0
**Estado:** Propuesto
**Fecha:** 2026-07-30
**Autor:** Analista Funcional Senior (AG-02)

**Necesidad de negocio upstream:** [NB-08](../../01-Necesidades-Negocio/Necesidades-De-Negocio/NB-08-Control-De-Acceso-Y-Credenciales-De-Maquina.md)
**Trazabilidad upstream:** PRODUCT-INTAKE §4 capacidad F-15; §5 historia 10; anexo E-12 (la carga útil del token emitido); §17.P.5, ámbitos, vigencia y revocación; §11 riesgo RG-03; E-16 RN-15, RN-16, RN-17

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

Permitir que el administrador emita, liste y revoque credenciales de máquina con ámbitos acotados y vigencia declarada, para que los automatismos puedan operar sin conocer su contraseña y para que una credencial comprometida pueda cortarse de inmediato.

## 2. Actores

| Actor | Tipo | Rol |
| --- | --- | --- |
| Administrador del producto | Primario | Emite, lista y revoca los tokens de API |
| Registro del producto | Sistema | Genera el token, muestra su valor una única vez, persiste sólo su resumen y aplica la revocación |

Los nombres de los actores no humanos son **denominaciones acuñadas por esta categoría**, salvo los seis que trazan a una fuente: `Motor de contenedores`, `Destino externo`, `Automatismo de integración continua`, `Sincronizador de estado`, `Módulo de descubrimiento` y `Resolutor de referencias`. Los acuñados no son componentes declarados y no condicionan la descomposición: su correspondencia con los módulos que el intake §17.P.2 sí declara la fija 05-Arquitectura-Tecnica. La convención completa, nombre por nombre, está en [Especificacion-Funcional.md](../Especificacion-Funcional.md) §8.

## 3. Precondiciones

- Existe un administrador con sesión iniciada (CU-29, CU-30).

## 4. Flujo principal

1. El administrador abre la administración de credenciales de máquina.
2. El sistema lista los tokens emitidos con su nombre, su prefijo, sus ámbitos, su vigencia, su último uso y su estado de revocación. Nunca muestra el valor del token.
3. El administrador emite un token declarando su nombre, sus ámbitos y su vigencia.
4. El sistema genera el token y lo muestra una única vez (RN-16).
5. El sistema persiste únicamente el resumen del valor, nunca el valor (RN-16, RC-13).
6. El administrador copia el valor y lo guarda donde corresponda.
7. El administrador revoca un token.
8. El sistema marca la fecha de revocación y el efecto es inmediato: la primera petición posterior con ese token se rechaza.
9. El sistema registra el evento de auditoría de cada operación (RN-17).

## 5. Flujos alternativos

**FA-01 — Token sin vencimiento.**
Disparador: el administrador elige la opción sin vencimiento.
Pasos: el sistema la admite y la desaconseja en la interfaz, según lo declarado en §17.P.5.
Punto de retorno: paso 4.

**FA-02 — Ámbito mínimo para un automatismo.**
Disparador: el token se emite para un automatismo de integración continua.
Pasos: se emite con el ámbito mínimo necesario, típicamente sólo el de ejecución de despliegues. Ver CU-33.
Punto de retorno: paso 4.

**FA-03 — Valor perdido tras la emisión.**
Disparador: el administrador no guardó el valor mostrado.
Pasos: el valor no puede recuperarse, porque sólo se persiste su resumen. Corresponde revocar y emitir uno nuevo.
Punto de retorno: paso 3.

## 6. Excepciones y errores

| Código | Causa | Respuesta del sistema |
| --- | --- | --- |
| Valor mostrado más de una vez | El sistema devuelve el valor del token después de su emisión | Prohibido por RN-16: se muestra una única vez y sólo se persiste su resumen |
| `403` de ámbito insuficiente | Un token se usa para una operación que su ámbito no cubre | Rechazo indicando cuál ámbito falta. Ver CU-33 |
| Token revocado | Se usa un token cuya fecha de revocación está marcada | Rechazo en la primera petición posterior a la revocación, sin afectar a otros tokens ni a la sesión del administrador |
| `422` de ámbito no admitido | Se declara un ámbito fuera del conjunto cerrado declarado | Rechazo. El conjunto de ámbitos es cerrado por declaración de §17.P.5 |

## 7. Postcondiciones

**En caso de éxito:** existe un token con su nombre, su prefijo, sus ámbitos, su vigencia y su resumen persistido; su valor se mostró una única vez y no quedó almacenado; el token revocado deja de ser aceptado de inmediato; cada operación dejó su evento de auditoría.

**En caso de fallo:** no se emite ningún token y ningún valor queda persistido; el listado y las revocaciones anteriores no se ven afectados.

## 8. Criterios de aceptación

| ID | Given | When | Then |
| --- | --- | --- | --- |
| CA-01 | Un administrador con sesión iniciada | El administrador emite un token con ámbitos de lectura de proyectos y de ejecución de despliegues | El sistema muestra el valor una única vez y en la base sólo queda su resumen |
| CA-02 | Un token ya emitido | El administrador abre el listado de tokens | El listado muestra nombre, prefijo, ámbitos, vigencia, último uso y estado, y no muestra el valor del token |
| CA-03 | Un token vigente en uso por un automatismo | El administrador lo revoca | La primera petición posterior con ese token se rechaza, y ni los demás tokens ni la sesión del administrador se ven afectados |
| CA-04 | Un token con ámbito sólo de lectura de proyectos | El automatismo intenta ejecutar un despliegue con él | El sistema rechaza con `403` indicando cuál ámbito falta |

## 9. Trazabilidad

| Dimensión | Referencia |
| --- | --- |
| Necesidad de negocio | [NB-08](../../01-Necesidades-Negocio/Necesidades-De-Negocio/NB-08-Control-De-Acceso-Y-Credenciales-De-Maquina.md) |
| Reglas de negocio aplicables | RN-15, RN-16, RN-17. Reglas conceptuales: RC-13 |
| Historias de usuario a generar en 06 | US-CU-32-1 (emitir un token de API con ámbitos y vigencia), US-CU-32-2 (listar los tokens emitidos sin exponer su valor), US-CU-32-3 (revocar un token con efecto inmediato) |
| Componentes esperados en 05 | Capa `Web`, pantalla de configuración de tokens y controlador de autenticación; capa `Application`, módulo de identidad y tokens, con el ciclo de vida completo; capa `Domain`, agregado `Identidad`, con el conjunto cerrado de ámbitos; capa `Infrastructure`, `Persistencia`. Referencia tentativa |
| Tests previstos en 08 | T-25 (valor mostrado una vez y sólo el resumen persistido); T-26 (auditoría con el actor identificado por el prefijo) |

Los identificadores de historia de usuario llevan la forma `US-CU-XX-n` y son **provisionales**: la numeración definitiva es potestad de 06-Backlog-Tecnico. La forma se eligió para que ningún identificador emitido acá colisione con la numeración que 06 asigne.

## 10. Notas y supuestos

- El intake declara que la regla de mostrar el token una única vez y persistir sólo su resumen es una invariante del modelo y no una decisión de infraestructura.
- Los tokens de ámbito mínimo son una de las tres mitigaciones declaradas del riesgo RG-03.
- Ningún secreto entra al repositorio: los tokens que use un automatismo se guardan como secretos del repositorio remoto.
- **Brecha declarada:** el plazo del criterio de acotamiento de credenciales de NB-08 depende del adelanto no decidido de la épica EP-15 a la primera fase. Destinatario: agente humano del proyecto.

## 11. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 2.0 | 2026-07-30 | **Migración normativa 4.1 → 6.0**, corte 3 de la fase M4, sobre el plan [`Plan-Migracion-4.1-a-6.0.md`](../../Audit/Plan-Migracion-4.1-a-6.0.md). Clasificación **regenerar contenido**, por el salto de `Rules-Especificacion-Funcional` 2.0 → 4.0. **Fuente de contenido: documento de origen**, más el [PRODUCT-MANIFEST](../../../Intake/PRODUCT-MANIFEST-SelfHosted-Service.md) §1.3 para el único campo de cabecera que se suma. Ningún flujo, actor, criterio de aceptación, excepción, brecha ni referencia cambia de contenido: lo que cambia es la nomenclatura. **Vocabulario (`[5.0]`)**: la etiqueta de cabecera `**Proyecto:**` llevaba un valor del plano de negocio y pasa a `**Producto:**`, porque `Vocabulario-Rules.md` §3 prohíbe la etiqueta de un plano sobre el valor de otro; se suma `**Proyecto de código:**` con el `Nombre-Proyecto-Codigo` declarado, que §4.1 de la regla vigente exige y que este documento no declaraba; `SOLUTION-INTAKE` pasa a `PRODUCT-INTAKE`; y «solución» pasa a «producto» en **2 ocurrencias**, las de los dos nombres de actor, las dos del referente de nivel superior. **Las 2 ocurrencias de «proyectos» de CA-01 y CA-04 no se tocaron**: son el ámbito de token de lectura sobre la entidad `Proyecto` del dominio y no sobre la unidad de compilación. La de «agente humano del proyecto» en §10 queda a secas, por su referente de emprendimiento. La sustitución se hizo por el procedimiento por ocurrencia de `Vocabulario-Rules.md` §9.5 y **nunca por reemplazo global de cadena**. **Glosario (`[5.1]`)**: por §2.1 y §4.2.4 de la regla vigente, `Glosario-Funcional.md` pasa a ser artefacto propio y obligatorio y deja de ser el punto 6 de `Modelo-Conceptual.md`; lo emite un lote posterior de esta migración, y los términos que este caso de uso acuña o precisa se devolvieron para que ese lote los consuma sin redefinirlos. Ninguna fila anterior de este control de cambios se reescribió (`SDD-Development-Guide.md` §VI.2) y el bloque de procedencia del destino no se tocó: sigue declarando 4.1, y cerrarlo es trabajo de M5 |
| 1.0 | 2026-07-29 | Corrección absorbida dentro de la versión 1.0, sin subirla y sin archivar, por la política de versionado de `Master-Prompt.md` §5: el documento está en estado `Propuesto` y la corrección proviene del audit de su propia fase de emisión. §2 suma la declaración de que los nombres de los actores no humanos son denominaciones acuñadas por esta categoría y no componentes declarados, con la salvedad de los seis que sí trazan a una fuente. Ningún actor cambia de nombre y ningún flujo se altera: lo que se corrige es que la categoría afirmaba que todo dato trazaba y trece de los diecinueve nombres de actor no humano no lo cumplían. Origen: hallazgo H-04 del informe [Audit/B-02-03-r1.md](../../Audit/B-02-03-r1.md) |
| 1.0 | 2026-07-29 | Versión inicial, derivada de la necesidad de negocio upstream y de las secciones del intake citadas en la cabecera |

