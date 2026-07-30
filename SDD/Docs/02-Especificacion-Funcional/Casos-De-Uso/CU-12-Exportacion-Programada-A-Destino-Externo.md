# CU-12 — Ejecución programada de la exportación hacia un destino externo

**Proyecto:** SelfHosted Service
**Documento:** CU-12-Exportacion-Programada-A-Destino-Externo.md
**Versión:** 1.0
**Estado:** Propuesto
**Fecha:** 2026-07-29
**Autor:** Analista Funcional Senior (AG-02)

**Necesidad de negocio upstream:** [NB-03](../../01-Necesidades-Negocio/Necesidades-De-Negocio/NB-03-Reproducibilidad-De-La-Arquitectura.md)
**Trazabilidad upstream:** SOLUTION-INTAKE §4 capacidad F-17; §8, métrica de reproducibilidad con antigüedad menor a 7 días; §11 riesgo RG-07; §17.P.4, respaldo; §17.P.11 DA-08 y su apartado de lo que queda abierto para el Sprint 0; E-16 RN-15, RN-25

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

Permitir que la exportación de los proyectos SelfHosted y del catálogo se ejecute de forma programada hacia un destino externo, para que el respaldo deje de depender de que alguien se acuerde de hacerlo en un servidor sin redundancia de disco.

## 2. Actores

| Actor | Tipo | Rol |
| --- | --- | --- |
| Administrador de la solución | Primario | Declara la programación y el destino, y consulta el resultado de cada ejecución |
| Servicio en segundo plano | Sistema | Ejecuta la exportación en el momento programado y deja registro de su resultado |
| Destino externo | Sistema | Recibe los archivos exportados |

Los nombres de los actores no humanos son **denominaciones acuñadas por esta categoría**, salvo los seis que trazan a una fuente: `Motor de contenedores`, `Destino externo`, `Automatismo de integración continua`, `Sincronizador de estado`, `Módulo de descubrimiento` y `Resolutor de referencias`. Los acuñados no son componentes declarados y no condicionan la descomposición: su correspondencia con los módulos que el intake §17.P.2 sí declara la fija 05-Arquitectura-Tecnica. La convención completa, nombre por nombre, está en [Especificacion-Funcional.md](../Especificacion-Funcional.md) §8.

## 3. Precondiciones

- Existe al menos un proyecto SelfHosted declarado (CU-01).
- El administrador tiene sesión iniciada (CU-30).
- Existe un destino externo alcanzable declarado.

## 4. Flujo principal

1. El administrador declara la programación de la exportación y su destino externo.
2. El sistema persiste la programación.
3. En el momento programado, el servicio en segundo plano ejecuta la exportación de cada proyecto SelfHosted, según CU-09 y CU-10, y del catálogo, según CU-17.
4. El sistema verifica que ningún valor secreto viaje en los archivos emitidos (RN-15, RN-25).
5. El sistema escribe los archivos en el destino externo declarado.
6. El sistema registra el resultado de la ejecución y la antigüedad de la última exportación vigente de cada proyecto.
7. El administrador consulta el resultado y la antigüedad.

## 5. Flujos alternativos

**FA-01 — Ejecución manual de la exportación programada.**
Disparador: el administrador dispara la exportación fuera de su horario programado.
Pasos: se ejecutan los pasos 3 a 6 sin alterar la programación.
Punto de retorno: paso 7.

**FA-02 — Destino inalcanzable.**
Disparador: el destino externo no responde en el momento de la ejecución.
Pasos: el sistema registra el resultado fallido con su causa; la última exportación vigente sigue siendo la anterior y su antigüedad crece.
Punto de retorno: paso 7.

## 6. Excepciones y errores

| Código | Causa | Respuesta del sistema |
| --- | --- | --- |
| Destino inalcanzable | El destino externo declarado no responde | Se registra el resultado con su causa; no se pierde la exportación anterior |
| Exportación con secreto | Un valor secreto llegara a un archivo emitido | Prohibido por RN-15 y RN-25; la ejecución no debe emitir el archivo en ese estado |
| Respaldo inconsistente | La copia se toma sin respetar el modo de registro en el que opera la base | El intake declara que el respaldo debe ser consistente con ese modo. La forma concreta es materia de 05-Arquitectura-Tecnica |

## 7. Postcondiciones

**En caso de éxito:** existe en el destino externo una exportación vigente de cada proyecto SelfHosted y del catálogo, sin ningún valor secreto; la antigüedad de la última exportación es consultable.

