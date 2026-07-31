# CU-28 — Reconciliación con el motor de contenedores y señalización del servicio huérfano

**Proyecto de código:** SelfHosted-Service
**Producto:** SelfHosted Service
**Documento:** CU-28-Reconciliacion-Con-El-Motor-De-Contenedores.md
**Versión:** 2.0
**Estado:** Propuesto
**Fecha:** 2026-07-30
**Autor:** Analista Funcional Senior (AG-02)

**Necesidad de negocio upstream:** [NB-07](../../01-Necesidades-Negocio/Necesidades-De-Negocio/NB-07-Atribucion-Del-Consumo-Del-Servidor.md)
**Trazabilidad upstream:** PRODUCT-INTAKE §7 CL-02 y CL-03; anexo E-17 (la tabla de correspondencia y el alcance por contenedor de la máquina de estados); §11 riesgo RG-08; §17.P.10, suscripción a eventos y reconciliación periódica; E-16 RN-31, RN-20

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

Mantener el estado registrado alineado con lo que el motor de contenedores efectivamente ejecuta, y señalar como huérfano el servicio cuyo contenedor desapareció, para que la deriva producida por operar contenedores por fuera del producto deje de ser invisible.

## 2. Actores

| Actor | Tipo | Rol |
| --- | --- | --- |
| Sincronizador de estado | Primario | Se suscribe a los eventos del motor, reconcilia y traduce cada estado real al estado del despliegue |
| Motor de contenedores | Sistema | Emite los eventos y responde el estado real de cada contenedor |
| Administrador del producto | Secundario | Ve el resultado de la reconciliación en el lienzo y en el tablero |

Los nombres de los actores no humanos son **denominaciones acuñadas por esta categoría**, salvo los seis que trazan a una fuente: `Motor de contenedores`, `Destino externo`, `Automatismo de integración continua`, `Sincronizador de estado`, `Módulo de descubrimiento` y `Resolutor de referencias`. Los acuñados no son componentes declarados y no condicionan la descomposición: su correspondencia con los módulos que el intake §17.P.2 sí declara la fija 05-Arquitectura-Tecnica. La convención completa, nombre por nombre, está en [Especificacion-Funcional.md](../Especificacion-Funcional.md) §8.

## 3. Precondiciones

- Existe al menos un despliegue registrado (CU-13, CU-15, CU-18).
- El motor de contenedores es alcanzable.

## 4. Flujo principal

1. El sincronizador se suscribe a los eventos del motor de contenedores.
2. El sincronizador ejecuta además una reconciliación completa con la periodicidad declarada.
3. Para cada despliegue registrado, obtiene el estado real de su contenedor.
4. Traduce ese estado real al estado del despliegue con la tabla de correspondencia declarada.
5. Un contenedor en ejecución con la verificación de salud en mal estado se traduce a activo degradado y no a caído.
6. Un contenedor terminado con código cero se traduce a finalizado; con código distinto de cero, a caído.
7. Un despliegue registrado como activo cuyo contenedor no existe en el motor se traduce a huérfano.
8. El sincronizador ejecuta la misma reconciliación en la apertura del proyecto SelfHosted, antes de pintar el lienzo, y no sólo por período.
9. Todo despliegue se resuelve en un estado y nunca en «no se sabe»: el que nunca llegó a crearse queda fallido y el que existía y desapareció, huérfano (RN-31).

## 5. Flujos alternativos

**FA-01 — Servicio adoptado cuyo contenedor desapareció.**
Disparador: el contenedor vinculado a un servicio incorporado ya no existe en el motor.
Pasos: el servicio queda huérfano y el sistema ofrece redesplegarlo desde la configuración importada, con la advertencia de que ese primer redespliegue sí implica corte (CL-03).
Punto de retorno: CU-13.

**FA-02 — Caída del circuito de la interfaz.**
Disparador: se pierde la conexión del navegador.
Pasos: ninguna transición de la máquina de estados se dispara por ese evento. El despliegue vive del lado del servidor y el circuito sólo lo observa.
Punto de retorno: paso 3.

**FA-03 — Contenedor pausado.**
Disparador: el contenedor está pausado en el motor.
Pasos: se traduce a activo pausado, que es un estado que la interfaz debe distinguir y que no es una caída.
Punto de retorno: paso 4.

