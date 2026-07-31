# CU-27 — Vista por proyecto SelfHosted y por contenedor

**Proyecto de código:** SelfHosted-Service
**Producto:** SelfHosted Service
**Documento:** CU-27-Vista-Por-Proyecto-Y-Por-Contenedor.md
**Versión:** 2.0
**Estado:** Propuesto
**Fecha:** 2026-07-30
**Autor:** Analista Funcional Senior (AG-02)

**Necesidad de negocio upstream:** [NB-07](../../01-Necesidades-Negocio/Necesidades-De-Negocio/NB-07-Atribucion-Del-Consumo-Del-Servidor.md)
**Trazabilidad upstream:** PRODUCT-INTAKE §4 capacidad F-12, segunda y tercera capas del tablero; §5 historia 8; anexo E-3 (las métricas por despliegue); anexo E-17 (los estados que la interfaz debe distinguir); anexo E-18, anatomía del nodo; E-16 RN-20, RN-31

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

Permitir que el administrador baje del estado del servidor al de cada proyecto SelfHosted y al de cada contenedor, para saber si la presión de memoria del servidor viene de un servicio concreto en lugar de tener que deducirlo.

## 2. Actores

| Actor | Tipo | Rol |
| --- | --- | --- |
| Administrador del producto | Primario | Consulta el estado por proyecto SelfHosted y por contenedor |
| Recolector de métricas | Sistema | Obtiene las estadísticas de uso por contenedor del motor de contenedores y las publica |

Los nombres de los actores no humanos son **denominaciones acuñadas por esta categoría**, salvo los seis que trazan a una fuente: `Motor de contenedores`, `Destino externo`, `Automatismo de integración continua`, `Sincronizador de estado`, `Módulo de descubrimiento` y `Resolutor de referencias`. Los acuñados no son componentes declarados y no condicionan la descomposición: su correspondencia con los módulos que el intake §17.P.2 sí declara la fija 05-Arquitectura-Tecnica. La convención completa, nombre por nombre, está en [Especificacion-Funcional.md](../Especificacion-Funcional.md) §8.

## 3. Precondiciones

- Existe al menos un proyecto SelfHosted con despliegues (CU-13, CU-18).
- El administrador tiene sesión iniciada (CU-30).

## 4. Flujo principal

1. El administrador abre la vista por proyecto SelfHosted.
2. El sistema muestra cada proyecto con su estado agregado, derivado de los estados de sus despliegues por contenedor (RN-31).
3. El administrador elige un proyecto y baja a la vista por contenedor.
4. El sistema muestra cada despliegue con su estado y sus métricas de uso: procesador, memoria usada y límite declarado.
5. El sistema distingue los estados que no son caída: activo degradado, pausado y finalizado.
6. El sistema muestra el estado parcialmente activo del proyecto SelfHosted cuando corresponde (RN-20).
7. El administrador atribuye el consumo al servicio responsable.

## 5. Flujos alternativos

**FA-01 — Contenedor huérfano.**
Disparador: el contenedor vinculado a un despliegue registrado como activo no existe en el motor.
Pasos: el despliegue se muestra como huérfano, que es el estado que hace visible la deriva. Ver CU-28.
Punto de retorno: paso 4.

**FA-02 — Servicio con más de una réplica.**
Disparador: el servicio declara más de una réplica.
Pasos: cada réplica tiene su despliegue con su estado y sus métricas propias.
Punto de retorno: paso 4.

**FA-03 — Servicio sin despliegue.**
Disparador: el servicio está declarado y nunca se desplegó.
Pasos: el nodo se muestra sin estado de ejecución; el servicio existe siempre mientras no se lo borre, y no tiene estado de encendido.
Punto de retorno: paso 4.

## 6. Excepciones y errores

| Código | Causa | Respuesta del sistema |
| --- | --- | --- |
| Estado indeterminado | Un despliegue no puede resolverse en un estado | Prohibido: al reabrir el proyecto SelfHosted todo despliegue se resuelve en un estado y nunca en «no se sabe» (RN-31) |
| Degradado leído como caída | Un contenedor en ejecución con la verificación de salud en mal estado se muestra como caído | Incorrecto: corresponde el estado activo degradado, que no es una caída |
| Métricas no disponibles | El motor no devuelve estadísticas de uso de un contenedor | El sistema muestra el estado sin métricas y lo declara, sin degradar el resto de la vista |

## 7. Postcondiciones

**En caso de éxito:** el administrador dispone del estado y del consumo de cada proyecto SelfHosted y de cada contenedor; los estados que no son caída se distinguen; el estado del proyecto se deriva de los estados por contenedor.

**En caso de fallo:** la vista declara qué dato no está disponible; ningún estado se inventa y ningún despliegue queda sin resolver en un estado.

## 8. Criterios de aceptación

| ID | Given | When | Then |
| --- | --- | --- | --- |
| CA-01 | Un servidor con tres proyectos SelfHosted desplegados | El administrador abre la vista por proyecto | Cada proyecto aparece con su estado agregado derivado de los estados de sus despliegues por contenedor |
| CA-02 | El servicio `api` con un despliegue activo, 186 MB usados y un límite de 512 MB | El administrador abre la vista por contenedor | El despliegue aparece con su uso de memoria y su límite declarado |
| CA-03 | Un contenedor en ejecución con la verificación de salud en mal estado | El administrador abre la vista por contenedor | El despliegue aparece como activo degradado y no como caído |
| CA-04 | Un proyecto SelfHosted de tres servicios con uno en conflicto y dos arrancados | El administrador abre la vista por proyecto | El proyecto aparece como parcialmente activo, con estado explícito |

## 9. Trazabilidad

