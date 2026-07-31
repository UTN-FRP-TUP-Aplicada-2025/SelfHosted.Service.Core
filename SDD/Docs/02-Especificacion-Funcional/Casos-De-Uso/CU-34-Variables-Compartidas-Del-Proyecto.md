# CU-34 — Variables compartidas del proyecto SelfHosted

**Proyecto de código:** SelfHosted-Service
**Producto:** SelfHosted Service
**Documento:** CU-34-Variables-Compartidas-Del-Proyecto.md
**Versión:** 2.0
**Estado:** Propuesto
**Fecha:** 2026-07-30
**Autor:** Analista Funcional Senior (AG-02)

**Necesidad de negocio upstream:** [NB-04](../../01-Necesidades-Negocio/Necesidades-De-Negocio/NB-04-Alta-De-Servicio-Sin-Copiar-Y-Adaptar.md)
**Trazabilidad upstream:** PRODUCT-INTAKE §4 capacidad F-23 y su nota (decisión D-5); anexo E-1 (las variables compartidas del proyecto 12); anexo E-5, cambio 4 y campo de referencias; anexo E-15, endpoints de lectura y escritura de variables compartidas; anexo E-9, tabla de variables compartidas; E-16 RN-15, RN-22, RN-23, RN-27, RN-28, RN-37

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

Permitir que el administrador declare a nivel proyecto SelfHosted los valores que varios de sus servicios comparten —típicamente una credencial de base de datos—, para que dejen de escribirse y mantenerse sincronizados servicio por servicio.

## 2. Actores

| Actor | Tipo | Rol |
| --- | --- | --- |
| Administrador del producto | Primario | Declara, edita y elimina las variables compartidas del proyecto SelfHosted |
| Registro del producto | Sistema | Valida el formato, protege las referenciadas, propaga el marcado de redespliegue y enmascara los secretos |

Los nombres de los actores no humanos son **denominaciones acuñadas por esta categoría**, salvo los seis que trazan a una fuente: `Motor de contenedores`, `Destino externo`, `Automatismo de integración continua`, `Sincronizador de estado`, `Módulo de descubrimiento` y `Resolutor de referencias`. Los acuñados no son componentes declarados y no condicionan la descomposición: su correspondencia con los módulos que el intake §17.P.2 sí declara la fija 05-Arquitectura-Tecnica. La convención completa, nombre por nombre, está en [Especificacion-Funcional.md](../Especificacion-Funcional.md) §8.

## 3. Precondiciones

- Existe el proyecto SelfHosted (CU-01).
- El administrador tiene sesión iniciada (CU-30).

## 4. Flujo principal

1. El administrador abre las variables compartidas del proyecto SelfHosted.
2. El sistema devuelve las declaradas, con los valores secretos enmascarados (RN-15).
3. El administrador declara una variable compartida con su clave, su valor, su marca de secreta y su descripción.
4. El sistema valida el formato de la clave. La clave de una compartida no exige unicidad dentro del proyecto (RN-28).
5. El sistema persiste la variable. Si es secreta, el valor queda cifrado en reposo y no se devuelve en claro por ninguna vía.
6. El administrador edita el valor de una variable compartida ya referenciada.
7. El cambio entra al conjunto de cambios pendientes con entidad de proyecto, y el sistema enumera qué variable de qué servicio quedará obsoleta, marcando esos servicios como pendientes de redespliegue.
8. El administrador solicita eliminar una variable compartida.
9. El sistema rechaza la eliminación mientras exista al menos una referencia vigente, devolviendo la lista de servicios y claves que la referencian (RN-27).
10. El sistema registra el evento de auditoría de cada escritura (RN-17).

## 5. Flujos alternativos

**FA-01 — Segunda variable compartida con la misma clave.**
Disparador: el administrador declara una clave que el proyecto SelfHosted ya tiene.
Pasos: el sistema la acepta y crea un objeto nuevo, distinguible por identidad. Si además el valor coincide, advierte sin bloquear (RN-28, RN-37).
Punto de retorno: paso 5.

**FA-02 — Variable compartida secreta.**
Disparador: el administrador marca la variable como secreta.
Pasos: recibe exactamente el mismo tratamiento que cualquier otra variable secreta: cifrada en reposo, enmascarada en toda respuesta y nunca escrita en una exportación.
Punto de retorno: paso 5.