## 6. Excepciones y errores

| Código | Causa | Respuesta del sistema |
| --- | --- | --- |
| Motor inalcanzable | El punto de acceso del motor no responde durante la reconciliación | El error se traduce a una causa propia identificable y el estado registrado conserva su última reconciliación conocida. **El intake no declara cuánto tiempo un estado sin reconciliar sigue siendo válido** y se declara brecha en §10 |
| Estado sin resolver | Un despliegue queda sin estado tras la reconciliación | Prohibido por RN-31: todo despliegue se resuelve en un estado |
| Contenedor operado por fuera | Alguien crea, detiene o elimina contenedores sin pasar por el producto | La reconciliación lo detecta y lo refleja; el estado huérfano es la señal explícita de esa deriva (RG-08, CL-02) |

## 7. Postcondiciones

**En caso de éxito:** cada despliegue registrado tiene el estado que corresponde al estado real de su contenedor según la tabla de correspondencia; los contenedores desaparecidos quedan señalados como huérfanos; la reconciliación se ejecutó también en la apertura del proyecto SelfHosted.

**En caso de fallo:** el estado registrado conserva su última reconciliación y el sistema declara que no pudo reconciliar; ningún contenedor se modifica: la reconciliación observa, no opera.

## 8. Criterios de aceptación

| ID | Given | When | Then |
| --- | --- | --- | --- |
| CA-01 | Un contenedor en ejecución con la verificación de salud en mal estado | El sincronizador reconcilia | El despliegue queda en activo degradado y no en caído |
| CA-02 | Un contenedor terminado con código de salida cero | El sincronizador reconcilia | El despliegue queda finalizado; con código distinto de cero, queda caído |
| CA-03 | Un despliegue registrado como activo cuyo contenedor ya no existe en el motor | El administrador reabre el proyecto SelfHosted | El despliegue se resuelve como huérfano antes de pintar el lienzo, y nunca queda sin estado |
| CA-04 | Un despliegue registrado en creación cuyo contenedor nunca llegó a crearse | El administrador reabre el proyecto SelfHosted | El despliegue se resuelve como fallido, y no como huérfano |

## 9. Trazabilidad

| Dimensión | Referencia |
| --- | --- |
| Necesidad de negocio | [NB-07](../../01-Necesidades-Negocio/Necesidades-De-Negocio/NB-07-Atribucion-Del-Consumo-Del-Servidor.md) |
| Reglas de negocio aplicables | RN-20, RN-31. Reglas conceptuales: RC-18 |
| Historias de usuario a generar en 06 | US-CU-28-1 (reconciliar el estado registrado con el motor de contenedores), US-CU-28-2 (señalar el servicio huérfano), US-CU-28-3 (reconciliar en la apertura del proyecto SelfHosted) |
| Componentes esperados en 05 | Capa `Web`, servicio en segundo plano del sincronizador; capa `Application`, módulo de observabilidad; capa `Domain`, agregado `Despliegues`, con la máquina de estados; capa `Infrastructure`, `Contenedores`. Referencia tentativa. La NB-07 asigna este caso de uso a la capa de infraestructura |
| Tests previstos en 08 | T-28, T-29 (correspondencia de estados); T-31 (resultado por contenedor tras la caída del circuito). El anexo E-17 declara qué verificar en cada transición |

Los identificadores de historia de usuario llevan la forma `US-CU-XX-n` y son **provisionales**: la numeración definitiva es potestad de 06-Backlog-Tecnico. La forma se eligió para que ningún identificador emitido acá colisione con la numeración que 06 asigne.

## 10. Notas y supuestos

- La máquina de estados describe un contenedor, no una operación. Es consecuencia directa de que el resultado del despliegue se determine por contenedor.
- No hay transición asociada a la caída del circuito de la interfaz, y eso es deliberado.
- La reconciliación es la mitigación declarada del riesgo RG-08 y la respuesta al caso límite CL-02.
- **Brecha declarada:** el intake no declara la validez temporal de un estado que no pudo reconciliarse. Destinatario: 05-Arquitectura-Tecnica.

