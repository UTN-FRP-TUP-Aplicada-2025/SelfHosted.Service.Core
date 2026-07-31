# CU-01 — Alta de proyecto SelfHosted con su modo de red y su persistencia

**Proyecto:** SelfHosted Service
**Documento:** CU-01-Alta-De-Proyecto.md
**Versión:** 1.0
**Estado:** Propuesto
**Fecha:** 2026-07-29
**Autor:** Analista Funcional Senior (AG-02)

**Necesidad de negocio upstream:** [NB-01](../../01-Necesidades-Negocio/Necesidades-De-Negocio/NB-01-Visibilidad-Unificada-De-La-Arquitectura.md)
**Trazabilidad upstream:** SOLUTION-INTAKE §4 capacidad F-02; §6 flujo 1; anexo E-1; anexo E-10; anexo E-15, endpoint de alta de proyecto; §17.P.11 DA-03 (modo de red por defecto) y DA-04 (rango gestionado fuera del rango del servidor de direcciones); anexo E-18, mapa de navegación

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

Permitir que el administrador cree un proyecto SelfHosted —la unidad que agrupa la arquitectura de un conjunto de servicios con su red y su lienzo— declarando su nombre, su modo de red y su marca de autoarranque, para tener la arquitectura de un conjunto de contenedores en un solo lugar.

## 2. Actores

| Actor | Tipo | Rol |
| --- | --- | --- |
| Administrador de la solución | Primario | Declara el proyecto SelfHosted y elige su modo de red |
| Registro de la solución | Sistema | Verifica la unicidad del identificador legible, persiste el proyecto y su red y emite el evento de auditoría |

Los nombres de los actores no humanos son **denominaciones acuñadas por esta categoría**, salvo los seis que trazan a una fuente: `Motor de contenedores`, `Destino externo`, `Automatismo de integración continua`, `Sincronizador de estado`, `Módulo de descubrimiento` y `Resolutor de referencias`. Los acuñados no son componentes declarados y no condicionan la descomposición: su correspondencia con los módulos que el intake §17.P.2 sí declara la fija 05-Arquitectura-Tecnica. La convención completa, nombre por nombre, está en [Especificacion-Funcional.md](../Especificacion-Funcional.md) §8.

## 3. Precondiciones

- Existe un administrador dado de alta (CU-29).
- El administrador tiene sesión iniciada (CU-30).
- La base de la solución está migrada: el intake declara que las migraciones se aplican solas sobre una base inexistente al arrancar.

## 4. Flujo principal

1. El administrador solicita el alta de un proyecto SelfHosted desde el listado.
2. El sistema presenta las dimensiones que el proyecto declara: nombre, identificador legible, descripción, modo de red y marca de autoarranque.
3. El administrador declara el nombre y el identificador legible del proyecto.
4. El administrador elige el modo de red. El modo por defecto de un proyecto SelfHosted nuevo es bridge, decisión pre-tomada DA-03.
5. El administrador declara si el proyecto arranca al iniciar el sistema administrador.
6. El administrador confirma el alta.
7. El sistema verifica que el identificador legible no esté en uso (RC-01).
8. El sistema crea el proyecto SelfHosted con su red y con un lienzo vacío, y le asigna su identidad (RN-35).
9. El sistema registra el evento de auditoría con el actor, la acción, la entidad y el resultado (RN-17).
10. El sistema abre el lienzo del proyecto recién creado, que es su vista por defecto.

## 5. Flujos alternativos

**FA-01 — Modo de red macvlan.**
Disparador: en el paso 4 el administrador elige macvlan en lugar de bridge.
Pasos: el sistema pide además la interfaz padre y los parámetros de la red local. El intake declara que macvlan queda como opción explícita por servicio y que el rango de direcciones gestionado debe estar fuera del rango que reparte el servidor de direcciones de la red (DA-04).
Punto de retorno: paso 5 del flujo principal.

**FA-02 — Alta cancelada.**
Disparador: el administrador abandona el alta antes del paso 6.
Pasos: el sistema descarta lo declarado y no crea nada.
Punto de retorno: el listado de proyectos SelfHosted, sin cambios.