| Dimensión | Referencia |
| --- | --- |
| Necesidad de negocio | [NB-07](../../01-Necesidades-Negocio/Necesidades-De-Negocio/NB-07-Atribucion-Del-Consumo-Del-Servidor.md) |
| Reglas de negocio aplicables | RN-20, RN-31. Reglas conceptuales: RC-18 |
| Historias de usuario a generar en 06 | US-CU-27-1 (ver el estado agregado por proyecto SelfHosted), US-CU-27-2 (ver el estado y el consumo por contenedor), US-CU-27-3 (distinguir los estados que no son caída) |
| Componentes esperados en 05 | Capa `Web`, vistas de tablero y nodo del lienzo; capa `Application`, módulo de observabilidad; capa `Domain`, agregado `Despliegues`; capa `Infrastructure`, `Contenedores`. Referencia tentativa |
| Tests previstos en 08 | T-28 (activo degradado); T-29 (finalizado y caído); T-24 (parcialmente activo); T-31 (resultado por contenedor) |

Los identificadores de historia de usuario llevan la forma `US-CU-XX-n` y son **provisionales**: la numeración definitiva es potestad de 06-Backlog-Tecnico. La forma se eligió para que ningún identificador emitido acá colisione con la numeración que 06 asigne.

## 10. Notas y supuestos

- El estado del proyecto SelfHosted se deriva de los estados por contenedor y no de un estado propio de la operación.
- La tabla de correspondencia entre el estado real del contenedor y el estado del despliegue es dato declarado del anexo E-17 y no se reinterpreta.
- El sondeo de métricas ocurre sólo con vistas abiertas y con un único recolector, según §17.P.10.
- La anatomía del nodo y su lenguaje visual de estados pertenecen a 03-UX-UI-DX.

## 11. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 2.0 | 2026-07-30 | **Migración normativa 4.1 → 6.0**, corte 3 de la fase M4, sobre el plan [`Plan-Migracion-4.1-a-6.0.md`](../../Audit/Plan-Migracion-4.1-a-6.0.md). Clasificación **regenerar contenido**, por el salto de `Rules-Especificacion-Funcional` 2.0 → 4.0. **Fuente de contenido: documento de origen**, más el [PRODUCT-MANIFEST](../../../Intake/PRODUCT-MANIFEST-SelfHosted-Service.md) §1.3 para el único campo de cabecera que se suma. Ningún flujo, actor, criterio de aceptación, excepción, brecha ni referencia cambia de contenido: lo que cambia es la nomenclatura. **Vocabulario (`[5.0]`)**: la etiqueta de cabecera `**Proyecto:**` llevaba un valor del plano de negocio y pasa a `**Producto:**`, porque `Vocabulario-Rules.md` §3 prohíbe la etiqueta de un plano sobre el valor de otro; se suma `**Proyecto de código:**` con el `Nombre-Proyecto-Codigo` declarado, que §4.1 de la regla vigente exige y que este documento no declaraba; `SOLUTION-INTAKE` pasa a `PRODUCT-INTAKE`; y «solución» pasa a «producto» en **1 ocurrencia**, la del nombre del actor primario, con su concordancia de género corregida. **Las 19 ocurrencias de «proyecto» del dominio no se tocaron**: designan la entidad `Proyecto` del producto —el agrupador de servicios con su red y su lienzo— y no la unidad de compilación; convertirlas es el peor daño posible de esta migración según §3.3 del plan. Tampoco se tocó el nombre de este archivo, que nombra a esa entidad. La sustitución se hizo por el procedimiento por ocurrencia de `Vocabulario-Rules.md` §9.5 y **nunca por reemplazo global de cadena**. **Glosario (`[5.1]`)**: por §2.1 y §4.2.4 de la regla vigente, `Glosario-Funcional.md` pasa a ser artefacto propio y obligatorio y deja de ser el punto 6 de `Modelo-Conceptual.md`; lo emite un lote posterior de esta migración, y los términos que este caso de uso acuña o precisa se devolvieron para que ese lote los consuma sin redefinirlos. **Navegabilidad**: la tabla de contenido suma la sección 13, que §4.3 de la regla admite para `web-monolith` y que la tabla omitía. Ninguna fila anterior de este control de cambios se reescribió (`SDD-Development-Guide.md` §VI.2) y el bloque de procedencia del destino no se tocó: sigue declarando 4.1, y cerrarlo es trabajo de M5 |
| 1.0 | 2026-07-29 | Corrección absorbida dentro de la versión 1.0, sin subirla y sin archivar, por la política de versionado de `Master-Prompt.md` §5: el documento está en estado `Propuesto` y la corrección proviene del audit de su propia fase de emisión. §2 suma la declaración de que los nombres de los actores no humanos son denominaciones acuñadas por esta categoría y no componentes declarados, con la salvedad de los seis que sí trazan a una fuente. Ningún actor cambia de nombre y ningún flujo se altera: lo que se corrige es que la categoría afirmaba que todo dato trazaba y trece de los diecinueve nombres de actor no humano no lo cumplían. Origen: hallazgo H-04 del informe [Audit/B-02-03-r1.md](../../Audit/B-02-03-r1.md) |
| 1.0 | 2026-07-29 | Versión inicial, derivada de la necesidad de negocio upstream y de las secciones del intake citadas en la cabecera |

## 13. Interacción multiusuario y concurrencia

Sección opcional admitida por §4.3 de `Rules-Especificacion-Funcional.md` para el tipo `web-monolith`. Conserva el número que esa sección le asigna, de modo que la numeración salta del 11 al 13 por construcción de la regla y no por omisión.

El intake declara que treinta nodos actualizando su estado cada dos segundos no deben degradar el arrastre del lienzo. Es un umbral de la puerta técnica PT-01 y condiciona a 05-Arquitectura-Tecnica.