## 11. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 2.0 | 2026-07-30 | **Migración normativa 4.1 → 6.0**, corte 3 de la fase M4, sobre el plan [`Plan-Migracion-4.1-a-6.0.md`](../../Audit/Plan-Migracion-4.1-a-6.0.md). Clasificación **regenerar contenido**, por el salto de `Rules-Especificacion-Funcional` 2.0 → 4.0. **Fuente de contenido: documento de origen**, más el [PRODUCT-MANIFEST](../../../Intake/PRODUCT-MANIFEST-SelfHosted-Service.md) §1.3 para el único campo de cabecera que se suma. Ningún flujo, actor, criterio de aceptación, excepción, brecha ni referencia cambia de contenido: lo que cambia es la nomenclatura. **Vocabulario (`[5.0]`)**: la etiqueta de cabecera `**Proyecto:**` llevaba un valor del plano de negocio y pasa a `**Producto:**`, porque `Vocabulario-Rules.md` §3 prohíbe la etiqueta de un plano sobre el valor de otro; se suma `**Proyecto de código:**` con el `Nombre-Proyecto-Codigo` declarado, que §4.1 de la regla vigente exige y que este documento no declaraba; `SOLUTION-INTAKE` pasa a `PRODUCT-INTAKE`; y «solución» pasa a «producto» en **3 ocurrencias** —el nombre del actor secundario y las dos de prosa, «por fuera de la solución» en §1 y «sin pasar por la solución» en §6—, todas del referente de nivel superior y con su concordancia de género corregida. **Las 5 ocurrencias de «proyecto» del dominio no se tocaron**: designan la entidad `Proyecto` del producto y no la unidad de compilación; convertirlas es el peor daño posible de esta migración según §3.3 del plan. La sustitución se hizo por el procedimiento por ocurrencia de `Vocabulario-Rules.md` §9.5 y **nunca por reemplazo global de cadena**. **Glosario (`[5.1]`)**: por §2.1 y §4.2.4 de la regla vigente, `Glosario-Funcional.md` pasa a ser artefacto propio y obligatorio y deja de ser el punto 6 de `Modelo-Conceptual.md`; lo emite un lote posterior de esta migración, y los términos que este caso de uso acuña o precisa —entre ellos «huérfano» y «reconciliación» en su sentido de contraste con el motor— se devolvieron para que ese lote los consuma sin redefinirlos. **Navegabilidad**: la tabla de contenido suma la sección 13, que §4.3 de la regla admite para `web-monolith` y que la tabla omitía. Ninguna fila anterior de este control de cambios se reescribió (`SDD-Development-Guide.md` §VI.2) y el bloque de procedencia del destino no se tocó: sigue declarando 4.1, y cerrarlo es trabajo de M5 |
| 1.0 | 2026-07-29 | Corrección absorbida dentro de la versión 1.0, sin subirla y sin archivar, por la política de versionado de `Master-Prompt.md` §5: el documento está en estado `Propuesto` y la corrección proviene del audit de su propia fase de emisión. §2 suma la declaración de que los nombres de los actores no humanos son denominaciones acuñadas por esta categoría y no componentes declarados, con la salvedad de los seis que sí trazan a una fuente. Ningún actor cambia de nombre y ningún flujo se altera: lo que se corrige es que la categoría afirmaba que todo dato trazaba y trece de los diecinueve nombres de actor no humano no lo cumplían. Origen: hallazgo H-04 del informe [Audit/B-02-03-r1.md](../../Audit/B-02-03-r1.md) |
| 1.0 | 2026-07-29 | Versión inicial, derivada de la necesidad de negocio upstream y de las secciones del intake citadas en la cabecera |

## 13. Interacción multiusuario y concurrencia

Sección opcional admitida por §4.3 de `Rules-Especificacion-Funcional.md` para el tipo `web-monolith`. Conserva el número que esa sección le asigna, de modo que la numeración salta del 11 al 13 por construcción de la regla y no por omisión.

El intake declara que la reconciliación se ejecuta por suscripción a eventos más una pasada completa periódica, y que una pasada sobre un parque de cincuenta contenedores no debe superar el umbral declarado ni saturar un núcleo. Las escrituras del sincronizador se serializan con las de la interfaz.