## 6. Excepciones y errores

| Código | Causa | Respuesta del sistema |
| --- | --- | --- |
| `IDENTIFICADOR_EN_USO` | El identificador legible declarado ya pertenece a otro proyecto SelfHosted (RC-01) | Rechazo con el campo señalado, sin crear el proyecto. **El intake no declara el código concreto para este caso**; el caso límite CL-05 declara la política general de `422` para datos inválidos y `409` para conflictos, en formato de detalle de problema. Se aplica esa política general y se declara brecha en §10 |
| `DATO_OBLIGATORIO_AUSENTE` | Falta el nombre o el identificador legible | Rechazo `422` con el campo señalado, según la política declarada en CL-05 |
| `RANGO_FUERA_DE_LA_ZONA_ADMITIDA` | En FA-01, el rango declarado se solapa con el que reparte el servidor de direcciones de la red | Rechazo, con la advertencia que DA-04 declara que la configuración inicial debe emitir |

## 7. Postcondiciones

**En caso de éxito:** existe un proyecto SelfHosted con su identidad, su red, su lienzo vacío y su marca de autoarranque; existe un evento de auditoría de la operación; el proyecto aparece en el listado y su lienzo está abierto.

**En caso de fallo:** no se crea ningún proyecto SelfHosted ni ninguna red; el registro del sistema queda en el estado previo; la auditoría registra el intento con resultado de rechazo, según RN-17, que alcanza a toda operación de escritura con su resultado.

## 8. Criterios de aceptación

| ID | Given | When | Then |
| --- | --- | --- | --- |
| CA-01 | Una instalación sin ningún proyecto SelfHosted con el identificador legible `portal-interno` | El administrador da de alta un proyecto con nombre `Portal Interno`, identificador `portal-interno` y modo bridge | El sistema crea el proyecto con su red bridge y su lienzo vacío, y lo abre en la vista de lienzo |
| CA-02 | Una instalación que ya tiene el proyecto SelfHosted `portal-interno` | El administrador intenta dar de alta otro proyecto con el mismo identificador legible | El sistema rechaza el alta señalando el identificador y no crea ningún proyecto |
| CA-03 | El formulario de alta recién abierto, sin que el administrador toque el modo de red | El administrador confirma el alta declarando sólo nombre e identificador | El proyecto queda creado con modo de red bridge, que es el valor por defecto que declara DA-03 |
| CA-04 | Una instalación con el registro de auditoría vacío | El administrador da de alta un proyecto SelfHosted | El registro de auditoría contiene una fila con actor `admin`, la acción de alta, la entidad del proyecto y el resultado correcto |

## 9. Trazabilidad

| Dimensión | Referencia |
| --- | --- |
| Necesidad de negocio | [NB-01](../../01-Necesidades-Negocio/Necesidades-De-Negocio/NB-01-Visibilidad-Unificada-De-La-Arquitectura.md) |
| Reglas de negocio aplicables | RN-17, RN-35. Reglas conceptuales: RC-01, RC-15, RC-17 |
| Historias de usuario a generar en 06 | US-CU-01-1 (declarar un proyecto SelfHosted con su nombre e identificador legible), US-CU-01-2 (elegir el modo de red del proyecto), US-CU-01-3 (marcar el autoarranque del proyecto) |
| Componentes esperados en 05 | Capa `Web`, controlador del recurso de proyectos y página del listado; capa `Application`, módulo de proyectos; capa `Domain`, agregado `Proyectos`; capa `Infrastructure`, `Persistencia`. Referencia tentativa: la asignación definitiva es de 05-Arquitectura-Tecnica |
| Tests previstos en 08 | Casos a derivar por 08-Calidad-Y-Pruebas. El anexo E-22 no declara casos propios del alta de proyecto SelfHosted; el anexo E-10 declara el recorrido de extremo a extremo del que este caso de uso es el primer paso |

