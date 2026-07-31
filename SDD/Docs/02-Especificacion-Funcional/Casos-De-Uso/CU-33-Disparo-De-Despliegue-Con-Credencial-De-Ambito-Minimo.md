# CU-33 — Disparo de despliegue con credencial de ámbito mínimo

**Proyecto de código:** SelfHosted-Service
**Producto:** SelfHosted Service
**Documento:** CU-33-Disparo-De-Despliegue-Con-Credencial-De-Ambito-Minimo.md
**Versión:** 2.0
**Estado:** Propuesto
**Fecha:** 2026-07-30
**Autor:** Analista Funcional Senior (AG-02)

**Necesidad de negocio upstream:** [NB-08](../../01-Necesidades-Negocio/Necesidades-De-Negocio/NB-08-Control-De-Acceso-Y-Credenciales-De-Maquina.md)
**Trazabilidad upstream:** PRODUCT-INTAKE §4 capacidad F-16; §5 historia 10; anexo E-13 (el contrato del endpoint de despliegue y su tabla de comportamiento por situación); anexo E-12; anexo E-15, endpoints con su ámbito declarado; §11 riesgo RG-02 y RG-03; E-16 RN-13, RN-16, RN-17, RN-24, RN-31

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
- [13. Interacción multiusuario y concurrencia](#13-interacción-multiusuario-y-concurrencia)

---

## 1. Propósito

Permitir que un automatismo de integración continua dispare el despliegue de una versión nueva usando una credencial de máquina de ámbito mínimo, para publicar sin que ningún automatismo conozca la contraseña del administrador.

## 2. Actores

| Actor | Tipo | Rol |
| --- | --- | --- |
| Automatismo de integración continua | Primario | Invoca el despliegue con su token de ámbito mínimo |
| Módulo de despliegue | Sistema | Verifica el ámbito, ejecuta el despliegue y devuelve el resultado por contenedor |
| Administrador del producto | Secundario | Emitió el token y consulta la auditoría de lo que el automatismo hizo |

Los nombres de los actores no humanos son **denominaciones acuñadas por esta categoría**, salvo los seis que trazan a una fuente: `Motor de contenedores`, `Destino externo`, `Automatismo de integración continua`, `Sincronizador de estado`, `Módulo de descubrimiento` y `Resolutor de referencias`. Los acuñados no son componentes declarados y no condicionan la descomposición: su correspondencia con los módulos que el intake §17.P.2 sí declara la fija 05-Arquitectura-Tecnica. La convención completa, nombre por nombre, está en [Especificacion-Funcional.md](../Especificacion-Funcional.md) §8.

## 3. Precondiciones

- Existe un token de API vigente con el ámbito de ejecución de despliegues (CU-32).
- El servicio o el proyecto SelfHosted a desplegar está declarado (CU-03).
- El producto es alcanzable desde el automatismo dentro de la red local.

## 4. Flujo principal

1. El automatismo invoca el endpoint de despliegue presentando su token de máquina.
2. El sistema resuelve el actor a partir del token y verifica su vigencia y su estado de revocación.
3. El sistema verifica que el token tenga el ámbito que el endpoint declara.
4. El sistema ejecuta el despliegue, resolviendo las referencias inmediatamente antes de crear cada contenedor (RN-24).
5. El sistema determina el resultado por contenedor y no por operación (RN-31).
6. El sistema responde con la operación aceptada y su seguimiento.
7. El automatismo consulta la operación para obtener el resultado de cada contenedor y los servicios no alcanzados.
8. El sistema registra el evento de auditoría con el actor identificado por el prefijo del token (RN-17).

## 5. Flujos alternativos

**FA-01 — Consulta del resultado tras una interrupción.**
Disparador: el automatismo pierde la respuesta de la invocación.
Pasos: consulta la operación y obtiene el resultado por contenedor, sin reconstruirlo.
Punto de retorno: paso 7.

**FA-02 — Fallo parcial del lote.**
Disparador: uno de los contenedores del lote falla.
Pasos: la operación se completó e informa qué contenedor quedó de qué manera. No es un código de error de la operación.
Punto de retorno: paso 7.

**FA-03 — Token revocado entre dos invocaciones.**
Disparador: el administrador revoca el token que el automatismo usa.
Pasos: la primera invocación posterior se rechaza; el automatismo no puede seguir operando.
Punto de retorno: CU-32.

## 6. Excepciones y errores

| Código | Causa | Respuesta del sistema |
| --- | --- | --- |
| `403` de ámbito insuficiente | El token no tiene el ámbito que el endpoint declara | Rechazo indicando cuál ámbito falta |
| Token revocado o vencido | El token está revocado o su vigencia expiró | Rechazo en la primera petición posterior |
| `409` de conflicto de dirección | Al recrear, una dirección resulta ocupada por un servicio activo de otro proyecto SelfHosted | Rechazo con el informe de conflicto del anexo E-8 |
| `422` de referencia no resoluble | Una referencia del servicio no resuelve a una variable de ámbito válido | Rechazo señalando la expresión y su causa, sin crear el contenedor (RN-21, RN-24) |
| Fallo parcial | Uno o varios contenedores del lote fallan | No es un código de error de la operación: el código de servidor queda reservado al caso en que el administrador no pudo llevarla adelante |

## 7. Postcondiciones

**En caso de éxito:** los contenedores alcanzados fueron desplegados con su resultado individual registrado; la operación es consultable con el resultado por contenedor y los servicios no alcanzados; el evento de auditoría identifica al automatismo por el prefijo de su token.

**En caso de fallo:** el rechazo declara la causa —ámbito, revocación, conflicto o referencia—; ningún contenedor queda en un estado intermedio y los no alcanzados conservan su despliegue anterior.

## 8. Criterios de aceptación

| ID | Given | When | Then |
| --- | --- | --- | --- |
| CA-01 | Un token con ámbito de ejecución de despliegues, vigente | El automatismo invoca el despliegue de un servicio | El sistema acepta la operación y devuelve su seguimiento |
| CA-02 | Un token con ámbito sólo de lectura de proyectos | El automatismo invoca el despliegue | El sistema rechaza con `403` indicando cuál ámbito falta |
| CA-03 | Una operación en lote que alcanzó a dos servicios y dejó a un tercero sin impacto | El automatismo consulta la operación | La consulta devuelve el resultado de los dos contenedores alcanzados y declara al tercero como no alcanzado |
| CA-04 | Cualquier operación de escritura por API con un token | El automatismo la ejecuta | El registro de auditoría contiene una fila cuyo actor identifica al token por su prefijo |

## 9. Trazabilidad

| Dimensión | Referencia |
| --- | --- |
| Necesidad de negocio | [NB-08](../../01-Necesidades-Negocio/Necesidades-De-Negocio/NB-08-Control-De-Acceso-Y-Credenciales-De-Maquina.md) |
| Reglas de negocio aplicables | RN-13, RN-16, RN-17, RN-21, RN-24, RN-31. Reglas conceptuales: RC-13, RC-18 |
| Historias de usuario a generar en 06 | US-CU-33-1 (disparar un despliegue con token de ámbito mínimo), US-CU-33-2 (consultar el resultado por contenedor de la operación), US-CU-33-3 (recibir el rechazo indicando el ámbito faltante) |
| Componentes esperados en 05 | Capa `Web`, controladores de despliegue y de operaciones, con la autenticación por encabezado; capa `Application`, módulos de servicios y despliegues y de identidad y tokens; capa `Domain`, agregados `Despliegues` e `Identidad`; capa `Infrastructure`, `Contenedores`. Referencia tentativa |
| Tests previstos en 08 | T-26 (auditoría con el actor identificado por el prefijo); T-31 (resultado por contenedor y servicios no alcanzados); T-25 (token emitido) |

Los identificadores de historia de usuario llevan la forma `US-CU-XX-n` y son **provisionales**: la numeración definitiva es potestad de 06-Backlog-Tecnico. La forma se eligió para que ningún identificador emitido acá colisione con la numeración que 06 asigne.

## 10. Notas y supuestos

- La capacidad F-16 es `Could Have` por declaración del intake §4, y F-15 es `Should Have` porque el análisis recomienda adelantar la emisión de tokens aunque el endpoint automatizado llegue después.
- Los códigos de la operación en lote son la especificación derivada DI-10, sin revisar; se consumen declarándolos revisables.
- El servicio no se expone fuera de la red local: el automatismo corre sobre el propio servidor.
- Ningún secreto entra al repositorio; el token se guarda como secreto del repositorio remoto y se emite con el ámbito mínimo necesario.

## 11. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 2.0 | 2026-07-30 | **Migración normativa 4.1 → 6.0**, corte 3 de la fase M4, sobre el plan [`Plan-Migracion-4.1-a-6.0.md`](../../Audit/Plan-Migracion-4.1-a-6.0.md). Clasificación **regenerar contenido**, por el salto de `Rules-Especificacion-Funcional` 2.0 → 4.0. **Fuente de contenido: documento de origen**, más el [PRODUCT-MANIFEST](../../../Intake/PRODUCT-MANIFEST-SelfHosted-Service.md) §1.3 para el único campo de cabecera que se suma. Ningún flujo, actor, criterio de aceptación, excepción, brecha ni referencia cambia de contenido: lo que cambia es la nomenclatura. **Vocabulario (`[5.0]`)**: la etiqueta de cabecera `**Proyecto:**` llevaba un valor del plano de negocio y pasa a `**Producto:**`, porque `Vocabulario-Rules.md` §3 prohíbe la etiqueta de un plano sobre el valor de otro; se suma `**Proyecto de código:**` con el `Nombre-Proyecto-Codigo` declarado, que §4.1 de la regla vigente exige y que este documento no declaraba; `SOLUTION-INTAKE` pasa a `PRODUCT-INTAKE`; y «solución» pasa a «producto» en **2 ocurrencias** —el nombre del actor secundario y la precondición «la solución es alcanzable», que pasa a «el producto es alcanzable» con su concordancia de género corregida—, las dos del referente de nivel superior. **Las 4 ocurrencias de «proyecto» del dominio no se tocaron**: designan la entidad `Proyecto` del producto, incluida la serialización por proyecto SelfHosted de §13 y el conflicto de dirección con otro proyecto SelfHosted de §6. La sustitución se hizo por el procedimiento por ocurrencia de `Vocabulario-Rules.md` §9.5 y **nunca por reemplazo global de cadena**. **Glosario (`[5.1]`)**: por §2.1 y §4.2.4 de la regla vigente, `Glosario-Funcional.md` pasa a ser artefacto propio y obligatorio y deja de ser el punto 6 de `Modelo-Conceptual.md`; lo emite un lote posterior de esta migración, y los términos que este caso de uso acuña o precisa se devolvieron para que ese lote los consuma sin redefinirlos. **Navegabilidad**: la tabla de contenido suma la sección 13, que §4.3 de la regla admite para `web-monolith` y que la tabla omitía. Ninguna fila anterior de este control de cambios se reescribió (`SDD-Development-Guide.md` §VI.2) y el bloque de procedencia del destino no se tocó: sigue declarando 4.1, y cerrarlo es trabajo de M5 |
| 1.0 | 2026-07-29 | Corrección absorbida dentro de la versión 1.0, sin subirla y sin archivar, por la política de versionado de `Master-Prompt.md` §5: el documento está en estado `Propuesto` y la corrección proviene del audit de su propia fase de emisión. §2 suma la declaración de que los nombres de los actores no humanos son denominaciones acuñadas por esta categoría y no componentes declarados, con la salvedad de los seis que sí trazan a una fuente. Ningún actor cambia de nombre y ningún flujo se altera: lo que se corrige es que la categoría afirmaba que todo dato trazaba y trece de los diecinueve nombres de actor no humano no lo cumplían. Origen: hallazgo H-04 del informe [Audit/B-02-03-r1.md](../../Audit/B-02-03-r1.md) |
| 1.0 | 2026-07-29 | Versión inicial, derivada de la necesidad de negocio upstream y de las secciones del intake citadas en la cabecera |

## 13. Interacción multiusuario y concurrencia

Sección opcional admitida por §4.3 de `Rules-Especificacion-Funcional.md` para el tipo `web-monolith`. Conserva el número que esa sección le asigna, de modo que la numeración salta del 11 al 13 por construcción de la regla y no por omisión.

El intake declara que las operaciones de despliegue se serializan por proyecto SelfHosted. Un despliegue disparado por un automatismo comparte esa serialización con los que dispara la interfaz.