**En caso de fallo:** la exportación anterior sigue disponible en el destino; el resultado fallido queda registrado con su causa y la antigüedad de la exportación vigente refleja la realidad.

## 8. Criterios de aceptación

| ID | Given | When | Then |
| --- | --- | --- | --- |
| CA-01 | Un sistema con tres proyectos SelfHosted declarados y una programación activa | Llega el momento programado | El sistema exporta los tres proyectos y el catálogo al destino externo y registra el resultado de cada uno |
| CA-02 | Un proyecto SelfHosted con una variable compartida secreta | Se ejecuta la exportación programada | Ningún archivo emitido contiene el valor de la variable secreta |
| CA-03 | Un destino externo que no responde | Llega el momento programado | El sistema registra el resultado fallido con su causa y conserva la exportación anterior en el destino |
| CA-04 | Un proyecto SelfHosted exportado hace 8 días | El administrador consulta el estado del respaldo | El sistema informa la antigüedad de la última exportación vigente, que es el dato con el que se mide el criterio de 7 días |

## 9. Trazabilidad

| Dimensión | Referencia |
| --- | --- |
| Necesidad de negocio | [NB-03](../../01-Necesidades-Negocio/Necesidades-De-Negocio/NB-03-Reproducibilidad-De-La-Arquitectura.md) |
| Reglas de negocio aplicables | RN-15, RN-17, RN-25. Reglas conceptuales: RC-16 |
| Historias de usuario a generar en 06 | US-CU-12-1 (declarar la programación y el destino de la exportación), US-CU-12-2 (ejecutar la exportación programada de proyectos y catálogo), US-CU-12-3 (consultar el resultado y la antigüedad de la última exportación) |
| Componentes esperados en 05 | Capa `Web`, servicio en segundo plano de la exportación programada y pantalla de configuración; capa `Application`, módulo de proyectos y de catálogo; capa `Infrastructure`, `Exportacion`. Referencia tentativa. La NB-03 asigna este caso de uso a la capa de infraestructura |
| Tests previstos en 08 | Casos a derivar por 08-Calidad-Y-Pruebas. El anexo E-22 no declara casos propios de la programación; los casos T-18, T-39 y T-47 verifican el contenido de la exportación que este caso de uso ejecuta |

Los identificadores de historia de usuario llevan la forma `US-CU-XX-n` y son **provisionales**: la numeración definitiva es potestad de 06-Backlog-Tecnico. La forma se eligió para que ningún identificador emitido acá colisione con la numeración que 06 asigne.

## 10. Notas y supuestos

- **Brecha declarada:** el destino concreto del respaldo externo no está declarado. El intake lo deja explícitamente abierto para el Sprint 0. Destinatario: agente humano del proyecto y 05-Arquitectura-Tecnica.
- **Brecha declarada:** el intake no declara la periodicidad de la programación ni su unidad. El criterio de NB-03 exige una antigüedad menor a 7 días, que es un target y no una frecuencia. Destinatario: agente humano del proyecto.
- La capacidad F-17 es `Could Have` por declaración del intake §4.
- La exportación programada es la mitigación declarada del riesgo RG-07 y la decisión pre-tomada DA-08.

## 11. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 1.0 | 2026-07-29 | Corrección absorbida dentro de la versión 1.0, sin subirla y sin archivar, por la política de versionado de `Master-Prompt.md` §5: el documento está en estado `Propuesto` y la corrección proviene del audit de su propia fase de emisión. §2 suma la declaración de que los nombres de los actores no humanos son denominaciones acuñadas por esta categoría y no componentes declarados, con la salvedad de los seis que sí trazan a una fuente. Ningún actor cambia de nombre y ningún flujo se altera: lo que se corrige es que la categoría afirmaba que todo dato trazaba y trece de los diecinueve nombres de actor no humano no lo cumplían. Origen: hallazgo H-04 del informe [Audit/B-02-03-r1.md](../../Audit/B-02-03-r1.md) |
| 1.0 | 2026-07-29 | Versión inicial, derivada de la necesidad de negocio upstream y de las secciones del intake citadas en la cabecera |

## 13. Interacción multiusuario y concurrencia

Sección opcional admitida por §4.3 de `Rules-Especificacion-Funcional.md` para el tipo `web-monolith`. Conserva el número que esa sección le asigna, de modo que la numeración salta del 11 al 13 por construcción de la regla y no por omisión.

El intake declara que las escrituras de los servicios en segundo plano se serializan y que cada ciclo crea su propio alcance de contexto, sin compartir el de la interfaz. La ejecución programada es uno de esos servicios en segundo plano.