**FA-03 — Variable compartida sin referencias.**
Disparador: la variable declarada no la referencia ningún servicio.
Pasos: el sistema la reporta como huérfana en la revisión de higiene, sin bloquear su creación ni el arranque del proyecto (RN-37). Ver CU-36.
Punto de retorno: paso 10.

## 6. Excepciones y errores

| Código | Causa | Respuesta del sistema |
| --- | --- | --- |
| `422` de formato de clave | La clave no respeta el formato de una clave de variable | Rechazo (RN-28) |
| `409` de variable referenciada | Se intenta eliminar una variable compartida que al menos un servicio referencia | Rechazo con la lista de servicios y claves que la referencian (RN-27) |
| `422` de referencia en una compartida | Se intenta dar a una variable compartida un valor que es una expresión de referencia | Rechazo: una compartida contiene siempre un literal o material secreto (RC-05, RN-22) |
| Aviso no bloqueante | Dos compartidas con la misma clave y el mismo valor | El sistema advierte que probablemente convenga compartir. No bloquea (RN-37) |

## 7. Postcondiciones

**En caso de éxito:** el proyecto SelfHosted tiene declaradas sus variables compartidas; las secretas están cifradas en reposo y enmascaradas en toda respuesta; el cambio de valor de una referenciada dejó su entrada en el conjunto de cambios pendientes con los servicios afectados marcados; existe el evento de auditoría.

**En caso de fallo:** ninguna variable se crea, modifica ni elimina; el rechazo identifica la causa y, cuando corresponde, quién referencia a la variable protegida.

## 8. Criterios de aceptación

| ID | Given | When | Then |
| --- | --- | --- | --- |
| CA-01 | El proyecto SelfHosted 12, con la variable compartida de zona horaria referenciada por el servicio `api` | El administrador intenta eliminarla | El sistema rechaza con `409` y devuelve la lista con el servicio `api` y su clave |
| CA-02 | El mismo proyecto, que ya tiene una variable compartida de clave `TZ` | El administrador declara una segunda con la misma clave y distinto valor | Las dos coexisten y cada referencia resuelve a su propio objeto: la clave no las identifica |
| CA-03 | El mismo proyecto con una variable compartida marcada como secreta | El administrador consulta las variables compartidas | El valor viaja enmascarado y no se devuelve en claro por ninguna vía |
| CA-04 | El proyecto SelfHosted 12 con la variable compartida de zona horaria referenciada por `api` | El administrador cambia su valor | El cambio entra al conjunto de cambios pendientes con entidad de proyecto, enumera que la variable de `api` quedará obsoleta y marca `api` como pendiente de redespliegue |

## 9. Trazabilidad

| Dimensión | Referencia |
| --- | --- |
| Necesidad de negocio | [NB-04](../../01-Necesidades-Negocio/Necesidades-De-Negocio/NB-04-Alta-De-Servicio-Sin-Copiar-Y-Adaptar.md) |
| Reglas de negocio aplicables | RN-15, RN-17, RN-21, RN-22, RN-23, RN-27, RN-28, RN-33, RN-35, RN-37. Reglas conceptuales: RC-04, RC-05, RC-16, RC-17 |
| Historias de usuario a generar en 06 | US-CU-34-1 (declarar una variable compartida del proyecto SelfHosted), US-CU-34-2 (editar una variable compartida y ver a quién afecta), US-CU-34-3 (proteger de la eliminación la variable referenciada), US-CU-34-4 (marcar una variable compartida como secreta) |
| Componentes esperados en 05 | Capa `Web`, pantalla de variables compartidas y controlador del recurso; capa `Application`, módulo de proyectos; capa `Domain`, agregado `Proyectos`; capa `Infrastructure`, `Persistencia`. Referencia tentativa |
| Tests previstos en 08 | T-41 (eliminación de una compartida referenciada); T-42, T-59 (clave sin unicidad); T-37 (propagación del carácter de secreto); T-63 (compartida huérfana) |

Los identificadores de historia de usuario llevan la forma `US-CU-XX-n` y son **provisionales**: la numeración definitiva es potestad de 06-Backlog-Tecnico. La forma se eligió para que ningún identificador emitido acá colisione con la numeración que 06 asigne.

## 10. Notas y supuestos