Los identificadores de historia de usuario llevan la forma `US-CU-XX-n` y son **provisionales**: la numeración definitiva es potestad de 06-Backlog-Tecnico. La forma se eligió para que ningún identificador emitido acá colisione con la numeración que 06 asigne.

## 10. Notas y supuestos

- **Brecha declarada:** el intake no declara el código de respuesta concreto ante un identificador legible duplicado. Destinatario: agente humano del proyecto, para confirmación; hasta entonces rige la política general de CL-05.
- El nombre visible del proyecto SelfHosted **no exige unicidad**, y eso es dato declarado y no brecha: la consecuencia 2 de D-12 cierra la lista de nombres únicos del modelo en dos lugares —el alias de resolución de nombres del servicio dentro de la red de su proyecto y la clave de una variable de servicio dentro de su servicio— y ninguno es éste. El anexo E-9 lo materializa declarando el identificador legible con restricción de unicidad y el nombre sin ella. Dos proyectos SelfHosted pueden llamarse igual y se distinguen por identidad (RN-35).
- El detalle visual del formulario y del listado pertenece a 03-UX-UI-DX y no se especifica acá. El anexo E-18 declara el mapa de navegación como su insumo.
- `SelfHosted Service` es el producto; `SelfHosted.Service.Core` es el proyecto de código. Este caso de uso habla del primero.

## 11. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 1.0 | 2026-07-29 | Corrección absorbida dentro de la versión 1.0, sin subirla y sin archivar, por la política de versionado de `Master-Prompt.md` §5: el documento está en estado `Propuesto`. Se califica la forma «el registro» a secas, que tenía tres referentes distintos en la categoría y no era resoluble leyendo esta sección por separado, que es como se generan los artefactos de las categorías siguientes. La entrada de glosario con los cuatro referentes vive en `Modelo-Datos/Modelo-Conceptual.md` §6. Las formas ya calificadas no se tocaron: no colisionan. |
| 1.0 | 2026-07-29 | Segunda corrección absorbida dentro de la versión 1.0, del mismo audit y por la misma política. §10 declaraba como brecha si el nombre visible del proyecto SelfHosted exige unicidad, cuando la consecuencia 2 de D-12 lo resuelve cerrando la lista de nombres únicos del modelo en dos lugares, ninguno de los cuales es éste. Se retira la brecha y se reescribe la nota como dato declarado. Origen: §7.1 del informe [Audit/B-02-03-r1.md](../../Audit/B-02-03-r1.md), veredicto de B-03 |
| 1.0 | 2026-07-29 | Corrección absorbida dentro de la versión 1.0, sin subirla y sin archivar, por la política de versionado de `Master-Prompt.md` §5: el documento está en estado `Propuesto` y la corrección proviene del audit de su propia fase de emisión. §2 suma la declaración de que los nombres de los actores no humanos son denominaciones acuñadas por esta categoría y no componentes declarados, con la salvedad de los seis que sí trazan a una fuente. Ningún actor cambia de nombre y ningún flujo se altera: lo que se corrige es que la categoría afirmaba que todo dato trazaba y trece de los diecinueve nombres de actor no humano no lo cumplían. Origen: hallazgo H-04 del informe [Audit/B-02-03-r1.md](../../Audit/B-02-03-r1.md) |
| 1.0 | 2026-07-29 | Versión inicial, derivada de la necesidad de negocio upstream y de las secciones del intake citadas en la cabecera |

## 13. Interacción multiusuario y concurrencia

Sección opcional admitida por §4.3 de `Rules-Especificacion-Funcional.md` para el tipo `web-monolith`. Conserva el número que esa sección le asigna, de modo que la numeración salta del 11 al 13 por construcción de la regla y no por omisión.

El intake declara que las operaciones de despliegue se serializan por proyecto SelfHosted y que la escritura en la base es de escritor único, con un alcance de contexto por operación. El alta de un proyecto no dispara despliegues, de modo que la única concurrencia relevante es la de escritura, cubierta por esas dos declaraciones de §17.P.4 y §17.P.10.