- Una referencia a una variable compartida no genera arista, porque el proyecto SelfHosted no es un nodo del lienzo. El marcado de redespliegue se resuelve por la enumeración indexada de las variables con referencia, no por el grafo.
- Las reglas RN-22, RN-23, RN-27 y RN-28 llevan marcador `[D-i]` o reformulación `[D]`; las tres primeras siguen sin revisar y se consumen declarándolas revisables.
- La capacidad F-23 es `Should Have` y su asignación a un alcance concreto figura como pendiente del intake.
- **Brecha declarada:** el anexo E-18 registra como pendiente el maquetado de la pantalla de variables compartidas. Destinatario: 03-UX-UI-DX.

## 11. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 2.0 | 2026-07-30 | **Migración normativa 4.1 → 6.0**, corte 3 de la fase M4, sobre el plan [`Plan-Migracion-4.1-a-6.0.md`](../../Audit/Plan-Migracion-4.1-a-6.0.md). Clasificación **regenerar contenido**, por el salto de `Rules-Especificacion-Funcional` 2.0 → 4.0. **Fuente de contenido: documento de origen**, más el [PRODUCT-MANIFEST](../../../Intake/PRODUCT-MANIFEST-SelfHosted-Service.md) §1.3 para el único campo de cabecera que se suma. Ningún flujo, actor, criterio de aceptación, excepción, brecha ni referencia cambia de contenido: lo que cambia es la nomenclatura. **Vocabulario (`[5.0]`)**: la etiqueta de cabecera `**Proyecto:**` llevaba un valor del plano de negocio y pasa a `**Producto:**`, porque `Vocabulario-Rules.md` §3 prohíbe la etiqueta de un plano sobre el valor de otro; se suma `**Proyecto de código:**` con el `Nombre-Proyecto-Codigo` declarado, que §4.1 de la regla vigente exige y que este documento no declaraba; `SOLUTION-INTAKE` pasa a `PRODUCT-INTAKE`; y «solución» pasa a «producto» en **2 ocurrencias**, las de los dos nombres de actor, las dos del referente de nivel superior. **Las 20 ocurrencias de «proyecto» del dominio no se tocaron, y son el caso más sensible del corte**: este caso de uso es el de la variable compartida **del proyecto SelfHosted**, de modo que la palabra designa la entidad del producto en su título, en su propósito, en cada paso del flujo, en los cuatro criterios de aceptación y en el nombre del agregado `Proyectos` de §9. Convertirla a «proyecto de código» corrompería la especificación y es el peor daño posible de esta migración según §3.3 del plan. **El nombre del archivo tampoco se tocó**, por la misma razón. La sustitución se hizo por el procedimiento por ocurrencia de `Vocabulario-Rules.md` §9.5 y **nunca por reemplazo global de cadena**. **Glosario (`[5.1]`)**: por §2.1 y §4.2.4 de la regla vigente, `Glosario-Funcional.md` pasa a ser artefacto propio y obligatorio y deja de ser el punto 6 de `Modelo-Conceptual.md`; lo emite un lote posterior de esta migración, y los términos que este caso de uso acuña o precisa —«variable compartida del proyecto», «higiene» y «huérfana» en el sentido de la variable sin referencias— se devolvieron para que ese lote los consuma sin redefinirlos. Ninguna fila anterior de este control de cambios se reescribió (`SDD-Development-Guide.md` §VI.2) y el bloque de procedencia del destino no se tocó: sigue declarando 4.1, y cerrarlo es trabajo de M5 |
| 1.0 | 2026-07-29 | Corrección absorbida dentro de la versión 1.0, sin subirla y sin archivar, por la política de versionado de `Master-Prompt.md` §5: el documento está en estado `Propuesto` y la corrección proviene del audit de su propia fase de emisión. §2 suma la declaración de que los nombres de los actores no humanos son denominaciones acuñadas por esta categoría y no componentes declarados, con la salvedad de los seis que sí trazan a una fuente. Ningún actor cambia de nombre y ningún flujo se altera: lo que se corrige es que la categoría afirmaba que todo dato trazaba y trece de los diecinueve nombres de actor no humano no lo cumplían. Origen: hallazgo H-04 del informe [Audit/B-02-03-r1.md](../../Audit/B-02-03-r1.md) |
| 1.0 | 2026-07-29 | Versión inicial, derivada de la necesidad de negocio upstream y de las secciones del intake citadas en la cabecera |

